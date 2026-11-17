// A ponte entre o motor e as telas do app. As telas não conhecem o motor: pedem ao Worker do Boneco a ficha de uma
// animação, um quadro, a volta inteira, a miniatura ou a prévia de um desenho (src/features/programa/desenhoFora.ts),
// e o Worker responde por aqui. Só entra animação aprovada (./aprovados.ts); quem carrega o exercício (um arquivo por
// exercício, só quando ele é aberto) é o Worker (src/features/programa/trabalhoBoneco.ts). Desde 16/11/2026 este é o
// único motor do app. Nada aqui decide treino nem músculo: só traduz o pedido da tela.
import type { IdEstilo } from './boneco';
import { caixaDoCiclo, enquadrar, svgDaCena, vistasDoModoMusculos } from './cena';
import type { Modo } from './cena';
import { enquadramentoGuardado } from './preparo';
import type { Enquadramento } from './preparo';
import { VISTAS } from './desenho';
import type { IdVista } from './desenho';
import { duracao, instante } from './movimento';
import type { Exercicio } from './movimento';
import { CORPOS } from './tabelas';

export type TemaDaTela = 'claro' | 'escuro';
const CORPO = CORPOS.homem;
/**
 * O desenho do corpo que enquadra a cena: o cinza, com as linhas dos grupos musculares (o padrão aprovado). O quadro é
 * o mesmo no cinza e no cor de pele, para o corpo não mudar de lugar quando a pessoa troca de desenho.
 */
const BONECO = 'cinza' as const;
/** O desenho pedido pela tela; qualquer outro valor (uma preferência antiga guardada) vale o padrão. */
const desenhoDe = (estilo?: string): IdEstilo => (estilo === 'pele' ? 'pele' : 'cinza');

const TIPO_DA_FASE = { pausa: 'hold', exc: 'ecc', conc: 'conc' } as const;

/*
 * O que não muda de uma vez para a outra já vem calculado, no arquivo de cada exercício (./preparo.ts): o quadro de
 * cada vista e a vista da miniatura. Calcular isso ao abrir o guia pede o ciclo inteiro do movimento e atrasava o
 * primeiro desenho em segundos. O que faltar é calculado na hora, com o mesmo resultado.
 */
type VB = [number, number, number, number];

/** A vista da miniatura, calculada: a que mais mostra o músculo principal. */
export const vistaDaMiniaturaCalculada = (ex: Exercicio): string => vistasDoModoMusculos(ex, CORPO)[0]?.vista ?? ex.vistas[0]!;
/** O quadro de uma vista, calculado: o palco e a miniatura do app têm a proporção 4:3. */
export const quadroDaVistaCalculado = (ex: Exercicio, vista: IdVista, mini: boolean): VB => enquadrar(ex, { corpo: CORPO, vista, boneco: BONECO, mini }, mini ? 0.04 : 0.06, 4 / 3);
/** As vistas que o guia pode pedir: as do exercício e as dos erros dele. */
export const vistasDoGuia = (ex: Exercicio): IdVista[] => [...new Set([...ex.vistas, ...ex.ficha.erros.map((e) => e.vista)])] as IdVista[];
/** O que a tabela guarda de um exercício. */
export function enquadramentoCalculado(ex: Exercicio): Enquadramento {
  const vistaMiniatura = vistaDaMiniaturaCalculada(ex);
  const chave = (vista: string, mini: boolean) => [CORPO.id, vista, BONECO, mini ? 1 : 0, ''].join('|');
  const caixa = (vista: string, mini: boolean): [string, number[]] => [chave(vista, mini), [...caixaDoCiclo(ex, { corpo: CORPO, vista: vista as IdVista, boneco: BONECO, mini })]];
  return {
    vistaMiniatura,
    quadros: Object.fromEntries(vistasDoGuia(ex).map((v) => [v, quadroDaVistaCalculado(ex, v, false)])),
    mini: quadroDaVistaCalculado(ex, vistaMiniatura as IdVista, true),
    caixas: Object.fromEntries([...vistasDoGuia(ex).map((v) => caixa(v, false)), caixa(vistaMiniatura, true)]),
  };
}

/** Em que instante do ciclo (s) o corpo está no ponto `u` do movimento: o meio da pausa nesse ponto, ou o fim da fase que chega a ele. */
function quando(ex: Exercicio, u: number): number {
  let t = 0,
    fimDaFase: number | undefined;
  for (const f of ex.ficha.fases) {
    if (f.tipo === 'pausa' && f.de === u && t > 0) return t + f.dur / 2;
    if (f.tipo !== 'pausa' && f.ate === u && fimDaFase === undefined) fimDaFase = t + f.dur;
    t += f.dur;
  }
  return fimDaFase ?? 0;
}

/** O que o guia precisa saber da animação, no formato de `Ficha` (desenhoFora.ts). */
export function fichaDoMotorNovo(ex: Exercicio) {
  const F = ex.ficha;
  const fimDoMovimento = F.fases.find((f) => f.tipo !== 'pausa')?.ate ?? 1;
  return {
    id: F.id,
    views: ex.vistas,
    errors: F.erros.map((e) => ({ id: e.id, view: e.vista })),
    seq: F.fases.map((f) => ({ kind: TIPO_DA_FASE[f.tipo], dur: f.dur, label: f.nome })),
    T: duracao(F.fases),
    vistaMovimento: ex.vistas[0]!,
    vistaMiniatura: enquadramentoGuardado(F.id)?.vistaMiniatura ?? vistaDaMiniaturaCalculada(ex),
    instantesErro: F.erros.map((e) => quando(ex, e.instante)),
    // o instante do quadro parado da miniatura: o fim do movimento (a posição que mais mostra o músculo trabalhando)
    instanteDaMiniatura: quando(ex, fimDoMovimento),
    // há músculo desenhado que só ajuda a firmar (listrado)? A legenda do modo Músculos só fala dele se houver
    soAjuda: Object.values(ex.papeis).includes('a'),
  };
}

/** `<svg class="..." viewBox="...">…</svg>` → as três partes que a tela põe no seu próprio <svg>. */
function partes(svg: string): { viewBox: string; classe: string; html: string } {
  const abre = svg.indexOf('>');
  const cabeca = svg.slice(0, abre);
  return {
    viewBox: /viewBox="([^"]*)"/.exec(cabeca)?.[1] ?? '0 0 4 3',
    classe: /class="([^"]*)"/.exec(cabeca)?.[1] ?? '',
    html: svg.slice(abre + 1, svg.lastIndexOf('</svg>')),
  };
}

const QUADROS = new Map<string, VB>();
function quadroDaVista(ex: Exercicio, vista: IdVista, mini: boolean): VB {
  const chave = `${ex.ficha.id}|${vista}|${mini ? 1 : 0}`;
  let vb = QUADROS.get(chave);
  if (!vb) {
    const g = enquadramentoGuardado(ex.ficha.id);
    const guardado = mini ? (g?.vistaMiniatura === vista ? g.mini : undefined) : g?.quadros[vista];
    QUADROS.set(chave, (vb = guardado?.length === 4 ? (guardado as VB) : quadroDaVistaCalculado(ex, vista, mini)));
  }
  return vb;
}

/**
 * Um quadro do guia, no formato do motor de hoje: viewBox, classe, html e a fase (para o texto do ritmo e da
 * respiração). O erro vem pelo índice da lista do app; o título confere qual é (as duas listas têm a mesma ordem).
 */
export function quadroDoMotorNovo(ex: Exercicio, vista: string, modo: string, t: number, erro: number, tituloErro: string, tema: TemaDaTela = 'claro', estilo?: string) {
  const F = ex.ficha;
  const v = (vista in VISTAS ? vista : ex.vistas[0]!) as IdVista;
  const m = (['tec', 'mus', 'traj', 'err'].includes(modo) ? modo : 'tec') as Modo;
  const doErro = m === 'err' ? (F.erros.find((e) => e.titulo === tituloErro) ?? F.erros[erro]) : undefined;
  // um erro do app que esta animação não desenha: mostra o movimento certo, sem inventar um desenho de erro
  const modoFinal: Modo = m === 'err' && !doErro ? 'tec' : m;
  const svg = svgDaCena(ex, t, { corpo: CORPO, vista: v, boneco: desenhoDe(estilo), modo: modoFinal, erro: doErro?.id }, quadroDaVista(ex, v, false), tema);
  const fase = instante(F.fases, t).fase;
  return { ...partes(svg), fase: { label: fase.nome, tempo: fase.tempo, breath: fase.respira } };
}

/** A miniatura do cartão do exercício: o quadro parado, no modo Músculos, na vista que mais mostra o músculo principal. */
export function miniaturaDoMotorNovo(ex: Exercicio, tema: TemaDaTela = 'claro', estilo?: string) {
  const f = fichaDoMotorNovo(ex);
  const v = f.vistaMiniatura as IdVista;
  return partes(svgDaCena(ex, f.instanteDaMiniatura, { corpo: CORPO, vista: v, boneco: desenhoDe(estilo), modo: 'mus', mini: true }, quadroDaVista(ex, v, true), tema));
}

/** A prévia de um desenho em "Meus dados": o exercício pedido (o agachamento goblet) de lado, no fundo do movimento, no modo Músculos. */
export function previaDoMotorNovo(ex: Exercicio, estilo: string, tema: TemaDaTela = 'claro') {
  const f = fichaDoMotorNovo(ex);
  const v = ex.vistas[0]! as IdVista;
  return partes(svgDaCena(ex, f.instanteDaMiniatura, { corpo: CORPO, vista: v, boneco: desenhoDe(estilo), modo: 'mus' }, quadroDaVista(ex, v, false), tema));
}

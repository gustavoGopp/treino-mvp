// A ponte entre o motor novo e as telas do app. As telas não conhecem o motor: pedem ao Worker do Boneco a ficha de
// uma animação, um quadro, a volta inteira ou a miniatura (src/features/programa/desenhoFora.ts). Para um exercício
// refeito e aprovado (./aprovados.ts), o Worker responde por aqui, no mesmo formato do motor de hoje; para os outros,
// o motor de hoje continua respondendo. Quem decide qual motor responde e carrega o exercício (um arquivo por
// exercício, só quando ele é aberto) é o Worker (src/features/programa/trabalhoBoneco.ts). Nada aqui decide treino
// nem músculo: só traduz o pedido da tela.
import { enquadrar, svgDaCena, vistasDoModoMusculos } from './cena';
import type { Modo } from './cena';
import { VISTAS } from './desenho';
import type { IdVista } from './desenho';
import { duracao, instante } from './movimento';
import type { Exercicio } from './movimento';
import { CORPOS } from './tabelas';

export type TemaDaTela = 'claro' | 'escuro';
const CORPO = CORPOS.homem;
/** O desenho do corpo: o cinza, com as linhas dos grupos musculares (o padrão aprovado). */
const BONECO = 'cinza' as const;

const TIPO_DA_FASE = { pausa: 'hold', exc: 'ecc', conc: 'conc' } as const;

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
    vistaMiniatura: vistasDoModoMusculos(ex, CORPO)[0]?.vista ?? ex.vistas[0]!,
    instantesErro: F.erros.map((e) => quando(ex, e.instante)),
    // o instante do quadro parado da miniatura: o fim do movimento (a posição que mais mostra o músculo trabalhando)
    instanteDaMiniatura: quando(ex, fimDoMovimento),
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

const QUADROS = new Map<string, [number, number, number, number]>();
function quadroDaVista(ex: Exercicio, vista: IdVista, mini: boolean) {
  const chave = `${ex.ficha.id}|${vista}|${mini ? 1 : 0}`;
  let vb = QUADROS.get(chave);
  // o palco e a miniatura do app têm a proporção 4:3
  if (!vb) QUADROS.set(chave, (vb = enquadrar(ex, { corpo: CORPO, vista, boneco: BONECO, mini }, mini ? 0.04 : 0.06, 4 / 3)));
  return vb;
}

/**
 * Um quadro do guia, no formato do motor de hoje: viewBox, classe, html e a fase (para o texto do ritmo e da
 * respiração). O erro vem pelo índice da lista do app; o título confere qual é (as duas listas têm a mesma ordem).
 */
export function quadroDoMotorNovo(ex: Exercicio, vista: string, modo: string, t: number, erro: number, tituloErro: string, tema: TemaDaTela = 'claro') {
  const F = ex.ficha;
  const v = (vista in VISTAS ? vista : ex.vistas[0]!) as IdVista;
  const m = (['tec', 'mus', 'traj', 'err'].includes(modo) ? modo : 'tec') as Modo;
  const doErro = m === 'err' ? (F.erros.find((e) => e.titulo === tituloErro) ?? F.erros[erro]) : undefined;
  // um erro do app que esta animação não desenha: mostra o movimento certo, sem inventar um desenho de erro
  const modoFinal: Modo = m === 'err' && !doErro ? 'tec' : m;
  const svg = svgDaCena(ex, t, { corpo: CORPO, vista: v, boneco: BONECO, modo: modoFinal, erro: doErro?.id }, quadroDaVista(ex, v, false), tema);
  const fase = instante(F.fases, t).fase;
  return { ...partes(svg), fase: { label: fase.nome, tempo: fase.tempo, breath: fase.respira } };
}

/** A miniatura do cartão do exercício: o quadro parado, no modo Músculos, na vista que mais mostra o músculo principal. */
export function miniaturaDoMotorNovo(ex: Exercicio, tema: TemaDaTela = 'claro') {
  const f = fichaDoMotorNovo(ex);
  const v = f.vistaMiniatura as IdVista;
  return partes(svgDaCena(ex, f.instanteDaMiniatura, { corpo: CORPO, vista: v, boneco: BONECO, modo: 'mus', mini: true }, quadroDaVista(ex, v, true), tema));
}

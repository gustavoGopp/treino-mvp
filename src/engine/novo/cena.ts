// Motor novo: monta um quadro (Boneco + objetos) numa vista e num modo, e calcula o enquadramento do ciclo.
import { DEFS_DO_BONECO, desenharBoneco, formaDoBoneco, musculosVisiveis } from './boneco';
import type { IdEstilo } from './boneco';
import { VISTAS, caixaDosItens, desenharPrim, naTela, pintar } from './desenho';
import type { Camera, IdVista, Item, P2 } from './desenho';
import { equipamentoRealista } from './equipamento';
import type { Tema } from './equipamento';
import { duracao, instante } from './movimento';
import { disporRotulos, saidaDoFio, textoDoRotulo } from './rotulos';
import type { Caixa, RotuloPosto } from './rotulos';
import { add, noRef } from './vec';
import type { V3 } from './vec';
import type { Exercicio, Quadro } from './movimento';
import type { Corpo } from './tabelas';
import { enquadramentoGuardado } from './preparo';
import { PINTOR_POR_PARES_LIGADO } from './pintor-ligado';

export type Modo = 'tec' | 'mus' | 'traj' | 'err';
export interface OpcoesCena {
  corpo: Corpo;
  vista: IdVista;
  /** Qual dos dois desenhos aprovados: 'cinza' (padrão) ou 'pele'. */
  boneco: IdEstilo;
  modo: Modo;
  erro?: string;
  /** Miniatura: sem as linhas do corpo, sem as divisões do músculo e sem o polegar. */
  mini?: boolean;
  /** Equipamento: 'realista' (o desenho dos cartões do app; o padrão) ou 'simples' (as peças da conferência). */
  equipamento?: 'realista' | 'simples';
  /** O tema decide os tons do equipamento realista (as cores do corpo vêm do CSS). */
  tema?: Tema;
  /**
   * A ordem de pintura do corpo e do equipamento: 'hoje' (`pintar`, por uma profundidade só por item) ou 'pares' (o
   * pintor por pares, ./pintor-por-pares.ts). Sem ela, vale a lista de ./pintor-ligado.ts (etapa 1: vazia). Só os
   * scripts que comparam os dois pintores a passam.
   */
  pintor?: 'hoje' | 'pares';
}
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

/** Os filtros (sombra macia) que o equipamento realista do último quadro montado precisa dentro do <svg>. */
let DEFS = '';
/** O equipamento de um quadro: o desenho dos cartões, ou as peças simples quando pedido (ou quando o quadro não diz as peças). */
function equipamento(cam: Camera, q: Quadro, ex: Exercicio, o: OpcoesCena): Item[] {
  if (o.equipamento !== 'simples' && q.pecas) {
    const r = equipamentoRealista(q.pecas, cam, o.tema ?? 'claro', `${ex.ficha.id}-${o.vista}-`);
    DEFS += r.defs;
    return r.itens;
  }
  return q.prims.filter((p) => p.t !== 'chao').flatMap((p) => desenharPrim(cam, p, 'volume'));
}
function itensDoQuadro(cam: Camera, q: Quadro, ex: Exercicio, o: OpcoesCena, suf = ''): Item[] {
  const itens: Item[] = [];
  // o chão não é desenhado como placa: de perfil ele é a linha do chão (ver svgDaCena) e, de cima, é o próprio fundo
  if (suf !== '-f') itens.push(...equipamento(cam, q, ex, o));
  itens.push(...desenharBoneco(q.esq, cam, { estilo: o.boneco, papeis: o.modo === 'mus' ? ex.papeis : undefined, mini: o.mini, suf, vies: viesDoQuadro(q, o.vista) }));
  return itens;
}
/**
 * O quadro do movimento em u, guardado: u é arredondado a 1/400 do percurso (menos de 0,3 cm no movimento mais longo),
 * para a animação não refazer a cada volta do ciclo a conta que posiciona o corpo. O mesmo u dá sempre o mesmo quadro.
 */
const QUADROS = new WeakMap<Exercicio, WeakMap<Corpo, Map<string, Quadro>>>();
function quadroDe(ex: Exercicio, corpo: Corpo, u: number, erro?: string): Quadro {
  let porCorpo = QUADROS.get(ex);
  if (!porCorpo) QUADROS.set(ex, (porCorpo = new WeakMap()));
  let m = porCorpo.get(corpo);
  if (!m) porCorpo.set(corpo, (m = new Map()));
  const k = Math.round(u * 400),
    chave = `${erro ?? ''}|${k}`;
  let q = m.get(chave);
  if (!q) m.set(chave, (q = ex.quadro(corpo, k / 400, erro)));
  return q;
}
/** Linha da trajetória de um ponto ao longo da fase concêntrica (ou do ciclo), já na tela. */
function trajetoria(cam: Camera, ex: Exercicio, corpo: Corpo, ponto: string, n = 24): P2[] {
  const le = ex.trajetorias[ponto]!;
  const out: P2[] = [];
  for (let i = 0; i <= n; i++) out.push(naTela(cam, le(quadroDe(ex, corpo, i / n))));
  return out;
}
/** O ajuste de profundidade das partes num quadro, nesta vista. */
const viesDoQuadro = (q: Quadro, vista: IdVista): Record<string, number> | undefined => (q.viesNaVista?.[vista] ? { ...q.vies, ...q.viesNaVista[vista] } : q.vies);

/* ============================== pontos do corpo pelo nome ============================== */
type EsqQ = Quadro['esq'];
const DO_MEIO: Record<string, (e: EsqQ) => V3> = { pelve: (e) => e.pelve.o, lombar: (e) => e.nos[e.iT12]!.ref.o, c7: (e) => e.torax.o, cabeca: (e) => noRef(e.cabeca, [0, 6, 6]) };
/**
 * Um ponto do corpo pelo nome: do meio (pelve, lombar, c7, cabeca) ou de um lado (ombro, cotovelo, punho, pegada,
 * quadril, joelho, tornozelo, calcanhar, ponta). Acréscimo de 18/11: `marca:<nome>` é um ponto que o quadro dá nas
 * marcas (ex.: onde o peito encosta no apoio, que o esqueleto sozinho não sabe), para os rótulos de técnica.
 */
export function pontoDoRotulo(e: EsqQ, nome: string, k: 'R' | 'L', marcas?: Quadro['marcas']): V3 {
  if (nome.startsWith('marca:')) {
    const p = marcas?.[nome.slice(6)];
    if (!p) throw new Error(`marca desconhecida no quadro: "${nome}"`);
    return p;
  }
  return ponto(e, nome, k);
}
function ponto(e: EsqQ, nome: string, k: 'R' | 'L'): V3 {
  // 'ombro:L' = o ponto de um lado certo, qualquer que seja o lado pedido (a linha que liga os dois ombros)
  const [base, lado] = nome.split(':') as [string, 'R' | 'L' | undefined];
  if (lado) return ponto(e, base, lado);
  const doMeio = DO_MEIO[nome];
  if (doMeio) return doMeio(e);
  const p = (e.lado[k] as unknown as Record<string, V3>)[nome];
  if (!p) throw new Error(`ponto do corpo desconhecido: "${nome}"`);
  return p;
}
/** Os lados que aparecem separados na vista: de lado, num exercício simétrico, só o de perto. */
const ladosNaVista = (ex: Exercicio, cam: Camera): ('R' | 'L')[] => (!ex.ficha.simetrico || Math.abs(cam.para[0]) > 0.7 ? ['R'] : ['R', 'L']);

/** As linhas do modo Trajetória que aparecem na vista (as que andam pelo menos 2 cm na tela), com o ponto final. */
function trajetoriasDesenhadas(ex: Exercicio, corpo: Corpo, cam: Camera): { nome: string; P: P2[]; fim: P2 }[] {
  const out: { nome: string; P: P2[]; fim: P2 }[] = [];
  for (const nome of Object.keys(ex.trajetorias)) {
    const P = trajetoria(cam, ex, corpo, nome);
    const comp = P.reduce((s, p, j) => (j ? s + Math.hypot(p[0] - P[j - 1]![0], p[1] - P[j - 1]![1]) : 0), 0);
    if (comp >= 2) out.push({ nome, P, fim: P[P.length - 1]! });
  }
  return out;
}
export function itensDaCena(ex: Exercicio, t: number, o: OpcoesCena): Item[] {
  return itensEmU(ex, instante(ex.ficha.fases, t).u, o);
}
/** Os itens do quadro no ponto u do movimento (0 = posição inicial, 1 = final). */
function itensEmU(ex: Exercicio, u: number, o: OpcoesCena): Item[] {
  const cam = VISTAS[o.vista];
  const certo = quadroDe(ex, o.corpo, u);
  if (o.modo === 'err' && o.erro) {
    const errado = quadroDe(ex, o.corpo, u, o.erro);
    const def = ex.ficha.erros.find((e) => e.id === o.erro);
    const GRUPOS: Record<string, string[]> = { pernas: ['pernaR', 'pernaL'], bracos: ex.ficha.simetrico ? ['bracoR', 'bracoL'] : ['bracoR'], corpo: ['corpo'] };
    const erroEm = (def?.destaca ?? []).flatMap((g) => GRUPOS[g] ?? []);
    // o corpo errado, com a parte que erra em vermelho; o certo fica tracejado por trás
    const itens: Item[] = [...itensDoQuadro(cam, certo, ex, o, '-f').map((it) => ({ ...it, camada: 0.5 }))];
    itens.push(...equipamento(cam, errado, ex, o));
    const corpoErrado = desenharBoneco(errado.esq, cam, { estilo: o.boneco, mini: o.mini, erroEm, vies: viesDoQuadro(errado, o.vista) });
    itens.push(...corpoErrado);
    if (def) {
      // a linha do erro (cheia, vermelha) e a do movimento certo (tracejada), pelos mesmos pontos do corpo; o nome do
      // erro entra depois, com os rótulos (camadaDeRotulos), porque a posição dele depende do enquadramento
      const lados = ladosNaVista(ex, cam);
      const linha = (e: EsqQ, k: 'R' | 'L') => def.linha.map((nome) => naTela(cam, ponto(e, nome, k)));
      const pts = (P: P2[]) => P.map((p) => `${f1(p[0])},${f1(p[1])}`).join(' ');
      let s = '';
      for (const k of lados) s += `<polyline class="n-certo-l" points="${pts(linha(certo.esq, k))}"/>`;
      for (const k of lados) {
        const P = linha(errado.esq, k),
          f = naTela(cam, ponto(errado.esq, def.foco, k));
        s += `<polyline class="n-err-l" points="${pts(P)}"/><circle class="n-err-p" cx="${f1(f[0])}" cy="${f1(f[1])}" r="2.4"/>`;
      }
      itens.push({ d: 0, camada: 3, s });
    }
    return itens;
  }
  const itens = itensDoQuadro(cam, certo, ex, o);
  if (o.modo === 'traj') {
    const nomes = Object.keys(ex.trajetorias);
    nomes.forEach((nome, i) => {
      const P = trajetoria(cam, ex, o.corpo, nome);
      const comp = P.reduce((s, p, j) => (j ? s + Math.hypot(p[0] - P[j - 1]![0], p[1] - P[j - 1]![1]) : 0), 0);
      if (comp < 2) return;
      const fim = P[P.length - 1]!;
      itens.push({
        d: 0,
        camada: 3,
        s: `<polyline class="n-traj${i ? ' n-traj2' : ''}" points="${P.map((p) => `${f1(p[0])},${f1(p[1])}`).join(' ')}"/><circle class="n-traj-p" cx="${f1(P[0]![0])}" cy="${f1(P[0]![1])}" r="1.6"/><circle class="n-traj-p" cx="${f1(fim[0])}" cy="${f1(fim[1])}" r="1.6"/>`,
      });
    });
  }
  return itens;
}
/* ============================== a vista do modo Músculos, por medida ============================== */
/**
 * Quanto do músculo principal aparece numa vista: a área, na tela, das formas com papel 'p' (cm²), no pior dos três
 * instantes (começo, meio e fim do movimento): a vista tem que mostrar o músculo o tempo todo. Não desconta o que
 * outra parte do corpo esconde; mede se a forma está virada para quem olha.
 */
export function areaDoPrincipal(ex: Exercicio, corpo: Corpo, vista: IdVista): number {
  const cam = VISTAS[vista];
  let pior = 1e9;
  for (const u of [0, 0.5, 1]) {
    let total = 0;
    const e = quadroDe(ex, corpo, u).esq;
    for (const mu of musculosVisiveis(e, formaDoBoneco(e), cam)) {
      const papel = (mu.lado ? ex.papeis[`${mu.id}:${mu.lado}`] : undefined) ?? ex.papeis[mu.id];
      if (papel !== 'p' || mu.pts.length < 3) continue;
      const P = mu.pts.map((p) => naTela(cam, p));
      let a = 0;
      for (let i = 0; i < P.length; i++) a += P[i]![0] * P[(i + 1) % P.length]![1] - P[(i + 1) % P.length]![0] * P[i]![1];
      total += Math.abs(a) / 2;
    }
    pior = Math.min(pior, total);
  }
  return pior;
}
/**
 * As vistas do exercício na ordem em que mostram o músculo principal (cuidado 10 do bloco B: a vista padrão de cada
 * modo é escolhida por medida). `mostra` = a vista serve ao modo Músculos: o principal aparece com pelo menos um terço
 * da área da melhor vista. As que não servem não devem ser oferecidas nesse modo.
 */
export function vistasDoModoMusculos(ex: Exercicio, corpo: Corpo): { vista: IdVista; area: number; mostra: boolean }[] {
  const medidas = (ex.vistas as IdVista[]).map((vista) => ({ vista, area: areaDoPrincipal(ex, corpo, vista) })).sort((a, b) => b.area - a.area);
  const melhor = medidas[0]?.area ?? 0;
  return medidas.map((x) => ({ ...x, mostra: x.area > 0 && x.area >= melhor / 3 }));
}

/* ============================== enquadramento e rótulos ============================== */
type VB = [number, number, number, number];
/**
 * A caixa do corpo e do equipamento no ciclo inteiro (e nos erros dessa vista): o que o quadro precisa conter. Ela
 * pede 12 quadros do ciclo e 6 de cada erro, e sem ela não se põe nem o primeiro rótulo: as do corpo e do desenho que
 * o app usa já vêm calculadas, no arquivo de cada exercício (./preparo.ts); as outras são calculadas na hora, com o
 * mesmo resultado.
 */
const CAIXAS = new WeakMap<Exercicio, Map<string, Caixa>>();
export function caixaDoCiclo(ex: Exercicio, o: Omit<OpcoesCena, 'modo' | 'erro'>): Caixa {
  let m = CAIXAS.get(ex);
  if (!m) CAIXAS.set(ex, (m = new Map()));
  const chave = [o.corpo.id, o.vista, o.boneco, o.mini ? 1 : 0, o.equipamento ?? ''].join('|');
  let c = m.get(chave);
  if (c) return c;
  // o cor de pele usa a caixa do cinza: o corpo é o mesmo (o cabelo acrescenta menos de 1 cm no alto da cabeça)
  const chaveDoCinza = [o.corpo.id, o.vista, 'cinza', o.mini ? 1 : 0, o.equipamento ?? ''].join('|');
  const guardada = enquadramentoGuardado(ex.ficha.id)?.caixas[chaveDoCinza];
  if (guardada?.length === 4) {
    m.set(chave, (c = guardada as Caixa));
    return c;
  }
  const T = duracao(ex.ficha.fases);
  c = [1e9, 1e9, -1e9, -1e9];
  // o exercício pode pedir, numa vista, só alguns pontos no quadro (Exercicio.enquadra): o resto é cortado pela borda
  const so = ex.enquadra?.[o.vista];
  if (so) {
    const cam = VISTAS[o.vista];
    const ponha = (q: Quadro) => {
      for (const p of so(q)) {
        const t = naTela(cam, p);
        c![0] = Math.min(c![0], t[0]);
        c![1] = Math.min(c![1], t[1]);
        c![2] = Math.max(c![2], t[0]);
        c![3] = Math.max(c![3], t[1]);
      }
    };
    for (let i = 0; i < 12; i++) ponha(quadroDe(ex, o.corpo, instante(ex.ficha.fases, (i / 12) * T).u));
    for (const e of ex.ficha.erros) if (e.vista === o.vista) for (let i = 0; i < 6; i++) ponha(quadroDe(ex, o.corpo, instante(ex.ficha.fases, (i / 6) * T).u, e.id));
    m.set(chave, c);
    return c;
  }
  const junta = (itens: Item[]) => {
    const k = caixaDosItens(itens.filter((it) => it.camada >= 1));
    c![0] = Math.min(c![0], k[0]);
    c![1] = Math.min(c![1], k[1]);
    c![2] = Math.max(c![2], k[2]);
    c![3] = Math.max(c![3], k[3]);
  };
  for (let i = 0; i < 12; i++) junta(itensDaCena(ex, (i / 12) * T, { ...o, modo: 'tec' }));
  for (const e of ex.ficha.erros) if (e.vista === o.vista) for (let i = 0; i < 6; i++) junta(itensDaCena(ex, (i / 6) * T, { ...o, modo: 'err', erro: e.id }));
  m.set(chave, c);
  return c;
}
/** Tamanho da letra dos rótulos, no sistema do desenho: 11 px num palco de 360 px de largura, qualquer que seja a cena. */
const tamDaLetra = (vb: VB) => (vb[2] * 11) / 360;
const TAM_DO_ERRO = 1.1;
/** Posição média de um ponto do corpo no ciclo (para o texto ficar parado ao lado de onde o ponto passa). */
function alvoMedio(ex: Exercicio, o: Omit<OpcoesCena, 'modo'>, nome: string): P2 {
  const cam = VISTAS[o.vista];
  let x = 0,
    y = 0,
    n = 0;
  for (let i = 0; i <= 8; i++) {
    const q = quadroDe(ex, o.corpo, i / 8, o.erro);
    for (const k of ladosNaVista(ex, cam)) {
      const p = naTela(cam, pontoDoRotulo(q.esq, nome, k, q.marcas));
      x += p[0];
      y += p[1];
      n++;
    }
  }
  return [x / n, y / n];
}
/** Onde ficam os textos de um modo, num quadro: os rótulos de técnica da vista, ou o nome do erro. Guardado. */
const POSTOS = new WeakMap<Exercicio, Map<string, (RotuloPosto | null)[]>>();
function rotulosPostos(ex: Exercicio, o: OpcoesCena, vb: VB): (RotuloPosto | null)[] {
  let m = POSTOS.get(ex);
  if (!m) POSTOS.set(ex, (m = new Map()));
  const chave = [o.corpo.id, o.vista, o.boneco, o.modo, o.erro ?? '', o.equipamento ?? '', vb.map(f1).join(',')].join('|');
  let r = m.get(chave);
  if (r) return r;
  const corpo = caixaDoCiclo(ex, o);
  const tam = tamDaLetra(vb);
  if (o.modo === 'err') {
    const def = ex.ficha.erros.find((e) => e.id === o.erro);
    r = def ? disporRotulos([{ texto: def.titulo, alvo: alvoMedio(ex, o, def.foco) }], corpo, vb, tam * TAM_DO_ERRO, 20) : [];
  } else {
    const lista = o.modo === 'tec' ? ex.ficha.rotulos.filter((x) => x.vista === o.vista) : [];
    r = disporRotulos(
      lista.map((x) => ({ texto: x.texto, alvo: alvoMedio(ex, { ...o, erro: undefined }, x.ponto), acima: x.acima })),
      corpo,
      vb,
      tam,
    );
  }
  m.set(chave, r);
  return r;
}
/**
 * Caixa de visualização do exercício numa vista: cabe o ciclo inteiro (e os erros dessa vista), na proporção pedida
 * (4:3 no palco, 1:1 na miniatura), com o corpo no meio. No palco, o quadro abre o que for preciso para os rótulos
 * de técnica e o nome de cada erro caberem fora do corpo.
 */
export function enquadrar(ex: Exercicio, o: Omit<OpcoesCena, 'modo' | 'erro'>, margem = 0.06, proporcao = 4 / 3): VB {
  const c = caixaDoCiclo(ex, o);
  let w = c[2] - c[0],
    h = c[3] - c[1];
  let x0 = c[0] - w * margem,
    y0 = c[1] - h * margem * 1.5;
  w *= 1 + 2 * margem;
  h *= 1 + 2.5 * margem;
  if (w / h > proporcao) {
    const nh = w / proporcao;
    y0 -= (nh - h) * 0.6;
    h = nh;
  } else {
    const nw = h * proporcao;
    x0 -= (nw - w) / 2;
    w = nw;
  }
  if (o.mini) return [x0, y0, w, h];
  // abre o quadro (em volta do meio, mantendo a base) até todos os textos caberem
  for (let i = 0; i < 10; i++) {
    const vb: VB = [x0, y0, w, h];
    const cabe = (modo: Modo, erro?: string) => rotulosPostos(ex, { ...o, modo, erro }, vb).every((r) => r !== null);
    if (cabe('tec') && ex.ficha.erros.filter((e) => e.vista === o.vista).every((e) => cabe('err', e.id))) break;
    const k = 1.06;
    x0 -= (w * (k - 1)) / 2;
    y0 -= h * (k - 1);
    w *= k;
    h *= k;
  }
  return [x0, y0, w, h];
}
/** A camada dos textos de um quadro: rótulos de técnica com as linhas-guia, ou o nome do erro, com o fio até o corpo. */
function camadaDeRotulos(ex: Exercicio, u: number, o: OpcoesCena, vb: VB): string {
  if (o.mini || o.modo === 'mus') return '';
  const cam = VISTAS[o.vista];
  if (o.modo === 'traj') {
    // o nome de cada linha da trajetória, fora do corpo, com um fio até o fim da linha
    const nomes = trajetoriasDesenhadas(ex, o.corpo, cam);
    const tamT = tamDaLetra(vb);
    const lugares = disporRotulos(
      nomes.map((n) => ({ texto: n.nome, alvo: n.fim })),
      caixaDoCiclo(ex, o),
      vb,
      tamT,
    );
    return nomes
      .map((n, i) => {
        const r = lugares[i];
        if (!r) return '';
        const de = saidaDoFio(r, tamT);
        return `<line class="n-traj-fio" x1="${f1(de[0])}" y1="${f1(de[1])}" x2="${f1(n.fim[0])}" y2="${f1(n.fim[1])}"/>${textoDoRotulo(r, tamT, 'n-traj-t')}`;
      })
      .join('');
  }
  const postos = rotulosPostos(ex, o, vb);
  const tam = tamDaLetra(vb);
  const lados = ladosNaVista(ex, cam);
  const xy = (p: P2) => `${f1(p[0])}" y1="${f1(p[1])}`;
  /** O ponto do corpo (do lado mais perto do texto) e o fio do texto até ele. */
  const fio = (r: RotuloPosto, e: EsqQ, nome: string, t: number, classe: string, marcas?: Quadro['marcas']) => {
    const de = saidaDoFio(r, t);
    const alvos = lados.map((k) => naTela(cam, pontoDoRotulo(e, nome, k, marcas)));
    const a = alvos.reduce((m, p) => (Math.hypot(p[0] - de[0], p[1] - de[1]) < Math.hypot(m[0] - de[0], m[1] - de[1]) ? p : m));
    return { a, s: `<line class="${classe}" x1="${xy(de)}" x2="${f1(a[0])}" y2="${f1(a[1])}"/>` };
  };
  let s = '';
  if (o.modo === 'err') {
    const def = ex.ficha.erros.find((x) => x.id === o.erro),
      r = postos[0];
    if (!def || !r) return '';
    const t = tam * TAM_DO_ERRO;
    return fio(r, quadroDe(ex, o.corpo, u, o.erro).esq, def.foco, t, 'n-err-fio').s + textoDoRotulo(r, t, 'n-err-t');
  }
  const qu = quadroDe(ex, o.corpo, u),
    e = qu.esq;
  ex.ficha.rotulos
    .filter((x) => x.vista === o.vista)
    .forEach((x, i) => {
      const pts = (P: P2[]) => P.map((p) => `${f1(p[0])},${f1(p[1])}`).join(' ');
      if (x.prumo) for (const k of lados) s += `<polyline class="n-guia-l" points="${pts([naTela(cam, ponto(e, x.prumo.de, k)), naTela(cam, add(ponto(e, x.prumo.de, k), [0, x.prumo.alt, 0]))])}"/>`;
      if (x.seta)
        for (const k of lados) {
          // a seta fica um pouco para fora do ponto, do lado de fora do corpo, e aponta para baixo
          const c = ponto(e, x.seta.de, k),
            fora = (k === 'R' ? -1 : 1) * 7;
          const a = naTela(cam, add(c, [fora, x.seta.desce * 0.45, 0])),
            b = naTela(cam, add(c, [fora, -x.seta.desce * 0.55, 0]));
          const u = tam * 0.34;
          s += `<polyline class="n-seta-l" points="${pts([a, b])}"/><polygon class="n-seta-p" points="${pts([
            [b[0] - u, b[1] - u * 1.5],
            [b[0] + u, b[1] - u * 1.5],
            [b[0], b[1] + u * 0.4],
          ])}"/>`;
        }
      if (x.guia) for (const k of lados) s += `<polyline class="n-guia-l" points="${pts(x.guia.map((nome) => naTela(cam, ponto(e, nome, k))))}"/>`;
      const r = postos[i];
      if (!r) return;
      const f = fio(r, e, x.ponto, tam, 'n-rot-fio', qu.marcas);
      s += `${f.s}<circle class="n-rot-p" cx="${f1(f.a[0])}" cy="${f1(f.a[1])}" r="${f1(tam * 0.22)}"/>${textoDoRotulo(r, tam, 'n-rot-t')}`;
    });
  return s;
}
/** O <svg> de um quadro. `tema`: 'claro' ou 'escuro'. As classes levam as cores (ver cssDoBoneco e estilo.css). */
export function svgDaCena(ex: Exercicio, t: number, o: OpcoesCena, vb: [number, number, number, number], tema: Tema = 'claro'): string {
  return svgEmU(ex, instante(ex.ficha.fases, t).u, o, vb, tema);
}
/**
 * O pintor por pares (./pintor-por-pares.ts), quando carregado. Ele fica fora do pacote do motor (o app só o baixa
 * quando abre uma animação em que ele está ligado: src/features/programa/trabalhoBoneco.ts o carrega junto com ela e o
 * entrega aqui); os scripts o recebem pelo ./index.ts.
 */
let PINTOR_POR_PARES: ((itens: Item[]) => string) | null = null;
export function registrarPintorPorPares(pintor: (itens: Item[]) => string): void {
  PINTOR_POR_PARES = pintor;
}
/**
 * O corpo e o equipamento pintados por pares (./pintor-por-pares.ts) num ponto do movimento, guardados: a ordem por pares
 * custa várias vezes a de hoje, e o mesmo ponto do movimento volta muitas vezes na volta da animação (nas pausas, e no
 * começo e no fim do ciclo: um terço dos quadros, ou mais). O quadro do movimento é o mesmo para o mesmo u arredondado
 * a 1/400 (quadroDe), e o desenho também. Só a animação que está na tela fica guardada (como em svgAnimado).
 */
const PINTADOS = { ex: null as Exercicio | null, chave: '', quadros: new Map<number, { corpo: string; defs: string }>() };
function pintadoPorPares(ex: Exercicio, u: number, o: OpcoesCena): string {
  const chave = [o.corpo.id, o.vista, o.boneco, o.modo, o.erro ?? '', o.mini ? 1 : 0, o.equipamento ?? '', o.tema ?? ''].join('|');
  if (PINTADOS.ex !== ex || PINTADOS.chave !== chave) {
    PINTADOS.ex = ex;
    PINTADOS.chave = chave;
    PINTADOS.quadros.clear();
  }
  const k = Math.round(u * 400);
  let p = PINTADOS.quadros.get(k);
  if (!p) {
    // sem o pintor carregado, um erro, e não o desenho de hoje no lugar do aprovado
    if (!PINTOR_POR_PARES) throw new Error(`o pintor por pares não foi carregado (registrarPintorPorPares), e ${ex.ficha.id} o pede`);
    const corpo = PINTOR_POR_PARES(itensEmU(ex, u, o));
    PINTADOS.quadros.set(k, (p = { corpo, defs: DEFS }));
  }
  DEFS = p.defs;
  return p.corpo;
}
function svgEmU(ex: Exercicio, u: number, o: OpcoesCena, vb: [number, number, number, number], tema: Tema): string {
  // a linha do chão (y = 0), nas vistas em que o chão fica de perfil
  const chao = VISTAS[o.vista].para[1] === 0 ? `<line class="n-chao-l" x1="${f1(vb[0])}" y1="0" x2="${f1(vb[0] + vb[2])}" y2="0"/>` : '';
  DEFS = '';
  const corpo = (o.pintor ?? (PINTOR_POR_PARES_LIGADO.has(ex.ficha.id) ? 'pares' : 'hoje')) === 'pares' ? pintadoPorPares(ex, u, { ...o, tema }) : pintar(itensEmU(ex, u, { ...o, tema }));
  return `<svg class="novo boneco ${o.boneco}${tema === 'escuro' ? ' escuro' : ''}${o.mini ? ' mini' : ''}" viewBox="${vb.map(f1).join(' ')}">${DEFS_DO_BONECO}${DEFS ? `<defs>${DEFS}</defs>` : ''}${chao}${corpo}${camadaDeRotulos(ex, u, o, vb)}</svg>`;
}
/**
 * Para a animação: o mesmo desenho de svgDaCena, guardando o SVG pronto de cada instante do movimento. O movimento
 * se repete igual a cada volta do ciclo, então da segunda volta em diante o quadro já está montado. O ponto do
 * movimento é arredondado a 1/240 do percurso (menos de 0,5 cm no movimento mais longo). Só a animação que está na
 * tela fica guardada: ao trocar de exercício, vista, modo, desenho ou tema, o que estava guardado é descartado.
 */
const PASSOS_GUARDADOS = 240;
const PRONTOS = { chave: '', quadros: new Map<number, string>() };
export function svgAnimado(ex: Exercicio, t: number, o: OpcoesCena, vb: [number, number, number, number], tema: Tema = 'claro'): string {
  const chave = [ex.ficha.id, o.corpo.id, o.vista, o.boneco, o.modo, o.erro ?? '', o.mini ? 1 : 0, o.equipamento ?? '', o.pintor ?? '', tema, vb.join(',')].join('|');
  if (chave !== PRONTOS.chave) {
    PRONTOS.chave = chave;
    PRONTOS.quadros.clear();
  }
  const k = Math.round(instante(ex.ficha.fases, t).u * PASSOS_GUARDADOS);
  let svg = PRONTOS.quadros.get(k);
  if (svg === undefined) PRONTOS.quadros.set(k, (svg = svgEmU(ex, k / PASSOS_GUARDADOS, o, vb, tema)));
  return svg;
}
export { pintar };

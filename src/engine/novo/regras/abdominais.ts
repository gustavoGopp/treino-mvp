// As regras medidas dos abdominais deitados (no chão, invertido e na bola). Medem a superfície do Boneco (e não a
// aproximação que o núcleo usa para pôr o corpo no chão).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { poseEmPe, resolver } from '../esqueleto';
import type { Esq } from '../esqueleto';
import { entraNaBola, regioesDasCostas } from '../exercicios/abdominal';
import { formaDaBola } from '../pecas-de-cena/bola-suica';
import type { Corpo } from '../tabelas';
import { angulo, anguloEm, dist, paraRef, sub } from '../vec';

/** O ponto mais baixo (y) de cada parte do Boneco. */
function maisBaixos(e: Esq): Record<string, number> {
  const out: Record<string, number> = {};
  for (const { p, parte } of pontosDoBoneco(e)) out[parte] = Math.min(out[parte] ?? 1e9, p[1]);
  return out;
}
/**
 * O ponto mais baixo das costas da altura das escápulas para cima: a pele do tronco acima do ângulo inferior da
 * escápula (no referencial do tórax), medida a partir de `chao`.
 */
export function escapulasAoChao(e: Esq, chao = 0): number {
  const yInf = Math.max(paraRef(e.torax, e.lado.R.escapula.anguloInferior)[1], paraRef(e.torax, e.lado.L.escapula.anguloInferior)[1]);
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'tronco' && paraRef(e.torax, p)[1] > yInf) m = Math.min(m, p[1] - chao);
  return m;
}
/**
 * De quanto a cabeça dobra sobre o alto do tórax (a direção da coluna em C7–T1) além do que dobra em pé (graus): o
 * pescoço "acompanha" o tronco quando é pouco.
 */
const EM_PE = new WeakMap<Corpo, number>();
export function cabecaSobreOTorax(e: Esq): number {
  let a0 = EM_PE.get(e.corpo);
  if (a0 === undefined) {
    const p = resolver(e.corpo, poseEmPe(e.corpo));
    a0 = anguloEm(p.nos[p.iC7]!.ref.y, p.cabeca.y, p.cabeca.x);
    EM_PE.set(e.corpo, a0);
  }
  return anguloEm(e.nos[e.iC7]!.ref.y, e.cabeca.y, e.cabeca.x) - a0;
}
/** A menor distância da pele da cabeça à pele das mãos (cm). */
function maosACabeca(e: Esq): number {
  const pts = pontosDoBoneco(e);
  const cab = pts.filter((x) => x.parte === 'cabeca').map((x) => x.p),
    maos = pts.filter((x) => x.parte === 'mao' || x.parte === 'polegar').map((x) => x.p);
  let d = 1e9;
  for (const a of cab) for (const b of maos) d = Math.min(d, dist(a, b));
  return d;
}

export const REGRAS_ABDOMINAIS: Record<string, Regra> = {
  'abdominal-escapulas-saem-do-chao': (q) => {
    const ini = escapulasAoChao(q[0]!.esq),
      fim = escapulasAoChao(q[q.length - 1]!.esq);
    return { medido: `embaixo, as costas na altura das escápulas ficam a ${f1(ini)} cm do chão; no topo, a ${f1(fim)} cm (o tórax a ${f1(inclinacao(q[q.length - 1]!.esq))}° do chão)`, ok: ini >= -1.5 && ini <= 1 && fim >= 2 };
  },
  'abdominal-lombar-apoiada': (q) => {
    const pel = faixa(q.map((x) => maisBaixos(x.esq).pelve!));
    const t12 = q.map((x) => x.esq.nos[x.esq.iT12]!.ref.o[1]);
    const sobe = Math.max(...t12) - t12[0]!;
    return { medido: `a pele do glúteo fica de ${f1(pel[0])} a ${f1(pel[1])} cm do chão; a coluna em T12–L1 (o alto da lombar) sobe ${f1(sobe)} cm`, ok: pel[0] >= -1.5 && pel[1] <= 0.5 && sobe <= 2 };
  },
  'abdominal-pescoco-acompanha': (q) => {
    const a = q.map((x) => cabecaSobreOTorax(x.esq));
    const [min, max] = faixa(a);
    return { medido: `a cabeça dobra sobre o alto do tórax de ${f1(min)}° a ${f1(max)}° além do que dobra em pé (positivo = o queixo para o peito)`, ok: max <= 20 };
  },
  'abdominal-maos-no-peito': (q) => {
    // as mãos andam presas ao tórax e longe da cabeça (não a puxam)
    const anda = Math.max(...q.flatMap((x) => (['R', 'L'] as const).map((k) => dist(paraRef(x.esq.torax, x.esq.lado[k].punho), paraRef(q[0]!.esq.torax, q[0]!.esq.lado[k].punho)))));
    const longe = Math.min(...[q[0]!, q[q.length - 1]!].map((x) => maosACabeca(x.esq)));
    return { medido: `os punhos andam ${f1(anda)} cm em relação ao tórax; a mão mais perto da cabeça fica a ${f1(longe)} cm dela`, ok: anda <= 0.3 && longe >= 5 };
  },
  // ----- abdominal invertido -----
  'abdominal-invertido-quadril-sai-do-chao': (q) => {
    const ini = q[0]!.esq,
      fim = q[q.length - 1]!.esq;
    const g0 = maisBaixos(ini).pelve!,
      g1 = maisBaixos(fim).pelve!;
    // os joelhos vêm para o peito: quanto o joelho anda na direção da cabeça
    const vem = ini.lado.R.joelho[2] - fim.lado.R.joelho[2];
    return { medido: `embaixo, a pele do glúteo fica a ${f1(g0)} cm do chão; no alto, a ${f1(g1)} cm (o centro da bacia sobe ${f1(fim.pelve.o[1] - ini.pelve.o[1])} cm); o joelho anda ${f1(vem)} cm na direção da cabeça`, ok: g0 >= -1.5 && g0 <= 0.5 && g1 >= 5 && vem > 0 };
  },
  'abdominal-invertido-coxas-na-vertical': (q) => {
    const L = q[0]!.esq.lado.R;
    const coxa = angulo(sub(L.joelho, L.quadril), [0, 1, 0]);
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.joelho));
    return { medido: `embaixo, a coxa fica a ${f1(coxa)}° da vertical; o joelho dobra de ${f1(a)}° a ${f1(b)}°`, ok: coxa <= 5 && a >= 80 && b <= 100 };
  },
  // ----- abertura em T deitado de bruços -----
  'abertura-t-testa-na-toalha': (q) => {
    const topo = q[0]!.marcas.toalha![1];
    const testa = q.map((x) => maisBaixos(x.esq).cabeca! - topo);
    const [a, b] = faixa(testa);
    const debrucos = q.every((x) => x.esq.torax.z[1] < -0.8);
    return { medido: `${debrucos ? 'de bruços' : 'NÃO está de bruços'}; o ponto mais baixo da cabeça fica de ${f1(a)} a ${f1(b)} cm do tampo da toalha`, ok: debrucos && a >= -1.5 && b <= 0.5 };
  },
  'abertura-t-bracos-em-t': (q) => {
    // visto de cima, o braço contra a linha do corpo; e o cotovelo
    const ang = q.map((x) => {
      const L = x.esq.lado.R;
      const b = sub(L.cotovelo, L.ombro);
      return angulo([b[0], 0, b[2]], [x.esq.torax.y[0], 0, x.esq.torax.y[2]]);
    });
    const [a, b] = faixa(ang);
    const cot = Math.max(...q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `visto de cima, o braço fica de ${f1(a)}° a ${f1(b)}° da linha do corpo; o cotovelo dobra no máximo ${f1(cot)}°`, ok: a >= 80 && b <= 100 && cot <= 10 };
  },
  'abertura-t-amplitude': (q) => {
    const mao = (e: Esq) => Math.min(...pontosDoBoneco(e).filter((x) => x.parte === 'mao' || x.parte === 'polegar').map((x) => x.p[1]));
    const ini = q[0]!.esq,
      fim = q[q.length - 1]!.esq;
    const chao = mao(ini);
    const acima = fim.lado.R.pegada[1] - fim.lado.R.ombro[1];
    return { medido: `embaixo, a mão fica a ${f1(chao)} cm do chão; no alto, o centro da mão fica ${f1(acima)} cm acima do centro do ombro`, ok: chao >= 1 && chao <= 6 && acima >= 0 && acima <= 15 };
  },
  'abertura-t-ombros-baixos': (q) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.claviculaElev));
    const sobe = q.map((x) => x.esq.lado.R.acromioclavicular[2] - q[0]!.esq.lado.R.acromioclavicular[2]);
    return { medido: `a clavícula fica de ${f1(a)}° a ${f1(b)}° de elevação; a ponta do ombro anda ${f1(Math.max(...sobe.map(Math.abs)))} cm na direção da cabeça`, ok: b - a <= 3 };
  },
  // ----- abdominal na bola suíça -----
  'abdominal-bola-lombar-na-bola': (q) => {
    const R = formaDaBola().R;
    const lomb = q.map((x) => entraNaBola(regioesDasCostas(x.esq).lombar, x.marcas.bola!, R));
    const todo = q.map((x) => entraNaBola(pontosDoBoneco(x.esq).filter((y) => y.parte !== 'pe').map((y) => y.p), x.marcas.bola!, R));
    const [a, b] = faixa(lomb);
    const anda = Math.max(...q.map((x) => dist(x.marcas.bola!, q[0]!.marcas.bola!)));
    return { medido: `a pele da lombar entra na bola de ${f1(a)} a ${f1(b)} cm (negativo = a folga); nenhum ponto do corpo entra mais de ${f1(Math.max(...todo))} cm; a bola anda ${f1(anda)} cm`, ok: a >= -1.5 && b <= 1.5 && Math.max(...todo) <= 1.5 && anda <= 0.1 };
  },
  'abdominal-bola-escapulas-saem-da-bola': (q) => {
    const R = formaDaBola().R;
    const esc = (x: (typeof q)[number]) => entraNaBola(regioesDasCostas(x.esq).escapulas, x.marcas.bola!, R);
    const ini = esc(q[0]!),
      fim = esc(q[q.length - 1]!);
    const incl = inclinacao(q[q.length - 1]!.esq);
    return { medido: `embaixo, a pele das costas na altura das escápulas entra ${f1(ini)} cm na bola (encosta); no topo, fica a ${f1(-fim)} cm dela, com o tórax a ${f1(incl)}° da horizontal`, ok: ini >= -1 && ini <= 1.5 && fim <= -2 && incl <= 60 };
  },
  'abdominal-bola-cabeca-nao-cai': (q) => {
    const [min, max] = faixa(q.map((x) => cabecaSobreOTorax(x.esq)));
    return { medido: `a cabeça dobra sobre o alto do tórax de ${f1(min)}° a ${f1(max)}° além do que dobra em pé (negativo = cai para trás)`, ok: min >= -10 && max <= 20 };
  },
};
function inclinacao(e: Esq): number {
  const a = e.nos[e.iT12]!.ref.o,
    b = e.torax.o;
  return (Math.atan2(b[1] - a[1], Math.abs(b[2] - a[2])) * 180) / Math.PI;
}

// Regras medidas das flexões de braço (lote 2): o que as fichas da técnica pedem e as regras de ../conferir.ts não
// medem. Cada uma recebe os quadros do começo até o fim da primeira fase com movimento.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { angulo, dist, mul, norm, paraRef, sub } from '../vec';

/** Ângulo do braço com o tronco, visto de cima, no último quadro (embaixo). */
function bracoDeCima(q: Parameters<Regra>[0]): number {
  const esq = q[q.length - 1]!.esq,
    L = esq.lado.R;
  const b = norm(sub(L.cotovelo, L.ombro));
  return angulo([b[0], 0, b[2]], mul(esq.torax.y, -1));
}

export const regrasDasFlexoes: Record<string, Regra> = {
  // flexão com as mãos juntas: "de cima, as mãos ficam por dentro da linha dos ombros"
  'maos-por-dentro-dos-ombros': (q, corpo) => {
    const L = q[0]!.esq.lado.R;
    const bordaDeFora = Math.abs(L.punho[0]) + corpo.m('mao.largura') / 2,
      ombro = corpo.m('largura.bideltoide') / 2;
    return { medido: `a borda de fora da mão fica a ${f1(bordaDeFora)} cm do meio do corpo; a linha de fora do ombro, a ${f1(ombro)} cm`, ok: bordaDeFora <= ombro };
  },
  // "cotovelos rentes ao corpo": abaixo da faixa "a meio caminho" (30° a 60°) da flexão
  'cotovelos-rentes': (q) => {
    const a = bracoDeCima(q);
    return { medido: `embaixo, o braço faz ${f1(a)}° com o tronco, visto de cima`, ok: a < 30 };
  },
  // pés elevados: os pés ficam no tampo do apoio, sem sair do lugar
  'pes-no-apoio': (q) => {
    const topo = q[0]!.marcas.apoioDosPes![1];
    const folgas = q.map((x) => {
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'pe') min = Math.min(min, p[1]);
      return min - topo;
    });
    const [a, b] = faixa(folgas);
    return { medido: `o ponto mais baixo dos pés fica de ${f1(a)} a ${f1(b)} cm do tampo do apoio`, ok: a >= -1.5 && b <= 1 };
  },
  // pés elevados: a cabeça abaixo do quadril (a ficha avisa) e sem bater no chão embaixo
  'cabeca-livre-do-chao': (q) => {
    const esq = q[q.length - 1]!.esq;
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(esq)) if (parte === 'cabeca') min = Math.min(min, p[1]);
    return { medido: `embaixo, o ponto mais baixo da cabeça fica a ${f1(min)} cm do chão`, ok: min >= 1 };
  },
  // elástico nas costas: o meio dele passa na altura das escápulas, abaixo do pescoço
  'elastico-nas-escapulas': (q) => {
    const d = q.map((x) => -paraRef(x.esq.torax, x.marcas.elasticoNasCostas!)[1]);
    const [a, b] = faixa(d);
    return { medido: `o meio do elástico fica de ${f1(a)} a ${f1(b)} cm abaixo da base do pescoço (C7), nas costas`, ok: a >= 6 && b <= 22 };
  },
  // elástico: as pontas ficam presas sob as palmas (não saem do lugar)
  'pontas-sob-as-palmas': (q) => {
    const anda = Math.max(...q.map((x) => dist(x.marcas.pontaDoElastico!, q[0]!.marcas.pontaDoElastico!)));
    return { medido: `a ponta do elástico sob a mão anda ${f1(anda)} cm no ciclo`, ok: anda <= 0.1 };
  },
};

// Regras medidas das flexões de braço (lote 2): o que as fichas da técnica pedem e as regras de ../conferir.ts não
// medem. Cada uma recebe os quadros do começo até o fim da primeira fase com movimento.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { obj } from '../tabelas';
import { angulo, dist, mul, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

/** Ângulo do braço com o tronco, visto de cima, no último quadro (embaixo). */
function bracoDeCima(q: Parameters<Regra>[0]): number {
  const esq = q[q.length - 1]!.esq,
    L = esq.lado.R;
  const b = norm(sub(L.cotovelo, L.ombro));
  return angulo([b[0], 0, b[2]], mul(esq.torax.y, -1));
}

/** Só o que se vê de lado (sem a distância para o lado). */
const deLado = (v: V3): V3 => [0, v[1], v[2]];

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
  // ----- flexão de joelho na bola (deitado de costas; q[0] = pernas estendidas, último = joelhos dobrados) -----
  'bola-linha-no-inicio': (q) => {
    const L = q[0]!.esq.lado.R;
    const a = angulo(deLado(sub(L.ombro, L.quadril)), deLado(sub(L.calcanhar, L.quadril)));
    return { medido: `no começo, ombro, quadril e calcanhar fazem ${f1(a)}° de lado (180° = linha reta)`, ok: a >= 170 };
  },
  'bola-joelhos-a-90': (q) => {
    const a = q[q.length - 1]!.esq.lado.R.ang.joelho;
    return { medido: `no fim, o joelho dobra ${f1(a)}°`, ok: a >= 80 && a <= 100 };
  },
  'bola-quadril-sobe': (q) => {
    const a = q[0]!.esq.pelve.o[1],
      b = q[q.length - 1]!.esq.pelve.o[1];
    return { medido: `o centro da pelve sobe de ${f1(a)} para ${f1(b)} cm do chão`, ok: b > a + 5 };
  },
  'bola-quadril-alto': (q) => {
    const min = Math.min(...q.map((x) => Math.min(...pontosDoBoneco(x.esq).filter((p) => p.parte === 'pelve').map((p) => p.p[1]))));
    return { medido: `o ponto mais baixo da bacia fica a no mínimo ${f1(min)} cm do chão`, ok: min >= 5 };
  },
  'bola-pes-na-bola': (q) => {
    // o ponto do pé direito mais perto da bola (na superfície do Boneco): negativo = o pé afunda na bola
    const R = obj('bolaSuica', 'diam') / 2;
    const d = q.map((x) => Math.min(...pontosDoBoneco(x.esq).filter((p) => p.parte === 'pe' && p.p[0] < 0).map((p) => dist(p.p, x.marcas.bola!) - R)));
    const [a, b] = faixa(d);
    return { medido: `o pé fica de ${f1(-b)} a ${f1(-a)} cm para dentro da superfície da bola (a bola cede um pouco)`, ok: a >= -2 && b <= 0.5 };
  },
  'bola-pernas-fora-da-bola': (q) => {
    const R = obj('bolaSuica', 'diam') / 2;
    let pior = 0,
      qual = '';
    for (const x of q.filter((_, i) => i % 6 === 0 || i === q.length - 1))
      for (const { p, parte } of pontosDoBoneco(x.esq))
        if (parte === 'coxa' || parte === 'canela') {
          const dentro = R - dist(p, x.marcas.bola!);
          if (dentro > pior) {
            pior = dentro;
            qual = parte;
          }
        }
    return { medido: pior > 0 ? `até ${f1(pior)} cm para dentro da bola (${qual})` : 'nenhum ponto das pernas entra na bola', ok: pior <= 2 };
  },
  // deitado de costas na ponte alta: as costas e a cabeça ficam no chão e os ombros não escorregam. O centro do ombro
  // sobe um pouco quando o tronco gira sobre a parte de cima das costas (a ponte sobe); o que não pode é ele andar.
  'bola-costas-e-cabeca-no-chao': (q) => {
    const baixo = (x: (typeof q)[number], parte: string) => Math.min(...pontosDoBoneco(x.esq).filter((p) => p.parte === parte).map((p) => p.p[1]));
    const [ta, tb] = faixa(q.map((x) => Math.min(baixo(x, 'tronco'), baixo(x, 'pescoco'))));
    const [ca, cb] = faixa(q.map((x) => baixo(x, 'cabeca')));
    const anda = Math.max(...q.map((x) => Math.abs(x.esq.lado.R.ombro[2] - q[0]!.esq.lado.R.ombro[2])));
    return { medido: `o ponto mais baixo das costas e da nuca fica de ${f1(ta)} a ${f1(tb)} cm do chão e o da cabeça de ${f1(ca)} a ${f1(cb)} cm; o ombro anda ${f1(anda)} cm na direção do corpo`, ok: ta >= -1.5 && tb <= 1 && ca >= -1.5 && cb <= 1 && anda <= 1 };
  },
  // elástico: as pontas ficam presas sob as palmas (não saem do lugar)
  'pontas-sob-as-palmas': (q) => {
    const anda = Math.max(...q.map((x) => dist(x.marcas.pontaDoElastico!, q[0]!.marcas.pontaDoElastico!)));
    return { medido: `a ponta do elástico sob a mão anda ${f1(anda)} cm no ciclo`, ok: anda <= 0.1 };
  },
};

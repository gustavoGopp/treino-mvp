// Regras medidas do agachamento goblet com kettlebell. As do agachamento (quadril na altura do joelho, joelho na
// direção do pé, peso no meio do pé, lombar neutra) estão em ../conferir.ts.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { formaDoKettlebell } from '../equipamento';
import { LADOS } from '../esqueleto';
import type { Quadro } from '../movimento';
import { gobletKettlebell } from '../exercicios/goblet-kettlebell';
import { angulo, comb, dist, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { regraDePintura } from './ordem-de-pintura';
import { folgaDaCarga } from './stiffs';

/** A peça do kettlebell no quadro (base, cima e lado). */
const peca = (q: Quadro) => {
  const p = (q.pecas ?? []).find((x) => x.t === 'kettlebell');
  if (!p || p.t !== 'kettlebell') throw new Error('o quadro não tem kettlebell');
  return p;
};
/** Da bola do kettlebell à pele do tronco (cm); negativo = a bola entra no corpo. */
function folgaNoTronco(q: Quadro): number {
  const bola = q.prims.find((x) => x.t === 'esfera');
  if (!bola || bola.t !== 'esfera') return NaN;
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(q.esq)) if (parte === 'tronco' || parte === 'cintura' || parte === 'emendaDaCintura') min = Math.min(min, dist(p, bola.c) - bola.r);
  return min;
}

export const regrasDoGobletKettlebell: Record<string, Regra> = {
  // O kettlebell (a bola, as duas hastes e a barra da alça, na ordem em que a peça as desenha) contra o corpo, nos dois
  // lados, em cada vista do guia (acréscimo de 19/11, auditoria das fases A e B): de lado, embaixo, a bola, que fica
  // entre os joelhos, empatava com o tronco na pintura e saía por cima do joelho de perto. As mãos fecham na alça e não
  // contam.
  'goblet-kettlebell-pintado-no-lugar': regraDePintura({
    exercicio: () => gobletKettlebell,
    nome: 'o kettlebell',
    fora: ['mao', 'polegar'],
    peca: (q) => {
      const p = peca(q);
      const K = formaDoKettlebell();
      const u = norm(p.cima),
        l = norm(p.lado);
      const P = (h: number, x = 0): V3 => comb([1, p.base], [h, u], [x, l]);
      const alto = K.altura - K.rAlca,
        pe = K.centro + Math.sqrt(Math.max(0, K.R * K.R - K.meiaAlca * K.meiaAlca)) - 1;
      const haste = (s: number, i: number) => ({ eixo: [P(pe, s * K.meiaAlca), P(alto, s * K.meiaAlca)], raio: K.rAlca, itens: [i] });
      return [{ peca: p, partes: [{ eixo: [P(K.centro)], raio: K.R, itens: [0] }, haste(-1, 1), haste(1, 2), { eixo: [P(alto, -K.meiaAlca - K.rAlca * 0.6), P(alto, K.meiaAlca + K.rAlca * 0.6)], raio: K.rAlca, itens: [3] }] }];
    },
  }),
  'goblet-kettlebell-junto-ao-peito': (q) => {
    const K = formaDoKettlebell();
    const amostra = q.filter((_, i) => i % 3 === 0 || i === q.length - 1);
    const fol = faixa(amostra.map(folgaNoTronco));
    // e não encosta nas coxas nem nas canelas (embaixo, ela fica entre as coxas)
    const pernas = Math.min(...amostra.map(folgaDaCarga));
    // a base para baixo: o eixo do kettlebell contra a vertical
    const incl = faixa(q.map((x) => angulo(peca(x).cima, [0, 1, 0])));
    // cada mão numa haste da alça: a distância do centro da pegada ao meio da haste
    const naHaste = Math.max(
      ...q.flatMap((x) => {
        const p = peca(x);
        return LADOS.map((k) => {
          const s = k === 'R' ? -1 : 1;
          const haste: [number, number, number] = [0, 1, 2].map((i) => p.base[i]! + p.cima[i]! * ((K.topoDaBola + K.altura - K.rAlca) / 2) + p.lado[i]! * s * K.meiaAlca) as [number, number, number];
          return dist(x.esq.lado[k].pegada, haste);
        });
      }),
    );
    return {
      medido: `da bola à pele do peito e da barriga, de ${f1(fol[0])} a ${f1(fol[1])} cm; a base fica para baixo, com o eixo de ${f1(incl[0])}° a ${f1(incl[1])}° da vertical (acompanha o tronco); cada mão fica a no máximo ${f1(naHaste)} cm do meio da sua haste da alça; a bola passa a no mínimo ${f1(pernas)} cm da pele das coxas`,
      ok: fol[0] >= -0.5 && fol[1] <= 3 && incl[1] <= 45 && naHaste <= 0.5 && pernas >= 0.5,
    };
  },
  'goblet-kettlebell-cotovelos-entre-os-joelhos': (q) => {
    const fim = q[q.length - 1]!.esq;
    // por dentro: o centro do cotovelo mais perto do meio que o centro do joelho, dos dois lados
    const dentro = Math.min(...LADOS.map((k) => Math.abs(fim.lado[k].joelho[0]) - Math.abs(fim.lado[k].cotovelo[0])));
    // para baixo: o braço (do ombro ao cotovelo) contra a vertical, o tempo todo
    const baixo = Math.max(...q.map((x) => Math.max(...LADOS.map((k) => angulo(sub(x.esq.lado[k].cotovelo, x.esq.lado[k].ombro), [0, -1, 0])))));
    // embaixo, a pele do braço contra a pele da coxa (o cotovelo não entra na coxa)
    const P = pontosDoBoneco(fim);
    const braco = P.filter((x) => x.parte === 'braco' || x.parte === 'ante').map((x) => x.p),
      coxa = P.filter((x) => x.parte === 'coxa').map((x) => x.p);
    let perto = 1e9;
    for (const a of braco) for (const b of coxa) perto = Math.min(perto, dist(a, b));
    return {
      medido: `embaixo, cada cotovelo fica ${f1(dentro)} cm para dentro do joelho; o braço desce a no máximo ${f1(baixo)}° da vertical; o braço passa a ${f1(perto)} cm da coxa (de ponto a ponto da pele)`,
      ok: dentro > 0 && baixo <= 45 && perto >= 0.5,
    };
  },
};

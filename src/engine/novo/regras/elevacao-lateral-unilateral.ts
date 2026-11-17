// Regras medidas da elevação lateral unilateral com halter, segurando num apoio (../exercicios/elevacao-lateral-unilateral.ts):
// o tronco inclinado para longe do apoio, na faixa do cartão, e o peso entre os pés (a mão livre só equilibra). O braço,
// o ombro, o tronco parado e o peso de frente para trás usam as regras das elevações (./ombros.ts e ../conferir.ts); a
// mão na parede, a da abdução em pé (./abducao-em-pe.ts). O limite vem do que a ficha pede, não do que a pose deu.
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { centroDeMassa } from '../movimento';
import type { Quadro } from '../movimento';

/** A inclinação do tronco (o eixo do tórax, da bacia ao pescoço) para a direita, longe da parede (graus; vista de frente). */
const inclinacao = (x: Quadro) => Math.atan2(-x.esq.torax.y[0], x.esq.torax.y[1]) / (Math.PI / 180);

export const REGRAS_ELEVACAO_UNILATERAL: Record<string, Regra> = {
  'elevacao-unilateral-tronco-inclinado-para-longe-do-apoio': (q) => {
    // a parede fica à esquerda (+x): longe dela é para a direita
    const parede = q[0]!.marcas.parede![0] > q[0]!.esq.pelve.o[0];
    const [a, b] = faixa(q.map(inclinacao));
    return { medido: `o tronco fica inclinado de ${f1(a)}° a ${f1(b)}° para ${parede ? 'longe da parede' : 'o lado da parede'} (vista de frente)`, ok: parede && a >= 10 && b <= 20 };
  },
  'elevacao-unilateral-peso-entre-os-pes': (q, corpo) => {
    // de lado: o centro de massa entre as bordas de dentro dos pés, perto do meio deles (a mão livre só equilibra)
    const meia = corpo.m('pe.largura') / 2;
    const d = q.map((x) => {
      const R = x.esq.lado.R,
        L = x.esq.lado.L;
      const meio = (R.bola[0] + L.bola[0]) / 2;
      return centroDeMassa(x.esq, 'homem', x.cargas)[0] - meio;
    });
    const R0 = q[0]!.esq.lado.R.bola[0],
      L0 = q[0]!.esq.lado.L.bola[0];
    const dentro = (L0 - R0) / 2 - meia;
    const [a, b] = faixa(d);
    return { medido: `de lado, o centro de massa (corpo + halter) anda de ${f1(a)} a ${f1(b)} cm do meio entre os pés (as bordas de dentro dos pés ficam a ${f1(dentro)} cm do meio)`, ok: Math.max(-a, b) <= dentro };
  },
};

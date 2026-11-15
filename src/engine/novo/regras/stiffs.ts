// Regras medidas dos stiffs (dobrar o quadril): com halteres, com kettlebell, com elástico e numa perna só.
// A lombar neutra e o peso no meio do pé (com os dois pés no chão) estão em ../conferir.ts.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { centroDeMassa } from '../movimento';
import type { Quadro } from '../movimento';
import { angulo, dist, dot, sub } from '../vec';
import type { V3 } from '../vec';

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/**
 * A menor distância (cm) entre a carga e a pele das pernas (coxa e perna), num quadro. A carga é o que o quadro tem:
 * as cabeças do halter (prisma, medido até o canto), a bola do kettlebell (esfera) ou, sem carga (o elástico), a mão.
 */
export function folgaDaCarga(q: Quadro): number {
  const P = pontosDoBoneco(q.esq);
  const pernas = P.filter((x) => x.parte === 'coxa' || x.parte === 'canela').map((x) => x.p);
  let min = 1e9;
  const cargas = q.prims.filter((p) => p.t === 'prisma' || p.t === 'esfera');
  if (cargas.length) {
    for (const c of cargas)
      for (const p of pernas) {
        if (c.t === 'prisma') min = Math.min(min, aoSegmento(p, c.a, c.b) - c.ra);
        else if (c.t === 'esfera') min = Math.min(min, dist(p, c.c) - c.r);
      }
    return min;
  }
  const maos = P.filter((x) => x.parte === 'mao').map((x) => x.p);
  for (const a of maos) for (const b of pernas) min = Math.min(min, dist(a, b));
  return min;
}
/** Inclinação do peito à frente da vertical (graus; negativo = para trás). */
const peito = (q: Quadro) => Math.atan2(q.esq.torax.y[2], q.esq.torax.y[1]) / (Math.PI / 180);

export const regrasDosStiffs: Record<string, Regra> = {
  'dobra-no-quadril': (q) => {
    const ini = q[0]!.esq,
      fim = q[q.length - 1]!.esq;
    const dq = angulosDoLado(fim, 'R').quadril - angulosDoLado(ini, 'R').quadril;
    const [j0, j1] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    const tras = ini.pelve.o[2] - fim.pelve.o[2];
    return { medido: `do alto até embaixo, o quadril dobra ${f1(dq)}° e vai ${f1(tras)} cm para trás; o joelho de apoio fica entre ${f1(j0)}° e ${f1(j1)}°`, ok: dq >= 50 && tras >= 8 && j1 - j0 <= 10 && j1 <= 30 };
  },
  'em-pe-sem-jogar-o-tronco-para-tras': (q) => {
    const a = angulosDoLado(q[0]!.esq, 'R').quadril,
      p = peito(q[0]!);
    return { medido: `em pé, o quadril dobra ${f1(a)}° e o peito fica ${f1(Math.abs(p))}° ${p >= 0 ? 'à frente' : 'para trás'} da vertical`, ok: a <= 10 && a >= -5 && p >= -2 };
  },
  'carga-rente-as-pernas': (q) => {
    const fol = q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map(folgaDaCarga);
    const [a, b] = faixa(fol);
    return { medido: `da carga (ou da mão) à pele da coxa ou da canela, de ${f1(a)} a ${f1(b)} cm na descida`, ok: a >= -0.5 && b <= 4 };
  },
  'carga-ate-o-meio-da-canela': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const t = (L.pegada[1] - L.tornozelo[1]) / (L.joelho[1] - L.tornozelo[1]);
    return { medido: `embaixo, o centro da pegada fica a ${f1(L.pegada[1])} cm do chão, a ${f1(t * 100)}% da canela (0% = tornozelo, 100% = joelho)`, ok: t >= 0.35 && t <= 0.65 };
  },
  // ----- numa perna só (apoio na direita) -----
  'peso-sobre-o-pe-de-apoio': (q, corpo) => {
    const dB = corpo.m('pe.calcanharABola');
    const pior = q.map((x) => {
      const cm = centroDeMassa(x.esq, 'homem', x.cargas);
      const L = x.esq.lado.R;
      return { z: Math.abs(cm[2] - (L.bola[2] + L.calcanhar[2]) / 2), x: Math.abs(cm[0] - (L.bola[0] + L.calcanhar[0]) / 2) };
    });
    const z = Math.max(...pior.map((p) => p.z)),
      x = Math.max(...pior.map((p) => p.x));
    return { medido: `o centro de massa (corpo + halter) fica a no máximo ${f1(z)} cm do meio do pé de apoio, para a frente ou para trás, e ${f1(x)} cm de lado (pé de ${f1(dB)} cm do calcanhar à bola e ${f1(corpo.m('pe.largura'))} cm de largura)`, ok: z <= 1.5 && x <= 1.5 };
  },
  'quadril-nivelado': (q) => {
    const d = Math.max(...q.map((x) => Math.abs(x.esq.lado.L.quadril[1] - x.esq.lado.R.quadril[1])));
    return { medido: `a diferença de altura entre os dois quadris chega a ${f1(d)} cm`, ok: d <= 2 };
  },
  'perna-livre-em-linha': (q) => {
    const e = q[q.length - 1]!.esq;
    const a = angulo(sub(e.lado.L.tornozelo, e.lado.L.quadril), sub(e.pelve.o, e.torax.o));
    return { medido: `embaixo, a perna livre (do quadril ao tornozelo) faz ${f1(a)}° com a linha do tronco (da base do pescoço à bacia)`, ok: a <= 10 };
  },
  'tronco-quase-paralelo-ao-chao': (q) => {
    const p = peito(q[q.length - 1]!);
    return { medido: `embaixo, o peito fica a ${f1(90 - p)}° da horizontal`, ok: p >= 70 && p <= 95 };
  },
};

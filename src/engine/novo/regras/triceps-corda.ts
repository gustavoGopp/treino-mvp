// Regras medidas dos tríceps com o braço ao lado do corpo (na polia com a corda, empurrando para baixo): o cotovelo
// parado e colado ao tronco, as mãos no peito em cima, a extensão completa embaixo, a corda que abre no fim e o tronco
// parado.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { dist, dot, paraRef, sub } from '../vec';

/** Inclinação do peito à frente da vertical (graus). */
const peito = (q: Quadro) => Math.atan2(q.esq.torax.y[2], q.esq.torax.y[1]) / (Math.PI / 180);

/** A menor distância (cm) entre a pele do braço e a do tronco (os dois lados; o boneco não separa os pontos por lado). */
function folgaBracoTronco(q: Quadro): number {
  const P = pontosDoBoneco(q.esq);
  const braco = P.filter((x) => x.parte === 'braco').map((x) => x.p);
  const tronco = P.filter((x) => x.parte === 'tronco' || x.parte === 'cintura').map((x) => x.p);
  let min = 1e9;
  for (const a of braco) for (const b of tronco) min = Math.min(min, dist(a, b));
  return min;
}

export const REGRAS_TRICEPS_CORDA: Record<string, Regra> = {
  'triceps-corda-cotovelo-parado': (q) => {
    const c0 = q[0]!.esq.lado.R.cotovelo;
    const T0 = q[0]!.esq.torax;
    let noMundo = 0,
      noTronco = 0;
    for (const x of q) {
      noMundo = Math.max(noMundo, dist(x.esq.lado.R.cotovelo, c0));
      noTronco = Math.max(noTronco, dist(paraRef(x.esq.torax, x.esq.lado.R.cotovelo), paraRef(T0, c0)));
    }
    return { medido: `de cima a embaixo, o cotovelo anda ${f1(noMundo)} cm (${f1(noTronco)} cm em relação ao tronco)`, ok: noMundo <= 1 && noTronco <= 1 };
  },
  'triceps-corda-cotovelos-colados': (q) => {
    const folga = q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map(folgaBracoTronco);
    const [a, b] = faixa(folga);
    // o braço no tronco: quanto vai à frente da linha do tronco (no plano de lado)
    const frente = q.map((x) => {
      const L = x.esq.lado.R;
      const v = sub(L.cotovelo, L.ombro);
      return (Math.atan2(dot(v, x.esq.torax.z), -dot(v, x.esq.torax.y)) / Math.PI) * 180;
    });
    const [c, d] = faixa(frente);
    return { medido: `a pele do braço fica de ${f1(a)} a ${f1(b)} cm da pele do tronco; o braço fica de ${f1(c)}° a ${f1(d)}° à frente da linha do tronco`, ok: b <= 2.5 && Math.abs(c) <= 20 && Math.abs(d) <= 20 };
  },
  'triceps-corda-maos-no-peito': (q, corpo) => {
    // em cima: o centro da mão abaixo do acrômio, ao longo do tronco, entre a axila e a 10ª costela
    const x = q[0]!;
    const L = x.esq.lado.R;
    const abaixo = dot(sub(L.ombro, L.pegada), x.esq.torax.y) + corpo.m('ombro.centroAbaixoDoAcromio');
    const ac = corpo.m('altura.acromio');
    const de = ac - corpo.m('altura.axila'),
      ate = ac - corpo.m('altura.costela10');
    const cot = angulosDoLado(x.esq, 'R').cotovelo;
    return { medido: `em cima, o cotovelo dobra ${f1(cot)}° e o centro da mão fica ${f1(abaixo)} cm abaixo do acrômio, ao longo do tronco (o peito: da axila, ${f1(de)} cm, à 10ª costela, ${f1(ate)} cm)`, ok: abaixo >= de && abaixo <= ate && cot >= 90 };
  },
  'triceps-corda-estende-embaixo': (q) => {
    const c = angulosDoLado(q[q.length - 1]!.esq, 'R').cotovelo;
    return { medido: `embaixo, o cotovelo dobra ${f1(c)}°`, ok: c <= 8 };
  },
  'triceps-corda-abre-no-fim': (q) => {
    const d = (x: Quadro) => dist(x.esq.lado.R.pegada, x.esq.lado.L.pegada);
    const a = d(q[0]!),
      b = d(q[q.length - 1]!);
    // embaixo, as mãos para os lados das coxas: o centro da mão fora do centro do quadril
    const fim = q[q.length - 1]!.esq;
    const fora = Math.abs(paraRef(fim.pelve, fim.lado.R.pegada)[0]) - Math.abs(paraRef(fim.pelve, fim.lado.R.quadril)[0]);
    return { medido: `as mãos vão de ${f1(a)} cm (em cima) a ${f1(b)} cm uma da outra (embaixo); embaixo, o centro da mão fica ${f1(fora)} cm para fora do centro do quadril`, ok: b - a >= 10 && fora >= 0 };
  },
  'triceps-corda-tronco-parado': (q) => {
    const [a, b] = faixa(q.map(peito));
    const lomb = Math.max(...q.map((x) => Math.abs(x.esq.pose.lombar ?? 0) + Math.abs(x.esq.pose.toracica ?? 0)));
    return { medido: `o peito inclina de ${f1(a)}° a ${f1(b)}° à frente da vertical; a lombar e a torácica mudam ${f1(lomb)}° da curva de repouso`, ok: a >= 0 && b <= 20 && b - a <= 1 && lomb <= 1 };
  },
};

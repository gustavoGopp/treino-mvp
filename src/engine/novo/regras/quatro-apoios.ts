// Regras medidas dos exercícios em quatro apoios (núcleo ../exercicios/quatro-apoios.ts) e do coice com elástico. A
// perna que trabalha é a direita; a de apoio, a esquerda. Marcas que os quadros dão: `piso` (o tampo do colchonete) e,
// no coice com elástico, `sola` (o ponto do laço na sola do pé).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { add, angulo, dist, mul, sub } from '../vec';
import type { V3 } from '../vec';

const piso = (q: Quadro) => q.marcas.piso?.[1] ?? 0;
const deLado = (v: V3): V3 => [0, v[1], v[2]];
/** A linha do tronco, dos ombros ao quadril, vista de lado. */
const linhaDoTronco = (e: Esq): V3 => deLado(sub(e.pelve.o, e.torax.o));

export const REGRAS_QUATRO_APOIOS: Record<string, Regra> = {
  'quatro-apoios-maos-e-joelhos': (q) => {
    const x = q[0]!,
      e = x.esq;
    const maos = Math.max(...(['R', 'L'] as const).map((k) => Math.hypot(e.lado[k].pegada[0] - e.lado[k].ombro[0], e.lado[k].pegada[2] - e.lado[k].ombro[2])));
    const joelho = Math.hypot(e.lado.L.joelho[0] - e.lado.L.quadril[0], e.lado.L.joelho[2] - e.lado.L.quadril[2]);
    const costas = Math.asin((e.torax.o[1] - e.pelve.o[1]) / dist(e.torax.o, e.pelve.o)) / (Math.PI / 180);
    // o joelho de apoio no colchonete: o ponto mais baixo da perna esquerda perto do joelho
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'canela' || parte === 'coxa') && dist(p, e.lado.L.joelho) < 8) min = Math.min(min, p[1]);
    const noTampo = min - piso(x);
    const cot = Math.max(...q.map((y) => Math.max(y.esq.lado.R.ang.cotovelo, y.esq.lado.L.ang.cotovelo)));
    return {
      medido: `o centro da palma fica a no máximo ${f1(maos)} cm da vertical do ombro, com o cotovelo dobrado ${f1(cot)}°; o joelho de apoio a ${f1(joelho)} cm da vertical do quadril, a ${f1(noTampo)} cm do tampo do colchonete; a linha dos ombros ao quadril sobe ${f1(costas)}° à frente`,
      ok: maos <= 4 && joelho <= 2 && Math.abs(noTampo) <= 1 && Math.abs(costas) <= 20 && cot <= 15,
    };
  },
  'coice-coxa-na-linha-do-tronco': (q) => {
    const fim = q[q.length - 1]!.esq;
    const coxa = deLado(sub(fim.lado.R.joelho, fim.lado.R.quadril));
    const desvio = angulo(coxa, linhaDoTronco(fim));
    // acima (+) ou abaixo (−) da linha: o joelho contra a linha que continua o tronco, à mesma distância do quadril
    const L = linhaDoTronco(fim);
    const acima = fim.lado.R.joelho[1] - add(fim.lado.R.quadril, mul(L, dist(fim.lado.R.joelho, fim.lado.R.quadril) / Math.hypot(...L)))[1];
    const bacia = Math.max(...q.map((x) => angulo(x.esq.pelve.z, q[0]!.esq.pelve.z)));
    const [j0, j1] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    return {
      medido: `no alto, a coxa faz ${f1(desvio)}° com a linha do tronco (o joelho ${f1(acima)} cm em relação a ela); a bacia gira no máximo ${f1(bacia)}° no ciclo (a lombar não arqueia); o joelho fica dobrado de ${f1(j0)}° a ${f1(j1)}°`,
      ok: desvio <= 8 && acima <= 2 && bacia <= 1 && j0 >= 75 && j1 <= 105,
    };
  },
  'coice-quadril-nao-gira': (q) => {
    const rola = Math.max(...q.map((x) => Math.abs(Math.asin(x.esq.pelve.x[1]) / (Math.PI / 180))));
    const anda = Math.max(...q.map((x) => dist(x.esq.pelve.o, q[0]!.esq.pelve.o)));
    const abre = Math.max(...q.map((x) => Math.abs(angulosDoLado(x.esq, 'R').abducaoDoQuadril)));
    return { medido: `a linha dos quadris fica a no máximo ${f1(rola)}° da horizontal; a bacia anda ${f1(anda)} cm; a coxa abre no máximo ${f1(abre)}° para o lado`, ok: rola <= 2 && anda <= 0.5 && abre <= 5 };
  },
  'coice-laco-na-sola-e-sob-as-maos': (q) => {
    const x0 = q[0]!,
      x1 = q[q.length - 1]!;
    const sola = Math.max(...q.map((x) => dist(x.marcas.sola!, mul(add(x.esq.lado.R.bola, x.esq.lado.R.calcanhar), 0.5))));
    const fio = (x: Quadro) => x.prims.find((p) => p.t === 'fio' && p.cls === 'fita');
    const maos = Math.max(
      ...q.map((x) => {
        const f = fio(x);
        if (!f || f.t !== 'fio') return 99;
        const a = f.pts[0]!,
          b = f.pts[f.pts.length - 1]!;
        return Math.max(Math.hypot(a[0] - x.esq.lado.R.pegada[0], a[2] - x.esq.lado.R.pegada[2]), Math.hypot(b[0] - x.esq.lado.R.pegada[0], b[2] - x.esq.lado.R.pegada[2]));
      }),
    );
    const estica = (x: Quadro) => x.fios.find((y) => y.id === 'elastico')!.comp / obj('elasticoLongo', 'comp');
    return {
      medido: `o laço passa a ${f1(sola)} cm do meio da sola; as pontas ficam a ${f1(maos)} cm do centro da palma direita, sob a mão; ele vai de ${f1(estica(x0))} vezes (embaixo) a ${f1(estica(x1))} vezes (no alto)`,
      ok: sola <= 2 && maos <= 3 && estica(x0) >= 1 && estica(x1) > estica(x0) + 0.2,
    };
  },
};

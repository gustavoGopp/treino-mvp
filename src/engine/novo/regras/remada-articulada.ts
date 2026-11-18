// Regras medidas da remada articulada (../exercicios/remada-articulada.ts). As marcas que o quadro dá: `pegadorR` e
// `pegadorL` (o centro de cada pegador), `eixoR` e `eixoDirR` (um ponto do eixo do braço direito e a direção dele),
// `assento` ([quanto o glúteo fica acima do assento]), `peitoNoApoio` ([a menor folga do peito no apoio, a da metade de
// baixo, a da de cima]), `peito` ([a altura da linha do meio do peito]) e `regulagem` ([altura do assento, ângulo
// inicial, ângulo final]). As mãos nos pegadores e a pilha que sobe são as regras das máquinas de empurrar e das
// cadeiras (./maquinas-de-empurrar.ts e ./cadeiras.ts); o braço que puxa, as das remadas (./remadas.ts).
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

/** A distância (cm) de um ponto à linha do eixo. */
const aoEixo = (p: V3, o: V3, d: V3) => {
  const v = sub(p, o);
  return Math.hypot(...sub(v, mul(d, dot(v, d))));
};

export const REGRAS_REMADA_ARTICULADA: Record<string, Regra> = {
  'remada-articulada-pegador-na-linha-do-peito': (q) => {
    const x = q[0]!;
    const d = x.marcas.pegadorR![1] - x.marcas.peito![0]!;
    const c = x.esq.lado.R.ang.cotovelo;
    return { medido: `com os braços estendidos (o cotovelo dobra ${f1(c)}°), o centro da mão fica ${f1(Math.abs(d))} cm ${d >= 0 ? 'acima' : 'abaixo'} da linha do meio do peito (com o assento a ${f1(x.marcas.regulagem![0]!)} cm do chão)`, ok: Math.abs(d) <= 2 && c <= 15 };
  },
  'remada-articulada-sentado-com-o-peito-no-apoio': (q) => {
    const a = faixa(q.map((x) => x.marcas.assento![0])),
      p = faixa(q.map((x) => x.marcas.peitoNoApoio![0]));
    return {
      medido: `o glúteo fica de ${f1(-a[1])} a ${f1(-a[0])} cm dentro do assento; o peito, de ${f1(-p[1])} a ${f1(-p[0])} cm dentro do apoio (positivo: afunda)`,
      ok: a[0] >= -2 && a[1] <= 0.3 && p[0] >= -1.5 && p[1] <= 0.5,
    };
  },
  'remada-articulada-pegador-no-arco': (q) => {
    // o pegador (e a mão com ele) fica sempre à mesma distância do eixo do braço: anda num arco, e não numa reta
    const r = faixa(q.map((x) => aoEixo(x.marcas.pegadorR!, x.marcas.eixoR!, norm(x.marcas.eixoDirR!))));
    const a = q[0]!.marcas.pegadorR!,
      b = q[q.length - 1]!.marcas.pegadorR!;
    const reta = norm(sub(b, a));
    const flecha = Math.max(...q.map((x) => aoEixo(x.marcas.pegadorR!, a, reta)));
    return {
      medido: `a mão direita anda ${f1(a[2] - b[2])} cm para trás, ${f1(b[1] - a[1])} cm para cima e ${f1(Math.abs(b[0]) - Math.abs(a[0]))} cm para fora, num arco de raio ${f1(r[0])} a ${f1(r[1])} cm em volta do eixo do braço (flecha de ${f1(flecha)} cm)`,
      ok: r[1] - r[0] <= 0.1 && flecha >= 0.5 && a[2] - b[2] >= 20,
    };
  },
  'remada-articulada-pegadores-se-afastam': (q) => {
    const a = q[0]!.marcas.pegadorR!,
      b = q[q.length - 1]!.marcas.pegadorR!;
    return { medido: `as mãos ficam a ${f1(2 * Math.abs(a[0]))} cm uma da outra no começo e a ${f1(2 * Math.abs(b[0]))} cm no fim`, ok: Math.abs(b[0]) > Math.abs(a[0]) };
  },
};

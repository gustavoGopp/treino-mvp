// Regras medidas do crucifixo na polia de baixo para cima (../exercicios/crucifixo-polia-baixo.ts): as polias embaixo, as
// mãos no começo (abertas, baixas e um pouco atrás) e no fim (juntas, na altura do peito ou do queixo). O cotovelo fixo, os
// cabos longe do corpo e a pilha de cada coluna são as regras do núcleo da polia (./polia-bracos.ts); o tronco parado, a
// regra comum "tronco-quase-parado" (../conferir.ts).
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { dist, dot, sub } from '../vec';

/** O quadro do fim: o ciclo começa parado embaixo (o primeiro quadro); o fim é o quadro em que a mão fica mais longe dali. */
function fim(q: Quadro[]): Quadro {
  const p0 = q[0]!.esq.lado.R.pegada;
  let m = q[0]!;
  for (const x of q) if (dist(x.esq.lado.R.pegada, p0) > dist(m.esq.lado.R.pegada, p0)) m = x;
  return m;
}

export const REGRAS_CRUCIFIXO_POLIA_BAIXO: Record<string, Regra> = {
  'crucifixo-baixo-polias-embaixo': (q) => {
    const x = q[0]!;
    const ys = x.fios.map((y) => y.id).filter((id) => x.marcas[`${id}.roldana`]).map((id) => x.marcas[`${id}.roldana`]![1]);
    return { medido: `o centro de cada roldana fica a ${ys.map(f1).join(' e ')} cm do chão`, ok: ys.length === 2 && ys.every((y) => y <= 30) };
  },
  'crucifixo-baixo-maos-ao-lado-e-atras': (q) => {
    // no começo: a mão (o centro da pegada) um pouco atrás da linha do ombro, no tórax; abaixo da cintura e afastada do
    // quadril, para o lado
    const e = q[0]!.esq;
    const lados = (['R', 'L'] as const).map((k) => {
      const L = e.lado[k];
      return { atras: -dot(sub(L.pegada, L.ombro), e.torax.z), abaixo: e.corpo.m('altura.cintura') - L.pegada[1], fora: Math.abs(L.pegada[0]) - Math.abs(L.quadril[0]) };
    });
    return {
      medido: lados.map((l, i) => `${i === 0 ? 'direita' : 'esquerda'}: ${f1(l.atras)} cm atrás da linha do ombro, ${f1(l.abaixo)} cm abaixo da altura da cintura, ${f1(l.fora)} cm para fora do quadril`).join('; '),
      ok: lados.every((l) => l.atras >= 0 && l.atras <= 15 && l.abaixo >= 0 && l.fora >= 8),
    };
  },
  'crucifixo-baixo-maos-se-encontram-no-alto': (q) => {
    // no fim: as mãos juntas, à frente, entre a linha do mamilo (a altura do peito) e a de C7 (a do queixo), no tórax
    const e = fim(q).esq;
    const gap = dist(e.lado.R.pegada, e.lado.L.pegada);
    const m = (id: string) => e.corpo.m(id);
    const abaixoDeC7 = dot(sub(e.torax.o, e.lado.R.pegada), e.torax.y);
    const ate = m('altura.cervical') - m('altura.peito');
    const frente = dot(sub(e.lado.R.pegada, e.torax.o), e.torax.z);
    return { medido: `no fim, os centros das mãos ficam a ${f1(gap)} cm um do outro, ${f1(abaixoDeC7)} cm abaixo de C7 no tórax (do queixo ao peito: de 0 a ${f1(ate)} cm) e ${f1(frente)} cm à frente`, ok: gap <= 12 && abaixoDeC7 >= 0 && abaixoDeC7 <= ate && frente >= 20 };
  },
};

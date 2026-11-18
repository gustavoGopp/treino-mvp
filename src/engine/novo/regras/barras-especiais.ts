// Regras medidas dos exercícios com as barras especiais: a rosca com barra W e o terra com barra hexagonal. Cada uma
// recebe os quadros do começo até o fim da primeira fase com movimento. O limite vem do que a ficha da técnica pede, não
// do que a pose deu. A barra fica nas marcas do quadro: `barraW.0` a `barraW.7` (os cantos da linha em W, de uma manga
// à outra) e, na hexagonal, `cabo.R.a`, `cabo.R.b`, `cabo.L.a` e `cabo.L.b` (as pontas de cada cabo) e `barra` (o
// meio do hexágono).
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { angulo, dist, dot, sub } from '../vec';
import type { V3 } from '../vec';

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** O ângulo entre duas linhas (sem sentido), em graus: de 0 a 90. */
const entreLinhas = (a: V3, b: V3) => Math.min(angulo(a, b), 180 - angulo(a, b));
/** Os cantos da linha em W do quadro. */
const linhaW = (q: Quadro): V3[] => Array.from({ length: 8 }, (_, i) => q.marcas[`barraW.${i}`]!);
/** As partes do corpo que não seguram a barra (as mãos e os polegares fecham nela de propósito). */
const pele = (e: Esq) => pontosDoBoneco(e).filter((x) => x.parte !== 'mao' && x.parte !== 'polegar');
/** A menor folga (cm) entre a pele e uma lista de tubos (segmento e raio); negativa = o tubo entra no corpo. */
function folga(e: Esq, tubos: [V3, V3, number][]): { folga: number; parte: string } {
  let m = 1e9,
    parte = '';
  for (const { p, parte: nome } of pele(e))
    for (const [a, b, r] of tubos) {
      const d = aoSegmento(p, a, b) - r;
      if (d < m) {
        m = d;
        parte = nome;
      }
    }
  return { folga: m, parte };
}

export const REGRAS_BARRAS_ESPECIAIS: Record<string, Regra> = {
  // ----- rosca com barra W -----
  // cada mão no meio da parte inclinada de fora: o centro da pegada no eixo dela e a linha da palma (o eixo x da mão)
  // na linha dela
  'barra-w-pegada-nas-partes-inclinadas': (q) => {
    let fora = 0,
      giro = 0,
      meio = 0;
    for (const x of q) {
      const L = linhaW(x);
      for (const [k, a, b] of [
        ['R', L[1]!, L[2]!],
        ['L', L[6]!, L[5]!],
      ] as const) {
        const M = x.esq.lado[k];
        fora = Math.max(fora, aoSegmento(M.pegada, a, b));
        giro = Math.max(giro, entreLinhas(M.mao.x, sub(b, a)));
        meio = Math.max(meio, Math.abs(dist(M.pegada, a) - dist(M.pegada, b)) / 2);
      }
    }
    const inclinada = obj('barraW', 'anguloFora');
    return { medido: `o centro da pegada fica a até ${f1(fora)} cm do eixo da parte inclinada (de ${inclinada}° com a linha da barra) e a até ${f1(meio)} cm do meio dela; a linha da palma desvia até ${f1(giro)}° da linha da parte inclinada`, ok: fora <= 0.5 && meio <= 1 && giro <= 5 };
  },
  'barra-rigida-nas-duas-maos': (q) => {
    const [a, b] = faixa(q.map((x) => dist(x.esq.lado.R.pegada, x.esq.lado.L.pegada)));
    return { medido: `as mãos ficam de ${f1(a)} a ${f1(b)} cm uma da outra (centro a centro)`, ok: b - a <= 0.2 };
  },
  'barra-w-fora-do-corpo': (q) => {
    let pior = 1e9,
      onde = '';
    const r = obj('barraW', 'pegadaDiam') / 2;
    for (const x of q) {
      const L = linhaW(x);
      const t = folga(
        x.esq,
        L.slice(0, -1).map((p, i) => [p, L[i + 1]!, r]),
      );
      if (t.folga < pior) {
        pior = t.folga;
        onde = t.parte;
      }
    }
    return { medido: `a menor folga entre a barra e a pele (fora as mãos) é ${f1(pior)} cm (${onde})`, ok: pior >= -0.5 };
  },
};

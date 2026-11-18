// Regras medidas dos exercícios com as barras especiais: a rosca com barra W e o terra com barra hexagonal. Cada uma
// recebe os quadros do começo até o fim da primeira fase com movimento. O limite vem do que a ficha da técnica pede, não
// do que a pose deu. A barra fica nas marcas do quadro: `barraW.0` a `barraW.7` (os cantos da linha em W, de uma manga
// à outra) e, na hexagonal, `cabo.R.a`, `cabo.R.b`, `cabo.L.a` e `cabo.L.b` (as pontas de cada cabo) e `barra` (o
// meio do hexágono).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
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
  // ----- terra com barra hexagonal -----
  // embaixo, a barra no chão: as anilhas tocam o chão (o centro da barra na altura do raio da anilha maior)
  'hexagonal-anilhas-no-chao-embaixo': (q) => {
    const toque = q[0]!.marcas['anilhas.baixo']![1];
    return { medido: `embaixo, a borda de baixo das anilhas fica a ${f1(toque)} cm do chão`, ok: Math.abs(toque) <= 0.3 };
  },
  // as mãos fecham no meio dos cabos (pegada neutra: a linha da palma na linha do cabo, da frente para trás)
  'hexagonal-maos-nos-cabos': (q) => {
    let fora = 0,
      giro = 0,
      meio = 0;
    for (const x of q)
      for (const k of ['R', 'L'] as const) {
        const a = x.marcas[`cabo.${k}.a`]!,
          b = x.marcas[`cabo.${k}.b`]!,
          M = x.esq.lado[k];
        fora = Math.max(fora, aoSegmento(M.pegada, a, b));
        giro = Math.max(giro, entreLinhas(M.mao.x, sub(b, a)));
        meio = Math.max(meio, Math.abs(dist(M.pegada, a) - dist(M.pegada, b)) / 2);
      }
    return { medido: `o centro da pegada fica a até ${f1(fora)} cm do eixo do cabo e a até ${f1(meio)} cm do meio dele; a linha da palma desvia até ${f1(giro)}° da linha do cabo`, ok: fora <= 0.5 && meio <= 1.5 && giro <= 8 };
  },
  // o corpo dentro do hexágono: a moldura e os cabos não encostam no corpo (fora as mãos)
  'hexagonal-corpo-dentro-da-barra': (q) => {
    let pior = 1e9,
      onde = '';
    const tb = obj('barraHexagonal', 'tubo') / 2,
      rc = obj('barraHexagonal', 'caboDiam') / 2;
    for (const x of q) {
      const H = Array.from({ length: 6 }, (_, i) => x.marcas[`hexagono.${i}`]!);
      const tubos: [V3, V3, number][] = H.map((p, i) => [p, H[(i + 1) % 6]!, tb]);
      for (const k of ['R', 'L'] as const) tubos.push([x.marcas[`cabo.${k}.a`]!, x.marcas[`cabo.${k}.b`]!, rc]);
      const t = folga(x.esq, tubos);
      if (t.folga < pior) {
        pior = t.folga;
        onde = t.parte;
      }
    }
    return { medido: `a menor folga entre a moldura ou os cabos e a pele (fora as mãos) é ${f1(pior)} cm (${onde})`, ok: pior >= 0 };
  },
  // "estende joelhos e quadril juntos": as duas extensões andam no mesmo passo (a fração de cada uma, do começo ao fim,
  // não se afasta mais que 0,2 da outra em nenhum quadro)
  'hexagonal-joelho-e-quadril-juntos': (q) => {
    const J = q.map((x) => angulosDoLado(x.esq, 'R').joelho),
      Q = q.map((x) => angulosDoLado(x.esq, 'R').quadril);
    const fr = (v: number[]) => v.map((y) => (y - v[0]!) / (v[v.length - 1]! - v[0]! || 1));
    const fj = fr(J),
      fq = fr(Q);
    const d = Math.max(...fj.map((v, i) => Math.abs(v - fq[i]!)));
    return { medido: `o joelho estende de ${f1(J[0]!)}° a ${f1(J[J.length - 1]!)}° e o quadril de ${f1(Q[0]!)}° a ${f1(Q[Q.length - 1]!)}°; a maior diferença entre as frações das duas extensões é ${f1(d)}`, ok: d <= 0.2 };
  },
  // em cima, em pé: quadril e joelhos estendidos
  'hexagonal-em-pe-em-cima': (q) => {
    const a = angulosDoLado(q[q.length - 1]!.esq, 'R');
    return { medido: `em cima, o joelho dobra ${f1(a.joelho)}° e o quadril ${f1(a.quadril)}°`, ok: a.joelho <= 10 && Math.abs(a.quadril) <= 10 };
  },
  'hexagonal-bracos-estendidos': (q) => {
    const [a, b] = faixa(q.flatMap((x) => [angulosDoLado(x.esq, 'R').cotovelo, angulosDoLado(x.esq, 'L').cotovelo]));
    return { medido: `o cotovelo dobra de ${f1(a)}° a ${f1(b)}° (os braços só seguram)`, ok: b <= 12 };
  },
};

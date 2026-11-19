import { describe, expect, it } from 'vitest';
import type { Anel } from '../../src/engine/novo/corpo3d';
import { VISTAS } from '../../src/engine/novo/desenho';
import type { P2 } from '../../src/engine/novo/desenho';
import { recortarORolo } from '../../src/engine/novo/pecas-de-cena/cadeira-flexora';
import { MAT, cena } from '../../src/engine/novo/realista/base.mjs';
import { dot } from '../../src/engine/novo/vec';
import type { V3 } from '../../src/engine/novo/vec';

// O recorte do rolo (src/engine/novo/pecas-de-cena/cadeira-flexora.ts, `recortarORolo`; correção de 19/11/2026, o furo
// do recorte), em casos pequenos: um rolo e um "pé" (um tubo de anéis), vistos de cima. De cima, a tela é (x, z) e a
// profundidade é y (maior = mais perto de quem olha). O rolo corre ao longo de x, de -20 a 20, com raio 5 e o eixo em
// y = 50, z = 0: o topo dele fica em y = 55, e na tela ele ocupa z de -5 a 5.

const cam = VISTAS.cima;
const nova = () => cena('teste', { P: (p) => [dot(p, cam.dir), -dot(p, cam.cima), -dot(p, cam.para)], rot: (v) => [dot(v, cam.dir), dot(v, cam.cima), -dot(v, cam.para)], s: 1 });
const A: V3 = [-20, 50, 0],
  B: V3 = [20, 50, 0];
const HASTE = { a: [25, 50, 0] as V3, b: [-20, 50, 0] as V3, r: 1.6 };
/** O "pé": anéis de raio 3 ao longo de z (de -20 a 20), em x = 5, com o centro na altura y(z). */
const pe = (y: (z: number) => number): Anel[] => Array.from({ length: 41 }, (_, i) => ({ c: [5, y(i - 20), i - 20] as V3, x: [1, 0, 0] as V3, z: [0, 1, 0] as V3, a: 3, f: 3, b: 3 }));
/** A cena com a haste e o rolo desenhados, e o recorte. */
function recorta(partes: Anel[][], comHaste = false) {
  const C = nova();
  C.cilindro(HASTE.a, HASTE.b, HASTE.r, MAT.cromo, { lados: 10 });
  C.cilindro(A, B, 5, MAT.estofado, { lados: 18 });
  recortarORolo(C, A, B, 5, partes, comHaste ? HASTE : undefined);
  return C;
}
function dentro(t: P2, P: P2[]): boolean {
  let d = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const a = P[i]!,
      b = P[j]!;
    if (a[1] > t[1] !== b[1] > t[1] && t[0] < ((b[0] - a[0]) * (t[1] - a[1])) / (b[1] - a[1]) + a[0]) d = !d;
  }
  return d;
}
const noFuro = (furos: P2[][] | undefined, t: P2) => (furos ?? []).some((P) => dentro(t, P));
const area = (P: P2[]) => P.reduce((s, p, i) => s + p[0] * P[(i + 1) % P.length]![1] - P[(i + 1) % P.length]![0] * p[1], 0) / 2;

describe('o recorte do rolo', () => {
  it('o pé todo embaixo do rolo: nenhum furo, nenhuma máscara', () => {
    const C = recorta([pe(() => 40)]);
    const rolo = C.itens[C.itens.length - 1]!;
    expect(rolo.fora).toBeUndefined();
    expect(rolo.svg).not.toContain('mask=');
    expect(C.defs.join('')).not.toContain('<mask');
  });

  it('o pé todo em cima do rolo: o furo cobre o pé onde ele passa sobre o rolo, só na caixa do rolo', () => {
    const C = recorta([pe(() => 60)]);
    const rolo = C.itens[C.itens.length - 1]!;
    expect(rolo.svg).toContain('mask="url(#');
    for (const t of [[5, 0], [5, -4.5], [5, 4.5], [3, 0], [7, 0]] as P2[]) expect(noFuro(rolo.fora, t)).toBe(true);
    // só o trecho do pé que cai na caixa do rolo (com 0,5 cm de folga)
    for (const P of rolo.fora!) for (const p of P) expect(Math.abs(p[1])).toBeLessThan(5 + 0.5 + 1.5);
  });

  it('o pé que passa por baixo do rolo e sobe depois dele: o furo só onde ele fica por cima (o defeito de 19/11)', () => {
    // o topo do pé fica em y = 53 + 2z: abaixo do topo do rolo para z < 1, acima dele para z > 1 (o rolo, na beira,
    // baixa até y = 50 em z = 5)
    const C = recorta([pe((z) => 50 + 2 * z)]);
    const rolo = C.itens[C.itens.length - 1]!;
    expect(noFuro(rolo.fora, [5, 3])).toBe(true);
    expect(noFuro(rolo.fora, [5, 4.5])).toBe(true);
    for (const z of [-4.5, -3, -1, 0]) expect(noFuro(rolo.fora, [5, z])).toBe(false);
    // nenhum canto de furo no trecho em que o pé fica embaixo (o furo para na pele, sem a folga do traço)
    for (const P of rolo.fora!) for (const p of P) expect(p[1]).toBeGreaterThan(0);
  });

  it('o tubo em pé logo depois do rolo, com o topo abaixo do topo dele: só o que fica fora do rolo é furado', () => {
    // o defeito de 19/11 (a mesa flexora de cima, no começo): o anel de cima tem o ponto mais perto de quem olha livre (fora
    // do rolo na tela), e o casco do par de anéis, que cobre o anel inteiro na tela, furava o rolo onde a pele fica
    // embaixo dele
    const emPe: Anel[] = Array.from({ length: 6 }, (_, i) => ({ c: [5, 30 + 3 * i, 6] as V3, x: [1, 0, 0] as V3, z: [0, 0, 1] as V3, a: 4, f: 4, b: 4 }));
    const C = recorta([emPe]);
    const rolo = C.itens[C.itens.length - 1]!;
    for (const t of [[5, 3], [5, 4], [5, 4.6], [3, 4], [7, 4]] as P2[]) expect(noFuro(rolo.fora, t)).toBe(false);
    for (const P of rolo.fora ?? []) for (const p of P) expect(p[1]).toBeGreaterThanOrEqual(4.9);
  });

  it('com a haste: a máscara vale para a haste e para o rolo, e a pele atrás da haste, fora do rolo, não é furada', () => {
    // um pé em cima do rolo (furado) e outro logo abaixo da haste, onde ela sai do rolo (x de 20 a 25)
    const sobHaste: Anel[] = Array.from({ length: 9 }, (_, i) => ({ c: [22.5, 46, i - 4] as V3, x: [1, 0, 0] as V3, z: [0, 1, 0] as V3, a: 1.5, f: 1.5, b: 1.5 }));
    const C = recorta([pe(() => 60), sobHaste], true);
    const [haste, rolo] = C.itens.slice(-2);
    expect(haste!.svg).toContain('mask="url(#');
    expect(rolo!.svg).toContain('mask="url(#');
    expect(haste!.fora).toBe(rolo!.fora);
    expect(noFuro(rolo!.fora, [5, 0])).toBe(true);
    expect(noFuro(rolo!.fora, [22.5, 0])).toBe(false);
  });

  it('os furos vão num caminho só, todos no mesmo sentido (a regra nonzero os une, sem fresta)', () => {
    const C = recorta([pe((z) => 50 + 2 * z), pe(() => 60).map((an) => ({ ...an, c: [-8, an.c[1], an.c[2]] as V3 }))]);
    const rolo = C.itens[C.itens.length - 1]!;
    expect(rolo.fora!.length).toBeGreaterThan(10);
    for (const P of rolo.fora!) expect(area(P)).toBeGreaterThan(0);
    const mascara = C.defs.join('');
    expect(mascara.match(/<path /g)).toHaveLength(1);
    expect(mascara).not.toContain('<polygon');
  });
});

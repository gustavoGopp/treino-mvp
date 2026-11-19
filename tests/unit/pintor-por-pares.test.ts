import { describe, expect, it } from 'vitest';
import type { Anel } from '../../src/engine/novo/corpo3d';
import { pintar, VISTAS } from '../../src/engine/novo/desenho';
import type { Item, P2 } from '../../src/engine/novo/desenho';
import type { Esq } from '../../src/engine/novo/esqueleto';
import { FOLGA_DO_RECORTE, ordenarPorPares, PADRAO, pintarPorPares, remendoDe, ULTIMA } from '../../src/engine/novo/pintor-por-pares';
import type { V3 } from '../../src/engine/novo/vec';

// O pintor por pares (src/engine/novo/pintor-por-pares.ts; docs/revisoes/animacao-nova/estudo-do-pintor.md), em casos
// pequenos e sem animação: um "corpo" de um tubo só e "peças" de uma caixa só, vistos de frente. De frente, a tela é
// (x, -y) e a profundidade é z (maior = mais perto de quem olha; o pintor de hoje pinta por último o item de maior `d`).

const cam = VISTAS.frontal;
/** O esqueleto só serve de marca (o mesmo corpo): o pintor só o lê para a mão que segura uma peça, e aqui não há mão. */
const ESQ = {} as unknown as Esq;
/** Um anel do tubo, de raio r, com o eixo do tubo em x (a seção oval no plano yz). */
const anel = (x: number, z: number, r = 4): Anel => ({ c: [x, 0, z], x: [0, 1, 0], z: [0, 0, 1], a: r, f: r, b: r });
/** Um item do corpo: um tubo pelos anéis dados, pintado com `d` (a profundidade de hoje). */
function corpo(aneis: Anel[], d: number, s = '<i c/>'): Item {
  const xs = aneis.map((a) => a.c[0]),
    r = Math.max(...aneis.map((a) => a.a));
  return { d, camada: 1, s, cx: [Math.min(...xs) - r, -r, Math.max(...xs) + r, r], pp: { k: 'corpo', e: ESQ, cam, vols: [{ nome: 'tronco', aneis }] } };
}
/** As seis faces de um sólido de oito cantos: a face de baixo (y0) e a de cima (y1), cada uma em x0..x1 e z(x). */
function faces(x0: number, x1: number, y0: number, y1: number, z0: (x: number) => number, z1: (x: number) => number): V3[][] {
  const P = (x: number, y: number, tras: boolean): V3 => [x, y, tras ? z0(x) : z1(x)];
  const [a, b, c, d] = [P(x0, y0, true), P(x1, y0, true), P(x1, y1, true), P(x0, y1, true)];
  const [e, f, g, h] = [P(x0, y0, false), P(x1, y0, false), P(x1, y1, false), P(x0, y1, false)];
  return [
    [a, b, c, d],
    [e, h, g, f],
    [a, e, f, b],
    [d, c, g, h],
    [a, d, h, e],
    [b, f, g, c],
  ];
}
/** Uma peça: a caixa x0..x1 × y0..y1 × z0..z1 (z0 e z1 podem variar com x: uma tábua inclinada). */
function peca(x0: number, x1: number, y0: number, y1: number, z0: number | ((x: number) => number), z1: number | ((x: number) => number), d: number, s = '<i p/>', camada = 1): Item {
  const f = (z: number | ((x: number) => number)) => (typeof z === 'number' ? () => z : z);
  return { d, camada, s, g3: { faces: faces(x0, x1, y0, y1, f(z0), f(z1)) }, pp: { k: 'peca', peca: 0 } };
}
const hoje = (itens: Item[]) => [...itens].map((it, i) => ({ it, i })).sort((a, b) => a.it.camada - b.it.camada || a.it.d - b.it.d || a.i - b.i).map((x) => x.it);
const caixa = (P: P2[]) => [Math.min(...P.map((p) => p[0])), Math.min(...P.map((p) => p[1])), Math.max(...P.map((p) => p[0])), Math.max(...P.map((p) => p[1]))];

describe('o pintor por pares', () => {
  it('dois itens que se cruzam, na ordem certa: a peça na frente do corpo continua por cima', () => {
    const c = corpo([anel(-20, 0), anel(0, 0), anel(20, 0)], 0);
    const p = peca(-6, 6, -10, 10, 10, 14, 12);
    expect(hoje([c, p])).toEqual([c, p]);
    expect(ordenarPorPares([c, p])).toEqual([c, p]);
    expect(ULTIMA).toEqual({ pares: 1, ciclos: 0, remendos: 0 });
  });

  it('dois itens que se cruzam, na ordem errada: a tábua com o meio na frente, mas atrás do corpo onde os dois se cruzam, vai para baixo dele', () => {
    // o tubo vai de x = -20 a 5; a tábua, de x = -10 a 60, inclinada: atrás do tubo onde os dois se cruzam, com o
    // meio 12 cm na frente dele (é o meio que dá a ordem de hoje: o colchonete por cima do tronco deitado nele)
    const c = corpo([anel(-20, 0), anel(-8, 0), anel(5, 0)], 0);
    const z = (x: number) => -20 + ((x + 10) * 60) / 70;
    const p = peca(-10, 60, -8, 8, z, (x) => z(x) + 4, 12);
    expect(hoje([c, p])).toEqual([c, p]);
    expect(ordenarPorPares([c, p])).toEqual([p, c]);
    expect(ULTIMA.pares).toBe(1);
    expect(pintarPorPares([c, p])).toBe('<i p/><i c/>');
  });

  it('um remendo: o corpo na frente da peça num pedaço e atrás no outro; a peça é pintada de novo por cima, recortada, só onde está na frente', () => {
    // o tubo atravessa uma placa: na frente dela à esquerda (o pedaço maior) e atrás à direita
    const c = corpo([anel(-40, 20), anel(-10, 12), anel(10, -12), anel(20, -16), anel(30, -20)], 0);
    const p = peca(-50, 40, -6, 6, -1, 1, 0.5);
    const ordem = ordenarPorPares([c, p]);
    expect(ULTIMA.remendos).toBe(1);
    expect(ordem.slice(0, 2)).toEqual([p, c]);
    expect(ordem).toHaveLength(3);
    const r = remendoDe(ordem[2]!);
    expect(r?.de).toBe(p);
    // o recorte fica à direita (onde a placa está na frente) e tira o pedaço da esquerda (onde o corpo está na frente)
    for (const Q of r!.dentro) expect(caixa(Q)[0]).toBeGreaterThan(-12);
    expect(r!.fora.length).toBeGreaterThan(0);
    expect(ordem[2]!.s).toContain('<i p/>');
    expect(ordem[2]!.s).toMatch(/<g (mask|clip-path)="url\(#pp[0-9a-z]+\)">/);
    // o mesmo quadro dá o mesmo SVG (o nome do recorte sai do conteúdo)
    expect(pintarPorPares([c, p])).toBe(pintarPorPares([c, p]));
  });

  it(`o recorte de cada trecho do remendo tem ${FOLGA_DO_RECORTE} cm de folga (etapa 2: antes, o primeiro trecho tinha 0 cm, o segundo 1 cm…)`, () => {
    const c = corpo([anel(-40, 20), anel(-10, 12), anel(10, -12), anel(20, -16), anel(30, -20)], 0);
    const p = peca(-50, 40, -6, 6, -1, 1, 0.5);
    const r = remendoDe(ordenarPorPares([c, p])[2]!)!;
    expect(r.dentro.length).toBeGreaterThan(1);
    // o anel tem 4 cm de raio em y: com a folga, o recorte vai de -5,5 a 5,5 em cada trecho
    for (const Q of r.dentro) {
      const [, y0, , y1] = caixa(Q);
      expect(y0).toBeCloseTo(-4 - FOLGA_DO_RECORTE, 6);
      expect(y1).toBeCloseTo(4 + FOLGA_DO_RECORTE, 6);
    }
  });

  it('o contato não decide: o corpo que afunda na peça fica na ordem de hoje (e decidiria, se o contato contasse)', () => {
    // o tubo deitado numa peça em que ele afunda 3 cm: a frente da peça (z = 2) está dentro do tubo
    const c = corpo([anel(-20, 0, 5), anel(0, 0, 5), anel(20, 0, 5)], 0);
    const p = peca(-10, 10, -10, 10, -20, 2, 10);
    expect(ordenarPorPares([c, p])).toEqual([c, p]);
    expect(ULTIMA.pares).toBe(0);
    expect(ordenarPorPares([c, p], { ...PADRAO, contato: false })).toEqual([p, c]);
  });

  it('o cenário não entra: as outras camadas e a peça empurrada para trás de propósito ficam onde estão', () => {
    const c = corpo([anel(-20, 0), anel(0, 0), anel(20, 0)], 0);
    // na frente do corpo, na camada do cenário (0): continua antes de tudo
    const cenario = peca(-6, 6, -10, 10, 10, 14, 50, '<i cen/>', 0);
    // na frente do corpo, mas empurrada 60 cm para trás (as pontas da barra longa): continua atrás do corpo
    const empurrada = peca(-30, -10, -10, 10, 10, 14, 12 - 60, '<i emp/>');
    // os rótulos (camada 2) continuam por último
    const rotulo: Item = { d: -100, camada: 2, s: '<i rot/>' };
    const itens = [rotulo, c, cenario, empurrada];
    expect(ordenarPorPares(itens)).toEqual([empurrada, c]);
    expect(pintarPorPares(itens)).toBe(pintar(itens));
    expect(pintarPorPares(itens)).toBe('<i cen/><i emp/><i c/><i rot/>');
  });

  it('a ordem de hoje fica onde nada obriga: peças que não cruzam o corpo, ou que cruzam e concordam com hoje', () => {
    const c = corpo([anel(-20, 0), anel(0, 0), anel(20, 0)], 0);
    // longe do corpo na tela (em cima e embaixo), com profundidades dos dois lados da dele
    const a = peca(-10, 10, 30, 40, -30, -20, -25, '<i a/>');
    const b = peca(-10, 10, -40, -30, 20, 30, 25, '<i b/>');
    const e = peca(30, 40, 30, 40, -5, 5, 3, '<i e/>');
    // e duas que se cruzam entre si (peça com peça: a ordem de hoje), uma delas na frente do corpo
    const f = peca(-5, 5, -10, 10, 10, 14, 12, '<i f/>');
    const g = peca(-4, 4, -2, 30, 20, 24, 8, '<i g/>');
    const itens = [g, b, c, e, a, f];
    const h = hoje(itens);
    expect(ordenarPorPares(itens)).toEqual(h);
    expect(pintarPorPares(itens)).toBe(pintar(itens));
    // sem corpo, nada a ordenar
    expect(ordenarPorPares([g, b, e])).toEqual(hoje([g, b, e]));
  });
});

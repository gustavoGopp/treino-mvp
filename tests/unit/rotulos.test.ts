import { describe, expect, it } from 'vitest';
import { EX, poseAt, skel } from '../../src/engine';
import { CTX } from '../../src/engine/contexto';
import { VIEWS } from '../../src/engine/desenho';
import { acabamento, montarSvgEstilo } from '../../src/engine/estilo';

// R4, proposta 2 (decisão do Gustavo, 05/11/2026): no modo Técnica do Boneco, o rótulo que cairia em cima do corpo vai
// para fora dele, com uma linha fina até o ponto; o que já está fora não se move; dois rótulos nunca se sobrepõem.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
type Rotulo = { x: number; y: number; size: number; anchor: string; str: string; ret: [number, number, number, number] };
const animacao = (id: string): Animacao => EX.find((e: Animacao) => e.id === id);
const rotulos = (html: string): Rotulo[] =>
  [...html.matchAll(/<text x="([^"]+)" y="([^"]+)" class="lbl-g" font-size="([^"]+)" text-anchor="([^"]+)"[^>]*>([^<]*)<\/text>/g)].map((m) => {
    const x = Number(m[1]), y = Number(m[2]), size = Number(m[3]), anchor = m[4]!, str = m[5]!;
    const w = 0.6 * size * str.length;
    const x0 = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x;
    return { x, y, size, anchor, str, ret: [x0, y - 0.8 * size, x0 + w, y + 0.25 * size] };
  });
const hoje = (ex: Animacao, view: string, t: number) => {
  CTX.ACABAMENTO = { ...acabamento(ex), rotulosFora: 0 };
  try {
    return montarSvgEstilo(ex, view, 'tec', t, 0, 360, 'a').html;
  } finally {
    CTX.ACABAMENTO = null;
  }
};
const proposta = (ex: Animacao, view: string, t: number) => montarSvgEstilo(ex, view, 'tec', t, 0, 360, 'a').html;
const cruza = (a: number[], b: number[]) => a[0]! < b[2]! && a[2]! > b[0]! && a[1]! < b[3]! && a[3]! > b[1]!;
const movidos = (ex: Animacao, view: string, t: number) => {
  const antes = rotulos(hoje(ex, view, t)).map((r) => r.str + '@' + r.x + ',' + r.y);
  return rotulos(proposta(ex, view, t)).filter((r) => !antes.includes(r.str + '@' + r.x + ',' + r.y));
};

describe('rótulos de técnica fora do corpo (R4)', () => {
  it('os piores casos da auditoria saem de cima do corpo: tríceps na suspensão, remada sem banco, remada na suspensão de trás', () => {
    for (const [id, view, texto] of [
      ['triceps-suspensao', 'lateral', 'cotovelos'],
      ['remada-unilateral-sem-banco', 'lateral', 'mão livre na coxa'],
      ['remada-suspensao', 'posterior', 'escápulas'],
    ] as const) {
      const ex = animacao(id);
      const m = movidos(ex, view, 0).filter((r) => r.str.startsWith(texto));
      expect(m.length, `${id}: "${texto}" deveria ter se movido`).toBeGreaterThan(0);
      // fora das juntas do corpo naquele quadro
      const sk: Animacao = skel(poseAt(ex, ex.K, 0));
      const PJ = VIEWS[view].proj as (v: number[]) => number[];
      const pts: number[][] = [sk.P, sk.M, sk.N, sk.Hc, ...['R', 'L'].flatMap((k) => { const d = sk.side[k]; return [d.S, d.E, d.W, d.Hp, d.K, d.A]; })].map(PJ);
      for (const r of m) for (const q of pts) expect(cruza(r.ret, [q[0]! - 3, q[1]! - 3, q[0]! + 3, q[1]! + 3]), `${id}: "${r.str}" sobre uma junta`).toBe(false);
    }
  });

  it('o rótulo que já está fora do corpo não se move (remada baixa, ponte de glúteo, stiff)', () => {
    for (const [id, view, texto] of [
      ['remada-baixa', 'lateral', 'tronco perto da vertical'],
      ['ponte-gluteo', 'lateral', 'ombro, quadril e joelho em linha'],
      ['stiff', 'lateral', 'quadril para trás'],
    ] as const) {
      const ex = animacao(id);
      const a = rotulos(hoje(ex, view, ex.T / 3)).find((r) => r.str === texto)!;
      const b = rotulos(proposta(ex, view, ex.T / 3)).find((r) => r.str === texto)!;
      expect(a, `${id}: "${texto}"`).toBeDefined();
      expect([b.x, b.y, b.anchor]).toEqual([a.x, a.y, a.anchor]);
    }
  });

  it('em toda animação e vista, um rótulo movido fica dentro do palco, abaixo da caixa da fase, e não se sobrepõe a outro', () => {
    // (o que o autor da animação pôs fora do palco ou sobreposto antes da proposta não é desta regra)
    let n = 0;
    for (const ex of EX as Animacao[])
      for (const view of ex.views)
        for (let i = 0; i < 4; i++) {
          const t = (i / 4) * ex.T;
          const q = montarSvgEstilo(ex, view, 'tec', t, 0, 360, 'a');
          const [x0, y0, w, h] = q.viewBox.split(' ').map(Number) as [number, number, number, number];
          const rs = rotulos(q.html);
          const mov = movidos(ex, view, t);
          n += mov.length;
          for (const r of mov) {
            expect(r.ret[0], `${ex.id}/${view}: "${r.str}" sai pela esquerda`).toBeGreaterThanOrEqual(x0 - 1);
            expect(r.ret[2], `${ex.id}/${view}: "${r.str}" sai pela direita`).toBeLessThanOrEqual(x0 + w + 1);
            expect(r.ret[1], `${ex.id}/${view}: "${r.str}" entra na caixa da fase`).toBeGreaterThanOrEqual(y0 + 0.2 * h - 1);
            expect(r.ret[3], `${ex.id}/${view}: "${r.str}" sai por baixo`).toBeLessThanOrEqual(y0 + h + 1);
            for (const o of rs) if (o !== r && o.str !== r.str) expect(cruza(r.ret, o.ret), `${ex.id}/${view}: "${r.str}" × "${o.str}"`).toBe(false);
          }
        }
    expect(n).toBeGreaterThan(40); // 58 linhas de rótulo movidas em 05/11/2026 (de 172)
  }, 60_000);

  it('o rótulo movido acompanha a âncora com o mesmo deslocamento em todos os quadros (não pula de lado)', () => {
    const ex = animacao('triceps-suspensao');
    const desl = [0, 0.25, 0.5, 0.75].map((f) => {
      const html = proposta(ex, 'lateral', f * ex.T);
      const r = rotulos(html).find((x) => x.str.startsWith('cotovelos parados'))!;
      const linha = /<line x1="([^"]+)" y1="([^"]+)" x2="[^"]+" y2="[^"]+" class="gd" stroke-width="[^"]+" stroke-dasharray="2 2"\/>/g;
      const ancoras = [...html.matchAll(linha)].map((m) => [Number(m[1]), Number(m[2])]);
      // a âncora deste rótulo é a linha-guia que chega mais perto dele
      const perto = ancoras.sort((p, q) => Math.hypot(p[0]! - r.x, p[1]! - r.y) - Math.hypot(q[0]! - r.x, q[1]! - r.y))[0]!;
      return [Math.round(r.x - perto[0]!), Math.round(r.y - perto[1]!)].join(',');
    });
    expect(new Set(desl).size).toBe(1);
  });

  it('determinístico, e o estilo clássico não muda', () => {
    const ex = animacao('agachamento-peso-corpo');
    expect(proposta(ex, 'lateral', 1)).toBe(proposta(ex, 'lateral', 1));
    const classico = montarSvgEstilo(ex, 'lateral', 'tec', 1, 0, 360, 'atual').html;
    expect(classico).not.toContain('stroke-dasharray="2 2"');
    expect(rotulos(classico).map((r) => r.str)).toEqual(['joelho pode', 'passar do pé', 'calcanhar no chão']);
  });
});

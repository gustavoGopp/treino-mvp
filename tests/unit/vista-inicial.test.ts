import { describe, expect, it } from 'vitest';
import { EX, montarSvg } from '../../src/engine';
import { comprimentosDoMovimento, MOVIMENTO_MINIMO, montarSvgEstilo, vistaDoMovimento } from '../../src/engine/estilo';

// R4, proposta 3 (decisão do Gustavo, 05/11/2026): o modo Técnica do Boneco abre na vista em que a trajetória da mão
// (ou do pé) é mais longa na tela; empate (menos de 15%) mantém a 1ª vista. Só escolhe a vista: nenhum quadro muda.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
const animacao = (id: string): Animacao => EX.find((e: Animacao) => e.id === id);

describe('a vista do modo Técnica pelo movimento (R4)', () => {
  it('a lista medida em 05/11/2026: só estes mudam de vista inicial', () => {
    const mudam = (EX as Animacao[]).filter((ex) => vistaDoMovimento(ex, 'a') !== ex.views[0]).map((ex) => `${ex.id}: ${ex.views[0]} → ${vistaDoMovimento(ex, 'a')}`);
    expect(mudam).toEqual([
      'crucifixo-polia: frontal → top',
      'face-pull: lateral → top',
      'crucifixo-invertido-polia: frontal → top',
      // as versões com elástico, aprovadas no mesmo dia, seguem as suas bases
      'crucifixo-elastico: frontal → top',
      'face-pull-elastico: lateral → top',
    ]);
  });

  it('o resultado é sempre uma vista do exercício; no clássico, a 1ª; a vista zoom não concorre', () => {
    for (const ex of EX as Animacao[]) {
      expect(ex.views).toContain(vistaDoMovimento(ex, 'a'));
      expect(vistaDoMovimento(ex, 'atual')).toBe(ex.views[0]);
      expect(comprimentosDoMovimento(ex).zoom).toBeUndefined();
    }
    expect(vistaDoMovimento(animacao('panturrilha'), 'a')).toBe('lateral');
  });

  it('os suspeitos da auditoria, medidos: elevação lateral fica de frente; abdução com caneleira fica de lado', () => {
    const el = comprimentosDoMovimento(animacao('elevacao-lateral'));
    expect(el.frontal).toBeGreaterThan(el.lateral!);
    expect(vistaDoMovimento(animacao('elevacao-lateral'), 'a')).toBe('frontal');
    const ab = comprimentosDoMovimento(animacao('abducao-caneleira'));
    expect(ab.lateral).toBeGreaterThan(ab.top! * 3);
  });

  it('a barra fixa supinada não troca por ruído: a lateral vence por 75%, mas o movimento é menor que o mínimo', () => {
    const c = comprimentosDoMovimento(animacao('barra-fixa-supinada'));
    expect(c.lateral).toBeGreaterThan(c.posterior! * 1.15);
    expect(c.lateral).toBeLessThan(MOVIMENTO_MINIMO);
    expect(vistaDoMovimento(animacao('barra-fixa-supinada'), 'a')).toBe('posterior');
  });

  it('escolher a vista não muda nenhum quadro', () => {
    const fp = animacao('face-pull');
    const antes = [montarSvg(fp, 'lateral', 'tec', 1, 0, 358).html, montarSvgEstilo(fp, 'top', 'tec', 1, 0, 358, 'a').html];
    vistaDoMovimento(fp, 'a');
    for (const ex of EX as Animacao[]) vistaDoMovimento(ex, 'a');
    expect([montarSvg(fp, 'lateral', 'tec', 1, 0, 358).html, montarSvgEstilo(fp, 'top', 'tec', 1, 0, 358, 'a').html]).toEqual(antes);
  });
});

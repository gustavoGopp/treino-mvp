import { describe, expect, it } from 'vitest';
import { proximaCarga, serieEfetiva, sugerirProgressao, sugerirSemanaLeve, type Carga, type SessaoExercicio } from '../../src/domain/progressao';

const kg = (k: number): Carga => ({ tipo: 'kg', kg: k });
const sessao = (c: Carga, reps: number[], rir = 1, extra: Partial<SessaoExercicio['series'][number]> = {}): SessaoExercicio => ({
  series: reps.map((r) => ({ carga: c, reps: r, rir, ...extra })),
});
const alvo = { reps: [8, 12] as [number, number], rir: [1, 2] as [number, number] };
const halter = { tipo: 'halter' as const, cargasHalter: [8, 9, 10, 12, 14, 16, 18] };

describe('dupla progressão', () => {
  it('sem histórico: manter', () => expect(sugerirProgressao([], alvo, halter).acao).toBe('manter'));
  it('dentro da faixa: manter e buscar +1 repetição', () => {
    expect(sugerirProgressao([sessao(kg(10), [10, 9, 9])], alvo, halter)).toMatchObject({ acao: 'manter', regraId: 'progressao.manter' });
  });
  it('topo da faixa em 2 sessões seguidas: subir para o próximo halter', () => {
    const h = [sessao(kg(20), [12, 12, 12]), sessao(kg(20), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, { tipo: 'halter', cargasHalter: [20, 22] })).toMatchObject({ acao: 'subir', proxima: kg(22), regraId: 'progressao.subir' });
  });
  it('topo em uma sessão só: ainda manter', () => {
    expect(sugerirProgressao([sessao(kg(10), [11, 10, 10]), sessao(kg(10), [12, 12, 12])], alvo, halter).acao).toBe('manter');
  });
  it('repetições com amplitude encurtada não contam', () => {
    const h = [sessao(kg(10), [12, 12, 12]), sessao(kg(10), [12, 12, 12], 1, { amplitudeCompleta: false })];
    expect(sugerirProgressao(h, alvo, halter).acao).toBe('manter');
  });
  it('salto acima de 10% pede 1–2 repetições acima do topo antes', () => {
    const h = [sessao(kg(8), [12, 12, 12]), sessao(kg(8), [12, 12, 12])];
    const s = sugerirProgressao(h, alvo, { tipo: 'halter', cargasHalter: [8, 10] });
    expect(s).toMatchObject({ acao: 'manter', regraId: 'progressao.salto-grande' });
    const h2 = [sessao(kg(8), [13, 13, 13]), sessao(kg(8), [13, 13, 13])];
    expect(sugerirProgressao(h2, alvo, { tipo: 'halter', cargasHalter: [8, 10] })).toMatchObject({ acao: 'subir', proxima: kg(10) });
  });
  it('carga leve demais: 2 incrementos', () => {
    expect(sugerirProgressao([sessao(kg(9), [15, 13, 12])], alvo, halter)).toMatchObject({ acao: 'subir', proxima: kg(12), regraId: 'progressao.carga-leve' });
  });
  it('subiu e a 1ª série ficou abaixo do mínimo: voltar à carga anterior', () => {
    const h = [sessao(kg(10), [12, 12, 12]), sessao(kg(12), [6, 6, 5])];
    expect(sugerirProgressao(h, alvo, halter)).toMatchObject({ acao: 'voltar', proxima: kg(10), regraId: 'progressao.salto-grande' });
  });
  it('2 sessões abaixo do mínimo: reduzir 5–10%', () => {
    const h = [sessao(kg(14), [7, 6, 6]), sessao(kg(14), [7, 6, 5])];
    expect(sugerirProgressao(h, alvo, halter)).toMatchObject({ acao: 'reduzir', proxima: kg(12), regraId: 'progressao.reduzir' });
  });
  it('3 sessões sem melhora: estagnado', () => {
    const h = [sessao(kg(12), [10, 9, 9]), sessao(kg(12), [10, 9, 8]), sessao(kg(12), [9, 9, 9])];
    expect(sugerirProgressao(h, alvo, halter).acao).toBe('estagnado');
  });
  it('sem carga maior disponível: escada de dificuldade', () => {
    const h = [sessao(kg(18), [12, 12, 12]), sessao(kg(18), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, halter)).toMatchObject({ acao: 'manter', regraId: 'equipamento.escada-carga-leve' });
  });
  it('polia: +1 placa; respeita o limite da pilha', () => {
    const p = (n: number): Carga => ({ tipo: 'placa', placa: n });
    const h = [sessao(p(6), [12, 12, 12]), sessao(p(6), [12, 12, 12])];
    expect(sugerirProgressao(h, alvo, { tipo: 'polia' })).toMatchObject({ acao: 'subir', proxima: p(7) });
    expect(sugerirProgressao(h, alvo, { tipo: 'polia', placasMax: 6 }).regraId).toBe('equipamento.escada-carga-leve');
  });
  it('peso do corpo: próximo degrau da escada', () => {
    const d = (n: number): Carga => ({ tipo: 'degrau', degrau: n });
    const h = [sessao(d(0), [20, 20]), sessao(d(0), [20, 20])];
    expect(sugerirProgressao(h, { reps: [8, 20], rir: [1, 2] }, { tipo: 'peso-corpo' })).toMatchObject({ acao: 'subir', proxima: d(1) });
    expect(proximaCarga(d(3), 1, { tipo: 'peso-corpo' })).toBeUndefined();
    expect(proximaCarga(d(0), -1, { tipo: 'peso-corpo' })).toBeUndefined();
  });
  it('barra sem lista de cargas: degraus de 2,5 kg', () => {
    expect(proximaCarga(kg(40), 1, { tipo: 'barra' })).toEqual(kg(42.5));
    expect(proximaCarga(kg(2.5), -1, { tipo: 'barra' })).toBeUndefined();
    const h = [sessao(kg(40), [7, 6]), sessao(kg(40), [6, 6])];
    expect(sugerirProgressao(h, alvo, { tipo: 'barra' })).toMatchObject({ acao: 'reduzir', proxima: kg(37) });
  });
});

describe('segurança na progressão', () => {
  it('dor > 5: interromper; dor 3–5: ajustar com carga menor', () => {
    expect(sugerirProgressao([sessao(kg(12), [10], 1, { dor: 6 })], alvo, halter).acao).toBe('interromper');
    expect(sugerirProgressao([sessao(kg(12), [10], 1, { dor: 4 })], alvo, halter)).toMatchObject({ acao: 'ajustar', proxima: kg(10) });
  });
});

describe('semana leve e série efetiva', () => {
  it('sugere só com motivo', () => {
    expect(sugerirSemanaLeve({ exerciciosEstagnados: 0, semanasSemPausa: 3, fadigaOuDorPersistente: false }).sugerir).toBe(false);
    expect(sugerirSemanaLeve({ exerciciosEstagnados: 2, semanasSemPausa: 7, fadigaOuDorPersistente: true }).motivos).toHaveLength(3);
  });
  it('RIR até 4 conta; acima não', () => {
    expect(serieEfetiva({ carga: kg(10), reps: 10, rir: 4 })).toBe(true);
    expect(serieEfetiva({ carga: kg(10), reps: 10, rir: 5 })).toBe(false);
  });
});

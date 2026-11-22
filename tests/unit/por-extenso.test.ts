import { describe, expect, it } from 'vitest';
import { faixaPorExtenso, metaPorExtenso, reservaPorExtenso, seriesPorExtenso } from '../../src/domain/numero';

// Lote M3 da análise crítica (22/11/2026): a notação por extenso, para quem nunca treinou. "2 × 8–15" e "RIR 3–4"
// saem das telas de uso; a sigla RIR fica só em "Entenda o treino".
describe('a prescrição por extenso', () => {
  it('séries e repetições: "2 séries de 8 a 15", "1 série de 6 a 10", "3 séries de 10"', () => {
    expect(seriesPorExtenso(2, [8, 15])).toBe('2 séries de 8 a 15');
    expect(seriesPorExtenso(1, [6, 10])).toBe('1 série de 6 a 10');
    expect(seriesPorExtenso(3, [10, 10])).toBe('3 séries de 10');
    expect(faixaPorExtenso([8, 15])).toBe('8 a 15');
  });
  it('a reserva pedida vira o que a pessoa faz: parar com tantas sobrando', () => {
    expect(reservaPorExtenso([3, 4])).toBe('Pare com 3 ou 4 sobrando');
    expect(reservaPorExtenso([1, 2])).toBe('Pare com 1 ou 2 sobrando');
    expect(reservaPorExtenso([2, 2])).toBe('Pare com 2 sobrando');
    expect(reservaPorExtenso([2, 4])).toBe('Pare com 2 a 4 sobrando');
    expect(reservaPorExtenso([0, 1])).toBe('Pare com 1 sobrando, ou nenhuma');
    expect(reservaPorExtenso([0, 0])).toBe('Vá até não sobrar nenhuma');
  });
  it('a meta curta, ao lado da pergunta da reserva: "3 ou 4", "2 a 4", "2"', () => {
    expect(metaPorExtenso([3, 4])).toBe('3 ou 4');
    expect(metaPorExtenso([2, 4])).toBe('2 a 4');
    expect(metaPorExtenso([2, 2])).toBe('2');
  });
});

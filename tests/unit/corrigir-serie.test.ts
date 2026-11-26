import { describe, expect, it } from 'vitest';
import type { SerieRegistrada } from '../../src/domain/progressao';
import type { Sessao } from '../../src/domain/sessao';
import { apagarSerie, corrigirSerie } from '../../src/features/treino/acoes';
import type { Estado } from '../../src/storage/esquema';

// Corrigir uma série marcada errado (pedido do Gustavo, 26/11/2026; registro.treino-feito): no treino aberto e num
// treino antigo. A nota de dor, as quedas e a marca de acerto da carga ficam; ao apagar, a nota de dor não se perde.
const serie = (kg: number, reps: number, rir: number, extra: Partial<SerieRegistrada> = {}): SerieRegistrada => ({ carga: { tipo: 'kg', kg }, reps, rir, ...extra });
const sessao = (id: string, series: SerieRegistrada[]): Sessao => ({ id, diaId: 'a', semana: 1, inicio: id, exercicios: [{ exId: 'outro', series: [serie(5, 10, 2)] }, { exId: 'supino-reto', series }] });
const estado = (historico: Sessao[], aberta?: Sessao) => ({ versao: 10, historico, ...(aberta ? { sessaoAtual: aberta } : {}) }) as unknown as Estado;

describe('corrigir uma série já registrada', () => {
  it('no treino aberto: muda só a carga, as repetições e a reserva da série escolhida', () => {
    const aberta = sessao('2026-11-26T10:00:00.000Z', [serie(10, 10, 2), serie(10, 8, 1, { dor: 3, calibracao: true, quedas: [{ carga: { tipo: 'kg', kg: 8 }, reps: 6 }] })]);
    const e = corrigirSerie(estado([], aberta), { exIndex: 1, n: 1 }, { carga: { tipo: 'kg', kg: 9 }, reps: 12, rir: 3 });
    expect(e.sessaoAtual!.exercicios[1]!.series).toEqual([
      serie(10, 10, 2),
      serie(9, 12, 3, { dor: 3, calibracao: true, quedas: [{ carga: { tipo: 'kg', kg: 8 }, reps: 6 }] }),
    ]);
    // o outro exercício e o histórico não mudam
    expect(e.sessaoAtual!.exercicios[0]).toEqual(aberta.exercicios[0]);
    expect(e.historico).toEqual([]);
  });

  it('num treino antigo: muda só aquele treino', () => {
    const [a, b] = [sessao('2026-11-20T10:00:00.000Z', [serie(10, 10, 2)]), sessao('2026-11-22T10:00:00.000Z', [serie(10, 10, 2)])];
    const e = corrigirSerie(estado([a, b]), { sessaoId: a.id, exIndex: 1, n: 0 }, { carga: { tipo: 'kg', kg: 35 }, reps: 8, rir: 1 });
    expect(e.historico[0]!.exercicios[1]!.series).toEqual([serie(35, 8, 1)]);
    expect(e.historico[1]).toEqual(b);
  });

  it('sem o treino ou sem treino aberto, nada muda', () => {
    const e0 = estado([sessao('2026-11-20T10:00:00.000Z', [serie(10, 10, 2)])]);
    expect(corrigirSerie(e0, { sessaoId: 'nao-existe', exIndex: 1, n: 0 }, { carga: { tipo: 'kg', kg: 1 }, reps: 1, rir: 1 })).toEqual(e0);
    expect(corrigirSerie(e0, { exIndex: 1, n: 0 }, { carga: { tipo: 'kg', kg: 1 }, reps: 1, rir: 1 })).toEqual(e0);
  });
});

describe('apagar uma série já registrada', () => {
  it('apaga a série do meio, e as outras ficam na ordem', () => {
    const a = sessao('2026-11-20T10:00:00.000Z', [serie(10, 10, 2), serie(12, 8, 1), serie(10, 9, 2)]);
    const e = apagarSerie(estado([a]), { sessaoId: a.id, exIndex: 1, n: 1 });
    expect(e.historico[0]!.exercicios[1]!.series).toEqual([serie(10, 10, 2), serie(10, 9, 2)]);
  });

  it('a nota de dor da série apagada vai para a última que fica, com a maior nota', () => {
    const aberta = sessao('2026-11-26T10:00:00.000Z', [serie(10, 10, 2, { dor: 2 }), serie(10, 8, 1, { dor: 5 })]);
    const e = apagarSerie(estado([], aberta), { exIndex: 1, n: 1 });
    expect(e.sessaoAtual!.exercicios[1]!.series).toEqual([serie(10, 10, 2, { dor: 5 })]);
  });

  it('sem nenhuma série que fique, a nota de dor fica no exercício', () => {
    const aberta = sessao('2026-11-26T10:00:00.000Z', [serie(10, 10, 2, { dor: 4 })]);
    const e = apagarSerie(estado([], aberta), { exIndex: 1, n: 0 });
    expect(e.sessaoAtual!.exercicios[1]).toEqual({ exId: 'supino-reto', series: [], dorSemSerie: 4 });
  });
});

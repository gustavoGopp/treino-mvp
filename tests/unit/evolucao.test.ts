import { describe, expect, it } from 'vitest';
import { evolucaoDoExercicio, exerciciosComHistorico, marcasDaSemana, marcasDaSessao } from '../../src/domain/acompanhamento/evolucao';
import type { Carga, SerieRegistrada } from '../../src/domain/progressao';
import { textoCarga, type Sessao } from '../../src/domain/sessao';
import { dia } from './apoio-treino';

// Evolução por exercício (acompanhamento.evolucao; pesquisa-v2/07, seção 5): os casos E1 a E4 do T6 e as máquinas por local.

const kg = (k: number): Carga => ({ tipo: 'kg', kg: k });
const s = (carga: Carga, reps: number, extra: Partial<SerieRegistrada> = {}): SerieRegistrada => ({ carga, reps, rir: 2, ...extra });
const sessao = (n: number, exId: string, series: SerieRegistrada[], extra: Partial<Sessao> & { noLugarDe?: string } = {}): Sessao => {
  const { noLugarDe, ...resto } = extra;
  return { id: dia(n), diaId: 'superior-a', semana: 1, inicio: dia(n), fim: dia(n, 11), exercicios: [{ exId, ...(noLugarDe ? { noLugarDe } : {}), series }], ...resto };
};
const semLocal = () => undefined;

describe('os casos E1 a E4 do T6', () => {
  it('E1: supino 8 kg × 10, depois 8 kg × 12, depois 9 kg × 8 → três pontos; "recorde" na 2ª e "subiu a carga" na 3ª', () => {
    const h = [sessao(0, 'supino-reto', [s(kg(8), 10), s(kg(8), 9)]), sessao(3, 'supino-reto', [s(kg(8), 12), s(kg(8), 10)]), sessao(7, 'supino-reto', [s(kg(9), 8)])];
    const [linha] = evolucaoDoExercicio(h, 'supino-reto', semLocal);
    expect(linha!.pontos.map((p) => [textoCarga(p.carga), p.reps, p.marcas])).toEqual([
      ['8 kg', 10, []],
      ['8 kg', 12, ['recorde']],
      ['9 kg', 8, ['subiu-a-carga']],
    ]);
    expect(linha!.regraId).toBe('acompanhamento.evolucao');
    expect(linha!.localId).toBeUndefined();
  });

  it('E2: flexão no degrau "descida de 3 s" × 12 → o degrau e as repetições, sem kg', () => {
    const [linha] = evolucaoDoExercicio([sessao(0, 'flexao', [s({ tipo: 'degrau', degrau: 1 }, 12)])], 'flexao', semLocal);
    const p = linha!.pontos[0]!;
    expect(`${textoCarga(p.carga, 'flexao')} × ${p.reps}`).toBe('peso do corpo · descida de 3 s × 12');
    expect(textoCarga(p.carga, 'flexao')).not.toMatch(/kg/);
  });

  it('E3: série com amplitude encurtada não conta como recorde; a de acerto da calibração também não', () => {
    const h = [
      sessao(0, 'supino-reto', [s(kg(8), 10)]),
      sessao(3, 'supino-reto', [s(kg(8), 14, { amplitudeCompleta: false }), s(kg(8), 10)]),
      sessao(5, 'supino-reto', [s(kg(10), 15, { calibracao: true })]),
      sessao(7, 'supino-reto', [s(kg(8), 11)]),
    ];
    const [linha] = evolucaoDoExercicio(h, 'supino-reto', semLocal);
    expect(linha!.pontos.map((p) => [p.reps, p.marcas, !!p.acerto])).toEqual([
      [10, [], false],
      [10, [], false],
      [15, [], true],
      [11, ['recorde'], false],
    ]);
  });

  it('E4: o exercício trocado pela alternativa numa sessão tem a sua própria evolução, sem misturar com o original', () => {
    const h = [
      sessao(0, 'crucifixo-polia', [s({ tipo: 'placa', placa: 5 }, 12)]),
      sessao(3, 'crucifixo-halteres', [s(kg(8), 12)], { noLugarDe: 'crucifixo-polia' }),
      sessao(7, 'crucifixo-polia', [s({ tipo: 'placa', placa: 5 }, 13)]),
    ];
    const pol = evolucaoDoExercicio(h, 'crucifixo-polia', () => 'local-1');
    const hal = evolucaoDoExercicio(h, 'crucifixo-halteres', () => 'local-1');
    expect(pol[0]!.pontos.map((p) => p.reps)).toEqual([12, 13]);
    expect(pol[0]!.pontos[1]!.marcas).toEqual(['recorde']);
    expect(hal[0]!.pontos.map((p) => p.reps)).toEqual([12]);
    expect(exerciciosComHistorico(h)).toEqual(['crucifixo-polia', 'crucifixo-halteres']);
  });
});

describe('marcas por sessão e por semana (pedido 3 do redesign)', () => {
  // E1 com outro exercício junto: dia(0) é segunda, 05/10/2026; dia(3) quinta; dia(7) a segunda seguinte.
  const h = [
    sessao(0, 'supino-reto', [s(kg(8), 10), s(kg(8), 9)]),
    { ...sessao(3, 'supino-reto', [s(kg(8), 12), s(kg(8), 10)]), exercicios: [{ exId: 'supino-reto', series: [s(kg(8), 12)] }, { exId: 'stiff', series: [s(kg(12), 10)] }] },
    sessao(7, 'supino-reto', [s(kg(9), 8)]),
  ];

  it('E1 por sessão: "recorde" no supino da 2ª, "subiu a carga" na 3ª, nada na 1ª; o exercício sem marca não entra', () => {
    expect(marcasDaSessao(h, dia(0), semLocal)).toEqual([]);
    expect(marcasDaSessao(h, dia(3), semLocal).map((m) => [m.exId, textoCarga(m.carga), m.reps, m.marcas])).toEqual([['supino-reto', '8 kg', 12, ['recorde']]]);
    expect(marcasDaSessao(h, dia(7), semLocal).map((m) => [m.exId, m.marcas])).toEqual([['supino-reto', ['subiu-a-carga']]]);
    expect(marcasDaSessao(h, 'nao-existe', semLocal)).toEqual([]);
  });

  it('por semana: só as sessões da semana do calendário; a semana sem marca fica vazia', () => {
    expect(marcasDaSemana(h, dia(4), 0, semLocal).map((m) => [m.exId, m.marcas])).toEqual([['supino-reto', ['recorde']]]);
    expect(marcasDaSemana(h, dia(8), 0, semLocal).map((m) => [m.exId, m.marcas, m.sessaoId])).toEqual([['supino-reto', ['subiu-a-carga'], dia(7)]]);
    expect(marcasDaSemana(h, dia(-3), 0, semLocal)).toEqual([]);
    expect(marcasDaSemana(h, dia(20), 0, semLocal)).toEqual([]);
  });

  it('por semana, com duas marcas do mesmo exercício, fica a mais recente', () => {
    const h2 = [sessao(0, 'supino-reto', [s(kg(8), 10)]), sessao(1, 'supino-reto', [s(kg(8), 11)]), sessao(3, 'supino-reto', [s(kg(9), 8)])];
    expect(marcasDaSemana(h2, dia(4), 0, semLocal).map((m) => [textoCarga(m.carga), m.marcas])).toEqual([['9 kg', ['subiu-a-carga']]]);
  });

  it('a calibração e a amplitude encurtada não dão marca', () => {
    const h3 = [sessao(0, 'supino-reto', [s(kg(8), 10)]), sessao(2, 'supino-reto', [s(kg(8), 14, { amplitudeCompleta: false }), s(kg(8), 10)]), sessao(3, 'supino-reto', [s(kg(10), 15, { calibracao: true })])];
    expect(marcasDaSessao(h3, dia(2), semLocal)).toEqual([]);
    expect(marcasDaSessao(h3, dia(3), semLocal)).toEqual([]);
    expect(marcasDaSemana(h3, dia(4), 0, semLocal)).toEqual([]);
  });

  it('o fuso decide a semana: a sessão de domingo às 23h em Brasília é da semana do domingo', () => {
    // dia(7, 2) é segunda 12/10 às 02h UTC = domingo 11/10 às 23h em Brasília (−180).
    const h4 = [sessao(0, 'supino-reto', [s(kg(8), 10)]), { ...sessao(7, 'supino-reto', [s(kg(8), 12)]), id: 'dom', inicio: dia(7, 2), fim: dia(7, 3) }];
    expect(marcasDaSemana(h4, dia(2), -180, semLocal).map((m) => m.sessaoId)).toEqual(['dom']);
    expect(marcasDaSemana(h4, dia(2), 0, semLocal)).toEqual([]);
  });

  it('nas máquinas, a marca leva o local', () => {
    const local = (x: Sessao) => x.localId ?? 'local-1';
    const h5 = [sessao(0, 'puxada-unilateral', [s({ tipo: 'placa', placa: 7 }, 10)]), sessao(2, 'puxada-unilateral', [s({ tipo: 'placa', placa: 7 }, 12)])];
    expect(marcasDaSessao(h5, dia(2), local)).toMatchObject([{ exId: 'puxada-unilateral', localId: 'local-1', marcas: ['recorde'] }]);
  });
});

describe('máquinas por local', () => {
  it('nas máquinas, uma linha por local (a placa de uma torre não vale na outra); nos halteres, uma linha só', () => {
    const local = (x: Sessao) => x.localId ?? 'local-1';
    const h = [
      sessao(0, 'puxada-unilateral', [s({ tipo: 'placa', placa: 7 }, 10)]),
      sessao(2, 'puxada-unilateral', [s({ tipo: 'placa', placa: 4 }, 10)], { localId: 'local-2' }),
      sessao(4, 'puxada-unilateral', [s({ tipo: 'placa', placa: 7 }, 12)], { localId: 'local-1' }),
      sessao(6, 'supino-reto', [s(kg(8), 10)], { localId: 'local-2' }),
      sessao(8, 'supino-reto', [s(kg(9), 9)], { localId: 'local-1' }),
    ];
    const linhas = evolucaoDoExercicio(h, 'puxada-unilateral', local);
    expect(linhas.map((l) => [l.localId, l.pontos.map((p) => textoCarga(p.carga)), l.pontos.map((p) => p.marcas)])).toEqual([
      ['local-1', ['placa 7', 'placa 7'], [[], ['recorde']]],
      ['local-2', ['placa 4'], [[]]],
    ]);
    const sup = evolucaoDoExercicio(h, 'supino-reto', local);
    expect(sup).toHaveLength(1);
    expect(sup[0]!.pontos.map((p) => p.marcas)).toEqual([[], ['subiu-a-carga']]);
  });

  it('no contrapeso, menos placa é mais difícil: tirar placa é "subiu a carga"', () => {
    const h = [sessao(0, 'barra-fixa-graviton', [s({ tipo: 'contrapeso', placa: 5 }, 10)]), sessao(3, 'barra-fixa-graviton', [s({ tipo: 'contrapeso', placa: 4 }, 8)])];
    const [linha] = evolucaoDoExercicio(h, 'barra-fixa-graviton', () => 'local-1');
    expect(linha!.pontos[1]!.marcas).toEqual(['subiu-a-carga']);
  });
});

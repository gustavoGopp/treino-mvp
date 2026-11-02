import { describe, expect, it } from 'vitest';
import { evolucaoDoExercicio, exerciciosComHistorico } from '../../src/domain/acompanhamento/evolucao';
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
    expect(`${textoCarga(p.carga, 'flexao')} × ${p.reps}`).toBe('peso do corpo · descida de 3 s ou pausa embaixo × 12');
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

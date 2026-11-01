import { describe, expect, it } from 'vitest';
import { gerarPrograma } from '../../src/domain/gerador';
import { descartarSessao, desfazerSerie, iniciarSessao, interromperExercicio, registrarSerie, terminarSessao, trocarExercicio } from '../../src/features/treino/acoes';
import { estadoSchema, VERSAO_ESTADO, type Estado } from '../../src/storage/esquema';
import { PERSONAS } from '../personas';

const T0 = '2026-11-02T10:00:00.000Z';
const T1 = '2026-11-02T10:50:00.000Z';
const serie = { carga: { tipo: 'kg' as const, kg: 8 }, reps: 10, rir: 2 };

function estadoAna(): Estado {
  const p = PERSONAS.ana;
  const r = gerarPrograma(p.perfil, p.inventario);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return { versao: VERSAO_ESTADO, inventario: p.inventario, programa: { programa: r.programa, geradoEm: T0 }, historico: [] };
}

describe('ações do treino', () => {
  it('começa o próximo dia da rotação, na semana certa, com os exercícios do dia', () => {
    const e = iniciarSessao(estadoAna(), T0);
    expect(e.sessaoAtual).toMatchObject({ diaId: 'corpo-a', semana: 1, inicio: T0 });
    expect(e.sessaoAtual!.exercicios.map((x) => x.series)).toEqual(e.programa!.programa.dias[0]!.exercicios.map(() => []));
    // Não começa outro por cima de um treino em andamento.
    expect(iniciarSessao(e, T1, 'corpo-b').sessaoAtual!.diaId).toBe('corpo-a');
    expect(iniciarSessao({ ...estadoAna(), programa: undefined }, T0).sessaoAtual).toBeUndefined();
  });

  it('registra, desfaz e termina; o resultado continua válido no esquema salvo', () => {
    let e = iniciarSessao(estadoAna(), T0);
    e = registrarSerie(e, 0, serie);
    e = registrarSerie(e, 0, serie);
    e = desfazerSerie(e, 0);
    expect(e.sessaoAtual!.exercicios[0]!.series).toEqual([serie]);
    e = terminarSessao(e, T1);
    expect(e.sessaoAtual).toBeUndefined();
    expect(e.historico).toHaveLength(1);
    expect(e.historico[0]).toMatchObject({ fim: T1 });
    expect(estadoSchema.parse(e)).toEqual(e);
    // Depois de terminar, o próximo treino é o B.
    expect(iniciarSessao(e, T1).sessaoAtual!.diaId).toBe('corpo-b');
  });

  it('troca pela alternativa: no lugar quando não houve série; depois, quando já houve', () => {
    let e = iniciarSessao(estadoAna(), T0);
    const orig = e.sessaoAtual!.exercicios[0]!.exId;
    e = trocarExercicio(e, 0, 'agachamento-peso-corpo');
    expect(e.sessaoAtual!.exercicios[0]).toEqual({ exId: 'agachamento-peso-corpo', noLugarDe: orig, series: [] });
    let f = registrarSerie(iniciarSessao(estadoAna(), T0), 0, serie);
    const n = f.sessaoAtual!.exercicios.length;
    f = trocarExercicio(f, 0, 'agachamento-peso-corpo');
    expect(f.sessaoAtual!.exercicios).toHaveLength(n + 1);
    expect(f.sessaoAtual!.exercicios[1]).toMatchObject({ exId: 'agachamento-peso-corpo', noLugarDe: orig });
    expect(trocarExercicio(f, 99, 'x')).toBe(f);
  });

  it('interrupção por alerta e descarte', () => {
    let e = interromperExercicio(iniciarSessao(estadoAna(), T0), 0);
    expect(e.sessaoAtual!.exercicios[0]!.interrompido).toBe(true);
    expect(terminarSessao(e, T1, true).historico[0]!.encerradaPorAlerta).toBe(true);
    e = descartarSessao(e);
    expect(e.sessaoAtual).toBeUndefined();
    expect(e.historico).toEqual([]);
    expect(terminarSessao(e, T1)).toBe(e);
    expect(registrarSerie(e, 0, serie)).toBe(e);
  });
});

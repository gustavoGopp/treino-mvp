import { describe, expect, it } from 'vitest';
import { gerarPrograma } from '../../src/domain/gerador';
import { anotarDor, apagarUltimoTreino, comDor, corrigirSerie, descartarSessao, desfazerSerie, iniciarSessao, interromperExercicio, registrarSerie, semSerie, terminarSessao, trocarExercicio } from '../../src/features/treino/acoes';
import { sugestaoDoExercicio } from '../../src/domain/sessao';
import { estadoSchema, VERSAO_ESTADO, type Estado } from '../../src/storage/esquema';
import { PERSONAS } from '../personas';

const T0 = '2026-11-02T10:00:00.000Z';
const T1 = '2026-11-02T10:50:00.000Z';
const serie = { carga: { tipo: 'kg' as const, kg: 8 }, reps: 10, rir: 2 };

function estadoAna(): Estado {
  const p = PERSONAS.ana;
  const r = gerarPrograma(p.perfil, p.inventario);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return { versao: VERSAO_ESTADO, locais: [{ id: 'local-1', nome: 'Meu local', inventario: p.inventario }], programa: { programa: r.programa, geradoEm: T0 }, historico: [] };
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

  it('a série com drop set guarda as quedas (até 2) e continua válida no esquema salvo', () => {
    let e = iniciarSessao(estadoAna(), T0);
    const comQuedas = { ...serie, quedas: [{ carga: { tipo: 'kg' as const, kg: 6 }, reps: 8 }, { carga: { tipo: 'kg' as const, kg: 4 }, reps: 6 }] };
    e = registrarSerie(e, 0, comQuedas);
    expect(e.sessaoAtual!.exercicios[0]!.series[0]!.quedas).toHaveLength(2);
    expect(estadoSchema.parse(e)).toEqual(e);
    const tres = { ...comQuedas, quedas: [...comQuedas.quedas, comQuedas.quedas[0]!] };
    expect(estadoSchema.safeParse(registrarSerie(e, 0, tres)).success).toBe(false);
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

describe('o registro que não engana (R5a; seguranca.dor.escala, registro.treino-feito)', () => {
  it('a nota de dor vai para a última série feita do exercício, com a maior nota', () => {
    let e = registrarSerie(iniciarSessao(estadoAna(), T0), 0, serie);
    e = registrarSerie(e, 0, serie);
    const r = anotarDor(e, 0, 4);
    expect(r.guardada).toBe(true);
    expect(r.estado.sessaoAtual!.exercicios[0]!.series.map((s) => s.dor)).toEqual([undefined, 4]);
    expect(anotarDor(r.estado, 0, 3).estado.sessaoAtual!.exercicios[0]!.series[1]!.dor).toBe(4);
    expect(estadoSchema.parse(r.estado)).toEqual(r.estado);
  });

  it('sem série feita, a nota não tem onde ficar: quem chama a leva para a próxima série (comDor)', () => {
    const e = iniciarSessao(estadoAna(), T0);
    expect(anotarDor(e, 0, 4)).toEqual({ estado: e, guardada: false });
    expect(comDor(serie, 4)).toEqual({ ...serie, dor: 4 });
    expect(comDor({ ...serie, dor: 5 }, 4).dor).toBe(5);
    expect(comDor(serie, 0)).toEqual(serie);
    expect(comDor(serie)).toEqual(serie);
  });

  it('dor 4 guardada reduz a carga da próxima sessão do exercício', () => {
    let e = iniciarSessao(estadoAna(), T0);
    const x = e.programa!.programa.dias[0]!.exercicios[0]!;
    const inv = e.locais![0]!.inventario;
    e = registrarSerie(e, 0, serie);
    e = anotarDor(e, 0, 4).estado;
    e = terminarSessao(e, T1);
    const sug = sugestaoDoExercicio(e.historico, { ...x, exId: e.historico[0]!.exercicios[0]!.exId }, inv);
    expect(sug.acao).toBe('ajustar');
    expect(sug.regraId).toBe('seguranca.dor.escala');
  });

  it('"Terminar" sem série: o treino em andamento está vazio; descartar não grava nada e mantém o dia', () => {
    const e = iniciarSessao(estadoAna(), T0);
    expect(semSerie(e)).toBe(true);
    expect(semSerie(registrarSerie(e, 0, serie))).toBe(false);
    const d = descartarSessao(e);
    expect(d.historico).toHaveLength(0);
    expect(iniciarSessao(d, T1).sessaoAtual!.diaId).toBe('corpo-a');
    // "Guardar mesmo assim": fica no histórico, mas não conta para a rotação.
    const g = terminarSessao(e, T1);
    expect(g.historico).toHaveLength(1);
    expect(iniciarSessao(g, T1).sessaoAtual!.diaId).toBe('corpo-a');
  });

  it('apaga o último treino e corrige uma série dele; outro id não muda nada', () => {
    let e = terminarSessao(registrarSerie(iniciarSessao(estadoAna(), T0), 0, serie), T1);
    const id = e.historico[0]!.id;
    expect(apagarUltimoTreino(e, 'outro')).toBe(e);
    expect(iniciarSessao(apagarUltimoTreino(e, id), T1).sessaoAtual!.diaId).toBe('corpo-a');
    const certa = { ...serie, reps: 12 };
    e = corrigirSerie(e, id, 0, 0, certa);
    expect(e.historico[0]!.exercicios[0]!.series[0]).toEqual(certa);
    expect(corrigirSerie(e, id, 0, 5, serie)).toBe(e);
    expect(estadoSchema.parse(e)).toEqual(e);
  });
});

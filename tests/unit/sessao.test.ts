import { describe, expect, it } from 'vitest';
import { gerarPrograma, type Programa } from '../../src/domain/gerador';
import {
  diaDaSemana,
  historicoDoExercicio,
  opcoesCarga,
  precisaAquecer,
  proximoDia,
  resumoSessao,
  semanaDoPrograma,
  sugestaoDoExercicio,
  textoCarga,
  ultimaSerie,
  type Sessao,
} from '../../src/domain/sessao';
import { PERSONAS } from '../personas';

const programaDe = (p: (typeof PERSONAS)[keyof typeof PERSONAS]): Programa => {
  const r = gerarPrograma(p.perfil, p.inventario);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
const ana = PERSONAS.ana;
const prog = programaDe(ana);
const sessao = (diaId: string, inicio: string, exercicios: Sessao['exercicios'] = [], fim: string | null = inicio): Sessao => ({
  id: inicio,
  diaId,
  semana: 1,
  inicio,
  ...(fim ? { fim } : {}),
  exercicios,
});
const kg = (k: number, reps: number, rir = 2) => ({ carga: { tipo: 'kg' as const, kg: k }, reps, rir });

describe('rotação e semana', () => {
  it('sem histórico, começa no primeiro dia; depois segue a rotação e volta ao início', () => {
    const [a, b, c] = prog.dias.map((d) => d.id) as [string, string, string];
    expect(proximoDia(prog, []).id).toBe(a);
    expect(proximoDia(prog, [sessao(a, '2026-11-02T10:00:00Z')]).id).toBe(b);
    expect(proximoDia(prog, [sessao(a, '2026-11-02T10:00:00Z'), sessao(c, '2026-11-04T10:00:00Z')]).id).toBe(a);
  });

  it('sessão não terminada não conta para a rotação', () => {
    expect(proximoDia(prog, [sessao(prog.dias[0]!.id, '2026-11-02T10:00:00Z', [], null)]).id).toBe(prog.dias[0]!.id);
  });

  it('a semana conta em semanas corridas desde a primeira sessão', () => {
    const h = [sessao('x', '2026-11-02T10:00:00Z')];
    expect(semanaDoPrograma([], '2026-11-02T10:00:00Z')).toBe(1);
    expect(semanaDoPrograma(h, '2026-11-08T23:00:00Z')).toBe(1);
    expect(semanaDoPrograma(h, '2026-11-09T10:00:00Z')).toBe(2);
    expect(semanaDoPrograma(h, '2026-11-23T10:00:00Z')).toBe(4);
  });

  it('na fase de aprendizado (semanas 1–2) a iniciante faz menos séries que na semana 3', () => {
    const d = prog.dias[0]!.id;
    const total = (s: number) => diaDaSemana(prog, d, s).exercicios.reduce((t, x) => t + x.series, 0);
    expect(total(1)).toBeLessThan(total(3));
    expect(diaDaSemana(prog, d, 1).exercicios[0]!.rir).toEqual([3, 4]);
  });
});

describe('carga conforme o equipamento', () => {
  it('halter usa só as cargas do inventário; polia, placa; peso do corpo e elástico, degrau', () => {
    const h = opcoesCarga('remada-unilateral-halter', ana.inventario);
    expect(h.registro).toBe('kg');
    expect(h.lista).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(opcoesCarga('crucifixo-polia-baixo', { estacao_polia_dupla: { placas: 12 } })).toMatchObject({ registro: 'placa', placasMax: 12 });
    expect(opcoesCarga('flexao', {}).registro).toBe('degrau');
    expect(opcoesCarga('leg-press', {}).registro).toBe('anilha');
    expect(opcoesCarga('nao-existe', {}).registro).toBe('degrau');
  });

  it('texto da carga', () => {
    expect(textoCarga({ tipo: 'kg', kg: 12.5 })).toBe('12,5 kg');
    expect(textoCarga({ tipo: 'placa', placa: 4 })).toBe('placa 4');
    expect(textoCarga({ tipo: 'degrau', degrau: 0 })).toBe('mais repetições');
    expect(textoCarga({ tipo: 'degrau', degrau: 9 })).toBe('degrau 10');
    expect(textoCarga({ tipo: 'anilha', kgPorLado: 12.5 })).toBe('12,5 kg por lado');
    expect(textoCarga({ tipo: 'contrapeso', placa: 6 })).toBe('contrapeso 6');
  });

  it('os 5 tipos de carga (pesquisa-v2/08, seção 1.1): máquina com torre por placa, máquina de anilha por lado, graviton por contrapeso, kettlebell pela lista', () => {
    expect(opcoesCarga('cadeira-extensora', { cadeira_extensora: { placas: 15 } })).toMatchObject({ registro: 'placa', placasMax: 15 });
    // A estação do multifuncional dá as placas da torre dele.
    expect(opcoesCarga('cadeira-extensora', { multifuncional: { extensora: true, placas: 10 } })).toMatchObject({ registro: 'placa', placasMax: 10 });
    expect(opcoesCarga('puxada-frente', { estacao_puxada: { placas: 18 } })).toMatchObject({ registro: 'placa', placasMax: 18 });
    expect(opcoesCarga('hack', { hack: { menorAnilhaKg: 1.25 } })).toMatchObject({ registro: 'anilha', menorAnilhaKg: 1.25 });
    expect(opcoesCarga('hack', { hack: {} })).toEqual({ tipo: 'anilha', registro: 'anilha' });
    expect(opcoesCarga('barra-fixa-graviton', { graviton: { placas: 12 } })).toMatchObject({ registro: 'contrapeso', placasMax: 12 });
    expect(opcoesCarga('goblet-kettlebell', { kettlebell: { pesosKg: [16, 8, 12] } })).toMatchObject({ registro: 'kg', lista: [8, 12, 16] });
    expect(opcoesCarga('remada-suspensao', { suspensao: {} }).registro).toBe('degrau');
  });

  it('registro antigo em kg de uma máquina que agora usa outro tipo não quebra: a sugestão segue, e a tela ignora a carga de outro tipo', () => {
    const inv = PERSONAS.carla.inventario;
    const kgAntigo = { carga: { tipo: 'kg' as const, kg: 80 }, reps: 10, rir: 2 };
    const historico = [{ id: 's1', diaId: 'inferior', semana: 1, inicio: '2026-10-20T10:00:00.000Z', fim: '2026-10-20T11:00:00.000Z', exercicios: [{ exId: 'leg-press', series: [kgAntigo, kgAntigo] }] }];
    const s = sugestaoDoExercicio(historico, { exId: 'leg-press', reps: [8, 15], rir: [1, 2] }, inv);
    expect(s.acao).toBeDefined();
    expect(s.proxima?.tipo === 'anilha').toBe(false);
    expect(opcoesCarga('leg-press', inv).registro).toBe('anilha');
  });
});

describe('histórico e progressão', () => {
  const ex = 'remada-unilateral-halter';
  const alvo = { exId: ex, reps: [8, 12] as [number, number], rir: [1, 2] as [number, number] };

  it('sem histórico, pede o primeiro registro', () => {
    expect(sugestaoDoExercicio([], alvo, ana.inventario).acao).toBe('manter');
    expect(ultimaSerie([], ex)).toBeUndefined();
  });

  it('topo da faixa em 2 sessões seguidas sobe para a próxima carga que o inventário tem', () => {
    const topo = [kg(10, 12), kg(10, 12)];
    const h = [sessao('a', '2026-11-02T10:00:00Z', [{ exId: ex, series: topo }]), sessao('b', '2026-11-04T10:00:00Z', [{ exId: ex, series: topo }])];
    expect(sugestaoDoExercicio(h, alvo, ana.inventario)).toMatchObject({ acao: 'subir', proxima: { tipo: 'kg', kg: 11 } });
    expect(historicoDoExercicio(h, ex)).toHaveLength(2);
    expect(ultimaSerie(h, ex)).toEqual(kg(10, 12));
  });

  it('a alternativa feita no lugar não entra no histórico do exercício original', () => {
    const h = [sessao('a', '2026-11-02T10:00:00Z', [{ exId: 'flexao', noLugarDe: 'supino-reto-halteres', series: [kg(0, 10)] }])];
    expect(historicoDoExercicio(h, 'supino-reto-halteres')).toHaveLength(0);
    expect(historicoDoExercicio(h, 'flexao')).toHaveLength(1);
  });
});

describe('aquecimento e resumo', () => {
  it('lembra de aquecer só no primeiro multiarticular de cada região', () => {
    const dia = prog.dias[0]!;
    const marcados = dia.exercicios.map((_, i) => precisaAquecer(dia, i));
    expect(marcados[0]).toBe(true); // agachamento (inferior)
    expect(marcados.filter(Boolean)).toHaveLength(2); // + o primeiro multiarticular de cima
    expect(dia.exercicios.filter((x, i) => marcados[i] && x.tipo !== 'composto')).toHaveLength(0);
    expect(precisaAquecer(dia, 99)).toBe(false);
  });

  it('resume séries feitas, efetivas e duração', () => {
    const s = sessao('a', '2026-11-02T10:00:00Z', [{ exId: 'x', series: [kg(10, 10, 2), kg(10, 10, 5)] }, { exId: 'y', series: [] }], '2026-11-02T10:47:00Z');
    expect(resumoSessao(s)).toEqual({ exercicios: 1, series: 2, efetivas: 1, minutos: 47 });
    expect(resumoSessao({ ...s, fim: undefined }).minutos).toBeUndefined();
  });
});

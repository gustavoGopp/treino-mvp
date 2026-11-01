import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { gerarPrograma, prescricaoDaSemana, type Perfil, type Programa } from '../../src/domain/gerador';
import { diaNoLocal, possivelNoLocal } from '../../src/domain/locais';
import type { SerieRegistrada } from '../../src/domain/progressao';
import { historicoDoExercicio, sugestaoDoExercicio } from '../../src/domain/sessao';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { diaDoTreino, iniciarSessao, opcoesDaCarga, registrarSerie, terminarSessao } from '../../src/features/treino/acoes';
import { VERSAO_ESTADO, type Estado } from '../../src/storage/esquema';
import { bruno, brunoAcademiaDoBairro, carla, LOCAIS_DO_BRUNO, PERSONAS } from '../personas';

// local.treino-do-dia, progressao.troca-equivalente e selecao.preferencia nas trocas (R1b; pesquisa-v2/09).

const ok = (perfil: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(perfil, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
const programaBruno = ok(bruno.perfil, bruno.inventario);
const superiorA = (semana = 3) => prescricaoDaSemana(programaBruno, semana).find((d) => d.nome === 'Superior A')!;

describe('local.treino-do-dia: o Bruno faz o Superior A na academia do bairro', () => {
  const { dia, trocas } = diaNoLocal(superiorA(), bruno.perfil, brunoAcademiaDoBairro);

  it('cada exercício de polia troca pelo equivalente possível ali, com o motivo verdadeiro', () => {
    expect(trocas.map((t) => [t.vaga, t.entrou])).toEqual([
      ['puxada-unilateral', 'barra-fixa'],
      ['triceps-frances', 'triceps-frances-halter'],
      ['crucifixo-polia', 'crucifixo-halteres'],
      ['face-pull', 'crucifixo-inverso'],
    ]);
    expect(trocas[0]!.motivo).toBe('aqui não tem polia alta: puxada unilateral ajoelhado na polia alta → barra fixa');
    expect(trocas.every((t) => t.regraId === 'local.treino-do-dia')).toBe(true);
  });

  it('a prescrição da vaga fica (séries, RIR, descanso); as repetições são as do exercício que entrou', () => {
    for (const t of trocas) {
      const vaga = superiorA().exercicios.find((x) => x.exId === t.vaga)!;
      const entrou = dia.exercicios.find((x) => x.exId === t.entrou)!;
      expect({ series: entrou.series, rir: entrou.rir, descanso: entrou.descansoSeg }).toEqual({ series: vaga.series, rir: vaga.rir, descanso: vaga.descansoSeg });
      expect(entrou.reps).toEqual(POR_ID[t.entrou!]!.faixaReps);
      expect(entrou.noLugarDe).toBe(t.vaga);
      expect(entrou.porque[0]!.regraId).toBe('local.treino-do-dia');
    }
  });

  it('o que é possível ali não muda; as alternativas são só as do local', () => {
    const supino = dia.exercicios.find((x) => x.exId === 'supino-reto')!;
    expect(supino.noLugarDe).toBeUndefined();
    for (const x of dia.exercicios) for (const a of x.alternativas) expect(possivelNoLocal(a, brunoAcademiaDoBairro), `${x.exId} → ${a}`).toBe(true);
  });

  it('no próprio local do programa, nada muda', () => {
    for (const d of prescricaoDaSemana(programaBruno, 3)) {
      const r = diaNoLocal(d, bruno.perfil, bruno.inventario);
      expect(r.trocas).toEqual([]);
      expect(r.dia.exercicios).toEqual(d.exercicios);
    }
  });

  it('snapshot: os 4 dias do Bruno na academia do bairro (revisado)', () => {
    const resumo = prescricaoDaSemana(programaBruno, 3).map((d) => {
      const r = diaNoLocal(d, bruno.perfil, brunoAcademiaDoBairro);
      return { dia: `${d.nome}: ${r.dia.exercicios.map((x) => `${x.exId} ${x.series}×${x.reps.join('–')}`).join(' | ')}`, trocas: r.trocas.map((t) => t.motivo), avisos: r.avisos.map((a) => a.texto) };
    });
    expect(resumo).toMatchSnapshot();
  });
});

describe('sem equivalente no local (selecao.dia-sem-principal)', () => {
  it('primeiro outro movimento do mesmo músculo; se nada, a vaga sai com o motivo; nunca um dia sem exercício principal', () => {
    const soBarra: Inventario = { barra_fixa: {} };
    for (const d of prescricaoDaSemana(programaBruno, 3)) {
      const r = diaNoLocal(d, bruno.perfil, soBarra);
      expect(r.dia.exercicios.some((x) => x.padrao !== 'core')).toBe(true);
      for (const t of r.trocas.filter((x) => !x.entrou)) expect(r.avisos.some((a) => a.texto.includes(t.motivo))).toBe(true);
    }
  });
});

describe('segurança e preferência nas trocas', () => {
  it('dor acima de 5 no ombro: nenhum exercício que carrega o ombro entra no dia, em nenhum local', () => {
    const perfil: Perfil = { ...bruno.perfil, triagem: { respostas: { ...bruno.perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao: 'ombro', nota: 7 }] } };
    const p = ok(perfil, bruno.inventario);
    for (const inv of [bruno.inventario, brunoAcademiaDoBairro, carla.inventario])
      for (const d of p.dias) {
        const r = diaNoLocal(d, perfil, inv);
        for (const x of r.dia.exercicios) expect(POR_ID[x.exId]!.articulacoes, x.exId).not.toContain('ombro');
      }
  });

  it('Carla num local sem rack: sem preferência entra o hack (ordem alfabética); com "prefiro o leg press", o leg press', () => {
    const semRack: Inventario = { ...carla.inventario };
    delete semRack.rack_de_agachamento;
    delete semRack.smith;
    const p = ok(carla.perfil, carla.inventario);
    const inferior = p.dias.find((d) => d.exercicios.some((x) => x.exId === 'agachamento-barra'))!;
    const sem = diaNoLocal(inferior, carla.perfil, semRack);
    expect(sem.trocas.find((t) => t.vaga === 'agachamento-barra')).toMatchObject({ entrou: 'hack', motivo: expect.stringContaining('aqui não tem rack de agachamento') });
    const com = diaNoLocal(inferior, { ...carla.perfil, preferidos: { agachar: 'leg-press' } }, semRack);
    const x = com.dia.exercicios.find((y) => y.noLugarDe === 'agachamento-barra')!;
    expect(x.exId).toBe('leg-press');
    expect(x.porque.some((q) => q.regraId === 'selecao.preferencia')).toBe(true);
  });

  it('a dor acima de 5 no joelho tira o leg press preferido também na troca', () => {
    const perfil: Perfil = {
      ...carla.perfil,
      preferidos: { agachar: 'leg-press' },
      triagem: { respostas: { ...carla.perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao: 'joelho', nota: 7 }] },
    };
    const p = ok(carla.perfil, carla.inventario);
    for (const d of p.dias) expect(diaNoLocal(d, perfil, carla.inventario).dia.exercicios.some((x) => x.exId === 'leg-press')).toBe(false);
  });
});

// ——— Persona com 2 locais: o mesmo dia nos dois, e a progressão continua ———

const T = (dia: number) => `2026-11-${String(dia).padStart(2, '0')}T10:00:00.000Z`;
function estadoBruno(): Estado {
  return {
    versao: VERSAO_ESTADO,
    triagem: bruno.perfil.triagem,
    nivel: { respostas: { tempoContinuo: '6-24m', semanasParado: 0, tecnica: 'sim' }, escolhido: bruno.perfil.nivel },
    rotina: { diasSemana: bruno.perfil.diasSemana, minutosSessao: bruno.perfil.minutosSessao, prioridades: bruno.perfil.prioridades },
    restricoes: { evitarExercicios: [], evitarEquipamentos: bruno.perfil.evitarEquipamentos },
    locais: LOCAIS_DO_BRUNO,
    programa: { programa: ok({ ...bruno.perfil, semanasParado: 0 }, bruno.inventario), geradoEm: T(1), localId: 'local-1' },
    historico: [],
  };
}
/** Faz o treino inteiro: em cada exercício, as séries pedidas, com a carga dada por exercício. */
function treinar(e: Estado, agora: string, fim: string, localId: string, carga: (exId: string) => SerieRegistrada): Estado {
  let s = iniciarSessao(e, agora, 'superior-a', localId);
  s.sessaoAtual!.exercicios.forEach((x, i) => {
    const d = diaDoTreino(s, s.sessaoAtual!)!.dia.exercicios.find((y) => y.exId === x.exId)!;
    for (let n = 0; n < d.series; n++) s = registrarSerie(s, i, carga(x.exId));
  });
  return terminarSessao(s, fim);
}
const serieDe = (exId: string): SerieRegistrada =>
  POR_ID[exId]!.carga === 'polia' ? { carga: { tipo: 'placa', placa: 5 }, reps: 12, rir: 2 } : POR_ID[exId]!.carga === 'peso-corpo' ? { carga: { tipo: 'degrau', degrau: 0 }, reps: 8, rir: 2 } : { carga: { tipo: 'kg', kg: 10 }, reps: 10, rir: 2 };

describe('progressao.troca-equivalente: o Bruno no prédio e na academia do bairro', () => {
  const e0 = estadoBruno();
  const diaId = e0.programa!.programa.dias[0]!.id;
  it('o dia é o Superior A', () => expect(diaId).toBe('superior-a'));

  const e1 = treinar(e0, T(2), T(2).replace('10:00', '11:00'), 'local-1', serieDe);
  const e2 = treinar(e1, T(9), T(9).replace('10:00', '11:00'), 'local-2', serieDe);

  it('o mesmo dia nos dois locais; na academia do bairro, as trocas ficam registradas com o exercício do programa', () => {
    expect(e2.historico.map((s) => [s.diaId, s.localId])).toEqual([
      ['superior-a', 'local-1'],
      ['superior-a', 'local-2'],
    ]);
    expect(e2.historico[1]!.exercicios.filter((x) => x.noLugarDe).map((x) => [x.noLugarDe, x.exId])).toEqual([
      ['puxada-unilateral', 'barra-fixa'],
      ['triceps-frances', 'triceps-frances-halter'],
      ['crucifixo-polia', 'crucifixo-halteres'],
      ['face-pull', 'crucifixo-inverso'],
    ]);
    expect(e2.ultimoLocalId).toBe('local-2');
  });

  it('o supino com halteres, repetido, continua a progressão normal na academia do bairro (kg é kg)', () => {
    const x = diaDoTreino(e1, { diaId, semana: 2, localId: 'local-2' })!.dia.exercicios.find((y) => y.exId === 'supino-reto')!;
    const s = sugestaoDoExercicio(e1.historico, x, brunoAcademiaDoBairro, opcoesDaCarga(e1, { localId: 'local-2', semana: 2 }));
    expect(s.acao).not.toBe('calibrar');
    expect(historicoDoExercicio(e2.historico, 'supino-reto')).toHaveLength(2);
  });

  it('a barra fixa, 1ª vez, começa pela calibração; o exercício da polia, de volta ao prédio, segue de onde parou', () => {
    const barra = diaDoTreino(e1, { diaId, semana: 2, localId: 'local-2' })!.dia.exercicios.find((y) => y.exId === 'barra-fixa')!;
    expect(sugestaoDoExercicio(e1.historico, barra, brunoAcademiaDoBairro, opcoesDaCarga(e1, { localId: 'local-2', semana: 2 })).acao).toBe('calibrar');
    const puxada = e2.programa!.programa.dias[0]!.exercicios.find((y) => y.exId === 'puxada-unilateral')!;
    const s = sugestaoDoExercicio(e2.historico, puxada, bruno.inventario, opcoesDaCarga(e2, { localId: 'local-1', semana: 3 }));
    expect(s.acao).not.toBe('calibrar');
    expect(s.proxima ?? { tipo: 'placa', placa: 5 }).toMatchObject({ tipo: 'placa' });
  });

  it('máquina de outro local: a puxada feita no prédio, numa polia de outra academia, recomeça pela calibração', () => {
    const e = { ...e2, locais: [...e2.locais!, { id: 'local-3', nome: 'Academia', inventario: carla.inventario }] };
    const puxada = e.programa!.programa.dias[0]!.exercicios.find((y) => y.exId === 'puxada-unilateral')!;
    const s = sugestaoDoExercicio(e.historico, puxada, carla.inventario, opcoesDaCarga(e, { localId: 'local-3', semana: 3 }));
    expect(s.acao).toBe('calibrar');
    expect(s.motivo).toMatch(/1ª vez nesta máquina neste local/);
    expect(s.motivo).not.toMatch(/placa \d/);
    // O histórico do prédio continua inteiro.
    expect(historicoDoExercicio(e.historico, 'puxada-unilateral')).toHaveLength(1);
    expect(historicoDoExercicio(e.historico, 'puxada-unilateral', { localId: 'local-1', localPadrao: 'local-1' })).toHaveLength(1);
  });

  it('a 1ª vez de um exercício equivalente diz qual a pessoa já faz, sem mostrar a carga dele', () => {
    const barra = diaDoTreino(e1, { diaId, semana: 2, localId: 'local-2' })!.dia.exercicios.find((y) => y.exId === 'barra-fixa')!;
    const s = sugestaoDoExercicio(e1.historico, barra, brunoAcademiaDoBairro, opcoesDaCarga(e1, { localId: 'local-2', semana: 2 }));
    expect(s.motivo).toMatch(/^Você já faz puxada unilateral/);
    expect(s.motivo).not.toMatch(/placa|kg/);
  });
});

// ——— Propriedades ———

describe('propriedades (R1b)', () => {
  const inventarios: [string, Inventario][] = [
    ...Object.entries(PERSONAS).map(([n, p]) => [n, p.inventario] as [string, Inventario]),
    ['academia do bairro', brunoAcademiaDoBairro],
    ['nada', {}],
  ];

  it('nenhum exercício do dia exige equipamento que o local não tem; todo dia tem exercício principal quando algum é possível', () => {
    for (const p of Object.values(PERSONAS)) {
      const prog = ok(p.perfil, p.inventario);
      for (const [nome, inv] of inventarios)
        for (const semana of [1, 3])
          for (const d of prescricaoDaSemana(prog, semana)) {
            const r = diaNoLocal(d, p.perfil, inv);
            // O que a pessoa pediu para evitar também não conta como equipamento do local.
            const semEvitar = Object.fromEntries(Object.entries(inv).filter(([k]) => !(p.perfil.evitarEquipamentos as string[]).includes(k))) as Inventario;
            for (const x of r.dia.exercicios) expect(possivelNoLocal(x.exId, semEvitar), `${p.nome} em ${nome}: ${x.exId}`).toBe(true);
            expect(r.dia.exercicios.some((x) => x.padrao !== 'core'), `${p.nome} em ${nome}: ${d.nome}`).toBe(true);
            expect(new Set(r.dia.exercicios.map((x) => x.exId)).size).toBe(r.dia.exercicios.length);
          }
    }
  });

  it('trocar de local nunca apaga nem mistura o histórico: cada exercício guarda exatamente as séries dele', () => {
    const locais = ['local-1', 'local-2'];
    let e = estadoBruno();
    const feitas = new Map<string, number>();
    for (let k = 0; k < 8; k++) {
      const local = locais[(k * 7) % 3 === 0 ? 1 : 0]!; // sequência irregular, determinística
      const antes = e.historico.length;
      const copia = structuredClone(e.historico);
      e = treinar(e, T(2 + k), T(2 + k).replace('10:00', '11:00'), local, (exId) => ({ ...serieDe(exId), reps: 8 + k }));
      expect(e.historico).toHaveLength(antes + 1);
      for (const x of e.historico.at(-1)!.exercicios) feitas.set(x.exId, (feitas.get(x.exId) ?? 0) + x.series.length);
      // Nenhuma sessão anterior mudou.
      expect(e.historico.slice(0, antes)).toEqual(copia);
    }
    for (const [exId, n] of feitas) {
      const h = historicoDoExercicio(e.historico, exId);
      expect(h.flatMap((s) => s.series)).toHaveLength(n);
      // Nas máquinas, o histórico por local é a parte de cada local, e as partes somam o todo.
      const porLocal = locais.map((l) => historicoDoExercicio(e.historico, exId, { localId: l, localPadrao: 'local-1' }).flatMap((s) => s.series).length);
      const maquina = ['polia', 'maquina', 'anilha', 'assistida'].includes(POR_ID[exId]!.carga);
      if (maquina) expect(porLocal.reduce((a, b) => a + b, 0)).toBe(n);
      else expect(porLocal).toEqual([n, n]);
    }
  });
});

import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { gerarPrograma, prescricaoDaSemana, volumePorMusculo, type Perfil, type Programa } from '../../src/domain/gerador';
import { REGRAS, VOLUME, NIVEIS } from '../../src/domain/regras';
import { capacidades, type Inventario } from '../../src/domain/taxonomia/equipamentos';
import { ana, bruno, carla, diego, PERSONAS } from '../personas';

const ok = (perfil: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(perfil, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
const resumo = (p: Programa) => ({
  divisao: p.divisao,
  dias: p.dias.map((d) => `${d.nome} (${d.minutosEstimados} min): ${d.exercicios.map((x) => `${x.exId} ${x.series}×${x.reps.join('–')}${x.supersetCom ? ' [bi-set]' : ''}`).join(' | ')}`),
  volume: p.volumeSemanal,
  avisos: p.avisos.map((a) => a.regraId),
  fases: p.fases.map((f) => `${f.semanas}: ${f.fatorSeries}`),
});
const ids = (p: Programa) => p.dias.flatMap((d) => d.exercicios.map((x) => x.exId));

describe('cenários (snapshots revisados)', () => {
  it.each(Object.entries(PERSONAS))('%s', (_n, p) => {
    expect(resumo(ok(p.perfil, p.inventario))).toMatchSnapshot();
  });
});

describe('cenário 1: academia de prédio com polia dupla (Bruno, fictício)', () => {
  const p = ok(bruno.perfil, bruno.inventario);
  it('Torso/Membros 4 dias, sem barra longa', () => {
    expect(p.divisao).toBe('Torso/Membros (2x)');
    expect(ids(p).some((id) => POR_ID[id]!.carga === 'barra')).toBe(false);
  });
  it('reproduz os exercícios do programa de referência', () => {
    const referencia = [
      'supino-inclinado', 'barra-fixa', 'remada-baixa', 'crucifixo-polia', 'elevacao-lateral', 'face-pull', 'abdominal-polia',
      'goblet', 'stiff', 'afundo', 'panturrilha', 'rosca-polia', 'triceps-corda',
      'supino-reto', 'remada-apoiada', 'desenvolvimento', 'puxada-unilateral', 'flexao', 'elevacao-halteres', 'elevacao-joelhos',
      'bulgaro', 'flexao-bola', 'panturrilha-bilateral-step', 'rosca-inclinada', 'triceps-frances',
    ];
    const coincidencia = referencia.filter((id) => ids(p).includes(id)).length / referencia.length;
    expect(coincidencia).toBeGreaterThanOrEqual(0.8);
  });
  it('superiores com 10–16 séries; pernas no mínimo eficaz', () => {
    for (const m of ['peito', 'costas', 'ombro_lateral', 'biceps', 'triceps'] as const) {
      expect(p.volumeSemanal[m]).toBeGreaterThanOrEqual(10);
      expect(p.volumeSemanal[m]).toBeLessThanOrEqual(16);
    }
    for (const m of ['quadriceps', 'posteriores', 'panturrilha'] as const) expect(p.volumeSemanal[m]).toBeGreaterThanOrEqual(4);
  });
  it('readaptação de 3 semanas após a pausa; semana 1 com ~metade das séries', () => {
    expect(p.fases.map((f) => f.regraId)).toEqual(['readaptacao.semana1', 'readaptacao.semana2', 'readaptacao.semana3']);
    const s1 = prescricaoDaSemana(p, 1);
    const sup = s1[0]!.exercicios.find((x) => x.exId === 'supino-inclinado')!;
    expect(sup.series).toBe(2);
    expect(sup.rir).toEqual([3, 4]);
    expect(prescricaoDaSemana(p, 3)).toBe(p.dias);
  });
});

describe('cenário 2: só halteres e banco (Ana)', () => {
  const p = ok(ana.perfil, ana.inventario);
  it('corpo todo 3x, sem polia, com aviso de puxada vertical e de carga limitada', () => {
    expect(p.divisao).toBe('Corpo todo A/B/C');
    expect(ids(p).some((id) => POR_ID[id]!.carga === 'polia')).toBe(false);
    expect(p.avisos.map((a) => a.regraId)).toEqual(expect.arrayContaining(['equipamento.sem-puxada-vertical', 'equipamento.escada-carga-leve']));
  });
  it('glúteos recebem volume (agachamento, búlgaro e stiff) e há fase de aprendizado', () => {
    expect(p.volumeSemanal.gluteos).toBeGreaterThanOrEqual(VOLUME.minimo.iniciante);
    expect(p.fases[0]!.regraId).toBe('iniciante.fase-aprendizado');
  });
});

describe('cenário 3: casa com elásticos e barra fixa (Diego)', () => {
  const p = ok(diego.perfil, diego.inventario);
  it('usa barra fixa, elásticos e peso do corpo; avisa sobre pernas', () => {
    expect(ids(p)).toContain('barra-fixa');
    expect(ids(p).every((id) => ['elastico', 'peso-corpo', 'halter'].includes(POR_ID[id]!.carga))).toBe(true);
    expect(p.avisos.map((a) => a.regraId)).toContain('equipamento.escada-carga-leve');
  });
});

describe('cenário 4: academia completa, avançado, 5 dias (Carla)', () => {
  const p = ok(carla.perfil, carla.inventario);
  it('usa máquinas e barra; prioritários entre 12 e 20 séries', () => {
    expect(ids(p)).toEqual(expect.arrayContaining(['agachamento-barra', 'cadeira-flexora']));
    for (const m of ['peito', 'costas', 'ombro_lateral'] as const) {
      expect(p.volumeSemanal[m]).toBeGreaterThanOrEqual(12);
      expect(p.volumeSemanal[m]).toBeLessThanOrEqual(20);
    }
  });
});

describe('triagem e dor no gerador', () => {
  it('qualquer "sim" bloqueia até confirmar a liberação', () => {
    const triagem = { ...bruno.perfil.triagem, respostas: { ...bruno.perfil.triagem.respostas, peito: true } };
    expect(gerarPrograma({ ...bruno.perfil, triagem }, bruno.inventario).status).toBe('bloqueado');
    expect(gerarPrograma({ ...bruno.perfil, triagem: { ...triagem, liberacaoConfirmada: true } }, bruno.inventario).status).toBe('ok');
  });
  it('"sim" só osteoarticular, com região marcada, exclui exercícios da região', () => {
    const triagem = { respostas: { ...bruno.perfil.triagem.respostas, osteoarticular: true }, regioes: ['joelho' as const] };
    const p = ok({ ...bruno.perfil, triagem }, bruno.inventario);
    expect(p.regioesExcluidas).toEqual(['joelho']);
    expect(ids(p).some((id) => POR_ID[id]!.articulacoes.includes('joelho'))).toBe(false);
  });
  it('dor 3–5 desfavorece exercícios da articulação; pausa de 2 semanas pede RIR +1 na 1ª sessão', () => {
    const p = ok({ ...bruno.perfil, dores: [{ articulacao: 'lombar', intensidade: 4 }], semanasParado: 2 }, bruno.inventario);
    expect(ids(p)).not.toContain('remada-baixa');
    expect(p.fases.map((f) => f.regraId)).toEqual(['readaptacao.gatilho']);
  });
  it('intermediário sem pausa não tem fase especial', () => {
    expect(ok({ ...bruno.perfil, semanasParado: 0 }, bruno.inventario).fases).toEqual([]);
  });
});

// Propriedades: varre combinações de perfil × inventário.
const variacoes: { perfil: Perfil; inv: Inventario; nome: string }[] = [];
for (const [nome, base] of Object.entries(PERSONAS))
  for (const dias of [2, 3, 4, 5] as const)
    for (const minutosSessao of [35, 55, 80])
      for (const nivel of NIVEIS)
        for (const dores of [[], [{ articulacao: 'ombro' as const, intensidade: 7 }], [{ articulacao: 'joelho' as const, intensidade: 6 }]])
          variacoes.push({ nome: `${nome}/${dias}d/${minutosSessao}min/${nivel}/${dores[0]?.articulacao ?? 'sem dor'}`, inv: base.inventario, perfil: { ...base.perfil, diasSemana: dias, minutosSessao, nivel, dores } });

describe(`propriedades (${variacoes.length} combinações)`, () => {
  it('mesma entrada → mesma saída', () => {
    for (const v of variacoes.slice(0, 40)) expect(JSON.stringify(gerarPrograma(v.perfil, v.inv)), v.nome).toBe(JSON.stringify(gerarPrograma(v.perfil, v.inv)));
  });
  it('nada exige equipamento fora do inventário, nem carrega articulação com dor > 5, nem passa da complexidade do nível', () => {
    for (const v of variacoes) {
      const p = ok(v.perfil, v.inv);
      const caps = capacidades(Object.fromEntries(Object.entries(v.inv).filter(([k]) => !v.perfil.evitarEquipamentos.includes(k as never))));
      const doidas = v.perfil.dores.filter((d) => d.intensidade > 5).map((d) => d.articulacao);
      for (const id of ids(p)) {
        const e = POR_ID[id]!;
        expect(e.requer.some((g) => g.every((c) => caps.has(c))), `${v.nome}: ${id}`).toBe(true);
        expect(e.articulacoes.some((a) => doidas.includes(a)), `${v.nome}: ${id}`).toBe(false);
        expect(e.complexidade <= (v.perfil.nivel === 'iniciante' ? 2 : 3), `${v.nome}: ${id}`).toBe(true);
      }
    }
  });
  it('tempo dentro do orçamento, ou aviso explícito de tempo', () => {
    for (const v of variacoes) {
      const p = ok(v.perfil, v.inv);
      for (const d of p.dias)
        if (d.minutosEstimados > v.perfil.minutosSessao)
          expect(p.avisos.some((a) => a.regraId === 'tempo.corte' && a.texto.startsWith(d.nome)), `${v.nome} ${d.nome}`).toBe(true);
    }
  });
  it('volume: nenhum músculo acima do teto; séries por exercício entre 1 e 4; volume coerente com as séries', () => {
    for (const v of variacoes) {
      const p = ok(v.perfil, v.inv);
      for (const [m, s] of Object.entries(p.volumeSemanal)) expect(s, `${v.nome} ${m}`).toBeLessThanOrEqual(VOLUME.teto);
      for (const x of p.dias.flatMap((d) => d.exercicios)) {
        expect(x.series).toBeGreaterThanOrEqual(1);
        expect(x.series).toBeLessThanOrEqual(VOLUME.seriesPorExercicio.max);
      }
      expect(p.volumeSemanal).toEqual(volumePorMusculo(p.dias.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID[x.exId]!, series: x.series })))));
    }
  });
  it('todo "porquê" e todo aviso apontam para uma regra de regras.md; alternativas existem e são do mesmo padrão', () => {
    for (const v of variacoes.slice(0, 60)) {
      const p = ok(v.perfil, v.inv);
      const porques = [...p.porque, ...p.avisos, ...p.fases.map((f) => ({ regraId: f.regraId })), ...p.dias.flatMap((d) => d.exercicios.flatMap((x) => x.porque))];
      for (const q of porques) expect(REGRAS, q.regraId).toHaveProperty([q.regraId]);
      for (const x of p.dias.flatMap((d) => d.exercicios)) for (const a of x.alternativas) expect(POR_ID[a]!.padrao).toBe(x.padrao);
    }
  });
});

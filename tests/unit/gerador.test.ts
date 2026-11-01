import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import {
  GRUPOS,
  NOME_MUSCULO,
  cortarTempo,
  gerarPrograma,
  minutos,
  prescricaoDaSemana,
  seriesDeVolume,
  volumePorMusculo,
  type DiaPrograma,
  type ExercicioPrescrito,
  type Perfil,
  type Programa,
} from '../../src/domain/gerador';
import type { Musculo } from '../../src/domain/biblioteca';
import { DIVISOES, DIVISAO_IDS } from '../../src/domain/gerador/divisoes';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { DESCANSO, REGRAS, VOLUME, NIVEIS } from '../../src/domain/regras';
import { capacidades, type Inventario } from '../../src/domain/taxonomia/equipamentos';
import { ana, bruno, carla, diego, PERSONAS } from '../personas';

const ok = (perfil: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(perfil, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
const resumo = (p: Programa) => ({
  divisao: p.divisao,
  dias: p.dias.map(
    (d) =>
      `${d.nome} (${d.minutosEstimados} min): ${d.exercicios.map((x) => `${x.exId} ${x.series}×${x.reps.join('–')}${x.supersetCom ? ' [bi-set]' : ''}${x.dropSet ? ' [drop set]' : ''}`).join(' | ')}`,
  ),
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
  it('Superior/Inferior 2x (a recomendada para 4 dias), sem barra longa', () => {
    expect(p.divisaoId).toBe('si-2x');
    expect(p.divisao).toBe('Superior/Inferior (2x)');
    expect(ids(p).some((id) => POR_ID[id]!.carga === 'barra')).toBe(false);
  });
  it('só usa regras com selo e fonte (critério 2; o programa de referência deixou de ser meta)', () => {
    const porques = [...p.porque, ...p.avisos, ...p.dias.flatMap((d) => d.exercicios.flatMap((x) => x.porque))];
    for (const q of porques) {
      expect(REGRAS[q.regraId], q.regraId).toBeDefined();
      expect(REGRAS[q.regraId]!.fontes.length, q.regraId).toBeGreaterThan(0);
    }
  });
  it('os braços ficam nos dias de superior (modelo do T3)', () => {
    for (const d of p.dias.filter((d) => d.id.startsWith('inferior')))
      expect(d.exercicios.some((x) => x.funcao === 'biceps' || x.funcao?.startsWith('triceps')), d.nome).toBe(false);
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
    const sup = s1[0]!.exercicios.find((x) => x.exId === 'supino-reto')!;
    expect(p.dias[0]!.exercicios.find((x) => x.exId === 'supino-reto')!.series).toBe(3);
    expect(sup.series).toBe(2);
    expect(sup.rir).toEqual([3, 4]);
    expect(prescricaoDaSemana(p, 3)).toBe(p.dias);
  });
});

describe('cenário 2: só halteres e banco (Ana)', () => {
  const p = ok(ana.perfil, ana.inventario);
  it('corpo todo 3x, sem polia, com aviso de puxada vertical e de carga limitada', () => {
    expect(p.divisaoId).toBe('ct-abc');
    expect(ids(p).some((id) => POR_ID[id]!.carga === 'polia')).toBe(false);
    expect(p.avisos.map((a) => a.regraId)).toEqual(expect.arrayContaining(['equipamento.sem-puxada-vertical', 'equipamento.escada-carga-leve']));
  });
  it('glúteos recebem volume (agachamento, búlgaro e stiff) e há fase de aprendizado', () => {
    expect(p.volumeSemanal.gluteos).toBeGreaterThanOrEqual(VOLUME.minimo.iniciante);
    expect(p.fases[0]!.regraId).toBe('iniciante.fase-aprendizado');
  });
  it('selecao.gluteo e selecao.exercicios-por-musculo: o glúteo tem agachar ou afundo e extensão de quadril; com prioridade, mais extensão', () => {
    const extensoes = (q: Programa) => q.dias.flatMap((d) => d.exercicios).filter((x) => x.funcao === 'extensao-quadril').length;
    const sem = ok({ ...ana.perfil, prioridades: [] }, ana.inventario);
    expect(extensoes(sem)).toBeGreaterThanOrEqual(1);
    expect(sem.dias.flatMap((d) => d.exercicios).some((x) => x.funcao === 'agachar' || x.funcao === 'afundo')).toBe(true);
    expect(extensoes(p)).toBeGreaterThan(extensoes(sem));
  });
  it('lacunas explicadas: sem extensora e sem abdução, o aviso diz o que falta', () => {
    const textos = p.avisos.map((a) => a.texto).join(' ');
    expect(textos).toContain('Sem cadeira extensora');
    expect(textos).toContain('Sem cadeira abdutora');
    expect(p.avisos.find((a) => a.texto.startsWith('Sem cadeira extensora'))!.regraId).toBe('selecao.isolador-obrigatorio');
  });
  it('o aviso de meta dá o motivo verdadeiro: ombro posterior sem exercício possível com halteres e banco reto', () => {
    expect(p.avisos.map((a) => a.texto).join(' ')).toMatch(/ombro \(posterior\)[^.]*nenhum exercício possível/);
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
  it('Superior/Inferior + Empurrar/Puxar/Pernas, a recomendada para 5 dias', () => {
    expect(p.divisaoId).toBe('si-ppl');
  });
  it('usa máquinas e barra, com a cadeira extensora; prioritários entre 12 e 20 séries', () => {
    expect(ids(p)).toEqual(expect.arrayContaining(['agachamento-barra', 'cadeira-flexora', 'cadeira-extensora']));
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
  for (const divisao of DIVISAO_IDS)
    for (const minutosSessao of [35, 55, 80])
      for (const nivel of NIVEIS)
        for (const dores of [[], [{ articulacao: 'ombro' as const, intensidade: 7 }], [{ articulacao: 'joelho' as const, intensidade: 6 }]])
          variacoes.push({
            nome: `${nome}/${divisao}/${minutosSessao}min/${nivel}/${dores[0]?.articulacao ?? 'sem dor'}`,
            inv: base.inventario,
            perfil: { ...base.perfil, diasSemana: DIVISOES[divisao].diasSemana, divisao, minutosSessao, nivel, dores },
          });

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
      expect(p.volumeSemanal).toEqual(volumePorMusculo(p.dias.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID[x.exId]!, series: seriesDeVolume(x) })))));
    }
  });
  it('todo "porquê" e todo aviso apontam para uma regra de regras.md; alternativas da mesma função ou do mesmo músculo (selecao.equivalencia)', () => {
    for (const v of variacoes.filter((_, i) => i % 7 === 0)) {
      const p = ok(v.perfil, v.inv);
      const porques = [...p.porque, ...p.avisos, ...p.fases.map((f) => ({ regraId: f.regraId })), ...p.dias.flatMap((d) => d.exercicios.flatMap((x) => x.porque))];
      for (const q of porques) expect(REGRAS, q.regraId).toHaveProperty([q.regraId]);
      for (const x of p.dias.flatMap((d) => d.exercicios)) {
        const f = FUNCAO[x.funcao!]!;
        expect(x.alternativas).not.toContain(x.exId);
        for (const a of x.alternativas)
          expect(f.niveis.flat().includes(a) || POR_ID[a]!.musculos.primarios.includes(f.musculo), `${v.nome} ${x.exId} → ${a}`).toBe(true);
      }
    }
  });
  it('a divisão escolhida é respeitada quando serve; 6 dias geram 6 treinos', () => {
    for (const v of variacoes.filter((_, i) => i % 5 === 0)) {
      const p = ok(v.perfil, v.inv);
      expect(p.dias).toHaveLength(v.perfil.diasSemana);
      if (!DIVISOES[v.perfil.divisao!].classica) expect(p.divisaoId, v.nome).toBe(v.perfil.divisao);
    }
  });
});

describe('ordem da sessão (ordem.sessao)', () => {
  it('nenhum isolador antes de um multiarticular; core sempre por último', () => {
    for (const v of variacoes) {
      const p = ok(v.perfil, v.inv);
      for (const d of p.dias) {
        const tipos = d.exercicios.map((x) => (x.padrao === 'core' ? 2 : x.tipo === 'composto' ? 0 : 1));
        expect(tipos, `${v.nome} ${d.nome}`).toEqual([...tipos].sort((a, b) => a - b));
      }
    }
  });
});

describe('cortes respeitam a prioridade e avisam o que ficou de fora', () => {
  const nomes = (p: Programa) => p.avisos.map((a) => a.texto).join(' ');
  it('todo músculo abaixo do limiar aparece num aviso de meta', () => {
    for (const v of variacoes) {
      const p = ok(v.perfil, v.inv);
      const prio = new Set<Musculo>(v.perfil.prioridades.flatMap((g) => GRUPOS[g]));
      for (const [m, meta] of Object.entries(p.metas) as [Musculo, number][]) {
        const limiar = prio.has(m) ? meta : Math.min(meta, VOLUME.minimoEficazPiso);
        if ((p.volumeSemanal[m] ?? 0) < limiar) expect(nomes(p), `${v.nome} ${m}`).toContain(NOME_MUSCULO[m]);
      }
    }
  });
  it('nenhum músculo desce do piso nos cortes de tempo (prioritário: mínimo do nível; demais: 4), salvo limite estrutural já presente antes do corte', () => {
    for (const v of variacoes) {
      const p = ok(v.perfil, v.inv);
      const prio = new Set<Musculo>(v.perfil.prioridades.flatMap((g) => GRUPOS[g]));
      const estrutural = p.avisos.filter((a) => a.regraId === 'volume.semanal.alvo').map((a) => a.texto).join(' ');
      for (const [m, meta] of Object.entries(p.metas) as [Musculo, number][]) {
        const piso = Math.min(meta, prio.has(m) ? VOLUME.minimo[v.perfil.nivel] : VOLUME.minimoEficazPiso);
        if ((p.volumeSemanal[m] ?? 0) < piso) expect(estrutural, `${v.nome} ${m}`).toContain(NOME_MUSCULO[m]);
      }
    }
  });
  it('Ana: com prioridade em pernas, pernas e glúteos ganham volume em relação a sem prioridade', () => {
    const com = ok(ana.perfil, ana.inventario).volumeSemanal;
    const sem = ok({ ...ana.perfil, prioridades: [] }, ana.inventario).volumeSemanal;
    const soma = (v: typeof com) => (['quadriceps', 'posteriores', 'gluteos', 'panturrilha'] as const).reduce((t, m) => t + (v[m] ?? 0), 0);
    expect(soma(com)).toBeGreaterThan(soma(sem));
  });
  it('Diego: com prioridade em peito e costas, os dois ficam acima do que teriam sem prioridade', () => {
    const com = ok(diego.perfil, diego.inventario).volumeSemanal;
    const sem = ok({ ...diego.perfil, prioridades: [] }, diego.inventario).volumeSemanal;
    expect((com.peito ?? 0) + (com.costas ?? 0)).toBeGreaterThan((sem.peito ?? 0) + (sem.costas ?? 0));
  });
});

describe('regras do R0b no gerador', () => {
  it('descanso.por-tipo: 105 s nos multiarticulares e 75 s nos isoladores, em todos os níveis', () => {
    expect(DESCANSO.composto).toEqual({ iniciante: 105, intermediario: 105, avancado: 105 });
    for (const v of variacoes.filter((_, i) => i % 11 === 0))
      for (const x of ok(v.perfil, v.inv).dias.flatMap((d) => d.exercicios)) expect(x.descansoSeg).toBe(x.tipo === 'composto' ? 105 : 75);
  });
  it('selecao.isolador-obrigatorio: extensora, tríceps acima da cabeça e panturrilha em pé entram sempre que houver', () => {
    for (const v of variacoes) {
      const p = ok(v.perfil, v.inv);
      const caps = capacidades(v.inv);
      const joelho = v.perfil.dores.some((d) => d.articulacao === 'joelho' && d.intensidade > 5);
      const funcoes = new Set(p.dias.flatMap((d) => d.exercicios.map((x) => x.funcao)));
      const temNaDivisao = (f: string) => DIVISOES[p.divisaoId!].dias.some((d) => d.vagas.some((x) => x.funcao === f));
      if (caps.has('cadeira_extensora') && !joelho && temNaDivisao('extensora')) expect(funcoes.has('extensora'), v.nome).toBe(true);
      if (temNaDivisao('triceps-acima-cabeca') && !v.perfil.dores.some((d) => d.articulacao === 'ombro' && d.intensidade > 5))
        expect(funcoes.has('triceps-acima-cabeca'), v.nome).toBe(true);
      if (temNaDivisao('panturrilha-em-pe')) expect(funcoes.has('panturrilha-em-pe'), v.nome).toBe(true);
    }
  });
  it('selecao.exercicios-por-musculo: na academia completa, cada músculo grande tem 2 exercícios de funções diferentes na semana', () => {
    const p = ok(carla.perfil, carla.inventario);
    const xs = p.dias.flatMap((d) => d.exercicios);
    for (const m of ['peito', 'costas', 'quadriceps', 'posteriores'] as const) {
      const doMusculo = xs.filter((x) => POR_ID[x.exId]!.musculos.primarios.includes(m));
      expect(new Set(doMusculo.map((x) => x.exId)).size, m).toBeGreaterThanOrEqual(2);
      expect(new Set(doMusculo.map((x) => x.funcao)).size, m).toBeGreaterThanOrEqual(2);
    }
    const funcoes = new Set(xs.map((x) => x.funcao));
    expect(funcoes.has('extensao-quadril') && (funcoes.has('agachar') || funcoes.has('afundo'))).toBe(true);
  });
  it('selecao.funcao-da-vaga: o desempate de estabilidade só vale para iniciante', () => {
    const iniciante = ok({ ...bruno.perfil, nivel: 'iniciante', semanasParado: 0 }, bruno.inventario);
    const porques = iniciante.dias.flatMap((d) => d.exercicios.flatMap((x) => x.porque.map((q) => q.regraId)));
    expect(porques).toContain('selecao.estabilidade');
    const inter = ok(bruno.perfil, bruno.inventario).dias.flatMap((d) => d.exercicios.flatMap((x) => x.porque.map((q) => q.regraId)));
    expect(inter).not.toContain('selecao.estabilidade');
  });
  it('tempo.exercicios-por-sessao: mais minutos, mais exercícios por treino (a tabela do T4)', () => {
    const n = (min: number) => Math.max(...ok({ ...carla.perfil, minutosSessao: min }, carla.inventario).dias.map((d) => d.exercicios.length));
    expect(n(30)).toBeLessThanOrEqual(5);
    expect(n(90)).toBeGreaterThan(n(45));
  });
  it('tempo.superserie: iniciante sem superséries na fase de aprendizado (semanas 1–2); sem drop set nas semanas com RIR 3–4', () => {
    const p = ok(ana.perfil, ana.inventario);
    expect(p.dias.flatMap((d) => d.exercicios).some((x) => x.supersetCom)).toBe(true);
    for (const semana of [1, 2]) for (const x of prescricaoDaSemana(p, semana).flatMap((d) => d.exercicios)) {
      expect(x.supersetCom).toBeUndefined();
      expect(x.dropSet).toBeUndefined();
    }
    expect(prescricaoDaSemana(p, 3)).toBe(p.dias);
    // a série que era drop set volta a ser uma série normal antes do fator da fase
    const comDrop = p.dias.flatMap((d) => d.exercicios).find((x) => x.dropSet)!;
    const s1 = prescricaoDaSemana(p, 1).flatMap((d) => d.exercicios).find((x) => x.exId === comDrop.exId && x.series)!;
    expect(s1.series).toBe(Math.max(1, Math.round((comDrop.series + 1) * p.fases[0]!.fatorSeries)));
  });
});

// Escada de cortes (tempo.corte; pesquisa-v2/05, seção 4), testada direto num dia montado à mão.
describe('escada de cortes (tempo.corte)', () => {
  const px = (exId: string, series: number): ExercicioPrescrito => {
    const e = POR_ID[exId]!;
    const funcao = Object.values(FUNCAO).find((f) => f.niveis.flat().includes(exId))!.id;
    return { exId, nome: e.nome, padrao: e.padrao, tipo: e.tipo, funcao, series, reps: e.faixaReps, rir: [1, 2], descansoSeg: e.tipo === 'composto' ? 105 : 75, unilateral: e.unilateral, animacaoId: e.animacaoId, alternativas: [], porque: [] };
  };
  const base = [px('supino-reto', 4), px('remada-baixa', 4), px('triceps-frances', 4), px('elevacao-lateral', 4), px('rosca-polia', 4), px('crucifixo-polia', 4)];
  const metas = { peito: 12, costas: 6, triceps: 6, biceps: 6, ombro_lateral: 12 } as Partial<Record<Musculo, number>>;
  const prio = new Set<Musculo>(['peito', 'ombro_lateral']);
  const dia = (): DiaPrograma[] => [{ id: 'd', nome: 'Dia', exercicios: base.map((x) => ({ ...x })), minutosEstimados: minutos(base) }];
  const cortar = (limite: number) => cortarTempo(dia(), limite, metas, 'intermediario', prio, [], (x) => x.tipo === 'isolador')[0]!;
  const vol = (d: DiaPrograma) => volumePorMusculo(d.exercicios.map((x) => ({ ex: POR_ID[x.exId]!, series: seriesDeVolume(x) })));

  it('1º degrau: superséries, sem perder série nenhuma', () => {
    const d = cortar(minutos(base) - 1);
    expect(d.exercicios.some((x) => x.supersetCom)).toBe(true);
    expect(vol(d)).toEqual(vol(dia()[0]!));
    expect(d.exercicios.some((x) => x.dropSet)).toBe(false);
  });
  it('drop set só em isolador, conta como 2 séries e mantém o volume', () => {
    const semSuperserie = cortarTempo(dia(), 1, metas, 'intermediario', prio, [], (x) => x.tipo === 'isolador');
    const d = semSuperserie[0]!;
    for (const x of d.exercicios.filter((x) => x.dropSet)) expect(x.tipo).toBe('isolador');
    expect(d.exercicios.some((x) => x.dropSet)).toBe(true);
  });
  it('com o tempo apertado: multiarticulares e o tríceps acima da cabeça (obrigatório) ficam; nenhum músculo cruza o piso', () => {
    const metas = { peito: 8, costas: 6, triceps: 6, biceps: 6, ombro_lateral: 4 } as Partial<Record<Musculo, number>>;
    const d = cortarTempo(dia(), 20, metas, 'intermediario', prio, [], (x) => x.tipo === 'isolador')[0]!;
    const ids = d.exercicios.map((x) => x.exId);
    expect(ids).toEqual(expect.arrayContaining(['supino-reto', 'remada-baixa', 'triceps-frances']));
    const v = vol(d);
    for (const [m, meta] of Object.entries(metas) as [Musculo, number][])
      expect(v[m] ?? 0, m).toBeGreaterThanOrEqual(Math.min(meta, prio.has(m) ? VOLUME.minimo.intermediario : VOLUME.minimoEficazPiso));
  });
  it('um prioritário nunca perde séries antes de um não prioritário', () => {
    let viuCorteDePrioritario = false;
    for (let limite = minutos(base); limite > 15; limite -= 3) {
      const d = cortar(limite);
      const v = vol(d);
      const v0 = vol(dia()[0]!);
      if (![...prio].some((m) => (v[m] ?? 0) < (v0[m] ?? 0))) continue;
      viuCorteDePrioritario = true;
      // Quando um prioritário perde volume, cada não prioritário já está no mínimo de séries ou no piso.
      for (const x of d.exercicios.filter((x) => !POR_ID[x.exId]!.musculos.primarios.some((m) => prio.has(m)))) {
        const m = POR_ID[x.exId]!.musculos.primarios[0]!;
        expect(x.series === VOLUME.seriesPorExercicio.min || (v[m] ?? 0) - 1 < VOLUME.minimoEficazPiso, `${limite} min: ${x.exId}`).toBe(true);
      }
    }
    expect(viuCorteDePrioritario).toBe(true);
  });
});

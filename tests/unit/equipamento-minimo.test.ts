import { describe, expect, it } from 'vitest';
import { POR_ID, type Musculo, type Padrao } from '../../src/domain/biblioteca';
import { SEM_EXERCICIO, musculosDoAviso, ehAvisoDeMeta, contextoDeSelecao, gerarPrograma, MUSCULOS_COM_META, type Perfil, type Programa } from '../../src/domain/gerador';
import { DIVISOES, type DivisaoId } from '../../src/domain/gerador/divisoes';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { NIVEIS, VOLUME, type Nivel } from '../../src/domain/regras';
import { capacidades, ITEM_IDS, type Inventario, type ItemId } from '../../src/domain/taxonomia/equipamentos';
import { respostasNenhuma } from '../../src/domain/triagem';
import { elisa, fabio } from '../personas';

// Propriedades do cenário de equipamento mínimo (docs/revisoes/equipamento-minimo.md): o inventário vazio ("Corpo livre")
// e cada um dos 46 itens sozinho, com atributos típicos de quem tem só aquele item.
const SOZINHO: Partial<Record<ItemId, object>> = {
  halteres_fixos: { minKg: 5, maxKg: 5, passoKg: 5 },
  anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 1, qtd: 4 }, { kg: 2, qtd: 4 }] },
  elasticos: { intensidades: 1 },
  kettlebell: { pesosKg: [12] },
  polia_simples: { altura: 'alta' },
  multifuncional: { puxador: true, remadaBaixa: true },
  banco_regulavel: { declina: false },
  voador: { invertido: false },
  triceps_maquina: { acimaDaCabeca: false },
};
const INVENTARIOS: [string, Inventario][] = [['vazio', {}], ...ITEM_IDS.map((k) => [k, { [k]: { ...(SOZINHO[k] ?? {}) } } as Inventario] as [string, Inventario])];
const DIVISOES_TESTADAS: DivisaoId[] = ['ct-abc', 'si-2x', 'si-ppl'];
const SUPERIORES: Padrao[] = ['empurrar-h', 'empurrar-v', 'puxar-h', 'puxar-v', 'isolador-peito', 'isolador-ombro-lateral', 'isolador-ombro-posterior', 'isolador-biceps', 'isolador-triceps'];

const perfil = (nivel: Nivel, divisao: DivisaoId, minutosSessao = 45): Perfil => ({
  nivel,
  semanasParado: 0,
  diasSemana: DIVISOES[divisao].diasSemana,
  divisao,
  minutosSessao,
  prioridades: [],
  evitarExercicios: [],
  evitarEquipamentos: [],
  triagem: { respostas: respostasNenhuma() },
});
const casos = INVENTARIOS.flatMap(([nome, inv]) => NIVEIS.flatMap((nivel) => DIVISOES_TESTADAS.map((d) => ({ nome: `${nome}/${nivel}/${d}`, inv, pf: perfil(nivel, d) }))));
const gerar = (pf: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(pf, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};

describe(`equipamento mínimo: o vazio e cada item sozinho (${casos.length} programas)`, () => {
  it('nenhum dia vazio, nenhum dia só com abdominal, e nenhum exercício pede o que o inventário não tem', () => {
    for (const { nome, inv, pf } of casos) {
      const p = gerar(pf, inv);
      const caps = capacidades(inv);
      for (const d of p.dias) {
        expect(d.exercicios.length, `${nome}: ${d.nome}`).toBeGreaterThan(0);
        expect(d.exercicios.some((x) => x.padrao !== 'core'), `${nome}: ${d.nome}`).toBe(true);
        for (const x of d.exercicios) expect(POR_ID[x.exId]!.requer.some((g) => g.every((c) => caps.has(c))), `${nome}: ${x.exId}`).toBe(true);
      }
    }
  });

  it('todo músculo com meta que tem exercício possível recebe série na semana', () => {
    for (const { nome, inv, pf } of casos) {
      const p = gerar(pf, inv);
      const ctx = contextoDeSelecao(pf, inv);
      for (const m of MUSCULOS_COM_META)
        if (ctx.possiveis.some((e) => e.musculos.primarios.includes(m))) expect(p.volumeSemanal[m] ?? 0, `${nome}: ${m}`).toBeGreaterThan(0);
    }
  });

  it('toda vaga sem opção tem aviso com o motivo verdadeiro, ou o músculo dela está coberto, ou não tem meta', () => {
    for (const { nome, inv, pf } of casos) {
      const p = gerar(pf, inv);
      const ctx = contextoDeSelecao(pf, inv);
      for (const dia of DIVISOES[p.divisaoId!].dias)
        for (const vaga of dia.vagas) {
          if (vaga.prioridade || ctx.resolver(vaga)) continue;
          const f = FUNCAO[vaga.funcao]!;
          const m = f.musculo;
          const semMeta = !(MUSCULOS_COM_META as readonly Musculo[]).includes(m);
          const coberto = (p.volumeSemanal[m] ?? 0) >= Math.min(p.metas[m] ?? 0, VOLUME.minimoEficazPiso);
          const avisoDaVaga =
            (f.lacuna && p.avisos.some((a) => a.texto.startsWith(`Sem ${f.lacuna!.falta}:`))) ||
            (f.musculo === 'costas' && p.avisos.some((a) => a.regraId === 'equipamento.sem-ancoragem' || a.regraId === 'equipamento.sem-puxada-vertical'));
          const avisoDoMusculo = p.avisos.some((a) => ehAvisoDeMeta(a) && musculosDoAviso(a).includes(m));
          expect(semMeta || coberto || avisoDaVaga || avisoDoMusculo, `${nome}: ${vaga.funcao}`).toBe(true);
          // O motivo é verdadeiro: "sem exercício" só para o músculo que não tem mesmo.
          for (const a of p.avisos.filter((x) => x.regraId === 'equipamento.sem-ancoragem' || x.texto.startsWith(SEM_EXERCICIO)))
            for (const mm of musculosDoAviso(a)) expect(ctx.possiveis.some((e) => e.musculos.primarios.includes(mm)), `${nome}: ${a.texto}`).toBe(false);
        }
    }
  });

  it('sem nada para puxar: o aviso diz o que falta, sem sugerir compra, e nenhum aviso sugere comprar algo', () => {
    for (const { nome, inv, pf } of casos) {
      const p = gerar(pf, inv);
      for (const a of p.avisos) expect(a.texto, nome).not.toMatch(/\b(compr|adquir)/i);
    }
    const p = gerar(perfil('iniciante', 'ct-abc'), {});
    expect(p.avisos.some((a) => a.regraId === 'equipamento.sem-ancoragem' && /costas, ombro lateral, ombro de trás e bíceps ficam sem exercício/.test(a.texto))).toBe(true);
  });

  it('um dia de superior ou de puxar sem tronco nem braço diz a verdade: "exercícios de outros músculos"', () => {
    for (const { nome, inv, pf } of casos) {
      const p = gerar(pf, inv);
      for (const d of p.dias)
        if (/Superior|Puxar/.test(d.nome) && !d.exercicios.some((x) => SUPERIORES.includes(x.padrao))) {
          expect(p.avisos.some((a) => a.texto.startsWith(`${d.nome}:`) && a.texto.includes('outros músculos')), `${nome}: ${d.nome}`).toBe(true);
          expect(p.avisos.some((a) => a.texto.startsWith(`${d.nome}:`) && a.texto.includes('para os músculos do dia (')), `${nome}: ${d.nome}`).toBe(false);
        }
    }
  });

  it('sem nada para puxar e sem divisão escolhida, a recomendada é a de corpo todo (divisao.sem-puxar)', () => {
    for (const dias of [4, 5] as const) {
      const p = gerar({ ...perfil('intermediario', 'ct-abc'), diasSemana: dias, divisao: undefined }, {});
      expect(p.divisaoId!.startsWith('ct-'), String(dias)).toBe(true);
      expect(p.porque.some((q) => q.regraId === 'divisao.sem-puxar')).toBe(true);
    }
    // Com puxar possível, nada muda: a recomendada de sempre.
    expect(gerar({ ...perfil('intermediario', 'ct-abc'), diasSemana: 4, divisao: undefined }, { elasticos: { intensidades: 3 } }).divisaoId).toBe('si-2x');
  });
});

describe('personas do equipamento mínimo', () => {
  it('Elisa (Corpo livre): posteriores, quadríceps, glúteos e peito com série; costas com o aviso de que falta algo para puxar', () => {
    const p = gerar(elisa.perfil, elisa.inventario);
    for (const m of ['posteriores', 'quadriceps', 'gluteos', 'peito'] as Musculo[]) expect(p.volumeSemanal[m] ?? 0, m).toBeGreaterThan(0);
    expect(p.volumeSemanal.costas ?? 0).toBe(0);
    expect(p.avisos.some((a) => a.regraId === 'equipamento.sem-ancoragem')).toBe(true);
  });
  it('Fábio (só barra fixa): costas prioritária com a barra, e posteriores pelo peso do corpo', () => {
    const p = gerar(fabio.perfil, fabio.inventario);
    expect(p.volumeSemanal.costas ?? 0).toBeGreaterThan(0);
    expect(p.volumeSemanal.posteriores ?? 0).toBeGreaterThan(0);
    expect(p.avisos.some((a) => a.regraId === 'equipamento.sem-ancoragem')).toBe(false);
  });
});

describe('decisões da sessão de fechamento (04/11/2026)', () => {
  const comPunho = (nota: number): Perfil => {
    const pf = perfil('intermediario', 'ct-abc');
    return { ...pf, triagem: { respostas: { ...pf.triagem.respostas, osteoarticular: true }, dores: [{ articulacao: 'punho', nota }] } };
  };
  it('tempo.sobra: sem nada e 90 min, o app diz quanto o treino dura e que dá para escolher menos, sem sugerir compra', () => {
    const p = gerar(perfil('intermediario', 'ct-abc', 90), {});
    const a = p.avisos.find((x) => x.regraId === 'tempo.sobra');
    expect(a?.texto).toMatch(/^Com o seu equipamento, o treino dura cerca de \d+ min\. Mais tempo não acrescenta exercícios/);
    expect(a!.texto).not.toMatch(/\b(compr|adquir)/i);
    // Com tempo bem usado, nada.
    expect(gerar(perfil('intermediario', 'ct-abc', 30), {}).avisos.some((x) => x.regraId === 'tempo.sobra')).toBe(false);
  });
  it('tecnica.flexao.punho: dor leve no punho (3 a 5) sugere as mãos fechadas na flexão; dor 0 a 2, não', () => {
    const flexao = (p: Programa) => p.dias.flatMap((d) => d.exercicios).find((x) => x.exId === 'flexao');
    expect(flexao(gerar(comPunho(4), {}))?.porque.some((q) => q.regraId === 'tecnica.flexao.punho')).toBe(true);
    expect(flexao(gerar(comPunho(2), {}))?.porque.some((q) => q.regraId === 'tecnica.flexao.punho')).toBe(false);
  });
  it('sem nada para puxar, os músculos sem exercício viram um aviso só, com a lista (e o ombro lateral)', () => {
    const p = gerar(perfil('iniciante', 'ct-abc'), {});
    const sem = p.avisos.filter((a) => a.regraId === 'equipamento.sem-ancoragem');
    expect(sem).toHaveLength(1);
    expect(musculosDoAviso(sem[0]!).sort()).toEqual(['biceps', 'costas', 'ombro_lateral', 'ombro_posterior']);
    for (const m of ['costas', 'biceps', 'ombro_lateral', 'ombro_posterior'] as Musculo[])
      expect(p.avisos.filter((a) => a.texto.startsWith('Abaixo da meta') && musculosDoAviso(a).includes(m))).toHaveLength(0);
  });
});

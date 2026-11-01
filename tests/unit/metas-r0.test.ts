import { describe, expect, it } from 'vitest';
import { GRUPOS, NOME_MUSCULO } from '../../src/domain/gerador';
import { VOLUME } from '../../src/domain/regras';
import type { Musculo } from '../../src/domain/biblioteca';
import { carla } from '../personas';
import { ITEM_IDS } from '../../src/domain/taxonomia/equipamentos';
import { medir } from './metas-r0';

// Metas do R0 (docs/PLANO-MVP.md, critério 4), medidas com o inventário da Carla, que desde o R0c tem os 46
// equipamentos do catálogo (decisão de 01/11/2026), numa varredura de 3 níveis × 12 divisões × 5 durações ×
// 3 escolhas de prioridade. No R0b faltavam 6 exercícios, as paralelas e 12 pares de alternativas; o R0c fechou.
const m = medir(carla.perfil, carla.inventario);

const META_EXERCICIOS = 45;
/** Sem exercício possível: a esteira fica fora do treino por decisão (T7, decisão 4). */
const SEM_EXERCICIO_DECIDIDO = ['esteira'];
/**
 * Sem 2 alternativas de outro equipamento, por decisão: a adução é complemento opcional (adutores sem meta;
 * selecao.aducao-complemento), e nenhum outro exercício do catálogo tem os adutores como músculo principal.
 * Com a máquina ocupada, ela simplesmente fica de fora naquele dia.
 */
const SEM_ALTERNATIVA_DECIDIDO = ['aducao-maquina'];

describe(`metas do R0 com o inventário da Carla (${m.programas} programas)`, () => {
  it(`exercícios distintos usados: meta ${META_EXERCICIOS} ou mais`, () => {
    expect(m.usados.length).toBeGreaterThanOrEqual(META_EXERCICIOS);
    // O leg press empata com o hack e o smith em tudo e perde no último desempate (o id): fica nas alternativas.
    expect(m.usados).toEqual(expect.arrayContaining(['cadeira-extensora', 'cadeira-flexora', 'panturrilha-leg-press']));
  });
  it('os 46 equipamentos estão marcados, e nenhum fica sem exercício possível, salvo a esteira (decidido)', () => {
    expect(Object.keys(carla.inventario)).toHaveLength(ITEM_IDS.length);
    expect([...m.semExercicio].sort()).toEqual(SEM_EXERCICIO_DECIDIDO);
  });
  it('todo exercício possível aparece como vaga ou como alternativa', () => {
    expect(m.semVagaNemAlternativa).toEqual([]);
  });
  it('todo exercício usado tem 2 ou mais alternativas de outro equipamento, salvo a adução (decidido)', () => {
    expect(m.menosDe2Alternativas).toEqual(SEM_ALTERNATIVA_DECIDIDO);
  });
  it('as paralelas, a extensora, as máquinas novas e a adução aparecem nos programas', () => {
    expect(m.usados).toEqual(expect.arrayContaining(['hack', 'supino-maquina', 'voador', 'puxada-frente', 'hip-thrust', 'abducao-maquina', 'aducao-maquina', 'panturrilha-sentada']));
    const alternativasOuVagas = new Set([...m.usados, ...m.progs.flatMap(({ programa }) => programa.dias.flatMap((d) => d.exercicios.flatMap((x) => x.alternativas)))]);
    expect(alternativasOuVagas).toContain('mergulho');
  });
  it('todo músculo abaixo da meta tem um aviso com o motivo (equipamento, minutos, divisão ou tempo)', () => {
    for (const { perfil, programa } of m.progs) {
      const prio = new Set<Musculo>(perfil.prioridades.flatMap((g) => GRUPOS[g]));
      const textos = programa.avisos.filter((a) => a.regraId === 'volume.semanal.alvo' || a.regraId === 'tempo.corte').map((a) => a.texto);
      for (const [mu, meta] of Object.entries(programa.metas) as [Musculo, number][]) {
        const limiar = prio.has(mu) ? meta : Math.min(meta, VOLUME.minimoEficazPiso);
        if ((programa.volumeSemanal[mu] ?? 0) >= limiar) continue;
        const aviso = textos.find((t) => t.includes(NOME_MUSCULO[mu]));
        expect(aviso, `${perfil.divisao}/${perfil.minutosSessao}/${perfil.nivel} ${mu}`).toBeDefined();
        expect(aviso!).toMatch(/porque|falta de tempo/);
      }
    }
  });
});

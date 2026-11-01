import { describe, expect, it } from 'vitest';
import { GRUPOS, NOME_MUSCULO } from '../../src/domain/gerador';
import { VOLUME } from '../../src/domain/regras';
import type { Musculo } from '../../src/domain/biblioteca';
import { carla } from '../personas';
import { medir } from './metas-r0';

// Metas do R0 (docs/PLANO-MVP.md, critério 4), medidas com o inventário da Carla (academia completa com os
// ids de hoje), numa varredura de 3 níveis × 12 divisões × 5 durações × 3 escolhas de prioridade.
// O que ainda falta depende dos equipamentos e exercícios novos do R0c (pesquisa-v2/08, seções 1 e 5):
// as listas "FALTA_R0C" abaixo são a conta exata de hoje, e o R0c deve zerá-las.
const m = medir(carla.perfil, carla.inventario);

const META_EXERCICIOS = 45;
const FALTA_R0C_EXERCICIOS = 6; // hoje: 39 de 60 possíveis
/** Sem exercício possível: a esteira fica fora do treino por decisão (T7, decisão 4); o mergulho do R0c dá uso às paralelas. */
const SEM_EXERCICIO_DECIDIDO = ['esteira'];
const FALTA_R0C_SEM_EXERCICIO = ['paralelas'];
/** Menos de 2 alternativas de outro equipamento: falta o par em máquina ou polia, que chega no R0c. */
const FALTA_R0C_ALTERNATIVAS = [
  'crucifixo-inverso', // voador invertido
  'desenvolvimento', // desenvolvimento na máquina
  'desenvolvimento-unilateral',
  'elevacao-halteres', // só halter e polia hoje
  'elevacao-lateral',
  'face-pull', // voador invertido
  'panturrilha', // panturrilha em pé na máquina
  'panturrilha-bilateral-step',
  'ponte-gluteo', // hip thrust, glúteo na máquina, coice na polia
  'triceps-barra-reta', // tríceps na máquina, mergulho
  'triceps-corda',
  'triceps-frances',
];
/** Possível mas nem vaga nem alternativa: o agachamento com o peso do corpo, no último nível de "agachar". */
const FALTA_R0C_SEM_VAGA = ['agachamento-peso-corpo'];

describe(`metas do R0 com o inventário da Carla (${m.programas} programas)`, () => {
  it(`exercícios distintos usados: meta ${META_EXERCICIOS}; com os exercícios de hoje faltam ${FALTA_R0C_EXERCICIOS} para o R0c`, () => {
    expect(m.usados.length).toBeGreaterThanOrEqual(META_EXERCICIOS - FALTA_R0C_EXERCICIOS);
    expect(m.usados).toEqual(expect.arrayContaining(['cadeira-extensora', 'cadeira-flexora', 'leg-press', 'panturrilha-leg-press']));
  });
  it('nenhum equipamento sem exercício possível, salvo a esteira (decidido) e as paralelas (R0c)', () => {
    expect([...m.semExercicio].sort()).toEqual([...SEM_EXERCICIO_DECIDIDO, ...FALTA_R0C_SEM_EXERCICIO].sort());
  });
  it('todo exercício possível aparece como vaga ou como alternativa, salvo a lista do R0c', () => {
    expect(m.semVagaNemAlternativa).toEqual(FALTA_R0C_SEM_VAGA);
  });
  it('todo exercício usado tem 2 ou mais alternativas de outro equipamento, salvo a lista do R0c', () => {
    expect(m.menosDe2Alternativas).toEqual([...FALTA_R0C_ALTERNATIVAS].sort());
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

import type { ProgramaParaAvaliar } from '../../src/domain/avaliador';
import type { Perfil } from '../../src/domain/gerador';
import { carla } from '../personas';

// Programas publicados em ensaios, digitados com exercícios da biblioteca para testar o avaliador (R5b). Os protocolos
// foram lidos no texto completo do PMC em 07/11/2026 (as chaves estão em docs/pesquisa/fontes.md). Quando o artigo não
// diz o equipamento, a escolha está na nota. Avaliados como a Carla (academia completa), intermediário, 60 min, sem foco
// (b-monte-e-avaliador.md, seção 2). Nada aqui é recomendação: são programas de pesquisa, feitos para comparar grupos.

export type ProgramaPublicado = { id: string; fonte: string; onde: string; notas: string[]; programa: ProgramaParaAvaliar };

const ex = (exId: string, series: number) => ({ exId, series, reps: [8, 12] as [number, number], descansoSeg: 90 });

/** Schoenfeld 2019: 7 exercícios, os mesmos nos 3 dias; 8 a 12 repetições, 90 s entre as séries (grupos de 1, 3 e 5 séries). */
function schoenfeld(series: number): ProgramaPublicado {
  const dia = (nome: string) => ({
    nome,
    exercicios: ['supino-barra', 'desenvolvimento-barra', 'puxada-frente', 'remada-baixa', 'agachamento-barra', 'leg-press', 'cadeira-extensora'].map((id) => ex(id, series)),
  });
  return {
    id: `schoenfeld2019b-${series}-series`,
    fonte: 'schoenfeld2019b',
    onde: 'PMC6303131, seção "RT Procedures"',
    notas: ['A extensora do artigo é unilateral; a biblioteca tem a cadeira extensora (bilateral).', 'O puxador "wide grip" vira a puxada pela frente.'],
    programa: { dias: [dia('Segunda'), dia('Quarta'), dia('Sexta')] },
  };
}

export const SCHOENFELD_3 = schoenfeld(3);
export const SCHOENFELD_5 = schoenfeld(5);

/** Thomas e Burns 2016, grupo de baixa frequência (tabela 3): ABC (A: peito, ombros e tríceps; B: costas e bíceps; C: pernas), 8 a 12 repetições, 1 a 2 min entre as séries (90 s). */
export const THOMAS_ABC: ProgramaPublicado = {
  id: 'thomas2016-abc',
  fonte: 'thomas2016',
  onde: 'PMC4836564, tabela 3 e "Training Protocol"',
  notas: [
    'O artigo não diz o equipamento dos supinos: halteres.',
    '"1 Arm Extensions" vira o tríceps francês com halter (unilateral, acima da cabeça); "1 Arm Bench Curls", a rosca Scott.',
    '"Lunges/Squats" vira o afundo; "Back Extension", a hiperextensão; "Crunches", o abdominal no chão.',
  ],
  programa: {
    dias: [
      { nome: 'A', exercicios: [ex('supino-inclinado', 3), ex('supino-reto', 6), ex('desenvolvimento', 3), ex('elevacao-halteres', 6), ex('triceps-corda', 6), ex('triceps-frances-halter', 3)] },
      { nome: 'B', exercicios: [ex('puxada-frente', 6), ex('remada-baixa', 3), ex('rosca-alternada', 6), ex('rosca-scott', 3), ex('abdominal-chao', 3)] },
      { nome: 'C', exercicios: [ex('hack', 3), ex('leg-press', 3), ex('afundo', 3), ex('cadeira-flexora', 6), ex('hiperextensao', 3), ex('panturrilha-em-pe-maquina', 9)] },
    ],
  },
};

/** Carneiro 2024, grupo dividido (seção 2.6): 5 dias, cada músculo 1 vez; 8 a 12 repetições, 90 s. */
export const CARNEIRO_5 = {
  id: 'carneiro2024-dividido',
  fonte: 'carneiro2024',
  onde: 'PMC11236007, seção 2.6',
  notas: [
    'O texto diz 75 séries por semana, mas as séries por exercício da própria seção somam 85: valem as da seção.',
    '"Elbow extensors" vira o tríceps na corda; "lumbar spine flexors", o abdominal na máquina; "extensors", a hiperextensão.',
  ],
  programa: {
    dias: [
      { nome: 'Segunda', exercicios: [ex('supino-barra', 10), ex('triceps-corda', 5)] },
      { nome: 'Terça', exercicios: [ex('leg-press', 5), ex('agachamento-barra', 5)] },
      { nome: 'Quarta', exercicios: [ex('remada-baixa', 10), ex('rosca-barra-w', 5)] },
      { nome: 'Quinta', exercicios: [ex('cadeira-flexora', 10), ex('panturrilha-em-pe-maquina', 10)] },
      { nome: 'Sexta', exercicios: [ex('elevacao-halteres', 5), ex('abdominal-maquina', 10), ex('hiperextensao', 10)] },
    ],
  },
} satisfies ProgramaPublicado;

export const PUBLICADOS: ProgramaPublicado[] = [SCHOENFELD_3, SCHOENFELD_5, THOMAS_ABC, CARNEIRO_5];

/** Como a frente B avaliou: o inventário da Carla, intermediário, 60 min, sem foco, sem dor. */
export const perfilDosPublicados = (dias: number): Perfil => ({
  ...carla.perfil,
  nivel: 'intermediario',
  diasSemana: dias as Perfil['diasSemana'],
  minutosSessao: 60,
  prioridades: [],
  evitarExercicios: [],
  evitarEquipamentos: [],
});
export const inventarioDosPublicados = carla.inventario;

import type { ProgramaParaAvaliar } from '../../src/domain/avaliador';

// Os 4 programas publicados que a frente B da sessão de próximos passos usou para testar o avaliador
// (docs/revisoes/proximos-passos/b-monte-e-avaliador.md, seção 2), digitados de novo no R5b (09/11/2026) a partir do texto
// completo no PMC, com exercícios da biblioteca. São protocolos de ensaios, não prescrições: servem de dado de teste.
// Quando o artigo não diz o equipamento, a escolha está anotada ao lado. As fontes estão em docs/pesquisa/fontes.md.

type Publicado = { id: string; fonte: string; onde: string; nome: string; programa: ProgramaParaAvaliar };
const dia = (id: string, nome: string, exs: [string, number][]) => ({ id, nome, exercicios: exs.map(([exId, series]) => ({ exId, series })) });

/** Schoenfeld 2019 (schoenfeld2019b; PMC6303131, "RT Procedures"): 7 exercícios, os mesmos 3 vezes por semana. */
function schoenfeld(series: number): ProgramaParaAvaliar {
  const exs: [string, number][] = [
    ['supino-barra', series], // flat barbell bench press
    ['desenvolvimento-barra', series], // barbell military press
    ['puxada-frente', series], // wide grip lateral pulldown
    ['remada-baixa', series], // seated cable row
    ['agachamento-barra', series], // barbell back squat
    ['leg-press', series], // machine leg press
    ['cadeira-extensora', series], // unilateral machine leg extension (a biblioteca não separa o unilateral)
  ];
  return { dias: ['A', 'B', 'C'].map((l) => dia(`ct-${l.toLowerCase()}`, `Corpo todo ${l}`, exs)) };
}

export const PUBLICADOS: Publicado[] = [
  { id: 'schoenfeld-3', fonte: 'schoenfeld2019b', onde: 'PMC6303131, "RT Procedures" (grupo de 3 séries)', nome: 'Corpo todo 3x, 3 séries (Schoenfeld 2019)', programa: schoenfeld(3) },
  { id: 'schoenfeld-5', fonte: 'schoenfeld2019b', onde: 'PMC6303131, "RT Procedures" (grupo de 5 séries)', nome: 'Corpo todo 3x, 5 séries (Schoenfeld 2019)', programa: schoenfeld(5) },
  {
    id: 'thomas',
    fonte: 'thomas2016',
    onde: 'PMC4836564, tabela 3 (o grupo de baixa frequência)',
    nome: 'ABC clássica (Thomas e Burns 2016)',
    programa: {
      dias: [
        dia('a', 'A (peito, ombro e tríceps)', [
          ['supino-inclinado', 3], // incline press (halteres: o artigo não diz)
          ['supino-reto', 6], // flat press
          ['desenvolvimento', 3], // shoulder press
          ['elevacao-halteres', 6], // lateral raises
          ['triceps-corda', 6], // pushdowns
          ['triceps-frances-unilateral-halter', 3], // 1 arm extensions
        ]),
        dia('b', 'B (costas e bíceps)', [
          ['puxada-frente', 6], // pulldowns
          ['remada-baixa', 3], // rows
          ['rosca-alternada', 6], // seated dumbbell curls
          ['rosca-concentrada', 3], // 1 arm bench curls
          ['abdominal-chao', 3], // crunches
        ]),
        dia('c', 'C (pernas)', [
          ['hack', 3], // hack squats
          ['leg-press', 3], // leg press
          ['afundo', 3], // lunges/squats
          ['cadeira-flexora', 6], // seated leg curl
          ['hiperextensao', 3], // back extension
          ['panturrilha-em-pe-maquina', 9], // standing calf raise
        ]),
      ],
    },
  },
  {
    id: 'carneiro',
    fonte: 'carneiro2024',
    onde: 'PMC11236007, seção 2.6 (o grupo dividido); o texto diz 75 séries por semana, mas as séries por exercício somam 85: valem as da seção 2.6',
    nome: '5 dias, 1x por músculo (Carneiro 2024)',
    programa: {
      dias: [
        dia('seg', 'Segunda', [
          ['supino-barra', 10], // bench press
          ['triceps-corda', 5], // elbow extensors (o artigo não diz qual)
        ]),
        dia('ter', 'Terça', [
          ['leg-press', 5],
          ['agachamento-barra', 5], // back squat
        ]),
        dia('qua', 'Quarta', [
          ['remada-baixa', 10], // seated row
          ['rosca-barra-w', 5], // barbell curl
        ]),
        dia('qui', 'Quinta', [
          ['mesa-flexora', 10], // hamstring curl (deitado: o artigo não diz)
          ['panturrilha-em-pe-maquina', 10], // calf standing
        ]),
        dia('sex', 'Sexta', [
          ['elevacao-halteres', 5], // lateral raises
          ['abdominal-maquina', 10], // lumbar spine flexors
          ['hiperextensao', 10], // lumbar spine extensors
        ]),
      ],
    },
  },
];

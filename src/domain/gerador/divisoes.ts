import type { Grupo } from './index';

// Divisões do treino (docs/pesquisa-v2/01-divisao-e-frequencia.md; regras divisao.*).
// Com o mesmo volume, a divisão não muda a hipertrofia (divisao.equivalencia): a pessoa escolhe entre as
// opções que cabem nos dias dela, e o app recomenda a 1ª da lista (divisao.recomendacao), sem pré-marcar.
//
// Cada dia é uma lista ordenada de vagas por função (selecao.funcao-da-vaga; funções em funcoes.json).
// A ordem é a de importância: o gerador mantém as primeiras que cabem nos minutos (tempo.exercicios-por-sessao),
// com as vagas-base e as dos grupos prioritários antes dos complementos não prioritários. As vagas que só entram
// com prioridade ficam logo depois dos multiarticulares principais, para não serem as primeiras a sair.
// Os blocos seguem a selecao.exercicios-por-musculo: músculo grande com 2 funções complementares na semana
// (costas: puxar vertical + horizontal; posteriores: flexão de joelho + dobrar o quadril; glúteos: agachar ou
// afundo + extensão de quadril), músculo pequeno com 1, ou 2 se for prioridade. A panturrilha sentada e a adução
// (R0c) são complementos que só entram com pernas ou glúteos como prioridade, e por último (selecao.aducao-complemento).

export type Vaga = {
  funcao: string;
  /** Complemento: sai antes das vagas-base quando os minutos não comportam todas (a menos que seja prioridade). */
  complemento?: boolean;
  /** Só entra se algum destes grupos for prioridade da pessoa. */
  prioridade?: Grupo[];
};
export type Dia = { id: string; nome: string; vagas: Vaga[] };

export const DIVISAO_IDS = [
  'ct-ab',
  'ct-abc',
  'si-ct',
  'si-2x',
  'ct-4x',
  'si-ppl',
  'ct-5x',
  'ppl-2x',
  'si-3x',
  'classica-3',
  'classica-4',
  'classica-5',
] as const;
export type DivisaoId = (typeof DIVISAO_IDS)[number];
export type DiasSemana = 2 | 3 | 4 | 5 | 6;

export type Divisao = {
  id: DivisaoId;
  nome: string;
  diasSemana: DiasSemana;
  /** Vezes por semana que cada músculo treina, em texto (ex.: "2", "~2"). */
  frequencia: string;
  /** O que cada dia treina, em uma frase. */
  descricao: string;
  /** Divisão clássica: 1x por músculo, só com meta ≤ 10 (divisao.classica). */
  classica?: boolean;
  dias: Dia[];
};

const v = (funcao: string, extra: Omit<Vaga, 'funcao'> = {}): Vaga => ({ funcao, ...extra });
const c = (funcao: string, prioridade?: Grupo[]): Vaga => ({ funcao, complemento: true, ...(prioridade ? { prioridade } : {}) });
const p = (funcao: string, prioridade: Grupo[]): Vaga => ({ funcao, prioridade });
const dia = (id: string, nome: string, vagas: Vaga[]): Dia => ({ id, nome, vagas });

// Blocos reaproveitados. Superior e inferior seguem o exemplo do T3 (04-exercicios-por-musculo.md, seção 4).
const SUPERIOR_A = [
  v('empurrar-horizontal'),
  v('puxar-vertical'),
  v('puxar-horizontal'),
  v('triceps-acima-cabeca'),
  v('elevacao-lateral'),
  v('biceps'),
  c('crucifixo'),
  c('ombro-posterior'),
  c('empurrar-vertical', ['ombros']),
];
const SUPERIOR_B = [
  v('empurrar-inclinado'),
  v('puxar-horizontal'),
  v('puxar-vertical'),
  v('elevacao-lateral'),
  v('biceps'),
  c('triceps-complemento'),
  c('ombro-posterior'),
  c('crucifixo', ['peito']),
  c('empurrar-vertical', ['ombros']),
];
const INFERIOR_A = [
  v('agachar'),
  v('flexao-joelho'),
  v('dobrar-quadril'),
  p('extensao-quadril', ['gluteos']),
  v('extensora'),
  v('panturrilha-em-pe'),
  v('abdomen'),
  c('abducao', ['gluteos']),
  c('aducao', ['pernas', 'gluteos']),
];
const INFERIOR_B = [
  v('afundo'),
  v('extensao-quadril'),
  v('flexao-joelho'),
  v('extensora'),
  v('panturrilha-em-pe'),
  c('abdomen'),
  c('dobrar-quadril'),
  c('abducao', ['gluteos']),
  c('elevacao-lateral', ['ombros']),
  c('panturrilha-sentada', ['pernas']),
  c('aducao', ['pernas', 'gluteos']),
];
const CORPO_A = [
  v('agachar'),
  v('empurrar-horizontal'),
  v('puxar-vertical'),
  v('flexao-joelho'),
  p('extensao-quadril', ['gluteos']),
  v('triceps-acima-cabeca'),
  v('elevacao-lateral'),
  c('abdomen'),
  c('crucifixo'),
  c('biceps', ['bracos']),
];
const CORPO_B = [
  v('dobrar-quadril'),
  v('empurrar-inclinado'),
  v('puxar-horizontal'),
  v('extensora'),
  v('biceps'),
  v('panturrilha-em-pe'),
  c('abducao', ['gluteos']),
  c('ombro-posterior'),
  c('empurrar-vertical', ['ombros']),
  c('abdomen'),
  c('panturrilha-sentada', ['pernas']),
  c('aducao', ['pernas', 'gluteos']),
];
const CORPO_C = [
  v('afundo'),
  v('empurrar-horizontal'),
  v('puxar-vertical'),
  v('extensao-quadril'),
  p('panturrilha-em-pe', ['pernas']),
  v('elevacao-lateral'),
  v('abdomen'),
  c('triceps-complemento'),
  c('flexao-joelho'),
  c('biceps', ['bracos']),
];
// Dia de corpo todo da opção Superior/Inferior + Corpo todo: repete os grandes grupos do superior e do
// inferior com outra função (2ª vez na semana de cada músculo grande; divisao.frequencia-minima).
const CORPO_SI = [
  v('afundo'),
  v('empurrar-inclinado'),
  v('puxar-vertical'),
  v('flexao-joelho'),
  v('extensao-quadril'),
  v('elevacao-lateral'),
  p('panturrilha-em-pe', ['pernas']),
  c('triceps-complemento'),
  c('biceps'),
  c('abdomen'),
  c('panturrilha-sentada', ['pernas']),
];
// Corpo todo em 2 dias: cada dia precisa cobrir mais funções.
const CORPO2_A = [
  v('agachar'),
  v('empurrar-horizontal'),
  v('puxar-vertical'),
  v('dobrar-quadril'),
  v('triceps-acima-cabeca'),
  v('elevacao-lateral'),
  v('panturrilha-em-pe'),
  c('abdomen'),
  c('crucifixo'),
  c('biceps', ['bracos']),
  c('panturrilha-sentada', ['pernas']),
];
const CORPO2_B = [
  v('afundo'),
  v('empurrar-inclinado'),
  v('puxar-horizontal'),
  v('flexao-joelho'),
  p('extensao-quadril', ['gluteos']),
  v('extensora'),
  v('biceps'),
  v('abdomen'),
  c('ombro-posterior'),
  c('empurrar-vertical', ['ombros']),
  c('abducao', ['gluteos']),
  c('aducao', ['pernas', 'gluteos']),
];
const EMPURRAR_A = [
  v('empurrar-horizontal'),
  v('empurrar-vertical'),
  v('triceps-acima-cabeca'),
  v('elevacao-lateral'),
  c('empurrar-inclinado'),
  c('crucifixo'),
  c('triceps-complemento'),
];
const EMPURRAR_B = [
  v('empurrar-inclinado'),
  v('elevacao-lateral'),
  v('triceps-acima-cabeca'),
  v('crucifixo'),
  c('empurrar-horizontal'),
  c('triceps-complemento'),
  c('empurrar-vertical', ['ombros']),
];
const PUXAR_A = [
  v('puxar-vertical'),
  v('puxar-horizontal'),
  v('biceps'),
  v('ombro-posterior'),
  v('abdomen'),
  c('elevacao-lateral', ['ombros']),
  c('biceps', ['bracos']),
];
const PUXAR_B = [
  v('puxar-horizontal'),
  v('puxar-vertical'),
  v('ombro-posterior'),
  v('biceps'),
  c('abdomen'),
  c('elevacao-lateral', ['ombros']),
  c('biceps', ['bracos']),
];
const PERNAS_A = [
  v('agachar'),
  v('flexao-joelho'),
  v('dobrar-quadril'),
  p('extensao-quadril', ['gluteos']),
  v('extensora'),
  v('panturrilha-em-pe'),
  c('abducao', ['gluteos']),
  c('abdomen'),
  c('aducao', ['pernas', 'gluteos']),
];
const PERNAS_B = [
  v('afundo'),
  v('dobrar-quadril'),
  v('extensao-quadril'),
  v('extensora'),
  v('panturrilha-em-pe'),
  c('flexao-joelho'),
  c('abducao', ['gluteos']),
  c('panturrilha-sentada', ['pernas']),
  c('aducao', ['pernas', 'gluteos']),
];
// Clássicas: cada músculo 1x por semana (divisao.classica).
const CL_PEITO_TRICEPS = [v('empurrar-horizontal'), v('empurrar-inclinado'), v('crucifixo'), v('triceps-acima-cabeca'), v('triceps-complemento')];
const CL_COSTAS_BICEPS = [v('puxar-vertical'), v('puxar-horizontal'), v('ombro-posterior'), v('biceps'), c('abdomen')];
const CL_PERNAS = [
  v('agachar'),
  v('flexao-joelho'),
  v('afundo'),
  v('dobrar-quadril'),
  v('extensora'),
  v('extensao-quadril'),
  v('panturrilha-em-pe'),
  c('abducao', ['gluteos']),
  c('panturrilha-sentada', ['pernas']),
  c('aducao', ['pernas', 'gluteos']),
];
const CL_OMBROS_ABDOMEN = [v('empurrar-vertical'), v('elevacao-lateral'), v('ombro-posterior'), v('abdomen')];
const CL_EMPURRAR = [...CL_PEITO_TRICEPS, v('empurrar-vertical'), v('elevacao-lateral')];
const CL_PEITO = [v('empurrar-horizontal'), v('empurrar-inclinado'), v('crucifixo')];
const CL_COSTAS = [v('puxar-vertical'), v('puxar-horizontal'), v('ombro-posterior')];
const CL_OMBROS = [v('empurrar-vertical'), v('elevacao-lateral'), c('ombro-posterior')];
const CL_BRACOS_ABDOMEN = [v('biceps'), v('triceps-acima-cabeca'), v('triceps-complemento'), v('abdomen')];

const DEF: Divisao[] = [
  {
    id: 'ct-ab',
    nome: 'Corpo todo A/B',
    diasSemana: 2,
    frequencia: '2',
    descricao: 'Os dois treinos passam por todos os grandes grupos.',
    dias: [dia('corpo-a', 'Corpo todo A', CORPO2_A), dia('corpo-b', 'Corpo todo B', CORPO2_B)],
  },
  {
    id: 'ct-abc',
    nome: 'Corpo todo A/B/C',
    diasSemana: 3,
    frequencia: '3',
    descricao: 'Os três treinos passam por todos os grandes grupos, com exercícios diferentes.',
    dias: [dia('corpo-a', 'Corpo todo A', CORPO_A), dia('corpo-b', 'Corpo todo B', CORPO_B), dia('corpo-c', 'Corpo todo C', CORPO_C)],
  },
  {
    id: 'si-ct',
    nome: 'Superior/Inferior + Corpo todo',
    diasSemana: 3,
    frequencia: '~2',
    descricao: 'Um dia de tronco e braços, um de pernas e um de corpo todo.',
    dias: [dia('superior-a', 'Superior A', SUPERIOR_A), dia('inferior-a', 'Inferior A', INFERIOR_A), dia('corpo-c', 'Corpo todo', CORPO_SI)],
  },
  {
    id: 'si-2x',
    nome: 'Superior/Inferior (2x)',
    diasSemana: 4,
    frequencia: '2',
    descricao: 'Dois dias de tronco e braços e dois de pernas, alternados.',
    dias: [
      dia('superior-a', 'Superior A', SUPERIOR_A),
      dia('inferior-a', 'Inferior A', INFERIOR_A),
      dia('superior-b', 'Superior B', SUPERIOR_B),
      dia('inferior-b', 'Inferior B', INFERIOR_B),
    ],
  },
  {
    id: 'ct-4x',
    nome: 'Corpo todo 4x',
    diasSemana: 4,
    frequencia: '4',
    descricao: 'Os quatro treinos passam por todos os grandes grupos; treinos mais curtos.',
    dias: [
      dia('corpo-a', 'Corpo todo A', CORPO_A),
      dia('corpo-b', 'Corpo todo B', CORPO_B),
      dia('corpo-c', 'Corpo todo C', CORPO_C),
      dia('corpo-d', 'Corpo todo D', CORPO2_B),
    ],
  },
  {
    id: 'si-ppl',
    nome: 'Superior/Inferior + Empurrar/Puxar/Pernas',
    diasSemana: 5,
    frequencia: '~2',
    descricao: 'Superior e inferior, depois empurrar (peito, ombros, tríceps), puxar (costas, bíceps) e pernas.',
    dias: [
      dia('superior-a', 'Superior', SUPERIOR_A),
      dia('inferior-a', 'Inferior', INFERIOR_A),
      dia('empurrar-a', 'Empurrar', EMPURRAR_B),
      dia('puxar-a', 'Puxar', PUXAR_B),
      dia('pernas-a', 'Pernas', PERNAS_B),
    ],
  },
  {
    id: 'ct-5x',
    nome: 'Corpo todo 5x',
    diasSemana: 5,
    frequencia: '5',
    descricao: 'Os cinco treinos passam por todos os grandes grupos; treinos curtos.',
    dias: [
      dia('corpo-a', 'Corpo todo A', CORPO_A),
      dia('corpo-b', 'Corpo todo B', CORPO_B),
      dia('corpo-c', 'Corpo todo C', CORPO_C),
      dia('corpo-d', 'Corpo todo D', CORPO2_A),
      dia('corpo-e', 'Corpo todo E', CORPO2_B),
    ],
  },
  {
    id: 'ppl-2x',
    nome: 'Empurrar/Puxar/Pernas (2x)',
    diasSemana: 6,
    frequencia: '2',
    descricao: 'Empurrar (peito, ombros, tríceps), puxar (costas, bíceps) e pernas, duas vezes na semana.',
    dias: [
      dia('empurrar-a', 'Empurrar A', EMPURRAR_A),
      dia('puxar-a', 'Puxar A', PUXAR_A),
      dia('pernas-a', 'Pernas A', PERNAS_A),
      dia('empurrar-b', 'Empurrar B', EMPURRAR_B),
      dia('puxar-b', 'Puxar B', PUXAR_B),
      dia('pernas-b', 'Pernas B', PERNAS_B),
    ],
  },
  {
    id: 'si-3x',
    nome: 'Superior/Inferior (3x)',
    diasSemana: 6,
    frequencia: '3',
    descricao: 'Três dias de tronco e braços e três de pernas, alternados.',
    dias: [
      dia('superior-a', 'Superior A', SUPERIOR_A),
      dia('inferior-a', 'Inferior A', INFERIOR_A),
      dia('superior-b', 'Superior B', SUPERIOR_B),
      dia('inferior-b', 'Inferior B', INFERIOR_B),
      dia('superior-c', 'Superior C', SUPERIOR_A),
      dia('inferior-c', 'Inferior C', INFERIOR_B),
    ],
  },
  {
    id: 'classica-3',
    nome: 'Clássica ABC',
    diasSemana: 3,
    frequencia: '1',
    classica: true,
    descricao: 'A: peito, ombros e tríceps; B: costas e bíceps; C: pernas.',
    dias: [dia('classica-a', 'A: empurrar', CL_EMPURRAR), dia('classica-b', 'B: costas e bíceps', CL_COSTAS_BICEPS), dia('classica-c', 'C: pernas', CL_PERNAS)],
  },
  {
    id: 'classica-4',
    nome: 'Clássica ABCD',
    diasSemana: 4,
    frequencia: '1',
    classica: true,
    descricao: 'A: peito e tríceps; B: costas e bíceps; C: pernas; D: ombros e abdômen.',
    dias: [
      dia('classica-a', 'A: peito e tríceps', CL_PEITO_TRICEPS),
      dia('classica-b', 'B: costas e bíceps', CL_COSTAS_BICEPS),
      dia('classica-c', 'C: pernas', CL_PERNAS),
      dia('classica-d', 'D: ombros e abdômen', CL_OMBROS_ABDOMEN),
    ],
  },
  {
    id: 'classica-5',
    nome: 'Clássica ABCDE',
    diasSemana: 5,
    frequencia: '1',
    classica: true,
    descricao: 'A: peito; B: costas; C: pernas; D: ombros; E: braços e abdômen.',
    dias: [
      dia('classica-a', 'A: peito', CL_PEITO),
      dia('classica-b', 'B: costas', CL_COSTAS),
      dia('classica-c', 'C: pernas', CL_PERNAS),
      dia('classica-d', 'D: ombros', CL_OMBROS),
      dia('classica-e', 'E: braços e abdômen', CL_BRACOS_ABDOMEN),
    ],
  },
];

export const DIVISOES: Record<DivisaoId, Divisao> = Object.fromEntries(DEF.map((d) => [d.id, d])) as Record<DivisaoId, Divisao>;

/** Opções por número de dias, na ordem da tabela do T1: a 1ª é a recomendada (divisao.recomendacao). */
export const OPCOES_POR_DIAS: Record<DiasSemana, DivisaoId[]> = {
  2: ['ct-ab'],
  3: ['ct-abc', 'si-ct', 'classica-3'],
  4: ['si-2x', 'ct-4x', 'classica-4'],
  5: ['si-ppl', 'ct-5x', 'classica-5'],
  6: ['ppl-2x', 'si-3x'],
};

/** Teto de meta semanal para a clássica: com 1x por semana e ~10 séries por sessão (divisao.classica). */
export const META_MAX_CLASSICA = 10;

export type OpcaoDivisao = {
  id: DivisaoId;
  nome: string;
  frequencia: string;
  descricao: string;
  recomendada: boolean;
  /** Aviso que acompanha a opção (ex.: faltas na clássica). */
  aviso?: string;
};

const PORQUE_RECOMENDADA =
  'Por que é a recomendada: cada músculo treina 2 vezes ou mais por semana, os treinos têm duração parecida e, se você faltar a um, perde só parte da semana daquele músculo.';
export const AVISO_CLASSICA = 'Cada músculo treina 1 vez por semana: faltar a um dia tira a semana inteira daquele músculo.';

/**
 * Opções que cabem nos dias, na ordem do T1. A clássica só aparece quando a maior meta semanal
 * cabe em 1 sessão por músculo (divisao.classica). Nada vem pré-marcado: quem marca é a pessoa.
 */
export function opcoesDeDivisao(dias: DiasSemana, metaMax: number): OpcaoDivisao[] {
  return OPCOES_POR_DIAS[dias]
    .map((id) => DIVISOES[id])
    .filter((d) => !d.classica || metaMax <= META_MAX_CLASSICA)
    .map((d, i) => ({
      id: d.id,
      nome: d.nome,
      frequencia: d.frequencia,
      descricao: i === 0 ? `${d.descricao} ${PORQUE_RECOMENDADA}` : d.descricao,
      recomendada: i === 0,
      ...(d.classica ? { aviso: AVISO_CLASSICA } : {}),
    }));
}

/** A divisão escolhida, se ela serve para os dias e as metas; senão, a recomendada. */
export function divisaoEscolhida(dias: DiasSemana, metaMax: number, escolhida?: DivisaoId): { divisao: Divisao; escolhida: boolean } {
  const opcoes = opcoesDeDivisao(dias, metaMax);
  const ok = escolhida && opcoes.some((o) => o.id === escolhida);
  return { divisao: DIVISOES[ok ? escolhida : opcoes[0]!.id], escolhida: !!ok };
}

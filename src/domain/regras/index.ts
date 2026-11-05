import regrasJson from './regras.json';

// Regras do gerador, com selo e fontes (geradas de docs/pesquisa/regras.md).
export type Selo = 'robusta' | 'moderada' | 'um estudo' | 'consenso';
export type Regra = {
  id: string;
  regra: string;
  valores: { iniciante: string; intermediario: string; avancado: string };
  selo: Selo;
  fontes: string[];
};
export const REGRAS: Record<string, Regra> = Object.fromEntries((regrasJson as Regra[]).map((r) => [r.id, r]));

/** Referência a uma regra; falha na hora se o id não existir em regras.md. */
export function r(id: string): string {
  if (!REGRAS[id]) throw new Error(`regra inexistente: ${id}`);
  return id;
}

export type Nivel = 'iniciante' | 'intermediario' | 'avancado';
export const NIVEIS: Nivel[] = ['iniciante', 'intermediario', 'avancado'];
type PorNivel<T> = Record<Nivel, T>;

// Valores numéricos das regras. Cada bloco cita a regra de onde vem; os textos e selos estão em regras.md.
export const VOLUME = {
  regra: { minimo: r('volume.semanal.minimo'), alvo: r('volume.semanal.alvo'), maximo: r('volume.semanal.maximo') },
  minimo: { iniciante: 6, intermediario: 10, avancado: 12 } as PorNivel<number>,
  alvo: { iniciante: 8, intermediario: 12, avancado: 14 } as PorNivel<number>,
  maximo: { iniciante: 10, intermediario: 16, avancado: 20 } as PorNivel<number>,
  teto: 20, // volume.semanal.teto-padrao
  // volume.semanal.minimo-eficaz (4–6): alvo 6 para músculos não prioritários; core fica no piso de 4.
  minimoEficaz: 6,
  minimoEficazPiso: 4,
  sessaoTeto: 10, // volume.sessao.teto
  pesoIndireta: 0.5, // volume.serie-indireta.peso
  seriesPorExercicio: { min: 2, max: 4 }, // volume.series-por-exercicio
};

export const RIR = {
  // rir.alvo
  composto: { iniciante: [2, 3], intermediario: [1, 2], avancado: [1, 2] } as PorNivel<[number, number]>,
  isolador: { iniciante: [1, 2], intermediario: [0, 1], avancado: [0, 1] } as PorNivel<[number, number]>,
  serieEfetivaMax: 4, // rir.serie-efetiva
  // rir.carga-baixa: com o meio da faixa em 15 repetições ou mais, a reserva vai no máximo a 2 (fora da fase de aprendizado).
  cargaBaixa: { repsMeio: 15, rirMax: 2 },
};

export const DESCANSO = {
  // descanso.por-tipo (segundos: padrão). 90–120 s nos multiarticulares em todos os níveis (pesquisa-v2/02, ajuste 1).
  composto: { iniciante: 105, intermediario: 105, avancado: 105 } as PorNivel<number>,
  isolador: { iniciante: 75, intermediario: 75, avancado: 75 } as PorNivel<number>,
};

/** Objetivo "ficar mais forte" (objetivo.forca.*; pesquisa-v2/12, decisão do Gustavo em 04/11/2026). */
export const OBJETIVO_FORCA = {
  compostosPorTreino: 2, // objetivo.forca.faixa-compostos: os 2 primeiros multiarticulares com carga do treino
  reps: [5, 8] as [number, number], // objetivo.forca.faixa-compostos (consenso; a direção é robusta)
  descansoSeg: 150, // objetivo.forca.descanso (2 min 30 s; moderada)
  rirPesoLivre: [2, 3] as [number, number], // objetivo.forca.seguranca
};

export const TEMPO = {
  segPorRep: 3, // tempo.serie
  preparoSerie: 7.5, // tempo.serie (5–10 s)
  transicao: 90, // tempo.transicao (60–120 s)
  aquecimento: 180, // tempo.aquecimento (~2–4 min) no 1º multiarticular de cada região
  aquecimentoCurto: 90, // séries de aproximação nos multiarticulares seguintes
  colchao: 0.1, // tempo.colchao
  superserieEntre: 15, // tempo.superserie
  dropSet: 35, // tempo.drop-set: 2 quedas curtas com ~10–15 s entre elas, somadas à última série
  sobraFracao: 0.7, // tempo.sobra: abaixo de 70% dos minutos escolhidos, o aviso de que falta exercício, não tempo
};

/** tempo.exercicios-por-sessao: exercícios por treino conforme os minutos (pesquisa-v2/05, seção 1). */
export const EXERCICIOS_POR_MINUTOS: [number, number][] = [
  [30, 4],
  [45, 6],
  [60, 8],
  [75, 10],
  [90, 12],
];
/** selecao.isolador-obrigatorio: com até este número de exercícios por treino, os obrigatórios entram depois das vagas-base. */
export const OBRIGATORIO_CURTO = 4;
export function exerciciosPorSessao(minutos: number): number {
  // Proporcional entre os pontos da tabela (2 exercícios a cada 15 min), com piso de 3 e teto de 14.
  const [m0, n0] = EXERCICIOS_POR_MINUTOS[0]!;
  return Math.max(3, Math.min(14, Math.floor(n0 + ((minutos - m0) * 2) / 15 + 1e-9)));
}

export const READAPTACAO = {
  // readaptacao.gatilho
  semanasNormal: 2,
  semanasProtocolo: 3,
  semana1: { fatorSeries: 0.55, rir: [3, 4] as [number, number], reducaoCarga: [0.1, 0.2] as [number, number] },
  semana2: { fatorSeries: 0.75, rir: [2, 3] as [number, number] },
  // readaptacao.durante-uso: dias sem treinar (do fim da última sessão terminada até hoje) e a carga da volta.
  duranteUso: {
    normalAte: 13,
    rirMais1Ate: 20,
    reducaoAte56: 0.1, // 21 a 56 dias (readaptacao.semana1)
    voltaMenorAte: 56,
    reducaoAte182: 0.15, // 57 a 182 dias
    voltaMaiorAte: 182,
    reducaoRefazer: 0.2, // mais de 182 dias: propõe refazer o nível; calibração a partir da última −20%
  },
};

/** progressao.salto-grande e progressao.carga-leve (revistas na auditoria do treino, 02/11/2026). */
export const PROGRESSAO = {
  saltoGrande: 0.1, // salto relativo acima de ~10%
  janelaFalha: 6, // sessões em que uma carga que ficou pesada não volta a ser sugerida
  folgaDegrau: 2, // progressao.criterio-degrau: as séries depois da 1ª podem ficar até 2 repetições abaixo do topo
};

/** deload.semana-leve: o conteúdo da semana leve e quando sugerir. */
export const SEMANA_LEVE = {
  fatorSeries: 0.5,
  rir: [3, 4] as [number, number],
  dias: 7, // decisão do Gustavo (02/11/2026): 7 dias a partir do aceite
  estagnados: 2,
  pesadoEm: 2, // "pesado demais" em 2 dos últimos 3 treinos
  pesadoDe: 3,
  dorMin: 3,
  dorMax: 5,
  carenciaSemanas: 3, // não sugere nas 3 semanas depois de uma volta de pausa ou de uma semana leve
};

export const NIVEL_COMPLEXIDADE_MAX: PorNivel<number> = { iniciante: 2, intermediario: 3, avancado: 3 };

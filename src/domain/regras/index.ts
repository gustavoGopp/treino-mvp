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
};

export const DESCANSO = {
  // descanso.por-tipo (segundos: padrão)
  composto: { iniciante: 105, intermediario: 150, avancado: 150 } as PorNivel<number>,
  isolador: { iniciante: 75, intermediario: 75, avancado: 75 } as PorNivel<number>,
};

export const TEMPO = {
  segPorRep: 3, // tempo.serie
  preparoSerie: 7.5, // tempo.serie (5–10 s)
  transicao: 90, // tempo.transicao (60–120 s)
  aquecimento: 180, // tempo.aquecimento (~2–4 min) no 1º exercício de cada grupo grande
  colchao: 0.1, // tempo.colchao
  superserieEntre: 15, // tempo.superserie
};

export const READAPTACAO = {
  // readaptacao.gatilho
  semanasNormal: 2,
  semanasProtocolo: 3,
  semana1: { fatorSeries: 0.55, rir: [3, 4] as [number, number], reducaoCarga: [0.1, 0.2] as [number, number] },
  semana2: { fatorSeries: 0.75, rir: [2, 3] as [number, number] },
};

export const NIVEL_COMPLEXIDADE_MAX: PorNivel<number> = { iniciante: 2, intermediario: 3, avancado: 3 };

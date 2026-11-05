// Estado de render compartilhado pelo motor. No guia original eram variáveis soltas
// (PJ, VIEW, KS, MEAS, prims, IKFAIL); aqui ficam num objeto único, com a mesma semântica.
export type Prim = { l: number; d: number; s: string };
export const CTX: {
  PJ: (v: number[]) => number[];
  VIEW: string;
  KS: number;
  MEAS: number[] | null;
  prims: Prim[];
  IKFAIL: number;
  /** Acabamento A2 do boneco (estilo/corpo.ts); null = o estilo A aprovado. */
  ACABAMENTO: Record<string, unknown> | null;
} = {
  PJ: (v) => [v[2]!, -v[1]!, -v[0]!], // mesma projeção de VIEWS.lateral
  VIEW: 'lateral',
  KS: 1,
  MEAS: null,
  prims: [],
  IKFAIL: 0,
  ACABAMENTO: null,
};

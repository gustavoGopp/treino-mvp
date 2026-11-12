// Estado de render compartilhado pelo motor. No guia original eram variáveis soltas
// (PJ, VIEW, KS, MEAS, prims, IKFAIL); aqui ficam num objeto único, com a mesma semântica.
import type { Acabamento, Limites, Projecao, TextoDaPrim, Vista } from './tipos';

/**
 * Uma primitiva do desenho: camada (l), profundidade (d) e o SVG (s). Um rótulo de texto (TX, ../desenho.ts) guarda
 * também a âncora e o texto em `tx`, para a cena do Boneco poder movê-lo para fora do corpo (R4, 05/11/2026); o SVG
 * clássico só lê `s`, e por isso continua idêntico ao guia original.
 */
export type Prim = { l: number; d: number; s: string; tx?: TextoDaPrim };
export const CTX: {
  PJ: Projecao;
  VIEW: Vista;
  KS: number;
  MEAS: Limites | null;
  prims: Prim[];
  IKFAIL: number;
  /** Acabamento A2 do boneco (estilo/corpo.ts); null = o estilo A aprovado. */
  ACABAMENTO: Acabamento | null;
  /** Título do erro (o texto do guia) para a figura "erro sobre o certo"; só durante montarSvgEstilo (R4, 05/11/2026). */
  ROTULO_ERRO: string | null;
} = {
  PJ: (v) => [v[2], -v[1], -v[0]], // mesma projeção de VIEWS.lateral
  VIEW: 'lateral',
  KS: 1,
  MEAS: null,
  prims: [],
  IKFAIL: 0,
  ACABAMENTO: null,
  ROTULO_ERRO: null,
};

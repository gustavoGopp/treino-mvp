// Motor novo: o que o app carrega (palco, miniatura e folhas). Sem a conferência nem os experimentos de desenho.
export { CORPOS } from './tabelas';
export type { Corpo } from './tabelas';
export { VISTAS } from './desenho';
export type { IdVista } from './desenho';
export { duracao, instante } from './movimento';
export type { Exercicio } from './movimento';
export { enquadrar, itensDaCena, svgDaCena } from './cena';
export type { Modo, OpcoesCena } from './cena';
export { DEFS_DO_BONECO, cssDoBoneco } from './boneco';
export type { IdEstilo } from './boneco';
import { flexao } from './exercicios/flexao';
import { goblet } from './exercicios/goblet';
import { puxadaUnilateral } from './exercicios/puxada-unilateral';
import { supinoReto } from './exercicios/supino-reto';

/** Os exercícios já refeitos no motor novo, pelo id da biblioteca. */
export const EXERCICIOS = { goblet, flexao, 'supino-reto': supinoReto, 'puxada-unilateral': puxadaUnilateral };

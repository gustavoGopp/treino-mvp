// Motor novo: o que o app carrega (palco, miniatura e folhas). Sem a conferência nem os experimentos de desenho.
// o que vem calculado de antemão para cada exercício (o app carrega o de cada um junto com ele; aqui, todos)
import './dados/preparo/registro';
export { CORPOS } from './tabelas';
export type { Corpo } from './tabelas';
export { VISTAS } from './desenho';
export type { IdVista } from './desenho';
export { duracao, instante } from './movimento';
export type { Exercicio } from './movimento';
export { enquadrar, itensDaCena, svgAnimado, svgDaCena, vistasDoModoMusculos } from './cena';
export type { Modo, OpcoesCena } from './cena';
export { DEFS_DO_BONECO, cssDoBoneco } from './boneco';
export type { IdEstilo } from './boneco';
import * as REGISTRO from './exercicios/registro';
import type { Exercicio } from './movimento';

/** Os exercícios já refeitos no motor novo, pelo id da biblioteca, em ordem alfabética do id (sempre a mesma ordem). */
export const EXERCICIOS: Record<string, Exercicio> = Object.fromEntries(
  Object.values(REGISTRO)
    .map((ex): [string, Exercicio] => [ex.ficha.id, ex])
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0)),
);

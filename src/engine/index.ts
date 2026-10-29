// Ponto de entrada do motor de animação (portado de referencia/guia-execucao-fase1.html).
import { calib, prep } from './cena';
import { EX } from './exercicios';

// Mesma inicialização do guia original: prepara todos e depois calibra cabos e pilhas.
EX.forEach(prep);
EX.forEach(calib);

export { EX };
export { CTX } from './contexto';
export type { Prim } from './contexto';
export { scene, fit, poseAt, segAt } from './cena';
export { VIEWS, f1 } from './desenho';
export { skel } from './esqueleto';
export { check } from './qa';

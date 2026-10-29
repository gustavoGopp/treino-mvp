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
export { montarSvg } from './svg';

// Os 4 treinos do programa de referência, na ordem do guia original.
export const DIAS = [
  { id: 'torso-a', nome: 'Torso A', ex: EX.slice(0, 7) },
  { id: 'membros-a', nome: 'Membros A', ex: EX.slice(7, 13) },
  { id: 'torso-b', nome: 'Torso B', ex: EX.slice(13, 20) },
  { id: 'membros-b', nome: 'Membros B', ex: EX.slice(20, 26) },
];

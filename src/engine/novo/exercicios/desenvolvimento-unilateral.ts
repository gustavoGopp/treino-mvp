// Desenvolvimento unilateral com halter, em pé, no motor novo. Os números vêm da ficha
// (../dados/movimentos/desenvolvimento-unilateral.json); o movimento é o de ./empurrar-para-cima.ts: em pé, pés na
// largura do quadril, um halter na mão direita na altura do ombro, com a palma para a frente e o cotovelo um pouco à
// frente do corpo, até o braço quase estendido sobre o ombro; a mão esquerda na cintura e o tronco parado (o corpo em
// pé do desenvolvimento unilateral com kettlebell aprovado, com a pegada do desenvolvimento com halteres aprovado).
import ficha from '../dados/movimentos/desenvolvimento-unilateral.json';
import type { Exercicio } from '../movimento';
import { criarDesenvolvimento } from './empurrar-para-cima';

const D = criarDesenvolvimento(ficha, 'halter');

export const desenvolvimentoUnilateral: Exercicio = {
  ficha: D.ficha,
  vistas: ['frontal', 'lateral'], // abre de frente: de lado o halter passa na frente do rosto; a de lado fica para a lombar e os músculos
  quadro: D.quadro,
  // a frente do ombro direito (principal); a lateral do ombro e o tríceps (secundários), como a biblioteca e a ficha
  // da técnica
  papeis: { 'deltAnt:R': 'p', 'deltLat:R': 's', 'triceps:R': 's' },
  trajetorias: { halter: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

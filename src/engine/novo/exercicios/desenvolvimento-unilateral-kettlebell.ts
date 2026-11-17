// Desenvolvimento unilateral em pé com kettlebell, no motor novo. Os números vêm da ficha
// (../dados/movimentos/desenvolvimento-unilateral-kettlebell.json); o movimento é o de ./empurrar-para-cima.ts: em pé, o
// kettlebell na mão direita, apoiado no dorso do antebraço na altura do ombro (posição de rack), com o cotovelo junto
// ao corpo, até o braço estendido acima da cabeça; a mão esquerda na cintura e o tronco parado.
import ficha from '../dados/movimentos/desenvolvimento-unilateral-kettlebell.json';
import type { Exercicio } from '../movimento';
import { criarDesenvolvimento } from './empurrar-para-cima';

const D = criarDesenvolvimento(ficha, 'kettlebell');

export const desenvolvimentoUnilateralKettlebell: Exercicio = {
  ficha: D.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: D.quadro,
  // a frente do ombro direito (principal); a lateral do ombro e o tríceps (secundários), como a ficha da técnica (B.3.2)
  // e o desenho de hoje
  papeis: { 'deltAnt:R': 'p', 'deltLat:R': 's', 'triceps:R': 's' },
  trajetorias: { kettlebell: (q) => q.marcas.bola!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

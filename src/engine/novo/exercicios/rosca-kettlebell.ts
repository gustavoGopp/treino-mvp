// Rosca com kettlebell, no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-kettlebell.json); o
// movimento é o de ./dobrar-o-cotovelo.ts, com um kettlebell na mão direita: a barra da alça atravessa a palma (palma
// para a frente) e a bola fica pendurada embaixo da mão; quando o antebraço sobe, ela encosta nele e gira com ele. A
// mão esquerda fica solta ao lado do corpo (um braço por série).
import ficha from '../dados/movimentos/rosca-kettlebell.json';
import type { Exercicio } from '../movimento';
import { criarRoscaEmPe } from './dobrar-o-cotovelo';

const R = criarRoscaEmPe(ficha, 'kettlebell');

export const roscaKettlebell: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: R.quadro,
  // bíceps do braço que trabalha (principal; a biblioteca conta só ele); o antebraço dele "só ajuda" a segurar a alça
  // (correção de 04/11, SO_AJUDA das roscas)
  papeis: { 'biceps:R': 'p', 'antebraco:R': 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, bola: (q) => q.marcas.bola! },
};

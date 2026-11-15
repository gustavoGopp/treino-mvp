// Tríceps francês sentado com kettlebell, no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-frances-kettlebell.json); o movimento é o de ./triceps-frances-base.ts, como o do halter:
// sentado na ponta de um banco reto, costas retas, o kettlebell seguro pelas duas mãos nas hastes da alça ("chifres"),
// a bola para baixo, atrás da cabeça. Os braços ficam parados com os cotovelos para cima, perto da cabeça, e só os
// antebraços estendem e voltam.
import ficha from '../dados/movimentos/triceps-frances-kettlebell.json';
import type { Exercicio } from '../movimento';
import { criarTricepsFrances } from './triceps-frances-base';

const T = criarTricepsFrances(ficha, 'kettlebell');

export const tricepsFrancesKettlebell: Exercicio = {
  ficha: T.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: T.quadro,
  // a biblioteca: tríceps principal, sem secundário (B.3.2)
  papeis: { triceps: 'p' },
  trajetorias: { kettlebell: (q) => q.marcas.bola!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

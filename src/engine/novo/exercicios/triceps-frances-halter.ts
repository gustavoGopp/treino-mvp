// Tríceps francês sentado com halter, no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-frances-halter.json); o movimento é o de ./triceps-frances-base.ts: sentado na ponta de
// um banco reto, costas retas, um halter seguro pelas duas mãos sob a cabeça de cima. Os braços ficam parados com os
// cotovelos para cima, perto da cabeça, e só os antebraços descem o halter atrás da cabeça e voltam.
import ficha from '../dados/movimentos/triceps-frances-halter.json';
import type { Exercicio } from '../movimento';
import { criarTricepsFrances } from './triceps-frances-base';

const T = criarTricepsFrances(ficha, 'halter');

export const tricepsFrancesHalter: Exercicio = {
  ficha: T.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: T.quadro,
  // a biblioteca: tríceps principal, sem secundário
  papeis: { triceps: 'p' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

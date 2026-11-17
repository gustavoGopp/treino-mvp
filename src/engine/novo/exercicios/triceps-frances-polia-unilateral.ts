// Tríceps francês unilateral na polia, com estribo, no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-frances-polia-unilateral.json); o movimento é o de ./triceps-frances-base.ts (o mesmo
// braço do tríceps francês na polia): em pé, um pé à frente do outro, tronco um pouco inclinado, de costas para a
// polia, que fica embaixo. Só o braço direito (o de perto, de lado) trabalha: o braço fica parado acima da cabeça e só
// o antebraço estende; o cabo sobe da roldana, por trás das costas, até o estribo. A outra mão fica na cintura.
import ficha from '../dados/movimentos/triceps-frances-polia-unilateral.json';
import type { Exercicio } from '../movimento';
import { criarTricepsFrances } from './triceps-frances-base';

const T = criarTricepsFrances(ficha, 'estribo');

export const tricepsFrancesPoliaUnilateral: Exercicio = {
  ficha: T.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: T.quadro,
  // a biblioteca: tríceps principal, sem secundário; só o lado que trabalha
  papeis: { 'triceps:R': 'p' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

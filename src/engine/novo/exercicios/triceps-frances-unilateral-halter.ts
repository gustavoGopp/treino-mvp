// Tríceps francês unilateral com halter, no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-frances-unilateral-halter.json); o movimento é o de ./triceps-frances-base.ts (o braço do
// tríceps francês unilateral na polia aprovado): em pé, pés na largura do quadril, tronco reto. O halter na mão direita
// (o braço de perto, de lado), com a pegada neutra; o braço fica parado, apontado para o alto, e só o cotovelo dobra,
// levando o halter para trás da cabeça, e estende. A mão esquerda fica na cintura, como no unilateral na polia
// aprovado (o cartão deixa segurar o cotovelo como opcional: com a mão no cotovelo, o braço esquerdo cruzava por cima
// da cabeça e tapava o rosto).
// Em pé, e não sentado: a ficha da técnica pede só o halter (a cadeira ou o banco são opcionais), e o cartão põe o
// banco como preferência ("se preferir sentado").
import ficha from '../dados/movimentos/triceps-frances-unilateral-halter.json';
import type { Exercicio } from '../movimento';
import { criarTricepsFrances } from './triceps-frances-base';

const T = criarTricepsFrances(ficha, 'halter-unilateral');

export const tricepsFrancesUnilateralHalter: Exercicio = {
  ficha: T.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: T.quadro,
  // a biblioteca: tríceps principal, sem secundário; só o lado que trabalha
  papeis: { 'triceps:R': 'p' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

// Tríceps francês na polia com corda, no motor novo. Os números vêm da ficha (../dados/movimentos/triceps-frances.json);
// o movimento é o de ./triceps-frances-base.ts: em pé, um pé à frente do outro, tronco inclinado à frente, de costas
// para a polia na altura do ombro, a corda segura pelas duas mãos atrás da cabeça. Os braços ficam parados ao lado das
// orelhas e só os antebraços estendem; o cabo puxa a corda para trás e a pilha sobe quando as mãos vão à frente.
import ficha from '../dados/movimentos/triceps-frances.json';
import type { Exercicio } from '../movimento';
import { criarTricepsFrances } from './triceps-frances-base';

const T = criarTricepsFrances(ficha, 'corda');

export const tricepsFrances: Exercicio = {
  ficha: T.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: T.quadro,
  // a biblioteca: tríceps principal, sem secundário (revisão de anatomia de 02/11/2026)
  papeis: { triceps: 'p' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

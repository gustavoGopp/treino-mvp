// Panturrilha em pé no step (as duas pernas), no motor novo. Os números vêm da ficha
// (../dados/movimentos/panturrilha-b.json); o movimento é o de ./panturrilha-no-step.ts: a bola dos dois pés na borda
// do step, um halter na mão direita e a mão esquerda na coluna da estação.
import ficha from '../dados/movimentos/panturrilha-b.json';
import type { Exercicio } from '../movimento';
import { criarPanturrilhaNoStep } from './panturrilha-no-step';

const P = criarPanturrilhaNoStep(ficha, 'duas');

export const panturrilhaB: Exercicio = {
  ficha: P.ficha,
  vistas: ['lateral', 'posterior'],
  quadro: P.quadro,
  // as duas panturrilhas, sem secundário: é o que a biblioteca conta
  papeis: { panturrilha: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, cabeça: (q) => q.esq.cabeca.o, halter: (q) => q.marcas.halter! },
};

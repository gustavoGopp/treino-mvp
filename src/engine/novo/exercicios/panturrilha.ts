// Panturrilha unilateral no step, no motor novo. Os números vêm da ficha (../dados/movimentos/panturrilha.json); o
// movimento é o de ./panturrilha-no-step.ts: a bola do pé direito na borda do step, a perna esquerda dobrada atrás,
// sem apoiar, o halter na mão direita e a mão esquerda na coluna da estação.
import ficha from '../dados/movimentos/panturrilha.json';
import type { Exercicio } from '../movimento';
import { criarPanturrilhaNoStep } from './panturrilha-no-step';

const P = criarPanturrilhaNoStep(ficha, 'uma');

export const panturrilha: Exercicio = {
  ficha: P.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro: P.quadro,
  // a panturrilha da perna que trabalha, sem secundário: é o que a biblioteca conta
  papeis: { 'panturrilha:R': 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, cabeça: (q) => q.esq.cabeca.o, halter: (q) => q.marcas.halter! },
};

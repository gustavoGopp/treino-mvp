// Stiff com kettlebell, no motor novo. Os números vêm da ficha (../dados/movimentos/stiff-kettlebell.json); o movimento
// é o de ./dobrar-o-quadril.ts, com o kettlebell seguro pela alça com as duas mãos (a alça passa pelas duas mãos e a
// bola fica embaixo do meio, pedido do Gustavo de 04/11/2026), pendendo na vertical na frente das pernas.
import ficha from '../dados/movimentos/stiff-kettlebell.json';
import type { Exercicio } from '../movimento';
import { criarStiff } from './dobrar-o-quadril';

const S = criarStiff(ficha, 'kettlebell');

export const stiffKettlebell: Exercicio = {
  ficha: S.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro: S.quadro,
  // posteriores da coxa (principal) e glúteos (secundário): os mesmos do stiff aprovado e da biblioteca
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, kettlebell: (q) => q.marcas.kettlebell! },
};

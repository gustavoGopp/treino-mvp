// Afundo estático com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/afundo.json); o movimento
// é o de ./afundo-estatico.ts, com um halter em cada mão e os braços pendendo ao lado do corpo.
import ficha from '../dados/movimentos/afundo.json';
import type { Exercicio } from '../movimento';
import { criarAfundoEstatico } from './afundo-estatico';

const A = criarAfundoEstatico(ficha, 'halteres');

export const afundo: Exercicio = {
  ficha: A.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: A.quadro,
  // quadríceps da perna da frente (principal); glúteo (laranja desde a revisão de anatomia de 02/11/2026) e adutores
  // da perna da frente, e quadríceps da de trás (secundários)
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's', 'quadriceps:L': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho, halter: (q) => q.marcas.halter! },
};

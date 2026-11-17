// Afundo estático com o peso do corpo, no motor novo. Os números vêm da ficha
// (../dados/movimentos/afundo-peso-corpo.json); o movimento é o de ./afundo-estatico.ts, com as mãos na cintura.
import ficha from '../dados/movimentos/afundo-peso-corpo.json';
import type { Exercicio } from '../movimento';
import { criarAfundoEstatico } from './afundo-estatico';

const A = criarAfundoEstatico(ficha, 'cintura');

export const afundoPesoCorpo: Exercicio = {
  ficha: A.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: A.quadro,
  // quadríceps da perna da frente (principal); glúteo e adutores da perna da frente e quadríceps da de trás
  // (secundários), como o afundo aprovado (revisão de anatomia de 02/11/2026)
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's', 'quadriceps:L': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};

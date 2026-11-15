// Afundo com kettlebell no peito, no motor novo. Os números vêm da ficha (../dados/movimentos/afundo-kettlebell.json);
// o movimento é o de ./afundo-estatico.ts, com o kettlebell junto ao peito, seguro pelas duas hastes da alça.
import ficha from '../dados/movimentos/afundo-kettlebell.json';
import type { Exercicio } from '../movimento';
import { criarAfundoEstatico } from './afundo-estatico';

const A = criarAfundoEstatico(ficha, 'kettlebell');

export const afundoKettlebell: Exercicio = {
  ficha: A.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: A.quadro,
  // quadríceps da perna da frente (principal); glúteo e adutores da perna da frente e quadríceps da de trás
  // (secundários), como o afundo aprovado
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's', 'quadriceps:L': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};

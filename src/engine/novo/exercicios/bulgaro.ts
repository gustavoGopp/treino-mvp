// Agachamento búlgaro com apoio, no motor novo. Os números vêm da ficha (../dados/movimentos/bulgaro.json); o
// movimento é o de ./bulgaro-base.ts: o peito do pé de trás no banco, um halter na mão do lado da perna da frente e a
// mão livre na coluna da estação, só para equilibrar.
import ficha from '../dados/movimentos/bulgaro.json';
import type { Exercicio } from '../movimento';
import { criarBulgaro } from './bulgaro-base';

const B = criarBulgaro(ficha, 'halter-e-apoio');

export const bulgaro: Exercicio = {
  ficha: B.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: B.quadro,
  // quadríceps da perna da frente (principal); glúteo (laranja desde a revisão de anatomia de 02/11/2026) e adutores
  // da perna da frente (secundários), como a biblioteca conta
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho, halter: (q) => q.marcas.halter! },
};

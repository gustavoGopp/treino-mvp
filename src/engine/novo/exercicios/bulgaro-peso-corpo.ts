// Búlgaro com o peso do corpo, no motor novo. Os números vêm da ficha (../dados/movimentos/bulgaro-peso-corpo.json); o
// movimento é o de ./bulgaro-base.ts, o mesmo do búlgaro aprovado: o peito do pé de trás no assento de uma cadeira
// firme (encostada na parede, com o encosto do lado de lá), as duas mãos na cintura, sem halter e sem a coluna.
import ficha from '../dados/movimentos/bulgaro-peso-corpo.json';
import type { Exercicio } from '../movimento';
import { criarBulgaro } from './bulgaro-base';

const B = criarBulgaro(ficha, 'cintura', 'cadeira');

export const bulgaroPesoCorpo: Exercicio = {
  ficha: B.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: B.quadro,
  // quadríceps da perna da frente (principal); glúteo e adutores da perna da frente (secundários), como a biblioteca
  // conta e como o búlgaro aprovado desenha
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};

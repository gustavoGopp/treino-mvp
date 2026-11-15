// Búlgaro com o pé de trás na suspensão, no motor novo. Os números vêm da ficha
// (../dados/movimentos/bulgaro-suspensao.json); o movimento é o de ./bulgaro-base.ts: de costas para a âncora, o peito
// do pé de trás no berço da alça (ajustada no meio da canela), as mãos na cintura. O quadril desce reto como no búlgaro
// aprovado; o pé de trás pende da âncora e anda para trás num arco, com a fita sempre do mesmo comprimento.
import ficha from '../dados/movimentos/bulgaro-suspensao.json';
import type { Exercicio } from '../movimento';
import { criarBulgaro } from './bulgaro-base';

const B = criarBulgaro(ficha, 'cintura', 'fita');

export const bulgaroSuspensao: Exercicio = {
  ficha: B.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: B.quadro,
  // quadríceps da perna da frente (principal); glúteo e adutores da perna da frente (secundários), como a biblioteca
  // conta (os adutores: correção de 04/11, pela lista do desenho)
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho, 'pé de trás': (q) => q.marcas.alca! },
};

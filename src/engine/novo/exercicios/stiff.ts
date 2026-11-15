// Stiff com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/stiff.json); o movimento é o de
// ./dobrar-o-quadril.ts, com um halter em cada mão, na frente das coxas, palmas para as pernas.
import ficha from '../dados/movimentos/stiff.json';
import type { Exercicio } from '../movimento';
import { criarStiff } from './dobrar-o-quadril';

const S = criarStiff(ficha, 'halteres');

export const stiff: Exercicio = {
  ficha: S.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro: S.quadro,
  // posteriores da coxa (principal) e glúteos (secundário, laranja): é o que a biblioteca conta, decidido na revisão de
  // anatomia de 02/11/2026. O desenho não tem os eretores da coluna.
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, halter: (q) => q.marcas.halter! },
};

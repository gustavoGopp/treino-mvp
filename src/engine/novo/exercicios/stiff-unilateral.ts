// Stiff unilateral com halter (numa perna só), no motor novo. Os números vêm da ficha
// (../dados/movimentos/stiff-unilateral.json); o movimento é o de ./dobrar-o-quadril.ts com apoio só no pé direito
// (o lado que trabalha, o de perto na vista de lado): a perna esquerda sobe para trás em linha com o tronco, a bacia
// vai para cima do pé de apoio e o halter fica na mão direita, perto da perna.
import ficha from '../dados/movimentos/stiff-unilateral.json';
import type { Exercicio } from '../movimento';
import { criarStiff } from './dobrar-o-quadril';

const S = criarStiff(ficha, 'halter');

export const stiffUnilateral: Exercicio = {
  ficha: S.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro: S.quadro,
  // posteriores da coxa da perna de apoio (principal); glúteos dos dois lados (secundários, em laranja: revisão de
  // anatomia de 02/11/2026, "os dois stiffs ficam iguais"). O desenho não tem os eretores da coluna.
  papeis: { 'posteriores:R': 'p', 'gluteo:R': 's', 'gluteo:L': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, halter: (q) => q.marcas.halter!, 'pé livre': (q) => q.esq.lado.L.tornozelo },
};

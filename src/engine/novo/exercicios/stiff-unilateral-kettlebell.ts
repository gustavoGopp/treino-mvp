// Stiff unilateral com kettlebell, no motor novo. Os números vêm da ficha
// (../dados/movimentos/stiff-unilateral-kettlebell.json); o movimento é o do stiff unilateral com halter aprovado
// (./dobrar-o-quadril.ts, numa perna só): apoio no pé direito (o lado que trabalha, o de perto na vista de lado), a
// perna esquerda sobe para trás em linha com o tronco e a bacia vai para cima do pé de apoio. O kettlebell fica na mão
// esquerda, a do lado oposto à perna de apoio (o cartão), seguro pela barra de cima da alça e pendendo na vertical.
import ficha from '../dados/movimentos/stiff-unilateral-kettlebell.json';
import type { Exercicio } from '../movimento';
import { criarStiff } from './dobrar-o-quadril';

const S = criarStiff(ficha, 'kettlebellOposta');

export const stiffUnilateralKettlebell: Exercicio = {
  ficha: S.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro: S.quadro,
  // os do stiff unilateral aprovado e da biblioteca: posteriores da coxa da perna de apoio (principal); glúteos dos dois
  // lados (secundários). O desenho não tem os eretores da coluna.
  papeis: { 'posteriores:R': 'p', 'gluteo:R': 's', 'gluteo:L': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, kettlebell: (q) => q.marcas.kettlebell!, 'pé livre': (q) => q.esq.lado.L.tornozelo },
};

// Ponte de glúteo com o peso do corpo, no motor novo. Os números vêm da ficha (../dados/movimentos/ponte-gluteo.json);
// a pose é a do núcleo das pontes (./ponte.ts): deitado de costas, pés no chão, braços no chão ao lado do corpo, um
// pouco abertos; o quadril sobe até ombros, quadril e joelhos ficarem em linha.
import ficha from '../dados/movimentos/ponte-gluteo.json';
import type { Exercicio } from '../movimento';
import { criarPonte } from './ponte';

const P = criarPonte(ficha, 'nenhuma');

export const ponteGluteo: Exercicio = {
  ficha: P.ficha,
  vistas: ['lateral', 'quina'],
  quadro: P.quadro,
  // só o glúteo, principal, sem secundário (biblioteca; revisão de anatomia de 02/11/2026)
  papeis: { gluteo: 'p' },
  trajetorias: { quadril: (q) => q.esq.pelve.o },
};

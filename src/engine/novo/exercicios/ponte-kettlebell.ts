// Ponte de glúteo com kettlebell, no motor novo. Os números vêm da ficha (../dados/movimentos/ponte-kettlebell.json);
// a pose é a do núcleo das pontes (./ponte.ts): o kettlebell deitado de lado sobre a dobra do quadril (a base para os
// pés, a alça para a cabeça), apoiado no corpo, as duas mãos segurando a alça, uma de cada lado; os cotovelos no chão
// ao lado da cintura, como a correção de 10/11 da ponte com halter.
import ficha from '../dados/movimentos/ponte-kettlebell.json';
import type { Exercicio } from '../movimento';
import { criarPonte } from './ponte';

const P = criarPonte(ficha, 'kettlebell');

export const ponteKettlebell: Exercicio = {
  ficha: P.ficha,
  vistas: ['lateral', 'quina'],
  quadro: P.quadro,
  // só o glúteo, principal, sem secundário (biblioteca; revisão de anatomia de 02/11/2026)
  papeis: { gluteo: 'p' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, kettlebell: (q) => q.marcas.bola! },
};

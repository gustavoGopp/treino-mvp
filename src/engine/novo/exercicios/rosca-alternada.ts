// Rosca alternada com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-alternada.json); o
// movimento é o de ./dobrar-o-cotovelo.ts: em pé, um halter em cada mão, palmas para a frente, um braço de cada vez,
// com o cotovelo parado ao lado do tronco.
import ficha from '../dados/movimentos/rosca-alternada.json';
import type { Exercicio } from '../movimento';
import { criarRoscaEmPe } from './dobrar-o-cotovelo';

// o halter sextavado de 10 lb: com o de 25 lb, a palma para a frente e o braço junto ao corpo, a cabeça de dentro entrava na coxa
const R = criarRoscaEmPe(ficha, 'alternada', { halter: 'halterLeve' });

export const roscaAlternada: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: R.quadro,
  // bíceps (principal); o antebraço "só ajuda" a segurar (correção de 04/11, SO_AJUDA das roscas; a ficha o lista como
  // secundário, a biblioteca conta só o bíceps)
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

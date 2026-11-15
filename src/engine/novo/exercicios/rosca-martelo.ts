// Rosca martelo com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-martelo.json); o
// movimento é o de ./dobrar-o-cotovelo.ts, como a rosca alternada, com a pegada neutra: palmas uma para a outra,
// polegar para a frente do antebraço (o cabo do halter fica de pé em relação ao antebraço), um braço de cada vez.
import ficha from '../dados/movimentos/rosca-martelo.json';
import type { Exercicio } from '../movimento';
import { criarRoscaEmPe } from './dobrar-o-cotovelo';

const R = criarRoscaEmPe(ficha, 'martelo');

export const roscaMartelo: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: R.quadro,
  // bíceps (principal; a biblioteca conta só ele); o antebraço (braquiorradial) "só ajuda" (correção de 04/11, SO_AJUDA)
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

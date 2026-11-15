// Flexão de braço, no motor novo. Os números vêm da ficha (../dados/movimentos/flexao.json); o movimento é o do
// núcleo das flexões (./flexionar.ts): mãos e pontas dos pés presas no chão, o corpo gira inteiro em torno das pontas
// dos pés. O ângulo da prancha em cima sai do cotovelo pedido pela ficha, e embaixo, da folga do peito ao chão.
import ficha from '../dados/movimentos/flexao.json';
import type { Exercicio } from '../movimento';
import { criarFlexao } from './flexionar';

const A = criarFlexao(ficha);

export const flexao: Exercicio = {
  ficha: A.ficha,
  vistas: ['lateral', 'cima'],
  quadro: A.quadro,
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's', abdomen: 'a' },
  trajetorias: { peito: (q) => q.esq.torax.o, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

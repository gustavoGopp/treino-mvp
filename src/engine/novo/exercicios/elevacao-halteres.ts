// Elevação lateral com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/elevacao-halteres.json); o
// movimento é o de ./elevar-o-braco.ts, com um halter em cada mão, palmas para dentro embaixo, os dois braços subindo
// para fora e um pouco à frente até a linha do ombro.
import ficha from '../dados/movimentos/elevacao-halteres.json';
import type { Exercicio } from '../movimento';
import { criarElevacao } from './elevar-o-braco';

const E = criarElevacao(ficha, 'halteres');

export const elevacaoHalteres: Exercicio = {
  ficha: E.ficha,
  vistas: ['frontal', 'cima'],
  quadro: E.quadro,
  // a lateral do ombro (principal) e a frente do ombro listrada (só ajuda), sem o trapézio de cima, que o texto apresenta
  // como sinal de erro (achado 3 da revisão de anatomia, correção de 02/11/2026; src/engine/estilo/musculos.ts)
  papeis: { deltLat: 'p', deltAnt: 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

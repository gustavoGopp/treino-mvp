// Elevação lateral com caneleira presa no punho, no motor novo (primeira animação deste exercício: até aqui ele era só
// cartão de texto). Os números vêm da ficha (../dados/movimentos/elevacao-lateral-caneleira.json); o movimento é o das
// elevações aprovadas (./elevar-o-braco.ts): em pé, os braços sobem para os lados e um pouco à frente do corpo até a
// altura dos ombros, com o cotovelo levemente dobrado e conduzindo. Uma caneleira presa em cada antebraço, logo acima
// do punho (a mesma peça da caneleira no tornozelo, ../pecas-de-cena/caneleira.ts, em volta do antebraço); a mão fica
// relaxada, porque a caneleira não é segurada. Embaixo, os braços ficam ao lado do corpo, a mão e a caneleira perto da
// coxa.
import ficha from '../dados/movimentos/elevacao-lateral-caneleira.json';
import type { Exercicio } from '../movimento';
import { criarElevacao } from './elevar-o-braco';

const E = criarElevacao(ficha, 'caneleira');

export const elevacaoLateralCaneleira: Exercicio = {
  ficha: E.ficha,
  vistas: ['frontal', 'cima'],
  quadro: E.quadro,
  // a lateral do ombro (principal), sem secundário, como a ficha da técnica e a biblioteca; a frente do ombro listrada
  // (só ajuda), como nas elevações aprovadas
  papeis: { deltLat: 'p', deltAnt: 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

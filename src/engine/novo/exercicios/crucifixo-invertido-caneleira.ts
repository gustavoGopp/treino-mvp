// Crucifixo invertido sentado com caneleira presa no punho, no motor novo (primeira animação deste exercício: até aqui
// ele era só cartão de texto). Os números vêm da ficha (../dados/movimentos/crucifixo-invertido-caneleira.json); o
// corpo, a cadeira e o arco dos braços são os do crucifixo invertido sentado com halteres, pelo núcleo comum
// ./crucifixo-invertido-sentado-base.ts. O que muda é a carga: no lugar do halter na mão, uma caneleira fechada em
// volta de cada antebraço, logo acima do punho (a peça de ../pecas-de-cena/caneleira.ts, que acompanha o antebraço), e
// a mão relaxada, sem segurar nada.
import ficha from '../dados/movimentos/crucifixo-invertido-caneleira.json';
import { fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { criarCrucifixoSentado } from './crucifixo-invertido-sentado-base';

const F = fichaSchema.parse(ficha);
const C = criarCrucifixoSentado(F, 'caneleira');

export const crucifixoInvertidoCaneleira: Exercicio = {
  ficha: F,
  vistas: ['quinaTras', 'cima'],
  quadro: C.quadro,
  // só o ombro de trás, sem secundário (achado 5 da revisão de anatomia; a ficha da técnica)
  papeis: { deltPost: 'p' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

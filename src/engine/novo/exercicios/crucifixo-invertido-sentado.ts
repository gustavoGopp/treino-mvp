// Crucifixo invertido sentado, com o peito nas coxas, com halteres, no motor novo (primeira animação deste exercício:
// até aqui ele era só cartão de texto). Os números vêm da ficha (../dados/movimentos/crucifixo-invertido-sentado.json);
// o corpo, a cadeira e o arco dos braços, do núcleo ./crucifixo-invertido-sentado-base.ts, que o crucifixo invertido
// com caneleira também usa. Aqui a carga é um halter leve em cada mão, pendurado atrás das panturrilhas no começo.
import ficha from '../dados/movimentos/crucifixo-invertido-sentado.json';
import { fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { criarCrucifixoSentado } from './crucifixo-invertido-sentado-base';

const F = fichaSchema.parse(ficha);
const C = criarCrucifixoSentado(F, 'halter');

export const crucifixoInvertidoSentado: Exercicio = {
  ficha: F,
  vistas: ['quinaTras', 'cima'],
  quadro: C.quadro,
  // só o ombro de trás, sem secundário (achado 5 da revisão de anatomia; a ficha da técnica)
  papeis: { deltPost: 'p' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

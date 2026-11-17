// Desenvolvimento sentado com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/desenvolvimento.json);
// o movimento é o de ./empurrar-para-cima.ts: sentado no banco regulável com o encosto a 78°, costas e cabeça apoiadas,
// halteres na altura das orelhas com os antebraços na vertical, até os braços quase estendidos sobre os ombros.
import ficha from '../dados/movimentos/desenvolvimento.json';
import type { Exercicio } from '../movimento';
import { criarDesenvolvimento } from './empurrar-para-cima';

const D = criarDesenvolvimento(ficha, 'halteres-sentado');

export const desenvolvimento: Exercicio = {
  ficha: D.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: D.quadro,
  // a frente do ombro (principal); a lateral do ombro e o tríceps (secundários, achado 4 da revisão de anatomia,
  // 02/11/2026); o trapézio de cima listrado (só ajuda), como o desenho de hoje (src/engine/estilo/musculos.ts)
  papeis: { deltAnt: 'p', deltLat: 's', triceps: 's', trapSup: 'a' },
  trajetorias: { halter: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

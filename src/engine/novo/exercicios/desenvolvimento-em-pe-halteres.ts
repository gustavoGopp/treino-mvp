// Desenvolvimento em pé com dois halteres, no motor novo. Os números vêm da ficha
// (../dados/movimentos/desenvolvimento-em-pe-halteres.json); o movimento é o de ./empurrar-para-cima.ts: em pé, pés na
// largura do quadril, joelhos levemente soltos, um halter em cada mão na altura dos ombros, com as palmas para a frente
// e os cotovelos um pouco à frente do corpo, até os braços quase estendidos acima da cabeça; o tronco e as pernas
// parados (o corpo em pé dos desenvolvimentos em pé aprovados, com a pegada do desenvolvimento com halteres aprovado).
import ficha from '../dados/movimentos/desenvolvimento-em-pe-halteres.json';
import type { Exercicio } from '../movimento';
import { criarDesenvolvimento } from './empurrar-para-cima';

const D = criarDesenvolvimento(ficha, 'halteres-em-pe');

export const desenvolvimentoEmPeHalteres: Exercicio = {
  ficha: D.ficha,
  vistas: ['frontal', 'lateral'], // abre de frente: de lado o halter passa na frente do rosto; a de lado fica para a lombar e os músculos
  quadro: D.quadro,
  // a frente do ombro (principal); a lateral do ombro e o tríceps (secundários), como a biblioteca e a ficha da técnica
  papeis: { deltAnt: 'p', deltLat: 's', triceps: 's' },
  trajetorias: { halter: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

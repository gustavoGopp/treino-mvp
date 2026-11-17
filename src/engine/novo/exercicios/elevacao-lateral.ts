// Elevação lateral unilateral na polia, no motor novo. Os números vêm da ficha (../dados/movimentos/elevacao-lateral.json);
// o movimento é o de ./elevar-o-braco.ts. De lado para a torre (à esquerda), a mão de fora (a direita) segura o estribo da
// polia baixa, com o cabo passando na frente do corpo, e a outra mão segura o trilho da coluna. A pilha sobe o curso do
// cabo dividido pela relação da máquina.
import ficha from '../dados/movimentos/elevacao-lateral.json';
import type { Exercicio } from '../movimento';
import { criarElevacao } from './elevar-o-braco';

const E = criarElevacao(ficha, 'polia');

export const elevacaoLateral: Exercicio = {
  ficha: E.ficha,
  vistas: ['frontal', 'cima'],
  quadro: E.quadro,
  // a lateral do ombro direito (principal) e a frente do ombro listrada (só ajuda), sem o trapézio de cima (achado 3 da
  // revisão de anatomia, correção de 02/11/2026; src/engine/estilo/musculos.ts)
  papeis: { 'deltLat:R': 'p', 'deltAnt:R': 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

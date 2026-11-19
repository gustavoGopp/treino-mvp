// Elevação lateral unilateral na polia, no motor novo. Os números vêm da ficha (../dados/movimentos/elevacao-lateral.json);
// o movimento é o de ./elevar-o-braco.ts. De lado para a torre (à esquerda), a mão de fora (a direita) segura o estribo da
// polia baixa, com o cabo passando na frente do corpo, e a outra mão segura o trilho da coluna. A pilha sobe o curso do
// cabo dividido pela relação da máquina.
import ficha from '../dados/movimentos/elevacao-lateral.json';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { criarElevacao } from './elevar-o-braco';

const E = criarElevacao(ficha, 'polia');

/**
 * O quadro do núcleo, com a cabeça desenhada de cima: ela fica dentro da silhueta dos ombros e o contorno único do
 * Boneco não a desenhava (sobrava só o calombo do rosto; auditoria das aprovadas antigas, 19/11). Ela ganha o contorno
 * próprio por cima do corpo (`cabeca`, opção do Boneco). O núcleo (./elevar-o-braco.ts) não muda: as animações
 * aprovadas que o usam continuam iguais.
 */
function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const q = E.quadro(corpo, u, erro);
  return { ...q, viesNaVista: { ...q.viesNaVista, cima: { ...q.viesNaVista?.cima, cabeca: 1 } } };
}

export const elevacaoLateral: Exercicio = {
  ficha: E.ficha,
  vistas: ['frontal', 'cima'],
  quadro,
  // a lateral do ombro direito (principal) e a frente do ombro listrada (só ajuda), sem o trapézio de cima (achado 3 da
  // revisão de anatomia, correção de 02/11/2026; src/engine/estilo/musculos.ts)
  papeis: { 'deltLat:R': 'p', 'deltAnt:R': 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

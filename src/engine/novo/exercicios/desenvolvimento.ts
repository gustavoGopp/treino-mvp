// Desenvolvimento sentado com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/desenvolvimento.json);
// o movimento é o de ./empurrar-para-cima.ts: sentado no banco regulável com o encosto a 78°, costas e cabeça apoiadas,
// halteres na altura das orelhas com os antebraços na vertical, até os braços quase estendidos sobre os ombros.
import ficha from '../dados/movimentos/desenvolvimento.json';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { criarDesenvolvimento } from './empurrar-para-cima';

const D = criarDesenvolvimento(ficha, 'halteres-sentado');

/**
 * O quadro do núcleo, com a cabeça desenhada de cima (a vista do erro "Cotovelos para trás"): ela fica dentro da
 * silhueta dos ombros e o contorno único do Boneco não a desenhava (sobrava só o calombo do rosto; auditoria das
 * aprovadas antigas, 19/11). Ela ganha o contorno próprio por cima do corpo (`cabeca`, opção do Boneco). O núcleo
 * (./empurrar-para-cima.ts) não muda: as animações aprovadas que o usam continuam iguais.
 */
function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const q = D.quadro(corpo, u, erro);
  return { ...q, viesNaVista: { ...q.viesNaVista, cima: { ...q.viesNaVista?.cima, cabeca: 1 } } };
}

export const desenvolvimento: Exercicio = {
  ficha: D.ficha,
  vistas: ['lateral', 'frontal'],
  quadro,
  // a frente do ombro (principal); a lateral do ombro e o tríceps (secundários, achado 4 da revisão de anatomia,
  // 02/11/2026); o trapézio de cima listrado (só ajuda), como no desenho de antes
  papeis: { deltAnt: 'p', deltLat: 's', triceps: 's', trapSup: 'a' },
  trajetorias: { halter: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

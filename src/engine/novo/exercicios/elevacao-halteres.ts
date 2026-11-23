// Elevação lateral com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/elevacao-halteres.json); o
// movimento é o de ./elevar-o-braco.ts, com um halter em cada mão, palmas para dentro embaixo, os dois braços subindo
// para fora e um pouco à frente até a linha do ombro.
import ficha from '../dados/movimentos/elevacao-halteres.json';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { criarElevacao } from './elevar-o-braco';

// o halter sextavado de 10 lb (halteres leves, como a ficha pede): embaixo, ele cabe na frente das coxas
// (correção de 19/11/2026) no erro "Balançar o tronco", o braço começa à folga da coxa com o tronco inclinado
const E = criarElevacao(ficha, 'halteres', { halter: 'halterLeve', folgaNoBalanco: true });

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

export const elevacaoHalteres: Exercicio = {
  ficha: E.ficha,
  vistas: ['frontal', 'cima'],
  quadro,
  // a lateral do ombro (principal) e a frente do ombro listrada (só ajuda), sem o trapézio de cima, que o texto apresenta
  // como sinal de erro (achado 3 da revisão de anatomia, correção de 02/11/2026)
  papeis: { deltLat: 'p', deltAnt: 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

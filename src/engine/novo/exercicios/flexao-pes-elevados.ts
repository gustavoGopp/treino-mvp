// Flexão com os pés elevados, no motor novo. Os números vêm da ficha (../dados/movimentos/flexao-pes-elevados.json);
// o movimento é o do núcleo das flexões (./flexionar.ts), com as mãos e os cotovelos da flexão e as pontas dos pés no
// tampo do banco reto da tabela de objetos (43,5 cm, a altura da caixa de 45 cm da animação de hoje: uma cama ou um
// sofá firme). A cabeça fica abaixo dos pés, e o corpo reto gira em torno das pontas dos pés.
import ficha from '../dados/movimentos/flexao-pes-elevados.json';
import type { Exercicio } from '../movimento';
import { criarFlexao } from './flexionar';

const A = criarFlexao(ficha, { apoioDosPes: 'bancoReto' });

export const flexaoPesElevados: Exercicio = {
  ficha: A.ficha,
  vistas: ['lateral', 'cima'],
  quadro: A.quadro,
  // peito principal; tríceps e frente do ombro secundários; o abdômen "só ajuda" (correção de 10/11/2026, como na flexão)
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's', abdomen: 'a' },
  trajetorias: { peito: (q) => q.esq.torax.o, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

// Flexão de braço com as mãos juntas, no motor novo. Os números vêm da ficha
// (../dados/movimentos/flexao-fechada.json); o movimento é o do núcleo das flexões (./flexionar.ts), com as mesmas
// poses do tronco e das pernas da flexão: mudam as mãos (na largura dos ombros, um pouco menos, abaixo da parte de
// baixo do peito) e os cotovelos (para trás, rentes ao corpo).
import ficha from '../dados/movimentos/flexao-fechada.json';
import type { Exercicio } from '../movimento';
import { criarFlexao } from './flexionar';

const A = criarFlexao(ficha);

export const flexaoFechada: Exercicio = {
  ficha: A.ficha,
  vistas: ['lateral', 'cima'],
  quadro: A.quadro,
  // biblioteca: tríceps e peito principais; ombro anterior secundário. O abdômen firma a prancha, mas a ficha da
  // técnica o deixa fora do desenho até o Gustavo decidir (docs/pesquisa/animacoes/flexao-fechada.md, "Músculos")
  papeis: { triceps: 'p', peitoral: 'p', deltAnt: 's' },
  trajetorias: { peito: (q) => q.esq.torax.o, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

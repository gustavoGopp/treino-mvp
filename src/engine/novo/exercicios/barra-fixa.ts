// Barra fixa com a pegada pronada, no motor novo. Os números vêm da ficha (../dados/movimentos/barra-fixa.json); o
// corpo pendurado, do núcleo ./pendurado.ts, e a subida, de ./barra-fixa-base.ts. Palmas para a frente, mãos a 1,5 vez
// a largura dos ombros (a pesquisa diz 1 a 1,5; a animação de hoje usava 1,8), cotovelos que descem para os lados.
import ficha from '../dados/movimentos/barra-fixa.json';
import { fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { criarBarraFixa } from './barra-fixa-base';

const F = fichaSchema.parse(ficha);
const B = criarBarraFixa(F, 'pronada');

export const barraFixa: Exercicio = {
  ficha: F,
  vistas: ['posterior', 'lateral'],
  quadro: B.quadro,
  // costas (o dorsal, principal, e o meio das costas); bíceps e ombro de trás, secundários; o antebraço só ajuda
  // (segura o corpo): a biblioteca e a decisão de 06/11 (ombro de trás)
  papeis: { dorsal: 'p', trapMedInf: 's', biceps: 's', deltPost: 's', antebraco: 'a' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo, queixo: (q) => q.marcas.queixo! },
};

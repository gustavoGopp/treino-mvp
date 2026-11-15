// Barra fixa com a pegada supinada, no motor novo. Os números vêm da ficha
// (../dados/movimentos/barra-fixa-supinada.json); o corpo pendurado, do núcleo ./pendurado.ts, e a subida, de
// ./barra-fixa-base.ts (a mesma da pronada). Palmas viradas para você, mãos na largura dos ombros, cotovelos que
// descem à frente do corpo, rentes às costelas.
import ficha from '../dados/movimentos/barra-fixa-supinada.json';
import { fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { criarBarraFixa } from './barra-fixa-base';

const F = fichaSchema.parse(ficha);
const B = criarBarraFixa(F, 'supinada');

export const barraFixaSupinada: Exercicio = {
  ficha: F,
  vistas: ['posterior', 'lateral'],
  quadro: B.quadro,
  // costas (o dorsal, principal, e o meio das costas); bíceps e ombro de trás, secundários (a biblioteca e a decisão
  // de 06/11, que pôs o ombro de trás nesta pegada). O antebraço fica fora, como na animação aprovada de hoje.
  papeis: { dorsal: 'p', trapMedInf: 's', biceps: 's', deltPost: 's' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo, queixo: (q) => q.marcas.queixo! },
};

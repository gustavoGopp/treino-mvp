// Remada unilateral com kettlebell (mão livre na coxa), no motor novo. Os números vêm da ficha
// (../dados/movimentos/remada-unilateral-kettlebell.json); o corpo parado é o de ./remada-sem-banco.ts (pé esquerdo à
// frente, mão esquerda na coxa da frente) e o braço que puxa é o do núcleo ./remada.ts, com o kettlebell pendurado pela
// alça na mão direita (palma virada para o corpo; a alça vai de frente para trás).
import ficha from '../dados/movimentos/remada-unilateral-kettlebell.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio } from '../movimento';
import { criarRemada } from './remada';
import { baseSemBanco, peleDaCoxaNaSuperficie } from './remada-sem-banco';

const f = daFicha(fichaSchema.parse(ficha));
// a mão de apoio pousa na pele da coxa medida na superfície (`peleDaCoxaNaSuperficie`, como na remada com elástico): com
// a medida da base comum, o ponto em que ela pousava caía entre dois anéis da coxa e ficava perto do eixo dela, e a mão e
// o antebraço entravam na coxa (auditoria das aprovadas antigas, 19/11)
const R = criarRemada(ficha, { bracos: 'R', carga: 'kettlebell', base: (c) => baseSemBanco(c, f, { pele: peleDaCoxaNaSuperficie }), erros: { gira: 'girar', arred: 'arredondar', curta: 'curta' } });

export const remadaUnilateralKettlebell: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'quina'],
  quadro: R.quadro,
  // costas (dorsal e meio das costas) do lado que puxa; bíceps e ombro de trás ajudam (a ficha e a biblioteca)
  papeis: { 'dorsal:R': 'p', 'trapMedInf:R': 'p', 'deltPost:R': 's', 'biceps:R': 's' },
  trajetorias: { kettlebell: (q) => q.marcas.kettlebell!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

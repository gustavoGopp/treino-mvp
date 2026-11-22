// Remada unilateral com halter, sem banco (mão livre na coxa), no motor novo. Os números vêm da ficha
// (../dados/movimentos/remada-unilateral-sem-banco.json); o corpo parado é o de ./remada-sem-banco.ts (pé esquerdo à
// frente, mão esquerda na coxa da frente) e o braço que puxa é o do núcleo ./remada.ts, com o halter na mão direita.
import ficha from '../dados/movimentos/remada-unilateral-sem-banco.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { criarRemada } from './remada';
import { baseSemBanco, peleDaCoxaNaSuperficie } from './remada-sem-banco';

const f = daFicha(fichaSchema.parse(ficha));
// a mão de apoio pousa na pele da coxa medida na superfície (`peleDaCoxaNaSuperficie`, como na remada com elástico): com
// a medida da base comum, o ponto em que ela pousava caía entre dois anéis da coxa e ficava perto do eixo dela, e a mão e
// o antebraço entravam na coxa (auditoria das aprovadas antigas, 19/11)
const R = criarRemada(ficha, { bracos: 'R', carga: 'halter', base: (c) => baseSemBanco(c, f, { pele: peleDaCoxaNaSuperficie }), erros: { gira: 'girar', arred: 'arredondar', curta: 'curta' }, recuoDoAntebraco: true });
// Correção de 19/11/2026 (o halter "puxando pra dentro do próprio corpo"): de três quartos, a carga fica na frente da
// perna direita (a de perto, pintada no item do corpo pela profundidade média do tronco, que fica mais perto de quem olha
// que ela), mas era pintada atrás dela e parecia entrar na coxa. Nessa vista, o corpo, as pernas e o braço de apoio vão
// `pintura.quina.atras` cm para trás na pintura (a ordem entre eles não muda; o braço que puxa fica onde está). A regra
// `remada-carga-pintada-no-lugar` mede a ordem em cada vista do guia.
const atras = f('pintura.quina.atras');
const quadro = (c: Corpo, u: number, erro?: string): Quadro => {
  const q = R.quadro(c, u, erro);
  return { ...q, viesNaVista: { ...q.viesNaVista, quina: { corpo: -atras, pernaR: -atras, pernaL: -atras, bracoL: -atras } } };
};

export const remadaUnilateralSemBanco: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'quina'],
  quadro,
  // costas (dorsal e meio das costas) do lado que puxa; bíceps e ombro de trás ajudam (a ficha e a biblioteca)
  papeis: { 'dorsal:R': 'p', 'trapMedInf:R': 'p', 'deltPost:R': 's', 'biceps:R': 's' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

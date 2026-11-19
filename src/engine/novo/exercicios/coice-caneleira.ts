// Coice de glúteo em quatro apoios com caneleira, no motor novo (primeira animação deste exercício: até aqui ele era só
// cartão de texto). Os números vêm da ficha (../dados/movimentos/coice-caneleira.json); o corpo em quatro apoios, do
// núcleo ./quatro-apoios.ts, o mesmo do coice com elástico (./coice-elastico.ts), sem mudar nada nele. Mãos sob os
// ombros e joelhos sob o quadril, no colchonete, as costas retas. A perna direita (perto de quem olha na vista de lado)
// trabalha: com o joelho dobrado o tempo todo, a coxa vai de sob o quadril até a linha do tronco, levando o pé para trás
// e para cima. A caneleira fica presa no tornozelo direito (../pecas-de-cena/caneleira.ts, a mesma da abdução com
// caneleira aprovada) e acompanha a canela.
import ficha from '../dados/movimentos/coice-caneleira.json';
import type { Esq, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete, medidasDoColchonete } from '../pecas';
import { caneleira, caneleiraNaPerna } from '../pecas-de-cena/caneleira';
import type { Corpo } from '../tabelas';
import { girar, mix, mul, norm } from '../vec';
import type { V3 } from '../vec';
import { calibrarQuatroApoios, emQuatroApoios } from './quatro-apoios';
import type { OpcoesQuatroApoios } from './quatro-apoios';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
// o colchonete comprido, o medido (acréscimo de 19/11: o da tabela, de 100 cm, deixava o pé de apoio fora)
const COLCHONETE = medidasDoColchonete({ comprido: true });
const O: OpcoesQuatroApoios = { piso: COLCHONETE.esp, maosMeia: f('maos.meiaDistancia'), cotovelo: f('cotovelo'), lombar: f('lombar'), cervical: f('cervical') };

/** Uma direção no plano de lado do corpo: 0° = para baixo, 90° = para trás (para os pés), 180° = para cima. */
const dir = (graus: number): V3 => [0, -Math.cos(graus * rad), -Math.sin(graus * rad)];

/** O quanto a coxa direita fica atrás da vertical em u (graus), e o quanto ela abre para fora (no erro de girar). */
function coxaEm(corpo: Corpo, u: number, erro?: string): { atras: number; abre: number } {
  const c = calibrarQuatroApoios(corpo, O);
  // em cima, a coxa na linha do tronco: a linha da base do pescoço ao quadril desce para trás, e a coxa a continua
  const naLinha = 90 - c.linha;
  const topo = erro === 'lombar' ? naLinha + f('erro.lombar.acima') : naLinha;
  return { atras: mix(f('coxa.inicio'), topo, u), abre: erro === 'gira' ? f('erro.gira.abre') * u : 0 };
}

/** A perna que trabalha: a coxa `atras` graus atrás da vertical (e `abre` para fora), o joelho dobrado, o pé em ângulo reto. */
function pernaQueTrabalha(atras: number, abre: number, pf: number): PosePerna {
  // a perna inteira gira `abre` graus em volta da vertical, para fora (para −x, o lado de fora da perna direita)
  const fora = (d: V3): V3 => norm(girar(d, [0, 1, 0], abre));
  const fi = atras + f('joelho');
  return { coxa: fora(dir(atras)), canela: fora(dir(fi)), peDir: fora(dir(fi - 90 + pf)), polo: fora(dir(atras - 90)) };
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const { atras, abre } = coxaEm(corpo, u, erro);
  const d = { bacia: erro === 'lombar' ? f('erro.lombar.bacia') * u : 0, rola: erro === 'gira' ? f('erro.gira.rola') * u : 0 };
  // o pé: solto no começo (a ponta não entra no colchonete) e em ângulo reto com a canela no alto (acréscimo de 19/11)
  const pf = mix(f('pe.flexaoPlantar.inicio'), f('pe.flexaoPlantar'), u);
  return emQuatroApoios(corpo, O, (_t: Tronco) => pernaQueTrabalha(atras, abre, pf), d);
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const c = calibrarQuatroApoios(corpo, O);
  // o velcro do lado de fora da perna direita (o lado direito da bacia, −x dela)
  const can = caneleiraNaPerna(e, 'R', mul(e.pelve.x, -1));
  const peca = caneleira(can);
  const zCol = c.zMao / 2 + f('colchonete.recua');
  return {
    esq: e,
    prims: [chao(-70, 70, zCol - COLCHONETE.comp / 2 - 10, zCol + COLCHONETE.comp / 2 + 10), ...colchonete(0, zCol, true), ...peca.prims],
    pecas: [{ t: 'colchonete', x0: 0, z0: zCol, noFundo: true, comprido: true, noQuadro: f('colchonete.noQuadro') }, peca.peca],
    fios: [],
    cargas: [{ massa: f('caneleira.massa'), pos: can.centro }],
    marcas: { piso: [0, O.piso, 0], caneleira: can.centro, caneleiraRaio: [can.raio, 0, 0] },
  };
}

export const coiceCaneleira: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // glúteos da perna que trabalha, sem secundário (com o joelho dobrado, os posteriores não contam: a ficha da técnica)
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho, 'pé': (q) => q.esq.lado.R.tornozelo },
};

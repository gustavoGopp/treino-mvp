// Coice de glúteo em quatro apoios com elástico, no motor novo. Os números vêm da ficha
// (../dados/movimentos/coice-elastico.json); o corpo em quatro apoios, do núcleo ./quatro-apoios.ts. Mãos sob os
// ombros e joelhos sob o quadril, no colchonete, as costas retas. A perna direita (perto de quem olha na vista de lado)
// trabalha: com o joelho dobrado o tempo todo, a coxa vai de sob o quadril até a linha do tronco, empurrando o pé para
// trás e para cima. O elástico é o longo em laço (../dados/objetos/elastico-longo.json; o tubo de 48 pol da tabela é
// curto demais para ir das mãos ao pé e voltar): uma ponta do laço passa pela sola do pé direito; a outra fica presa no
// colchonete sob as duas mãos, de uma palma à outra. Os dois trechos vão de cada mão até a sola, por baixo do corpo, e
// contornam a coxa, o joelho e a canela pelo lado de baixo (o caminho mais curto: ./elastico-faixa.ts).
import ficha from '../dados/movimentos/coice-elastico.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, colchonete } from '../pecas';
import { faixaElastica } from '../pecas-de-cena/elastico-longo';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, girar, mix, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento, fioPorFora } from './elastico-faixa';
import { calibrarQuatroApoios, emQuatroApoios } from './quatro-apoios';
import type { OpcoesQuatroApoios } from './quatro-apoios';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const O: OpcoesQuatroApoios = { piso: obj('colchonete', 'esp'), maosMeia: f('maos.meiaDistancia'), cotovelo: f('cotovelo'), lombar: f('lombar'), cervical: f('cervical') };
/** As partes que o elástico contorna, de cada mão até a sola: tudo menos as mãos e os pés. */
const PARTES = ['coxa', 'canela', 'pelve', 'cintura', 'emendaDaCintura', 'tronco', 'braco', 'ante'];

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
function pernaQueTrabalha(atras: number, abre: number): PosePerna {
  // a perna inteira gira `abre` graus em volta da vertical, para fora (para −x, o lado de fora da perna direita): o
  // joelho continua dobrado o mesmo tanto
  const fora = (d: V3): V3 => norm(girar(d, [0, 1, 0], abre));
  const fi = atras + f('joelho');
  return { coxa: fora(dir(atras)), canela: fora(dir(fi)), peDir: fora(dir(fi - 90 + f('pe.flexaoPlantar'))), polo: fora(dir(atras - 90)) };
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const { atras, abre } = coxaEm(corpo, u, erro);
  const d = { bacia: erro === 'lombar' ? f('erro.lombar.bacia') * u : 0, rola: erro === 'gira' ? f('erro.gira.rola') * u : 0 };
  return emQuatroApoios(corpo, O, (_t: Tronco) => pernaQueTrabalha(atras, abre), d);
}

/** O laço: da mão direita, por baixo do corpo, pela sola do pé direito, de volta à mão esquerda e, no colchonete, à direita. */
function laco(corpo: Corpo, e: Esq): { pts: V3[]; comp: number; sola: V3 } {
  const c = calibrarQuatroApoios(corpo, O);
  const esp = obj('elasticoLongo', 'esp');
  const palma = (k: Lado): V3 => [sinal(k) * O.maosMeia, O.piso + esp / 2, c.zMao];
  // o meio da sola do pé direito, de uma borda à outra (o laço passa por ela, achatado)
  const pe = e.lado.R;
  const meio = mul(add(pe.bola, pe.calcanhar), 0.5);
  // a sola fica do lado oposto ao tornozelo
  const paraASola = norm(perp(sub(meio, pe.tornozelo), norm(sub(pe.bola, pe.calcanhar))));
  const sola = add(meio, mul(paraASola, esp / 2));
  // de lado a lado do pé (perpendicular aos dedos, para +x)
  const lado = norm(perp([1, 0, 0], pe.pe.z));
  const larg = corpo.m('pe.largura') / 2 + esp;
  // a borda do lado de fora do pé direito (−x) recebe o trecho da mão direita
  const bR = add(sola, mul(lado, -larg)),
    bL = add(sola, mul(lado, larg));
  // a perna de apoio fica de fora: o elástico passa por cima e por dentro dela, e contorna só a perna que trabalha
  const R0 = e.lado.R,
    L0 = e.lado.L;
  const daPernaDeApoio = (p: V3) => Math.min(dist(p, L0.joelho), dist(p, L0.tornozelo), dist(p, L0.quadril) + 6) < Math.min(dist(p, R0.joelho), dist(p, R0.tornozelo), dist(p, R0.quadril) + 6);
  const op = { lado: [0, -1, 0] as V3, partes: PARTES, folga: f('elastico.folga'), fatia: 2.5, livreNasPontas: 3, aceita: (p: V3) => !daPernaDeApoio(p) };
  const R = fioPorFora(e, palma('R'), bR, op);
  // o trecho da mão esquerda cruza por baixo do corpo, entre as coxas: ele contorna também a coxa de apoio, pelo lado
  // de dentro dela (a virilha), em vez de atravessá-la
  const L = fioPorFora(e, palma('L'), bL, { ...op, lado: norm([-f('elastico.paraDentro'), -1, 0]), aceita: undefined });
  // no colchonete, o laço não desce abaixo do tampo
  const noTampo = (p: V3): V3 => [p[0], Math.max(p[1], O.piso + esp / 2), p[2]];
  const pts = [...R, ...L.reverse(), palma('R')].map(noTampo);
  return { pts, comp: comprimento(pts), sola };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const c = calibrarQuatroApoios(corpo, O);
  const l = laco(corpo, e);
  const estica = l.comp / obj('elasticoLongo', 'comp');
  const fx = faixaElastica(l.pts, estica);
  const zCol = c.zMao / 2 + f('colchonete.recua');
  return {
    esq: e,
    prims: [chao(-70, 70, -90, 110), ...colchonete(0, zCol), ...fx.prims],
    pecas: [{ t: 'colchonete', x0: 0, z0: zCol, noFundo: true }, fx.peca],
    fios: [{ id: 'elastico', comp: l.comp, estica: true, objeto: 'elasticoLongo' }],
    cargas: [],
    marcas: { sola: l.sola, piso: [0, O.piso, 0] },
  };
}

export const coiceElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // glúteos da perna que trabalha, sem secundário (com o joelho dobrado, os posteriores não contam: a ficha da técnica)
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho, 'pé': (q) => q.esq.lado.R.tornozelo },
};

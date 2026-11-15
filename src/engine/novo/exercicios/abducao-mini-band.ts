// Abdução de quadril sentado, com mini band, no motor novo. Os números vêm da ficha
// (../dados/movimentos/abducao-mini-band.json); a pose sentada, do núcleo ./quadril-sentado-na-cadeira.ts. Sentado na
// beira da cadeira firme, as mãos nas bordas do assento, os pés chapados no chão na largura do quadril; a mini band em
// volta das duas coxas, logo acima dos joelhos. Os joelhos abrem para fora com os pés parados: o joelho gira em volta
// da linha do quadril ao tornozelo (a coxa abre e gira para fora), e a faixa estica.
import ficha from '../dados/movimentos/abducao-mini-band.json';
import { angulosDoLado } from '../conferir-util';
import { resolverMembros } from '../esqueleto';
import type { Esq, Lado, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { cadeira } from '../pecas-de-cena/cadeira';
import { lacoNasCoxas, miniBand } from '../pecas-de-cena/mini-band';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { assento, calibrarSentado, maosNoAssento, peNoChao, troncoSentado } from './quadril-sentado-na-cadeira';
import type { OpcoesSentado } from './quadril-sentado-na-cadeira';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesSentado = { quadrilABorda: f('quadrilABorda'), pesMeiaDistancia: f('pes.meiaDistancia'), joelho: f('joelho'), amassa: f('assento.amassa'), maosAFrente: f('maos.aFrente') };

const pernas = (bolaZ: number, abre: number, peFora = 0): Record<Lado, PosePerna> => ({ R: peNoChao(O, 'R', bolaZ, abre, peFora), L: peNoChao(O, 'L', bolaZ, abre, peFora) });
const calib = (corpo: Corpo) => calibrarSentado(corpo, O, F.id, (_t, z) => pernas(z, 0));

/** O giro do joelho para fora que deixa a coxa aberta `alvo` graus (guardado por corpo). */
const GIRO = new WeakMap<Corpo, number>();
function giroAberto(corpo: Corpo): number {
  const ja = GIRO.get(corpo);
  if (ja !== undefined) return ja;
  const C = calib(corpo);
  const t = troncoSentado(corpo, O, C.y);
  const ab = (g: number) => angulosDoLado(resolverMembros(t, maosNoAssento(O), pernas(C.bolaZ, g)), 'R').abducaoDoQuadril;
  const g = resolver1((x) => ab(x) - f('abducao.aberto'), 0, 89);
  GIRO.set(corpo, g);
  return g;
}

function esqueleto(corpo: Corpo, u: number, erro?: string): Esq {
  const C = calib(corpo);
  const tronco = erro === 'tronco';
  const t = troncoSentado(corpo, O, C.y, tronco ? { lombar: f('erro.tronco.lombar') * u, toracica: f('erro.tronco.toracica') * u } : {});
  const g1 = giroAberto(corpo);
  const abre = erro === 'solta' ? mix(-f('erro.solta.fecha'), g1, u) : g1 * u;
  return resolverMembros(t, maosNoAssento(O), pernas(C.bolaZ, abre, erro === 'pes' ? f('erro.pes.fora') * u : 0));
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = esqueleto(corpo, u, erro);
  const laco = lacoNasCoxas(e, f('faixa.acimaDoJoelho'));
  const mb = miniBand(laco);
  const A = assento();
  const cad = cadeira({ x0: 0, zBorda: A.zBorda });
  return {
    esq: e,
    prims: [chao(-70, 70, -60, 70), ...cad.prims, ...mb.prims],
    // a cadeira fica atrás do corpo na pintura (sentado nela, o corpo a cobre onde as duas se cruzam na tela)
    pecas: [{ ...cad.peca, cenario: true }, mb.peca],
    fios: [{ id: 'elastico', comp: laco.comp, estica: true, objeto: 'miniBand' }],
    cargas: [],
    marcas: { faixaR: laco.centros.R, faixaL: laco.centros.L, assento: [0, A.altura, A.zBorda] },
  };
}

export const abducaoMiniBand: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'lateral'],
  quadro,
  // glúteos (médio, mínimo e a parte de cima do máximo), dos dois lados: o desenho tem um glúteo só, que não separa o médio
  papeis: { gluteo: 'p' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho },
};

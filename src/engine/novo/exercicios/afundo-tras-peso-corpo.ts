// Afundo para trás com o peso do corpo, no motor novo. Os números vêm da ficha
// (../dados/movimentos/afundo-tras-peso-corpo.json). O boneco começa em pé, com os pés juntos; o pé de trás sai do
// chão, passa pelo ar e apoia na ponta, um passo largo atrás; o quadril vai para trás e desce até o joelho de trás
// quase tocar o chão. O pé da frente não sai do lugar. Embaixo, é a posição do afundo com o peso do corpo aprovado.
import ficha from '../dados/movimentos/afundo-tras-peso-corpo.json';
import type { Esq } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { afundar } from './afundar';
import { FRENTE, TRAS, maosNaCintura } from './afundo-estatico';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const CACHE = new WeakMap<Corpo, { emPe: number; baixo: number }>();
/** Vai de 0 a 1 sem tranco nas pontas: velocidade e aceleração zero no começo e no fim (o perfil de mínimo solavanco). */
const macio = (x: number) => suave(Math.max(0, Math.min(1, x)));

interface Passo {
  quadrilY: number;
  quadrilZ: number;
  /** A ponta do pé de trás: quanto está atrás do quadril de chegada, a altura no ar e quanto o calcanhar subiu. */
  bolaZ: number;
  bolaY: number;
  calcanhar: number;
  tronco?: number;
  valgo?: number;
}
function pose(corpo: Corpo, p: Passo): Esq {
  return afundar(corpo, {
    frente: FRENTE,
    quadrilY: p.quadrilY,
    quadrilZ: p.quadrilZ,
    tronco: p.tronco ?? f('tronco'),
    pesMeiaDistancia: f('pes.meiaDistancia'),
    tornozeloDaFrente: f('peDaFrente.aFrenteDoQuadril'),
    bolaDeTras: p.bolaZ,
    apoioDeTras: p.bolaY,
    calcanharDeTras: p.calcanhar,
    valgo: p.valgo ?? 0,
    bracos: (t) => ({ R: maosNaCintura(t, 'R', f('maos.naCintura.acima')), L: maosNaCintura(t, 'L', f('maos.naCintura.acima')) }),
  });
}
/** Onde a ponta do pé fica, em z, quando os dois pés estão juntos (ao lado da ponta do pé da frente). */
const bolaJunta = (corpo: Corpo) => f('peDaFrente.aFrenteDoQuadril') + corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
/** Em pé, o quadril fica sobre os tornozelos. */
const quadrilEmPe = () => f('peDaFrente.aFrenteDoQuadril');
const apoiado = (y: number) => ({ quadrilY: y, quadrilZ: 0, bolaZ: -f('peDeTras.atrasDoQuadril'), bolaY: 0, calcanhar: f('peDeTras.calcanhar') });

function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const raioDoJoelho = corpo.secoes.coxa![corpo.secoes.coxa!.length - 1]!.b;
  // embaixo: a mesma condição do afundo com o peso do corpo (o joelho de trás perto do chão)
  const baixo = resolver1((y) => pose(corpo, apoiado(y)).lado[TRAS].joelho[1] - raioDoJoelho - f('joelhoDeTras.aoChao'), 35, 75);
  // em pé: os dois pés juntos, os joelhos quase estendidos
  const emPe = resolver1((y) => f('joelho.cima') - pose(corpo, { quadrilY: y, quadrilZ: quadrilEmPe(), bolaZ: bolaJunta(corpo), bolaY: 0, calcanhar: 0 }).lado[FRENTE].ang.joelho, 105, 80);
  c = { emPe, baixo };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  // o passo: a ponta do pé de trás vai do lado do pé da frente até o apoio, passando pelo ar
  const w = macio(u / f('passo.quandoApoia'));
  const noAr = Math.max(0, Math.min(1, u / f('passo.quandoApoia')));
  const fundo = erro === 'curta' ? f('erro.raso.fracao') : 1;
  // no erro "empurrar com o pé de trás", o quadril vai mais para trás e o tronco recua
  const quadrilAtras = erro === 'tras' ? -f('erro.tras.quadril') * macio(u) : 0;
  const e = pose(corpo, {
    // o quadril vai para trás um pouco depois de o pé sair e chega ao lugar pouco depois de o pé apoiar
    quadrilZ: mix(quadrilEmPe(), quadrilAtras, macio(u / (f('passo.quandoApoia') * 1.25))),
    // o quadril desce do começo ao fim, sem parar no meio; no erro de descer pouco, para antes
    quadrilY: mix(c.emPe, mix(c.emPe, c.baixo, 0.42 + 0.58 * fundo), macio(u)),
    bolaZ: mix(bolaJunta(corpo), -f('peDeTras.atrasDoQuadril'), w),
    // a ponta do pé sobe e desce sem tranco na saída nem na chegada
    bolaY: f('passo.altura') * Math.sin(Math.PI * noAr) ** 4,
    calcanhar: mix(0, f('peDeTras.calcanhar'), w),
    tronco: erro === 'tras' ? mix(f('tronco'), f('erro.tras.tronco'), macio(u)) : undefined,
    valgo: erro === 'joelho' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
  });
  return { esq: e, prims: [chao(-70, 70, -90, 100)], pecas: [], fios: [], cargas: [], marcas: {} };
}

export const afundoTrasPesoCorpo: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // os mesmos do afundo aprovado: quadríceps da perna da frente (principal); glúteo e adutores da frente e quadríceps
  // da de trás (secundários)
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's', 'quadriceps:L': 's' },
  trajetorias: { 'pé de trás': (q) => q.esq.lado.L.tornozelo, quadril: (q) => q.esq.pelve.o },
};

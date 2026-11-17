// Afundo para trás alternado, com um halter em cada mão, no motor novo. Os números vêm da ficha
// (../dados/movimentos/afundo-tras.json). O movimento é o do afundo para trás com o peso do corpo aprovado
// (./afundo-tras-peso-corpo.ts): o boneco começa em pé, com os pés juntos; o pé de trás sai do chão, passa pelo ar e
// apoia na ponta, um passo longo atrás; o quadril vai para trás e desce até o joelho de trás chegar perto do chão. O
// pé da frente não sai do lugar. Os braços são os do afundo com halteres aprovado (./afundo-estatico.ts): pendem ao
// lado do corpo e o halter pende na vertical, com o cabo apontando para a frente.
import ficha from '../dados/movimentos/afundo-tras.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix, norm } from '../vec';
import type { V3 } from '../vec';
import { afundar } from './afundar';
import { FRENTE, TRAS } from './afundo-estatico';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const CACHE = new WeakMap<Corpo, { emPe: number; baixo: number; curto: number }>();
/** Vai de 0 a 1 sem tranco nas pontas: velocidade e aceleração zero no começo e no fim. */
const macio = (x: number) => suave(Math.max(0, Math.min(1, x)));

/** Braço pendendo ao lado do corpo, um pouco afastado para o halter não bater na coxa; pegada neutra. */
function bracoComHalter(k: Lado): PoseBraco {
  const s = sinal(k),
    fora = f('bracos.paraFora') * rad;
  const desce: V3 = norm([s * Math.sin(fora), -Math.cos(fora), 0]);
  return { umero: desce, antebraco: norm([s * Math.sin(fora), -Math.cos(fora), 0.03]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: obj('halter', 'caboDiam') } };
}

interface Passo {
  quadrilY: number;
  quadrilZ: number;
  /** A ponta do pé de trás: onde fica em z, a altura no ar e quanto o calcanhar subiu. */
  bolaZ: number;
  bolaY: number;
  calcanhar: number;
  tronco?: number;
  valgo?: number;
  /** Quanto o calcanhar da frente sobe (graus): só no erro do passo curto. */
  calcanharDaFrente?: number;
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
    calcanharDaFrente: p.calcanharDaFrente,
    bracos: () => ({ R: bracoComHalter('R'), L: bracoComHalter('L') }),
  });
}
/** Onde a ponta do pé fica, em z, quando os dois pés estão juntos (ao lado da ponta do pé da frente). */
const bolaJunta = (corpo: Corpo) => f('peDaFrente.aFrenteDoQuadril') + corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
/** Em pé, o quadril fica sobre os tornozelos. */
const quadrilEmPe = () => f('peDaFrente.aFrenteDoQuadril');
const apoiado = (y: number) => ({ quadrilY: y, quadrilZ: 0, bolaZ: -f('peDeTras.atrasDoQuadril'), bolaY: 0, calcanhar: f('peDeTras.calcanhar') });
/** No erro do passo curto: a ponta do pé de trás apoia mais perto e o quadril fica mais à frente. */
const bolaCurta = () => f('peDaFrente.aFrenteDoQuadril') - f('erro.curto.passo');

function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const raioDoJoelho = corpo.secoes.coxa![corpo.secoes.coxa!.length - 1]!.b;
  // embaixo: a mesma condição do afundo para trás aprovado (o joelho de trás perto do chão)
  const baixo = resolver1((y) => pose(corpo, apoiado(y)).lado[TRAS].joelho[1] - raioDoJoelho - f('joelhoDeTras.aoChao'), 35, 75);
  // em pé: os dois pés juntos, os joelhos quase estendidos
  const emPe = resolver1((y) => f('joelho.cima') - pose(corpo, { quadrilY: y, quadrilZ: quadrilEmPe(), bolaZ: bolaJunta(corpo), bolaY: 0, calcanhar: 0 }).lado[FRENTE].ang.joelho, 105, 80);
  // no passo curto, o joelho de trás também desce até perto do chão
  const curto = resolver1(
    (y) => pose(corpo, { quadrilY: y, quadrilZ: f('erro.curto.quadril'), bolaZ: bolaCurta(), bolaY: 0, calcanhar: f('peDeTras.calcanhar'), calcanharDaFrente: f('erro.curto.calcanhar') }).lado[TRAS].joelho[1] - raioDoJoelho - f('joelhoDeTras.aoChao'),
    35,
    80,
  );
  c = { emPe, baixo, curto };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const curto = erro === 'curto';
  // o passo: a ponta do pé de trás vai do lado do pé da frente até o apoio, passando pelo ar
  const w = macio(u / f('passo.quandoApoia'));
  const noAr = Math.max(0, Math.min(1, u / f('passo.quandoApoia')));
  // no erro do impulso com a perna de trás, o quadril vai mais para trás e o tronco recua; no passo curto, o quadril
  // fica mais à frente, sobre o pé da frente
  const quadrilFim = erro === 'tras' ? -f('erro.tras.quadril') * macio(u) : curto ? f('erro.curto.quadril') : 0;
  const e = pose(corpo, {
    // o quadril vai para trás um pouco depois de o pé sair e chega ao lugar pouco depois de o pé apoiar
    quadrilZ: mix(quadrilEmPe(), quadrilFim, macio(u / (f('passo.quandoApoia') * 1.25))),
    // o quadril desce do começo ao fim, sem parar no meio
    quadrilY: mix(c.emPe, curto ? c.curto : c.baixo, macio(u)),
    bolaZ: mix(bolaJunta(corpo), curto ? bolaCurta() : -f('peDeTras.atrasDoQuadril'), w),
    // a ponta do pé sobe e desce sem tranco na saída nem na chegada
    bolaY: f('passo.altura') * Math.sin(Math.PI * noAr) ** 4,
    calcanhar: mix(0, f('peDeTras.calcanhar'), w),
    tronco: erro === 'tras' ? mix(f('tronco'), f('erro.tras.tronco'), macio(u)) : undefined,
    valgo: erro === 'joelho' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
    // no passo curto, o calcanhar da frente sai do chão conforme o joelho passa da ponta do pé
    calcanharDaFrente: curto ? f('erro.curto.calcanhar') * macio(u) : undefined,
  });
  const q: Quadro = { esq: e, prims: [chao(-70, 70, -90, 100)], pecas: [], fios: [], cargas: [], marcas: {} };
  const pecas: Peca[] = [];
  for (const k of ['R', 'L'] as Lado[]) {
    // o halter pende na vertical, com o cabo apontando para a frente (pegada neutra)
    const centro = e.lado[k].pegada,
      eixo: V3 = [0, 0, 1];
    q.prims.push(...halter(centro, eixo, 0.4));
    pecas.push({ t: 'halter', centro, eixo });
    q.cargas.push({ massa: f('carga'), pos: centro });
  }
  q.pecas = pecas;
  q.marcas = { halter: e.lado[FRENTE].pegada };
  return q;
}

export const afundoTras: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // os do afundo para trás aprovado e da biblioteca: quadríceps da perna da frente (principal); glúteo e adutores da
  // frente e quadríceps da de trás (secundários)
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's', 'quadriceps:L': 's' },
  trajetorias: { 'pé de trás': (q) => q.esq.lado.L.tornozelo, quadril: (q) => q.esq.pelve.o, halter: (q) => q.marcas.halter! },
};

// Crucifixo invertido curvado com halteres (em pé, sem banco), no motor novo (primeira animação deste exercício: até
// aqui ele era só cartão de texto). Os números vêm da ficha (../dados/movimentos/crucifixo-invertido-curvado.json).
// O corpo parado é o da remada curvada com halteres aprovada (./remada-curvada-halteres.ts, pelo núcleo do stiff
// ./dobrar-o-quadril.ts): pés na largura do quadril, joelhos levemente dobrados, o quadril vai para trás e o tronco
// inclina com a coluna neutra, com o centro de massa (corpo + halteres pendurados) sobre o meio do pé. Daí em diante o
// quadril e o tronco ficam parados e só os braços se mexem, no arco do crucifixo inverso no banco
// (./crucifixo-inverso.ts):
//  - a linha do ombro ao centro da mão, no mundo: de pendurada (quase na vertical) até perto da horizontal, para o
//    lado; ela gira em volta da direção para a frente, de modo que a mão sobe para o lado sem ir à frente nem para trás;
//  - o cotovelo dobrado sempre o mesmo tanto, apontando para fora (para onde o braço abre) e um pouco para trás;
//  - a mão com o polegar para a frente: embaixo, as palmas ficam uma para a outra; em cima, viradas para o chão;
//  - as escápulas: um pouco à frente no começo e só acompanhando o braço no fim (sem se juntar com força), com os
//    ombros baixos o tempo todo.
// Nos erros que movem o tronco (arredondar as costas, subir o tronco), a bacia e as pernas ficam paradas, como na
// remada curvada aprovada (./remada.ts).
import ficha from '../dados/movimentos/crucifixo-invertido-curvado.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, lerp, mix, mul, norm, perp } from '../vec';
import type { V3 } from '../vec';
import { halterNaMao } from './dobrar-o-cotovelo';
import { dobrarOQuadril } from './dobrar-o-quadril';
import { bracoNaLinha, dobrar } from './na-fita';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const HALTER = 'halterLeve';

/**
 * A linha do ombro à mão, no mundo, com `abre` graus a partir da vertical (0 = pendurada; 90 = na horizontal, para o
 * lado), e a direção para onde o braço abre (perpendicular a ela, para fora e para cima).
 */
function linha(k: Lado, abre: number): { dir: V3; sobe: V3 } {
  const s = sinal(k),
    a = abre * rad;
  return { dir: [s * Math.sin(a), -Math.cos(a), 0], sobe: [s * Math.cos(a), Math.sin(a), 0] };
}
/** Quanto o braço abre (graus da vertical), de u = 0 (pendurado) a 1 (perto da linha dos ombros). */
const abertura = (u: number) => mix(f('inicio.fora'), 90 - f('fim.abaixo'), u);

function braco(corpo: Corpo, k: Lado, u: number, erro?: string): PoseBraco {
  const { dir, sobe } = linha(k, abertura(u));
  const polo = norm([sobe[0], sobe[1], -f('cotovelo.paraTras')]);
  let umero: V3, antebraco: V3;
  if (erro === 'e4') {
    // o braço (do ombro ao cotovelo) abre como o certo, mas o cotovelo dobra e o antebraço fica pendurado embaixo dele:
    // a mão não sai de baixo do cotovelo (uma remada com os cotovelos abertos)
    const x = suave(u);
    const certo = bracoNaLinha(corpo, dir, polo, f('cotovelo'));
    umero = norm(lerp(certo.umero, linha(k, mix(abertura(0), 90 - f('erro.cotovelo.abaixo'), u)).dir, x));
    antebraco = norm(lerp(certo.antebraco, dobrar(umero, [0, -1, 0], f('erro.cotovelo.dobra')), x));
  } else ({ umero, antebraco } = bracoNaLinha(corpo, dir, polo, f('cotovelo')));
  // o polegar para a frente (o cabo do halter de frente para trás)
  const polegar = norm(perp([0, 0, 1], antebraco));
  const elev = f('escapula.elev') + (erro === 'e3' ? (f('erro.encolher.elev') - f('escapula.elev')) * suave(u) : 0);
  return { umero, antebraco, polo, mao: { polegar, forma: 'pegada', diam: obj(HALTER, 'caboDiam') }, elev, prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u) };
}

/** O centro da pegada de um braço dado por direções. */
function pegadaDe(e: Esq, k: Lado, b: PoseBraco): V3 {
  const c = e.corpo;
  return add(e.lado[k].ombro, add(mul(b.umero!, c.m('braco.comp')), mul(b.antebraco!, c.m('antebraco.comp') + c.m('mao.punhoAoCentroDaPegada'))));
}

interface Base {
  tronco: PoseTronco;
  pernas: Record<Lado, PosePerna>;
}
const BASES = new WeakMap<Corpo, Base>();
/** O corpo parado: o tronco inclinado e as pernas, com o centro de massa (com os halteres pendurados) sobre o meio do pé. */
function base(corpo: Corpo): Base {
  let b = BASES.get(corpo);
  if (b) return b;
  const D = dobrarOQuadril(corpo, {
    joelho: f('joelho'),
    tronco: f('tronco.inclinacao'),
    lombar: 0,
    toracica: 0,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    pesMeiaDistancia: f('pes.meiaDistancia'),
    apoio: 'dois',
    bracos(e) {
      const R = braco(corpo, 'R', 0),
        L = braco(corpo, 'L', 0);
      return { R, L, cargas: [{ massa: f('carga'), pos: pegadaDe(e, 'R', R) }, { massa: f('carga'), pos: pegadaDe(e, 'L', L) }] };
    },
  });
  const pe = (s: number): PosePerna => ({ pe: { bola: D.bola(s), dir: [0, 0, 1], calc: 0 }, polo: [0, 0, 1] });
  b = { tronco: D.e.pose, pernas: { R: pe(-1), L: pe(1) } };
  BASES.set(corpo, b);
  return b;
}

/** O tronco de cada quadro: parado, a não ser nos erros que o movem (a bacia e as pernas ficam). */
function troncoDo(corpo: Corpo, b: Base, u: number, erro?: string): PoseTronco {
  const tr: PoseTronco = { ...b.tronco };
  if (erro === 'e1') {
    // a coluna curva para cima: a lombar e a parte de cima das costas dobram e a bacia vira para trás o bastante para a
    // base do pescoço ficar na mesma altura (as costas fazem uma corcunda, como na remada curvada aprovada). Aqui as
    // costas ficam curvas a série toda ("a lombar perde a posição" não depende do braço): o quadro parado do erro é o de
    // braços pendurados, em que a vista de lado mostra as costas sem os halteres na frente
    const lo = f('erro.arredondar.lombar'),
      to = f('erro.arredondar.toracica');
    tr.lombar = (tr.lombar ?? 0) + lo;
    tr.toracica = (tr.toracica ?? 0) + to;
    tr.cervical = (tr.cervical ?? 0) - f('erro.arredondar.cervical');
    const alvo = resolverTronco(corpo, b.tronco).torax.o[1];
    const f0 = b.tronco.frente ?? 0;
    tr.frente = resolver1((x) => resolverTronco(corpo, { ...tr, frente: x }).torax.o[1] - alvo, f0 - lo - to - 20, f0 + 10, 30);
  }
  // o embalo: o tronco levanta em volta do quadril enquanto os braços abrem
  if (erro === 'e2') tr.frente = (tr.frente ?? 0) - f('erro.subir.tronco') * suave(u);
  return tr;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const b = base(corpo);
  const t = resolverTronco(corpo, troncoDo(corpo, b, u, erro));
  const e = resolverMembros(t, { R: braco(corpo, 'R', u, erro), L: braco(corpo, 'L', u, erro) }, b.pernas);
  const q: Quadro = { esq: e, prims: [chao(-90, 90, -100, 100)], pecas: [], fios: [], cargas: [], marcas: {}, vies: { maoR: 1, maoL: 1 } };
  for (const k of ['R', 'L'] as Lado[]) {
    // o halter pende da mão com o cabo de frente para trás
    const H = halterNaMao(e, k, HALTER);
    q.prims.push(...H.prims);
    q.pecas!.push(H.peca);
    q.cargas.push({ massa: f('carga'), pos: H.centro });
  }
  q.marcas.halter = e.lado.R.pegada;
  return q;
}

export const crucifixoInvertidoCurvado: Exercicio = {
  ficha: F,
  vistas: ['quinaTras', 'posterior'],
  quadro,
  // só o ombro de trás, sem secundário (achado 5 da revisão de anatomia; a ficha da técnica)
  papeis: { deltPost: 'p' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

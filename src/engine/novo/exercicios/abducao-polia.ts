// Abdução de quadril na polia com a tornozeleira, no motor novo (primeira animação deste exercício: até aqui ele era só
// cartão de texto). Os números vêm da ficha (../dados/movimentos/abducao-polia.json). O corpo é o da abdução em pé com
// elástico aprovada (./abducao-elastico.ts, sem mudar nada nela): em pé numa perna só (a esquerda, a de dentro), o tronco
// reto, a bacia parada, a perna direita (a de fora) estendida, com os dedos para a frente; o corpo anda um pouco para o
// lado do pé de apoio enquanto a perna abre, para o centro de massa continuar sobre ele. O que muda, pela ficha da
// técnica: de lado para a torre (ela fica à esquerda, +x), a mão esquerda segura a torre para equilibrar (fecha no
// trilho do carrinho, o tubo em pé na frente dela), a direita fica na cintura; a polia está no ponto mais baixo e a
// tornozeleira, na perna de fora. A volta cruza a perna de fora à frente da de dentro: a coxa vai um pouco à frente
// para o pé passar na frente do outro.
//
// O cabo sai da roldana baixa, passa na frente do pé de apoio e vai reto até a argola da tornozeleira; a pilha sobe o
// que o cabo anda dividido pela relação da máquina (./polia-no-tornozelo.ts).
import ficha from '../dados/movimentos/abducao-polia.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, dot, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { maosNaCintura } from './afundo-estatico';
import { caboNoTornozelo, cenaNoTornozelo, pernaLivreDireita, torreBaixa } from './polia-no-tornozelo';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

interface Pedido {
  abre: number;
  flexao: number;
  giro: number;
  /** Quanto a bacia sobe do lado direito (graus) e quanto o tronco cai a mais para a esquerda (graus). */
  bacia: number;
  tronco: number;
  sx: number;
  sz: number;
  y: number;
}
interface Base {
  y0: number;
  y1: number;
  sx0: number;
  sz0: number;
  sx1: number;
  sz1: number;
  joelhoLivre: number;
  /** O centro da pegada da mão esquerda, no trilho da torre. */
  pegada: V3;
  repouso: number;
}

const pernaDeApoio = (corpo: Corpo): PosePerna => ({
  pe: { bola: [corpo.m('quadril.meiaDistancia') + f('pe.apoio.paraFora'), 0, corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo')], dir: norm([0.12, 0, 1]) },
  polo: norm([0.1, 0, 1]),
});

/** O tronco do pedido: a bacia parada, ou inclinada (o lado direito sobe) em volta do quadril esquerdo. */
function tronco(corpo: Corpo, p: Pedido): Tronco {
  const reto = { pelve: [p.sx, p.y, p.sz] as V3, cervical: f('cervical'), cabeca: f('cabeca') };
  if (!p.bacia && !p.tronco) return resolverTronco(corpo, reto);
  const t0 = resolverTronco(corpo, reto);
  const hq = corpo.m('quadril.meiaDistancia');
  const quadrilL = add(t0.pelve.o, mul(t0.pelve.x, hq));
  const pose = { ...reto, lado: p.bacia, lombarLado: p.tronco * 0.5, toracicaLado: p.tronco * 0.5 };
  const x = resolverTronco(corpo, { ...pose, pelve: [0, 0, 0] }).pelve.x;
  return resolverTronco(corpo, { ...pose, pelve: sub(quadrilL, mul(x, hq)) });
}

/** A mão esquerda fechada no trilho da torre (um tubo em pé), o polegar para cima, o cotovelo para baixo e para trás. */
const MAO_NA_TORRE = (pegada: V3): PoseBraco => ({ pegada, polo: norm([0.2, -1, -0.5]), mao: { polegar: [0, 1, 0], forma: 'pegada', diam: f('torre.trilhoDiam') } });

function montar(corpo: Corpo, p: Pedido, joelhoLivre: number, pegada: V3): Esq {
  const t = tronco(corpo, p);
  return resolverMembros(t, { R: maosNaCintura(t, 'R', f('maos.naCintura.acima')), L: MAO_NA_TORRE(pegada) }, { R: pernaLivreDireita(t, { abre: p.abre, flexao: p.flexao, giro: p.giro, joelho: joelhoLivre, flexaoPlantar: f('pe.livre.flexaoPlantar') + p.flexao }), L: pernaDeApoio(corpo) });
}

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, add(a, mul(ab, t)));
}
/** O meio do pé de apoio, no chão. */
const meioDoApoio = (e: Esq): V3 => mul(add(e.lado.L.calcanhar, e.lado.L.bola), 0.5);
/** A torre com o trilho do carrinho na vertical da pegada: a frente dela (a roldana) virada para a pessoa (−x). */
function torreDa(pegada: V3): Torre {
  const prof = obj('torre', 'prof');
  // o trilho fica 0,08 × prof à frente do centro da base; a roldana, 0,14 × prof + o raio dela
  const xRoldana = pegada[0] + 0.08 * prof - (0.14 * prof + obj('torre', 'roldanaDiam') / 2);
  return torreBaixa([xRoldana, pegada[2]], [-1, 0, 0]);
}

function calibrar(corpo: Corpo): Base {
  return calibragem(corpo, 'abducao-polia:base', () => {
    const m = (id: string) => corpo.m(id);
    const hq = m('quadril.meiaDistancia');
    const b: Base = { y0: m('altura.trocanter') - 1, y1: m('altura.trocanter') - 1, sx0: hq, sz0: 0, sx1: hq, sz1: 0, joelhoLivre: 3, pegada: [70, f('torre.mao.altura'), 20], repouso: 0 };
    const ped = (u: number, sx: number, sz: number, y: number): Pedido => ({ abre: mix(f('abducao.inicio'), f('abducao.topo'), u), flexao: mix(f('flexao.inicio'), f('flexao.topo'), u), giro: 0, bacia: 0, tronco: 0, sx, sz, y });
    const altura = (u: number, sx: number, sz: number) => resolver1((y) => montar(corpo, ped(u, sx, sz, y), b.joelhoLivre, b.pegada).lado.L.ang.joelho - f('joelho.apoio'), m('altura.trocanter') - 12, m('altura.trocanter') + 4, 24);
    const sobre = (u: number, sx0: number, sz0: number, y0: number) => {
      let sx = sx0,
        sz = sz0,
        y = y0;
      const cm = (x: number, z: number) => {
        const e = montar(corpo, ped(u, x, z, y), b.joelhoLivre, b.pegada);
        return sub(centroDeMassa(e, 'homem'), meioDoApoio(e));
      };
      for (let i = 0; i < 3; i++) {
        sx = resolver1((x) => cm(x, sz)[0], 0, 25, 24);
        sz = resolver1((z) => cm(sx, z)[2], -15, 15, 24);
        y = altura(u, sx, sz);
      }
      return [sx, sz, y] as const;
    };
    /** O ponto mais baixo do pé direito (o que trabalha), com o joelho dele dobrado `j` graus, no começo (a perna cruzada). */
    const baixo = (j: number) => {
      const e = montar(corpo, ped(0, b.sx0, b.sz0, b.y0), j, b.pegada);
      // de que pé é cada ponto: do eixo (calcanhar à ponta) mais perto
      const doPe = (p: V3, k: 'R' | 'L') => aoSegmento(p, e.lado[k].calcanhar, e.lado[k].ponta);
      return Math.min(...pontosDoBoneco(e).filter((x) => x.parte === 'pe' && doPe(x.p, 'R') < doPe(x.p, 'L')).map((x) => x.p[1]));
    };
    for (let it = 0; it < 4; it++) {
      // a mão na torre: na altura da ficha, à frente do ombro, à distância que deixa o cotovelo no ângulo da ficha
      const o = montar(corpo, ped(0, b.sx0, b.sz0, b.y0), b.joelhoLivre, b.pegada).lado.L.ombro;
      const a = m('braco.comp'),
        c = m('antebraco.comp') + m('mao.punhoAoCentroDaPegada'),
        k = f('torre.cotovelo') * rad;
      const r = Math.sqrt(a * a + c * c + 2 * a * c * Math.cos(k));
      const dy = f('torre.mao.altura') - o[1],
        dz = f('torre.mao.aFrente');
      b.pegada = [o[0] + Math.sqrt(Math.max(1, r * r - dy * dy - dz * dz)), f('torre.mao.altura'), o[2] + dz];
      [b.sx0, b.sz0, b.y0] = sobre(0, b.sx0, b.sz0, b.y0);
      [b.sx1, b.sz1, b.y1] = sobre(1, b.sx1, b.sz1, b.y1);
      b.joelhoLivre = baixo(0) >= f('pe.livre.acimaDoChao') ? 0 : resolver1((j) => baixo(j) - f('pe.livre.acimaDoChao'), 0, 30, 24);
    }
    // o cabo em repouso: o mais curto do ciclo (a perna cruzada, no começo)
    const t = torreDa(b.pegada);
    let rep = 1e9;
    for (let i = 0; i <= 10; i++) rep = Math.min(rep, caboNoTornozelo(montar(corpo, pedido(b, i / 10), b.joelhoLivre, b.pegada), t).comp);
    b.repouso = rep;
    return b;
  });
}

function pedido(b: Omit<Base, 'repouso'>, u: number, erro?: string): Pedido {
  return {
    abre: mix(f('abducao.inicio'), f('abducao.topo'), u),
    flexao: mix(f('flexao.inicio'), f('flexao.topo'), u),
    giro: erro === 'gira' ? f('erro.gira.giro') * u : 0,
    bacia: erro === 'inclina' ? f('erro.inclina.bacia') * u : 0,
    tronco: erro === 'inclina' ? (f('erro.inclina.tronco') - f('erro.inclina.bacia')) * u : 0,
    sx: mix(b.sx0, b.sx1, u),
    sz: mix(b.sz0, b.sz1, u),
    y: mix(b.y0, b.y1, u),
  };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const b = calibrar(corpo);
  const e = montar(corpo, pedido(b, u, erro), b.joelhoLivre, b.pegada);
  const t = torreDa(b.pegada);
  const c = cenaNoTornozelo(e, t, b.repouso, f('pilha.folga'), f('quadro.torreAte'));
  return {
    esq: e,
    prims: [chao(-80, 110, -60, 110), ...c.prims],
    pecas: c.pecas,
    fios: c.fios,
    cargas: [],
    marcas: { ...c.marcas, trilho: b.pegada },
    vies: { maoL: 1 },
  };
}

export const abducaoPolia: Exercicio = {
  ficha: F,
  // de frente se vê a perna abrindo para o lado e cruzando na volta, o tronco reto, os dedos para a frente e o cabo; de
  // trás, o glúteo que trabalha
  vistas: ['frontal', 'posterior'],
  quadro,
  // glúteos (médio, mínimo e a parte de cima do máximo) do lado que abre: o desenho tem um glúteo só
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};

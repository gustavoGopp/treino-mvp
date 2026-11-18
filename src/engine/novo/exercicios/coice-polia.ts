// Coice na polia com a tornozeleira (extensão de quadril em pé), no motor novo (primeira animação deste exercício: até
// aqui ele era só cartão de texto). Os números vêm da ficha (../dados/movimentos/coice-polia.json). A ficha da técnica
// pede o coice em pé: de frente para a torre, as mãos apoiadas nela, o tronco levemente inclinado à frente, a polia no
// ponto mais baixo e a tornozeleira na perna que trabalha (a direita, perto de quem olha de lado). A perna vai de à
// frente do corpo até a coxa passar um pouco da linha do corpo, com o joelho quase estendido, sem arquear a lombar.
//
// O corpo segue a abdução na polia (./abducao-polia.ts) e a abdução com elástico aprovada: em pé numa perna só (a
// esquerda), o joelho de apoio quase estendido, a pelve parada no ponto em que o centro de massa cai sobre o meio do pé
// de apoio (calibrado no começo e no fim, e misturado no caminho). A inclinação do tronco vem da bacia, que gira à
// frente sobre o quadril de apoio, com a coluna neutra. As mãos fecham nos dois montantes da frente da torre; a torre
// fica à distância em que os cotovelos ficam um pouco dobrados. A perna que trabalha fica quase estendida o ciclo todo
// (o joelho a 8°): para o pé passar embaixo do quadril sem raspar o chão, a bacia sobe 4° do lado dela, em volta do
// quadril de apoio, e a coluna devolve a inclinação (o tórax fica reto); o pé fica com a sola perto da horizontal.
//
// O cabo sai da roldana baixa, na frente, e vai reto até a argola da tornozeleira, que fica do lado da faixa virado para
// ela; a pilha sobe o que o cabo anda dividido pela relação da máquina (./polia-no-tornozelo.ts).
import ficha from '../dados/movimentos/coice-polia.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { caboNoTornozelo, cenaNoTornozelo, pernaLivreDireita, torreBaixa } from './polia-no-tornozelo';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

interface Pedido {
  /** A coxa direita à frente (+) ou atrás (−) da bacia (graus), o joelho dela e a inclinação da bacia à frente. */
  flexao: number;
  joelho: number;
  frente: number;
  /** Flexão da lombar além da curva de repouso (negativo = arqueia). */
  lombar: number;
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
  /** O centro de cada pegada, nos montantes da frente da torre. `joelhoLivre`: quanto o joelho que trabalha dobra. */
  maos: Record<Lado, V3>;
  repouso: number;
}

const pernaDeApoio = (corpo: Corpo): PosePerna => ({
  pe: { bola: [corpo.m('quadril.meiaDistancia') + f('pe.apoio.paraFora'), 0, corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo')], dir: norm([0.08, 0, 1]) },
  polo: norm([0.08, 0, 1]),
});

/**
 * O tronco: a bacia inclinada à frente (`frente`) e subindo `bacia.sobe` graus do lado que trabalha, em volta do quadril
 * de apoio (que fica no lugar); a coluna devolve a inclinação de lado (metade na lombar, metade na torácica), e o tórax
 * fica reto.
 */
function tronco(corpo: Corpo, p: Pedido): Tronco {
  const sobe = f('bacia.sobe');
  const pose = { pelve: [p.sx, p.y, p.sz] as V3, frente: p.frente, lombar: p.lombar, cervical: f('cervical'), cabeca: f('cabeca') };
  if (!sobe) return resolverTronco(corpo, pose);
  const t0 = resolverTronco(corpo, pose);
  const hq = corpo.m('quadril.meiaDistancia');
  const quadrilL = add(t0.pelve.o, mul(t0.pelve.x, hq));
  const lado = { ...pose, lado: sobe, lombarLado: -sobe / 2, toracicaLado: -sobe / 2 };
  const x = resolverTronco(corpo, { ...lado, pelve: [0, 0, 0] }).pelve.x;
  return resolverTronco(corpo, { ...lado, pelve: sub(quadrilL, mul(x, hq)) });
}

/** Cada mão fechada num montante da torre (tubos em pé), o polegar para cima, o cotovelo para baixo e para fora. */
const MAO_NO_MONTANTE = (k: Lado, pegada: V3): PoseBraco => ({ pegada, polo: norm([sinal(k) * 0.5, -1, -0.3]), mao: { polegar: [0, 1, 0], forma: 'pegada', diam: f('torre.montanteDiam') } });

function montar(corpo: Corpo, p: Pedido, maos: Record<Lado, V3>): Esq {
  const t = tronco(corpo, p);
  // o pé fica com a sola perto da horizontal: estica quando a canela vai à frente e dobra para cima quando ela vai para
  // trás (o joelho dobrado), dentro do que o tornozelo dobra
  const canelaAtras = p.joelho - (p.flexao - p.frente);
  const pe = Math.max(-f('pe.livre.dorsiflexaoMax'), Math.min(f('pe.livre.flexaoPlantarMax'), f('pe.livre.flexaoPlantar') - canelaAtras));
  return resolverMembros(t, { R: MAO_NO_MONTANTE('R', maos.R), L: MAO_NO_MONTANTE('L', maos.L) }, { R: pernaLivreDireita(t, { abre: f('coxa.abre'), flexao: p.flexao, giro: 0, joelho: p.joelho, flexaoPlantar: pe }), L: pernaDeApoio(corpo) });
}

const meioDoApoio = (e: Esq): V3 => mul(add(e.lado.L.calcanhar, e.lado.L.bola), 0.5);
/** O meio dos dois montantes da frente da torre, na altura das mãos. */
const meioDasMaos = (maos: Record<Lado, V3>): V3 => mul(add(maos.R, maos.L), 0.5);
/** A torre com os montantes da frente nas mãos: a frente dela (a roldana) virada para a pessoa (−z). */
function torreDas(maos: Record<Lado, V3>): Torre {
  const prof = obj('torre', 'prof');
  const m = meioDasMaos(maos);
  // os montantes da frente ficam 0,12 × prof − 10 cm atrás do centro da base (para o lado da pessoa, à frente dele: 1,4
  // cm); a roldana, 0,14 × prof + o raio dela à frente do centro da base
  const zBase = m[2] + (-0.12 * prof + 10);
  return torreBaixa([m[0], zBase - (0.14 * prof + obj('torre', 'roldanaDiam') / 2)], [0, 0, -1]);
}

/** O que o movimento pede em `u` (sem o pé da bacia, que vem da calibração). */
function pose(u: number, erro?: string) {
  let flexao = mix(f('coxa.inicio'), f('coxa.fim'), u),
    lombar = 0,
    frente = f('tronco.inclina');
  if (erro === 'lombar') {
    flexao = mix(f('coxa.inicio'), f('erro.lombar.coxa'), u);
    lombar = f('erro.lombar.lombar') * u;
  }
  if (erro === 'embalar') frente = f('tronco.inclina') + f('erro.embalar.tronco') * u;
  return { flexao, lombar, frente };
}

function calibrar(corpo: Corpo): Base {
  return calibragem(corpo, 'coice-polia:base', () => {
    const m = (id: string) => corpo.m(id);
    const hq = m('quadril.meiaDistancia');
    const b: Base = { y0: m('altura.trocanter') - 1, y1: m('altura.trocanter') - 1, sx0: hq, sz0: 0, sx1: hq, sz1: 0, joelhoLivre: 8, maos: { R: [-12.5, f('torre.mao.altura'), 60], L: [12.5, f('torre.mao.altura'), 60] }, repouso: 0 };
    const ped = (u: number, sx: number, sz: number, y: number, j = joelhoNoCaminho(u, b.joelhoLivre)): Pedido => ({ ...pose(u), joelho: j, sx, sz, y });
    const altura = (u: number, sx: number, sz: number) => resolver1((y) => montar(corpo, ped(u, sx, sz, y), b.maos).lado.L.ang.joelho - f('joelho.apoio'), m('altura.trocanter') - 12, m('altura.trocanter') + 4, 24);
    const sobre = (u: number, sx0: number, sz0: number, y0: number) => {
      let sx = sx0,
        sz = sz0,
        y = y0;
      const cm = (x: number, z: number) => {
        const e = montar(corpo, ped(u, x, z, y), b.maos);
        return sub(centroDeMassa(e, 'homem'), meioDoApoio(e));
      };
      for (let i = 0; i < 3; i++) {
        sx = resolver1((x) => cm(x, sz)[0], 0, 25, 24);
        sz = resolver1((z) => cm(sx, z)[2], -25, 15, 24);
        y = altura(u, sx, sz);
      }
      return [sx, sz, y] as const;
    };
    /** O ponto mais baixo do pé direito no ciclo, com o joelho livre dobrado `j` graus. */
    const baixo = (j: number) => {
      let min = 1e9;
      for (let i = 0; i <= 8; i++) {
        const u = i / 8;
        const e = montar(corpo, ped(u, mix(b.sx0, b.sx1, u), mix(b.sz0, b.sz1, u), mix(b.y0, b.y1, u), joelhoNoCaminho(u, j)), b.maos);
        // os pontos do pé direito: do lado de fora do meio dos dois tornozelos (os pés passam lado a lado)
        const meio = (e.lado.R.tornozelo[0] + e.lado.L.tornozelo[0]) / 2;
        for (const x of pontosDoBoneco(e)) if (x.parte === 'pe' && x.p[0] < meio) min = Math.min(min, x.p[1]);
      }
      return min;
    };
    for (let it = 0; it < 4; it++) {
      // as mãos nos montantes: na altura da ficha, a meia largura da coluna para cada lado do meio dos ombros, à frente
      // deles à distância que deixa o cotovelo no ângulo da ficha
      const e = montar(corpo, ped(0, b.sx0, b.sz0, b.y0), b.maos);
      const a = m('braco.comp'),
        c = m('antebraco.comp') + m('mao.punhoAoCentroDaPegada'),
        k = f('torre.cotovelo') * rad;
      const r = Math.sqrt(a * a + c * c + 2 * a * c * Math.cos(k));
      const meia = obj('torre', 'colunaLarg') / 2 - 2.5;
      const xm = (e.lado.R.ombro[0] + e.lado.L.ombro[0]) / 2;
      const o = e.lado.L.ombro;
      const dx = xm + meia - o[0],
        dy = f('torre.mao.altura') - o[1];
      const z = o[2] + Math.sqrt(Math.max(1, r * r - dx * dx - dy * dy));
      b.maos = { R: [xm - meia, f('torre.mao.altura'), z], L: [xm + meia, f('torre.mao.altura'), z] };
      [b.sx0, b.sz0, b.y0] = sobre(0, b.sx0, b.sz0, b.y0);
      [b.sx1, b.sz1, b.y1] = sobre(1, b.sx1, b.sz1, b.y1);
      b.joelhoLivre = baixo(f('joelho.livre')) >= f('pe.livre.acimaDoChao') ? f('joelho.livre') : resolver1((j) => baixo(j) - f('pe.livre.acimaDoChao'), f('joelho.livre'), f('joelho.maximo'), 24);
    }
    const t = torreDas(b.maos);
    let rep = 1e9;
    for (let i = 0; i <= 10; i++) rep = Math.min(rep, caboNoTornozelo(montar(corpo, pedido(b, i / 10), b.maos), t).comp);
    b.repouso = rep;
    return b;
  });
}

/**
 * O joelho da perna que trabalha: quase estendido e parado o ciclo todo (`meio`: o que a calibração achou, entre
 * `joelho.livre` e `joelho.maximo`, para o pé passar sem raspar o chão embaixo do quadril).
 */
function joelhoNoCaminho(_u: number, meio: number): number {
  return meio;
}

function pedido(b: Omit<Base, 'repouso'>, u: number, erro?: string): Pedido {
  const p = pose(u, erro);
  const j = joelhoNoCaminho(u, b.joelhoLivre);
  return { ...p, joelho: erro === 'joelho' ? mix(j, f('erro.joelho.joelho'), u) : j, sx: mix(b.sx0, b.sx1, u), sz: mix(b.sz0, b.sz1, u), y: mix(b.y0, b.y1, u) };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const b = calibrar(corpo);
  const e = montar(corpo, pedido(b, u, erro), b.maos);
  const t = torreDas(b.maos);
  const c = cenaNoTornozelo(e, t, b.repouso, f('pilha.folga'), f('quadro.torreAte'));
  return {
    esq: e,
    prims: [chao(-70, 70, -90, 120), ...c.prims],
    pecas: c.pecas,
    fios: c.fios,
    cargas: [],
    marcas: { ...c.marcas, 'montante.R': b.maos.R, 'montante.L': b.maos.L },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const coicePolia: Exercicio = {
  ficha: F,
  // de lado se vê a perna indo para trás com o joelho quase estendido, a lombar parada e o cabo; de três quartos por
  // trás, o glúteo que trabalha
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // glúteos, do lado que trabalha: o cartão do app (a ficha da técnica propõe os posteriores como secundário; a biblioteca
  // não os lista, e o pedido fica em ../../../../docs/revisoes/animacao-nova/lote-C3/pedidos-avulsos.md)
  papeis: { 'gluteo:R': 'p' },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};

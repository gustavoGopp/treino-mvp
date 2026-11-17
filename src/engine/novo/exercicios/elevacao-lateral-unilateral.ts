// Elevação lateral unilateral com halter, segurando num apoio, no motor novo (primeira animação deste exercício: até
// aqui ele era só cartão de texto). Os números vêm da ficha (../dados/movimentos/elevacao-lateral-unilateral.json).
// Em pé, de lado para a parede (ela fica à esquerda, +x), a mão esquerda espalmada nela, os dedos para cima, só para
// equilibrar (como na abdução em pé com elástico, ./abducao-elastico.ts, e com a peça ../pecas-de-cena/parede-ao-lado.ts);
// o tronco fica inclinado para longe da parede, para o lado do braço que trabalha (o direito), parado a série toda. O
// braço que sobe é o da elevação com halteres aprovada (./elevar-o-braco.ts: o úmero no plano da escápula, o cotovelo
// levemente dobrado e conduzindo, a pegada neutra), com o halter leve na mão.
// O que se resolve, em vez de receber pronto:
//  - a inclinação do tronco: a fração da ficha na bacia (hoje nenhuma: a bacia fica nivelada, senão um joelho dobra e o
//    outro trava) e o resto na coluna (lombar e costas de cima, meio a meio), com o pescoço na linha; o ângulo é medido
//    no eixo do tórax, visto de frente;
//  - onde fica a bacia: na altura que dá a flexão média dos joelhos da ficha e, de lado e de frente para trás, onde o
//    centro de massa (corpo + halter, com o braço no meio do caminho) cai entre os pés, sobre o meio do pé: a mão
//    livre só equilibra, não segura o peso do corpo. Daí em diante a bacia fica parada;
//  - embaixo, a elevação do braço em que o halter fica à folga pedida da coxa; em cima, a que deixa o cotovelo na
//    altura do ombro (com o tronco inclinado para o lado do braço, ela passa da da elevação com halteres);
//  - a parede: onde o punho esquerdo chega com o cotovelo dobrado o que a ficha pede, ao lado do ombro.
// No erro "jogar o tronco", a inclinação muda com o braço (a bacia e os pés ficam; a mão segue na parede).
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/elevacao-lateral-unilateral.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import { paredeAoLado } from '../pecas-de-cena/parede-ao-lado';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, norm } from '../vec';
import type { Ref, V3 } from '../vec';
import { folgaDasPernas } from './dobrar-o-quadril';
import type { Esfera } from './dobrar-o-quadril';
import { noPlano } from './elevar-o-braco';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const HALTER = 'halterLeve';

interface Pedido {
  /** A elevação do braço direito no tórax, a partir do braço pendurado, e o plano dele (graus). */
  a: number;
  plano: number;
  /** A clavícula direita além do ritmo normal (graus; o erro "encolher"). */
  elev: number;
  /** A inclinação do tronco para longe da parede (graus; para a direita, o lado do braço que sobe). */
  lado: number;
}
interface Calibrado {
  pelve: V3;
  a0: number;
  a1: number;
  punho: V3;
  xParede: number;
}

/** Os giros que inclinam o tronco `g` graus para a direita: uma parte na bacia (o quadril esquerdo sobe), o resto na coluna. */
function troncoCom(corpo: Corpo, pelve: V3, g: number): Tronco {
  const bacia = g * f('tronco.lado.naBacia'),
    coluna = g - bacia;
  return resolverTronco(corpo, { pelve, frente: f('tronco'), lado: -bacia, lombarLado: -coluna / 2, toracicaLado: -coluna / 2, cervical: f('cervical'), cabeca: f('cabeca') });
}
/** A inclinação do tronco para a direita, vista de frente (graus): a do eixo do tórax, da bacia ao pescoço. */
const inclinacaoDe = (t: Tronco) => Math.atan2(-t.torax.y[0], t.torax.y[1]) / rad;
/**
 * Quanto os giros somados rendem de inclinação vista de frente (com a bacia inclinada à frente, um pouco menos que a
 * soma): a inclinação pedida é dividida por isto, para o tronco ficar no ângulo da ficha.
 */
const RENDE = new WeakMap<Corpo, number>();
function rende(corpo: Corpo): number {
  let r = RENDE.get(corpo);
  if (r === undefined) RENDE.set(corpo, (r = inclinacaoDe(troncoCom(corpo, [0, 100, 0], f('tronco.lado'))) / f('tronco.lado')));
  return r;
}
/** O tronco inclinado `lado` graus para a direita (vista de frente), para longe da parede. */
const tronco = (corpo: Corpo, pelve: V3, lado: number): Tronco => troncoCom(corpo, pelve, lado / rende(corpo));

/** O braço direito, como em ./elevar-o-braco.ts: o úmero no plano, o cotovelo dobrado e conduzindo, a pegada neutra. */
function bracoQueSobe(T: Ref, p: Pedido): PoseBraco {
  const s = sinal('R');
  const n = noPlano(p.a, p.plano);
  const esp = (v: V3): V3 => dirRef(T, [s * v[0], v[1], v[2]]);
  const umero = esp(n.umero);
  const cot = f('cotovelo') * rad;
  const giro = f('cotovelo.giro') * Math.sin(Math.max(0, p.a) * rad) * rad;
  const dobra = norm(add(mul(esp(n.frente), Math.cos(giro)), mul(esp(n.sobe), -Math.sin(giro))));
  const antebraco = norm(add(mul(umero, Math.cos(cot)), mul(dobra, Math.sin(cot))));
  const pg = giro - f('polegar.paraCima') * Math.sin(Math.max(0, p.a) * rad) * rad;
  const polegar = norm(add(mul(esp(n.frente), Math.cos(pg)), mul(esp(n.sobe), -Math.sin(pg))));
  return { umero, antebraco, polo: mul(dobra, -1), mao: { polegar, forma: 'pegada', diam: obj(HALTER, 'caboDiam') }, elev: p.elev };
}

/** A mão esquerda espalmada na parede, os dedos para cima, o cotovelo para baixo (a de ./abducao-elastico.ts). */
const maoNaParede = (punho: V3): PoseBraco => ({ punho, polo: norm([0.2, -1, -0.4]), mao: { polegar: [0, 0, 1], dedos: [0, 1, 0], forma: 'aberta' } });

/** Os pés na largura do quadril, apontando para a frente, inteiros no chão. */
function pernas(corpo: Corpo): Record<Lado, PosePerna> {
  const w = f('pes.meiaDistancia'),
    z = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
  const pe = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, z], dir: [0, 0, 1], calc: 0 }, polo: [0, 0, 1] });
  return { R: pe('R'), L: pe('L') };
}

function montar(corpo: Corpo, pelve: V3, p: Pedido, punho: V3): Esq {
  const t = tronco(corpo, pelve, p.lado);
  return resolverMembros(t, { R: bracoQueSobe(t.torax, p), L: maoNaParede(punho) }, pernas(corpo));
}

/** O halter (o cabo na direção do polegar) como esferas, para a folga até as pernas (o de ./elevar-o-braco.ts). */
function esferasDoHalter(e: Esq): Esfera[] {
  const L = e.lado.R;
  const eixo = mul(L.mao.x, sinal('R'));
  const ra = obj(HALTER, 'cabecaLargura') / 2,
    c0 = obj(HALTER, 'caboComp') / 2,
    c1 = obj(HALTER, 'comp') / 2;
  const out: Esfera[] = [];
  for (const s of [-1, 1]) for (const fr of [0.2, 0.5, 0.8]) out.push({ c: add(L.pegada, mul(eixo, s * (c0 + (c1 - c0) * fr))), r: ra });
  return out;
}

const pedidoBase = (a: number): Pedido => ({ a, plano: f('plano'), elev: 0, lado: f('tronco.lado') });
const cargaNa = (e: Esq) => [{ massa: f('carga'), pos: e.lado.R.pegada }];

/** O que vem calculado de antemão para o corpo: a bacia, a elevação do braço embaixo e em cima, a mão e a parede. */
function calibrar(corpo: Corpo): Calibrado {
  return calibragem(corpo, `${F.id}:calibrar`, () => {
    const m = (id: string) => corpo.m(id);
    const meioDoPe = m('pe.calcanharABola') - m('pe.calcanharAoTornozelo') - m('pe.calcanharABola') / 2;
    const c: Calibrado = { pelve: [0, m('altura.trocanter'), 0], a0: 5, a1: 100, punho: [45, 140, 0], xParede: 50 };
    const joelhos = (e: Esq) => (e.lado.R.ang.joelho + e.lado.L.ang.joelho) / 2;
    for (let i = 0; i < 5; i++) {
      const meio = pedidoBase(mix(c.a0, c.a1, 0.5));
      const em = (p: V3) => montar(corpo, p, meio, c.punho);
      // a altura: a média dos joelhos no ângulo da ficha
      const [x0, , z0] = c.pelve;
      const y = resolver1((yy) => joelhos(em([x0, yy, z0])) - f('joelho'), m('altura.trocanter') - 12, m('altura.trocanter') + 6, 26);
      // de lado e de frente para trás: o centro de massa entre os pés (x = 0) e sobre o meio do pé
      const cm = (p: V3) => centroDeMassa(em(p), 'homem', cargaNa(em(p)));
      const x = resolver1((xx) => cm([xx, y, z0])[0], -25, 25, 26);
      const z = resolver1((zz) => cm([x, y, zz])[2] - meioDoPe, -25, 25, 26);
      c.pelve = [x, y, z];
      // a mão na parede: o punho ao lado do ombro esquerdo, à distância que deixa o cotovelo no ângulo da ficha
      const o = em(c.pelve).lado.L.ombro;
      const ab = m('braco.comp'),
        an = m('antebraco.comp'),
        k = f('parede.cotovelo') * rad;
      const r = Math.sqrt(ab * ab + an * an + 2 * ab * an * Math.cos(k));
      const dy = f('parede.mao.acimaDoOmbro'),
        dz = f('parede.mao.aFrente');
      c.punho = [o[0] + Math.sqrt(Math.max(1, r * r - dy * dy - dz * dz)), o[1] + dy, o[2] + dz];
      c.xParede = c.punho[0] + m('raio.punho') * 0.85;
      // embaixo: o halter à folga da coxa; em cima: o cotovelo na altura do ombro
      const pv = c.pelve,
        pu = c.punho;
      const e = (a: number) => montar(corpo, pv, pedidoBase(a), pu);
      c.a0 = resolver1((a) => folgaDasPernas(e(a), esferasDoHalter(e(a))) - f('carga.folga'), -30, 45, 24);
      c.a1 = resolver1((a) => {
        const L = e(a).lado.R;
        return L.cotovelo[1] - L.ombro[1] - f('braco.topo.acimaDoOmbro');
      }, 70, 140, 24);
    }
    return c;
  });
}

function pedido(corpo: Corpo, u: number, erro?: string): Pedido {
  const c = calibrar(corpo);
  const p: Pedido = { a: mix(c.a0, c.a1, u), plano: mix(f('plano.baixo'), f('plano'), suave(u)), elev: 0, lado: f('tronco.lado') };
  if (erro === 'encolher') p.elev = f('erro.encolher.elev') * u;
  if (erro === 'embalo') {
    p.lado = mix(f('erro.embalo.inicio'), f('erro.embalo.fim'), suave(u));
    // embaixo, com o tronco caído a mais para o lado do halter, o braço pende do mesmo jeito no mundo (no tórax, ele
    // abre o que o tronco caiu a mais): sem isso o halter entrava na coxa
    p.a = mix(c.a0 + f('erro.embalo.inicio') - f('tronco.lado'), c.a1, u);
  }
  if (erro === 'alto') p.a = mix(c.a0, c.a1 + f('erro.alto.mais'), u);
  return p;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = montar(corpo, c.pelve, pedido(corpo, u, erro), c.punho);
  const L = e.lado.R;
  // o halter pende da mão, com o cabo na direção do polegar
  const centro = L.pegada,
    eixo = mul(L.mao.x, sinal('R'));
  return {
    esq: e,
    prims: [chao(-110, 90, -70, 90), ...halter(centro, eixo, 0.4, HALTER)],
    pecas: [paredeAoLado(c.xParede, 1, e.lado.L.ombro[2]), { t: 'halter', centro, eixo, objeto: HALTER }],
    fios: [],
    cargas: cargaNa(e),
    marcas: { halter: centro, parede: [c.xParede, 0, 0], maoNaParede: e.lado.L.punho },
    vies: { maoR: 1 },
  };
}

export const elevacaoLateralUnilateral: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // a lateral do ombro direito (principal, sem secundário: a ficha da técnica e a biblioteca) e a frente do ombro
  // listrada (só ajuda), como na elevação lateral unilateral na polia aprovada
  papeis: { 'deltLat:R': 'p', 'deltAnt:R': 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

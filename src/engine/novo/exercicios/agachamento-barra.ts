// Agachamento livre com barra (profundo), no motor novo. Os números vêm da ficha
// (../dados/movimentos/agachamento-barra.json). O movimento é o dos agachamentos aprovados (./agachar.ts): a posição do
// quadril sai da flexão do joelho pedida e do centro de massa (corpo + barra) sobre o meio do pé. O que muda aqui:
//  - a barra fica presa ao tronco, no alto das costas, sobre o trapézio, encostada na pele (a distância até a pele sai
//    da superfície do Boneco, uma vez por corpo);
//  - a inclinação do tronco não é escolhida: o cartão pede que "o tronco incline o necessário para a barra ficar sobre o
//    meio do pé". Com o centro de massa também sobre o meio do pé, sobra uma inclinação só para cada flexão do joelho; ela
//    é calculada numa tabela de joelhos (uma vez por corpo) e lida com uma curva suave entre os pontos;
//  - as mãos seguram a barra um pouco mais abertas que os ombros, com os cotovelos para baixo e para trás;
//  - o suporte fica à frente, com os ganchos na altura do meio do peito e os pinos logo abaixo do ponto mais baixo da
//    barra; a pessoa está dois passos atrás dos ganchos.
import ficha from '../dados/movimentos/agachamento-barra.json';
import { calibragem } from '../calibragens';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca } from '../pecas';
import { barraLonga, massaDaBarra } from '../pecas-de-cena/barra-longa';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { bercoAFrente, furoAbaixo, furoMaisPerto, suporte } from '../pecas-de-cena/suporte';
import type { Suporte } from '../pecas-de-cena/suporte';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dirRef, mix, noRef } from '../vec';
import type { V3 } from '../vec';
import { agachar } from './agachar';
import type { Agachado } from './agachar';
import { folgaDaBarra, primeiroToque, raioDaBarra } from './barra-nas-costas';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const ANILHAS: IdAnilha[] = ['anilha20'];
if (obj('anilha20', 'massa') !== f('carga.anilhas')) throw new Error('agachamento-barra: a anilha da ficha não é a da tabela');
const massa = () => massaDaBarra(ANILHAS);
/** As partes do corpo em que a barra encosta (ou não pode entrar). */
const COSTAS = ['tronco', 'pescoco', 'cabeca'];

interface Pedido {
  joelho: number;
  tronco: number;
  lombar: number;
  valgo: number;
  calcanhar: number;
}
/** O agachamento com a barra no ponto `barra` (y e z no referencial do tórax). */
function agachado(corpo: Corpo, p: Pedido, barra: [number, number]): Agachado & { centro: V3 } {
  let centro: V3 = [0, 0, 0];
  const r = agachar(corpo, {
    joelho: p.joelho,
    tronco: p.tronco,
    lombar: p.lombar,
    valgo: p.valgo,
    calcanhar: p.calcanhar,
    apoio: p.calcanhar > 4 ? 'bola' : 'meio',
    pesMeiaDistancia: f('pes.meiaDistancia'),
    pesParaFora: f('pes.paraFora'),
    bracos(t) {
      const T = t.torax;
      centro = noRef(T, [0, barra[0], barra[1]]);
      const braco = (k: Lado): PoseBraco => {
        const s = sinal(k);
        // a mão fecha na barra por trás, a palma para a frente e o polegar para dentro; o cotovelo aponta para baixo e
        // para trás
        return { pegada: noRef(T, [s * f('pegada.meia'), barra[0], barra[1]]), polo: dirRef(T, [s * 0.35, -1, -0.55]), mao: { polegar: dirRef(T, [-s, 0, 0]), forma: 'pegada', diam: obj('barraLonga', 'pegadaDiam') } };
      };
      return { R: braco('R'), L: braco('L'), carga: { massa: massa(), pos: centro } };
    },
  });
  return { ...r, centro };
}
const meioDoPe = (r: Agachado, corpo: Corpo) => r.bola(1)[2] - corpo.m('pe.calcanharABola') / 2;

/**
 * A barra no referencial do tórax: `barra.abaixoDaC7` abaixo da base do pescoço e encostada na pele das costas (folga 0
 * até a pele do tronco, do pescoço e da cabeça). Em pé, com as mãos na barra; duas passadas (a pele do ombro muda com o
 * braço).
 */
function barraNoTorax(corpo: Corpo): [number, number] {
  return calibragem(corpo, 'agachamento-barra:barra-no-torax', () => {
    const y = -f('barra.abaixoDaC7');
    let z = -12;
    for (let i = 0; i < 2; i++) {
      const zi = z;
      const e = agachado(corpo, { joelho: f('joelho.cima'), tronco: 10, lombar: 0, valgo: 0, calcanhar: 0 }, [y, zi]).e;
      z = primeiroToque((zz) => folgaDaBarra(e, noRef(e.torax, [0, y, zz]), e.torax.x, COSTAS, f('pegada.meia') - 4).folga, -25, 2);
    }
    return [y, z];
  });
}

/** Os joelhos da tabela da inclinação do tronco: de em cima até o meio agachamento do erro e até embaixo. */
const JOELHOS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => mix(f('joelho.cima'), f('joelho.baixo'), i / 8));
/**
 * A inclinação do tronco que deixa a barra sobre o meio do pé, para cada joelho da tabela (com o centro de massa sobre o
 * meio do pé, pela conta do núcleo). Uma vez por corpo.
 */
function tabelaDoTronco(corpo: Corpo): number[] {
  return calibragem(corpo, 'agachamento-barra:tronco', () => {
    const barra = barraNoTorax(corpo);
    return JOELHOS.map((joelho) =>
      resolver1(
        (tronco) => {
          const r = agachado(corpo, { joelho, tronco, lombar: 0, valgo: 0, calcanhar: 0 }, barra);
          return r.centro[2] - meioDoPe(r, corpo);
        },
        -10,
        70,
        22,
      ),
    );
  });
}
/** A inclinação do tronco para um joelho qualquer: a curva suave (Catmull-Rom) pelos pontos da tabela. */
function troncoPara(corpo: Corpo, joelho: number): number {
  const T = tabelaDoTronco(corpo);
  const n = JOELHOS.length - 1;
  const x = Math.max(0, Math.min(n, ((joelho - JOELHOS[0]!) / (JOELHOS[n]! - JOELHOS[0]!)) * n));
  const i = Math.min(n - 1, Math.floor(x)),
    t = x - i;
  const p = (k: number) => T[Math.max(0, Math.min(n, k))]!;
  const [a, b, c, d] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
  return 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
}

/** O suporte: os montantes à frente da pessoa, os ganchos na altura do meio do peito, os pinos logo abaixo da barra embaixo. */
function oSuporte(corpo: Corpo): Suporte {
  return calibragem(corpo, 'agachamento-barra:suporte', () => {
    const barra = barraNoTorax(corpo);
    const embaixo = agachado(corpo, { joelho: f('joelho.baixo'), tronco: troncoPara(corpo, f('joelho.baixo')), lombar: 0, valgo: 0, calcanhar: 0 }, barra);
    const z = meioDoPe(embaixo, corpo) + f('suporte.passos');
    return { base: [0, 0, z] as V3, paraAPessoa: [0, 0, -1] as V3, gancho: furoMaisPerto(corpo.m('altura.peito')), pino: furoAbaixo(embaixo.centro[1] - raioDaBarra() - f('pinos.folga')) };
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const ramp = Math.sin((Math.PI / 2) * Math.min(1, u * 1.25));
  const joelho = mix(f('joelho.cima'), f(erro === 'raso' ? 'erro.raso.joelho' : 'joelho.baixo'), u);
  const p: Pedido = {
    joelho,
    tronco: troncoPara(corpo, joelho) + (erro === 'lombar' ? f('erro.lombar.tronco') * u : 0),
    // no erro, a bacia gira para trás e a lombar dobra (embaixo é onde mais aparece)
    lombar: erro === 'lombar' ? f('erro.lombar.lombar') * u : 0,
    valgo: erro === 'valgo' ? f('erro.valgo.joelho') * ramp : 0,
    calcanhar: erro === 'calcanhar' ? f('erro.calcanhar.sobe') * ramp : 0,
  };
  const r = agachado(corpo, p, barraNoTorax(corpo));
  const e = r.e;
  const eixo = e.torax.x;
  const S = oSuporte(corpo);
  const su = suporte(S);
  const barra = barraLonga({ centro: r.centro, eixo, anilhas: ANILHAS }, { pontasAtras: 200 });
  const pecas: Peca[] = [su.estrutura, su.ganchos, barra.peca];
  const zBerco = S.base[2] - bercoAFrente();
  return {
    esq: e,
    prims: [chao(-80, 80, -80, 110), ...su.prims, ...barra.prims],
    pecas,
    fios: [],
    cargas: [{ massa: massa(), pos: r.centro }],
    marcas: { barra: r.centro, meioDoPe: [0, 0, meioDoPe(r, corpo)], gancho: [0, S.gancho, zBerco], pino: [0, S.pino, S.base[2]] },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const agachamentoBarra: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // a biblioteca: quadríceps (principal); glúteos e adutores (secundários), como os agachamentos aprovados
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { barra: (q) => q.marcas.barra!, quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};

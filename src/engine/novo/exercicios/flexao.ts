// Flexão de braço, no motor novo. Mãos e pontas dos pés ficam presas no chão; o corpo gira inteiro em torno das
// pontas dos pés. O ângulo da prancha em cima sai do cotovelo pedido pela ficha, e embaixo, da folga do peito ao chão.
import ficha from '../dados/movimentos/flexao.json';
import { corpo3d } from '../corpo3d';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const CACHE = new WeakMap<Corpo, { cima: number; baixo: number; zMao: number }>();

/** O corpo em prancha, inclinado `beta` graus acima do chão, com as mãos em (±xMao, zMao). */
function prancha(corpo: Corpo, beta: number, zMao: number, o: { cot?: number; quadril?: number; retr?: number } = {}): Esq {
  const m = (id: string) => corpo.m(id);
  const w = f('pes.meiaDistancia'),
    L = m('coxa.comp') + m('perna.comp');
  // pé: os dedos no chão, o resto do pé levantado; o tornozelo fica perto do neutro
  const calc = 90 - f('tornozelo.dorsiflexao') - beta;
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, 0], dir: [0, 0, 1], calc }, polo: [0, -1, 0.2] });
  const pernas = { R: perna('R'), L: perna('L') };
  // tornozelo (sai do pé) → quadril, ao longo da linha do corpo, com o joelho quase reto
  const d = Math.sqrt(m('coxa.comp') ** 2 + m('perna.comp') ** 2 + 2 * m('coxa.comp') * m('perna.comp') * Math.cos(f('joelho') * rad));
  void L;
  const hM = m('altura.maleolo'),
    r = m('pe.calcanharABola') - m('pe.calcanharAoTornozelo');
  const torn: V3 = [0, hM * Math.cos(calc * rad) + r * Math.sin(calc * rad), -(r * Math.cos(calc * rad)) + hM * Math.sin(calc * rad)];
  const queda = o.quadril ?? 0;
  const pelve: V3 = [0, torn[1] + d * Math.sin((beta - queda * 0.5) * rad), torn[2] + d * Math.cos((beta - queda * 0.5) * rad)];
  const t = resolverTronco(corpo, { pelve, frente: 90 - beta + queda * 0.4, lombar: -queda, cervical: -4, cabeca: -6 });
  const xMao = m('ombro.meiaDistancia') + f('maos.alemDoOmbro');
  const a = (o.cot ?? f('cotovelos.doTronco')) * rad;
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return { punho: [s * xMao, m('raio.punho') * 0.85, zMao - m('mao.palma') * 0.45], polo: [s * Math.sin(a), 0.25, -Math.cos(a)], mao: { polegar: [-s, 0, 0.25], dedos: [s * 0.08, 0, 1], forma: 'aberta' }, prot: -(o.retr ?? 0) };
  };
  return resolverMembros(t, { R: braco('R'), L: braco('L') }, pernas);
}
/** Altura do ponto mais baixo da frente do tronco (o peito), em cm. */
function peitoAoChao(e: Esq): number {
  const tronco = corpo3d(e).partes.find((p) => p.id === 'tronco')!.volumes[0]!;
  return Math.min(...tronco.aneis.slice(Math.floor(tronco.aneis.length / 2)).map((an) => an.c[1] + an.z[1] * an.f));
}
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  // 1) embaixo: a folga do peito ao chão define o ângulo; as mãos ficam na linha do meio do peito
  const zOmbro = (beta: number) => prancha(corpo, beta, 100).lado.L.ombro[2];
  const baixo = resolver1((b) => peitoAoChao(prancha(corpo, b, 100)) - f('peito.aoChao'), 0, 30);
  const zMao = zOmbro(baixo) - f('maos.abaixoDoOmbro');
  // 2) em cima: o cotovelo quase estendido define o ângulo
  const cima = resolver1((b) => f('cotovelo.cima') - prancha(corpo, b, zMao).lado.L.ang.cotovelo, baixo, 45);
  c = { cima, baixo, zMao };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const fundo = erro === 'curta' ? f('erro.curta.fracao') : 1;
  const beta = mix(c.cima, c.baixo, u * fundo);
  const e = prancha(corpo, beta, c.zMao, { cot: erro === 'cot' ? mix(f('cotovelos.doTronco'), f('erro.cot.doTronco'), Math.min(1, u * 1.6)) : undefined, quadril: erro === 'quadril' ? f('erro.quadril.queda') * (0.55 + 0.45 * u) : 0, retr: f('escapula.retracaoEmbaixo') * u });
  return { esq: e, prims: [chao(-80, 80, -60, 200)], fios: [], cargas: [], marcas: {} };
}

export const flexao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  trajetorias: { peito: (q) => q.esq.torax.o, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

// As flexões de braço (a flexão, com as mãos juntas, com os pés elevados, com o elástico e as próximas): o que as
// variações têm em comum. Mãos e pontas dos pés ficam presas (no chão ou num apoio); o corpo gira inteiro em torno
// das pontas dos pés. O ângulo da prancha em cima sai do cotovelo pedido pela ficha, e embaixo, da folga do peito ao
// chão. Cada variação traz a sua ficha de movimento (a largura das mãos, a linha delas, o ângulo dos cotovelos) e
// diz onde os pés apoiam e o que a cena acrescenta (o elástico nas costas, por exemplo).
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { pontosDoBoneco } from '../boneco';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { bancoReto, chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix, paraRef } from '../vec';
import type { V3 } from '../vec';

/** Onde as pontas dos pés apoiam: no chão (a flexão) ou no tampo do banco reto (pés elevados). */
export type ApoioDosPes = 'chao' | 'bancoReto';
export interface OpcoesDaFlexao {
  apoioDosPes?: ApoioDosPes;
  /** O que a variação acrescenta à cena depois de o corpo estar pronto (o elástico, por exemplo). */
  cena?(q: Quadro, corpo: Corpo, u: number, erro?: string): void;
}
export interface Flexao {
  ficha: Ficha;
  quadro(corpo: Corpo, u: number, erro?: string): Quadro;
  /** A altura do apoio dos pés (cm): 0 no chão. */
  alturaDosPes: number;
}

const rad = Math.PI / 180;

/** Altura do ponto mais baixo do peito (cm), medida na superfície do Boneco: entre os ombros e a cintura. */
export function peitoAoChao(e: Esq): number {
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'tronco') continue;
    const l = paraRef(e.torax, p);
    if (l[1] < -4 && l[1] > -32 && Math.abs(l[0]) < 12) min = Math.min(min, p[1]);
  }
  return min;
}
/** Altura do ponto mais baixo do tronco e da bacia (cm), na superfície do Boneco. */
function maisBaixoDoTronco(e: Esq): number {
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'tronco' || parte === 'pelve') min = Math.min(min, p[1]);
  return min;
}

export function criarFlexao(fichaJson: unknown, op: OpcoesDaFlexao = {}): Flexao {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const apoio = op.apoioDosPes ?? 'chao';
  const h = apoio === 'bancoReto' ? obj('bancoReto', 'altura') : 0;
  const CACHE = new WeakMap<Corpo, { cima: number; baixo: number; zMao: number; zBanco: number }>();
  /** O erro dos cotovelos abertos: `cot` na maioria das fichas, `cotovelos` na dos pés elevados. */
  const ehCot = (erro?: string) => erro === 'cot' || erro === 'cotovelos';

  /** O corpo em prancha, inclinado `beta` graus acima da horizontal, com as mãos em (±xMao, zMao). */
  function prancha(corpo: Corpo, beta: number, zMao: number, o: { cot?: number; quadril?: number; retr?: number } = {}): Esq {
    const m = (id: string) => corpo.m(id);
    const w = f('pes.meiaDistancia');
    // pé: os dedos no apoio, o resto do pé levantado; o tornozelo fica perto do neutro
    const calc = 90 - f('tornozelo.dorsiflexao') - beta;
    const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, h, 0], dir: [0, 0, 1], calc }, polo: [0, -1, 0.2] });
    const pernas = { R: perna('R'), L: perna('L') };
    // tornozelo (sai do pé) → quadril, ao longo da linha do corpo, com o joelho quase reto
    const d = Math.sqrt(m('coxa.comp') ** 2 + m('perna.comp') ** 2 + 2 * m('coxa.comp') * m('perna.comp') * Math.cos(f('joelho') * rad));
    const hM = m('altura.maleolo'),
      r = m('pe.calcanharABola') - m('pe.calcanharAoTornozelo');
    const torn: V3 = [0, h + hM * Math.cos(calc * rad) + r * Math.sin(calc * rad), -(r * Math.cos(calc * rad)) + hM * Math.sin(calc * rad)];
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

  function calibrar(corpo: Corpo) {
    let c = CACHE.get(corpo);
    if (c) return c;
    // com os pés no chão o corpo fica acima da horizontal; com os pés elevados, a cabeça fica abaixo dos pés
    const [b0, b1] = h > 0 ? [-60, 30] : [0, 30];
    // 1) embaixo: a folga do peito ao chão define o ângulo; as mãos ficam na linha que a ficha dá
    const zOmbro = (beta: number) => prancha(corpo, beta, 100).lado.L.ombro[2];
    const baixo = resolver1((b) => peitoAoChao(prancha(corpo, b, 100)) - f('peito.aoChao'), b0, b1, 18);
    const zMao = zOmbro(baixo) - f('maos.abaixoDoOmbro');
    // 2) em cima: o cotovelo quase estendido define o ângulo
    const cima = resolver1((b) => f('cotovelo.cima') - prancha(corpo, b, zMao).lado.L.ang.cotovelo, baixo, 45);
    // 3) o banco dos pés: a ponta dele fica um pouco além das pontas dos dedos
    const zBanco = h > 0 ? prancha(corpo, cima, zMao).lado.R.ponta[2] + f('pes.daBordaDoBanco') - obj('bancoReto', 'comp') / 2 : 0;
    c = { cima, baixo, zMao, zBanco };
    CACHE.set(corpo, c);
    return c;
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const c = calibrar(corpo);
    const fundo = erro === 'curta' ? f('erro.curta.fracao') : 1;
    const beta = mix(c.cima, c.baixo, u * fundo);
    const o = { cot: ehCot(erro) ? mix(f('cotovelos.doTronco'), f('erro.cot.doTronco'), Math.min(1, u * 1.6)) : undefined, quadril: erro === 'quadril' ? f('erro.quadril.queda') * (0.55 + 0.45 * u) : 0, retr: f('escapula.retracaoEmbaixo') * u };
    let e = prancha(corpo, beta, c.zMao, o);
    // com o quadril caído, a barriga chega ao chão antes do peito: a descida para onde o corpo encosta (1 cm de folga)
    if (erro === 'quadril' && maisBaixoDoTronco(e) < 1) e = prancha(corpo, resolver1((b) => maisBaixoDoTronco(prancha(corpo, b, c.zMao, o)) - 1, beta, 45, 20), c.zMao, o);
    const q: Quadro = { esq: e, prims: [chao(-80, 80, h > 0 ? -150 : -60, 200)], fios: [], cargas: [], marcas: {} };
    if (h > 0) {
      q.prims.push(...bancoReto(0, c.zBanco));
      // do banco, só a ponta onde os pés apoiam precisa caber no quadro
      q.pecas = [{ t: 'bancoReto', x0: 0, z0: c.zBanco, pontaNoQuadro: f('banco.pontaNoQuadro') }];
      q.marcas.apoioDosPes = [0, h, c.zBanco + obj('bancoReto', 'comp') / 2];
    }
    op.cena?.(q, corpo, u, erro);
    return q;
  }
  return { ficha: F, quadro, alturaDosPes: h };
}

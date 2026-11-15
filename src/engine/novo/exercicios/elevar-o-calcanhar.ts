// O núcleo comum das panturrilhas em pé do motor novo (no chão, no degrau da escada e no step, com as duas pernas
// ou com uma): subir e descer o calcanhar girando o pé na bola do pé. A bola do pé de apoio fica parada; o resto do
// pé gira nela (`pe.calc` do esqueleto: positivo sobe o calcanhar, negativo desce abaixo da beirada do apoio). O
// que o núcleo resolve em cada quadro, em vez de receber pronto:
//  - o quadril fica a uma distância do tornozelo de apoio que só depende da flexão do joelho (lei dos cossenos); a
//    inclinação dessa linha sai do equilíbrio: o centro de massa (corpo + carga) sobre a bola do pé. Assim o corpo
//    sobe reto, sem balançar para a frente ou para trás. O tronco fica na vertical e só as pernas inclinam (com o
//    calcanhar no chão o tornozelo fica atrás da bola do pé, e as pernas inclinam um pouco para a frente; na ponta
//    dos pés ficam quase em pé): assim a cabeça sobe quase na vertical. Com o corpo inteiro em linha, ela recuaria
//    4 cm na subida (medido);
//  - numa perna só, o centro de massa também vai de lado para cima do pé de apoio (a bacia anda para esse lado);
//  - as mãos que apoiam (parede, corrimão, coluna) ficam paradas: os braços acompanham com o cotovelo.
// Cada variação traz a sua ficha de movimento, o apoio dos pés e o que as mãos fazem.
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { centroDeMassa, resolver1 } from '../movimento';
import type { Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { add, mix } from '../vec';
import type { V3 } from '../vec';

export type Carga = Quadro['cargas'][number];
export interface PedidoDaPanturrilha {
  /** A altura da superfície em que a bola do pé de apoio pisa (0 = chão) e o z da bola do pé. */
  apoioY: number;
  bolaZ: number;
  /** Meia distância entre os pés (cm). */
  pesMeiaDistancia: number;
  /** Flexão do joelho de apoio (graus). */
  joelho: number;
  /** Quanto o pé de apoio gira na bola (graus): positivo, o calcanhar sobe; negativo, desce abaixo da beirada. */
  calc: number;
  /**
   * A perna esquerda: `null`, ela apoia como a direita (espelhada); senão, a pose dela dado o tronco (o pé que sai do
   * chão, ou a perna dobrada atrás, sem apoiar).
   */
  pernaL: ((t: Tronco) => PosePerna) | null;
  /** 0 = o centro de massa no meio dos dois pés; 1 = sobre o pé direito (a outra perna fora do chão). */
  umaPerna: number;
  /** Quanto o centro de massa fica à frente da bola do pé (cm; 0 no certo). */
  cmAFrente?: number;
  /**
   * Quanto da inclinação das pernas a bacia e o tronco acompanham (1 = o corpo inteiro em linha; 0 = o tronco fica na
   * vertical e só as pernas inclinam).
   */
  acompanha?: number;
  /** Inclinação a mais do tronco à frente, além da linha das pernas (graus; 0 no certo). */
  tronco?: number;
  /** Os braços e as cargas, dado o esqueleto com o tronco e as pernas no lugar. */
  bracos(e: Esq): { R: PoseBraco; L: PoseBraco; cargas: Carga[] };
}
export interface Elevado {
  e: Esq;
  cargas: Carga[];
  /** A bola do pé de apoio (direito). */
  bola: V3;
}

/** O pé apoiado: a bola parada no apoio, os dedos para a frente, o calcanhar girando `calc` graus na bola. */
export const peApoiado = (s: number, p: Pick<PedidoDaPanturrilha, 'apoioY' | 'bolaZ' | 'pesMeiaDistancia'>, calc: number, polo: V3 = [0, 0, 1]): PosePerna => ({
  pe: { bola: [s * p.pesMeiaDistancia, p.apoioY, p.bolaZ], dir: [0, 0, 1], calc },
  polo,
});

export function elevarOCalcanhar(corpo: Corpo, p: PedidoDaPanturrilha): Elevado {
  const m = (id: string) => corpo.m(id);
  const rad = Math.PI / 180;
  const pernaR = peApoiado(-1, p, p.calc);
  const hq = m('quadril.meiaDistancia'),
    th = m('coxa.comp'),
    sk = m('perna.comp'),
    a = p.joelho * rad;
  const semBracos: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const torn = resolverMembros(resolverTronco(corpo, { pelve: [0, 200, 0] }), { R: semBracos, L: semBracos }, { R: pernaR, L: pernaR }).lado.R.tornozelo;
  const d = Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos(a));
  const bola: V3 = [-p.pesMeiaDistancia, p.apoioY, p.bolaZ];
  const montar = (hx: number, alfa: number) => {
    const plano = Math.sqrt(Math.max(1, d * d - (hx - torn[0]) ** 2));
    // alfa > 0: o quadril atrás do tornozelo; < 0: à frente (o corpo inclina para a frente)
    const quadril: V3 = [hx, torn[1] + plano * Math.cos(alfa * rad), torn[2] - plano * Math.sin(alfa * rad)];
    // a bacia acompanha a inclinação das pernas só na fração pedida (0 = tronco na vertical), mais a do erro
    const frente = -alfa * (p.acompanha ?? 0) + (p.tronco ?? 0);
    const t = resolverTronco(corpo, { pelve: add(quadril, [hq, 0, 0]), frente, cervical: -frente * 0.25, cabeca: -frente * 0.2 });
    const pernas = { R: pernaR, L: p.pernaL ? p.pernaL(t) : peApoiado(1, p, p.calc) };
    const pend = (k: Lado): PoseBraco => ({ pegada: add(t.torax.o, [sinal(k) * 18, -70, 0]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
    let e = resolverMembros(t, { R: pend('R'), L: pend('L') }, pernas);
    let b = p.bracos(e);
    e = resolverMembros(t, { R: b.R, L: b.L }, pernas);
    b = p.bracos(e);
    e = resolverMembros(t, { R: b.R, L: b.L }, pernas);
    return { e, cargas: b.cargas };
  };
  const alvoZ = bola[2] + (p.cmAFrente ?? 0);
  const alfaPara = (hx: number) =>
    resolver1((x) => {
      const r = montar(hx, x);
      return centroDeMassa(r.e, 'homem', r.cargas)[2] - alvoZ;
    }, -30, 30, 30);
  // de lado: o centro de massa entre os dois pés (x = 0) ou sobre o pé direito
  const alvoX = mix(0, bola[0], p.umaPerna);
  let hx = -hq,
    alfa = alfaPara(hx);
  for (let i = 0; i < 4; i++) {
    const r = montar(hx, alfa);
    hx -= centroDeMassa(r.e, 'homem', r.cargas)[0] - alvoX;
    alfa = alfaPara(hx);
  }
  return { ...montar(hx, alfa), bola };
}

// O corpo pendurado pelas mãos (barra fixa, barra supinada, elevação de joelhos na barra) ou sustentado por elas
// (elevação de joelhos nas paralelas): o que esses exercícios têm em comum.
//
// As mãos são o único apoio. Elas fecham em volta da barra (`forma: 'pegada'`, com o diâmetro dela) e o centro da
// pegada fica no eixo da barra, parado o ciclo inteiro; o resto do corpo pende delas. Por isso a conta anda ao
// contrário dos exercícios em pé: o que se escolhe é a forma do corpo (a coluna, as pernas, a escápula) e onde fica a
// barra; a posição do corpo sai de duas condições físicas:
//  1) o braço alcança a barra com a dobra de cotovelo pedida (`pelvePeloCotovelo`, por bisseção na altura da bacia):
//     embaixo, os braços estendidos; numa puxada, a altura vem do quadro e o cotovelo dobra o que precisar;
//  2) o corpo parado (sem balanço) só fica em equilíbrio com o centro de massa na vertical das mãos: a bacia anda para
//     a frente ou para trás até isso valer (`noPrumo`). É o que faz o tronco ir para trás quando as pernas sobem.
//
// Eixos: a pessoa olha para +z; a barra fica em z = zMaos. As regras medidas ficam em ../regras/pendurado.ts.
import { centroDeMassa, resolver1 } from '../movimento';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import type { Corpo } from '../tabelas';
import { dirRef, mix } from '../vec';
import type { V3 } from '../vec';
import { suave } from '../movimento';

const rad = Math.PI / 180;

/** Onde as mãos seguram: o centro de cada pegada (no eixo da barra) e o diâmetro do que elas seguram. */
export interface Apoio {
  maos: Record<Lado, V3>;
  diam: number;
}
/** A forma do corpo, sem a posição: a coluna, a cabeça, as pernas e os braços (para onde aponta o cotovelo, o polegar e a escápula). */
export interface Forma {
  frente: number;
  lombar?: number;
  toracica?: number;
  cervical?: number;
  cabeca?: number;
  pernas: (t: Tronco) => Record<Lado, PosePerna>;
  /** Para onde o cotovelo aponta e o polegar (no mundo), e a escápula (graus somados ao ritmo do ombro). */
  bracos: (k: Lado) => { polo: V3; polegar: V3; elev: number; prot?: number };
}

/** O corpo com a bacia em `pelve` e as mãos na barra. */
export function montar(corpo: Corpo, a: Apoio, f: Forma, pelve: V3): Esq {
  const pose: PoseTronco = { pelve, frente: f.frente, lombar: f.lombar ?? 0, toracica: f.toracica ?? 0, cervical: f.cervical ?? 0, cabeca: f.cabeca ?? 0 };
  const t = resolverTronco(corpo, pose);
  const braco = (k: Lado): PoseBraco => {
    const b = f.bracos(k);
    return { pegada: a.maos[k], polo: b.polo, mao: { polegar: b.polegar, forma: 'pegada', diam: a.diam }, elev: b.elev, prot: b.prot ?? 0 };
  };
  return resolverMembros(t, { R: braco('R'), L: braco('L') }, f.pernas(t));
}

/** A dobra do cotovelo direito (graus), com o que falta para o braço alcançar contado como dobra negativa. */
const dobraEfetiva = (e: Esq) => e.lado.R.ang.cotovelo - 5 * e.lado.R.falta.braco;

/**
 * A altura da bacia em que o cotovelo dobra `cotovelo` graus, com a bacia em z. `acima`: as mãos ficam acima dos
 * ombros (pendurado; a bacia mais alta dobra mais o cotovelo) ou abaixo (nas paralelas; ao contrário).
 */
export function pelvePeloCotovelo(corpo: Corpo, a: Apoio, f: Forma, z: number, cotovelo: number, acima: boolean): number {
  const yM = a.maos.R[1];
  const [lo, hi] = acima ? [yM - 200, yM - 40] : [yM - 70, yM + 90];
  return resolver1((y) => dobraEfetiva(montar(corpo, a, f, [0, y, z])) - cotovelo, lo, hi, 36);
}

/** O centro de massa (corpo inteiro), em z, menos o z das mãos: zero = em equilíbrio, pendurado parado. */
export const foraDoPrumo = (e: Esq, a: Apoio) => centroDeMassa(e, 'homem')[2] - a.maos.R[2];

/**
 * A bacia na posição em que o corpo fica parado: o cotovelo com a dobra pedida (`alvo.cotovelo`) ou a bacia na altura
 * pedida (`alvo.y`), e o centro de massa na vertical das mãos (mais `alvo.balanco`, só no erro de balançar).
 */
export function noPrumo(corpo: Corpo, a: Apoio, f: Forma, alvo: { cotovelo?: number; y?: (z: number) => number; balanco?: number }, acima: boolean, z0 = 0): { e: Esq; pelve: V3 } {
  let z = z0,
    y = 0;
  for (let i = 0; i < 4; i++) {
    y = alvo.y ? alvo.y(z) : pelvePeloCotovelo(corpo, a, f, z, alvo.cotovelo ?? 5, acima);
    const e = montar(corpo, a, f, [0, y, z]);
    z -= foraDoPrumo(e, a) - (alvo.balanco ?? 0);
  }
  if (alvo.y) y = alvo.y(z);
  else y = pelvePeloCotovelo(corpo, a, f, z, alvo.cotovelo ?? 5, acima);
  return { e: montar(corpo, a, f, [0, y, z]), pelve: [0, y, z] };
}

/* ============================== as pernas ============================== */
/** Uma direção no plano de lado da bacia: `graus` a partir de para baixo, girando para a frente. */
const naBacia = (t: Tronco, graus: number, x = 0): V3 => dirRef(t.pelve, [x, -Math.cos(graus * rad), Math.sin(graus * rad)]);
export interface Pernas {
  /** Flexão do quadril (a coxa à frente da linha da bacia) e do joelho, em graus. */
  quadril: number;
  joelho: number;
  /** Quanto a ponta do pé estica além do ângulo reto com a canela (graus). */
  plantar: number;
  /** Quanto cada coxa vem para o meio (graus): as pernas juntas. */
  juntas: number;
}
/** As duas pernas soltas, presas à bacia: a coxa e a canela no plano de lado dela. */
export function pernasSoltas(p: Pernas): (t: Tronco) => Record<Lado, PosePerna> {
  return (t) => {
    const perna = (k: Lado): PosePerna => {
      const x = -sinal(k) * Math.sin(p.juntas * rad);
      return { coxa: naBacia(t, p.quadril, x), canela: naBacia(t, p.quadril - p.joelho, x), peDir: naBacia(t, p.quadril - p.joelho + 90 - p.plantar), polo: naBacia(t, p.quadril + 90) };
    };
    return { R: perna('R'), L: perna('L') };
  };
}

/* ============================== tempo dentro de uma fase ============================== */
/** Um trecho de 0 a 1, sem tranco, entre `a` e `b` do parâmetro u (antes de `a` vale 0; depois de `b`, 1). */
export const trecho = (u: number, a: number, b: number) => suave(Math.min(1, Math.max(0, (u - a) / (b - a))));
export { mix };

/** As mãos na barra a `largura` cm uma da outra (de centro a centro), na altura `y` e em z = `z`. */
export const maosNaBarra = (largura: number, y: number, z: number): Record<Lado, V3> => ({ R: [-largura / 2, y, z], L: [largura / 2, y, z] });
export { LADOS };

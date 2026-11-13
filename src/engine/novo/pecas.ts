// Motor novo: as peças de cena. Cada peça lê as medidas da tabela de objetos (./dados/objetos.json) e devolve
// volumes, caixas e fios em centímetros; o mesmo desenho serve à cena e ao cartão de equipamento.
import type { Anel, Volume } from './corpo3d';
import type { Prim } from './desenho';
import { obj } from './tabelas';
import { REF0, add, comb, cross, len, mul, norm, perp, sub } from './vec';
import type { Ref, V3 } from './vec';

/** Dois eixos perpendiculares a `u`. */
function base(u: V3, dica: V3 = [0, 1, 0]): [V3, V3] {
  let a = perp(dica, u);
  if (len(a) < 1e-4) a = perp([1, 0, 0], u);
  a = norm(a);
  return [a, cross(u, a)];
}
/** Cilindro de `a` até `b`, com raio r (ou raios diferentes nos dois eixos). */
export function cilindro(a: V3, b: V3, r: number, r2 = r, dica?: V3): Volume {
  const u = norm(sub(b, a));
  const [x, z] = base(u, dica);
  const an = (c: V3): Anel => ({ c, x, z, a: r, f: r2, b: r2 });
  return { aneis: [an(a), an(b)] };
}
const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string, vies?: number): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies });
const caixaReta = (o: V3, meias: V3, cls: string, vies?: number): Prim => ({ t: 'caixa', ref: { ...REF0, o }, meias, cls, vies });

/**
 * Halter sextavado: centro do cabo e direção do cabo. Cada cabeça é um prisma de seis faces com a largura (entre
 * cantos) e a altura (entre faces) da ficha; o cabo é um cilindro.
 */
export function halter(centro: V3, eixo: V3, vies = 0): Prim[] {
  const u = norm(eixo);
  const comp = obj('halter', 'comp'),
    cabo = obj('halter', 'caboComp'),
    rc = obj('halter', 'caboDiam') / 2,
    ra = obj('halter', 'cabecaLargura') / 2,
    rb = obj('halter', 'cabecaAltura') / 2;
  const P = (d: number) => add(centro, mul(u, d));
  const [x, z] = base(u);
  const cab = (s: number): Prim => ({ t: 'prisma', a: P(s * (cabo / 2)), b: P(s * (comp / 2)), x, z, ra, rb, lados: 6, cls: 'ferro', vies });
  return [{ t: 'volume', vol: cilindro(P(-cabo / 2 - 0.5), P(cabo / 2 + 0.5), rc), cls: 'aco', vies }, cab(-1), cab(1)];
}

/** Banco reto: o estofado ao longo de z, centrado em (x0, z0), com dois pés em T. */
export function bancoReto(x0: number, z0: number): Prim[] {
  const comp = obj('bancoReto', 'comp'),
    larg = obj('bancoReto', 'larg'),
    alt = obj('bancoReto', 'altura'),
    est = obj('bancoReto', 'estofado'),
    baseL = obj('bancoReto', 'baseLarg'),
    tubo = obj('bancoReto', 'tubo') / 2;
  const out: Prim[] = [caixaReta([x0, alt - est / 2, z0], [larg / 2, est / 2, comp / 2], 'estofado', 0.5)];
  const hTubo = alt - est;
  out.push(caixaReta([x0, hTubo - tubo, z0], [tubo, tubo, comp / 2 - 6], 'esc', -0.5));
  for (const s of [-1, 1]) {
    const z = z0 + s * (comp / 2 - 16);
    out.push(caixaReta([x0, (hTubo - tubo) / 2, z], [tubo, (hTubo - tubo) / 2, tubo], 'esc', -0.6));
    out.push(caixaReta([x0, tubo, z], [baseL / 2, tubo, tubo], 'esc', -0.7));
  }
  return out;
}

/**
 * Banco regulável: o assento na ponta de +z e o encosto para −z, erguido em `encosto` graus (0 = plano). A dobradiça
 * fica no vão entre os dois, na altura da face de baixo do estofado.
 */
export function bancoRegulavel(x0: number, z0: number, encosto: number, assento = 0): Prim[] {
  const g = (id: string) => obj('bancoRegulavel', id);
  const larg = g('larg') / 2,
    est = g('estofado'),
    alt = g('altura'),
    tubo = g('tubo') / 2,
    compAssento = g('assentoComp'),
    compEncosto = g('estofadoComp') - compAssento,
    base = g('baseComp'),
    baseL = g('baseLarg') / 2;
  const zDobra = z0 + g('estofadoComp') / 2 - compAssento - g('vao') / 2,
    yDobra = alt - est;
  // uma almofada que sai da dobradiça na direção `sentido` (−1 = encosto, +1 = assento), erguida em `graus`
  const almofada = (sentido: number, graus: number, comp: number): Prim => {
    const a = (graus * Math.PI) / 180;
    const d: V3 = [0, Math.sin(a), sentido * Math.cos(a)],
      n: V3 = [0, Math.cos(a), -sentido * Math.sin(a)];
    const o = add(add([x0, yDobra, zDobra + (sentido * g('vao')) / 2], mul(d, comp / 2)), mul(n, est / 2));
    return { t: 'caixa', ref: { o, x: [1, 0, 0], y: n, z: mul(d, sentido) }, meias: [larg, est / 2, comp / 2], cls: 'estofado', vies: 0.5 };
  };
  const out: Prim[] = [almofada(-1, encosto, compEncosto), almofada(1, assento, compAssento)];
  const zFrente = z0 + base / 2 - tubo,
    zTras = z0 - base / 2 + tubo;
  // estrutura: a viga do chão, o pé da frente, o pé de trás (largo) e a coluna que sustenta a dobradiça
  out.push(caixaReta([x0, tubo, z0], [tubo, tubo, base / 2], 'esc', -0.7));
  out.push(caixaReta([x0, tubo, zTras], [baseL, tubo, tubo], 'esc', -0.7));
  out.push(caixaReta([x0, tubo, zFrente], [baseL * 0.55, tubo, tubo], 'esc', -0.7));
  out.push(caixaReta([x0, yDobra / 2, zDobra + 6], [tubo, yDobra / 2, tubo], 'esc', -0.6));
  // a haste de apoio do encosto: da viga do chão até o meio do encosto
  const a = (encosto * Math.PI) / 180;
  const apoio: V3 = [x0, yDobra + Math.sin(a) * compEncosto * 0.55, zDobra - Math.cos(a) * compEncosto * 0.55];
  const pe: V3 = [x0, 2 * tubo, Math.max(zTras + 2 * tubo, apoio[2] - 4)];
  out.push({ t: 'volume', vol: cilindro(pe, apoio, tubo * 0.8), cls: 'esc', vies: -0.6 });
  return out;
}

/** Anilha deitada no chão, com o centro em (x, z): o calcanhar apoia nela. */
export function anilhaNoChao(x: number, z: number): Prim[] {
  const r = obj('anilhaCalcanhar', 'diam') / 2,
    e = obj('anilhaCalcanhar', 'esp');
  return [{ t: 'volume', vol: cilindro([x, 0, z], [x, e, z], r, r, [0, 0, 1]), cls: 'ferro', vies: -2 }];
}

/**
 * Uma peça de equipamento da cena, pelo nome: é dela que o desenho realista sai (./equipamento.ts). As peças simples
 * (Prim) continuam servindo à conferência: onde o corpo encosta, onde o cabo passa.
 */
export type Peca =
  | { t: 'halter'; centro: V3; eixo: V3 }
  | { t: 'anilha'; x: number; z: number }
  | { t: 'bancoReto'; x0: number; z0: number }
  | { t: 'torre'; torre: Torre; subida: number }
  | { t: 'estribo'; pegada: V3; eixo: V3; elo: V3 }
  | { t: 'cabo'; a: V3; b: V3 }
  | { t: 'colchonete'; x0: number; z0: number };

export interface Torre {
  /** Centro da base no chão e a direção para onde a polia aponta (para a pessoa). */
  base: V3;
  frente: V3;
  alturaDaPolia: number;
}
/** Ponto de onde o cabo sai da roldana, na direção do pegador. */
export function saidaDoCabo(t: Torre, para: V3): V3 {
  const r = obj('torre', 'roldanaDiam') / 2;
  const c = centroDaRoldana(t);
  // o cabo sai tangente à roldana: o ponto de saída fica a 90° da direção do cabo, por cima da roldana
  const lado = norm(cross(t.frente, [0, 1, 0]));
  const d = norm(perp(sub(para, c), lado));
  const n = cross(lado, d);
  return add(c, mul(n[1] >= 0 ? n : mul(n, -1), r));
}
export const centroDaRoldana = (t: Torre): V3 => add(add(t.base, [0, t.alturaDaPolia, 0]), mul(norm(t.frente), obj('torre', 'prof') * 0.14 + obj('torre', 'roldanaDiam') / 2));
/**
 * Coluna de polia: a coluna, o carrinho com a roldana na altura pedida e a pilha de pesos, que sobe `subida` cm
 * (o curso do cabo dividido pela relação da máquina, da tabela).
 */
export function torre(t: Torre, subida: number): Prim[] {
  const alt = obj('torre', 'altura'),
    larg = obj('torre', 'colunaLarg'),
    prof = obj('torre', 'prof'),
    rr = obj('torre', 'roldanaDiam') / 2,
    pl = obj('torre', 'pilhaLarg') / 2,
    pe = obj('torre', 'placaEsp'),
    n = obj('torre', 'placas');
  const f = norm(t.frente),
    lado = norm(cross(f, [0, 1, 0])),
    y: V3 = [0, 1, 0];
  const P = (dl: number, dy: number, df: number): V3 => comb([1, t.base], [dl, lado], [dy, y], [df, f]);
  const out: Prim[] = [];
  const cx = (o: V3, m: V3, cls: string, vies: number) => out.push(caixa(o, lado, y, f, m, cls, vies));
  // base e os dois montantes
  cx(P(0, 3, -prof * 0.1), [larg / 2 + 4, 3, prof * 0.42], 'esc', -40);
  for (const s of [-1, 1]) cx(P(s * (larg / 2 - 2.5), alt / 2, -prof * 0.12), [2.5, alt / 2, 3.5], 'obj', -39);
  cx(P(0, alt - 3, -prof * 0.12), [larg / 2, 3, 5], 'esc', -38);
  // trilho do carrinho, na frente
  cx(P(0, alt / 2, prof * 0.08), [2.2, alt / 2 - 6, 2.2], 'obj', -37);
  // pilha de pesos: as placas que ficam e as que sobem com o cabo
  const hPilha = n * pe,
    yb = 12;
  const quantas = Math.max(3, Math.round(n * 0.4));
  cx(P(0, yb + ((n - quantas) * pe) / 2, -prof * 0.12), [pl, ((n - quantas) * pe) / 2, 6], 'ferro', -36);
  cx(P(0, yb + (n - quantas) * pe + subida + (quantas * pe) / 2, -prof * 0.12), [pl, (quantas * pe) / 2, 6], 'ferro2', -35);
  for (let i = 1; i < n; i++) {
    const yy = yb + i * pe + (i > n - quantas ? subida : 0);
    out.push({ t: 'fio', pts: [P(-pl, yy, -prof * 0.12 + 6.1), P(pl, yy, -prof * 0.12 + 6.1)], larg: 0.35, cls: 'risco', vies: -34.5 });
  }
  void hPilha;
  // carrinho e roldana
  cx(P(0, t.alturaDaPolia, prof * 0.11), [5, 7, 3.5], 'esc', -30);
  const c = centroDaRoldana(t);
  out.push({ t: 'volume', vol: cilindro(add(c, mul(lado, -1.2)), add(c, mul(lado, 1.2)), rr), cls: 'aco', vies: -29 });
  return out;
}
/** Cabo de aço entre dois pontos, na espessura da tabela. */
export const cabo = (a: V3, b: V3): Prim => ({ t: 'fio', pts: [a, b], larg: Math.max(obj('torre', 'caboDiam'), 0.9), cls: 'cabo', vies: -1 });

/** Estribo: a pegada (no centro da mão, ao longo de `eixo`) e as duas hastes até o elo do cabo. Devolve as peças e o elo. */
export function estribo(pegada: V3, eixo: V3, paraOCabo: V3): { prims: Prim[]; elo: V3 } {
  const u = norm(eixo),
    L = obj('estribo', 'pegadaComp') / 2,
    r = obj('estribo', 'pegadaDiam') / 2,
    h = obj('estribo', 'altura');
  const d = norm(perp(paraOCabo, u));
  const elo = add(pegada, mul(d, h));
  const a = add(pegada, mul(u, -L)),
    b = add(pegada, mul(u, L));
  return {
    elo,
    prims: [
      { t: 'volume', vol: cilindro(a, b, r), cls: 'aco', vies: 0 },
      { t: 'fio', pts: [a, add(a, mul(d, h * 0.45)), elo, add(b, mul(d, h * 0.45)), b], larg: 1.5, cls: 'fita', vies: -0.5 },
    ],
  };
}

export function colchonete(x0: number, z0: number): Prim[] {
  const c = obj('colchonete', 'comp') / 2,
    l = obj('colchonete', 'larg') / 2,
    e = obj('colchonete', 'esp') / 2;
  return [caixaReta([x0, e, z0], [l, e, c], 'tapete', -50)];
}
export const chao = (x0: number, x1: number, z0: number, z1: number): Prim => ({ t: 'chao', y: 0, x0, x1, z0, z1, cls: 'chao' });
export type { Ref };

// Motor novo (sessão da animação nova, 11/2026): vetores e referenciais. Sem estado e sem dependência.
// Convenção (a mesma do motor de hoje): x = esquerda do corpo, y = cima, z = frente; centímetros e graus.

export type V3 = [number, number, number];
export type V2 = [number, number];
/** Referencial preso a um osso: origem e três eixos unitários (x = esquerda, y = cima, z = frente, na posição anatômica). */
export interface Ref {
  o: V3;
  x: V3;
  y: V3;
  z: V3;
}

export const RAD = Math.PI / 180;
export const v = (x: number, y: number, z: number): V3 => [x, y, z];
export const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const mul = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
export const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const len = (a: V3) => Math.hypot(a[0], a[1], a[2]);
export const dist = (a: V3, b: V3) => len(sub(a, b));
export const norm = (a: V3): V3 => {
  const l = len(a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
export const lerp = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
/** Soma ponderada: comb([k1, v1], [k2, v2], ...). */
export function comb(...termos: [number, V3][]): V3 {
  const r: V3 = [0, 0, 0];
  for (const [k, u] of termos) {
    r[0] += k * u[0];
    r[1] += k * u[1];
    r[2] += k * u[2];
  }
  return r;
}
/** A parte de `a` perpendicular ao eixo unitário `u`. */
export const perp = (a: V3, u: V3): V3 => sub(a, mul(u, dot(a, u)));
/** Gira `p` em torno do eixo unitário `k` por `graus` (regra da mão direita). */
export function girar(p: V3, k: V3, graus: number): V3 {
  const c = Math.cos(graus * RAD),
    s = Math.sin(graus * RAD);
  return comb([c, p], [s, cross(k, p)], [dot(k, p) * (1 - c), k]);
}
/** Ângulo (graus) entre dois vetores. */
export const angulo = (a: V3, b: V3) => Math.acos(clamp(dot(norm(a), norm(b)), -1, 1)) / RAD;
/** Ângulo com sinal (graus) de `a` até `b`, em torno do eixo `k` (regra da mão direita). */
export const anguloEm = (a: V3, b: V3, k: V3) => Math.atan2(dot(cross(a, b), k), dot(a, b)) / RAD;

export const REF0: Ref = { o: [0, 0, 0], x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] };
/** Ponto dado em coordenadas locais de um referencial → mundo. */
export const noRef = (r: Ref, p: V3): V3 => comb([1, r.o], [p[0], r.x], [p[1], r.y], [p[2], r.z]);
/** Direção local → mundo. */
export const dirRef = (r: Ref, d: V3): V3 => comb([d[0], r.x], [d[1], r.y], [d[2], r.z]);
/** Ponto do mundo → coordenadas locais. */
export const paraRef = (r: Ref, p: V3): V3 => {
  const d = sub(p, r.o);
  return [dot(d, r.x), dot(d, r.y), dot(d, r.z)];
};
/** Gira o referencial em torno de um eixo do mundo que passa pela própria origem. */
export const girarRef = (r: Ref, k: V3, graus: number): Ref => ({ o: r.o, x: girar(r.x, k, graus), y: girar(r.y, k, graus), z: girar(r.z, k, graus) });
/** O mesmo referencial em outra origem. */
export const moverRef = (r: Ref, o: V3): Ref => ({ o, x: r.x, y: r.y, z: r.z });
/** Referencial a partir de um eixo y (ao longo do osso) e de uma dica para o eixo z (frente). */
export function refDe(o: V3, y: V3, zDica: V3): Ref {
  const yy = norm(y);
  let z = perp(zDica, yy);
  if (len(z) < 1e-6) z = perp(Math.abs(yy[1]) < 0.9 ? [0, 1, 0] : [0, 0, 1], yy);
  z = norm(z);
  return { o, x: cross(yy, z), y: yy, z };
}
/**
 * Cinemática inversa de dois segmentos (a, b) de S até T; `polo` diz para que lado a junta do meio dobra.
 * Devolve a junta do meio, a ponta (que pode ficar aquém do alvo se ele estiver longe demais) e a falta em cm.
 */
export function ik2(S: V3, T: V3, a: number, b: number, polo: V3): { meio: V3; ponta: V3; falta: number } {
  const d = sub(T, S);
  let L = len(d);
  const n: V3 = L > 1e-6 ? mul(d, 1 / L) : [0, -1, 0];
  const max = a + b - 0.01,
    min = Math.abs(a - b) + 0.01;
  const falta = Math.max(0, L - max, min - L);
  L = clamp(L, min, max);
  const ca = (a * a + L * L - b * b) / (2 * a * L);
  const A = Math.acos(clamp(ca, -1, 1));
  let p = perp(polo, n);
  if (len(p) < 1e-4) p = perp([0, 0, 1], n);
  if (len(p) < 1e-4) p = perp([1, 0, 0], n);
  p = norm(p);
  return { meio: comb([1, S], [a * Math.cos(A), n], [a * Math.sin(A), p]), ponta: add(S, mul(n, L)), falta };
}

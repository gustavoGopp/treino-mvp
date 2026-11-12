// As funções dos arquivos do port (./math.ts e ./esqueleto.ts, sem tipo), com tipo. São as mesmas funções: este
// arquivo só diz ao compilador o que elas recebem e devolvem (os arquivos do port não podem ser editados).
import * as esqueleto from './esqueleto';
import * as math from './math';
import type { Esqueleto, Lado, Pose, V3 } from './tipos';

export const add = math.add as (a: V3, b: V3) => V3;
export const sub = math.sub as (a: V3, b: V3) => V3;
export const mul = math.mul as (a: V3, k: number) => V3;
export const dot = math.dot as (a: V3, b: V3) => number;
export const cross = math.cross as (a: V3, b: V3) => V3;
export const len = math.len as (a: V3) => number;
export const norm = math.norm as (a: V3) => V3;
export const mid = math.mid as (a: V3, b: V3) => V3;
/** Combinação linear: comb(k1, v1, k2, v2, ...) = k1·v1 + k2·v2 + ... (o original lê `arguments`, sem parâmetros). */
export const comb = math.comb as unknown as {
  (k1: number, v1: V3): V3;
  (k1: number, v1: V3, k2: number, v2: V3): V3;
  (k1: number, v1: V3, k2: number, v2: V3, k3: number, v3: V3): V3;
  (k1: number, v1: V3, k2: number, v2: V3, k3: number, v3: V3, k4: number, v4: V3): V3;
  (k1: number, v1: V3, k2: number, v2: V3, k3: number, v3: V3, k4: number, v4: V3, k5: number, v5: V3): V3;
};
export const X = math.X as V3;
export const Y = math.Y as V3;
export const Z = math.Z as V3;

export const skel = esqueleto.skel as unknown as (p: Pose) => Esqueleto;
/** Os três cantos da escápula de um lado. */
export const scapPts = esqueleto.scapPts as unknown as (sk: Esqueleto, k: Lado) => [V3, V3, V3];
export const interp = esqueleto.interp as <T>(a: T, b: T, u: number) => T;
export const ease = esqueleto.ease as (u: number) => number;

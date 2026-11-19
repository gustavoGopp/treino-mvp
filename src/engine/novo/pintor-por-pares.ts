// O pintor por pares (estudo de 19/11/2026: docs/revisoes/animacao-nova/estudo-do-pintor.md). Pronto para ligar, e
// DESLIGADO em todas as animações: liga-se uma a uma, em ./pintor-ligado.ts, depois que o Gustavo aprova a folha de
// antes e depois de cada uma (scripts/animacao-nova/folha-do-pintor.mjs). Etapa 1 (19/11): o mesmo resultado do
// protótipo do estudo, quadro a quadro, com menos conta (ver "Etapa 1" no relatório).
//
// O pintor de hoje (`pintar`, em ./desenho.ts) ordena itens inteiros por uma profundidade só: cada sólido da peça pelo
// meio dele (mais o `dz`), cada grupo do Boneco pela média das partes (mais o `vies`). Uma peça comprida, ou um corpo
// que se estende em profundidade, não tem uma ordem única certa contra o outro, e a ordem pelo meio erra.
//
// Aqui, sem mudar o desenho de item nenhum (o mesmo SVG, o mesmo contorno único do corpo):
// 1) Ordem por pares. Numa grade de PASSO cm na tela, para cada par (item do Boneco, item de peça) que se cruza, o que
//    está mesmo na frente onde os dois cobrem o mesmo ponto: a pele pela malha das partes (16 pontos por anel), a peça
//    pela forma 3D que o gerador realista guarda em cada item (`g3`). Um par decidido (pelo menos AREA_MINIMA cm² de um
//    lado e menos que isso do outro) vira uma regra "X antes de Y". Os pares do Boneco entre si, e os de peça com peça
//    que se cruzam na tela, ficam na ordem de hoje (o desenho aprovado). A ordem final é a ordenação topológica dessas
//    regras que, onde nada obriga, mantém a de hoje: dois itens que não se cruzam na tela podem trocar de lugar sem
//    mudar nada no desenho. Um ciclo (raro) é desfeito largando a regra de menor área.
// 2) Remendos. Quando um item do Boneco está na frente de uma peça num pedaço e atrás em outro (o corpo não é convexo:
//    a perna passa na frente da ponta do banco e o tronco fica atrás da outra), a ordem única serve a um dos pedaços;
//    no outro, o item que devia ficar por cima é pintado de novo, logo depois do outro, recortado (clipPath, ou mask
//    quando há o que tirar) à região dos trechos do corpo em que ele está na frente. O trecho é o casco de dois anéis
//    vizinhos de uma parte, folgado FOLGA_DO_RECORTE cm (para o traço do contorno entrar inteiro).
//
// O que cada item é vem do próprio item (`Item.pp`): o Boneco diz que partes cada item pinta, e o equipamento realista
// diz de que peça é cada item (no protótipo, isso era achado comparando o texto dos caminhos e desenhando cada peça
// sozinha). Sem Math.random e sem relógio: a mesma entrada dá o mesmo SVG (o nome de cada recorte sai do conteúdo).
import type { Anel } from './corpo3d';
import { casco, pintar } from './desenho';
import type { Camera, Item, MarcaDoPintor, P2, ParteDoItem } from './desenho';
import type { Lado } from './esqueleto';
import type { Geometria3d } from './realista/base.mjs';
import { add, cross, dist, dot, len, mul, norm, sub } from './vec';
import type { V3 } from './vec';

/* ============================== opções ============================== */
export interface OpcoesDoPintor {
  /** Lado da célula da grade (cm). */
  passo: number;
  /** A parte que está na frente tem de estar mais que isto (cm) à frente da outra (o contato não decide nada). */
  tolerancia: number;
  /** Um lado do par decide com pelo menos esta área (cm²). */
  areaMinima: number;
  /** Pintar os remendos (passo 2). */
  remendos: boolean;
  /** O contato (o ponto escondido a até `tolerancia` cm do outro, ou dentro dele) não decide nada: muda menos desenho. */
  contato: boolean;
}
export const PADRAO: OpcoesDoPintor = { passo: 1, tolerancia: 1, areaMinima: 1, remendos: true, contato: true };
/** Folga do recorte em volta de cada trecho do corpo (cm): o traço do contorno do Boneco cabe dentro dela. */
export const FOLGA_DO_RECORTE = 1.5;
/** A mão não decide nada contra a peça que segura (a que passa a até 4 cm da pegada; da mesma peça, até 12 cm). */
const RAIO_DA_PEGADA = 4,
  PERTO_DA_PEGADA = 12;

type MarcaDoCorpo = Extract<MarcaDoPintor, { k: 'corpo' }>;
/** Um item de remendo: o item `de`, pintado de novo, só dentro de `dentro` e fora de `fora` (polígonos na tela). */
export interface Remendo {
  de: Item;
  dentro: P2[][];
  fora: P2[][];
}
const REMENDOS = new WeakMap<Item, Remendo>();
/** O remendo que um item da lista de `ordenarPorPares` é (para a conferência da pintura medir só dentro do recorte). */
export const remendoDe = (it: Item): Remendo | undefined => REMENDOS.get(it);

/* ============================== a forma 3D de uma peça (como em ./conferir-pintura.ts) ============================== */
interface Plano {
  n: V3;
  d: number;
}
type Forma = { t: 'solido'; planos: Plano[]; pts: V3[] } | { t: 'fio'; pts: V3[]; r: number } | { t: 'esfera'; c: V3; r: number } | { t: 'placa'; pts: V3[]; n: V3; d: number };
const media = (P: V3[]): V3 => mul(P.reduce((a, p) => add(a, p), [0, 0, 0] as V3), 1 / P.length);
function planos(faces: V3[][]): Plano[] {
  const cen = media(faces.flat());
  const out: Plano[] = [];
  for (const f of faces) {
    if (f.length < 3) continue;
    let n: V3 = [0, 0, 0];
    for (let k = 0; k < f.length; k++) {
      const a = f[k]!,
        b = f[(k + 1) % f.length]!;
      n = add(n, [(a[1] - b[1]) * (a[2] + b[2]), (a[2] - b[2]) * (a[0] + b[0]), (a[0] - b[0]) * (a[1] + b[1])]);
    }
    if (len(n) < 1e-9) continue;
    n = norm(n);
    let d = dot(n, media(f));
    if (dot(n, cen) > d) {
      n = mul(n, -1);
      d = -d;
    }
    out.push({ n, d });
  }
  return out;
}
/** A forma de cada `g3`, guardada: as peças paradas repetem o mesmo item (e o mesmo `g3`) em todos os quadros. */
const FORMAS = new WeakMap<object, Forma | null>();
function formaDe(g: Geometria3d): Forma | null {
  if (FORMAS.has(g)) return FORMAS.get(g)!;
  let f: Forma | null = null;
  if ('faces' in g) f = { t: 'solido', planos: planos(g.faces), pts: g.faces.flat() };
  else if ('frente' in g) {
    const { frente, tras } = g;
    const n = frente.length;
    const lados = frente.map((p, i) => [p, frente[(i + 1) % n]!, tras[(i + 1) % n]!, tras[i]!]);
    f = { t: 'solido', planos: planos([frente, tras, ...lados]), pts: [...frente, ...tras] };
  } else if ('esfera' in g) f = { t: 'esfera', c: g.esfera, r: g.r };
  else if ('placa' in g) {
    const P = g.placa;
    const n = norm(cross(sub(P[1]!, P[0]!), sub(P[2]!, P[0]!)));
    f = len(n) > 0.5 ? { t: 'placa', pts: P, n, d: dot(n, P[0]!) } : null;
  } else if ('fio' in g) f = { t: 'fio', pts: g.fio, r: g.w / 2 };
  FORMAS.set(g, f);
  return f;
}
function distAoSegmento(p: V3, a: V3, b: V3): number {
  const d = sub(b, a),
    l2 = dot(d, d);
  const t = l2 < 1e-12 ? 0 : Math.max(0, Math.min(1, dot(sub(p, a), d) / l2));
  return dist(p, add(a, mul(d, t)));
}
/** A distância (cm; negativa = dentro) de um ponto até a forma. No sólido, a conta é feita sem criar vetores. */
function distanciaAForma(f: Forma, p0: number, p1: number, p2: number): number {
  if (f.t === 'solido') {
    let m = -Infinity;
    for (const pl of f.planos) m = Math.max(m, pl.n[0] * p0 + pl.n[1] * p1 + pl.n[2] * p2 - pl.d);
    return m;
  }
  const p: V3 = [p0, p1, p2];
  if (f.t === 'esfera') return dist(p, f.c) - f.r;
  const P = f.t === 'placa' ? [...f.pts, f.pts[0]!] : f.pts;
  let m = 1e9;
  for (let i = 0; i + 1 < P.length; i++) m = Math.min(m, distAoSegmento(p, P[i]!, P[i + 1]!));
  return m - (f.t === 'fio' ? f.r : 0);
}

/**
 * A folga (cm; negativa = dentro) de um ponto até a pele do segmento entre os anéis i e i + 1 de uma parte, pela seção
 * oval; Infinity quando o segmento não conta (curto demais, ou com raio nulo). A folga a um trecho do corpo é a menor
 * das folgas aos segmentos dele e dos dois vizinhos. As mesmas contas, na mesma ordem, do protótipo (a mesma resposta,
 * até o último bit), sem criar vetores.
 */
function folgaAoSegmento(p0: number, p1: number, p2: number, A: Anel[], i: number): number {
  const a = A[i]!,
    b = A[i + 1]!;
  const ac = a.c,
    bc = b.c;
  const d0 = bc[0] - ac[0],
    d1 = bc[1] - ac[1],
    d2 = bc[2] - ac[2];
  const l2 = d0 * d0 + d1 * d1 + d2 * d2;
  if (l2 < 1e-9) return Infinity;
  const t = Math.max(0, Math.min(1, ((p0 - ac[0]) * d0 + (p1 - ac[1]) * d1 + (p2 - ac[2]) * d2) / l2));
  const s = 1 - t;
  const r0 = p0 - (ac[0] + d0 * t),
    r1 = p1 - (ac[1] + d1 * t),
    r2 = p2 - (ac[2] + d2 * t);
  const x0 = a.x[0] * s + b.x[0] * t,
    x1 = a.x[1] * s + b.x[1] * t,
    x2 = a.x[2] * s + b.x[2] * t;
  const lx = Math.hypot(x0, x1, x2) || 1;
  const z0 = a.z[0] * s + b.z[0] * t,
    z1 = a.z[1] * s + b.z[1] * t,
    z2 = a.z[2] * s + b.z[2] * t;
  const lz = Math.hypot(z0, z1, z2) || 1;
  const u = r0 * (x0 / lx) + r1 * (x1 / lx) + r2 * (x2 / lx),
    v = r0 * (z0 / lz) + r1 * (z1 / lz) + r2 * (z2 / lz);
  const ra = a.a + (b.a - a.a) * t,
    rv = v >= 0 ? a.f + (b.f - a.f) * t : a.b + (b.b - a.b) * t;
  if (ra < 1e-6 || rv < 1e-6) return Infinity;
  const rho = Math.hypot(u / ra, v / rv);
  return rho < 1e-6 ? -Math.min(ra, rv) : Math.hypot(u, v) * (1 - 1 / rho);
}
/**
 * `folgaAoSegmento(...) <= tol`, depressa. A mesma conta com Math.sqrt no lugar de Math.hypot (cinco vezes mais rápida,
 * e com diferença na casa de 1e-12 cm): quando a folga passa longe de `tol` (mais de MARGEM cm), a resposta é a mesma da
 * conta exata; perto de `tol`, ou nos casos de borda (eixo nulo, ponto quase no eixo, v quase zero, que decide o lado
 * da seção), vale a conta exata. A resposta é sempre a da conta exata.
 */
const MARGEM = 1e-6;
function folgaAbaixo(p0: number, p1: number, p2: number, A: Anel[], i: number, tol: number): boolean {
  const a = A[i]!,
    b = A[i + 1]!;
  const ac = a.c,
    bc = b.c;
  const d0 = bc[0] - ac[0],
    d1 = bc[1] - ac[1],
    d2 = bc[2] - ac[2];
  const l2 = d0 * d0 + d1 * d1 + d2 * d2;
  if (l2 < 1e-9) return false;
  const t = Math.max(0, Math.min(1, ((p0 - ac[0]) * d0 + (p1 - ac[1]) * d1 + (p2 - ac[2]) * d2) / l2));
  const s = 1 - t;
  const r0 = p0 - (ac[0] + d0 * t),
    r1 = p1 - (ac[1] + d1 * t),
    r2 = p2 - (ac[2] + d2 * t);
  const x0 = a.x[0] * s + b.x[0] * t,
    x1 = a.x[1] * s + b.x[1] * t,
    x2 = a.x[2] * s + b.x[2] * t;
  const z0 = a.z[0] * s + b.z[0] * t,
    z1 = a.z[1] * s + b.z[1] * t,
    z2 = a.z[2] * s + b.z[2] * t;
  const lx = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2),
    lz = Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  const exata = () => folgaAoSegmento(p0, p1, p2, A, i) <= tol;
  if (lx < 1e-3 || lz < 1e-3) return exata();
  const u = (r0 * x0 + r1 * x1 + r2 * x2) / lx,
    v = (r0 * z0 + r1 * z1 + r2 * z2) / lz;
  if (Math.abs(v) < MARGEM) return exata();
  const ra = a.a + (b.a - a.a) * t,
    rv = v >= 0 ? a.f + (b.f - a.f) * t : a.b + (b.b - a.b) * t;
  if (ra < 1e-6 || rv < 1e-6) return false;
  const q = Math.sqrt(u * u + v * v);
  if (q < 1e-3) return exata();
  const rho = Math.sqrt((u / ra) * (u / ra) + (v / rv) * (v / rv));
  if (rho < 1e-5) return exata();
  const f = q * (1 - 1 / rho);
  if (f > tol + MARGEM) return false;
  if (f < tol - MARGEM) return true;
  return exata();
}
/** A folga de um ponto até a parte de um anel só (uma esfera). */
const folgaAoAnel = (p0: number, p1: number, p2: number, an: Anel) => Math.hypot(p0 - an.c[0], p1 - an.c[1], p2 - an.c[2]) - Math.max(an.a, an.f, an.b);
/** Uma peça pintada pelo menos isto (cm) atrás da profundidade do próprio centro foi empurrada para trás de propósito. */
const EMPURRADA = 50;
function empurrada(it: Item, f: Forma, cam: Camera): boolean {
  const P = f.t === 'esfera' ? [f.c] : f.pts;
  return P.reduce((a, p) => a + dot(p, cam.para), 0) / P.length - it.d >= EMPURRADA;
}

/* ============================== a grade ============================== */
interface Grade {
  x0: number;
  y0: number;
  h: number;
  W: number;
  H: number;
  /**
   * As células dentro da caixa de alguma peça, em somas acumuladas ((W + 1) × (H + 1)): só nelas o corpo é lido, e o
   * triângulo do corpo que não alcança nenhuma não precisa ser desenhado na grade.
   */
  pecas?: Int32Array;
}
/** Quantas células dentro da caixa de alguma peça há no retângulo [i0, i1] × [j0, j1] da grade. */
function celulasDePeca(G: Grade, i0: number, i1: number, j0: number, j1: number): number {
  const S = G.pecas!,
    L = G.W + 1;
  return S[(j1 + 1) * L + i1 + 1]! - S[j0 * L + i1 + 1]! - S[(j1 + 1) * L + i0]! + S[j0 * L + i0]!;
}
/** Um item do corpo na grade: a pele mais perto de quem olha e de que trecho ela é; e as células que ele pode cobrir. */
interface CorpoNaGrade {
  z: Float32Array;
  s: Int32Array;
  i0: number;
  i1: number;
  j0: number;
  j1: number;
}
/** Uma peça na grade, dentro da caixa dela: a profundidade em que o raio entra nela. */
interface PecaNaGrade {
  i0: number;
  j0: number;
  w: number;
  hh: number;
  z: Float32Array;
}
interface Trecho {
  no: number;
  vol: ParteDoItem;
  r: number;
}
/**
 * As grades de cada quadro saem de um pedaço de memória reaproveitado de um quadro para o outro (sem criar e jogar fora
 * dezenas de vetores grandes por quadro). `zerar` no começo de cada quadro; nada da grade sobrevive ao quadro.
 */
const MEMORIA = { f: new Float32Array(1 << 16), i: new Int32Array(1 << 16), nf: 0, ni: 0 };
function grade32(n: number, v: number): Float32Array {
  if (MEMORIA.nf + n > MEMORIA.f.length) {
    MEMORIA.f = new Float32Array(Math.max(2 * MEMORIA.f.length, 2 * n));
    MEMORIA.nf = 0;
  }
  const a = MEMORIA.f.subarray(MEMORIA.nf, (MEMORIA.nf += n));
  return a.fill(v);
}
function gradeInt(n: number, v: number): Int32Array {
  if (MEMORIA.ni + n > MEMORIA.i.length) {
    MEMORIA.i = new Int32Array(Math.max(2 * MEMORIA.i.length, 2 * n));
    MEMORIA.ni = 0;
  }
  const a = MEMORIA.i.subarray(MEMORIA.ni, (MEMORIA.ni += n));
  return a.fill(v);
}
const NA = 16;
const COS = Array.from({ length: NA }, (_, k) => Math.cos((2 * Math.PI * k) / NA)),
  SEN = Array.from({ length: NA }, (_, k) => Math.sin((2 * Math.PI * k) / NA));
type T3 = [number, number, number];
const naTela3 = (cam: Camera, p: V3): T3 => [dot(p, cam.dir), -dot(p, cam.cima), dot(p, cam.para)];

/** Os pontos de um anel na tela ([x, y, profundidade]), com folga opcional (cm) em volta. */
function anelNaTela(cam: Camera, an: Anel, folga = 0, n = NA): T3[] {
  const c = naTela3(cam, an.c),
    X = naTela3(cam, an.x),
    Z = naTela3(cam, an.z);
  const out: T3[] = [];
  for (let k = 0; k < n; k++) {
    const th = (2 * Math.PI * k) / n;
    const u = (an.a + folga) * Math.cos(th),
      sn = Math.sin(th),
      w = ((sn >= 0 ? an.f : an.b) + folga) * sn;
    out.push([c[0] + u * X[0] + w * Z[0], c[1] + u * X[1] + w * Z[1], c[2] + u * X[2] + w * Z[2]]);
  }
  return out;
}
function rasterTriangulo(G: Grade, a: T3, b: T3, c: T3, z: Float32Array, s: Int32Array, t: number) {
  const { x0, y0, h, W, H } = G;
  const ax = (a[0] - x0) / h,
    ay = (a[1] - y0) / h,
    bx = (b[0] - x0) / h,
    by = (b[1] - y0) / h,
    cx = (c[0] - x0) / h,
    cy = (c[1] - y0) / h;
  const area = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  if (Math.abs(area) < 1e-9) return;
  const i0 = Math.max(0, Math.floor(Math.min(ax, bx, cx))),
    i1 = Math.min(W - 1, Math.ceil(Math.max(ax, bx, cx))),
    j0 = Math.max(0, Math.floor(Math.min(ay, by, cy))),
    j1 = Math.min(H - 1, Math.ceil(Math.max(ay, by, cy)));
  if (i1 < i0 || j1 < j0 || (G.pecas && !celulasDePeca(G, i0, i1, j0, j1))) return;
  for (let j = j0; j <= j1; j++) {
    const py = j + 0.5;
    for (let i = i0; i <= i1; i++) {
      const px = i + 0.5;
      const w0 = ((bx - px) * (cy - py) - (by - py) * (cx - px)) / area,
        w1 = ((cx - px) * (ay - py) - (cy - py) * (ax - px)) / area,
        w2 = 1 - w0 - w1;
      if (w0 < -1e-9 || w1 < -1e-9 || w2 < -1e-9) continue;
      const ix = j * W + i,
        zz = w0 * a[2] + w1 * b[2] + w2 * c[2];
      if (zz > z[ix]!) {
        z[ix] = zz;
        s[ix] = t;
      }
    }
  }
}
/** Face virada para quem olha (a malha é fechada pelas tampas). */
function virado(a: T3, b: T3, c: T3, cen: T3): boolean {
  const u0 = b[0] - a[0],
    u1 = b[1] - a[1],
    u2 = b[2] - a[2],
    w0 = c[0] - a[0],
    w1 = c[1] - a[1],
    w2 = c[2] - a[2];
  const n0 = u1 * w2 - u2 * w1,
    n1 = u2 * w0 - u0 * w2,
    n2 = u0 * w1 - u1 * w0;
  const s = n0 * ((a[0] + b[0] + c[0]) / 3 - cen[0]) + n1 * ((a[1] + b[1] + c[1]) / 3 - cen[1]) + n2 * ((a[2] + b[2] + c[2]) / 3 - cen[2]);
  return (s >= 0 ? n2 : -n2) > -1e-9;
}
function corpoNaGrade(G: Grade, cam: Camera, vols: ParteDoItem[], trechos: Trecho[], no: number): CorpoNaGrade {
  const n = G.W * G.H;
  const z = grade32(n, -Infinity),
    s = gradeInt(n, -1);
  // as células que a malha pode cobrir: a caixa dos vértices (para pular depressa as peças longe deste item)
  let mx0 = Infinity,
    my0 = Infinity,
    mx1 = -Infinity,
    my1 = -Infinity;
  const caixa = (p: T3) => {
    if (p[0] < mx0) mx0 = p[0];
    if (p[0] > mx1) mx1 = p[0];
    if (p[1] < my0) my0 = p[1];
    if (p[1] > my1) my1 = p[1];
  };
  for (const vol of vols) {
    const A = vol.aneis.map((an) => ({ anel: anelNaTela(cam, an), c: naTela3(cam, an.c) }));
    const base = trechos.length;
    for (let r = 0; r + 1 < A.length || (r === 0 && A.length === 1); r++) trechos.push({ no, vol, r });
    for (const x of A) {
      caixa(x.c);
      x.anel.forEach(caixa);
    }
    // o trecho fora da grade não cobre célula nenhuma (pula os triângulos dele)
    const gx1 = G.x0 + (G.W + 1) * G.h,
      gy1 = G.y0 + (G.H + 1) * G.h;
    const fora = (P: T3[], Q: T3[]) => {
      let a = Infinity,
        b = -Infinity,
        c = Infinity,
        d = -Infinity;
      for (const R of [P, Q])
        for (const p of R) {
          if (p[0] < a) a = p[0];
          if (p[0] > b) b = p[0];
          if (p[1] < c) c = p[1];
          if (p[1] > d) d = p[1];
        }
      return b < G.x0 - G.h || a > gx1 || d < G.y0 - G.h || c > gy1;
    };
    for (let r = 0; r + 1 < A.length; r++) {
      const P = A[r]!.anel,
        Q = A[r + 1]!.anel;
      if (fora(P, Q)) continue;
      const c0 = A[r]!.c,
        c1 = A[r + 1]!.c;
      const cen: T3 = [(c0[0] + c1[0]) / 2, (c0[1] + c1[1]) / 2, (c0[2] + c1[2]) / 2];
      for (let k = 0; k < NA; k++) {
        const k2 = (k + 1) % NA;
        if (virado(P[k]!, P[k2]!, Q[k2]!, cen)) rasterTriangulo(G, P[k]!, P[k2]!, Q[k2]!, z, s, base + r);
        if (virado(P[k]!, Q[k2]!, Q[k]!, cen)) rasterTriangulo(G, P[k]!, Q[k2]!, Q[k]!, z, s, base + r);
      }
    }
    for (const r of [0, A.length - 1]) {
      const { anel, c } = A[r]!;
      const t = base + Math.min(r, Math.max(0, A.length - 2));
      for (let k = 0; k < NA; k++) rasterTriangulo(G, c, anel[k]!, anel[(k + 1) % NA]!, z, s, t);
    }
  }
  // folga de uma célula para cada lado: a caixa só serve para pular, e nunca pode deixar de fora uma célula coberta
  return {
    z,
    s,
    i0: Math.max(0, Math.floor((mx0 - G.x0) / G.h) - 1),
    i1: Math.min(G.W - 1, Math.ceil((mx1 - G.x0) / G.h) + 1),
    j0: Math.max(0, Math.floor((my0 - G.y0) / G.h) - 1),
    j1: Math.min(G.H - 1, Math.ceil((my1 - G.y0) / G.h) + 1),
  };
}
/** A caixa de uma forma na tela. */
function caixaDaForma(f: Forma, cam: Camera): [number, number, number, number] {
  const P = f.t === 'esfera' ? [f.c] : f.pts;
  const r = f.t === 'esfera' || f.t === 'fio' ? f.r : 0;
  let a = 1e9,
    b = 1e9,
    c = -1e9,
    d = -1e9;
  for (const p of P) {
    const x = dot(p, cam.dir),
      y = -dot(p, cam.cima);
    a = Math.min(a, x);
    b = Math.min(b, y);
    c = Math.max(c, x);
    d = Math.max(d, y);
  }
  return [a - r, b - r, c + r, d + r];
}
/** O contorno de uma forma na tela (para tirar do recorte de um remendo). */
function cascoDaForma(f: Forma, cam: Camera): P2[] {
  if (f.t === 'esfera') {
    const c = naTela3(cam, f.c);
    return Array.from({ length: 16 }, (_, k): P2 => [c[0] + f.r * COS[k]!, c[1] + f.r * SEN[k]!]);
  }
  const P = f.pts.map((p): P2 => [dot(p, cam.dir), -dot(p, cam.cima)]);
  if (f.t !== 'fio') return casco(P);
  // o fio: o casco de cada trecho, com a largura do traço
  const out: P2[] = [];
  for (const p of P) for (let k = 0; k < 8; k++) out.push([p[0] + f.r * Math.cos((k * Math.PI) / 4), p[1] + f.r * Math.sin((k * Math.PI) / 4)]);
  return casco(out);
}
function pecaNaGrade(G: Grade, cam: Camera, f: Forma): PecaNaGrade | null {
  const { x0, y0, h, W, H } = G;
  const cx = caixaDaForma(f, cam);
  const i0 = Math.max(0, Math.floor((cx[0] - x0) / h)),
    i1 = Math.min(W - 1, Math.ceil((cx[2] - x0) / h)),
    j0 = Math.max(0, Math.floor((cx[1] - y0) / h)),
    j1 = Math.min(H - 1, Math.ceil((cx[3] - y0) / h));
  if (i1 < i0 || j1 < j0) return null;
  const w = i1 - i0 + 1,
    hh = j1 - j0 + 1;
  const z = grade32(w * hh, -Infinity);
  const marca = (i: number, j: number, zz: number) => {
    const k = (j - j0) * w + (i - i0);
    if (zz > z[k]!) z[k] = zz;
  };
  const sx = (i: number) => x0 + (i + 0.5) * h,
    sy = (j: number) => y0 + (j + 0.5) * h;
  if (f.t === 'solido') {
    const fr = f.planos.filter((p) => dot(p.n, cam.para) > 1e-9).map((p) => [dot(p.n, cam.dir), dot(p.n, cam.cima), dot(p.n, cam.para), p.d] as const);
    if (!fr.length) return null;
    const nf = fr.length,
      F = new Float64Array(fr.flat());
    const Hc = casco(f.pts.map((p): P2 => [dot(p, cam.dir), -dot(p, cam.cima)]));
    for (let j = j0; j <= j1; j++) {
      const y = sy(j);
      let xa = Infinity,
        xb = -Infinity;
      for (let q = 0; q < Hc.length; q++) {
        const A = Hc[q]!,
          B = Hc[(q + 1) % Hc.length]!;
        if ((A[1] < y && B[1] < y) || (A[1] > y && B[1] > y)) continue;
        const x = A[1] === B[1] ? A[0] : A[0] + ((y - A[1]) * (B[0] - A[0])) / (B[1] - A[1]);
        xa = Math.min(xa, x, A[1] === B[1] ? B[0] : x);
        xb = Math.max(xb, x, A[1] === B[1] ? B[0] : x);
      }
      if (xa > xb) continue;
      const ia = Math.max(i0, Math.ceil((xa - x0) / h - 0.5)),
        ib = Math.min(i1, Math.floor((xb - x0) / h - 0.5));
      const linha = (j - j0) * w - i0;
      for (let i = ia; i <= ib; i++) {
        const x = sx(i);
        let entra = Infinity;
        for (let q = 0; q < nf; q++) entra = Math.min(entra, (F[q * 4 + 3]! - x * F[q * 4]! + y * F[q * 4 + 1]!) / F[q * 4 + 2]!);
        if (entra > z[linha + i]!) z[linha + i] = entra;
      }
    }
  } else if (f.t === 'esfera') {
    const c = naTela3(cam, f.c);
    for (let j = j0; j <= j1; j++)
      for (let i = i0; i <= i1; i++) {
        const r2 = f.r * f.r - (sx(i) - c[0]) ** 2 - (sy(j) - c[1]) ** 2;
        if (r2 >= 0) marca(i, j, c[2] + Math.sqrt(r2));
      }
  } else if (f.t === 'placa') {
    const P = f.pts.map((p) => naTela3(cam, p));
    const c = dot(f.n, cam.para);
    if (Math.abs(c) < 1e-6) return null;
    for (let j = j0; j <= j1; j++)
      for (let i = i0; i <= i1; i++) {
        const x = sx(i),
          y = sy(j);
        if (!dentroDoPoligono(x, y, P)) continue;
        marca(i, j, (f.d - x * dot(f.n, cam.dir) + y * dot(f.n, cam.cima)) / c);
      }
  } else {
    const P = f.pts.map((p) => naTela3(cam, p));
    for (let q = 0; q + 1 < P.length; q++) {
      const A = P[q]!,
        B = P[q + 1]!;
      const dx = B[0] - A[0],
        dy = B[1] - A[1],
        l2 = dx * dx + dy * dy;
      const ia = Math.max(i0, Math.floor((Math.min(A[0], B[0]) - f.r - x0) / h)),
        ib = Math.min(i1, Math.ceil((Math.max(A[0], B[0]) + f.r - x0) / h)),
        ja = Math.max(j0, Math.floor((Math.min(A[1], B[1]) - f.r - y0) / h)),
        jb = Math.min(j1, Math.ceil((Math.max(A[1], B[1]) + f.r - y0) / h));
      for (let j = ja; j <= jb; j++)
        for (let i = ia; i <= ib; i++) {
          const x = sx(i),
            y = sy(j);
          const t = l2 < 1e-12 ? 0 : Math.max(0, Math.min(1, ((x - A[0]) * dx + (y - A[1]) * dy) / l2));
          if ((x - A[0] - t * dx) ** 2 + (y - A[1] - t * dy) ** 2 > f.r * f.r) continue;
          marca(i, j, A[2] + (B[2] - A[2]) * t + f.r);
        }
    }
  }
  return { i0, j0, w, hh, z };
}
function dentroDoPoligono(x: number, y: number, P: readonly (readonly number[])[]): boolean {
  let dentro = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const a = P[i]!,
      b = P[j]!;
    if (a[1]! > y !== b[1]! > y && x < ((b[0]! - a[0]!) * (y - a[1]!)) / (b[1]! - a[1]!) + a[0]!) dentro = !dentro;
  }
  return dentro;
}

/* ============================== o contato: os trechos perto de um ponto ============================== */
/** Lado do bloco de células em que os trechos do corpo são separados, para achar depressa os que podem estar perto. */
const BLOCO = 4;
/**
 * `encosta(p)`: se o ponto p (no raio de uma célula da grade) está a até `tol` cm da pele de algum trecho do corpo (ou
 * dentro dela). A mesma resposta de conferir todos os trechos, um por um, como no protótipo: cada trecho entra só nos
 * blocos de células que a caixa 3D dele, projetada na tela, pode cobrir (com folga), e o ponto é conferido contra os
 * trechos do bloco dele, pela mesma caixa 3D e pela mesma folga.
 */
function contatoComOCorpo(G: Grade, cam: Camera, trechos: Trecho[], tol: number) {
  const caixas = new Float64Array(trechos.length * 6);
  const nbx = Math.ceil(G.W / BLOCO),
    nby = Math.ceil(G.H / BLOCO);
  // os blocos que cada trecho alcança (em blocos), e a lista de cada bloco, feita só quando o bloco é consultado
  const alcance = new Int32Array(trechos.length * 4);
  const blocos: (number[] | undefined)[] = new Array(nbx * nby);
  const FOLGA = 1e-6;
  trechos.forEach((tr, t) => {
    const A = tr.vol.aneis;
    const lo: V3 = [1e9, 1e9, 1e9],
      hi: V3 = [-1e9, -1e9, -1e9];
    for (const an of [A[tr.r]!, A[Math.min(A.length - 1, tr.r + 1)]!]) {
      const r = Math.max(an.a, an.f, an.b) + tol;
      for (let k = 0; k < 3; k++) {
        lo[k] = Math.min(lo[k]!, an.c[k]! - r);
        hi[k] = Math.max(hi[k]!, an.c[k]! + r);
      }
    }
    caixas.set([lo[0], lo[1], lo[2], hi[0], hi[1], hi[2]], t * 6);
    // a caixa na tela: os oito cantos projetados
    let sx0 = Infinity,
      sx1 = -Infinity,
      sy0 = Infinity,
      sy1 = -Infinity;
    for (const a of [lo[0], hi[0]])
      for (const b of [lo[1], hi[1]])
        for (const c of [lo[2], hi[2]]) {
          const x = a * cam.dir[0] + b * cam.dir[1] + c * cam.dir[2],
            y = -(a * cam.cima[0] + b * cam.cima[1] + c * cam.cima[2]);
          sx0 = Math.min(sx0, x);
          sx1 = Math.max(sx1, x);
          sy0 = Math.min(sy0, y);
          sy1 = Math.max(sy1, y);
        }
    // as células cujo centro pode cair dentro, com uma célula a mais de cada lado
    const i0 = Math.max(0, Math.floor((sx0 - FOLGA - G.x0) / G.h - 0.5) - 1),
      i1 = Math.min(G.W - 1, Math.ceil((sx1 + FOLGA - G.x0) / G.h - 0.5) + 1),
      j0 = Math.max(0, Math.floor((sy0 - FOLGA - G.y0) / G.h - 0.5) - 1),
      j1 = Math.min(G.H - 1, Math.ceil((sy1 + FOLGA - G.y0) / G.h - 0.5) + 1);
    alcance.set([Math.floor(i0 / BLOCO), Math.floor(i1 / BLOCO), Math.floor(j0 / BLOCO), Math.floor(j1 / BLOCO)], t * 4);
  });
  const doBloco = (bi: number, bj: number): number[] => {
    const l: number[] = [];
    for (let t = 0; t < trechos.length; t++) if (alcance[t * 4]! <= bi && bi <= alcance[t * 4 + 1]! && alcance[t * 4 + 2]! <= bj && bj <= alcance[t * 4 + 3]!) l.push(t);
    return l;
  };
  // cada segmento (entre dois anéis vizinhos de uma parte) é conferido uma vez por ponto: os trechos vizinhos dividem
  // segmentos (a folga a um trecho é a menor das folgas aos segmentos dele e dos vizinhos, e basta uma abaixo de `tol`)
  const baseDe = new Map<ParteDoItem, number>();
  let nSeg = 0;
  for (const tr of trechos)
    if (!baseDe.has(tr.vol)) {
      baseDe.set(tr.vol, nSeg);
      nSeg += Math.max(1, tr.vol.aneis.length - 1);
    }
  const visto = new Int32Array(nSeg);
  let vez = 0;
  /** O ponto p, no raio da célula (ig, jg) da grade. */
  return (ig: number, jg: number, p0: number, p1: number, p2: number): boolean => {
    const bi = Math.floor(ig / BLOCO),
      bj = Math.floor(jg / BLOCO);
    const l = (blocos[bj * nbx + bi] ??= doBloco(bi, bj));
    vez++;
    for (const t of l) {
      const k = t * 6;
      if (!(p0 >= caixas[k]! && p1 >= caixas[k + 1]! && p2 >= caixas[k + 2]! && p0 <= caixas[k + 3]! && p1 <= caixas[k + 4]! && p2 <= caixas[k + 5]!)) continue;
      const tr = trechos[t]!,
        A = tr.vol.aneis;
      if (A.length === 1) {
        if (folgaAoAnel(p0, p1, p2, A[0]!) <= tol) return true;
        continue;
      }
      const b = baseDe.get(tr.vol)!;
      for (let i = Math.max(0, tr.r - 1); i <= Math.min(A.length - 2, tr.r + 1); i++) {
        if (visto[b + i] === vez) continue;
        visto[b + i] = vez;
        if (folgaAbaixo(p0, p1, p2, A, i, tol)) return true;
      }
    }
    return false;
  };
}

/* ============================== a ordem ============================== */
/** O resultado de um par (item do corpo, item de peça): por trecho do corpo, quantas células cada um tem na frente. */
interface Par {
  corpo: number;
  peca: number;
  /** Área (cm²) em que o corpo está na frente, e em que a peça está na frente. */
  aC: number;
  aP: number;
  /** Por trecho (índice global): células em que o corpo (frente) ou a peça (atras) está na frente. */
  frente: Map<number, number>;
  atras: Map<number, number>;
  /** Se os dois cobrem algum ponto em comum. */
  cruzam: boolean;
}
export interface Medida {
  /** Quantos pares decididos pela geometria, quantos ciclos desfeitos, quantos remendos. */
  pares: number;
  ciclos: number;
  remendos: number;
}
/** O que o último quadro ordenado teve (para os scripts que medem). */
export const ULTIMA: Medida = { pares: 0, ciclos: 0, remendos: 0 };
const hash = (t: string) => {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) {
    h ^= t.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
};
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
const caminho = (P: P2[][]) => P.map((Q) => `M${Q.map((p) => `${f1(p[0])} ${f1(p[1])}`).join('L')}Z`).join('');

/**
 * Os itens da camada 1 (o corpo e o equipamento) na ordem do pintor por pares, com os remendos no lugar. Os itens sem
 * marca (de outro quadro, os rótulos) e os das outras camadas não entram: `pintarPorPares` os põe antes e depois.
 */
export function ordenarPorPares(itens: Item[], o: OpcoesDoPintor = PADRAO): Item[] {
  ULTIMA.pares = ULTIMA.ciclos = ULTIMA.remendos = 0;
  MEMORIA.nf = MEMORIA.ni = 0;
  // a ordem de hoje (a de `pintar`)
  const hoje = itens
    .map((it, i) => ({ it, i }))
    .filter((x) => x.it.camada === 1)
    .sort((a, b) => a.it.d - b.it.d || a.i - b.i)
    .map((x) => x.it);
  let m0: MarcaDoCorpo | undefined;
  for (const it of hoje)
    if (it.pp?.k === 'corpo') {
      m0 = it.pp;
      break;
    }
  if (!m0) return hoje;
  const cam = m0.cam,
    e = m0.e;
  // os nós: o corpo (marcado) e as peças com forma; os outros itens (furos, detalhes sem forma) vão grudados na peça
  type No = { it: Item; ordem: number; tipo: 'corpo' | 'peca' | 'solto'; forma?: Forma; peca?: number; vols?: ParteDoItem[]; cx?: [number, number, number, number] };
  const nos: No[] = [];
  const grudados = new Map<number, Item[]>();
  const ultimoDaPeca = new Map<number, number>();
  hoje.forEach((it, ordem) => {
    const mk = it.pp;
    if (mk?.k === 'corpo' && mk.e === e) return void nos.push({ it, ordem, tipo: 'corpo', vols: mk.vols, cx: it.cx });
    const forma = it.g3 ? formaDe(it.g3) : null;
    // a peça empurrada para trás de propósito (as pontas da barra longa, `pontasAtras`) fica onde está: é escolha
    // declarada, e não erro de ordem (como na conferência, ./conferir-pintura.ts)
    if (mk?.k === 'peca' && forma && empurrada(it, forma, cam)) return void nos.push({ it, ordem, tipo: 'solto' });
    if (mk?.k === 'peca' && forma) {
      ultimoDaPeca.set(mk.peca, nos.length);
      return void nos.push({ it, ordem, tipo: 'peca', forma, peca: mk.peca, cx: caixaDaForma(forma, cam) });
    }
    // sem forma: gruda no último nó da mesma peça (o furo fica logo depois do trilho em que está)
    const ancora = mk?.k === 'peca' ? ultimoDaPeca.get(mk.peca) : undefined;
    if (ancora !== undefined) {
      const l = grudados.get(ancora) ?? [];
      l.push(it);
      grudados.set(ancora, l);
    } else nos.push({ it, ordem, tipo: 'solto' });
  });
  const N = nos.length;
  // a grade: onde há corpo e peça
  let bx0 = 1e9,
    by0 = 1e9,
    bx1 = -1e9,
    by1 = -1e9,
    px0 = 1e9,
    py0 = 1e9,
    px1 = -1e9,
    py1 = -1e9;
  for (const x of nos) {
    if (x.tipo === 'corpo')
      for (const v of x.vols!)
        for (const an of v.aneis) {
          const c = naTela3(cam, an.c),
            r = Math.max(an.a, an.f, an.b);
          bx0 = Math.min(bx0, c[0] - r);
          by0 = Math.min(by0, c[1] - r);
          bx1 = Math.max(bx1, c[0] + r);
          by1 = Math.max(by1, c[1] + r);
        }
    else if (x.cx) {
      px0 = Math.min(px0, x.cx[0]);
      py0 = Math.min(py0, x.cx[1]);
      px1 = Math.max(px1, x.cx[2]);
      py1 = Math.max(py1, x.cx[3]);
    }
  }
  const gx0 = Math.max(bx0, px0) - 1,
    gy0 = Math.max(by0, py0) - 1,
    gx1 = Math.min(bx1, px1) + 1,
    gy1 = Math.min(by1, py1) + 1;
  const pares: Par[] = [];
  const trechos: Trecho[] = [];
  if (gx1 > gx0 && gy1 > gy0) {
    const h = o.passo;
    const G: Grade = { x0: gx0, y0: gy0, h, W: Math.ceil((gx1 - gx0) / h), H: Math.ceil((gy1 - gy0) / h) };
    {
      // as células dentro da caixa de alguma peça (a mesma caixa, com uma célula de folga, de pecaNaGrade)
      const { W, H } = G,
        L = W + 1;
      const D = new Int32Array(L * (H + 1));
      for (const x of nos) {
        if (x.tipo !== 'peca') continue;
        const ck = x.cx!;
        const i0 = Math.max(0, Math.floor((ck[0] - G.x0) / h) - 1),
          i1 = Math.min(W - 1, Math.ceil((ck[2] - G.x0) / h) + 1),
          j0 = Math.max(0, Math.floor((ck[1] - G.y0) / h) - 1),
          j1 = Math.min(H - 1, Math.ceil((ck[3] - G.y0) / h) + 1);
        if (i1 < i0 || j1 < j0) continue;
        D[j0 * L + i0]!++;
        D[j0 * L + i1 + 1]!--;
        D[(j1 + 1) * L + i0]!--;
        D[(j1 + 1) * L + i1 + 1]!++;
      }
      // a cobertura de cada célula, e as somas acumuladas de "coberta"
      const S = new Int32Array(L * (H + 1));
      const linha = new Int32Array(L);
      for (let j = 0; j < H; j++) {
        let acc = 0,
          soma = 0;
        for (let i = 0; i < W; i++) {
          linha[i] = linha[i]! + D[j * L + i]!;
          acc += linha[i]!;
          soma += acc > 0 ? 1 : 0;
          S[(j + 1) * L + i + 1] = S[j * L + i + 1]! + soma;
        }
      }
      G.pecas = S;
    }
    const corposNaGrade = new Map<number, CorpoNaGrade>();
    nos.forEach((x, k) => {
      if (x.tipo === 'corpo') corposNaGrade.set(k, corpoNaGrade(G, cam, x.vols!, trechos, k));
    });
    // a peça que cada mão segura (a mão não decide nada contra ela)
    const segura = new Map<string, boolean>();
    const perto = (k: number, lado: Lado, r: number) => {
      const p = e.lado[lado].pegada;
      return distanciaAForma(nos[k]!.forma!, p[0], p[1], p[2]) <= r;
    };
    const daMao = (k: number, lado: Lado) => {
      const ch = `${k}${lado}`;
      let r = segura.get(ch);
      if (r === undefined) segura.set(ch, (r = perto(k, lado, RAIO_DA_PEGADA) || (perto(k, lado, PERTO_DA_PEGADA) && nos.some((y, j) => y.tipo === 'peca' && y.peca === nos[k]!.peca && perto(j, lado, RAIO_DA_PEGADA)))));
      return r;
    };
    const a1 = h * h;
    const encosta = o.contato ? contatoComOCorpo(G, cam, trechos, o.tolerancia) : null;
    const [dir, cima, para] = [cam.dir, cam.cima, cam.para];
    nos.forEach((x, kp) => {
      if (x.tipo !== 'peca') return;
      // a peça cuja caixa não cruza a de nenhum item do corpo não forma par com nenhum (pula a grade dela)
      const ck = caixaDaForma(x.forma!, cam);
      const ci0 = Math.floor((ck[0] - G.x0) / h) - 1,
        ci1 = Math.ceil((ck[2] - G.x0) / h) + 1,
        cj0 = Math.floor((ck[1] - G.y0) / h) - 1,
        cj1 = Math.ceil((ck[3] - G.y0) / h) + 1;
      let alcanca = false;
      for (const C of corposNaGrade.values()) if (ci0 <= C.i1 && C.i0 <= ci1 && cj0 <= C.j1 && C.j0 <= cj1) alcanca = true;
      if (!alcanca) return;
      const P = pecaNaGrade(G, cam, x.forma!);
      if (!P) return;
      // o contato da peça com o corpo, por célula: o ponto da peça no raio é o mesmo para todos os itens do corpo
      // (0 = ainda não visto, 1 = encosta, 2 = não encosta)
      const encostou = new Uint8Array(P.w * P.hh);
      for (const [kc, C] of corposNaGrade) {
        const par: Par = { corpo: kc, peca: kp, aC: 0, aP: 0, frente: new Map(), atras: new Map(), cruzam: false };
        // só onde a caixa do item do corpo e a da peça se cruzam (fora dela, um dos dois não cobre a célula); a mesma
        // ordem das células (linha a linha), para os trechos entrarem na mesma ordem
        const ja = Math.max(P.j0, C.j0),
          jb = Math.min(P.j0 + P.hh - 1, C.j1),
          ia = Math.max(P.i0, C.i0),
          ib = Math.min(P.i0 + P.w - 1, C.i1);
        for (let jg = ja; jg <= jb; jg++)
          for (let ig = ia; ig <= ib; ig++) {
            const kk = (jg - P.j0) * P.w + (ig - P.i0);
            const zp = P.z[kk]!;
            if (zp === -Infinity) continue;
            const ix = jg * G.W + ig;
            const zc = C.z[ix]!;
            if (zc === -Infinity) continue;
            const t = C.s[ix]!;
            const tr = trechos[t]!;
            par.cruzam = true;
            if ((tr.vol.nome === 'mao' || tr.vol.nome === 'polegar') && tr.vol.lado && daMao(kp, tr.vol.lado)) continue;
            const dif = zc - zp;
            // o contato: o ponto que fica escondido está encostado no outro, ou dentro dele (a pele que afunda no
            // assento, a coxa deitada no banco): não decide nada, como na conferência
            if (encosta && (dif > o.tolerancia || dif < -o.tolerancia)) {
              const X = G.x0 + (ig + 0.5) * G.h,
                Y = -(G.y0 + (jg + 0.5) * G.h);
              if (dif > o.tolerancia) {
                let v = encostou[kk]!;
                if (!v) encostou[kk] = v = encosta(ig, jg, dir[0] * X + cima[0] * Y + para[0] * zp, dir[1] * X + cima[1] * Y + para[1] * zp, dir[2] * X + cima[2] * Y + para[2] * zp) ? 1 : 2;
                if (v === 1) continue;
              } else if (distanciaAForma(x.forma!, dir[0] * X + cima[0] * Y + para[0] * zc, dir[1] * X + cima[1] * Y + para[1] * zc, dir[2] * X + cima[2] * Y + para[2] * zc) <= o.tolerancia) continue;
            }
            if (dif > o.tolerancia) {
              par.aC += a1;
              par.frente.set(t, (par.frente.get(t) ?? 0) + 1);
            } else if (dif < -o.tolerancia) {
              par.aP += a1;
              par.atras.set(t, (par.atras.get(t) ?? 0) + 1);
            }
          }
        if (par.cruzam) pares.push(par);
      }
    });
  }
  // as regras: a → b (a antes de b), com o peso (Infinity = a ordem de hoje, que não se larga)
  const arestas = new Map<number, Map<number, number>>();
  const regra = (a: number, b: number, w: number) => {
    let m = arestas.get(a);
    if (!m) arestas.set(a, (m = new Map()));
    m.set(b, Math.max(m.get(b) ?? 0, w));
  };
  const hojeAntes = (a: number, b: number) => (nos[a]!.ordem < nos[b]!.ordem ? [a, b] : [b, a]) as [number, number];
  const cruzaNaTela = (a: No, b: No) => {
    if (!a.cx || !b.cx) return true;
    return a.cx[0] < b.cx[2] && b.cx[0] < a.cx[2] && a.cx[1] < b.cx[3] && b.cx[1] < a.cx[3];
  };
  for (let a = 0; a < N; a++)
    for (let b = a + 1; b < N; b++) {
      const A = nos[a]!,
        B = nos[b]!;
      // o Boneco entre si, peça com peça (que se cruzam) e o que não tem forma: a ordem de hoje
      const doCorpo = (A.tipo === 'corpo') !== (B.tipo === 'corpo');
      if (!doCorpo || A.tipo === 'solto' || B.tipo === 'solto') {
        if (A.tipo === 'corpo' || B.tipo === 'corpo' || A.tipo === 'solto' || B.tipo === 'solto' || cruzaNaTela(A, B)) regra(...hojeAntes(a, b), Infinity);
      }
    }
  // o corpo e a peça que se cruzam na tela sem ponto em comum na grade (só o traço, ou a mão na peça que segura): a
  // ordem de hoje, mas sem peso (um ciclo a larga primeiro)
  const comPar = new Set(pares.map((p) => `${p.corpo}|${p.peca}`));
  nos.forEach((A, a) => {
    if (A.tipo !== 'corpo') return;
    nos.forEach((B, b) => {
      if (B.tipo === 'peca' && !comPar.has(`${a}|${b}`) && cruzaNaTela(A, B)) regra(...hojeAntes(a, b), 0);
    });
  });
  for (const p of pares) {
    const decide = (x: number) => x >= o.areaMinima;
    if (decide(p.aC) && (!decide(p.aP) || p.aC >= p.aP)) {
      regra(p.peca, p.corpo, p.aC);
      ULTIMA.pares++;
    } else if (decide(p.aP)) {
      regra(p.corpo, p.peca, p.aP);
      ULTIMA.pares++;
    } else regra(...hojeAntes(p.corpo, p.peca), 0);
  }
  // ordenação topológica: entre os que podem sair, o que vem primeiro hoje; num ciclo, larga as regras de menor peso.
  // `falta[k]`: quantas regras que chegam em k ainda esperam um nó que não saiu
  const entra = new Map<number, Map<number, number>>();
  const falta = new Int32Array(N);
  for (const [a, m] of arestas)
    for (const [b, w] of m) {
      let x = entra.get(b);
      if (!x) entra.set(b, (x = new Map()));
      x.set(a, w);
      falta[b]!++;
    }
  const feito = new Array<boolean>(N).fill(false);
  const ordem: number[] = [];
  while (ordem.length < N) {
    let escolha = -1;
    for (let k = 0; k < N; k++) if (!feito[k] && !falta[k] && (escolha < 0 || nos[k]!.ordem < nos[escolha]!.ordem)) escolha = k;
    if (escolha < 0) {
      // ciclo: entre os que não esperam nenhuma regra fixa, o que larga menos peso
      let melhor = Infinity;
      for (let k = 0; k < N; k++) {
        if (feito[k]) continue;
        let peso = 0,
          fixa = false;
        for (const [a, w] of entra.get(k) ?? []) {
          if (feito[a]) continue;
          if (w === Infinity) fixa = true;
          peso += w;
        }
        if (fixa) continue;
        if (peso < melhor || (peso === melhor && nos[k]!.ordem < nos[escolha]!.ordem)) {
          melhor = peso;
          escolha = k;
        }
      }
      ULTIMA.ciclos++;
    }
    feito[escolha] = true;
    ordem.push(escolha);
    for (const b of arestas.get(escolha)?.keys() ?? []) falta[b]!--;
  }
  const pos = new Array<number>(N);
  ordem.forEach((k, i) => (pos[k] = i));
  // os remendos: depois do item de cima de cada par, o de baixo pintado de novo onde ele devia ficar por cima
  const depois = new Map<number, Item[]>();
  if (o.remendos) {
    const cascoDoTrecho = new Map<string, P2[]>();
    const cascoT = (t: number, folga = FOLGA_DO_RECORTE): P2[] => {
      let c = cascoDoTrecho.get(`${t}|${folga}`);
      if (c) return c;
      const { vol, r } = trechos[t]!;
      const an = [vol.aneis[r]!, vol.aneis[Math.min(vol.aneis.length - 1, r + 1)]!];
      c = casco(an.flatMap((a) => anelNaTela(cam, a, folga, 12).map((q): P2 => [q[0], q[1]])));
      cascoDoTrecho.set(`${t}|${folga}`, c);
      return c;
    };
    const caixa = (P: P2[][]) => P.flat().reduce<[number, number, number, number]>((a, p) => [Math.min(a[0], p[0]), Math.min(a[1], p[1]), Math.max(a[2], p[0]), Math.max(a[3], p[1])], [1e9, 1e9, -1e9, -1e9]);
    const parDe = new Map<string, Par>();
    for (const p of pares) parDe.set(`${p.corpo}|${p.peca}`, p);
    const a1 = o.passo * o.passo;
    for (const p of pares) {
      const corpoPorCima = pos[p.corpo]! > pos[p.peca]!;
      // os trechos em que o de baixo está na frente
      const lista = corpoPorCima ? p.atras : p.frente,
        outra = corpoPorCima ? p.frente : p.atras;
      const ts = [...lista].filter(([t, n]) => n > (outra.get(t) ?? 0) && n * a1 >= o.areaMinima / 4).map(([t]) => t);
      const area = ts.reduce((s, t) => s + lista.get(t)! * a1, 0);
      if (area < o.areaMinima) continue;
      const de = corpoPorCima ? p.peca : p.corpo,
        cima = corpoPorCima ? p.corpo : p.peca;
      // cada trecho com a folga de FOLGA_DO_RECORTE (etapa 2: o protótipo fazia `.map(cascoT)`, e o map passava a
      // posição na lista como folga, 0, 1, 2… cm)
      const dentro = ts.sort((a, b) => a - b).map((t) => cascoT(t));
      const cx = caixa(dentro);
      // os trechos do mesmo corpo em que vale a ordem de antes saem do recorte (de cima, a cabeça cobre os pés: o
      // halter, por cima dos pés, não pode ir por cima da cabeça)
      const fora: P2[][] = [...outra].filter(([t, n]) => n > (lista.get(t) ?? 0) && n * a1 >= o.areaMinima / 4).map(([t]) => cascoT(t, 0));
      // o que é pintado entre os dois e cai no recorte fica por cima do remendo (salvo se o remendado está na frente dele)
      for (let q = pos[de]! + 1; q < pos[cima]!; q++) {
        const z = ordem[q]!,
          Z = nos[z]!;
        if (Z.tipo === 'corpo') {
          // um item do corpo entre os dois: contra a peça remendada, só os trechos dele que estão na frente dela (o
          // remendo pinta só a peça; onde ela não cruza o item, não há o que tirar); contra o corpo remendado (o
          // braço de perto, por cima do tronco), todos os trechos dele
          const pp = nos[de]!.tipo === 'peca' ? parDe.get(`${z}|${de}`) : undefined;
          if (nos[de]!.tipo === 'peca' && !pp) continue;
          trechos.forEach((tr, t) => {
            if (tr.no !== z) return;
            if (pp && !((pp.frente.get(t) ?? 0) > (pp.atras.get(t) ?? 0))) return;
            const c = cascoT(t),
              k = caixa([c]);
            if (k[0] < cx[2] && cx[0] < k[2] && k[1] < cx[3] && cx[1] < k[3]) fora.push(c);
          });
        } else if (Z.forma) {
          if (nos[de]!.tipo === 'corpo') {
            const pp = parDe.get(`${de}|${z}`);
            if (pp && pp.aC > pp.aP) continue;
          }
          const c = cascoDaForma(Z.forma, cam),
            k = caixa([c]);
          if (k[0] < cx[2] && cx[0] < k[2] && k[1] < cx[3] && cx[1] < k[3]) fora.push(c);
        }
      }
      const base = nos[de]!.it;
      const dd = caminho(dentro),
        df = caminho(fora);
      // o nome do recorte sai do conteúdo (como os de ./boneco.ts): o mesmo quadro dá sempre o mesmo SVG, e dois <svg> na
      // mesma página só repetem um nome quando o recorte e o que ele recorta são os mesmos
      const id = `pp${hash(dd + df + base.s)}`;
      const s = fora.length
        ? `<mask id="${id}" maskUnits="userSpaceOnUse" x="-400" y="-400" width="800" height="800"><path d="${dd}" fill="#fff"/><path d="${df}" fill="#000"/></mask><g mask="url(#${id})">${base.s}</g>`
        : `<clipPath id="${id}"><path d="${dd}"/></clipPath><g clip-path="url(#${id})">${base.s}</g>`;
      const it: Item = { d: 0, camada: 1, s };
      REMENDOS.set(it, { de: base, dentro, fora });
      const l = depois.get(cima) ?? [];
      l.push(it);
      depois.set(cima, l);
      ULTIMA.remendos++;
    }
  }
  const out: Item[] = [];
  for (const k of ordem) out.push(nos[k]!.it, ...(grudados.get(k) ?? []), ...(depois.get(k) ?? []));
  return out;
}

/** `pintar` (./desenho.ts), com a camada 1 (o corpo e o equipamento) na ordem por pares. */
export function pintarPorPares(itens: Item[], o: OpcoesDoPintor = PADRAO): string {
  const meio = ordenarPorPares(itens, o);
  const resto = itens.map((it, i) => ({ it, i })).filter((x) => x.it.camada !== 1);
  const antes = pintar(resto.filter((x) => x.it.camada < 1).map((x) => x.it)),
    depois = pintar(resto.filter((x) => x.it.camada > 1).map((x) => x.it));
  return antes + meio.map((it) => it.s).join('') + depois;
}

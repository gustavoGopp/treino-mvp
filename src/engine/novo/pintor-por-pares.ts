// Estudo do pintor (19/11/2026): um PROTÓTIPO, DESLIGADO. O app não importa este arquivo; só o estudo o usa
// (scripts/animacao-nova/estudo-do-pintor.mjs, que troca o pintor da cena por este na hora de empacotar) e a
// conferência da pintura, quando recebe o pintor de estudo. Relatório: docs/revisoes/animacao-nova/estudo-do-pintor.md.
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
// 2) Remendos (opcional). Quando um item do Boneco está na frente de uma peça num pedaço e atrás em outro (o corpo não é
//    convexo: a perna passa na frente da ponta do banco e o tronco fica atrás da outra), a ordem única serve a um dos
//    pedaços; no outro, o item que devia ficar por cima é pintado de novo, logo depois do outro, recortado
//    (clipPath, ou mask quando há o que tirar) à região dos trechos do corpo em que ele está na frente. O trecho é o
//    casco de dois anéis vizinhos de uma parte, folgado FOLGA_DO_RECORTE cm (para o traço do contorno entrar inteiro).
import { desenharBoneco, formaDoBoneco } from './boneco';
import type { OpcoesDoBoneco } from './boneco';
import type { Anel } from './corpo3d';
import { casco, contorno, pintar } from './desenho';
import type { Camera, Item, P2 } from './desenho';
import { equipamentoRealista } from './equipamento';
import type { Tema } from './equipamento';
import type { Esq, Lado } from './esqueleto';
import type { Peca } from './pecas';
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
/** A opção do estudo: desligada. Só o script do estudo a liga. */
export const PINTOR_POR_PARES = { ligado: false, opcoes: { ...PADRAO } };
/** Folga do recorte em volta de cada trecho do corpo (cm): o traço do contorno do Boneco cabe dentro dela. */
export const FOLGA_DO_RECORTE = 1.5;
/** A mão não decide nada contra a peça que segura (a que passa a até 4 cm da pegada; da mesma peça, até 12 cm). */
const RAIO_DA_PEGADA = 4,
  PERTO_DA_PEGADA = 12;

/* ============================== marcas: o que cada item é, em 3D ============================== */
interface VolMarcado {
  nome: string;
  lado?: Lado;
  aneis: Anel[];
}
type Marca = { k: 'corpo'; e: Esq; cam: Camera; vols: VolMarcado[] } | { k: 'peca'; peca: number };
const MARCAS = new WeakMap<Item, Marca>();
/** Um item de remendo: o item `de`, pintado de novo, só dentro de `dentro` e fora de `fora` (polígonos na tela). */
export interface Remendo {
  de: Item;
  dentro: P2[][];
  fora: P2[][];
}
const REMENDOS = new WeakMap<Item, Remendo>();
export const remendoDe = (it: Item): Remendo | undefined => REMENDOS.get(it);

/** Diz, para cada item do Boneco, que partes (volumes) ele pinta: pelo caminho do preenchimento de cada uma. */
export function marcarBoneco(itens: Item[], e: Esq, cam: Camera, roupa: boolean): Item[] {
  const forma = formaDoBoneco(e, { roupa, cabeloAtrasPrimeiro: dot(cam.para, e.cabeca.z) > 0.45 });
  const vols = new Map<Item, VolMarcado[]>();
  // o lado de longe (como em desenharBoneco): os caminhos dele levam a classe `lg`. De lado, num exercício simétrico,
  // o braço de perto e o de longe têm o mesmo caminho; a classe diz qual item é de qual
  const prof = (k: Lado) => dot(e.lado[k].ombro, cam.para) + dot(e.lado[k].quadril, cam.para);
  const longe: Lado | null = Math.abs(prof('R') - prof('L')) < 6 ? null : prof('R') < prof('L') ? 'R' : 'L';
  const pinta = (s: string, fill: string, deLonge: boolean) => {
    for (let i = s.indexOf(fill); i >= 0; i = s.indexOf(fill, i + 1)) if (s.slice(Math.max(0, i - 4), i) === 'lg" ' === deLonge) return true;
    return false;
  };
  for (const g of forma.grupos)
    for (const v of g.volumes) {
      const fill = `d="${contorno(cam, v.vol, null, true).fill}"`;
      for (const it of itens)
        if (pinta(it.s, fill, !!g.lado && g.lado === longe)) {
          let l = vols.get(it);
          if (!l) vols.set(it, (l = []));
          l.push({ nome: v.nome ?? g.id, lado: g.lado, aneis: v.vol.aneis });
        }
    }
  for (const [it, l] of vols) MARCAS.set(it, { k: 'corpo', e, cam, vols: l });
  return itens;
}
/** Diz de que peça é cada item (o índice dela no quadro). */
export function marcarPeca(it: Item, peca: number): Item {
  MARCAS.set(it, { k: 'peca', peca });
  return it;
}
/** `desenharBoneco`, com as marcas (para a cena do estudo). */
export function desenharBonecoMarcado(e: Esq, cam: Camera, o: OpcoesDoBoneco): Item[] {
  const itens = desenharBoneco(e, cam, o);
  return o.suf === '-f' ? itens : marcarBoneco(itens, e, cam, o.estilo === 'pele');
}
/** `equipamentoRealista`, com as marcas (para a cena do estudo). Conta os itens de cada peça desenhando-a sozinha. */
export function equipamentoMarcado(pecas: Peca[], cam: Camera, tema: Tema, id: string): { itens: Item[]; defs: string } {
  const r = equipamentoRealista(pecas, cam, tema, id);
  let i0 = 0;
  pecas.forEach((p, i) => {
    const n = equipamentoRealista([p], cam, tema, `${id}${i}-pp-`).itens.length;
    for (let k = i0; k < i0 + n && k < r.itens.length; k++) marcarPeca(r.itens[k]!, i);
    i0 += n;
  });
  return r;
}

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
function distanciaAForma(f: Forma, p: V3): number {
  if (f.t === 'solido') return Math.max(...f.planos.map((pl) => dot(pl.n, p) - pl.d));
  if (f.t === 'esfera') return dist(p, f.c) - f.r;
  const P = f.t === 'placa' ? [...f.pts, f.pts[0]!] : f.pts;
  let m = 1e9;
  for (let i = 0; i + 1 < P.length; i++) m = Math.min(m, distAoSegmento(p, P[i]!, P[i + 1]!));
  return m - (f.t === 'fio' ? f.r : 0);
}

/** A folga (cm; negativa = dentro) de um ponto até a pele de um trecho do corpo e dos dois vizinhos, pela seção oval. */
function folgaAoTrecho(p: V3, tr: Trecho): number {
  const A = tr.vol.aneis;
  let menor = Infinity;
  for (let i = Math.max(0, tr.r - 1); i <= Math.min(A.length - 2, tr.r + 1); i++) {
    const a = A[i]!,
      b = A[i + 1]!;
    const d = sub(b.c, a.c),
      l2 = dot(d, d);
    if (l2 < 1e-9) continue;
    const t = Math.max(0, Math.min(1, dot(sub(p, a.c), d) / l2));
    const mx = (u: number, v: number) => u + (v - u) * t;
    const r = sub(p, add(a.c, mul(d, t)));
    const u = dot(r, norm(add(mul(a.x, 1 - t), mul(b.x, t)))),
      v = dot(r, norm(add(mul(a.z, 1 - t), mul(b.z, t))));
    const ra = mx(a.a, b.a),
      rv = v >= 0 ? mx(a.f, b.f) : mx(a.b, b.b);
    if (ra < 1e-6 || rv < 1e-6) continue;
    const rho = Math.hypot(u / ra, v / rv);
    menor = Math.min(menor, rho < 1e-6 ? -Math.min(ra, rv) : Math.hypot(u, v) * (1 - 1 / rho));
  }
  if (A.length === 1) menor = dist(p, A[0]!.c) - Math.max(A[0]!.a, A[0]!.f, A[0]!.b);
  return menor;
}
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
}
/** Um item do corpo na grade: a pele mais perto de quem olha e de que trecho ela é. */
interface CorpoNaGrade {
  z: Float32Array;
  s: Int32Array;
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
  vol: VolMarcado;
  r: number;
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
function rasterTriangulo(G: Grade, a: T3, b: T3, c: T3, faz: (ix: number, z: number) => void) {
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
  for (let j = j0; j <= j1; j++) {
    const py = j + 0.5;
    for (let i = i0; i <= i1; i++) {
      const px = i + 0.5;
      const w0 = ((bx - px) * (cy - py) - (by - py) * (cx - px)) / area,
        w1 = ((cx - px) * (ay - py) - (cy - py) * (ax - px)) / area,
        w2 = 1 - w0 - w1;
      if (w0 < -1e-9 || w1 < -1e-9 || w2 < -1e-9) continue;
      faz(j * W + i, w0 * a[2] + w1 * b[2] + w2 * c[2]);
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
function corpoNaGrade(G: Grade, cam: Camera, vols: VolMarcado[], trechos: Trecho[], no: number): CorpoNaGrade {
  const n = G.W * G.H;
  const z = new Float32Array(n).fill(-Infinity),
    s = new Int32Array(n).fill(-1);
  for (const vol of vols) {
    const A = vol.aneis.map((an) => ({ anel: anelNaTela(cam, an), c: naTela3(cam, an.c) }));
    const base = trechos.length;
    for (let r = 0; r + 1 < A.length || (r === 0 && A.length === 1); r++) trechos.push({ no, vol, r });
    const faz = (t: number) => (ix: number, zz: number) => {
      if (zz > z[ix]!) {
        z[ix] = zz;
        s[ix] = t;
      }
    };
    for (let r = 0; r + 1 < A.length; r++) {
      const P = A[r]!.anel,
        Q = A[r + 1]!.anel;
      const c0 = A[r]!.c,
        c1 = A[r + 1]!.c;
      const cen: T3 = [(c0[0] + c1[0]) / 2, (c0[1] + c1[1]) / 2, (c0[2] + c1[2]) / 2];
      const f = faz(base + r);
      for (let k = 0; k < NA; k++) {
        const k2 = (k + 1) % NA;
        if (virado(P[k]!, P[k2]!, Q[k2]!, cen)) rasterTriangulo(G, P[k]!, P[k2]!, Q[k2]!, f);
        if (virado(P[k]!, Q[k2]!, Q[k]!, cen)) rasterTriangulo(G, P[k]!, Q[k2]!, Q[k]!, f);
      }
    }
    for (const r of [0, A.length - 1]) {
      const { anel, c } = A[r]!;
      const f = faz(base + Math.min(r, Math.max(0, A.length - 2)));
      for (let k = 0; k < NA; k++) rasterTriangulo(G, c, anel[k]!, anel[(k + 1) % NA]!, f);
    }
  }
  return { z, s };
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
  const z = new Float32Array(w * hh).fill(-Infinity);
  const marca = (i: number, j: number, zz: number) => {
    const k = (j - j0) * w + (i - i0);
    if (zz > z[k]!) z[k] = zz;
  };
  const sx = (i: number) => x0 + (i + 0.5) * h,
    sy = (j: number) => y0 + (j + 0.5) * h;
  if (f.t === 'solido') {
    const fr = f.planos.filter((p) => dot(p.n, cam.para) > 1e-9).map((p) => [dot(p.n, cam.dir), dot(p.n, cam.cima), dot(p.n, cam.para), p.d] as const);
    if (!fr.length) return null;
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
      for (let i = ia; i <= ib; i++) {
        const x = sx(i);
        let entra = Infinity;
        for (const [nd, nc, np, d] of fr) entra = Math.min(entra, (d - x * nd + y * nc) / np);
        marca(i, j, entra);
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
export const ULTIMA: Medida = { pares: 0, ciclos: 0, remendos: 0 };
/** Para o estudo: o último quadro ordenado, por dentro (os nós, os pares, as regras largadas e a ordem). */
export const DEPURA: { ligado: boolean; ultimo?: unknown } = { ligado: false };
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
export function ordenarPorPares(itens: Item[], o: OpcoesDoPintor = PINTOR_POR_PARES.opcoes): Item[] {
  ULTIMA.pares = ULTIMA.ciclos = ULTIMA.remendos = 0;
  // a ordem de hoje (a de `pintar`)
  const hoje = itens
    .map((it, i) => ({ it, i }))
    .filter((x) => x.it.camada === 1)
    .sort((a, b) => a.it.d - b.it.d || a.i - b.i)
    .map((x) => x.it);
  const corpos = hoje.filter((it) => MARCAS.get(it)?.k === 'corpo');
  const m0 = corpos.length ? (MARCAS.get(corpos[0]!) as Extract<Marca, { k: 'corpo' }>) : null;
  if (!m0) return hoje;
  const cam = m0.cam,
    e = m0.e;
  // os nós: o corpo (marcado) e as peças com forma; os outros itens (furos, detalhes sem forma) vão grudados na peça
  type No = { it: Item; ordem: number; tipo: 'corpo' | 'peca' | 'solto'; forma?: Forma; peca?: number; vols?: VolMarcado[]; cx?: [number, number, number, number] };
  const nos: No[] = [];
  const grudados = new Map<number, Item[]>();
  const ultimoDaPeca = new Map<number, number>();
  hoje.forEach((it, ordem) => {
    const mk = MARCAS.get(it);
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
    const corposNaGrade = new Map<number, CorpoNaGrade>();
    nos.forEach((x, k) => {
      if (x.tipo === 'corpo') corposNaGrade.set(k, corpoNaGrade(G, cam, x.vols!, trechos, k));
    });
    // a peça que cada mão segura (a mão não decide nada contra ela)
    const segura = new Map<string, boolean>();
    const perto = (k: number, lado: Lado, r: number) => distanciaAForma(nos[k]!.forma!, e.lado[lado].pegada) <= r;
    const daMao = (k: number, lado: Lado) => {
      const ch = `${k}${lado}`;
      let r = segura.get(ch);
      if (r === undefined) segura.set(ch, (r = perto(k, lado, RAIO_DA_PEGADA) || (perto(k, lado, PERTO_DA_PEGADA) && nos.some((y, j) => y.tipo === 'peca' && y.peca === nos[k]!.peca && perto(j, lado, RAIO_DA_PEGADA)))));
      return r;
    };
    const a1 = h * h;
    // a caixa 3D de cada trecho, para achar depressa os trechos perto de um ponto (o contato)
    const caixas = trechos.map((tr) => {
      const A = tr.vol.aneis;
      const lo: V3 = [1e9, 1e9, 1e9],
        hi: V3 = [-1e9, -1e9, -1e9];
      for (const an of [A[tr.r]!, A[Math.min(A.length - 1, tr.r + 1)]!]) {
        const r = Math.max(an.a, an.f, an.b) + o.tolerancia;
        for (let k = 0; k < 3; k++) {
          lo[k] = Math.min(lo[k]!, an.c[k]! - r);
          hi[k] = Math.max(hi[k]!, an.c[k]! + r);
        }
      }
      return [lo, hi] as const;
    });
    const encostaNoCorpo = (p: V3) =>
      trechos.some((tr, t) => {
        const [lo, hi] = caixas[t]!;
        return p[0] >= lo[0] && p[1] >= lo[1] && p[2] >= lo[2] && p[0] <= hi[0] && p[1] <= hi[1] && p[2] <= hi[2] && folgaAoTrecho(p, tr) <= o.tolerancia;
      });
    nos.forEach((x, kp) => {
      if (x.tipo !== 'peca') return;
      const P = pecaNaGrade(G, cam, x.forma!);
      if (!P) return;
      for (const [kc, C] of corposNaGrade) {
        const par: Par = { corpo: kc, peca: kp, aC: 0, aP: 0, frente: new Map(), atras: new Map(), cruzam: false };
        for (let j = 0; j < P.hh; j++)
          for (let i = 0; i < P.w; i++) {
            const zp = P.z[j * P.w + i]!;
            if (zp === -Infinity) continue;
            const ix = (j + P.j0) * G.W + (i + P.i0);
            const zc = C.z[ix]!;
            if (zc === -Infinity) continue;
            const t = C.s[ix]!;
            const tr = trechos[t]!;
            par.cruzam = true;
            if ((tr.vol.nome === 'mao' || tr.vol.nome === 'polegar') && tr.vol.lado && daMao(kp, tr.vol.lado)) continue;
            const dif = zc - zp;
            // o contato (opção `contato`): o ponto que fica escondido está encostado no outro, ou dentro dele (a pele que
            // afunda no assento, a coxa deitada no banco): não decide nada, como na conferência
            const noRaio = (z: number): V3 => add(add(mul(cam.dir, G.x0 + (i + P.i0 + 0.5) * G.h), mul(cam.cima, -(G.y0 + (j + P.j0 + 0.5) * G.h))), mul(cam.para, z));
            if (o.contato && dif > o.tolerancia && encostaNoCorpo(noRaio(zp))) continue;
            if (o.contato && dif < -o.tolerancia && distanciaAForma(x.forma!, noRaio(zc)) <= o.tolerancia) continue;
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
  // ordenação topológica: entre os que podem sair, o que vem primeiro hoje; num ciclo, larga as regras de menor peso
  const entra = new Map<number, Map<number, number>>();
  for (const [a, m] of arestas)
    for (const [b, w] of m) {
      let x = entra.get(b);
      if (!x) entra.set(b, (x = new Map()));
      x.set(a, w);
    }
  const feito = new Array<boolean>(N).fill(false);
  const largadas: [number, number, number][] = [];
  const ordem: number[] = [];
  while (ordem.length < N) {
    let escolha = -1;
    for (let k = 0; k < N; k++) {
      if (feito[k]) continue;
      const pend = [...(entra.get(k) ?? new Map<number, number>()).keys()].some((a) => !feito[a]);
      if (!pend && (escolha < 0 || nos[k]!.ordem < nos[escolha]!.ordem)) escolha = k;
    }
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
      for (const [a, w] of entra.get(escolha) ?? []) if (!feito[a]) largadas.push([a, escolha, w]);
      ULTIMA.ciclos++;
    }
    feito[escolha] = true;
    ordem.push(escolha);
  }
  if (DEPURA.ligado)
    DEPURA.ultimo = {
      nos: nos.map((x, k) => ({ k, tipo: x.tipo, ordem: x.ordem, pos: ordem.indexOf(k), d: x.it.d, peca: x.peca, vols: x.vols?.map((v) => v.nome + (v.lado ?? '')).join(','), s: x.it.s.slice(0, 90) })),
      pares: pares.map((p) => ({ corpo: p.corpo, peca: p.peca, aC: p.aC, aP: p.aP })),
      largadas,
    };
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
      const dentro = ts.sort((a, b) => a - b).map(cascoT);
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
      if (DEPURA.ligado) ((DEPURA.ultimo as { remendos?: unknown[] }).remendos ??= []).push({ de, cima, area, trechos: ts.map((t) => `${trechos[t]!.vol.nome}${trechos[t]!.vol.lado ?? ''}#${trechos[t]!.r}`).join(','), fora: fora.length });
    }
  }
  const out: Item[] = [];
  for (const k of ordem) {
    out.push(nos[k]!.it, ...(grudados.get(k) ?? []), ...(depois.get(k) ?? []));
  }
  return out;
}

/** `pintar`, com a camada 1 na ordem por pares (o que o estudo põe no lugar do pintor da cena). */
export function pintarPorPares(itens: Item[]): string {
  if (!PINTOR_POR_PARES.ligado) return pintar(itens);
  const meio = ordenarPorPares(itens);
  const resto = itens.map((it, i) => ({ it, i })).filter((x) => x.it.camada !== 1);
  const antes = pintar(resto.filter((x) => x.it.camada < 1).map((x) => x.it)),
    depoisS = pintar(resto.filter((x) => x.it.camada > 1).map((x) => x.it));
  return antes + meio.map((it) => it.s).join('') + depoisS;
}

// Motor novo: o desenhista. Recebe volumes 3D (anéis), caixas, esferas e fios, e devolve SVG numa vista qualquer.
// O contorno de cada volume é calculado (não amostrado): em cada anel, os dois pontos de silhueta saem da função de
// suporte da seção oval. Estilo "prancha" = cor chapada e contorno; estilo "volume" = o mesmo, mais a sombra própria
// (a faixa entre a silhueta do lado escuro e a linha onde a luz deixa de bater), também calculada.
import type { Anel, Corpo3d, IdParte, Junta, Parte, Volume } from './corpo3d';
import type { Lado } from './esqueleto';
import { add, comb, cross, dot, mul, norm, sub } from './vec';
import type { Ref, V3 } from './vec';

export type P2 = [number, number];
export interface Camera {
  nome: string;
  /** Direita da tela, cima da tela e "para quem olha", no mundo (unitários). */
  dir: V3;
  cima: V3;
  para: V3;
}
/** Câmera ortográfica: az = 0 de frente, 90 do lado direito do corpo, 180 de trás; el = altura acima do horizonte (90 = de cima). */
export function camera(nome: string, az: number, el = 0): Camera {
  const a = (az * Math.PI) / 180,
    e = (el * Math.PI) / 180;
  const para: V3 = [-Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e)];
  const dir: V3 = [Math.cos(a), 0, Math.sin(a)];
  return { nome, dir, cima: cross(para, dir), para };
}
export const VISTAS = {
  lateral: camera('De lado', 90),
  frontal: camera('De frente', 0),
  posterior: camera('De trás', 180),
  cima: camera('De cima', 0, 90),
  quina: camera('Três quartos', 55, 14),
  quinaTras: camera('Três quartos, de trás', 145, 14),
};
export type IdVista = keyof typeof VISTAS;
export type Estilo = 'prancha' | 'volume';

const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
const pj = (cam: Camera, p: V3): [number, number, number] => [dot(p, cam.dir), -dot(p, cam.cima), dot(p, cam.para)];
const pd = (cam: Camera, d: V3): P2 => [dot(d, cam.dir), -dot(d, cam.cima)];

/** Um item pronto para pintar: profundidade (maior = mais perto), camada e o SVG. */
export interface Item {
  d: number;
  camada: number;
  s: string;
  /** Caixa na tela [x0, y0, x1, y1], para o enquadramento. */
  cx?: [number, number, number, number];
}

/* ============================== contorno de um volume ============================== */
interface Contorno {
  /** Caminho fechado (para o preenchimento) e caminho do traço (aberto nas juntas). */
  fill: string;
  traco: string;
  sombra: string;
  d: number;
  cx: [number, number, number, number];
}
/** Ponto do contorno do anel (na tela) mais distante na direção `dir` da tela. */
function suporte(c2: P2, X2: P2, Z2: P2, an: Anel, dx: number, dy: number): P2 {
  const ex = dx * X2[0] + dy * X2[1],
    ez = dx * Z2[0] + dy * Z2[1];
  const b = ez >= 0 ? an.f : an.b;
  const den = Math.hypot(an.a * ex, b * ez) || 1;
  const u = (an.a * an.a * ex) / den,
    w = (b * b * ez) / den;
  return [c2[0] + u * X2[0] + w * Z2[0], c2[1] + u * X2[1] + w * Z2[1]];
}
/** Curva suave (Catmull-Rom → Bézier) que continua do ponto atual pelos pontos dados. */
function suave(P: P2[]): string {
  let s = '';
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(0, i - 1)]!,
      p1 = P[i]!,
      p2 = P[i + 1]!,
      p3 = P[Math.min(P.length - 1, i + 2)]!;
    s += `C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return s;
}
const M = (p: P2) => `M${f1(p[0])} ${f1(p[1])}`;
const Ls = (P: P2[]) => P.map((p) => `L${f1(p[0])} ${f1(p[1])}`).join('');

export function contorno(cam: Camera, vol: Volume, luz: V3 | null): Contorno {
  const A = vol.aneis,
    n = A.length;
  const c2: P2[] = [],
    X2: P2[] = [],
    Z2: P2[] = [];
  let d = 0;
  const cx: [number, number, number, number] = [1e9, 1e9, -1e9, -1e9];
  for (const an of A) {
    const q = pj(cam, an.c);
    c2.push([q[0], q[1]]);
    d += q[2] / n;
    X2.push(pd(cam, an.x));
    Z2.push(pd(cam, an.z));
  }
  // direção do eixo na tela, anel a anel; onde o eixo aponta para quem olha (escorço), vale a tangente válida mais próxima
  const tg: (P2 | null)[] = [];
  let compTela = 0;
  for (let i = 0; i < n; i++) {
    const a = c2[Math.max(0, i - 1)]!,
      b = c2[Math.min(n - 1, i + 1)]!;
    const dx = b[0] - a[0],
      dy = b[1] - a[1],
      l = Math.hypot(dx, dy);
    if (i > 0) compTela += Math.hypot(c2[i]![0] - c2[i - 1]![0], c2[i]![1] - c2[i - 1]![1]);
    tg.push(l > 0.05 ? [dx / l, dy / l] : null);
  }
  for (let i = 1; i < n; i++) tg[i] = tg[i] ?? tg[i - 1]!;
  for (let i = n - 2; i >= 0; i--) tg[i] = tg[i] ?? tg[i + 1]!;
  for (let i = 0; i < n; i++) tg[i] = tg[i] ?? [1, 0];
  const E: P2[] = [],
    D: P2[] = [];
  for (let i = 0; i < n; i++) {
    const t = tg[i]!;
    E.push(suporte(c2[i]!, X2[i]!, Z2[i]!, A[i]!, -t[1], t[0]));
    D.push(suporte(c2[i]!, X2[i]!, Z2[i]!, A[i]!, t[1], -t[0]));
  }
  const tampa = (i: number, sentido: number): P2[] => {
    // meia-volta em torno da ponta: do lado E ao lado D (sentido +1, ponta final) ou de D a E (sentido −1, ponta inicial)
    const t = tg[i]!,
      out: P2[] = [];
    for (let k = 1; k < 6; k++) {
      const th = (Math.PI * k) / 6;
      const nx = -t[1] * Math.cos(th) * sentido + t[0] * Math.sin(th) * sentido,
        ny = t[0] * Math.cos(th) * sentido + t[1] * Math.sin(th) * sentido;
      out.push(suporte(c2[i]!, X2[i]!, Z2[i]!, A[i]!, nx, ny));
    }
    return out;
  };
  const anelInteiro = (i: number): P2[] => {
    const out: P2[] = [];
    for (let k = 0; k < 14; k++) {
      const th = (2 * Math.PI * k) / 14;
      out.push(suporte(c2[i]!, X2[i]!, Z2[i]!, A[i]!, Math.cos(th), Math.sin(th)));
    }
    return out;
  };
  const Dr = [...D].reverse();
  const fim = tampa(n - 1, 1),
    ini = tampa(0, -1);
  let fill = M(E[0]!) + suave(E) + Ls(fim) + `L${f1(Dr[0]![0])} ${f1(Dr[0]![1])}` + suave(Dr) + Ls(ini) + 'Z';
  let traco = M(E[0]!) + suave(E);
  if (vol.junta1) traco += M(Dr[0]!) + suave(Dr);
  else traco += Ls(fim) + `L${f1(Dr[0]![0])} ${f1(Dr[0]![1])}` + suave(Dr);
  if (!vol.junta0) traco += Ls(ini) + (vol.junta1 ? `L${f1(E[0]![0])} ${f1(E[0]![1])}` : 'Z');
  // escorço: onde dois anéis vizinhos quase se sobrepõem na tela, a silhueta é o próprio anel
  const raioMax = Math.max(...A.map((an) => Math.max(an.a, an.f, an.b)));
  const todoEmEscorco = compTela < raioMax * 0.8;
  const iMaior = A.findIndex((an) => Math.max(an.a, an.f, an.b) === raioMax);
  for (let i = 0; i < n; i++) {
    const viz = c2[i === n - 1 ? i - 1 : i + 1]!;
    const raio = Math.max(A[i]!.a, A[i]!.f, A[i]!.b);
    const passo = Math.hypot(viz[0] - c2[i]![0], viz[1] - c2[i]![1]);
    const esperado = Math.hypot(...(sub(A[i === n - 1 ? i - 1 : i + 1]!.c, A[i]!.c) as [number, number, number]));
    if (passo < 0.55 * Math.min(raio, esperado) || todoEmEscorco) {
      const q = anelInteiro(i);
      const p = M(q[0]!) + Ls(q.slice(1)) + 'Z';
      fill += p;
      const ponta = i === 0 || i === n - 1;
      // de frente para o eixo, só o maior anel é silhueta; os outros ficam por dentro dele
      if (todoEmEscorco ? i === iMaior : !ponta || (i === 0 ? !vol.junta0 : !vol.junta1)) traco += p;
    }
  }
  for (const p of [...E, ...D, ...fim, ...ini]) {
    cx[0] = Math.min(cx[0], p[0]);
    cx[1] = Math.min(cx[1], p[1]);
    cx[2] = Math.max(cx[2], p[0]);
    cx[3] = Math.max(cx[3], p[1]);
  }
  // sombra própria: do lado escuro da silhueta até a linha em que a luz fica rasante (onde a normal é perpendicular à luz)
  let sombra = '';
  if (luz && compTela > 1) {
    const esc: P2[] = [],
      term: P2[] = [];
    // lado escuro: decidido uma vez pelo eixo do volume (do primeiro ao último anel); se o eixo aponta para a luz, anel a anel
    const ex = c2[n - 1]![0] - c2[0]![0],
      ey = c2[n - 1]![1] - c2[0]![1],
      el = Math.hypot(ex, ey) || 1;
    const l2 = pd(cam, luz);
    const lado = (-ey / el) * l2[0] + (ex / el) * l2[1];
    for (let i = 0; i < n; i++) {
      const an = A[i]!;
      // normal perpendicular à luz, no plano do anel, virada para quem olha
      let nx = -dot(luz, an.z),
        nz = dot(luz, an.x);
      if (dot(comb([nx, an.x], [nz, an.z]), cam.para) < 0) {
        nx = -nx;
        nz = -nz;
      }
      const rb = nz >= 0 ? an.f : an.b;
      const den = Math.hypot(an.a * nx, rb * nz) || 1;
      const u = (an.a * an.a * nx) / den,
        w = (rb * rb * nz) / den;
      term.push([c2[i]![0] + u * X2[i]![0] + w * Z2[i]![0], c2[i]![1] + u * X2[i]![1] + w * Z2[i]![1]]);
      const t = tg[i]!;
      const li = Math.abs(lado) > 0.25 ? lado : -t[1] * l2[0] + t[0] * l2[1];
      esc.push(li < 0 ? E[i]! : D[i]!);
    }
    const tr = [...term].reverse();
    sombra = M(esc[0]!) + suave(esc) + `L${f1(tr[0]![0])} ${f1(tr[0]![1])}` + suave(tr) + 'Z';
  }
  return { fill, traco, sombra, d, cx };
}

/* ============================== corpo ============================== */
export interface OpcoesCorpo {
  estilo: Estilo;
  /** Sufixo das classes (ex.: '-e' na figura do erro, '-f' no fantasma). */
  suf?: string;
  /** Luz (para onde ela está, no mundo); só no estilo volume. */
  luz?: V3;
  /** Ajuste de profundidade de uma parte (ex.: a mão por cima do halter). */
  vies?: Partial<Record<IdParte, number>>;
}
/** Luz padrão: de cima, um pouco à frente e à esquerda de quem olha. */
export const luzDaCamera = (cam: Camera): V3 => norm(comb([-0.45, cam.dir], [0.75, cam.cima], [0.5, cam.para]));

export interface CorpoDesenhado {
  itens: Item[];
  /** Profundidade e recorte de cada parte, para os músculos ficarem por cima da parte certa. */
  partes: Partial<Record<IdParte, { d: number; fill: string; longe: boolean }>>;
}
export function desenharCorpo(cam: Camera, c3: Corpo3d, o: OpcoesCorpo): CorpoDesenhado {
  const suf = o.suf ?? '';
  const luz = o.estilo === 'volume' ? (o.luz ?? luzDaCamera(cam)) : null;
  const itens: Item[] = [];
  const partes: CorpoDesenhado['partes'] = {};
  // membro "de longe": o lado cujo ombro (ou quadril) está mais longe de quem olha
  const dJ = (id: string) => pj(cam, c3.juntas.find((j) => j.id === id)!.c)[2];
  const longe = (p: Parte) => {
    if (!p.lado) return false;
    const outro: Lado = p.lado === 'R' ? 'L' : 'R';
    const base = p.id.startsWith('braco') || p.id.startsWith('antebraco') || p.id.startsWith('mao') ? 'ombro' : 'quadril';
    return dJ(base + p.lado) < dJ(base + outro) - 2;
  };
  for (const p of c3.partes) {
    const cs = p.volumes.map((v) => contorno(cam, v, luz));
    const d = cs.reduce((s, c) => s + c.d, 0) / cs.length + (o.vies?.[p.id] ?? 0);
    const lg = longe(p) ? 'l' : '';
    const fill = cs.map((c) => c.fill).join('');
    const cx = cs.reduce<[number, number, number, number]>((a, c) => [Math.min(a[0], c.cx[0]), Math.min(a[1], c.cx[1]), Math.max(a[2], c.cx[2]), Math.max(a[3], c.cx[3])], [1e9, 1e9, -1e9, -1e9]);
    let s = p.marca ? `<path class="n-m${suf}" d="${fill}"/>` : `<path class="n-c${lg}${suf}" d="${cs.map((c) => c.traco).join('')}"/><path class="n-p${lg}${suf}" d="${fill}"/>`;
    if (luz && !p.marca) s += `<path class="n-s${lg}${suf}" d="${cs.map((c) => c.sombra).join('')}"/>`;
    itens.push({ d, camada: 1, s, cx });
    partes[p.id] = { d, fill, longe: !!lg };
  }
  for (const j of c3.juntas) desenharJunta(cam, j, partes, itens, suf, luz);
  return { itens, partes };
}
function desenharJunta(cam: Camera, j: Junta, partes: CorpoDesenhado['partes'], itens: Item[], suf: string, luz: V3 | null) {
  const a = partes[j.a],
    b = partes[j.b];
  if (!a || !b) return;
  const q = pj(cam, j.c);
  const lg = a.longe || b.longe ? 'l' : '';
  const circ = `cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(j.r)}"`;
  // A esfera funde os dois segmentos: o traço do círculo entra antes dos dois (eles cobrem o que fica por dentro) e o
  // miolo entra depois dos dois. Exceção: o ombro e o quadril do lado de longe ficam atrás do tronco, e o tronco cobre.
  const atras = j.a === 'tronco' && b.longe;
  itens.push({ d: (atras ? b.d : Math.min(a.d, b.d)) - 0.01, camada: 1, s: `<circle class="n-c${lg}${suf}" ${circ}/>` });
  let s = `<circle class="n-p${lg}${suf}" ${circ}/>`;
  if (luz) {
    // sombra da esfera: a lua entre a borda do lado escuro e a linha em que a luz fica rasante
    const l2 = pd(cam, luz),
      lz = Math.max(0, dot(luz, cam.para)),
      ll = Math.hypot(l2[0], l2[1]);
    if (ll > 0.05) {
      const ux = l2[0] / ll,
        uy = l2[1] / ll,
        e1: P2 = [-uy, ux];
      const P: P2[] = [];
      for (let k = 0; k <= 10; k++) {
        const t = (Math.PI * k) / 10;
        P.push([q[0] + j.r * (e1[0] * Math.cos(t) - ux * Math.sin(t)), q[1] + j.r * (e1[1] * Math.cos(t) - uy * Math.sin(t))]);
      }
      for (let k = 10; k >= 0; k--) {
        const t = (Math.PI * k) / 10;
        P.push([q[0] + j.r * (e1[0] * Math.cos(t) - lz * ux * Math.sin(t)), q[1] + j.r * (e1[1] * Math.cos(t) - lz * uy * Math.sin(t))]);
      }
      s += `<path class="n-s${lg}${suf}" d="${M(P[0]!)}${Ls(P.slice(1))}Z"/>`;
    }
  }
  itens.push({ d: (atras ? b.d : Math.max(a.d, b.d)) + 0.01, camada: 1, s });
}

/* ============================== objetos ============================== */
export type Prim =
  | { t: 'volume'; vol: Volume; cls: string; vies?: number }
  | { t: 'caixa'; ref: Ref; meias: V3; cls: string; vies?: number }
  | { t: 'esfera'; c: V3; r: number; cls: string; vies?: number }
  | { t: 'fio'; pts: V3[]; larg: number; cls: string; vies?: number }
  | { t: 'chao'; y: number; x0: number; x1: number; z0: number; z1: number; cls: string };

function casco(P: P2[]): P2[] {
  const p = [...P].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (p.length < 3) return p;
  const cr = (o: P2, a: P2, b: P2) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: P2[] = [],
    up: P2[] = [];
  for (const q of p) {
    while (lo.length >= 2 && cr(lo[lo.length - 2]!, lo[lo.length - 1]!, q) <= 0) lo.pop();
    lo.push(q);
  }
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i]!;
    while (up.length >= 2 && cr(up[up.length - 2]!, up[up.length - 1]!, q) <= 0) up.pop();
    up.push(q);
  }
  up.pop();
  lo.pop();
  return lo.concat(up);
}
const pontos = (P: P2[]) => P.map((p) => `${f1(p[0])},${f1(p[1])}`).join(' ');
const caixaDe = (P: P2[]): [number, number, number, number] => [Math.min(...P.map((p) => p[0])), Math.min(...P.map((p) => p[1])), Math.max(...P.map((p) => p[0])), Math.max(...P.map((p) => p[1]))];

export function desenharPrim(cam: Camera, p: Prim, estilo: Estilo): Item[] {
  const luz = estilo === 'volume' ? luzDaCamera(cam) : null;
  if (p.t === 'volume') {
    const c = contorno(cam, p.vol, luz);
    return [{ d: c.d + (p.vies ?? 0), camada: 1, cx: c.cx, s: `<path class="o-c ${p.cls}" d="${c.traco}"/><path class="o-p ${p.cls}" d="${c.fill}"/>` + (luz ? `<path class="o-s" d="${c.sombra}"/>` : '') }];
  }
  if (p.t === 'esfera') {
    const q = pj(cam, p.c);
    return [{ d: q[2] + (p.vies ?? 0), camada: 1, cx: [q[0] - p.r, q[1] - p.r, q[0] + p.r, q[1] + p.r], s: `<circle class="o-e ${p.cls}" cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(p.r)}"/>` }];
  }
  if (p.t === 'fio') {
    const Q = p.pts.map((v) => pj(cam, v));
    const P = Q.map((q): P2 => [q[0], q[1]]);
    return [{ d: Q.reduce((s, q) => s + q[2], 0) / Q.length + (p.vies ?? 0), camada: 1, cx: caixaDe(P), s: `<polyline class="o-f ${p.cls}" points="${pontos(P)}" stroke-width="${f1(p.larg)}"/>` }];
  }
  if (p.t === 'chao') {
    const P = ([[p.x0, p.y, p.z0], [p.x1, p.y, p.z0], [p.x1, p.y, p.z1], [p.x0, p.y, p.z1]] as V3[]).map((v) => pj(cam, v)).map((q): P2 => [q[0], q[1]]);
    return [{ d: -1e6, camada: 0, cx: caixaDe(P), s: `<polygon class="${p.cls}" points="${pontos(casco(P))}"/>` }];
  }
  // caixa: no estilo prancha, o casco; no estilo volume, as faces visíveis com três tons (topo, lado claro, lado escuro)
  const { ref: r, meias: h } = p;
  const canto = (sx: number, sy: number, sz: number): V3 => comb([1, r.o], [sx * h[0], r.x], [sy * h[1], r.y], [sz * h[2], r.z]);
  const todos: V3[] = [];
  for (const a of [-1, 1]) for (const b of [-1, 1]) for (const c of [-1, 1]) todos.push(canto(a, b, c));
  const Q = todos.map((v) => pj(cam, v));
  const d = Q.reduce((s, q) => s + q[2], 0) / 8 + (p.vies ?? 0);
  const H = casco(Q.map((q): P2 => [q[0], q[1]]));
  let s = `<polygon class="o-cx ${p.cls}" points="${pontos(H)}"/>`;
  if (luz) {
    const faces: [V3, V3, V3, number][] = [
      [r.x, r.y, r.z, 0],
      [r.y, r.z, r.x, 1],
      [r.z, r.x, r.y, 2],
    ];
    for (const [nrm, u, w, eixo] of faces) {
      const lado = dot(nrm, cam.para) >= 0 ? 1 : -1;
      if (Math.abs(dot(nrm, cam.para)) < 0.02) continue;
      const hn = h[eixo]!,
        hu = h[(eixo + 1) % 3]!,
        hw = h[(eixo + 2) % 3]!;
      const c0 = add(r.o, mul(nrm, lado * hn));
      const F = ([[-1, -1], [1, -1], [1, 1], [-1, 1]] as P2[]).map(([a, b]) => pj(cam, comb([1, c0], [a * hu, u], [b * hw, w]))).map((q): P2 => [q[0], q[1]]);
      const luzN = dot(mul(nrm, lado), luz);
      s += `<polygon class="o-fc${luzN > 0.55 ? '0' : luzN > 0.05 ? '1' : '2'} ${p.cls}" points="${pontos(F)}"/>`;
    }
  }
  return [{ d, camada: 1, cx: caixaDe(H), s }];
}

/** Junta os itens na ordem de pintura (camada, depois profundidade). */
export function pintar(itens: Item[]): string {
  return itens
    .map((it, i) => ({ it, i }))
    .sort((a, b) => a.it.camada - b.it.camada || a.it.d - b.it.d || a.i - b.i)
    .map((x) => x.it.s)
    .join('');
}
/** A caixa que contém todos os itens (na tela). */
export function caixaDosItens(itens: Item[]): [number, number, number, number] {
  const c: [number, number, number, number] = [1e9, 1e9, -1e9, -1e9];
  for (const it of itens)
    if (it.cx) {
      c[0] = Math.min(c[0], it.cx[0]);
      c[1] = Math.min(c[1], it.cx[1]);
      c[2] = Math.max(c[2], it.cx[2]);
      c[3] = Math.max(c[3], it.cx[3]);
    }
  return c;
}
/** Projeção de um ponto (para rótulos e trajetórias). */
export const naTela = (cam: Camera, p: V3): P2 => {
  const q = pj(cam, p);
  return [q[0], q[1]];
};
export const profundidade = (cam: Camera, p: V3) => pj(cam, p)[2];

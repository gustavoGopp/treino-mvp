// Ilustração realista dos equipamentos (redesign, lote 5, 2ª rodada, 08/11/2026): um renderizador 3D mínimo que
// escreve SVG à mão. O aparelho e a pessoa são descritos em centímetros, num espaço 3D (x para a direita, y para
// cima, z para o fundo), e projetados por uma câmera ortográfica girada (vista 3/4, de um pouco acima).
// Cada sólido convexo (caixa, tubo, cilindro, estofado) vira faces com o tom da luz; o pintor ordena tudo pela
// profundidade. Sem dependências: só Math e strings.

// ---------- vetores ----------
export const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], (a[2] ?? 0) + (b[2] ?? 0)],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], (a[2] ?? 0) - (b[2] ?? 0)],
  mul: (a, k) => [a[0] * k, a[1] * k, (a[2] ?? 0) * k],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + (a[2] ?? 0) * (b[2] ?? 0),
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  len: (a) => Math.hypot(a[0], a[1], a[2] ?? 0),
  norm: (a) => {
    const l = Math.hypot(a[0], a[1], a[2] ?? 0) || 1;
    return [a[0] / l, a[1] / l, (a[2] ?? 0) / l];
  },
  lerp: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, (a[2] ?? 0) + ((b[2] ?? 0) - (a[2] ?? 0)) * t],
  // soma ponderada: comb(p, [k1, v1], [k2, v2], ...)
  comb: (p, ...termos) => termos.reduce((acc, [k, v]) => [acc[0] + k * v[0], acc[1] + k * v[1], acc[2] + k * (v[2] ?? 0)], [...p, 0].slice(0, 3)),
};
const { add, sub, mul, dot, cross, norm } = V;
export const f1 = (n) => (Math.round(n * 10) / 10).toString();
const pts2 = (Q) => Q.map((q) => f1(q[0]) + ',' + f1(q[1])).join(' ');

// ---------- cores ----------
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const toHex = (a) => '#' + a.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
export const mix = (c1, c2, t) => {
  const a = hex(c1), b = hex(c2);
  return toHex(a.map((v, i) => v + (b[i] - v) * t));
};
// material = [escuro, base, claro, contorno]
export const MAT = {
  metal: ['#24282D', '#474D56', '#7B828C', '#15171A'], // estrutura em grafite
  metalClaro: ['#5A616B', '#8C939D', '#C2C7CE', '#2A2E33'], // chapas e carenagens
  cromo: ['#6F7680', '#AEB4BC', '#EEF1F4', '#3A3E44'],
  estofado: ['#211D66', '#3F3AA8', '#7E7ADB', '#16124A'], // cor de ação do app
  anilha: ['#191B1F', '#2F3339', '#5A6069', '#0E0F11'],
  placa: ['#3A3F46', '#646B75', '#9EA5AE', '#1E2125'],
  borracha: ['#121417', '#262A2F', '#474C53', '#08090A'],
  plataforma: ['#4E545C', '#7F868F', '#B9BFC6', '#26292D'],
  ferro: ['#1C1E22', '#34383E', '#646A73', '#0C0D0F'], // kettlebell
};

// ---------- câmera ----------
export function camera({ yaw = 30, pitch = 14, s = 0.45, ox = 80, oy = 108 }) {
  const ya = (yaw * Math.PI) / 180, pa = (pitch * Math.PI) / 180;
  const ct = Math.cos(ya), st = Math.sin(ya), cp = Math.cos(pa), sp = Math.sin(pa);
  const rot = ([x, y, z]) => {
    const X = x * ct + z * st, Zc = -x * st + z * ct;
    return [X, y * cp + Zc * sp, -y * sp + Zc * cp];
  };
  const P = (p) => {
    const [X, Y, Z] = rot(p);
    return [ox + s * X, oy - s * Y, Z];
  };
  return { P, rot, s };
}
// luz no espaço da câmera: de cima, da esquerda e um pouco da frente
const LUZ = norm([-0.5, 0.72, -0.48]);
export function tom(mat, nCam) {
  const t = Math.max(0, Math.min(1, 0.5 + 0.5 * dot(nCam, LUZ)));
  const [e, b, c] = mat;
  // t ≈ 0.2 → escuro, 0.6 → base, 0.95 → claro
  if (t < 0.6) return mix(e, b, Math.max(0, (t - 0.2) / 0.4));
  return mix(b, c, Math.min(1, (t - 0.6) / 0.35));
}

// ---------- casco convexo 2D ----------
export function hull(P) {
  const p = P.map((q) => [q[0], q[1]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (p.length < 3) return p;
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const q of p) {
    while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop();
    lo.push(q);
  }
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop();
    up.push(q);
  }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
// caminho suave (Catmull-Rom fechado) por pontos 2D
export function suave(Q, t = 0.5) {
  const n = Q.length;
  let d = `M${f1(Q[0][0])} ${f1(Q[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = Q[(i - 1 + n) % n], p1 = Q[i], p2 = Q[(i + 1) % n], p3 = Q[(i + 2) % n];
    const c1 = [p1[0] + ((p2[0] - p0[0]) * t) / 3, p1[1] + ((p2[1] - p0[1]) * t) / 3];
    const c2 = [p2[0] - ((p3[0] - p1[0]) * t) / 3, p2[1] - ((p3[1] - p1[1]) * t) / 3];
    d += `C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d + 'Z';
}

// ---------- perfis 2D ----------
export function retArred(w, h, r, n = 4) {
  // retângulo de cantos redondos centrado na origem (u, v)
  r = Math.min(r, w / 2, h / 2);
  const c = [
    [w / 2 - r, h / 2 - r, 0],
    [-w / 2 + r, h / 2 - r, 90],
    [-w / 2 + r, -h / 2 + r, 180],
    [w / 2 - r, -h / 2 + r, 270],
  ];
  const out = [];
  for (const [cx, cy, a0] of c)
    for (let i = 0; i <= n; i++) {
      const a = ((a0 + (90 * i) / n) * Math.PI) / 180;
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
  return out;
}
export const circulo = (r, n = 24) => Array.from({ length: n }, (_, i) => [r * Math.cos((2 * Math.PI * i) / n), r * Math.sin((2 * Math.PI * i) / n)]);

// ---------- cena ----------
export function cena(id, cam) {
  const itens = []; // {z, svg}
  const defs = [];
  let n = 0;
  const uid = (p) => `${id}-${p}${n++}`;
  const { rot } = cam;
  const bb = [Infinity, Infinity, -Infinity, -Infinity];
  const P = (p) => {
    const q = cam.P(p);
    if (q[0] < bb[0]) bb[0] = q[0];
    if (q[1] < bb[1]) bb[1] = q[1];
    if (q[0] > bb[2]) bb[2] = q[0];
    if (q[1] > bb[3]) bb[3] = q[1];
    return q;
  };
  const visivel = (nW) => rot(nW)[2] < -1e-6;

  // sólido convexo: lista de faces (cada uma lista de pontos 3D); normal para fora pelo centroide
  function solido(faces, mat, o = {}) {
    const todos = faces.flat();
    const cen = mul(todos.reduce((a, p) => add(a, p), [0, 0, 0]), 1 / todos.length);
    let svg = '';
    const vis = [];
    for (const [i, f] of faces.entries()) {
      // normal de Newell
      let nx = 0, ny = 0, nz = 0;
      for (let k = 0; k < f.length; k++) {
        const a = f[k], b = f[(k + 1) % f.length];
        nx += (a[1] - b[1]) * (a[2] + b[2]);
        ny += (a[2] - b[2]) * (a[0] + b[0]);
        nz += (a[0] - b[0]) * (a[1] + b[1]);
      }
      let nn = norm([nx, ny, nz]);
      const fc = mul(f.reduce((a, p) => add(a, p), [0, 0, 0]), 1 / f.length);
      if (dot(nn, sub(fc, cen)) < 0) nn = mul(nn, -1);
      if (!visivel(nn)) continue;
      const cor = tom(o.matFace?.(i) ?? mat, rot(nn));
      const Q = f.map(P);
      svg += `<polygon points="${pts2(Q)}" fill="${cor}" stroke="${cor}" stroke-width="0.3" stroke-linejoin="round"/>`;
      vis.push(i);
      if (o.decal?.[i]) svg += o.decal[i](P);
    }
    if (o.decalSempre) svg += o.decalSempre(P, vis);
    if (o.contorno !== false) {
      const H = hull(todos.map(P));
      svg += `<polygon points="${pts2(H)}" fill="none" stroke="${mat[3]}" stroke-width="${o.traco ?? 0.55}" stroke-linejoin="round"/>`;
    }
    const z = o.z ?? P(cen)[2];
    itens.push({ z: z + (o.dz ?? 0), svg: `<g>${svg}</g>` });
    return { cen, vis };
  }

  // prisma: perfil 2D (u, v) no plano (o, e1, e2), extrudado pelo vetor ext
  function prisma(perfil, o3, e1, e2, ext, mat, o = {}) {
    const frente = perfil.map(([u, v]) => add(add(o3, mul(e1, u)), mul(e2, v)));
    const tras = frente.map((p) => add(p, ext));
    const faces = [frente, [...tras].reverse()];
    for (let i = 0; i < frente.length; i++) {
      const j = (i + 1) % frente.length;
      faces.push([frente[i], frente[j], tras[j], tras[i]]);
    }
    return solido(faces, mat, o);
  }
  // eixos perpendiculares a uma direção
  function eixos(d, up = [0, 1, 0]) {
    let e1 = cross(d, up);
    if (V.len(e1) < 1e-6) e1 = cross(d, [1, 0, 0]);
    e1 = norm(e1);
    const e2 = norm(cross(e1, d));
    return [e1, e2];
  }
  // caixa alinhada aos eixos
  const caixa = (min, max, mat, o) =>
    prisma(
      [
        [min[0], min[1]],
        [max[0], min[1]],
        [max[0], max[1]],
        [min[0], max[1]],
      ],
      [0, 0, min[2]],
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, max[2] - min[2]],
      mat,
      o,
    );
  // tubo retangular de a até b (largura w, altura h na seção), "up" orienta a seção
  function tubo(a, b, w, h, mat, o = {}) {
    const d = norm(sub(b, a));
    const [e1, e2] = eixos(d, o.up);
    return prisma(retArred(w, h, o.r ?? 0.8, 2), a, e1, e2, sub(b, a), mat, o);
  }
  // cilindro de a até b, raio r
  function cilindro(a, b, r, mat, o = {}) {
    const d = norm(sub(b, a));
    const [e1, e2] = eixos(d, o.up);
    return prisma(circulo(r, o.lados ?? 22), a, e1, e2, sub(b, a), mat, o);
  }
  // estofado: perfil de cantos redondos (comprimento c ao longo de "ao", espessura e ao longo de "normal"),
  // largura l ao longo de "lado"; centro da face de baixo em base. Costura na tampa visível.
  function estofado(base, ao, normal, lado, c, e, l, mat = MAT.estofado, o = {}) {
    const a = norm(ao), nn = norm(normal), ld = norm(lado);
    const centro = add(add(base, mul(nn, e / 2)), mul(ld, -l / 2));
    const perfil = retArred(c, e, Math.min(e * 0.45, 4), 4);
    const costura = (P) => {
      const k = 0.8;
      const Q = retArred(c - 3.2, e - 2.6, Math.min(e * 0.35, 3), 3).map(([u, v]) => P(add(add(centro, mul(a, u * 1)), mul(nn, v))));
      return `<polygon points="${pts2(Q)}" fill="none" stroke="${mat[0]}" stroke-width="0.35" stroke-dasharray="1 0.8" opacity="${k}"/>`;
    };
    const costuraTras = (P) => {
      const tr = add(centro, mul(ld, l));
      const Q = retArred(c - 3.2, e - 2.6, Math.min(e * 0.35, 3), 3).map(([u, v]) => P(add(add(tr, mul(a, u)), mul(nn, v))));
      return `<polygon points="${pts2(Q)}" fill="none" stroke="${mat[0]}" stroke-width="0.35" stroke-dasharray="1 0.8" opacity="0.8"/>`;
    };
    return prisma(perfil, centro, a, nn, mul(ld, l), mat, { ...o, decal: { 0: costura, 1: costuraTras } });
  }
  // anilha (disco com furo e aba), eixo de a para b (espessura = |b - a|)
  function anilha(a, b, r, mat = MAT.anilha, o = {}) {
    const d = norm(sub(b, a));
    const [e1, e2] = eixos(d, o.up);
    const tampa = (c) => (P) => {
      const aro = circulo(r * 0.78, 28).map(([u, v]) => P(add(add(c, mul(e1, u)), mul(e2, v))));
      const cubo = circulo(r * 0.3, 20).map(([u, v]) => P(add(add(c, mul(e1, u)), mul(e2, v))));
      const furo = circulo(r * 0.13, 16).map(([u, v]) => P(add(add(c, mul(e1, u)), mul(e2, v))));
      return `<polygon points="${pts2(aro)}" fill="none" stroke="${mat[0]}" stroke-width="0.5"/><polygon points="${pts2(cubo)}" fill="${mat[2]}" stroke="${mat[0]}" stroke-width="0.4"/><polygon points="${pts2(furo)}" fill="#0B0C0E"/>`;
    };
    return prisma(circulo(r, 30), a, e1, e2, sub(b, a), mat, { ...o, decal: { 0: tampa(a), 1: tampa(b) } });
  }
  // pilha de placas numeradas. base = canto de baixo, na frente, à esquerda; larg = direção da largura,
  // tras = da frente para o fundo (a frente fica virada para -tras); w × h × prof em cm
  function pilha(base, larg, tras, w, h, prof, nPlacas, o = {}) {
    const up = [0, 1, 0];
    const hp = h / nPlacas;
    larg = norm(larg);
    tras = norm(tras);
    for (let i = nPlacas - 1; i >= 0; i--) {
      const y0 = i * hp;
      const num = (i + 1) * (o.passo ?? 5);
      const c = add(add(base, mul(larg, w / 2)), mul(up, y0 + hp / 2));
      const rotulo = (P) => {
        const q = P(add(c, mul(tras, -0.05)));
        const ex = sub(P(add(c, larg)), q), ey = sub(P(add(c, mul(up, -1))), q);
        const k3 = (v) => v.toFixed(3);
        return `<text transform="matrix(${k3(ex[0])} ${k3(ex[1])} ${k3(ey[0])} ${k3(ey[1])} ${f1(q[0])} ${f1(q[1])})" font-family="system-ui,sans-serif" font-size="${f1(hp * 0.6)}" font-weight="700" fill="#EEF0F3" text-anchor="middle" dominant-baseline="central">${num}</text>`;
      };
      const perfil = [
        [0, 0.35],
        [w, 0.35],
        [w, hp - 0.35],
        [0, hp - 0.35],
      ];
      prisma(perfil, add(base, mul(up, y0)), larg, up, mul(tras, prof), MAT.placa, { decal: { 0: rotulo }, traco: 0.3, dz: o.dz ?? 0 });
    }
    return hp;
  }
  // furos de regulagem: pequenos círculos escuros num plano (centro c, eixos e1 e e2)
  function furos(centros, e1, e2, r = 1, o = {}) {
    for (const c of centros) {
      const Q = circulo(r, 12).map(([u, v]) => P(add(add(c, mul(e1, u)), mul(e2, v))));
      itens.push({ z: P(c)[2] + (o.dz ?? -0.5), svg: `<polygon points="${pts2(Q)}" fill="#0F1113" stroke="#5B616A" stroke-width="0.2"/>` });
    }
  }
  // segmento simples (cabo de aço, linha de detalhe)
  function linha(a, b, cor = '#202327', w = 0.45, o = {}) {
    const A = P(a), B = P(b);
    itens.push({ z: o.z ?? (A[2] + B[2]) / 2 + (o.dz ?? 0), svg: `<path d="M${f1(A[0])} ${f1(A[1])}L${f1(B[0])} ${f1(B[1])}" stroke="${cor}" stroke-width="${w}" stroke-linecap="round" fill="none"/>` });
  }
  function polilinha(pts3, cor, w, o = {}) {
    const Q = pts3.map(P);
    const z = o.z ?? Q.reduce((s, q) => s + q[2], 0) / Q.length;
    itens.push({ z: z + (o.dz ?? 0), svg: `<path d="M${Q.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L')}" stroke="${cor}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` });
  }
  // sombra macia no chão (elipse em y = 0)
  function sombra(cx, cz, rx, rz, opac = 0.22) {
    const fid = uid('sb');
    defs.push(`<filter id="${fid}" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="1.8"/></filter>`);
    const Q = Array.from({ length: 36 }, (_, i) => {
      const a = (2 * Math.PI * i) / 36;
      return P([cx + rx * Math.cos(a), 0, cz + rz * Math.sin(a)]);
    });
    itens.push({ z: 1e9, svg: `<polygon points="${pts2(Q)}" fill="#1B1C1F" opacity="${opac}" filter="url(#${fid})"/>` });
  }
  function bruto(z, svg) {
    itens.push({ z, svg });
  }
  // enquadra: escala e centraliza tudo no viewBox (w × h) com margem; "chao" alinha a base embaixo
  // enquadra: escala e centraliza no viewBox (w × h) com margem. "foco" = pontos 3D que devem caber (o resto pode
  // sair do quadro); sem foco, cabe tudo. As espessuras de traço são divididas pela escala, para o traço final ter
  // a mesma espessura em todos os desenhos (no viewBox 160 × 120).
  function svg({ w = 160, h = 120, margem = 5, max = Infinity, foco = null } = {}) {
    let b = bb;
    if (foco) {
      b = [Infinity, Infinity, -Infinity, -Infinity];
      for (const p of foco) {
        const q = cam.P(p);
        b = [Math.min(b[0], q[0]), Math.min(b[1], q[1]), Math.max(b[2], q[0]), Math.max(b[3], q[1])];
      }
    }
    const bw = b[2] - b[0], bh = b[3] - b[1];
    const k = Math.min((w - 2 * margem) / bw, (h - 2 * margem) / bh, max);
    const tx = (w - bw * k) / 2 - b[0] * k, ty = (h - bh * k) / 2 - b[1] * k;
    const corpo = [...itens]
      .sort((a, b) => b.z - a.z)
      .map((i) => i.svg)
      .join('')
      .replace(/stroke-width="([\d.]+)"/g, (_, v) => `stroke-width="${(parseFloat(v) / k).toFixed(3)}"`);
    return (defs.length ? `<defs>${defs.join('')}</defs>` : '') + `<g transform="matrix(${k.toFixed(4)} 0 0 ${k.toFixed(4)} ${f1(tx)} ${f1(ty)})">${corpo}</g>`;
  }
  return { P, rot, s: cam.s, uid, defs, itens, solido, prisma, caixa, tubo, cilindro, estofado, anilha, pilha, furos, linha, polilinha, sombra, bruto, svg, eixos, visivel };
}

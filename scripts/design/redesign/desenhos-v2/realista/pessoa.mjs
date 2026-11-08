// A pessoa das ilustrações realistas (3ª rodada): adulto de ~175 cm, cerca de 7,5 cabeças.
// Proporções de desenho (aproximadas, escolhidas para o desenho, não medidas): cabeça ~23 cm, ombros ~2 cabeças
// de largura (com o deltoide), quadril mais estreito que os ombros, cotovelo na altura da cintura e punho na altura
// da virilha com o braço solto, coxa ≈ perna, pé ~1 cabeça.
// Inspirada no boneco do guia (src/engine/estilo/corpo.ts: tronco por anéis elípticos e membros cônicos), mas é
// código à parte: não importa nem muda o motor.
// O tronco é a união dos cascos de cada par de anéis vizinhos (assim aparecem a cintura e a curva da lombar); o
// contorno é desenhado por trás do recheio, para ficar só a borda de fora.
import { V, f1, hull, mix } from './base.mjs';

const { add, sub, mul, dot, cross, norm, len } = V;

export const MEDIDAS = { coxa: 45, canela: 44, braco: 29.5, antebraco: 25.5, ombroAltura: 47, ombroLargura: 17.5, quadrilLargura: 8.8 };
/** Do tornozelo (articulação) à sola do tênis, em cm: as cenas põem o tornozelo a essa distância do apoio. */
export const ALTURA_TORNOZELO = 8.6;

export const MAT_P = {
  pele: ['#9A6A51', '#C8977A', '#E8C2AA', '#6E4636'],
  camiseta: ['#A39C90', '#D8D3CA', '#F4F1EC', '#6F685E'],
  bermuda: ['#323A46', '#556070', '#808B9B', '#1E242C'],
  tenis: ['#A9AFB7', '#E1E4E8', '#FFFFFF', '#5F666F'],
  sola: ['#4A4F56', '#6E747C', '#959BA2', '#33373C'],
  cabelo: ['#17130F', '#2F2822', '#5A4E44', '#0C0A08'],
};
const LUZ2 = norm([-0.55, -0.83, 0]); // luz na tela (de cima, da esquerda)
const TRACO = 0.5;

// joelho/cotovelo: de a até b, comprimentos l1 e l2, dobrando para o lado de "dica"
export function junta(a, b, l1, l2, dica) {
  const d = sub(b, a);
  const D = Math.min(len(d), l1 + l2 - 0.05);
  const u = norm(d);
  const x = (l1 * l1 - l2 * l2 + D * D) / (2 * D);
  const h = Math.sqrt(Math.max(0, l1 * l1 - x * x));
  const p = norm(sub(dica, mul(u, dot(dica, u))));
  return add(add(a, mul(u, x)), mul(p, h));
}
const ortoN = (v, ref) => norm(sub(v, mul(ref, dot(v, ref))));

export function pessoa(C, spec) {
  const { P } = C;
  const escala = C.s;
  const u = norm(spec.cima ?? [0, 1, 0]);
  const f = ortoN(spec.frente ?? [1, 0, 0], u);
  const lado = norm(cross(u, f)); // lado direito da pessoa
  const T = (h, x, d) => add(add(add(spec.pelve, mul(u, h)), mul(lado, x)), mul(f, d));
  const M = MEDIDAS;
  const partes = [];
  const depth = (p) => P(p)[2];
  const vis = (n) => C.rot(n)[2] < -0.02;
  const zT = depth(T(26, 0, 0));
  const escurece = (mat, p) => (depth(p) > zT + 3 ? mat.map((c, i) => (i < 3 ? mix(c, mat[0], 0.28) : c)) : mat);
  const pts = (Q) => Q.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L');
  const caminho = (Q) => 'M' + pts(Q) + 'Z';

  // casco de esferas (centro 3D, raio cm) → polígono na tela
  const casco = (esferas) => {
    const out = [];
    for (const [c, r] of esferas) {
      const q = P(c);
      const R = r * escala;
      const n = R > 1.5 ? 22 : 12;
      for (let i = 0; i < n; i++) out.push([q[0] + R * Math.cos((i / n) * 2 * Math.PI), q[1] + R * Math.sin((i / n) * 2 * Math.PI)]);
    }
    return hull(out);
  };
  const gradiente = (Hs, mat) => {
    let mn = Infinity, mx = -Infinity, cx = 0, cy = 0, n = 0;
    for (const H of Hs)
      for (const q of H) {
        const t = q[0] * LUZ2[0] + q[1] * LUZ2[1];
        mn = Math.min(mn, t);
        mx = Math.max(mx, t);
        cx += q[0];
        cy += q[1];
        n++;
      }
    cx /= n;
    cy /= n;
    const c0 = cx * LUZ2[0] + cy * LUZ2[1];
    const a = [cx + LUZ2[0] * (mx - c0), cy + LUZ2[1] * (mx - c0)];
    const b = [cx + LUZ2[0] * (mn - c0), cy + LUZ2[1] * (mn - c0)];
    const id = C.uid('g');
    C.defs.push(
      `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}"><stop offset="0" stop-color="${mat[2]}"/><stop offset="0.45" stop-color="${mat[1]}"/><stop offset="1" stop-color="${mat[0]}"/></linearGradient>`,
    );
    return `url(#${id})`;
  };
  // forma simples (um casco)
  const forma = (esferas, mat, z, o = {}) => {
    const H = casco(esferas);
    const m = o.semEscurecer ? mat : escurece(mat, esferas[Math.floor(esferas.length / 2)][0]);
    partes.push({ z, svg: `<path d="${caminho(H)}" fill="${gradiente([H], m)}" stroke="${m[3]}" stroke-width="${o.traco ?? TRACO}" stroke-linejoin="round"/>` });
    return H;
  };
  // união de vários cascos: contorno atrás, recheio na frente (sem as costuras de dentro)
  const uniao = (grupos, mat, z) => {
    const Hs = grupos.map(casco);
    const d = Hs.map(caminho).join('');
    const g = gradiente(Hs, mat);
    partes.push({ z, svg: `<path d="${d}" fill="none" stroke="${mat[3]}" stroke-width="${TRACO * 2}" stroke-linejoin="round"/><path d="${d}" fill="${g}"/>` });
  };
  // arco visível de um anel (centro, eixos e1/e2 no plano, raio): para barras, golas e costuras
  const arco = (c, e1, e2, r1, r2 = r1, n = 28) => {
    const ps = [];
    for (let i = 0; i < n; i++) {
      const t = (2 * Math.PI * i) / n;
      const nrm = norm(add(mul(e1, Math.cos(t)), mul(e2, Math.sin(t))));
      ps.push({ p: add(add(c, mul(e1, r1 * Math.cos(t))), mul(e2, r2 * Math.sin(t))), v: vis(nrm) });
    }
    const ini = ps.findIndex((q, i) => !q.v && ps[(i + 1) % n].v);
    if (ini < 0) return ps.every((q) => q.v) ? ps.map((q) => P(q.p)) : [];
    const out = [];
    for (let k = 1; k <= n; k++) {
      const q = ps[(ini + k) % n];
      if (!q.v) break;
      out.push(P(q.p));
    }
    return out;
  };
  const linhaArco = (Q, cor, w, z, op = 1) => {
    if (Q.length > 1) partes.push({ z, svg: `<path d="M${pts(Q)}" fill="none" stroke="${cor}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>` });
  };
  const zDe = (ps, bias = 0) => ps.reduce((a, p) => a + depth(p), 0) / ps.length + bias;
  const ao = (a, b, t) => V.lerp(a, b, t);

  // ---------- tronco ----------
  const ombro = { D: T(M.ombroAltura, M.ombroLargura, -1), E: T(M.ombroAltura, -M.ombroLargura, -1) };
  const quadril = { D: T(0, M.quadrilLargura, -0.4), E: T(0, -M.quadrilLargura, -0.4) };
  const anel = (h, a, b, d, n = 18) =>
    Array.from({ length: n }, (_, i) => {
      const t = (2 * Math.PI * i) / n;
      return [T(h, a * Math.cos(t), d + b * Math.sin(t)), 0.05];
    });
  // [altura, meia largura, meia profundidade, desvio para a frente]: glúteo atrás, cintura fina, peito à frente
  const ANEIS = [
    [-7, 12.4, 8.4, -1.2],
    [-1, 15.6, 9.8, -2.0],
    [7, 14.8, 9.2, -1.2],
    [14, 13.4, 8.8, 0.2],
    [21, 14.2, 9.4, 1.0],
    [29, 16.4, 10.6, 1.9],
    [37, 17.6, 10.8, 1.6],
    [44, 18.0, 9.0, 0.2],
    [48.5, 14.5, 7.0, -0.8],
    [52, 6.4, 5.4, -1.0],
  ];
  const segs = (lista) => lista.slice(0, -1).map((r, i) => [...anel(...r), ...anel(...lista[i + 1])]);
  // bermuda (da virilha até a cintura) e camiseta (da barra, sobre a bermuda, até o pescoço, com os ombros)
  const bermudaAneis = ANEIS.slice(0, 3).concat([[13, 13.7, 9.0, 0.1]]);
  const camisaAneis = [[9, 14.6, 9.6, -0.7]].concat(ANEIS.slice(3, 9));
  const deltoide = (k) => [
    [add(ombro[k], mul(u, 0.6)), 5.9],
    [add(add(ombro[k], mul(u, -4)), mul(lado, k === 'D' ? 0.6 : -0.6)), 5.3],
  ];
  uniao(segs(bermudaAneis), MAT_P.bermuda, zT + 0.03);
  uniao([...segs(camisaAneis), deltoide('D'), deltoide('E'), [...anel(44, 18, 9, 0.2), ...deltoide('D'), ...deltoide('E')]], MAT_P.camiseta, zT);
  // detalhes do tronco: elástico da bermuda, barra da camiseta, linha do peitoral, gola
  linhaArco(arco(T(12, 0, 0.1), lado, f, 13.8, 9.1), MAT_P.bermuda[0], 0.5, zT + 0.025);
  linhaArco(arco(T(9, 0, -0.7), lado, f, 14.7, 9.7), MAT_P.camiseta[0], 0.55, zT - 0.01);
  if (vis(f)) {
    for (const s of [1, -1]) {
      const Q = [T(33, s * 2, 12.2), T(31, s * 7, 11.6), T(32, s * 12.5, 9.2)].map(P);
      linhaArco(Q, MAT_P.camiseta[0], 0.5, zT - 0.02, 0.7);
    }
  }
  linhaArco(arco(T(49.5, 0, -0.4), lado, f, 7.4, 6.2), MAT_P.camiseta[0], 0.7, zT - 0.03);

  // ---------- pescoço e cabeça ----------
  const hu = norm(spec.cabeca?.cima ?? u);
  const hf = ortoN(spec.cabeca?.frente ?? f, hu);
  const hl = norm(cross(hu, hf));
  const base = T(50, 0, -0.8);
  const KC = 0.92; // escala da cabeça (≈ 1/7,5 da altura)
  const Hc = add(add(base, mul(hu, 14.6)), mul(hf, 1.5));
  const H = (a, b, c) => add(add(add(Hc, mul(hu, a * KC)), mul(hf, b * KC)), mul(hl, c * KC));
  const zCab = depth(Hc) - 3;
  forma(
    [
      [T(47, 0, -1.2), 6.2],
      [base, 5.6],
      [H(-6.2, -1.4, 0), 4.8],
    ],
    MAT_P.pele,
    zT - 0.5,
    { semEscurecer: true },
  );
  // crânio, maçãs do rosto, ângulos da mandíbula, queixo e nariz
  forma(
    [
      [H(1.5, -0.8, 0), 8.9 * KC],
      [H(-3.2, 3.6, 3.2), 5.2 * KC],
      [H(-3.2, 3.6, -3.2), 5.2 * KC],
      [H(-6.6, -1.6, 5.0), 3.0 * KC],
      [H(-6.6, -1.6, -5.0), 3.0 * KC],
      [H(-9.2, 5.3, 0), 2.8 * KC],
      [H(-1.6, 8.9, 0), 1.3 * KC],
    ],
    MAT_P.pele,
    zCab,
    { semEscurecer: true },
  );
  // cabelo com volume: calota de cima (na frente da cabeça) e a de trás (por profundidade)
  {
    const topo = [], tras = [];
    for (let i = 0; i <= 14; i++)
      for (let j = 0; j < 28; j++) {
        const th = (i / 14) * Math.PI, ph = (j / 28) * 2 * Math.PI;
        const dir = [Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)];
        const cu = dir[1], cf = dir[0], cl = Math.abs(dir[2]);
        const dW = add(add(mul(hu, dir[1]), mul(hf, dir[0])), mul(hl, dir[2]));
        const p = [add(H(2.4, -1.3, 0), mul(dW, (9.6 + (cu > 0.5 ? 0.6 : 0)) * KC)), 0.05];
        if ((cu > 0.22 && cf < 0.78) || (cu > -0.05 && cl > 0.8 && cf < 0.3)) topo.push(p);
        if (cf < -0.2 && cu > -0.62) tras.push(p);
      }
    forma(tras, MAT_P.cabelo, depth(H(1, -7, 0)), { semEscurecer: true, traco: 0.45 });
    forma(topo, MAT_P.cabelo, zCab - 0.1, { semEscurecer: true, traco: 0.45 });
    // fios: 3 traços claros no alto, dando direção ao penteado
    if (vis(hu) || vis(hf)) {
      for (const c of [-2.5, 0, 2.5]) {
        const Q = [H(8.6, 3.5, c), H(10.4, -1, c * 1.1), H(8.4, -6, c * 1.2)].filter((p) => vis(norm(sub(p, H(1.5, -0.8, 0))))).map(P);
        linhaArco(Q, MAT_P.cabelo[2], 0.45, zCab - 0.12, 0.8);
      }
    }
  }
  // rosto: orelha, olhos, sobrancelhas, nariz e boca, só onde a superfície está virada para a câmera
  {
    for (const s of [1, -1]) {
      const nrm = norm(add(mul(hl, s), mul(hf, -0.1)));
      if (!vis(nrm)) continue;
      const c = P(H(-1.4, -1.4, 8.4 * s));
      const R = 2.3 * KC * escala;
      partes.push({
        z: zCab - 0.2,
        svg: `<ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${f1(R * 0.72)}" ry="${f1(R)}" fill="${MAT_P.pele[1]}" stroke="${MAT_P.pele[3]}" stroke-width="0.4"/><path d="M${pts([H(0, -1, 8.7 * s), H(-1.2, -0.6, 8.9 * s), H(-2.6, -1.2, 8.7 * s)].map(P))}" fill="none" stroke="${MAT_P.pele[0]}" stroke-width="0.35"/>`,
      });
    }
    for (const s of [1, -1]) {
      const nrm = norm(add(mul(hf, 0.92), mul(hl, 0.38 * s)));
      if (!vis(nrm)) continue;
      const q = P(H(0.2, 7.6, 3.3 * s));
      const r = 0.9 * KC * escala;
      partes.push({
        z: zCab - 0.3,
        svg: `<ellipse cx="${f1(q[0])}" cy="${f1(q[1])}" rx="${f1(r)}" ry="${f1(r * 0.75)}" fill="#2A211C"/><path d="M${pts([H(2.4, 7.6, 1.6 * s), H(2.9, 7.4, 3.4 * s), H(2.5, 6.6, 5.0 * s)].map(P))}" fill="none" stroke="${MAT_P.cabelo[1]}" stroke-width="0.55" stroke-linecap="round"/>`,
      });
    }
    if (vis(hf) || vis(norm(add(hf, hl))) || vis(norm(sub(hf, hl)))) {
      const sn = depth(H(0, 0, 3)) < depth(H(0, 0, -3)) ? 1 : -1;
      partes.push({
        z: zCab - 0.3,
        svg: `<path d="M${pts([H(0.4, 8.4, 0.9 * sn), H(-2.4, 9.4, 1.1 * sn), H(-3.2, 8.6, 1.6 * sn)].map(P))}" fill="none" stroke="${MAT_P.pele[0]}" stroke-width="0.4" stroke-linecap="round"/><path d="M${pts([H(-6.1, 7.4, -1.9), H(-6.4, 7.7, 0), H(-6.1, 7.4, 1.9)].map(P))}" fill="none" stroke="#8B5646" stroke-width="0.5" stroke-linecap="round"/>`,
      });
    }
  }

  // ---------- pernas ----------
  for (const k of ['D', 'E']) {
    const pe = spec.pernas?.[k];
    if (!pe) continue;
    const Hp = quadril[k];
    const A = pe.tornozelo;
    const K = pe.joelho ?? junta(Hp, A, M.coxa, M.canela, pe.dica ?? f);
    const dirPe = norm(pe.pe ?? f);
    const sola = norm(pe.sola ?? [0, 1, 0]);
    const uc = norm(sub(K, Hp)), us = norm(sub(A, K));
    let frenteJ = sub(uc, us);
    frenteJ = len(frenteJ) < 0.15 ? ortoN(f, uc) : norm(frenteJ);
    const atras = ortoN(mul(dirPe, -1), us);
    const zc = zDe([Hp, K], pe.dz ?? 0);
    const zs = zDe([K, A], pe.dz ?? 0);
    const frenteCoxa = ortoN(frenteJ, uc);
    forma(
      [
        [Hp, 7.8],
        [add(ao(Hp, K, 0.38), mul(frenteCoxa, 0.9)), 7.4],
        [ao(Hp, K, 0.75), 6.0],
        [K, 4.9],
      ],
      MAT_P.pele,
      zc,
    );
    forma(
      [
        [add(K, mul(frenteJ, 0.6)), 4.8],
        [add(ao(K, A, 0.26), mul(atras, 1.7)), 5.2],
        [ao(K, A, 0.62), 3.7],
        [A, 2.9],
      ],
      MAT_P.pele,
      zs,
    );
    // joelho (patela)
    {
      const c = add(K, mul(frenteJ, 3.4));
      const m = escurece(MAT_P.pele, c);
      const q = P(c);
      partes.push({ z: Math.min(zc, zs) - 0.06, svg: `<ellipse cx="${f1(q[0])}" cy="${f1(q[1])}" rx="${f1(2.0 * escala)}" ry="${f1(1.7 * escala)}" fill="${m[2]}" opacity="0.3"/>` });
    }
    // perna da bermuda, justa, com a barra
    const fimB = ao(Hp, K, 0.4);
    forma(
      [
        [Hp, 8.2],
        [add(fimB, mul(frenteCoxa, 0.8)), 7.9],
      ],
      MAT_P.bermuda,
      Math.min(zc, zT) - 0.05,
    );
    {
      const [e1, e2] = [ortoN(frenteCoxa, uc), norm(cross(uc, frenteCoxa))];
      linhaArco(arco(add(fimB, mul(frenteCoxa, 0.6)), e1, e2, 7.9), MAT_P.bermuda[0], 0.5, Math.min(zc, zT) - 0.055);
    }
    // tênis: sola, cabedal, biqueira e cadarço
    const lp = norm(cross(sola, dirPe));
    const S = (a, b, c = 0) => add(add(add(A, mul(dirPe, a)), mul(sola, b)), mul(lp, c));
    const zp = zs - 0.25 + (pe.dzPe ?? 0);
    forma(
      [
        [S(-2.6, -6.9), 1.7],
        [S(13.5, -6.9), 1.8],
        [S(20, -6.6), 1.6],
        [S(-2.6, -6.9, 2.4), 1.7],
        [S(13.5, -6.9, 3.2), 1.8],
        [S(-2.6, -6.9, -2.4), 1.7],
        [S(13.5, -6.9, -3.2), 1.8],
      ],
      MAT_P.sola,
      zp,
    );
    forma(
      [
        [S(0.6, -0.8), 3.4],
        [S(-2.5, -4.1), 3.6],
        [S(6, -3.6, 0), 3.9],
        [S(13.4, -5.0, 1.2), 3.0],
        [S(13.4, -5.0, -1.2), 3.0],
        [S(19.6, -5.4), 2.3],
      ],
      MAT_P.tenis,
      zp - 0.01,
    );
    if (vis(sola) || vis(dirPe) || vis(lp) || vis(mul(lp, -1))) {
      const Q = [];
      for (const a of [3, 6, 9]) Q.push(`M${pts([S(a, -0.6 - a * 0.15, -1.6), S(a + 0.8, -0.6 - a * 0.15, 1.6)].map(P))}`);
      partes.push({ z: zp - 0.02, svg: `<path d="${Q.join('')}" stroke="#9AA0A8" stroke-width="0.4" stroke-linecap="round"/>` });
    }
  }

  // ---------- braços e mãos ----------
  for (const k of ['D', 'E']) {
    const br = spec.bracos?.[k];
    if (!br) continue;
    const Sh = ombro[k];
    const m = norm(br.mao ?? sub(br.pega, Sh)); // do punho para os nós dos dedos
    const eixo = ortoN(br.eixo ?? cross(m, u), m); // direção do pegador (dedos lado a lado)
    const curva = mul(norm(cross(eixo, m)), br.curva ?? 1); // para onde os dedos fecham
    const W = sub(br.pega, mul(m, 4.6));
    const E = br.cotovelo ?? junta(Sh, W, M.braco, M.antebraco, br.dica ?? mul(u, -1));
    const ub = norm(sub(E, Sh)), ua = norm(sub(W, E));
    let tras = sub(ub, ua);
    tras = len(tras) < 0.15 ? mul(f, -1) : norm(tras);
    const zb = zDe([Sh, E], br.dz ?? 0);
    const za = zDe([E, W], br.dz ?? 0);
    const frenteBraco = ortoN(mul(tras, -1), ub);
    forma(
      [
        [Sh, 5.0],
        [add(ao(Sh, E, 0.5), mul(frenteBraco, 0.6)), 4.4],
        [E, 3.4],
        [add(E, mul(tras, 1.6)), 2.6],
      ],
      MAT_P.pele,
      zb,
    );
    forma(
      [
        [E, 3.5],
        [ao(E, W, 0.25), 3.9],
        [ao(E, W, 0.7), 3.0],
        [W, 2.4],
      ],
      MAT_P.pele,
      za,
    );
    // manga justa com barra
    const fimM = ao(Sh, E, 0.38);
    forma(
      [
        [add(Sh, mul(u, 0.6)), 5.9],
        [fimM, 5.0],
      ],
      MAT_P.camiseta,
      Math.min(zb, zT) - 0.05,
    );
    linhaArco(arco(fimM, frenteBraco, norm(cross(ub, frenteBraco)), 5.0), MAT_P.camiseta[0], 0.5, Math.min(zb, zT) - 0.055);
    // mão fechada no pegador: palma, 4 dedos lado a lado e o polegar por cima
    const zm = Math.min(za, br.zMao ?? Infinity) - 0.1;
    const G = br.pega;
    const dedos = [-2.9, -0.95, 0.95, 2.9];
    forma(
      [
        [W, 2.4],
        [add(W, mul(m, 2.4)), 3.0],
        ...dedos.map((o) => [add(add(G, mul(m, 2.6)), mul(eixo, o * 0.95)), 1.25]),
        ...dedos.map((o) => [add(add(add(G, mul(m, 0.2)), mul(curva, 2.5)), mul(eixo, o * 0.92)), 1.15]),
      ],
      MAT_P.pele,
      zm,
    );
    {
      const L = [];
      for (const o of [-1.9, 0, 1.9]) L.push(`M${pts([add(add(G, mul(m, 3.6)), mul(eixo, o)), add(add(add(G, mul(m, 2.6)), mul(curva, 2.0)), mul(eixo, o)), add(add(G, mul(curva, 3.2)), mul(eixo, o))].map(P))}`);
      partes.push({ z: zm - 0.01, svg: `<path d="${L.join('')}" fill="none" stroke="${MAT_P.pele[0]}" stroke-width="0.35" stroke-linecap="round"/>` });
    }
    const lp = br.polegar ?? -1; // de que lado do pegador fica o polegar
    forma(
      [
        [add(add(W, mul(eixo, 3.0 * lp)), mul(curva, -0.6)), 1.5],
        [add(add(add(G, mul(m, 0.6)), mul(eixo, 3.1 * lp)), mul(curva, -2.2)), 1.25],
        [add(add(add(G, mul(m, 2.0)), mul(eixo, 1.6 * lp)), mul(curva, -2.4)), 1.1],
      ],
      MAT_P.pele,
      zm - 0.02,
    );
  }

  for (const p of partes) C.bruto(p.z + (spec.dz ?? 0), p.svg);
  return { ombro, quadril, Hc, T };
}

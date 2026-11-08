// A pessoa das ilustrações realistas: adulto de ~175 cm (cerca de 7,3 cabeças), corpo com volume, camiseta,
// bermuda e tênis, pele em tom neutro, rosto mínimo (olho e orelha), sem traço de gênero nem marca.
// Inspirada no boneco do guia (src/engine/estilo/corpo.ts: tronco por anéis elípticos, membros cônicos por
// esferas, ombro arredondado), mas é código à parte: não importa nem muda o motor.
// Medidas em cm, escolhas de desenho com proporções aproximadas de um adulto (não são dado antropométrico medido).
import { V, f1, hull, mix } from './base.mjs';

const { add, sub, mul, dot, cross, norm, len } = V;

export const MEDIDAS = { coxa: 43, canela: 42, braco: 29, antebraco: 26, ombroAltura: 46, ombroLargura: 17.5, quadrilLargura: 9 };

export const MAT_P = {
  pele: ['#9A6A51', '#C8977A', '#E8C2AA', '#6B4534'],
  camiseta: ['#A39C90', '#D8D3CA', '#F4F1EC', '#6F685E'],
  bermuda: ['#272D35', '#46505E', '#717C8B', '#171B20'],
  tenis: ['#A9AFB7', '#E1E4E8', '#FFFFFF', '#6A717A'],
  sola: ['#5F656D', '#868C94', '#B0B5BB', '#41454B'],
  cabelo: ['#1A1613', '#352E28', '#5A5048', '#0E0C0A'],
};
const LUZ2 = norm([-0.55, -0.83, 0]); // luz na tela (de cima, da esquerda)

// joelho/cotovelo: de a até b, comprimentos l1 e l2, dobrando para o lado de "dica"
export function junta(a, b, l1, l2, dica) {
  const d = sub(b, a);
  const D = Math.min(len(d), l1 + l2 - 0.05);
  const u = norm(d);
  const x = (l1 * l1 - l2 * l2 + D * D) / (2 * D);
  const h = Math.sqrt(Math.max(0, l1 * l1 - x * x));
  let p = sub(dica, mul(u, dot(dica, u)));
  p = norm(p);
  return add(add(a, mul(u, x)), mul(p, h));
}

export function pessoa(C, spec) {
  const { P } = C;
  const escala = C.s; // px por cm
  const u = norm(spec.cima ?? [0, 1, 0]);
  let f = norm(spec.frente ?? [1, 0, 0]);
  f = norm(sub(f, mul(u, dot(f, u))));
  const lado = norm(cross(u, f)); // lado direito da pessoa
  const T = (h, x, d) => add(add(add(spec.pelve, mul(u, h)), mul(lado, x)), mul(f, d));
  const M = MEDIDAS;

  const partes = []; // {z, svg}
  const depth = (p) => P(p)[2];
  const longeDe = depth(T(30, 0, 0));
  const escurece = (mat, p) => (depth(p) > longeDe + 3 ? mat.map((c, i) => (i < 3 ? mix(c, mat[0], 0.3) : c)) : mat);

  // casco de esferas (centro 3D, raio cm) → polígono na tela
  const casco = (esferas) => {
    const pts = [];
    for (const [c, r] of esferas) {
      const q = P(c);
      const R = r * escala;
      for (let i = 0; i < 20; i++) pts.push([q[0] + R * Math.cos((i / 20) * 2 * Math.PI), q[1] + R * Math.sin((i / 20) * 2 * Math.PI)]);
    }
    return hull(pts);
  };
  const gradiente = (H, mat) => {
    // gradiente de luz atravessando a forma: do lado iluminado (claro) ao da sombra (escuro)
    let mn = Infinity, mx = -Infinity, cx = 0, cy = 0;
    for (const q of H) {
      const t = q[0] * LUZ2[0] + q[1] * LUZ2[1];
      mn = Math.min(mn, t);
      mx = Math.max(mx, t);
      cx += q[0];
      cy += q[1];
    }
    cx /= H.length;
    cy /= H.length;
    const c0 = cx * LUZ2[0] + cy * LUZ2[1];
    const a = [cx + LUZ2[0] * (mx - c0), cy + LUZ2[1] * (mx - c0)];
    const b = [cx + LUZ2[0] * (mn - c0), cy + LUZ2[1] * (mn - c0)];
    const id = C.uid('g');
    C.defs.push(
      `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}"><stop offset="0" stop-color="${mat[2]}"/><stop offset="0.45" stop-color="${mat[1]}"/><stop offset="1" stop-color="${mat[0]}"/></linearGradient>`,
    );
    return `url(#${id})`;
  };
  const forma = (esferas, mat, z, o = {}) => {
    const H = casco(esferas);
    const m = o.semEscurecer ? mat : escurece(mat, esferas[Math.floor(esferas.length / 2)][0]);
    const d = 'M' + H.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L') + 'Z';
    partes.push({ z, svg: `<path d="${d}" fill="${gradiente(H, m)}" stroke="${m[3]}" stroke-width="${o.traco ?? 0.45}" stroke-linejoin="round"/>` });
  };
  const zDe = (pts, bias = 0) => pts.reduce((a, p) => a + depth(p), 0) / pts.length + bias;
  const ao = (a, b, t) => V.lerp(a, b, t);

  // ---------- tronco ----------
  const ombro = { D: T(M.ombroAltura, M.ombroLargura, -1.5), E: T(M.ombroAltura, -M.ombroLargura, -1.5) };
  const quadril = { D: T(0, M.quadrilLargura, -0.5), E: T(0, -M.quadrilLargura, -0.5) };
  const anel = (h, a, b, d, n = 16) =>
    Array.from({ length: n }, (_, i) => {
      const t = (2 * Math.PI * i) / n;
      return [T(h, a * Math.cos(t), d + b * Math.sin(t)), 0.01];
    });
  const ANEIS = [
    [-7, 14.5, 9.5, -1.8],
    [2, 16.8, 11, -2.2],
    [10, 15.6, 10, -1.2],
    [17, 14.4, 9.6, 0],
    [27, 15.8, 10.8, 1.4],
    [37, 17.4, 11, 1.2],
    [45, 18.5, 8.6, -1.2],
    [50.5, 7.5, 6, -1.2],
  ];
  const zTronco = zDe([T(25, 0, 0)]);
  // bermuda: da pelve à cintura
  forma(ANEIS.slice(0, 4).flatMap(([h, a, b, d]) => anel(h, a, b, d)), MAT_P.bermuda, zTronco + 0.02, { semEscurecer: true });
  // camiseta: da barra (um pouco abaixo da cintura) ao pescoço, com os ombros redondos
  forma(
    [[14, 15, 10.2, -0.6], ...ANEIS.slice(4)]
      .flatMap(([h, a, b, d]) => anel(h, a, b, d))
      .concat([
        [ombro.D, 6.0],
        [ombro.E, 6.0],
      ]),
    MAT_P.camiseta,
    zTronco,
    { semEscurecer: true },
  );
  // gola
  {
    const g = Array.from({ length: 14 }, (_, i) => T(49.5, 7 * Math.cos((2 * Math.PI * i) / 14), -0.8 + 5.6 * Math.sin((2 * Math.PI * i) / 14)));
    const Q = g.map(P);
    partes.push({ z: zTronco - 0.01, svg: `<path d="M${Q.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L')}Z" fill="none" stroke="${MAT_P.camiseta[0]}" stroke-width="0.6"/>` });
  }

  // ---------- cabeça e pescoço ----------
  const hu = norm(spec.cabeca?.cima ?? u);
  let hf = norm(spec.cabeca?.frente ?? f);
  hf = norm(sub(hf, mul(hu, dot(hf, hu))));
  const hl = norm(cross(hu, hf));
  const base = T(49, 0, -0.8);
  const Hc = add(add(base, mul(hu, 15)), mul(hf, 1.2));
  const H = (a, b, c) => add(add(add(Hc, mul(hu, a)), mul(hf, b)), mul(hl, c));
  const zCab = depth(Hc) - 3;
  forma(
    [
      [base, 5.4],
      [H(-6, 0, 0), 5.0],
    ],
    MAT_P.pele,
    zTronco - 0.5,
    { semEscurecer: true },
  );
  forma(
    [
      [H(1.5, -0.6, 0), 9.6],
      [H(-5.2, 4.2, 0), 5.9],
      [H(-8.3, 5.6, 0), 3.2],
      [H(-1.4, 9.7, 0), 1.5],
    ],
    MAT_P.pele,
    zCab,
    { semEscurecer: true },
  );
  // cabelo curto: calota no alto (na frente da cabeça) e a parte de trás (ordenada pela profundidade, para não
  // cobrir o rosto quando a pessoa está de frente)
  {
    const topo = [], tras = [];
    for (let i = 0; i <= 12; i++)
      for (let j = 0; j < 24; j++) {
        const th = (i / 12) * Math.PI, ph = (j / 24) * 2 * Math.PI;
        const dir = [Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)];
        const dW = add(add(mul(hu, dir[1]), mul(hf, dir[0])), mul(hl, dir[2]));
        const cu = dir[1], cf = dir[0];
        const p = [add(H(1.5, -0.6, 0), mul(dW, 10.2)), 0.05];
        if (cu > 0.3 && cf < 0.72) topo.push(p);
        if (cf < -0.25 && cu > -0.45) tras.push(p);
      }
    forma(tras, MAT_P.cabelo, depth(H(1, -7, 0)), { semEscurecer: true, traco: 0.4 });
    forma(topo, MAT_P.cabelo, zCab - 0.1, { semEscurecer: true, traco: 0.4 });
  }
  // orelha e olho do lado que está para a câmera
  {
    const ladoPerto = depth(H(0, 0, 5)) < depth(H(0, 0, -5)) ? 1 : -1;
    const orelha = P(H(-1.5, -1, 9.2 * ladoPerto));
    const R = 2.1 * escala;
    partes.push({ z: zCab - 0.2, svg: `<ellipse cx="${f1(orelha[0])}" cy="${f1(orelha[1])}" rx="${f1(R * 0.8)}" ry="${f1(R)}" fill="${MAT_P.pele[1]}" stroke="${MAT_P.pele[3]}" stroke-width="0.35"/>` });
    const cam = C.rot(hf)[2];
    // de frente, os dois olhos; de lado, só o do lado da câmera
    const lados = cam < -0.55 ? [1, -1] : cam < 0.35 ? [ladoPerto] : [];
    for (const lp of lados) {
      const q = P(H(0.6, 8.0, 3.8 * lp));
      const sob = P(H(2.9, 8.2, 2.6 * lp));
      const sob2 = P(H(2.7, 6.8, 5.4 * lp));
      partes.push({
        z: zCab - 0.3,
        svg: `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(0.9 * escala)}" fill="#2A221D"/><path d="M${f1(sob2[0])} ${f1(sob2[1])}L${f1(sob[0])} ${f1(sob[1])}" stroke="#3A2E27" stroke-width="0.45" stroke-linecap="round"/>`,
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
    const zc = zDe([Hp, K], 0);
    const zs = zDe([K, A], 0);
    // coxa (quadríceps na frente) e perna (panturrilha atrás)
    const frenteCoxa = norm(sub(sub(K, Hp), mul(norm(sub(K, Hp)), 0)));
    void frenteCoxa;
    const atras = norm(sub(mul(dirPe, -1), mul(norm(sub(A, K)), dot(mul(dirPe, -1), norm(sub(A, K))))));
    forma(
      [
        [Hp, 8.4],
        [ao(Hp, K, 0.4), 7.9],
        [K, 5.3],
      ],
      MAT_P.pele,
      zc,
    );
    forma(
      [
        [K, 4.9],
        [add(ao(K, A, 0.3), mul(atras, 1.6)), 5.5],
        [ao(K, A, 0.7), 3.8],
        [A, 3.1],
      ],
      MAT_P.pele,
      zs,
    );
    // perna da bermuda
    forma(
      [
        [Hp, 8.9],
        [ao(Hp, K, 0.4), 8.2],
      ],
      MAT_P.bermuda,
      Math.min(zc, zTronco) - 0.05,
    );
    // tênis: sola e cabedal
    const S = (a, b) => add(add(A, mul(dirPe, a)), mul(sola, b));
    forma(
      [
        [S(-5.2, -5.6), 3.9],
        [S(13, -6.2), 3.8],
        [S(19.5, -5.6), 2.6],
      ],
      MAT_P.sola,
      zs - 0.2,
    );
    forma(
      [
        [S(0.5, -0.6), 3.9],
        [S(-4.6, -4.4), 4.0],
        [S(8, -3.4), 4.2],
        [S(13, -4.6), 3.9],
        [S(19, -4.6), 2.6],
      ],
      MAT_P.tenis,
      zs - 0.25,
    );
  }

  // ---------- braços ----------
  for (const k of ['D', 'E']) {
    const br = spec.bracos?.[k];
    if (!br) continue;
    const Sh = ombro[k];
    const dirMao = norm(br.mao ?? sub(br.pega, Sh));
    const W = sub(br.pega, mul(dirMao, 4.5));
    const E = br.cotovelo ?? junta(Sh, W, M.braco, M.antebraco, br.dica ?? mul(u, -1));
    const zb = zDe([Sh, E], br.dz ?? 0);
    const za = zDe([E, W], br.dz ?? 0);
    forma(
      [
        [Sh, 5.6],
        [ao(Sh, E, 0.45), 4.7],
        [E, 3.6],
      ],
      MAT_P.pele,
      zb,
    );
    forma(
      [
        [E, 3.8],
        [ao(E, W, 0.28), 4.2],
        [W, 2.6],
      ],
      MAT_P.pele,
      za,
    );
    // manga
    forma(
      [
        [Sh, 6.0],
        [ao(Sh, E, 0.4), 5.2],
      ],
      MAT_P.camiseta,
      Math.min(zb, zTronco) - 0.05,
    );
    // mão fechada no pegador
    forma(
      [
        [W, 2.6],
        [add(W, mul(dirMao, 4)), 3.5],
        [add(W, mul(dirMao, 7.5)), 2.9],
      ],
      MAT_P.pele,
      Math.min(za, br.zMao ?? Infinity) - 0.1,
    );
  }

  for (const p of partes) C.bruto(p.z + (spec.dz ?? 0), p.svg);
  return { ombro, quadril, Hc, T };
}

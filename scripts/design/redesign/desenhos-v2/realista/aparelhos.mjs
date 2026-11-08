// As 8 amostras na ilustração realista. Cada aparelho é uma função que monta a cena (medidas em cm) e devolve
// o conteúdo SVG para o viewBox 0 0 160 120. Para os 49 itens: uma função por item, com as mesmas peças.
import { MAT, V, camera, cena, f1, retArred } from './base.mjs';
import { pessoa, MEDIDAS } from './pessoa.mjs';

const { add, sub, mul, norm } = V;
export const VIEWBOX = '0 0 160 120';
const r2 = (deg) => (deg * Math.PI) / 180;
const dirAng = (deg) => [Math.cos(r2(deg)), Math.sin(r2(deg)), 0];

// ---------- kettlebell (peso livre: o objeto, desenhado à mão com volume) ----------
function kettlebellForma(id, cx, base, R, kg) {
  // corpo quase esférico, base reta, alça larga com "chifres"; luz de cima à esquerda
  const cy = base - R * 0.86;
  const hb = Math.sqrt(R * R - (base - cy) ** 2);
  const corpo = `M${f1(cx - hb)} ${f1(base)}A${f1(R)} ${f1(R)} 0 1 1 ${f1(cx + hb)} ${f1(base)}Z`;
  const ex = R * 0.66, ey = cy - R * 0.72;
  const top = cy - R * 1.72;
  const alca = `M${f1(cx - ex)} ${f1(ey + 2)}C${f1(cx - ex - R * 0.18)} ${f1(ey - R * 0.45)} ${f1(cx - ex + R * 0.02)} ${f1(top + R * 0.02)} ${f1(cx - R * 0.3)} ${f1(top)}H${f1(cx + R * 0.3)}C${f1(cx + ex - R * 0.02)} ${f1(top + R * 0.02)} ${f1(cx + ex + R * 0.18)} ${f1(ey - R * 0.45)} ${f1(cx + ex)} ${f1(ey + 2)}`;
  const g = `${id}-kb${kg}`;
  const w = R * 0.27;
  return `
  <radialGradient id="${g}c" cx="${f1(cx - R * 0.38)}" cy="${f1(cy - R * 0.42)}" r="${f1(R * 1.45)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7A818B"/><stop offset="0.35" stop-color="#3A3F46"/><stop offset="1" stop-color="#16181B"/></radialGradient>
  <linearGradient id="${g}a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6E757F"/><stop offset="0.5" stop-color="#30343A"/><stop offset="1" stop-color="#1A1C20"/></linearGradient>
  <path d="${alca}" transform="translate(${f1(R * 0.07)} ${f1(-R * 0.06)})" fill="none" stroke="#141619" stroke-width="${f1(w)}" stroke-linecap="round"/>
  <path d="${alca}" fill="none" stroke="url(#${g}a)" stroke-width="${f1(w)}" stroke-linecap="round"/>
  <path d="${alca}" fill="none" stroke="#9AA1AA" stroke-width="${f1(w * 0.16)}" stroke-linecap="round" opacity="0.7" transform="translate(${f1(-w * 0.18)} ${f1(-w * 0.2)})"/>
  <path d="${corpo}" fill="url(#${g}c)" stroke="#0E0F11" stroke-width="0.5"/>
  <path d="M${f1(cx - hb * 0.92)} ${f1(base - 0.6)}H${f1(cx + hb * 0.92)}" stroke="#0E0F11" stroke-width="${f1(R * 0.09)}" stroke-linecap="round"/>
  <ellipse cx="${f1(cx - R * 0.42)}" cy="${f1(cy - R * 0.44)}" rx="${f1(R * 0.22)}" ry="${f1(R * 0.13)}" transform="rotate(-35 ${f1(cx - R * 0.42)} ${f1(cy - R * 0.44)})" fill="#FFFFFF" opacity="0.28"/>
  <rect x="${f1(cx - R * 0.36)}" y="${f1(cy + R * 0.02)}" width="${f1(R * 0.72)}" height="${f1(R * 0.36)}" rx="${f1(R * 0.08)}" fill="#3F3AA8" stroke="#211D66" stroke-width="0.4"/>
  <text x="${f1(cx)}" y="${f1(cy + R * 0.21)}" font-family="system-ui,sans-serif" font-weight="800" font-size="${f1(R * 0.26)}" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">${kg} kg</text>`;
}
function kettlebell(id) {
  const sombra = (cx, base, R) =>
    `<ellipse cx="${f1(cx + R * 0.15)}" cy="${f1(base + 0.6)}" rx="${f1(R * 1.05)}" ry="${f1(R * 0.16)}" fill="#1B1C1F" opacity="0.22" filter="url(#${id}-sb)"/>`;
  return `<defs><filter id="${id}-sb" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
  ${sombra(62, 104, 30)}${sombra(122, 104, 19)}
  ${kettlebellForma(id, 62, 104, 30, 16)}
  ${kettlebellForma(id, 122, 104, 19, 8)}`;
  // (o kettlebell é desenhado direto no viewBox)
}

// ---------- leg press 45° ----------
function legPress(id) {
  const C = cena(id, camera({ yaw: -32, pitch: 13, s: 0.6 }));
  const M = MAT;
  const zN = 6, zF = 74; // laterais da estrutura
  // base no chão
  for (const z of [zN, zF]) C.tubo([0, 3, z], [214, 3, z], 6, 6, M.metal);
  for (const x of [6, 118, 206]) C.tubo([x, 3, zN], [x, 3, zF], 5, 5, M.metal, { up: [0, 1, 0] });
  // trilhos a 45°
  const ru = norm([1, 1, 0]);
  const rn = norm([-1, 1, 0]); // para cima/esquerda do trilho (lado de quem senta)
  const R0 = [118, 8, 0];
  const R = (s, k = 0, z = 0) => add(add(add(R0, mul(ru, s)), mul(rn, k)), [0, 0, z]);
  for (const z of [14, 66]) C.tubo(R(0, 0, z), R(138, 0, z), 7, 7, M.cromo, { up: [0, 0, 1] });
  // torre de trás e travessa
  for (const z of [zN + 4, zF - 4]) {
    C.tubo([216, 0, z], R(138, 0, z), 7, 7, M.metal, { up: [0, 0, 1] });
    C.tubo([176, 3, z], R(100, -4, z), 6, 6, M.metal, { up: [0, 0, 1] });
  }
  C.tubo(R(140, 0, 8), R(140, 0, 72), 6, 6, M.metal);
  // carrinho
  const sC = 58; // posição do carrinho no trilho
  C.prisma(retArred(50, 5, 2), R(sC + 22, 6, 12), ru, rn, [0, 0, 56], M.metal);
  for (const z of [12, 63]) C.prisma(retArred(54, 16, 2), R(sC + 24, 10, z), ru, rn, [0, 0, 5], M.metalClaro);
  // plataforma dos pés (perpendicular ao trilho) com ranhuras
  const pl = (k, z) => R(sC - 4, k, z);
  const ranhuras = (P) => {
    let d = '';
    for (let i = 0; i < 9; i++) {
      const k = 8 + i * 7.2;
      const a = P(add(pl(k, 10), mul(ru, -2.6))), b = P(add(pl(k, 70), mul(ru, -2.6)));
      d += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
    }
    return `<path d="${d}" stroke="#5A6068" stroke-width="0.5" stroke-linecap="round"/>`;
  };
  C.prisma(retArred(5, 70, 2), pl(36, 6), ru, rn, [0, 0, 68], M.plataforma, { decalSempre: ranhuras, dz: 30 });
  // pinos das anilhas e anilhas
  for (const [z1, z2, zs] of [
    [8, -16, [-6, -10.5]],
    [72, 96, [82, 86.5]],
  ]) {
    C.cilindro(R(sC + 38, 12, z1), R(sC + 38, 12, z2), 2.6, M.cromo);
    for (const zz of zs) C.anilha(R(sC + 38, 12, zz), R(sC + 38, 12, zz + (z2 < 0 ? -3.6 : 3.6)), 22);
  }
  // banco e encosto
  C.tubo([62, 3, 40], [70, 40, 40], 7, 7, M.metal, { up: [0, 0, 1] });
  C.tubo([20, 3, 40], [34, 60, 40], 6, 6, M.metal, { up: [0, 0, 1] });
  const seatDir = norm([1, 0.18, 0]);
  const seatN = norm([-0.18, 1, 0]);
  C.estofado([76, 41, 40], seatDir, seatN, [0, 0, 1], 44, 10, 50);
  const backDir = norm([-0.58, 0.81, 0]);
  const backN = norm([0.81, 0.58, 0]);
  C.estofado([36, 70, 40], backDir, backN, [0, 0, 1], 62, 10, 50);
  // pegadores ao lado do banco
  for (const z of [10, 70]) {
    C.tubo([84, 30, z + (z < 40 ? 6 : -6)], [92, 48, z], 3.2, 3.2, M.metal);
    C.cilindro([92, 48, z], [104, 53, z], 2.2, M.borracha);
  }
  C.sombra(110, 40, 118, 52);
  // pessoa: sentada, costas no encosto, pés na plataforma, mãos nos pegadores
  const pelve = [74, 58, 40];
  const solaN = norm([-1, -1, 0]);
  const pePl = norm([-1, 1, 0]);
  const tornozelo = (z) => add(R(sC - 4, 30, z), mul(solaN, 7.5));
  pessoa(C, {
    pelve,
    cima: backDir,
    frente: backN,
    cabeca: { cima: norm([-0.3, 1, 0]), frente: norm([1, 0.3, 0]) },
    pernas: {
      D: { tornozelo: tornozelo(29), pe: pePl, sola: solaN, dica: [-0.2, 1, -0.15] },
      E: { tornozelo: tornozelo(51), pe: pePl, sola: solaN, dica: [-0.2, 1, 0.15] },
    },
    bracos: {
      D: { pega: [97, 50.5, 10], mao: norm([1, 0.4, 0]), dica: [0.2, -1, -0.3] },
      E: { pega: [97, 50.5, 70], mao: norm([1, 0.4, 0]), dica: [0.2, -1, 0.3] },
    },
  });
  return C.svg();
}

// ---------- torre de polia (usada na polia dupla) ----------
function torrePolia(C, x0, lado, alturaPolia) {
  // x0 = borda de fora; lado = +1 (torre da esquerda, pista à direita) ou -1
  const M = MAT;
  const X = (dx) => x0 + lado * dx;
  const xs = [X(0), X(42)];
  for (const x of xs) for (const z of [0, 34]) C.tubo([x, 0, z], [x, 222, z], 5, 5, M.metal);
  for (const z of [0, 34]) C.tubo([xs[0], 222, z], [xs[1], 222, z], 5, 5, M.metal);
  for (const x of xs) C.tubo([x, 222, 0], [x, 222, 34], 5, 5, M.metal);
  C.caixa([Math.min(...xs) - 3, 0, -3], [Math.max(...xs) + 3, 4, 37], M.metal);
  // guias e pilha
  const xa = Math.min(X(9), X(33));
  for (const dx of [12, 30]) C.cilindro([Math.min(X(dx), X(dx)), 4, 20], [X(dx), 205, 20], 0.9, M.cromo, { lados: 10 });
  C.pilha([xa, 4, 13], [1, 0, 0], [0, 0, 1], 24, 72, 12, 12, { passo: 5 });
  C.caixa([xa + 2, 76.5, 15], [xa + 22, 80, 23], M.cromo);
  C.cilindro([X(21), 80, 19], [X(21), 205, 19], 0.8, M.cromo, { lados: 8 });
  C.cilindro([X(21), 208, 12], [X(21), 208, 26], 4.5, M.metalClaro, { lados: 18 });
  // pista regulável com furos e o carrinho da polia
  const xp = X(50);
  C.tubo([xp, 6, 4], [xp, 214, 4], 6, 6, M.metal);
  C.tubo([X(42), 214, 4], [xp, 214, 4], 5, 5, M.metal);
  C.tubo([X(42), 6, 4], [xp, 6, 4], 5, 5, M.metal);
  const centros = [];
  for (let y = 24; y <= 204; y += 12) centros.push([xp, y, 0.9]);
  C.furos(centros, [1, 0, 0], [0, 1, 0], 1.1);
  C.caixa([xp - 4.5, alturaPolia - 8, -1.5], [xp + 4.5, alturaPolia + 8, 9.5], M.metalClaro);
  C.cilindro([xp - lado * 1, alturaPolia + 4, -3.5], [xp - lado * 1, alturaPolia + 4, -6], 1.6, M.borracha, { lados: 12 });
  const pol = [xp + lado * 7, alturaPolia - 4, 4];
  C.cilindro([pol[0], pol[1], 1.5], [pol[0], pol[1], 6.5], 4.6, M.metalClaro, { lados: 20 });
  C.tubo([xp + lado * 3.5, alturaPolia - 2, 4], [pol[0], pol[1], 4], 2, 5, M.metal);
  return pol;
}

function poliaDupla(id) {
  const C = cena(id, camera({ yaw: 16, pitch: 9, s: 0.5 }));
  const M = MAT;
  const pE = torrePolia(C, 0, 1, 150);
  const pD = torrePolia(C, 300, -1, 150);
  for (const z of [0, 34]) C.tubo([42, 222, z], [258, 222, z], 5, 5, M.metal);
  C.tubo([110, 214, -6], [190, 214, -6], 3.4, 3.4, M.cromo);
  for (const x of [110, 190]) C.tubo([x, 214, -6], [x, 222, 0], 3, 3, M.metal);
  C.sombra(150, 18, 165, 40, 0.18);
  // pessoa de frente, no meio, puxando os dois cabos para a frente do corpo
  const gD = [133, 108, -26], gE = [167, 108, -26];
  pessoa(C, {
    pelve: [150, 93, 12],
    cima: [0, 1, 0.06],
    frente: [0, 0, -1],
    pernas: {
      D: { tornozelo: [137, 7.5, 2], pe: norm([-0.15, 0, -1]), dica: [0, 0, -1] },
      E: { tornozelo: [163, 7.5, 22], pe: norm([0.15, 0, -1]), dica: [0, 0, -1] },
    },
    bracos: {
      D: { pega: gD, mao: norm([0.5, -0.4, -1]), dica: [-1, 0.3, 0.2] },
      E: { pega: gE, mao: norm([-0.5, -0.4, -1]), dica: [1, 0.3, 0.2] },
    },
  });
  for (const [p, g] of [
    [pE, gD],
    [pD, gE],
  ]) {
    C.linha(p, g, '#1D2024', 0.55, { dz: -60 });
    C.cilindro(add(g, [0, -3, 0]), add(g, [0, 3, 0]), 1.4, M.borracha, { lados: 10, dz: -1 });
  }
  return C.svg();
}

// ---------- banco Scott ----------
function bancoScott(id) {
  const C = cena(id, camera({ yaw: 36, pitch: 12, s: 0.6 }));
  const M = MAT;
  // base em T e coluna do banco com regulagem
  C.tubo([2, 3, 30], [96, 3, 30], 6, 6, M.metal);
  for (const x of [6, 90]) C.tubo([x, 3, 4], [x, 3, 56], 6, 6, M.metal);
  for (const z of [4, 56]) for (const x of [6, 90]) C.cilindro([x, 0, z], [x, 1.2, z], 3.4, M.borracha, { lados: 12 });
  C.tubo([20, 6, 30], [20, 36, 30], 6.5, 6.5, M.metal);
  C.tubo([20, 36, 30], [20, 50, 30], 5, 5, M.cromo);
  C.furos([[20, 42, 27.4], [20, 47, 27.4]], [1, 0, 0], [0, 1, 0], 0.8);
  C.cilindro([20, 33, 26.6], [20, 33, 22], 1.2, M.borracha, { lados: 10 });
  C.estofado([20, 51, 30], [1, 0, 0], [0, 1, 0], [0, 0, 1], 34, 8, 34);
  // apoio inclinado dos braços
  const pa = norm([0.78, -0.62, 0]);
  const pn = norm([0.62, 0.78, 0]);
  C.tubo([58, 6, 30], [52, 77, 30], 7, 7, M.metal);
  C.tubo([52, 77, 30], [44, 92, 30], 5, 5, M.metal);
  C.estofado([46, 83, 30], pa, pn, [0, 0, 1], 46, 8, 50);
  // suporte da barra
  for (const z of [6, 54]) {
    C.tubo([62, 6, z], [70, 66, z], 4, 4, M.metal);
    C.tubo([70, 66, z], [74, 70, z], 3, 3, M.metal);
  }
  C.tubo([62, 6, 6], [62, 6, 54], 4, 4, M.metal);
  C.sombra(50, 30, 58, 36, 0.2);
  // barra W com anilhas (nas mãos, embaixo do apoio)
  const bar = [79, 71];
  C.cilindro([bar[0], bar[1], -24], [bar[0], bar[1], 84], 1.3, M.cromo, { lados: 10 });
  for (const [z1, z2] of [
    [-12, -15.5],
    [-16, -19],
    [72, 75.5],
    [76, 79],
  ])
    C.anilha([bar[0], bar[1], z1], [bar[0], bar[1], z2], z1 === -12 || z1 === 72 ? 11 : 8.5);
  for (const z of [-10.5, 70.5]) C.cilindro([bar[0], bar[1], z], [bar[0], bar[1], z + (z < 0 ? -1.5 : 1.5)], 2.6, M.cromo, { lados: 12 });
  // pessoa sentada, braços estendidos sobre o apoio, segurando a barra
  pessoa(C, {
    pelve: [21, 66, 30],
    cima: norm([0.24, 1, 0]),
    frente: [1, 0, 0],
    cabeca: { cima: norm([0.2, 1, 0]), frente: norm([1, -0.25, 0]) },
    pernas: {
      D: { tornozelo: [44, 7.5, 21], pe: [1, 0, 0], dica: [1, 0.3, 0] },
      E: { tornozelo: [44, 7.5, 39], pe: [1, 0, 0], dica: [1, 0.3, 0] },
    },
    bracos: {
      D: { pega: [bar[0], bar[1], 16], mao: norm([0.5, -0.8, 0]), dica: [0, 1, 0] },
      E: { pega: [bar[0], bar[1], 44], mao: norm([0.5, -0.8, 0]), dica: [0, 1, 0] },
    },
  });
  return C.svg();
}

// ---------- cadeira abdutora e adutora ----------
function abdutora(id) {
  const C = cena(id, camera({ yaw: 28, pitch: 12, s: 0.6 }));
  const M = MAT;
  // base
  for (const x of [-26, 26]) C.tubo([x, 3, -46], [x, 3, 66], 6, 6, M.metal);
  C.tubo([-26, 3, 66], [80, 3, 66], 6, 6, M.metal);
  C.tubo([-26, 3, -46], [26, 3, -46], 6, 6, M.metal);
  // torre da pilha atrás, ao lado
  for (const x of [48, 78]) for (const z of [52, 72]) C.tubo([x, 3, z], [x, 168, z], 4.5, 4.5, M.metal);
  for (const z of [52, 72]) C.tubo([48, 168, z], [78, 168, z], 4.5, 4.5, M.metal);
  C.caixa([46, 165, 50], [80, 171, 74], M.metalClaro);
  for (const x of [54, 72]) C.cilindro([x, 6, 62], [x, 160, 62], 0.8, M.cromo, { lados: 8 });
  C.pilha([51, 6, 56], [1, 0, 0], [0, 0, 1], 24, 66, 11, 11, { passo: 5 });
  C.cilindro([63, 72, 62], [63, 150, 62], 0.8, M.cromo, { lados: 8 });
  // coluna, assento e encosto
  C.tubo([0, 6, 22], [0, 38, 8], 8, 8, M.metal);
  C.tubo([0, 6, 40], [0, 64, 34], 7, 7, M.metal);
  C.estofado([0, 40, 4], [0, 0, 1], [0, 1, 0], [1, 0, 0], 42, 9, 46);
  const bA = norm([0, 1, 0.22]);
  const bN = norm([0, 0.22, -1]);
  C.estofado([0, 82, 36], bA, bN, [1, 0, 0], 64, 9, 44);
  // braços das almofadas (abertos), almofadas por fora dos joelhos, apoios dos pés
  for (const sx of [-1, 1]) {
    C.tubo([sx * 12, 36, -14], [sx * 38, 46, -26], 4.5, 4.5, M.metal);
    C.estofado([sx * 39, 52, -27], [0, 1, 0], [-sx, 0, 0.2], [0, 0, 1], 22, 7, 16);
    C.tubo([sx * 10, 14, -20], [sx * 34, 14, -40], 4, 4, M.metal);
    C.prisma(retArred(16, 3, 1), [sx * 34, 13, -40], [0, 0, 1], [0, 1, 0], [sx * 12, 0, 0], M.plataforma);
    C.tubo([sx * 25, 40, -2], [sx * 30, 52, 2], 3, 3, M.metal);
    C.cilindro([sx * 30, 52, -6], [sx * 30, 52, 10], 2.1, M.borracha, { lados: 12 });
  }
  C.sombra(15, 10, 72, 62, 0.2);
  pessoa(C, {
    pelve: [0, 57, 10],
    cima: norm([0, 1, 0.2]),
    frente: [0, 0, -1],
    pernas: {
      D: { joelho: [-30, 54, -27], tornozelo: [-38, 21.5, -36], pe: norm([-0.2, 0, -1]) },
      E: { joelho: [30, 54, -27], tornozelo: [38, 21.5, -36], pe: norm([0.2, 0, -1]) },
    },
    bracos: {
      D: { pega: [-30, 52, 1], mao: [0, 0, -1], dica: [-1, -0.2, 0.3] },
      E: { pega: [30, 52, 1], mao: [0, 0, -1], dica: [1, -0.2, 0.3] },
    },
  });
  return C.svg();
}

// ---------- hack ----------
function hack(id) {
  const C = cena(id, camera({ yaw: 14, pitch: 12, s: 0.6 }));
  const M = MAT;
  const ru = norm([-0.68, 0.73, 0]); // trilho sobe para trás
  const rn = norm([0.73, 0.68, 0]); // lado de quem usa
  const R0 = [40, 14, 0];
  const R = (s, k = 0, z = 0) => add(add(add(R0, mul(ru, s)), mul(rn, k)), [0, 0, z]);
  for (const z of [6, 74]) C.tubo([-80, 3, z], [86, 3, z], 6, 6, M.metal);
  for (const x of [-76, 0, 82]) C.tubo([x, 3, 6], [x, 3, 74], 5, 5, M.metal);
  for (const z of [16, 64]) C.tubo(R(0, 0, z), R(150, 0, z), 6.5, 6.5, M.cromo, { up: [0, 0, 1] });
  for (const z of [10, 70]) {
    C.tubo([-80, 3, z], R(150, -3, z), 7, 7, M.metal, { up: [0, 0, 1] });
    C.tubo([0, 3, z], R(4, -4, z), 6, 6, M.metal, { up: [0, 0, 1] });
  }
  C.tubo(R(150, -3, 8), R(150, -3, 72), 6, 6, M.metal);
  // plataforma dos pés, inclinada, com ranhuras
  const pa = norm([1, 0.26, 0]), pn = norm([-0.26, 1, 0]);
  const pc = [52, 16, 10];
  const ranh = (P) => {
    let d = '';
    for (let i = 0; i < 8; i++) {
      const u = -26 + i * 7.4;
      const a = P(add(add(pc, mul(pa, u)), mul(pn, 2.6))), b = P(add(add(add(pc, mul(pa, u)), mul(pn, 2.6)), [0, 0, 60]));
      d += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
    }
    return `<path d="${d}" stroke="#5A6068" stroke-width="0.5"/>`;
  };
  C.prisma(retArred(62, 5, 2), pc, pa, pn, [0, 0, 60], M.plataforma, { decalSempre: ranh, dz: 20 });
  C.tubo([52, 3, 40], [50, 13, 40], 6, 6, M.metal);
  // carrinho: encosto, apoios dos ombros, pegadores e pinos de anilha
  const sC = 54;
  C.prisma(retArred(70, 4, 1.5), R(sC + 35, 4, 12), ru, rn, [0, 0, 56], M.metal);
  C.estofado(R(sC + 32, 6, 40), ru, rn, [0, 0, 1], 60, 8, 40);
  for (const z of [26, 54]) {
    C.estofado(R(sC + 72, 7, z), mul(rn, 1), mul(ru, -1), [0, 0, 1], 18, 8, 11);
    const zz = z < 40 ? z - 16 : z + 16;
    C.tubo(R(sC + 52, 6, zz), R(sC + 48, 24, zz), 3, 3, M.metal);
    C.cilindro(R(sC + 48, 24, zz), R(sC + 48, 34, zz), 2, M.borracha, { lados: 10 });
  }
  for (const [z1, z2, zs] of [
    [12, -12, [-2, -6]],
    [68, 92, [82, 86]],
  ]) {
    C.cilindro(R(sC + 24, 5, z1), R(sC + 24, 5, z2), 2.6, M.cromo);
    for (const zz of zs) C.anilha(R(sC + 24, 5, zz), R(sC + 24, 5, zz + (z2 < 0 ? -3.6 : 3.6)), 21);
  }
  C.sombra(0, 40, 92, 48, 0.2);
  // pessoa: costas no encosto, ombros sob os apoios, pés na plataforma, no fundo do agachamento
  const pelve = R(sC + 10, 18, 40);
  pessoa(C, {
    pelve,
    cima: ru,
    frente: rn,
    cabeca: { cima: norm([-0.25, 1, 0]), frente: norm([1, 0.25, 0]) },
    pernas: {
      D: { tornozelo: [58, 26.5, 29], pe: pa, sola: pn, dica: [0.6, 1, -0.1] },
      E: { tornozelo: [58, 26.5, 51], pe: pa, sola: pn, dica: [0.6, 1, 0.1] },
    },
    bracos: {
      D: { pega: R(sC + 48, 30, 14), mao: [0, 0, 1], dica: [0.3, -1, -0.3] },
      E: { pega: R(sC + 48, 30, 66), mao: [0, 0, -1], dica: [0.3, -1, 0.3] },
    },
  });
  return C.svg();
}

// ---------- banco romano 45° ----------
function bancoRomano(id) {
  const C = cena(id, camera({ yaw: 18, pitch: 10, s: 0.6 }));
  const M = MAT;
  const bu = norm([1, 1, 0]);
  const bn = norm([-1, 1, 0]);
  const B0 = [10, 16, 0];
  const B = (s, k = 0, z = 35) => add(add(add(B0, mul(bu, s)), mul(bn, k)), [0, 0, z]);
  for (const z of [8, 62]) C.tubo([-12, 3, z], [104, 3, z], 6, 6, M.metal);
  for (const x of [-8, 100]) C.tubo([x, 3, 8], [x, 3, 62], 6, 6, M.metal);
  C.tubo([2, 3, 35], B(-2, 0), 7, 7, M.metal, { up: [0, 0, 1] });
  C.tubo(B(-6, 0), B(98, 0), 7.5, 7.5, M.metal, { up: [0, 0, 1] });
  C.tubo(B(78, 0), [98, 3, 35], 7, 7, M.metal, { up: [0, 0, 1] });
  C.furos([40, 46, 52, 58].map((sv) => add(B(sv, 0, 35), [0, 0, -3.9])), bu, bn, 0.9);
  // plataforma dos pés com ranhuras e rolos atrás dos tornozelos
  const ranh = (P) => {
    let d = '';
    for (let i = 0; i < 5; i++) {
      const k = 8 + i * 6;
      const a = P(B(2.3, k, 14)), b = P(B(2.3, k, 56));
      d += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
    }
    return `<path d="${d}" stroke="#5A6068" stroke-width="0.5"/>`;
  };
  C.prisma(retArred(4, 36, 1.5), B(0, 20, 13), bu, bn, [0, 0, 44], M.plataforma, { decalSempre: ranh, dz: 40 });
  C.tubo(B(14, 0), B(14, 32), 4.5, 4.5, M.metal, { up: [0, 0, 1] });
  C.cilindro(B(14, 32, 14), B(14, 32, 56), 1.4, M.cromo, { lados: 10 });
  for (const [z1, z2] of [
    [10, 30],
    [40, 60],
  ])
    C.cilindro(B(14, 32, z1), B(14, 32, z2), 5, M.estofado, { lados: 20 });
  // apoio do quadril no alto da viga, com regulagem
  C.tubo(B(76, 0), B(76, 7), 5, 5, M.metal, { up: [0, 0, 1] });
  C.estofado(B(76, 7, 35), bu, bn, [0, 0, 1], 34, 9, 44);
  C.sombra(46, 35, 70, 40, 0.2);
  // pessoa no alto do movimento: corpo reto na linha de 45°, braços cruzados no peito
  const pelve = B(90, 25, 35);
  const cima = bu;
  const frente = mul(bn, -1);
  const lado = [0, 0, -1];
  const P3 = (h, x, d) => add(add(add(pelve, mul(cima, h)), mul(lado, x)), mul(frente, d));
  pessoa(C, {
    pelve,
    cima,
    frente,
    cabeca: { cima: norm([0.55, 1, 0]), frente: norm([1, -0.55, 0]) },
    pernas: {
      D: { tornozelo: B(7.5, 25, 26), joelho: B(48, 25.5, 26), pe: bn, sola: bu },
      E: { tornozelo: B(7.5, 25, 44), joelho: B(48, 25.5, 44), pe: bn, sola: bu },
    },
    bracos: {
      D: { pega: P3(40, -9, 12), mao: [0, 0, 1], dica: frente },
      E: { pega: P3(36, 9, 13), mao: [0, 0, -1], dica: frente },
    },
  });
  return C.svg();
}

// ---------- graviton ----------
function graviton(id) {
  const C = cena(id, camera({ yaw: 24, pitch: 11, s: 0.5 }));
  const M = MAT;
  for (const z of [0, 80]) C.tubo([-12, 3, z], [112, 3, z], 6, 6, M.metal);
  for (const x of [-12, 108]) C.tubo([x, 3, 0], [x, 3, 80], 6, 6, M.metal);
  // torre da pilha (atrás) e colunas laterais
  for (const x of [-8, 22]) for (const z of [22, 58]) C.tubo([x, 3, z], [x, 200, z], 4.5, 4.5, M.metal);
  C.caixa([-11, 198, 19], [25, 204, 61], M.metal);
  for (const z of [32, 48]) C.cilindro([7, 6, z], [7, 192, z], 0.8, M.cromo, { lados: 8 });
  C.pilha([24.5, 6, 26], [0, 0, 1], [-1, 0, 0], 28, 74, 12, 12, { passo: 5 });
  for (const z of [0, 80]) {
    C.tubo([30, 3, z], [30, 236, z], 7, 7, M.metal);
    // barra fixa no alto: braço para a frente e pegadores inclinados
    C.tubo([30, 232, z], [74, 232, z], 6, 6, M.metal);
    C.tubo([74, 232, z], [80, 226, z < 40 ? z + 12 : z - 12], 4, 4, M.metal);
    C.cilindro([80, 226, z < 40 ? z + 12 : z - 12], [86, 214, z < 40 ? z + 16 : z - 16], 2.4, M.borracha, { lados: 10 });
    // paralelas (mergulho)
    C.tubo([30, 128, z], [70, 128, z < 40 ? z + 8 : z - 8], 5, 5, M.metal);
    C.cilindro([70, 128, z < 40 ? z + 8 : z - 8], [86, 128, z < 40 ? z + 8 : z - 8], 2.4, M.borracha, { lados: 10 });
    // degraus
    C.tubo([30, 52, z], [62, 52, z], 4, 4, M.metal);
    C.prisma(retArred(26, 3, 1), [76, 52, z < 40 ? 6 : 74], [1, 0, 0], [0, 1, 0], [0, 0, z < 40 ? -12 : 12].map((v) => v), M.plataforma);
  }
  C.tubo([30, 236, 0], [30, 236, 80], 6, 6, M.metal);
  // alavanca e apoio dos joelhos
  C.cilindro([30, 46, 24], [30, 46, 56], 3, M.cromo);
  C.tubo([30, 46, 40], [70, 80, 40], 6, 6, M.metal);
  C.estofado([82, 82, 40], [1, 0, 0], [0, 1, 0], [0, 0, 1], 48, 7, 38);
  C.sombra(50, 40, 80, 50, 0.2);
  // pessoa ajoelhada no apoio, de frente para o aparelho, mãos nos pegadores do alto
  pessoa(C, {
    pelve: [76, 132, 40],
    cima: norm([-0.06, 1, 0]),
    frente: [-1, 0, 0],
    pernas: {
      D: { joelho: [72, 94, 30], tornozelo: [112, 94, 31], pe: [0, -0.3, 0].map((v, i) => (i === 0 ? 1 : v)), sola: [0, 1, 0] },
      E: { joelho: [72, 94, 50], tornozelo: [112, 94, 49], pe: [1, -0.3, 0], sola: [0, 1, 0] },
    },
    bracos: {
      D: { pega: [83, 219, 14], mao: norm([0, 1, -0.3]), dica: [1, 0, -1] },
      E: { pega: [83, 219, 66], mao: norm([0, 1, 0.3]), dica: [1, 0, 1] },
    },
  });
  return C.svg();
}

export const ILUSTRACOES = {
  kettlebell,
  leg_press: legPress,
  estacao_polia_dupla: poliaDupla,
  banco_scott: bancoScott,
  cadeira_abdutora_adutora: abdutora,
  hack,
  banco_romano: bancoRomano,
  graviton,
};

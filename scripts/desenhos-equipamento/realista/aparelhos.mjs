// As 8 amostras na ilustração realista. Cada aparelho é uma função que monta a cena (medidas em cm) e devolve
// o conteúdo SVG para o viewBox 0 0 160 120. Para os 49 itens: uma função por item, com as mesmas peças.
import { MAT, V, camera, cena, f1, retArred } from '../../../src/engine/novo/realista/base.mjs';
import { pessoa, ALTURA_TORNOZELO as AT } from './pessoa.mjs';

const { add, sub, mul, norm } = V;
export const VIEWBOX = '0 0 160 120';

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
  <path d="${alca}" transform="translate(${f1(R * 0.07)} ${f1(-R * 0.06)})" fill="none" stroke="#141619" style="stroke-width:${f1(w)}" stroke-linecap="round"/>
  <path d="${alca}" fill="none" stroke="url(#${g}a)" style="stroke-width:${f1(w)}" stroke-linecap="round"/>
  <path d="${alca}" fill="none" stroke="#9AA1AA" style="stroke-width:${f1(w * 0.16)}" stroke-linecap="round" opacity="0.7" transform="translate(${f1(-w * 0.18)} ${f1(-w * 0.2)})"/>
  <path d="${corpo}" fill="url(#${g}c)" stroke="#0E0F11" stroke-width="0.5"/>
  <path d="M${f1(cx - hb * 0.92)} ${f1(base - 0.6)}H${f1(cx + hb * 0.92)}" stroke="#0E0F11" style="stroke-width:${f1(R * 0.09)}" stroke-linecap="round"/>
  <ellipse cx="${f1(cx - R * 0.42)}" cy="${f1(cy - R * 0.44)}" rx="${f1(R * 0.22)}" ry="${f1(R * 0.13)}" transform="rotate(-35 ${f1(cx - R * 0.42)} ${f1(cy - R * 0.44)})" fill="#FFFFFF" opacity="0.28"/>
  <rect x="${f1(cx - R * 0.36)}" y="${f1(cy + R * 0.02)}" width="${f1(R * 0.72)}" height="${f1(R * 0.36)}" rx="${f1(R * 0.08)}" fill="#3F3AA8" stroke="#211D66" stroke-width="0.4"/>
  <text x="${f1(cx)}" y="${f1(cy + R * 0.21)}" font-family="system-ui,sans-serif" font-weight="800" font-size="${f1(R * 0.26)}" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">${kg} kg</text>`;
}
function kettlebellSo(id) {
  const sombra = (cx, base, R) =>
    `<ellipse cx="${f1(cx + R * 0.15)}" cy="${f1(base + 0.6)}" rx="${f1(R * 1.05)}" ry="${f1(R * 0.16)}" fill="#1B1C1F" opacity="0.22" filter="url(#${id}-sb)"/>`;
  return `<defs><filter id="${id}-sb" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
  ${sombra(62, 104, 30)}${sombra(122, 104, 19)}
  ${kettlebellForma(id, 62, 104, 30, 16)}
  ${kettlebellForma(id, 122, 104, 19, 8)}`;
  // (o kettlebell é desenhado direto no viewBox)
}


// Cada cena recebe o = { pessoa: true | false }: sem a pessoa, o enquadramento automático aproxima o aparelho.
const comP = (o) => o.pessoa !== false;

// ---------- kettlebell com a pessoa (agachamento goblet: o kettlebell no peito, seguro pela alça) ----------
function kettlebellComPessoa(id) {
  const C = cena(id, camera({ yaw: 38, pitch: 8, s: 0.6 }));
  const pelve = [-12, 54, 40];
  const cima = norm([0.42, 1, 0]);
  const frente = norm([1, -0.42, 0]);
  const T = (h, d) => add(add(pelve, mul(cima, h)), mul(frente, d));
  const alca = T(33, 24);
  const R = 11 * C.s;
  const q = C.P(alca);
  const cy = q[1] + 1.72 * R;
  const base = cy + 0.86 * R;
  for (const p of [[-30, 0, 16], [26, 0, 64], add(alca, [0, -30, 0])]) C.P(p);
  const zKb = C.P(T(30, 14))[2] - 1;
  C.bruto(zKb, kettlebellForma(id, q[0], base, R, 16));
  C.sombra(-2, 40, 34, 30, 0.2);
  pessoa(C, {
    pelve,
    cima,
    frente,
    cabeca: { cima: norm([0.1, 1, 0]), frente: norm([1, -0.1, 0]) },
    pernas: {
      D: { tornozelo: [2, AT, 21], pe: norm([1, 0, -0.3]), dica: [1, 0.5, -0.45] },
      E: { tornozelo: [2, AT, 59], pe: norm([1, 0, 0.3]), dica: [1, 0.5, 0.45] },
    },
    bracos: {
      D: { pega: add(alca, [0, -1, -4.5]), mao: norm([0.2, 1, 0.5]), eixo: [0, 0, 1], dica: [0.2, -1, -0.2], zMao: zKb - 1 },
      E: { pega: add(alca, [0, -1, 4.5]), mao: norm([0.2, 1, -0.5]), eixo: [0, 0, 1], dica: [0.2, -1, 0.2], zMao: zKb - 1, polegar: 1 },
    },
  });
  return C.svg();
}
function kettlebell(id, o = {}) {
  return comP(o) ? kettlebellComPessoa(id) : kettlebellSo(id);
}

// ---------- leg press 45° ----------
function legPress(id, o = {}) {
  const C = cena(id, camera({ yaw: -30, pitch: 6, s: 0.6 }));
  const M = MAT;
  const zN = 6, zF = 74;
  for (const z of [zN, zF]) C.tubo([0, 3, z], [214, 3, z], 6, 6, M.metal);
  for (const x of [6, 118, 206]) C.tubo([x, 3, zN], [x, 3, zF], 5, 5, M.metal, { up: [0, 1, 0] });
  const ru = norm([1, 1, 0]);
  const rn = norm([-1, 1, 0]);
  const R0 = [118, 8, 0];
  const R = (s, k = 0, z = 0) => add(add(add(R0, mul(ru, s)), mul(rn, k)), [0, 0, z]);
  for (const z of [14, 66]) C.tubo(R(0, 0, z), R(138, 0, z), 7, 7, M.cromo, { up: [0, 0, 1] });
  for (const z of [zN + 4, zF - 4]) {
    C.tubo([216, 0, z], R(138, 0, z), 7, 7, M.metal, { up: [0, 0, 1] });
    C.tubo([176, 3, z], R(100, -4, z), 6, 6, M.metal, { up: [0, 0, 1] });
  }
  C.tubo(R(140, 0, 8), R(140, 0, 72), 6, 6, M.metal);
  // trava de segurança (alavancas dos dois lados do carrinho)
  const sC = 58;
  C.prisma(retArred(50, 5, 2), R(sC + 22, 6, 12), ru, rn, [0, 0, 56], M.metal);
  for (const z of [12, 63]) C.prisma(retArred(54, 16, 2), R(sC + 24, 10, z), ru, rn, [0, 0, 5], M.metalClaro);
  // plataforma dos pés com chapa antiderrapante (ranhuras em diagonal) e borda
  // a chapa fica 10° mais em pé que a perpendicular ao trilho, virada para quem senta
  const gira = (v, g) => [v[0] * Math.cos(g) - v[1] * Math.sin(g), v[0] * Math.sin(g) + v[1] * Math.cos(g), 0];
  const e1 = gira(ru, -0.175), e2 = gira(rn, -0.175);
  const pO = R(sC - 4, 0, 0);
  const pl = (k, z) => add(add(pO, mul(e2, k)), [0, 0, z]);
  const ranhuras = (P) => {
    let d = '';
    for (let i = 0; i < 12; i++) {
      const k = 6 + i * 5.4;
      for (let j = 0; j < 7; j++) {
        const z = 12 + j * 8.6 + (i % 2) * 4.3;
        const a = P(add(pl(k, z), mul(e1, -2.6))), b = P(add(pl(k + 2.2, z + 2.2), mul(e1, -2.6)));
        d += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
      }
    }
    return `<path d="${d}" stroke="#5E646C" stroke-width="0.45" stroke-linecap="round"/>`;
  };
  C.prisma(retArred(5, 72, 2), pl(36, 4), e1, e2, [0, 0, 72], M.plataforma, { decalSempre: ranhuras, dz: 30 });
  for (const [z1, z2, zs] of [
    [8, -16, [-6, -10.5]],
    [72, 96, [82, 86.5]],
  ]) {
    C.cilindro(R(sC + 38, 12, z1), R(sC + 38, 12, z2), 2.6, M.cromo);
    for (const zz of zs) C.anilha(R(sC + 38, 12, zz), R(sC + 38, 12, zz + (z2 < 0 ? -3.6 : 3.6)), 22);
  }
  C.tubo([62, 3, 40], [70, 40, 40], 7, 7, M.metal, { up: [0, 0, 1] });
  C.tubo([20, 3, 40], [34, 60, 40], 6, 6, M.metal, { up: [0, 0, 1] });
  const seatDir = norm([1, 0.18, 0]);
  const seatN = norm([-0.18, 1, 0]);
  C.estofado([76, 41, 40], seatDir, seatN, [0, 0, 1], 44, 10, 50);
  const backDir = norm([-0.58, 0.81, 0]);
  const backN = norm([0.81, 0.58, 0]);
  C.estofado([36, 70, 40], backDir, backN, [0, 0, 1], 66, 10, 50);
  for (const z of [10, 70]) {
    C.tubo([84, 30, z + (z < 40 ? 6 : -6)], [92, 48, z], 3.2, 3.2, M.metal);
    C.cilindro([92, 48, z], [106, 53.6, z], 2.2, M.borracha);
  }
  C.sombra(110, 40, 118, 52);
  if (comP(o)) {
    const solaN = mul(e1, -1);
    const pePl = e2;
    const tornozelo = (z) => add(pl(22, z), mul(solaN, AT + 0.6));
    pessoa(C, {
      pelve: add([74, 57, 40], mul(backN, 0.6)),
      cima: backDir,
      frente: backN,
      cabeca: { cima: norm([-0.35, 1, 0]), frente: norm([1, 0.35, 0]) },
      pernas: {
        D: { tornozelo: tornozelo(29), pe: pePl, sola: solaN, dica: [-0.3, 1, -0.1] },
        E: { tornozelo: tornozelo(51), pe: pePl, sola: solaN, dica: [-0.3, 1, 0.1] },
      },
      bracos: {
        D: { pega: [100, 51.2, 10], eixo: norm([1, 0.4, 0]), mao: [0, -1, 0], dica: [0, -1, -0.5] },
        E: { pega: [100, 51.2, 70], eixo: norm([1, 0.4, 0]), mao: [0, -1, 0], dica: [0, -1, 0.5] },
      },
    });
  }
  return C.svg();
}

// ---------- torre de polia (usada na polia dupla) ----------
function torrePolia(C, x0, lado, alturaPolia) {
  const M = MAT;
  const X = (dx) => x0 + lado * dx;
  const xs = [X(0), X(42)];
  for (const x of xs) for (const z of [0, 34]) C.tubo([x, 0, z], [x, 222, z], 5, 5, M.metal);
  for (const z of [0, 34]) C.tubo([xs[0], 222, z], [xs[1], 222, z], 5, 5, M.metal);
  for (const x of xs) C.tubo([x, 222, 0], [x, 222, 34], 5, 5, M.metal);
  C.caixa([Math.min(...xs) - 3, 0, -3], [Math.max(...xs) + 3, 4, 37], M.metal);
  const xa = Math.min(X(9), X(33));
  for (const dx of [12, 30]) C.cilindro([X(dx), 4, 20], [X(dx), 205, 20], 0.9, M.cromo, { lados: 10 });
  C.pilha([xa, 4, 13], [1, 0, 0], [0, 0, 1], 24, 72, 12, 12, { passo: 5 });
  C.caixa([xa + 2, 76.5, 15], [xa + 22, 80, 23], M.cromo);
  C.cilindro([X(21), 80, 19], [X(21), 205, 19], 0.8, M.cromo, { lados: 8 });
  C.cilindro([X(21), 208, 12], [X(21), 208, 26], 4.5, M.metalClaro, { lados: 18 });
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

function poliaDupla(id, o = {}) {
  const C = cena(id, camera({ yaw: 16, pitch: 9, s: 0.5 }));
  const M = MAT;
  const pE = torrePolia(C, 0, 1, 150);
  const pD = torrePolia(C, 300, -1, 150);
  for (const z of [0, 34]) C.tubo([42, 222, z], [258, 222, z], 5, 5, M.metal);
  C.tubo([110, 214, -6], [190, 214, -6], 3.4, 3.4, M.cromo);
  for (const x of [110, 190]) C.tubo([x, 214, -6], [x, 222, 0], 3, 3, M.metal);
  C.sombra(150, 18, 165, 40, 0.18);
  // pegadores em D: com a pessoa, nas mãos; sem ela, pendurados junto da polia
  const gD = comP(o) ? [131, 108, -24] : [pE[0] + 6, 112, -2];
  const gE = comP(o) ? [169, 108, -24] : [pD[0] - 6, 112, -2];
  for (const [p, g] of [
    [pE, gD],
    [pD, gE],
  ]) {
    C.linha(p, add(g, [0, 4.5, 0]), '#1D2024', 0.55, { dz: -60 });
    C.cilindro(add(g, [0, -4.2, 0]), add(g, [0, 4.2, 0]), 1.5, M.borracha, { lados: 10, dz: comP(o) ? 2 : -1 });
    C.polilinha([add(g, [0, 4.2, 0]), add(g, [0, 6, 0]), add(g, [0, 4.2, 0])], '#2A2E33', 0.6, { dz: -1 });
  }
  if (comP(o)) {
    pessoa(C, {
      pelve: [150, 95.5, 12],
      cima: [0, 1, 0.06],
      frente: [0, 0, -1],
      pernas: {
        D: { tornozelo: [138, AT, 2], pe: norm([-0.15, 0, -1]), dica: [0, 0.2, -1] },
        E: { tornozelo: [162, AT, 22], pe: norm([0.15, 0, -1]), dica: [0, 0.2, -1] },
      },
      bracos: {
        D: { pega: gD, eixo: [0, 1, 0], mao: norm([0.55, 0, -1]), dica: [-1, 0.2, 0.3] },
        E: { pega: gE, eixo: [0, 1, 0], mao: norm([-0.55, 0, -1]), dica: [1, 0.2, 0.3], polegar: 1 },
      },
    });
  }
  return C.svg();
}

// ---------- banco Scott ----------
function bancoScott(id, o = {}) {
  const C = cena(id, camera({ yaw: 36, pitch: 12, s: 0.6 }));
  const M = MAT;
  C.tubo([2, 3, 30], [96, 3, 30], 6, 6, M.metal);
  for (const x of [6, 90]) C.tubo([x, 3, 4], [x, 3, 56], 6, 6, M.metal);
  for (const z of [4, 56]) for (const x of [6, 90]) C.cilindro([x, 0, z], [x, 1.2, z], 3.4, M.borracha, { lados: 12 });
  C.tubo([20, 6, 30], [20, 36, 30], 6.5, 6.5, M.metal);
  C.tubo([20, 36, 30], [20, 50, 30], 5, 5, M.cromo);
  C.furos([[20, 42, 27.4], [20, 47, 27.4]], [1, 0, 0], [0, 1, 0], 0.8);
  C.cilindro([20, 33, 26.6], [20, 33, 22], 1.2, M.borracha, { lados: 10 });
  C.estofado([20, 51, 30], [1, 0, 0], [0, 1, 0], [0, 0, 1], 34, 8, 34);
  const pa = norm([0.78, -0.62, 0]);
  const pn = norm([0.62, 0.78, 0]);
  C.tubo([58, 6, 30], [52, 77, 30], 7, 7, M.metal);
  C.tubo([52, 77, 30], [44, 92, 30], 5, 5, M.metal);
  C.estofado([46, 83, 30], pa, pn, [0, 0, 1], 46, 8, 50);
  for (const z of [6, 54]) {
    C.tubo([62, 6, z], [70, 66, z], 4, 4, M.metal);
    C.tubo([70, 66, z], [74, 70, z], 3, 3, M.metal);
  }
  C.tubo([62, 6, 6], [62, 6, 54], 4, 4, M.metal);
  C.sombra(50, 30, 58, 36, 0.2);
  // barra W (EZ): pontas retas, pegadas inclinadas e o meio reto; anilhas e presilhas
  const bx = comP(o) ? 79 : 73, by = comP(o) ? 71 : 71.5;
  const W = [
    [-24, 0],
    [-6, 0],
    [3, -2.8],
    [12, 1.8],
    [20, -1.0],
    [40, -1.0],
    [48, 1.8],
    [57, -2.8],
    [66, 0],
    [84, 0],
  ].map(([z, dx]) => [bx + dx, by, z]);
  for (let i = 0; i < W.length - 1; i++) C.cilindro(W[i], W[i + 1], i === 0 || i === W.length - 2 ? 1.6 : 1.25, M.cromo, { lados: 10 });
  for (const [z1, z2, r] of [
    [-12, -15.5, 11],
    [-16, -19, 8.5],
    [72, 75.5, 11],
    [76, 79, 8.5],
  ])
    C.anilha([bx, by, z1], [bx, by, z2], r);
  for (const z of [-10.5, 70.5]) C.cilindro([bx, by, z], [bx, by, z + (z < 0 ? -1.5 : 1.5)], 2.6, M.cromo, { lados: 12 });
  if (comP(o)) {
    const g1 = V.lerp(W[2], W[3], 0.5), g2 = V.lerp(W[6], W[7], 0.5);
    pessoa(C, {
      pelve: [21, 63.5, 30],
      cima: norm([0.26, 1, 0]),
      frente: [1, 0, 0],
      cabeca: { cima: norm([0.2, 1, 0]), frente: norm([1, -0.3, 0]) },
      pernas: {
        D: { tornozelo: [46, AT, 20], pe: [1, 0, 0], dica: [1, 0.3, 0] },
        E: { tornozelo: [46, AT, 40], pe: [1, 0, 0], dica: [1, 0.3, 0] },
      },
      bracos: {
        D: { pega: g1, eixo: norm(sub(W[3], W[2])), mao: norm([0.55, -0.83, 0]), dica: [0, 1, -0.2], curva: -1 },
        E: { pega: g2, eixo: norm(sub(W[7], W[6])), mao: norm([0.55, -0.83, 0]), dica: [0, 1, 0.2], curva: -1, polegar: 1 },
      },
    });
  }
  return C.svg();
}

// ---------- cadeira abdutora e adutora ----------
function abdutora(id, o = {}) {
  const C = cena(id, camera({ yaw: 28, pitch: 12, s: 0.6 }));
  const M = MAT;
  for (const x of [-26, 26]) C.tubo([x, 3, -46], [x, 3, 66], 6, 6, M.metal);
  C.tubo([-26, 3, 66], [80, 3, 66], 6, 6, M.metal);
  C.tubo([-26, 3, -46], [26, 3, -46], 6, 6, M.metal);
  for (const x of [48, 78]) for (const z of [52, 72]) C.tubo([x, 3, z], [x, 168, z], 4.5, 4.5, M.metal);
  for (const z of [52, 72]) C.tubo([48, 168, z], [78, 168, z], 4.5, 4.5, M.metal);
  C.caixa([46, 165, 50], [80, 171, 74], M.metalClaro);
  for (const x of [54, 72]) C.cilindro([x, 6, 62], [x, 160, 62], 0.8, M.cromo, { lados: 8 });
  C.pilha([51, 6, 56], [1, 0, 0], [0, 0, 1], 24, 66, 11, 11, { passo: 5 });
  C.cilindro([63, 72, 62], [63, 150, 62], 0.8, M.cromo, { lados: 8 });
  C.cilindro([63, 160, 56], [63, 160, 68], 4, M.metalClaro, { lados: 16 });
  C.tubo([0, 6, 22], [0, 38, 8], 8, 8, M.metal);
  C.tubo([0, 6, 40], [0, 64, 34], 7, 7, M.metal);
  C.estofado([0, 40, 4], [0, 0, 1], [0, 1, 0], [1, 0, 0], 42, 9, 46);
  const bA = norm([0, 1, 0.22]);
  const bN = norm([0, 0.22, -1]);
  C.estofado([0, 82, 36], bA, bN, [1, 0, 0], 66, 9, 44);
  for (const sx of [-1, 1]) {
    C.tubo([sx * 12, 36, -14], [sx * 39, 46, -26], 4.5, 4.5, M.metal);
    C.estofado([sx * 40, 52, -27], [0, 1, 0], [-sx, 0, 0.2], [0, 0, 1], 24, 7, 17);
    C.tubo([sx * 10, 14, -20], [sx * 34, 14, -40], 4, 4, M.metal);
    C.prisma(retArred(18, 3, 1), [sx * 32, 13, -40], [0, 0, 1], [0, 1, 0], [sx * 14, 0, 0], M.plataforma);
    C.tubo([sx * 25, 40, -2], [sx * 30, 52, 2], 3, 3, M.metal);
    C.cilindro([sx * 30, 52, -7], [sx * 30, 52, 10], 2.1, M.borracha, { lados: 12 });
  }
  C.sombra(15, 10, 72, 62, 0.2);
  if (comP(o)) {
    pessoa(C, {
      pelve: [0, 56, 10],
      cima: norm([0, 1, 0.2]),
      frente: [0, 0, -1],
      pernas: {
        D: { joelho: [-29, 53, -28], tornozelo: [-38, 13 + 1.6 + AT, -38], pe: norm([-0.2, 0, -1]) },
        E: { joelho: [29, 53, -28], tornozelo: [38, 13 + 1.6 + AT, -38], pe: norm([0.2, 0, -1]) },
      },
      bracos: {
        D: { pega: [-30, 52, 1], eixo: [0, 0, 1], mao: norm([-0.3, -1, 0]), dica: [-1, -0.2, 0.3] },
        E: { pega: [30, 52, 1], eixo: [0, 0, 1], mao: norm([0.3, -1, 0]), dica: [1, -0.2, 0.3], polegar: 1 },
      },
    });
  }
  return C.svg();
}

// ---------- hack ----------
function hack(id, o = {}) {
  const C = cena(id, camera({ yaw: 9, pitch: 9, s: 0.6 }));
  const M = MAT;
  const ru = norm([-0.68, 0.73, 0]);
  const rn = norm([0.73, 0.68, 0]);
  const R0 = [40, 14, 0];
  const R = (s, k = 0, z = 0) => add(add(add(R0, mul(ru, s)), mul(rn, k)), [0, 0, z]);
  // plataforma inclinada; o tornozelo fica a AT da chapa
  const pa = norm([1, 0.26, 0]), pn = norm([-0.26, 1, 0]);
  const pc = [52, 16, 10];
  const tornozelo = (z) => add(add([58, 0, z], mul(pn, 0)), [0, 16 + 2.6 + 0.26 * 6 + AT, 0]);
  // posição da pelve no encosto: joelho a ~120° (agachamento, não sentado)
  let sP = 40;
  for (let s = 20; s < 140; s += 0.5) if (V.len(sub(R(s, 18, 40), tornozelo(40))) <= 68) sP = s;
  for (const z of [6, 74]) C.tubo([-86, 3, z], [86, 3, z], 6, 6, M.metal);
  for (const x of [-82, 0, 82]) C.tubo([x, 3, 6], [x, 3, 74], 5, 5, M.metal);
  const topo = Math.max(150, sP + 70);
  for (const z of [16, 64]) C.tubo(R(0, 0, z), R(topo, 0, z), 6.5, 6.5, M.cromo, { up: [0, 0, 1] });
  for (const z of [10, 70]) {
    C.tubo([R(topo, -3)[0], 3, z], R(topo, -3, z), 7, 7, M.metal, { up: [0, 0, 1] });
    C.tubo([0, 3, z], R(4, -4, z), 6, 6, M.metal, { up: [0, 0, 1] });
  }
  C.tubo(R(topo, -3, 8), R(topo, -3, 72), 6, 6, M.metal);
  const ranh = (P) => {
    let d = '';
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 6; j++) {
        const uu = -27 + i * 6.6, z = 4 + j * 9.6 + (i % 2) * 4.8;
        const a = P(add(add(add(pc, mul(pa, uu)), mul(pn, 2.6)), [0, 0, z])), b = P(add(add(add(pc, mul(pa, uu + 2.4)), mul(pn, 2.6)), [0, 0, z + 2.4]));
        d += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
      }
    return `<path d="${d}" stroke="#5E646C" stroke-width="0.45" stroke-linecap="round"/>`;
  };
  C.prisma(retArred(64, 5, 2), pc, pa, pn, [0, 0, 60], M.plataforma, { decalSempre: ranh, dz: 20 });
  C.tubo([52, 3, 40], [50, 13, 40], 6, 6, M.metal);
  // carrinho preso à pessoa: encosto nas costas, apoios sobre os ombros, pegadores ao lado
  C.prisma(retArred(70, 4, 1.5), R(sP + 25, 4, 12), ru, rn, [0, 0, 56], M.metal);
  C.estofado(R(sP + 22, 6, 40), ru, rn, [0, 0, 1], 62, 8, 40);
  for (const z of [26.5, 53.5]) {
    C.estofado(R(sP + 52.5, 7, z), rn, mul(ru, -1), [0, 0, 1], 18, 7, 11);
    C.tubo(R(sP + 58, 4, z), R(sP + 58, 12, z), 4, 4, M.metal);
  }
  for (const z of [8, 72]) {
    C.tubo(R(sP + 50, 4, z), R(sP + 46, 24, z), 3, 3, M.metal);
    C.cilindro(R(sP + 46, 22, z), R(sP + 46, 35, z), 2, M.borracha, { lados: 10 });
  }
  for (const [z1, z2, zs] of [
    [12, -12, [-2, -6]],
    [68, 92, [82, 86]],
  ]) {
    C.cilindro(R(sP - 6, 5, z1), R(sP - 6, 5, z2), 2.6, M.cromo);
    for (const zz of zs) C.anilha(R(sP - 6, 5, zz), R(sP - 6, 5, zz + (z2 < 0 ? -3.2 : 3.2)), 16);
  }
  C.sombra(0, 40, 92, 48, 0.2);
  if (comP(o)) {
    pessoa(C, {
      pelve: R(sP, 18, 40),
      cima: ru,
      frente: rn,
      cabeca: { cima: norm([-0.3, 1, 0]), frente: norm([1, 0.3, 0]) },
      pernas: {
        D: { tornozelo: tornozelo(30), pe: pa, sola: pn, dica: [1, 0.4, -0.15] },
        E: { tornozelo: tornozelo(50), pe: pa, sola: pn, dica: [1, 0.4, 0.15] },
      },
      bracos: {
        D: { pega: R(sP + 46, 29, 8), eixo: rn, mao: ru, dica: [0.4, -1, -0.5] },
        E: { pega: R(sP + 46, 29, 72), eixo: rn, mao: ru, dica: [0.4, -1, 0.5], polegar: 1 },
      },
    });
  }
  return C.svg();
}

// ---------- banco romano 45° (hiperextensão), com o apoio duplo e redondo do estilo GHD ----------
function bancoRomano(id, o = {}) {
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
  const ranh = (P) => {
    let d = '';
    for (let i = 0; i < 6; i++) {
      const k = 6 + i * 5.6;
      const a = P(B(2.3, k, 14)), b = P(B(2.3, k, 56));
      d += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
    }
    return `<path d="${d}" stroke="#5E646C" stroke-width="0.45"/>`;
  };
  C.prisma(retArred(4, 38, 1.5), B(0, 21, 13), bu, bn, [0, 0, 44], M.plataforma, { decalSempre: ranh, dz: 40 });
  C.tubo(B(15, 0), B(15, 33), 4.5, 4.5, M.metal, { up: [0, 0, 1] });
  C.cilindro(B(15, 33, 12), B(15, 33, 58), 1.4, M.cromo, { lados: 10 });
  for (const [z1, z2] of [
    [10, 31],
    [39, 60],
  ])
    C.cilindro(B(15, 33, z1), B(15, 33, z2), 5, M.estofado, { lados: 22 });
  // apoio do quadril: duas almofadas redondas lado a lado, numa base que regula
  C.tubo(B(76, 0), B(76, 7), 5, 5, M.metal, { up: [0, 0, 1] });
  C.prisma(retArred(34, 3, 1), B(76, 6.5, 16), bu, bn, [0, 0, 38], M.metal);
  for (const z0 of [14, 36.5])
    C.prisma(retArred(36, 12, 6, 6), B(76, 14, z0), bu, bn, [0, 0, 19.5], M.estofado, {
      decal: {
        0: (P) => `<path d="M${[B(62, 14, z0), B(90, 14, z0)].map((p) => P(p)).map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L')}" stroke="${M.estofado[0]}" stroke-width="0.35" stroke-dasharray="1 0.8"/>`,
      },
    });
  C.sombra(46, 35, 70, 40, 0.2);
  if (comP(o)) {
    const pelve = B(90, 27.5, 35);
    const cima = bu;
    const frente = mul(bn, -1);
    const lado = [0, 0, -1];
    const P3 = (h, x, d) => add(add(add(pelve, mul(cima, h)), mul(lado, x)), mul(frente, d));
    pessoa(C, {
      pelve,
      cima,
      frente,
      cabeca: { cima: norm([0.6, 1, 0]), frente: norm([1, -0.6, 0]) },
      pernas: {
        D: { tornozelo: B(2 + AT, 27, 26), joelho: B(47, 27.6, 26), pe: bn, sola: bu },
        E: { tornozelo: B(2 + AT, 27, 44), joelho: B(47, 27.6, 44), pe: bn, sola: bu },
      },
      bracos: {
        D: { pega: P3(41, -10, 13), mao: [0, 0, 1], eixo: cima, dica: frente },
        E: { pega: P3(37, 10, 14), mao: [0, 0, -1], eixo: cima, dica: frente },
      },
    });
  }
  return C.svg();
}

// ---------- graviton ----------
function graviton(id, o = {}) {
  const C = cena(id, camera({ yaw: 26, pitch: 10, s: 0.5 }));
  const M = MAT;
  for (const z of [0, 80]) C.tubo([-12, 3, z], [112, 3, z], 6, 6, M.metal);
  for (const x of [-12, 108]) C.tubo([x, 3, 0], [x, 3, 80], 6, 6, M.metal);
  // torre de trás com a pilha (frente da pilha virada para quem usa)
  for (const x of [-8, 22]) for (const z of [22, 58]) C.tubo([x, 3, z], [x, 200, z], 4.5, 4.5, M.metal);
  C.caixa([-11, 198, 19], [25, 204, 61], M.metal);
  for (const z of [32, 48]) C.cilindro([7, 40, z], [7, 192, z], 0.8, M.cromo, { lados: 8 });
  C.caixa([-6, 36, 24], [20, 40, 56], M.metal);
  C.pilha([24.5, 40, 26], [0, 0, 1], [-1, 0, 0], 28, 74, 12, 12, { passo: 5 });
  for (const z of [0, 80]) {
    const zi = z < 40 ? 1 : -1;
    C.tubo([30, 3, z], [30, 236, z], 7, 7, M.metal);
    C.tubo([30, 232, z], [74, 232, z], 6, 6, M.metal);
    C.tubo([74, 232, z], [80, 226, z + zi * 12], 4, 4, M.metal);
    C.cilindro([80, 226, z + zi * 12], [86, 214, z + zi * 16], 2.4, M.borracha, { lados: 10 });
    C.tubo([30, 128, z], [70, 128, z + zi * 8], 5, 5, M.metal);
    C.cilindro([70, 128, z + zi * 8], [86, 128, z + zi * 8], 2.4, M.borracha, { lados: 10 });
    // degrau preso à coluna por um braço, com chapa antiderrapante
    C.tubo([30, 60, z], [84, 60, z], 4.5, 4.5, M.metal);
    C.tubo([84, 60, z], [84, 60, z + zi * 14], 4, 4, M.metal);
    C.prisma(retArred(28, 3, 1), [72, 63, z + zi * 2], [1, 0, 0], [0, 1, 0], [0, 0, zi * 16], M.plataforma);
  }
  C.tubo([30, 236, 0], [30, 236, 80], 6, 6, M.metal);
  C.cilindro([30, 46, 24], [30, 46, 56], 3, M.cromo);
  C.tubo([30, 46, 40], [70, 80, 40], 6, 6, M.metal);
  C.estofado([82, 82, 40], [1, 0, 0], [0, 1, 0], [0, 0, 1], 48, 7, 38);
  C.sombra(50, 40, 80, 50, 0.2);
  if (comP(o)) {
    pessoa(C, {
      pelve: [77, 134, 40],
      cima: norm([-0.06, 1, 0]),
      frente: [-1, 0, 0],
      pernas: {
        D: { joelho: [72, 94, 31], tornozelo: [112, 93, 32], pe: norm([1, -0.12, 0]), sola: [0, -1, 0] },
        E: { joelho: [72, 94, 49], tornozelo: [112, 93, 48], pe: norm([1, -0.12, 0]), sola: [0, -1, 0] },
      },
      bracos: {
        D: { pega: [83, 220, 14], eixo: norm([6, -12, 4]), mao: norm([-0.2, 0.2, -1]), dica: [1, 0, -1] },
        E: { pega: [83, 220, 66], eixo: norm([6, -12, -4]), mao: norm([-0.2, 0.2, 1]), dica: [1, 0, 1], polegar: 1 },
      },
    });
    // enquadra a pessoa e a parte de cima do aparelho (o pé da máquina sai do quadro)
    return C.svg({ foco: [[-12, 56, 0], [-12, 56, 80], [118, 56, 0], [118, 56, 80], [30, 240, 0], [86, 240, 80]] });
  }
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

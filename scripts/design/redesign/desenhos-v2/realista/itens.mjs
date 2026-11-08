// Os 49 equipamentos, só o aparelho (escolha do Gustavo: o vídeo do guia mostra como usar). Mesmo estilo da 3ª
// rodada: vista 3/4, volume, tons por material, sombra macia, traço de espessura igual em todos. Os 7 aparelhos
// das amostras vêm de aparelhos.mjs (sem a pessoa); o kettlebell é o desenho 2D de lá.
// Medidas em cm, aproximadas de aparelhos reais (escolha de desenho, não especificação de fabricante).
import { MAT, V, camera, cena, f1, retArred, circulo } from './base.mjs';
import { ILUSTRACOES } from './aparelhos.mjs';

const { add, sub, mul, norm } = V;
const M = {
  ...MAT,
  tecido: ['#25282D', '#3E434A', '#686E77', '#121417'],
  madeira: ['#8E867A', '#B6AEA2', '#DCD6CC', '#5F584F'],
  acao: MAT.estofado,
};
const X = [1, 0, 0], Y = [0, 1, 0], Z = [0, 0, 1];

// ---------- peças comuns ----------
const tubo = (C, a, b, w = 5, m = M.metal, o) => C.tubo(a, b, w, w, m, o);
const cil = (C, a, b, r, m = M.cromo, o = {}) => C.cilindro(a, b, r, m, { lados: o.lados ?? 14, ...o });
const pega = (C, a, b, r = 2.1) => C.cilindro(a, b, r, M.borracha, { lados: 12 });
const rolo = (C, c, eixo, comp, r = 5) => C.cilindro(sub(c, mul(eixo, comp / 2)), add(c, mul(eixo, comp / 2)), r, M.estofado, { lados: 18 });
const disco = (C, c, eixo, r, esp = 3.4, m = M.anilha) => C.anilha(sub(c, mul(eixo, esp / 2)), add(c, mul(eixo, esp / 2)), r, m);
// estofado pelo centro: c = centro do volume, ao = comprimento, nrm = espessura (para "cima" do estofado), largura no 3º eixo
function almofada(C, c, ao, nrm, comp, esp, larg) {
  const a = norm(ao), n = norm(nrm), l = norm(V.cross(a, n));
  C.estofado(add(add(c, mul(n, -esp / 2)), mul(l, 0)), a, n, l, comp, esp, larg);
}
// moldura retangular no chão
function base(C, x0, x1, z0, z1, w = 6) {
  for (const z of [z0, z1]) tubo(C, [x0, 3, z], [x1, 3, z], w);
  for (const x of [x0, x1]) tubo(C, [x, 3, z0], [x, 3, z1], w);
}
// torre de placas: o = canto da frente, embaixo, à esquerda; eL = largura; eT = da frente para o fundo
function torre(C, o, eL, eT, w, d, h, n = 10) {
  const Pt = (a, b, y) => add(add(add(o, mul(eL, a)), mul(eT, b)), [0, y, 0]);
  for (const [a, b] of [
    [0, 0],
    [w, 0],
    [0, d],
    [w, d],
  ])
    tubo(C, Pt(a, b, 0), Pt(a, b, h), 4.5);
  for (const b of [0, d]) tubo(C, Pt(0, b, h), Pt(w, b, h), 4.5);
  for (const a of [0, w]) tubo(C, Pt(a, 0, h), Pt(a, d, h), 4.5);
  C.prisma(retArred(w + 6, d + 6, 1), Pt(w / 2, d / 2, 0), eL, eT, [0, 4, 0], M.metal);
  for (const a of [w * 0.26, w * 0.74]) cil(C, Pt(a, d * 0.5, 4), Pt(a, d * 0.5, h - 8), 0.8, M.cromo, { lados: 8 });
  const hs = Math.min(h * 0.42, 78);
  C.pilha(Pt(w * 0.14, d * 0.3, 4), eL, eT, w * 0.72, hs, d * 0.4, n);
  cil(C, Pt(w / 2, d * 0.5, 4 + hs), Pt(w / 2, d * 0.5, h - 10), 0.8, M.cromo, { lados: 8 });
  C.cilindro(Pt(w / 2, d * 0.18, h - 9), Pt(w / 2, d * 0.82, h - 9), 4.5, M.metalClaro, { lados: 16 });
  return Pt;
}
// pino de anilhas com 2 anilhas
function chifre(C, a, eixo, comp = 22, r = [20, 16]) {
  const e = norm(eixo);
  cil(C, a, add(a, mul(e, comp)), 2.6, M.cromo);
  r.forEach((rr, i) => disco(C, add(a, mul(e, 6 + i * 4.2)), e, rr, 3.6));
}
// mosquetão (oval de aço) e destorcedor no alto dos acessórios de polia
function mosquetao(C, topo) {
  const pts = Array.from({ length: 14 }, (_, i) => {
    const t = (2 * Math.PI * i) / 14;
    return add(topo, [3.2 * Math.cos(t), 6 + 5.2 * Math.sin(t), 0]);
  });
  for (let i = 0; i < pts.length; i++) cil(C, pts[i], pts[(i + 1) % pts.length], 0.75, M.cromo, { lados: 8, contorno: false });
  cil(C, add(topo, [0, -4, 0]), add(topo, [0, 1, 0]), 1.6, M.cromo, { lados: 12 });
}
// foco: pontos 3D que precisam caber (o resto pode sair do quadro)
const quadro = (fn, cam, foco = null) => (id) => {
  const C = cena(id, camera(cam));
  fn(C);
  return C.svg(foco ? { foco } : {});
};

// ================= halteres e anilhas =================
const halteres_fixos = quadro(
  (C) => {
    // suporte de 2 andares com 8 halteres sextavados (cabeças viradas para a frente)
    for (const x of [0, 128]) {
      tubo(C, [x, 2, 0], [x, 2, 52], 5);
      tubo(C, [x, 4, 10], [x, 48, 14], 5);
      tubo(C, [x, 4, 42], [x, 72, 38], 5);
      tubo(C, [x, 48, 14], [x, 72, 38], 4);
    }
    for (const [y, z] of [
      [46, 6],
      [48, 22],
      [70, 30],
      [72, 46],
    ])
      tubo(C, [0, y, z], [128, y, z], 4);
    const halter = (x, y, z0, r) => {
      const hl = 13, hc = r * 0.9;
      C.cilindro([x, y + r, z0], [x, y + r, z0 + hc], r, M.ferro, { lados: 6 });
      cil(C, [x, y + r, z0 + hc], [x, y + r, z0 + hc + hl], 1.7, M.cromo, { lados: 10 });
      C.cilindro([x, y + r, z0 + hc + hl], [x, y + r, z0 + 2 * hc + hl], r, M.ferro, { lados: 6 });
    };
    [6, 6.8, 7.6, 8.4].forEach((r, i) => halter(16 + i * 32, 48, 1, r));
    [8.8, 9.4, 10, 10.6].forEach((r, i) => halter(16 + i * 32, 72, 24, r));
    C.sombra(64, 26, 80, 34, 0.2);
  },
  { yaw: 24, pitch: 16, s: 0.6 },
);

const anilhas_e_manoplas = quadro(
  (C) => {
    // pilha de anilhas deitadas
    [
      [16, 3.2],
      [13, 3],
      [10.5, 2.8],
      [8.5, 2.6],
    ].reduce((y, [r, e]) => {
      C.anilha([0, y, 0], [0, y + e, 0], r, M.anilha);
      return y + e + 0.3;
    }, 0);
    // halter montado: manopla, 2 anilhas de cada lado e as presilhas de rosca
    const zc = 18, y = 10;
    cil(C, [34, y, zc - 22], [34, y, zc + 22], 1.4, M.cromo, { lados: 10 });
    pega(C, [34, y, zc - 6], [34, y, zc + 6], 1.9);
    for (const s of [-1, 1]) {
      disco(C, [34, y, zc + s * 10], Z, 10, 2.6);
      disco(C, [34, y, zc + s * 13.2], Z, 8, 2.4);
      cil(C, [34, y, zc + s * 15], [34, y, zc + s * 17.5], 2.4, M.cromo, { lados: 10 });
    }
    // manopla avulsa
    cil(C, [14, 1.6, 26], [52, 1.6, 40], 1.4, M.cromo, { lados: 10 });
    pega(C, [27, 1.6, 30.8], [39, 1.6, 35.2], 1.9);
    C.sombra(22, 16, 30, 26, 0.18);
  },
  { yaw: 30, pitch: 26, s: 0.6 },
);

function kettlebell(id) {
  return ILUSTRACOES.kettlebell(id, { pessoa: false });
}

// caneleiras: duas faixas acolchoadas com bolsos de peso, a ponta de velcro na cor de ação e a argola em D
function caneleiras(id) {
  const faixa = (x, y, comp, alt, ang, sufixo) => {
    const bolsos = Array.from({ length: 4 }, (_, i) => {
      const xx = x + 8 + ((comp - 16) * (i + 1)) / 5;
      return `M${f1(xx)} ${f1(y + 3)}V${f1(y + alt - 3)}`;
    }).join('');
    return `<g transform="rotate(${ang} ${x} ${y + alt / 2})">
<rect x="${x + comp - 4}" y="${f1(y + alt * 0.22)}" width="34" height="${f1(alt * 0.56)}" rx="2" fill="url(#${id}-v)" stroke="#16124A" stroke-width="0.55"/>
<path d="M${x + comp + 8} ${f1(y + alt * 0.3)}h20" stroke="#7E7ADB" stroke-width="0.8" opacity="0.8"/>
<rect x="${x}" y="${y}" width="${comp}" height="${alt}" rx="${f1(alt / 2)}" fill="url(#${id}-t${sufixo})" stroke="#121417" stroke-width="0.55"/>
<path d="${bolsos}" stroke="#121417" stroke-width="0.6" stroke-dasharray="1.4 1"/>
<rect x="${x + 4}" y="${f1(y + 2.4)}" width="${comp - 8}" height="${f1(alt - 4.8)}" rx="${f1(alt / 2 - 2.4)}" fill="none" stroke="#686E77" stroke-width="0.5" stroke-dasharray="1.2 1" opacity="0.7"/>
<path d="M${x - 1} ${f1(y + alt * 0.25)}c-9 0 -9 ${f1(alt * 0.5)} 0 ${f1(alt * 0.5)}" fill="none" stroke="#AEB4BC" stroke-width="2"/>
<path d="M${x - 1} ${f1(y + alt * 0.25)}c-9 0 -9 ${f1(alt * 0.5)} 0 ${f1(alt * 0.5)}" fill="none" stroke="#EEF1F4" stroke-width="0.6"/></g>`;
  };
  return `<defs>${lin(id, 'v', 0, 0, 0, 1, ['#7E7ADB', '#3F3AA8', '#211D66'])}${lin(id, 'ta', 0, 0, 0, 1, ['#686E77', '#3E434A', '#25282D'])}${lin(id, 'tb', 0, 0, 0, 1, ['#5A6069', '#353A41', '#1E2126'])}</defs>
${sombra2(id, 80, 100, 66, 6)}
${faixa(16, 30, 96, 26, -4, 'b')}
${faixa(24, 62, 96, 26, 3, 'a')}`;
}

// ================= bancos =================
const banco_reto = quadro(
  (C) => {
    for (const x of [8, 104]) {
      tubo(C, [x, 3, 2], [x, 3, 40], 6);
      for (const z of [2, 40]) cil(C, [x, 0, z], [x, 1.4, z], 3.2, M.borracha, { lados: 10 });
      tubo(C, [x, 6, 21], [x, 36, 21], 6);
    }
    tubo(C, [6, 36, 21], [106, 36, 21], 6);
    C.estofado([56, 39, 7], X, Y, Z, 120, 9, 28);
    C.sombra(56, 21, 66, 26, 0.2);
  },
  { yaw: 28, pitch: 16, s: 0.6 },
);

const banco_regulavel = quadro(
  (C) => {
    tubo(C, [0, 6, 25], [112, 6, 25], 7);
    tubo(C, [112, 3, 4], [112, 3, 46], 6);
    for (const z of [2, 48]) cil(C, [114, 4.5, z], [114, 4.5, z + (z < 25 ? -4 : 4)], 4.5, M.borracha, { lados: 16 });
    tubo(C, [-2, 3, 6], [-2, 3, 44], 6);
    tubo(C, [-2, 6, 25], [-10, 24, 25], 4);
    pega(C, [-10, 24, 18], [-10, 24, 32], 2);
    // escada de regulagem com furos
    tubo(C, [18, 8, 25], [40, 58, 25], 6, M.metal, { up: Z });
    C.furos([0.2, 0.35, 0.5, 0.65, 0.8].map((t) => add(V.lerp([18, 8, 25], [40, 58, 25], t), [0, 0, -3.1])), norm([22, 50, 0]), norm([-50, 22, 0]), 1);
    tubo(C, [76, 8, 25], [76, 38, 25], 6);
    // assento e encosto inclinado
    C.estofado([80, 40, 11], norm([1, 0.12, 0]), norm([-0.12, 1, 0]), Z, 38, 9, 28);
    const ao = norm([-0.77, 0.64, 0]), nn = norm([0.64, 0.77, 0]);
    C.estofado(add([60, 44, 11], mul(ao, 41)), ao, nn, Z, 82, 9, 28);
    tubo(C, [40, 58, 25], add([60, 44, 25], mul(ao, 30)), 4);
    C.sombra(52, 25, 70, 30, 0.2);
  },
  { yaw: 28, pitch: 14, s: 0.6 },
);

const banco_scott = (id) => ILUSTRACOES.banco_scott(id, { pessoa: false });
const banco_romano = (id) => ILUSTRACOES.banco_romano(id, { pessoa: false });

// ================= polias e acessórios =================
const estacao_polia_dupla = (id) => ILUSTRACOES.estacao_polia_dupla(id, { pessoa: false });

const polia_simples = quadro(
  (C) => {
    const Pt = torre(C, [0, 0, 0], X, Z, 34, 30, 210, 10);
    // pista regulável na frente, com furos e o carrinho da polia
    const xp = 17;
    tubo(C, [xp, 6, -10], [xp, 206, -10], 6);
    tubo(C, [xp, 206, -10], Pt(17, 0, 206), 4);
    tubo(C, [xp, 6, -10], Pt(17, 0, 6), 4);
    const cs = [];
    for (let y = 24; y <= 196; y += 12) cs.push([xp, y, -13.1]);
    C.furos(cs, X, Y, 1.1);
    C.caixa([xp - 4.5, 112, -15.5], [xp + 4.5, 128, -4.5], M.metalClaro);
    cil(C, [xp + 4, 124, -14], [xp + 7, 124, -14], 1.6, M.borracha, { lados: 10 });
    cil(C, [xp, 112, -20], [xp, 112, -12], 4.6, M.metalClaro, { lados: 18, up: X });
    C.linha([xp, 108, -20], [xp, 82, -20], '#1D2024', 0.6);
    // pegador em D pendurado
    pega(C, [xp - 5, 74, -20], [xp + 5, 74, -20], 1.6);
    C.polilinha([[xp - 5, 74, -20], [xp, 82, -20], [xp + 5, 74, -20]], '#2A2E33', 0.9);
  },
  { yaw: 40, pitch: 10, s: 0.6 },
  [[-4, 60, -24], [40, 60, 34], [-4, 216, -24], [40, 216, 34]],
);

// corda de tríceps: duas pontas com batentes de borracha, presas no meio por um anel e o mosquetão
const acessorio_polia_corda = quadro(
  (C) => {
    mosquetao(C, [0, 70, 0]);
    cil(C, [-3, 64, 0], [3, 64, 0], 2.6, M.cromo, { lados: 14 });
    for (const s of [-1, 1]) {
      const pts = [];
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        pts.push([s * (3 + 12 * Math.sin(t * 1.4)), 64 - 48 * t, s * 2 * t]);
      }
      for (let i = 0; i < pts.length - 1; i++) C.cilindro(pts[i], pts[i + 1], 1.7, M.tecido, { lados: 10, contorno: false });
      for (let i = 1; i < pts.length - 1; i += 1) C.linha(add(pts[i], [-1.6, 0.8, -1.8]), add(pts[i], [1.6, -0.8, -1.8]), '#6E747C', 0.35, { dz: -0.5 });
      const fim = pts[pts.length - 1];
      C.cilindro(fim, add(fim, [0, -6, 0]), 3.2, M.borracha, { lados: 16 });
    }
  },
  { yaw: 14, pitch: 6, s: 0.6 },
);

// triângulo (pegada fechada): quadro em V de aço com a pegada de borracha embaixo
const acessorio_polia_triangulo = quadro(
  (C) => {
    mosquetao(C, [0, 58, 0]);
    cil(C, [0, 54, 0], [0, 58, 0], 1.6, M.cromo);
    for (const s of [-1, 1]) tubo(C, [0, 54, 0], [s * 15, 18, 0], 3.2, M.cromo, { up: Z });
    tubo(C, [-15, 18, 0], [15, 18, 0], 3, M.cromo);
    for (const s of [-1, 1]) pega(C, [s * 13, 19, -6], [s * 13, 19, 6], 2.2);
    tubo(C, [-13, 19, -6], [-13, 19, 6], 1, M.cromo);
  },
  { yaw: 22, pitch: 8, s: 0.6 },
);

const acessorio_polia_barra_reta = quadro(
  (C) => {
    mosquetao(C, [0, 22, 0]);
    cil(C, [0, 14, 0], [0, 18, 0], 1.8, M.cromo);
    C.caixa([-3, 11, -2.2], [3, 15, 2.2], M.cromo);
    cil(C, [-27, 10, 0], [27, 10, 0], 1.6, M.cromo, { lados: 12 });
    for (const s of [-1, 1]) {
      pega(C, [s * 9, 10, 0], [s * 25, 10, 0], 2.1);
      cil(C, [s * 27, 10, 0], [s * 28.5, 10, 0], 2.4, M.borracha, { lados: 12 });
    }
  },
  { yaw: 26, pitch: 14, s: 0.6 },
);

// estribo: alça em D de fita reforçada, pegador de borracha que gira e argola de aço
const acessorio_polia_estribo = quadro(
  (C) => {
    mosquetao(C, [0, 40, 0]);
    const ar = Array.from({ length: 12 }, (_, i) => {
      const t = (2 * Math.PI * i) / 12;
      return [2.6 * Math.cos(t), 33 + 2.6 * Math.sin(t), 0];
    });
    for (let i = 0; i < 12; i++) cil(C, ar[i], ar[(i + 1) % 12], 0.7, M.cromo, { lados: 6, contorno: false });
    for (const s of [-1, 1]) {
      const pts = [];
      for (let i = 0; i <= 6; i++) {
        const t = i / 6;
        pts.push([s * (2 + 9 * Math.sin(t * 1.5)), 31 - 20 * t, 0]);
      }
      for (let i = 0; i < pts.length - 1; i++) C.tubo(pts[i], pts[i + 1], 1.2, 3.6, M.tecido, { up: Z, contorno: false });
    }
    pega(C, [-9.8, 10, 0], [9.8, 10, 0], 2.4);
    cil(C, [-11, 10, 0], [11, 10, 0], 0.9, M.cromo, { lados: 8 });
  },
  { yaw: 24, pitch: 10, s: 0.6 },
);

// tornozeleira: braçadeira acolchoada com velcro e argola em D
const acessorio_polia_tornozeleira = quadro(
  (C) => {
    mosquetao(C, [0, 40, 0]);
    // argola em D
    const d = Array.from({ length: 9 }, (_, i) => {
      const t = Math.PI * (i / 8);
      return [4.5 * Math.cos(t), 30 + 4 * Math.sin(t), 0];
    });
    for (let i = 0; i < 8; i++) cil(C, d[i], d[i + 1], 0.75, M.cromo, { lados: 6, contorno: false });
    cil(C, [-4.5, 30, 0], [4.5, 30, 0], 0.75, M.cromo, { lados: 6 });
    // braçadeira em anel (vista de lado, um pouco de cima)
    const c = [0, 16, 0], R = 10;
    for (let i = 0; i < 20; i++) {
      const a = (2 * Math.PI * i) / 20 + Math.PI / 2, b = (2 * Math.PI * (i + 1)) / 20 + Math.PI / 2;
      const p = (t) => add(c, [R * Math.cos(t), R * Math.sin(t), 0]);
      C.prisma(retArred(2.6, 10, 1.1, 2), p(a), norm([Math.cos(a), Math.sin(a), 0]), Z, sub(p(b), p(a)), i < 4 || i > 17 ? M.acao : M.tecido, { contorno: false, traco: 0.3 });
    }
    C.estofado([0, 26.6, 0], X, Y, Z, 8, 2.4, 7, M.tecido);
  },
  { yaw: 30, pitch: 34, s: 0.6 },
);

// puxador alto: torre, braço no alto com polia, barra longa de pegadas inclinadas, banco e rolos das coxas
const estacao_puxada = quadro(
  (C) => {
    torre(C, [0, 0, 22], X, Z, 34, 30, 220, 10);
    base(C, 0, 112, 30, 46);
    tubo(C, [17, 216, 37], [86, 216, 37], 6);
    cil(C, [86, 210, 33], [86, 210, 41], 4.2, M.metalClaro, { lados: 16 });
    C.linha([86, 206, 37], [86, 168, 37], '#1D2024', 0.6);
    // barra de puxada: meio reto, pontas caídas com borracha
    cil(C, [86, 166, 2], [86, 166, 72], 1.5, M.cromo, { lados: 10 });
    for (const [z, s] of [
      [2, -1],
      [72, 1],
    ]) {
      cil(C, [86, 166, z], [86, 158, z + s * 10], 1.5, M.cromo, { lados: 10 });
      pega(C, [86, 162, z + s * 4.5], [86, 158, z + s * 10], 2.1);
    }
    C.caixa([84, 164, 35], [88, 168, 39], M.cromo);
    // assento, coluna e rolos das coxas
    tubo(C, [96, 4, 38], [96, 44, 38], 7);
    C.estofado([100, 44, 38], X, Y, Z, 38, 9, 36);
    tubo(C, [78, 4, 38], [78, 64, 38], 6);
    for (const z of [26, 50]) rolo(C, [78, 66, z], Z, 18, 5.2);
    tubo(C, [78, 66, 17], [78, 66, 59], 3, M.cromo);
    C.sombra(60, 38, 70, 30, 0.2);
  },
  { yaw: 34, pitch: 10, s: 0.6 },
);

// remada baixa: banco longo, apoio dos pés, polia baixa na frente e a torre
const estacao_remada = quadro(
  (C) => {
    tubo(C, [0, 34, 30], [130, 34, 30], 7);
    for (const x of [6, 128]) {
      tubo(C, [x, 3, 14], [x, 3, 46], 6);
      tubo(C, [x, 6, 30], [x, 32, 30], 6);
    }
    C.estofado([44, 38, 30], X, Y, Z, 54, 9, 30);
    // apoio dos pés inclinado, com ranhuras
    const pa = norm([-0.4, 1, 0]);
    for (const z of [18, 42]) {
      C.prisma(retArred(3, 26, 1), [112, 54, z], X, pa, [0, 0, 12], M.plataforma, { decalSempre: (P) => `<path d="${[0, 1, 2, 3].map((i) => { const a = P(add([110.6, 46 + i * 5, z + 1], [0, 0, 0])), b = P([110.6, 46 + i * 5, z + 11]); return `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`; }).join('')}" stroke="#5E646C" stroke-width="0.45"/>` });
      tubo(C, [118, 36, z + 6], [114, 44, z + 6], 4);
    }
    // polia baixa, cabo e o triângulo descansando nos pés
    C.cilindro([132, 30, 26], [132, 30, 34], 4.5, M.metalClaro, { lados: 16 });
    C.linha([128, 30, 30], [98, 44, 30], '#1D2024', 0.6);
    tubo(C, [98, 44, 30], [90, 40, 24], 2.2, M.cromo, { up: Y });
    tubo(C, [98, 44, 30], [90, 40, 36], 2.2, M.cromo, { up: Y });
    pega(C, [90, 40, 22], [90, 40, 38], 2);
    torre(C, [136, 0, 14], X, Z, 34, 32, 190, 10);
    C.sombra(84, 30, 98, 30, 0.2);
  },
  { yaw: -30, pitch: 12, s: 0.6 },
);

// multifuncional: torre com polia alta e barra, banco com encosto, braços do voador e rolos da extensora
const multifuncional = quadro(
  (C) => {
    base(C, -6, 128, 0, 92);
    torre(C, [0, 0, 6], X, Z, 34, 30, 210, 10);
    tubo(C, [17, 206, 21], [108, 206, 46], 6);
    cil(C, [108, 200, 42], [108, 200, 50], 4.2, M.metalClaro, { lados: 16 });
    C.linha([108, 196, 46], [108, 172, 46], '#1D2024', 0.6);
    cil(C, [108, 170, 14], [108, 170, 78], 1.4, M.cromo, { lados: 10 });
    for (const z of [14, 78]) pega(C, [108, 170, z], [108, 162, z + (z < 40 ? -8 : 8)], 2);
    // coluna do banco, assento, encosto
    tubo(C, [70, 4, 46], [70, 168, 46], 7);
    C.estofado([84, 46, 46], X, Y, Z, 36, 9, 36);
    tubo(C, [70, 46, 46], [64, 52, 46], 5);
    C.estofado([60, 90, 46], Y, X, Z, 62, 9, 34);
    // braços do voador, com as almofadas verticais
    for (const s of [-1, 1]) {
      const zp = 46 + s * 34;
      tubo(C, [68, 160, 46], [72, 156, zp], 4.5);
      tubo(C, [72, 156, zp], [92, 152, zp], 4.5);
      C.estofado([92, 112, zp], Y, mul(X, -1), Z, 40, 6, 12);
    }
    // rolos da extensora, embaixo da frente do assento
    tubo(C, [102, 44, 46], [110, 20, 46], 4.5);
    for (const z of [38, 54]) rolo(C, [110, 20, z], Z, 14, 4.8);
    for (const z of [38, 54]) rolo(C, [104, 48, z], Z, 14, 4.8);
    C.sombra(60, 46, 80, 52, 0.2);
  },
  { yaw: 36, pitch: 10, s: 0.6 },
);

// ================= barras =================
const barra_fixa = quadro(
  (C) => {
    // batente de porta (madeira clara) com a barra presa por dentro
    for (const x of [0, 82]) C.caixa([x, 0, 0], [x + 9, 210, 16], M.madeira);
    C.caixa([0, 210, 0], [91, 222, 16], M.madeira);
    cil(C, [9, 192, 8], [82, 192, 8], 1.9, M.cromo, { lados: 12 });
    for (const x of [9, 76]) C.cilindro([x, 192, 8], [x + (x < 40 ? 6 : 6), 192, 8], 4, M.metal, { lados: 14 });
    for (const [a, b] of [
      [16, 34],
      [57, 75],
    ])
      pega(C, [a, 192, 8], [b, 192, 8], 2.8);
  },
  { yaw: 24, pitch: 6, s: 0.6 },
  [[0, 150, 0], [91, 150, 16], [0, 224, 0], [91, 224, 16]],
);

function barraNoChao(C, comp, rAnilhas, curva) {
  // barra ao longo de z; anilhas nas pontas (de pé, encostam no chão)
  const r0 = rAnilhas[0];
  const y = r0;
  const meia = comp / 2;
  const luva = comp > 150 ? 42 : 24;
  const pts = curva
    ? [
        [-meia + luva, 0],
        [-22, 0],
        [-14, -3.4],
        [-6, 2],
        [6, 2],
        [14, -3.4],
        [22, 0],
        [meia - luva, 0],
      ]
    : [
        [-meia + luva, 0],
        [meia - luva, 0],
      ];
  const P3 = pts.map(([z, dx]) => [dx, y, z]);
  for (let i = 0; i < P3.length - 1; i++) cil(C, P3[i], P3[i + 1], comp > 150 ? 1.4 : 1.3, M.cromo, { lados: 10 });
  if (!curva && comp > 150) {
    // marcas do recartilhado
    for (const z of [-40, 40]) C.linha([0, y + 1.42, z - 10], [0, y + 1.42, z + 10], '#7A818A', 0.9);
  }
  for (const s of [-1, 1]) {
    const z0 = s * (meia - luva);
    cil(C, [0, y, z0], [0, y, z0 + s * 3], 3.2, M.cromo, { lados: 14 });
    cil(C, [0, y, z0 + s * 3], [0, y, s * meia], 2.5, M.cromo, { lados: 14 });
    rAnilhas.forEach((r, i) => disco(C, [0, y, z0 + s * (6 + i * 4.5)], Z, r, 4));
    cil(C, [0, y, z0 + s * (8.5 + rAnilhas.length * 4.5)], [0, y, z0 + s * (11 + rAnilhas.length * 4.5)], 3.4, M.cromo, { lados: 12 });
  }
  C.sombra(0, 0, 20, meia, 0.2);
}
const barra_longa = quadro((C) => barraNoChao(C, 220, [22.5, 22.5], false), { yaw: 58, pitch: 18, s: 0.6 });
const barra_w = quadro((C) => barraNoChao(C, 120, [12.5, 10], true), { yaw: 62, pitch: 30, s: 0.6 });

const paralelas = quadro(
  (C) => {
    for (const z of [0, 58]) {
      tubo(C, [0, 3, z], [70, 3, z], 6);
      for (const x of [10, 60]) tubo(C, [x, 6, z], [x, 104, z], 5.5);
      cil(C, [-6, 106, z], [76, 106, z], 2.4, M.cromo);
      pega(C, [-6, 106, z], [16, 106, z], 2.9);
      pega(C, [54, 106, z], [76, 106, z], 2.9);
    }
    for (const x of [10, 60]) tubo(C, [x, 3, 0], [x, 3, 58], 5);
    tubo(C, [35, 60, 0], [35, 60, 58], 4);
    for (const z of [0, 58]) tubo(C, [10, 60, z], [60, 60, z], 4);
    C.sombra(35, 29, 48, 40, 0.2);
  },
  { yaw: 30, pitch: 14, s: 0.6 },
);

const barra_hexagonal = quadro(
  (C) => {
    const y = 22.5, R = 34;
    const hx = Array.from({ length: 6 }, (_, i) => {
      const t = (Math.PI / 3) * i;
      return [R * Math.sin(t) * 0.82, y, R * Math.cos(t)];
    });
    for (let i = 0; i < 6; i++) tubo(C, hx[i], hx[(i + 1) % 6], 3.2, M.cromo, { up: Y });
    for (const s of [-1, 1]) {
      tubo(C, [s * 12, y, -10], [s * 12, y, 10], 2.6, M.cromo, { up: Y });
      pega(C, [s * 12, y + 0.4, -6], [s * 12, y + 0.4, 6], 2.2);
      tubo(C, [s * 12, y, -10], hx[s < 0 ? 4 : 2], 2.4, M.cromo, { up: Y });
      tubo(C, [s * 12, y, 10], hx[s < 0 ? 5 : 1], 2.4, M.cromo, { up: Y });
    }
    for (const s of [-1, 1]) {
      const z0 = s * R;
      cil(C, [0, y, z0], [0, y, z0 + s * 30], 2.5, M.cromo, { lados: 14 });
      disco(C, [0, y, z0 + s * 8], Z, 22.5, 4);
      cil(C, [0, y, z0 + s * 11], [0, y, z0 + s * 13.5], 3.4, M.cromo, { lados: 12 });
    }
    C.sombra(0, 0, 30, 60, 0.2);
  },
  { yaw: 52, pitch: 34, s: 0.6 },
);

// ================= máquinas =================
const leg_press = (id) => ILUSTRACOES.leg_press(id, { pessoa: false });
const hack = (id) => ILUSTRACOES.hack(id, { pessoa: false });
const graviton = (id) => ILUSTRACOES.graviton(id, { pessoa: false });
const cadeira_abdutora_adutora = (id) => ILUSTRACOES.cadeira_abdutora_adutora(id, { pessoa: false });

// gaiola: 4 colunas com furos, travessas, ganchos J com a barra apoiada e as barras de segurança
const rack_de_agachamento = quadro(
  (C) => {
    base(C, 0, 118, 0, 120, 7);
    const xs = [8, 110], zs = [10, 110];
    for (const x of xs) for (const z of zs) tubo(C, [x, 3, z], [x, 224, z], 7);
    for (const z of zs) tubo(C, [xs[0], 224, z], [xs[1], 224, z], 6);
    for (const x of xs) tubo(C, [x, 224, zs[0]], [x, 224, zs[1]], 6);
    tubo(C, [xs[1], 210, zs[0] + 6], [xs[1], 210, zs[1] - 6], 3.6, M.cromo);
    for (const z of zs) {
      const cs = [];
      for (let y = 30; y <= 200; y += 10) cs.push([xs[1] + 3.6, y, z]);
      C.furos(cs, Z, Y, 0.9);
    }
    // barras de segurança
    for (const z of zs) tubo(C, [xs[0] - 8, 72, z], [xs[1] + 12, 72, z], 4.5, M.cromo);
    // ganchos J e barra
    for (const z of zs) {
      C.caixa([xs[1] + 3, 128, z - 4], [xs[1] + 10, 140, z + 4], M.metalClaro);
      C.caixa([xs[1] + 8, 140, z - 4], [xs[1] + 11, 145, z + 4], M.borracha);
    }
    const bx = xs[1] + 7, by = 143;
    cil(C, [bx, by, -50], [bx, by, 170], 1.4, M.cromo, { lados: 10 });
    for (const [z0, s] of [
      [-6, -1],
      [126, 1],
    ]) {
      cil(C, [bx, by, z0], [bx, by, z0 + s * 3], 3.2, M.cromo, { lados: 14 });
      cil(C, [bx, by, z0 + s * 3], [bx, by, z0 + s * 44], 2.5, M.cromo, { lados: 14 });
      disco(C, [bx, by, z0 + s * 8], Z, 22.5, 4);
      disco(C, [bx, by, z0 + s * 12.5], Z, 22.5, 4);
    }
    C.sombra(60, 60, 75, 75, 0.2);
  },
  { yaw: 28, pitch: 10, s: 0.6 },
);

// smith: a barra presa a 2 guias verticais, com ganchos; anilhas nas pontas
const smith = quadro(
  (C) => {
    base(C, 0, 90, -10, 190, 7);
    for (const z of [-10, 190]) {
      for (const x of [0, 90]) tubo(C, [x, 3, z], [x, 230, z], 7);
      tubo(C, [0, 230, z], [90, 230, z], 6);
      cil(C, [45, 6, z + (z < 0 ? 8 : -8)], [45, 226, z + (z < 0 ? 8 : -8)], 2, M.cromo, { lados: 12 });
      tubo(C, [0, 226, z], [90, 226, z + (z < 0 ? 8 : -8)], 3);
    }
    tubo(C, [45, 230, -10], [45, 230, 190], 6);
    const by = 128;
    for (const z of [-2, 182]) {
      C.caixa([40, by - 9, z - 3.5], [50, by + 9, z + 3.5], M.metalClaro);
      tubo(C, [50, by - 2, z], [56, by + 4, z], 2.2, M.metal);
    }
    cil(C, [45, by, -44], [45, by, 224], 1.6, M.cromo, { lados: 10 });
    for (const [z0, s] of [
      [-10, -1],
      [190, 1],
    ]) {
      disco(C, [45, by, z0 + s * 10], Z, 20, 4);
      disco(C, [45, by, z0 + s * 14.5], Z, 16, 4);
      cil(C, [45, by, z0 + s * 4], [45, by, z0 + s * 34], 2.5, M.cromo, { lados: 12 });
    }
    C.sombra(45, 90, 60, 110, 0.2);
  },
  { yaw: 30, pitch: 10, s: 0.6 },
);

// assento + encosto de máquina (usado por várias), virado para +x
function bancoMaquina(C, x, z, ySeat = 46, inclina = 0.12) {
  tubo(C, [x, 4, z], [x, ySeat - 4, z], 7);
  C.estofado([x + 4, ySeat - 4, z], X, Y, Z, 38, 9, 36);
  const ao = norm([-inclina, 1, 0]), nn = norm([1, inclina, 0]);
  C.estofado(add([x - 18, ySeat + 34, z], mul(nn, -4.5)), ao, nn, Z, 64, 9, 34);
  tubo(C, [x - 4, ySeat - 6, z], [x - 22, ySeat + 8, z], 6);
}
// pegadores laterais do assento
function pegadoresAssento(C, x, z, y = 50, larg = 24) {
  for (const s of [-1, 1]) {
    tubo(C, [x - 4, y - 14, z + s * (larg - 6)], [x + 4, y, z + s * larg], 3);
    pega(C, [x + 4, y, z + s * larg], [x + 16, y + 2, z + s * larg], 2);
  }
}

// cadeira extensora: assento, encosto, rolo na frente da canela (alavanca para baixo) e came no joelho
const cadeira_extensora = quadro(
  (C) => {
    base(C, -40, 118, 6, 70);
    torre(C, [-40, 0, 18], X, Z, 32, 30, 160, 9);
    bancoMaquina(C, 40, 38);
    pegadoresAssento(C, 46, 38, 50, 26);
    // came e alavanca: pivô ao lado do joelho, braço desce até o rolo da canela
    C.cilindro([80, 46, 8], [80, 46, 13], 9, M.metalClaro, { lados: 22 });
    tubo(C, [80, 4, 10], [80, 40, 10], 6);
    tubo(C, [80, 46, 13], [92, 14, 13], 5);
    tubo(C, [92, 14, 13], [92, 14, 54], 3.2, M.cromo);
    rolo(C, [94, 14, 40], Z, 26, 5.4);
    C.sombra(40, 38, 82, 40, 0.2);
  },
  { yaw: 38, pitch: 12, s: 0.6 },
);

// cadeira flexora: assento, encosto, apoio que trava as coxas por cima e rolo atrás da panturrilha (alavanca para a frente)
const cadeira_flexora = quadro(
  (C) => {
    base(C, -40, 130, 6, 70);
    torre(C, [-40, 0, 18], X, Z, 32, 30, 160, 9);
    bancoMaquina(C, 40, 38, 46, 0.3);
    pegadoresAssento(C, 46, 38, 50, 26);
    // trava das coxas: almofada horizontal sobre a frente do assento
    tubo(C, [74, 4, 8], [74, 70, 8], 5);
    tubo(C, [74, 70, 8], [70, 66, 38], 4.5);
    C.estofado([66, 62, 38], X, Y, Z, 22, 8, 34);
    // came no joelho e alavanca para a frente, com o rolo da panturrilha
    C.cilindro([84, 50, 8], [84, 50, 13], 9, M.metalClaro, { lados: 22 });
    tubo(C, [84, 50, 13], [124, 44, 13], 5);
    tubo(C, [124, 44, 13], [124, 44, 54], 3.2, M.cromo);
    rolo(C, [126, 44, 40], Z, 26, 5.4);
    C.sombra(44, 38, 90, 40, 0.2);
  },
  { yaw: 38, pitch: 12, s: 0.6 },
);

// mesa flexora: banco deitado com a dobra no quadril, pegadores na frente e o rolo dos tornozelos atrás
const mesa_flexora = quadro(
  (C) => {
    base(C, -10, 150, 10, 60);
    for (const x of [0, 70]) tubo(C, [x, 4, 35], [x, 66, 35], 7);
    C.estofado([28, 68, 35], norm([1, 0.18, 0]), norm([-0.18, 1, 0]), Z, 62, 9, 34);
    C.estofado([90, 74, 35], norm([1, -0.12, 0]), norm([0.12, 1, 0]), Z, 56, 9, 34);
    tubo(C, [100, 4, 35], [100, 70, 35], 7);
    for (const s of [-1, 1]) {
      tubo(C, [6, 60, 35 + s * 14], [-6, 70, 35 + s * 22], 3);
      pega(C, [-6, 70, 35 + s * 22], [-6, 84, 35 + s * 22], 2);
    }
    // pivô no joelho e a alavanca com os rolos (em cima do tornozelo)
    C.cilindro([122, 74, 6], [122, 74, 11], 8, M.metalClaro, { lados: 20 });
    tubo(C, [122, 4, 8], [122, 68, 8], 6);
    tubo(C, [122, 74, 11], [146, 88, 11], 5);
    tubo(C, [146, 88, 11], [146, 88, 58], 3.2, M.cromo);
    rolo(C, [148, 90, 36], Z, 30, 5.2);
    chifre(C, [136, 54, 11], [0, 0, -1], 18, [17]);
    tubo(C, [128, 64, 11], [136, 54, 11], 4);
    C.sombra(70, 35, 85, 34, 0.2);
  },
  { yaw: 30, pitch: 14, s: 0.6 },
);

// supino articulado: encosto alto, braços que vêm de cima por trás e trazem as pegadas na altura do peito; pinos de anilha
const supino_maquina = quadro(
  (C) => {
    base(C, -40, 104, 0, 80);
    bancoMaquina(C, 40, 40, 46, 0.18);
    tubo(C, [-30, 4, 40], [-30, 168, 40], 8);
    tubo(C, [-30, 168, 40], [8, 168, 40], 7);
    for (const s of [-1, 1]) {
      const z = 40 + s * 30;
      C.cilindro([8, 168, 40 + s * 4], [8, 168, 40 + s * 10], 4.5, M.metalClaro, { lados: 16 });
      tubo(C, [8, 168, 40 + s * 10], [70, 118, z], 6);
      tubo(C, [70, 118, z], [76, 106, z], 5);
      pega(C, [76, 106, z], [76, 94, z], 2.4);
      tubo(C, [76, 112, z], [88, 112, 40 + s * 18], 3.4);
      pega(C, [88, 112, 40 + s * 18], [88, 112, 40 + s * 8], 2.2);
      chifre(C, [30, 152, z], [0, 0, s], 18, [20]);
    }
    C.sombra(30, 40, 80, 48, 0.2);
  },
  { yaw: 40, pitch: 12, s: 0.6 },
);

// voador: assento, encosto alto e as duas "asas" com almofadas verticais abertas para os lados (vista mais de frente)
const voador = quadro(
  (C) => {
    base(C, -40, 60, 0, 80);
    torre(C, [-46, 0, 20], X, Z, 30, 40, 200, 10);
    bancoMaquina(C, 30, 40, 46, 0.08);
    tubo(C, [-10, 4, 40], [-10, 196, 40], 7);
    for (const s of [-1, 1]) {
      const z = 40 + s * 46;
      C.cilindro([-10, 188, 40 + s * 4], [-10, 182, 40 + s * 4], 6, M.metalClaro, { lados: 18 });
      tubo(C, [-10, 186, 40 + s * 4], [14, 186, z], 5);
      tubo(C, [14, 186, z], [14, 150, z], 5);
      C.estofado([20, 128, z], Y, mul(X, -1), Z, 42, 7, 13);
      pega(C, [24, 160, z], [32, 160, z - s * 4], 2.1);
    }
    C.sombra(10, 40, 70, 60, 0.2);
  },
  { yaw: 62, pitch: 10, s: 0.6 },
);

// desenvolvimento: encosto em pé e pegadas acima dos ombros, braços que sobem por trás
const desenvolvimento_maquina = quadro(
  (C) => {
    base(C, -40, 80, 0, 80);
    bancoMaquina(C, 30, 40, 46, 0.06);
    tubo(C, [-26, 4, 40], [-26, 104, 40], 8);
    for (const s of [-1, 1]) {
      const z = 40 + s * 26;
      C.cilindro([-26, 104, 40 + s * 4], [-26, 104, 40 + s * 10], 4.5, M.metalClaro, { lados: 16 });
      tubo(C, [-26, 104, 40 + s * 10], [8, 150, z], 6);
      tubo(C, [8, 150, z], [16, 156, z], 5);
      pega(C, [16, 150, z], [16, 164, z], 2.4);
      tubo(C, [8, 150, z], [8, 150, z - s * 12], 3.2);
      pega(C, [8, 150, z - s * 12], [14, 150, z - s * 12], 2.2);
      chifre(C, [-14, 120, z], [0, 0, s], 18, [20]);
    }
    C.sombra(10, 40, 66, 48, 0.2);
  },
  { yaw: 44, pitch: 10, s: 0.6 },
);

// remada articulada: apoio de peito na frente, assento baixo, pegadores à frente e embaixo, pinos de anilha
const remada_articulada = quadro(
  (C) => {
    base(C, -10, 130, 0, 80);
    tubo(C, [20, 4, 40], [20, 40, 40], 7);
    C.estofado([16, 40, 40], X, Y, Z, 34, 9, 34);
    tubo(C, [56, 4, 40], [56, 104, 40], 8);
    C.estofado([52, 102, 40], norm([0.28, 1, 0]), norm([-1, 0.28, 0]), Z, 46, 9, 30);
    tubo(C, [56, 120, 40], [90, 150, 40], 7);
    for (const s of [-1, 1]) {
      const z = 40 + s * 30;
      C.cilindro([90, 150, 40 + s * 4], [90, 150, 40 + s * 10], 4.5, M.metalClaro, { lados: 16 });
      tubo(C, [90, 150, 40 + s * 10], [84, 96, z], 6);
      tubo(C, [84, 96, z], [76, 92, z], 4);
      pega(C, [76, 98, z], [76, 86, z], 2.4);
      chifre(C, [94, 110, z], [0, 0, s], 18, [20]);
    }
    tubo(C, [90, 150, 40], [120, 4, 40], 7);
    C.sombra(60, 40, 80, 48, 0.2);
  },
  { yaw: -38, pitch: 12, s: 0.6 },
);

// máquina de rosca: assento, apoio inclinado dos braços e a alavanca com came e pegador; torre ao lado
const rosca_maquina = quadro(
  (C) => {
    base(C, -40, 80, 0, 76);
    torre(C, [-40, 0, 16], X, Z, 30, 30, 150, 9);
    tubo(C, [6, 4, 38], [6, 40, 38], 7);
    C.estofado([6, 40, 38], X, Y, Z, 34, 8, 34);
    tubo(C, [40, 4, 38], [40, 74, 38], 7);
    const pa = norm([0.8, -0.6, 0]), pn = norm([0.6, 0.8, 0]);
    C.estofado([46, 78, 38], pa, pn, Z, 44, 8, 50);
    C.cilindro([62, 74, 8], [62, 74, 13], 8, M.metalClaro, { lados: 20 });
    tubo(C, [62, 74, 13], [74, 104, 13], 5);
    tubo(C, [74, 104, 13], [74, 104, 62], 3, M.cromo);
    for (const z of [26, 50]) pega(C, [74, 104, z - 6], [74, 104, z + 6], 2.3);
    C.sombra(20, 38, 64, 40, 0.2);
  },
  { yaw: 34, pitch: 12, s: 0.6 },
);

// máquina de tríceps (mergulho sentado): assento, encosto e pegadores verticais ao lado do quadril, presos a braços que vêm de trás
const triceps_maquina = quadro(
  (C) => {
    base(C, -40, 84, 0, 80);
    torre(C, [-44, 0, 22], X, Z, 30, 36, 170, 10);
    bancoMaquina(C, 30, 40, 46, 0.1);
    tubo(C, [-8, 4, 40], [-8, 120, 40], 7);
    for (const s of [-1, 1]) {
      const z = 40 + s * 28;
      C.cilindro([-8, 116, 40 + s * 4], [-8, 116, 40 + s * 10], 4.5, M.metalClaro, { lados: 16 });
      tubo(C, [-8, 116, 40 + s * 10], [36, 72, z], 6);
      pega(C, [36, 82, z], [36, 64, z], 2.5);
    }
    C.sombra(10, 40, 66, 48, 0.2);
  },
  { yaw: 40, pitch: 12, s: 0.6 },
);

// máquina de abdominal: assento, almofadas que descem sobre o peito vindas de cima e rolos dos pés
const abdominal_maquina = quadro(
  (C) => {
    base(C, -40, 104, 0, 80);
    torre(C, [-44, 0, 22], X, Z, 30, 36, 170, 10);
    bancoMaquina(C, 30, 40, 46, 0.12);
    tubo(C, [-6, 4, 40], [-6, 150, 40], 7);
    C.cilindro([-6, 146, 36], [-6, 146, 44], 6, M.metalClaro, { lados: 18 });
    tubo(C, [-6, 146, 40], [30, 132, 40], 6);
    for (const s of [-1, 1]) {
      const z = 40 + s * 11;
      tubo(C, [30, 132, 40], [40, 122, z], 4.5);
      C.estofado([40, 108, z], norm([0.25, -1, 0]), norm([1, 0.25, 0]).map((v) => -v), Z, 30, 7, 10);
      pega(C, [40, 124, z + s * 3], [48, 128, z + s * 8], 2);
    }
    tubo(C, [56, 4, 40], [64, 22, 40], 5);
    for (const z of [32, 48]) rolo(C, [66, 24, z], Z, 14, 4.6);
    for (const z of [32, 48]) rolo(C, [74, 12, z], Z, 14, 4.6);
    tubo(C, [64, 22, 40], [74, 12, 40], 3);
    C.sombra(16, 40, 72, 46, 0.2);
  },
  { yaw: 38, pitch: 12, s: 0.6 },
);

// glúteo na máquina (coice): apoio de peito e de antebraços na frente, a alavanca com a plataforma do pé atrás
const gluteo_maquina = quadro(
  (C) => {
    base(C, -10, 150, 10, 70);
    torre(C, [-12, 0, 24], X, Z, 30, 32, 150, 9);
    tubo(C, [60, 4, 40], [60, 92, 40], 8);
    C.estofado([66, 100, 40], norm([0.55, 1, 0]), norm([-1, 0.55, 0]), Z, 40, 9, 30);
    C.estofado([44, 112, 40], X, Y, Z, 30, 7, 40);
    for (const s of [-1, 1]) pega(C, [34, 120, 40 + s * 16], [34, 130, 40 + s * 16], 2.2);
    tubo(C, [60, 92, 40], [36, 108, 40], 5);
    // alavanca do pé: pivô atrás do apoio, braço desce e a chapa do pé
    C.cilindro([96, 70, 56], [96, 70, 62], 7, M.metalClaro, { lados: 18 });
    tubo(C, [96, 4, 60], [96, 64, 60], 6);
    tubo(C, [96, 70, 58], [128, 40, 52], 5);
    C.prisma(retArred(22, 3, 1), [132, 44, 46], norm([0.6, 0.8, 0]), norm([0.8, -0.6, 0]), [0, 0, 14], M.plataforma);
    tubo(C, [128, 40, 52], [140, 30, 52], 3);
    rolo(C, [140, 30, 52], Z, 14, 4.2);
    C.sombra(70, 40, 84, 36, 0.2);
  },
  { yaw: 30, pitch: 12, s: 0.6 },
);

// panturrilha em pé: apoios grandes para os ombros num carrinho que sobe, degrau para a ponta dos pés embaixo, torre atrás
const panturrilha_em_pe_maquina = quadro(
  (C) => {
    base(C, -44, 64, 0, 80);
    torre(C, [-44, 0, 22], X, Z, 30, 36, 180, 10);
    for (const z of [12, 68]) tubo(C, [-4, 4, z], [-4, 196, z], 7);
    tubo(C, [-4, 196, 12], [-4, 196, 68], 6);
    C.caixa([-10, 134, 10], [2, 154, 70], M.metalClaro);
    for (const z of [25, 55]) {
      tubo(C, [2, 146, z], [14, 146, z], 6);
      C.estofado([32, 146, z], X, mul(Y, -1), Z, 36, 12, 20);
    }
    for (const s of [-1, 1]) pega(C, [14, 156, 40 + s * 31], [24, 164, 40 + s * 31], 2.2);
    for (const s of [-1, 1]) tubo(C, [2, 150, 40 + s * 24], [14, 156, 40 + s * 31], 3);
    // degrau alto com borda e ranhuras
    C.caixa([14, 0, 12], [50, 16, 68], M.metal);
    C.prisma(retArred(36, 3, 1), [32, 16, 12], X, Y, [0, 0, 56], M.plataforma, { decalSempre: (P) => `<path d="${[0, 1, 2, 3, 4, 5].map((i) => { const a = P([17 + i * 6, 17.6, 14]), b = P([17 + i * 6, 17.6, 66]); return `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`; }).join('')}" stroke="#5E646C" stroke-width="0.45"/>` });
    C.sombra(4, 40, 62, 50, 0.2);
  },
  { yaw: 46, pitch: 10, s: 0.6 },
);

// panturrilha sentada: assento baixo, almofada sobre os joelhos numa alavanca, apoio dos pés e pino de anilhas
const panturrilha_sentada_maquina = quadro(
  (C) => {
    tubo(C, [0, 6, 30], [110, 6, 30], 8);
    tubo(C, [0, 3, 10], [0, 3, 50], 6);
    tubo(C, [108, 3, 10], [108, 3, 50], 6);
    tubo(C, [20, 6, 30], [20, 40, 30], 7);
    C.estofado([18, 40, 30], X, Y, Z, 36, 9, 34);
    // apoio dos pés (bloco com ranhura) e coluna da alavanca
    C.caixa([62, 6, 12], [80, 20, 48], M.plataforma);
    tubo(C, [96, 6, 30], [96, 46, 30], 8);
    C.cilindro([96, 46, 24], [96, 46, 36], 4.5, M.metalClaro, { lados: 16 });
    tubo(C, [96, 46, 30], [50, 58, 30], 6);
    C.estofado([52, 58, 30], X, Y, Z, 28, 8, 40);
    chifre(C, [86, 49, 30], [0, 0, -1], 30, [16, 16]);
    pega(C, [62, 66, 12], [62, 66, 48], 2);
    tubo(C, [64, 58, 14], [62, 66, 14], 3);
    tubo(C, [64, 58, 46], [62, 66, 46], 3);
    C.sombra(54, 30, 64, 32, 0.2);
  },
  { yaw: 32, pitch: 12, s: 0.6 },
);

// ================= outros acessórios (desenhos 2D com volume, direto no viewBox) =================
const sombra2 = (id, cx, cy, rx, ry, op = 0.22) =>
  `<filter id="${id}-sb" x="-30%" y="-150%" width="160%" height="400%"><feGaussianBlur stdDeviation="1.6"/></filter><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#1B1C1F" opacity="${op}" filter="url(#${id}-sb)"/>`;
const lin = (id, nome, x1, y1, x2, y2, c) =>
  `<linearGradient id="${id}-${nome}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${c.map((cor, i) => `<stop offset="${(i / (c.length - 1)).toFixed(2)}" stop-color="${cor}"/>`).join('')}</linearGradient>`;

function bola_suica(id) {
  return `${sombra2(id, 82, 109, 40, 5)}
<radialGradient id="${id}-b" cx="62" cy="38" r="70" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8E8AE4"/><stop offset="0.45" stop-color="#3F3AA8"/><stop offset="1" stop-color="#1A165C"/></radialGradient>
<circle cx="80" cy="60" r="48" fill="url(#${id}-b)" stroke="#16124A" stroke-width="0.55"/>
<path d="M80 12C60 32 60 88 80 108M80 12C100 32 100 88 80 108M33 52C55 62 105 62 127 52" fill="none" stroke="#211D66" stroke-width="0.6" opacity="0.7"/>
<ellipse cx="60" cy="36" rx="13" ry="7" transform="rotate(-35 60 36)" fill="#fff" opacity="0.25"/>
<circle cx="118" cy="44" r="1.6" fill="#16124A"/>`;
}

function mini_band(id) {
  const anel = (cx, cy, rx, ry, esp, cores, rot) => `<g transform="rotate(${rot} ${cx} ${cy})">
<ellipse cx="${cx}" cy="${cy + esp * 0.5}" rx="${rx}" ry="${ry}" fill="none" stroke="${cores[0]}" stroke-width="${esp}"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${cores[1]}" stroke-width="${esp}"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx + esp / 2}" ry="${ry + esp / 2}" fill="none" stroke="${cores[3]}" stroke-width="0.5"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx - esp / 2}" ry="${ry - esp / 2}" fill="none" stroke="${cores[3]}" stroke-width="0.5"/>
<path d="M${cx - rx * 0.7} ${cy - ry * 0.75}A${rx} ${ry} 0 0 1 ${cx + rx * 0.3} ${cy - ry * 0.98}" fill="none" stroke="${cores[2]}" stroke-width="${(esp * 0.25).toFixed(1)}" stroke-linecap="round" opacity="0.8"/></g>`;
  return `${sombra2(id, 80, 98, 62, 7)}
${anel(78, 84, 56, 15, 7, ['#211D66', '#3F3AA8', '#7E7ADB', '#16124A'], 0)}
${anel(88, 56, 36, 11, 6, ['#24282D', '#474D56', '#7B828C', '#15171A'], -10)}`;
}

function elasticos(id) {
  const tuboE = (d, cor, claro) => `<path d="${d}" fill="none" stroke="#16181B" stroke-width="4.6" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${cor}" stroke-width="3.4" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${claro}" stroke-width="0.9" stroke-linecap="round" transform="translate(-0.6 -0.8)" opacity="0.8"/>`;
  const pegador = (x, y, ang) => `<g transform="rotate(${ang} ${x} ${y})">
<path d="M${x - 6} ${y - 4}L${x} ${y - 13}L${x + 6} ${y - 4}" fill="none" stroke="#2A2E33" stroke-width="1.6" stroke-linejoin="round"/>
<rect x="${x - 9}" y="${y - 4.5}" width="18" height="9" rx="4.5" fill="url(#${id}-p)" stroke="#08090A" stroke-width="0.55"/></g>`;
  return `${sombra2(id, 80, 108, 64, 6)}
${lin(id, 'p', 0, 0, 0, 1, ['#474C53', '#262A2F', '#121417'])}
${tuboE('M30 98C10 60 40 18 76 22C112 26 132 60 120 96', '#3F3AA8', '#7E7ADB')}
${tuboE('M48 100C40 74 56 46 80 46C104 46 116 72 106 100', '#474D56', '#8C939D')}
${pegador(30, 100, 20)}${pegador(120, 98, -20)}${pegador(48, 102, 8)}${pegador(106, 102, -8)}`;
}

function suspensao(id) {
  const fita = (x1, y1, x2, y2) => {
    const d = `M${x1} ${y1}L${x2} ${y2}`;
    return `<path d="${d}" stroke="#08090A" stroke-width="4.4" stroke-linecap="round"/><path d="${d}" stroke="#2F3339" stroke-width="3.4" stroke-linecap="round"/><path d="${d}" stroke="#5A6069" stroke-width="0.8" transform="translate(-0.8 0)"/>`;
  };
  const fivela = (x, y) => `<rect x="${x - 3.4}" y="${y - 4}" width="6.8" height="8" rx="1.6" fill="#3F3AA8" stroke="#16124A" stroke-width="0.5"/><rect x="${x - 1.8}" y="${y - 2}" width="3.6" height="1.6" fill="#7E7ADB"/>`;
  const pegador = (x, y) => `<rect x="${x - 9}" y="${y - 3.4}" width="18" height="6.8" rx="3.4" fill="url(#${id}-p)" stroke="#08090A" stroke-width="0.55"/><path d="M${x - 8} ${y + 3}C${x - 8} ${y + 14} ${x + 8} ${y + 14} ${x + 8} ${y + 3}" fill="none" stroke="#2F3339" stroke-width="2.6"/>`;
  return `${sombra2(id, 80, 112, 40, 4, 0.16)}
${lin(id, 'p', 0, 0, 0, 1, ['#474C53', '#262A2F', '#121417'])}
<rect x="60" y="4" width="40" height="5" rx="2.5" fill="#474D56" stroke="#15171A" stroke-width="0.55"/>
<path d="M76 9C76 16 84 16 84 9" fill="none" stroke="#2F3339" stroke-width="3"/>
<circle cx="80" cy="18" r="3.2" fill="none" stroke="#AEB4BC" stroke-width="1.6"/>
${fita(80, 21, 58, 84)}${fita(80, 21, 102, 84)}${fivela(66, 58)}${fivela(94, 58)}
${pegador(56, 88)}${pegador(104, 88)}`;
}

const roda_abdominal = quadro(
  (C) => {
    C.cilindro([0, 11, -4], [0, 11, 4], 11, M.borracha, { lados: 26 });
    C.cilindro([0, 11, -4.4], [0, 11, 4.4], 6.4, M.acao, { lados: 22 });
    cil(C, [0, 11, -22], [0, 11, 22], 1.1, M.cromo, { lados: 8 });
    for (const s of [-1, 1]) pega(C, [0, 11, s * 7.5], [0, 11, s * 21], 2.4);
    C.sombra(0, 0, 14, 22, 0.22);
  },
  { yaw: 34, pitch: 16, s: 0.6 },
);

const step = quadro(
  (C) => {
    for (const x of [6, 74]) C.caixa([x, 0, 2], [x + 18, 10, 36], M.metalClaro);
    C.prisma(retArred(100, 6, 2.6, 4), [48, 13, 0], X, Y, [0, 0, 38], M.metal);
    C.prisma(retArred(94, 2, 1, 2), [48, 16.6, 2], X, Y, [0, 0, 34], M.acao, {
      decalSempre: (P) => {
        let d = '';
        for (let i = 0; i < 16; i++) {
          const a = P([8 + i * 5.4, 17.7, 4]), b = P([8 + i * 5.4, 17.7, 34]);
          d += `M${f1(a[0])} ${f1(a[1])}L${f1(b[0])} ${f1(b[1])}`;
        }
        return `<path d="${d}" stroke="#2B2780" stroke-width="0.5"/>`;
      },
    });
    C.sombra(48, 19, 58, 24, 0.2);
  },
  { yaw: 26, pitch: 22, s: 0.6 },
);

// esteira: plataforma com a lona, capa do motor, colunas, painel e corrimãos
const esteira = quadro(
  (C) => {
    C.caixa([0, 0, 0], [170, 16, 76], M.metalClaro);
    C.caixa([6, 16, 10], [166, 18, 66], M.borracha);
    C.caixa([140, 0, -2], [184, 26, 78], M.metal);
    for (const z of [0, 76]) {
      C.caixa([0, 14, z - 4], [170, 19, z], M.cromo);
      tubo(C, [168, 24, z], [190, 132, z + (z < 40 ? 6 : -6)], 7);
      tubo(C, [186, 112, z + (z < 40 ? 6 : -6)], [120, 112, z + (z < 40 ? 6 : -6)], 4, M.borracha);
    }
    C.prisma(retArred(26, 8, 2), [190, 138, 38], norm([-0.5, 0.3, 0]), norm([0.3, 0.9, 0]), [0, 0, 64].map((v) => v), M.metal);
    C.caixa([184, 140, 22], [192, 146, 54], M.acao);
    C.sombra(95, 38, 100, 46, 0.2);
  },
  { yaw: -28, pitch: 14, s: 0.6 },
);

export const TODOS = {
  halteres_fixos,
  anilhas_e_manoplas,
  kettlebell,
  caneleiras,
  banco_reto,
  banco_regulavel,
  banco_scott,
  banco_romano,
  estacao_polia_dupla,
  polia_simples,
  acessorio_polia_corda,
  acessorio_polia_triangulo,
  acessorio_polia_barra_reta,
  acessorio_polia_estribo,
  acessorio_polia_tornozeleira,
  estacao_puxada,
  estacao_remada,
  multifuncional,
  barra_fixa,
  barra_longa,
  barra_w,
  paralelas,
  barra_hexagonal,
  rack_de_agachamento,
  smith,
  leg_press,
  cadeira_extensora,
  mesa_flexora,
  cadeira_flexora,
  supino_maquina,
  voador,
  desenvolvimento_maquina,
  remada_articulada,
  graviton,
  rosca_maquina,
  triceps_maquina,
  abdominal_maquina,
  hack,
  cadeira_abdutora_adutora,
  gluteo_maquina,
  panturrilha_em_pe_maquina,
  panturrilha_sentada_maquina,
  elasticos,
  step,
  bola_suica,
  suspensao,
  mini_band,
  roda_abdominal,
  esteira,
};
void circulo;

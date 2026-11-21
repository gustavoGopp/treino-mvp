// Os 49 equipamentos, só o aparelho (escolha do Gustavo: o vídeo do guia mostra como usar). Mesmo estilo da 3ª
// rodada: vista 3/4, volume, tons por material, sombra macia, traço de espessura igual em todos. Os 7 aparelhos
// das amostras vêm de aparelhos.mjs (sem a pessoa); o kettlebell é o desenho 2D de lá.
// Medidas em cm, aproximadas de aparelhos reais (escolha de desenho, não especificação de fabricante).
import { MAT, V, camera, cena, f1, retArred, circulo } from '../../../src/engine/novo/realista/base.mjs';
import { ILUSTRACOES } from './aparelhos.mjs';

const { add, sub, mul, norm, cross, dot } = V;
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

// ---------- as máquinas de pilha do motor novo ----------
// Supino, desenvolvimento, remada articulada, tríceps e abdominal na máquina (redesenhados em 21/11/2026, aprovado pelo
// Gustavo: o cartão tem de ser a máquina da animação). Cada um é a peça do motor novo (src/engine/novo/pecas-de-cena/)
// só com o aparelho, nos eixos da peça, para as medidas baterem uma a uma: quem senta olha para +z, a borda da frente
// do assento fica em z = 0 e a esquerda de quem senta é +x. As medidas são as de src/engine/novo/dados/objetos/<peça>.json
// (lá, cada uma com a fonte e o tipo: medida de ficha ou de desenho); a regulagem (a altura do assento, a posição dos
// braços) é a do começo do movimento na animação, com o corpo da tabela. As placas ficam em repouso.
const RAD = Math.PI / 180;
/** Gira o vetor p em volta do eixo unitário k, em graus (a fórmula de Rodrigues, como `girar` de src/engine/novo/vec.ts). */
const girar = (p, k, graus) => {
  const c = Math.cos(graus * RAD),
    s = Math.sin(graus * RAD);
  return add(add(mul(p, c), mul(cross(k, p), s)), mul(k, dot(k, p) * (1 - c)));
};
/** Tubo quadrado da estrutura (7 cm, o `tubo` de todas as peças). */
const T = (C, a, b, w = 7) => C.tubo(a, b, w, w, M.metal);
/** A torre da pilha: quatro montantes de 34 × 32 cm, a tampa, as duas guias, as placas em repouso e o pino no alto. */
function torreDaPilha(C, x0, x1, zT, H, p = { placas: 15, altura: 75, larg: 26, prof: 12 }) {
  const z0 = zT - 16,
    z1 = zT + 16,
    xc = (x0 + x1) / 2;
  for (const [x, z] of [
    [x0, z0],
    [x1, z0],
    [x0, z1],
    [x1, z1],
  ])
    T(C, [x, 7, z], [x, H, z], 4.5);
  for (const z of [z0, z1]) T(C, [x0, H, z], [x1, H, z], 4.5);
  for (const x of [x0, x1]) T(C, [x, H, z0], [x, H, z1], 4.5);
  for (const dz of [-6, 6]) C.cilindro([xc, 7, zT + dz], [xc, H - 6, zT + dz], 0.8, M.cromo, { lados: 8 });
  C.pilha([xc - p.larg / 2, 9, zT + p.prof / 2], X, [0, 0, -1], p.larg, p.altura, p.prof, p.placas);
  C.cilindro([xc, 9 + p.altura, zT], [xc, 19 + p.altura, zT], 1.2, M.cromo, { lados: 8 });
}
/**
 * O assento num pé só, que sobe e desce: a luva parada, o tubo de dentro com o pino de regular (para a frente, pino = 1,
 * ou para trás, −1), a chapa e o estofado. zP: o meio do assento; y: o topo do estofado; yMin: o topo no mais baixo.
 */
function assentoNumPe(C, { zP, comp, larg, y, yMin, esp = 6.5, pino = 1, folga = 4 }) {
  T(C, [0, 7, zP], [0, yMin - esp - 6, zP], 9);
  T(C, [0, yMin - esp - 12, zP], [0, y - esp - 1, zP], 5.5);
  const zp = zP + (pino * 9) / 2;
  C.cilindro([0, yMin - esp - 12, zp], [0, yMin - esp - 12, zp + pino * 5], 1.6, M.cromo, { lados: 10 });
  C.cilindro([0, yMin - esp - 12, zp + pino * 5], [0, yMin - esp - 12, zp + pino * 7], 2.6, M.borracha, { lados: 12 });
  C.tubo([0, y - esp - 1.5, zP - comp / 2 + folga], [0, y - esp - 1.5, zP + comp / 2 - folga], (larg / 2) * 1.2, 2, M.metal);
  C.estofado([0, y - esp, zP], Z, Y, X, comp, esp, larg);
}

// As máquinas de empurrar e a de puxar sentado (src/engine/novo/pecas-de-cena/maquina-de-empurrar.ts e
// remada-articulada.ts): dois braços independentes, cada um girando no seu eixo, inclinado `converge` graus para o
// caminho dos pegadores convergir (ou abrir, na remada); o came no eixo do braço da esquerda e a torre ao lado.
// mod: eixo 'acima' (supino: o braço pende do alto), 'atras' (desenvolvimento: vai de trás para a frente) ou 'frente'
// (remada: pende do alto, à frente, e se puxa); `vertical`: o pegador de pé (a remada).
const ladoX = (k) => (k === 'R' ? -1 : 1);
const bracoX = (g, mod) => (mod.vertical ? g.pegadaMeia + g.bracoFora : g.pegadaMeia + g.pegadorComp / 2 + g.bracoFora);
function bracoDaMaquina(g, mod, k, graus) {
  const s = ladoX(k);
  const meio = g.bracoMeio * RAD;
  const b = mod.puxa ? [1, 0, 0] : [-1, 0, 0];
  const r = [0, -Math.cos(meio), (mod.puxa ? -1 : 1) * Math.sin(meio)];
  const dirEixo = norm(add(b, mul(norm(cross(b, r)), -s * Math.tan(g.converge * RAD))));
  const eixo = [s * bracoX(g, mod), g.eixoAltura, g.eixoAFrente];
  const ponta = add(eixo, girar(mul(r, g.bracoComp), dirEixo, graus - g.bracoMeio));
  const dirPegador = norm(girar([-s, 0, 0], dirEixo, graus - g.bracoMeio));
  if (!mod.vertical) return { eixo, dirEixo, ponta, dirPegador, centro: add(ponta, mul(dirPegador, g.bracoFora + g.pegadorComp / 2)) };
  const i = g.pegadorInclina * RAD;
  const dirBorracha = norm(add(mul(norm(sub(eixo, ponta)), Math.cos(i)), mul(dirPegador, Math.sin(i))));
  return { eixo, dirEixo, ponta, dirPegador, dirBorracha, centro: add(ponta, mul(dirPegador, g.bracoFora)) };
}
/** O mancal do braço no eixo e a ponta do eixo, cromada. */
function mancal(C, b, s) {
  C.cilindro(add(b.eixo, mul(b.dirEixo, -s * 4)), add(b.eixo, mul(b.dirEixo, s * 4)), 5.5, M.metalClaro, { lados: 20 });
  C.cilindro(add(b.eixo, mul(b.dirEixo, s * 4)), add(b.eixo, mul(b.dirEixo, s * 6)), 2.5, M.cromo, { lados: 12 });
}
/** O came no eixo do braço da esquerda (xCame) e o eixo dele. */
function cameNoEixo(C, xCame, yE, zE, r) {
  C.cilindro([xCame - 2.5, yE, zE], [xCame + 2.5, yE, zE], r, M.metalClaro, { lados: 24 });
  C.cilindro([xCame - 4, yE, zE], [xCame + 4, yE, zE], 2.5, M.cromo, { lados: 12 });
}
/** O cabo que sai por cima do came e passa pela roldana no alto da torre até o pino das placas. */
function caboPeloAlto(C, xCame, yE, zE, rCame, x0, x1, zT, H, altPilha) {
  const xc = (x0 + x1) / 2;
  C.linha([xCame, yE + rCame, zE], [xc, H + 10.5, zT], '#202327', 0.7);
  C.linha([xc, H + 1.5, zT], [xc, 19 + altPilha, zT], '#202327', 0.7);
  C.cilindro([xc, H + 6, zT - 1.5], [xc, H + 6, zT + 1.5], 4.5, M.metalClaro, { lados: 16 });
  T(C, [x0, H, zT], [x0, H + 6, zT], 4);
  T(C, [x0, H + 6, zT], [xc - 3, H + 6, zT], 3);
}

/**
 * Supino e desenvolvimento na máquina (maquina-de-empurrar.ts): o assento num pé, o encosto parado preso na coluna de
 * trás, a travessa dos eixos, os dois braços com o pegador atravessado e a torre à esquerda, atrás do assento.
 */
function maquinaDeEmpurrar(C, g, mod, reg) {
  const esp = g.estofadoEsp,
    cA = g.assentoComp,
    meiaLarg = g.assentoLarg / 2;
  const inc = g.encostoInclina * RAD;
  const sobe = [0, Math.cos(inc), -Math.sin(inc)],
    frente = [0, Math.sin(inc), Math.cos(inc)];
  const baseEnc = [0, g.encostoBaixo, -g.encostoAtras];
  const xB = bracoX(g, mod),
    yE = g.eixoAltura,
    zE = g.eixoAFrente;
  const atras = mod.eixo === 'atras';
  const zColuna = atras ? zE : Math.min(baseEnc[2], add(baseEnc, mul(sobe, g.encostoComp))[2]) - esp - 8;
  const yTopo = atras ? yE + 10 : yE + 4;
  const xT0 = xB + 16,
    xT1 = xT0 + 34,
    zTorre = atras ? -70 : -60;
  const zTras = Math.min(zColuna, zTorre - 16) - 6,
    zFrente = zTras + g.comp;
  // a base no chão: dois trilhos ao longo de z, as travessas e o pé da torre
  const zB1 = Math.max(4, baseEnc[2] + cA * 0.25);
  for (const x of [-meiaLarg + 2, xT1]) T(C, [x, 3.5, zTras], [x, 3.5, zB1]);
  for (const z of [zTras + 4, zB1]) T(C, [-meiaLarg + 2, 3.5, z], [xT1, 3.5, z]);
  T(C, [xT0, 3.5, zTorre - 16], [xT0, 3.5, zTorre + 16]);
  assentoNumPe(C, { zP: -cA / 2, comp: cA, larg: g.assentoLarg, y: reg.assento, yMin: g.assentoMin, esp });
  // a coluna de trás e o encosto preso nela
  T(C, [0, 7, zColuna], [0, yTopo, zColuna], 8);
  const meioEnc = add(baseEnc, mul(sobe, g.encostoComp / 2));
  C.estofado(add(meioEnc, mul(frente, -esp)), sobe, frente, X, g.encostoComp, esp, g.assentoLarg - 4);
  const atrasEnc = add(meioEnc, mul(frente, -esp - 2));
  C.tubo(add(atrasEnc, mul(sobe, -g.encostoComp * 0.35)), add(atrasEnc, mul(sobe, g.encostoComp * 0.35)), 12, 2, M.metal, { up: frente });
  for (const t of [-0.25, 0.25]) {
    const p = add(atrasEnc, mul(sobe, g.encostoComp * t));
    T(C, p, [0, p[1], zColuna], 5);
  }
  // o alto: a travessa dos eixos e o que a segura
  if (!atras) T(C, [0, yTopo, zColuna], [0, yTopo, zE]);
  T(C, [-(xB - 6), yE, zE], [xB - 6, yE, zE]);
  T(C, [0, yTopo, zE], [0, yE, zE]);
  // os dois braços, do eixo à ponta, com o pegador atravessado (a borracha)
  for (const k of ['R', 'L']) {
    const b = bracoDaMaquina(g, mod, k, reg.braco);
    mancal(C, b, ladoX(k));
    C.tubo(b.eixo, b.ponta, 6, 6, M.metal, { up: b.dirEixo });
    C.cilindro(add(b.ponta, mul(b.dirPegador, -2)), add(b.ponta, mul(b.dirPegador, g.bracoFora)), 2, M.cromo, { lados: 12 });
    const ini = add(b.ponta, mul(b.dirPegador, g.bracoFora));
    C.cilindro(ini, add(ini, mul(b.dirPegador, g.pegadorComp)), g.pegadorDiam / 2, M.borracha, { lados: 14 });
    C.cilindro(add(ini, mul(b.dirPegador, g.pegadorComp)), add(ini, mul(b.dirPegador, g.pegadorComp + 1.2)), g.pegadorDiam / 2 + 0.5, M.borracha, { lados: 14 });
  }
  // a torre, o came e o cabo: pelo alto (supino) ou pelo pé da torre (desenvolvimento)
  torreDaPilha(C, xT0, xT1, zTorre, g.alturaTorre);
  const xCame = xB + 9,
    rCame = g.cameDiam / 2;
  cameNoEixo(C, xCame, yE, zE, rCame);
  const xc = (xT0 + xT1) / 2;
  C.cilindro([xc - 1.5, 10, zTorre + 18], [xc + 1.5, 10, zTorre + 18], 4.5, M.metalClaro, { lados: 16 });
  if (!atras) caboPeloAlto(C, xCame, yE, zE, rCame, xT0, xT1, zTorre, g.alturaTorre, 75);
  else {
    C.linha([xCame, yE - rCame, zE], [xCame, 5.5, zE], '#202327', 0.7);
    C.linha([xCame, 5.5, zE], [xc, 5.5, zTorre + 18], '#202327', 0.7);
    C.cilindro([xCame - 1.5, 10, zE], [xCame + 1.5, 10, zE], 4.5, M.metalClaro, { lados: 16 });
    T(C, [xCame, 3.5, zE], [xT0, 3.5, zE], 5);
  }
  C.sombra((xT1 - xB) / 2, (zTras + zFrente) / 2, (xT1 + xB) / 2 + 6, g.comp / 2, 0.18);
}
// medidas de src/engine/novo/dados/objetos/supino-maquina.json: o tamanho das fichas (Life Fitness SS-CP 144 × 144,
// Precor RSL0414: a torre de 148 cm, o estofado de 6,5 cm, o caminho que converge); o eixo, o braço e o encosto são de
// desenho, com o motivo lá
const SUPINO = {
  comp: 144, alturaTorre: 148, estofadoEsp: 6.5, converge: 8, assentoComp: 40, assentoLarg: 40, assentoMin: 36,
  encostoInclina: 15, encostoBaixo: 60, encostoComp: 64, encostoAtras: 36, eixoAltura: 145, eixoAFrente: -12,
  bracoComp: 54, bracoMeio: 12, pegadaMeia: 30, pegadorComp: 13, pegadorDiam: 3.4, bracoFora: 3, cameDiam: 26,
};
// supino na máquina, de pilha (era de anilhas): o eixo dos braços no alto, um pouco à frente do peito, e cada braço
// pende dele com o pegador na altura do peito (o começo do movimento: os braços a 7°, o assento a 46 cm)
const supino_maquina = quadro((C) => maquinaDeEmpurrar(C, SUPINO, { eixo: 'acima' }, { assento: 46, braco: 7 }), { yaw: 150, pitch: 12, s: 0.6 });

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

// medidas de src/engine/novo/dados/objetos/desenvolvimento-maquina.json: o tamanho das fichas (Life Fitness SS-SP
// 164 × 145, Precor RSL0515: o "overhead pivot", a torre de 148 cm, o estofado de 6,5 cm); o eixo, o braço e o encosto
// são de desenho, com o motivo lá
const DESENVOLVIMENTO = {
  comp: 164, alturaTorre: 148, estofadoEsp: 6.5, converge: 8, assentoComp: 40, assentoLarg: 40, assentoMin: 36,
  encostoInclina: 12, encostoBaixo: 60, encostoComp: 72, encostoAtras: 36, eixoAltura: 123, eixoAFrente: -95,
  bracoComp: 72, bracoMeio: 90, pegadaMeia: 28, pegadorComp: 13, pegadorDiam: 3.4, bracoFora: 3, cameDiam: 32,
};
// desenvolvimento na máquina, de pilha (era de anilhas): o eixo atrás do encosto, alto, e cada braço vem dele para a
// frente, ao lado da cabeça, com o pegador acima do ombro (o começo do movimento: os braços a 82°, o assento a 47 cm)
const desenvolvimento_maquina = quadro((C) => maquinaDeEmpurrar(C, DESENVOLVIMENTO, { eixo: 'atras' }, { assento: 47, braco: 82 }), { yaw: 210, pitch: 12, s: 0.6 });

// medidas de src/engine/novo/dados/objetos/remada-articulada.json: o tamanho das fichas (Life Fitness SS-RW 124 × 140,
// Precor RSL0310: a torre de 148 cm, o estofado de 6,5 cm, o caminho que se abre); o assento (38,1 × 22,9 cm), o apoio
// do peito (25,4 × 19,4 cm) e o pegador (3,2 cm), da lista de peças da Life Fitness SS-RW; o eixo, a coluna e o braço
// dobrado são de desenho, com o motivo lá
const REMADA = {
  alturaTorre: 148, estofadoEsp: 6.5, assentoComp: 22.9, assentoLarg: 38.1, apoioComp: 25.4, apoioLarg: 19.4,
  pegadorDiam: 3.2, converge: 2, assentoMin: 36, apoioInclina: 10, apoioBaixo: 82, eixoAltura: 168, eixoAFrente: 36,
  colunaAvanca: 40, bracoComp: 76, bracoDobra: 20, bracoDobraEm: 50, bracoMeio: 0, pegadaMeia: 21, pegadorComp: 14,
  pegadorInclina: 20, bracoFora: 9, cameDiam: 26,
};
// remada articulada, de pilha (era de anilhas; remada-articulada.ts): o assento baixo num pé, o apoio do peito na frente
// (corre num tubo que sai da coluna, com o botão de regular), a coluna reta na frente e a viga que volta até o eixo no
// alto, os braços dobrados que pendem dele com os pegadores de pé, e a torre à esquerda, depois da coluna. O começo do
// movimento da animação: os braços a −18,5°, o assento a 48,6 cm, o apoio do peito a 8,7 cm da borda do assento.
const remada_articulada = quadro(
  (C) => {
    const g = REMADA,
      mod = { eixo: 'frente', puxa: true, vertical: true };
    const reg = { assento: 48.6, apoio: 8.7, braco: -18.5 };
    const esp = g.estofadoEsp,
      cA = g.assentoComp,
      zP = -cA / 2;
    const xB = bracoX(g, mod),
      yE = g.eixoAltura,
      zE = g.eixoAFrente;
    const pe = [0, 3.5, zE + g.colunaAvanca],
      topo = [0, yE + 10, zE + g.colunaAvanca],
      viga = [0, yE + 10, zE];
    const xT0 = xB + 16,
      xT1 = xT0 + 34,
      zTorre = pe[2] + 24;
    const zTras = zP - cA / 2 - 8,
      zFrente = zTorre + 22;
    // a base: a espinha ao longo de z, a travessa de trás do assento, a do pé da coluna e as da torre
    T(C, [0, 3.5, zTras + 4], [0, 3.5, zTorre + 16]);
    T(C, [-g.assentoLarg / 2 + 4, 3.5, zTras + 4], [g.assentoLarg / 2 - 4, 3.5, zTras + 4]);
    T(C, [-(xB + 6), 3.5, pe[2]], [xT1, 3.5, pe[2]]);
    for (const z of [zTorre - 12, zTorre + 12]) T(C, [0, 3.5, z], [xT1, 3.5, z]);
    assentoNumPe(C, { zP, comp: cA, larg: g.assentoLarg, y: reg.assento, yMin: g.assentoMin, esp, pino: -1, folga: 3 });
    // a coluna da frente, a viga que volta até em cima do eixo e a travessa do eixo
    T(C, pe, add(topo, [0, 3.5, 0]), 8);
    T(C, add(topo, [0, 0, 3.5]), add(viga, [0, 0, -3.5]));
    T(C, viga, [0, yE, zE]);
    T(C, [-(xB - 6), yE, zE], [xB + 13, yE, zE]);
    // o apoio do peito: o estofado (o alto inclinado 10° à frente), a chapa, o tubo que corre na luva e o botão
    const inc = g.apoioInclina * RAD;
    const sobe = [0, Math.cos(inc), Math.sin(inc)],
      tras = [0, Math.sin(inc), -Math.cos(inc)];
    const meioApoio = add([0, g.apoioBaixo, reg.apoio], mul(sobe, g.apoioComp / 2));
    C.estofado(add(meioApoio, mul(tras, -esp)), sobe, tras, X, g.apoioComp, esp, g.apoioLarg);
    const atrasApoio = add(meioApoio, mul(tras, -esp - 1.5));
    C.tubo(add(atrasApoio, mul(sobe, -g.apoioComp * 0.32)), add(atrasApoio, mul(sobe, g.apoioComp * 0.32)), 10, 2, M.metal, { up: mul(tras, -1) });
    const yA = meioApoio[1],
      zLuva = pe[2] - 4.5;
    T(C, [0, yA, atrasApoio[2]], [0, yA, zLuva + 6], 4.5);
    T(C, [0, yA, zLuva - 9], [0, yA, zLuva + 2], 6.5);
    C.cilindro([0, yA + 3.2, zLuva - 6], [0, yA + 7, zLuva - 6], 1.4, M.cromo, { lados: 10 });
    C.cilindro([0, yA + 7, zLuva - 6], [0, yA + 9.5, zLuva - 6], 2.6, M.borracha, { lados: 12 });
    // os braços: o tubo dobrado (sai do eixo 20° à frente e dobra a 50 cm dele), o toco e o pegador de pé
    for (const k of ['R', 'L']) {
      const b = bracoDaMaquina(g, mod, k, reg.braco);
      mancal(C, b, ladoX(k));
      const K = add(b.eixo, mul(girar(norm(sub(b.ponta, b.eixo)), b.dirEixo, -g.bracoDobra), g.bracoDobraEm));
      C.tubo(b.eixo, K, 6, 6, M.metal, { up: b.dirEixo });
      C.cilindro(add(K, mul(b.dirEixo, -3)), add(K, mul(b.dirEixo, 3)), 3, M.metal, { lados: 14 });
      C.tubo(K, add(b.ponta, mul(b.dirBorracha, -3)), 6, 6, M.metal, { up: b.dirEixo });
      C.cilindro(add(b.ponta, mul(b.dirPegador, -2)), b.centro, 2, M.cromo, { lados: 12 });
      const m = g.pegadorComp / 2,
        r = g.pegadorDiam / 2;
      C.cilindro(add(b.centro, mul(b.dirBorracha, -m)), add(b.centro, mul(b.dirBorracha, m)), r, M.borracha, { lados: 14 });
      for (const sx of [-1, 1]) C.cilindro(add(b.centro, mul(b.dirBorracha, sx * m)), add(b.centro, mul(b.dirBorracha, sx * (m + 1.2))), r + 0.5, M.borracha, { lados: 14 });
    }
    // a torre à esquerda, depois da coluna; o came no eixo do braço da esquerda e o cabo pelo alto
    torreDaPilha(C, xT0, xT1, zTorre, g.alturaTorre);
    cameNoEixo(C, xB + 9, yE, zE, g.cameDiam / 2);
    caboPeloAlto(C, xB + 9, yE, zE, g.cameDiam / 2, xT0, xT1, zTorre, g.alturaTorre, 75);
    C.sombra((xT1 - xB) / 2, (zTras + zFrente) / 2, (xT1 + xB) / 2 + 6, (zFrente - zTras) / 2, 0.18);
  },
  { yaw: 230, pitch: 12, s: 0.6 },
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

// máquina de tríceps com o braço apoiado à frente (a extensão do cotovelo sentado, como a ficha da técnica e a animação
// triceps-maquina: Hammer Strength HS-TE, Precor RSL0208), no lugar da de mergulho sentado (pegadores ao lado do
// quadril) que o cartão mostrava. É a peça do motor novo (triceps-maquina.ts, a máquina de rosca com outro modelo), com
// as medidas de src/engine/novo/dados/objetos/triceps-maquina.json: o tamanho e a torre de 148 cm da Precor RSL0208
// (122 × 110 × 148 cm), o estofado de 6,5 cm; o apoio dos braços partido no meio, inclinado 40°, o eixo a 84 cm na linha
// dos cotovelos, o came de 22 cm, os pegadores em pé numa barra atravessada e o apoio da lombar atrás do assento são de
// desenho, com o motivo lá. O começo do movimento da animação: o assento a 47 cm, a mão a 33,7 cm do eixo, a alavanca
// a 148° (para cima e para trás).
const triceps_maquina = quadro(
  (C) => {
    const esp = 6.5,
      cA = 38,
      larg = 40,
      assento = 47;
    // o apoio dos braços: desce 40° para a frente; o eixo 4 cm acima da face e 2 cm além da borda de baixo
    const inc = 40 * RAD;
    const sobe = [0, Math.sin(inc), -Math.cos(inc)],
      normal = [0, Math.cos(inc), Math.sin(inc)];
    const eixo = [0, 84, 14];
    const bordaBaixo = add(add(eixo, mul(normal, -4)), mul(sobe, 2));
    const meioFace = add(bordaBaixo, mul(sobe, 13));
    const xMetade = 21,
      meiaMetade = 7,
      xAlavanca = 38,
      xCame = 33,
      xC = 30;
    // a torre à esquerda de quem senta, ao lado e atrás do assento
    const xT0 = xCame,
      xT1 = xT0 + 34,
      zTorre = -cA - 10;
    const zTras = zTorre - 20,
      zFrente = zTras + 122,
      zB1 = eixo[2] + 4;
    const atrasApoio = add(add(bordaBaixo, mul(normal, -esp - 3)), mul(sobe, 3));
    // a base: dois trilhos ao longo de z e as travessas
    for (const x of [-larg / 2 + 2, xC]) T(C, [x, 3.5, zTras], [x, 3.5, zB1]);
    for (const z of [zTras + 4, zB1]) T(C, [-larg / 2 + 2, 3.5, z], [xT1, 3.5, z]);
    T(C, [xT0, 3.5, zTorre - 16], [xT0, 3.5, zTorre + 16]);
    assentoNumPe(C, { zP: -cA / 2, comp: cA, larg, y: assento, yMin: 40, esp, pino: -1 });
    // o apoio da lombar: 22 × 30 cm, 6 cm acima do assento, 30 cm atrás da borda, inclinado 15°; sobe com o assento
    const il = 15 * RAD;
    const lSobe = [0, Math.cos(il), Math.sin(il)],
      lFrente = [0, -Math.sin(il), Math.cos(il)];
    const lMeio = [0, assento + 6 + 11, -30];
    C.estofado(add(lMeio, mul(lFrente, -esp)), lSobe, lFrente, X, 22, esp, 30);
    const lAtras = add(lMeio, mul(lFrente, -esp - 2));
    T(C, [0, assento - esp - 4, -cA / 2], [0, assento - esp - 4, lAtras[2]], 5);
    T(C, [0, assento - esp - 4, lAtras[2]], lAtras, 5);
    // a coluna da esquerda até o apoio, com o mancal do eixo
    T(C, [xC, 7, atrasApoio[2]], [xC, Math.max(atrasApoio[1], eixo[1]) + 3, atrasApoio[2]]);
    T(C, [xC, eixo[1], atrasApoio[2]], [xC, eixo[1], eixo[2]], 6);
    C.cilindro([xC, eixo[1], eixo[2]], [xCame - 3, eixo[1], eixo[2]], 3, M.cromo, { lados: 12 });
    // as duas metades do apoio (o peito passa no vão de 28 cm), cada uma na sua chapa, e a travessa que as segura
    for (const sx of [-1, 1]) {
      const x = [sx * xMetade, 0, 0];
      C.estofado(add(add(meioFace, mul(normal, -esp)), x), sobe, normal, X, 26, esp, 2 * meiaMetade);
      const chapa = add(add(meioFace, mul(normal, -esp - 1)), x);
      C.tubo(add(chapa, mul(sobe, -11)), add(chapa, mul(sobe, 9)), 2 * meiaMetade - 4, 2, M.metal, { up: normal });
      T(C, add(atrasApoio, x), add(add(atrasApoio, x), mul(normal, 3)), 4);
    }
    T(C, [xC, atrasApoio[1], atrasApoio[2]], [-xMetade - 3, atrasApoio[1], atrasApoio[2]], 5);
    // a torre, as polias do pé e o cabo, que desce do came
    torreDaPilha(C, xT0, xT1, zTorre, 148);
    const xc = (xT0 + xT1) / 2;
    C.cilindro([xc - 1.5, 10, zTorre + 18], [xc + 1.5, 10, zTorre + 18], 4.5, M.metalClaro, { lados: 16 });
    C.cilindro([xCame - 1.5, 10, eixo[2]], [xCame + 1.5, 10, eixo[2]], 4.5, M.metalClaro, { lados: 16 });
    T(C, [xCame, 3.5, eixo[2]], [xCame, 3.5, zB1], 5);
    C.linha([xCame, eixo[1] - 11, eixo[2]], [xCame, 5.5, eixo[2]], '#202327', 0.7);
    C.linha([xCame, 5.5, eixo[2]], [xc, 5.5, zTorre + 18], '#202327', 0.7);
    // o came, o eixo e a alavanca, do lado de fora, até a barra atravessada com os dois pegadores em pé
    const cx = (x) => [x, eixo[1], eixo[2]];
    C.cilindro(cx(xCame - 3), cx(xCame + 3), 11, M.metalClaro, { lados: 24 });
    C.cilindro(cx(xCame + 3), cx(xAlavanca + 3), 3, M.cromo, { lados: 12 });
    const dir = (graus) => [0, -Math.cos(graus * RAD), Math.sin(graus * RAD)];
    const noPlano = add(eixo, mul(dir(148), 33.7));
    const dirNeutro = dir(148 + 90);
    const barra = add(noPlano, mul(dirNeutro, -(13 / 2 + 3)));
    const ponta = [xAlavanca, barra[1], barra[2]];
    C.tubo(cx(xAlavanca), ponta, 5, 5, M.metal, { up: X });
    C.cilindro(add(ponta, [2.5, 0, 0]), [-21, barra[1], barra[2]], 1.5, M.cromo, { lados: 12 });
    for (const s of [-1, 1]) {
      const c = [s * 19, noPlano[1], noPlano[2]];
      const pe = add(c, mul(dirNeutro, -6.5));
      C.cilindro([c[0], barra[1], barra[2]], pe, 1.4, M.cromo, { lados: 10 });
      C.cilindro(pe, add(c, mul(dirNeutro, 6.5)), 2, M.borracha, { lados: 14 });
    }
    C.sombra((xT1 - larg / 2) / 2, (zTras + zFrente) / 2, (xT1 + larg / 2) / 2 + 8, 61, 0.18);
  },
  { yaw: 230, pitch: 12, s: 0.6 },
);

// máquina de abdominal com o eixo baixo, ao lado da lombar, e o apoio da lombar (o manual público da Life Fitness,
// Insignia SS-AB, p. 8), no lugar do braço que girava num eixo alto, atrás da cabeça. É a peça do motor novo
// (abdominal-maquina.ts), com as medidas de src/engine/novo/dados/objetos/abdominal-maquina.json: o tamanho e a torre
// de 148 cm da Life Fitness SS-AB (133 × 117 × 148 cm), o estofado de 6,5 cm (Precor); as almofadas do peito (16 × 9
// cm), os pegadores, os rolos dos pés, o came e as hastes 7 cm por fora dos ombros são de desenho, com o motivo lá. O
// que sai do corpo da tabela é o que a animação calcula no começo do movimento (o tronco reto), arredondado: o assento a
// 40,3 cm, o apoio da lombar a 63,2 cm, o eixo a 75,4 cm do chão e 25,6 cm atrás da borda do assento, as almofadas
// sobre o peito, os pegadores logo abaixo delas e os rolos sobre o peito do pé.
const abdominal_maquina = quadro(
  (C) => {
    const esp = 6.5,
      assento = 40.3;
    const eixo = [0, 75.4, -25.6],
      lombar = [0, 63.2, -32.3],
      rolos = [0, 11.9, 27.3];
    const xb = 44.8,
      zTras = eixo[2] - 30,
      zFrente = zTras + 133;
    // a torre à esquerda de quem senta, atrás do eixo, com a frente virada para o assento
    const xT0 = 117 - 20 - 8 - 34,
      xT1 = xT0 + 34,
      zTorre = zTras + 22,
      xC = xb + 6;
    // a base: um trilho sob cada montante, as travessas até a torre e o pé dela
    for (const x of [-xb, xb]) T(C, [x, 3.5, zTras], [x, 3.5, rolos[2] + 6]);
    for (const z of [zTras + 4, eixo[2]]) T(C, [-xb, 3.5, z], [xT1, 3.5, z]);
    for (const x of [xT0, xT1]) T(C, [x, 3.5, zTorre - 16], [x, 3.5, zTorre + 16]);
    // o pé do assento e o assento (40 × 40 cm)
    T(C, [0, 7, -20], [0, assento - esp - 2, -20]);
    T(C, [-xb, 3.5, -20], [xb, 3.5, -20]);
    C.estofado([0, assento - esp, -20], Z, Y, X, 40, esp, 40);
    // os dois montantes do eixo, dos lados, e o apoio da lombar (20 × 30 cm) numa travessa entre eles
    for (const x of [-xb - 4, xb + 4]) T(C, [x, 7, eixo[2]], [x, eixo[1] + 4, eixo[2]], 6);
    const lt = [0, lombar[1], lombar[2] - esp - 3];
    T(C, [-xb - 4, lt[1], lt[2]], [xb + 4, lt[1], lt[2]], 5);
    for (const x of [-xb - 4, xb + 4]) T(C, [x, lt[1], lt[2]], [x, lt[1], eixo[2]], 5);
    C.estofado([0, lombar[1], lombar[2] - esp], Y, Z, X, 20, esp, 30);
    // os rolos dos pés (Ø 10 × 14 cm): a haste que sai da frente da base e os dois rolos
    T(C, [0, 3.5, -20], [0, 3.5, rolos[2]], 5);
    T(C, [0, 3.5, rolos[2]], rolos, 4.5);
    for (const s of [-1, 1]) C.cilindro(add(rolos, [s * 1.5, 0, 0]), add(rolos, [s * 15.5, 0, 0]), 5, M.estofado, { lados: 18 });
    C.cilindro(add(rolos, [-15.5, 0, 0]), add(rolos, [15.5, 0, 0]), 1.2, M.cromo, { lados: 10 });
    // a torre, a polia do pé e o cabo, que desce do came (Ø 20 cm)
    torreDaPilha(C, xT0, xT1, zTorre, 148);
    const xc = (xT0 + xT1) / 2;
    C.cilindro([xc - 1.5, 10, zTorre + 18], [xc + 1.5, 10, zTorre + 18], 4.5, M.metalClaro, { lados: 16 });
    C.linha([xC + 1, eixo[1] - 10, eixo[2]], [xC + 1, 5.5, eixo[2]], '#202327', 0.7);
    C.linha([xC + 1, 5.5, eixo[2]], [xc, 5.5, zTorre + 18], '#202327', 0.7);
    const cx = (x) => [x, eixo[1], eixo[2]];
    C.cilindro(cx(xC - 3), cx(xC + 3), 10, M.metalClaro, { lados: 24 });
    C.cilindro(cx(-xb - 7), cx(xC + 5), 2.4, M.cromo, { lados: 12 });
    // o braço: cada haste sobe do eixo pelo lado do corpo até a altura das almofadas, vem para a frente por fora do braço
    // de quem treina e volta até a borda de fora da almofada; a almofada (16 × 9 cm) e o pegador logo abaixo dela
    for (const s of [-1, 1]) {
      const alm = [s * 7.5, 92, -8.5];
      const borda = [s * 12, 92, alm[2] + esp / 2];
      const pts = [[s * xb, eixo[1], eixo[2]], [s * xb, 92, eixo[2]], [s * xb, 92, borda[2]], borda];
      for (let i = 0; i + 1 < pts.length; i++) C.tubo(pts[i], pts[i + 1], 5, 5, M.metal, { up: Z });
      C.estofado(alm, Y, Z, X, 16, esp, 9);
      const peg = [s * 13, 82.8, 5.7],
        e = norm([0, 0.7, 0.71]);
      C.tubo(add(alm, [0, -6, esp]), add(peg, mul(e, -10)), 3.5, 3.5, M.metal);
      C.cilindro(add(peg, mul(e, -10)), add(peg, mul(e, -7)), 1.6, M.metal, { lados: 10 });
      C.cilindro(add(peg, mul(e, -7)), add(peg, mul(e, 7)), 1.6, M.borracha, { lados: 12 });
    }
    C.sombra((xT1 - xb) / 2, (zTras + zFrente) / 2, (xT1 + xb) / 2 + 8, 66.5, 0.18);
  },
  { yaw: 230, pitch: 12, s: 0.6 },
);

// glúteo na máquina (coice), de quatro apoios (decisão do Gustavo em 21/11/2026: a máquina da ficha da técnica e da
// animação do coice-maquina). Medidas da peça do motor novo (src/engine/novo/dados/objetos/gluteo-maquina.json):
// torre de 148 cm na frente, os apoios dos antebraços a 50 cm com os pegadores, a almofada só sob o joelho de apoio,
// e a alavanca do lado de fora da perna que trabalha, girando num eixo a 74 cm (a linha do quadril), com a
// plataforma do pé a 66 cm do eixo.
const gluteo_maquina = quadro(
  (C) => {
    base(C, -34, 138, 10, 70);
    torre(C, [-36, 0, 24], X, Z, 30, 32, 148, 10);
    // apoios dos antebraços com os pegadores em pé na ponta da frente
    tubo(C, [32, 4, 40], [32, 40, 40], 7);
    tubo(C, [32, 40, 29], [32, 40, 51], 5);
    for (const s of [-1, 1]) {
      const z = 40 + s * 11;
      C.estofado([32, 43, z], X, Y, Z, 34, 6.5, 11);
      tubo(C, [14, 44, z], [14, 50, z], 3);
      pega(C, [14, 50, z], [14, 63, z], 2.2);
    }
    // almofada dos joelhos, só do lado da perna de apoio
    tubo(C, [90, 4, 31], [90, 21, 31], 7);
    C.estofado([90, 21.2, 31], X, Y, Z, 36, 6.5, 18);
    // coluna do eixo, o came e a alavanca, do lado de fora da perna que trabalha
    tubo(C, [90, 4, 67], [90, 70, 67], 7);
    C.cilindro([90, 74, 62], [90, 74, 72], 11, M.metalClaro, { lados: 20 });
    const r = norm([Math.cos((50 * Math.PI) / 180), -Math.sin((50 * Math.PI) / 180), 0]);
    const t = [-r[1], r[0], 0];
    const fim = add([90, 74, 61], mul(r, 66));
    tubo(C, [90, 74, 61], fim, 5);
    tubo(C, fim, add(fim, [0, 0, -6]), 4);
    // plataforma do pé (borracha), de frente para a sola
    C.prisma(retArred(24, 3, 1), add(fim, [0, 0, -5]), r, t, [0, 0, -15], M.plataforma);
    C.sombra(52, 40, 92, 34, 0.2);
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

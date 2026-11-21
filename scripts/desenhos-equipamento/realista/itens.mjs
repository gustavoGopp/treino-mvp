// Os 49 equipamentos, só o aparelho (escolha do Gustavo: o vídeo do guia mostra como usar). Mesmo estilo da 3ª
// rodada: vista 3/4, volume, tons por material, sombra macia, traço de espessura igual em todos. Os 7 aparelhos
// das amostras vêm de aparelhos.mjs (sem a pessoa); o kettlebell é o desenho 2D de lá.
// Medidas em cm, aproximadas de aparelhos reais (escolha de desenho, não especificação de fabricante).
import { MAT, V, camera, cena, f1, retArred, circulo } from '../../../src/engine/novo/realista/base.mjs';
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

// barra hexagonal (decisão do Gustavo em 21/11/2026: o cartão igual à peça da animação). Medidas da peça do motor novo
// (src/engine/novo/dados/objetos/barra-hexagonal.json, a página da Rogue TB-1 Trap Bar 2.0, e pecas-de-cena/
// barra-hexagonal.ts): 226,1 cm de ponta a ponta, 72,4 cm de largura, tubo quadrado de 3,81 cm, os cabos de 3,4 cm
// atravessando o hexágono da frente para trás, a 63,5 cm um do outro, mangas de 4,85 cm com 40,6 cm carregáveis.
// De desenho na peça: o hexágono de 128 cm de ponta a ponta, pontas de 120°, o batente de 7 × 2,5 cm. Toda preta,
// como a Rogue (o metal grafite das máquinas). As anilhas (uma de 20 kg de cada lado, 45 cm) e a presilha são as da
// barra longa (barra-longa.json). Como no cartão de antes, a barra no chão, apoiada nas anilhas. Escolha do cartão: a
// câmera um pouco mais de frente que a de antes (com o comprimento real, a barra de lado ficava fina e miúda) e o
// enquadramento pela barra e pelas anilhas (a sombra comprida pode sair do quadro).
const barra_hexagonal = quadro(
  (C) => {
    const rAn = 22.5, eAn = 5.4, y = rAn;
    const tb = 3.81, rc = 3.4 / 2, rm = 4.85 / 2;
    const ponta = 128 / 2, meia = 226.1 / 2, iniManga = meia - 40.6, iniBatente = iniManga - 2.5;
    // os cantos do hexágono, a meio do tubo: [ao longo das mangas (z), ao longo dos cabos (x)]
    const t = 72.4 / 2 - tb / 2, s0 = ponta - t / Math.tan(Math.PI / 3);
    const Q = ([s, tt]) => [tt, y, s];
    const cantos = [[ponta, 0], [s0, t], [-s0, t], [-ponta, 0], [-s0, -t], [s0, -t]].map(Q);
    for (let i = 0; i < 6; i++) {
      const a = cantos[i], b = cantos[(i + 1) % 6], d = norm(sub(b, a));
      C.tubo(add(a, mul(d, -tb / 2)), add(b, mul(d, tb / 2)), tb, tb, M.metal, { up: Y });
    }
    for (const q of cantos) C.tubo(add(q, [0, -tb / 2 - 0.05, 0]), add(q, [0, tb / 2 + 0.05, 0]), tb * 1.12, tb * 1.12, M.metal, { up: Z });
    const zc = 72.4 / 2 - tb;
    for (const s of [-1, 1]) {
      // o cabo, de uma face de dentro da moldura à outra, com a recartilha onde a mão fecha
      const z = (s * 63.5) / 2;
      C.cilindro([-zc, y, z], [zc, y, z], rc, M.metal, { lados: 12, up: Y, dz: 6 });
      C.linha([-6, y + rc + 0.02, z], [6, y + rc + 0.02, z], '#8C939D', 0.8);
      // o pé da manga, o batente, a parte carregável, a anilha e a presilha
      C.cilindro([0, y, s * ponta], [0, y, s * iniBatente], rm, M.metal, { lados: 14, up: Y });
      C.cilindro([0, y, s * iniBatente], [0, y, s * iniManga], 7 / 2, M.metal, { lados: 14, up: Y });
      C.cilindro([0, y, s * iniManga], [0, y, s * meia], rm, M.metal, { lados: 14, up: Y });
      const a = [0, y, s * iniManga], b = [0, y, s * (iniManga + eAn)];
      C.anilha(s < 0 ? b : a, s < 0 ? a : b, rAn, M.anilha, { up: Y });
      const d0 = iniManga + eAn + 0.3;
      C.cilindro([0, y, s * d0], [0, y, s * (d0 + 5)], rm + 0.7, M.metalClaro, { lados: 12, up: Y });
      C.linha([0, y + rm + 0.5, s * (d0 + 2.5)], [0, y + 7, s * (d0 + 2.5)], M.metalClaro[3], 0.9);
    }
    C.sombra(0, 0, 30, 30 + meia, 0.2);
  },
  { yaw: 38, pitch: 30, s: 0.6 },
  [[-36.2, 0, -64], [36.2, 0, 64], ...[-1, 1].flatMap((s) => [[0, 0, s * 72.45], [0, 45, s * 72.45], [0, 22.5, s * 113.05]])],
);

// ================= máquinas =================
const leg_press = (id) => ILUSTRACOES.leg_press(id, { pessoa: false });
const hack = (id) => ILUSTRACOES.hack(id, { pessoa: false });
const graviton = (id) => ILUSTRACOES.graviton(id, { pessoa: false });
const cadeira_abdutora_adutora = (id) => ILUSTRACOES.cadeira_abdutora_adutora(id, { pessoa: false });

// suporte de agachamento, aberto (decisão do Gustavo em 18/11/2026, "aprovo", e em 21/11 para o cartão: o suporte das
// fichas e da animação, no lugar da gaiola de quatro colunas). Medidas da peça do motor novo
// (src/engine/novo/dados/objetos/suporte.json e pecas-de-cena/suporte.ts): montantes de 192 cm (Life Fitness LBR-OS),
// quadro do chão de 150 cm (Hammer Strength OSR), 110 cm de vão entre os montantes e furos a cada 2,5 cm (IPF 2026),
// pinos de segurança de 50 cm; de desenho na peça: o tubo de 7,5 cm, o gancho em J (9 × 13 cm, borda de 4 cm), o furo de
// 1,6 cm e o pino de 5 cm. A regulagem é a do agachamento com barra na animação (o berço dos ganchos a 130 cm, o topo
// dos pinos a 90 cm). A barra nos ganchos, como no cartão de antes, é a peça da barra longa (barra-longa.json, IWF:
// 220 cm, 131 cm entre as mangas), com uma anilha de 20 kg de cada lado.
const rack_de_agachamento = quadro(
  (C) => {
    // P(l, y, d): l do meio para um montante, y de altura, d para o lado da pessoa (+x)
    const P = (l, y, d) => [d, y, -l];
    const f = X, lado = [0, 0, -1];
    const t = 7.5, H = 192, meiaBase = 150 / 2, xm = 110 / 2 + t / 2, dP = t / 2, pl = 5, pc = 50;
    const gancho = 130, pino = 90;
    const altBase = t * 0.66;
    // o quadro do chão: um trilho sob cada montante, na direção da pessoa, e uma travessa na ponta de trás
    for (const sl of [-1, 1]) C.tubo(P(sl * xm, altBase / 2, -meiaBase), P(sl * xm, altBase / 2, meiaBase), t, altBase, M.metal, { up: Y });
    C.tubo(P(-xm, altBase / 2, -meiaBase + t / 2), P(xm, altBase / 2, -meiaBase + t / 2), t, altBase, M.metal, { up: Y });
    for (const sl of [-1, 1]) for (const d of [-meiaBase + 3, meiaBase - 3]) C.cilindro(P(sl * xm, 0, d), P(sl * xm, 1.2, d), 3.2, M.borracha, { lados: 10 });
    // os montantes, com a tampa de borracha (sem travessa em cima)
    for (const sl of [-1, 1]) {
      C.tubo(P(sl * xm, altBase, 0), P(sl * xm, H - 0.8, 0), t, t, M.metal, { up: f });
      C.tubo(P(sl * xm, H - 0.8, 0), P(sl * xm, H, 0), t + 0.5, t + 0.5, M.borracha, { up: f });
    }
    // os furos de regulagem, na face virada para a pessoa, do pino mais baixo (50 cm) ao gancho mais alto (170 cm)
    const furos = [];
    for (const sl of [-1, 1]) for (let y = 50; y <= 170 + 1e-6; y += 2.5) furos.push(P(sl * xm, y, dP + 0.05));
    C.furos(furos, lado, Y, 1.6 / 2);
    // os pinos de segurança, com a tampa de borracha na ponta
    for (const sl of [-1, 1]) {
      const b = P(sl * xm, pino - pl / 2, dP + pc - 1);
      C.tubo(P(sl * xm, pino - pl / 2, dP), b, pl, pl, M.cromo, { up: Y });
      C.tubo(b, P(sl * xm, pino - pl / 2, dP + pc), pl + 0.4, pl + 0.4, M.borracha, { up: Y });
    }
    C.sombra(0, 0, xm + 12, meiaBase + 6, 0.16);
    // os ganchos em J: a chapa contra o montante, o berço com a borracha e a borda da ponta
    const ga = 13, gp = 9, gb = 4, gl = t - 1;
    for (const sl of [-1, 1]) {
      const x = sl * xm, y0 = gancho;
      C.tubo(P(x, y0 - ga + gb, dP + 0.8), P(x, y0 + gb, dP + 0.8), gl, 1.6, M.metalClaro, { up: f });
      C.tubo(P(x, y0 - 1.6, dP + 1.6), P(x, y0 - 1.6, dP + gp), gl, 1.2, M.metalClaro, { up: Y });
      C.tubo(P(x, y0 - 0.5, dP + 1.6), P(x, y0 - 0.5, dP + gp - 1.2), gl - 0.6, 1, M.borracha, { up: Y });
      C.tubo(P(x, y0 - 2.2, dP + gp - 0.6), P(x, y0 + gb - 1, dP + gp - 0.6), gl, 1.2, M.metalClaro, { up: f });
    }
    // a barra longa no berço dos ganchos: a pegada, a recartilha, os rebordos, as mangas, as anilhas e as presilhas
    const centro = P(0, gancho + 2.8 / 2, t / 2 + (gp - 1.2) / 2);
    const B = (d) => add(centro, mul(lado, d));
    const entre = 131 / 2, esp = 2.5, meia = 220 / 2, eAn = 5.4;
    cil(C, B(-entre), B(entre), 2.8 / 2, M.cromo, { lados: 14, dz: 6 });
    for (const s of [-1, 1]) {
      C.linha(add(B(s * (81 / 2 - 18)), [0, 1.42, 0]), add(B(s * (81 / 2 + 10)), [0, 1.42, 0]), '#7A818A', 0.9);
      cil(C, B(s * entre), B(s * (entre + esp)), 7.6 / 2, M.cromo);
      cil(C, B(s * (entre + esp)), B(s * meia), 5 / 2, M.cromo);
      const a = B(s * (entre + esp)), b = B(s * (entre + esp + eAn));
      C.anilha(s < 0 ? b : a, s < 0 ? a : b, 45 / 2, M.anilha);
      const d0 = entre + esp + eAn + 0.3;
      cil(C, B(s * d0), B(s * (d0 + 5)), 5 / 2 + 0.7, M.metalClaro, { lados: 12 });
      const c = B(s * (d0 + 2.5));
      C.linha(add(c, [0, 5 / 2 + 0.5, 0]), add(c, [0, 7, 0]), M.metalClaro[3], 0.9);
    }
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
// As cadeiras extensora e flexora (decisão do Gustavo em 21/11/2026: os cartões com a medida das fichas, como as peças
// da animação). Os dois cartões de antes eram 26% a 54% mais estreitos que as fichas, com a pilha atrás do assento; aqui
// a pilha fica ao lado do assento, que é como a largura das fichas fecha. O desenho é o da peça do motor novo
// (src/engine/novo/pecas-de-cena/cadeira-flexora.ts, que desenha as duas), com as medidas de
// src/engine/novo/dados/objetos/cadeira-flexora.json e cadeira-extensora.json; a máquina parada, na posição inicial
// (as placas embaixo). Eixos da peça: quem senta olha para +z, o assento no meio (x = 0) com a borda da frente em z = 0,
// o came, a alavanca e a torre à esquerda de quem senta (+x). A câmera é a das folhas das peças (de três quartos, pela
// frente e pelo lado direito de quem senta), que mostra o assento, o rolo e a pilha.
function cadeiraDeJoelho(C, g, m) {
  const rad = Math.PI / 180;
  const esp = g.estofadoEsp, meiaLarg = g.assentoLarg / 2, tb = g.tubo;
  // o assento (o meio do topo na altura da tabela, a borda da frente em z = 0), o eixo e o lado do came
  const inc = g.assentoInclina * rad;
  const ao = [0, Math.sin(inc), Math.cos(inc)], normal = [0, Math.cos(inc), -Math.sin(inc)];
  const meioTopo = [0, g.assentoAltura, -(g.assentoComp / 2) * Math.cos(inc)];
  const frenteTopo = add(meioTopo, mul(ao, g.assentoComp / 2)), fundoTopo = add(meioTopo, mul(ao, -g.assentoComp / 2));
  const eixo = add(frenteTopo, [0, g.eixoAcima, g.eixoFrente]);
  const xC = meiaLarg + 7;
  // o encosto (na regulagem do exemplo das folhas: 8 cm à frente do mais recuado)
  const ie = g.encostoInclina * rad;
  const sobe = [0, Math.cos(ie), -Math.sin(ie)], frente = [0, Math.sin(ie), Math.cos(ie)];
  const baseE = add(fundoTopo, [0, 0, m.encosto - g.encostoCurso / 2]);
  // a alavanca e o rolo
  const dAl = [0, -Math.cos(m.alavanca * rad), Math.sin(m.alavanca * rad)];
  const centroRolo = add(eixo, mul(dAl, m.rolo)), rRolo = g.roloDiam / 2;
  // a torre da pilha, ao lado do assento
  const zTorre = fundoTopo[2] + 6;
  const xT1 = g.larg - meiaLarg - 8, xT0 = xT1 - 34;
  const zT0 = zTorre - 16, zT1 = zTorre + 16, H = g.alturaTorre;
  const zTras = baseE[2] - Math.sin(ie) * g.encostoComp - 12, zFrente = zTras + g.comp;
  const T = (a, b, w = tb) => C.tubo(a, b, w, w, M.metal);
  // a base no chão, o pé do assento e o do eixo
  for (const x of [-meiaLarg + 4, xC + 2]) T([x, tb / 2, zTras], [x, tb / 2, eixo[2] + 6]);
  for (const z of [zTras + 4, eixo[2] + 2]) T([-meiaLarg + 4, tb / 2, z], [xT1, tb / 2, z]);
  T([xT0, tb / 2, zT0], [xT0, tb / 2, zT1]);
  T([xT1, tb / 2, zT0], [xT1, tb / 2, zT1]);
  T([0, tb, meioTopo[2]], [0, meioTopo[1] - esp - 2, meioTopo[2]]);
  T([-meiaLarg + 4, tb / 2, meioTopo[2]], [xC + 2, tb / 2, meioTopo[2]]);
  T([xC + 2, tb, eixo[2]], [xC + 2, eixo[1] - 6, eixo[2]]);
  // o trilho do encosto, o encosto e o assento
  T([0, fundoTopo[1] - esp - 6, fundoTopo[2] - g.encostoCurso / 2 - 6], [0, fundoTopo[1] - esp - 6, meioTopo[2] + 6], 5);
  C.estofado(add(add(baseE, mul(sobe, g.encostoComp / 2)), mul(frente, -esp)), sobe, frente, X, g.encostoComp, esp, g.assentoLarg - 4);
  T(add(baseE, [0, -esp - 4, -2]), add(add(baseE, mul(sobe, g.encostoComp * 0.45)), mul(frente, -esp - 2)), 5);
  C.estofado(add(meioTopo, mul(normal, -esp)), ao, normal, X, g.assentoComp, esp, g.assentoLarg);
  // os pegadores ao lado do assento
  for (const s of [-1, 1]) {
    const x = s * (meiaLarg + 4), a = g.alcaAFrente;
    C.tubo([x * 0.85, meioTopo[1] - esp - 4, meioTopo[2] - 10 + a], [x, meioTopo[1] - 2, meioTopo[2] + a], 3, 3, M.metal);
    C.cilindro([x, meioTopo[1] - 2, meioTopo[2] + a], [x, meioTopo[1] - 2, meioTopo[2] + 12 + a], 2, M.borracha, { lados: 12 });
  }
  // a trava das coxas (só na flexora): a almofada sobre as coxas, num braço que desce do lado esquerdo
  if (g.travaComp) {
    const zTrava = frenteTopo[2] - g.travaComp / 2 - 4;
    C.estofado([0, m.trava, zTrava], Z, Y, X, g.travaComp, esp, g.travaLarg);
    T([xC + 2, eixo[1] + 4, zTrava - 2], [xC + 2, m.trava + esp + 8, zTrava - 2], 5);
    T([xC + 2, m.trava + esp + 8, zTrava - 2], [g.travaLarg / 2 - 4, m.trava + esp + 3, zTrava - 2], 4.5);
  }
  // a torre: quatro montantes, a tampa, as guias e a polia do pé
  for (const [x, z] of [[xT0, zT0], [xT1, zT0], [xT0, zT1], [xT1, zT1]]) T([x, tb, z], [x, H, z], 4.5);
  for (const z of [zT0, zT1]) T([xT0, H, z], [xT1, H, z], 4.5);
  for (const x of [xT0, xT1]) T([x, H, zT0], [x, H, zT1], 4.5);
  const xM = (xT0 + xT1) / 2;
  for (const dz of [-6, 6]) C.cilindro([xM, tb, zTorre + dz], [xM, H - 6, zTorre + dz], 0.8, M.cromo, { lados: 8 });
  C.cilindro([xM - 1.5, 10, zT1 + 2], [xM + 1.5, 10, zT1 + 2], 4.5, M.metalClaro, { lados: 16 });
  C.sombra((xT1 - meiaLarg) / 2, (zTras + zFrente) / 2, (xT1 + meiaLarg) / 2 + 6, g.comp / 2, 0.18);
  // as placas (5 no pino, paradas embaixo) e a haste
  const n = 15, k = 5, hp = 75 / n, xP = xM - 26 / 2, zP = zTorre + 12 / 2;
  C.pilha([xP, tb + 2, zP], X, [0, 0, -1], 26, hp * (n - k), 12, n - k);
  const yDo = tb + 2 + hp * (n - k);
  C.pilha([xP, yDo, zP], X, [0, 0, -1], 26, hp * k, 12, k);
  C.cilindro([xM, yDo + hp * k, zTorre], [xM, yDo + hp * k + 10, zTorre], 1.2, M.cromo, { lados: 8 });
  // o cabo, do came até a polia do pé da torre
  const rC = g.cameDiam / 2;
  const saida = add(eixo, [xC - 1, -rC, 0]);
  C.linha(saida, [saida[0], 10 - 4.5, saida[2]], '#202327', 0.7);
  C.linha([saida[0], 10 - 4.5, saida[2]], [xM, 10 - 4.5, zT1 + 2], '#202327', 0.7);
  // o came, o eixo, a alavanca, a luva do rolo, a haste e o rolo
  const cx = (x) => [x, eixo[1], eixo[2]];
  C.cilindro(cx(xC - 3), cx(xC + 3), rC, M.metalClaro, { lados: 24 });
  C.cilindro(cx(xC + 3), cx(xC + 6), 3, M.cromo, { lados: 12 });
  const lado = (v, x) => [x, v[1], v[2]];
  C.tubo(lado(eixo, xC), lado(add(eixo, mul(dAl, g.alavancaMax)), xC), 5, 5, M.metal, { up: X });
  C.tubo(lado(add(centroRolo, mul(dAl, -4)), xC), lado(add(centroRolo, mul(dAl, 4)), xC), 7, 7, M.metalClaro, { up: X });
  C.cilindro(lado(centroRolo, xC - 3), lado(centroRolo, -g.roloComp / 2), 1.6, M.cromo, { lados: 10 });
  C.cilindro(add(centroRolo, [-g.roloComp / 2, 0, 0]), add(centroRolo, [g.roloComp / 2 - 6, 0, 0]), rRolo, M.estofado, { lados: 18 });
}
// a parte comum das duas (as medidas que as duas tabelas dão iguais)
const JOELHO = { estofadoEsp: 6.5, assentoComp: 44, assentoLarg: 40, encostoComp: 62, encostoInclina: 20, encostoCurso: 16, eixoAcima: 9, eixoFrente: 5, cameDiam: 22, roloDiam: 11, roloComp: 44, alturaTorre: 148, tubo: 7 };

// cadeira extensora: 167 × 106 cm (Life Fitness SS-LE), torre de 148 cm (Precor RSL0605); de desenho na peça: o assento
// reto a 56 cm, a alavanca de até 48 cm, as alças 8 cm atrás do meio do assento, sem a trava das coxas. A alavanca
// apontando para baixo (0°), com o rolo a 38 cm do eixo, na frente da canela.
const cadeira_extensora = quadro(
  (C) => cadeiraDeJoelho(C, { ...JOELHO, comp: 167, larg: 106, assentoInclina: 0, assentoAltura: 56, alavancaMax: 48, alcaAFrente: -8 }, { alavanca: 0, rolo: 38, encosto: 8 }),
  { yaw: 250, pitch: 12, s: 0.6 },
);

// cadeira flexora: 156 × 102 cm (Life Fitness SS-SLC), torre de 148 cm e o assento inclinado 15° (Precor RSL0619); de
// desenho na peça: o assento a 50 cm, a alavanca de até 52 cm, as alças 6 cm à frente do meio do assento, a trava das
// coxas de 22 × 40 cm. A alavanca à frente (95°), com o rolo a 40 cm do eixo, atrás da panturrilha; a trava a 70 cm.
const cadeira_flexora = quadro(
  (C) =>
    cadeiraDeJoelho(C, { ...JOELHO, comp: 156, larg: 102, assentoInclina: 15, assentoAltura: 50, alavancaMax: 52, alcaAFrente: 6, travaComp: 22, travaLarg: 40 }, { alavanca: 95, rolo: 40, encosto: 8, trava: 70 }),
  { yaw: 250, pitch: 12, s: 0.6 },
);

// mesa flexora (decisão do Gustavo em 21/11/2026: o cartão com a medida das fichas, como a peça da animação). O cartão
// de antes era 33% a 40% mais baixo que as fichas e não tinha pilha (um pino de anilha na alavanca). Medidas da peça
// do motor novo (src/engine/novo/dados/objetos/mesa-flexora.json e pecas-de-cena/mesa-flexora.ts): 159 × 106 cm (Life
// Fitness SS-LC), torre de 148 cm e estofados de 6,5 cm (Precor RSL0606), a torre ao lado do estofado do peito; de
// desenho na peça: o eixo a 64 cm, a dobra no quadril (as coxas sobem 20°, o peito desce 10°), os estofados de 34 e
// 48 × 32 cm, os pegadores 22 cm abaixo da ponta do peito; o came, a alavanca (até 52 cm), o rolo e a pilha são os da
// cadeira flexora. A máquina parada na posição inicial (a alavanca a −8°, o rolo a 44 cm do eixo, as placas embaixo).
// Eixos da peça: quem deita fica de bruços com a cabeça para +z, o eixo em z = 0, a torre à esquerda de quem deita (+x).
const mesa_flexora = quadro(
  (C) => {
    const rad = Math.PI / 180;
    const tb = 7, esp = 6.5, meiaLarg = 32 / 2, xC = meiaLarg + 7, rRolo = 11 / 2, roloComp = 44;
    const eixo = [0, 64, 0];
    const ci = 20 * rad, pi = 10 * rad;
    const coxa = { ponta: [0, 64 - 6.5, 5], ao: [0, Math.sin(ci), Math.cos(ci)], normal: [0, Math.cos(ci), -Math.sin(ci)], comp: 34 };
    const dobra = add(coxa.ponta, mul(coxa.ao, coxa.comp));
    const peito = { ponta: dobra, ao: [0, -Math.sin(pi), Math.cos(pi)], normal: [0, Math.cos(pi), Math.sin(pi)], comp: 48 };
    const pontaDoPeito = add(dobra, mul(peito.ao, peito.comp));
    const meioDoTopo = (p) => add(p.ponta, mul(p.ao, p.comp / 2));
    const alavanca = -8, rolo = 44;
    const dAl = [0, Math.sin(alavanca * rad), -Math.cos(alavanca * rad)];
    const centroRolo = add(eixo, mul(dAl, rolo));
    const zTras = -52 - rRolo - 4, zFrente = zTras + 159;
    const zTorre = zFrente - 13, xT1 = 106 - meiaLarg - 8, xT0 = xT1 - 34, zT0 = zTorre - 13, zT1 = zTorre + 13, H = 148, yPolia = 10;
    const T = (a, b, w = tb) => C.tubo(a, b, w, w, M.metal);
    // a base no chão
    for (const x of [-meiaLarg + 4, xC + 2]) T([x, tb / 2, zTras], [x, tb / 2, zFrente]);
    for (const z of [zTras + 4, zFrente - 4]) T([-meiaLarg + 4, tb / 2, z], [xC + 2, tb / 2, z]);
    T([xC + 2, tb / 2, zT0 + 4], [xT1, tb / 2, zT0 + 4]);
    T([xC + 2, tb / 2, zT1 - 4], [xT1, tb / 2, zT1 - 4]);
    // os estofados, a viga e os pés embaixo deles vão na profundidade do canto deles mais longe de quem olha (como na peça)
    let fundo = -1e9;
    for (const p of [coxa, peito])
      for (const s of [0, p.comp])
        for (const x of [-meiaLarg, meiaLarg]) for (const n of [0, -esp - 10]) fundo = Math.max(fundo, C.P(add(add(add(p.ponta, mul(p.ao, s)), [x, 0, 0]), mul(p.normal, n)))[2]);
    const atras = (centro) => ({ dz: fundo - C.P(centro)[2] + 1 });
    const Tf = (a, b, w = tb) => C.tubo(a, b, w, w, M.metal, atras(mul(add(a, b), 0.5)));
    const sob = (p, n) => add(p, mul(n, -esp - 4));
    const a0 = sob(coxa.ponta, coxa.normal), a1 = sob(dobra, Y), a2 = sob(pontaDoPeito, peito.normal);
    Tf(a0, a1, 6);
    Tf(a1, a2, 6);
    Tf([0, tb, a0[2] + 6], add(a0, [0, 0, 6]));
    Tf([0, tb, a1[2]], a1);
    Tf([0, tb, a2[2] - 4], add(a2, [0, 0, -4]));
    for (const z of [a0[2] + 6, a1[2], a2[2] - 4]) T([-meiaLarg + 4, tb / 2, z], [xC + 2, tb / 2, z]);
    for (const p of [coxa, peito]) C.estofado(add(meioDoTopo(p), mul(p.normal, -esp)), p.ao, p.normal, X, p.comp, esp, 32, M.estofado, atras(add(meioDoTopo(p), mul(p.normal, -esp / 2))));
    // os pegadores: um braço sai da viga, à frente, e a manopla sobe inclinada
    const dir = [0, Math.cos(25 * rad), Math.sin(25 * rad)];
    for (const s of [-1, 1]) {
      const centro = [s * 24, pontaDoPeito[1] - 22, pontaDoPeito[2] + 4];
      const pe = add(centro, mul(dir, -6 - 3));
      T(add(a2, [0, -2, -2]), pe, 4.5);
      C.cilindro(pe, add(centro, mul(dir, -6)), 1.8, M.metal, { lados: 10 });
      C.cilindro(add(centro, mul(dir, -6)), add(centro, mul(dir, 6)), 2, M.borracha, { lados: 12 });
    }
    // o pé do eixo
    T([xC + 2, tb, 0], [xC + 2, eixo[1] - 6, 0]);
    T([xC + 2, eixo[1] - 6, 0], [xC + 2, a0[1], a0[2] + 6], 5);
    // a torre, as guias e as polias do cabo
    for (const [x, z] of [[xT0, zT0], [xT1, zT0], [xT0, zT1], [xT1, zT1]]) T([x, tb, z], [x, H, z], 4.5);
    for (const z of [zT0, zT1]) T([xT0, H, z], [xT1, H, z], 4.5);
    for (const x of [xT0, xT1]) T([x, H, zT0], [x, H, zT1], 4.5);
    const xM = (xT0 + xT1) / 2;
    for (const dz of [-6, 6]) C.cilindro([xM, tb, zTorre + dz], [xM, H - 6, zTorre + dz], 0.8, M.cromo, { lados: 8 });
    C.cilindro([xC - 1.5, yPolia, 0], [xC + 1.5, yPolia, 0], 4.5, M.metalClaro, { lados: 16 });
    C.cilindro([xM - 1.5, yPolia, zT0 - 2], [xM + 1.5, yPolia, zT0 - 2], 4.5, M.metalClaro, { lados: 16 });
    C.sombra((xT1 - meiaLarg) / 2, (zTras + zFrente) / 2, (xT1 + meiaLarg) / 2 + 6, 159 / 2, 0.18);
    // as placas (5 no pino, paradas embaixo) e a haste
    const n = 15, k = 5, hp = 75 / n, xP = xM - 26 / 2, zP = zTorre - 12 / 2;
    C.pilha([xP, tb + 2, zP], X, Z, 26, hp * (n - k), 12, n - k);
    const yDo = tb + 2 + hp * (n - k);
    C.pilha([xP, yDo, zP], X, Z, 26, hp * k, 12, k);
    C.cilindro([xM, yDo + hp * k, zTorre], [xM, yDo + hp * k + 10, zTorre], 1.2, M.cromo, { lados: 8 });
    // o cabo: do came até a polia sob o eixo, no chão até o pé da torre
    const rC = 22 / 2;
    C.linha(add(eixo, [xC, -rC, 0]), [xC, yPolia - 4.5, 0], '#202327', 0.7);
    C.linha([xC, yPolia - 4.5, 0], [xC, yPolia - 4.5, zT0 - 2], '#202327', 0.7);
    C.linha([xC, yPolia - 4.5, zT0 - 2], [xM, yPolia - 4.5, zT0 - 2], '#202327', 0.7);
    // o came, o eixo, a alavanca, a luva do rolo, a haste e o rolo
    const cx = (x) => [x, eixo[1], eixo[2]];
    C.cilindro(cx(xC - 3), cx(xC + 3), rC, M.metalClaro, { lados: 24 });
    C.cilindro(cx(xC + 3), cx(xC + 6), 3, M.cromo, { lados: 12 });
    const lado = (v, x) => [x, v[1], v[2]];
    C.tubo(lado(eixo, xC), lado(add(eixo, mul(dAl, 52)), xC), 5, 5, M.metal, { up: X });
    C.tubo(lado(add(centroRolo, mul(dAl, -4)), xC), lado(add(centroRolo, mul(dAl, 4)), xC), 7, 7, M.metalClaro, { up: X });
    C.cilindro(lado(centroRolo, xC - 3), lado(centroRolo, -roloComp / 2), 1.6, M.cromo, { lados: 10 });
    C.cilindro(add(centroRolo, [-roloComp / 2, 0, 0]), add(centroRolo, [roloComp / 2 - 6, 0, 0]), rRolo, M.estofado, { lados: 18 });
  },
  { yaw: -60, pitch: 14, s: 0.6 },
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

// uma caixa alinhada aos eixos, de a (o canto de menor x, y e z) a b, como as peças das panturrilhas a desenham
const caixaXY = (C, a, b, mat) => C.prisma([[a[0], a[1]], [b[0], a[1]], [b[0], b[1]], [a[0], b[1]]], [0, 0, a[2]], X, Y, [0, 0, b[2] - a[2]], mat);

// panturrilha em pé (decisão do Gustavo em 21/11/2026: o cartão igual à peça da animação). No cartão de antes as
// almofadas corriam num carro na vertical; nas fotos das duas fichas (Hammer Strength HS-SC, Atlantis M118) elas ficam
// num braço que gira num eixo no alto dos montantes, e é assim na peça. Medidas da peça do motor novo
// (src/engine/novo/dados/objetos/panturrilha-em-pe.json e pecas-de-cena/panturrilha-em-pe.ts): 148 × 114 × 183 cm
// (HS-SC); do corpo da tabela, o eixo a 169 cm e 70 cm à frente da borda do degrau, as almofadas a 34 cm uma da outra;
// de desenho na peça: o degrau de 16 × 36 × 56 cm, as almofadas de 30 × 14 × 10 cm, o braço de 72 cm, a travessa com
// os pegadores 28 cm à frente e 16 cm abaixo do meio das almofadas, a torre de 34 × 36 cm, o came de 22 cm. Sem
// ninguém, o braço descansa no batente de baixo (−7,9°, a posição inicial da animação). Eixos da peça: quem treina
// olha para +z, para os montantes e a torre; a borda de trás do degrau em z = 0. Escolha do cartão: a câmera pela frente
// e pela esquerda de quem treina (o degrau na frente), que mostra as duas almofadas e o braço; do ângulo da folha da
// peça, as almofadas ficavam pequenas na frente da torre.
const panturrilha_em_pe_maquina = quadro(
  (C) => {
    const rad = Math.PI / 180;
    const tb = 7, braco = -7.9;
    const P = [0, 169, 70];
    const d = [0, Math.sin(braco * rad), -Math.cos(braco * rad)], n = [0, Math.cos(braco * rad), Math.sin(braco * rad)];
    const noBraco = (dd) => add(P, mul(d, dd));
    const R = 72, meia = 34 / 2;
    const centroDaAlmofada = (s) => add(noBraco(R), [s * meia, 0, 0]);
    const zFrente = 70 + 8 + 36 + 2, zTras = zFrente - 148;
    const hP = 16, pP = 36, lP = 56;
    const zT0 = P[2] + 8, zT1 = zT0 + 36, xT = 34 / 2, H = 183, xM = 24 / 2;
    const T = (a, b, w = tb) => C.tubo(a, b, w, w, M.metal);
    // a base no chão
    const xB = 114 / 2 - tb / 2;
    for (const s of [-1, 1]) T([s * (lP / 2 - 2), tb / 2, zTras + tb], [s * (lP / 2 - 2), tb / 2, zT1]);
    T([-xB, tb / 2, zTras + tb / 2], [xB, tb / 2, zTras + tb / 2]);
    T([-xB, tb / 2, zFrente - tb / 2], [xB, tb / 2, zFrente - tb / 2]);
    T([-lP / 2 + 2, tb / 2, P[2]], [lP / 2 - 2, tb / 2, P[2]]);
    // o degrau: o bloco de aço e a chapa de cima, ranhurada de um lado ao outro
    caixaXY(C, [-lP / 2, tb, 0.5], [lP / 2, hP - 2.5, pP - 0.5], M.metal);
    C.prisma(retArred(pP, 2.5, 0.8), [-lP / 2, hP - 1.25, pP / 2], Z, Y, [lP, 0, 0], M.plataforma);
    for (let i = 1; i < 7; i++) C.linha([-lP / 2 + 1.5, hP + 0.05, (pP * i) / 7], [lP / 2 - 1.5, hP + 0.05, (pP * i) / 7], '#5E646C', 0.45);
    T([0, tb, pP - 2], [0, tb, P[2] - 4], 6);
    // os dois montantes do eixo, a tampa e o eixo
    for (const s of [-1, 1]) T([s * xM, tb, P[2]], [s * xM, P[1] + 8, P[2]]);
    T([-xM, P[1] + 8, P[2]], [xM, P[1] + 8, P[2]], 6);
    C.cilindro([-xM, P[1], P[2]], [xM, P[1], P[2]], 2.4, M.cromo, { lados: 12 });
    // a torre: quatro montantes, a tampa, as guias e a polia do pé
    for (const [x, z] of [[-xT, zT0], [xT, zT0], [-xT, zT1], [xT, zT1]]) T([x, tb, z], [x, H, z], 4.5);
    for (const z of [zT0, zT1]) T([-xT, H, z], [xT, H, z], 4.5);
    for (const x of [-xT, xT]) T([x, H, zT0], [x, H, zT1], 4.5);
    const zP = (zT0 + zT1) / 2;
    for (const dx of [-7, 7]) C.cilindro([dx, tb, zP], [dx, H - 6, zP], 0.8, M.cromo, { lados: 8 });
    C.cilindro([-1.5, 10, zT0 - 2], [1.5, 10, zT0 - 2], 4.5, M.metalClaro, { lados: 16 });
    C.sombra(0, (zTras + zFrente) / 2, 114 / 2, 148 / 2, 0.18);
    // as placas (8 no pino, paradas embaixo) e a haste
    const nPl = 18, k = 8, hp = 90 / nPl, zPl = zP + 12 / 2;
    C.pilha([-13, tb + 2, zPl], X, [0, 0, -1], 26, hp * (nPl - k), 12, nPl - k);
    const yDo = tb + 2 + hp * (nPl - k);
    C.pilha([-13, yDo, zPl], X, [0, 0, -1], 26, hp * k, 12, k);
    C.cilindro([0, yDo + hp * k, zP], [0, yDo + hp * k + 10, zP], 1.2, M.cromo, { lados: 8 });
    // o came no eixo e o cabo até a polia do pé da torre
    const rC = 22 / 2, xC = 6;
    C.cilindro([xC - 2.5, P[1], P[2]], [xC + 2.5, P[1], P[2]], rC, M.metalClaro, { lados: 24 });
    C.linha([xC, P[1] - rC, P[2] + 1], [xC, 10 - 4.5, P[2] + 1], '#202327', 0.7);
    C.linha([xC, 10 - 4.5, P[2] + 1], [0, 10 - 4.5, zT0 - 2], '#202327', 0.7);
    // o braço, do eixo até a travessa na frente do pescoço
    const cTr = add(noBraco(R - 28), mul(n, -16));
    C.tubo(P, cTr, 6, 6, M.metal, { up: X });
    C.cilindro([-4, P[1], P[2]], [4, P[1], P[2]], 4, M.metal, { lados: 14 });
    // a travessa com os pegadores nas pontas, as barras até as almofadas e as almofadas
    const dentro = meia + 3;
    C.tubo(add(cTr, [-dentro, 0, 0]), add(cTr, [dentro, 0, 0]), 5, 5, M.metal, { up: n });
    for (const s of [-1, 1]) {
      C.cilindro(add(cTr, [s * dentro, 0, 0]), add(cTr, [s * (dentro + 11), 0, 0]), 3.4 / 2, M.borracha, { lados: 12 });
      const frente = add(add(centroDaAlmofada(s), mul(d, -30 / 2 + 3)), mul(n, -10 / 2 + 1.5));
      C.tubo(add(cTr, [s * meia, 0, 0]), frente, 4.5, 4.5, M.metal, { up: n });
      C.estofado(add(centroDaAlmofada(s), mul(n, -10 / 2)), mul(d, -1), n, X, 30, 10, 14);
    }
  },
  { yaw: 36, pitch: 12, s: 0.6 },
);

// panturrilha sentada (decisão do Gustavo em 21/11/2026: o cartão com a medida das fichas, como a peça da animação). O
// cartão de antes era 13% a 45% menor que as fichas, com o eixo numa coluna à frente dos pés; na peça o eixo fica ao
// lado do quadril, como na foto da Atlantis M219. Medidas da peça do motor novo
// (src/engine/novo/dados/objetos/panturrilha-sentada.json e pecas-de-cena/panturrilha-sentada.ts): 155 × 74 × 107 cm
// (Life Fitness SPLCALF); do corpo da tabela, o assento a 58 cm, o eixo a 66,7 cm, na linha do quadril, e a almofada a
// 32 cm dele; de desenho na peça: o apoio dos pés de 20 × 18 × 36 cm, o assento de 36 × 34 cm, a almofada de 16 × 40 cm,
// o pino das anilhas a 80 cm do eixo (com uma anilha de 20 kg, a da animação), o batente a 50 cm. Sem ninguém, a
// alavanca descansa no batente (−7°, o da animação), com a almofada na regulagem da animação (6,7 cm acima da
// alavanca). Eixos da peça: quem senta olha para +z; a borda de trás do apoio dos pés em z = 0; a alavanca, o pino e as
// anilhas à esquerda de quem senta (+x). Escolha do cartão: a câmera pela frente e pela direita de quem senta, que
// mostra o assento, a almofada e a anilha; pelo lado da alavanca (o da folha da peça), o pé do eixo cobre o assento.
const panturrilha_sentada_maquina = quadro(
  (C) => {
    const rad = Math.PI / 180;
    const tb = 7, alavanca = -7, acima = 6.7;
    const P = [0, 66.7, -54.7], xL = 27;
    const naAlavanca = (graus, dd, h = 0) => add(add(P, mul([0, Math.sin(graus * rad), Math.cos(graus * rad)], dd)), mul([0, Math.cos(graus * rad), -Math.sin(graus * rad)], h));
    const d = [0, Math.sin(alavanca * rad), Math.cos(alavanca * rad)], n = [0, Math.cos(alavanca * rad), -Math.sin(alavanca * rad)];
    const zFrente = P[2] + 80 + 26, zTras = zFrente - 155;
    const hA = 20, pA = 18, lA = 36;
    const hS = 58, eS = 9, cS = 36, lS = 34, zS1 = -40, zS0 = zS1 - cS;
    const eA = 8, cA = 16, lAl = 40;
    const T = (a, b, w = tb) => C.tubo(a, b, w, w, M.metal);
    const lado = (v, x) => [x, v[1], v[2]];
    // a base no chão
    T([0, tb / 2, zTras + tb], [0, tb / 2, zFrente - tb]);
    T([xL, tb / 2, P[2] - 8], [xL, tb / 2, zFrente - tb]);
    for (const z of [zTras + tb / 2, zFrente - tb / 2]) T([-74 / 2 + 22, tb / 2, z], [74 / 2 - 10, tb / 2, z]);
    T([0, tb / 2, P[2]], [xL, tb / 2, P[2]]);
    // o assento num pé
    T([0, tb, (zS0 + zS1) / 2], [0, hS - eS - 1, (zS0 + zS1) / 2], 8);
    caixaXY(C, [-lS / 2 + 3, hS - eS - 3, zS0 + 4], [lS / 2 - 3, hS - eS, zS1 - 4], M.metal);
    C.estofado([0, hS - eS, (zS0 + zS1) / 2], Z, Y, X, cS, eS, lS);
    // o pé do eixo e o eixo
    T([xL, tb, P[2]], [xL, P[1] - 5, P[2]], 8);
    C.cilindro([xL - 6, P[1], P[2]], [xL + 6, P[1], P[2]], 4.2, M.metalClaro, { lados: 16 });
    // o apoio dos pés: o bloco e a chapa de borracha ranhurada
    caixaXY(C, [-lA / 2, tb, 0.5], [lA / 2, hA - 2.5, pA - 0.5], M.metal);
    C.prisma(retArred(pA, 2.5, 0.8), [-lA / 2, hA - 1.25, pA / 2], Z, Y, [lA, 0, 0], M.plataforma);
    for (let i = 1; i < 5; i++) C.linha([-lA / 2 + 1.5, hA + 0.05, (pA * i) / 5], [lA / 2 - 1.5, hA + 0.05, (pA * i) / 5], '#5E646C', 0.45);
    // o batente de baixo da alavanca, com a borracha em cima (a alavanca descansa nele)
    const topoDoBatente = add(naAlavanca(alavanca, 50, -tb / 2), [xL, 0, 0]);
    T([xL, tb, topoDoBatente[2]], [xL, topoDoBatente[1] - 3, topoDoBatente[2]], 6);
    C.cilindro([xL, topoDoBatente[1] - 3, topoDoBatente[2]], [xL, topoDoBatente[1], topoDoBatente[2]], 3.6, M.borracha, { lados: 14 });
    C.sombra(10, (zTras + zFrente) / 2, 74 / 2, 155 / 2, 0.18);
    // a alavanca, do eixo até o pino, o pino das anilhas e a anilha de 20 kg
    C.tubo(lado(P, xL), lado(naAlavanca(alavanca, 80 + 6), xL), 6, 6, M.metal, { up: X });
    const pino = lado(naAlavanca(alavanca, 80), xL);
    C.cilindro(add(pino, [3, 0, 0]), add(pino, [3 + 22, 0, 0]), 5 / 2, M.cromo, { lados: 14 });
    C.anilha([xL + 4, pino[1], pino[2]], [xL + 4 + 5.4, pino[1], pino[2]], 45 / 2, M.anilha);
    // o pino que regula a almofada, o braço que a segura por cima, a almofada e o pegador na frente dela
    const base = lado(naAlavanca(alavanca, 32), xL);
    const topo = add(base, mul(n, acima + eA + 3));
    C.tubo(base, topo, 5, 5, M.metalClaro, { up: d });
    C.tubo(topo, add(topo, [-xL - lAl / 2 + 4, 0, 0]), 4.5, 4.5, M.metal, { up: n });
    C.estofado(naAlavanca(alavanca, 32, acima), d, n, X, cA, eA, lAl);
    const pg = naAlavanca(alavanca, 32 + cA / 2 + 2, acima + eA + 5);
    C.tubo(add(topo, mul(d, 2)), [xL, pg[1], pg[2]], 3.5, 3.5, M.metal, { up: n });
    C.cilindro([xL, pg[1], pg[2]], [-44 / 2, pg[1], pg[2]], 3.4 / 2, M.borracha, { lados: 12 });
  },
  { yaw: 236, pitch: 14, s: 0.6 },
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

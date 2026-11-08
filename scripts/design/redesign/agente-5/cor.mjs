// Redesign, agente 5 (cor, tema e identidade), 06/11/2026: gera as paletas candidatas em OKLCH, calcula as razões de
// contraste da WCAG 2.2 de cada par, a distância de cada cor do app às cores do Boneco (também sob a simulação de
// protanopia, deuteranopia e tritanopia, modelo de Machado, Oliveira e Fernandes 2009, severidade 1.0, aplicado em RGB
// linear como o filtro SVG de scripts/design/boneco.mjs) e desenha cada paleta ao lado e por cima do palco do Boneco real
// (saído do motor, sem mudança). Ferramenta de documentação: nada daqui entra no app.
// Uso: node scripts/design/redesign/agente-5/cor.mjs
// Saída: reports/design/redesign/agente-5/{paletas.json,paletas.md,tokens-<direcao>-<tema>.css,palco-*.png}
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const SAIDA = 'reports/design/redesign/agente-5';
mkdirSync(SAIDA, { recursive: true });

// ---------- cor: sRGB ↔ linear ↔ OKLab/OKLCH (Björn Ottosson, 2020) ----------
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const s2l = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const l2s = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
const hex2rgb = (h) => {
  const m = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16) / 255);
};
const rgb2hex = (c) => '#' + c.map((v) => Math.round(clamp01(v) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const rgb2lin = (c) => c.map(s2l);
const lin2rgb = (c) => c.map(l2s);
function lin2oklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function oklab2lin([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
}
const oklch2lab = ([L, C, h]) => [L, C * Math.cos((h * Math.PI) / 180), C * Math.sin((h * Math.PI) / 180)];
const lab2oklch = ([L, a, b]) => [L, Math.hypot(a, b), ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360];
const dentro = (lin) => lin.every((v) => v >= -1e-4 && v <= 1 + 1e-4);
/** OKLCH → hex, reduzindo o croma até caber no sRGB (mapeamento de gama simples, por croma). */
function oklch2hex([L, C, h]) {
  let c = C;
  for (let i = 0; i < 60; i++) {
    const lin = oklab2lin(oklch2lab([L, c, h]));
    if (dentro(lin)) return rgb2hex(lin2rgb(lin.map(clamp01)));
    c *= 0.92;
  }
  return rgb2hex(lin2rgb(oklab2lin([L, 0, 0]).map(clamp01)));
}
const hex2oklch = (hex) => lab2oklch(lin2oklab(rgb2lin(hex2rgb(hex))));
// WCAG 2.x: luminância relativa e razão de contraste (a mesma conta de tests/e2e/contraste.ts)
const lumW = (hex) => {
  const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = hex2rgb(hex);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contraste = (a, b) => {
  const [x, y] = [lumW(a), lumW(b)];
  return Math.round(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)) * 100) / 100;
};
/** rgba(...) sobre um fundo opaco → hex (composição simples em sRGB, como o navegador faz) */
function compor(rgba, fundoHex) {
  const m = rgba.match(/rgba\(([^)]+)\)/);
  const [r, g, b, a] = m[1].split(',').map(Number);
  const f = hex2rgb(fundoHex).map((v) => v * 255);
  return rgb2hex([r, g, b].map((v, i) => (v * a + f[i] * (1 - a)) / 255));
}
/** Distância perceptual em OKLab × 100 (≈ ΔEok; 1 unidade ≈ 1 passo pequeno de cor). */
const dE = (a, b) => {
  const [x, y] = [lin2oklab(rgb2lin(hex2rgb(a))), lin2oklab(rgb2lin(hex2rgb(b)))];
  return Math.round(Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]) * 1000) / 10;
};
// Machado, Oliveira e Fernandes 2009 (IEEE TVCG 15(6)), severidade 1.0; tabela publicada em
// inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html. A matriz de deuteranopia é a de boneco.mjs.
export const MACHADO = {
  protanopia: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
  deuteranopia: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182, 0.04294, 0.968881],
  tritanopia: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.3039],
};
function simular(hex, tipo) {
  const M = MACHADO[tipo];
  const [r, g, b] = rgb2lin(hex2rgb(hex));
  const out = [M[0] * r + M[1] * g + M[2] * b, M[3] * r + M[4] * g + M[5] * b, M[6] * r + M[7] * g + M[8] * b];
  return rgb2hex(lin2rgb(out.map(clamp01)));
}

// ---------- resolver a luminosidade de uma cor para um alvo de contraste ----------
/**
 * Dado matiz e croma, acha a cor (em OKLCH) que atinge pelo menos `alvo` de contraste contra todos os `fundos`.
 * No tema claro a cor é mais escura que o fundo e fica a mais clara possível; no escuro, o contrário.
 */
function resolver({ h, C, fundos, alvo, escuro = false, folga = 0.12 }) {
  let lo = 0.02,
    hi = 0.98;
  const ok = (L) => fundos.every((f) => contraste(oklch2hex([L, C, h]), f) >= alvo + folga);
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (escuro) {
      if (ok(mid)) hi = mid;
      else lo = mid;
    } else if (ok(mid)) lo = mid;
    else hi = mid;
  }
  const L = escuro ? hi : lo;
  return oklch2hex([L, C, h]);
}

// ---------- as cores do Boneco (src/styles.css; não mudam) ----------
const css = readFileSync('src/styles.css', 'utf8');
const bloco = (ini, fim) => css.slice(css.indexOf(ini), css.indexOf(fim, css.indexOf(ini)));
const pegar = (txt, nome) => (txt.match(new RegExp(`${nome}:([^;]+);`)) ?? [])[1]?.trim();
const raizClaro = bloco(':root{', '}');
const raizEscuro = bloco(':root[data-theme="dark"]{', '}');
const r4 = css.slice(css.indexOf('/* R4 (experimento do boneco)'));
const r4Claro = bloco.call(null, '/* R4 (experimento do boneco)', '@media').slice(0) && r4.slice(0, r4.indexOf('@media'));
const r4Escuro = r4.slice(r4.indexOf(':root[data-theme="dark"]{'), r4.indexOf('}', r4.indexOf(':root[data-theme="dark"]{')));
const BONECO = {};
for (const [tema, raiz, r4t] of [
  ['claro', raizClaro, r4Claro],
  ['escuro', raizEscuro, r4Escuro],
]) {
  const stage = pegar(raiz, '--stage');
  BONECO[tema] = {
    palco: stage,
    figura: pegar(raiz, '--fig'),
    junta: pegar(raiz, '--joint'),
    equipamento: pegar(raiz, '--eq-dark'),
    coluna: pegar(raiz, '--spine'),
    elastico: pegar(raiz, '--elastic'),
    'músculo principal (estilo A, --m-p)': pegar(r4t, '--m-p'),
    'músculo secundário (estilo A, --m-s)': pegar(r4t, '--m-s'),
    'músculo principal (clássico, --mus-p sobre o palco)': compor(pegar(raiz, '--mus-p'), stage),
    'músculo secundário (clássico, --mus-s sobre o palco)': compor(pegar(raiz, '--mus-s'), stage),
    'erro (--err)': pegar(raiz, '--err'),
    'fantasma certo (--ghost)': pegar(raiz, '--ghost'),
    'trajetória (--path)': pegar(raiz, '--path'),
    'guia (--guide)': pegar(raiz, '--guide'),
    pele: pegar(r4t, '--ea-pele'),
  };
}
const ATUAL = {
  claro: Object.fromEntries(['--bg', '--surface', '--surface-2', '--ink', '--muted', '--line', '--edge', '--accent', '--accent-soft', '--accent-ink', '--link', '--ok', '--ok-soft', '--warn', '--warn-soft', '--alert', '--alert-soft'].map((t) => [t, pegar(raizClaro, t)])),
  escuro: Object.fromEntries(['--bg', '--surface', '--surface-2', '--ink', '--muted', '--line', '--edge', '--accent', '--accent-soft', '--accent-ink', '--link', '--ok', '--ok-soft', '--warn', '--warn-soft', '--alert', '--alert-soft'].map((t) => [t, pegar(raizEscuro, t)])),
};

// ---------- as direções ----------
// Cada direção define matiz e croma; a luminosidade sai do alvo de contraste. Nomes semânticos (não "azul-500").
// Alvos: texto 7:1 (AAA, 1.4.6) para o texto principal e o secundário; ação como texto 4,5:1 e texto sobre a ação 4,5:1;
// borda de controle 3:1 (1.4.11) contra o fundo e contra a superfície; estados (feito, atenção, alerta) 4,5:1 como texto
// no fundo e na própria faixa suave. Tudo com folga de 0,12 por causa do arredondamento.
const DIRECOES = {
  giz: {
    nome: 'Giz e grafite',
    intencao: 'O app é papel e lápis: neutros quentes, uma só cor de ação (índigo) e o Boneco como a única coisa colorida da tela.',
    neutro: { h: 85, Cclaro: 0.006, Cescuro: 0.007 },
    acao: { h: 278, Cclaro: 0.17, Cescuro: 0.14 },
    marcaFundo: false,
  },
  petroleo: {
    nome: 'Petróleo',
    intencao: 'Técnico e calmo, como ciência do esporte: neutros frios, ação azul-petróleo e a cor de marca também na navegação.',
    neutro: { h: 230, Cclaro: 0.006, Cescuro: 0.012 },
    acao: { h: 214, Cclaro: 0.125, Cescuro: 0.1 },
    marcaFundo: true,
  },
  ameixa: {
    nome: 'Ameixa',
    intencao: 'Mais cara própria e menos "app de academia": neutros rosados, ação ameixa (violeta) e estados bem separados dela.',
    neutro: { h: 30, Cclaro: 0.008, Cescuro: 0.012 },
    acao: { h: 318, Cclaro: 0.16, Cescuro: 0.13 },
    marcaFundo: false,
  },
};
// Cores de estado comuns às três direções (a semântica não muda com a marca): feito verde, atenção ocre, alerta vermelho.
const ESTADOS = { feito: { h: 155, Cclaro: 0.11, Cescuro: 0.1 }, atencao: { h: 78, Cclaro: 0.11, Cescuro: 0.11 }, alerta: { h: 18, Cclaro: 0.17, Cescuro: 0.13 } };

const ALVO_ACAO = 7;
const ALVO_ESTADO = 5.2;
function paleta(dir, tema) {
  const escuro = tema === 'escuro';
  const n = dir.neutro;
  const Cn = escuro ? n.Cescuro : n.Cclaro;
  const p = {};
  if (!escuro) {
    p.fundo = oklch2hex([0.965, Cn, n.h]);
    p.superficie = '#FFFFFF';
    p['superficie-2'] = oklch2hex([0.93, Cn * 1.3, n.h]);
    p.linha = oklch2hex([0.88, Cn, n.h]);
  } else {
    // Material "Dark theme": cinza bem escuro em vez de preto; superfícies mais altas, mais claras.
    p.fundo = oklch2hex([0.19, Cn, n.h]);
    p.superficie = oklch2hex([0.24, Cn, n.h]);
    p['superficie-2'] = oklch2hex([0.29, Cn, n.h]);
    p.linha = oklch2hex([0.35, Cn, n.h]);
  }
  const fundos = [p.fundo, p.superficie, p['superficie-2']];
  const inkH = escuro ? n.h : 260;
  p.texto = escuro ? oklch2hex([0.95, Cn, n.h]) : oklch2hex([0.22, 0.012, inkH]);
  p['texto-2'] = resolver({ h: inkH, C: 0.012, fundos, alvo: 7, escuro });
  p['borda-controle'] = resolver({ h: inkH, C: 0.012, fundos: [p.fundo, p.superficie], alvo: 3, escuro });
  const Ca = escuro ? dir.acao.Cescuro : dir.acao.Cclaro;
  // 2ª passada (06/11): a ação e o texto sobre ela miram 7:1 (AAA, 1.4.6), para não ficar abaixo do app de hoje (7,56:1)
  // no botão que a pessoa mais toca, lido de relance e sob luz forte
  p.acao = resolver({ h: dir.acao.h, C: Ca, fundos, alvo: ALVO_ACAO, escuro });
  // texto sobre a ação: branco no claro; no escuro, um tom escuro do próprio matiz
  p['texto-sobre-acao'] = escuro ? resolver({ h: dir.acao.h, C: 0.06, fundos: [p.acao], alvo: ALVO_ACAO, escuro: false }) : '#FFFFFF';
  if (!escuro && contraste(p['texto-sobre-acao'], p.acao) < ALVO_ACAO) p.acao = resolver({ h: dir.acao.h, C: Ca, fundos: [...fundos, '#FFFFFF'], alvo: ALVO_ACAO, escuro });
  p['acao-suave'] = escuro ? oklch2hex([0.3, 0.06, dir.acao.h]) : oklch2hex([0.94, 0.035, dir.acao.h]);
  p.foco = p.acao;
  for (const [k, e] of Object.entries(ESTADOS)) {
    const Ce = escuro ? e.Cescuro : e.Cclaro;
    p[`${k}-suave`] = escuro ? oklch2hex([0.28, 0.05, e.h]) : oklch2hex([0.945, 0.04, e.h]);
    p[k] = resolver({ h: e.h, C: Ce, fundos: [...fundos, p[`${k}-suave`]], alvo: ALVO_ESTADO, escuro });
  }
  // descanso: a cor de marca em versão calma (fundo do painel), com o texto principal por cima
  p.descanso = escuro ? oklch2hex([0.27, 0.035, dir.acao.h]) : oklch2hex([0.93, 0.03, dir.acao.h]);
  p['descanso-texto'] = p.texto;
  p.marca = dir.marcaFundo ? (escuro ? oklch2hex([0.3, 0.07, dir.acao.h]) : oklch2hex([0.35, 0.09, dir.acao.h])) : p.acao;
  return p;
}
const paletaAtual = (tema) => {
  const a = ATUAL[tema];
  return {
    fundo: a['--bg'], superficie: a['--surface'], 'superficie-2': a['--surface-2'], linha: a['--line'], texto: a['--ink'], 'texto-2': a['--muted'],
    'borda-controle': a['--edge'], acao: a['--accent'], 'texto-sobre-acao': a['--accent-ink'], 'acao-suave': a['--accent-soft'], foco: a['--accent'],
    feito: a['--ok'], 'feito-suave': a['--ok-soft'], atencao: a['--warn'], 'atencao-suave': a['--warn-soft'], alerta: a['--alert'], 'alerta-suave': a['--alert-soft'],
    descanso: a['--surface'], 'descanso-texto': a['--ink'], marca: a['--accent'],
  };
};
// nomes semânticos → tokens de hoje (para aplicar por cima do app sem mudar o código)
const MAPA = { '--bg': 'fundo', '--surface': 'superficie', '--surface-2': 'superficie-2', '--ink': 'texto', '--muted': 'texto-2', '--line': 'linha', '--edge': 'borda-controle', '--accent': 'acao', '--accent-soft': 'acao-suave', '--accent-ink': 'texto-sobre-acao', '--link': 'acao', '--ok': 'feito', '--ok-soft': 'feito-suave', '--warn': 'atencao', '--warn-soft': 'atencao-suave', '--alert': 'alerta', '--alert-soft': 'alerta-suave' };

// ---------- as medidas ----------
const PARES = [
  ['texto', 'fundo', 4.5, 'texto principal no fundo'],
  ['texto', 'superficie', 4.5, 'texto principal na superfície (cartão)'],
  ['texto-2', 'fundo', 4.5, 'texto secundário no fundo'],
  ['texto-2', 'superficie', 4.5, 'texto secundário na superfície'],
  ['texto-2', 'superficie-2', 4.5, 'selo de evidência (texto 2 na superfície 2)'],
  ['acao', 'fundo', 4.5, 'ação como texto (link) no fundo'],
  ['acao', 'superficie', 4.5, 'ação como texto na superfície'],
  ['texto-sobre-acao', 'acao', 4.5, 'texto sobre o botão de ação'],
  ['acao', 'fundo', 3, 'ação como controle/foco no fundo'],
  ['acao', 'superficie', 3, 'ação como controle/foco na superfície'],
  ['texto', 'acao-suave', 4.5, 'texto na faixa suave da ação (opção marcada)'],
  ['feito', 'fundo', 4.5, 'feito como texto no fundo'],
  ['feito', 'feito-suave', 4.5, 'feito na própria faixa (série feita)'],
  ['texto', 'feito-suave', 4.5, 'texto principal na faixa de feito'],
  ['atencao', 'fundo', 4.5, 'atenção como texto no fundo'],
  ['atencao', 'atencao-suave', 4.5, 'atenção na própria faixa (aviso)'],
  ['texto', 'atencao-suave', 4.5, 'texto principal na faixa de atenção'],
  ['alerta', 'fundo', 4.5, 'alerta como texto no fundo ("Senti algo")'],
  ['alerta', 'fundo', 3, 'alerta como borda de controle no fundo'],
  ['alerta', 'alerta-suave', 4.5, 'alerta na própria faixa'],
  ['texto', 'alerta-suave', 4.5, 'texto principal na faixa de alerta'],
  ['superficie', 'alerta', 4.5, 'texto claro sobre o botão de alerta ("Apagar tudo")'],
  ['borda-controle', 'fundo', 3, 'borda de controle no fundo'],
  ['borda-controle', 'superficie', 3, 'borda de controle na superfície'],
  ['descanso-texto', 'descanso', 4.5, 'relógio do descanso no painel'],
  ['acao', 'descanso', 3, 'barra do descanso (ação) no painel'],
  ['superficie', 'fundo', 1, 'superfície sobre o fundo (só informação: sem mínimo na WCAG)'],
];
const SOBRE_PALCO = ['acao', 'alerta', 'feito', 'atencao', 'texto', 'texto-2'];
const CONFUSOES = [
  ['acao', 'trajetória (--path)', 'a ação do app × a linha azul da trajetória'],
  ['acao', 'elastico', 'a ação × o elástico roxo'],
  ['acao', 'guia (--guide)', 'a ação × a linha-guia verde-azulada'],
  ['acao', 'junta', 'a ação × as juntas'],
  ['alerta', 'erro (--err)', 'o alerta de saúde × o erro de execução'],
  ['alerta', 'músculo principal (estilo A, --m-p)', 'o alerta de saúde × o vermelho do músculo principal'],
  ['atencao', 'músculo secundário (estilo A, --m-s)', 'a atenção × o laranja do músculo secundário'],
  ['atencao', 'músculo principal (estilo A, --m-p)', 'a atenção × o vermelho do músculo principal'],
  ['feito', 'fantasma certo (--ghost)', 'o feito × o verde do certo (fantasma)'],
  ['acao', 'músculo principal (estilo A, --m-p)', 'a ação × o vermelho do músculo (nunca pode confundir)'],
  ['acao', 'alerta', 'a ação × o alerta do próprio app'],
  ['acao', 'erro (--err)', 'a ação × o vermelho do erro'],
  ['acao', 'músculo secundário (estilo A, --m-s)', 'a ação × o laranja do músculo secundário'],
  ['acao', 'fantasma certo (--ghost)', 'a ação × o verde do certo (fantasma)'],
  ['alerta', 'músculo secundário (estilo A, --m-s)', 'o alerta × o laranja do músculo secundário'],
  ['feito', 'acao', 'o feito × a ação do próprio app'],
  ['atencao', 'alerta', 'a atenção × o alerta do próprio app'],
];
function medir(p, tema) {
  const pares = PARES.map(([a, b, min, rot]) => ({ par: rot, cor: p[a], fundo: p[b], razao: contraste(p[a], p[b]), minimo: min, ok: contraste(p[a], p[b]) >= min }));
  const palco = BONECO[tema].palco;
  const sobrePalco = SOBRE_PALCO.map((k) => ({ cor: k, hex: p[k], razaoNoPalco: contraste(p[k], palco) }));
  const palcoNaSuperficie = { palcoNaSuperficie: contraste(palco, p.superficie), palcoNoFundo: contraste(palco, p.fundo) };
  const confusoes = CONFUSOES.map(([a, b, rot]) => {
    const hb = BONECO[tema][b] ?? p[b];
    const r = { par: rot, a: p[a], b: hb, normal: dE(p[a], hb) };
    for (const t of Object.keys(MACHADO)) r[t] = dE(simular(p[a], t), simular(hb, t));
    return r;
  });
  return { pares, sobrePalco, ...palcoNaSuperficie, confusoes };
}
const oklchTxt = (hex) => {
  const [L, C, h] = hex2oklch(hex);
  return `oklch(${(L * 100).toFixed(0)}% ${C.toFixed(3)} ${h.toFixed(0)})`;
};

const saida = { geradoEm: '2026-11-06', boneco: BONECO, direcoes: {} };
const DIRS = { atual: { nome: 'Hoje (design v2)', intencao: 'A paleta que está no app, medida com a mesma régua.' }, ...DIRECOES };
for (const [id, dir] of Object.entries(DIRS)) {
  saida.direcoes[id] = { nome: dir.nome, intencao: dir.intencao, temas: {} };
  for (const tema of ['claro', 'escuro']) {
    const p = id === 'atual' ? paletaAtual(tema) : paleta(dir, tema);
    saida.direcoes[id].temas[tema] = { paleta: p, oklch: Object.fromEntries(Object.entries(p).map(([k, v]) => [k, oklchTxt(v)])), medidas: medir(p, tema) };
    // tokens prontos: nomes de hoje (para aplicar no app sem mudar código) e nomes semânticos (proposta)
    const hoje = Object.entries(MAPA).map(([t, k]) => `${t}:${p[k]}`).join('; ');
    writeFileSync(`${SAIDA}/tokens-${id}-${tema}.css`, `${hoje};\n`);
  }
}
writeFileSync(`${SAIDA}/paletas.json`, JSON.stringify(saida, null, 1) + '\n');

// ---------- relatório em markdown ----------
let md = `# Paletas calculadas (agente 5, ${saida.geradoEm})\n\nGerado por \`scripts/design/redesign/agente-5/cor.mjs\`. Razões pela fórmula da WCAG 2.x; distâncias em OKLab (×100).\n\n`;
md += `## Cores do Boneco (não mudam)\n\n| cor | claro | escuro |\n|---|---|---|\n`;
for (const k of Object.keys(BONECO.claro)) md += `| ${k} | ${BONECO.claro[k]} ${oklchTxt(BONECO.claro[k])} | ${BONECO.escuro[k]} ${oklchTxt(BONECO.escuro[k])} |\n`;
for (const [id, d] of Object.entries(saida.direcoes)) {
  md += `\n## ${d.nome} (\`${id}\`)\n\n${d.intencao}\n\n### Paleta\n\n| nome semântico | claro | escuro |\n|---|---|---|\n`;
  for (const k of Object.keys(d.temas.claro.paleta)) md += `| ${k} | ${d.temas.claro.paleta[k]} · ${d.temas.claro.oklch[k]} | ${d.temas.escuro.paleta[k]} · ${d.temas.escuro.oklch[k]} |\n`;
  md += `\n### Contraste (WCAG 2.2)\n\n| par | mínimo | claro | escuro |\n|---|---:|---:|---:|\n`;
  d.temas.claro.medidas.pares.forEach((par, i) => {
    const e = d.temas.escuro.medidas.pares[i];
    const f = (x) => `${x.razao.toFixed(2)}:1${x.minimo > 1 ? (x.ok ? ' ✓' : ' ✗') : ''}`;
    md += `| ${par.par} | ${par.minimo > 1 ? par.minimo + ':1' : '—'} | ${f(par)} | ${f(e)} |\n`;
  });
  md += `\n### Sobre o palco do Boneco (razão da cor do app contra \`--stage\`)\n\n| cor | claro | escuro |\n|---|---:|---:|\n`;
  d.temas.claro.medidas.sobrePalco.forEach((s, i) => (md += `| ${s.cor} | ${s.razaoNoPalco.toFixed(2)}:1 | ${d.temas.escuro.medidas.sobrePalco[i].razaoNoPalco.toFixed(2)}:1 |\n`));
  md += `| palco × superfície (moldura do palco) | ${d.temas.claro.medidas.palcoNaSuperficie.toFixed(2)}:1 | ${d.temas.escuro.medidas.palcoNaSuperficie.toFixed(2)}:1 |\n`;
  md += `\n### Distância das cores do app às do Boneco (ΔE OKLab ×100; normal / protanopia / deuteranopia / tritanopia)\n\n| par | claro | escuro |\n|---|---|---|\n`;
  d.temas.claro.medidas.confusoes.forEach((c, i) => {
    const e = d.temas.escuro.medidas.confusoes[i];
    const f = (x) => `${x.normal} / ${x.protanopia} / ${x.deuteranopia} / ${x.tritanopia}`;
    md += `| ${c.par} | ${f(c)} | ${f(e)} |\n`;
  });
}
writeFileSync(`${SAIDA}/paletas.md`, md);
console.log('paletas:', `${SAIDA}/paletas.json`, `${SAIDA}/paletas.md`);
for (const [id, d] of Object.entries(saida.direcoes))
  for (const tema of ['claro', 'escuro']) {
    const falhas = d.temas[tema].medidas.pares.filter((x) => x.minimo > 1 && !x.ok);
    console.log(id, tema, falhas.length ? 'FALHA: ' + falhas.map((f) => `${f.par} ${f.razao}`).join('; ') : 'todos os pares no mínimo');
  }

// ---------- a paleta ao lado e por cima do palco do Boneco real ----------
if (process.argv.includes('--sem-imagens')) process.exit(0);
const entrada = `export * from './src/engine/index.ts'; export * from './src/engine/estilo/index.ts';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false, logLevel: 'silent' });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const ex = (id) => M.EX.find((e) => e.id === id);
const instante = (e) => {
  let t = 0;
  const p = [];
  for (const s of e.seq) {
    if (s.kind === 'hold') p.push(t + s.dur / 2);
    t += s.dur;
  }
  return p[1] ?? t / 2;
};
const svgDe = (q, cls = '') => `<svg class="${q.classe} ${cls}" viewBox="${q.viewBox}">${q.html}</svg>`;
const sup = ex('supino-reto');
const afu = ex('afundo');
const qMus = M.montarSvgEstilo(sup, M.vistaDaMiniatura(sup, instante(sup), 'a'), 'mus', instante(sup), 0, 360, 'a');
const qErr = M.montarSvgEstilo(afu, afu.views[0], 'err', M.instanteDoErro(afu, 0), 0, 360, 'a', false, { tituloErro: afu.errors[0]?.title ?? afu.errors[0]?.id });
const qTraj = M.montarSvgEstilo(sup, sup.views[0], 'path', instante(sup), 0, 360, 'a');
const qMini = M.montarSvgEstilo(afu, M.vistaDaMiniatura(afu, instante(afu), 'a'), 'mus', instante(afu), 0, 120, 'a');

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch();
for (const [id, d] of Object.entries(saida.direcoes)) {
  for (const tema of ['claro', 'escuro']) {
    const p = d.temas[tema].paleta;
    const tokens = Object.entries(MAPA).map(([t, k]) => `${t}:${p[k]}`).join(';');
    const chip = (k, extra = '') => `<span class="chip" style="background:${p[k]};color:${['fundo', 'superficie', 'superficie-2', 'linha', 'acao-suave', 'feito-suave', 'atencao-suave', 'alerta-suave', 'descanso'].includes(k) ? p.texto : ['texto', 'texto-2', 'borda-controle'].includes(k) ? p.fundo : tema === 'escuro' ? p['texto-sobre-acao'] : '#fff'}${extra}">${k}</span>`;
    const html = `<!doctype html><html data-theme="${tema === 'escuro' ? 'dark' : 'light'}"><head><meta charset="utf-8"><style>${css}
:root,:root[data-theme="dark"]{${tokens}}
body{margin:0;padding:16px;background:var(--bg);color:var(--ink);font-family:system-ui,sans-serif;width:1120px}
h1{font-size:18px;margin:0 0 10px}h1 small{color:var(--muted);font-weight:400;font-size:14px}
.grade{display:grid;grid-template-columns:360px 360px 1fr;gap:14px;align-items:start}
.card{background:var(--surface);border-radius:20px;overflow:hidden;padding:0 0 10px}
.card .stage{width:360px}
.card p{margin:8px 12px 0;font-size:14px;color:var(--muted)}
.chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px 12px 0}
.chip{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;font-size:13px;font-weight:700;border:1px solid var(--line)}
.sobre{position:absolute;left:10px;right:10px;bottom:10px;display:flex;gap:6px;flex-wrap:wrap}
.sobre .chip{min-height:26px;font-size:12px}
.hud2{position:absolute;left:10px;right:10px;top:10px;display:flex;justify-content:space-between;align-items:flex-start}
.phase2{background:color-mix(in srgb,var(--surface) 92%,transparent);border-radius:10px;padding:4px 10px;font-size:14px;color:var(--ink)}
.breath2{font-weight:800;letter-spacing:.04em;font-size:15px;padding:4px 12px;border-radius:999px;background:var(--accent);color:var(--accent-ink)}
.coluna{display:flex;flex-direction:column;gap:10px}
.btn{min-height:48px;font-size:16px}
.linha-ex{display:grid;grid-template-columns:96px 1fr;gap:12px;align-items:center;background:var(--surface);border-radius:16px;padding:10px}
.linha-ex .miniatura{width:96px}
.faixas{display:flex;gap:6px;flex-wrap:wrap}
.faixas span{padding:6px 10px;border-radius:10px;font-size:14px;font-weight:700}
</style></head><body>
<h1>${d.nome} · tema ${tema} <small>a paleta do app em volta e por cima do palco do Boneco (as cores do palco não mudam)</small></h1>
<div class="grade">
 <div class="card"><div class="stage">${svgDe(qMus)}<div class="hud2"><div class="phase2"><b>Músculos</b></div><span class="breath2">EXPIRA</span></div><div class="sobre">${chip('acao')}${chip('alerta')}${chip('feito')}${chip('atencao')}${chip('texto')}</div></div><p>Supino reto, modo Músculos: as cores do app sobre o palco</p></div>
 <div class="card"><div class="stage">${svgDe(qErr)}<div class="hud2"><div class="phase2"><b>Erros</b></div></div><div class="errbanner on" style="background:var(--alert)">Alerta de saúde do app, para comparar com o erro do Boneco</div></div><p>Afundo, modo Erros: o vermelho do erro × o alerta do app</p></div>
 <div class="coluna">
  <div class="linha-ex"><div class="miniatura">${svgDe(qMini)}</div><div><b>Afundo</b><div style="color:var(--muted);font-size:14px">3 × 8–12 · RIR 2 <span class="selo">evidência moderada</span></div></div></div>
  <button class="btn">Série feita</button>
  <button class="btn sec">Trocar exercício</button>
  <div class="faixas"><span style="background:var(--ok-soft);color:var(--ok)">1 · 8 kg × 10 · RIR 2</span><span style="background:var(--warn-soft);color:var(--warn)">abaixo da meta</span><span style="border:1.5px solid var(--alert);color:var(--alert)">Senti algo</span><span style="background:${p.descanso};color:${p['descanso-texto']}">descanso 1:30</span></div>
  <div class="chips">${Object.keys(p).map((k) => chip(k)).join('')}</div>
  <div class="card" style="padding:10px"><div class="stage" style="width:200px;aspect-ratio:4/3">${svgDe(qTraj)}</div><p>Trajetória: o azul do Boneco × a ação</p><div style="padding:8px 12px 0"><a href="#" style="color:var(--link);font-weight:700">Ver como fazer</a></div></div>
 </div>
</div></body></html>`;
    const pg = await b.newPage({ viewport: { width: 1152, height: 760 }, colorScheme: tema === 'escuro' ? 'dark' : 'light', deviceScaleFactor: 1 });
    await pg.setContent(html);
    await pg.screenshot({ path: `${SAIDA}/palco-${id}-${tema}.png`, fullPage: true });
    await pg.close();
  }
}
await b.close();
console.log('palco:', SAIDA);

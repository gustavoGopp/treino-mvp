// As pranchas finais dos dois desenhos escolhidos, ao lado do boneco de hoje: as poses da rodada 3, nos temas claro e
// escuro, no tamanho de palco e de miniatura. Também imprime as medidas usadas em decisao.md e viabilidade.md
// (contraste das cores, tamanho do SVG por quadro, tempo de desenho).
// Uso: node scripts/boneco-desenho/final.mjs  → docs/revisoes/boneco-desenho/final/prancha-*.png e medidas.json
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { PAPEIS } from './conceitos.mjs';
import { maoNoHalter, peApoiado } from './detalhes.mjs';
import { CINZA, PELE, TRACO, naEscala } from './estilos-finais.mjs';
import { figura, zerarFigura } from './figura.mjs';
import { fotografar, palco } from './foto.mjs';
import { POSES, corpoPadrao as corpo, motor as m, pontos } from './poses.mjs';
import { misturar, zerarIds } from './tinta.mjs';

const SAIDA = 'docs/revisoes/boneco-desenho/final';
const braco = (sx) => ({ pegada: [sx * 21, 207, 2], polo: [sx * 1, 0, 0.25], mao: { polegar: [-sx, 0, 0], forma: 'pegada' } });
const alto = m.resolver(corpo, { ...m.poseEmPe(corpo), braco: { R: braco(-1), L: braco(1) } });
const P = {
  frente: pontos(POSES.empe().esq, 'frontal'), lado: pontos(POSES.empe().esq, 'lateral'), alto: pontos(alto, 'frontal'),
  agach: pontos(POSES.agachamento().esq, 'lateral'), flex: pontos(POSES.flexao().esq, 'lateral'),
  supino: pontos(m.supinoReto.quadro(corpo, 1).esq, 'lateral'), puxada: pontos(m.puxadaUnilateral.quadro(corpo, 1).esq, 'lateral'),
};
const HALTER = [[8.7, 52.1], [16.7, 84.2]];
const PAPEL = { ...PAPEIS, supino: { peitoral: 'p', triceps: 's', deltoide: 's' }, puxada: { dorsal: 'p', biceps: 's', deltoide: 's', trapezio: 's' } };
const FUNDO = { claro: '#f7f9fa', escuro: '#10171b' }, CHAO = { claro: '#d5dce1', escuro: '#33414b' }, FERRO = { claro: '#27343f', escuro: '#cfd8de' }, ACO = '#8a98a3', PECA = { claro: ['#7f8b96', '#aab4bc'], escuro: ['#56656f', '#3d4b55'] };
const anilha = (t) => `<rect x="-15" y="0" width="22.8" height="2.4" rx="0.6" fill="${FERRO[t]}"/>`;
const banco = (t) => `<rect x="-76" y="37.1" width="122" height="6.4" rx="2" fill="${PECA[t][0]}"/><g fill="${PECA[t][1]}"><rect x="-70" y="32.2" width="110" height="5"/><rect x="-62.5" y="0" width="5" height="34.6"/><rect x="27.5" y="0" width="5" height="34.6"/></g>`;
const tapete = (t) => `<rect x="-72" y="0" width="100" height="1.6" rx="0.8" fill="${PECA[t][1]}"/>`;
const discos = (K) => `<circle cx="-11" cy="76.7" r="6.9" fill="${K.ferro}"/><circle cx="-1.5" cy="76.7" r="6.9" fill="${K.ferro}"/>`;
const cabo = (K) => `<path d="M10 110.5L40.9 195.3" stroke="${K.ferro}" stroke-width="0.9"/><path d="M-1.7 99.2L10 110.5L9.6 94.3" fill="none" stroke="${K.ferro}" stroke-width="1.1" stroke-linejoin="round"/><path d="M-1.7 99.2L9.6 94.3" stroke="${K.aco}" stroke-width="3.2" stroke-linecap="round"/>`;

const ESC = 1.5; // px por cm no palco das pranchas
const CAIXA = { empe: [-43, -8, 86, 196], alto: [-45, -8, 90, 234], agach: [-52, -8, 100, 138], flex: [-16, -8, 200, 72], supino: [-84, -8, 180, 104], puxada: [-72, -8, 132, 180] };
const MINI = { agach: [-68, -8, 136, 136], flex: [-16, -70, 200, 200], supino: [-84, -44, 180, 180], puxada: [-78, -8, 180, 180], frente: [-98, -8, 196, 196] };
/** O SVG (em cm) de uma pose, sem o palco: serve para a prancha e para as medidas. */
function cena(estilo, tipo, { tema = 'claro', mus = true, pxPorCm = ESC, mini = false } = {}) {
  const c = naEscala(estilo, pxPorCm, { mini }), base = { tema };
  if (tipo === 'frente') return figura(P.frente, 'frente', c, base);
  if (tipo === 'lado') return figura(P.lado, 'lado', c, base);
  if (tipo === 'costas') return figura(P.frente, 'costas', c, { ...base, papeis: mus ? PAPEL.puxada : null });
  if (tipo === 'alto') return figura(P.alto, 'frente', c, { ...base, halteresDeFrente: true });
  if (tipo === 'agach') return anilha(tema) + figura(P.agach, 'lado', c, { ...base, halter: HALTER, papeis: mus ? PAPEL.agachamento : null });
  if (tipo === 'flex') return figura(P.flex, 'lado', c, { ...base, maoNoChao: true, papeis: mus ? PAPEL.flexao : null });
  if (tipo === 'supino') return banco(tema) + figura(P.supino, 'lado', c, { ...base, pegada: true, papeis: mus ? PAPEL.supino : null, atrasDoBraco: discos });
  return tapete(tema) + figura(P.puxada, 'lado', c, { ...base, pegada: true, papeis: mus ? PAPEL.puxada : null, atrasDoBraco: cabo });
}
const noPalco = (estilo, tipo, op = {}) => {
  const caixa = CAIXA[tipo === 'frente' || tipo === 'lado' || tipo === 'costas' ? 'empe' : tipo];
  return palco(cena(estilo, tipo, op), caixa, Math.round(caixa[2] * ESC), { fundo: FUNDO[op.tema ?? 'claro'], chao: CHAO[op.tema ?? 'claro'], raio: 12 });
};
const naMini = (estilo, tipo, tema) => palco(cena(estilo, tipo, { tema, pxPorCm: 96 / MINI[tipo][2], mini: true }), MINI[tipo], 96, { fundo: FUNDO[tema], chao: CHAO[tema], raio: 9 });
/** A mão e o pé em tamanho grande, no estilo e no tema. */
function grandes(estilo, tema) {
  const K = estilo.cores(tema), px = 5; // 200 px para 40 cm
  const e = { pele: K.pele, contorno: { cor: estilo.contornoNaCor ? 'propria' : K.contorno, esp: TRACO.palcoPx / px * 2.2 }, ferro: FERRO[tema], aco: ACO, fundo: FUNDO[tema], descalco: !!estilo.descalco, calcado: K.calcado, sola: tema === 'claro' ? '#8a98a3' : '#7d8c97', linha: misturar(K.pele, tema === 'claro' ? '#16202a' : '#05080a', 0.4) };
  const g = (svg, caixa, chao) => palco(svg, caixa, 200, { fundo: FUNDO[tema], chao: chao ? CHAO[tema] : null, raio: 12 });
  return [g(maoNoHalter(e), [-20, -10, 40, 40], false), g(peApoiado(e), [-11, -4, 40, 40], true)];
}

/* ----- o boneco de hoje, do motor do app (só leitura), enquadrado pelo próprio desenho ----- */
const css = readFileSync('src/styles.css', 'utf8');
const { outputFiles } = await build({ stdin: { contents: `export * from './src/engine/index.ts'; export { montarSvgEstilo } from './src/engine/estilo/index.ts';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const hoje = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const svgHoje = (id, vista, modo, t) => {
  const ex = hoje.EX.find((e) => e.id === id), q = hoje.montarSvgEstilo(ex, vista, modo, t, 0, 300, 'a2', false, {});
  return { svg: `<svg class="${q.classe} bd-auto" viewBox="${q.viewBox}" preserveAspectRatio="xMidYMid meet">${q.html}</svg>`, bytes: q.html.length };
};
const HOJE = [['Em pé', svgHoje('goblet', 'frontal', 'tec', 0.2), 86, 196], ['Agachamento', svgHoje('goblet', 'lateral', 'tec', 3.1), 100, 138], ['Com o músculo', svgHoje('goblet', 'lateral', 'mus', 3.1), 100, 138], ['Flexão, com o músculo', svgHoje('flexao', 'lateral', 'mus', 2.6), 200, 72], ['Supino, com o músculo', svgHoje('supino-reto', 'lateral', 'mus', 3.3), 180, 104], ['No cabo, com o músculo', svgHoje('puxada-unilateral', 'lateral', 'mus', 2.0), 132, 180]];
// enquadra cada desenho de hoje pelo corpo (sem a torre da polia nem os rótulos), com o chão embaixo
const ENQUADRAR = `for (const svg of document.querySelectorAll('svg.bd-auto')) {
  const vb = svg.viewBox.baseVal, r = svg.getBoundingClientRect(), k = Math.min(r.width / vb.width, r.height / vb.height), ox = r.left + (r.width - vb.width * k) / 2, oy = r.top + (r.height - vb.height * k) / 2;
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const el of svg.querySelectorAll('[class*="ea-pele"],[class*="ea-cont"],.ea-mp,.ea-ms')) { const b = el.getBoundingClientRect(); if (!b.width && !b.height) continue; x0 = Math.min(x0, b.left); y0 = Math.min(y0, b.top); x1 = Math.max(x1, b.right); y1 = Math.max(y1, b.bottom); }
  const ux0 = vb.x + (x0 - ox) / k, uy0 = vb.y + (y0 - oy) / k, uw = (x1 - x0) / k, uh = (y1 - y0) / k;
  const alvo = svg.parentElement.getBoundingClientRect(), razao = alvo.width / alvo.height;
  let w = uw * 1.16, h = (Math.max(uy0 + uh, 0) + 8 - uy0) * 1.06; if (w / h < razao) w = h * razao; else h = w / razao;
  const cx = ux0 + uw / 2, base = Math.max(uy0 + uh, 0) + 8;
  svg.setAttribute('viewBox', [cx - w / 2, base - h, w, h].join(' '));
}`;
const ESCURO_HOJE = '--stage:#10171b;--fig:#e7eef2;--fig-far:#4f5e69;--torso:#5d6e7a;--joint:#2bb3a6;--eq:#2a353e;--eq-dark:#53626d;--cable:#a3b3bf;--ea-pele:#56656f;--ea-pele-longe:#2c3740;--ea-cont-longe:#4f5e69';
const hojeCel = (svg, w, h, escuro = false) => `<div class="bd-hoje${escuro ? ' bd-esc' : ''}" style="width:${w}px;height:${h}px;${escuro ? ESCURO_HOJE : ''}">${svg}</div>`;

const cel = (titulo, conteudo) => `<div class="bd-cel"><div class="bd-tit">${titulo}</div>${conteudo}</div>`;
function prancha(estilo) {
  zerarIds();
  zerarFigura();
  const tema = (t, nome) => {
    const [mao, pe] = grandes(estilo, t);
    return `<h2>${nome}</h2>
<div class="bd-lin">${cel('Em pé, de frente', noPalco(estilo, 'frente', { tema: t }))}${cel('De lado', noPalco(estilo, 'lado', { tema: t }))}${cel('De costas', noPalco(estilo, 'costas', { tema: t, mus: false }))}${cel('De costas, com o músculo', noPalco(estilo, 'costas', { tema: t }))}${cel('Braços acima da cabeça', noPalco(estilo, 'alto', { tema: t }))}${cel('Agachamento', noPalco(estilo, 'agach', { tema: t, mus: false }))}${cel('Com o músculo', noPalco(estilo, 'agach', { tema: t }))}</div>
<div class="bd-lin">${cel('Flexão, com o músculo', noPalco(estilo, 'flex', { tema: t }))}${cel('Supino, com o músculo', noPalco(estilo, 'supino', { tema: t }))}${cel('Ajoelhado, puxando o cabo', noPalco(estilo, 'puxada', { tema: t }))}${cel('A mão segurando o halter', mao)}${cel('O pé apoiado', pe)}</div>
<div class="bd-lin">${cel('Miniaturas (96 px)', `<div class="bd-minis">${['frente', 'agach', 'flex', 'supino', 'puxada'].map((tp) => naMini(estilo, tp, t)).join('')}</div>`)}</div>`;
  };
  return `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:0;padding:26px 28px 20px;background:#fff;color:#171b20;font:15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
h1{font-size:27px;margin:0 0 4px;letter-spacing:-.01em}.bd-sub{color:#5b6570;margin:0 0 12px;font-size:15.5px;max-width:1300px}
h2{font-size:18px;margin:14px 0 8px;border-top:2px solid #171b20;padding-top:8px}
.bd-lin{display:flex;gap:9px;align-items:flex-end;margin-bottom:12px;flex-wrap:wrap}.bd-tit{font-size:12.2px;color:#464b51;margin-bottom:4px;line-height:1.25}
.bd-minis{display:flex;gap:7px}
.bd-hoje{border-radius:12px;overflow:hidden;background:#f7f9fa;display:flex;align-items:center;justify-content:center}.bd-hoje.bd-esc{background:#10171b}
.bd-hoje svg{width:100%;height:100%;background:var(--stage)}.bd-hoje svg text,.bd-hoje svg .gd{display:none}
</style><h1>Boneco · ${estilo.nome} (${estilo.papel})</h1>
<p class="bd-sub">Prancha final do desenho escolhido em 13/11/2026, ao lado do boneco de hoje. Traço de ${String(TRACO.palcoPx).replace('.', ',')} px no palco e de ${TRACO.miniPx} px na miniatura. Na miniatura somem as linhas do corpo, as divisões do músculo e o polegar.</p>
<h2>O boneco de hoje (o que está no app)</h2>
<div class="bd-lin">${HOJE.map(([t, h, w, a]) => cel(t, hojeCel(h.svg, Math.round(w * ESC), Math.round(a * ESC)))).join('')}${cel('Miniatura', hojeCel(HOJE[2][1].svg, 96, 96))}${cel('&nbsp;', hojeCel(HOJE[2][1].svg, 96, 96, true))}</div>
${tema('claro', 'Tema claro')}${tema('escuro', 'Tema escuro')}
<script>${ENQUADRAR}</script>`;
}

/* ----- medidas ----- */
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const contraste = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100; };
function medir() {
  const out = { contraste: {}, quadro: {}, hoje: {} };
  for (const est of [CINZA, PELE]) for (const t of ['claro', 'escuro']) {
    const K = est.cores(t), F = FUNDO[t], traco = est.contornoNaCor ? misturar(K.pele, '#16202a', 0.42) : K.contorno;
    out.contraste[`${est.id}/${t}`] = {
      'corpo × fundo': contraste(K.pele, F), 'traço × fundo': contraste(traco, F), 'traço × corpo': contraste(traco, K.pele), 'linhas do corpo × corpo': contraste(K.linhaMus, K.pele),
      'principal × corpo': contraste(K.musP, K.pele), 'secundário × corpo': contraste(K.musS, K.pele), 'principal × secundário': contraste(K.musP, K.musS), 'principal × fundo': contraste(K.musP, F),
      ...(K.short ? { 'short × fundo': contraste(K.short, F), 'short × corpo': contraste(K.short, K.pele), 'cabelo × fundo': contraste(K.cabelo, F) } : {}),
    };
  }
  for (const est of [CINZA, PELE]) for (const tipo of ['agach', 'supino', 'puxada', 'frente']) {
    zerarIds();
    zerarFigura();
    const s = cena(est, tipo), sm = cena(est, tipo === 'frente' ? 'frente' : tipo, { mini: true, pxPorCm: 0.7 });
    const t0 = performance.now();
    for (let i = 0; i < 200; i++) cena(est, tipo);
    const ms = (performance.now() - t0) / 200;
    out.quadro[`${est.id}/${tipo}`] = { bytes: s.length, gzip: gzipSync(s).length, caminhos: (s.match(/<path/g) ?? []).length, recortes: (s.match(/<clipPath/g) ?? []).length, bytesMini: sm.length, recortesMini: (sm.match(/<clipPath/g) ?? []).length, msPorQuadro: Math.round(ms * 100) / 100 };
  }
  for (const [nome, h] of HOJE) out.hoje[nome] = { bytes: h.bytes, gzip: gzipSync(h.svg).length, caminhos: (h.svg.match(/<(path|polygon|polyline|line|circle)/g) ?? []).length, recortes: (h.svg.match(/<clipPath/g) ?? []).length };
  return out;
}

mkdirSync(SAIDA, { recursive: true });
for (const est of [CINZA, PELE]) {
  await fotografar(prancha(est), `${SAIDA}/prancha-${est.id}.png`, { largura: 1420, escala: 2 });
  console.log(`prancha ${est.id}`);
}
const medidas = medir();
// o peso do código de desenho desta sessão, empacotado e comprimido (teto: o motor final reaproveita só parte)
const pacote = await build({ entryPoints: ['scripts/boneco-desenho/figura.mjs'], bundle: true, minify: true, format: 'esm', write: false });
medidas.codigo = { arquivos: 'figura.mjs + tinta.mjs + musculos-prova.mjs + as tabelas de boneco-prova.mjs', minificado: pacote.outputFiles[0].text.length, gzip: gzipSync(pacote.outputFiles[0].text).length };
writeFileSync(`${SAIDA}/medidas.json`, JSON.stringify(medidas, null, 1) + '\n');
console.log(JSON.stringify(medidas));

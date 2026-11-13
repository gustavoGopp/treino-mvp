// Quadro de opções do corpo novo: o boneco de hoje ao lado de três acabamentos da malha (traço, ilustração e volume),
// nas mesmas poses. Uso: node scripts/animacao-nova/quadro-de-opcoes.mjs
// Saída: docs/revisoes/animacao-nova/prototipos/quadro-de-opcoes.png (e o .html usado para tirar a imagem, em test-results/).
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { motorNovoTexto } from './empacotar.mjs';

const css = readFileSync('src/styles.css', 'utf8');
// ---------- o boneco de hoje (motor atual, estilo A2) ----------
const { outputFiles } = await build({ stdin: { contents: `export * from './src/engine/index.ts'; export { montarSvgEstilo } from './src/engine/estilo/index.ts';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const hoje = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const svgHoje = (id, vista, modo, t) => {
  const ex = hoje.EX.find((e) => e.id === id);
  const q = hoje.montarSvgEstilo(ex, vista, modo, t, 0, 300, 'a2', false, {});
  return `<svg class="${q.classe}" viewBox="${q.viewBox}">${q.html}</svg>`;
};
const js = await motorNovoTexto(`export * from './src/engine/novo/index.ts';`);
const linhas = [
  { rot: 'Em pé, de frente', hoje: svgHoje('goblet', 'frontal', 'tec', 0.2), pose: 'empe', vista: 'frontal' },
  { rot: 'Em pé, de lado', hoje: svgHoje('goblet', 'lateral', 'tec', 0.2), pose: 'empe', vista: 'lateral' },
  { rot: 'Agachamento embaixo, de lado, com os músculos', hoje: svgHoje('goblet', 'lateral', 'mus', 3.1), pose: 'fundo', vista: 'lateral', mus: true },
  { rot: 'Agachamento embaixo, de frente, com os músculos', hoje: svgHoje('goblet', 'frontal', 'mus', 3.1), pose: 'fundo', vista: 'frontal', mus: true },
  { rot: 'Agachamento embaixo, em três quartos (vista que hoje não existe)', hoje: '', pose: 'fundo', vista: 'quina', mus: true },
  { rot: 'Flexão embaixo, de lado, com os músculos', hoje: svgHoje('flexao', 'lateral', 'mus', 2.6), pose: 'flexao', vista: 'lateral', mus: true },
  { rot: 'Tema escuro', hoje: svgHoje('goblet', 'lateral', 'mus', 3.1), pose: 'fundo', vista: 'lateral', mus: true, escuro: true },
  { rot: 'No tamanho da miniatura', hoje: svgHoje('goblet', 'lateral', 'tec', 3.1), pose: 'fundo', vista: 'lateral', mini: true },
];
const html = `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:0;padding:18px 20px;background:#fff;color:#1a2833;font:15px/1.4 system-ui,sans-serif;width:1240px}
h1{font-size:22px;margin:0 0 4px}p{margin:0 0 14px;color:#4e5a64}
table{border-collapse:collapse;width:100%}th{font-size:15px;text-align:left;padding:6px 8px;border-bottom:2px solid #1a2833}
td{padding:8px;vertical-align:middle;border-bottom:1px solid #dfe5e9}td.rot{width:150px;font-size:13px;color:#4e5a64}
.cel{width:255px;height:255px;border-radius:10px;overflow:hidden;background:#f7f9fa;display:flex;align-items:center;justify-content:center}
.cel svg{width:255px;height:191px;background:var(--stage)}.cel canvas{display:block}
.cel.mini{width:96px;height:96px}.cel.mini svg{width:96px;height:72px}
.escuro{background:#10171b}.vazio{color:#8796a1;font-size:13px;text-align:center;padding:0 20px}
</style><h1>Boneco novo: três acabamentos do mesmo corpo, ao lado do boneco de hoje</h1>
<p>O corpo das colunas 1, 2 e 3 é o mesmo (malha de corpo humano em domínio público, movida pelo nosso esqueleto de medidas); muda só o acabamento. As regiões dos músculos ainda são demarcação provisória.</p>
<table><tr><th></th><th>Hoje</th><th>1 · Traço</th><th>2 · Ilustração</th><th>3 · Volume</th></tr>
${linhas.map((l, i) => `<tr><td class="rot">${l.rot}</td><td><div class="cel${l.mini ? ' mini' : ''}${l.escuro ? ' escuro' : ''}"${l.escuro ? ' style="--stage:#10171b;--fig:#e7eef2;--fig-far:#4f5e69;--torso:#5d6e7a;--joint:#2bb3a6;--eq:#2a353e;--eq-dark:#53626d;--cable:#a3b3bf;--ea-pele:#56656f;--ea-pele-longe:#2c3740;--ea-cont-longe:#4f5e69"' : ''}>${l.hoje || '<div class="vazio">não existe hoje</div>'}</div></td>${[0, 1, 2].map((m) => `<td><div class="cel${l.mini ? ' mini' : ''}${l.escuro ? ' escuro' : ''}" data-linha="${i}" data-modo="${m}"></div></td>`).join('')}</tr>`).join('')}
</table><script>${js}</script><script>
const m = MOTOR, corpo = m.CORPOS.homem, L = ${JSON.stringify(linhas.map(({ pose, vista, mus, escuro, mini }) => ({ pose, vista, mus, escuro, mini })))};
const hex = (h) => [1,3,5].map(i => parseInt(h.slice(i,i+2),16)/255);
const claro = { contorno: hex('#1a2833'), sombra: hex('#1a2833'), fundo: hex('#f7f9fa'), cores: { pele: hex('#c6d0d7'), peleLonge: hex('#dfe5e9'), musculoP: hex('#d62e26'), musculoS: hex('#ec961c'), musculoA: hex('#f3c98a'), obj: hex('#dfe5e9'), esc: hex('#6f7f8b'), ferro: hex('#27343f'), aco: hex('#8a98a3'), estofado: hex('#d5dde2'), tapete: hex('#b4c0c8'), chao: hex('#e9edf0'), cabo: hex('#4e5a64') } };
const escuro = { contorno: hex('#e7eef2'), sombra: hex('#05080a'), fundo: hex('#10171b'), cores: { pele: hex('#6b7b86'), peleLonge: hex('#2f3b44'), musculoP: hex('#f45248'), musculoS: hex('#f5aa3c'), musculoA: hex('#f3c98a'), obj: hex('#2c3740'), esc: hex('#7d8c97'), ferro: hex('#cfd8de'), aco: hex('#8a98a3'), estofado: hex('#3a4751'), tapete: hex('#2c3740'), chao: hex('#172026'), cabo: hex('#a3b3bf') } };
const poses = { empe: { esq: m.resolver(corpo, m.poseEmPe(corpo)), prims: [] }, fundo: m.goblet.quadro(corpo, 1), flexao: m.flexao.quadro(corpo, 1) };
const malha = m.malhaBase();
const mx = (a, b) => a.map((v, i) => Math.max(v, b[i]));
const MUS = { fundo: [m.mascaraDoMusculo(corpo, 'quadriceps'), mx(m.mascaraDoMusculo(corpo, 'gluteos'), m.mascaraDoMusculo(corpo, 'adutores'))], flexao: [m.mascaraDoMusculo(corpo, 'peitoral'), mx(m.mascaraDoMusculo(corpo, 'triceps'), m.mascaraDoMusculo(corpo, 'deltoideAnterior'))] };
// um só contexto 3D para todas as células (o navegador limita quantos podem existir); cada célula recebe a cópia da imagem
const tela = document.createElement('canvas'); const pintor = m.criarPintor(tela);
for (const cel of document.querySelectorAll('[data-linha]')) {
  const l = L[+cel.dataset.linha], modo = +cel.dataset.modo, q = poses[l.pose], cam = m.VISTAS[l.vista];
  const pos = m.pele(q.esq), nor = m.normais(pos, malha.tri);
  const mu = (l.mus && MUS[l.pose]) || [];
  const gc = { pos, nor, exp: nor, mat: new Float32Array(malha.pontos), mp: mu[0], ms: mu[1], tri: malha.tri };
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  for (let i = 0; i < pos.length; i += 3) { const x = pos[i]*cam.dir[0]+pos[i+1]*cam.dir[1]+pos[i+2]*cam.dir[2], y = pos[i]*cam.cima[0]+pos[i+1]*cam.cima[1]+pos[i+2]*cam.cima[2]; x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y); }
  const lado = Math.max(x1 - x0, y1 - y0) * 1.16, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 - (l.pose === 'empe' ? 0 : lado * 0.02);
  const px = l.mini ? 96 : 255;
  const c = document.createElement('canvas'); c.width = px * 2; c.height = px * 2; c.style.width = px + 'px'; c.style.height = px + 'px'; cel.appendChild(c);
  const traco = modo === 2 ? 0 : (l.mini ? 0.75 : 0.42) * (lado / 180);
  tela.width = px * 2; tela.height = px * 2;
  pintor.pintar([m.geoDosPrims(q.prims.filter((p) => p.t !== 'chao')), gc], cam, [cx - lado / 2, cy - lado / 2, lado, lado], modo, l.escuro ? escuro : claro, traco);
  c.getContext('2d').drawImage(tela, 0, 0);
}
document.title = 'pronto';
</script>`;
mkdirSync('test-results', { recursive: true });
mkdirSync('docs/revisoes/animacao-nova/prototipos', { recursive: true });
writeFileSync('test-results/quadro-de-opcoes.html', html);
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
p.on('pageerror', (e) => console.log('erro na página:', String(e).slice(0, 300)));
await p.goto('file://' + process.cwd() + '/test-results/quadro-de-opcoes.html');
await p.waitForFunction(() => document.title === 'pronto', null, { timeout: 60000 });
await p.screenshot({ path: 'docs/revisoes/animacao-nova/prototipos/quadro-de-opcoes.png', fullPage: true });
await b.close();
console.log('quadro: docs/revisoes/animacao-nova/prototipos/quadro-de-opcoes.png');

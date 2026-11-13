// Quadro de opções do boneco: o boneco de hoje e oito jeitos de desenhar o corpo, cada um numa faixa, nas mesmas
// poses. Todos usam o mesmo esqueleto de medidas e o mesmo movimento; muda só o desenho.
// Uso: node scripts/animacao-nova/opcoes-de-boneco.mjs → docs/revisoes/animacao-nova/prototipos/opcoes-de-boneco.png
import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { motorNovoTexto } from './empacotar.mjs';

const css = readFileSync('src/styles.css', 'utf8');
const { outputFiles } = await build({ stdin: { contents: `export * from './src/engine/index.ts'; export { montarSvgEstilo } from './src/engine/estilo/index.ts';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const hoje = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const svgHoje = (id, vista, modo, t) => {
  const ex = hoje.EX.find((e) => e.id === id);
  const q = hoje.montarSvgEstilo(ex, vista, modo, t, 0, 300, 'a2', false, {});
  return `<svg class="${q.classe}" viewBox="${q.viewBox}">${q.html}</svg>`;
};
const js = await motorNovoTexto(`export * from './src/engine/novo/index.ts';`);
export const OPCOES = [
  { id: 'pictograma', nome: '1 · Pictograma', ideia: 'Formas simples e chapadas, cabeça solta do corpo, como a sinalização esportiva.' },
  { id: 'capsulas', nome: '2 · Cápsulas com contorno', ideia: 'O jeito do boneco de hoje, com as medidas certas, mãos e pés de verdade.' },
  { id: 'manequim', nome: '3 · Manequim articulado', ideia: 'Peças lisas com as articulações à mostra, como o manequim de madeira de desenho.' },
  { id: 'massinha', nome: '4 · Massinha', ideia: 'Volume suave, sem contorno, como um boneco de massinha: rosto liso, short e tênis.' },
  { id: 'traco', nome: '5 · Desenho a traço', ideia: 'Só o contorno de uma pessoa de short e tênis, como folheto de fisioterapia.' },
  { id: 'silhueta', nome: '6 · Silhueta', ideia: 'O contorno de um corpo real preenchido de uma cor só, sem nada por dentro.' },
  { id: 'atleta', nome: '7 · Atleta estilizado', ideia: 'Corpo esculpido com rosto liso, cabelo, short e tênis, em três tons.' },
  { id: 'vidro', nome: '8 · Vidro com ossos', ideia: 'Corpo claro e os ossos e articulações à mostra por dentro: vê-se de onde nasce o movimento.' },
];
const colunas = [
  { rot: 'Em pé', pose: 'empe', vista: 'quina', hoje: svgHoje('goblet', 'frontal', 'tec', 0.2) },
  { rot: 'Agachamento, de lado', pose: 'fundo', vista: 'lateral', hoje: svgHoje('goblet', 'lateral', 'tec', 3.1) },
  { rot: 'Com o músculo que trabalha', pose: 'fundo', vista: 'lateral', mus: true, hoje: svgHoje('goblet', 'lateral', 'mus', 3.1) },
  { rot: 'Em três quartos', pose: 'fundo', vista: 'quina', mus: true, hoje: '' },
  { rot: 'Flexão', pose: 'flexao', vista: 'lateral', mus: true, hoje: svgHoje('flexao', 'lateral', 'mus', 2.6) },
  { rot: 'Supino', pose: 'supino', vista: 'lateral', hoje: svgHoje('supino-reto', 'lateral', 'tec', 3.3) },
  { rot: 'Tema escuro', pose: 'fundo', vista: 'lateral', mus: true, escuro: true, hoje: svgHoje('goblet', 'lateral', 'mus', 3.1) },
  { rot: 'Miniatura', pose: 'fundo', vista: 'lateral', mini: true, hoje: svgHoje('goblet', 'lateral', 'tec', 3.1) },
];
const escuroHoje = 'style="--stage:#10171b;--fig:#e7eef2;--fig-far:#4f5e69;--torso:#5d6e7a;--joint:#2bb3a6;--eq:#2a353e;--eq-dark:#53626d;--cable:#a3b3bf;--ea-pele:#56656f;--ea-pele-longe:#2c3740;--ea-cont-longe:#4f5e69"';
const cel = (c, extra = '') => `class="cel${c.mini ? ' mini' : ''}${c.escuro ? ' escuro' : ''}" ${extra}`;
const html = `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:0;padding:18px 20px;background:#fff;color:#1a2833;font:15px/1.4 system-ui,sans-serif;width:1500px}
h1{font-size:22px;margin:0 0 4px}p{margin:0 0 12px;color:#4e5a64;max-width:1300px}
table{border-collapse:collapse}th{font-size:13px;text-align:left;padding:6px 5px;border-bottom:2px solid #1a2833}
td{padding:5px;vertical-align:middle;border-bottom:1px solid #dfe5e9}
td.rot{width:172px}td.rot b{display:block;font-size:14.5px;margin-bottom:3px}td.rot span{font-size:12px;color:#4e5a64;line-height:1.3;display:block}
.cel{width:158px;height:158px;border-radius:9px;overflow:hidden;background:#f7f9fa;display:flex;align-items:center;justify-content:center}
.cel svg{width:158px;height:118px;background:var(--stage)}.cel canvas{display:block}
.cel.mini{width:88px;height:88px}.cel.mini svg{width:88px;height:66px}
.escuro{background:#10171b}.vazio{color:#8796a1;font-size:12px;text-align:center;padding:0 14px}
</style><h1>Opções de boneco: oito jeitos de desenhar o mesmo corpo</h1>
<p>Todas as faixas usam as mesmas medidas (tabela do corpo, com fonte) e o mesmo movimento (pés presos, peso no meio do pé, mãos que não saem do lugar). Muda só o desenho. Nas opções 1, 2 e 3, o destaque é da parte do corpo que trabalha; nas outras, da região do músculo (demarcação ainda provisória).</p>
<table><tr><th></th>${colunas.map((c) => `<th>${c.rot}</th>`).join('')}</tr>
<tr><td class="rot"><b>Hoje</b><span>O boneco que está no app.</span></td>${colunas.map((c) => `<td><div ${cel(c, c.escuro ? escuroHoje : '')}>${c.hoje || '<div class="vazio">não existe hoje</div>'}</div></td>`).join('')}</tr>
${OPCOES.map((o, i) => `<tr><td class="rot"><b>${o.nome}</b><span>${o.ideia}</span></td>${colunas.map((c, j) => `<td><div ${cel(c)} data-op="${i}" data-col="${j}"></div></td>`).join('')}</tr>`).join('')}
<tr><td class="rot"><b>Complemento · Mapa de músculos</b><span>Vale para qualquer opção: o corpo parado, de frente e de costas, com o músculo pintado, ao lado da figura que se mexe.</span></td><td><div class="cel" data-mapa="frontal"></div></td><td><div class="cel" data-mapa="posterior"></div></td><td colspan="6" style="font-size:13px;color:#4e5a64;max-width:520px">Com o mapa ao lado, o boneco que se mexe pode ser bem simples (opções 1 a 3) sem deixar de mostrar o músculo exato. Nas opções 5 a 8, o músculo já aparece no próprio corpo, e o mapa vira reforço.</td></tr>
</table><script>${js}</script><script>
const m = MOTOR, corpo = m.CORPOS.homem, COL = ${JSON.stringify(colunas.map(({ pose, vista, mus, escuro, mini }) => ({ pose, vista, mus, escuro, mini })))}, OP = ${JSON.stringify(OPCOES.map((o) => o.id))};
const hex = (h) => [1,3,5].map(i => parseInt(h.slice(i,i+2),16)/255);
const OBJ = [{ obj: '#dfe5e9', esc: '#6f7f8b', ferro: '#27343f', aco: '#8a98a3', estofado: '#d5dde2', tapete: '#b4c0c8', chao: '#e9edf0', cabo: '#4e5a64', musculoP: '#d62e26', musculoS: '#ec961c', musculoA: '#f3c98a' },
             { obj: '#2c3740', esc: '#7d8c97', ferro: '#cfd8de', aco: '#8a98a3', estofado: '#3a4751', tapete: '#2c3740', chao: '#172026', cabo: '#a3b3bf', musculoP: '#f45248', musculoS: '#f5aa3c', musculoA: '#f3c98a' }];
const FUNDO = ['#f7f9fa', '#10171b'], TINTA = ['#1a2833', '#e7eef2'];
// cores do corpo por opção: [claro, escuro]; contorno 'fundo' = recorte na cor do fundo
const CORES = {
  pictograma: [{ pele: '#33424e', peleLonge: '#96a3ad', contorno: 'fundo' }, { pele: '#cdd6dc', peleLonge: '#5d6c77', contorno: 'fundo' }],
  capsulas: [{ pele: '#c6d0d7', peleLonge: '#e3e8ec', contorno: 'tinta' }, { pele: '#62727d', peleLonge: '#2f3b44', contorno: 'tinta' }],
  manequim: [{ pele: '#d2dae0', peleLonge: '#e6ebee', junta: '#8fa0ab', contorno: 'tinta' }, { pele: '#6b7b86', peleLonge: '#33404a', junta: '#3d4b55', contorno: 'tinta' }],
  massinha: [{ pele: '#ccd5db', peleLonge: '#e2e7eb', roupa: '#6f7f8b', cabelo: '#4e5a64', calcado: '#4e5a64', contorno: 'tinta' }, { pele: '#7a8a95', peleLonge: '#3d4b55', roupa: '#33414b', cabelo: '#232d34', calcado: '#cfd8de', contorno: 'tinta' }],
  traco: [{ pele: '#ffffff', peleLonge: '#eef1f3', roupa: '#dfe5e9', cabelo: '#9aa8b3', calcado: '#dfe5e9', contorno: 'tinta' }, { pele: '#1b252c', peleLonge: '#141c21', roupa: '#33414b', cabelo: '#56656f', calcado: '#33414b', contorno: 'tinta' }],
  silhueta: [{ pele: '#3b4a56', peleLonge: '#8c9aa5', contorno: 'fundo' }, { pele: '#c3ced6', peleLonge: '#5d6c77', contorno: 'fundo' }],
  atleta: [{ pele: '#d3dbe0', peleLonge: '#e6ebee', roupa: '#5b6b77', cabelo: '#2b3843', calcado: '#2b3843', contorno: 'tinta' }, { pele: '#75858f', peleLonge: '#3a4852', roupa: '#33414b', cabelo: '#1f292f', calcado: '#cfd8de', contorno: 'tinta' }],
  vidro: [{ pele: '#e6ebef', peleLonge: '#eef2f4', roupa: '#e6ebef', cabelo: '#27343f', calcado: '#e6ebef', junta: '#6f7f8b', contorno: '#9aa8b3' }, { pele: '#25313a', peleLonge: '#1b252c', roupa: '#25313a', cabelo: '#e7eef2', calcado: '#25313a', junta: '#93a2ad', contorno: '#56656f' }],
};
function paleta(id, t) {
  const c = CORES[id][t], o = OBJ[t];
  const cont = c.contorno === 'fundo' ? FUNDO[t] : c.contorno === 'tinta' || c.contorno === 'nenhum' ? TINTA[t] : c.contorno;
  const cores = {};
  for (const k of m.MATERIAIS) cores[k] = hex(o[k] ?? c[k] ?? (k === 'juntaLonge' ? c.peleLonge : c.pele));
  return { contorno: hex(cont), sombra: hex(t ? '#05080a' : '#1a2833'), fundo: hex(FUNDO[t]), cores };
}
const poses = { empe: { esq: m.resolver(corpo, m.poseEmPe(corpo)), prims: [] }, fundo: m.goblet.quadro(corpo, 1), flexao: m.flexao.quadro(corpo, 1), supino: m.supinoReto.quadro(corpo, 1) };

const mx = (a, b) => a.map((v, i) => Math.max(v, b[i]));
const MUS = { fundo: [m.mascaraDoMusculo(corpo, 'quadriceps'), mx(m.mascaraDoMusculo(corpo, 'gluteos'), m.mascaraDoMusculo(corpo, 'adutores'))], flexao: [m.mascaraDoMusculo(corpo, 'peitoral'), mx(m.mascaraDoMusculo(corpo, 'triceps'), m.mascaraDoMusculo(corpo, 'deltoideAnterior'))] };
const REALCE = { fundo: { coxa: 'musculoP', pelve: 'musculoS' }, flexao: { torax: 'musculoP', tronco: 'musculoP', braco: 'musculoS' } };
const tela = document.createElement('canvas'); const pintor = m.criarPintor(tela);
for (const cel of document.querySelectorAll('[data-op]')) {
  const id = OP[+cel.dataset.op], l = COL[+cel.dataset.col], q = poses[l.pose], cam = m.VISTAS[l.vista], t = l.escuro ? 1 : 0;
  const longe = m.ladoDeLonge(q.esq, cam.para), mu = (l.mus && MUS[l.pose]) || [], rl = (l.mus && REALCE[l.pose]) || {};
  const ref = m.pele(q.esq);
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  for (let i = 0; i < ref.length; i += 3) { const x = ref[i]*cam.dir[0]+ref[i+1]*cam.dir[1]+ref[i+2]*cam.dir[2], y = ref[i]*cam.cima[0]+ref[i+1]*cam.cima[1]+ref[i+2]*cam.cima[2]; x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y); }
  const lado = Math.max(x1 - x0, y1 - y0) * 1.17, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, caixa = [cx - lado / 2, cy - lado / 2, lado, lado];
  const px = l.mini ? 88 : 158, k = (l.mini ? 1.5 : 1) * (lado / 180);
  tela.width = px * 2; tela.height = px * 2;
  const objetos = m.geoDosPrims(q.prims.filter((p) => p.t !== 'chao'));
  const pal = paleta(id, t);
  const malhaGeo = (variante, roupa) => m.geoDaMalha(q.esq, { variante, roupa, longe, mp: mu[0], ms: mu[1] });
  if (id === 'pictograma') pintor.pintar([objetos, m.geoDosPrims(m.pictograma(q.esq, longe, rl))], cam, caixa, 0, pal, 0.62 * k);
  else if (id === 'capsulas') pintor.pintar([objetos, m.geoDosPrims(m.capsulas(q.esq, longe, rl))], cam, caixa, 0, pal, 0.46 * k);
  else if (id === 'manequim') pintor.pintar([objetos, m.geoDosPrims(m.manequim(q.esq, rl))], cam, caixa, 1, pal, 0.42 * k);
  else if (id === 'massinha') pintor.pintar([objetos, malhaGeo('lisa', true)], cam, caixa, 2, pal, 0);
  else if (id === 'traco') pintor.pintar([objetos, malhaGeo('lisa', true)], cam, caixa, 0, pal, 0.4 * k);
  else if (id === 'silhueta') pintor.pintar([objetos, malhaGeo('natural', false)], cam, caixa, 0, pal, 0.55 * k);
  else if (id === 'atleta') pintor.pintar([objetos, malhaGeo('lisa', true)], cam, caixa, 1, pal, 0.42 * k);
  else if (id === 'vidro') {
    pintor.pintar([objetos, malhaGeo('lisa', false)], cam, caixa, 0, pal, 0.36 * k);
    pintor.pintar([m.geoDosPrims(m.ossos(q.esq))], cam, caixa, 0, pal, 0, { limpar: false, profundidade: false });
  }
  const c = document.createElement('canvas'); c.width = px * 2; c.height = px * 2; c.style.width = px + 'px'; c.style.height = px + 'px'; cel.appendChild(c);
  c.getContext('2d').drawImage(tela, 0, 0);
}
for (const cel of document.querySelectorAll('[data-mapa]')) {
  const q = poses.empe, cam = m.VISTAS[cel.dataset.mapa], pal = paleta('silhueta', 0);
  pal.cores.pele = hex('#c9d2d8'); pal.cores.peleLonge = hex('#c9d2d8');
  const lado = 205, px = 158; tela.width = px * 2; tela.height = px * 2;
  pintor.pintar([m.geoDaMalha(q.esq, { variante: 'lisa', mp: MUS.fundo[0], ms: MUS.fundo[1] })], cam, [-lado / 2, -12, lado, lado], 0, pal, 0.45);
  const c = document.createElement('canvas'); c.width = px * 2; c.height = px * 2; c.style.width = px + 'px'; c.style.height = px + 'px'; cel.appendChild(c);
  c.getContext('2d').drawImage(tela, 0, 0);
}
document.title = 'pronto';
</script>`;
mkdirSync('test-results', { recursive: true });
mkdirSync('docs/revisoes/animacao-nova/prototipos', { recursive: true });
writeFileSync('test-results/opcoes-de-boneco.html', html);
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1540, height: 900 }, deviceScaleFactor: 2 });
p.on('pageerror', (e) => console.log('erro na página:', String(e).slice(0, 400)));
p.on('console', (e) => e.type() === 'error' && console.log('console:', e.text().slice(0, 300)));
await p.goto('file://' + process.cwd() + '/test-results/opcoes-de-boneco.html');
await p.waitForFunction(() => document.title === 'pronto', null, { timeout: 120000 });
await p.screenshot({ path: 'docs/revisoes/animacao-nova/prototipos/opcoes-de-boneco.png', fullPage: true });
await b.close();
console.log('quadro: docs/revisoes/animacao-nova/prototipos/opcoes-de-boneco.png');

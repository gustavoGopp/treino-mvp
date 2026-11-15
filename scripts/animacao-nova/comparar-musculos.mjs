// Lado a lado: as formas dos músculos como foram aprovadas e com as correções anatômicas (musculos-corrigidos.mjs).
// Uso: node scripts/animacao-nova/comparar-musculos.mjs  → docs/revisoes/animacao-nova/parada-do-corpo/6-musculos-antes-e-depois.png
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovo } from './empacotar.mjs';

const ENTRADA = `export * from './src/engine/novo/index.ts'; export { EXERCICIOS } from './src/engine/novo/app.ts';`;
const antes = (await motorNovo(ENTRADA, { aprovado: true })).modulo;
const depois = (await motorNovo(ENTRADA)).modulo;
const css = readFileSync('src/engine/novo/estilo.css', 'utf8') + depois.cssDoBoneco();
const f1 = (n) => (Math.round(n * 10) / 10).toString();
/** A figura em pé, numa vista, com os músculos pedidos realçados. */
function emPe(m, vista, papeis, estilo = 'cinza') {
  const corpo = m.CORPOS.homem;
  const esq = m.resolver(corpo, m.poseEmPe(corpo, 6));
  const itens = m.desenharBoneco(esq, m.VISTAS[vista], { estilo, papeis });
  return `<svg class="novo boneco ${estilo}" viewBox="-45 -186 90 190">${m.DEFS_DO_BONECO}${m.pintar(itens)}</svg>`;
}
/** Um quadro de uma animação, no modo Músculos. */
function cena(m, id, vista, estilo = 'cinza') {
  const corpo = m.CORPOS.homem, ex = m.EXERCICIOS[id], fases = ex.ficha.fases, i = fases.findIndex((f) => f.tipo !== 'pausa');
  const t = fases.slice(0, i).reduce((a, f) => a + f.dur, 0) + fases[i].dur * 0.999;
  const vb = m.enquadrar(ex, { corpo, vista, boneco: estilo });
  // no desenho aprovado não há porções: a animação acendia o músculo inteiro (o trapézio, dos dois lados)
  const INTEIRO = { deltAnt: 'deltoide', deltLat: 'deltoide', deltPost: 'deltoide', trapSup: 'trapezio', trapMedInf: 'trapezio' };
  const exAntes = { ...ex, papeis: Object.fromEntries(Object.entries(ex.papeis).map(([k, v]) => { const [id, lado] = k.split(':'); const velho = INTEIRO[id]; return [velho ? (velho === 'trapezio' || !lado ? velho : `${velho}:${lado}`) : k, v]; })) };
  return m.svgDaCena(m === antes ? exAntes : ex, t, { corpo, vista, boneco: estilo, modo: 'mus' }, vb, 'claro');
}
const PARES = [
  ['Trapézio e grande dorsal, de costas', (m, depois) => emPe(m, 'posterior', depois ? { trapSup: 's', trapMedInf: 's', dorsal: 'p' } : { trapezio: 's', dorsal: 'p' }), 'Antes: a ponta do trapézio parava 4,9 cm acima da 12ª vértebra torácica e o dorsal subia até a altura da espinha da escápula. Depois: o trapézio desce até T12 e vai até o ombro; o dorsal passa por baixo da escápula.'],
  ['Peitoral e abdômen, de frente', (m) => emPe(m, 'frontal', { peitoral: 'p', abdomen: 's' }), 'Antes: o peitoral terminava na altura do mamilo e o abdômen parava na cintura. Depois: o peitoral desce abaixo do mamilo e afina para a axila; o abdômen vai até o púbis.'],
  ['Peitoral e abdômen, na opção cor de pele', (m) => emPe(m, 'frontal', { peitoral: 'p', abdomen: 's' }, 'pele'), 'O abdômen continua por baixo do short: a cor é cortada na cintura da roupa.'],
  ['Puxada de um braço, de trás', (m) => cena(m, 'puxada-unilateral', 'posterior'), 'Antes: acendia o trapézio inteiro, dos dois lados, inclusive a parte de cima (a que encolhe o ombro), e o deltoide inteiro. Depois: só o trapézio do meio e de baixo e a parte de trás do deltoide, do lado que puxa.'],
  ['Supino, de cima', (m) => cena(m, 'supino-reto', 'cima'), 'Antes: o deltoide inteiro. Depois: só a parte da frente do deltoide, que é o que o conteúdo do app diz.'],
  ['Flexão, de lado', (m) => cena(m, 'flexao', 'lateral'), 'O mesmo: só a parte da frente do deltoide; o peitoral um pouco mais baixo.'],
];
let h = '';
for (const [titulo, f, nota] of PARES) {
  const alto = titulo.includes('de costas') || titulo.includes('de frente') || titulo.includes('cor de pele');
  const q = (svg, leg) => `<figure><div class="q" style="width:${alto ? 250 : 420}px;height:${alto ? 500 : 315}px">${svg}</div><figcaption>${leg}</figcaption></figure>`;
  h += `<section><h2>${titulo}</h2><div class="l">${q(f(antes, false), 'como foi aprovado')}${q(f(depois, true), 'com a correção')}</div><p>${nota}</p></section>`;
}
const html = `<!doctype html><meta charset="utf-8"><style>${css}body{margin:20px;font:14px system-ui;background:#fff;color:#1d2a36;width:1320px}h1{font-size:20px;margin:0 0 4px}h2{font-size:15px;margin:0 0 8px}section{display:inline-block;vertical-align:top;margin:14px 22px 6px 0}.l{display:flex;gap:10px}figure{margin:0}svg{width:100%;height:100%;border-radius:10px;display:block}figcaption{color:#555;margin-top:4px;font-size:12.5px}p{max-width:560px;color:#44515c;margin:8px 0 0}section p{max-width:${f1(520)}px}</style><h1>Músculos: como foi aprovado × com a correção anatômica</h1><p>Rodada de correção de 15/11/2026. As linhas do corpo (o contorno de cada músculo) mudam em quatro formas; as porções do deltoide e do trapézio só mudam a área colorida.</p>${h}`;
const caminho = '/opt/pw-browsers/chromium';
const b = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pg = await b.newPage({ viewport: { width: 1360, height: 800 }, deviceScaleFactor: 1.5 });
await pg.setContent(html);
await pg.screenshot({ path: 'docs/revisoes/animacao-nova/parada-do-corpo/6-musculos-antes-e-depois.png', fullPage: true });
await b.close();
console.log('6-musculos-antes-e-depois.png');

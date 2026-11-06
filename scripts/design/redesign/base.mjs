// Redesign (06/11/2026): medidas de base do app de hoje que não dependem de tela: tamanho do bundle de produção,
// pedidos externos por visita (a letra do Google Fonts) e Lighthouse (celular, rede lenta simulada) por rota.
// O Lighthouse roda via npx (ferramenta, não dependência do app), com o Chromium do Playwright e um perfil em que o
// estado da persona Ana foi gravado antes (assim /programa, /semana e /dados abrem com dados).
// Precisa do app servido em 4173 e de reports/design/redesign/estados/ (estados.mjs).
// Uso: node scripts/design/redesign/base.mjs   → docs/revisoes/redesign/antes/base.json
import { execFileSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const saida = { medidoEm: new Date().toISOString(), bundle: [], letra: {}, lighthouse: [] };

// 1. bundle
for (const f of readdirSync('dist/assets')) {
  const b = readFileSync(`dist/assets/${f}`);
  saida.bundle.push({ arquivo: f, kB: +(b.length / 1024).toFixed(1), gzipKB: +(gzipSync(b).length / 1024).toFixed(1) });
}
for (const f of ['index.html', 'sw.js', 'manifest.webmanifest']) saida.bundle.push({ arquivo: f, kB: +(statSync(`dist/${f}`).size / 1024).toFixed(1) });

// 2. a letra: o que o Google Fonts serve a um Chrome no Android (CSS + arquivos woff2)
const UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36';
const cssUrl = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;600;700;800&display=swap';
try {
  const css = await (await fetch(cssUrl, { headers: { 'user-agent': UA } })).text();
  const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
  const arquivos = [];
  for (const u of urls) {
    const r = await fetch(u, { headers: { 'user-agent': UA } });
    const b = Buffer.from(await r.arrayBuffer());
    arquivos.push({ url: u.replace('https://fonts.gstatic.com/s/atkinsonhyperlegiblenext/', '…/'), kB: +(b.length / 1024).toFixed(1) });
  }
  saida.letra = { cssKB: +(css.length / 1024).toFixed(1), pedidosExternos: 1 + urls.length, arquivos, totalKB: +arquivos.reduce((s, a) => s + a.kB, 0).toFixed(1), nota: 'variável (um arquivo cobre os 4 pesos); a 2ª URL costuma ser o subconjunto latin-ext' };
} catch (e) {
  saida.letra = { erro: String(e) };
}

// 3. Lighthouse por rota. O estado da Ana é gravado num perfil de navegador em disco (Playwright, mesmo Chromium);
// o Lighthouse abre o próprio Chromium com esse perfil e sem limpar o armazenamento.
const CHROME = '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const PERFIL = 'reports/design/redesign/lighthouse/perfil-ana';
rmSync(PERFIL, { recursive: true, force: true });
mkdirSync(PERFIL, { recursive: true });
const estado = JSON.parse(readFileSync('reports/design/redesign/estados/ana.json', 'utf8'));
const ctx = await chromium.launchPersistentContext(PERFIL, { executablePath: CHROME, viewport: { width: 412, height: 915 } });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/');
await page.getByRole('button', { name: 'Entendi, vamos começar' }).waitFor();
await page.evaluate(async (e) => {
  const db = await new Promise((ok, erro) => {
    const r = indexedDB.open('keyval-store');
    r.onupgradeneeded = () => r.result.createObjectStore('keyval');
    r.onsuccess = () => ok(r.result);
    r.onerror = () => erro(r.error);
  });
  await new Promise((ok, erro) => {
    const r = db.transaction('keyval', 'readwrite').objectStore('keyval').put(e, 'estado');
    r.onsuccess = () => ok();
    r.onerror = () => erro(r.error);
  });
}, estado);
await ctx.close();
const rotas = ['/', '/comecar/triagem', '/programa', '/guia/bulgaro', '/semana', '/dados'];
for (const rota of rotas) {
  const nome = rota === '/' ? 'inicio' : rota.slice(1).replace(/\//g, '-');
  const arq = `reports/design/redesign/lighthouse/${nome}.json`;
  try {
    execFileSync('npx', ['lighthouse', `http://localhost:4173${rota}`, '--disable-storage-reset', '--form-factor=mobile', '--throttling-method=simulate', '--only-categories=performance,accessibility,best-practices', '--output=json', `--output-path=${arq}`, '--quiet', `--chrome-flags=--headless=new --no-sandbox --user-data-dir=${PERFIL}`], { stdio: 'inherit', timeout: 240_000, env: { ...process.env, CHROME_PATH: CHROME } });
    const r = JSON.parse(readFileSync(arq, 'utf8'));
    const a = r.audits;
    saida.lighthouse.push({
      rota,
      url: r.finalDisplayedUrl,
      desempenho: Math.round(r.categories.performance.score * 100),
      acessibilidade: Math.round(r.categories.accessibility.score * 100),
      boasPraticas: Math.round(r.categories['best-practices'].score * 100),
      fcpMs: Math.round(a['first-contentful-paint'].numericValue),
      lcpMs: Math.round(a['largest-contentful-paint'].numericValue),
      tbtMs: Math.round(a['total-blocking-time'].numericValue),
      cls: +a['cumulative-layout-shift'].numericValue.toFixed(3),
      speedIndexMs: Math.round(a['speed-index'].numericValue),
      pedidos: a['network-requests']?.details?.items?.length,
      transferidoKB: +((a['total-byte-weight']?.numericValue ?? 0) / 1024).toFixed(0),
      falhasAcessibilidade: r.categories.accessibility.auditRefs.filter((ref) => a[ref.id]?.score === 0).map((ref) => ref.id),
    });
  } catch (e) {
    saida.lighthouse.push({ rota, erro: String(e).slice(0, 300) });
  }
}
mkdirSync('docs/revisoes/redesign/antes', { recursive: true });
writeFileSync('docs/revisoes/redesign/antes/base.json', JSON.stringify(saida, null, 1) + '\n');
console.log(JSON.stringify({ bundle: saida.bundle, letra: saida.letra, lighthouse: saida.lighthouse.map((l) => ({ rota: l.rota, desempenho: l.desempenho, acessibilidade: l.acessibilidade, lcpMs: l.lcpMs, tbtMs: l.tbtMs, erro: l.erro })) }, null, 1));

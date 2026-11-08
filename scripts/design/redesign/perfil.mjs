// Redesign (06/11/2026), lote técnico: perfil do processador ao abrir uma rota com o estado da Ana, com o celular
// simulado 4× mais lento (Chrome DevTools Protocol). Mostra as funções que mais gastam tempo. Precisa do app servido em
// 4173 e de reports/design/redesign/estados/ana.json (estados.mjs).
// Uso: node scripts/design/redesign/perfil.mjs /programa,/semana
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
const estado = JSON.parse(readFileSync('reports/design/redesign/estados/ana.json', 'utf8'));
const nav = await chromium.launch();
const ctx = await nav.newContext({ viewport: { width: 412, height: 839 } });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/');
await page.evaluate(async (e) => { const db = await new Promise((ok) => { const r = indexedDB.open('keyval-store'); r.onupgradeneeded = () => r.result.createObjectStore('keyval'); r.onsuccess = () => ok(r.result); }); await new Promise((ok) => { const r = db.transaction('keyval', 'readwrite').objectStore('keyval').put(e, 'estado'); r.onsuccess = ok; }); }, estado);
await page.waitForTimeout(1500);
for (const rota of (process.argv[2] || '/programa').split(',')) {
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 200 });
  await cdp.send('Profiler.start');
  await page.goto('http://localhost:4173' + rota); await page.waitForTimeout(6000);
  const { profile } = await cdp.send('Profiler.stop');
  const dt = {}; const por = {};
  for (let i = 0; i < profile.samples.length; i++) dt[profile.samples[i]] = (dt[profile.samples[i]] || 0) + (profile.timeDeltas[i] || 0);
  const nos = Object.fromEntries(profile.nodes.map((n) => [n.id, n]));
  for (const [id, us] of Object.entries(dt)) { const cf = nos[id].callFrame; const k = (cf.functionName || '(anônima)') + ' @ ' + (cf.url.split('/').pop() || cf.url || '-') + ':' + cf.lineNumber; por[k] = (por[k] || 0) + us; }
  const tot = Object.values(por).reduce((a, b) => a + b, 0);
  console.log('==', rota, 'total amostrado', Math.round(tot / 1000), 'ms (CPU 4x)');
  for (const [k, us] of Object.entries(por).filter(([k]) => !k.startsWith('(idle)')).sort((a, b) => b[1] - a[1]).slice(0, 14)) console.log(String(Math.round(us / 1000)).padStart(6), 'ms', k.slice(0, 110));
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
}
await nav.close();

import { readFileSync, writeFileSync } from 'node:fs';
import { test } from '@playwright/test';

// Detalhe do teste 5 (critica.spec.ts): no zoom e a 320 px, o que fica para fora pelos lados e onde ficam o
// "Senti algo", o "Série feita", o "+" das repetições e o relógio. Saída: reports/design/redesign/agente-6/zoom-detalhe.json
const DIR = 'docs/revisoes/redesign/prototipo';
test('zoom: retângulos das peças do treino', async ({ page }) => {
  await page.route(/^http:\/\/prototipo\.local\//, (r) => {
    const c = new URL(r.request().url()).pathname.replace(/^\//, '') || 'index.html';
    const corpo = readFileSync(`${DIR}/${c}`, 'utf8');
    const tipo = c.endsWith('.css') ? 'text/css' : c.endsWith('.js') ? 'text/javascript' : 'text/html';
    const html = c === 'index.html' ? `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{margin:0}[hidden]{display:none!important}</style></head><body>${corpo}</body></html>` : corpo;
    return r.fulfill({ status: 200, contentType: `${tipo}; charset=utf-8`, body: html });
  });
  await page.addInitScript(() => ((window as unknown as { CAPTURA: boolean }).CAPTURA = true));
  const out: Record<string, unknown>[] = [];
  for (const [w, h] of [[360, 740], [320, 640], [206, 420]]) {
    await page.setViewportSize({ width: w, height: h });
    for (const id of ['treino', 'treino-descanso', 'treino-texto']) {
      await page.goto('http://prototipo.local/#' + id);
      await page.waitForTimeout(300);
      out.push({ w, h, id, ...(await page.evaluate(() => {
        const ret = (s: string) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.left), dir: Math.round(r.right), topo: Math.round(r.top), baixo: Math.round(r.bottom), inteiro: r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1 }; };
        const largos = Array.from(document.querySelectorAll<HTMLElement>('#app *')).filter((e) => e.getBoundingClientRect().right > innerWidth + 1).map((e) => e.className || e.tagName).slice(0, 8);
        return { senti: ret('.senti'), feita: ret('#feita'), maisReps: ret('[data-passo="reps:1"]'), relogio: ret('#relogio'), montagem: ret('.montagem'), registro: ret('.registro'), largos };
      })) });
    }
  }
  writeFileSync('reports/design/redesign/agente-6/zoom-detalhe.json', JSON.stringify(out, null, 1));
  // capturas: o foco do teclado em "Terminar o treino agora" (atrás do registro) e a triagem a 320 px
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('http://prototipo.local/#treino');
  await page.waitForTimeout(300);
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    if ((await page.evaluate(() => (document.activeElement as HTMLElement).innerText)) === 'Terminar o treino agora') break;
  }
  await page.screenshot({ path: 'reports/design/redesign/agente-6/foco-terminar-coberto.png' });
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('http://prototipo.local/#triagem');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'reports/design/redesign/agente-6/triagem-320.png' });
});

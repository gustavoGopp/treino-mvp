import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { medir, type Medida } from '../../medir';

// Redesign (06/11/2026): cada tela do protótipo, como o celular a vê (o que aparece sem rolar e a página inteira), com
// as medidas de toque e contraste do app (scripts/design/medir.ts). O protótipo é servido como no Artifact: o arquivo
// ganha o esqueleto <!doctype html> na hora. Saída: imagens em reports/design/redesign/depois/<projeto>/ (fora do git)
// e os números em docs/revisoes/redesign/depois/medidas-<projeto>.json.

const DIR = 'docs/revisoes/redesign/prototipo';
const BASE = 'http://prototipo.local/';
const SAIDA = 'docs/revisoes/redesign/depois';

async function servir(page: Page) {
  await page.route(/^http:\/\/prototipo\.local\//, (r) => {
    const caminho = new URL(r.request().url()).pathname.replace(/^\//, '') || 'index.html';
    const corpo = readFileSync(`${DIR}/${caminho}`, 'utf8');
    const tipo = caminho.endsWith('.css') ? 'text/css' : caminho.endsWith('.js') ? 'text/javascript' : 'text/html';
    const html = caminho === 'index.html' ? `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${corpo}</body></html>` : corpo;
    return r.fulfill({ status: 200, contentType: `${tipo}; charset=utf-8`, body: html });
  });
  await page.addInitScript(() => ((window as unknown as { CAPTURA: boolean }).CAPTURA = true));
}

test('todas as telas do protótipo', async ({ page }, info) => {
  const erros: string[] = [];
  page.on('pageerror', (e) => erros.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  await servir(page);
  await page.goto(BASE + '#indice');
  await page.evaluate(() => document.fonts.ready);
  const telas = await page.evaluate(() => (window as unknown as { __TELAS: { id: string; nome: string }[] }).__TELAS);
  const dir = `reports/design/redesign/depois/${info.project.name}`;
  mkdirSync(dir, { recursive: true });
  const medidas: Medida[] = [];
  for (const t of telas) {
    await page.goto(BASE + '#' + t.id);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(t.id === 'guia' ? 600 : 250);
    await page.screenshot({ path: `${dir}/${t.id}-relance.png`, fullPage: false, animations: 'disabled' });
    if (!(await page.locator('.veu').count())) await page.screenshot({ path: `${dir}/${t.id}.png`, fullPage: true, animations: 'disabled' });
    const m = await medir(page, `${info.project.name}/${t.id}`);
    // critérios do treino: à vista sem rolar (inteiro dentro da tela) e não coberto por outra camada
    const visivel = await page.evaluate(() => {
      const ok = (el: Element | null) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        if (r.top < 0 || r.bottom > innerHeight || r.width === 0) return false;
        const topo = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return !!topo && (el === topo || el.contains(topo));
      };
      return { sentiAlgo: ok(document.querySelector('.senti')), serieFeita: ok(document.querySelector('#feita')), rir: ok(document.querySelector('.rir')), relogio: ok(document.querySelector('#relogio')) };
    });
    medidas.push({ ...m, visivel } as Medida);
  }
  mkdirSync(SAIDA, { recursive: true });
  writeFileSync(`${SAIDA}/medidas-${info.project.name}.json`, JSON.stringify(medidas, null, 1) + '\n');
  expect(erros, 'erros no console').toEqual([]);
});

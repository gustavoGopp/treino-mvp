import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from '@playwright/test';

// Agente 4 (redesign): fotografa cada folha dos esboços (docs/revisoes/redesign/img/agente-4-esbocos.html) e mede, no
// app de hoje, quantos caracteres cabem numa linha de corpo (17 px) em 360, 412 e 560 px de largura (o máximo do .wrap).
// As imagens brutas vão para reports/design/redesign/agente-4/esbocos/ e as 8 do relatório para docs/revisoes/redesign/img/.
// Uso: npx playwright test -c scripts/design/redesign/agente-4/playwright.config.ts esbocos --project=pixel7

const RAIZ = process.cwd(); // rode a partir da raiz do repositório
const FOLHAS = ['sistema', 'cadastro-1', 'cadastro-2', 'equipamento', 'programa', 'treino', 'guia-fim', 'semana-dados'];

test('folhas dos esboços', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('file://' + resolve(RAIZ, 'docs/revisoes/redesign/img/agente-4-esbocos.html'));
  await page.evaluate(() => document.fonts.ready);
  const bruto = resolve(RAIZ, 'reports/design/redesign/agente-4/esbocos');
  mkdirSync(bruto, { recursive: true });
  const tamanhos: Record<string, number> = {};
  for (const f of FOLHAS) {
    // Recorte pela posição na página inteira (o screenshot do elemento deslocava as folhas altas).
    await page.evaluate(() => window.scrollTo(0, 0));
    const box = await page.locator(`#f-${f}`).evaluate((e) => {
      const r = e.getBoundingClientRect();
      return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
    });
    const caminho = `${bruto}/agente-4-${f}.png`;
    await page.screenshot({ path: caminho, fullPage: true, clip: box, animations: 'disabled' });
    const kb = Math.round(statSync(caminho).size / 1024);
    tamanhos[f] = kb;
    copyFileSync(caminho, resolve(RAIZ, `docs/revisoes/redesign/img/agente-4-${f}.png`));
  }
  console.log('tamanhos (kB):', JSON.stringify(tamanhos));
  // Depois rode reduzir-png.py (paleta de 64 tons) para que cada imagem fique abaixo de 300 kB.
  await ctx.close();
});

test('caracteres por linha no app de hoje', async ({ browser }) => {
  const saida: Record<string, number> = {};
  for (const largura of [360, 412, 560, 640]) {
    const ctx = await browser.newContext({ viewport: { width: largura, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    // Mede com a letra do app carregada: largura média do caractere no .lede (17 px) e a largura útil da coluna.
    saida[largura] = await page.evaluate(() => {
      const p = document.querySelector('.lede') as HTMLElement;
      const span = document.createElement('span');
      span.style.font = getComputedStyle(p).font;
      span.style.whiteSpace = 'nowrap';
      span.textContent = 'Montamos um programa de hipertrofia baseado em evidência, só com o seu equipamento, e mostramos o porquê';
      document.body.appendChild(span);
      const porChar = span.getBoundingClientRect().width / span.textContent!.length;
      span.remove();
      return Math.round(p.getBoundingClientRect().width / porChar);
    });
    await ctx.close();
  }
  console.log('caracteres por linha (corpo 17 px, por largura de tela):', JSON.stringify(saida));
});

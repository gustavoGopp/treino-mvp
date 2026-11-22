// Mede a tela do treino (estudo de proporção de 22/11/2026, a pedido do Gustavo; serve ao lote M2 da análise crítica):
// em cada tamanho de celular, quanto da tela vai para o cabeçalho, o palco do Boneco, as abas e a legenda do guia e o
// registro da série; a altura do Boneco desenhado (não a do palco); e se o rótulo da fase cobre o desenho.
// Caminho: cadastro com o atalho "Casa" e o 1º exercício do treino A (agachamento goblet, com animação).
// Uso (com o app servido em http://localhost:4173): node scripts/design/medir-treino.mjs <pasta-das-fotos> [toque]
//   toque = "ampliar" para medir também o Boneco ampliado (toca no palco antes de medir)
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const pasta = process.argv[2] ?? '.verificacao/treino';
const ampliar = process.argv[3] === 'ampliar';
mkdirSync(pasta, { recursive: true });
const TAMANHOS = [[320, 568], [360, 640], [375, 667], [390, 664], [360, 740], [390, 780], [412, 839]];
const b = await chromium.launch();
console.log('tela | cabeçalho | palco | Boneco (alt.) | abas+legenda | registro | Boneco/tela | rótulo cobre o desenho');
for (const [w, h] of TAMANHOS) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, baseURL: 'http://localhost:4173', serviceWorkers: 'block' });
  const page = await ctx.newPage();
  const g = (n) => page.getByRole('group', { name: n });
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await page.getByRole('button', { name: 'Não, nenhuma' }).click();
  await g(/sem parar/).getByLabel('Nunca treinei').check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await g(/Quantos dias/).getByLabel('3 dias').check();
  await g(/Quantos minutos/).getByLabel('45 min', { exact: true }).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Casa com halteres e elásticos' }).click();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await page.getByRole('heading', { name: 'Seu treino', exact: true }).waitFor();
  await page.getByRole('button', { name: /^Começar/ }).click();
  await page.locator('.palco-treino svg > *').first().waitFor({ timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const medir = () => page.evaluate(() => {
    const alt = (s) => { const e = document.querySelector(s); if (!e) return 0; const r = e.getBoundingClientRect(); return r.height > 0 && r.bottom > 0 && r.top < innerHeight ? Math.round(r.height) : 0; };
    const svg = document.querySelector('.palco-ampliado svg') ?? [...document.querySelectorAll('.palco-treino svg')].find((e) => e.getBoundingClientRect().height > 0);
    // o Boneco desenhado: tudo o que não é chão, legenda nem trajetória
    let topo = Infinity, base = -Infinity;
    for (const e of svg?.querySelectorAll('path,circle,ellipse,rect') ?? []) {
      if (e.closest('defs') || /n-rot|n-chao|n-traj/.test(e.getAttribute('class') ?? '')) continue;
      const r = e.getBoundingClientRect();
      if (!r.height) continue;
      topo = Math.min(topo, r.top); base = Math.max(base, r.bottom);
    }
    const rot = document.querySelector('.fase-do-movimento')?.getBoundingClientRect();
    const rotDoSvg = svg?.closest('.palco-btn')?.querySelector('.fase-do-movimento')?.getBoundingClientRect();
    const cobre = (rotDoSvg ?? rot) && rot && rot.height > 0 && [...(svg?.querySelectorAll('path') ?? [])].some((e) => { if (/n-rot|n-chao|n-traj/.test(e.getAttribute('class') ?? '')) return false; const r = e.getBoundingClientRect(); return r.height && r.left < (rotDoSvg ?? rot).right && r.right > (rotDoSvg ?? rot).left && r.top < (rotDoSvg ?? rot).bottom && r.bottom > (rotDoSvg ?? rot).top; });
    return { cab: alt('.cab-treino') + alt('.prog-treino'), palco: alt('.palco-btn'), boneco: Number.isFinite(topo) ? Math.round(base - topo) : 0, guia: alt('.modos-treino') + alt('.legenda-do-modo'), registro: alt('.registro-bloco'), cobre: !!cobre, ampliado: alt('.palco-ampliado .palco-grande') };
  });
  const m = await medir();
  await page.screenshot({ path: `${pasta}/treino-${w}x${h}.png` });
  console.log(`${w}×${h} | ${m.cab} | ${m.palco} | ${m.boneco} | ${m.guia} | ${m.registro} | ${Math.round((100 * m.boneco) / h)}% | ${m.cobre ? 'SIM' : 'não'}`);
  if (ampliar) {
    await page.locator('.palco-btn').click();
    await page.waitForTimeout(1500);
    const a = await medir();
    await page.screenshot({ path: `${pasta}/ampliado-${w}x${h}.png` });
    console.log(`   ampliado: área do desenho ${a.ampliado} px (${Math.round((100 * a.ampliado) / h)}% da tela); Boneco ${a.boneco} px (${Math.round((100 * a.boneco) / h)}%)`);
  }
  await ctx.close();
}
await b.close();

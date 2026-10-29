// QA do motor de animação do guia (Playwright).
// Uso, a partir da raiz do projeto:
//   node referencia/qa/check-motor.cjs check            -> falhas de IK por exercício e por erro (0 = ok)
//   node referencia/qa/check-motor.cjs sheet id1,id2    -> folha de contatos (todas as vistas × modos × quadros-chave) em folha-de-contatos.qa.png
// Requer: npm i -D playwright && npx playwright install chromium
const path = require('path');
const { chromium } = require('playwright');
(async () => {
  const mode = process.argv[2] || 'check';
  const html = 'file://' + path.resolve(__dirname, '../guia-execucao-fase1.html');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR ' + e.message));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.goto(html);
  await page.waitForTimeout(800);
  if (mode === 'check') {
    const res = await page.evaluate(() => window.__guia.check());
    console.log(res.join('\n'));
  } else if (mode === 'sheet') {
    await page.setViewportSize({ width: 1600, height: 1000 });
    const ids = process.argv[3] ? process.argv[3].split(',') : null;
    const n = await page.evaluate(ids => window.__guia.sheet(ids), ids);
    await page.waitForTimeout(300);
    await (await page.$('#sheet')).screenshot({ path: path.resolve('folha-de-contatos.qa.png') });
    console.log('células:', n);
  }
  console.log('erros de página:', errors.join('\n') || 'nenhum');
  await browser.close();
})();

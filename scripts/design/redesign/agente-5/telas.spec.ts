import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { ana } from '../../../../tests/e2e/jornada';

// Agente 5: a tela do programa e a do treino (série e descanso) da Ana, com cada paleta candidata aplicada por cima dos
// tokens do app (só os tokens das telas: os do palco do Boneco ficam como estão), nos temas claro e escuro, e cada uma
// vista por quem tem protanopia, deuteranopia ou tritanopia (Machado 2009, severidade 1.0, filtro SVG em RGB linear,
// como em scripts/design/boneco.mjs). Lê os tokens gerados por cor.mjs. Saída: reports/design/redesign/agente-5/telas/.
// Uso: node scripts/design/redesign/agente-5/cor.mjs --sem-imagens && npx playwright test -c scripts/design/redesign/agente-5/playwright.config.ts telas
const DIR = 'reports/design/redesign/agente-5/telas';
const DIRECOES = ['atual', 'giz', 'petroleo', 'ameixa'];
const CVD: Record<string, string> = {
  protanopia: '0.152286 1.052583 -0.204868 0 0  0.114503 0.786281 0.099216 0 0  -0.003882 -0.048116 1.051998 0 0  0 0 0 1 0',
  deuteranopia: '0.367322 0.860646 -0.227968 0 0  0.280085 0.672501 0.047413 0 0  -0.011820 0.042940 0.968881 0 0  0 0 0 1 0',
  tritanopia: '1.255528 -0.076749 -0.178779 0 0  -0.078411 0.930809 0.147602 0 0  0.004733 0.691367 0.303900 0 0  0 0 0 1 0',
};

test.use({ deviceScaleFactor: 2 });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-05T15:00:00.000Z'));
});

async function aplicar(page: Page, direcao: string, tema: string) {
  const arq = `reports/design/redesign/agente-5/tokens-${direcao}-${tema}.css`;
  if (!existsSync(arq)) throw new Error(`rode cor.mjs antes: falta ${arq}`);
  const tokens = direcao === 'atual' ? '' : readFileSync(arq, 'utf8').trim();
  await page.evaluate(
    ({ tokens, CVD }) => {
      let s = document.getElementById('agente5') as HTMLStyleElement | null;
      if (!s) {
        s = document.createElement('style');
        s.id = 'agente5';
        document.head.appendChild(s);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');
        svg.style.position = 'absolute';
        svg.innerHTML = Object.entries(CVD)
          .map(([k, v]) => `<filter id="cvd-${k}"><feColorMatrix type="matrix" values="${v}"/></filter>`)
          .join('');
        document.body.appendChild(svg);
      }
      // (0,2,0) de especificidade e por último: vence o :root do tema claro e empata-e-vence o do escuro
      s.textContent = tokens ? `:root:not([data-theme="light"]){${tokens}}` : '';
    },
    { tokens, CVD },
  );
}
// SO=senti-algo (por exemplo) tira só as fotos daquele estado; o caminho até ele é o mesmo
const SO = process.env.SO;
async function fotos(page: Page, nome: string, direcao: string) {
  if (SO && SO !== nome) return;
  const proj = test.info().project.name;
  const dir = `${DIR}/${proj}`;
  mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${dir}/${nome}-${direcao}-normal.png`, animations: 'disabled' });
  for (const k of Object.keys(CVD)) {
    await page.evaluate((k) => (document.documentElement.style.filter = `url(#cvd-${k})`), k);
    await page.screenshot({ path: `${dir}/${nome}-${direcao}-${k}.png`, animations: 'disabled' });
  }
  await page.evaluate(() => (document.documentElement.style.filter = ''));
}

test('programa e treino com cada paleta', async ({ page }) => {
  const tema = test.info().project.name;
  await ana(page);
  for (const d of DIRECOES) {
    await aplicar(page, d, tema);
    await fotos(page, 'programa', d);
  }
  await page.getByRole('button', { name: /^Começar o treino/ }).first().click();
  await expect(page).toHaveURL(/\/treino$/);
  // a série pronta para salvar (carga e RIR escolhidos), como a pessoa vê antes de tocar em "Série feita"
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT'))) await carga.selectOption({ index: 6 });
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('region', { name: /^Série \d/ }).getByRole('radio', { name: '2', exact: true }).check();
  for (const d of DIRECOES) {
    await aplicar(page, d, tema);
    await fotos(page, 'treino', d);
  }
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await expect(page.getByRole('timer')).toBeVisible();
  for (const d of DIRECOES) {
    await aplicar(page, d, tema);
    await fotos(page, 'descanso', d);
  }
  // o descanso que acabou (a faixa de atenção): o relógio fixo em 0 avançando 2 minutos
  await page.clock.fastForward('02:00');
  await page.waitForTimeout(300);
  for (const d of DIRECOES) {
    await aplicar(page, d, tema);
    await fotos(page, 'descanso-acabou', d);
  }
  // o aviso de fim do descanso pode ter um "Ok"; se não tiver, segue
  const ok = page.getByRole('button', { name: 'Ok' });
  if (await ok.count()) await ok.first().click();
  await page.getByRole('button', { name: 'Senti algo' }).first().click();
  for (const d of DIRECOES) {
    await aplicar(page, d, tema);
    await fotos(page, 'senti-algo', d);
  }
});

import { expect, test, type Page } from '@playwright/test';
import { semToquePequeno } from './toque';
import { semContrasteBaixo } from './contraste';
import { ana } from './jornada';

// Reformulação visual (design v2): em todas as telas do uso, nos dois temas, toda área de toque tem 44 px ou mais
// (CLAUDE.md) e todo texto tem o contraste mínimo da WCAG. Antes, o teste de toque cobria só as telas do R2 e o treino;
// o guia tinha de 24 a 31 controles menores que 44 px (docs/revisoes/design.md, achado 1).

async function conferir(page: Page) {
  await semToquePequeno(page);
  await semContrasteBaixo(page);
}

for (const tema of ['light', 'dark'] as const) {
  test(`todas as telas, tema ${tema === 'light' ? 'claro' : 'escuro'}: toque de 44 px e contraste`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ colorScheme: tema });
    await ana(page);
    await conferir(page); // Seu treino
    await page.getByRole('button', { name: /^Começar o treino/ }).click();
    await expect(page).toHaveURL(/\/treino$/);
    await conferir(page); // treino
    await page.getByRole('link', { name: 'Ver como fazer' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (const modo of ['Técnica', 'Erros', 'Músculos', 'Trajetória']) {
      await page.getByRole('button', { name: modo, exact: true }).click();
      await conferir(page); // guia, em cada modo
    }
    await page.goBack();
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await conferir(page);
    await page.goto('/semana');
    await conferir(page);
    await page.goto('/dados');
    await conferir(page);
    await page.goto('/locais');
    await conferir(page);
    await page.goto('/');
    await conferir(page);
  });
}

for (const tema of ['light', 'dark'] as const) {
  test(`cadastro, tema ${tema === 'light' ? 'claro' : 'escuro'}: toque de 44 px e contraste em cada passo`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ colorScheme: tema });
    await page.goto('/');
    await conferir(page);
    await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
    await conferir(page); // triagem em lista
    await page.getByRole('button', { name: 'Sim, alguma destas vale' }).click();
    await conferir(page); // triagem uma a uma
    await page.goBack();
    await page.goto('/comecar/triagem');
    await page.getByRole('button', { name: 'Não tenho nenhuma destas' }).click();
    await page
      .getByRole('group', { name: /sem parar/ })
      .getByLabel('Menos de 6 meses')
      .check();
    await page
      .getByRole('group', { name: /treinando agora/ })
      .getByLabel(/^Estou treinando/)
      .check();
    await page
      .getByRole('group', { name: /confiança na técnica/ })
      .getByLabel(/^Sim/)
      .check();
    await conferir(page); // nível
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page
      .getByRole('group', { name: /Quantos dias/ })
      .getByLabel('3 dias')
      .check();
    await page
      .getByRole('group', { name: /Quantos minutos/ })
      .getByLabel('45 min', { exact: true })
      .check();
    await conferir(page); // rotina
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('button', { name: 'Academia completa' }).click();
    await conferir(page); // equipamento
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
    await conferir(page); // confirmar
  });
}

test('celular pequeno (360 px): treino e guia sem rolar de lado e sem toque pequeno', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await ana(page);
  await semToquePequeno(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await semToquePequeno(page);
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await semToquePequeno(page);
});

// Design v3 (C8): o selo mostra uma palavra; um toque abre o nome inteiro e a regra, e outro fecha.
test('o selo de evidência abre o nome inteiro e a regra com um toque', async ({ page }) => {
  await page.goto('/');
  const selo = page.getByRole('button', { name: /consenso/ }).first();
  await expect(selo).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.selo-detalhe')).toHaveCount(0);
  await selo.click();
  await expect(selo).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.selo-detalhe')).toHaveText(/^Consenso de especialistas, sem estudo que teste isso: .*não diagnostica/);
  await selo.click();
  await expect(page.locator('.selo-detalhe')).toHaveCount(0);
});

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

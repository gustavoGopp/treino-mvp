import { expect, test } from '@playwright/test';
import { ana } from './jornada';
import { semContrasteBaixo } from './contraste';
import { semToquePequeno } from './toque';

// Redesign (06/11/2026): o selo de evidência abre de onde vem a regra. Antes, a regra ficava num "title", que o celular
// não mostra (docs/revisoes/redesign/agente-4-organizacao.md); agora um toque abre uma folha com a regra, o que o nível
// quer dizer e as fontes por extenso (src/conteudo/fontes.json).
test('o selo abre a regra, o significado e as fontes; o foco fica na folha e volta ao selo', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  const selo = page.locator('button.selo').first();
  await expect(selo).toBeVisible();
  await expect(selo).toHaveAccessibleName(/: ver de onde vem$/);
  await selo.click();

  const folha = page.getByRole('dialog', { name: 'De onde vem isto' });
  await expect(folha).toBeVisible();
  await expect(folha.getByRole('heading', { name: 'De onde vem isto' })).toBeFocused();
  await expect(folha.locator('.sentido')).toContainText(/\./);
  await expect(folha.locator('ol li').first()).toContainText(/\(\d{4}\)|s\.d\./);
  await expect(folha.getByRole('link', { name: 'abrir a fonte' }).first()).toHaveAttribute('href', /^https:\/\//);
  await semToquePequeno(page);
  await semContrasteBaixo(page);

  // o resto da página fica inerte, e o Tab dá a volta dentro da folha
  expect(await page.locator('#root').evaluate((e) => (e as HTMLElement).inert)).toBe(true);
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('.folha'))).toBe(true);
  }

  await page.keyboard.press('Escape');
  await expect(folha).toBeHidden();
  await expect(selo).toBeFocused();
  expect(await page.locator('#root').evaluate((e) => (e as HTMLElement).inert)).toBe(false);
});

import { expect, test } from '@playwright/test';

// Design v3 (pedido do Gustavo, 03/11/2026): o tema segue o celular, e "Meus dados" deixa escolher claro ou escuro.
const fundo = (page: import('@playwright/test').Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test('o tema segue o celular e pode ser escolhido em "Meus dados", e a escolha fica', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/dados');
  const grupo = page.getByRole('group', {
    name: 'Cores do app neste aparelho',
  });
  await expect(grupo.getByLabel('Igual ao celular')).toBeChecked();
  expect(await fundo(page)).toBe('rgb(245, 244, 240)');

  await grupo.getByLabel('Escuro').check();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await fundo(page)).toBe('rgb(17, 19, 22)');

  await page.reload();
  await expect(page.getByRole('group', { name: 'Cores do app neste aparelho' }).getByLabel('Escuro')).toBeChecked();
  expect(await fundo(page)).toBe('rgb(17, 19, 22)');

  // claro escolhido vence o celular no escuro
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.getByRole('group', { name: 'Cores do app neste aparelho' }).getByLabel('Claro').check();
  expect(await fundo(page)).toBe('rgb(245, 244, 240)');

  // de volta a "igual ao celular": segue o escuro do celular
  await page.getByRole('group', { name: 'Cores do app neste aparelho' }).getByLabel('Igual ao celular').check();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/);
  expect(await fundo(page)).toBe('rgb(17, 19, 22)');
});

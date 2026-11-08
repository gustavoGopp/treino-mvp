import { expect, test } from '@playwright/test';

test('a página inicial abre em português, com o aviso, e é instalável', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Treine onde estiver, com o que tiver' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'O que o app não faz' })).toBeVisible();
  // lote 3 do redesign: o aviso fica inteiro, palavra por palavra, antes do botão "Começar"
  await expect(page.locator('.nota-aviso p')).toHaveText(
    'O app não diagnostica e não substitui um médico ou um profissional de Educação Física. É uma ferramenta de orientação, não uma prescrição. Se sentir dor, tontura ou mal-estar, pare e procure avaliação. consenso',
  );
  await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeInViewport({ ratio: 1 });
  // a privacidade completa a um toque
  await page.getByRole('button', { name: /Seus dados ficam só neste celular/ }).click();
  await expect(page.getByRole('dialog', { name: 'Seus dados ficam no aparelho' })).toContainText('não fica guardada no servidor');
  await page.keyboard.press('Escape');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
});

test('passos do onboarding não podem ser pulados', async ({ page }) => {
  await page.goto('/comecar/inventario');
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/programa');
  await expect(page).toHaveURL(/\/$/);
});

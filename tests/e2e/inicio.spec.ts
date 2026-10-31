import { expect, test } from '@playwright/test';

test('a página inicial abre em português, com o aviso, e é instalável', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Seu treino, com o equipamento que você tem' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'O que o app não faz' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
});

test('passos do onboarding não podem ser pulados', async ({ page }) => {
  await page.goto('/comecar/inventario');
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/programa');
  await expect(page).toHaveURL(/\/$/);
});

import { expect, test } from '@playwright/test';

test('a página inicial abre em português e é instalável', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Olá!' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
});

import { expect, test } from '@playwright/test';

test('do início ao guia: troca de exercício, modo e vista', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Ver o guia de execução' }).click();
  await expect(page).toHaveURL(/\/guia\/supino-inclinado$/);
  await expect(page.getByRole('heading', { name: 'Supino inclinado com halteres' })).toBeVisible();
  await expect(page.locator('.stage svg line').first()).toBeAttached();

  await page.getByRole('button', { name: 'Erros' }).click();
  await expect(page.locator('.errchip').first()).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', { name: 'Membros A' }).click();
  await expect(page).toHaveURL(/\/guia\/goblet$/);
  await page.getByRole('button', { name: 'Próximo exercício' }).click();
  await expect(page).toHaveURL(/\/guia\/stiff$/);
});

test('com movimento reduzido, a animação começa pausada', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/guia/barra-fixa');
  await expect(page.getByRole('button', { name: 'Reproduzir' })).toBeVisible();
});

test('rota direta funciona e id desconhecido volta para o primeiro exercício', async ({ page }) => {
  await page.goto('/guia/nao-existe');
  await expect(page).toHaveURL(/\/guia\/supino-inclinado$/);
});

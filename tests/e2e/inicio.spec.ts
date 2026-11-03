import { expect, test } from '@playwright/test';

test('a página inicial abre em português, com o aviso, e é instalável', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Musculação com o que você tem' })).toBeVisible();
  await expect(page.getByText(/Não diagnostica nem substitui médico ou profissional de Educação Física/)).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
});

test('passos do onboarding não podem ser pulados', async ({ page }) => {
  await page.goto('/comecar/inventario');
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/programa');
  await expect(page).toHaveURL(/\/$/);
});

// Design v3 (meta aprovada pelo Gustavo em 03/11/2026): a 1ª tela se lê de relance. Até 75 palavras à vista, com o
// "não faz" inteiro e os dados no aparelho antes do botão, que fica à vista sem rolar mesmo num celular pequeno.
test('1ª tela: até 75 palavras, o aviso antes do botão e o botão à vista a 360 px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/');
  const botao = page.getByRole('button', { name: 'Entendi, vamos começar' });
  await expect(botao).toBeInViewport();
  const palavras = await page.evaluate(
    () => (document.querySelector('main') as HTMLElement).innerText.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length,
  );
  expect(palavras).toBeLessThanOrEqual(75);
  for (const t of [/Pare e procure avaliação/, /Seus dados ficam só neste aparelho/]) await expect(page.getByText(t)).toBeVisible();
});

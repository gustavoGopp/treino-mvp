import { expect, test } from '@playwright/test';

// R4: o laboratório do boneco só existe em desenvolvimento e nas prévias da Vercel. No build de produção
// (o mesmo que este teste usa), a rota não existe e cai na tela inicial, como qualquer endereço desconhecido.
test('o laboratório do boneco não aparece para quem usa o app', async ({ page }) => {
  await page.goto('/lab/boneco');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText('Laboratório do boneco')).toHaveCount(0);
});

import { expect, test } from '@playwright/test';

// Redesign (06/11/2026): a letra vem do próprio app, sem pedido a outro endereço (docs/revisoes/redesign/agente-5-cor.md).
// Antes eram 3 pedidos ao Google Fonts por visita (docs/revisoes/redesign/medidas.md).
test('a letra Atkinson Hyperlegible Next carrega do próprio app, sem pedido externo', async ({ page, baseURL }) => {
  const externos: string[] = [];
  page.on('request', (r) => {
    if (!r.url().startsWith(baseURL!) && !r.url().startsWith('data:')) externos.push(r.url());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const carregada = await page.evaluate(async () => {
    await document.fonts.ready;
    await document.fonts.load('700 17px "Atkinson Hyperlegible Next"', 'Série 12 kg ç ã é');
    let ok = false;
    document.fonts.forEach((f) => {
      if (f.family.replace(/"/g, '') === 'Atkinson Hyperlegible Next' && f.status === 'loaded') ok = true;
    });
    return ok;
  });
  expect(carregada, 'a letra do app carregou').toBe(true);
  expect(externos, 'pedidos a outros endereços').toEqual([]);
});

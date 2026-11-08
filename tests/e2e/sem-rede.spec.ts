import { expect, test } from '@playwright/test';
import { ana } from './jornada';

// Lote técnico do redesign (06/11/2026): com cada tela num pedaço próprio do JavaScript, o uso sem rede depende de o
// service worker guardar todos os pedaços na instalação. Na academia a rede falha; o treino e o guia têm de abrir.
test('sem rede, depois da 1ª visita: o programa, o treino, o guia e a semana abrem', async ({ page, context }) => {
  test.setTimeout(90_000);
  await ana(page);
  // o service worker assume a página e termina de guardar os arquivos
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise((ok) => navigator.serviceWorker.addEventListener('controllerchange', ok, { once: true }));
    return reg.active?.state;
  });
  await expect.poll(() => page.evaluate(async () => (await caches.keys()).length)).toBeGreaterThan(0);

  await context.setOffline(true);
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await expect(page.locator('.miniatura svg').first()).toBeVisible(); // o motor do Boneco veio do service worker
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await expect(page.getByRole('button', { name: 'Senti algo' })).toBeVisible();
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.stage svg').first()).toBeVisible();
  await page.goto('/semana');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await context.setOffline(false);
});

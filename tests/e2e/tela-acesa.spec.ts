import { expect, test } from '@playwright/test';
import { ana, terminarTreino } from './jornada';

// Lote 2 do redesign (06/11/2026): a tela fica acesa durante o treino todo, e não só no descanso. O Wake Lock é
// simulado no navegador do teste, que conta os pedidos e as liberações.
test('a tela fica acesa do começo ao fim do treino, e volta a ficar ao retornar ao app', async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __trava: { pedidos: number; soltas: number } };
    w.__trava = { pedidos: 0, soltas: 0 };
    Object.defineProperty(navigator, 'wakeLock', {
      configurable: true,
      value: {
        request: async () => {
          w.__trava.pedidos++;
          const t = new EventTarget() as EventTarget & { release: () => Promise<void> };
          t.release = async () => {
            w.__trava.soltas++;
          };
          return t;
        },
      },
    });
  });
  const trava = () => page.evaluate(() => (window as unknown as { __trava: { pedidos: number; soltas: number } }).__trava);
  await ana(page);
  expect((await trava()).pedidos).toBe(0);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await expect.poll(async () => (await trava()).pedidos).toBe(1);
  expect((await trava()).soltas).toBe(0);
  // o sistema solta a trava quando o app sai da tela; ao voltar, o app pede de novo
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  expect((await trava()).pedidos).toBe(1); // já tinha a trava: não pede outra
  // o guia aberto pelo treino faz parte do treino: a tela continua acesa
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\//);
  await expect.poll(async () => { const t = await trava(); return t.pedidos - t.soltas; }).toBe(1);
  await page.getByRole('link', { name: /Voltar ao treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await expect.poll(async () => { const t = await trava(); return t.pedidos - t.soltas; }).toBe(1);
  // ao terminar, a tela volta a apagar sozinha
  await terminarTreino(page);
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await expect.poll(async () => { const t = await trava(); return t.pedidos - t.soltas; }).toBe(0);
});

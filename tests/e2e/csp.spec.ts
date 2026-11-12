import { expect, test, type Page } from '@playwright/test';
import { ana } from './jornada';

// Content-Security-Policy (vercel.json): a prévia local serve os mesmos cabeçalhos da produção (vite.config.ts), então
// este teste roda o app de verdade sob a política. Qualquer recurso barrado aparece no console como violação.

function violacoes(page: Page): string[] {
  const lista: string[] = [];
  page.on('console', (m) => {
    if (/Content Security Policy|Content-Security-Policy/i.test(m.text())) lista.push(m.text());
  });
  return lista;
}

test('a política de segurança de conteúdo vem no cabeçalho e não barra nada do app', async ({ page }) => {
  const barradas = violacoes(page);
  const resposta = await page.goto('/');
  const csp = resposta!.headers()['content-security-policy'] ?? '';
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("script-src 'self'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).not.toContain('unsafe-eval');
  // o script em linha é barrado de verdade: a política está valendo, e não só escrita
  const rodou = await page.evaluate(() => {
    const s = document.createElement('script');
    s.textContent = 'window.__emLinha = true';
    document.head.appendChild(s);
    return (window as unknown as { __emLinha?: boolean }).__emLinha === true;
  });
  expect(rodou).toBe(false);
  expect(barradas.length).toBeGreaterThan(0);
  barradas.length = 0;

  // o cadastro inteiro, o programa (miniaturas desenhadas num worker), o treino, o guia animado, a semana e os dados
  await ana(page);
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Corpo todo A', exact: true }).click();
  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\//);
  await expect(page.locator('svg').first()).toBeVisible();
  await page.goto('/semana');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.goto('/dados');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.goto('/termos');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // o service worker instala e assume a página sob a política
  await page.goto('/programa');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  expect(barradas).toEqual([]);
});

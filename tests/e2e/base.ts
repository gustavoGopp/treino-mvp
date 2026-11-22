import { test as base, expect, type Locator, type Page } from '@playwright/test';

// A base dos testes de tela. Desde 22/11/2026, na 1ª vez da pessoa num exercício o guia grande abre sozinho, com o botão
// "Entendi" (ideia B do estudo da tela do treino). As personas dos testes são sempre de 1ª vez; então, como uma pessoa
// faria, todo teste toca em "Entendi" quando a folha aparece no caminho, e segue. O teste que confere a própria folha
// (treino.spec.ts) desliga isto com `page.removeLocatorHandler(botaoEntendi(page))`.
export const botaoEntendi = (page: Page) => page.getByRole('button', { name: 'Entendi', exact: true });

export const test = base.extend<{ entendi: void }>({
  entendi: [
    async ({ page }, usar) => {
      await page.addLocatorHandler(botaoEntendi(page), async (botao) => {
        // espera a folha terminar de subir, para o toque não cair no meio do movimento
        await page.locator('.folha').last().evaluate((e) => Promise.all(e.getAnimations().map((a) => a.finished)));
        await botao.click();
      });
      await usar();
    },
    { auto: true },
  ],
});
export { expect, type Locator, type Page };

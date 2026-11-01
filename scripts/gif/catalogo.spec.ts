import { expect, test } from '@playwright/test';
import { ana } from '../../tests/e2e/jornada';

// Prints do catálogo do R0c para o devlog (persona fictícia Ana, com hack e multifuncional a mais):
// a tela de equipamento com itens novos sem desenho e o cartão de texto de um exercício sem animação.
// Uso: npx playwright test -c scripts/gif/playwright.config.ts catalogo
test('catálogo', async ({ page }) => {
  await ana(page, {
    equipamentoExtra: async (p) => {
      await p.getByLabel('Hack', { exact: true }).check();
      await p.getByLabel('Multifuncional', { exact: true }).check();
      const estacoes = p.getByRole('group', { name: 'Quais estações o seu tem?' });
      await estacoes.getByLabel('Puxador alto').check();
      await estacoes.getByLabel('Extensora').check();
      const maquinas = p.getByRole('group', { name: 'Polias e acessórios' });
      await maquinas.scrollIntoViewIfNeeded();
      await maquinas.screenshot({ path: 'docs/img/r0c-equipamento.png' });
    },
  });
  const painel = page.getByRole('tabpanel');
  const cartao = painel.locator('li.cartao-ex', { has: page.getByRole('heading', { name: /Agachamento no hack/ }) });
  await cartao.getByText('Detalhes', { exact: true }).click();
  await cartao.getByText(/Como fazer \(cartão de texto/).click();
  await expect(cartao.getByText('Montagem segura')).toBeVisible();
  await cartao.scrollIntoViewIfNeeded();
  await cartao.screenshot({ path: 'docs/img/r0c-cartao.png' });
});

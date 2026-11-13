import { expect, test } from '@playwright/test';
import { ana, marcarItem, verAvisos } from './jornada';

// Redesign, lote 4 (07/11/2026): o "Seu treino" com uma coisa principal. O "Começar" fica à vista sem rolar e no máximo
// um aviso aparece na tela, em 1 linha; o bloco inteiro dele (os textos e os selos de sempre) abre numa folha.
for (const [largura, altura] of [
  [412, 839],
  [360, 740],
] as const) {
  test(`a ${largura} px: o "Começar" à vista sem rolar e no máximo 1 aviso na tela`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: altura });
    await ana(page, { minutos: '40' });
    await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeInViewport({ ratio: 1 });
    await expect(page.locator('.aviso-linha')).toHaveCount(1);
    // ao rolar até o fim da lista, o "Começar" continua preso embaixo
    await page.getByRole('button', { name: 'Sobre o programa' }).scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeInViewport({ ratio: 1 });
    const avisos = await verAvisos(page);
    await expect(avisos.getByRole('region', { name: 'Ajustes possíveis' })).toBeVisible();
    await expect(avisos.locator('.selo').first()).toBeVisible();
  });
}

// R5-anim, lote 2 (10/11/2026): a ponte com halter ganhou animação; o exercício sem animação com montagem segura do
// dia A passa a ser a barra só na descida, que entra com uma barra fixa no equipamento da Ana.
test('a folha do exercício sem animação traz a montagem segura aberta, o porquê com os selos e as alternativas', async ({ page }) => {
  await ana(page, { equipamentoExtra: async (p) => void (await marcarItem(p, 'Barra fixa')) });
  await page.getByRole('tabpanel').getByRole('button', { name: /Barra fixa só na descida/ }).click();
  const folha = page.getByRole('dialog', { name: /Barra fixa só na descida/ });
  await expect(folha.getByText('Montagem segura')).toBeVisible();
  // estudo dos textos (13/11/2026): os motivos ficam a um toque, com a contagem no rótulo
  const porque = folha.locator('details', { hasText: /^Por que este exercício \(\d+ motivos?\)/ });
  await porque.locator('summary').click();
  await expect(porque.locator('.selo').first()).toBeVisible();
  await expect(folha.getByText(/^Se o equipamento estiver ocupado/)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(folha).toBeHidden();
  await expect(page.getByRole('tabpanel').getByRole('button', { name: /Barra fixa só na descida/ })).toBeFocused();
});

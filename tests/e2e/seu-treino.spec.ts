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
    await page.getByRole('tabpanel').getByRole('button').last().scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeInViewport({ ratio: 1 });
    // sessão de textos (16/11/2026): o início não tem "Como ler", "Sobre o programa", selo nem "por quê?"
    await expect(page.getByText(/Como ler o seu treino|Sobre o programa/)).toHaveCount(0);
    await expect(page.locator('main .selo, main .porque')).toHaveCount(0);
    const avisos = await verAvisos(page);
    await expect(avisos.getByRole('region', { name: 'Ajustes possíveis' })).toBeVisible();
  });
}

// R5-anim, lote 2 (10/11/2026): a ponte com halter ganhou animação; o exercício sem animação com montagem segura do
// dia A passa a ser a barra só na descida, que entra com uma barra fixa no equipamento da Ana.
test('a folha do exercício sem animação traz a montagem segura aberta e as alternativas a um toque', async ({ page }) => {
  await ana(page, { equipamentoExtra: async (p) => void (await marcarItem(p, 'Barra fixa')) });
  await page.getByRole('tabpanel').getByRole('button', { name: /Barra fixa só na descida/ }).click();
  const folha = page.getByRole('dialog', { name: /Barra fixa só na descida/ });
  await expect(folha.getByText('Montagem segura')).toBeVisible();
  // sessão de textos (16/11/2026): os motivos do exercício saíram da folha ("Entenda o treino" → "Os exercícios")
  await expect(folha.getByText(/^Por que este exercício/)).toHaveCount(0);
  // sessão de textos (16/11/2026): as alternativas ficam a um toque
  await expect(folha.getByText(/^Se o equipamento estiver ocupado/)).toBeHidden();
  await folha.locator('summary', { hasText: /^Alternativas \(\d+\)$/ }).click();
  await expect(folha.getByText(/^Se o equipamento estiver ocupado/)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(folha).toBeHidden();
  await expect(page.getByRole('tabpanel').getByRole('button', { name: /Barra fixa só na descida/ })).toBeFocused();
});

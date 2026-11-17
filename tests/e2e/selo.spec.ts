import { expect, test } from '@playwright/test';
import { ana, sobreOPrograma } from './jornada';
import { semContrasteBaixo } from './contraste';
import { semToquePequeno } from './toque';

// Redesign (06/11/2026): o selo de evidência abre de onde vem a regra: um toque abre uma folha com a regra, o que o
// nível quer dizer e as fontes por extenso (src/conteudo/fontes.json).
// Sessão de textos (16/11/2026, decisão do Gustavo): o selo e o "por quê?" saíram de todas as telas e só aparecem em
// "Entenda o treino" (Meus dados). A folha do selo é modal: a página inteira fica inerte.
test('o selo abre a regra, o significado e as fontes; o foco fica na folha e volta ao selo', async ({ page }) => {
  await ana(page);
  const sobre = await sobreOPrograma(page);
  const selo = sobre.locator('button.selo:visible').first();
  await expect(selo).toBeVisible();
  await expect(selo).toHaveAccessibleName(/: ver de onde vem$/);
  await selo.click();

  const folha = page.getByRole('dialog', { name: 'De onde vem isto' });
  await expect(folha).toBeVisible();
  await expect(folha.getByRole('heading', { name: 'De onde vem isto' })).toBeFocused();
  await expect(folha.locator('.sentido')).toContainText(/\./);
  await expect(folha.locator('ol li').first()).toContainText(/\(\d{4}\)|s\.d\./);
  await expect(folha.getByRole('link', { name: 'abrir a fonte' }).first()).toHaveAttribute('href', /^https:\/\//);
  await semToquePequeno(page);
  await semContrasteBaixo(page);

  // o resto da página fica inerte, e o Tab dá a volta dentro da folha
  expect(await page.locator('#root').evaluate((e) => (e as HTMLElement).inert)).toBe(true);
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('.folha'))).toBe(true);
  }

  // o Esc fecha a folha; o foco volta ao selo e a página volta ao alcance
  await page.keyboard.press('Escape');
  await expect(folha).toBeHidden();
  await expect(selo).toBeFocused();
  expect(await page.locator('#root').evaluate((e) => (e as HTMLElement).inert)).toBe(false);
});

// Segurança: no treino não há mais folha de selo nem de "por quê?" para cobrir a tela, e "Senti algo" segue à vista.
// (Que "Senti algo" continua ao alcance com qualquer outra folha do treino aberta está em treino.spec.ts.)
test('no treino, nenhum selo nem "por quê?" na tela, e "Senti algo" à vista', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page.getByRole('region', { name: /^Série \d/ })).toBeVisible();
  await expect(page.locator('button.selo, button.porque')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Senti algo' })).toBeInViewport({ ratio: 1 });
});

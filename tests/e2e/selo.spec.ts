import { expect, test } from '@playwright/test';
import { ana, sobreOPrograma } from './jornada';
import { semContrasteBaixo } from './contraste';
import { semToquePequeno } from './toque';

// Redesign (06/11/2026): o selo de evidência abre de onde vem a regra. Antes, a regra ficava num "title", que o celular
// não mostra (docs/revisoes/redesign/agente-4-organizacao.md); agora um toque abre uma folha com a regra, o que o nível
// quer dizer e as fontes por extenso (src/conteudo/fontes.json).
// Fora do treino, a folha é modal: a página inteira fica inerte. Desde o lote 4, o início quase não tem selo à vista:
// o teste abre "Sobre o programa" e toca no selo da fase, numa folha dentro da folha.
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

  // o Esc fecha só a folha de cima; o foco volta ao selo, e a página volta quando a 2ª folha também fecha
  await page.keyboard.press('Escape');
  await expect(folha).toBeHidden();
  await expect(sobre).toBeVisible();
  await expect(selo).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(sobre).toBeHidden();
  expect(await page.locator('#root').evaluate((e) => (e as HTMLElement).inert)).toBe(false);
});

// Segurança: no treino, "Senti algo" continua à vista e tocável com a folha aberta (a folha abre abaixo do cabeçalho),
// entra na volta do Tab, e tocar nele fecha a folha e abre o painel.
test('no treino, a folha do selo abre abaixo do cabeçalho e "Senti algo" continua ao alcance', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await page.locator('button.selo').first().click();
  const folha = page.getByRole('dialog', { name: 'De onde vem isto' });
  await expect(folha).toBeVisible();
  const senti = page.getByRole('button', { name: 'Senti algo' });
  const [cab, veu] = await Promise.all([page.locator('header.top').boundingBox(), page.locator('.veu').boundingBox()]);
  expect(veu!.y).toBeGreaterThanOrEqual(cab!.y + cab!.height - 1);
  expect(await senti.evaluate((b) => { const r = b.getBoundingClientRect(); return document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === b || b.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)); })).toBe(true);
  let chegou = false;
  for (let i = 0; i < 15 && !chegou; i++) {
    await page.keyboard.press('Tab');
    chegou = await senti.evaluate((b) => document.activeElement === b);
  }
  expect(chegou, '"Senti algo" entra na volta do Tab').toBe(true);
  await senti.click();
  await expect(folha).toBeHidden();
  await expect(page.getByRole('region', { name: 'Senti algo' })).toBeVisible();
});

// Retorno do Gustavo (06/11): a explicação sai da tela e fica a um toque, no "por quê?". O texto da regra e o selo vão junto.
test('o "por quê?" do RIR abre a explicação com a regra, o selo e as fontes', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page.getByText('A maioria das pessoas acha que tem menos reserva do que tem.')).toHaveCount(0);
  await page.getByRole('group', { name: /RIR/ }).getByRole('button', { name: 'por quê?' }).click();
  const folha = page.getByRole('dialog', { name: 'Por quê' });
  await expect(folha).toContainText('A maioria das pessoas acha que tem menos reserva do que tem.');
  await expect(folha.locator('.sentido')).toContainText('Evidência moderada.');
  await expect(folha.locator('ol li').first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Senti algo' })).toBeVisible();
  await semToquePequeno(page);
  await page.keyboard.press('Escape');
  await expect(folha).toBeHidden();
});

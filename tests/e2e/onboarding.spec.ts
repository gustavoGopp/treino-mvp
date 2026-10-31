import { expect, test } from '@playwright/test';
import { ana, triagem } from './jornada';

test('do zero ao programa em menos de 5 minutos (persona Ana)', async ({ page }) => {
  const inicio = Date.now();
  await ana(page);
  expect(Date.now() - inicio).toBeLessThan(5 * 60_000);

  // Vai direto ao treino: abas por dia e cartões com séries × repetições.
  for (const dia of ['Corpo todo A', 'Corpo todo B', 'Corpo todo C']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toHaveAttribute('aria-selected', 'true');
  const painel = page.getByRole('tabpanel');
  await expect(painel.locator('.series').first()).toHaveText('3 × 8–15');
  // Exercício com animação mostra a imagem e abre o guia; sem animação, "animação em breve".
  await expect(painel.locator('.miniatura svg').first()).toBeVisible();
  await expect(painel.locator('.miniatura.vazia').first()).toBeVisible();
  // O porquê, com o selo de evidência, fica um toque abaixo.
  await painel.getByText('Detalhes', { exact: true }).first().click();
  await expect(painel.locator('.mais .selo').first()).toBeVisible();
  // Outro dia.
  await page.getByRole('tab', { name: 'Corpo todo B', exact: true }).click();
  await expect(painel.getByRole('heading', { name: /Agachamento búlgaro/ })).toBeVisible();
  // Avisos de meta por músculo em "Sobre o programa".
  await page.getByText('Sobre o programa: avisos e o porquê').click();
  await expect(page.getByText(/Abaixo da meta semanal/).first()).toBeVisible();

  await page.getByRole('tab', { name: 'Corpo todo A', exact: true }).click();
  await painel.getByRole('link', { name: /Agachamento goblet.*ver como fazer/ }).click();
  await expect(page).toHaveURL(/\/guia\/goblet$/);
});

test('triagem com "sim" bloqueia, e confirmar a liberação desbloqueia', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagem(page, { simEm: ['coração'] });

  await expect(page.getByRole('heading', { name: 'Vamos pausar o programa automático' })).toBeVisible();
  const continuar = page.getByRole('button', { name: 'Continuar com a liberação' });
  await expect(continuar).toBeDisabled();
  await page.reload();
  // Sem a confirmação, nada foi salvo: a triagem continua pendente.
  await expect(page).toHaveURL(/\/comecar\/triagem$/);
  await triagem(page, { simEm: ['coração'] });
  await page.getByLabel('Confirmo que fui avaliado e liberado').check();
  await continuar.click();
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
});

test('"sim" só no osteoarticular pede as regiões em vez de bloquear', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagem(page, { simEm: ['osso, articulação'] });
  await expect(page.getByText('Marque pelo menos uma região com problema.')).toBeVisible();
  await page.getByRole('group', { name: 'Quais regiões?' }).getByLabel('Ombro').check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
});

test('escolher uma opção calculada gera o programa de novo com o novo perfil', async ({ page }) => {
  await ana(page);
  // Os ajustes ficam recolhidos numa faixa; nenhuma opção vem escolhida.
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ver opções' }).click();
  const ajustes = page.getByRole('region', { name: 'Ajustes possíveis' });
  await ajustes.getByRole('button', { name: /^4 treinos de 50 min/ }).click();
  await expect(page.getByRole('status')).toContainText('4 treinos de 50 min');
  await expect(page.getByRole('list', { name: 'Resumo' })).toContainText('4x por semana');
  await expect(page.getByRole('tab', { name: 'Torso A', exact: true })).toBeVisible();

  // "Manter" recolhe a faixa; dá para reabrir em "Sobre o programa".
  const verOpcoes = page.getByRole('button', { name: 'Ver opções' });
  if (await verOpcoes.isVisible()) {
    await verOpcoes.click();
    await page.getByRole('button', { name: /^Manter/ }).click();
    await expect(verOpcoes).toBeHidden();
    await page.getByText('Sobre o programa: avisos e o porquê').click();
    await page.getByRole('button', { name: 'Ver ajustes possíveis' }).click();
    await expect(page.getByRole('region', { name: 'Ajustes possíveis' })).toBeVisible();
  }
});

test('recarregar a página mantém perfil, inventário e programa', async ({ page }) => {
  await ana(page);
  const antes = await page.locator('main').innerText();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  expect(await page.locator('main').innerText()).toBe(antes);
  // A raiz abre direto no programa.
  await page.goto('/');
  await expect(page).toHaveURL(/\/programa$/);
  // E as respostas continuam nas telas do perfil.
  await page.goto('/comecar/inventario');
  await expect(page.getByLabel('Halteres fixos', { exact: true })).toBeChecked();
  await expect(page.getByRole('group', { name: 'O mais pesado' }).getByLabel('12 kg', { exact: true })).toBeChecked();
});

test('exportar, apagar e importar devolve o mesmo estado', async ({ page }) => {
  await ana(page);
  const programa = await page.locator('main').innerText();
  await page.getByRole('link', { name: 'Meus dados' }).click();

  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  expect(download.suggestedFilename()).toMatch(/^treino-mvp-\d{4}-\d{2}-\d{2}\.json$/);
  const arquivo = await download.path();
  const exportado = JSON.parse(await (await import('node:fs/promises')).readFile(arquivo, 'utf8'));

  await page.getByRole('button', { name: 'Apagar todos os dados' }).click();
  await page.getByRole('button', { name: 'Sim, apagar tudo' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino, com o equipamento que você tem' })).toBeVisible();

  await page.goto('/dados');
  await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles(arquivo);
  await page.getByRole('button', { name: 'Importar dados' }).click();
  await expect(page.getByRole('status')).toHaveText('Dados importados.');

  const [download2] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  const reexportado = JSON.parse(await (await import('node:fs/promises')).readFile(await download2.path(), 'utf8'));
  expect(reexportado.estado).toEqual(exportado.estado);

  await page.getByRole('link', { name: 'Meu programa' }).click();
  expect(await page.locator('main').innerText()).toBe(programa);
});

test('importar um arquivo inválido não altera os dados', async ({ page }) => {
  await ana(page);
  await page.goto('/dados');
  await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles({ name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"app":"outro"}') });
  await page.getByRole('button', { name: 'Importar dados' }).click();
  await expect(page.getByRole('alert')).toContainText('Seus dados atuais não foram alterados');
  await page.goto('/');
  await expect(page).toHaveURL(/\/programa$/);
});

test('equipamento por toque: anilhas com contador e valor fora da lista em "Outro"', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/inventario');
  await page.getByLabel('Anilhas e manoplas', { exact: true }).check();
  const detalhes = page.getByRole('region', { name: 'Detalhes: Anilhas e manoplas' });
  await detalhes.getByRole('group', { name: 'Quantas manoplas?' }).getByLabel('2').check();
  await detalhes.getByRole('group', { name: 'Peso de cada manopla' }).getByLabel('Outro').check();
  await detalhes.getByLabel('Peso de cada manopla: outro valor').fill('1.8');
  await detalhes.getByRole('button', { name: 'Mais anilhas de 5 kg' }).click();
  await detalhes.getByRole('button', { name: 'Mais anilhas de 5 kg' }).click();
  await expect(detalhes.getByLabel('Quantidade de anilhas de 5 kg')).toHaveText('4');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Dores e o que evitar' })).toBeVisible();
  await page.goto('/comecar/inventario');
  await expect(page.getByLabel('Peso de cada manopla: outro valor')).toHaveValue('1.8');
  await expect(page.getByLabel('Quantidade de anilhas de 5 kg')).toHaveText('4');
});

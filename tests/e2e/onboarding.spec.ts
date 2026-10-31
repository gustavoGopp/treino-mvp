import { expect, test } from '@playwright/test';
import { ana, triagem } from './jornada';

test('do zero ao programa em menos de 5 minutos (persona Ana)', async ({ page }) => {
  const inicio = Date.now();
  await ana(page);
  expect(Date.now() - inicio).toBeLessThan(5 * 60_000);

  await expect(page.locator('.resumo')).toContainText('Corpo todo A/B/C');
  for (const dia of ['Corpo todo A', 'Corpo todo B', 'Corpo todo C']) await expect(page.getByRole('heading', { name: dia, exact: true })).toBeVisible();
  // Exercício com animação abre o guia; sem animação, cartão de texto.
  await expect(page.getByRole('link', { name: 'Ver a execução animada' }).first()).toBeVisible();
  await expect(page.getByText('Animação em breve').first()).toBeVisible();
  // O porquê vem com o selo de evidência.
  await page.getByText('Por que este exercício').first().click();
  await expect(page.locator('.exercicio .selo').first()).toBeVisible();
  // Os avisos de meta por músculo aparecem.
  await expect(page.getByText(/Abaixo da meta semanal/).first()).toBeVisible();

  await page.getByRole('link', { name: 'Ver a execução animada' }).first().click();
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
  const ajustes = page.getByRole('region', { name: 'Ajustes possíveis' });
  await expect(ajustes).toBeVisible();
  // Nenhuma opção vem escolhida: o programa só muda com o toque da pessoa.
  await expect(page.locator('.resumo')).toContainText('Corpo todo A/B/C');
  await ajustes.getByRole('button', { name: /^4 treinos de 50 min/ }).click();
  await expect(page.getByRole('status')).toContainText('4 treinos de 50 min');
  await expect(page.locator('.resumo')).toContainText('4 treinos por semana');
  await expect(page.getByRole('heading', { name: 'Torso A', exact: true })).toBeVisible();

  // "Manter" recolhe o painel, que pode ser reaberto.
  const manter = page.getByRole('button', { name: /^Manter/ });
  if (await manter.isVisible()) {
    await manter.click();
    await expect(page.getByRole('button', { name: 'Ver ajustes possíveis' })).toBeVisible();
  }
});

test('recarregar a página mantém perfil, inventário e programa', async ({ page }) => {
  await ana(page);
  const antes = await page.locator('main').innerText();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Seu programa', exact: true })).toBeVisible();
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

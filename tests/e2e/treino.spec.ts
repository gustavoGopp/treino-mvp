import { expect, test, type Page } from '@playwright/test';
import { ana } from './jornada';

// M5: treinar com o app. Persona fictícia Ana (halteres de 1 a 12 kg e banco reto).

/** Registra todas as séries do exercício atual: carga (se ainda não houver), RIR 2 e pula o descanso. */
async function fazerExercicio(page: Page) {
  const registro = page.getByRole('region', { name: /^Série \d/ });
  while (await registro.isVisible()) {
    const carga = page.getByLabel('Carga', { exact: true });
    if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT')) && !(await carga.inputValue())) await carga.selectOption({ index: 6 });
    if ((await page.getByRole('button', { name: 'Mais carga' }).count()) && (await page.locator('#carga-kg').innerText()) === '—')
      await page.getByRole('button', { name: 'Mais carga' }).click();
    const rir = registro.getByRole('radio', { name: '2', exact: true });
    if (!(await rir.isChecked())) await rir.check();
    await registro.getByRole('button', { name: /^Série feita/ }).click();
    const pular = page.getByRole('button', { name: 'Pular' });
    if (await pular.isVisible()) await pular.click();
  }
}

async function comecar(page: Page, dia = 'Corpo todo A') {
  await page.getByRole('tab', { name: dia, exact: true }).click();
  await page.getByRole('button', { name: `Começar o treino ${dia}` }).click();
  await expect(page).toHaveURL(/\/treino$/);
}

test('sessão completa: registra as séries, descansa e recebe a sugestão para a próxima vez', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await expect(page.getByRole('heading', { name: 'Agachamento búlgaro com apoio' })).toBeVisible();
  await expect(page.getByText(/Primeira vez: escolha uma carga/)).toBeVisible();
  await expect(page.getByText(/1–2 séries leves de aquecimento/)).toBeVisible();

  // 1ª série: sem carga e sem RIR o botão não deixa salvar.
  const feita = page.getByRole('button', { name: /^Série feita/ });
  await expect(feita).toBeDisabled();
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await feita.click();

  // Descanso começa sozinho, com ±15 s.
  const descanso = page.getByRole('region', { name: 'Descanso' });
  await expect(descanso).toBeVisible();
  await expect(descanso.getByRole('timer')).toHaveText(/^1:4\d$/);
  await descanso.getByRole('button', { name: '+15 s' }).click();
  await expect(descanso.getByRole('timer')).toHaveText(/^(2:0\d|1:59)$/);
  await descanso.getByRole('button', { name: 'Pular' }).click();
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('8 kg × 9 · RIR 2');

  // 2ª série vem preenchida com a anterior.
  await expect(page.getByLabel('Carga', { exact: true })).toHaveValue('8');

  for (;;) {
    await fazerExercicio(page);
    const proximo = page.getByRole('button', { name: 'Próximo ›' });
    if (!(await proximo.isVisible())) break;
    await proximo.click();
  }
  await page.getByRole('main').getByRole('button', { name: 'Terminar treino' }).click();

  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Resumo do treino' })).toContainText('Corpo todo A');
  await expect(page.getByRole('heading', { name: 'Para a próxima vez' })).toBeVisible();
  await expect(page.locator('.resumo-ex').first()).toContainText('Manter');

  // De volta ao programa: o próximo da rotação vem selecionado, e o histórico sobrevive ao recarregar.
  await page.getByRole('link', { name: 'Voltar ao programa' }).click();
  await expect(page.getByRole('tab', { name: 'Corpo todo B', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Começar o treino Corpo todo B' })).toBeVisible();

  // Treino A de novo: agora a carga sugerida aparece.
  await comecar(page, 'Corpo todo A');
  await expect(page.getByText(/^Hoje:/)).toBeVisible();
  await expect(page.getByLabel('Carga', { exact: true })).toHaveValue('8');
});

test('treino em andamento sobrevive a fechar o app', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByLabel('Carga', { exact: true }).selectOption('6');
  await page.getByRole('radio', { name: '3', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Continuar o treino em andamento' })).toBeVisible();
  await page.getByRole('link', { name: 'Continuar o treino em andamento' }).click();
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('6 kg');
});

test('trocar pela alternativa vale só para esta sessão', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByRole('button', { name: 'Trocar exercício' }).click();
  await page.getByRole('region', { name: 'Trocar exercício' }).getByRole('button').first().click();
  await expect(page.getByText(/No lugar de agachamento búlgaro/)).toBeVisible();
});

test('dor acima de 5 encerra o exercício e oferece a alternativa', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await page.getByRole('region', { name: 'Senti algo' }).getByRole('button', { name: '7', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Pare este exercício e use a alternativa');
  await expect(page.getByText('Exercício encerrado.')).toBeVisible();
  await expect(page.getByRole('region', { name: 'Trocar exercício' })).toBeVisible();
});

test('dor no peito encerra o treino e orienta ligar para o SAMU', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await page.getByRole('button', { name: 'Dor, pressão ou aperto no peito' }).click();
  await expect(page.getByRole('heading', { name: 'Treino encerrado por segurança' })).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('192');
});

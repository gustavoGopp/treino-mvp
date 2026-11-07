import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import { semContrasteBaixo } from './contraste';
import { ana } from './jornada';
import { semToquePequeno } from './toque';

// R5c, abrir para família e amigos: a tela de erro com saída, a última cópia, o armazenamento negado, os termos,
// o aviso de instalar no iPhone e o "Como ler o seu treino". A caixa de consentimento da foto está em foto.spec.ts.

async function conferir(page: Page) {
  await semToquePequeno(page);
  await semContrasteBaixo(page);
}

test('erro forçado numa tela: mostra a saída, exporta os dados dali, avisa o problema e volta ao tentar de novo', async ({ page }) => {
  await ana(page);
  await page.evaluate(() => sessionStorage.setItem('treino-teste-erro', '1'));
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Algo deu errado nesta tela' })).toBeVisible();
  await expect(page.getByText(/^Versão do app:/)).toBeVisible();
  for (const tema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: tema });
    await conferir(page);
  }

  // O export lê o armazenamento direto, sem o app de pé.
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados' }).click()]);
  expect(download.suggestedFilename()).toMatch(/^treino-mvp-\d{4}-\d{2}-\d{2}\.json$/);
  const arquivo = JSON.parse(await readFile(await download.path(), 'utf8'));
  expect(arquivo.app).toBe('treino-mvp');
  expect(arquivo.estado.programa.programa.dias.length).toBeGreaterThan(0);
  await expect(page.getByRole('status').filter({ hasText: 'Arquivo exportado' })).toBeVisible();

  // Sem e-mail no build, o aviso mostra o texto para copiar: versão, aparelho e tela, sem dado de saúde.
  await page.getByRole('button', { name: 'Avisar um problema' }).click();
  const texto = page.getByLabel('Informações do problema');
  await expect(texto).toContainText('Versão:');
  await expect(texto).toContainText('Tela: /programa');
  await expect(texto).toContainText('Erro: Error: Erro de teste da tela de erro');
  const conteudo = await texto.innerText();
  for (const proibido of ['triagem', 'Pernas', 'halter', 'dor']) expect(conteudo.toLowerCase()).not.toContain(proibido.toLowerCase());

  await page.evaluate(() => sessionStorage.removeItem('treino-teste-erro'));
  await page.getByRole('button', { name: 'Tentar de novo' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
});

test('Meus dados: a última cópia, o armazenamento negado, os termos e o canal de problema', async ({ page }) => {
  await ana(page);
  await page.goto('/dados');
  await expect(page.getByText('Última cópia: nenhuma cópia ainda')).toBeVisible();
  // No Chromium sem interação, o pedido de armazenamento persistente é negado: o app avisa (dados.persistente).
  const persistente = await page.evaluate(() => navigator.storage.persisted());
  if (!persistente) await expect(page.getByText('Este navegador não garantiu guardar seus dados de forma permanente:')).toBeVisible();
  await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  await expect(page.getByText('Última cópia: hoje')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Última cópia: hoje')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Avisar um problema' })).toBeVisible();
  await conferir(page);

  await page.getByRole('link', { name: 'Termos de uso e privacidade' }).click();
  await expect(page.getByRole('heading', { name: 'Termos de uso e privacidade' })).toBeVisible();
  await expect(page.getByText('Rascunho em revisão jurídica.', { exact: false })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A foto do equipamento' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Seus direitos' })).toBeVisible();
  for (const tema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: tema });
    await conferir(page);
  }
});

test('boas-vindas: o texto da foto diz para onde ela vai e há link para os termos', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/vai reduzida e sem a localização para a Anthropic, empresa dos EUA/)).toBeVisible();
  await page.getByRole('link', { name: 'termos de uso e o aviso de privacidade' }).click();
  await expect(page.getByRole('heading', { name: 'Termos de uso e privacidade' })).toBeVisible();
  await page.getByRole('link', { name: 'Início' }).click();
  await expect(page.getByRole('button', { name: 'Entendi, vamos começar' })).toBeVisible();
});

test('"Como ler o seu treino" vem aberto antes do 1º treino', async ({ page }) => {
  await ana(page);
  const comoLer = page.locator('details.como-ler');
  await expect(comoLer).toHaveAttribute('open', '');
  await expect(comoLer.getByText('Série', { exact: true })).toBeVisible();
  await expect(comoLer.getByText('RIR', { exact: true })).toBeVisible();
  // A Ana é iniciante: a linha da fase de aprendizado aparece.
  await expect(comoLer.getByText('As primeiras semanas')).toBeVisible();
});

test.describe('iPhone no Safari, sem instalar', () => {
  test.use({
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  });

  test('o aviso de instalar aparece até o "Entendi" e não volta', async ({ page }) => {
    await page.goto('/');
    const aviso = page.getByRole('region', { name: 'Instale o app para não perder seus dados' });
    await expect(aviso).toBeVisible();
    await expect(aviso).toContainText('Adicionar à Tela de Início');
    await conferir(page);
    await aviso.getByRole('button', { name: 'Entendi' }).click();
    await expect(aviso).toBeHidden();
    await page.reload();
    await expect(page.getByRole('button', { name: 'Entendi, vamos começar' })).toBeVisible();
    await expect(aviso).toBeHidden();
  });
});

test('no Android o aviso de instalar no iPhone não aparece', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Entendi, vamos começar' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Instale o app para não perder seus dados' })).toHaveCount(0);
});

import { expect, test } from '@playwright/test';
import { ana, terminarTreino } from './jornada';

// A gravação no IndexedDB é assíncrona. Antes, quem saía da página logo depois do toque (recarregar, fechar a aba)
// perdia a última mudança: o "sim" da triagem refeita não pausava o programa.

test('o "sim" da triagem refeita fica guardado mesmo se a página recarrega no mesmo instante do toque', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/triagem');
  await page.getByRole('button', { name: 'Sim, alguma (ou não tenho certeza)' }).click();
  await page.locator('label.opcao', { hasText: 'coração' }).first().getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  const confirma = page.getByRole('dialog', { name: 'Nenhuma destas vale para você?' }).getByRole('button', { name: 'Isso, nenhuma destas' });
  await expect(confirma).toBeVisible();
  // o toque e a saída da página na mesma tarefa: a gravação assíncrona não tem tempo de terminar
  await confirma.evaluate((b: HTMLButtonElement) => {
    b.click();
    window.location.assign('/programa');
  });
  await expect(page.getByRole('heading', { name: 'Programa pausado' })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toHaveCount(0);
});

// Auditoria de 12/11/2026: quando o aparelho recusava a gravação (sem espaço, aba anônima), "Série N salva" seguia
// aparecendo e o erro só era mostrado na boas-vindas e em Meus dados.
test('o erro ao salvar aparece no treino, no resumo e no programa, com o botão de exportar', async ({ page }) => {
  await page.addInitScript(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (this: IDBObjectStore, ...a: Parameters<IDBObjectStore['put']>) {
      if (localStorage.getItem('teste:sem-gravar')) throw new DOMException('sem espaço', 'QuotaExceededError');
      return put.apply(this, a);
    };
  });
  await ana(page);
  await page.evaluate(() => localStorage.setItem('teste:sem-gravar', '1'));
  await page.getByRole('tab', { name: 'Corpo todo A', exact: true }).click();
  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await expect(page).toHaveURL(/\/treino$/);

  const erro = page.getByRole('alert').filter({ hasText: 'Não foi possível salvar neste aparelho' });
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await expect(erro).toBeVisible();
  // a barra de "Desfazer" não diz que salvou
  await expect(page.getByRole('status').filter({ hasText: 'Série 1 anotada, mas não salva' })).toBeVisible();
  await expect(page.getByRole('status').filter({ hasText: 'Série 1 salva' })).toHaveCount(0);
  // o caminho para não perder: exportar ali mesmo, com a série recém-feita dentro
  const [copia] = await Promise.all([page.waitForEvent('download'), erro.getByRole('button', { name: 'Exportar meus dados' }).click()]);
  expect(Buffer.concat(await (await copia.createReadStream()).toArray()).toString('utf8')).toContain('"reps"');

  await page.getByRole('button', { name: 'Pular' }).click();
  await terminarTreino(page);
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await expect(erro).toBeVisible();

  // ao reabrir, o que ficou no diário volta, e o aviso continua enquanto o aparelho recusar
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Seu treino' })).toBeVisible();
  await expect(erro).toBeVisible();
});

import { expect, test, type Page } from '@playwright/test';

// Dado guardado que o app não consegue ler (formato inválido): o app abre vazio e avisa. Antes, o primeiro toque que
// salvava algo trocava o dado antigo pelo estado vazio, e o histórico sumia. Agora o dado antigo é guardado à parte
// antes do primeiro salvar, e "Meus dados" deixa exportá-lo.
const ILEGIVEL = { versao: 7, historico: 'isto não é uma lista', marca: 'dado-antigo' };

async function guardado(page: Page, chave: string): Promise<unknown> {
  return page.evaluate(async (k) => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onupgradeneeded = () => r.result.createObjectStore('keyval');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    return new Promise<unknown>((ok) => {
      const r = db.transaction('keyval').objectStore('keyval').get(k);
      r.onsuccess = () => ok(r.result);
    });
  }, chave);
}

test('dado ilegível não é apagado pelo primeiro salvar: fica guardado à parte e pode ser exportado', async ({ page }) => {
  await page.goto('/termos');
  await page.evaluate(async (e) => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onupgradeneeded = () => r.result.createObjectStore('keyval');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    await new Promise<void>((ok) => {
      const r = db.transaction('keyval', 'readwrite').objectStore('keyval').put(e, 'estado');
      r.onsuccess = () => ok();
    });
  }, ILEGIVEL);

  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText('Meus dados');
  // antes de qualquer toque, o dado antigo segue na chave principal e já pode ser exportado
  await page.goto('/dados');
  const exportar = page.getByRole('button', { name: 'Exportar os dados que não foram lidos' });
  await expect(exportar).toBeVisible();
  const [antes] = await Promise.all([page.waitForEvent('download'), exportar.click()]);
  expect(Buffer.concat(await (await antes.createReadStream()).toArray()).toString('utf8')).toContain('dado-antigo');

  // o primeiro salvar (aceitar o aviso e começar) guarda o dado antigo à parte antes de gravar o estado novo
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page).toHaveURL(/\/comecar\/triagem/);
  await expect.poll(() => guardado(page, 'estado-ilegivel')).toMatchObject({ marca: 'dado-antigo' });
  await expect.poll(async () => ((await guardado(page, 'estado')) as { avisoAceitoEm?: string } | undefined)?.avisoAceitoEm).toBeTruthy();

  // e continua exportável em Meus dados
  await page.goto('/dados');
  const [depois] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar os dados que não foram lidos' }).click()]);
  expect(Buffer.concat(await (await depois.createReadStream()).toArray()).toString('utf8')).toContain('dado-antigo');
});

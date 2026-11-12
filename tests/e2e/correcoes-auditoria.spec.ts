import { expect, test, type Page } from '@playwright/test';
import { ana, proximoExercicio, triagem, verAvisos } from './jornada';

// Três correções da auditoria de 12/11/2026, cada uma com o caso que falhava.

async function comecar(page: Page, dia = 'Corpo todo A') {
  await page.getByRole('tab', { name: dia, exact: true }).click();
  await page.getByRole('button', { name: `Começar o treino ${dia}` }).click();
  await expect(page).toHaveURL(/\/treino$/);
}

type Guardado = { rotina?: Record<string, unknown> } & Record<string, unknown>;

/** Lê ou regrava o estado guardado no aparelho (IndexedDB), para montar um caso que o cadastro não alcança num toque. */
async function estadoGuardado(page: Page, mudar?: Record<string, unknown>): Promise<Guardado> {
  return page.evaluate(async (m) => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    const loja = (modo: IDBTransactionMode) => db.transaction('keyval', modo).objectStore('keyval');
    const atual = await new Promise<Guardado>((ok) => {
      const r = loja('readonly').get('estado');
      r.onsuccess = () => ok(r.result);
    });
    if (!m) return atual;
    const novo = { ...atual, rotina: { ...atual.rotina, ...m } };
    await new Promise<void>((ok) => {
      const r = loja('readwrite').put(novo, 'estado');
      r.onsuccess = () => ok();
    });
    return novo;
  }, mudar);
}

// Segurança: antes, o treino reabria no 1º exercício incompleto, e a nota de dor dada depois do guia interrompia o errado.
test('"Senti algo" tocado no guia volta ao exercício que estava aberto, não ao primeiro incompleto', async ({ page }) => {
  await ana(page);
  await comecar(page);
  const titulo = page.getByRole('heading', { level: 1 });
  const primeiro = (await titulo.innerText()).trim();
  // anda até um exercício com guia animado que não seja o primeiro
  let aberto = primeiro;
  for (let i = 0; i < 6; i++) {
    await proximoExercicio(page);
    await expect(titulo).not.toHaveText(aberto);
    aberto = (await titulo.innerText()).trim();
    if (await page.getByRole('link', { name: 'Ver como fazer' }).isVisible()) break;
  }
  expect(aberto).not.toBe(primeiro);
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/.+de=treino/);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await expect(page.getByRole('dialog', { name: 'O que você sentiu?' })).toBeVisible();
  await expect(titulo).toHaveText(aberto);
});

// Segurança: antes, as respostas antigas (sem "sim") continuavam salvas, e bastava sair da tela para o programa seguir.
test('refazer a triagem com um "sim" que bloqueia pausa o programa, mesmo saindo da tela sem confirmar', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/triagem');
  await triagem(page, { simEm: ['coração'] });
  await expect(page.getByRole('heading', { name: 'Vamos pausar o programa automático' })).toBeVisible();
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Programa pausado' })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toHaveCount(0);
});

// Antes, escolher um ajuste regravava a rotina sem o objetivo, e o programa voltava a "ganhar músculo" sem avisar.
test('escolher um ajuste do programa mantém o objetivo da pessoa', async ({ page }) => {
  await ana(page, { minutos: '40' });
  await estadoGuardado(page, { objetivo: 'forca' });
  await page.reload();
  const avisos = await verAvisos(page);
  await avisos.getByRole('region', { name: 'Ajustes possíveis' }).getByRole('button', { name: /^4 treinos de 40 min/ }).click();
  await expect(page.getByRole('status')).toContainText('4 treinos de 40 min');
  await expect.poll(async () => (await estadoGuardado(page)).rotina).toMatchObject({ diasSemana: 4, objetivo: 'forca' });
});

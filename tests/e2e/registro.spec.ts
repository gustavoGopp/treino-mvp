import { expect, test, type Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import type { Estado } from '../../src/storage/esquema';
import { ana, maisOpcoes } from './jornada';

// R5a, o registro que não engana (seguranca.dor.escala; registro.treino-feito), nas 6 personas fictícias. O estado de
// cada uma é gravado direto no aparelho (IndexedDB), com o cadastro feito e o programa do gerador, sem histórico
// (apoio/estados-personas.ts, rodado pelo vite-node: o Playwright não lê o JSON da biblioteca).
const NOMES = ['bruno', 'ana', 'diego', 'carla', 'elisa', 'fabio'] as const;
let ESTADOS: Record<string, Estado>;
test.beforeAll(() => {
  ESTADOS ??= JSON.parse(execFileSync('npx', ['vite-node', 'tests/e2e/apoio/estados-personas.ts'], { encoding: 'utf8' }));
});
const estadoDaPersona = (nome: string) => ESTADOS[nome]!;

async function semear(page: Page, estado: Estado) {
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
  }, estado);
  await page.goto('/programa');
}

/** O nome do 1º dia, pelo botão "Começar o treino …" (o próximo da rotação vem selecionado). */
async function comecar(page: Page): Promise<string> {
  const botao = page.getByRole('button', { name: /^Começar o treino / });
  await expect(botao).toBeVisible();
  const dia = (await botao.innerText()).replace(/^Começar o treino\s*/, '').trim();
  await botao.click();
  await expect(page).toHaveURL(/\/treino$/);
  return dia;
}

/** Registra 1 série do exercício aberto, com a carga que vier (ou a 7ª da lista, ou um degrau), RIR 2. */
async function umaSerie(page: Page) {
  const registro = page.getByRole('region', { name: /^Série \d/ });
  await expect(registro).toBeVisible();
  const carga = page.getByLabel('Carga', { exact: true });
  if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT')) && !(await carga.inputValue())) await carga.selectOption({ index: 1 });
  if ((await page.getByRole('button', { name: 'Mais carga' }).count()) && (await page.locator('output.carga-valor').first().innerText()) === '—')
    await page.getByRole('button', { name: 'Mais carga' }).click();
  const rir = registro.getByRole('radio', { name: '2', exact: true });
  if (!(await rir.isChecked())) await rir.check();
  await registro.getByRole('button', { name: /^Série feita/ }).click();
  const pular = page.getByRole('button', { name: 'Pular' });
  if (await pular.isVisible()) await pular.click();
}

for (const nome of NOMES) {
  test.describe(`${nome}: o registro que não engana`, () => {
    test('a nota de dor 4 fica na série guardada e reduz a carga da próxima vez', async ({ page }) => {
      await semear(page, estadoDaPersona(nome));
      await comecar(page);
      await umaSerie(page);
      await page.getByRole('button', { name: 'Senti algo' }).click();
      await page.getByRole('region', { name: 'Senti algo' }).getByRole('button', { name: '4', exact: true }).click();
      await expect(page.getByRole('alert')).toContainText('Nota 4 guardada na série 1.');
      await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('dor 4');
      // A nota sobrevive a fechar o app (está no treino salvo, não só na tela).
      await page.reload();
      await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('dor 4');
      await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
      await page.getByRole('dialog', { name: 'Terminar o treino agora?' }).getByRole('button', { name: 'Terminar o treino', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
      // "Para a próxima vez": o exercício com dor vem com "Ajustar" (dor de 3 a 5: reduzir), pela regra de dor.
      const linha = page.locator('.resumo-ex').first();
      await expect(linha).toContainText('Ajustar');
      await linha.getByRole('button', { name: 'por quê?' }).click();
      await expect(page.getByRole('dialog')).toContainText('Dor entre 3 e 5/10: reduza a carga');
      await expect(page.getByRole('dialog')).toContainText('Hoje:');
    });

    test('"Começar" e "Terminar" sem série mantém o mesmo dia e oferece descartar', async ({ page }) => {
      await semear(page, estadoDaPersona(nome));
      const dia = await comecar(page);
      await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
      const confirma = page.getByRole('dialog', { name: 'Terminar o treino agora?' });
      await expect(confirma).toContainText('Você não registrou nenhuma série.');
      await confirma.getByRole('button', { name: 'Descartar este treino' }).click();
      await expect(page).toHaveURL(/\/programa$/);
      await expect(page.getByRole('button', { name: `Começar o treino ${dia}` })).toBeVisible();
      // "Guardar mesmo assim": fica no histórico, mas não conta, e o dia continua o mesmo.
      await comecar(page);
      await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
      await page.getByRole('dialog', { name: 'Terminar o treino agora?' }).getByRole('button', { name: 'Guardar mesmo assim' }).click();
      await page.getByRole('link', { name: 'Voltar ao início' }).click();
      await expect(page.getByRole('button', { name: `Começar o treino ${dia}` })).toBeVisible();
    });
  });
}

test('apagar o último treino, com confirmação, volta a rotação ao dia dele', async ({ page }) => {
  await semear(page, estadoDaPersona('ana'));
  const dia = await comecar(page);
  await umaSerie(page);
  await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
  await page.getByRole('dialog', { name: 'Terminar o treino agora?' }).getByRole('button', { name: 'Terminar o treino', exact: true }).click();
  await page.getByRole('button', { name: 'Registrei algo errado: apagar este treino' }).click();
  await expect(page.getByRole('alert')).toContainText(`o próximo treino volta a ser ${dia}`);
  await page.getByRole('button', { name: 'Apagar', exact: true }).click();
  await expect(page).toHaveURL(/\/programa$/);
  await expect(page.getByRole('button', { name: `Começar o treino ${dia}` })).toBeVisible();
});

// R5a, a checagem lateral (proximos-passos.md, 2.6): a faixa "Há uma versão nova do seu programa" que a frente C e o
// redesign viram no Bruno e na Carla vinha do estado semeado sem passar pelo esquema do app (a ordem das chaves do
// inventário muda o `entradasHash`). Com o inventário lido pelo esquema, ela não aparece; e quem faz o cadastro pela tela
// também não a vê, nem depois de recarregar (o app relê tudo pelo esquema).
for (const nome of NOMES)
  test(`${nome}: o estado semeado pelo esquema do app não mostra "versão nova"`, async ({ page }) => {
    await semear(page, estadoDaPersona(nome));
    await expect(page.getByRole('button', { name: /^Começar o treino / })).toBeVisible();
    await expect(page.getByText('Há uma versão nova do seu programa.')).toHaveCount(0);
  });

test('o cadastro pela tela não mostra "versão nova", nem depois de recarregar', async ({ page }) => {
  await ana(page);
  await expect(page.getByText('Há uma versão nova do seu programa.')).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await expect(page.getByText('Há uma versão nova do seu programa.')).toHaveCount(0);
});


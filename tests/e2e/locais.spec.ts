import { expect, test, type Page } from '@playwright/test';
import { ana } from './jornada';

// R1b: vários locais. A Ana (persona fictícia) cadastra a "Academia" como 2º local, escolhe onde treina hoje,
// vê a troca com o motivo e registra a 1ª série no aparelho novo, com a calibração da carga.
// Com PRINTS=1, guarda as imagens do devlog e da página de diagnóstico em reports/ (pasta fora do git).

const print = async (page: Page, nome: string) => {
  if (process.env.PRINTS) await page.screenshot({ path: `reports/r1b-${nome}.png`, fullPage: false });
};

test('cadastra o 2º local, escolhe onde treinar hoje, vê a troca explicada e calibra a carga no aparelho novo', async ({ page }) => {
  await ana(page);

  // 1. Meus locais: o 1º local tem o nome neutro.
  await page.getByRole('link', { name: 'Treina em mais de um lugar? Cadastre outro local' }).click();
  await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Locais' })).toContainText('Meu local');
  await page.getByRole('link', { name: 'Cadastrar outro local' }).click();

  // 2. O 2º local: nome por toque e a mesma tela de equipamento (atalhos e foto incluídos).
  await expect(page.getByRole('heading', { name: 'Novo local' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Atalho: onde você treina?' })).toBeVisible();
  await page.getByRole('button', { name: 'Salvar local' }).click();
  await expect(page.getByText(/Dê um nome ao local/)).toBeVisible();
  await page.getByRole('button', { name: 'Academia', exact: true }).click();
  for (const item of ['Leg press', 'Cadeira flexora', 'Barra fixa', 'Banco reto']) await page.getByLabel(item, { exact: true }).check();
  await page.getByRole('button', { name: 'Salvar local' }).click();
  await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Locais' })).toContainText('Academia');

  // 3. Onde vou treinar hoje: um toque; a prévia mostra cada troca com o motivo.
  await page.getByRole('link', { name: 'Meu programa' }).click();
  const onde = page.getByRole('group', { name: 'Onde vou treinar hoje?' });
  await expect(onde.getByRole('button', { name: 'Meu local' })).toHaveAttribute('aria-pressed', 'true');
  await onde.getByRole('button', { name: 'Academia' }).click();
  await expect(onde.getByRole('button', { name: 'Academia' })).toHaveAttribute('aria-pressed', 'true');
  const trocas = page.getByRole('list', { name: 'Trocas em Academia' });
  await expect(trocas).toContainText('Aqui não tem halteres: agachamento búlgaro com apoio → leg press.');
  await onde.scrollIntoViewIfNeeded();
  await print(page, 'escolha-do-local');

  // 4. No treino: a troca com o motivo e a calibração na 1ª série.
  await page.getByRole('button', { name: 'Começar o treino Corpo todo A em Academia' }).click();
  await expect(page.getByRole('heading', { name: 'Leg press' })).toBeVisible();
  await expect(page.getByText('Aqui não tem halteres: agachamento búlgaro com apoio → leg press.')).toBeVisible();
  await expect(page.getByText(/Calibração da carga/)).toBeVisible();
  await print(page, 'troca-explicada');

  const mais = page.getByRole('button', { name: 'Mais anilha de cada lado' });
  for (let n = 0; n < 4; n++) await mais.click();
  await expect(page.getByRole('group', { name: 'Anilhas por lado' })).toContainText('8 kg');
  for (let n = 0; n < 12; n++) await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '4 ou mais' }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Pular' }).click();

  // 8 kg por lado × 20 com 4+ de reserva, na faixa 8–15 com RIR 3–4: leve demais → 2 passos do menor par (2 kg).
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('8 kg por lado × 20 · RIR 4+ · acerto da carga');
  await expect(page.getByText('Calibração: Ficou leve: na próxima série, 12 kg por lado.')).toBeVisible();
  await expect(page.getByRole('group', { name: 'Anilhas por lado' })).toContainText('12 kg');
  await print(page, 'calibracao');

  // 5. O local fica lembrado para a próxima vez, e a escolha continua visível.
  await page.getByRole('button', { name: 'Terminar treino' }).first().click();
  await page.getByRole('link', { name: 'Voltar ao programa' }).click();
  await expect(page.getByRole('group', { name: 'Onde vou treinar hoje?' }).getByRole('button', { name: 'Academia' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('group', { name: 'Onde vou treinar hoje?' }).getByRole('button', { name: 'Meu local' })).toBeVisible();
});

test('"prefiro este" nas alternativas: um toque marca, outro desfaz, e o programa oferece a versão nova', async ({ page }) => {
  await ana(page);
  const cartao = page.locator('.cartao-ex').filter({ hasText: 'Agachamento búlgaro com apoio' });
  await cartao.getByText('Detalhes').click();
  const prefiro = cartao.getByRole('button', { name: /^Prefiro / }).nth(1);
  const nome = (await prefiro.innerText()).replace(/^Prefiro /, '');
  await prefiro.click();
  await expect(cartao.getByRole('button', { name: `Você prefere ${nome} · desfazer` })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Há uma versão nova do seu programa.')).toBeVisible();
  await cartao.getByRole('button', { name: `Você prefere ${nome} · desfazer` }).click();
  await expect(cartao.getByRole('button', { name: `Prefiro ${nome}` })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByText('Há uma versão nova do seu programa.')).toHaveCount(0);
});

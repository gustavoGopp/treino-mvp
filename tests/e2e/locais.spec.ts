import { expect, test, type Page } from './base';
import { abrirExercicio, ana, marcarItem, terminarTreino } from './jornada';

// R1b: vários locais. A Ana (persona fictícia) cadastra a "Academia" como 2º local, escolhe onde treina hoje,
// vê a troca com o motivo e registra a 1ª série no aparelho novo, com a calibração da carga.
// Com PRINTS=1, guarda as imagens do devlog e da página de diagnóstico em reports/ (pasta fora do git).

const print = async (page: Page, nome: string) => {
  if (process.env.PRINTS) await page.screenshot({ path: `reports/r1b-${nome}.png`, fullPage: false });
};

test('cadastra o 2º local, escolhe onde treinar hoje, vê a troca explicada e calibra a carga no aparelho novo', async ({ page }) => {
  await ana(page);

  // 1. Meus locais: o 1º local tem o nome neutro.
  // lote 4 do redesign: o convite saiu do início; os locais ficam em Meus dados.
  await page.getByRole('navigation', { name: 'Seções' }).getByRole('link', { name: 'Meus dados' }).click();
  await page.getByRole('link', { name: 'Meus locais' }).click();
  await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Locais' })).toContainText('Meu local');
  await page.getByRole('link', { name: 'Novo local' }).click();

  // 2. O 2º local: nome por toque e a mesma tela de equipamento (atalhos e foto incluídos).
  await expect(page.getByRole('heading', { name: 'Novo local' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Onde você treina?' })).toBeVisible();
  await page.getByRole('button', { name: 'Salvar local' }).click();
  await expect(page.getByText(/Dê um nome ao local/)).toBeVisible();
  await page.getByRole('button', { name: 'Academia', exact: true }).click();
  for (const item of ['Leg press', 'Cadeira flexora', 'Barra fixa', 'Banco reto']) await marcarItem(page, item);
  await page.getByRole('button', { name: 'Salvar local' }).click();
  await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Locais' })).toContainText('Academia');

  // 3. Onde vou treinar hoje: um toque; a prévia mostra cada troca com o motivo.
  // lote 5 do redesign: Locais tem a barra de baixo, com Meus dados aceso, e o voltar "Meus dados" no alto
  const nav = page.getByRole('navigation', { name: 'Seções' });
  await expect(nav.getByRole('link', { name: 'Meus dados' })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('header.top').getByRole('link', { name: 'Meus dados', exact: true })).toBeVisible();
  await nav.getByRole('link', { name: 'Treino' }).click();
  const onde = page.getByRole('group', { name: 'Onde vou treinar hoje?' });
  await expect(onde.getByRole('button', { name: 'Meu local' })).toHaveAttribute('aria-pressed', 'true');
  await onde.getByRole('button', { name: 'Academia' }).click();
  await expect(onde.getByRole('button', { name: 'Academia' })).toHaveAttribute('aria-pressed', 'true');
  // Pacote 2 (15/11/2026): o exercício de agachar da Ana é o goblet (antes, o búlgaro); na Academia, sem halteres, ele
  // vira o leg press, com o mesmo motivo.
  // sessão de textos (16/11/2026): a lista das trocas fica a um toque (a lista do dia, logo abaixo, já mostra os exercícios)
  await expect(onde).toContainText('Em Academia: o treino muda.');
  await onde.locator('summary', { hasText: /^\d+ trocas?$/ }).click();
  const trocas = page.getByRole('list', { name: 'Trocas em Academia' });
  await expect(trocas).toContainText('Aqui não tem halteres: agachamento goblet com calcanhar elevado → leg press.');
  await onde.scrollIntoViewIfNeeded();
  await print(page, 'escolha-do-local');

  // 4. No treino: a troca com o motivo e a calibração na 1ª série.
  await page.getByRole('button', { name: 'Começar o treino Corpo todo A em Academia' }).click();
  await expect(page.getByRole('heading', { name: 'Leg press' })).toBeVisible();
  await expect(page.getByText('Aqui não tem halteres: agachamento goblet com calcanhar elevado → leg press.')).toBeVisible();
  await expect(page.getByText('1ª vez: comece leve.')).toBeVisible();
  // sessão de textos (16/11/2026): o motivo da 1ª vez não fica mais a um toque na tela do treino (está em "Entenda o
  // treino"); a regra da calibração num aparelho novo continua conferida em tests/unit/calibracao.test.ts
  await print(page, 'troca-explicada');

  // 22/11/2026: a tela mostra o total das anilhas (os dois lados); cada toque põe um par da menor anilha (2 + 2 kg)
  const mais = page.getByRole('button', { name: 'Mais um par de anilhas' });
  for (let n = 0; n < 4; n++) await mais.click();
  await expect(page.getByRole('group', { name: 'Anilhas (total)' })).toContainText('16 kg');
  for (let n = 0; n < 12; n++) await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '4 ou mais' }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Pular' }).click();

  // 16 kg de anilhas (8 por lado) × 20 com 4+ de reserva, na faixa 8–15 com RIR 3–4: leve demais → 2 passos do menor par (2 kg).
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('16 kg de anilhas × 20 · sobrando 4+ · acertando o peso');
  await expect(page.getByText('Ficou leve: na próxima série, 24 kg de anilhas.')).toBeVisible();
  await expect(page.getByRole('group', { name: 'Anilhas (total)' })).toContainText('24 kg');
  await print(page, 'calibracao');

  // 5. O local fica lembrado para a próxima vez, e a escolha continua visível.
  await terminarTreino(page);
  await page.getByRole('link', { name: 'Voltar ao início' }).click();
  await expect(page.getByRole('group', { name: 'Onde vou treinar hoje?' }).getByRole('button', { name: 'Academia' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('group', { name: 'Onde vou treinar hoje?' }).getByRole('button', { name: 'Meu local' })).toBeVisible();
});

test('"prefiro este" nas alternativas: um toque marca, outro desfaz, e o programa oferece a versão nova', async ({ page }) => {
  await ana(page);
  // O 1º exercício do Corpo todo A: o goblet desde o pacote 2 (15/11/2026); antes, o búlgaro. O 1º botão é o do próprio
  // exercício; o 2º é o de um equivalente (hoje, o agachamento com 2 halteres ao lado do corpo).
  const cartao = await abrirExercicio(page, /Agachamento goblet com calcanhar elevado/);
  const prefiro = cartao.getByRole('button', { name: /^Prefiro / }).nth(1);
  const nome = (await prefiro.innerText()).replace(/^Prefiro /, '');
  await prefiro.click();
  await expect(cartao.getByRole('button', { name: `Você prefere ${nome} · desfazer` })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Versão nova do programa.')).toBeVisible();
  await cartao.getByRole('button', { name: `Você prefere ${nome} · desfazer` }).click();
  await expect(cartao.getByRole('button', { name: `Prefiro ${nome}` })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByText('Versão nova do programa.')).toHaveCount(0);
});

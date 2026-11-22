import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from './base';
import { semContrasteBaixo } from './contraste';
import { ana, entenda, folhaPronta } from './jornada';
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
  await expect(page.getByText(/^Versão /)).toBeVisible();
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
  // estudo dos textos (13/11/2026): o aviso é uma linha com a ação; a explicação inteira fica no "por quê?"
  if (!persistente) {
    const aviso = page.getByRole('note').filter({ hasText: 'Este navegador pode apagar seus dados.' });
    await expect(aviso).toContainText('Guarde uma cópia.');
    await aviso.getByRole('button', { name: 'por quê?' }).click();
    const porque = page.getByRole('dialog', { name: 'O navegador e os seus dados' });
    await expect(porque).toContainText('Este navegador não garantiu guardar seus dados de forma permanente:');
    await page.keyboard.press('Escape');
    await expect(porque).toBeHidden();
  }
  // redesign, lote 5: a cópia abre numa folha a partir da linha "Guardar uma cópia"
  await page.getByRole('button', { name: /^Guardar uma cópia/ }).click();
  await folhaPronta(page);
  await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  await expect(page.getByText('Última cópia: hoje')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Última cópia: hoje')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Avisar um problema' })).toBeVisible();
  await conferir(page);

  await page.getByRole('link', { name: 'Termos de uso e privacidade' }).click();
  await expect(page.getByRole('heading', { name: 'Termos de uso e privacidade' })).toBeVisible();
  await expect(page.getByText(/^Versão 1, de 07\/11\/2026\.$/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A foto do equipamento' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Seus direitos' })).toBeVisible();
  for (const tema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: tema });
    await conferir(page);
  }
});

test('boas-vindas: o texto da foto diz para onde ela vai e há link para os termos', async ({ page }) => {
  await page.goto('/');
  // redesign, lote 3: a privacidade abre numa folha a partir da linha "Seus dados ficam só neste celular"
  await page.getByRole('button', { name: /Seus dados ficam só neste celular/ }).click();
  await expect(page.getByText(/vai reduzida e sem a localização para a Anthropic, empresa dos EUA/)).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'termos de uso e o aviso de privacidade' }).click();
  await expect(page.getByRole('heading', { name: 'Termos de uso e privacidade' })).toBeVisible();
  await page.getByRole('link', { name: 'Início' }).click();
  await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeVisible();
});

// Estudo dos textos (13/11/2026, decisão do Gustavo): o vocabulário fica fechado, a um toque (antes abria sozinho até o
// 1º treino). O que o teste confere continua: antes do 1º treino, as definições estão ali, com a linha da iniciante.
// Sessão de textos (16/11/2026, decisão do Gustavo): "Como ler o seu treino" saiu do início e está em "Entenda o treino".
// Lote M1 da análise crítica (19/11/2026): a abertura diz o que a pessoa recebe e mostra o Boneco em movimento, sem tirar
// do lugar o aviso de segurança. Antes do lote, o aviso ficava inteiro acima do "Começar" em todos estes tamanhos.
test('boas-vindas: diz o que a pessoa recebe e mostra o Boneco em movimento', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Treine onde estiver, com o que tiver' })).toBeVisible();
  await expect(page.getByText('Um programa de musculação para o seu equipamento, com um boneco que mostra cada movimento.')).toBeVisible();
  const boneco = page.getByRole('img', { name: 'O Boneco do app fazendo um agachamento' });
  await expect.poll(() => boneco.evaluate((e) => e.childElementCount)).toBeGreaterThan(0);
  // em movimento: o desenho muda sozinho; e sem as legendas miúdas do guia
  const quadro = await boneco.innerHTML();
  await expect.poll(() => boneco.innerHTML()).not.toBe(quadro);
  await expect(boneco.locator('.n-rot-t').first()).toBeHidden();
  for (const tema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: tema });
    await conferir(page);
  }
});

test('boas-vindas com movimento reduzido: o Boneco aparece parado', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const boneco = page.getByRole('img', { name: 'O Boneco do app fazendo um agachamento' });
  await expect.poll(() => boneco.evaluate((e) => e.childElementCount)).toBeGreaterThan(0);
  const quadro = await boneco.innerHTML();
  await page.evaluate(() => new Promise((ok) => setTimeout(ok, 700)));
  expect(await boneco.innerHTML()).toBe(quadro);
});

for (const [largura, altura] of [[320, 568], [360, 640], [375, 667], [390, 664], [360, 740], [412, 839]] as const)
  test(`boas-vindas a ${largura} × ${altura}: o aviso de segurança fica inteiro à vista, acima do "Começar", sem rolar`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: altura });
    await page.goto('/');
    const aviso = page.getByRole('region', { name: 'O app orienta, não diagnostica' });
    await expect(aviso).toContainText('Sentiu dor, tontura ou mal-estar? Pare e procure avaliação.');
    await expect(aviso).toBeInViewport({ ratio: 1 });
    const [fimDoAviso, topoDaAcao] = await page.evaluate(() => [document.querySelector('.nota-aviso')!.getBoundingClientRect().bottom, document.querySelector('.acao-boas')!.getBoundingClientRect().top]);
    expect(fimDoAviso).toBeLessThanOrEqual(topoDaAcao);
    // a frase do que a pessoa recebe também está à vista, e nada passa para o lado
    await expect(page.locator('.boas .lede')).toBeInViewport({ ratio: 1 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

test('as definições do treino ficam em "Entenda o treino", fora do início', async ({ page }) => {
  await ana(page);
  await expect(page.getByText('Como ler o seu treino')).toHaveCount(0);
  const comoLer = await entenda(page, 'Como ler o treino');
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
    await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeVisible();
    await expect(aviso).toBeHidden();
  });
});

test('no Android o aviso de instalar no iPhone não aparece', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Instale o app para não perder seus dados' })).toHaveCount(0);
});

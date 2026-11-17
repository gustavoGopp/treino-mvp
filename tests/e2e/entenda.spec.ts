import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { ana, entenda, porQueDaSugestao, sobreOPrograma } from './jornada';

// Sessão de textos (16/11/2026, decisão do Gustavo: "quero bem menos que isso"). A explicação saiu das telas: o selo
// de evidência e o "por quê?" só aparecem em "Entenda o treino" (Meus dados), que reúne o porquê de cada coisa, o nível
// de evidência e as fontes. O princípio da evidência (CLAUDE.md) passa a ser conferido aqui: nenhuma regra do app fica
// sem estar alcançável nesta página, com o nível e as fontes.
test('chega-se a "Entenda o treino" por Meus dados, e os blocos vêm fechados', async ({ page }) => {
  await ana(page);
  await page.goto('/dados');
  await page.getByRole('link', { name: /^Entenda o treino/ }).click();
  await expect(page).toHaveURL(/\/entenda$/);
  await expect(page.getByRole('heading', { name: 'Entenda o treino' })).toBeVisible();
  const blocos = page.locator('main > details');
  await expect(blocos.locator(':scope > summary')).toHaveText(['Como ler o treino', 'O seu programa', 'Os exercícios: por que cada um e a próxima carga', 'A sua semana e as pausas', 'Por que o app pergunta e sugere', 'Segurança', 'Todas as regras e as fontes']);
  for (const b of await blocos.all()) await expect(b).not.toHaveAttribute('open', '');
  // o voltar leva a Meus dados
  await page.locator('header.top').getByRole('link', { name: 'Meus dados' }).click();
  await expect(page).toHaveURL(/\/dados$/);
});

test('todas as regras do app estão na página, cada uma com o texto, o nível de evidência e as fontes', async ({ page }) => {
  const noArquivo = JSON.parse(readFileSync('src/domain/regras/regras.json', 'utf8')) as { id: string; fontes: string[] }[];
  const frases = JSON.parse(readFileSync('src/conteudo/frases-das-regras.json', 'utf8')) as Record<string, { titulo: string; frase: string }>;
  await ana(page);
  const bloco = await entenda(page, 'Todas as regras e as fontes');
  const regras = bloco.locator('.regra-do-catalogo');
  await expect(regras.first()).toBeVisible();
  // as mesmas regras de src/domain/regras/regras.json, nenhuma a menos e nenhuma repetida
  const ids = await regras.evaluateAll((els) => els.map((e) => e.getAttribute('data-regra') ?? ''));
  expect([...ids].sort()).toEqual(noArquivo.map((r) => r.id).sort());
  // cada regra abre com o texto e o significado do nível
  for (const i of [0, 40, 80, 120, ids.length - 1]) {
    const r = regras.nth(i);
    await r.locator(':scope > summary').click();
    // o título e o texto são os de linguagem simples (src/conteudo/frases-das-regras.json), sem o jargão de quem desenvolve
    const frase = frases[ids[i]!]!;
    await expect(r.locator(':scope > summary')).toHaveText(frase.titulo);
    await expect(r.locator('.regra')).toHaveText(frase.frase);
    await expect(r.locator('.sentido')).toContainText(/(Evidência (robusta|moderada)|Um estudo|Consenso de especialistas)\./);
  }
  // nenhuma das 163 mostra sigla de etapa, nome de arquivo ou data de decisão (as fontes, que têm datas, ficam fora da conta)
  await expect(regras.locator('.regra')).toHaveCount(ids.length);
  const textos = await regras.locator(':scope > summary, .regra').evaluateAll((els) => els.map((e) => e.textContent ?? ''));
  expect(textos.filter((t) => /\bR\d[a-z]?\b|pesquisa-v2|\d{2}\/\d{2}\/\d{4}|`/.test(t))).toEqual([]);
  // e, quando a regra tem fontes, elas vêm por extenso, com o link
  const comFontes = noArquivo.find((r) => r.fontes.length > 0)!;
  const r = bloco.locator(`.regra-do-catalogo[data-regra="${comFontes.id}"]`);
  await r.locator(':scope > summary').click();
  await expect(r.locator('ol li')).toHaveCount(comFontes.fontes.length);
  await expect(r.locator('ol li').first()).toContainText(/\(\d{4}[a-z]?\)|s\.d\./);
});

test('o que saiu das telas está na página: definições, o programa, cada exercício, o cadastro, o treino e a segurança', async ({ page }) => {
  await ana(page);
  // "Como ler o seu treino" (era do início)
  const ler = await entenda(page, 'Como ler o treino');
  for (const termo of ['Série', 'Repetição', 'Carga', 'Descanso', 'RIR', 'As primeiras semanas']) await expect(ler.getByText(termo, { exact: true })).toBeVisible();
  await expect(ler.locator('.selo').first()).toBeVisible();
  // "Sobre o programa" (era do início): o resumo, a fase, a avaliação, os avisos, as fases, os porquês e a tabela
  const programa = await sobreOPrograma(page);
  await expect(programa.getByRole('list', { name: 'Resumo' })).toContainText('3x por semana');
  await expect(programa.getByText(/^Semana 1\./)).toBeVisible();
  for (const rotulo of [/^Avisos \(\d+\)$/, /^Fases \(\d+\)$/, /^Por que este programa \(\d+\)$/, 'Séries por músculo']) await expect(programa.locator('summary', { hasText: rotulo })).toBeVisible();
  // "Por que este exercício" e o motivo da carga (eram da folha do exercício, do treino e do fim do treino)
  const exercicio = await porQueDaSugestao(page, 'Agachamento búlgaro com apoio');
  await expect(exercicio).toContainText(/1ª vez neste exercício/);
  await expect(exercicio.locator('ul.lista li').first()).toBeVisible();
  await expect(exercicio.locator('.selo').first()).toBeVisible();
  // os "por quê?" do cadastro e do treino
  const porque = await entenda(page, 'Por que o app pergunta e sugere');
  await expect(porque).toContainText('Treinar é seguro para a maioria das pessoas.');
  await expect(porque).toContainText('Com 2 a 6 dias dá para treinar cada músculo cerca de 2 vezes por semana.');
  await expect(porque).toContainText('Os grupos prioritários recebem mais séries');
  await expect(porque).toContainText('A maioria das pessoas acha que tem menos reserva do que tem.');
  expect(await porque.locator('.selo').count()).toBeGreaterThanOrEqual(12);
  // a segurança do guia, por inteiro, e o que o app não faz
  const seguranca = await entenda(page, 'Segurança');
  await expect(seguranca).toContainText('O app não diagnostica e não substitui um médico ou um profissional de Educação Física.');
  await expect(seguranca).toContainText('Dor muscular de treino é esperada: queimação durante a série e dolorimento difuso por 1–3 dias.');
  await expect(seguranca).toContainText('procure avaliação (fisioterapeuta ou médico do esporte) se aparecer dor articular forte ou em pontada, formigamento, perda de força incomum ou sensação de lesão');
  await expect(seguranca).toContainText('As animações usam um modelo simplificado com medidas aproximadas e não substituem uma avaliação presencial.');
});

test('fora de "Entenda o treino", nenhum selo e nenhum "por quê?" nas telas do treino; a segurança e a privacidade seguem a um toque', async ({ page }) => {
  await page.goto('/');
  // a abertura: o aviso de segurança à vista e o texto inteiro a um toque
  await expect(page.getByText('Sentiu dor, tontura ou mal-estar? Pare e procure avaliação.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'o que o app não faz' })).toBeVisible();
  await ana(page);
  const semExplicacao = async (onde: string) => expect(page.locator('#root button.selo, #root button.porque'), onde).toHaveCount(0);
  await semExplicacao('início');
  await page.getByRole('tabpanel').getByRole('button').first().click();
  await expect(page.getByRole('dialog').locator('button.selo, button.porque')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page.getByRole('region', { name: /^Série \d/ })).toBeVisible();
  await semExplicacao('treino');
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await semExplicacao('guia');
  // no guia, os sinais de alerta e a ação ficam à vista
  await expect(page.getByText('Dor forte ou em pontada, formigamento ou perda de força?')).toBeVisible();
  await expect(page.getByText('Pare e procure avaliação.')).toBeVisible();
  await page.goto('/semana');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await semExplicacao('semana');
  // em Meus dados, a privacidade continua a um toque, com a regra e a fonte dentro
  await page.goto('/dados');
  await page.getByRole('button', { name: 'o que sai daqui' }).click();
  await expect(page.getByRole('dialog', { name: 'O que sai deste aparelho' })).toBeVisible();
});

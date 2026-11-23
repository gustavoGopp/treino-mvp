import { expect, test, tocarEmEntendi } from './base';
import { ana, folhaPronta, marcarItem, sobreOPrograma, verAvisos } from './jornada';
import { semToquePequeno } from './toque';

// Pacote D2, "nada se perde no meio do caminho" (22/11/2026): um teste de tela para cada item do aceite
// (docs/prompts/sessao-desenvolvimento-2.md). Persona fictícia Ana.

test('trazer uma cópia: oferece guardar antes os dados de hoje e não age sem arquivo', async ({ page }) => {
  await ana(page);
  await page.goto('/dados');
  await page.getByRole('button', { name: 'Trazer uma cópia' }).click();
  const folha = page.getByRole('dialog', { name: 'Trazer uma cópia' });
  await folhaPronta(page);
  // sem arquivo, o botão que substitui está apagado e diz o que falta
  const substituir = folha.getByRole('button', { name: 'Importar dados' });
  await expect(substituir).toBeDisabled();
  await expect(folha).toContainText('Falta escolher o arquivo.');
  // guardar antes baixa a cópia do que há hoje, e a folha continua aberta
  const [copia] = await Promise.all([page.waitForEvent('download'), folha.getByRole('button', { name: 'Guardar antes os dados de hoje' }).click()]);
  expect(copia.suggestedFilename()).toMatch(/^treino-mvp-\d{4}-\d{2}-\d{2}\.json$/);
  await expect(folha.getByRole('status')).toContainText('Arquivo exportado');
  await expect(folha).toBeVisible();
  await semToquePequeno(page);
});

test('apagar todos os dados: duas saídas, guardar uma cópia antes num botão, e a abertura diz que apagou', async ({ page }) => {
  await ana(page);
  await page.goto('/dados');
  await page.getByRole('button', { name: 'Apagar todos os dados' }).click();
  const folha = page.getByRole('dialog', { name: 'Apagar todos os dados?' });
  await folhaPronta(page);
  // as saídas: "Voltar" (no alto) e "Apagar tudo"; o "Cancelar" a mais saiu
  await expect(folha.getByRole('button', { name: 'Cancelar' })).toHaveCount(0);
  await expect(folha.getByRole('button', { name: 'Voltar' })).toBeVisible();
  const [copia] = await Promise.all([page.waitForEvent('download'), folha.getByRole('button', { name: 'Guardar uma cópia antes' }).click()]);
  expect(copia.suggestedFilename()).toMatch(/\.json$/);
  await expect(folha).toBeVisible();
  await folha.getByRole('button', { name: 'Apagar tudo' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('status').filter({ hasText: 'Dados apagados deste aparelho.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeVisible();
  // recarregar: os dados não voltam, e o aviso não fica repetindo
  await page.reload();
  await expect(page.getByRole('button', { name: 'Começar', exact: true })).toBeVisible();
});

test('apagar um local: o principal e o único não se apagam; o outro apaga com confirmação e o programa segue', async ({ page }) => {
  await ana(page);
  await page.goto('/locais');
  // um local só: não há o que apagar
  await expect(page.getByRole('button', { name: /^Apagar / })).toHaveCount(0);
  await page.getByRole('link', { name: 'Novo local' }).click();
  await page.getByRole('button', { name: 'Trabalho', exact: true }).click();
  await marcarItem(page, 'Banco reto');
  await page.getByRole('button', { name: 'Salvar local' }).click();
  await expect(page.getByRole('list', { name: 'Locais' }).getByRole('listitem')).toHaveCount(2);
  // só o que não é o principal tem "Apagar"
  await expect(page.getByRole('button', { name: /^Apagar / })).toHaveCount(1);
  await page.getByRole('button', { name: 'Apagar Trabalho' }).click();
  const folha = page.getByRole('dialog', { name: 'Apagar Trabalho?' });
  await folhaPronta(page);
  await expect(folha).toContainText('Os treinos feitos nele continuam no histórico, e o programa não muda.');
  await semToquePequeno(page);
  // "Voltar" não apaga
  await folha.getByRole('button', { name: 'Voltar' }).click();
  await expect(page.getByRole('list', { name: 'Locais' }).getByRole('listitem')).toHaveCount(2);
  await page.getByRole('button', { name: 'Apagar Trabalho' }).click();
  await folhaPronta(page);
  await page.getByRole('dialog', { name: 'Apagar Trabalho?' }).getByRole('button', { name: 'Apagar o local' }).click();
  await expect(page.getByRole('status')).toContainText('Trabalho apagado.');
  await expect(page.getByRole('list', { name: 'Locais' }).getByRole('listitem')).toHaveCount(1);
  // o programa segue válido, sem versão nova a oferecer
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await expect(page.getByText('Versão nova do programa.')).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toBeVisible();
});

test('o guia que não baixa mostra um aviso com a volta ao treino, sem a tela de erro do app', async ({ browser, baseURL }) => {
  // sem o service worker, para o pedido do pedaço do guia passar pela rede do teste
  const contexto = await browser.newContext({ serviceWorkers: 'block', baseURL, viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await contexto.newPage();
  await tocarEmEntendi(page);
  await page.route(/\/assets\/Guia-[\w-]+\.js$/, (rota) => rota.abort());
  await ana(page);
  await page.getByRole('button', { name: /^Começar/ }).click();
  await expect(page.getByRole('region', { name: /^Série 1/ })).toBeVisible();
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page.getByRole('heading', { name: 'O guia não carregou agora' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Algo deu errado nesta tela' })).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('O seu treino continua guardado.');
  // a volta leva ao treino, no mesmo exercício
  await page.getByRole('link', { name: 'Voltar ao treino' }).click();
  await expect(page.getByRole('region', { name: /^Série 1/ })).toBeVisible();
  await contexto.close();
});

for (const [largura, altura] of [[390, 844], [320, 640]] as const)
  test(`"Senti algo": a nota de dor aparece sem rolar a ${largura} × ${altura}`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: altura });
    await ana(page);
    await page.getByRole('button', { name: /^Começar/ }).click();
    await expect(page.getByRole('region', { name: /^Série 1/ })).toBeVisible();
    await page.getByRole('button', { name: 'Senti algo' }).click();
    const folha = page.getByRole('dialog', { name: 'O que você sentiu?' });
    await folhaPronta(page);
    const nota = folha.getByRole('group', { name: 'Dê uma nota para a dor (0 a 10)' });
    // os 11 números, do 0 ao 10, inteiros na tela, sem nenhum toque nem rolagem
    for (const n of [0, 5, 10]) await expect(nota.getByRole('button', { name: String(n), exact: true })).toBeInViewport({ ratio: 1 });
    // os sinais que encerram continuam na folha, com os mesmos dois grupos
    await expect(folha.getByRole('group', { name: 'Encerra o treino de hoje' })).toBeAttached();
    await expect(folha.getByRole('group', { name: 'Encerra este exercício' })).toBeAttached();
    await semToquePequeno(page);
  });

test('depois de salvar a série o foco vai para o descanso; o "Série feita" apagado continua na ordem do foco', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar/ }).click();
  const registro = page.getByRole('region', { name: /^Série 1/ });
  await expect(registro).toBeVisible();
  // apagado, o botão recebe o foco pelo teclado e diz o que falta
  const feita = registro.getByRole('button', { name: /^Série feita/ });
  await expect(feita).toBeDisabled();
  await feita.focus();
  await expect(feita).toBeFocused();
  await expect(feita).toHaveAccessibleDescription(/Falta escolher a carga/);
  await page.getByLabel('Carga', { exact: true }).selectOption({ index: 3 });
  await registro.getByRole('radio', { name: '3', exact: true }).check();
  await feita.click();
  const descanso = page.getByRole('region', { name: 'Descanso' });
  await expect(descanso).toBeVisible();
  await expect(descanso).toBeFocused();
});

test('ao abrir o guia, o foco vai para o nome do exercício', async ({ page }) => {
  await ana(page);
  await page.goto('/guia/goblet');
  const nome = page.getByRole('heading', { level: 1 });
  await expect(nome).toBeVisible();
  await expect(nome).toBeFocused();
});

// Decisão do Gustavo de 22/11/2026 (pedido 7, a saída C): o sinal de alerta continua encerrando o treino com um toque;
// a orientação de segurança aparece primeiro, e nessa tela o toque errado se desfaz.
test('sinal de alerta tocado sem querer: a orientação aparece, "Toquei sem querer" volta ao treino e nada fica bloqueado', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar/ }).click();
  const registro = page.getByRole('region', { name: /^Série 1/ });
  await page.getByLabel('Carga', { exact: true }).selectOption({ index: 3 });
  await registro.getByRole('radio', { name: '3', exact: true }).check();
  await registro.getByRole('button', { name: /^Série feita/ }).click();
  await page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Pular' }).click();
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await folhaPronta(page);
  await page.getByRole('dialog', { name: 'O que você sentiu?' }).getByRole('button', { name: 'Tontura ou quase desmaio' }).click();
  // encerrou com um toque, e a orientação de segurança vem primeiro, inteira
  await expect(page.getByRole('heading', { name: 'Treino encerrado por segurança' })).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('Pare o treino agora e descanse.');
  await expect(page.getByRole('link', { name: 'Ligar para o SAMU: 192' })).toBeVisible();
  await semToquePequeno(page);
  await page.getByRole('button', { name: 'Toquei sem querer. Voltar ao treino' }).click();
  // de volta ao treino, com a série que já estava feita
  await expect(page.getByRole('region', { name: /^Série 2/ })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Séries feitas' }).getByRole('listitem')).toHaveCount(1);
  // e o programa não ficou bloqueado pela "avaliação"
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Treino pausado por segurança' })).toHaveCount(0);
});

test('sem o "Toquei sem querer", o treino encerrado por alerta continua bloqueando o próximo até a confirmação', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar/ }).click();
  await expect(page.getByRole('region', { name: /^Série 1/ })).toBeVisible();
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await folhaPronta(page);
  await page.getByRole('dialog', { name: 'O que você sentiu?' }).getByRole('button', { name: 'Dor, pressão ou aperto no peito' }).click();
  await expect(page.getByRole('heading', { name: 'Treino encerrado por segurança' })).toBeVisible();
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Treino pausado por segurança' })).toBeVisible();
});

// Decisão do Gustavo de 22/11/2026 (a saída B): gerar o programa de novo continua com um toque, e a mensagem oferece
// "Desfazer", que traz de volta o programa e a rotina de antes.
test('gerar o programa de novo por um ajuste oferece "Desfazer", que traz o programa e a rotina de antes', async ({ page }) => {
  await ana(page, { minutos: '40' });
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toBeVisible();
  const antes = await page.getByRole('tabpanel').innerText();
  await expect(page.getByRole('button', { name: 'Desfazer', exact: true })).toHaveCount(0);
  const avisos = await verAvisos(page);
  await avisos.getByRole('region', { name: 'Ajustes possíveis' }).getByRole('button', { name: /^4 treinos de 40 min/ }).click();
  await expect(page.getByRole('status')).toContainText('Programa gerado de novo');
  await expect(page.getByRole('tab', { name: 'Superior A', exact: true })).toBeVisible();
  const desfazer = page.getByRole('button', { name: 'Desfazer', exact: true });
  await expect(desfazer).toBeVisible();
  await semToquePequeno(page);
  await desfazer.click();
  await expect(page.getByRole('status')).toContainText('Programa de antes de volta.');
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Superior A', exact: true })).toHaveCount(0);
  expect(await page.getByRole('tabpanel').innerText()).toBe(antes);
  await expect(desfazer).toHaveCount(0);
  // a volta fica guardada: recarregar mostra o programa de antes, com os 3 dias
  await page.reload();
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toBeVisible();
  await expect((await sobreOPrograma(page)).getByRole('list', { name: 'Resumo' })).toContainText('3x por semana');
});

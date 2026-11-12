import { expect, test, type Page } from '@playwright/test';
import { ana, abrirTrocar, maisOpcoes, marcarItem, proximoExercicio, terminarTreino, porQueDaSugestao } from './jornada';

// M5: treinar com o app. Persona fictícia Ana (halteres de 1 a 12 kg e banco reto).

/** Registra todas as séries do exercício atual: carga (se ainda não houver), RIR 2 e pula o descanso. */
async function fazerExercicio(page: Page) {
  const registro = page.getByRole('region', { name: /^Série \d/ });
  while (await registro.isVisible()) {
    const carga = page.getByLabel('Carga', { exact: true });
    if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT')) && !(await carga.inputValue())) await carga.selectOption({ index: 6 });
    if ((await page.getByRole('button', { name: 'Mais carga' }).count()) && (await page.locator('#carga-kg').innerText()) === '—')
      await page.getByRole('button', { name: 'Mais carga' }).click();
    const rir = registro.getByRole('radio', { name: '2', exact: true });
    if (!(await rir.isChecked())) await rir.check();
    await registro.getByRole('button', { name: /^Série feita/ }).click();
    const pular = page.getByRole('button', { name: 'Pular' });
    if (await pular.isVisible()) await pular.click();
  }
}

async function comecar(page: Page, dia = 'Corpo todo A') {
  await page.getByRole('tab', { name: dia, exact: true }).click();
  await page.getByRole('button', { name: `Começar o treino ${dia}` }).click();
  await expect(page).toHaveURL(/\/treino$/);
}

test('sessão completa: registra as séries, descansa e recebe a sugestão para a próxima vez', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await expect(page.getByRole('heading', { name: 'Agachamento búlgaro com apoio' })).toBeVisible();
  // 1ª vez: a 1ª série calibra a carga (progressao.calibracao, R1b).
  await expect(page.getByText('1ª vez: comece leve.')).toBeVisible();
  await expect(await porQueDaSugestao(page)).toContainText(/1ª vez neste exercício: comece com uma carga que pareça fácil/);
  await page.keyboard.press('Escape');
  await expect(page.getByText(/1–2 séries leves de aquecimento/)).toBeVisible();

  // 1ª série: sem carga e sem RIR o botão não deixa salvar.
  const feita = page.getByRole('button', { name: /^Série feita/ });
  await expect(feita).toBeDisabled();
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await feita.click();

  // Descanso começa sozinho, com ±15 s.
  const descanso = page.getByRole('region', { name: 'Descanso' });
  await expect(descanso).toBeVisible();
  await expect(descanso.getByRole('timer')).toHaveText(/^1:4\d$/);
  await descanso.getByRole('button', { name: '+15 s' }).click();
  await expect(descanso.getByRole('timer')).toHaveText(/^(2:0\d|1:59)$/);
  await descanso.getByRole('button', { name: 'Pular' }).click();
  // 8 kg × 9 com 2 de reserva, para a faixa 8–12 com RIR 3–4: pesada. A série fica como acerto da carga.
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('8 kg × 9 · RIR 2 · acerto da carga');

  // 2ª série vem com a carga calibrada (Brzycki, para baixo no inventário: 7 kg).
  await expect(page.getByText('Calibração: Ficou pesada: na próxima série, 7 kg.')).toBeVisible();
  await expect(page.getByLabel('Carga', { exact: true })).toHaveValue('7');
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await feita.click();
  await page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Pular' }).click();
  // 7 kg × 11 com 2 de reserva: perto do alvo, vira a série de trabalho (sem a marca de acerto).
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText(/7 kg × 11 · RIR 2\s*Desfazer/);

  for (;;) {
    await fazerExercicio(page);
    const proximo = page.getByRole('navigation', { name: 'Exercícios' }).getByRole('button', { name: 'Próximo ›' });
    if (!(await proximo.isVisible())) break;
    await proximo.click();
  }
  await page.getByRole('main').getByRole('button', { name: 'Terminar treino' }).click();

  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await expect(page.locator('.subtitulo')).toContainText('Corpo todo A');
  // lote 4 do redesign: "O que mudou hoje" primeiro, com a semana já contando o treino de hoje
  await expect(page.getByRole('region', { name: 'O que mudou hoje' })).toContainText('1 de 3');
  await expect(page.getByRole('heading', { name: 'Para a próxima vez' })).toBeVisible();
  await expect(page.locator('.resumo-ex').first()).toContainText('Manter');
  // o motivo da sugestão, com o selo, fica no "por quê?" de cada linha
  await page.locator('.resumo-ex').first().getByRole('button', { name: 'por quê?' }).click();
  await expect(page.getByRole('dialog').locator('.selo-folha').first()).toBeVisible();
  await page.keyboard.press('Escape');

  // De volta ao início: o próximo da rotação vem selecionado, e o histórico sobrevive ao recarregar.
  await page.getByRole('link', { name: 'Voltar ao início' }).click();
  await expect(page.getByRole('tab', { name: 'Corpo todo B', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Começar o treino Corpo todo B' })).toBeVisible();

  // Treino A de novo: agora a carga sugerida aparece.
  await comecar(page, 'Corpo todo A');
  await expect(page.getByText(/^Hoje:/)).toBeVisible();
  await expect(page.getByLabel('Carga', { exact: true })).toHaveValue('7');
});

test('treino em andamento sobrevive a fechar o app', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByLabel('Carga', { exact: true }).selectOption('6');
  await page.getByRole('radio', { name: '3', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Continuar o treino em andamento' })).toBeVisible();
  await page.getByRole('link', { name: 'Continuar o treino em andamento' }).click();
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('6 kg');
});

test('trocar pela alternativa vale só para esta sessão', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await (await abrirTrocar(page)).getByRole('button').first().click();
  await expect(page.getByText(/No lugar de agachamento búlgaro/)).toBeVisible();
});

test('dor acima de 5 encerra o exercício e oferece a alternativa', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await page.getByRole('region', { name: 'Senti algo' }).getByRole('button', { name: '7', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Pare este exercício e use a alternativa');
  // Auditoria de 12/11/2026: antes da 1ª série, a nota não ia para lugar nenhum; agora fica no exercício.
  await expect(page.getByRole('alert')).toContainText('Nota 7 guardada neste exercício.');
  await expect(page.getByText('Exercício encerrado.')).toBeVisible();
  await expect(page.getByRole('region', { name: 'Trocar exercício' })).toBeVisible();
  await page.reload();
  await expect(page.getByText('Exercício encerrado.')).toBeVisible();
});

// Auditoria de 12/11/2026: a nota de 3 a 5 dada antes da 1ª série vivia só na tela e se perdia ao abrir o guia.
test('a nota de dor dada antes da 1ª série sobrevive à ida ao guia e entra na série registrada', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await page.getByRole('region', { name: 'Senti algo' }).getByRole('button', { name: '4', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Nota 4 guardada na próxima série que você registrar.');
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/.+de=treino/);
  await page.goBack();
  await expect(page).toHaveURL(/\/treino$/);
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('dor 4');
});

test('dor no peito encerra o treino e orienta ligar para o SAMU', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await page.getByRole('button', { name: 'Dor, pressão ou aperto no peito' }).click();
  await expect(page.getByRole('heading', { name: 'Treino encerrado por segurança' })).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('192');
});

test('R1: aberto pelo treino, o guia do búlgaro mostra a prescrição da semana da Ana (RIR 3–4), não a da referência', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await expect(page.getByRole('heading', { name: 'Agachamento búlgaro com apoio' })).toBeVisible();
  const meta = (await page.locator('p.meta').first().innerText()).trim();
  const series = meta.match(/^(\d+) × 8–12/)![1]!;
  await expect(page.locator('.rir-meta')).toContainText('meta de hoje: 3–4');
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/bulgaro\?de=treino/);
  const rx = page.getByTestId('prescricao');
  await expect(rx).toHaveText(new RegExp(`^Semana 1: ${series} × 8–12 cada lado · RIR 3–4 · descanso 1:45 · fase de aprendizado$`));
  // Nada da prescrição do programa de referência ("3 × 8–12 por perna · RIR 1–2 · 1,5 min").
  await expect(page.locator('body')).not.toContainText('RIR 1–2');
  await expect(page.locator('body')).not.toContainText('por perna');
  // O checklist pede a carga para o RIR desta semana, e as abas são as do dia dela.
  await expect(page.getByText('Carga para RIR 3–4')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Torso A' })).toHaveCount(0);
  await page.getByRole('link', { name: '‹ Voltar ao treino' }).click();
  await expect(page).toHaveURL(/\/treino$/);
});

// Design v2 (item I): o botão mais tocado do app aparece sem rolar, em toda série, num celular comum e num pequeno.
for (const largura of [412, 360]) {
  test(`"Série feita" visível sem rolar nas 2 séries, a ${largura} px`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: largura === 360 ? 740 : 839 });
    await ana(page);
    await comecar(page);
    const feita = page.getByRole('button', { name: /^Série feita/ });
    for (let serie = 0; serie < 2; serie++) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(feita).toBeInViewport({ ratio: 1 });
      const carga = page.getByLabel('Carga', { exact: true });
      if (!(await carga.inputValue())) await carga.selectOption({ index: 6 });
      await page.getByRole('region', { name: /^Série \d/ }).getByRole('radio', { name: '2', exact: true }).check();
      await feita.click();
      const pular = page.getByRole('button', { name: 'Pular' });
      if (await pular.isVisible()) await pular.click();
    }
  });
}

// Lote 2 do redesign: terminar no meio pede confirmação, e "Senti algo" continua ao alcance com a confirmação aberta.
test('terminar no meio do treino pede confirmação; "Continuar treinando" volta ao exercício', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await (await maisOpcoes(page)).getByRole('button', { name: 'Terminar o treino agora' }).click();
  const confirma = page.getByRole('dialog', { name: 'Terminar o treino agora?' });
  // R5a (registro.treino-feito): sem nenhuma série, a confirmação oferece descartar.
  await expect(confirma).toContainText('Você não registrou nenhuma série.');
  await expect(confirma.getByRole('button', { name: 'Descartar este treino' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Senti algo' })).toBeVisible();
  await confirma.getByRole('button', { name: 'Continuar treinando' }).click();
  await expect(confirma).toBeHidden();
  await expect(page).toHaveURL(/\/treino$/);
  await expect(page.getByRole('heading', { name: 'Agachamento búlgaro com apoio' })).toBeVisible();
  await terminarTreino(page);
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
});

// Lote 2 do redesign: depois de "Série feita", "Desfazer" fica 5 s à vista; desfazer apaga a série e para o descanso.
test('"Desfazer" por 5 s depois de salvar a série apaga a série e para o descanso', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  const barra = page.getByRole('status').filter({ hasText: 'Série 1 salva' });
  await expect(barra).toBeVisible();
  await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
  await barra.getByRole('button', { name: 'Desfazer' }).click();
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toHaveCount(0);
  await expect(page.getByRole('region', { name: 'Descanso' })).toHaveCount(0);
  await expect(page.getByRole('region', { name: /^Série 1/ })).toBeVisible();
  // sem desfazer, a barra some sozinha em 5 s e a série fica (a série volta ao começo: carga e reserva de novo)
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Série 1 salva' })).toBeVisible();
  await expect(page.getByRole('status').filter({ hasText: 'Série 1 salva' })).toBeHidden({ timeout: 7000 });
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('8 kg × 8');
});

// Lote 2 do redesign (segurança): no exercício sem animação, a montagem segura vem aberta, com o selo, sem nenhum toque;
// dicas e erros abrem numa folha.
// R5-anim, lote 2 (10/11/2026): a ponte com halter ganhou animação; o exercício sem animação do dia A passa a ser a
// barra só na descida (o 4º), que entra com uma barra fixa no equipamento da Ana.
test('exercício sem animação: a montagem segura vem sempre aberta, com o selo', async ({ page }) => {
  await ana(page, { equipamentoExtra: async (p) => void (await marcarItem(p, 'Barra fixa')) });
  await comecar(page);
  for (let i = 0; i < 3; i++) await proximoExercicio(page);
  await expect(page.getByRole('heading', { name: /Barra fixa só na descida/ })).toBeVisible();
  const montagem = page.getByRole('region', { name: /Montagem segura/ });
  await expect(montagem).toBeVisible();
  await expect(montagem.getByRole('listitem').first()).toBeVisible();
  await expect(montagem.locator('button.selo')).toHaveAccessibleName(/: ver de onde vem$/);
  await page.getByRole('button', { name: 'Como fazer: dicas e erros ›' }).click();
  const folha = page.getByRole('dialog', { name: 'Como fazer (em texto)' });
  await expect(folha.getByRole('heading', { name: 'Dicas' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Senti algo' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(folha).toBeHidden();
});

// Segurança: "Senti algo" abre e fecha a própria folha, e de qualquer outra folha (o "⋯", a troca) vai direto para ela.
test('"Senti algo" abre e fecha a folha, e passa por cima de qualquer outra folha do treino', async ({ page }) => {
  await ana(page);
  await comecar(page);
  const senti = page.getByRole('button', { name: 'Senti algo' });
  const folha = page.getByRole('dialog', { name: 'O que você sentiu?' });
  await senti.click();
  await expect(folha).toBeVisible();
  await senti.click();
  await expect(folha).toBeHidden();
  await maisOpcoes(page);
  await senti.click();
  await expect(page.getByRole('dialog', { name: 'Mais opções' })).toBeHidden();
  await expect(folha).toBeVisible();
  await senti.click();
  await abrirTrocar(page);
  await senti.click();
  await expect(page.getByRole('region', { name: 'Trocar exercício' })).toBeHidden();
  await expect(folha).toBeVisible();
});

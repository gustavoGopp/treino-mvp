import { expect, test, type Page } from '@playwright/test';
import { ana, abrirTrocar, folhaPronta, maisOpcoes, marcarItem, proximoExercicio, terminarTreino, porQueDaSugestao } from './jornada';
import { semToquePequeno } from './toque';

// M5: treinar com o app. Persona fictícia Ana (halteres de 1 a 12 kg e banco reto).

/** Registra todas as séries do exercício atual: carga (se ainda não houver), RIR 2 e pula o descanso. */
async function fazerExercicio(page: Page) {
  const registro = page.getByRole('region', { name: /^Série \d/ });
  while (await registro.isVisible()) {
    const carga = page.getByLabel('Carga', { exact: true });
    if ((await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT')) && !(await carga.inputValue())) await carga.selectOption({ index: 6 });
    if ((await page.getByRole('button', { name: 'Mais carga' }).count()) && (await page.locator('.carga-valor').first().innerText()) === '—')
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
  // Pacote 2 (15/11/2026): o 1º exercício do Corpo todo A da Ana é o goblet (a ordem de referência); era o búlgaro.
  await expect(page.getByRole('heading', { name: 'Agachamento goblet com calcanhar elevado' })).toBeVisible();
  // 1ª vez: a 1ª série calibra a carga (progressao.calibracao, R1b).
  await expect(page.getByText('1ª vez: comece leve.')).toBeVisible();
  // sessão de textos (16/11/2026): o motivo saiu da tela do treino e está em "Entenda o treino" → "Os exercícios"
  await expect(page.getByRole('button', { name: 'por quê?' })).toHaveCount(0);
  await expect(await porQueDaSugestao(page, 'Agachamento goblet com calcanhar elevado')).toContainText(/1ª vez neste exercício: comece com uma carga que pareça fácil/);
  await page.goto('/treino');
  await expect(page.getByText('Aqueça antes: 1–2 séries leves, sem contar.')).toBeVisible();

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
  // 8 kg × 9 com 2 de reserva (11 até a falha), para a faixa 8–15 com RIR 3–4 do goblet (alvo da calibração: 15, o meio
  // da faixa mais o meio do RIR): pesada. A série fica como acerto da carga.
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('8 kg × 9 · RIR 2 · acerto da carga');

  // 2ª série vem com a carga calibrada (Brzycki, para baixo no inventário: 6 kg; eram 7 kg na faixa 8–12 do búlgaro,
  // até o pacote 2, de 15/11/2026).
  await expect(page.getByText('Ficou pesada: na próxima série, 6 kg.')).toBeVisible();
  await expect(page.getByLabel('Carga', { exact: true })).toHaveValue('6');
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await feita.click();
  await page.getByRole('region', { name: 'Descanso' }).getByRole('button', { name: 'Pular' }).click();
  // 6 kg × 11 com 2 de reserva: perto do alvo (13 até a falha, a 2 do alvo de 15), vira a série de trabalho (sem a marca
  // de acerto).
  await expect(page.getByRole('list', { name: 'Séries feitas' })).toContainText('6 kg × 11 · RIR 2');
  // frontend novo: o "Desfazer a última série" saiu do meio da tela e mora no "⋯" (Mais opções)
  await expect((await maisOpcoes(page)).getByRole('button', { name: 'Desfazer a última série' })).toBeVisible();
  await page.keyboard.press('Escape');

  for (;;) {
    await fazerExercicio(page);
    const proximo = page.getByRole('navigation', { name: 'Exercícios' }).getByRole('button', { name: 'Próximo exercício' });
    if (!(await proximo.isVisible())) break;
    await proximo.click();
  }
  await page.getByRole('main').getByRole('button', { name: 'Terminar treino' }).click();

  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await expect(page.locator('.subtitulo')).toContainText('Corpo todo A');
  // lote 4 do redesign: "O que mudou hoje" primeiro, com a semana já contando o treino de hoje
  await expect(page.getByRole('region', { name: 'O que mudou hoje' })).toContainText('1 de 3');
  await expect(page.getByRole('heading', { name: 'Próxima vez' })).toBeVisible();
  await expect(page.locator('.resumo-ex').first()).toContainText('Manter');
  // sessão de textos (16/11/2026): o motivo da sugestão, com o selo, saiu do fim do treino e está em "Entenda o treino"
  await expect(page.locator('.resumo-ex').first().getByRole('button', { name: 'por quê?' })).toHaveCount(0);
  const motivo = await porQueDaSugestao(page, 'Agachamento goblet com calcanhar elevado');
  await expect(motivo.locator('.selo').first()).toBeVisible();
  await page.goto('/treino/fim');
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();

  // De volta ao início: o próximo da rotação vem selecionado, e o histórico sobrevive ao recarregar.
  await page.getByRole('link', { name: 'Voltar ao início' }).click();
  await expect(page.getByRole('tab', { name: 'Corpo todo B', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Começar o treino Corpo todo B' })).toBeVisible();

  // Treino A de novo: agora a carga sugerida aparece.
  await comecar(page, 'Corpo todo A');
  await expect(page.getByText(/^Hoje:/)).toBeVisible();
  await expect(page.getByLabel('Carga', { exact: true })).toHaveValue('6');
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
  // o exercício trocado é o 1º do dia: o goblet desde o pacote 2 (15/11/2026); antes, o búlgaro
  await expect(page.getByText(/No lugar de agachamento goblet/)).toBeVisible();
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

// Auditoria de 12/11/2026: com o halter mais leve (ou a placa 1), a orientação mandava reduzir a carga em 10–20%.
test('dor de 3 a 5 com o halter mais leve: a orientação não manda reduzir a carga', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByLabel('Carga', { exact: true }).selectOption('1');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await page.getByRole('region', { name: 'Senti algo' }).getByRole('button', { name: '4', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Não há carga menor aqui: encurte a amplitude ou desacelere.');
  await expect(page.getByRole('alert')).not.toContainText('Reduza a carga');
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

// seguranca.alerta.cardiovascular (17/11/2026): a regra dizia "bloqueia novos treinos até a pessoa confirmar avaliação", e
// o app só orientava. Agora o início não deixa começar um treino até a confirmação, como na triagem.
test('depois da dor no peito, o início só deixa treinar de novo com a confirmação da avaliação', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await page.getByRole('button', { name: 'Dor, pressão ou aperto no peito' }).click();
  await page.getByRole('link', { name: 'Voltar ao início' }).click();

  const bloqueio = page.getByRole('region', { name: 'Treino pausado por segurança' });
  await expect(bloqueio).toContainText('Só volte a treinar depois de uma avaliação.');
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toHaveCount(0);
  const voltar = bloqueio.getByRole('button', { name: 'Voltar a treinar' });
  await expect(voltar).toBeDisabled();
  await semToquePequeno(page);
  // recarregar não desfaz o bloqueio
  await page.reload();
  await expect(bloqueio).toBeVisible();
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toHaveCount(0);

  await bloqueio.getByRole('checkbox', { name: 'Confirmo que fui avaliado e liberado por um médico' }).check();
  await voltar.click();
  await expect(bloqueio).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeVisible();
});

// seguranca.alerta.musculoesqueletico (17/11/2026): a regra dizia que os sinais de cauda equina pedem atendimento urgente,
// e nenhuma tela os mostrava. Agora o "Senti algo" tem o sinal, em palavras simples, e ele encerra o treino.
test('dormência entre as pernas ou descontrole da urina ou das fezes encerra o treino e manda a um pronto-socorro', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  const encerra = page.getByRole('group', { name: 'Encerra o treino de hoje' });
  await semToquePequeno(page);
  await encerra.getByRole('button', { name: 'Dormência entre as pernas ou descontrole da urina ou das fezes' }).click();
  await expect(page.getByRole('heading', { name: 'Treino encerrado por segurança' })).toBeVisible();
  const alerta = page.getByRole('alert');
  await expect(alerta).toContainText('atendimento urgente');
  await expect(alerta).toContainText('procure um pronto-socorro agora');
  // a orientação do coração (esperar o sintoma passar, SAMU) não aparece aqui
  await expect(alerta).not.toContainText('Se o sintoma não passar');
  // e o treino fica guardado como encerrado por esse sinal
  await page.reload();
  await expect(page.getByRole('alert')).toContainText('procure um pronto-socorro agora');
  // este sinal não bloqueia o próximo treino: a regra dele pede atendimento urgente, não a confirmação
  await page.getByRole('link', { name: 'Voltar ao início' }).click();
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeVisible();
});

// Pacote 2 (15/11/2026): o 1º exercício do Corpo todo A da Ana passou a ser o goblet (dois lados, 8–15); antes era o
// búlgaro (um lado só, 8–12). O teste do guia aberto pelo treino segue no 1º exercício do dia, e o "cada lado" da
// prescrição é conferido no teste seguinte, com o afundo do Corpo todo C.
test('R1: aberto pelo treino, o guia do goblet mostra a prescrição da semana da Ana (RIR 3–4), não a da referência', async ({ page }) => {
  await ana(page);
  await comecar(page);
  await expect(page.getByRole('heading', { name: 'Agachamento goblet com calcanhar elevado' })).toBeVisible();
  // o goblet é de dois lados: a meta do treino não diz "cada lado"
  const meta = (await page.locator('p.meta').first().innerText()).trim();
  const series = meta.match(/^(\d+) × 8–15$/)![1]!;
  await expect(page.locator('.rir-meta')).toContainText('meta de hoje: 3–4');
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/goblet\?de=treino/);
  // sessão de textos (16/11/2026): a linha da prescrição saiu do guia (ela está na tela do treino, de onde a pessoa
  // veio); o que o guia ainda diz da prescrição é a carga da lista de conferência, com o RIR desta semana
  expect(Number(series)).toBeGreaterThan(0);
  await expect(page.getByTestId('prescricao')).toHaveCount(0);
  await page.locator('summary', { hasText: /^Conferir \(\d+\)$/ }).click();
  // Nada da prescrição do programa de referência (para o goblet, "3 × 8–15 · RIR 1–2 · 2 min"; para os exercícios de
  // um lado só, "por perna").
  await expect(page.locator('body')).not.toContainText('RIR 1–2');
  await expect(page.locator('body')).not.toContainText('por perna');
  // O checklist pede a carga para o RIR desta semana, e as abas são as do dia dela.
  await expect(page.getByText('Carga para RIR 3–4')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Torso A' })).toHaveCount(0);
  await page.getByRole('link', { name: 'Voltar ao treino' }).click();
  await expect(page).toHaveURL(/\/treino$/);
});

// O exercício de um lado só: o afundo, 1º do Corpo todo C da Ana. Até o pacote 2 (15/11/2026) esta parte era conferida
// no búlgaro, que saiu do programa dela.
test('R1: no exercício de um lado só (o afundo), o treino e o guia dizem "cada lado" na prescrição da Ana, não "por perna"', async ({ page }) => {
  await ana(page);
  await comecar(page, 'Corpo todo C');
  await expect(page.getByRole('heading', { name: 'Afundo estático com halteres' })).toBeVisible();
  const meta = (await page.locator('p.meta').first().innerText()).trim();
  const series = meta.match(/^(\d+) × 8–12 cada lado$/)![1]!;
  await expect(page.locator('.rir-meta')).toContainText('meta de hoje: 3–4');
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/afundo\?de=treino/);
  // sessão de textos (16/11/2026): a linha da prescrição saiu do guia; o "cada lado" fica na tela do treino (acima)
  expect(Number(series)).toBeGreaterThan(0);
  await expect(page.getByTestId('prescricao')).toHaveCount(0);
  await page.locator('summary', { hasText: /^Conferir \(\d+\)$/ }).click();
  // Nada da prescrição do programa de referência ("2 × 8–12 por perna · RIR 1–2 · 1,5 min").
  await expect(page.locator('body')).not.toContainText('RIR 1–2');
  await expect(page.locator('body')).not.toContainText('por perna');
  await expect(page.getByText('Carga para RIR 3–4')).toBeVisible();
  await page.getByRole('link', { name: 'Voltar ao treino' }).click();
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
  await expect(confirma).toContainText('Nenhuma série registrada');
  await expect(confirma.getByRole('button', { name: 'Descartar este treino' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Senti algo' })).toBeVisible();
  await confirma.getByRole('button', { name: 'Continuar treinando' }).click();
  await expect(confirma).toBeHidden();
  await expect(page).toHaveURL(/\/treino$/);
  // o 1º exercício do dia (o goblet desde o pacote 2, de 15/11/2026; antes, o búlgaro)
  await expect(page.getByRole('heading', { name: 'Agachamento goblet com calcanhar elevado' })).toBeVisible();
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
test('exercício sem animação: a montagem segura vem sempre aberta', async ({ page }) => {
  await ana(page, { equipamentoExtra: async (p) => void (await marcarItem(p, 'Barra fixa')) });
  await comecar(page);
  for (let i = 0; i < 3; i++) await proximoExercicio(page);
  await expect(page.getByRole('heading', { name: /Barra fixa só na descida/ })).toBeVisible();
  const montagem = page.getByRole('region', { name: /Montagem segura/ });
  await expect(montagem).toBeVisible();
  await expect(montagem.getByRole('listitem').first()).toBeVisible();
  // sessão de textos (16/11/2026): o selo saiu da tela; a regra da montagem segura está em "Entenda o treino"
  await expect(montagem.locator('button.selo')).toHaveCount(0);
  await page.getByRole('button', { name: 'Como fazer', exact: true }).click();
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

// Auditoria de 12/11/2026: o descanso vivia só na tela do treino. Abrir o guia no meio do descanso parava o
// temporizador; o contexto de áudio nunca era fechado; e, ao passar de zero com "−15 s", os bipes já agendados para
// o horário antigo ainda tocavam.
test('o descanso sobrevive à ida ao guia, o áudio é fechado ao sair e os bipes param quando o tempo passa de zero', async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __audio: { criados: number; fechados: number; osciladores: { cedo: boolean }[] } };
    w.__audio = { criados: 0, fechados: 0, osciladores: [] };
    const AC = window.AudioContext;
    window.AudioContext = class extends AC {
      constructor() {
        super();
        w.__audio.criados++;
      }
      close() {
        w.__audio.fechados++;
        return super.close();
      }
      createOscillator() {
        const o = super.createOscillator();
        const marca = { cedo: false };
        w.__audio.osciladores.push(marca);
        const parar = o.stop.bind(o);
        o.stop = (quando?: number) => {
          if (!quando) marca.cedo = true;
          parar(quando);
        };
        return o;
      }
    };
  });
  const audio = () => page.evaluate(() => (window as unknown as { __audio: { criados: number; fechados: number; osciladores: { cedo: boolean }[] } }).__audio);
  await ana(page);
  await comecar(page);
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  const descanso = page.getByRole('region', { name: 'Descanso' });
  await expect(descanso).toBeVisible();
  expect((await audio()).criados).toBe(1);

  // vai ao guia e volta: o descanso continua contando, e o áudio da tela que saiu foi fechado
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/.+de=treino/);
  // a tela do treino só sai quando o pedaço do guia termina de carregar
  await expect.poll(async () => (await audio()).fechados).toBe(1);
  await page.goBack();
  await expect(page).toHaveURL(/\/treino$/);
  await expect(descanso).toBeVisible();
  await expect(descanso.getByRole('timer')).toHaveText(/^\d:\d\d$/);
  // recarregar a página também não perde o descanso
  await page.reload();
  await expect(descanso).toBeVisible();

  // "−15 s" até passar de zero: nenhum bipe fica agendado para o horário antigo
  for (let i = 0; i < 12 && !(await descanso.getByText('Hora da próxima série').isVisible()); i++) await descanso.getByRole('button', { name: '−15 s' }).click();
  await expect(descanso.getByText('Hora da próxima série')).toBeVisible();
  const a = await audio();
  expect(a.osciladores.length).toBeGreaterThan(0);
  expect(a.osciladores.every((o) => o.cedo)).toBe(true);
  // "Ok" encerra o descanso, e ele não volta ao recarregar
  await descanso.getByRole('button', { name: 'Ok' }).click();
  await expect(descanso).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('region', { name: /^Série 2/ })).toBeVisible();
  await expect(descanso).toHaveCount(0);
});

// Lote M2 da análise crítica, adiantado a pedido do Gustavo em 22/11/2026 ("quando clicar você consegue entrar já na
// animação"). Antes, o toque no Boneco só pausava, e para ver grande a pessoa saía do treino pelo livro do cabeçalho.
for (const [largura, altura] of [[360, 640], [375, 667], [390, 664], [412, 839]] as const)
  test(`um toque no Boneco amplia o guia por cima do treino, com metade da tela ou mais, a ${largura} × ${altura}`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: altura });
    await ana(page);
    await comecar(page);
    // de repouso, o Boneco está sempre lá (a 390 × 664 ele sumia e ficava um vazio no lugar)
    const pequeno = page.getByRole('button', { name: 'Ampliar o guia' });
    await expect(pequeno).toBeVisible();
    await expect.poll(() => pequeno.getByRole('img').evaluate((e) => e.childElementCount)).toBeGreaterThan(0);
    await pequeno.click();
    const folha = page.getByRole('dialog', { name: 'Agachamento goblet com calcanhar elevado' });
    await folhaPronta(page);
    const grande = folha.getByRole('img', { name: /^O Boneco fazendo/ });
    await expect.poll(() => grande.evaluate((e) => e.childElementCount)).toBeGreaterThan(0);
    // o desenho ocupa metade da tela ou mais, e o Boneco fica pelo menos duas vezes mais alto que no repouso
    const palco = await folha.locator('.palco-grande').boundingBox();
    expect(palco!.height).toBeGreaterThanOrEqual(altura * 0.5);
    // as abas e a legenda vêm junto; a pausa é um botão próprio, de 44 px ou mais
    await expect(folha.getByRole('group', { name: 'O que o guia mostra' }).getByRole('button', { name: 'Erros' })).toBeVisible();
    const pausa = folha.getByRole('button', { name: 'Pausar o guia' });
    expect((await pausa.boundingBox())!.width).toBeGreaterThanOrEqual(44);
    await pausa.click();
    const quadro = await grande.innerHTML();
    await page.evaluate(() => new Promise((ok) => setTimeout(ok, 500)));
    expect(await grande.innerHTML()).toBe(quadro);
    await folha.getByRole('button', { name: 'Tocar o guia' }).click();
    await expect.poll(() => grande.innerHTML()).not.toBe(quadro);
    // a velocidade e o ângulo, como no guia completo: "Lento" liga a câmera lenta, e outro ângulo troca o desenho
    const lento = folha.getByRole('button', { name: 'Lento' });
    await lento.click();
    await expect(lento).toHaveAttribute('aria-pressed', 'true');
    const angulos = folha.getByRole('group', { name: 'Ângulo' }).getByRole('button');
    expect(await angulos.count()).toBeGreaterThanOrEqual(2);
    const nomeDoOutro = (await folha.getByRole('group', { name: 'Ângulo' }).locator('button[aria-pressed="false"]').first().innerText()).trim();
    const outro = folha.getByRole('group', { name: 'Ângulo' }).getByRole('button', { name: nomeDoOutro, exact: true });
    const antesDoAngulo = await grande.getAttribute('viewBox');
    const htmlAntes = await grande.innerHTML();
    await outro.click();
    await expect(outro).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(async () => (await grande.getAttribute('viewBox')) !== antesDoAngulo || (await grande.innerHTML()) !== htmlAntes).toBe(true);
    await semToquePequeno(page);
    // fechar volta ao treino, no mesmo exercício, com o Boneco de repouso se mexendo de novo
    await folha.getByRole('button', { name: 'Fechar' }).click();
    await expect(folha).toHaveCount(0);
    await expect(page.getByRole('region', { name: /^Série 1/ })).toBeVisible();
    const repouso = await pequeno.getByRole('img').innerHTML();
    await expect.poll(() => pequeno.getByRole('img').innerHTML()).not.toBe(repouso);
  });


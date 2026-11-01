import { expect, test } from '@playwright/test';
import { ana, minutosPorTreino, triagem, triagemNenhuma } from './jornada';

test('do zero ao programa em menos de 5 minutos (persona Ana)', async ({ page }) => {
  const inicio = Date.now();
  await ana(page);
  expect(Date.now() - inicio).toBeLessThan(5 * 60_000);

  // Vai direto ao treino: abas por dia e cartões com séries × repetições.
  for (const dia of ['Corpo todo A', 'Corpo todo B', 'Corpo todo C']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toHaveAttribute('aria-selected', 'true');
  const painel = page.getByRole('tabpanel');
  // Semana 1 (fase de aprendizado da iniciante): RIR 3–4 e menos séries que o programa completo.
  await expect(painel.locator('.series').first()).toHaveText(/^\d × 8–12 cada lado$/);
  await expect(painel.locator('.sub-rx').first()).toContainText('RIR 3–4');
  // Exercício com animação mostra a imagem e abre o guia.
  await expect(painel.locator('.miniatura svg').first()).toBeVisible();
  // Sem animação aprovada: "animação em breve" (ponte de glúteo), nunca uma animação improvisada.
  await expect(painel.locator('.miniatura.vazia')).toHaveCount(1);
  // O porquê, com o selo de evidência, fica um toque abaixo.
  await painel.getByText('Detalhes', { exact: true }).first().click();
  await expect(painel.locator('.mais .selo').first()).toBeVisible();
  // Outro dia.
  await page.getByRole('tab', { name: 'Corpo todo B', exact: true }).click();
  await expect(painel.getByRole('heading', { name: /Stiff unilateral/ })).toBeVisible();
  // Avisos de meta por músculo em "Sobre o programa".
  await page.getByText('Sobre o programa: avisos e o porquê').click();
  await expect(page.getByText(/Abaixo da meta semanal/).first()).toBeVisible();

  await page.getByRole('tab', { name: 'Corpo todo A', exact: true }).click();
  await painel.getByRole('link', { name: /Agachamento búlgaro.*ver como fazer/ }).click();
  await expect(page).toHaveURL(/\/guia\/bulgaro\?de=programa&dia=corpo-a&ex=bulgaro$/);
  await expect(page.getByTestId('prescricao')).toContainText('RIR 3–4');
});

test('divisão: as opções aparecem sem nada marcado, a recomendada vem explicada e a escolha vira o programa', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagemNenhuma(page);
  await page.getByRole('group', { name: /sem parar/ }).getByLabel('Menos de 6 meses').check();
  await page.getByRole('group', { name: /treinando agora/ }).getByLabel(/^Estou treinando/).check();
  await page.getByRole('group', { name: /confiança na técnica/ }).getByLabel(/^Sim/).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('group', { name: /Quantos dias/ }).getByLabel('3 dias').check();
  await minutosPorTreino(page, '60');
  const divisao = page.getByRole('group', { name: /Como prefere dividir/ });
  await expect(divisao).toBeVisible();
  for (const r of await divisao.getByRole('radio').all()) await expect(r).not.toBeChecked();
  await expect(divisao.getByText('Recomendada', { exact: true })).toBeVisible();
  await expect(divisao.getByText(/cerca de 8 exercícios por treino/).first()).toBeVisible();
  // Iniciante: as metas cabem em 1 sessão por músculo, então a clássica aparece, com o aviso das faltas.
  await expect(divisao.getByText(/faltar a um dia tira a semana inteira/)).toBeVisible();
  await divisao.getByLabel(/Superior\/Inferior \+ Corpo todo/).check();
  // Mudar os dias limpa a escolha (a divisão é de um número de dias).
  await page.getByRole('group', { name: /Quantos dias/ }).getByLabel('4 dias').check();
  for (const r of await divisao.getByRole('radio').all()) await expect(r).not.toBeChecked();
  await page.getByRole('group', { name: /Quantos dias/ }).getByLabel('3 dias').check();
  await divisao.getByLabel(/Superior\/Inferior \+ Corpo todo/).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel('Halteres fixos', { exact: true }).check();
  await page.getByRole('group', { name: 'O mais leve' }).getByLabel('1 kg', { exact: true }).check();
  await page.getByRole('group', { name: 'O mais pesado' }).getByLabel('12 kg', { exact: true }).check();
  await page.getByRole('group', { name: 'De quanto em quanto' }).getByLabel('1 kg', { exact: true }).check();
  await page.getByLabel('Banco reto', { exact: true }).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  for (const dia of ['Superior A', 'Inferior A', 'Corpo todo']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  // A escolha fica salva na rotina.
  await page.goto('/comecar/rotina');
  await expect(page.getByRole('group', { name: /Como prefere dividir/ }).getByLabel(/Superior\/Inferior \+ Corpo todo/)).toBeChecked();
});

test('triagem com "sim" bloqueia, e confirmar a liberação desbloqueia', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagem(page, { simEm: ['coração'] });

  await expect(page.getByRole('heading', { name: 'Vamos pausar o programa automático' })).toBeVisible();
  const continuar = page.getByRole('button', { name: 'Continuar com a liberação' });
  await expect(continuar).toBeDisabled();
  await page.reload();
  // Sem a confirmação, nada foi salvo: a triagem continua pendente.
  await expect(page).toHaveURL(/\/comecar\/triagem$/);
  await triagem(page, { simEm: ['coração'] });
  await page.getByLabel('Confirmo que fui avaliado e liberado').check();
  await continuar.click();
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
});

test('"sim" só no osteoarticular pede as regiões e a dor de hoje, e o aviso diz o motivo verdadeiro', async ({ page }) => {
  await ana(page, {
    passarTriagem: async (p) => {
      await triagem(p, { simEm: ['osso, articulação'] });
      await expect(p.getByText('Marque pelo menos uma região com problema.')).toBeVisible();
      await p.getByRole('group', { name: 'Quais regiões?' }).getByLabel('Ombro').check();
      await p.getByRole('button', { name: 'Continuar' }).click();
      await expect(p.getByText('Dê a nota da dor de hoje na região marcada.')).toBeVisible();
      await p.getByRole('group', { name: /E hoje, dói no ombro/ }).getByLabel('7', { exact: true }).check();
      await p.getByRole('button', { name: 'Continuar' }).click();
      await expect(p.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
    },
  });
  // "Restrições" não pergunta a dor de novo: só mostra o resumo (o teste passou por ela).
  await page.getByText('Sobre o programa: avisos e o porquê').click();
  await expect(page.getByText(/peito 0 de \d+ séries, porque os exercícios que carregam o ombro ficaram de fora por causa da dor no ombro \(7 hoje\)/)).toBeVisible();
  await expect(page.getByText(/Procure avaliação profissional; quando a dor baixar/)).toBeVisible();
});

test('cadastro sem nenhuma condição: 0 caractere digitado e até 15 toques, sem contar a tela de equipamento (critério 1)', async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __toques: number; __caracteres: number };
    w.__toques = 0;
    w.__caracteres = 0;
    addEventListener('pointerdown', () => location.pathname !== '/comecar/inventario' && w.__toques++, true);
    addEventListener('beforeinput', (e) => (w.__caracteres += ((e as InputEvent).data ?? '').length), true);
    addEventListener('keydown', (e) => e.key.length === 1 && w.__caracteres++, true);
  });
  await ana(page);
  const { toques, caracteres } = await page.evaluate(() => {
    const w = window as unknown as { __toques: number; __caracteres: number };
    return { toques: w.__toques, caracteres: w.__caracteres };
  });
  expect(caracteres).toBe(0);
  expect(toques).toBeLessThanOrEqual(15);
});

test('atalho "academia completa": nada vem marcado, o toque marca o conjunto, os "às vezes tem" ficam desmarcados e os detalhes continuam', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/inventario');
  for (const a of ['Casa com halteres e elásticos', 'Condomínio com multifuncional', 'Academia completa'])
    await expect(page.getByRole('button', { name: a })).toHaveAttribute('aria-pressed', 'false');
  // A esteira saiu da lista (continua só na foto).
  await expect(page.getByLabel('Esteira', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Academia completa' }).click();
  await expect(page.getByRole('button', { name: 'Academia completa' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByLabel('Leg press', { exact: true })).toBeChecked();
  // O que a Ana já tinha marcado continua marcado.
  await expect(page.getByLabel('Halteres fixos', { exact: true })).toBeChecked();
  const asVezes = page.getByRole('group', { name: /Às vezes tem/ });
  for (const x of ['Kettlebell', 'Elásticos', 'Bola suíça', 'Suspensão (TRX)']) await expect(asVezes.getByLabel(x, { exact: true })).not.toBeChecked();
  // A pergunta única da menor anilha aparece (leg press, hack, smith…), sem resposta marcada.
  const anilha = page.getByRole('group', { name: 'Qual a menor anilha?' });
  for (const r of await anilha.getByRole('radio').all()) await expect(r).not.toBeChecked();
  await anilha.getByLabel('1,25 kg', { exact: true }).check();
  // Os detalhes que mudam o programa continuam sendo perguntados.
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByText(/Há \d detalhes para completar/)).toBeVisible();
  await page.getByRole('group', { name: 'Onde fica a polia?' }).getByLabel('Regulável').check();
  await page.getByRole('group', { name: /O banco também declina/ }).getByLabel('Sim').check();
  await page.getByRole('group', { name: /O voador também vira/ }).getByLabel('Sim').check();
  await page.getByRole('group', { name: /braço fica acima da cabeça/ }).getByLabel('Não').check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'O que evitar (opcional)' })).toBeVisible();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
});

test('escolher uma opção calculada gera o programa de novo com o novo perfil', async ({ page }) => {
  await ana(page, { minutos: '40' });
  // Os ajustes ficam recolhidos numa faixa; nenhuma opção vem escolhida.
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ver opções' }).click();
  const ajustes = page.getByRole('region', { name: 'Ajustes possíveis' });
  await ajustes.getByRole('button', { name: /^4 treinos de 40 min/ }).click();
  await expect(page.getByRole('status')).toContainText('4 treinos de 40 min');
  await expect(page.getByRole('list', { name: 'Resumo' })).toContainText('4x por semana');
  // Com 4 dias, a recomendada é Superior/Inferior 2x.
  await expect(page.getByRole('tab', { name: 'Superior A', exact: true })).toBeVisible();

  // "Manter" recolhe a faixa; dá para reabrir em "Sobre o programa".
  const verOpcoes = page.getByRole('button', { name: 'Ver opções' });
  if (await verOpcoes.isVisible()) {
    await verOpcoes.click();
    await page.getByRole('button', { name: /^Manter/ }).click();
    await expect(verOpcoes).toBeHidden();
    await page.getByText('Sobre o programa: avisos e o porquê').click();
    await page.getByRole('button', { name: 'Ver ajustes possíveis' }).click();
    await expect(page.getByRole('region', { name: 'Ajustes possíveis' })).toBeVisible();
  }
});

test('recarregar a página mantém perfil, inventário e programa', async ({ page }) => {
  await ana(page);
  const antes = await page.locator('main').innerText();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  expect(await page.locator('main').innerText()).toBe(antes);
  // A raiz abre direto no programa.
  await page.goto('/');
  await expect(page).toHaveURL(/\/programa$/);
  // E as respostas continuam nas telas do perfil.
  await page.goto('/comecar/inventario');
  await expect(page.getByLabel('Halteres fixos', { exact: true })).toBeChecked();
  await expect(page.getByRole('group', { name: 'O mais pesado' }).getByLabel('12 kg', { exact: true })).toBeChecked();
});

test('exportar, apagar e importar devolve o mesmo estado', async ({ page }) => {
  await ana(page);
  const programa = await page.locator('main').innerText();
  await page.getByRole('link', { name: 'Meus dados' }).click();

  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  expect(download.suggestedFilename()).toMatch(/^treino-mvp-\d{4}-\d{2}-\d{2}\.json$/);
  const arquivo = await download.path();
  const exportado = JSON.parse(await (await import('node:fs/promises')).readFile(arquivo, 'utf8'));

  await page.getByRole('button', { name: 'Apagar todos os dados' }).click();
  await page.getByRole('button', { name: 'Sim, apagar tudo' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino, com o equipamento que você tem' })).toBeVisible();

  await page.goto('/dados');
  await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles(arquivo);
  await page.getByRole('button', { name: 'Importar dados' }).click();
  await expect(page.getByRole('status')).toHaveText('Dados importados.');

  const [download2] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  const reexportado = JSON.parse(await (await import('node:fs/promises')).readFile(await download2.path(), 'utf8'));
  expect(reexportado.estado).toEqual(exportado.estado);

  await page.getByRole('link', { name: 'Meu programa' }).click();
  expect(await page.locator('main').innerText()).toBe(programa);
});

test('importar um arquivo inválido não altera os dados', async ({ page }) => {
  await ana(page);
  await page.goto('/dados');
  await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles({ name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"app":"outro"}') });
  await page.getByRole('button', { name: 'Importar dados' }).click();
  await expect(page.getByRole('alert')).toContainText('Seus dados atuais não foram alterados');
  await page.goto('/');
  await expect(page).toHaveURL(/\/programa$/);
});

test('equipamento por toque: anilhas com contador e valor fora da lista em "Outro"', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/inventario');
  await page.getByLabel('Anilhas e manoplas', { exact: true }).check();
  const detalhes = page.getByRole('region', { name: 'Detalhes: Anilhas e manoplas' });
  await detalhes.getByRole('group', { name: 'Quantas manoplas?' }).getByLabel('2').check();
  await detalhes.getByRole('group', { name: 'Peso de cada manopla' }).getByLabel('Outro').check();
  await detalhes.getByLabel('Peso de cada manopla: outro valor').fill('1.8');
  await detalhes.getByRole('button', { name: 'Mais anilhas de 5 kg' }).click();
  await detalhes.getByRole('button', { name: 'Mais anilhas de 5 kg' }).click();
  await expect(detalhes.getByLabel('Quantidade de anilhas de 5 kg')).toHaveText('4');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'O que evitar (opcional)' })).toBeVisible();
  await page.goto('/comecar/inventario');
  await expect(page.getByLabel('Peso de cada manopla: outro valor')).toHaveValue('1.8');
  await expect(page.getByLabel('Quantidade de anilhas de 5 kg')).toHaveText('4');
});

test('catálogo do R0c: equipamento novo sem desenho, estações do multifuncional e cartão de texto do exercício sem animação', async ({ page }) => {
  await ana(page, {
    equipamentoExtra: async (p) => {
      // Equipamento novo, ainda sem desenho: o cartão mostra só o nome.
      const hack = p.getByLabel('Hack', { exact: true });
      await hack.check();
      await expect(p.locator('label.cartao-eq', { has: hack }).locator('svg')).toHaveCount(0);
      // Multifuncional: sem estação marcada, a tela pede uma.
      await p.getByLabel('Multifuncional', { exact: true }).check();
      await p.getByRole('button', { name: 'Continuar' }).click();
      await expect(p.getByText('Marque pelo menos uma estação do multifuncional.')).toBeVisible();
      await p.getByRole('group', { name: 'Quais estações o seu tem?' }).getByLabel('Extensora').check();
      // Polia simples: a altura (no alto, embaixo ou regulável).
      await p.getByLabel('Polia simples', { exact: true }).check();
      await p.getByRole('group', { name: 'Onde fica a polia?' }).getByLabel('Embaixo').check();
    },
  });
  const painel = page.getByRole('tabpanel');
  // A iniciante agacha no hack (estável), que ainda não tem animação: cartão de texto, nunca animação improvisada.
  const cartao = painel.locator('li.cartao-ex', { has: page.getByRole('heading', { name: /Agachamento no hack/ }) });
  await expect(cartao).toBeVisible();
  await cartao.getByText('Detalhes', { exact: true }).click();
  await cartao.getByText(/Como fazer \(cartão de texto/).click();
  await expect(cartao.getByText('Montagem segura')).toBeVisible();
  await expect(cartao.getByText(/Solte a trava de segurança/)).toBeVisible();
  // As alternativas mostram 3 e guardam o resto em "ver mais".
  await expect(cartao.getByText(/^Ver mais \d+ opç/)).toBeVisible();
  // A extensora vem da estação do multifuncional (no dia B).
  await page.getByRole('tab', { name: 'Corpo todo B', exact: true }).click();
  await expect(painel.getByRole('heading', { name: /Cadeira extensora/ })).toBeVisible();
});

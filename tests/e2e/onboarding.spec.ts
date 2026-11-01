import { expect, test } from '@playwright/test';
import { ana, triagem } from './jornada';

test('do zero ao programa em menos de 5 minutos (persona Ana)', async ({ page }) => {
  const inicio = Date.now();
  await ana(page);
  expect(Date.now() - inicio).toBeLessThan(5 * 60_000);

  // Vai direto ao treino: abas por dia e cartões com séries × repetições.
  for (const dia of ['Corpo todo A', 'Corpo todo B', 'Corpo todo C']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toHaveAttribute('aria-selected', 'true');
  const painel = page.getByRole('tabpanel');
  // Semana 1 (fase de aprendizado da iniciante): menos séries que o programa completo.
  await expect(painel.locator('.series').first()).toHaveText('3 × 8–12 cada lado');
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
  await expect(page).toHaveURL(/\/guia\/bulgaro$/);
});

test('divisão: as opções aparecem sem nada marcado, a recomendada vem explicada e a escolha vira o programa', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagem(page);
  await page.getByRole('group', { name: /sem parar/ }).getByLabel('Menos de 6 meses').check();
  await page.getByRole('group', { name: /treinando agora/ }).getByLabel(/^Estou treinando/).check();
  await page.getByRole('group', { name: /confiança na técnica/ }).getByLabel(/^Sim/).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('group', { name: /Quantos dias/ }).getByLabel('3 dias').check();
  await page.getByLabel('Quantos minutos por treino?').fill('60');
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
  await page.getByRole('group', { name: /dor em alguma articulação/ }).getByLabel('Não').check();
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

test('"sim" só no osteoarticular pede as regiões em vez de bloquear', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagem(page, { simEm: ['osso, articulação'] });
  await expect(page.getByText('Marque pelo menos uma região com problema.')).toBeVisible();
  await page.getByRole('group', { name: 'Quais regiões?' }).getByLabel('Ombro').check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
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
  await expect(page.getByRole('heading', { name: 'Dores e o que evitar' })).toBeVisible();
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

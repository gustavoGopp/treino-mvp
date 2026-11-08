import { expect, test } from '@playwright/test';
import { abrirExercicio, ana, confirmarNaoMarcadas, folhaPronta, sobreOPrograma, triagem, verAvisos } from './jornada';

test('do zero ao programa em menos de 5 minutos (persona Ana)', async ({ page }) => {
  const inicio = Date.now();
  await ana(page);
  expect(Date.now() - inicio).toBeLessThan(5 * 60_000);

  // Vai direto ao treino: abas por dia e a lista com séries × repetições; o resto fica na folha de cada exercício.
  for (const dia of ['Corpo todo A', 'Corpo todo B', 'Corpo todo C']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toHaveAttribute('aria-selected', 'true');
  const painel = page.getByRole('tabpanel');
  await expect(painel.locator('.series').first()).toHaveText(/^\d × 8–12 cada lado$/);
  // Exercício com animação mostra a imagem.
  await expect(painel.locator('.miniatura svg').first()).toBeVisible();
  // Sem animação aprovada: "guia em texto" (ponte com halter), nunca uma animação improvisada. A flexão de joelho
  // deslizante ganhou a animação em 04/11/2026.
  await expect(painel.locator('.miniatura.vazia')).toHaveCount(1);
  // Semana 1 (fase de aprendizado da iniciante): RIR 3–4; o porquê, com o selo de evidência, fica na folha do exercício.
  let folha = await abrirExercicio(page, /Agachamento búlgaro/);
  await expect(folha.locator('.sub-rx')).toContainText('RIR 3–4');
  await expect(folha.locator('.selo').first()).toBeVisible();
  await folha.getByRole('button', { name: 'Fechar' }).click();
  // Outro dia.
  await page.getByRole('tab', { name: 'Corpo todo B', exact: true }).click();
  // O stiff (bilateral) no B desde a sessão de equipamento mínimo: o stiff unilateral saiu para a flexão deslizante no A.
  await expect(painel.getByRole('button', { name: /Stiff com halteres/ })).toBeVisible();
  // Avisos de meta por músculo em "Sobre o programa".
  folha = await sobreOPrograma(page);
  await expect(folha.getByText(/Abaixo da meta/).first()).toBeVisible();
  await folha.getByRole('button', { name: 'Fechar' }).click();

  await page.getByRole('tab', { name: 'Corpo todo A', exact: true }).click();
  folha = await abrirExercicio(page, /Agachamento búlgaro/);
  await folha.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/bulgaro\?de=programa&dia=corpo-a&ex=bulgaro$/);
  await expect(page.getByTestId('prescricao')).toContainText('RIR 3–4');
});

test('divisão: escolhida em Meus dados, sem nada marcado, com a recomendada explicada, e a escolha vira o programa', async ({ page }) => {
  await ana(page, { minutos: '60' });
  // Saiu do cadastro (design v2, item E): no cadastro não aparece.
  await page.goto('/dados');
  await page.getByRole('link', { name: 'Mudar a rotina ou a divisão' }).click();
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
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('button', { name: 'Atualizar', exact: true }).click();
  for (const dia of ['Superior A', 'Inferior A', 'Corpo todo']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  // A escolha fica salva na rotina.
  await page.goto('/comecar/rotina?de=dados');
  await expect(page.getByRole('group', { name: /Como prefere dividir/ }).getByLabel(/Superior\/Inferior \+ Corpo todo/)).toBeChecked();
});

test('triagem com "sim" bloqueia, e confirmar a liberação desbloqueia', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
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

test('lote 3: a saúde em uma pergunta mostra as perguntas inteiras a um toque, e "sim" sem nada marcado pede para voltar', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await expect(page.getByText('Treinar é seguro para a maioria das pessoas. Esta pergunta vê se vale falar com um profissional antes.')).toBeVisible();
  await page.getByRole('button', { name: 'Ver as perguntas completas' }).click();
  const completas = page.getByRole('dialog', { name: 'As 9 perguntas completas' });
  await expect(completas.getByRole('listitem')).toHaveCount(9);
  await expect(completas).toContainText('Você está grávida ou teve bebê nos últimos 6 meses?');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Sim, alguma (ou não tenho certeza)' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('alert')).toContainText('Nenhuma marcada. Se nenhuma vale, volte e toque em “Não, nenhuma”.');
  // marcar uma e voltar no diálogo mantém a marca; nada é salvo antes de confirmar
  await page.locator('label.opcao', { hasText: 'Dor no peito' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  const dialogo = page.getByRole('dialog', { name: 'Nenhuma destas vale para você?' });
  await expect(dialogo.getByRole('listitem')).toHaveCount(8);
  await folhaPronta(page);
  await dialogo.getByRole('button', { name: 'Voltar e marcar' }).click();
  await expect(page.locator('label.opcao', { hasText: 'Dor no peito' }).getByRole('checkbox')).toBeChecked();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
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
      // lote 3 do redesign: as não marcadas são confirmadas, uma a uma, com a pergunta inteira
      const dialogo = p.getByRole('dialog', { name: 'Nenhuma destas vale para você?' });
      await expect(dialogo).toContainText('Você não marcou estas 8:');
      await expect(dialogo).toContainText('Algum médico já disse que você tem problema no coração ou pressão alta?');
      await confirmarNaoMarcadas(p);
      await expect(p.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
    },
  });
  // "Restrições" não pergunta a dor de novo: só mostra o resumo (o teste passou por ela).
  await sobreOPrograma(page);
  await expect(page.getByText(/peito 0 de \d+ séries por semana\. Os exercícios que carregam o ombro saíram por causa da dor no ombro \(7 hoje\)/)).toBeVisible();
  await expect(page.getByText(/Procure avaliação profissional\. Quando a dor baixar/)).toBeVisible();
});

test('cadastro sem nenhuma condição: 0 caractere digitado e até 13 toques, sem contar a tela de equipamento (critério 1)', async ({ page }) => {
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
  // Design v2: a triagem em lista (1 toque) e uma pergunta por vez; eram até 15.
  expect(toques).toBeLessThanOrEqual(13);
});

test('atalho "academia completa": nada vem marcado, o toque marca o conjunto e os detalhes vêm com valores típicos', async ({ page }) => {
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
  for (const x of ['Kettlebell', 'Elásticos', 'Bola suíça', 'Suspensão (TRX) ou argolas']) await expect(asVezes.getByLabel(x, { exact: true })).not.toBeChecked();
  // A pergunta única da menor anilha aparece (leg press, hack, smith…), sem resposta marcada.
  const anilha = page.getByRole('group', { name: 'Qual a menor anilha?' });
  for (const r of await anilha.getByRole('radio').all()) await expect(r).not.toBeChecked();
  await anilha.getByLabel('1,25 kg', { exact: true }).check();
  // Design v2 (item D): os detalhes vêm com valores típicos, editáveis; o lado conservador nos "sim ou não".
  await expect(page.getByRole('group', { name: 'Onde fica a polia?' }).getByLabel('Regulável')).toBeChecked();
  await expect(page.getByRole('group', { name: /O voador também vira/ }).getByLabel('Não')).toBeChecked();
  await expect(page.getByRole('group', { name: /O banco também declina/ }).getByLabel('Não')).toBeChecked();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
});

test('escolher uma opção calculada gera o programa de novo com o novo perfil', async ({ page }) => {
  await ana(page, { minutos: '40' });
  // Os ajustes entram na linha de aviso (um por vez); nenhuma opção vem escolhida.
  await expect(page.getByRole('tab', { name: 'Corpo todo A', exact: true })).toBeVisible();
  await expect(page.locator('.aviso-linha')).toContainText('Dá para ajustar.');
  let avisos = await verAvisos(page);
  await avisos.getByRole('region', { name: 'Ajustes possíveis' }).getByRole('button', { name: /^4 treinos de 40 min/ }).click();
  await expect(page.getByRole('status')).toContainText('4 treinos de 40 min');
  await expect((await sobreOPrograma(page)).getByRole('list', { name: 'Resumo' })).toContainText('4x por semana');
  await page.getByRole('dialog', { name: 'Sobre o programa' }).getByRole('button', { name: 'Fechar' }).click();
  // Com 4 dias, a recomendada é Superior/Inferior 2x.
  await expect(page.getByRole('tab', { name: 'Superior A', exact: true })).toBeVisible();

  // "Manter" tira o aviso da tela; dá para reabrir em "Sobre o programa".
  if (await page.locator('.aviso-linha').filter({ hasText: 'Dá para ajustar.' }).isVisible()) {
    avisos = await verAvisos(page);
    await avisos.getByRole('button', { name: /^Manter/ }).click();
    await expect(page.locator('.aviso-linha')).toHaveCount(0);
    await (await sobreOPrograma(page)).getByRole('button', { name: 'Ver ajustes possíveis' }).click();
    await expect(page.getByRole('region', { name: 'Ajustes possíveis' })).toBeVisible();
  }
});

test('recarregar a página mantém perfil, inventário e programa', async ({ page }) => {
  await ana(page);
  const antes = await page.locator('main').innerText();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  // as miniaturas chegam num pedaço próprio, alguns milissegundos depois (lote técnico do redesign)
  await expect.poll(() => page.locator('main').innerText()).toBe(antes);
  // A raiz abre direto no programa.
  await page.goto('/');
  await expect(page).toHaveURL(/\/programa$/);
  // E as respostas continuam nas telas do perfil.
  await page.goto('/comecar/inventario');
  await expect(page.getByLabel('Halteres fixos', { exact: true })).toBeChecked();
  await expect(page.getByRole('group', { name: 'O mais pesado' }).getByLabel('12 kg', { exact: true })).toBeChecked();
});

test('Meus dados mostra a versão do app e a data da publicação', async ({ page }) => {
  // R3: para a pessoa conferir se o celular já está com a versão nova.
  await page.goto('/dados');
  await expect(page.getByText(/^Versão do app: ([0-9a-f]{7}|local), publicada em \d{2}\/\d{2}\/\d{4}\.$/)).toBeVisible();
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
  await expect(page.getByRole('heading', { name: 'Treine onde estiver, com o que tiver' })).toBeVisible();

  await page.goto('/dados');
  await page.getByLabel('Arquivo exportado pelo treino-mvp').setInputFiles(arquivo);
  await page.getByRole('button', { name: 'Importar dados' }).click();
  await expect(page.getByRole('status')).toHaveText('Dados importados.');

  const [download2] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Exportar meus dados (JSON)' }).click()]);
  const reexportado = JSON.parse(await (await import('node:fs/promises')).readFile(await download2.path(), 'utf8'));
  expect(reexportado.estado).toEqual(exportado.estado);

  await page.getByRole('navigation', { name: 'Seções' }).getByRole('link', { name: 'Treino' }).click();
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
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  await page.goto('/comecar/inventario');
  await expect(page.getByLabel('Peso de cada manopla: outro valor')).toHaveValue('1.8');
  await expect(page.getByLabel('Quantidade de anilhas de 5 kg')).toHaveText('4');
});

test('catálogo do R0c: equipamento novo sem desenho, estações do multifuncional e cartão de texto do exercício sem animação', async ({ page }) => {
  await ana(page, {
    equipamentoExtra: async (p) => {
      // Equipamento novo, ainda sem desenho: o cartão mostra só o nome.
      const hack = p.getByLabel('Hack ou pendular', { exact: true });
      await hack.check();
      await expect(p.locator('label.cartao-eq', { has: hack }).locator('svg')).toHaveCount(0);
      // Multifuncional: sem estação marcada, a tela pede uma.
      await p.getByLabel('Multifuncional', { exact: true }).check();
      await p.getByRole('button', { name: 'Gerar meu programa' }).click();
      await expect(p.getByText('Marque pelo menos uma estação do multifuncional.')).toBeVisible();
      await p.getByRole('group', { name: 'Quais estações o seu tem?' }).getByLabel('Extensora').check();
      // Polia simples: a altura (no alto, embaixo ou regulável).
      await p.getByLabel('Polia simples', { exact: true }).check();
      await p.getByRole('group', { name: 'Onde fica a polia?' }).getByLabel('Embaixo').check();
    },
  });
  const painel = page.getByRole('tabpanel');
  // A iniciante agacha no hack (estável), que ainda não tem animação: cartão de texto, nunca animação improvisada.
  // lote 4 do redesign: a lista abre a folha do exercício; lote 2: a montagem segura vem sempre aberta.
  const cartao = await abrirExercicio(page, /Agachamento no hack/);
  await expect(cartao.getByText('Montagem segura')).toBeVisible();
  await expect(cartao.getByText(/Solte a trava de segurança/)).toBeVisible();
  // As alternativas mostram 3 e guardam o resto em "ver mais".
  await expect(cartao.getByText(/^Ver mais \d+ opç/)).toBeVisible();
  await cartao.getByRole('button', { name: 'Fechar' }).click();
  // A extensora vem da estação do multifuncional (no dia B).
  await page.getByRole('tab', { name: 'Corpo todo B', exact: true }).click();
  await expect(painel.getByRole('button', { name: /Cadeira extensora/ })).toBeVisible();
});

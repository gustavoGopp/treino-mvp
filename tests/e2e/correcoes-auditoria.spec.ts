import { expect, test, type Page } from '@playwright/test';
import { ana, proximoExercicio, terminarTreino, triagem, verAvisos } from './jornada';

// Três correções da auditoria de 12/11/2026, cada uma com o caso que falhava.

async function comecar(page: Page, dia = 'Corpo todo A') {
  await page.getByRole('tab', { name: dia, exact: true }).click();
  await page.getByRole('button', { name: `Começar o treino ${dia}` }).click();
  await expect(page).toHaveURL(/\/treino$/);
}

type Guardado = { rotina?: Record<string, unknown> } & Record<string, unknown>;

/** Lê ou regrava o estado guardado no aparelho (IndexedDB), para montar um caso que o cadastro não alcança num toque. */
async function estadoGuardado(page: Page, mudar?: Record<string, unknown>): Promise<Guardado> {
  return page.evaluate(async (m) => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    const loja = (modo: IDBTransactionMode) => db.transaction('keyval', modo).objectStore('keyval');
    const atual = await new Promise<Guardado>((ok) => {
      const r = loja('readonly').get('estado');
      r.onsuccess = () => ok(r.result);
    });
    if (!m) return atual;
    const novo = { ...atual, rotina: { ...atual.rotina, ...m } };
    await new Promise<void>((ok) => {
      const r = loja('readwrite').put(novo, 'estado');
      r.onsuccess = () => ok();
    });
    return novo;
  }, mudar);
}

// Segurança: antes, o treino reabria no 1º exercício incompleto, e a nota de dor dada depois do guia interrompia o errado.
test('"Senti algo" tocado no guia volta ao exercício que estava aberto, não ao primeiro incompleto', async ({ page }) => {
  await ana(page);
  await comecar(page);
  const titulo = page.getByRole('heading', { level: 1 });
  const primeiro = (await titulo.innerText()).trim();
  // anda até um exercício com guia animado que não seja o primeiro
  let aberto = primeiro;
  for (let i = 0; i < 6; i++) {
    await proximoExercicio(page);
    await expect(titulo).not.toHaveText(aberto);
    aberto = (await titulo.innerText()).trim();
    if (await page.getByRole('link', { name: 'Ver como fazer' }).isVisible()) break;
  }
  expect(aberto).not.toBe(primeiro);
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await expect(page).toHaveURL(/\/guia\/.+de=treino/);
  await page.getByRole('button', { name: 'Senti algo' }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await expect(page.getByRole('dialog', { name: 'O que você sentiu?' })).toBeVisible();
  await expect(titulo).toHaveText(aberto);
});

// Segurança: antes, as respostas antigas (sem "sim") continuavam salvas, e bastava sair da tela para o programa seguir.
test('refazer a triagem com um "sim" que bloqueia pausa o programa, mesmo saindo da tela sem confirmar', async ({ page }) => {
  await ana(page);
  await page.goto('/comecar/triagem');
  await triagem(page, { simEm: ['coração'] });
  await expect(page.getByRole('heading', { name: 'Vamos pausar o programa automático' })).toBeVisible();
  await page.goto('/programa');
  await expect(page.getByRole('heading', { name: 'Programa pausado' })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toHaveCount(0);
});

// Antes, escolher um ajuste regravava a rotina sem o objetivo, e o programa voltava a "ganhar músculo" sem avisar.
test('escolher um ajuste do programa mantém o objetivo da pessoa', async ({ page }) => {
  await ana(page, { minutos: '40' });
  await estadoGuardado(page, { objetivo: 'forca' });
  await page.reload();
  const avisos = await verAvisos(page);
  await avisos.getByRole('region', { name: 'Ajustes possíveis' }).getByRole('button', { name: /^4 treinos de 40 min/ }).click();
  await expect(page.getByRole('status')).toContainText('4 treinos de 40 min');
  await expect.poll(async () => (await estadoGuardado(page)).rotina).toMatchObject({ diasSemana: 4, objetivo: 'forca' });
});

// Auditoria de 12/11/2026: com um treino aberto, gerar o programa de novo ("algo a evitar", o equipamento, "Atualizar",
// a semana com menos dias) trocava os exercícios do dia por baixo do treino. Agora a mudança fica guardada e o
// programa só é gerado de novo depois do treino.
test('com um treino aberto, o programa não é gerado de novo: a mudança espera o treino terminar', async ({ page }) => {
  await ana(page);
  await comecar(page);
  const titulo = page.locator('h1.titulo');
  await expect(titulo).toHaveText('Agachamento búlgaro com apoio');
  await page.getByRole('link', { name: /Voltar ao início/ }).click();
  await page.getByRole('navigation', { name: 'Seções' }).getByRole('link', { name: 'Meus dados' }).click();
  await page.getByRole('link', { name: 'Algo a evitar' }).click();
  await page.getByText('Algum exercício que você quer evitar? (opcional)').click();
  await page.getByLabel('Agachamento búlgaro com apoio', { exact: true }).check();
  await page.getByRole('button', { name: 'Salvar e gerar o programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  // o programa salvo continua o mesmo, e a tela diz por quê; nada de "Atualizar" agora
  await expect(page.getByText('O programa será atualizado depois do treino em andamento.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Atualizar', exact: true })).toHaveCount(0);
  await expect(page.getByRole('tabpanel').getByRole('button', { name: /Agachamento búlgaro com apoio/ })).toHaveCount(1);
  // o treino segue no mesmo exercício, com a prescrição dele
  await page.getByRole('link', { name: /^Continuar o treino/ }).click();
  await expect(titulo).toHaveText('Agachamento búlgaro com apoio');
  // terminado o treino, a atualização é oferecida e tira o exercício
  await terminarTreino(page);
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible();
  await page.goto('/programa');
  await page.getByRole('button', { name: 'Atualizar', exact: true }).click();
  await expect(page.getByRole('tabpanel').getByRole('button', { name: /Agachamento búlgaro com apoio/ })).toHaveCount(0);
});

// Auditoria de 12/11/2026: com todas as regiões excluídas pela dor, o programa saía "ok" com dias vazios e o texto
// "só o abdominal é possível neste dia". Agora não há programa para começar, e a tela diz o motivo e o próximo passo.
test('com dor acima de 5 em todas as regiões, a tela não oferece um treino vazio: diz o motivo e leva à triagem', async ({ page }) => {
  await ana(page);
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toBeVisible();
  await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    const loja = (modo: IDBTransactionMode) => db.transaction('keyval', modo).objectStore('keyval');
    const atual = await new Promise<{ triagem: { respostas: Record<string, boolean> } }>((ok) => {
      const r = loja('readonly').get('estado');
      r.onsuccess = () => ok(r.result);
    });
    const regioes = ['ombro', 'cotovelo', 'punho', 'lombar', 'quadril', 'joelho', 'tornozelo'];
    const triagem = { respostas: { ...atual.triagem.respostas, osteoarticular: true }, dores: regioes.map((articulacao) => ({ articulacao, nota: 7 })), liberacaoConfirmada: true };
    await new Promise<void>((ok) => {
      const r = loja('readwrite').put({ ...atual, triagem }, 'estado');
      r.onsuccess = () => ok();
    });
  });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Programa pausado' })).toBeVisible();
  await expect(page.getByText(/nenhum exercício é possível hoje/)).toBeVisible();
  await expect(page.getByText(/só o abdominal/)).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^Começar o treino/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Rever a triagem' })).toBeVisible();
});

const idsRepetidos = (page: Page) =>
  page.evaluate(() => {
    const vistos = new Map<string, number>();
    document.querySelectorAll('[id]').forEach((el) => vistos.set(el.id, (vistos.get(el.id) ?? 0) + 1));
    return [...vistos].filter(([, n]) => n > 1).map(([id]) => id);
  });

// Auditoria de 12/11/2026: ids repetidos nas miniaturas do programa e nos controles de carga do drop set.
test('nenhum id se repete na tela do programa, com as miniaturas desenhadas, nem no drop set', async ({ page }) => {
  await ana(page);
  // as miniaturas chegam do Worker: espera a 1ª ter desenho, e as listras de um músculo que ajuda
  await expect(page.locator('.miniatura svg').first()).toBeVisible();
  await expect.poll(() => page.locator('.miniatura svg [id]').count()).toBeGreaterThan(1);
  expect(await idsRepetidos(page)).toEqual([]);
  // cada desenho pinta as listras com o padrão dele
  const listrado = page.locator('.miniatura svg .ea-mh, .miniatura svg .eb-mh').first();
  if (await listrado.count()) expect(await listrado.evaluate((el) => getComputedStyle(el).fill)).toMatch(/url\(.*#mh-listras-/);

  // o 1º exercício com 1 série em drop set: a série e as duas quedas têm um controle de carga cada
  await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    const loja = (modo: IDBTransactionMode) => db.transaction('keyval', modo).objectStore('keyval');
    type Guardado = { programa: { programa: { fases: unknown[]; dias: { exercicios: Record<string, unknown>[] }[] } } };
    const atual = await new Promise<Guardado>((ok) => {
      const r = loja('readonly').get('estado');
      r.onsuccess = () => ok(r.result);
    });
    atual.programa.programa.fases = [];
    // um exercício com carga em halter (o supino), para o drop set poder reduzir a carga
    const dia = atual.programa.programa.dias[0]!;
    const i = dia.exercicios.findIndex((x) => x.exId === 'supino-reto');
    const [x] = dia.exercicios.splice(i, 1);
    dia.exercicios.unshift({ ...x, series: 1, dropSet: true });
    await new Promise<void>((ok) => {
      const r = loja('readwrite').put(atual, 'estado');
      r.onsuccess = () => ok();
    });
  });
  await page.reload();
  await comecar(page);
  await expect(page.getByRole('group', { name: 'Drop set (opcional)' })).toBeVisible();
  await expect(page.locator('.quedas .queda')).toHaveCount(2);
  expect(await idsRepetidos(page)).toEqual([]);
});

// Auditoria de 12/11/2026: a folha fica fora da página (portal). As regras de .app não a alcançavam (a cor dos links,
// prefers-reduced-motion), a folha de baixo continuava ao alcance com outra aberta por cima, e o foco se perdia
// quando o botão que abriu a folha já tinha saído da página.
test('a folha recebe as regras de .app, a de baixo fica inerte e o foco volta a quem abriu', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await ana(page);
  // uma folha (o exercício) e outra por cima (o selo de uma regra)
  await page.getByRole('tabpanel').getByRole('button', { name: /Agachamento búlgaro com apoio/ }).first().click();
  const deBaixo = page.getByRole('dialog').first();
  await expect(deBaixo).toBeVisible();
  const selo = deBaixo.getByRole('button', { name: /ver de onde vem$/ }).first();
  await selo.click();
  const deCima = page.getByRole('dialog', { name: 'De onde vem isto' });
  await expect(deCima).toBeVisible();
  // a de baixo fica inerte enquanto a de cima está aberta
  await expect(page.locator('body > .veu')).toHaveCount(2);
  expect(await page.locator('body > .veu').first().evaluate((e) => (e as HTMLElement).inert)).toBe(true);
  expect(await page.locator('body > .veu').last().evaluate((e) => (e as HTMLElement).inert)).toBe(false);
  // as regras de .app chegam ao conteúdo: o link das fontes tem a cor de link do app, e nada tem transição
  const link = deCima.getByRole('link').first();
  await expect(link).toBeVisible();
  const cores = await link.evaluate((a) => {
    const prova = document.createElement('span');
    prova.style.color = 'var(--link)';
    a.parentElement!.appendChild(prova);
    const esperado = getComputedStyle(prova).color;
    prova.remove();
    return { link: getComputedStyle(a).color, esperado, transicao: getComputedStyle(a).transitionDuration };
  });
  expect(cores.link).toBe(cores.esperado);
  expect(cores.transicao).toBe('0s');
  // fechar a de cima devolve o foco ao selo, e a de baixo volta ao alcance
  await page.keyboard.press('Escape');
  await expect(deCima).toHaveCount(0);
  await expect(selo).toBeFocused();
  expect(await page.locator('body > .veu').first().evaluate((e) => (e as HTMLElement).inert)).toBe(false);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);

  // no treino: "⋯" → "Trocar exercício" troca uma folha pela outra; ao fechar, o foco volta ao "⋯"
  await comecar(page);
  const mais = page.getByRole('button', { name: /^Mais opções/ });
  await mais.click();
  await page.getByRole('dialog', { name: 'Mais opções' }).getByRole('button', { name: 'Trocar exercício' }).click();
  const trocar = page.getByRole('dialog', { name: 'Trocar só neste treino por:' });
  await expect(trocar).toBeVisible();
  await trocar.getByRole('button', { name: 'Fechar' }).click();
  await expect(trocar).toHaveCount(0);
  await expect(mais).toBeFocused();
});

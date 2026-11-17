import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { ana, folhaPronta, proximoExercicio, terminarTreino } from '../../../../tests/e2e/jornada';

// Colhe do app de verdade os textos e os números que o protótipo da direção B mostra fora do início e da série: a folha
// do "por quê?" (a regra, o selo e as fontes), a folha do "Senti algo", o fim do treino e a semana. A persona fictícia
// Ana faz o treino A inteiro pela interface, com o relógio do navegador adiantado a cada descanso; o que sai nas telas
// é o que as regras do app respondem a esse treino. Nada é escrito à mão no protótipo.
// Uso: COLHER=1 npx playwright test -c scripts/design/frontend-novo/playwright.config.ts --trace off
// Saída: docs/revisoes/frontend-novo/prototipos/comum/colhido.js

const SAIDA = resolve(process.cwd(), 'docs/revisoes/frontend-novo/prototipos/comum');
// a carga que a Ana escolhe em cada exercício do dia A (kg por halter); o 5º é feito com o peso do corpo
const CARGAS = ['3', '8', '5', '6', null, '3'];

const textos = (l: Locator) => l.evaluateAll((es) => es.map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim()).filter(Boolean));

/** A folha do "por quê?" aberta: o texto da tela, a regra por extenso, o sentido do selo e as fontes. */
async function folhaPorQue(page: Page) {
  const folha = page.getByRole('dialog').last();
  await expect(folha.locator('.selo-folha .regra').first()).toBeVisible();
  await expect(folha.getByText('Carregando as fontes…')).toHaveCount(0);
  return folha.evaluate((f) => {
    const t = (e: Element | null) => (e?.textContent ?? '').replace(/\s+/g, ' ').trim();
    return {
      titulo: t(f.querySelector('h2')),
      texto: Array.from(f.querySelectorAll('.porque-texto p')).map(t),
      regras: Array.from(f.querySelectorAll('.selo-folha')).map((s) => ({
        regra: t(s.querySelector('.regra')),
        selo: t(s.querySelector('.sentido b')),
        sentido: t(s.querySelector('.sentido')).replace(t(s.querySelector('.sentido b')), '').trim(),
        fontes: Array.from(s.querySelectorAll('ol > li')).map((li) => {
          const leitura = li.querySelector('small');
          const copia = li.cloneNode(true) as Element;
          copia.querySelector('small')?.remove();
          return { citacao: t(copia), leitura: t(leitura).replace(/ · abrir a fonte$/, ''), link: li.querySelector('a')?.getAttribute('href') ?? null };
        }),
      })),
    };
  });
}

test('colhe do app os textos do protótipo da direção B', async ({ page }) => {
  test.setTimeout(240_000);
  // quinta-feira, 12/11/2026, 18:00 em Brasília: o relógio anda sozinho a partir daqui e é adiantado nos descansos
  await page.clock.install({ time: new Date('2026-11-12T21:00:00Z') });
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).click();
  await expect(page).toHaveURL(/\/treino$/);

  const registro = page.getByRole('region', { name: /^Série \d/ });
  const colhido: Record<string, unknown> = {};

  // --- 1º exercício, antes da 1ª série: as linhas de ajuda, o "por quê?" da reserva e o "Senti algo" ---
  await expect(page.locator('p.dica').first()).toBeVisible();
  colhido.ajudaDaSerie = (await textos(page.locator('p.dica'))).map((x) => x.replace(/por quê\?$/, '').replace(/\s*(consenso|moderada|robusta|um estudo)$/, '').trim());
  await registro.getByRole('button', { name: 'por quê?' }).click();
  await folhaPronta(page);
  colhido.porQueDaReserva = await folhaPorQue(page);
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Senti algo' }).click();
  const sentir = page.getByRole('region', { name: 'Senti algo' });
  await expect(sentir).toBeVisible();
  colhido.sentiAlgo = {
    titulo: 'O que você sentiu?',
    sinais: await textos(sentir.locator('.opcao-ajuste')),
    escala: await textos(sentir.locator('legend')),
    notas: await textos(sentir.locator('.chip-valor')),
    rodape: (await textos(sentir.locator('p.ajuda'))).map((x) => x.replace(/\s*consenso$/, '')),
  };
  await page.getByRole('button', { name: 'Senti algo' }).click();

  // --- o treino inteiro ---
  const feito: { exercicio: string; series: string[] }[] = [];
  for (let i = 0; i < CARGAS.length; i++) {
    const nome = (await page.locator('.ex-sessao h1, .ex-sessao h2').first().innerText()).replace(/\s+/g, ' ').trim();
    const descanso = 105_000;
    let primeira = true;
    while (await registro.isVisible()) {
      const carga = page.getByLabel('Carga', { exact: true });
      if (CARGAS[i] && (await carga.count()) && (await carga.evaluate((e) => e.tagName === 'SELECT')) && !(await carga.inputValue())) await carga.selectOption(CARGAS[i]!);
      if (primeira) await page.getByRole('button', { name: 'Mais uma repetição' }).click();
      const rir = registro.getByRole('radio', { name: '3', exact: true });
      if (!(await rir.isChecked())) await rir.check();
      await registro.getByRole('button', { name: /^Série feita/ }).click();
      primeira = false;
      // o descanso passa de verdade no relógio do navegador (e mais meio minuto de série)
      await page.clock.fastForward(descanso + 30_000);
      const pular = page.getByRole('button', { name: 'Pular' });
      if (await pular.isVisible()) await pular.click();
      const ok = page.getByRole('button', { name: 'Ok' });
      if (await ok.isVisible()) await ok.click();
    }
    feito.push({ exercicio: nome, series: await textos(page.getByRole('list', { name: 'Séries feitas' }).locator('li')) });
    if (i < CARGAS.length - 1) await proximoExercicio(page);
  }
  colhido.treinoFeito = feito;
  await terminarTreino(page);
  await expect(page).toHaveURL(/\/treino\/fim$/);

  // --- fim do treino ---
  const fim = page.locator('main');
  colhido.fim = {
    titulo: await page.getByRole('heading', { level: 1, name: /^Treino / }).innerText(),
    subtitulo: (await textos(fim.locator('.subtitulo')))[0],
    mudou: {
      titulo: (await textos(fim.locator('.mudou h2')))[0] ?? null,
      semana: (await textos(fim.locator('.mudou .mudou-semana b.num')))[0] ?? null,
      textos: (await textos(fim.locator('.mudou > p:not(.mudou-semana)'))).map((x) => x.replace(/\s*(consenso|moderada|robusta|um estudo)$/, '')),
      recordes: await textos(fim.locator('.marcas-hoje li')),
    },
    hojeFoi: { pergunta: (await textos(fim.locator('.hoje-foi legend')))[0], opcoes: await textos(fim.locator('.hoje-foi .opcoes button')) },
    proxima: await fim.locator('.lista-proxima li').evaluateAll((lis) =>
      lis.map((li) => {
        const t = (e: Element | null) => (e?.textContent ?? '').replace(/\s+/g, ' ').trim();
        const linha = li.querySelector(':scope > span')!.cloneNode(true) as Element;
        linha.querySelector('.porque')?.remove();
        const acao = t(li.querySelector('.acao'));
        return { nome: t(li.querySelector('b')), acao, classe: li.querySelector('.acao')?.className ?? '', resto: t(linha).replace(acao, '').replace(/^\s*·\s*/, '').trim() };
      }),
    ),
    acoes: await textos(fim.locator('a.btn, button.link-sec')),
  };
  // o "por quê?" de cada linha da próxima vez: o que foi feito hoje, o motivo e a regra com o selo e as fontes
  const porques = [];
  const linhas = fim.locator('.lista-proxima li');
  for (let i = 0; i < (await linhas.count()); i++) {
    await linhas.nth(i).getByRole('button', { name: 'por quê?' }).click();
    await folhaPronta(page);
    porques.push(await folhaPorQue(page));
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  (colhido.fim as Record<string, unknown>).porQues = porques;

  // --- semana ---
  await page.goto('/semana');
  const sem = page.locator('main');
  await expect(sem.locator('.numero-grande')).toBeVisible();
  colhido.semana = {
    periodo: (await textos(sem.locator('p.ajuda').first()))[0]!.replace(/\s*(consenso|moderada|robusta|um estudo)$/, ''),
    numero: (await textos(sem.locator('.numero-grande')))[0],
    mensagem: (await textos(sem.locator('p.fase')))[0],
    musculos: await sem.locator('.musculos li').evaluateAll((lis) =>
      lis.map((li) => {
        const t = (e: Element | null) => (e?.textContent ?? '').replace(/\s+/g, ' ').trim();
        return {
          nome: t(li.querySelector('.m-nome')),
          numero: t(li.querySelector('.m-num')),
          estado: t(li.querySelector('.m-estado')),
          classe: li.className,
          feito: (li.querySelector('.m-barra i') as HTMLElement).style.width,
          meta: (li.querySelector('.m-barra u') as HTMLElement).style.left,
        };
      }),
    ),
    notas: (await textos(sem.locator('section[aria-labelledby="musculos"] > p.ajuda'))).map((x) => x.replace(/\s*(consenso|moderada|robusta|um estudo)$/, '')),
    subiu: await textos(sem.locator('.lista-subiu li')),
  };

  mkdirSync(SAIDA, { recursive: true });
  writeFileSync(resolve(SAIDA, 'colhido.js'), '// Colhido do app por scripts/design/frontend-novo/prototipo/colher.spec.ts. Não editar.\nwindow.COLHIDO=' + JSON.stringify(colhido) + ';\n');
  writeFileSync(resolve(SAIDA, 'colhido.json'), JSON.stringify(colhido, null, 2) + '\n');
});

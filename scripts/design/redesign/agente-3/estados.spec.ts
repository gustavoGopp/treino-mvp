import { expect, test, type Page } from '@playwright/test';
import { anexarJsonl, comEstado, comecar, foto, gravarJson, medirTela, PERSONAS, preencherSerie, pularDescanso, salvarSerie, type Medicao } from './apoio';

// Agente 3: o treino estado por estado, nas 6 personas fictícias, em cada tamanho de tela. Para cada estado: o que fica
// visível sem rolar, a posição (% da altura) de "Série feita", "Senti algo", relógio e controles, e a zona do polegar.
// Saída: reports/design/redesign/agente-3/medidas-estados-<projeto>.json e as capturas em <projeto>/<persona>/.

const medidas: Medicao[] = [];
// eslint-disable-next-line no-empty-pattern
test.afterAll(async ({}, info) => {
  gravarJson(`medidas-estados-${info.project.name}.json`, medidas);
});

async function registrar(page: Page, persona: string, estado: string) {
  const m = await medirTela(page, persona, estado);
  medidas.push(m);
  anexarJsonl(`medidas-estados-${test.info().project.name}.jsonl`, m);
  await foto(page, persona, estado);
}

/** Vai para o próximo exercício até o seletor aparecer (ou acabar o treino). */
async function ateExercicioCom(page: Page, seletor: string, max = 12): Promise<boolean> {
  for (let i = 0; i < max; i++) {
    if (await page.locator(seletor).count()) return true;
    const prox = page.getByRole('button', { name: 'Próximo ›' });
    if (!(await prox.count())) return false;
    await prox.click();
  }
  return (await page.locator(seletor).count()) > 0;
}

for (const persona of PERSONAS) {
  test(`treino estado por estado: ${persona} (1ª vez: calibração)`, async ({ page }) => {
    await comEstado(page, persona, 'sem-historico');
    await comecar(page);
    await registrar(page, persona, '01-antes-serie-1');
    await preencherSerie(page);
    await registrar(page, persona, '02-durante-serie-1');
    await page.getByRole('region', { name: /^Série \d/ }).getByRole('button', { name: /^Série feita/ }).click();
    await expect(page.getByRole('region', { name: 'Descanso' })).toBeVisible();
    await registrar(page, persona, '03-descanso');
    // o descanso ajustado para +15 (prova de que o relógio e o painel não mudam de lugar)
    await page.getByRole('button', { name: '+15 s' }).click();
    await pularDescanso(page);
    await registrar(page, persona, '04-serie-2');
    // trocar exercício
    await page.getByRole('button', { name: 'Trocar exercício' }).click();
    await registrar(page, persona, '05-trocar-aberto');
    await page.getByRole('button', { name: 'Trocar exercício' }).click();
    // "Senti algo"
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await registrar(page, persona, '06-senti-algo-aberto');
    await page.getByRole('button', { name: 'Senti algo' }).click();
    // dor 4: aviso sem encerrar (ajustar)
    await page.getByRole('button', { name: 'Senti algo' }).click();
    await page.getByRole('region', { name: 'Senti algo' }).getByRole('button', { name: '4', exact: true }).click();
    await registrar(page, persona, '07-aviso-dor-4');
    // cartão de texto (se a persona tem exercício sem animação com cartão)
    if (await ateExercicioCom(page, '.cartao-texto')) {
      await registrar(page, persona, '08-cartao-fechado');
      await page.locator('.cartao-texto > summary').click();
      await registrar(page, persona, '09-cartao-aberto');
      await page.locator('.cartao-texto > summary').click();
    }
    // exercício sem guia nenhum
    await page.evaluate(() => window.scrollTo(0, 0));
  });

  test(`treino, 2ª sessão: ${persona} (sugestão de carga, drop set, fim)`, async ({ page }) => {
    await comEstado(page, persona, 'comum');
    await comecar(page);
    await registrar(page, persona, '10-antes-serie-1-com-sugestao');
    // drop set: o exercício com drop set deste dia (se houver), na última série
    const temDrop = await ateExercicioCom(page, '.meta .selo');
    if (temDrop) {
      const titulo = page.getByRole('region', { name: /^Série \d/ }).locator('h2');
      for (let i = 0; i < 6 && (await titulo.count()); i++) {
        const t = await titulo.innerText();
        const m = t.match(/Série (\d+) de (\d+)/)!;
        if (m[1] === m[2]) break;
        await salvarSerie(page);
        await pularDescanso(page);
      }
      await registrar(page, persona, '11-drop-set-ultima-serie');
      await page.locator('.quedas .stepper button:last-child').first().click({ trial: true }).catch(() => {});
    }
    // sem guia nenhum
    await page.goto('/treino');
    if (await ateExercicioCom(page, '.ajuda:has-text("Sem guia ainda")')) await registrar(page, persona, '12-sem-guia');
    // fim do treino
    await page.getByRole('main').getByRole('button', { name: 'Terminar treino' }).click().catch(async () => {
      await page.locator('.brand-acoes .link-sec').click();
    });
    await expect(page).toHaveURL(/\/treino\/fim$/);
    await registrar(page, persona, '13-fim');
  });
}

test('Bruno: treino em outro local, com a troca explicada', async ({ page }) => {
  await comEstado(page, 'bruno', 'comum');
  await comecar(page, undefined, 'Academia do bairro');
  if (await ateExercicioCom(page, '.troca-local')) await registrar(page, 'bruno', '14-troca-de-local');
});

test('Ana: 2ª série com a linha da calibração e a série feita à mostra', async ({ page }) => {
  await comEstado(page, 'ana', 'sem-historico');
  await comecar(page);
  // 8 kg × 9 com RIR 2: pesada; a 2ª série vem com a calibração (como em tests/e2e/treino.spec.ts)
  await page.getByLabel('Carga', { exact: true }).selectOption('8');
  await page.getByRole('button', { name: 'Mais uma repetição' }).click();
  await page.getByRole('radio', { name: '2', exact: true }).check();
  await page.getByRole('button', { name: /^Série feita/ }).click();
  await pularDescanso(page);
  await expect(page.locator('.fase.calibracao')).toBeVisible();
  await registrar(page, 'ana', '15-calibracao-serie-2');
  // descanso que acabou (relógio em +0:0x): encurta com "−15 s" até virar "Hora da próxima série"
  await salvarSerie(page);
  for (let k = 0; k < 20 && !(await page.getByText('Hora da próxima série').count()); k++) {
    await page.getByRole('button', { name: '−15 s' }).click();
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(1500);
  await registrar(page, 'ana', '17-descanso-acabou');
  await pularDescanso(page);
  // última série feita: o exercício completo (pílulas + "Séries completas" + "Próximo")
  await salvarSerie(page);
  await pularDescanso(page);
  await registrar(page, 'ana', '16-exercicio-completo');
});

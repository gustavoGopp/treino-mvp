import { expect, test, type Page } from '@playwright/test';

// Design v3 (metas aprovadas pelo Gustavo em 03/11/2026; medidas em docs/revisoes/design-v3/medidas.md): o cadastro
// se lê de relance. As telas de pergunta cabem sem rolar a 412 px, e o total de palavras até o programa não volta a
// crescer. A meta era 500 palavras no caminho "academia completa"; o medido foi ~550 com a prioridade (a triagem
// mantém as 9 condições inteiras). O teste trava o medido, com uma folga pequena, para não piorar.

/** Palavras que a pessoa vê no conteúdo: fora o texto só para leitor de tela (.sr) e o que está recolhido. */
async function palavras(page: Page) {
  return page.evaluate(() => {
    const conta = (s: string) => s.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length;
    let n = 0;
    const andar = document.createTreeWalker(document.querySelector('main')!, NodeFilter.SHOW_TEXT);
    for (let t = andar.nextNode(); t; t = andar.nextNode()) {
      const el = t.parentElement;
      if (!el || !t.textContent?.trim() || el.closest('.sr') || !el.checkVisibility({ visibilityProperty: true })) continue;
      const r = document.createRange();
      r.selectNodeContents(t);
      if (r.getBoundingClientRect().height > 0) n += conta(t.textContent);
    }
    return n;
  });
}
const rola = (page: Page) => page.evaluate(() => document.documentElement.scrollHeight > innerHeight + 1);
const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

test('cadastro com "academia completa": telas de pergunta sem rolar e até ~560 palavras até o programa', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 915 });
  let total = 0;
  const tela = async (nome: string, semRolar: boolean) => {
    const n = await palavras(page);
    total += n;
    if (semRolar) expect(await rola(page), `${nome} rola`).toBe(false);
  };
  await page.goto('/');
  await tela('boas-vindas', true);
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await expect(page.getByRole('heading', { name: 'Alguma destas vale para você?' })).toBeVisible();
  await tela('triagem', false); // rola de propósito: os botões ficam no fim da lista das 9
  await page.getByRole('button', { name: 'Não tenho nenhuma destas' }).click();
  await expect(grupo(page, /sem parar/)).toBeVisible();
  await tela('nível, tempo', true);
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await expect(grupo(page, /treinando agora/)).toBeVisible();
  await tela('nível, pausa', true);
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await expect(grupo(page, /Quantos dias/)).toBeVisible();
  await tela('rotina, dias', true);
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await expect(grupo(page, /Quantos minutos/)).toBeVisible();
  await tela('rotina, minutos', true);
  await grupo(page, /Quantos minutos/).getByLabel('45 min', { exact: true }).check();
  await expect(page.getByRole('group', { name: 'Onde você treina?' })).toBeVisible();
  await tela('equipamento, lugar', true);
  await page.getByRole('button', { name: 'Academia completa' }).click();
  await tela('equipamento, academia', false); // a menor anilha passa um pouco da tela
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await tela('tudo certo?', false);
  await page.getByRole('link', { name: /Prioridade \(opcional\)/ }).click();
  await tela('prioridade', true);
  expect(total).toBeLessThanOrEqual(560); // eram ~980 antes da design v3
});

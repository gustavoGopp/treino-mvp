import { expect, test, type Page } from '@playwright/test';
import { minutosPorTreino, triagemNenhuma } from './jornada';

// Sessão de equipamento mínimo: o caminho de quem não tem nada, do cadastro ao 1º treino. Persona fictícia Elisa
// (tests/personas): iniciante, 3 dias de 30 min, sem prioridade, "Corpo livre" (nenhum equipamento).
const grupo = (page: Page, nome: string | RegExp) => page.getByRole('group', { name: nome });

test('Corpo livre: sem nada marcado, o programa sai só com o peso do corpo, diz o que falta sem sugerir compra e o 1º treino registra por degrau', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await triagemNenhuma(page);

  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await grupo(page, /sem parar/).getByLabel('Menos de 6 meses').check();
  await grupo(page, /treinando agora/).getByLabel(/^Estou treinando/).check();
  await grupo(page, /confiança na técnica/).getByLabel(/^Sim/).check();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await grupo(page, /Quantos dias/).getByLabel('3 dias').check();
  await minutosPorTreino(page, '30');
  await page.getByRole('button', { name: 'Continuar' }).click();

  // O 4º atalho: a escolha explícita de treinar sem equipamento (equipamento.atalhos). Nada vem pré-marcado.
  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  const corpoLivre = page.getByRole('button', { name: /^(✓ )?Corpo livre$/ });
  await expect(corpoLivre).toHaveAttribute('aria-pressed', 'false');
  // Mesmo com algo marcado antes, o toque desmarca tudo.
  await page.getByLabel('Step', { exact: true }).check();
  await corpoLivre.click();
  await expect(corpoLivre).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByLabel('Step', { exact: true })).not.toBeChecked();
  await expect(page.getByText(/Sem equipamento: o programa usa o chão, uma parede e uma cadeira firme/)).toBeVisible();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await expect(page.getByText('Corpo livre (só o peso do corpo)')).toBeVisible();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();

  // Sem nada para puxar, a divisão é de corpo todo, e o aviso diz o que falta, sem sugerir compra.
  for (const dia of ['Corpo todo A', 'Corpo todo B', 'Corpo todo C']) await expect(page.getByRole('tab', { name: dia, exact: true })).toBeVisible();
  await page.getByText('Sobre o programa: avisos e o porquê').click();
  await expect(page.getByText(/Sem algo para puxar ou levantar: costas, ombro lateral, ombro de trás e bíceps ficam sem exercício/)).toBeVisible();
  await expect(page.getByText(/compr/i)).toHaveCount(0);

  // "Como está o seu programa" (R5b): o avaliador sobre o programa salvo. Sem nada, só limites, e nada a comprar.
  await page.getByText('Como está o seu programa').click();
  const comoEsta = page.locator('details.como-esta');
  await expect(comoEsta.getByText('Está bom dentro do que o seu equipamento, a dor ou o tempo permitem.')).toBeVisible();
  await expect(comoEsta.getByRole('heading', { name: 'Limites (não precisa fazer nada)' })).toBeVisible();
  await expect(comoEsta.getByText(/Sem exercício possível com o seu equipamento: costas/)).toBeVisible();
  await expect(comoEsta.getByRole('heading', { name: 'Dá para ajustar' })).toHaveCount(0);
  await expect(page.getByText(/compr/i)).toHaveCount(0);

  // A flexão de joelho deslizante cobre os posteriores da coxa sem equipamento.
  const painel = page.getByRole('tabpanel');
  await page.getByRole('tab', { name: 'Corpo todo A', exact: true }).click();
  await expect(painel.getByRole('heading', { name: /Flexão de joelho deslizando/ })).toBeVisible();

  // O 1º treino: sem kg, a carga é o degrau da escada do próprio exercício.
  await page.getByRole('button', { name: 'Começar o treino Corpo todo A' }).click();
  await expect(page).toHaveURL(/\/treino$/);
  await expect(page.getByRole('heading', { name: 'Agachamento com o peso do corpo' })).toBeVisible();
  const dificuldade = page.getByRole('combobox', { name: 'Dificuldade' });
  await expect(dificuldade).toBeVisible();
  expect(await dificuldade.locator('option').allTextContents()).toEqual(['Mais repetições', 'Descida de 3 s', 'Pausa de 2 s embaixo', '1,5 repetição (desce, sobe até a metade, desce de novo e sobe)', 'Subida no step, uma perna de cada vez, com descida de 3 s (sem step: 1,5 repetição com descida de 3 s)']);
  const registro = page.getByRole('region', { name: /^Série \d/ });
  await registro.getByRole('radio', { name: '2', exact: true }).check();
  await registro.getByRole('button', { name: /^Série feita/ }).click();
  await expect(page.getByRole('region', { name: /^Série 2/ })).toBeVisible();
});

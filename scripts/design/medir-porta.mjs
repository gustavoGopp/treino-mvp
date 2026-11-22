// Mede a porta (M1 da análise crítica): toques da abertura até o programa, em cada um dos quatro atalhos de lugar,
// contando a tela de equipamento. Caminho: Começar, "Não, nenhuma", as respostas de experiência (EXPERIENCIA=nunca usa
// "Nunca treinei"; o padrão é "Menos de 6 meses, treinando, técnica sim"), 3 dias, 45 min, Pernas e Glúteos, o atalho
// e "Gerar meu programa". Se o programa não aparecer, diz o que a tela pediu. Fotografa a abertura e o fim de cada caminho.
// Uso (com o app servido em http://localhost:4173): node scripts/design/medir-porta.mjs <pasta-das-fotos>
import { mkdirSync } from 'node:fs';
import { chromium, devices } from 'playwright';

const pasta = process.argv[2] ?? '.verificacao/porta';
mkdirSync(pasta, { recursive: true });
const ATALHOS = { academia: 'Academia completa', condominio: 'Condomínio com multifuncional', casa: 'Casa com halteres e elásticos', corpo: 'Corpo livre' };
const nunca = process.env.EXPERIENCIA === 'nunca';
const navegador = await chromium.launch();
for (const [id, nome] of Object.entries(ATALHOS)) {
  const ctx = await navegador.newContext({ ...devices['Pixel 7'], baseURL: 'http://localhost:4173' });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__toques = 0;
    addEventListener('pointerdown', () => window.__toques++, true);
  });
  const grupo = (n) => page.getByRole('group', { name: n });
  await page.goto('/');
  await page.getByRole('button', { name: 'Começar', exact: true }).waitFor();
  if (id === 'academia') await page.screenshot({ path: `${pasta}/abertura.png` });
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await page.getByRole('button', { name: 'Não, nenhuma' }).click();
  if (nunca) await grupo(/sem parar|Há quanto tempo/).getByLabel('Nunca treinei').check();
  else {
    await grupo(/sem parar/).getByLabel('Menos de 6 meses').check();
    await grupo(/treinando agora/).getByLabel(/^Estou treinando/).check();
    await grupo(/confiança na técnica/).getByLabel(/^Sim/).check();
  }
  await page.getByRole('button', { name: 'Continuar' }).click();
  await grupo(/Quantos dias/).getByLabel('3 dias').check();
  await grupo(/Quantos minutos/).getByLabel('45 min', { exact: true }).check();
  await page.getByLabel('Pernas', { exact: true }).check();
  await page.getByLabel('Glúteos', { exact: true }).check();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: nome }).click();
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();
  const chegou = await page.getByRole('heading', { name: 'Seu treino', exact: true }).waitFor({ timeout: 4000 }).then(() => true, () => false);
  await page.waitForTimeout(400);
  const toques = await page.evaluate(() => window.__toques);
  const pedido = chegou ? '' : ((await page.getByRole('alert').first().textContent().catch(() => '')) ?? '').trim();
  await page.screenshot({ path: `${pasta}/${id}.png` });
  console.log(`${id}: ${toques} toques; ${chegou ? 'chegou ao programa' : `NÃO chegou ao programa (${pedido})`}`);
  await ctx.close();
}
await navegador.close();

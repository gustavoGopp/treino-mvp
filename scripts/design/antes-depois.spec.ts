import { expect, test, type Page } from '@playwright/test';
import { ana } from '../../tests/e2e/jornada';
import { medir } from './medir';

// Revisão de design (03/11/2026), parte C: o antes e o depois das telas, para a decisão do Gustavo.
// O "depois" é um ESBOÇO aplicado na página aberta (CSS e DOM injetados aqui): o app não muda. Se o Gustavo aprovar,
// a mudança de verdade é feita no código (parte D), com teste.
// Uso: npx playwright test -c scripts/design antes-depois --project=claro   → docs/img/design-*.png

test.use({ deviceScaleFactor: 1.5 });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-05T15:00:00.000Z'));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
});

async function par(page: Page, arquivo: string, titulo: string, sub: string, antes: Buffer, depois: Buffer, rotA: string, rotD: string) {
  const b64 = (x: Buffer) => 'data:image/png;base64,' + x.toString('base64');
  const p = await page.context().newPage();
  await p.setViewportSize({ width: 900, height: 600 });
  await p.setContent(`<style>body{margin:0;padding:16px;background:#eaeef1;color:#14202a;font:14px system-ui,sans-serif}h1{font-size:22px;margin:0 0 4px}p{margin:0 0 12px;color:#566673;font-size:13px}
  .g{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}figure{margin:0;background:#fff;border:1px solid #d3dbe1;border-radius:10px;overflow:hidden}figure.d{border:2px solid #0a7c72}
  img{display:block;width:100%}figcaption{padding:8px 10px;font-size:13px;line-height:1.35}b{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#566673}</style>
  <h1>${titulo}</h1><p>${sub}</p><div class="g"><figure><img src="${b64(antes)}"><figcaption><b>antes</b>${rotA}</figcaption></figure><figure class="d"><img src="${b64(depois)}"><figcaption><b>depois (esboço)</b>${rotD}</figcaption></figure></div>`);
  await p.screenshot({ path: `docs/img/${arquivo}`, fullPage: true });
  await p.close();
}
const tela = (page: Page) => page.screenshot({ animations: 'disabled' });

test('guia: áreas de toque e contraste', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).first().click();
  await page.getByRole('link', { name: 'Ver como fazer' }).click();
  await page.getByRole('button', { name: 'Pausar' }).click({ timeout: 2000 }).catch(() => {});
  await page.getByRole('button', { name: 'Músculos' }).click();
  const n0 = (await medir(page, 'guia')).toquePequeno.length;
  await page.evaluate(() => window.scrollTo(0, 360));
  const antes = await tela(page);
  await page.addStyleTag({
    content: `.ctl,.seg button,.day,.chip,.errchip,.voltar{min-height:44px}.iconbtn{width:44px;height:44px}.modes button{min-height:44px}
    .check label{min-height:44px;align-items:center}.check .reset{min-height:44px;padding:0 4px}
    .modes button[aria-pressed="true"]{color:#08695f}.phase-bar span,.fbar span{color:#08695f}`,
  });
  const n1 = (await medir(page, 'guia')).toquePequeno.length;
  await page.evaluate(() => window.scrollTo(0, 360));
  const depois = await tela(page);
  await par(page, 'design-guia-toque.png', 'O guia com o polegar', `Áreas de toque menores que 44 px no guia aberto pelo treino: ${n0} antes, ${n1} no esboço. O texto verde sobre verde-claro (modo escolhido) passa de 4,2:1 para 5,2:1.`, antes, depois, 'Controles de 34 a 38 px de altura.', 'Os mesmos controles com 44 px; o desenho do palco não muda.');
  expect(n1).toBeLessThan(n0);
});

test('treino: o botão "Série feita" sem rolar', async ({ page }) => {
  await ana(page);
  await page.getByRole('button', { name: /^Começar o treino/ }).first().click();
  await expect(page).toHaveURL(/\/treino$/);
  const carga = page.getByLabel('Carga', { exact: true });
  if (await carga.evaluate((e) => e.tagName === 'SELECT')) await carga.selectOption({ index: 6 });
  await page.getByRole('region', { name: /^Série \d/ }).getByRole('radio', { name: '2', exact: true }).check();
  const antes = await tela(page);
  const a = (await medir(page, 'treino')).botaoPrincipal!;
  // esboço: a sugestão de carga e o aquecimento viram uma linha dentro do cartão da série
  await page.evaluate(() => {
    const reg = document.querySelector('.registro')!;
    const sug = document.querySelector('.sugestao');
    const fase = document.querySelector('.fase');
    const linha = document.createElement('p');
    linha.style.cssText = 'margin:0;font-size:14px;background:var(--accent-soft);border-radius:10px;padding:8px 10px';
    linha.innerHTML = `<b>${sug?.querySelector('b')?.textContent ?? ''}:</b> comece leve; a 1ª série acerta a carga.${fase ? ' Antes, 1–2 séries leves de aquecimento.' : ''}`;
    sug?.remove();
    fase?.remove();
    reg.insertBefore(linha, reg.children[1]!);
    (document.querySelector('.miniatura') as HTMLElement | null)?.style.setProperty('width', '84px');
  });
  const depois = await tela(page);
  const d = (await medir(page, 'treino')).botaoPrincipal!;
  await par(page, 'design-treino-botao.png', 'O botão mais tocado do app, sem rolar', `Pixel 7: o "Série feita" começa a ${a.topoPct}% da altura da tela (fora dela) antes e a ${d.topoPct}% no esboço. No celular pequeno (360 × 740), começava a 121%.`, antes, depois, 'A sugestão de carga e o aquecimento ocupam ~1/4 da tela antes do registro.', 'Os dois viram uma linha dentro do cartão da série; o botão aparece sem rolar.');
});

test('exercício sem animação: miniatura e cartão', async ({ page }) => {
  await ana(page);
  const card = page.locator('.cartao-ex', { has: page.getByText('Ponte de glúteo com halter') }).locator('visible=true').first();
  await card.scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /^Começar o treino/ }).first().click();
  for (let k = 0; k < 6; k++) {
    if (await page.locator('.cartao-texto').locator('visible=true').count()) break;
    await page.getByRole('button', { name: 'Próximo ›' }).click();
  }
  await page.locator('.cartao-texto summary').click();
  await page.evaluate(() => window.scrollTo(0, 0));
  const antes = await tela(page);
  await page.evaluate(() => {
    const m = document.querySelector('.miniatura.vazia');
    if (m)
      m.innerHTML = `<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="color:var(--accent)"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg><span style="color:var(--accent);font-weight:600">guia em texto</span>`;
    const s = document.querySelector('.cartao-texto summary');
    if (s) s.textContent = 'Como fazer (em texto)';
    const corpo = document.querySelector('.cartao-texto-corpo')!;
    const hs = Array.from(corpo.querySelectorAll('h4'));
    const bloco = (nome: string) => {
      const h = hs.find((x) => x.textContent!.trim().startsWith(nome));
      return h ? [h, h.nextElementSibling!] : [];
    };
    const topo = [...bloco('Dicas'), ...bloco('Erros comuns')];
    const resto = document.createElement('details');
    resto.innerHTML = '<summary style="min-height:44px;display:flex;align-items:center;font-weight:600;color:var(--link)">Montagem, posição e execução, passo a passo</summary>';
    const dicas = topo[1] as HTMLElement | undefined;
    if (dicas) dicas.style.cssText = 'font-size:17px;font-weight:600';
    const ajuda = corpo.querySelector('.ajuda');
    for (const el of Array.from(corpo.children)) if (!topo.includes(el) && el !== ajuda) resto.appendChild(el);
    corpo.append(...topo, resto);
  });
  const depois = await tela(page);
  await par(page, 'design-cartao.png', 'Exercício sem animação: o que a pessoa vê no treino', 'A ponte de glúteo com halter é o 4º exercício mais prescrito (128.692 vezes no teste de estresse) e tem cartão de texto. Mesmo assim, a miniatura diz "animação em breve".', antes, depois, 'Miniatura vazia com "animação em breve"; o cartão aberto tem 7 blocos, ~25 linhas, e as dicas vêm quase no fim.', 'Miniatura "guia em texto"; abre nas dicas e nos erros (como as "3 cues" do guia), e o passo a passo fica recolhido.');
});

test('triagem: o atalho "nenhuma se aplica"', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();
  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  const antes = await tela(page);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('button')).find((x) => x.textContent!.includes('Nenhuma se aplica'))!;
    b.innerHTML = 'Não tenho nenhuma destas condições<br><small style="font-weight:400">marca “não” nas 9; confira abaixo</small>';
    b.style.cssText = 'border-width:2px;min-height:60px;line-height:1.25';
    const p = b.nextElementSibling as HTMLElement;
    if (p) p.style.display = 'none';
  });
  const depois = await tela(page);
  await par(page, 'design-triagem.png', 'Triagem: o atalho que passou despercebido', 'Do Diário do R3: "não vi a opção de marcar que não tenho problema nenhum". O botão existe, mas parece um botão secundário e o rótulo não fala a língua de quem lê. A regra (seguranca.triagem.nenhuma) continua: a pessoa ainda vê as 9 perguntas antes de continuar.', antes, depois, '"Nenhuma se aplica a mim", contorno fino, explicação em letra pequena abaixo.', 'Rótulo em primeira pessoa e a explicação dentro do botão; o fluxo não muda.');
});

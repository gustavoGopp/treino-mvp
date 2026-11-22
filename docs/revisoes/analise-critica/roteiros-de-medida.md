# Roteiros de medida da análise crítica

Os roteiros que produziram as medidas de [`diario-de-uso.md`](diario-de-uso.md). Ficam aqui para que qualquer sessão possa **refazer as mesmas medidas** depois de uma mudança e comparar com o antes. Não fazem parte do app nem dos testes do projeto.

## Como usar

1. Copie cada bloco para um arquivo com o nome indicado, numa pasta temporária **fora do repositório**, com uma subpasta `shots/` e outra `perfis/`.
2. Suba a versão de produção: `npm run build` e `npx vite preview --port 4173 --strictPort`.
3. Rode com `node <arquivo>`. Para medir outra versão em outra porta: `BASE=http://localhost:4174 node <arquivo>`.

Os roteiros usam o Playwright que o projeto já fixa (o caminho `/home/user/treino-mvp/node_modules/playwright` está escrito neles; ajuste se o repositório estiver em outro lugar). As personas são fictícias.

## As medidas de referência (main `ece5f79`, 19/11/2026)

| Medida | Como refazer | Valor de referência |
|---|---|---|
| Toques da abertura até o programa, com "Academia completa" | `onb.cjs`, persona P2 | 13 |
| Idem, "Condomínio com multifuncional" | `p1.cjs` (ou `onb.cjs` com esse local) | 21 |
| Idem, "Casa com halteres e elásticos" | `onb.cjs`, persona P4 | 24 |
| Idem, com "sim" na triagem e academia completa | `onb.cjs`, persona P3 | 17 |
| Toques de uma sessão inteira (10 séries, 6 exercícios) | `sessao.cjs` | 35 |
| Altura do boneco e botão "Série feita" por tamanho de tela | `tamanhos.cjs` | 70 a 134 px; fora da tela em 320 × 568 |
| Falhas de acessibilidade, sem internet, modo escuro, movimento reduzido | `a11y.cjs` (precisa do `axe-core` numa pasta `tools/`) | 0 falhas em 5 telas |

As chamadas usadas para as personas:

```bash
# P2, a exigente (academia completa, tela estreita)
node onb.cjs p2 se '{"tempo":"Mais de 2 anos","agora":"Estou treinando","confianca":"Sim","dias":"5 dias","min":"75 min","grupos":["Costas","Ombros"],"local":"Academia completa"}'
# P3, 55 anos (pressão alta com remédio)
node onb.cjs p3 pixel7 '{"triagem":"sim","triagemPassos":[{"rotulo":"Problema no coração ou pressão alta","nome":"marca1"},{"rotulo":"Remédio para doença crônica","botao":"Continuar","nome":"confirma"},{"botao":"Isso, nenhuma destas","nome":"resultado"},{"rotulo":"Confirmo que fui avaliado","botao":"Continuar com a liberação","nome":"liberado"}],"tempo":"Menos de 6 meses","agora":"Parei há mais de 6 meses","confianca":"Não","dias":"2 dias","min":"30 min","local":"Academia completa"}'
# P4, em casa (360 px)
node onb.cjs p4 w360 '{"tempo":"De 6 meses a 2 anos","agora":"Parei há 3 semanas a 6 meses","confianca":"Mais ou menos","dias":"4 dias","min":"45 min","grupos":["Glúteos"],"local":"Casa com halteres e elásticos"}'
# sessão inteira, a partir do estado que o onb.cjs salva em perfis/
node sessao.cjs p2 pixel7 p2-programa p2-apos-treino1
```

**Atenção:** os roteiros procuram os botões pelo texto que estava na tela em 19/11. Se um lote mudar um texto (por exemplo, a pergunta de experiência), o roteiro precisa acompanhar; isso não é falha do app.


## `lib.cjs`

```js
// Auxiliares dos roteiros de uso (fase 1). Cada roteiro é um arquivo que roda do começo ao fim.
const { chromium, devices } = require('/home/user/treino-mvp/node_modules/playwright');
const path = require('path');
const S = __dirname;
const BASE = process.env.BASE || 'http://localhost:4173';

async function abrir(persona, dev = 'pixel7', opcoes = {}) {
  const base =
    dev === 'se' ? { ...devices['iPhone SE'] } :
    dev === 'w360' ? { ...devices['Pixel 7'], viewport: { width: 360, height: 640 } } :
    { ...devices['Pixel 7'] };
  delete base.defaultBrowserType;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    ...base, deviceScaleFactor: 2, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo',
    colorScheme: opcoes.esquema || 'light', reducedMotion: opcoes.rm || 'no-preference',
    storageState: opcoes.estado, ...opcoes.ctx,
  });
  const page = await ctx.newPage();
  page.setDefaultTimeout(6000);
  const st = { toques: 0, t0: Date.now() };
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE.ERROR', m.text().slice(0, 200)); });
  if (opcoes.relogio) await page.clock.install({ time: new Date(opcoes.relogio) });
  await page.goto((opcoes.url || 'http://localhost:4173/').replace('http://localhost:4173', BASE));
  await page.waitForTimeout(500);
  const shot = async (n, full) => page.screenshot({ path: path.join(S, 'shots', `${persona}-${dev}-${n}.png`), fullPage: !!full });
  const tap = async (t, o = {}) => {
    const l = typeof t === 'string' ? page.getByText(t, { exact: !!o.exact }).nth(o.n || 0) : t;
    await l.click({ timeout: 4000 }); st.toques++; await page.waitForTimeout(o.wait ?? 300);
  };
  const btn = async (name, o = {}) => {
    await page.getByRole(o.role || 'button', { name, exact: !!o.exact }).nth(o.n || 0).click({ timeout: 4000 });
    st.toques++; await page.waitForTimeout(o.wait ?? 300);
  };
  const dump = async (o = {}) => {
    const d = await page.evaluate(() => {
      const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
      const els = [...document.querySelectorAll('button,a,input,select,textarea,[role=button],[role=tab],[role=radio],[role=checkbox],summary,label')].filter(vis).map((e) => {
        const r = e.getBoundingClientRect();
        const nome = (e.getAttribute('aria-label') || e.innerText || e.value || e.placeholder || '').trim().replace(/\s+/g, ' ').slice(0, 70);
        const marca = (e.disabled ? ' DIS' : '') + (e.checked ? ' ON' : '') + (['aria-pressed', 'aria-checked', 'aria-selected'].some((a) => e.getAttribute(a) === 'true') ? ' SEL' : '');
        return `${e.tagName.toLowerCase()}${e.type ? '[' + e.type + ']' : ''}${e.getAttribute('role') ? '{' + e.getAttribute('role') + '}' : ''} "${nome}" ${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.top)}${marca}`;
      });
      return { url: location.pathname + location.search + location.hash, h: document.documentElement.scrollHeight, text: document.body.innerText, els };
    });
    console.log(`\n=== ${o.rotulo || ''} URL ${d.url} | alturaPagina ${d.h} | toques ${st.toques} | seg ${Math.round((Date.now() - st.t0) / 1000)}`);
    if (!o.semTexto) console.log('--- TEXTO ---\n' + d.text.replace(/\n{2,}/g, '\n'));
    if (!o.semEls) console.log('--- ELEMENTOS ---\n' + d.els.join('\n'));
  };
  const fechar = async (salvar) => { if (salvar) await ctx.storageState({ path: path.join(S, 'perfis', salvar + '.json'), indexedDB: true }); await browser.close(); };
  return { page, ctx, st, shot, tap, btn, dump, fechar };
}

async function rodar(fn) {
  try { await fn(); } catch (e) { console.log('ERRO', e.message.split('\n').slice(0, 8).join(' | ')); process.exit(1); }
  process.exit(0);
}
module.exports = { abrir, rodar, S };

```

## `onb.cjs`

```js
// Cadastro genérico. Uso: node onb.cjs <persona> <dev> '<json de respostas>'
const { abrir, rodar, S } = require('./lib.cjs');
const [persona, dev, json] = process.argv.slice(2);
const r = JSON.parse(json);
rodar(async () => {
  const a = await abrir(persona, dev, { esquema: r.esquema });
  const { page, tap, btn, shot, dump, st } = a;
  const corpo = async (n = 1500) => (await page.locator('body').innerText()).replace(/\n+/g, ' | ').slice(0, n);
  const dlg = page.getByRole('dialog');
  const op = (raiz, t, n = 0) => raiz.locator('label').filter({ hasText: new RegExp('^' + t + '$') }).nth(n);
  await shot('01-abertura');
  await btn('Começar'); await shot('02-triagem');
  if (r.triagem === 'sim') {
    await btn(/Sim, alguma/, { wait: 700 }); await shot('02b-triagem-sim', true);
    console.log('TRIAGEM SIM ->', page.url(), '\n', await corpo(2500)); await dump({ semTexto: true, rotulo: 'triagem sim' });
    for (const passo of r.triagemPassos || []) {
      if (passo.rotulo) await tap(page.locator('label').filter({ hasText: passo.rotulo }).first());
      if (passo.botao) await btn(passo.botao, { wait: 700 });
      await shot('02c-' + (passo.nome || 'x'), true);
      console.log('\n[triagem] depois de', JSON.stringify(passo), '->', page.url(), '\n', await corpo(2200));
    }
  } else await btn('Não, nenhuma');
  if (!page.url().includes('nivel')) { console.log('PAROU FORA DO NÍVEL:', page.url()); await dump({}); await a.fechar(); return; }
  await tap(page.getByText(r.tempo)); await tap(page.getByText(r.agora));
  if (r.confianca) await tap(page.getByText(r.confianca, { exact: true }));
  console.log('NÍVEL:', (await corpo(3000)).match(/Seu nível[^|]*/)?.[0]); await shot('03-nivel', true);
  await btn('Continuar');
  await tap(page.getByLabel(r.dias)); await tap(page.getByLabel(r.min));
  for (const g of r.grupos || []) await tap(page.locator('label').filter({ hasText: new RegExp('^' + g + '$') }));
  await shot('04-rotina', true); await btn('Continuar');
  await btn(r.local, { wait: 500 }); await shot('05-local', true);
  console.log('LOCAL:', (await corpo(3000)).match(/\d+ itens marcados[^|]*/)?.[0]);
  for (let i = 0; i < 12; i++) {
    await btn('Gerar meu programa', { wait: 1000 });
    if (!page.url().includes('inventario')) break;
    console.log(`[detalhe ${i + 1}]`, (await page.locator('text=/Há \\d+ detalhe/').first().innerText().catch(() => '')), '|', (await dlg.count()) ? (await dlg.first().innerText()).replace(/\n+/g, ' | ').slice(0, 500) : 'sem folha');
    if (!(await dlg.count())) { await shot('05c-travou', true); break; }
    await shot('05b-detalhe-' + (i + 1));
    // responde: para cada grupo de rádios na folha, a opção do meio; sim/não -> Não
    const grupos = await dlg.locator('fieldset, [role=radiogroup]').count();
    if (await dlg.getByText('Não', { exact: true }).count()) await tap(op(dlg, 'Não'));
    else {
      const nomes = await dlg.locator('input[type=radio]').evaluateAll((xs) => [...new Set(xs.map((x) => x.name))]);
      for (const nome of nomes) { const rs = dlg.locator(`input[type=radio][name="${nome}"]`); const n = await rs.count(); const alvo = rs.nth(Math.max(0, Math.min(n - 2, Math.floor(n / 2)))); await alvo.check({ force: true }); st.toques++; }
      const nums = dlg.locator('input[type=number], input[inputmode=decimal], input[inputmode=numeric]');
      for (let k = 0; k < await nums.count(); k++) if (!(await nums.nth(k).inputValue())) { await nums.nth(k).fill('10'); st.toques++; }
    }
    const maisBt = dlg.locator('button').filter({ hasText: /^\+$/ });
    if (await maisBt.count() > 4) { for (const k of [3, 3, 7, 7]) await tap(maisBt.nth(k), { wait: 80 }); }
    await tap(dlg.getByRole('button', { name: 'Pronto' }), { wait: 600 });
    if (await dlg.count()) { console.log('   folha não fechou:', (await dlg.first().innerText()).replace(/\n+/g, ' | ').slice(0, 400)); await shot('05d-folha-nao-fechou'); await btn('Fechar').catch(() => {}); }
  }
  await page.waitForTimeout(1000);
  console.log('TOQUES ATÉ O PROGRAMA:', st.toques, '| url', page.url());
  await shot('06-programa'); await shot('06-programa-inteiro', true);
  // todos os dias do programa
  const abas = page.getByRole('tab'); const nAbas = await abas.count();
  for (let i = 0; i < nAbas; i++) {
    await abas.nth(i).click(); await page.waitForTimeout(300);
    const itens = await page.locator('button').filter({ hasText: /×/ }).evaluateAll((x) => x.map((e) => e.innerText.replace(/\n+/g, ' — ') + (e.querySelector('svg.boneco, svg[viewBox], canvas') ? '' : '')));
    const semAnim = await page.evaluate(() => [...document.querySelectorAll('button')].filter((b) => /×/.test(b.innerText)).map((b) => { const s = b.querySelector('svg'); return s ? s.getBoundingClientRect().width : 0; }));
    console.log(`\nDIA ${i + 1}: ${(await page.locator('h1').first().innerText()).replace(/\n/g, ' ')} | ${(await corpo(400)).match(/\d+ \| EXERCÍCIOS \| ~?\d+ \| MINUTOS/)?.[0]}`);
    itens.forEach((t, k) => console.log('   ', t, semAnim[k] < 40 ? '  [SEM ANIMAÇÃO]' : ''));
    if (i > 0) await shot(`06-programa-dia${i + 1}`, true);
  }
  await abas.first().click().catch(() => {});
  await a.fechar(persona + '-programa');
});

```

## `p1.cjs`

```js
// Persona 1: curioso, nunca treinou. Pixel 7.
const { abrir, rodar } = require('./lib.cjs');
rodar(async () => {
  const a = await abrir('p1', 'pixel7');
  const { page, tap, btn, shot, dump } = a;
  await btn('Começar');
  await btn('Não, nenhuma');
  await tap('Menos de 6 meses');
  await tap('Parei há mais de 6 meses');
  await shot('06-nivel-confianca', true);
  await tap('Não', { exact: true });
  await shot('07-depois-do-nivel', true);
  await btn('Continuar');
  await shot('08-passo3', true);
  await tap(page.getByLabel('3 dias'));
  await tap(page.getByLabel('45 min'));
  await shot('09-passo3-completo', true);
  await btn('Continuar');
  await shot('10-passo4', true);
  await btn('Condomínio com multifuncional');
  await shot('11-passo4-condominio', true);
  await btn('Gerar meu programa', { wait: 1500 });
  await shot('13-falta-pouco-dobra');
  // Responde os "detalhes" um a um, anotando cada pergunta que aparece.
  const dlg = page.getByRole('dialog');
  await tap(dlg.getByText('Não', { exact: true }));
  await tap(dlg.getByRole('button', { name: 'Pronto' }), { wait: 600 });
  console.log('diálogo aberto depois do Pronto?', await dlg.count());
  if (await dlg.count()) { console.log((await dlg.first().innerText()).replace(/\n+/g, ' | ')); await shot('14-detalhe-2'); }
  await btn('Mudar Banco regulável');
  console.log('\n[banco]', (await dlg.first().innerText()).replace(/\n+/g, ' | '));
  await shot('14-banco', false);
  await tap(dlg.getByRole('button', { name: 'Pronto' }), { wait: 600 });
  await shot('14b-lista-depois-do-banco');
  // Tenta gerar de novo: qual é o próximo detalhe?
  for (let i = 0; i < 8; i++) {
    await btn('Gerar meu programa', { wait: 900 });
    if (!page.url().includes('inventario')) break;
    const aviso = await page.locator('text=/Falta pouco|detalhe/').allInnerTexts();
    console.log(`\n[tentativa ${i + 1}] aviso:`, aviso.join(' / '));
    if (!(await dlg.count())) { console.log('sem diálogo'); break; }
    console.log('diálogo:', (await dlg.first().innerText()).replace(/\n+/g, ' | '));
    await shot(`14c-detalhe-${i + 1}`);
    const op = (t, n = 0) => dlg.locator('label').filter({ hasText: new RegExp('^' + t + '$') }).nth(n);
    await tap(op('2 kg', 0)); await tap(op('20 kg')); await tap(op('2 kg', 1));
    await shot('14d-halteres-preenchido');
    await tap(dlg.getByRole('button', { name: 'Pronto' }), { wait: 600 });
  }
  await page.waitForTimeout(1200);
  console.log('TOQUES ATÉ O PROGRAMA', a.st.toques);
  await shot('16-programa-dobra');
  await shot('16-programa', true);
  await dump({ rotulo: 'programa' });
  await a.fechar('p1-programa');
  await a.fechar();
});

```

## `sessao.cjs`

```js
// Faz uma sessão inteira a partir de um estado salvo. Uso: node sessao.cjs <persona> <dev> <estadoEntrada> <estadoSaida> [relogioISO]
const { abrir, rodar, S } = require('./lib.cjs');
const [persona, dev, entrada, saida, relogio] = process.argv.slice(2);
rodar(async () => {
  const a = await abrir(persona, dev, { estado: `${S}/perfis/${entrada}.json`, url: 'http://localhost:4173/programa', relogio });
  const { page, tap, btn, shot, dump, st } = a;
  const txt = async () => (await page.locator('body').innerText()).replace(/\n+/g, ' | ');
  await btn(/Começar o treino|Continuar o treino/, { wait: 1000 });
  let exAnterior = '', toquesNoEx = 0, n = 0;
  for (let i = 0; i < 80; i++) {
    if (!page.url().endsWith('/treino')) break;
    const titulo = (await page.locator('h1, h2').first().innerText().catch(() => '')).replace(/\n/g, ' ');
    const pos = await page.getByText(/^\d+ de \d+$/).first().innerText().catch(() => '?');
    if (pos + titulo !== exAnterior) {
      if (exAnterior) console.log(`   -> toques neste exercício: ${st.toques - toquesNoEx}`);
      exAnterior = pos + titulo; toquesNoEx = st.toques; n++;
      console.log(`\n### ${pos} — ${titulo}`);
      console.log('   ', (await txt()).slice(0, 700));
      await shot(`s-${String(n).padStart(2, '0')}-exercicio`);
    }
    const feitaN = page.getByRole('button', { name: /^Série \d+ feita$/ });
    const feita = page.getByRole('button', { name: /^Série feita$/ });
    const proximo = page.getByRole('button', { name: /Próximo exercício|Terminar|Concluir|Finalizar|Ver resumo/ });
    if (await feitaN.count()) { await tap(feitaN.first(), { wait: 500 }); continue; }
    if (await feita.count()) {
      if (await feita.first().isDisabled()) {
        const sel = page.locator('select');
        if (await sel.count() && (await sel.first().inputValue()) === '') { const ops = await sel.first().locator('option').allInnerTexts(); await sel.first().selectOption({ label: ops[Math.min(3, ops.length - 1)] }); st.toques += 2; }
        const mais = page.getByRole('button', { name: /^(Próxima placa|Mais carga)$/ });
        if (!(await sel.count()) && (await mais.count())) for (let k = 0; k < 3; k++) await tap(mais.first(), { wait: 120 });
        const rir = page.locator('label').filter({ hasText: /^3$/ });
        if (await rir.count()) await tap(rir.first());
        if (await feita.first().isDisabled()) { console.log('   !! ainda desabilitado:', (await txt()).slice(-300)); await shot(`s-${n}-travou`); break; }
      }
      await tap(feita.first(), { wait: 600 }); continue;
    }
    if (await proximo.count()) { console.log('   botão:', await proximo.first().innerText()); await shot(`s-${String(n).padStart(2, '0')}-fim-do-exercicio`); await tap(proximo.first(), { wait: 800 }); continue; }
    console.log('   ?? tela sem botão conhecido:', (await txt()).slice(0, 900)); await shot(`s-${n}-desconhecida`); break;
  }
  console.log(`   -> toques neste exercício: ${st.toques - toquesNoEx}`);
  console.log('\nTOTAL DE TOQUES NA SESSÃO', st.toques, '| url final', page.url());
  await page.waitForTimeout(800);
  await shot('s-99-final'); await shot('s-99-final-inteira', true);
  await dump({ rotulo: 'fim da sessão' });
  await a.fechar(saida);
});

```

## `tamanhos.cjs`

```js
// A tela de treino em vários tamanhos reais de celular: cabe? o boneco aparece inteiro?
const { chromium } = require('/home/user/treino-mvp/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  for (const [nome, w, h] of [['iPhone SE 1ª ger. 320x568', 320, 568], ['Android pequeno 360x640', 360, 640], ['iPhone SE 2/3 e iPhone 8 375x667', 375, 667], ['Android comum 360x740', 360, 740], ['iPhone 13/14 390x844 (área útil no Safari ~390x664)', 390, 664], ['iPhone 13/14 instalado 390x797', 390, 797], ['Pixel 7 412x839', 412, 839]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'pt-BR', storageState: __dirname + '/perfis/p1-apos-treino1.json' });
    const p = await ctx.newPage(); await p.goto('http://localhost:4173/programa'); await p.waitForTimeout(500);
    await p.getByRole('button', { name: /Começar o treino/ }).click(); await p.waitForTimeout(900);
    const m = await p.evaluate(() => {
      const bt = [...document.querySelectorAll('button')].find((x) => /Série feita/.test(x.innerText)); const r = bt.getBoundingClientRect();
      const palco = document.querySelector('[aria-label="Guia de execução"]'); const svg = palco && palco.querySelector('svg'); const s = svg && svg.getBoundingClientRect();
      const abas = [...document.querySelectorAll('button')].some((x) => x.innerText === 'Técnica' && x.getBoundingClientRect().height > 0);
      const txt = svg ? [...svg.querySelectorAll('text')].filter((t) => t.getBoundingClientRect().height > 0).map((t) => parseFloat(getComputedStyle(t).fontSize)) : [];
      // o corpo do boneco cabe dentro do svg?
      let corpo = null; if (svg) { const gs = [...svg.querySelectorAll('g, path')].map((g) => g.getBoundingClientRect()).filter((x) => x.height > 0); const top = Math.min(...gs.map((x) => x.top)), bot = Math.max(...gs.map((x) => x.bottom)); corpo = { top: Math.round(top - s.top), sobra: Math.round(s.bottom - bot), alt: Math.round(bot - top) }; }
      return { pagina: document.documentElement.scrollHeight, botaoFim: Math.round(r.bottom), palco: s ? [Math.round(s.width), Math.round(s.height)] : null, abas, fonteRotulo: [...new Set(txt)], corpo };
    });
    await p.screenshot({ path: __dirname + `/shots/tam-${w}x${h}.png` });
    console.log(`${nome}: página ${m.pagina}px (tela ${h}) | "Série feita" termina em ${m.botaoFim} -> ${m.botaoFim <= h ? 'CABE' : 'FORA DA TELA (' + (m.botaoFim - h) + 'px)'} | palco ${JSON.stringify(m.palco)} | abas do guia: ${m.abas ? 'sim' : 'NÃO'} | letra dos rótulos ${JSON.stringify(m.fonteRotulo)}px | desenho: ${JSON.stringify(m.corpo)}`);
    await ctx.close();
  }
  await b.close();
})().catch((e) => { console.log('ERRO', e.message.split('\n').slice(0, 4).join(' | ')); process.exit(1); });

```

## `a11y.cjs`

```js
// Acessibilidade (axe-core), modo escuro, movimento reduzido, sem internet.
const { abrir, rodar, S } = require('./lib.cjs');
const fs = require('fs');
const axe = fs.readFileSync(S + '/tools/node_modules/axe-core/axe.min.js', 'utf8');
rodar(async () => {
  const a = await abrir('a11y', 'pixel7', { estado: S + '/perfis/p1-apos-treino1.json', url: 'http://localhost:4173/programa' });
  const { page, btn, shot, ctx } = a;
  const rodarAxe = async (nome) => {
    await page.evaluate(axe);
    const r = await page.evaluate(async () => { const x = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] }); return x.violations.map((v) => ({ id: v.id, impacto: v.impact, n: v.nodes.length, ex: v.nodes.slice(0, 2).map((n) => (n.html.slice(0, 110) + ' :: ' + (n.any[0]?.message || n.all[0]?.message || n.none[0]?.message || '')).slice(0, 260)) })); });
    console.log(`\n[axe] ${nome}: ${r.length} tipo(s) de violação`); r.forEach((v) => console.log(`   ${v.impacto} ${v.id} x${v.n}\n      ${v.ex.join('\n      ')}`));
  };
  await rodarAxe('programa');
  await page.goto('http://localhost:4173/semana'); await page.waitForTimeout(400); await rodarAxe('semana');
  await page.goto('http://localhost:4173/dados'); await page.waitForTimeout(400); await rodarAxe('meus dados');
  await page.goto('http://localhost:4173/guia/goblet'); await page.waitForTimeout(800); await rodarAxe('guia');
  await page.goto('http://localhost:4173/programa'); await page.waitForTimeout(400); await btn(/Começar o treino/, { wait: 900 }); await rodarAxe('treino (série)');
  // leitor de tela: árvore de acessibilidade resumida da tela de treino
  const arvore = await page.locator('body').ariaSnapshot();
  console.log('\n[árvore de acessibilidade do treino]\n' + arvore.split('\n').slice(0, 60).join('\n'));
  await page.locator('select').selectOption({ index: 2 }).catch(() => {}); await page.locator('label').filter({ hasText: /^3$/ }).first().click(); await btn('Série feita', { wait: 700 }); await rodarAxe('treino (descanso)');
  // sem internet: service worker ativo? recarregar offline
  const sw = await page.evaluate(async () => { const r = await navigator.serviceWorker?.getRegistration(); return r ? { ativo: !!r.active, escopo: r.scope } : null; });
  console.log('\n[service worker]', JSON.stringify(sw));
  await page.waitForTimeout(3000);
  await ctx.setOffline(true);
  for (const u of ['/programa', '/semana', '/guia/goblet', '/treino']) {
    const ok = await page.goto('http://localhost:4173' + u).then(() => true).catch((e) => e.message.split('\n')[0]);
    await page.waitForTimeout(700);
    console.log(`[sem internet] ${u}:`, ok === true ? 'abriu — ' + (await page.locator('body').innerText()).replace(/\n+/g, ' | ').slice(0, 120) : ok);
  }
  await shot('50-sem-internet-guia');
  await ctx.setOffline(false);
  await a.fechar();
  // modo escuro e movimento reduzido
  for (const [nome, op] of [['escuro', { esquema: 'dark' }], ['mov-reduzido', { rm: 'reduce' }]]) {
    const b = await abrir('a11y-' + nome, 'pixel7', { estado: S + '/perfis/p1-apos-treino1.json', url: 'http://localhost:4173/programa', ...op });
    await b.shot('51-programa'); await b.btn(/Começar o treino/, { wait: 900 }); await b.shot('52-treino');
    if (nome === 'mov-reduzido') {
      const q1 = await b.page.locator('svg').first().innerHTML(); await b.page.waitForTimeout(1200); const q2 = await b.page.locator('svg').first().innerHTML();
      console.log('\n[movimento reduzido] o desenho muda sozinho em 1,2 s?', q1 !== q2, '| botão:', await b.page.locator('button[aria-label*="guia"]').first().getAttribute('aria-label'));
    } else { await b.page.evaluate(axe); const c = await b.page.evaluate(async () => (await window.axe.run(document, { runOnly: ['color-contrast'] })).violations.map((v) => v.nodes.length + ' nós: ' + v.nodes.slice(0, 3).map((n) => n.any[0]?.message).join(' / '))); console.log('\n[escuro] contraste:', JSON.stringify(c)); await b.page.goto('http://localhost:4173/'); }
    await b.page.goto('http://localhost:4173/guia/goblet'); await b.page.waitForTimeout(700); await b.shot('53-guia');
    await b.fechar();
  }
});

```

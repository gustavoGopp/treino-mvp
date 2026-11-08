import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { test, type Page } from '@playwright/test';

// Redesign (06/11/2026), agente 6: o que no protótipo falha com leitor de tela, baixa visão, tremor, celular lento e
// sem internet. Mede e registra (não reprova). Saída: reports/design/redesign/agente-6/ (fora do git).
// axe-core: o que vem junto do Lighthouse no cache do npx (não é dependência do app).

const DIR = 'docs/revisoes/redesign/prototipo';
const BASE = 'http://prototipo.local/';
const OUT = 'reports/design/redesign/agente-6';
const AXE = '/root/.npm/_npx/0f94ee7615faf582/node_modules/axe-core/axe.min.js';
mkdirSync(OUT, { recursive: true });
const salvar = (nome: string, dado: unknown) => writeFileSync(`${OUT}/${nome}`, typeof dado === 'string' ? dado : JSON.stringify(dado, null, 1) + '\n');

// a mesma função servir de scripts/design/redesign/prototipo/capturas.spec.ts (copiada para não registrar aquele teste)
async function servir(page: Page, externos?: string[]) {
  await page.route(/^http:\/\/prototipo\.local\//, (r) => {
    const caminho = new URL(r.request().url()).pathname.replace(/^\//, '') || 'index.html';
    const corpo = readFileSync(`${DIR}/${caminho}`, 'utf8');
    const tipo = caminho.endsWith('.css') ? 'text/css' : caminho.endsWith('.js') ? 'text/javascript' : 'text/html';
    const html = caminho === 'index.html' ? `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${corpo}</body></html>` : corpo;
    return r.fulfill({ status: 200, contentType: `${tipo}; charset=utf-8`, body: html });
  });
  if (externos) page.on('request', (q) => { const h = new URL(q.url()).host; if (h !== 'prototipo.local') externos.push(h); });
  await page.addInitScript(() => ((window as unknown as { CAPTURA: boolean }).CAPTURA = true));
}
async function abrir(page: Page, id: string, espera = 300) {
  await page.goto(BASE + '#' + id);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(espera);
}
const TREINO = ['treino', 'treino-descanso', 'treino-acabou', 'treino-senti', 'treino-trocar', 'treino-texto', 'treino-terminar', 'guia'];
const IMPORTA = ['boas-vindas', 'triagem', 'triagem-sim', 'experiencia', 'rotina', 'equipamento-lista', 'inicio', ...TREINO, 'fim', 'semana'];

// texto cortado (o mesmo critério de capturas.spec.ts) e o que as camadas fixas ocupam da tela
const MEDIR_TELA = () => {
  const cortados: string[] = [];
  for (const e of Array.from(document.body.querySelectorAll<HTMLElement>('*'))) {
    if (e.closest('svg, .proto') || !Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim())) continue;
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    let lim = { left: 0, right: innerWidth };
    for (let x = e.parentElement; x; x = x.parentElement) {
      const s = getComputedStyle(x);
      if (s.overflowX !== 'visible') { const q = x.getBoundingClientRect(); lim = { left: Math.max(lim.left, q.left), right: Math.min(lim.right, q.right) }; }
    }
    const reticencias = getComputedStyle(e).textOverflow === 'ellipsis' && e.scrollWidth > e.clientWidth + 1;
    if (r.right > lim.right + 1 || r.left < lim.left - 1 || reticencias) cortados.push(e.innerText.trim().slice(0, 40));
  }
  const inteiro = (el: Element | null) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.top < -1 || r.bottom > innerHeight + 1 || r.width === 0) return false;
    const topo = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!topo && (el === topo || el.contains(topo));
  };
  // linhas da tela ocupadas por cabeçalho, base e registro fixos (sem contar a folha)
  const linhas = new Set<number>();
  for (const f of Array.from(document.querySelectorAll('.cab, .base, .registro'))) {
    const r = f.getBoundingClientRect();
    for (let y = Math.max(0, Math.floor(r.top)); y < Math.min(innerHeight, r.bottom); y++) linhas.add(y);
  }
  const ultima = document.querySelector('.condicoes li:last-child');
  return {
    largura: innerWidth, altura: innerHeight,
    rolaDeLado: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    cortados: [...new Set(cortados)],
    fixoPct: Math.round((linhas.size / innerHeight) * 100),
    sentiInteiro: inteiro(document.querySelector('.senti')),
    feitaInteira: inteiro(document.querySelector('#feita')),
    rirInteiro: inteiro(document.querySelector('.rir')),
    relogioInteiro: inteiro(document.querySelector('#relogio')),
    ultimaCondicaoSemRolar: ultima ? inteiro(ultima) : null,
    alturaRegistro: Math.round(document.querySelector('.registro')?.getBoundingClientRect().height ?? 0),
    alturaPagina: document.documentElement.scrollHeight,
  };
};

test('1. axe-core (WCAG 2.0 a 2.2 A e AA, e boas práticas), claro e escuro', async ({ page }) => {
  await servir(page);
  await abrir(page, 'indice');
  const telas = await page.evaluate(() => (window as unknown as { __TELAS: { id: string }[] }).__TELAS.map((t) => t.id));
  const saida: Record<string, unknown>[] = [];
  for (const tema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: tema });
    for (const id of telas) {
      if (id === 'indice' || id === 'sistema') continue;
      await abrir(page, id, id === 'guia' ? 600 : 300);
      await page.addScriptTag({ path: AXE });
      const r = await page.evaluate(async () => {
        const axe = (window as unknown as { axe: { run: (c: unknown, o: unknown) => Promise<{ violations: { id: string; impact: string; tags: string[]; help: string; nodes: { target: string[]; failureSummary: string }[] }[]; incomplete: { id: string; nodes: unknown[] }[] }> } }).axe;
        const res = await axe.run(document.querySelector('#app')!.parentElement, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }, exclude: [['#proto']] });
        return {
          violacoes: res.violations.map((v) => ({ id: v.id, impacto: v.impact, wcag: v.tags.filter((t) => /^wcag\d/.test(t)), ajuda: v.help, n: v.nodes.length, alvos: v.nodes.slice(0, 4).map((n) => n.target.join(' ')), resumo: v.nodes[0]?.failureSummary?.slice(0, 200) })),
          incompletos: res.incomplete.map((v) => ({ id: v.id, n: v.nodes.length })),
        };
      });
      saida.push({ tema, id, ...r });
    }
  }
  salvar('axe.json', saida);
});

test('2. leitor de tela: árvore de acessibilidade e o que a folha esconde', async ({ page }) => {
  await servir(page);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Accessibility.enable');
  let texto = '';
  const modal: Record<string, unknown>[] = [];
  for (const id of ['triagem', 'triagem-sim', 'treino', 'treino-descanso', 'treino-acabou', 'treino-senti', 'treino-trocar', 'treino-terminar', 'treino-texto', 'guia', 'fim']) {
    await abrir(page, id, id === 'guia' ? 600 : 300);
    texto += `\n\n===== ${id} =====\n` + (await page.locator('body').ariaSnapshot());
    // o "Senti algo" do cabeçalho continua na árvore que o leitor de tela usa?
    const { nodes } = (await cdp.send('Accessibility.getFullAXTree')) as { nodes: { ignored: boolean; ignoredReasons?: { name: string }[]; role?: { value: string }; name?: { value: string } }[] };
    const senti = nodes.filter((n) => n.name?.value === 'Senti algo');
    const foco = await page.evaluate(() => { const a = document.activeElement as HTMLElement; return `${a.tagName.toLowerCase()}#${a.id} "${(a.innerText || '').slice(0, 40)}"`; });
    modal.push({ id, focoAoAbrir: foco, sentiNaArvore: senti.map((n) => ({ ignorado: n.ignored, motivos: n.ignoredReasons?.map((x) => x.name) })) });
  }
  salvar('aria-snapshot.txt', texto);
  salvar('leitor-modal.json', modal);
});

test('3. folhas: o foco fica preso? volta ao fechar?', async ({ page }) => {
  await servir(page);
  const res: Record<string, unknown>[] = [];
  for (const id of ['treino-senti', 'treino-trocar', 'treino-terminar', 'selo', 'exercicio', 'dados-apagar']) {
    await abrir(page, id);
    const fora: string[] = [];
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab');
      const d = await page.evaluate(() => { const a = document.activeElement as HTMLElement; return { dentro: !!a.closest('.veu'), txt: (a.innerText || a.getAttribute('aria-label') || a.tagName).trim().slice(0, 30) }; });
      if (!d.dentro) fora.push(d.txt);
    }
    await page.keyboard.press('Escape');
    const depois = await page.evaluate(() => { const a = document.activeElement as HTMLElement; return `${a.tagName.toLowerCase()} "${(a.innerText || '').slice(0, 30)}"`; });
    res.push({ id, tabsFora: fora.length, deTabs: 30, exemplosFora: [...new Set(fora)].slice(0, 6), focoDepoisDeFechar: depois });
  }
  // o caminho real com teclado: focar o selo no início, Enter, Escape
  await abrir(page, 'inicio');
  await page.locator('main .selo').first().focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  const aberto = await page.evaluate(() => (document.activeElement as HTMLElement).innerText.slice(0, 30));
  await page.keyboard.press('Escape');
  const volta = await page.evaluate(() => (document.activeElement as HTMLElement).className);
  // o "Senti algo" pelo teclado no treino: abre por troca de endereço (a tela é refeita)
  await abrir(page, 'treino');
  await page.locator('.senti').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  const voltaSenti = await page.evaluate(() => { const a = document.activeElement as HTMLElement; return `${a.tagName.toLowerCase()}.${a.className} "${(a.innerText || '').slice(0, 30)}"`; });
  res.push({ caminho: 'selo no início com teclado', focoAoAbrir: aberto, focoAoFechar: volta }, { caminho: 'Senti algo com teclado', focoAoFechar: voltaSenti });
  salvar('folhas-foco.json', res);
});

test('4. foco coberto pelas barras fixas (WCAG 2.4.11), 360 × 740', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await servir(page);
  const res: Record<string, unknown>[] = [];
  for (const id of ['boas-vindas', 'triagem', 'triagem-sim', 'experiencia', 'rotina', 'equipamento-lista', 'inicio', 'treino', 'treino-descanso', 'treino-texto', 'guia', 'fim', 'semana', 'dados']) {
    await abrir(page, id);
    const vistos = new Set<string>();
    const cobertos: string[] = [];
    const parciais: string[] = [];
    let total = 0;
    for (let i = 0; i < 70; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(30);
      const d = await page.evaluate(() => {
        let a = document.activeElement as HTMLElement;
        if (!a || a === document.body) return null;
        const chave = a.id || a.outerHTML.slice(0, 120);
        if (a.matches('input') && a.closest('label')) a = a.closest('label') as HTMLElement;
        const r = a.getBoundingClientRect();
        let dentro = 0, cob = 0;
        for (const fx of [0.1, 0.5, 0.9]) for (const fy of [0.15, 0.5, 0.85]) {
          const x = r.left + r.width * fx, y = r.top + r.height * fy;
          if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) { cob++; continue; }
          const t = document.elementFromPoint(x, y);
          if (t && (a === t || a.contains(t))) dentro++; else cob++;
        }
        return { chave, txt: (a.innerText || a.getAttribute('aria-label') || a.tagName).trim().replace(/\s+/g, ' ').slice(0, 34), dentro, cob };
      });
      if (!d) continue;
      if (vistos.has(d.chave)) break;
      vistos.add(d.chave);
      total++;
      if (d.dentro === 0) cobertos.push(d.txt);
      else if (d.cob > 0) parciais.push(d.txt);
    }
    res.push({ id, focaveis: total, totalmenteCobertos: cobertos.length, parcialmenteCobertos: parciais.length, cobertos, parciais });
  }
  salvar('foco-coberto.json', res);
});

test('5. reflow a 320 px, zoom de 200% no Pixel 7 e letra do sistema maior', async ({ page }) => {
  await servir(page);
  const res: Record<string, unknown>[] = [];
  const telas = ['triagem', 'triagem-sim', 'treino', 'treino-descanso', 'treino-acabou', 'treino-senti', 'treino-texto', 'guia', 'fim', 'semana', 'inicio', 'equipamento-lista'];
  for (const [nome, w, h] of [['pequeno-360x740', 360, 740], ['reflow-320x640', 320, 640], ['zoom200-206x420', 206, 420], ['baixo-412x640', 412, 640]] as const) {
    await page.setViewportSize({ width: w, height: h });
    for (const id of telas) {
      await abrir(page, id, id === 'guia' ? 600 : 300);
      res.push({ vista: nome, id, ...(await page.evaluate(MEDIR_TELA)) });
      if (['treino', 'treino-descanso', 'triagem', 'treino-senti'].includes(id) && nome !== 'baixo-412x640')
        await page.screenshot({ path: `${OUT}/vista-${nome}-${id}.png`, animations: 'disabled' });
    }
  }
  // letra do sistema maior: o navegador pede 32 px na raiz em vez de 16 px. O que acontece com o texto?
  await page.setViewportSize({ width: 412, height: 839 });
  await abrir(page, 'treino');
  const antes = await page.evaluate(() => ({ corpo: getComputedStyle(document.querySelector('.meta')!).fontSize, botao: getComputedStyle(document.querySelector('#feita')!).fontSize }));
  await page.addStyleTag({ content: 'html{font-size:200%!important}' });
  const depois = await page.evaluate(() => ({ corpo: getComputedStyle(document.querySelector('.meta')!).fontSize, botao: getComputedStyle(document.querySelector('#feita')!).fontSize }));
  const css = readFileSync(`${DIR}/index.html`, 'utf8');
  res.push({ letraDoSistema200: { antes, depois }, unidadesNoCss: { px: (css.match(/\d+px/g) || []).length, rem: (css.match(/\d(\.\d+)?rem/g) || []).length, em: (css.match(/\d(\.\d+)?em\b/g) || []).length } });
  salvar('reflow-zoom.json', res);
});

test('6. espaçamento de texto (WCAG 1.4.12), 360 × 740', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await servir(page);
  const res: Record<string, unknown>[] = [];
  for (const id of IMPORTA) {
    await abrir(page, id, id === 'guia' ? 600 : 300);
    const antes = await page.evaluate(MEDIR_TELA);
    await page.addStyleTag({ content: '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}' });
    await page.waitForTimeout(100);
    const depois = await page.evaluate(MEDIR_TELA);
    res.push({ id, antes: { cortados: antes.cortados, rolaDeLado: antes.rolaDeLado, senti: antes.sentiInteiro, feita: antes.feitaInteira, fixoPct: antes.fixoPct }, depois: { cortados: depois.cortados, rolaDeLado: depois.rolaDeLado, senti: depois.sentiInteiro, feita: depois.feitaInteira, fixoPct: depois.fixoPct } });
    if (id === 'treino' || id === 'treino-descanso') await page.screenshot({ path: `${OUT}/espacamento-${id}.png`, animations: 'disabled' });
  }
  salvar('espacamento-texto.json', res);
});

test('7. tremor: distância entre alvos vizinhos, 360 × 740', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await servir(page);
  const res: Record<string, unknown>[] = [];
  for (const id of ['treino', 'treino-descanso', 'treino-acabou', 'treino-senti', 'treino-terminar', 'guia', 'dados-apagar', 'triagem', 'fim']) {
    await abrir(page, id, id === 'guia' ? 600 : 300);
    const pares = await page.evaluate(() => {
      const naFolha = !!document.querySelector('.veu');
      const els = Array.from(document.querySelectorAll<HTMLElement>('button, a[href], label.chip, label.opcao, label.item-eq, summary')).filter((e) => {
        if (e.closest('.proto')) return false;
        if (naFolha && !e.closest('.veu') && !e.closest('.cab')) return false;
        if (e.tagName === 'A' && getComputedStyle(e).display === 'inline') return false; // link no meio da frase: fora, como na 2.5.8
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight;
      });
      const nome = (e: HTMLElement) => (e.innerText || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 30);
      const out: { a: string; b: string; folga: number }[] = [];
      for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
        const a = els[i]!.getBoundingClientRect(), b = els[j]!.getBoundingClientRect();
        const dx = Math.max(0, b.left - a.right, a.left - b.right), dy = Math.max(0, b.top - a.bottom, a.top - b.bottom);
        const folga = Math.round(Math.hypot(dx, dy));
        if (folga < 12) out.push({ a: nome(els[i]!), b: nome(els[j]!), folga });
      }
      return out.sort((x, y) => x.folga - y.folga);
    });
    res.push({ id, paresComMenosDe12px: pares.length, pares: pares.slice(0, 40) });
  }
  salvar('alvos-vizinhos.json', res);
});

test('8. capturas para daltonismo e sol (Pixel 7, claro e escuro)', async ({ page }) => {
  await servir(page);
  for (const tema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: tema });
    for (const id of ['treino', 'treino-descanso', 'treino-acabou', 'semana', 'fim', 'treino-senti', 'triagem']) {
      await abrir(page, id);
      await page.screenshot({ path: `${OUT}/cor-${tema}-${id}.png`, animations: 'disabled' });
    }
    await abrir(page, 'guia', 400);
    await page.locator('[data-modo="mus"]').click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/cor-${tema}-guia-mus.png`, animations: 'disabled' });
    await page.locator('[data-modo="err"]').click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/cor-${tema}-guia-err.png`, animations: 'disabled' });
  }
});

async function quadros(page: Page, ms: number) {
  return page.evaluate((ms) => new Promise<number[]>((ok) => {
    const t: number[] = [];
    const ini = performance.now();
    const f = (agora: number) => { t.push(agora); if (agora - ini < ms) requestAnimationFrame(f); else ok(t.slice(1).map((x, i) => x - t[i]!)); };
    requestAnimationFrame(f);
  }), ms);
}
const resumo = (d: number[]) => {
  const s = [...d].sort((a, b) => a - b);
  const q = (p: number) => +s[Math.min(s.length - 1, Math.floor(p * s.length))]!.toFixed(1);
  return { quadros: d.length, p50: q(0.5), p95: q(0.95), max: +s[s.length - 1]!.toFixed(1), acima50ms: d.filter((x) => x > 50).length, fps: +(1000 / (d.reduce((a, b) => a + b, 0) / d.length)).toFixed(1) };
};

test('9. celular lento: CPU 1×, 4× e 6× (guia do protótipo e do app, abrir folha e trocar de tela)', async ({ page }) => {
  await servir(page);
  const cdp = await page.context().newCDPSession(page);
  const res: Record<string, unknown>[] = [];
  for (const taxa of [1, 4, 6]) {
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: taxa });
    await abrir(page, 'guia', 800);
    const guia = resumo(await quadros(page, 4000));
    // trocar de tela e abrir a folha "Senti algo": do toque ao 1º quadro pintado
    await abrir(page, 'inicio', 300);
    const troca = await page.evaluate(() => new Promise<number>((ok) => { const t0 = performance.now(); location.hash = 'treino'; requestAnimationFrame(() => requestAnimationFrame(() => ok(performance.now() - t0))); }));
    await page.waitForTimeout(300);
    const folha = await page.evaluate(() => new Promise<number>((ok) => { const t0 = performance.now(); (document.querySelector('.senti') as HTMLElement).click(); requestAnimationFrame(() => requestAnimationFrame(() => ok(performance.now() - t0))); }));
    res.push({ onde: 'protótipo', cpu: `${taxa}×`, guiaAnimando: guia, trocarDeTelaMs: Math.round(troca), abrirSentiAlgoMs: Math.round(folha) });
  }
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  // o app de hoje: o motor de verdade (src/engine) no guia
  const page2 = await page.context().newPage();
  const cdp2 = await page.context().newCDPSession(page2);
  for (const taxa of [1, 4, 6]) {
    await cdp2.send('Emulation.setCPUThrottlingRate', { rate: taxa });
    await page2.goto('http://localhost:4173/guia/supino-inclinado');
    await page2.waitForTimeout(1500);
    res.push({ onde: 'app de hoje /guia/supino-inclinado', cpu: `${taxa}×`, guiaAnimando: resumo(await quadros(page2, 4000)) });
  }
  salvar('cpu-lenta.json', res);
});

test('10. sem internet e pedidos externos', async ({ page, context }) => {
  const externos: string[] = [];
  await servir(page, externos);
  await abrir(page, 'treino', 800);
  const letraProto = await page.evaluate(() => document.fonts.check('800 17px "Atkinson Hyperlegible Next"'));
  // o app de hoje: carregar, deixar o service worker assumir, cortar a rede e recarregar
  const app = await context.newPage();
  const falhas: string[] = [];
  app.on('requestfailed', (r) => falhas.push(new URL(r.url()).host + new URL(r.url()).pathname.slice(0, 40)));
  await app.goto('http://localhost:4173/');
  await app.evaluate(async () => { await navigator.serviceWorker?.ready; });
  await app.reload();
  await app.waitForTimeout(800);
  const letraOnline = await app.evaluate(async () => { await document.fonts.ready; return document.fonts.check('700 17px "Atkinson Hyperlegible Next"'); });
  await context.setOffline(true);
  await app.reload();
  await app.waitForTimeout(2500);
  const offline = await app.evaluate(async () => {
    await document.fonts.ready;
    return { texto: document.body.innerText.trim().slice(0, 80), botoes: document.querySelectorAll('button, a').length, letraAtkinson: document.fonts.check('700 17px "Atkinson Hyperlegible Next"'), familia: getComputedStyle(document.body).fontFamily.slice(0, 80) };
  });
  await app.screenshot({ path: `${OUT}/app-offline.png` });
  await context.setOffline(false);
  salvar('offline.json', { prototipo: { hostsExternos: [...new Set(externos)], letraCarregada: letraProto }, app: { letraOnline, offline, pedidosQueFalharamOffline: [...new Set(falhas)] } });
});

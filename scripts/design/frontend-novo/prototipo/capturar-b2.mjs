// Fotografa o protótipo B2 (docs/revisoes/frontend-novo/prototipos/b2-placar/): as 4 telas, os 4 modos do guia, o
// descanso, o fim do descanso e as 4 folhas, nos temas claro e escuro, em 390 × 844 (em dobro) e 320 × 640.
// Abre o arquivo direto do disco, com ?limpo (sem a faixa do protótipo) e ?parado (relógio e Boneco parados).
// Uso: node scripts/design/frontend-novo/prototipo/capturar-b2.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const RAIZ = resolve('docs/revisoes/frontend-novo/prototipos');
const SAIDA = resolve(RAIZ, 'capturas-b2');
mkdirSync(SAIDA, { recursive: true });
const URL_BASE = pathToFileURL(resolve(RAIZ, 'b2-placar', 'index.html')).href + '?limpo&parado';
const tamanhos = [
  { nome: '390', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
  { nome: '320', viewport: { width: 320, height: 640 }, deviceScaleFactor: 1 },
];

const navegador = await chromium.launch();
const problemas = [];
const linhas = [];
for (const t of tamanhos) {
  for (const tema of ['claro', 'escuro']) {
    const contexto = await navegador.newContext({ viewport: t.viewport, deviceScaleFactor: t.deviceScaleFactor, isMobile: true, hasTouch: true, colorScheme: tema === 'claro' ? 'light' : 'dark' });
    const page = await contexto.newPage();
    page.on('console', (m) => m.type() === 'error' && problemas.push(`${t.nome} ${tema}: ${m.text()}`));
    page.on('pageerror', (e) => problemas.push(`${t.nome} ${tema}: ${e.message}`));
    const medidas = {};
    const foto = async (tela, acao) => {
      await page.evaluate(() => (scrollTo(0, 0), document.fonts.ready));
      await page.waitForTimeout(250);
      await page.screenshot({ path: resolve(SAIDA, `${tela}-${t.nome}-${tema}.png`), animations: 'disabled' });
      const m = await page.evaluate(() => ({ lado: document.documentElement.scrollWidth - window.innerWidth, telas: document.documentElement.scrollHeight / window.innerHeight }));
      if (m.lado > 0) problemas.push(`${tela} ${t.nome} ${tema}: rola de lado ${m.lado}px`);
      let aVista = null;
      if (acao) {
        const c = await page.locator(acao).first().boundingBox();
        aVista = !!c && c.y >= 0 && c.y + c.height <= t.viewport.height;
      }
      medidas[tela] = `${m.telas.toFixed(2)} tela${acao ? (aVista ? ', ação à vista' : ', AÇÃO FORA') : ''}`;
    };
    const toque = (sel) => page.locator(`${sel}:visible`).first().click();
    const folha = async (nome, arquivo, de = '') => {
      await toque(`${de}[data-acao="folha"][data-v="${nome}"]`);
      await foto(arquivo);
      await toque('[data-acao="fechar"]');
    };

    await page.goto(URL_BASE);
    await foto('01-inicio', '.tela-inicio [data-acao="ir"][data-v="treino"]');
    await toque('.tela-inicio [data-acao="ir"][data-v="treino"]');
    await foto('02-treino-serie-vazia', '.so-serie [data-acao="feita"]');
    await toque('[data-acao="rir"][data-v="3"]');
    await foto('03-treino-serie', '.so-serie [data-acao="feita"]');
    // em tela muito baixa os modos saem do treino (ficam no guia completo): aí não há o que fotografar
    if (await page.locator('[data-acao="modo"]:visible').count()) {
      for (const [modo, arquivo] of [['err', '04-treino-erros'], ['mus', '05-treino-musculos'], ['traj', '06-treino-trajetoria']]) {
        await toque(`[data-acao="modo"][data-v="${modo}"]`);
        await foto(arquivo);
      }
      await toque('[data-acao="modo"][data-v="tec"]');
    }
    await folha('sentir', '07-folha-senti-algo');
    await folha('porque', '08-folha-por-que');
    await folha('como', '09-folha-como-fazer');
    await toque('.so-serie [data-acao="feita"]');
    await foto('10-descanso', '.so-relogio [data-acao="feita"]');
    // o fim do descanso: o protótipo abre direto nesse estado pelo endereço
    await page.goto(URL_BASE + '#acabou');
    await foto('11-hora-da-proxima-serie', '.so-relogio [data-acao="feita"]');
    await page.goto(URL_BASE + '#fim');
    await foto('12-fim-do-treino', '.tela-fim [data-acao="ir"][data-v="semana"]');
    await folha('porque-fim', '13-folha-por-que-da-proxima', '.proxima li:nth-child(2) ');
    await page.goto(URL_BASE + '#semana');
    await foto('14-semana');
    if (tema === 'claro') linhas.push(`${t.nome}: ${Object.entries(medidas).map(([k, v]) => `${k.slice(3)} ${v}`).join(' · ')}`);
    await contexto.close();
  }
}
await navegador.close();
try {
  for (const f of readdirSync(SAIDA).filter((x) => x.endsWith('.png') && !x.startsWith('folha'))) execFileSync('convert', [resolve(SAIDA, f), '-strip', '-dither', 'None', '-colors', '256', `png8:${resolve(SAIDA, f)}`]);
} catch {
  console.log('sem o ImageMagick: as capturas ficaram sem compressão');
}
console.log(linhas.join('\n'));
console.log(problemas.length ? `problemas:\n  ${problemas.join('\n  ')}` : 'console sem erros e nenhuma tela rola de lado');

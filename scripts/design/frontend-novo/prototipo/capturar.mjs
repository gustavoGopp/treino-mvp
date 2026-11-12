// Fotografa os protótipos das direções visuais (docs/revisoes/frontend-novo/prototipos/): início, treino (a série) e
// descanso, nos temas claro e escuro, em 390 × 844 (em dobro, para o Gustavo olhar) e em 320 × 640 (conferência).
// Abre os arquivos direto do disco, com ?limpo (sem a faixa do protótipo) e ?parado (relógio e Boneco parados).
// Uso: node scripts/design/frontend-novo/prototipo/capturar.mjs [a-giz b-placar c-ficha]
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const RAIZ = resolve('docs/revisoes/frontend-novo/prototipos');
const SAIDA = resolve(RAIZ, 'capturas');
mkdirSync(SAIDA, { recursive: true });
const direcoes = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(RAIZ).filter((d) => /^[a-z]-/.test(d) && existsSync(resolve(RAIZ, d, 'index.html')));
const tamanhos = [
  { nome: '390', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
  { nome: '320', viewport: { width: 320, height: 640 }, deviceScaleFactor: 1 },
];

const navegador = await chromium.launch();
const problemas = [];
for (const d of direcoes) {
  for (const t of tamanhos) {
    for (const tema of ['claro', 'escuro']) {
      const contexto = await navegador.newContext({ viewport: t.viewport, deviceScaleFactor: t.deviceScaleFactor, isMobile: true, hasTouch: true, colorScheme: tema === 'claro' ? 'light' : 'dark' });
      const page = await contexto.newPage();
      page.on('console', (m) => m.type() === 'error' && problemas.push(`${d} ${t.nome} ${tema}: ${m.text()}`));
      page.on('pageerror', (e) => problemas.push(`${d} ${t.nome} ${tema}: ${e.message}`));
      const foto = async (tela) => {
        await page.evaluate(() => (scrollTo(0, 0), document.fonts.ready));
        await page.waitForTimeout(150);
        await page.screenshot({ path: resolve(SAIDA, `${d}-${tela}-${t.nome}-${tema}.png`), animations: 'disabled' });
        // rolagem lateral e o que sobra abaixo da tela
        const m = await page.evaluate(() => ({ lado: document.documentElement.scrollWidth - window.innerWidth, altura: document.documentElement.scrollHeight, tela: window.innerHeight }));
        if (m.lado > 0) problemas.push(`${d} ${tela} ${t.nome} ${tema}: rola de lado ${m.lado}px`);
        return m;
      };
      await page.goto(pathToFileURL(resolve(RAIZ, d, 'index.html')).href + '?limpo&parado');
      const mi = await foto('1-inicio');
      await page.locator('[data-acao="ir-treino"]:visible').first().click();
      // o estado inicial pede a reserva (RIR), como no app: marca 3 (dentro da meta de hoje) antes de fotografar
      const ajuste = page.locator('[data-acao="ajuste"][data-v="rir"]:visible');
      if (await ajuste.count()) await ajuste.first().click();
      await page.locator('[data-acao="rir"][data-v="3"]:visible').first().click();
      const mt = await foto('2-treino');
      const feita = page.locator('[data-acao="feita"]:visible').first();
      const caixa = await feita.boundingBox(); // com a página no topo: é o que se vê ao abrir
      await feita.click();
      const md = await foto('3-descanso');
      if (tema === 'claro') console.log(`${d} ${t.nome}: início ${(mi.altura / mi.tela).toFixed(2)} telas · treino ${(mt.altura / mt.tela).toFixed(2)} telas, "Série feita" ${caixa && caixa.y + caixa.height <= t.viewport.height ? 'à vista' : 'FORA da 1ª tela'} · descanso ${(md.altura / md.tela).toFixed(2)} telas`);
      await contexto.close();
    }
  }
}
await navegador.close();
// 256 cores, como as capturas do app (se o ImageMagick existir): a pasta cabe no git e o desenho continua nítido
try {
  for (const f of readdirSync(SAIDA).filter((x) => x.endsWith('.png') && direcoes.some((d) => x.startsWith(d)))) execFileSync('convert', [resolve(SAIDA, f), '-strip', '-dither', 'None', '-colors', '256', `png8:${resolve(SAIDA, f)}`]);
} catch {
  console.log('sem o ImageMagick: as capturas ficaram sem compressão');
}
console.log(problemas.length ? `problemas:\n  ${problemas.join('\n  ')}` : 'console sem erros e nenhuma tela rola de lado');

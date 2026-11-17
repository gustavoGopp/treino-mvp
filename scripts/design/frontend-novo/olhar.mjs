// Frontend novo, etapa 2: olhar uma tela do app com a persona fictícia Ana, sem percorrer o cadastro.
// O estado da Ana é montado pelo domínio (como em medir.mjs) e posto no navegador; a rota é aberta, os toques
// pedidos são dados e a tela é fotografada. Também diz se houve erro no console e se a página rola para o lado.
// Uso (com o build pronto em dist/):
//   node scripts/design/frontend-novo/olhar.mjs <pasta> <largura>x<altura> <claro|escuro> <nome>=<rota>[>>toque>>toque…] …
//   um toque é o nome acessível de um botão ou link; "css:<seletor>" toca num seletor; "html:<seletor>" imprime o HTML;
//   "lista:<seletor>=<n>" escolhe a opção n de uma lista
// Opções por variável: LETRA=125 (letra do sistema em 125%), PARADO=1 (prefers-reduced-motion), INTEIRA=1 (página inteira),
// ERRO=1 (força a tela de erro, pela chave de teste do app), MARGEM=1 (lista quem passa da margem de 16 px da página)
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { build } from 'esbuild';
import { chromium } from 'playwright';

const [pasta, tamanho, tema, ...telas] = process.argv.slice(2);
const [largura, altura] = tamanho.split('x').map(Number);
mkdirSync(pasta, { recursive: true });

const entrada = `
  export * from './tests/personas/index.ts';
  export { gerarPrograma } from './src/domain/gerador/index.ts';
  export { estadoSchema, VERSAO_ESTADO } from './src/storage/esquema.ts';
`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent' });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const perfil = M.ana.perfil;
const r = M.gerarPrograma(perfil, M.ana.inventario);
if (r.status !== 'ok') throw new Error('o programa da Ana não foi gerado');
const quando = '2026-11-01T15:00:00.000Z';
const estado = {
  versao: M.VERSAO_ESTADO,
  avisoAceitoEm: quando,
  triagem: { respostas: perfil.triagem.respostas },
  nivel: { respostas: { tempoContinuo: 'menos-6m', tecnica: 'sim', semanasParado: perfil.semanasParado }, escolhido: perfil.nivel },
  rotina: { diasSemana: perfil.diasSemana, minutosSessao: perfil.minutosSessao, prioridades: perfil.prioridades },
  locais: [{ id: 'local-1', nome: 'Meu local', inventario: M.ana.inventario }],
  localPrincipalId: 'local-1',
  restricoes: { evitarExercicios: perfil.evitarExercicios, evitarEquipamentos: perfil.evitarEquipamentos },
  programa: { programa: r.programa, geradoEm: quando, localId: 'local-1' },
  historico: [],
};
if (!M.estadoSchema.safeParse(estado).success) throw new Error('estado da Ana inválido');

const noAr = async () => { try { return (await fetch('http://localhost:4173/')).ok; } catch { return false; } };
let servidor = null;
if (!(await noAr())) {
  servidor = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { stdio: 'ignore', detached: true });
  for (let i = 0; i < 60 && !(await noAr()); i++) await new Promise((ok) => setTimeout(ok, 500));
}
const navegador = await chromium.launch();
try {
  for (const tela of telas) {
    const [nome, resto] = tela.split(/=(.*)/s);
    const [rota, ...toques] = resto.split('>>');
    const ctx = await navegador.newContext({ viewport: { width: largura, height: altura }, colorScheme: tema === 'escuro' ? 'dark' : 'light', deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo', reducedMotion: process.env.PARADO ? 'reduce' : 'no-preference' });
    const page = await ctx.newPage();
    const erros = [];
    page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
    page.on('pageerror', (e) => erros.push(String(e)));
    await page.goto('http://localhost:4173/termos');
    await page.evaluate(async (e) => {
      const db = await new Promise((ok, erro) => {
        const p = indexedDB.open('keyval-store');
        p.onupgradeneeded = () => p.result.createObjectStore('keyval');
        p.onsuccess = () => ok(p.result);
        p.onerror = () => erro(p.error);
      });
      await new Promise((ok, erro) => {
        const p = db.transaction('keyval', 'readwrite').objectStore('keyval').put(e, 'estado');
        p.onsuccess = () => ok();
        p.onerror = () => erro(p.error);
      });
    }, estado);
    if (process.env.ERRO) await page.evaluate(() => sessionStorage.setItem('treino-teste-erro', '1'));
    await page.goto(`http://localhost:4173${rota}`);
    // a letra maior do sistema, como nos testes (pelo estilo do elemento: a política de segurança do app barra uma folha de estilo embutida)
    if (process.env.LETRA) await page.evaluate((p) => (document.documentElement.style.fontSize = `${p}%`), process.env.LETRA);
    await page.waitForTimeout(1200);
    for (const t of toques) {
      if (t.startsWith('html:')) {
        console.log((await page.locator(t.slice(5)).first().evaluate((el) => el.outerHTML)).slice(0, 6000));
        continue;
      }
      if (t.startsWith('lista:')) {
        // "lista:<seletor>=<n>": escolhe a opção de número n numa lista (a carga, por exemplo)
        const [seletor, n] = t.slice(6).split(/=(\d+)$/);
        await page.locator(seletor).first().selectOption({ index: Number(n) }).catch((e) => console.log(`  [${nome}] lista "${seletor}": ${String(e).split('\n')[0]}`));
        continue;
      }
      const alvo = t.startsWith('css:') ? page.locator(t.slice(4)).first() : page.getByRole('button', { name: t }).or(page.getByRole('link', { name: t })).or(page.getByRole('tab', { name: t })).first();
      await alvo.click({ timeout: 5000 }).catch((e) => console.log(`  [${nome}] não achei "${t}": ${String(e).split('\n')[0]}`));
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${pasta}/${nome}.png`, fullPage: !!process.env.INTEIRA });
    const rolaDeLado = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    // quem passa da borda direita (os 6 primeiros), para achar o culpado da rolagem de lado
    const passam = rolaDeLado
      ? await page.evaluate(() =>
          [...document.querySelectorAll('body *')]
            .filter((el) => el.getBoundingClientRect().right > innerWidth + 1 && el.getBoundingClientRect().width > 0)
            .slice(0, 6)
            .map((el) => `${el.tagName.toLowerCase()}.${String(el.className?.baseVal ?? el.className).replace(/\s+/g, '.')} (${Math.round(el.getBoundingClientRect().right)})`),
        )
      : [];
    // MARGEM=1: quem passa da margem da página (16 px) sem ser peça de borda a borda. Serve para achar o que cabe por
    // poucos pixels aqui e estoura onde a letra renderiza um pouco mais larga (aconteceu na verificação do GitHub).
    if (process.env.MARGEM) {
      const fora = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const folhas = [...document.querySelectorAll('.folha')].filter((f) => !f.closest('[inert]'));
        const raiz = folhas.at(-1) ?? document.body;
        const limite = folhas.length ? raiz.getBoundingClientRect().right - 23.5 : w - 15.5;
        return [...raiz.querySelectorAll('*')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            // quem começa na borda esquerda é o contêiner da página (ou uma peça de borda a borda), não conteúdo
            if (r.left < 1) return false;
            return r.width > 0 && r.height > 0 && r.right > limite && el.checkVisibility() && !el.closest('svg, [inert], .acao-fixa, .nav-inferior, .palco-treino, .stage, .folha-cab, .veu > :not(.folha), .sr');
          })
          .filter((el) => !['acao-fixa', 'nav-inferior', 'folha', 'veu'].some((c) => el.classList.contains(c)))
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.getAttribute('class') || '').split(' ')[0]} "${(el.textContent || '').trim().slice(0, 18)}" +${(el.getBoundingClientRect().right - limite).toFixed(1)}`);
      });
      if (fora.length) console.log(`  [${nome}] passa da margem: ${fora.join(' | ')}`);
    }
    console.log(`${nome}: erros no console ${erros.length}${erros.length ? ` (${erros[0].slice(0, 120)})` : ''}; rola para o lado: ${rolaDeLado ? `SIM → ${passam.join(', ')}` : 'não'}`);
    await ctx.close();
  }
} finally {
  await navegador.close();
  if (servidor) try { process.kill(-servidor.pid); } catch { /* já tinha saído */ }
}

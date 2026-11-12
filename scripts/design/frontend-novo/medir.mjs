// Frontend novo, etapa 2: as medidas de antes e depois, nas réguas do redesign (docs/revisoes/redesign/medidas.md).
// - o JavaScript e a letra do build de produção (dist/);
// - o Lighthouse por rota (celular simulado, CPU 4× mais lenta e rede 4G lenta), em duas situações: com o app já
//   instalado (o perfil do navegador tem o estado da persona fictícia Ana e o service worker já guardou os arquivos) e
//   na 1ª visita (perfil vazio).
// O estado da Ana é montado pelo domínio (o gerador real e o esquema do estado guardado), não pela interface: assim a
// medida não depende de como as telas do cadastro estiverem no dia.
// O Lighthouse roda via npx (ferramenta, não dependência do app), com o Chromium do Playwright.
// Uso: npm run build && node scripts/design/frontend-novo/medir.mjs <antes|depois>
// Saída: docs/revisoes/frontend-novo/medidas/<fase>.json
import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { build } from 'esbuild';
import { chromium } from 'playwright';

const FASE = process.argv[2] ?? 'antes';
const PASTA = 'reports/design/frontend-novo/lighthouse';
const CHROME = chromium.executablePath();
const saida = { medidoEm: new Date().toISOString(), fase: FASE, commit: execFileSync('git', ['rev-parse', '--short', 'HEAD']).toString().trim(), bundle: {}, lighthouse: [] };

// 1. O build: os .js e as letras, com o tamanho comprimido
const kB = (f) => +(gzipSync(readFileSync(f)).length / 1000).toFixed(1);
const js = readdirSync('dist/assets').filter((f) => f.endsWith('.js'));
saida.bundle = {
  arquivosJs: js.length,
  totalJsGzipKB: +js.reduce((s, f) => s + kB(`dist/assets/${f}`), 0).toFixed(1),
  maiorJs: js.map((f) => ({ arquivo: f.replace(/-[\w-]{8}\.js$/, '.js'), gzipKB: kB(`dist/assets/${f}`) })).sort((a, b) => b.gzipKB - a.gzipKB).slice(0, 5),
  css: readdirSync('dist/assets').filter((f) => f.endsWith('.css')).map((f) => ({ arquivo: f.replace(/-[\w-]{8}\.css$/, '.css'), gzipKB: kB(`dist/assets/${f}`) })),
  letras: readdirSync('dist/fonts').filter((f) => f.endsWith('.woff2')).map((f) => ({ arquivo: f, kB: +(statSync(`dist/fonts/${f}`).size / 1000).toFixed(1) })),
};

// 2. O estado da Ana, pelo domínio
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
const valido = M.estadoSchema.safeParse(estado);
if (!valido.success) throw new Error(`estado da Ana inválido: ${JSON.stringify(valido.error.issues.slice(0, 3))}`);

// 3. O app servido, como em produção
// num grupo próprio, para o fim do script derrubar o servidor inteiro (o npx abre o vite como filho)
const servidor = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { stdio: 'ignore', detached: true });
const noAr = async () => { for (let i = 0; i < 60; i++) { try { if ((await fetch('http://localhost:4173/')).ok) return; } catch { /* ainda subindo */ } await new Promise((ok) => setTimeout(ok, 500)); } throw new Error('o app não subiu em 4173'); };
try {
  await noAr();
  rmSync(PASTA, { recursive: true, force: true });
  mkdirSync(`${PASTA}/perfil-ana`, { recursive: true });
  mkdirSync(`${PASTA}/perfil-vazio`, { recursive: true });
  const ctx = await chromium.launchPersistentContext(`${PASTA}/perfil-ana`, { executablePath: CHROME, viewport: { width: 412, height: 915 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4173/');
  await page.waitForLoadState('networkidle');
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
  // abre o programa uma vez: confere que o estado foi aceito e deixa o service worker guardar os arquivos
  await page.goto('http://localhost:4173/programa');
  await page.getByRole('button', { name: /^Começar o treino/ }).waitFor();
  await page.waitForTimeout(3000);
  await ctx.close();

  const medir = (rota, perfilDir, situacao) => {
    const nome = `${situacao}-${rota === '/' ? 'inicio' : rota.slice(1).replace(/\//g, '-')}`;
    const arq = `${PASTA}/${nome}.json`;
    try {
      execFileSync('npx', ['--yes', 'lighthouse@13', `http://localhost:4173${rota}`, '--disable-storage-reset', '--form-factor=mobile', '--throttling-method=simulate', '--only-categories=performance,accessibility,best-practices', '--output=json', `--output-path=${arq}`, '--quiet', `--chrome-flags=--headless=new --no-sandbox --user-data-dir=${perfilDir}`], { stdio: 'ignore', timeout: 240_000, env: { ...process.env, CHROME_PATH: CHROME } });
      const l = JSON.parse(readFileSync(arq, 'utf8'));
      const a = l.audits;
      saida.lighthouse.push({
        situacao,
        rota,
        url: l.finalDisplayedUrl.replace('http://localhost:4173', ''),
        versao: l.lighthouseVersion,
        desempenho: Math.round(l.categories.performance.score * 100),
        acessibilidade: Math.round(l.categories.accessibility.score * 100),
        boasPraticas: Math.round(l.categories['best-practices'].score * 100),
        fcpMs: Math.round(a['first-contentful-paint'].numericValue),
        lcpMs: Math.round(a['largest-contentful-paint'].numericValue),
        tbtMs: Math.round(a['total-blocking-time'].numericValue),
        cls: +a['cumulative-layout-shift'].numericValue.toFixed(3),
        pedidos: a['network-requests']?.details?.items?.length,
        pedidosExternos: (a['network-requests']?.details?.items ?? []).filter((i) => /^https?:/.test(i.url) && !i.url.startsWith('http://localhost:4173')).length,
        falhasAcessibilidade: l.categories.accessibility.auditRefs.filter((ref) => a[ref.id]?.score === 0).map((ref) => ref.id),
      });
    } catch (e) {
      saida.lighthouse.push({ situacao, rota, erro: String(e).slice(0, 300) });
    }
  };
  for (const rota of ['/', '/comecar/triagem', '/programa', '/treino', '/guia/bulgaro', '/semana', '/dados']) medir(rota, `${PASTA}/perfil-ana`, 'instalado');
  medir('/', `${PASTA}/perfil-vazio`, 'primeira-visita');
} finally {
  try { process.kill(-servidor.pid); } catch { /* já tinha saído */ }
}
mkdirSync('docs/revisoes/frontend-novo/medidas', { recursive: true });
writeFileSync(`docs/revisoes/frontend-novo/medidas/${FASE}.json`, JSON.stringify(saida, null, 2) + '\n');
console.log(JSON.stringify(saida.bundle));
for (const l of saida.lighthouse) console.log(l.erro ? `${l.situacao} ${l.rota}: ERRO ${l.erro}` : `${l.situacao} ${l.rota} → ${l.url}: desempenho ${l.desempenho}, acessibilidade ${l.acessibilidade}, bloqueio ${l.tbtMs} ms, maior pintura ${l.lcpMs} ms${l.falhasAcessibilidade.length ? `, falhas: ${l.falhasAcessibilidade.join(', ')}` : ''}`);

// M6, a triagem: as imagens do caminho de quem tem pressão alta controlada e responde a verdade.
// Uso (com o build pronto em dist/): node docs/revisoes/melhorias/m6/capturas.mjs <sufixo>   (ex.: antes)
// Persona fictícia: 55 anos, pressão alta controlada com remédio, sem restrição do médico. Nenhum dado real.
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const sufixo = process.argv[2] ?? 'antes';
const pasta = new URL('.', import.meta.url).pathname;
const noAr = async () => { try { return (await fetch('http://localhost:4173/')).ok; } catch { return false; } };
let servidor = null;
if (!(await noAr())) {
  servidor = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { stdio: 'ignore', detached: true });
  for (let i = 0; i < 60 && !(await noAr()); i++) await new Promise((ok) => setTimeout(ok, 500));
}
const navegador = await chromium.launch();
try {
  const ctx = await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo', reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  let toques = 0;
  const tocar = async (alvo) => { await alvo.click(); toques++; await page.waitForTimeout(400); };
  const foto = (nome) => page.screenshot({ path: `${pasta}${nome}-${sufixo}.png`, fullPage: true });
  await page.goto('http://localhost:4173/');
  await page.evaluate(async () => {
    const db = await new Promise((ok, erro) => { const p = indexedDB.open('keyval-store'); p.onupgradeneeded = () => p.result.createObjectStore('keyval'); p.onsuccess = () => ok(p.result); p.onerror = () => erro(p.error); });
    await new Promise((ok, erro) => { const t = db.transaction('keyval', 'readwrite'); t.objectStore('keyval').put({ versao: 9, avisoAceitoEm: '2026-11-22T12:00:00.000Z', historico: [] }, 'estado'); t.oncomplete = () => ok(); t.onerror = () => erro(t.error); });
  });
  await page.goto('http://localhost:4173/comecar/triagem');
  await page.waitForTimeout(800);
  await foto('1-pergunta-geral');
  await tocar(page.getByRole('button', { name: /Sim, alguma/ }));
  for (const rotulo of process.env.MARCAR ? process.env.MARCAR.split('|') : ['Problema no coração ou pressão alta', 'Remédio para doença crônica'])
    await tocar(page.getByRole('checkbox', { name: new RegExp(rotulo) }));
  await foto('2-marcar');
  await tocar(page.getByRole('button', { name: 'Continuar' }));
  await foto('3-seguinte');
  const confirma = page.getByRole('button', { name: 'Isso, nenhuma destas' });
  if (await confirma.count()) { await tocar(confirma); await foto('4-resultado'); }
  const saida = page.getByRole('button', { name: 'Vou procurar avaliação e volto depois' });
  if (await saida.count()) { await tocar(saida); await foto('5-volto-depois'); }
  console.log(`toques na triagem: ${toques}; título final: ${await page.getByRole('heading', { level: 1 }).first().textContent()}; rota: ${new URL(page.url()).pathname}`);
} finally {
  await navegador.close();
  if (servidor) process.kill(-servidor.pid);
}

// M6, a triagem: as imagens do caminho de quem tem pressão alta controlada e responde a verdade.
// Uso (com o build pronto em dist/): node docs/revisoes/melhorias/m6/capturas.mjs
// Persona fictícia: 55 anos, pressão alta controlada com remédio, sem restrição do médico. Nenhum dado real.
// As imagens "-antes" foram feitas em 22/11/2026 com a versão de antes deste lote (commit d798391); este script faz as "-depois".
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

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
  const tocar = async (alvo) => { await alvo.click(); toques++; await page.waitForTimeout(350); };
  const foto = (nome) => page.screenshot({ path: `${pasta}${nome}-depois.png`, fullPage: true });
  const marcar = (rotulo) => tocar(page.locator('label.opcao', { hasText: rotulo }).first().getByRole('checkbox'));
  const responder = (grupo, resposta) => tocar(page.getByRole('group', { name: grupo }).getByLabel(resposta, { exact: true }));
  const abrir = async () => {
    await page.goto('http://localhost:4173/');
    await tocar(page.getByRole('button', { name: 'Começar', exact: true }));
    toques = 0;
  };
  await abrir();
  await foto('1-pergunta-geral');
  await tocar(page.getByRole('button', { name: /Sim, alguma/ }));
  await marcar('Pressão alta');
  await marcar('Remédio para doença crônica');
  await foto('2-marcar-seguimento-vazio');
  await responder('A sua pressão está controlada?', 'Sim');
  await responder('Algum médico pediu para você evitar ou limitar exercício?', 'Não');
  await responder('O remédio é só o da pressão?', 'Sim');
  await foto('2-marcar');
  await tocar(page.getByRole('button', { name: 'Continuar' }));
  await foto('3-cuidados');
  await tocar(page.getByRole('button', { name: 'Entendi, continuar' }));
  console.log(`pressão controlada: ${toques} toques na triagem; chegou a "${await page.getByRole('heading', { level: 1 }).first().textContent()}"`);
  // a outra ponta: "não sei" continua pausando, agora com a saída para quem ainda não foi avaliado
  await ctx.clearCookies();
  await page.evaluate(() => new Promise((ok) => { const p = indexedDB.deleteDatabase('keyval-store'); p.onsuccess = p.onerror = p.onblocked = () => ok(); }));
  await abrir();
  await tocar(page.getByRole('button', { name: /Sim, alguma/ }));
  await marcar('Pressão alta');
  await responder('A sua pressão está controlada?', 'Não sei');
  await responder('Algum médico pediu para você evitar ou limitar exercício?', 'Não');
  await tocar(page.getByRole('button', { name: 'Continuar' }));
  await foto('4-pausa');
  await tocar(page.getByRole('button', { name: 'Vou procurar avaliação e volto depois' }));
  await foto('5-pausa-volto-depois');
} finally {
  await navegador.close();
  if (servidor) process.kill(-servidor.pid);
}

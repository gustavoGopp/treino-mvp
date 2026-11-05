// Folha-piloto da auditoria de 04/11/2026 (docs/revisoes/auditoria-fable.md, Parte D): o modo Erros de hoje
// (figura errada cheia em vermelho + o certo em palitos verdes) ao lado da proposta (o certo cheio + só a parte
// errada em vermelho tracejado, com o nome do erro). Não muda nenhuma linha de base: a proposta liga a chave
// CTX.ACABAMENTO.erroInvertido só aqui.
// Uso: node scripts/piloto-erros.mjs [saida.png] [id,id,...]
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const [saidaArg, idsArg] = process.argv.slice(2);
const saida = saidaArg ?? 'test-results/piloto-erros.png';
const IDS = (idsArg ?? 'remada-unilateral-sem-banco,rosca-martelo,goblet,stiff,elevacao-halteres,remada-suspensao').split(',');
const entrada = `export * from './src/engine/index.ts'; export { prep, calib } from './src/engine/cena.ts'; export * from './src/engine/estilo/index.ts';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const css = readFileSync('src/styles.css', 'utf8');
// Desde o R4 (05/11/2026) a proposta é o padrão do Boneco: a coluna "hoje" desliga a chave; o título vai nas opções.
const quadro = (ex, view, t, err, proposta, titulo) => {
  M.CTX.ACABAMENTO = { ...M.acabamento(ex), erroInvertido: proposta ? 1 : 0 };
  let q;
  try { q = M.montarSvgEstilo(ex, view, 'err', t, err, 300, 'a', false, { tituloErro: titulo }); } finally { M.CTX.ACABAMENTO = null; }
  return `<svg class="${q.classe}" viewBox="${q.viewBox}">${q.html}</svg>`;
};
let html = `<style>${css}body{background:#fff;font:13px sans-serif;margin:12px}h2{font-size:15px;margin:14px 0 4px}.l{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:1080px}figure{margin:0;background:var(--stage);border:1px solid #ddd}figure svg{width:100%;height:255px;display:block}figcaption{padding:3px 6px;font-size:12px}.cab{display:grid;grid-template-columns:repeat(3,1fr);width:1080px;font-weight:700;font-size:12px}</style>`;
html += `<h1 style="font-size:18px">Modo Erros: hoje × proposta (auditoria de 04/11/2026)</h1><p>Em cada linha, um erro de um exercício. <b>Hoje:</b> a figura que erra em vermelho cheio e o certo em palitos verdes por cima. <b>Proposta:</b> o certo é a figura cheia; só a parte do corpo que erra aparece em vermelho tracejado, com o nome do erro.</p>`;
for (const id of IDS) {
  const ex = M.EX.find((e) => e.id === id);
  if (!ex) throw new Error('não achei ' + id);
  const texto = JSON.parse(readFileSync(`src/conteudo/exercicios/${id}.json`, 'utf8'));
  const t = ex.seq[2] ? ex.seq[2].t0 + (ex.seq[2].kind === 'hold' ? ex.seq[2].dur / 2 : ex.seq[2].dur * 0.5) : 0;
  html += `<h2>${texto.name}</h2><div class="cab"><div></div><div>hoje</div><div>proposta</div></div>`;
  ex.errors.forEach((e, i) => {
    html += `<div class="l"><figure><figcaption><b>${texto.errors.find((x) => x.id === e.id)?.title ?? e.id}</b><br>${texto.errors.find((x) => x.id === e.id)?.desc ?? ''}<br><i>vista ${e.view}</i></figcaption></figure>`;
    const titulo = texto.errors.find((x) => x.id === e.id)?.title ?? e.id;
    html += `<figure>${quadro(ex, e.view, t, i, false, titulo)}<figcaption>hoje</figcaption></figure>`;
    html += `<figure>${quadro(ex, e.view, t, i, true, titulo)}<figcaption>proposta</figcaption></figure></div>`;
  });
}
writeFileSync('/tmp/piloto-erros.html', html);
const { chromium } = createRequire(import.meta.url)('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1120, height: 800 } });
await p.goto('file:///tmp/piloto-erros.html');
await p.screenshot({ path: saida, fullPage: true });
await b.close();
console.log('piloto:', saida);

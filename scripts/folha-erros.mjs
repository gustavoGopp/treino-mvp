// Folha do modo Erros do Boneco (R4, 05/11/2026): todos os erros de todas as animações aprovadas (ou de uma lista),
// em páginas, com colunas escolhidas. É a folha que o Gustavo aprova antes de a linha de base estilo-a.json ser regravada.
// Não muda nenhuma linha de base: as chaves são ligadas só aqui, por coluna.
// Uso: node scripts/folha-erros.mjs <saida.png> [--ids=a,b] [--pagina=N] [--por-pagina=11] [--colunas=hoje,proposta,maior]
//      [--tema=escuro] [--so-pequenos] [--titulo="..."]
// Colunas: hoje = modo antigo (vermelho cheio + palitos verdes) no meio da 3ª fase; proposta = erro sobre o certo no
// meio da 3ª fase; maior = erro sobre o certo no instante da maior diferença; equip = maior + o equipamento da pose errada;
// pequeno-hoje = maior, com os erros pequenos no modo antigo; pequeno-contorno = maior, com os erros pequenos em contorno;
// pequeno-equip = maior, com os erros pequenos mostrando só o equipamento da pose errada em vermelho (padrão).
import { build } from 'esbuild';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const saida = args.find((a) => !a.startsWith('--')) ?? 'test-results/folha-erros.png';
const opt = (n, d) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const tem = (n) => args.includes(`--${n}`);
const colunas = opt('colunas', 'hoje,maior').split(',');
const porPagina = Number(opt('por-pagina', 11));
const pagina = Number(opt('pagina', 0));
const escuro = opt('tema', 'claro') === 'escuro';

const entrada = `export * from './src/engine/index.ts'; export { prep, calib } from './src/engine/cena.ts'; export * from './src/engine/estilo/index.ts';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const css = readFileSync('src/styles.css', 'utf8');
const texto = (id) => {
  const f = [`src/conteudo/exercicios/${id}.json`, `src/conteudo/revisao/${id}.json`].find(existsSync);
  return f ? JSON.parse(readFileSync(f, 'utf8')) : { name: id, errors: [] };
};
const COLUNAS = {
  hoje: { nome: 'hoje', chaves: { erroInvertido: 0 }, instante: 'meio' },
  proposta: { nome: 'proposta (meio da 3ª fase)', chaves: { erroInvertido: 1 }, instante: 'meio' },
  maior: { nome: 'proposta (maior diferença)', chaves: { erroInvertido: 1 }, instante: 'maior' },
  equip: { nome: 'com o equipamento errado', chaves: { erroInvertido: 1, erroEquip: 1 }, instante: 'maior' },
  'pequeno-hoje': { nome: 'erro pequeno: modo de hoje', chaves: { erroInvertido: 1, erroPequeno: 'hoje' }, instante: 'maior' },
  'pequeno-contorno': { nome: 'erro pequeno: contorno fino', chaves: { erroInvertido: 1, erroPequeno: 'contorno' }, instante: 'maior' },
  'pequeno-equip': { nome: 'erro pequeno: só o objeto errado, em vermelho', chaves: { erroInvertido: 1, erroPequeno: 'equip' }, instante: 'maior' },
};
const quadro = (ex, view, err, col, titulo) => {
  const c = COLUNAS[col];
  const t = c.instante === 'maior' ? M.instanteDoErro(ex, err) : ex.seq[2] ? ex.seq[2].t0 + ex.seq[2].dur / 2 : 0;
  M.CTX.ACABAMENTO = { ...M.acabamento(ex), ...c.chaves };
  M.CTX.ROTULO_ERRO = titulo;
  let q;
  try { q = M.montarSvgEstilo(ex, view, 'err', t, err, 300, 'a'); } finally { M.CTX.ACABAMENTO = null; M.CTX.ROTULO_ERRO = null; }
  return `<svg class="${q.classe}" viewBox="${q.viewBox}">${q.html}</svg>`;
};
let lista = opt('ids', '') ? opt('ids', '').split(',').map((id) => M.EX.find((e) => e.id === id) ?? (() => { throw new Error('não achei ' + id); })()) : M.EX;
if (tem('so-pequenos')) lista = lista.filter((ex) => ex.errors.some((_, i) => M.difMaximaDoErro(ex, i) < M.DIF_MINIMA_DA_CADEIA));
const total = Math.ceil(lista.length / porPagina);
const pag = pagina ? lista.slice((pagina - 1) * porPagina, pagina * porPagina) : lista;
const n = colunas.length;
let html = `<!doctype html><html${escuro ? ' data-theme="dark"' : ''}><style>${css}body{font:13px var(--font-b);margin:12px}h2{font-size:15px;margin:14px 0 4px}.l{display:grid;grid-template-columns:200px repeat(${n},1fr);gap:8px;width:${200 + n * 300}px}figure{margin:0;background:var(--stage);border:1px solid var(--line)}figure svg{width:100%;height:230px;display:block}figcaption{padding:3px 6px;font-size:12px}.cab{display:grid;grid-template-columns:200px repeat(${n},1fr);width:${200 + n * 300}px;font-weight:700;font-size:12px}</style>`;
html += `<h1 style="font-size:18px">${opt('titulo', 'Modo Erros do Boneco (R4)')}${pagina ? ` · página ${pagina} de ${total}` : ''}</h1>`;
for (const ex of pag) {
  const tx = texto(ex.id);
  const erros = ex.errors.map((e, i) => ({ e, i })).filter(({ i }) => !tem('so-pequenos') || M.difMaximaDoErro(ex, i) < M.DIF_MINIMA_DA_CADEIA);
  html += `<h2>${tx.name} <small style="font-weight:400">(${ex.id})</small></h2><div class="cab"><div></div>${colunas.map((c) => `<div>${COLUNAS[c].nome}</div>`).join('')}</div>`;
  for (const { e, i } of erros) {
    const t = tx.errors.find((x) => x.id === e.id) ?? { title: e.id, desc: '' };
    html += `<div class="l"><figure><figcaption><b>${t.title}</b><br>${t.desc}<br><i>vista ${e.view} · diferença máx. ${M.difMaximaDoErro(ex, i).toFixed(1)} cm</i></figcaption></figure>`;
    html += colunas.map((c) => `<figure>${quadro(ex, e.view, i, c, t.title)}</figure>`).join('');
    html += `</div>`;
  }
}
html += '</html>';
const tmp = `/tmp/folha-erros-${process.pid}.html`;
writeFileSync(tmp, html);
const { chromium } = createRequire(import.meta.url)('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 240 + n * 300, height: 800 } });
await p.goto('file://' + tmp);
await p.screenshot({ path: saida, fullPage: true });
await b.close();
console.log('folha:', saida, `(${pag.length} exercícios${pagina ? `, página ${pagina}/${total}` : ''})`);

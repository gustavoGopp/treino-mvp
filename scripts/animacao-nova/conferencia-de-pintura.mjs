// A conferência da pintura e dos fios dentro do corpo (src/engine/novo/conferir-pintura.ts), em todas as animações, com
// o relatório e as imagens dos casos. Não corrige nada: só mede e mostra.
// Uso: node scripts/animacao-nova/conferencia-de-pintura.mjs                (todas; grava o relatório e as imagens)
//      SAIDA=<pasta> node scripts/animacao-nova/conferencia-de-pintura.mjs <id> ...   (só estas; imagens na pasta)
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovo } from './empacotar.mjs';

const ids = process.argv.slice(2);
const DOC = 'docs/revisoes/animacao-nova/conferencia-de-pintura';
const SAIDA = process.env.SAIDA ?? (ids.length ? null : DOC);
const { modulo: m } = await motorNovo(`export * from './src/engine/novo/index.ts'; export { APROVADOS, EM_REVISAO } from './src/engine/novo/aprovados.ts';`);
const corpo = m.CORPOS.homem;
const lista = ids.length ? ids : Object.keys(m.EXERCICIOS).sort();
const um = (x) => (Math.round(x * 10) / 10).toString().replace('.', ',');

/** De que grupo é a animação: aprovada antes de 17/11 (aviso), aprovada desde 17/11 (falha) ou em revisão. */
const grupo = (id) => (m.EM_REVISAO[id] ? 'revisao' : m.APROVADOS[id] ? (m.APROVADOS[id].em < '2026-11-17' ? 'antiga' : 'sessao') : 'outra');

const resultados = [];
const t0 = performance.now();
for (const id of lista) {
  const ex = m.EXERCICIOS[id];
  if (!ex) throw new Error(`animação desconhecida: ${id}`);
  const ti = performance.now();
  const qs = m.quadrosMedidos(ex, corpo);
  const r = m.medirPinturaEFios(ex, qs, true);
  resultados.push({ id, ex, qs, r, ms: performance.now() - ti });
  const erro = r.pintura.filter((a) => !a.deProposito).length,
    prop = r.pintura.length - erro;
  console.log(`${id.padEnd(40)} ${grupo(id).padEnd(8)} pintura ${String(erro).padStart(3)}  de propósito ${String(prop).padStart(3)}  fios ${String(r.fios.length).padStart(3)}  pesos ${String(r.pesos.length).padStart(3)}  ${(performance.now() - ti).toFixed(0)} ms${erro + r.fios.length + r.pesos.length ? '' : '  (nada)'}`);
}
const segundos = (performance.now() - t0) / 1000;
if (process.env.JSON) writeFileSync(process.env.JSON, JSON.stringify(resultados.map(({ id, r }) => ({ id, grupo: grupo(id), pintura: r.pintura.map(({ pontos, ...a }) => ({ ...a, n: pontos?.length })), fios: r.fios.map(({ pontos, ...a }) => ({ ...a, n: pontos?.length })), pesos: r.pesos.map(({ pontos, ...a }) => ({ ...a, n: pontos?.length })) })), null, 1));
console.log(`medida: ${segundos.toFixed(1)} s`);

/* ============================== as imagens ============================== */
// o instante t do ciclo em que o quadro medido (u) aparece no app
function tempoDe(ex, u) {
  const T = m.duracao(ex.ficha.fases);
  let melhor = 0,
    dif = 1e9;
  for (let i = 0; i <= 2000; i++) {
    const t = (i / 2000) * T;
    const d = Math.abs(m.instante(ex.ficha.fases, t).u - u);
    if (d < dif - 1e-9) [melhor, dif] = [t, d];
  }
  return melhor;
}
/** As celas da imagem de uma animação: o pior achado de cada (tipo, vista), até seis, e os fios. */
function celas({ id, ex, r }) {
  const out = [];
  const vistos = new Set();
  for (const a of [...r.pintura].sort((x, y) => y.area - x.area)) {
    const ch = `${a.tipo}|${a.vista}|${a.parte.split(' ')[0]}`;
    if (vistos.has(ch) || out.length >= 6) continue;
    vistos.add(ch);
    out.push({ vista: a.vista, onde: a.onde, pontos: a.pontos, legenda: `${m.VISTAS[a.vista].nome}, ${a.onde}: ${a.tipo === 'peca-por-cima' ? `${a.peca} sobre ${a.parte} (o corpo está na frente)` : `${a.parte} sobre ${a.peca} (a peça está na frente)`} (${um(a.area)} cm²)` });
  }
  for (const [tipo, lista] of [['fio', r.fios], ['peso', r.pesos]])
    for (const f of [...lista].sort((x, y) => y.entra - x.entra)) {
      const ch = `${tipo}|${f.parte}`;
      if (vistos.has(ch) || out.length >= 9) continue;
      vistos.add(ch);
      const vista = ex.vistas[0];
      const cam = m.VISTAS[vista];
      out.push({ vista, onde: f.onde, pontos: f.pontos.map((p) => [m.dot(p, cam.dir), -m.dot(p, cam.cima)]), legenda: `${cam.nome}, ${f.onde}: ${f.fio ?? f.peso} entra ${um(f.entra)} cm em ${f.parte}` });
    }
  return out.map((c) => {
    const erro = /^erro "(.*)", u = ([\d,]+)$/.exec(c.onde);
    const def = erro && ex.ficha.erros.find((e) => e.titulo === erro[1]);
    const u = erro ? Number(erro[2].replace(',', '.')) : Number(/u = ([\d,]+)/.exec(c.onde)[1].replace(',', '.'));
    const tec = /t = ([\d,]+) s/.exec(c.onde);
    const t = tec ? Number(tec[1].replace(',', '.')) : tempoDe(ex, u);
    // o quadro: perto do que foi achado (25 cm em volta), na proporção 4:3, sem passar do quadro do app
    const cheio = m.enquadrar(ex, { corpo, vista: c.vista, boneco: 'cinza' }, 0.06, 4 / 3);
    const xs = c.pontos.map((p) => p[0]),
      ys = c.pontos.map((p) => p[1]);
    let [ax, ay, bx, by] = [Math.min(...xs) - 25, Math.min(...ys) - 25, Math.max(...xs) + 25, Math.max(...ys) + 25];
    const larg = Math.max(bx - ax, ((by - ay) * 4) / 3),
      alt = (larg * 3) / 4;
    const vb = larg >= cheio[2] ? cheio : [(ax + bx) / 2 - larg / 2, (ay + by) / 2 - alt / 2, larg, alt];
    let svg = m.svgDaCena(ex, t, { corpo, vista: c.vista, boneco: 'cinza', modo: def ? 'err' : 'tec', erro: def?.id }, vb);
    const lado = 0.5;
    const marcas = c.pontos.map(([x, y]) => `<rect x="${(x - lado / 2).toFixed(2)}" y="${(y - lado / 2).toFixed(2)}" width="${lado}" height="${lado}"/>`).join('');
    svg = svg.replace(/<\/svg>$/, `<g fill="#ff00aa" opacity="0.55">${marcas}</g></svg>`);
    return { svg, legenda: c.legenda, id };
  });
}
async function imagens(trabalhos, pasta) {
  if (!trabalhos.length) return;
  mkdirSync(pasta, { recursive: true });
  const css = readFileSync('src/engine/novo/estilo.css', 'utf8') + m.cssDoBoneco();
  const caminho = '/opt/pw-browsers/chromium';
  const b = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
  const pg = await b.newPage({ viewport: { width: 1240, height: 800 }, deviceScaleFactor: 1 });
  for (const { arquivo, titulo, cs } of trabalhos) {
    const html = `<!doctype html><meta charset="utf-8"><style>${css}body{margin:12px;font:12px system-ui;background:#fff;display:flex;flex-wrap:wrap;gap:10px;width:1210px}h1{font-size:15px;margin:0;flex-basis:100%}figure{margin:0;width:390px}svg{width:390px;height:292px;border-radius:8px;display:block;border:1px solid #ddd}figcaption{color:#333;margin-top:3px}</style><h1>${titulo}</h1>${cs.map((c) => `<figure>${c.svg}<figcaption>${c.legenda}</figcaption></figure>`).join('')}`;
    await pg.setContent(html);
    await pg.screenshot({ path: `${pasta}/${arquivo}`, fullPage: true });
  }
  await b.close();
}
const comAchado = resultados.filter((x) => x.r.pintura.length || x.r.fios.length || x.r.pesos.length);
if (SAIDA) {
  // as imagens de antes (das animações que mudaram ou saíram); as outras (as provas nos estados antigos) ficam
  if (SAIDA === DOC && existsSync(DOC)) for (const f of readdirSync(DOC)) if (f.endsWith('.png') && f.replace(/\.png$/, '') in m.EXERCICIOS) rmSync(`${DOC}/${f}`);
  await imagens(
    comAchado.map((x) => ({ arquivo: `${x.id}.png`, titulo: `${x.id} (em magenta: o que está pintado do jeito errado; nos fios e pesos, os pontos dentro do corpo)`, cs: celas(x) })),
    SAIDA,
  );
}
if (ids.length) {
  for (const { id, r } of resultados) {
    console.log(`\n${id}:`);
    for (const l of m.resumoDaPintura(r.pintura)) console.log(`  pintura: ${l}`);
    for (const l of m.resumoDosFios(r.fios)) console.log(`  fio: ${l}`);
    for (const l of m.resumoDosPesos(r.pesos)) console.log(`  peso: ${l}`);
  }
  process.exit(0);
}

/* ============================== o relatório ============================== */
// O texto de cima do relatório (o método, as tolerâncias, as provas) é escrito à mão e fica; as tabelas, abaixo da
// marca, são refeitas.
const RELATORIO = 'docs/revisoes/animacao-nova/conferencia-de-pintura.md';
const MARCA = '<!-- tabelas: geradas por scripts/animacao-nova/conferencia-de-pintura.mjs; não edite abaixo -->';
const GRUPOS = { antiga: 'Aprovadas antes de 17/11 (aviso)', sessao: 'Aprovadas desde 17/11 (falha)', revisao: 'Em revisão (`EM_REVISAO`; falha)', outra: 'Fora das listas (falha)' };
const cel = (l) => (l.length ? l.map((x) => x.replace(/\|/g, '/')).join('<br>') : '—');
const temAchado = (x) => x.r.pintura.some((a) => !a.deProposito) || x.r.fios.length || x.r.pesos.length;
let md = `${MARCA}\n\nMedido em ${resultados.length} animações (${segundos.toFixed(0)} s, com as imagens à parte). "—" = nada.\n`;
for (const [g, titulo] of Object.entries(GRUPOS)) {
  const doGrupo = resultados.filter((x) => grupo(x.id) === g);
  if (!doGrupo.length) continue;
  md += `\n## ${titulo}: ${doGrupo.length} animações, ${doGrupo.filter(temAchado).length} com achado\n\n| animação | pintura | fios dentro do corpo | peso dentro do corpo | peça atrás do corpo de propósito (não conta) | imagem |\n|---|---|---|---|---|---|\n`;
  for (const x of doGrupo) {
    const p = m.resumoDaPintura(x.r.pintura.filter((a) => !a.deProposito)),
      d = m.resumoDaPintura(x.r.pintura.filter((a) => a.deProposito)),
      f = m.resumoDosFios(x.r.fios),
      w = m.resumoDosPesos(x.r.pesos);
    md += `| \`${x.id}\` | ${cel(p)} | ${cel(f)} | ${cel(w)} | ${cel(d)} | ${p.length || f.length || w.length || d.length ? `[imagem](conferencia-de-pintura/${x.id}.png)` : ''} |\n`;
  }
}
const antes = existsSync(RELATORIO) ? readFileSync(RELATORIO, 'utf8') : '';
const topo = antes.includes(MARCA) ? antes.slice(0, antes.indexOf(MARCA)) : '# Conferência da pintura, dos fios e dos pesos dentro do corpo\n\n';
writeFileSync(RELATORIO, topo + md);
console.log(`relatório: ${RELATORIO} (${resultados.filter(temAchado).length} com achado; ${segundos.toFixed(1)} s)`);

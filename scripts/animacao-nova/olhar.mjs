// Rascunho de conferência a olho: desenha quadros do motor novo em tamanho grande, lado a lado, num PNG.
// Uso: node scripts/animacao-nova/olhar.mjs <saida.png> <id:vista:modo:u[:erro][:estilo][:tema]> ...
//   u = ponto do ciclo de 0 a 1 (fração da duração), ou f0 a f1 = fração da primeira fase com movimento
//   (f0 = começo, f0.5 = meio, f1 = fim). Ex.: flexao:cima:tec:0.5 supino-reto:cima:mus:f1::pele:escuro
// Variáveis: LARG (largura de cada quadro, px), JANELA (largura da página), ESCALA, MINI=1, TITULO.
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovo } from './empacotar.mjs';

const [saida, ...pedidos] = process.argv.slice(2);
const { modulo: m } = await motorNovo(`export * from './src/engine/novo/app.ts';`);
const corpo = m.CORPOS.homem;
const css = readFileSync('src/engine/novo/estilo.css', 'utf8') + m.cssDoBoneco();
const LARG = Number(process.env.LARG ?? 560);
const celas = pedidos.map((p) => {
  const [id, vista, modo, u, erro, boneco = 'cinza', tema = 'claro'] = p.split(':');
  const ex = m.EXERCICIOS[id];
  const mini = process.env.MINI === '1';
  const vb = m.enquadrar(ex, { corpo, vista, boneco: boneco || 'cinza', mini }, mini ? 0.04 : 0.06, mini ? 1 : 4 / 3);
  const fases = ex.ficha.fases,
    i = fases.findIndex((f) => f.tipo !== 'pausa');
  const t = u.startsWith('f') ? fases.slice(0, i).reduce((a, f) => a + f.dur, 0) + fases[i].dur * Math.min(0.999, Number(u.slice(1))) : Number(u) * m.duracao(fases);
  const svg = m.svgDaCena(ex, t, { corpo, vista, boneco: boneco || 'cinza', modo, erro: erro || undefined, mini }, vb, tema || 'claro');
  const w = mini ? 96 : LARG;
  return `<figure><div style="width:${w}px;height:${mini ? 96 : (LARG * 3) / 4}px">${svg}</div><figcaption>${p}</figcaption></figure>`;
});
const html = `<!doctype html><meta charset="utf-8"><style>${css}body{margin:16px;font:13px system-ui;background:#fff;display:flex;flex-wrap:wrap;gap:12px}h1{font-size:17px;margin:0 0 4px;flex-basis:100%}figure{margin:0}svg{width:100%;height:100%;border-radius:10px;display:block}figcaption{color:#555;margin-top:4px}</style>${process.env.TITULO ? `<h1>${process.env.TITULO}</h1>` : ''}${celas.join('')}`;
const caminho = '/opt/pw-browsers/chromium';
const b = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pg = await b.newPage({ viewport: { width: Number(process.env.JANELA ?? 1200), height: 800 }, deviceScaleFactor: Number(process.env.ESCALA ?? 1) });
await pg.setContent(html);
await pg.screenshot({ path: saida, fullPage: true });
await b.close();

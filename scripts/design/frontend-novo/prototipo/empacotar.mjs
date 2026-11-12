// Junta cada protótipo num arquivo só (CSS, letra, Boneco e script embutidos), para publicar como página de prévia e
// abrir no celular por um link. A pasta do repositório continua sendo a fonte: este script só empacota.
// A página sai sem <html>, <head> e <body>, que é o formato que o serviço de prévia pede.
// Uso: node scripts/design/frontend-novo/prototipo/empacotar.mjs <pasta de saída>
import { mkdirSync, readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const RAIZ = resolve('docs/revisoes/frontend-novo/prototipos');
const SAIDA = resolve(process.argv[2] ?? 'reports/design/frontend-novo/empacotado');
mkdirSync(SAIDA, { recursive: true });
const ler = (...p) => readFileSync(resolve(RAIZ, ...p), 'utf8');
const embutirScript = (d, src) => `<script>\n${ler(d, src).replaceAll('</script', '<\\/script')}\n</script>`;

for (const d of readdirSync(RAIZ).filter((x) => /^[a-z]\d?-/.test(x) && existsSync(resolve(RAIZ, x, 'index.html')))) {
  const html = ler(d, 'index.html');
  const titulo = html.match(/<title>([^<]*)<\/title>/)[1];
  let css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
  // a letra vai embutida: a página de prévia não carrega arquivo de letra de fora
  css = css.replace(/url\("\.\.\/comum\/fontes\/([^"]+)"\)/g, (_, f) => `url("data:font/woff2;base64,${readFileSync(resolve(RAIZ, 'comum', 'fontes', f)).toString('base64')}")`);
  const corpo = html
    .slice(html.indexOf('>', html.indexOf('<body')) + 1, html.indexOf('<script src='))
    .replace('<a href="../index.html">Direções</a>', '');
  // os scripts da página, na ordem em que ela os pede (os comuns e o da própria direção)
  const scripts = Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g), (m) => m[1]);
  const pagina = `<title>${titulo}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
${ler('comum', 'boneco.css')}
${ler('comum', 'base.css')}
${css}
/* na página de prévia: a altura vem da moldura, e a faixa do protótipo respeita a área segura de cima */
html,body{height:100%}
body{min-height:0}
.celular{min-height:calc(100% - var(--proto,0px))}
.proto{top:env(safe-area-inset-top,0px)}
</style>
${corpo.trim()}
${scripts.map((src) => embutirScript(d, src)).join('\n')}
`;
  const nome = `direcao-${d}.html`;
  writeFileSync(resolve(SAIDA, nome), pagina);
  console.log(`${nome}: ${Math.round(pagina.length / 1024)} kB · ${titulo}`);
}

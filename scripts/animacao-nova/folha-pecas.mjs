// A folha das peças novas da frente das animações restantes (Parte B): o cartão de equipamento de hoje ao lado da peça
// nova do motor, no tamanho do cartão (96 px, como na tela de marcar o equipamento) e ampliada, e as medidas com a fonte.
// Na cadeira flexora, também a máquina funcionando: a alavanca no começo e no fim, com a pilha subindo.
// Uso: node scripts/animacao-nova/folha-pecas.mjs [barra|cadeira-flexora] → docs/revisoes/animacoes-restantes/pecas/folha-<peça>.png
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovo } from './empacotar.mjs';

const ENTRADA = `export * from './src/engine/novo/pecas-de-cena/barra-longa.ts';
export * from './src/engine/novo/pecas-de-cena/cadeira-flexora.ts';
export { cena, camera, enquadrado, MAT } from './src/engine/novo/realista/base.mjs';`;
const { modulo: m } = await motorNovo(ENTRADA);
const SAIDA = 'docs/revisoes/animacoes-restantes/pecas';
mkdirSync(SAIDA, { recursive: true });
const so = process.argv[2];

/** O desenho de uma lista de peças (PecaPropria) numa câmera, enquadrado no viewBox 160 × 120 do cartão. */
let n = 0;
function desenho(pecas, cam, comSombra = true) {
  const id = `p${n++}`;
  const fn = () => {
    const C = m.cena(id, m.camera(cam));
    for (const p of pecas) p.desenhar(C, m.MAT, { comSombra, tema: 'claro' });
    return C.svg();
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120">${m.enquadrado(fn)()}</svg>`;
}
const img = (svg, px, cls = '') => `<img class="${cls}" style="width:${px}px;height:${(px * 3) / 4}px" alt="" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`;
const hoje = (cartao) => readFileSync(`public/equipamento/${cartao}.svg`, 'utf8');
const cel = (t, conteudo) => `<figure>${conteudo}<figcaption>${t}</figcaption></figure>`;

function tabela(arquivo, ids) {
  const j = JSON.parse(readFileSync(`src/engine/novo/dados/objetos/${arquivo}.json`, 'utf8'));
  const nomeTipo = { medida: 'medida', derivada: 'derivada', provisoria: 'provisória', desenho: 'desenho' };
  let h = '<table><tr><th>peça</th><th>medida</th><th>valor</th><th>tipo</th><th>fonte e onde</th></tr>';
  for (const id of ids)
    for (const [k, v] of Object.entries(j.objetos[id].medidas))
      h += `<tr class="${v.tipo}"><td>${j.objetos[id].nome.split(' (')[0].split(',')[0]}</td><td>${k}</td><td>${String(v.v).replace('.', ',')} ${v.un}</td><td>${nomeTipo[v.tipo]}</td><td><b>${v.fonte}</b>: ${v.onde}</td></tr>`;
  return `${h}</table>`;
}

const CSS = `body{margin:0;padding:22px 26px;background:#fff;color:#171b20;font:14px/1.4 system-ui,sans-serif;width:1400px}
h1{font-size:24px;margin:0 0 4px}h2{font-size:16px;margin:18px 0 8px;border-top:2px solid #171b20;padding-top:6px}p{margin:0 0 8px;color:#3f4650;max-width:1300px}
.l{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-end}figure{margin:0}figcaption{font-size:12px;color:#464b51;margin-top:3px;max-width:640px}
img{display:block;background:#f4f6f8;border-radius:8px}img.cartao{background:#fff;border:1px solid #d5dae0}
table{border-collapse:collapse;font-size:12px;margin-top:6px;width:100%}td,th{border-bottom:1px solid #e3e6ea;padding:3px 6px;text-align:left;vertical-align:top}
tr.desenho td:nth-child(4){color:#8a5a00}tr.provisoria td:nth-child(4){color:#b3261e}`;

async function foto(nome, html) {
  const caminho = '/opt/pw-browsers/chromium';
  const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
  const pg = await nav.newPage({ viewport: { width: 1452, height: 800 }, deviceScaleFactor: 2 });
  pg.on('pageerror', (e) => console.log('erro:', String(e).slice(0, 300)));
  await pg.setContent(`<!doctype html><meta charset="utf-8"><style>${CSS}</style>${html}`);
  await pg.screenshot({ path: `${SAIDA}/folha-${nome}.png`, fullPage: true });
  await nav.close();
  console.log(`${SAIDA}/folha-${nome}.png`);
}

if (!so || so === 'barra') {
  // como no cartão de hoje: a barra no chão, apoiada nas anilhas, vista de três quartos
  const anilhas = ['anilha20', 'anilha10', 'anilha5'];
  const r = m.raioDaAnilhaMaior(anilhas);
  const { peca } = m.barraLonga({ centro: [0, r, 0], eixo: [0, 0, 1], anilhas });
  const cam = { yaw: 58, pitch: 18, s: 0.6 };
  const novo = desenho([peca], cam);
  const deFrente = desenho([peca], { yaw: 90, pitch: 4, s: 0.6 });
  const so20 = desenho([m.barraLonga({ centro: [0, 22.5, 0], eixo: [0, 0, 1], anilhas: ['anilha20'] }).peca], cam);
  await foto(
    'barra',
    `<h1>Barra longa com anilhas: o cartão de hoje × a peça nova</h1>
<p>A peça nova sai do mesmo gerador do cartão, com as medidas da norma da IWF e da IPF: 220 cm, pegada de 2,8 cm entre mangas a 131 cm, mangas de 5 cm, anilhas de 45 cm. O cartão de hoje tinha a pegada 7% a 10% mais fina. As anilhas do exemplo: 20, 10 e 5 kg de cada lado (100 kg com a barra); a presilha de mola fecha a manga.</p>
<h2>No tamanho do cartão (96 px, a tela de marcar o equipamento)</h2>
<div class="l">${cel('hoje', img(hoje('barra_longa'), 96, 'cartao'))}${cel('nova (20 + 10 + 5 kg)', img(novo, 96, 'cartao'))}${cel('nova (só 20 kg)', img(so20, 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('barra_longa'), 440, 'cartao'))}${cel('nova, do mesmo ângulo', img(novo, 440))}</div>
<div class="l" style="margin-top:12px">${cel('nova, de frente para a barra', img(deFrente, 640))}</div>
<h2>As medidas</h2>${tabela('barra-longa', ['barraLonga', 'anilha20', 'anilha10', 'anilha5', 'presilha'])}`,
  );
}

if (!so || so === 'cadeira-flexora') {
  const regulagem = { inicio: 95, rolo: 40, encosto: 8, trava: 70, placas: 5 };
  const pecas = (alavanca) => {
    const c = m.cadeiraFlexora({ ...regulagem, alavanca });
    return [c.fixa, c.movel];
  };
  // de três quartos, pela frente e pelo lado direito de quem senta (como o cartão de hoje, que mostra a frente da máquina)
  const cam = { yaw: 250, pitch: 12, s: 0.6 };
  const lado = { yaw: -90, pitch: 2, s: 0.6 };
  const c0 = m.cadeiraFlexora({ ...regulagem, alavanca: 95 }),
    c1 = m.cadeiraFlexora({ ...regulagem, alavanca: -25 });
  const ext = c0.extremos;
  await foto(
    'cadeira-flexora',
    `<h1>Cadeira flexora: o cartão de hoje × a peça nova (a primeira máquina)</h1>
<p>O tamanho total vem das fichas da Life Fitness (156 × 102 × 148 cm), da Hammer Strength (140 × 87 × 140) e da Precor (160 × 122 × 147). O cartão de hoje é 26% a 41% mais estreito que elas, porque a torre das placas fica atrás do assento; aqui a torre fica ao lado, que é como a largura das fichas fecha. A Precor dá também a inclinação do assento (15°, para o joelho cair no eixo) e a espessura dos estofados (6,5 cm). As medidas de dentro da máquina (altura do assento, onde fica o eixo, a alavanca) não aparecem em nenhuma ficha lida: são de desenho, em amarelo na tabela.</p>
<p><b>A máquina funciona:</b> a alavanca gira no eixo ao lado do joelho; o came gira junto e enrola o cabo, e as placas do pino sobem ${c1.subida.toFixed(1).replace('.', ',')} cm do começo ao fim do movimento (de ${regulagem.inicio}° a −25°); o encosto anda para a frente e para trás; o rolo corre na alavanca; a trava desce até as coxas. Medida desenhada: ${(ext.zFrente - ext.zTras).toFixed(0)} cm de comprimento e ${(ext.xEsquerda - ext.xDireita).toFixed(0)} cm de largura.</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje', img(hoje('cadeira_flexora'), 96, 'cartao'))}${cel('nova', img(desenho(pecas(95), cam), 96, 'cartao'))}${cel('hoje: a cadeira extensora (para ver se ainda se confundem)', img(hoje('cadeira_extensora'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('cadeira_flexora'), 440, 'cartao'))}${cel('nova, do mesmo ângulo, no começo do movimento', img(desenho(pecas(95), cam), 640))}</div>
<h2>Funcionando: a alavanca no começo e no fim (de lado, pelo lado direito de quem senta)</h2>
<div class="l">${cel('começo: a alavanca à frente (95°); as placas embaixo', img(desenho([c0.fixa, c0.movel], lado), 640))}${cel(`fim: a alavanca para trás (−25°); as placas do pino ${c1.subida.toFixed(1).replace('.', ',')} cm acima`, img(desenho([c1.fixa, c1.movel], lado), 640))}</div>
<div class="l" style="margin-top:12px">${cel('fim, de três quartos', img(desenho([c1.fixa, c1.movel], cam), 640))}</div>
<h2>As medidas</h2>${tabela('cadeira-flexora', ['cadeiraFlexora'])}`,
  );
}

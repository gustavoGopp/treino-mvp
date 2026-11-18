// A folha das peças novas da frente das animações restantes (Parte B): o cartão de equipamento de hoje ao lado da peça
// nova do motor, no tamanho do cartão (96 px, como na tela de marcar o equipamento) e ampliada, e as medidas com a fonte.
// Na cadeira flexora, também a máquina funcionando: a alavanca no começo e no fim, com a pilha subindo.
// No suporte, também a regulagem de cada exercício (a altura dos ganchos e dos pinos), com a barra nos ganchos.
// Na barra W e na barra hexagonal, também a peça vista de cima e de frente, com as medidas que a definem.
// No smith, a barra em duas alturas na guia, o gancho preso e solto, a trava, e o cartão do suporte de agachamento ao lado.
// Na cadeira extensora, a alavanca no começo e no fim, e a flexora ao lado (para ver que não se confundem).
// Na cadeira abdutora e adutora, os braços abrindo e fechando (de frente e de cima), com a almofada por fora (abdução) e
// por dentro (adução) dos joelhos e a pilha subindo.
// Na mesa flexora, a alavanca no começo e no fim, com a pilha subindo, e o cartão da panturrilha sentada ao lado.
// Na máquina de glúteo, a alavanca no começo e no fim do coice (a regulagem do corpo da tabela), com a pilha subindo.
// No leg press e no hack, o carro em duas posições na guia, com a trava fechada e aberta, e o outro cartão ao lado.
// No graviton, a almofada dos joelhos em cima e embaixo (a alavanca girando no eixo), com a pilha subindo quando ela desce.
// Uso: node scripts/animacao-nova/folha-pecas.mjs [barra|cadeira-flexora|suporte|barra-w|barra-hexagonal|smith|cadeira-extensora|cadeira-abdutora-adutora|mesa-flexora|gluteo-maquina|leg-press|hack|graviton] → docs/revisoes/animacoes-restantes/pecas/folha-<peça>.png
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovo } from './empacotar.mjs';

const ENTRADA = `export * from './src/engine/novo/pecas-de-cena/barra-longa.ts';
export * from './src/engine/novo/pecas-de-cena/suporte.ts';
export { EXERCICIOS } from './src/engine/novo/app.ts';
export { CORPOS } from './src/engine/novo/tabelas.ts';
export * from './src/engine/novo/pecas-de-cena/cadeira-flexora.ts';
export * from './src/engine/novo/pecas-de-cena/barra-w.ts';
export * from './src/engine/novo/pecas-de-cena/barra-hexagonal.ts';
export { obj } from './src/engine/novo/tabelas.ts';
export * from './src/engine/novo/pecas-de-cena/smith.ts';
export * from './src/engine/novo/pecas-de-cena/cadeira-extensora.ts';
export * from './src/engine/novo/pecas-de-cena/cadeira-abdutora.ts';
export * from './src/engine/novo/pecas-de-cena/mesa-flexora.ts';
export * from './src/engine/novo/pecas-de-cena/gluteo-maquina.ts';
export * from './src/engine/novo/pecas-de-cena/leg-press.ts';
export * from './src/engine/novo/pecas-de-cena/hack.ts';
export * from './src/engine/novo/pecas-de-cena/graviton.ts';
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
const f1v = (x) => (Math.round(x * 10) / 10).toString().replace('.', ',');

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

if (!so || so === 'suporte') {
  // como no cartão de hoje: os ganchos e os pinos virados para +x, vistos de três quartos, com a barra nos ganchos
  const regulado = (gancho, pino, comBarra = true) => {
    const S = { base: [0, 0, 0], paraAPessoa: [1, 0, 0], gancho, pino };
    const r = m.suporte(S);
    const pecas = [r.estrutura, r.ganchos];
    if (comBarra) pecas.push(m.barraLonga({ centro: m.barraNosGanchos(S), eixo: m.eixoDoSuporte(S), anilhas: ['anilha20'] }).peca);
    return pecas;
  };
  const cam = { yaw: 28, pitch: 10, s: 0.6 };
  const deLado = { yaw: 0, pitch: 2, s: 0.6 };
  // a regulagem de cada exercício (o berço do gancho e o topo do pino), lida do primeiro quadro de cada animação
  const REG = [
    ['agachamento-barra', 'Agachamento com barra', 'ganchos na altura do meio do peito (a altura do peito da tabela do corpo); pinos logo abaixo do ponto mais baixo da barra'],
    ['supino-barra', 'Supino reto com barra', 'ganchos onde a barra fica com os cotovelos quase estendidos; pinos logo abaixo da altura do peito'],
    ['desenvolvimento-barra', 'Desenvolvimento em pé com barra', 'ganchos na altura do peito; os pinos no furo mais baixo (o cartão não pede pinos)'],
  ]
    .filter(([id]) => m.EXERCICIOS?.[id])
    .map(([id, nome, porque]) => {
      const q = m.EXERCICIOS[id].quadro(m.CORPOS.homem, 0);
      return `<tr><td>${nome}</td><td>${f1v(q.marcas.gancho[1])} cm</td><td>${f1v(q.marcas.pino[1])} cm</td><td>${porque}</td></tr>`;
    })
    .join('');
  await foto(
    'suporte',
    `<h1>Suporte de agachamento (rack): o cartão de hoje × a peça nova</h1>
<p>O cartão de hoje é uma gaiola de quatro colunas com 2,24 m de altura e 1,2 m de lado (medidas de desenho, sem fonte). As fichas de fabricante lidas são de suportes abertos: o Olympic Squat Rack da Life Fitness (LBR-OS, 192 cm de altura) e o da Hammer Strength (OSR, 186 cm de altura e 150 cm de comprimento). A peça nova segue as fichas: dois montantes furados presos a um quadro no chão (sem a travessa de cima da gaiola: de cima, no supino, ela cobriria a cabeça), com os ganchos em J e os pinos de segurança virados para a pessoa. A regulagem é a da IPF: ganchos de 75 a 170 cm (o banco e o agachamento), em passos de 2,5 cm; pinos de 50 cm de comprimento, a partir de 50 cm do chão. O vão entre os montantes (110 cm) é o mínimo da IPF para o banco e cabe na barra (131 cm entre as mangas). Do cartão vêm o gancho com a borracha no berço, os furos e os pinos cromados. Em amarelo na tabela, o que é de desenho.</p>
<p><b>Na cena,</b> a estrutura (montantes, quadro do chão e pinos) é pintada atrás do corpo, como cenário: de lado, o montante e o pino de perto cruzariam o corpo; os ganchos ficam na ordem certa de profundidade e dentro do quadro, perto da barra.</p>
<h2>No tamanho do cartão (96 px, a tela de marcar o equipamento)</h2>
<div class="l">${cel('hoje', img(hoje('rack_de_agachamento'), 96, 'cartao'))}${cel('nova (ganchos a 130 cm, pinos a 95 cm, barra de 60 kg)', img(desenho(regulado(130, 95), cam), 96, 'cartao'))}${cel('hoje: o smith (para ver se ainda se confundem)', img(hoje('smith'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('rack_de_agachamento'), 440, 'cartao'))}${cel('nova, do mesmo ângulo (ganchos a 130 cm, pinos a 95 cm)', img(desenho(regulado(130, 95), cam), 640))}</div>
<div class="l" style="margin-top:12px">${cel('nova, de lado e sem a barra: os ganchos e os pinos saem para o lado da pessoa (a direita do desenho)', img(desenho(regulado(130, 95, false), deLado), 640))}</div>
<h2>A regulagem de cada exercício (medida nas animações)</h2>
<table><tr><th>exercício</th><th>berço do gancho (do chão)</th><th>topo do pino (do chão)</th><th>de onde sai</th></tr>${REG}</table>
<h2>As medidas</h2>${tabela('suporte', ['suporte'])}`,
  );
}

const v = (n, c = 1) => n.toFixed(c).replace('.', ',');

if (!so || so === 'barra-w') {
  // como no cartão de hoje: a barra no chão, apoiada nas anilhas, vista de três quartos; a curva no plano do chão
  const anilhas = ['anilha10', 'anilha5'];
  const peca = (an, centro = [0, m.raioDaAnilhaMaior(an), 0]) => m.barraW({ centro, eixo: [0, 0, 1], frente: [1, 0, 0], anilhas: an }).peca;
  const cam = { yaw: 62, pitch: 30, s: 0.6 };
  const novo = desenho([peca(anilhas)], cam);
  const so5 = desenho([peca(['anilha5'])], cam);
  const deCima = desenho([peca(['anilha5'])], { yaw: 90, pitch: 89, s: 0.6 }, false);
  const deFrente = desenho([peca(anilhas)], { yaw: 90, pitch: 4, s: 0.6 });
  const P = m.pegadaNaBarraW();
  const o = (id) => m.obj('barraW', id);
  await foto(
    'barra-w',
    `<h1>Barra W com anilhas: o cartão de hoje × a peça nova</h1>
<p>A peça nova sai do mesmo gerador do cartão, com as medidas da ficha da Eleiko (Curl Bar 50 mm, 12 kg): ${v(o('comp'))} cm de ponta a ponta, mangas de 5 cm com 23 cm carregáveis e rebordo de 2 cm; entre as mangas sobram ${v(o('entreMangas'))} cm (a Rogue Curl Bar dá 80 cm). A pegada tem 2,85 cm (Rogue). O cartão de hoje tinha 120 cm. <b>A curva não tem fonte:</b> nenhuma página pública de fabricante lida dá os ângulos (a Eleiko só diz "angled shape"); a forma em W continua a do cartão de hoje (a parte de fora a ${v(o('anguloFora'), 0)}° da linha da barra, a de dentro a ${v(o('anguloDentro'), 0)}°), em amarelo na tabela. As mãos seguram no meio das partes inclinadas de fora, a ${v(2 * P.s)} cm uma da outra. As anilhas do exemplo: 10 e 5 kg de cada lado (42 kg com a barra); na rosca, só a de 5 kg (22 kg).</p>
<h2>No tamanho do cartão (96 px, a tela de marcar o equipamento)</h2>
<div class="l">${cel('hoje', img(hoje('barra_w'), 96, 'cartao'))}${cel('nova (10 + 5 kg)', img(novo, 96, 'cartao'))}${cel('nova (só 5 kg, a da rosca)', img(so5, 96, 'cartao'))}${cel('hoje: a barra longa (para ver se ainda se confundem)', img(hoje('barra_longa'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('barra_w'), 440, 'cartao'))}${cel('nova, do mesmo ângulo', img(novo, 440))}</div>
<div class="l" style="margin-top:12px">${cel('nova, de cima: a curva em W (a da rosca, só com a anilha de 5 kg)', img(deCima, 640))}${cel('nova, de frente para a barra', img(deFrente, 640))}</div>
<h2>As medidas</h2>${tabela('barra-w', ['barraW'])}<p style="margin-top:8px">As anilhas e a presilha são as da barra longa (folha-barra.png).</p>`,
  );
}

if (!so || so === 'barra-hexagonal') {
  // como no cartão de hoje: a barra no chão, apoiada nas anilhas, vista de três quartos e um pouco de cima
  const anilhas = ['anilha20'];
  const peca = (an) => m.barraHexagonal({ centro: [0, m.raioDaAnilhaMaiorNaHexagonal(an), 0], eixo: [0, 0, 1], cabos: [1, 0, 0], anilhas: an }).peca;
  const cam = { yaw: 52, pitch: 34, s: 0.6 };
  const novo = desenho([peca(anilhas)], cam);
  const duas = desenho([peca(['anilha20', 'anilha10'])], cam);
  const deCima = desenho([peca(anilhas)], { yaw: 90, pitch: 89, s: 0.6 }, false);
  const deFrente = desenho([peca(anilhas)], { yaw: 90, pitch: 4, s: 0.6 });
  const c = m.cantosDoHexagono();
  const o = (id) => m.obj('barraHexagonal', id);
  await foto(
    'barra-hexagonal',
    `<h1>Barra hexagonal com anilhas: o cartão de hoje × a peça nova</h1>
<p>A peça nova sai do mesmo gerador do cartão, com as medidas da página da Rogue (TB-1 Trap Bar 2.0): ${v(o('comp'))} cm de ponta a ponta, ${v(o('larg'))} cm de largura, tubo quadrado de 3,81 cm, cabos de 3,4 cm a ${v(o('caboEntre'))} cm de centro a centro, mangas de 4,85 cm com 40,6 cm carregáveis, 27,2 kg. <b>O cartão de hoje tinha o hexágono 34% mais estreito e os cabos a 24 cm um do outro, deitados ao longo das mangas;</b> aqui os cabos atravessam o hexágono da frente para trás (a pessoa fica no meio, de pegada neutra). A Rogue é toda preta ("black powder coat"): a moldura, os cabos e as mangas saem no metal grafite. O comprimento de cada lado e o ângulo das pontas não constam da página: o hexágono tem ${v(o('hexComp'), 0)} cm de ponta a ponta (o que sobra tirando as mangas), pontas de ${v(o('anguloDaPonta'), 0)}° (hexágono regular) e lados da frente e de trás com ${v(2 * c[1][0])} cm, em amarelo na tabela.</p>
<h2>No tamanho do cartão (96 px, a tela de marcar o equipamento)</h2>
<div class="l">${cel('hoje', img(hoje('barra_hexagonal'), 96, 'cartao'))}${cel('nova (20 kg de cada lado)', img(novo, 96, 'cartao'))}${cel('nova (20 + 10 kg)', img(duas, 96, 'cartao'))}${cel('hoje: a barra longa', img(hoje('barra_longa'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('barra_hexagonal'), 440, 'cartao'))}${cel('nova, do mesmo ângulo', img(novo, 440))}</div>
<div class="l" style="margin-top:12px">${cel('nova, de cima: os cabos atravessam o hexágono, a 63,5 cm um do outro', img(deCima, 640))}${cel('nova, de frente para a barra (a pessoa entra por aqui)', img(deFrente, 640))}</div>
<h2>As medidas</h2>${tabela('barra-hexagonal', ['barraHexagonal'])}<p style="margin-top:8px">As anilhas e a presilha são as da barra longa (folha-barra.png).</p>`,
  );
}

if (!so || so === 'smith') {
  // como no cartão de hoje: de três quartos, a barra presa no gancho, à altura do peito, com uma anilha de 20 kg de cada lado
  const S = (o) => m.smith({ base: [0, 0, 0], sobePara: 1, barra: 128, trava: 60, gancho: 0, anilhas: ['anilha20'], ...o });
  // o cartão de hoje põe a barra ao longo de z e olha de yaw 30; a peça tem a barra ao longo de x: yaw 120 é o mesmo ângulo
  const cam = { yaw: 120, pitch: 10, s: 0.6 };
  const lado = { yaw: 90, pitch: 2, s: 0.6 };
  const cima = S({}).centro,
    baixo = S({ barra: 62 }).centro;
  const anda = Math.hypot(cima[1] - baixo[1], cima[2] - baixo[2]);
  const pesoDe = (an) => m.massaDoSmith(an).toFixed(0);
  await foto(
    'smith',
    `<h1>Smith: o cartão de hoje × a peça nova</h1>
<p>O tamanho total vem da ficha da Life Fitness SSM (221 × 125 × 237 cm; a Hammer Strength HSSMV, vertical, tem 229 × 127 × 234). A mesma ficha dá a inclinação da guia, <b>7°</b> ("7-degree bar angle follows the natural free weight path of movement for pressing or squatting"), o passo dos ganchos (16 cm), o peso da barra (9 kg, com contrapeso) e os 8 pinos de anilha. A ficha não diz para que lado a guia inclina em relação a quem treina: aqui o alto da guia vai para a cabeça no supino, e no agachamento a barra desce um pouco para trás. As medidas de dentro da máquina (onde fica a guia, o carro, a régua dos pinos, a trava) não aparecem em nenhuma ficha lida: são de desenho, em amarelo na tabela.</p>
<p><b>O que separa o smith do suporte de agachamento</b> (o cuidado 12): as duas guias cromadas com a barra presa nelas pelos carros dos rolamentos (no suporte, a barra está solta, apoiada em ganchos em J nas colunas com furos), a régua de pinos onde o gancho da barra prende ao girar a barra, as travas que correm na guia e a guia inclinada. O cartão de hoje tinha as guias e os ganchos, mas a barra parecia apoiada, como no suporte.</p>
<p><b>A máquina funciona:</b> a barra só anda na guia: de 128 cm para 62 cm de altura ela anda ${anda.toFixed(1).replace('.', ',')} cm na guia e ${(cima[2] - baixo[2]).toFixed(1).replace('.', ',')} cm para o lado (7°); os carros descem com ela; o gancho gira com a barra e prende num pino da régua; a trava fica parada na guia e o carro para nela. Com uma anilha de 20 kg de cada lado, a barra põe ${pesoDe(['anilha20'])} kg nas mãos.</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje: o smith', img(hoje('smith'), 96, 'cartao'))}${cel('nova', img(desenho(S({}).pecas, cam), 96, 'cartao'))}${cel('hoje: o suporte de agachamento (para ver se ainda se confundem)', img(hoje('rack_de_agachamento'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('smith'), 440, 'cartao'))}${cel('nova, do mesmo ângulo, com a barra presa no gancho', img(desenho(S({}).pecas, cam), 640))}</div>
<div class="l" style="margin-top:12px">${cel('hoje: o suporte de agachamento', img(hoje('rack_de_agachamento'), 440, 'cartao'))}</div>
<h2>Funcionando (de lado): a barra só anda na guia</h2>
<div class="l">${cel('em cima, presa: o gancho deitado sobre um pino da régua', img(desenho(S({}).pecas, lado), 440))}${cel('solta: a barra girada, o gancho em pé (como no treino)', img(desenho(S({ gancho: 90 }).pecas, lado), 440))}${cel('embaixo, parada na trava (a 62 cm)', img(desenho(S({ gancho: 90, barra: 62, trava: 62 }).pecas, lado), 440))}</div>
<h2>As medidas</h2>${tabela('smith', ['smith'])}`,
  );
}

if (!so || so === 'cadeira-extensora') {
  // a regulagem do exemplo: o rolo a 38 cm do eixo, a alavanca de 0° (para baixo) a 80° (quase na horizontal)
  const regulagem = { inicio: 0, rolo: 38, encosto: 8, placas: 5 };
  const ini = regulagem.inicio,
    fim = 80;
  const c0 = m.cadeiraExtensora({ ...regulagem, alavanca: ini }),
    c1 = m.cadeiraExtensora({ ...regulagem, alavanca: fim });
  const fl = m.cadeiraFlexora({ inicio: 95, rolo: 40, encosto: 8, trava: 70, placas: 5, alavanca: 95 });
  // de três quartos, pela frente e pelo lado direito de quem senta (como na folha da flexora)
  const cam = { yaw: 250, pitch: 12, s: 0.6 };
  const lado = { yaw: -90, pitch: 2, s: 0.6 };
  const ext = c0.extremos;
  const o = (id) => m.obj('cadeiraExtensora', id);
  await foto(
    'cadeira-extensora',
    `<h1>Cadeira extensora: o cartão de hoje × a peça nova (a irmã da cadeira flexora)</h1>
<p>O tamanho total vem das fichas da Life Fitness (SS-LE, 167 × 106 × 148 cm), da Hammer Strength (HS-LE, 120 × 105 × 163), da Movement (Next, 137 × 110 × 146) e da Precor (RSL0605, 155 × 127 × 148). O cartão de hoje é 37% a 54% mais estreito que elas, porque a torre das placas fica atrás do assento; aqui, como na flexora aprovada, a torre fica ao lado, que é como a largura das fichas fecha. A Precor dá também a espessura dos estofados (6,5 cm) e a altura da torre (148 cm). As medidas de dentro da máquina (altura do assento, onde fica o eixo, a alavanca) não aparecem em nenhuma ficha lida: são de desenho, em amarelo na tabela.</p>
<p><b>O mesmo desenho da flexora, com a função trocada:</b> o assento, o encosto que regula, o came no eixo ao lado do joelho, a alavanca e a torre saem da mesma peça (a flexora não muda). Na extensora não há a trava das coxas (o cartão de hoje não tem; o quadril fica no banco pelas mãos nas alças), o assento é reto (como no cartão) e mais alto (${String(o('assentoAltura'))} cm, contra 50 na flexora: com o joelho bem dobrado, o pé fica fora do chão), e o rolo fica <b>embaixo, na frente da canela</b>: a alavanca começa apontando para baixo e sobe para a frente.</p>
<p><b>A máquina funciona:</b> a alavanca gira no eixo; o came gira junto e enrola o cabo, e as placas do pino sobem ${c1.subida.toFixed(1).replace('.', ',')} cm do começo ao fim (de ${ini}° a ${fim}°); o encosto anda para a frente e para trás; o rolo corre na alavanca. Medida desenhada: ${(ext.zFrente - ext.zTras).toFixed(0)} cm de comprimento e ${(ext.xEsquerda - ext.xDireita).toFixed(0)} cm de largura.</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje', img(hoje('cadeira_extensora'), 96, 'cartao'))}${cel('nova', img(desenho([c0.fixa, c0.movel], cam), 96, 'cartao'))}${cel('hoje: a cadeira flexora', img(hoje('cadeira_flexora'), 96, 'cartao'))}${cel('nova: a cadeira flexora aprovada (para ver se ainda se confundem)', img(desenho([fl.fixa, fl.movel], cam), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('cadeira_extensora'), 440, 'cartao'))}${cel('nova, do mesmo ângulo da flexora, no começo do movimento', img(desenho([c0.fixa, c0.movel], cam), 640))}</div>
<h2>Funcionando: a alavanca no começo e no fim (de lado, pelo lado direito de quem senta)</h2>
<div class="l">${cel(`começo: a alavanca para baixo (${ini}°); as placas embaixo`, img(desenho([c0.fixa, c0.movel], lado), 640))}${cel(`fim: a alavanca à frente (${fim}°); as placas do pino ${c1.subida.toFixed(1).replace('.', ',')} cm acima`, img(desenho([c1.fixa, c1.movel], lado), 640))}</div>
<div class="l" style="margin-top:12px">${cel('fim, de três quartos', img(desenho([c1.fixa, c1.movel], cam), 640))}${cel('a cadeira flexora aprovada, de lado, no começo (a trava das coxas e o rolo à frente)', img(desenho([fl.fixa, fl.movel], lado), 640))}</div>
<h2>As medidas</h2>${tabela('cadeira-extensora', ['cadeiraExtensora'])}`,
  );
}

if (!so || so === 'cadeira-abdutora-adutora') {
  // a mesma máquina nas duas regulagens: na abdução, as almofadas por fora dos joelhos e a posição inicial com as pernas
  // fechadas; na adução, por dentro, e a posição inicial com as pernas abertas
  const ABD = { modo: 'abducao', inicio: 0, placas: 5 },
    ADU = { modo: 'aducao', inicio: 42, placas: 5 };
  const pecas = (reg, braco) => {
    const c = m.cadeiraAbdutora({ ...reg, braco });
    return [c.fixa, c.movel];
  };
  // o cartão de hoje olha a máquina de três quartos pela frente (yaw 28 com quem senta virado para −z); aqui quem senta
  // olha para +z: yaw 208 é o mesmo ângulo
  const cam = { yaw: 208, pitch: 12, s: 0.6 };
  const frente = { yaw: 180, pitch: 6, s: 0.6 };
  const cima = { yaw: 180, pitch: 89, s: 0.6 };
  const a0 = m.cadeiraAbdutora({ ...ABD, braco: 0 }),
    a1 = m.cadeiraAbdutora({ ...ABD, braco: 36 }),
    d0 = m.cadeiraAbdutora({ ...ADU, braco: 42 }),
    d1 = m.cadeiraAbdutora({ ...ADU, braco: 11 });
  const ext = a0.extremos;
  const o = (id) => m.obj('cadeiraAbdutora', id);
  // a maior distância entre as almofadas, com os braços a 52° (o erro "abrir demais" da adução), contra a da Precor
  const aberta = m.cadeiraAbdutora({ ...ADU, braco: 52 });
  const entre = Math.abs(aberta.almofadas.L.centro[0] - aberta.almofadas.R.centro[0]) + o('estofadoEsp');
  await foto(
    'cadeira-abdutora-adutora',
    `<h1>Cadeira abdutora e adutora: o cartão de hoje × a peça nova</h1>
<p>Uma máquina só faz as duas, como o cartão (e como a Life Fitness SS-HAA e a Precor RSL0626). O tamanho total vem da Life Fitness SS-HAA (manual público da linha Insignia: ${v(o('comp'), 0)} × ${v(o('larg'), 0)} × 148 cm, a torre ao lado do assento), da Precor (180 × 76 × 147) e das fichas da Hammer Strength (155 × 67 × 140) e da Movement (167 × 81 × 146, a torre à frente de quem senta). A Precor dá a espessura dos estofados (6,5 cm) e diz que o encosto é "um pouco deitado" (sem ângulo); a Life Fitness manda sentar com <b>os pés nos apoios e os joelhos a 90°</b>, com as almofadas por fora dos joelhos (abdução) ou por dentro (adução). <b>Nenhuma ficha dá o eixo das almofadas:</b> ele sai do corpo — cada braço gira num eixo vertical <b>embaixo do centro do quadril</b> de quem senta (o mesmo eixo em que a coxa gira quando abre), e por isso a almofada não escorrega pela coxa e o pé não sai do apoio. Em amarelo na tabela, o que é de desenho; em "derivada", o que sai do corpo da tabela.</p>
<p><b>A máquina funciona:</b> os dois braços giram juntos (engrenagens nos eixos); a almofada gira no alto do montante e passa para fora ou para dentro do joelho; o came do braço esquerdo enrola o cabo e as placas do pino sobem ${v(a1.subida)} cm na abdução (de 0° a 36°) e ${v(d1.subida)} cm na adução (de 42° a 11°). A torre fica ao lado do encosto e atrás dele, como no cartão, mas à esquerda de quem senta (no cartão, à direita): de lado, a vista que a animação usa para o tronco, ela fica atrás do corpo, e não na frente dele. (Os desenhos desta folha saem do gerador dos cartões, que desenha espelhado em relação à animação: aqui a torre aparece à esquerda; na animação, de frente, ela aparece à direita.) <b>Medida desenhada:</b> ${(ext.zFrente - ext.zTras).toFixed(0)} cm de comprimento e ${(ext.xEsquerda - ext.xDireita).toFixed(0)} cm de largura com os braços fechados: o comprimento é o da Life Fitness, mas a largura fica entre a das outras fichas (67 a 81 cm) e a da Life Fitness (161), porque a torre fica junto do encosto, como no cartão (106 cm). Com os braços a 52°, as almofadas ficam a ${v(entre, 0)} cm uma da outra (a Precor abre até 185).</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje', img(hoje('cadeira_abdutora_adutora'), 96, 'cartao'))}${cel('nova (abdução, pernas fechadas)', img(desenho(pecas(ABD, 0), cam), 96, 'cartao'))}${cel('nova (adução, pernas abertas)', img(desenho(pecas(ADU, 42), cam), 96, 'cartao'))}${cel('hoje: a cadeira flexora (para ver se ainda se confundem)', img(hoje('cadeira_flexora'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('cadeira_abdutora_adutora'), 440, 'cartao'))}${cel('nova, do mesmo ângulo (abdução: as almofadas por fora)', img(desenho(pecas(ABD, 0), cam), 640))}</div>
<div class="l" style="margin-top:12px">${cel('nova, do mesmo ângulo (adução: as almofadas por dentro, as pernas abertas)', img(desenho(pecas(ADU, 42), cam), 640))}</div>
<h2>Funcionando: a abdução (almofadas por fora), de frente e de cima</h2>
<div class="l">${cel('começo: os braços fechados (0°); as placas embaixo', img(desenho([a0.fixa, a0.movel], frente), 440))}${cel(`fim: os braços abertos (36°); as placas do pino ${v(a1.subida)} cm acima`, img(desenho([a1.fixa, a1.movel], frente), 440))}</div>
<div class="l" style="margin-top:12px">${cel('começo, de cima', img(desenho([a0.fixa, a0.movel], cima, false), 440))}${cel('fim, de cima: os braços giram em volta dos eixos embaixo do quadril', img(desenho([a1.fixa, a1.movel], cima, false), 440))}</div>
<h2>Funcionando: a adução (almofadas por dentro), de frente e de cima</h2>
<div class="l">${cel('começo: os braços abertos (42°, a posição inicial); as placas embaixo', img(desenho([d0.fixa, d0.movel], frente), 440))}${cel(`fim: os braços fechados (11°), as almofadas quase se tocando; as placas ${v(d1.subida)} cm acima`, img(desenho([d1.fixa, d1.movel], frente), 440))}</div>
<div class="l" style="margin-top:12px">${cel('começo, de cima', img(desenho([d0.fixa, d0.movel], cima, false), 440))}${cel('fim, de cima', img(desenho([d1.fixa, d1.movel], cima, false), 440))}</div>
<h2>As medidas</h2>${tabela('cadeira-abdutora', ['cadeiraAbdutora'])}`,
  );
}

if (!so || so === 'mesa-flexora') {
  const regulagem = { inicio: -8, rolo: 44, placas: 5 };
  const M = (alavanca) => m.mesaFlexora({ ...regulagem, alavanca });
  // de três quartos, pela frente e pelo lado direito de quem deita (como o cartão de hoje)
  const cam = { yaw: -60, pitch: 14, s: 0.6 };
  const lado = { yaw: -90, pitch: 2, s: 0.6 };
  const c0 = M(-8),
    c1 = M(112);
  const ext = c0.extremos;
  const o = (id) => m.obj('mesaFlexora', id);
  const altura = (p) => p.ponta[1] + p.comp * p.ao[1];
  await foto(
    'mesa-flexora',
    `<h1>Mesa flexora: o cartão de hoje × a peça nova</h1>
<p>O tamanho total vem das fichas da Life Fitness (SS-LC, 159 × 106 × 148 cm), da Hammer Strength (HS-LC, 166 × 100 × 140), da Movement (Next Leg Curl, 155,3 × 108,1 × 145,8) e da Precor (RSL0606, 155 × 122 × 147, torre de 148 cm). <b>O cartão de hoje tem 160 × 50 × ~90 cm: é 33% a 40% mais baixo que as fichas</b>, porque não tem a torre das placas (a carga é um pino de anilha na alavanca); a altura das fichas é a da torre. Aqui a torre fica ao lado do estofado, como na cadeira flexora aprovada, que é como a largura das fichas fecha; ela fica na ponta da frente, ao lado do estofado do peito: de lado, fica atrás da cabeça e dos braços, e não atrás do quadril e das pernas, que o guia precisa mostrar. A Precor dá a espessura dos estofados (6,5 cm) e diz que o estofado do quadril e o do peito têm ângulos diferentes para alinhar o joelho com o eixo ("the angled hip and chest pads [...] ensure proper alignment of the exerciser's knee with the pivot point"); a Life Fitness diz o mesmo ("a diverging hip and chest pad angle, which minimises lower back stress"). Nenhuma ficha dá os ângulos: a dobra no quadril é de desenho, mais marcada que a do cartão de hoje (o das coxas sobe ${v(o('coxaInclina'), 0)}° até o quadril e o do peito desce ${v(o('peitoInclina'), 0)}° até a cabeça), para o quadril ficar no alto da dobra e o peito deitar no estofado. As medidas de dentro da máquina (a altura do eixo, onde ele fica em relação ao estofado, a alavanca) também são de desenho, em amarelo na tabela. O came, a alavanca, o rolo e a pilha são os da cadeira flexora, com as mesmas medidas.</p>
<p><b>A máquina funciona:</b> a alavanca gira no eixo, ao lado do joelho (a ${v(o('eixoAltura'), 0)} cm do chão, ${v(o('eixoAtras'), 0)} cm atrás da ponta do estofado das coxas); o came gira junto e enrola o cabo, que desce até uma polia no chão e corre ao longo da base até o pé da torre; as placas do pino sobem ${c1.subida.toFixed(1).replace('.', ',')} cm do começo ao fim do movimento (de −8° a 112°); o rolo corre na alavanca até ficar atrás dos tornozelos. A dobra fica a ${v(altura(m.geometriaDaMesaFlexora().coxa))} cm do chão. Medida desenhada: ${(ext.zFrente - ext.zTras).toFixed(0)} cm de comprimento e ${(ext.xEsquerda - ext.xDireita).toFixed(0)} cm de largura.</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje', img(hoje('mesa_flexora'), 96, 'cartao'))}${cel('nova', img(desenho([c0.fixa, c0.movel], cam), 96, 'cartao'))}${cel('hoje: a panturrilha sentada (para ver se ainda se confundem)', img(hoje('panturrilha_sentada_maquina'), 96, 'cartao'))}${cel('hoje: a cadeira flexora', img(hoje('cadeira_flexora'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('mesa_flexora'), 440, 'cartao'))}${cel('nova, do mesmo lado, no começo do movimento', img(desenho([c0.fixa, c0.movel], cam), 640))}</div>
<h2>Funcionando: a alavanca no começo e no fim (de lado, pelo lado esquerdo de quem deita, o da alavanca)</h2>
<div class="l">${cel('começo: a alavanca para os pés (−8°); as placas embaixo', img(desenho([c0.fixa, c0.movel], lado), 640))}${cel(`fim: a alavanca para cima (112°); as placas do pino ${c1.subida.toFixed(1).replace('.', ',')} cm acima`, img(desenho([c1.fixa, c1.movel], lado), 640))}</div>
<div class="l" style="margin-top:12px">${cel('fim, de três quartos', img(desenho([c1.fixa, c1.movel], cam), 640))}</div>
<h2>As medidas</h2>${tabela('mesa-flexora', ['mesaFlexora'])}`,
  );
}

if (!so || so === 'gluteo-maquina') {
  // a regulagem do corpo da tabela, no começo e no fim do coice (a máquina sem o corpo)
  const ex = m.EXERCICIOS['coice-maquina'];
  const q0 = ex.quadro(m.CORPOS.homem, 0),
    q1 = ex.quadro(m.CORPOS.homem, 1);
  const semCorte = (pecas) => pecas.map((p) => ({ ...p, noQuadro: undefined }));
  const p0 = semCorte(q0.pecas),
    p1 = semCorte(q1.pecas);
  // de três quartos, com a alavanca à direita do desenho (como o cartão de hoje)
  const cam = { yaw: -120, pitch: 14, s: 0.6 };
  const lado = { yaw: 90, pitch: 2, s: 0.6 };
  const o = (id) => m.obj('gluteoMaquina', id);
  const sobe = q1.marcas.pilha[1];
  const gira = q1.marcas.alavanca[0] - q1.marcas.alavanca[1];
  await foto(
    'gluteo-maquina',
    `<h1>Glúteo na máquina (de quatro apoios): o cartão de hoje × a peça nova</h1>
<p><b>Qual máquina.</b> A ficha da técnica e o cartão do app (coice na máquina) pedem a máquina de quatro apoios: "tronco apoiado (peito ou antebraços na almofada), um pé na plataforma ou na alavanca; o outro joelho apoiado". <b>As três fichas que o plano listava são de máquinas em pé</b>, outro tipo: a Life Fitness SS-GL (186 × 98 × 148 cm), a Hammer Strength HS-HG (166 × 100 × 183, a de quadril em várias direções, com o rolo atrás da coxa) e a Movement Next Glute (102 × 90 × 146, em pé numa plataforma, com apoio dos cotovelos). O cartão de hoje também é de máquina em pé (o apoio do peito a 1 m do chão e a alavanca do pé atrás). As fichas de quatro apoios lidas são a <b>Precor Glutebuilder Pendulum Kickback GSL0617</b> (127 × 132 × 145 cm, torre de 148 cm; "kneeling exercise position with a double knee pad, chest pad and hand grips"; "isolating movement at the hip joint") e a <b>Atlantis C-122</b> (168,8 × 111,4 × 159,9 cm; "kneeling position"; "rubber footplates"; "angled handles and forearm pads"). O tamanho total vem da Precor; o resto não aparece em nenhuma ficha e é de desenho, em amarelo na tabela.</p>
<p><b>A máquina funciona:</b> a alavanca gira num eixo na linha do quadril de quem ajoelha (a ${v(o('eixoAltura'), 0)} cm do chão; a almofada dos joelhos regula na altura para o quadril cair nele, e aqui fica a ${v(q0.marcas.joelheira[1])} cm); a plataforma do pé, na ponta da alavanca, a ${v(q0.marcas.alavanca[2])} cm do eixo, gira junto, encostada na sola; o came gira com ela e enrola o cabo, e as placas do pino sobem ${v(sobe)} cm quando a alavanca gira ${v(gira, 0)}° (do começo ao fim do coice). Os apoios dos antebraços (a ${v(o('antebracoAltura'), 0)} cm do chão) correm para a frente e para trás, com os pegadores em pé na ponta. Na cena, a alavanca, o came e o pé do eixo ficam do lado de fora da perna direita, do lado de quem olha de lado: são pintados atrás do corpo (o mesmo corte de ilustração do smith), para não cobrir o glúteo e a coxa.</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje', img(hoje('gluteo_maquina'), 96, 'cartao'))}${cel('nova', img(desenho(p0, cam), 96, 'cartao'))}${cel('hoje: a rosca na máquina (para ver se ainda se confundem)', img(hoje('rosca_maquina'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje (máquina em pé)', img(hoje('gluteo_maquina'), 440, 'cartao'))}${cel('nova (de quatro apoios), do mesmo lado, no começo do coice', img(desenho(p0, cam), 640))}</div>
<h2>Funcionando: a alavanca no começo e no fim (de lado, pelo lado direito de quem ajoelha)</h2>
<div class="l">${cel('começo: a plataforma atrás, as placas embaixo', img(desenho(p0, lado), 640))}${cel(`fim: a plataforma no alto; as placas do pino ${v(sobe)} cm acima`, img(desenho(p1, lado), 640))}</div>
<div class="l" style="margin-top:12px">${cel('fim, de três quartos', img(desenho(p1, cam), 640))}</div>
<h2>As medidas</h2>${tabela('gluteo-maquina', ['gluteoMaquina'])}`,
  );
}

if (!so || so === 'leg-press') {
  const o = (id) => m.obj('legPress', id);
  // o cartão de hoje põe a máquina ao longo de x e olha de yaw −30; a peça corre ao longo de z: yaw 120 dá o mesmo
  // enquadramento (o encosto à esquerda, as guias subindo para a direita), visto pelo outro lado da máquina
  const cam = { yaw: 120, pitch: 6, s: 0.6 };
  const lado = { yaw: 90, pitch: 2, s: 0.6 };
  const L = (carro, trava) => m.legPress({ carro, trava, batente: 52, anilhas: ['anilha20'] }).pecas;
  const E = m.extremosDoLegPress();
  const larg = 2 * (o('guiasEntre') / 2 + o('tuboLarg') / 2 + o('pinoAnilhaComp'));
  const sobe = (s0, s1) => v((s1 - s0) * Math.sin((o('trilhoInclina') * Math.PI) / 180));
  await foto(
    'leg-press',
    `<h1>Leg press 45°: o cartão de hoje × a peça nova</h1>
<p>O tamanho total segue a ficha da Hammer Strength PL-LP (176 × 130 × 145 cm); a Magnum MG-PL70 (229 × 171 × 158) e a Gym Gear Elite (238 × 219 × 137) são mais compridas, com o assento mais para trás. <b>O ângulo das guias, 45°, vem do nome dos três aparelhos</b> e da página da Hammer Strength HSLLP ("Featuring a 45-degree angle"). Da Gym Gear vêm a guia redonda de 40 mm (o rolamento linear), o tubo de 100 × 50 mm, os pegadores de 38 mm e os 4 pinos de guardar anilhas; da Magnum, a massa do carro (75,7 kg), o batente de baixo que regula ("adjustable bottom stop") e a trava ("racking mechanism"). <b>O que faz a máquina funcionar não está em nenhuma ficha lida</b> e saiu do corpo da tabela, com o motivo na tabela: o encosto a 40° do chão (as fichas só dizem que ele regula: é a posição em que o corpo desce até o joelho passar de 90° sem o quadril dobrar além da média da tabela), a altura do assento, a linha em que a chapa corre e onde a trava apoia. Do cartão de hoje: o assento a 10°, a chapa 10° mais em pé que a perpendicular à guia, 72 cm de chapa, os estofados de 50 cm, a alavanca da trava dos dois lados do carro.</p>
<p><b>A máquina funciona:</b> o carro (a chapa, as anilhas e as alavancas) só anda nas duas guias; a alavanca da trava, presa no carro, fecha sobre o suporte da estrutura (o carro não desce abaixo dele) ou gira ${v(o('travaAbre'), 0)}° para cima e solta o carro; os batentes de baixo ficam parados na guia, na altura escolhida. Medida desenhada: ${v(E.zFrente - E.zTras, 0)} cm de comprimento, ${v(E.yTopo, 0)} cm de altura e ${v(larg, 0)} cm de uma ponta de pino à outra (a ficha: 176 × 145 × 130).</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje', img(hoje('leg_press'), 96, 'cartao'))}${cel('nova (o carro em cima, trava fechada)', img(desenho(L(83, 'fechada'), cam), 96, 'cartao'))}${cel('hoje: o hack (para ver se ainda se confundem)', img(hoje('hack'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('leg_press'), 440, 'cartao'))}${cel('nova, do mesmo ângulo (uma anilha de 20 kg de cada lado)', img(desenho(L(83, 'fechada'), cam), 640))}</div>
<h2>Funcionando (de lado): o carro só anda na guia</h2>
<div class="l">${cel('em cima, a trava fechada: o gancho apoiado no suporte', img(desenho(L(83, 'fechada'), lado), 440))}${cel('a trava aberta (girada para cima): o carro solto', img(desenho(L(83, 'aberta'), lado), 440))}${cel(`embaixo, perto dos batentes (o carro desceu ${sobe(57, 83)} cm de altura)`, img(desenho(L(57, 'aberta'), lado), 440))}</div>
<h2>As medidas</h2>${tabela('leg-press', ['legPress'])}<p style="margin-top:8px">As anilhas são as da barra longa (folha-barra.png).</p>`,
  );
}

if (!so || so === 'hack') {
  const o = (id) => m.obj('hack', id);
  // o cartão de hoje põe a máquina ao longo de x e olha de yaw 9, pela frente do encosto; a peça corre ao longo de z:
  // yaw −99 mostra a frente do encosto, do mesmo ângulo (espelhado)
  const cam = { yaw: -99, pitch: 9, s: 0.6 };
  const lado = { yaw: 90, pitch: 2, s: 0.6 };
  const H = (carro, trava) => m.hack({ carro, trava, anilhas: ['anilha20'] }, 108).pecas;
  const E = m.extremosDoHack();
  const larg = 2 * (o('guiasEntre') / 2 + o('tubo') / 2 + o('pinoAnilhaComp'));
  await foto(
    'hack',
    `<h1>Hack: o cartão de hoje × a peça nova</h1>
<p>O tamanho total segue a ficha da Hammer Strength PL-HSQ (216 × 155 × 153 cm; é a única ficha de hack lida). <b>O ângulo do carro, 45°, vem da página da Hammer Strength PL-HSQ2</b> ("with a 45-degree pressing angle"; a página americana da Life Fitness diz o mesmo); o cartão de hoje tinha 47°. A mesma página dá a massa do carro (57 kg), a trava de duas posições ("flip-in, flip-out racking handles", "two different racking positions"), os 4 pinos de guardar anilhas e que a chapa dos pés regula 8° ("the equivalent of both a 3° and 10° heel wedge"), <b>sem dizer o ângulo da chapa</b>: ela fica com a ponta 15° acima do calcanhar, como no cartão de hoje (com o corpo deitado a 45°, a chapa reta deixaria o tornozelo esticado demais em cima). Onde a chapa fica em relação ao encosto e onde ficam as almofadas dos ombros saíram do corpo da tabela, com o motivo na tabela.</p>
<p><b>A máquina funciona:</b> o carro (o encosto, as almofadas dos ombros, os pegadores, as anilhas e as alavancas) só anda nas duas guias, a 45°; a chapa dos pés fica parada; a alavanca da trava fecha sobre um dos dois suportes da estrutura ou gira ${v(o('travaAbre'), 0)}° para fora e solta o carro. Medida desenhada: ${v(E.zFrente - E.zTras, 0)} cm de comprimento, ${v(E.yTopo, 0)} cm de altura e ${v(larg, 0)} cm de uma ponta de pino à outra (a ficha: 216 × 153 × 155).</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje', img(hoje('hack'), 96, 'cartao'))}${cel('nova (o carro em cima, trava fechada)', img(desenho(H(108, 'fechada'), cam), 96, 'cartao'))}${cel('hoje: o leg press (para ver se ainda se confundem)', img(hoje('leg_press'), 96, 'cartao'))}${cel('hoje: o smith', img(hoje('smith'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('hack'), 440, 'cartao'))}${cel('nova, do mesmo ângulo (uma anilha de 20 kg de cada lado)', img(desenho(H(108, 'fechada'), cam), 640))}</div>
<h2>Funcionando (de lado): o carro só anda na guia; a chapa fica parada</h2>
<div class="l">${cel('em cima, a trava fechada no suporte de cima', img(desenho(H(108, 'fechada'), lado), 440))}${cel('a trava aberta: o carro solto', img(desenho(H(108, 'aberta'), lado), 440))}${cel('embaixo (o carro desceu 40 cm na guia)', img(desenho(H(68, 'aberta'), lado), 440))}</div>
<h2>As medidas</h2>${tabela('hack', ['hack'])}<p style="margin-top:8px">As anilhas são as da barra longa (folha-barra.png).</p>`,
  );
}

if (!so || so === 'graviton') {
  const o = (id) => m.obj('graviton', id);
  const G = (alavanca) => {
    const r = m.graviton({ alavanca });
    return [r.pecas.estrutura, r.pecas.barra, r.pecas.paralela, r.pecas.alavanca];
  };
  // a almofada no alto da barra (26°) e no ponto mais baixo (−29°): o caminho do corpo da tabela
  const [alto, baixo] = [26, -29];
  const sobe = (a) => m.subidaDaPilhaDoGraviton(a);
  // o cartão de hoje olha a máquina de três quartos, pela frente da pilha e pelo lado; a peça corre ao longo de z
  const cam = { yaw: -64, pitch: 10, s: 0.6 };
  const deTras = { yaw: 26, pitch: 10, s: 0.6 };
  const lado = { yaw: 90, pitch: 2, s: 0.6 };
  await foto(
    'graviton',
    `<h1>Graviton (barra e paralela assistidas): o cartão de hoje × a peça nova</h1>
<p>O tamanho total segue a ficha da Life Fitness SS-ADC (163 × 149 × 222 cm); a Hammer Strength HS-ADC (117 × 115 × 221), a Matrix VS-S601 (142,8 × 152,8 × 219,7) e a Atlantis D131 (144 × 141,8 × 233,4) têm a mesma altura e são mais curtas. Da Atlantis vem o diâmetro das alças (3,9 cm, "bars configured in a progressive V shape"); da Life Fitness, a pilha de 85 kg; das quatro, que os joelhos apoiam numa almofada que dobra para o treino sem ajuda e que há degraus para subir. <b>Nenhuma ficha lida diz como a almofada anda</b> (a Atlantis fala de "a linear bearing mechanism", sem dizer de quê): ela fica numa alavanca que gira num eixo preso às colunas, como no cartão de hoje. <b>O que faz a máquina funcionar não está em nenhuma ficha</b> e saiu do corpo da tabela, com o motivo na tabela (em amarelo): a altura das alças de barra (${v(o('alcaAltura'), 0)} cm) e de paralela (${v(o('paralelaAltura'), 0)} cm), a altura do eixo (${v(o('eixoAltura'), 0)} cm) e o raio da alavanca até o joelho (${v(o('alavancaAteJoelho'), 0)} cm). O eixo do cartão de hoje fica a 46 cm, no pé das colunas; a peça nova o sobe a ${v(o('eixoAltura'), 0)} cm, no meio do caminho dos joelhos na barra, porque com o eixo embaixo o joelho não alcançaria o alto da barra.</p>
<p><b>A máquina funciona:</b> quem treina ajoelha na almofada e a empurra para baixo; a alavanca gira no eixo, o came (${v(o('cameDiam'), 0)} cm) gira com ela e enrola o cabo, que corre até a roldana do pé da torre, sobe por dentro dela e puxa as placas para cima: a pilha sobe quando a almofada desce (o contrapeso), e é ela que empurra os joelhos para cima. O topo da almofada fica ${v(o('almofadaAbaixoDoEixo'), 0)} cm abaixo da linha do eixo: com a frente da canela nela, o centro do joelho cai nessa linha e a almofada gira em volta do eixo sem escorregar debaixo do joelho. No caminho da barra, a almofada vai de ${baixo}° a +${alto}° (inclina com a alavanca) e as placas sobem ${v(sobe(baixo) - sobe(alto))} cm. Sem ninguém, a alavanca para no batente de cima (${v(o('alavancaTopo'), 0)}°).</p>
<h2>No tamanho do cartão (96 px)</h2>
<div class="l">${cel('hoje', img(hoje('graviton'), 96, 'cartao'))}${cel('nova', img(desenho(G(alto), cam), 96, 'cartao'))}${cel('hoje: a estação de barra fixa (para ver se ainda se confundem)', img(hoje('barra_fixa'), 96, 'cartao'))}</div>
<h2>Ampliada</h2>
<div class="l">${cel('hoje', img(hoje('graviton'), 440, 'cartao'))}${cel('nova, do mesmo lado (a almofada em cima)', img(desenho(G(alto), cam), 640))}</div>
<div class="l" style="margin-top:12px">${cel('nova, de três quartos pelo lado de quem treina (a almofada em cima)', img(desenho(G(alto), deTras), 640))}</div>
<h2>Funcionando (de lado, pelo lado direito de quem treina): a almofada em cima e embaixo</h2>
<div class="l">${cel(`em cima (+${alto}°, o topo da barra): as placas ${v(sobe(alto))} cm acima do repouso`, img(desenho(G(alto), lado), 520))}${cel(`embaixo (${baixo}°, a barra com os braços estendidos): a almofada desceu ${v(m.debaixoDoJoelho(alto)[1] - m.debaixoDoJoelho(baixo)[1])} cm e as placas subiram para ${v(sobe(baixo))} cm`, img(desenho(G(baixo), lado), 520))}</div>
<h2>As medidas</h2>${tabela('graviton', ['graviton'])}`,
  );
}

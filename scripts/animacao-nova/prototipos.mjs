// Protótipos da etapa 1 da animação nova: as quatro animações-âncora no desenho aprovado do Boneco.
// Gera, em docs/revisoes/animacao-nova/prototipos/:
//   index.html           página que roda sozinha (sem rede): exercício, vista, modo, erro, desenho e tema
//   folha-<id>.png       folha de contato de cada âncora, ao lado da versão de hoje (motor do app, só leitura)
//   erros.png            todos os erros das âncoras em tamanho grande, hoje e novo
//   medidas.json         peso do pacote e tempo por quadro, hoje e novo (no Chromium com a CPU 4x mais lenta)
// Uso: node scripts/animacao-nova/prototipos.mjs [so-pagina|so-folhas|so-medidas]
/* global MOTOR, HOJE */
import { build } from 'esbuild';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright';
import { motorNovo, motorNovoTexto } from './empacotar.mjs';

const SAIDA = 'docs/revisoes/animacao-nova/prototipos';
const ENTRADA = `export * from './src/engine/novo/app.ts';`;
const so = process.argv[2] ?? '';
const { modulo: m } = await motorNovo(ENTRADA);
const corpo = m.CORPOS.homem;
const cssNovo = readFileSync('src/engine/novo/estilo.css', 'utf8') + m.cssDoBoneco();
const IDS = ['goblet', 'supino-reto', 'puxada-unilateral', 'flexao'];
const NOME_VISTA = { lateral: 'de lado', frontal: 'de frente', posterior: 'de trás', cima: 'de cima' };
const NOME_MODO = { tec: 'Técnica', mus: 'Músculos', traj: 'Trajetória', err: 'Erros' };

/* ----- o guia de hoje, do motor do app (só leitura) ----- */
const cssHoje = readFileSync('src/styles.css', 'utf8');
const { outputFiles } = await build({ stdin: { contents: `export * from './src/engine/index.ts'; export { montarSvgEstilo } from './src/engine/estilo/index.ts';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
mkdirSync('node_modules/.tmp', { recursive: true });
writeFileSync('node_modules/.tmp/motor-de-hoje.mjs', outputFiles[0].text);
const hoje = await import(new URL('../../node_modules/.tmp/motor-de-hoje.mjs', import.meta.url).href);
const VISTA_HOJE = { lateral: 'lateral', frontal: 'frontal', posterior: 'posterior', cima: 'top' };
const exHoje = (id) => hoje.EX.find((e) => e.id === id);
function svgHoje(id, vista, modo, t, erro) {
  const q = hoje.montarSvgEstilo(exHoje(id), VISTA_HOJE[vista], modo, t, erro, 300, 'a2', false, {});
  return `<svg class="${q.classe}" viewBox="${q.viewBox}" preserveAspectRatio="xMidYMid meet">${q.html}</svg>`;
}
/** Instantes comparáveis nos dois motores: começo, meio e fim da primeira fase com movimento. */
function instantes(id) {
  const fases = m.EXERCICIOS[id].ficha.fases;
  let t0 = 0;
  const i = fases.findIndex((f) => f.tipo !== 'pausa');
  for (let k = 0; k < i; k++) t0 += fases[k].dur;
  const seq = exHoje(id).seq, j = seq.findIndex((s) => s.kind !== 'hold');
  const novo = [t0, t0 + fases[i].dur / 2, t0 + fases[i].dur], velho = [seq[j].t0, seq[j].t0 + seq[j].dur / 2, seq[j].t0 + seq[j].dur];
  return { novo, velho, nomes: ['começo', 'meio', fases[i].tipo === 'exc' ? 'embaixo' : 'fim'] };
}

const CAIXAS = new Map();
const caixa = (id, vista, boneco, mini) => {
  const k = `${id}|${vista}|${boneco}|${mini ? 1 : 0}`;
  if (!CAIXAS.has(k)) CAIXAS.set(k, m.enquadrar(m.EXERCICIOS[id], { corpo, vista, boneco, mini }, mini ? 0.04 : 0.06, mini ? 1 : 4 / 3));
  return CAIXAS.get(k);
};
const svgNovo = (id, vista, modo, t, { boneco = 'cinza', tema = 'claro', erro, mini = false } = {}) => m.svgDaCena(m.EXERCICIOS[id], t, { corpo, vista, boneco, modo, erro, mini }, caixa(id, vista, boneco, mini), tema);

const nav = async () => {
  const caminho = '/opt/pw-browsers/chromium';
  return chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
};

/* ============================== as folhas ============================== */
const ESCURO_HOJE = '--stage:#10171b;--fig:#e7eef2;--fig-far:#4f5e69;--torso:#5d6e7a;--joint:#2bb3a6;--eq:#2a353e;--eq-dark:#53626d;--cable:#a3b3bf;--ea-pele:#56656f;--ea-pele-longe:#2c3740;--ea-cont-longe:#4f5e69';
const cel = (titulo, svg, { w = 300, h = 225, classe = '', estilo = '' } = {}) => `<figure><div class="q ${classe}" style="width:${w}px;height:${h}px;${estilo}">${svg}</div><figcaption>${titulo}</figcaption></figure>`;
function folha(id) {
  const ex = m.EXERCICIOS[id], F = ex.ficha, I = instantes(id), fim = I.novo[2], fimV = I.velho[2];
  const lin = (titulo, celas) => `<h2>${titulo}</h2><div class="l">${celas.join('')}</div>`;
  let h = '';
  for (const v of ex.vistas) {
    h += lin(`Técnica, ${NOME_VISTA[v]}: hoje (em cima) e novo (embaixo)`, [
      ...I.velho.map((t, i) => cel(`hoje · ${I.nomes[i]}`, svgHoje(id, v, 'tec', t), { classe: 'hoje' })),
    ]) + `<div class="l">${I.novo.map((t, i) => cel(`novo · ${I.nomes[i]}`, svgNovo(id, v, 'tec', t))).join('')}</div>`;
  }
  h += lin('Músculos: hoje e novo, em cada vista', ex.vistas.flatMap((v) => [cel(`hoje · ${NOME_VISTA[v]}`, svgHoje(id, v, 'mus', fimV), { classe: 'hoje' }), cel(`novo · ${NOME_VISTA[v]}`, svgNovo(id, v, 'mus', fim))]));
  h += lin('Trajetória: hoje e novo', [cel(`hoje · ${NOME_VISTA[ex.vistas[0]]}`, svgHoje(id, ex.vistas[0], 'traj', fimV), { classe: 'hoje' }), cel(`novo · ${NOME_VISTA[ex.vistas[0]]}`, svgNovo(id, ex.vistas[0], 'traj', fim))]);
  h += lin('Erros: hoje e novo (no novo, o certo fica tracejado atrás e o errado em vermelho)', F.erros.flatMap((e) => {
    const iH = exHoje(id).errors.findIndex((x) => x.id === e.id);
    return [...(iH >= 0 ? [cel(`hoje · ${e.titulo}`, svgHoje(id, e.vista, 'err', fimV, iH), { classe: 'hoje' })] : []), cel(`novo · ${e.titulo}`, svgNovo(id, e.vista, 'err', fim, { erro: e.id }))];
  }));
  const v0 = ex.vistas[0];
  h += lin('Tema escuro e a opção cor de pele', [
    cel('hoje · escuro', svgHoje(id, v0, 'mus', fimV), { classe: 'hoje esc', estilo: ESCURO_HOJE }),
    cel('novo · cinza, escuro', svgNovo(id, v0, 'mus', fim, { tema: 'escuro' })),
    cel('novo · cor de pele, técnica', svgNovo(id, v0, 'tec', fim, { boneco: 'pele' })),
    cel('novo · cor de pele, músculos', svgNovo(id, v0, 'mus', fim, { boneco: 'pele' })),
    cel('novo · cor de pele, escuro', svgNovo(id, v0, 'mus', fim, { boneco: 'pele', tema: 'escuro' })),
  ]);
  const mini = (t, s, o) => cel(t, s, { w: 96, h: 96, ...o });
  h += lin('Miniaturas (96 px)', [
    mini('hoje', svgHoje(id, v0, 'mus', fimV), { classe: 'hoje' }), mini('hoje · escuro', svgHoje(id, v0, 'mus', fimV), { classe: 'hoje esc', estilo: ESCURO_HOJE }),
    mini('novo', svgNovo(id, v0, 'mus', fim, { mini: true })), mini('novo · escuro', svgNovo(id, v0, 'mus', fim, { mini: true, tema: 'escuro' })),
    mini('cor de pele', svgNovo(id, v0, 'mus', fim, { mini: true, boneco: 'pele' })), mini('cor de pele · escuro', svgNovo(id, v0, 'mus', fim, { mini: true, boneco: 'pele', tema: 'escuro' })),
    ...ex.vistas.slice(1).map((v) => mini(`novo · ${NOME_VISTA[v]}`, svgNovo(id, v, 'mus', fim, { mini: true }))),
  ]);
  return `<!doctype html><meta charset="utf-8"><style>${cssHoje}${cssNovo}
body{margin:0;padding:22px 24px;background:#fff;color:#171b20;font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
h1{font-size:24px;margin:0 0 2px}p.s{margin:0 0 6px;color:#4d5661;max-width:1200px}
h2{font-size:15px;margin:14px 0 6px;border-top:2px solid #171b20;padding-top:6px}
.l{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:8px}figure{margin:0}figcaption{font-size:12px;color:#464b51;margin-top:2px}
.q{border-radius:10px;overflow:hidden;background:#f7f9fa}.q svg{width:100%;height:100%;display:block}
.q.hoje svg{background:var(--stage)}.q.hoje.esc{background:#10171b}
</style><h1>${F.nome}: hoje × novo</h1><p class="s">Folha de contato da etapa 1 da animação nova. "Hoje" é o guia que está no app; "novo" é o motor novo com o desenho do Boneco aprovado em 13/11/2026. Os quadros são o começo, o meio e o fim da primeira fase com movimento. Nada disto está no app.</p>${h}`;
}

/** Todos os erros das âncoras, em tamanho grande, hoje e novo lado a lado (para conferir se o erro se lê de relance). */
function folhaDosErros() {
  let h = '';
  for (const id of IDS) {
    const F = m.EXERCICIOS[id].ficha, I = instantes(id);
    h += `<h2>${F.nome}</h2><div class="l">${F.erros.flatMap((e) => {
      const iH = exHoje(id).errors.findIndex((x) => x.id === e.id);
      return [...(iH >= 0 ? [cel(`hoje · ${e.titulo} (${NOME_VISTA[e.vista]})`, svgHoje(id, e.vista, 'err', I.velho[2], iH), { classe: 'hoje', w: 400, h: 300 })] : []), cel(`novo · ${e.titulo} (${NOME_VISTA[e.vista]})`, svgNovo(id, e.vista, 'err', I.novo[2], { erro: e.id }), { w: 400, h: 300 })];
    }).join('')}</div>`;
  }
  return `<!doctype html><meta charset="utf-8"><style>${cssHoje}${cssNovo}
body{margin:0;padding:22px 24px;background:#fff;color:#171b20;font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}h1{font-size:24px;margin:0 0 2px}p.s{margin:0 0 6px;color:#4d5661;max-width:1200px}
h2{font-size:15px;margin:14px 0 6px;border-top:2px solid #171b20;padding-top:6px}.l{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:8px}figure{margin:0}figcaption{font-size:12px;color:#464b51;margin-top:2px}
.q{border-radius:10px;overflow:hidden;background:#f7f9fa}.q svg{width:100%;height:100%;display:block}.q.hoje svg{background:var(--stage)}
</style><h1>Modo Erros: hoje × novo</h1><p class="s">No novo: a parte do corpo que erra fica em vermelho, a linha vermelha mostra onde ela está, a linha tracejada verde mostra onde deveria estar, o contorno tracejado é o corpo no movimento certo, e o nome do erro fica fora do corpo. Quadro: o fim da primeira fase com movimento.</p>${h}`;
}

/* ============================== a página que roda sozinha ============================== */
async function pagina() {
  const js = await motorNovoTexto(ENTRADA);
  const fichas = Object.fromEntries(IDS.map((id) => [id, { nome: m.EXERCICIOS[id].ficha.nome, vistas: m.EXERCICIOS[id].vistas, erros: m.EXERCICIOS[id].ficha.erros.map((e) => ({ id: e.id, titulo: e.titulo, vista: e.vista })) }]));
  const html = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Animação nova · protótipos</title><style>${cssNovo}
:root{color-scheme:light dark}body{margin:0;font:15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;background:#fff;color:#171b20}body.escuro{background:#0b1013;color:#e7eef2}
main{max-width:560px;margin:0 auto;padding:12px}h1{font-size:18px;margin:4px 0 2px}p{margin:0 0 8px;font-size:13px;opacity:.8}
#palco{border-radius:14px;overflow:hidden;aspect-ratio:4/3;background:#f7f9fa}#palco svg{width:100%;height:100%;display:block}
.g{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.g b{flex-basis:100%;font-size:12px;opacity:.7;font-weight:600}
button{min-height:44px;padding:0 12px;border-radius:10px;border:1px solid #9aa8b3;background:transparent;color:inherit;font:inherit}button[aria-pressed=true]{background:#1d2a36;color:#fff;border-color:#1d2a36}body.escuro button[aria-pressed=true]{background:#e7eef2;color:#10171b}
#fase{font-size:14px;min-height:22px;margin-top:6px}#mini{width:96px;height:96px;border-radius:9px;overflow:hidden}#mini svg{width:100%;height:100%}
</style><body><main><h1>Animação nova · protótipos da etapa 1</h1><p>As quatro animações-âncora no desenho aprovado do Boneco. Roda sem rede; nada disto está no app.</p>
<div id="palco"></div><div id="fase"></div>
<div class="g" id="g-ex"><b>Exercício</b></div><div class="g" id="g-vista"><b>Vista</b></div><div class="g" id="g-modo"><b>Modo</b></div><div class="g" id="g-erro"><b>Erro</b></div>
<div class="g" id="g-boneco"><b>Desenho</b></div><div class="g" id="g-tema"><b>Tema</b></div><div class="g" id="g-anda"><b>Movimento</b></div>
<div class="g"><b>Miniatura (96 px)</b><div id="mini"></div></div></main>
<script>${js}</script><script>
const FICHAS=${JSON.stringify(fichas)},NV=${JSON.stringify(NOME_VISTA)},NM=${JSON.stringify(NOME_MODO)};
const corpo=MOTOR.CORPOS.homem,E={ex:'goblet',vista:'lateral',modo:'tec',erro:null,boneco:'cinza',tema:'claro',anda:!matchMedia('(prefers-reduced-motion: reduce)').matches,vel:1};
let t=0,antes=null,caixas={};
const cx=(mini)=>{const k=[E.ex,E.vista,E.boneco,mini].join('|');return caixas[k]??=MOTOR.enquadrar(MOTOR.EXERCICIOS[E.ex],{corpo,vista:E.vista,boneco:E.boneco,mini},mini?0.04:0.06,mini?1:4/3)};
function desenha(){const ex=MOTOR.EXERCICIOS[E.ex],o={corpo,vista:E.vista,boneco:E.boneco,modo:E.modo,erro:E.modo==='err'?E.erro:undefined};
 document.getElementById('palco').innerHTML=MOTOR.svgDaCena(ex,t,o,cx(false),E.tema);
 const f=MOTOR.instante(ex.ficha.fases,t).fase;document.getElementById('fase').textContent=f.nome+' · '+f.respira.toLowerCase();}
function mini(){const ex=MOTOR.EXERCICIOS[E.ex];document.getElementById('mini').innerHTML=MOTOR.svgDaCena(ex,MOTOR.duracao(ex.ficha.fases)*0.45,{corpo,vista:E.vista,boneco:E.boneco,modo:'mus',mini:true},cx(true),E.tema)}
function grupo(id,itens,chave,depois){const g=document.getElementById(id);g.querySelectorAll('button').forEach(b=>b.remove());
 for(const [v,rot] of itens){const b=document.createElement('button');b.textContent=rot;b.setAttribute('aria-pressed',String(E[chave]===v));b.onclick=()=>{E[chave]=v;depois&&depois();montar()};g.appendChild(b)}}
function montar(){const F=FICHAS[E.ex];if(!F.vistas.includes(E.vista))E.vista=F.vistas[0];
 const erros=F.erros.filter(e=>e.vista===E.vista);if(E.modo==='err'&&!erros.some(e=>e.id===E.erro))E.erro=erros[0]?.id??null;if(E.modo==='err'&&!E.erro){const e=F.erros[0];E.vista=e.vista;E.erro=e.id}
 document.body.className=E.tema==='escuro'?'escuro':'';
 grupo('g-ex',Object.entries(FICHAS).map(([id,f])=>[id,f.nome]),'ex');grupo('g-vista',F.vistas.map(v=>[v,NV[v]]),'vista');grupo('g-modo',Object.entries(NM),'modo');
 grupo('g-erro',E.modo==='err'?F.erros.map(e=>[e.id,e.titulo+' ('+NV[e.vista]+')']):[],'erro',()=>{E.vista=F.erros.find(e=>e.id===E.erro).vista});
 document.getElementById('g-erro').style.display=E.modo==='err'?'':'none';
 grupo('g-boneco',[['cinza','Cinza (padrão)'],['pele','Cor de pele']],'boneco');grupo('g-tema',[['claro','Claro'],['escuro','Escuro']],'tema');
 grupo('g-anda',[[true,'Andando'],[false,'Parado']],'anda');desenha();mini()}
function passo(agora){if(antes!==null&&E.anda){t+=(agora-antes)/1000*E.vel;desenha()}antes=agora;requestAnimationFrame(passo)}
montar();requestAnimationFrame(passo);
</script></body></html>`;
  writeFileSync(`${SAIDA}/index.html`, html);
  console.log(`página: ${(html.length / 1024).toFixed(0)} kB (${(gzipSync(html).length / 1024).toFixed(0)} kB compactada)`);
}

/* ============================== medidas ============================== */
async function medidas() {
  const pacote = async (opcoes) => { const t = await motorNovoTexto(ENTRADA, opcoes); return { minificado: t.length, gzip: gzipSync(t).length }; };
  const novo = await pacote({}), semZod = await pacote({ external: ['zod'] });
  const h = await build({ stdin: { contents: `export { EX } from './src/engine/index.ts'; export { montarSvgEstilo } from './src/engine/estilo/index.ts';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, minify: true, format: 'iife', globalName: 'HOJE', write: false });
  const hojeTxt = h.outputFiles[0].text;
  const out = { comoFoiMedido: 'Chromium com a CPU 4x mais lenta (Emulation.setCPUThrottlingRate), palco de 360 px; 90 quadros do ciclo; cada quadro = montar o SVG, trocar no palco e forçar o layout. No novo, "primeiraVolta" inclui a conta que posiciona o corpo; depois dela os quadros ficam guardados.', pacote: { novo, novoSemZod: semZod, nota: 'o app já carrega o zod; "novoSemZod" é o que o motor novo acrescenta. O de hoje traz os 90 exercícios; o novo, 4.', hoje: { minificado: hojeTxt.length, gzip: gzipSync(hojeTxt).length } }, quadro: {} };
  const b = await nav(), pg = await b.newPage({ viewport: { width: 400, height: 700 } });
  const cdp = await pg.context().newCDPSession(pg);
  await pg.setContent(`<!doctype html><style>${cssHoje}${cssNovo}#p{width:360px;height:270px}#p svg{width:100%;height:100%}</style><div id="p"></div><script>${await motorNovoTexto(ENTRADA)}</script><script>${hojeTxt}</script>`);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  for (const id of IDS) {
    out.quadro[id] = await pg.evaluate(({ id, vh }) => {
      const p = document.getElementById('p'), N = 90;
      const mede = (f) => { const ts = []; for (let i = 0; i < N; i++) { const a = performance.now(); p.innerHTML = f(i / N); p.getBoundingClientRect(); ts.push(performance.now() - a); } ts.sort((x, y) => x - y); return { mediaMs: Math.round((ts.reduce((s, x) => s + x, 0) / N) * 100) / 100, p95Ms: Math.round(ts[Math.floor(N * 0.95)] * 100) / 100 }; };
      const ex = MOTOR.EXERCICIOS[id], corpo = MOTOR.CORPOS.homem, T = MOTOR.duracao(ex.ficha.fases), v = ex.vistas[0];
      const r = {};
      for (const boneco of ['cinza', 'pele']) for (const modo of ['tec', 'mus']) { const o = { corpo, vista: v, boneco, modo }, cx = MOTOR.enquadrar(ex, o); const f = (u) => MOTOR.svgDaCena(ex, u * T, o, cx); const primeira = mede(f), depois = mede(f); let so = 0; { const a = performance.now(); for (let i = 0; i < N; i++) f(i / N); so = Math.round(((performance.now() - a) / N) * 100) / 100; } r[`novo/${boneco}/${modo}`] = { primeiraVolta: primeira, ...depois, soMontarOTextoMs: so, bytes: f(0.4).length }; }
      const eh = HOJE.EX.find((e) => e.id === id);
      for (const modo of ['tec', 'mus']) { const f = (u) => { const q = HOJE.montarSvgEstilo(eh, vh[v], modo, u * eh.T, 0, 360, 'a2', false, {}); return `<svg class="${q.classe}" viewBox="${q.viewBox}">${q.html}</svg>`; }; r[`hoje/${modo}`] = { ...mede(f), bytes: f(0.4).length }; }
      return r;
    }, { id, vh: VISTA_HOJE });
  }
  await b.close();
  writeFileSync(`${SAIDA}/medidas.json`, JSON.stringify(out, null, 1) + '\n');
  console.log(JSON.stringify(out));
}

mkdirSync(SAIDA, { recursive: true });
if (!so || so === 'so-pagina') await pagina();
if (!so || so === 'so-folhas') {
  const b = await nav();
  for (const id of IDS) {
    const pg = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
    pg.on('pageerror', (e) => console.log('erro:', String(e).slice(0, 300)));
    await pg.setContent(folha(id));
    await pg.screenshot({ path: `${SAIDA}/folha-${id}.png`, fullPage: true });
    await pg.close();
    console.log(`folha ${id}`);
  }
  await b.close();
}
if (!so || so === 'so-folhas' || so === 'so-erros') {
  const b = await nav(), pg = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  await pg.setContent(folhaDosErros());
  await pg.screenshot({ path: `${SAIDA}/erros.png`, fullPage: true });
  await b.close();
  console.log('folha dos erros');
}
if (!so || so === 'so-medidas') await medidas();

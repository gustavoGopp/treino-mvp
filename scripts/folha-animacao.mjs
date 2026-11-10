// Folha de contatos de uma animação: quadros-chave em cada vista e modo, erros e a verificação de IK.
// É o que o Gustavo revisa antes de aprovar uma animação nova.
// Uso: node scripts/folha-animacao.mjs <id-da-animacao> [saida.png] [--estilo=a|b]
// --estilo: desenha no estilo novo (a = boneco padrão, b = silhueta, a2 = boneco com o acabamento de 04/11); sem ele, a folha é a do estilo clássico.
// Animações em revisão ficam em src/engine/exercicios/revisao/ (fora do app até a aprovação).
import { build } from 'esbuild';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const opcoes = process.argv.slice(2).filter((a) => a.startsWith('--'));
const [id, saidaArg] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const estilo = opcoes.find((a) => a.startsWith('--estilo='))?.split('=')[1] ?? null;
if (estilo && !['a', 'b', 'a2'].includes(estilo)) throw new Error('estilo: use a, b ou a2');
const saida = saidaArg ?? `test-results/folha-${id}${estilo ? `-estilo-${estilo}` : ''}.png`;
if (!id) throw new Error('informe o id da animação');

// A animação pode estar em revisão (arquivo em src/engine/exercicios/<id>.ts, ainda fora da lista EX do app).
const arquivo = [`src/engine/exercicios/revisao/${id}.ts`, `src/engine/exercicios/${id}.ts`].find((f) => existsSync(f));
if (!arquivo) throw new Error(`não achei src/engine/exercicios/[revisao/]${id}.ts`);
const entrada = `export * from './src/engine/index.ts'; export { prep, calib } from './src/engine/cena.ts';
export { montarSvgEstilo, instanteDoErro } from './src/engine/estilo/index.ts';
export { default as NOVA } from './${arquivo}';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const motor = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
// Uma correção de animação já aprovada fica em revisao/ com o mesmo id: nesse caso, a versão em revisão é a medida.
const ex = arquivo.includes('/revisao/') ? motor.NOVA : motor.EX.find((e) => e.id === id);
if (!motor.EX.includes(ex)) {
  motor.prep(ex);
  motor.calib(ex);
}
// Mesma checagem de cinemática de src/engine/qa.ts, só para esta animação.
const ik = (K) => {
  motor.CTX.IKFAIL = 0;
  for (let i = 0; i < 80; i++) motor.skel(motor.poseAt(ex, K, (i / 80) * ex.T));
  return motor.CTX.IKFAIL;
};
const qa = `${id} ik=${ik(ex.K)} errs ${ex.errors.map((e) => `${e.id}:${ik(e.K)}`).join(' ')}`;
const tempos = ex.seq.map((g) => ({ t: g.t0 + (g.kind === 'hold' ? g.dur / 2 : g.dur * 0.5), rot: g.label }));
const css = (await import('node:fs')).readFileSync('src/styles.css', 'utf8');
// O título de cada erro vem do texto do guia (aprovado ou em revisão), como no app (R5-anim, 10/11/2026).
const textoGuia = [`src/conteudo/exercicios/${id}.json`, `src/conteudo/revisao/${id}.json`].find((f) => existsSync(f));
const titulos = textoGuia ? Object.fromEntries((JSON.parse(readFileSync(textoGuia, 'utf8')).errors ?? []).map((e) => [e.id, e.title])) : {};
const quadro = (view, mode, t, err = 0, rot = '') => {
  const tituloErro = mode === 'err' ? titulos[ex.errors[err]?.id] : undefined;
  const q = estilo ? motor.montarSvgEstilo(ex, view, mode, t, err, 300, estilo, false, { tituloErro }) : { ...motor.montarSvg(ex, view, mode, t, err, 300), classe: '' };
  return `<figure><svg class="${q.classe}" viewBox="${q.viewBox}">${q.html}</svg><figcaption>${rot}</figcaption></figure>`;
};
let html = `<style>${css}body{background:#fff;font:13px sans-serif;margin:12px}h2{font-size:15px;margin:14px 0 4px}.l{display:flex;flex-wrap:wrap;gap:8px}figure{margin:0;width:260px;background:var(--stage);border:1px solid #ddd}figure svg{width:260px;height:195px;display:block}figcaption{padding:3px 6px;font-size:12px}</style>`;
html += `<h1 style="font-size:18px">${id}${estilo ? ` · estilo ${estilo.toUpperCase()} (R4)` : ''}</h1><p><b>QA:</b> ${qa}</p>`;
for (const view of ex.views) {
  html += `<h2>${view}: técnica</h2><div class="l">${tempos.map(({ t, rot }) => quadro(view, 'tec', t, 0, rot)).join('')}</div>`;
  if (estilo) html += `<h2>${view}: músculos e trajetória</h2><div class="l">${tempos.map(({ t, rot }) => quadro(view, 'mus', t, 0, rot)).join('')}${quadro(view, 'traj', 0, 0, 'trajetória')}</div>`;
  else html += `<h2>${view}: músculos e trajetória</h2><div class="l">${quadro(view, 'mus', tempos[2]?.t ?? 0, 0, 'músculos')}${quadro(view, 'traj', 0, 0, 'trajetória')}</div>`;
}
// R4 (05/11/2026): o quadro de cada erro no instante em que o certo e o errado mais se afastam (como o guia abre o modo Erros)
html += `<h2>Erros</h2><div class="l">${ex.errors.map((e, i) => quadro(e.view, 'err', estilo ? motor.instanteDoErro(ex, i) : (tempos[2]?.t ?? 0), i, `${e.id} (${e.view})`)).join('')}</div>`;
writeFileSync(`/tmp/folha-${id}.html`, html);

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1120, height: 800 } });
await p.goto(`file:///tmp/folha-${id}.html`);
await p.screenshot({ path: saida, fullPage: true });
await b.close();
console.log(qa);
console.log('folha:', saida);

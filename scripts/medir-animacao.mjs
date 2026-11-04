// Medidas de uma animação, para a conferência escrita de cada folha (sessão de catálogo, 04/11/2026).
// Uso: node scripts/medir-animacao.mjs <id-da-animacao>
// Imprime, em cada fase do ciclo, as juntas principais (centímetros do motor; y para cima, z para a frente; R = lado
// direito, x < 0), a contagem de falhas de cinemática (ik) e a distância entre as duas mãos em cada pose-chave e em cada
// erro: num objeto seguro com as duas mãos (kettlebell, halter de pé), ela deve ficar perto da largura da pegada
// (~10–14 cm), senão o objeto "voa" entre as mãos (pedido do Gustavo, 04/11/2026).
import { build } from 'esbuild';
import { existsSync } from 'node:fs';

const id = process.argv[2];
if (!id) throw new Error('informe o id da animação');
const arquivo = [`src/engine/exercicios/revisao/${id}.ts`, `src/engine/exercicios/${id}.ts`].find((f) => existsSync(f));
if (!arquivo) throw new Error(`não achei src/engine/exercicios/[revisao/]${id}.ts`);
const entrada = `export * from './src/engine/index.ts'; export { prep, calib } from './src/engine/cena.ts'; export { default as NOVA } from './${arquivo}';`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const m = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
const ex = m.EX.find((e) => e.id === id) ?? m.NOVA;
if (!m.EX.includes(ex)) {
  m.prep(ex);
  m.calib(ex);
}
const f = (v) => v.map((x) => x.toFixed(0)).join(',');
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]).toFixed(1);
for (const g of ex.seq) {
  m.CTX.IKFAIL = 0;
  const sk = m.skel(m.poseAt(ex, ex.K, g.t0 + g.dur / 2));
  const s = (k) => sk.side[k];
  console.log(`${g.label.padEnd(28)} P ${f(sk.P)} | ombro R ${f(s('R').S)} | mão R ${f(s('R').G)} L ${f(s('L').G)} | joelho R ${f(s('R').K)} L ${f(s('L').K)} | ik ${m.CTX.IKFAIL}`);
}
// Fita de suspensão (peça `suspensao`): o caminho da âncora a cada pegador, pose a pose. A fita não estica, então o
// comprimento deve variar pouco entre as poses-chave da animação (os erros podem fugir disso de propósito).
if (ex._fita) {
  const fitaDe = (K) => {
    m.CTX.PJ = m.VIEWS[ex.views[0]].proj; m.CTX.VIEW = ex.views[0]; m.CTX.MEAS = [1e9, -1e9, 1e9, -1e9]; m.CTX.prims = [];
    ex._fita = null; ex.equip(m.skel(K)); m.CTX.MEAS = null;
    return Object.values(ex._fita).map((f) => `${f.min.toFixed(0)}${f.max - f.min > 0.5 ? `–${f.max.toFixed(0)}` : ''}`).join('/');
  };
  console.log(`fita de suspensão (cm, da âncora ao pegador): ${Object.keys(ex.K).map((k) => `${k} ${fitaDe(ex.K[k])}`).join(' · ')}`);
  for (const e of ex.errors) console.log(`  erro ${e.id}: ${Object.keys(e.K).map((k) => `${k} ${fitaDe(e.K[k])}`).join(' · ')}`);
}
const maos = (K) => Object.keys(K).map((k) => `${k} ${dist(m.skel(K[k]).side.R.G, m.skel(K[k]).side.L.G)}`).join(' · ');
console.log(`distância entre as mãos (cm): ${maos(ex.K)}`);
for (const e of ex.errors) console.log(`  erro ${e.id}: ${maos(e.K)}`);

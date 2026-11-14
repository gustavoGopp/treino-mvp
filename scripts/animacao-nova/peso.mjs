// Uso: node scripts/animacao-nova/peso.mjs  (grava docs/revisoes/animacao-nova/prototipos/peso.json)
// Mede o pacote do motor novo (o que o app carregaria) de três jeitos: como está; sem os textos de fonte; e só o
// motor, com cada exercício num pedaço à parte.
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
const TEXTOS = new Set(['onde', 'nota', 'o', 'origem', 'pede', 'oQueMuda', 'populacao', 'tempo', 'respira']);
const semTextos = {
  name: 'sem-textos',
  setup(b) {
    b.onLoad({ filter: /src\/engine\/novo\/dados\/.*\.json$/ }, (a) => {
      const limpa = (x, chave) => {
        if (typeof x === 'string') return TEXTOS.has(chave) ? '-' : x;
        if (Array.isArray(x)) return x.map((y) => limpa(y, chave));
        if (x && typeof x === 'object') {
          const out = {};
          for (const [k, v] of Object.entries(x)) out[k] = k === 'fontes' && typeof v === 'object' ? Object.fromEntries(Object.keys(v).map((f) => [f, '-'])) : limpa(v, k);
          return out;
        }
        return x;
      };
      return { contents: JSON.stringify(limpa(JSON.parse(readFileSync(a.path, 'utf8')))), loader: 'json' };
    });
  },
};
async function mede(entrada, plugins = []) {
  const r = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false, minify: true, external: ['zod'], loader: { '.json': 'json' }, plugins });
  const t = r.outputFiles[0].text;
  return { min: t.length, gz: gzipSync(t).length };
}
const APP = `export * from './src/engine/novo/app.ts';`;
const MOTOR = `export { CORPOS } from './src/engine/novo/tabelas'; export { VISTAS } from './src/engine/novo/desenho'; export { duracao, instante } from './src/engine/novo/movimento'; export { enquadrar, itensDaCena, svgAnimado, svgDaCena } from './src/engine/novo/cena'; export { DEFS_DO_BONECO, cssDoBoneco } from './src/engine/novo/boneco';`;
const um = (id) => `export * from './src/engine/novo/exercicios/${id}.ts';`;
const out = { comoEsta: await mede(APP), semTextosDeFonte: await mede(APP, [semTextos]), soOMotor: await mede(MOTOR), soOMotorSemTextos: await mede(MOTOR, [semTextos]) };
for (const id of ['goblet', 'supino-reto', 'puxada-unilateral', 'flexao']) {
  // o que um exercício acrescenta ao motor: motor + exercício, menos o motor
  const junto = await mede(MOTOR + um(id)),
    juntoSem = await mede(MOTOR + um(id), [semTextos]);
  out[`mais:${id}`] = { gz: junto.gz - out.soOMotor.gz, gzSemTextos: juntoSem.gz - out.soOMotorSemTextos.gz };
}
out.comoFoiMedido = 'esbuild, minificado, sem o zod (o app já o carrega); gz = compactado com gzip. "mais:<id>" = o que o exercício acrescenta ao motor quando é o único carregado (inclui as peças que ele divide com os outros).';
writeFileSync('docs/revisoes/animacao-nova/prototipos/peso.json', JSON.stringify(out, null, 1) + '\n');
console.log(JSON.stringify(out, null, 1));

// O que o motor precisaria calcular ao abrir um exercício e não muda de uma vez para a outra: o quadro de cada vista,
// a vista da miniatura, a caixa do corpo no ciclo e as calibrações demoradas do corpo no aparelho. Calcular na hora
// atrasava o primeiro desenho em segundos. Cada exercício ganha o seu arquivo (src/engine/novo/dados/preparo/<id>.json),
// que o app carrega junto com ele; o registro.ts da mesma pasta entrega todos de uma vez aos scripts e aos testes.
// Uso: node scripts/animacao-nova/preparo.mjs            (calcula tudo e grava os arquivos)
//      node scripts/animacao-nova/preparo.mjs conferir   (calcula tudo e falha se algum arquivo estiver diferente)
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { motorNovoTexto } from './empacotar.mjs';

const conferir = process.argv[2] === 'conferir';
const PASTA = 'src/engine/novo/dados/preparo';
// As contas são feitas no navegador (o Chromium dos testes), e não no Node: as funções de matemática dos dois dão
// resultados que diferem na última casa, e o que fica guardado tem de ser o que o app calcularia.
const pacote = await motorNovoTexto(
  `export * from './src/engine/novo/app.ts'; export * from './src/engine/novo/ponte.ts'; export { calibragensPedidas } from './src/engine/novo/calibragens.ts'; export { usarPreparoGuardado } from './src/engine/novo/preparo.ts';`,
);
const caminho = '/opt/pw-browsers/chromium';
const navegador = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
const pagina = await navegador.newPage();
await pagina.setContent('<!doctype html><title>preparo</title>');
await pagina.addScriptTag({ content: pacote });
// o que está guardado fica de fora: tudo é calculado de novo
const ids = await pagina.evaluate(() => {
  const m = globalThis.MOTOR;
  m.usarPreparoGuardado(false);
  return Object.keys(m.EXERCICIOS).sort();
});
const preparos = {};
// um exercício por vez, para a página não ficar presa numa chamada só
for (const id of ids)
  preparos[id] = await pagina.evaluate((id) => {
    const m = globalThis.MOTOR;
    const ex = m.EXERCICIOS[id];
    m.calibragensPedidas();
    const enquadramento = m.enquadramentoCalculado(ex);
    // as poses do ciclo e dos erros também calibram o corpo: passa por todas
    for (const erro of [undefined, ...ex.ficha.erros.map((e) => e.id)]) for (const u of [0, 0.25, 0.5, 0.75, 1]) ex.quadro(m.CORPOS.homem, u, erro);
    return { enquadramento, calibragens: m.calibragensPedidas() };
  }, id);
await navegador.close();

const texto = (o) => JSON.stringify(o, null, 1) + '\n';
// um número que não é número (NaN, infinito) vira `null` no arquivo e mudaria o desenho sem aviso; uma calibração
// pedida e não calculada (undefined) sumiria do arquivo
for (const [id, p] of Object.entries(preparos)) {
  if (/\bnull\b/.test(JSON.stringify(p))) throw new Error(`${id}: há um valor que não é número; o arquivo não pode guardá-lo`);
  for (const [k, v] of Object.entries(p.calibragens)) if (v === undefined) throw new Error(`${id}: a calibração ${k} foi pedida e não calculada`);
}
const nome = (id) => `p${ids.indexOf(id)}`;
const registro =
  `// Gerado por scripts/animacao-nova/preparo.mjs: não edite. Entrega ao motor, de uma vez, o que foi calculado de antemão\n` +
  `// para todos os exercícios (para os scripts e os testes; o app carrega o arquivo de cada exercício junto com ele).\n` +
  `import { registrarPreparo } from '../../preparo';\nimport type { Preparo } from '../../preparo';\n` +
  ids.map((id) => `import ${nome(id)} from './${id}.json';`).join('\n') +
  `\n\nconst TODOS: Record<string, Preparo> = {\n${ids.map((id) => `  '${id}': ${nome(id)},`).join('\n')}\n};\nfor (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);\n`;
const arquivos = [...ids.map((id) => [`${PASTA}/${id}.json`, texto(preparos[id])]), [`${PASTA}/registro.ts`, registro]];
let ruim = 0;
if (conferir) {
  for (const [arq, novo] of arquivos)
    if ((existsSync(arq) ? readFileSync(arq, 'utf8') : '') !== novo) {
      ruim++;
      console.error(`${arq} está diferente do que o motor calcula: rode node scripts/animacao-nova/preparo.mjs`);
    }
  const sobra = readdirSync(PASTA).filter((f) => f.endsWith('.json') && !ids.includes(f.replace(/\.json$/, '')));
  if (sobra.length) {
    ruim++;
    console.error(`arquivos de exercício que não existe mais em ${PASTA}: ${sobra.join(', ')}`);
  }
} else {
  mkdirSync(PASTA, { recursive: true });
  for (const f of readdirSync(PASTA)) if (f.endsWith('.json')) rmSync(`${PASTA}/${f}`);
  for (const [arq, novo] of arquivos) writeFileSync(arq, novo);
}
const nCal = new Set(Object.values(preparos).flatMap((p) => Object.keys(p.calibragens))).size;
console.log(`${ids.length} exercícios, ${nCal} calibrações${conferir ? (ruim ? '' : ': as tabelas conferem') : ': arquivos gravados'}`);
process.exit(ruim ? 1 : 0);

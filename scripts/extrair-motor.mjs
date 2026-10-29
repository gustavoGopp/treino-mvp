// Extrai o motor de animação do guia original (referencia/guia-execucao-fase1.html) para módulos TS em src/engine/.
// Port mecânico: o código é copiado como está. Só muda o necessário para virar módulo:
//  - as variáveis globais de render (PJ, VIEW, KS, MEAS, prims, IKFAIL) viram campos do objeto CTX (contexto.ts);
//  - cada declaração de topo ganha `export`, e cada módulo importa o que usa dos outros;
//  - cada EX.push vira um arquivo em exercicios/, na mesma ordem.
// Uso: node scripts/extrair-motor.mjs   (sobrescreve src/engine/; o teste de equivalência confere o resultado)
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(raiz, 'referencia/guia-execucao-fase1.html'), 'utf8');
const destino = resolve(raiz, 'src/engine');

const CABECALHO = '// @ts-nocheck\n// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.\n';
const GLOBAIS = ['PJ', 'VIEW', 'KS', 'MEAS', 'prims', 'IKFAIL'];

const marca = (nome) => {
  const i = html.indexOf(`/* ================= ${nome}`);
  if (i < 0) throw new Error(`marcador não encontrado: ${nome}`);
  return i;
};
const trecho = (de, ate) => html.slice(marca(de), marca(ate));

const secoes = {
  math: trecho('matemática', 'corpo'),
  esqueleto: trecho('corpo', 'projeção e primitivas'),
  desenho: trecho('projeção e primitivas', 'exercícios: Torso A'),
  exercicios: trecho('exercícios: Torso A', 'preparação'),
  cena: trecho('preparação', 'interface'),
};

// 1) Globais de render → R.X; remove as declarações originais.
const renomear = (src) => src.replace(new RegExp(`(?<![.\\w$])(${GLOBAIS.join('|')})\\b(?!\\s*:)`, 'g'), 'CTX.$1');
secoes.esqueleto = secoes.esqueleto.replace('let IKFAIL=0;\n', '');
secoes.desenho = secoes.desenho.replace("let PJ=VIEWS.lateral.proj, VIEW='lateral', KS=1, MEAS=null, prims=[];\n", '');
for (const k of Object.keys(secoes)) secoes[k] = renomear(secoes[k]);
for (const k of Object.keys(secoes)) if (/\blet (PJ|VIEW|KS|MEAS|prims|IKFAIL)\b/.test(secoes[k])) throw new Error('declaração global restante em ' + k);

const parse = (src) => ts.createSourceFile('x.ts', src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

// Nomes declarados no topo de um trecho.
function declarados(sf) {
  const nomes = [];
  for (const st of sf.statements) {
    if (ts.isFunctionDeclaration(st) && st.name) nomes.push(st.name.text);
    else if (ts.isVariableStatement(st)) for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name)) nomes.push(d.name.text);
  }
  return nomes;
}

// Identificadores livres usados (ignora nomes de propriedade e chaves de objeto).
function usados(sf) {
  const set = new Set();
  const visita = (n) => {
    if (ts.isIdentifier(n)) {
      const p = n.parent;
      const ehPropriedade =
        (p && ts.isPropertyAccessExpression(p) && p.name === n) ||
        (p && (ts.isPropertyAssignment(p) || ts.isMethodDeclaration(p) || ts.isPropertySignature(p)) && p.name === n);
      if (!ehPropriedade) set.add(n.text);
    }
    if (ts.isShorthandPropertyAssignment(n)) set.add(n.name.text);
    ts.forEachChild(n, visita);
  };
  visita(sf);
  return set;
}

// Prefixa `export` nas declarações de topo.
function exportar(src) {
  const sf = parse(src);
  let out = '';
  let pos = 0;
  for (const st of sf.statements) {
    if (ts.isFunctionDeclaration(st) || ts.isVariableStatement(st)) {
      const ini = st.getStart(sf);
      out += src.slice(pos, ini) + 'export ' + src.slice(ini, st.end);
      pos = st.end;
    }
  }
  return out + src.slice(pos);
}

// 2) Exercícios: separa compartilhados e um arquivo por EX.push.
const exSf = parse(secoes.exercicios);
const compartilhado = [];
const exercicios = []; // {id, codigo, base?}
const idDe = (obj) => {
  const p = obj.properties.find((q) => q.name && q.name.text === 'id');
  return p.initializer.text;
};
for (const st of exSf.statements) {
  const txt = st.getFullText(exSf);
  if (ts.isVariableStatement(st)) {
    const nome = st.declarationList.declarations[0].name.text;
    if (nome !== 'EX') compartilhado.push(txt);
    continue;
  }
  if (ts.isExpressionStatement(st) && ts.isCallExpression(st.expression)) {
    const arg = st.expression.arguments[0];
    const id = idDe(arg);
    exercicios.push({ id, codigo: `${comentarios(txt)}const ex = ${arg.getText(exSf)};\nexport default ex;\n` });
    continue;
  }
  if (ts.isBlock(st)) {
    // {const src=EX.find(e=>e.id==='X'); EX.push(<objeto que usa src> | Object.assign({},src,{...}));}
    const [decl, push] = st.statements;
    const base = decl.declarationList.declarations[0].initializer.arguments[0].body.right.text;
    const arg = push.expression.arguments[0];
    const id = ts.isObjectLiteralExpression(arg) ? idDe(arg) : idDe(arg.arguments[2]);
    exercicios.push({ id, base, codigo: `const src = base;\nconst ex = ${arg.getText(exSf)};\nexport default ex;\n` });
    continue;
  }
  throw new Error('instrução inesperada na seção de exercícios: ' + txt.slice(0, 80));
}
function comentarios(txt) {
  const m = txt.match(/^\s*((?:\/\*[\s\S]*?\*\/\s*)+)/);
  return m ? m[1].trim() + '\n' : '';
}

// 3) Monta os módulos com imports calculados.
const modulos = {
  math: secoes.math,
  esqueleto: secoes.esqueleto,
  desenho: secoes.desenho,
  'exercicios/compartilhado': compartilhado.join('').replace(/^\s+/, ''),
  cena: secoes.cena,
};
const exportados = {}; // nome -> módulo
for (const [m, src] of Object.entries(modulos)) for (const n of declarados(parse(src))) exportados[n] = m;
exportados.CTX = 'contexto';

const caminho = (de, para) => {
  const a = de.split('/').length > 1 ? '../' : './';
  return a + para;
};
function comImports(nome, src) {
  const sf = parse(src);
  const proprios = new Set(declarados(sf));
  const porModulo = {};
  for (const n of usados(sf)) {
    const m = exportados[n];
    if (!m || m === nome || proprios.has(n)) continue;
    (porModulo[m] ??= []).push(n);
  }
  const imports = Object.entries(porModulo)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([m, ns]) => `import { ${ns.sort().join(', ')} } from '${caminho(nome, m)}';`)
    .join('\n');
  return CABECALHO + (imports ? imports + '\n\n' : '\n') + src;
}

// Só os arquivos gerados são substituídos; index.ts e qa.ts são escritos à mão.
rmSync(resolve(destino, 'exercicios'), { recursive: true, force: true });
mkdirSync(resolve(destino, 'exercicios'), { recursive: true });
const escrever = (rel, txt) => writeFileSync(resolve(destino, rel), txt.replace(/\s*$/, '\n'));

escrever(
  'contexto.ts',
  `// Estado de render compartilhado pelo motor. No guia original eram variáveis soltas
// (PJ, VIEW, KS, MEAS, prims, IKFAIL); aqui ficam num objeto único, com a mesma semântica.
export type Prim = { l: number; d: number; s: string };
export const CTX: {
  PJ: (v: number[]) => number[];
  VIEW: string;
  KS: number;
  MEAS: number[] | null;
  prims: Prim[];
  IKFAIL: number;
} = {
  PJ: (v) => [v[2]!, -v[1]!, -v[0]!], // mesma projeção de VIEWS.lateral
  VIEW: 'lateral',
  KS: 1,
  MEAS: null,
  prims: [],
  IKFAIL: 0,
};
`,
);
for (const [m, src] of Object.entries(modulos)) escrever(`${m}.ts`, comImports(m, exportar(src)));

const ident = (id) => id.replace(/-(\w)/g, (_, c) => c.toUpperCase());
for (const e of exercicios) {
  let txt = comImports(`exercicios/${e.id}`, e.codigo);
  if (e.base) txt = txt.replace(CABECALHO, CABECALHO + `import base from './${e.base}';\n`);
  escrever(`exercicios/${e.id}.ts`, txt);
}
escrever(
  'exercicios/index.ts',
  `${CABECALHO}${exercicios.map((e) => `import ${ident(e.id)} from './${e.id}';`).join('\n')}

// Mesma ordem do guia original (a ordem define os treinos e a ordem de preparação).
export const EX = [
${exercicios.map((e) => `  ${ident(e.id)},`).join('\n')}
];
`,
);
console.log(`motor extraído: ${Object.keys(modulos).length + 1} módulos, ${exercicios.length} exercícios`);

// Frontend novo (bloco A do pedido): confere que o espaço, a altura e o canto da interface saem só dos tokens.
// A escala de espaço é 4 · 8 · 16 · 24 · 32 · 48 · 64 (--s4 … --s64); as alturas de toque são 48, 56 e 64 (--h48,
// --h56, --h64); os cantos são --r8, --r16 e --rp. Falha (saída 1) quando aparece outro valor em src/styles.css ou um
// estilo escrito dentro de um componente em src/features/.
// Uso: npm run conferir:tokens            (lista o que está fora e falha se houver algo)
//      npm run conferir:tokens -- --resumo (só a contagem, por propriedade)
//
// O que fica de fora, e por quê:
// - o desenho do Boneco: os blocos de src/styles.css entre as marcas BONECO:INICIO e BONECO:FIM (as classes do SVG, que
//   são do motor e não mudam) e tudo o que está em src/engine/;
// - as linhas finas de 1 e 2 px (borda, traço de tabela, marca da meta): são desenho, não espaço;
// - largura e tamanho de imagem ou de miniatura: são medidas do conteúdo, não da grade;
// - valores relativos ao texto (em, lh, %), à tela (dvh, vw) e as áreas seguras do aparelho (env).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const RESUMO = process.argv.includes('--resumo');
const ESPACO = /^(margin|padding|gap|row-gap|column-gap|inset|top|right|bottom|left|scroll-padding|scroll-margin)(-[a-z-]+)?$/;
const ALTURA = /^(min-|max-)?height$/;
const CANTO = /^border(-[a-z]+){0,2}-radius$/;
const FINO = new Set(['0', '1px', '2px', '-1px', '-2px']);

/** Um valor está nos tokens quando, tirando o que é permitido, não sobra nenhum número com px ou rem. */
function fora(valor, tipo) {
  let v = valor
    .replace(/var\(--(s4|s8|s16|s24|s32|s48|s64|h48|h56|h64|r8|r16|rp|proto)\)/g, ' ')
    .replace(/env\([^()]*\)/g, ' ')
    .replace(/!important/g, ' ');
  // o que não é da grade: relativo ao texto, à tela ou ao contêiner
  v = v.replace(/-?\d*\.?\d+(em|lh|%|dvh|svh|lvh|vh|vw|fr|deg|s|ms)\b/g, ' ');
  const restos = v.match(/-?\d*\.?\d+(px|rem)\b/g) ?? [];
  const ruins = restos.filter((r) => !(FINO.has(r) && tipo !== 'canto'));
  // var() de token que não é da escala (por exemplo um apelido antigo) também conta
  const vars = (v.match(/var\(--[a-z0-9-]+/g) ?? []).map((x) => x.slice(4)).filter((n) => /^--(e\d|r\d$|toque)/.test(n));
  return [...ruins, ...vars];
}

const problemas = [];
// --- src/styles.css ---
const css = readFileSync('src/styles.css', 'utf8');
let dentroDoBoneco = false;
css.split('\n').forEach((linha, i) => {
  if (linha.includes('BONECO:INICIO')) dentroDoBoneco = true;
  if (linha.includes('BONECO:FIM')) { dentroDoBoneco = false; return; }
  if (dentroDoBoneco) return;
  const semComentario = linha.replace(/\/\*.*?\*\//g, '');
  for (const m of semComentario.matchAll(/(?:^|[{;\s])([a-z-]+)\s*:\s*([^;{}]+)/g)) {
    const [, prop, valor] = m;
    if (prop.startsWith('--')) continue;
    const tipo = ESPACO.test(prop) ? 'espaço' : ALTURA.test(prop) ? 'altura' : CANTO.test(prop) ? 'canto' : null;
    if (!tipo) continue;
    const ruins = fora(valor, tipo);
    if (ruins.length) problemas.push({ onde: `src/styles.css:${i + 1}`, tipo, prop, valor: valor.trim(), ruins });
  }
});
if (dentroDoBoneco) problemas.push({ onde: 'src/styles.css', tipo: 'marca', prop: 'BONECO:INICIO', valor: 'sem BONECO:FIM', ruins: ['marca'] });

// --- src/features/: nenhum estilo escrito no componente, a não ser valor que muda com o dado (largura de barra em %) ---
const andar = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? andar(join(d, f)) : /\.tsx?$/.test(f) ? [join(d, f)] : []));
for (const arq of andar('src/features')) {
  readFileSync(arq, 'utf8').split('\n').forEach((linha, i) => {
    for (const m of linha.matchAll(/style=\{\{([^}]*)\}\}/g)) {
      const corpo = m[1];
      // permitido: só propriedades cujo valor vem de uma conta (crase com ${…}) ou de uma variável de CSS (--nome)
      const partes = corpo.split(',').map((p) => p.trim()).filter(Boolean);
      const ruins = partes.filter((p) => !/^(['"]?--[\w-]+['"]?|width|left|height|transform)\s*:\s*(`[^`]*\$\{[^`]*`|[\w.]+(\([^)]*\))?)$/.test(p) || /\d(px|rem)/.test(p.replace(/`[^`]*`/g, '')));
      if (ruins.length) problemas.push({ onde: `${arq}:${i + 1}`, tipo: 'estilo no componente', prop: 'style', valor: corpo.trim().slice(0, 80), ruins });
    }
  });
}

const porTipo = {};
for (const p of problemas) porTipo[p.tipo] = (porTipo[p.tipo] ?? 0) + 1;
if (!RESUMO) for (const p of problemas) console.log(`${p.onde}  [${p.tipo}] ${p.prop}: ${p.valor}  → fora: ${p.ruins.join(', ')}`);
console.log(problemas.length ? `conferir:tokens: ${problemas.length} fora dos tokens (${Object.entries(porTipo).map(([k, v]) => `${k} ${v}`).join(', ')})` : 'conferir:tokens: tudo nos tokens (fora o desenho do Boneco)');
process.exit(problemas.length ? 1 : 0);

// Agente 4 (redesign, 06/11/2026): inventário por script dos componentes e dos valores do sistema visual de hoje.
// Lê src/styles.css e src/features/**/*.tsx (sem as telas de desenvolvimento) e conta:
// - classes CSS declaradas e classes usadas nas telas;
// - valores distintos de tamanho de letra, peso, espaço (padding/gap/margin), raio e espessura de borda;
// - variantes de botão, cartão/caixa, lista, chip/pílula, seletor e campo, por onde aparecem.
// Saída: reports/design/redesign/agente-4/inventario.json e um resumo em Markdown no terminal.
// Uso: node scripts/design/redesign/agente-4/inventario.mjs
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const raiz = new URL('../../../../', import.meta.url).pathname;
const css = readFileSync(join(raiz, 'src/styles.css'), 'utf8');

// ---- CSS -------------------------------------------------------------------------------------------------------
// Divide o CSS em blocos "seletor{declarações}" (sem aninhamento, exceto @media, que é aberto).
const semComentarios = css.replace(/\/\*[\s\S]*?\*\//g, '');
const blocos = [];
const re = /([^{}]+)\{([^{}]*)\}/g;
let m;
while ((m = re.exec(semComentarios))) {
  const sel = m[1].trim().replace(/^@media[^{]*\{?\s*/, '').trim();
  if (!sel || sel.startsWith('@')) continue;
  blocos.push({ sel, decl: m[2] });
}
// Linhas do bloco "svg" (desenho do Boneco) e R4/lab ficam fora do inventário das telas: não mudam.
const linhaSvg = css.indexOf('/* svg */');
const linhaTelas = css.indexOf('/* Telas do app');
const linhaR4 = css.indexOf('/* R4 (experimento do boneco)');
const linhaAcabamento = css.indexOf('/* Acabamento A2');
const posDe = (sel) => semComentarios.indexOf(sel);
const ehDoBoneco = (bloco) => {
  const i = css.indexOf(bloco.sel + '{') >= 0 ? css.indexOf(bloco.sel + '{') : -1;
  return (i >= linhaSvg && i < linhaTelas) || (i >= linhaR4 && i < linhaAcabamento - 1) || i >= linhaAcabamento;
};
const telas = blocos.filter((b) => !ehDoBoneco(b));

const valores = (prop) => {
  const out = new Map();
  for (const b of telas) {
    const r = new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`, 'g');
    let x;
    while ((x = r.exec(b.decl))) {
      const v = x[1].trim();
      out.set(v, (out.get(v) ?? 0) + 1);
    }
  }
  return out;
};
const ordena = (mapa) => [...mapa.entries()].sort((a, b) => b[1] - a[1]);

// Tamanhos de letra em px (rem × 17, o corpo).
const fontSizes = valores('font-size');
const px = (v) => {
  if (v.endsWith('px')) return parseFloat(v);
  if (v.endsWith('rem')) return Math.round(parseFloat(v) * 17 * 100) / 100;
  return null;
};
const tamanhosPx = new Map();
for (const [v, n] of fontSizes) {
  const p = px(v);
  if (p === null) continue;
  tamanhosPx.set(p, (tamanhosPx.get(p) ?? 0) + n);
}
const pesos = valores('font-weight');
const lineHeights = valores('line-height');
// Espaço: todos os números em px dentro de padding, gap, margin (sem auto/0/negativos).
const espacos = new Map();
for (const prop of ['padding', 'gap', 'margin', 'padding-left', 'padding-top', 'margin-top', 'margin-left', 'margin-bottom']) {
  for (const [v, n] of valores(prop)) {
    for (const t of v.split(/\s+/)) {
      const k = t.match(/^(\d+(?:\.\d+)?)px$/);
      if (k && Number(k[1]) > 0) espacos.set(Number(k[1]), (espacos.get(Number(k[1])) ?? 0) + n);
    }
  }
}
const raios = new Map();
for (const [v, n] of valores('border-radius')) {
  for (const t of v.split(/\s+/)) raios.set(t, (raios.get(t) ?? 0) + n);
}
const bordas = new Map();
for (const prop of ['border', 'border-top', 'border-bottom', 'border-left', 'outline']) {
  for (const [v, n] of valores(prop)) {
    const k = v.match(/^(\d+(?:\.\d+)?px)\s+(solid|dashed)/);
    if (k) bordas.set(`${k[1]} ${k[2]}`, (bordas.get(`${k[1]} ${k[2]}`) ?? 0) + n);
  }
}
const alturasMin = valores('min-height');
const sombras = valores('box-shadow');

// Classes declaradas nas telas (sem o Boneco).
const classesCss = new Set();
for (const b of telas) for (const c of b.sel.matchAll(/\.([a-zA-Z][\w-]*)/g)) classesCss.add(c[1]);

// ---- TSX -------------------------------------------------------------------------------------------------------
const arquivos = [];
const anda = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) anda(p);
    else if (p.endsWith('.tsx') && !p.includes('/dev/')) arquivos.push(p);
  }
};
anda(join(raiz, 'src/features'));
const usoClasses = new Map(); // classe → { n, arquivos:Set }
const porArquivo = {};
for (const a of arquivos) {
  const t = readFileSync(a, 'utf8');
  const rel = relative(raiz, a);
  porArquivo[rel] = { classes: new Set(), botoes: 0, selos: 0, details: 0, h2: 0, fieldset: 0 };
  // className="a b c" e className={`a ${x ? 'b' : 'c'}`}: pega todos os literais entre aspas.
  for (const c of t.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\}|\{([^}]*)\})/g)) {
    const bruto = (c[1] ?? c[2] ?? c[3] ?? '').replace(/\$\{[^}]*\}/g, ' ').replace(/['"`?:()]/g, ' ');
    for (const k of bruto.split(/\s+/)) {
      if (!/^[a-zA-Z][\w-]*$/.test(k)) continue;
      if (['true', 'false', 'undefined', 'className'].includes(k)) continue;
      const u = usoClasses.get(k) ?? { n: 0, arquivos: new Set() };
      u.n++;
      u.arquivos.add(rel);
      usoClasses.set(k, u);
      porArquivo[rel].classes.add(k);
    }
  }
  porArquivo[rel].botoes = (t.match(/<button\b/g) ?? []).length + (t.match(/<Link className="btn/g) ?? []).length;
  porArquivo[rel].selos = (t.match(/<Selo\b/g) ?? []).length;
  porArquivo[rel].details = (t.match(/<details\b/g) ?? []).length;
  porArquivo[rel].h2 = (t.match(/<h2\b/g) ?? []).length;
  porArquivo[rel].fieldset = (t.match(/<fieldset\b/g) ?? []).length;
}

// Famílias de componente: a mesma ideia com mais de um nome ou estilo.
const familias = {
  'botão (ação)': ['btn', 'sec', 'pequeno', 'perigo', 'alerta', 'salvar', 'cta', 'link-sec', 'link-guia', 'voltar', 'alerta-topo', 'iconbtn', 'ctl', 'reset', 'prefiro', 'tctl', 'sim-nao', 'opcao-ajuste', 'day'],
  'cartão / caixa de superfície': ['box', 'warnbox', 'caixa-erro', 'resultado', 'sugestao', 'fase', 'faixa', 'faixa-semana', 'registro', 'foto-eq', 'detalhes-eq', 'card', 'cartao-texto', 'cartao-ex', 'volta', 'troca-local', 'reservado', 'descanso', 'resumo-ex'],
  'lista': ['lista', 'lista-triagem', 'cartoes-ex', 'opcoes-ajuste', 'resumo-cadastro', 'pontos-evolucao', 'lista-evolucao', 'lista-locais', 'musculos', 'sugestoes-foto', 'fichas', 'series-feitas', 'cues', 'check', 'steps', 'porques', 'trocas-local', 'vol'],
  'chip / pílula / etiqueta': ['chip', 'chip-valor', 'chips-valor', 'errchip', 'fichas', 'series-feitas', 'selo', 'etiqueta', 'marca', 'day', 'breath', 'phase'],
  'seletor (escolha única ou múltipla)': ['opcao', 'opcoes', 'cartao-eq', 'chip-valor', 'estilo-boneco', 'seg', 'modes', 'abas', 'sim-nao', 'divisao', 'Marcar', 'Escolha'],
  'campo de texto / número': ['numero', 'campo-texto', 'nome-local', 'arquivo-campo', 'select'],
  'stepper / contador': ['stepper', 'contador', 'tctl'],
  'barra de progresso': ['progresso', 'barra', 'tbar', 'barra-volta', 'm-barra', 'timeline', 'pontos', 'semanas'],
  'recolher (details/summary)': ['mais', 'dobra', 'evitar', 'passo-a-passo', 'ver-mais', 'sobre', 'cartao-texto', 'exdev'],
  'título de seção (h2)': ['secao', 'titulo', 'info-dia', 'numero-grande'],
  'texto de apoio': ['ajuda', 'lede', 'note', 'muted', 'meta', 'sub-rx', 'erro', 'status', 'status-ok'],
};
const porFamilia = {};
for (const [fam, cls] of Object.entries(familias)) {
  porFamilia[fam] = cls
    .filter((c) => usoClasses.has(c) || classesCss.has(c))
    .map((c) => ({ classe: c, usos: usoClasses.get(c)?.n ?? 0, arquivos: usoClasses.get(c)?.arquivos.size ?? 0, noCss: classesCss.has(c) }));
}
// Classes declaradas e nunca usadas nas telas, e usadas e nunca declaradas.
const naoUsadas = [...classesCss].filter((c) => !usoClasses.has(c)).sort();
const semCss = [...usoClasses.keys()].filter((c) => !classesCss.has(c) && !/^(wrap|app|com-nav|conteudo|revelar|sr|nw|n|rx|tg|nav|on|conc|ecc|hold|in|dicas|hud|stage|breath|phase|errbanner|tcur|tseg|timeline|controls|exhead|card|days|chips|chip|iconbtn|ctl|seg|modes|modeinfo|legend|sw|errchips|errchip|quick|box|cues|check|reset|dbody|steps|step|dot|note|warnbox|listras|sentir|treino|sessao|semana|evolucao|local|m-nome|m-barra|m-num|m-estado|pe-data|pe-serie|pe-marcas|fs-topo|fs-msg|sugestao-texto|arquivo-nome|contador-rotulo|hoje-foi|atalhos|categoria|onde-hoje|acoes-local|quedas|queda|ajustes|calibracao|neutra|destaque|ativo|acabou|vazia|sem-guia|dev|lab)$/.test(c)).sort();

const saida = {
  geradoEm: new Date().toISOString(),
  css: {
    blocosTelas: telas.length,
    blocosTotal: blocos.length,
    classesDeclaradasTelas: classesCss.size,
    tamanhosDeLetraPx: ordena(tamanhosPx).sort((a, b) => a[0] - b[0]),
    tamanhosDeLetraDistintos: tamanhosPx.size,
    pesos: ordena(pesos),
    alturasDeLinha: ordena(lineHeights),
    espacosPx: ordena(espacos).sort((a, b) => a[0] - b[0]),
    espacosDistintos: espacos.size,
    raios: ordena(raios),
    bordas: ordena(bordas),
    alturasMin: ordena(alturasMin),
    sombras: ordena(sombras),
  },
  tsx: {
    arquivos: arquivos.length,
    classesUsadas: usoClasses.size,
    porFamilia,
    naoUsadasNoTsx: naoUsadas,
    usadasSemCss: semCss,
    porArquivo: Object.fromEntries(Object.entries(porArquivo).map(([k, v]) => [k, { ...v, classes: v.classes.size }])),
    maisUsadas: [...usoClasses.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, 40).map(([c, u]) => ({ classe: c, usos: u.n, arquivos: u.arquivos.size })),
  },
};
const dir = join(raiz, 'reports/design/redesign/agente-4');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'inventario.json'), JSON.stringify(saida, null, 1) + '\n');

const fmt = (arr, f = (x) => x) => arr.map(([v, n]) => `${f(v)} (${n})`).join(', ');
console.log(`# Inventário (gerado ${saida.geradoEm})`);
console.log(`CSS das telas: ${telas.length} blocos (de ${blocos.length}), ${classesCss.size} classes declaradas.`);
console.log(`Tamanhos de letra distintos: ${tamanhosPx.size} → ${fmt(saida.css.tamanhosDeLetraPx, (v) => v + 'px')}`);
console.log(`Pesos: ${fmt(saida.css.pesos)}`);
console.log(`Alturas de linha: ${fmt(saida.css.alturasDeLinha)}`);
console.log(`Espaços distintos (px): ${espacos.size} → ${fmt(saida.css.espacosPx, (v) => v + 'px')}`);
console.log(`Raios: ${fmt(saida.css.raios)}`);
console.log(`Bordas: ${fmt(saida.css.bordas)}`);
console.log(`Alturas mínimas: ${fmt(saida.css.alturasMin)}`);
console.log(`Sombras: ${fmt(saida.css.sombras)}`);
console.log(`\nTSX: ${arquivos.length} arquivos, ${usoClasses.size} classes usadas.`);
for (const [fam, lista] of Object.entries(porFamilia)) {
  console.log(`\n## ${fam}: ${lista.length} variantes`);
  console.log(lista.map((x) => `${x.classe}×${x.usos}/${x.arquivos}arq${x.noCss ? '' : ' (sem css)'}`).join(' · '));
}
console.log(`\nDeclaradas no CSS e não usadas nas telas (${naoUsadas.length}): ${naoUsadas.join(', ')}`);
console.log(`Usadas nas telas sem CSS próprio (${semCss.length}): ${semCss.join(', ')}`);
console.log('\nPor arquivo (classes distintas / botões / selos / details / h2 / fieldset):');
for (const [k, v] of Object.entries(saida.tsx.porArquivo)) console.log(`  ${k}: ${v.classes} / ${v.botoes} / ${v.selos} / ${v.details} / ${v.h2} / ${v.fieldset}`);

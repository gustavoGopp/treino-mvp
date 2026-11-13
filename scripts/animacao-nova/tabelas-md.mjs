// Escreve docs/revisoes/animacao-nova/tabelas.md: as tabelas do bloco A (corpo, músculos, objetos e a ficha de
// movimento de cada exercício refeito), lidas dos arquivos de dados do motor novo. Nenhum número é digitado aqui.
// Uso: node scripts/animacao-nova/tabelas-md.mjs
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const D = 'src/engine/novo/dados';
const le = (f) => JSON.parse(readFileSync(`${D}/${f}`, 'utf8'));
const n = (v) => String(v).replace('.', ',');
const cel = (t) => String(t ?? '').replace(/\|/g, '/').replace(/\n/g, ' ');
const NOME_TIPO = { medida: 'medida', derivada: 'derivada', provisoria: '**provisória**', desenho: 'desenho' };
let md = `# Tabelas do bloco A (corpo, músculos, objetos e fichas de movimento)

Gerado por \`node scripts/animacao-nova/tabelas-md.mjs\` a partir dos arquivos de \`${D}/\`. Nenhum número foi digitado neste documento: se um valor estiver errado, o erro está no arquivo de dados, e é lá que se corrige.

Tipos de linha: **medida** (lida na fonte), **derivada** (calculada de medidas, com a conta descrita), **provisória** (ainda sem fonte lida; a conferência lista todas e nenhuma animação vai para o app com provisória sem o ok do Gustavo) e **desenho** (escolha de desenho, sem pretensão de medida).

`;
/* ----- corpo ----- */
for (const sexo of ['homem', 'mulher']) {
  const c = le(`corpo-${sexo}.json`);
  const linhas = Object.entries(c.medidas);
  const conta = (t) => linhas.filter(([, m]) => m.tipo === t).length;
  md += `## Corpo: ${sexo}\n\nPopulação: ${c.populacao}. ${linhas.length} linhas: ${conta('medida')} medidas, ${conta('derivada')} derivadas, ${conta('provisoria')} provisórias${conta('desenho') ? `, ${conta('desenho')} de desenho` : ''}.\n\n`;
  if (sexo === 'mulher') {
    md += `A tabela da mulher tem as mesmas linhas, com os valores da mesma população (mulheres). Está em \`${D}/corpo-mulher.json\`; o desenho aprovado do Boneco só existe para o corpo do homem (ver proposta.md, decisões).\n\n`;
    continue;
  }
  md += `| medida | valor | tipo | fonte | onde na fonte |\n|---|---|---|---|---|\n`;
  for (const [id, m] of linhas) md += `| \`${id}\` | ${n(m.v)} ${m.un} | ${NOME_TIPO[m.tipo] ?? m.tipo} | ${cel(m.fonte)} | ${cel(m.onde)}${m.nota ? ` (${cel(m.nota)})` : ''} |\n`;
  md += `\nFontes do corpo:\n\n${Object.entries(c.fontes).map(([k, v]) => `- \`${k}\`: ${v}`).join('\n')}\n\n`;
}
/* ----- amplitudes ----- */
const amp = le('amplitudes.json');
md += `## Amplitudes das articulações\n\n${cel(amp.nota)}\n\n| movimento | média | máximo observado | fonte |\n|---|---|---|---|\n`;
for (const [id, a] of Object.entries(amp.limites)) md += `| ${cel(a.nome ?? id)} | ${n(a.media ?? a.med ?? '')}° | ${n(a.max ?? '')}° | ${cel(a.fonte)} |\n`;
md += `\nFontes: ${Object.entries(amp.fontes).map(([k, v]) => `\`${k}\`: ${v}`).join('; ')}\n\n`;
/* ----- músculos ----- */
const b = le('boneco.json');
const onde = {};
for (const [vista, lista] of Object.entries(b.musculos)) for (const m of lista) (onde[m.id] ??= new Set()).add(vista);
md += `## Músculos do desenho

O desenho aprovado tem ${Object.keys(onde).length} formas (${b.origem.split('.')[0]}). As formas foram desenhadas à mão sobre o corpo de medidas reais, em três vistas; a posição de cada uma sobre o osso ainda **não foi conferida contra o atlas** (pesquisa/03): isso entra na etapa 2, antes de cada lote.

| forma | desenhada de | o que o guia de hoje desenha no lugar (src/engine/estilo/musculos.ts) |
|---|---|---|
`;
const HOJE = { peitoral: 'peitoralEst, peitoralClav (duas formas)', abdomen: 'retoAbdominal', dorsal: 'dorsal, redondoMaior', gluteo: 'gluteos', posteriores: 'posteriores', quadriceps: 'quadriceps', panturrilha: 'panturrilha', patela: '(não é músculo: a rótula, sempre em linha)', triceps: 'triceps', biceps: 'biceps', deltoide: 'deltAnt, deltLat, deltPost (três formas)', trapezio: 'trapSuperior, trapMedio, trapInferior, romboides (quatro formas)', obliquos: 'obliquos', adutores: 'adutores', tibial: '(não há no guia de hoje)', antebraco: 'antebraco' };
for (const [id, vs] of Object.entries(onde)) md += `| ${id} | ${[...vs].join(', ')} | ${HOJE[id] ?? ''} |\n`;
md += `\nO que o guia de hoje desenha e o desenho novo ainda não tem como forma própria: as três porções do deltoide, o peitoral clavicular, as três porções do trapézio e os romboides, o redondo maior e os eretores da espinha. Enquanto não houver, a porção vira a forma inteira (está listado nas decisões de proposta.md).\n\n`;
/* ----- objetos ----- */
const o = le('objetos.json');
md += `## Objetos\n\n| objeto | medida | valor | tipo | fonte | onde na fonte |\n|---|---|---|---|---|---|\n`;
for (const [id, ob] of Object.entries(o.objetos)) for (const [k, m] of Object.entries(ob.medidas)) md += `| ${cel(ob.nome)} (\`${id}\`) | \`${k}\` | ${n(m.v)} ${m.un} | ${NOME_TIPO[m.tipo] ?? m.tipo} | ${cel(m.fonte)} | ${cel(m.onde)} |\n`;
md += `\nFontes dos objetos:\n\n${Object.entries(o.fontes).map(([k, v]) => `- \`${k}\`: ${v}`).join('\n')}\n\n`;
/* ----- fichas de movimento ----- */
md += `## Fichas de movimento\n\nUma por exercício refeito, em \`${D}/movimentos/\`. Selos: robusta, moderada, um estudo, consenso (de treinadores) e desenho (escolha de desenho dentro do que a ficha da técnica pede).\n\n`;
for (const arq of readdirSync(`${D}/movimentos`).sort()) {
  const f = le(`movimentos/${arq}`);
  md += `### ${f.nome} (\`${f.id}\`)\n\nFicha da técnica: \`${f.fichaDaTecnica}\`. ${f.simetrico ? 'Movimento simétrico (os dois lados fazem o mesmo).' : 'Movimento de um lado só.'}\n\n| parâmetro | valor | selo | fonte | o que é |\n|---|---|---|---|---|\n`;
  for (const [k, p] of Object.entries(f.param)) md += `| \`${k}\` | ${n(p.v)} ${p.un} | ${p.selo} | ${cel(p.fonte)} | ${cel(p.o)} |\n`;
  md += `\n| fase | tipo | duração | respiração | ritmo | selo |\n|---|---|---|---|---|---|\n`;
  for (const x of f.fases) md += `| ${cel(x.nome)} | ${x.tipo} | ${n(x.dur)} s | ${cel(x.respira).toLowerCase()} | ${cel(x.tempo)} | ${x.selo} |\n`;
  md += `\nContatos que não podem sair do lugar: ${f.contatos.map((c) => `\`${c}\``).join(', ') || 'nenhum'}.\n\nRegras que a conferência mede:\n\n${f.regras.map((r) => `- ${cel(r.pede)} (${r.selo})`).join('\n')}\n\nErros desenhados:\n\n${f.erros.map((e) => `- ${cel(e.titulo)} (vista: ${e.vista}): ${cel(e.oQueMuda)}`).join('\n')}\n\nFontes desta ficha:\n\n${Object.entries(f.fontes).map(([k, v]) => `- \`${k}\`: ${v}`).join('\n')}\n\n`;
}
writeFileSync('docs/revisoes/animacao-nova/tabelas.md', md);
console.log(`tabelas.md: ${md.split('\n').length} linhas`);

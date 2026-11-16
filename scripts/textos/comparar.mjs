// Compara a medida de antes dos cortes (docs/revisoes/textos/inventario/colheita.json) com a medição de agora
// (docs/revisoes/textos/depois/colheita.json), tela por tela, com a mesma régua.
//
//   node scripts/textos/comparar.mjs            → grava docs/revisoes/textos/depois/comparacao.md
//
// A tela é reconhecida pelo fluxo e pelo nome (o número da ordem pode mudar quando entra ou sai uma tela). "Blocos de
// 15 ou mais" são os textos corridos (fora botões, opções e títulos) com 15 palavras ou mais: a meta desta sessão; a
// régua de 13/11 contava a partir de 25.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ler = (pasta) => JSON.parse(readFileSync(resolve(pasta, 'colheita.json'), 'utf8'));
const antes = ler('docs/revisoes/textos/inventario');
const depois = ler('docs/revisoes/textos/depois');
const chave = (t) => `${t.fluxo}/${t.id.split('/')[1].replace(/^\d+-/, '')}`;
const CONTROLE = new Set(['button', 'link', 'tab', 'radio', 'checkbox', 'option', 'heading', 'menuitem']);
const corridos = (t, n) => (t.blocos ?? []).filter((b) => b.palavras >= n && !CONTROLE.has(b.papel) && !['summary', 'legend', 'label'].includes(b.tag)).length;
const mapa = (c) => new Map(c.telas.map((t) => [chave(t), t]));
const [A, D] = [mapa(antes), mapa(depois)];
const soma = (xs, f) => xs.reduce((a, x) => a + f(x), 0);
const pct = (a, d) => (a ? `${d - a <= 0 ? '−' : '+'}${Math.abs(Math.round((100 * (d - a)) / a))}%` : '');
const tabela = (cab, ls) => [`| ${cab.join(' | ')} |`, `|${cab.map(() => '---').join('|')}|`, ...ls.map((l) => `| ${l.join(' | ')} |`)].join('\n');

const fluxos = [...new Set(antes.telas.map((t) => t.fluxo))];
const md = ['# Antes e depois dos cortes: palavras por tela', ''];
md.push(`> Gerado por \`scripts/textos/comparar.mjs\`. Antes: ${antes.versaoDoApp ?? '?'} (${antes.geradoEm?.slice(0, 10)}). Depois: ${depois.versaoDoApp ?? '?'} (${depois.geradoEm?.slice(0, 10)}). Só entram na conta as telas que existem nas duas medições.`, '');
const linhasFluxo = [];
const porFluxo = {};
for (const f of fluxos) {
  const pares = [...A.entries()].filter(([k, t]) => t.fluxo === f && D.has(k)).map(([k, t]) => [t, D.get(k)]);
  porFluxo[f] = pares;
  const a = soma(pares, ([x]) => x.palavrasNaTela);
  const d = soma(pares, ([, y]) => y.palavrasNaTela);
  linhasFluxo.push([f, pares.length, a, d, pct(a, d), soma(pares, ([x]) => corridos(x, 15)), soma(pares, ([, y]) => corridos(y, 15)), soma(pares, ([x]) => x.selos ?? 0), soma(pares, ([, y]) => y.selos ?? 0)]);
}
const tot = (i) => soma(linhasFluxo, (l) => l[i]);
linhasFluxo.push(['**Tudo**', tot(1), tot(2), tot(3), pct(tot(2), tot(3)), tot(5), tot(6), tot(7), tot(8)]);
md.push('## Por fluxo', '', tabela(['Fluxo', 'Telas', 'Palavras antes', 'Palavras depois', 'Mudança', 'Blocos de 15 ou mais, antes', 'Depois', 'Selos à vista, antes', 'Depois'], linhasFluxo), '');
for (const f of fluxos) {
  const mudou = porFluxo[f].filter(([x, y]) => x.palavrasNaTela !== y.palavrasNaTela).sort((p, q) => q[0].palavrasNaTela - q[1].palavrasNaTela - (p[0].palavrasNaTela - p[1].palavrasNaTela));
  if (!mudou.length) continue;
  md.push(`## ${f}: as ${mudou.length} telas que mudaram`, '', tabela(['Tela', 'Quem vê', 'Antes', 'Depois', 'Mudança'], mudou.map(([x, y]) => [x.titulo, x.persona, x.palavrasNaTela, y.palavrasNaTela, pct(x.palavrasNaTela, y.palavrasNaTela)])), '');
}
const soAntes = [...A.keys()].filter((k) => !D.has(k));
const soDepois = [...D.keys()].filter((k) => !A.has(k));
if (soAntes.length) md.push('## Telas que só existem na medida de antes', '', ...soAntes.map((k) => `- \`${k}\` ${A.get(k).titulo} (${A.get(k).palavrasNaTela} palavras)`), '');
if (soDepois.length) md.push('## Telas que só existem na medição de agora', '', ...soDepois.map((k) => `- \`${k}\` ${D.get(k).titulo} (${D.get(k).palavrasNaTela} palavras)`), '');
if (depois.falhas?.length) md.push('## Passos da colheita de agora que falharam', '', ...depois.falhas.map((x) => `- ${x}`), '');
writeFileSync('docs/revisoes/textos/depois/comparacao.md', md.join('\n'));
console.log(tabela(['Fluxo', 'Telas', 'Antes', 'Depois', 'Mudança'], linhasFluxo.map((l) => l.slice(0, 5))));
console.log(`só antes: ${soAntes.length} · só depois: ${soDepois.length} · falhas: ${depois.falhas?.length ?? 0}`);

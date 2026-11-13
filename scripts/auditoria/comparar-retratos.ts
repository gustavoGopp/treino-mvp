// Compara dois retratos (retrato.json de scripts/auditoria/retrato.ts): antes e depois de cada medida, na grade e na
// conta ponderada, e o pior grupo da régua oficial. Uso:
//   npx vite-node scripts/auditoria/comparar-retratos.ts -- <antes.json> <depois.json> [--tudo] [--grupos]
// Sem --tudo, só as medidas que mudam mais de 0,05 ponto. Com --grupos, a régua oficial por grupo (nenhum pode piorar).
import { readFileSync } from 'node:fs';
import { MEDIDAS, MEDIDA_IDS } from './cuidados';

type R = { n: Record<string, number>; w: Record<string, number> };
const args = process.argv.slice(2).filter((a) => a !== '--');
const [a, b] = [JSON.parse(readFileSync(args[0]!, 'utf8')) as R, JSON.parse(readFileSync(args[1]!, 'utf8')) as R];
const tudo = args.includes('--tudo');
const fr = (x: R, r: string, k: string, w = false) => {
  const s = w ? x.w : x.n;
  const d = s[`${r}|programas`] ?? 0;
  return d ? (s[`${r}|${k}`] ?? 0) / d : 0;
};
const pv = (x: number) => `${(Math.round(1000 * x) / 10).toFixed(1).replace('.', ',')}%`;
const num = (x: number) => (Math.round(x * 100) / 100).toFixed(2).replace('.', ',');
const REGUA = ['A2', 'A3', 'A4', 'B1', 'C1', 'D1', 'D3', 'E1', 'seguranca'];
const NOTAS = ['A1', 'A5', 'B2', 'B3', 'C2', 'G1'];
const L: string[] = [];
L.push('| medida | grade: antes | depois | ponderada: antes | depois |', '| --- | ---: | ---: | ---: | ---: |');
const linha = (nome: string, k: string, f: (x: number) => string = pv) => {
  const [g0, g1, w0, w1] = [fr(a, 'todos', k), fr(b, 'todos', k), fr(a, 'todos', k, true), fr(b, 'todos', k, true)];
  if (!tudo && Math.abs(g0 - g1) < 0.0005 && Math.abs(w0 - w1) < 0.0005) return;
  L.push(`| ${nome} | ${f(g0)} | ${f(g1)} | ${f(w0)} | ${f(w1)} |`);
};
linha('**régua oficial: programas sem nenhum defeito**', 'reguaSemDefeito');
for (const k of REGUA) linha(`régua, defeito ${k}`, `r:${k}`);
for (const k of NOTAS) linha(`régua, nota ${k}`, `r:${k}`);
linha('**os 20 cuidados: programas sem nenhum defeito**', 'semDefeito');
for (const k of MEDIDA_IDS) linha(`\`${k}\` ${MEDIDAS[k].nome} (${MEDIDAS[k].tipo})`, `m:${k}`);
linha('uso do tempo (dia típico ÷ minutos pedidos)', 'uso');
linha('séries por semana (média)', 'series', num);
linha('séries por músculo por semana (média, fora o abdômen)', 'mediaPorMusculo', num);
linha('exercícios diferentes por semana (média)', 'distintos', num);
console.log(L.join('\n'));

if (args.includes('--grupos')) {
  const recortes = [...new Set(Object.keys(a.n).map((k) => k.split('|')[0]!))].filter((r) => /^(grupo|nivel|min|dias|foco|dor):/.test(r)).sort((x, y) => x.localeCompare(y, 'pt', { numeric: true }));
  const G: string[] = ['', '| grupo | régua sem defeito: antes | depois | defeitos que pioram no grupo (antes → depois) |', '| --- | ---: | ---: | --- |'];
  let pior = { r: '', x: 2 };
  let piorAntes = { r: '', x: 2 };
  for (const r of recortes) {
    const [x0, x1] = [fr(a, r, 'reguaSemDefeito'), fr(b, r, 'reguaSemDefeito')];
    if (x1 < pior.x) pior = { r, x: x1 };
    if (x0 < piorAntes.x) piorAntes = { r, x: x0 };
    const pioram = REGUA.filter((k) => fr(b, r, `r:${k}`) > fr(a, r, `r:${k}`) + 0.0005).map((k) => `${k} ${pv(fr(a, r, `r:${k}`))} → ${pv(fr(b, r, `r:${k}`))}`);
    G.push(`| ${r} | ${pv(x0)} | ${pv(x1)} | ${pioram.join('; ') || '—'} |`);
  }
  G.push('', `Pior grupo antes: ${piorAntes.r} (${pv(piorAntes.x)}). Pior grupo depois: ${pior.r} (${pv(pior.x)}).`);
  console.log(G.join('\n'));
}

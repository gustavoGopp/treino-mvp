// Agente 4 (redesign): quais itens da taxonomia não têm desenho em src/features/onboarding/icones.tsx, e em que ordem
// desenhá-los. A ordem vem de (1) quantas vezes os exercícios que dependem do item foram prescritos no teste de
// estresse (coluna "vaga" de docs/revisoes/auditoria/inventario.md, 149.760 programas) e (2) em quais atalhos do cadastro
// o item aparece (academia, condomínio, casa). Nada aqui é opinião: são contagens dos arquivos do projeto.
// Uso: node scripts/design/redesign/agente-4/icones-frequencia.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const raiz = new URL('../../../../', import.meta.url).pathname;
const ler = (p) => readFileSync(join(raiz, p), 'utf8');

// Itens da taxonomia (ids e nomes), lidos do fonte.
const eq = ler('src/domain/taxonomia/equipamentos.ts');
const itens = [...eq.matchAll(/^\s{2}([a-z_]+): \{ nome: '([^']+)', categoria: '([a-z]+)' \}/gm)].map((m) => ({ id: m[1], nome: m[2], categoria: m[3] }));
// Ícones existentes.
const ic = ler('src/features/onboarding/icones.tsx');
const comIcone = new Set([...ic.matchAll(/^\s{2}([a-z_]+): \($/gm)].map((m) => m[1]));
// Capacidade → itens que a dão (lido das linhas de CAPACIDADES).
const capLinhas = eq.slice(eq.indexOf('export const CAPACIDADES'), eq.indexOf('export type Capacidade'));
const capacidades = {};
for (const m of capLinhas.matchAll(/^\s{2}([a-z_]+): \((?:i: Inventario)?\) =>([\s\S]*?)(?=\n\s{2}[a-z_]+: \(|\n\} as const)/gm)) {
  const corpo = m[2];
  const ids = new Set([...corpo.matchAll(/(?:tem\(i, '|!!i\.|i\.)([a-z_]+)/g)].map((x) => x[1]).filter((x) => itens.some((t) => t.id === x)));
  // estacao(i,'puxador') etc. vêm do multifuncional
  if (/estacao\(i,/.test(corpo)) ids.add('multifuncional');
  capacidades[m[1]] = [...ids];
}
// Biblioteca: cada exercício pede grupos de capacidades (OU de E).
const bib = JSON.parse(ler('src/domain/biblioteca/exercicios.json'));
// Frequência ("vaga") por exercício, do inventário da auditoria.
const inv = ler('docs/revisoes/auditoria/inventario.md');
const vaga = {};
const alt = {};
for (const m of inv.matchAll(/^\| \d+ \| \*\*[^*]+\*\* `([a-z0-9-]+)` \|(?:[^|]*\|){8}\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|/gm)) {
  vaga[m[1]] = Number(m[2].replace(/\./g, ''));
  alt[m[1]] = Number(m[3].replace(/\./g, ''));
}
// Atalhos.
const at = ler('src/domain/taxonomia/atalhos.ts');
const blocoDe = (id) => {
  const i = at.indexOf(`id: '${id}'`);
  const j = at.indexOf('\n  },', i);
  return at.slice(i, j);
};
const emAtalho = {};
for (const a of ['casa', 'condominio', 'academia']) {
  const b = blocoDe(a);
  const marca = [...(b.match(/marca: \[([\s\S]*?)\]/)?.[1] ?? '').matchAll(/'([a-z_]+)'/g)].map((x) => x[1]);
  const asVezes = [...(b.match(/asVezes: \[([\s\S]*?)\]/)?.[1] ?? '').matchAll(/'([a-z_]+)'/g)].map((x) => x[1]);
  emAtalho[a] = { marca, asVezes };
}

// Para cada item: soma das vagas dos exercícios em que o item serve a algum grupo de capacidades (contado uma vez por exercício).
const linhas = itens.map((it) => {
  let soma = 0, somaAlt = 0, n = 0;
  const exs = [];
  for (const e of bib) {
    const serve = e.requer.some((grupo) => grupo.some((cap) => (capacidades[cap] ?? []).includes(it.id)));
    if (!serve) continue;
    n++;
    soma += vaga[e.id] ?? 0;
    somaAlt += alt[e.id] ?? 0;
    exs.push({ id: e.id, vaga: vaga[e.id] ?? 0, animacao: !!e.animacaoId });
  }
  exs.sort((a, b) => b.vaga - a.vaga);
  const atalhos = ['academia', 'condominio', 'casa'].filter((a) => emAtalho[a].marca.includes(it.id)).map((a) => a);
  const asVezes = ['academia', 'condominio', 'casa'].filter((a) => emAtalho[a].asVezes.includes(it.id));
  return { ...it, temIcone: comIcone.has(it.id), exercicios: n, vagas: soma, alternativas: somaAlt, atalhos, asVezes, top: exs.slice(0, 3) };
});
const semIcone = linhas.filter((l) => !l.temIcone).sort((a, b) => b.vagas - a.vagas);
const saida = { geradoEm: new Date().toISOString(), itens: itens.length, comIcone: comIcone.size, semIcone: semIcone.length, exerciciosNaBiblioteca: bib.length, exerciciosComVaga: Object.keys(vaga).length, lista: semIcone, todos: linhas };
writeFileSync(join(raiz, 'reports/design/redesign/agente-4/icones-frequencia.json'), JSON.stringify(saida, null, 1) + '\n');
console.log(`Itens: ${itens.length}; com desenho: ${comIcone.size}; sem desenho: ${semIcone.length}. Biblioteca: ${bib.length} exercícios; com frequência: ${Object.keys(vaga).length}.`);
console.log('\n| # | item | categoria | exercícios | vagas (estresse) | alternativas | atalho que marca | às vezes tem | exercício mais prescrito |');
console.log('|---:|---|---|---:|---:|---:|---|---|---|');
semIcone.forEach((l, i) =>
  console.log(`| ${i + 1} | ${l.nome} \`${l.id}\` | ${l.categoria} | ${l.exercicios} | ${l.vagas.toLocaleString('pt-BR')} | ${l.alternativas.toLocaleString('pt-BR')} | ${l.atalhos.join(', ') || '—'} | ${l.asVezes.join(', ') || '—'} | ${l.top[0] ? `${l.top[0].id} (${l.top[0].vaga.toLocaleString('pt-BR')})` : '—'} |`),
);
console.log('\nCom desenho (ordem de vagas):');
console.log(linhas.filter((l) => l.temIcone).sort((a, b) => b.vagas - a.vagas).map((l) => `${l.id}=${l.vagas.toLocaleString('pt-BR')}`).join(' · '));

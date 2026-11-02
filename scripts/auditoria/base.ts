// Inventário dos 102 exercícios e mapa da cobertura (auditoria do treino, Parte A). Uso: npm run auditoria:base
// Lê a frequência de docs/revisoes/auditoria/estresse.json (rode o estresse antes). Gera inventario.md e cobertura.md.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { BIBLIOTECA, MUSCULOS, type Exercicio, type Musculo } from '../../src/domain/biblioteca';
import { NOME_MUSCULO } from '../../src/domain/gerador';
import { FUNCOES } from '../../src/domain/gerador/funcoes';
import { CARTOES, CONTEUDO } from '../../src/conteudo';
import { capacidades, NOME_CAPACIDADE, type Capacidade } from '../../src/domain/taxonomia/equipamentos';
import { CENARIOS } from './cenarios';
import { articulacoesEsperadas } from './articulacoes';

const SAIDA = 'docs/revisoes/auditoria';
const est = JSON.parse(readFileSync(`${SAIDA}/estresse.json`, 'utf8')) as {
  grade: { programas: number };
  escolha: { usosComoVaga: Record<string, number>; usosComoAlternativa: Record<string, number> };
};
const vaga = est.escolha.usosComoVaga;
const alt = est.escolha.usosComoAlternativa;

const GUIAS_IDS = new Set(Object.keys(CONTEUDO));
const CARTOES_IDS = new Set(Object.keys(CARTOES));
const NIVEL_MIN = ['', 'iniciante', 'iniciante', 'intermediário'];
const req = (e: Exercicio) => e.requer.map((g) => g.map((c) => NOME_CAPACIDADE[c as Capacidade]).join(' + ')).join(' ou ');
const funcoes = (e: Exercicio) =>
  FUNCOES.flatMap((f) => {
    const n = f.niveis.findIndex((ids) => ids.includes(e.id));
    return n < 0 ? [] : [`${f.id} (nível ${n + 1}${f.obrigatoria ? ', obrigatória' : ''})`];
  }).join('; ');
const guia = (e: Exercicio) => (e.animacaoId && GUIAS_IDS.has(e.animacaoId) ? 'animação' : CARTOES_IDS.has(e.id) ? 'cartão de texto' : '**nada**');
const fonte = (e: Exercicio) => {
  const ficha = [e.id, e.animacaoId].find((x) => x && existsSync(`docs/pesquisa/animacoes/${x}.md`));
  if (ficha) return `\`animacoes/${ficha}.md\``;
  if (e.animacaoId) return 'guia original + `pesquisa/08-tecnica-guia.md`';
  return '—';
};
const dor = (e: Exercicio) => (e.articulacoes.length ? `sai com dor > 5 em ${e.articulacoes.join(', ')}` : 'nenhuma região');
const faltando = (e: Exercicio) => articulacoesEsperadas(e).filter((a) => !e.articulacoes.includes(a));
const mil = (n: number | undefined) => (n ?? 0).toLocaleString('pt-BR');

// Coerência entre o tipo de carga e o equipamento que o exercício pede (afeta como a carga sobe).
const coerencia = (e: Exercicio): string[] => {
  const x: string[] = [];
  if (e.carga === 'halter' && e.requer.some((g) => !g.includes('halteres'))) x.push('carga "halter", mas dá para fazer sem halter');
  if (e.carga === 'barra' && e.requer.some((g) => !g.some((c) => c === 'barra_longa' || c === 'barra_w' || c === 'barra_hexagonal'))) x.push('carga "barra", mas há uma versão sem barra');
  return x;
};

// ---------- inventário ----------
const ordem = [...BIBLIOTECA].sort((a, b) => (vaga[b.id] ?? 0) - (vaga[a.id] ?? 0) || a.id.localeCompare(b.id));
const L: string[] = [
  '# Inventário dos 102 exercícios (auditoria do treino)',
  '',
  `> Gerado por \`npm run auditoria:base\`. A frequência vem do teste de estresse (${mil(est.grade.programas)} programas fictícios): "vaga" = quantas vezes o exercício foi prescrito; "alternativa" = quantas vezes apareceu na lista de trocas. Ordem: do mais prescrito ao menos. Não editar à mão.`,
  '',
  '**Como ler:** "nível mínimo" vem da complexidade (1–2 = iniciante; 3 = intermediário). Com dor de hoje acima de 5 na região, o exercício sai; de 3 a 5, perde o desempate para um equivalente que poupe a região. "Falta marcar" é a articulação que o padrão de movimento carrega e o dado não marca (`scripts/auditoria/articulacoes.ts`, opinião).',
  '',
  '| # | exercício | funções (nível) | equipamento | principal / secundários | nível mínimo | articulações | falta marcar | guia | fonte da técnica | vaga | alternativa | observação |',
  '| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | ---: | --- |',
];
ordem.forEach((e, i) =>
  L.push(
    `| ${i + 1} | **${e.nome}** \`${e.id}\` | ${funcoes(e)} | ${req(e)} | ${e.musculos.primarios.map((m) => NOME_MUSCULO[m]).join(', ')} / ${e.musculos.secundarios.map((m) => NOME_MUSCULO[m]).join(', ') || '—'} | ${NIVEL_MIN[e.complexidade]} | ${dor(e)} | ${faltando(e).join(', ') || '—'} | ${guia(e)} | ${fonte(e)} | ${mil(vaga[e.id])} | ${mil(alt[e.id])} | ${coerencia(e).join('; ') || ''} |`,
  ),
);
const semGuia = BIBLIOTECA.filter((e) => guia(e) === '**nada**');
const semGuiaVagas = semGuia.reduce((t, e) => t + (vaga[e.id] ?? 0), 0);
const total = Object.values(vaga).reduce((t, n) => t + n, 0);
L.push(
  '',
  '## Resumo',
  '',
  `- Com animação: ${BIBLIOTECA.filter((e) => guia(e) === 'animação').length}; com cartão de texto: ${BIBLIOTECA.filter((e) => guia(e) === 'cartão de texto').length}; **sem guia nenhum: ${semGuia.length}**.`,
  `- Das ${mil(total)} prescrições do teste, **${mil(semGuiaVagas)} (${Math.round((100 * semGuiaVagas) / total)}%)** são de exercícios sem guia nenhum.`,
  `- Os 10 sem guia mais prescritos: ${[...semGuia]
    .sort((a, b) => (vaga[b.id] ?? 0) - (vaga[a.id] ?? 0))
    .slice(0, 10)
    .map((e) => `${e.nome} (${mil(vaga[e.id])})`)
    .join('; ')}.`,
  `- Articulação faltando pelo padrão de movimento: ${BIBLIOTECA.filter((e) => faltando(e).length).length} exercícios (${BIBLIOTECA.filter((e) => faltando(e).length)
    .map((e) => `${e.id}: ${faltando(e).join('+')}`)
    .join('; ')}).`,
  `- Carga incoerente com o equipamento: ${BIBLIOTECA.filter((e) => coerencia(e).length)
    .map((e) => `${e.id} (${coerencia(e).join('; ')})`)
    .join('; ')}.`,
  '',
);
writeFileSync(`${SAIDA}/inventario.md`, L.join('\n'));

// ---------- cobertura ----------
const C: string[] = [
  '# Mapa da cobertura (auditoria do treino)',
  '',
  '> Gerado por `npm run auditoria:base`. Quantos exercícios são possíveis em cada cenário fictício (`scripts/auditoria/cenarios.ts`), para o nível avançado (sem limite de complexidade) e sem dor. **0** = nenhum; **1** = depende de um exercício só.',
  '',
  '## Por músculo (exercícios com o músculo como principal)',
  '',
];
const possiveis = (inv: (typeof CENARIOS)[number]['inventario']) => {
  const caps = capacidades(inv);
  return BIBLIOTECA.filter((e) => e.requer.some((g) => g.every((c) => caps.has(c))));
};
const marca = (n: number) => (n === 0 ? '**0**' : n === 1 ? '**1**' : String(n));
const musculos = MUSCULOS.filter((m) => m !== 'ombro_anterior') as Musculo[];
C.push(`| cenário | ${musculos.map((m) => NOME_MUSCULO[m]).join(' | ')} |`, `| --- | ${musculos.map(() => '---:').join(' | ')} |`);
for (const cen of CENARIOS) {
  const p = possiveis(cen.inventario);
  C.push(`| ${cen.id} | ${musculos.map((m) => marca(p.filter((e) => e.musculos.primarios.includes(m)).length)).join(' | ')} |`);
}
C.push('', '## Por função (a vaga do gerador)', '', 'Quantos exercícios da função são possíveis (somando os níveis).', '');
C.push(`| cenário | ${FUNCOES.map((f) => f.id).join(' | ')} |`, `| --- | ${FUNCOES.map(() => '---:').join(' | ')} |`);
for (const cen of CENARIOS) {
  const ids = new Set(possiveis(cen.inventario).map((e) => e.id));
  C.push(`| ${cen.id} | ${FUNCOES.map((f) => marca(f.niveis.flat().filter((id) => ids.has(id)).length)).join(' | ')} |`);
}
C.push('', '## Cenários', '');
for (const cen of CENARIOS) C.push(`- **${cen.id}**: ${cen.nome}.`);
C.push('');
writeFileSync(`${SAIDA}/cobertura.md`, C.join('\n'));
console.log(`inventário: ${BIBLIOTECA.length} exercícios; sem guia: ${semGuia.length} (${Math.round((100 * semGuiaVagas) / total)}% das prescrições)`);

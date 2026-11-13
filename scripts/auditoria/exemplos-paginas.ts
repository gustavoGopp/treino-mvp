// Escreve as páginas das doze pessoas-exemplo (docs/revisoes/treino-para-todos/exemplos/), em linguagem simples: quem é,
// a semana de hoje ao lado da proposta, o que mudou e por quê, e o que os revisores disseram das duas.
// Uso: npx vite-node scripts/auditoria/exemplos-paginas.ts -- --semanas <semanas.json> --cega <resultado.json> --saida <pasta>
// O texto de "o que mudou e por quê" de cada pessoa é escrito à mão em <pasta>/comentarios.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const arg = (k: string) => args[args.indexOf(k) + 1]!;
type Semana = { divisao: string; dias: { nome: string; minutos: number; linhas: string[] }[]; series: Record<string, number>; totalSeries: number; totalMin: number; exercicios: number; avisos: string[] };
type Pessoa = { id: string; nome: string; descricao: string; hoje: Semana; nova: Semana };
type Cega = { porPessoa: Record<string, { hoje: number[]; proposta: number[] }>; txt: Record<string, [string, string]> };
type Comentario = { resumo: string[]; mudou: string[]; semSolucao: string[] };

const pessoas = JSON.parse(readFileSync(arg('--semanas'), 'utf8')) as Pessoa[];
const cega = JSON.parse(readFileSync(arg('--cega'), 'utf8')) as Cega;
const saida = arg('--saida');
const comentarios = JSON.parse(readFileSync(join(saida, 'comentarios.json'), 'utf8')) as Record<string, Comentario>;
const fmt = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');
/** "3 × 8 a 12 · Supino · parar com… · descanso… · em dupla…" → "3 × 8 a 12 · Supino (em dupla com…)". */
const curta = (l: string) => {
  const [series, nome, , , ...extra] = l.split(' · ');
  const marcas = extra.map((e) => (e.startsWith('em dupla com') ? e.replace(', sem descanso entre os dois', '') : e.includes('drop set') ? 'drop set na última série' : e));
  return `${series} · ${nome}${marcas.length ? ` *(${marcas.join('; ')})*` : ''}`;
};

const indice: string[] = ['# As doze pessoas: a semana de hoje ao lado da semana proposta', '', '> Sessão "treino para todos", etapa 1. Todas as pessoas são fictícias. A semana "proposta" sai de um protótipo (`scripts/auditoria/prototipo/`): nada mudou no app. As notas são de revisores no papel de treinadores, que não sabiam qual semana era a de hoje e qual a proposta (2ª rodada; `../revisao-cega/`). É opinião de treinador simulado, não evidência.', '', '| # | Pessoa | Quem é | Notas de hoje (eficiente, adequada, agradável) | Notas da proposta | O que mais mudou |', '| ---: | --- | --- | --- | --- | --- |'];
pessoas.forEach((p, i) => {
  const n = String(i + 1).padStart(2, '0');
  const arq = `${n}-${p.id}.md`;
  const c = comentarios[p.id];
  if (!c) throw new Error(`sem comentário para ${p.id}`);
  const notas = cega.porPessoa[p.id]!;
  const L: string[] = [`# ${i + 1}. ${p.nome}`, '', `**Quem é.** ${p.descricao}`, '', '## Em resumo', '', ...c.resumo.map((x) => `- ${x}`), '', '## A semana, lado a lado', ''];
  const dias = Math.max(p.hoje.dias.length, p.nova.dias.length);
  for (let d = 0; d < dias; d++) {
    const [a, b] = [p.hoje.dias[d], p.nova.dias[d]];
    L.push(`| Hoje: ${a ? `${a.nome} (cerca de ${a.minutos} min)` : '—'} | Proposta: ${b ? `${b.nome} (cerca de ${b.minutos} min)` : '—'} |`, '| --- | --- |');
    const linhas = Math.max(a?.linhas.length ?? 0, b?.linhas.length ?? 0);
    for (let k = 0; k < linhas; k++) L.push(`| ${a?.linhas[k] ? curta(a.linhas[k]!) : ''} | ${b?.linhas[k] ? curta(b.linhas[k]!) : ''} |`);
    L.push('');
  }
  L.push('Como ler: "3 × 8 a 12" são 3 séries de 8 a 12 repetições. "Em dupla" é fazer um exercício logo depois do outro, sem descanso entre os dois.', '');
  L.push('## A semana em números', '', '| | Hoje | Proposta |', '| --- | ---: | ---: |');
  L.push(`| Minutos de treino na semana | ${p.hoje.totalMin} | ${p.nova.totalMin} |`, `| Séries na semana | ${p.hoje.totalSeries} | ${p.nova.totalSeries} |`, `| Exercícios diferentes | ${p.hoje.exercicios} | ${p.nova.exercicios} |`);
  for (const m of Object.keys(p.hoje.series)) L.push(`| Séries de ${m} | ${fmt(p.hoje.series[m]!)} | ${fmt(p.nova.series[m] ?? 0)} |`);
  L.push('', 'As séries por músculo contam 1 por série direta e meia por série indireta (a remada conta meia série para o bíceps).', '');
  L.push('## O que mudou e por quê', '', ...c.mudou.map((x) => `- ${x}`), '');
  L.push('## O que os treinadores disseram', '', '| | Eficiente | Adequada à pessoa | Agradável de fazer |', '| --- | ---: | ---: | ---: |');
  L.push(`| Hoje | ${notas.hoje.map(fmt).join(' | ')} |`, `| Proposta | ${notas.proposta.map(fmt).join(' | ')} |`, '', 'Notas de 1 a 10, média de 3 revisores que não sabiam qual semana era qual.', '');
  for (const [v, titulo] of [['hoje', 'Sobre a semana de hoje'], ['proposta', 'Sobre a semana proposta']] as const) {
    L.push(`**${titulo}:**`);
    for (const r of [1, 2, 3]) {
      const t = cega.txt[`${r}|${p.id}|${v}`];
      if (t) L.push(`- Revisor ${r}: ${t[0]} *O que mudaria:* ${t[1]}`);
    }
    L.push('');
  }
  L.push('## O que continua sem solução', '', ...c.semSolucao.map((x) => `- ${x}`), '');
  if (p.nova.avisos.length) L.push('## O que o app avisa (na proposta)', '', ...p.nova.avisos.map((x) => `- ${x}`), '');
  writeFileSync(join(saida, arq), L.join('\n'));
  indice.push(`| ${i + 1} | [${p.nome}](${arq}) | ${p.descricao} | ${notas.hoje.map(fmt).join(' · ')} | ${notas.proposta.map(fmt).join(' · ')} | ${c.resumo[0]} |`);
});
indice.push('');
writeFileSync(join(saida, 'README.md'), indice.join('\n'));
console.log(`${pessoas.length} páginas em ${saida}`);

// As medidas do R5b, "o avaliador e o porquê" (07/11/2026). Uso: npx vite-node scripts/auditoria/r5b.ts
// Escreve docs/revisoes/r5b/medidas.md. Determinístico; só dados fictícios (a grade reduzida, as 6 personas e os
// programas publicados de tests/publicados). Os números "antes" das 3 correções do gerador foram medidos com o
// mesmo script de defeitos no commit be2353e e estão no texto de docs/revisoes/r5b/README.md.
import { mkdirSync, writeFileSync } from 'node:fs';
import { avaliar, avisadoPeloGerador, textoDaAvaliacao, TIPOS_AVISADOS_PELO_AVALIADOR } from '../../src/domain/avaliador';
import { COMPLEMENTOS } from '../../src/domain/avaliador/complementos';
import { POR_ID } from '../../src/domain/biblioteca';
import { contextoDeSelecao, gerarPrograma, MUSCULOS_COM_META, seriesDeVolume, volumePorMusculo, type Perfil, type Programa } from '../../src/domain/gerador';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { planejadoDoMusculo } from '../../src/domain/acompanhamento/semana';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { PERSONAS } from '../../tests/personas';
import { inventarioDosPublicados, perfilDosPublicados, PUBLICADOS } from '../../tests/publicados';
import { grade, perfil as perfilDaGrade } from './cenarios';
import { gradeReduzida } from './grade-reduzida';

const L: string[] = [];
const pct = (n: number, d: number) => `${String(d ? Math.round((1000 * n) / d) / 10 : 0).replace('.', ',')}%`;
const n = (x: number) => x.toLocaleString('pt-BR');
const ok = (p: Perfil, inv: Inventario): Programa | null => {
  const g = gerarPrograma(p, inv);
  return g.status === 'ok' ? g.programa : null;
};

L.push(
  '# Medidas do R5b: o avaliador e o porquê',
  '',
  '> Gerado por `npx vite-node scripts/auditoria/r5b.ts`. Dados fictícios. Não editar à mão. O contexto e as decisões estão em `README.md`, nesta pasta.',
  '',
);

// ---------- 1. o avaliador na grade reduzida ----------
const reduzida = [...gradeReduzida()].map((c) => {
  const p = ok(c.perfil, c.inventario)!;
  return { ...c, p, a: avaliar(p, c.perfil, c.inventario) };
});
const veredito = (v: string) => reduzida.filter((c) => c.a.veredito === v).length;
const semAviso = reduzida.filter((c) => c.a.achados.some((x) => x.gravidade === 'ajustar' && !avisadoPeloGerador(x, c.p))).length;
L.push(
  '## 1. O avaliador na grade reduzida',
  '',
  `${n(reduzida.length)} programas: os 6 cenários comuns (academia, condomínio, casa, só o peso do corpo, só elásticos, halteres e banco) × 3 níveis × 2 a 6 dias × 30 a 90 min × 13 prioridades, sem dor (\`scripts/auditoria/grade-reduzida.ts\`).`,
  '',
  '| veredito | programas | % |',
  '| --- | ---: | ---: |',
  ...(['bom', 'limite', 'ajustar', 'bloqueado'] as const).map((v) => `| ${{ bom: 'está bom', limite: 'só limite', ajustar: 'dá para ajustar', bloqueado: 'bloqueado (segurança)' }[v]} | ${n(veredito(v))} | ${pct(veredito(v), reduzida.length)} |`),
  `| **está bom ou só limite** | **${n(veredito('bom') + veredito('limite'))}** | **${pct(veredito('bom') + veredito('limite'), reduzida.length)}** |`,
  `| com um "ajustar" que o gerador não avisa | ${n(semAviso)} | ${pct(semAviso, reduzida.length)} |`,
  '',
);
const porTipo = new Map<string, number>();
for (const c of reduzida) for (const k of new Set(c.a.achados.map((x) => `${x.gravidade} | \`${x.regraId}\` | ${x.tipo.split(':')[0]}`))) porTipo.set(k, (porTipo.get(k) ?? 0) + 1);
const ordemG = ['seguranca', 'alerta', 'ajustar', 'limite', 'info'];
L.push('| gravidade | regra | tipo | programas | % |', '| --- | --- | --- | ---: | ---: |');
for (const [k, v] of [...porTipo].sort((a, b) => ordemG.indexOf(a[0].split(' ')[0]!) - ordemG.indexOf(b[0].split(' ')[0]!) || b[1] - a[1] || a[0].localeCompare(b[0])))
  L.push(`| ${k} | ${n(v)} | ${pct(v, reduzida.length)} |`);
L.push('');
const porMin = [30, 45, 60, 75, 90].map((m) => {
  const xs = reduzida.filter((c) => c.minutos === m);
  return `| ${m} | ${pct(xs.filter((c) => c.a.veredito === 'bom' || c.a.veredito === 'limite').length, xs.length)} |`;
});
L.push('Por duração (está bom ou só limite):', '', '| minutos | % |', '| ---: | ---: |', ...porMin, '');

// ---------- 2. o que o gerador passou a avisar, e quanto 15 min a mais resolvem ----------
let doAvaliador = 0;
let resolvem = 0;
for (const c of reduzida) {
  const tipos = c.a.achados.filter((x) => x.gravidade === 'ajustar' && (TIPOS_AVISADOS_PELO_AVALIADOR as readonly string[]).includes(x.tipo.split(':')[0]!));
  for (const x of tipos) {
    doAvaliador++;
    if (c.minutos >= 90) continue;
    const pf = { ...c.perfil, minutosSessao: c.minutos + 15 };
    const p2 = ok(pf, c.inventario);
    if (p2 && !avaliar(p2, pf, c.inventario).achados.some((y) => y.tipo === x.tipo && y.regraId === x.regraId)) resolvem++;
  }
}
L.push(
  '## 2. Os avisos que o avaliador acrescenta ao programa gerado',
  '',
  `Uma função só num músculo grande, a coxa, empurrar ÷ puxar e o isolador que faltou: ${n(doAvaliador)} achados na grade reduzida. Com 15 min a mais por treino, o mesmo achado some em ${n(resolvem)} (${pct(resolvem, doAvaliador)}); é a base do "mais minutos por treino costumam resolver" do texto.`,
  '',
);

// ---------- 3. a decisão da flexão em duas vagas ----------
let mesmoExercicio = 0;
let semOutra = 0;
for (const c of reduzida) {
  const exs = c.p.dias.flatMap((d) => d.exercicios);
  const ctx = contextoDeSelecao(c.perfil, c.inventario);
  for (const comp of COMPLEMENTOS) {
    const grupoDaVaga = (f?: string) => comp.grupos.find((g) => f && g.funcoes.includes(f))?.id;
    const porVaga = new Set(exs.map((x) => grupoDaVaga(x.funcao)).filter(Boolean));
    const distintos = new Map<string, Set<string>>();
    for (const x of exs) {
      const g = grupoDaVaga(x.funcao);
      if (g) distintos.set(x.exId, new Set([...(distintos.get(x.exId) ?? []), g]));
    }
    if (porVaga.size >= 2 && distintos.size === 1) {
      mesmoExercicio++;
      const outras = ctx.possiveis.filter((e) => !distintos.has(e.id) && comp.grupos.some((g) => g.funcoes.some((f) => FUNCAO[f]!.niveis.flat().includes(e.id))));
      if (!outras.length) semOutra++;
    }
  }
}
L.push(
  '## 3. O mesmo exercício em duas vagas (a flexão, o supino reto, a remada)',
  '',
  `Músculos grandes cuja 2ª função vem do mesmo exercício em outra vaga: ${n(mesmoExercicio)} casos na grade reduzida; em ${n(semOutra)} deles (${pct(semOutra, mesmoExercicio)}) não há outro exercício possível para o músculo. Contar 1 função marcaria esses programas com "uma função só". A decisão (README.md): conta 2 quando é o exercício que a tabela de funções escolhe para a outra vaga com aquele equipamento.`,
  '',
);

// ---------- 4. as 3 correções do gerador (depois) ----------
const amostra: { pf: Perfil; inv: Inventario }[] = [...reduzida.map((c) => ({ pf: c.perfil, inv: c.inventario }))];
for (const c of grade({ amostra: 20 })) amostra.push({ pf: perfilDaGrade({ nivel: c.nivel, divisao: c.divisao, minutos: c.minutos, prioridades: c.prioridade.grupos, dores: c.dor.dores }), inv: c.cenario.inventario });
let teto = 0;
let gluteo = 0;
let gluteoBase = 0;
let afundos = 0;
let total = 0;
const ext = new Set([...FUNCAO['extensao-quadril']!.niveis.flat(), ...FUNCAO['dobrar-quadril']!.niveis.flat()]);
for (const { pf, inv } of amostra) {
  const p = ok(pf, inv);
  if (!p) continue;
  total++;
  if (p.dias.some((d) => Object.values(volumePorMusculo(d.exercicios.map((x) => ({ ex: POR_ID[x.exId]!, series: seriesDeVolume(x) })))).some((v) => (v ?? 0) > 10))) teto++;
  const ponte = contextoDeSelecao(pf, inv).possiveis.some((e) => FUNCAO['extensao-quadril']!.niveis.flat().includes(e.id));
  if (ponte && !(pf.triagem.dores ?? []).length && pf.minutosSessao >= 30) {
    gluteoBase++;
    if (!p.dias.some((d) => d.exercicios.some((x) => ext.has(x.exId)))) gluteo++;
  }
  if (p.dias.some((d) => d.exercicios.some((x) => x.funcao === 'agachar' && POR_ID[x.exId]!.padrao === 'afundo') && d.exercicios.some((x) => x.funcao === 'afundo'))) afundos++;
}
L.push(
  '## 4. As 3 correções do gerador (depois)',
  '',
  `Grade reduzida mais 1 caso a cada 20 da grade de \`cenarios.ts\` (com dor): ${n(total)} programas.`,
  '',
  '| defeito | programas |',
  '| --- | ---: |',
  `| um dia com mais de 10 séries de um músculo, contando as indiretas pela metade | ${n(teto)} (${pct(teto, total)}) |`,
  `| glúteo sem extensão de quadril nem stiff, com a ponte possível (sem dor, 30 min ou mais) | ${n(gluteo)} de ${n(gluteoBase)} (${pct(gluteo, gluteoBase)}) |`,
  `| um dia com afundo na vaga de agachar e a vaga de afundo | ${n(afundos)} (${pct(afundos, total)}) |`,
  '',
);

// ---------- 5. as personas ----------
L.push('## 5. As 6 personas', '');
let avisos = 0;
let exercicios = 0;
let planejados = 0;
for (const [nome, pe] of Object.entries(PERSONAS)) {
  const p = ok(pe.perfil, pe.inventario)!;
  avisos += p.avisos.length;
  exercicios += p.dias.reduce((t, d) => t + d.exercicios.length, 0);
  planejados += MUSCULOS_COM_META.filter((m) => planejadoDoMusculo(p, m)).length;
  L.push(`### ${nome.charAt(0).toUpperCase() + nome.slice(1)}`, '', '```', textoDaAvaliacao(avaliar(p, pe.perfil, pe.inventario)), '```', '', 'Avisos do programa:', '', ...p.avisos.map((a) => `- [\`${a.regraId}\`] ${a.texto}`), '');
}
L.push(`Total: ${avisos} avisos, ${exercicios} exercícios (todos com o porquê específico), ${planejados} músculos com a meta do programa abaixo da do nível na Semana.`, '');

// ---------- 6. os programas publicados ----------
L.push('## 6. Os 4 programas publicados', '', 'Avaliados como a Carla (academia completa), intermediário, 60 min, sem foco. Fonte e escolhas de equipamento em `tests/publicados/index.ts`.', '');
for (const pub of PUBLICADOS) {
  L.push(`### ${pub.id} (\`${pub.fonte}\`, ${pub.onde})`, '', '```', textoDaAvaliacao(avaliar(pub.programa, perfilDosPublicados(pub.programa.dias.length), inventarioDosPublicados)), '```', '');
}

mkdirSync('docs/revisoes/r5b', { recursive: true });
writeFileSync('docs/revisoes/r5b/medidas.md', L.join('\n') + '\n');
console.log(`docs/revisoes/r5b/medidas.md: ${reduzida.length} programas na grade reduzida`);

// O avaliador (R5b) na grade reduzida da frente A (docs/revisoes/proximos-passos/a-qualidade.md): os 6 cenários comuns
// (academia, condomínio, casa, sem nada, só elásticos, halteres e banco) × 3 níveis × 2 a 6 dias (a divisão recomendada)
// × 30 a 90 min × 13 focos, sem dor: 5.850 programas. Uso:
//   npm run auditoria:avaliador                  (escreve docs/revisoes/qualidade/avaliador.{md,json})
//   npm run auditoria:avaliador -- --saida <pasta>
// Mede o veredito de cada programa, os achados por tipo e gravidade e os "ajustar" que o gerador não avisa.
// Determinístico (sem relógio nem sorteio). Só dados fictícios.
import { mkdirSync, writeFileSync } from 'node:fs';
import { avaliar, type Veredito } from '../../src/domain/avaliador';
import { gradeReduzida, naoAvisados } from './grade-reduzida';
import { MINUTOS_Q, PRIORIDADES_Q } from './qualidade-grade';

const args = process.argv.slice(2);
const SAIDA = args.includes('--saida') ? args[args.indexOf('--saida') + 1]! : 'docs/revisoes/qualidade';

function main() {
  const vereditos: Record<Veredito, number> = { bom: 0, limite: 0, ajustar: 0, bloqueado: 0 };
  const porTipo: Record<string, number> = {};
  const semAviso: Record<string, number> = {};
  const exemplos: Record<string, string> = {};
  const porCenario: Record<string, Record<Veredito, number>> = {};
  let n = 0;
  let comSemAviso = 0;
  for (const x of gradeReduzida()) {
    n++;
    const a = avaliar(x.p, x.pf, x.inv);
    vereditos[a.veredito]++;
    (porCenario[x.cen] ??= { bom: 0, limite: 0, ajustar: 0, bloqueado: 0 })[a.veredito]++;
    for (const k of new Set(a.achados.map((y) => `${y.gravidade} ${y.tipo}`))) porTipo[k] = (porTipo[k] ?? 0) + 1;
    const sa = naoAvisados(x.p, a.achados);
    if (sa.length) comSemAviso++;
    for (const y of sa) {
      const k = `${y.gravidade} ${y.tipo}`;
      semAviso[k] = (semAviso[k] ?? 0) + 1;
      exemplos[k] ??= `${x.cen} · ${x.pf.nivel} · ${x.pf.diasSemana} dias · ${x.pf.minutosSessao} min · foco ${x.pf.prioridades.join('+') || 'nenhum'}: ${y.texto} → ${y.passo}`;
    }
  }
  const pct = (k: number) => `${String(Math.round((1000 * k) / n) / 10).replace('.', ',')}%`;
  const L = [
    '# O avaliador na grade reduzida',
    '',
    '> Gerado por `npm run auditoria:avaliador` (`scripts/auditoria/avaliador.ts`). Dados fictícios. Não editar à mão.',
    '',
    `**${n.toLocaleString('pt-BR')} programas** do gerador: 6 cenários comuns × 3 níveis × 2 a 6 dias × ${MINUTOS_Q.join(', ')} min × ${PRIORIDADES_Q.length} focos, sem dor.`,
    '',
    '## Veredito',
    '',
    '| veredito | programas | % |',
    '| --- | ---: | ---: |',
    ...(['bom', 'limite', 'ajustar', 'bloqueado'] as Veredito[]).map((v) => `| ${v} | ${vereditos[v].toLocaleString('pt-BR')} | ${pct(vereditos[v])} |`),
    `| **está bom ou só limite** | **${(vereditos.bom + vereditos.limite).toLocaleString('pt-BR')}** | **${pct(vereditos.bom + vereditos.limite)}** |`,
    `| com um ajuste, alerta ou segurança que o gerador não avisa | ${comSemAviso.toLocaleString('pt-BR')} | ${pct(comSemAviso)} |`,
    '',
    '## Por cenário',
    '',
    '| cenário | bom | limite | ajustar | bloqueado |',
    '| --- | ---: | ---: | ---: | ---: |',
    ...Object.entries(porCenario).map(([c, v]) => `| ${c} | ${v.bom} | ${v.limite} | ${v.ajustar} | ${v.bloqueado} |`),
    '',
    '## Achados (programas com o achado)',
    '',
    '| gravidade e tipo | programas | % |',
    '| --- | ---: | ---: |',
    ...Object.entries(porTipo)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([k, v]) => `| ${k} | ${v.toLocaleString('pt-BR')} | ${pct(v)} |`),
    '',
    '## Sem aviso do gerador (o que a régua cobra)',
    '',
    ...(Object.keys(semAviso).length
      ? ['| gravidade e tipo | programas | exemplo |', '| --- | ---: | --- |', ...Object.entries(semAviso).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([k, v]) => `| ${k} | ${v} | ${exemplos[k]} |`)]
      : ['Nenhum.']),
    '',
  ];
  mkdirSync(SAIDA, { recursive: true });
  writeFileSync(`${SAIDA}/avaliador.md`, L.join('\n'));
  writeFileSync(`${SAIDA}/avaliador.json`, JSON.stringify({ programas: n, vereditos, comSemAviso, porTipo: ordenar(porTipo), semAviso: ordenar(semAviso), porCenario }, null, 1) + '\n');
  console.log(L.slice(6, 14).join('\n'));
  console.log(Object.entries(semAviso).map(([k, v]) => `${k}: ${v} — ${exemplos[k]}`).join('\n'));
}
const ordenar = (o: Record<string, number>) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));

main();

// Cuidado 18 (sessão "treino para todos"): uma mudança pequena no cadastro muda pouco o programa?
// Para cada perfil de base (55 cenários × 3 níveis × 2 a 6 dias × 30, 45, 60, 75 min × 3 focos, sem dor), gera o programa
// e o programa com uma perturbação: +15 min, um step a mais, ou elásticos a mais. Mede quanto dos exercícios da semana
// some (1 − os que ficam ÷ os de antes) e a fatia dos programas em que somem mais de 30% ("efeito dominó").
// Uso: npx vite-node scripts/auditoria/estabilidade.ts -- [--motor <módulo>] [--saida <arquivo.md>]
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { gerarPrograma as Gerar, Perfil, Programa } from '../../src/domain/gerador';
import { OPCOES_POR_DIAS } from '../../src/domain/gerador/divisoes';
import { NIVEIS } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { perfil, type Prioridade } from './cenarios';
import { CENARIOS_55 } from './cenarios-55';
import { DIAS_P, PESO_DIAS, PESO_MINUTOS, PESO_NIVEL, pesoDoCenario } from './populacao';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
const MOTOR = arg('--motor') ?? 'src/domain/gerador/index.ts';
const FOCOS: Prioridade[] = [
  { id: 'nenhum', grupos: [] },
  { id: 'gluteos', grupos: ['gluteos'] },
  { id: 'peito+costas', grupos: ['peito', 'costas'] },
];
const PESO_FOCO: Record<string, number> = { nenhum: 0.5, gluteos: 0.25, 'peito+costas': 0.25 };
const MINUTOS = [30, 45, 60, 75];

type Perturbacao = { id: string; nome: string; aplica: (pf: Perfil, inv: Inventario) => { pf: Perfil; inv: Inventario } | null };
const PERTURBACOES: Perturbacao[] = [
  { id: 'min', nome: '15 minutos a mais', aplica: (pf, inv) => ({ pf: { ...pf, minutosSessao: pf.minutosSessao + 15 }, inv }) },
  { id: 'step', nome: 'um step a mais', aplica: (pf, inv) => ('step' in inv ? null : { pf, inv: { ...inv, step: {} } }) },
  { id: 'elasticos', nome: 'elásticos a mais', aplica: (pf, inv) => ('elasticos' in inv ? null : { pf, inv: { ...inv, elasticos: { intensidades: 3 } } }) },
];

async function main() {
  const { gerarPrograma } = (await import(/* @vite-ignore */ resolve(MOTOR))) as { gerarPrograma: typeof Gerar };
  const ids = (p: Programa) => new Set(p.dias.flatMap((d) => d.exercicios.map((x) => x.exId)));
  const acc: Record<string, { n: number; w: number; some: number; someW: number; domino: number; dominoW: number; pior: { x: number; caso: string } }> = {};
  for (const cen of CENARIOS_55)
    for (const nivel of NIVEIS)
      for (const dias of DIAS_P)
        for (const minutos of MINUTOS)
          for (const foco of FOCOS) {
            const pf = perfil({ nivel, divisao: OPCOES_POR_DIAS[dias][0]!, minutos, prioridades: foco.grupos, dores: [] });
            delete pf.divisao;
            const base = gerarPrograma(pf, cen.inventario);
            if (base.status !== 'ok') continue;
            const e0 = ids(base.programa);
            const peso = pesoDoCenario(cen.id) * PESO_NIVEL[nivel] * PESO_DIAS[dias]! * PESO_MINUTOS[minutos]! * PESO_FOCO[foco.id]!;
            for (const pt of PERTURBACOES) {
              const novo = pt.aplica(pf, cen.inventario);
              if (!novo) continue;
              const r = gerarPrograma(novo.pf, novo.inv);
              if (r.status !== 'ok') continue;
              const e1 = ids(r.programa);
              const some = 1 - [...e0].filter((id) => e1.has(id)).length / e0.size;
              const a = (acc[pt.id] ??= { n: 0, w: 0, some: 0, someW: 0, domino: 0, dominoW: 0, pior: { x: -1, caso: '' } });
              a.n++;
              a.w += peso;
              a.some += some;
              a.someW += some * peso;
              if (some > 0.3) {
                a.domino++;
                a.dominoW += peso;
              }
              if (some > a.pior.x) a.pior = { x: some, caso: `${cen.id} · ${nivel} · ${dias} dias · ${minutos} min · foco ${foco.id}` };
            }
          }
  const pv = (x: number) => `${(Math.round(1000 * x) / 10).toFixed(1).replace('.', ',')}%`;
  const L = [
    '# Estabilidade: quanto o programa muda com uma mudança pequena no cadastro',
    '',
    `> Gerado por \`scripts/auditoria/estabilidade.ts\` (motor: \`${MOTOR}\`). Dados fictícios. "Somem": a fatia dos exercícios da semana que deixa de existir no programa novo. "Dominó": programas em que somem mais de 30%.`,
    '',
    '| mudança | programas | exercícios que somem (média): grade | ponderada | dominó: grade | ponderada | o pior caso |',
    '| --- | ---: | ---: | ---: | ---: | ---: | --- |',
    ...PERTURBACOES.map((pt) => {
      const a = acc[pt.id]!;
      return `| ${pt.nome} | ${a.n.toLocaleString('pt-BR')} | ${pv(a.some / a.n)} | ${pv(a.someW / a.w)} | ${pv(a.domino / a.n)} | ${pv(a.dominoW / a.w)} | ${a.pior.caso} (${pv(a.pior.x)}) |`;
    }),
    '',
  ];
  const saida = arg('--saida');
  if (saida) writeFileSync(saida, L.join('\n'));
  console.log(L.join('\n'));
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

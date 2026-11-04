// Mapa do catálogo de exercícios (sessão de catálogo completo, Parte B.1; docs/revisoes/catalogo-completo.md).
// Mede, com a biblioteca de hoje, o que existe e o que falta:
//   1. grade.md: músculo × padrão de movimento × nível × equipamento (quantos exercícios são possíveis; 0 e 1 marcados);
//   2. cenarios.md: em cada cenário (atalhos, vazio, cada item sozinho, pares de casa), as opções de cada vaga por nível;
//   3. monotonia.md: onde o gerador repete o mesmo exercício nos dias da semana, mesmo havendo outro equivalente.
// Determinístico: sem sorteio nem relógio nos arquivos; listas em ordem fixa. Os dados são fictícios.
// Para estimar o efeito de exercícios novos sem tocar no app, rode este script numa cópia de src/ com a biblioteca
// alterada e passe --saida <pasta> (é o que a lista de entrada da sessão faz).
import { mkdirSync, writeFileSync } from 'node:fs';
import { BIBLIOTECA, MUSCULOS, PADROES, POR_ID, type Exercicio, type Musculo, type Padrao } from '../../src/domain/biblioteca';
import { contextoDeSelecao, gerarPrograma, NOME_MUSCULO, type Programa } from '../../src/domain/gerador';
import { DIVISAO_IDS, DIVISOES, type DivisaoId } from '../../src/domain/gerador/divisoes';
import { FUNCOES } from '../../src/domain/gerador/funcoes';
import { NIVEIS, NIVEL_COMPLEXIDADE_MAX, type Nivel } from '../../src/domain/regras';
import { capacidades, type Inventario } from '../../src/domain/taxonomia/equipamentos';
import { CENARIOS, perfil } from './cenarios';
import { CENARIOS_MIN, chaveDaClasse } from './minimo-cenarios';

const arg = (k: string) => {
  const i = process.argv.indexOf(k);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const SAIDA = arg('--saida') ?? 'docs/revisoes/catalogo';
mkdirSync(SAIDA, { recursive: true });

type Cen = { id: string; nome: string; inventario: Inventario; grupo: 'atalho' | 'vazio' | 'item' | 'par' | 'persona' };
const ATALHOS_IDS = new Set(['casa', 'casa+', 'condominio', 'condominio+', 'academia', 'academia+']);
const todos: Cen[] = [
  ...CENARIOS.filter((c) => c.id !== 'peso-corpo').map((c) => ({ id: c.id, nome: c.nome, inventario: c.inventario, grupo: ATALHOS_IDS.has(c.id) ? ('atalho' as const) : ('persona' as const) })),
  ...CENARIOS_MIN.map((c) => ({ id: c.tipo === 'item' ? `so:${c.id}` : c.id, nome: c.nome, inventario: c.inventario, grupo: c.tipo })),
];
// Cenários que abrem exatamente os mesmos exercícios geram o mesmo programa: medidos uma vez (o 1º da lista representa).
const classes = new Map<string, Cen[]>();
for (const c of todos) {
  const k = chaveDaClasse(c.inventario);
  classes.set(k, [...(classes.get(k) ?? []), c]);
}
const REPRESENTANTES = [...classes.values()].map((cs) => cs[0]!);
const membros = (c: Cen) => classes.get(chaveDaClasse(c.inventario))!;

const possivel = (caps: Set<string>, e: Exercicio) => e.requer.some((g) => g.every((x) => caps.has(x)));
const noNivel = (e: Exercicio, n: Nivel) => e.complexidade <= NIVEL_COMPLEXIDADE_MAX[n];
const NOME_NIVEL: Record<Nivel, string> = { iniciante: 'iniciante', intermediario: 'intermediário', avancado: 'avançado' };
const marca = (n: number) => (n === 0 ? '**0**' : n === 1 ? '**1**' : String(n));
const pct = (n: number, d: number) => (d ? `${String(Math.round((1000 * n) / d) / 10).replace('.', ',')}%` : '—');

// ---------- 1. grade: músculo × padrão × nível × equipamento ----------
const COLUNAS: [string, string][] = [
  ['vazio', 'nada'],
  ['so:elasticos', 'elásticos'],
  ['so:halteres_fixos', 'halteres'],
  ['halteres', 'halteres 2–20 kg'],
  ['so:barra_fixa', 'barra fixa'],
  ['so:suspensao', 'suspensão'],
  ['so:kettlebell', 'kettlebell'],
  ['casa', 'casa'],
  ['casa+', 'casa+'],
  ['condominio', 'condomínio'],
  ['academia', 'academia'],
  ['academia+', 'academia+'],
];
const porId = new Map(todos.map((c) => [c.id, c]));
const linhasGrade: { musculo: Musculo; padrao: Padrao; celulas: Record<string, { iniciante: string[]; avancado: string[] }> }[] = [];
for (const m of MUSCULOS)
  for (const pd of PADROES) {
    const daLinha = BIBLIOTECA.filter((e) => e.padrao === pd && e.musculos.primarios.includes(m));
    if (!daLinha.length) continue;
    const celulas: (typeof linhasGrade)[number]['celulas'] = {};
    for (const [id] of COLUNAS) {
      const caps = capacidades(porId.get(id)!.inventario);
      const ok = daLinha.filter((e) => possivel(caps, e));
      celulas[id] = { iniciante: ok.filter((e) => noNivel(e, 'iniciante')).map((e) => e.id), avancado: ok.filter((e) => noNivel(e, 'avancado')).map((e) => e.id) };
    }
    celulas['biblioteca'] = { iniciante: daLinha.filter((e) => noNivel(e, 'iniciante')).map((e) => e.id), avancado: daLinha.map((e) => e.id) };
    linhasGrade.push({ musculo: m, padrao: pd, celulas });
  }
const soAvancado = BIBLIOTECA.filter((e) => !noNivel(e, 'iniciante'));
const md1: string[] = [
  '# Mapa do catálogo: músculo × padrão × nível × equipamento',
  '',
  '> Gerado por `npm run auditoria:catalogo` (`scripts/auditoria/catalogo.ts`) com a biblioteca de hoje. Dados fictícios; mesmo resultado a cada rodada.',
  '> Cada célula: exercícios possíveis com o músculo como **principal** naquele padrão, no formato `iniciante / intermediário e avançado`. **0** e **1** em negrito: nenhuma opção ou uma só (sem alternativa).',
  `> O nível vem só da complexidade (\`NIVEL_COMPLEXIDADE_MAX\`: iniciante até ${NIVEL_COMPLEXIDADE_MAX.iniciante}, intermediário até ${NIVEL_COMPLEXIDADE_MAX.intermediario}, avançado até ${NIVEL_COMPLEXIDADE_MAX.avancado}). **Intermediário e avançado veem as mesmas opções**: a biblioteca não tem nada só do avançado. Só ${soAvancado.length} dos ${BIBLIOTECA.length} exercícios ficam fora do iniciante (${soAvancado.map((e) => e.id).join(', ')}).`,
  '',
  `| Músculo | Padrão | ${COLUNAS.map(([, n]) => n).join(' | ')} | biblioteca toda |`,
  `|---|---|${COLUNAS.map(() => '---:').join('|')}|---:|`,
  ...linhasGrade.map(
    (l) =>
      `| ${NOME_MUSCULO[l.musculo]} | ${l.padrao} | ${[...COLUNAS.map(([id]) => id), 'biblioteca'].map((id) => `${marca(l.celulas[id]!.iniciante.length)} / ${marca(l.celulas[id]!.avancado.length)}`).join(' | ')} |`,
  ),
  '',
  '## Por músculo, somando os padrões (avançado)',
  `| Músculo | ${COLUNAS.map(([, n]) => n).join(' | ')} | biblioteca toda |`,
  `|---|${COLUNAS.map(() => '---:').join('|')}|---:|`,
  ...MUSCULOS.map((m) => {
    const ls = linhasGrade.filter((l) => l.musculo === m);
    return `| ${NOME_MUSCULO[m]} | ${[...COLUNAS.map(([id]) => id), 'biblioteca'].map((id) => marca(new Set(ls.flatMap((l) => l.celulas[id]!.avancado)).size)).join(' | ')} |`;
  }),
  '',
  '## Quais exercícios (biblioteca toda, por músculo e padrão)',
  ...linhasGrade.map((l) => `- **${NOME_MUSCULO[l.musculo]} · ${l.padrao}:** ${l.celulas['biblioteca']!.avancado.map((id) => `${id}${noNivel(POR_ID[id]!, 'iniciante') ? '' : ' (só intermediário+)'}`).join(', ')}`),
  '',
];
writeFileSync(`${SAIDA}/grade.md`, md1.join('\n'));

// ---------- 2. cenários: opções de cada vaga por nível ----------
type Vaga = { nivelDaFuncao: number | null; opcoes: string[]; via?: string };
const vagasDe = (c: Cen, nivel: Nivel): Record<string, Vaga> => {
  const ctx = contextoDeSelecao(perfil({ nivel, divisao: 'ct-abc', minutos: 60, prioridades: [], dores: [] }), c.inventario);
  return Object.fromEntries(
    FUNCOES.map((f) => {
      const r = ctx.resolver({ funcao: f.id });
      if (!r) return [f.id, { nivelDaFuncao: null, opcoes: [] }];
      if (r.funcao.id !== f.id) return [f.id, { nivelDaFuncao: null, opcoes: [], via: r.funcao.id }];
      const k = f.niveis.findIndex((ids) => ids.some((id) => ctx.naFuncao(f, id)));
      return [f.id, { nivelDaFuncao: k, opcoes: f.niveis[k]!.filter((id) => ctx.naFuncao(f, id)) }];
    }),
  );
};
const cen = REPRESENTANTES.map((c) => ({ c, membros: membros(c), vagas: Object.fromEntries(NIVEIS.map((n) => [n, vagasDe(c, n)])) as Record<Nivel, Record<string, Vaga>> }));
const celulaVaga = (v: Vaga) => (v.via ? `→ ${v.via}` : v.nivelDaFuncao === null ? '**0**' : `${marca(v.opcoes.length)}${v.nivelDaFuncao > 0 ? ` (n${v.nivelDaFuncao + 1})` : ''}`);
const ORDEM_GRUPO = { atalho: 0, persona: 1, vazio: 2, par: 3, item: 4 } as const;
const cenOrd = [...cen].sort((a, b) => ORDEM_GRUPO[a.c.grupo] - ORDEM_GRUPO[b.c.grupo] || a.c.id.localeCompare(b.c.id));
const md2: string[] = [
  '# Cenários: quantas opções cada vaga tem, por nível',
  '',
  '> Gerado por `scripts/auditoria/catalogo.ts`. Vaga = função do gerador (`src/domain/gerador/funcoes.json`). Cada célula: opções equivalentes no nível da função que o gerador usa (`iniciante | intermediário | avançado`); `(n2)` = a função caiu para o 2º nível de preferência (o 1º não é possível); `→ x` = a vaga vazia recorre à função x; **0** = nenhuma opção; **1** = uma só (o gerador repete sempre o mesmo).',
  `> ${todos.length} cenários em ${REPRESENTANTES.length} classes (cenários que abrem os mesmos exercícios geram o mesmo programa).`,
  '',
  '## Resumo: vagas sem opção e vagas com uma opção só',
  '| Cenário (e os que dão o mesmo) | Vagas com 0 (iniciante / avançado) | Vagas com 1 só (iniciante / avançado) | Vagas que só o intermediário+ abre |',
  '|---|---:|---:|---|',
  ...cenOrd.map(({ c, membros: ms, vagas }) => {
    const zero = (n: Nivel) => FUNCOES.filter((f) => vagas[n][f.id]!.nivelDaFuncao === null && !vagas[n][f.id]!.via).length;
    const um = (n: Nivel) => FUNCOES.filter((f) => vagas[n][f.id]!.opcoes.length === 1).length;
    const soInter = FUNCOES.filter((f) => vagas.iniciante[f.id]!.nivelDaFuncao === null && vagas.avancado[f.id]!.nivelDaFuncao !== null).map((f) => f.id);
    const nome = `${c.nome}${ms.length > 1 ? ` (+ ${ms.length - 1}: ${ms.slice(1).map((x) => x.id).join(', ')})` : ''}`;
    return `| ${nome} | ${zero('iniciante')} / ${zero('avancado')} | ${um('iniciante')} / ${um('avancado')} | ${soInter.join(', ') || '—'} |`;
  }),
  '',
  '## Vaga por vaga',
];
for (const { c, membros: ms, vagas } of cenOrd) {
  md2.push(`### ${c.nome}`, ms.length > 1 ? `Mesmo programa: ${ms.slice(1).map((x) => x.nome).join('; ')}.` : '', '', '| Vaga | iniciante | intermediário | avançado | opções (avançado) |', '|---|---:|---:|---:|---|');
  for (const f of FUNCOES) md2.push(`| ${f.nome} | ${NIVEIS.map((n) => celulaVaga(vagas[n][f.id]!)).join(' | ')} | ${vagas.avancado[f.id]!.opcoes.join(', ') || '—'} |`);
  md2.push('');
}
writeFileSync(`${SAIDA}/cenarios.md`, md2.join('\n'));

// ---------- 3. monotonia: o mesmo exercício em todos os dias da função ----------
const MINUTOS_MON = [45, 60, 90];
type Mon = { programas: number; aparece2: number; repeteComOpcao: number; repeteSemOpcao: number; exemplos: string[] };
const porFuncao = new Map<string, Mon>();
const porCenario = new Map<string, { programas: number; repeteComOpcao: number; repeteSemOpcao: number }>();
const novoMon = (): Mon => ({ programas: 0, aparece2: 0, repeteComOpcao: 0, repeteSemOpcao: 0, exemplos: [] });
let programas = 0;
for (const { c, vagas } of cen)
  for (const nivel of NIVEIS)
    for (const divisao of DIVISAO_IDS as readonly DivisaoId[])
      for (const minutos of MINUTOS_MON) {
        const r = gerarPrograma(perfil({ nivel, divisao, minutos, prioridades: [], dores: [] }), c.inventario);
        if (r.status !== 'ok') continue;
        const p: Programa = r.programa;
        programas++;
        const pc = porCenario.get(c.id) ?? { programas: 0, repeteComOpcao: 0, repeteSemOpcao: 0 };
        pc.programas++;
        const usos = new Map<string, { dias: number; ex: Set<string> }>();
        for (const d of p.dias)
          for (const f of new Set(d.exercicios.map((x) => x.funcao).filter((x): x is string => !!x))) {
            const u = usos.get(f) ?? { dias: 0, ex: new Set<string>() };
            u.dias++;
            for (const x of d.exercicios.filter((y) => y.funcao === f)) u.ex.add(x.exId);
            usos.set(f, u);
          }
        let comOpcao = false;
        let semOpcao = false;
        for (const [f, u] of usos) {
          const m = porFuncao.get(f) ?? novoMon();
          m.programas++;
          if (u.dias >= 2) {
            m.aparece2++;
            if (u.ex.size === 1) {
              const opcoes = vagas[nivel][f]?.opcoes ?? [];
              if (opcoes.length >= 2) {
                m.repeteComOpcao++;
                comOpcao = true;
                if (m.exemplos.length < 3) m.exemplos.push(`${c.id} · ${NOME_NIVEL[nivel]} · ${DIVISOES[divisao].nome} · ${minutos} min: ${[...u.ex][0]} em ${u.dias} dias, com ${opcoes.filter((o) => !u.ex.has(o)).join(', ')} possível`);
              } else {
                m.repeteSemOpcao++;
                semOpcao = true;
              }
            }
          }
          porFuncao.set(f, m);
        }
        if (comOpcao) pc.repeteComOpcao++;
        if (semOpcao) pc.repeteSemOpcao++;
        porCenario.set(c.id, pc);
      }
const md3: string[] = [
  '# Monotonia: o mesmo exercício em todos os dias da vaga',
  '',
  `> Gerado por \`scripts/auditoria/catalogo.ts\`: ${programas} programas (${REPRESENTANTES.length} classes de cenário × 3 níveis × ${DIVISAO_IDS.length} divisões × ${MINUTOS_MON.join(', ')} min, sem prioridade nem dor).`,
  '> "Repete com opção" = a vaga aparece em 2 dias ou mais, sempre com o mesmo exercício, embora houvesse outro equivalente possível no mesmo nível da função. "Repete sem opção" = repete porque só há um. A regra `selecao.variacao` (moderada) pede manter os exercícios no bloco e variar dentro da função; repetir na semana não é erro por si, mas mostra onde falta variedade possível.',
  '',
  '| Vaga | programas com a vaga | em 2 dias ou mais | repete com opção | repete sem opção | exemplos |',
  '|---|---:|---:|---:|---:|---|',
  ...FUNCOES.filter((f) => porFuncao.has(f.id)).map((f) => {
    const m = porFuncao.get(f.id)!;
    return `| ${f.nome} | ${m.programas} | ${m.aparece2} | ${m.repeteComOpcao} (${pct(m.repeteComOpcao, m.aparece2)}) | ${m.repeteSemOpcao} (${pct(m.repeteSemOpcao, m.aparece2)}) | ${m.exemplos.join('<br>') || '—'} |`;
  }),
  '',
  '## Por cenário',
  '| Cenário | programas | com alguma repetição havendo opção | com alguma repetição sem opção |',
  '|---|---:|---:|---:|',
  ...cenOrd.map(({ c }) => {
    const pc = porCenario.get(c.id)!;
    return `| ${c.nome} | ${pc.programas} | ${pct(pc.repeteComOpcao, pc.programas)} | ${pct(pc.repeteSemOpcao, pc.programas)} |`;
  }),
  '',
];
writeFileSync(`${SAIDA}/monotonia.md`, md3.join('\n'));

// ---------- JSON, para o antes × depois ----------
writeFileSync(
  `${SAIDA}/grade.json`,
  JSON.stringify(
    {
      biblioteca: BIBLIOTECA.length,
      soIntermediarioOuMais: soAvancado.map((e) => e.id),
      grade: linhasGrade.map((l) => ({ musculo: l.musculo, padrao: l.padrao, celulas: Object.fromEntries(Object.entries(l.celulas).map(([k, v]) => [k, [v.iniciante.length, v.avancado.length]])) })),
      cenarios: Object.fromEntries(cen.map(({ c, membros: ms, vagas }) => [c.id, { membros: ms.map((x) => x.id), vagas: Object.fromEntries(NIVEIS.map((n) => [n, Object.fromEntries(FUNCOES.map((f) => [f.id, vagas[n][f.id]!.via ? `via ${vagas[n][f.id]!.via}` : vagas[n][f.id]!.opcoes.length]))])) }])),
      monotonia: { programas, porFuncao: Object.fromEntries([...porFuncao].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, { aparece2: v.aparece2, repeteComOpcao: v.repeteComOpcao, repeteSemOpcao: v.repeteSemOpcao }])) },
    },
    null,
    1,
  ) + '\n',
);
console.log(`catálogo: ${linhasGrade.length} linhas na grade, ${REPRESENTANTES.length} classes de cenário, ${programas} programas → ${SAIDA}`);

// A grade da régua (frente G5; docs/revisoes/proximos-passos/g-biblioteca-ampliada.md, seção 1). Uso:
//   npm run auditoria:regua                          (a grade inteira, em vários processos; confere a linha de base)
//   npm run auditoria:regua -- --processos 1         (num processo só)
//   npm run auditoria:regua -- --saida <pasta>       (escreve noutra pasta: medições de protótipos; não confere)
//   npm run auditoria:regua -- --linha-de-base       (grava a contagem de hoje como a linha de base dos defeitos)
// A grade: os 55 cenários de equipamento (cenarios-55.ts) × 3 níveis × 2 a 6 dias (a divisão recomendada) × 30, 45,
// 60 e 90 min × 11 focos (nenhum, cada grupo, superiores, inferiores, peito+costas) × 3 situações de dor (nenhuma,
// ombro 7, joelho 7) = 108.900 programas, 36.300 sem dor. Cada programa é medido pela régua (regua.ts).
// "Nenhum defeito piora": a contagem de cada defeito, sem dor e com dor, não pode passar da linha de base
// (regua-linha-de-base.json, gravada na main antes da biblioteca ampliada, 07/11/2026); se passar, sai com código 1.
// Determinístico: sem relógio nem sorteio; os processos somam contagens e os exemplos são os de menor índice.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { availableParallelism, tmpdir } from 'node:os';
import { join } from 'node:path';
import { BIBLIOTECA, POR_ID } from '../../src/domain/biblioteca';
import { contextoDeSelecao, gerarPrograma, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { DIVISOES, OPCOES_POR_DIAS, type DiasSemana, type DivisaoId } from '../../src/domain/gerador/divisoes';
import { FUNCOES } from '../../src/domain/gerador/funcoes';
import { NIVEIS } from '../../src/domain/regras';
import { perfil, type Prioridade, type SituacaoDeDor } from './cenarios';
import { CENARIOS_55, type Cen, type GrupoDeCenario } from './cenarios-55';
import { DEFEITOS, NOME_DEFEITO, NOME_NOTA, NOTAS, medirRegua, type Defeito, type Nota } from './regua';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
const parte = arg('--parte');
const saidaParcial = arg('--saida-parcial');
const processos = Math.max(1, Number(arg('--processos')) || Math.min(4, availableParallelism()));
const SAIDA = arg('--saida') ?? 'docs/revisoes/qualidade';
const oficial = !arg('--saida');
const gravarBase = args.includes('--linha-de-base');
const BASE = 'docs/revisoes/qualidade/regua-linha-de-base.json';

// ---------- a grade ----------
export const MINUTOS_R = [30, 45, 60, 90];
export const FOCOS_R: Prioridade[] = [
  { id: 'nenhum', grupos: [] },
  ...(['peito', 'costas', 'ombros', 'bracos', 'pernas', 'gluteos', 'abdomen'] as Grupo[]).map((g) => ({ id: g, grupos: [g] })),
  { id: 'superiores', grupos: ['peito', 'costas', 'ombros', 'bracos'] },
  { id: 'inferiores', grupos: ['pernas', 'gluteos'] },
  { id: 'peito+costas', grupos: ['peito', 'costas'] },
];
export const DORES_R: SituacaoDeDor[] = [
  { id: 'sem dor', dores: [] },
  { id: 'ombro 7', dores: [{ articulacao: 'ombro', nota: 7 }] },
  { id: 'joelho 7', dores: [{ articulacao: 'joelho', nota: 7 }] },
];
const DIVISOES_R: DivisaoId[] = ([2, 3, 4, 5, 6] as DiasSemana[]).map((d) => OPCOES_POR_DIAS[d][0]!);

type CasoR = { indice: number; cen: Cen; pf: Perfil; foco: string; dor: string };
/** O perfil do caso: a divisão fica livre (a recomendada dos dias; corpo todo quando não há puxar). */
function* casos(): Generator<CasoR> {
  let indice = 0;
  for (const cen of CENARIOS_55)
    for (const nivel of NIVEIS)
      for (const divisao of DIVISOES_R)
        for (const minutos of MINUTOS_R)
          for (const foco of FOCOS_R)
            for (const dor of DORES_R) {
              const pf = perfil({ nivel, divisao, minutos, prioridades: foco.grupos, dores: dor.dores });
              delete pf.divisao;
              yield { indice: indice++, cen, pf, foco: foco.id, dor: dor.id };
            }
}
const nomeDoCaso = (c: CasoR) => `${c.cen.id} · ${c.pf.nivel} · ${c.pf.diasSemana} dias · ${c.pf.minutosSessao} min · foco ${c.foco} · ${c.dor}`;
const resumo = (p: Programa) => p.dias.map((d) => `${d.nome} (${d.minutosEstimados} min): ${d.exercicios.map((x) => `${x.exId} ${x.series}${x.dropSet ? '+drop' : ''}`).join(', ')}`).join(' | ');

// ---------- acumuladores (somáveis) ----------
type Contagem = Record<string, number>;
type Exemplo = { indice: number; caso: string; detalhe: string; programa: string };
type Acc = { c: Contagem; exemplos: Record<string, Exemplo> };
const A: Acc = { c: {}, exemplos: {} };
const inc = (c: Contagem, k: string, n = 1) => (c[k] = (c[k] ?? 0) + n);

function medir(caso: CasoR) {
  const res = gerarPrograma(caso.pf, caso.cen.inventario);
  const semDor = caso.dor === 'sem dor';
  const recortes = semDor
    ? ['todos', 'semdor', `grupo:${caso.cen.grupo}`, `cen:${caso.cen.id}`, `nivel:${caso.pf.nivel}`, `min:${caso.pf.minutosSessao}`, `dias:${caso.pf.diasSemana}`, `foco:${caso.foco}`]
    : ['todos', 'comdor', `dor:${caso.dor}`];
  if (res.status !== 'ok') {
    for (const r of recortes) inc(A.c, `${r}|bloqueado`);
    return;
  }
  const p = res.programa;
  const m = medirRegua(p, caso.pf, contextoDeSelecao(caso.pf, caso.cen.inventario));
  for (const r of recortes) {
    inc(A.c, `${r}|programas`);
    if (!m.defeitos.size) inc(A.c, `${r}|semDefeito`);
    if ([...m.defeitos].every((d) => d === 'D1')) inc(A.c, `${r}|semDefeitoForaD1`);
    for (const d of m.defeitos) inc(A.c, `${r}|def:${d}`);
    for (const n of m.notas) inc(A.c, `${r}|nota:${n}`);
    if (p.dias.length >= 3) inc(A.c, `${r}|tresDiasOuMais`);
    if (caso.pf.prioridades.length) inc(A.c, `${r}|comFoco`);
    inc(A.c, `${r}|dias`, p.dias.length);
    inc(A.c, `${r}|exercicios`, m.exerciciosPorDia.reduce((t, n) => t + n, 0));
    inc(A.c, `${r}|distintos`, m.distintos);
    inc(A.c, `${r}|prescricoes`, m.prescricoes);
    inc(A.c, `${r}|semAlternativa`, m.semAlternativa);
    inc(A.c, `${r}|cartoes`, m.cartoesPorDia.reduce((t, n) => t + n, 0));
  }
  if (semDor) for (const id of new Set(p.dias.flatMap((d) => d.exercicios.map((x) => x.exId)))) inc(A.c, `uso|${id}`);
  for (const k of [...m.defeitos, ...m.notas]) {
    const chave = `${semDor ? 'semdor' : 'comdor'}|${k}`;
    if (!A.exemplos[chave] || A.exemplos[chave].indice > caso.indice) A.exemplos[chave] = { indice: caso.indice, caso: nomeDoCaso(caso), detalhe: m.detalhe[k as Defeito | Nota]!, programa: resumo(p) };
  }
}

function somar(a: Acc, b: Acc) {
  for (const [k, n] of Object.entries(b.c)) inc(a.c, k, n);
  for (const [k, e] of Object.entries(b.exemplos)) if (!a.exemplos[k] || a.exemplos[k].indice > e.indice) a.exemplos[k] = e;
}

async function rodar(): Promise<Acc> {
  if (parte) {
    const [i, n] = parte.split('/').map(Number) as [number, number];
    for (const c of casos()) if (c.indice % n === i) medir(c);
    return A;
  }
  if (processos === 1) {
    for (const c of casos()) medir(c);
    return A;
  }
  const pasta = join(tmpdir(), `regua-${process.pid}`);
  mkdirSync(pasta, { recursive: true });
  const filhos = Array.from({ length: processos }, (_, i) => {
    const arquivo = join(pasta, `parte-${i}.json`);
    return new Promise<string>((resolve, reject) => {
      const ch = spawn(process.execPath, [join('node_modules', '.bin', 'vite-node'), 'scripts/auditoria/grade-regua.ts', '--', '--parte', `${i}/${processos}`, '--saida-parcial', arquivo], { stdio: ['ignore', 'inherit', 'inherit'] });
      ch.on('exit', (code) => (code === 0 ? resolve(arquivo) : reject(new Error(`processo ${i} saiu com ${code}`))));
    });
  });
  const arquivos = await Promise.all(filhos);
  const total: Acc = { c: {}, exemplos: {} };
  for (const f of arquivos) somar(total, JSON.parse(readFileSync(f, 'utf8')) as Acc);
  rmSync(pasta, { recursive: true, force: true });
  return total;
}

/** Opções por função em cada cenário (intermediário, sem dor): quantas funções ficam com 0 e com 1 exercício possível. */
function opcoesPorFuncao() {
  let zero = 0;
  let uma = 0;
  for (const cen of CENARIOS_55) {
    const pf = perfil({ nivel: 'intermediario', divisao: DIVISOES_R[1]!, minutos: 60, prioridades: [], dores: [] });
    const ctx = contextoDeSelecao(pf, cen.inventario);
    for (const f of FUNCOES) {
      const n = f.niveis.flat().filter((id) => ctx.naFuncao(f, id)).length;
      if (n === 0) zero++;
      else if (n === 1) uma++;
    }
  }
  return { zero, uma };
}

// ---------- saída ----------
const pct = (n: number, d: number) => (d ? Math.round((1000 * n) / d) / 10 : 0);
const pv = (n: number, d: number) => `${pct(n, d).toFixed(1).replace('.', ',')}%`;
const dec = (n: number, d: number, casas = 2) => (d ? String(Math.round((10 ** casas * n) / d) / 10 ** casas).replace('.', ',') : '—');
const ordenar = <T>(x: T): T =>
  Array.isArray(x)
    ? (x.map(ordenar) as T)
    : x && typeof x === 'object'
      ? (Object.fromEntries(Object.entries(x as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, ordenar(v)])) as T)
      : x;

type LinhaDeBase = { semdor: Record<string, number>; comdor: Record<string, number> };
const contagemDosDefeitos = (c: Contagem, r: 'semdor' | 'comdor') => Object.fromEntries(DEFEITOS.map((d) => [d, c[`${r}|def:${d}`] ?? 0]));

async function main() {
  const acc = await rodar();
  if (saidaParcial) {
    writeFileSync(saidaParcial, JSON.stringify(acc));
    return;
  }
  const c = acc.c;
  const opcoes = opcoesPorFuncao();
  const atual: LinhaDeBase = { semdor: contagemDosDefeitos(c, 'semdor'), comdor: contagemDosDefeitos(c, 'comdor') };
  if (gravarBase) writeFileSync(BASE, JSON.stringify(ordenar(atual), null, 1) + '\n');
  const base: LinhaDeBase | null = existsSync(BASE) ? (JSON.parse(readFileSync(BASE, 'utf8')) as LinhaDeBase) : null;
  const pioraram = base ? (['semdor', 'comdor'] as const).flatMap((r) => DEFEITOS.filter((d) => atual[r][d]! > (base[r][d] ?? 0)).map((d) => `${d} ${r === 'semdor' ? 'sem dor' : 'com dor'}: ${base[r][d]} → ${atual[r][d]}`)) : [];

  mkdirSync(SAIDA, { recursive: true });
  writeFileSync(`${SAIDA}/regua.json`, JSON.stringify(ordenar({ contagem: c, exemplos: Object.fromEntries(Object.entries(acc.exemplos).map(([k, { indice: _i, ...e }]) => (void _i, [k, e]))), opcoesPorFuncao: opcoes }), null, 1) + '\n');

  const L: string[] = [];
  const linha = (...xs: (string | number)[]) => L.push(`| ${xs.join(' | ')} |`);
  const n = (x: number) => x.toLocaleString('pt-BR');
  const g = (r: string, k: string) => c[`${r}|${k}`] ?? 0;
  const P = (r: string) => g(r, 'programas');
  L.push('# A régua da G5 na grade de 108.900 programas', '');
  L.push('> Gerado por `npm run auditoria:regua` (`scripts/auditoria/grade-regua.ts`, com as medidas de `scripts/auditoria/regua.ts`). Dados fictícios. Não editar à mão.', '');
  L.push(
    `**${n(P('todos'))} programas** (${n(P('semdor'))} sem dor): ${CENARIOS_55.length} cenários de equipamento × 3 níveis × 2 a 6 dias (a divisão recomendada) × ${MINUTOS_R.join(', ')} min × ${FOCOS_R.length} focos (${FOCOS_R.map((f) => f.id).join(', ')}) × ${DORES_R.length} situações de dor (${DORES_R.map((d) => d.id).join(', ')}). ${n(g('todos', 'bloqueado'))} bloqueados. A régua e as fontes de cada limite: \`docs/pesquisa-v2/17-biblioteca-ampliada.md\`, parte G5, tabela 4.7.`,
    '',
  );
  L.push('## Nenhum defeito pode piorar', '');
  if (!base) L.push('Sem linha de base gravada.', '');
  else if (pioraram.length) L.push(`**Pioraram em relação à linha de base (\`${BASE}\`):** ${pioraram.join('; ')}.`, '');
  else L.push(`Nenhum defeito acima da linha de base (\`${BASE}\`, a \`main\` antes da biblioteca ampliada).`, '');
  linha('defeito', 'o que é', 'sem dor', '%', 'linha de base', 'com dor', '%', 'linha de base');
  linha('---', '---', '---:', '---:', '---:', '---:', '---:', '---:');
  for (const d of DEFEITOS)
    linha(d, NOME_DEFEITO[d], n(g('semdor', `def:${d}`)), pv(g('semdor', `def:${d}`), P('semdor')), base ? pv(base.semdor[d] ?? 0, P('semdor')) : '—', n(g('comdor', `def:${d}`)), pv(g('comdor', `def:${d}`), P('comdor')), base ? pv(base.comdor[d] ?? 0, P('comdor')) : '—');
  linha('**sem nenhum defeito**', '', n(g('semdor', 'semDefeito')), `**${pv(g('semdor', 'semDefeito'), P('semdor'))}**`, '', n(g('comdor', 'semDefeito')), pv(g('comdor', 'semDefeito'), P('comdor')), '');
  linha('sem defeito, fora o D1', '', n(g('semdor', 'semDefeitoForaD1')), pv(g('semdor', 'semDefeitoForaD1'), P('semdor')), '', n(g('comdor', 'semDefeitoForaD1')), pv(g('comdor', 'semDefeitoForaD1'), P('comdor')), '');
  L.push(
    '',
    'Como cada limite é medido (as definições do protótipo de `g-biblioteca-ampliada.md` foram descartadas com o rascunho; estas reproduzem a linha de base dele em todos os números publicados, menos o D1): o dia típico (A4) é a mediana dos dias; "tem tempo" (C1, E1) é o dia mais longo abaixo de 85% dos minutos; o foco (C1, C2) só conta músculos com exercício possível, e C2 compara com a mediana dos não prioritários que têm exercício possível; D1 e D3 só valem quando o equipamento permite puxar, e treinar quadríceps e posteriores. **O D1 usa o limite escrito na tabela 4.7 (empurrar ÷ puxar acima de 1,5)**: dá 6,1% na `main`, e não os 0,9% do protótipo, cuja leitura exata se perdeu. Por isso a linha "fora o D1" é a comparável com os 73,4% (hoje) e os 83,8% (final) do protótipo.',
  );

  L.push('', '## Notas (devem melhorar)', '', '% dos programas sem dor. B2 e B3 só existem com 3 dias ou mais (a coluna ao lado dá a fatia desses).', '');
  linha('nota', 'o que é', 'programas', '% (sem dor)', '% (3 dias ou mais)');
  linha('---', '---', '---:', '---:', '---:');
  for (const k of NOTAS) linha(k, NOME_NOTA[k], n(g('semdor', `nota:${k}`)), pv(g('semdor', `nota:${k}`), P('semdor')), k === 'B2' || k === 'B3' ? pv(g('semdor', `nota:${k}`), g('semdor', 'tresDiasOuMais')) : '');

  L.push('', '## Medidas (sem dor)', '');
  linha('medida', 'valor');
  linha('---', '---:');
  linha('exercícios por dia (média)', dec(g('semdor', 'exercicios'), g('semdor', 'dias')));
  linha('exercícios diferentes por semana (média)', dec(g('semdor', 'distintos'), P('semdor'), 1));
  linha('prescrições sem nenhuma alternativa', pv(g('semdor', 'semAlternativa'), g('semdor', 'prescricoes')));
  linha('cartões de texto por dia (média)', dec(g('semdor', 'cartoes'), g('semdor', 'dias')));
  linha('funções com 0 opção / com 1, somando os 55 cenários (intermediário)', `${opcoes.zero} / ${opcoes.uma}`);

  const tabela = (titulo: string, recortes: [string, string][]) => {
    L.push('', `## ${titulo}`, '', 'Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).', '');
    linha('recorte', 'programas', 'sem defeito', ...DEFEITOS, 'C2 (com foco)', 'exercícios por dia', 'diferentes por semana', 'B2', '3+ cartões');
    linha('---', '---:', '---:', ...DEFEITOS.map(() => '---:'), '---:', '---:', '---:', '---:', '---:');
    for (const [r, nome] of recortes) {
      if (!P(r)) continue;
      linha(nome, n(P(r)), pv(g(r, 'semDefeito'), P(r)), ...DEFEITOS.map((d) => pv(g(r, `def:${d}`), P(r))), pv(g(r, 'nota:C2'), g(r, 'comFoco')), dec(g(r, 'exercicios'), g(r, 'dias')), dec(g(r, 'distintos'), P(r), 1), pv(g(r, 'nota:B2'), P(r)), pv(g(r, 'nota:G1'), P(r)));
    }
  };
  const GRUPOS_CEN: [GrupoDeCenario, string][] = [
    ['atalho', 'atalhos'],
    ['persona', 'personas'],
    ['vazio', 'sem nada'],
    ['item', 'um item só'],
    ['par', 'pares de casa'],
  ];
  tabela('Por grupo de cenário', GRUPOS_CEN.map(([k, nome]) => [`grupo:${k}`, `${nome} (${CENARIOS_55.filter((x) => x.grupo === k).length})`]));
  tabela('Por nível', NIVEIS.map((x) => [`nivel:${x}`, x]));
  tabela('Por minutos', MINUTOS_R.map((x) => [`min:${x}`, `${x} min`]));
  tabela('Por dias', [2, 3, 4, 5, 6].map((x) => [`dias:${x}`, `${x} dias`]));
  tabela('Por foco', FOCOS_R.map((x) => [`foco:${x.id}`, x.id]));
  tabela('Por cenário', [...CENARIOS_55].sort((a, b) => a.id.localeCompare(b.id)).map((x) => [`cen:${x.id}`, x.id]));

  L.push('', '## Uso de cada exercício', '', 'Programas sem dor em que o exercício aparece (os sem animação aprovada, que aparecem como cartão de texto, vêm marcados).', '');
  linha('exercício', 'animação', 'programas', '%');
  linha('---', '---', '---:', '---:');
  for (const e of [...BIBLIOTECA].sort((a, b) => (c[`uso|${b.id}`] ?? 0) - (c[`uso|${a.id}`] ?? 0) || a.id.localeCompare(b.id)))
    linha(e.id, POR_ID[e.id]!.animacaoId ? 'sim' : '**cartão**', n(c[`uso|${e.id}`] ?? 0), pv(c[`uso|${e.id}`] ?? 0, P('semdor')));

  L.push('', '## Exemplos', '', 'O 1º programa da grade com cada defeito e nota.', '');
  for (const r of ['semdor', 'comdor'])
    for (const k of [...DEFEITOS, ...NOTAS]) {
      const e = acc.exemplos[`${r}|${k}`];
      if (e) L.push(`- **${k}** (${r === 'semdor' ? 'sem dor' : 'com dor'}), ${e.caso}: ${e.detalhe}.`, `  - ${e.programa}`);
    }
  writeFileSync(`${SAIDA}/regua.md`, L.join('\n') + '\n');
  console.log(`${P('todos')} programas; sem dor sem defeito: ${pv(g('semdor', 'semDefeito'), P('semdor'))}. Saída em ${SAIDA}/regua.{json,md}`);
  if (oficial && pioraram.length) {
    console.error(`Defeitos acima da linha de base: ${pioraram.join('; ')}`);
    process.exit(1);
  }
}

void DIVISOES;
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

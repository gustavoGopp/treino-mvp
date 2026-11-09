// Estresse de qualidade dos treinos gerados (sessão de 05/11/2026; docs/revisoes/qualidade-treinos.md). Uso:
//   npm run auditoria:qualidade                    (a grade inteira, em vários processos)
//   npm run auditoria:qualidade -- --amostra 50    (1 caso-base a cada 50, para conferir rápido)
//   npm run auditoria:qualidade -- --processos 1   (num processo só)
//   npm run auditoria:qualidade -- --saida <pasta>  (escreve noutra pasta: medições de protótipos)
// A grade: 55 cenários de equipamento (cenarios-55.ts) × 3 níveis × 5 números de dias (a divisão recomendada de cada
// um) × 5 durações (30 a 90 min) × 13 prioridades × 15 situações de dor (sem; leve = 4 e forte = 7 em cada região), e,
// nos casos sem dor, mais 2 variantes com um exercício evitado (o 1º da vaga de agachar; o 1º da vaga de empurrar
// horizontal). Dor e exercício evitado não se cruzam entre si, para a rodada caber em minutos (≈ 911 mil programas).
// Mede, por programa, por dia e por semana: exercícios por dia, uso dos minutos, séries por músculo contra a meta e o
// piso, músculos a zero, exercícios distintos e repetidos, a fatia do prioritário, as vagas vazias e os avisos.
// A régua da frente G5 (regua.ts) também é medida aqui, caso a caso: cada defeito vira o suspeito "regua.<id>". A grade
// própria da régua, com a linha de base e a conferência "nenhum defeito piora", é grade-regua.ts (R5-CL, 07/11/2026).
// Determinístico: a mesma grade dá os mesmos arquivos (sem relógio nem sorteio na saída; cada caso tem um índice
// fixo, e a junção dos processos soma contagens e escolhe exemplos pelo menor índice). Só dados fictícios.
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { availableParallelism, tmpdir } from 'node:os';
import { join } from 'node:path';
import { ARTICULACOES, POR_ID, type Musculo } from '../../src/domain/biblioteca';
import { ehAvisoDeMeta, musculosDoAviso, contextoDeSelecao, gerarPrograma, GRUPOS, MUSCULOS_COM_META, NOME_MUSCULO, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { DIVISOES, OPCOES_POR_DIAS, type DiasSemana, type DivisaoId, type Vaga } from '../../src/domain/gerador/divisoes';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { exerciciosPorSessao, TEMPO, VOLUME, type Nivel } from '../../src/domain/regras';
import { grade, perfil, type Caso, type SituacaoDeDor } from './cenarios';
import { CENARIOS_55, type Cen } from './cenarios-55';
import { medirRegua, NOME_DEFEITO } from './regua';
import { MINUTOS_Q, PRIORIDADES_Q } from './qualidade-grade';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
const amostra = Number(arg('--amostra')) || 0;
const parte = arg('--parte'); // "i/N": este processo roda só os casos com índice ≡ i (mod N)
const saidaParcial = arg('--saida-parcial');
const processos = Math.max(1, Number(arg('--processos')) || Math.min(4, availableParallelism()));
// --saida <pasta>: para medir um protótipo sem tocar na saída oficial (os arquivos oficiais ficam em docs/revisoes/qualidade).
const SAIDA = arg('--saida') ?? 'docs/revisoes/qualidade';

// ---------- a grade ----------
export { GRUPOS_IDS, MINUTOS_Q, PRIORIDADES_Q } from './qualidade-grade';
export const DORES_Q: SituacaoDeDor[] = [{ id: 'sem dor', dores: [] }, ...ARTICULACOES.flatMap((a) => [4, 7].map((nota) => ({ id: `${a} ${nota}`, dores: [{ articulacao: a, nota }] })))];
/** A divisão recomendada de cada número de dias; no perfil ela fica livre, para divisao.sem-puxar valer. */
export const DIVISOES_RECOMENDADAS: DivisaoId[] = ([2, 3, 4, 5, 6] as DiasSemana[]).map((d) => OPCOES_POR_DIAS[d][0]!);
export const EVITADOS = ['nenhum', 'agachar', 'empurrar-horizontal'] as const;
type Evitado = (typeof EVITADOS)[number];
/** Cenários com `comum` (a prioridade dos achados), no formato do estresse. */
const CENARIOS_Q = CENARIOS_55.map((c) => ({ ...c, comum: c.grupo === 'atalho' || c.grupo === 'persona' }));
const CEN_55: Record<string, Cen> = Object.fromEntries(CENARIOS_55.map((c) => [c.id, c]));

type CasoQ = { indice: number; caso: Caso; evitado: Evitado; pf: Perfil };
/** O perfil do caso: a divisão fica livre (a recomendada dos dias; corpo todo quando não há puxar). */
function perfilDoCaso(caso: Caso, evitarExercicios: string[]): Perfil {
  const pf = perfil({ nivel: caso.nivel, divisao: caso.divisao, minutos: caso.minutos, prioridades: caso.prioridade.grupos, dores: caso.dor.dores, evitarExercicios });
  delete pf.divisao;
  return pf;
}
/** O 1º exercício que a vaga escolheria neste cenário e nível (o que a pessoa marcaria como "evitar"). */
function primeiroDaVaga(pf: Perfil, caso: Caso, funcao: string): string | null {
  const ctx = contextoDeSelecao(pf, caso.cenario.inventario);
  const r = ctx.resolver({ funcao });
  if (!r || r.funcao.id !== funcao) return null;
  return ctx.escolher(r.funcao, r.nivel, () => false, new Map())?.ex.id ?? null;
}
function* casos(): Generator<CasoQ> {
  let indice = 0;
  for (const caso of grade({ cenarios: CENARIOS_Q, divisoes: DIVISOES_RECOMENDADAS, minutos: MINUTOS_Q, prioridades: PRIORIDADES_Q, dores: DORES_Q, amostra }))
    for (const evitado of EVITADOS) {
      if (evitado !== 'nenhum' && caso.dor.dores.length) continue;
      const base = perfilDoCaso(caso, []);
      const ev = evitado === 'nenhum' ? null : primeiroDaVaga(base, caso, evitado);
      if (evitado !== 'nenhum' && !ev) continue; // a vaga já não tem exercício: nada a evitar
      yield { indice: indice++, caso, evitado, pf: ev ? perfilDoCaso(caso, [ev]) : base };
    }
}
const nomeDoCaso = (c: CasoQ) =>
  `${c.caso.cenario.id} · ${c.caso.nivel} · ${c.pf.diasSemana} dias · ${c.caso.minutos} min · prioridade ${c.caso.prioridade.id} · ${c.caso.dor.id}${c.evitado === 'nenhum' ? '' : ` · evita ${c.pf.evitarExercicios.join(',')}`}`;
/** Uma linha que reproduz o programa (o inventário é o do cenário em cenarios-55.ts). */
const reproducao = (c: CasoQ) => `gerarPrograma(${JSON.stringify(c.pf)}, CEN_55['${c.caso.cenario.id}'].inventario)`;
const resumo = (p: Programa) =>
  p.dias.map((d) => `${d.nome} (${d.minutosEstimados} min): ${d.exercicios.map((x) => `${x.exId} ${x.series}${x.dropSet ? '+drop' : ''}`).join(', ')}`).join(' | ');

// ---------- acumuladores (todos somáveis, para juntar os processos) ----------
type Contagem = Record<string, number>;
type Hist = Record<string, Contagem>; // chave → valor → quantos
type Exemplo = { indice: number; caso: string; programa: string; problema: string; reproducao: string };
type Pior = { indice: number; caso: string; valor: number; detalhe: string; programa: string; reproducao: string };
type Acc = {
  programas: number;
  bloqueados: number;
  dias: number;
  contagem: Contagem;
  /** Por problema, por cenário, o exemplo de menor índice. */
  exemplos: Record<string, Record<string, Exemplo>>;
  /** Exercícios por dia: "min|cenário" → n → dias; "limpo|min|cenário" (sem dor, sem evitar) e "dias|dias|min|cenário" (idem). */
  exerciciosPorDia: Hist;
  /** Uso do dia mais longo (minutos estimados ÷ escolhidos, em % arredondado a 5): "min|cenário" → faixa → programas. */
  usoPorPrograma: Hist;
  /** Séries por músculo: "nível|cenário|músculo" → { soma, n, abaixoMeta (prioritário), prio, abaixoPiso (não prioritário), zero, zeroSemAviso }. */
  volume: Record<string, { soma: number; n: number; prio: number; abaixoMeta: number; abaixoPiso: number; zero: number; zeroSemAviso: number }>;
  /** Fatia do prioritário: chave → { soma (em décimos de %, inteiros), n }. */
  fatia: Record<string, { soma: number; n: number }>;
  /** Prioridades que competem: "nível|prioridade" → { n, abaixo: programas com algum prioritário abaixo da meta, competem: um abaixo e outro na meta }. */
  competem: Record<string, { n: number; abaixo: number; competem: number }>;
  /** Exercícios distintos na semana: cenário → n → programas. */
  distintos: Hist;
  /** Monotonia: cenário → { programas (3+ dias), todosOsDias, comOpcao }. */
  monotonia: Record<string, { programas: number; todosOsDias: number; comOpcao: number }>;
  /** Vagas vazias: "cenário|nível|função" → { equipamento, dor } e "cenário|nível" → { vagas, comExercicio, foraPorMinutos, programas }. */
  vagas: Record<string, { equipamento: number; dor: number }>;
  vagasDoDia: Record<string, { programas: number; dias: number; vagas: number; comExercicio: number; foraPorMinutos: number }>;
  /** Avisos: regra → programas com o aviso; e "cenário|regra". */
  avisos: Contagem;
  avisosPorCenario: Contagem;
  /** Os piores casos de cada tipo: por cenário, o pior (pelo valor e depois pelo índice); o relatório mostra os 10 piores cenários. */
  piores: Record<string, Record<string, Pior>>;
};
const novo = (): Acc => ({ programas: 0, bloqueados: 0, dias: 0, contagem: {}, exemplos: {}, exerciciosPorDia: {}, usoPorPrograma: {}, volume: {}, fatia: {}, competem: {}, distintos: {}, monotonia: {}, vagas: {}, vagasDoDia: {}, avisos: {}, avisosPorCenario: {}, piores: {} });
const A = novo();
const inc = (c: Contagem, k: string, n = 1) => (c[k] = (c[k] ?? 0) + n);
const hist = (h: Hist, k: string, v: number | string) => inc((h[k] ??= {}), String(v));
const PIORES_MAX = 10;
const melhorQue = (a: Pior, b: Pior) => a.valor < b.valor || (a.valor === b.valor && a.indice < b.indice);
function problema(id: string, c: CasoQ, p: Programa | null, texto: string) {
  inc(A.contagem, id);
  const porCenario = (A.exemplos[id] ??= {});
  const cid = c.caso.cenario.id;
  if (!porCenario[cid] || porCenario[cid].indice > c.indice) porCenario[cid] = { indice: c.indice, caso: nomeDoCaso(c), programa: p ? resumo(p) : '', problema: texto, reproducao: reproducao(c) };
}
/** Guarda os piores: `valor` menor é pior (para "maior é pior", passe o negativo). */
function pior(id: string, c: CasoQ, p: Programa, valor: number, detalhe: string) {
  const porCenario = (A.piores[id] ??= {});
  const cid = c.caso.cenario.id;
  const novo: Pior = { indice: c.indice, caso: nomeDoCaso(c), valor, detalhe, programa: resumo(p), reproducao: reproducao(c) };
  if (!porCenario[cid] || melhorQue(novo, porCenario[cid])) porCenario[cid] = novo;
}
const GRANDES: Musculo[] = ['peito', 'costas', 'quadriceps', 'posteriores', 'gluteos'];

// ---------- um caso ----------
function medir(c: CasoQ) {
  const { caso, pf } = c;
  const inv = caso.cenario.inventario;
  const res = gerarPrograma(pf, inv);
  if (res.status !== 'ok') {
    A.bloqueados++;
    problema('bloqueado', c, null, 'o gerador bloqueou o programa');
    return;
  }
  const p = res.programa;
  A.programas++;
  const cid = caso.cenario.id;
  const nivel: Nivel = caso.nivel;
  const grupos = new Set<Grupo>(caso.prioridade.grupos);
  const prio = new Set<Musculo>(caso.prioridade.grupos.flatMap((g) => GRUPOS[g]));
  const semDor = !caso.dor.dores.length;
  const N = exerciciosPorSessao(caso.minutos);

  // Exercícios por dia e uso dos minutos
  const maxDia = Math.max(0, ...p.dias.map((d) => d.minutosEstimados));
  const uso = maxDia / caso.minutos;
  hist(A.usoPorPrograma, `${caso.minutos}|${cid}`, Math.round((uso * 100) / 5) * 5);
  const limpo = semDor && c.evitado === 'nenhum';
  for (const d of p.dias) {
    A.dias++;
    hist(A.exerciciosPorDia, `${caso.minutos}|${cid}`, d.exercicios.length);
    if (limpo) {
      hist(A.exerciciosPorDia, `limpo|${caso.minutos}|${cid}`, d.exercicios.length);
      hist(A.exerciciosPorDia, `dias|${pf.diasSemana}|${caso.minutos}|${cid}`, d.exercicios.length);
    }
    if (caso.minutos >= 45 && d.exercicios.length < 5) problema('dia.poucos-exercicios', c, p, `${d.nome} com ${d.exercicios.length} exercícios em ${caso.minutos} min (cabem ~${N})`);
    if (!d.exercicios.length) problema('dia.vazio', c, p, `${d.nome} sem exercício`);
    else if (!d.exercicios.some((x) => x.padrao !== 'core')) problema('dia.so-core', c, p, `${d.nome} só com abdominal`);
    if (d.minutosEstimados > caso.minutos && !p.avisos.some((a) => a.regraId === 'tempo.corte' && a.texto.startsWith(`${d.nome}:`)))
      problema('tempo.acima-sem-aviso', c, p, `${d.nome}: ${d.minutosEstimados} min de ${caso.minutos}, sem aviso`);
  }
  if (caso.minutos >= 45) {
    const menor = Math.min(...p.dias.map((d) => d.exercicios.length));
    pior('menos-exercicios-com-45min-ou-mais', c, p, menor, `dia com ${menor} exercício${menor === 1 ? '' : 's'} em ${caso.minutos} min`);
    if (limpo) pior('menos-exercicios-com-45min-ou-mais-sem-dor-nem-evitado', c, p, menor, `dia com ${menor} exercício${menor === 1 ? '' : 's'} em ${caso.minutos} min`);
  }
  if (uso < TEMPO.sobraFracao) {
    problema('tempo.uso-baixo', c, p, `o dia mais longo usa ${maxDia} de ${caso.minutos} min (${Math.round(uso * 100)}%)${p.avisos.some((a) => a.regraId === 'tempo.sobra') ? ', com o aviso de sobra' : ', sem o aviso de sobra'}`);
    if (!p.avisos.some((a) => a.regraId === 'tempo.sobra')) problema('tempo.uso-baixo-sem-aviso', c, p, `o dia mais longo usa ${maxDia} de ${caso.minutos} min e não há aviso de sobra`);
  }
  pior('menor-uso-dos-minutos', c, p, Math.round(uso * 100), `${maxDia} de ${caso.minutos} min`);
  if (limpo) pior('menor-uso-dos-minutos-sem-dor-nem-evitado', c, p, Math.round(uso * 100), `${maxDia} de ${caso.minutos} min`);

  // Séries por músculo contra a meta e o piso; zero sem aviso
  const avisosDeMeta = p.avisos.filter(ehAvisoDeMeta);
  const citado = (m: Musculo) => avisosDeMeta.some((a) => musculosDoAviso(a).includes(m));
  let algumPrioAbaixo = false;
  let algumPrioNaMeta = false;
  for (const m of MUSCULOS_COM_META) {
    const v = p.volumeSemanal[m] ?? 0;
    const meta = p.metas[m] ?? 0;
    const k = `${nivel}|${cid}|${m}`;
    const a = (A.volume[k] ??= { soma: 0, n: 0, prio: 0, abaixoMeta: 0, abaixoPiso: 0, zero: 0, zeroSemAviso: 0 });
    a.soma += v;
    a.n++;
    if (prio.has(m)) {
      a.prio++;
      if (v < meta) {
        a.abaixoMeta++;
        algumPrioAbaixo = true;
        if (uso < 0.85 && semDor) problema('prioridade.abaixo-com-tempo', c, p, `${NOME_MUSCULO[m]} (prioridade) com ${v} de ${meta} séries e o dia mais longo em ${maxDia} de ${caso.minutos} min`);
      } else algumPrioNaMeta = true;
    } else if (v < Math.min(meta, VOLUME.minimoEficazPiso)) a.abaixoPiso++;
    if (v === 0) {
      a.zero++;
      if (!citado(m)) {
        a.zeroSemAviso++;
        if (GRANDES.includes(m)) problema('volume.zero-sem-aviso', c, p, `${NOME_MUSCULO[m]} com 0 série na semana e nenhum aviso o cita`);
      }
    }
    if (v > VOLUME.teto) problema('volume.acima-do-teto', c, p, `${NOME_MUSCULO[m]} com ${v} séries`);
  }
  if (prio.size) {
    const k = `${nivel}|${caso.prioridade.id}`;
    const q = (A.competem[k] ??= { n: 0, abaixo: 0, competem: 0 });
    q.n++;
    if (algumPrioAbaixo) q.abaixo++;
    if (algumPrioAbaixo && algumPrioNaMeta) q.competem++;
  }

  // Fatia das séries da semana que vai aos prioritários (séries diretas + meia indireta, como o volume do app)
  if (prio.size) {
    const total = Object.values(p.volumeSemanal).reduce((t, x) => t + (x ?? 0), 0);
    const doPrio = [...prio].reduce((t, m) => t + (p.volumeSemanal[m] ?? 0), 0);
    // Em décimos de %, inteiro: a soma não depende da ordem em que os processos terminam.
    const fatia = total ? Math.round((1000 * doPrio) / total) : 0;
    for (const k of [`nivel|${nivel}|${caso.prioridade.grupos.length}`, `dias|${pf.diasSemana}|${caso.prioridade.grupos.length}`, `cenario|${cid}|${caso.prioridade.grupos.length}`, `prioridade|${nivel}|${caso.prioridade.id}`, `minutos|${caso.minutos}|${caso.prioridade.grupos.length}`]) {
      const f = (A.fatia[k] ??= { soma: 0, n: 0 });
      f.soma += fatia;
      f.n++;
    }
  }

  // Exercícios distintos e repetidos
  const porDia = p.dias.map((d) => new Set(d.exercicios.map((x) => x.exId)));
  const todosIds = new Set(porDia.flatMap((s) => [...s]));
  hist(A.distintos, cid, todosIds.size);
  if (p.dias.length >= 3) {
    const mo = (A.monotonia[cid] ??= { programas: 0, todosOsDias: 0, comOpcao: 0 });
    mo.programas++;
    const emTodos = [...todosIds].filter((id) => POR_ID[id]!.padrao !== 'core' && porDia.every((s) => s.has(id)));
    if (emTodos.length) {
      mo.todosOsDias++;
      problema('monotonia.todos-os-dias', c, p, `${emTodos.join(', ')} em todos os ${p.dias.length} dias`);
      const ctx = contextoDeSelecao(pf, inv);
      const comOpcao = emTodos.filter((id) => {
        const x = p.dias.flatMap((d) => d.exercicios).find((y) => y.exId === id)!;
        const f = x.funcao ? FUNCAO[x.funcao] : undefined;
        if (!f) return false;
        const n = f.niveis.findIndex((ids) => ids.includes(id));
        return (f.niveis[n] ?? []).some((o) => o !== id && ctx.naFuncao(f, o) && !todosIds.has(o));
      });
      if (comOpcao.length) {
        mo.comOpcao++;
        problema('monotonia.todos-os-dias-com-opcao', c, p, `${comOpcao.join(', ')} em todos os dias, com outro equivalente do mesmo nível possível e sem uso`);
      }
    }
  }

  // Vagas vazias, vaga a vaga, e o motivo (equipamento, dor ou minutos)
  const divisao = DIVISOES[p.divisaoId!];
  const ctx = contextoDeSelecao(pf, inv);
  const ativa = (v: Vaga) => !v.prioridade || v.prioridade.some((g) => grupos.has(g));
  const vd = (A.vagasDoDia[`${cid}|${nivel}`] ??= { programas: 0, dias: 0, vagas: 0, comExercicio: 0, foraPorMinutos: 0 });
  vd.programas++;
  divisao.dias.forEach((dia, i) => {
    vd.dias++;
    let comExercicio = 0;
    for (const v of dia.vagas.filter(ativa)) {
      vd.vagas++;
      if (ctx.resolver(v)) comExercicio++;
      else {
        const k = `${cid}|${nivel}|${v.funcao}`;
        const q = (A.vagas[k] ??= { equipamento: 0, dor: 0 });
        if (ctx.perdidaPorDor(v)) q.dor++;
        else q.equipamento++;
      }
    }
    vd.comExercicio += comExercicio;
    const base = p.dias[i]!.exercicios.filter((x) => !x.porque.some((q) => q.regraId === 'selecao.dia-sem-principal')).length;
    vd.foraPorMinutos += Math.max(0, comExercicio - base);
  });

  // A régua da G5: os defeitos (regua.ts)
  const regua = medirRegua(p, pf, ctx);
  for (const d of regua.defeitos) problema(`regua.${d}`, c, p, `${NOME_DEFEITO[d]}: ${regua.detalhe[d]}`);

  // Avisos
  for (const id of new Set(p.avisos.map((a) => a.regraId))) {
    inc(A.avisos, id);
    inc(A.avisosPorCenario, `${cid}|${id}`);
  }
}

// ---------- junção dos processos ----------
function somar(a: Acc, b: Acc) {
  a.programas += b.programas;
  a.bloqueados += b.bloqueados;
  a.dias += b.dias;
  for (const [k, n] of Object.entries(b.contagem)) inc(a.contagem, k, n);
  for (const [id, porCen] of Object.entries(b.exemplos)) {
    const alvo = (a.exemplos[id] ??= {});
    for (const [cid, e] of Object.entries(porCen)) if (!alvo[cid] || alvo[cid].indice > e.indice) alvo[cid] = e;
  }
  for (const h of ['exerciciosPorDia', 'usoPorPrograma', 'distintos'] as const)
    for (const [k, cont] of Object.entries(b[h])) for (const [v, n] of Object.entries(cont)) inc((a[h][k] ??= {}), v, n);
  for (const [k, v] of Object.entries(b.volume)) {
    const x = (a.volume[k] ??= { soma: 0, n: 0, prio: 0, abaixoMeta: 0, abaixoPiso: 0, zero: 0, zeroSemAviso: 0 });
    for (const f of Object.keys(x) as (keyof typeof x)[]) x[f] += v[f];
  }
  for (const [k, v] of Object.entries(b.fatia)) {
    const x = (a.fatia[k] ??= { soma: 0, n: 0 });
    x.soma += v.soma;
    x.n += v.n;
  }
  for (const [k, v] of Object.entries(b.competem)) {
    const x = (a.competem[k] ??= { n: 0, abaixo: 0, competem: 0 });
    x.n += v.n;
    x.abaixo += v.abaixo;
    x.competem += v.competem;
  }
  for (const [k, v] of Object.entries(b.monotonia)) {
    const x = (a.monotonia[k] ??= { programas: 0, todosOsDias: 0, comOpcao: 0 });
    x.programas += v.programas;
    x.todosOsDias += v.todosOsDias;
    x.comOpcao += v.comOpcao;
  }
  for (const [k, v] of Object.entries(b.vagas)) {
    const x = (a.vagas[k] ??= { equipamento: 0, dor: 0 });
    x.equipamento += v.equipamento;
    x.dor += v.dor;
  }
  for (const [k, v] of Object.entries(b.vagasDoDia)) {
    const x = (a.vagasDoDia[k] ??= { programas: 0, dias: 0, vagas: 0, comExercicio: 0, foraPorMinutos: 0 });
    for (const f of Object.keys(x) as (keyof typeof x)[]) x[f] += v[f];
  }
  for (const [k, n] of Object.entries(b.avisos)) inc(a.avisos, k, n);
  for (const [k, n] of Object.entries(b.avisosPorCenario)) inc(a.avisosPorCenario, k, n);
  for (const [id, porCen] of Object.entries(b.piores)) {
    const alvo = (a.piores[id] ??= {});
    for (const [cid, x] of Object.entries(porCen)) if (!alvo[cid] || melhorQue(x, alvo[cid])) alvo[cid] = x;
  }
}
/** Chaves em ordem fixa, para o JSON não depender da ordem em que os processos terminaram. */
function ordenar<T>(x: T): T {
  if (Array.isArray(x)) return x.map(ordenar) as T;
  if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, ordenar(v)])) as T;
  return x;
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
  const pasta = join(tmpdir(), `qualidade-${process.pid}`);
  mkdirSync(pasta, { recursive: true });
  const filhos = Array.from({ length: processos }, (_, i) => {
    const arquivo = join(pasta, `parte-${i}.json`);
    const extra = amostra ? ['--amostra', String(amostra)] : [];
    return new Promise<string>((resolve, reject) => {
      const ch = spawn(process.execPath, [join('node_modules', '.bin', 'vite-node'), 'scripts/auditoria/qualidade.ts', '--', '--parte', `${i}/${processos}`, '--saida-parcial', arquivo, ...extra], { stdio: ['ignore', 'inherit', 'inherit'] });
      ch.on('exit', (code) => (code === 0 ? resolve(arquivo) : reject(new Error(`processo ${i} saiu com ${code}`))));
    });
  });
  const arquivos = await Promise.all(filhos);
  const total = novo();
  for (const f of arquivos) somar(total, JSON.parse(readFileSync(f, 'utf8')) as Acc);
  rmSync(pasta, { recursive: true, force: true });
  return total;
}

// ---------- saída ----------
const pct = (n: number, d: number) => (d ? Math.round((1000 * n) / d) / 10 : 0);
const pv = (n: number, d: number) => `${String(pct(n, d)).replace('.', ',')}%`;
const virg = (x: number) => String(x).replace('.', ',');
const medianaDe = (cont: Contagem) => {
  const pares = Object.entries(cont).map(([v, n]) => [Number(v), n] as const).sort((a, b) => a[0] - b[0]);
  const total = pares.reduce((t, [, n]) => t + n, 0);
  let acc = 0;
  for (const [v, n] of pares) {
    acc += n;
    if (acc >= total / 2) return v;
  }
  return 0;
};
const somaHist = (h: Hist, filtro: (k: string) => boolean): Contagem => {
  const out: Contagem = {};
  for (const [k, cont] of Object.entries(h)) if (filtro(k)) for (const [v, n] of Object.entries(cont)) inc(out, v, n);
  return out;
};
const faixas = (cont: Contagem) => {
  const f = { '≤ 3': 0, '4': 0, '5 a 7': 0, '≥ 8': 0 };
  for (const [v, n] of Object.entries(cont)) {
    const x = Number(v);
    f[x <= 3 ? '≤ 3' : x === 4 ? '4' : x <= 7 ? '5 a 7' : '≥ 8'] += n;
  }
  return f;
};
const totalDe = (cont: Contagem) => Object.values(cont).reduce((t, n) => t + n, 0);
const abaixoDe = (cont: Contagem, limite: number) => Object.entries(cont).filter(([v]) => Number(v) < limite).reduce((t, [, n]) => t + n, 0);

async function main() {
  const acc = await rodar();
  if (saidaParcial) {
    writeFileSync(saidaParcial, JSON.stringify(acc));
    return;
  }
  const json = ordenar({
    grade: {
      amostra: amostra || 1,
      programas: acc.programas,
      bloqueados: acc.bloqueados,
      dias: acc.dias,
      cenarios: CENARIOS_55.length,
      minutos: MINUTOS_Q,
      prioridades: PRIORIDADES_Q.map((x) => x.id),
      dores: DORES_Q.map((x) => x.id),
      evitados: [...EVITADOS],
      divisoes: DIVISOES_RECOMENDADAS,
    },
    contagem: acc.contagem,
    exemplos: Object.fromEntries(
      Object.entries(acc.exemplos).map(([id, porCen]) => [
        id,
        Object.values(porCen)
          .sort((a, b) => a.indice - b.indice)
          .slice(0, 3)
          .map(({ indice: _i, ...e }) => (void _i, e)),
      ]),
    ),
    exerciciosPorDia: acc.exerciciosPorDia,
    usoPorPrograma: acc.usoPorPrograma,
    volume: acc.volume,
    fatia: Object.fromEntries(Object.entries(acc.fatia).map(([k, f]) => [k, { mediaPct: Math.round(f.soma / f.n) / 10, programas: f.n }])),
    competem: acc.competem,
    distintos: acc.distintos,
    monotonia: acc.monotonia,
    vagas: acc.vagas,
    vagasDoDia: acc.vagasDoDia,
    avisos: acc.avisos,
    avisosPorCenario: acc.avisosPorCenario,
    piores: Object.fromEntries(
      Object.entries(acc.piores).map(([id, porCen]) => [
        id,
        Object.values(porCen)
          .sort((x, y) => x.valor - y.valor || x.indice - y.indice)
          .slice(0, PIORES_MAX)
          .map(({ indice: _i, ...x }) => (void _i, x)),
      ]),
    ),
  });
  mkdirSync(SAIDA, { recursive: true });
  writeFileSync(`${SAIDA}/grade.json`, JSON.stringify(json, null, 1) + '\n');

  const L: string[] = [];
  const linha = (...xs: (string | number)[]) => L.push(`| ${xs.join(' | ')} |`);
  const n = (x: number) => x.toLocaleString('pt-BR');
  const cenariosOrd = [...CENARIOS_55].sort((a, b) => a.id.localeCompare(b.id));
  L.push('# Estresse de qualidade dos treinos gerados', '');
  L.push(`> Gerado por \`npm run auditoria:qualidade\`${amostra ? ` com \`--amostra ${amostra}\`` : ''} (\`scripts/auditoria/qualidade.ts\`). Dados fictícios. Não editar à mão.`, '');
  L.push(
    `**${n(acc.programas)} programas** (${n(acc.dias)} dias de treino): ${CENARIOS_55.length} cenários de equipamento × 3 níveis × 5 números de dias (a divisão recomendada de cada um) × ${MINUTOS_Q.length} durações (${MINUTOS_Q.join(', ')} min) × ${PRIORIDADES_Q.length} prioridades × ${DORES_Q.length} situações de dor; nos casos sem dor, mais 2 variantes com um exercício evitado (o 1º da vaga de agachar e o 1º da de empurrar horizontal)${amostra ? `; 1 caso-base a cada ${amostra}` : ''}. ${acc.bloqueados} bloqueados.`,
    '',
  );
  L.push('## Suspeitos (contagem de ocorrências)', '');
  L.push('`dia.poucos-exercicios`: dia com menos de 5 exercícios tendo 45 min ou mais. `tempo.uso-baixo`: o dia mais longo usa menos de 70% dos minutos (`tempo.sobra`). `volume.zero-sem-aviso`: músculo grande com 0 série e nenhum aviso o cita. `prioridade.abaixo-com-tempo`: prioritário abaixo da meta com o dia mais longo abaixo de 85% dos minutos, sem dor. `monotonia.todos-os-dias-com-opcao`: o mesmo exercício em todos os dias havendo outro equivalente possível. `regua.*`: os defeitos da régua da G5 (`scripts/auditoria/regua.ts`; a grade própria dela está em `regua.md`).', '');
  linha('suspeito', 'ocorrências', '% (dos dias ou dos programas)');
  linha('---', '---:', '---:');
  for (const [id, k] of Object.entries(acc.contagem).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    const porDia = id.startsWith('dia.') || id.startsWith('tempo.acima');
    linha(`\`${id}\``, n(k), `${pv(k, porDia ? acc.dias : acc.programas)} dos ${porDia ? 'dias' : 'programas'}`);
  }

  L.push('', '## Exercícios por dia', '', 'Faixas de exercícios por dia de treino (% dos dias), por duração escolhida. "Cabem" é o alvo de `tempo.exercicios-por-sessao`.', '');
  linha('minutos', 'cabem', '≤ 3', '4', '5 a 7', '≥ 8', 'mediana');
  linha('---:', '---:', '---:', '---:', '---:', '---:', '---:');
  const todasAsChaves = (k: string) => k.split('|').length === 2;
  for (const m of MINUTOS_Q) {
    const cont = somaHist(acc.exerciciosPorDia, (k) => todasAsChaves(k) && k.startsWith(`${m}|`));
    const f = faixas(cont);
    const t = totalDe(cont);
    linha(m, exerciciosPorSessao(m), pv(f['≤ 3'], t), pv(f['4'], t), pv(f['5 a 7'], t), pv(f['≥ 8'], t), medianaDe(cont));
  }
  L.push('', 'O mesmo, só nos programas sem dor e sem exercício evitado:', '');
  linha('minutos', 'cabem', '≤ 3', '4', '5 a 7', '≥ 8', 'mediana');
  linha('---:', '---:', '---:', '---:', '---:', '---:', '---:');
  for (const m of MINUTOS_Q) {
    const cont = somaHist(acc.exerciciosPorDia, (k) => k.startsWith(`limpo|${m}|`));
    const f = faixas(cont);
    const t = totalDe(cont);
    linha(m, exerciciosPorSessao(m), pv(f['≤ 3'], t), pv(f['4'], t), pv(f['5 a 7'], t), pv(f['≥ 8'], t), medianaDe(cont));
  }
  L.push('', 'Por dias por semana (sem dor e sem exercício evitado; % dos dias com ≤ 3 exercícios, por duração):', '');
  linha('dias', ...MINUTOS_Q.map((m) => `${m} min`));
  linha('---:', ...MINUTOS_Q.map(() => '---:'));
  for (const d of [2, 3, 4, 5, 6]) linha(d, ...MINUTOS_Q.map((m) => { const cont = somaHist(acc.exerciciosPorDia, (k) => k.startsWith(`dias|${d}|${m}|`)); return pv(faixas(cont)['≤ 3'], totalDe(cont)); }));
  L.push('', '### Por cenário de equipamento, com 45 min ou mais', '', '% dos dias em cada faixa, nos programas sem dor e sem exercício evitado ("limpos"); a coluna "≤ 3 (todos)" conta também os com dor ou exercício evitado. "Uso < 70%" é a fatia dos programas (45 min ou mais, todos) cujo dia mais longo usa menos de 70% dos minutos.', '');
  linha('cenário', 'grupo', '≤ 3', '4', '5 a 7', '≥ 8', 'mediana', '≤ 3 (todos)', 'uso < 70%');
  linha('---', '---', '---:', '---:', '---:', '---:', '---:', '---:', '---:');
  for (const c of cenariosOrd) {
    const cont = somaHist(acc.exerciciosPorDia, (k) => k.startsWith('limpo|') && k.endsWith(`|${c.id}`) && Number(k.split('|')[1]) >= 45);
    const todos = somaHist(acc.exerciciosPorDia, (k) => !k.includes('|', k.indexOf('|') + 1) && k.endsWith(`|${c.id}`) && Number(k.split('|')[0]) >= 45);
    const f = faixas(cont);
    const t = totalDe(cont);
    const usoCont = somaHist(acc.usoPorPrograma, (k) => k.endsWith(`|${c.id}`) && Number(k.split('|')[0]) >= 45);
    linha(c.id, c.grupo, pv(f['≤ 3'], t), pv(f['4'], t), pv(f['5 a 7'], t), pv(f['≥ 8'], t), medianaDe(cont), pv(faixas(todos)['≤ 3'], totalDe(todos)), pv(abaixoDe(usoCont, 70), totalDe(usoCont)));
  }

  L.push('', '## Uso dos minutos', '', 'Minutos estimados do dia mais longo ÷ minutos escolhidos (% dos programas).', '');
  linha('minutos', 'mediana do uso', '< 50%', '< 70%', '≥ 100%');
  linha('---:', '---:', '---:', '---:', '---:');
  for (const m of MINUTOS_Q) {
    const cont = somaHist(acc.usoPorPrograma, (k) => k.startsWith(`${m}|`));
    const t = totalDe(cont);
    linha(m, `${medianaDe(cont)}%`, pv(abaixoDe(cont, 50), t), pv(abaixoDe(cont, 70), t), pv(t - abaixoDe(cont, 100), t));
  }

  L.push('', '## Séries por músculo', '', 'Por nível, somando os cenários: média de séries semanais; prioritário abaixo da meta (% dos programas em que o músculo é prioridade); não prioritário abaixo do piso de 4 (% dos outros); 0 série na semana (% dos programas); 0 sem aviso que o cite.', '');
  for (const nivel of ['iniciante', 'intermediario', 'avancado'] as Nivel[]) {
    L.push(`### ${nivel}`, '');
    linha('músculo', 'média', 'prioritário abaixo da meta', 'demais abaixo de 4', 'zero', 'zero sem aviso');
    linha('---', '---:', '---:', '---:', '---:', '---:');
    for (const m of MUSCULOS_COM_META) {
      const vs = Object.entries(acc.volume).filter(([k]) => k.startsWith(`${nivel}|`) && k.endsWith(`|${m}`)).map(([, v]) => v);
      const s = vs.reduce((t, v) => ({ soma: t.soma + v.soma, n: t.n + v.n, prio: t.prio + v.prio, abaixoMeta: t.abaixoMeta + v.abaixoMeta, abaixoPiso: t.abaixoPiso + v.abaixoPiso, zero: t.zero + v.zero, zeroSemAviso: t.zeroSemAviso + v.zeroSemAviso }), { soma: 0, n: 0, prio: 0, abaixoMeta: 0, abaixoPiso: 0, zero: 0, zeroSemAviso: 0 });
      linha(NOME_MUSCULO[m], virg(Math.round((10 * s.soma) / (s.n || 1)) / 10), pv(s.abaixoMeta, s.prio), pv(s.abaixoPiso, s.n - s.prio), pv(s.zero, s.n), n(s.zeroSemAviso));
    }
    L.push('');
  }
  L.push('### Músculos a zero por cenário (todos os níveis; % dos programas)', '');
  linha('cenário', ...MUSCULOS_COM_META.map((m) => NOME_MUSCULO[m]));
  linha('---', ...MUSCULOS_COM_META.map(() => '---:'));
  for (const c of cenariosOrd)
    linha(
      c.id,
      ...MUSCULOS_COM_META.map((m) => {
        const vs = Object.entries(acc.volume).filter(([k]) => k.includes(`|${c.id}|`) && k.endsWith(`|${m}`)).map(([, v]) => v);
        const z = vs.reduce((t, v) => t + v.zero, 0);
        const t = vs.reduce((x, v) => x + v.n, 0);
        return pv(z, t);
      }),
    );

  L.push('', '## Fatia das séries da semana que vai aos músculos prioritários', '', 'Séries diretas mais meia série indireta, como o app conta o volume. Média (%) dos programas com prioridade.', '');
  linha('nível', '1 prioridade', '2 prioridades', '3 prioridades');
  linha('---', '---:', '---:', '---:');
  const fatia = (k: string) => (acc.fatia[k] ? `${virg(Math.round(acc.fatia[k].soma / acc.fatia[k].n) / 10)}%` : '—');
  for (const nivel of ['iniciante', 'intermediario', 'avancado']) linha(nivel, fatia(`nivel|${nivel}|1`), fatia(`nivel|${nivel}|2`), fatia(`nivel|${nivel}|3`));
  L.push('');
  linha('dias por semana', '1 prioridade', '2 prioridades', '3 prioridades');
  linha('---:', '---:', '---:', '---:');
  for (const d of [2, 3, 4, 5, 6]) linha(d, fatia(`dias|${d}|1`), fatia(`dias|${d}|2`), fatia(`dias|${d}|3`));
  L.push('');
  linha('minutos', '1 prioridade', '2 prioridades', '3 prioridades');
  linha('---:', '---:', '---:', '---:');
  for (const m of MINUTOS_Q) linha(m, fatia(`minutos|${m}|1`), fatia(`minutos|${m}|2`), fatia(`minutos|${m}|3`));
  L.push('', '### Por prioridade e nível (média %), e quando as prioridades competem', '', '"Abaixo": programas com algum prioritário abaixo da meta. "Competem": um prioritário abaixo da meta e outro na meta (só com 2 ou 3 prioridades).', '');
  linha('prioridade', ...['iniciante', 'intermediario', 'avancado'].flatMap((nv) => [`${nv}: fatia`, 'abaixo', 'competem']));
  linha('---', ...['iniciante', 'intermediario', 'avancado'].flatMap(() => ['---:', '---:', '---:']));
  for (const pr of PRIORIDADES_Q.filter((x) => x.grupos.length))
    linha(
      pr.id,
      ...['iniciante', 'intermediario', 'avancado'].flatMap((nv) => {
        const q = acc.competem[`${nv}|${pr.id}`];
        return [fatia(`prioridade|${nv}|${pr.id}`), q ? pv(q.abaixo, q.n) : '—', q && pr.grupos.length > 1 ? pv(q.competem, q.n) : '—'];
      }),
    );
  L.push('', '### Por cenário, com 1 prioridade (média %)', '');
  linha('cenário', 'fatia');
  linha('---', '---:');
  for (const c of cenariosOrd) linha(c.id, fatia(`cenario|${c.id}|1`));

  L.push('', '## Exercícios distintos na semana e repetição', '', 'Mediana de exercícios distintos por programa; com 3 dias ou mais, % dos programas com um exercício (fora o abdominal) em todos os dias, e % em que havia outro equivalente do mesmo nível possível e sem uso.', '');
  linha('cenário', 'distintos (mediana)', 'em todos os dias', 'com opção');
  linha('---', '---:', '---:', '---:');
  for (const c of cenariosOrd) {
    const mo = acc.monotonia[c.id] ?? { programas: 0, todosOsDias: 0, comOpcao: 0 };
    linha(c.id, medianaDe(acc.distintos[c.id] ?? {}), pv(mo.todosOsDias, mo.programas), pv(mo.comOpcao, mo.programas));
  }

  L.push('', '## Vagas vazias', '', 'Por cenário e nível: vagas ativas por programa (média), quantas têm exercício possível, quantas ficam vazias por equipamento ou por dor, e quantas com exercício ficam de fora por minutos (ou pelos cortes de tempo). A função mais vazia por equipamento vem ao lado.', '');
  linha('cenário', 'nível', 'vagas', 'com exercício', 'vazias: equipamento', 'vazias: dor', 'fora por minutos', 'vazias por equipamento (funções)');
  linha('---', '---', '---:', '---:', '---:', '---:', '---:', '---');
  for (const c of cenariosOrd)
    for (const nivel of ['iniciante', 'intermediario', 'avancado']) {
      const vd = acc.vagasDoDia[`${c.id}|${nivel}`];
      if (!vd) continue;
      const porFuncao = Object.entries(acc.vagas)
        .filter(([k]) => k.startsWith(`${c.id}|${nivel}|`))
        .map(([k, v]) => ({ f: k.split('|')[2]!, eq: v.equipamento, dor: v.dor }))
        .sort((a, b) => b.eq - a.eq || a.f.localeCompare(b.f));
      const eq = porFuncao.reduce((t, x) => t + x.eq, 0);
      const dor = porFuncao.reduce((t, x) => t + x.dor, 0);
      const m = (x: number) => virg(Math.round((10 * x) / vd.programas) / 10);
      linha(c.id, nivel, m(vd.vagas), m(vd.comExercicio), m(eq), m(dor), m(vd.foraPorMinutos), porFuncao.filter((x) => x.eq).map((x) => `${x.f} (${m(x.eq)})`).join(', ') || '—');
    }

  L.push('', '## Avisos', '', '% dos programas com cada aviso (uma vez por programa, mesmo que repetido).', '');
  linha('regra', 'programas', '%');
  linha('---', '---:', '---:');
  for (const [id, k] of Object.entries(acc.avisos).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) linha(`\`${id}\``, n(k), pv(k, acc.programas));

  L.push('', '## Piores casos', '', 'Os 10 piores cenários de cada medida, um caso por cenário (menor valor primeiro; empate pela ordem da grade). A linha de reprodução usa `CEN_55` de `scripts/auditoria/cenarios-55.ts`.', '');
  for (const [id, lista] of Object.entries(json.piores).sort()) {
    L.push(`### ${id}`, '');
    for (const x of lista) L.push(`- **${x.caso}**: ${x.detalhe}.`, `  - Programa: ${x.programa}`, `  - Reproduzir: \`${x.reproducao}\``);
    L.push('');
  }
  L.push('## Exemplos (até 3 por suspeito, de cenários diferentes, os primeiros da grade)', '');
  for (const [id, ex] of Object.entries(json.exemplos).sort()) {
    L.push(`### \`${id}\``, '');
    for (const e of ex) L.push(`- **${e.caso}**: ${e.problema}.`, `  - Programa: ${e.programa}`, `  - Reproduzir: \`${e.reproducao}\``);
    L.push('');
  }
  writeFileSync(`${SAIDA}/grade.md`, L.join('\n'));
  console.log(`${acc.programas} programas; ${Object.keys(acc.contagem).length} tipos de suspeito. Saída em ${SAIDA}/grade.{json,md}`);
}

void CEN_55;
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { POR_ID, type Articulacao, type Exercicio, type Musculo } from '../biblioteca';
import {
  colchaoDe,
  contextoDeSelecao,
  ehAvisoDeMeta,
  GRUPOS,
  inserirNaOrdem,
  metasDoPerfil,
  minutos,
  musculosDoAviso,
  MUSCULOS_COM_META,
  NOME_MUSCULO_CURTO,
  prescrever,
  seriesDeVolume,
  textoDor,
  volumePorMusculo,
  type ContextoDeSelecao,
  type ExercicioPrescrito,
  type Perfil,
  type Porque,
} from '../gerador';
import { contaPara, ehDe, funcoesProprias, EMPURRAR_PUXAR_MAX, ehEmpurrar, ehPuxar, FAMILIAS, familiasCobertas } from '../gerador/familias';
import { FUNCAO, FUNCOES, funcoesDoExercicio, type Funcao } from '../gerador/funcoes';
export { ehEmpurrar, ehPuxar, FAMILIAS, familiasCobertas, FUNCOES_EMPURRAR, FUNCOES_PUXAR } from '../gerador/familias';
import { exerciciosPorSessao, NIVEL_COMPLEXIDADE_MAX, r, SELOS, TEMPO, VOLUME, type Nivel, type Selo } from '../regras';
import type { Inventario } from '../taxonomia/equipamentos';
import { avaliarTriagem } from '../triagem';

// O avaliador de programas (R5b; docs/revisoes/proximos-passos/b-monte-e-avaliador.md; regra avaliador.gravidade).
// Função pura e determinística: recebe qualquer programa (o gerado ou um digitado com exercícios da biblioteca), o perfil
// e o inventário, e devolve o veredito, os achados agrupados (cada um com a regra, o selo e o próximo passo) e a tabela
// por músculo. Mede pela tabela de funções (FUNCAO), como o gerador, e não pelo padrão de movimento. Não guarda nada.

export type Gravidade = 'seguranca' | 'alerta' | 'ajustar' | 'limite' | 'info';
export const GRAVIDADES: Gravidade[] = ['seguranca', 'alerta', 'ajustar', 'limite', 'info'];
export type Veredito = 'bloqueado' | 'ajustar' | 'limite' | 'bom';

export type TipoDeAchado =
  | 'triagem'
  | 'dor'
  | 'equipamento'
  | 'evitado'
  | 'complexidade'
  | 'series-por-exercicio'
  | 'sessao'
  | 'teto'
  | 'maximo'
  | 'frequencia'
  | 'abaixo-da-meta'
  | 'abaixo-do-piso'
  | 'sem-exercicio'
  | 'funcoes'
  | 'obrigatorio'
  | 'empurrar-puxar'
  | 'coxa'
  | 'tempo'
  | 'ordem';

/** Um achado já agrupado: os iguais (mesmo tipo, gravidade e regra) viram uma linha, com a lista dos itens. */
export type Achado = {
  tipo: TipoDeAchado;
  gravidade: Gravidade;
  regraId: string;
  selo: Selo;
  /** O fato, em uma frase. */
  texto: string;
  /** O próximo passo (acompanhamento.mensagens), inclusive "não precisa fazer nada". */
  passo: string;
  /** Os itens agrupados (exercícios, músculos ou dias), na ordem do programa. */
  itens: string[];
  /** Os músculos citados (para a tela e para conferir os avisos do gerador). */
  musculos: Musculo[];
  /** Os dias citados (ids). */
  dias: string[];
};

export type LinhaDoMusculo = { musculo: Musculo; series: number; meta: number; piso: number; foco: boolean; dias: number; funcoes: number };

export type Avaliacao = {
  veredito: Veredito;
  /** A frase de cima ("Está bom: nada a ajustar." ou a contagem por tipo). */
  resumo: string;
  achados: Achado[];
  musculos: LinhaDoMusculo[];
  empurrar: number;
  puxar: number;
  /** Os minutos estimados de cada dia, e o orçamento. */
  minutos: { diaId: string; nome: string; minutos: number }[];
  orcamento: number;
};

/** O mínimo de um exercício para avaliar: o id e as séries. O resto, se faltar, vem da prescrição do app (`prescrever`). */
export type ExercicioParaAvaliar = { exId: string; series: number } & Partial<Omit<ExercicioPrescrito, 'exId' | 'series'>>;
export type DiaParaAvaliar = { id: string; nome: string; exercicios: ExercicioParaAvaliar[] };
export type ProgramaParaAvaliar = { dias: DiaParaAvaliar[] };

// ---------- as tabelas do avaliador (todas por função; FUNCAO) ----------

/** O que cada isolador obrigatório cobre (selecao.isolador-obrigatorio), para o texto. */
const COBRE: Record<string, string> = {
  extensora: 'a parte da frente da coxa que vai até o quadril, que cresce pouco só com agachamento e afundo',
  'triceps-acima-cabeca': 'a cabeça longa do tríceps, que o supino e a flexão não crescem',
  'panturrilha-em-pe': 'a panturrilha com o joelho esticado, a que mais cresce',
};
/** A região de um músculo, como no gerador (volume.prioridade.segundo-exercicio). */
const INFERIORES: Musculo[] = ['quadriceps', 'posteriores', 'gluteos', 'panturrilha', 'adutores'];
const regiaoDe = (m: Musculo) => (m === 'abdomen' ? 'core' : INFERIORES.includes(m) ? 'inferior' : 'superior');
/** A régua da G5 (A3): o dia passa do tempo acima disto; a estimativa já inclui a margem de fila. */
const LIMITE_DO_DIA = 1.1;

const naFuncao = (f: Funcao, id: string) => f.niveis.some((n) => n.includes(id));
/** volume.equilibrio-coxa: as funções de trabalho direto dos posteriores. */
const ehPosteriorDireto = ehDe(['flexao-joelho', 'dobrar-quadril']);

const fmt = (x: number) => String(Math.round(x * 10) / 10).replace('.', ',');
const lista = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs[xs.length - 1]}` : (xs[0] ?? ''));
const minusc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const maiusc = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const nomeEx = (id: string) => minusc(POR_ID[id]?.nome ?? id);
const nomeM = (m: Musculo) => NOME_MUSCULO_CURTO[m];
const plural = (n: number, um: string, varios: string) => (n === 1 ? um : varios);
/** Até 6 itens à mostra; o resto vira "e mais N". */
const listaCurta = (xs: string[], max = 6) => (xs.length > max ? `${xs.slice(0, max).join(', ')} e mais ${xs.length - max}` : lista(xs));

// ---------- a prescrição de um programa digitado ----------

/** Completa um exercício digitado (só id e séries) com a prescrição do app: repetições, RIR, descanso (prescrever). */
export function completar(x: ExercicioParaAvaliar, ctx: ContextoDeSelecao): ExercicioPrescrito {
  if (x.reps && x.descansoSeg !== undefined && x.tipo && x.padrao && x.nome && x.unilateral !== undefined) return x as ExercicioPrescrito;
  const e = POR_ID[x.exId]!;
  const f = (x.funcao ? FUNCAO[x.funcao] : undefined) ?? funcoesDoExercicio(e.id)[0] ?? FUNCOES[0]!;
  const nivelFuncao = Math.max(0, f.niveis.findIndex((n) => n.includes(e.id)));
  return { ...prescrever(e, f, nivelFuncao, x.series, ctx), ...x } as ExercicioPrescrito;
}

// ---------- o avaliador ----------

type Bruto = {
  tipo: TipoDeAchado;
  gravidade: Gravidade;
  regraId: string;
  /** Agrupa os iguais; sem grupo, vale tipo + gravidade + regra. */
  grupo?: string;
  item: string;
  /** Um próximo passo próprio do item (ex.: "suba 1 série na rosca"). */
  sugestao?: string;
  musculo?: Musculo;
  dia?: string;
  /** Dados para o texto do grupo. */
  dado?: Record<string, string | number>;
};

/**
 * Avalia um programa para um perfil e um inventário (avaliador.gravidade). `programa` pode ser o `Programa` do gerador
 * ou só os dias com { exId, series } por exercício.
 */
export function avaliar(programa: ProgramaParaAvaliar, perfil: Perfil, inventario: Inventario): Avaliacao {
  const triagem = avaliarTriagem(perfil.triagem);
  const ctx = contextoDeSelecao(perfil, inventario, triagem);
  const nivel: Nivel = perfil.nivel;
  const colchao = colchaoDe(perfil);
  const orcamento = perfil.minutosSessao;
  const N = exerciciosPorSessao(orcamento);
  const prioritarios = new Set<Musculo>(perfil.prioridades.flatMap((g) => GRUPOS[g]));
  const metas = metasDoPerfil(nivel, perfil.prioridades);
  const piso = (m: Musculo) => Math.min(metas[m] ?? 0, VOLUME.minimoEficazPiso);
  // Os dias, com a prescrição completa (os exercícios fora da biblioteca não entram: o esquema do programa já os recusa).
  const dias = programa.dias.map((d) => ({ id: d.id, nome: d.nome, exercicios: d.exercicios.filter((x) => POR_ID[x.exId]).map((x) => completar(x, ctx)) }));
  const ex = (x: ExercicioPrescrito) => POR_ID[x.exId]!;
  const volumeDe = (exs: ExercicioPrescrito[]) => volumePorMusculo(exs.map((x) => ({ ex: ex(x), series: seriesDeVolume(x) })));
  const todos = dias.flatMap((d) => d.exercicios);
  const v = volumeDe(todos);
  const noDia = dias.map((d) => volumeDe(d.exercicios));
  const minutosDoDia = dias.map((d) => minutos(d.exercicios, colchao));
  const brutos: Bruto[] = [];
  const achar = (b: Bruto) => brutos.push(b);
  const possivelPara = (m: Musculo) => ctx.possiveis.some((e) => e.musculos.primarios.includes(m));
  const perdidoPelaDor = (m: Musculo) => !possivelPara(m) && ctx.possiveisSemRegiao.some((e) => e.musculos.primarios.includes(m));

  // ---- 1. segurança e possibilidade, exercício a exercício (seguranca.*; avaliador.gravidade) ----
  if (triagem.bloqueado) achar({ tipo: 'triagem', gravidade: 'seguranca', regraId: r('seguranca.triagem'), item: 'triagem' });
  /** A 1ª opção possível que poupa o problema, numa das funções do exercício (a alternativa do app). */
  const alternativaDe = (id: string, fora: Set<string>): string | undefined => {
    for (const f of funcoesDoExercicio(id)) {
      const res = ctx.resolver({ funcao: f.id });
      if (!res || res.funcao.id !== f.id) continue;
      const achado = ctx.escolher(f, res.nivel, (x) => fora.has(x) || x === id, new Map());
      if (achado) return achado.ex.id;
    }
    return undefined;
  };
  const noPrograma = new Set(todos.map((x) => x.exId));
  dias.forEach((d) => {
    for (const x of d.exercicios) {
      const e = ex(x);
      if (ctx.possivel.has(e.id)) continue;
      const alt = alternativaDe(e.id, noPrograma);
      const sugestao = alt ? `${nomeEx(e.id)} → ${nomeEx(alt)}` : undefined;
      const regiao = e.articulacoes.find((a) => ctx.regioesExcluidas.includes(a));
      if (regiao)
        achar({ tipo: 'dor', gravidade: 'seguranca', regraId: r('seguranca.dor.programa'), grupo: `dor|${regiao}`, item: nomeEx(e.id), sugestao, dia: d.id, dado: { regiao } });
      else if (perfil.evitarExercicios.includes(e.id)) achar({ tipo: 'evitado', gravidade: 'alerta', regraId: r('avaliador.gravidade'), item: nomeEx(e.id), sugestao, dia: d.id });
      else if (e.complexidade > NIVEL_COMPLEXIDADE_MAX[nivel])
        achar({ tipo: 'complexidade', gravidade: 'alerta', regraId: r('selecao.complexidade-nivel'), item: nomeEx(e.id), sugestao, dia: d.id });
      else achar({ tipo: 'equipamento', gravidade: 'alerta', regraId: r('avaliador.gravidade'), item: nomeEx(e.id), sugestao, dia: d.id });
    }
  });

  /** O melhor nível possível de uma função no equipamento (-1: nenhum). */
  const niveis = new Map<string, number>();
  const melhorNivel = (fid: string) => {
    let n = niveis.get(fid);
    if (n === undefined) niveis.set(fid, (n = FUNCAO[fid]!.niveis.findIndex((ids) => ids.some((id) => ctx.naFuncao(FUNCAO[fid]!, id)))));
    return n;
  };
  /** O melhor exercício possível da função (o desempate do gerador), fora os de `fora`. */
  const melhorDa = (fid: string, fora: (id: string) => boolean): string | undefined => {
    const n = melhorNivel(fid);
    return n < 0 ? undefined : ctx.escolher(FUNCAO[fid]!, n, fora, new Map())?.ex.id;
  };

  // ---- folga: dá para mudar nos mesmos dias e minutos? ----
  const cabeNaSessao = (di: number, e: Exercicio, series: number) =>
    (Object.entries(volumePorMusculo([{ ex: e, series }])) as [Musculo, number][]).every(([m, n]) => (noDia[di]![m] ?? 0) + n <= VOLUME.sessaoTeto + 1e-9);
  const cabeNaSemana = (e: Exercicio, series: number) =>
    (Object.entries(volumePorMusculo([{ ex: e, series }])) as [Musculo, number][]).every(([m, n]) => (v[m] ?? 0) + n <= VOLUME.teto + 1e-9);
  const pisoDoCorte = (m: Musculo) => Math.min(metas[m] ?? 0, prioritarios.has(m) ? VOLUME.minimo[nivel] : VOLUME.minimoEficazPiso);
  /**
   * Um dia mudado (`exs`) vale com as travas do gerador: os minutos (ou não piora um dia que já passava), 10 séries por
   * músculo na sessão, 20 na semana, nenhum músculo abaixo do piso dos cortes (tempo.corte) nem a zero, e a vaga inclinada
   * sem um empurrar reto num dia com a vaga de empurrar horizontal (selecao.peitoral-inclinado).
   */
  const valido = (di: number, exs: ExercicioPrescrito[], folgaDeTempo = 1) => {
    const novo = minutos(exs, colchao);
    if (novo > folgaDeTempo * Math.max(orcamento, minutosDoDia[di]!)) return false;
    // Como no gerador: a mudança não faz o dia mais longo da semana cair abaixo de 85% dos minutos se antes não estava.
    const maisLongo = Math.max(...minutosDoDia);
    if (maisLongo >= 0.85 * orcamento && Math.max(...minutosDoDia.map((t, k) => (k === di ? novo : t))) < 0.85 * orcamento) return false;
    // Os tetos valem para o que sobe: num programa que já passa de 10 ou de 20, a mudança não pode piorar.
    const sobe = (antes: Partial<Record<Musculo, number>>, depois: Partial<Record<Musculo, number>>, teto: number) =>
      (Object.entries(depois) as [Musculo, number][]).some(([m, n]) => n > teto + 1e-9 && n > (antes[m] ?? 0) + 1e-9);
    if (sobe(noDia[di]!, volumeDe(exs), VOLUME.sessaoTeto)) return false;
    const semana = volumeDe([...dias.flatMap((d, k) => (k === di ? [] : d.exercicios)), ...exs]);
    if (sobe(v, semana, VOLUME.teto)) return false;
    if ((Object.keys(v) as Musculo[]).some((m) => (semana[m] ?? 0) < v[m]! && ((semana[m] ?? 0) < pisoDoCorte(m) || !semana[m]))) return false;
    // O foco não perde série abaixo da meta (como no gerador).
    if ([...prioritarios].some((m) => (semana[m] ?? 0) < (v[m] ?? 0) - 1e-9 && (semana[m] ?? 0) < (metas[m] ?? 0))) return false;
    const reto = (x: ExercicioPrescrito) => x.funcao === 'empurrar-inclinado' && ex(x).padrao === 'empurrar-h' && !ex(x).tags.includes('inclinado');
    return !(exs.some(reto) && exs.some((x) => x.funcao === 'empurrar-horizontal') && !dias[di]!.exercicios.some(reto));
  };
  /** Uma série a mais num exercício do programa que tem `m` como principal, nos limites de série, sessão, semana e minutos. */
  const subirUma = (m: Musculo, filtro: (x: ExercicioPrescrito) => boolean = () => true): string | undefined => {
    for (let di = 0; di < dias.length; di++) {
      const d = dias[di]!;
      for (const x of d.exercicios) {
        const e = ex(x);
        if (!e.musculos.primarios.includes(m) || !filtro(x) || !ctx.possivel.has(e.id)) continue;
        // tempo.musculo-protegido: com 30 min ou menos, o exercício que entrou para o músculo não ficar a zero fica com 2 séries.
        if (orcamento <= TEMPO.protegidoCurto && !prioritarios.has(m) && x.porque?.some((q) => q.regraId === 'tempo.musculo-protegido')) continue;
        if (seriesDeVolume(x) >= VOLUME.seriesPorExercicio.max || !cabeNaSessao(di, e, 1) || !cabeNaSemana(e, 1)) continue;
        if (minutos(d.exercicios.map((y) => (y === x ? { ...y, series: y.series + 1 } : y)), colchao) > orcamento) continue;
        return `suba 1 série em ${nomeEx(e.id)}, no treino ${d.nome}`;
      }
    }
    return undefined;
  };
  /** Um exercício a mais de `m` (numa das `funcoes`), num dia com lugar (exercícios e minutos), no mínimo de séries. */
  const acrescentar = (
    m: Musculo,
    funcoes: string[] = FUNCOES.filter((f) => f.musculo === m).map((f) => f.id),
    vale: (todos: ExercicioPrescrito[]) => boolean = () => true,
  ): { texto: string; id: string } | undefined => {
    const serie = VOLUME.seriesPorExercicio.min;
    const ordem = dias
      .map((d, di) => ({ d, di, mesmo: d.exercicios.some((x) => ex(x).musculos.primarios.includes(m)) }))
      .sort((a, b) => Number(b.mesmo) - Number(a.mesmo) || a.d.exercicios.length - b.d.exercicios.length || a.di - b.di);
    for (const { d, di } of ordem) {
      // volume.prioridade.segundo-exercicio: num dia da mesma região (nunca panturrilha num dia de superiores).
      if (d.exercicios.length >= N || (regiaoDe(m) !== 'core' && !d.exercicios.some((x) => ex(x).musculos.primarios.some((y) => regiaoDe(y) === regiaoDe(m))))) continue;
      for (const fid of funcoes) {
        const f = FUNCAO[fid]!;
        const n = f.niveis.findIndex((ids) => ids.some((id) => ctx.naFuncao(f, id)));
        if (n < 0) continue;
        const achado = ctx.escolher(f, n, (id) => d.exercicios.some((x) => x.exId === id), new Map());
        if (!achado) continue;
        const e = achado.ex;
        if (!cabeNaSessao(di, e, serie) || !cabeNaSemana(e, serie)) continue;
        const novo = completar({ exId: e.id, series: serie, funcao: f.id }, ctx);
        const exs = inserirNaOrdem(d.exercicios, novo);
        if (minutos(exs, colchao) > orcamento || !valido(di, exs) || !vale([...dias.flatMap((z, k) => (k === di ? [] : z.exercicios)), ...exs])) continue;
        return { texto: `acrescente ${nomeEx(e.id)} (${serie} séries) no treino ${d.nome}`, id: e.id };
      }
    }
    return undefined;
  };
  /** A cobertura de famílias de todos os músculos grandes num conjunto de exercícios. */
  const coberturas = (exs: ExercicioPrescrito[]) => Object.fromEntries((Object.keys(FAMILIAS) as Musculo[]).map((k) => [k, familiasCobertas(k, exs, melhorNivel, ctx.noLugarDe).length]));
  const coberturaAgora = coberturas(todos);
  /**
   * Uma troca a partir do que sobra: um exercício cujos músculos continuam na meta sem ele (e sem perder família) dá o
   * lugar a um exercício de `m` (numa das `funcoes`), com as mesmas séries (até 4), no mesmo dia. Num programa com um
   * músculo de 27 séries e outro a zero, o ajuste é trocar, não acrescentar.
   */
  const trocarDoExcesso = (m: Musculo, funcoes: string[], vale: (todos: ExercicioPrescrito[]) => boolean = () => true): string | undefined => {
    const meta = (k: Musculo) => metas[k] ?? 0;
    const daRegiao = (d: (typeof dias)[number]) => regiaoDe(m) === 'core' || d.exercicios.some((x) => ex(x).musculos.primarios.some((y) => regiaoDe(y) === regiaoDe(m)));
    // Os dias da região do músculo primeiro (o último antes); dentro do dia, o último exercício primeiro.
    const ordem = dias.map((d, di) => ({ d, di })).sort((x, y) => Number(daRegiao(y.d)) - Number(daRegiao(x.d)) || y.di - x.di);
    for (const { d, di } of ordem) {
      if (!daRegiao(d)) continue;
      for (const x of [...d.exercicios].reverse()) {
        const e = ex(x);
        if (x.supersetCom || x.dropSet || e.musculos.primarios.some((k) => prioritarios.has(k))) continue; // nunca tira do foco
        // O doador é da mesma região do músculo (o abdômen aceita qualquer uma): não se troca um supino por uma abdução.
        if (regiaoDe(m) !== 'core' && !e.musculos.primarios.some((k) => regiaoDe(k) === regiaoDe(m))) continue;
        // Só o que sobra: um músculo principal dele acima do máximo do nível, ou a mesma função repetida no mesmo dia.
        const sobra =
          e.musculos.primarios.some((k) => (v[k] ?? 0) > VOLUME.maximo[nivel] + 1e-9) ||
          d.exercicios.some((y) => y !== x && funcoesDoExercicio(y.exId).some((f) => funcoesProprias(x.exId).includes(f.id) && funcoesProprias(y.exId).includes(f.id)));
        if (!sobra) continue;
        const sem = volumeDe(todos.filter((y) => y !== x));
        if ([...e.musculos.primarios, ...e.musculos.secundarios].some((k) => (MUSCULOS_COM_META as Musculo[]).includes(k) && (v[k] ?? 0) >= meta(k) && (sem[k] ?? 0) < meta(k))) continue;
        for (const fid of funcoes) {
          const achado = melhorDa(fid, (id) => d.exercicios.some((y) => y.exId === id));
          if (!achado) continue;
          const exs = inserirNaOrdem(d.exercicios.filter((y) => y !== x), completar({ exId: achado, series: Math.min(x.series, VOLUME.seriesPorExercicio.max), funcao: fid }, ctx));
          const semana = [...dias.flatMap((z, k) => (k === di ? [] : z.exercicios)), ...exs];
          const depois = coberturas(semana);
          // Trocar um exercício por outro muda o tempo em 1 ou 2 minutos: vale até 5% acima do dia de antes ou dos minutos.
          if (!valido(di, exs, 1.05) || Object.keys(coberturaAgora).some((k) => depois[k]! < coberturaAgora[k]!) || !vale(semana)) continue;
          return `troque ${nomeEx(x.exId)} por ${nomeEx(achado)} no treino ${d.nome}`;
        }
      }
    }
    return undefined;
  };
  const funcoesDe = (m: Musculo) => FUNCOES.filter((f) => f.musculo === m).map((f) => f.id);
  /** Uma série a menos num exercício de quem não é foco, sem descer de 2 nem tirar algum músculo dele da meta. */
  const descerUma = (filtro: (x: ExercicioPrescrito) => boolean): string | undefined => {
    for (const d of dias)
      for (const x of d.exercicios) {
        const e = ex(x);
        if (!filtro(x) || x.series <= VOLUME.seriesPorExercicio.min || e.musculos.primarios.some((m) => prioritarios.has(m))) continue;
        if (e.musculos.primarios.some((m) => (v[m] ?? 0) - 1 < (metas[m] ?? 0))) continue;
        return `tire 1 série de ${nomeEx(e.id)}, no treino ${d.nome}`;
      }
    return undefined;
  };
  /**
   * tempo.corte: o que a escada de cortes ainda pode fazer num dia longo, sem passar dos pisos (foco: o mínimo do nível;
   * os outros: 4), sem tirar um isolador obrigatório nem o único exercício de um músculo ou de posteriores: um bi-set
   * entre isoladores de músculos diferentes, um isolador a menos ou uma série a menos.
   */
  const obrigatorio = (x: ExercicioPrescrito) => FUNCOES.some((f) => f.obrigatoria && (x.funcao ? x.funcao === f.id : naFuncao(f, x.exId)));
  const ficaNoPiso = (e: Exercicio, menos: number) =>
    e.musculos.primarios.every((m) => (v[m] ?? 0) < pisoDoCorte(m) || (v[m] ?? 0) - menos >= pisoDoCorte(m)) &&
    e.musculos.secundarios.every((m) => (v[m] ?? 0) < pisoDoCorte(m) || (v[m] ?? 0) - menos * VOLUME.pesoIndireta >= pisoDoCorte(m));
  const cortarNoDia = (di: number): string | undefined => {
    const d = dias[di]!;
    const isoladores = d.exercicios.filter((x) => x.tipo === 'isolador' && x.padrao !== 'core' && !x.supersetCom);
    for (let i = 0; i < isoladores.length; i++)
      for (const y of isoladores.slice(i + 1))
        if (!ex(isoladores[i]!).musculos.primarios.some((m) => ex(y).musculos.primarios.includes(m))) return `faça ${nomeEx(isoladores[i]!.exId)} e ${nomeEx(y.exId)} em sequência (bi-set) no treino ${d.nome}`;
    const unicoPosterior = (x: ExercicioPrescrito) => ehPosteriorDireto(x.exId) && todos.filter((y) => ehPosteriorDireto(y.exId)).length === 1;
    const tirar = [...d.exercicios]
      .reverse()
      .find((x) => x.tipo === 'isolador' && !obrigatorio(x) && !ex(x).musculos.primarios.some((m) => prioritarios.has(m)) && ficaNoPiso(ex(x), seriesDeVolume(x)) && ex(x).musculos.primarios.every((m) => (v[m] ?? 0) - seriesDeVolume(x) > 0) && !unicoPosterior(x));
    if (tirar) return `tire ${nomeEx(tirar.exId)} do treino ${d.nome}`;
    const menos = [...d.exercicios].sort((a, b) => b.series - a.series).find((x) => x.series > VOLUME.seriesPorExercicio.min && ficaNoPiso(ex(x), 1));
    return menos ? `tire 1 série de ${nomeEx(menos.exId)}, no treino ${d.nome}` : undefined;
  };

  // ---- 2. séries por exercício e por sessão (volume.series-por-exercicio; volume.sessao.teto) ----
  dias.forEach((d, di) => {
    for (const x of d.exercicios) {
      const s = seriesDeVolume(x);
      if (s > VOLUME.seriesPorExercicio.max)
        achar({ tipo: 'series-por-exercicio', gravidade: 'ajustar', regraId: r('volume.series-por-exercicio'), grupo: 'acima', item: `${nomeEx(x.exId)} (${s})`, dia: d.id, dado: { s } });
      else if (s < VOLUME.seriesPorExercicio.min)
        achar({ tipo: 'series-por-exercicio', gravidade: 'ajustar', regraId: r('volume.series-por-exercicio'), grupo: 'abaixo', item: nomeEx(x.exId), dia: d.id, dado: { s } });
    }
    for (const [m, n] of Object.entries(noDia[di]!) as [Musculo, number][])
      if (n > VOLUME.sessaoTeto + 1e-9) achar({ tipo: 'sessao', gravidade: 'ajustar', regraId: r('volume.sessao.teto'), item: `${d.nome}: ${nomeM(m)} ${fmt(n)}`, musculo: m, dia: d.id });
  });

  // ---- 3. a semana por músculo: teto, máximo, meta, piso e frequência ----
  const linhas: LinhaDoMusculo[] = [];
  for (const m of MUSCULOS_COM_META) {
    const s = v[m] ?? 0;
    const meta = metas[m] ?? 0;
    const foco = prioritarios.has(m);
    const diasCom = noDia.filter((x) => (x[m] ?? 0) > 0).length;
    linhas.push({ musculo: m, series: s, meta, piso: piso(m), foco, dias: diasCom, funcoes: familiasCobertas(m, todos, melhorNivel, ctx.noLugarDe).length });
    if (s > VOLUME.teto + 1e-9) achar({ tipo: 'teto', gravidade: 'ajustar', regraId: r('volume.semanal.teto-padrao'), item: `${nomeM(m)} ${fmt(s)}`, musculo: m });
    else if (s > VOLUME.maximo[nivel] + 1e-9) achar({ tipo: 'maximo', gravidade: 'info', regraId: r('volume.semanal.maximo'), item: `${nomeM(m)} ${fmt(s)}`, musculo: m });
    // frequencia.musculo: o mínimo de dias é ceil(séries / 10), contando os dias com qualquer série (direta ou indireta).
    const minimoDias = Math.ceil(s / VOLUME.sessaoTeto - 1e-9);
    if (s > 0 && diasCom < minimoDias)
      achar({ tipo: 'frequencia', gravidade: 'ajustar', regraId: r('frequencia.musculo'), item: `${nomeM(m)} (${fmt(s)} em ${diasCom} ${plural(diasCom, 'dia', 'dias')})`, musculo: m, dado: { minimoDias } });
    const limiar = foco ? meta : piso(m);
    if (s + 1e-9 >= limiar) continue;
    const regra = foco ? 'volume.semanal.alvo' : m === 'abdomen' ? 'volume.semanal.abdomen' : 'volume.semanal.minimo-eficaz';
    const tipo: TipoDeAchado = foco ? 'abaixo-da-meta' : 'abaixo-do-piso';
    const item = `${nomeM(m)} ${fmt(s)} de ${fmt(limiar)}`;
    if (!possivelPara(m)) {
      achar({ tipo: 'sem-exercicio', gravidade: 'limite', regraId: r(regra), grupo: perdidoPelaDor(m) ? 'dor' : 'equipamento', item: nomeM(m), musculo: m });
      continue;
    }
    const sugestao = subirUma(m) ?? acrescentar(m)?.texto ?? trocarDoExcesso(m, funcoesDe(m), (exs) => (volumeDe(exs)[m] ?? 0) > s + 1e-9);
    achar({ tipo, gravidade: sugestao ? 'ajustar' : 'limite', regraId: r(regra), item, sugestao, musculo: m });
  }

  // ---- 4. funções que se complementam (selecao.exercicios-por-musculo) e isoladores obrigatórios ----
  for (const [m, familias] of Object.entries(FAMILIAS) as [Musculo, NonNullable<(typeof FAMILIAS)[Musculo]>][]) {
    const doMusculo = todos.filter((x) => contaPara(m, x.exId) && familias.some((f) => f.funcoes.some((fid) => naFuncao(FUNCAO[fid]!, x.exId))));
    if (!doMusculo.length) continue; // sem exercício: é achado de volume, não de função
    const cobertas = familiasCobertas(m, todos, melhorNivel, ctx.noLugarDe);
    if (cobertas.length >= 2) continue;
    const faltam = familias.filter((f) => !cobertas.includes(f.nome) && f.funcoes.some((fid) => melhorNivel(fid) >= 0));
    const tem = cobertas[0] ?? familias.find((f) => f.funcoes.some((fid) => naFuncao(FUNCAO[fid]!, doMusculo[0]!.exId)))!.nome;
    const item = `${nomeM(m)} só com ${tem}`;
    if (!faltam.length) {
      achar({ tipo: 'funcoes', gravidade: 'limite', regraId: r('selecao.exercicios-por-musculo'), grupo: 'equipamento', item, musculo: m });
      continue;
    }
    // Dois exercícios (ou o mesmo em dois dias) na mesma família: basta trocar um deles, sem tempo a mais.
    let sugestao: string | undefined;
    const antes = Object.fromEntries((Object.keys(FAMILIAS) as Musculo[]).map((k) => [k, familiasCobertas(k, todos, melhorNivel, ctx.noLugarDe).length]));
    const melhora = (exs: ExercicioPrescrito[]) => {
      const depois = Object.fromEntries((Object.keys(FAMILIAS) as Musculo[]).map((k) => [k, familiasCobertas(k, exs, melhorNivel, ctx.noLugarDe).length]));
      return depois[m]! > antes[m]! && Object.keys(antes).every((k) => depois[k]! >= antes[k]!);
    };
    if (doMusculo.length >= 2)
      for (const x of [...doMusculo].reverse()) {
        const di = dias.findIndex((d) => d.exercicios.includes(x));
        const d = dias[di]!;
        if (sugestao || x.supersetCom || x.dropSet) continue;
        for (const fid of faltam.flatMap((f) => f.funcoes)) {
          const achado = melhorDa(fid, (id) => d.exercicios.some((y) => y.exId === id));
          if (!achado || sugestao) continue;
          const exs = inserirNaOrdem(d.exercicios.filter((y) => y !== x), completar({ exId: achado, series: x.series, funcao: fid }, ctx));
          if (valido(di, exs) && melhora([...dias.flatMap((z, k) => (k === di ? [] : z.exercicios)), ...exs]))
            sugestao = `troque ${nomeEx(x.exId)} por ${nomeEx(achado)} no treino ${d.nome}`;
        }
      }
    sugestao ??= acrescentar(m, faltam.flatMap((f) => f.funcoes), melhora)?.texto ?? trocarDoExcesso(m, faltam.flatMap((f) => f.funcoes), melhora);
    achar({ tipo: 'funcoes', gravidade: sugestao ? 'ajustar' : 'limite', regraId: r('selecao.exercicios-por-musculo'), grupo: sugestao ? undefined : 'tempo', item, sugestao, musculo: m });
  }
  for (const f of FUNCOES.filter((x) => x.obrigatoria)) {
    if (todos.some((x) => naFuncao(f, x.exId) && (f.condicoes?.[x.exId] ?? []).every((c) => ctx.caps.has(c)))) continue;
    if (!f.niveis.flat().some((id) => ctx.naFuncao(f, id))) continue; // o equipamento (ou a dor) não permite: o gerador já avisa a lacuna
    const novo = acrescentar(f.musculo, [f.id])?.texto ?? trocarDoExcesso(f.musculo, [f.id]);
    achar({ tipo: 'obrigatorio', gravidade: novo ? 'ajustar' : 'limite', regraId: r('selecao.isolador-obrigatorio'), item: minusc(f.nome), sugestao: novo, musculo: f.musculo, dado: { funcao: f.id } });
  }

  // ---- 5. os equilíbrios (avaliador.empurrar-puxar; volume.equilibrio-coxa) ----
  const somar = (filtro: (id: string) => boolean) => todos.filter((x) => filtro(x.exId)).reduce((t, x) => t + seriesDeVolume(x), 0);
  const empurrar = somar(ehEmpurrar);
  const puxar = somar(ehPuxar);
  const podePuxar = !!ctx.resolver({ funcao: 'puxar-vertical' }) || !!ctx.resolver({ funcao: 'puxar-horizontal' });
  if (podePuxar && empurrar > EMPURRAR_PUXAR_MAX * puxar + 1e-9) {
    const sugestao =
      subirUma('costas', (x) => ehPuxar(x.exId)) ?? subirUma('ombro_posterior', (x) => ehPuxar(x.exId)) ?? descerUma((x) => ehEmpurrar(x.exId)) ?? acrescentar('costas')?.texto ?? acrescentar('ombro_posterior')?.texto;
    achar({ tipo: 'empurrar-puxar', gravidade: sugestao ? 'ajustar' : 'limite', regraId: r('avaliador.empurrar-puxar'), item: `empurrar ${fmt(empurrar)} × puxar ${fmt(puxar)}`, sugestao });
  }
  if (possivelPara('quadriceps') && possivelPara('posteriores')) {
    const q = v.quadriceps ?? 0;
    const h = v.posteriores ?? 0;
    const razao = h ? q / h : q ? Infinity : 1;
    const direto = todos.some((x) => ehPosteriorDireto(x.exId));
    if (razao < VOLUME.coxa[0] - 1e-9 || razao > VOLUME.coxa[1] + 1e-9 || !direto) {
      const maisTras = razao > 1 || !direto;
      const sugestao = maisTras
        ? (direto ? subirUma('posteriores', (x) => ehPosteriorDireto(x.exId)) : undefined) ??
          acrescentar('posteriores')?.texto ??
          trocarDoExcesso('posteriores', ['flexao-joelho', 'dobrar-quadril'], (exs) => (volumeDe(exs).posteriores ?? 0) > h) ??
          (direto ? descerUma((x) => ex(x).musculos.primarios.includes('quadriceps')) : undefined)
        : subirUma('quadriceps') ?? acrescentar('quadriceps')?.texto ?? descerUma((x) => ex(x).musculos.primarios.includes('posteriores'));
      achar({
        tipo: 'coxa',
        gravidade: sugestao ? 'ajustar' : 'limite',
        regraId: r('volume.equilibrio-coxa'),
        item: direto ? `frente da coxa ${fmt(q)} × posteriores ${fmt(h)}` : 'sem exercício direto de posteriores',
        sugestao,
        dado: direto ? {} : { semDireto: 1 },
        musculo: maisTras ? 'posteriores' : 'quadriceps',
      });
    }
  }

  // ---- 6. o tempo de cada dia (tempo.corte) e a ordem (ordem.sessao) ----
  dias.forEach((d, di) => {
    const min = minutosDoDia[di]!;
    if (min > LIMITE_DO_DIA * orcamento) {
      const sugestao = cortarNoDia(di);
      // Muito acima (mais de 25%), um corte só não resolve: o passo fala de séries e exercícios em geral.
      const grande = min > 1.25 * orcamento;
      achar({ tipo: 'tempo', gravidade: sugestao ? 'ajustar' : 'limite', regraId: r('tempo.corte'), grupo: sugestao ? (grande ? 'muito' : 'acima') : 'sem-corte', item: `${d.nome} ~${min} min`, sugestao: grande ? undefined : sugestao, dia: d.id });
    }
    else if (min > orcamento) achar({ tipo: 'tempo', gravidade: 'limite', regraId: r('tempo.corte'), item: `${d.nome} ~${min} min`, dia: d.id });
    const primeiroIsolador = d.exercicios.findIndex((x) => x.tipo === 'isolador' && x.padrao !== 'core');
    if (primeiroIsolador >= 0 && d.exercicios.slice(primeiroIsolador).some((x) => x.tipo === 'composto'))
      achar({ tipo: 'ordem', gravidade: 'info', regraId: r('ordem.sessao'), item: d.nome, dia: d.id });
  });

  const achados = agrupar(brutos, { dias: dias.length, orcamento, triagem, nivel });
  const conta = (g: Gravidade) => achados.filter((a) => a.gravidade === g).length;
  const veredito: Veredito = conta('seguranca') ? 'bloqueado' : conta('alerta') || conta('ajustar') ? 'ajustar' : conta('limite') ? 'limite' : 'bom';
  return {
    veredito,
    resumo: resumoDe(veredito, achados),
    achados,
    musculos: linhas,
    empurrar,
    puxar,
    minutos: dias.map((d, i) => ({ diaId: d.id, nome: d.nome, minutos: minutosDoDia[i]! })),
    orcamento,
  };
}



// ---------- os textos: um achado por grupo ----------

type Contexto = { dias: number; orcamento: number; triagem: ReturnType<typeof avaliarTriagem>; nivel: Nivel };
const NOME_NIVEL: Record<Nivel, string> = { iniciante: 'iniciante', intermediario: 'intermediário', avancado: 'avançado' };

function agrupar(brutos: Bruto[], c: Contexto): Achado[] {
  const grupos = new Map<string, Bruto[]>();
  for (const b of brutos) {
    const k = `${b.gravidade}|${b.tipo}|${b.grupo ?? ''}|${b.regraId}`;
    const g = grupos.get(k);
    if (g) g.push(b);
    else grupos.set(k, [b]);
  }
  const achados = [...grupos.values()].map((bs) => {
    const b0 = bs[0]!;
    const { texto, passo } = textoDoGrupo(bs, c);
    return {
      tipo: b0.tipo,
      gravidade: b0.gravidade,
      regraId: b0.regraId,
      selo: SELOS[b0.regraId]!,
      texto,
      passo,
      itens: bs.map((b) => b.item),
      musculos: [...new Set(bs.flatMap((b) => (b.musculo ? [b.musculo] : [])))],
      dias: [...new Set(bs.flatMap((b) => (b.dia ? [b.dia] : [])))],
    };
  });
  // Na ordem da gravidade; dentro dela, a ordem em que os blocos acima acharam.
  return achados.sort((a, b) => GRAVIDADES.indexOf(a.gravidade) - GRAVIDADES.indexOf(b.gravidade));
}

const NADA = 'Não precisa fazer nada';

function textoDoGrupo(bs: Bruto[], c: Contexto): { texto: string; passo: string } {
  const b = bs[0]!;
  const itens = bs.map((x) => x.item);
  const unicos = [...new Set(itens)];
  const n = unicos.length;
  const sugestoes = [...new Set(bs.flatMap((x) => (x.sugestao ? [x.sugestao] : [])))];
  const comSugestao = (padrao: string) => (sugestoes.length ? `${maiusc(lista(sugestoes.slice(0, 3)))}${sugestoes.length > 3 ? ', e assim por diante' : ''}.` : padrao);
  const semLugar = `não cabe mais em ${c.dias} ${plural(c.dias, 'treino', 'treinos')} de ${c.orcamento} min`;
  switch (b.tipo) {
    case 'triagem':
      return {
        texto: 'A triagem tem uma resposta "sim" ainda sem a liberação de um profissional.',
        passo: 'Antes de treinar, fale com um médico ou um profissional de Educação Física e confirme a liberação na triagem.',
      };
    case 'dor': {
      const regiao = b.dado!.regiao as Articulacao;
      const nota = c.triagem.dores.find((d) => d.articulacao === regiao)?.nota;
      return {
        texto: `${n} ${plural(n, 'exercício carrega', 'exercícios carregam')} a região marcada com dor ${textoDor(regiao, nota)}: ${listaCurta(unicos)}.`,
        passo: `Enquanto a dor não baixar, ${plural(n, 'ele sai', 'eles saem')} do treino${sugestoes.length ? ` (no lugar: ${listaCurta(sugestoes, 3)})` : ''}. Procure avaliação profissional.`,
      };
    }
    case 'equipamento':
      return { texto: `${maiusc(listaCurta(unicos))}: ${plural(n, 'pede', 'pedem')} equipamento que este local não tem.`, passo: `${comSugestao('Troque por um exercício do seu equipamento.')} Ou marque o equipamento no local, se ele existir.` };
    case 'evitado':
      return { texto: `Você marcou para evitar: ${listaCurta(unicos)}.`, passo: `${comSugestao('Troque por outro da mesma função.')} Ou tire a marca em Restrições.` };
    case 'complexidade':
      return {
        texto: `${maiusc(listaCurta(unicos))}: ${plural(n, 'pede', 'pedem')} mais técnica do que o nível ${NOME_NIVEL[c.nivel]}.`,
        passo: `${comSugestao('Comece por um exercício mais simples da mesma função.')} Volte a ${plural(n, 'ele', 'eles')} quando a técnica básica estiver firme.`,
      };
    case 'series-por-exercicio':
      return b.grupo === 'acima'
        ? { texto: `${n} ${plural(n, 'exercício com', 'exercícios com')} mais de 4 séries: ${listaCurta(unicos)}.`, passo: 'Acima de 4 séries, divida entre 2 exercícios diferentes ou entre 2 dias.' }
        : { texto: `${maiusc(listaCurta(unicos))} com 1 série.`, passo: 'Use de 2 a 4 séries: 1 série só não é o padrão.' };
    case 'sessao':
      return { texto: `Mais de 10 séries de um músculo no mesmo treino: ${listaCurta(unicos)}.`, passo: 'Leve parte dessas séries para outro dia: acima de 10 no mesmo treino, as séries a mais rendem pouco.' };
    case 'teto':
      return { texto: `Acima de 20 séries por semana: ${listaCurta(unicos)}.`, passo: 'Acima de 20, o ganho extra é pequeno e incerto: tire séries ou leve-as para um músculo abaixo da meta.' };
    case 'maximo':
      return { texto: `Acima do máximo do nível ${NOME_NIVEL[c.nivel]} (${VOLUME.maximo[c.nivel]} por semana): ${listaCurta(unicos)}.`, passo: `${NADA} se a recuperação estiver boa; se pesar, volte para perto de ${VOLUME.maximo[c.nivel]}.` };
    case 'frequencia':
      return { texto: `Muitas séries em poucos dias: ${listaCurta(unicos)}.`, passo: 'Divida as séries em mais dias: até 10 séries de um músculo por treino.' };
    case 'abaixo-da-meta':
      return b.gravidade === 'ajustar'
        ? { texto: `Foco abaixo da meta: ${listaCurta(unicos)} séries por semana.`, passo: comSugestao('Acrescente séries desse músculo.') }
        : { texto: `Foco abaixo da meta: ${listaCurta(unicos)} séries por semana; ${semLugar}.`, passo: `${NADA}: o resto do programa segue. Para chegar lá, mais minutos, mais dias ou menos grupos de foco.` };
    case 'abaixo-do-piso':
      return b.gravidade === 'ajustar'
        ? { texto: `Abaixo do mínimo que faz crescer: ${listaCurta(unicos)} séries por semana.`, passo: comSugestao('Acrescente séries desse músculo.') }
        : { texto: `Abaixo do mínimo que faz crescer: ${listaCurta(unicos)} séries por semana; ${semLugar}.`, passo: `${NADA}: o resto do programa segue. Para chegar lá, mais minutos ou mais dias.` };
    case 'sem-exercicio':
      return b.grupo === 'dor'
        ? { texto: `Sem exercício possível hoje para ${lista(unicos)}, por causa da dor.`, passo: `${NADA} agora: quando a dor baixar, atualize a nota na triagem e o programa volta a ter ${plural(n, 'esse músculo', 'esses músculos')}.` }
        : { texto: `O seu equipamento não tem exercício para ${lista(unicos)}.`, passo: `${NADA}: o resto do programa compensa o que dá.` };
    case 'funcoes':
      return b.gravidade === 'ajustar'
        ? { texto: `Um movimento só para o músculo: ${listaCurta(unicos)}.`, passo: `${comSugestao('Acrescente um exercício de outra função.')} Movimentos diferentes crescem partes diferentes do músculo.` }
        : b.grupo === 'equipamento'
          ? { texto: `Um movimento só para o músculo: ${listaCurta(unicos)}; o seu equipamento não abre outro.`, passo: `${NADA}: o volume da semana é o que mais conta.` }
          : { texto: `Um movimento só para o músculo: ${listaCurta(unicos)}; ${semLugar}.`, passo: `${NADA}: o volume da semana é o que mais conta. Com mais minutos, entra outro movimento.` };
    case 'obrigatorio': {
      const cobre = [...new Set(bs.map((x) => COBRE[x.dado!.funcao as string]!))];
      return b.gravidade === 'ajustar'
        ? { texto: `Falta ${lista(unicos)}: cobre ${lista(cobre)}.`, passo: comSugestao('Acrescente esse exercício.') }
        : { texto: `Falta ${lista(unicos)} (cobre ${lista(cobre)}); ${semLugar}.`, passo: `${NADA}: com mais minutos, ${plural(n, 'ele entra', 'eles entram')}.` };
    }
    case 'empurrar-puxar':
      return b.gravidade === 'ajustar'
        ? { texto: `O ombro está desequilibrado: ${itens[0]} séries por semana (até 1,5 de empurrar para 1 de puxar).`, passo: comSugestao('Acrescente séries de puxar.') }
        : { texto: `Mais empurrar que puxar: ${itens[0]} séries por semana (o equilíbrio pede até 1,5 para 1); ${semLugar}.`, passo: `${NADA} agora. Para equilibrar, escolha também costas como foco ou mais minutos.` };
    case 'coxa': {
      const fato = b.dado?.semDireto ? 'nenhum exercício direto para a parte de trás da coxa (flexão de joelho ou stiff)' : `${itens[0]} séries por semana (a faixa é de metade ao dobro)`;
      return b.gravidade === 'ajustar'
        ? { texto: `A coxa está desequilibrada: ${fato}.`, passo: comSugestao('Equilibre a frente e a parte de trás da coxa.') }
        : { texto: `A coxa fica desequilibrada: ${fato}; ${semLugar}.`, passo: `${NADA} agora; com mais minutos, entra trabalho para a parte de trás da coxa.` };
    }
    case 'tempo':
      return b.gravidade === 'ajustar' && b.grupo === 'muito'
        ? { texto: `Bem mais longo que os ${c.orcamento} min: ${listaCurta(unicos)}.`, passo: 'Use até 4 séries por exercício e tire os exercícios repetidos de quem não é foco; ou escolha mais minutos.' }
        : b.gravidade === 'ajustar'
        ? { texto: `Mais longo que os ${c.orcamento} min: ${listaCurta(unicos)}.`, passo: `${comSugestao('Tire um exercício de quem não é foco.')} Ou escolha mais minutos.` }
        : b.grupo === 'sem-corte'
          ? { texto: `Mais longo que os ${c.orcamento} min: ${listaCurta(unicos)}; o que ficou segura o mínimo de cada músculo.`, passo: `${NADA} além de reservar uns minutos a mais nesses dias, ou escolher uma duração maior.` }
          : { texto: `Um pouco acima dos ${c.orcamento} min: ${listaCurta(unicos)}.`, passo: `${NADA}: fica dentro de 10% a mais. Se o tempo apertar no dia, faça dois exercícios em sequência (bi-set).` };
    case 'ordem':
      return { texto: `Isolador antes de um exercício grande: ${listaCurta(unicos)}.`, passo: `${NADA}: a ordem quase não muda o crescimento; os grandes primeiro ganham mais força.` };
  }
}

const NOME_GRAVIDADE: Record<Gravidade, [string, string]> = {
  seguranca: ['ponto de segurança', 'pontos de segurança'],
  alerta: ['alerta', 'alertas'],
  ajustar: ['ponto a ajustar', 'pontos a ajustar'],
  limite: ['limite do equipamento ou do tempo', 'limites do equipamento ou do tempo'],
  info: ['informação', 'informações'],
};

function resumoDe(veredito: Veredito, achados: Achado[]): string {
  const conta = (g: Gravidade) => achados.filter((a) => a.gravidade === g).length;
  const partes = (gs: Gravidade[]) => gs.filter((g) => conta(g)).map((g) => `${conta(g)} ${NOME_GRAVIDADE[g][conta(g) === 1 ? 0 : 1]}`);
  if (veredito === 'bom') return 'Está bom: nada a ajustar.';
  if (veredito === 'limite') return `Está bom dentro do que o seu equipamento e o seu tempo permitem: ${lista(partes(['limite']))}, sem nada a fazer.`;
  if (veredito === 'bloqueado') return `Segurança primeiro: ${lista(partes(['seguranca', 'alerta', 'ajustar']))}.`;
  return `Dá para melhorar: ${lista(partes(['alerta', 'ajustar']))}.`;
}

// ---------- os avisos do gerador ----------

/**
 * O gerador já avisa este achado? (Para o teste de propriedade e a auditoria: o avaliador não pode achar um "ajustar"
 * num programa gerado que o gerador não avise.) Volume abaixo da meta ou do piso: um aviso de meta, de tempo ou de focos
 * que competem cita o músculo. Tempo: o aviso de tempo.corte do dia.
 */
export function avisadoPeloGerador(a: Achado, avisos: Porque[], nomesDosDias: Record<string, string>): boolean {
  if (a.tipo === 'abaixo-da-meta' || a.tipo === 'abaixo-do-piso' || a.tipo === 'sem-exercicio')
    return a.musculos.every((m) =>
      avisos.some((x) => (ehAvisoDeMeta(x) || x.regraId === 'tempo.corte' || x.regraId === 'volume.prioridade.competicao') && (musculosDoAviso(x).includes(m) || x.texto.includes(NOME_MUSCULO_CURTO[m]))),
    );
  if (a.tipo === 'tempo') return a.dias.every((id) => avisos.some((x) => x.regraId === 'tempo.corte' && x.texto.startsWith(`${nomesDosDias[id]}:`)));
  return false;
}

import { BIBLIOTECA, MUSCULOS, type Articulacao, type Exercicio, type Musculo, type Padrao } from '../biblioteca';
import { DESCANSO, READAPTACAO, RIR, TEMPO, VOLUME, NIVEL_COMPLEXIDADE_MAX, exerciciosPorSessao, r, type Nivel } from '../regras';
import { capacidades, cargaMaxHalter, cargasHalter, cargasKettlebell, ITENS, type Inventario, type ItemId } from '../taxonomia/equipamentos';
import { avaliarTriagem, type ResultadoTriagem, type Triagem } from '../triagem';
import { divisaoEscolhida, type DiasSemana, type Divisao, type DivisaoId, type Vaga } from './divisoes';
import { FUNCAO, funcoesDoExercicio, type Funcao } from './funcoes';

// Gerador de programa: função pura e determinística (mesma entrada → mesma saída).
// Cada decisão grava o id da regra de docs/pesquisa/regras.md que a justifica.

export const GRUPOS = {
  peito: ['peito'],
  costas: ['costas'],
  ombros: ['ombro_lateral'],
  bracos: ['biceps', 'triceps'],
  pernas: ['quadriceps', 'posteriores', 'panturrilha'],
  gluteos: ['gluteos'],
  abdomen: ['abdomen'],
} as const satisfies Record<string, readonly Musculo[]>;
export type Grupo = keyof typeof GRUPOS;

export type Perfil = {
  nivel: Nivel;
  /** Semanas sem treinar antes de começar (readaptacao.gatilho). */
  semanasParado: number;
  diasSemana: DiasSemana;
  /** Divisão escolhida pela pessoa (divisao.recomendacao); sem escolha, vale a recomendada. */
  divisao?: DivisaoId;
  minutosSessao: number;
  prioridades: Grupo[];
  evitarExercicios: string[];
  evitarEquipamentos: ItemId[];
  dores: { articulacao: Articulacao; intensidade: number }[];
  triagem: Triagem;
};

export type Porque = { regraId: string; texto: string };

export type ExercicioPrescrito = {
  exId: string;
  nome: string;
  padrao: Padrao;
  tipo: Exercicio['tipo'];
  /** Função da vaga que o exercício preenche (selecao.funcao-da-vaga). */
  funcao?: string;
  series: number;
  reps: [number, number];
  rir: [number, number];
  descansoSeg: number;
  unilateral: boolean;
  animacaoId: string | null;
  supersetCom?: string;
  /** Última série em drop set (tempo.drop-set): conta como 2 séries no volume. */
  dropSet?: boolean;
  alternativas: string[];
  porque: Porque[];
};

export type DiaPrograma = { id: string; nome: string; exercicios: ExercicioPrescrito[]; minutosEstimados: number };

export type Fase = { semanas: string; fatorSeries: number; rir: [number, number] | null; texto: string; regraId: string };

export type Programa = {
  versao: 1;
  entradasHash: string;
  divisao: string;
  divisaoId?: DivisaoId;
  dias: DiaPrograma[];
  volumeSemanal: Partial<Record<Musculo, number>>;
  metas: Partial<Record<Musculo, number>>;
  fases: Fase[];
  avisos: Porque[];
  porque: Porque[];
  regioesExcluidas: Articulacao[];
};

export type Resultado = { status: 'bloqueado'; triagem: ResultadoTriagem } | { status: 'ok'; programa: Programa; triagem: ResultadoTriagem };

export const MUSCULOS_COM_META = MUSCULOS.filter((m) => m !== 'ombro_anterior' && m !== 'adutores');

/** Séries que contam no volume: a última série em drop set vale 2 (tempo.drop-set). */
export const seriesDeVolume = (x: { series: number; dropSet?: boolean }) => x.series + (x.dropSet ? 1 : 0);

const estavel = (e: Exercicio) => e.tags.some((t) => t === 'estavel' || t === 'apoiado' || t === 'maquina');

/** Metas semanais por músculo (volume.semanal.alvo; volume.semanal.minimo-eficaz). */
export function metasDoPerfil(nivel: Nivel, prioridades: Grupo[]): Partial<Record<Musculo, number>> {
  const prioritarios = new Set<Musculo>(prioridades.flatMap((g) => GRUPOS[g]));
  const metas: Partial<Record<Musculo, number>> = {};
  for (const m of MUSCULOS_COM_META)
    metas[m] = prioritarios.has(m) ? VOLUME.alvo[nivel] : m === 'abdomen' ? VOLUME.minimoEficazPiso : VOLUME.minimoEficaz;
  return metas;
}
export const metaMaxima = (nivel: Nivel, prioridades: Grupo[]) => Math.max(...Object.values(metasDoPerfil(nivel, prioridades)));

export function gerarPrograma(perfil: Perfil, inventarioOriginal: Inventario): Resultado {
  const triagem = avaliarTriagem(perfil.triagem);
  if (triagem.bloqueado) return { status: 'bloqueado', triagem };

  const nivel = perfil.nivel;
  const inventario = semItens(inventarioOriginal, perfil.evitarEquipamentos);
  const caps = capacidades(inventario);
  const regioesExcluidas = [
    ...new Set([...triagem.regioesExcluidas, ...perfil.dores.filter((d) => d.intensidade > 5).map((d) => d.articulacao)]),
  ].sort();
  const dorLeve = new Set(perfil.dores.filter((d) => d.intensidade >= 3 && d.intensidade <= 5).map((d) => d.articulacao));
  const grupos = new Set<Grupo>(perfil.prioridades);
  const prioritarios = new Set<Musculo>(perfil.prioridades.flatMap((g) => GRUPOS[g]));
  const avisos: Porque[] = [];
  const metas = metasDoPerfil(nivel, perfil.prioridades);

  // 2. Divisão escolhida entre opções equivalentes (divisao.*)
  const { divisao, escolhida } = divisaoEscolhida(perfil.diasSemana, metaMaxima(nivel, perfil.prioridades), perfil.divisao);

  // 1. Exercícios possíveis
  const possiveis = BIBLIOTECA.filter(
    (e) =>
      e.requer.some((grupo) => grupo.every((c) => caps.has(c))) &&
      !perfil.evitarExercicios.includes(e.id) &&
      e.complexidade <= NIVEL_COMPLEXIDADE_MAX[nivel] &&
      !e.articulacoes.some((a) => regioesExcluidas.includes(a)),
  );
  const possivel = new Map(possiveis.map((e) => [e.id, e]));
  /** O exercício vale na função: é possível e cumpre as condições dela (funcoes.json, campo condicoes). */
  const naFuncao = (f: Funcao, id: string) => possivel.has(id) && (f.condicoes?.[id] ?? []).every((c) => caps.has(c));

  // Desempate dentro do mesmo nível da função (selecao.funcao-da-vaga): dor leve desfavorece; estabilidade
  // só para iniciante; carga possível; variedade entre os dias; com animação aprovada; por fim o id, só para
  // o resultado ser estável (sem preferência).
  const halterMax = cargaMaxHalter(inventario);
  const kettlebellMax = cargasKettlebell(inventario).at(-1) ?? 0;
  // O graviton (assistida) não passa do peso do corpo: conta como o peso do corpo.
  const cargaPossivel = (e: Exercicio) =>
    e.carga === 'peso-corpo' || e.carga === 'elastico' || e.carga === 'assistida'
      ? 0
      : (e.carga === 'halter' && halterMax < 20) || (e.carga === 'kettlebell' && kettlebellMax < 20)
        ? 1
        : 2;
  const usos = new Map<string, number>();
  const chave = (e: Exercicio) => [
    e.articulacoes.some((a) => dorLeve.has(a)) ? 1 : 0,
    nivel === 'iniciante' && !estavel(e) ? 1 : 0,
    -cargaPossivel(e),
    usos.get(e.id) ?? 0,
    e.animacaoId ? 0 : 1, // entre equivalentes, o que o guia já mostra animado (CLAUDE.md, qualidade do guia)
  ];
  const comparar = (a: Exercicio, b: Exercicio) => {
    const [ka, kb] = [chave(a), chave(b)];
    for (let i = 0; i < ka.length; i++) if (ka[i] !== kb[i]) return ka[i]! - kb[i]!;
    return a.id.localeCompare(b.id);
  };

  /** 1º nível com exercício possível; se nada, a função substituta (seNada). */
  const resolver = (vaga: Vaga): { funcao: Funcao; nivel: number } | null => {
    for (const f of [FUNCAO[vaga.funcao]!, ...(FUNCAO[vaga.funcao]!.seNada ? [FUNCAO[FUNCAO[vaga.funcao]!.seNada!]!] : [])]) {
      const n = f.niveis.findIndex((ids) => ids.some((id) => naFuncao(f, id)));
      if (n >= 0) return { funcao: f, nivel: n };
    }
    return null;
  };

  // 4. Preenchimento das vagas por função
  const N = exerciciosPorSessao(perfil.minutosSessao);
  const ativa = (v: Vaga) => !v.prioridade || v.prioridade.some((g) => grupos.has(g));
  const lacunas = new Set<string>();
  const nivelAbaixo = new Set<string>();
  const foraPorMinutos = new Set<Musculo>();
  type Item = { ex: Exercicio; vaga: Vaga; funcao: Funcao; nivelFuncao: number; series: number; ordemVaga: number };
  const dias = divisao.dias.map((dia) => {
    const resolvidas = dia.vagas.filter(ativa).map((vaga, ordem) => ({ vaga, ordem, res: resolver(vaga) }));
    for (const x of resolvidas) if (!x.res) lacunas.add(x.vaga.funcao);
    const comExercicio = resolvidas.filter((x): x is typeof x & { res: NonNullable<typeof x.res> } => !!x.res);
    // Quais vagas cabem nos minutos: as vagas-base e as dos grupos prioritários, na ordem do modelo do dia
    // (que já é a de importância); os complementos não prioritários só entram se sobrar espaço.
    const rank = (x: (typeof comExercicio)[number]) =>
      x.vaga.complemento && !prioritarios.has(x.res.funcao.musculo) && !x.vaga.prioridade?.some((g) => grupos.has(g)) ? 1 : 0;
    // Os isoladores obrigatórios entram sempre que houver (selecao.isolador-obrigatorio); o resto preenche até N.
    const obrigatorias = comExercicio.filter((x) => x.res.funcao.obrigatoria);
    const mantidas = [
      ...obrigatorias,
      ...comExercicio
        .filter((x) => !x.res.funcao.obrigatoria)
        .sort((a, b) => rank(a) - rank(b) || a.ordem - b.ordem)
        .slice(0, Math.max(0, N - obrigatorias.length)),
    ];
    for (const x of comExercicio) if (!mantidas.includes(x)) foraPorMinutos.add(x.res.funcao.musculo);
    const itens: Item[] = [];
    for (const x of mantidas.sort((a, b) => a.ordem - b.ordem)) {
      const { funcao } = x.res;
      let escolhido: Exercicio | undefined;
      let nivelFuncao = x.res.nivel;
      for (; nivelFuncao < funcao.niveis.length && !escolhido; nivelFuncao++) {
        const cands = funcao.niveis[nivelFuncao]!.filter((id) => naFuncao(funcao, id))
          .map((id) => possivel.get(id))
          .filter((e): e is Exercicio => !!e && !itens.some((i) => i.ex.id === e.id));
        escolhido = cands.sort(comparar)[0];
      }
      nivelFuncao--;
      if (!escolhido) continue;
      if (nivelFuncao > 0 && funcao.semNivel1) nivelAbaixo.add(funcao.semNivel1);
      usos.set(escolhido.id, (usos.get(escolhido.id) ?? 0) + 1);
      itens.push({ ex: escolhido, vaga: x.vaga, funcao, nivelFuncao, series: VOLUME.seriesPorExercicio.min, ordemVaga: x.ordem });
    }
    return { dia, itens };
  });

  if (nivelAbaixo.has('equipamento.sem-puxada-vertical'))
    avisos.push({
      regraId: r('equipamento.sem-puxada-vertical'),
      texto: 'Sem barra fixa nem polia alta: o volume de costas vem de remadas. É uma lacuna conhecida; a evidência para substituir a puxada é fraca.',
    });
  const temMaquinaDePerna = caps.has('leg_press') || caps.has('rack');
  if (!temMaquinaDePerna && halterMax < 20)
    avisos.push({
      regraId: r('equipamento.escada-carga-leve'),
      texto: 'Carga limitada para pernas: o programa usa exercícios unilaterais, repetições mais altas (até ~30) e técnicas de dificuldade antes de pedir mais carga. Quadríceps e posteriores tendem a crescer menos que numa academia completa.',
    });
  for (const id of [...lacunas].sort()) {
    const l = FUNCAO[id]!.lacuna;
    if (l) avisos.push({ regraId: r(l.regra), texto: `Sem ${l.falta}: ${l.texto}` });
  }

  // 3. Distribuição das séries até as metas (volume.semanal.*; volume.sessao.teto; volume.series-por-exercicio)
  const todos = dias.flatMap((d, di) => d.itens.map((it) => ({ it, di })));
  const volume = () => volumePorMusculo(todos.map(({ it }) => ({ ex: it.ex, series: it.series })));
  const volumeNoDia = (di: number, m: Musculo) =>
    volumePorMusculo(dias[di]!.itens.map((it) => ({ ex: it.ex, series: it.series })))[m] ?? 0;
  for (;;) {
    const v = volume();
    const candidatos = MUSCULOS_COM_META.map((m) => {
      const vagas = todos.filter(
        ({ it, di }) =>
          it.ex.musculos.primarios.includes(m) && it.series < VOLUME.seriesPorExercicio.max && volumeNoDia(di, m) + 1 <= VOLUME.sessaoTeto,
      );
      return { m, deficit: ((metas[m] ?? 0) - (v[m] ?? 0)) / (metas[m] ?? 1), vagas };
    }).filter((c) => c.deficit > 0 && c.vagas.length);
    if (!candidatos.length) break;
    candidatos.sort((a, b) => b.deficit - a.deficit || MUSCULOS.indexOf(a.m) - MUSCULOS.indexOf(b.m));
    const { vagas } = candidatos[0]!;
    vagas.sort((a, b) => a.it.series - b.it.series || a.di - b.di || a.it.ordemVaga - b.it.ordemVaga);
    vagas[0]!.it.series++;
  }

  // 6. Ordem dentro da sessão (ordem.sessao)
  for (const d of dias)
    d.itens.sort((a, b) => {
      const k = (i: Item) => [
        i.ex.padrao === 'core' ? 1 : 0,
        i.ex.tipo === 'composto' ? 0 : 1,
        i.ex.musculos.primarios.some((m) => prioritarios.has(m)) ? 0 : 1,
      ];
      const [ka, kb] = [k(a), k(b)];
      for (let j = 0; j < ka.length; j++) if (ka[j] !== kb[j]) return ka[j]! - kb[j]!;
      return a.ordemVaga - b.ordemVaga;
    });

  // 7. Prescrição
  const prescrever = (it: Item): ExercicioPrescrito => {
    const e = it.ex;
    const composto = e.tipo === 'composto';
    return {
      exId: e.id,
      nome: e.nome,
      padrao: e.padrao,
      tipo: e.tipo,
      funcao: it.funcao.id,
      series: it.series,
      reps: e.faixaReps,
      rir: composto ? RIR.composto[nivel] : RIR.isolador[nivel],
      descansoSeg: composto ? DESCANSO.composto[nivel] : DESCANSO.isolador[nivel],
      unilateral: e.unilateral,
      animacaoId: e.animacaoId,
      alternativas: alternativas(e, it.funcao, possiveis.filter((x) => !funcaoTemExercicio(it.funcao, x.id) || naFuncao(it.funcao, x.id))),
      porque: porqueDoExercicio(e, it.funcao, it.nivelFuncao, nivel),
    };
  };
  let programaDias: DiaPrograma[] = dias.map(({ dia, itens }) => {
    const exercicios = itens.map(prescrever);
    return { id: dia.id, nome: dia.nome, exercicios, minutosEstimados: minutos(exercicios) };
  });

  // 5. Orçamento de tempo (tempo.corte)
  const volumeDe = (ds: DiaPrograma[]) =>
    volumePorMusculo(ds.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID_BIB[x.exId]!, series: seriesDeVolume(x) }))));
  const volumeAntesDoCorte = volumeDe(programaDias);
  const cargasDeHalter = cargasHalter(inventario).length;
  const cargasDeKettlebell = cargasKettlebell(inventario).length;
  const podeDrop = (x: ExercicioPrescrito) => {
    const c = POR_ID_BIB[x.exId]!.carga;
    return (
      x.tipo === 'isolador' &&
      (c === 'maquina' || c === 'polia' || c === 'anilha' || (c === 'halter' && cargasDeHalter >= 2) || (c === 'kettlebell' && cargasDeKettlebell >= 2))
    );
  };
  programaDias = cortarTempo(programaDias, perfil.minutosSessao, metas, nivel, prioritarios, avisos, podeDrop);

  const volumeSemanal = volumeDe(programaDias);
  const vezes = (m: Musculo) => programaDias.filter((d) => d.exercicios.some((x) => POR_ID_BIB[x.exId]!.musculos.primarios.includes(m))).length;
  const motivoEstrutural = (m: Musculo): string => {
    const faltas = [...lacunas].map((id) => FUNCAO[id]!).filter((f) => f.musculo === m && f.lacuna).map((f) => f.lacuna!.falta);
    const falta = faltas.length ? ` (falta ${faltas.join(' e ')})` : '';
    if (!possiveis.some((e) => e.musculos.primarios.includes(m))) return `nenhum exercício possível com o seu equipamento${falta}`;
    if (foraPorMinutos.has(m))
      return `com ${perfil.minutosSessao} min cabem cerca de ${N} exercícios por treino, e as vagas próprias ficaram de fora${falta}`;
    const n = vezes(m);
    if (n === 0) return `a divisão ${divisao.nome} não tem vaga própria para este músculo (só séries indiretas)${falta}`;
    return `a divisão ${divisao.nome} treina este músculo ${n}x por semana e, com até ${VOLUME.seriesPorExercicio.max} séries por exercício e ${VOLUME.sessaoTeto} por sessão, não cabe mais${falta}`;
  };
  avisos.push(...avisosDeMeta(metas, volumeAntesDoCorte, volumeSemanal, prioritarios, motivoEstrutural));

  const porque: Porque[] = [
    {
      regraId: r('divisao.recomendacao'),
      texto: escolhida
        ? `${divisao.nome}: a divisão que você escolheu entre as opções equivalentes para ${perfil.diasSemana} dias.`
        : `${divisao.nome}: a recomendada para ${perfil.diasSemana} dias (você pode escolher outra na rotina).`,
    },
    {
      regraId: r('divisao.equivalencia'),
      texto: 'Com o mesmo volume semanal, as divisões rendem o mesmo crescimento; a escolha é pelo encaixe na sua rotina.',
    },
    { regraId: r('frequencia.musculo'), texto: frequenciaTexto(divisao) },
    {
      regraId: r('tempo.exercicios-por-sessao'),
      texto: `Com ${perfil.minutosSessao} min por treino, cabem cerca de ${N} exercícios.`,
    },
    {
      regraId: r('selecao.funcao-da-vaga'),
      texto: 'Cada vaga pede uma função (por exemplo, "tríceps com o braço acima da cabeça"), não um aparelho: máquina e peso livre valem o mesmo.',
    },
    {
      regraId: r('volume.semanal.alvo'),
      texto: `Grupos prioritários com ~${VOLUME.alvo[nivel]} séries semanais; os demais no mínimo eficaz (${VOLUME.minimoEficaz}).`,
    },
    { regraId: r('volume.serie-indireta.peso'), texto: 'Séries indiretas (ex.: remada para o bíceps) contam como meia série.' },
    { regraId: r('rir.serie-efetiva'), texto: `Só contam séries de trabalho com até ${RIR.serieEfetivaMax} repetições de reserva.` },
    {
      regraId: r('ordem.sessao'),
      texto: 'Ordem da sessão: multiarticulares primeiro, depois os grupos que você priorizou, core por último. A ordem quase não muda a hipertrofia.',
    },
    { regraId: r('selecao.manter-no-bloco'), texto: 'Os exercícios ficam os mesmos por 4 a 8 semanas; o programa só muda quando você pede.' },
  ];

  return {
    status: 'ok',
    triagem,
    programa: {
      versao: 1,
      entradasHash: hash(JSON.stringify([perfil, inventarioOriginal])),
      divisao: divisao.nome,
      divisaoId: divisao.id,
      dias: programaDias,
      volumeSemanal,
      metas,
      fases: fases(perfil),
      avisos,
      porque,
      regioesExcluidas,
    },
  };
}

function frequenciaTexto(d: Divisao): string {
  if (d.classica) return `${d.nome}: cada músculo treina 1 vez por semana; faltar a um dia tira a semana inteira daquele músculo.`;
  return `${d.nome}: cada músculo treina cerca de ${d.frequencia.replace('~', '')} vezes por semana.`;
}

const POR_ID_BIB: Record<string, Exercicio> = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));

export function volumePorMusculo(lista: { ex: Exercicio; series: number }[]): Partial<Record<Musculo, number>> {
  const v: Partial<Record<Musculo, number>> = {};
  for (const { ex, series } of lista) {
    for (const m of ex.musculos.primarios) v[m] = (v[m] ?? 0) + series;
    for (const m of ex.musculos.secundarios) v[m] = (v[m] ?? 0) + series * VOLUME.pesoIndireta;
  }
  return v;
}

function semItens(inv: Inventario, evitar: ItemId[]): Inventario {
  return Object.fromEntries(Object.entries(inv).filter(([k]) => !evitar.includes(k as ItemId) && k in ITENS)) as Inventario;
}

/** "Outro equipamento": outro tipo de carga, ou outra máquina (metas do R0). Máquina de anilha e graviton também são máquinas. */
export const equipamentoDe = (e: Exercicio) =>
  e.carga === 'maquina' || e.carga === 'anilha' || e.carga === 'assistida' ? `maquina:${e.requer[0]!.join('+')}` : e.carga;

const funcaoTemExercicio = (f: Funcao, id: string) => f.niveis.some((n) => n.includes(id));

/** Quantas alternativas a tela mostra de saída; as outras ficam em "ver mais" (decisão do Gustavo, 01/11/2026). */
export const ALTERNATIVAS_A_MOSTRA = 3;
/**
 * Alternativas (selecao.equivalencia): todas as possíveis da mesma função, de outro equipamento primeiro e depois
 * pelo nível; se houver menos de 2 de outro equipamento, entram as do mesmo músculo, de outro equipamento.
 * A tela mostra as 3 primeiras e guarda o resto em "ver mais": assim todo exercício possível aparece em algum lugar.
 */
function alternativas(e: Exercicio, funcao: Funcao, possiveis: Exercicio[]): string[] {
  const nivelDe = (id: string) => funcao.niveis.findIndex((n) => n.includes(id));
  const outro = (x: Exercicio) => (equipamentoDe(x) !== equipamentoDe(e) ? 0 : 1);
  const mesmaFuncao = possiveis
    .filter((x) => x.id !== e.id && nivelDe(x.id) >= 0)
    .sort((a, b) => outro(a) - outro(b) || nivelDe(a.id) - nivelDe(b.id) || a.id.localeCompare(b.id));
  const ids = mesmaFuncao.map((x) => x.id);
  const deOutro = mesmaFuncao.filter((x) => outro(x) === 0).length;
  if (deOutro < 2) {
    const mesmoMusculo = possiveis
      .filter((x) => x.id !== e.id && !ids.includes(x.id) && x.musculos.primarios.includes(funcao.musculo) && outro(x) === 0)
      .sort((a, b) => Number(a.tipo !== e.tipo) - Number(b.tipo !== e.tipo) || a.id.localeCompare(b.id));
    // Do mesmo músculo, de outro equipamento, entram antes das da mesma função com o mesmo equipamento.
    const daFuncaoOutro = mesmaFuncao.filter((x) => outro(x) === 0).map((x) => x.id);
    const daFuncaoMesmo = mesmaFuncao.filter((x) => outro(x) === 1).map((x) => x.id);
    return [...daFuncaoOutro, ...mesmoMusculo.slice(0, 2 - deOutro).map((x) => x.id), ...daFuncaoMesmo];
  }
  return ids;
}

const TEXTO_REGRA_FUNCAO: Record<string, (e: Exercicio) => string | null> = {
  'selecao.peitoral-inclinado': (e) => (e.tags.includes('inclinado') ? 'Variação inclinada para a parte de cima do peitoral.' : null),
  'selecao.triceps-acima-cabeca': () => 'Braço acima da cabeça para alongar a cabeça longa do tríceps.',
  'selecao.flexora-sentada': (e) => (e.tags.includes('sentada') ? 'Flexão de joelho sentada, com o posterior mais alongado.' : null),
  'selecao.panturrilha-alongada': (e) =>
    e.tags.includes('alongado') ? 'Ênfase no alongamento: calcanhar abaixo do apoio e pausa embaixo.' : null,
  'selecao.alongado': () => 'Na função, vem primeiro a opção com o músculo mais alongado, que cresceu mais nos estudos.',
  'selecao.isolador-obrigatorio': () => 'Isolador que cobre o que os multiarticulares não cobrem (o reto femoral, na frente da coxa).',
  'selecao.gluteo': () => 'Glúteo: depois do agachar e do afundo, a extensão de quadril e, como complemento, a abdução.',
  'selecao.crucifixo-complemento': () => 'Complemento do peito com o músculo alongado.',
  'selecao.mergulho': (e) =>
    e.id === 'mergulho' ? 'Mergulho nas paralelas: exige mais do ombro, por isso só a partir do intermediário e atrás dos supinos.' : null,
  'selecao.aducao-complemento': () => 'Complemento opcional para a parte de dentro da coxa (adutores), porque pernas ou glúteos são prioridade.',
};

function porqueDoExercicio(e: Exercicio, funcao: Funcao, nivelFuncao: number, nivel: Nivel): Porque[] {
  const p: Porque[] = [
    {
      regraId: r('selecao.funcao-da-vaga'),
      texto:
        nivelFuncao === 0
          ? `Vaga de ${funcao.nome.toLowerCase()}: entre as opções equivalentes, a que melhor cabe no seu equipamento.`
          : `Vaga de ${funcao.nome.toLowerCase()}: sem as opções preferidas no seu equipamento, entra a melhor possível.`,
    },
  ];
  for (const id of funcao.regras) {
    const texto = TEXTO_REGRA_FUNCAO[id]?.(e);
    if (texto) p.push({ regraId: r(id), texto });
  }
  if (nivel === 'iniciante' && estavel(e)) p.push({ regraId: r('selecao.estabilidade'), texto: 'Exercício estável e apoiado, mais fácil de aprender.' });
  if (e.tags.includes('montagem'))
    p.push({ regraId: r('seguranca.montagem'), texto: 'Antes da 1ª série, monte com segurança: travas, apoios e ancoragem, como no cartão do exercício.' });
  p.push({ regraId: r('selecao.equivalencia'), texto: 'As alternativas fazem a mesma função; dá para trocar se o aparelho estiver ocupado.' });
  p.push({
    regraId: r('reps.faixa.por-tipo'),
    texto: e.tipo === 'composto' ? 'Multiarticular: faixa de repetições mais baixa.' : 'Isolador: faixa de repetições mais alta.',
  });
  p.push({ regraId: r('rir.alvo'), texto: 'Terminar a série perto da falha, sem precisar chegar nela.' });
  p.push({
    regraId: r('descanso.por-tipo'),
    texto: e.tipo === 'composto' ? 'Descanso de 1 min 45 s: acima de ~90 s, descansar mais não rende mais crescimento.' : 'Descanso de 1 min 15 s entre as séries.',
  });
  return p;
}

// Duração estimada (tempo.serie, tempo.transicao, tempo.aquecimento, tempo.colchao, tempo.superserie, tempo.drop-set).
export function minutos(exs: ExercicioPrescrito[]): number {
  let seg = 0;
  const aquecidos = new Set<string>();
  const serie = (x: ExercicioPrescrito) => (((x.reps[0] + x.reps[1]) / 2) * TEMPO.segPorRep + TEMPO.preparoSerie) * (x.unilateral ? 2 : 1);
  const drop = (x: ExercicioPrescrito) => (x.dropSet ? TEMPO.dropSet * (x.unilateral ? 2 : 1) : 0);
  exs.forEach((x, i) => {
    const par = x.supersetCom ? exs.find((y) => y.exId === x.supersetCom) : undefined;
    if (par && exs.indexOf(par) < i) return; // já contado junto com o par
    if (i > 0) seg += TEMPO.transicao;
    for (const y of par ? [x, par] : [x]) {
      const e = POR_ID_BIB[y.exId]!;
      if (y.tipo === 'composto' && !e.musculos.primarios.some((m) => aquecidos.has(m))) {
        // tempo.aquecimento: completo no 1º multiarticular de cada região (superior/inferior), curto nos seguintes.
        // Valor a recalibrar com o tempo real registrado no app (R2).
        const regiao = e.musculos.primarios.some((m) => INFERIORES.includes(m)) ? 'inferior' : 'superior';
        seg += aquecidos.has(regiao) ? TEMPO.aquecimentoCurto : TEMPO.aquecimento;
        aquecidos.add(regiao);
        e.musculos.primarios.forEach((m) => aquecidos.add(m));
      }
    }
    if (par) {
      const n = Math.max(x.series, par.series);
      seg += n * (serie(x) + serie(par) + TEMPO.superserieEntre) + (n - 1) * Math.max(x.descansoSeg, par.descansoSeg) + drop(x) + drop(par);
    } else seg += x.series * serie(x) + (x.series - 1) * x.descansoSeg + drop(x);
  });
  return Math.round((seg * (1 + TEMPO.colchao)) / 60);
}

const INFERIORES: Musculo[] = ['quadriceps', 'posteriores', 'gluteos', 'panturrilha'];
export const NOME_MUSCULO: Record<Musculo, string> = {
  peito: 'peito',
  costas: 'costas',
  ombro_anterior: 'ombro (frente)',
  ombro_lateral: 'ombro (lateral)',
  ombro_posterior: 'ombro (posterior)',
  biceps: 'bíceps',
  triceps: 'tríceps',
  quadriceps: 'quadríceps',
  posteriores: 'posteriores da coxa',
  gluteos: 'glúteos',
  panturrilha: 'panturrilha',
  abdomen: 'abdômen',
  adutores: 'adutores',
};

/**
 * Escada de cortes (tempo.corte; pesquisa-v2/05, seção 4): primeiro as técnicas que mantêm o volume.
 * 1) só aquecimento específico (já é o modelo); 2) superséries entre músculos que não competem;
 * 3) drop set na última série de isoladores; 4) menos exercícios, mantendo multiarticulares e isoladores
 * obrigatórios; 5) por último, menos séries: não prioritários até o piso de 4, depois prioritários.
 */
export function cortarTempo(
  dias: DiaPrograma[],
  limite: number,
  metas: Partial<Record<Musculo, number>>,
  nivel: Nivel,
  prioritarios: Set<Musculo>,
  avisos: Porque[],
  podeDrop: (x: ExercicioPrescrito) => boolean,
): DiaPrograma[] {
  const recalcular = (d: DiaPrograma) => ({ ...d, minutosEstimados: minutos(d.exercicios) });
  const volume = () =>
    volumePorMusculo(dias.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID_BIB[x.exId]!, series: seriesDeVolume(x) }))));
  // Piso de cada músculo nos cortes: prioritários não descem do mínimo do nível; os demais, do
  // mínimo eficaz (4). Assim os cortes saem primeiro dos grupos que a pessoa não priorizou.
  const piso = (m: Musculo) => Math.min(metas[m] ?? 0, prioritarios.has(m) ? VOLUME.minimo[nivel] : VOLUME.minimoEficazPiso);
  const prioritario = (x: ExercicioPrescrito) => POR_ID_BIB[x.exId]!.musculos.primarios.some((m) => prioritarios.has(m));
  const obrigatorio = (x: ExercicioPrescrito) => !!(x.funcao && FUNCAO[x.funcao]?.obrigatoria);
  // Um corte só vale se nenhum músculo atingido (principal: série inteira; secundário: meia série)
  // cruzar o piso. Músculo que já estava abaixo do piso antes (limite estrutural) não trava o corte.
  const cabe = (x: ExercicioPrescrito, menos: number, v: Partial<Record<Musculo, number>>) => {
    const e = POR_ID_BIB[x.exId]!;
    const ok = (m: Musculo, delta: number) => (v[m] ?? 0) < piso(m) || (v[m] ?? 0) - delta >= piso(m);
    return e.musculos.primarios.every((m) => ok(m, menos)) && e.musculos.secundarios.every((m) => ok(m, menos * VOLUME.pesoIndireta));
  };
  const naoPrioPrimeiro = <T extends { x: ExercicioPrescrito; i: number }>(a: T, b: T) => Number(prioritario(a.x)) - Number(prioritario(b.x));
  const usados = new Set<string>();

  for (let di = 0; di < dias.length; di++) {
    let d = dias[di]!;
    const salvar = (exercicios: ExercicioPrescrito[]) => {
      d = recalcular({ ...d, exercicios });
      dias[di] = d;
    };
    // 1) só aquecimento específico: já é o que o modelo de tempo considera.
    // 2) superséries: primeiro entre isoladores, depois entre multiarticulares de músculos diferentes
    //    (nunca dois multiarticulares de pernas; tempo.superserie).
    if (d.minutosEstimados > limite) {
      const exs = d.exercicios.map((x) => ({ ...x }));
      const parear = (livres: ExercicioPrescrito[], pode: (a: ExercicioPrescrito, b: ExercicioPrescrito) => boolean) => {
        for (let i = 0; i < livres.length; i++) {
          const a = livres[i]!;
          if (a.supersetCom) continue;
          const b = livres.slice(i + 1).find((y) => !y.supersetCom && pode(a, y));
          if (!b) continue;
          a.supersetCom = b.exId;
          b.supersetCom = a.exId;
          salvar(exs);
          if (d.minutosEstimados <= limite) return;
        }
      };
      const naoCompetem = (a: ExercicioPrescrito, b: ExercicioPrescrito) => {
        const ma = POR_ID_BIB[a.exId]!.musculos.primarios;
        const mb = POR_ID_BIB[b.exId]!.musculos.primarios;
        return !ma.some((m) => mb.includes(m));
      };
      const deInferior = (x: ExercicioPrescrito) => POR_ID_BIB[x.exId]!.musculos.primarios.some((m) => INFERIORES.includes(m));
      parear(
        exs.filter((x) => x.tipo === 'isolador' && x.padrao !== 'core'),
        naoCompetem,
      );
      if (d.minutosEstimados > limite)
        parear(
          exs.filter((x) => x.tipo === 'composto'),
          (a, b) => naoCompetem(a, b) && !(deInferior(a) && deInferior(b)),
        );
      if (exs.some((x) => x.supersetCom)) usados.add('superserie');
    }
    // 3) drop set na última série de isoladores com 3 séries ou mais (a série com drop set vale 2 no volume).
    while (d.minutosEstimados > limite) {
      const alvo = d.exercicios
        .map((x, i) => ({ x, i }))
        .filter(({ x }) => !x.dropSet && x.series >= 3 && podeDrop(x))
        .sort((a, b) => naoPrioPrimeiro(a, b) || b.x.series - a.x.series || b.i - a.i)[0]?.x;
      if (!alvo) break;
      salvar(d.exercicios.map((x) => (x === alvo ? { ...x, series: x.series - 1, dropSet: true } : x)));
      usados.add('dropset');
    }
    // 4) menos exercícios e 5) menos séries, primeiro nos não prioritários e só então nos prioritários:
    //    um prioritário nunca perde volume antes de um não prioritário (tempo.corte).
    for (const daPrioridade of [false, true]) {
      // 4) tira um isolador não obrigatório cujos músculos continuam no piso sem ele
      while (d.minutosEstimados > limite) {
        const v = volume();
        const removivel = d.exercicios
          .map((x, i) => ({ x, i }))
          .filter(({ x }) => prioritario(x) === daPrioridade && x.tipo === 'isolador' && !obrigatorio(x) && cabe(x, seriesDeVolume(x), v))
          .sort((a, b) => b.i - a.i)[0]?.x;
        if (!removivel) break;
        salvar(
          d.exercicios
            .filter((x) => x !== removivel)
            .map((x) => (x.supersetCom === removivel.exId ? (({ supersetCom, ...resto }) => (void supersetCom, resto))(x) : x)),
        );
        usados.add('corte');
      }
      // 5) menos séries, sem descer de 2 por exercício nem do piso
      while (d.minutosEstimados > limite) {
        const v = volume();
        const alvo = d.exercicios
          .map((x, i) => ({ x, i }))
          .filter(({ x }) => prioritario(x) === daPrioridade && x.series > VOLUME.seriesPorExercicio.min && cabe(x, 1, v))
          .sort((a, b) => b.x.series - a.x.series || b.i - a.i)[0]?.x;
        if (!alvo) break;
        salvar(d.exercicios.map((x) => (x === alvo ? { ...x, series: x.series - 1 } : x)));
        usados.add('series');
      }
    }
    if (d.minutosEstimados > limite)
      avisos.push({
        regraId: r('tempo.corte'),
        texto: `${d.nome}: estimativa de ${d.minutosEstimados} min, acima dos ${limite} min disponíveis mesmo depois dos cortes.`,
      });
  }
  if (usados.size)
    avisos.push({
      regraId: r('tempo.corte'),
      texto:
        'Para caber no tempo: ' +
        [
          usados.has('superserie') && 'superséries entre músculos que não competem',
          usados.has('dropset') && 'drop set na última série de alguns isoladores (conta como 2 séries)',
          usados.has('corte') && 'menos exercícios',
          usados.has('series') && 'menos séries',
        ]
          .filter(Boolean)
          .join(', ') +
        '.',
    });
  return dias;
}

/** Avisa, por músculo, quando o volume semanal ficou abaixo da meta e o motivo verdadeiro (equipamento, minutos, divisão ou corte de tempo). */
export function avisosDeMeta(
  metas: Partial<Record<Musculo, number>>,
  antes: Partial<Record<Musculo, number>>,
  depois: Partial<Record<Musculo, number>>,
  prioritarios: Set<Musculo>,
  motivoEstrutural: (m: Musculo) => string,
): Porque[] {
  const fmt = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');
  // Prioritários: aviso abaixo da meta. Demais: só abaixo de 4, o limite de baixo do mínimo eficaz (4–6).
  const limiar = (m: Musculo) => (prioritarios.has(m) ? metas[m]! : Math.min(metas[m]!, VOLUME.minimoEficazPiso));
  const abaixo = (Object.keys(metas) as Musculo[]).filter((m) => (depois[m] ?? 0) < limiar(m));
  const porEstrutura = abaixo.filter((m) => (antes[m] ?? 0) < limiar(m));
  const porTempo = abaixo.filter((m) => !porEstrutura.includes(m));
  const item = (m: Musculo) => `${NOME_MUSCULO[m]} ${fmt(depois[m] ?? 0)} de ${fmt(metas[m]!)}`;
  const out: Porque[] = [];
  if (porTempo.length)
    out.push({ regraId: r('tempo.corte'), texto: `Abaixo da meta semanal por falta de tempo: ${porTempo.map(item).join('; ')} séries.` });
  for (const m of porEstrutura)
    out.push({ regraId: r('volume.semanal.alvo'), texto: `Abaixo da meta semanal: ${item(m)} séries, porque ${motivoEstrutural(m)}.` });
  return out;
}

function fases(p: Perfil): Fase[] {
  if (p.semanasParado >= READAPTACAO.semanasProtocolo)
    return [
      { semanas: '1', fatorSeries: READAPTACAO.semana1.fatorSeries, rir: READAPTACAO.semana1.rir, texto: 'Cerca de metade das séries, RIR 3–4 e carga 10–20% abaixo da última registrada.', regraId: r('readaptacao.semana1') },
      { semanas: '2', fatorSeries: READAPTACAO.semana2.fatorSeries, rir: READAPTACAO.semana2.rir, texto: 'Cerca de 3/4 das séries, RIR 2–3.', regraId: r('readaptacao.semana2') },
      { semanas: '3+', fatorSeries: 1, rir: null, texto: 'Programa completo; as cargas desta semana viram a referência.', regraId: r('readaptacao.semana3') },
    ];
  if (p.semanasParado >= READAPTACAO.semanasNormal)
    return [{ semanas: '1ª sessão', fatorSeries: 1, rir: null, texto: 'Primeira sessão de cada treino com 1 repetição a mais de reserva.', regraId: r('readaptacao.gatilho') }];
  if (p.nivel === 'iniciante')
    return [
      { semanas: '1–2', fatorSeries: VOLUME.minimo.iniciante / VOLUME.alvo.iniciante, rir: [3, 4], texto: 'Fase de aprendizado: foco na técnica, volume no mínimo, RIR 3–4 e sem superséries.', regraId: r('iniciante.fase-aprendizado') },
      { semanas: '3+', fatorSeries: 1, rir: null, texto: 'Programa completo.', regraId: r('iniciante.fase-aprendizado') },
    ];
  return [];
}

/**
 * Séries e RIR da semana, aplicando a fase (readaptação ou aprendizado).
 * Na fase de aprendizado do iniciante não há supersérie (tempo.superserie), e nas semanas com RIR 3–4
 * não há drop set, porque ele pede chegar perto da falha (tempo.corte); a série do drop set volta a ser normal.
 */
export function prescricaoDaSemana(programa: Programa, semana: number): DiaPrograma[] {
  const fase = programa.fases.find((f) => {
    const [a, b] = f.semanas.split(/[–+]/);
    const ini = Number(a);
    if (Number.isNaN(ini)) return false;
    if (f.semanas.endsWith('+')) return semana >= ini;
    return semana >= ini && semana <= Number(b || a);
  });
  if (!fase || fase.fatorSeries === 1) return programa.dias;
  const semSuperserie = fase.regraId === 'iniciante.fase-aprendizado';
  const semDropSet = !!fase.rir && fase.rir[0] >= 3;
  return programa.dias.map((d) => ({
    ...d,
    exercicios: d.exercicios.map((x) => {
      const { supersetCom, dropSet, ...resto } = x;
      const series = semDropSet && dropSet ? x.series + 1 : x.series;
      return {
        ...resto,
        ...(supersetCom && !semSuperserie ? { supersetCom } : {}),
        ...(dropSet && !semDropSet ? { dropSet } : {}),
        series: Math.max(1, Math.round(series * fase.fatorSeries)),
        rir: fase.rir ?? x.rir,
      };
    }),
  }));
}

function hash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

export { funcoesDoExercicio };

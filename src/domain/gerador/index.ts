import { BIBLIOTECA, MUSCULOS, type Articulacao, type Exercicio, type Musculo, type Padrao } from '../biblioteca';
import { DESCANSO, OBJETIVO_FORCA, READAPTACAO, RIR, TEMPO, VOLUME, NIVEL_COMPLEXIDADE_MAX, OBRIGATORIO_CURTO, exerciciosPorSessao, r, type Nivel } from '../regras';
import { capacidades, cargaMaxHalter, cargasCaneleiras, cargasHalter, cargasKettlebell, ITENS, type Capacidade, type Inventario, type ItemId } from '../taxonomia/equipamentos';
import { avaliarTriagem, efeitoDaDor, type ResultadoTriagem, type Triagem } from '../triagem';
import { divisaoEscolhida, temDiaDeTronco, type DiasSemana, type Divisao, type DivisaoId, type Vaga } from './divisoes';
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
/** Nomes dos grupos de foco na tela e nos textos (antes em opcoes.ts, que reexporta). */
export const NOME_GRUPO: Record<Grupo, string> = {
  peito: 'peito',
  costas: 'costas',
  ombros: 'ombros',
  bracos: 'braços',
  pernas: 'pernas',
  gluteos: 'glúteos',
  abdomen: 'abdômen',
};
const emLista = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs[xs.length - 1]}` : (xs[0] ?? ''));

/** O que a pessoa quer agora (objetivo.pergunta). Ausente = ganhar músculo. Só "forca" muda números. */
export const OBJETIVOS = ['hipertrofia', 'cutting', 'forca', 'saude'] as const;
export type Objetivo = (typeof OBJETIVOS)[number];

export type Perfil = {
  nivel: Nivel;
  /** Objetivo (objetivo.pergunta); sem resposta, vale "hipertrofia". */
  objetivo?: Objetivo;
  /** Semanas sem treinar antes de começar (readaptacao.gatilho). */
  semanasParado: number;
  diasSemana: DiasSemana;
  /** Divisão escolhida pela pessoa (divisao.recomendacao); sem escolha, vale a recomendada. */
  divisao?: DivisaoId;
  minutosSessao: number;
  prioridades: Grupo[];
  evitarExercicios: string[];
  evitarEquipamentos: ItemId[];
  /** Triagem com as regiões e a dor de hoje: o único lugar onde a dor entra no programa (seguranca.dor.programa). */
  triagem: Triagem;
  /**
   * "Prefiro este" por função (selecao.preferencia): id da função → id do exercício. Só entra no desempate entre
   * equivalentes; ausente ou vazio = sem preferência (o programa sai idêntico).
   */
  preferidos?: Record<string, string>;
  /**
   * Margem pessoal do tempo (tempo.calibracao), só depois do aceite da pessoa: substitui os 10% de tempo.colchao.
   * Ausente = o programa sai idêntico.
   */
  margemTempo?: number;
};

/** A margem do tempo estimado: a pessoal, se aceita, ou a padrão (tempo.colchao). */
export const colchaoDe = (p: Pick<Perfil, 'margemTempo'>) => p.margemTempo ?? TEMPO.colchao;

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

/**
 * O que é possível e como se desempata, para um perfil num inventário (selecao.funcao-da-vaga; selecao.preferencia).
 * É a mesma escolha do gerador e do treino do dia num outro local (local.treino-do-dia), para os dois nunca divergirem.
 */
export function contextoDeSelecao(perfil: Perfil, inventarioOriginal: Inventario, triagem: ResultadoTriagem = avaliarTriagem(perfil.triagem)) {
  const nivel = perfil.nivel;
  const inventario = semItens(inventarioOriginal, perfil.evitarEquipamentos);
  const caps = capacidades(inventario);
  // Dor de hoje por região (seguranca.dor.programa): > 5 ou sem nota exclui; 3–5 desfavorece no desempate.
  const regioesExcluidas = [...triagem.regioesExcluidas];
  const dorLeve = new Set(triagem.regioesDorLeve);

  // 1. Exercícios possíveis. Os "sem a região" guardam o que a dor tirou, para o aviso dizer o motivo verdadeiro.
  const possiveisSemRegiao = BIBLIOTECA.filter(
    (e) =>
      e.requer.some((grupo) => grupo.every((c) => caps.has(c))) &&
      !perfil.evitarExercicios.includes(e.id) &&
      e.complexidade <= NIVEL_COMPLEXIDADE_MAX[nivel],
  );
  const carregaExcluida = (e: Exercicio) => e.articulacoes.some((a) => regioesExcluidas.includes(a));
  const possiveis = possiveisSemRegiao.filter((e) => !carregaExcluida(e));
  const possivel = new Map(possiveis.map((e) => [e.id, e]));
  /** O exercício vale na função: é possível e cumpre as condições dela (funcoes.json, campo condicoes). */
  const naFuncao = (f: Funcao, id: string) => possivel.has(id) && (f.condicoes?.[id] ?? []).every((c) => caps.has(c));
  const possivelSemRegiao = new Set(possiveisSemRegiao.map((e) => e.id));
  /** A vaga teria exercício sem a dor? Então ela ficou vazia por causa da dor, não por falta de equipamento. */
  const perdidaPorDor = (vaga: Vaga) =>
    [FUNCAO[vaga.funcao]!, ...(FUNCAO[vaga.funcao]!.seNada ? [FUNCAO[FUNCAO[vaga.funcao]!.seNada!]!] : [])].some((f) =>
      f.niveis.flat().some((id) => possivelSemRegiao.has(id) && (f.condicoes?.[id] ?? []).every((c) => caps.has(c))),
    );

  // Desempate dentro do mesmo nível da função (selecao.funcao-da-vaga): dor leve desfavorece; estabilidade
  // só para iniciante; carga possível; variedade entre os dias; a preferência da pessoa (selecao.preferencia);
  // com animação aprovada; por fim o id, só para o resultado ser estável.
  const halterMax = cargaMaxHalter(inventario);
  const kettlebellMax = cargasKettlebell(inventario).at(-1) ?? 0;
  // O graviton (assistida) não passa do peso do corpo: conta como o peso do corpo. A caneleira é carga baixa
  // (equipamento.caneleira: 0,5 a 5 kg, em geral): conta como o halter leve.
  const cargaPossivel = (e: Exercicio) =>
    e.carga === 'peso-corpo' || e.carga === 'elastico' || e.carga === 'assistida'
      ? 0
      : (e.carga === 'halter' && halterMax < 20) || (e.carga === 'kettlebell' && kettlebellMax < 20) || e.carga === 'caneleira'
        ? 1
        : 2;
  /** A pessoa tocou "prefiro este" neste exercício, nesta função (selecao.preferencia). */
  const preferido = (f: Funcao | undefined, e: Exercicio) => !!f && perfil.preferidos?.[f.id] === e.id;
  const chave = (e: Exercicio, f: Funcao | undefined, usos: Map<string, number>, evitar?: (e: Exercicio) => boolean, depois?: (e: Exercicio) => boolean) => [
    evitar?.(e) ? 1 : 0, // selecao.variacoes-equivalentes: no último dia, o que já está em todos os outros fica por último
    depois?.(e) ? 1 : 0, // selecao.funcao-da-vaga (R5a): um afundo por dia, havendo outra opção no mesmo nível
    e.articulacoes.some((a) => dorLeve.has(a)) ? 1 : 0,
    nivel === 'iniciante' && !estavel(e) ? 1 : 0,
    -cargaPossivel(e),
    usos.get(e.id) ?? 0,
    preferido(f, e) ? 0 : 1,
    e.animacaoId ? 0 : 1, // entre equivalentes, o que o guia já mostra animado (CLAUDE.md, qualidade do guia)
  ];
  /** Comparador do desempate, com a contagem de usos (variedade entre os dias) de quem chama. */
  const comparar =
    (usos: Map<string, number>, funcaoDe: (e: Exercicio) => Funcao | undefined, evitar?: (e: Exercicio) => boolean, depois?: (e: Exercicio) => boolean) =>
    (a: Exercicio, b: Exercicio) => {
      const [ka, kb] = [chave(a, funcaoDe(a), usos, evitar, depois), chave(b, funcaoDe(b), usos, evitar, depois)];
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

  // selecao.barra-negativa-iniciante (R5d): para o iniciante, a barra fixa (pronada ou supinada) vira a barra só na
  // descida, quando ela é possível; se a descida já está no dia, a vaga segue para a próxima opção, sem a barra.
  const barraDoIniciante = (id: string) => nivel === 'iniciante' && BARRA_LIVRE.includes(id) && possivel.has(BARRA_NEGATIVA);
  const regressaoDoIniciante = (id: string) => (barraDoIniciante(id) ? BARRA_NEGATIVA : id);

  /** Melhor exercício da função, do nível n em diante, fora os já usados no dia. */
  const escolher = (funcao: Funcao, desde: number, usados: (id: string) => boolean, usos: Map<string, number>, evitar?: (e: Exercicio) => boolean, depois?: (e: Exercicio) => boolean) => {
    let primeiro: { ex: Exercicio; nivelFuncao: number } | null = null;
    for (let n = desde; n < funcao.niveis.length; n++) {
      const cands = [...new Set(funcao.niveis[n]!.filter((id) => naFuncao(funcao, id)).map(regressaoDoIniciante))]
        .map((id) => possivel.get(id))
        .filter((e): e is Exercicio => !!e && !usados(e.id));
      const e = cands.sort(comparar(usos, () => funcao, evitar, depois))[0];
      if (!e) continue;
      // selecao.variacoes-equivalentes (frente A, m1): se o melhor do nível já está em todos os outros dias e não há
      // equivalente no mesmo nível, desce um nível da mesma função antes de repetir; sem nada abaixo, repete.
      if (evitar?.(e)) {
        primeiro ??= { ex: e, nivelFuncao: n };
        continue;
      }
      return { ex: e, nivelFuncao: n };
    }
    return primeiro;
  };

  /** Alternativas possíveis neste inventário (selecao.equivalencia). */
  const alternativasDe = (e: Exercicio, funcao: Funcao) =>
    alternativas(e, funcao, possiveis.filter((x) => !funcaoTemExercicio(funcao, x.id) || naFuncao(funcao, x.id)));

  return {
    nivel,
    inventario,
    caps,
    triagem,
    regioesExcluidas,
    dorLeve,
    possiveisSemRegiao,
    possiveis,
    possivel,
    carregaExcluida,
    naFuncao,
    perdidaPorDor,
    halterMax,
    barraDoIniciante,
    preferido,
    comparar,
    resolver,
    escolher,
    alternativasDe,
  };
}
export type ContextoDeSelecao = ReturnType<typeof contextoDeSelecao>;

export function gerarPrograma(perfil: Perfil, inventarioOriginal: Inventario): Resultado {
  const triagem = avaliarTriagem(perfil.triagem);
  if (triagem.bloqueado) return { status: 'bloqueado', triagem };
  // volume.prioridade.foco-primeiro: com foco, os isoladores de quem não é foco entram depois das vagas do foco, e o
  // músculo do foco protegido com 30 min não fica preso em 2 séries, salvo se isso deixar um dia acima de 110% dos
  // minutos (régua da G5, A3) que a montagem de antes não deixava.
  const comFoco = montarPrograma(perfil, inventarioOriginal, triagem, true);
  const passa = (p: Programa) => p.dias.some((d) => d.minutosEstimados > LIMITE_DO_DIA * perfil.minutosSessao);
  if (!perfil.prioridades.length || !passa(comFoco)) return { status: 'ok', triagem, programa: comFoco };
  const antes = montarPrograma(perfil, inventarioOriginal, triagem, false);
  return { status: 'ok', triagem, programa: passa(antes) ? comFoco : antes };
}

function montarPrograma(perfil: Perfil, inventarioOriginal: Inventario, triagem: ResultadoTriagem, focoPrimeiro: boolean): Programa {
  const ctx = contextoDeSelecao(perfil, inventarioOriginal, triagem);
  const { nivel, inventario, caps, regioesExcluidas, possiveisSemRegiao, possiveis, carregaExcluida, naFuncao, perdidaPorDor, halterMax, resolver } = ctx;
  const dorDe = (a: Articulacao) => textoDor(a, triagem.dores.find((d) => d.articulacao === a)?.nota);
  const grupos = new Set<Grupo>(perfil.prioridades);
  const prioritarios = new Set<Musculo>(perfil.prioridades.flatMap((g) => GRUPOS[g]));
  const avisos: Porque[] = [];
  const metas = metasDoPerfil(nivel, perfil.prioridades);
  /** Há um grupo de foco com exercício possível (volume.prioridade.foco-primeiro). */
  const focoPossivel = [...prioritarios].some((m) => possiveis.some((e) => e.musculos.primarios.includes(m)));

  // Nada para puxar no equipamento (equipamento.sem-ancoragem): nenhuma das duas funções de puxar tem exercício
  // possível, e não por causa da dor.
  const semPuxar = (['puxar-vertical', 'puxar-horizontal'] as const).every((f) => !resolver({ funcao: f }) && !perdidaPorDor({ funcao: f }));

  // 2. Divisão escolhida entre opções equivalentes (divisao.*; divisao.sem-puxar)
  const { divisao, escolhida, corpoTodoPorFaltaDePuxar } = divisaoEscolhida(perfil.diasSemana, metaMaxima(nivel, perfil.prioridades), perfil.divisao, semPuxar);

  const usos = new Map<string, number>();
  const funcaoPossivel = (e: Exercicio) => funcoesDoExercicio(e.id).find((x) => naFuncao(x, e.id));
  const comparar = ctx.comparar(usos, funcaoPossivel);

  // 4. Preenchimento das vagas por função
  const N = exerciciosPorSessao(perfil.minutosSessao);
  const ativaPeloFoco = (v: Vaga) => !v.prioridade || v.prioridade.some((g) => grupos.has(g));
  // selecao.gluteo (R5a): numa semana sem vaga de extensão de quadril valendo (o Corpo todo A/B sem foco em glúteo), a
  // vaga do foco passa a valer quando dobrar o quadril não tem exercício (equipamento ou dor): o glúteo não fica só
  // com agachar e afundo.
  const dobrar = resolver({ funcao: 'dobrar-quadril' });
  const extensaoPelaFalta =
    (!dobrar || dobrar.funcao.id !== 'dobrar-quadril') &&
    !divisao.dias.some((d) => d.vagas.some((v) => v.funcao === 'extensao-quadril' && ativaPeloFoco(v)));
  const ativa = (v: Vaga) => ativaPeloFoco(v) || (v.funcao === 'extensao-quadril' && extensaoPelaFalta);
  const lacunas = new Set<string>();
  const nivelAbaixo = new Set<string>();
  const foraPorMinutos = new Set<Musculo>();
  type Item = { ex: Exercicio; vaga: Vaga; funcao: Funcao; nivelFuncao: number; series: number; ordemVaga: number; preenchido?: boolean; noLugarDe?: string; protegido?: Musculo; segundo?: Musculo; pelaFalta?: boolean };
  // Volume da semana só com o mínimo de séries, dia a dia: um complemento (ou uma vaga só de prioridade) não entra
  // se, já no mínimo, passar do teto semanal de algum músculo (volume.semanal.teto-padrao, "nunca acima"). Antes,
  // só a distribuição das séries conferia o teto, e no modelo de 6 dias com três vagas de glúteo o mínimo sozinho
  // chegava a 21 (auditoria de 04/11/2026, Parte C).
  const vMinimo: Partial<Record<Musculo, number>> = {};
  const cabeNoTetoSemanal = (e: Exercicio) =>
    (Object.entries(volumePorMusculo([{ ex: e, series: VOLUME.seriesPorExercicio.min }])) as [Musculo, number][]).every(([m, n]) => (vMinimo[m] ?? 0) + n <= VOLUME.teto);
  // Músculos com meta que têm alguma vaga-base na semana (fora os complementos). Um complemento que é o único
  // exercício direto de um músculo com meta (o ombro posterior, por exemplo) entra antes dos complementos de músculos
  // que já têm vaga-base, mesmo prioritários: o piso de todo músculo vem antes da 2ª dose do prioritário
  // (volume.semanal.minimo-eficaz; auditoria de 04/11/2026, Parte C).
  const comVagaBase = new Set<Musculo>(divisao.dias.flatMap((d) => d.vagas.filter((v) => ativa(v) && !v.complemento).map((v) => FUNCAO[v.funcao]!.musculo)));
  const basesDoMusculo = new Map<Musculo, number>();
  for (const v of divisao.dias.flatMap((d) => d.vagas.filter((w) => ativa(w) && !w.complemento))) basesDoMusculo.set(FUNCAO[v.funcao]!.musculo, (basesDoMusculo.get(FUNCAO[v.funcao]!.musculo) ?? 0) + 1);
  // selecao.variacoes-equivalentes (régua da G5, B1): no último dia de uma semana de 3 dias ou mais, entre os
  // equivalentes do mesmo nível, o exercício que já está em todos os outros dias fica por último (antes até da
  // estabilidade do iniciante): repetir o mesmo exercício em todos os dias havendo outro equivalente é defeito.
  const diasCom = new Map<string, number>();
  const dias = divisao.dias.map((dia, di) => {
    const ultimoDia = divisao.dias.length >= 3 && di === divisao.dias.length - 1;
    const repeteEmTodos = (e: Exercicio) => ultimoDia && (diasCom.get(e.id) ?? 0) === di;
    // Num dia que perdeu vaga de pernas para a dor, a extensão de quadril não entra pela falta: o dia é refeito com o músculo mais
    // abaixo da meta (selecao.dia-sem-principal), e ela tirava o lugar do 2º exercício do foco (R5a sobre o R5d).
    const perdeuPelaDor = dia.vagas.some((w) => ativaPeloFoco(w) && INFERIORES.includes(FUNCAO[w.funcao]!.musculo) && !resolver(w) && perdidaPorDor(w));
    const resolvidas = dia.vagas
      .filter((w) => ativa(w) && !(perdeuPelaDor && !ativaPeloFoco(w)))
      .map((vaga, ordem) => ({ vaga, ordem, res: resolver(vaga) }));
    let perdidas = 0;
    for (const x of resolvidas)
      if (!x.res) {
        if (perdidaPorDor(x.vaga)) perdidas++;
        else lacunas.add(x.vaga.funcao);
      }
    const comExercicio = resolvidas.filter((x): x is typeof x & { res: NonNullable<typeof x.res> } => !!x.res);
    // Quais vagas cabem nos minutos: as vagas-base e as dos grupos prioritários, na ordem do modelo do dia
    // (que já é a de importância); os complementos não prioritários só entram se sobrar espaço.
    const rank = (x: (typeof comExercicio)[number]) => {
      const m = x.res.funcao.musculo;
      // volume.prioridade.foco-primeiro (R5d): com foco, a vaga-base de um isolador de quem não é foco (elevação lateral,
      // bíceps, crucifixo...) entra depois das vagas do foco, se o músculo tem outra vaga-base na semana.
      if (focoPrimeiro && !x.vaga.complemento && focoPossivel && !prioritarios.has(m) && ISOLADORES_ADIAVEIS.has(x.res.funcao.id) && (basesDoMusculo.get(m) ?? 0) > 1) return 2.5;
      if (!x.vaga.complemento) return 0;
      if (!comVagaBase.has(m) && (MUSCULOS_COM_META as Musculo[]).includes(m)) return 1; // o único exercício direto do músculo
      return prioritarios.has(m) || x.vaga.prioridade?.some((g) => grupos.has(g)) ? 2 : 3;
    };
    // Os isoladores obrigatórios entram sempre que houver (selecao.isolador-obrigatorio); o resto preenche até N.
    // Em treinos curtos (até OBRIGATORIO_CURTO exercícios), eles entram na fila comum, depois das vagas-base do dia:
    // senão ocupam 2 de 3 lugares e a semana fica sem costas ou posteriores (selecao.multi-mono; auditoria, achado 4).
    const curto = N <= OBRIGATORIO_CURTO;
    const obrigatorias = curto ? [] : comExercicio.filter((x) => x.res.funcao.obrigatoria);
    const mantidas = [
      ...obrigatorias,
      ...comExercicio
        .filter((x) => !obrigatorias.includes(x))
        .sort((a, b) => rank(a) - rank(b) || (curto ? Number(!!a.res.funcao.obrigatoria) - Number(!!b.res.funcao.obrigatoria) : 0) || a.ordem - b.ordem)
        .slice(0, Math.max(0, N - obrigatorias.length)),
    ];
    for (const x of comExercicio) if (!mantidas.includes(x)) foraPorMinutos.add(x.res.funcao.musculo);
    const itens: Item[] = [];
    const vagaDeAfundo = mantidas.some((y) => y.res.funcao.id === 'afundo');
    for (const x of mantidas.sort((a, b) => a.ordem - b.ordem)) {
      const { funcao } = x.res;
      // selecao.peitoral-inclinado: o 2º empurrar (sem banco inclinável) só num dia sem outra vaga de empurrar horizontal,
      // para não pôr dois supinos retos no mesmo dia; nesse caso a vaga segue para o crucifixo.
      const segundoEmpurrar = funcao.id === 'empurrar-inclinado' && dia.vagas.some((w) => ativa(w) && w.funcao === 'empurrar-horizontal');
      const fora = (id: string) => itens.some((i) => i.ex.id === id) || (segundoEmpurrar && POR_ID_BIB[id]!.padrao === 'empurrar-h' && !POR_ID_BIB[id]!.tags.includes('inclinado'));
      // Um afundo por dia (selecao.funcao-da-vaga; R5a): fora da vaga de afundo, o afundo fica por último no nível
      // quando o dia já tem um ou ainda vai ter (a vaga de afundo com exercício).
      const comAfundo = funcao.id !== 'afundo' && (vagaDeAfundo || itens.some((i) => AFUNDOS.has(i.ex.id)));
      const achado = ctx.escolher(funcao, x.res.nivel, fora, usos, repeteEmTodos, comAfundo ? ehAfundo : undefined);
      if (!achado) continue;
      const { ex: escolhido, nivelFuncao } = achado;
      // Toda vaga confere o teto semanal já no mínimo de séries (antes, só os complementos e as vagas de prioridade:
      // com os seis dias do Corpo todo 6x, as vagas-base sozinhas levavam o glúteo a 23; sessão de qualidade, 06/11/2026).
      if (!cabeNoTetoSemanal(escolhido)) continue;
      if (nivelFuncao > 0 && funcao.semNivel1) nivelAbaixo.add(funcao.semNivel1);
      usos.set(escolhido.id, (usos.get(escolhido.id) ?? 0) + 1);
      for (const [m, n] of Object.entries(volumePorMusculo([{ ex: escolhido, series: VOLUME.seriesPorExercicio.min }])) as [Musculo, number][]) vMinimo[m] = (vMinimo[m] ?? 0) + n;
      itens.push({ ex: escolhido, vaga: x.vaga, funcao, nivelFuncao, series: VOLUME.seriesPorExercicio.min, ordemVaga: x.ordem, ...(ativaPeloFoco(x.vaga) ? {} : { pelaFalta: true }) });
    }
    for (const id of new Set(itens.map((i) => i.ex.id))) diasCom.set(id, (diasCom.get(id) ?? 0) + 1);
    // Vagas sem exercício possível com o equipamento (não pela dor): selecao.vaga-sem-equipamento e tempo.sobra-series.
    const vazias = resolvidas.filter((x) => !x.res && !perdidaPorDor(x.vaga)).map((x) => x.vaga);
    return { dia, itens, perdidas, vazias };
  });

  // selecao.vaga-sem-equipamento: a vaga vazia por equipamento recebe outra função do mesmo músculo, se ele estiver
  // abaixo da meta, primeiro uma função que o dia ainda não tem; nunca o 3º empurrar de um dia sem puxar; dentro do
  // teto semanal e dos exercícios que cabem nos minutos (sessão de qualidade dos treinos, 06/11/2026).
  const empurra = (e: Exercicio) => e.padrao === 'empurrar-h' || e.padrao === 'empurrar-v';
  const puxa = (e: Exercicio) => e.padrao === 'puxar-h' || e.padrao === 'puxar-v';
  for (const d of dias) {
    for (const vaga of d.vazias) {
      if (d.itens.length >= N) break;
      const m = FUNCAO[vaga.funcao]!.musculo;
      const v = volumePorMusculo(dias.flatMap((x) => x.itens.map((i) => ({ ex: i.ex, series: i.series }))));
      if (!(MUSCULOS_COM_META as Musculo[]).includes(m) || (v[m] ?? 0) >= (metas[m] ?? 0)) continue;
      const funcoesDoDia = new Set(d.itens.map((i) => i.funcao.id));
      // Um afundo por dia (R5a): a vaga vazia não põe um 2º afundo num dia que já tem um, havendo outra opção.
      const afundoNoDia = (e: Exercicio) => AFUNDOS.has(e.id) && d.itens.some((i) => AFUNDOS.has(i.ex.id));
      const tresEmpurrares = (e: Exercicio) => empurra(e) && !d.itens.some((i) => puxa(i.ex)) && d.itens.filter((i) => empurra(i.ex)).length >= 2;
      const achado = possiveis
        .filter((e) => e.padrao !== 'core' && !d.itens.some((i) => i.ex.id === e.id) && !tresEmpurrares(e) && cabeNoTetoSemanal(e) && !ctx.barraDoIniciante(e.id))
        .flatMap((e) => {
          const f = funcoesDoExercicio(e.id).find((x) => x.musculo === m && naFuncao(x, e.id));
          return f ? [{ e, f }] : [];
        })
        .sort((a, b) => Number(afundoNoDia(a.e)) - Number(afundoNoDia(b.e)) || Number(funcoesDoDia.has(a.f.id)) - Number(funcoesDoDia.has(b.f.id)) || comparar(a.e, b.e))[0];
      if (!achado) continue;
      const { e, f } = achado;
      for (const [mm, n] of Object.entries(volumePorMusculo([{ ex: e, series: VOLUME.seriesPorExercicio.min }])) as [Musculo, number][]) vMinimo[mm] = (vMinimo[mm] ?? 0) + n;
      usos.set(e.id, (usos.get(e.id) ?? 0) + 1);
      d.itens.push({ ex: e, vaga: { funcao: f.id }, funcao: f, nivelFuncao: f.niveis.findIndex((n) => n.includes(e.id)), series: VOLUME.seriesPorExercicio.min, ordemVaga: 50 + d.itens.length, noLugarDe: FUNCAO[vaga.funcao]!.nome });
    }
  }

  // tempo.musculo-protegido: abdômen e panturrilha não ficam a zero na semana por falta de minutos; a 1ª vaga possível
  // entra no dia com menos exercícios, mesmo passando do número que cabe (sessão de qualidade dos treinos, 06/11/2026).
  for (const m of ['abdomen', 'panturrilha'] as Musculo[]) {
    if (!(metas[m] ?? 0) || dias.some((d) => d.itens.some((i) => i.ex.musculos.primarios.includes(m)))) continue;
    const alvo = dias
      .map((d, di) => ({ d, di, vaga: d.dia.vagas.find((w) => ativa(w) && FUNCAO[w.funcao]!.musculo === m && !!resolver(w)) }))
      .filter((x) => x.vaga)
      .sort((a, b) => a.d.itens.length - b.d.itens.length || a.di - b.di)[0];
    if (!alvo) continue;
    const res = resolver(alvo.vaga!)!;
    const achado = ctx.escolher(res.funcao, res.nivel, (id) => alvo.d.itens.some((i) => i.ex.id === id), usos);
    if (!achado || !cabeNoTetoSemanal(achado.ex)) continue;
    usos.set(achado.ex.id, (usos.get(achado.ex.id) ?? 0) + 1);
    for (const [mm, n] of Object.entries(volumePorMusculo([{ ex: achado.ex, series: VOLUME.seriesPorExercicio.min }])) as [Musculo, number][]) vMinimo[mm] = (vMinimo[mm] ?? 0) + n;
    alvo.d.itens.push({ ex: achado.ex, vaga: alvo.vaga!, funcao: res.funcao, nivelFuncao: achado.nivelFuncao, series: VOLUME.seriesPorExercicio.min, ordemVaga: 100, protegido: m });
    foraPorMinutos.delete(m);
  }

  // selecao.dia-sem-principal: as vagas que a dor esvaziou recebem exercícios possíveis dos outros músculos do
  // mesmo dia, um por músculo que o dia ainda não tem, sem passar do teto; o dia que ficaria só com core recebe
  // pelo menos um, do músculo mais abaixo da meta.
  for (const d of dias) {
    const soCore = !d.itens.some((i) => i.ex.padrao !== 'core');
    if (!soCore && !d.perdidas) continue;
    const v = volumePorMusculo(dias.flatMap((x) => x.itens.map((i) => ({ ex: i.ex, series: i.series }))));
    const deficit = (m: Musculo) => ((metas[m] ?? 0) - (v[m] ?? 0)) / (metas[m] ?? 1);
    // Os músculos que o modelo do dia treina (um dia de superior continua de superior).
    const musculosDoDia = new Set(d.dia.vagas.map((x) => FUNCAO[x.funcao]!.musculo));
    const cands = possiveis
      .filter((e) => e.padrao !== 'core' && !d.itens.some((i) => i.ex.id === e.id) && !ctx.barraDoIniciante(e.id))
      .flatMap((e) => {
        const f = funcoesDoExercicio(e.id).find((x) => naFuncao(x, e.id));
        return f && (soCore || musculosDoDia.has(f.musculo)) ? [{ e, f }] : [];
      })
      .sort((a, b) => deficit(b.f.musculo) - deficit(a.f.musculo) || comparar(a.e, b.e));
    const vagas = Math.max(soCore ? 1 : 0, Math.min(d.perdidas, N - d.itens.length));
    const musculosUsados = new Set<Musculo>(d.itens.map((i) => i.funcao.musculo));
    // Sem passar do teto semanal de nenhum músculo, contando as séries indiretas (volume.semanal.teto-padrao).
    const cabeNoTeto = (e: Exercicio) => {
      const extra = volumePorMusculo([{ ex: e, series: VOLUME.seriesPorExercicio.min }]);
      return (Object.keys(extra) as Musculo[]).every((m) => (v[m] ?? 0) + extra[m]! <= VOLUME.teto);
    };
    let k = 0;
    for (const { e, f } of cands) {
      if (k >= vagas) break;
      if (musculosUsados.has(f.musculo) || !cabeNoTeto(e)) continue;
      for (const [m, n] of Object.entries(volumePorMusculo([{ ex: e, series: VOLUME.seriesPorExercicio.min }])) as [Musculo, number][]) v[m] = (v[m] ?? 0) + n;
      musculosUsados.add(f.musculo);
      usos.set(e.id, (usos.get(e.id) ?? 0) + 1);
      const nivelFuncao = f.niveis.findIndex((n) => n.includes(e.id));
      d.itens.push({ ex: e, vaga: { funcao: f.id }, funcao: f, nivelFuncao, series: VOLUME.seriesPorExercicio.min, ordemVaga: 100 + k, preenchido: true });
      k++;
    }
    const causa = regioesExcluidas.length ? `por causa da dor ${regioesExcluidas.map(dorDe).join(' e ')}` : 'com o seu equipamento';
    const semCausa = !regioesExcluidas.length;
    const preenchidos = d.itens.filter((i) => i.preenchido);
    const entraram = preenchidos.map((i) => i.ex.nome.toLowerCase());
    // O texto diz a verdade: "de outros músculos" quando o que entrou não é músculo do dia (um dia de puxar com panturrilha).
    const deFora = preenchidos.some((i) => !musculosDoDia.has(i.funcao.musculo));
    if (k)
      avisos.push({
        regraId: r('selecao.dia-sem-principal'),
        texto: deFora
          ? `${d.dia.nome}: ${semCausa ? 'sem exercício' : `${causa}, sem exercício`} para os músculos deste dia; entram exercícios de outros músculos (${entraram.join(', ')}).`
          : `${d.dia.nome}: ${causa}, o dia perdeu exercícios; entram outros dos mesmos músculos (${entraram.join(', ')}).`,
      });
    else if (soCore)
      avisos.push({
        regraId: r('selecao.dia-sem-principal'),
        texto: `${d.dia.nome}: ${causa}, só o abdominal é possível neste dia.`,
      });
  }
  if (regioesExcluidas.length)
    avisos.push({
      regraId: r('seguranca.dor.programa'),
      texto: `Por causa da dor ${regioesExcluidas.map(dorDe).join(' e ')}, saíram os exercícios que carregam a região. Procure avaliação profissional. Quando a dor baixar, atualize a nota na triagem.`,
    });

  if (semPuxar && temDiaDeTronco(divisao) && divisao.dias.some((x) => /Puxar|Superior|Costas/.test(x.nome)))
    avisos.push({
      regraId: r('divisao.sem-puxar'),
      texto: `${divisao.nome}: sem exercício de puxar, os dias de puxar ficam com outros músculos. Corpo todo encaixa melhor.`,
    });
  // Sem puxada vertical: quando ela caiu para uma remada, ou quando só a remada existe (ex.: só a barra longa). O texto diz
  // o que o programa tem de fato (R5-CL): com a puxada de elástico no programa, as costas não treinam "só com remadas".
  if (nivelAbaixo.has('equipamento.sem-puxada-vertical') || (lacunas.has('puxar-vertical') && !semPuxar)) {
    const puxadaNoPrograma = dias.some((d) => d.itens.some((i) => i.ex.padrao === 'puxar-v'));
    avisos.push({
      regraId: r('equipamento.sem-puxada-vertical'),
      texto: puxadaNoPrograma
        ? 'Sem barra fixa nem polia alta: a puxada é só com o elástico, e as costas treinam também com remadas.'
        : 'Sem barra fixa nem polia alta: as costas treinam só com remadas.',
    });
  }
  const temMaquinaDePerna = caps.has('leg_press') || caps.has('rack');
  if (!temMaquinaDePerna && halterMax < 20)
    avisos.push({
      regraId: r('equipamento.escada-carga-leve'),
      texto: 'Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia.',
    });
  for (const id of [...lacunas].sort()) {
    const l = FUNCAO[id]!.lacuna;
    if (l) avisos.push({ regraId: r(l.regra), texto: `Sem ${l.falta}: ${l.texto}` });
  }

  // 3. Distribuição das séries até as metas (volume.semanal.*; volume.sessao.teto; volume.series-por-exercicio)
  let todos = dias.flatMap((d, di) => d.itens.map((it) => ({ it, di })));
  const volume = () => volumePorMusculo(todos.map(({ it }) => ({ ex: it.ex, series: it.series })));
  const volumeNoDia = (di: number, m: Musculo) =>
    volumePorMusculo(dias[di]!.itens.map((it) => ({ ex: it.ex, series: it.series })))[m] ?? 0;
  // volume.sessao.teto (R5a): uma série a mais conta para todos os músculos do exercício, com as indiretas (meia série).
  const umaSerie = new Map<string, [Musculo, number][]>();
  const deUmaSerie = (ex: Exercicio) => {
    let u = umaSerie.get(ex.id);
    if (!u) umaSerie.set(ex.id, (u = Object.entries(volumePorMusculo([{ ex, series: 1 }])) as [Musculo, number][]));
    return u;
  };
  /** O dia ainda cabe nos minutos com uma série a mais neste item (o mesmo modelo de tempo da prescrição, sem superséries). */
  const cabeNosMinutos = (di: number, alvo: Item) =>
    minutos(
      dias[di]!.itens.map(({ ex, series }, k, its) => ({ exId: ex.id, tipo: ex.tipo, series: series + (its[k] === alvo ? 1 : 0), reps: ex.faixaReps, unilateral: ex.unilateral, descansoSeg: ex.tipo === 'composto' ? DESCANSO.composto[nivel] : DESCANSO.isolador[nivel] }) as ExercicioPrescrito),
      colchaoDe(perfil),
    ) <= perfil.minutosSessao;
  const distribuir = () => {
    todos = dias.flatMap((d, di) => d.itens.map((it) => ({ it, di })));
    for (;;) {
      const v = volume();
      const porDia: Partial<Record<Musculo, number>>[] = [];
      const noDia = (di: number) => (porDia[di] ??= volumePorMusculo(dias[di]!.itens.map((it) => ({ ex: it.ex, series: it.series }))));
      const cabeNaSessao = (di: number, ex: Exercicio) => deUmaSerie(ex).every(([x, n]) => (noDia(di)[x] ?? 0) + n <= VOLUME.sessaoTeto + 1e-9);
      const candidatos = MUSCULOS_COM_META.map((m) => {
        // Uma série a mais conta para todos os músculos do exercício: nenhum pode passar do teto semanal.
        const cabe = (ex: Exercicio) => deUmaSerie(ex).every(([x, n]) => (v[x] ?? 0) + n <= VOLUME.teto);
        const vagas = todos.filter(
          ({ it, di }) =>
            // tempo.musculo-protegido: com 30 min ou menos, o exercício protegido fica com 2 séries; com o foco primeiro, a
            // trava não vale para o músculo do foco (ela é para quem não é foco não ficar a zero).
            !(it.protegido && !(focoPrimeiro && prioritarios.has(it.protegido)) && perfil.minutosSessao <= TEMPO.protegidoCurto) &&
            // selecao.gluteo (R5a): nos treinos de até 45 min, a extensão de quadril que entrou pela falta só ganha uma série
            // se o dia, com ela, ainda couber nos minutos (com mais, o dia passava do tempo).
            !(it.pelaFalta && perfil.minutosSessao <= TEMPO.extensaoPelaFaltaCurto && !cabeNosMinutos(di, it)) &&
            it.ex.musculos.primarios.includes(m) &&
            it.series < VOLUME.seriesPorExercicio.max &&
            cabeNaSessao(di, it.ex) &&
            cabe(it.ex),
        );
        return { m, deficit: ((metas[m] ?? 0) - (v[m] ?? 0)) / (metas[m] ?? 1), vagas };
      }).filter((c) => c.deficit > 0 && c.vagas.length);
      if (!candidatos.length) break;
      candidatos.sort((a, b) => b.deficit - a.deficit || MUSCULOS.indexOf(a.m) - MUSCULOS.indexOf(b.m));
      const { vagas } = candidatos[0]!;
      vagas.sort((a, b) => a.it.series - b.it.series || a.di - b.di || a.it.ordemVaga - b.it.ordemVaga);
      vagas[0]!.it.series++;
    }
  };
  distribuir();

  // volume.prioridade.segundo-exercicio (R5d; a-qualidade.md, D-4c): o músculo do foco que, com as séries distribuídas,
  // ficou abaixo da meta ganha um exercício de outra função do mesmo músculo (até SEGUNDOS_POR_MUSCULO), num dia que
  // treina o músculo ou a mesma região (nunca panturrilha num dia de superiores), dentro dos exercícios e dos minutos que
  // cabem, do teto da sessão, do teto semanal e do equilíbrio do ombro; depois as séries são distribuídas de novo.
  const regiaoDe = (m: Musculo) => (m === 'abdomen' ? 'core' : INFERIORES.includes(m) || m === 'adutores' ? 'inferior' : 'superior');
  /** Minutos estimados de um dia ainda em itens (o mesmo modelo de tempo da prescrição, sem superséries). */
  const minutosDosItens = (its: { ex: Exercicio; series: number }[]) =>
    minutos(
      its.map(({ ex, series }) => ({ exId: ex.id, tipo: ex.tipo, series, reps: ex.faixaReps, unilateral: ex.unilateral, descansoSeg: ex.tipo === 'composto' ? DESCANSO.composto[nivel] : DESCANSO.isolador[nivel] }) as ExercicioPrescrito),
      colchaoDe(perfil),
    );
  for (const m of MUSCULOS_COM_META)
    for (let vez = 0; vez < SEGUNDOS_POR_MUSCULO; vez++) {
      if (!prioritarios.has(m) || (volume()[m] ?? 0) >= (metas[m] ?? 0)) break;
      const funcoesNoPrograma = new Set(dias.flatMap((d) => d.itens.filter((i) => i.funcao.musculo === m).map((i) => i.funcao.id)));
      const funcoes = Object.values(FUNCAO).filter((f) => f.musculo === m && f.niveis.flat().some((id) => naFuncao(f, id)));
      // Candidatos (dia × função), na ordem: outra função que o dia não tem (num dia que treina o músculo; depois, num da
      // mesma região), a função que o programa ainda não tem antes, o dia com menos exercícios; por último, outro exercício
      // da mesma função, para o músculo que só tem uma (acima de 4 séries, melhor dividir em 2 exercícios).
      const candidatos = dias
        .map((d, di) => {
          const musculosDoModelo = new Set(d.dia.vagas.map((w) => FUNCAO[w.funcao]!.musculo));
          const mesmaRegiao = regiaoDe(m) === 'core' || [...musculosDoModelo].some((x) => regiaoDe(x) === regiaoDe(m));
          return { d, di, mesmoMusculo: musculosDoModelo.has(m), mesmaRegiao };
        })
        .filter((x) => x.mesmaRegiao && x.d.itens.length < N && volumeNoDia(x.di, m) + VOLUME.seriesPorExercicio.min <= VOLUME.sessaoTeto)
        .flatMap((x) => {
          const funcoesDoDia = new Set(x.d.itens.filter((i) => i.funcao.musculo === m).map((i) => i.funcao.id));
          return funcoes.map((f) => ({ ...x, f, repete: funcoesDoDia.has(f.id) }));
        })
        .filter((x) => !x.repete || funcoes.length === 1)
        .sort(
          (a, b) =>
            Number(a.repete) - Number(b.repete) ||
            // selecao.funcao-da-vaga (R5a): um afundo por dia, havendo outra opção.
            Number(a.f.id === 'afundo' && a.d.itens.some((i) => AFUNDOS.has(i.ex.id))) - Number(b.f.id === 'afundo' && b.d.itens.some((i) => AFUNDOS.has(i.ex.id))) ||
            Number(b.mesmoMusculo) - Number(a.mesmoMusculo) ||
            Number(funcoesNoPrograma.has(a.f.id)) - Number(funcoesNoPrograma.has(b.f.id)) ||
            a.d.itens.length - b.d.itens.length ||
            volumeNoDia(a.di, m) - volumeNoDia(b.di, m) ||
            a.di - b.di,
        );
      let feito = false;
      for (const { d, f } of candidatos) {
        const tresEmpurrares = (e: Exercicio) => empurra(e) && !d.itens.some((i) => puxa(i.ex)) && d.itens.filter((i) => empurra(i.ex)).length >= 2;
        const n = f.niveis.findIndex((ids) => ids.some((id) => naFuncao(f, id)));
        // selecao.variacoes-equivalentes: o exercício que já está em todos os outros dias fica por último.
        const emTodosOsOutros = (e: Exercicio) => dias.length >= 3 && dias.every((x) => x === d || x.itens.some((i) => i.ex.id === e.id));
        // selecao.peitoral-inclinado: o empurrar inclinado num dia que já tem a vaga de empurrar horizontal não repete um
        // empurrar reto. E nenhum músculo do exercício passa do teto semanal com o volume já distribuído.
        const reto = (e: Exercicio) => e.padrao === 'empurrar-h' && !e.tags.includes('inclinado');
        const segundoEmpurrar = f.id === 'empurrar-inclinado' && d.itens.some((i) => i.funcao.id === 'empurrar-horizontal');
        if (f.id === 'empurrar-horizontal' && d.itens.some((i) => i.funcao.id === 'empurrar-inclinado' && reto(i.ex))) continue;
        const v = volume();
        const passaDoTeto = (e: Exercicio) =>
          (Object.entries(volumePorMusculo([{ ex: e, series: VOLUME.seriesPorExercicio.min }])) as [Musculo, number][]).some(([mm, k]) => (v[mm] ?? 0) + k > VOLUME.teto);
        const fora = (id: string) => {
          const e = POR_ID_BIB[id]!;
          return d.itens.some((i) => i.ex.id === id) || tresEmpurrares(e) || passaDoTeto(e) || (segundoEmpurrar && reto(e));
        };
        const comAfundo = f.id !== 'afundo' && d.itens.some((i) => AFUNDOS.has(i.ex.id));
        const achado = ctx.escolher(f, n, fora, usos, emTodosOsOutros, comAfundo ? ehAfundo : undefined);
        if (!achado) continue;
        // volume.sessao.teto (R5a): no mínimo de séries, nenhum músculo do exercício passa de 10 no dia, com as indiretas.
        const noDiaAgora = volumePorMusculo(d.itens.map((it) => ({ ex: it.ex, series: it.series })));
        if (deUmaSerie(achado.ex).some(([mm, k]) => (noDiaAgora[mm] ?? 0) + k * VOLUME.seriesPorExercicio.min > VOLUME.sessaoTeto + 1e-9)) continue;
        // Só se o dia, com ele no mínimo de séries, couber nos minutos; e um empurrar só se o ombro continuar equilibrado
        // (empurrar ÷ puxar até 1,5; régua da G5, D1).
        if (minutosDosItens([...d.itens, { ex: achado.ex, series: VOLUME.seriesPorExercicio.min }]) > perfil.minutosSessao) continue;
        if (EMPURRA_PADROES.includes(achado.ex.padrao) && !semPuxar) {
          const its = dias.flatMap((x) => x.itens);
          const soma = (ps: Padrao[]) => its.filter((i) => ps.includes(i.ex.padrao)).reduce((t, i) => t + i.series, 0);
          if (soma(EMPURRA_PADROES) + VOLUME.seriesPorExercicio.min > EMPURRAR_PUXAR_MAX * soma(PUXA_PADROES)) continue;
        }
        // Entra, as séries são distribuídas de novo e, se o dia passar dos minutos, tudo volta como estava (o corte de
        // tempo não tira séries do foco abaixo do piso dele, e o dia ficaria acima do tempo).
        const antes = todos.map(({ it }) => [it, it.series] as const);
        const novo: Item = { ex: achado.ex, vaga: { funcao: f.id }, funcao: f, nivelFuncao: achado.nivelFuncao, series: VOLUME.seriesPorExercicio.min, ordemVaga: 60 + d.itens.length, segundo: m };
        d.itens.push(novo);
        distribuir();
        if (minutosDosItens(d.itens) > perfil.minutosSessao) {
          d.itens.splice(d.itens.indexOf(novo), 1);
          for (const [it, series] of antes) it.series = series;
          todos = dias.flatMap((x, di) => x.itens.map((it) => ({ it, di })));
          continue;
        }
        usos.set(achado.ex.id, (usos.get(achado.ex.id) ?? 0) + 1);
        for (const [mm, k] of Object.entries(volumePorMusculo([{ ex: achado.ex, series: VOLUME.seriesPorExercicio.min }])) as [Musculo, number][]) vMinimo[mm] = (vMinimo[mm] ?? 0) + k;
        feito = true;
        break;
      }
      if (!feito) break;
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
  // Lembrete nos exercícios que carregam uma região marcada com dor de 0 a 5 (seguranca.dor.programa).
  const porqueDaDor = (e: Exercicio, preenchido?: boolean, noLugarDe?: string, protegido?: Musculo, segundo?: Musculo): Porque[] => {
    const p: Porque[] = [];
    if (segundo)
      p.push({
        regraId: r('volume.prioridade.segundo-exercicio'),
        texto: `${NOME_MUSCULO_CURTO[segundo][0]!.toUpperCase()}${NOME_MUSCULO_CURTO[segundo].slice(1)} é foco e não chegava à meta só com os outros exercícios: este entrou a mais, para trabalhar o músculo de outro jeito.`,
      });
    if (protegido)
      p.push({ regraId: r('tempo.musculo-protegido'), texto: `Entrou para ${protegido === 'abdomen' ? 'o abdômen' : 'a panturrilha'} não ficar sem nenhuma série na semana, mesmo com o treino cheio.` });
    if (noLugarDe)
      p.push({ regraId: r('selecao.vaga-sem-equipamento'), texto: `Entrou no lugar da vaga "${noLugarDe.toLowerCase()}", que não tem exercício possível com o seu equipamento: trabalha o mesmo músculo com outro movimento.` });
    if (preenchido)
      p.push({ regraId: r('selecao.dia-sem-principal'), texto: 'Entrou no lugar de uma vaga que a dor tirou (ou para o dia não ficar só com abdominal).' });
    p.push(...lembretesDeDor(e, triagem));
    return p;
  };
  const prescrever = (it: Item): ExercicioPrescrito => {
    const e = it.ex;
    const composto = e.tipo === 'composto';
    // rir.carga-baixa: com carga baixa (muitas repetições), a proximidade da falha pesa mais; a reserva vai até 2.
    const rirBase = composto ? RIR.composto[nivel] : RIR.isolador[nivel];
    const cargaBaixa = (e.faixaReps[0] + e.faixaReps[1]) / 2 >= RIR.cargaBaixa.repsMeio && rirBase[1] > RIR.cargaBaixa.rirMax;
    const rir: [number, number] = cargaBaixa ? [Math.min(rirBase[0], RIR.cargaBaixa.rirMax - 1), RIR.cargaBaixa.rirMax] : rirBase;
    return {
      exId: e.id,
      nome: e.nome,
      padrao: e.padrao,
      tipo: e.tipo,
      funcao: it.funcao.id,
      series: it.series,
      reps: e.faixaReps,
      rir,
      descansoSeg: composto ? DESCANSO.composto[nivel] : DESCANSO.isolador[nivel],
      unilateral: e.unilateral,
      animacaoId: e.animacaoId,
      alternativas: ctx.alternativasDe(e, it.funcao),
      porque: [
        ...porqueDoExercicio(e, it.funcao, it.nivelFuncao, nivel, ctx.preferido(it.funcao, e)),
        ...(cargaBaixa ? [{ regraId: r('rir.carga-baixa'), texto: 'Com muitas repetições, a série só conta perto da falha: termine com 1 a 2 repetições de reserva.' }] : []),
        ...porqueDaDor(e, it.preenchido, it.noLugarDe, it.protegido, it.segundo),
      ],
    };
  };
  // Objetivo "ficar mais forte" (objetivo.forca.*): os 2 primeiros multiarticulares com carga de cada treino ficam com a
  // faixa mais baixa e o descanso maior; o peso livre fica com 2 a 3 de reserva. O iniciante segue como na hipertrofia.
  const forca = perfil.objetivo === 'forca' && nivel !== 'iniciante';
  const comCarga = (e: Exercicio) => !['peso-corpo', 'elastico', 'assistida'].includes(e.carga);
  const pesoLivre = (e: Exercicio) => ['barra', 'halter', 'kettlebell', 'anilha'].includes(e.carga);
  const ajustarForca = (exs: ExercicioPrescrito[]): ExercicioPrescrito[] => {
    if (!forca) return exs;
    let k = 0;
    return exs.map((x) => {
      const e = POR_ID_BIB[x.exId]!;
      if (k >= OBJETIVO_FORCA.compostosPorTreino || x.tipo !== 'composto' || !comCarga(e)) return x;
      k++;
      return {
        ...x,
        reps: OBJETIVO_FORCA.reps,
        descansoSeg: OBJETIVO_FORCA.descansoSeg,
        rir: pesoLivre(e) ? OBJETIVO_FORCA.rirPesoLivre : x.rir,
        porque: [
          ...x.porque,
          {
            regraId: r('objetivo.forca.faixa-compostos'),
            texto: `Objetivo "ficar mais forte": ${OBJETIVO_FORCA.reps[0]} a ${OBJETIVO_FORCA.reps[1]} repetições e descanso de 2 min 30 s neste exercício grande.${pesoLivre(e) ? ' Com peso livre, termine com 2 a 3 repetições de reserva.' : ''}`,
          },
        ],
      };
    });
  };
  let programaDias: DiaPrograma[] = dias.map(({ dia, itens }) => {
    const exercicios = ajustarForca(itens.map(prescrever));
    return { id: dia.id, nome: dia.nome, exercicios, minutosEstimados: minutos(exercicios, colchaoDe(perfil)) };
  });

  // 5. Orçamento de tempo (tempo.corte)
  const volumeDe = (ds: DiaPrograma[]) =>
    volumePorMusculo(ds.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID_BIB[x.exId]!, series: seriesDeVolume(x) }))));

  // tempo.musculo-protegido, com 30 min ou menos (R5-CL; a-qualidade.md, F.9): o dia em que o exercício protegido
  // entrou e que passou do tempo perde um isolador não obrigatório e não prioritário (o último da ordem), sem zerar
  // nenhum músculo na semana e sem tirar a coxa da faixa (volume.equilibrio-coxa).
  let trocouProtegido = false;
  if (perfil.minutosSessao <= TEMPO.protegidoCurto)
    for (let di = 0; di < programaDias.length; di++) {
      const d = programaDias[di]!;
      const ehProtegido = (x: ExercicioPrescrito) => x.porque.some((q) => q.regraId === 'tempo.musculo-protegido');
      if (d.minutosEstimados <= perfil.minutosSessao || !d.exercicios.some(ehProtegido)) continue;
      const v = volumeDe(programaDias);
      const alvo = d.exercicios
        .map((x, i) => ({ x, i, e: POR_ID_BIB[x.exId]! }))
        .filter(
          ({ x, e }) =>
            x.tipo === 'isolador' &&
            !ehProtegido(x) &&
            !(x.funcao && FUNCAO[x.funcao]?.obrigatoria) &&
            !e.musculos.primarios.some((m) => prioritarios.has(m)) &&
            e.musculos.primarios.every((m) => (v[m] ?? 0) - seriesDeVolume(x) > 0) &&
            mantemCoxa(e, seriesDeVolume(x), v) &&
            !unicoDiretoDePosteriores(x, programaDias),
        )
        .sort((a, b) => b.i - a.i)[0]?.x;
      if (!alvo) continue;
      const exercicios = d.exercicios.filter((x) => x !== alvo);
      programaDias[di] = { ...d, exercicios, minutosEstimados: minutos(exercicios, colchaoDe(perfil)) };
      trocouProtegido = true;
    }

  // tempo.sobra-series: nos dias com vaga sem exercício possível por equipamento, as séries sobem até o alvo do nível
  // (o abdômen não prioritário fica na meta), enquanto o dia couber nos minutos; o músculo mais longe da meta primeiro;
  // nunca acima de 4 por exercício, 10 por músculo na sessão nem 20 na semana.
  const diasComVaga = dias.flatMap((d, i) => (d.vazias.length ? [i] : []));
  // R5d (volume.prioridade.foco-primeiro): com um grupo de foco que tem exercício possível, o tempo que sobra vai primeiro
  // para o foco, até o máximo do nível, e só depois para os outros, que ficam pelo menos DISTANCIA_DO_FOCO séries abaixo
  // do foco mais fraco (e nunca acima do alvo de antes). A exceção é o ombro: enquanto empurrar ÷ puxar passar de 1,5, as
  // costas e o ombro de trás sobem como antes; e nenhum empurrar de quem não é foco sobe se passar de 1,5.
  const empurraDemais = (ds: DiaPrograma[]) => {
    const series = (ps: Padrao[]) => ds.flatMap((d) => d.exercicios).filter((x) => ps.includes(x.padrao)).reduce((t, x) => t + seriesDeVolume(x), 0);
    return series(EMPURRA_PADROES) > EMPURRAR_PUXAR_MAX * series(PUXA_PADROES);
  };
  /** O músculo do foco (com exercício possível) com menos séries na semana. */
  const menorFoco = (ds: DiaPrograma[]) => {
    const v = volumeDe(ds);
    return Math.min(...[...prioritarios].filter((m) => possiveis.some((e) => e.musculos.primarios.includes(m))).map((m) => v[m] ?? 0));
  };
  const podePuxar = !!resolver({ funcao: 'puxar-vertical' }) || !!resolver({ funcao: 'puxar-horizontal' });
  const alvoDaSobra = (m: Musculo, ds: DiaPrograma[]) =>
    m === 'abdomen' && !prioritarios.has(m)
      ? (metas[m] ?? 0)
      : prioritarios.has(m)
        ? Math.max(metas[m] ?? 0, VOLUME.maximo[nivel])
        : !focoPossivel || (PUXAM.includes(m) && empurraDemais(ds))
          ? Math.max(metas[m] ?? 0, VOLUME.sobraAte[nivel])
          : Math.max(metas[m] ?? 0, Math.min(VOLUME.sobraAte[nivel], menorFoco(ds) - DISTANCIA_DO_FOCO));
  let seriesNaSobra = false;
  for (;;) {
    const v = volumeDe(programaDias);
    let melhor: { di: number; xi: number; deficit: number; foco: number } | null = null;
    for (const m of MUSCULOS_COM_META) {
      // Com foco, quem não é foco e está abaixo do piso de 4 (volume.semanal.minimo-eficaz) sobe até o piso também pelas
      // séries indiretas (o glúteo sem exercício próprio sobe com o agachamento): os outros não ficam abaixo do piso.
      const viaIndireta = focoPossivel && !prioritarios.has(m) && (v[m] ?? 0) < VOLUME.minimoEficazPiso;
      const alvo = viaIndireta ? VOLUME.minimoEficazPiso : alvoDaSobra(m, programaDias);
      // O foco também sobe enquanto as séries diretas dele (os exercícios em que ele é o músculo principal) estiverem abaixo
      // da meta: um glúteo do foco que chega à meta só com séries indiretas do agachamento ainda pede mais ponte (R5d).
      const direto = prioritarios.has(m)
        ? programaDias.flatMap((z) => z.exercicios).filter((x) => POR_ID_BIB[x.exId]!.musculos.primarios.includes(m)).reduce((t, x) => t + seriesDeVolume(x), 0)
        : 0;
      const deficitDireto = prioritarios.has(m) && metas[m] ? (metas[m]! - direto) / metas[m]! : 0;
      const deficit = Math.max(alvo ? (alvo - (v[m] ?? 0)) / alvo : 0, deficitDireto);
      if (deficit <= 0) continue;
      for (const di of diasComVaga) {
        const d = programaDias[di]!;
        const noDia = volumeDe([d]);
        d.exercicios.forEach((x, xi) => {
          const e = POR_ID_BIB[x.exId]!;
          // Uma série a mais conta para todos os músculos do exercício, com as indiretas: nenhum passa do teto da sessão (R5a).
          const acerta = e.musculos.primarios.includes(m) || (viaIndireta && e.musculos.secundarios.includes(m));
          if (!acerta || x.series >= VOLUME.seriesPorExercicio.max) return;
          if (deUmaSerie(e).some(([k, n]) => (noDia[k] ?? 0) + n > VOLUME.sessaoTeto + 1e-9)) return;
          // Nenhum músculo do exercício passa do teto (20) nem, se não for prioridade, do máximo do nível (volume.semanal.maximo).
          const limite = (k: Musculo) => (prioritarios.has(k) ? VOLUME.teto : VOLUME.maximo[nivel]);
          if (!(Object.entries(volumePorMusculo([{ ex: e, series: 1 }])) as [Musculo, number][]).every(([k, n]) => (v[k] ?? 0) + n <= limite(k))) return;
          if (minutos(d.exercicios.map((y, j) => (j === xi ? { ...y, series: y.series + 1 } : y)), colchaoDe(perfil)) > perfil.minutosSessao) return;
          // volume.equilibrio-coxa: a série a mais não tira quadríceps ÷ posteriores da faixa de 0,5 a 2.
          if (!mantemCoxa(e, -1, v)) return;
          // Quem não é foco não sobe um empurrar que passe empurrar ÷ puxar de 1,5 (régua da G5, D1).
          if (!prioritarios.has(m) && podePuxar && EMPURRA_PADROES.includes(x.padrao) && empurraDemais(programaDias.map((z, k) => (k === di ? { ...z, exercicios: z.exercicios.map((y, j) => (j === xi ? { ...y, series: y.series + 1 } : y)) } : z)))) return;
          // O foco vem antes dos outros (volume.prioridade.foco-primeiro); entre iguais, o mais longe da meta.
          const foco = prioritarios.has(m) ? 0 : 1;
          if (!melhor || foco < melhor.foco || (foco === melhor.foco && deficit > melhor.deficit)) melhor = { di, xi, deficit, foco };
        });
      }
    }
    if (!melhor) break;
    const { di, xi } = melhor as { di: number; xi: number };
    const d = programaDias[di]!;
    const exercicios = d.exercicios.map((y, j) => (j === xi ? { ...y, series: y.series + 1 } : y));
    programaDias[di] = { ...d, exercicios, minutosEstimados: minutos(exercicios, colchaoDe(perfil)) };
    seriesNaSobra = true;
  }
  const volumeAntesDoCorte = volumeDe(programaDias);
  const cargasDeHalter = cargasHalter(inventario).length;
  const cargasDeKettlebell = cargasKettlebell(inventario).length;
  const cargasDeCaneleira = cargasCaneleiras(inventario).length;
  const podeDrop = (x: ExercicioPrescrito) => {
    const c = POR_ID_BIB[x.exId]!.carga;
    return (
      x.tipo === 'isolador' &&
      (c === 'maquina' ||
        c === 'polia' ||
        c === 'anilha' ||
        (c === 'halter' && cargasDeHalter >= 2) ||
        (c === 'kettlebell' && cargasDeKettlebell >= 2) ||
        (c === 'caneleira' && cargasDeCaneleira >= 2))
    );
  };
  programaDias = cortarTempo(programaDias, perfil.minutosSessao, metas, nivel, prioritarios, avisos, podeDrop, colchaoDe(perfil), trocouProtegido);

  const volumeSemanal = volumeDe(programaDias);
  const vezes = (m: Musculo) => programaDias.filter((d) => d.exercicios.some((x) => POR_ID_BIB[x.exId]!.musculos.primarios.includes(m))).length;
  const motivoEstrutural = (m: Musculo): string => {
    // A dor tirou exercícios deste músculo? Então o motivo verdadeiro é a dor, não o equipamento (R1).
    const tirados = possiveisSemRegiao.filter((e) => e.musculos.primarios.includes(m) && carregaExcluida(e));
    const regioesDoMusculo = regioesExcluidas.filter((a) => tirados.some((e) => e.articulacoes.includes(a)));
    const porDor = regioesDoMusculo.map(dorDe).join(' e ');
    const quais = regioesDoMusculo.map((a) => `${ARTIGO[a]} ${NOME_ARTICULACAO_MIN[a]}`).join(' ou ');
    if (!possiveis.some((e) => e.musculos.primarios.includes(m)) && tirados.length)
      return `Os exercícios que carregam ${quais} saíram por causa da dor ${porDor}`;
    const faltas = [...lacunas].map((id) => FUNCAO[id]!).filter((f) => f.musculo === m && f.lacuna).map((f) => f.lacuna!.falta);
    const falta = (faltas.length ? ` (falta ${faltas.join(' e ')})` : '') + (tirados.length ? `; e a dor ${porDor} tirou outros exercícios` : '');
    if (!possiveis.some((e) => e.musculos.primarios.includes(m))) return `${SEM_EXERCICIO}${falta}`;
    if (foraPorMinutos.has(m)) return `Com ${perfil.minutosSessao} min cabem ~${N} exercícios por treino${falta}`;
    const n = vezes(m);
    if (n === 0) return `A divisão ${divisao.nome} não tem vaga própria para este músculo, só séries indiretas${falta}`;
    return `A divisão ${divisao.nome} treina este músculo ${n}x por semana e, com até ${VOLUME.seriesPorExercicio.max} séries por exercício e ${VOLUME.sessaoTeto} por sessão, não cabe mais${falta}`;
  };
  avisos.push(...avisosDeMeta(metas, volumeAntesDoCorte, volumeSemanal, prioritarios, motivoEstrutural, semPuxar));

  // volume.prioridade.competicao: com 2 grupos de foco ou mais, os prioritários abaixo da meta (os que têm exercício
  // possível) disputam o mesmo tempo; um aviso por programa (decisão do Gustavo em 06/11/2026).
  if (perfil.prioridades.length >= 2) {
    const faltou = [...prioritarios].filter((m) => (metas[m] ?? 0) > 0 && (volumeSemanal[m] ?? 0) < metas[m]! && possiveis.some((e) => e.musculos.primarios.includes(m)));
    if (faltou.length) {
      const fmt = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');
      const sugestao = perfil.prioridades.length > 2 ? 'escolha 1 ou 2 grupos' : 'escolha um grupo só';
      avisos.push({
        regraId: r('volume.prioridade.competicao'),
        texto:
          `Seus focos disputam o mesmo tempo: ${emLista(faltou.map((m) => `${NOME_MUSCULO_CURTO[m]} ${fmt(volumeSemanal[m] ?? 0)} de ${fmt(metas[m]!)}`))} séries por semana. Com ${perfil.diasSemana} treinos de ${perfil.minutosSessao} min não cabe tudo: para o foco render, ${sugestao}, ou aumente os minutos ou os dias.` +
          (perfil.prioridades.includes('pernas') ? ' "Pernas" são 3 músculos (frente da coxa, posterior e panturrilha): como foco, pedem o triplo de séries de "peito".' : ''),
      });
    }
  }

  // Tempo que sobra por falta de exercício (tempo.sobra; decisão do Gustavo em 04/11/2026): o dia mais longo usa menos
  // de ~70% dos minutos escolhidos e alguma vaga ficou sem exercício possível com o equipamento. Sem sugerir compra.
  // O dia típico é a mediana dos dias (revisão de 06/11/2026: com o dia mais longo, dias de 20, 17 e 43 min em 60 não avisavam).
  const ordenados = programaDias.map((d) => d.minutosEstimados).sort((a, b) => a - b);
  const diaTipico = ordenados.length ? ordenados[Math.floor((ordenados.length - 1) / 2)]! : 0;
  if ((lacunas.size || semPuxar || regioesExcluidas.length) && diaTipico < TEMPO.sobraFracao * perfil.minutosSessao)
    avisos.push({
      regraId: r('tempo.sobra'),
      texto: `${regioesExcluidas.length && !lacunas.size && !semPuxar ? 'Com o que dá para fazer hoje' : 'Com o seu equipamento'}, o treino dura cerca de ${Math.max(5, Math.round(diaTipico / 5) * 5)} min. Mais tempo não acrescenta exercícios: dá para escolher uma duração menor sem perder nada.`,
    });

  const porque: Porque[] = [
    ...textoDoObjetivo(perfil.objetivo, nivel),
    {
      regraId: r('divisao.recomendacao'),
      texto: escolhida
        ? `${divisao.nome}: a divisão que você escolheu entre as opções equivalentes para ${perfil.diasSemana} dias.`
        : `${divisao.nome}: a recomendada para ${perfil.diasSemana} dias (você pode escolher outra na rotina).`,
    },
    ...(corpoTodoPorFaltaDePuxar
      ? [{ regraId: r('divisao.sem-puxar'), texto: 'Sem exercício de puxar no seu equipamento, a recomendada é a de corpo todo: nas outras, os dias de puxar ficariam com outros músculos.' }]
      : []),
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
      texto: perfil.prioridades.length
        ? `Foco em ${emLista(perfil.prioridades.map((g) => NOME_GRUPO[g]))}: ~${VOLUME.alvo[nivel]} séries por semana${nivel === 'iniciante' ? ', o topo da faixa de quem está começando,' : ''} para crescer mais rápido. Os outros músculos ficam com ~${VOLUME.minimoEficaz}: mais do que o necessário para manter (1 a 3) e o bastante para continuar crescendo, mais devagar.`
        : `Sem grupo de foco: todos os músculos ficam com ~${VOLUME.minimoEficaz} séries por semana, o bastante para crescer, mais devagar que com foco. Para acelerar um grupo, escolha-o como prioridade.`,
    },
    ...(seriesNaSobra
      ? [
          {
            regraId: r('tempo.sobra-series'),
            texto: focoPossivel
              ? `Nos dias com vaga sem exercício possível, o tempo que sobrou virou série primeiro para o foco (até ~${VOLUME.maximo[nivel]} séries por semana) e só depois para os outros músculos, que ficam pelo menos ${DISTANCIA_DO_FOCO} séries abaixo do foco.`
              : `Nos dias com vaga sem exercício possível, o tempo que sobrou virou série: os músculos que dá para treinar sobem até ~${VOLUME.sobraAte[nivel]} séries por semana.`,
          },
        ]
      : []),
    { regraId: r('volume.serie-indireta.peso'), texto: 'Séries indiretas (ex.: remada para o bíceps) contam como meia série.' },
    { regraId: r('rir.serie-efetiva'), texto: `Só contam séries de trabalho com até ${RIR.serieEfetivaMax} repetições de reserva.` },
    ...(nivel === 'avancado'
      ? [
          {
            regraId: r('tecnica.parcial-alongada'),
            texto: 'Se o fim do movimento incomodar, dá para fazer só a metade em que o músculo está esticado (por exemplo, a parte de baixo da rosca): cresce como o movimento completo, não mais.',
          },
        ]
      : []),
    {
      regraId: r('ordem.sessao'),
      texto: 'Ordem da sessão: multiarticulares primeiro, depois os grupos que você priorizou, core por último. A ordem quase não muda a hipertrofia.',
    },
    { regraId: r('selecao.manter-no-bloco'), texto: 'Os exercícios ficam os mesmos por 4 a 8 semanas; o programa só muda quando você pede.' },
  ];

  return {
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
  };
}

/** O texto do objetivo (objetivo.*; pesquisa-v2/12). "Ganhar músculo" (ou sem resposta) não tem texto próprio. */
export function textoDoObjetivo(objetivo: Objetivo | undefined, nivel: Nivel): Porque[] {
  if (objetivo === 'cutting')
    return [
      {
        regraId: r('objetivo.cutting.mesmo-programa'),
        texto: 'Objetivo "manter o músculo enquanto perde peso": o treino é o mesmo. Na dieta, o treino de força ajuda a manter o músculo e a perder mais gordura.',
      },
      {
        regraId: r('objetivo.cutting.texto'),
        texto: 'Quem decide a perda de peso é a alimentação, que o app não cobre: procure um nutricionista. Na dieta, é normal o músculo parar de crescer; a carga pode continuar subindo.',
      },
    ];
  if (objetivo === 'forca')
    return [
      {
        regraId: r('objetivo.forca.faixa-compostos'),
        texto:
          nivel === 'iniciante'
            ? 'Objetivo "ficar mais forte": no começo, o treino é o mesmo, e a força sobe com ele. A partir do nível intermediário, os 2 primeiros exercícios grandes de cada treino passam a usar menos repetições e mais descanso.'
            : `Objetivo "ficar mais forte": os 2 primeiros exercícios grandes com carga de cada treino usam ${OBJETIVO_FORCA.reps[0]} a ${OBJETIVO_FORCA.reps[1]} repetições e descanso de 2 min 30 s; o resto segue como no treino de músculo. O app não testa a carga máxima nem prepara para competição.`,
      },
    ];
  if (objetivo === 'saude')
    return [
      {
        regraId: r('objetivo.saude.texto'),
        texto: 'Objetivo "saúde e disposição": este treino cumpre a parte de força das recomendações da OMS e do ACSM. Elas pedem também 150 a 300 min por semana de atividade aeróbia moderada (como caminhada rápida), que o app não prescreve.',
      },
    ];
  return [];
}

/** Lembrete nos exercícios que carregam uma região marcada com dor de 0 a 5 (seguranca.dor.programa). */
export function lembretesDeDor(e: Exercicio, triagem: ResultadoTriagem): Porque[] {
  return triagem.dores
    .filter((d) => efeitoDaDor(d.nota) !== 'exclui' && e.articulacoes.includes(d.articulacao))
    .flatMap((d) => [
      {
        regraId: r('seguranca.dor.programa'),
        texto: `Você marcou ${ARTIGO[d.articulacao]} ${NOME_ARTICULACAO_MIN[d.articulacao]} (dor ${d.nota} hoje): se doer acima de 5 numa série, pare e use a alternativa.${
          efeitoDaDor(d.nota) === 'prefere-outros' ? ' Nesta vaga, nenhum exercício equivalente poupa a região.' : ''
        }`,
      },
      // Dor leve no punho (3 a 5) nas flexões com as mãos no chão: mãos fechadas, com o punho reto (tecnica.flexao.punho;
      // decisão do Gustavo em 04/11/2026). Só uma forma de fazer; o app não diagnostica.
      ...(d.articulacao === 'punho' && efeitoDaDor(d.nota) === 'prefere-outros' && MAOS_NO_CHAO.has(e.id)
        ? [{ regraId: r('tecnica.flexao.punho'), texto: 'Para poupar o punho: apoie as mãos fechadas numa toalha dobrada, com o punho reto, ou use pegadores de flexão.' }]
        : []),
    ]);
}
/** Flexões com as mãos apoiadas no chão (tecnica.flexao.punho). */
const MAOS_NO_CHAO = new Set(['flexao', 'flexao-fechada', 'flexao-pes-elevados', 'pike', 'flexao-elastico']);

const NOME_ARTICULACAO_MIN: Record<Articulacao, string> = {
  ombro: 'ombro',
  cotovelo: 'cotovelo',
  punho: 'punho',
  lombar: 'lombar',
  quadril: 'quadril',
  joelho: 'joelho',
  tornozelo: 'tornozelo',
};
const ARTIGO: Record<Articulacao, 'o' | 'a'> = { ombro: 'o', cotovelo: 'o', punho: 'o', lombar: 'a', quadril: 'o', joelho: 'o', tornozelo: 'o' };
/** "no ombro (7 hoje)"; sem nota (dado antigo): "no ombro (marcado na triagem, sem a nota de hoje)". */
export function textoDor(a: Articulacao, nota: number | undefined): string {
  const onde = `${ARTIGO[a] === 'a' ? 'na' : 'no'} ${NOME_ARTICULACAO_MIN[a]}`;
  return nota === undefined ? `${onde} (marcado na triagem, sem a nota de hoje)` : `${onde} (${nota} hoje)`;
}

function frequenciaTexto(d: Divisao): string {
  if (d.classica) return `${d.nome}: cada músculo treina 1 vez por semana; faltar a um dia tira a semana inteira daquele músculo.`;
  return `${d.nome}: cada músculo treina cerca de ${d.frequencia.replace('~', '')} vezes por semana.`;
}

const POR_ID_BIB: Record<string, Exercicio> = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
/** Os exercícios do padrão afundo (búlgaro e afundos): um por dia, havendo outra opção (selecao.funcao-da-vaga; R5a). */
const AFUNDOS = new Set(FUNCAO['afundo']!.niveis.flat());
const ehAfundo = (e: Exercicio) => AFUNDOS.has(e.id);

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
    e.id === 'panturrilha-chao'
      ? 'No chão o calcanhar não desce abaixo da ponta do pé: faça com uma perna de cada vez e desça em 3 s, para a série contar.'
      : e.tags.includes('alongado')
        ? 'Ênfase no alongamento: calcanhar abaixo do apoio e pausa embaixo.'
        : null,
  'selecao.alongado': () => 'Na função, vem primeiro a opção com o músculo mais alongado, que cresceu mais nos estudos.',
  'selecao.isolador-obrigatorio': () => 'Isolador que cobre o que os multiarticulares não cobrem (o reto femoral, na frente da coxa).',
  'selecao.gluteo': () => 'Glúteo: depois do agachar e do afundo, a extensão de quadril e, como complemento, a abdução.',
  'selecao.crucifixo-complemento': () => 'Complemento do peito com o músculo alongado.',
  'selecao.mergulho': (e) =>
    e.id === 'mergulho' ? 'Mergulho nas paralelas: exige mais do ombro, por isso só a partir do intermediário e atrás dos supinos.' : null,
  'selecao.aducao-complemento': () => 'Complemento opcional para a parte de dentro da coxa (adutores), porque pernas ou glúteos são prioridade.',
};

/**
 * O porquê dos itens do catálogo completo (pesquisa-v2/11, B.2.3): a caneleira (com o lado curto na extensão), a
 * mini-band (item próprio) e a roda abdominal (fora do iniciante; sai com dor lombar).
 */
function porqueDoEquipamento(e: Exercicio): Porque | null {
  const pede = (c: Capacidade) => e.requer.some((g) => g.includes(c));
  if (pede('caneleiras'))
    return {
      regraId: r('equipamento.caneleira'),
      texto:
        e.padrao === 'isolador-quadriceps'
          ? 'Com a caneleira, o peso pesa mais com o joelho esticado, o lado curto do músculo (o contrário do que se prefere), e pode ficar leve para quem já treina: por isso ela vem depois da cadeira extensora. Com carga leve, a série só conta perto da falha.'
          : 'As caneleiras abrem este complemento sem máquina. Com carga leve, a série só conta perto da falha.',
    };
  if (pede('mini_band'))
    return { regraId: r('equipamento.mini-band'), texto: 'A mini-band abre a abdução sem máquina; ela sobe pelas forças da sua mini-band, e não pelas dos elásticos longos.' };
  if (pede('roda_abdominal'))
    return {
      regraId: r('equipamento.roda-abdominal'),
      texto: 'Roda abdominal: exige muito da lombar, por isso fica fora do iniciante. Volte antes de a lombar arquear; com dor lombar, ela sai do treino.',
    };
  return null;
}

export function porqueDoExercicio(e: Exercicio, funcao: Funcao, nivelFuncao: number, nivel: Nivel, preferido = false): Porque[] {
  const p: Porque[] = [
    {
      regraId: r('selecao.funcao-da-vaga'),
      texto:
        nivelFuncao === 0
          ? `Vaga de ${funcao.nome.toLowerCase()}: entre as opções equivalentes, a que melhor cabe no seu equipamento.`
          : `Vaga de ${funcao.nome.toLowerCase()}: entre as opções do seu equipamento, a melhor para esta função.`,
    },
  ];
  if (preferido)
    p.push({ regraId: r('selecao.preferencia'), texto: 'Você prefere este entre os equivalentes da mesma função (dá para desfazer nas alternativas).' });
  for (const id of funcao.regras) {
    const texto = TEXTO_REGRA_FUNCAO[id]?.(e);
    if (texto) p.push({ regraId: r(id), texto });
  }
  const doEquipamento = porqueDoEquipamento(e);
  if (doEquipamento) p.push(doEquipamento);
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
/** `colchao`: a margem para fila (tempo.colchao) ou, com o aceite da pessoa, a margem pessoal (tempo.calibracao). */
export function minutos(exs: ExercicioPrescrito[], colchao: number = TEMPO.colchao): number {
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
  return Math.round((seg * (1 + colchao)) / 60);
}

const INFERIORES: Musculo[] = ['quadriceps', 'posteriores', 'gluteos', 'panturrilha'];
/** Empurrar ÷ puxar acima disto desequilibra o ombro (consenso, kolber2010; régua da G5, D1). */
const EMPURRAR_PUXAR_MAX = 1.5;
const EMPURRA_PADROES: Padrao[] = ['empurrar-h', 'empurrar-v', 'isolador-peito'];
const PUXA_PADROES: Padrao[] = ['puxar-h', 'puxar-v', 'isolador-ombro-posterior'];
const PUXAM: Musculo[] = ['costas', 'ombro_posterior'];
/**
 * Funções só de isolador que, com foco, entram depois das vagas do foco (volume.prioridade.foco-primeiro). Ficam de fora
 * os isoladores obrigatórios (selecao.isolador-obrigatorio) e a flexão de joelho (volume.equilibrio-coxa).
 */
const ISOLADORES_ADIAVEIS = new Set(['crucifixo', 'elevacao-lateral', 'ombro-posterior', 'biceps', 'abducao', 'abdomen']);
/** volume.prioridade.segundo-exercicio: quantos exercícios a mais um músculo do foco abaixo da meta pode ganhar. */
const SEGUNDOS_POR_MUSCULO = 2;
/** volume.prioridade.foco-primeiro: no tempo que sobra, quem não é foco fica pelo menos isto abaixo do foco mais fraco. */
const DISTANCIA_DO_FOCO = 6;
/** selecao.barra-negativa-iniciante: a barra fixa livre e a regressão dela. */
const BARRA_LIVRE = ['barra-fixa', 'barra-fixa-supinada'];
const BARRA_NEGATIVA = 'barra-fixa-negativa';
/** O dia passa do tempo acima disto (a estimativa já inclui a margem de fila; régua da G5, A3). */
const LIMITE_DO_DIA = 1.1;

/** volume.equilibrio-coxa: quadríceps ÷ posteriores nas séries semanais (sem posteriores e com quadríceps, infinito). */
export const razaoCoxa = (v: Partial<Record<Musculo, number>>) => {
  const q = v.quadriceps ?? 0;
  const h = v.posteriores ?? 0;
  return h ? q / h : q ? Infinity : 1;
};
const coxaNaFaixa = (v: Partial<Record<Musculo, number>>) => razaoCoxa(v) >= VOLUME.coxa[0] && razaoCoxa(v) <= VOLUME.coxa[1];
/** Tirar `menos` séries de `e` deixa a coxa na faixa (ou ela já estava fora: o limite estrutural não trava o corte). */
function mantemCoxa(e: Exercicio, menos: number, v: Partial<Record<Musculo, number>>): boolean {
  if (!coxaNaFaixa(v)) return true;
  const delta = (m: Musculo) => (e.musculos.primarios.includes(m) ? menos : e.musculos.secundarios.includes(m) ? menos * VOLUME.pesoIndireta : 0);
  return coxaNaFaixa({ ...v, quadriceps: (v.quadriceps ?? 0) - delta('quadriceps'), posteriores: (v.posteriores ?? 0) - delta('posteriores') });
}
/** Exercício direto de posteriores (volume.equilibrio-coxa): flexão de joelho ou dobrar o quadril. */
const DIRETO_POSTERIORES: Padrao[] = ['flexao-joelho', 'dobrar-quadril'];
/** `x` é o único exercício direto de posteriores da semana: tirá-lo deixaria a coxa sem trabalho direto de trás. */
const unicoDiretoDePosteriores = (x: ExercicioPrescrito, dias: DiaPrograma[]) =>
  DIRETO_POSTERIORES.includes(x.padrao) && dias.flatMap((d) => d.exercicios).filter((y) => DIRETO_POSTERIORES.includes(y.padrao)).length === 1;
/** Motivo de quem não tem nenhum exercício possível para o músculo (agrupado num aviso só). */
export const SEM_EXERCICIO = 'Sem exercício possível com o seu equipamento';
/** Nomes curtos, para os avisos em lista (decisão do Gustavo em 04/11/2026). */
export const NOME_MUSCULO_CURTO: Record<Musculo, string> = {
  peito: 'peito',
  costas: 'costas',
  ombro_anterior: 'ombro da frente',
  ombro_lateral: 'ombro lateral',
  ombro_posterior: 'ombro de trás',
  biceps: 'bíceps',
  triceps: 'tríceps',
  quadriceps: 'quadríceps',
  posteriores: 'posteriores da coxa',
  gluteos: 'glúteos',
  panturrilha: 'panturrilha',
  abdomen: 'abdômen',
  adutores: 'adutores',
};
const listaDeNomes = (ms: Musculo[]) => {
  const n = ms.map((m) => NOME_MUSCULO_CURTO[m]);
  return n.length > 1 ? `${n.slice(0, -1).join(', ')} e ${n[n.length - 1]}` : n[0]!;
};
/** Aviso de músculo abaixo da meta (inclusive o agrupado de quem não tem exercício possível). */
export const ehAvisoDeMeta = (a: Porque) =>
  a.texto.startsWith('Abaixo da meta') || a.regraId === 'equipamento.sem-ancoragem' || a.texto.startsWith(SEM_EXERCICIO);
/** Músculos citados num aviso de meta, pelo nome completo ou curto. */
export const musculosDoAviso = (a: Porque): Musculo[] =>
  (Object.keys(NOME_MUSCULO) as Musculo[]).filter((m) =>
    [NOME_MUSCULO[m], NOME_MUSCULO_CURTO[m]].some((n) => new RegExp(`(^|[ :,(])${n.replace(/[()]/g, '\\$&')}( |,|\\.|$)`).test(a.texto)),
  );

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
  colchao: number = TEMPO.colchao,
  /** Já saiu um exercício antes (a troca do protegido com 30 min): o aviso diz "menos exercícios". */
  jaTirouExercicio = false,
): DiaPrograma[] {
  const recalcular = (d: DiaPrograma) => ({ ...d, minutosEstimados: minutos(d.exercicios, colchao) });
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
    // volume.equilibrio-coxa: o corte não tira quadríceps ÷ posteriores da faixa de 0,5 a 2 (R5-CL).
    return e.musculos.primarios.every((m) => ok(m, menos)) && e.musculos.secundarios.every((m) => ok(m, menos * VOLUME.pesoIndireta)) && mantemCoxa(e, menos, v);
  };
  // O corte nunca tira o único exercício de um músculo: mesmo abaixo do piso, ele não vai a zero (sessão de equipamento
  // mínimo: com 20 min e prioridade pernas, a flexão de joelho deslizante saía e os posteriores zeravam).
  const naoZera = (x: ExercicioPrescrito, v: Partial<Record<Musculo, number>>) =>
    POR_ID_BIB[x.exId]!.musculos.primarios.every((m) => (v[m] ?? 0) - seriesDeVolume(x) > 0);
  const naoPrioPrimeiro = <T extends { x: ExercicioPrescrito; i: number }>(a: T, b: T) => Number(prioritario(a.x)) - Number(prioritario(b.x));
  const usados = new Set<string>(jaTirouExercicio ? ['corte'] : []);

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
          .filter(({ x }) => prioritario(x) === daPrioridade && x.tipo === 'isolador' && !obrigatorio(x) && cabe(x, seriesDeVolume(x), v) && naoZera(x, v) && !unicoDiretoDePosteriores(x, dias))
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
        texto: `${d.nome}: deve levar ~${d.minutosEstimados} min, mais que os ${limite} min que você tem.`,
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
  semPuxar = false,
): Porque[] {
  const fmt = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');
  // Prioritários: aviso abaixo da meta. Demais: só abaixo de 4, o limite de baixo do mínimo eficaz (4–6).
  const limiar = (m: Musculo) => (prioritarios.has(m) ? metas[m]! : Math.min(metas[m]!, VOLUME.minimoEficazPiso));
  const abaixo = (Object.keys(metas) as Musculo[]).filter((m) => (depois[m] ?? 0) < limiar(m));
  const porEstrutura = abaixo.filter((m) => (antes[m] ?? 0) < limiar(m));
  const porTempo = abaixo.filter((m) => !porEstrutura.includes(m));
  const item = (m: Musculo) => `${NOME_MUSCULO[m]} ${fmt(depois[m] ?? 0)} de ${fmt(metas[m]!)}`;
  const out: Porque[] = [];
  // Músculos sem nenhum exercício possível (e não por dor) viram um aviso só, com a lista (decisão do Gustavo em
  // 04/11/2026); sem nada para puxar, é o aviso equipamento.sem-ancoragem.
  const semExercicio = porEstrutura.filter((m) => motivoEstrutural(m) === SEM_EXERCICIO);
  if (semExercicio.length)
    out.push(
      semPuxar
        ? { regraId: r('equipamento.sem-ancoragem'), texto: `Sem algo para puxar ou levantar: ${listaDeNomes(semExercicio)} ficam sem exercício. O resto do corpo segue no programa.` }
        : { regraId: r('volume.semanal.alvo'), texto: `${SEM_EXERCICIO}: ${listaDeNomes(semExercicio)}.` },
    );
  if (porTempo.length) out.push({ regraId: r('tempo.corte'), texto: `Abaixo da meta por falta de tempo: ${porTempo.map((m) => `${item(m)} séries`).join('; ')}.` });
  for (const m of porEstrutura.filter((x) => !semExercicio.includes(x)))
    out.push({ regraId: r('volume.semanal.alvo'), texto: `Abaixo da meta: ${item(m)} séries por semana. ${motivoEstrutural(m)}.` });
  return out;
}

function fases(p: Perfil): Fase[] {
  if (p.semanasParado >= READAPTACAO.semanasProtocolo) return fasesDeReadaptacao();
  if (p.semanasParado >= READAPTACAO.semanasNormal)
    return [{ semanas: '1ª sessão', fatorSeries: 1, rir: null, texto: 'Primeira sessão de cada treino com 1 repetição a mais de reserva.', regraId: r('readaptacao.gatilho') }];
  if (p.nivel === 'iniciante')
    return [
      { semanas: '1–2', fatorSeries: VOLUME.faseAprendizado, rir: [3, 4], texto: 'Fase de aprendizado: foco na técnica, volume no mínimo, RIR 3–4 e sem superséries.', regraId: r('iniciante.fase-aprendizado') },
      { semanas: '3+', fatorSeries: 1, rir: null, texto: 'Programa completo.', regraId: r('iniciante.fase-aprendizado') },
    ];
  return [];
}

/**
 * As 3 semanas da volta gradual (readaptacao.semana1 a semana3). Sem `volta`, é a do cadastro (a pausa dita antes de
 * começar, sem histórico de carga). Com `volta`, é a da pausa detectada durante o uso (readaptacao.durante-uso): a carga
 * da semana 1 já vem reduzida da última vez, ou, acima de 26 semanas, a 1ª série acerta a carga a partir da última −20%.
 */
export function fasesDeReadaptacao(volta?: { reducao: number; calibrar?: boolean }): Fase[] {
  const pct = volta ? Math.round(volta.reducao * 100) : 0;
  const texto1 = !volta
    ? 'Cerca de metade das séries, RIR 3–4 e carga 10–20% abaixo da que você usava antes da pausa (na dúvida, comece leve).'
    : volta.calibrar
      ? `Cerca de metade das séries e RIR 3–4. A 1ª série de cada exercício acerta a carga, começando ${pct}% abaixo da última vez.`
      : `Cerca de metade das séries, RIR 3–4 e carga ${pct}% abaixo da última vez (já vem preenchida).`;
  return [
    { semanas: '1', fatorSeries: READAPTACAO.semana1.fatorSeries, rir: READAPTACAO.semana1.rir, texto: texto1, regraId: r('readaptacao.semana1') },
    { semanas: '2', fatorSeries: READAPTACAO.semana2.fatorSeries, rir: READAPTACAO.semana2.rir, texto: 'Cerca de 3/4 das séries, RIR 2–3.', regraId: r('readaptacao.semana2') },
    { semanas: '3+', fatorSeries: 1, rir: null, texto: 'Programa completo; as cargas desta semana viram a referência.', regraId: r('readaptacao.semana3') },
  ];
}

/** A fase que vale numa semana ("1", "1–2", "3+"; "1ª sessão" não tem semana). */
export function faseNaSemana(fases: Fase[], semana: number): Fase | undefined {
  return fases.find((f) => {
    const [a, b] = f.semanas.split(/[–+]/);
    const ini = Number(a);
    if (Number.isNaN(ini)) return false;
    if (f.semanas.endsWith('+')) return semana >= ini;
    return semana >= ini && semana <= Number(b || a);
  });
}

/**
 * Séries e RIR da semana, aplicando a fase (readaptação ou aprendizado).
 * Na fase de aprendizado do iniciante não há supersérie (tempo.superserie), e nas semanas com RIR 3–4
 * não há drop set, porque ele pede chegar perto da falha (tempo.corte); a série do drop set volta a ser normal.
 */
export function prescricaoDaSemana(programa: Programa, semana: number, fases: Fase[] = programa.fases): DiaPrograma[] {
  return aplicarFase(programa.dias, faseNaSemana(fases, semana));
}

/** Aplica uma fase (readaptação, aprendizado ou semana leve) aos dias: séries, RIR, supersérie e drop set. */
export function aplicarFase(dias: DiaPrograma[], fase: Fase | undefined): DiaPrograma[] {
  if (!fase || fase.fatorSeries === 1) return dias;
  const semSuperserie = fase.regraId === 'iniciante.fase-aprendizado';
  const semDropSet = !!fase.rir && fase.rir[0] >= 3;
  return dias.map((d) => ({
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

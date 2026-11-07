import { POR_ID, type Articulacao, type Exercicio, type Musculo } from '../biblioteca';
import {
  cabeNoTeto,
  colchaoDe,
  contextoDeSelecao,
  metasDoPerfil,
  minutos,
  MUSCULOS_COM_META,
  musculosDoAviso,
  NOME_MUSCULO_CURTO,
  GRUPOS,
  prescrever,
  seriesDeVolume,
  textoDor,
  volumePorMusculo,
  type ExercicioPrescrito,
  type Perfil,
} from '../gerador';
import { FUNCAO, funcoesDoExercicio, type Funcao } from '../gerador/funcoes';
import { NIVEL_COMPLEXIDADE_MAX, REGRAS, VOLUME, exerciciosPorSessao, r, type Selo } from '../regras';
import { capacidades, type Inventario } from '../taxonomia/equipamentos';
import { avaliarTriagem } from '../triagem';
import { COMPLEMENTOS } from './complementos';

// O avaliador de programas (R5b; docs/revisoes/proximos-passos/b-monte-e-avaliador.md). Função pura e determinística:
// recebe qualquer programa feito com exercícios da biblioteca (o gerado, um digitado, um editado), o perfil e o
// inventário, e devolve os achados com regraId, selo, gravidade e o que ajustar, ou "está bom". Mede pela tabela de
// funções (funcoes.json), como o gerador. Só a segurança bloqueia (avaliador.gravidade); o resto orienta.

export type Gravidade = 'seguranca' | 'alerta' | 'ajustar' | 'limite' | 'info';
export const GRAVIDADES: Gravidade[] = ['seguranca', 'alerta', 'ajustar', 'limite', 'info'];
export type Veredito = 'bloqueado' | 'ajustar' | 'limite' | 'bom';

export type Achado = {
  gravidade: Gravidade;
  regraId: string;
  selo: Selo;
  /** Chave do agrupamento: achados com a mesma chave viram uma linha só. */
  tipo: string;
  /** Fato + próximo passo (acompanhamento.mensagens). */
  texto: string;
  /** O que foi agrupado (exercícios, dias, músculos), na ordem do programa. */
  itens: string[];
  /** Músculos citados (para os testes e a tela). */
  musculos: Musculo[];
};

export type LinhaDoMusculo = {
  musculo: Musculo;
  series: number;
  meta: number;
  /** Abaixo disto há achado: a meta, no prioritário; o piso de 4, nos demais (volume.semanal.minimo-eficaz). */
  limiar: number;
  prioritario: boolean;
  /** Dias da semana com alguma série do músculo (direta ou indireta). */
  dias: number;
  /** Grupos de funções que se complementam cobertos (só nos músculos grandes). */
  funcoes: string[];
};

export type Avaliacao = {
  veredito: Veredito;
  achados: Achado[];
  musculos: LinhaDoMusculo[];
  dias: { nome: string; minutos: number; exercicios: number }[];
  minutosSessao: number;
  equilibrio: { empurrar: number; puxar: number; quadriceps: number; posteriores: number };
};

/** O mínimo que o avaliador precisa de um exercício; o `ExercicioPrescrito` do gerador cabe aqui. */
export type ExercicioDoPrograma = {
  exId: string;
  series: number;
  dropSet?: boolean;
  supersetCom?: string;
  /** Função da vaga (gerador); sem ela, vale a 1ª função possível do exercício na tabela. */
  funcao?: string;
  reps?: [number, number];
  descansoSeg?: number;
};
export type ProgramaParaAvaliar = { dias: { nome: string; exercicios: ExercicioDoPrograma[] }[] };

const INFERIORES: Musculo[] = ['quadriceps', 'posteriores', 'gluteos', 'panturrilha'];
const EMPURRAR = ['empurrar-horizontal', 'empurrar-inclinado', 'empurrar-vertical', 'crucifixo'];
const PUXAR = ['puxar-vertical', 'puxar-horizontal', 'ombro-posterior'];
const POSTERIORES_DIRETO = ['flexao-joelho', 'dobrar-quadril'];
export const LIMIAR_EMPURRAR_PUXAR = 1.5; // avaliador.equilibrio.empurrar-puxar
export const FAIXA_COXA: [number, number] = [0.5, 2]; // avaliador.equilibrio.coxa

const fmt = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');
const emLista = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs[xs.length - 1]}` : (xs[0] ?? ''));
const nomeM = (m: Musculo) => NOME_MUSCULO_CURTO[m];
const minusc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const plural = (n: number, um: string, varios: string) => (n === 1 ? um : varios);

type Bruto = { gravidade: Gravidade; regraId: string; tipo: string; item: string; musculos: Musculo[]; montar: (itens: string[]) => string };

export function avaliar(programa: ProgramaParaAvaliar, perfil: Perfil, inventario: Inventario): Avaliacao {
  const triagem = avaliarTriagem(perfil.triagem);
  const ctx = contextoDeSelecao(perfil, inventario, triagem);
  const nivel = perfil.nivel;
  const colchao = colchaoDe(perfil);
  const orcamento = perfil.minutosSessao;
  const N = exerciciosPorSessao(orcamento);
  const prioritarios = new Set<Musculo>(perfil.prioridades.flatMap((g) => GRUPOS[g]));
  const metas = metasDoPerfil(nivel, perfil.prioridades);
  const brutos: Bruto[] = [];
  const achar = (b: Bruto) => brutos.push(b);

  /** O exercício está na função (tabela) e vale nela neste inventário (condições da função). */
  const naTabela = (f: Funcao, id: string) => f.niveis.some((n) => n.includes(id)) && ctx.naFuncao(f, id);

  // ---------- o programa, completo ----------
  const funcaoDe = (x: ExercicioDoPrograma): { funcao: Funcao; nivel: number } => {
    const daVaga = x.funcao ? FUNCAO[x.funcao] : undefined;
    const fs = daVaga && daVaga.niveis.some((n) => n.includes(x.exId)) ? [daVaga] : funcoesDoExercicio(x.exId);
    const f = fs.find((y) => ctx.naFuncao(y, x.exId)) ?? fs[0]!;
    return { funcao: f, nivel: f.niveis.findIndex((n) => n.includes(x.exId)) };
  };
  const foraDaBiblioteca: string[] = [];
  const dias = programa.dias.map((d) => ({
    nome: d.nome,
    exercicios: d.exercicios.flatMap((x): { e: Exercicio; p: ExercicioPrescrito; funcao: Funcao }[] => {
      const e = POR_ID[x.exId];
      if (!e) {
        foraDaBiblioteca.push(x.exId);
        return [];
      }
      const { funcao, nivel: nf } = funcaoDe(x);
      const base: ExercicioPrescrito =
        x.reps && x.descansoSeg !== undefined
          ? { exId: e.id, nome: e.nome, padrao: e.padrao, tipo: e.tipo, funcao: funcao.id, series: x.series, reps: x.reps, rir: [1, 2], descansoSeg: x.descansoSeg, unilateral: e.unilateral, animacaoId: e.animacaoId, alternativas: [], porque: [] }
          : prescrever(e, funcao, nf, x.series, ctx);
      const p: ExercicioPrescrito = {
        ...base,
        series: x.series,
        ...(x.reps ? { reps: x.reps } : {}),
        ...(x.descansoSeg !== undefined ? { descansoSeg: x.descansoSeg } : {}),
        ...(x.dropSet ? { dropSet: true } : {}),
        ...(x.supersetCom ? { supersetCom: x.supersetCom } : {}),
      };
      return [{ e, p, funcao }];
    }),
  }));
  const todos = dias.flatMap((d, di) => d.exercicios.map((x) => ({ ...x, di })));
  const volumeDe = (xs: { e: Exercicio; p: ExercicioPrescrito }[]) => volumePorMusculo(xs.map((x) => ({ ex: x.e, series: seriesDeVolume(x.p) })));
  const volume = volumeDe(todos);
  const volumeDoDia = dias.map((d) => volumeDe(d.exercicios));
  const minutosDoDia = dias.map((d) => minutos(d.exercicios.map((x) => x.p), colchao));

  if (foraDaBiblioteca.length)
    achar({
      gravidade: 'alerta',
      regraId: r('avaliador.gravidade'),
      tipo: 'fora-da-biblioteca',
      item: foraDaBiblioteca.join(', '),
      musculos: [],
      montar: (it) => `Fora da biblioteca do app: ${emLista(it)}. O avaliador não mede ${plural(it.length, 'este exercício', 'estes exercícios')}; troque por um da biblioteca.`,
    });

  // ---------- segurança ----------
  if (triagem.bloqueado)
    achar({
      gravidade: 'seguranca',
      regraId: r('seguranca.triagem'),
      tipo: 'triagem',
      item: 'triagem',
      musculos: [],
      montar: () =>
        'A triagem tem um "sim" ainda sem liberação: o treino fica suspenso até você confirmar, com um médico ou profissional de Educação Física, que pode treinar. Depois, marque a liberação na triagem.',
    });
  const doresPorRegiao = new Map(triagem.dores.map((d) => [d.articulacao, d.nota]));
  const capsSemEvitar = capacidades(inventario);
  const vistos = new Set<string>();
  for (const { e, funcao } of todos) {
    if (vistos.has(e.id)) continue;
    vistos.add(e.id);
    for (const a of e.articulacoes.filter((x) => ctx.regioesExcluidas.includes(x))) {
      const alt = ctx.alternativasDe(e, funcao).find((id) => !POR_ID[id]!.articulacoes.some((y) => ctx.regioesExcluidas.includes(y)));
      achar({
        gravidade: 'seguranca',
        regraId: r('seguranca.dor.programa'),
        tipo: `dor:${a}`,
        item: `${e.nome.toLowerCase()} (${alt ? `no lugar: ${POR_ID[alt]!.nome.toLowerCase()}` : 'sem alternativa que poupe a região'})`,
        musculos: [],
        montar: (it) =>
          `${it.length} ${plural(it.length, 'exercício carrega', 'exercícios carregam')} a região com dor ${textoDor(a as Articulacao, doresPorRegiao.get(a))}: ${emLista(it)}. ${plural(it.length, 'Ele sai', 'Eles saem')} do treino enquanto a dor não baixar. Procure avaliação profissional; quando a dor baixar, atualize a nota na triagem.`,
      });
    }
    const possivelAqui = e.requer.some((g) => g.every((c) => ctx.caps.has(c)));
    const possivelSemEvitar = e.requer.some((g) => g.every((c) => capsSemEvitar.has(c)));
    if (!possivelAqui && possivelSemEvitar)
      achar({ gravidade: 'alerta', regraId: r('avaliador.gravidade'), tipo: 'equipamento-evitado', item: e.nome.toLowerCase(), musculos: [], montar: (it) => `Pede um equipamento que você marcou para evitar: ${emLista(it)}. Troque por uma alternativa ou tire o equipamento da lista de evitar.` });
    else if (!possivelAqui)
      achar({ gravidade: 'alerta', regraId: r('equipamento.capacidades'), tipo: 'equipamento', item: e.nome.toLowerCase(), musculos: [], montar: (it) => `Pede um equipamento que não está no seu local: ${emLista(it)}. Troque por uma alternativa da mesma função, ou acrescente o equipamento ao local se ele existe.` });
    if (perfil.evitarExercicios.includes(e.id))
      achar({ gravidade: 'alerta', regraId: r('avaliador.gravidade'), tipo: 'evitado', item: e.nome.toLowerCase(), musculos: [], montar: (it) => `Você marcou para evitar: ${emLista(it)}. Troque por uma alternativa, ou tire da lista de evitar.` });
    if (e.complexidade > NIVEL_COMPLEXIDADE_MAX[nivel])
      achar({
        gravidade: 'alerta',
        regraId: r('selecao.complexidade-nivel'),
        tipo: 'complexidade',
        item: e.nome.toLowerCase(),
        musculos: [],
        montar: (it) => `Técnica mais difícil que o indicado para o nível ${nivel === 'iniciante' ? 'iniciante' : nivel}: ${emLista(it)}. Comece por uma alternativa mais estável e volte a ${plural(it.length, 'ele', 'eles')} quando a técnica estiver firme.`,
      });
  }

  // ---------- séries por exercício e por sessão ----------
  // O mesmo exercício com as mesmas séries em vários dias vira um item só ("nos 3 dias").
  const nosDias = (dis: number[]) =>
    dias.length > 1 && dis.length === dias.length ? `${dias.length === 2 ? 'nos 2 dias' : `nos ${dias.length} dias`}` : emLista(dis.map((i) => dias[i]!.nome));
  const juntarPorDia = (lista: { chave: string; di: number }[]) => {
    const m = new Map<string, number[]>();
    for (const { chave, di } of lista) m.set(chave, [...new Set([...(m.get(chave) ?? []), di])]);
    return [...m].map(([chave, dis]) => ({ chave, dis }));
  };
  for (const { chave, dis } of juntarPorDia(todos.filter((x) => seriesDeVolume(x.p) > VOLUME.seriesPorExercicio.max).map((x) => ({ chave: `${x.e.nome.toLowerCase()}, ${seriesDeVolume(x.p)} séries`, di: x.di }))))
    achar({
      gravidade: 'ajustar',
      regraId: r('volume.series-por-exercicio'),
      tipo: 'series-acima',
      item: dias.length > 1 ? `${chave} (${nosDias(dis)})` : chave,
      musculos: [],
      montar: (it) => `Mais de ${VOLUME.seriesPorExercicio.max} séries num exercício só: ${emLista(it)}. Divida as séries entre 2 exercícios da mesma função, ou entre 2 dias.`,
    });
  for (const { chave, dis } of juntarPorDia(todos.filter((x) => x.p.series < VOLUME.seriesPorExercicio.min).map((x) => ({ chave: x.e.nome.toLowerCase(), di: x.di }))))
    achar({
      gravidade: 'ajustar',
      regraId: r('volume.series-por-exercicio'),
      tipo: 'serie-unica',
      item: `${chave} (${nosDias(dis)})`,
      musculos: [],
      montar: (it) => `Uma série só: ${emLista(it)}. Faça pelo menos ${VOLUME.seriesPorExercicio.min}, ou junte com outro exercício do mesmo músculo.`,
    });
  const acimaNaSessao = dias.flatMap((_, di) =>
    MUSCULOS_COM_META.filter((m) => (volumeDoDia[di]![m] ?? 0) > VOLUME.sessaoTeto).map((m) => ({ chave: `${nomeM(m)} ${fmt(volumeDoDia[di]![m]!)}`, di, m })),
  );
  for (const { chave, dis } of juntarPorDia(acimaNaSessao))
    achar({
      gravidade: 'ajustar',
      regraId: r('volume.sessao.teto'),
      tipo: 'sessao-teto',
      item: `${chave} (${nosDias(dis)})`,
      musculos: [acimaNaSessao.find((x) => x.chave === chave)!.m],
      montar: (it) => `Mais de ${VOLUME.sessaoTeto} séries de um músculo num treino (contando as indiretas pela metade): ${emLista(it)}. Leve as séries que passam para outro dia.`,
    });

  // ---------- a semana, por músculo ----------
  const diasCom = (m: Musculo) => volumeDoDia.filter((v) => (v[m] ?? 0) > 0).length;
  const possiveisDe = (m: Musculo) => ctx.possiveis.filter((e) => e.musculos.primarios.includes(m));
  const perdidoPorDor = (m: Musculo) => ctx.possiveisSemRegiao.some((e) => e.musculos.primarios.includes(m) && ctx.carregaExcluida(e));
  const dorTexto = () => ctx.regioesExcluidas.map((a) => textoDor(a, doresPorRegiao.get(a))).join(' e ');
  const naoPrioTexto = (m: Musculo) => (m === 'abdomen' ? 'volume.semanal.abdomen' : 'volume.semanal.minimo-eficaz');

  /** Melhor exercício possível de uma lista de funções, fora os que o programa já tem (a ordem da tabela de funções). */
  const melhorDe = (funcoes: Funcao[], excluir: Set<string>) => {
    for (const f of funcoes) {
      const res = ctx.resolver({ funcao: f.id });
      if (!res || res.funcao.id !== f.id) continue;
      const achado = ctx.escolher(f, res.nivel, (id) => excluir.has(id), new Map());
      if (achado) return { e: achado.ex, f, nivel: achado.nivelFuncao };
    }
    return null;
  };
  const noPrograma = new Set(todos.map((x) => x.e.id));
  /** Um exercício novo, com 2 séries, cabe em algum dia: ainda cabem exercícios nos minutos, o dia fica no tempo, e nenhum teto passa. */
  const diaQueCabe = (e: Exercicio, f: Funcao, nf: number): number => {
    const novo = prescrever(e, f, nf, VOLUME.seriesPorExercicio.min, ctx);
    const extra = volumePorMusculo([{ ex: e, series: VOLUME.seriesPorExercicio.min }]);
    if (!cabeNoTeto(volume, e)) return -1;
    // Num dia da mesma região do corpo (superior ou inferior), quando o programa separa as regiões.
    const regiao = (x: Exercicio) => (x.padrao === 'core' ? 'core' : x.musculos.primarios.some((k) => INFERIORES.includes(k)) ? 'inferior' : 'superior');
    const daRegiao = dias.map((d) => d.exercicios.some((x) => regiao(x.e) === regiao(e)) || regiao(e) === 'core');
    const ordem = dias.map((_, i) => i).sort((a, b) => Number(!daRegiao[a]) - Number(!daRegiao[b]) || a - b);
    return ordem.find((di) => {
      const d = dias[di]!;
      return (
        d.exercicios.length < N &&
        !d.exercicios.some((x) => x.e.id === e.id) &&
        minutos([...d.exercicios.map((x) => x.p), novo], colchao) <= orcamento &&
        (Object.keys(extra) as Musculo[]).every((k) => (volumeDoDia[di]![k] ?? 0) + extra[k]! <= VOLUME.sessaoTeto)
      );
    }) ?? -1;
  };
  /** Uma série a mais num exercício que já está no programa, sem passar de 4, do teto da sessão, do semanal nem dos minutos. */
  const serieQueCabe = (m: Musculo) =>
    todos.find(({ e, p, di }) => {
      if (!e.musculos.primarios.includes(m) || seriesDeVolume(p) >= VOLUME.seriesPorExercicio.max) return false;
      const extra = volumePorMusculo([{ ex: e, series: 1 }]);
      if (!(Object.keys(extra) as Musculo[]).every((k) => (volumeDoDia[di]![k] ?? 0) + extra[k]! <= VOLUME.sessaoTeto)) return false;
      if (!cabeNoTeto(volume, e, 1)) return false;
      const exs = dias[di]!.exercicios.map((x) => (x.p === p ? { ...p, series: p.series + 1 } : x.p));
      return minutos(exs, colchao) <= orcamento;
    });
  /** Tirar um exercício (não obrigatório) cujos músculos seguem na meta, e pôr o novo no mesmo dia, sem passar dos minutos. */
  const jaTrocados = new Set<ExercicioPrescrito>();
  const trocaQueCabe = (m: Musculo, novo: { e: Exercicio; f: Funcao; nivel: number }) => {
    const novoP = prescrever(novo.e, novo.f, novo.nivel, VOLUME.seriesPorExercicio.min, ctx);
    for (const x of todos) {
      if (x.e.musculos.primarios.includes(m) || x.funcao.obrigatoria || jaTrocados.has(x.p)) continue;
      const tira = volumePorMusculo([{ ex: x.e, series: seriesDeVolume(x.p) }]);
      const sobra = (Object.keys(tira) as Musculo[]).every((k) => !(metas[k] ?? 0) || (volume[k] ?? 0) - tira[k]! >= metas[k]!);
      // Nunca o único exercício direto de um músculo com meta (selecao.multi-mono: a rosca cresceu os flexores do cotovelo 2× a remada).
      const unicoDireto = x.e.musculos.primarios.some((k) => (metas[k] ?? 0) && !todos.some((y) => y.e.id !== x.e.id && y.e.musculos.primarios.includes(k)));
      if (!sobra || unicoDireto) continue;
      const dia = dias[x.di]!.exercicios.filter((y) => y.p !== x.p);
      if (dia.some((y) => y.e.id === novo.e.id) || minutos([...dia.map((y) => y.p), novoP], colchao) > orcamento) continue;
      jaTrocados.add(x.p);
      return { sai: x, di: x.di };
    }
    return null;
  };
  const semTempo = `com ${dias.length} ${plural(dias.length, 'treino', 'treinos')} de ${orcamento} min não cabe mais`;

  const linhas: LinhaDoMusculo[] = [];
  for (const m of MUSCULOS_COM_META) {
    const v = volume[m] ?? 0;
    const meta = metas[m] ?? 0;
    const prio = prioritarios.has(m);
    const limiar = prio ? meta : Math.min(meta, VOLUME.minimoEficazPiso);
    linhas.push({ musculo: m, series: v, meta, limiar, prioritario: prio, dias: diasCom(m), funcoes: [] });
    if (v > VOLUME.teto)
      achar({
        gravidade: 'ajustar',
        regraId: r('volume.semanal.teto-padrao'),
        tipo: 'teto-semanal',
        item: `${nomeM(m)} ${fmt(v)}`,
        musculos: [m],
        montar: (it) => `Mais de ${VOLUME.teto} séries por semana: ${emLista(it)}. Acima de ~${VOLUME.teto}, o ganho extra é pequeno e incerto: tire séries ou leve-as para um músculo abaixo da meta.`,
      });
    else if (v > VOLUME.maximo[nivel] && !prio)
      achar({
        gravidade: 'info',
        regraId: r('volume.semanal.maximo'),
        tipo: 'maximo-nivel',
        item: `${nomeM(m)} ${fmt(v)}`,
        musculos: [m],
        montar: (it) => `Acima do máximo indicado para o seu nível (${VOLUME.maximo[nivel]} por semana), sem ser foco: ${emLista(it)}. Não é um problema; se faltar tempo para outro músculo, é daqui que as séries podem sair.`,
      });
    const necessarios = Math.ceil(v / VOLUME.sessaoTeto);
    if (v > VOLUME.sessaoTeto && diasCom(m) < necessarios)
      achar({
        gravidade: 'ajustar',
        regraId: r('frequencia.musculo'),
        tipo: 'frequencia',
        item: `${nomeM(m)} ${fmt(v)} em ${diasCom(m)} ${plural(diasCom(m), 'dia', 'dias')}`,
        musculos: [m],
        montar: (it) => `Séries demais em poucos dias: ${emLista(it)}. Com mais de ${VOLUME.sessaoTeto} séries por semana, divida o músculo em pelo menos 2 dias.`,
      });
    if (v >= limiar) continue;
    const regra = prio ? 'volume.semanal.alvo' : naoPrioTexto(m);
    const item = `${nomeM(m)} ${fmt(v)} de ${fmt(prio ? meta : limiar)}`;
    if (!possiveisDe(m).length) {
      const porDor = perdidoPorDor(m);
      achar({
        gravidade: 'limite',
        regraId: r(regra),
        tipo: porDor ? 'meta-dor' : 'meta-equipamento',
        item,
        musculos: [m],
        montar: porDor
          ? (it) => `Abaixo da meta por causa da dor ${dorTexto()}: ${emLista(it)} séries por semana. Não precisa fazer nada agora; quando a dor baixar, atualize a nota na triagem e o programa volta a incluir esses exercícios.`
          : (it) => `Sem exercício possível com o seu equipamento: ${emLista(it)} séries por semana. Não precisa fazer nada: o resto do programa segue igual.`,
      });
      continue;
    }
    const serie = serieQueCabe(m);
    if (serie) {
      achar({
        gravidade: 'ajustar',
        regraId: r(regra),
        tipo: 'meta-cabe',
        item: `${item} (suba 1 série em ${serie.e.nome.toLowerCase()}, no treino ${dias[serie.di]!.nome})`,
        musculos: [m],
        montar: (it) => `Abaixo da meta, e cabe mais: ${emLista(it)}.`,
      });
      continue;
    }
    const novo = melhorDe(
      Object.values(FUNCAO).filter((f) => f.musculo === m),
      noPrograma,
    );
    const di = novo ? diaQueCabe(novo.e, novo.f, novo.nivel) : -1;
    if (novo && di >= 0) {
      achar({
        gravidade: 'ajustar',
        regraId: r(regra),
        tipo: 'meta-cabe',
        item: `${item} (acrescente ${novo.e.nome.toLowerCase()} no treino ${dias[di]!.nome})`,
        musculos: [m],
        montar: (it) => `Abaixo da meta, e cabe mais: ${emLista(it)}.`,
      });
      continue;
    }
    // Trocar: um exercício de um dia cujos músculos continuam na meta sem ele dá lugar ao que falta, e o dia cabe.
    const troca = novo ? trocaQueCabe(m, novo) : null;
    if (troca) {
      achar({
        gravidade: 'ajustar',
        regraId: r(regra),
        tipo: 'meta-troca',
        item: `${item} (no treino ${dias[troca.di]!.nome}, troque ${troca.sai.e.nome.toLowerCase()} por ${novo!.e.nome.toLowerCase()})`,
        musculos: [m],
        montar: (it) => `Abaixo da meta, e cabe se trocar um exercício de músculos que já passaram da meta: ${emLista(it)}.`,
      });
      continue;
    }
    // Passar séries de lá para cá: um músculo sem foco está acima do máximo do nível, ou algum acima do teto de 20.
    const excesso = MUSCULOS_COM_META.filter((k) => (volume[k] ?? 0) > VOLUME.teto || (!prioritarios.has(k) && (volume[k] ?? 0) > VOLUME.maximo[nivel]));
    if (excesso.length) {
      achar({
        gravidade: 'ajustar',
        regraId: r(regra),
        tipo: 'meta-excesso',
        item,
        musculos: [m],
        montar: (it) =>
          `Abaixo da meta: ${emLista(it)} séries por semana, enquanto ${emLista(excesso.map((k) => `${nomeM(k)} tem ${fmt(volume[k] ?? 0)}`))} (acima do máximo do nível). Passe séries de lá para cá: o tempo é o mesmo.`,
      });
      continue;
    }
    achar({
      gravidade: 'limite',
      regraId: r(regra),
      tipo: 'meta-tempo',
      item,
      musculos: [m],
      montar: (it) =>
        `Abaixo da meta: ${emLista(it)} séries por semana; ${semTempo}. Não precisa fazer nada; para chegar lá, mais minutos por treino, mais um dia${perfil.prioridades.length > 1 ? ' ou menos grupos de foco' : ''}.`,
    });
  }

  // ---------- funções que se complementam (selecao.exercicios-por-musculo; selecao.gluteo) ----------
  const nivelEm = (f: string, id: string) => FUNCAO[f]!.niveis.findIndex((n) => n.includes(id));
  const nivelProprio = (id: string) => Math.min(...funcoesDoExercicio(id).map((f) => nivelEm(f.id, id)));
  const nivelResolvido = new Map(Object.keys(FUNCAO).map((f) => [f, ((res) => (res && res.funcao.id === f ? res.nivel : -1))(ctx.resolver({ funcao: f }))]));
  const contaNaFuncao = (f: string, id: string) => {
    const n = nivelEm(f, id);
    return n >= 0 && (n === nivelProprio(id) || n === nivelResolvido.get(f));
  };
  for (const c of COMPLEMENTOS) {
    const m = c.musculo;
    const linha = linhas.find((l) => l.musculo === m);
    // Cada vez que o exercício aparece conta numa função só. Ele vale na função em que está no seu melhor nível e,
    // fora dela, só onde a tabela o escolheria com este equipamento (o supino reto na vaga de inclinado, sem banco
    // inclinável: selecao.peitoral-inclinado). Decisão do R5b (07/11/2026), medida em docs/revisoes/r5b/medidas.md.
    const dele = todos
      .map((x) => ({ id: x.e.id, grupos: c.grupos.filter((g) => g.funcoes.some((f) => contaNaFuncao(f, x.e.id))).map((g) => g.id) }))
      .filter((x) => x.grupos.length);
    const cobertos = emparelhar(dele.map((x) => x.grupos));
    if (linha) linha.funcoes = c.grupos.filter((g) => cobertos.has(g.id)).map((g) => g.nome);
    if (!cobertos.size || cobertos.size >= 2 || !(metas[m] ?? 0)) continue;
    const faltam = c.grupos.filter((g) => !cobertos.has(g.id));
    const unico = c.grupos.find((g) => cobertos.has(g.id))!;
    const candidato = melhorDe(
      faltam.flatMap((g) => g.funcoes.map((f) => FUNCAO[f]!)),
      noPrograma,
    );
    const item = `${nomeM(m)} só com ${unico.nome}`;
    if (!candidato) {
      achar({
        gravidade: 'limite',
        regraId: r(c.regra),
        tipo: 'funcoes-equipamento',
        item,
        musculos: [m],
        montar: (it) => `Uma função só: ${emLista(it)}. O seu equipamento (ou a dor de hoje) não abre outra: não precisa fazer nada.`,
      });
      continue;
    }
    // Trocar: o músculo tem 2 exercícios diretos da mesma função; um deles dá lugar à função que falta.
    const diretosDoGrupo = todos.filter((x) => x.e.musculos.primarios.includes(m) && dele.some((d) => d.id === x.e.id && d.grupos.includes(unico.id)));
    const repetido = [...new Set(diretosDoGrupo.map((x) => x.e.id))].length >= 2 ? diretosDoGrupo.at(-1) : undefined;
    const di = diaQueCabe(candidato.e, candidato.f, candidato.nivel);
    if (repetido || di >= 0) {
      const passo = repetido
        ? `no treino ${dias[repetido.di]!.nome}, troque ${repetido.e.nome.toLowerCase()} por ${candidato.e.nome.toLowerCase()}`
        : `acrescente ${candidato.e.nome.toLowerCase()} no treino ${dias[di]!.nome}`;
      achar({
        gravidade: 'ajustar',
        regraId: r(c.regra),
        tipo: `funcoes:${m}`,
        item,
        musculos: [m],
        montar: (it) => `Uma função só: ${emLista(it)}. Funções diferentes crescem regiões diferentes do músculo: ${passo}.`,
      });
    } else
      achar({
        gravidade: 'limite',
        regraId: r(c.regra),
        tipo: 'funcoes-tempo',
        item,
        musculos: [m],
        montar: (it) => `Uma função só: ${emLista(it)}; ${semTempo}. Não precisa fazer nada; com mais minutos, entra outra função.`,
      });
  }

  // ---------- isoladores obrigatórios (selecao.isolador-obrigatorio) ----------
  for (const f of Object.values(FUNCAO).filter((x) => x.obrigatoria)) {
    if (!(metas[f.musculo] ?? 0)) continue;
    if (todos.some((x) => f.niveis.some((n) => n.includes(x.e.id)) && (ctx.naFuncao(f, x.e.id) || !(f.condicoes?.[x.e.id]?.length)))) continue;
    const candidato = melhorDe([f], noPrograma);
    if (!candidato) continue; // sem exercício possível: é o aviso de lacuna (ou a meta do músculo)
    const di = diaQueCabe(candidato.e, candidato.f, candidato.nivel);
    const item = `${minusc(f.nome)} (${candidato.e.nome.toLowerCase()})`;
    if (di >= 0)
      achar({
        gravidade: 'ajustar',
        regraId: r('selecao.isolador-obrigatorio'),
        tipo: 'isolador',
        item: `${item} no treino ${dias[di]!.nome}`,
        musculos: [f.musculo],
        montar: (it) => `Falta o isolador que cobre o que os multiarticulares não cobrem. Acrescente: ${emLista(it)}.`,
      });
    else
      achar({
        gravidade: 'limite',
        regraId: r('selecao.isolador-obrigatorio'),
        tipo: 'isolador-tempo',
        item,
        musculos: [f.musculo],
        montar: (it) => `Fica de fora, por falta de tempo, o isolador que cobre o que os multiarticulares não cobrem: ${emLista(it)}; ${semTempo}. Não precisa fazer nada; com mais minutos, ele entra.`,
      });
  }

  // ---------- equilíbrios ----------
  const ladoDe = (id: string, lado: string[]) => funcoesDoExercicio(id).some((f) => lado.includes(f.id));
  const empurrar = todos.filter((x) => ladoDe(x.e.id, EMPURRAR)).reduce((t, x) => t + seriesDeVolume(x.p), 0);
  const puxar = todos.filter((x) => ladoDe(x.e.id, PUXAR)).reduce((t, x) => t + seriesDeVolume(x.p), 0);
  const puxarPossivel = ctx.possiveis.some((e) => PUXAR.some((f) => naTabela(FUNCAO[f]!, e.id)));
  if (puxarPossivel && empurrar > 0 && (puxar === 0 || empurrar / puxar > LIMIAR_EMPURRAR_PUXAR))
    achar({
      gravidade: 'ajustar',
      regraId: r('avaliador.equilibrio.empurrar-puxar'),
      tipo: 'empurrar-puxar',
      item: `${fmt(empurrar)} × ${fmt(puxar)}`,
      musculos: [],
      montar: () =>
        `Empurrar ${fmt(empurrar)} × puxar ${fmt(puxar)} séries por semana${puxar ? ` (${fmt(empurrar / puxar)} para 1)` : ''}. Acima de ${fmt(LIMIAR_EMPURRAR_PUXAR)} para 1, troque um exercício de empurrar por uma remada ou puxada, ou some séries de puxar.`,
    });
  const q = volume.quadriceps ?? 0;
  const post = volume.posteriores ?? 0;
  const diretoPost = todos.some((x) => ladoDe(x.e.id, POSTERIORES_DIRETO) && x.e.musculos.primarios.includes('posteriores'));
  if (possiveisDe('quadriceps').length && possiveisDe('posteriores').length && (q > 0 || post > 0)) {
    const fora = !diretoPost || post === 0 || q / post < FAIXA_COXA[0] || q / post > FAIXA_COXA[1];
    if (fora)
      achar({
        gravidade: 'ajustar',
        regraId: r('avaliador.equilibrio.coxa'),
        tipo: 'coxa',
        item: `${fmt(q)} × ${fmt(post)}`,
        musculos: ['quadriceps', 'posteriores'],
        montar: () =>
          !diretoPost
            ? `Frente × trás da coxa: quadríceps ${fmt(q)} × posteriores ${fmt(post)} séries por semana, sem nenhum exercício direto de posteriores. Acrescente uma flexão de joelho ou um stiff.`
            : `Frente × trás da coxa: quadríceps ${fmt(q)} × posteriores ${fmt(post)} séries por semana, fora da faixa de ${fmt(FAIXA_COXA[0])} a ${fmt(FAIXA_COXA[1])} para 1. ${
                q > post ? 'Some séries de posteriores (flexão de joelho ou stiff) ou tire séries de quadríceps.' : 'Some séries de quadríceps (agachamento, afundo ou extensora) ou tire séries de posteriores.'
              }`,
      });
  }

  // ---------- tempo e ordem ----------
  // O dia que passa dos minutos: dá para encurtar (ajustar) se tirar 1 série, ou um isolador, não deixa nenhum músculo
  // abaixo do seu limiar (a meta do foco; o piso de 4 nos demais). Senão é limite: os pisos não cabem nos minutos.
  const limiarDe = (m: Musculo) => linhas.find((l) => l.musculo === m)?.limiar ?? 0;
  /**
   * Cortes que fazem o dia caber, sem deixar músculo abaixo do limiar e sem tirar um isolador obrigatório
   * (selecao.isolador-obrigatorio): primeiro 1 série de cada vez, depois um isolador. Nada que caiba: null.
   */
  const vDepoisDosCortes = { ...volume };
  const cortesQueCabem = (di: number): string[] | null => {
    let exs = dias[di]!.exercicios.map((x) => ({ ...x, p: { ...x.p } }));
    const v = { ...vDepoisDosCortes };
    const acima = (e: Exercicio, menos: number) =>
      e.musculos.primarios.every((m) => !limiarDe(m) || (v[m] ?? 0) - menos >= limiarDe(m)) &&
      e.musculos.secundarios.every((m) => !limiarDe(m) || (v[m] ?? 0) - menos * VOLUME.pesoIndireta >= limiarDe(m));
    const tirar = (e: Exercicio, n: number) => {
      for (const m of e.musculos.primarios) v[m] = (v[m] ?? 0) - n;
      for (const m of e.musculos.secundarios) v[m] = (v[m] ?? 0) - n * VOLUME.pesoIndireta;
    };
    const passos = new Map<string, number>();
    while (minutos(exs.map((x) => x.p), colchao) > orcamento) {
      const serie = exs.find((x) => x.p.series > VOLUME.seriesPorExercicio.min && !x.p.dropSet && acima(x.e, 1));
      if (serie) {
        serie.p.series--;
        tirar(serie.e, 1);
        passos.set(serie.e.nome.toLowerCase(), (passos.get(serie.e.nome.toLowerCase()) ?? 0) + 1);
        continue;
      }
      const isolador = [...exs].reverse().find((x) => x.e.tipo === 'isolador' && !x.funcao.obrigatoria && acima(x.e, seriesDeVolume(x.p)));
      if (!isolador) return null;
      tirar(isolador.e, seriesDeVolume(isolador.p));
      exs = exs.filter((x) => x !== isolador);
      passos.set(isolador.e.nome.toLowerCase(), -1);
    }
    Object.assign(vDepoisDosCortes, v); // os cortes de um dia valem para os dias seguintes
    return [...passos].map(([nome, n]) => (n < 0 ? `tire ${nome}` : `tire ${n} ${plural(n, 'série', 'séries')} de ${nome}`));
  };
  const longos = dias.flatMap((_, di) => (minutosDoDia[di]! > orcamento ? [{ di, cortes: cortesQueCabem(di) }] : []));
  for (const { chave, dis } of juntarPorDia(longos.filter((x) => x.cortes).map((x) => ({ chave: `~${minutosDoDia[x.di]} min (para caber: ${emLista(x.cortes!)})`, di: x.di }))))
    achar({
      gravidade: 'ajustar',
      regraId: r('tempo.corte'),
      tipo: 'tempo',
      item: `${nosDias(dis)} ${chave}`,
      musculos: [],
      montar: (it) => `Mais longo que os ${orcamento} min que você tem: ${emLista(it)}. Assim o dia cabe sem deixar nenhum músculo abaixo da meta; ou escolha uma duração maior na rotina.`,
    });
  for (const { chave, dis } of juntarPorDia(longos.filter((x) => !x.cortes).map((x) => ({ chave: `~${minutosDoDia[x.di]} min`, di: x.di }))))
    achar({
      gravidade: 'limite',
      regraId: r('tempo.corte'),
      tipo: 'tempo-limite',
      item: `${nosDias(dis)} ${chave}`,
      musculos: [],
      montar: (it) =>
        `Mais longo que os ${orcamento} min: ${emLista(it)}. Tirar mais deixaria algum músculo abaixo do mínimo. Não precisa fazer nada: dá para treinar assim, ou escolher uma duração maior na rotina.`,
    });
  dias.forEach((d) => {
    const semCore = d.exercicios.filter((x) => x.e.padrao !== 'core');
    const ultimoComposto = semCore.map((x) => x.e.tipo).lastIndexOf('composto');
    if (semCore.slice(0, Math.max(0, ultimoComposto)).some((x) => x.e.tipo === 'isolador'))
      achar({
        gravidade: 'info',
        regraId: r('ordem.sessao'),
        tipo: 'ordem',
        item: d.nome,
        musculos: [],
        montar: (it) => `Isolador antes de multiarticular: ${emLista(it)}. A hipertrofia é a mesma; se quiser mais força no multiarticular, faça-o primeiro.`,
      });
  });

  const achados = agrupar(brutos);
  const tem = (g: Gravidade) => achados.some((a) => a.gravidade === g);
  return {
    veredito: tem('seguranca') ? 'bloqueado' : tem('alerta') || tem('ajustar') ? 'ajustar' : tem('limite') ? 'limite' : 'bom',
    achados,
    musculos: linhas,
    dias: dias.map((d, i) => ({ nome: d.nome, minutos: minutosDoDia[i]!, exercicios: d.exercicios.length })),
    minutosSessao: orcamento,
    equilibrio: { empurrar, puxar, quadriceps: q, posteriores: post },
  };
}

/**
 * Quantos grupos diferentes as ocorrências cobrem, cada ocorrência num grupo só: emparelhamento máximo (caminhos de
 * aumento, pelo lado dos grupos, que são no máximo 3).
 */
function emparelhar(ocorrencias: string[][]): Set<string> {
  const grupos = [...new Set(ocorrencias.flat())].sort();
  const dono = new Map<number, string>();
  const tentar = (g: string, vistos: Set<number>): boolean => {
    for (let i = 0; i < ocorrencias.length; i++) {
      if (!ocorrencias[i]!.includes(g) || vistos.has(i)) continue;
      vistos.add(i);
      const atual = dono.get(i);
      if (atual === undefined || tentar(atual, vistos)) {
        dono.set(i, g);
        return true;
      }
    }
    return false;
  };
  for (const g of grupos) tentar(g, new Set());
  return new Set(dono.values());
}

function agrupar(brutos: Bruto[]): Achado[] {
  const porTipo = new Map<string, Bruto[]>();
  for (const b of brutos) porTipo.set(`${b.tipo}|${b.regraId}`, [...(porTipo.get(`${b.tipo}|${b.regraId}`) ?? []), b]);
  const out = [...porTipo.values()].map((bs): Achado => {
    const b = bs[0]!;
    const itens = [...new Set(bs.map((x) => x.item))];
    return { gravidade: b.gravidade, regraId: b.regraId, selo: REGRAS[b.regraId]!.selo, tipo: b.tipo, texto: b.montar(itens), itens, musculos: [...new Set(bs.flatMap((x) => x.musculos))] };
  });
  return out.sort((a, b) => GRAVIDADES.indexOf(a.gravidade) - GRAVIDADES.indexOf(b.gravidade));
}

/**
 * Os achados de "ajustar" que o gerador ainda não avisa por conta própria, como avisos do programa gerado
 * (acompanhamento.mensagens: fato + próximo passo). No programa gerado, a pessoa não troca exercícios um a um
 * (o editor vem depois): o próximo passo é a rotina. Na grade reduzida, 15 min a mais por treino resolvem 87% deles
 * (docs/revisoes/r5b/medidas.md).
 */
export const TIPOS_AVISADOS_PELO_AVALIADOR = ['funcoes', 'coxa', 'empurrar-puxar', 'isolador'] as const;
export function avisosDoAvaliador(a: Avaliacao, perfil: Pick<Perfil, 'diasSemana' | 'minutosSessao'>): { regraId: string; texto: string }[] {
  const rotina = `Com ${perfil.diasSemana} ${plural(perfil.diasSemana, 'treino', 'treinos')} de ${perfil.minutosSessao} min, o app não encaixou mais. Não precisa fazer nada; se quiser corrigir, mais minutos por treino costumam resolver (Mudar a rotina).`;
  return a.achados
    .filter((x) => x.gravidade === 'ajustar' && (TIPOS_AVISADOS_PELO_AVALIADOR as readonly string[]).includes(x.tipo.split(':')[0]!))
    .map((x) => {
      const tipo = x.tipo.split(':')[0]!;
      const fato =
        tipo === 'funcoes'
          ? `Uma função só na semana: ${emLista(x.itens)}.`
          : tipo === 'isolador'
            ? `Fica de fora o isolador que cobre o que os multiarticulares não cobrem: ${emLista(x.itens.map((i) => i.replace(/ no treino .*$/, '')))}.`
            : tipo === 'coxa'
              ? `Frente × trás da coxa fora do equilíbrio: quadríceps × posteriores ${x.itens[0]} séries por semana.`
              : `Mais empurrar que puxar: ${x.itens[0]} séries por semana.`;
      return { regraId: x.regraId, texto: `${fato} ${rotina}` };
    });
}

/**
 * O programa gerado já avisa este achado? A mesma regra; nas metas, um aviso que cita cada músculo. É a régua do R5b:
 * nenhum "ajustar" que o gerador não avise (testes e auditoria).
 */
export function avisadoPeloGerador(a: Achado, programa: { avisos: { regraId: string; texto: string }[] }): boolean {
  if (a.tipo.startsWith('meta-')) return a.musculos.every((m) => programa.avisos.some((x) => musculosDoAviso(x).includes(m)));
  return programa.avisos.some((x) => x.regraId === a.regraId);
}

const NOME_GRAVIDADE: Record<Gravidade, string> = { seguranca: 'SEGURANÇA', alerta: 'ALERTA', ajustar: 'AJUSTAR', limite: 'LIMITE', info: 'info' };
const NOME_VEREDITO: Record<Veredito, string> = {
  bloqueado: 'bloqueado (segurança)',
  ajustar: 'dá para ajustar',
  limite: 'está bom dentro do que o seu equipamento, a dor ou o tempo permitem',
  bom: 'está bom: nada a ajustar',
};

/** A avaliação em texto simples (testes, auditoria, devlog). A tela é pedido ao design. */
export function textoDaAvaliacao(a: Avaliacao): string {
  const tabela = a.musculos
    .map((l) => `${nomeM(l.musculo)} ${fmt(l.series)}${l.prioritario ? `/${fmt(l.meta)} (foco)` : ''}`)
    .join(' · ');
  const linhas = [
    `Veredito: ${NOME_VEREDITO[a.veredito]}`,
    tabela,
    `Empurrar ${fmt(a.equilibrio.empurrar)} × puxar ${fmt(a.equilibrio.puxar)}; quadríceps ${fmt(a.equilibrio.quadriceps)} × posteriores ${fmt(a.equilibrio.posteriores)}.`,
    `Tempo: ${a.dias.map((d) => `${d.nome} ~${d.minutos} min`).join('; ')} (orçamento ${a.minutosSessao}).`,
    ...a.achados.map((x) => `${NOME_GRAVIDADE[x.gravidade]} [${x.regraId} · ${x.selo}] ${x.texto}`),
  ];
  return linhas.join('\n');
}

// Os 20 cuidados da sessão "treino para todos" (12/11/2026; docs/revisoes/treino-para-todos/diagnostico.md), medidos
// num programa. É a régua da G5 (regua.ts) ampliada: cada cuidado que dá para medir vira uma ou mais medidas, cada uma
// com o limite e a fonte do limite (LIMITES, abaixo). Funções puras: recebem o programa, o perfil, o inventário e o
// contexto de seleção do mesmo perfil. Os limites desta régua são FIXOS: não leem as constantes do gerador que um
// protótipo pode mudar, para o antes e o depois serem medidos com a mesma régua. Só dados fictícios.
import { POR_ID, MUSCULOS_INFERIORES, type Exercicio, type Musculo, type Padrao } from '../../src/domain/biblioteca';
import { GRUPOS, MUSCULOS_COM_META, musculosDoAviso, seriesDeVolume, volumePorMusculo, type ContextoDeSelecao, type ExercicioPrescrito, type Perfil, type Programa } from '../../src/domain/gerador';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { degrauInicial, escadaDe } from '../../src/domain/progressao/escadas';
import type { Nivel } from '../../src/domain/regras';
import { cargasHalter, cargasKettlebell, type Inventario } from '../../src/domain/taxonomia/equipamentos';
import { faixaA1, medirRegua, type Medida } from './regua';

/** Limites da régua dos cuidados, cada um com o selo e a fonte (docs/pesquisa-v2/18 a 22 e docs/pesquisa/regras.md). */
export const LIMITES = {
  /** c03: o dia típico usa pelo menos isto dos minutos pedidos (tempo.sobra; consenso). */
  usoMinimo: 0.7,
  usoBom: 0.85,
  /** c04: a faixa de séries semanais por músculo de cada nível (volume.semanal.minimo e .maximo; consenso sobre curva robusta). */
  faixaDoNivel: { iniciante: [6, 10], intermediario: [10, 16], avancado: [12, 20] } as Record<Nivel, [number, number]>,
  /** c04: abaixo disto, as séries do músculo são "soltas" (volume.semanal.minimo-eficaz, piso de 4; moderada). */
  pisoUtil: 4,
  /** c05: empurrar ÷ puxar (consenso com apoio de caso-controle, kolber2017) e quadríceps ÷ posteriores (consenso). */
  empurrarPuxar: 1.5,
  /** c05: ombro da frente ÷ ombro de trás, em séries fracionadas (consenso; sem ensaio). */
  ombroFrenteTras: 2,
  /** c06: o foco aparece quando passa da mediana dos outros por esta razão (consenso; pesquisa-v2/15). */
  destaqueDoFoco: 1.3,
  /** c07: séries fracionadas por músculo numa sessão (volume.sessao.teto; um estudo) e séries a partir das quais 1 dia só é pouco. */
  tetoDaSessao: 10,
  seriesParaDuasVezes: 8,
  /** c07: séries diretas do mesmo músculo em dois dias seguidos (consenso: ~48 h entre sessões pesadas do mesmo músculo). */
  seriesEmDiasSeguidos: 3,
  /** c16: exercícios diferentes por semana a partir dos quais o iniciante tem demais para aprender (consenso; ACSM: 8 a 10). */
  distintosDoIniciante: 12,
  /** c02: séries por minuto pedido acima das quais o dia não cabe (modelo de tempo do app; consenso). */
  seriesPorMinutoMax: 0.45,
};

/** Os cuidados e as medidas de cada um. "defeito": o programa não deveria sair assim; "nota": gosto e consenso. */
export const MEDIDAS = {
  c01a: { cuidado: 1, tipo: 'defeito', nome: 'dia que começa por um isolador havendo multiarticular' },
  c01b: { cuidado: 1, tipo: 'defeito', nome: 'multiarticular depois de isolador' },
  c01c: { cuidado: 1, tipo: 'nota', nome: 'o multiarticular mais técnico (complexidade 3) não é o 1º da sua região' },
  c01d: { cuidado: 1, tipo: 'defeito', nome: 'abdominal antes de outro exercício' },
  c02a: { cuidado: 2, tipo: 'nota', nome: 'exercícios por dia fora da faixa dos minutos (A1)' },
  c02b: { cuidado: 2, tipo: 'nota', nome: 'séries demais para os minutos (acima de 0,45 por minuto)' },
  c02c: { cuidado: 2, tipo: 'nota', nome: 'dia de 5 exercícios ou mais com 2 séries em todos' },
  c03a: { cuidado: 3, tipo: 'defeito', nome: 'dia mais longo acima de 110% dos minutos (A3)' },
  c03b: { cuidado: 3, tipo: 'defeito', nome: 'dia típico abaixo de 70% dos minutos, sem o aviso (A4)' },
  c03c: { cuidado: 3, tipo: 'nota', nome: 'dia típico abaixo de 70% dos minutos (com ou sem aviso)' },
  c03d: { cuidado: 3, tipo: 'nota', nome: 'dia típico abaixo de 85% dos minutos' },
  c04a: { cuidado: 4, tipo: 'defeito', nome: 'músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível' },
  c04b: { cuidado: 4, tipo: 'defeito', nome: 'músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível' },
  c04f: { cuidado: 4, tipo: 'nota', nome: 'músculo sem exercício direto (só séries indiretas) havendo exercício possível' },
  c04c: { cuidado: 4, tipo: 'defeito', nome: 'músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%)' },
  c04d: { cuidado: 4, tipo: 'nota', nome: 'algum músculo abaixo da faixa do nível (havendo exercício)' },
  c04e: { cuidado: 4, tipo: 'nota', nome: 'algum músculo acima da faixa do nível' },
  c05a: { cuidado: 5, tipo: 'defeito', nome: 'empurrar ÷ puxar acima de 1,5 havendo como puxar (D1)' },
  c05b: { cuidado: 5, tipo: 'defeito', nome: 'quadríceps ÷ posteriores fora de 0,5 a 2 (D3)' },
  c05c: { cuidado: 5, tipo: 'nota', nome: 'ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás' },
  c06a: { cuidado: 6, tipo: 'defeito', nome: 'foco abaixo da meta com tempo e exercício (C1)' },
  c06b: { cuidado: 6, tipo: 'nota', nome: 'o foco não passa da mediana dos outros (C2)' },
  c06c: { cuidado: 6, tipo: 'nota', nome: 'o foco fica a menos de 1,3 vez a mediana dos outros' },
  c06d: { cuidado: 6, tipo: 'defeito', nome: 'com foco, outro músculo com menos de 4 séries havendo exercício' },
  c07a: { cuidado: 7, tipo: 'nota', nome: 'músculo com 8 séries diretas ou mais treinado num dia só' },
  c07b: { cuidado: 7, tipo: 'defeito', nome: 'mais de 10 séries de um músculo num dia' },
  c07c: { cuidado: 7, tipo: 'nota', nome: 'o mesmo músculo com 3 séries diretas ou mais em dias seguidos' },
  c08a: { cuidado: 8, tipo: 'nota', nome: 'exercício escolhido por ter animação, com um equivalente sem uso no programa' },
  c08b: { cuidado: 8, tipo: 'nota', nome: 'exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa' },
  c09a: { cuidado: 9, tipo: 'defeito', nome: 'o mesmo exercício em todos os dias havendo outro do mesmo nível (B1)' },
  c09b: { cuidado: 9, tipo: 'nota', nome: 'o mesmo exercício em todos os dias sem opção do mesmo nível (B2)' },
  c10a: { cuidado: 10, tipo: 'nota', nome: 'dois exercícios da mesma função no mesmo dia' },
  c10b: { cuidado: 10, tipo: 'nota', nome: 'três exercícios ou mais do mesmo músculo no mesmo dia' },
  c11a: { cuidado: 11, tipo: 'nota', nome: 'peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado' },
  c12a: { cuidado: 12, tipo: 'defeito', nome: 'exercício sem próximo passo de carga (uma carga só, ou já no último degrau)' },
  c13a: { cuidado: 13, tipo: 'nota', nome: 'dois exercícios seguidos que carregam a lombar sem apoio' },
  c13b: { cuidado: 13, tipo: 'nota', nome: 'três exercícios ou mais no dia que carregam a lombar sem apoio' },
  c13c: { cuidado: 13, tipo: 'nota', nome: 'três exercícios seguidos que dependem da pegada' },
  c14a: { cuidado: 14, tipo: 'defeito', nome: 'exercício impossível, acima da complexidade ou numa região com dor acima de 5' },
  c14b: { cuidado: 14, tipo: 'defeito', nome: 'dia com menos de 3 exercícios ou sem multiarticular (A2)' },
  c14c: { cuidado: 14, tipo: 'nota', nome: 'o programa perdeu um dia inteiro' },
  c15a: { cuidado: 15, tipo: 'nota', nome: 'iniciante com bi-set ou drop set' },
  c15b: { cuidado: 15, tipo: 'nota', nome: 'bi-set entre dois multiarticulares' },
  c15c: { cuidado: 15, tipo: 'nota', nome: 'bi-set em que os dois carregam a lombar ou dependem da pegada' },
  c15d: { cuidado: 15, tipo: 'nota', nome: 'bi-set com os dois exercícios separados na lista do dia' },
  c16a: { cuidado: 16, tipo: 'nota', nome: 'iniciante com mais de 12 exercícios diferentes na semana' },
  c16b: { cuidado: 16, tipo: 'nota', nome: 'intermediário ou avançado com a média dos músculos abaixo da faixa do nível' },
  c17a: { cuidado: 17, tipo: 'defeito', nome: 'músculo com menos de 4 séries (ou a zero) sem aviso que o cite' },
  c20a: { cuidado: 20, tipo: 'defeito', nome: 'o texto "cabem cerca de N exercícios" com um dia acima de N' },
  c20b: { cuidado: 20, tipo: 'defeito', nome: 'o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4' },
} as const satisfies Record<string, { cuidado: number; tipo: 'defeito' | 'nota'; nome: string }>;
export type MedidaId = keyof typeof MEDIDAS;
export const MEDIDA_IDS = Object.keys(MEDIDAS) as MedidaId[];

export type Cuidados = {
  /** A régua da G5 no mesmo programa (os defeitos e as notas oficiais), para o retrato somar os dois. */
  regua: Medida;
  falhas: Set<MedidaId>;
  detalhe: Partial<Record<MedidaId, string>>;
  /** Números do programa, para as médias: uso do tempo, séries, exercícios. */
  n: { uso: number; series: number; exercicios: number; distintos: number; mediaPorMusculo: number; abaixoDaFaixa: number; porAnimacao: number; porAlfabeto: number; prescricoes: number; semProximoPasso: number };
};

const mediana = (xs: number[]) => {
  const o = [...xs].sort((a, b) => a - b);
  const n = o.length;
  return !n ? 0 : n % 2 ? o[(n - 1) / 2]! : (o[n / 2 - 1]! + o[n / 2]!) / 2;
};
const fmt = (x: number) => String(Math.round(x * 10) / 10).replace('.', ',');
const PEGADA: Padrao[] = ['puxar-h', 'puxar-v'];
const dependeDaPegada = (e: Exercicio) => PEGADA.includes(e.padrao) || (e.padrao === 'dobrar-quadril' && ['barra', 'halter', 'kettlebell'].includes(e.carga));
const carregaLombar = (e: Exercicio) => e.padrao !== 'core' && e.articulacoes.includes('lombar') && !e.tags.includes('apoiado');
const regiao = (e: Exercicio) => (e.musculos.primarios.some((m) => MUSCULOS_INFERIORES.includes(m)) ? 'inferior' : 'superior');
/** Os pares de dias seguidos na semana, pela ordem do programa (4 dias: seg, ter, qui, sex; 5: seg a qua, sex, sáb; 6: seg a sáb). */
const DIAS_SEGUIDOS: Record<number, [number, number][]> = { 2: [], 3: [], 4: [[0, 1], [2, 3]], 5: [[0, 1], [1, 2], [3, 4]], 6: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]] };

/** Mede os cuidados num programa. `ctx` é o contexto de seleção do mesmo perfil e inventário. */
export function medirCuidados(p: Programa, pf: Perfil, inventario: Inventario, ctx: ContextoDeSelecao): Cuidados {
  const falhas = new Set<MedidaId>();
  const detalhe: Cuidados['detalhe'] = {};
  const marca = (k: MedidaId, texto: string) => {
    falhas.add(k);
    detalhe[k] ??= texto;
  };
  const regua = medirRegua(p, pf, ctx);
  const nivel = pf.nivel;
  const min = pf.minutosSessao;
  const prio = new Set<Musculo>(pf.prioridades.flatMap((g) => GRUPOS[g]));
  const v = p.volumeSemanal;
  const todos = p.dias.flatMap((d) => d.exercicios);
  const bib = (x: ExercicioPrescrito) => POR_ID[x.exId]!;
  const possivelPara = (m: Musculo) => ctx.possiveis.some((e) => e.musculos.primarios.includes(m));
  const tempos = p.dias.map((d) => d.minutosEstimados);
  const diaTipico = mediana(tempos);
  const uso = min ? diaTipico / min : 0;

  // c01: a ordem do dia
  for (const d of p.dias) {
    const exs = d.exercicios;
    const semCore = exs.filter((x) => x.padrao !== 'core');
    if (semCore.length && semCore[0]!.tipo !== 'composto' && semCore.some((x) => x.tipo === 'composto')) marca('c01a', `${d.nome} começa por ${semCore[0]!.exId}`);
    const iIso = semCore.findIndex((x) => x.tipo === 'isolador');
    if (iIso >= 0 && semCore.slice(iIso).some((x) => x.tipo === 'composto')) marca('c01b', `${d.nome}: multiarticular depois de ${semCore[iIso]!.exId}`);
    const compostos = semCore.filter((x) => x.tipo === 'composto');
    for (const r of ['inferior', 'superior'] as const) {
      const daRegiao = compostos.filter((x) => regiao(bib(x)) === r);
      const iTecnico = daRegiao.findIndex((x) => bib(x).complexidade === 3);
      if (iTecnico > 0 && daRegiao.slice(0, iTecnico).every((x) => bib(x).complexidade < 3)) marca('c01c', `${d.nome}: ${daRegiao[iTecnico]!.exId} depois de ${daRegiao[0]!.exId}`);
    }
    const iCore = exs.findIndex((x) => x.padrao === 'core');
    if (iCore >= 0 && exs.slice(iCore).some((x) => x.padrao !== 'core')) marca('c01d', `${d.nome}: abdominal antes do fim`);
  }

  // c02: quantidade × minutos
  const [lo, hi] = faixaA1(min);
  for (const d of p.dias) {
    const n = d.exercicios.length;
    const s = d.exercicios.reduce((t, x) => t + x.series, 0);
    if (n < lo || n > hi) marca('c02a', `${d.nome} com ${n} exercícios em ${min} min (faixa ${lo} a ${hi})`);
    if (s > LIMITES.seriesPorMinutoMax * min) marca('c02b', `${d.nome} com ${s} séries em ${min} min`);
    if (n >= 5 && d.exercicios.every((x) => x.series === 2)) marca('c02c', `${d.nome}: ${n} exercícios, todos com 2 séries`);
  }

  // c03: o uso do tempo
  if (regua.defeitos.has('A3')) marca('c03a', regua.detalhe.A3!);
  if (regua.defeitos.has('A4')) marca('c03b', regua.detalhe.A4!);
  if (uso < LIMITES.usoMinimo) marca('c03c', `dia típico de ${diaTipico} min em ${min}`);
  if (uso < LIMITES.usoBom) marca('c03d', `dia típico de ${diaTipico} min em ${min}`);

  // c04: o volume de cada músculo
  const [faixaMin, faixaMax] = LIMITES.faixaDoNivel[nivel];
  const comExercicio = MUSCULOS_COM_META.filter(possivelPara);
  let abaixoDaFaixa = 0;
  for (const m of comExercicio) {
    const s = v[m] ?? 0;
    const direto = todos.some((x) => bib(x).musculos.primarios.includes(m));
    if (s <= 0) marca('c04a', `${m} sem nenhuma série`);
    else if (s < LIMITES.pisoUtil) marca('c04b', `${m} com ${fmt(s)} séries`);
    if (!direto) marca('c04f', `${m} sem exercício direto (${fmt(s)} séries indiretas)`);
    // O abdômen não tem dose-resposta própria (volume.semanal.abdomen, consenso): fica fora da faixa do nível.
    if (m === 'abdomen') continue;
    if (s < faixaMin) {
      abaixoDaFaixa++;
      marca('c04d', `${m} com ${fmt(s)} (faixa do ${nivel}: ${faixaMin} a ${faixaMax})`);
      if (uso < LIMITES.usoBom) marca('c04c', `${m} com ${fmt(s)} de ${faixaMin} e o dia típico em ${diaTipico} de ${min} min`);
    }
    if (s > faixaMax) marca('c04e', `${m} com ${fmt(s)} (faixa do ${nivel}: ${faixaMin} a ${faixaMax})`);
  }
  const semAbdomen = comExercicio.filter((m) => m !== 'abdomen');
  const mediaPorMusculo = semAbdomen.length ? semAbdomen.reduce((t, m) => t + (v[m] ?? 0), 0) / semAbdomen.length : 0;

  // c05: o equilíbrio
  if (regua.defeitos.has('D1')) marca('c05a', regua.detalhe.D1!);
  if (regua.defeitos.has('D3')) marca('c05b', regua.detalhe.D3!);
  const frente = v.ombro_anterior ?? 0;
  const tras = v.ombro_posterior ?? 0;
  if (possivelPara('ombro_posterior') && frente > LIMITES.ombroFrenteTras * Math.max(tras, 0.5)) marca('c05c', `ombro da frente ${fmt(frente)} ÷ de trás ${fmt(tras)}`);

  // c06: o foco
  if (regua.defeitos.has('C1')) marca('c06a', regua.detalhe.C1!);
  if (regua.notas.has('C2')) marca('c06b', regua.detalhe.C2!);
  if (prio.size) {
    const outros = MUSCULOS_COM_META.filter((m) => !prio.has(m) && possivelPara(m));
    const med = mediana(outros.map((m) => v[m] ?? 0));
    for (const m of prio) if (possivelPara(m) && outros.length && (v[m] ?? 0) < LIMITES.destaqueDoFoco * med) marca('c06c', `${m} com ${fmt(v[m] ?? 0)}, mediana dos outros ${fmt(med)}`);
    for (const m of outros) if ((v[m] ?? 0) < LIMITES.pisoUtil) marca('c06d', `${m} com ${fmt(v[m] ?? 0)} séries, com foco em ${pf.prioridades.join(', ')}`);
  }

  // c07: a distribuição na semana
  const porDia = p.dias.map((d) => volumePorMusculo(d.exercicios.map((x) => ({ ex: bib(x), series: seriesDeVolume(x) }))));
  const diretasPorDia = p.dias.map((d) => {
    const o: Partial<Record<Musculo, number>> = {};
    for (const x of d.exercicios) for (const m of bib(x).musculos.primarios) o[m] = (o[m] ?? 0) + seriesDeVolume(x);
    return o;
  });
  for (const m of MUSCULOS_COM_META) {
    const diasCom = diretasPorDia.filter((o) => (o[m] ?? 0) > 0).length;
    const diretas = diretasPorDia.reduce((t, o) => t + (o[m] ?? 0), 0);
    if (diretas >= LIMITES.seriesParaDuasVezes && diasCom === 1 && p.dias.length > 1) marca('c07a', `${m} com ${fmt(diretas)} séries diretas num dia só`);
    porDia.forEach((o, di) => {
      if ((o[m] ?? 0) > LIMITES.tetoDaSessao + 1e-9) marca('c07b', `${p.dias[di]!.nome}: ${m} com ${fmt(o[m]!)} séries`);
    });
    for (const [a, b] of DIAS_SEGUIDOS[p.dias.length] ?? [])
      if ((diretasPorDia[a]?.[m] ?? 0) >= LIMITES.seriesEmDiasSeguidos && (diretasPorDia[b]?.[m] ?? 0) >= LIMITES.seriesEmDiasSeguidos && m !== 'abdomen' && m !== 'panturrilha')
        marca('c07c', `${m} em ${p.dias[a]!.nome} e ${p.dias[b]!.nome}`);
  }

  // c08: a razão da escolha. Entre os exercícios possíveis do mesmo nível da função, empatados nos critérios de treino
  // (dor leve, estabilidade do iniciante, carga possível; ou os do motor, se ele os der), havendo um que o programa não
  // usa em lugar nenhum, o que decidiu foi a animação (se só o escolhido tem) ou a ordem alfabética.
  const halterMax = Math.max(0, ...cargasHalter(inventario));
  const kettlebellMax = Math.max(0, ...cargasKettlebell(inventario));
  const cargaPossivel = (e: Exercicio) =>
    e.carga === 'peso-corpo' || e.carga === 'elastico' || e.carga === 'assistida' ? 0 : (e.carga === 'halter' && halterMax < 20) || (e.carga === 'kettlebell' && kettlebellMax < 20) || e.carga === 'caneleira' ? 1 : 2;
  const estavel = (e: Exercicio) => e.tags.some((t) => t === 'estavel' || t === 'apoiado' || t === 'maquina');
  const motor = ctx as ContextoDeSelecao & { criteriosDeTreino?: (e: Exercicio, funcao: string) => number[]; temOrdemDeReferencia?: boolean };
  const doMotor = motor.criteriosDeTreino;
  const vetor = (e: Exercicio, funcao: string) =>
    (doMotor ? doMotor(e, funcao) : [e.articulacoes.some((a) => ctx.dorLeve.has(a)) ? 1 : 0, nivel === 'iniciante' && !estavel(e) ? 1 : 0, -cargaPossivel(e)]).join(',');
  const noPrograma = new Set(todos.map((x) => x.exId));
  let porAnimacao = 0;
  let porAlfabeto = 0;
  for (const d of p.dias)
    for (const x of d.exercicios) {
      const f = x.funcao ? FUNCAO[x.funcao] : undefined;
      if (!f) continue;
      const e = bib(x);
      const n = f.niveis.findIndex((ids) => ids.includes(ctx.noLugarDe(x.exId)));
      if (n < 0) continue;
      const empatados = f.niveis[n]!.filter((id) => id !== x.exId && ctx.naFuncao(f, id) && !noPrograma.has(id) && !ctx.barraDoIniciante(id)).map((id) => POR_ID[id]!).filter((o) => vetor(o, f.id) === vetor(e, f.id));
      if (!empatados.length) continue;
      if (empatados.some((o) => !!o.animacaoId === !!e.animacaoId)) {
        // Com a ordem de referência da lista da função (protótipo), o empate total não é decidido pelo alfabeto.
        if (motor.temOrdemDeReferencia) continue;
        porAlfabeto++;
        marca('c08b', `${d.nome}: ${x.exId}, e não ${empatados.find((o) => !!o.animacaoId === !!e.animacaoId)!.id}`);
      } else if (e.animacaoId) {
        porAnimacao++;
        marca('c08a', `${d.nome}: ${x.exId}, e não ${empatados[0]!.id}`);
      }
    }

  // c09: a variedade
  if (regua.defeitos.has('B1')) marca('c09a', regua.detalhe.B1!);
  if (regua.notas.has('B2')) marca('c09b', regua.detalhe.B2!);

  // c10: a redundância no dia
  for (const d of p.dias) {
    const funcoes = d.exercicios.map((x) => x.funcao).filter((f): f is string => !!f);
    const repetida = funcoes.find((f, i) => funcoes.indexOf(f) !== i);
    if (repetida) marca('c10a', `${d.nome}: duas vezes ${FUNCAO[repetida]?.nome.toLowerCase() ?? repetida}`);
    const porMusculo = new Map<Musculo, number>();
    for (const x of d.exercicios) for (const m of bib(x).musculos.primarios) porMusculo.set(m, (porMusculo.get(m) ?? 0) + 1);
    for (const [m, k] of porMusculo) if (k >= 3) marca('c10b', `${d.nome}: ${k} exercícios de ${m}`);
  }

  // c11: a prescrição combina com o equipamento
  if (nivel !== 'iniciante')
    for (const x of todos) {
      const e = bib(x);
      if (e.carga === 'peso-corpo' && e.tipo === 'composto' && x.reps[1] <= 15 && escadaDe(e.id, inventario).length - 1 - degrauInicial(e.id, nivel, inventario) <= 0) marca('c11a', `${x.exId} ${x.reps[0]} a ${x.reps[1]}`);
    }

  // c12: dá para progredir
  let semProximoPasso = 0;
  const halteres = cargasHalter(inventario).length;
  const kettlebells = cargasKettlebell(inventario).length;
  for (const x of todos) {
    const e = bib(x);
    const umaCargaSo = (e.carga === 'halter' && halteres === 1) || (e.carga === 'kettlebell' && kettlebells === 1);
    const ultimoDegrau = (e.carga === 'peso-corpo' || e.carga === 'elastico') && degrauInicial(e.id, nivel, inventario) >= escadaDe(e.id, inventario).length - 1;
    if (umaCargaSo || ultimoDegrau) {
      semProximoPasso++;
      marca('c12a', `${x.exId}: ${umaCargaSo ? 'uma carga só' : 'começa no último degrau'}`);
    }
  }

  // c13: a fadiga dentro da sessão
  for (const d of p.dias) {
    const exs = d.exercicios.map(bib);
    const lombar = exs.map(carregaLombar);
    if (lombar.some((l, i) => l && lombar[i + 1])) marca('c13a', `${d.nome}: ${exs.filter(carregaLombar).map((e) => e.id).join(' → ')}`);
    if (lombar.filter(Boolean).length >= 3) marca('c13b', `${d.nome}: ${exs.filter(carregaLombar).map((e) => e.id).join(', ')}`);
    const pegada = exs.map(dependeDaPegada);
    if (pegada.some((g, i) => g && pegada[i + 1] && pegada[i + 2])) marca('c13c', `${d.nome}: ${exs.filter(dependeDaPegada).map((e) => e.id).join(' → ')}`);
  }

  // c14: a segurança
  if (regua.defeitos.has('seguranca')) marca('c14a', regua.detalhe.seguranca!);
  if (regua.defeitos.has('A2')) marca('c14b', regua.detalhe.A2!);
  if (p.dias.length < pf.diasSemana) marca('c14c', `${p.dias.length} de ${pf.diasSemana} dias`);

  // c15: as técnicas para economizar tempo
  for (const d of p.dias)
    for (const x of d.exercicios) {
      if (nivel === 'iniciante' && (x.supersetCom || x.dropSet)) marca('c15a', `${d.nome}: ${x.exId} ${x.dropSet ? 'com drop set' : 'em bi-set'}`);
      if (!x.supersetCom) continue;
      const iPar = d.exercicios.findIndex((y) => y.exId === x.supersetCom);
      if (iPar >= 0 && Math.abs(iPar - d.exercicios.indexOf(x)) > 1) marca('c15d', `${d.nome}: ${x.exId} e ${x.supersetCom}`);
      const par = POR_ID[x.supersetCom]!;
      const e = bib(x);
      if (e.tipo === 'composto' && par.tipo === 'composto') marca('c15b', `${d.nome}: ${e.id} + ${par.id}`);
      if ((carregaLombar(e) && carregaLombar(par)) || (dependeDaPegada(e) && dependeDaPegada(par))) marca('c15c', `${d.nome}: ${e.id} + ${par.id}`);
    }

  // c16: o iniciante e o avançado
  const distintos = new Set(todos.map((x) => x.exId)).size;
  if (nivel === 'iniciante' && distintos > LIMITES.distintosDoIniciante) marca('c16a', `${distintos} exercícios diferentes na semana`);
  if (nivel !== 'iniciante' && semAbdomen.length && mediaPorMusculo < faixaMin) marca('c16b', `média de ${fmt(mediaPorMusculo)} séries por músculo (faixa do ${nivel}: a partir de ${faixaMin})`);

  // c17: os limites são ditos
  const citados = new Set(p.avisos.flatMap((a) => musculosDoAviso(a)));
  for (const m of MUSCULOS_COM_META) if ((v[m] ?? 0) < LIMITES.pisoUtil && !citados.has(m)) marca('c17a', `${m} com ${fmt(v[m] ?? 0)} séries, sem aviso`);

  // c20: o porquê bate com o programa
  const cabem = p.porque.find((q) => q.regraId === 'tempo.exercicios-por-sessao')?.texto.match(/cerca de (\d+) exerc/);
  if (cabem && p.dias.some((d) => d.exercicios.length > Number(cabem[1]))) marca('c20a', `o texto diz ${cabem[1]} e há dia com ${Math.max(...p.dias.map((d) => d.exercicios.length))}`);
  if (p.porque.some((q) => /todos os músculos ficam com ~6/.test(q.texto))) {
    const fora = comExercicio.filter((m) => m !== 'abdomen' && ((v[m] ?? 0) >= 9 || (v[m] ?? 0) < 4));
    if (fora.length) marca('c20b', `o texto diz ~6 e ${fora[0]} tem ${fmt(v[fora[0]!] ?? 0)}`);
  }

  return {
    falhas,
    detalhe,
    regua,
    n: {
      uso,
      series: todos.reduce((t, x) => t + seriesDeVolume(x), 0),
      exercicios: todos.length,
      distintos,
      mediaPorMusculo,
      abaixoDaFaixa,
      porAnimacao,
      porAlfabeto,
      prescricoes: todos.length,
      semProximoPasso,
    },
  };
}

/** Os cuidados (1 a 20) em que o programa falha em alguma medida do tipo pedido. */
export const cuidadosQueFalham = (c: Cuidados, tipo?: 'defeito' | 'nota') => new Set([...c.falhas].filter((k) => !tipo || MEDIDAS[k].tipo === tipo).map((k) => MEDIDAS[k].cuidado));

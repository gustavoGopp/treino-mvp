// A régua da frente G5 (docs/pesquisa-v2/17-biblioteca-ampliada.md, parte G5, tabela 4.7; medida em
// docs/revisoes/proximos-passos/g-biblioteca-ampliada.md, seção 1), em dois níveis:
// - **defeitos**: o programa não deveria sair assim (evidência ou decisão tomada); nenhum pode piorar;
// - **notas**: consenso e gosto; uma mudança é melhor se melhora alguma nota sem piorar defeito.
// Funções puras: recebem o programa gerado, o perfil e o contexto de seleção do mesmo perfil e inventário.
// Usadas pela grade da régua (grade-regua.ts) e pelo estresse de qualidade (qualidade.ts). Só dados fictícios.
import { POR_ID, type Musculo, type Padrao } from '../../src/domain/biblioteca';
import { GRUPOS, MUSCULOS_COM_META, seriesDeVolume, type ContextoDeSelecao, type Perfil, type Programa } from '../../src/domain/gerador';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { NIVEL_COMPLEXIDADE_MAX, TEMPO, VOLUME } from '../../src/domain/regras';

/** Os defeitos, na ordem da tabela 4.7. "seguranca" são os achados de bloqueio do avaliador (frente B). */
export const DEFEITOS = ['A2', 'A3', 'A4', 'B1', 'C1', 'D1', 'D3', 'E1', 'seguranca'] as const;
export type Defeito = (typeof DEFEITOS)[number];
export const NOTAS = ['A1', 'A5', 'B2', 'B3', 'C2', 'G1'] as const;
export type Nota = (typeof NOTAS)[number];

export const NOME_DEFEITO: Record<Defeito, string> = {
  A2: 'dia com menos de 3 exercícios ou sem multiarticular',
  A3: 'dia mais longo acima de 110% dos minutos',
  A4: 'dia típico abaixo de 70% dos minutos, sem o aviso',
  B1: 'o mesmo exercício em todos os dias havendo outro do mesmo nível',
  C1: 'prioritário abaixo da meta com tempo e exercício',
  D1: 'empurrar ÷ puxar acima de 1,5 havendo como puxar',
  D3: 'quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto)',
  E1: 'não prioritário com 1 a 3 séries havendo exercício e tempo',
  seguranca: 'exercício impossível, acima da complexidade ou numa região com dor > 5',
};
export const NOME_NOTA: Record<Nota, string> = {
  A1: 'exercícios por dia fora da faixa dos minutos',
  A5: 'dia mais curto abaixo de 60% do mais longo',
  B2: 'o mesmo exercício em todos os dias sem opção do mesmo nível',
  B3: 'dois exercícios ou mais em todos os dias',
  C2: 'o foco não passa da mediana dos outros músculos',
  G1: 'dia com 3 ou mais cartões de texto',
};

/** A1: a faixa de exercícios por dia, pelos minutos (consenso; 17, G5, 4.1). Entre os pontos, vale o de baixo. */
export const FAIXA_A1: [number, [number, number]][] = [
  [30, [3, 5]],
  [45, [4, 7]],
  [60, [5, 8]],
  [75, [5, 10]],
  [90, [5, 10]],
];
export const faixaA1 = (min: number): [number, number] => [...FAIXA_A1].reverse().find(([m]) => min >= m)?.[1] ?? FAIXA_A1[0]![1];

// Limites da régua (tabela 4.7).
export const LIMITE = {
  tetoTempo: 1.1, // A3: a estimativa já inclui os 10% de fila (tempo.colchao)
  pisoUso: TEMPO.sobraFracao, // A4: 70%, o mesmo de tempo.sobra
  comTempo: 0.85, // C1 e E1: "tem tempo" = o dia mais longo abaixo de 85% dos minutos
  diasParecidos: 0.6, // A5
  empurrarPuxar: 1.5, // D1
  coxa: [0.5, 2] as [number, number], // D3
  cartoes: 3, // G1
};

const EMPURRAR: Padrao[] = ['empurrar-h', 'empurrar-v', 'isolador-peito'];
const PUXAR: Padrao[] = ['puxar-h', 'puxar-v', 'isolador-ombro-posterior'];
const POSTERIOR_DIRETO: Padrao[] = ['flexao-joelho', 'dobrar-quadril'];

export type Medida = {
  defeitos: Set<Defeito>;
  notas: Set<Nota>;
  /** Detalhe legível de cada defeito ou nota que apareceu (para os exemplos). */
  detalhe: Partial<Record<Defeito | Nota, string>>;
  exerciciosPorDia: number[];
  distintos: number;
  prescricoes: number;
  semAlternativa: number;
  cartoesPorDia: number[];
  /** Quadríceps ÷ posteriores (null quando um dos dois não é possível). */
  coxa: number | null;
  empurrarPuxar: number | null;
};

/** A mediana comum (com um número par de valores, a média dos dois do meio). */
const mediana = (xs: number[]) => {
  const o = [...xs].sort((a, b) => a - b);
  const n = o.length;
  return !n ? 0 : n % 2 ? o[(n - 1) / 2]! : (o[n / 2 - 1]! + o[n / 2]!) / 2;
};
const fmt = (x: number) => String(Math.round(x * 100) / 100).replace('.', ',');

/** Mede um programa na régua. `ctx` é o contextoDeSelecao do mesmo perfil e inventário. */
export function medirRegua(p: Programa, pf: Perfil, ctx: ContextoDeSelecao): Medida {
  const defeitos = new Set<Defeito>();
  const notas = new Set<Nota>();
  const detalhe: Medida['detalhe'] = {};
  const marca = (k: Defeito | Nota, texto: string) => {
    if ((DEFEITOS as readonly string[]).includes(k)) defeitos.add(k as Defeito);
    else notas.add(k as Nota);
    detalhe[k] ??= texto;
  };
  const min = pf.minutosSessao;
  const prio = new Set<Musculo>(pf.prioridades.flatMap((g) => GRUPOS[g]));
  const v = p.volumeSemanal;
  const tempos = p.dias.map((d) => d.minutosEstimados);
  const maxDia = Math.max(0, ...tempos);
  const minDia = Math.min(...tempos);
  const diaTipico = mediana(tempos); // A4: o dia típico é a mediana dos dias
  const comTempo = maxDia < LIMITE.comTempo * min;
  const possivelPara = (m: Musculo) => ctx.possiveis.some((e) => e.musculos.primarios.includes(m));

  // Segurança (avaliador da frente B): tudo o que está no programa é possível no inventário, no nível e com a dor.
  for (const d of p.dias)
    for (const x of d.exercicios) {
      const e = POR_ID[x.exId]!;
      if (!ctx.possivel.has(x.exId) || e.complexidade > NIVEL_COMPLEXIDADE_MAX[pf.nivel] || e.articulacoes.some((a) => ctx.regioesExcluidas.includes(a)))
        marca('seguranca', `${d.nome}: ${x.exId} não é possível (equipamento, nível ou dor)`);
    }

  // A1, A2 por dia
  const [lo, hi] = faixaA1(min);
  for (const d of p.dias) {
    const n = d.exercicios.length;
    if (n < 3) marca('A2', `${d.nome} com ${n} exercício${n === 1 ? '' : 's'}`);
    else if (!d.exercicios.some((x) => x.tipo === 'composto')) marca('A2', `${d.nome} sem multiarticular`);
    if (n < lo || n > hi) marca('A1', `${d.nome} com ${n} exercícios em ${min} min (faixa ${lo}–${hi})`);
  }
  // A3, A4, A5
  if (maxDia > LIMITE.tetoTempo * min) marca('A3', `dia de ${maxDia} min em ${min}`);
  if (diaTipico < LIMITE.pisoUso * min && !p.avisos.some((a) => a.regraId === 'tempo.sobra')) marca('A4', `dia típico de ${diaTipico} min em ${min}, sem o aviso`);
  if (p.dias.length > 1 && minDia < LIMITE.diasParecidos * maxDia) marca('A5', `dias de ${minDia} a ${maxDia} min`);

  // B1, B2, B3: o mesmo exercício (fora o abdominal) em todos os dias, com 3 dias ou mais
  const porDia = p.dias.map((d) => new Set(d.exercicios.map((x) => x.exId)));
  const todosIds = new Set(porDia.flatMap((s) => [...s]));
  if (p.dias.length >= 3) {
    const emTodos = [...todosIds].filter((id) => POR_ID[id]!.padrao !== 'core' && porDia.every((s) => s.has(id)));
    for (const id of emTodos) {
      const x = p.dias.flatMap((d) => d.exercicios).find((y) => y.exId === id)!;
      const f = x.funcao ? FUNCAO[x.funcao] : undefined;
      const n = f ? f.niveis.findIndex((ids) => ids.includes(id)) : -1;
      const comOpcao = !!f && (f.niveis[n] ?? []).some((o) => o !== id && ctx.naFuncao(f, o) && !todosIds.has(o));
      if (comOpcao) marca('B1', `${id} em todos os dias, com outro do mesmo nível possível e sem uso`);
      else marca('B2', `${id} em todos os dias, sem outro do mesmo nível`);
    }
    if (emTodos.length >= 2) marca('B3', `${emTodos.join(', ')} em todos os dias`);
  }

  // C1, C2: o foco. C2 compara só músculos com exercício possível (o que o equipamento não permite não conta).
  const naoPrio = MUSCULOS_COM_META.filter((m) => !prio.has(m) && possivelPara(m)).map((m) => v[m] ?? 0);
  const medNaoPrio = mediana(naoPrio);
  for (const m of prio) {
    if (!possivelPara(m)) continue;
    const s = v[m] ?? 0;
    const meta = p.metas[m] ?? 0;
    if (s < meta && comTempo) marca('C1', `${m} com ${fmt(s)} de ${meta} e o dia mais longo em ${maxDia} de ${min} min`);
    if (naoPrio.length && s <= medNaoPrio) marca('C2', `${m} com ${fmt(s)}, mediana dos outros ${fmt(medNaoPrio)}`);
  }

  // D1: empurrar ÷ puxar, quando há como puxar
  const series = (padroes: Padrao[]) =>
    p.dias.flatMap((d) => d.exercicios).filter((x) => padroes.includes(x.padrao)).reduce((t, x) => t + seriesDeVolume(x), 0);
  const empurrar = series(EMPURRAR);
  const puxar = series(PUXAR);
  const podePuxar = !!ctx.resolver({ funcao: 'puxar-vertical' }) || !!ctx.resolver({ funcao: 'puxar-horizontal' });
  const ep = podePuxar ? (puxar ? empurrar / puxar : empurrar ? Infinity : null) : null;
  if (ep !== null && ep > LIMITE.empurrarPuxar) marca('D1', `empurrar ${empurrar} ÷ puxar ${puxar} séries`);

  // D3: quadríceps ÷ posteriores, quando os dois são possíveis
  let coxa: number | null = null;
  if (possivelPara('quadriceps') && possivelPara('posteriores')) {
    const q = v.quadriceps ?? 0;
    const h = v.posteriores ?? 0;
    coxa = h ? q / h : q ? Infinity : 1;
    const direto = p.dias.some((d) => d.exercicios.some((x) => POSTERIOR_DIRETO.includes(x.padrao)));
    if (coxa < LIMITE.coxa[0] || coxa > LIMITE.coxa[1]) marca('D3', `quadríceps ${fmt(q)} ÷ posteriores ${fmt(h)}`);
    else if (!direto) marca('D3', 'sem exercício direto de posteriores');
  }

  // E1: não prioritário com 1 a 3 séries, havendo exercício e tempo
  if (comTempo)
    for (const m of MUSCULOS_COM_META) {
      if (prio.has(m)) continue;
      const s = v[m] ?? 0;
      if (s > 0 && s < VOLUME.minimoEficazPiso && possivelPara(m)) marca('E1', `${m} com ${fmt(s)} séries e o dia mais longo em ${maxDia} de ${min} min`);
    }

  // G1: cartões de texto (exercício sem animação aprovada) por dia
  const cartoesPorDia = p.dias.map((d) => d.exercicios.filter((x) => !x.animacaoId).length);
  const comCartoes = cartoesPorDia.findIndex((n) => n >= LIMITE.cartoes);
  if (comCartoes >= 0) marca('G1', `${p.dias[comCartoes]!.nome} com ${cartoesPorDia[comCartoes]} cartões de texto`);

  const prescricoes = p.dias.flatMap((d) => d.exercicios);
  return {
    defeitos,
    notas,
    detalhe,
    exerciciosPorDia: p.dias.map((d) => d.exercicios.length),
    distintos: todosIds.size,
    prescricoes: prescricoes.length,
    semAlternativa: prescricoes.filter((x) => !x.alternativas.length).length,
    cartoesPorDia,
    coxa,
    empurrarPuxar: ep,
  };
}

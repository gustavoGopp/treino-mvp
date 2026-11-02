import type { Exercicio } from '../biblioteca';
import { PROGRESSAO, r, SEMANA_LEVE } from '../regras';
import { MENOR_ANILHA_PADRAO_KG } from '../taxonomia/equipamentos';

// Dupla progressão (progressao.*): primeiro as repetições sobem dentro da faixa; com todas as séries
// no topo, no RIR alvo, em 2 sessões seguidas, a carga sobe na sessão seguinte.

// Os 5 tipos de carga da pesquisa-v2/08, seção 1.1: kg conhecido, placa da torre, anilhas numa máquina
// (kg por lado; o peso do trenó é desconhecido), contrapeso (mais placa = mais fácil) e degrau.
export type Carga =
  | { tipo: 'kg'; kg: number }
  | { tipo: 'placa'; placa: number }
  | { tipo: 'anilha'; kgPorLado: number } // progressao.incremento.maquina-anilha
  | { tipo: 'contrapeso'; placa: number } // progressao.incremento.assistido: progredir = tirar placa
  | { tipo: 'degrau'; degrau: number }; // peso do corpo ou elástico: degraus da escada de dificuldade

export type SerieRegistrada = {
  carga: Carga;
  reps: number;
  rir: number;
  amplitudeCompleta?: boolean;
  dor?: number;
  /** Quedas do drop set (tempo.drop-set): registradas, mas fora da progressão, que usa só a série principal. */
  quedas?: { carga: Carga; reps: number }[];
  /** Série de acerto da calibração (progressao.calibracao): fica no histórico, mas fora da dupla progressão. */
  calibracao?: boolean;
};
export type SessaoExercicio = { series: SerieRegistrada[] };
export type Alvo = { reps: [number, number]; rir: [number, number] };

export type Acao = 'subir' | 'manter' | 'reduzir' | 'voltar' | 'estagnado' | 'ajustar' | 'interromper' | 'calibrar';
export type Sugestao = { acao: Acao; proxima?: Carga; motivo: string; regraId: string };

export type OpcoesCarga = {
  tipo: Exercicio['carga'];
  /** Cargas possíveis, em ordem crescente: por halter (taxonomia/cargasHalter) ou de kettlebell (cargasKettlebell). */
  lista?: number[];
  placasMax?: number;
  /** Menor anilha das máquinas de anilha (kg); sem ela, o padrão do projeto [opinião]. */
  menorAnilhaKg?: number;
};

// progressao.incremento.peso-corporal
export const ESCADA_PESO_CORPO = [
  'mais repetições',
  'descida de 3 s ou pausa embaixo',
  'variação mais difícil',
  'carga externa ou elástico mais forte',
];

const igual = (a: Carga, b: Carga) => JSON.stringify(a) === JSON.stringify(b);
/** Quanto maior, mais difícil. No contrapeso é ao contrário: mais placa = mais ajuda. */
/** Quanto maior, mais difícil (no contrapeso, menos placa = mais difícil). */
export const valorDaCarga = (c: Carga) => valor(c);
const valor = (c: Carga) => {
  switch (c.tipo) {
    case 'kg':
      return c.kg;
    case 'placa':
      return c.placa;
    case 'anilha':
      return c.kgPorLado;
    case 'contrapeso':
      return -c.placa;
    case 'degrau':
      return c.degrau;
  }
};
const arred = (x: number) => Math.round(x * 100) / 100;
/** "A carga de 10 kg", "a placa 9"…, para a mensagem da escada. */
const textoDaCarga = (c: Carga) =>
  c.tipo === 'kg'
    ? `A carga de ${String(c.kg).replace('.', ',')} kg`
    : c.tipo === 'placa'
      ? `A placa ${c.placa}`
      : c.tipo === 'anilha'
        ? `A carga de ${String(c.kgPorLado).replace('.', ',')} kg por lado`
        : c.tipo === 'contrapeso'
          ? `O contrapeso ${c.placa}`
          : 'Esse degrau';
const passoAnilha = (o: OpcoesCarga) => o.menorAnilhaKg ?? MENOR_ANILHA_PADRAO_KG;

export function proximaCarga(c: Carga, passos: number, o: OpcoesCarga): Carga | undefined {
  if (c.tipo === 'placa') {
    const p = c.placa + passos;
    return o.placasMax && p > o.placasMax ? undefined : { tipo: 'placa', placa: Math.max(1, p) };
  }
  if (c.tipo === 'degrau') {
    const d = c.degrau + passos;
    return d < 0 || d >= ESCADA_PESO_CORPO.length ? undefined : { tipo: 'degrau', degrau: d };
  }
  if (c.tipo === 'anilha') {
    // progressao.incremento.maquina-anilha: o menor par de anilhas, um de cada lado.
    const k = arred(c.kgPorLado + passos * passoAnilha(o));
    return k < 0 ? undefined : { tipo: 'anilha', kgPorLado: k };
  }
  if (c.tipo === 'contrapeso') {
    // progressao.incremento.assistido: subir = tirar placa de contrapeso; sem placa, vira a versão livre.
    const p = c.placa - passos;
    if (p < 1) return undefined;
    return o.placasMax && p > o.placasMax ? undefined : { tipo: 'contrapeso', placa: p };
  }
  const lista = o.lista ?? [];
  if (lista.length) {
    if (passos > 0) {
      const acima = lista.filter((k) => k > c.kg + 1e-9);
      const k = acima[Math.min(passos, acima.length) - 1];
      return k === undefined ? undefined : { tipo: 'kg', kg: k };
    }
    const abaixo = lista.filter((k) => k < c.kg - 1e-9);
    const k = abaixo.at(passos); // passos negativo: -1 = a anterior
    return k === undefined ? undefined : { tipo: 'kg', kg: k };
  }
  // barra/máquina sem lista: degraus de 2,5 kg
  const k = Math.round((c.kg + passos * 2.5) * 10) / 10;
  return k > 0 ? { tipo: 'kg', kg: k } : undefined;
}

/** Redução de 5–10% (progressao.reduzir) ou de 10–20% (seguranca.dor.escala). */
function reduzir(c: Carga, fator: number, o: OpcoesCarga): Carga | undefined {
  if (c.tipo === 'anilha') {
    const passo = passoAnilha(o);
    const k = Math.min(c.kgPorLado - passo, Math.floor((c.kgPorLado * (1 - fator)) / passo + 1e-9) * passo);
    return k < 0 ? (c.kgPorLado > 0 ? { tipo: 'anilha', kgPorLado: 0 } : undefined) : { tipo: 'anilha', kgPorLado: arred(k) };
  }
  if (c.tipo !== 'kg') return proximaCarga(c, -1, o);
  const lista = o.lista ?? [];
  const alvo = c.kg * (1 - fator);
  if (lista.length) {
    const k = [...lista].reverse().find((x) => x <= alvo + 1e-9) ?? lista.find((x) => x < c.kg);
    return k === undefined ? undefined : { tipo: 'kg', kg: k };
  }
  return { tipo: 'kg', kg: Math.round(alvo * 2) / 2 };
}

const validas = (s: SessaoExercicio) => s.series.filter((x) => x.amplitudeCompleta !== false);
const noTopo = (s: SessaoExercicio, a: Alvo) =>
  s.series.length > 0 && s.series.every((x) => x.amplitudeCompleta !== false && x.reps >= a.reps[1] && x.rir <= a.rir[1]);
const totalReps = (s: SessaoExercicio) => validas(s).reduce((t, x) => t + x.reps, 0);

export function sugerirProgressao(historico: SessaoExercicio[], alvo: Alvo, o: OpcoesCarga): Sugestao {
  const ultima = historico.at(-1);
  if (!ultima || !ultima.series.length)
    return { acao: 'manter', motivo: 'Registre a primeira sessão para receber sugestões.', regraId: r('progressao.manter') };
  const carga = ultima.series[0]!.carga;
  const anterior = historico.at(-2);

  // Segurança primeiro (seguranca.dor.escala)
  const dor = Math.max(0, ...ultima.series.map((x) => x.dor ?? 0));
  if (dor > 5)
    return { acao: 'interromper', motivo: 'Dor acima de 5/10: use a alternativa e procure avaliação se continuar.', regraId: r('seguranca.dor.escala') };
  if (dor >= 3)
    return {
      acao: 'ajustar',
      proxima: reduzir(carga, 0.15, o),
      motivo: 'Dor entre 3 e 5/10: reduza a carga, encurte a amplitude ou desacelere; se não melhorar, troque pela alternativa.',
      regraId: r('seguranca.dor.escala'),
    };

  const primeira = validas(ultima)[0];
  const subiuAgora = anterior && anterior.series[0] && valor(carga) > valor(anterior.series[0].carga);

  // Salto grande demais: depois de subir, a 1ª série ficou abaixo do mínimo → volta à carga anterior
  if (subiuAgora && (!primeira || primeira.reps < alvo.reps[0]))
    return {
      acao: 'voltar',
      proxima: anterior.series[0]!.carga,
      motivo: 'A carga nova ficou pesada demais. Volte à anterior e faça 1–2 repetições acima do topo antes de tentar de novo.',
      regraId: r('progressao.salto-grande'),
    };

  // Abaixo do mínimo em 2 sessões seguidas → reduzir 5–10%
  const abaixo = (s?: SessaoExercicio) => !!s && (validas(s)[0]?.reps ?? 0) < alvo.reps[0];
  if (abaixo(ultima) && abaixo(anterior) && anterior && igual(anterior.series[0]!.carga, carga))
    return {
      acao: 'reduzir',
      proxima: reduzir(carga, 0.075, o),
      motivo: 'Duas sessões abaixo do mínimo da faixa: reduza um pouco a carga e reconstrua.',
      regraId: r('progressao.reduzir'),
    };

  // Uma carga que ficou pesada há pouco (a 1ª série abaixo do mínimo da faixa) não volta a ser sugerida dentro da
  // janela: antes, a escada de dificuldade. Sem isso, subir → voltar → subir… sem fim (auditoria, achado 3).
  const recentes = historico.slice(-PROGRESSAO.janelaFalha);
  const falhouHaPouco = (c: Carga) => recentes.some((x) => x.series[0] && igual(x.series[0].carga, c) && (validas(x)[0]?.reps ?? 0) < alvo.reps[0]);
  const escada = (c: Carga): Sugestao => ({
    acao: 'manter',
    motivo: `${textoDaCarga(c)} pesou demais há pouco. Antes de tentar de novo, siga a escada: mais repetições (até ~30), descida lenta ou pausa no alongamento.`,
    regraId: r('equipamento.escada-carga-leve'),
  });

  // Carga leve demais: 1ª série passou do topo por 2+ repetições no RIR alvo → 2 incrementos, se o salto total ficar
  // em até ~10% (só dá para medir em kg); senão, 1 incremento (progressao.carga-leve, progressao.salto-grande).
  if (primeira && primeira.reps >= alvo.reps[1] + 2 && primeira.rir <= alvo.rir[1]) {
    const dois = proximaCarga(carga, 2, o);
    const prox = dois && carga.tipo === 'kg' && dois.tipo === 'kg' && (dois.kg - carga.kg) / carga.kg <= PROGRESSAO.saltoGrande + 1e-9 ? dois : proximaCarga(carga, 1, o);
    if (prox && falhouHaPouco(prox)) return escada(prox);
    if (prox)
      return {
        acao: 'subir',
        proxima: prox,
        motivo: prox === dois ? 'A carga está leve demais para a faixa: suba dois degraus.' : 'A carga está leve demais para a faixa: suba um degrau.',
        regraId: r('progressao.carga-leve'),
      };
  }

  // Topo da faixa em 2 sessões seguidas, com a mesma carga → subir
  if (noTopo(ultima, alvo) && anterior && noTopo(anterior, alvo) && igual(anterior.series[0]!.carga, carga)) {
    const prox = proximaCarga(carga, 1, o);
    if (!prox && carga.tipo === 'contrapeso')
      return {
        acao: 'subir',
        motivo: 'Topo da faixa com a última placa de contrapeso: passe para a versão livre (barra fixa ou mergulho), sem ajuda.',
        regraId: r('progressao.incremento.assistido'),
      };
    if (!prox)
      return {
        acao: 'manter',
        motivo: 'Não há carga maior disponível: siga a escada (mais repetições até ~30, unilateral, descida lenta, pausa).',
        regraId: r('equipamento.escada-carga-leve'),
      };
    if (falhouHaPouco(prox)) return escada(prox);
    const salto = carga.tipo === 'kg' && prox.tipo === 'kg' ? (prox.kg - carga.kg) / carga.kg : 0;
    if (salto > PROGRESSAO.saltoGrande && !ultima.series.every((x) => x.reps >= alvo.reps[1] + 1))
      return {
        acao: 'manter',
        motivo: `O próximo degrau é um salto de ${Math.round(salto * 100)}%: antes, faça 1–2 repetições acima do topo em todas as séries.`,
        regraId: r('progressao.salto-grande'),
      };
    return { acao: 'subir', proxima: prox, motivo: 'Topo da faixa em todas as séries, no RIR certo, por 2 sessões: suba a carga.', regraId: r('progressao.subir') };
  }

  // Estagnação: 3 sessões seguidas, mesma carga, sem melhora de repetições
  const ult3 = historico.slice(-3);
  if (
    ult3.length === 3 &&
    ult3.every((s) => s.series[0] && igual(s.series[0].carga, carga)) &&
    Math.max(totalReps(ult3[1]!), totalReps(ult3[2]!)) <= totalReps(ult3[0]!)
  )
    return {
      acao: 'estagnado',
      motivo: 'Três sessões sem melhora: 1) alargue a faixa; 2) reduza 10% e reconstrua; 3) semana leve; 4) troque por uma variação equivalente.',
      regraId: r('progressao.estagnacao'),
    };

  return { acao: 'manter', motivo: 'Mantenha a carga e busque +1 repetição.', regraId: r('progressao.manter') };
}

/**
 * Semana leve sugerida, manual e opcional (deload.semana-leve; pesquisa-v2/07, seção 6). Nunca é aplicada sozinha.
 * Só com sinal: ≥ 2 exercícios estagnados, "pesado demais" em 2 dos últimos 3 treinos ou dor de 3 a 5 no mesmo
 * exercício em 2 sessões seguidas. Sem o gatilho de "6–8 semanas": uma semana leve não mudou a hipertrofia (coleman2024,
 * pancar2026). Na carência (as 3 semanas depois de uma volta de pausa ou de uma semana leve), não sugere.
 */
export function sugerirSemanaLeve(sinais: { exerciciosEstagnados: number; pesadoNosUltimos3: number; dorQueSeRepete: number; carencia?: boolean }) {
  const motivos = [
    sinais.exerciciosEstagnados >= SEMANA_LEVE.estagnados && `${sinais.exerciciosEstagnados} exercícios sem progresso em 3 treinos`,
    sinais.pesadoNosUltimos3 >= SEMANA_LEVE.pesadoEm && `"pesado demais" em ${sinais.pesadoNosUltimos3} dos últimos ${SEMANA_LEVE.pesadoDe} treinos`,
    sinais.dorQueSeRepete > 0 && 'dor de 3 a 5 no mesmo exercício em 2 treinos seguidos',
  ].filter((m): m is string => !!m);
  return {
    sugerir: motivos.length > 0 && !sinais.carencia,
    motivos,
    texto: 'Para descansar, não para crescer. Pode deixar a força um pouco mais baixa por alguns dias; o músculo não perde. Mesma frequência, cerca de metade das séries, RIR 3–4 e a mesma carga, por 7 dias.',
    regraId: r('deload.semana-leve'),
  };
}

/** Série efetiva (rir.serie-efetiva): série de trabalho com até 4 repetições de reserva. */
export const serieEfetiva = (s: SerieRegistrada) => s.rir <= 4 && s.amplitudeCompleta !== false;

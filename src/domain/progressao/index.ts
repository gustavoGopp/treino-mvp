import type { Exercicio } from '../biblioteca';
import { DOR, PROGRESSAO, r, SEMANA_LEVE } from '../regras';
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
  /** Degraus do peso do corpo e do elástico (progressao.escada-por-exercicio); sem eles, a escada genérica. */
  degraus?: string[];
  /** No último degrau, o exercício seguinte (progressao.negativa-para-barra): o nome, para a sugestão. */
  depois?: string;
  /** Barra sem lista: a carga sobe de 2 × a menor anilha (equipamento.menor-anilha), a partir do peso da barra. */
  passoKg?: number;
  baseKg?: number;
};

/** Barra (ou carga em kg sem lista): degraus de `passoKg` a partir de `baseKg`; sem eles, 2,5 kg a partir de 0. */
const passoDe = (o: OpcoesCarga) => o.passoKg ?? 2.5;
const baseDe = (o: OpcoesCarga) => o.baseKg ?? 0;
/** A maior carga do passo até x. */
export const noPassoAbaixo = (x: number, o: OpcoesCarga) => {
  const p = passoDe(o);
  const b = baseDe(o);
  return Math.round((b + Math.floor((x - b) / p + 1e-9) * p) * 100) / 100;
};

/**
 * A carga existe no passo da barra: é positiva e não fica abaixo da barra vazia (`baseKg`). Sem isto, com a barra de
 * 20 kg e o passo de 4 kg, o app sugeria 16 kg, uma carga que a pessoa não tem como montar.
 */
export const existeNoPasso = (k: number, o: OpcoesCarga) => k > 0 && k >= baseDe(o) - 1e-9;

// progressao.incremento.peso-corporal: a escada genérica; cada exercício pode ter a sua (escadas.ts).
export { ESCADA_GENERICA as ESCADA_PESO_CORPO } from './escadas';
import { ESCADA_GENERICA } from './escadas';

const igual = (a: Carga, b: Carga) => JSON.stringify(a) === JSON.stringify(b);
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
    return d < 0 || d >= (o.degraus ?? ESCADA_GENERICA).length ? undefined : { tipo: 'degrau', degrau: d };
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
  // barra sem lista: degraus de 2 × a menor anilha a partir do peso da barra; uma carga antiga fora do passo vai para
  // a próxima que existe (auditoria, achado 7).
  const p = passoDe(o);
  const b = baseDe(o);
  const i = (c.kg - b) / p;
  const k = Math.round((b + (passos > 0 ? Math.floor(i + 1e-9) + passos : Math.ceil(i - 1e-9) + passos) * p) * 100) / 100;
  return existeNoPasso(k, o) ? { tipo: 'kg', kg: k } : undefined;
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
  // No passo da barra: o degrau mais perto do alvo, sempre abaixo da carga de hoje.
  const baixo = noPassoAbaixo(alvo, o);
  const cima = Math.round((baixo + passoDe(o)) * 100) / 100;
  const k = cima < c.kg - 1e-9 && cima - alvo < alvo - baixo ? cima : Math.min(baixo, noPassoAbaixo(c.kg - passoDe(o), o));
  return existeNoPasso(k, o) ? { tipo: 'kg', kg: k } : undefined;
}

const validas = (s: SessaoExercicio) => s.series.filter((x) => x.amplitudeCompleta !== false);
const noTopo = (s: SessaoExercicio, a: Alvo) => {
  if (!s.series.length || !s.series.every((x) => x.amplitudeCompleta !== false && x.rir <= a.rir[1])) return false;
  // progressao.criterio-degrau: no peso do corpo e no elástico, a 1ª série no topo e as outras a até 2 repetições dele.
  if (s.series[0]!.carga.tipo === 'degrau') return s.series[0]!.reps >= a.reps[1] && s.series.every((x) => x.reps >= a.reps[1] - PROGRESSAO.folgaDegrau);
  return s.series.every((x) => x.reps >= a.reps[1]);
};
const totalReps = (s: SessaoExercicio) => validas(s).reduce((t, x) => t + x.reps, 0);

/**
 * O que a nota de dor da última vez pede (seguranca.dor.escala; consenso): acima de 5, a alternativa; de 3 a 5, a
 * carga reduzida (quando há uma carga de onde reduzir). Abaixo de 3, nada: devolve undefined.
 */
export function sugestaoPorDor(dor: number, carga: Carga | undefined, o: OpcoesCarga): Sugestao | undefined {
  if (dor > DOR.ajustarAte)
    return { acao: 'interromper', motivo: `Dor acima de ${DOR.ajustarAte}/10: use a alternativa e procure avaliação se continuar.`, regraId: r('seguranca.dor.escala') };
  if (dor >= DOR.ajustarDe) {
    const proxima = carga && reduzir(carga, 0.15, o);
    return {
      acao: 'ajustar',
      ...(proxima ? { proxima } : {}),
      motivo: `Dor entre ${DOR.ajustarDe} e ${DOR.ajustarAte}/10: reduza a carga, encurte a amplitude ou desacelere; se não melhorar, troque pela alternativa.`,
      regraId: r('seguranca.dor.escala'),
    };
  }
  return undefined;
}

export function sugerirProgressao(historico: SessaoExercicio[], alvo: Alvo, o: OpcoesCarga): Sugestao {
  const ultima = historico.at(-1);
  if (!ultima || !ultima.series.length)
    return { acao: 'manter', motivo: 'Registre a primeira sessão para receber sugestões.', regraId: r('progressao.manter') };
  const carga = ultima.series[0]!.carga;
  const anterior = historico.at(-2);

  // Segurança primeiro (seguranca.dor.escala)
  const porDor = sugestaoPorDor(Math.max(0, ...ultima.series.map((x) => x.dor ?? 0)), carga, o);
  if (porDor) return porDor;

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
  if (abaixo(ultima) && abaixo(anterior) && anterior && igual(anterior.series[0]!.carga, carga)) {
    const menor = reduzir(carga, 0.075, o);
    // Sem carga menor para sugerir (a barra vazia, o halter mais leve), o texto não manda reduzir o que não dá.
    const haMenor = !!menor && !igual(menor, carga);
    return {
      acao: 'reduzir',
      proxima: haMenor ? menor : undefined,
      motivo: haMenor
        ? 'Duas sessões abaixo do mínimo da faixa: reduza um pouco a carga e reconstrua.'
        : 'Duas sessões abaixo do mínimo da faixa, e não há carga menor aqui: faça menos repetições ou use a alternativa.',
      regraId: r('progressao.reduzir'),
    };
  }

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
    if (!prox && carga.tipo === 'degrau' && o.depois)
      return {
        acao: 'manter',
        motivo: `Você chegou ao último degrau e ao topo da faixa: na próxima sessão, tente a ${o.depois.toLowerCase()} (em "Trocar exercício"). Se a 1ª série não chegar a ${alvo.reps[0]} repetições completas, volte a este.`,
        regraId: r('progressao.negativa-para-barra'),
      };
    if (!prox && carga.tipo === 'degrau')
      return {
        acao: 'manter',
        motivo: 'Você chegou ao último degrau deste exercício. Daqui em diante, busque mais repetições, até umas 30; acima disso, o peso do corpo rende menos.',
        regraId: r('equipamento.fim-da-escada'),
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

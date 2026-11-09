import { BIBLIOTECA, type Exercicio } from '../biblioteca';
import { faseNaSemana, prescricaoDaSemana, type DiaPrograma, type ExercicioPrescrito, type Fase, type Programa } from '../gerador';
import { blocoAtual, naFaseDeAprendizado, semanaNoBloco, treinoFeito, type Hoje } from './bloco';
import { DEPOIS_DA_ESCADA, escadaDe, nomeDoDegrau, pedeMiniBand } from '../progressao/escadas';
import { noPassoAbaixo, proximaCarga, sugerirProgressao, type Alvo, type Carga, type OpcoesCarga, type SerieRegistrada, type SessaoExercicio, type Sugestao } from '../progressao';
import { calibrar, emCalibracao, fimDaCalibracao, semCalibracao, type ResultadoCalibracao } from '../progressao/calibracao';
import { funcoesDoExercicio } from '../gerador/funcoes';
import { r } from '../regras';
import { CAPACIDADES, cargasCaneleiras, cargasHalter, cargasKettlebell, ITEM_IDS, MENOR_ANILHA_PADRAO_KG, type Capacidade, type Inventario } from '../taxonomia/equipamentos';
export * from './bloco';

// Sessão de treino: funções puras que ligam o programa, o histórico e a progressão.
// Datas entram como texto ISO (quem chama decide "hoje"); nada aqui lê o relógio.
// Decisões e fontes: docs/pesquisa/10-decisoes-m5.md.

export type ExercicioFeito = {
  /** Exercício que de fato foi feito (pode ser a alternativa). */
  exId: string;
  /** Exercício do programa que ele substituiu, se houve troca. */
  noLugarDe?: string;
  series: SerieRegistrada[];
  /** Encerrado por dor ou sinal de alerta. */
  interrompido?: boolean;
};

export type Sessao = {
  id: string;
  diaId: string;
  semana: number;
  inicio: string;
  fim?: string;
  /** Encerrada por sinal de alerta cardiovascular (seguranca.alerta.cardiovascular). */
  encerradaPorAlerta?: boolean;
  /** Local onde o treino foi feito (R1b); sem local = de antes do R1b, no 1º local. */
  localId?: string;
  exercicios: ExercicioFeito[];
  /** Toque opcional no fim do treino (deload.semana-leve): "hoje foi leve, normal ou pesado demais". */
  hojeFoi?: 'leve' | 'normal' | 'pesado';
  /** Feita durante uma semana leve aceita: fica fora da dupla progressão e da estagnação. */
  semanaLeve?: boolean;
};

/**
 * De qual local é o histórico que vale para a carga (progressao.troca-equivalente; decisão do Gustavo no R1b):
 * `localId` é o local de hoje; `localPadrao`, o das sessões sem local (o 1º local, o único que existia antes).
 */
export type LocalDaCarga = { localId: string; localPadrao?: string };

const POR_ID: Record<string, Exercicio> = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));

/**
 * Próximo dia da rotação: o seguinte ao do último treino feito; o primeiro se não há histórico (decisão 1). Só conta a
 * sessão com pelo menos 1 série (registro.treino-feito): "Começar" e "Terminar" sem série não pulam o dia.
 */
export function proximoDia(programa: Programa, historico: Sessao[]): DiaPrograma {
  const ultima = [...historico].reverse().find((s) => treinoFeito(s) && programa.dias.some((d) => d.id === s.diaId));
  if (!ultima) return programa.dias[0]!;
  const i = programa.dias.findIndex((d) => d.id === ultima.diaId);
  return programa.dias[(i + 1) % programa.dias.length]!;
}

/**
 * Semana do programa (readaptacao.durante-uso; decisão 3 do T6): as semanas com treino desde o início do bloco, e não
 * as semanas do calendário. O bloco recomeça na volta de uma pausa de 21 dias ou mais (ver ./bloco.ts).
 */
export function semanaDoPrograma(historico: Sessao[], hojeIso: string, fusoMin = 0): number {
  return semanaNoBloco(blocoAtual(historico, hojeIso, fusoMin), hojeIso, fusoMin);
}

/** O dia com séries e RIR da semana (fases de readaptação e aprendizado). */
export function diaDaSemana(programa: Programa, diaId: string, semana: number): DiaPrograma {
  return prescricaoDaSemana(programa, semana).find((d) => d.id === diaId) ?? programa.dias[0]!;
}

/** Prescrição de quem ocupa a vaga: a do programa ou, numa troca, a da alternativa (repetições, lado e animação dela). */
export function prescricaoDaVaga(orig: ExercicioPrescrito, altId?: string): ExercicioPrescrito {
  const alt = altId && altId !== orig.exId ? POR_ID[altId] : undefined;
  return alt ? { ...orig, exId: alt.id, nome: alt.nome, reps: alt.faixaReps, unilateral: alt.unilateral, animacaoId: alt.animacaoId, alternativas: [] } : orig;
}

/** Fase que vale na semana ("1", "1–2", "3+"; a fase "1ª sessão" do cadastro vale na semana 1). */
export function faseDaSemana(p: Programa, semana: number, fases: Fase[] = p.fases): Fase | undefined {
  return faseNaSemana(fases, semana) ?? (semana === 1 ? fases.find((f) => f.semanas === '1ª sessão') : undefined);
}

export type ContextoGuia = { diaId: string; exId: string; /** Exercício da vaga, quando houve troca pela alternativa. */ vaga?: string };

/**
 * O que o guia mostra quando é aberto pelo programa ou pelo treino (R1): a prescrição da pessoa naquela semana
 * (séries, repetições, RIR e descanso, com as fases de aprendizado e readaptação), nunca a do programa de
 * referência. Devolve null se o dia ou o exercício não estão no programa (o guia mostra então o catálogo).
 */
export function prescricaoNoGuia(
  programa: Programa,
  ctx: ContextoGuia,
  hoje: number | Pick<Hoje, 'semana' | 'dias' | 'fase'>,
): { dia: DiaPrograma; x: ExercicioPrescrito; semana: number; fase?: Fase } | null {
  const semana = typeof hoje === 'number' ? hoje : hoje.semana;
  const dias = typeof hoje === 'number' ? prescricaoDaSemana(programa, semana) : hoje.dias;
  const dia = dias.find((d) => d.id === ctx.diaId);
  const orig = dia?.exercicios.find((x) => x.exId === (ctx.vaga ?? ctx.exId));
  if (!dia || !orig) return null;
  const fase = typeof hoje === 'number' ? faseDaSemana(programa, semana) : hoje.fase;
  return { dia, x: prescricaoDaVaga(orig, ctx.vaga ? ctx.exId : undefined), semana, ...(fase ? { fase } : {}) };
}

export type TipoCarga = Carga['tipo'];

/** Placas ou menor anilha do item que dá a capacidade do exercício (o 1º do inventário que a dá sozinho). */
function atributoDoItem(ex: Exercicio | undefined, inv: Inventario, chave: 'placas' | 'menorAnilhaKg' | 'pesoBarraKg'): number | undefined {
  if (!ex) return undefined;
  const caps = ex.requer.find((g) => g.every((c) => CAPACIDADES[c](inv))) ?? ex.requer[0]!;
  for (const id of ITEM_IDS) {
    const a = (inv as Record<string, Record<string, unknown> | undefined>)[id];
    if (!a || typeof a[chave] !== 'number') continue;
    if (caps.some((c) => c !== 'apoio' && CAPACIDADES[c]({ [id]: a } as Inventario))) return a[chave] as number;
  }
  return undefined;
}

/** Como registrar a carga de um exercício, conforme o equipamento (progressao.incremento.*; pesquisa-v2/08, seção 1.1). */
export function opcoesCarga(exId: string, inventario: Inventario): OpcoesCarga & { registro: TipoCarga } {
  const ex = POR_ID[exId];
  let tipo = ex?.carga ?? 'peso-corpo';
  const placas = atributoDoItem(ex, inventario, 'placas');
  // A carga segue a versão possível do exercício (auditoria, achado 7): a Scott com halteres sobe pela lista dos
  // halteres; o hip thrust no smith, pelas anilhas por lado; e o que é "halter" sem halteres no local (a panturrilha
  // no chão ou no step) sobe pela escada, como o peso do corpo.
  const grupo = ex?.requer.find((g) => g.every((c) => CAPACIDADES[c](inventario)));
  const BARRAS: Capacidade[] = ['barra_longa', 'barra_w', 'barra_hexagonal'];
  if (tipo === 'barra' && grupo && !grupo.some((c) => BARRAS.includes(c))) tipo = grupo.includes('halteres') ? 'halter' : grupo.includes('smith') ? 'anilha' : tipo;
  if (tipo === 'halter' && !cargasHalter(inventario).length) tipo = 'peso-corpo';
  switch (tipo) {
    case 'halter':
      return { tipo, registro: 'kg', lista: cargasHalter(inventario) };
    case 'kettlebell':
      return { tipo, registro: 'kg', lista: cargasKettlebell(inventario) };
    case 'caneleira':
      return { tipo, registro: 'kg', lista: cargasCaneleiras(inventario) };
    case 'polia':
    case 'maquina':
      return { tipo, registro: 'placa', ...(placas ? { placasMax: placas } : {}) };
    case 'anilha': {
      const menor = atributoDoItem(ex, inventario, 'menorAnilhaKg');
      return { tipo, registro: 'anilha', ...(menor ? { menorAnilhaKg: menor } : {}) };
    }
    case 'assistida':
      return { tipo, registro: 'contrapeso', ...(placas ? { placasMax: placas } : {}) };
    case 'peso-corpo':
    case 'elastico':
      // progressao.escada-por-exercicio e progressao.escada-elastico: a escada do exercício, com as intensidades do local.
      return { tipo, registro: 'degrau', degraus: escadaDe(exId, inventario), ...(DEPOIS_DA_ESCADA[exId] ? { depois: POR_ID[DEPOIS_DA_ESCADA[exId]!]!.nome } : {}) };
    case 'barra': {
      // Sobe de 2 × a menor anilha (uma de cada lado), a partir do peso da barra quando informado (equipamento.menor-anilha).
      const menor = atributoDoItem(ex, inventario, 'menorAnilhaKg') ?? MENOR_ANILHA_PADRAO_KG;
      const base = atributoDoItem(ex, inventario, 'pesoBarraKg');
      return { tipo, registro: 'kg', passoKg: 2 * menor, ...(base ? { baseKg: base } : {}) };
    }
  }
}

/**
 * Texto da carga para a tela. No degrau (peso do corpo, elástico), o nome do degrau vem depois da base:
 * "peso do corpo × 12", e não "mais repetições × 12" (R1). O exercício, quando conhecido, diz se a base é o elástico
 * ou a faixa curta da mini-band (equipamento.mini-band).
 */
export function textoCarga(c: Carga, exId?: string): string {
  if (c.tipo === 'degrau') {
    const base = exId && POR_ID[exId]?.carga === 'elastico' ? (pedeMiniBand(exId) ? 'faixa curta' : 'elástico') : 'peso do corpo';
    if (c.degrau === 0) return base;
    return `${base} · ${nomeDoDegrau(exId, c.degrau) ?? `degrau ${c.degrau + 1}`}`;
  }
  if (c.tipo === 'kg') return `${c.kg.toLocaleString('pt-BR')} kg`;
  if (c.tipo === 'placa') return `placa ${c.placa}`;
  if (c.tipo === 'anilha') return `${c.kgPorLado.toLocaleString('pt-BR')} kg por lado`;
  return `contrapeso ${c.placa}`;
}

/**
 * A carga do exercício depende da máquina (placa da torre, anilhas por lado, contrapeso): a placa 7 de uma torre não
 * pesa o mesmo que a de outra, e o trenó de cada leg press pesa diferente. Halteres, kettlebell, caneleira, barra, peso do corpo
 * e elástico valem igual em qualquer local (kg é kg).
 */
export const cargaDaMaquina = (exId: string) => {
  const c = POR_ID[exId]?.carga;
  return c === 'polia' || c === 'maquina' || c === 'anilha' || c === 'assistida';
};

/**
 * Histórico de um exercício (só sessões em que ele foi feito com séries), do mais antigo ao mais recente. Com o local,
 * nas máquinas, só as sessões daquele local (decisão do R1b); fora delas, o histórico segue o exercício em qualquer local.
 * Nada é apagado nem misturado: é só uma leitura com filtro.
 */
export function historicoDoExercicio(historico: Sessao[], exId: string, local?: LocalDaCarga, filtro: FiltroHistorico = {}): SessaoExercicio[] {
  const noLocal = (s: Sessao) => !local || !cargaDaMaquina(exId) || (s.localId ?? local.localPadrao) === local.localId;
  const noFiltro = (s: Sessao) => (!filtro.desde || Date.parse(s.inicio) >= Date.parse(filtro.desde)) && (!filtro.semLeve || !s.semanaLeve);
  return historico
    .filter((s) => noLocal(s) && noFiltro(s))
    .flatMap((s) => s.exercicios.filter((e) => e.exId === exId && e.series.length > 0))
    .map((e) => ({ series: e.series }));
}

/** Recorte do histórico: desde o início do bloco, e sem as sessões da semana leve (fora da dupla progressão). */
export type FiltroHistorico = { desde?: string; semLeve?: boolean };

/** Última série registrada de um exercício, para pré-preencher a próxima (decisão 3). */
export function ultimaSerie(historico: Sessao[], exId: string, local?: LocalDaCarga): SerieRegistrada | undefined {
  return historicoDoExercicio(historico, exId, local).at(-1)?.series.at(-1);
}

/**
 * Opções de quem chama a sugestão: o local de hoje; a semana 1 da volta de uma pausa (a calibração só desce); o bloco
 * de hoje (readaptacao.durante-uso: a dupla progressão olha só o bloco, e a 1ª vez no bloco vem com a carga da volta);
 * e a semana leve (deload.semana-leve: a mesma carga).
 */
export type OpcoesSugestao = {
  local?: LocalDaCarga;
  soDesce?: boolean;
  bloco?: { inicio: string; reducao: number; calibrar?: boolean };
  semanaLeve?: boolean;
  /** Fase de aprendizado do iniciante (iniciante.fase-aprendizado): sem "estagnado" (R5a). */
  aprendizado?: boolean;
};

/** As opções da sugestão que saem da prescrição de hoje: a semana 1 da volta, o bloco aberto por pausa e a semana leve. */
export const opcoesDeHoje = (hoje: Hoje): OpcoesSugestao => {
  const b = hoje.bloco;
  return {
    ...(hoje.fase?.regraId === 'readaptacao.semana1' ? { soDesce: true } : {}),
    ...(b.pausaDias !== undefined ? { bloco: { inicio: b.inicio, reducao: b.reducao, ...(b.calibrar ? { calibrar: true } : {}) } } : {}),
    ...(hoje.semanaLeve ? { semanaLeve: true } : {}),
    ...(naFaseDeAprendizado(hoje) ? { aprendizado: true } : {}),
  };
};

/**
 * Carga da volta de uma pausa (readaptacao.semana1): a última × (1 − redução), sempre para baixo no que o local de hoje
 * tem. Placa: placas × (1 − redução), para baixo; anilhas: no múltiplo da menor anilha; contrapeso: uma placa a mais
 * (mais ajuda); peso do corpo e elástico: um degrau abaixo.
 */
export function cargaDaVolta(c: Carga, reducao: number, o: OpcoesCarga): Carga {
  const f = 1 - reducao;
  switch (c.tipo) {
    case 'kg': {
      const alvo = c.kg * f;
      const lista = o.lista ?? [];
      if (lista.length) return { tipo: 'kg', kg: [...lista].reverse().find((k) => k <= alvo + 1e-9) ?? lista[0]! };
      const k = noPassoAbaixo(alvo, o);
      return { tipo: 'kg', kg: k > 0 ? k : c.kg };
    }
    case 'placa':
      return { tipo: 'placa', placa: Math.max(1, Math.floor(c.placa * f + 1e-9)) };
    case 'anilha': {
      const passo = o.menorAnilhaKg ?? MENOR_ANILHA_PADRAO_KG;
      return { tipo: 'anilha', kgPorLado: Math.max(0, Math.round(Math.floor((c.kgPorLado * f) / passo + 1e-9) * passo * 100) / 100) };
    }
    case 'contrapeso':
      return proximaCarga(c, -1, o) ?? c;
    case 'degrau':
      return { tipo: 'degrau', degrau: Math.max(0, c.degrau - 1) };
  }
}

/** A carga de referência da última sessão: a 1ª série de trabalho (a da dupla progressão), ou a última de acerto. */
const cargaDeReferencia = (h: SessaoExercicio[]): Carga | undefined => {
  const ult = h.at(-1);
  return (ult?.series.find((x) => !x.calibracao) ?? ult?.series.at(-1))?.carga;
};

/** Carga dentro do que o local tem: halteres, kettlebell e caneleira pela lista do inventário (o maior até a carga). */
export function noInventario(c: Carga, o: OpcoesCarga): { carga: Carga; ajustada: boolean } {
  const lista = o.lista ?? [];
  if (c.tipo !== 'kg' || !lista.length || lista.some((k) => Math.abs(k - c.kg) < 1e-9)) return { carga: c, ajustada: false };
  const k = [...lista].reverse().find((x) => x <= c.kg) ?? lista[0]!;
  return { carga: { tipo: 'kg', kg: k }, ajustada: true };
}

/** Texto da 1ª vez (progressao.troca-equivalente): nunca mostra a carga do exercício antigo como número. */
export function textoPrimeiraVez(historico: Sessao[], exId: string, local?: LocalDaCarga): string {
  const comeco = 'comece com uma carga que pareça fácil; a 1ª série acerta a carga.';
  if (local && cargaDaMaquina(exId) && historicoDoExercicio(historico, exId).length)
    return `1ª vez nesta máquina neste local (a carga de outra máquina não vale aqui): ${comeco}`;
  const funcoes = funcoesDoExercicio(exId);
  const feito = [...historico]
    .reverse()
    .flatMap((s) => s.exercicios)
    .find((e) => e.exId !== exId && e.series.length > 0 && funcoes.some((f) => f.niveis.some((n) => n.includes(e.exId))));
  if (feito) return `Você já faz ${(POR_ID[feito.exId]?.nome ?? '').toLowerCase()}; aqui é a 1ª vez: ${comeco}`;
  return `1ª vez neste exercício: ${comeco}`;
}

/**
 * Sugestão para a próxima sessão do exercício, com o alvo da prescrição (decisão 9). Na 1ª vez (e na 1ª vez de uma
 * máquina num local), a calibração na 1ª série (progressao.calibracao); depois, a dupla progressão, só com as séries
 * de trabalho. A dor manda antes de tudo (seguranca.dor.escala).
 */
export function sugestaoDoExercicio(
  historico: Sessao[],
  x: Pick<ExercicioPrescrito, 'exId' | 'reps' | 'rir'>,
  inventario: Inventario,
  opcoes: OpcoesSugestao = {},
): Sugestao {
  const op = opcoesCarga(x.exId, inventario);
  // Registro por degrau: um "0 kg" antigo (antes do achado 7 da auditoria) vale como o 1º degrau.
  const deDegrau = (s: SessaoExercicio): SessaoExercicio => ({
    series: s.series.map((y) => (y.carga.tipo === 'kg' && y.carga.kg === 0 ? { ...y, carga: { tipo: 'degrau', degrau: 0 } } : y)),
  });
  const hist = (filtro?: FiltroHistorico) => {
    const lido = historicoDoExercicio(historico, x.exId, opcoes.local, filtro);
    return op.registro === 'degrau' ? lido.map(deDegrau) : lido;
  };
  const h = hist();
  const alvo: Alvo = { reps: x.reps, rir: x.rir };
  const ultima = h.at(-1);
  // A dor manda antes de tudo (seguranca.dor.escala), em qualquer semana.
  if (ultima?.series.some((s) => (s.dor ?? 0) >= 3)) return sugerirProgressao(h, alvo, op);
  if (emCalibracao(h)) {
    const s = ultima?.series.at(-1);
    if (!s) return { acao: 'calibrar', motivo: textoPrimeiraVez(historico, x.exId, opcoes.local), regraId: r('progressao.calibracao') };
    const fim = fimDaCalibracao(acertosDe(h), alvo);
    if (fim) return { acao: 'manter', proxima: noInventario(fim.proxima, op).carga, motivo: fim.motivo, regraId: fim.regraId };
    const c = calibrar(s, alvo, op, { soDesce: opcoes.soDesce });
    const prox = noInventario(c.proxima, op).carga;
    return { acao: 'calibrar', proxima: prox, motivo: `Ainda calibrando: comece por ${textoCarga(prox, x.exId)} e acerte na 1ª série.`, regraId: r('progressao.calibracao') };
  }
  const bloco = opcoes.bloco;
  const noBloco = bloco ? hist({ desde: bloco.inicio }) : h;
  // Volta de uma pausa (readaptacao.durante-uso): a 1ª vez do exercício no bloco parte da última carga, reduzida.
  if (bloco && bloco.reducao > 0 && emCalibracao(noBloco)) {
    const base = cargaDeReferencia(h);
    if (base) {
      const pct = Math.round(bloco.reducao * 100);
      const volta = noInventario(cargaDaVolta(base, bloco.reducao, op), op).carga;
      if (bloco.calibrar) {
        const s = noBloco.at(-1)?.series.at(-1);
        const fim = fimDaCalibracao(acertosDe(noBloco), alvo);
        if (fim) return { acao: 'manter', proxima: noInventario(fim.proxima, op).carga, motivo: fim.motivo, regraId: fim.regraId };
        if (s) {
          const c = calibrar(s, alvo, op, { soDesce: opcoes.soDesce });
          const prox = noInventario(c.proxima, op).carga;
          return { acao: 'calibrar', proxima: prox, motivo: `Ainda calibrando: comece por ${textoCarga(prox, x.exId)} e acerte na 1ª série.`, regraId: r('progressao.calibracao') };
        }
        return {
          acao: 'calibrar',
          proxima: volta,
          motivo: `Última vez: ${textoCarga(base, x.exId)}. Depois de uma pausa longa, a 1ª série acerta a carga, começando ${pct}% abaixo.`,
          regraId: r('readaptacao.durante-uso'),
        };
      }
      return {
        acao: 'reduzir',
        proxima: volta,
        motivo: `Última vez: ${textoCarga(base, x.exId)}. Volta da pausa: ${pct}% mais leve, para o corpo se readaptar sem dor.`,
        regraId: r('readaptacao.semana1'),
      };
    }
  }
  // Semana leve (deload.semana-leve): a mesma carga da última vez, com menos séries e mais reserva.
  if (opcoes.semanaLeve) {
    const base = cargaDeReferencia(noBloco);
    return { acao: 'manter', ...(base ? { proxima: base } : {}), motivo: 'Semana leve: a mesma carga, com menos séries e mais reserva.', regraId: r('deload.semana-leve') };
  }
  const trabalho = semCalibracao(bloco ? hist({ desde: bloco.inicio, semLeve: true }) : hist({ semLeve: true }));
  const sug = sugerirProgressao(trabalho.length ? trabalho : semCalibracao(noBloco), alvo, op);
  // Na fase de aprendizado, a carga sobe quando a técnica estiver estável: nada de "estagnado" (R5a).
  if (sug.acao === 'estagnado' && opcoes.aprendizado)
    return { acao: 'manter', motivo: 'Fase de aprendizado: mantenha a carga e busque +1 repetição com a técnica firme.', regraId: r('iniciante.fase-aprendizado') };
  if (!sug.proxima) return sug;
  const { carga, ajustada } = noInventario(sug.proxima, op);
  return ajustada ? { ...sug, proxima: carga, motivo: `${sug.motivo} Aqui, o peso mais perto é ${textoCarga(carga, x.exId)}.` } : sug;
}

/**
 * Durante o treino: o exercício está em calibração enquanto não houver uma série de trabalho, nem no histórico (desta
 * chave de local) nem nesta sessão. Devolve o resultado da última série de acerto, para pré-preencher a próxima.
 */
export function calibracaoNaSessao(
  historico: Sessao[],
  x: Pick<ExercicioPrescrito, 'exId' | 'reps' | 'rir'>,
  inventario: Inventario,
  seriesDaSessao: SerieRegistrada[],
  opcoes: OpcoesSugestao = {},
): { calibrando: boolean; ultima?: ResultadoCalibracao; /** A calibração terminou pela saída (R5a): `ultima` traz a carga escolhida. */ fim?: boolean } {
  const h = historicoDoExercicio(historico, x.exId, opcoes.local);
  // Volta de mais de 182 dias (readaptacao.durante-uso): a 1ª série acerta a carga, mesmo com histórico de antes.
  const doBloco = opcoes.bloco?.calibrar ? historicoDoExercicio(historico, x.exId, opcoes.local, { desde: opcoes.bloco.inicio }) : undefined;
  const longa = !!doBloco && emCalibracao(doBloco);
  const calibrando = (emCalibracao(h) || longa) && !seriesDaSessao.some((s) => !s.calibracao);
  // A saída da calibração (progressao.calibracao; R5a): 3 séries de acerto, somando o histórico e a sessão.
  if (calibrando) {
    const fim = fimDaCalibracao([...acertosDe(longa ? doBloco! : h), ...seriesDaSessao.filter((s) => s.calibracao)], x);
    if (fim) return { calibrando: false, fim: true, ultima: { ...fim, proxima: noInventario(fim.proxima, opcoesCarga(x.exId, inventario)).carga } };
  }
  const s = seriesDaSessao.at(-1);
  if (!calibrando || !s) return { calibrando };
  return { calibrando, ultima: avaliarSerieDeCalibracao(s, x, inventario, opcoes) };
}

/** As séries de acerto da calibração de um histórico (progressao.calibracao). */
const acertosDe = (h: SessaoExercicio[]) => h.flatMap((e) => e.series.filter((s) => s.calibracao));

/** Avalia uma série feita em calibração: a próxima carga e se ela já caiu perto do alvo (vira série de trabalho). */
export function avaliarSerieDeCalibracao(
  s: Pick<SerieRegistrada, 'carga' | 'reps' | 'rir'>,
  x: Pick<ExercicioPrescrito, 'exId' | 'reps' | 'rir'>,
  inventario: Inventario,
  opcoes: OpcoesSugestao = {},
): ResultadoCalibracao {
  const op = opcoesCarga(x.exId, inventario);
  const c = calibrar(s, { reps: x.reps, rir: x.rir }, op, { soDesce: opcoes.soDesce });
  return { ...c, proxima: noInventario(c.proxima, op).carga };
}

/** Semana 1 de uma volta de pausa (readaptacao.semana1): a calibração não sobe a carga. */
export const soDesceNaSemana = (p: Programa, semana: number, fases: Fase[] = p.fases) => faseDaSemana(p, semana, fases)?.regraId === 'readaptacao.semana1';

/** Lembrete de aquecimento antes do primeiro multiarticular de cada região (tempo.aquecimento; decisão 10). */
export function precisaAquecer(dia: DiaPrograma, indice: number): boolean {
  const INFERIORES = ['quadriceps', 'posteriores', 'gluteos', 'panturrilha'];
  const regiao = (x: ExercicioPrescrito) => (POR_ID[x.exId]?.musculos.primarios.some((m) => INFERIORES.includes(m)) ? 'inf' : 'sup');
  const x = dia.exercicios[indice];
  if (!x || x.tipo !== 'composto') return false;
  return !dia.exercicios.slice(0, indice).some((y) => y.tipo === 'composto' && regiao(y) === regiao(x));
}

export const REGRA_AQUECIMENTO = r('tempo.aquecimento');

/** Resumo de uma sessão terminada: séries feitas e efetivas por exercício. */
export function resumoSessao(s: Sessao) {
  const series = s.exercicios.flatMap((e) => e.series);
  return {
    exercicios: s.exercicios.filter((e) => e.series.length > 0).length,
    series: series.length,
    efetivas: series.filter((x) => x.rir <= 4 && x.amplitudeCompleta !== false).length,
    minutos: s.fim ? Math.max(1, Math.round((Date.parse(s.fim) - Date.parse(s.inicio)) / 60_000)) : undefined,
  };
}

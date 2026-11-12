import { BIBLIOTECA, type Exercicio, type Musculo } from '../biblioteca';
import { ehAvisoDeMeta, MUSCULOS_COM_META, musculosDoAviso, NOME_MUSCULO, SEM_EXERCICIO, seriesDeVolume, volumePorMusculo, type DiaPrograma, type Programa } from '../gerador';
import { serieEfetiva } from '../progressao';
import { r, VOLUME } from '../regras';
import { diaLocal, hojeNoPrograma, proximoDia, segundaDaSemana, semanaLocal, treinoFeito, type Sessao } from '../sessao';

// "A sua semana" (acompanhamento.semana e acompanhamento.mensagens; pesquisa-v2/07, seção 4): registro + meta + retorno.
// Treinos feitos × planejados de segunda a domingo, em qualquer local; séries efetivas por músculo contra a meta da
// semana; "X das últimas 8 semanas com treino"; e mensagens sem culpa, com a revisão da meta (decisão 5 do T6).

const POR_ID: Record<string, Exercicio> = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));

export type EstadoMusculo = 'na-meta' | 'crescendo' | 'mantendo' | 'sem-treino';
export const TEXTO_ESTADO: Record<EstadoMusculo, string> = {
  'na-meta': 'na meta',
  crescendo: 'crescendo',
  mantendo: 'mantendo',
  'sem-treino': 'ainda não treinou nesta semana',
};

export type MusculoNaSemana = {
  musculo: Musculo;
  nome: string;
  feitas: number;
  meta: number;
  estado: EstadoMusculo;
  /**
   * R5b (c-fluxo.md, pedido ao domínio 7): quando o programa planeja menos que a meta do nível, quanto ele planeja e o
   * motivo ("falta tempo"), para a semana não cobrar uma meta que o programa não tem.
   */
  planejado?: number;
  motivo?: string;
};

export type ResumoDaSemana = {
  /** Segunda e domingo da semana (AAAA-MM-DD, no calendário local). */
  segunda: string;
  domingo: string;
  feitos: number;
  planejados: number;
  /** Os treinos da semana, na ordem: o dia do programa e se foi feito. */
  treinos: { diaId: string; nome: string; feito: boolean }[];
  musculos: MusculoNaSemana[];
  /** A meta é a do programa ou, na volta, no aprendizado e na semana leve, a prescrita naquela semana. */
  metaPrescrita: boolean;
  /** Semanas com treino na janela (até 8), da mais antiga à mais recente. */
  semanas: boolean[];
  comTreino: number;
  mensagem: string;
  /** Revisão da meta: um programa com menos dias, oferecido (nunca aplicado) depois de 3 de 4 semanas abaixo. */
  revisao?: { media: number; opcoes: number[]; texto: string; regraId: string };
  regraId: string;
};

const dataLocal = (dia: number) => new Date(dia * 86_400_000).toISOString().slice(0, 10);

/** Séries efetivas por músculo de um conjunto de sessões: só as efetivas, a indireta vale 0,5, o drop set conta 2. */
export function seriesEfetivas(sessoes: Sessao[]): Partial<Record<Musculo, number>> {
  const lista = sessoes.flatMap((s) =>
    s.exercicios.flatMap((e) => {
      const ex = POR_ID[e.exId];
      if (!ex) return [];
      // rir.serie-efetiva: RIR ≤ 4 e amplitude completa, inclusive as de acerto da calibração (decisão do Gustavo, 02/11).
      const n = e.series.filter(serieEfetiva).reduce((t, x) => t + seriesDeVolume({ series: 1, dropSet: !!x.quedas?.length }), 0);
      return n ? [{ ex, series: n }] : [];
    }),
  );
  return volumePorMusculo(lista);
}

/** O estado de um músculo na semana (4 estados, sem vermelho). */
export function estadoDoMusculo(feitas: number, meta: number): EstadoMusculo {
  if (feitas <= 0) return 'sem-treino';
  if (feitas >= meta) return 'na-meta';
  if (feitas >= VOLUME.minimoEficazPiso) return 'crescendo';
  return 'mantendo';
}

const juntar = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}`);
const maiuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export type OpcoesSemana = {
  fusoMin?: number;
  /** Dias de treino planejados por semana (rotina.diasSemana). */
  planejados: number;
  semanaLeve?: { inicio: string; encerradaEm?: string };
  /** Quando a pessoa respondeu "Manter" à revisão da meta: a oferta some por 4 semanas. */
  revisaoRespondidaEm?: string;
};

/** "A sua semana" de hoje. */
export function resumoDaSemana(programa: Programa, historico: Sessao[], hojeIso: string, o: OpcoesSemana): ResumoDaSemana {
  const fuso = o.fusoMin ?? 0;
  const hojeDia = diaLocal(hojeIso, fuso);
  const semanaHoje = semanaLocal(hojeDia);
  const treinos = historico.filter(treinoFeito);
  const daSemana = (w: number) => treinos.filter((s) => semanaLocal(diaLocal(s.inicio, fuso)) === w);
  const destaSemana = daSemana(semanaHoje);

  // A meta da semana: a do programa; na volta, no aprendizado e na semana leve, o que foi prescrito nesta semana.
  const hoje = hojeNoPrograma(programa, historico, hojeIso, { fusoMin: fuso, ...(o.semanaLeve ? { semanaLeve: o.semanaLeve } : {}) });
  const metaPrescrita = !!hoje.fase && hoje.fase.fatorSeries < 1;
  const prescrito = metaPrescrita ? volumePrescrito(hoje.dias) : {};
  const feitas = seriesEfetivas(destaSemana);
  const musculos = MUSCULOS_COM_META.flatMap((m): MusculoNaSemana[] => {
    const meta = metaPrescrita ? (prescrito[m] ?? 0) : (programa.metas[m] ?? 0);
    if (meta <= 0) return [];
    const f = Math.round((feitas[m] ?? 0) * 10) / 10;
    const planejado = programa.volumeSemanal[m] ?? 0;
    const abaixo = !metaPrescrita && planejado < meta - 1e-9;
    return [
      {
        musculo: m,
        nome: NOME_MUSCULO[m],
        feitas: f,
        meta: Math.round(meta * 10) / 10,
        estado: estadoDoMusculo(f, meta),
        ...(abaixo ? { planejado: Math.round(planejado * 10) / 10, motivo: motivoDaMeta(programa, m) } : {}),
      },
    ];
  });

  // Os treinos da semana: os feitos, na ordem, e depois os que faltam na rotação.
  const feitos = destaSemana.length;
  const nomes = Object.fromEntries(programa.dias.map((d) => [d.id, d.nome]));
  const lista: ResumoDaSemana['treinos'] = destaSemana.map((s) => ({ diaId: s.diaId, nome: nomes[s.diaId] ?? s.diaId, feito: true }));
  // Os que faltam seguem a rotação a partir do próximo (registro.treino-feito: só conta o treino com série).
  let k = programa.dias.findIndex((d) => d.id === proximoDia(programa, historico).id);
  while (lista.length < o.planejados) {
    const p = programa.dias[k % programa.dias.length]!;
    lista.push({ diaId: p.id, nome: p.nome, feito: false });
    k++;
  }

  // Semanas com treino: as 8 últimas; a de hoje só entra quando tem treino (o número não cai no meio da semana).
  const primeira = treinos[0] ? semanaLocal(diaLocal(treinos[0].inicio, fuso)) : semanaHoje;
  const ultimaDaJanela = destaSemana.length ? semanaHoje : semanaHoje - 1;
  const desde = Math.max(primeira, ultimaDaJanela - 7);
  const semanas: boolean[] = [];
  for (let w = desde; w <= ultimaDaJanela; w++) semanas.push(daSemana(w).length > 0);

  const proximo = proximoDia(programa, historico);
  const domingo = hojeDia === segundaDaSemana(semanaHoje) + 6;
  const quando = domingo ? 'cabe hoje' : 'cabe até domingo';
  let mensagem: string;
  if (feitos >= o.planejados) {
    const naMeta = musculos.filter((m) => m.estado === 'na-meta').map((m) => m.nome);
    const todos = naMeta.length === musculos.length && musculos.length > 0;
    mensagem = `Semana completa: ${feitos} de ${o.planejados}.${todos ? ' Todos os músculos na meta.' : naMeta.length ? ` ${maiuscula(juntar(naMeta.slice(0, 3)))} na meta.` : ''}`;
  } else if (feitos === 0) mensagem = `Nova semana. O próximo treino é o ${proximo.nome}.`;
  else if (feitos === 1) mensagem = `1 treino nesta semana. Já conta: um treino por semana mantém o que você ganhou. Se der, o ${proximo.nome} ${quando}.`;
  else mensagem = `${feitos} de ${o.planejados} treinos. Se der, o ${proximo.nome} ${quando}.`;

  const revisao = revisaoDaMeta(treinos, semanaHoje, primeira, o, daSemana, hojeIso);
  return {
    segunda: dataLocal(segundaDaSemana(semanaHoje)),
    domingo: dataLocal(segundaDaSemana(semanaHoje) + 6),
    feitos,
    planejados: o.planejados,
    treinos: lista,
    musculos,
    metaPrescrita,
    semanas,
    comTreino: semanas.filter(Boolean).length,
    mensagem,
    ...(revisao ? { revisao } : {}),
    regraId: r('acompanhamento.semana'),
  };
}

/**
 * O motivo curto de o programa planejar menos que a meta de um músculo, lido dos avisos de meta do programa (o mesmo
 * motivo que "Sobre o programa" explica por extenso).
 */
export function motivoDaMeta(programa: Programa, m: Musculo): string {
  const aviso = programa.avisos.find((a) => (ehAvisoDeMeta(a) || a.regraId === 'tempo.corte' || a.regraId === 'volume.prioridade.competicao') && musculosDoAviso(a).includes(m));
  if (!aviso) return 'não coube mais nos seus dias';
  if (/por causa da dor|a dor .* tirou/.test(aviso.texto)) return 'por causa da dor';
  if (aviso.texto.startsWith(SEM_EXERCICIO) || aviso.regraId === 'equipamento.sem-ancoragem') return 'sem exercício no seu equipamento';
  if (aviso.regraId === 'volume.prioridade.competicao') return 'os seus focos dividem o tempo';
  if (aviso.regraId === 'tempo.corte' || /Com \d+ min cabem/.test(aviso.texto)) return 'falta tempo';
  if (/A divisão/.test(aviso.texto)) return 'a divisão não tem mais lugar';
  return 'não coube mais nos seus dias';
}

/** Volume prescrito na semana, por músculo (a meta da semana na volta, no aprendizado e na semana leve). */
function volumePrescrito(dias: DiaPrograma[]): Partial<Record<Musculo, number>> {
  return volumePorMusculo(dias.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID[x.exId]!, series: seriesDeVolume(x) }))));
}

/**
 * Revisão da meta (acompanhamento.mensagens; decisão 5 do T6): nas 4 últimas semanas completas, 3 ou mais abaixo do
 * planejado → oferece um programa com menos dias. Só oferece; nada muda sem a escolha da pessoa. "Manter" esconde a
 * oferta por 4 semanas.
 */
function revisaoDaMeta(
  treinos: Sessao[],
  semanaHoje: number,
  primeira: number,
  o: OpcoesSemana,
  daSemana: (w: number) => Sessao[],
  hojeIso: string,
): ResumoDaSemana['revisao'] | undefined {
  if (!treinos.length || semanaHoje - 4 < primeira || o.planejados <= 2) return undefined;
  if (o.revisaoRespondidaEm && diaLocal(hojeIso, o.fusoMin) - diaLocal(o.revisaoRespondidaEm, o.fusoMin) < 28) return undefined;
  const ultimas = [1, 2, 3, 4].map((k) => daSemana(semanaHoje - k).length);
  // A semana sem nenhum treino é pausa, não uma semana "abaixo do planejado": quem cuida dela é a volta da pausa
  // (readaptacao.durante-uso). Antes, 4 semanas paradas ofereciam menos dias com "cerca de 1 vez por semana".
  const comTreino = ultimas.filter((n) => n > 0);
  if (comTreino.filter((n) => n < o.planejados).length < 3) return undefined;
  const media = comTreino.reduce((t, n) => t + n, 0) / comTreino.length;
  const lo = Math.max(2, Math.floor(media));
  const hi = o.planejados - 1;
  if (lo > hi) return undefined;
  const opcoes = [...new Set([lo, Math.min(lo + 1, hi)])];
  const vezes = Math.max(1, Math.floor(media));
  const quando = comTreino.length === ultimas.length ? `Nas últimas ${ultimas.length} semanas você treinou cerca de ${vezes} ${vezes === 1 ? 'vez' : 'vezes'} por semana.` : `Nas semanas em que treinou, das últimas ${ultimas.length}, você fez cerca de ${vezes} ${vezes === 1 ? 'treino' : 'treinos'} por semana.`;
  return {
    media,
    opcoes,
    texto: `${quando} Quer um programa de ${juntar(opcoes.map(String)).replace(' e ', ' ou ')} dias? Ele cabe melhor e rende o mesmo por treino.`,
    regraId: r('acompanhamento.mensagens'),
  };
}

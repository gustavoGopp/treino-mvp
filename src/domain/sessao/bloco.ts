import { aplicarFase, faseNaSemana, fasesDeReadaptacao, type DiaPrograma, type Fase, type Programa } from '../gerador';
import { r, READAPTACAO, SEMANA_LEVE } from '../regras';
import type { Sessao } from './index';

// Pausas detectadas sozinhas e a semana do programa (readaptacao.durante-uso; pesquisa-v2/07, seção 3).
// Tudo sai do histórico e da data de hoje, que quem chama passa (nada aqui lê o relógio). O fuso entra como número
// (minutos somados ao UTC; Brasília é −180) para que a semana de segunda a domingo seja a do calendário da pessoa.

const DIA_MS = 86_400_000;

/** Dia do calendário local: dias desde 01/01/1970 no fuso da pessoa. */
export const diaLocal = (iso: string, fusoMin = 0) => Math.floor((Date.parse(iso) + fusoMin * 60_000) / DIA_MS);
/** Semana do calendário (segunda a domingo) de um dia local. 01/01/1970 foi uma quinta-feira. */
export const semanaLocal = (dia: number) => Math.floor((dia + 3) / 7);
/** Dia local da segunda-feira de uma semana. */
export const segundaDaSemana = (semana: number) => semana * 7 - 3;

/** Um treino que conta: sessão terminada com pelo menos 1 série registrada. */
export const treinoFeito = (s: Sessao) => !!s.fim && s.exercicios.some((e) => e.series.length > 0);

export type FaixaPausa = 'normal' | 'rir+1' | 'volta' | 'refazer-nivel';

/** O que a pausa pede, pelos dias sem treinar (readaptacao.durante-uso). */
export function faixaDaPausa(dias: number): { faixa: FaixaPausa; reducao: number } {
  const d = READAPTACAO.duranteUso;
  if (dias <= d.normalAte) return { faixa: 'normal', reducao: 0 };
  if (dias <= d.rirMais1Ate) return { faixa: 'rir+1', reducao: 0 };
  if (dias <= d.voltaMenorAte) return { faixa: 'volta', reducao: d.reducaoAte56 };
  if (dias <= d.voltaMaiorAte) return { faixa: 'volta', reducao: d.reducaoAte182 };
  return { faixa: 'refazer-nivel', reducao: d.reducaoRefazer };
}

/** Dias sem treinar até hoje: do fim do último treino feito (em qualquer local) até hoje, no calendário local. */
export function diasSemTreino(historico: Sessao[], hojeIso: string, fusoMin = 0): number | undefined {
  const ultima = historico.filter(treinoFeito).at(-1);
  return ultima ? diaLocal(hojeIso, fusoMin) - diaLocal(ultima.fim!, fusoMin) : undefined;
}

export type Bloco = {
  /** Início do bloco: a 1ª sessão dele, ou hoje, quando uma pausa abriu o bloco e ainda não houve treino. */
  inicio: string;
  /** Dias da pausa que abriu o bloco (21 ou mais). Ausente no 1º bloco. */
  pausaDias?: number;
  /** Redução da carga da volta (0 no 1º bloco). */
  reducao: number;
  /** Mais de 182 dias: a 1ª série acerta a carga, a partir da última −20%. */
  calibrar: boolean;
  /** Treinos feitos do bloco, do mais antigo ao mais recente. */
  treinos: Sessao[];
};

/**
 * O bloco de hoje. O 1º bloco começa na 1ª sessão; cada pausa de 21 dias ou mais (entre dois treinos, ou do último
 * treino até hoje) abre um bloco novo, com a volta gradual.
 */
export function blocoAtual(historico: Sessao[], hojeIso: string, fusoMin = 0): Bloco {
  const treinos = historico.filter(treinoFeito);
  const abre = (dias: number) => dias > READAPTACAO.duranteUso.rirMais1Ate;
  let ini = 0;
  let pausa: number | undefined;
  for (let i = 1; i < treinos.length; i++) {
    const dias = diaLocal(treinos[i]!.inicio, fusoMin) - diaLocal(treinos[i - 1]!.fim!, fusoMin);
    if (abre(dias)) {
      ini = i;
      pausa = dias;
    }
  }
  const hoje = diasSemTreino(historico, hojeIso, fusoMin);
  const bloco = (inicio: string, dias: number | undefined, lista: Sessao[]): Bloco => {
    if (dias === undefined) return { inicio, reducao: 0, calibrar: false, treinos: lista };
    const f = faixaDaPausa(dias);
    return { inicio, pausaDias: dias, reducao: f.reducao, calibrar: f.faixa === 'refazer-nivel', treinos: lista };
  };
  if (hoje !== undefined && abre(hoje)) return bloco(hojeIso, hoje, []);
  const lista = treinos.slice(ini);
  return bloco(lista[0]?.inicio ?? hojeIso, pausa, lista);
}

/**
 * Semana do programa (readaptacao.durante-uso; decisão 3 do T6): as semanas de segunda a domingo com treino desde o
 * início do bloco, contando a de hoje. Uma semana sem treino não avança o programa.
 */
export function semanaNoBloco(bloco: Bloco, hojeIso: string, fusoMin = 0): number {
  const hoje = semanaLocal(diaLocal(hojeIso, fusoMin));
  const antes = new Set(bloco.treinos.map((s) => semanaLocal(diaLocal(s.inicio, fusoMin))).filter((w) => w < hoje));
  return antes.size + 1;
}

/** As fases do bloco: no 1º, as do programa (a pausa dita no cadastro); num bloco aberto por pausa, a volta gradual. */
export const fasesDoBloco = (programa: Programa, bloco: Bloco): Fase[] =>
  bloco.pausaDias === undefined ? programa.fases : fasesDeReadaptacao({ reducao: bloco.reducao, calibrar: bloco.calibrar });

/** A fase da semana leve (deload.semana-leve): metade das séries, RIR 3–4, carga mantida. */
export const FASE_SEMANA_LEVE: Fase = {
  semanas: 'leve',
  fatorSeries: SEMANA_LEVE.fatorSeries,
  rir: SEMANA_LEVE.rir,
  texto: 'Semana leve: cerca de metade das séries, RIR 3–4 e a mesma carga. Para descansar, não para crescer.',
  regraId: r('deload.semana-leve'),
};

/** A semana leve aceita vale por 7 dias a partir do aceite (decisão do Gustavo, 02/11/2026). */
export const semanaLeveAtiva = (semanaLeve: { inicio: string } | undefined, hojeIso: string, fusoMin = 0) => {
  if (!semanaLeve) return false;
  const d = diaLocal(hojeIso, fusoMin) - diaLocal(semanaLeve.inicio, fusoMin);
  return d >= 0 && d < SEMANA_LEVE.dias;
};

/** RIR +1 (até 4) numa prescrição: a 1ª sessão de cada dia depois de uma pausa de 14 a 20 dias. */
export const comRirMais1 = (d: DiaPrograma): DiaPrograma => ({
  ...d,
  exercicios: d.exercicios.map((x) => ({ ...x, rir: [Math.min(4, x.rir[0] + 1), Math.min(4, x.rir[1] + 1)] as [number, number] })),
});

/**
 * Dias do programa que levam RIR +1 hoje: depois da última pausa de 14 a 20 dias do bloco (ou, no 1º bloco, da pausa
 * de 2 semanas dita no cadastro), os dias que ainda não foram feitos desde então.
 */
function diasComRirMais1(programa: Programa, historico: Sessao[], bloco: Bloco, hojeIso: string, fusoMin: number): string[] {
  const d = READAPTACAO.duranteUso;
  const media = (dias: number) => dias > d.normalAte && dias <= d.rirMais1Ate;
  let desde: number | undefined;
  if (bloco.pausaDias === undefined && programa.fases.some((f) => f.regraId === 'readaptacao.gatilho')) desde = 0;
  const t = bloco.treinos;
  for (let i = 1; i < t.length; i++) if (media(diaLocal(t[i]!.inicio, fusoMin) - diaLocal(t[i - 1]!.fim!, fusoMin))) desde = i;
  const hoje = diasSemTreino(historico, hojeIso, fusoMin);
  if (hoje !== undefined && media(hoje)) desde = t.length;
  if (desde === undefined) return [];
  const feitos = new Set(t.slice(desde).map((s) => s.diaId));
  return programa.dias.map((x) => x.id).filter((id) => !feitos.has(id));
}

export type Hoje = {
  /** Dias desde o último treino (ausente sem histórico). */
  diasSemTreino?: number;
  faixa?: FaixaPausa;
  bloco: Bloco;
  semana: number;
  /** A fase que vale hoje (a da semana do bloco, ou a semana leve). */
  fase?: Fase;
  semanaLeve: boolean;
  /** Dias do programa com RIR +1 hoje (pausa de 14 a 20 dias). */
  rirMais1: string[];
  /** O programa com a prescrição de hoje. */
  dias: DiaPrograma[];
};

/**
 * A prescrição de hoje: o bloco, a semana do bloco, a fase (volta gradual, aprendizado ou semana leve) e o RIR +1 da
 * 1ª sessão de cada dia depois de uma pausa de 14 a 20 dias.
 */
export function hojeNoPrograma(
  programa: Programa,
  historico: Sessao[],
  hojeIso: string,
  opcoes: { fusoMin?: number; semanaLeve?: { inicio: string } } = {},
): Hoje {
  const fuso = opcoes.fusoMin ?? 0;
  const bloco = blocoAtual(historico, hojeIso, fuso);
  const semana = semanaNoBloco(bloco, hojeIso, fuso);
  const daSemana = faseNaSemana(fasesDoBloco(programa, bloco), semana);
  const leve = semanaLeveAtiva(opcoes.semanaLeve, hojeIso, fuso);
  // A semana leve não deixa mais pesado do que a semana já está (por exemplo, a semana 1 de uma volta).
  const fase = leve && !(daSemana && daSemana.fatorSeries <= SEMANA_LEVE.fatorSeries) ? FASE_SEMANA_LEVE : daSemana;
  const rirMais1 = diasComRirMais1(programa, historico, bloco, hojeIso, fuso);
  const dias = aplicarFase(programa.dias, fase).map((d) => (rirMais1.includes(d.id) ? comRirMais1(d) : d));
  const dst = diasSemTreino(historico, hojeIso, fuso);
  return {
    ...(dst !== undefined ? { diasSemTreino: dst, faixa: faixaDaPausa(dst).faixa } : {}),
    bloco,
    semana,
    ...(fase ? { fase } : {}),
    semanaLeve: fase === FASE_SEMANA_LEVE,
    rirMais1,
    dias,
  };
}

/**
 * A prescrição de uma sessão (em andamento ou terminada), refeita com o histórico de antes dela e a data em que ela
 * começou: a mesma conta do dia em que foi iniciada.
 */
export function hojeDaSessao(programa: Programa, historico: Sessao[], s: Pick<Sessao, 'id' | 'inicio' | 'semanaLeve'>, fusoMin = 0): Hoje {
  const antes = historico.filter((x) => x.id !== s.id && Date.parse(x.inicio) < Date.parse(s.inicio));
  return hojeNoPrograma(programa, antes, s.inicio, { fusoMin, ...(s.semanaLeve ? { semanaLeve: { inicio: s.inicio } } : {}) });
}

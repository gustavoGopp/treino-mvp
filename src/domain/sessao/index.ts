import { BIBLIOTECA, type Exercicio } from '../biblioteca';
import { prescricaoDaSemana, type DiaPrograma, type ExercicioPrescrito, type Programa } from '../gerador';
import { ESCADA_PESO_CORPO, sugerirProgressao, type Carga, type OpcoesCarga, type SerieRegistrada, type SessaoExercicio, type Sugestao } from '../progressao';
import { r } from '../regras';
import { CAPACIDADES, cargasHalter, cargasKettlebell, ITEM_IDS, type Inventario } from '../taxonomia/equipamentos';

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
  exercicios: ExercicioFeito[];
};

const POR_ID: Record<string, Exercicio> = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));

/** Próximo dia da rotação: o seguinte ao da última sessão terminada; o primeiro se não há histórico (decisão 1). */
export function proximoDia(programa: Programa, historico: Sessao[]): DiaPrograma {
  const ultima = [...historico].reverse().find((s) => s.fim && programa.dias.some((d) => d.id === s.diaId));
  if (!ultima) return programa.dias[0]!;
  const i = programa.dias.findIndex((d) => d.id === ultima.diaId);
  return programa.dias[(i + 1) % programa.dias.length]!;
}

/** Semana do programa, contada em semanas corridas desde a primeira sessão (decisão 2). */
export function semanaDoPrograma(historico: Sessao[], hojeIso: string): number {
  const primeira = historico[0]?.inicio;
  if (!primeira) return 1;
  const dias = Math.floor((Date.parse(hojeIso) - Date.parse(primeira)) / 86_400_000);
  return Math.max(1, Math.floor(dias / 7) + 1);
}

/** O dia com séries e RIR da semana (fases de readaptação e aprendizado). */
export function diaDaSemana(programa: Programa, diaId: string, semana: number): DiaPrograma {
  return prescricaoDaSemana(programa, semana).find((d) => d.id === diaId) ?? programa.dias[0]!;
}

export type TipoCarga = Carga['tipo'];

/** Placas ou menor anilha do item que dá a capacidade do exercício (o 1º do inventário que a dá sozinho). */
function atributoDoItem(ex: Exercicio | undefined, inv: Inventario, chave: 'placas' | 'menorAnilhaKg'): number | undefined {
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
  const tipo = ex?.carga ?? 'peso-corpo';
  const placas = atributoDoItem(ex, inventario, 'placas');
  switch (tipo) {
    case 'halter':
      return { tipo, registro: 'kg', lista: cargasHalter(inventario) };
    case 'kettlebell':
      return { tipo, registro: 'kg', lista: cargasKettlebell(inventario) };
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
      return { tipo, registro: 'degrau' };
    case 'barra':
      return { tipo, registro: 'kg' };
  }
}

/** Texto da carga para a tela. */
export function textoCarga(c: Carga): string {
  if (c.tipo === 'kg') return `${c.kg.toLocaleString('pt-BR')} kg`;
  if (c.tipo === 'placa') return `placa ${c.placa}`;
  if (c.tipo === 'anilha') return `${c.kgPorLado.toLocaleString('pt-BR')} kg por lado`;
  if (c.tipo === 'contrapeso') return `contrapeso ${c.placa}`;
  return ESCADA_PESO_CORPO[c.degrau] ?? `degrau ${c.degrau + 1}`;
}

/** Histórico de um exercício (só sessões em que ele foi feito com séries), do mais antigo ao mais recente. */
export function historicoDoExercicio(historico: Sessao[], exId: string): SessaoExercicio[] {
  return historico
    .flatMap((s) => s.exercicios.filter((e) => e.exId === exId && e.series.length > 0))
    .map((e) => ({ series: e.series }));
}

/** Última série registrada de um exercício, para pré-preencher a próxima (decisão 3). */
export function ultimaSerie(historico: Sessao[], exId: string): SerieRegistrada | undefined {
  return historicoDoExercicio(historico, exId).at(-1)?.series.at(-1);
}

/** Sugestão de progressão para a próxima sessão do exercício, com o alvo da prescrição (decisão 9). */
export function sugestaoDoExercicio(historico: Sessao[], x: Pick<ExercicioPrescrito, 'exId' | 'reps' | 'rir'>, inventario: Inventario): Sugestao {
  return sugerirProgressao(historicoDoExercicio(historico, x.exId), { reps: x.reps, rir: x.rir }, opcoesCarga(x.exId, inventario));
}

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

import { valorDaCarga, type Carga, type SerieRegistrada } from '../progressao';
import { r } from '../regras';
import { cargaDaMaquina, treinoFeito, type Sessao } from '../sessao';
import { diaLocal, semanaLocal } from '../sessao/bloco';

// Evolução por exercício (acompanhamento.evolucao; pesquisa-v2/07, seção 5): a melhor série de cada sessão, com as marcas
// "subiu a carga" e "recorde". Sem carga máxima estimada: acima de ~12 repetições as fórmulas divergem 15 a 52 pontos
// de %, e o RIR relatado erra mais. A placa nas máquinas e o degrau no peso do corpo e no elástico, nunca um kg inventado.

export type Marca = 'subiu-a-carga' | 'recorde';
export type PontoDaEvolucao = {
  sessaoId: string;
  data: string;
  carga: Carga;
  reps: number;
  rir: number;
  marcas: Marca[];
  /** Sessão só com séries de acerto da calibração: aparece, mas não entra nas marcas. */
  acerto?: boolean;
};
export type LinhaDaEvolucao = {
  exId: string;
  /** Nas máquinas (placa, anilhas, contrapeso), a evolução é de um local: a placa de uma torre não vale na outra. */
  localId?: string;
  pontos: PontoDaEvolucao[];
  regraId: string;
};

/** A melhor de um conjunto de séries: a carga mais difícil e, nela, mais repetições. */
function melhor(series: SerieRegistrada[]): SerieRegistrada | undefined {
  return [...series].sort((a, b) => valorDaCarga(b.carga) - valorDaCarga(a.carga) || b.reps - a.reps)[0];
}

/** Séries que valem para a evolução: as de trabalho com amplitude completa (progressao.criterios-invalidos). */
const valida = (s: SerieRegistrada) => !s.calibracao && s.amplitudeCompleta !== false;

/**
 * A evolução de um exercício. `localDe` diz o local de cada sessão (as de antes do R1b, sem local, são do 1º). A
 * alternativa feita no lugar de outro exercício tem a sua própria evolução (o histórico é do exercício feito).
 */
export function evolucaoDoExercicio(historico: Sessao[], exId: string, localDe: (s: Sessao) => string | undefined): LinhaDaEvolucao[] {
  const porLocal = cargaDaMaquina(exId);
  const linhas = new Map<string, PontoDaEvolucao[]>();
  for (const s of historico.filter(treinoFeito)) {
    const series = s.exercicios.filter((e) => e.exId === exId).flatMap((e) => e.series);
    if (!series.length) continue;
    const chave = porLocal ? (localDe(s) ?? '') : '';
    const lista = linhas.get(chave) ?? [];
    const boas = series.filter(valida);
    const m = melhor(boas.length ? boas : series)!;
    const anteriores = lista.filter((p) => !p.acerto);
    const marcas: Marca[] = [];
    if (boas.length && anteriores.length) {
      const ult = anteriores.at(-1)!;
      const v = valorDaCarga(m.carga);
      if (v > valorDaCarga(ult.carga) + 1e-9) marcas.push('subiu-a-carga');
      else {
        // Recorde: mais repetições do que nunca com esta carga (ou com uma mais difícil).
        const antes = anteriores.filter((p) => valorDaCarga(p.carga) >= v - 1e-9);
        if (antes.length && m.reps > Math.max(...antes.map((p) => p.reps))) marcas.push('recorde');
      }
    }
    lista.push({ sessaoId: s.id, data: s.inicio, carga: m.carga, reps: m.reps, rir: m.rir, marcas, ...(boas.length ? {} : { acerto: true }) });
    linhas.set(chave, lista);
  }
  return [...linhas.entries()].map(([chave, pontos]) => ({ exId, ...(chave ? { localId: chave } : {}), pontos, regraId: r('acompanhamento.evolucao') }));
}

/** Uma marca da evolução (recorde ou subiu a carga) num exercício, para o fim do treino e a semana. */
export type MarcaDoExercicio = { exId: string; localId?: string; sessaoId: string; data: string; carga: Carga; reps: number; marcas: Marca[] };

const comMarca = (exId: string, l: LinhaDaEvolucao, p: PontoDaEvolucao): MarcaDoExercicio => ({
  exId,
  ...(l.localId ? { localId: l.localId } : {}),
  sessaoId: p.sessaoId,
  data: p.data,
  carga: p.carga,
  reps: p.reps,
  marcas: p.marcas,
});

/**
 * As marcas de uma sessão (pedido 3 do redesign; acompanhamento.evolucao): os exercícios feitos nela que tiveram
 * recorde ou subiram a carga, na ordem em que foram feitos. Usa a mesma regra da evolução de cada exercício.
 */
export function marcasDaSessao(historico: Sessao[], sessaoId: string, localDe: (s: Sessao) => string | undefined): MarcaDoExercicio[] {
  const sessao = historico.find((s) => s.id === sessaoId);
  if (!sessao) return [];
  const ids = [...new Set(sessao.exercicios.filter((e) => e.series.length).map((e) => e.exId))];
  return ids.flatMap((exId) =>
    evolucaoDoExercicio(historico, exId, localDe).flatMap((l) => l.pontos.filter((p) => p.sessaoId === sessaoId && p.marcas.length).map((p) => comMarca(exId, l, p))),
  );
}

/**
 * As marcas da semana do calendário de `hojeIso` (segunda a domingo, no fuso da pessoa): por exercício (e por local,
 * nas máquinas), a marca mais recente da semana. Do exercício feito mais recentemente ao mais antigo.
 */
export function marcasDaSemana(historico: Sessao[], hojeIso: string, fusoMin: number, localDe: (s: Sessao) => string | undefined): MarcaDoExercicio[] {
  const semana = semanaLocal(diaLocal(hojeIso, fusoMin));
  const daSemana = new Set(historico.filter((s) => treinoFeito(s) && semanaLocal(diaLocal(s.inicio, fusoMin)) === semana).map((s) => s.id));
  if (!daSemana.size) return [];
  const ordem = exerciciosComHistorico(historico.filter((s) => daSemana.has(s.id)));
  return ordem.flatMap((exId) =>
    evolucaoDoExercicio(historico, exId, localDe).flatMap((l) => {
      const p = l.pontos.filter((x) => daSemana.has(x.sessaoId) && x.marcas.length).at(-1);
      return p ? [comMarca(exId, l, p)] : [];
    }),
  );
}

/** Os exercícios com histórico, do feito mais recentemente ao mais antigo. */
export function exerciciosComHistorico(historico: Sessao[]): string[] {
  const vistos: string[] = [];
  for (const s of [...historico].reverse().filter(treinoFeito))
    for (const e of s.exercicios) if (e.series.length && !vistos.includes(e.exId)) vistos.push(e.exId);
  return vistos;
}

/**
 * Número em pt-BR para os textos do app: vírgula decimal, até 2 casas, sem depender do idioma nem da versão do
 * navegador (`toLocaleString` depende dos dois, e o domínio é determinístico). Os números do app (cargas, séries,
 * minutos) ficam abaixo de mil, então não há separador de milhar.
 */
export const numeroBr = (n: number): string => String(Math.round(n * 100) / 100).replace('.', ',');

/** Faixa em texto: "8–12" ou, com os dois iguais, "8". */
export const faixaTexto = ([a, b]: readonly [number, number]): string => (a === b ? `${a}` : `${a}–${b}`);

// Lote M3 da análise crítica (22/11/2026): a notação por extenso, para quem nunca treinou. "2 × 8–15" não se explica
// sozinho; "2 séries de 8 a 15" sim. A reserva (RIR) vira o que a pessoa faz: parar com tantas sobrando.
/** Faixa por extenso: [8, 15] → "8 a 15"; [10, 10] → "10". */
export const faixaPorExtenso = ([a, b]: readonly [number, number]): string => (a === b ? `${a}` : `${a} a ${b}`);
/** A prescrição por extenso: (2, [8, 15]) → "2 séries de 8 a 15"; (1, [6, 10]) → "1 série de 6 a 10". */
export const seriesPorExtenso = (series: number, reps: readonly [number, number]): string => `${series} ${series === 1 ? 'série' : 'séries'} de ${faixaPorExtenso(reps)}`;
/** A meta de reserva, curta: [3, 4] → "3 ou 4"; [2, 4] → "2 a 4"; [2, 2] → "2". */
export const metaPorExtenso = ([a, b]: readonly [number, number]): string => (a === b ? `${a}` : b === a + 1 ? `${a} ou ${b}` : `${a} a ${b}`);
/** A reserva pedida, em palavras: [3, 4] → "Pare com 3 ou 4 sobrando"; [0, 1] → "Pare com 1 sobrando, ou nenhuma". */
export const reservaPorExtenso = ([a, b]: readonly [number, number]): string =>
  b === 0 ? 'Vá até não sobrar nenhuma' : a === b ? `Pare com ${a} sobrando` : a === 0 && b === 1 ? 'Pare com 1 sobrando, ou nenhuma' : b === a + 1 ? `Pare com ${a} ou ${b} sobrando` : `Pare com ${a} a ${b} sobrando`;

/** Fração em porcentagem inteira: 0,15 → "15". */
export const porCento = (fracao: number): string => String(Math.round(fracao * 100));

/** Duração no relógio, para o descanso na tela: "1:45"; com os segundos zerados, "2 min". */
export const tempoNoRelogio = (seg: number): string => (seg % 60 ? `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, '0')}` : `${seg / 60} min`);

/** Duração por extenso, para uma frase: "1 min 45 s", "2 min", "45 s". */
export function tempoPorExtenso(seg: number): string {
  const min = Math.floor(seg / 60);
  const s = Math.round(seg % 60);
  return [min ? `${min} min` : '', s ? `${s} s` : ''].filter(Boolean).join(' ') || '0 s';
}

/** Dia e mês de uma data ISO, sem depender do fuso nem do idioma: "2026-11-12T…" → "12/11". */
export const diaEMes = (iso: string): string => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;

/**
 * A reserva registrada, como a tela mostra: a última opção do registro vale "esse número ou mais" (`maximo`, de
 * RIR.registroMax), e aparece como "4+" em todo lugar (antes, o treino dizia "4+" e a evolução, "4").
 */
export const textoDoRir = (rir: number, maximo: number): string => (rir >= maximo ? `${maximo}+` : String(rir));


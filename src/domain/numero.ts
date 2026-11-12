/**
 * Número em pt-BR para os textos do app: vírgula decimal, até 2 casas, sem depender do idioma nem da versão do
 * navegador (`toLocaleString` depende dos dois, e o domínio é determinístico). Os números do app (cargas, séries,
 * minutos) ficam abaixo de mil, então não há separador de milhar.
 */
export const numeroBr = (n: number): string => String(Math.round(n * 100) / 100).replace('.', ',');

/** Faixa em texto: "8–12" ou, com os dois iguais, "8". */
export const faixaTexto = ([a, b]: readonly [number, number]): string => (a === b ? `${a}` : `${a}–${b}`);

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

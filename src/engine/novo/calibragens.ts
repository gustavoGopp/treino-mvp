// As calibrações demoradas do corpo no aparelho (onde a bacia assenta no banco inclinado, quanto o quadril dobra para
// o halter chegar à canela, e outras): cada uma é uma conta de tentativa e erro com centenas ou milhares de poses, que
// sempre dá o mesmo resultado para o mesmo corpo. Para o corpo do app elas já vêm calculadas, no arquivo de cada
// exercício (./preparo.ts); o que não estiver guardado é calculado na hora, com o mesmo resultado.
import { calibragemGuardada } from './preparo';
import type { Corpo } from './tabelas';

const calculadas = new Map<string, unknown>();
/** Só para o script: as calibrações pedidas desde a última limpeza (para saber quais cada exercício usa). */
const pedidas = new Set<string>();

/**
 * O resultado de uma calibração: o guardado, se houver; senão, o calculado agora. `chave` diz qual é (única no motor);
 * o resultado tem de ser só números, textos, listas e objetos simples, e quem recebe não pode alterá-lo.
 */
export function calibragem<T>(corpo: Corpo, chave: string, calcular: () => T): T {
  const k = `${corpo.id}|${chave}`;
  pedidas.add(k);
  const guardada = calibragemGuardada(k);
  if (guardada) return guardada.v as T;
  if (calculadas.has(k)) return calculadas.get(k) as T;
  const v = calcular();
  calculadas.set(k, v);
  return v;
}
/** Só para o script que grava e confere: as calibrações pedidas desde a última chamada, com o valor calculado de cada uma. */
export function calibragensPedidas(): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of [...pedidas].sort()) out[k] = calculadas.get(k);
  pedidas.clear();
  return out;
}

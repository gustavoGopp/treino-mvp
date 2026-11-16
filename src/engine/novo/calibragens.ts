// As calibrações demoradas do corpo no aparelho (onde a bacia assenta no banco inclinado, quanto o quadril dobra para
// o halter chegar à canela, e outras): cada uma é uma conta de tentativa e erro com milhares de poses, que sempre dá o
// mesmo resultado para o mesmo corpo. Elas já vêm calculadas (./dados/calibragens.gerado.json, feito por
// scripts/animacao-nova/preparo.mjs, que também confere se o guardado é igual ao calculado). O que não estiver na
// tabela (outro corpo, uma calibração nova) é calculado na hora, com o mesmo resultado.
import GUARDADAS from './dados/calibragens.gerado.json';
import type { Corpo } from './tabelas';

const guardadas = GUARDADAS as unknown as Record<string, unknown>;
let usar = true;
const calculadas = new Map<string, unknown>();

/**
 * O resultado de uma calibração: o guardado, se houver; senão, o calculado agora. `chave` diz qual é (única no motor);
 * o resultado tem de ser só números, textos, listas e objetos simples, e quem recebe não pode alterá-lo.
 */
export function calibragem<T>(corpo: Corpo, chave: string, calcular: () => T): T {
  const k = `${corpo.id}|${chave}`;
  if (usar && k in guardadas) return guardadas[k] as T;
  if (calculadas.has(k)) return calculadas.get(k) as T;
  const v = calcular();
  calculadas.set(k, v);
  return v;
}
/** Só para o script que grava e confere a tabela: desliga o uso do que está guardado. */
export function usarCalibragensGuardadas(sim: boolean): void {
  usar = sim;
}
/** Só para o script: o que foi calculado nesta execução. */
export const calibragensCalculadas = (): Map<string, unknown> => calculadas;

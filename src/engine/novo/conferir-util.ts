// Motor novo: o que as regras da conferência usam para medir (ângulos de um lado do corpo, faixas, formatação).
// Fica à parte de ./conferir.ts para os arquivos de regras de cada família (./regras/) poderem usar sem dar a volta.
import { sinal } from './esqueleto';
import type { Esq, Lado } from './esqueleto';
import type { Quadro } from './movimento';
import type { Corpo } from './tabelas';
import { angulo, dot, mul, norm, sub } from './vec';

/** Uma regra da ficha da técnica: recebe os quadros do começo até o fim da primeira fase com movimento e devolve o que mediu e se confere. */
export type Regra = (q: Quadro[], corpo: Corpo) => { medido: string; ok: boolean };
/** Número com uma casa e vírgula, como nos relatórios. */
export const f1 = (x: number) => (Math.round(x * 10) / 10).toString().replace('.', ',');
/** O menor e o maior valor de uma lista. */
export function faixa(v: number[]) {
  return [Math.min(...v), Math.max(...v)] as [number, number];
}

/** Ângulos anatômicos de um lado, medidos no esqueleto resolvido (graus). */
export function angulosDoLado(e: Esq, k: Lado) {
  const L = e.lado[k];
  const coxa = norm(sub(L.joelho, L.quadril));
  // flexão do quadril no plano de lado da pelve; a abertura para o lado é medida à parte
  const flexQuadril = Math.atan2(dot(coxa, e.pelve.z), -dot(coxa, e.pelve.y)) / (Math.PI / 180);
  const abducao = Math.asin(Math.max(-1, Math.min(1, dot(coxa, e.pelve.x) * sinal(k)))) / (Math.PI / 180);
  const canelaAcima = norm(sub(L.joelho, L.tornozelo));
  const dorsi = 90 - angulo(canelaAcima, L.pe.z);
  const dedos = mul(L.mao.y, -1),
    ante = mul(L.antebraco.y, -1);
  // extensão do punho: positiva quando o dorso da mão vai para o lado de trás do antebraço
  const punho = angulo(ante, dedos) * (dot(dedos, L.mao.z) <= 0 && dot(ante, L.mao.z) > 0 ? 1 : dot(ante, L.mao.z) > 0 ? 1 : -1);
  const dedosDoPe = angulo(L.pe.z, L.dedos.z);
  return { joelho: L.ang.joelho, cotovelo: L.ang.cotovelo, quadril: flexQuadril, abducaoDoQuadril: abducao, ombro: L.ang.elevacaoDoBraco, dorsiflexao: dorsi, pronacao: L.ang.pronacao - 90, punho, dedosDoPe, clavicula: L.ang.claviculaElev };
}

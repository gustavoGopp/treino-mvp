// O núcleo comum das remadas com o elástico em tubo pisado (a curvada, com os dois pés no meio do tubo, e a unilateral,
// com o pé da frente): onde o tubo passa sob a sola e o trecho dele de um pegador até a borda da sola, por fora da
// perna. O caminho por fora do corpo é o de ./elastico-faixa.ts; o pegador na mão, o de ../pecas-de-cena/elastico-pegador.ts.
// Como na rosca com elástico aprovada (./rosca-elastico.ts), o tubo passa sob o meio da sola, de uma borda à outra, e
// a fita do pegador vai da mão fechada até a ponta do tubo, na direção em que ele puxa.
import { sinal } from '../esqueleto';
import type { Esq, Lado } from '../esqueleto';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { fioPorFora } from './elastico-faixa';

/** As partes que o tubo contorna, subindo pelo lado de fora das pernas (e do tronco, se ele chegar lá). */
const PARTES = ['coxa', 'canela', 'pelve', 'tronco', 'cintura', 'emendaDaCintura'];

/**
 * As duas bordas da sola de um pé (a de fora e a de dentro), um raio de tubo acima do chão, onde o tubo passa por
 * baixo: a `t` do caminho do calcanhar à ponta do pé (o meio da sola fica perto de 0,4). `dz` anda ao longo do pé
 * (cm), para dois trechos lado a lado sob a mesma sola; `r` é a meia espessura do elástico (o tubo da tabela, se não vier).
 */
export function bordasDaSolaEm(corpo: Corpo, e: Esq, k: Lado, t: number, dz = 0, r = obj('elastico', 'tuboDiam') / 2): { fora: V3; dentro: V3 } {
  const L = e.lado[k];
  const dirPe = norm([L.ponta[0] - L.calcanhar[0], 0, L.ponta[2] - L.calcanhar[2]]);
  const no = add(add(L.calcanhar, mul(sub(L.ponta, L.calcanhar), t)), mul(dirPe, dz));
  // para o lado de fora do pé (no pé direito, −x)
  let lado = norm([dirPe[2], 0, -dirPe[0]]);
  if (lado[0] * sinal(k) < 0) lado = mul(lado, -1);
  const larg = corpo.m('pe.largura') / 2 + r;
  return { fora: [no[0] + lado[0] * larg, r, no[2] + lado[2] * larg], dentro: [no[0] - lado[0] * larg, r, no[2] - lado[2] * larg] };
}

/** Onde a fita do pegador se junta ao tubo: a partir do centro da mão, na direção de `para`. */
export const pontaDoTubo = (e: Esq, k: Lado, para: V3): V3 => add(e.lado[k].pegada, mul(norm(sub(para, e.lado[k].pegada)), obj('elastico', 'fita')));

/**
 * A volta do tubo numa mão ("segure curto", como na remada sentada e no stiff com elástico aprovados): `n` giros de raio
 * `r` em torno do pegador (o eixo da mão), começando e terminando do lado de `para` (o pé).
 */
export function voltaNaMao(e: Esq, k: Lado, para: V3, r: number, n: number): V3[] {
  const L = e.lado[k];
  const eixo = norm(L.mao.x);
  const v = sub(para, L.pegada);
  const b = norm(sub(v, mul(eixo, v[0] * eixo[0] + v[1] * eixo[1] + v[2] * eixo[2])));
  const c2 = cross(eixo, b);
  const passos = Math.round(16 * n);
  const out: V3[] = [];
  for (let i = 0; i <= passos; i++) {
    const a = (2 * Math.PI * i) / 16;
    out.push(add(add(L.pegada, mul(eixo, sinal(k) * mix(-1.6, 1.6, i / passos))), add(mul(b, r * Math.cos(a)), mul(c2, r * Math.sin(a)))));
  }
  return out;
}

/**
 * Um trecho de tubo esticado, da mão `k` até `borda` (uma borda da sola), por fora do corpo, para o lado `lado`. Com
 * `volta` ({ r, n }), o tubo dá antes `n` voltas na mão e a ponta (onde a fita do pegador se junta ao tubo) fica no
 * começo da volta; sem ela, a fita vai da mão na direção do pé. Devolve a polilinha (da ponta à borda) e a ponta.
 */
export function trechoAteOPe(e: Esq, k: Lado, borda: V3, lado: V3, folga: number, volta?: { r: number; n: number }): { pts: V3[]; ponta: V3 } {
  if (!volta) {
    const ponta = pontaDoTubo(e, k, borda);
    return { pts: fioPorFora(e, ponta, borda, { lado, partes: PARTES, folga, fatia: 2.5, livreNasPontas: 3 }), ponta };
  }
  const v = voltaNaMao(e, k, borda, volta.r, volta.n);
  const desce = fioPorFora(e, v[v.length - 1]!, borda, { lado, partes: PARTES, folga, fatia: 2.5, livreNasPontas: 4 });
  return { pts: [...v, ...desce.slice(1)], ponta: v[0]! };
}

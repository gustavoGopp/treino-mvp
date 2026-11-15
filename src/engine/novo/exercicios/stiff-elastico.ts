// Stiff com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/stiff-elastico.json); o movimento é o
// de ./dobrar-o-quadril.ts (a técnica do stiff aprovado), com as pontas do elástico nas mãos, na frente das coxas.
// O tubo passa por baixo dos dois pés, no meio da sola, e sobe pelo lado de fora de cada pé e de cada perna até a mão.
// Para ainda estar esticado embaixo ("segure curto"), ele dá uma volta em cada mão, por cima do pegador.
import ficha from '../dados/movimentos/stiff-elastico.json';
import { LADOS, sinal } from '../esqueleto';
import type { Esq, Lado } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, mix, mul } from '../vec';
import type { V3 } from '../vec';
import { criarStiff, folgaDasPernas } from './dobrar-o-quadril';

const S = criarStiff(ficha, 'elastico');
const f = (id: string) => S.ficha.param[id]!.v;

/** O caminho do tubo de um lado, da volta na mão até a borda de dentro da sola (do lado de fora para dentro). */
function ladoDoTubo(corpo: Corpo, e: Esq, k: Lado): { pts: V3[]; ponta: V3 } {
  const s = sinal(k),
    L = e.lado[k];
  const rTubo = obj('elastico', 'tuboDiam') / 2;
  const r = f('elastico.voltaNaMao');
  // a volta na mão: um giro em torno do pegador (o eixo x), a partir de baixo, andando de leve ao longo do pegador
  const volta: V3[] = [];
  const n = 16;
  for (let i = 0; i <= n; i++) {
    const a = (2 * Math.PI * i) / n;
    volta.push(add(L.pegada, [s * mix(-1.2, 1.2, i / n), -r * Math.cos(a), -r * Math.sin(a)]));
  }
  // a sola: o tubo passa por baixo do meio do pé, da borda de fora à de dentro
  const meio = (L.bola[2] + L.calcanhar[2]) / 2;
  const pe = L.bola[0],
    larg = corpo.m('pe.largura') / 2 + rTubo;
  const fora: V3 = [pe + s * larg, 0, meio],
    dentro: V3 = [pe - s * larg, 0, meio];
  // da mão à borda de fora do pé, em linha reta; onde a reta entraria na perna, o tubo passa por fora dela
  const de = volta[n]!;
  const via: V3[] = [];
  for (const t of [0.25, 0.5, 0.75]) {
    const reto: V3 = add(de, mul([fora[0] - de[0], fora[1] - de[1], fora[2] - de[2]], t));
    const folga = (dx: number) => folgaDasPernas(e, [{ c: add(reto, [s * dx, 0, 0]), r: rTubo }]) - f('elastico.folgaNaPerna');
    if (folga(0) >= 0) continue;
    via.push(add(reto, [s * resolver1(folga, 0, 25, 24), 0, 0]));
  }
  return { pts: [...volta, ...via, fora, dentro], ponta: volta[0]! };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const q = S.quadro(corpo, u, erro);
  const e = q.esq;
  const R = ladoDoTubo(corpo, e, 'R'),
    L = ladoDoTubo(corpo, e, 'L');
  const pts = [...R.pts, ...L.pts.slice().reverse()];
  let comp = 0;
  for (let i = 1; i < pts.length; i++) comp += dist(pts[i - 1]!, pts[i]!);
  const estica = comp / obj('elastico', 'comp');
  const pecas: Peca[] = [{ t: 'elastico', pts, estica }];
  for (const k of LADOS) pecas.push({ t: 'pegador', pegada: e.lado[k].pegada, eixo: e.lado[k].mao.x, ponta: (k === 'R' ? R : L).ponta });
  q.prims.push({ t: 'fio', pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' });
  q.pecas = pecas;
  q.fios = [{ id: 'elastico', comp, estica: true }];
  q.marcas = { mao: e.lado.R.pegada };
  return q;
}

export const stiffElastico: Exercicio = {
  ficha: S.ficha,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // posteriores da coxa (principal) e glúteos (secundário): os mesmos do stiff aprovado e da biblioteca
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, 'mão': (q) => q.marcas.mao! },
};

// Rosca com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-elastico.json); o braço é o
// da rosca alternada aprovada (./dobrar-o-cotovelo.ts: o úmero parado ao lado do tronco, só o antebraço sobe), com os
// dois braços juntos e as palmas para a frente. O elástico é o tubo com pegadores da tabela: os dois pés pisam no meio
// dele, no meio da sola, e cada mão segura um pegador. De cada pegador, o tubo desce pelo lado de fora da perna até a
// borda de fora do pé, passa por baixo dos dois pés e pelo chão entre eles (./elastico-faixa.ts contorna as pernas).
import ficha from '../dados/movimentos/rosca-elastico.json';
import { LADOS, resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { bracoDaRosca, corpoEmPe } from './dobrar-o-cotovelo';
import type { CorpoEmPe } from './dobrar-o-cotovelo';
import { comprimento, fioPorFora } from './elastico-faixa';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const CACHE = new WeakMap<Corpo, CorpoEmPe>();
/** As partes que o tubo contorna, subindo pelo lado de fora das pernas. */
const PARTES = ['coxa', 'canela', 'pelve', 'tronco', 'cintura', 'emendaDaCintura'];

function bracos(t: Tronco, u: number, erro?: string) {
  const braco = (k: Lado) =>
    bracoDaRosca(t.torax, k, {
      paraFora: f('braco.paraFora'),
      aFrente: f('braco.aFrente') + (erro === 'cotovelo' ? f('erro.cotovelo.braco') * suave(u) : 0),
      cotovelo: mix(erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.baixo'), erro === 'cotovelo' ? f('erro.cotovelo.cotovelo') : f('cotovelo.cima'), u),
      supinacao: f('maos.supinacao'),
      diam: obj('elastico', 'pegadorDiam'),
    });
  return { R: braco('R'), L: braco('L') };
}

/** O corpo parado (o equilíbrio sai dos braços embaixo; o elástico puxa para baixo, nas mãos, sem carga a mais). */
function corpoParado(corpo: Corpo): CorpoEmPe {
  let c = CACHE.get(corpo);
  if (c) return c;
  c = corpoEmPe(corpo, { joelho: f('joelho'), pesMeia: f('pes.meiaDistancia'), bracos: (t) => ({ ...bracos(t, 0), cargas: () => [] }) });
  CACHE.set(corpo, c);
  return c;
}

/** As duas bordas da sola de um pé, no meio do pé (a de fora e a de dentro), onde o tubo passa por baixo. */
function bordasDaSola(corpo: Corpo, e: Esq, k: Lado): { fora: V3; dentro: V3 } {
  const L = e.lado[k];
  const meio = mul(add(L.bola, L.calcanhar), 0.5);
  const dirPe = norm(sub(L.bola, L.calcanhar));
  // para o lado de fora do pé (no pé direito, −x)
  let lado = norm([dirPe[2], 0, -dirPe[0]]);
  if (lado[0] * sinal(k) < 0) lado = mul(lado, -1);
  const r = obj('elastico', 'tuboDiam') / 2;
  const larg = corpo.m('pe.largura') / 2 + r;
  return { fora: [meio[0] + lado[0] * larg, r, meio[2] + lado[2] * larg], dentro: [meio[0] - lado[0] * larg, r, meio[2] - lado[2] * larg] };
}

/** O tubo: do pegador direito, por fora da perna direita, por baixo dos dois pés, por fora da perna esquerda ao pegador esquerdo. */
export function tuboDaRosca(corpo: Corpo, e: Esq, folga: number) {
  const lado = (k: Lado) => {
    const s = sinal(k),
      L = e.lado[k];
    const sola = bordasDaSola(corpo, e, k);
    // a ponta do tubo sai do pegador na direção da borda de fora do pé (a fita do pegador vai até ela)
    const ponta = add(L.pegada, mul(norm(sub(sola.fora, L.pegada)), obj('elastico', 'fita')));
    const sobe = fioPorFora(e, ponta, sola.fora, { lado: [s, 0, 0], partes: PARTES, folga, fatia: 2.5 });
    return { pts: [...sobe, sola.dentro], ponta, sola };
  };
  const R = lado('R'),
    L = lado('L');
  const pts = [...R.pts, ...L.pts.slice().reverse()];
  return { pts, comp: comprimento(pts), R, L };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  let base: CorpoEmPe;
  if (erro === 'balanco') {
    // o tronco vai para trás enquanto as mãos sobem (o impulso), e o quadril vai à frente pelo equilíbrio
    base = corpoEmPe(corpo, { joelho: f('joelho'), pesMeia: f('pes.meiaDistancia'), tronco: -f('erro.balanco.tronco') * suave(u), lombar: -f('erro.balanco.lombar') * suave(u), bracos: (t) => ({ ...bracos(t, u, erro), cargas: () => [] }) });
  } else base = corpoParado(corpo);
  const b = bracos(base.e, u, erro);
  const e = resolverMembros(base.e, { R: b.R, L: b.L }, base.pernas);
  const t = tuboDaRosca(corpo, e, f('elastico.folgaNaPerna'));
  const estica = t.comp / obj('elastico', 'comp');
  const pecas: Peca[] = [{ t: 'elastico', pts: t.pts, estica }];
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, (k === 'R' ? t.R : t.L).ponta, `pegador${k}`));
  return {
    esq: e,
    prims: [chao(-70, 70, -70, 90), { t: 'fio', pts: t.pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp: t.comp, estica: true }],
    cargas: [],
    marcas: { mao: e.lado.R.pegada, solaRfora: t.R.sola.fora, solaRdentro: t.R.sola.dentro, solaLfora: t.L.sola.fora, solaLdentro: t.L.sola.dentro, pegadorR: e.lado.R.pegada, pegadorL: e.lado.L.pegada },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const roscaElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // bíceps, sem secundário (biblioteca); o antebraço "só ajuda" a segurar, como nas roscas aprovadas
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { mão: (q) => q.marcas.mao!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

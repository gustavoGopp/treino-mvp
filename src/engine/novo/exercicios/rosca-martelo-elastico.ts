// Rosca martelo com elástico, no motor novo (primeira animação deste exercício: até aqui ele era só cartão de texto).
// Os números vêm da ficha (../dados/movimentos/rosca-martelo-elastico.json). É a rosca com elástico aprovada
// (./rosca-elastico.ts: o úmero parado ao lado do tronco, só o antebraço sobe, os dois braços juntos, os dois pés no
// meio do tubo com pegadores) com a pegada neutra da rosca martelo aprovada (./rosca-martelo.ts): palmas uma para a
// outra, o polegar para a frente do antebraço, sem girar. De cada pegador, o tubo desce pelo lado de fora da perna até
// a borda de fora do pé, passa por baixo dos dois pés e pelo chão entre eles (o caminho de ./rosca-elastico.ts).
// No erro "pisar só com a ponta do pé", o pé direito fica na ponta (o calcanhar sobe) e o tubo, que passa sob ele,
// escorrega da bola do pé para a ponta dos dedos enquanto estica: é o elástico que escapa.
import ficha from '../dados/movimentos/rosca-martelo-elastico.json';
import { LADOS, resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca } from '../pecas';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { bracoDaRosca, corpoEmPe } from './dobrar-o-cotovelo';
import type { CorpoEmPe } from './dobrar-o-cotovelo';
import { comprimento, fioPorFora } from './elastico-faixa';
import { bordasDaSola } from './rosca-elastico';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const CACHE = new WeakMap<Corpo, CorpoEmPe>();
/** As partes que o tubo contorna, subindo pelo lado de fora das pernas (as da rosca com elástico). */
const PARTES = ['coxa', 'canela', 'pelve', 'tronco', 'cintura', 'emendaDaCintura'];

function bracos(t: Tronco, u: number, erro?: string) {
  const braco = (k: Lado) =>
    bracoDaRosca(t.torax, k, {
      paraFora: f('braco.paraFora'),
      aFrente: f('braco.aFrente') + (erro === 'cotovelos' ? f('erro.cotovelo.braco') * suave(u) : 0),
      cotovelo: mix(f('cotovelo.baixo'), erro === 'cotovelos' ? f('erro.cotovelo.cotovelo') : f('cotovelo.cima'), u),
      supinacao: f('maos.supinacao'),
      diam: obj('elastico', 'pegadorDiam'),
    });
  return { R: braco('R'), L: braco('L') };
}

/** O corpo parado (o equilíbrio sai dos braços embaixo; o elástico puxa as mãos para baixo, sem carga a mais). */
function corpoParado(corpo: Corpo): CorpoEmPe {
  let c = CACHE.get(corpo);
  if (c) return c;
  c = corpoEmPe(corpo, { joelho: f('joelho'), pesMeia: f('pes.meiaDistancia'), bracos: (t) => ({ ...bracos(t, 0), cargas: () => [] }) });
  CACHE.set(corpo, c);
  return c;
}

/** As bordas da sola por onde o tubo passa no pé na ponta: a fração `s` do caminho da bola do pé (0) à ponta (1). */
export function bordasNaPonta(corpo: Corpo, e: Esq, k: Lado, s: number): { fora: V3; dentro: V3 } {
  const L = e.lado[k];
  const c = add(L.bola, mul(sub(L.ponta, L.bola), s));
  const dirPe = norm(sub(L.ponta, L.bola));
  let lado = norm([dirPe[2], 0, -dirPe[0]]);
  if (lado[0] * sinal(k) < 0) lado = mul(lado, -1);
  const r = obj('elastico', 'tuboDiam') / 2;
  const larg = corpo.m('pe.largura') / 2 + r;
  return { fora: [c[0] + lado[0] * larg, r, c[2] + lado[2] * larg], dentro: [c[0] - lado[0] * larg, r, c[2] - lado[2] * larg] };
}

/** O tubo: do pegador direito, por fora da perna direita, por baixo dos dois pés, por fora da perna esquerda ao pegador esquerdo. */
function tubo(e: Esq, sola: (k: Lado) => { fora: V3; dentro: V3 }) {
  const lado = (k: Lado) => {
    const L = e.lado[k];
    const b = sola(k);
    // a ponta do tubo sai do pegador na direção da borda de fora do pé (a fita do pegador vai até ela)
    const ponta = add(L.pegada, mul(norm(sub(b.fora, L.pegada)), obj('elastico', 'fita')));
    const sobe = fioPorFora(e, ponta, b.fora, { lado: [sinal(k), 0, 0], partes: PARTES, folga: f('elastico.folgaNaPerna'), fatia: 2.5 });
    return { pts: [...sobe, b.dentro], ponta, sola: b };
  };
  const R = lado('R'),
    L = lado('L');
  const pts = [...R.pts, ...L.pts.slice().reverse()];
  return { pts, comp: comprimento(pts), R, L };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  let base: CorpoEmPe;
  if (erro === 'tronco') {
    // o tronco vai para trás enquanto as mãos sobem (o embalo), e o quadril vai à frente pelo equilíbrio
    base = corpoEmPe(corpo, { joelho: f('joelho'), pesMeia: f('pes.meiaDistancia'), tronco: -f('erro.balanco.tronco') * suave(u), lombar: -f('erro.balanco.lombar') * suave(u), bracos: (t) => ({ ...bracos(t, u, erro), cargas: () => [] }) });
  } else base = corpoParado(corpo);
  let pernas: Record<Lado, PosePerna> = base.pernas;
  // no erro do pé, o direito fica na ponta: a bola do pé no mesmo lugar, o calcanhar levantado
  if (erro === 'pe') pernas = { ...pernas, R: { ...pernas.R, pe: { ...pernas.R.pe!, calc: f('erro.pe.calcanhar') } } };
  const b = bracos(base.e, u, erro);
  const e = resolverMembros(base.e, { R: b.R, L: b.L }, pernas);
  const t = tubo(e, (k) => (erro === 'pe' && k === 'R' ? bordasNaPonta(corpo, e, k, f('erro.pe.escapa') * suave(u)) : bordasDaSola(corpo, e, k)));
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

export const roscaMarteloElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // bíceps (principal; a biblioteca conta só ele); o antebraço "só ajuda", como na rosca martelo aprovada (o braquial,
  // que o cartão cita, não é músculo do desenho)
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { mão: (q) => q.marcas.mao!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

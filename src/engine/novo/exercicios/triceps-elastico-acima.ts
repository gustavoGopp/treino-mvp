// Tríceps acima da cabeça com elástico, no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-elastico-acima.json); o movimento é o de ./triceps-frances-base.ts (os braços parados
// ao lado das orelhas, só os antebraços estendem), em pé, um pé à frente do outro, com o tronco quase vertical.
// O elástico é o longo em laço (41 pol; ../dados/objetos/elastico-longo.json): com o tubo de 48 pol da tabela, o
// caminho da mão ao pé de trás e de volta passa do máximo do fabricante. O pé de trás pisa no meio do laço, no meio da
// sola; as duas pontas do laço sobem pelas costas, rentes ao corpo (o caminho mais curto que contorna as costas, o
// glúteo e a perna de trás: ./elastico-faixa.ts), e as duas mãos seguram juntas a ponta de cima, atrás da cabeça.
import ficha from '../dados/movimentos/triceps-elastico-acima.json';
import type { Esq } from '../esqueleto';
import type { Exercicio, Quadro } from '../movimento';
import { faixaElastica } from '../pecas-de-cena/elastico-longo';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento, fioPorFora } from './elastico-faixa';
import { criarTricepsFrances } from './triceps-frances-base';

const T = criarTricepsFrances(ficha, 'elastico');
const f = (id: string) => T.ficha.param[id]!.v;
/** As partes que a faixa contorna: tudo menos as mãos e os pés (ela sai da mão e passa por baixo do pé). */
const PARTES = ['cabeca', 'cabeloAtras', 'calota', 'pescoco', 'tronco', 'cintura', 'emendaDaCintura', 'pelve', 'coxa', 'canela', 'braco', 'ante'];

/** O laço: da mão direita, pelas costas, por baixo do pé de trás (o esquerdo) e de volta à mão esquerda. */
export function lacoDoTriceps(corpo: Corpo, e: Esq): { pts: V3[]; comp: number; sola: [V3, V3] } {
  const pe = e.lado.L;
  // o meio da sola do pé de trás, de uma borda à outra (a faixa passa por baixo, achatada no chão)
  const meio = mul(add(pe.bola, pe.calcanhar), 0.5);
  const larg = corpo.m('pe.largura') / 2 + obj('elasticoLongo', 'esp');
  // o lado de fora do pé (perpendicular à direção dos dedos, no chão); no pé esquerdo, para +x
  const dirPe = norm(sub(pe.bola, pe.calcanhar));
  const fora = norm([dirPe[2], 0, -dirPe[0]]);
  const y = obj('elasticoLongo', 'esp') / 2;
  // a borda de dentro (do lado do meio do corpo) recebe o trecho da mão direita; a de fora, o da esquerda
  const dentro: V3 = [meio[0] - fora[0] * larg, y, meio[2] - fora[2] * larg],
    deFora: V3 = [meio[0] + fora[0] * larg, y, meio[2] + fora[2] * larg];
  const costas = dirRef(e.torax, [0, 0, -1]);
  const op = { lado: costas, partes: PARTES, folga: f('elastico.folga'), fatia: 2.5, livreNasPontas: 3 };
  const R = fioPorFora(e, e.lado.R.pegada, dentro, op);
  const L = fioPorFora(e, e.lado.L.pegada, deFora, op);
  // a ponta de cima do laço passa por dentro das duas mãos
  const pts = [...R, ...L.slice().reverse(), e.lado.R.pegada];
  return { pts, comp: comprimento(pts), sola: [dentro, deFora] };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const q = T.quadro(corpo, u, erro);
  const l = lacoDoTriceps(corpo, q.esq);
  const estica = l.comp / obj('elasticoLongo', 'comp');
  // desenhado sem o trecho de volta entre as mãos (ele fica dentro das mãos fechadas)
  const fx = faixaElastica(l.pts.slice(0, -1), estica);
  q.prims.push(...fx.prims);
  q.pecas = [fx.peca];
  q.fios = [{ id: 'elastico', comp: l.comp, estica: true, objeto: 'elasticoLongo' }];
  q.marcas = { ...q.marcas, solaDentro: l.sola[0], solaFora: l.sola[1] };
  return q;
}

export const tricepsElasticoAcima: Exercicio = {
  ficha: T.ficha,
  vistas: ['lateral', 'frontal'],
  quadro,
  // a biblioteca: tríceps principal, sem secundário (como os franceses aprovados)
  papeis: { triceps: 'p' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

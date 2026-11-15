// Desenvolvimento com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/desenvolvimento-elastico.json);
// o movimento é o do desenvolvimento aprovado (./empurrar-para-cima.ts: o antebraço na vertical, das mãos na altura
// das orelhas aos braços quase estendidos sobre os ombros), em pé, com um pegador do elástico em cada mão e as palmas
// para a frente. O elástico é o tubo de 60 pol com pegadores (../dados/objetos/elastico-tubo-longo.json): o de 48 pol
// da tabela passaria do estiramento máximo com os braços em cima. Os dois pés pisam no meio dele, no meio da sola; de
// cada pegador, a fita sai da mão fechada pela palma, e o tubo desce na frente do antebraço e pelo lado do corpo até a
// borda de fora do pé, contornando o corpo (./elastico-faixa.ts), e passa por baixo dos dois pés.
import ficha from '../dados/movimentos/desenvolvimento-elastico.json';
import { LADOS, sinal } from '../esqueleto';
import type { Esq, Lado } from '../esqueleto';
import { daFicha } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Peca } from '../pecas';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento, fioPorFora } from './elastico-faixa';
import { criarDesenvolvimento } from './empurrar-para-cima';
import { bordasDaSola } from './rosca-elastico';

const D = criarDesenvolvimento(ficha, 'elastico');
const f = daFicha(D.ficha);
const TUBO = 'elasticoTuboLongo';
/** As partes que o tubo contorna, da mão ao pé. */
const PARTES = ['ante', 'braco', 'tronco', 'cintura', 'emendaDaCintura', 'pelve', 'coxa', 'canela'];

/** O tubo: do pegador direito, pela frente do antebraço e pelo lado do corpo, por baixo dos dois pés, ao pegador esquerdo. */
export function tuboDoDesenvolvimento(corpo: Corpo, e: Esq) {
  const lado = (k: Lado) => {
    const s = sinal(k),
      L = e.lado[k];
    const sola = bordasDaSola(corpo, e, k);
    // a fita sai da mão fechada para baixo e para a frente (pela palma, virada para a frente)
    const desce = norm(sub(sola.fora, L.pegada));
    const ponta = add(L.pegada, mul(norm(add(desce, [0, 0, f('elastico.pontaAFrente')])), obj(TUBO, 'fita')));
    const desceu = fioPorFora(e, ponta, sola.fora, { lado: [s * 0.5, 0, 1], partes: PARTES, folga: f('elastico.folga'), fatia: 4 });
    return { pts: [...desceu, sola.dentro], ponta, sola };
  };
  const R = lado('R'),
    L = lado('L');
  const pts: V3[] = [...R.pts, ...L.pts.slice().reverse()];
  return { pts, comp: comprimento(pts), R, L };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const q = D.quadro(corpo, u, erro);
  const e = q.esq;
  const t = tuboDoDesenvolvimento(corpo, e);
  const pecas: Peca[] = [{ t: 'elastico', pts: t.pts, estica: t.comp / obj(TUBO, 'comp') }];
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, (k === 'R' ? t.R : t.L).ponta, `pegador${k}`));
  q.prims.push({ t: 'fio', pts: t.pts, larg: obj(TUBO, 'tuboDiam'), cls: 'fita' });
  q.pecas = pecas;
  q.fios = [{ id: 'elastico', comp: t.comp, estica: true, objeto: TUBO }];
  q.marcas = { ...q.marcas, solaRfora: t.R.sola.fora, solaRdentro: t.R.sola.dentro, solaLfora: t.L.sola.fora, solaLdentro: t.L.sola.dentro, pegadorR: e.lado.R.pegada, pegadorL: e.lado.L.pegada };
  q.vies = { maoR: 1, maoL: 1 };
  return q;
}

export const desenvolvimentoElastico: Exercicio = {
  ficha: D.ficha,
  vistas: ['lateral', 'frontal'],
  quadro,
  // a frente do ombro (principal); a lateral do ombro e o tríceps (secundários), como a ficha da técnica e o
  // desenvolvimento aprovado
  papeis: { deltAnt: 'p', deltLat: 's', triceps: 's' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

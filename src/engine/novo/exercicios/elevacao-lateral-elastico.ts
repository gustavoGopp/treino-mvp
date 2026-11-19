// Elevação lateral com elástico, no motor novo. Os números vêm da ficha
// (../dados/movimentos/elevacao-lateral-elastico.json); o movimento é o da elevação com halteres aprovada
// (./elevar-o-braco.ts), com um pegador do elástico em cada mão no lugar do halter. O elástico é o tubo com pegadores da
// tabela: os dois pés pisam no meio dele, no meio da sola, e de cada pegador o tubo desce pelo lado de fora da perna até
// a borda de fora do pé e passa por baixo dos dois pés (o caminho é o da rosca com elástico, ./rosca-elastico.ts).
import ficha from '../dados/movimentos/elevacao-lateral-elastico.json';
import { LADOS } from '../esqueleto';
import { daFicha } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Peca } from '../pecas';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { criarElevacao } from './elevar-o-braco';
import { tuboDaRosca } from './rosca-elastico';

const E = criarElevacao(ficha, 'elastico');
const f = daFicha(E.ficha);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const q = E.quadro(corpo, u, erro);
  const e = q.esq;
  const t = tuboDaRosca(corpo, e, f('elastico.folgaNaPerna'));
  const pecas: Peca[] = [{ t: 'elastico', pts: t.pts, estica: t.comp / obj('elastico', 'comp') }];
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, (k === 'R' ? t.R : t.L).ponta, `pegador${k}`));
  q.prims.push({ t: 'fio', pts: t.pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' });
  q.pecas = pecas;
  q.fios = [{ id: 'elastico', comp: t.comp, estica: true }];
  q.marcas = { ...q.marcas, solaRfora: t.R.sola.fora, solaRdentro: t.R.sola.dentro, solaLfora: t.L.sola.fora, solaLdentro: t.L.sola.dentro, pegadorR: e.lado.R.pegada, pegadorL: e.lado.L.pegada };
  q.vies = { maoR: 1, maoL: 1 };
  // de cima, a cabeça fica dentro da silhueta dos ombros e o contorno único do Boneco não a desenhava (sobrava só o
  // calombo do rosto; auditoria das aprovadas antigas, 19/11): ela ganha o contorno próprio por cima do corpo (`cabeca`,
  // opção do Boneco)
  q.viesNaVista = { ...q.viesNaVista, cima: { ...q.viesNaVista?.cima, cabeca: 1 } };
  return q;
}

export const elevacaoLateralElastico: Exercicio = {
  ficha: E.ficha,
  vistas: ['frontal', 'cima'],
  quadro,
  // a lateral do ombro (principal), sem secundário, como a ficha da técnica e a biblioteca (`ombro_lateral`); a frente
  // do ombro listrada (só ajuda), como na elevação com halteres aprovada
  papeis: { deltLat: 'p', deltAnt: 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

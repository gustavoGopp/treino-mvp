// Pull-through na polia baixa com corda, no motor novo. Os números vêm da ficha (../dados/movimentos/pull-through.json);
// o movimento é o de dobrar o quadril (./dobrar-o-quadril.ts, o núcleo dos stiffs): os joelhos um pouco dobrados, quase
// no mesmo ângulo, a bacia inclina com a coluna reta e o quadril vai para trás, com o centro de massa sobre o meio do
// pé. De costas para a coluna, dois passos à frente dela, os pés mais abertos que o quadril; a corda
// (../pecas-de-cena/corda-triceps.ts) nas duas mãos, passando entre as pernas até o cabo da polia de baixo. O que ele
// resolve em cada quadro, em vez de receber pronto:
//  - os braços quase estendidos, as duas mãos lado a lado (cada uma num ramo da corda), o braço girando no ombro de um
//    pouco à frente da vertical (em pé, as mãos na frente da virilha) até atrás dela (embaixo, o cabo puxa as mãos para
//    trás, entre os joelhos);
//  - a corda segue as mãos (os dois ramos esticados até a bucha, do lado da roldana) e o cabo vai reto da bucha à
//    roldana, entre as pernas; a pilha sobe o curso do cabo dividido pela relação da máquina.
import ficha from '../dados/movimentos/pull-through.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { centroDaRoldana, chao } from '../pecas';
import type { Peca } from '../pecas';
import { cordaTriceps, montarCorda } from '../pecas-de-cena/corda-triceps';
import type { CordaMontada } from '../pecas-de-cena/corda-triceps';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dirRef, mix, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { alcanceDoBraco, bracoAte, dobrarOQuadril, maoNoAngulo } from './dobrar-o-quadril';
import { colunasECabos, compDoCabo, menorNoCiclo, torreComRoldanaEm } from './polia-bracos';
import type { CaboDaColuna } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
/** Até que altura o quadro mostra a coluna (a polia está embaixo: o resto é cortado pela borda). */
const CORTADA_EM = 120;

interface Pedido {
  joelho: number;
  tronco: number;
  lombar: number;
  toracica: number;
  cotovelo: number;
  braco: number;
}
function pedido(u: number, erro?: string): Pedido {
  const p: Pedido = {
    joelho: mix(f('joelho.cima'), f('joelho.baixo'), u),
    tronco: mix(f('tronco.cima'), f('tronco.baixo'), u),
    lombar: 0,
    toracica: 0,
    cotovelo: f('cotovelo'),
    // as mãos descem pela frente das coxas e só vão para trás perto dos joelhos, onde as pernas abrem espaço
    braco: mix(f('braco.cima'), f('braco.baixo'), u * u),
  };
  if (erro === 'bracos') {
    // em pé, os cotovelos dobrados e o quadril ainda dobrado: os braços subiram a corda
    p.cotovelo = mix(f('erro.bracos.cotovelo'), f('cotovelo'), u);
    p.tronco = mix(f('erro.bracos.tronco'), f('tronco.baixo'), u);
  }
  if (erro === 'arred') {
    // a bacia para de inclinar antes e quem dobra é a lombar (como no stiff)
    p.lombar = f('erro.arred.lombar') * u;
    p.toracica = f('erro.arred.toracica') * u;
    p.tronco = mix(f('tronco.cima'), f('tronco.baixo') - f('erro.arred.bacia'), u) + p.lombar;
  }
  if (erro === 'topo') {
    // em pé, o tronco passa da vertical para trás, com a lombar arqueada
    p.tronco = mix(f('erro.topo.tronco'), f('tronco.baixo'), u);
    p.lombar = mix(f('erro.topo.lombar'), 0, u);
  }
  return p;
}

/** O corpo com as mãos lado a lado no ângulo do braço pedido e a corda presa a elas, esticada para a roldana. */
function montar(corpo: Corpo, roldana: V3, p: Pedido): { e: Esq; corda: CordaMontada } {
  const alcance = alcanceDoBraco(corpo, p.cotovelo);
  const x = corpo.m('mao.largura') / 2 + f('maos.folga');
  let corda = montarCorda([[-x, 90, 0], [x, 90, 0]], corpo.m('mao.largura'), roldana);
  const d = dobrarOQuadril(corpo, {
    joelho: p.joelho,
    tronco: p.tronco,
    lombar: p.lombar,
    toracica: p.toracica,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    pesMeiaDistancia: f('pes.meiaDistancia'),
    apoio: 'dois',
    bracos(e) {
      const pR = maoNoAngulo(e, 'R', -x, alcance, p.braco);
      const pL: V3 = [-pR[0], pR[1], pR[2]];
      corda = montarCorda([pR, pL], corpo.m('mao.largura'), roldana);
      const braco = (k: Lado, pegada: V3): PoseBraco => {
        // os cotovelos apontam para trás; a corda atravessa o punho fechado e sai pelo lado do dedo mínimo, para a bucha (a ponta de borracha fica do lado do polegar: é ela que segura a corda contra o puxão do cabo)
        const polo = norm(dirRef(e.torax, [sinal(k) * 0.3, 0, -1]));
        const b = bracoAte(e, k, pegada, polo);
        return { ...b, polo, mao: { polegar: norm(perp(sub(pegada, corda.bucha), b.antebraco)), forma: 'pegada', diam: obj('cordaTriceps', 'diam') } };
      };
      return { R: braco('R', pR), L: braco('L', pL), cargas: [] };
    },
  });
  return { e: d.e, corda };
}

interface Calibrado {
  cabos: CaboDaColuna[];
  repouso: number[];
}
const CAL = new WeakMap<Corpo, Calibrado>();

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  // a roldana de baixo, atrás do meio da pelve em pé (o cabo não muda onde a pelve fica: ele não entra no equilíbrio)
  const z0 = montar(corpo, [0, obj('torre', 'poliaMin'), -f('polia.atras')], pedido(0)).e.pelve.o[2];
  const cabos: CaboDaColuna[] = [{ id: 'cabo', torre: torreComRoldanaEm([0, obj('torre', 'poliaMin'), z0 - f('polia.atras')], [0, 0, 1]) }];
  const roldana = centroDaRoldana(cabos[0]!.torre);
  const repouso = [menorNoCiclo((u) => compDoCabo(cabos[0]!.torre, montar(corpo, roldana, pedido(u)).corda.bucha), 20)];
  c = { cabos, repouso };
  CAL.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const { e, corda } = montar(corpo, centroDaRoldana(c.cabos[0]!.torre), pedido(u, erro));
  const pc = cordaTriceps(corda);
  const col = colunasECabos(c.cabos, [corda.bucha], c.repouso, f('pilha.folga'), false, CORTADA_EM);
  const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre'), pc.peca, ...col.pecas!.filter((p) => p.t !== 'torre')];
  const marcas: Record<string, V3> = { ...col.marcas, bucha: corda.bucha, saiR: corda.ramos[0]!.sai, saiL: corda.ramos[1]!.sai, saida: col.marcas['cabo.saida']! };
  return { esq: e, prims: [chao(-70, 70, c.cabos[0]!.torre.base[2] - 50, 90), ...pc.prims, ...col.prims], pecas, fios: col.fios, cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
}

export const pullThrough: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // posteriores da coxa (principal) e glúteos (secundário): o que a biblioteca conta, como no stiff
  papeis: { posteriores: 'p', gluteo: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, mãos: (q) => q.esq.lado.R.pegada },
};

// Rosca direta na polia baixa com barra reta, no motor novo. Os números vêm da ficha
// (../dados/movimentos/rosca-polia.json); o corpo em pé e a coluna com o cabo, do núcleo ./polia-bracos.ts; o braço da
// rosca, do núcleo das roscas (./dobrar-o-cotovelo.ts, `bracoDaRosca`); a barra, da peça
// ../pecas-de-cena/polia-braco-barra-reta.ts. De frente para a coluna, a meio passo, carro no ponto mais baixo. O que
// ele resolve em cada quadro, em vez de receber pronto:
//  - o braço parado ao lado do tronco (o úmero não se move) e o antebraço dobrando no plano do braço, palmas para
//    cima: as duas mãos ficam sempre na mesma distância (a barra é reta e tem largura fixa);
//  - embaixo, o cotovelo dobra o mínimo da ficha ou o que a barra precisa para passar à folga da ficha na frente das
//    coxas (`resolver1`, com a barra como uma fila de esferas na conta de `folgaDasPernas`);
//  - a barra atravessa as duas palmas; a aba e o mosquetão saem do meio dela na linha do cabo, que vai reto até a
//    roldana de baixo; a pilha sobe o curso do cabo dividido pela relação da máquina.
import ficha from '../dados/movimentos/rosca-polia.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { centroDaRoldana, chao } from '../pecas';
import type { Peca } from '../pecas';
import { barraReta, montarBarra } from '../pecas-de-cena/polia-braco-barra-reta';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { bracoDaRosca } from './dobrar-o-cotovelo';
import { folgaDasPernas } from './dobrar-o-quadril';
import type { Esfera } from './dobrar-o-quadril';
import { colunasECabos, compDoCabo, equilibrar, menorNoCiclo, montarEmPe, polegarDaPegada, torreComRoldanaEm } from './polia-bracos';
import type { CaboDaColuna, PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

function pedidoDoCorpo(cotovelo: number, u: number, erro?: string): PedidoEmPe {
  const w = f('pes.meiaDistancia');
  const x = suave(u);
  const braco = (t: Tronco, k: Lado): PoseBraco => {
    const b = bracoDaRosca(t.torax, k, {
      paraFora: f('braco.paraFora'),
      aFrente: f('braco.aFrente') + (erro === 'cotovelo' ? f('erro.cotovelo.braco') * x : 0),
      cotovelo,
      supinacao: f('maos.supinacao'),
      diam: obj('barraRetaPolia', 'diam'),
      prot: f('escapula.prot'),
    });
    // o antebraço dobra em volta de um eixo de lado a lado (o cotovelo é uma dobradiça), aberto para fora o ângulo da
    // ficha (o ângulo de carregamento): o centro da mão fica sempre à mesma distância do meio, e a barra não muda de
    // largura entre as mãos
    const s = sinal(k),
      u = norm(b.umero!),
      fora = dirRef(t.torax, [s, 0, 0]),
      frente = norm(perp(dirRef(t.torax, [0, 0, 1]), u)),
      c = cotovelo * rad,
      be = f('antebraco.paraFora') * rad;
    const antebraco = norm(add(mul(add(mul(u, Math.cos(c)), mul(frente, Math.sin(c))), Math.cos(be)), mul(fora, Math.sin(be))));
    return { ...b, antebraco, mao: { ...b.mao, polegar: polegarDaPegada(u, antebraco, b.polo, s, f('maos.supinacao')) } };
  };
  return {
    pes: { R: { bola: [-w, 0, 0] }, L: { bola: [w, 0, 0] } },
    joelho: f('joelho'),
    tronco: erro === 'balanco' ? mix(f('erro.balanco.inicio'), f('erro.balanco.fim'), x) : f('tronco'),
    lombar: erro === 'balanco' ? f('erro.balanco.lombar') * x : 0,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    bracos: (t) => ({ R: braco(t, 'R'), L: braco(t, 'L') }),
  };
}

/** A barra como uma fila de esferas do raio dela, de uma ponta à outra (para a folga até as pernas). */
function esferasDaBarra(e: Esq): Esfera[] {
  const a = e.lado.R.pegada,
    b = e.lado.L.pegada;
  const u = norm(sub(b, a)),
    meio = mul(add(a, b), 0.5),
    L = obj('barraRetaPolia', 'comp') / 2;
  const out: Esfera[] = [];
  for (let i = 0; i <= 16; i++) out.push({ c: add(meio, mul(u, -L + (2 * L * i) / 16)), r: obj('barraRetaPolia', 'diam') / 2 });
  return out;
}

interface Calibrado {
  pelve: PelveParada;
  cotBaixo: number;
  cabos: CaboDaColuna[];
  repouso: number[];
}
const CAL = new WeakMap<Corpo, Calibrado>();

const cotovelo = (c: Pick<Calibrado, 'cotBaixo'>, u: number) => mix(c.cotBaixo, f('cotovelo.cima'), u);

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  const meioDoPe = -corpo.m('pe.calcanharABola') / 2;
  const pelve = equilibrar(corpo, pedidoDoCorpo(mix(f('cotovelo.baixo.minimo'), f('cotovelo.cima'), 0.5), 0.5), meioDoPe);
  // embaixo: o menor cotovelo, a partir do mínimo da ficha, em que a barra fica à folga pedida das coxas
  const folga = (cot: number) => folgaDasPernas(montarEmPe(corpo, pedidoDoCorpo(cot, 0), pelve), esferasDaBarra(montarEmPe(corpo, pedidoDoCorpo(cot, 0), pelve))) - f('barra.folga');
  const cotBaixo = folga(f('cotovelo.baixo.minimo')) >= 0 ? f('cotovelo.baixo.minimo') : resolver1(folga, f('cotovelo.baixo.minimo'), 60, 26);
  const cabos: CaboDaColuna[] = [{ id: 'cabo', torre: torreComRoldanaEm([0, obj('torre', 'poliaMin'), pelve.z + f('polia.aFrente')], [0, 0, -1]) }];
  const parcial = { pelve, cotBaixo, cabos };
  const repouso = [menorNoCiclo((u) => compDoCabo(cabos[0]!.torre, barraDe(montar(corpo, parcial, u), cabos).ponta))];
  c = { ...parcial, repouso };
  CAL.set(corpo, c);
  return c;
}

function montar(corpo: Corpo, c: Pick<Calibrado, 'pelve' | 'cotBaixo'>, u: number, erro?: string): Esq {
  return montarEmPe(corpo, pedidoDoCorpo(cotovelo(c, u), u, erro), c.pelve);
}
const barraDe = (e: Esq, cabos: CaboDaColuna[]) => montarBarra(mul(add(e.lado.R.pegada, e.lado.L.pegada), 0.5), sub(e.lado.L.pegada, e.lado.R.pegada), centroDaRoldana(cabos[0]!.torre));

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = montar(corpo, c, u, erro);
  const barra = barraDe(e, c.cabos);
  const pb = barraReta(barra);
  const col = colunasECabos(c.cabos, [barra.ponta], c.repouso, f('pilha.folga'), false);
  const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre'), pb.peca, ...col.pecas!.filter((p) => p.t !== 'torre')];
  const marcas: Record<string, V3> = { ...col.marcas, barra: barra.meio, 'barra.a': barra.a, 'barra.b': barra.b };
  return { esq: e, prims: [chao(-60, 60, -60, c.cabos[0]!.torre.base[2] + 50), ...pb.prims, ...col.prims], pecas, fios: col.fios, cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
}

export const roscaPolia: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // bíceps (principal; a biblioteca conta só ele); o antebraço "só ajuda" (correção de 04/11, como nas outras roscas)
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

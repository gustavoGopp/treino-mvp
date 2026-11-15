// Crucifixo na polia (crossover), no motor novo. Os números vêm da ficha (../dados/movimentos/crucifixo-polia.json);
// o corpo em pé e as colunas com os cabos, do núcleo ./polia-bracos.ts. Duas colunas, uma de cada lado, com os carros
// na altura do ombro e um pouco atrás da pessoa (1 a 2 passos à frente da linha das torres); cada mão segura o estribo
// da coluna do seu lado. Um pé à frente do outro, joelhos destravados, o tronco levemente inclinado à frente, peito alto
// e ombros para trás. O que ele resolve em cada quadro, em vez de receber pronto:
//  - o braço pela linha do ombro à mão, que gira em arco no tórax (de um pouco atrás da linha do corpo até as mãos se
//    encontrarem na frente do peito), com o cotovelo sempre no mesmo ângulo;
//  - o ponto do fim do arco: o giro em que os centros das duas pegadas ficam a uma largura de mão (`resolver1`);
//  - a pelve parada onde o centro de massa cai entre os dois pés; a altura dos carros, a do centro do ombro;
//  - cada cabo reto do elo do estribo à roldana da sua coluna, e cada pilha subindo o curso do seu cabo dividido pela
//    relação da máquina.
import ficha from '../dados/movimentos/crucifixo-polia.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca, Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dist, mix } from '../vec';
import type { V3 } from '../vec';
import { bracoNoArco, colunasECabos, compDoCabo, equilibrar, estriboNaMao, menorNoCiclo, montarEmPe, torreComRoldanaEm } from './polia-bracos';
import type { CaboDaColuna, PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

interface Arco {
  psi: number;
  el: number;
  dobra: number;
  prot: number;
  sup: number;
}

/** O braço do crucifixo: a mão segura o estribo com o polegar para cima; o cotovelo aponta para fora, para trás e um pouco para baixo (assim o antebraço fica abaixo da linha do cabo, que sobe para a roldana na altura do ombro). */
function braco(corpo: Corpo, t: Tronco, k: Lado, a: Arco): PoseBraco {
  const P = a.psi * rad;
  return bracoNoArco(corpo, t.torax, k, { psi: a.psi, el: a.el, dobra: a.dobra, polo: [Math.cos(P), -0.7, -Math.sin(P) - 0.3], supinacao: a.sup, diam: obj('estribo', 'pegadaDiam'), prot: a.prot });
}

function pedidoDoCorpo(corpo: Corpo, arco: Arco, erro?: string, u = 0): PedidoEmPe {
  const w = f('pes.meiaDistancia');
  return {
    pes: { R: { bola: [-w, 0, f('pe.frente.z')] }, L: { bola: [w, 0, f('pe.tras.z')], calc: f('pe.tras.calcanhar') } },
    joelho: f('joelho'),
    tronco: erro === 'tronco' ? mix(f('tronco'), f('erro.tronco.inclinacao'), u) : f('tronco'),
    toracica: erro === 'tronco' ? mix(f('toracica'), f('erro.tronco.toracica'), u) : f('toracica'),
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    bracos: (t) => ({ R: braco(corpo, t, 'R', arco), L: braco(corpo, t, 'L', arco) }),
  };
}

interface Calibrado {
  pelve: PelveParada;
  psiFim: number;
  cabos: CaboDaColuna[];
  repouso: number[];
}
const CAL = new WeakMap<Corpo, Calibrado>();

function arcoEm(c: Pick<Calibrado, 'psiFim'>, u: number, erro?: string): Arco {
  const a: Arco = { psi: mix(f('arco.inicio.psi'), c.psiFim, u), el: mix(f('arco.inicio.el'), f('arco.fim.el'), u), dobra: f('cotovelo'), prot: f('escapula.prot'), sup: mix(f('mao.supinacao.inicio'), f('mao.supinacao.fim'), u) };
  if (erro === 'supino') {
    a.psi = mix(f('erro.supino.psi'), c.psiFim, u);
    a.dobra = mix(f('erro.supino.dobra'), f('cotovelo'), u);
  }
  if (erro === 'abrir') {
    a.psi = mix(f('erro.abrir.psi'), c.psiFim, u);
    a.prot = mix(f('erro.abrir.prot'), f('escapula.prot'), u);
  }
  return a;
}

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  const dBola = corpo.m('pe.calcanharABola');
  const zPeso = mix(f('pe.tras.z'), f('pe.frente.z') - dBola / 2, f('peso.partilha'));
  // a pelve parada: com os braços no meio do arco (o fim do arco ainda aproximado: as mãos à frente)
  const pelve = equilibrar(corpo, pedidoDoCorpo(corpo, arcoEm({ psiFim: -10 }, 0.5)), zPeso);
  // o fim do arco: os centros das duas pegadas a uma largura de mão
  const psiFim = resolver1((x) => {
    const e = montarEmPe(corpo, pedidoDoCorpo(corpo, arcoEm({ psiFim: x }, 1)), pelve);
    return dist(e.lado.R.pegada, e.lado.L.pegada) - f('arco.fim.maos');
  }, 40, -40, 30);
  // os carros na altura do centro do ombro (no alongado), as roldanas para os lados e um pouco atrás
  const e0 = montarEmPe(corpo, pedidoDoCorpo(corpo, arcoEm({ psiFim }, 0)), pelve);
  const y = e0.lado.R.ombro[1] + f('polia.acimaDoOmbro');
  const torreDo = (k: Lado): Torre => torreComRoldanaEm([sinal(k) * f('polia.meiaDistancia'), y, pelve.z - f('polia.atras')], [-sinal(k), 0, 0]);
  const cabos: CaboDaColuna[] = [
    { id: 'cabo', torre: torreDo('R') },
    { id: 'cabo2', torre: torreDo('L') },
  ];
  const parcial = { pelve, psiFim, cabos, repouso: [0, 0] };
  // o repouso de cada pilha: o cabo mais curto do ciclo
  const repouso = (['R', 'L'] as Lado[]).map((k, i) => menorNoCiclo((u) => compDoCabo(cabos[i]!.torre, estriboNaMao(pose(corpo, parcial, u), k, cabos[i]!.torre).elo)));
  c = { ...parcial, repouso };
  CAL.set(corpo, c);
  return c;
}

function pose(corpo: Corpo, c: Pick<Calibrado, 'pelve' | 'psiFim'>, u: number, erro?: string): Esq {
  return montarEmPe(corpo, pedidoDoCorpo(corpo, arcoEm(c, u, erro), erro, u), c.pelve);
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = pose(corpo, c, u, erro);
  const es = (['R', 'L'] as Lado[]).map((k, i) => estriboNaMao(e, k, c.cabos[i]!.torre));
  const col = colunasECabos(c.cabos, es.map((x) => x.elo), c.repouso, f('pilha.folga'), true);
  const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre'), ...es.map((x) => x.peca), ...col.pecas!.filter((p) => p.t !== 'torre')];
  const marcas: Record<string, V3> = { ...col.marcas, 'mao.R': e.lado.R.pegada, 'mao.L': e.lado.L.pegada };
  return { esq: e, prims: [chao(-110, 110, -90, 90), ...es.flatMap((x) => x.prims), ...col.prims], pecas, fios: col.fios, cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
}

export const crucifixoPolia: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // peitoral (principal) e a frente do ombro (secundário): a biblioteca (revisão de anatomia de 02/11/2026)
  papeis: { peitoral: 'p', deltAnt: 's' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

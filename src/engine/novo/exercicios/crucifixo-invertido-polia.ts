// Crucifixo invertido na polia, com os cabos cruzados, no motor novo. Os números vêm da ficha
// (../dados/movimentos/crucifixo-invertido-polia.json); o corpo em pé e as colunas com os cabos, do núcleo
// ./polia-bracos.ts. Duas colunas, à frente e dos lados, com as polias na altura dos ombros; a mão direita segura o
// estribo da coluna da esquerda e a esquerda, o da direita. Pés na largura do quadril, tronco reto. O que ele resolve em
// cada quadro, em vez de receber pronto:
//  - o braço pela linha do ombro à mão, quase reto (o cotovelo fixo), que gira no tórax de cruzado à frente até a mão
//    chegar perto da linha do corpo; no começo o braço direito passa por cima do esquerdo (os antebraços se cruzam sem
//    se atravessar), e o desnível some no começo da abertura;
//  - onde a mão começa: o giro em que o centro da mão passa o que a ficha pede do meio do corpo (`resolver1`);
//  - as escápulas: um pouco à frente no começo, juntas (sem força) no fim, com os ombros baixos o tempo todo;
//  - cada cabo reto do elo do estribo à roldana da coluna do outro lado, e cada pilha subindo o curso do seu cabo
//    dividido pela relação da máquina.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/crucifixo-invertido-polia.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca, Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix } from '../vec';
import type { V3 } from '../vec';
import { bracoNoArco, colunasECabos, compDoCabo, equilibrar, estriboNaMao, menorNoCiclo, montarEmPe, torreComRoldanaEm } from './polia-bracos';
import type { CaboDaColuna, PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

interface Arco {
  psi: number;
  el: number;
  /** O desnível do começo (graus): o braço direito sobe, o esquerdo desce. */
  desnivel: number;
  dobra: number;
  sup: number;
  elev: number;
  prot: number;
}

function braco(corpo: Corpo, t: Tronco, k: Lado, a: Arco): PoseBraco {
  const P = a.psi * rad;
  // o cotovelo aponta para fora no começo (braços à frente) e para trás no fim, um pouco para baixo
  return bracoNoArco(corpo, t.torax, k, { psi: a.psi, el: a.el + (k === 'R' ? a.desnivel : -a.desnivel), dobra: a.dobra, polo: [Math.cos(P), -0.3, -Math.sin(P)], supinacao: a.sup, diam: obj('estribo', 'pegadaDiam'), elev: a.elev, prot: a.prot });
}

function pedidoDoCorpo(corpo: Corpo, arco: Arco, erro?: string, u = 0): PedidoEmPe {
  const w = f('pes.meiaDistancia'),
    z = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
  const balanco = erro === 'balanco' ? suave(u) : 0;
  return {
    pes: { R: { bola: [-w, 0, z] }, L: { bola: [w, 0, z] } },
    joelho: f('joelho'),
    tronco: mix(f('tronco'), f('erro.balanco.tronco'), balanco),
    lombar: f('erro.balanco.lombar') * balanco,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    bracos: (t) => ({ R: braco(corpo, t, 'R', arco), L: braco(corpo, t, 'L', arco) }),
  };
}

interface Calibrado {
  pelve: PelveParada;
  psiInicio: number;
  /** O acerto da altura dos braços (graus), para os dois cabos terem o mesmo comprimento no começo. */
  elAjuste: number;
  cabos: CaboDaColuna[];
  repouso: number[];
}
const CAL = new WeakMap<Corpo, Calibrado>();

function arcoEm(c: Pick<Calibrado, 'psiInicio' | 'elAjuste'>, u: number, erro?: string): Arco {
  const a: Arco = {
    psi: mix(c.psiInicio, f('fim.psi'), u),
    el: f('braco.el') + c.elAjuste,
    desnivel: f('inicio.desnivel') * (1 - suave(Math.min(1, u / f('desnivel.some')))),
    dobra: f('cotovelo'),
    sup: mix(f('mao.supinacao.inicio'), f('mao.supinacao.fim'), u),
    elev: f('escapula.elev'),
    prot: mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u),
  };
  if (erro === 'encolher') a.elev = mix(f('escapula.elev'), f('erro.encolher.elev'), suave(u));
  if (erro === 'cotovelo') {
    a.dobra = mix(f('cotovelo'), f('erro.cotovelo.dobra'), suave(u));
    a.psi = mix(c.psiInicio, f('erro.cotovelo.psi'), u);
  }
  return a;
}

function pose(corpo: Corpo, c: Pick<Calibrado, 'pelve' | 'psiInicio' | 'elAjuste'>, u: number, erro?: string): Esq {
  return montarEmPe(corpo, pedidoDoCorpo(corpo, arcoEm(c, u, erro), erro, u), c.pelve);
}

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  const meioDoPe = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo') - corpo.m('pe.calcanharABola') / 2;
  const pelve = equilibrar(corpo, pedidoDoCorpo(corpo, arcoEm({ psiInicio: 0, elAjuste: 0 }, 0.5)), meioDoPe);
  const torreDo = (k: Lado, y: number): Torre => torreComRoldanaEm([sinal(k) * f('polia.meiaDistancia'), y, pelve.z + f('polia.aFrente')], [-sinal(k), 0, 0]);
  // o começo: o centro da mão direita passa `inicio.cruza` cm do meio do corpo para o lado esquerdo (x > 0); as polias
  // na altura do ombro. Com um braço por cima do outro, a altura dos dois braços é acertada (`elAjuste`) para os dois
  // cabos terem o mesmo comprimento no começo: assim as duas pilhas sobem juntas
  const comeco = (elAjuste: number) => {
    const psiInicio = resolver1((x) => montarEmPe(corpo, pedidoDoCorpo(corpo, arcoEm({ psiInicio: x, elAjuste }, 0)), pelve).lado.R.pegada[0] - f('inicio.cruza'), 10, -40, 30);
    const e0 = pose(corpo, { pelve, psiInicio, elAjuste }, 0);
    const y = e0.lado.R.ombro[1] + f('polia.acimaDoOmbro');
    const tL = torreDo('L', y),
      tR = torreDo('R', y);
    return { psiInicio, y, dif: compDoCabo(tL, estriboNaMao(e0, 'R', tL).elo) - compDoCabo(tR, estriboNaMao(e0, 'L', tR).elo) };
  };
  // as contas demoradas (esta e o comprimento dos cabos em repouso, abaixo) vêm guardadas para o corpo do app: ../calibragens.ts
  const { elAjuste, psiInicio, y } = calibragem(corpo, `${F.id}:comeco`, () => {
    const elAjuste = resolver1((d) => comeco(d).dif, -10, 10, 24);
    return { elAjuste, ...(({ psiInicio, y }) => ({ psiInicio, y }))(comeco(elAjuste)) };
  });
  // cabos cruzados: a mão direita puxa o cabo da coluna da esquerda, e vice-versa
  const cabos: CaboDaColuna[] = [
    { id: 'cabo', torre: torreDo('L', y) },
    { id: 'cabo2', torre: torreDo('R', y) },
  ];
  const parcial = { pelve, psiInicio, elAjuste };
  const repouso = calibragem(corpo, `${F.id}:repouso`, () => (['R', 'L'] as Lado[]).map((k, i) => menorNoCiclo((u) => compDoCabo(cabos[i]!.torre, estriboNaMao(pose(corpo, parcial, u), k, cabos[i]!.torre).elo))));
  c = { ...parcial, cabos, repouso };
  CAL.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = pose(corpo, c, u, erro);
  const es = (['R', 'L'] as Lado[]).map((k, i) => estriboNaMao(e, k, c.cabos[i]!.torre));
  const col = colunasECabos(c.cabos, es.map((x) => x.elo), c.repouso, f('pilha.folga'), true);
  const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre'), ...es.map((x) => x.peca), ...col.pecas!.filter((p) => p.t !== 'torre')];
  const marcas: Record<string, V3> = { ...col.marcas, 'mao.R': e.lado.R.pegada, 'mao.L': e.lado.L.pegada };
  // de cima, a cabeça fica dentro da silhueta dos ombros e o contorno único do Boneco não a desenhava (sobrava só o
  // calombo do rosto; auditoria das aprovadas antigas, 19/11): ela ganha o contorno próprio por cima do corpo (`cabeca`,
  // opção do Boneco)
  return { esq: e, prims: [chao(-110, 110, -70, 130), ...es.flatMap((x) => x.prims), ...col.prims], pecas, fios: col.fios, cargas: [], marcas, vies: { maoR: 1, maoL: 1 }, viesNaVista: { cima: { cabeca: 1 } } };
}

export const crucifixoInvertidoPolia: Exercicio = {
  ficha: F,
  vistas: ['posterior', 'cima'],
  quadro,
  // só o ombro de trás, sem secundário (achado 5 da revisão de anatomia; a biblioteca)
  papeis: { deltPost: 'p' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

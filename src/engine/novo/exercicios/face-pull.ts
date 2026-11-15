// Face pull com corda, no motor novo. Os números vêm da ficha (../dados/movimentos/face-pull.json); o corpo em pé e a
// coluna com o cabo, do núcleo ./polia-bracos.ts; a corda é a peça do tríceps (../pecas-de-cena/corda-triceps.ts).
// De frente para a coluna, com o carro na altura da testa; pés na largura do quadril, tronco reto ou um pouco para
// trás. O que ele resolve em cada quadro, em vez de receber pronto:
//  - onde ficam as mãos: no começo, com os braços estendidos à frente, na altura do rosto (a distância do ombro que dá
//    o cotovelo da ficha); no fim, ao lado das orelhas, abertas. Os dois pontos ficam no referencial do tórax (no erro
//    "jogar o tronco para trás", as mãos vão junto com o tronco); a mão vai de um ao outro e abre no fim do caminho;
//  - o braço chega à mão pelo cotovelo apontado para fora (para baixo no começo, para fora e um pouco para cima no fim:
//    cotovelos altos); a pegada gira da ficha (palmas para baixo no começo, polegares para trás no fim);
//  - as escápulas: um pouco à frente no começo, juntas no fim, com os ombros baixos o tempo todo;
//  - a corda segue as mãos (os dois ramos esticados até a bucha) e o cabo vai reto da bucha à roldana; a coluna fica à
//    frente, onde o cabo, com os braços estendidos, tem o comprimento da ficha. A pilha sobe o curso do cabo dividido
//    pela relação da máquina.
import ficha from '../dados/movimentos/face-pull.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca } from '../pecas';
import { cordaTriceps, montarCorda } from '../pecas-de-cena/corda-triceps';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dirRef, mix, noRef, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { alcanceDoBraco } from './dobrar-o-quadril';
import { colunasECabos, compDoCabo, equilibrar, menorNoCiclo, montarEmPe, polegarDaPegada, torreComRoldanaEm } from './polia-bracos';
import type { CaboDaColuna, PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

/** As mãos (lado esquerdo; o direito espelha x) no referencial do tórax: no começo e no fim, e o fim do erro "cotovelos baixos". */
interface Alvos {
  inicio: V3;
  fim: V3;
  baixo: V3;
}

interface Calibrado {
  alvos: Alvos;
  pelve: PelveParada;
  roldana: V3;
  cabos: CaboDaColuna[];
  repouso: number[];
}
const CAL = new WeakMap<Corpo, Calibrado>();

/** Onde as mãos ficam, a partir de um esqueleto em pé com a postura da ficha (o tórax e a cabeça no lugar). */
function alvosDe(corpo: Corpo, e: Esq): Alvos {
  const T = e.torax,
    o = e.lado.L.ombro,
    tr = e.cabeca.o;
  const alc = alcanceDoBraco(corpo, f('cotovelo.inicio'));
  const x0 = f('inicio.maos'),
    y0 = tr[1] + f('inicio.altura');
  const ini: V3 = [x0, y0, o[2] + Math.sqrt(Math.max(1, alc * alc - (x0 - o[0]) ** 2 - (y0 - o[1]) ** 2))];
  const fim: V3 = [f('fim.maos'), tr[1] + f('fim.altura'), tr[2] + f('fim.aFrente')];
  const baixo: V3 = [f('fim.maos'), tr[1] + f('erro.baixo.altura'), tr[2] + f('fim.aFrente') + 14];
  return { inicio: paraRef(T, ini), fim: paraRef(T, fim), baixo: paraRef(T, baixo) };
}

function bracos(t: Tronco, ant: Esq, a: Alvos, u: number, erro?: string): Record<Lado, PoseBraco> {
  const T = t.torax;
  const fimL = erro === 'baixo' ? mix3(a.fim, a.baixo, suave(u)) : a.fim;
  // a mão anda do começo ao fim; para os lados ela abre mais no fim do caminho ("puxe abrindo as mãos")
  const local: V3 = [mix(a.inicio[0], fimL[0], u * u), mix(a.inicio[1], fimL[1], u), mix(a.inicio[2], fimL[2], u)];
  const poloFim: V3 = erro === 'baixo' ? [mix(1, 0.3, suave(u)), mix(f('fim.polo.alto'), f('erro.baixo.polo'), suave(u)), -0.3] : [1, f('fim.polo.alto'), -0.5];
  const poloL: V3 = [1, mix(-0.5, poloFim[1], u), mix(0.2, poloFim[2], u)];
  const elev = erro === 'encolher' ? mix(f('escapula.elev'), f('erro.encolher.elev'), suave(u)) : f('escapula.elev');
  const prot = mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u);
  const lado = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const pegada = noRef(T, [s * local[0], local[1], local[2]]);
    // a pegada sai do braço da passada anterior: a supinação da ficha a partir da neutra (a corda atravessa a mão em
    // linha reta até a bucha, como no tríceps com corda)
    const A = ant.lado[k];
    const polegar = polegarDaPegada(sub(A.cotovelo, A.ombro), sub(A.pegada, A.cotovelo), dirRef(T, [s * poloL[0], poloL[1], poloL[2]]), s, mix(f('mao.supinacao.inicio'), f('mao.supinacao.fim'), u));
    return { pegada, polo: dirRef(T, [s * poloL[0], poloL[1], poloL[2]]), mao: { polegar, forma: 'pegada', diam: obj('cordaTriceps', 'diam') }, elev, prot };
  };
  return { R: lado('R'), L: lado('L') };
}
const mix3 = (a: V3, b: V3, u: number): V3 => [mix(a[0], b[0], u), mix(a[1], b[1], u), mix(a[2], b[2], u)];

function pedidoDoCorpo(corpo: Corpo, a: Alvos, u: number, erro?: string): PedidoEmPe {
  const w = f('pes.meiaDistancia'),
    z = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
  const x = suave(u);
  return {
    pes: { R: { bola: [-w, 0, z] }, L: { bola: [w, 0, z] } },
    joelho: f('joelho'),
    tronco: erro === 'tronco' ? mix(f('tronco'), f('erro.tronco.inclinacao'), x) : f('tronco'),
    lombar: erro === 'tronco' ? f('erro.tronco.lombar') * x : 0,
    cervical: erro === 'encolher' ? mix(f('cervical'), f('erro.encolher.cervical'), x) : f('cervical'),
    cabeca: erro === 'encolher' ? mix(f('cabeca'), f('erro.encolher.cabeca'), x) : f('cabeca'),
    bracos: (t, ant) => bracos(t, ant, a, u, erro),
  };
}

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  const meioDoPe = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo') - corpo.m('pe.calcanharABola') / 2;
  // os alvos das mãos saem da postura (o tórax e a cabeça); a pelve, do equilíbrio com os braços no meio do caminho
  const alvos0 = alvosDe(corpo, montarEmPe(corpo, pedidoDoCorpo(corpo, { inicio: [8, -10, 50], fim: [16, 10, 0], baixo: [16, 0, 10] }, 0), { y: 90, z: 0 }));
  const pelve = equilibrar(corpo, pedidoDoCorpo(corpo, alvos0, 0.5), meioDoPe);
  const e0 = montarEmPe(corpo, pedidoDoCorpo(corpo, alvos0, 0), pelve);
  const alvos = alvosDe(corpo, e0);
  // a roldana: na altura da testa, à frente da bucha do começo, a `cabo.inicio` cm
  const yR = e0.cabeca.o[1] + f('polia.acimaDaOrelha');
  const b0 = montarCorda([e0.lado.R.pegada, e0.lado.L.pegada], corpo.m('mao.largura'), [0, yR, 300]).bucha;
  const roldana: V3 = [0, yR, b0[2] + Math.sqrt(Math.max(1, f('cabo.inicio') ** 2 - (yR - b0[1]) ** 2))];
  const cabos: CaboDaColuna[] = [{ id: 'cabo', torre: torreComRoldanaEm(roldana, [0, 0, -1]) }];
  const parcial = { alvos, pelve, roldana, cabos };
  const repouso = [menorNoCiclo((u) => compDoCabo(cabos[0]!.torre, montar(corpo, parcial, u).corda.bucha))];
  c = { ...parcial, repouso };
  CAL.set(corpo, c);
  return c;
}

function montar(corpo: Corpo, c: Pick<Calibrado, 'alvos' | 'pelve' | 'roldana'>, u: number, erro?: string) {
  const e = montarEmPe(corpo, pedidoDoCorpo(corpo, c.alvos, u, erro), c.pelve);
  return { e, corda: montarCorda([e.lado.R.pegada, e.lado.L.pegada], corpo.m('mao.largura'), c.roldana) };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const { e, corda } = montar(corpo, c, u, erro);
  const pc = cordaTriceps(corda);
  const col = colunasECabos(c.cabos, [corda.bucha], c.repouso, f('pilha.folga'), false);
  const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre'), pc.peca, ...col.pecas!.filter((p) => p.t !== 'torre')];
  const marcas: Record<string, V3> = { ...col.marcas, bucha: corda.bucha, saiR: corda.ramos[0]!.sai, saiL: corda.ramos[1]!.sai, saida: col.marcas['cabo.saida']! };
  return { esq: e, prims: [chao(-70, 70, -60, c.roldana[2] + 50), ...pc.prims, ...col.prims], pecas, fios: col.fios, cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
}

export const facePull: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // o ombro de trás (principal) e as costas, a parte do meio do trapézio (secundário): a biblioteca
  papeis: { deltPost: 'p', trapMedInf: 's' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

// Panturrilha em pé na máquina, no motor novo. Os números vêm da ficha
// (../dados/movimentos/panturrilha-em-pe-maquina.json); a máquina, de ../pecas-de-cena/panturrilha-em-pe.ts; o
// movimento, do núcleo das panturrilhas em pé aprovadas (./elevar-o-calcanhar.ts).
//
// Em pé no degrau da máquina, de frente para a torre, a ponta dos pés na borda de trás do degrau e os calcanhares no ar;
// os ombros sob as almofadas, as mãos nos pegadores da travessa, na frente do pescoço; os joelhos quase estendidos e
// parados. O pé gira na bola (presa no degrau): o calcanhar desce abaixo da borda e sobe o máximo. O corpo sobe reto,
// com o centro de massa (corpo e a carga das almofadas) sobre a bola do pé; as almofadas acompanham os ombros (o braço
// gira no eixo à frente) e as placas sobem o arco do came.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts): a altura do
// alto dos ombros (a pele, debaixo das almofadas) em relação à base do pescoço, com os braços nos pegadores; com ela, o
// ângulo do braço da máquina em cada quadro (as almofadas encostam nos ombros, afundando `almofada.amassa`).
import ficha from '../dados/movimentos/panturrilha-em-pe-maquina.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { baixoDasAlmofadas, normalDoBraco, panturrilhaEmPe as maquina, pegadorDaPanturrilhaEmPe } from '../pecas-de-cena/panturrilha-em-pe';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix } from '../vec';
import { elevarOCalcanhar } from './elevar-o-calcanhar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const deg = 180 / Math.PI;
const g = (id: string) => obj('panturrilhaEmPe', id);

/** O ângulo do braço da máquina em que a face de baixo das almofadas fica na altura `y`. */
const bracoNaAltura = (y: number) => resolver1((a) => baixoDasAlmofadas(a)[1] - y, -40, 40, 30);

/** As mãos nos pegadores da travessa, com o braço no ângulo dado: pegada por cima, o polegar para dentro. */
const maosNosPegadores = (braco: number): Record<Lado, PoseBraco> => {
  const b = (k: Lado): PoseBraco => {
    const s = sinal(k) as -1 | 1;
    return { pegada: pegadorDaPanturrilhaEmPe(braco, s).meio, polo: [s * 0.7, -1, -0.2], mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: g('pegaDiam') } };
  };
  return { R: b('R'), L: b('L') };
};

/** O alto dos ombros (a pele, debaixo das almofadas): o maior y, menos o da base do pescoço (cm). */
function altoDosOmbros(e: Esq): number {
  const meia = g('ombreirasEntre') / 2,
    l = g('ombreiraLarg') / 2,
    c = g('ombreiraComp') / 2;
  const zA = baixoDasAlmofadas(0)[2];
  let topo = -1e9;
  for (const { p, parte } of pontosDoBoneco(e))
    if (['tronco', 'pescoco', 'braco'].includes(parte) && Math.abs(Math.abs(p[0]) - meia) <= l && Math.abs(p[2] - zA) <= c) topo = Math.max(topo, p[1]);
  return topo - e.torax.o[1];
}

interface Pose {
  calc: number;
  joelho: number;
}
/** O corpo e o ângulo do braço da máquina, dado o alto dos ombros em relação à base do pescoço (`alto`). */
function montar(corpo: Corpo, p: Pose, alto: number) {
  let braco = 0;
  const r = elevarOCalcanhar(corpo, {
    apoioY: g('plataformaAlt'),
    bolaZ: f('bola.daBeirada'),
    pesMeiaDistancia: f('pes.meiaDistancia'),
    joelho: p.joelho,
    calc: p.calc,
    pernaL: null,
    umaPerna: 0,
    bracos: (e) => {
      braco = bracoNaAltura(e.torax.o[1] + alto - f('almofada.amassa'));
      const M = maosNosPegadores(braco);
      return { R: M.R, L: M.L, cargas: [{ massa: f('carga'), pos: baixoDasAlmofadas(braco) }] };
    },
  });
  return { ...r, braco };
}

/** O giro do pé na bola (graus) para o calcanhar ficar `h` cm acima (negativo: abaixo) da borda do degrau. */
const giro = (corpo: Corpo, h: number) => Math.asin(h / corpo.m('pe.calcanharABola')) * deg;

/** O alto dos ombros com os braços nos pegadores (duas voltas: os braços mexem um pouco no alto do ombro). */
const alto = (corpo: Corpo) =>
  calibragem(corpo, 'panturrilha-em-pe-maquina:ombros', () => {
    let a = 0;
    for (let i = 0; i < 3; i++) a = altoDosOmbros(montar(corpo, { calc: 0, joelho: f('joelho') }, a).e);
    return a;
  });

/** A posição inicial do braço (o batente de baixo): um pouco abaixo do ponto mais baixo da série, certo ou com o erro. */
const inicio = (corpo: Corpo) =>
  calibragem(corpo, 'panturrilha-em-pe-maquina:inicio', () => {
    const a = alto(corpo);
    const certo = montar(corpo, { calc: giro(corpo, -f('calcanhar.embaixo')), joelho: f('joelho') }, a).braco;
    const joelho = montar(corpo, { calc: giro(corpo, -f('calcanhar.embaixo')), joelho: f('erro.joelho.flexao') }, a).braco;
    return Math.min(certo, joelho) - f('inicio.folga');
  });

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const embaixo = erro === 'curta' ? f('erro.curta.embaixo') : -f('calcanhar.embaixo');
  const topo = erro === 'curta' ? f('erro.curta.topo') : f('calcanhar.topo');
  const calc = mix(giro(corpo, embaixo), giro(corpo, topo), u);
  // no erro do joelho, ele dobra embaixo e estica na subida, dando impulso
  const joelho = erro === 'joelho' ? mix(f('erro.joelho.flexao'), f('joelho'), u) : f('joelho');
  const r = montar(corpo, { calc, joelho }, alto(corpo));
  const i0 = inicio(corpo);
  const M = maquina({ braco: r.braco, inicio: i0, placas: f('placas') });
  const hP = g('plataformaAlt');
  return {
    esq: r.e,
    prims: [chao(-90, 90, -70, 140), ...M.prims],
    pecas: [{ ...M.fixa, cenario: true }, M.movel],
    fios: [],
    cargas: r.cargas,
    marcas: {
      apoioDosPes: [0, hP, r.bola[2]],
      calcanharEmCima: [0, hP + f('calcanhar.topo'), 0],
      calcanharEmbaixo: [0, hP - f('calcanhar.embaixo'), 0],
      almofada: M.baixo,
      normalAlmofada: normalDoBraco(r.braco),
      pegadorR: pegadorDaPanturrilhaEmPe(r.braco, -1).meio,
      pegadorL: pegadorDaPanturrilhaEmPe(r.braco, 1).meio,
      braco: [r.braco, i0, g('cameDiam') / 2],
      pilha: [M.subida, 0, 0],
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const panturrilhaEmPeMaquina: Exercicio = {
  ficha: F,
  // de lado se lê o tornozelo e o calcanhar abaixo da borda do degrau, com o corpo inteiro; de três quartos por trás,
  // os dois calcanhares descendo atrás do degrau e as almofadas nos ombros
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // panturrilha (gastrocnêmio e sóleo), sem secundário: é o que a biblioteca conta
  papeis: { panturrilha: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, cabeça: (q) => q.esq.cabeca.o },
};

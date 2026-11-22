// Face pull com elástico (abertura com elástico na altura do rosto), no motor novo. Os números vêm da ficha
// (../dados/movimentos/face-pull-elastico.json). A técnica é a do face pull na polia aprovado (./face-pull.ts): o mesmo
// corpo em pé (o núcleo ./polia-bracos.ts) e o mesmo caminho dos braços, com o elástico no lugar da polia e da corda.
// De frente para uma porta fechada, o meio do tubo com pegadores de 48 pol (objeto `elastico`) preso na altura da
// testa, numa âncora de porta no vão do lado da dobradiça (a espuma do lado de lá; ../pecas-de-cena/elastico-ancora-no-alto.ts);
// uma ponta em cada mão. O que ele resolve em cada quadro, em vez de receber pronto:
//  - onde ficam as mãos: no começo, braços estendidos à frente, na altura do rosto; no fim, ao lado das orelhas,
//    abertas. Os dois pontos ficam no referencial do tórax (no erro "jogar o tronco para trás", as mãos vão junto);
//  - o braço chega à mão pelo cotovelo apontado para fora (para baixo no começo, para fora e um pouco para cima no fim:
//    cotovelos altos); a pegada gira de palmas para baixo a "mostra o bíceps";
//  - as escápulas: um pouco à frente no começo, juntas no fim, com os ombros baixos o tempo todo;
//  - o tubo vai reto de cada pegador até a alça da âncora; a porta fica onde o tubo, com os braços estendidos, já está
//    esticado o que a ficha pede. A porta, a âncora e o trecho do tubo perto delas são cenário.
import ficha from '../dados/movimentos/face-pull-elastico.json';
import { LADOS, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca, PecaPropria } from '../pecas';
import { portaComAncoraNoAlto } from '../pecas-de-cena/elastico-ancora-no-alto';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, noRef, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { alcanceDoBraco } from './dobrar-o-quadril';
import { comprimento } from './elastico-faixa';
import { equilibrar, montarEmPe, polegarDaPegada } from './polia-bracos';
import type { PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
/** O tubo com pegadores de 48 pol: do começo ao fim ele estica de 1,15 a menos de 2 vezes (o máximo é 3). */
const TUBO = 'elastico';

/** As mãos (lado esquerdo; o direito espelha x) no referencial do tórax: no começo e no fim, e o fim do erro "cotovelos baixos". */
interface Alvos {
  inicio: V3;
  fim: V3;
  baixo: V3;
}
interface Calibrado {
  alvos: Alvos;
  pelve: PelveParada;
  alturaDaAlca: number;
  zPorta: number;
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

const mix3 = (a: V3, b: V3, u: number): V3 => [mix(a[0], b[0], u), mix(a[1], b[1], u), mix(a[2], b[2], u)];

function bracos(t: Tronco, ant: Esq, a: Alvos, u: number, erro?: string): Record<Lado, PoseBraco> {
  const T = t.torax;
  const fimL = erro === 'baixo' ? mix3(a.fim, a.baixo, suave(u)) : a.fim;
  // a mão anda do começo ao fim; para os lados ela abre mais no fim do caminho ("puxe abrindo as mãos")
  const local: V3 = [mix(a.inicio[0], fimL[0], u * u), mix(a.inicio[1], fimL[1], u), mix(a.inicio[2], fimL[2], u)];
  const poloFim: V3 = erro === 'baixo' ? [mix(1, 0.3, suave(u)), mix(f('fim.polo.alto'), f('erro.baixo.polo'), suave(u)), -0.3] : [1, f('fim.polo.alto'), f('fim.polo.tras')];
  const poloL: V3 = [1, mix(-0.5, poloFim[1], u), mix(0.2, poloFim[2], u)];
  const elev = erro === 'encolher' ? mix(f('escapula.elev'), f('erro.encolher.elev'), suave(u)) : f('escapula.elev');
  const prot = mix(f('escapula.prot.inicio'), -f('escapula.retr.fim'), u);
  const lado = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const pegada = noRef(T, [s * local[0], local[1], local[2]]);
    const A = ant.lado[k];
    const polo = dirRef(T, [s * poloL[0], poloL[1], poloL[2]]);
    const polegar = polegarDaPegada(sub(A.cotovelo, A.ombro), sub(A.pegada, A.cotovelo), polo, s, mix(f('mao.supinacao.inicio'), f('mao.supinacao.fim'), u));
    return { pegada, polo, mao: { polegar, forma: 'pegada', diam: obj(TUBO, 'pegadorDiam') }, elev, prot };
  };
  return { R: lado('R'), L: lado('L') };
}

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

/** A alça da âncora: no meio, na altura pedida, com a face da porta em `zPorta`. */
const portaEm = (alturaDaAlca: number, zPorta: number) => portaComAncoraNoAlto(zPorta, alturaDaAlca, false, 0);

/** Onde a fita do pegador se junta ao tubo: na linha da mão à âncora. */
const pontaDoTubo = (e: Esq, k: Lado, alca: V3): V3 => add(e.lado[k].pegada, mul(norm(sub(alca, e.lado[k].pegada)), obj(TUBO, 'fita')));

/** O tubo: do pegador direito, reto até a alça da âncora (dá a volta nela), e de volta ao pegador esquerdo. */
function tubo(e: Esq, alca: V3) {
  const pR = pontaDoTubo(e, 'R', alca),
    pL = pontaDoTubo(e, 'L', alca);
  const pts: V3[] = [pR, add(alca, [-0.5, 0, 0]), add(alca, [0.5, 0, 0]), pL];
  return { pts, comp: comprimento(pts), pR, pL };
}

const montar = (corpo: Corpo, c: Pick<Calibrado, 'alvos' | 'pelve'>, u: number, erro?: string) => montarEmPe(corpo, pedidoDoCorpo(corpo, c.alvos, u, erro), c.pelve);

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  const meioDoPe = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo') - corpo.m('pe.calcanharABola') / 2;
  // os alvos das mãos saem da postura (o tórax e a cabeça); a pelve, do equilíbrio com os braços no meio do caminho
  const alvos0 = alvosDe(corpo, montarEmPe(corpo, pedidoDoCorpo(corpo, { inicio: [8, -10, 50], fim: [16, 10, 0], baixo: [16, 0, 10] }, 0), { y: 90, z: 0 }));
  const pelve = equilibrar(corpo, pedidoDoCorpo(corpo, alvos0, 0.5), meioDoPe);
  const e0 = montarEmPe(corpo, pedidoDoCorpo(corpo, alvos0, 0), pelve);
  const alvos = alvosDe(corpo, e0);
  const e1 = montar(corpo, { alvos, pelve }, 0);
  // a âncora na altura da testa; a porta onde o tubo, com os braços estendidos, tem o comprimento pedido
  const alturaDaAlca = e1.cabeca.o[1] + f('ancora.acimaDoTragio');
  const alvo = f('elastico.esticaNoInicio') * obj(TUBO, 'comp');
  const zPorta = resolver1((z) => tubo(e1, portaEm(alturaDaAlca, z).alca).comp - alvo, 30, 250, 40);
  c = { alvos, pelve, alturaDaAlca, zPorta };
  CAL.set(corpo, c);
  return c;
}

/** O trecho do tubo longe do corpo, até a alça, desenhado como cenário (atrás do corpo e fora do enquadramento). */
function tuboAteAPorta(pts: V3[], estica: number): PecaPropria {
  return {
    t: 'propria',
    nome: 'tubo-ate-a-porta',
    cenario: true,
    desenhar(C, M) {
      const d = obj(TUBO, 'tuboDiam') / Math.sqrt(Math.max(1, estica));
      C.polilinha(pts, M.estofado[3]!, d + 0.5);
      C.polilinha(pts, M.estofado[1]!, d);
    },
  };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = montar(corpo, c, u, erro);
  const porta = portaEm(c.alturaDaAlca, c.zPorta);
  const t = tubo(e, porta.alca);
  const estica = Math.max(1, t.comp / obj(TUBO, 'comp'));
  // o trecho perto da mão é o elástico do exercício; o resto, até a âncora, é cenário
  const corte = (p: V3) => add(p, mul(norm(sub(porta.alca, p)), f('elastico.noQuadro')));
  const cR = corte(t.pR),
    cL = corte(t.pL);
  const pecas: Peca[] = [...porta.pecas, tuboAteAPorta([cR, t.pts[1]!, t.pts[2]!, cL], estica), { t: 'elastico', pts: [t.pR, cR], estica }, { t: 'elastico', pts: [t.pL, cL], estica }];
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, k === 'R' ? t.pR : t.pL, `pegador${k}`));
  return {
    esq: e,
    prims: [chao(-70, 70, -60, c.zPorta + 10), ...porta.prims, { t: 'fio', pts: t.pts, larg: obj(TUBO, 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp: t.comp, estica: true, objeto: TUBO }],
    cargas: [],
    marcas: { ancora: porta.alca, mao: e.lado.R.pegada, pegadorR: e.lado.R.pegada, pegadorL: e.lado.L.pegada },
    vies: { maoR: 1, maoL: 1 },
    // de cima, a cabeça fica dentro da silhueta dos ombros e o contorno único do Boneco não a desenhava (sobrava só o
    // calombo do rosto; auditoria das aprovadas antigas, 19/11): ela ganha o contorno próprio por cima do corpo (`cabeca`,
    // opção do Boneco)
    viesNaVista: { cima: { cabeca: 1 } },
  };
}

export const facePullElastico: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // o ombro de trás (principal) e as costas, a parte do meio do trapézio (secundário): a biblioteca
  papeis: { deltPost: 'p', trapMedInf: 's' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

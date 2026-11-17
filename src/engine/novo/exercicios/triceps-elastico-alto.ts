// Tríceps com elástico preso no alto, como na polia, no motor novo (primeira animação deste exercício: até aqui ele
// era só cartão de texto). Os números vêm da ficha (../dados/movimentos/triceps-elastico-alto.json).
// Em pé, de frente para uma porta fechada, com o meio do tubo com pegadores preso no topo dela (a âncora de porta do
// lado de lá, ../pecas-de-cena/elastico-ancora-no-alto.ts, como na puxada com elástico aprovada); uma ponta em cada mão.
// O corpo e o braço são os do tríceps na polia com corda aprovado (./triceps-corda.ts), montados pelo núcleo do corpo
// em pé (./polia-bracos.ts):
//  - o braço é uma direção fixa no tronco, colado ao lado das costelas: o cotovelo não sai do lugar;
//  - o antebraço dobra à frente, no plano do braço, de `cotovelo.alto` (mãos na altura do peito) a `cotovelo.baixo`
//    (braços retos); a pegada no pegador é de lado a lado (palmas para baixo em cima, para trás embaixo);
//  - o tubo vai reto de cada pegador até a alça da âncora; a porta fica onde, em cima, o tubo sobe a `cabo.inclinacao`
//    graus da vertical, como o cabo do tríceps na polia. A porta, a âncora e o trecho do tubo perto delas são cenário.
import ficha from '../dados/movimentos/triceps-elastico-alto.json';
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
import { add, dirRef, mix, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento } from './elastico-faixa';
import { equilibrar, montarEmPe, polegarDaPegada } from './polia-bracos';
import type { PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** A alça da âncora: o topo da porta menos o comprimento da alça (a da puxada com elástico aprovada). */
const ALTURA_DA_ALCA = obj('porta', 'vao') + obj('porta', 'altura') - obj('porta', 'alcaComp');
const CAL = new WeakMap<Corpo, { pelve: PelveParada; zPorta: number }>();

/** O braço do lado k: colado ao tronco (fixo no tórax), o antebraço dobrado `cotovelo` graus à frente. */
function braco(t: Tronco, k: Lado, frente: number, cotovelo: number): PoseBraco {
  const s = sinal(k),
    T = t.torax;
  const a = frente * rad,
    d = f('braco.paraDentro') * rad;
  // para o meio é para +x no lado direito (x negativo é o lado direito)
  const umero = dirRef(T, norm([-s * Math.sin(d), -Math.cos(a) * Math.cos(d), Math.sin(a) * Math.cos(d)]));
  const paraFrente = norm(perp(T.z, umero));
  const c = cotovelo * rad;
  const antebraco = norm(add(mul(umero, Math.cos(c)), mul(paraFrente, Math.sin(c))));
  const polo = mul(paraFrente, -1);
  return { umero, antebraco, polo, mao: { polegar: polegarDaPegada(umero, antebraco, polo, s, -f('maos.pronacao')), forma: 'pegada', diam: obj('elastico', 'pegadorDiam') } };
}

/** O corpo no instante u: os pés lado a lado (a bola de cada pé à frente do tornozelo, como no face pull com elástico aprovado). */
function pedido(corpo: Corpo, u: number, erro?: string): PedidoEmPe {
  const w = f('pes.meiaDistancia'),
    z = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
  // no erro dos cotovelos, em cima o braço vai à frente e volta ao lado do tronco enquanto as mãos descem
  const frente = erro === 'cotovelos' ? mix(f('erro.cotovelo.frente'), f('braco.frente'), suave(u)) : f('braco.frente');
  const cotovelo = mix(erro === 'cotovelos' ? f('erro.cotovelo.cotovelo') : f('cotovelo.alto'), f('cotovelo.baixo'), u);
  return {
    pes: { R: { bola: [-w, 0, z] }, L: { bola: [w, 0, z] } },
    joelho: f('joelho'),
    tronco: erro === 'tronco' ? mix(f('tronco'), f('erro.tronco.inclinacao'), suave(u)) : f('tronco'),
    toracica: erro === 'tronco' ? f('erro.tronco.toracica') * suave(u) : 0,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    bracos: (t) => ({ R: braco(t, 'R', frente, cotovelo), L: braco(t, 'L', frente, cotovelo) }),
  };
}

const portaEm = (zPorta: number) => portaComAncoraNoAlto(zPorta, ALTURA_DA_ALCA, true);

/** Onde a fita do pegador se junta ao tubo: na linha da mão à âncora. */
const pontaDoTubo = (e: Esq, k: Lado, alca: V3): V3 => add(e.lado[k].pegada, mul(norm(sub(alca, e.lado[k].pegada)), obj('elastico', 'fita')));

/** O tubo: do pegador direito, reto até a alça da âncora (dá a volta nela), e de volta ao pegador esquerdo. */
function tubo(e: Esq, alca: V3) {
  const pR = pontaDoTubo(e, 'R', alca),
    pL = pontaDoTubo(e, 'L', alca);
  const pts: V3[] = [pR, add(alca, [-0.5, 0, 0]), add(alca, [0.5, 0, 0]), pL];
  return { pts, comp: comprimento(pts), pR, pL };
}

function calibrar(corpo: Corpo) {
  let c = CAL.get(corpo);
  if (c) return c;
  const meioDoPe = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo') - corpo.m('pe.calcanharABola') / 2;
  // o quadril fica parado onde o centro de massa, com os braços no meio do caminho, cai sobre o meio do pé
  const pelve = equilibrar(corpo, pedido(corpo, 0.5), meioDoPe);
  // a porta: em cima, o tubo sobe das mãos à alça a `cabo.inclinacao` graus da vertical
  const e0 = montarEmPe(corpo, pedido(corpo, 0), pelve);
  const zPorta = resolver1((z) => {
    const alca = portaEm(z).alca;
    const m = mul(add(e0.lado.R.pegada, e0.lado.L.pegada), 0.5);
    return Math.atan2(alca[2] - m[2], alca[1] - m[1]) / rad - f('cabo.inclinacao');
  }, 0, 200, 40);
  c = { pelve, zPorta };
  CAL.set(corpo, c);
  return c;
}

/** O trecho do tubo longe do corpo, até a alça, desenhado como cenário (sai pela borda do quadro). */
function tuboAteAPorta(pts: V3[], estica: number): PecaPropria {
  return {
    t: 'propria',
    nome: 'tubo-ate-a-porta',
    cenario: true,
    desenhar(C, M) {
      const d = obj('elastico', 'tuboDiam') / Math.sqrt(Math.max(1, estica));
      C.polilinha(pts, M.estofado[3]!, d + 0.5);
      C.polilinha(pts, M.estofado[1]!, d);
    },
  };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = montarEmPe(corpo, pedido(corpo, u, erro), c.pelve);
  const porta = portaEm(c.zPorta);
  const t = tubo(e, porta.alca);
  const estica = t.comp / obj('elastico', 'comp');
  const corte = (p: V3) => add(p, mul(norm(sub(porta.alca, p)), f('elastico.noQuadro')));
  const cR = corte(t.pR),
    cL = corte(t.pL);
  const pecas: Peca[] = [...porta.pecas, tuboAteAPorta([cR, t.pts[1]!, t.pts[2]!, cL], estica), { t: 'elastico', pts: [t.pR, cR], estica }, { t: 'elastico', pts: [t.pL, cL], estica }];
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, k === 'R' ? t.pR : t.pL, `pegador${k}`));
  return {
    esq: e,
    prims: [chao(-70, 70, -60, c.zPorta + 10), ...porta.prims, { t: 'fio', pts: t.pts, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    fios: [{ id: 'elastico', comp: t.comp, estica: true }],
    cargas: [],
    marcas: { ancora: porta.alca, mao: e.lado.R.pegada, pegadorR: e.lado.R.pegada, pegadorL: e.lado.L.pegada },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const tricepsElasticoAlto: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'posterior'],
  quadro,
  // a biblioteca e a ficha da técnica: tríceps principal, sem secundário (como o tríceps na polia aprovado)
  papeis: { triceps: 'p' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

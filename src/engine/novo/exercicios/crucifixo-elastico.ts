// Crucifixo com elástico, no motor novo. Os números vêm da ficha (../dados/movimentos/crucifixo-elastico.json).
// Em pé, de costas para uma porta fechada, um pé à frente do outro, o tronco um pouco inclinado à frente; o meio do tubo
// com pegadores de 60 pol (../dados/objetos/elastico-tubo-longo.json) preso atrás, na altura do peito, numa âncora de porta (no vão do lado da dobradiça, a espuma do lado de
// lá; ../pecas-de-cena/elastico-ancora-no-alto.ts com a porta atrás). Cada mão segura um pegador, com o polegar para
// cima. O braço gira num arco quase horizontal, um pouco abaixo da linha do ombro, com o cotovelo dobrado no mesmo
// ângulo a série toda: das mãos na linha do corpo (alongado) até as duas mãos se encontrarem na frente da parte de
// baixo do peito ("abraçar uma árvore"). A distância até a porta sai do quanto o tubo já está esticado com os braços
// abertos. De cada pegador, o tubo vai para trás pelo lado de fora do braço e do tronco até a âncora
// (./elastico-faixa.ts contorna o corpo). A porta, a âncora e o trecho do tubo perto delas são cenário.
import ficha from '../dados/movimentos/crucifixo-elastico.json';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca, PecaPropria } from '../pecas';
import { portaComAncoraNoAlto } from '../pecas-de-cena/elastico-ancora-no-alto';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento, fioPorFora } from './elastico-faixa';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** O tubo de 60 pol com pegadores: com o de 48 pol, aberto, o tubo nunca fica frouxo (o erro "frouxo" não existiria). */
const TUBO = 'elasticoTuboLongo';
/** As partes que o tubo contorna, do pegador à âncora. */
const PARTES = ['ante', 'braco', 'tronco', 'cintura', 'emendaDaCintura', 'cabeca', 'pescoco'];

interface Pedido {
  /** Quanto o braço está aberto: 0 = apontando para a frente, 90 = para o lado (graus, no plano do arco). */
  abre: number;
  cotovelo: number;
  frente: number;
  lombar: number;
  toracica: number;
}
interface Cal {
  pelveY: number;
  pelveZ: number;
  abreAberto: number;
  abreFechado: number;
  zPorta: number;
  /** A porta no erro "frouxo": perto o bastante para o tubo ficar frouxo com os braços abertos. */
  zFrouxo: number;
}
const CAL = new WeakMap<Corpo, Cal>();

/** Um pé à frente do outro: o direito à frente, inteiro no chão; o esquerdo atrás, com o calcanhar um pouco levantado. */
function pernas(): Record<Lado, PosePerna> {
  const w = f('pes.meiaDistancia');
  return {
    R: { pe: { bola: [-w, 0, f('pe.frente.z')], dir: [-0.1, 0, 1], calc: 0 }, polo: [-0.15, 0, 1] },
    L: { pe: { bola: [w, 0, f('pe.tras.z')], dir: [0.1, 0, 1], calc: f('pe.tras.calcanhar') }, polo: [0.15, 0, 1] },
  };
}

/** O braço do lado k no arco, no referencial do tórax: aberto `abre` graus, um pouco abaixo da linha do ombro. */
function bracoNoArco(e: Esq, k: Lado, p: Pedido): PoseBraco {
  const s = sinal(k),
    T = e.torax;
  const A = p.abre * rad,
    B = f('braco.abaixo') * rad,
    c = p.cotovelo * rad;
  const umero = dirRef(T, [s * Math.sin(A) * Math.cos(B), -Math.sin(B), Math.cos(A) * Math.cos(B)]);
  // o antebraço dobra para o lado do abraço (para a frente e para o meio), no plano do arco
  const abraco = norm(dirRef(T, [-s * Math.cos(A), 0, Math.sin(A)]));
  const antebraco = norm(add(mul(umero, Math.cos(c)), mul(abraco, Math.sin(c))));
  return { umero, antebraco, polo: norm(add(mul(abraco, -1), dirRef(T, [0, 0.25, 0]))), mao: { polegar: dirRef(T, [0, 1, 0]), forma: 'pegada', diam: obj('elastico', 'pegadorDiam') } };
}

function montar(corpo: Corpo, pelveY: number, pelveZ: number, p: Pedido): Esq {
  const t = resolverTronco(corpo, { pelve: [0, pelveY, pelveZ], frente: p.frente, lombar: p.lombar, toracica: p.toracica, cervical: f('cervical'), cabeca: f('cabeca') });
  const P = pernas();
  const reto: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  let e = resolverMembros(t, { R: reto, L: reto }, P);
  // duas passadas: o ombro anda com o braço (o ritmo da cintura escapular)
  for (let i = 0; i < 2; i++) e = resolverMembros(t, { R: bracoNoArco(e, 'R', p), L: bracoNoArco(e, 'L', p) }, P);
  return e;
}

const pedidoBase = (abre: number): Pedido => ({ abre, cotovelo: f('cotovelo'), frente: f('tronco'), lombar: 0, toracica: 0 });

/** A âncora: atrás, no meio, na altura do peito; a porta com a face a `zPorta`. */
const portaEm = (corpo: Corpo, zPorta: number) => portaComAncoraNoAlto(zPorta, corpo.m('altura.peito') + f('ancora.acimaDoPeito'), false, 0, true);

/** Onde a fita do pegador se junta ao tubo: na linha da mão à âncora. */
const pontaDoTubo = (e: Esq, k: Lado, alca: V3): V3 => add(e.lado[k].pegada, mul(norm(sub(alca, e.lado[k].pegada)), obj(TUBO, 'fita')));

/** O tubo: do pegador direito, por fora do braço e do tronco, à alça da âncora, e de volta ao pegador esquerdo. */
function tubo(e: Esq, alca: V3) {
  const lado = (k: Lado) => {
    const ponta = pontaDoTubo(e, k, alca);
    const pts = fioPorFora(e, ponta, add(alca, [sinal(k) * 0.5, 0, 0]), { lado: [sinal(k), 0, -0.3], partes: PARTES, folga: f('elastico.folga'), fatia: 4 });
    return { pts, ponta };
  };
  const R = lado('R'),
    L = lado('L');
  const pts = [...R.pts, ...L.pts.slice().reverse()];
  return { pts, comp: comprimento(pts), R, L };
}

function calibrar(corpo: Corpo): Cal {
  let c = CAL.get(corpo);
  if (c) return c;
  let pelveY = 90,
    pelveZ = 0;
  const p0 = pedidoBase(60);
  for (let i = 0; i < 3; i++) {
    // a altura da pelve que dá o joelho pedido; a pelve à frente ou atrás até os dois joelhos dobrarem o mesmo (o elástico
    // puxa as mãos para trás: o centro de massa fica um pouco à frente do meio dos pés, e a conferência mede que ele fica
    // dentro do apoio)
    const z = pelveZ;
    pelveY = resolver1((y) => {
      const e = montar(corpo, y, z, p0);
      return e.lado.R.ang.joelho - f('joelho.frente');
    }, 70, 110, 40);
    const y = pelveY;
    pelveZ = resolver1((zz) => {
      const e = montar(corpo, y, zz, p0);
      return e.lado.L.ang.joelho - e.lado.R.ang.joelho;
    }, -30, 30, 40);
  }
  // aberto: as mãos na linha do corpo (o centro da pegada no plano dos ombros, visto de lado, no tórax)
  const abreAberto = resolver1((a) => {
    const e = montar(corpo, pelveY, pelveZ, pedidoBase(a));
    return paraRef(e.torax, e.lado.R.pegada)[2] - paraRef(e.torax, e.lado.R.ombro)[2] - f('maos.aberto.aFrente');
  }, 40, 130, 40);
  // fechado: as duas mãos se encontram na frente do peito
  const abreFechado = resolver1((a) => {
    const e = montar(corpo, pelveY, pelveZ, pedidoBase(a));
    return -paraRef(e.torax, e.lado.R.pegada)[0] - f('maos.fechado.meiaDistancia');
  }, -20, 60, 40);
  // a porta: onde o tubo estica o que a ficha pede com os braços abertos
  const eA = montar(corpo, pelveY, pelveZ, pedidoBase(abreAberto));
  const zPorta = resolver1((z) => tubo(eA, portaEm(corpo, z).alca).comp - f('elastico.esticaAberto') * obj(TUBO, 'comp'), -20, -200, 40);
  const zFrouxo = resolver1((z) => tubo(eA, portaEm(corpo, z).alca).comp - f('erro.frouxo.estica') * obj(TUBO, 'comp'), zPorta, -10, 40);
  c = { pelveY, pelveZ, abreAberto, abreFechado, zPorta, zFrouxo };
  CAL.set(corpo, c);
  return c;
}

function pedido(c: Cal, u: number, erro?: string): Pedido {
  const p = pedidoBase(mix(c.abreAberto, c.abreFechado, u));
  if (erro === 'supino') {
    // o cotovelo dobra no alongado e estica para fechar: o crucifixo vira um supino
    p.cotovelo = mix(f('erro.supino.cotovelo'), f('cotovelo'), suave(u));
  }
  if (erro === 'abrir') p.abre = mix(c.abreAberto + f('erro.abrir.alem'), c.abreFechado, u);
  if (erro === 'tronco') {
    // o tronco curva para fechar
    p.lombar = f('erro.tronco.lombar') * suave(u);
    p.toracica = f('erro.tronco.toracica') * suave(u);
  }
  return p;
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

/** Um trecho sem tensão: a reta entre as pontas, caída no meio o bastante para medir `comp` (só no erro "frouxo"). */
function caido(pts: V3[], comp: number): V3[] {
  const c0 = comprimento(pts);
  if (comp <= c0) return pts;
  const a = pts[0]!,
    b = pts[pts.length - 1]!;
  const meio = mul(add(a, b), 0.5);
  const cai = resolver1((h) => comprimento([a, add(meio, [0, -h, 0]), b]) - comp, 0, 80, 30);
  const out: V3[] = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const p = add(mul(a, 1 - t), mul(b, t));
    out.push(add(p, [0, -cai * 4 * t * (1 - t), 0]));
  }
  return out;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  // no erro "frouxo", a pessoa fica mais perto da porta: a porta anda para a frente
  const zPorta = erro === 'frouxo' ? c.zFrouxo : c.zPorta;
  const porta = portaEm(corpo, zPorta);
  const e = montar(corpo, c.pelveY, c.pelveZ, pedido(c, u, erro));
  const t = tubo(e, porta.alca);
  const repouso = obj(TUBO, 'comp');
  const estica = Math.max(1, t.comp / repouso);
  const pecas: Peca[] = [...porta.pecas];
  const lado = (k: Lado) => {
    const pts = k === 'R' ? t.R.pts : t.L.pts;
    // o trecho perto do corpo (os primeiros `elastico.noQuadro` cm a partir da mão) é o elástico; o resto, até a
    // âncora, é cenário (atrás do corpo e fora do enquadramento)
    const corte: V3[] = [];
    let andado = 0;
    corte.push(pts[0]!);
    for (let i = 1; i < pts.length; i++) {
      const d = dist(pts[i - 1]!, pts[i]!);
      if (andado + d >= f('elastico.noQuadro')) {
        corte.push(add(pts[i - 1]!, mul(norm(sub(pts[i]!, pts[i - 1]!)), f('elastico.noQuadro') - andado)));
        return { perto: corte, longe: [corte[corte.length - 1]!, ...pts.slice(i)] };
      }
      andado += d;
      corte.push(pts[i]!);
    }
    return { perto: corte, longe: [] as V3[] };
  };
  if (erro === 'frouxo' && t.comp <= repouso * f('erro.frouxo.estica') + 0.5) {
    // frouxo: sem tensão, o tubo cai um pouco no meio de cada trecho
    for (const k of LADOS) {
      const pts = k === 'R' ? t.R.pts : t.L.pts;
      pecas.push(tuboAteAPorta(caido(pts, comprimento(pts) * f('erro.frouxo.cai')), 1));
    }
  } else
    for (const k of LADOS) {
      const l = lado(k);
      pecas.push({ t: 'elastico', pts: l.perto, estica }, tuboAteAPorta(l.longe, estica));
    }
  for (const k of LADOS) pecas.push(pegadorNaMao(e.lado[k].pegada, e.lado[k].mao.x, (k === 'R' ? t.R : t.L).ponta, `pegador${k}`));
  return {
    esq: e,
    prims: [chao(-90, 90, zPorta - 10, 80), ...porta.prims, { t: 'fio', pts: t.pts, larg: obj(TUBO, 'tuboDiam'), cls: 'fita' }],
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

export const crucifixoElastico: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // o peito (principal) e a frente do ombro (secundário), como a ficha da técnica e a biblioteca
  papeis: { peitoral: 'p', deltAnt: 's' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

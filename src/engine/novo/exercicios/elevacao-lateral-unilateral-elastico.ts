// Elevação lateral unilateral com elástico preso sob o pé do outro lado, no motor novo (primeira animação deste
// exercício: até aqui ele era só cartão de texto). Os números vêm da ficha
// (../dados/movimentos/elevacao-lateral-unilateral-elastico.json).
// Em pé; o pé esquerdo pisa no tubo com pegadores perto de uma ponta (o resto do tubo, com o outro pegador, fica no
// chão do lado de fora do pé); a mão direita segura o pegador da outra ponta, e o tubo sobe do pé esquerdo cruzando à
// frente do corpo até ela. Só o braço direito sobe; a mão esquerda fica solta ao lado do corpo.
// O braço que sobe é o da elevação com elástico aprovada (./elevar-o-braco.ts: o úmero no plano da escápula, o
// cotovelo levemente dobrado e conduzindo, a pegada neutra). O que ele resolve, em vez de receber pronto:
//  - o corpo parado: a pelve na altura que dá a flexão do joelho da ficha e na posição para a frente em que o centro de
//    massa, com o braço no meio do caminho, cai sobre o meio do pé (como em ./elevar-o-braco.ts);
//  - embaixo, a elevação do braço em que o pegador fica à folga pedida da coxa;
//  - onde o pé pisa no tubo: o trecho entre o pé e a mão tem o comprimento em repouso que deixa o tubo já esticado
//    com o braço embaixo (a ficha: "a tensão já começa embaixo"); o resto do tubo fica no chão;
//  - o tubo esticado contorna as pernas e o corpo pela frente (./elastico-faixa.ts).
// No erro "inclinar o tronco", a coluna tomba para o lado do pé que pisa (a pelve fica: os pés estão no lugar); no erro
// do pé, o pé esquerdo fica na ponta e o tubo escorrega para a frente, como na rosca martelo com elástico.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/elevacao-lateral-unilateral-elastico.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca, PecaPropria } from '../pecas';
import { pegadorNaMao } from '../pecas-de-cena/elastico-pegador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, norm, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { folgaDasPernas } from './dobrar-o-quadril';
import { bracoDaRosca } from './dobrar-o-cotovelo';
import { comprimento, fioPorFora } from './elastico-faixa';
import { noPlano } from './elevar-o-braco';
import { bordasDaSola } from './rosca-elastico';
import { bordasNaPonta } from './rosca-martelo-elastico';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** As partes que o tubo contorna pela frente, do pé à mão. */
const PARTES = ['coxa', 'canela', 'pelve', 'cintura', 'emendaDaCintura', 'tronco'];

interface Pedido {
  /** A elevação do braço direito a partir do braço pendurado e o plano dele (graus). */
  a: number;
  plano: number;
  /** A clavícula direita além do ritmo normal (graus; o erro "encolher"). */
  elev: number;
  /** A coluna tombada para a esquerda (graus; o erro "inclinar o tronco"). */
  lado: number;
}
interface Pelve {
  y: number;
  z: number;
}

/** O braço direito, como em ./elevar-o-braco.ts: o úmero no plano, o cotovelo dobrado e conduzindo, a pegada neutra. */
function bracoQueSobe(T: Ref, p: Pedido): PoseBraco {
  const s = sinal('R');
  const n = noPlano(p.a, p.plano);
  const esp = (v: V3): V3 => dirRef(T, [s * v[0], v[1], v[2]]);
  const umero = esp(n.umero);
  const cot = f('cotovelo') * rad;
  const giro = f('cotovelo.giro') * Math.sin(Math.max(0, p.a) * rad) * rad;
  const dobra = norm(add(mul(esp(n.frente), Math.cos(giro)), mul(esp(n.sobe), -Math.sin(giro))));
  const antebraco = norm(add(mul(umero, Math.cos(cot)), mul(dobra, Math.sin(cot))));
  const pg = giro - f('polegar.paraCima') * Math.sin(Math.max(0, p.a) * rad) * rad;
  const polegar = norm(add(mul(esp(n.frente), Math.cos(pg)), mul(esp(n.sobe), -Math.sin(pg))));
  return { umero, antebraco, polo: mul(dobra, -1), mao: { polegar, forma: 'pegada', diam: obj('elastico', 'pegadorDiam') }, elev: p.elev };
}

/** A mão esquerda solta ao lado do corpo. */
const bracoLivre = (T: Ref): PoseBraco => bracoDaRosca(T, 'L', { paraFora: f('livre.paraFora'), aFrente: 0, cotovelo: f('livre.cotovelo'), supinacao: 0, forma: 'relaxada', diam: 3 });

/** Os pés na largura do quadril; no erro do pé, o esquerdo (o que pisa no elástico) fica na ponta. */
function pernas(corpo: Corpo, erro?: string): Record<Lado, PosePerna> {
  const w = f('pes.meiaDistancia'),
    z = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
  const pe = (k: Lado, calc: number): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, z], dir: [0, 0, 1], calc }, polo: [0, 0, 1] });
  return { R: pe('R', 0), L: pe('L', erro === 'pe' ? f('erro.pe.calcanhar') : 0) };
}

function montar(corpo: Corpo, pelve: Pelve, p: Pedido, erro?: string): Esq {
  const t = resolverTronco(corpo, { pelve: [0, pelve.y, pelve.z], frente: f('tronco'), lombarLado: p.lado * 0.5, toracicaLado: p.lado * 0.5, cervical: f('cervical'), cabeca: f('cabeca') });
  return resolverMembros(t, { R: bracoQueSobe(t.torax, p), L: bracoLivre(t.torax) }, pernas(corpo, erro));
}

/** O pegador atravessado na mão direita, como esferas, para a folga até as pernas (o de ./elevar-o-braco.ts). */
function esferasDoPegador(e: Esq) {
  const L = e.lado.R;
  const ra = obj('elastico', 'pegadorDiam') / 2,
    m = obj('elastico', 'pegadorComp') / 2;
  return [-1, -0.5, 0, 0.5, 1].map((s) => ({ c: add(L.pegada, mul(L.mao.x, s * m)), r: ra }));
}

/** O tubo: da ponta junto do pegador direito, cruzando à frente do corpo, até a borda de dentro da sola esquerda; por baixo do pé até a borda de fora. */
function trechoEsticado(e: Esq, sola: { fora: V3; dentro: V3 }) {
  const L = e.lado.R;
  const ponta = add(L.pegada, mul(norm(sub(sola.dentro, L.pegada)), obj('elastico', 'fita')));
  const sobe = fioPorFora(e, ponta, sola.dentro, { lado: [0, 0, 1], partes: PARTES, folga: f('elastico.folga'), fatia: 2.5, livreNasPontas: 3 });
  return { ponta, livre: sobe, ativo: comprimento(sobe) };
}

/** Corta a polilinha em pedaços de até `passo` cm: cada um é pintado na sua profundidade (o tubo passa na frente da canela e atrás da mão). */
function pedacos(pts: V3[], passo: number): V3[][] {
  const out: V3[][] = [];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!,
      b = pts[i]!;
    const n = Math.max(1, Math.ceil(dist(a, b) / passo));
    for (let k = 0; k < n; k++) out.push([add(a, mul(sub(b, a), k / n)), add(a, mul(sub(b, a), (k + 1) / n))]);
  }
  return out;
}

/**
 * O trecho esticado, desenhado como o tubo de ../equipamento.ts (afina na raiz do quanto estica), em pedaços de 4 cm,
 * cada um na sua profundidade: o tubo passa rente à frente da canela, e desenhado de uma vez sumia atrás dela.
 */
function tuboEmPedacos(pts: V3[], estica: number): PecaPropria {
  return {
    t: 'propria',
    nome: 'tubo',
    desenhar(C, M) {
      const d = obj('elastico', 'tuboDiam') / Math.sqrt(Math.max(1, estica));
      for (const p of pedacos(pts, 4)) {
        C.polilinha(p, M.estofado[3]!, d + 0.5);
        C.polilinha(p, M.estofado[1]!, d);
      }
    },
  };
}

function pedidoBase(a: number): Pedido {
  return { a, plano: f('plano'), elev: 0, lado: 0 };
}

/** O que vem calculado de antemão para o corpo: a pelve, a elevação do braço embaixo e o comprimento em repouso do trecho entre o pé e a mão. */
function calibrar(corpo: Corpo): { pelve: Pelve; a0: number; repouso: number } {
  return calibragem(corpo, `${F.id}:calibrar`, () => {
    const meioDoPe = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo') - corpo.m('pe.calcanharABola') / 2;
    let pelve: Pelve = { y: corpo.m('altura.trocanter'), z: 0 },
      a0 = 10;
    for (let i = 0; i < 4; i++) {
      const meio = pedidoBase(mix(a0, f('braco.topo'), 0.5));
      const z = pelve.z;
      const y = resolver1((yy) => montar(corpo, { y: yy, z }, meio).lado.R.ang.joelho - f('joelho'), 60, corpo.m('altura.trocanter') + 4, 26);
      pelve = { y, z: z - (centroDeMassa(montar(corpo, { y, z }, meio), 'homem')[2] - meioDoPe) };
      const pv = pelve;
      a0 = resolver1((a) => folgaDasPernas(montar(corpo, pv, pedidoBase(a)), esferasDoPegador(montar(corpo, pv, pedidoBase(a)))) - f('carga.folga'), 0, 45, 22);
    }
    const e0 = montar(corpo, pelve, pedidoBase(a0));
    const repouso = trechoEsticado(e0, bordasDaSola(corpo, e0, 'L')).ativo / f('elastico.esticaEmbaixo');
    return { pelve, a0, repouso };
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  // o braço passa do plano de baixo ao da subida (os dois são iguais na ficha; fica para o caso de mudarem)
  const p: Pedido = { a: mix(c.a0, f('braco.topo'), u), plano: mix(f('plano.baixo'), f('plano'), suave(u)), elev: 0, lado: 0 };
  if (erro === 'encolher') p.elev = f('erro.encolher.elev') * u;
  if (erro === 'embalo') p.lado = f('erro.inclinar.lado') * suave(u);
  const e = montar(corpo, c.pelve, p, erro);
  const sola = erro === 'pe' ? bordasNaPonta(corpo, e, 'L', f('erro.pe.escapa') * suave(u)) : bordasDaSola(corpo, e, 'L');
  const t = trechoEsticado(e, sola);
  // o resto do tubo: por baixo do pé, da borda de dentro à de fora, e no chão, para fora, até o outro pegador
  const sobPe = dist(sola.dentro, sola.fora);
  const sobra = Math.max(1, obj('elastico', 'comp') - c.repouso - sobPe);
  const fim: V3 = add(sola.fora, [sobra, 0, 0]);
  const rP = obj('elastico', 'pegadorDiam') / 2;
  const noChao: V3 = [fim[0] + obj('elastico', 'fita'), rP, fim[2]];
  const estica = t.ativo / c.repouso;
  const tudo = [...t.livre, sola.fora, fim];
  const pecas: Peca[] = [];
  // o trecho esticado, um pedaço por vez (cada um pintado na sua profundidade), e o resto, frouxo, no chão
  pecas.push(tuboEmPedacos(t.livre, estica));
  pecas.push({ t: 'elastico', pts: [sola.dentro, sola.fora, fim], estica: 1 });
  pecas.push(pegadorNaMao(e.lado.R.pegada, e.lado.R.mao.x, t.ponta, 'pegadorR'));
  pecas.push(pegadorNaMao(noChao, [0, 0, 1], fim, 'pegadorNoChao'));
  return {
    esq: e,
    prims: [chao(-90, 90, -70, 90), { t: 'fio', pts: tudo, larg: obj('elastico', 'tuboDiam'), cls: 'fita' }],
    pecas,
    // o tubo inteiro, de ponta a ponta (o trecho no chão não estica; o quanto estica o trecho livre é a regra
    // "elastico-unilateral-esticado-desde-embaixo", pela marca `trechoLivre`)
    fios: [{ id: 'elastico', comp: comprimento(tudo), estica: true }],
    cargas: [],
    marcas: { mao: e.lado.R.pegada, pegadorR: e.lado.R.pegada, solaLfora: sola.fora, solaLdentro: sola.dentro, trechoLivre: [t.ativo, c.repouso, 0] },
    vies: { maoR: 1 },
    // de cima, a cabeça fica dentro da silhueta dos ombros e o contorno único do Boneco não a desenhava (sobrava só o
    // calombo do rosto; auditoria de 18/11, G3): ela ganha o contorno próprio por cima do corpo (`cabeca`, opção do Boneco)
    viesNaVista: { cima: { cabeca: 1 } },
  };
}

export const elevacaoLateralUnilateralElastico: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // a lateral do ombro direito (principal, sem secundário: a ficha da técnica e a biblioteca) e a frente do ombro
  // listrada (só ajuda), como na elevação lateral unilateral na polia aprovada
  papeis: { 'deltLat:R': 'p', 'deltAnt:R': 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

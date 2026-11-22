// Abdominal no banco declinado, no motor novo. Os números vêm da ficha (../dados/movimentos/abdominal-declinado.json); o
// banco, da peça ../pecas-de-cena/banco-declinado.ts. É o abdominal no chão aprovado (./abdominal-chao.ts e o núcleo
// ./abdominal.ts) deitado num encosto a −20°: a bacia parada, a coluna enrolando, o pescoço acompanhando, as mãos
// cruzadas no peito. As pernas sobem do quadril até os rolos de trás dos joelhos e descem até os rolos da frente dos
// tornozelos (os pés presos).
//
// O que se resolve, em vez de receber pronto:
//  - o corpo deitado é o do núcleo dos abdominais, montado no chão (as costas, o glúteo e a cabeça encostando no chão,
//    medidos na superfície do Boneco) e levado para a face do encosto: o chão vira a face, girado o ângulo do declínio
//    em volta do eixo x. A bacia (`frente`) gira o mesmo ângulo;
//  - os rolos: cada par encosta na pele da perna (atrás dos joelhos e na frente dos tornozelos), amassando o que a ficha
//    pede, medido na superfície do Boneco.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/abdominal-declinado.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { bancoDeclinado, faceDoDeclinado } from '../pecas-de-cena/banco-declinado';
import type { BancoDeclinado } from '../pecas-de-cena/banco-declinado';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dot, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { baseDeCostas, bracosCruzados, troncoEnrolado } from './abdominal';
import type { BaseDeCostas, Enrolar } from './abdominal';
import { pelveAoChao } from './flexao-joelho';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const DECLINA = f('declina');
const { d: D, n: N } = faceDoDeclinado({ declina: DECLINA });
/** O meio da borda de cima da face do encosto, no mundo. */
const PONTA: V3 = [0, obj('bancoDeclinado', 'pontaAltura'), 0];

const maos = () => ({ x: f('maos.x'), y: f('maos.y'), abaixo: f('maos.abaixo'), acima: f('maos.acima'), poloFora: f('maos.poloFora'), poloPes: f('maos.poloPes'), poloTras: f('maos.poloTras') });

/**
 * Do chão para o banco: um ponto montado deitado no chão (o chão em y = 0, os pés para +z) vai para a face do encosto
 * (o chão vira a face, +z vira a subida dela, para os pés); `zPonta` é onde fica, no chão, a ponta de cima do encosto.
 */
const a = DECLINA * rad;
const girar = (p: V3): V3 => [p[0], p[1] * Math.cos(a) + p[2] * Math.sin(a), -p[1] * Math.sin(a) + p[2] * Math.cos(a)];
const noBanco = (p: V3, zPonta: number): V3 => add(PONTA, girar(sub(p, [0, 0, zPonta])));
/** A pose do tronco montada no chão, levada para o banco (a bacia gira o ângulo do declínio). */
function poseNoBanco(p: PoseTronco, zPonta: number): PoseTronco {
  return { ...p, pelve: noBanco(p.pelve, zPonta), frente: (p.frente ?? 0) + SINAL_DA_FRENTE * DECLINA };
}
/**
 * O sinal com que o declínio entra na inclinação da bacia: o que leva o tórax montado no chão para o mesmo lugar que o
 * ponto do chão girado (conferido na conta: a regra das costas no banco mede a pele contra a face).
 */
const SINAL_DA_FRENTE = -1;

interface Parado {
  b: BaseDeCostas;
  zPonta: number;
  tornozelo: V3;
  peDir: V3;
  polo: V3;
  joelho: V3;
  rolos: { joelho: V3; tornozelo: V3 };
}
const CACHE = new WeakMap<Corpo, Parado>();

/** As pernas presas: o tornozelo no lugar, os dedos e o joelho para onde a pose parada diz. */
function pernas(p: Pick<Parado, 'tornozelo' | 'peDir' | 'polo'>): Record<Lado, PosePerna> {
  const perna = (k: Lado): PosePerna => ({ tornozelo: [sinal(k) * Math.abs(p.tornozelo[0]), p.tornozelo[1], p.tornozelo[2]], peDir: p.peDir, polo: p.polo });
  return { R: perna('R'), L: perna('L') };
}
function montar(corpo: Corpo, t: Tronco, p: Pick<Parado, 'tornozelo' | 'peDir' | 'polo'>, bracos?: Record<Lado, PoseBraco>): Esq {
  return resolverMembros(t, bracos ?? bracosCruzados(corpo, t, maos()), pernas(p));
}

/** A distância de um ponto à face do encosto (cm; negativo = entra). */
export const daFace = (p: V3): number => dot(sub(p, PONTA), N);
/** s ao longo do encosto, a partir da ponta de cima (cm; positivo = para a cabeça). */
export const aoLongo = (p: V3): number => dot(sub(p, PONTA), D);

/**
 * Onde um rolo (eixo ao longo de x) encosta na pele de uma parte da perna direita, saindo de `de` na direção `dir` (no
 * plano de lado): a distância em que a pele mais perto fica a `r − amassa` do eixo.
 */
function roloEncostado(e: Esq, partes: string[], de: V3, dir: V3, r: number): V3 {
  const pele = pontosDoBoneco(e)
    .filter((x) => partes.includes(x.parte) && x.p[0] < 0)
    .map((x) => x.p);
  const folga = (t: number) => {
    const c = add(de, mul(dir, t));
    return Math.min(...pele.map((p) => Math.hypot(p[1] - c[1], p[2] - c[2]))) - (r - f('apoio.amassa'));
  };
  const t = resolver1(folga, 0, 25, 30);
  const c = add(de, mul(dir, t));
  return [0, c[1], c[2]];
}

function parado(corpo: Corpo): Parado {
  let c = CACHE.get(corpo);
  if (c) return c;
  const b = baseDeCostas(corpo, f('lombar.base'), f('ombro.z'));
  const zPonta = b.pose.pelve[2] + f('ponta.alemDoQuadril');
  const t = resolverTronco(corpo, poseNoBanco(b.pose, zPonta));
  // as pernas: a coxa sobe `coxa.angulo` acima da face, o joelho dobra `joelho`; as direções no chão, giradas para o banco
  const phi = f('coxa.angulo') * rad,
    psi = (f('coxa.angulo') - f('joelho')) * rad;
  const coxa = girar([0, Math.sin(phi), Math.cos(phi)]),
    canela = girar([0, Math.sin(psi), Math.cos(psi)]),
    peDir = girar([0, Math.sin(psi + Math.PI / 2), Math.cos(psi + Math.PI / 2)]),
    polo = norm(girar([0, Math.sin(phi - 0.5 * f('joelho') * rad + Math.PI / 2), Math.cos(phi - 0.5 * f('joelho') * rad + Math.PI / 2)]));
  const livres = resolverMembros(t, bracosCruzados(corpo, t, maos()), { R: { coxa, canela, peDir, polo }, L: { coxa, canela, peDir, polo } });
  const L = livres.lado.R;
  const fixo = { tornozelo: [-Math.abs(L.tornozelo[0]), L.tornozelo[1], L.tornozelo[2]] as V3, peDir, polo };
  // os rolos (a conta mede a pele: fica guardada para o corpo do app)
  const rolos = calibragem(corpo, `${F.id}:rolos`, () => {
    const e = montar(corpo, t, fixo);
    const K = e.lado.R;
    // atrás do joelho: no meio do ângulo entre a coxa e a canela, do lado de dentro
    const atras = norm(add(norm(sub(K.quadril, K.joelho)), norm(sub(K.tornozelo, K.joelho))));
    const joelho = roloEncostado(e, ['coxa', 'canela'], [0, K.joelho[1], K.joelho[2]], [0, atras[1], atras[2]], obj('bancoDeclinado', 'roloDiam') / 2);
    // na frente do tornozelo: 4 cm acima do centro dele, para o lado de fora do ângulo do joelho
    const cn = norm(sub(K.tornozelo, K.joelho));
    const frente = mul(norm(perp(sub(K.quadril, K.joelho), cn)), -1);
    const base = add(K.tornozelo, mul(cn, -4));
    const tornozelo = roloEncostado(e, ['canela', 'pe'], [0, base[1], base[2]], [0, frente[1], frente[2]], obj('bancoDeclinado', 'roloDiam') / 2);
    return { joelho, tornozelo };
  });
  c = { b, zPonta, ...fixo, joelho: L.joelho, rolos };
  CACHE.set(corpo, c);
  return c;
}
/** O banco na regulagem do corpo. */
export function bancoDoDeclinado(corpo: Corpo): BancoDeclinado {
  const p = parado(corpo);
  return { ponta: PONTA, declina: DECLINA, joelho: p.rolos.joelho, tornozelo: p.rolos.tornozelo };
}

/** Os braços estendidos, girados `graus` no ombro a partir de "ao longo do tronco, para trás da cabeça" (erro). */
function bracosJogados(t: Tronco, graus: number): Record<Lado, PoseBraco> {
  const g = graus * rad;
  // no referencial do tórax: y para a cabeça, z para a frente do peito; o braço gira de +y para a frente e para os pés
  const dir = dirRef(t.torax, [0, Math.cos(g), Math.sin(g)]);
  const braco = (k: Lado): PoseBraco => ({ umero: dir, antebraco: dir, polo: dirRef(t.torax, [sinal(k), 0, 0]), mao: { polegar: dirRef(t.torax, [0, 0, 1]), forma: 'relaxada' } });
  return { R: braco('R'), L: braco('L') };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const p = parado(corpo);
  const o: Enrolar = { toracica: f('toracica.topo') * u, lombar: f('lombar.topo') * u, cervical: f('cervical.topo'), cabeca: f('cabeca.topo') };
  let b = p.b;
  let bracos: ((t: Tronco) => Record<Lado, PoseBraco>) | undefined;
  if (erro === 'pescoco') {
    o.toracica *= f('erro.pescoco.toracica');
    o.lombar *= f('erro.pescoco.toracica');
    o.cervical = f('erro.pescoco.cervical');
    o.cabeca = f('erro.pescoco.cabeca');
  }
  if (erro === 'reta') {
    // a coluna não enrola: o quadril dobra e a bacia gira em volta do quadril (a coluna vai junto, reta), e a bacia
    // assenta de novo na face (como no erro de subir com o quadril do abdominal no chão aprovado)
    o.toracica = 0;
    o.lombar = 0;
    const frente = (b.pose.frente ?? 0) + f('erro.reta.quadril') * u;
    const t0 = resolverTronco(corpo, { ...b.pose, frente });
    b = { pose: { ...b.pose, frente, pelve: [b.pose.pelve[0], b.pose.pelve[1] - pelveAoChao(corpo, t0), b.pose.pelve[2]] } };
  }
  if (erro === 'impulso') bracos = (t) => bracosJogados(t, f('erro.impulso.braco') * suave(u));
  const tChao = troncoEnrolado(corpo, b, o, u);
  const t = resolverTronco(corpo, poseNoBanco(tChao.pose, p.zPonta));
  const e = montar(corpo, t, p, bracos?.(t));
  const B = bancoDeclinado(bancoDoDeclinado(corpo));
  return { esq: e, prims: [chao(-60, 60, -105, 60), ...B.prims], pecas: [B.peca], fios: [], cargas: [], marcas: {} };
}

export const abdominalDeclinado: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // o abdômen (principal; a biblioteca não dá secundário)
  papeis: { abdomen: 'p' },
  trajetorias: { ombros: (q) => q.esq.lado.R.ombro },
};

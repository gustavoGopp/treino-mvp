// Na fita de suspensão, com as duas mãos nos pegadores: o que a remada, a rosca, o tríceps e o T na suspensão têm em
// comum. Os pés ficam presos no chão (os calcanhares, com a ponta do pé para cima, ou a ponta dos pés, com o calcanhar
// levantado) e o corpo, reto como uma prancha, gira em torno do tornozelo. As mãos seguram os pegadores, e a fita
// (../pecas-de-cena/suspensao.ts) não estica: da âncora a cada pegador o caminho tem sempre o mesmo comprimento.
//
// É a geometria que manda. Cada variação diz onde ficam os braços em relação ao tronco a cada instante; o ângulo do
// corpo sai da fita: é o único em que o pegador fica, com aquele braço, à distância certa da âncora (`resolver1`). O
// comprimento da fita sai da posição inicial (o ângulo do corpo e onde ficam os pés, da ficha de cada exercício).
//
// Eixos: a pessoa olha para +z. De frente para a âncora, ela fica atrás da âncora e inclina para trás, com os pés
// além da vertical da âncora; de costas para a âncora, os pés ficam atrás dela e o corpo inclina para a frente.
import { pontosDoBoneco } from '../boneco';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Quadro } from '../movimento';
import { chao } from '../pecas';
import { comprimentoDaFita, fitaDeSuspensao, pontoDeDivisao } from '../pecas-de-cena/suspensao';
import type { FitaDeSuspensao } from '../pecas-de-cena/suspensao';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, comb, dirRef, dot, mix, mul, norm, perp, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { quadrilAoTornozelo } from './apoio-no-chao';

const rad = Math.PI / 180;

export type Sentido = 'de-frente' | 'de-costas';
/** Como a pessoa fica na fita: para que lado olha, onde os pés apoiam e como ficam a cabeça e os joelhos. */
export interface Montagem {
  sentido: Sentido;
  apoio: 'calcanhares' | 'ponta';
  /** Meia distância entre os pés (cm do meio do corpo). */
  pesMeia: number;
  /** Nos calcanhares: quanto a ponta do pé sobe do chão (graus). Na ponta dos pés: quanto o calcanhar sobe (graus). */
  pe: number;
  /** Onde o pé apoia (o fundo do calcanhar ou a bola do pé), em z, contado da vertical da âncora (+ = para onde a pessoa olha). */
  zPe: number;
  /** Quanto o joelho dobra (graus). */
  joelho: number;
  cervical: number;
  cabeca: number;
}
/** O ângulo do corpo da vertical (graus) e, nos erros, quanto o quadril dobra (graus) e a lombar arqueia. */
export interface Inclinacao {
  theta: number;
  dobra?: number;
  lombar?: number;
}
export interface Contexto {
  /** Onde a fita se divide (para onde cada fita puxa a mão). */
  divide: V3;
  /** O esqueleto da passada anterior (o ombro de verdade, que se move com o braço). */
  ant: Esq;
}
/** O que cada variação faz com os braços, dado o tronco. */
export type Bracos = (t: Tronco, c: Contexto) => Record<Lado, PoseBraco>;
export interface Montado {
  e: Esq;
  fita: FitaDeSuspensao;
  comp: number[];
}

/** Onde a fita se prende: a ponta de baixo da fita de ancoragem, na altura do fabricante, em x = 0 e z = 0. */
export const ancoraDaFita = (): V3 => [0, obj('suspensao', 'ancoraAltura'), 0];
/** Uma direção do mundo no referencial `r` (sem a origem). */
export const naRef = (r: Ref, d: V3): V3 => [dot(d, r.x), dot(d, r.y), dot(d, r.z)];
/** O pegador da mão: a mão fecha nele, com o diâmetro dele. */
export const maoNoPegador = (polegar: V3): PoseBraco['mao'] => ({ polegar, forma: 'pegada', diam: obj('suspensao', 'pegadorDiam') });

/**
 * O braço que sai do ombro na direção `dir` (a linha do ombro ao centro da pegada) com o cotovelo dobrado `dobra`
 * graus para o lado de `polo`: a pegada fica sobre a linha.
 */
export function bracoNaLinha(corpo: Corpo, dir: V3, polo: V3, dobra: number): { umero: V3; antebraco: V3 } {
  const ua = corpo.m('braco.comp'),
    fg = corpo.m('antebraco.comp') + corpo.m('mao.punhoAoCentroDaPegada');
  const fi = dobra * rad;
  const b1 = Math.atan2(fg * Math.sin(fi), ua + fg * Math.cos(fi)),
    b2 = fi - b1;
  let p = perp(polo, dir);
  if (Math.hypot(...p) < 1e-6) p = perp([0, 1, 0], dir);
  p = norm(p);
  return { umero: norm(comb([Math.cos(b1), dir], [Math.sin(b1), p])), antebraco: norm(comb([Math.cos(b2), dir], [-Math.sin(b2), p])) };
}
/** O antebraço que dobra `graus` a partir da linha do braço, em direção a `para` (a cabeça, numa rosca). */
export function dobrar(umero: V3, para: V3, graus: number): V3 {
  const p = norm(perp(para, umero));
  return norm(comb([Math.cos(graus * rad), umero], [Math.sin(graus * rad), p]));
}

/**
 * Os braços da remada (e dos erros que viram remada): o braço vai, no referencial do tronco, da direção `d0` (os braços
 * estendidos na linha da fita) até `d1` (para trás e para baixo, rente ao tronco), e o antebraço fica sempre na linha
 * da fita, que puxa a mão em direção à âncora: a mão fica onde a fita deixa. A escápula acompanha (`elev`, `prot`).
 * `d0` e `d1` são do lado esquerdo; o direito espelha x.
 */
export function bracosDeRemada(corpo: Corpo, d0: V3, d1: V3, u: number, escapula: { elev: number; prot: number }, polegar: (T: Ref, k: Lado) => V3): Bracos {
  return (t, c) => {
    const T = t.torax;
    const lado = (k: Lado): PoseBraco => {
      const s = sinal(k);
      const umero = dirRef(T, norm([s * mix(d0[0], d1[0], u), mix(d0[1], d1[1], u), mix(d0[2], d1[2], u)]));
      const cot = add(c.ant.lado[k].ombro, mul(umero, corpo.m('braco.comp')));
      return { umero, antebraco: norm(sub(c.divide, cot)), polo: dirRef(T, [s * 0.35, -0.45, -1]), mao: maoNoPegador(polegar(T, k)), elev: escapula.elev, prot: escapula.prot };
    };
    return { R: lado('R'), L: lado('L') };
  };
}

export function criarNaFita(M: Montagem) {
  const sigma = M.sentido === 'de-frente' ? -1 : 1;
  const AJUSTE = new WeakMap<Corpo, number>();
  const A = ancoraDaFita();

  /** As pernas e o tornozelo (no plano do meio do corpo), com o pé preso no chão. `aj` sobe o pé para ele não afundar. */
  function pes(corpo: Corpo, thL: number, aj: number): { pernas: Record<Lado, PosePerna>; tornozelo: V3 } {
    const hM = corpo.m('altura.maleolo');
    const polo: V3 = [0, -sigma * Math.sin(thL * rad), Math.cos(thL * rad)];
    if (M.apoio === 'calcanhares') {
      // o calcanhar no chão e a ponta do pé para cima: o tornozelo sai do calcanhar, pela forma do pé
      const a = M.pe * rad;
      const zf: V3 = [0, Math.sin(a), Math.cos(a)],
        yf: V3 = [0, Math.cos(a), -Math.sin(a)];
      const tornozelo = comb([1, [0, aj, M.zPe]], [hM, yf], [corpo.m('pe.calcanharAoTornozelo'), zf]);
      const perna = (k: Lado): PosePerna => ({ tornozelo: [sinal(k) * M.pesMeia, tornozelo[1], tornozelo[2]], peDir: zf, polo });
      return { pernas: { R: perna('R'), L: perna('L') }, tornozelo };
    }
    // na ponta dos pés: a bola do pé no chão e o calcanhar levantado e parado (como no apoio no chão)
    const r = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo'),
      c = M.pe * rad;
    const tornozelo: V3 = [0, hM * Math.cos(c) + r * Math.sin(c), M.zPe - r * Math.cos(c) + hM * Math.sin(c)];
    const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * M.pesMeia, 0, M.zPe], dir: [0, 0, 1], calc: M.pe }, polo });
    return { pernas: { R: perna('R'), L: perna('L') }, tornozelo };
  }

  const PENDURADO: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };

  function montarCom(corpo: Corpo, inc: Inclinacao, bracos: Bracos, aj: number): Montado {
    const dobra = inc.dobra ?? 0;
    // no erro do quadril, as pernas deitam mais e o tronco fica mais em pé: o quadril dobra `dobra` graus
    const thL = inc.theta + dobra / 2,
      thT = inc.theta - dobra / 2;
    const { pernas, tornozelo } = pes(corpo, thL, aj);
    const d = quadrilAoTornozelo(corpo, M.joelho);
    const pelve: V3 = [0, tornozelo[1] + d * Math.cos(thL * rad), tornozelo[2] + sigma * d * Math.sin(thL * rad)];
    const t = resolverTronco(corpo, { pelve, frente: sigma * thT, lombar: inc.lombar ?? 0, cervical: M.cervical, cabeca: M.cabeca });
    let e = resolverMembros(t, { R: PENDURADO, L: PENDURADO }, pernas);
    let divide: V3 = add(A, [0, -30, 0]);
    let fita: FitaDeSuspensao = { ancora: A, pegadores: [] };
    // o ombro anda com o braço e a fita se divide no meio das mãos: algumas passadas até assentar
    for (let i = 0; i < 6; i++) {
      e = resolverMembros(t, bracos(t, { divide, ant: e }), pernas);
      fita = { ancora: A, pegadores: LADOS.map((k) => ({ tipo: 'mao' as const, ponto: e.lado[k].pegada, lado: e.lado[k].mao.x })) };
      divide = pontoDeDivisao(fita);
    }
    return { e, fita, comp: comprimentoDaFita(fita) };
  }

  /** Quanto o pé precisa subir para a superfície dele não passar do chão (o calcanhar é redondo). */
  function ajuste(corpo: Corpo): number {
    let a = AJUSTE.get(corpo);
    if (a !== undefined) return a;
    if (M.apoio === 'ponta') a = 0;
    else {
      const { e } = montarCom(corpo, { theta: 30 }, () => ({ R: PENDURADO, L: PENDURADO }), 0);
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe') min = Math.min(min, p[1]);
      a = -min;
    }
    AJUSTE.set(corpo, a);
    return a;
  }

  const montar = (corpo: Corpo, inc: Inclinacao, bracos: Bracos): Montado => montarCom(corpo, inc, bracos, ajuste(corpo));
  const compMedio = (m: Montado) => (m.comp[0]! + m.comp[1]!) / 2;

  /** O ângulo do corpo em que a fita, com esses braços, tem o comprimento `comp` (a fita não estica). */
  function inclinacaoPelaFita(corpo: Corpo, comp: number, inc: Omit<Inclinacao, 'theta'>, bracos: Bracos, lo: number, hi: number): number {
    return resolver1((th) => compMedio(montar(corpo, { ...inc, theta: th }, bracos)) - comp, lo, hi, 32);
  }

  /** Os braços retos, na linha da fita (o começo da remada, da rosca e do T): o pegador fica na reta do ombro à divisão. */
  const bracosNaFita =
    (corpo: Corpo, dobra: number, polo: (T: Ref, k: Lado) => V3, polegar: (T: Ref, k: Lado) => V3, escapula: { elev: number; prot: number } = { elev: 0, prot: 0 }): Bracos =>
    (t, c) => {
      const lado = (k: Lado): PoseBraco => ({ ...bracoNaLinha(corpo, norm(sub(c.divide, c.ant.lado[k].ombro)), polo(t.torax, k), dobra), polo: polo(t.torax, k), mao: maoNoPegador(polegar(t.torax, k)), ...escapula });
      return { R: lado('R'), L: lado('L') };
    };

  /** O quadro: o chão, a fita com os dois pegadores e o comprimento de cada fita (que a conferência mede). */
  function quadro(m: Montado, marcas: Record<string, V3> = {}): Quadro {
    const S = fitaDeSuspensao({ ...m.fita, vigaComoCenario: true });
    return {
      esq: m.e,
      prims: [chao(-90, 90, -170, 170), ...S.prims],
      pecas: [S.cenario!, S.peca],
      fios: [
        { id: 'fita direita', comp: S.comp[0]!, estica: false },
        { id: 'fita esquerda', comp: S.comp[1]!, estica: false },
      ],
      cargas: [],
      marcas: { ancora: A, divide: pontoDeDivisao(m.fita), 'pegador.R': m.fita.pegadores[0]!.ponto, 'pegador.L': m.fita.pegadores[1]!.ponto, ...marcas },
    };
  }

  return { montar, inclinacaoPelaFita, bracosNaFita, quadro, compMedio, sigma, ancora: A };
}
export type NaFita = ReturnType<typeof criarNaFita>;

/** O ângulo do corpo da vertical (graus), de lado: do tornozelo ao ombro. */
export function anguloDoCorpo(e: Esq): number {
  const L = e.lado.R;
  return Math.abs(Math.atan2(L.ombro[2] - L.tornozelo[2], L.ombro[1] - L.tornozelo[1])) / rad;
}

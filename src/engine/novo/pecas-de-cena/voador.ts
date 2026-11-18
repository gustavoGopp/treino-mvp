// Peça de cena: o voador (peck deck), a máquina do voador e do voador invertido. Medidas em ../dados/objetos/voador.json:
// o tamanho total vem das fichas da Movement (Next Pec Fly / Rear Delt, 199 cm de altura), da Life Fitness (SS-FLY), da
// Precor (RSL0505: torre de 148 cm, estofados de 6,5 cm, posição inicial regulável em 120°) e da Hammer Strength. O que
// faz a máquina funcionar não aparece em nenhuma ficha: sai do corpo da tabela sentado nela, com o motivo. Parte do
// cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `voador`): o assento, o encosto, a coluna atrás dele
// com os eixos no alto, os braços que saem dos eixos para o lado e descem até os pegadores, e a torre das placas.
//
// A máquina funciona: cada braço gira num eixo vertical no alto, sobre o centro de um ombro de quem senta ("rotate the
// handles out and about the shoulder", Life Fitness); por isso o pegador descreve um arco em volta do ombro e o cotovelo
// não precisa dobrar nem esticar. No voador, quem senta fica de costas para o encosto e segura os pegadores verticais; no
// invertido, senta virado para o encosto, com o peito nele, e segura os pegadores horizontais, que saem do braço para o
// lado. O encosto anda na guia (no invertido ele recua, para o peito encostar com o ombro ainda sob o eixo) e o assento
// sobe e desce. O came no alto de cada eixo enrola o cabo, e as placas do pino sobem o arco do came (raio × ângulo girado
// desde a posição inicial, a média dos dois braços).
//
// Referencial da máquina: quem senta no voador olha para +z; os eixos ficam em x = ±eixoMeiaDistancia, z = 0. O ângulo
// de cada braço (`alfa`, graus) é medido a partir de +z, para fora: 0 = para a frente de quem senta no voador, 90 = para
// o lado, 180 = para trás (para a coluna). No mundo da cena, quem senta sempre olha para +z: no invertido, a máquina é
// girada meia volta em torno do eixo vertical que passa entre os dois eixos (x → −x, z → −z).
import type { Prim } from '../desenho';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('voador', id);
const rad = Math.PI / 180;

export type ModoDoVoador = 'voador' | 'invertido';

/** As regulagens e o instante da máquina. */
export interface Voador {
  modo: ModoDoVoador;
  /** O ângulo de cada braço (graus, no referencial da máquina), pelo lado do corpo de quem senta. */
  alfa: Record<Lado, number>;
  /** A posição inicial (graus): os braços descansam nela, com as placas embaixo. */
  inicio: number;
  /** Quantas placas estão no pino. */
  placas?: number;
}

/** Leva um ponto (ou uma direção) do referencial da máquina para o mundo da cena. */
export const noMundo = (modo: ModoDoVoador, p: V3): V3 => (modo === 'voador' ? p : [-p[0], p[1], -p[2]]);
/** O lado da máquina (−1 = x negativo no referencial dela) em que fica o braço do lado `k` de quem senta. */
export const ladoDaMaquina = (modo: ModoDoVoador, k: Lado): -1 | 1 => (modo === 'voador' ? sinal(k) : -sinal(k)) as -1 | 1;
/**
 * O ângulo do braço da máquina com a mão `psi` graus aberta a partir da frente de quem senta (0 = à frente, 90 = para o
 * lado), vista do eixo. O pegador fica ao lado do braço da máquina: o vertical, do lado para onde o voador fecha; o
 * horizontal, do lado para onde o invertido fecha (para a frente de quem senta virado para o encosto).
 */
export function alfaDaMao(modo: ModoDoVoador, psi: number): number {
  if (modo === 'voador') return psi + Math.atan2(g('pegadorAoLado'), g('raio')) / rad;
  return 180 - psi - Math.atan2(g('alcaPega'), g('raio') + g('alcaFora')) / rad;
}

/** O eixo do braço do lado `k` de quem senta, no mundo (na altura do cubo). */
export const eixoDoBraco = (modo: ModoDoVoador, k: Lado): V3 => noMundo(modo, [ladoDaMaquina(modo, k) * g('eixoMeiaDistancia'), g('eixoAltura'), 0]);

/**
 * As direções do braço do lado `s` da máquina, no referencial dela: `ao` (do eixo para fora, ao longo do braço) e `tras`
 * (para onde o ângulo cresce: para trás, para a coluna).
 */
export function eixosDoBraco(s: -1 | 1, alfa: number): { ao: V3; tras: V3 } {
  const a = alfa * rad;
  return { ao: [s * Math.sin(a), 0, Math.cos(a)], tras: [s * Math.cos(a), 0, -Math.sin(a)] };
}
/** Um ponto do braço (`r` ao longo dele, a partir do eixo; `y` de altura; `t` para trás), no referencial da máquina. */
function noBraco(s: -1 | 1, alfa: number, r: number, y: number, t = 0): V3 {
  const { ao, tras } = eixosDoBraco(s, alfa);
  return [s * g('eixoMeiaDistancia') + ao[0] * r + tras[0] * t, y, ao[2] * r + tras[2] * t];
}

/** O centro do pegador vertical (voador) do lado `k` de quem senta, no mundo. */
export const pegadorVertical = (modo: ModoDoVoador, k: Lado, alfa: number): V3 => noMundo(modo, noBraco(ladoDaMaquina(modo, k), alfa, g('raio'), g('pegadorAltura'), -g('pegadorAoLado')));
/** O centro da mão no pegador horizontal (invertido) do lado `k`, e a direção dele (do braço para a ponta), no mundo. */
export function pegadorHorizontal(modo: ModoDoVoador, k: Lado, alfa: number): { centro: V3; dir: V3 } {
  const s = ladoDaMaquina(modo, k);
  return { centro: noMundo(modo, noBraco(s, alfa, g('raio') + g('alcaFora'), g('alcaAltura'), g('alcaPega'))), dir: noMundo(modo, eixosDoBraco(s, alfa).tras) };
}

/** Quanto as placas sobem (cm): o arco do came, a média dos dois braços, a partir da posição inicial. */
export function subidaDoVoador(m: Pick<Voador, 'alfa' | 'inicio'>): number {
  return ((Math.max(0, m.inicio - m.alfa.R) + Math.max(0, m.inicio - m.alfa.L)) / 2) * rad * g('cameRaio');
}

/** A câmera olha de cima, a pino (o gerador devolve o giro da câmera em `rot`, sem tipo em base.d.mts). */
const deCima = (C: Parameters<PecaPropria['desenhar']>[0]) => Math.abs((C as unknown as { rot(v: V3): V3 }).rot([0, 1, 0])[2]) > 0.9;

/** O encosto na regulagem do modo: a borda de baixo da face, a direção que sobe por ela e a que sai dela (para quem senta). */
export function encostoDoVoador(modo: ModoDoVoador) {
  const inc = g('encostoInclina') * rad;
  const atras = modo === 'voador' ? g('encostoAtrasVoador') : g('encostoAtrasInvertido');
  const base: V3 = [0, g('encostoBaixo'), -atras];
  const sobe: V3 = [0, Math.cos(inc), -Math.sin(inc)];
  const frente: V3 = [0, Math.sin(inc), Math.cos(inc)];
  return { base, sobe, frente, comp: g('encostoComp'), larg: g('encostoLarg'), esp: g('estofadoEsp') };
}
/** A altura do assento na regulagem do modo. */
export const assentoDoVoador = (modo: ModoDoVoador) => (modo === 'voador' ? g('assentoVoador') : g('assentoInvertido'));

/**
 * O voador: os volumes para a conferência (o assento, o encosto, a coluna e o apoio dos pés, onde o corpo encosta e que
 * ele não pode atravessar), a estrutura parada, a parte que se mexe (os braços com os pegadores, os cames, os cabos e as
 * placas) e os pontos que o exercício lê. Tudo no mundo da cena.
 */
export function voador(m: Voador) {
  const W = (p: V3) => noMundo(m.modo, p);
  const a = g('eixoMeiaDistancia'),
    est = g('estrutura'),
    tubo = g('tubo'),
    topo = g('alturaTotal'),
    yE = g('eixoAltura'),
    yB = g('bracoAltura');
  const zC = -g('colunaAtras');
  const E = encostoDoVoador(m.modo);
  const hA = assentoDoVoador(m.modo);
  const esp = g('estofadoEsp');
  const aComp = g('assentoComp'),
    aLarg = g('assentoLarg'),
    zA0 = g('assentoTras'),
    zA1 = zA0 + aComp;
  const zPost = (zA0 + zA1) / 2;
  // a torre: atrás da coluna e à esquerda de quem senta no voador (x positivo)
  const xT0 = g('torreAoLado'),
    xT1 = xT0 + g('torreLarg'),
    zT1 = -g('torreAtras'),
    zT0 = zT1 - g('torreProf');
  const xTm = (xT0 + xT1) / 2,
    zTm = (zT0 + zT1) / 2;
  const H = g('alturaTorre');
  // o meio do encosto e a guia que o prende na coluna
  const meioEnc = add(add(E.base, mul(E.sobe, E.comp / 2)), mul(E.frente, -esp));
  // de cima (a pino), a viga, os eixos e os braços que saem deles ficam sobre a cabeça e os braços de quem senta e os
  // cobririam: ficam de fora, como se um corte horizontal os tirasse acima dos pegadores (o mesmo corte da travessa do
  // smith); de cima, o braço da máquina aparece só da altura do corte para baixo, nos pegadores
  const yCorte = Math.max(g('alcaAltura'), g('pegadorAltura') + g('pegadorComp') / 2) + 8;
  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o: W(o), x: W(x), y: W(y), z: W(z) }, meias, cls, vies: 0.5 });
  const X: V3 = [1, 0, 0],
    Y: V3 = [0, 1, 0],
    Z: V3 = [0, 0, 1];
  const prims: Prim[] = [
    caixa([0, hA - esp / 2, (zA0 + zA1) / 2], X, Y, Z, [aLarg / 2, esp / 2, aComp / 2], 'estofado'),
    caixa(add(add(E.base, mul(E.sobe, E.comp / 2)), mul(E.frente, -esp / 2)), X, E.frente, E.sobe, [E.larg / 2, esp / 2, E.comp / 2], 'estofado'),
    caixa([0, topo / 2, zC], X, Y, Z, [est / 2, topo / 2, est / 2], 'coluna'),
  ];

  const fixa: PecaPropria = {
    t: 'propria',
    nome: 'voador',
    fixa: m.modo,
    // o enquadramento conta a máquina menos a torre, que fica ao lado (de cima, ela alargava o quadro e encolhia o
    // corpo); ela fica dentro do quadro de frente e de lado, e de cima é cortada pela borda
    noQuadro: [
      [-a - 6, 0, zC - est / 2],
      [a + 6, 0, zC - est / 2],
      [a + 6, topo, zC - est / 2],
      [-a - 6, topo, zA1],
      [aLarg / 2, 0, zA1],
    ].map((p) => W(p as V3)),
    desenhar(C, M, o) {
      const T = (p: V3, q: V3, w = est, mat = M.metal) => C.tubo(W(p), W(q), w, w, mat);
      // a base no chão: a espinha do assento à coluna e à torre, as travessas da frente, da coluna e da torre
      const yb = est / 2;
      T([0, yb, zA1 - 2], [0, yb, zC]);
      T([-26, yb, zA1 - 2], [26, yb, zA1 - 2]);
      T([-26, yb, zC], [xT1, yb, zC]);
      T([xTm, yb, zC], [xTm, yb, zT0 + 2]);
      T([xT0 - 6, yb, zT0 + 2], [xT1 + 2, yb, zT0 + 2]);
      // a coluna, a viga até os eixos e a travessa dos eixos (de cima, cortadas)
      T([0, est, zC], [0, topo - est, zC]);
      const cima = deCima(C);
      if (!cima) {
      T([0, topo - est / 2, zC - est / 2], [0, topo - est / 2, est / 2 + 2]);
      T([-a - 7, topo - est / 2, 0], [a + 7, topo - est / 2, 0]);
      // as caixas dos mancais, embaixo da travessa
      for (const s of [-1, 1]) C.cilindro(W([s * a, yE + 6, 0]), W([s * a, topo - est, 0]), 4.4, M.metalClaro, { lados: 14 });
      // a polia dupla no fim da viga, sobre a coluna, por onde os cabos passam para a torre
      C.cilindro(W([-2, topo - est - 6, zC + 6]), W([2, topo - est - 6, zC + 6]), 5, M.metalClaro, { lados: 16 });
      }
      // a guia do encosto: a luva na coluna, com o pino, e o tubo que corre dentro dela até as costas do estofado
      const yG = meioEnc[1];
      T([0, yG, zC + est / 2], [0, yG, zC + est / 2 + 12], est + 2, M.metalClaro);
      C.cilindro(W([0, yG + est / 2 + 1, zC + est / 2 + 6]), W([0, yG + est / 2 + 4, zC + est / 2 + 6]), 1.4, M.cromo, { lados: 8 });
      T([0, yG, zC + est / 2 + 2], [0, yG, meioEnc[2] - 1.5], 5);
      T([-E.larg / 2 + 4, yG, meioEnc[2] - 1.5], [E.larg / 2 - 4, yG, meioEnc[2] - 1.5], 4);
      C.estofado(W(meioEnc), W(E.sobe), W(E.frente), W(X), E.comp, esp, E.larg);
      // o assento: a coluna de baixo, a que sobe dentro dela (a regulagem) e o estofado
      T([0, est, zPost], [0, 30, zPost], 7);
      T([0, 30, zPost], [0, hA - esp - 2, zPost], 5.5, M.cromo);
      T([0, hA - esp - 3, zPost - 12], [0, hA - esp - 3, zPost + 12], 5);
      C.cilindro(W([4, 32, zPost]), W([10, 32, zPost + 4]), 1.2, M.cromo, { lados: 8 });
      C.estofado(W([0, hA - esp, (zA0 + zA1) / 2]), W(Z), W(Y), W(X), aComp, esp, aLarg);
      // a torre: quatro montantes, a tampa, as guias das placas e a polia do alto
      for (const [x, z] of [
        [xT0, zT0],
        [xT1, zT0],
        [xT0, zT1],
        [xT1, zT1],
      ] as [number, number][])
        T([x, est, z], [x, H, z], 4.5);
      for (const z of [zT0, zT1]) T([xT0, H, z], [xT1, H, z], 4.5);
      for (const x of [xT0, xT1]) T([x, H, zT0], [x, H, zT1], 4.5);
      for (const dx of [-8, 8]) C.cilindro(W([xTm + dx, est, zTm]), W([xTm + dx, H - 6, zTm]), 0.8, M.cromo, { lados: 8 });
      C.cilindro(W([xTm, H + 4, zT1 + 2]), W([xTm, H + 4, zT1 - 2]), 5, M.metalClaro, { lados: 16 });
      if (o.comSombra) {
        const c = W([(xT1 - a - 64) / 2, 0, (zC + zA1) / 2]);
        C.sombra(c[0], c[2], (xT1 + a + 64) / 2, (zA1 - zC) / 2 + 10, 0.18);
      }
    },
  };

  const subida = subidaDoVoador(m);
  const n = g('pilhaPlacas'),
    k = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  const lados: Lado[] = ['R', 'L'];
  const R = g('raio'),
    yV = g('pegadorAltura'),
    pc = g('pegadorComp'),
    yH = g('alcaAltura');
  const movel: PecaPropria = {
    t: 'propria',
    nome: 'braços do voador',
    // no enquadramento, os braços contam inteiros (os pegadores e as pontas)
    noQuadro: lados.flatMap((kk) => {
      const s = ladoDaMaquina(m.modo, kk),
        al = m.alfa[kk];
      return [noBraco(s, al, R + 3, yB + 3), noBraco(s, al, R + 3, yV - pc / 2 - 4), noBraco(s, al, R, yV, -g('pegadorAoLado') - 3), noBraco(s, al, R, yH, g('alcaComp') + 2)].map(W);
    }),
    desenhar(C, M) {
      const cima = deCima(C);
      for (const kk of lados) {
        const s = ladoDaMaquina(m.modo, kk),
          al = m.alfa[kk];
        const B = (r: number, y: number, t = 0) => W(noBraco(s, al, r, y, t));
        const T = (p: V3, q: V3, w = tubo, mat = M.metal) => C.tubo(p, q, w, w, mat, { up: [0, 1, 0] });
        if (!cima) {
          // o eixo que gira dentro do mancal e o came no alto, que enrola o cabo
          C.cilindro(B(0, yB - 3), B(0, yE + 6), 3.2, M.cromo, { lados: 12 });
          C.cilindro(B(0, topo - est - 9), B(0, topo - est - 5), g('cameRaio'), M.metalClaro, { lados: 22 });
          // o braço: sai do eixo para fora, faz a curva e desce até o pegador vertical
          T(B(0, yB), B(R - 4, yB));
          T(B(R - 4, yB), B(R, yB - 4));
        }
        // o braço desce até embaixo do pegador vertical
        const yTopoPeg = yV + pc / 2 + 2,
          yPePeg = yV - pc / 2 - 2,
          tv = -g('pegadorAoLado');
        T(B(R, cima ? yCorte : yB - 4), B(R, yPePeg - 2));
        // o pegador vertical (voador): preso ao braço por duas travessas, ao lado dele, com a borracha
        T(B(R, yTopoPeg, 0), B(R, yTopoPeg, tv), 3.4);
        T(B(R, yPePeg, 0), B(R, yPePeg, tv), 3.4);
        C.cilindro(B(R, yTopoPeg + 1.7, tv), B(R, yPePeg - 1.7, tv), 1.2, M.metal, { lados: 10 });
        C.cilindro(B(R, yV + pc / 2, tv), B(R, yV - pc / 2, tv), g('pegadorDiam') / 2, M.borracha, { lados: 12 });
        // o pegador horizontal (invertido): sai do braço para o outro lado, com a borracha
        const aC = g('alcaComp'),
          rA = R + g('alcaFora');
        T(B(rA, yH, 0), B(rA, yH, 3.5), 3.4);
        C.cilindro(B(rA, yH, 3.5), B(rA, yH, aC), g('pegadorDiam') / 2, M.borracha, { lados: 12 });
      }
      // os cabos: de cada came, pela viga, até a polia sobre a coluna; dela, até a polia da torre, e para dentro dela
      // (de cima, cortados com a viga)
      const yCabo = topo - est - 7;
      const polia = W([0, yCabo, zC + 6]);
      const poliaTorre = W([xTm, H + 4, zT1]);
      if (!cima) {
        for (const kk of lados) C.linha(W([ladoDaMaquina(m.modo, kk) * a, yCabo, -g('cameRaio')]), polia, '#202327', 0.7);
        C.linha(polia, W([xTm, H + 9, zT1]), '#202327', 0.7);
      }
      // as placas: as que ficam embaixo e as do pino, que sobem; a haste e o cabo que desce da polia até ela
      const xP = xTm - g('pilhaLarg') / 2,
        zP = zTm + g('pilhaProf') / 2;
      if (n - k > 0) C.pilha(W([xP, est + 2, zP]), W(X), W([0, 0, -1]), g('pilhaLarg'), hp * (n - k), g('pilhaProf'), n - k);
      const yDo = est + 2 + hp * (n - k) + subida;
      C.pilha(W([xP, yDo, zP]), W(X), W([0, 0, -1]), g('pilhaLarg'), hp * k, g('pilhaProf'), k);
      C.cilindro(W([xTm, yDo + hp * k, zTm]), W([xTm, yDo + hp * k + 10, zTm]), 1.2, M.cromo, { lados: 8 });
      C.linha(W([xTm, yDo + hp * k + 10, zTm]), poliaTorre, '#202327', 0.7);
    },
  };
  const placasDoPino: V3 = W([xTm, est + 2 + hp * (n - k) + subida, zTm]);
  return {
    prims,
    fixa,
    movel,
    eixo: { R: eixoDoBraco(m.modo, 'R'), L: eixoDoBraco(m.modo, 'L') },
    pegador: { R: pegadorVertical(m.modo, 'R', m.alfa.R), L: pegadorVertical(m.modo, 'L', m.alfa.L) },
    alca: { R: pegadorHorizontal(m.modo, 'R', m.alfa.R), L: pegadorHorizontal(m.modo, 'L', m.alfa.L) },
    encosto: E,
    assento: hA,
    subida,
    placasDoPino,
    topoDaPilha: est + 2 + hp * (n - k),
  };
}

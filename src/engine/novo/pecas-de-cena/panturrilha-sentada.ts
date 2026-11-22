// Peça de cena: a panturrilha sentada na máquina (de anilhas). Medidas em ../dados/objetos/panturrilha-sentada.json: o
// tamanho total vem das fichas da Life Fitness (SPLCALF, 155 × 74 × 107 cm), da Hammer Strength (PL-CALF) e da Atlantis
// (M219); o que faz a máquina funcionar (a altura do assento, onde fica o eixo da alavanca, onde ficam a almofada e o
// pino das anilhas) não aparece em nenhuma ficha e é de desenho ou sai do corpo da tabela, com o motivo. Parte do cartão
// de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `panturrilha_sentada_maquina`): o assento azul num pé, o
// apoio dos pés baixo e ranhurado, a alavanca com a almofada azul das coxas, o pegador na frente dela e o pino das
// anilhas. No cartão de hoje o eixo fica numa coluna à frente dos pés; aqui ele fica ao lado do quadril, como na foto da
// Atlantis M219 (debaixo da frente do assento): com o eixo na linha do quadril, a alavanca gira junto com a coxa.
//
// A máquina funciona: a alavanca gira no eixo; a almofada, presa a ela por um pino que regula a altura ("pull-pin thigh
// pad"), apoia sobre as coxas perto dos joelhos; quem treina sobe o calcanhar, o joelho sobe e a alavanca gira com as
// anilhas na ponta da frente. Sem ninguém, a alavanca descansa no batente de baixo (a trava).
//
// Eixos: quem senta olha para +z; o meio da máquina fica em x = 0; a borda de trás do apoio dos pés (onde a ponta do pé
// apoia e de onde o calcanhar desce) fica em z = 0. O lado direito de quem senta é −x: a alavanca, o pino e as anilhas
// ficam à esquerda (+x), para não esconder a perna direita de quem olha de lado.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import type { IdAnilha } from './barra-longa';
import { retArred } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('panturrilhaSentada', id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0],
  Z: V3 = [0, 0, 1];

/** Uma caixa alinhada aos eixos, de `a` (o canto de menor x, y e z) a `b` (o gerador realista a desenha como prisma). */
const caixa = (C: Parameters<PecaPropria['desenhar']>[0], a: V3, b: V3, mat: Parameters<PecaPropria['desenhar']>[1]['metal']) =>
  C.prisma(
    [
      [a[0], a[1]],
      [b[0], a[1]],
      [b[0], b[1]],
      [a[0], b[1]],
    ],
    [0, 0, a[2]],
    X,
    Y,
    [0, 0, b[2] - a[2]],
    mat,
  );

/** O eixo da alavanca (no meio da máquina; a alavanca corre do lado esquerdo). */
export const eixoDaPanturrilhaSentada = (): V3 => [0, g('eixoAltura'), g('eixoZ')];
/** A direção da alavanca, do eixo para a frente, com ela `graus` acima da horizontal. */
export const direcaoDaAlavancaSentada = (graus: number): V3 => [0, Math.sin(graus * rad), Math.cos(graus * rad)];
/** A normal da alavanca (para cima, perpendicular a ela). */
export const normalDaAlavancaSentada = (graus: number): V3 => [0, Math.cos(graus * rad), -Math.sin(graus * rad)];
/** O ponto da alavanca (no meio da máquina) a `d` cm do eixo e `h` cm acima da linha dela. */
const naAlavanca = (graus: number, d: number, h = 0): V3 =>
  add(add(eixoDaPanturrilhaSentada(), mul(direcaoDaAlavancaSentada(graus), d)), mul(normalDaAlavancaSentada(graus), h));
/** O meio da face de baixo da almofada, com a alavanca no ângulo dado e a almofada `acima` cm acima da linha dela. */
export const baixoDaAlmofadaSentada = (graus: number, acima: number): V3 => naAlavanca(graus, g('almofadaDoEixo'), acima);
/** O centro de cada mão no pegador (lado R, x < 0, e L): o pegador atravessa a frente da almofada, acima dela. */
export const maoNoPegadorSentado = (graus: number, acima: number, s: -1 | 1, x: number): V3 =>
  add(naAlavanca(graus, g('almofadaDoEixo') + g('almofadaComp') / 2 + 2, acima + g('almofadaEsp') + g('pegadorAcima')), [s * x, 0, 0]);
/** O centro das anilhas no pino (o meio do pacote de anilhas). */
export const centroDasAnilhas = (graus: number, anilhas: IdAnilha[]): V3 => {
  const esp = anilhas.reduce((s, a) => s + obj(a, 'esp'), 0);
  return add(naAlavanca(graus, g('pinoDoEixo')), [g('eixoAoLado') + 4 + esp / 2, 0, 0]);
};
/** As pontas da máquina (cm), para a folha. */
export function extremosDaPanturrilhaSentada() {
  const zFrente = g('eixoZ') + g('pinoDoEixo') + 26;
  return { zTras: zFrente - g('comp'), zFrente };
}

export interface PanturrilhaSentada {
  /** O ângulo da alavanca, em graus acima da horizontal. */
  alavanca: number;
  /** O ângulo do batente de baixo, onde a alavanca descansa. */
  batente: number;
  /** A regulagem da almofada: a face de baixo dela, acima da linha da alavanca (cm). */
  almofadaAcima: number;
  /** As anilhas no pino, da mais pesada (por dentro) à mais leve. */
  anilhas: IdAnilha[];
}

/**
 * A máquina: os volumes para a conferência (o assento, o apoio dos pés e a almofada, onde o corpo apoia e que ele não
 * pode atravessar), a estrutura parada (a base, o assento, o apoio, o pé do eixo e o batente) e a parte que se mexe (a
 * alavanca, a almofada, o pegador, o pino e as anilhas).
 */
export function panturrilhaSentada(m: PanturrilhaSentada) {
  const tubo = g('tubo');
  const P = eixoDaPanturrilhaSentada();
  const d = direcaoDaAlavancaSentada(m.alavanca),
    n = normalDaAlavancaSentada(m.alavanca);
  const xL = g('eixoAoLado');
  const E = extremosDaPanturrilhaSentada();
  const hA = g('apoioAlt'),
    pA = g('apoioProf'),
    lA = g('apoioLarg');
  const hS = g('assentoAltura'),
    eS = g('estofadoEsp'),
    cS = g('assentoComp'),
    lS = g('assentoLarg');
  const zS1 = g('assentoFrente'),
    zS0 = zS1 - cS;
  const eA = g('almofadaEsp'),
    cA = g('almofadaComp'),
    lAl = g('almofadaLarg');
  const baixo = baixoDaAlmofadaSentada(m.alavanca, m.almofadaAcima);
  const centroAlmofada = add(baixo, mul(n, eA / 2));
  // o batente: um pé debaixo da alavanca, onde ela descansa (a trava), a `batenteDoEixo` cm do eixo
  const dB = g('batenteDoEixo');
  const topoDoBatente = add(naAlavanca(m.batente, dB, -tubo / 2), [xL, 0, 0]);

  const prims: Prim[] = [
    { t: 'caixa', ref: { o: [0, hS - eS / 2, (zS0 + zS1) / 2], x: X, y: Y, z: Z }, meias: [lS / 2, eS / 2 - 1.5, cS / 2 - 3], cls: 'estofado', vies: 0.5 },
    { t: 'caixa', ref: { o: [0, hA / 2, pA / 2], x: X, y: Y, z: Z }, meias: [lA / 2, hA / 2, pA / 2], cls: 'esc', vies: 0.5 },
    { t: 'caixa', ref: { o: centroAlmofada, x: X, y: n, z: d }, meias: [lAl / 2, eA / 2 - 1.5, cA / 2 - 3], cls: 'estofado', vies: 0.5 },
  ];

  const fixa: PecaPropria = {
    t: 'propria',
    nome: 'panturrilha sentada',
    fixa: [m.batente],
    desenhar(C, M, o) {
      const T = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
      // a base no chão: a viga do meio, a do lado da alavanca e as travessas das pontas
      T([0, tubo / 2, E.zTras + tubo], [0, tubo / 2, E.zFrente - tubo]);
      T([xL, tubo / 2, P[2] - 8], [xL, tubo / 2, E.zFrente - tubo]);
      for (const z of [E.zTras + tubo / 2, E.zFrente - tubo / 2]) T([-g('larg') / 2 + 22, tubo / 2, z], [g('larg') / 2 - 10, tubo / 2, z]);
      T([0, tubo / 2, P[2]], [xL, tubo / 2, P[2]]);
      // o assento num pé
      T([0, tubo, (zS0 + zS1) / 2], [0, hS - eS - 1, (zS0 + zS1) / 2], 8);
      caixa(C, [-lS / 2 + 3, hS - eS - 3, zS0 + 4], [lS / 2 - 3, hS - eS, zS1 - 4], M.metal);
      C.estofado([0, hS - eS, (zS0 + zS1) / 2], Z, Y, X, cS, eS, lS);
      // o pé do eixo, do lado esquerdo, e o eixo
      T([xL, tubo, P[2]], [xL, P[1] - 5, P[2]], 8);
      C.cilindro([xL - 6, P[1], P[2]], [xL + 6, P[1], P[2]], 4.2, M.metalClaro, { lados: 16 });
      // o apoio dos pés: o bloco e a chapa de borracha ranhurada
      caixa(C, [-lA / 2, tubo, 0.5], [lA / 2, hA - 2.5, pA - 0.5], M.metal);
      C.prisma(retArred(pA, 2.5, 0.8), [-lA / 2, hA - 1.25, pA / 2], Z, Y, [lA, 0, 0], M.plataforma);
      for (let i = 1; i < 5; i++) C.linha([-lA / 2 + 1.5, hA + 0.05, (pA * i) / 5], [lA / 2 - 1.5, hA + 0.05, (pA * i) / 5], '#5E646C', 0.45);
      // o batente de baixo da alavanca (a trava), com a borracha em cima
      T([xL, tubo, topoDoBatente[2]], [xL, topoDoBatente[1] - 3, topoDoBatente[2]], 6);
      C.cilindro([xL, topoDoBatente[1] - 3, topoDoBatente[2]], [xL, topoDoBatente[1], topoDoBatente[2]], 3.6, M.borracha, { lados: 14 });
      if (o.comSombra) C.sombra(10, (E.zTras + E.zFrente) / 2, g('larg') / 2, g('comp') / 2, 0.18);
    },
  };

  const movel: PecaPropria = {
    t: 'propria',
    nome: 'alavanca da panturrilha sentada',
    desenhar(C, M) {
      const lado = (v: V3, x: number): V3 => [x, v[1], v[2]];
      // a alavanca, do eixo até o pino, do lado esquerdo
      const ponta = naAlavanca(m.alavanca, g('pinoDoEixo') + 6);
      C.tubo(lado(P, xL), lado(ponta, xL), 6, 6, M.metal, { up: [1, 0, 0] });
      // o pino das anilhas, para fora, e as anilhas
      const pino = lado(naAlavanca(m.alavanca, g('pinoDoEixo')), xL);
      C.cilindro(add(pino, [3, 0, 0]), add(pino, [3 + g('pinoComp'), 0, 0]), g('pinoDiam') / 2, M.cromo, { lados: 14 });
      let x = xL + 4;
      for (const a of m.anilhas) {
        C.anilha([x, pino[1], pino[2]], [x + obj(a, 'esp'), pino[1], pino[2]], obj(a, 'diam') / 2, M.anilha);
        x += obj(a, 'esp');
      }
      // o pino que regula a almofada: sobe da alavanca até em cima dela, e o braço que a segura por cima
      const base = lado(naAlavanca(m.alavanca, g('almofadaDoEixo')), xL);
      const topo = add(base, mul(n, m.almofadaAcima + eA + 3));
      C.tubo(base, topo, 5, 5, M.metalClaro, { up: d });
      C.tubo(topo, add(topo, [-xL - lAl / 2 + 4, 0, 0]), 4.5, 4.5, M.metal, { up: n });
      // a almofada (a face de baixo encosta nas coxas)
      C.estofado(baixo, d, n, X, cA, eA, lAl);
      // o pegador: atravessa a frente da almofada, preso ao braço de cima
      const pg = maoNoPegadorSentado(m.alavanca, m.almofadaAcima, 1, 0);
      C.tubo(add(topo, mul(d, 2)), [xL, pg[1], pg[2]], 3.5, 3.5, M.metal, { up: n });
      C.cilindro([xL, pg[1], pg[2]], [-g('pegadorLarg') / 2, pg[1], pg[2]], g('pegadorDiam') / 2, M.borracha, { lados: 12 });
    },
  };
  return { prims, fixa, movel, eixo: P, baixo, normal: n, ao: d, anilhas: centroDasAnilhas(m.alavanca, m.anilhas) };
}

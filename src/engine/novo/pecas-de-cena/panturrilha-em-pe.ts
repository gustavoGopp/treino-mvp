// Peça de cena: a panturrilha em pé na máquina. Medidas em ../dados/objetos/panturrilha-em-pe.json: o tamanho total vem
// das fichas da Hammer Strength (HS-SC, 148 × 114 × 183 cm) e da Atlantis (M118, 128 × 81,9 × 186,4 cm); o que faz a
// máquina funcionar (a altura do degrau, onde fica o eixo do braço das almofadas, o comprimento dele) não aparece em
// nenhuma ficha e é de desenho ou sai do corpo da tabela, com o motivo. Parte do cartão de hoje
// (scripts/desenhos-equipamento/realista/itens.mjs, `panturrilha_em_pe_maquina`): a torre das placas à frente de quem
// treina, os dois montantes entre a pessoa e a torre, as almofadas azuis dos ombros com os pegadores na frente e o degrau
// alto com a chapa ranhurada. No cartão de hoje as almofadas correm num carro na vertical; nas fotos das duas fichas o
// braço das almofadas gira num eixo, e é assim aqui.
//
// A máquina funciona: as almofadas ficam na ponta de um braço que gira num eixo no alto dos montantes, à frente de quem
// treina; uma travessa na frente do pescoço liga as duas almofadas (a cabeça passa entre elas) e leva os pegadores nas
// pontas. Quem treina sobe na ponta dos pés e empurra as almofadas para cima; o came gira com o braço e enrola o cabo, e
// as placas sobem o arco do came (o raio vezes o ângulo que o braço subiu desde a posição inicial).
//
// Eixos: quem treina olha para +z, para os montantes e a torre; o meio da máquina fica em x = 0; a borda de trás do
// degrau (onde a ponta do pé apoia e de onde o calcanhar desce) fica em z = 0. O lado direito de quem treina é −x.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { retArred } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('panturrilhaEmPe', id);
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

/** O eixo do braço das almofadas (o centro dele, no meio da máquina). */
export const eixoDaPanturrilhaEmPe = (): V3 => [0, g('eixoAltura'), g('eixoAFrente')];
/** A direção do braço, do eixo para as almofadas, com ele `graus` acima da horizontal (para trás, para −z). */
export const direcaoDoBraco = (graus: number): V3 => [0, Math.sin(graus * rad), -Math.cos(graus * rad)];
/** A normal do braço (para cima, perpendicular a ele). */
export const normalDoBraco = (graus: number): V3 => [0, Math.cos(graus * rad), Math.sin(graus * rad)];
/** O ponto do braço a `d` cm do eixo, no meio da máquina. */
const noBraco = (graus: number, d: number): V3 => add(eixoDaPanturrilhaEmPe(), mul(direcaoDoBraco(graus), d));
/**
 * O meio da face de baixo das almofadas (entre as duas, onde os ombros encostam), com o braço no ângulo dado: o meio da
 * espessura das almofadas fica na linha do braço.
 */
export const baixoDasAlmofadas = (graus: number): V3 => add(noBraco(graus, g('bracoComp')), mul(normalDoBraco(graus), -g('ombreiraEsp') / 2));
/** O meio da travessa que liga as almofadas, na frente do pescoço, com o braço no ângulo dado. */
const meioDaTravessa = (graus: number): V3 => add(noBraco(graus, g('bracoComp') - g('travessaAFrente')), mul(normalDoBraco(graus), -g('travessaAbaixo')));
/** O centro de cada pegador (onde a mão fecha), lado R (x < 0) e L, e o eixo dele (de dentro para fora). */
export function pegadorDaPanturrilhaEmPe(graus: number, s: -1 | 1): { meio: V3; eixo: V3 } {
  const c = meioDaTravessa(graus);
  const dentro = g('ombreirasEntre') / 2 + 3;
  return { meio: add(c, [s * (dentro + g('pegaComp') / 2), 0, 0]), eixo: [s, 0, 0] };
}
/** Quanto as placas sobem (cm) com o braço no ângulo dado: o arco do came desde a posição inicial. */
export const subidaDaPilhaEmPe = (graus: number, inicio: number) => Math.max(0, graus - inicio) * rad * (g('cameDiam') / 2);
/** As pontas da máquina (cm), para a folha: de trás para a frente e de um lado ao outro. */
export function extremosDaPanturrilhaEmPe() {
  const zFrente = g('eixoAFrente') + 8 + g('torreProf') + 2;
  return { zTras: zFrente - g('comp'), zFrente, xLado: g('larg') / 2 };
}

export interface PanturrilhaEmPe {
  /** O ângulo do braço das almofadas, em graus acima da horizontal. */
  braco: number;
  /** O ângulo da posição inicial (o batente de baixo do braço): as placas começam a subir daí. */
  inicio: number;
  /** Quantas placas estão no pino. */
  placas?: number;
}

/**
 * A máquina: os volumes para a conferência (o degrau e as almofadas, onde o corpo apoia e que ele não pode atravessar),
 * a estrutura parada (a base, o degrau, os montantes e a torre) e a parte que se mexe (o braço, as almofadas, a travessa
 * com os pegadores, o came, o cabo e as placas).
 */
export function panturrilhaEmPe(m: PanturrilhaEmPe) {
  const tubo = g('tubo');
  const P = eixoDaPanturrilhaEmPe();
  const d = direcaoDoBraco(m.braco),
    n = normalDoBraco(m.braco);
  const R = g('bracoComp');
  const meia = g('ombreirasEntre') / 2;
  const centroDaAlmofada = (s: number): V3 => add(noBraco(m.braco, R), [s * meia, 0, 0]);
  const E = extremosDaPanturrilhaEmPe();
  const hP = g('plataformaAlt'),
    pP = g('plataformaProf'),
    lP = g('plataformaLarg');
  const zT0 = P[2] + 8,
    zT1 = zT0 + g('torreProf');
  const xT = g('torreLarg') / 2;
  const H = g('alturaTorre');
  const xM = g('montantesEntre') / 2;

  const prims: Prim[] = [
    // o degrau
    { t: 'caixa', ref: { o: [0, hP / 2, pP / 2], x: X, y: Y, z: Z }, meias: [lP / 2, hP / 2, pP / 2], cls: 'esc', vies: 0.5 },
    // as almofadas (as caixas sem os cantos redondos do desenho, para não acusar o ombro na quina)
    ...[-1, 1].map(
      (s): Prim => ({
        t: 'caixa',
        ref: { o: centroDaAlmofada(s), x: X, y: n, z: mul(d, -1) },
        meias: [g('ombreiraLarg') / 2, g('ombreiraEsp') / 2 - 1.5, g('ombreiraComp') / 2 - 3],
        cls: 'estofado',
        vies: 0.5,
      }),
    ),
  ];

  const fixa: PecaPropria = {
    t: 'propria',
    nome: 'panturrilha em pé',
    fixa: [],
    desenhar(C, M, o) {
      const T = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
      // a base no chão: os dois trilhos de trás para a frente e as travessas das pontas
      const xB = g('larg') / 2 - tubo / 2;
      for (const s of [-1, 1]) T([s * (lP / 2 - 2), tubo / 2, E.zTras + tubo], [s * (lP / 2 - 2), tubo / 2, zT1]);
      T([-xB, tubo / 2, E.zTras + tubo / 2], [xB, tubo / 2, E.zTras + tubo / 2]);
      T([-xB, tubo / 2, E.zFrente - tubo / 2], [xB, tubo / 2, E.zFrente - tubo / 2]);
      T([-lP / 2 + 2, tubo / 2, P[2]], [lP / 2 - 2, tubo / 2, P[2]]);
      // o degrau: o bloco de aço e a chapa de cima, ranhurada de um lado ao outro
      caixa(C, [-lP / 2, tubo, 0.5], [lP / 2, hP - 2.5, pP - 0.5], M.metal);
      C.prisma(retArred(pP, 2.5, 0.8), [-lP / 2, hP - 1.25, pP / 2], Z, Y, [lP, 0, 0], M.plataforma);
      for (let i = 1; i < 7; i++) C.linha([-lP / 2 + 1.5, hP + 0.05, (pP * i) / 7], [lP / 2 - 1.5, hP + 0.05, (pP * i) / 7], '#5E646C', 0.45);
      // a ligação do degrau com os montantes
      T([0, tubo, pP - 2], [0, tubo, P[2] - 4], 6);
      // os dois montantes que seguram o eixo, com a tampa
      for (const s of [-1, 1]) T([s * xM, tubo, P[2]], [s * xM, P[1] + 8, P[2]]);
      T([-xM, P[1] + 8, P[2]], [xM, P[1] + 8, P[2]], 6);
      // o eixo
      C.cilindro([-xM, P[1], P[2]], [xM, P[1], P[2]], 2.4, M.cromo, { lados: 12 });
      // a torre: quatro montantes, a tampa, as guias e a polia do pé
      for (const [x, z] of [
        [-xT, zT0],
        [xT, zT0],
        [-xT, zT1],
        [xT, zT1],
      ] as [number, number][])
        T([x, tubo, z], [x, H, z], 4.5);
      for (const z of [zT0, zT1]) T([-xT, H, z], [xT, H, z], 4.5);
      for (const x of [-xT, xT]) T([x, H, zT0], [x, H, zT1], 4.5);
      const zP = (zT0 + zT1) / 2;
      for (const dx of [-7, 7]) C.cilindro([dx, tubo, zP], [dx, H - 6, zP], 0.8, M.cromo, { lados: 8 });
      C.cilindro([-1.5, 10, zT0 - 2], [1.5, 10, zT0 - 2], 4.5, M.metalClaro, { lados: 16 });
      if (o.comSombra) C.sombra(0, (E.zTras + E.zFrente) / 2, g('larg') / 2, g('comp') / 2, 0.18);
    },
  };

  const subida = subidaDaPilhaEmPe(m.braco, m.inicio);
  const nPl = g('pilhaPlacas'),
    k = Math.min(nPl, Math.max(1, m.placas ?? 8)),
    hp = g('pilhaAltura') / nPl;
  const movel: PecaPropria = {
    t: 'propria',
    nome: 'braço da panturrilha em pé',
    desenhar(C, M) {
      // as placas: as que ficam embaixo e as do pino, que sobem; a haste que as atravessa
      const zP = (zT0 + zT1) / 2,
        xP = -g('pilhaLarg') / 2,
        zPl = zP + g('pilhaProf') / 2;
      if (nPl - k > 0) C.pilha([xP, tubo + 2, zPl], X, [0, 0, -1], g('pilhaLarg'), hp * (nPl - k), g('pilhaProf'), nPl - k);
      const yDo = tubo + 2 + hp * (nPl - k) + subida;
      C.pilha([xP, yDo, zPl], X, [0, 0, -1], g('pilhaLarg'), hp * k, g('pilhaProf'), k);
      C.cilindro([0, yDo + hp * k, zP], [0, yDo + hp * k + 10, zP], 1.2, M.cromo, { lados: 8 });
      // o came no eixo (ao lado do braço) e o cabo: desce do came até a polia do pé da torre
      const rC = g('cameDiam') / 2;
      const xC = 6;
      C.cilindro([xC - 2.5, P[1], P[2]], [xC + 2.5, P[1], P[2]], rC, M.metalClaro, { lados: 24 });
      C.linha([xC, P[1] - rC, P[2] + 1], [xC, 10 - 4.5, P[2] + 1], '#202327', 0.7);
      C.linha([xC, 10 - 4.5, P[2] + 1], [0, 10 - 4.5, zT0 - 2], '#202327', 0.7);
      // o braço: do eixo até a travessa, no meio
      const cTr = meioDaTravessa(m.braco);
      C.tubo(P, cTr, 6, 6, M.metal, { up: [1, 0, 0] });
      C.cilindro([-4, P[1], P[2]], [4, P[1], P[2]], 4, M.metal, { lados: 14 });
      // a travessa na frente do pescoço, com os pegadores nas pontas
      const dentro = meia + 3;
      C.tubo(add(cTr, [-dentro, 0, 0]), add(cTr, [dentro, 0, 0]), 5, 5, M.metal, { up: n });
      for (const s of [-1, 1]) {
        C.cilindro(add(cTr, [s * dentro, 0, 0]), add(cTr, [s * (dentro + g('pegaComp')), 0, 0]), g('pegaDiam') / 2, M.borracha, { lados: 12 });
        // da travessa até a quina de baixo da frente da almofada (passa abaixo do queixo)
        const frente = add(add(centroDaAlmofada(s), mul(d, -g('ombreiraComp') / 2 + 3)), mul(n, -g('ombreiraEsp') / 2 + 1.5));
        C.tubo(add(cTr, [s * meia, 0, 0]), frente, 4.5, 4.5, M.metal, { up: n });
        // a almofada (a face de baixo encosta no ombro)
        C.estofado(add(centroDaAlmofada(s), mul(n, -g('ombreiraEsp') / 2)), mul(d, -1), n, X, g('ombreiraComp'), g('ombreiraEsp'), g('ombreiraLarg'));
      }
    },
  };
  return { prims, fixa, movel, eixo: P, subida, baixo: baixoDasAlmofadas(m.braco) };
}

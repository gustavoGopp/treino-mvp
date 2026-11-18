// Peça de cena: o graviton (a máquina de barra e paralela assistidas). Medidas em ../dados/objetos/graviton.json: o
// tamanho total vem das fichas da Life Fitness (SS-ADC, 163 × 149 × 222 cm), da Hammer Strength (HS-ADC), da Matrix
// (VS-S601) e da Atlantis (D131, que dá também o diâmetro das alças); o que faz a máquina funcionar (a altura das alças,
// o eixo e o comprimento da alavanca dos joelhos) não aparece em nenhuma ficha e é de desenho, com o motivo. Parte do
// cartão de hoje (scripts/desenhos-equipamento/realista/aparelhos.mjs, `graviton`): a torre da pilha à frente de quem
// treina, as duas colunas com uma alça de barra no alto de cada uma e uma alça de paralela no meio, os degraus presos às
// colunas por fora e a almofada dos joelhos numa alavanca que gira num eixo preso às colunas.
//
// A máquina funciona: a almofada fica na ponta da alavanca, que gira no eixo das colunas, à frente dos joelhos; quem
// treina ajoelha nela e a empurra para baixo; o came gira com a alavanca e enrola o cabo, e as placas sobem (o
// contrapeso: as placas puxam a almofada para cima, e ela empurra os joelhos). A pilha sobe o arco do came: o raio dele
// vezes o ângulo que a alavanca desceu desde o batente de cima (`alavancaTopo`).
//
// Eixos: quem treina olha para +z, para as colunas e a torre; o meio da máquina fica em x = 0; a linha das alças de
// barra fica em z = 0. O lado direito de quem treina é −x (o que a vista de lado mostra): o came fica à esquerda (+x).
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('graviton', id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0];

/** O eixo da alavanca dos joelhos (o centro dele, no meio da máquina). */
export const eixoDoGraviton = (): V3 => [0, g('eixoAltura'), g('colunaZ')];
/** A direção da alavanca, do eixo para a almofada, com ela `graus` acima da horizontal (para trás, para −z). */
export const direcaoDaAlavancaDoGraviton = (graus: number): V3 => [0, Math.sin(graus * rad), -Math.cos(graus * rad)];
/** A normal da almofada (para cima, perpendicular à alavanca). */
export const normalDaAlavancaDoGraviton = (graus: number): V3 => [0, Math.cos(graus * rad), Math.sin(graus * rad)];
/**
 * O topo da almofada é paralelo à alavanca e fica `almofadaAbaixoDoEixo` cm abaixo da linha que passa pelo eixo: com o
 * joelho ajoelhado nela, o centro do joelho cai nessa linha, e a almofada gira em volta do eixo sem escorregar debaixo
 * dele. A alavanca é um braço dobrado: desce do eixo e corre por baixo da almofada.
 */
export const topoAbaixoDoEixo = () => g('almofadaAbaixoDoEixo');
/** O ponto do topo da almofada debaixo do joelho, com a alavanca no ângulo dado. */
export const debaixoDoJoelho = (graus: number): V3 =>
  add(add(eixoDoGraviton(), mul(direcaoDaAlavancaDoGraviton(graus), g('alavancaAteJoelho'))), mul(normalDaAlavancaDoGraviton(graus), -topoAbaixoDoEixo()));
/** Quanto as placas sobem (cm) com a alavanca no ângulo dado: o arco do came desde o batente de cima. */
export const subidaDaPilhaDoGraviton = (graus: number) => Math.max(0, g('alavancaTopo') - graus) * rad * (g('cameDiam') / 2);
/** O eixo de cada alça de barra (de dentro para fora) e o de cada alça de paralela (da frente para trás), lado R (x < 0) e L. */
export function eixosDasAlcas(): { barra: Record<'R' | 'L', [V3, V3]>; paralela: Record<'R' | 'L', [V3, V3]> } {
  const H = g('alcaAltura'),
    Hp = g('paralelaAltura'),
    m = g('paralelaVao') / 2;
  const fim = paralelaFim();
  return {
    barra: { R: [[-g('alcaDentro'), H, 0], [-g('alcaFora'), H, 0]], L: [[g('alcaDentro'), H, 0], [g('alcaFora'), H, 0]] },
    paralela: { R: [[-m, Hp, paralelaComeco()], [-m, Hp, fim]], L: [[m, Hp, paralelaComeco()], [m, Hp, fim]] },
  };
}
/** Onde o trecho reto de cada alça de paralela começa (perto das colunas) e termina (a ponta, atrás das mãos). */
const paralelaComeco = () => 26;
const paralelaFim = () => -16;
/**
 * O came e a pilha, para o enquadramento: o contrapeso faz parte do que o guia ensina (a pilha sobe quando a almofada
 * desce). Com eles, o meio da caixa do quadro fica à frente do corpo, e os rótulos vão para o lado de trás dele, fora
 * da máquina.
 */
export const cameNoQuadro = (): V3[] => {
  const O = eixoDoGraviton(),
    r = g('cameDiam') / 2,
    zP = g('torreZ') + g('pilhaProf') / 2;
  return [add(O, [0, r, 0]), add(O, [0, -r, 0]), [g('pilhaLarg') / 2, O[1], zP], [-g('pilhaLarg') / 2, O[1], zP]];
};
/** O centro do trecho emborrachado das alças de paralela (onde a mão fecha). */
export const meioDaPegaDaParalela = () => -2;

export interface Graviton {
  /** O ângulo da alavanca dos joelhos, em graus acima da horizontal (para trás). */
  alavanca: number;
  /** Quantas placas estão no pino. */
  placas?: number;
  /** As alças de barra (nas mãos) e as de paralela; o que o enquadramento precisa mostrar de cada peça. */
  noQuadro?: { barra?: V3[]; paralela?: V3[]; almofada?: V3[] };
  /** As alças que o exercício não usa vão para trás do corpo, como cenário (na barra, as de paralela passam na frente da cintura). */
  cenario?: { barra?: boolean; paralela?: boolean };
}

/**
 * O graviton: os volumes para a conferência (as alças e a almofada, onde o corpo encosta e que ele não pode
 * atravessar), a estrutura (cenário: as colunas, a base, os degraus, a torre com a pilha e o cabo), as alças de barra,
 * as de paralela e a alavanca com a almofada e o came, e os pontos que o exercício lê.
 */
export function graviton(m: Graviton) {
  const t = g('tubo'),
    xC = g('colunasEntre') / 2,
    zC = g('colunaZ'),
    A = g('altura'),
    O = eixoDoGraviton(),
    u = direcaoDaAlavancaDoGraviton(m.alavanca),
    n = normalDaAlavancaDoGraviton(m.alavanca),
    rA = g('alcaDiam') / 2;
  const zT = g('torreZ'),
    zFrente = zT + 20,
    zTras = zFrente - g('comp');
  const s = g('alavancaAteJoelho'),
    af = g('almofadaAFrente'),
    ac = g('almofadaComp'),
    esp = g('almofadaEsp');
  // a almofada: da frente do joelho para trás, com o topo `almofadaAbaixoDoEixo` abaixo da linha do eixo
  const b = topoAbaixoDoEixo();
  const almofadaBase = add(add(O, mul(u, s - af + ac / 2)), mul(n, -b - esp));
  // o braço da alavanca corre por baixo da almofada
  const baixo = -b - esp - t / 2;
  const eixos = eixosDasAlcas();
  const caixa = (o: V3, ref: { x: V3; y: V3; z: V3 }, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { o, ...ref }, meias, cls, vies });
  const prims: Prim[] = [
    caixa(add(almofadaBase, mul(n, esp / 2)), { x: X, y: n, z: u }, [g('almofadaLarg') / 2, esp / 2, ac / 2], 'estofado', 0.5),
    ...(['R', 'L'] as const).flatMap((k) => {
      const [a, b] = eixos.barra[k],
        [c, d] = eixos.paralela[k];
      return [
        caixa(mul(add(a, b), 0.5), { x: X, y: [0, 1, 0], z: [0, 0, 1] }, [Math.abs(b[0] - a[0]) / 2, rA, rA], 'barra', -1),
        caixa(mul(add(c, d), 0.5), { x: X, y: [0, 1, 0], z: [0, 0, 1] }, [rA, rA, Math.abs(d[2] - c[2]) / 2], 'barra', -1),
      ];
    }),
  ];

  // a pilha: as placas que ficam embaixo e as do pino, que sobem com o came
  const subida = subidaDaPilhaDoGraviton(m.alavanca);
  const nP = g('pilhaPlacas'),
    k = Math.min(nP, Math.max(1, m.placas ?? 6)),
    hp = g('pilhaAltura') / nP;
  const pL = g('pilhaLarg'),
    pP = g('pilhaProf');
  const xT = pL / 2 + 5,
    zT0 = zT - pP / 2 - 5,
    zT1 = zT + pP / 2 + 5;
  const rC = g('cameDiam') / 2,
    xCame = 9;
  // por onde o cabo passa: sai do alto do came para a frente, até a roldana do pé da torre, e sobe por dentro dela
  const roldana: V3 = [xCame, O[1] + rC, zT0 - 1];
  const roldanaAlto: V3 = [xCame, g('torreAltura') - 8, zT];

  const estrutura: PecaPropria = {
    t: 'propria',
    nome: 'estrutura do graviton',
    cenario: true,
    fixa: [Math.round(subida * 10) / 10, k],
    desenhar(C, M, o) {
      const T = (a: V3, b: V3, w = t, up: V3 = [0, 0, 1]) => C.tubo(a, b, w, w, M.metal, { up });
      // a base no chão: dois trilhos de ponta a ponta e as travessas, com pés de borracha
      for (const s1 of [-1, 1]) T([s1 * xC, t / 2, zTras], [s1 * xC, t / 2, zFrente], t, [0, 1, 0]);
      for (const z of [zTras + t / 2, zC, zFrente - t / 2]) T([-xC, t / 2, z], [xC, t / 2, z], t, [0, 1, 0]);
      for (const s1 of [-1, 1]) for (const z of [zTras + 4, zFrente - 4]) C.cilindro([s1 * xC, -0.2, z], [s1 * xC, 1, z], 3.5, M.borracha, { lados: 10 });
      // as colunas, a travessa do alto e a do eixo
      for (const s1 of [-1, 1]) T([s1 * xC, t, zC], [s1 * xC, A, zC]);
      T([-xC, A - t / 2, zC], [xC, A - t / 2, zC], t, [0, 1, 0]);
      T([-xC, O[1], zC + t], [xC, O[1], zC + t], t * 0.8, [0, 1, 0]);
      // os degraus, presos às colunas por fora, com a chapa antiderrapante
      for (const s1 of [-1, 1]) {
        const y = g('degrauAltura');
        T([s1 * xC, y - 3, zC], [s1 * (xC + 6), y - 3, zC - 8], 4.5);
        T([s1 * (xC + 6), y - 3, zC - 8], [s1 * (xC + 6), y - 3, zC - 8 - g('degrauComp')], 4.5);
        const fora = g('larg') / 2;
        C.prisma(
          [
            [0, 0],
            [fora - xC - 2, 0],
            [fora - xC - 2, 2.5],
            [0, 2.5],
          ],
          [s1 * (xC + 2), y - 1, zC - 6],
          [s1, 0, 0],
          [0, 1, 0],
          [0, 0, -g('degrauComp') - 4],
          M.plataforma,
        );
      }
      // a torre da pilha: quatro montantes, a tampa e as guias; o braço que a liga ao alto das colunas
      const H = g('torreAltura');
      for (const [x, z] of [
        [-xT, zT0],
        [xT, zT0],
        [-xT, zT1],
        [xT, zT1],
      ] as [number, number][])
        T([x, t, z], [x, H, z], 4.5);
      C.tubo([-xT - 3, H + 2.5, zT], [xT + 3, H + 2.5, zT], zT1 - zT0 + 6, 5, M.metal, { up: [0, 0, 1] });
      T([0, A - t, zC], [0, H + 2, zT0], 6);
      for (const dx of [-7, 7]) C.cilindro([dx, t, zT], [dx, H, zT], 0.8, M.cromo, { lados: 8 });
      // as placas (a frente virada para quem treina) e o pino que as segura
      const xP = -pL / 2,
        zP = zT - pP / 2;
      if (nP - k > 0) C.pilha([xP, t + 1, zP], X, [0, 0, 1], pL, hp * (nP - k), pP, nP - k);
      const yDo = t + 1 + hp * (nP - k) + subida;
      C.pilha([xP, yDo, zP], X, [0, 0, 1], pL, hp * k, pP, k);
      C.cilindro([0, yDo + hp * k, zT], [0, H - 10, zT], 1, M.cromo, { lados: 8 });
      // o cabo: do alto do came até a roldana de baixo da torre, e de lá até a roldana do alto, sobre o pino das placas
      C.cilindro([xCame - 1.5, roldana[1], roldana[2]], [xCame + 1.5, roldana[1], roldana[2]], 4, M.metalClaro, { lados: 14 });
      C.cilindro([xCame - 1.5, roldanaAlto[1], roldanaAlto[2]], [xCame + 1.5, roldanaAlto[1], roldanaAlto[2]], 4, M.metalClaro, { lados: 14 });
      C.linha([xCame, O[1] + rC, O[2]], roldana, '#202327', 0.7);
      C.linha(add(roldana, [0, 0, 4]), add(roldanaAlto, [0, -4, 0]), '#202327', 0.7);
      C.linha(add(roldanaAlto, [0, 0, -4]), [0, H - 10, zT], '#202327', 0.7);
      if (o.comSombra) C.sombra(0, (zTras + zFrente) / 2, g('larg') / 2, g('comp') / 2, 0.18);
    },
  };

  // as alças de barra: um braço que sai do alto de cada coluna e vem para trás, e a alça que dobra para dentro
  const barra: PecaPropria = {
    t: 'propria',
    nome: 'alças de barra do graviton',
    fixa: [],
    ...(m.cenario?.barra ? { cenario: true } : {}),
    ...(m.noQuadro?.barra ? { noQuadro: m.noQuadro.barra } : {}),
    desenhar(C, M) {
      const H = g('alcaAltura');
      for (const s1 of [-1, 1]) {
        const [dentro, fora] = eixos.barra[s1 < 0 ? 'R' : 'L'];
        C.tubo([s1 * xC, A - 4, zC], [s1 * xC, A - 4, 10], 6, 6, M.metal, { up: [0, 1, 0] });
        C.tubo([s1 * xC, A - 4, 10], [fora[0] + s1 * 1, H, 0], 5, 5, M.metal, { up: [1, 0, 0] });
        // a alça: emborrachada de ponta a ponta (a mão fecha por cima: um pouco atrás na pintura), com a tampa na ponta
        C.cilindro(fora, add(dentro, [s1 * 1.2, 0, 0]), rA, M.borracha, { lados: 14, dz: 6 });
        C.cilindro(add(dentro, [s1 * 1.2, 0, 0]), dentro, rA + 0.3, M.metal, { lados: 14 });
      }
    },
  };
  // as alças de paralela: saem de cada coluna, vêm para dentro e correm para trás, dos lados do corpo
  const paralela: PecaPropria = {
    t: 'propria',
    nome: 'alças de paralela do graviton',
    fixa: [],
    ...(m.cenario?.paralela ? { cenario: true } : {}),
    ...(m.noQuadro?.paralela ? { noQuadro: m.noQuadro.paralela } : {}),
    desenhar(C, M) {
      const Hp = g('paralelaAltura'),
        meia = g('paralelaPega') / 2,
        zm = meioDaPegaDaParalela();
      for (const s1 of [-1, 1]) {
        const [a, b] = eixos.paralela[s1 < 0 ? 'R' : 'L'];
        C.tubo([s1 * xC, Hp, zC], a, 5, 5, M.metal, { up: [0, 1, 0] });
        C.cilindro(a, [a[0], Hp, zm + meia], rA, M.metal, { lados: 14 });
        C.cilindro([a[0], Hp, zm + meia], [a[0], Hp, zm - meia], rA + 0.15, M.borracha, { lados: 14, dz: 6 });
        C.cilindro([a[0], Hp, zm - meia], [a[0], Hp, b[2] + 1.5], rA, M.metal, { lados: 14 });
        C.cilindro([a[0], Hp, b[2] + 1.5], b, rA + 0.3, M.borracha, { lados: 14 });
      }
    },
  };
  // a alavanca dos joelhos: o came no eixo, o tubo até debaixo da almofada e a almofada
  const alavanca: PecaPropria = {
    t: 'propria',
    nome: 'alavanca dos joelhos do graviton',
    ...(m.noQuadro?.almofada ? { noQuadro: m.noQuadro.almofada } : {}),
    desenhar(C, M) {
      const cx = (x: number): V3 => [x, O[1], O[2]];
      C.cilindro(cx(xCame - 3), cx(xCame + 3), rC, M.metalClaro, { lados: 24 });
      C.cilindro(cx(-6), cx(xCame + 5), 2.5, M.cromo, { lados: 12 });
      // o braço da alavanca: desce do eixo (uma chapa dobrada) e corre por baixo da almofada até o fim dela
      const dobra = add(O, add(mul(u, 12), mul(n, baixo)));
      C.tubo(O, dobra, t, t, M.metal, { up: X });
      C.tubo(dobra, add(O, add(mul(u, s - af + ac - 4), mul(n, baixo))), t, t, M.metal, { up: X });
      C.cilindro([-t / 2 - 1, O[1], O[2]], [t / 2 + 1, O[1], O[2]], t / 2 + 1, M.metalClaro, { lados: 16 });
      // a almofada (um pouco atrás na pintura: as canelas ficam por cima dela)
      C.estofado(almofadaBase, u, n, X, ac, esp, g('almofadaLarg'), M.estofado, { dz: 4 });
    },
  };
  return {
    prims,
    pecas: { estrutura, barra, paralela, alavanca },
    eixo: O,
    almofada: debaixoDoJoelho(m.alavanca),
    subida,
    extremos: { zTras, zFrente, xFora: g('larg') / 2 },
  };
}

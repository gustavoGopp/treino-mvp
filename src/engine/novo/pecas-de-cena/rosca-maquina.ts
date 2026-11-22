// Peça de cena: a máquina de rosca (rosca sentado, tipo Scott) e, com outro modelo (`ModeloDeBraco`), a máquina de
// tríceps com o braço apoiado à frente (./triceps-maquina.ts), como a cadeira extensora sai da flexora. As duas são a
// mesma máquina: o assento que sobe e desce (a regulagem), o apoio dos braços inclinado à frente do peito, uma
// alavanca que gira num eixo alinhado aos cotovelos, com o pegador na ponta, o came de um lado só e a torre com a
// pilha de placas ao lado do assento. Medidas em ../dados/objetos/rosca-maquina.json (e triceps-maquina.json): o
// tamanho total vem das fichas da Precor, da Life Fitness e da Hammer Strength; a pilha e o estofado, da Precor; o
// ajuste (o cotovelo no eixo, o braço deitado no apoio), do manual da Hammer Strength; as medidas que fazem a máquina
// funcionar (a altura do eixo, o ângulo e o tamanho do apoio, o curso do assento) não aparecem em nenhuma ficha lida e
// são de desenho, tiradas do corpo da tabela, com o motivo.
//
// Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `rosca_maquina`): o assento azul num pé
// só, o apoio inclinado à frente dele, o came redondo de um lado só na borda de baixo do apoio, a alavanca com a barra
// atravessada e as borrachas, a torre com a pilha. O que muda: no cartão, a torre fica atrás do assento; aqui, ao lado
// e atrás dele, à esquerda de quem senta (a largura das fichas, 105 a 110 cm, só fecha assim, como nas cadeiras).
//
// A máquina funciona: a alavanca gira no eixo, que fica na linha dos cotovelos de quem senta; o pegador (preso na
// ponta) anda num arco em volta dele, e a mão com ele. O came gira com a alavanca e enrola o cabo, e as placas
// escolhidas sobem o arco do came (raio × ângulo girado desde a posição inicial). O assento sobe e desce para o
// cotovelo cair no eixo com o braço deitado no apoio.
//
// Eixos: quem senta olha para +z; o assento fica centrado em x = 0, com a borda da frente em z = 0. O lado esquerdo de
// quem senta é +x (o direito, que a vista de lado mostra, é −x): o came, a alavanca e a torre ficam à esquerda, para não
// esconder o cotovelo de quem olha de lado. O ângulo da alavanca é o do centro da mão em volta do eixo, no plano de
// lado: 0 = para baixo, 90 = para a frente, na horizontal, 180 = para cima.
import type { Prim } from '../desenho';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

/**
 * Qual das duas máquinas de braço: de onde vêm as medidas, o nome, para que lado a alavanca gira para levantar as
 * placas e o pegador. A rosca é o padrão.
 */
export interface ModeloDeBraco {
  objeto: string;
  nome: string;
  /** Para que lado a alavanca gira para levantar as placas: +1 = subindo (rosca), −1 = descendo (tríceps). */
  sobe: -1 | 1;
  /** O pegador: a barra reta atravessada, com a palma para cima (rosca), ou um pegador em pé para cada mão (tríceps). */
  pegador: 'barra' | 'neutro';
  /** Se tem o apoio da lombar atrás do quadril (o tríceps da Hammer Strength: "hips in contact with the lower back pad"). */
  lombar: boolean;
}
export const ROSCA_NA_MAQUINA: ModeloDeBraco = { objeto: 'roscaMaquina', nome: 'máquina de rosca', sobe: 1, pegador: 'barra', lombar: false };

const rad = Math.PI / 180;
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0],
  Z: V3 = [0, 0, 1];
const medidas = (mod: ModeloDeBraco) => (id: string) => obj(mod.objeto, id);

/** As regulagens e o instante da máquina. */
export interface MaquinaDeBraco {
  /** O ângulo da alavanca (o do centro da mão em volta do eixo, no plano de lado), em graus. */
  alavanca: number;
  /** O ângulo da posição inicial: a pilha começa a subir daí. */
  inicio: number;
  /** A distância do eixo ao centro da mão (cm): o pegador corre na alavanca até a mão de quem treina. */
  pegador: number;
  /** A altura do topo do assento (cm, do chão): a regulagem. */
  assento: number;
  /** Quantas placas estão no pino. */
  placas?: number;
  /**
   * A meia distância entre os centros das mãos (cm), quando o exercício a dá (a largura dos cotovelos de quem treina);
   * por omissão, a da tabela (`pegadaMeia`).
   */
  pegadaMeia?: number;
}

/** A direção, no plano de lado, de um ângulo da alavanca (0 = para baixo, 90 = para a frente). */
export const direcaoNoPlano = (graus: number): V3 => [0, -Math.cos(graus * rad), Math.sin(graus * rad)];
/** O ângulo (na convenção da alavanca) de uma direção no plano de lado, de −90° (para trás) a 270°. */
export const anguloNoPlanoDeLado = (d: V3) => {
  const a = Math.atan2(d[2], -d[1]) / rad;
  return a < -90 ? a + 360 : a;
};

/**
 * A geometria fixa da máquina (não depende da regulagem): o eixo (no meio, x = 0), o apoio dos braços (a direção que
 * sobe ao longo dele, para quem senta, e a normal da face) e as bordas de baixo e de cima da face, no meio.
 */
export function geometriaDaMaquinaDeBraco(mod: ModeloDeBraco = ROSCA_NA_MAQUINA) {
  const g = medidas(mod);
  const s = g('apoioInclina') * rad;
  // a face do apoio desce para a frente: `sobe` aponta para trás e para cima (para quem senta); `normal`, para fora
  const sobe: V3 = [0, Math.sin(s), -Math.cos(s)];
  const normal: V3 = [0, Math.cos(s), Math.sin(s)];
  const eixo: V3 = [0, g('eixoAltura'), g('eixoAFrente')];
  const bordaBaixo = add(add(eixo, mul(normal, -g('eixoAcimaDaFace'))), mul(sobe, g('eixoAlemDaBorda')));
  const bordaCima = add(bordaBaixo, mul(sobe, g('apoioComp')));
  const meiaLarg = g('apoioLarg') / 2,
    meiaVao = g('apoioVao') / 2;
  const xAlavanca = meiaLarg + g('alavancaFora');
  // cada metade do apoio (uma para cada braço): o meio dela em x e a meia largura
  const xMetade = (meiaLarg + meiaVao) / 2,
    meiaMetade = (meiaLarg - meiaVao) / 2;
  return { sobe, normal, eixo, bordaBaixo, bordaCima, meiaLarg, meiaVao, xMetade, meiaMetade, xAlavanca, xCame: xAlavanca - 5, xColuna: meiaLarg + 2 };
}

/** Quanto as placas sobem (cm) com a alavanca no ângulo dado: o arco do came desde a posição inicial. */
export const subidaDaPilhaDeBraco = (m: Pick<MaquinaDeBraco, 'alavanca' | 'inicio'>, mod: ModeloDeBraco = ROSCA_NA_MAQUINA) =>
  Math.max(0, mod.sobe * (m.alavanca - m.inicio)) * rad * (medidas(mod)('cameDiam') / 2);

/**
 * O pegador no ângulo dado: o centro da mão de cada lado (a borracha da barra, ou o pegador em pé), a direção do
 * pegador em pé (para o lado do polegar) e a ponta da alavanca (onde ela prende a barra).
 */
export function pegadorNoAngulo(m: Pick<MaquinaDeBraco, 'alavanca' | 'pegador' | 'pegadaMeia'>, mod: ModeloDeBraco = ROSCA_NA_MAQUINA) {
  const g = medidas(mod);
  const G = geometriaDaMaquinaDeBraco(mod);
  const d = direcaoNoPlano(m.alavanca);
  const noPlano = add(G.eixo, mul(d, m.pegador));
  const centro = (k: Lado): V3 => [sinal(k) * (m.pegadaMeia ?? g('pegadaMeia')), noPlano[1], noPlano[2]];
  // o pegador em pé fica atravessado no plano de lado, perpendicular à alavanca, com o polegar para o lado em que o
  // ângulo cresce (o do antebraço que dobra); a barra que junta os dois fica na ponta de baixo deles
  const dirNeutro = direcaoNoPlano(m.alavanca + 90);
  const barra: V3 = mod.pegador === 'barra' ? noPlano : add(noPlano, mul(dirNeutro, -(g('pegadorComp') / 2 + g('barraAbaixo'))));
  const ponta: V3 = [G.xAlavanca, barra[1], barra[2]];
  return { centro: { R: centro('R'), L: centro('L') }, dirNeutro, barra, ponta };
}

/**
 * O apoio da lombar (só no tríceps): o meio da face, a direção que sobe ao longo dela e a normal (para a frente), com o
 * assento na altura dada (ele sobe e desce junto com o assento).
 */
export function apoioDaLombar(mod: ModeloDeBraco, assento: number) {
  const g = medidas(mod);
  const i = g('lombarInclina') * rad;
  const sobe: V3 = [0, Math.cos(i), Math.sin(i)];
  const frente: V3 = [0, -Math.sin(i), Math.cos(i)];
  const meio: V3 = [0, assento + g('lombarAcima') + g('lombarComp') / 2, g('lombarZ')];
  return { meio, sobe, frente, comp: g('lombarComp'), larg: g('lombarLarg') };
}

/**
 * Opções das animações (desligadas, a peça é a da folha): `apoioAParte`: o apoio dos braços sai da estrutura e vem numa
 * peça própria (`apoio`), para entrar na ordem de profundidade com o corpo (o braço deitado por cima dele), enquanto a
 * estrutura, o assento e a torre ficam atrás do corpo, como cenário.
 */
export interface OpcoesDaMaquinaDeBraco {
  apoioAParte?: boolean;
}

/**
 * A máquina: os volumes para a conferência (o assento, o apoio dos braços, o da lombar, a alavanca e a barra, onde o
 * corpo encosta e que ele não pode atravessar), a estrutura parada (com o assento na altura regulada), a parte que se
 * mexe (alavanca, pegador, came, cabo e placas) e os pontos que o exercício lê.
 */
export function maquinaDeBraco(m: MaquinaDeBraco, mod: ModeloDeBraco = ROSCA_NA_MAQUINA, op: OpcoesDaMaquinaDeBraco = {}) {
  const g = medidas(mod);
  const G = geometriaDaMaquinaDeBraco(mod);
  const esp = g('estofadoEsp'),
    tubo = g('tubo');
  const meiaLarg = g('assentoLarg') / 2,
    cA = g('assentoComp');
  const P = pegadorNoAngulo(m, mod);
  const L = mod.lombar ? apoioDaLombar(mod, m.assento) : undefined;

  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  // os estofados têm os cantos redondos (raio de 45% da espessura): duas caixas em cruz
  const rC = Math.min(esp * 0.45, 4);
  const estofado = (o: V3, x: V3, y: V3, z: V3, meias: V3): Prim[] => [caixa(o, x, y, z, [meias[0], meias[1], meias[2] - rC], 'estofado'), caixa(o, x, y, z, [meias[0], meias[1] - rC, meias[2]], 'estofado')];
  const meioDaFace = mul(add(G.bordaBaixo, G.bordaCima), 0.5);
  const prims: Prim[] = [
    // o assento
    ...estofado([0, m.assento - esp / 2, -cA / 2], X, Y, Z, [meiaLarg, esp / 2, cA / 2]),
    // o apoio dos braços: uma caixa de estofado para cada braço, com a face de cima no plano da face
    ...[-1, 1].flatMap((sx) => estofado(add(meioDaFace, [sx * G.xMetade, -(esp / 2) * G.normal[1], -(esp / 2) * G.normal[2]]), X, G.normal, G.sobe, [G.meiaMetade, esp / 2, g('apoioComp') / 2])),
    // o apoio da lombar
    ...(L ? estofado(add(L.meio, mul(L.frente, -esp / 2)), X, L.frente, L.sobe, [L.larg / 2, esp / 2, L.comp / 2]) : []),
  ];
  // a alavanca, do eixo à ponta, e a barra atravessada (o corpo não pode atravessá-las)
  {
    const a: V3 = [G.xAlavanca, G.eixo[1], G.eixo[2]];
    const d = sub(P.ponta, a);
    const z = norm(d),
      y = norm([0, -z[2], z[1]]);
    prims.push(caixa(add(a, mul(d, 0.5)), X, y, z, [2.5, 2.5, Math.hypot(...d) / 2], 'aco'));
    const x0 = mod.pegador === 'barra' ? -g('barraMeia') : -((m.pegadaMeia ?? g('pegadaMeia')) + 2);
    prims.push(caixa([(x0 + G.xAlavanca) / 2, P.barra[1], P.barra[2]], X, Y, Z, [(G.xAlavanca - x0) / 2, g('barraDiam') / 2, g('barraDiam') / 2], 'aco'));
  }

  // a torre da pilha, à esquerda de quem senta, ao lado e atrás do assento
  const xT0 = G.xCame,
    xT1 = xT0 + 34;
  const zTorre = -cA - 10;
  const zT0 = zTorre - 16,
    zT1 = zTorre + 16;
  const H = g('alturaTorre');
  const zTras = zT0 - 4,
    zFrente = zTras + g('comp');
  const xC = G.xColuna;
  // a travessa que segura as duas metades do apoio, embaixo da ponta de baixo delas (a coluna a segura)
  const atrasDoApoio = add(add(G.bordaBaixo, mul(G.normal, -esp - 3)), mul(G.sobe, 3));

  const T = (C: Parameters<PecaPropria['desenhar']>[0], M: Parameters<PecaPropria['desenhar']>[1], a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
  const desenharApoio = (C: Parameters<PecaPropria['desenhar']>[0], M: Parameters<PecaPropria['desenhar']>[1]) => {
    // as duas metades do estofado (o vão do meio deixa o peito passar), cada uma na sua chapa, e a travessa que as
    // segura, embaixo da ponta de baixo, presa na coluna da esquerda
    for (const sx of [-1, 1]) {
      const x: V3 = [sx * G.xMetade, 0, 0];
      C.estofado(add(add(meioDaFace, mul(G.normal, -esp)), x), G.sobe, G.normal, X, g('apoioComp'), esp, 2 * G.meiaMetade);
      const chapa = add(add(meioDaFace, mul(G.normal, -esp - 1)), x);
      C.tubo(add(chapa, mul(G.sobe, -g('apoioComp') / 2 + 2)), add(chapa, mul(G.sobe, g('apoioComp') / 2 - 4)), 2 * G.meiaMetade - 4, 2, M.metal, { up: G.normal });
      T(C, M, add(atrasDoApoio, x), add(add(atrasDoApoio, x), mul(G.normal, 3)), 4);
    }
    T(C, M, [xC, atrasDoApoio[1], atrasDoApoio[2]], [-G.xMetade - 3, atrasDoApoio[1], atrasDoApoio[2]], 5);
  };
  const fixa: PecaPropria = {
    t: 'propria',
    nome: mod.nome,
    fixa: [mod.objeto, m.assento, op.apoioAParte ?? false],
    desenhar(C, M, o) {
      // a base no chão: dois trilhos ao longo de z e as travessas
      const zB1 = G.eixo[2] + 4;
      for (const x of [-meiaLarg + 2, xC]) T(C, M, [x, tubo / 2, zTras], [x, tubo / 2, zB1]);
      for (const z of [zTras + 4, zB1]) T(C, M, [-meiaLarg + 2, tubo / 2, z], [xT1, tubo / 2, z]);
      T(C, M, [xT0, tubo / 2, zT0], [xT0, tubo / 2, zT1]);
      // o pé do assento: a luva parada e o tubo que sobe e desce dentro dela, com o pino de regular
      const zP = -cA / 2;
      T(C, M, [0, tubo, zP], [0, g('assentoMin') - esp - 6, zP], tubo + 2);
      T(C, M, [0, g('assentoMin') - esp - 12, zP], [0, m.assento - esp - 1, zP], tubo - 1.5);
      C.cilindro([0, g('assentoMin') - esp - 12, zP - (tubo + 2) / 2], [0, g('assentoMin') - esp - 12, zP - (tubo + 2) / 2 - 5], 1.6, M.cromo, { lados: 10 });
      C.cilindro([0, g('assentoMin') - esp - 12, zP - (tubo + 2) / 2 - 5], [0, g('assentoMin') - esp - 12, zP - (tubo + 2) / 2 - 7], 2.6, M.borracha, { lados: 12 });
      // a placa do assento e o estofado
      C.tubo([0, m.assento - esp - 1.5, zP - cA / 2 + 4], [0, m.assento - esp - 1.5, zP + cA / 2 - 4], meiaLarg * 1.2, 2, M.metal);
      C.estofado([0, m.assento - esp, zP], Z, Y, X, cA, esp, g('assentoLarg'));
      // o apoio da lombar (no tríceps): preso no carro do assento, sobe e desce com ele
      if (L) {
        C.estofado(add(L.meio, mul(L.frente, -esp)), L.sobe, L.frente, X, L.comp, esp, L.larg);
        const atras = add(L.meio, mul(L.frente, -esp - 2));
        T(C, M, [0, m.assento - esp - 4, zP], [0, m.assento - esp - 4, atras[2]], 5);
        T(C, M, [0, m.assento - esp - 4, atras[2]], atras, 5);
      }
      // a coluna da esquerda: do chão até o apoio dos braços, com o mancal do eixo e o came
      T(C, M, [xC, tubo, atrasDoApoio[2]], [xC, Math.max(atrasDoApoio[1], G.eixo[1]) + 3, atrasDoApoio[2]]);
      T(C, M, [xC, G.eixo[1], atrasDoApoio[2]], [xC, G.eixo[1], G.eixo[2]], 6);
      C.cilindro([xC, G.eixo[1], G.eixo[2]], [G.xCame - 3, G.eixo[1], G.eixo[2]], 3, M.cromo, { lados: 12 });
      if (!op.apoioAParte) desenharApoio(C, M);
      // a torre: quatro montantes, a tampa e as guias das placas
      for (const [x, z] of [
        [xT0, zT0],
        [xT1, zT0],
        [xT0, zT1],
        [xT1, zT1],
      ] as [number, number][])
        T(C, M, [x, tubo, z], [x, H, z], 4.5);
      for (const z of [zT0, zT1]) T(C, M, [xT0, H, z], [xT1, H, z], 4.5);
      for (const x of [xT0, xT1]) T(C, M, [x, H, zT0], [x, H, zT1], 4.5);
      for (const dz of [-6, 6]) C.cilindro([(xT0 + xT1) / 2, tubo, zTorre + dz], [(xT0 + xT1) / 2, H - 6, zTorre + dz], 0.8, M.cromo, { lados: 8 });
      // a polia do pé da torre e a do pé da coluna, por onde o cabo passa
      C.cilindro([(xT0 + xT1) / 2 - 1.5, 10, zT1 + 2], [(xT0 + xT1) / 2 + 1.5, 10, zT1 + 2], 4.5, M.metalClaro, { lados: 16 });
      C.cilindro([G.xCame - 1.5, 10, G.eixo[2]], [G.xCame + 1.5, 10, G.eixo[2]], 4.5, M.metalClaro, { lados: 16 });
      T(C, M, [G.xCame, tubo / 2, G.eixo[2]], [G.xCame, tubo / 2, zB1], 5);
      if (o.comSombra) C.sombra((xT1 - meiaLarg) / 2, (zTras + zFrente) / 2, (xT1 + meiaLarg) / 2 + 8, g('comp') / 2, 0.18);
    },
  };
  const apoio: PecaPropria | undefined = op.apoioAParte ? { t: 'propria', nome: `apoio dos braços da ${mod.nome}`, fixa: [mod.objeto], desenhar: (C, M) => desenharApoio(C, M) } : undefined;

  const subida = subidaDaPilhaDeBraco(m, mod);
  const n = g('pilhaPlacas'),
    kP = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  const rCame = g('cameDiam') / 2;
  const pilha: PecaPropria = {
    t: 'propria',
    nome: `pilha da ${mod.nome}`,
    desenhar(C, M) {
      const xP = (xT0 + xT1) / 2 - g('pilhaLarg') / 2,
        zP = zTorre + g('pilhaProf') / 2;
      if (n - kP > 0) C.pilha([xP, tubo + 2, zP], X, [0, 0, -1], g('pilhaLarg'), hp * (n - kP), g('pilhaProf'), n - kP);
      const yDo = tubo + 2 + hp * (n - kP) + subida;
      C.pilha([xP, yDo, zP], X, [0, 0, -1], g('pilhaLarg'), hp * kP, g('pilhaProf'), kP);
      C.cilindro([(xT0 + xT1) / 2, yDo + hp * kP, zTorre], [(xT0 + xT1) / 2, yDo + hp * kP + 10, zTorre], 1.2, M.cromo, { lados: 8 });
      // o cabo: do came, desce até a polia do pé da coluna, vai até a da torre e sobe por dentro dela até as placas
      const xc = (xT0 + xT1) / 2;
      const saida: V3 = [G.xCame, G.eixo[1] - rCame, G.eixo[2]];
      C.linha(saida, [G.xCame, 10 - 4.5, G.eixo[2]], '#202327', 0.7);
      C.linha([G.xCame, 10 - 4.5, G.eixo[2]], [xc, 10 - 4.5, zT1 + 2], '#202327', 0.7);
    },
  };
  const movel: PecaPropria = {
    t: 'propria',
    nome: `alavanca da ${mod.nome}`,
    desenhar(C, M) {
      // o came e o eixo
      const cx = (x: number): V3 => [x, G.eixo[1], G.eixo[2]];
      C.cilindro(cx(G.xCame - 3), cx(G.xCame + 3), rCame, M.metalClaro, { lados: 24 });
      C.cilindro(cx(G.xCame + 3), cx(G.xAlavanca + 3), 3, M.cromo, { lados: 12 });
      // a alavanca: do came até a barra, do lado de fora
      C.tubo(cx(G.xAlavanca), P.ponta, 5, 5, M.metal, { up: X });
      if (mod.pegador === 'barra') {
        // a barra reta atravessada, com uma borracha para cada mão
        C.cilindro(add(P.ponta, [2.5, 0, 0]), [-g('barraMeia'), P.barra[1], P.barra[2]], g('barraDiam') / 2, M.cromo, { lados: 12 });
        for (const k of ['R', 'L'] as Lado[]) {
          const c = P.centro[k];
          C.cilindro(add(c, [-g('pegadorComp') / 2, 0, 0]), add(c, [g('pegadorComp') / 2, 0, 0]), g('barraDiam') / 2 + 0.5, M.borracha, { lados: 14 });
        }
      } else {
        // a barra que junta os pegadores, embaixo deles, e um pegador em pé para cada mão
        const x0 = -((m.pegadaMeia ?? g('pegadaMeia')) + 2);
        C.cilindro(add(P.ponta, [2.5, 0, 0]), [x0, P.barra[1], P.barra[2]], g('barraDiam') / 2, M.cromo, { lados: 12 });
        for (const k of ['R', 'L'] as Lado[]) {
          const c = P.centro[k];
          const pe = add(c, mul(P.dirNeutro, -g('pegadorComp') / 2));
          C.cilindro([c[0], P.barra[1], P.barra[2]], pe, 1.4, M.cromo, { lados: 10 });
          C.cilindro(pe, add(c, mul(P.dirNeutro, g('pegadorComp') / 2)), g('barraDiam') / 2 + 0.5, M.borracha, { lados: 14 });
        }
      }
    },
  };
  return {
    prims,
    fixa,
    apoio,
    movel,
    pilha,
    pegadores: P.centro,
    eixo: G.eixo,
    subida,
    lombar: L,
    extremos: { zTras, zFrente, xDireita: (mod.pegador === 'barra' ? -g('barraMeia') : -g('apoioLarg') / 2) - 2, xEsquerda: xT1 + 2 },
  };
}

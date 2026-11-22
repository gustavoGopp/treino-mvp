// Peça de cena: a máquina de abdominal (abdominal sentado). Medidas em ../dados/objetos/abdominal-maquina.json: o tamanho
// total vem das fichas da Life Fitness (SS-AB, 133 × 117 × 148 cm), da Hammer Strength (HS-ABC), da Movement e da
// Technogym (MK83); a espessura dos estofados, da Precor. Como ela funciona vem do manual público da Life Fitness
// (Insignia, SS-AB): o assento regula na altura em que o apoio da lombar fica na lombar; as mãos seguram os pegadores;
// as almofadas ficam sobre o peito, presas a um braço que gira para a frente em volta de um eixo atrás da lombar; os
// braços "só guiam". As medidas que fazem a máquina funcionar (onde fica o eixo, onde ficam as almofadas e os
// pegadores) não aparecem em nenhuma ficha: saem do corpo (o exercício as calcula e a conferência as mede).
//
// Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `abdominal_maquina`): o assento azul, as
// duas almofadas que descem sobre o peito com os pegadores em cima, os rolos dos pés e a torre da pilha. O que muda: no
// cartão, o braço gira num eixo alto, atrás da cabeça; aqui ele gira num eixo baixo, ao lado da lombar, como no manual
// da Life Fitness (e como pede o movimento: o tronco enrola em volta da coluna, e não do alto da cabeça); e o cartão
// não tem o apoio da lombar, que o manual tem.
//
// A máquina funciona: o braço (as duas hastes que sobem pelos lados do corpo e vêm à frente do peito, as almofadas e
// os pegadores, que saem da ponta de baixo das almofadas) gira inteiro no eixo; o came gira com ele e enrola o cabo, e
// as placas escolhidas sobem o arco do came (raio × ângulo girado desde a posição inicial). Os pegadores e as hastes
// ficam abaixo dos ombros: nada da máquina passa na altura do rosto (de lado, nada fica na frente dele).
//
// Eixos: quem senta olha para +z; o assento fica centrado em x = 0, com a borda da frente em z = 0. O lado esquerdo de
// quem senta é +x (o direito, que a vista de lado mostra, é −x): o came e a torre ficam à esquerda.
import type { Prim } from '../desenho';
import type { Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { obj } from '../tabelas';
import { add, cross, girar, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('abdominalMaquina', id);
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0],
  Z: V3 = [0, 0, 1];

/** Uma almofada do peito: o centro da face que encosta no peito, a direção para fora do peito e a direção ao longo dela (para cima). */
export interface AlmofadaDoPeito {
  centro: V3;
  normal: V3;
  ao: V3;
}
/** O que a máquina recebe: as regulagens e, na posição inicial (o braço em 0°), onde ficam as almofadas e os pegadores. */
export interface AbdominalMaquina {
  /** A altura do topo do assento (cm). */
  assento: number;
  /** O centro da face da frente do apoio da lombar e a direção para a pessoa. */
  lombar: { centro: V3; normal: V3 };
  /** O ponto do eixo do braço (o eixo corre em x). */
  eixo: V3;
  /** Meia distância entre as duas hastes do braço (cm). */
  xBraco: number;
  /** O z da parte das hastes que vem à frente do peito, na posição inicial: à frente dos braços de quem treina. */
  zHaste: number;
  almofadas: Record<Lado, AlmofadaDoPeito>;
  /** O centro de cada pegador e a direção dele (de baixo para cima), na posição inicial. */
  pegadores: Record<Lado, { centro: V3; eixo: V3 }>;
  /** O ângulo do braço (graus, para a frente, a partir da posição inicial). */
  alavanca: number;
  /** Os rolos dos pés: o centro (no meio, em x) e o lado de baixo deles encosta no peito do pé. */
  rolos: V3;
  /** O fundo da máquina (z da base, atrás) e quantas placas estão no pino. */
  zTras: number;
  placas?: number;
  /**
   * O lado (de quem senta) cuja haste do braço e cujo montante do eixo vão para trás do corpo, como cenário: de lado,
   * eles passariam na frente das costas e do ombro de quem treina. É um corte de ilustração, como no smith.
   */
  pertoAtras?: Lado;
}

/** Gira um ponto do braço no eixo (em x), `graus` para a frente. */
export const noBraco = (m: Pick<AbdominalMaquina, 'eixo'>, graus: number) => (p: V3): V3 => add(m.eixo, girar(sub(p, m.eixo), X, graus));
/** Gira uma direção do braço. */
export const direcaoNoBraco = (graus: number) => (d: V3): V3 => girar(d, X, graus);
/** Quanto as placas sobem (cm) com o braço girado `graus` para a frente. */
export const subidaDaPilhaDoAbdominal = (graus: number) => Math.max(0, graus) * (Math.PI / 180) * (g('cameDiam') / 2);

/** As almofadas e os pegadores com o braço girado (no mundo). */
export function bracoDoAbdominal(m: AbdominalMaquina) {
  const P = noBraco(m, m.alavanca),
    D = direcaoNoBraco(m.alavanca);
  const almofadas = {} as Record<Lado, AlmofadaDoPeito>,
    pegadores = {} as Record<Lado, { centro: V3; eixo: V3 }>;
  for (const k of ['R', 'L'] as Lado[]) {
    const a = m.almofadas[k];
    almofadas[k] = { centro: P(a.centro), normal: D(a.normal), ao: D(a.ao) };
    pegadores[k] = { centro: P(m.pegadores[k].centro), eixo: D(m.pegadores[k].eixo) };
  }
  return { almofadas, pegadores, P, D };
}

/**
 * A máquina: os volumes para a conferência (o assento, o apoio da lombar, as almofadas, os pegadores, as hastes
 * e os rolos: onde o corpo encosta e o que ele não pode atravessar), a estrutura parada e o braço que gira.
 */
export function abdominalMaquina(m: AbdominalMaquina) {
  const esp = g('estofadoEsp'),
    tubo = g('tubo');
  const meiaLarg = g('assentoLarg') / 2;
  const B = bracoDoAbdominal(m);
  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  const xb = m.xBraco;
  // o caminho de cada haste: do eixo sobe pelo lado do corpo, por fora do braço de quem treina, até a altura das
  // almofadas, vem para a frente por fora do braço, passa à frente dele e volta até a borda de fora da almofada (nada
  // passa na altura do rosto)
  const caminho = (k: Lado): V3[] => {
    const s = k === 'R' ? -1 : 1;
    const a = m.almofadas[k];
    const fora = norm(cross(a.ao, a.normal));
    const borda = add(add(a.centro, mul(a.normal, esp / 2)), mul(fora, (Math.sign(fora[0]) === s ? 1 : -1) * (g('almofadaLarg') / 2)));
    // a parte da frente passa à frente do braço de quem treina (`zHaste`) e volta até a borda da almofada
    const zH = Math.max(borda[2], m.zHaste);
    const pts: V3[] = [[s * xb, m.eixo[1], m.eixo[2]], [s * xb, borda[1], m.eixo[2]], [s * xb, borda[1], zH], [borda[0], borda[1], zH], borda];
    return pts.map(B.P);
  };
  const pegBase = (k: Lado): V3 => B.P(add(m.pegadores[k].centro, mul(m.pegadores[k].eixo, -g('pegadorComp') / 2 - 3)));
  const prims: Prim[] = [
    // o assento
    caixa([0, m.assento - esp / 2, -g('assentoComp') / 2], X, Y, Z, [meiaLarg, esp / 2, g('assentoComp') / 2], 'estofado'),
    // o apoio da lombar
    caixa(add(m.lombar.centro, mul(m.lombar.normal, -esp / 2)), X, Y, m.lombar.normal, [g('lombarLarg') / 2, g('lombarAlt') / 2, esp / 2], 'estofado'),
    // os rolos dos pés
    { t: 'volume', vol: cilindro(add(m.rolos, [-g('roloComp') - 1, 0, 0]), add(m.rolos, [g('roloComp') + 1, 0, 0]), g('roloDiam') / 2), cls: 'estofado', vies: 0.5 },
  ];
  for (const k of ['R', 'L'] as Lado[]) {
    const a = B.almofadas[k];
    prims.push(caixa(add(a.centro, mul(a.normal, esp / 2)), norm(cross(a.ao, a.normal)), a.ao, a.normal, [g('almofadaLarg') / 2, g('almofadaComp') / 2, esp / 2], 'estofado'));
    const c = caminho(k);
    for (let i = 1; i + 1 < c.length; i++) prims.push({ t: 'volume', vol: cilindro(c[i]!, c[i + 1]!, 2.5), cls: 'obj', vies: 0.5 });
  }

  // a torre da pilha: à esquerda de quem senta, atrás do eixo, com a frente virada para o assento
  const xT0 = g('larg') - meiaLarg - 8 - 34,
    xT1 = xT0 + 34;
  const zTorre = m.zTras + 22;
  const zT0 = zTorre - 16,
    zT1 = zTorre + 16;
  const H = g('alturaTorre');
  const zFrente = m.zTras + g('comp');
  const xC = xb + 6;
  const fixa: PecaPropria = {
    t: 'propria',
    nome: 'máquina de abdominal',
    fixa: [m.assento, m.eixo, m.lombar.centro, m.rolos, m.zTras],
    desenhar(C, M, o) {
      const T = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
      // a base no chão: dois trilhos ao longo de z (sob o assento e sob o eixo) e as travessas até a torre
      for (const x of [-xb, xb]) T([x, tubo / 2, m.zTras], [x, tubo / 2, m.rolos[2] + 6]);
      for (const z of [m.zTras + 4, m.eixo[2]]) T([-xb, tubo / 2, z], [xT1, tubo / 2, z]);
      T([xT0, tubo / 2, zT0], [xT0, tubo / 2, zT1]);
      T([xT1, tubo / 2, zT0], [xT1, tubo / 2, zT1]);
      // o pé do assento (o tubo que regula a altura) e o assento
      T([0, tubo, -g('assentoComp') / 2], [0, m.assento - esp - 2, -g('assentoComp') / 2]);
      T([-xb, tubo / 2, -g('assentoComp') / 2], [xb, tubo / 2, -g('assentoComp') / 2]);
      C.estofado([0, m.assento - esp, -g('assentoComp') / 2], Z, Y, X, g('assentoComp'), esp, g('assentoLarg'));
      // os dois montantes do eixo, dos lados, e o apoio da lombar preso a uma travessa entre eles
      for (const x of [-xb - 4, xb + 4]) if (!m.pertoAtras || Math.sign(x) !== (m.pertoAtras === 'R' ? -1 : 1)) T([x, tubo, m.eixo[2]], [x, m.eixo[1] + 4, m.eixo[2]], 6);
      const lt = add(m.lombar.centro, mul(m.lombar.normal, -esp - 3));
      T([-xb - 4, lt[1], lt[2]], [xb + 4, lt[1], lt[2]], 5);
      T([-xb - 4, lt[1], lt[2]], [-xb - 4, lt[1], m.eixo[2]], 5);
      T([xb + 4, lt[1], lt[2]], [xb + 4, lt[1], m.eixo[2]], 5);
      C.estofado(add(m.lombar.centro, mul(m.lombar.normal, -esp)), Y, m.lombar.normal, X, g('lombarAlt'), esp, g('lombarLarg'));
      // os rolos dos pés: a haste que sai da frente da base e os dois rolos
      T([0, tubo / 2, -g('assentoComp') / 2], [0, tubo / 2, m.rolos[2]], 5);
      T([0, tubo / 2, m.rolos[2]], [0, m.rolos[1], m.rolos[2]], 4.5);
      for (const s of [-1, 1]) C.cilindro(add(m.rolos, [s * 1.5, 0, 0]), add(m.rolos, [s * (g('roloComp') + 1.5), 0, 0]), g('roloDiam') / 2, M.estofado, { lados: 18 });
      C.cilindro(add(m.rolos, [-g('roloComp') - 1.5, 0, 0]), add(m.rolos, [g('roloComp') + 1.5, 0, 0]), 1.2, M.cromo, { lados: 10 });
      // a torre: quatro montantes, a tampa e as guias das placas
      for (const [x, z] of [
        [xT0, zT0],
        [xT1, zT0],
        [xT0, zT1],
        [xT1, zT1],
      ] as [number, number][])
        T([x, tubo, z], [x, H, z], 4.5);
      for (const z of [zT0, zT1]) T([xT0, H, z], [xT1, H, z], 4.5);
      for (const x of [xT0, xT1]) T([x, H, zT0], [x, H, zT1], 4.5);
      for (const dz of [-6, 6]) C.cilindro([(xT0 + xT1) / 2, tubo, zTorre + dz], [(xT0 + xT1) / 2, H - 6, zTorre + dz], 0.8, M.cromo, { lados: 8 });
      C.cilindro([(xT0 + xT1) / 2 - 1.5, 10, zT1 + 2], [(xT0 + xT1) / 2 + 1.5, 10, zT1 + 2], 4.5, M.metalClaro, { lados: 16 });
      if (o.comSombra) C.sombra((xT1 - xb) / 2, (m.zTras + zFrente) / 2, (xT1 + xb) / 2 + 8, g('comp') / 2, 0.18);
    },
  };

  const subida = subidaDaPilhaDoAbdominal(m.alavanca);
  const n = g('pilhaPlacas'),
    kP = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  /** Uma haste do braço: do eixo, pelo lado do corpo e por cima do ombro, até a almofada. */
  const haste = (C: Parameters<PecaPropria['desenhar']>[0], M: Parameters<PecaPropria['desenhar']>[1], k: Lado) => {
    const c = caminho(k);
    for (let i = 0; i + 1 < c.length; i++) C.tubo(c[i]!, c[i + 1]!, 5, 5, M.metal, { up: B.D([0, 0, 1]) });
  };
  const movel: PecaPropria = {
    t: 'propria',
    nome: 'braço da máquina de abdominal',
    desenhar(C, M) {
      // as placas: as que ficam embaixo e as do pino, que sobem; a haste que as atravessa
      const xP = (xT0 + xT1) / 2 - g('pilhaLarg') / 2,
        zP = zTorre + g('pilhaProf') / 2;
      if (n - kP > 0) C.pilha([xP, tubo + 2, zP], X, [0, 0, -1], g('pilhaLarg'), hp * (n - kP), g('pilhaProf'), n - kP);
      const yDo = tubo + 2 + hp * (n - kP) + subida;
      C.pilha([xP, yDo, zP], X, [0, 0, -1], g('pilhaLarg'), hp * kP, g('pilhaProf'), kP);
      C.cilindro([(xT0 + xT1) / 2, yDo + hp * kP, zTorre], [(xT0 + xT1) / 2, yDo + hp * kP + 10, zTorre], 1.2, M.cromo, { lados: 8 });
      // o cabo: do came desce até a polia do pé da torre
      const rC = g('cameDiam') / 2;
      const saida: V3 = [xC + 1, m.eixo[1] - rC, m.eixo[2]];
      const polia: V3 = [(xT0 + xT1) / 2, 10 - 4.5, zT1 + 2];
      C.linha(saida, [saida[0], 10 - 4.5, saida[2]], '#202327', 0.7);
      C.linha([saida[0], 10 - 4.5, saida[2]], polia, '#202327', 0.7);
      // o came e o eixo
      const cx = (x: number): V3 => [x, m.eixo[1], m.eixo[2]];
      C.cilindro(cx(xC - 3), cx(xC + 3), rC, M.metalClaro, { lados: 24 });
      C.cilindro(cx(-xb - 7), cx(xC + 5), 2.4, M.cromo, { lados: 12 });
      // as duas hastes do braço, pelos lados do corpo e à frente do peito, até as almofadas (a do lado de perto, se for cenário,
      // vai à parte)
      for (const k of ['R', 'L'] as Lado[]) {
        if (k !== m.pertoAtras) haste(C, M, k);
        // a almofada do peito: a face de trás encosta no peito
        const a = B.almofadas[k];
        C.estofado(a.centro, a.ao, a.normal, norm(cross(a.ao, a.normal)), g('almofadaComp'), esp, g('almofadaLarg'));
        // o pegador: a haste que sai da ponta de baixo da almofada, pela frente dela, e a empunhadura de borracha
        const p = B.pegadores[k];
        const base = pegBase(k);
        const pe = add(a.centro, add(mul(a.ao, -g('almofadaComp') / 2 + 2), mul(a.normal, esp)));
        C.tubo(pe, base, 3.5, 3.5, M.metal);
        C.cilindro(add(p.centro, mul(p.eixo, -g('pegadorComp') / 2 - 3)), add(p.centro, mul(p.eixo, -g('pegadorComp') / 2)), 1.6, M.metal, { lados: 10 });
        C.cilindro(add(p.centro, mul(p.eixo, -g('pegadorComp') / 2)), add(p.centro, mul(p.eixo, g('pegadorComp') / 2)), g('pegadorDiam') / 2, M.borracha, { lados: 12, dz: 6 });
      }
    },
  };
  // o lado de perto que vai para trás do corpo, como cenário: a haste e o montante do eixo daquele lado
  const perto: PecaPropria | undefined = m.pertoAtras
    ? {
        t: 'propria',
        nome: 'braço da máquina de abdominal (o lado de perto)',
        cenario: true,
        desenhar(C, M) {
          haste(C, M, m.pertoAtras!);
          const x = (m.pertoAtras === 'R' ? -1 : 1) * (xb + 4);
          C.tubo([x, tubo, m.eixo[2]], [x, m.eixo[1] + 4, m.eixo[2]], 6, 6, M.metal);
        },
      }
    : undefined;
  return { prims, fixa, movel, perto, subida, braco: B, hastes: { R: caminho('R'), L: caminho('L') }, extremos: { zTras: m.zTras, zFrente, xDireita: -xb - 8, xEsquerda: xT1 + 2 } };
}

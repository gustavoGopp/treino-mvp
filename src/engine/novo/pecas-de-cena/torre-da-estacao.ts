// O desenho comum das torres das estações de polia com assento (a estação de puxada, ./estacao-puxada.ts, e a de
// remada baixa, ./estacao-remada.ts): a torre de quatro montantes com a pilha de placas, as duas guias cromadas, a haste
// do pino que sai do alto das placas e a roldana do alto da torre. Parte do cartão de hoje
// (scripts/desenhos-equipamento/realista/itens.mjs, a função `torre`: quatro montantes, a moldura de cima, a chapa da
// base, as guias e a pilha), com as medidas de cada estação.
//
// A torre fica de frente para quem senta: a frente dela (a face das placas) olha para −z, no plano z = `frente`; ela
// vai para trás (para +z) `prof` cm, centrada em x = 0. As placas do pino sobem `subida` cm (o curso do cabo dividido
// pela relação da máquina); as outras ficam paradas embaixo.
import type { Materiais } from '../equipamento';
import type { CenaRealista } from '../realista/base.mjs';
import type { V3 } from '../vec';

export interface TorreDaEstacao {
  /** O plano da frente da torre (z) e o tamanho dela. */
  frente: number;
  larg: number;
  prof: number;
  altura: number;
  tubo: number;
  /** A pilha: quantas placas, a espessura de cada uma, o tamanho, quantas estão no pino e quanto sobem. */
  placas: number;
  placaEsp: number;
  pilhaLarg: number;
  pilhaProf: number;
  noPino: number;
  subida: number;
  /** O raio da roldana do alto da torre. */
  rRoldana: number;
}

/** A altura de onde as placas apoiam (o topo da chapa da base). */
const APOIO = 6;

/** Onde o cabo prende na haste do pino, no alto das placas que sobem, e o centro da roldana do alto da torre. */
export function pontosDaTorre(t: TorreDaEstacao): { pino: V3; roldana: V3 } {
  const zc = t.frente + t.prof / 2;
  const topo = APOIO + t.placas * t.placaEsp + t.subida;
  // a roldana do alto fica à frente do meio da torre: o cabo desce pelo lado de trás dela, reto até a haste do pino
  return { pino: [0, topo + 10, zc], roldana: [0, t.altura - t.tubo - t.rRoldana - 2, zc - t.rRoldana] };
}

/** A torre: a parte parada (estrutura, guias, roldana do alto) e a que se mexe (as placas do pino e a haste). */
export function desenharTorreDaEstacao(C: CenaRealista, M: Materiais, t: TorreDaEstacao): void {
  const T = (a: V3, b: V3, w = t.tubo) => C.tubo(a, b, w, w, M.metal);
  const x0 = -t.larg / 2,
    x1 = t.larg / 2,
    z0 = t.frente,
    z1 = t.frente + t.prof,
    zc = (z0 + z1) / 2;
  // a chapa da base e os quatro montantes, com a moldura de cima
  C.prisma(
    [
      [x0 - 3, z0 - 3],
      [x1 + 3, z0 - 3],
      [x1 + 3, z1 + 3],
      [x0 - 3, z1 + 3],
    ],
    [0, 0, 0],
    [1, 0, 0],
    [0, 0, 1],
    [0, APOIO - 1, 0],
    M.metal,
  );
  for (const x of [x0, x1]) for (const z of [z0, z1]) T([x, APOIO - 1, z], [x, t.altura, z], 4.5);
  for (const z of [z0, z1]) T([x0, t.altura - 2.2, z], [x1, t.altura - 2.2, z], 4.5);
  for (const x of [x0, x1]) T([x, t.altura - 2.2, z0], [x, t.altura - 2.2, z1], 4.5);
  // as guias cromadas das placas
  for (const s of [-1, 1]) C.cilindro([s * t.pilhaLarg * 0.3, APOIO, zc], [s * t.pilhaLarg * 0.3, t.altura - t.tubo, zc], 0.8, M.cromo, { lados: 8 });
  // a pilha: as placas que ficam e as do pino, que sobem; a frente das placas olha para quem senta (−z)
  const base = (y: number): V3 => [-t.pilhaLarg / 2, y, zc - t.pilhaProf / 2];
  const ficam = t.placas - t.noPino;
  if (ficam > 0) C.pilha(base(APOIO), [1, 0, 0], [0, 0, 1], t.pilhaLarg, ficam * t.placaEsp, t.pilhaProf, ficam);
  const yPino = APOIO + ficam * t.placaEsp + t.subida;
  C.pilha(base(yPino), [1, 0, 0], [0, 0, 1], t.pilhaLarg, t.noPino * t.placaEsp, t.pilhaProf, t.noPino);
  // a haste do pino, que sai do alto das placas até onde o cabo prende
  const { pino, roldana } = pontosDaTorre(t);
  C.cilindro([0, yPino + t.noPino * t.placaEsp, zc], pino, 1.2, M.cromo, { lados: 8 });
  C.cilindro(pino, [0, pino[1] + 3, zc], 2, M.metalClaro, { lados: 10 });
  // a roldana do alto da torre, presa na moldura
  C.cilindro([-1.3, roldana[1], roldana[2]], [1.3, roldana[1], roldana[2]], t.rRoldana, M.metalClaro, { lados: 18 });
  T([0, t.altura - 2.2, z0], [0, t.altura - 2.2, z1], 4);
}

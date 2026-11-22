// Peça de cena: a estação de puxada (o puxador alto) e a barra longa de puxada. Medidas em
// ../dados/objetos/estacao-puxada.json: o tamanho total vem das fichas da Life Fitness, da Hammer Strength, da Movement
// e da Spirit; a relação do cabo (1:1) e o número de placas, da Spirit; a barra, da Titan (48 pol, 28 mm, o trecho reto
// de 30 pol). As medidas que fazem a máquina servir a quem senta (a altura do assento, onde fica o rolo das coxas e a
// roldana de cima) não aparecem nas fichas e são de desenho, com o motivo.
//
// Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `estacao_puxada`): a torre com a pilha, o
// braço de cima com a roldana, o cabo que desce até a barra de pontas caídas, o assento azul e os dois rolos das coxas
// numa coluna à frente dele. A diferença: aqui quem senta fica de frente para a torre (como nas fichas e nas academias),
// e o braço de cima vem da torre até em cima da cabeça.
//
// A máquina funciona: o cabo sai da barra, sobe até a roldana de cima, corre por baixo do braço até a roldana do alto
// da torre e desce até a haste do pino; as placas do pino sobem o mesmo que o cabo anda (a relação 1:1). Os rolos das
// coxas sobem e descem na coluna deles (a regulagem), até encostar nas coxas.
//
// Eixos: quem senta olha para +z; o meio do assento fica em x = 0, z = 0. A torre fica à frente, com as placas viradas
// para quem senta.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import type { CenaRealista } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { desenharTorreDaEstacao, pontosDaTorre } from './torre-da-estacao';
import type { TorreDaEstacao } from './torre-da-estacao';

const g = (id: string) => obj('estacaoPuxada', id);
const b = (id: string) => obj('barraPuxada', id);
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0],
  Z: V3 = [0, 0, 1];

/** A regulagem e o instante da máquina. */
export interface EstacaoPuxada {
  /** A altura do eixo dos rolos das coxas (cm, do chão): a regulagem. */
  rolo: number;
  /** Quanto as placas do pino sobem (cm). */
  subida: number;
  /** Quantas placas estão no pino. */
  placas: number;
}

/** O centro da roldana de cima (por onde o cabo desce até a barra). */
export const roldanaDeCima = (): V3 => [0, g('altura') - g('poliaAbaixoDoTopo'), g('poliaFrente')];

/**
 * O ponto em que o cabo sai da roldana de cima, indo para `p` (o mosquetão da barra): a tangente pelo lado de trás da
 * roldana (o cabo dá a volta por cima dela e segue para a frente, por baixo do braço, até a torre).
 */
export function saidaDeCima(p: V3): V3 {
  const c = roldanaDeCima(),
    r = g('roldanaDiam') / 2;
  // no plano yz (a roldana gira em volta de x)
  const dy = p[1] - c[1],
    dz = p[2] - c[2];
  const d = Math.hypot(dy, dz);
  const a = Math.acos(Math.min(1, r / d));
  const base = Math.atan2(dy, dz);
  // as duas tangentes; fica a de trás (menor z)
  const t1: V3 = [p[0], c[1] + r * Math.sin(base + a), c[2] + r * Math.cos(base + a)];
  const t2: V3 = [p[0], c[1] + r * Math.sin(base - a), c[2] + r * Math.cos(base - a)];
  return t1[2] < t2[2] ? t1 : t2;
}

function torreDe(m: EstacaoPuxada): TorreDaEstacao {
  return {
    frente: g('torreFrente'),
    larg: g('torreLarg'),
    prof: g('torreProf'),
    altura: g('altura'),
    tubo: g('tubo'),
    placas: g('pilhaPlacas'),
    placaEsp: g('placaEsp'),
    pilhaLarg: g('pilhaLarg'),
    pilhaProf: g('pilhaProf'),
    noPino: m.placas,
    subida: m.subida,
    rRoldana: g('roldanaDiam') / 2,
  };
}

/**
 * A estação: os volumes para a conferência (o assento, os rolos e a coluna deles, onde o corpo encosta e que ele não
 * pode atravessar), o assento e a base (pintados atrás do corpo, como cenário: o corpo senta por cima deles), os rolos
 * (na ordem de profundidade, por cima das coxas) e a torre com o braço de cima (na ordem de profundidade; o quadro mostra
 * a frente da torre e a roldana de cima).
 */
export function estacaoPuxada(m: EstacaoPuxada) {
  const h = g('assentoAltura'),
    esp = g('estofadoEsp'),
    cA = g('assentoComp'),
    lA = g('assentoLarg'),
    tubo = g('tubo');
  const zR = g('roloFrente'),
    rR = g('roloDiam') / 2,
    lR = g('roloComp');
  const xR = lR / 2 + 3;
  const T = torreDe(m);
  const zT = T.frente,
    zFundo = T.frente + T.prof;
  const zTras = -cA / 2 - 4;
  const polia = roldanaDeCima();
  const rP = g('roldanaDiam') / 2;
  const P = pontosDaTorre(T);

  const caixa = (o: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x: X, y: Y, z: Z }, meias, cls, vies: 0.5 });
  const prims: Prim[] = [
    caixa([0, h - esp / 2, 0], [lA / 2, esp / 2, cA / 2], 'estofado'),
    // a coluna dos rolos, entre as pernas (até embaixo da barra dos rolos)
    caixa([0, (m.rolo - rR) / 2, zR], [2.5, (m.rolo - rR) / 2, 2.5], 'obj'),
    ...[-1, 1].map((s): Prim => ({ t: 'volume', vol: cilindro([s * (xR - lR / 2), m.rolo, zR], [s * (xR + lR / 2), m.rolo, zR], rR), cls: 'estofado', vies: 0.5 })),
  ];

  const T_ = (C: CenaRealista, M: Materiais) => (a: V3, b2: V3, w = tubo) => C.tubo(a, b2, w, w, M.metal);
  const assento: PecaPropria = {
    t: 'propria',
    nome: 'assento da estação de puxada',
    fixa: [h],
    cenario: true,
    desenhar(C, M, o) {
      const t = T_(C, M);
      // a base no chão: a longarina do meio, do assento à torre, e as travessas
      t([0, tubo / 2, zTras], [0, tubo / 2, zT]);
      t([-lA / 2 + 4, tubo / 2, zTras + 2], [lA / 2 - 4, tubo / 2, zTras + 2]);
      // a coluna do assento e o assento
      t([0, tubo, 0], [0, h - esp - 1, 0], 7);
      C.tubo([-lA / 2 + 6, h - esp - 3, -cA / 2 + 6], [lA / 2 - 6, h - esp - 3, -cA / 2 + 6], 4, 3, M.metal);
      C.estofado([0, h - esp, 0], Z, Y, X, cA, esp, lA);
      if (o.comSombra) C.sombra(0, (zTras + zFundo) / 2, T.larg / 2 + 14, (zFundo - zTras) / 2 + 4, 0.18);
    },
  };

  const rolos: PecaPropria = {
    t: 'propria',
    nome: 'rolos das coxas',
    fixa: [m.rolo],
    desenhar(C, M) {
      // a coluna dos rolos: o tubo de fora preso na base e o de dentro, cromado, que corre nele (a regulagem)
      C.tubo([0, tubo / 2, zR], [0, Math.min(34, m.rolo - rR - 8), zR], 5.5, 5.5, M.metal);
      C.cilindro([0, Math.min(34, m.rolo - rR - 8) - 2, zR], [0, m.rolo, zR], 1.7, M.cromo, { lados: 10 });
      C.cilindro([-xR - lR / 2 + 2, m.rolo, zR], [xR + lR / 2 - 2, m.rolo, zR], 1.5, M.cromo, { lados: 10 });
      for (const s of [-1, 1]) C.cilindro([s * (xR - lR / 2), m.rolo, zR], [s * (xR + lR / 2), m.rolo, zR], rR, M.estofado, { lados: 18 });
    },
  };

  // o braço de cima: da moldura da torre até atrás da roldana de cima
  const yBraco = g('altura') - tubo / 2;
  const torre: PecaPropria = {
    t: 'propria',
    nome: 'torre da estação de puxada',
    noQuadro: [
      [-T.larg / 2, 0, zT],
      [T.larg / 2, 0, zT],
      [-T.larg / 2, g('altura'), zT],
      [0, g('altura'), polia[2] - rP - 4],
    ],
    desenhar(C, M) {
      desenharTorreDaEstacao(C, M, T);
      const t = T_(C, M);
      t([0, yBraco, polia[2] - rP - 4], [0, yBraco, zT + T.prof / 2], tubo);
      // a forquilha da roldana de cima, pendurada no braço, e a roldana
      for (const s of [-1, 1]) C.tubo([s * 2.2, yBraco - tubo / 2, polia[2]], [s * 2.2, polia[1], polia[2]], 1, 4, M.metal);
      C.cilindro([-1.4, polia[1], polia[2]], [1.4, polia[1], polia[2]], rP, M.metalClaro, { lados: 18 });
      C.cilindro([-1.8, polia[1], polia[2]], [1.8, polia[1], polia[2]], rP * 0.3, M.borracha, { lados: 10 });
      // o cabo: do alto da roldana de cima, para a frente por baixo do braço, até o alto da roldana da torre, e desce
      // pelo lado de trás dela até a haste do pino
      const rT = T.rRoldana;
      C.polilinha(
        [
          [0, polia[1] + rP, polia[2]],
          [0, P.roldana[1] + rT, P.roldana[2]],
        ],
        '#1d2024',
        0.8,
      );
      C.linha([0, P.roldana[1], P.roldana[2] + rT], P.pino, '#1d2024', 0.8);
    },
  };
  return { prims, assento, rolos, torre, polia, extremos: { zTras, zFundo } };
}

/* ============================== a barra longa de puxada ============================== */

export interface BarraPuxadaMontada {
  /** O meio da barra, as duas pontas do trecho reto, as duas pontas caídas, a ponta da aba e a do mosquetão. */
  meio: V3;
  a: V3;
  b: V3;
  pa: V3;
  pb: V3;
  aba: V3;
  ponta: V3;
  /** Do meio da barra para o lado do cabo (perpendicular à barra) e o eixo da barra (de `a` para `b`). */
  paraOCabo: V3;
  eixo: V3;
}

/**
 * A barra com o meio em `meio`, ao longo de `eixo`, e a aba apontada para `polia` (perpendicular à barra): o cabo puxa o
 * mosquetão na linha dele. As pontas caem para o lado contrário ao do cabo.
 */
export function montarBarraPuxada(meio: V3, eixo: V3, polia: V3): BarraPuxadaMontada {
  const u = norm(eixo);
  const d = norm(perp(sub(polia, meio), u));
  const L = b('retaComp') / 2;
  const q = (b('pontaQueda') * Math.PI) / 180;
  const ponta = (b('comp') - b('retaComp')) / 2 / Math.cos(q);
  const a = add(meio, mul(u, -L)),
    bb = add(meio, mul(u, L));
  const cai = (p: V3, s: number) => add(p, add(mul(u, s * ponta * Math.cos(q)), mul(d, -ponta * Math.sin(q))));
  const aba = add(meio, mul(d, b('abaAltura')));
  return { meio, a, b: bb, pa: cai(a, -1), pb: cai(bb, 1), aba, ponta: add(aba, mul(d, b('mosquetao'))), paraOCabo: d, eixo: u };
}

/** Os volumes (para a conferência) e o desenho realista da barra. */
export function barraPuxada(m: BarraPuxadaMontada): { prims: Prim[]; peca: PecaPropria } {
  const r = b('diam') / 2;
  const prims: Prim[] = [
    { t: 'volume', vol: cilindro(m.a, m.b, r), cls: 'aco', vies: 0 },
    { t: 'volume', vol: cilindro(m.pa, m.a, r), cls: 'aco', vies: 0 },
    { t: 'volume', vol: cilindro(m.b, m.pb, r), cls: 'aco', vies: 0 },
    { t: 'fio', pts: [m.meio, m.aba, m.ponta], larg: 1.2, cls: 'fita', vies: -0.5 },
  ];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'barra longa de puxada',
    desenhar(C: CenaRealista, M: Materiais) {
      // o trecho reto, cromado (as mãos ficam por cima na pintura), as pontas caídas com a borracha e as tampas
      C.cilindro(m.a, m.b, r, M.cromo, { lados: 12, dz: 6 });
      for (const [p, q] of [
        [m.a, m.pa],
        [m.b, m.pb],
      ] as [V3, V3][]) {
        const dir = norm(sub(q, p));
        const ini = sub(q, mul(dir, b('pegadorComp')));
        C.cilindro(p, ini, r, M.cromo, { lados: 12, dz: 6 });
        C.cilindro(ini, q, r * 1.25, M.borracha, { lados: 12, dz: 6 });
      }
      // a aba giratória e o mosquetão preto
      C.cilindro(m.meio, m.aba, 1.3, M.cromo, { lados: 8 });
      C.cilindro(m.aba, m.ponta, 0.55, M.borracha, { lados: 8 });
    },
  };
  return { prims, peca };
}

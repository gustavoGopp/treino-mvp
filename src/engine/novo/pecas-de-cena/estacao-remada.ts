// Peça de cena: a estação de remada baixa (o banco comprido, a plataforma dos pés, a polia baixa entre os pés e a torre
// com a pilha). Medidas em ../dados/objetos/estacao-remada.json: o tamanho total vem das fichas da Technogym e da
// Nautilus; a relação do cabo (1:1), da Nautilus e da Bells of Steel; a plataforma inclinada, da Bells of Steel (sem
// ângulo: o do cartão de hoje). As medidas que fazem a máquina servir a quem senta (a altura do banco, onde fica a
// plataforma e a altura da polia baixa) não aparecem nas fichas e são de desenho, com o motivo.
//
// Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `estacao_remada`): o banco comprido azul
// sobre uma viga, as duas chapas inclinadas dos pés com ranhuras, a polia baixa à frente delas, o cabo e a torre com a
// pilha atrás. O triângulo é o acessório aprovado (./triangulo-remada.ts).
//
// A máquina funciona: o cabo sai do triângulo, passa entre as chapas dos pés, dá a volta por cima da polia baixa, desce
// até a polia do chão, corre até o pé da torre, sobe até a roldana do alto e desce até a haste do pino; as placas do
// pino sobem o mesmo que o cabo anda (a relação 1:1).
//
// Eixos: quem senta olha para +z; o meio do banco fica em x = 0, z = 0. A plataforma, a polia e a torre ficam à frente.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import type { CenaRealista } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';
import { desenharTorreDaEstacao, pontosDaTorre } from './torre-da-estacao';
import type { TorreDaEstacao } from './torre-da-estacao';

const g = (id: string) => obj('estacaoRemada', id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0],
  Z: V3 = [0, 0, 1];

/** A regulagem da estação para quem senta e o instante dela. */
export interface EstacaoRemada {
  /** O z do centro da face das chapas dos pés e o meio delas para os lados (x). */
  zPlataforma: number;
  xPlataforma: number;
  /** A altura do centro da polia baixa. */
  yPolia: number;
  /** Quanto as placas do pino sobem (cm) e quantas estão no pino. */
  subida: number;
  placas: number;
}

/** A face das chapas: o centro de cada uma (o lado `s`), a direção para cima ao longo dela e a normal (para quem senta). */
export function chapaDosPes(m: Pick<EstacaoRemada, 'zPlataforma' | 'xPlataforma'>, s: number) {
  const i = g('plataformaInclina') * rad;
  const sobe: V3 = [0, Math.cos(i), Math.sin(i)];
  const normal: V3 = [0, Math.sin(i), -Math.cos(i)];
  return { centro: [s * m.xPlataforma, g('plataformaMeio'), m.zPlataforma] as V3, sobe, normal };
}

/** O centro da polia baixa (por onde o cabo sai para o triângulo). */
export const poliaBaixa = (m: Pick<EstacaoRemada, 'zPlataforma' | 'yPolia'>): V3 => [0, m.yPolia, m.zPlataforma + g('poliaAFrente')];

/** O ponto em que o cabo sai da polia baixa, indo para `p`: a tangente por cima dela. */
export function saidaDeBaixo(m: Pick<EstacaoRemada, 'zPlataforma' | 'yPolia'>, p: V3): V3 {
  const c = poliaBaixa(m),
    r = g('roldanaDiam') / 2;
  const dy = p[1] - c[1],
    dz = p[2] - c[2];
  const d = Math.hypot(dy, dz);
  const a = Math.acos(Math.min(1, r / d));
  const base = Math.atan2(dy, dz);
  const t1: V3 = [p[0], c[1] + r * Math.sin(base + a), c[2] + r * Math.cos(base + a)];
  const t2: V3 = [p[0], c[1] + r * Math.sin(base - a), c[2] + r * Math.cos(base - a)];
  return t1[1] > t2[1] ? t1 : t2;
}

/**
 * A estação: os volumes para a conferência (o banco e as chapas dos pés), o banco (pintado atrás do corpo, como
 * cenário: o corpo senta por cima dele), a plataforma (na ordem de profundidade) e a polia baixa com a torre.
 */
export function estacaoRemada(m: EstacaoRemada) {
  const h = g('assentoAltura'),
    esp = g('estofadoEsp'),
    cA = g('assentoComp'),
    lA = g('assentoLarg'),
    tubo = g('tubo');
  const polia = poliaBaixa(m),
    rP = g('roldanaDiam') / 2;
  const T: TorreDaEstacao = {
    frente: polia[2] + rP + 8,
    larg: g('torreLarg'),
    prof: g('torreProf'),
    altura: g('altura'),
    tubo,
    placas: g('pilhaPlacas'),
    placaEsp: g('placaEsp'),
    pilhaLarg: g('pilhaLarg'),
    pilhaProf: g('pilhaProf'),
    noPino: m.placas,
    subida: m.subida,
    rRoldana: rP,
  };
  const P = pontosDaTorre(T);
  const zTras = -cA / 2 - 4,
    zFundo = T.frente + T.prof;
  const hC = g('plataformaAltura'),
    lC = g('plataformaLarg'),
    eC = 2.5;
  const chapas = [-1, 1].map((s) => chapaDosPes(m, s));

  const prims: Prim[] = [
    { t: 'caixa', ref: { o: [0, h - esp / 2, 0], x: X, y: Y, z: Z }, meias: [lA / 2, esp / 2, cA / 2], cls: 'estofado', vies: 0.5 },
    ...chapas.map((c): Prim => ({ t: 'caixa', ref: { o: add(c.centro, mul(c.normal, -eC / 2)), x: X, y: c.sobe, z: c.normal }, meias: [lC / 2, hC / 2, eC / 2], cls: 'obj', vies: 0.5 })),
    // a coluna da polia baixa, entre as chapas (até embaixo da polia)
    { t: 'caixa', ref: { o: [0, (polia[1] - rP - 2) / 2, polia[2]], x: X, y: Y, z: Z }, meias: [2.5, (polia[1] - rP - 2) / 2, 2.5], cls: 'obj', vies: 0.5 },
  ];

  const banco: PecaPropria = {
    t: 'propria',
    nome: 'banco da estação de remada',
    fixa: [m.zPlataforma],
    cenario: true,
    desenhar(C, M, o) {
      const t = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
      // a viga do chão, do pé de trás do banco até a torre, e o pé de trás
      t([0, tubo / 2, zTras], [0, tubo / 2, T.frente]);
      t([-lA / 2 + 2, tubo / 2, zTras + 3], [lA / 2 - 2, tubo / 2, zTras + 3]);
      // os dois pés do banco e a viga dele, e o estofado
      for (const z of [-cA / 2 + 8, cA / 2 - 8]) t([0, tubo, z], [0, h - esp - 3, z], 6);
      C.tubo([0, h - esp - 3, -cA / 2 + 2], [0, h - esp - 3, cA / 2 - 2], 8, 5, M.metal);
      C.estofado([0, h - esp, 0], Z, Y, X, cA, esp, lA);
      if (o.comSombra) C.sombra(0, (zTras + zFundo) / 2, T.larg / 2 + 12, (zFundo - zTras) / 2 + 4, 0.18);
    },
  };

  const plataforma: PecaPropria = {
    t: 'propria',
    nome: 'plataforma dos pés',
    fixa: [m.zPlataforma, m.xPlataforma],
    desenhar(C, M) {
      for (const c of chapas) {
        // a chapa: o perfil no plano dela (lado × para cima), com a espessura para trás da face, e as ranhuras
        const base = add(c.centro, mul(c.normal, -eC));
        C.prisma(
          [
            [-lC / 2, -hC / 2],
            [lC / 2, -hC / 2],
            [lC / 2, hC / 2],
            [-lC / 2, hC / 2],
          ],
          base,
          X,
          c.sobe,
          mul(c.normal, eC),
          M.plataforma,
          {
            decalSempre: (Pp: (p: V3) => V3) => {
              let d = '';
              for (let k = -2; k <= 2; k++) {
                const a = Pp(add(add(c.centro, mul(c.sobe, k * 5)), [-lC / 2 + 1.5, 0, 0])),
                  b = Pp(add(add(c.centro, mul(c.sobe, k * 5)), [lC / 2 - 1.5, 0, 0]));
                d += `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
              }
              return `<path d="${d}" stroke="#5E646C" stroke-width="0.45"/>`;
            },
          } as never,
        );
        // o apoio da chapa: um tubo das costas dela até a viga do chão
        const costas = add(c.centro, mul(c.normal, -eC - 2));
        t3(C, M, costas, [c.centro[0] * 0.4, tubo, c.centro[2] + 14], 4.5);
      }
      // a travessa que une as duas chapas, por trás
      const atras = (c: (typeof chapas)[number]) => add(add(c.centro, mul(c.normal, -eC - 2)), mul(c.sobe, -hC / 2 + 4));
      t3(C, M, atras(chapas[0]!), atras(chapas[1]!), 4);
    },
  };

  const torre: PecaPropria = {
    t: 'propria',
    nome: 'torre da estação de remada',
    noQuadro: [
      [-T.larg / 2, 0, T.frente],
      [T.larg / 2, 0, T.frente],
      [-T.larg / 2, T.altura, T.frente],
      [T.larg / 2, T.altura, T.frente],
    ],
    desenhar(C, M) {
      desenharTorreDaEstacao(C, M, T);
      // a coluna da polia baixa, presa na viga do chão, a forquilha e a polia
      t3(C, M, [0, tubo / 2, polia[2]], [0, polia[1] - rP - 3, polia[2]], 6);
      for (const s of [-1, 1]) C.tubo([s * 2.2, polia[1] - rP - 3, polia[2]], [s * 2.2, polia[1], polia[2]], 1, 4, M.metal);
      C.cilindro([-1.4, polia[1], polia[2]], [1.4, polia[1], polia[2]], rP, M.metalClaro, { lados: 18 });
      C.cilindro([-1.8, polia[1], polia[2]], [1.8, polia[1], polia[2]], rP * 0.3, M.borracha, { lados: 10 });
      // o cabo: desce pelo lado de lá da polia baixa (por dentro da coluna), corre no chão até o pé da torre, sobe até a
      // roldana do alto e desce até a haste do pino
      const rT = T.rRoldana;
      C.polilinha(
        [
          [0, polia[1], polia[2] + rP],
          [0, 9, polia[2] + rP],
          [0, 9, P.roldana[2] - rT],
          [0, P.roldana[1], P.roldana[2] - rT],
        ],
        '#1d2024',
        0.8,
      );
      C.linha([0, P.roldana[1], P.roldana[2] + rT], P.pino, '#1d2024', 0.8);
    },
  };
  return { prims, banco, plataforma, torre, polia, chapas, extremos: { zTras, zFundo } };
}

const t3 = (C: CenaRealista, M: Materiais, a: V3, b: V3, w: number) => C.tubo(a, b, w, w, M.metal);

/** O volume da polia baixa (para a conferência do cabo). */
export const volumeDaPolia = (c: V3): Prim => ({ t: 'volume', vol: cilindro([-1.4, c[1], c[2]], [1.4, c[1], c[2]], g('roldanaDiam') / 2), cls: 'esc', vies: 0 });

// Peça de cena: a cadeira abdutora e adutora (a mesma máquina faz as duas). Medidas em
// ../dados/objetos/cadeira-abdutora.json: o tamanho total vem das fichas da Life Fitness (SS-HAA, o manual público da
// linha Insignia), da Precor (RSL0626), da Hammer Strength e da Movement; a espessura dos estofados e o encosto "um
// pouco deitado", da Precor. O que faz a máquina funcionar (onde ficam os eixos, as almofadas e os apoios dos pés) não
// aparece em nenhuma ficha: sai do corpo da tabela sentado nela, com o motivo. Parte do cartão de hoje
// (scripts/desenhos-equipamento/realista/aparelhos.mjs, `abdutora`): o assento e o encosto azuis, as almofadas nos
// joelhos, os apoios dos pés, os pegadores ao lado do assento e a torre com a pilha ao lado e atrás do assento.
//
// A máquina funciona: cada braço gira num eixo vertical embaixo do centro do quadril de quem senta, e a coxa gira em
// volta desse mesmo eixo quando a perna abre ou fecha; por isso a almofada não escorrega pela coxa e o pé não sai do
// apoio. A almofada gira no alto do montante e fica por fora do joelho (abdução) ou por dentro (adução), como na
// Precor ("rotating thigh pads"). Os dois braços giram juntos (engrenagens nos eixos); o came do braço esquerdo enrola
// o cabo, e as placas do pino sobem o arco do came (raio × ângulo girado desde a posição inicial, a regulagem "start
// position"), quando as pernas abrem na abdução e quando fecham na adução.
//
// Eixos: quem senta olha para +z; o assento fica centrado em x = 0, com a borda da frente em z = 0. O lado esquerdo de
// quem senta é +x (o direito é −x): a torre fica à esquerda, atrás, como no cartão.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('cadeiraAbdutora', id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0];

export type ModoDaAbdutora = 'abducao' | 'aducao';

/** As regulagens e o instante da máquina. */
export interface CadeiraAbdutora {
  /** Abdução: as almofadas por fora dos joelhos; adução: por dentro. */
  modo: ModoDaAbdutora;
  /** Quanto cada braço está aberto, em graus: 0 = apontando para a frente; positivo = para fora. */
  braco: number;
  /** A posição inicial (a regulagem "start position", em graus de abertura): as placas descansam nela. */
  inicio: number;
  /** Quantas placas estão no pino. */
  placas?: number;
}

/** A geometria fixa da máquina (não depende da regulagem). */
export function geometriaDaAbdutora() {
  const topo = g('assentoAltura');
  const inc = g('encostoInclina') * rad;
  // o encosto: `sobe` ao longo dele; `frente`, para fora do estofado (para a frente e um pouco para cima)
  const sobe: V3 = [0, Math.cos(inc), -Math.sin(inc)];
  const frente: V3 = [0, Math.sin(inc), Math.cos(inc)];
  const baseEncosto: V3 = [0, topo, -g('encostoAtras')];
  const zEixo = -g('eixoAtras');
  return { topo, sobe, frente, baseEncosto, zEixo, xEixo: g('eixoMeiaDistancia') };
}

/** Lado: −1 o direito de quem senta (x < 0), +1 o esquerdo. */
type S = -1 | 1;
/**
 * Um ponto do braço do lado `s` para o mundo: no referencial do braço, `p[0]` é para fora (para o lado do braço),
 * `p[1]` é a altura e `p[2]` é ao longo do braço, a partir do eixo. O braço gira `graus` para fora em volta do eixo.
 */
export function noBraco(s: S, graus: number, p: V3): V3 {
  const G = geometriaDaAbdutora();
  const th = graus * rad;
  const f: V3 = [s * Math.sin(th), 0, Math.cos(th)],
    o: V3 = [s * Math.cos(th), 0, -Math.sin(th)];
  return [s * G.xEixo + o[0] * p[0] + f[0] * p[2], p[1], G.zEixo + o[2] * p[0] + f[2] * p[2]];
}
/** As direções do braço no mundo: para fora e ao longo dele. */
export function eixosDoBraco(s: S, graus: number): { fora: V3; ao: V3 } {
  const th = graus * rad;
  return { fora: [s * Math.cos(th), 0, -Math.sin(th)], ao: [s * Math.sin(th), 0, Math.cos(th)] };
}

/** Quanto as placas sobem (cm) com os braços abertos `braco` graus. */
export function subidaDaAbdutora(m: Pick<CadeiraAbdutora, 'modo' | 'braco' | 'inicio'>): number {
  const girado = m.modo === 'abducao' ? m.braco - m.inicio : m.inicio - m.braco;
  return Math.max(0, girado) * rad * g('cameRaio');
}

/** O lado da almofada no referencial do braço: +1 por fora do joelho (abdução), −1 por dentro (adução). */
export const ladoDaAlmofada = (modo: ModoDaAbdutora) => (modo === 'abducao' ? 1 : -1);

/** O centro da almofada do lado `s` e a direção da face que encosta no joelho. */
export function almofada(s: S, m: Pick<CadeiraAbdutora, 'modo' | 'braco'>): { centro: V3; paraOJoelho: V3; ao: V3 } {
  const l = ladoDaAlmofada(m.modo);
  const { fora, ao } = eixosDoBraco(s, m.braco);
  return { centro: noBraco(s, m.braco, [l * g('almofadaAfasta'), g('almofadaAltura'), g('almofadaFrente')]), paraOJoelho: mul(fora, -l), ao };
}
/** O centro do topo do apoio do pé do lado `s`. */
export const apoioDoPe = (s: S, graus: number): V3 => noBraco(s, graus, [0, g('apoioPeAltura'), g('apoioPeFrente')]);

/**
 * A cadeira abdutora e adutora: os volumes para a conferência (o assento, o encosto e as duas almofadas, onde o corpo
 * encosta e que ele não pode atravessar), a estrutura parada, a parte que se mexe (os braços com as almofadas e os
 * apoios dos pés, o came, o cabo e as placas) e os pontos que o exercício lê.
 */
export function cadeiraAbdutora(m: CadeiraAbdutora) {
  const G = geometriaDaAbdutora();
  const esp = g('estofadoEsp'),
    tubo = g('tubo');
  const meiaLarg = g('assentoLarg') / 2,
    aComp = g('assentoComp');
  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  const lados: S[] = [-1, 1];
  const alm = { '-1': almofada(-1, m), '1': almofada(1, m) } as Record<string, ReturnType<typeof almofada>>;
  const prims: Prim[] = [
    caixa([0, G.topo - esp / 2, -aComp / 2], X, Y, [0, 0, 1], [meiaLarg, esp / 2, aComp / 2], 'estofado'),
    caixa(add(add(G.baseEncosto, mul(G.sobe, g('encostoComp') / 2)), mul(G.frente, -esp / 2)), X, G.frente, G.sobe, [meiaLarg - 2, esp / 2, g('encostoComp') / 2], 'estofado'),
    ...lados.map((s) => {
      const a = alm[String(s)]!;
      const fora = mul(a.paraOJoelho, -1);
      return caixa(a.centro, fora, Y, a.ao, [esp / 2, g('almofadaAlt') / 2, g('almofadaComp') / 2], 'estofado');
    }),
  ];

  // a torre, à esquerda de quem senta, ao lado do encosto e atrás dele; a base vai do fundo da torre até o eixo
  const zFrente = G.zEixo + g('montanteFrente') + tubo / 2;
  const zTras = zFrente - g('comp');
  const xT0 = g('torreAoLado'),
    xT1 = xT0 + g('torreLarg');
  const zT0 = zTras + 4,
    zT1 = zT0 + g('torreProf');
  const zTorre = (zT0 + zT1) / 2;
  const H = g('alturaTorre');
  const xTrilhoD = -meiaLarg + 4;
  const zPoste = G.zEixo - 13;
  // as costas do encosto, no alto
  const zCostas = add(add(G.baseEncosto, mul(G.sobe, g('encostoComp'))), mul(G.frente, -esp - 2))[2];
  const pegZ0 = G.zEixo - 9,
    pegZ1 = G.zEixo + 6;

  const fixa: PecaPropria = {
    t: 'propria',
    nome: 'cadeira abdutora',
    fixa: 0,
    // o enquadramento mostra a máquina de um lado ao outro e até o alto da torre, mas, para trás, só até as costas do
    // encosto: a torre e a base atrás dele encolhiam o corpo no quadro de cima (e no de lado), e são cortadas pela borda
    noQuadro: [
      [xTrilhoD - tubo / 2, 0, zFrente],
      [xT1 + 2.25, 0, zFrente],
      [xT1 + 2.25, H, zCostas],
      [xTrilhoD - tubo / 2, H, zCostas],
    ],
    desenhar(C, M, o) {
      const T = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
      // a base no chão: dois trilhos ao longo de z (o da direita e o da torre) e as travessas, todas atrás dos eixos
      // (na frente deles o chão fica livre, para os apoios dos pés girarem)
      const zB = G.zEixo + 6;
      for (const x of [xTrilhoD, xT1 - 3]) T([x, tubo / 2, zTras + 2], [x, tubo / 2, zB]);
      for (const z of [zTras + 4, zPoste, G.zEixo]) T([xTrilhoD, tubo / 2, z], [xT1 - 3, tubo / 2, z]);
      // o pé do assento e o do encosto
      T([0, tubo, zPoste], [0, G.topo - esp - 2, zPoste]);
      T([0, G.topo - esp - 3, zPoste - 14], [0, G.topo - esp - 3, -4], 5);
      const bE = add(G.baseEncosto, mul(G.frente, -esp));
      T([0, tubo, bE[2] - 10], add(add(bE, mul(G.sobe, g('encostoComp') * 0.45)), mul(G.frente, -2)), 5);
      T([0, tubo / 2, bE[2] - 10], [0, tubo / 2, zPoste], 5);
      // os mancais dos eixos, embaixo do quadril
      for (const s of lados) C.cilindro([s * G.xEixo, tubo, G.zEixo], [s * G.xEixo, g('bracoAltura') - 5, G.zEixo], 3.2, M.metalClaro, { lados: 12 });
      // o encosto e o assento
      C.estofado(add(add(G.baseEncosto, mul(G.sobe, g('encostoComp') / 2)), mul(G.frente, -esp)), G.sobe, G.frente, X, g('encostoComp'), esp, g('assentoLarg') - 4);
      C.estofado([0, G.topo - esp, -aComp / 2], [0, 0, 1], Y, X, aComp, esp, g('assentoLarg'));
      // os pegadores ao lado do assento: o tubo que sai de baixo do assento e o punho de borracha
      for (const s of lados) {
        const x = s * g('pegadorFora');
        C.tubo([s * (meiaLarg - 6), G.topo - esp - 4, pegZ0 - 2], [x, g('pegadorAltura'), pegZ0], 3, 3, M.metal);
        C.cilindro([x, g('pegadorAltura'), pegZ0], [x, g('pegadorAltura'), pegZ1], 2, M.borracha, { lados: 12 });
      }
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
      for (const dx of [-8, 8]) C.cilindro([(xT0 + xT1) / 2 + dx, tubo, zTorre], [(xT0 + xT1) / 2 + dx, H - 6, zTorre], 0.8, M.cromo, { lados: 8 });
      // a polia do pé da torre, por onde o cabo entra
      C.cilindro([(xT0 + xT1) / 2 - 1.5, 10, zT1 + 2], [(xT0 + xT1) / 2 + 1.5, 10, zT1 + 2], 4.5, M.metalClaro, { lados: 16 });
      if (o.comSombra) C.sombra((xTrilhoD + xT1) / 2, (zTras + zFrente) / 2, (xT1 - xTrilhoD) / 2 + 10, g('comp') / 2, 0.18);
    },
  };

  const subida = subidaDaAbdutora(m);
  const n = g('pilhaPlacas'),
    k = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  const l = ladoDaAlmofada(m.modo);
  const movel: PecaPropria = {
    t: 'propria',
    nome: 'braços da cadeira abdutora',
    // no enquadramento, os braços (até as pontas, abertos) contam inteiros; as placas ficam dentro da torre
    noQuadro: lados.flatMap((s) =>
      [
        [g('bracoFora') + 3, 0, g('montanteFrente') + 3],
        [g('bracoFora') + 3, g('almofadaAltura') + 9, g('montanteFrente') + 3],
        [l * (g('almofadaAfasta') + 4), g('almofadaAltura') + 9, g('almofadaFrente') - 12],
        [-g('apoioPeLarg') / 2, 0, g('apoioPeFrente') + g('apoioPeComp') / 2],
      ].map((p) => noBraco(s, m.braco, p as V3)),
    ),
    desenhar(C, M) {
      const yB = g('bracoAltura'),
        bf = g('bracoFora'),
        zM = g('montanteFrente'),
        yA = g('almofadaAltura');
      for (const s of lados) {
        const B = (p: V3) => noBraco(s, m.braco, p);
        const { fora, ao } = eixosDoBraco(s, m.braco);
        const T = (a: V3, b: V3, w = 5) => C.tubo(B(a), B(b), w, w, M.metal, { up: [0, 1, 0] });
        // o eixo e a engrenagem que liga os dois braços
        C.cilindro(B([0, yB - 5, 0]), B([0, yB + 2.5, 0]), 3.6, M.cromo, { lados: 12 });
        C.cilindro(B([0, yB - 9, 0]), B([0, yB - 6, 0]), G.xEixo - 0.4, M.metalClaro, { lados: 20 });
        // o braço: sai do eixo para fora, corre por fora da perna e sobe no montante à frente do pé
        T([0, yB, 0], [bf, yB, 14]);
        T([bf, yB, 14], [bf, yB, zM]);
        T([bf, yB, zM], [bf, yA + 3, zM]);
        // o apoio do pé: a haste que desce do braço e a plataforma embaixo do pé
        const zP = g('apoioPeFrente'),
          yP = g('apoioPeAltura');
        T([bf, yB, zP], [bf, yP - 1.5, zP], 4);
        T([bf, yP - 1.5, zP], [g('apoioPeLarg') / 2, yP - 1.5, zP], 3.5);
        C.estofado(B([0, yP - 3, zP]), ao, Y, fora, g('apoioPeComp'), 3, g('apoioPeLarg'), M.plataforma);
        // a almofada: o suporte gira no alto do montante e leva a almofada para fora ou para dentro do joelho
        const a = almofada(s, m);
        const frenteAlm: V3 = [l * g('almofadaAfasta'), yA, g('almofadaFrente') + g('almofadaComp') / 2 - 3];
        C.cilindro(B([bf, yA + 3, zM]), B([bf, yA + 7, zM]), 3.4, M.metalClaro, { lados: 12 });
        T([bf, yA + 5, zM], [frenteAlm[0], yA + 5, frenteAlm[2] + 3], 3.5);
        T([frenteAlm[0], yA + 5, frenteAlm[2] + 3], [frenteAlm[0] + l * 1.5, yA, frenteAlm[2]], 3.5);
        C.estofado(add(a.centro, mul(a.paraOJoelho, -g('estofadoEsp') / 2)), ao, a.paraOJoelho, Y, g('almofadaComp'), g('estofadoEsp'), g('almofadaAlt'));
      }
      // o came do braço esquerdo, embaixo do assento, voltado para trás: um setor que gira com o braço
      const yC = g('bracoAltura') - 14,
        rC = g('cameRaio');
      const centro = noBraco(1, m.braco, [0, yC, 0]);
      const perfil: [number, number][] = [[0, 0]];
      for (let i = 0; i <= 12; i++) {
        const p = noBraco(1, m.braco, [rC * Math.sin((-40 + (80 * i) / 12) * rad), yC, -rC * Math.cos((-40 + (80 * i) / 12) * rad)]);
        perfil.push([p[0] - centro[0], p[2] - centro[2]]);
      }
      C.prisma(perfil, centro, X, [0, 0, 1], [0, 3, 0], M.metalClaro);
      // o cabo: sai da borda do came, vai à polia do pé da torre e sobe por dentro dela até as placas
      const saida = noBraco(1, m.braco, [0, yC + 1.5, -rC]);
      const polia: V3 = [(xT0 + xT1) / 2, 10 - 4.5, zT1 + 2];
      C.linha(saida, [polia[0], saida[1], polia[2]], '#202327', 0.7);
      C.linha([polia[0], saida[1], polia[2]], polia, '#202327', 0.7);
      // as placas: as que ficam embaixo e as do pino, que sobem; a haste que as atravessa
      const xP = (xT0 + xT1) / 2 - g('pilhaLarg') / 2,
        zP = zTorre + g('pilhaProf') / 2;
      if (n - k > 0) C.pilha([xP, tubo + 2, zP], X, [0, 0, -1], g('pilhaLarg'), hp * (n - k), g('pilhaProf'), n - k);
      const yDo = tubo + 2 + hp * (n - k) + subida;
      C.pilha([xP, yDo, zP], X, [0, 0, -1], g('pilhaLarg'), hp * k, g('pilhaProf'), k);
      C.cilindro([(xT0 + xT1) / 2, yDo + hp * k, zTorre], [(xT0 + xT1) / 2, yDo + hp * k + 10, zTorre], 1.2, M.cromo, { lados: 8 });
    },
  };
  const placasDoPino: V3 = [(xT0 + xT1) / 2, tubo + 2 + hp * (n - k) + subida, zTorre];
  return {
    prims,
    fixa,
    movel,
    eixo: { R: [-G.xEixo, g('bracoAltura'), G.zEixo] as V3, L: [G.xEixo, g('bracoAltura'), G.zEixo] as V3 },
    almofadas: { R: alm['-1']!, L: alm['1']! },
    apoios: { R: apoioDoPe(-1, m.braco), L: apoioDoPe(1, m.braco) },
    encosto: G,
    subida,
    placasDoPino,
    /** O alto das placas que ficam embaixo (as do pino descansam nelas quando a subida é zero). */
    topoDaPilha: tubo + 2 + hp * (n - k),
    extremos: { zTras, zFrente, xDireita: Math.min(xTrilhoD - tubo / 2, noBraco(-1, m.braco, [g('bracoFora') + 2.5, 0, g('montanteFrente')])[0]), xEsquerda: xT1 + 2.25 },
  };
}

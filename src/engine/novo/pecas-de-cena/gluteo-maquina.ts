// Peça de cena: a máquina de glúteo de quatro apoios (o coice na máquina). Medidas em ../dados/objetos/gluteo-maquina.json.
// A ficha da técnica e o cartão do app pedem esta máquina: "tronco apoiado (peito ou antebraços na almofada), um pé na
// plataforma ou na alavanca; o outro joelho apoiado". As fichas da Life Fitness (SS-GL), da Hammer Strength (HS-HG) e
// da Movement (Next Glute), que o plano listava, são de máquinas em pé (outro tipo); as de quatro apoios lidas são a
// Precor Glutebuilder Pendulum Kickback GSL0617 (127 × 132 × 145 cm, torre de 148 cm: "kneeling exercise position with
// a double knee pad, chest pad and hand grips", "isolating movement at the hip joint") e a Atlantis C-122 (168,8 ×
// 111,4 × 159,9 cm: "kneeling position", "rubber footplates", "angled handles and forearm pads"). O tamanho total vem da
// Precor; o resto (onde fica o eixo, as almofadas, a plataforma) não aparece em nenhuma ficha e é de desenho, com o
// motivo. Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `gluteo_maquina`): o apoio dos
// antebraços com os pegadores, a alavanca com a plataforma do pé atrás, o came no eixo e a torre com a pilha. O came e
// a pilha são os da cadeira flexora aprovada (../pecas-de-cena/cadeira-flexora.ts), com as mesmas medidas.
//
// A máquina funciona: a alavanca gira num eixo na linha do quadril de quem ajoelha (a Precor: o movimento fica no
// quadril); a plataforma do pé, na ponta dela, gira junto, sempre na mesma posição em relação à alavanca; o came gira
// com ela e enrola o cabo, e as placas escolhidas sobem o arco do came (raio × ângulo girado desde a posição inicial).
// A almofada dos joelhos sobe e desce, para o quadril de cada pessoa cair no eixo; os apoios dos antebraços correm para
// a frente e para trás.
//
// Eixos: quem ajoelha olha para +z; o joelho de apoio fica em z = 0, no meio da largura (x = 0). O lado direito de quem
// ajoelha é −x: a perna que trabalha é a direita, e a alavanca corre do lado de fora dela (em x = −eixoFora). O came, a
// alavanca e o cabo, do lado de perto na vista de lado, são pintados atrás do corpo, como cenário (o mesmo corte de
// ilustração do lado de perto do smith): senão a alavanca e o came cobririam o glúteo e a coxa. A torre fica do outro
// lado (+x), na frente.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('gluteoMaquina', id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0],
  Z: V3 = [0, 0, 1];

/** Uma direção no plano de lado: 0° = para baixo, 90° = para trás (para os pés), 180° = para cima. */
export const direcaoNoGluteo = (graus: number): V3 => [0, -Math.cos(graus * rad), -Math.sin(graus * rad)];
/** O ângulo (como em `direcaoNoGluteo`) de uma direção no plano de lado. */
export const anguloNoGluteo = (v: V3) => Math.atan2(-v[2], -v[1]) / rad;

/** As regulagens e o instante da máquina. */
export interface GluteoMaquina {
  /** A altura do topo da almofada dos joelhos (cm, do chão). */
  joelheira: number;
  /** Onde fica a ponta de trás dos apoios dos antebraços (z, cm). */
  apoio: number;
  /** O meio de cada apoio de antebraço, para o lado (cm, do meio do corpo). */
  apoioFora: number;
  /** O ângulo da alavanca (como em `direcaoNoGluteo`): a direção do eixo para o centro da plataforma. */
  alavanca: number;
  /** O ângulo da posição inicial: a pilha começa a subir daí. */
  inicio: number;
  /** A distância do eixo ao centro da plataforma, no plano de lado (cm). */
  raio: number;
  /** A plataforma: para onde a face de apoio olha, em graus a mais que a alavanca (como em `direcaoNoGluteo`). */
  giroDaPlataforma: number;
  /** O x do meio da plataforma (o meio do pé). */
  xPe: number;
  /** O meio de cada pegador (direito, esquerdo); sem ele, na ponta da frente de cada apoio. */
  pegadores?: [V3, V3];
  /** Quantas placas estão no pino. */
  placas?: number;
  /** Os pontos que o enquadramento precisa mostrar; o resto (o alto da torre) é cortado pela borda do quadro. */
  noQuadro?: V3[];
}

/** O eixo da alavanca (o centro dele, do lado de fora da perna direita). */
export const eixoDoGluteo = (): V3 => [-g('eixoFora'), g('eixoAltura'), 0];

/** Quanto as placas sobem (cm) com a alavanca no ângulo dado. */
export const subidaDaPilhaDoGluteo = (m: Pick<GluteoMaquina, 'alavanca' | 'inicio'>) => Math.max(0, m.alavanca - m.inicio) * rad * (g('cameDiam') / 2);

/** A plataforma do pé: o centro da face de apoio, a direção para o pé (a normal da face) e a direção ao longo dela. */
export function plataformaDoGluteo(m: Pick<GluteoMaquina, 'alavanca' | 'raio' | 'giroDaPlataforma' | 'xPe'>) {
  const E = eixoDoGluteo();
  const d = direcaoNoGluteo(m.alavanca);
  const c: V3 = [m.xPe, E[1] + d[1] * m.raio, E[2] + d[2] * m.raio];
  const paraOPe = direcaoNoGluteo(m.alavanca + m.giroDaPlataforma);
  const ao = direcaoNoGluteo(m.alavanca + m.giroDaPlataforma + 90);
  return { face: c, paraOPe, ao };
}

/**
 * A máquina de glúteo: os volumes para a conferência (as almofadas e a plataforma, onde o corpo encosta e que ele não
 * pode atravessar), a estrutura parada, a alavanca (cenário: atrás do corpo) com a plataforma, e os pontos que o
 * exercício lê.
 */
export function gluteoMaquina(m: GluteoMaquina) {
  const esp = g('estofadoEsp'),
    tubo = g('tubo');
  const E = eixoDoGluteo();
  const P = plataformaDoGluteo(m);
  const pe = g('plataformaEsp');
  // a almofada dos joelhos: o joelho de apoio em z = 0, a canela deitada para trás
  const zJ0 = 8,
    zJ1 = zJ0 - g('joelheiraComp');
  // a almofada fica só sob o joelho de apoio (o esquerdo, +x): o joelho direito passa ao lado dela
  const xJ = g('joelheiraLarg') / 2 + 1;
  const jMeio: V3 = [xJ, m.joelheira, (zJ0 + zJ1) / 2];
  // os apoios dos antebraços, um de cada lado, e os pegadores em pé na ponta da frente
  const aComp = g('antebracoComp'),
    aY = g('antebracoAltura');
  const apoios = ([-1, 1] as const).map((s, i) => ({ meio: [s * m.apoioFora, aY, m.apoio + aComp / 2] as V3, pegador: m.pegadores?.[i] ?? ([s * m.apoioFora, aY + 3 + g('pegadorComp') / 2, m.apoio + aComp + 2] as V3) }));
  // a máquina: de trás da plataforma (com a alavanca para trás) até a frente, e a torre à esquerda, na frente
  const zFrente = m.apoio + aComp + 14;
  const zTras = zFrente - g('comp');
  const xDireita = E[0] - 6;
  const xT1 = xDireita + g('larg') - 2,
    xT0 = xT1 - 34;
  const zT1 = zFrente - 2,
    zT0 = zT1 - 32,
    zTorre = (zT0 + zT1) / 2;
  const H = g('alturaTorre');
  const yPolia = 10;

  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  const prims: Prim[] = [
    caixa(add(jMeio, [0, -esp / 2, 0]), X, Y, Z, [g('joelheiraLarg') / 2, esp / 2, g('joelheiraComp') / 2], 'estofado'),
    ...apoios.map((a) => caixa(add(a.meio, [0, -esp / 2, 0]), X, Y, Z, [g('antebracoLarg') / 2, esp / 2, aComp / 2], 'estofado')),
    caixa(add(P.face, mul(P.paraOPe, -pe / 2)), X, P.paraOPe, P.ao, [g('plataformaLarg') / 2, pe / 2, g('plataformaComp') / 2], 'plataforma'),
  ];
  const noQuadro = m.noQuadro ? { noQuadro: m.noQuadro } : {};

  const fixa: PecaPropria = {
    t: 'propria',
    nome: 'máquina de glúteo',
    fixa: [m.joelheira, m.apoio, m.apoioFora],
    ...noQuadro,
    desenhar(C, M, o) {
      const T = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
      // a base no chão: dois trilhos ao longo de z, as travessas e o pé da torre
      for (const x of [xDireita + 4, 14]) T([x, tubo / 2, zTras], [x, tubo / 2, zFrente]);
      for (const z of [zTras + 4, 0, zFrente - 4]) T([xDireita + 4, tubo / 2, z], [xT1, tubo / 2, z]);
      // a coluna do meio, que leva a almofada dos joelhos (numa luva que corre nela) e, na frente, os apoios
      const yJ = m.joelheira - esp;
      T([xJ, tubo, zJ1 + 8], [xJ, yJ - 4, zJ1 + 8]);
      C.tubo([xJ, yJ - 12, zJ1 + 8], [xJ, yJ - 2, zJ1 + 8], 9, 9, M.metalClaro);
      C.estofado(add(jMeio, [0, -esp, 0]), Z, Y, X, g('joelheiraComp'), esp, g('joelheiraLarg'));
      const zA = m.apoio + aComp / 2;
      T([0, tubo, zA], [0, aY - esp - 4, zA]);
      T([-m.apoioFora, aY - esp - 4, zA], [m.apoioFora, aY - esp - 4, zA], 5);
      for (const a of apoios) {
        C.estofado(add(a.meio, [0, -esp, 0]), Z, Y, X, aComp, esp, g('antebracoLarg'));
        // o pegador: um braço sobe da ponta do apoio e a manopla fica em pé
        T([a.pegador[0], aY - esp - 4, zA], [a.pegador[0], aY - esp - 4, a.pegador[2]], 4);
        T([a.pegador[0], aY - esp - 4, a.pegador[2]], [a.pegador[0], aY + 2, a.pegador[2]], 3.5);
        C.cilindro(add(a.pegador, [0, -g('pegadorComp') / 2, 0]), add(a.pegador, [0, g('pegadorComp') / 2, 0]), 2, M.borracha, { lados: 12 });
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
      for (const dx of [-6, 6]) C.cilindro([(xT0 + xT1) / 2 + dx, tubo, zTorre], [(xT0 + xT1) / 2 + dx, H - 6, zTorre], 0.8, M.cromo, { lados: 8 });
      C.cilindro([(xT0 + xT1) / 2, yPolia, zT0 - 3.5], [(xT0 + xT1) / 2, yPolia, zT0 + 0.5], 4.5, M.metalClaro, { lados: 16 });
      if (o.comSombra) C.sombra((xT1 + xDireita) / 2, (zTras + zFrente) / 2, (xT1 - xDireita) / 2 + 6, g('comp') / 2, 0.18);
    },
  };

  const subida = subidaDaPilhaDoGluteo(m);
  const n = g('pilhaPlacas'),
    k = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  const rC = g('cameDiam') / 2;
  // a alavanca: do came até um ponto atrás da plataforma, do lado de fora; dali uma travessa leva à plataforma
  const atras = add(P.face, mul(P.paraOPe, -pe - 4));
  const cotovelo: V3 = [E[0], atras[1], atras[2]];
  // as placas e o came, com o cabo, o pé do eixo e a alavanca: a parte do lado de perto, pintada atrás do corpo
  const alavanca: PecaPropria = {
    t: 'propria',
    nome: 'alavanca da máquina de glúteo',
    cenario: true,
    ...noQuadro,
    desenhar(C, M) {
      const xP = (xT0 + xT1) / 2 - g('pilhaLarg') / 2,
        zP = zTorre - g('pilhaProf') / 2;
      if (n - k > 0) C.pilha([xP, tubo + 2, zP], X, Z, g('pilhaLarg'), hp * (n - k), g('pilhaProf'), n - k);
      const yDo = tubo + 2 + hp * (n - k) + subida;
      C.pilha([xP, yDo, zP], X, Z, g('pilhaLarg'), hp * k, g('pilhaProf'), k);
      C.cilindro([(xT0 + xT1) / 2, yDo + hp * k, zTorre], [(xT0 + xT1) / 2, yDo + hp * k + 10, zTorre], 1.2, M.cromo, { lados: 8 });
      // o cabo: do came desce até uma polia no chão, corre pela travessa do meio e vai até o pé da torre
      C.linha(add(E, [0, -rC, 0]), [E[0], yPolia - 4.5, 0], '#202327', 0.7);
      C.linha([E[0], yPolia - 4.5, 0], [(xT0 + xT1) / 2, yPolia - 4.5, 0], '#202327', 0.7);
      C.linha([(xT0 + xT1) / 2, yPolia - 4.5, 0], [(xT0 + xT1) / 2, yPolia - 4.5, zT0 - 1.5], '#202327', 0.7);
      C.cilindro([E[0] - 1.5, yPolia, 0], [E[0] + 1.5, yPolia, 0], 4.5, M.metalClaro, { lados: 16 });
      // o pé do eixo, do lado de fora da perna direita, o came e o eixo
      C.tubo([E[0] - 4, tubo, E[2]], [E[0] - 4, E[1] - 7, E[2]], tubo, tubo, M.metal);
      C.cilindro(add(E, [-3, 0, 0]), add(E, [3, 0, 0]), rC, M.metalClaro, { lados: 24 });
      C.cilindro(add(E, [-6, 0, 0]), add(E, [-3, 0, 0]), 3, M.cromo, { lados: 12 });
      // a alavanca e a travessa até a plataforma
      C.tubo(E, cotovelo, 5, 5, M.metal, { up: [1, 0, 0] });
      C.tubo(cotovelo, [m.xPe, atras[1], atras[2]], 4.5, 4.5, M.metal);
    },
  };
  const plataforma: PecaPropria = {
    t: 'propria',
    nome: 'plataforma do pé da máquina de glúteo',
    ...noQuadro,
    desenhar(C, M) {
      // o suporte atrás da plataforma e a chapa com a borracha
      C.tubo([m.xPe, atras[1], atras[2]], add(P.face, mul(P.paraOPe, -pe)), 4, 4, M.metal);
      C.tubo(add(P.face, mul(P.paraOPe, -pe)), P.face, g('plataformaLarg'), g('plataformaComp'), M.plataforma, { up: P.ao });
    },
  };
  return { prims, fixa, alavanca, plataforma, pecas: [fixa, alavanca, plataforma], eixo: E, plataformaFace: P, subida, apoios, extremos: { zTras, zFrente, xDireita, xEsquerda: xT1 + 2 } };
}

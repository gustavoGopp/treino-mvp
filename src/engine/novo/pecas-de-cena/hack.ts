// Peça de cena: o hack (agachamento articulado de anilhas). Medidas em ../dados/objetos/hack.json: o tamanho total
// (216 × 155 × 153 cm) vem da ficha da Hammer Strength PL-HSQ; o ângulo do carro (45°), a massa dele (57 kg), a trava
// de duas posições e os 4 pinos de guardar anilhas, da página da PL-HSQ2. O que faz a máquina funcionar (onde a chapa
// dos pés fica em relação ao encosto, o ângulo da chapa) não aparece em nenhuma ficha lida: sai do corpo da tabela e
// do cartão de hoje, com o motivo em cada linha. Parte do cartão de hoje (scripts/desenhos-equipamento/realista/
// aparelhos.mjs, `hack`): o encosto e as almofadas dos ombros azuis no carro, os pegadores ao lado delas, as guias
// cromadas, a chapa antiderrapante inclinada, os pinos de anilha no pé do carro.
//
// A máquina funciona: o carro (o encosto, as almofadas dos ombros, os pegadores e as anilhas) só anda nas guias, a 45°;
// a chapa dos pés fica parada; a alavanca da trava, presa no carro, fecha sobre um dos dois suportes da estrutura ou
// gira para fora e solta o carro.
//
// Eixos: quem treina olha para +z; o centro da face da chapa dos pés fica em x = 0, z = 0. O carro sobe para trás
// (−z). `carro` é a posição, ao longo da guia, da face de baixo das almofadas dos ombros (onde o alto dos ombros
// encosta), medida a partir do ponto da linha do encosto que fica na altura do centro da chapa.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { retArred } from '../realista/base.mjs';
import { add, mul } from '../vec';
import type { V3 } from '../vec';
import type { IdAnilha } from './barra-longa';
import { atrasDoCorpo } from './leg-press';

const g = (id: string) => obj('hack', id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0];
type C3 = Parameters<PecaPropria['desenhar']>[0];
type M3 = Parameters<PecaPropria['desenhar']>[1];

export interface Hack {
  /** A posição do carro ao longo da guia (cm): a face de baixo das almofadas dos ombros. */
  carro: number;
  /** A alavanca da trava: fechada (apoiada no suporte de cima) ou aberta (o carro solto). */
  trava: 'fechada' | 'aberta';
  /** As anilhas de cada lado, da mais pesada (perto do carro) à mais leve. */
  anilhas: IdAnilha[];
  /** O lado (o sinal do x) que vai para trás do corpo, como cenário (de lado, cobriria as pernas). */
  atras?: 1 | -1;
  /** Os pontos (cm) que o enquadramento precisa mostrar; o resto da máquina é cortado pela borda do quadro. */
  noQuadro?: V3[];
}

/** A geometria fixa: a guia, a normal do encosto, a chapa dos pés e a linha da face do encosto. */
export function geometriaDoHack() {
  const t = g('trilhoInclina') * rad;
  /** O carro sobe para trás; `frente` é perpendicular à guia, para quem treina (para cima e para a frente). */
  const sobe: V3 = [0, Math.sin(t), -Math.cos(t)];
  const frente: V3 = [0, Math.cos(t), Math.sin(t)];
  const c = g('chapaInclina') * rad;
  /** A chapa sobe para a frente; `normalChapa` sai dela para cima. */
  const aoChapa: V3 = [0, Math.sin(c), Math.cos(c)];
  const normalChapa: V3 = [0, Math.cos(c), -Math.sin(c)];
  const chapa: V3 = [0, g('chapaAltura'), 0];
  const origem: V3 = [0, g('chapaAltura'), -g('encostoAtrasDaChapa')];
  return { sobe, frente, aoChapa, normalChapa, chapa, origem };
}
/** Um ponto da face do encosto: `t` cm ao longo da guia, `x` para o lado. */
export function naFaceDoEncosto(t: number, x = 0): V3 {
  const G = geometriaDoHack();
  return add(add(G.origem, mul(G.sobe, t)), [x, 0, 0]);
}
/** Um ponto da linha de uma guia (o eixo dela), `t` cm ao longo dela. */
function naGuia(t: number, x: number): V3 {
  const G = geometriaDoHack();
  return add(naFaceDoEncosto(t, x), mul(G.frente, -g('trilhoAtras')));
}
/** A posição `t` em que a guia fica na altura y. */
const tNaAltura = (y: number) => (y - g('chapaAltura') + g('trilhoAtras') * Math.cos(g('trilhoInclina') * rad)) / Math.sin(g('trilhoInclina') * rad);
/** O pegador de um lado: as pontas do cilindro de borracha (a mão fecha no meio). */
export function pegadorDoHack(carro: number, w: number): { a: V3; b: V3; meio: V3 } {
  const G = geometriaDoHack();
  const raiz = naFaceDoEncosto(carro - 14, w * (g('ombreirasEntre') / 2 + 17));
  const a = add(raiz, mul(G.frente, 10)),
    b = add(raiz, mul(G.frente, 24));
  return { a, b, meio: mul(add(a, b), 0.5) };
}
/** A massa que o carro põe nos ombros: o carro mais as anilhas dos dois lados (kg). */
export const massaDoHack = (anilhas: IdAnilha[]) => g('massaDoCarro') + 2 * anilhas.reduce((s, a) => s + obj(a, 'massa'), 0);
/** O alto das guias e as pontas da máquina (para a folha conferir contra a ficha). */
export function extremosDoHack() {
  const tFim = tNaAltura(g('trilhoFimAltura'));
  const fim = naGuia(tFim, 0);
  return { tFim, zTras: fim[2] - g('tubo'), zFrente: g('chapaComp') / 2 + 6, yTopo: g('altura') };
}
/** As posições do carro em que o gancho da trava fechada apoia nos dois suportes (o de cima e o de baixo). */
export const posicoesDaTrava = (alto: number): [number, number] => [alto, alto - 16];

/**
 * O hack: os volumes para a conferência (o encosto, as almofadas dos ombros e a chapa, onde o corpo encosta e que ele
 * não pode atravessar) e a peça desenhada (a estrutura parada, com a chapa, e o carro, que anda nas guias).
 * `travaAlta` é a posição do carro no suporte de cima da trava (a regulagem de quem treina).
 */
export function hack(H: Hack, travaAlta: number): { prims: Prim[]; pecas: PecaPropria[] } {
  const G = geometriaDoHack();
  const esp = g('estofadoEsp'),
    tb = g('tubo');
  const E = extremosDoHack();
  const t = H.carro;
  const xG = g('guiasEntre') / 2;
  const meioEnc = naFaceDoEncosto(t - g('encostoComp') / 2);
  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  const ombreira = (w: number) => add(naFaceDoEncosto(t + esp / 2, (w * g('ombreirasEntre')) / 2), mul(G.frente, g('ombreiraComp') / 2 - 1));
  const prims: Prim[] = [
    caixa(add(meioEnc, mul(G.frente, -esp / 2)), X, G.frente, G.sobe, [g('encostoLarg') / 2, esp / 2, g('encostoComp') / 2], 'estofado'),
    ...[-1, 1].map((w) => caixa(ombreira(w), X, G.sobe, G.frente, [g('ombreiraLarg') / 2, esp / 2, g('ombreiraComp') / 2], 'estofado')),
    caixa(add(G.chapa, mul(G.normalChapa, -1.5)), X, G.normalChapa, G.aoChapa, [g('chapaLarg') / 2, 1.5, g('chapaComp') / 2], 'plataforma'),
  ];

  const T = (C: C3, a: V3, b: V3, w: number, h: number, m: M3['metal'], up?: V3) => C.tubo(a, b, w, h, m, up ? { up } : {});
  /** A estrutura de um lado: a viga do chão, a guia e a viga dela, o montante de trás, os suportes da trava e os pinos de guardar anilhas. */
  const estruturaDoLado = (C0: C3, M: M3, w: number) => {
    const C = atrasDoCorpo(C0);
    const xb = w * xG;
    T(C, [xb, tb / 2, E.zTras + 4], [xb, tb / 2, E.zFrente], tb, tb, M.metal, [0, 1, 0]);
    const t0 = tNaAltura(g('trilhoInicio')) - 4,
      t1 = E.tFim;
    const atras = mul(G.frente, -(g('guiaDiam') / 2 + tb / 2 + 1));
    T(C, add(naGuia(t0, xb), atras), add(naGuia(t1 + 4, xb), atras), tb, tb, M.metal, G.frente);
    C.cilindro(naGuia(t0 + 4, xb), naGuia(t1, xb), g('guiaDiam') / 2, M.cromo, { lados: 14 });
    // o montante de trás sobe do chão até a altura da ficha, por trás da ponta de cima da guia
    const topo = add(naGuia(t1 + 4, xb), atras);
    T(C, [xb, tb, topo[2]], [xb, g('altura') - tb / 2, topo[2]], tb, tb, M.metal);
    // o pé da guia, no chão
    const pe = add(naGuia(t0, xb), atras);
    T(C, [xb, tb, pe[2]], pe, tb * 0.8, tb * 0.8, M.metal);
    // os dois suportes da trava, por fora da viga da guia
    for (const tp of posicoesDaTrava(travaAlta)) {
      const sup = travaDoLado(tp, w, false).gancho;
      const naViga = add(add(naGuia(tp - g('travaComp') - 4, w * (xG + tb / 2)), atras), [0, 0, 0]);
      C.tubo(naViga, add(sup, mul(G.frente, -2)), 3, 3, M.metal);
      C.cilindro(add(sup, mul(G.frente, -2)), add(add(sup, mul(G.frente, -2)), [w * 3, 0, 0]), 1.6, M.borracha, { lados: 10 });
    }
    // os pinos de guardar anilhas: dois no montante de trás, para fora
    for (const y of [36, 76]) {
      const a: V3 = [xb + (w * tb) / 2, y, topo[2]];
      C.cilindro(a, add(a, [w * 22, 2.5, 0]), 2.5, M.cromo, { lados: 12 });
    }
  };
  /** A chapa dos pés e o suporte dela, e as travessas do chão. */
  const base = (C0: C3, M: M3) => {
    const C = atrasDoCorpo(C0);
    for (const z of [E.zTras + 4, E.zFrente - tb / 2]) T(C, [-xG - tb / 2, tb / 2, z], [xG + tb / 2, tb / 2, z], tb, tb, M.metal, [0, 1, 0]);
    const L = g('chapaLarg'),
      Cc = g('chapaComp');
    T(C, [0, tb, 0], add(G.chapa, mul(G.normalChapa, -5)), tb, tb, M.metal);
    T(C, [-xG, tb, -Cc / 2 + 4], [-xG, G.chapa[1] - 6, -Cc / 2 + 4], 5, 5, M.metal);
    T(C, [xG, tb, -Cc / 2 + 4], [xG, G.chapa[1] - 6, -Cc / 2 + 4], 5, 5, M.metal);
    const tras = add(G.chapa, mul(G.normalChapa, -3));
    const ranhuras = (P: (p: V3) => V3) => {
      const a = P(G.chapa),
        b = P(add(G.chapa, mul(G.normalChapa, 10)));
      if (b[2] >= a[2]) return '';
      let d = '';
      for (let i = 0; i < 9; i++)
        for (let j = 0; j < 6; j++) {
          const ao = -Cc / 2 + 5 + i * 5.6,
            x = -L / 2 + 6 + j * 9.6 + (i % 2) * 4.8;
          const p = P(add(add(add(G.chapa, mul(G.aoChapa, ao)), [x, 0, 0]), mul(G.normalChapa, 0.1))),
            q = P(add(add(add(G.chapa, mul(G.aoChapa, ao + 2.2)), [x + 2.2, 0, 0]), mul(G.normalChapa, 0.1)));
          d += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
        }
      return `<path d="${d}" stroke="#5E646C" stroke-width="0.45" stroke-linecap="round" fill="none"/>`;
    };
    C.prisma(retArred(L, Cc, 2), tras, X, G.aoChapa, mul(G.normalChapa, 3), M.plataforma, { decalSempre: ranhuras } as never);
  };

  /** O carro de um lado: os rolamentos na guia, a viga do carro, o pino com as anilhas e a alavanca da trava. */
  const carroDoLado = (C0: C3, M: M3, w: number) => {
    // o carro fica atrás das costas em toda vista em que aparece (de frente, de cima e o lado de longe, de lado): a
    // pintura o põe atrás do corpo, como o encosto (o lado de perto, de lado, é cenário)
    const C = atrasDoCorpo(C0);
    const xb = w * xG;
    const c0 = naGuia(t - g('carroComp'), xb),
      c1 = naGuia(t, xb);
    for (const c of [c0, add(c1, mul(G.sobe, -10))]) C.tubo(c, add(c, mul(G.sobe, 10)), 9, 9, M.metalClaro, { up: X });
    const sobre = mul(G.frente, 6);
    T(C, add(c0, sobre), add(c1, sobre), tb, tb * 0.7, M.metal, G.frente);
    // o pino de carregar anilha, para fora, no pé do carro, e as anilhas
    const raiz = add(naGuia(t - g('carroComp') + 12, w * (xG + tb / 2)), mul(G.frente, 6));
    C.cilindro(add(raiz, [-w * 2, 0, 0]), add(raiz, [w * 2.5, 0, 0]), 4, M.cromo, { lados: 14 });
    C.cilindro(raiz, add(raiz, [w * g('pinoAnilhaComp'), 0, 0]), g('pinoAnilhaDiam') / 2, M.cromo, { lados: 14 });
    let d = 2.5;
    for (const a of H.anilhas) {
      const e = obj(a, 'esp');
      const p0 = add(raiz, [w * d, 0, 0]),
        p1 = add(raiz, [w * (d + e), 0, 0]);
      C.anilha(w < 0 ? p1 : p0, w < 0 ? p0 : p1, obj(a, 'diam') / 2, M.anilha);
      d += e;
    }
    // a alavanca da trava, presa no carro, por fora da guia
    const tv = travaDoLado(t, w, H.trava === 'aberta');
    C.cilindro(add(tv.eixo, [-w * 3, 0, 0]), add(tv.eixo, [w * 1.5, 0, 0]), 2, M.cromo, { lados: 10 });
    C.tubo(tv.eixo, tv.gancho, 2.2, 3.4, M.metalClaro, { up: X });
    const manopla = add(tv.eixo, mul(G.frente, 12));
    C.tubo(tv.eixo, manopla, 2, 2, M.metalClaro, { up: X });
    C.cilindro(manopla, add(manopla, [w * 9, 0, 0]), 1.8, M.borracha, { lados: 10 });
  };
  /** O encosto, as almofadas dos ombros, os pegadores e as travessas do carro. */
  const encosto = (C: C3, M: M3) => {
    // as travessas do carro, atrás do encosto (pintadas atrás do corpo, como o encosto)
    for (const tt of [t - g('carroComp') + 4, t - 4]) C.tubo(add(naGuia(tt, -xG), mul(G.frente, 6)), add(naGuia(tt, xG), mul(G.frente, 6)), 6, 6, M.metal, { up: G.sobe, dz: 30 });
    // o encosto: a face de cima na linha da face do encosto
    // (a pintura põe o encosto atrás do corpo: ele fica sempre do lado das costas, e o centro dele, perto do do tronco)
    C.estofado(add(meioEnc, mul(G.frente, -esp)), G.sobe, G.frente, X, g('encostoComp'), esp, g('encostoLarg'), M.estofado, { dz: 30 });
    for (const w of [-1, 1]) {
      // as almofadas dos ombros: saem do alto do encosto para a frente, por cima dos ombros
      const o = add(naFaceDoEncosto(t, (w * g('ombreirasEntre')) / 2), mul(G.frente, -1));
      C.estofado(add(o, mul(G.frente, g('ombreiraComp') / 2)), G.frente, G.sobe, X, g('ombreiraComp'), esp, g('ombreiraLarg'));
      T(C, add(naFaceDoEncosto(t + esp + 2, (w * g('ombreirasEntre')) / 2), mul(G.frente, -esp)), add(naFaceDoEncosto(t + esp + 2, (w * g('ombreirasEntre')) / 2), mul(G.frente, 10)), 4, 4, M.metal, X);
      // os pegadores, por fora das almofadas
      const P = pegadorDoHack(t, w);
      T(C, add(naFaceDoEncosto(t - 14, w * (g('ombreirasEntre') / 2 + 17)), mul(G.frente, -esp - 2)), P.a, 3, 3, M.metal, X);
      C.cilindro(P.a, P.b, g('pegadorDiam') / 2, M.borracha, { lados: 12 });
    }
  };

  const naFrente = [-1, 1].filter((w) => w !== H.atras);
  const noQuadro = H.noQuadro ? { noQuadro: H.noQuadro } : {};
  const estrutura: PecaPropria = {
    t: 'propria',
    nome: 'hack',
    fixa: [H.atras ?? 0, travaAlta],
    ...noQuadro,
    desenhar(C, M, o) {
      for (const w of naFrente) estruturaDoLado(C, M, w);
      base(C, M);
      if (o.comSombra) C.sombra(0, (E.zTras + E.zFrente) / 2, g('larg') / 2 - 10, (E.zFrente - E.zTras) / 2 + 4, 0.18);
    },
  };
  const carro: PecaPropria = {
    t: 'propria',
    nome: 'carro do hack',
    ...noQuadro,
    desenhar(C, M) {
      encosto(C, M);
      for (const w of naFrente) carroDoLado(C, M, w);
    },
  };
  const pecas: PecaPropria[] = [estrutura, carro];
  if (H.atras) {
    const w = H.atras;
    pecas.unshift(
      { t: 'propria', nome: 'hack (o lado de perto)', fixa: [w, travaAlta], cenario: true, desenhar: (C, M) => estruturaDoLado(C, M, w) },
      { t: 'propria', nome: 'carro do hack (o lado de perto)', cenario: true, desenhar: (C, M) => carroDoLado(C, M, w) },
    );
  }
  return { prims, pecas };
}

/** A alavanca da trava com o carro em `t`, do lado `w`: o eixo, o gancho (a ponta) e a direção. */
function travaDoLado(t: number, w: number, aberta: boolean) {
  const G = geometriaDoHack();
  const xT = w * (g('guiasEntre') / 2 + g('tubo') / 2 + 4);
  const eixo = add(naGuia(t - 6, xT), mul(G.frente, 4));
  const ang = (aberta ? g('travaAbre') : 0) * rad;
  const dir = add(mul(G.sobe, -Math.cos(ang)), mul(G.frente, Math.sin(ang)));
  return { eixo, gancho: add(eixo, mul(dir, g('travaComp'))), dir };
}

/**
 * O que o enquadramento precisa mostrar: a chapa dos pés e o carro em `tMax` (o ponto mais alto do exercício), do
 * alto das almofadas dos ombros até um pouco abaixo da chapa. O chão, o alto das guias e o montante de trás ficam
 * cortados pela borda do quadro, para o corpo ocupar o quadro.
 */
export function noQuadroDoHack(tMax: number, tMin: number): V3[] {
  const G = geometriaDoHack();
  const x = g('guiasEntre') / 2 + g('tubo');
  const alto = add(naFaceDoEncosto(tMax + g('estofadoEsp')), mul(G.frente, g('ombreiraComp')));
  const baixo = naGuia(tMin - g('carroComp'), 0);
  return [-x, x].flatMap((px): V3[] => [
    [px, g('chapaAltura') - 8, g('chapaComp') / 2 + 4],
    [px, Math.max(baixo[1], g('chapaAltura') - 8), baixo[2]],
    [px, alto[1], alto[2]],
    [px, alto[1], add(naFaceDoEncosto(tMax), mul(G.frente, -g('trilhoAtras')))[2]],
  ]);
}

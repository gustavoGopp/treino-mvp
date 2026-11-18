// Peça de cena: o leg press 45° (de anilhas). Medidas em ../dados/objetos/leg-press.json: o tamanho total vem da ficha
// da Hammer Strength PL-LP (176 × 130 × 145 cm; a Magnum MG-PL70 e a Gym Gear Elite são mais compridas), o ângulo das
// guias (45°) do nome dos aparelhos e da página da Hammer Strength HSLLP, a guia de 40 mm, o tubo de 100 × 50 mm, os
// pegadores de 38 mm e os 4 pinos de guardar anilhas da Gym Gear; a massa do carro (75,7 kg), da Magnum. O que faz a
// máquina funcionar (o ângulo do encosto, a altura do assento, onde corre a chapa dos pés) não aparece em nenhuma
// ficha lida: sai do corpo da tabela, com o motivo em cada linha. Parte do cartão de hoje
// (scripts/desenhos-equipamento/realista/aparelhos.mjs, `legPress`): o assento e o encosto azuis, as guias cromadas a
// 45°, o carro com a chapa antiderrapante, as alavancas da trava dos dois lados do carro, as anilhas nos pinos.
//
// A máquina funciona: o carro (com a chapa e as anilhas) só anda nas guias; a alavanca da trava, presa no carro, fecha
// sobre os suportes da estrutura (o carro não desce abaixo deles) ou gira para fora e solta o carro; os batentes de
// baixo ficam parados nas guias, na altura escolhida, e o carro para neles.
//
// Eixos: quem senta olha para +z; o vinco entre o assento e o encosto fica em x = 0, z = 0, na altura da tabela. O lado
// esquerdo de quem senta é +x. `s` é a posição do centro da chapa ao longo da linha em que ele corre (a 45°), medida
// a partir do ponto dessa linha que fica acima do vinco.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { MAT, retArred } from '../realista/base.mjs';
import { add, cross, dot, mul, sub } from '../vec';
import type { V3 } from '../vec';
import type { IdAnilha } from './barra-longa';

const g = (id: string) => obj('legPress', id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0];
type C3 = Parameters<PecaPropria['desenhar']>[0];
type M3 = Parameters<PecaPropria['desenhar']>[1];

export interface LegPress {
  /** A posição do centro da chapa ao longo da linha em que ela corre (cm, a partir do ponto acima do vinco). */
  carro: number;
  /** A alavanca da trava: fechada (o carro não desce abaixo dos suportes) ou aberta (o carro solto). */
  trava: 'fechada' | 'aberta';
  /** Onde ficam os batentes de baixo (a posição `carro` em que o carro para neles). */
  batente: number;
  /** As anilhas de cada lado, da mais pesada (perto do carro) à mais leve. */
  anilhas: IdAnilha[];
  /**
   * O lado da máquina (o sinal do x) que vai para trás do corpo, como cenário: de lado, o pino, as anilhas, a alavanca
   * e a guia do lado de perto cobririam as pernas de quem treina. É um corte de ilustração.
   */
  atras?: 1 | -1;
  /** Os pontos (cm) que o enquadramento precisa mostrar; o resto da máquina é cortado pela borda do quadro. */
  noQuadro?: V3[];
}

/** A geometria fixa: o vinco, os planos do assento e do encosto, a linha da chapa e a orientação dela. */
export function geometriaDoLegPress() {
  const yK = g('assentoAltura');
  const vinco: V3 = [0, yK, 0];
  const sa = g('assentoInclina') * rad,
    be = g('encostoInclina') * rad,
    t = g('trilhoInclina') * rad;
  /** O assento sobe para a frente; `normalAssento` sai do estofado para cima. */
  const aoAssento: V3 = [0, Math.sin(sa), Math.cos(sa)];
  const normalAssento: V3 = [0, Math.cos(sa), -Math.sin(sa)];
  /** O encosto sobe para trás; `normalEncosto` sai do estofado para quem senta (para cima e para a frente). */
  const sobeEncosto: V3 = [0, Math.sin(be), -Math.cos(be)];
  const normalEncosto: V3 = [0, Math.cos(be), Math.sin(be)];
  /** A guia sobe para a frente; `acima` é perpendicular a ela, para cima e para trás (para quem senta). */
  const guia: V3 = [0, Math.sin(t), Math.cos(t)];
  const acima: V3 = [0, Math.cos(t), -Math.sin(t)];
  // a chapa: a normal (para quem senta) é a da perpendicular à guia girada `plataformaInclina` para a horizontal
  const a = Math.PI + t - g('plataformaInclina') * rad;
  const normalChapa: V3 = [0, Math.sin(a), Math.cos(a)];
  /** Ao longo da chapa, de baixo para cima (para onde apontam os dedos). */
  const sobeChapa: V3 = [0, -Math.cos(a), Math.sin(a)];
  const origem: V3 = [0, yK + g('caminhoAcimaDoCanto'), 0];
  return { vinco, aoAssento, normalAssento, sobeEncosto, normalEncosto, guia, acima, normalChapa, sobeChapa, origem };
}
/** O centro da face da chapa com o carro em `s`. */
export const centroDaChapa = (s: number): V3 => {
  const G = geometriaDoLegPress();
  return add(G.origem, mul(G.guia, s));
};
/** Um ponto na face da chapa: `ao` cm para cima ao longo dela (a partir do centro) e `lado` cm em x. */
export const naChapa = (s: number, ao: number, lado = 0): V3 => {
  const G = geometriaDoLegPress();
  return add(add(centroDaChapa(s), mul(G.sobeChapa, ao)), [lado, 0, 0]);
};
/** A massa que o carro empurra contra os pés: o carro mais as anilhas dos dois lados (kg). */
export const massaDoLegPress = (anilhas: IdAnilha[]) => g('massaDoCarro') + 2 * anilhas.reduce((s, a) => s + obj(a, 'massa'), 0);

/** O ponto da linha de uma guia (o eixo da guia redonda) na posição `s` (x = ±guiasEntre/2). */
function naGuia(s: number, x: number): V3 {
  const G = geometriaDoLegPress();
  return add(add(G.origem, add(mul(G.guia, s), mul(G.acima, -g('trilhoAbaixo')))), [x, 0, 0]);
}
/**
 * O que o enquadramento precisa mostrar: o alto do encosto, o assento e o pé dele até `abaixo` cm debaixo do vinco, e
 * a chapa até `mostraDaChapa` cm de cada lado do centro com o carro em `sMax` (o ponto mais alto do exercício), na
 * largura das guias; com `ateNaGuia`, também a guia até essa posição (para os textos não caírem em cima dela). O chão, o alto das
 * guias e os pinos de guardar anilhas ficam cortados pela borda do quadro, para o corpo ocupar o quadro.
 */
export function noQuadroDoLegPress(sMax: number, abaixo: number, mostraDaChapa: number, ateNaGuia?: number): V3[] {
  const G = geometriaDoLegPress();
  const topoEnc = add(G.vinco, mul(G.sobeEncosto, g('encostoComp')));
  const alto = naChapa(sMax, mostraDaChapa);
  const baixo = naChapa(sMax, -mostraDaChapa);
  const x = g('guiasEntre') / 2 + g('tuboLarg');
  return [-x, x].flatMap((px): V3[] => [
    [px, topoEnc[1], topoEnc[2]],
    [px, G.vinco[1] - abaixo, topoEnc[2]],
    [px, G.vinco[1] - abaixo, baixo[2]],
    [px, alto[1], alto[2]],
    [px, baixo[1], baixo[2]],
    // até onde a guia aparece inteira (com o alto da estrutura): os textos ficam fora dela
    ...(ateNaGuia === undefined ? [] : [add(naGuia(ateNaGuia, px), [0, g('tuboLarg'), g('tuboLarg')])]),
  ]);
}

/** As pontas da máquina desenhada (para a folha conferir contra a ficha): a de trás, a da frente e o alto. */
export function extremosDoLegPress() {
  const G = geometriaDoLegPress();
  const topoEnc = add(G.vinco, mul(G.sobeEncosto, g('encostoComp')));
  const fim = naGuia(g('trilhoFim'), 0);
  return { zTras: topoEnc[2] - 3, zFrente: fim[2] + g('tuboLarg') + 2, yTopo: fim[1] + g('tuboLarg') };
}

/** O gancho da trava (a ponta da alavanca) com o carro em `s`, do lado `w` (sinal do x). */
function travaDoLado(s: number, w: number, aberta: boolean) {
  const G = geometriaDoLegPress();
  const xT = w * (g('guiasEntre') / 2 + g('tuboLarg') / 2 + 4);
  const eixo = add(naGuia(s - g('carroComp') * 0.15, xT), mul(G.acima, 6));
  const ang = (aberta ? g('travaAbre') : 0) * rad;
  // fechada: a alavanca desce paralela à guia; aberta: gira para cima (para o lado de `acima`)
  const dir = add(mul(G.guia, -Math.cos(ang)), mul(G.acima, Math.sin(ang)));
  return { eixo, gancho: add(eixo, mul(dir, g('travaComp'))), dir };
}
/** A posição do carro em que o gancho da trava fechada apoia nos suportes (o carro fechado não desce abaixo dela). */
export const posicaoDaTrava = () => g('travaNaGuia');
/** O suporte da estrutura onde o gancho da trava fechada apoia. */
const suporteDaTrava = (w: number) => travaDoLado(g('travaNaGuia'), w, false).gancho;

/**
 * O leg press: os volumes para a conferência (o assento, o encosto e a chapa, onde o corpo encosta e que ele não pode
 * atravessar) e a peça desenhada (a estrutura parada e o carro, que anda nas guias).
 */
export function legPress(L: LegPress): { prims: Prim[]; pecas: PecaPropria[]; chapa: V3 } {
  const G = geometriaDoLegPress();
  const esp = g('estofadoEsp'),
    lg = g('estofadoLarg'),
    tl = g('tuboLarg'),
    ta = g('tuboAlt');
  const E = extremosDoLegPress();
  const s = L.carro;
  const chapa = centroDaChapa(s);
  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  const prims: Prim[] = [
    caixa(add(add(G.vinco, mul(G.aoAssento, g('assentoComp') / 2)), mul(G.normalAssento, -esp / 2)), X, G.normalAssento, G.aoAssento, [lg / 2, esp / 2, g('assentoComp') / 2], 'estofado'),
    caixa(add(add(G.vinco, mul(G.sobeEncosto, g('encostoComp') / 2)), mul(G.normalEncosto, -esp / 2)), X, G.normalEncosto, G.sobeEncosto, [lg / 2, esp / 2, g('encostoComp') / 2], 'estofado'),
    caixa(add(chapa, mul(G.normalChapa, -1.5)), X, G.normalChapa, G.sobeChapa, [g('plataformaLarg') / 2, 1.5, g('plataformaAlt') / 2], 'plataforma'),
  ];

  const xG = g('guiasEntre') / 2;
  const T = (C: C3, a: V3, b: V3, w = tl, h = ta, m = MAT.metal, up?: V3) => C.tubo(a, b, w, h, m, up ? { up } : {});
  /** A estrutura de um lado (w = sinal do x): a viga do chão, a guia com a viga de baixo dela, os montantes, o batente, o suporte da trava e os pinos de guardar anilhas. */
  const estruturaDoLado = (C0: C3, M: M3, w: number) => {
    // a estrutura fica atrás do corpo em toda vista em que aparece com ele (de cima, por baixo das pernas; de lado, o
    // lado de longe): a pintura a põe atrás dele (o lado de perto, de lado, é cenário)
    const C = atrasDoCorpo(C0);
    const xb = w * xG;
    // a viga do chão, de trás do encosto até a frente
    T(C, [xb, ta / 2, E.zTras + 6], [xb, ta / 2, E.zFrente], tl, ta, M.metal, [0, 1, 0]);
    // a viga que sustenta a guia (debaixo dela), da ponta de baixo à de cima
    const g0 = naGuia(g('trilhoInicio') - 6, xb),
      g1 = naGuia(g('trilhoFim') + 4, xb);
    const baixo = mul(G.acima, -(g('guiaDiam') / 2 + ta / 2 + 1.5));
    T(C, add(g0, baixo), add(g1, baixo), tl, ta, M.metal, G.acima);
    // os montantes: o de cima (do chão ao alto da guia) e o de baixo (do chão à ponta de baixo)
    const pTopo = add(g1, baixo);
    T(C, [xb, ta, pTopo[2] - 2], [xb, pTopo[1], pTopo[2] - 2], tl, tl * 0.8, M.metal);
    const pBase = add(g0, baixo);
    T(C, [xb, ta, pBase[2]], [xb, pBase[1], pBase[2]], tl * 0.8, tl * 0.8, M.metal);
    // a guia redonda, cromada, presa nas pontas
    C.cilindro(naGuia(g('trilhoInicio'), xb), naGuia(g('trilhoFim'), xb), g('guiaDiam') / 2, M.cromo, { lados: 12 });
    for (const sp of [g('trilhoInicio'), g('trilhoFim')]) C.tubo(add(naGuia(sp, xb), mul(baixo, 1.4)), add(naGuia(sp, xb), mul(G.acima, 3)), 6, 6, M.metalClaro, { up: G.guia });
    // o batente de baixo: corre na guia e para o carro (com o pino de regular para fora)
    const bt = naGuia(L.batente - g('carroComp') / 2 - 3, xb);
    C.cilindro(add(bt, mul(G.guia, -5)), bt, 3.2, M.metal, { lados: 14 });
    C.cilindro(add(bt, mul(G.guia, -1.4)), bt, 3.4, M.borracha, { lados: 14 });
    const pino = add(bt, mul(G.guia, -2.5));
    C.cilindro(pino, add(pino, [w * 7, 0, 0]), 0.9, M.cromo, { lados: 8 });
    C.cilindro(add(pino, [w * 7, 0, 0]), add(pino, [w * 9, 0, 0]), 1.8, M.borracha, { lados: 10 });
    // o suporte da trava: um toco na viga da guia, por fora, onde o gancho da alavanca apoia
    const sup = suporteDaTrava(w);
    const naViga: V3 = [w * (xG + tl / 2), sup[1] - 6, sup[2] + 6];
    C.tubo(naViga, add(sup, mul(G.acima, -2.2)), 3, 3, M.metal);
    C.cilindro(add(sup, mul(G.acima, -2.2)), add(add(sup, mul(G.acima, -2.2)), [w * 3, 0, 0]), 1.6, M.borracha, { lados: 10 });
    // os pinos de guardar anilhas: dois no montante de cima, para fora
    for (const y of [32, 70]) {
      const a: V3 = [xb + (w * tl) / 2, y, pTopo[2] - 2];
      C.cilindro(a, add(a, [w * 22, 2.5, 0]), 2.5, M.cromo, { lados: 12 });
    }
  };
  /** O banco: o assento, o encosto, os pés deles e os pegadores ao lado do assento. */
  const banco = (C0: C3, M: M3) => {
    // o assento e o encosto ficam sempre do lado das costas e do glúteo: pintados atrás do corpo
    const C = atrasDoCorpo(C0);
    // as travessas do chão (atrás, debaixo do vinco e na frente)
    for (const z of [E.zTras + 6, 0, E.zFrente - tl / 2]) T(C, [-xG - tl / 2, ta / 2, z], [xG + tl / 2, ta / 2, z], tl, ta, M.metal, [0, 1, 0]);
    // o pé do assento e o braço que segura o encosto
    T(C, [0, ta, 4], add(G.vinco, [0, -esp - 3, 6]), tl * 0.8, tl * 0.8, M.metal);
    const meioEnc = add(add(G.vinco, mul(G.sobeEncosto, g('encostoComp') * 0.55)), mul(G.normalEncosto, -esp - 2));
    T(C, [0, ta, meioEnc[2] - 4], meioEnc, tl * 0.7, tl * 0.7, M.metal);
    T(C, add(G.vinco, [0, -esp - 3, 4]), add(add(G.vinco, mul(G.sobeEncosto, g('encostoComp') * 0.85)), mul(G.normalEncosto, -esp - 1)), 5, 5, M.metal, X);
    // o assento e o encosto (a face de cima de cada um no plano em que o corpo apoia)
    C.estofado(add(add(G.vinco, mul(G.aoAssento, g('assentoComp') / 2)), mul(G.normalAssento, -esp)), G.aoAssento, G.normalAssento, X, g('assentoComp'), esp, lg);
    C.estofado(add(add(G.vinco, mul(G.sobeEncosto, g('encostoComp') / 2 + 1)), mul(G.normalEncosto, -esp)), G.sobeEncosto, G.normalEncosto, X, g('encostoComp'), esp, lg);
  };
  const pegadores = (C: C3, M: M3, so?: number) => {
    for (const w of [-1, 1]) {
      if (so !== undefined && w !== so) continue;
      const P = pegador(w);
      C.tubo([w * (lg / 2 - 4), G.vinco[1] - esp - 3, P.a[2] - 6], P.a, 3, 3, M.metal);
      C.cilindro(P.a, P.b, g('pegadorDiam') / 2, M.borracha, { lados: 12 });
    }
  };

  /** O carro de um lado: a viga do carro, os rolamentos na guia, o pino com as anilhas e a alavanca da trava. */
  const carroDoLado = (C: C3, M: M3, w: number) => {
    const xb = w * xG;
    const c0 = naGuia(s - g('carroComp') / 2, xb),
      c1 = naGuia(s + g('carroComp') / 2, xb);
    // os rolamentos lineares nas duas pontas, e a viga do carro, logo acima da guia
    for (const c of [c0, add(c1, mul(G.guia, -10))]) C.tubo(c, add(c, mul(G.guia, 10)), 8, 8, M.metalClaro, { up: X });
    const sobre = mul(G.acima, 5.5);
    T(C, add(c0, sobre), add(c1, sobre), tl, ta, M.metal, G.acima);
    // os braços que sobem da viga do carro até a chapa
    for (const ao of [-0.32, 0.32]) {
      const p = naChapa(s, ao * g('plataformaAlt'), w * (xG - 2));
      T(C, add(add(c0, sobre), mul(G.guia, g('carroComp') * (0.5 + ao * 0.5))), add(p, mul(G.normalChapa, -3)), 6, 6, M.metal, X);
    }
    // o pino de carregar anilha, para fora, na metade de baixo do carro, e as anilhas
    const raiz = add(naGuia(s - g('carroComp') * 0.12, w * (xG + tl / 2)), mul(G.acima, 9));
    const ponta = add(raiz, [w * g('pinoAnilhaComp'), 0, 0]);
    C.cilindro(add(raiz, [-w * 2, 0, 0]), add(raiz, [w * 2.5, 0, 0]), 4, M.cromo, { lados: 14 });
    C.cilindro(raiz, ponta, g('pinoAnilhaDiam') / 2, M.cromo, { lados: 14 });
    let d = 2.5;
    for (const a of L.anilhas) {
      const e = obj(a, 'esp');
      const p0 = add(raiz, [w * d, 0, 0]),
        p1 = add(raiz, [w * (d + e), 0, 0]);
      C.anilha(w < 0 ? p1 : p0, w < 0 ? p0 : p1, obj(a, 'diam') / 2, M.anilha);
      d += e;
    }
    // a alavanca da trava: o eixo no carro, a barra e o gancho; a manopla sobe do eixo
    const tv = travaDoLado(s, w, L.trava === 'aberta');
    C.cilindro(add(tv.eixo, [-w * 3, 0, 0]), add(tv.eixo, [w * 1.5, 0, 0]), 2, M.cromo, { lados: 10 });
    C.tubo(tv.eixo, tv.gancho, 2.2, 3.4, M.metalClaro, { up: X });
    C.tubo(tv.gancho, add(tv.gancho, mul(cross(X, tv.dir), -3.5 * w)), 2.2, 3.4, M.metalClaro, { up: X });
    const manopla = add(tv.eixo, mul(add(mul(G.acima, 1), mul(tv.dir, -0.35)), 13));
    C.tubo(tv.eixo, manopla, 2, 2, M.metalClaro, { up: X });
    C.cilindro(manopla, add(manopla, [w * 9, 0, 0]), 1.8, M.borracha, { lados: 10 });
  };
  /** A chapa dos pés (inox antiderrapante, com as ranhuras em diagonal) e as travessas do carro. */
  const chapaDoCarro = (C: C3, M: M3) => {
    const c0 = naGuia(s - g('carroComp') / 2, 0),
      c1 = naGuia(s + g('carroComp') / 2, 0);
    for (const c of [c0, c1]) T(C, add(add(c, mul(G.acima, 5.5)), [-xG, 0, 0]), add(add(c, mul(G.acima, 5.5)), [xG, 0, 0]), 6, 6, M.metal, G.guia);
    const largura = g('plataformaLarg'),
      altura = g('plataformaAlt');
    const tras = add(chapa, mul(G.normalChapa, -3));
    const ranhuras = (P: (p: V3) => V3) => {
      // só quando a face da chapa fica de frente para quem olha (de perfil ela é uma linha)
      const a = P(chapa),
        b = P(add(chapa, mul(G.normalChapa, 10)));
      const q0 = P(naChapa(s, -altura / 2, -largura / 2)),
        q1 = P(naChapa(s, altura / 2, -largura / 2)),
        q2 = P(naChapa(s, -altura / 2, largura / 2));
      const area = Math.abs((q1[0] - q0[0]) * (q2[1] - q0[1]) - (q1[1] - q0[1]) * (q2[0] - q0[0]));
      if (b[2] >= a[2] || area < 0.12 * largura * altura) return '';
      let d = '';
      for (let i = 0; i < 11; i++)
        for (let j = 0; j < 7; j++) {
          const ao = -altura / 2 + 5 + i * 5.4,
            x = -largura / 2 + 6 + j * 9.4 + (i % 2) * 4.7;
          const p = P(add(naChapa(s, ao, x), mul(G.normalChapa, 0.1))),
            q = P(add(naChapa(s, ao + 2.2, x + 2.2), mul(G.normalChapa, 0.1)));
          d += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
        }
      return `<path d="${d}" stroke="#5E646C" stroke-width="0.45" stroke-linecap="round" fill="none"/>`;
    };
    C.prisma(retArred(largura, altura, 2), tras, X, G.sobeChapa, mul(G.normalChapa, 3), M.plataforma, { decalSempre: ranhuras } as never);
    // o reforço da borda de baixo, atrás da chapa (a face fica lisa até a borda: a ponta do pé apoia nela na panturrilha)
    const borda = add(naChapa(s, -altura / 2 + 1.2, 0), mul(G.normalChapa, -4.2));
    C.tubo(add(borda, [-largura / 2, 0, 0]), add(borda, [largura / 2, 0, 0]), 2.4, 2.4, M.metalClaro, { up: G.sobeChapa });
  };

  const naFrente = [-1, 1].filter((w) => w !== L.atras);
  const noQuadro = L.noQuadro ? { noQuadro: L.noQuadro } : {};
  const estrutura: PecaPropria = {
    t: 'propria',
    nome: 'leg press',
    fixa: [L.batente, L.atras ?? 0],
    ...noQuadro,
    desenhar(C, M, o) {
      for (const w of naFrente) estruturaDoLado(C, M, w);
      banco(C, M);
      pegadores(C, M);
      if (o.comSombra) C.sombra(0, (E.zTras + E.zFrente) / 2, g('larg') / 2 - 10, (E.zFrente - E.zTras) / 2 + 4, 0.18);
    },
  };
  const carro: PecaPropria = {
    t: 'propria',
    nome: 'carro do leg press',
    ...noQuadro,
    desenhar(C, M) {
      chapaDoCarro(C, M);
      for (const w of naFrente) carroDoLado(C, M, w);
    },
  };
  const pecas: PecaPropria[] = [estrutura, carro];
  if (L.atras) {
    const w = L.atras;
    pecas.unshift(
      { t: 'propria', nome: 'leg press (o lado de perto)', fixa: [L.batente, w], cenario: true, desenhar: (C, M) => estruturaDoLado(C, M, w) },
      { t: 'propria', nome: 'carro do leg press (o lado de perto)', cenario: true, desenhar: (C, M) => carroDoLado(C, M, w) },
    );
  }
  return { prims, pecas, chapa };
}

/** O pegador de um lado do assento: as pontas do cilindro de borracha (a mão fecha no meio). */
export function pegador(w: number): { a: V3; b: V3; meio: V3 } {
  const G = geometriaDoLegPress();
  const base = add(add(G.vinco, mul(G.aoAssento, g('assentoComp') * 0.3)), [w * (g('estofadoLarg') / 2 + 6), 5, 0]);
  const a = add(base, [0, 0, -6]),
    b = add(base, [0, 0, 8]);
  return { a, b, meio: mul(add(a, b), 0.5) };
}
/** Só para a folha e as regras: a distância de um ponto ao plano da face da chapa (positiva do lado de quem senta). */
export const acimaDaChapa = (s: number, p: V3) => dot(sub(p, centroDaChapa(s)), geometriaDoLegPress().normalChapa);

/**
 * A cena com as peças empurradas para trás na pintura (`dz`), para ficarem atrás do corpo: a estrutura e o banco das
 * máquinas de trilho ficam sempre do lado das costas (de cima, por baixo do corpo), mas o centro delas fica perto do
 * do tronco, e a ordem pela profundidade do centro as punha na frente dele.
 */
export function atrasDoCorpo(C: C3, dz = 30): C3 {
  type O = { dz?: number };
  const mais = <T extends O>(o?: T): T => ({ ...(o ?? ({} as T)), dz: (o?.dz ?? 0) + dz });
  return {
    ...C,
    tubo: (a, b, w, h, m, o) => C.tubo(a, b, w, h, m, mais(o)),
    prisma: (pf, o3, e1, e2, ext, m, o) => C.prisma(pf, o3, e1, e2, ext, m, mais(o)),
    cilindro: (a, b, r, m, o) => C.cilindro(a, b, r, m, mais(o)),
    anilha: (a, b, r, m, o) => C.anilha(a, b, r, m, mais(o)),
  };
}

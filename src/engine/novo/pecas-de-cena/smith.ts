// Peça de cena: o smith (a barra presa a duas guias, com ganchos e travas de segurança). Medidas em
// ../dados/objetos/smith.json: o tamanho total (221 × 125 × 237 cm), a inclinação da guia (7°), o passo dos ganchos
// (16 cm), o peso da barra (9 kg) e os 8 pinos de anilha vêm da ficha da Life Fitness SSM; as medidas de dentro da
// máquina (onde fica a guia, o carro, a régua dos ganchos, a trava) não aparecem em nenhuma ficha lida e são de
// desenho, com o motivo. Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `smith`): a
// estrutura de grafite, as guias cromadas, a barra presa a elas com as anilhas nas pontas. O que o cartão de hoje não
// tinha e o separa do suporte de agachamento (o cuidado 12): os carros dos rolamentos que correm nas guias, a régua dos
// pinos onde o gancho da barra prende, as travas que correm na guia e a guia inclinada.
//
// A máquina funciona: a barra só anda na guia (o centro dela fica na linha da guia, a 7° da vertical, em qualquer
// altura); os carros correm nas guias com a barra; o gancho gira com a barra e prende num pino da régua (um a cada
// 16 cm); a trava fica parada na guia, na altura escolhida, e o carro para nela.
//
// Eixos da máquina: x ao longo da barra; o alto da guia inclina para +z (`sobePara: 1`) ou para −z (`sobePara: −1`,
// a máquina girada meia volta). `base` é onde a linha da guia (o caminho do centro da barra) encontra o chão: com a
// barra na altura y, o centro dela fica em base + [0, y, sobePara · y · tan 7°].
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { obj } from '../tabelas';
import { add, mul, norm } from '../vec';
import type { V3 } from '../vec';
import type { IdAnilha } from './barra-longa';

const g = (id: string) => obj('smith', id);
const rad = Math.PI / 180;

export interface Smith {
  /** Onde a linha da guia (o caminho do centro da barra) encontra o chão. */
  base: V3;
  /** Para que lado o alto da guia inclina: +z (1) ou −z (−1). */
  sobePara: 1 | -1;
  /** A altura do centro da barra (cm, do chão). */
  barra: number;
  /** A altura do centro da barra quando o carro para na trava (cm): a trava fica logo abaixo dela. */
  trava: number;
  /** O giro do gancho (graus): 0 = deitado para trás, preso no pino; 90 = em pé, solto (a posição de treino). */
  gancho?: number;
  /** As anilhas de cada lado, da mais pesada (perto do carro) à mais leve. */
  anilhas: IdAnilha[];
  /**
   * Os pontos (cm, no mundo) que o enquadramento precisa mostrar; o resto da máquina é cortado pela borda do quadro.
   * Sem eles, a máquina inteira entra no enquadramento (como no cartão).
   */
  noQuadro?: V3[];
  /**
   * O lado da máquina (o sinal do x, no mundo) que vai para trás do corpo, como cenário: de lado, a guia, o carro e a
   * anilha do lado de perto cobririam as costas e a mão de quem treina. É um corte de ilustração: o resto da máquina
   * fica na ordem certa de profundidade.
   */
  atras?: 1 | -1;
}

/** A direção da guia (de baixo para cima), no mundo. */
export const direcaoDaGuia = (s: Pick<Smith, 'sobePara'>): V3 => norm([0, 1, s.sobePara * Math.tan(g('guiaInclina') * rad)]);
/** O centro da barra com ela na altura y: a barra só anda na guia. */
export const centroDaBarraDoSmith = (s: Pick<Smith, 'base' | 'sobePara'>, y: number): V3 => add(s.base, [0, y, s.sobePara * y * Math.tan(g('guiaInclina') * rad)]);
/**
 * Os cantos da máquina no chão e na altura `ate` (cm, no mundo): para o enquadramento mostrar a estrutura
 * de frente para o fundo e de um lado ao outro, cortada em cima nessa altura.
 */
export function cantosDoSmith(s: Pick<Smith, 'base' | 'sobePara'>, ate: number, comAsMangas = false): V3[] {
  const tan = Math.tan(g('guiaInclina') * rad);
  const zg0 = -((8 + g('altura') - 14) / 2) * tan;
  // `comAsMangas`: de um lado ao outro, até a ponta da barra (a largura da ficha), e não só até os montantes
  const xL = comAsMangas ? g('larg') / 2 : g('guiasEntre') / 2 + g('montanteFora') + g('montante') / 2,
    pz = g('prof') / 2;
  return [-1, 1].flatMap((sx) => [0, ate].flatMap((y) => [-1, 1].map((sz): V3 => add(s.base, [sx * xL, y, s.sobePara * (sz * pz - zg0)]))));
}
/** O raio da barra entre os carros (onde a mão fecha). */
export const raioDaBarraDoSmith = () => g('pegadaDiam') / 2;
/** A massa que a barra põe nas mãos: a barra (com o contrapeso) mais as anilhas dos dois lados (kg). */
export const massaDoSmith = (anilhas: IdAnilha[]) => g('barraMassa') + 2 * anilhas.reduce((s, a) => s + obj(a, 'massa'), 0);

/**
 * O smith: os volumes para a conferência (a barra, os carros e as anilhas) e a peça desenhada (a estrutura, as guias,
 * as réguas dos ganchos, as travas, os pinos de anilha e a barra com os carros, os ganchos e as anilhas).
 */
export function smith(s: Smith): { prims: Prim[]; pecas: PecaPropria[]; centro: V3; guia: V3 } {
  const tan = Math.tan(g('guiaInclina') * rad);
  const G = g('guiasEntre') / 2,
    H = g('altura'),
    pz = g('prof') / 2,
    tb = g('montante'),
    xL = G + g('montanteFora'),
    meia = g('larg') / 2;
  // a linha da guia fica no meio da máquina, de frente para o fundo, na metade da altura da guia
  const yG0 = 8,
    yG1 = H - 14;
  const zg0 = -((yG0 + yG1) / 2) * tan;
  // da máquina (x, y, z) para o mundo: a máquina gira meia volta quando a guia sobe para −z
  const W = ([x, y, z]: V3): V3 => add(s.base, [s.sobePara * x, y, s.sobePara * (z - zg0)]);
  const naGuia = (x: number, y: number): V3 => W([x, y, zg0 + y * tan]);
  const up = direcaoDaGuia(s);
  const centro = centroDaBarraDoSmith(s, s.barra);
  const X: V3 = [1, 0, 0];
  const em = (c: V3, x: number): V3 => [c[0] + x, c[1], c[2]];
  const ca = g('carroAlt'),
    cl = g('carroLarg');
  // as anilhas: da face de fora do carro (com um rebordo de 2,5 cm) para fora
  const posAnilhas = (w: number) => {
    let d = G + cl / 2 + 2.5;
    return s.anilhas.map((a) => {
      const e = obj(a, 'esp');
      const r = { id: a, a: em(centro, w * d), b: em(centro, w * (d + e)), raio: obj(a, 'diam') / 2 };
      d += e;
      return r;
    });
  };
  const prims: Prim[] = [{ t: 'volume', vol: cilindro(em(centro, -G + cl / 2), em(centro, G - cl / 2), g('pegadaDiam') / 2), cls: 'aco', vies: -0.5 }];
  for (const w of [-1, 1]) {
    prims.push({ t: 'volume', vol: cilindro(add(em(centro, w * G), mul(up, -ca / 2)), add(em(centro, w * G), mul(up, ca / 2)), cl / 2), cls: 'aco', vies: -0.5 });
    for (const an of posAnilhas(w)) prims.push({ t: 'volume', vol: cilindro(an.a, an.b, an.raio), cls: 'ferro', vies: -0.5 });
  }

  // o gancho: gira com a barra, num plano de lado (y, z); 0° = deitado para trás (para a régua), 90° = em pé
  const giro = (s.gancho ?? 90) * rad;
  const tras: V3 = [0, 0, -s.sobePara];
  const dirGancho = norm(add(mul(tras, Math.cos(giro)), mul([0, 1, 0], Math.sin(giro))));
  // a régua dos pinos: paralela à guia, atrás dela, do lado de dentro do carro
  const xRegua = G - cl / 2 - 1.5,
    zRegua = -g('reguaAtras');
  const pinos: number[] = [];
  for (let y = g('pinoMin'); y <= yG1 - 10; y += g('ganchosEntre')) pinos.push(y);
  // a trava: o batente fica na guia logo abaixo do carro, com a barra na altura `trava`
  const topoDaTrava = (w: number) => add(em(centroDaBarraDoSmith(s, s.trava), w * G), mul(up, -ca / 2));

  // de cima (a pino), a travessa do alto cobriria quem treina: fica de fora, como se o quadro a cortasse (o gerador
  // devolve o giro da câmera em `rot`, sem tipo em base.d.mts)
  const deCima = (C: Parameters<PecaPropria['desenhar']>[0]) => Math.abs((C as unknown as { rot(v: V3): V3 }).rot([0, 1, 0])[2]) > 0.9;
  /** A estrutura parada de um lado (w = o sinal do x do lado, no mundo). */
  const estruturaDoLado = (C: Parameters<PecaPropria['desenhar']>[0], M: Parameters<PecaPropria['desenhar']>[1], w: number) => {
    const lado = w * s.sobePara,
      x = lado * xL;
    const T = (a: V3, b: V3, l = tb, m = M.metal) => C.tubo(W(a), W(b), l, l, m);
    // a base no chão, os dois montantes e a travessa de cima do lado
    T([x, tb / 2, -pz], [x, tb / 2, pz]);
    for (const z of [-pz + tb / 2, pz - tb / 2]) T([x, tb, z], [x, H - tb / 2, z]);
    T([x, H - tb / 2, -pz], [x, H - tb / 2, pz]);
    // os suportes da guia, embaixo e em cima, do montante até ela
    const gb = [lado * G, yG0, zg0 + yG0 * tan] as V3,
      gt = [lado * G, yG1, zg0 + yG1 * tan] as V3;
    T([x, yG0, gb[2]], gb, 6);
    T([x, yG1, gt[2]], gt, 6);
    C.tubo(W([lado * G, yG0 - 4, gb[2]]), W([lado * G, yG0 + 4, gb[2]]), 9, 9, M.metalClaro);
    C.tubo(W([lado * G, yG1 - 4, gt[2]]), W([lado * G, yG1 + 4, gt[2]]), 9, 9, M.metalClaro);
    // a guia cromada, inclinada, presa só nas pontas
    C.cilindro(naGuia(lado * G, yG0), naGuia(lado * G, yG1), g('guiaDiam') / 2, M.cromo, { lados: 12 });
    // a régua dos pinos, paralela à guia, e os pinos (um a cada 16 cm), virados para dentro
    const naRegua = (y: number): V3 => [lado * xRegua, y, zg0 + y * tan + zRegua];
    C.tubo(W(naRegua(yG0 + 4)), W(naRegua(yG1 - 4)), 1.6, 4, M.metalClaro, { up: [1, 0, 0] });
    T([x, yG0 + 4, naRegua(yG0 + 4)[2]], naRegua(yG0 + 4), 3);
    T([x, yG1 - 4, naRegua(yG1 - 4)[2]], naRegua(yG1 - 4), 3);
    for (const y of pinos) {
      const p = W(naRegua(y));
      C.cilindro(p, add(p, [-w * 3.5, 0, 0]), 1, M.cromo, { lados: 8, contorno: false });
    }
    // a trava: o batente emborrachado na guia e o pino de regular, para a frente
    const tt = topoDaTrava(w);
    C.cilindro(add(tt, mul(up, -g('travaAlt'))), tt, 3.4, M.metal, { lados: 14 });
    C.cilindro(add(tt, mul(up, -1.6)), tt, 3.6, M.borracha, { lados: 14 });
    const pinoTrava = add(tt, mul(up, -g('travaAlt') / 2));
    C.cilindro(pinoTrava, add(pinoTrava, [0, 0, s.sobePara * 6]), 0.9, M.cromo, { lados: 8 });
    C.cilindro(add(pinoTrava, [0, 0, s.sobePara * 6]), add(pinoTrava, [0, 0, s.sobePara * 8]), 1.8, M.borracha, { lados: 10 });
    // os pinos de guardar anilhas: dois em cada montante, para fora
    for (const z of [-pz + tb / 2, pz - tb / 2])
      for (const y of [32, 74]) {
        const a = W([x + (lado * tb) / 2, y, z]);
        C.cilindro(a, add(a, [w * g('pinoAnilhaComp'), 3, 0]), 2.5, M.cromo, { lados: 12 });
      }
  };
  /** A parte que anda, de um lado: o carro, o gancho, a manga e as anilhas. */
  const barraDoLado = (C: Parameters<PecaPropria['desenhar']>[0], M: Parameters<PecaPropria['desenhar']>[1], w: number) => {
    const c = em(centro, w * G);
    C.tubo(add(c, mul(up, -ca / 2)), add(c, mul(up, ca / 2)), cl, cl, M.metalClaro, { up: X });
    // o gancho, do lado de dentro do carro, até a régua
    const raiz = em(centro, w * xRegua);
    const ponta = add(raiz, mul(dirGancho, g('ganchoComp')));
    C.tubo(raiz, ponta, 1.2, 3.2, M.metal, { up: X });
    C.tubo(ponta, add(ponta, mul(norm(add(mul(dirGancho, 0.2), mul(up, -1))), 3)), 1.2, 2.4, M.metal, { up: X });
    // a manga de fora, com o rebordo, e as anilhas
    C.cilindro(em(centro, w * (G + cl / 2)), em(centro, w * (G + cl / 2 + 2.5)), 3.8, M.cromo, { lados: 14 });
    C.cilindro(em(centro, w * (G + cl / 2 + 2.5)), em(centro, w * meia), g('mangaDiam') / 2, M.cromo, { lados: 14 });
    for (const an of posAnilhas(w)) C.anilha(w < 0 ? an.b : an.a, w < 0 ? an.a : an.b, an.raio, M.anilha);
  };
  // os lados que ficam na ordem certa de profundidade e o que vai para trás do corpo (`atras`)
  const naFrente = [-1, 1].filter((w) => w !== s.atras);
  const noQuadro = s.noQuadro ? { noQuadro: s.noQuadro } : {};
  const estrutura: PecaPropria = {
    t: 'propria',
    nome: 'smith',
    fixa: [s.base, s.sobePara, s.trava, s.atras ?? 0],
    ...noQuadro,
    desenhar(C, M, o) {
      for (const w of naFrente) estruturaDoLado(C, M, w);
      // a travessa do alto, só no fundo (a frente fica aberta, por onde se entra; o suporte de agachamento tem as quatro)
      if (!deCima(C)) C.tubo(W([-xL, H - tb / 2, -pz + tb / 2]), W([xL, H - tb / 2, -pz + tb / 2]), tb, tb, M.metal);
      if (o.comSombra) C.sombra(s.base[0], W([0, 0, 0])[2], xL + 6, pz + 4, 0.18);
    },
  };
  const barra: PecaPropria = {
    t: 'propria',
    nome: 'barra do smith',
    ...noQuadro,
    desenhar(C, M) {
      C.cilindro(em(centro, -G + cl / 2), em(centro, G - cl / 2), g('pegadaDiam') / 2, M.cromo, { lados: 14, dz: 6 });
      for (const w of naFrente) barraDoLado(C, M, w);
    },
  };
  const pecas: PecaPropria[] = [estrutura, barra];
  if (s.atras) {
    const w = s.atras;
    pecas.unshift(
      { t: 'propria', nome: 'smith (o lado de perto)', fixa: [s.base, s.sobePara, s.trava, w], cenario: true, desenhar: (C, M) => estruturaDoLado(C, M, w) },
      { t: 'propria', nome: 'barra do smith (o lado de perto)', cenario: true, desenhar: (C, M) => barraDoLado(C, M, w) },
    );
  }
  return { prims, pecas, centro, guia: up };
}

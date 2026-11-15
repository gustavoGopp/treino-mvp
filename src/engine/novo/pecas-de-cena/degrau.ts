// Peças de cena das panturrilhas em pé: o step de academia e os primeiros degraus de uma escada com corrimão. Os dois
// ficam com a beirada de trás (onde a bola do pé apoia e o calcanhar fica no ar) em z = zBorda e se estendem para a
// frente da pessoa (+z). Medidas na tabela de objetos (../dados/objetos/step.json e escada.json).
//  - O step segue o cartão de equipamento do app (scripts/desenhos-equipamento/realista/itens.mjs, `step`): dois
//    apoios claros embaixo, a plataforma escura de cantos arredondados e o tapete de borracha na cor de ação, com os
//    frisos, por cima.
//  - A escada é de alvenaria clara, com os degraus da norma (altura e piso pela fórmula de Blondel) e o corrimão na
//    altura da norma acima da linha das quinas, preso em montantes que saem dos degraus, do lado da mão que apoia.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { MAT, mix, retArred } from '../realista/base.mjs';
import type { Material } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { REF0 } from '../vec';
import type { V3 } from '../vec';

const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0];
const caixa = (o: V3, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { ...REF0, o }, meias, cls, vies });
const doTema = (m: Material, tema: 'claro' | 'escuro', quanto = 0.3): Material => (tema === 'claro' ? m : (m.map((t) => mix(t, '#aeb8c2', quanto)) as unknown as Material));

/* ============================== o step ============================== */
export function step(zBorda: number, x0 = 0): { prims: Prim[]; peca: PecaPropria } {
  const g = (id: string) => obj('step', id);
  const comp = g('comp'),
    prof = g('prof'),
    alt = g('altura'),
    tap = g('tapeteEsp'),
    plat = g('plataformaEsp'),
    apoio = g('apoioLarg');
  const zMeio = zBorda + prof / 2;
  // para a conferência: o volume inteiro do step (o pé apoia em cima; o corpo não pode entrar nele)
  const prims: Prim[] = [caixa([x0, alt / 2, zMeio], [comp / 2, alt / 2, prof / 2], 'obj', -1)];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'step',
    fixa: { zBorda, x0 },
    desenhar(C, M, o) {
      const yPlat = alt - tap - plat;
      // os dois apoios claros, perto das pontas, um pouco para dentro da plataforma
      for (const s of [-1, 1]) {
        const xc = x0 + s * (comp / 2 - apoio / 2 - 4);
        C.tubo([xc, 0, zMeio], [xc, yPlat, zMeio], apoio, prof - 4, M.metalClaro, { up: [0, 0, 1] });
      }
      // a plataforma escura, de cantos arredondados (perfil de lado a lado, extrudado na profundidade)
      C.prisma(retArred(comp, plat, 2.4, 4), [x0, yPlat + plat / 2, zBorda], X, Y, [0, 0, prof], M.metal);
      // o tapete de borracha por cima, na cor de ação, com os frisos ao longo da profundidade
      const largT = comp - 6;
      C.prisma(retArred(largT, tap, 0.7, 2), [x0, alt - tap / 2, zBorda + 1.5], X, Y, [0, 0, prof - 3], doTema(MAT.estofado, o.tema, 0.15));
      // os frisos do tapete, só quando o tampo aparece (de lado ele é uma linha)
      if (Math.abs(C.P([x0, alt, zBorda])[1] - C.P([x0, alt, zBorda + prof])[1]) > 2) {
        const n = 18,
          zTopo = C.P([x0, alt, zMeio])[2];
        for (let i = 0; i < n; i++) {
          const x = x0 - largT / 2 + 4 + (i * (largT - 8)) / (n - 1);
          C.linha([x, alt + 0.05, zBorda + 3], [x, alt + 0.05, zBorda + prof - 3], o.tema === 'claro' ? '#2B2780' : '#1E1A5C', 0.45, { z: zTopo - 0.5 });
        }
      }
      if (o.comSombra) C.sombra(x0, zMeio, comp / 2 + 3, prof / 2 + 4, 0.18);
    },
  };
  return { prims, peca };
}

/* ============================== a parede em frente ============================== */
/** A parede lisa e clara, para não disputar com o corpo (a mesma da cadeira do búlgaro). */
const PAREDE: Material = ['#C9CED4', '#D9DDE2', '#E6E9EC', '#A9B0B8'];
const PAREDE_ESCURA: Material = ['#3A4048', '#424952', '#4B535D', '#5C6570'];
/**
 * A parede em frente da pessoa, onde as mãos apoiam: a face fica em z = zFace, virada para a pessoa (−z). É cenário
 * (pintada atrás do corpo e fora do enquadramento); `larg` e `alt` são só o trecho que pode caber no quadro.
 */
export function paredeEmFrente(zFace: number, larg = 150, alt = 230, esp = 10): PecaPropria {
  return {
    t: 'propria',
    nome: 'parede-em-frente',
    fixa: { zFace, larg, alt, esp },
    cenario: true,
    desenhar(C, _M, o) {
      C.tubo([0, 0, zFace + esp / 2], [0, alt, zFace + esp / 2], larg, esp, o.tema === 'claro' ? PAREDE : PAREDE_ESCURA, { up: [0, 0, 1] });
    },
  };
}

/* ============================== a escada ============================== */
/** A pedra clara dos degraus (quatro tons: sombra, meio, luz, traço). */
const PEDRA: Material = ['#8F959C', '#B3B8BE', '#D5D9DD', '#5D636A'];

export interface Escada {
  /** z da quina do primeiro degrau (onde a bola do pé apoia e o calcanhar fica no ar, atrás). */
  zBorda: number;
  /** x do corrimão (do lado da mão que apoia). */
  xCorrimao: number;
  /** Até onde o corrimão vem para trás da quina do primeiro degrau (cm). */
  corrimaoAntes: number;
}
/** A altura do eixo do corrimão em z: a altura da norma acima da linha que une as quinas dos degraus. */
export function alturaDoCorrimao(E: Escada, z: number): number {
  const h = obj('escada', 'degrauAltura'),
    b = obj('escada', 'degrauPiso');
  return h + ((z - E.zBorda) * h) / b + obj('escada', 'corrimaoAltura');
}
export function escada(E: Escada): { prims: Prim[]; peca: PecaPropria } {
  const g = (id: string) => obj('escada', id);
  const h = g('degrauAltura'),
    b = g('degrauPiso'),
    larg = g('larg'),
    n = g('degraus'),
    rc = g('corrimaoDiam') / 2,
    ml = g('montanteLado');
  // o fim da escada desenhada: o último degrau tem o piso inteiro e mais um pouco (a escada continua fora do quadro)
  const zFim = E.zBorda + n * b + 10;
  const prims: Prim[] = [];
  for (let i = 1; i <= n; i++) {
    const z0 = E.zBorda + (i - 1) * b;
    prims.push(caixa([0, (i - 0.5) * h, (z0 + zFim) / 2], [larg / 2, h / 2, (zFim - z0) / 2], 'obj', -1));
  }
  const zIni = E.zBorda - E.corrimaoAntes;
  // o corrimão é reto na horizontal antes do primeiro degrau e acompanha a escada depois dele
  const corr = (z: number): V3 => [E.xCorrimao, alturaDoCorrimao(E, Math.max(E.zBorda, z)), z];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'escada',
    // a escada fica atrás do corpo na pintura: os pés pisam no degrau e o corrimão fica do lado de lá (por profundidade,
    // o montante perto da quina passava por cima da canela)
    cenario: true,
    fixa: E,
    desenhar(C, M, o) {
      const P = doTema(PEDRA, o.tema);
      // cada degrau é um bloco que vai do espelho dele até o fim: juntos, desenham o perfil da escada
      for (let i = 1; i <= n; i++) {
        const z0 = E.zBorda + (i - 1) * b;
        C.prisma(
          [
            [-larg / 2, (i - 1) * h],
            [larg / 2, (i - 1) * h],
            [larg / 2, i * h],
            [-larg / 2, i * h],
          ],
          [0, 0, z0],
          X,
          Y,
          [0, 0, zFim - z0],
          P,
        );
      }
      // os montantes do corrimão: um em cada degrau, perto da quina, do piso até o corrimão
      for (let i = 1; i <= n; i++) {
        const z = E.zBorda + (i - 1) * b + 4;
        C.tubo([E.xCorrimao, i * h, z], [E.xCorrimao, alturaDoCorrimao(E, z) - rc, z], ml, ml, M.metal, { up: [0, 0, 1] });
      }
      // o corrimão: o trecho reto antes do primeiro degrau e o inclinado, que segue a escada
      if (zIni < E.zBorda) C.cilindro(corr(zIni), corr(E.zBorda), rc, M.cromo, { lados: 12 });
      C.cilindro(corr(E.zBorda), corr(zFim), rc, M.cromo, { lados: 12 });
      if (o.comSombra) C.sombra(0, (E.zBorda + zFim) / 2, larg / 2 + 3, (zFim - E.zBorda) / 2 + 4, 0.16);
    },
  };
  return { prims, peca };
}

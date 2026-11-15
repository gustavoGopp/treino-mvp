// As panturrilhas no step da academia (numa perna só e com as duas): o que as duas têm em comum. A bola do pé (ou dos
// dois pés) na beirada de trás do step, o calcanhar no ar; um halter na mão direita, pendurado ao lado do corpo, e a
// mão esquerda na coluna da estação, só para equilibrar (como no búlgaro: a coluna é cenário). Numa perna só, a
// esquerda fica dobrada atrás, sem apoiar. O movimento é o de ./elevar-o-calcanhar.ts. Cada variação traz a sua ficha.
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { chao, halter, torre } from '../pecas';
import type { Peca, Torre } from '../pecas';
import { step } from '../pecas-de-cena/degrau';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dirRef, mix, norm } from '../vec';
import type { V3 } from '../vec';
import { elevarOCalcanhar } from './elevar-o-calcanhar';

const deg = 180 / Math.PI,
  rad = Math.PI / 180;

export function criarPanturrilhaNoStep(fichaJson: unknown, pernas: 'uma' | 'duas'): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const zBorda = 0;
  /** A coluna da estação, ao lado da mão esquerda, virada para a pessoa (como a do búlgaro). */
  const coluna = (): Torre => ({ base: [f('apoio.maoAoLado') + obj('torre', 'prof') * 0.08, 0, f('apoio.maoAFrenteDaBola') + f('bola.daBeirada')], frente: [-1, 0, 0], alturaDaPolia: obj('torre', 'poliaMax') });

  /** A perna esquerda dobrada atrás, sem apoiar: a coxa quase na vertical e a canela para trás. */
  const pernaLivre = (t: Tronco): PosePerna => {
    // a coxa `livre.coxa` graus à frente da vertical; a canela dobra `livre.joelho` graus para trás; o pé solto aponta
    // `livre.tornozelo` graus para baixo da posição neutra
    const th = f('livre.coxa') * rad,
      kn = f('livre.joelho') * rad,
      pf = f('livre.tornozelo') * rad;
    const coxa: V3 = [0, -Math.cos(th), Math.sin(th)],
      cn: V3 = [0, -Math.cos(th - kn), Math.sin(th - kn)];
    const frente: V3 = [0, cn[2], -cn[1]];
    const dedos: V3 = [0, frente[1] * Math.cos(pf) + cn[1] * Math.sin(pf), frente[2] * Math.cos(pf) + cn[2] * Math.sin(pf)];
    return { coxa: dirRef(t.pelve, coxa), canela: dirRef(t.pelve, cn), peDir: dirRef(t.pelve, dedos), polo: dirRef(t.pelve, [0, Math.sin(th), Math.cos(th)]) };
  };

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const dB = corpo.m('pe.calcanharABola');
    const giro = (h: number) => Math.asin(h / dB) * deg;
    const apoioY = obj('step', 'altura');
    const bolaZ = zBorda + f('bola.daBeirada');
    const embaixo = erro === 'curta' ? f('erro.curta.calcanhar') : -f('calcanhar.embaixo');
    const calc = mix(giro(embaixo), giro(f('calcanhar.topo')), u);
    // no erro do joelho, ele dobra embaixo e estica na subida, dando impulso
    const joelho = erro === 'joelho' ? mix(f('erro.joelho.flexao'), f('joelho'), u) : f('joelho');
    const braco = (k: Lado): PoseBraco => {
      const s = sinal(k);
      if (k === 'L') return { pegada: [s * f('apoio.maoAoLado'), f('apoio.maoAltura'), bolaZ + f('apoio.maoAFrenteDaBola')], polo: [s * 0.8, 0, -0.5], mao: { polegar: [0, 1, 0], forma: 'pegada', diam: 5.5 } };
      // o braço do halter pende ao lado do corpo, um pouco afastado para o halter não bater na coxa
      const fora = f('bracos.paraFora') * rad;
      return { umero: norm([s * Math.sin(fora), -Math.cos(fora), 0]), antebraco: norm([s * Math.sin(fora), -Math.cos(fora), 0.03]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'pegada', diam: obj('halter', 'caboDiam') } };
    };
    const r = elevarOCalcanhar(corpo, {
      apoioY,
      bolaZ,
      pesMeiaDistancia: f('pes.meiaDistancia'),
      joelho,
      calc,
      pernaL: pernas === 'uma' ? pernaLivre : null,
      umaPerna: pernas === 'uma' ? 1 : 0,
      bracos: (e) => ({ R: braco('R'), L: braco('L'), cargas: [{ massa: f('carga'), pos: e.lado.R.pegada }] }),
    });
    const e = r.e;
    const centro = e.lado.R.pegada,
      eixo: V3 = [0, 0, 1];
    const S = step(zBorda, f('step.x'));
    const t = coluna();
    const pecas: Peca[] = [S.peca, { t: 'halter', centro, eixo }, { t: 'torre', torre: t, subida: 0, cenario: true }];
    return {
      esq: e,
      prims: [chao(-90, 90, -70, 90), ...S.prims, ...halter(centro, eixo, 0.4), ...torre(t, 0)],
      pecas,
      fios: [],
      cargas: r.cargas,
      marcas: {
        apoioDosPes: [0, apoioY, bolaZ],
        calcanharEmCima: [0, apoioY + f('calcanhar.topo'), 0],
        calcanharEmbaixo: [0, apoioY - f('calcanhar.embaixo'), 0],
        maoNoApoioL: e.lado.L.pegada,
        halter: centro,
      },
    };
  }
  return { ficha: F, quadro };
}

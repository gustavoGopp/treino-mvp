// Panturrilha em pé no chão, no motor novo. Os números vêm da ficha (../dados/movimentos/panturrilha-chao.json); o
// movimento é o de ./elevar-o-calcanhar.ts. Em pé, de frente para a parede, as palmas nela só para equilibrar. Como
// pede a ficha da técnica desde 12/11/2026 (seção "Uma perna de cada vez"): sobe com as duas pernas, segura no topo e
// tira um pé do chão, desce em 3 s numa perna só e volta o outro pé para subir de novo.
// O parâmetro do movimento vai de 0 a 4: 0 a 1, a subida com as duas; 1 a 2, o pé esquerdo sai do chão e o peso vai
// para o direito; 2 a 3, a descida numa perna só; 3 a 4, o pé esquerdo volta ao chão (4 é a mesma pose de 0).
import ficha from '../dados/movimentos/panturrilha-chao.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { paredeEmFrente } from '../pecas-de-cena/degrau';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import type { V3 } from '../vec';
import { elevarOCalcanhar, peApoiado } from './elevar-o-calcanhar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const deg = 180 / Math.PI;

/** O giro do pé na bola que leva o calcanhar `h` cm acima do apoio. */
const giroPara = (corpo: Corpo, h: number) => Math.asin(h / corpo.m('pe.calcanharABola')) * deg;

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const m = (id: string) => corpo.m(id);
  const bolaZ = m('pe.calcanharABola') - m('pe.calcanharAoTornozelo');
  const pes = { apoioY: 0, bolaZ, pesMeiaDistancia: f('pes.meiaDistancia') };
  const topo = giroPara(corpo, f('calcanhar.topo') * (erro === 'curta' ? f('erro.curta.fracao') : 1));
  const flexErro = erro === 'joelho' ? f('erro.joelho.flexao') : f('joelho');
  // em que trecho do ciclo: w é quanto andou dentro dele
  const trecho = u <= 1 ? 0 : u <= 2 ? 1 : u <= 3 ? 2 : 3,
    w = Math.max(0, Math.min(1, u - trecho));
  const calc = trecho === 0 ? topo * w : trecho === 1 ? topo : trecho === 2 ? topo * (1 - w) : 0;
  // no erro dos joelhos, eles ficam dobrados embaixo e esticam na subida (e dobram de novo na descida)
  const joelho = trecho === 0 ? mix(flexErro, f('joelho'), w) : trecho === 1 ? f('joelho') : trecho === 2 ? mix(f('joelho'), flexErro, w) : flexErro;
  // o pé esquerdo: no chão (trecho 0), saindo (1), fora do chão acompanhando a altura do corpo (2) e voltando (3)
  const fora = trecho === 0 ? 0 : trecho === 1 ? w : trecho === 2 ? 1 : 1 - w;
  const pernaL =
    fora > 0
      ? (): PosePerna => {
          const pl = peApoiado(1, pes, mix(trecho === 3 ? 0 : topo, topo, trecho === 3 ? 1 - w : 1));
          const b = pl.pe!.bola;
          const bola: V3 = [b[0], f('livre.sobe') * fora, b[2] - f('livre.atras') * fora];
          return { pe: { ...pl.pe!, bola }, polo: [0.05, 0, 1] };
        }
      : null;
  const zParede = bolaZ + f('parede.aFrenteDaBola');
  const maoNaParede = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // a palma espalmada na parede, os dedos para cima: o punho fica abaixo do centro da palma e afastado da parede
    return {
      punho: [s * f('maos.meiaDistancia'), f('maos.altura') - m('mao.palma') * 0.45, zParede - m('raio.punho') * 0.85],
      polo: [s * 0.7, -1, -0.3],
      mao: { polegar: [-s, 0.25, 0], dedos: [s * 0.1, 1, 0], forma: 'aberta' },
    };
  };
  const r = elevarOCalcanhar(corpo, {
    ...pes,
    joelho,
    calc,
    pernaL,
    umaPerna: fora,
    bracos: () => ({ R: maoNaParede('R'), L: maoNaParede('L'), cargas: [] }),
  });
  const e = r.e;
  return {
    esq: e,
    prims: [chao(-70, 70, -60, 80)],
    pecas: [paredeEmFrente(zParede)],
    fios: [],
    cargas: r.cargas,
    marcas: {
      apoioDosPes: [0, 0, bolaZ],
      calcanharEmCima: [0, f('calcanhar.topo'), 0],
      maoNoApoioR: e.lado.R.punho,
      maoNoApoioL: e.lado.L.punho,
    },
  };
}

export const panturrilhaChao: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // panturrilha (gastrocnêmio e sóleo): é o que a biblioteca conta
  papeis: { panturrilha: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, cabeça: (q) => q.esq.cabeca.o },
};

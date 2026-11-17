// Panturrilha no degrau da escada, no motor novo. Os números vêm da ficha (../dados/movimentos/panturrilha-degrau.json);
// o movimento é o de ./elevar-o-calcanhar.ts. As duas pernas, a bola dos pés na beirada do primeiro degrau, os
// calcanhares no ar; a mão esquerda no corrimão, só para equilibrar, e a direita solta ao lado do corpo. Embaixo, pausa
// com o calcanhar bem abaixo do degrau; sobe na ponta dos pés e desce devagar.
import ficha from '../dados/movimentos/panturrilha-degrau.json';
import { sinal } from '../esqueleto';
import type { Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { alturaDoCorrimao, escada } from '../pecas-de-cena/degrau';
import type { Escada } from '../pecas-de-cena/degrau';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix, norm } from '../vec';
import type { V3 } from '../vec';
import { elevarOCalcanhar } from './elevar-o-calcanhar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const deg = 180 / Math.PI;
const rad = Math.PI / 180;

/** A escada com a quina do primeiro degrau em z = 0 e o corrimão do lado esquerdo da pessoa. */
const ESCADA: Escada = { zBorda: 0, xCorrimao: f('corrimao.aoLado'), corrimaoAntes: 0 };

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const dB = corpo.m('pe.calcanharABola');
  const giro = (h: number) => Math.asin(h / dB) * deg;
  const apoioY = obj('escada', 'degrauAltura');
  const bolaZ = ESCADA.zBorda + f('bola.daBeirada');
  const embaixo = erro === 'curta' ? f('erro.curta.calcanhar') : -f('calcanhar.embaixo');
  const calc = mix(giro(embaixo), giro(f('calcanhar.topo')), u);
  const puxa = erro === 'puxar';
  const zMao = bolaZ + f('corrimao.aFrenteDaBola');
  const maoNoCorrimao: V3 = [ESCADA.xCorrimao, alturaDoCorrimao(ESCADA, zMao), zMao];
  const corrimao = norm([0, obj('escada', 'degrauAltura'), obj('escada', 'degrauPiso')]);
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // a mão esquerda segura o corrimão, parada; a direita pende ao lado do corpo, solta
    if (k === 'L') return { pegada: maoNoCorrimao, polo: [s * 0.4, -1, -0.3], mao: { polegar: corrimao, forma: 'pegada', diam: obj('escada', 'corrimaoDiam') } };
    const fora = f('bracoLivre.paraFora') * rad;
    return { umero: [s * Math.sin(fora), -Math.cos(fora), 0], antebraco: norm([s * Math.sin(fora), -Math.cos(fora), 0.06]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1], forma: 'relaxada' } };
  };
  const r = elevarOCalcanhar(corpo, {
    apoioY,
    bolaZ,
    pesMeiaDistancia: f('pes.meiaDistancia'),
    joelho: f('joelho'),
    calc,
    pernaL: null,
    umaPerna: 0,
    // no erro "puxar com a mão", o corpo pende para trás embaixo e é puxado para a frente na subida
    // (o corpo inteiro inclina em linha, como uma prancha pendurada no braço, e o cotovelo dobra)
    acompanha: puxa ? 1 : 0,
    tronco: puxa ? mix(f('erro.puxar.troncoEmbaixo'), f('erro.puxar.troncoEmCima'), u) : 0,
    cmAFrente: puxa ? mix(-0.6, 1, u) * f('erro.puxar.cm') : 0,
    bracos: () => ({ R: braco('R'), L: braco('L'), cargas: [] }),
  });
  const E = escada(ESCADA);
  return {
    esq: r.e,
    prims: [chao(-70, 70, -70, 110), ...E.prims],
    pecas: [E.peca],
    fios: [],
    cargas: r.cargas,
    marcas: {
      apoioDosPes: [0, apoioY, bolaZ],
      calcanharEmCima: [0, apoioY + f('calcanhar.topo'), 0],
      calcanharEmbaixo: [0, apoioY - f('calcanhar.embaixo'), 0],
      maoNoApoioL: r.e.lado.L.pegada,
    },
  };
}

export const panturrilhaDegrau: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quinaTras'],
  quadro,
  // panturrilha (gastrocnêmio e sóleo), sem secundário: é o que a biblioteca conta
  papeis: { panturrilha: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, cabeça: (q) => q.esq.cabeca.o },
};

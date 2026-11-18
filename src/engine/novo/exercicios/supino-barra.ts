// Supino reto com barra, no motor novo. Os números vêm da ficha (../dados/movimentos/supino-barra.json). O corpo deita
// no banco reto como no supino reto com halteres aprovado (./supino-reto.ts): a cabeça perto da ponta, as escápulas
// juntas e para baixo, os pés firmes no chão. O que muda aqui:
//  - as duas mãos seguram a mesma barra, rígida: ela anda inteira, de um ponto em cima a um ponto no peito, ambos presos
//    ao tórax. Em cima, a barra fica sobre os ombros, na altura em que os cotovelos dobram só o que a ficha pede; embaixo,
//    ela encosta na pele do meio do peito (a folga sai da superfície do Boneco, uma vez por corpo). O braço vai para o
//    lado a ~30–60° do tronco (o cotovelo aponta para lá) e a mão fica na barra;
//  - o banco fica dentro do suporte: os ganchos acima dos olhos, na altura que se alcança com os cotovelos quase
//    estendidos, e as travas logo abaixo da altura do peito.
import ficha from '../dados/movimentos/supino-barra.json';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { bancoReto, chao } from '../pecas';
import type { Peca } from '../pecas';
import { barraLonga, massaDaBarra } from '../pecas-de-cena/barra-longa';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { bercoAFrente, furoAbaixo, suporte } from '../pecas-de-cena/suporte';
import type { Suporte } from '../pecas-de-cena/suporte';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, noRef, paraRef } from '../vec';
import type { V3 } from '../vec';
import { folgaDaBarra, primeiroToque, raioDaBarra } from './barra-nas-costas';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const ANILHAS: IdAnilha[] = ['anilha10'];
if (obj('anilha10', 'massa') !== f('carga.anilhas')) throw new Error('supino-barra: a anilha da ficha não é a da tabela');
const massa = () => massaDaBarra(ANILHAS);

/** O corpo deitado (a pelve, o tronco e a cabeça), como no supino reto aprovado; no erro, o quadril sobe `sobe` cm. */
function deitado(corpo: Corpo, sobe: number): Tronco {
  const alt = obj('bancoReto', 'altura');
  const pelve: V3 = [0, alt + corpo.m('prof.nadega') * 0.47, 24];
  const pose = (frente: number, y: number) => resolverTronco(corpo, { pelve: [pelve[0], y, pelve[2]], frente, lombar: -4, cervical: 6, cabeca: 4 });
  if (!sobe) return pose(-88, pelve[1]);
  // as costas de cima ficam no banco: a bacia sobe e o tronco gira até a base do pescoço voltar à altura do certo
  const c7 = pose(-88, pelve[1]).torax.o[1];
  const frente = resolver1((fr) => pose(fr, pelve[1] + sobe).torax.o[1] - c7, -120, -88, 30);
  return pose(frente, pelve[1] + sobe);
}
function pernas(corpo: Corpo): Record<Lado, PosePerna> {
  const w = f('pes.meiaDistancia');
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, 24 + corpo.m('coxa.comp') + 9], dir: [sinal(k) * 0.2, 0, 1] }, polo: [sinal(k) * 0.35, 1, 0.4] });
  return { R: perna('R'), L: perna('L') };
}
/** O corpo com as mãos na barra de centro `c` (no mundo); o cotovelo aponta `a` graus para fora do tronco. */
function comAsMaos(t: Tronco, corpo: Corpo, c: V3, a: number): Esq {
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return {
      pegada: add(c, [s * f('pegada.meia'), 0, 0]),
      polo: [s * Math.sin(a * rad), -0.2, Math.cos(a * rad)],
      mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: obj('barraLonga', 'pegadaDiam') },
      prot: -f('escapula.retracao'),
      elev: -f('escapula.depressao'),
    };
  };
  return resolverMembros(t, { R: braco('R'), L: braco('L') }, pernas(corpo));
}

/**
 * A barra no referencial do tórax, em cima e no peito (uma vez por corpo). No peito: na linha do meio do peito,
 * encostada na pele. Em cima: sobre o centro dos ombros, na altura em que o cotovelo dobra `cotovelo.cima` graus.
 */
function caminho(corpo: Corpo): { topo: V3; peito: V3 } {
  return calibragem(corpo, 'supino-barra:caminho', () => {
    const t = deitado(corpo, 0);
    const T = t.torax;
    const y = -f('peito.abaixoDaC7');
    let zp = 20;
    for (let i = 0; i < 2; i++) {
      const e = comAsMaos(t, corpo, noRef(T, [0, y, zp]), f('cotovelos.doTronco'));
      zp = primeiroToque((z) => folgaDaBarra(e, noRef(T, [0, y, z]), T.x, ['tronco'], f('pegada.meia') - 4).folga, 40, 2);
    }
    // em cima: sobre os ombros (o ombro anda com o braço: três passadas)
    let topo: V3 = [0, -6, 60];
    for (let i = 0; i < 3; i++) {
      const e0 = comAsMaos(t, corpo, noRef(T, topo), f('cotovelos.doTronco'));
      const ombro = paraRef(T, e0.lado.L.ombro);
      const yo = ombro[1];
      const z = resolver1((zz) => {
        const e = comAsMaos(t, corpo, noRef(T, [0, yo, zz]), f('cotovelos.doTronco'));
        return e.lado.R.ang.cotovelo - f('cotovelo.cima');
      }, 30, 80, 30);
      topo = [0, yo, z];
    }
    return { topo, peito: [0, y, zp] };
  });
}
const olhos = (e: Esq): V3 => noRef(e.cabeca, [0, (e.corpo.m('cabeca.orelhaAltura') / 2) * 0.25, 0.6 + (e.corpo.m('cabeca.comp') / 2) * 0.9]);

/** O suporte: os ganchos acima dos olhos, um pouco abaixo da barra em cima; as travas logo abaixo da barra no peito. */
function oSuporte(corpo: Corpo): Suporte {
  return calibragem(corpo, 'supino-barra:suporte', () => {
    const t = deitado(corpo, 0);
    const c = caminho(corpo);
    const e = comAsMaos(t, corpo, noRef(t.torax, c.topo), f('cotovelos.doTronco'));
    const yTopo = noRef(t.torax, c.topo)[1],
      yPeito = noRef(t.torax, c.peito)[1];
    return {
      base: [0, 0, olhos(e)[2] - bercoAFrente()] as V3,
      paraAPessoa: [0, 0, 1] as V3,
      gancho: furoAbaixo(yTopo - raioDaBarra() - f('ganchos.abaixo')),
      pino: furoAbaixo(yPeito - raioDaBarra() - f('pinos.folga')),
    };
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const m = (id: string) => corpo.m(id);
  const sobe = erro === 'e3' ? f('erro.quadril.sobe') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0;
  const t = deitado(corpo, sobe);
  const c = caminho(corpo);
  const centro = noRef(t.torax, [0, mix(c.topo[1], c.peito[1], u), mix(c.topo[2], c.peito[2], u)]);
  const a = erro === 'e2' ? mix(f('cotovelos.doTronco'), f('erro.cot.doTronco'), Math.min(1, u * 1.5)) : f('cotovelos.doTronco');
  const e = comAsMaos(t, corpo, centro, a);
  // o banco é posto pela cabeça, como no supino reto aprovado: o topo dela a `cabeca.folgaNoBanco` cm da ponta
  const t0 = deitado(corpo, 0);
  const zTopoDaCabeca = noRef(t0.cabeca, [0, m('cabeca.tragionAoTopo'), 0])[2];
  const zBanco = zTopoDaCabeca - f('cabeca.folgaNoBanco') + obj('bancoReto', 'comp') / 2;
  const S = oSuporte(corpo);
  const su = suporte(S);
  const barra = barraLonga({ centro, eixo: [1, 0, 0], anilhas: ANILHAS }, { pontasAtras: 200 });
  const pecas: Peca[] = [su.estrutura, { t: 'bancoReto', x0: 0, z0: zBanco }, su.ganchos, barra.peca];
  return {
    esq: e,
    prims: [chao(-90, 90, -110, 130), ...bancoReto(0, zBanco), ...su.prims, ...barra.prims],
    pecas,
    fios: [],
    cargas: [{ massa: massa(), pos: centro }],
    marcas: {
      barra: centro,
      gancho: [0, S.gancho, S.base[2] + bercoAFrente()],
      pino: [0, S.pino, S.base[2]],
      olhos: olhos(e),
      cabecaDoBanco: [0, obj('bancoReto', 'altura'), zBanco - obj('bancoReto', 'comp') / 2],
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const supinoBarra: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // a biblioteca: peito (principal); frente do ombro e tríceps (secundários), como o supino reto aprovado
  papeis: { peitoral: 'p', deltAnt: 's', triceps: 's' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

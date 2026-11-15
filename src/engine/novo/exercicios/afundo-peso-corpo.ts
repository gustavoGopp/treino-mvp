// Afundo estático com o peso do corpo, no motor novo. Os números vêm da ficha
// (../dados/movimentos/afundo-peso-corpo.json). Passo largo, o pé da frente inteiro no chão e o de trás na ponta; as
// mãos na cintura; o quadril desce reto até o joelho de trás ficar a poucos centímetros do chão.
import ficha from '../dados/movimentos/afundo-peso-corpo.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { dirRef, mix, noRef } from '../vec';
import { afundar } from './afundar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const FRENTE: Lado = 'R',
  TRAS: Lado = 'L';
const CACHE = new WeakMap<Corpo, { cima: number; baixo: number }>();

function pose(corpo: Corpo, quadrilY: number, o: { tronco?: number; valgo?: number } = {}): Esq {
  const m = (id: string) => corpo.m(id);
  return afundar(corpo, {
    frente: FRENTE,
    quadrilY,
    quadrilZ: 0,
    tronco: o.tronco ?? f('tronco'),
    pesMeiaDistancia: f('pes.meiaDistancia'),
    tornozeloDaFrente: f('peDaFrente.aFrenteDoQuadril'),
    bolaDeTras: -f('peDeTras.atrasDoQuadril'),
    apoioDeTras: 0,
    calcanharDeTras: f('peDeTras.calcanhar'),
    valgo: o.valgo ?? 0,
    bracos(t) {
      // mãos na cintura, cotovelos para fora (ficam livres para apoiar numa parede, diz a ficha)
      const braco = (k: Lado): PoseBraco => {
        const s = sinal(k);
        return { pegada: noRef(t.pelve, [s * (m('largura.quadril') / 2 + 1.5), f('maos.naCintura.acima'), 1]), polo: dirRef(t.pelve, [s, -0.2, -0.5]), mao: { polegar: dirRef(t.pelve, [0, 0.6, -0.8]), forma: 'relaxada' } };
      };
      return { R: braco('R'), L: braco('L') };
    },
  });
}
/** As alturas do quadril em cima (o joelho da frente quase estendido) e embaixo (o joelho de trás perto do chão). */
function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const raioDoJoelho = corpo.secoes.coxa![corpo.secoes.coxa!.length - 1]!.b;
  const baixo = resolver1((y) => pose(corpo, y).lado[TRAS].joelho[1] - raioDoJoelho - f('joelhoDeTras.aoChao'), 35, 75);
  const cima = resolver1((y) => f('joelho.cima') - pose(corpo, y).lado[FRENTE].ang.joelho, 100, baixo);
  c = { cima, baixo };
  CACHE.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const fundo = erro === 'raso' ? f('erro.raso.fracao') : 1;
  const e = pose(corpo, mix(c.cima, c.baixo, u * fundo), {
    tronco: erro === 'tronco' ? mix(f('tronco'), f('erro.tronco'), u) : undefined,
    valgo: erro === 'valgo' ? f('erro.valgo.joelho') * Math.sin((Math.PI / 2) * Math.min(1, u * 1.25)) : 0,
  });
  return { esq: e, prims: [chao(-70, 70, -90, 90)], pecas: [], fios: [], cargas: [], marcas: {} };
}

export const afundoPesoCorpo: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // quadríceps da perna da frente (principal); glúteo e adutores da perna da frente e quadríceps da de trás
  // (secundários), como o afundo aprovado (revisão de anatomia de 02/11/2026)
  papeis: { 'quadriceps:R': 'p', 'gluteo:R': 's', 'adutores:R': 's', 'quadriceps:L': 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho },
};

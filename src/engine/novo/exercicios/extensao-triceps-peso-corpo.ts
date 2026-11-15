// Extensão de tríceps com o peso do corpo, no motor novo. Técnica: docs/pesquisa/animacoes/extensao-triceps-peso-corpo.md.
// As mãos ficam espalmadas no tampo de uma bancada fixa (altura da cintura), junto da beirada, e não saem do lugar; os pés ficam para trás, na
// ponta, e o corpo reto gira em torno dos tornozelos. Só os cotovelos dobram, apontando para a frente, até a testa
// chegar perto da bancada. A inclinação do corpo em cima sai do cotovelo quase estendido pedido pela ficha; embaixo,
// de quanto a testa chega perto da bancada.
import ficha from '../dados/movimentos/extensao-triceps-peso-corpo.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { bancada } from '../pecas-de-cena/bancada';
import { chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { mix } from '../vec';
import type { V3 } from '../vec';
import { maoEspalmada, pesNaPonta, quadrilAoTornozelo } from './apoio-no-chao';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const CACHE = new WeakMap<Corpo, { cima: number; baixo: number; falha: number }>();
const zBeirada = f('pes.atrasDaBeirada');
const yTampo = obj('bancada', 'altura');

/** O corpo inclinado `theta` graus da vertical (do tornozelo à cabeça), com o quadril dobrado `dobra` graus. */
function pose(corpo: Corpo, theta: number, o: { dobra?: number; abre?: number } = {}): Esq {
  const { pernas, tornozelo } = pesNaPonta(corpo, f('pes.meiaDistancia'), f('calcanhar.sobe'), [0, -0.3, 1]);
  const dobra = o.dobra ?? 0;
  // no erro, as pernas ficam um pouco mais em pé e o tronco mais deitado: o quadril dobra no meio
  const tl = (theta - dobra * 0.5) * rad;
  const d = quadrilAoTornozelo(corpo, f('joelho'));
  const pelve: V3 = [0, tornozelo[1] + d * Math.cos(tl), tornozelo[2] + d * Math.sin(tl)];
  const t = resolverTronco(corpo, { pelve, frente: theta + dobra * 0.5, cervical: f('pescoco.flexao'), cabeca: 0 });
  const x = corpo.m('ombro.meiaDistancia') + f('maos.alemDoOmbro');
  // o punho fica `maos.dentroDaBeirada` cm para dentro da beirada; a palma e os dedos deitam no tampo
  const zPalma = zBeirada + f('maos.dentroDaBeirada') + corpo.m('mao.palma') * 0.45;
  const abre = o.abre ?? 0;
  // os cotovelos apontam para a frente, na linha do corpo (para além da cabeça); no erro, para os lados
  const th = theta * rad;
  const braco = (k: Lado): PoseBraco => maoEspalmada(corpo, k, x, yTampo, zPalma, [sinal(k) * abre, Math.cos(th) * (1 - abre) - 0.4 * abre, Math.sin(th) * (1 - abre)]);
  return resolverMembros(t, { R: braco('R'), L: braco('L') }, pernas);
}

/**
 * A menor distância (de lado) da cabeça à bancada, na superfície do Boneco (cm): acima do tampo, a altura sobre ele;
 * antes da beirada, a distância à quina; abaixo do tampo, a distância à frente da bancada.
 */
export function cabecaABancada(e: Esq): number {
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'cabeca') continue;
    const d = p[2] >= zBeirada ? p[1] - yTampo : p[1] >= yTampo ? Math.hypot(p[1] - yTampo, zBeirada - p[2]) : zBeirada - p[2];
    min = Math.min(min, d);
  }
  return min;
}

function calibrar(corpo: Corpo) {
  let c = CACHE.get(corpo);
  if (c) return c;
  const cima = resolver1((t) => pose(corpo, t).lado.R.ang.cotovelo - f('cotovelo.cima'), 10, 70, 30);
  const baixo = resolver1((t) => f('testa.aoApoio') - cabecaABancada(pose(corpo, t)), cima, 75, 30);
  const falha = resolver1((t) => f('erro.falha.testa') - cabecaABancada(pose(corpo, t)), baixo, 80, 30);
  c = { cima, baixo, falha };
  CACHE.set(corpo, c);
  return c;
}

const PECA = bancada(zBeirada);
function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const theta = mix(c.cima, erro === 'falha' ? c.falha : c.baixo, u);
  const e = pose(corpo, theta, { dobra: erro === 'quadril' ? f('erro.quadril.dobra') * u : 0, abre: erro === 'cotovelos' ? f('erro.cotovelos.abre') * Math.min(1, u * 1.6) : 0 });
  return { esq: e, prims: [chao(-80, 80, -60, 200), ...PECA.prims], pecas: [PECA.peca], fios: [], cargas: [], marcas: { quina: [0, yTampo, zBeirada] } };
}

export const extensaoTricepsPesoCorpo: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // a biblioteca: tríceps principal, sem secundário
  papeis: { triceps: 'p' },
  trajetorias: { cabeça: (q) => q.esq.cabeca.o, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

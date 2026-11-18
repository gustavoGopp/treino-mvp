// Leg press 45°, no motor novo. Os números vêm da ficha (../dados/movimentos/leg-press.json); a máquina, de
// ../pecas-de-cena/leg-press.ts; o corpo no assento, de ./leg-press-base.ts.
//
// A bacia fica parada no assento, as costas no encosto, as mãos nos pegadores. Os pés ficam presos à chapa, no meio
// dela; em cada quadro, o carro anda na guia até o joelho ficar no ângulo da ficha. A trava fica solta (aberta) na
// série inteira e os batentes de baixo ficam um pouco abaixo do ponto mais baixo do carro.
//
// Erros: no "quadril descola", a descida vai além e a bacia gira para trás com a lombar arredondando (as escápulas
// ficam no encosto, o glúteo sai do assento); no "joelhos para dentro", os joelhos giram para dentro em volta da linha
// do quadril ao tornozelo, mais no meio do caminho.
import ficha from '../dados/movimentos/leg-press.json';
import { sinal } from '../esqueleto';
import type { Lado, PosePerna } from '../esqueleto';
import { resolverMembros } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { centroDaChapa, geometriaDoLegPress, legPress as maquina, noQuadroDoLegPress } from '../pecas-de-cena/leg-press';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { calibragem } from '../calibragens';
import { add, girar, mix, mul, norm, sub } from '../vec';
import { carroParaOJoelho, dirDoPe, maosNosPegadores, peNaChapa, troncoNoLegPress } from './leg-press-base';
import type { OpcoesDoAssento, PeNaChapa } from './leg-press-base';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const ANILHAS: IdAnilha[] = [`anilha${f('anilhas')}` as IdAnilha];
const ASSENTO: OpcoesDoAssento = { lombar: f('lombar'), cervical: f('cervical'), cabeca: f('cabeca'), amassa: f('amassa') };
const PES: PeNaChapa = { meia: f('pes.meia'), paraFora: f('pes.paraFora'), bolaAo: f('pes.bolaAo'), calc: 0 };

/** O carro com o joelho no ângulo dado e a bacia girada `rola` graus (o erro). */
function montar(corpo: Corpo, joelho: number, rola: number, dentro: number) {
  const t = troncoNoLegPress(corpo, ASSENTO, rola);
  const quadrilR = add(t.pelve.o, mul(t.pelve.x, -corpo.m('quadril.meiaDistancia')));
  const s = carroParaOJoelho(corpo, quadrilR, PES, joelho);
  const perna = (k: Lado): PosePerna => {
    // o joelho aponta para a ponta do pé; no erro, gira para dentro em volta da linha do quadril ao tornozelo
    const dir = dirDoPe(k, PES.paraFora);
    const polo = dentro ? girar(dir, norm(sub(centroDaChapa(s), t.pelve.o)), sinal(k) * dentro) : dir;
    return peNaChapa(k, PES, s, polo);
  };
  return { e: resolverMembros(t, maosNosPegadores(), { R: perna('R'), L: perna('L') }), s };
}

/** O ponto mais baixo do carro no movimento certo (para pôr os batentes logo abaixo). */
const carroNoFundo = (corpo: Corpo) => calibragem(corpo, 'leg-press:fundo', () => montar(corpo, f('joelho.baixo'), 0, 0).s);

/** O ponto mais alto do carro no exercício (a posição de começo): até onde o quadro precisa mostrar a chapa. */
const carroEmCima = (corpo: Corpo) => calibragem(corpo, 'leg-press:cima', () => montar(corpo, Math.min(f('joelho.cima'), f('erro.travar.joelho')), 0, 0).s);

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const cima = erro === 'travar' ? f('erro.travar.joelho') : f('joelho.cima');
  const baixo = erro === 'pouco' ? f('erro.pouco.joelho') : erro === 'descola' ? f('erro.descola.joelho') : f('joelho.baixo');
  const joelho = mix(cima, baixo, u);
  // a bacia só gira depois que o joelho passa do ângulo certo do fundo
  const rola = erro === 'descola' ? f('erro.descola.rola') * Math.max(0, (joelho - f('joelho.baixo')) / (baixo - f('joelho.baixo'))) ** 1.5 : 0;
  const dentro = erro === 'dentro' ? f('erro.dentro.graus') * Math.sin(Math.PI * u) : 0;
  const r = montar(corpo, joelho, rola, dentro);
  const G = geometriaDoLegPress();
  const batente = carroNoFundo(corpo) - f('batente.abaixo');
  const L = maquina({
    carro: r.s,
    trava: 'aberta',
    batente,
    anilhas: ANILHAS,
    // o lado direito (o de perto, de lado) vai para trás do corpo: o pino, as anilhas e a alavanca cobririam as pernas
    atras: -1,
    noQuadro: noQuadroDoLegPress(carroEmCima(corpo), f('quadro.abaixo'), f('quadro.chapa'), obj('legPress', 'trilhoFim')),
  });
  const chapa = centroDaChapa(r.s);
  return {
    esq: r.e,
    prims: [chao(-90, 90, -80, 160), ...L.prims],
    pecas: L.pecas,
    fios: [],
    // o carro empurra os pés; a bacia apoia no assento: o equilíbrio do corpo em pé não se aplica
    cargas: [],
    marcas: { chapa, normalChapa: G.normalChapa, guia: G.guia, carro: [0, r.s, 0], batente: [0, batente, 0], assento: G.vinco, normalAssento: G.normalAssento, encosto: G.vinco, normalEncosto: G.normalEncosto },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const legPress: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // os da biblioteca: quadríceps (principal); glúteos e adutores (secundários)
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { joelho: (q) => q.esq.lado.R.joelho, chapa: (q) => q.marcas.chapa!, quadril: (q) => q.esq.pelve.o },
};

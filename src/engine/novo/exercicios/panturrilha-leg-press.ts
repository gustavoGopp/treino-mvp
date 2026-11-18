// Panturrilha no leg press, no motor novo. Os números vêm da ficha (../dados/movimentos/panturrilha-leg-press.json); a
// máquina é a do leg press (../pecas-de-cena/leg-press.ts), e o corpo no assento, o de ./leg-press-base.ts.
//
// A bacia fica parada no assento, as costas no encosto, as mãos nos pegadores, os joelhos quase estendidos e parados.
// Só a ponta dos pés fica na borda de baixo da chapa, os calcanhares para fora dela. O pé gira na bola do pé (que fica
// presa na chapa): o calcanhar passa do plano da chapa embaixo (alongado) e sobe acima dele em cima; em cada quadro,
// o carro anda na guia até o joelho ficar no ângulo da ficha (o tornozelo que estica empurra a chapa). A trava fica
// fechada a série inteira: o carro anda acima dos suportes dela.
import ficha from '../dados/movimentos/panturrilha-leg-press.json';
import { resolverMembros } from '../esqueleto';
import type { Lado, PosePerna } from '../esqueleto';
import { calibragem } from '../calibragens';
import { angulosDoLado } from '../conferir-util';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { geometriaDoLegPress, legPress as maquina, naChapa, noQuadroDoLegPress, posicaoDaTrava } from '../pecas-de-cena/leg-press';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, mix, mul } from '../vec';
import { carroParaOJoelho, dirDoPe, maosNosPegadores, peNaChapa, troncoNoLegPress } from './leg-press-base';
import type { OpcoesDoAssento, PeNaChapa } from './leg-press-base';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const ANILHAS: IdAnilha[] = [`anilha${f('anilhas')}` as IdAnilha];
const ASSENTO: OpcoesDoAssento = { lombar: f('lombar'), cervical: f('cervical'), cabeca: f('cabeca'), amassa: f('amassa') };

/** O pé girado `calc` graus na bola do pé (positivo = o calcanhar sobe da chapa). */
function pes(calc: number): PeNaChapa {
  const bolaAo = -obj('legPress', 'plataformaAlt') / 2 + f('bola.daBorda');
  return { meia: f('pes.meia'), paraFora: f('pes.paraFora'), bolaAo, calc };
}

function montar(corpo: Corpo, calc: number, joelho: number) {
  const t = troncoNoLegPress(corpo, ASSENTO);
  const quadrilR = add(t.pelve.o, mul(t.pelve.x, -corpo.m('quadril.meiaDistancia')));
  const P = pes(calc);
  const s = carroParaOJoelho(corpo, quadrilR, P, joelho);
  const perna = (k: Lado): PosePerna => peNaChapa(k, P, s, dirDoPe(k, P.paraFora));
  return { e: resolverMembros(t, maosNosPegadores(), { R: perna('R'), L: perna('L') }), s };
}

/**
 * O giro do pé na chapa (graus) em que o tornozelo dobra `dorsi` graus para cima (negativo = esticado), com o joelho
 * no ângulo da ficha: a canela chega inclinada à chapa, e o giro sai da medida, não do calcanhar. Guardado por corpo.
 */
const giros = (corpo: Corpo) =>
  calibragem(corpo, 'panturrilha-leg-press:giros', () => {
    const giro = (dorsi: number) => resolver1((c) => angulosDoLado(montar(corpo, c, f('joelho')).e, 'R').dorsiflexao - dorsi, -60, 70);
    return { embaixo: giro(f('tornozelo.embaixo')), topo: giro(-f('tornozelo.topo')), curtaEmbaixo: giro(f('erro.curta.embaixo')), curtaTopo: giro(-f('erro.curta.topo')) };
  });

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const G0 = giros(corpo);
  // o pé gira por igual (em graus) da posição alongada à de cima
  const calc = erro === 'curta' ? mix(G0.curtaEmbaixo, G0.curtaTopo, u) : mix(G0.embaixo, G0.topo, u);
  // no erro do joelho, ele dobra embaixo e estica na subida, dando impulso
  const joelho = erro === 'joelho' ? mix(f('erro.joelho.flexao'), f('joelho'), u) : f('joelho');
  const r = montar(corpo, calc, joelho);
  const G = geometriaDoLegPress();
  const L = maquina({
    carro: r.s,
    trava: 'fechada',
    // os batentes de baixo ficam no fim do curso (na panturrilha, a trava é que segura o carro)
    batente: obj('legPress', 'trilhoInicio') + obj('legPress', 'carroComp') / 2 + 4,
    anilhas: ANILHAS,
    atras: -1,
    noQuadro: noQuadroDoLegPress(montar(corpo, G0.topo, f('joelho')).s, f('quadro.abaixo'), f('quadro.chapa'), obj('legPress', 'trilhoFim')),
  });
  return {
    esq: r.e,
    prims: [chao(-90, 90, -80, 160), ...L.prims],
    pecas: L.pecas,
    fios: [],
    cargas: [],
    marcas: {
      chapa: L.chapa,
      normalChapa: G.normalChapa,
      sobeChapa: G.sobeChapa,
      guia: G.guia,
      bordaDaChapa: naChapa(r.s, -obj('legPress', 'plataformaAlt') / 2),
      carro: [0, r.s, 0],
      trava: [0, posicaoDaTrava(), 0],
      tornozeloEmbaixo: [0, f('tornozelo.embaixo'), 0],
      tornozeloEmCima: [0, f('tornozelo.topo'), 0],
      assento: G.vinco,
      normalAssento: G.normalAssento,
      encosto: G.vinco,
      normalEncosto: G.normalEncosto,
    },
    vies: { maoR: 1, maoL: 1 },
  };
}
export const panturrilhaLegPress: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // a panturrilha, sem secundário: é o que a biblioteca conta
  papeis: { panturrilha: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, chapa: (q) => q.marcas.chapa! },
};

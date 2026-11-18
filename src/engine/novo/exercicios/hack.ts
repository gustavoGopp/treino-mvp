// Agachamento no hack, no motor novo. Os números vêm da ficha (../dados/movimentos/hack.json); a máquina, de
// ../pecas-de-cena/hack.ts (Hammer Strength PL-HSQ: o carro corre a 45°).
//
// De costas no encosto do carro, os ombros sob as almofadas, as mãos nos pegadores ao lado delas, os pés parados no
// meio da chapa. O corpo anda com o carro: o tronco não gira (as costas ficam no encosto), e a bacia desce na linha
// da guia; em cada quadro, a posição do carro sai do ângulo do joelho da ficha (a distância do quadril ao tornozelo,
// numa conta de segundo grau). O que este arquivo calibra, uma vez por corpo: a inclinação da bacia em que as
// escápulas e o glúteo encostam juntos no encosto, onde a bacia fica em relação à face do encosto e às almofadas dos
// ombros (medido na superfície do Boneco).
//
// Erros: no "lombar descola", a descida vai além e a bacia gira para trás com a lombar arredondando (os ombros ficam
// nas almofadas, a bacia sai do encosto); no "joelhos para dentro", os joelhos giram para dentro em volta da linha do
// quadril ao tornozelo, mais no meio do caminho.
import ficha from '../dados/movimentos/hack.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { geometriaDoHack, hack as maquina, naFaceDoEncosto, noQuadroDoHack, pegadorDoHack, posicoesDaTrava } from '../pecas-de-cena/hack';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dot, girar, mix, mul, noRef, norm, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const ANILHAS: IdAnilha[] = [`anilha${f('anilhas')}` as IdAnilha];

/** O tronco com a bacia em `pelve`, girada `rola` graus para trás (a lombar dobra o mesmo tanto). */
const pose = (pelve: V3, frente: number, rola = 0): PoseTronco => ({ pelve, frente: frente - rola, lombar: f('lombar') + rola, cervical: f('cervical'), cabeca: f('cabeca') });

/** Pernas e braços de referência para medir as costas (não encostam no encosto). */
function comMembros(t: ReturnType<typeof resolverTronco>): Esq {
  const solto = (k: Lado): PoseBraco => ({ umero: [sinal(k) * 0.4, -0.2, 0.9], antebraco: [0, 0.3, 1], polo: [sinal(k), 0, -1], mao: { polegar: [0, 0, 1] } });
  const perna = (k: Lado): PosePerna => ({ coxa: norm([sinal(k) * 0.1, -0.5, 1]), canela: norm([0, -1, 0.3]), polo: [0, 0, 1] });
  return resolverMembros(t, { R: solto('R'), L: solto('L') }, { R: perna('R'), L: perna('L') });
}

/**
 * A calibração do corpo no carro: a inclinação da bacia (as escápulas e o glúteo encostam juntos no encosto), a
 * distância da bacia à face do encosto (ao longo da normal dele) e a distância, ao longo da guia, da bacia ao alto dos
 * ombros (onde a almofada encosta).
 */
function noCarro(corpo: Corpo): { frente: number; afastada: number; ombro: number } {
  return calibragem(corpo, 'hack:no-carro', () => {
    const G = geometriaDoHack();
    const medir = (frente: number) => {
      const P = pontosDoBoneco(comMembros(resolverTronco(corpo, pose([0, 0, 0], frente)))).filter(({ p }) => Math.abs(p[0]) < obj('hack', 'encostoLarg') / 2 - 3);
      const em = (partes: string[]) => Math.min(...P.filter((x) => partes.includes(x.parte)).map((x) => dot(x.p, G.frente)));
      return { cima: em(['tronco']), baixo: em(['pelve', 'cintura']) };
    };
    const frente = resolver1((fr) => medir(fr).cima - medir(fr).baixo, -75, -15);
    const c = medir(frente);
    // o alto dos ombros, sob cada almofada (fora do pescoço), ao longo da guia
    const meia = obj('hack', 'ombreirasEntre') / 2,
      l = obj('hack', 'ombreiraLarg') / 2;
    const P = pontosDoBoneco(comMembros(resolverTronco(corpo, pose([0, 0, 0], frente))));
    const ombro = Math.max(...P.filter(({ p, parte }) => ['tronco', 'pescoco'].includes(parte) && Math.abs(Math.abs(p[0]) - meia) < l).map(({ p }) => dot(p, G.sobe)));
    return { frente, afastada: -Math.min(c.cima, c.baixo) - f('amassa'), ombro: ombro - f('amassa') };
  });
}

/** A bacia com o carro em `t` (a face de baixo das almofadas dos ombros), sem o erro. */
function bacia(corpo: Corpo, t: number): V3 {
  const C = noCarro(corpo);
  const G = geometriaDoHack();
  return add(naFaceDoEncosto(t - C.ombro), mul(G.frente, C.afastada));
}

/** O tornozelo direito, com o meio do pé no centro da chapa (o mesmo cálculo do esqueleto para o pé apoiado). */
function pe(corpo: Corpo, k: Lado) {
  const G = geometriaDoHack();
  const dir = girar(G.aoChapa, G.normalChapa, sinal(k) * f('pes.paraFora'));
  const n = G.normalChapa;
  const z = norm(sub(dir, mul(n, dot(dir, n))));
  const x = cross(n, z);
  // o meio do pé (entre o calcanhar e a bola) fica no centro da chapa, mais `pes.noMeio`
  const bola = add(add(G.chapa, mul(z, corpo.m('pe.calcanharABola') / 2 + f('pes.noMeio'))), [sinal(k) * f('pes.meia'), 0, 0]);
  const tornozelo = noRef({ o: bola, x, y: n, z }, [0, corpo.m('altura.maleolo'), -(corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo'))]);
  return { bola, dir, tornozelo };
}

/** A posição do carro em que o joelho direito dobra `joelho` graus: a bacia anda na linha da guia. */
function carroParaOJoelho(corpo: Corpo, joelho: number): number {
  const G = geometriaDoHack();
  const th = corpo.m('coxa.comp'),
    sk = corpo.m('perna.comp');
  const d = Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos((joelho * Math.PI) / 180));
  const t0 = resolverTronco(corpo, pose(bacia(corpo, 0), noCarro(corpo).frente));
  const quadril0 = add(t0.pelve.o, mul(t0.pelve.x, -corpo.m('quadril.meiaDistancia')));
  const a0 = sub(quadril0, pe(corpo, 'R').tornozelo);
  const b = dot(a0, G.sobe),
    c = dot(a0, a0) - d * d;
  return -b + Math.sqrt(Math.max(0, b * b - c));
}

function montar(corpo: Corpo, joelho: number, rola: number, dentro: number) {
  const C = noCarro(corpo);
  const t = carroParaOJoelho(corpo, joelho);
  const certo = resolverTronco(corpo, pose(bacia(corpo, t), C.frente));
  // no erro, os ombros ficam nas almofadas: o tórax fica onde estava e a bacia sai do lugar
  const tr = rola ? resolverTronco(corpo, pose(sub(certo.torax.o, resolverTronco(corpo, pose([0, 0, 0], C.frente, rola)).torax.o), C.frente, rola)) : certo;
  const perna = (k: Lado): PosePerna => {
    const P = pe(corpo, k);
    const polo = dentro ? girar(P.dir, norm(sub(certo.pelve.o, P.tornozelo)), -sinal(k) * dentro) : P.dir;
    return { pe: { bola: P.bola, dir: P.dir, normal: geometriaDoHack().normalChapa }, polo };
  };
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return { pegada: pegadorDoHack(t, s).meio, polo: [s, -0.3, 0.2], mao: { polegar: mul(geometriaDoHack().frente, -1), forma: 'pegada', diam: obj('hack', 'pegadorDiam') } };
  };
  return { e: resolverMembros(tr, { R: braco('R'), L: braco('L') }, { R: perna('R'), L: perna('L') }), t };
}
/** O ponto mais alto do carro no movimento certo (a regulagem da trava, logo abaixo dele). */
const carroEmCima = (corpo: Corpo) => calibragem(corpo, 'hack:cima', () => carroParaOJoelho(corpo, f('joelho.cima')));
const carroEmbaixo = (corpo: Corpo) => calibragem(corpo, 'hack:baixo', () => carroParaOJoelho(corpo, Math.max(f('joelho.baixo'), f('erro.lombar.joelho'))));

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const cima = erro === 'travar' ? f('erro.travar.joelho') : f('joelho.cima');
  const baixo = erro === 'pouco' ? f('erro.pouco.joelho') : erro === 'lombar' ? f('erro.lombar.joelho') : f('joelho.baixo');
  const joelho = mix(cima, baixo, u);
  // a bacia só gira depois que o joelho passa do ângulo certo do fundo
  const rola = erro === 'lombar' ? f('erro.lombar.rola') * Math.max(0, (joelho - f('joelho.baixo')) / (baixo - f('joelho.baixo'))) ** 1.5 : 0;
  const dentro = erro === 'dentro' ? f('erro.dentro.graus') * Math.sin(Math.PI * u) : 0;
  const r = montar(corpo, joelho, rola, dentro);
  const G = geometriaDoHack();
  const travaAlta = carroEmCima(corpo) - f('trava.acima');
  const H = maquina({ carro: r.t, trava: 'aberta', anilhas: ANILHAS, atras: -1, noQuadro: noQuadroDoHack(carroEmCima(corpo), carroEmbaixo(corpo)) }, travaAlta);
  return {
    esq: r.e,
    prims: [chao(-90, 90, -170, 60), ...H.prims],
    pecas: H.pecas,
    fios: [],
    // o carro apoia nos ombros e a guia o segura: o equilíbrio do corpo em pé não se aplica
    cargas: [],
    marcas: {
      encosto: naFaceDoEncosto(r.t),
      normalEncosto: G.frente,
      sobe: G.sobe,
      ombreira: naFaceDoEncosto(r.t),
      pegadorR: pegadorDoHack(r.t, -1).meio,
      pegadorL: pegadorDoHack(r.t, 1).meio,
      carro: [0, r.t, 0],
      trava: [0, posicoesDaTrava(travaAlta)[0], 0],
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const hack: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // os da biblioteca: quadríceps (principal); glúteos e adutores (secundários)
  papeis: { quadriceps: 'p', gluteo: 's', adutores: 's' },
  trajetorias: { quadril: (q) => q.esq.pelve.o, joelho: (q) => q.esq.lado.R.joelho, ombro: (q) => q.esq.lado.R.ombro },
};

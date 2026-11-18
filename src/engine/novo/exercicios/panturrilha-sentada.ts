// Panturrilha sentada na máquina, no motor novo. Os números vêm da ficha (../dados/movimentos/panturrilha-sentada.json);
// a máquina, de ../pecas-de-cena/panturrilha-sentada.ts; o pé apoiado e o corpo sentado, da panturrilha sentada com
// halter aprovada (./panturrilha-sentada-halter.ts).
//
// Sentado no assento, o tronco reto e parado; a bola dos pés na borda de trás do apoio, os calcanhares no ar; a almofada
// da alavanca em cima das coxas, perto dos joelhos, e as mãos no pegador na frente dela. O pé gira na bola (o mesmo pé
// apoiado das panturrilhas aprovadas); o quadril fica parado no assento e o joelho sobe e desce com o calcanhar. A
// alavanca gira num eixo na linha do quadril, junto com a coxa, e as anilhas da ponta sobem.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - onde fica a bacia: o glúteo e a coxa apoiam no assento (afundando `assento.amassa`), à distância do apoio dos pés
//    em que o joelho fica a 90° com o calcanhar na altura do apoio;
//  - a regulagem da almofada (o pino que a sobe e desce na alavanca): ela encosta no alto das coxas.
// Em cada quadro, a alavanca gira até a almofada encostar nas coxas.
import ficha from '../dados/movimentos/panturrilha-sentada.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { baixoDaAlmofadaSentada, maoNoPegadorSentado, panturrilhaSentada as maquina } from '../pecas-de-cena/panturrilha-sentada';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { cross, dot, mix, norm, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const deg = 180 / Math.PI;
const g = (id: string) => obj('panturrilhaSentada', id);
const ANILHAS: IdAnilha[] = [`anilha${f('anilhas')}` as IdAnilha];

interface Pose {
  calc: number;
  lombar: number;
  toracica: number;
}
interface Sentado {
  y: number;
  z: number;
}

const perna = (s: number, calc: number): PosePerna => ({ pe: { bola: [s * f('pes.meiaDistancia'), g('apoioAlt'), f('bola.daBeirada')], dir: [0, 0, 1], calc }, polo: [s * 0.05, 0.3, 1] });
const solto: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };

/** O tronco e as pernas, com os braços soltos (os braços vêm depois, com a alavanca no lugar). */
function corpoSentado(corpo: Corpo, S: Sentado, p: Pose) {
  const t = resolverTronco(corpo, { pelve: [0, S.y, S.z], lombar: p.lombar, toracica: p.toracica });
  const pernas = { R: perna(-1, p.calc), L: perna(1, p.calc) };
  return { t, pernas, e: resolverMembros(t, { R: solto, L: solto }, pernas) };
}

/** O ângulo da coxa direita no plano de lado (graus acima da horizontal, para a frente). */
const anguloDaCoxa = (e: Esq) => {
  const c = sub(e.lado.R.joelho, e.lado.R.quadril);
  return Math.atan2(c[1], c[2]) * deg;
};

/** A bacia: o glúteo e a coxa no assento, à distância em que o joelho fica a 90° com o calcanhar na altura do apoio. */
const sentar = (corpo: Corpo): Sentado =>
  calibragem(corpo, 'panturrilha-sentada:sentado', () => {
    const topo = g('assentoAltura') - f('assento.amassa');
    const z0 = g('assentoFrente') - g('assentoComp'),
      z1 = g('assentoFrente');
    let S: Sentado = { y: 70, z: -55 };
    const p0: Pose = { calc: 0, lombar: 0, toracica: 0 };
    for (let i = 0; i < 4; i++) {
      const y = S.y;
      const z = resolver1((zz) => corpoSentado(corpo, { y, z: zz }, p0).e.lado.R.ang.joelho - f('joelho'), -90, -20);
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(corpoSentado(corpo, { y, z }, p0).e))
        if (['pelve', 'coxa', 'cintura'].includes(parte) && Math.abs(p[0]) < g('assentoLarg') / 2 && p[2] > z0 && p[2] < z1) min = Math.min(min, p[1]);
      S = { y: y + topo - min, z };
    }
    return S;
  });

/**
 * A pele do alto das coxas, debaixo da almofada: a maior distância da linha quadril–joelho, para cima (perpendicular a
 * ela), nas duas coxas, no trecho da almofada.
 */
function peleDasCoxas(e: Esq, aoLongo: number): number {
  let max = -1e9;
  for (const k of ['R', 'L'] as Lado[]) {
    const L = e.lado[k];
    const ao = norm(sub(L.joelho, L.quadril));
    const cima = norm(cross(cross(ao, [0, 1, 0]), ao));
    for (const { p, parte } of pontosDoBoneco(e)) {
      if (parte !== 'coxa' || Math.sign(p[0]) !== sinal(k)) continue;
      const v = sub(p, L.quadril);
      if (Math.abs(dot(v, ao) - aoLongo) > g('almofadaComp') / 2) continue;
      max = Math.max(max, dot(v, cima));
    }
  }
  return max;
}

/**
 * A regulagem da almofada (a face de baixo dela acima da linha da alavanca, em cm) e a distância da pele das coxas à
 * linha quadril–joelho debaixo dela; medidas com o calcanhar na altura do apoio.
 */
const regulagem = (corpo: Corpo) =>
  calibragem(corpo, 'panturrilha-sentada:almofada', () => {
    const S = sentar(corpo);
    const e = corpoSentado(corpo, S, { calc: 0, lombar: 0, toracica: 0 }).e;
    const pele = peleDasCoxas(e, g('almofadaDoEixo'));
    // com a alavanca paralela à coxa (o eixo fica na linha do quadril), a almofada sobe ou desce no pino até a face de
    // baixo dela ficar na pele, menos o que ela afunda
    const a = anguloDaCoxa(e);
    const L = e.lado.R;
    const ao = norm(sub(L.joelho, L.quadril));
    const cima = norm(cross(cross(ao, [0, 1, 0]), ao));
    const q: V3 = [0, L.quadril[1], L.quadril[2]];
    const n: V3 = [0, Math.cos(a / deg), -Math.sin(a / deg)];
    const falta = pele - f('almofada.amassa') - dot(sub(baixoDaAlmofadaSentada(a, 0), q), cima);
    return { pele, acima: falta / dot(n, cima) };
  });

/** O ângulo da alavanca em que a face de baixo da almofada encosta nas coxas (afundando `almofada.amassa`). */
function alavancaNasCoxas(e: Esq, acima: number, pele: number): number {
  const L = e.lado.R;
  const ao = norm(sub(L.joelho, L.quadril));
  const cima = norm(cross(cross(ao, [0, 1, 0]), ao));
  const q: V3 = [0, L.quadril[1], L.quadril[2]];
  const a0 = anguloDaCoxa(e);
  return resolver1((a) => dot(sub(baixoDaAlmofadaSentada(a, acima), q), cima) - (pele - f('almofada.amassa')), a0 - 25, a0 + 25, 30);
}

const giro = (corpo: Corpo, h: number) => Math.asin(h / corpo.m('pe.calcanharABola')) * deg;

function montar(corpo: Corpo, p: Pose) {
  const S = sentar(corpo);
  const R = regulagem(corpo);
  const c = corpoSentado(corpo, S, p);
  const alavanca = alavancaNasCoxas(c.e, R.acima, R.pele);
  const mao = (k: Lado): PoseBraco => {
    const s = sinal(k) as -1 | 1;
    return { pegada: maoNoPegadorSentado(alavanca, R.acima, s, f('maos.aoLado')), polo: [s * 0.8, -0.3, -1], mao: { polegar: [-s, 0, 0], forma: 'pegada', diam: g('pegadorDiam') } };
  };
  const e = resolverMembros(c.t, { R: mao('R'), L: mao('L') }, c.pernas);
  return { e, alavanca, acima: R.acima };
}

/** O batente de baixo: um pouco abaixo do ponto mais baixo da alavanca na série (certa ou com o erro). */
const batente = (corpo: Corpo) =>
  calibragem(corpo, 'panturrilha-sentada:batente', () => montar(corpo, { calc: giro(corpo, -f('calcanhar.embaixo')), lombar: 0, toracica: 0 }).alavanca - g('batenteFolga'));

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const fr = erro === 'curta' ? f('erro.curta.fracao') : 1;
  // na amplitude curta o calcanhar faz só uma parte do caminho, em volta do meio
  const a0 = giro(corpo, -f('calcanhar.embaixo')),
    a1 = giro(corpo, f('calcanhar.topo'));
  const meio = (a0 + a1) / 2;
  const calc = meio + (mix(a0, a1, u) - meio) * fr;
  const q = erro === 'quadril';
  const r = montar(corpo, { calc, lombar: q ? f('erro.quadril.lombar') * u : 0, toracica: q ? f('erro.quadril.toracica') * u : 0 });
  const M = maquina({ alavanca: r.alavanca, batente: batente(corpo), almofadaAcima: r.acima, anilhas: ANILHAS });
  const hA = g('apoioAlt');
  return {
    esq: r.e,
    prims: [chao(-80, 80, -110, 70), ...M.prims],
    pecas: [{ ...M.fixa, cenario: true }, M.movel],
    fios: [],
    cargas: [],
    marcas: {
      apoioDosPes: [0, hA, f('bola.daBeirada')],
      calcanharEmCima: [0, hA + f('calcanhar.topo'), 0],
      calcanharEmbaixo: [0, hA - f('calcanhar.embaixo'), 0],
      almofada: M.baixo,
      normalAlmofada: M.normal,
      almofadaAo: M.ao,
      pegadorR: maoNoPegadorSentado(r.alavanca, r.acima, -1, f('maos.aoLado')),
      pegadorL: maoNoPegadorSentado(r.alavanca, r.acima, 1, f('maos.aoLado')),
      alavanca: [r.alavanca, batente(corpo), 0],
      anilhas: M.anilhas,
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const panturrilhaSentada: Exercicio = {
  ficha: F,
  // de lado se lê o tornozelo e o calcanhar abaixo da borda do apoio, a almofada nas coxas e o tronco parado; de três
  // quartos pela frente, os dois pés na borda do apoio e a alavanca com as anilhas
  vistas: ['lateral', 'quina'],
  quadro,
  // panturrilha (o sóleo, sentado), sem secundário: é o que a biblioteca conta
  papeis: { panturrilha: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, joelho: (q) => q.esq.lado.R.joelho },
};

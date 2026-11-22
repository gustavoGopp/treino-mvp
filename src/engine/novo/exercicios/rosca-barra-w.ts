// Rosca com barra W, no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-barra-w.json); a barra, da peça
// ../pecas-de-cena/barra-w.ts. É a rosca direta na polia aprovada (./rosca-polia.ts) sem a coluna: em pé, a barra nas
// duas mãos, o braço parado ao lado do tronco e só o antebraço sobe. O que ele resolve em cada quadro, em vez de receber
// pronto:
//  - a pegada nas partes inclinadas: a mão gira com a parte inclinada de fora (o polegar sai 90° menos o ângulo da
//    parte inclinada, da tabela de objetos, para fora da posição neutra) e o antebraço abre para fora o que leva o
//    centro da mão ao meio dessa parte (as duas mãos sempre à mesma distância: a barra é rígida);
//  - a barra sai das mãos: a linha entre os dois centros de pegada é paralela à linha das mangas, e o plano da curva é
//    o que contém a linha da palma; a curva gira junto com o antebraço;
//  - embaixo, o cotovelo dobra o mínimo da ficha ou o que a barra precisa para passar à folga da ficha na frente das
//    coxas (`resolver1`, com a barra em W como uma fila de esferas na conta de `folgaDasPernas`);
//  - o quadril parado no ponto em que o centro de massa, com a barra e as anilhas no meio do caminho, cai sobre o meio
//    do pé.
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/rosca-barra-w.json';
import { sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { IdAnilha } from '../pecas-de-cena/barra-longa';
import { barraW, massaDaBarraW, pegadaNaBarraW, pontosDaBarraW } from '../pecas-de-cena/barra-w';
import type { BarraW } from '../pecas-de-cena/barra-w';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { bracoDaRosca } from './dobrar-o-cotovelo';
import { folgaDasPernas } from './dobrar-o-quadril';
import type { Esfera } from './dobrar-o-quadril';
import { montarEmPe } from './polia-bracos';
import type { PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const ANILHAS: IdAnilha[] = [`anilha${f('anilhas')}` as IdAnilha];
const MASSA = massaDaBarraW(ANILHAS);
/** O polegar a partir da posição neutra: a palma para cima menos a inclinação da parte da barra que a mão segura. */
const SUPINACAO = 90 - obj('barraW', 'anguloFora');

function pedidoDoCorpo(cotovelo: number, abre: number, u: number, erro?: string): PedidoEmPe {
  const w = f('pes.meiaDistancia');
  const x = suave(u);
  const braco = (t: Tronco, k: Lado): PoseBraco => {
    const b = bracoDaRosca(t.torax, k, {
      paraFora: f('braco.paraFora'),
      aFrente: f('braco.aFrente') + (erro === 'cotovelo' ? f('erro.cotovelo.braco') * x : 0),
      cotovelo,
      supinacao: SUPINACAO,
      diam: obj('barraW', 'pegadaDiam'),
      prot: f('escapula.prot'),
    });
    // o antebraço dobra em volta de um eixo de lado a lado (o cotovelo é uma dobradiça), aberto para fora `abre` graus:
    // o centro da mão fica sempre à mesma distância do meio, e a barra não muda de largura entre as mãos
    const s = sinal(k),
      um = norm(b.umero!),
      fora = dirRef(t.torax, [s, 0, 0]),
      frente = norm(perp(dirRef(t.torax, [0, 0, 1]), um)),
      c = cotovelo * rad,
      be = abre * rad;
    const antebraco = norm(add(mul(add(mul(um, Math.cos(c)), mul(frente, Math.sin(c))), Math.cos(be)), mul(fora, Math.sin(be))));
    // o polegar no mesmo referencial da dobradiça: a frente do antebraço (no plano do braço) e o lado de fora dele. Assim
    // a linha da palma gira só em volta do eixo de lado a lado, com o antebraço, e a parte inclinada não muda de ângulo
    // com a linha da barra
    const frenteAnte = norm(perp(sub(mul(frente, Math.cos(c)), mul(um, Math.sin(c))), antebraco)),
      foraAnte = norm(perp(fora, antebraco)),
      sp = SUPINACAO * rad;
    return { ...b, antebraco, mao: { ...b.mao, polegar: norm(add(mul(frenteAnte, Math.cos(sp)), mul(foraAnte, Math.sin(sp)))) } };
  };
  return {
    pes: { R: { bola: [-w, 0, 0] }, L: { bola: [w, 0, 0] } },
    joelho: f('joelho'),
    tronco: erro === 'balanco' ? mix(f('erro.balanco.inicio'), f('erro.balanco.fim'), x) : f('tronco'),
    lombar: erro === 'balanco' ? f('erro.balanco.lombar') * x : 0,
    cervical: f('cervical'),
    cabeca: f('cabeca'),
    bracos: (t) => ({ R: braco(t, 'R'), L: braco(t, 'L') }),
  };
}

/**
 * A barra que as mãos seguram: a linha entre os centros das pegadas é paralela à das mangas; o plano da curva contém a
 * linha da palma direita (o polegar para a manga); o centro da barra fica a meio caminho, deslocado no plano da curva
 * o que separa a parte inclinada da linha das mangas.
 */
function barraDe(e: Esq): BarraW {
  const pR = e.lado.R.pegada,
    pL = e.lado.L.pegada;
  const eixo = norm(sub(pL, pR));
  // o polegar direito aponta para a manga direita (lado de −x); o eixo x da mão direita aponta para o dedo mínimo
  const polegarR = mul(e.lado.R.mao.x, -1);
  const frente = norm(perp(polegarR, eixo));
  const P = pegadaNaBarraW();
  const centro = add(mul(add(pR, pL), 0.5), mul(frente, -P.fora));
  return { centro, eixo, frente, anilhas: ANILHAS };
}
/** A barra em W como uma fila de esferas do raio dela (para a folga até as pernas). */
function esferasDaBarra(e: Esq): Esfera[] {
  const L = pontosDaBarraW(barraDe(e)),
    r = obj('barraW', 'pegadaDiam') / 2;
  const out: Esfera[] = [];
  for (let i = 0; i < L.length - 1; i++) for (let j = 0; j < 6; j++) out.push({ c: add(L[i]!, mul(sub(L[i + 1]!, L[i]!), j / 6)), r });
  return out;
}

interface Calibrado {
  pelve: PelveParada;
  abre: number;
  cotBaixo: number;
}
const CAL = new WeakMap<Corpo, Calibrado>();

/** A pelve parada: na altura que dá a flexão do joelho pedida e onde o centro de massa (com a barra) cai em `zDoPeso`. */
function equilibrar(corpo: Corpo, p: PedidoEmPe, zDoPeso: number): PelveParada {
  let z = zDoPeso,
    y = corpo.m('altura.trocanter');
  for (let i = 0; i < 6; i++) {
    y = resolver1((yy) => montarEmPe(corpo, p, { y: yy, z }).lado.R.ang.joelho - p.joelho, 60, corpo.m('altura.trocanter') + 4, 26);
    const e = montarEmPe(corpo, p, { y, z });
    z -= centroDeMassa(e, 'homem', [{ massa: MASSA, pos: barraDe(e).centro }])[2] - zDoPeso;
  }
  return { y, z };
}

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  // a conta é demorada (centenas de poses): fica guardada para o corpo do app (../calibragens.ts)
  c = calibragem(corpo, 'rosca-barra-w:pelve-e-bracos', () => calcular(corpo));
  CAL.set(corpo, c);
  return c;
}
function calcular(corpo: Corpo): Calibrado {
  const meioDoPe = -corpo.m('pe.calcanharABola') / 2;
  const meiaLargura = pegadaNaBarraW().s;
  const meioCot = mix(f('cotovelo.baixo.minimo'), f('cotovelo.cima'), 0.5);
  // primeiro com o antebraço sem abrir, para achar a pelve; depois o quanto ele abre para a mão chegar ao meio da parte
  // inclinada; e a pelve de novo, com os braços no lugar
  let pelve = equilibrar(corpo, pedidoDoCorpo(meioCot, 0, 0.5), meioDoPe);
  const abrePara = (pv: PelveParada) => resolver1((a) => -montarEmPe(corpo, pedidoDoCorpo(meioCot, a, 0.5), pv).lado.R.pegada[0] - meiaLargura, -10, 30, 26);
  let abre = abrePara(pelve);
  pelve = equilibrar(corpo, pedidoDoCorpo(meioCot, abre, 0.5), meioDoPe);
  abre = abrePara(pelve);
  // embaixo: o menor cotovelo, a partir do mínimo da ficha, em que a barra fica à folga pedida das coxas
  const folga = (cot: number) => {
    const e = montarEmPe(corpo, pedidoDoCorpo(cot, abre, 0), pelve);
    return folgaDasPernas(e, esferasDaBarra(e)) - f('barra.folga');
  };
  const cotBaixo = folga(f('cotovelo.baixo.minimo')) >= 0 ? f('cotovelo.baixo.minimo') : resolver1(folga, f('cotovelo.baixo.minimo'), 60, 26);
  return { pelve, abre, cotBaixo };
}

/**
 * Correção de 19/11/2026: no erro "Balançar o tronco", o tronco começa 10° inclinado à frente, os braços vão com ele e,
 * com o cotovelo do movimento certo, a barra entrava 1,3 cm nas coxas. Embaixo, nesse erro, o cotovelo dobra o que a
 * barra precisa para passar à mesma folga das coxas (`barra.folga`), como no movimento certo.
 */
function cotoveloEmbaixoNoBalanco(corpo: Corpo): number {
  return calibragem(corpo, 'rosca-barra-w:balanco-embaixo', () => {
    const c = calibrar(corpo);
    const folga = (cot: number) => {
      const e = montarEmPe(corpo, pedidoDoCorpo(cot, c.abre, 0, 'balanco'), c.pelve);
      return folgaDasPernas(e, esferasDaBarra(e)) - f('barra.folga');
    };
    return folga(c.cotBaixo) >= 0 ? c.cotBaixo : resolver1(folga, c.cotBaixo, 60, 26);
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const baixo = erro === 'curta' ? f('erro.curta.cotovelo') : erro === 'balanco' ? cotoveloEmbaixoNoBalanco(corpo) : c.cotBaixo;
  const e = montarEmPe(corpo, pedidoDoCorpo(mix(baixo, f('cotovelo.cima'), u), c.abre, u, erro), c.pelve);
  const B = barraDe(e);
  const pb = barraW(B);
  const L = pontosDaBarraW(B);
  const marcas: Record<string, V3> = { barra: B.centro };
  L.forEach((p, i) => (marcas[`barraW.${i}`] = p));
  return { esq: e, prims: [chao(-80, 80, -60, 70), ...pb.prims], pecas: [pb.peca], fios: [], cargas: [{ massa: MASSA, pos: B.centro }], marcas, vies: { maoR: 1, maoL: 1 } };
}

export const roscaBarraW: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // bíceps (principal; a biblioteca conta só ele); o antebraço "só ajuda" (correção de 04/11, como nas outras roscas)
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

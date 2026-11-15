// Tríceps na polia com corda (empurrar para baixo), no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-corda.json). Em pé, de frente para a coluna, a meio passo, os pés na largura do quadril,
// o tronco levemente inclinado à frente; a polia no alto e a corda segura pelas duas mãos, uma em cada ramo.
// O que ele resolve em cada quadro, em vez de receber pronto:
//  - o braço (ombro → cotovelo) é uma direção fixa no tronco, ao lado das costelas: o cotovelo não sai do lugar;
//  - o antebraço dobra `cotovelo` graus a partir do braço, à frente, e gira em volta do braço até as duas mãos ficarem
//    na distância pedida (perto uma da outra em cima; afastadas embaixo, a corda abre para os lados das coxas);
//  - a corda segue as mãos (os dois ramos esticados até a bucha) e o cabo vai reto da bucha à roldana, no alto da
//    coluna; a coluna fica à frente, onde o cabo, em cima, fica a `cabo.inclinacao` graus da vertical. A pilha sobe o
//    curso do cabo dividido pela relação da máquina.
import ficha from '../dados/movimentos/triceps-corda.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { cabo, centroDaRoldana, chao, saidaDoCabo, torre } from '../pecas';
import type { Peca, Torre } from '../pecas';
import { cordaTriceps, montarCorda } from '../pecas-de-cena/corda-triceps';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dist, mix, mul, norm, paraRef, perp } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

interface Pedido {
  /** Flexão do cotovelo (graus). */
  cotovelo: number;
  /** O braço no tronco: quanto vai à frente da linha do tronco e quanto vai para o meio (graus). */
  frente: number;
  dentro: number;
  /** Meia distância entre os centros das duas pegadas (cm). */
  meia: number;
  /** Inclinação do peito à frente da vertical (graus) e a flexão da torácica (o erro "debruçar"). */
  inclina: number;
  toracica: number;
  /** O giro do antebraço em volta do braço (radianos; positivo = para o meio); sem ele, sai de `meia`. */
  phi?: number;
}

const CAL = new WeakMap<Corpo, { pelveY: number; frente: number; polia: Torre; compMin: number; phi0: number }>();

/** A inclinação do pelve (`frente` de resolverTronco) que dá o peito `inclina` graus à frente da vertical. */
function pelveParaInclinar(corpo: Corpo, inclina: number, toracica: number): number {
  return resolver1((x) => {
    const t = resolverTronco(corpo, { pelve: [0, 95, 0], frente: x, toracica, cervical: f('cervical'), cabeca: f('cabeca') });
    return Math.atan2(t.torax.y[2], t.torax.y[1]) / rad - inclina;
  }, -30, 70, 30);
}

function troncoEPernas(corpo: Corpo, pelveY: number, frente: number, toracica: number): { t: Tronco; pernas: Record<Lado, PosePerna> } {
  const w = f('pes.meiaDistancia');
  const t = resolverTronco(corpo, { pelve: [0, pelveY, f('pelve.z')], frente, toracica, cervical: f('cervical'), cabeca: f('cabeca') });
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, f('pe.z')], dir: [sinal(k) * 0.12, 0, 1], calc: 0 }, polo: [sinal(k) * 0.1, 0, 1] });
  return { t, pernas: { R: perna('R'), L: perna('L') } };
}

/** O braço do lado k no referencial do tronco: pendurado, `frente` graus à frente e `dentro` graus para o meio. */
function direcaoDoBraco(k: Lado, frente: number, dentro: number): V3 {
  const a = frente * rad,
    d = dentro * rad;
  // para o meio é para +x no lado direito (x negativo é o lado direito)
  return norm([-sinal(k) * Math.sin(d), -Math.cos(a) * Math.cos(d), Math.sin(a) * Math.cos(d)]);
}

function bracos(corpo: Corpo, t: Tronco, pernas: Record<Lado, PosePerna>, p: Pedido) {
  const T = t.torax;
  const dir = (k: Lado) => dirRef(T, direcaoDoBraco(k, p.frente, p.dentro));
  const reto = (k: Lado): PoseBraco => ({ umero: dir(k), antebraco: dir(k), polo: dirRef(T, [0, 0, -1]), mao: { polegar: dirRef(T, [0, 0, 1]) } });
  const e0 = resolverMembros(t, { R: reto('R'), L: reto('L') }, pernas);
  const c = p.cotovelo * rad;
  const lado = (k: Lado, phi: number) => {
    const u = dir(k);
    const ombro = e0.lado[k].ombro;
    const cot = add(ombro, mul(u, corpo.m('braco.comp')));
    // o antebraço dobra à frente; φ o gira em volta do braço, para o meio (φ > 0) ou para fora
    const frente = norm(perp(T.z, u)),
      meio = norm(perp(dirRef(T, [-sinal(k), 0, 0]), u));
    const a = norm(add(mul(u, Math.cos(c)), mul(add(mul(frente, Math.cos(phi)), mul(meio, Math.sin(phi))), Math.sin(c))));
    const pegada = add(cot, mul(a, corpo.m('antebraco.comp') + corpo.m('mao.punhoAoCentroDaPegada')));
    return { u, cot, a, pegada };
  };
  // o giro do antebraço em volta do braço: em cima, o que deixa as duas mãos a `meia` do meio do tronco (cada uma num
  // ramo da corda); daí até embaixo ele vai, sem tranco, ao giro final da ficha (a corda abre: as mãos vão para fora)
  const phi = p.phi ?? resolver1((x) => paraRef(T, lado('R', x).pegada)[0] + p.meia, -1.5, 1.5, 40);
  const pose = (k: Lado, polegar: V3): PoseBraco => {
    const L = lado(k, phi);
    return { umero: L.u, antebraco: L.a, polo: dirRef(T, [0, 0, -1]), mao: { polegar, forma: 'pegada', diam: obj('cordaTriceps', 'diam') } };
  };
  return { pegada: { R: lado('R', phi).pegada, L: lado('L', phi).pegada }, pose, phi, antebraco: { R: lado('R', phi).a, L: lado('L', phi).a } };
}

function pedido(u: number, erro?: string): Pedido {
  const cotovelo = mix(erro === 'cotovelo' ? f('erro.cotovelo.cotovelo') : f('cotovelo.alto'), f('cotovelo.baixo'), u);
  const frente = erro === 'cotovelo' ? mix(f('erro.cotovelo.frente'), f('braco.frente'), u) : f('braco.frente');
  const meia = f('maos.meiaDistancia.alto');
  const inclina = erro === 'tronco' ? mix(f('tronco.inclinacao'), f('erro.tronco.inclinacao'), u) : f('tronco.inclinacao');
  const toracica = erro === 'tronco' ? u * f('erro.tronco.toracica') : 0;
  return { cotovelo, frente, dentro: f('braco.paraDentro'), meia, inclina, toracica };
}

function calibrar(corpo: Corpo) {
  let c = CAL.get(corpo);
  if (c) return c;
  const p0 = pedido(0);
  const frente = pelveParaInclinar(corpo, p0.inclina, 0);
  // a altura da pelve que dá os joelhos destravados da ficha
  const pelveY = resolver1((y) => {
    const { t, pernas } = troncoEPernas(corpo, y, frente, 0);
    return resolverMembros(t, { R: { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } }, L: { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } } }, pernas).lado.R.ang.joelho - f('joelho');
  }, 70, 105, 30);
  // a coluna: a roldana no alto, à frente; em cima (mãos no peito) o cabo fica a `cabo.inclinacao` graus da vertical
  const { t, pernas } = troncoEPernas(corpo, pelveY, frente, 0);
  const b = bracos(corpo, t, pernas, p0);
  const alto: V3 = [0, obj('torre', 'poliaMax'), 200];
  const cm = montarCorda([b.pegada.R, b.pegada.L], corpo.m('mao.largura'), alto);
  let polia: Torre = { base: [0, 0, 0], frente: [0, 0, -1], alturaDaPolia: obj('torre', 'poliaMax') };
  const zRold = (z: number) => centroDaRoldana({ ...polia, base: [0, 0, z] });
  const z = resolver1((zz) => {
    const r = zRold(zz);
    const cm2 = montarCorda([b.pegada.R, b.pegada.L], corpo.m('mao.largura'), r);
    return Math.atan2(r[2] - cm2.bucha[2], r[1] - cm2.bucha[1]) / rad - f('cabo.inclinacao');
  }, cm.bucha[2] - 20, cm.bucha[2] + 120, 40);
  polia = { ...polia, base: [0, 0, z] };
  const cm2 = montarCorda([b.pegada.R, b.pegada.L], corpo.m('mao.largura'), centroDaRoldana(polia));
  const compMin = dist(cm2.bucha, saidaDoCabo(polia, cm2.bucha));
  c = { pelveY, frente, polia, compMin, phi0: b.phi };
  CAL.set(corpo, c);
  return c;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const p = pedido(u, erro);
  // o giro do antebraço vai do de cima ao de baixo (ficha), suave nas pontas
  p.phi = mix(c.phi0, -f('antebraco.giroParaFora.baixo') * rad, suave(u));
  const frente = erro === 'tronco' ? pelveParaInclinar(corpo, p.inclina, p.toracica) : c.frente;
  const { t, pernas } = troncoEPernas(corpo, c.pelveY, frente, p.toracica);
  const b = bracos(corpo, t, pernas, p);
  // a bucha fica onde os dois ramos esticados se encontram; o punho fecha com o polegar virado para ela (a corda
  // atravessa a mão em linha reta até a bucha)
  const corda = montarCorda([b.pegada.R, b.pegada.L], corpo.m('mao.largura'), centroDaRoldana(c.polia));
  // a pegada neutra: o polegar para cima e para trás em cima, para a frente embaixo (a corda sai do lado do polegar)
  const pol = (k: Lado) => norm(perp(add(t.torax.y, t.torax.z), b.antebraco[k]));
  const e = resolverMembros(t, { R: b.pose('R', pol('R')), L: b.pose('L', pol('L')) }, pernas);
  const saida = saidaDoCabo(c.polia, corda.bucha);
  const comp = dist(corda.bucha, saida);
  // empurrando para baixo, o cabo encompride e a pilha sobe
  const subida = Math.max(0, comp - c.compMin) / obj('torre', 'relacao') + 2;
  const pc = cordaTriceps(corda);
  const prims = [chao(-60, 60, -60, c.polia.base[2] + 50), ...torre(c.polia, subida), ...pc.prims, cabo(corda.bucha, saida)];
  const pecas: Peca[] = [{ t: 'torre', torre: c.polia, subida }, pc.peca, { t: 'cabo', a: corda.bucha, b: saida }];
  const marcas: Record<string, V3> = {
    bucha: corda.bucha,
    pilha: [0, subida, 0],
    saiR: corda.ramos[0]!.sai,
    saiL: corda.ramos[1]!.sai,
    saida,
  };
  return { esq: e, prims, pecas, fios: [{ id: 'cabo', comp, estica: true }], cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
}

export const tricepsCorda: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'posterior'],
  quadro,
  // a biblioteca: tríceps principal, sem secundário (revisão de anatomia de 02/11/2026)
  papeis: { triceps: 'p' },
  trajetorias: { mãos: (q) => q.esq.lado.R.pegada, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

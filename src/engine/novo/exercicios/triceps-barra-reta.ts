// Tríceps na polia com barra reta (empurrar para baixo), no motor novo. Os números vêm da ficha
// (../dados/movimentos/triceps-barra-reta.json). Em pé, de frente para a coluna, a meio passo, os pés na largura do
// quadril e o tronco um pouco inclinado à frente, como no tríceps na corda (./triceps-corda.ts); a polia no alto e a
// barra reta curta da polia (../pecas-de-cena/polia-braco-barra-reta.ts, a mesma da rosca na polia) nas duas mãos, por
// cima, na largura dos ombros. O que ele resolve em cada quadro, em vez de receber pronto:
//  - o braço (ombro → cotovelo) é uma direção fixa no tronco, ao lado das costelas: o cotovelo não sai do lugar;
//  - o antebraço dobra no plano do braço (o cotovelo é uma dobradiça): as duas mãos ficam sempre na mesma distância,
//    porque a barra é reta e tem largura fixa;
//  - embaixo, o cotovelo estende até o mínimo da ficha ou até onde a barra passa à folga da ficha na frente das coxas;
//  - a coluna fica à frente, onde o cabo, em cima, fica a `cabo.inclinacao` graus da vertical; o cabo vai reto da
//    ponta do mosquetão à roldana, e a pilha sobe o curso do cabo dividido pela relação da máquina.
import ficha from '../dados/movimentos/triceps-barra-reta.json';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { centroDaRoldana, chao } from '../pecas';
import type { Peca } from '../pecas';
import { barraReta, montarBarra } from '../pecas-de-cena/polia-braco-barra-reta';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { folgaDasPernas } from './dobrar-o-quadril';
import type { Esfera } from './dobrar-o-quadril';
import { colunasECabos, compDoCabo, menorNoCiclo, polegarDaPegada, torreComRoldanaEm } from './polia-bracos';
import type { CaboDaColuna } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
/** Até que altura o quadro mostra a coluna: a roldana de cima e o carrinho (o resto é cortado pela borda). */
const CORTADA_EM = 208;

/** A inclinação da bacia (`frente` de resolverTronco) que dá o peito `inclina` graus à frente da vertical. */
function pelveParaInclinar(corpo: Corpo, inclina: number, toracica: number): number {
  return resolver1((x) => {
    const t = resolverTronco(corpo, { pelve: [0, 95, 0], frente: x, toracica, cervical: f('cervical'), cabeca: f('cabeca') });
    return Math.atan2(t.torax.y[2], t.torax.y[1]) / rad - inclina;
  }, -30, 70, 30);
}

function troncoEPernas(corpo: Corpo, pelveY: number, frente: number, toracica: number, atras = 0): { t: Tronco; pernas: Record<Lado, PosePerna> } {
  const w = f('pes.meiaDistancia');
  const t = resolverTronco(corpo, { pelve: [0, pelveY, f('pelve.z') - atras], frente, toracica, cervical: f('cervical'), cabeca: f('cabeca') });
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, f('pe.z')], dir: [sinal(k) * 0.12, 0, 1], calc: 0 }, polo: [sinal(k) * 0.1, 0, 1] });
  return { t, pernas: { R: perna('R'), L: perna('L') } };
}

/** O braço do lado k no tronco: pendurado, `frente` graus à frente e `dentro` graus para o meio. */
function direcaoDoBraco(T: Tronco['torax'], k: Lado): V3 {
  const a = f('braco.frente') * rad,
    d = f('braco.paraDentro') * rad;
  return dirRef(T, norm([-sinal(k) * Math.sin(d), -Math.cos(a) * Math.cos(d), Math.sin(a) * Math.cos(d)]));
}

/**
 * Os dois braços com o cotovelo dobrado `cotovelo` graus: o braço parado ao lado das costelas e o antebraço dobrando à
 * frente, no plano do braço; a mão por cima da barra (o polegar para dentro, ao longo dela).
 */
function bracos(t: Tronco, cotovelo: number): Record<Lado, PoseBraco> {
  const T = t.torax;
  const c = cotovelo * rad;
  const braco = (k: Lado): PoseBraco => {
    const u = direcaoDoBraco(T, k);
    const frente = norm(perp(T.z, u));
    const antebraco = norm(add(mul(u, Math.cos(c)), mul(frente, Math.sin(c))));
    const polo = dirRef(T, [0, 0, -1]);
    return { umero: u, antebraco, polo, mao: { polegar: polegarDaPegada(u, antebraco, polo, sinal(k), -f('maos.pronacao')), forma: 'pegada', diam: obj('barraRetaPolia', 'diam') } };
  };
  return { R: braco('R'), L: braco('L') };
}

/** A barra como uma fila de esferas do raio dela, de uma ponta à outra (para a folga até as pernas). */
function esferasDaBarra(e: Esq): Esfera[] {
  const a = e.lado.R.pegada,
    b = e.lado.L.pegada;
  const u = norm(sub(b, a)),
    meio = mul(add(a, b), 0.5),
    L = obj('barraRetaPolia', 'comp') / 2;
  const out: Esfera[] = [];
  for (let i = 0; i <= 16; i++) out.push({ c: add(meio, mul(u, -L + (2 * L * i) / 16)), r: obj('barraRetaPolia', 'diam') / 2 });
  return out;
}

interface Calibrado {
  pelveY: number;
  frente: number;
  cotBaixo: number;
  cabos: CaboDaColuna[];
  repouso: number[];
}
const CAL = new WeakMap<Corpo, Calibrado>();

/** O que `montar` recebe: a calibração e, no erro de usar o tronco, o cotovelo embaixo (`cotTronco`). */
type ParaMontar = Pick<Calibrado, 'pelveY' | 'frente' | 'cotBaixo'> & { cotTronco?: number };

/** O pedido de cada instante: a flexão do cotovelo, a inclinação do peito e a da torácica. */
function pedido(c: Pick<ParaMontar, 'cotBaixo' | 'cotTronco'>, u: number, erro?: string) {
  const alto = erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.alto');
  const baixo = erro === 'tronco' && c.cotTronco !== undefined ? c.cotTronco : c.cotBaixo;
  return {
    cotovelo: mix(alto, baixo, u),
    inclina: erro === 'tronco' ? mix(f('tronco.inclinacao'), f('erro.tronco.inclinacao'), u) : f('tronco.inclinacao'),
    toracica: erro === 'tronco' ? u * f('erro.tronco.toracica') : 0,
    // ao debruçar, o quadril vai para trás e a cabeça fica atrás do cabo (até 19/11 o cabo atravessava a cabeça)
    atras: erro === 'tronco' ? u * f('erro.tronco.quadrilAtras') : 0,
  };
}

function montar(corpo: Corpo, c: ParaMontar, u: number, erro?: string): Esq {
  const p = pedido(c, u, erro);
  const frente = erro === 'tronco' ? pelveParaInclinar(corpo, p.inclina, p.toracica) : c.frente;
  const { t, pernas } = troncoEPernas(corpo, c.pelveY, frente, p.toracica, p.atras);
  const certo = resolverMembros(t, bracos(t, p.cotovelo), pernas);
  if (erro !== 'cotovelos') return certo;
  // os cotovelos abrem: as mãos seguem na barra, no mesmo caminho, e o cotovelo gira para fora em volta da linha do
  // ombro à mão (o braço sai do tronco)
  const T = t.torax;
  const aberto = (k: Lado): PoseBraco => {
    const polo = norm(dirRef(T, [sinal(k) * f('erro.cotovelos.polo'), 0, -1]));
    const L = certo.lado[k];
    return { pegada: L.pegada, polo, mao: { polegar: L.mao.x, forma: 'pegada', diam: obj('barraRetaPolia', 'diam') } };
  };
  return resolverMembros(t, { R: aberto('R'), L: aberto('L') }, pernas);
}

const barraDe = (e: Esq, cabos: CaboDaColuna[]) => montarBarra(mul(add(e.lado.R.pegada, e.lado.L.pegada), 0.5), sub(e.lado.L.pegada, e.lado.R.pegada), centroDaRoldana(cabos[0]!.torre));

function calibrar(corpo: Corpo): Calibrado {
  let c = CAL.get(corpo);
  if (c) return c;
  const frente = pelveParaInclinar(corpo, f('tronco.inclinacao'), 0);
  // a altura da pelve que dá os joelhos destravados da ficha
  const solto: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const pelveY = resolver1((y) => {
    const { t, pernas } = troncoEPernas(corpo, y, frente, 0);
    return resolverMembros(t, { R: solto, L: solto }, pernas).lado.R.ang.joelho - f('joelho');
  }, 70, 105, 30);
  // embaixo: o menor cotovelo, a partir do mínimo da ficha, em que a barra fica à folga pedida das coxas
  const folga = (cot: number) => {
    const e = montar(corpo, { pelveY, frente, cotBaixo: cot }, 1);
    return folgaDasPernas(e, esferasDaBarra(e)) - f('barra.folga');
  };
  const minimo = f('cotovelo.baixo.minimo');
  const cotBaixo = folga(minimo) >= 0 ? minimo : resolver1(folga, minimo, 40, 26);
  // a coluna: a roldana no alto, à frente; em cima, o cabo (da ponta do mosquetão à roldana) fica a `cabo.inclinacao`
  // graus da vertical
  const e0 = montar(corpo, { pelveY, frente, cotBaixo }, 0);
  const torreEm = (z: number): CaboDaColuna[] => [{ id: 'cabo', torre: torreComRoldanaEm([0, obj('torre', 'poliaMax'), z], [0, 0, -1]) }];
  const z = resolver1((zz) => {
    const cabos = torreEm(zz);
    const b = barraDe(e0, cabos);
    const r = centroDaRoldana(cabos[0]!.torre);
    return Math.atan2(r[2] - b.ponta[2], r[1] - b.ponta[1]) / rad - f('cabo.inclinacao');
  }, e0.lado.R.pegada[2], e0.lado.R.pegada[2] + 120, 40);
  const cabos = torreEm(z);
  const parcial = { pelveY, frente, cotBaixo, cabos };
  const repouso = [menorNoCiclo((u) => compDoCabo(cabos[0]!.torre, barraDe(montar(corpo, parcial, u), cabos).ponta))];
  c = { ...parcial, repouso };
  CAL.set(corpo, c);
  return c;
}

/**
 * Correção de 20/11/2026: no erro "Usar o tronco", o tronco debruça 30° e o quadril vai 14 cm para trás; os braços vão
 * com o tronco e, com o cotovelo do movimento certo embaixo, a barra entrava 7,1 cm nas coxas. Embaixo, nesse erro, o
 * cotovelo dobra o que a barra precisa para passar à mesma folga das coxas que no movimento certo (`barra.folga`): quem
 * debruça para descer a carga não termina de estender os cotovelos.
 */
function cotoveloEmbaixoNoTronco(corpo: Corpo): number {
  return calibragem(corpo, 'triceps-barra-reta:tronco-embaixo', () => {
    const c = calibrar(corpo);
    const folga = (cot: number) => {
      const e = montar(corpo, { ...c, cotTronco: cot }, 1, 'tronco');
      return folgaDasPernas(e, esferasDaBarra(e)) - f('barra.folga');
    };
    return folga(c.cotBaixo) >= 0 ? c.cotBaixo : resolver1(folga, c.cotBaixo, 90, 30);
  });
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const e = montar(corpo, erro === 'tronco' ? { ...c, cotTronco: cotoveloEmbaixoNoTronco(corpo) } : c, u, erro);
  const barra = barraDe(e, c.cabos);
  const pb = barraReta(barra);
  const col = colunasECabos(c.cabos, [barra.ponta], c.repouso, f('pilha.folga'), false, CORTADA_EM);
  const pecas: Peca[] = [...col.pecas!.filter((p) => p.t === 'torre'), pb.peca, ...col.pecas!.filter((p) => p.t !== 'torre')];
  const marcas: Record<string, V3> = { ...col.marcas, barra: barra.meio, 'barra.a': barra.a, 'barra.b': barra.b };
  return { esq: e, prims: [chao(-60, 60, -60, c.cabos[0]!.torre.base[2] + 50), ...pb.prims, ...col.prims], pecas, fios: col.fios, cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
}

export const tricepsBarraReta: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'posterior'],
  quadro,
  // a biblioteca: tríceps principal, sem secundário (como o tríceps na corda)
  papeis: { triceps: 'p' },
  trajetorias: { barra: (q) => q.marcas.barra!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

// Abdominal na polia com corda, ajoelhado, no motor novo. Os números vêm da ficha
// (../dados/movimentos/abdominal-polia.json). Ajoelhado no colchonete de frente para a coluna de polia, a meio passo
// dela, os joelhos na largura do quadril, o quadril um pouco atrás dos joelhos; as pontas da corda nas mãos, ao lado
// da cabeça, perto das têmporas. A bacia fica parada (o quadril não mexe): quem enrola é a coluna (a lombar e a parte
// de cima das costas dobram, o pescoço acompanha), e as mãos vão junto com a cabeça. A corda segue as mãos (os dois
// ramos esticados até a bucha, ../pecas-de-cena/corda-triceps.ts) e o cabo vai reto da bucha à roldana, no alto.
// O que este arquivo resolve, em vez de receber pronto:
//  - a inclinação da bacia que deixa o peito no ângulo da ficha, com a coluna neutra;
//  - onde a mão encosta na cabeça: o centro dela anda para o lado até a pele da mão ficar a 0,5 cm da pele da cabeça;
//  - a corda: cada ramo reto da mão até a bucha, esticado (o cabo puxa a bucha para a roldana).
import ficha from '../dados/movimentos/abdominal-polia.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { centroDaRoldana, chao, colchonete } from '../pecas';
import type { Peca, Torre } from '../pecas';
import { cordaTriceps, montarCorda } from '../pecas-de-cena/corda-triceps';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dirRef, mix, noRef, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { cenaDaPolia, folgaEntre, frenteParaOPeito } from './polia-puxar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

interface Calib {
  frente: number;
  /** O centro da mão direita no referencial da cabeça (a esquerda é o espelho). */
  mao: V3;
  torre: Torre;
  repouso: number;
}
const CAL = new WeakMap<Corpo, Calib>();

const yJoelho = (corpo: Corpo) => obj('colchonete', 'esp') + corpo.secoes.perna![0]!.b;
/** A bacia com a coxa `a` graus atrás da vertical, a partir dos joelhos (parados no colchonete). */
const pelveDe = (corpo: Corpo, a: number): V3 => [0, yJoelho(corpo) + corpo.m('coxa.comp') * Math.cos(a * rad), -corpo.m('coxa.comp') * Math.sin(a * rad)];
/**
 * Ajoelhado: cada coxa do quadril até o joelho dela, parado no colchonete (na largura do quadril); a canela para trás,
 * quase horizontal, e o peito do pé no colchonete.
 */
function pernasPara(corpo: Corpo, t: Tronco): Record<Lado, PosePerna> {
  const solta: PosePerna = { coxa: [0, -1, 0], canela: norm([0, -0.035, -1]), peDir: norm([0, -0.2, -1]), polo: [0, 0, 1] };
  const e = resolverMembros(t, { R: solto(), L: solto() }, { R: solta, L: solta });
  const perna = (k: Lado): PosePerna => ({ ...solta, coxa: norm(sub([sinal(k) * f('joelhos.meiaDistancia'), yJoelho(corpo), 0], e.lado[k].quadril)) });
  return { R: perna('R'), L: perna('L') };
}
const solto = (): PoseBraco => ({ polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });

/** O tronco: a bacia parada (ou, no erro "quadril", sentando para trás) e a coluna enrolada a fração `e`. */
function tronco(corpo: Corpo, c: Pick<Calib, 'frente'>, enrola: number, coxaExtra = 0, bacia = 0): Tronco {
  const a = f('coxa.inclinacao') + coxaExtra;
  const p: PoseTronco = {
    pelve: pelveDe(corpo, a),
    // no erro, o quadril dobra: a coxa vai para trás e a bacia gira à frente (o peito desce)
    frente: c.frente + bacia,
    lombar: f('lombar.fim') * enrola,
    toracica: f('toracica.fim') * enrola,
    cervical: mix(f('cervical.inicio'), f('cervical.fim'), enrola),
    cabeca: 0,
  };
  return resolverTronco(corpo, p);
}

/** Os braços com o centro de cada mão em `peg` e os cotovelos para baixo e à frente. */
function bracos(t: Tronco, peg: Record<Lado, V3>): Record<Lado, PoseBraco> {
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // pegada neutra: o polegar para a frente do antebraço, que aqui (o cotovelo à frente, a mão na cabeça) aponta para
    // trás; a corda atravessa o punho em linha reta até a bucha (../pecas-de-cena/corda-triceps.ts)
    const polegar = dirRef(t.torax, [0, 0, -1]);
    return { pegada: peg[k], polo: norm(dirRef(t.torax, [s * 0.35, -0.6, 1])), mao: { polegar, forma: 'pegada', diam: obj('cordaTriceps', 'diam') } };
  };
  return { R: braco('R'), L: braco('L') };
}
const espelho = (p: V3): V3 => [-p[0], p[1], p[2]];

function calibrar(corpo: Corpo): Calib {
  let c = CAL.get(corpo);
  if (c) return c;
  const p0: PoseTronco = { pelve: pelveDe(corpo, f('coxa.inclinacao')), cervical: f('cervical.inicio'), cabeca: 0 };
  const frente = frenteParaOPeito(corpo, p0, f('tronco.inicio'));
  const t = tronco(corpo, { frente }, 0);
  const pe = pernasPara(corpo, t);
  // a mão direita ao lado da cabeça: o centro dela anda para fora até a pele da mão ficar à folga da pele da cabeça
  const y = corpo.m('cabeca.tragionAoTopo') - f('maos.abaixoDoTopo');
  const em = (x: number) => {
    const mao: V3 = [-x, y, f('maos.aFrente')];
    const peg = { R: noRef(t.cabeca, mao), L: noRef(t.cabeca, espelho(mao)) };
    return { mao, e: resolverMembros(t, bracos(t, peg), pe) };
  };
  const x = resolver1((xx) => folgaEntre(em(xx).e, (p) => p === 'mao' || p === 'polegar', (p) => p === 'cabeca') - f('maos.folga'), 5, 16, 24);
  const mao = em(x).mao;
  // a coluna, com a polia no alto, à frente: tão perto quanto dá sem a cabeça (no fim, enrolada) chegar a menos de
  // `torre.folga` cm do trilho do carrinho (a face da coluna virada para a pessoa fica 8 cm à frente do centro da base)
  const c0: Calib = { frente, mao, torre: { base: [0, 0, 100], frente: [0, 0, -1], alturaDaPolia: obj('torre', 'poliaMax') }, repouso: 0 };
  let frenteDoCorpo = -1e9;
  for (const uu of [0, 0.5, 1]) for (const { p } of pontosDoBoneco(montar(corpo, c0, uu).e)) if (p[1] > 10) frenteDoCorpo = Math.max(frenteDoCorpo, p[2]);
  const torre: Torre = { base: [0, 0, frenteDoCorpo + f('torre.folga') + obj('torre', 'prof') * 0.11], frente: [0, 0, -1], alturaDaPolia: obj('torre', 'poliaMax') };
  c = { frente, mao, torre, repouso: 0 };
  c.repouso = montar(corpo, c, 0).polia.comp;
  CAL.set(corpo, c);
  return c;
}

function montar(corpo: Corpo, c: Calib, u: number, erro?: string) {
  let enrola = u,
    coxaExtra = 0,
    bacia = 0;
  if (erro === 'quadril') {
    enrola = u * f('erro.quadril.coluna');
    coxaExtra = f('erro.quadril.coxa') * u;
    bacia = f('erro.quadril.bacia') * u;
  }
  if (erro === 'bracos') enrola = u * f('erro.bracos.coluna');
  const t = tronco(corpo, c, enrola, coxaExtra, bacia);
  const pe = pernasPara(corpo, t);
  let peg = { R: noRef(t.cabeca, c.mao), L: noRef(t.cabeca, espelho(c.mao)) };
  if (erro === 'bracos') {
    // as mãos saem da cabeça e descem, em linha reta no tórax, até a frente do peito
    const desce = dirRef(t.torax, [0, -1, 0.35]);
    const d = f('erro.bracos.maos') * u;
    peg = { R: [peg.R[0] + desce[0] * d, peg.R[1] + desce[1] * d, peg.R[2] + desce[2] * d], L: [peg.L[0] + desce[0] * d, peg.L[1] + desce[1] * d, peg.L[2] + desce[2] * d] };
  }
  const roldana = centroDaRoldana(c.torre);
  const largura = corpo.m('mao.largura');
  const corda = montarCorda([peg.R, peg.L], largura, roldana);
  const e: Esq = resolverMembros(t, bracos(t, peg), pe);
  const polia = cenaDaPolia(c.torre, corda.bucha, c.repouso);
  return { e, corda, polia };
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const r = montar(corpo, c, u, erro);
  const pc = cordaTriceps(r.corda);
  const prims: Quadro['prims'] = [chao(-80, 80, -110, c.torre.base[2] + 50), ...colchonete(0, -22), ...r.polia.prims, ...pc.prims];
  const pecas: Peca[] = [{ t: 'colchonete', x0: 0, z0: -22 }, ...r.polia.pecas, pc.peca];
  return {
    esq: r.e,
    prims,
    pecas,
    fios: [{ id: 'cabo', comp: r.polia.comp, estica: true }],
    cargas: [],
    marcas: { bucha: r.corda.bucha, saiR: r.corda.ramos[0]!.sai, saiL: r.corda.ramos[1]!.sai, saida: r.polia.saida, pilha: [0, r.polia.subida, 0], ponta: r.corda.bucha },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const abdominalPolia: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'quina'],
  quadro,
  // reto do abdômen, principal; a biblioteca não conta secundário (revisão de anatomia de 02/11/2026)
  papeis: { abdomen: 'p' },
  trajetorias: { cotovelo: (q) => q.esq.lado.R.cotovelo },
};

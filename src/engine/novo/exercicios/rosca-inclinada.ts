// Rosca inclinada com halteres, no motor novo. Os números vêm da ficha (../dados/movimentos/rosca-inclinada.json); o
// braço é o de ./dobrar-o-cotovelo.ts. Sentado no banco regulável com o encosto inclinado, costas e cabeça apoiadas,
// pés no chão; os braços pendem na vertical (atrás da linha do tronco), palmas para a frente, e só o antebraço sobe,
// os dois juntos. O que se resolve, em vez de receber pronto:
//  - o quadril: desce até a nádega e a coxa apoiarem no assento e vai para trás até as costas (do meio para cima)
//    apoiarem no encosto; a bacia inclina para trás até o sacro também apoiar (o estofado amassa `apoio.amassa` cm);
//  - o pescoço dobra para trás até a nuca apoiar no encosto, dentro de uma faixa confortável;
//  - os pés: no chão, à frente do quadril; o joelho vem da cinemática.
import { calibragem } from '../calibragens';
import fichaPadrao from '../dados/movimentos/rosca-inclinada.json';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Ficha, Quadro } from '../movimento';
import { chao } from '../pecas';
import { bancoRegulavelNaCena, geometriaDoBanco } from '../pecas-de-cena/banco-regulavel';
import type { BancoRegulavel } from '../pecas-de-cena/banco-regulavel';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { REF0, dot, mix, sub } from '../vec';
import type { V3 } from '../vec';
import { bracoDaRosca, halterNaMao } from './dobrar-o-cotovelo';

/** As partes do corpo que apoiam no encosto (o meio e o alto das costas; o sacro) e no assento (nádega e coxa). */
const COSTAS = new Set(['tronco', 'cintura']);
const SACRO = new Set(['pelve', 'emendaDaCintura']);
const ASSENTO = new Set(['pelve', 'coxa']);
const CABECA = new Set(['cabeca']);
/** O halter sextavado de 10 lb (o de 25 lb atravessava o quadril com a palma para a frente; ver lote-5/rosca-inclinada.md). */
const HALTER = 'halterLeve';
const SEM_BRACO: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };

interface Sentado {
  t: Tronco;
  pernas: Record<Lado, PosePerna>;
  pelve: V3;
  frente: number;
  cervical: number;
}

export function criarRoscaInclinada(fichaJson: unknown): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  /** O banco: o meio do estofado em z0, de modo que a dobradiça fique em z = 0. */
  const BANCO: BancoRegulavel = { x0: 0, z0: -(obj('bancoRegulavel', 'estofadoComp') / 2 - obj('bancoRegulavel', 'assentoComp') - obj('bancoRegulavel', 'vao') / 2), encosto: f('encosto') };
  const G = geometriaDoBanco(BANCO);
  const meiaLarg = obj('bancoRegulavel', 'larg') / 2;

  /** Quanto um ponto entra no estofado do encosto (cm; positivo = dentro), ou −∞ se ele não fica sobre o encosto. */
  function noEncosto(p: V3): number {
    const r = sub(p, G.baseEncosto);
    const ao = dot(r, G.d);
    if (ao < 0 || ao > G.compEncosto || Math.abs(p[0] - BANCO.x0) > meiaLarg) return -Infinity;
    return G.est - dot(r, G.n);
  }
  /** Quanto um ponto entra no assento (cm), ou −∞ se ele não fica sobre o assento. */
  function noAssento(p: V3): number {
    const z0 = G.baseAssento[2];
    if (p[2] < z0 || p[2] > z0 + G.compAssento || Math.abs(p[0] - BANCO.x0) > meiaLarg) return -Infinity;
    return G.topoDoAssento - p[1];
  }
  const maisFundo = (e: Esq, partes: Set<string>, no: (p: V3) => number) => {
    let m = -Infinity;
    for (const x of pontosDoBoneco(e)) if (partes.has(x.parte)) m = Math.max(m, no(x.p));
    return m;
  };

  const pernas = (pelve: V3): Record<Lado, PosePerna> => {
    const pe = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * f('pes.meiaDistancia'), 0, pelve[2] + f('pes.aFrente')], dir: [sinal(k) * 0.15, 0, 1], calc: 0 }, polo: [sinal(k) * 0.25, 0.2, 1] });
    return { R: pe('R'), L: pe('L') };
  };
  const tronco = (corpo: Corpo, pelve: V3, frente: number, cervical: number) => resolverTronco(corpo, { pelve, frente, lombar: 0, toracica: f('toracica'), cervical, cabeca: f('cabeca') });
  const corpoTodo = (corpo: Corpo, pelve: V3, frente: number, cervical: number) => resolverMembros(tronco(corpo, pelve, frente, cervical), { R: SEM_BRACO, L: SEM_BRACO }, pernas(pelve));

  /** Com a bacia inclinada `frente` graus: o quadril no canto do banco, com o sacro no encosto e a nádega no assento. */
  function apoiar(corpo: Corpo, frente: number): V3 {
    const amassa = f('apoio.amassa');
    let pelve: V3 = [0, G.topoDoAssento + 10, 12];
    for (let i = 0; i < 5; i++) {
      const z = resolver1((zz) => maisFundo(corpoTodo(corpo, [0, pelve[1], zz], frente, 0), SACRO, noEncosto) - amassa, 40, -10, 22);
      pelve = [0, pelve[1], z];
      const y = resolver1((yy) => maisFundo(corpoTodo(corpo, [0, yy, z], frente, 0), ASSENTO, noAssento) - amassa, 70, 40, 22);
      pelve = [0, y, z];
    }
    return pelve;
  }
  /** O corpo sentado no banco, apoiado. */
  function sentar(corpo: Corpo): Sentado {
    const amassa = f('apoio.amassa');
    // a conta demorada (milhares de poses) vem guardada para o corpo do app: ../calibragens.ts
    const { pelve, frente, cervical } = calibragem(corpo, `${F.id}:sentado`, () => {
      // o tronco inclina para trás em volta do quadril até as costas apoiarem no encosto
      const frente = resolver1((fr) => maisFundo(corpoTodo(corpo, apoiar(corpo, fr), fr, 0), COSTAS, noEncosto) - amassa, -10, -70, 16);
      const pelve = apoiar(corpo, frente);
      // o pescoço dobra para trás até a nuca apoiar no encosto, sem passar da faixa da ficha
      const cervical = Math.max(f('cervical.min'), resolver1((c) => maisFundo(corpoTodo(corpo, pelve, frente, c), CABECA, noEncosto) - amassa, 20, -40, 24));
      return { pelve, frente, cervical };
    });
    return { t: tronco(corpo, pelve, frente, cervical), pernas: pernas(pelve), pelve, frente, cervical };
  }
  const CACHE = new WeakMap<Corpo, Sentado>();
  function sentado(corpo: Corpo): Sentado {
    let c = CACHE.get(corpo);
    if (!c) CACHE.set(corpo, (c = sentar(corpo)));
    return c;
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const s0 = sentado(corpo);
    const x = Math.max(0, Math.min(1, u));
    // no erro "ombros saem do encosto", a bacia fica no assento e o tronco inclina para a frente em volta dela
    const t = erro === 'ombro' ? tronco(corpo, s0.pelve, s0.frente + f('erro.ombro.tronco') * suave(x), s0.cervical) : s0.t;
    const cot = mix(erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.baixo'), erro === 'cotovelo' ? f('erro.cotovelo.cotovelo') : f('cotovelo.cima'), x);
    // os braços pendem na vertical (no mundo, e não no tronco): a direção do úmero é dada no referencial do mundo
    const aFrente = (erro === 'cotovelo' ? f('erro.cotovelo.braco') * suave(x) : erro === 'ombro' ? f('erro.ombro.braco') * suave(x) : 0);
    const braco = (k: Lado): PoseBraco =>
      bracoDaRosca(REF0, k, { paraFora: f('braco.paraFora'), aFrente, cotovelo: cot, supinacao: f('maos.supinacao'), diam: obj(HALTER, 'caboDiam'), prot: erro === 'ombro' ? f('erro.ombro.protracao') * suave(x) : 0 });
    const e = resolverMembros(t, { R: braco('R'), L: braco('L') }, s0.pernas);
    const B = bancoRegulavelNaCena(BANCO);
    const q: Quadro = { esq: e, prims: [chao(-80, 80, -110, 90), ...B.prims], pecas: [B.peca], fios: [], cargas: [], marcas: {}, vies: { maoR: 1, maoL: 1 } };
    for (const k of ['R', 'L'] as Lado[]) {
      const H = halterNaMao(e, k, HALTER, f('maos.encostaNaCabeca'));
      q.prims.push(...H.prims);
      q.pecas!.push(H.peca);
      q.cargas.push({ massa: f('carga'), pos: H.centro });
    }
    q.marcas = { halter: e.lado.R.pegada };
    return q;
  }
  return { ficha: F, quadro };
}

const R = criarRoscaInclinada(fichaPadrao);

export const roscaInclinada: Exercicio = {
  ficha: R.ficha,
  vistas: ['lateral', 'frontal'],
  quadro: R.quadro,
  // bíceps (principal, é o que a biblioteca conta); o antebraço "só ajuda" (correção de 04/11, SO_AJUDA das roscas)
  papeis: { biceps: 'p', antebraco: 'a' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};

// O núcleo dos crucifixos com halteres deitado no banco (o reto, ./crucifixo-halteres.ts, e o inclinado a 30°,
// ./crucifixo-inclinado-halteres.ts). Cada exercício traz a sua ficha de movimento e diz como o corpo deita no banco;
// o núcleo faz o resto:
//  - o tronco fica parado, apoiado no banco; os pés, presos no chão;
//  - o braço pela linha do ombro ao centro da pegada (`bracoNoArco`, de ./polia-bracos.ts, o mesmo do crucifixo na
//    polia): a linha gira em arco no tórax, de quase na direção do peito até o lado do corpo, e o cotovelo fica sempre
//    no mesmo ângulo (levemente dobrado), apontando para fora e para o chão. A linha vai `arco.el.topo` graus para o
//    lado da cabeça em cima e `arco.el.baixo` embaixo (no banco inclinado, em cima o braço fica perto da vertical, com
//    o halter acima do peito, e embaixo o halter fica na altura do peito);
//  - as palmas uma para a outra: o polegar aponta para a cabeça e o halter fica ao comprido do corpo;
//  - o começo do arco: o giro em que as cabeças de dentro dos dois halteres ficam a `halteres.folgaNoTopo` cm uma da
//    outra; o fim: o giro em que o centro do cotovelo fica `embaixo.cotovelo` cm acima (ou abaixo) do centro do ombro,
//    medido na direção do peito (`resolver1`, uma vez por corpo).
// Os erros (com os mesmos ids nas duas fichas): `supino` (o cotovelo dobra e estica), `fundo` (desce demais), `bater`
// (os halteres se encostam em cima) e `escapulas` (os ombros vão para a frente em cima).
import type { Prim } from '../desenho';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, dot, mix, mul, sub } from '../vec';
import { bracoNoArco } from './polia-bracos';

const rad = Math.PI / 180;
/** O halter de 25 lb (o da tabela), como nos supinos. */
const HALTER = 'halter';

/** O corpo deitado no banco: o tronco parado, as pernas com os pés no chão e o que a cena desenha (chão e banco). */
export interface Deitado {
  t: Tronco;
  pernas: Record<Lado, PosePerna>;
  prims: Prim[];
  pecas: Peca[];
}

interface Arco {
  psi: number;
  el: number;
  dobra: number;
  prot: number;
  elev: number;
}

/**
 * O exercício montado sobre o núcleo: `F` é a ficha de movimento; `deitar` põe o corpo no banco (uma vez por corpo).
 * Linhas da ficha que o núcleo lê: cotovelo, arco.el.topo, arco.el.baixo, cotovelo.paraOsPes, halteres.folgaNoTopo,
 * embaixo.cotovelo, escapula.retracao, escapula.depressao, carga e as dos erros que a ficha desenha
 * (erro.supino.dobra, erro.fundo.cotovelo, erro.bater.folga, erro.escap.protracao, erro.escap.elevacao).
 */
export function crucifixoDeitado(F: Ficha, deitar: (corpo: Corpo) => Deitado) {
  const f = (id: string) => {
    const x = F.param[id];
    if (!x) throw new Error(`a ficha ${F.id} não tem a linha "${id}"`);
    return x.v;
  };
  const tem = (erro: string) => F.erros.some((e) => e.id === erro);
  const DEITADO = new WeakMap<Corpo, Deitado>();
  const deitado = (corpo: Corpo) => {
    let d = DEITADO.get(corpo);
    if (!d) DEITADO.set(corpo, (d = deitar(corpo)));
    return d;
  };

  function braco(corpo: Corpo, t: Tronco, k: Lado, a: Arco): PoseBraco {
    const P = a.psi * rad;
    // o cotovelo aponta para fora do arco (no topo, para o lado; embaixo, para o chão) e um pouco para os pés
    const polo: [number, number, number] = [Math.cos(P), -f('cotovelo.paraOsPes'), -Math.sin(P)];
    const b = bracoNoArco(corpo, t.torax, k, { psi: a.psi, el: a.el, dobra: a.dobra, polo, supinacao: 0, diam: obj(HALTER, 'caboDiam'), prot: a.prot, elev: a.elev });
    // palmas uma para a outra: o polegar para a cabeça (o halter ao comprido do corpo)
    return { ...b, mao: { ...b.mao, polegar: dirRef(t.torax, [0, 1, 0]) } };
  }
  function montar(corpo: Corpo, a: Arco): Esq {
    const d = deitado(corpo);
    return resolverMembros(d.t, { R: braco(corpo, d.t, 'R', a), L: braco(corpo, d.t, 'L', a) }, d.pernas);
  }
  const esc = { prot: -f('escapula.retracao'), elev: -f('escapula.depressao') };
  /**
   * A folga entre as cabeças de dentro dos dois halteres (cm), como em ./supino-inclinado.ts, mas com sinal: negativa
   * quando o halter passa do meio do corpo (assim a conta só cresce com o giro, e `resolver1` acha um ponto só).
   */
  function folgaEntreHalteres(e: Esq): number {
    const L = e.lado.R;
    const meio = obj(HALTER, 'comp') / 2;
    const s = sinal('R');
    const dentro = Math.min(s * add(L.pegada, mul(L.mao.x, meio))[0], s * add(L.pegada, mul(L.mao.x, -meio))[0]);
    return 2 * dentro - obj(HALTER, 'cabecaLargura');
  }
  /** Quanto o centro do cotovelo fica acima do centro do ombro, na direção do peito (cm). */
  function cotoveloAcimaDoOmbro(e: Esq): number {
    const L = e.lado.R;
    return dot(sub(L.cotovelo, L.ombro), e.torax.z);
  }

  interface Calibrado {
    psiTopo: number;
    psiBaixo: number;
    psiBater: number;
    psiFundo: number;
    psiSupino: number;
  }
  const CAL = new WeakMap<Corpo, Calibrado>();
  function calibrar(corpo: Corpo): Calibrado {
    let c = CAL.get(corpo);
    if (c) return c;
    const dobra = f('cotovelo');
    const topo = (folga: number) => resolver1((psi) => folgaEntreHalteres(montar(corpo, { psi, el: f('arco.el.topo'), dobra, ...esc })) - folga, -40, 40, 30);
    const baixo = (alt: number, d: number) => resolver1((psi) => cotoveloAcimaDoOmbro(montar(corpo, { psi, el: f('arco.el.baixo'), dobra: d, ...esc })) - alt, 40, 140, 30);
    const psiTopo = topo(f('halteres.folgaNoTopo')),
      psiBaixo = baixo(f('embaixo.cotovelo'), dobra);
    c = {
      psiTopo,
      psiBaixo,
      psiBater: tem('bater') ? topo(f('erro.bater.folga')) : psiTopo,
      psiFundo: tem('fundo') ? baixo(f('erro.fundo.cotovelo'), dobra) : psiBaixo,
      // no erro "supino", o cotovelo dobrado desce à mesma altura do certo
      psiSupino: tem('supino') ? baixo(f('embaixo.cotovelo'), f('erro.supino.dobra')) : psiBaixo,
    };
    CAL.set(corpo, c);
    return c;
  }

  function arcoEm(c: Calibrado, u: number, erro?: string): Arco {
    const a: Arco = { psi: mix(c.psiTopo, c.psiBaixo, u), el: mix(f('arco.el.topo'), f('arco.el.baixo'), u), dobra: f('cotovelo'), ...esc };
    if (erro === 'supino') {
      a.psi = mix(c.psiTopo, c.psiSupino, u);
      a.dobra = mix(f('cotovelo'), f('erro.supino.dobra'), u);
    }
    if (erro === 'fundo') a.psi = mix(c.psiTopo, c.psiFundo, u);
    if (erro === 'bater') a.psi = mix(c.psiBater, c.psiBaixo, u);
    if (erro === 'escapulas') {
      const w = (1 - u) * (1 - u);
      a.prot = esc.prot + w * f('erro.escap.protracao');
      a.elev = esc.elev + w * f('erro.escap.elevacao');
    }
    return a;
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const d = deitado(corpo);
    const e = montar(corpo, arcoEm(calibrar(corpo), u, erro));
    const prims = [...d.prims];
    const pecas = [...d.pecas];
    const cargas = [];
    for (const k of ['R', 'L'] as Lado[]) {
      const L = e.lado[k];
      prims.push(...halter(L.pegada, L.mao.x, 0.2, HALTER));
      pecas.push({ t: 'halter', centro: L.pegada, eixo: L.mao.x, objeto: HALTER });
      cargas.push({ massa: f('carga'), pos: L.pegada });
    }
    return { esq: e, prims, pecas, fios: [], cargas, marcas: { halter: e.lado.R.pegada, halterL: e.lado.L.pegada }, vies: { maoR: 1, maoL: 1 } };
  }
  return { quadro };
}

// A barra fixa (pronada e supinada) no motor novo: o que as duas pegadas têm em comum. O corpo pendurado vem do núcleo
// ./pendurado.ts e a estação, de ../pecas-de-cena/barra-fixa.ts. Cada variação diz a largura da pegada, para onde
// aponta o polegar (pronada: para dentro, as palmas para a frente; supinada: para fora, as palmas para você) e para onde
// o cotovelo aponta (pronada: para os lados; supinada: à frente do corpo).
//
// O ciclo, numa fase só de subida (para a conferência ver as duas partes juntas):
//  - pendurado: braços estendidos (o cotovelo dobra o mínimo da ficha), os ombros um pouco subidos, sem despencar;
//  - as escápulas descem primeiro (`escapulas.fim`): os ombros se afastam das orelhas e, com o braço ainda estendido,
//    o corpo sobe alguns centímetros;
//  - os braços puxam (a partir de `puxada.inicio`): a bacia sobe até o queixo passar da barra, o tronco vai um pouco
//    para trás e o cotovelo desce para o lado das costelas. A altura de cada quadro é a mistura, sem tranco, da altura
//    com o braço estendido e a do topo; o cotovelo dobra o que precisar.
// Em todos os quadros o centro de massa fica na vertical da barra (o corpo não balança).
import type { Lado } from '../esqueleto';
import { sinal } from '../esqueleto';
import { daFicha } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { alturaDaBarra, estacaoDeBarra, raioDaBarra } from '../pecas-de-cena/barra-fixa';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { norm, noRef } from '../vec';
import type { V3 } from '../vec';
import { queixo } from './abdominal';
import { maosNaBarra, mix, montar, noPrumo, pernasSoltas, trecho } from './pendurado';
import type { Apoio, Forma } from './pendurado';

export type Pegada = 'pronada' | 'supinada';

export function criarBarraFixa(F: Ficha, pegada: Pegada) {
  const f = daFicha(F);
  const CAL = new WeakMap<Corpo, Map<string, number>>();

  const apoio = (corpo: Corpo): Apoio => ({ maos: maosNaBarra(f('pegada.largura') * corpo.m('largura.biacromial'), alturaDaBarra(), f('barra.z')), diam: obj('barraFixa', 'diam') });
  const polegar = (k: Lado): V3 => (pegada === 'pronada' ? [-sinal(k), 0, 0] : [sinal(k), 0, 0]);
  const vetor = (nome: string, k: Lado): V3 => norm([sinal(k) * f(`${nome}.fora`), f(`${nome}.cima`), f(`${nome}.frente`)]);

  /** A forma do corpo no ponto u da subida (0 = pendurado, 1 = topo), certa ou com um erro. */
  function forma(u: number, erro?: string): Forma {
    const esc = trecho(u, 0, f('escapulas.fim')),
      pux = trecho(u, f('puxada.inicio'), 1),
      // o tronco vai para trás e a cabeça recua antes de o rosto chegar à barra
      tras = trecho(u, f('puxada.inicio'), f('inclina.fim'));
    let elev = mix(f('escapula.pendurado'), f('escapula.encaixada'), esc) + (f('escapula.topo') - f('escapula.encaixada')) * pux;
    let cervical = f('pescoco.topo') * tras,
      cabeca = 0;
    let quadril = mix(f('quadril'), f('quadril.topo'), tras),
      joelho = mix(f('joelho'), f('joelho.topo'), tras),
      lombar = f('lombar.topo') * tras;
    if (erro === 'encolher') {
      // os ombros sobem até as orelhas e o pescoço estica (o queixo para cima) para passar da barra
      elev = mix(f('escapula.pendurado'), f('erro.encolher.elev'), pux);
      cervical = f('erro.encolher.pescoco') * pux;
      cabeca = f('erro.encolher.cabeca') * pux;
    }
    if (erro === 'balanco') {
      // o chute: o quadril e o joelho dobram no meio da subida e a lombar arqueia no começo
      const chute = Math.sin(Math.PI * u);
      quadril = mix(quadril, f('erro.balanco.quadril'), chute);
      joelho = mix(joelho, f('erro.balanco.joelho'), chute);
      lombar += f('erro.balanco.lombar') * (1 - u) * (1 - u);
    }
    return {
      frente: f('bacia.topo') * tras,
      lombar,
      toracica: f('toracica.topo') * tras,
      cervical,
      cabeca,
      pernas: pernasSoltas({ quadril, joelho, plantar: f('pe.plantar'), juntas: f('pernas.juntas') }),
      bracos: (k) => ({ polo: norm([0, 0, 0].map((_, i) => mix(vetor('polo.pendurado', k)[i]!, vetor('polo.topo', k)[i]!, pux)) as V3), polegar: polegar(k), elev, prot: f('escapula.prot.topo') * pux }),
    };
  }

  /**
   * A dobra do cotovelo no topo: a do corpo em que o queixo fica `queixo.acima` cm acima do alto da barra (com o corpo
   * no prumo). A subida anda pela dobra do cotovelo, e não pela altura: perto do braço estendido, um centímetro de
   * altura gira muito o cotovelo, e a subida pela altura dava um tranco no cotovelo no começo da puxada.
   */
  function cotoveloNoTopo(corpo: Corpo, erro?: string): number {
    const chave = `topo|${erro ?? ''}`;
    let m = CAL.get(corpo);
    if (!m) CAL.set(corpo, (m = new Map()));
    const ja = m.get(chave);
    if (ja !== undefined) return ja;
    const a = apoio(corpo),
      fm = forma(1, erro);
    const alvo = alturaDaBarra() + raioDaBarra() + (erro === 'encolher' ? f('erro.encolher.queixo') : f('queixo.acima'));
    // o queixo sobe com a bacia: bisseção na altura, com a bacia no prumo a cada passo
    let y = 0;
    let z = 0;
    for (let i = 0; i < 4; i++) {
      const lo = alturaDaBarra() - 140,
        hi = alturaDaBarra() - 20;
      let A = lo,
        B = hi;
      for (let j = 0; j < 36; j++) {
        const c = (A + B) / 2;
        if (queixo(montar(corpo, a, fm, [0, c, z]))[1] < alvo) A = c;
        else B = c;
      }
      y = (A + B) / 2;
      z = noPrumo(corpo, a, fm, { y: () => y }, true, z).pelve[2];
    }
    const cot = montar(corpo, a, fm, [0, y, z]).lado.R.ang.cotovelo;
    m.set(chave, cot);
    return cot;
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const a = apoio(corpo),
      fm = forma(u, erro);
    const pux = trecho(u, f('puxada.inicio'), 1);
    const topo = cotoveloNoTopo(corpo, erro === 'encolher' ? 'encolher' : undefined);
    const embaixo = erro === 'meia' ? f('erro.meia.cotovelo') : f('cotovelo.embaixo');
    // o cotovelo vai da dobra de baixo à do topo; a altura do corpo sai dela, com o corpo no prumo
    // o corpo sai do prumo no meio da subida e volta a ele antes de a cabeça chegar à barra
    const balanco = erro === 'balanco' ? f('erro.balanco.z') * Math.sin(Math.PI * u) ** 3 : 0;
    const e = noPrumo(corpo, a, fm, { cotovelo: mix(embaixo, topo, pux), balanco }, true).e;
    const est = estacaoDeBarra(f('barra.z'), [a.maos.R[0], a.maos.L[0]]);
    const R = raioDaBarra(),
      xM = obj('barraFixa', 'larg') / 2;
    return {
      esq: e,
      prims: est.prims,
      pecas: [est.estrutura, est.barra],
      fios: [],
      cargas: [],
      marcas: { 'barra.R': a.maos.R, 'barra.L': a.maos.L, 'eixo.a': [-xM, alturaDaBarra(), f('barra.z')], 'eixo.b': [xM, alturaDaBarra(), f('barra.z')], raio: [R, 0, 0], queixo: queixo(e), peito: noRef(e.torax, [0, -8, 0]) },
      vies: { maoR: 1, maoL: 1 },
    };
  }
  return { quadro, apoio };
}

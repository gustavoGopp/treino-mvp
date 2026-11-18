// Mesa flexora (deitado), no motor novo (primeira animação deste exercício: até aqui ele era só cartão de texto). Os
// números vêm da ficha (../dados/movimentos/mesa-flexora.json); a máquina, de ../pecas-de-cena/mesa-flexora.ts.
//
// Deitado de bruços na mesa, com o joelho no eixo da máquina: os centros dos joelhos ficam na linha do eixo e não saem
// dela. O corpo deita sobre o estofado: a coxa gira em volta do joelho até a pele da frente dela encostar no estofado
// das coxas; o quadril fica na ponta da coxa; o tronco inclina até o peito e a barriga encostarem no estofado do peito
// (a dobra no quadril deixa o quadril um pouco dobrado). As mãos fecham nos pegadores, à frente; a cabeça fica fora do
// estofado, o olhar no chão. Só as canelas se mexem: elas giram em volta do joelho, e o rolo, que corre na alavanca e
// fica logo acima do calcanhar, atrás da perna, gira com elas; a alavanca gira no mesmo eixo, e as placas sobem o arco
// do came (como na cadeira flexora aprovada).
//
// Nos erros: no "Levantar o quadril", a coxa gira em volta do joelho e o quadril sobe do estofado; a bacia vira para a
// frente e a lombar arqueia o mesmo tanto, com o peito no estofado (como na flexão de joelho com elástico aprovada,
// ./flexao-joelho.ts). No "Rolo no lugar errado", o corpo faz o movimento certo e o rolo fica no meio da panturrilha.
import ficha from '../dados/movimentos/mesa-flexora.json';
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, resolver2 } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import { geometriaDaMesaFlexora, mesaFlexora as maquina } from '../pecas-de-cena/mesa-flexora';
import type { PlanoDoEstofado } from '../pecas-de-cena/mesa-flexora';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, mix, mul, sub } from '../vec';
import type { V3 } from '../vec';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;

/** Direção no plano de lado (y, z), pelo ângulo em graus a partir de +z (para a cabeça), girando para +y. */
const noPlano = (a: number): V3 => [0, Math.sin(a * rad), Math.cos(a * rad)];
const anguloNoPlano = (v: V3) => Math.atan2(v[1], v[2]) / rad;

/** A distância de um ponto ao plano do topo de um estofado (positiva = acima dele, fora do estofado). */
const acimaDo = (p: V3, e: PlanoDoEstofado) => dot(sub(p, e.ponta), e.normal);
/** Quanto do estofado está sob o ponto (de 0 a `comp`, ao longo dele). */
const aoLongo = (p: V3, e: PlanoDoEstofado) => dot(sub(p, e.ponta), e.ao);

/** O que não muda no ciclo, calculado uma vez por corpo: a coxa, a inclinação da bacia. */
interface Base {
  /** O ângulo da coxa, do joelho para o quadril (graus, como em `noPlano`). */
  coxa: number;
  /** A inclinação da bacia (como em resolverTronco) e a lombar além da curva de repouso. */
  frente: number;
  lombar: number;
}

const joelhoNoEixo = (corpo: Corpo, k: Lado): V3 => {
  const G = geometriaDaMesaFlexora();
  return [sinal(k) * corpo.m('quadril.meiaDistancia'), G.eixo[1], G.eixo[2]];
};

/** O ponto mais baixo (contra o plano do estofado) de umas partes do corpo, só onde o estofado está embaixo (de s0 a s1 cm ao longo dele). */
function folga(e: Esq, partes: string[], est: PlanoDoEstofado, s0 = 0, s1 = est.comp): number {
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!partes.includes(parte)) continue;
    const s = aoLongo(p, est);
    if (s < s0 || s > s1) continue;
    m = Math.min(m, acimaDo(p, est));
  }
  return m;
}

/** Os braços: as mãos fecham nos pegadores, os cotovelos para fora e para trás. */
function bracos(): Record<Lado, PoseBraco> {
  const G = geometriaDaMesaFlexora();
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const p = G.pegadores[k === 'R' ? 0 : 1]!;
    return { pegada: p.centro, polo: [s * 0.8, 0.2, -0.5], mao: { polegar: p.dir, forma: 'pegada', diam: 4 } };
  };
  return { R: braco('R'), L: braco('L') };
}

/** O corpo: a coxa no ângulo `coxa` (graus), a bacia em `frente`, a lombar, e o joelho dobrado `joelho` graus. */
function montar(corpo: Corpo, coxa: number, frente: number, lombar: number, joelho: number): Esq {
  const L = corpo.m('coxa.comp');
  const K = joelhoNoEixo(corpo, 'R');
  const dC = noPlano(coxa);
  const pelve: V3 = [0, K[1] + L * dC[1], K[2] + L * dC[2]];
  const t = resolverTronco(corpo, { pelve, frente, lombar, cervical: f('cervical'), cabeca: 0 });
  // do quadril ao joelho, a coxa aponta para os pés (coxa + 180); a canela gira para cima em volta do joelho
  const aCoxa = coxa + 180,
    aCanela = aCoxa - joelho;
  const perna: PosePerna = { coxa: noPlano(aCoxa), canela: noPlano(aCanela), peDir: noPlano(aCanela + 90 - f('tornozelo.flexaoPlantar')), polo: noPlano(aCoxa - 90) };
  return resolverMembros(t, bracos(), { R: perna, L: perna });
}

function base(corpo: Corpo): Base {
  return calibragem(corpo, 'mesa-flexora:corpo', () => {
    const G = geometriaDaMesaFlexora();
    const amassa = f('estofado.amassa');
    const lombar = f('lombar');
    // a coxa gira em volta do joelho e a bacia inclina até a coxa e a frente da bacia encostarem no estofado das coxas
    // e a barriga e o peito no estofado do peito (amassando um pouco)
    const [coxa, frente] = resolver2((a, fr) => {
      const e = montar(corpo, a, fr, lombar, f('joelho.inicio'));
      return [folga(e, ['coxa', 'pelve'], G.coxa) + amassa, folga(e, ['tronco', 'emendaDaCintura', 'pelve'], G.peito) + amassa];
    }, 20, 85, 16);
    return { coxa, frente, lombar };
  });
}

/** O ângulo da coxa com o quadril `sobe` cm acima do lugar (a coxa gira em volta do joelho). */
const coxaComOQuadrilAcima = (corpo: Corpo, b: Base, sobe: number) => Math.asin(Math.min(1, Math.sin(b.coxa * rad) + sobe / corpo.m('coxa.comp'))) / rad;
/**
 * No erro do quadril: quanto a bacia vira para o peito voltar ao estofado, com o quadril `sobe` cm acima do lugar.
 * Calculado uma vez por corpo em alguns pontos, de 0 ao que a ficha pede, e lido entre eles (a conta mede a pele a
 * cada passo: feita a cada quadro, atrasaria o guia).
 */
function giroNoErro(corpo: Corpo, b: Base, sobe: number): number {
  const N = 8,
    max = f('erro.quadril.sobe');
  const tabela = calibragem(corpo, 'mesa-flexora:quadril', () => {
    const G = geometriaDaMesaFlexora();
    return Array.from({ length: N + 1 }, (_, i) => {
      const h = (max * i) / N;
      if (i === 0) return 0;
      const coxa = coxaComOQuadrilAcima(corpo, b, h);
      return resolver1((g) => folga(montar(corpo, coxa, b.frente + g, b.lombar - g, f('joelho.inicio')), ['tronco'], G.peito) + f('estofado.amassa'), 0, 60, 30);
    });
  });
  const x = Math.min(N, Math.max(0, (sobe / max) * N));
  const i = Math.min(N - 1, Math.floor(x));
  return mix(tabela[i]!, tabela[i + 1]!, x - i);
}

/** O esqueleto num instante: o joelho dobrado `joelho` graus; no erro, o quadril sobe `sobe` cm. */
function esqueleto(corpo: Corpo, joelho: number, sobe = 0): Esq {
  const b = base(corpo);
  if (sobe <= 0) return montar(corpo, b.coxa, b.frente, b.lombar, joelho);
  const giro = giroNoErro(corpo, b, sobe);
  return montar(corpo, coxaComOQuadrilAcima(corpo, b, sobe), b.frente + giro, b.lombar - giro, joelho);
}

/**
 * Onde fica o centro do rolo: atrás da canela direita, a `s` cm do joelho ao longo dela, com a pele encostada no rolo
 * (`afasta` cm do eixo da canela). Devolve o ângulo da alavanca (graus, como na peça) e a distância do eixo ao rolo.
 */
function rolo(e: Esq, s: number, afasta: number) {
  const R = e.lado.R;
  const aCanela = anguloNoPlano(sub(R.tornozelo, R.joelho));
  const c = add(add(R.joelho, mul(noPlano(aCanela), s)), mul(noPlano(aCanela - 90), afasta));
  const G = geometriaDaMesaFlexora();
  const v: V3 = [0, c[1] - G.eixo[1], c[2] - G.eixo[2]];
  return { alavanca: 180 - anguloNoPlano(v), dist: Math.hypot(v[1], v[2]), centro: c };
}
/**
 * Quanto o centro do rolo fica afastado do eixo da canela para a pele encostar nele (sem afundar), a `s` cm do joelho:
 * medido na pele do Boneco (a canela e o pé andam juntos, girando no joelho; basta uma pose).
 */
function afastamento(corpo: Corpo, s: number): number {
  return calibragem(corpo, `mesa-flexora:rolo:${s.toFixed(2)}`, () => {
    const e = esqueleto(corpo, f('joelho.inicio'));
    const rr = obj('mesaFlexora', 'roloDiam') / 2,
      meio = obj('mesaFlexora', 'roloComp') / 2;
    const pele = pontosDoBoneco(e).filter((x) => (x.parte === 'canela' || x.parte === 'pe') && x.p[0] > -meio && x.p[0] < meio - 6);
    const folga = (k: number) => {
      const c = rolo(e, s, k).centro;
      return Math.min(...pele.map(({ p }) => Math.hypot(p[1] - c[1], p[2] - c[2]))) - rr;
    };
    return resolver1((k) => folga(k) + f('rolo.amassa'), 0, 25, 30);
  });
}

/** O que o quadro mostra da máquina: de trás do rolo à frente dos pegadores, do chão até `quadro.ate` (a torre é cortada). */
function noQuadro(): V3[] {
  const M = maquina({ alavanca: 0, inicio: 0, rolo: 40 });
  const { zTras, zFrente, xDireita, xEsquerda } = M.extremos;
  const y = f('quadro.ate');
  return [
    [xDireita, 0, zTras],
    [xEsquerda, 0, zFrente],
    [xDireita, y, zTras],
    [xEsquerda, y, zFrente],
  ];
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const joelho = mix(f('joelho.inicio'), f('joelho.fim'), u);
  const e = esqueleto(corpo, joelho, erro === 'quadril' ? f('erro.quadril.sobe') * u : 0);
  const perna = corpo.m('perna.comp');
  // o rolo logo acima do calcanhar (certo) ou no meio da panturrilha (erro); a regulagem do rolo não muda no ciclo
  const noErro = erro === 'rolo';
  const s = noErro ? perna * f('erro.rolo.naCanela') : perna - f('rolo.acimaDoTornozelo');
  const k = afastamento(corpo, s);
  const r = rolo(e, s, k);
  const r0 = rolo(esqueleto(corpo, f('joelho.inicio')), s, k);
  const M = maquina({ alavanca: r.alavanca, inicio: r0.alavanca, rolo: r0.dist, placas: f('placas'), noQuadro: noQuadro() });
  return {
    esq: e,
    prims: [chao(-90, 90, M.extremos.zTras - 10, M.extremos.zFrente + 10), ...M.prims],
    pecas: [M.fixa, M.movel],
    fios: [],
    cargas: [],
    marcas: { eixo: M.eixo, rolo: M.centroRolo, pilha: [0, M.subida, 0], alavanca: [r.alavanca, r0.alavanca, r0.dist] },
  };
}

export const mesaFlexora: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'cima'],
  quadro,
  // posteriores da coxa, sem secundário (a biblioteca)
  papeis: { posteriores: 'p' },
  trajetorias: { calcanhar: (q) => q.esq.lado.R.calcanhar, rolo: (q) => q.marcas.rolo! },
};

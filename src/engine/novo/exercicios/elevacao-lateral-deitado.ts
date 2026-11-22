// Elevação lateral deitado de lado com halter, no motor novo (primeira animação deste exercício: até aqui ele era só
// cartão de texto). Os números vêm da ficha (../dados/movimentos/elevacao-lateral-deitado.json).
// Deitado sobre o lado esquerdo, de frente para quem olha na vista de frente, a cabeça apoiada no braço de baixo,
// estendido acima da cabeça, os dois joelhos dobrados, a perna de cima deitada sobre a de baixo: o corpo deitado é o do
// núcleo da abdução aprovada (./quadril-deitado-de-lado.ts). A mão de cima (a direita) segura o halter leve: embaixo, o
// braço fica à frente do corpo, com o halter pendendo para o chão na frente da coxa de cima; ele sobe em arco, um pouco
// à frente do plano do corpo, até quase a vertical, com o cotovelo levemente dobrado (o braço da elevação com halteres
// aprovada, ./elevar-o-braco.ts, no referencial do tórax deitado).
// O que se resolve, em vez de receber pronto:
//  - a perna de baixo desce até encostar no chão (`pernaNoPiso`); a de cima fecha até deitar sobre ela;
//  - embaixo, a elevação do braço em que o halter fica à folga pedida da coxa (como na elevação em pé aprovada).
// As contas da pose parada vêm guardadas para o corpo do app (../calibragens.ts).
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/elevacao-lateral-deitado.json';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import { folgaEntreAsPernas } from '../regras/quadril-abrir-e-fechar';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, norm, perp } from '../vec';
import type { V3 } from '../vec';
import { folgaDasPernas } from './dobrar-o-quadril';
import type { Esfera } from './dobrar-o-quadril';
import { noPlano } from './elevar-o-braco';
import { direcao, eixosDaBacia, pernaNoPiso, troncoDeLado } from './quadril-deitado-de-lado';
import type { OpcoesDeLado } from './quadril-deitado-de-lado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const H = 'halterLeve';

const opcoes = (rola = 0): OpcoesDeLado => ({
  baixo: 'L',
  deFrente: true,
  piso: f('piso'),
  rola,
  bracoDeBaixo: { abre: f('bracoDeBaixo.abre'), cotovelo: f('bracoDeBaixo.cotovelo'), prot: f('bracoDeBaixo.prot'), elev: f('bracoDeBaixo.elev') },
  maoDeCima: { frente: f('maoDeCima.frente'), abaixo: f('maoDeCima.abaixo') },
  cabecaNoBraco: f('cabecaNoBraco'),
});

interface Pedido {
  /** A elevação do úmero no tórax, a partir da linha do corpo (para os pés), e o plano dela (graus à frente). */
  a: number;
  plano: number;
  /** O cotovelo dobrado (graus). */
  cotovelo: number;
  /** O quanto a bacia e o tronco rolam para trás (graus; o erro de rolar). */
  rola: number;
}

/** O braço de cima, no referencial do tórax: o de ./elevar-o-braco.ts (o úmero no plano, o cotovelo conduzindo, a pegada neutra). */
function bracoQueSobe(t: Tronco, p: Pedido): PoseBraco {
  const s = sinal('R');
  const n = noPlano(p.a, p.plano);
  const esp = (v: V3): V3 => dirRef(t.torax, [s * v[0], v[1], v[2]]);
  const umero = esp(n.umero);
  const cot = p.cotovelo * rad;
  const elev = Math.max(0, Math.min(1, Math.sin(Math.max(0, p.a) * rad)));
  const giro = f('cotovelo.giro') * elev * rad;
  const dobra = norm(add(mul(esp(n.frente), Math.cos(giro)), mul(esp(n.sobe), -Math.sin(giro))));
  const antebraco = norm(add(mul(umero, Math.cos(cot)), mul(dobra, Math.sin(cot))));
  const pg = giro - f('polegar.paraCima') * elev * rad;
  const polegar = norm(add(mul(esp(n.frente), Math.cos(pg)), mul(esp(n.sobe), -Math.sin(pg))));
  return { umero, antebraco, polo: mul(dobra, -1), mao: { polegar, forma: 'pegada', diam: obj(H, 'caboDiam') } };
}

/** As duas pernas com os joelhos dobrados: a de baixo encosta no chão, a de cima deita sobre ela. */
function pernas(t: Tronco, bracos: Record<Lado, PoseBraco>, o: OpcoesDeLado): Record<Lado, PosePerna> {
  const fq = f('pernas.quadril'),
    fk = fq - f('pernas.joelho');
  const E = eixosDaBacia(t, 'L');
  const peDir = (d: V3) => norm(perp(direcao(t, 'L', fk + 90 - f('pe.flexaoPlantar'), 0), d));
  const deCima = (abre: number): PosePerna => {
    const c = direcao(t, 'R', fq, abre),
      d = direcao(t, 'R', fk, abre);
    return { coxa: c, canela: d, polo: E.frente, peDir: peDir(d) };
  };
  const L = pernaNoPiso(t, bracos, o, 'L', deCima(0), fq, fk, peDir);
  // a perna de cima fecha (para dentro, negativo) até a pele dela encostar na da perna de baixo
  const a = resolver1((ab) => folgaEntreAsPernas(resolverMembros(t, bracos, { R: deCima(ab), L }), t.corpo) - f('pernas.folga'), 10, -30, 22);
  return { R: deCima(a), L };
}

/** As pernas, guardadas por corpo (com a bacia sem rolar). */
const PERNAS = new WeakMap<Corpo, Record<Lado, PosePerna>>();
function pernasParadas(corpo: Corpo): Record<Lado, PosePerna> {
  let p = PERNAS.get(corpo);
  if (p) return p;
  // a conta demorada vem guardada para o corpo do app: ../calibragens.ts
  p = calibragem(corpo, 'elevacao-lateral-deitado:pernas', () => {
    const { t, bracos } = troncoDeLado(corpo, opcoes());
    return pernas(t, bracos, opcoes());
  });
  PERNAS.set(corpo, p);
  return p;
}

function montar(corpo: Corpo, p: Pedido): Esq {
  const o = opcoes(p.rola);
  const { t, bracos } = troncoDeLado(corpo, o);
  // as pernas ficam onde estão (no erro de rolar, só a bacia e o tronco rolam)
  return resolverMembros(t, { L: bracos.L, R: bracoQueSobe(t, p) }, pernasParadas(corpo));
}

/** O halter, como esferas, para a folga até as pernas (o cabo na direção do polegar). */
function esferas(e: Esq): Esfera[] {
  const L = e.lado.R;
  const eixo = mul(L.mao.x, sinal('R'));
  const ra = obj(H, 'cabecaLargura') / 2,
    c0 = obj(H, 'caboComp') / 2,
    c1 = obj(H, 'comp') / 2;
  const out: Esfera[] = [];
  for (const s of [-1, 1]) for (const fr of [0.2, 0.5, 0.8]) out.push({ c: add(L.pegada, mul(eixo, s * (c0 + (c1 - c0) * fr))), r: ra });
  return out;
}

/** O braço passa do plano de baixo para o da subida na primeira parte do caminho, sem tranco. */
const noPlanoDeSubida = (u: number) => suave(Math.min(1, u / f('plano.transicao')));

/** Embaixo: a elevação em que o halter fica à folga pedida da pele das pernas. */
const A0 = new WeakMap<Corpo, number>();
function elevacaoEmbaixo(corpo: Corpo): number {
  let a0 = A0.get(corpo);
  if (a0 !== undefined) return a0;
  a0 = calibragem(corpo, 'elevacao-lateral-deitado:embaixo', () => resolver1((a) => folgaDasPernas(montar(corpo, { a, plano: f('plano.baixo'), cotovelo: f('cotovelo'), rola: 0 }), esferas(montar(corpo, { a, plano: f('plano.baixo'), cotovelo: f('cotovelo'), rola: 0 }))) - f('carga.folga'), 0, 60, 24));
  A0.set(corpo, a0);
  return a0;
}

function pedido(corpo: Corpo, u: number, erro?: string): Pedido {
  const a0 = elevacaoEmbaixo(corpo);
  const p: Pedido = { a: mix(a0, f('braco.topo'), u), plano: mix(f('plano.baixo'), f('plano'), noPlanoDeSubida(u)), cotovelo: f('cotovelo'), rola: 0 };
  if (erro === 'rola') {
    // a bacia e o tronco rolam para trás e levam o braço junto
    p.rola = f('erro.rola.graus') * suave(u);
  } else if (erro === 'embalo') p.a = mix(a0, f('braco.topo') + f('erro.embalo.alem'), u);
  else if (erro === 'cotovelo') p.cotovelo = mix(f('cotovelo'), f('erro.cotovelo.dobra'), u);
  return p;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const e = montar(corpo, pedido(corpo, u, erro));
  const L = e.lado.R;
  const eixo = mul(L.mao.x, sinal('R'));
  return {
    esq: e,
    prims: [chao(-110, 110, -60, 60), ...halter(L.pegada, eixo, 0.4, H)],
    pecas: [{ t: 'halter', centro: L.pegada, eixo, objeto: H }],
    fios: [],
    cargas: [{ massa: f('carga'), pos: L.pegada }],
    marcas: { piso: [0, f('piso'), 0], halter: L.pegada },
  };
}

export const elevacaoLateralDeitado: Exercicio = {
  ficha: F,
  vistas: ['frontal', 'cima'],
  quadro,
  // a lateral do ombro (principal), sem secundário, como a ficha da técnica e a biblioteca; a frente do ombro listrada
  // (só ajuda), como nas elevações aprovadas
  papeis: { 'deltLat:R': 'p', 'deltAnt:R': 'a' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada },
};

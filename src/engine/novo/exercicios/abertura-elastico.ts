// Abertura com o elástico entre as mãos, sem ponto de ancoragem, no motor novo (primeira animação deste exercício: até
// aqui ele era só cartão de texto). Os números vêm da ficha (../dados/movimentos/abertura-elastico.json).
// Em pé, braços estendidos à frente na altura do peito, palmas para baixo; o elástico longo em laço
// (../dados/objetos/elastico-longo.json) dobrado entre as mãos: cada mão fecha sobre as duas camadas da faixa, e o
// resto do laço fica pendurado do lado de fora do punho. Os braços, quase retos, abrem para os lados e um pouco para
// cima até a faixa chegar perto do peito. O corpo em pé é o do núcleo ./polia-bracos.ts (o do face pull com elástico
// aprovado); o braço segue a linha do ombro à mão (`bracoNoArco`, o dos crucifixos na polia aprovados). O que ele
// resolve, em vez de receber pronto:
//  - o começo do arco: onde as mãos ficam à distância pedida uma da outra (onde a mão fecha na faixa);
//  - o fim do arco: onde a faixa, reta entre as mãos, passa à folga pedida da pele do peito;
//  - o comprimento em repouso da faixa entre as mãos: o que ela tem no começo, dividido pelo quanto já está esticada.
// No erro "soltar uma ponta", a mão esquerda abre, o braço dela vai para trás e a faixa volta para a mão direita,
// passando na frente do rosto.
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/abertura-elastico.json';
import type { Esq, Lado, PoseBraco, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1, suave } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { chao } from '../pecas';
import type { Peca } from '../pecas';
import { faixaElastica } from '../pecas-de-cena/elastico-longo';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, dot, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { comprimento, fioPorFora } from './elastico-faixa';
import { bracoNoArco, equilibrar, montarEmPe } from './polia-bracos';
import type { PedidoEmPe, PelveParada } from './polia-bracos';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const LACO = 'elasticoLongo';
/** O polo do cotovelo (lado esquerdo; o direito espelha x): para fora e um pouco para baixo. */
const POLO: V3 = [1, -0.35, 0];

interface Arco {
  /** Quanto o braço está aberto (graus a partir da frente) e a altura da linha do ombro à mão (graus acima do plano do tórax). */
  psi: number;
  el: number;
}
interface Calibrado {
  pelve: PelveParada;
  psi0: number;
  psi1: number;
  /** O comprimento em repouso da faixa entre as mãos (cada uma das duas camadas). */
  repouso: number;
}

/** Os braços no arco: o direito e o esquerdo, cada um com o seu ângulo (no erro "soltar", o esquerdo vai mais para trás). */
function bracos(corpo: Corpo, t: Tronco, R: Arco, L: Arco, o: Opcoes): Record<Lado, PoseBraco> {
  const lado = (k: Lado, a: Arco): PoseBraco => {
    const b = bracoNoArco(corpo, t.torax, k, { psi: a.psi, el: a.el, dobra: o.dobra, polo: POLO, supinacao: o.supinacao, diam: obj(LACO, 'pegadaDiam'), elev: o.elev });
    if (k === 'L' && o.maoL === 'aberta') b.mao = { ...b.mao, forma: 'aberta' };
    return b;
  };
  return { R: lado('R', R), L: lado('L', L) };
}

function pedido(corpo: Corpo, R: Arco, L: Arco, o: Opcoes): PedidoEmPe {
  const w = f('pes.meiaDistancia'),
    z = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo');
  return { pes: { R: { bola: [-w, 0, z] }, L: { bola: [w, 0, z] } }, joelho: f('joelho'), tronco: f('tronco'), cervical: f('cervical'), cabeca: f('cabeca'), bracos: (t) => bracos(corpo, t, R, L, o) };
}
/** O cotovelo, a clavícula além do ritmo, a pegada (graus a partir da neutra) e a mão esquerda no erro "soltar". */
interface Opcoes {
  dobra: number;
  elev: number;
  supinacao: number;
  maoL?: 'aberta';
}
/** O braço e a mão certos no ponto u do arco. */
const certo = (u: number): Opcoes => ({ dobra: f('cotovelo'), elev: 0, supinacao: mix(f('mao.supinacao.inicio'), f('mao.supinacao.fim'), u) });
const simetrico = (corpo: Corpo, a: Arco, u: number) => pedido(corpo, a, a, certo(u));

/** As partes que a faixa contorna pela frente (no fim, ela encosta nos antebraços junto dos punhos). */
const PARTES = ['ante', 'braco', 'tronco', 'pescoco', 'cabeca'];
/** A faixa esticada entre as mãos: a reta, ou o caminho mais curto que contorna os antebraços e o peito pela frente. */
const faixaEntre = (e: Esq): V3[] => fioPorFora(e, e.lado.R.pegada, e.lado.L.pegada, { lado: [0, 0, 1], partes: PARTES, folga: obj(LACO, 'esp') / 2 + 0.2, fatia: 2.5, livreNasPontas: 3 });

/** A menor distância (cm) da faixa à pele do peito e do pescoço. */
function folgaAoPeito(e: Esq, pts: V3[]): number {
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'tronco' && parte !== 'pescoco') continue;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]!,
        ab = sub(pts[i]!, a);
      const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
      min = Math.min(min, dist(p, add(a, mul(ab, t))) - obj(LACO, 'esp') / 2);
    }
  }
  return min;
}

function calibrar(corpo: Corpo): Calibrado {
  return calibragem(corpo, `${F.id}:calibrar`, () => {
    const meioDoPe = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo') - corpo.m('pe.calcanharABola') / 2;
    let pelve: PelveParada = { y: 90, z: 0 },
      psi0 = 20,
      psi1 = 75;
    for (let i = 0; i < 2; i++) {
      // o quadril parado onde o centro de massa, com os braços no meio do arco, cai sobre o meio do pé
      pelve = equilibrar(corpo, simetrico(corpo, { psi: (psi0 + psi1) / 2, el: (f('inicio.altura') + f('fim.altura')) / 2 }, 0.5), meioDoPe);
      const pv = pelve;
      // o começo: o centro de cada mão a `inicio.maos` do meio
      psi0 = resolver1((p) => -montarEmPe(corpo, simetrico(corpo, { psi: p, el: f('inicio.altura') }, 0), pv).lado.R.pegada[0] - f('inicio.maos'), 0, 60, 30);
      // o fim: a faixa à folga pedida do peito (a folga diminui enquanto o braço abre)
      psi1 = resolver1((p) => {
        const e = montarEmPe(corpo, simetrico(corpo, { psi: p, el: f('fim.altura') }, 1), pv);
        return folgaAoPeito(e, faixaEntre(e)) - f('fim.folgaAoPeito');
      }, 50, 110, 26);
    }
    const e0 = montarEmPe(corpo, simetrico(corpo, { psi: psi0, el: f('inicio.altura') }, 0), pelve);
    const repouso = comprimento(faixaEntre(e0)) / f('elastico.esticaNoInicio');
    return { pelve, psi0, psi1, repouso };
  });
}

/** O arco no ponto u: do começo ao fim, abrindo e subindo juntos. */
const arco = (c: Calibrado, u: number): Arco => ({ psi: mix(c.psi0, c.psi1, u), el: mix(f('inicio.altura'), f('fim.altura'), u) });

/**
 * O resto do laço, pendurado do lado de fora de um punho: as duas camadas descem lado a lado e fazem a volta embaixo.
 * `fora`: a direção para fora do punho (do lado do dedo mínimo); `resto`: o comprimento de faixa pendurado.
 */
function pendurado(pegada: V3, fora: V3, resto: number): V3[] {
  const r = 2;
  const lado = norm([fora[0], 0, fora[2]]);
  const topo = add(pegada, mul(lado, obj(LACO, 'pegadaDiam') / 2 + 0.6));
  const desce = Math.max(1, (resto - Math.PI * r) / 2);
  const pts: V3[] = [];
  const frente = norm([-lado[2], 0, lado[0]]);
  pts.push(add(topo, mul(frente, -r)), add(add(topo, mul(frente, -r)), [0, -desce, 0]));
  for (let i = 1; i < 8; i++) {
    const a = Math.PI * (i / 8);
    pts.push(add(add(topo, [0, -desce, 0]), add(mul(frente, -r * Math.cos(a)), [0, -r * Math.sin(a), 0])));
  }
  pts.push(add(add(topo, mul(frente, r)), [0, -desce, 0]), add(topo, mul(frente, r)));
  return pts;
}

/** A faixa solta no erro: da mão direita, em arco, até a ponta que volta, `frente` cm à frente do rosto (da ponta do nariz). */
function soltaNoRosto(e: Esq, frente: number): V3[] {
  const a = e.lado.R.pegada;
  const rosto = e.cabeca.o;
  const nariz = Math.max(...pontosDoBoneco(e).filter((p) => p.parte === 'cabeca').map((p) => p.p[2]));
  const ponta: V3 = [rosto[0] - 4, rosto[1] - 6, nariz + frente];
  const pts: V3[] = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const p = add(mul(a, 1 - t), mul(ponta, t));
    // a faixa solta faz uma barriga para baixo e para a frente (ainda voltando)
    pts.push(add(p, [0, -10 * 4 * t * (1 - t), 6 * 4 * t * (1 - t)]));
  }
  return pts;
}

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const c = calibrar(corpo);
  const A = arco(c, u);
  let R = A,
    L = A;
  const o: Opcoes = certo(u);
  if (erro === 'cotovelos') {
    o.dobra = mix(f('cotovelo'), f('erro.cotovelos.cotovelo'), suave(u));
    R = L = { psi: A.psi + f('erro.cotovelos.abre') * suave(u), el: A.el };
  }
  if (erro === 'encolher') o.elev = f('erro.encolher.elev') * suave(u);
  if (erro === 'solta') {
    L = { psi: A.psi + f('erro.solta.abre') * suave(u), el: A.el };
    if (u > 0.5) o.maoL = 'aberta';
  }
  const e = montarEmPe(corpo, pedido(corpo, R, L, o), c.pelve);
  const pR = e.lado.R.pegada,
    pL = e.lado.L.pegada;
  const caminho = faixaEntre(e);
  const entre = comprimento(caminho);
  const estica = entre / c.repouso;
  // o resto do laço (as duas pontas, fora das mãos): fixo, não estica
  const resto = Math.max(4, (obj(LACO, 'comp') - 2 * c.repouso) / 2);
  const foraR = norm(sub(pR, pL)),
    foraL = mul(foraR, -1);
  const pecas: Peca[] = [];
  const prims: Quadro['prims'] = [chao(-100, 100, -60, 100)];
  let comp: number;
  const soltou = erro === 'solta' && u > 0.5;
  if (soltou) {
    // a faixa solta volta para a mão direita, passando na frente do rosto
    const pts = soltaNoRosto(e, f('erro.solta.rosto'));
    const fx = faixaElastica(pts, 1, 'faixa-solta');
    pecas.push(fx.peca);
    const pd = faixaElastica(pendurado(pR, foraR, resto), 1, 'pontaR');
    pecas.push(pd.peca);
    comp = comprimento(pts) * 2 + resto;
  } else {
    const fx = faixaElastica(caminho, estica, 'faixa');
    prims.push(...fx.prims);
    pecas.push(fx.peca);
    for (const [k, p, fora] of [['R', pR, foraR], ['L', pL, foraL]] as const) pecas.push(faixaElastica(pendurado(p, fora, resto), 1, `ponta${k}`).peca);
    comp = 2 * entre + 2 * resto;
  }
  return {
    esq: e,
    prims,
    pecas,
    // o laço inteiro: as duas camadas entre as mãos e as duas pontas penduradas (que não esticam); o quanto estica a
    // faixa entre as mãos é a regra "abertura-elastico-esticado-entre-as-maos", pela marca `trechoLivre`
    fios: [{ id: 'elastico', comp, estica: true, objeto: LACO }],
    cargas: [],
    marcas: { mao: pR, maoL: pL, trechoLivre: [entre, c.repouso, 0] },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const aberturaElastico: Exercicio = {
  ficha: F,
  vistas: ['cima', 'posterior'],
  quadro,
  // o ombro de trás (principal), sem secundário (a ficha da técnica: não junta as escápulas como o face pull)
  papeis: { deltPost: 'p' },
  trajetorias: { mão: (q) => q.esq.lado.R.pegada },
};


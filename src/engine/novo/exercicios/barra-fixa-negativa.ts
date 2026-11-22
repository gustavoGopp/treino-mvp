// Barra fixa só na descida (negativa), no motor novo. Os números vêm da ficha
// (../dados/movimentos/barra-fixa-negativa.json); o corpo pendurado, do núcleo ./pendurado.ts; a estação, da barra
// fixa (../pecas-de-cena/barra-fixa.ts, na mesma regulagem); a caixa para subir, de ../pecas-de-cena/caixa-de-salto.ts.
//
// O ciclo tem duas partes, e por isso o parâmetro u vai de 0 a 2:
//  - a descida (u de 0 a 1): o exercício. Começa em cima, com o queixo acima da barra e os pés fora da caixa (os
//    joelhos dobrados, os pés para trás); desce devagar até os braços estenderem. O corpo faz o caminho da barra fixa
//    aprovada de trás para a frente (./barra-fixa-base.ts): primeiro o cotovelo estende com o tronco um pouco para trás
//    e a cabeça atrás da barra; no fim, as escápulas sobem um pouco, sem os ombros chegarem às orelhas. Em cada quadro
//    o centro de massa fica na vertical da barra (o corpo não balança);
//  - a volta (u de 1 a 2): os pés vão à caixa, que fica à frente, e as pernas empurram o corpo de volta ao alto, pelo
//    mesmo caminho da bacia e do tronco, com as mãos paradas na barra (o braço não puxa: ele dobra porque o corpo
//    sobe); no alto, os pés saem da caixa e voltam para trás. O último quadro emenda no primeiro.
// As pernas são resolvidas sempre pelo tornozelo (a coxa e a canela saem do quadril e do tornozelo), na descida e na
// volta, para o joelho não pular de um jeito de resolver para o outro.
import ficha from '../dados/movimentos/barra-fixa-negativa.json';
import { calibragem } from '../calibragens';
import { sinal } from '../esqueleto';
import type { Lado, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { estacaoDeBarra, raioDaBarra } from '../pecas-de-cena/barra-fixa';
import { alturaDaCaixa, caixaDeSalto } from '../pecas-de-cena/caixa-de-salto';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, lerp, mul, noRef, norm } from '../vec';
import type { V3 } from '../vec';
import { queixo } from './abdominal';
import { maosNaBarra, mix, montar, noPrumo, pernasSoltas, trecho } from './pendurado';
import type { Apoio, Forma } from './pendurado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
/** O centro da barra: uma regulagem abaixo da mais alta da torre (a da barra fixa). */
const alturaDaBarra = () => f('barra.altura');

const apoio = (corpo: Corpo): Apoio => ({ maos: maosNaBarra(f('pegada.largura') * corpo.m('largura.biacromial'), alturaDaBarra(), 0), diam: obj('barraFixa', 'diam') });
const vetor = (nome: string, k: Lado): V3 => norm([sinal(k) * f(`${nome}.fora`), f(`${nome}.cima`), f(`${nome}.frente`)]);

/* ============================== as pernas ============================== */
/** Uma perna resolvida pelo tornozelo: onde ele fica, para onde os dedos apontam e para onde o joelho aponta. */
interface Perna {
  tornozelo: V3;
  peDir: V3;
  polo: V3;
}
const SOLTAS = pernasSoltas({ quadril: f('quadril'), joelho: f('joelho'), plantar: f('pe.plantar'), juntas: f('pernas.juntas') });
/** As pernas penduradas, fora da caixa (os joelhos dobrados, os pés para trás), no tornozelo que elas dão. */
function penduradas(corpo: Corpo, t: Tronco): Record<Lado, Perna> {
  const p = SOLTAS(t);
  const perna = (k: Lado): Perna => {
    const q = p[k];
    const quadril = noRef(t.pelve, [sinal(k) * corpo.m('quadril.meiaDistancia'), 0, 0]);
    const tornozelo = add(add(quadril, mul(norm(q.coxa!), corpo.m('coxa.comp'))), mul(norm(q.canela!), corpo.m('perna.comp')));
    return { tornozelo, peDir: norm(q.peDir!), polo: norm(q.polo) };
  };
  return { R: perna('R'), L: perna('L') };
}
/** O pé apoiado no tampo da caixa: o tornozelo sobre a bola do pé (o pé reto, os dedos para a frente). */
function naCaixa(corpo: Corpo, k: Lado, acima = 0, calcanhar = 0): Perna {
  // com o calcanhar levantado `calcanhar` graus, o pé gira na bola do pé (como na ponta dos pés da suspensão)
  const r = corpo.m('pe.calcanharABola') - corpo.m('pe.calcanharAoTornozelo'),
    h = corpo.m('altura.maleolo'),
    c = (calcanhar * Math.PI) / 180;
  return {
    tornozelo: [sinal(k) * f('pes.meiaDistancia'), alturaDaCaixa() + h * Math.cos(c) + r * Math.sin(c) + acima, f('pes.naCaixa') - r * Math.cos(c) + h * Math.sin(c)],
    peDir: [0, -Math.sin(c), Math.cos(c)],
    polo: norm([0, 0.35, 1]),
  };
}
const misturar = (a: Perna, b: Perna, w: number, arco = 0): Perna => ({ tornozelo: add(lerp(a.tornozelo, b.tornozelo, w), [0, arco * Math.sin(Math.PI * w), 0]), peDir: norm(lerp(a.peDir, b.peDir, w)), polo: norm(lerp(a.polo, b.polo, w)) });
/**
 * O pé que vai de trás para o tampo da caixa: uma curva (de Bézier) que passa perto de um ponto acima e atrás da
 * beirada de trás da caixa. O joelho sobe primeiro e o pé só vai à frente depois de passar da altura do tampo.
 */
function aoTampo(a: Perna, b: Perna, w: number): Perna {
  const c: V3 = [b.tornozelo[0], alturaDaCaixa() + f('volta.pes.arco'), f('caixa.tras') - f('volta.pes.recua')];
  const t = a.tornozelo,
    d = b.tornozelo;
  const p = (i: number) => (1 - w) * (1 - w) * t[i]! + 2 * w * (1 - w) * c[i]! + w * w * d[i]!;
  return { tornozelo: [p(0), p(1), p(2)], peDir: norm(lerp(a.peDir, b.peDir, w)), polo: norm(lerp(a.polo, b.polo, w)) };
}
const comoPose = (q: Record<Lado, Perna>): Record<Lado, PosePerna> => ({ R: { ...q.R }, L: { ...q.L } });

/* ============================== o corpo de cima ============================== */
/**
 * A forma do corpo na altura s do caminho (0 = braços estendidos, 1 = queixo acima da barra), com as pernas dadas: a
 * subida da barra fixa aprovada, lida de trás para a frente.
 */
function forma(s: number, pernas: (t: Tronco) => Record<Lado, PosePerna>, erro?: string): Forma {
  const esc = trecho(s, 0, f('escapulas.fim')),
    pux = trecho(s, f('puxada.inicio'), 1),
    tras = trecho(s, f('puxada.inicio'), f('inclina.fim'));
  let elev = mix(f('escapula.embaixo'), f('escapula.encaixada'), esc) + (f('escapula.topo') - f('escapula.encaixada')) * pux,
    cervical = f('pescoco.topo') * tras;
  if (erro === 'solta') {
    // o tranco no fim da queda: a escápula sobe até a orelha e a cabeça afunda entre os ombros
    const w = 1 - trecho(s, 0, 0.3);
    elev = mix(elev, f('erro.solta.elev'), w);
    cervical += f('erro.solta.pescoco') * w;
  }
  return {
    frente: f('bacia.topo') * tras,
    lombar: f('lombar.topo') * tras,
    toracica: f('toracica.topo') * tras,
    cervical,
    pernas,
    bracos: (k) => ({ polo: norm(lerp(vetor('polo.pendurado', k), vetor('polo.topo', k), pux)), polegar: [-sinal(k), 0, 0], elev, prot: f('escapula.prot.topo') * pux }),
  };
}

/**
 * A dobra do cotovelo no alto: a do corpo pendurado em que o queixo fica `queixo.acima` cm acima do alto da barra (no
 * prumo). Como na barra fixa, o caminho anda pela dobra do cotovelo, e não pela altura.
 */
function cotoveloNoTopo(corpo: Corpo): number {
  return calibragem(corpo, 'barra-fixa-negativa:cotovelo-no-topo', () => {
    const a = apoio(corpo);
    const fm = forma(1, (t) => comoPose(penduradas(corpo, t)));
    const alvo = alturaDaBarra() + raioDaBarra() + f('queixo.acima');
    let y = 0,
      z = 0;
    for (let i = 0; i < 4; i++) {
      let A = alturaDaBarra() - 140,
        B = alturaDaBarra() - 20;
      for (let j = 0; j < 36; j++) {
        const c = (A + B) / 2;
        if (queixo(montar(corpo, a, fm, [0, c, z]))[1] < alvo) A = c;
        else B = c;
      }
      y = (A + B) / 2;
      z = noPrumo(corpo, a, fm, { y: () => y }, true, z).pelve[2];
    }
    return montar(corpo, a, fm, [0, y, z]).lado.R.ang.cotovelo;
  });
}
const cotoveloEmbaixo = (erro?: string) => (erro === 'solta' ? f('erro.solta.cotovelo') : erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.embaixo'));

/** A bacia do corpo pendurado na altura s (no prumo da barra, com as pernas fora da caixa). */
function penduradoEm(corpo: Corpo, s: number, erro?: string) {
  const fm = forma(s, (t) => comoPose(penduradas(corpo, t)), erro);
  const cot = mix(cotoveloEmbaixo(erro), cotoveloNoTopo(corpo), trecho(s, f('puxada.inicio'), 1));
  return noPrumo(corpo, apoio(corpo), fm, { cotovelo: cot }, true);
}
const baciaPendurada = (corpo: Corpo, s: number, erro?: string): V3 => penduradoEm(corpo, s, erro).pelve;

/**
 * Na volta, as pernas levam o corpo ao alto num ritmo próprio: a fração x do caminho vira a altura s que dá esse ponto
 * do caminho, medido pelo quanto a bacia, a cabeça e o cotovelo andam. Sem isso, a volta herdaria o ritmo da descida
 * (no começo do caminho só as escápulas se movem, e no meio o corpo anda depressa), e o tranco passaria do limite. A
 * tabela do caminho é uma calibração (121 poses).
 */
function alturaDaVolta(corpo: Corpo, x: number, erro?: string): number {
  const N = 120;
  const tab = calibragem(corpo, `barra-fixa-negativa:caminho-da-volta:${cotoveloEmbaixo(erro)}:${erro === 'solta' ? 'solta' : ''}`, () => {
    const pts = Array.from({ length: N + 1 }, (_, i) => {
      const e = penduradoEm(corpo, i / N, erro).e;
      return [e.pelve.o, e.cabeca.o, e.lado.R.cotovelo];
    });
    const acum = [0];
    for (let i = 1; i <= N; i++) acum.push(acum[i - 1]! + pts[i]!.reduce((soma, p, j) => soma + dist(p, pts[i - 1]![j]!), 0));
    return acum;
  });
  const y = x * tab[N]!;
  let i = 0;
  while (i < N - 1 && tab[i + 1]! < y) i++;
  const a = tab[i]!,
    b = tab[i + 1]!;
  return (i + (b > a ? Math.min(1, Math.max(0, (y - a) / (b - a))) : 0)) / N;
}

/* ============================== o quadro ============================== */
function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const a = apoio(corpo);
  const pula = erro === 'pula';
  const noAr = (k: Lado) => naCaixa(corpo, k, f('erro.pula.altura'));
  let s: number, pernas: (t: Tronco) => Record<Lado, Perna>;
  if (u <= 1) {
    // a descida: s vai de 1 (em cima) a 0 (braços estendidos). No pulo, os pés chegam ao alto no ar, acima da caixa,
    // e só depois vão para trás
    s = 1 - u;
    pernas = (t) => {
      const p = penduradas(corpo, t);
      if (!pula) return p;
      const w = trecho(u, 0, 0.35);
      return { R: misturar(noAr('R'), p.R, w), L: misturar(noAr('L'), p.L, w) };
    };
  } else {
    // a volta: os pés vão à caixa, as pernas empurram o corpo ao alto e os pés saem da caixa
    const w = u - 1;
    const w1 = trecho(w, 0, f('volta.pes.fim')),
      w2 = trecho(w, f('volta.pes.fim'), f('volta.sobe.fim')),
      w3 = trecho(w, f('volta.sobe.fim'), 1);
    s = alturaDaVolta(corpo, w2, erro);
    pernas = (t) => {
      const p = penduradas(corpo, t);
      const lado = (k: Lado): Perna => {
        // no fim da subida, o calcanhar sobe um pouco: o queixo passa da barra sem a perna esticar de todo
        const caixa = naCaixa(corpo, k, 0, f('volta.calcanhar') * (pula ? 0 : trecho(w2, 0.6, 1)));
        if (w2 <= 0) return aoTampo(p[k], caixa, w1);
        if (pula) {
          // o pulo: no meio da subida, os pés saem da caixa e ficam no ar
          const ar = noAr(k);
          return misturar(caixa, ar, trecho(w2, 0.3, 0.7));
        }
        if (w3 <= 0) return caixa;
        return misturar(caixa, p[k], w3, 6);
      };
      return { R: lado('R'), L: lado('L') };
    };
  }
  // a bacia faz o caminho do corpo pendurado (na volta também: as pernas empurram o corpo pelo mesmo caminho)
  const e = montar(corpo, a, forma(s, (t) => comoPose(pernas(t)), erro), baciaPendurada(corpo, s, erro));
  const est = estacaoDeBarra(0, [a.maos.R[0], a.maos.L[0]], alturaDaBarra());
  const cx = caixaDeSalto(f('caixa.tras'));
  const xM = obj('barraFixa', 'larg') / 2;
  const L = obj('caixaDeSalto', 'larg') / 2;
  return {
    esq: e,
    prims: [...est.prims, ...cx.prims],
    pecas: [est.estrutura, cx.peca, est.barra],
    fios: [],
    cargas: [],
    marcas: {
      'barra.R': a.maos.R,
      'barra.L': a.maos.L,
      'eixo.a': [-xM, alturaDaBarra(), 0],
      'eixo.b': [xM, alturaDaBarra(), 0],
      raio: [raioDaBarra(), 0, 0],
      queixo: queixo(e),
      'caixa.min': [-L, 0, f('caixa.tras')],
      'caixa.max': [L, alturaDaCaixa(), f('caixa.tras') + obj('caixaDeSalto', 'prof')],
    },
    vies: { maoR: 1, maoL: 1 },
  };
}

export const barraFixaNegativa: Exercicio = {
  ficha: F,
  vistas: ['quina', 'posterior'],
  quadro,
  // costas (o dorsal, principal, e o meio das costas); bíceps e ombro de trás, secundários; o antebraço só ajuda
  // (segura o corpo): a biblioteca, como na barra fixa
  papeis: { dorsal: 'p', trapMedInf: 's', biceps: 's', deltPost: 's', antebraco: 'a' },
  trajetorias: { queixo: (q) => q.marcas.queixo!, pé: (q) => q.esq.lado.R.tornozelo },
};

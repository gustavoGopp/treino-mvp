// O núcleo do voador e do voador invertido (../pecas-de-cena/voador.ts). Sentado no assento da máquina, os pés firmes;
// cada braço da máquina gira num eixo vertical no alto, sobre o centro do ombro do mesmo lado, e a mão fica presa no
// pegador o tempo todo. Como o eixo passa pelo ombro, o pegador anda num arco em volta dele e o cotovelo fica no mesmo
// ângulo (levemente dobrado) do começo ao fim.
//  - No voador, as costas no encosto e as mãos nos pegadores verticais (o polegar para cima); o assento é regulado para
//    o cotovelo ficar um pouco abaixo do ombro ("elbows slightly below shoulders", Life Fitness).
//  - No invertido, sentado virado para o encosto, o peito nele; as mãos nos pegadores horizontais
//    (as palmas para baixo); o assento é regulado para os braços ficarem paralelos ao chão ("arms are parallel to
//    floor", Life Fitness). No mundo da cena, quem senta sempre olha para +z: a máquina é que gira meia volta.
//
// O que se resolve, em vez de receber pronto (uma vez por corpo e por opções, gravado em calibragem): onde a bacia
// fica (o glúteo no assento, amassando `amassa` cm; o centro dos ombros sob os eixos). O resto é a máquina: o braço da
// máquina no ângulo do instante e a mão no pegador; o cotovelo resolve sozinho.
//
// Nos erros em que o tronco sai do lugar (as costas saem do encosto, o tronco embala), o ombro sai de baixo do eixo: o
// braço da máquina vai para o ângulo em que a mão fica à mesma distância do ombro que no certo (o cotovelo não muda), e
// o arco anda junto com o corpo.
import { calibragem } from '../calibragens';
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Quadro } from '../movimento';
import { chao } from '../pecas';
import { alfaDaMao, assentoDoVoador, pegadorHorizontal, pegadorVertical, voador } from '../pecas-de-cena/voador';
import type { ModoDoVoador } from '../pecas-de-cena/voador';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { dist, norm } from '../vec';
import type { V3 } from '../vec';

const rad = Math.PI / 180;
const LADOS: Lado[] = ['R', 'L'];

export interface OpcoesDoVoador {
  modo: ModoDoVoador;
  /** A bacia (graus; negativo = deitada para trás com o encosto, positivo = inclinada para a frente). */
  bacia: number;
  lombar: number;
  /** O pescoço e a cabeça (graus), para o olhar ficar à frente. */
  cervical: number;
  cabeca: number;
  /** As escápulas: para a frente (positivo) ou juntas (negativo), e para cima (positivo) ou para baixo. */
  prot: number;
  elev: number;
  /** Para onde o cotovelo aponta, além de para fora do arco: para baixo (positivo) ou para cima (negativo), em fração. */
  cotoveloBaixo: number;
  /** Quanto o glúteo e a coxa afundam no assento (cm). */
  amassa: number;
  /** O meio do arco (graus a partir da frente): é nele que o centro do ombro fica exatamente sob o eixo. */
  psiMeio: number;
  /** Os pés no chão: a meia distância entre eles e quanto a bola do pé fica à frente da bacia. */
  pes: { meia: number; frente: number };
}

/** O que muda no instante: o tronco (nos erros) e as escápulas. */
export interface Instante {
  /** Quanto cada braço abriu, a partir da frente de quem senta (graus). */
  psi: number;
  bacia?: number;
  lombar?: number;
  toracica?: number;
  cervical?: number;
  prot?: number;
  elev?: number;
  /** O ombro saiu de baixo do eixo: o braço da máquina vai aonde a mão fica à mesma distância do ombro que no certo. */
  arcoSegueOOmbro?: boolean;
}

interface Calib {
  /** A bacia no mundo. */
  y: number;
  z: number;
}

const tronco = (corpo: Corpo, o: OpcoesDoVoador, c: Calib, i: Partial<Instante> = {}) => {
  const p: PoseTronco = {
    pelve: [0, c.y, c.z],
    frente: o.bacia + (i.bacia ?? 0),
    lombar: o.lombar + (i.lombar ?? 0),
    toracica: i.toracica ?? 0,
    cervical: o.cervical + (i.cervical ?? 0),
    cabeca: o.cabeca,
  };
  return resolverTronco(corpo, p);
};

/** As pernas: os pés firmes no chão, os joelhos para a frente. */
function pernas(o: OpcoesDoVoador, c: Calib): Record<Lado, PosePerna> {
  const perna = (k: Lado): PosePerna => {
    const s = sinal(k);
    const bola: V3 = [s * o.pes.meia, 0, c.z + o.pes.frente];
    return { pe: { bola, dir: [s * 0.12, 0, 1] }, polo: norm([s * 0.25, 0.4, 1]) };
  };
  return { R: perna('R'), L: perna('L') };
}

/** A direção para fora do arco (para onde o braço abre), no mundo, com o braço `psi` graus aberto. */
const abre = (k: Lado, psi: number): V3 => [sinal(k) * Math.cos(psi * rad), 0, -Math.sin(psi * rad)];

/** O braço com a mão no pegador do modo, o braço da máquina em `alfa`. */
function braco(o: OpcoesDoVoador, k: Lado, alfa: number, psi: number, i: Partial<Instante>): PoseBraco {
  const d = abre(k, psi);
  const polo = norm([d[0], -o.cotoveloBaixo, d[2]]);
  const prot = o.prot + (i.prot ?? 0),
    elev = o.elev + (i.elev ?? 0);
  const diam = obj('voador', 'pegadorDiam');
  if (o.modo === 'voador') return { pegada: pegadorVertical(o.modo, k, alfa), polo, mao: { polegar: [0, 1, 0], forma: 'pegada', diam }, prot, elev };
  // no invertido, as palmas para baixo: o polegar aponta para a ponta do pegador horizontal
  const h = pegadorHorizontal(o.modo, k, alfa);
  return { pegada: h.centro, polo, mao: { polegar: h.dir, forma: 'pegada', diam }, prot, elev };
}

/** O ponto mais baixo do glúteo e da coxa, em relação à bacia (cm), perto do assento. */
function fundoDoGluteo(e: Esq): number {
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'pelve' || parte === 'coxa') && Math.abs(p[2] - e.pelve.o[2]) < 14 && Math.abs(p[0]) < 18) min = Math.min(min, p[1]);
  return min - e.pelve.o[1];
}

/** A calibração: a bacia no mundo, com o glúteo no assento e o centro dos ombros sob os eixos. */
export function calibrarNoVoador(corpo: Corpo, o: OpcoesDoVoador): Calib {
  return calibragem(corpo, `no-voador:${JSON.stringify(o)}`, () => {
    const c0: Calib = { y: 0, z: 0 };
    const t = tronco(corpo, o, c0);
    // os braços para o lado, na altura dos ombros, só para pôr as escápulas no lugar
    const lado = (k: Lado): PoseBraco => ({ umero: [sinal(k), 0, 0.3], antebraco: [sinal(k), 0, 0.5], polo: [0, -1, 0], mao: { polegar: [0, 1, 0] }, prot: o.prot, elev: o.elev });
    const e = resolverMembros(t, { R: lado('R'), L: lado('L') }, pernas(o, c0));
    const y = assentoDoVoador(o.modo) - o.amassa - fundoDoGluteo(e);
    let c: Calib = { y, z: -(e.lado.R.ombro[2] + e.lado.L.ombro[2]) / 2 };
    // o ombro muda um pouco com a direção do braço (o ritmo da escápula): ele fica sob o eixo no meio do arco
    for (let n = 0; n < 3; n++) {
      const al = alfaDaMao(o.modo, o.psiMeio);
      const em = resolverMembros(tronco(corpo, o, c), { R: braco(o, 'R', al, o.psiMeio, {}), L: braco(o, 'L', al, o.psiMeio, {}) }, pernas(o, c));
      c = { y, z: c.z - (em.lado.R.ombro[2] + em.lado.L.ombro[2]) / 2 };
    }
    return { y: Math.round(c.y * 1000) / 1000, z: Math.round(c.z * 1000) / 1000 };
  });
}

/** O esqueleto e a máquina no instante. */
export function noVoador(corpo: Corpo, o: OpcoesDoVoador, i: Instante, inicio: number, placas = 5): Quadro {
  const c = calibrarNoVoador(corpo, o);
  const t = tronco(corpo, o, c, i);
  const pe = pernas(o, c);
  const alfa: Record<Lado, number> = { R: alfaDaMao(o.modo, i.psi), L: alfaDaMao(o.modo, i.psi) };
  if (i.arcoSegueOOmbro) {
    // a distância do ombro à mão no certo (com o ombro sob o eixo), e o ângulo em que ela se repete com o ombro fora
    const certo = noVoador(corpo, o, { psi: i.psi }, inicio, placas).esq;
    for (const k of LADOS) {
      const D0 = dist(certo.lado[k].ombro, certo.lado[k].pegada);
      const D = (psi: number) => {
        const e = resolverMembros(t, { R: braco(o, 'R', alfaDaMao(o.modo, psi), psi, i), L: braco(o, 'L', alfaDaMao(o.modo, psi), psi, i) }, pe);
        return dist(e.lado[k].ombro, e.lado[k].pegada) - D0;
      };
      // o ângulo mais perto do pedido em que a distância se repete (de grau em grau, para um lado e para o outro)
      let melhor = i.psi;
      busca: for (let d = 1; d <= 60; d++)
        for (const sg of [1, -1]) {
          const a = i.psi + sg * (d - 1),
            b = i.psi + sg * d;
          if (D(a) < 0 !== D(b) < 0) {
            melhor = resolver1(D, a, b, 18);
            break busca;
          }
        }
      alfa[k] = alfaDaMao(o.modo, melhor);
    }
  }
    const e = resolverMembros(t, { R: braco(o, 'R', alfa.R, i.psi, i), L: braco(o, 'L', alfa.L, i.psi, i) }, pe);
  const M = voador({ modo: o.modo, alfa, inicio, placas });
  const pega = (k: Lado): V3 => (o.modo === 'voador' ? M.pegador[k] : M.alca[k].centro);
  return {
    esq: e,
    prims: [chao(-110, 110, -120, 130), ...M.prims],
    pecas: [M.fixa, M.movel],
    fios: [],
    cargas: [],
    marcas: {
      eixoR: M.eixo.R,
      eixoL: M.eixo.L,
      pegadorR: pega('R'),
      pegadorL: pega('L'),
      placas: M.placasDoPino,
      // o ângulo dos braços da máquina, a posição inicial e quanto as placas do pino estão acima das de baixo
      regulagem: [(alfa.R + alfa.L) / 2, inicio, M.placasDoPino[1] - M.topoDaPilha],
    },
    vies: { maoR: 1, maoL: 1 },
    // de cima, a cabeça de quem senta fica dentro da silhueta dos ombros: ganha o contorno próprio por cima do corpo
    // (`cabeca`, opção do Boneco, como na cadeira abdutora). De lado, com o braço de perto aberto, o braço da máquina
    // desce do eixo até o pegador na frente do rosto e do peito; no voador, de frente, com as mãos fechadas à frente do
    // peito, o mesmo: o corpo e os braços são pintados por cima dele (o corte de ilustração da máquina de glúteo), e a
    // máquina aparece em volta do corpo
    viesNaVista: {
      cima: { cabeca: 1 },
      lateral: { corpo: 85, bracoR: 85, bracoL: 85 },
      ...(o.modo === 'voador' ? { frontal: { corpo: 65, bracoR: 65, bracoL: 65 } } : {}),
    },
  };
}

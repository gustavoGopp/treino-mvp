// As flexões de joelho deitado (deslizante, com elástico e, depois, na fita de suspensão): o que elas têm em comum.
//
// 1) `ponteDeCostas`: deitado de costas, com a parte de cima das costas e a cabeça apoiadas no chão, os braços no chão
//    ao lado do corpo e o quadril elevado em ponte. Recebe a inclinação da bacia, a flexão do joelho e a altura do
//    apoio dos calcanhares (a toalha, na deslizante; na suspensão, os pés ficam no ar, presos na fita: `apoio` passa a
//    ser o ponto onde fica o calcanhar). A coxa é posta para o calcanhar chegar ao apoio; a cabeça, para encostar no
//    chão; e o corpo inteiro anda em z para os ombros não saírem do lugar.
// 2) `deitadoDeBrucos`: deitado de bruços num colchonete, a testa nas mãos, o quadril e as coxas no colchonete; só a
//    canela gira em torno do joelho.
//
// Para achar onde o corpo encosta no chão sem refazer a superfície inteira do Boneco a cada passo das contas, os pontos
// da superfície das partes que encostam (costas, bacia, cabeça, pé) são guardados uma vez por corpo, no referencial do
// osso que as carrega (tórax, bacia, cabeça, pé). É uma aproximação: as regras da conferência medem a superfície de
// verdade.
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Corpo } from '../tabelas';
import { noRef, norm, paraRef, sub } from '../vec';
import type { Ref, V3 } from '../vec';

const rad = Math.PI / 180;

/* ============================== a superfície que encosta ============================== */
interface Formas {
  /** Costas na altura das escápulas, no referencial do tórax. */
  costas: V3[];
  /** Peito e barriga, no referencial do tórax (para o deitado de bruços). */
  peito: V3[];
  /** Bacia (glúteo), no referencial da bacia. */
  pelve: V3[];
  cabeca: V3[];
  /** Pé direito, no referencial do pé. */
  pe: V3[];
  /** Coxa direita, no referencial da coxa. */
  coxa: V3[];
}
const FORMAS = new WeakMap<Corpo, Formas>();
function formas(corpo: Corpo): Formas {
  const ja = FORMAS.get(corpo);
  if (ja) return ja;
  // uma pose de referência deitada, com os membros soltos (a forma de cada parte não depende da pose dos outros ossos)
  const t = resolverTronco(corpo, { pelve: [0, 10, 0], frente: -90 });
  const perna: PosePerna = { coxa: [0, 0, 1], canela: [0, 0, 1], polo: [0, 1, 0], peDir: [0, 1, 0] };
  const braco = (k: Lado): PoseBraco => ({ umero: [0, 0, 1], antebraco: [0, 0, 1], polo: [sinal(k), 0, 0], mao: { polegar: [-sinal(k), 0, 0] } });
  const e = resolverMembros(t, { R: braco('R'), L: braco('L') }, { R: perna, L: perna });
  const out: Formas = { costas: [], peito: [], pelve: [], cabeca: [], pe: [], coxa: [] };
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte === 'tronco') {
      const l = paraRef(e.torax, p);
      // da base do pescoço até 30 cm abaixo dela: a região que fica presa ao tórax
      if (l[1] < 0 && l[1] > -30) (l[2] < 0 ? out.costas : out.peito).push(l);
    } else if (parte === 'pescoco') {
      // a base da nuca encosta no chão junto com as costas quando a bacia sobe
      const l = paraRef(e.torax, p);
      if (l[1] < 5 && l[2] < 0) out.costas.push(l);
    } else if (parte === 'pelve') out.pelve.push(paraRef(e.pelve, p));
    else if (parte === 'cabeca') out.cabeca.push(paraRef(e.cabeca, p));
    else if (parte === 'pe' && p[0] < 0) out.pe.push(paraRef(e.lado.R.pe, p));
    else if (parte === 'coxa' && p[0] < 0) out.coxa.push(paraRef(e.lado.R.coxa, p));
  }
  FORMAS.set(corpo, out);
  return out;
}
/** O ponto mais baixo (y) de uma forma posta num referencial. */
const maisBaixo = (r: Ref, pts: V3[]) => pts.reduce((m, p) => Math.min(m, noRef(r, p)[1]), 1e9);
export const costasAoChao = (corpo: Corpo, t: Tronco) => maisBaixo(t.torax, formas(corpo).costas);
export const peitoAoChao = (corpo: Corpo, t: Tronco) => maisBaixo(t.torax, formas(corpo).peito);
export const pelveAoChao = (corpo: Corpo, t: Tronco) => maisBaixo(t.pelve, formas(corpo).pelve);
export const cabecaAoChao = (corpo: Corpo, t: Tronco) => maisBaixo(t.cabeca, formas(corpo).cabeca);
export const peAoChao = (corpo: Corpo, e: Esq) => maisBaixo(e.lado.R.pe, formas(corpo).pe);
export const coxaAoChao = (corpo: Corpo, e: Esq) => maisBaixo(e.lado.R.coxa, formas(corpo).coxa);

/** Direção no plano de lado (y, z), pelo ângulo em graus a partir de +z, girando para +y. */
const noPlano = (a: number): V3 => [0, Math.sin(a * rad), Math.cos(a * rad)];
const anguloNoPlano = (v: V3) => Math.atan2(v[1], v[2]) / rad;

/* ============================== deitado de costas, em ponte ============================== */
export interface OpcoesDaPonte {
  /** Inclinação da bacia (graus, como em resolverTronco: −90 = deitado reto, com a cabeça para −z). */
  frente: number;
  /** Flexão da lombar além da curva de repouso (negativo = arqueia). */
  lombar?: number;
  /** Flexão do joelho (graus). */
  joelho: number;
  /** Altura do apoio dos calcanhares (o tampo da toalha), em cm. */
  apoio: number;
  /** Onde fica o centro do ombro direito em z (os ombros não saem do lugar). */
  zOmbro: number;
  /** Ângulo do pé com a canela além do ângulo reto (graus; positivo = ponta do pé para longe da canela). */
  pe: number;
  /** Os braços no chão: a mão a tantos cm do ombro na direção dos pés e tantos cm para fora dele. */
  maoAbaixoDoOmbro: number;
  maoParaFora: number;
}
export interface Ponte {
  e: Esq;
  /** Flexão do quadril medida contra a linha ombro–quadril (0 = em linha; positivo = o joelho sobe). */
  quadril: number;
  /** O meio dos dois calcanhares, no apoio. */
  calcanhares: V3;
}

/** Com as costas no chão, a folga do glúteo ao chão (cm) para uma inclinação da bacia e uma flexão da lombar. */
export function folgaDaPelve(corpo: Corpo, frente: number, lombar: number): number {
  const t = resolverTronco(corpo, { pelve: [0, 0, 0], frente, lombar });
  return pelveAoChao(corpo, t) - costasAoChao(corpo, t);
}

export function ponteDeCostas(corpo: Corpo, o: OpcoesDaPonte): Ponte {
  const m = (id: string) => corpo.m(id);
  const tronco = (pelve: V3, cervical: number) => resolverTronco(corpo, { pelve, frente: o.frente, lombar: o.lombar ?? 0, cervical, cabeca: 0 });
  // 1) as costas encostam no chão
  const t0 = tronco([0, 0, 0], 0);
  const yP = -costasAoChao(corpo, t0);
  // 2) a cabeça encosta no chão (o pescoço dobra o que for preciso)
  const cervical = resolver1((c) => cabecaAoChao(corpo, tronco([0, yP, 0], c)), -40, 70, 30);
  // 3) o ombro direito fica em zOmbro: o corpo inteiro anda em z (os braços ao lado do corpo não mexem na escápula)
  const solto = (k: Lado): PoseBraco => ({ umero: [0, -0.2, 1], antebraco: [0, -0.2, 1], polo: [sinal(k), 0, 0], mao: { polegar: [-sinal(k), 0, 0] } });
  const pernaSolta: PosePerna = { coxa: [0, 0, 1], canela: [0, 0, 1], polo: [0, 1, 0] };
  const ombro0 = resolverMembros(tronco([0, yP, 0], cervical), { R: solto('R'), L: solto('L') }, { R: pernaSolta, L: pernaSolta }).lado.R.ombro;
  const t = tronco([0, yP, o.zOmbro - ombro0[2]], cervical);
  // 4) as pernas: a coxa gira no plano de lado até o calcanhar chegar ao apoio
  const aLinha = anguloNoPlano(norm(sub(noRef(t.pelve, [sinal('R') * m('quadril.meiaDistancia'), 0, 0]), ombro0)));
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const xMao = s * (m('ombro.meiaDistancia') + o.maoParaFora);
    return { punho: [xMao, m('raio.punho') * 0.85, o.zOmbro + o.maoAbaixoDoOmbro], polo: [s, 0.3, -0.3], mao: { polegar: [-s, 0, 0], dedos: [0, 0, 1], forma: 'aberta' } };
  };
  const pose = (psi: number) => {
    const aCoxa = aLinha + psi,
      aCanela = aCoxa - o.joelho;
    // as pernas paralelas, na largura do quadril; o pé em ângulo reto com a canela (mais `o.pe`)
    const perna: PosePerna = { coxa: noPlano(aCoxa), canela: noPlano(aCanela), peDir: noPlano(aCanela + 90 + o.pe), polo: noPlano(aCoxa + 90) };
    return resolverMembros(t, { R: braco('R'), L: braco('L') }, { R: perna, L: perna });
  };
  const psi = resolver1((x) => peAoChao(corpo, pose(x)) - o.apoio, -45, 80, 30);
  const e = pose(psi);
  const R = e.lado.R,
    L = e.lado.L;
  return { e, quadril: psi, calcanhares: [(R.calcanhar[0] + L.calcanhar[0]) / 2, o.apoio, (R.calcanhar[2] + L.calcanhar[2]) / 2] };
}

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
  /** Peito (até 30 cm abaixo da base do pescoço) e barriga (dali até 56 cm), no referencial do tórax (de bruços). */
  peito: V3[];
  barriga: V3[];
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
  const out: Formas = { costas: [], peito: [], barriga: [], pelve: [], cabeca: [], pe: [], coxa: [] };
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte === 'tronco') {
      const l = paraRef(e.torax, p);
      // da base do pescoço até 30 cm abaixo dela: a região que fica presa ao tórax
      if (l[1] < 0 && l[1] > -30 && l[2] < 0) out.costas.push(l);
      if (l[1] < 0 && l[1] > -30 && l[2] > 0) out.peito.push(l);
      // a barriga, abaixo do peito: deitado de bruços, a lombar não dobra no movimento certo
      if (l[1] <= -30 && l[1] > -56 && l[2] > 0) out.barriga.push(l);
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
export const barrigaAoChao = (corpo: Corpo, t: Tronco) => maisBaixo(t.torax, formas(corpo).barriga);
export const pelveAoChao = (corpo: Corpo, t: Tronco) => maisBaixo(t.pelve, formas(corpo).pelve);
export const cabecaAoChao = (corpo: Corpo, t: Tronco) => maisBaixo(t.cabeca, formas(corpo).cabeca);
export const peAoChao = (corpo: Corpo, e: Esq) => maisBaixo(e.lado.R.pe, formas(corpo).pe);
export const coxaAoChao = (corpo: Corpo, e: Esq) => maisBaixo(e.lado.R.coxa, formas(corpo).coxa);
/**
 * O ponto da superfície do pé direito mais longe de `alvo` (na suspensão: o fundo do berço, onde a fita, puxada para a
 * âncora pelo peso da perna, aperta o calcanhar).
 */
export function peMaisLongeDe(corpo: Corpo, e: Esq, alvo: V3): V3 {
  let melhor: V3 = e.lado.R.calcanhar,
    d = -1;
  for (const p of formas(corpo).pe) {
    const q = noRef(e.lado.R.pe, p);
    const dq = Math.hypot(q[0] - alvo[0], q[1] - alvo[1], q[2] - alvo[2]);
    if (dq > d) {
      d = dq;
      melhor = q;
    }
  }
  return melhor;
}

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
  /**
   * Altura do tampo onde as costas e a cabeça apoiam (o colchonete sob os ombros, na suspensão); sem ele, o chão.
   * As mãos continuam no chão.
   */
  piso?: number;
  /**
   * O que zera quando o pé está no lugar, no lugar de "o ponto mais baixo do pé na altura do apoio" (na suspensão:
   * o pé no fundo do berço, à distância da fita da âncora). Recebe o esqueleto e devolve um número que cresce com a
   * coxa subindo.
   */
  alvoDoPe?: (e: Esq) => number;
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

/**
 * Deitado de costas: a parte de cima das costas e a cabeça no tampo (`piso`, 0 = o chão), com a bacia inclinada em
 * `frente`, e o corpo posto em z para o centro do ombro direito ficar em `zOmbro`. `ombro0` é o centro do ombro antes
 * de o corpo andar em z (o núcleo da ponte mede a linha do ombro ao quadril com ele).
 */
export function troncoDeCostas(corpo: Corpo, frente: number, lombar: number, zOmbro: number, piso = 0): { t: Tronco; ombro0: V3 } {
  const tronco = (pelve: V3, cervical: number) => resolverTronco(corpo, { pelve, frente, lombar, cervical, cabeca: 0 });
  // 1) as costas encostam no chão
  const t0 = tronco([0, 0, 0], 0);
  const yP = piso - costasAoChao(corpo, t0);
  // 2) a cabeça encosta no chão (o pescoço dobra o que for preciso)
  const cervical = resolver1((c) => cabecaAoChao(corpo, tronco([0, yP, 0], c)) - piso, -40, 70, 30);
  // 3) o ombro direito fica em zOmbro: o corpo inteiro anda em z (os braços ao lado do corpo não mexem na escápula)
  const solto = (k: Lado): PoseBraco => ({ umero: [0, -0.2, 1], antebraco: [0, -0.2, 1], polo: [sinal(k), 0, 0], mao: { polegar: [-sinal(k), 0, 0] } });
  const pernaSolta: PosePerna = { coxa: [0, 0, 1], canela: [0, 0, 1], polo: [0, 1, 0] };
  const ombro0 = resolverMembros(tronco([0, yP, 0], cervical), { R: solto('R'), L: solto('L') }, { R: pernaSolta, L: pernaSolta }).lado.R.ombro;
  return { t: tronco([0, yP, zOmbro - ombro0[2]], cervical), ombro0 };
}

/** Os braços no chão ao lado do corpo, palmas para baixo: a mão a `abaixo` cm do ombro na direção dos pés e `fora` cm para fora dele. */
export function bracosNoChao(corpo: Corpo, zOmbro: number, abaixo: number, fora: number): Record<Lado, PoseBraco> {
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    const xMao = s * (corpo.m('ombro.meiaDistancia') + fora);
    return { punho: [xMao, corpo.m('raio.punho') * 0.85, zOmbro + abaixo], polo: [s, 0.3, -0.3], mao: { polegar: [-s, 0, 0], dedos: [0, 0, 1], forma: 'aberta' } };
  };
  return { R: braco('R'), L: braco('L') };
}

export function ponteDeCostas(corpo: Corpo, o: OpcoesDaPonte): Ponte {
  const m = (id: string) => corpo.m(id);
  const { t, ombro0 } = troncoDeCostas(corpo, o.frente, o.lombar ?? 0, o.zOmbro, o.piso ?? 0);
  // 4) as pernas: a coxa gira no plano de lado até o calcanhar chegar ao apoio
  const aLinha = anguloNoPlano(norm(sub(noRef(t.pelve, [sinal('R') * m('quadril.meiaDistancia'), 0, 0]), ombro0)));
  const bracos = bracosNoChao(corpo, o.zOmbro, o.maoAbaixoDoOmbro, o.maoParaFora);
  const pose = (psi: number) => {
    const aCoxa = aLinha + psi,
      aCanela = aCoxa - o.joelho;
    // as pernas paralelas, na largura do quadril; o pé em ângulo reto com a canela (mais `o.pe`)
    const perna: PosePerna = { coxa: noPlano(aCoxa), canela: noPlano(aCanela), peDir: noPlano(aCanela + 90 + o.pe), polo: noPlano(aCoxa + 90) };
    return resolverMembros(t, bracos, { R: perna, L: perna });
  };
  const alvo = o.alvoDoPe ?? ((e: Esq) => peAoChao(corpo, e) - o.apoio);
  const psi = resolver1((x) => alvo(pose(x)), -45, 80, 30);
  const e = pose(psi);
  const R = e.lado.R,
    L = e.lado.L;
  return { e, quadril: psi, calcanhares: [(R.calcanhar[0] + L.calcanhar[0]) / 2, o.apoio, (R.calcanhar[2] + L.calcanhar[2]) / 2] };
}

/* ============================== deitado de bruços ============================== */
export interface OpcoesDeBrucos {
  /** Altura do tampo onde o corpo deita (o colchonete), em cm. */
  apoio: number;
  /** Altura em que a testa apoia: o dorso das mãos, espalmadas no chão à frente do colchonete. */
  testa: number;
  /** Meia distância entre os punhos (as mãos lado a lado sob a testa). */
  punhosMeiaDistancia: number;
  /** Flexão do joelho (graus). */
  joelho: number;
  /** Flexão plantar do tornozelo (graus; 0 = pé em ângulo reto com a canela). */
  flexaoPlantar: number;
  /** Quanto a bacia sobe do colchonete (erro do quadril), em cm; o peito e os joelhos ficam onde estão. */
  quadrilSobe?: number;
  /** Flexão da lombar além da curva de repouso (graus), deitado (acréscimo de 15/11: o tórax fica deitado reto). */
  lombar?: number;
  /** Protração das escápulas (graus da clavícula): os ombros descem para o colchonete com os braços à frente. */
  prot?: number;
  /**
   * Os braços em outra pose, no lugar das mãos sob a testa (acréscimo de 15/11, abertura em T): recebem o tronco já
   * posto. A testa continua na altura `testa` (numa toalha, por exemplo).
   */
  bracos?: (t: Tronco) => Record<Lado, PoseBraco>;
  /** Flexão da cabeça sobre o pescoço já posto (graus; negativo = a testa sobe, o queixo fica): erro de levantar a cabeça. */
  cabeca?: number;
}
interface BaseDeBrucos {
  frente: number;
  yP: number;
  cervical: number;
  /** O centro do joelho direito, com a coxa reta no colchonete. */
  joelho: V3;
}
const BASE_DE_BRUCOS = new WeakMap<Corpo, Map<string, BaseDeBrucos>>();
/**
 * Quanto a barriga amassa no colchonete (cm), de bruços: o Boneco tem a barriga mais alta que o peito e a bacia, e
 * sem isso o peito ficaria no ar. É o mesmo 1,5 cm que a conferência aceita para o corpo amassar no chão.
 */
const AMASSA = 1.5;
/** O ponto mais baixo da frente do tronco, com a barriga amassando. */
const frenteAoChao = (corpo: Corpo, t: Tronco) => Math.min(peitoAoChao(corpo, t), barrigaAoChao(corpo, t) + AMASSA);
/** A parte que não muda no ciclo: a inclinação da bacia, a altura dela, a cabeça nas mãos e a coxa no colchonete. */
function baseDeBrucos(corpo: Corpo, o: OpcoesDeBrucos): BaseDeBrucos {
  const chave = `${o.apoio}|${o.testa}|${o.lombar ?? 0}`;
  let mapa = BASE_DE_BRUCOS.get(corpo);
  if (!mapa) BASE_DE_BRUCOS.set(corpo, (mapa = new Map()));
  const ja = mapa.get(chave);
  if (ja) return ja;
  // 1) a frente da bacia e a barriga (que amassa AMASSA cm) ficam na mesma altura; o corpo desce até encostar no
  //    colchonete. O peito encosta junto ou fica um pouco acima (os braços estão à frente da cabeça).
  const L0 = o.lombar ?? 0;
  const t0 = (frente: number) => resolverTronco(corpo, { pelve: [0, 0, 0], frente, lombar: L0 });
  const frente = resolver1((fr) => pelveAoChao(corpo, t0(fr)) - Math.min(peitoAoChao(corpo, t0(fr)), barrigaAoChao(corpo, t0(fr)) + AMASSA), 70, 110, 30);
  const tf = t0(frente);
  const yP = o.apoio - Math.min(peitoAoChao(corpo, tf), pelveAoChao(corpo, tf), barrigaAoChao(corpo, tf) + AMASSA);
  // 2) a testa apoia no dorso das mãos
  const cervical = resolver1((c) => cabecaAoChao(corpo, resolverTronco(corpo, { pelve: [0, yP, 0], frente, lombar: L0, cervical: c })) - o.testa, -40, 60, 30);
  // 3) a coxa, reta, encosta no colchonete
  const t = resolverTronco(corpo, { pelve: [0, yP, 0], frente, lombar: L0, cervical });
  const solto: PoseBraco = { umero: [0, -1, 0], antebraco: [0, -1, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const coxa = (a: number) => {
    const p: PosePerna = { coxa: noPlano(a), canela: noPlano(a), polo: noPlano(a - 90) };
    return resolverMembros(t, { R: solto, L: solto }, { R: p, L: p });
  };
  const aCoxa = resolver1((a) => coxaAoChao(corpo, coxa(a)) - o.apoio, 160, 200, 30);
  const b = { frente, yP, cervical, joelho: coxa(aCoxa).lado.R.joelho };
  mapa.set(chave, b);
  return b;
}

/** Deitado de bruços: o peito, a bacia e as coxas no colchonete, a testa no dorso das mãos; a canela gira no joelho. */
export function deitadoDeBrucos(corpo: Corpo, o: OpcoesDeBrucos): Esq {
  const m = (id: string) => corpo.m(id);
  const b = baseDeBrucos(corpo, o);
  const L0 = o.lombar ?? 0;
  let frente = b.frente,
    lombar = L0,
    yP = b.yP,
    cervical = b.cervical;
  const sobe = o.quadrilSobe ?? 0;
  if (sobe > 0) {
    // a bacia sobe e gira (o quadril dobra), a lombar dobra o mesmo tanto ao contrário: o peito fica no colchonete,
    // na mesma inclinação, e a testa continua nas mãos
    yP = b.yP + sobe;
    const tr = (L: number, c = b.cervical) => resolverTronco(corpo, { pelve: [0, yP, 0], frente: b.frente + L, lombar: L0 - L, cervical: c });
    const giro = resolver1((L) => frenteAoChao(corpo, tr(L)) - o.apoio, 0, 70, 30);
    lombar = L0 - giro;
    frente = b.frente + giro;
    cervical = resolver1((c) => cabecaAoChao(corpo, tr(giro, c)) - o.testa, -40, 60, 30);
  }
  const t = resolverTronco(corpo, { pelve: [0, yP, 0], frente, lombar, cervical, ...(o.cabeca ? { cabeca: o.cabeca } : {}) });
  // as mãos lado a lado, espalmadas no chão sob a testa, com os dedos para o meio e os cotovelos para fora
  const cab = formas(corpo).cabeca.map((p) => noRef(t.cabeca, p));
  const fronte = cab.reduce((a, p) => (p[1] < a[1] ? p : a));
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    return { punho: [s * o.punhosMeiaDistancia, m('raio.punho') * 0.85, fronte[2]], polo: [s, 0.7, -0.1], mao: { polegar: [0, 0, -1], dedos: [-s, 0, 0], forma: 'aberta' }, prot: o.prot ?? 0 };
  };
  // a coxa vai do quadril ao joelho, que fica no colchonete; a canela gira em torno do joelho
  const perna = (k: Lado): PosePerna => {
    const q = noRef(t.pelve, [sinal(k) * m('quadril.meiaDistancia'), 0, 0]);
    const j: V3 = [sinal(k) * Math.abs(b.joelho[0]), b.joelho[1], b.joelho[2]];
    const dCoxa = norm(sub(j, q));
    const aCoxa = anguloNoPlano(dCoxa);
    const aCanela = aCoxa - o.joelho;
    return { coxa: dCoxa, canela: noPlano(aCanela), peDir: noPlano(aCanela + 90 - o.flexaoPlantar), polo: noPlano(aCoxa - 90) };
  };
  return resolverMembros(t, o.bracos ? o.bracos(t) : { R: braco('R'), L: braco('L') }, { R: perna('R'), L: perna('L') });
}

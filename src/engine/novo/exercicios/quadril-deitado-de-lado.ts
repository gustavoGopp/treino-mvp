// O núcleo dos exercícios de quadril deitado de lado (abdução e adução, com e sem caneleira).
//
// O corpo deita de lado sem nada novo no esqueleto além da inclinação do pescoço: a bacia gira 90° em volta da
// vertical (`giro`) e depois tomba 90° para o lado (`lado`). O eixo do corpo fica ao longo de z, a frente do corpo
// vira para +x (para longe de quem olha na vista de lado) e as costas e o glúteo ficam à vista. Deitado sobre o lado
// esquerdo, a cabeça fica em −z; sobre o direito, em +z. Rolar para trás (o erro clássico) é só mudar o `giro`.
//
// O que este arquivo resolve, em vez de receber pronto:
//  - a inclinação da coluna para o lado (`lombarLado`): o lado do peito encosta no piso junto com a bacia (a cintura
//    fica no ar, como numa pessoa deitada de lado);
//  - a altura da bacia: o ponto mais baixo da bacia e do alto da coxa de baixo (o trocânter) encosta no piso;
//  - o braço de baixo, estendido acima da cabeça e deitado no piso; a cabeça apoia nele (`cervicalLado`, o campo
//    opcional acrescentado ao esqueleto em 15/11);
//  - a mão de cima, espalmada no piso à frente do peito;
//  - a perna que deita no piso: o exercício dá a flexão da coxa e da canela, e cada uma desce até encostar no piso.
// Os pontos da superfície vêm do Boneco (pontosDoBoneco). As contas da pose fixa são feitas uma vez por corpo.
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Corpo } from '../tabelas';
import { add, dist, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const rad = Math.PI / 180;
export const outroLado = (k: Lado): Lado => (k === 'R' ? 'L' : 'R');

export interface OpcoesDeLado {
  /** O lado que fica no piso. */
  baixo: Lado;
  /** Altura do tampo onde o corpo deita (o colchonete), em cm; 0 = o chão. */
  piso: number;
  /** Quanto a bacia e o tronco rolam para trás, em graus (o erro "rolar o quadril"). */
  rola?: number;
  /** Quanto a cintura dobra para o lado de cima, em graus (o erro "subir alto demais": a bacia sobe para as costelas). */
  cintura?: number;
  /** O braço de baixo: quanto ele abre para a frente da linha do corpo (graus) e quanto o cotovelo dobra. */
  bracoDeBaixo: { abre: number; cotovelo: number; prot: number; elev: number };
  /** A mão de cima no piso: quantos cm à frente do ombro e quantos cm abaixo dele (na direção dos pés). */
  maoDeCima: { frente: number; abaixo: number };
  /** Folga entre a cabeça e o braço em que ela apoia (cm; 0 = encostada). */
  cabecaNoBraco: number;
  /** De frente para quem olha na vista de frente (a frente do corpo para +z); por omissão, de costas (para −z). */
  deFrente?: boolean;
}

/** Os eixos da bacia deitada: a frente do corpo, o lado de cima e a direção dos pés. */
export interface Eixos {
  frente: V3;
  cima: V3;
  pes: V3;
}
export const eixosDaBacia = (t: Tronco, baixo: Lado): Eixos => ({ frente: t.pelve.z, cima: mul(t.pelve.x, -sinal(baixo)), pes: mul(t.pelve.y, -1) });

/**
 * Uma direção da coxa (ou da canela) no referencial da bacia: `flexao` (graus, para a frente) e `abre` (graus, para o
 * lado de fora da perna `k`; negativo = para dentro), a partir da linha do corpo (para os pés).
 */
export function direcao(t: Tronco, k: Lado, flexao: number, abre: number): V3 {
  const P = t.pelve,
    fora = mul(P.x, sinal(k));
  const c = Math.cos(abre * rad);
  return norm(add(add(mul(P.y, -Math.cos(flexao * rad) * c), mul(P.z, Math.sin(flexao * rad) * c)), mul(fora, Math.sin(abre * rad))));
}

/* ============================== o tronco deitado ============================== */
interface BaseDeLado {
  /** Inclinações para o lado do piso (graus). */
  lombarLado: number;
  cervicalLado: number;
  /** A altura da bacia com o corpo empilhado. */
  y: number;
}
const BASES = new WeakMap<Corpo, Map<string, BaseDeLado>>();
const TRONCO = new Set(['tronco', 'cintura', 'emendaDaCintura', 'pelve']);
/** Inclinar "para a esquerda" no esqueleto é inclinar para o piso quando se deita sobre o lado esquerdo. */
const paraOPiso = (baixo: Lado) => (baixo === 'L' ? 1 : -1);

function poseDoTronco(o: OpcoesDeLado, y: number, b: Pick<BaseDeLado, 'lombarLado' | 'cervicalLado'>): PoseTronco {
  const s = paraOPiso(o.baixo);
  const rola = o.rola ?? 0;
  return { pelve: [0, y, 0], giro: o.deFrente ? 0 : 180, frente: -rola, lado: s * (90 - (o.cintura ?? 0)), lombarLado: s * (b.lombarLado + (o.cintura ?? 0)), cervicalLado: s * b.cervicalLado };
}

/** Os braços: o de baixo estendido acima da cabeça, deitado no piso; a mão de cima espalmada no piso, à frente do peito. */
function bracos(corpo: Corpo, t: Tronco, o: OpcoesDeLado): Record<Lado, PoseBraco> {
  const m = (id: string) => corpo.m(id);
  const E = eixosDaBacia(t, o.baixo);
  // "para a cabeça", no piso: a linha do corpo sem a parte vertical (quando a bacia rola, ela continua no chão)
  const cabeca = norm([-E.pes[0], 0, -E.pes[2]]);
  const frente = norm(sub([E.frente[0], 0, E.frente[2]], mul(cabeca, dot([E.frente[0], 0, E.frente[2]], cabeca))));
  const kB = o.baixo,
    kC = outroLado(o.baixo);
  // os ombros, com o braço de baixo já acima da cabeça (o ritmo da escápula leva o ombro para a cabeça)
  const acima: PoseBraco = { umero: cabeca, antebraco: cabeca, polo: frente, mao: { polegar: [0, 1, 0] }, prot: o.bracoDeBaixo.prot, elev: o.bracoDeBaixo.elev };
  const prova = resolverMembros(t, { R: acima, L: acima }, { R: { polo: frente }, L: { polo: frente } });
  const ombro = prova.lado[kB].ombro;
  // o braço desce do ombro até o cotovelo encostar no piso, abrindo um pouco para a frente da linha do corpo
  const yCot = o.piso + m('raio.bracoFletido') * 0.95;
  const desce = Math.asin(Math.max(-1, Math.min(1, (ombro[1] - yCot) / m('braco.comp'))));
  const a = o.bracoDeBaixo.abre * rad;
  const noPiso = norm(add(mul(cabeca, Math.cos(a)), mul(frente, Math.sin(a))));
  const umero = norm(add(mul(noPiso, Math.cos(desce)), [0, -Math.sin(desce), 0]));
  // o antebraço segue deitado no piso, dobrando para a frente
  const c = (o.bracoDeBaixo.abre + o.bracoDeBaixo.cotovelo) * rad;
  const ante0 = norm(add(mul(cabeca, Math.cos(c)), mul(frente, Math.sin(c))));
  const dy = (o.piso + m('raio.punho') * 1.6 - yCot) / m('antebraco.comp');
  const antebraco = norm(add(mul(ante0, Math.sqrt(Math.max(0, 1 - dy * dy))), [0, dy, 0]));
  const deBaixo: PoseBraco = { umero, antebraco, polo: [0, -1, 0], mao: { polegar: norm(add([0, 1, 0], mul(frente, 0.8))), forma: 'relaxada' }, prot: o.bracoDeBaixo.prot, elev: o.bracoDeBaixo.elev };
  // a mão de cima espalmada no piso, à frente do peito, com os dedos para a cabeça
  const omC = prova.lado[kC].ombro;
  const base = add([omC[0], 0, omC[2]], add(mul(frente, o.maoDeCima.frente), mul(cabeca, -o.maoDeCima.abaixo)));
  const punho: V3 = [base[0], o.piso + m('raio.punho') * 0.85, base[2]];
  const deCima: PoseBraco = { punho, polo: norm(add([0, 1, 0], mul(cabeca, -0.8))), mao: { polegar: mul(frente, -1), dedos: cabeca, forma: 'aberta' } };
  return kB === 'L' ? { L: deBaixo, R: deCima } : { R: deBaixo, L: deCima };
}

/** As pernas soltas, na linha do corpo (para as contas do tronco). */
function pernasSoltas(t: Tronco, baixo: Lado): Record<Lado, PosePerna> {
  const E = eixosDaBacia(t, baixo);
  const p: PosePerna = { coxa: E.pes, canela: E.pes, polo: E.frente, peDir: E.frente };
  return { R: p, L: p };
}
/** Um ponto da superfície pertence à perna `k` (o lado mais perto dele). */
function daPerna(e: Esq, k: Lado, p: V3): boolean {
  const o = outroLado(k);
  const d = (L: Esq['lado'][Lado]) => Math.min(dist(p, L.joelho), dist(p, L.tornozelo), dist(p, L.quadril), dist(p, L.bola));
  return d(e.lado[k]) < d(e.lado[o]);
}
/** O ponto mais baixo das partes pedidas. */
function minimo(e: Esq, filtro: (parte: string, p: V3) => boolean): number {
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (p[1] < min && filtro(parte, p)) min = p[1];
  return min;
}
/** O tronco e o alto da coxa de baixo (o trocânter): o que encosta no piso na altura da bacia. */
const doTronco = (e: Esq, baixo: Lado) => (parte: string, p: V3) => TRONCO.has(parte) || (parte === 'coxa' && dist(p, e.lado[baixo].quadril) < 12 && daPerna(e, baixo, p)) || (parte === 'braco' && dist(p, e.lado[baixo].ombro) < 10);

/**
 * A parte que não muda no ciclo: a inclinação da coluna (o peito no piso junto com a bacia), a altura da bacia e a
 * cabeça apoiada no braço de baixo. Guardada por corpo e por opções.
 */
function base(corpo: Corpo, o: OpcoesDeLado): BaseDeLado {
  const oo: OpcoesDeLado = { ...o, rola: 0, cintura: 0 };
  const chave = JSON.stringify(oo);
  let mapa = BASES.get(corpo);
  if (!mapa) BASES.set(corpo, (mapa = new Map()));
  const ja = mapa.get(chave);
  if (ja) return ja;
  const esq = (lombarLado: number, cervicalLado: number, y = 0) => {
    const t = resolverTronco(corpo, poseDoTronco(oo, y, { lombarLado, cervicalLado }));
    return resolverMembros(t, bracos(corpo, t, oo), pernasSoltas(t, o.baixo));
  };
  // 1) a coluna inclina para o lado até o peito encostar no piso junto com a bacia
  const peitoMenosBacia = (e: Esq) => {
    // ao longo da coluna (0 = a bacia, 1 = a base do pescoço): o peito é o terço de cima, a bacia o quarto de baixo
    const eixo = sub(e.torax.o, e.pelve.o),
      L2 = dot(eixo, eixo);
    const s = (p: V3) => dot(sub(p, e.pelve.o), eixo) / L2;
    // o ombro de baixo (o alto do braço, que fica sob o tronco) apoia junto com o peito
    const ombro = e.lado[o.baixo].ombro;
    const peito = minimo(e, (parte, p) => (TRONCO.has(parte) && s(p) > 0.6) || (parte === 'braco' && dist(p, ombro) < 10));
    const bacia = minimo(e, (parte, p) => doTronco(e, o.baixo)(parte, p) && s(p) < 0.25);
    return peito - bacia;
  };
  const lombarLado = resolver1((l) => peitoMenosBacia(esq(l, 0)), -20, 30, 22);
  // 2) a altura: a bacia encosta no piso
  const e0 = esq(lombarLado, 0);
  const y = o.piso - minimo(e0, doTronco(e0, o.baixo));
  // 3) a cabeça apoia no braço de baixo: o pescoço inclina para o lado
  const folgaDaCabeca = (c: number) => {
    const e = esq(lombarLado, c, y);
    const pts = pontosDoBoneco(e);
    const braco = pts.filter((x) => (x.parte === 'braco' || x.parte === 'ante') && dist(x.p, e.lado[o.baixo].cotovelo) < 40 && dist(x.p, e.lado[o.baixo].ombro) > 6);
    let min = 1e9;
    for (const { p, parte } of pts) {
      if (parte !== 'cabeca') continue;
      for (const b of braco) if (Math.abs(b.p[2] - p[2]) < 2 && Math.abs(b.p[0] - p[0]) < 2.5) min = Math.min(min, p[1] - b.p[1]);
    }
    return min === 1e9 ? 30 - c : min - o.cabecaNoBraco;
  };
  const cervicalLado = resolver1(folgaDaCabeca, -10, 35, 20);
  const b: BaseDeLado = { lombarLado, cervicalLado, y };
  mapa.set(chave, b);
  return b;
}

/** O tronco deitado de lado, com os braços postos. Quando a bacia rola ou a cintura dobra, ela volta a encostar no piso. */
export function troncoDeLado(corpo: Corpo, o: OpcoesDeLado): { t: Tronco; bracos: Record<Lado, PoseBraco>; base: BaseDeLado } {
  const b = base(corpo, o);
  let y = b.y;
  if ((o.rola ?? 0) !== 0 || (o.cintura ?? 0) !== 0) {
    const t0 = resolverTronco(corpo, poseDoTronco(o, 0, b));
    const e0 = resolverMembros(t0, bracos(corpo, t0, o), pernasSoltas(t0, o.baixo));
    y = o.piso - minimo(e0, doTronco(e0, o.baixo));
  }
  const t = resolverTronco(corpo, poseDoTronco(o, y, b));
  return { t, bracos: bracos(corpo, t, o), base: b };
}

/**
 * A perna que deita no piso: a coxa e a canela com as flexões pedidas, e cada uma fecha (ou abre) até o ponto mais
 * baixo dela encostar no piso. `outra` é a pose da outra perna; `peDir` dá a direção dos dedos a partir da canela.
 */
export function pernaNoPiso(t: Tronco, braco: Record<Lado, PoseBraco>, o: OpcoesDeLado, k: Lado, outra: PosePerna, flexCoxa: number, flexCanela: number, peDir: (canela: V3) => V3): PosePerna {
  const E = eixosDaBacia(t, o.baixo);
  const perna = (aC: number, aK: number): PosePerna => {
    const c = direcao(t, k, flexCoxa, aC),
      d = direcao(t, k, flexCanela, aK);
    return { coxa: c, canela: d, polo: E.frente, peDir: peDir(d) };
  };
  const e = (p: PosePerna) => resolverMembros(t, braco, (k === 'R' ? { R: p, L: outra } : { L: p, R: outra }) as Record<Lado, PosePerna>);
  const minCoxa = (p: PosePerna) => {
    const ee = e(p);
    return minimo(ee, (parte, q) => parte === 'coxa' && dist(q, ee.lado[k].quadril) > 14 && daPerna(ee, k, q)) - o.piso;
  };
  const aC = resolver1((a) => minCoxa(perna(a, 0)), 50, -40, 22);
  const minCanela = (p: PosePerna) => {
    const ee = e(p);
    return minimo(ee, (parte, q) => (parte === 'canela' || parte === 'pe') && dist(q, ee.lado[k].joelho) > 8 && daPerna(ee, k, q)) - o.piso;
  };
  const aK = resolver1((a) => minCanela(perna(aC, a)), 50, -40, 22);
  return perna(aC, aK);
}

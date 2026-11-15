// Os abdominais deitados (no chão, invertido e na bola): o que eles têm em comum.
//
// O abdominal é a coluna enrolando, e não o quadril dobrando: `resolverTronco` monta a coluna a partir da bacia, com a
// flexão de cada região (lombar, torácica, cervical) distribuída igualmente pelos seus segmentos. Aqui:
//
// 1) `baseDeCostas`: deitado de costas no chão, a lombar firme (a curva da lombar um pouco achatada, `lombar`), a
//    bacia inclinada até o glúteo e a parte de cima das costas encostarem juntos no chão, e a cabeça no chão. É a
//    posição de partida do abdominal no chão; a bacia fica parada daí em diante (`pelve` nos contatos).
// 2) `troncoEnrolado`: com a bacia parada, a coluna enrola o que se pede (torácica, um pouco da lombar, o pescoço
//    acompanhando). As escápulas saem do chão; a parte de baixo da lombar e a bacia continuam apoiadas.
// 3) `bracosCruzados`: as mãos cruzadas no peito, presas ao tórax (sobem com ele): a mão direita espalmada no peito
//    esquerdo, os dedos para o ombro esquerdo, e a esquerda por cima do antebraço direito, no peito direito.
// 4) `pernasDobradas`: os pés no chão na largura do quadril, presos (bola e ponta do pé paradas), os joelhos para cima.
//
// As regras medidas ficam em ../regras/abdominais.ts.
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Corpo } from '../tabelas';
import { dirRef, noRef, norm, paraRef } from '../vec';
import type { V3 } from '../vec';
import { cabecaAoChao, folgaDaPelve, troncoDeCostas } from './flexao-joelho';

/* ============================== deitado de costas ============================== */
export interface BaseDeCostas {
  /** A pose do tronco deitado (bacia, inclinação, lombar e pescoço com a cabeça no chão). */
  pose: PoseTronco;
}
const BASES = new WeakMap<Corpo, Map<string, BaseDeCostas>>();
/**
 * Deitado de costas, a lombar com `lombar` graus de flexão além da curva de repouso: a bacia inclina até o glúteo
 * encostar no chão junto com as costas, o corpo anda em z para o centro do ombro direito ficar em `zOmbro` e o pescoço
 * dobra até a cabeça encostar no chão (o núcleo das flexões de joelho deitado, `troncoDeCostas`).
 */
export function baseDeCostas(corpo: Corpo, lombar: number, zOmbro: number): BaseDeCostas {
  const chave = `${lombar}|${zOmbro}`;
  let mapa = BASES.get(corpo);
  if (!mapa) BASES.set(corpo, (mapa = new Map()));
  const ja = mapa.get(chave);
  if (ja) return ja;
  const frente = resolver1((fr) => folgaDaPelve(corpo, fr, lombar), -80, -130, 30);
  const { t } = troncoDeCostas(corpo, frente, lombar, zOmbro);
  const b = { pose: { ...t.pose } };
  mapa.set(chave, b);
  return b;
}

export interface Enrolar {
  /** Flexão da torácica e da lombar além da base (graus). */
  toracica: number;
  lombar: number;
  /** Flexão do pescoço contada a partir do pescoço reto (o de quem está em pé), e da cabeça sobre ele (graus). */
  cervical: number;
  cabeca: number;
}
/**
 * A coluna enrolada sobre a bacia parada. O pescoço sai da posição da base (a cabeça no chão) e vai para `cervical`
 * com a fração `p` (0 = a cabeça no chão, 1 = o pescoço em `cervical`): é o pescoço acompanhando o tronco.
 */
export function troncoEnrolado(corpo: Corpo, b: BaseDeCostas, o: Enrolar, p: number): Tronco {
  const c0 = b.pose.cervical ?? 0;
  return resolverTronco(corpo, { ...b.pose, toracica: o.toracica, lombar: (b.pose.lombar ?? 0) + o.lombar, cervical: c0 + (o.cervical - c0) * p, cabeca: o.cabeca * p });
}
/** A cabeça encostada no chão (cm): o ponto mais baixo dela, para a regra e para o pescoço. */
export const cabecaNoChao = (corpo: Corpo, t: Tronco) => cabecaAoChao(corpo, t);

/* ============================== as mãos cruzadas no peito ============================== */
/** A frente do peito, no referencial do tórax: a pele mais à frente perto de (x, y). */
const PEITO = new WeakMap<Corpo, V3[]>();
function peito(corpo: Corpo): V3[] {
  const ja = PEITO.get(corpo);
  if (ja) return ja;
  const t = resolverTronco(corpo, { pelve: [0, 100, 0] });
  const solto = (k: Lado): PoseBraco => ({ umero: [sinal(k), -0.2, 0], antebraco: [sinal(k), -0.2, 0], polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
  const perna: PosePerna = { coxa: [0, -1, 0], canela: [0, -1, 0], polo: [0, 0, 1] };
  const e = resolverMembrosSoltos(t, solto, perna);
  const pts = pontosDoBoneco(e)
    .filter((x) => x.parte === 'tronco')
    .map((x) => paraRef(e.torax, x.p))
    .filter((l) => l[2] > 0);
  PEITO.set(corpo, pts);
  return pts;
}
function resolverMembrosSoltos(t: Tronco, braco: (k: Lado) => PoseBraco, perna: PosePerna): Esq {
  return resolverMembros(t, { R: braco('R'), L: braco('L') }, { R: perna, L: perna });
}
/** Quanto a pele do peito fica à frente da coluna (cm, no referencial do tórax), perto de (x, y). */
export function frenteDoPeito(corpo: Corpo, x: number, y: number): number {
  // a pele entre os pontos da superfície (12 por anel): a média pesada pela distância, na direção do peito
  let s = 0,
    z = 0;
  for (const p of peito(corpo)) {
    const w = Math.exp(-((p[0] - x) ** 2 + (p[1] - y) ** 2) / 8);
    s += w;
    z += w * p[2];
  }
  return z / s;
}

export interface MaosCruzadas {
  /** Onde fica o punho direito, no referencial do tórax: tantos cm para o lado esquerdo e tantos abaixo da base do pescoço. */
  x: number;
  y: number;
  /** O punho esquerdo fica tantos cm mais baixo (na direção dos pés) que o direito e por cima do antebraço direito. */
  abaixo: number;
  acima: number;
  /** Para onde o cotovelo aponta, no referencial do tórax (para fora e para os pés). */
  poloFora: number;
  poloPes: number;
  /** ...e para trás (para o chão, deitado): os cotovelos descem ao lado do corpo. */
  poloTras: number;
}
/** Os braços cruzados no peito, presos ao tórax `t`. */
export function bracosCruzados(corpo: Corpo, t: Tronco, o: MaosCruzadas): Record<Lado, PoseBraco> {
  const T = t.torax;
  const rp = corpo.m('raio.punho');
  const braco = (k: Lado): PoseBraco => {
    const s = sinal(k);
    // a mão de um lado vai ao peito do outro: o direito (s = −1) para +x
    const x = -s * o.x,
      y = o.y - (k === 'L' ? o.abaixo : 0);
    const z = frenteDoPeito(corpo, x, y) + rp + (k === 'L' ? o.acima : 0);
    // os dedos apontam para o ombro do outro lado; o polegar para o queixo; a palma para o peito
    const dedos: V3 = norm([-s * 0.9, 0.45, 0]);
    const polegar: V3 = norm([s * 0.45, 0.9, 0]);
    return { punho: noRef(T, [x, y, z]), polo: dirRef(T, norm([s * o.poloFora, -o.poloPes, -o.poloTras])), mao: { polegar: dirRef(T, polegar), dedos: dirRef(T, dedos), forma: 'aberta' } };
  };
  return { R: braco('R'), L: braco('L') };
}

/* ============================== as pernas ============================== */
/** Os pés no chão, paralelos e na largura do quadril, com a bola do pé em z; os joelhos para cima. */
export function pernasDobradas(corpo: Corpo, zBola: number, yChao = 0): Record<Lado, PosePerna> {
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * corpo.m('quadril.meiaDistancia'), yChao, zBola], dir: [0, 0, 1], calc: 0 }, polo: [0, 1, 0.15] });
  return { R: perna('R'), L: perna('L') };
}

/* ============================== medidas (as regras também usam) ============================== */
/** O queixo (aproximado: a frente de baixo da cabeça) e a fúrcula do esterno. */
export const queixo = (e: Tronco): V3 => noRef(e.cabeca, [0, e.corpo.m('cabeca.tragionAoTopo') - e.corpo.m('cabeca.altura') + 3, 7]);
export const furcula = (e: Tronco): V3 => noRef(e.torax, [0, e.corpo.m('altura.supraesternal') - e.corpo.m('altura.cervical'), frenteDoPeito(e.corpo, 0, e.corpo.m('altura.supraesternal') - e.corpo.m('altura.cervical'))]);
/** A distância do queixo à fúrcula (cm): pequena = o queixo no peito. */
export const queixoAoPeito = (e: Tronco) => {
  const a = queixo(e),
    b = furcula(e);
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
};
/** Inclinação do tórax (de T12–L1 a C7–T1) acima do chão, de lado (graus). */
export function inclinacaoDoTorax(t: Tronco): number {
  const a = t.nos[t.iT12]!.ref.o,
    b = t.torax.o;
  return (Math.atan2(b[1] - a[1], Math.abs(b[2] - a[2])) * 180) / Math.PI;
}

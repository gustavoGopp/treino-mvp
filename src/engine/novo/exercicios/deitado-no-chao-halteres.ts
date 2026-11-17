// O núcleo dos exercícios deitado de costas no chão, num colchonete, com um halter em cada mão (o supino no chão e o
// tríceps testa): o que eles têm em comum.
//
// 1) `deitadoNoColchonete`: deitado de costas no colchonete, joelhos dobrados, pés no chão (fora do colchonete, que só
//    vai da cabeça ao glúteo). A bacia inclina até o glúteo e a parte de cima das costas encostarem juntos no tampo do
//    colchonete, e o pescoço dobra até a nuca apoiar nele: é o tronco de costas do núcleo das flexões de joelho deitado
//    (./flexao-joelho.ts, `troncoDeCostas`, com o tampo do colchonete como piso). A lombar fica como no abdominal no
//    chão aprovado. `sobe`: quanto o glúteo sai do colchonete (o erro "levantar o quadril"), com as costas e a cabeça
//    paradas.
// 2) `pernasNoChao`: os pés no chão, paralelos, na largura do quadril, presos (bola e ponta do pé paradas), os joelhos
//    para cima (as pernas do abdominal no chão, ./abdominal.ts).
// 3) `chaoSob` e `folgaDoBracoAoChao`: a altura do que está embaixo de um ponto (o tampo do colchonete ou o chão) e quanto
//    a pele do braço fica acima disso. É com ela que o supino no chão acha onde o braço para (a parte de trás dele
//    encosta no chão). `folgaDoHalterAoChao` e `folgaDoHalterACabeca`: o mesmo para o halter, com que o tríceps testa
//    acha onde o cotovelo para (o halter perto do colchonete) e confere que o halter não bate na cabeça.
// 4) `colchoneteNaCena`: o colchonete da tabela de objetos, com a ponta de cima um pouco além da cabeça.
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import { chao, colchonete, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Prim } from '../desenho';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dist, mul, noRef } from '../vec';
import type { V3 } from '../vec';
import { pernasDobradas } from './abdominal';
import { folgaDaPelve, troncoDeCostas } from './flexao-joelho';

/** A espessura do colchonete (o tampo onde as costas, a cabeça e o glúteo apoiam). */
export const piso = () => obj('colchonete', 'esp');

export interface OpcoesDoDeitado {
  /** Flexão da lombar além da curva de repouso (graus). */
  lombar: number;
  /** Onde fica o centro do ombro direito em z (a cena é posta pelos ombros: eles não saem do lugar). */
  zOmbro: number;
  /** Quanto o glúteo sai do colchonete (cm); 0 = apoiado. */
  sobe?: number;
}

/** A inclinação da bacia para o glúteo ficar `sobe` cm acima do tampo, com as costas apoiadas. */
const FRENTES = new WeakMap<Corpo, Map<string, number>>();
export function frenteDaBacia(corpo: Corpo, lombar: number, sobe: number): number {
  const chave = `${lombar}|${sobe}`;
  let mapa = FRENTES.get(corpo);
  if (!mapa) FRENTES.set(corpo, (mapa = new Map()));
  const ja = mapa.get(chave);
  if (ja !== undefined) return ja;
  const fr = resolver1((x) => folgaDaPelve(corpo, x, lombar) - sobe, -80, -140, 32);
  mapa.set(chave, fr);
  return fr;
}

/** O tronco deitado de costas no colchonete (as costas e a cabeça no tampo, os ombros em `zOmbro`). */
export function deitadoNoColchonete(corpo: Corpo, o: OpcoesDoDeitado, frente?: number): Tronco {
  const fr = frente ?? frenteDaBacia(corpo, o.lombar, o.sobe ?? 0);
  return troncoDeCostas(corpo, fr, o.lombar, o.zOmbro, piso()).t;
}

/** Os pés no chão (fora do colchonete), a bola do pé em `zBola`. */
export const pernasNoChao = (corpo: Corpo, zBola: number): Record<Lado, PosePerna> => pernasDobradas(corpo, zBola, 0);

/** Os braços soltos (só para achar as pernas antes de pôr os braços). */
const SOLTO: PoseBraco = { umero: [0, 1, 0], antebraco: [0, 1, 0], polo: [0, 0, 1], mao: { polegar: [0, 0, -1] } };
/** Onde fica a bola do pé para o joelho dobrar `joelho` graus com o corpo deitado. */
export function zDaBola(corpo: Corpo, t: Tronco, joelho: number): number {
  return resolver1((z) => resolverMembros(t, { R: SOLTO, L: SOLTO }, pernasNoChao(corpo, z)).lado.R.ang.joelho - joelho, 20, 80, 30);
}

/* ============================== o colchonete ============================== */
/** O colchonete: ao comprido do corpo, com a ponta de cima `alemDaCabeca` cm além do topo da cabeça. */
export function zDoColchonete(corpo: Corpo, t: Tronco, alemDaCabeca: number): number {
  const topo = noRef(t.cabeca, [0, corpo.m('cabeca.tragionAoTopo'), 0])[2];
  return topo - alemDaCabeca + obj('colchonete', 'comp') / 2;
}
/** O que está embaixo de um ponto: o tampo do colchonete (centrado em x = 0, z = zCol) ou o chão. */
export function chaoSob(p: V3, zCol: number): number {
  const dentro = Math.abs(p[0]) <= obj('colchonete', 'larg') / 2 && Math.abs(p[2] - zCol) <= obj('colchonete', 'comp') / 2;
  return dentro ? piso() : 0;
}
export function colchoneteNaCena(zCol: number, chaoDe: [number, number, number, number]): { prims: Prim[]; pecas: Peca[] } {
  return { prims: [chao(...chaoDe), ...colchonete(0, zCol)], pecas: [{ t: 'colchonete', x0: 0, z0: zCol }] };
}

/* ============================== medidas ============================== */
/** As partes do braço (o braço e o antebraço, com o cotovelo). */
const BRACO = new Set(['braco', 'ante']);
/**
 * Quanto a pele da parte de trás do braço (da metade do braço até o cotovelo) e do antebraço de um lado fica acima do
 * que está embaixo dela (cm; negativo = entra). Os pontos da superfície do lado k são os do lado do cotovelo k (mais
 * perto dele que do outro). A metade de cima do braço fica de fora: perto do ombro, a pele de trás do ombro já está
 * deitada no colchonete, junto com as costas (e amassa nele como elas).
 */
export function folgaDoBracoAoChao(e: Esq, k: Lado, zCol: number): number {
  const c = e.lado[k].cotovelo,
    o = e.lado[k === 'R' ? 'L' : 'R'].cotovelo,
    ombro = e.lado[k].ombro,
    meio = e.corpo.m('braco.comp') / 2;
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!BRACO.has(parte) || dist(p, ombro) < meio) continue;
    const dc = Math.hypot(p[0] - c[0], p[2] - c[2]),
      d0 = Math.hypot(p[0] - o[0], p[2] - o[2]);
    if (dc > d0) continue;
    m = Math.min(m, p[1] - chaoSob(p, zCol));
  }
  return m;
}
/** A pose do tronco de um esqueleto (para refazer os membros sobre o mesmo tronco). */
export const mesmoTronco = (corpo: Corpo, e: Esq): Tronco => resolverTronco(corpo, e.pose);

/**
 * Pontos da casca de um halter (os cantos das duas cabeças sextavadas, os meios das arestas e os centros das faces),
 * do jeito que ../pecas.ts (`halter`) e o desenho (`prisma`) os põem: para medir quanto o halter fica do chão e da cabeça.
 */
export function pontosDoHalter(centro: V3, eixo: V3, objeto = 'halter'): V3[] {
  const out: V3[] = [];
  for (const p of halter(centro, eixo, 0, objeto)) {
    if (p.t !== 'prisma') continue;
    const n = p.lados;
    const canto = (c: V3, i: number): V3 => {
      const th = (2 * Math.PI * i) / n;
      return add(add(c, mul(p.x, p.ra * Math.cos(th))), mul(p.z, (p.rb / Math.sin(Math.PI / 2 - Math.PI / n)) * Math.sin(th) * Math.cos(Math.PI / n)));
    };
    for (let i = 0; i < n; i++) {
      const a = canto(p.a, i),
        b = canto(p.b, i),
        a2 = canto(p.a, i + 1),
        b2 = canto(p.b, i + 1);
      out.push(a, b, mul(add(a, b), 0.5), mul(add(a, a2), 0.5), mul(add(b, b2), 0.5));
    }
    out.push(p.a, p.b);
  }
  return out;
}
/** Quanto o halter fica acima do que está embaixo dele (cm; negativo = entra no colchonete ou no chão). */
export function folgaDoHalterAoChao(centro: V3, eixo: V3, objeto: string, zCol: number): number {
  return Math.min(...pontosDoHalter(centro, eixo, objeto).map((p) => p[1] - chaoSob(p, zCol)));
}
/** A menor distância do halter à pele da cabeça (cm), pelos pontos das duas superfícies. */
export function folgaDoHalterACabeca(e: Esq, centro: V3, eixo: V3, objeto: string): number {
  const H = pontosDoHalter(centro, eixo, objeto);
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'cabeca') continue;
    for (const h of H) m = Math.min(m, dist(p, h));
  }
  return m;
}

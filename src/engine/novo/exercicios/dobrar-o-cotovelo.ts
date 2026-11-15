// O núcleo comum das roscas do motor novo (alternada, martelo, com kettlebell e no banco inclinado): dobrar o
// cotovelo. O braço fica parado ao lado do tronco (o úmero não se move no tronco) e só o antebraço sobe, no plano do
// braço; a pegada (supinada ou neutra) sai do polegar. O que ele resolve em cada quadro, em vez de receber pronto:
//  - o braço e o antebraço por direções no referencial do tórax (o úmero fixo; o antebraço dobrado no ângulo do
//    instante, no plano do braço: o cotovelo é uma dobradiça);
//  - a mão: o polegar a tantos graus da posição neutra quanto a variação pede (supinada: polegar para fora; neutra:
//    polegar para a frente do antebraço); o cabo do halter atravessa a palma, na direção do polegar;
//  - o kettlebell gira em volta da alça: pende na vertical enquanto pode e, quando o antebraço sobe, encosta nele;
//  - em pé, o corpo parado: o quadril sai do equilíbrio (o centro de massa com as cargas embaixo sobre o meio do pé),
//    como no ./dobrar-o-quadril.ts, e não muda quando o braço sobe (só no erro "balançar o tronco").
// Cada variação traz a sua ficha de movimento; o banco inclinado usa só a parte do braço e da carga.
import { formaDoKettlebell } from '../equipamento';
import { resolverMembros, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, suave } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dirRef, dot, mix, mul, norm, perp, sub } from '../vec';
import type { Ref, V3 } from '../vec';
import { dobrarOQuadril } from './dobrar-o-quadril';

const rad = Math.PI / 180;

/* ============================== o braço ============================== */
export interface PedidoDoBraco {
  /** O úmero no tórax (graus): para fora (abdução) e à frente (flexão do ombro). */
  paraFora: number;
  aFrente: number;
  /** Flexão do cotovelo (graus; 0 = estendido). */
  cotovelo: number;
  /** Graus do polegar a partir da posição neutra (0 = polegar para a frente do antebraço; 90 = para fora, palma para a frente). */
  supinacao: number;
  forma?: 'pegada' | 'relaxada';
  diam?: number;
  /** Escápula (graus da clavícula), somados ao ritmo automático. */
  elev?: number;
  prot?: number;
}

/** O braço da rosca, por direções no tórax `T`: o úmero parado, o antebraço dobrado no plano do braço. */
export function bracoDaRosca(T: Ref, k: Lado, p: PedidoDoBraco): PoseBraco {
  const s = sinal(k);
  const ab = p.paraFora * rad,
    fl = p.aFrente * rad;
  // o úmero: para baixo, aberto `paraFora` para o lado e levado `aFrente` à frente
  const a = norm(dirRef(T, [s * Math.sin(ab), -Math.cos(ab) * Math.cos(fl), Math.cos(ab) * Math.sin(fl)]));
  // a frente do braço (lado do bíceps) e o lado de fora, perpendiculares ao úmero
  const frente = norm(perp(dirRef(T, [0, 0, 1]), a));
  const fora = norm(cross(frente, a));
  const sFora = dot(fora, dirRef(T, [s, 0, 0])) >= 0 ? fora : mul(fora, -1);
  const c = p.cotovelo * rad;
  const d = norm(add(mul(a, Math.cos(c)), mul(frente, Math.sin(c))));
  // a frente do antebraço (o lado do bíceps, para onde ele dobra) e o lado de fora dele
  const frenteAnte = norm(perp(sub(mul(frente, Math.cos(c)), mul(a, Math.sin(c))), d));
  const foraAnte = norm(perp(sFora, d));
  const sup = p.supinacao * rad;
  const polegar = norm(add(mul(frenteAnte, Math.cos(sup)), mul(foraAnte, Math.sin(sup))));
  return { umero: a, antebraco: d, polo: mul(frente, -1), mao: { polegar, forma: p.forma ?? 'pegada', diam: p.diam ?? obj('halter', 'caboDiam') }, elev: p.elev, prot: p.prot };
}

/* ============================== as cargas ============================== */
/**
 * O halter na mão: o centro do cabo na pegada, o cabo atravessando a palma (na direção do polegar). `objeto`: o id do
 * halter na tabela de objetos (por omissão, o de 25 lb; `'halterLeve'` é o de 10 lb). `paraOPolegar`: quantos cm o
 * halter corre ao longo do cabo para o lado do polegar (a mão encostada na cabeça do lado do dedo mínimo; 0 = a mão no
 * meio do cabo).
 */
export function halterNaMao(e: Esq, k: Lado, objeto = 'halter', paraOPolegar = 0): { prims: Quadro['prims']; peca: Peca; centro: V3 } {
  const eixo = e.lado[k].mao.x;
  // o eixo x da mão aponta para o polegar no lado esquerdo e para o dedo mínimo no direito (sinal do lado)
  const centro = paraOPolegar ? add(e.lado[k].pegada, mul(eixo, sinal(k) * paraOPolegar)) : e.lado[k].pegada;
  return { prims: halter(centro, eixo, 0.4, objeto), peca: objeto === 'halter' ? { t: 'halter', centro, eixo } : { t: 'halter', centro, eixo, objeto }, centro };
}

/**
 * O kettlebell pela alça, numa mão só: a barra de cima da alça atravessa a palma (na direção do polegar) e o
 * kettlebell gira em volta dela. Ele pende na vertical; quando o antebraço sobe, a bola encosta no antebraço e passa
 * a girar com ele (`folga` cm entre a bola e o antebraço). A volta entre os dois é suave (mínimo suave dos ângulos).
 */
export function kettlebellNaMao(e: Esq, k: Lado, folga: number): { prims: Quadro['prims']; peca: Peca; centro: V3; base: V3; cima: V3 } {
  const K = formaDoKettlebell();
  const L = e.lado[k];
  const eixo = norm(L.mao.x);
  const pega = L.pegada;
  // a barra de cima da alça passa pelo centro da pegada; a bola fica do lado oposto à alça, a esta distância
  const daAlca = K.altura - K.rAlca - K.centro;
  // as direções possíveis da bola (da alça para o centro da bola), no plano perpendicular à alça
  const baixo = norm(perp([0, -1, 0], eixo));
  const lado2 = norm(cross(eixo, baixo));
  const dir = (th: number): V3 => add(mul(baixo, Math.cos(th)), mul(lado2, Math.sin(th)));
  // o antebraço, da pegada ao cotovelo, no mesmo plano: o ângulo dele a partir de "para baixo"
  const ante = norm(perp(sub(L.cotovelo, pega), eixo));
  const thAnte = Math.atan2(dot(ante, lado2), dot(ante, baixo));
  // o menor afastamento (em ângulo) entre a bola e o antebraço: a bola (raio R) a `daAlca` da alça, com a folga
  // pedida até a pele do antebraço (raio médio do antebraço junto ao punho)
  const rAnte = 3.2;
  const minimo = Math.asin(Math.min(1, (K.R + rAnte + folga) / daAlca));
  // a bola fica do lado de "baixo" que está longe do antebraço; se o antebraço chega perto, a bola é empurrada
  const lado = thAnte >= 0 ? -1 : 1;
  const longe = thAnte + lado * minimo; // o ângulo da bola encostada no antebraço
  // pendendo: th = 0. Encostada: `longe`. Fica com o que está mais longe do antebraço, suavemente.
  const suaveMax = (x: number, y: number, r = 0.06) => (x + y + Math.sqrt((x - y) * (x - y) + r * r)) / 2 - r / 2;
  const th = lado < 0 ? -suaveMax(0, -longe) : suaveMax(0, longe);
  const d = dir(th);
  const centro = add(pega, mul(d, daAlca));
  const base = add(pega, mul(d, K.altura - K.rAlca));
  const cima = mul(d, -1);
  return { prims: [{ t: 'esfera', c: centro, r: K.R, cls: 'ferro' }], peca: { t: 'kettlebell', base, cima, lado: eixo }, centro, base, cima };
}

/* ============================== em pé ============================== */
export interface CorpoEmPe {
  e: Esq;
  pernas: Record<Lado, PosePerna>;
}
/**
 * O corpo em pé, parado: joelhos destravados, pés na largura do quadril, o centro de massa (com os braços e as cargas
 * do pedido) sobre o meio do pé. `inclina`: o peito para trás (graus, negativo) e a lombar em extensão, para o erro
 * "balançar o tronco"; o quadril vai à frente pelo próprio equilíbrio.
 */
export function corpoEmPe(corpo: Corpo, o: { joelho: number; pesMeia: number; tronco?: number; lombar?: number; bracos: (t: Tronco) => { R: PoseBraco; L: PoseBraco; cargas: (e: Esq) => Quadro['cargas'] } }): CorpoEmPe {
  const d = dobrarOQuadril(corpo, {
    joelho: o.joelho,
    tronco: o.tronco ?? 0,
    lombar: o.lombar ?? 0,
    toracica: 0,
    cervical: 0,
    cabeca: 0,
    pesMeiaDistancia: o.pesMeia,
    apoio: 'dois',
    bracos(e) {
      const b = o.bracos(e);
      return { R: b.R, L: b.L, cargas: b.cargas(e) };
    },
  });
  const pe = (s: number): PosePerna => ({ pe: { bola: d.bola(s), dir: [0, 0, 1], calc: 0 }, polo: [0, 0, 1] });
  return { e: d.e, pernas: { R: pe(-1), L: pe(1) } };
}

/* ============================== as roscas em pé ============================== */
/**
 * 'alternada': um halter em cada mão, palmas para a frente, um braço de cada vez; 'martelo': o mesmo com a pegada
 * neutra; 'kettlebell': um kettlebell na mão direita, a esquerda solta ao lado do corpo.
 */
export type RoscaEmPe = 'alternada' | 'martelo' | 'kettlebell';

/**
 * As roscas em pé. O parâmetro do movimento u vai de 0 (embaixo) a 1 (em cima) no braço direito; nas alternadas, de
 * 2 a 3 é o braço esquerdo que sobe (o direito fica embaixo). u = 0 e u = 2 são a mesma pose.
 */
export function criarRoscaEmPe(fichaJson: unknown, v: RoscaEmPe, o: { halter?: string } = {}): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const kb = v === 'kettlebell';
  /** O halter da tabela de objetos (o de 25 lb, se a variação não pedir outro). */
  const H = o.halter ?? 'halter';
  const supinacao = f('maos.supinacao');
  const CACHE = new WeakMap<Corpo, CorpoEmPe>();

  /** A flexão do cotovelo de um braço, com x de 0 (embaixo) a 1 (em cima). */
  const cotovelo = (x: number, erro?: string) => mix(erro === 'curta' ? f('erro.curta.cotovelo') : f('cotovelo.baixo'), erro === 'cotovelo' ? f('erro.cotovelo.cotovelo') : f('cotovelo.cima'), x);
  /** O braço de um lado, com x de 0 a 1 do seu movimento. */
  function braco(T: Ref, k: Lado, x: number, erro?: string): PoseBraco {
    if (kb && k === 'L') {
      // a mão esquerda solta, ao lado do corpo
      return bracoDaRosca(T, 'L', { paraFora: f('braco.paraFora'), aFrente: 0, cotovelo: f('livre.cotovelo'), supinacao: 0, forma: 'relaxada', diam: 3 });
    }
    return bracoDaRosca(T, k, {
      paraFora: f('braco.paraFora'),
      // no erro, o cotovelo vai à frente enquanto o antebraço sobe
      aFrente: f('braco.aFrente') + (erro === 'cotovelo' ? f('erro.cotovelo.braco') * suave(x) : 0),
      cotovelo: cotovelo(x, erro),
      supinacao,
      diam: kb ? obj('kettlebell', 'alcaDiam') : obj(H, 'caboDiam'),
    });
  }
  /** Quanto cada braço sobe no ponto u (direito, esquerdo). */
  const subida = (u: number): [number, number] => (u <= 1.5 ? [Math.max(0, Math.min(1, u)), 0] : [0, Math.max(0, Math.min(1, u - 2))]);
  const massa = kb ? obj('kettlebell', 'massa') : f('carga');
  /** As cargas para o equilíbrio do corpo parado: as que a mão segura, com os braços embaixo. */
  const cargasDe = (e: Esq): Quadro['cargas'] => (kb ? [{ massa, pos: kettlebellNaMao(e, 'R', f('kettlebell.folga')).centro }] : (['R', 'L'] as Lado[]).map((k) => ({ massa, pos: e.lado[k].pegada })));

  function corpoParado(corpo: Corpo): CorpoEmPe {
    let c = CACHE.get(corpo);
    if (c) return c;
    c = corpoEmPe(corpo, { joelho: f('joelho'), pesMeia: f('pes.meiaDistancia'), bracos: (t) => ({ R: braco(t.torax, 'R', 0), L: braco(t.torax, 'L', 0), cargas: cargasDe }) });
    CACHE.set(corpo, c);
    return c;
  }
  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const [xR, xL] = subida(u);
    const bracos = (t: Tronco) => ({ R: braco(t.torax, 'R', xR, erro), L: braco(t.torax, 'L', xL, erro) });
    let base: CorpoEmPe;
    if (erro === 'balanco') {
      // o tronco vai para trás enquanto o braço sobe (o impulso), e o quadril vai à frente pelo equilíbrio
      const x = Math.max(xR, xL);
      base = corpoEmPe(corpo, { joelho: f('joelho'), pesMeia: f('pes.meiaDistancia'), tronco: -f('erro.balanco.tronco') * suave(x), lombar: -f('erro.balanco.lombar') * suave(x), bracos: (t) => ({ ...bracos(t), cargas: cargasDe }) });
    } else base = corpoParado(corpo);
    const b = bracos(base.e);
    const e = resolverMembros(base.e, { R: b.R, L: b.L }, base.pernas);
    const q: Quadro = { esq: e, prims: [chao(-70, 70, -70, 90)], pecas: [], fios: [], cargas: [], marcas: {}, vies: { maoR: 1, maoL: 1 } };
    if (kb) {
      const K = kettlebellNaMao(e, 'R', f('kettlebell.folga'));
      q.prims.push(...K.prims);
      q.pecas = [K.peca];
      q.cargas.push({ massa, pos: K.centro });
      // a carga fica na mão (a alça passa pela pegada); a bola é acompanhada à parte
      q.marcas = { kettlebell: e.lado.R.pegada, bola: K.centro };
    } else {
      for (const k of ['R', 'L'] as Lado[]) {
        const M = halterNaMao(e, k, H);
        q.prims.push(...M.prims);
        q.pecas!.push(M.peca);
        q.cargas.push({ massa, pos: M.centro });
      }
      q.marcas = { halter: e.lado.R.pegada };
    }
    return q;
  }
  return { ficha: F, quadro };
}

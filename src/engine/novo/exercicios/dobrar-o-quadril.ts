// O núcleo comum dos stiffs do motor novo (com halteres, com kettlebell, com elástico e numa perna só): dobrar no
// quadril. Quem dobra é o quadril: os joelhos ficam levemente dobrados, quase no mesmo ângulo a série toda, a bacia
// inclina com a coluna neutra e o quadril vai para trás. O que ele resolve em cada quadro, em vez de receber pronto:
//  - a posição do quadril sai do ângulo do joelho pedido e do centro de massa (corpo + carga) sobre o meio do pé de
//    apoio, como em ./agachar.ts; numa perna só, também de lado (o centro de massa cai sobre o pé que apoia);
//  - as mãos ficam com os cotovelos quase estendidos e a carga rente às pernas: o braço gira no ombro até a carga
//    ficar à folga pedida da superfície da coxa ou da canela (a carga pende na vertical, da mão).
// Cada variação traz a sua ficha de movimento e diz o que as mãos seguram.
import { calibragem } from '../calibragens';
import { formaDoKettlebell } from '../equipamento';
import { LADOS, resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { centroDeMassa, daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { chao, halter } from '../pecas';
import type { Peca } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dirRef, mix, mul, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

export type Carga = Quadro['cargas'][number];
/** Uma esfera que representa a carga (ou a mão) na conta da folga até as pernas. */
export interface Esfera {
  c: V3;
  r: number;
}
export interface PedidoDoStiff {
  /** Flexão do joelho de apoio, inclinação do peito e flexão da lombar e da torácica além da curva de repouso (graus). */
  joelho: number;
  tronco: number;
  lombar: number;
  toracica: number;
  /** Flexão do pescoço e da cabeça (graus; 0 = a coluna longa até a cabeça). */
  cervical: number;
  cabeca: number;
  /** Meia distância entre os pés (cm). */
  pesMeiaDistancia: number;
  /** 'dois': os dois pés no chão; 'R': só o pé direito apoia e a perna esquerda fica livre. */
  apoio: 'dois' | 'R';
  /** Giro da bacia em torno do próprio eixo do tronco, com o lado esquerdo subindo (graus): o erro "abrir o quadril". */
  abre?: number;
  /**
   * O ângulo do quadril para trás (graus, visto de lado, do tornozelo ao quadril), quando ele é dado em vez de sair do
   * equilíbrio: o quadril fica parado enquanto só os braços se mexem (as elevações laterais). Só com os dois pés no chão.
   */
  alfa?: number;
  /**
   * Inclinação da coluna para a esquerda (graus; metade na lombar, metade na torácica), com a bacia parada: o erro
   * "inclinar para o lado" dos desenvolvimentos de um braço (acréscimo de 17/11/2026; sem ele, nada muda).
   */
  lado?: number;
  /** A perna livre (só com apoio 'R'), dado o tronco. */
  pernaLivre?(t: Tronco): PosePerna;
  /** Os braços e a carga, dado o esqueleto com o tronco e as pernas já no lugar (os braços ainda pendurados). */
  bracos(e: Esq): { R: PoseBraco; L: PoseBraco; cargas: Carga[] };
}
export interface Dobrado {
  e: Esq;
  cargas: Carga[];
  /** O ponto do chão sob a bola de cada pé (s = −1 direita, +1 esquerda) e o meio do pé de apoio. */
  bola(s: number): V3;
  meioDoPe: V3;
  /** O ângulo do quadril para trás usado (graus): o do equilíbrio ou o dado no pedido. */
  alfa: number;
}

/**
 * A bacia inclinada `frente` graus e girada `abre` graus em torno do próprio eixo do tronco, escrita com os giros que
 * o esqueleto aceita (giro em torno da vertical, inclinação à frente e inclinação para o lado, nessa ordem).
 */
export function pelveInclinadaEGirada(frente: number, abre: number): { giro: number; frente: number; lado: number } {
  if (!abre) return { giro: 0, frente, lado: 0 };
  const rad = Math.PI / 180,
    F = frente * rad,
    A = abre * rad;
  return {
    giro: Math.atan2(Math.sin(A), Math.cos(F) * Math.cos(A)) / rad,
    frente: Math.asin(Math.sin(F) * Math.cos(A)) / rad,
    lado: -Math.atan2(Math.sin(F) * Math.sin(A), Math.cos(F)) / rad,
  };
}

/** O raio de uma parte da perna (coxa ou perna) num ponto t do osso (0 a 1), na direção (lado, frente) da seção. */
function raio(corpo: Corpo, parte: 'coxa' | 'perna', t: number, cx: number, cz: number): number {
  const S = corpo.secoes[parte]!;
  let i = 0;
  while (i < S.length - 2 && t > S[i + 1]!.t) i++;
  const a = S[i]!,
    b = S[i + 1]!;
  const u = Math.max(0, Math.min(1, (t - a.t) / (b.t - a.t || 1)));
  const la = a.a + (b.a - a.a) * u,
    lf = cz >= 0 ? a.f + (b.f - a.f) * u : a.b + (b.b - a.b) * u;
  return 1 / Math.sqrt((cx / la) ** 2 + (cz / lf) ** 2);
}
/**
 * A menor folga (cm) entre as esferas e a superfície das pernas (coxa e perna, dos dois lados), com cada parte da
 * perna como um tubo de seção oval que acompanha a tabela do corpo. Negativa = a esfera entra na perna. É um mínimo
 * suave: fica um pouco abaixo do mínimo de verdade quando várias partes estão perto.
 */
const SUAVE = 1;
export function folgaDasPernas(e: Esq, esferas: Esfera[]): number {
  const corpo = e.corpo;
  const ds: number[] = [];
  for (const k of LADOS) {
    const L = e.lado[k];
    for (const [ref, parte, comp] of [
      [L.coxa, 'coxa', corpo.m('coxa.comp')],
      [L.canela, 'perna', corpo.m('perna.comp')],
    ] as const) {
      for (const s of esferas) {
        const l = paraRef(ref, s.c);
        const ao = -l[1],
          t = Math.max(0, Math.min(1, ao / comp));
        const rho = Math.hypot(l[0], l[2]) || 1e-6;
        const r = raio(corpo, parte, t, l[0] / rho, l[2] / rho);
        const alem = ao < 0 ? -ao : ao > comp ? ao - comp : 0;
        const d = alem ? Math.hypot(Math.max(0, rho - r), alem) : rho - r;
        ds.push(d - s.r);
      }
    }
  }
  // mínimo suave (1 cm): quando a parte mais perto da carga troca (da coxa para o joelho, do joelho para a canela), a
  // mão não muda de rumo de repente
  const min = Math.min(...ds);
  return min - SUAVE * Math.log(ds.reduce((a, d) => a + Math.exp(-(d - min) / SUAVE), 0));
}

/**
 * O centro da pegada com o braço quase estendido (`alcance` do ombro, na linha `x` pedida) e a carga rente às pernas:
 * o braço gira no ombro, para a frente ou para trás, até as esferas da carga ficarem a `folga` cm das pernas.
 */
export function pegadaRente(e: Esq, k: Lado, x: number, alcance: number, esferas: (pegada: V3) => Esfera[], folga: number): V3 {
  const g = (b: number) => folgaDasPernas(e, esferas(maoNoAngulo(e, k, x, alcance, b))) - folga;
  // vindo da frente (braço à frente do corpo) para trás, a primeira posição em que a carga chega à folga pedida: assim a
  // carga nunca passa para trás das pernas
  let b1 = 80;
  for (let b0 = 80; b0 >= -60; b0 -= 4) {
    if (g(b0) <= 0) return maoNoAngulo(e, k, x, alcance, resolver1(g, b0, b1, 24));
    b1 = b0;
  }
  return maoNoAngulo(e, k, x, alcance, b1);
}
/** O centro da pegada a `alcance` do ombro, na linha `x`, com o braço `b` graus à frente da vertical (visto de lado). */
export function maoNoAngulo(e: Esq, k: Lado, x: number, alcance: number, b: number): V3 {
  const o = e.lado[k].ombro;
  const rho = Math.sqrt(Math.max(1, alcance * alcance - (x - o[0]) ** 2));
  const rad = Math.PI / 180;
  return [x, o[1] - rho * Math.cos(b * rad), o[2] + rho * Math.sin(b * rad)];
}
/** O ângulo do braço à frente da vertical (graus, visto de lado) de uma pegada já resolvida. */
export const anguloDoBraco = (e: Esq, k: Lado): number => {
  const o = e.lado[k].ombro,
    p = e.lado[k].pegada;
  return Math.atan2(p[2] - o[2], o[1] - p[1]) / (Math.PI / 180);
};
/**
 * As direções do braço e do antebraço que levam o centro da pegada ao ponto `P`, com o cotovelo para o lado do `polo`
 * (o cotovelo fica no ângulo que a distância do ombro a `P` dá). Dadas por direção, e não por alvo, o ângulo do
 * cotovelo não muda quando a clavícula acompanha o braço e o ombro anda um pouco.
 */
export function bracoAte(e: Esq, k: Lado, P: V3, polo: V3): { umero: V3; antebraco: V3 } {
  const c = e.corpo,
    o = e.lado[k].ombro;
  const a = c.m('braco.comp'),
    b = c.m('antebraco.comp') + c.m('mao.punhoAoCentroDaPegada');
  const L = sub(P, o),
    d = Math.min(a + b - 1e-6, Math.hypot(...L));
  const u = norm(L);
  const lado = norm(sub(polo, mul(u, polo[0] * u[0] + polo[1] * u[1] + polo[2] * u[2])));
  const alfa = Math.acos(Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d))));
  const umero = add(mul(u, Math.cos(alfa)), mul(lado, Math.sin(alfa)));
  const cot = add(o, mul(umero, a));
  return { umero, antebraco: norm(sub(add(o, mul(u, d)), cot)) };
}
/** Distância do ombro ao centro da pegada com o cotovelo dobrado `cotovelo` graus (lei dos cossenos). */
export function alcanceDoBraco(corpo: Corpo, cotovelo: number): number {
  const a = corpo.m('braco.comp'),
    b = corpo.m('antebraco.comp') + corpo.m('mao.punhoAoCentroDaPegada'),
    c = (cotovelo * Math.PI) / 180;
  return Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(c));
}

export function dobrarOQuadril(corpo: Corpo, p: PedidoDoStiff): Dobrado {
  const m = (id: string) => corpo.m(id);
  const rad = Math.PI / 180;
  const dBola = m('pe.calcanharABola');
  const bola = (s: number): V3 => [s * p.pesMeiaDistancia, 0, dBola - m('pe.calcanharAoTornozelo')];
  const pe = (s: number): PosePerna => ({ pe: { bola: bola(s), dir: [0, 0, 1], calc: 0 }, polo: [0, 0, 1] });
  const hq = m('quadril.meiaDistancia'),
    th = m('coxa.comp'),
    sk = m('perna.comp'),
    a = p.joelho * rad;
  const giros = pelveInclinadaEGirada(p.tronco - p.lombar, p.abre ?? 0);
  // o eixo x da bacia já girada (de um quadril ao outro): o centro da bacia fica a hq do quadril de apoio
  const xDaPelve = resolverTronco(corpo, { pelve: [0, 0, 0], ...giros }).pelve.x;
  const semBracos: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
  const torn = resolverMembros(resolverTronco(corpo, { pelve: [0, 200, 0] }), { R: semBracos, L: semBracos }, { R: pe(-1), L: pe(1) }).lado.R.tornozelo;
  // o quadril de apoio fica a uma distância do tornozelo que só depende da flexão do joelho (lei dos cossenos)
  const d = Math.sqrt(th * th + sk * sk + 2 * th * sk * Math.cos(a));
  const montar = (hx: number, alfa: number, final = false) => {
    const plano = Math.sqrt(Math.max(1, d * d - (hx - torn[0]) ** 2));
    const quadril: V3 = [hx, torn[1] + plano * Math.cos(alfa * rad), torn[2] - plano * Math.sin(alfa * rad)];
    const pelve = add(quadril, mul(xDaPelve, hq));
    const t = resolverTronco(corpo, { pelve, ...giros, lombar: p.lombar, toracica: p.toracica, cervical: p.cervical, cabeca: p.cabeca, ...(p.lado ? { lombarLado: p.lado / 2, toracicaLado: p.lado / 2 } : {}) });
    const pernas = { R: pe(-1), L: p.apoio === 'R' && p.pernaLivre ? p.pernaLivre(t) : pe(1) };
    // braços pendurados, para achar os ombros; depois as mãos onde a variação pede (duas passadas: a elevação do
    // braço move a clavícula e o ombro)
    const pend = (k: Lado): PoseBraco => ({ pegada: add(t.torax.o, [sinal(k) * 18, -70, 0]), polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } });
    let e = resolverMembros(t, { R: pend('R'), L: pend('L') }, pernas);
    let b = p.bracos(e);
    e = resolverMembros(t, { R: b.R, L: b.L }, pernas);
    for (let i = 0; i < (final ? 4 : 1); i++) {
      b = p.bracos(e);
      e = resolverMembros(t, { R: b.R, L: b.L }, pernas);
    }
    return { e, cargas: b.cargas };
  };
  const meioDoPe: V3 = [bola(-1)[0], 0, bola(-1)[2] - dBola / 2];
  // a incógnita para trás (alfa) sai do equilíbrio: o centro de massa sobre o meio do pé
  const alfaPara = (hx: number) =>
    resolver1((x) => {
      const r = montar(hx, x);
      return centroDeMassa(r.e, 'homem', r.cargas)[2] - meioDoPe[2];
    }, -25, 70, 30);
  let hx = -hq,
    alfa = p.alfa ?? alfaPara(hx);
  if (p.apoio === 'R') {
    // numa perna só, o centro de massa também tem de cair sobre o pé de lado: a bacia vai para cima do pé de apoio
    for (let i = 0; i < 4; i++) {
      const r = montar(hx, alfa);
      hx -= centroDeMassa(r.e, 'homem', r.cargas)[0] - meioDoPe[0];
      alfa = alfaPara(hx);
    }
  }
  const r = montar(hx, alfa, true);
  return { ...r, bola, meioDoPe, alfa };
}

/* ============================== as variações ============================== */
/**
 * O que as mãos seguram: um halter em cada mão ('halteres'), o kettlebell pela alça com as duas mãos ('kettlebell'),
 * as pontas do elástico ('elastico', o tubo é desenhado por quem chama), um halter só na mão direita, numa perna só
 * ('halter'), ou um kettlebell só na mão esquerda, a do lado oposto à perna de apoio, numa perna só ('kettlebellOposta').
 */
export type MaosDoStiff = 'halteres' | 'kettlebell' | 'elastico' | 'halter' | 'kettlebellOposta';

/** A altura do meio das hastes da alça acima da base do kettlebell: é onde as mãos seguram. */
export const alturaDaPegadaDoKettlebell = () => {
  const K = formaDoKettlebell();
  return (K.topoDaBola + K.altura - K.rAlca) / 2;
};

export function criarStiff(fichaJson: unknown, maos: MaosDoStiff): { ficha: Ficha; quadro(corpo: Corpo, u: number, erro?: string): Quadro } {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const tem = (id: string) => id in F.param;
  const umaPerna = maos === 'halter' || maos === 'kettlebellOposta';
  /** A mão que segura a carga: a direita, menos no kettlebell na mão oposta à perna de apoio. */
  const maoDaCarga: Lado = maos === 'kettlebellOposta' ? 'L' : 'R';
  /** Numa mão só, ela segura o kettlebell pelo meio da barra de cima da alça: a base fica abaixo dela essa altura. */
  const alcaAcimaDaBase = () => formaDoKettlebell().altura - formaDoKettlebell().rAlca;
  const CACHE = new WeakMap<Corpo, number>();

  /** As esferas que fazem as vezes da carga na conta da folga até as pernas, para uma pegada da mão k. */
  const esferas = (k: Lado) => (pegada: V3): Esfera[] => {
    const s = sinal(k);
    if (maos === 'kettlebell') {
      const K = formaDoKettlebell();
      // a bola fica embaixo do meio das duas mãos (x = 0)
      return [{ c: [0, pegada[1] - alturaDaPegadaDoKettlebell() + K.centro, pegada[2]], r: K.R }];
    }
    if (maos === 'elastico') return [{ c: pegada, r: f('mao.raio') }];
    if (maos === 'kettlebellOposta') {
      const K = formaDoKettlebell();
      return [{ c: [pegada[0], pegada[1] - alcaAcimaDaBase() + K.centro, pegada[2]], r: K.R }];
    }
    // halter com o cabo atravessado (de um lado ao outro): as duas cabeças, cada uma como três esferas
    const ra = obj('halter', 'cabecaLargura') / 2,
      c0 = obj('halter', 'caboComp') / 2,
      c1 = obj('halter', 'comp') / 2;
    const out: Esfera[] = [];
    for (const lado of [-1, 1]) for (const fr of [0.2, 0.5, 0.8]) out.push({ c: add(pegada, [lado * s * (c0 + (c1 - c0) * fr), 0, 0]), r: ra });
    return out;
  };

  function pose(corpo: Corpo, o: { joelho: number; tronco: number; lombar: number; toracica: number; folga: number; abre: number; u: number; livre: number; braco?: number }): Dobrado {
    const alcance = alcanceDoBraco(corpo, f('cotovelo'));
    return dobrarOQuadril(corpo, {
      joelho: o.joelho,
      tronco: o.tronco,
      lombar: o.lombar,
      toracica: o.toracica,
      cervical: f('cervical'),
      cabeca: f('cabeca'),
      pesMeiaDistancia: f('pes.meiaDistancia'),
      apoio: umaPerna ? 'R' : 'dois',
      abre: o.abre,
      pernaLivre: umaPerna ? (t) => pernaLivre(t, o.u, o.livre) : undefined,
      bracos(e) {
        const T = e.torax;
        const braco = (k: Lado, pegada: V3, polegar: V3, diam: number, forma: 'pegada' | 'relaxada' = 'pegada'): PoseBraco => {
          // os cotovelos apontam para trás e para fora; a palma fica virada para as pernas
          const polo = norm(dirRef(T, [sinal(k) * f('cotovelo.paraFora'), 0, -1]));
          return { ...bracoAte(e, k, pegada, polo), polo, mao: { polegar, forma, diam } };
        };
        if (maos === 'halter') {
          // o halter na mão direita, com o braço na vertical do ombro (de frente); a mão esquerda pende, solta
          const pR = o.braco !== undefined ? maoNoAngulo(e, 'R', e.lado.R.ombro[0], alcance, o.braco) : pegadaRente(e, 'R', e.lado.R.ombro[0], alcance, esferas('R'), o.folga);
          const oL = e.lado.L.ombro;
          return {
            R: braco('R', pR, [1, 0, 0], obj('halter', 'caboDiam')),
            L: braco('L', [oL[0], oL[1] - alcance, oL[2]], [-1, 0, 0], 3, 'relaxada'),
            cargas: [{ massa: f('carga'), pos: pR }],
          };
        }
        if (maos === 'kettlebellOposta') {
          // o kettlebell na mão esquerda, pela barra de cima da alça; a mão desce perto da perna de apoio, um pouco para
          // dentro do pé (a bola passa rente à canela, pela frente); a mão direita pende, solta
          const xL = e.lado.R.bola[0] + f('kettlebell.paraDentroDoPe');
          const pL = o.braco !== undefined ? maoNoAngulo(e, 'L', xL, alcance, o.braco) : pegadaRente(e, 'L', xL, alcance, esferas('L'), o.folga);
          const oR = e.lado.R.ombro;
          return {
            R: braco('R', [oR[0], oR[1] - alcance, oR[2]], [1, 0, 0], 3, 'relaxada'),
            L: braco('L', pL, [-1, 0, 0], obj('kettlebell', 'alcaDiam')),
            cargas: [{ massa: obj('kettlebell', 'massa'), pos: esferas('L')(pL)[0]!.c }],
          };
        }
        const x = maos === 'kettlebell' ? formaDoKettlebell().meiaAlca : f('maos.meiaDistancia');
        const pR = o.braco !== undefined ? maoNoAngulo(e, 'R', -x, alcance, o.braco) : pegadaRente(e, 'R', -x, alcance, esferas('R'), o.folga);
        // simétrico: a mão esquerda espelha a direita
        const pL: V3 = [-pR[0], pR[1], pR[2]];
        const diam = maos === 'kettlebell' ? obj('kettlebell', 'alcaDiam') : maos === 'elastico' ? obj('elastico', 'pegadorDiam') : obj('halter', 'caboDiam');
        const cargas: Carga[] =
          maos === 'halteres'
            ? [{ massa: f('carga'), pos: pR }, { massa: f('carga'), pos: pL }]
            : maos === 'kettlebell'
              ? [{ massa: obj('kettlebell', 'massa'), pos: esferas('R')(pR)[0]!.c }]
              : [];
        return { R: braco('R', pR, [1, 0, 0], diam), L: braco('L', pL, [-1, 0, 0], diam), cargas };
      },
    });
  }
  /**
   * A perna livre (numa perna só): sobe para trás em linha com o tronco. Em cima ela pende com o joelho dobrado o
   * bastante para o pé sair do chão; embaixo, a coxa segue a linha que vai da base do pescoço ao quadril.
   */
  function pernaLivre(t: Tronco, u: number, joelho: number): PosePerna {
    const rad = Math.PI / 180;
    const P = t.pelve;
    const linha = paraRef({ ...P, o: [0, 0, 0] }, sub(P.o, t.torax.o));
    const naLinha = Math.atan2(-linha[2], -linha[1]) / rad;
    const th = mix(f('livre.coxa.cima'), naLinha, u) * rad,
      kn = joelho * rad,
      pf = f('livre.tornozelo') * rad;
    const coxa: V3 = [0, -Math.cos(th), -Math.sin(th)],
      canela: V3 = [0, -Math.cos(th + kn), -Math.sin(th + kn)];
    const frente: V3 = [0, canela[2], -canela[1]];
    const dedos = add(mul(frente, Math.cos(pf)), mul(canela, Math.sin(pf)));
    return { coxa: dirRef(P, coxa), canela: dirRef(P, canela), peDir: dirRef(P, dedos), polo: dirRef(P, [0, coxa[2], -coxa[1]]) };
  }
  /** A inclinação do tronco embaixo: a que leva as mãos à altura que a ficha dá (numa perna só, a ficha dá o ângulo). */
  function troncoEmbaixo(corpo: Corpo): number {
    if (tem('tronco.baixo')) return f('tronco.baixo');
    let c = CACHE.get(corpo);
    if (c !== undefined) return c;
    const alvo = corpo.m('altura.maleolo') + f('maos.embaixo') * (corpo.m('altura.joelho') - corpo.m('altura.maleolo'));
    // as duas contas demoradas do stiff (esta e o perfil do braço, abaixo) vêm guardadas para o corpo do app: ../calibragens.ts
    c = calibragem(corpo, `${F.id}:tronco-embaixo`, () => resolver1((x) => pose(corpo, { joelho: f('joelho.baixo'), tronco: x, lombar: 0, toracica: 0, folga: f('carga.folga'), abre: 0, u: 1, livre: 0 }).e.lado.R.pegada[1] - alvo, 40, 100, 24));
    CACHE.set(corpo, c);
    return c;
  }
  /** O pedido de cada instante (sem o ângulo do braço). */
  function pedido(corpo: Corpo, u: number, erro?: string) {
    const baixo = troncoEmbaixo(corpo);
    const arred = erro === 'arred',
      agach = erro === 'agachar';
    const lombar = arred ? f('erro.arred.lombar') * u : 0;
    return {
      joelho: mix(f('joelho.cima'), f(agach ? 'erro.agachar.joelho' : 'joelho.baixo'), u),
      // no erro "coluna arredondada", a bacia para de inclinar antes e quem dobra é a lombar (e um pouco a torácica)
      tronco: mix(f('tronco.cima'), agach ? f('erro.agachar.tronco') : arred ? baixo - f('erro.arred.bacia') : baixo, u) + lombar,
      lombar,
      toracica: arred ? f('erro.arred.toracica') * u : 0,
      folga: erro === 'longe' ? mix(f('carga.folga'), f('erro.longe.folga'), u) : f('carga.folga'),
      abre: erro === 'abre' ? f('erro.abre.giro') * u : 0,
      u,
      // o joelho da perna livre (numa perna só); no erro "agachar" ele continua dobrado, com o pé longe do chão
      livre: umaPerna ? mix(f('livre.joelho.cima'), f(agach ? 'erro.agachar.livre.joelho' : 'livre.joelho.baixo'), u) : 0,
    };
  }
  /**
   * O ângulo do braço ao longo da descida. Rente às pernas, a carga sobe na frente do joelho e volta para a canela; o
   * braço segue esse contorno em 25 pontos, alisado (sem descer abaixo da folga pedida: primeiro o maior dos vizinhos,
   * depois a média), para a mão e o quadril não mudarem de rumo de repente.
   */
  const PERFIS = new WeakMap<Corpo, Map<string, number[]>>();
  // o kettlebell numa mão só passa rente à coxa com a bola, que é larga: com mais pontos, o alisamento não o afasta
  // da perna no começo da descida (as outras variações ficam com os 25 pontos de sempre)
  const N = maos === 'kettlebellOposta' ? 48 : 24;
  function perfil(corpo: Corpo, erro?: string): number[] {
    let porErro = PERFIS.get(corpo);
    if (!porErro) PERFIS.set(corpo, (porErro = new Map()));
    const ja = porErro.get(erro ?? '');
    if (ja) return ja;
    const b = calibragem(corpo, `${F.id}:perfil-do-braco:${erro ?? ''}`, () => {
      const cru: number[] = [];
      for (let i = 0; i <= N; i++) cru.push(anguloDoBraco(pose(corpo, pedido(corpo, i / N, erro)).e, maoDaCarga));
      const viz = (v: number[], i: number) => v[Math.max(0, Math.min(N, i))]!;
      let b: number[] = cru.map((_, i) => Math.max(viz(cru, i - 1), viz(cru, i), viz(cru, i + 1)));
      for (let k = 0; k < 2; k++) {
        const v: number[] = b;
        b = v.map((_, i) => (viz(v, i - 1) + 2 * viz(v, i) + viz(v, i + 1)) / 4);
      }
      return b;
    });
    porErro.set(erro ?? '', b);
    return b;
  }
  /** Catmull-Rom pelos pontos do perfil. */
  function noPerfil(b: number[], u: number): number {
    const x = Math.max(0, Math.min(1, u)) * N,
      i = Math.min(N - 1, Math.floor(x)),
      t = x - i;
    const p = (j: number) => b[Math.max(0, Math.min(N, j))]!;
    const p0 = p(i - 1),
      p1 = p(i),
      p2 = p(i + 1),
      p3 = p(i + 2);
    return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  }
  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const r = pose(corpo, { ...pedido(corpo, u, erro), braco: noPerfil(perfil(corpo, erro), u) });
    const e = r.e;
    const q: Quadro = { esq: e, prims: [chao(-70, 70, -110, 90)], pecas: [], fios: [], cargas: r.cargas, marcas: {} };
    if (maos === 'halteres' || maos === 'halter') {
      const pecas: Peca[] = [];
      for (const k of maos === 'halter' ? (['R'] as Lado[]) : LADOS) {
        // o halter pende na vertical, com o cabo atravessado (de um lado ao outro)
        const centro = e.lado[k].pegada,
          eixo: V3 = [1, 0, 0];
        q.prims.push(...halter(centro, eixo, 0.4));
        pecas.push({ t: 'halter', centro, eixo });
      }
      q.pecas = pecas;
      q.marcas = { halter: e.lado.R.pegada };
    }
    if (maos === 'kettlebellOposta') {
      const K = formaDoKettlebell();
      // o kettlebell pende na vertical da mão esquerda, que segura o meio da barra de cima da alça
      const p = e.lado.L.pegada;
      const base: V3 = [p[0], p[1] - alcaAcimaDaBase(), p[2]];
      q.prims.push({ t: 'esfera', c: [base[0], base[1] + K.centro, base[2]], r: K.R, cls: 'ferro' });
      q.pecas = [{ t: 'kettlebell', base, cima: [0, 1, 0], lado: [1, 0, 0] }];
      q.marcas = { kettlebell: p };
    }
    if (maos === 'kettlebell') {
      const K = formaDoKettlebell();
      // a alça passa pelas duas mãos; a bola fica embaixo do meio
      const meio: V3 = mul(add(e.lado.R.pegada, e.lado.L.pegada), 0.5);
      const base: V3 = [meio[0], meio[1] - alturaDaPegadaDoKettlebell(), meio[2]];
      q.prims.push({ t: 'esfera', c: [base[0], base[1] + K.centro, base[2]], r: K.R, cls: 'ferro' });
      q.pecas = [{ t: 'kettlebell', base, cima: [0, 1, 0], lado: [1, 0, 0] }];
      q.marcas = { kettlebell: meio };
    }
    return q;
  }
  return { ficha: F, quadro };
}

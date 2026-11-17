// O núcleo comum dos exercícios de puxar na polia do motor novo (a remada baixa sentada com o triângulo, a remada
// unilateral em pé com o estribo e o abdominal ajoelhado com a corda). O que eles têm em comum:
//  - a coluna de polia (../pecas.ts: `torre`, `centroDaRoldana`, `saidaDoCabo`), com o cabo reto da roldana até o
//    puxador e a pilha que sobe o curso do cabo dividido pela relação da máquina (`cenaDaPolia`);
//  - o tronco inclinado por uma medida (a inclinação do peito), e não pela bacia (`frenteParaOPeito`);
//  - a distância entre duas regiões da pele do Boneco (`folgaEntre`), para pôr a mão rente ao corpo sem atravessá-lo;
//  - o braço que puxa o estribo (`bracoPeloCabo`): o antebraço na linha do cabo, o braço girando do começo ao fim.
//
// As regras medidas ficam em ../regras/polia-puxar.ts.
import { pontosDoBoneco } from '../boneco';
import { resolverMembros, resolverTronco } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, PoseTronco, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Quadro } from '../movimento';
import { cabo, centroDaRoldana, saidaDoCabo, torre } from '../pecas';
import type { Peca, Torre } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dist, dot, mix, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const rad = Math.PI / 180;

/** Inclinação do peito à frente da vertical (graus), medida no tórax. */
export const inclinacaoDoPeito = (t: Tronco) => Math.atan2(t.torax.y[2], t.torax.y[1]) / rad;

/** A inclinação da bacia (`frente` de resolverTronco) que deixa o peito `peito` graus à frente da vertical. */
export function frenteParaOPeito(corpo: Corpo, pose: PoseTronco, peito: number): number {
  return resolver1((x) => inclinacaoDoPeito(resolverTronco(corpo, { ...pose, frente: x })) - peito, -60, 100, 32);
}

/** A menor distância (cm) entre os pontos da pele das partes `a` e os das partes `b` (negativa não existe: é a distância entre pontos). */
export function folgaEntre(e: Esq, a: (parte: string, p: V3) => boolean, b: (parte: string, p: V3) => boolean): number {
  const P = pontosDoBoneco(e);
  const A = P.filter((x) => a(x.parte, x.p)).map((x) => x.p),
    B = P.filter((x) => b(x.parte, x.p)).map((x) => x.p);
  let m = 1e9;
  for (const p of A) for (const q of B) m = Math.min(m, dist(p, q));
  return m;
}

/**
 * A coluna de polia e o cabo, reto da roldana até o ponto em que ele prende (`prende`: o elo do estribo, a ponta do
 * triângulo ou a bucha da corda). `repouso` é o comprimento do cabo com a pilha no lugar (a pilha fica 2 cm acima do
 * apoio, para se ver que está levantada); cada centímetro a mais de cabo sobe a pilha meio centímetro (a relação 2:1).
 * `cortadaEmCima`: até que altura o quadro precisa mostrar a coluna (polia baixa: o resto é cortado pela borda).
 */
export function cenaDaPolia(t: Torre, prende: V3, repouso: number, cenario = false, cortadaEmCima?: number): { prims: Quadro['prims']; pecas: Peca[]; comp: number; subida: number; saida: V3 } {
  const saida = saidaDoCabo(t, prende);
  const comp = dist(prende, saida);
  const subida = Math.max(0, comp - repouso) / obj('torre', 'relacao') + 2;
  return { prims: [...torre(t, subida), cabo(prende, saida)], pecas: [{ t: 'torre', torre: t, subida, ...(cenario ? { cenario } : {}), ...(cortadaEmCima !== undefined ? { cortadaEmCima } : {}) }, { t: 'cabo', a: prende, b: saida }], comp, subida, saida };
}

export interface BracoPeloCabo {
  /** O tronco já resolvido, as pernas e o braço esquerdo (a mão livre). */
  tronco: Tronco;
  pernas: Record<Lado, PosePerna>;
  outro: PoseBraco;
  /** O centro da roldana: o antebraço aponta para ela (o cabo é reto da roldana até a mão). */
  roldana: V3;
  /** A direção final do braço direito (do ombro ao cotovelo), no mundo. */
  fim: V3;
  /** 0 = braço estendido para a polia, 1 = no fim. */
  fundo: number;
  /** No começo, quanto o cotovelo dobra (graus). */
  flexIni: number;
  /** Para onde o cotovelo aponta, o polegar (o eixo da pegada) e o diâmetro do que a mão segura. */
  polo: V3;
  polegar: V3;
  diam: number;
  /** Elevação e protração da clavícula (graus, somados ao ritmo do ombro). */
  elev: number;
  prot: number;
}
/**
 * O braço direito que puxa um estribo (o mesmo da puxada unilateral, ./puxada-unilateral.ts): o antebraço fica na
 * linha do cabo (a mão é puxada por ele, que é reto da polia até ela), e só o braço (ombro → cotovelo) é dirigido. Ele
 * gira, no plano do braço, da direção da polia (no começo o cotovelo dobra `flexIni`: no triângulo ombro–cotovelo–
 * polia, isso dá o pequeno ângulo de partida entre o braço e a linha ombro–polia) até a direção final. A conta é
 * repetida com o ombro de verdade (ele anda com o ritmo da escápula).
 */
export function bracoPeloCabo(corpo: Corpo, o: BracoPeloCabo): Esq {
  const m = (id: string) => corpo.m(id);
  const com = (umero: V3, antebraco: V3) => resolverMembros(o.tronco, { R: { umero, antebraco, polo: o.polo, mao: { polegar: o.polegar, forma: 'pegada', diam: o.diam }, elev: o.elev, prot: o.prot }, L: o.outro }, o.pernas);
  let umero = o.fim,
    antebraco = o.fim,
    e = com(umero, antebraco);
  const fim = o.fim;
  for (let i = 0; i < 4; i++) {
    const ombro = e.lado.R.ombro;
    const paraPolia = norm(sub(o.roldana, ombro));
    const ang = Math.acos(Math.max(-1, Math.min(1, paraPolia[0] * fim[0] + paraPolia[1] * fim[1] + paraPolia[2] * fim[2])));
    const fi = o.flexIni * rad;
    const partida = fi - Math.asin(Math.min(1, (m('braco.comp') * Math.sin(fi)) / dist(o.roldana, ombro)));
    const alfa = mix(partida, ang, o.fundo);
    umero = norm(add(mul(paraPolia, Math.sin(ang - alfa) / Math.sin(ang)), mul(fim, Math.sin(alfa) / Math.sin(ang))));
    e = com(umero, antebraco);
    antebraco = norm(sub(o.roldana, e.lado.R.cotovelo));
    e = com(umero, antebraco);
  }
  return e;
}

/** A torre com a roldana em `roldana` (o centro), a coluna atrás dela na direção `paraAPessoa`. */
export function torreComARoldana(roldana: V3, paraAPessoa: V3): Torre {
  const frente = norm([paraAPessoa[0], 0, paraAPessoa[2]]);
  const t0: Torre = { base: [0, 0, 0], frente, alturaDaPolia: roldana[1] };
  const c0 = centroDaRoldana(t0);
  return { ...t0, base: [roldana[0] - c0[0], 0, roldana[2] - c0[2]] };
}

/**
 * Quanto as mãos ficam à frente da barriga (cm; negativo = dentro dela): o ponto mais de trás da pele das mãos contra
 * o ponto mais à frente da pele do tronco na mesma faixa de altura e de largura das mãos.
 */
export function folgaDaBarriga(e: Esq): number {
  const P = pontosDoBoneco(e);
  const M = P.filter((x) => x.parte === 'mao' || x.parte === 'polegar').map((x) => x.p);
  const y0 = Math.min(...M.map((p) => p[1])) - 1,
    y1 = Math.max(...M.map((p) => p[1])) + 1,
    x0 = Math.min(...M.map((p) => p[0])) - 1,
    x1 = Math.max(...M.map((p) => p[0])) + 1;
  let frente = -1e9;
  for (const { p, parte } of P) if ((parte === 'tronco' || parte === 'cintura' || parte === 'emendaDaCintura') && p[1] >= y0 && p[1] <= y1 && p[0] >= x0 && p[0] <= x1) frente = Math.max(frente, p[2]);
  return Math.min(...M.map((p) => p[2])) - frente;
}

/**
 * Quanto as partes `quais` entram no tronco (cm; 0 = não entram): cada anel da pele do tronco (12 pontos) contra os
 * pontos dessas partes que ficam no plano dele (a 1,5 cm); um ponto entra quando fica mais perto do centro do anel que
 * a pele do anel naquela direção.
 */
export function entraNoTronco(e: Esq, quais: (parte: string) => boolean): number {
  const P = pontosDoBoneco(e);
  const fora = P.filter((x) => quais(x.parte)).map((x) => x.p);
  let pior = 0;
  for (let i = 0; i + 12 <= P.length; i += 12) {
    const parte = P[i]!.parte;
    if (parte !== 'tronco' && parte !== 'cintura' && parte !== 'emendaDaCintura') continue;
    const anel = P.slice(i, i + 12).map((x) => x.p);
    const c = mul(anel.reduce((a, b) => add(a, b), [0, 0, 0] as V3), 1 / 12);
    const n = norm(cross(sub(anel[0]!, c), sub(anel[3]!, c)));
    for (const p of fora) {
      const d = sub(p, c);
      const h = dot(d, n);
      if (Math.abs(h) > 1.5) continue;
      const r = sub(d, mul(n, h));
      const rr = Math.hypot(r[0], r[1], r[2]);
      if (rr < 1e-6) continue;
      const u = mul(r, 1 / rr);
      // a pele do anel na direção u: o maior alcance dos pontos do anel nessa direção (o anel é convexo)
      let pele = 0;
      for (const q of anel) pele = Math.max(pele, dot(sub(q, c), u));
      pior = Math.max(pior, pele - rr);
    }
  }
  return pior;
}

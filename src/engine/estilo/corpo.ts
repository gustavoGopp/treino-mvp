// R4 (experimento do boneco): o corpo nos estilos novos, A (boneco aprimorado) e B (silhueta limpa).
// Opção paralela do motor: não muda nada do estilo atual (body() em ../desenho.ts). Usa o mesmo esqueleto
// (skel), as mesmas poses aprovadas e as mesmas primitivas de saída (push), só com outro desenho.
// As medidas da forma do tronco e a espessura dos membros são escolha de design (proporções aproximadas
// de um adulto, em cm, coerentes com B em ../esqueleto.ts), não dado anatômico medido.
//
// Acabamento A2 (auditoria independente do boneco, 04/11/2026; docs/revisoes/boneco-acabamento/; o Gustavo
// escolheu a proposta 2). As mudanças são ligadas por CTX.ACABAMENTO; sem ele, a saída é a mesma do estilo A:
//   tronco1   tronco num só <path> (sem as listras entre as fatias)
//   quadril   a pelve cobre o começo da coxa de perto (a coxa "sai" do quadril, sem a pílula por cima)
//   folga     folga da cor do fundo em volta do braço de perto (separa braço e tronco de lado)
//   juntas    lista das juntas marcadas (ex.: ['E']); [] = nenhuma; ausente = todas (como hoje)
//   mao       mão em forma de punho/luva, mais larga que o punho
//   conico    membros que afinam (coxa larga no quadril, antebraço fino no punho, pé em cunha)
import { CTX } from '../contexto';
import { f1, hull, isSide, push } from '../desenho';
import { B } from '../esqueleto';
import { add, comb, mul, norm, sub } from '../port';
import type { Acabamento, Esqueleto, PartesDoCorpo, PontoTela, V2, V3 } from '../tipos';

export type EstiloNovo = 'a' | 'b';
/** Segmentos dos membros (as chaves de RAIO). */
type Segmento = 'ua' | 'fa' | 'mao' | 'th' | 'sk' | 'calc' | 'pe';
/** Um segmento de membro: [começo, fim, espessura, nome]; em 3D na montagem e já projetado no desenho. */
type Seg = [V3, V3, number, Segmento];
type Classe = (base: string, longe?: boolean) => string;
/** O que o membro precisa saber do corpo: o acabamento, se é braço ou perna e, na perna, as cascas do tronco. */
type OpcoesMembro = { PR: Acabamento; braco?: boolean; perna?: boolean; sk?: Esqueleto; cascas?: V2[][] };

const pts = (Q: PontoTela[]) => Q.map((q) => f1(q[0]) + ',' + f1(q[1])).join(' ');
const zMedio = (V: V3[]) => V.reduce((s, v) => s + CTX.PJ(v)[2], 0) / V.length;
const P_ = (): Acabamento => CTX.ACABAMENTO || {};

/** Seção elíptica do tronco: centro c, eixos x (largura) e f (profundidade), semieixos a e b. */
function anel(c: V3, x: V3, f: V3, a: number, b: number, n = 18) {
  const out: V3[] = [];
  for (let i = 0; i < n; i++) {
    const th = (2 * Math.PI * i) / n;
    out.push(comb(1, c, a * Math.cos(th), x, b * Math.sin(th), f));
  }
  return out;
}

// Seções do tronco, de baixo para cima: [altura no eixo, semilargura, semiprofundidade, desvio para a frente].
// Abaixo da cintura seguem a pelve (P, uL/fL/xL); acima, o tórax (M, uT/fT/xT).
const PELVE: [number, number, number, number][] = [
  [-4, 12, 8.5, -1],
  [2, 16, 10.5, -1.5],
  [12, 13.5, 9, 0],
];
const TORAX: [number, number, number, number][] = [
  [3, 14, 9.5, 0.5],
  [15, 16.5, 11, 1],
  [24, 17.5, 9.5, 0],
  [29.5, 10.5, 7, -1],
];

export function aneisTronco(sk: Esqueleto) {
  const r: V3[][] = [];
  for (const [h, a, b, d] of PELVE) r.push(anel(comb(1, sk.P, h, sk.uL, d, sk.fL), sk.xL, sk.fL, a, b));
  for (const [h, a, b, d] of TORAX) r.push(anel(comb(1, sk.M, h, sk.uT, d, sk.fT), sk.xT, sk.fT, a, b));
  return r;
}

// Espessuras (diâmetro, cm): braço, antebraço, mão, coxa, perna, pé, pescoço.
/** Raio do ombro arredondado do acabamento A2 (cm; escolha de design, um pouco mais largo que o começo do braço). */
const RAIO_OMBRO = 5.4;
/** Direções em volta de um ponto (para o contorno de uma esfera em qualquer vista). */
const DIRS = (() => {
  const r: V3[] = [];
  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 12; j++) {
      const t = (i / 5) * Math.PI, f = (j / 12) * 2 * Math.PI;
      r.push([Math.sin(t) * Math.cos(f), Math.cos(t), Math.sin(t) * Math.sin(f)]);
    }
  return r;
})();
const ESP = { ua: 9, fa: 7.5, mao: 5.5, th: 14, sk: 10, pe: 5, pesc: 8 };
// "conico": raio (cm) no começo e no fim de cada segmento
const RAIO: Record<Segmento, V2> = { ua: [4.4, 3.6], fa: [3.6, 2.6], mao: [2.8, 3.9], th: [8, 5.4], sk: [5.2, 3.1], calc: [3.4, 3.4], pe: [3.4, 2.1] };

const hashStr = (t: string) => { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
const dPath = (h: PontoTela[]) => 'M' + h.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L') + 'Z';

/** Cone 2D (dois círculos ligados pelas tangentes externas), como polígono. */
function cone(a: PontoTela, ra: number, b: PontoTela, rb: number): V2[] {
  const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy);
  if (d < Math.abs(ra - rb) + 0.01) {
    const [c, r] = ra > rb ? [a, ra] : [b, rb];
    return Array.from({ length: 16 }, (_, i): V2 => [c[0] + r * Math.cos((i / 16) * 2 * Math.PI), c[1] + r * Math.sin((i / 16) * 2 * Math.PI)]);
  }
  const tu = Math.atan2(dy, dx), k = (ra - rb) / d, phi = Math.acos(Math.max(-1, Math.min(1, k)));
  const out: V2[] = [];
  const n2 = 10, n1 = 14;
  for (let i = 0; i <= n2; i++) { const t = tu + phi - (2 * phi * i) / n2; out.push([b[0] + rb * Math.cos(t), b[1] + rb * Math.sin(t)]); }
  for (let i = 0; i <= n1; i++) { const t = tu - phi - ((2 * Math.PI - 2 * phi) * i) / n1; out.push([a[0] + ra * Math.cos(t), a[1] + ra * Math.sin(t)]); }
  return out;
}

/**
 * Desenha o corpo e devolve a profundidade de cada parte (para os músculos ficarem por cima da parte certa
 * e por baixo do que estiver na frente dela).
 */
export function corpoNovo(sk: Esqueleto, estilo: EstiloNovo, erro = false) {
  const A = estilo === 'a';
  const PR = P_();
  const ow = A ? 1.3 : 0; // espessura do contorno (só no A)
  const c = (n: string) => (erro ? n + '-e' : n);
  const cls: Classe = (base, longe) => c(`e${estilo}-${base}${longe ? '-longe' : ''}`);
  const partes: PartesDoCorpo = { tronco: 0, cabeca: 0, braco: {}, perna: {} };

  const aneis = aneisTronco(sk);
  const dT = zMedio([sk.P, sk.M, sk.N]);
  partes.tronco = dT;
  const cascas: V2[][] = [];
  for (let i = 0; i < aneis.length - 1; i++) cascas.push(hull([...aneis[i]!, ...aneis[i + 1]!].map(CTX.PJ)));
  // ombros (acabamento A2): o alto do tórax vai até os dois ombros, arredondados (uma esfera em volta de cada S), e
  // desce do pescoço para o ombro como o trapézio; o braço sai de dentro do ombro em vez de pender do canto do tronco
  if (PR.conico) {
    const esfera = (c: V3, r: number) => DIRS.map((u) => comb(1, c, r, u));
    const n = aneis.length;
    cascas.push(hull([...aneis[n - 2]!, ...aneis[n - 1]!, ...esfera(comb(1, sk.side.R.S, -2.5, sk.uT), RAIO_OMBRO), ...esfera(comb(1, sk.side.L.S, -2.5, sk.uT), RAIO_OMBRO)].map(CTX.PJ)));
  }
  const nTopo = add(sk.N, mul(sub(sk.Hc, sk.N), 0.62));
  const qN: [V3, V3] = [CTX.PJ(sk.N), CTX.PJ(nTopo)];
  if (A) {
    if (PR.tronco1) push(1, dT, `<path d="${cascas.map(dPath).join('')}" class="${c('ea-cont')}" stroke-width="${f1(ow * 2)}"/>`);
    else for (const h of cascas) push(1, dT, `<polygon points="${pts(h)}" class="${c('ea-cont')}" stroke-width="${f1(ow * 2)}"/>`);
    push(1, dT, `<line x1="${f1(qN[0][0])}" y1="${f1(qN[0][1])}" x2="${f1(qN[1][0])}" y2="${f1(qN[1][1])}" class="${c('ea-cont')}" stroke-width="${f1(ESP.pesc + ow * 2)}"/>`);
  }
  push(1, dT, `<line x1="${f1(qN[0][0])}" y1="${f1(qN[0][1])}" x2="${f1(qN[1][0])}" y2="${f1(qN[1][1])}" class="${cls('pele-l')}" stroke-width="${f1(ESP.pesc)}"/>`);
  if (PR.tronco1) push(1, dT, `<path d="${cascas.map(dPath).join('')}" class="${cls('pele-t')}"/>`);
  else for (const h of cascas) push(1, dT, `<polygon points="${pts(h)}" class="${cls('pele-t')}"/>`);

  if (A && !erro && (isSide() || CTX.VIEW === 'posterior')) {
    const back = isSide() ? -5 : -8.5;
    const sp = [comb(1, sk.P, back, sk.fL), comb(1, sk.M, back - 1, sk.fT), comb(1, sk.N, back + 1, sk.fT)].map(CTX.PJ);
    push(1, dT + 0.001, `<polyline points="${pts(sp)}" class="ea-sp" stroke-width="1.1" fill="none"/>`);
  }

  const H = CTX.PJ(sk.Hc);
  partes.cabeca = H[2] + 0.6;
  push(1, H[2] + 0.6, `<circle cx="${f1(H[0])}" cy="${f1(H[1])}" r="${f1(B.head)}" class="${cls('pele')}"${A ? ` stroke-width="${f1(ow * 1.6)}"` : ''}/>`);
  if (isSide() || CTX.VIEW === 'top') {
    const a = CTX.PJ(comb(1, sk.Hc, B.head - 1, sk.fN, -0.5, sk.uN)),
      b = CTX.PJ(comb(1, sk.Hc, B.head + 2.5, sk.fN, -1.5, sk.uN));
    push(1, H[2] + 0.61, `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" class="${c(A ? 'ea-cont' : 'eb-pele-l')}" stroke-width="${f1(A ? 2.6 : 3.4)}"/>`);
  }

  const dN = CTX.PJ(sk.N)[2],
    dP = CTX.PJ(sk.P)[2];
  for (const k of ['L', 'R'] as const) {
    const sd = sk.side[k];
    const side = isSide();
    const longeA = side && CTX.PJ(sd.S)[2] < dN - 1,
      longeL = side && CTX.PJ(sd.Hp)[2] < dP - 1;
    // mão: a luva vai um pouco além do ponto de pegada (os dedos fecham em volta do cabo)
    const fimMao = PR.mao ? add(sd.G, mul(norm(sub(sd.G, sd.W)), 2.2)) : sd.G;
    const perna: Seg[] = [
      [sd.Hp, sd.K, ESP.th, 'th'],
      [sd.K, sd.A, ESP.sk, 'sk'],
      [sd.heel, sd.A, ESP.pe, 'calc'],
      [sd.A, sd.toe, ESP.pe, 'pe'],
    ];
    const braco: Seg[] = [
      [sd.S, sd.E, ESP.ua, 'ua'],
      [sd.E, sd.W, ESP.fa, 'fa'],
      [sd.W, fimMao, PR.mao ? 7.6 : ESP.mao, 'mao'],
    ];
    const jL: [string, V3][] = [['Hp', sd.Hp], ['K', sd.K], ['A', sd.A]],
      jA: [string, V3][] = [['S', sd.S], ['E', sd.E]];
    const filtra = (js: [string, V3][]) => (PR.juntas ? js.filter(([n]) => PR.juntas!.includes(n)) : js).map(([, p]) => p);
    partes.perna[k] = membro(perna, longeL, filtra(jL), A, ow, cls, c, erro, { perna: true, sk, PR, cascas });
    partes.braco[k] = membro(braco, longeA, filtra(jA), A, ow, cls, c, erro, { braco: true, PR });
  }
  return partes;
}

function membro(segs: Seg[], longe: boolean, juntas: V3[], A: boolean, ow: number, cls: Classe, c: (n: string) => string, erro: boolean, o: OpcoesMembro) {
  const PR = o.PR;
  const d = zMedio(segs.flatMap((s) => [s[0], s[1]])) + 0.05;
  const Q = segs.map(([a, b, w, nome]): Seg => [CTX.PJ(a), CTX.PJ(b), w, nome]);
  const linha = ([a, b, w]: Seg, c: string, extra: number) =>
    `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" class="${c}" stroke-width="${f1(w + extra)}"/>`;
  const forma = (s: Seg, c: string, extra: number) => {
    if (!PR.conico) return linha(s, c, extra);
    const [a, b, w, nome] = s;
    const [ra, rb] = RAIO[nome] || [w / 2, w / 2];
    return `<polygon points="${pts(cone(a, ra, b, rb))}" class="${c}" stroke-width="${f1(extra || 0.6)}"/>`;
  };
  const cCont = c(longe ? 'ea-cont-longe' : 'ea-cont');
  const cPele = PR.conico ? cls('pele-t', longe) : cls('pele-l', longe);
  // folga da cor do fundo em volta do braço de perto (só no A, de lado): separa o braço do tronco
  if (A && PR.folga && o.braco && !longe && (isSide())) for (const s of Q) push(1, d, forma(s, PR.conico ? 'eb-folga-t' : 'eb-folga', ow * 2 + 2.4));
  // mão de perto por cima do equipamento (os dedos fecham em volta do cabo) e de lado
  const camada = (s: Seg) => (PR.mao && o.braco && s[3] === 'mao' && !longe && (isSide()) ? 1.45 : 1);
  // ombro (deltoide): o recheio de uma calota redonda no começo do braço cobre a emenda entre o braço e o ombro do
  // tronco, para o braço sair do ombro (pedido do Gustavo no piloto do acabamento, 04/11/2026)
  const ombro = A && PR.conico && o.braco && !longe ? Q[0]![0] : null;
  const circ = (q: PontoTela, r: number, cl: string, w: number) => `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(r)}" class="${cl}" stroke-width="${f1(w)}"/>`;
  if (A) for (const s of Q) push(camada(s), d, forma(s, cCont, ow * 2));
  else if (!longe) for (const s of Q) push(1, d, linha(s, 'eb-folga', 1.8));
  if (ombro) push(1, d, circ(ombro, RAIO_OMBRO - 0.4, cPele, 0));
  for (const s of Q) push(camada(s), d, forma(s, cPele, 0));
  // a pelve cobre o começo da coxa de perto (só a cor, sem contorno): a coxa sai do quadril
  if (A && PR.quadril && o.perna && !longe) {
    // recorte: só onde a coxa (com o contorno) passa por cima da pelve
    const [a, b, w, nome] = Q[0]!;
    const [ra, rb] = PR.conico ? RAIO[nome] : [w / 2, w / 2];
    const coxa = cone(a, ra + ow + 0.3, b, rb + ow + 0.3);
    const id = 'qd' + hashStr(pts(coxa) + CTX.VIEW);
    const cs = o.cascas!.slice(0, 2);
    push(1, d, `<clipPath id="${id}"><polygon points="${pts(coxa)}"/></clipPath><path d="${cs.map(dPath).join('')}" class="${c('ea-pele-t')}" clip-path="url(#${id})"/>`);
  }
  if (A && !longe && !erro) {
    let ant: V3 | null = null;
    for (const j of juntas) {
      const p = CTX.PJ(j);
      if (!ant || Math.hypot(p[0] - ant[0], p[1] - ant[1]) > 5) push(1, d, `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="1.9" class="ea-jt" stroke-width="1.1"/>`);
      ant = p;
    }
  }
  return d;
}

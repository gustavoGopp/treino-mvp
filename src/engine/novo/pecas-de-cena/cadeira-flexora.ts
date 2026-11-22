// Peça de cena: a cadeira flexora (flexão de joelho sentado). Medidas em ../dados/objetos/cadeira-flexora.json: o
// tamanho total vem das fichas da Life Fitness, da Hammer Strength e da Precor; a inclinação do assento e a espessura
// dos estofados, da Precor; as medidas que fazem a máquina funcionar (a altura do assento, onde fica o eixo, o
// comprimento da alavanca) não aparecem nas fichas e são de desenho, com o motivo. Parte do cartão de hoje
// (scripts/desenhos-equipamento/realista/itens.mjs, `cadeira_flexora`): o assento e o encosto azuis, a trava que prende
// as coxas por cima, o came redondo no eixo, a alavanca com o rolo atrás da perna, a torre com a pilha de placas. O
// cartão de hoje é 26% a 41% mais estreito que as fichas (a pilha encostada atrás do assento); aqui a pilha fica ao
// lado do assento, como nas fichas (a largura de 102 cm só fecha assim).
//
// A máquina funciona: a alavanca gira no eixo, que fica ao lado do joelho de quem senta; o came gira com ela e enrola o
// cabo, e as placas escolhidas sobem o arco do came (raio × ângulo girado desde a posição inicial); o encosto anda para
// a frente e para trás, para o joelho de cada pessoa cair no eixo; o rolo corre na alavanca até ficar atrás do
// tornozelo; a trava das coxas desce até encostar nelas.
//
// Acréscimos de 18/11/2026, todos desligados por padrão (o desenho e os volumes da flexora aprovada não mudam): o
// modelo (`ModeloDaCadeira`), com que a mesma peça desenha a cadeira extensora (./cadeira-extensora.ts), e as opções
// das animações (`OpcoesDaPeca`: a trava numa peça à parte e os cantos redondos dos estofados na conferência).
//
// Eixos: quem senta olha para +z; o assento fica centrado em x = 0, com a borda da frente em z = 0. O lado esquerdo de
// quem senta é +x (o direito, que a vista de lado mostra, é −x): o came, a alavanca e a torre ficam à esquerda, para não
// esconder o joelho de quem olha de lado.
import type { Anel } from '../corpo3d';
import type { P2, Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { cilindro } from '../pecas';
import { obj } from '../tabelas';
import { add, cross, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

/**
 * Qual das duas cadeiras de joelho (acréscimo de 18/11/2026, para a cadeira extensora, ./cadeira-extensora.ts): a
 * flexora é o padrão, e com ela o desenho e as medidas são os aprovados. A extensora tem o mesmo assento, encosto,
 * came, alavanca e torre, com as medidas dela; não tem a trava das coxas, e a pilha sobe quando a alavanca vai para a
 * frente (na flexora, quando ela vai para trás).
 */
export interface ModeloDaCadeira {
  /** De onde vêm as medidas (a linha da tabela de objetos). */
  objeto: string;
  nome: string;
  /** Se tem a trava que prende as coxas por cima. */
  trava: boolean;
  /** Para que lado a alavanca gira para levantar as placas: −1 = para trás (flexora), +1 = para a frente (extensora). */
  sobe: -1 | 1;
  /** Onde começa a borracha das alças, à frente do meio do assento (cm); na flexora, 6. */
  alcaAFrente?: number;
}
export const FLEXORA: ModeloDaCadeira = { objeto: 'cadeiraFlexora', nome: 'cadeira flexora', trava: true, sobe: -1 };
const medidas = (mod: ModeloDaCadeira) => (id: string) => obj(mod.objeto, id);
const rad = Math.PI / 180;
const X: V3 = [1, 0, 0],
  Y: V3 = [0, 1, 0];

/** As regulagens e o instante da máquina. */
export interface CadeiraFlexora {
  /** O ângulo da alavanca, em graus: 0 = apontando para baixo, 90 = para a frente, na horizontal. */
  alavanca: number;
  /** O ângulo da posição inicial (a regulagem "start position"): a pilha começa a subir daí. */
  inicio: number;
  /** A distância do eixo ao centro do rolo da perna (cm). */
  rolo: number;
  /** Quanto o encosto está à frente da posição mais recuada (0 até `encostoCurso`). */
  encosto: number;
  /** A altura da face de baixo da trava das coxas (cm, do chão). */
  trava: number;
  /** Quantas placas estão no pino. */
  placas?: number;
}

/** A geometria fixa da máquina (não depende da regulagem). */
export function geometriaDaCadeiraFlexora(mod: ModeloDaCadeira = FLEXORA) {
  const g = medidas(mod);
  const inc = g('assentoInclina') * rad;
  // o assento sobe para a frente: `ao` aponta para a frente e para cima; `normal`, para fora do estofado
  const ao: V3 = [0, Math.sin(inc), Math.cos(inc)];
  const normal: V3 = [0, Math.cos(inc), -Math.sin(inc)];
  const c = g('assentoComp');
  // o meio do topo do assento fica na altura da tabela; a borda da frente, em z = 0
  const meioTopo: V3 = [0, g('assentoAltura'), -(c / 2) * Math.cos(inc)];
  const frenteTopo = add(meioTopo, mul(ao, c / 2));
  const fundoTopo = add(meioTopo, mul(ao, -c / 2));
  const eixo: V3 = add(frenteTopo, [0, g('eixoAcima'), g('eixoFrente')]);
  const xCame = g('assentoLarg') / 2 + 7;
  return { ao, normal, meioTopo, frenteTopo, fundoTopo, eixo, xCame };
}

/** A direção da alavanca (do eixo para o rolo) no ângulo dado. */
export const direcaoDaAlavanca = (graus: number): V3 => [0, -Math.cos(graus * rad), Math.sin(graus * rad)];

/** Quanto as placas sobem (cm) com a alavanca no ângulo dado. */
export const subidaDaPilha = (m: Pick<CadeiraFlexora, 'alavanca' | 'inicio'>, mod: ModeloDaCadeira = FLEXORA) =>
  Math.max(0, mod.sobe * (m.alavanca - m.inicio)) * rad * (medidas(mod)('cameDiam') / 2);

/** A borda de baixo do encosto (o ponto que encosta no fundo do assento) e a direção dele, para cima. */
function encosto(m: Pick<CadeiraFlexora, 'encosto'>, mod: ModeloDaCadeira) {
  const g = medidas(mod);
  const G = geometriaDaCadeiraFlexora(mod);
  const inc = g('encostoInclina') * rad;
  const sobe: V3 = [0, Math.cos(inc), -Math.sin(inc)];
  const frente: V3 = [0, Math.sin(inc), Math.cos(inc)];
  const base = add(G.fundoTopo, [0, 0, m.encosto - g('encostoCurso') / 2]);
  return { base, sobe, frente };
}

/**
 * Opções acrescentadas em 18/11/2026 para as animações (desligadas, a peça é a aprovada):
 * `travaAParte`: a trava das coxas sai da estrutura e vem numa peça própria (`trava`), para ser pintada por cima das
 * coxas, enquanto a estrutura fica atrás do corpo, como cenário;
 * `cantosRedondos`: as caixas dos estofados, para a conferência, perdem os cantos (o desenho os arredonda com raio de
 * 45% da espessura): cada estofado vira duas caixas em cruz, uma mais curta e outra mais fina.
 */
export interface OpcoesDaPeca {
  travaAParte?: boolean;
  cantosRedondos?: boolean;
  /**
   * Acréscimo de 19/11/2026 (correção da auditoria): quanto a parte que se mexe vai para trás na ordem de pintura (cm,
   * positivo = mais longe de quem olha; o desenho não muda). `movel`: a alavanca, a luva, o came, o cabo e as placas,
   * que ficam do lado de fora da perna de longe; `rolo`: o rolo e a haste que o leva para baixo das pernas. Sem isso,
   * cada um entra na ordem pelo próprio centro, e o Boneco entra pelo centro do corpo (a perna de perto vai junto com
   * o tronco): de três quartos, o rolo e a alavanca, mais perto de quem olha que o tronco, saíam pintados por cima das
   * pernas.
   */
  dz?: { movel?: number; rolo?: number };
  /**
   * Acréscimo de 19/11/2026 (correção da auditoria), desligado por padrão: as partes do corpo (cada uma pelos anéis
   * dela, como o Boneco a desenha) que o rolo não cobre onde elas ficam na frente dele. Na extensora, no alto da
   * subida, o pé fica em pé na frente do rolo, e a canela, embaixo dele; o pé e a canela vão juntos na ordem de pintura
   * (num item só, o do corpo), e nenhuma ordem dava as duas coisas. O rolo é pintado por cima das pernas, com um recorte
   * (máscara) do tamanho dessas partes, só nos trechos em que elas estão mesmo na frente dele, medido raio a raio na
   * vista desenhada. Desde a correção de 19/11/2026 (o furo do recorte, `recortarORolo`), faceta por faceta da malha de
   * cada parte, e a máscara vale também para a haste que atravessa o rolo.
   */
  naFrenteDoRolo?: Anel[][];
}

/** Um nome curto e estável para a máscara (o mesmo recorte dá o mesmo nome, em qualquer <svg> da página). */
function nomeDoRecorte(t: string): string {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619);
  return `cr${(h >>> 0).toString(36)}`;
}

/** Um cilindro reto: as pontas do eixo e o raio. */
export interface Cilindro {
  a: V3;
  b: V3;
  r: number;
}
/** O raio que sai de `q` na direção `d` (unitária) atravessa o cilindro? A conta exata (o tubo e as duas tampas). */
function atravessa(q: V3, d: V3, { a, b, r }: Cilindro): boolean {
  const L = sub(b, a),
    comp = Math.hypot(...L),
    u = mul(L, 1 / comp);
  const w = sub(q, a),
    wt = dot(w, u),
    vt = dot(d, u);
  const wp = sub(w, mul(u, wt)),
    vp = sub(d, mul(u, vt));
  let lo = 0,
    hi = Infinity;
  if (Math.abs(vt) < 1e-12) {
    if (wt < 0 || wt > comp) return false;
  } else {
    const s1 = -wt / vt,
      s2 = (comp - wt) / vt;
    lo = Math.max(lo, Math.min(s1, s2));
    hi = Math.min(hi, Math.max(s1, s2));
  }
  const A = dot(vp, vp),
    B = 2 * dot(wp, vp),
    D = dot(wp, wp) - r * r;
  if (A < 1e-12) {
    if (D > 0) return false;
  } else {
    const disc = B * B - 4 * A * D;
    if (disc < 0) return false;
    const sq = Math.sqrt(disc);
    lo = Math.max(lo, (-B - sq) / (2 * A));
    hi = Math.min(hi, (-B + sq) / (2 * A));
  }
  return lo <= hi;
}

/**
 * O recorte do rolo (`OpcoesDaPeca.naFrenteDoRolo`): a máscara que deixa de fora do rolo as partes do corpo que ficam
 * na frente dele nesta vista. `a` e `b`: as pontas do eixo do rolo desenhado; `r`: o raio. Com `haste` (a haste que
 * atravessa o rolo e o liga à luva, desenhada logo antes dele), a máscara vale também para ela: pelo furo, a pele que
 * está na frente do rolo aparece sem a haste por cima (ela fica dentro do rolo, atrás da pele que aparece); e a pele
 * que fica atrás da haste, onde ela sai do rolo, não é furada.
 *
 * Correção de 19/11/2026 (o furo do recorte): o furo é feito faceta por faceta da malha de cada parte (entre os anéis i
 * e i + 1, nos pontos k e k + 1 do anel, e as tampas das pontas), só nas facetas viradas para quem olha cujos cantos
 * (na pele) têm o caminho livre até quem olha: o raio de cada canto não atravessa o rolo (nem a haste), na conta exata
 * do cilindro. Antes, o furo era o casco do par de anéis inteiro, decidido por um ponto do anel (o mais perto de quem
 * olha, na mesa flexora) ou pela metade do anel virada para quem olha, um pouco para dentro da pele (na extensora): na
 * mesa flexora, de cima, no começo, o casco abria no rolo dois furos em U pelos quais apareciam o pé e a haste, que
 * ficam 8 a 24 cm abaixo dele. Só entram as facetas que caem na caixa do rolo na tela (fora dela a máscara não tira
 * nada). Todas vão num caminho só, no mesmo sentido (a regra nonzero as une, sem fresta entre vizinhas). Cada canto sai
 * 0,4 cm para fora da pele, para o traço do contorno entrar no furo, onde esse ponto também tem o caminho livre (na
 * beira em que a parte passa para trás do rolo, o furo para na pele e não come a borda do rolo). Os furos ficam também
 * nos itens (`fora`, na tela), para a conferência da pintura e as regras os verem.
 */
export function recortarORolo(C: Parameters<PecaPropria['desenhar']>[0], a: V3, b: V3, r: number, partes: Anel[][], haste?: Cilindro): void {
  // a projeção da cena é linear: lida em quatro pontos do próprio rolo (para não mexer na caixa da peça)
  const P0 = C.P(a),
    PX = C.P(add(a, [1, 0, 0])),
    PY = C.P(add(a, [0, 1, 0])),
    PZ = C.P(add(a, [0, 0, 1]));
  const col = (k: number): V3 => [PX[k]! - P0[k]!, PY[k]! - P0[k]!, PZ[k]! - P0[k]!];
  const tx = col(0),
    ty = col(1),
    // para quem olha (o gerador conta a profundidade para longe)
    para = norm(mul(col(2), -1));
  const tela = (p: V3): P2 => [P0[0]! + dot(sub(p, a), tx), P0[1]! + dot(sub(p, a), ty)];
  const u = norm(sub(b, a));
  // o raio que sai do ponto para quem olha atravessa o rolo (ou a haste)?
  const rolo: Cilindro = { a, b, r };
  const tapado = (q: V3): boolean => atravessa(q, para, rolo) || (!!haste && atravessa(q, para, haste));
  const ponto = (an: Anel, th: number, folga = 0): V3 => {
    const sn = Math.sin(th);
    return add(add(an.c, mul(an.x, (an.a + folga) * Math.cos(th))), mul(an.z, ((sn >= 0 ? an.f : an.b) + folga) * sn));
  };
  const N = 24;
  const th = (k: number) => (k * 2 * Math.PI) / N;
  // a caixa do rolo na tela (as duas tampas), com folga
  const e1 = norm(cross(u, Math.abs(u[0]) < 0.9 ? X : Y)),
    e2 = cross(u, e1);
  const cx = [1e9, 1e9, -1e9, -1e9];
  for (const o of [a, b])
    for (let k = 0; k < N; k++) {
      const t = tela(add(o, add(mul(e1, r * Math.cos(th(k))), mul(e2, r * Math.sin(th(k))))));
      cx[0] = Math.min(cx[0]!, t[0] - 0.5);
      cx[1] = Math.min(cx[1]!, t[1] - 0.5);
      cx[2] = Math.max(cx[2]!, t[0] + 0.5);
      cx[3] = Math.max(cx[3]!, t[1] + 0.5);
    }
  const f1 = (n: number) => Math.round(n * 10) / 10;
  const furos: P2[][] = [];
  // um furo (uma faceta na tela), se cai na caixa do rolo; todos no mesmo sentido
  const poe = (T: P2[]) => {
    if (Math.max(...T.map((t) => t[0])) < cx[0]! || Math.min(...T.map((t) => t[0])) > cx[2]! || Math.max(...T.map((t) => t[1])) < cx[1]! || Math.min(...T.map((t) => t[1])) > cx[3]!) return;
    let area = 0;
    for (let j = 0; j < T.length; j++) area += T[j]![0] * T[(j + 1) % T.length]![1] - T[(j + 1) % T.length]![0] * T[j]![1];
    if (Math.abs(area) > 1e-9) furos.push(area > 0 ? T : [...T].reverse());
  };
  for (const aneis of partes) {
    // o caminho de cada ponto de cada anel (na pele) até quem olha: livre ou tapado pelo rolo (a pele que afunda no rolo,
    // no contato, fica tapada); e o canto do furo nesse ponto, na tela: 0,4 cm para fora da pele (o traço do contorno)
    // quando ali o caminho também é livre, e na pele quando não é (na beira em que a parte passa para trás do rolo, o
    // furo para na pele e não come a borda do rolo, com o traço dela)
    const livre = aneis.map((an) => Array.from({ length: N }, (_, k) => !tapado(ponto(an, th(k)))));
    const canto = aneis.map((an) =>
      Array.from({ length: N }, (_, k): P2 => {
        const fora = ponto(an, th(k), 0.4);
        const t = tela(tapado(fora) ? ponto(an, th(k)) : fora);
        return [f1(t[0]), f1(t[1])];
      }),
    );
    for (let i = 0; i + 1 < aneis.length; i++) {
      const A = aneis[i]!,
        B = aneis[i + 1]!;
      const meio = mul(add(A.c, B.c), 0.5);
      for (let k = 0; k < N; k++) {
        const k1 = (k + 1) % N;
        if (!livre[i]![k] || !livre[i]![k1] || !livre[i + 1]![k] || !livre[i + 1]![k1]) continue;
        const Q = [ponto(A, th(k)), ponto(A, th(k1)), ponto(B, th(k1)), ponto(B, th(k))];
        // a faceta virada para quem olha (a normal pelas diagonais, para fora da parte)
        let n = cross(sub(Q[2]!, Q[0]!), sub(Q[3]!, Q[1]!));
        if (dot(n, sub(mul(add(add(Q[0]!, Q[1]!), add(Q[2]!, Q[3]!)), 0.25), meio)) < 0) n = mul(n, -1);
        if (dot(n, para) <= 0) continue;
        poe([canto[i]![k]!, canto[i]![k1]!, canto[i + 1]![k1]!, canto[i + 1]![k]!]);
      }
    }
    // as tampas das pontas (a ponta do pé, o calcanhar), em triângulos do centro do anel, quando viradas para quem olha
    for (const [i, j] of [
      [0, 1],
      [aneis.length - 1, aneis.length - 2],
    ] as [number, number][]) {
      const an = aneis[i]!,
        viz = aneis[j];
      if (!viz || dot(sub(an.c, viz.c), para) <= 0 || tapado(an.c)) continue;
      const c = tela(an.c);
      for (let k = 0; k < N; k++) {
        const k1 = (k + 1) % N;
        if (livre[i]![k] && livre[i]![k1]) poe([[f1(c[0]), f1(c[1])], canto[i]![k]!, canto[i]![k1]!]);
      }
    }
  }
  const alvo = C.itens.slice(haste ? -2 : -1);
  if (!furos.length || !alvo.length) return;
  const caminho = `<path d="${furos.map((T) => `M${T.map((t) => `${t[0]} ${t[1]}`).join('L')}Z`).join('')}" fill="#000"/>`;
  const id = nomeDoRecorte(caminho);
  C.defs.push(`<mask id="${id}" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="4000" height="4000"><rect x="-2000" y="-2000" width="4000" height="4000" fill="#fff"/>${caminho}</mask>`);
  for (const item of alvo) {
    item.fora = furos;
    item.svg = `<g mask="url(#${id})">${item.svg}</g>`;
  }
}

/**
 * A cadeira flexora: os volumes para a conferência (o assento, o encosto, a trava e o rolo, onde o corpo encosta e que
 * ele não pode atravessar), a estrutura parada e a parte que se mexe (alavanca, rolo, came, cabo e placas), e os pontos
 * que o exercício lê (o eixo, o centro do rolo, a frente do encosto).
 */
export function cadeiraFlexora(m: CadeiraFlexora, mod: ModeloDaCadeira = FLEXORA, op: OpcoesDaPeca = {}) {
  const g = medidas(mod);
  const G = geometriaDaCadeiraFlexora(mod);
  const E = encosto(m, mod);
  const esp = g('estofadoEsp');
  const dAl = direcaoDaAlavanca(m.alavanca);
  const centroRolo = add(G.eixo, mul(dAl, m.rolo));
  const rRolo = g('roloDiam') / 2;
  // as pontas do rolo desenhado (do lado direito de quem senta, até 6 cm antes da ponta do lado da luva)
  const pontaR = add(centroRolo, [-g('roloComp') / 2, 0, 0]),
    pontaL = add(centroRolo, [g('roloComp') / 2 - 6, 0, 0]);
  const meiaLarg = g('assentoLarg') / 2;
  // a trava das coxas: logo atrás do joelho, sobre as coxas
  const zTrava = mod.trava ? G.frenteTopo[2] - g('travaComp') / 2 - 4 : 0;
  const travaBaixo: V3 = [0, m.trava, zTrava];

  const caixa1 = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x, y, z }, meias, cls, vies: 0.5 });
  // com os cantos redondos, duas caixas em cruz: uma sem o raio nas pontas, outra sem o raio em cima e embaixo
  const rCanto = Math.min(esp * 0.45, 4);
  const caixa = (o: V3, x: V3, y: V3, z: V3, meias: V3, cls: string): Prim[] =>
    op.cantosRedondos
      ? [caixa1(o, x, y, z, [meias[0], meias[1], meias[2] - rCanto], cls), caixa1(o, x, y, z, [meias[0], meias[1] - rCanto, meias[2]], cls)]
      : [caixa1(o, x, y, z, meias, cls)];
  const prims: Prim[] = [
    // o assento: a caixa do estofado, com o topo no plano do assento
    ...caixa(add(G.meioTopo, mul(G.normal, -esp / 2)), X, G.normal, G.ao, [meiaLarg, esp / 2, g('assentoComp') / 2], 'estofado'),
    // o encosto
    ...caixa(add(add(E.base, mul(E.sobe, g('encostoComp') / 2)), mul(E.frente, -esp / 2)), X, E.frente, E.sobe, [meiaLarg - 2, esp / 2, g('encostoComp') / 2], 'estofado'),
    // a trava das coxas (só na flexora)
    ...(mod.trava ? caixa(add(travaBaixo, [0, esp / 2, 0]), X, Y, [0, 0, 1], [g('travaLarg') / 2, esp / 2, g('travaComp') / 2], 'estofado') : []),
    // o rolo da perna
    { t: 'volume', vol: cilindro(add(centroRolo, [-g('roloComp') / 2, 0, 0]), add(centroRolo, [g('roloComp') / 2, 0, 0]), rRolo), cls: 'estofado', vies: 0.5 },
  ];

  const xC = G.xCame,
    tubo = g('tubo');
  // a torre da pilha, ao lado do assento (à esquerda de quem senta), com a frente virada para o assento
  const zTorre = G.fundoTopo[2] + 6;
  const xT0 = g('larg') - meiaLarg - 8 - 34,
    xT1 = xT0 + 34;
  const zT0 = zTorre - 16,
    zT1 = zTorre + 16;
  const H = g('alturaTorre');
  const zTras = E.base[2] - Math.sin(g('encostoInclina') * rad) * g('encostoComp') - 12;
  const zFrente = zTras + g('comp');

  const desenharTrava = (C: Parameters<PecaPropria['desenhar']>[0], M: Parameters<PecaPropria['desenhar']>[1]) => {
    const T = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
    C.estofado(travaBaixo, [0, 0, 1], Y, X, g('travaComp'), esp, g('travaLarg'));
    T([xC + 2, G.eixo[1] + 4, zTrava - 2], [xC + 2, m.trava + esp + 8, zTrava - 2], 5);
    T([xC + 2, m.trava + esp + 8, zTrava - 2], [g('travaLarg') / 2 - 4, m.trava + esp + 3, zTrava - 2], 4.5);
  };
  const fixa: PecaPropria = {
    t: 'propria',
    nome: mod.nome,
    fixa: [m.encosto, m.trava],
    desenhar(C, M, o) {
      const T = (a: V3, b: V3, w = tubo) => C.tubo(a, b, w, w, M.metal);
      // a base no chão: dois trilhos ao longo de z e as travessas
      for (const x of [-meiaLarg + 4, xC + 2]) T([x, tubo / 2, zTras], [x, tubo / 2, G.eixo[2] + 6]);
      for (const z of [zTras + 4, G.eixo[2] + 2]) T([-meiaLarg + 4, tubo / 2, z], [xT1, tubo / 2, z]);
      T([xT0, tubo / 2, zT0], [xT0, tubo / 2, zT1]);
      T([xT1, tubo / 2, zT0], [xT1, tubo / 2, zT1]);
      // o pé do assento e o do eixo
      T([0, tubo, G.meioTopo[2]], [0, G.meioTopo[1] - esp - 2, G.meioTopo[2]]);
      T([-meiaLarg + 4, tubo / 2, G.meioTopo[2]], [xC + 2, tubo / 2, G.meioTopo[2]]);
      T([xC + 2, tubo, G.eixo[2]], [xC + 2, G.eixo[1] - 6, G.eixo[2]]);
      // o trilho do encosto (ele corre sobre ele) e o encosto
      T([0, G.fundoTopo[1] - esp - 6, G.fundoTopo[2] - g('encostoCurso') / 2 - 6], [0, G.fundoTopo[1] - esp - 6, G.meioTopo[2] + 6], 5);
      // o estofado do encosto: a face de trás (a de baixo do estofado) fica atrás da linha onde as costas encostam
      C.estofado(add(add(E.base, mul(E.sobe, g('encostoComp') / 2)), mul(E.frente, -esp)), E.sobe, E.frente, X, g('encostoComp'), esp, g('assentoLarg') - 4);
      T(add(E.base, [0, -esp - 4, -2]), add(add(E.base, mul(E.sobe, g('encostoComp') * 0.45)), mul(E.frente, -esp - 2)), 5);
      // o assento
      C.estofado(add(G.meioTopo, mul(G.normal, -esp)), G.ao, G.normal, X, g('assentoComp'), esp, g('assentoLarg'));
      // os pegadores ao lado do assento
      for (const s of [-1, 1]) {
        const x = s * (meiaLarg + 4);
        const a = mod.alcaAFrente ?? 6;
        C.tubo([x * 0.85, G.meioTopo[1] - esp - 4, G.meioTopo[2] - 10 + a], [x, G.meioTopo[1] - 2, G.meioTopo[2] + a], 3, 3, M.metal);
        C.cilindro([x, G.meioTopo[1] - 2, G.meioTopo[2] + a], [x, G.meioTopo[1] - 2, G.meioTopo[2] + 12 + a], 2, M.borracha, { lados: 12 });
      }
      // a trava das coxas: a almofada sobre as coxas, presa num braço que desce do lado esquerdo
      if (mod.trava && !op.travaAParte) desenharTrava(C, M);
      // a torre: quatro montantes, a tampa e as guias das placas
      for (const [x, z] of [
        [xT0, zT0],
        [xT1, zT0],
        [xT0, zT1],
        [xT1, zT1],
      ] as [number, number][])
        T([x, tubo, z], [x, H, z], 4.5);
      for (const z of [zT0, zT1]) T([xT0, H, z], [xT1, H, z], 4.5);
      for (const x of [xT0, xT1]) T([x, H, zT0], [x, H, zT1], 4.5);
      for (const dz of [-6, 6]) C.cilindro([(xT0 + xT1) / 2, tubo, zTorre + dz], [(xT0 + xT1) / 2, H - 6, zTorre + dz], 0.8, M.cromo, { lados: 8 });
      // a polia do pé da torre, por onde o cabo entra
      C.cilindro([(xT0 + xT1) / 2 - 1.5, 10, zT1 + 2], [(xT0 + xT1) / 2 + 1.5, 10, zT1 + 2], 4.5, M.metalClaro, { lados: 16 });
      if (o.comSombra) C.sombra((xT1 - meiaLarg) / 2, (zTras + zFrente) / 2, (xT1 + meiaLarg) / 2 + 6, g('comp') / 2, 0.18);
    },
  };

  const subida = subidaDaPilha(m, mod);
  const n = g('pilhaPlacas'),
    k = Math.min(n, Math.max(1, m.placas ?? 5)),
    hp = g('pilhaAltura') / n;
  const movel: PecaPropria = {
    t: 'propria',
    nome: `alavanca da ${mod.nome}`,
    desenhar(C, M) {
      // a ordem de pintura (só se a animação pedir; sem `op.dz`, as opções são as de sempre)
      const dzM = op.dz?.movel ? { dz: op.dz.movel } : {},
        dzR = op.dz?.rolo ? { dz: op.dz.rolo } : {};
      // as placas: as que ficam embaixo e as do pino, que sobem; a haste que as atravessa
      const xP = (xT0 + xT1) / 2 - g('pilhaLarg') / 2,
        zP = zTorre + g('pilhaProf') / 2;
      if (n - k > 0) C.pilha([xP, tubo + 2, zP], X, [0, 0, -1], g('pilhaLarg'), hp * (n - k), g('pilhaProf'), n - k, dzM);
      const yDo = tubo + 2 + hp * (n - k) + subida;
      C.pilha([xP, yDo, zP], X, [0, 0, -1], g('pilhaLarg'), hp * k, g('pilhaProf'), k, dzM);
      C.cilindro([(xT0 + xT1) / 2, yDo + hp * k, zTorre], [(xT0 + xT1) / 2, yDo + hp * k + 10, zTorre], 1.2, M.cromo, { lados: 8, ...dzM });
      // o cabo: do came, desce até a polia do pé da torre e sobe por dentro dela até o alto das placas
      const rC = g('cameDiam') / 2;
      const saida = add(G.eixo, [xC - 1, -rC, 0]);
      const polia: V3 = [(xT0 + xT1) / 2, 10 - 4.5, zT1 + 2];
      C.linha(saida, [saida[0], 10 - 4.5, saida[2]], '#202327', 0.7, dzM);
      C.linha([saida[0], 10 - 4.5, saida[2]], polia, '#202327', 0.7, dzM);
      // o came e o eixo
      const cx = (x: number): V3 => [x, G.eixo[1], G.eixo[2]];
      C.cilindro(cx(xC - 3), cx(xC + 3), rC, M.metalClaro, { lados: 24, ...dzM });
      C.cilindro(cx(xC + 3), cx(xC + 6), 3, M.cromo, { lados: 12, ...dzM });
      // a alavanca: do came até o rolo, no lado esquerdo; o rolo passa por baixo das duas pernas
      const pontaAl = add(G.eixo, mul(dAl, g('alavancaMax')));
      const lado = (v: V3, x: number): V3 => [x, v[1], v[2]];
      C.tubo(lado(G.eixo, xC), lado(pontaAl, xC), 5, 5, M.metal, { up: [1, 0, 0], ...dzM });
      // a luva do rolo, que corre na alavanca, e a haste que leva o rolo para baixo das pernas
      C.tubo(lado(add(centroRolo, mul(dAl, -4)), xC), lado(add(centroRolo, mul(dAl, 4)), xC), 7, 7, M.metalClaro, { up: [1, 0, 0], ...dzM });
      const haste: Cilindro = { a: lado(centroRolo, xC - 3), b: lado(centroRolo, -g('roloComp') / 2), r: 1.6 };
      C.cilindro(haste.a, haste.b, haste.r, M.cromo, { lados: 10, ...dzR });
      C.cilindro(pontaR, pontaL, rRolo, M.estofado, { lados: 18, ...dzR });
      if (op.naFrenteDoRolo?.length) recortarORolo(C, pontaR, pontaL, rRolo, op.naFrenteDoRolo, haste);
    },
  };
  const trava: PecaPropria | undefined = mod.trava && op.travaAParte ? { t: 'propria', nome: `trava da ${mod.nome}`, fixa: [m.trava], desenhar: (C, M) => desenharTrava(C, M) } : undefined;
  return { prims, fixa, movel, trava, eixo: G.eixo, centroRolo, pontasDoRolo: [pontaR, pontaL] as [V3, V3], frenteDoEncosto: E, subida, extremos: { zTras, zFrente, xDireita: -meiaLarg - 6, xEsquerda: xT1 + 2 } };
}

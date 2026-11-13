// Motor novo: a superfície do corpo. Cada segmento é uma fileira de seções ovais (anéis) presas ao osso, com as
// medidas da tabela do corpo; o desenhista (./desenho.ts) tira dela o contorno em qualquer vista. Nenhum número do
// corpo mora aqui: tudo vem de corpo.m(...) ou de corpo.secoes; o que é só forma (onde fica cada dedo na palma,
// o perfil do rosto) está em FORMA, marcado como escolha de desenho, para a conferência listar.
import { calibrar, naColuna, sinal } from './esqueleto';
import type { Esq, Lado } from './esqueleto';
import type { Corpo, Secao } from './tabelas';
import { add, comb, cross, girar, lerp, mul, noRef, norm } from './vec';
import type { Ref, V3 } from './vec';

/** Uma seção oval no espaço: centro, eixo da largura (x) e eixo frente-trás (z); a = meia-largura, f = raio para +z, b = raio para −z. */
export interface Anel {
  c: V3;
  x: V3;
  z: V3;
  a: number;
  f: number;
  b: number;
}
/** Um volume: fileira de anéis. `fim0` e `fim1` dizem se a ponta é livre (desenha a tampa) ou entra numa junta. */
export interface Volume {
  aneis: Anel[];
  junta0?: boolean;
  junta1?: boolean;
}
export type IdParte = 'tronco' | 'cabeca' | 'rosto' | `braco${Lado}` | `antebraco${Lado}` | `mao${Lado}` | `coxa${Lado}` | `perna${Lado}` | `pe${Lado}`;
export interface Parte {
  id: IdParte;
  lado?: Lado;
  volumes: Volume[];
}
/** Esfera que funde dois segmentos numa articulação. */
export interface Junta {
  id: string;
  c: V3;
  r: number;
  a: IdParte;
  b: IdParte;
}
export interface Corpo3d {
  partes: Parte[];
  juntas: Junta[];
}

/** Escolhas de forma (não são medidas): tudo o que está aqui aparece no relatório da conferência como "desenho". */
export const FORMA = {
  /** Centro do pescoço à frente da linha das vértebras (cm). */
  pescocoAFrente: 1.5,
  /** Cabeça: [altura acima da base do crânio como fração de (tragion ao topo), meia-largura/meiaLarguraDaCabeça, frente/meioComprimento, trás/meioComprimento]. */
  cabeca: [
    [1.0, 0.12, 0.12, 0.14],
    [0.97, 0.34, 0.33, 0.36],
    [0.89, 0.6, 0.58, 0.63],
    [0.76, 0.83, 0.8, 0.86],
    [0.6, 0.96, 0.93, 0.98],
    [0.42, 1.0, 0.97, 1.03],
    [0.16, 0.97, 0.95, 0.98],
    [-0.1, 0.9, 0.93, 0.84],
    [-0.38, 0.8, 0.9, 0.62],
    [-0.6, 0.62, 0.86, 0.4],
    [-0.74, 0.36, 0.72, 0.16],
  ] as [number, number, number, number][],
  /** Dedos: [posição na largura da palma (−1 = lado do mindinho, +1 = lado do polegar), comprimento/comprimento da mão, raio/largura da mão]. */
  dedos: [
    [0.72, 0.385, 0.105],
    [0.24, 0.425, 0.11],
    [-0.24, 0.4, 0.105],
    [-0.72, 0.32, 0.095],
  ] as [number, number, number][],
  /** Divisão do dedo em três falanges (soma 1). */
  falanges: [0.45, 0.3, 0.25] as [number, number, number],
  /** Dobra das três juntas do dedo (graus) com a mão relaxada. */
  dedoRelaxado: [22, 32, 18] as [number, number, number],
  /** Da prega do punho até a linha das juntas dos dedos, como fração do comprimento da palma. */
  palmaAteAsJuntas: 0.86,
  /** Polegar: metacarpo e duas falanges, como fração do comprimento da mão; raio/largura da mão. */
  polegar: [0.24, 0.17, 0.15, 0.125] as [number, number, number, number],
};

const anel = (r: Ref, c: V3, a: number, f: number, b: number): Anel => ({ c, x: r.x, z: r.z, a, f, b });
/** Anéis ao longo de um osso (do referencial `r`, descendo por −y), com as seções da tabela. */
function membro(r: Ref, comp: number, secoes: Secao[], escala = 1): Anel[] {
  return secoes.map((s) => anel(r, add(r.o, mul(r.y, -s.t * comp)), s.a * escala, s.f * escala, s.b * escala));
}
/** Seções reamostradas com mais anéis (interpolação suave entre as linhas da tabela), para o contorno ficar liso. */
function densas(secoes: Secao[], n: number): Secao[] {
  const out: Secao[] = [];
  const h = (p0: number, p1: number, p2: number, p3: number, u: number) => 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);
  const S = (i: number) => secoes[Math.max(0, Math.min(secoes.length - 1, i))]!;
  for (let i = 0; i < secoes.length - 1; i++) {
    const m = i === secoes.length - 2 ? n : n - 1;
    for (let j = 0; j <= m; j++) {
      if (j === n) continue;
      const u = j / n;
      const k = (q: 'a' | 'f' | 'b') => Math.max(0.2, h(S(i - 1)[q], S(i)[q], S(i + 1)[q], S(i + 2)[q], u));
      out.push({ ...S(i), t: S(i).t + (S(i + 1).t - S(i).t) * u, a: k('a'), f: k('f'), b: k('b') });
    }
  }
  out.push(S(secoes.length - 1));
  return out;
}

/** Posição de cada anel do tronco ao longo da coluna (ou na pelve), calculada uma vez por corpo com o corpo em pé. */
const TRONCO = new WeakMap<Corpo, ({ pelveY: number } | { s: number })[]>();
function aneisDoTronco(e: Esq): Anel[] {
  const c = e.corpo;
  let onde = TRONCO.get(c);
  if (!onde) {
    const cal = calibrar(c);
    const yQ = c.m('altura.trocanter'),
      yBase = yQ + c.m('l5s1.acima');
    // alturas dos nós em pé: a coluna em pé sobe quase na vertical, então a posição ao longo dela é a altura acima de L5–S1
    // corrigida pela razão (comprimento ao longo da coluna) / (altura), medida no tronco calibrado
    const sT = cal.dL * 5 + cal.dT * 6,
      razao = sT / (c.m('altura.cervical') - yBase);
    onde = c.tronco.map((a) => (a.alt < yBase ? { pelveY: a.alt - yQ } : { s: (a.alt - yBase) * razao }));
    TRONCO.set(c, onde);
  }
  return c.tronco.map((a, i) => {
    const o = onde![i]!;
    const tras = a.prof * a.tras,
      frente = a.prof - tras;
    if ('pelveY' in o) return anel(e.pelve, noRef(e.pelve, [0, o.pelveY, -c.m('l5s1.atras')]), a.a, frente, tras);
    const r = naColuna(e, o.s);
    return anel(r, r.o, a.a, frente, tras);
  });
}

function cabeca(e: Esq): { cranio: Volume[]; rosto: Volume[] } {
  const c = e.corpo,
    r = e.cabeca;
  const topo = c.m('cabeca.tragionAoTopo'),
    alt = c.m('cabeca.altura'),
    meiaL = c.m('cabeca.largura') / 2,
    meioC = c.m('cabeca.comp') / 2;
  // o perfil vai do topo (fração 1 de tragion-ao-topo) ao queixo (altura total da cabeça abaixo do topo)
  const queixo = topo - alt;
  const aneis = FORMA.cabeca.map(([h, la, fr, tr]) => {
    const y = h >= 0 ? h * topo : (h / FORMA.cabeca[FORMA.cabeca.length - 1]![0]) * queixo;
    return anel(r, noRef(r, [0, y, 0.6]), la * meiaL, fr * meioC, tr * meioC);
  });
  // nariz: uma cunha curta à frente do rosto, na altura do meio entre o queixo e a raiz do nariz
  const yN = queixo + c.m('cabeca.mentoAoNasio') * 0.62;
  const base = noRef(r, [0, yN, meioC * 0.86]),
    ponta = noRef(r, [0, yN - 1.2, meioC * 0.86 + 2.4]);
  const rn: Ref = { o: base, x: r.x, y: norm(cross(r.x, norm([ponta[0] - base[0], ponta[1] - base[1], ponta[2] - base[2]]))), z: r.y };
  const nariz: Volume = { aneis: [{ c: base, x: rn.x, z: rn.z, a: 1.5, f: 2.2, b: 1.6 }, { c: ponta, x: rn.x, z: rn.z, a: 1.0, f: 0.9, b: 0.9 }] };
  // orelhas: um disco achatado de cada lado, na altura do tragion (a base do crânio), com a altura medida
  const hO = c.m('cabeca.orelhaAltura') / 2;
  const orelhas = [-1, 1].map((s): Volume => {
    const o = noRef(r, [s * meiaL * 0.97, hO * 0.35, -0.8]);
    const A = (dx: number, k: number): Anel => ({ c: add(o, mul(r.x, s * dx)), x: r.z, z: r.y, a: hO * 0.5 * k, f: hO * k, b: hO * k });
    return { aneis: [A(-0.4, 0.75), A(0.4, 1), A(1.1, 0.6)] };
  });
  return { cranio: [{ aneis: aneis.reverse(), junta0: true }], rosto: [nariz, ...orelhas] };
}

function pescoco(e: Esq): Volume {
  const c = e.corpo;
  const s0 = e.nos[e.iC7]!.s - 2,
    s1 = e.nos[e.iCranio]!.s + 1.5;
  const aneis = densas(c.secoes.pescoco!, 2).map((s) => {
    const r = naColuna(e, s0 + (s1 - s0) * s.t);
    return anel(r, add(r.o, mul(r.z, FORMA.pescocoAFrente)), s.a, s.f, s.b);
  });
  return { aneis, junta0: true, junta1: true };
}

/** Dobra das juntas de um dedo (graus) para fechar em volta de um cilindro de diâmetro d: cada falange encosta nele. */
export function dobraDaPegada(falanges: number[], raioDoDedo: number, d: number): number[] {
  const R = d / 2 + raioDoDedo;
  const meio = (l: number) => Math.atan(l / (2 * R)) / (Math.PI / 180);
  // a palma encosta no cilindro até a junta; entre duas falanges tangentes, o desvio é a soma dos dois meios-ângulos
  return falanges.map((l, i) => (i === 0 ? meio(l) + 18 : meio(falanges[i - 1]!) + meio(l)));
}

function mao(e: Esq, k: Lado): Volume[] {
  const c = e.corpo,
    L = e.lado[k],
    r = L.mao,
    s = sinal(k);
  const comp = c.m('mao.comp'),
    larg = c.m('mao.largura'),
    palma = c.m('mao.palma') * FORMA.palmaAteAsJuntas;
  const rp = c.m('raio.punho');
  const dedosDir = mul(r.y, -1);
  const esp = larg * 0.16; // meia espessura da palma
  const vol: Volume[] = [];
  const P = (x: number, d: number, z: number): V3 => comb([1, r.o], [s * x, r.x], [d, dedosDir], [z, r.z]);
  vol.push({
    aneis: [
      { c: P(0, 0, 0), x: r.x, z: r.z, a: rp * 1.15, f: rp * 0.8, b: rp * 0.8 },
      { c: P(0.2, palma * 0.5, 0), x: r.x, z: r.z, a: larg * 0.5, f: esp * 1.15, b: esp },
      { c: P(0, palma, 0), x: r.x, z: r.z, a: larg * 0.5, f: esp, b: esp * 0.9 },
    ],
    junta0: true,
  });
  const forma = L.formaMao;
  for (const [px, fl, fr] of FORMA.dedos) {
    const raio = fr * larg,
      total = fl * comp;
    const fal = FORMA.falanges.map((f) => f * total);
    const dobras = forma === 'pegada' ? dobraDaPegada(fal, raio, L.diamMao) : forma === 'aberta' ? [0, 0, 0] : FORMA.dedoRelaxado;
    let o = P(px * (larg * 0.5 - raio), palma - raio * 0.4, 0);
    let ang = 0;
    const aneis: Anel[] = [];
    let dir = dedosDir,
      zz = r.z;
    aneis.push({ c: o, x: r.x, z: zz, a: raio, f: raio, b: raio });
    fal.forEach((l, i) => {
      ang += dobras[i]!;
      dir = girar(dedosDir, r.x, -ang);
      zz = girar(r.z, r.x, -ang);
      const fim = add(o, mul(dir, l));
      const rr = raio * (1 - 0.1 * (i + 1));
      if (i === 2) {
        aneis.push({ c: lerp(o, fim, 0.75), x: r.x, z: zz, a: rr, f: rr, b: rr });
        aneis.push({ c: fim, x: r.x, z: zz, a: rr * 0.45, f: rr * 0.45, b: rr * 0.45 });
      } else aneis.push({ c: fim, x: r.x, z: zz, a: rr, f: rr, b: rr });
      o = fim;
    });
    vol.push({ aneis, junta0: true });
  }
  // polegar: sai da base da palma, do lado do polegar; na pegada, fecha por baixo do cabo, ao encontro do indicador
  const [mc, f1, f2, tr] = FORMA.polegar;
  const raio = tr * larg;
  const dirs: V3[] =
    forma === 'pegada'
      ? [
          [0.25, 0.62, 0.74],
          [-0.2, 0.68, 0.7],
          [-0.45, 0.35, 0.82],
        ]
      : forma === 'aberta'
        ? [
            [0.72, 0.68, 0.1],
            [0.62, 0.78, 0.05],
            [0.5, 0.86, 0],
          ]
        : [
            [0.5, 0.8, 0.33],
            [0.3, 0.9, 0.3],
            [0.2, 0.93, 0.3],
          ];
  let o = P(larg * 0.3, palma * 0.14, esp * 0.5);
  const an: Anel[] = [{ c: o, x: r.x, z: r.z, a: raio * 1.25, f: raio * 1.25, b: raio * 1.25 }];
  [mc, f1, f2].forEach((fl, i) => {
    const d = norm(comb([s * dirs[i]![0], r.x], [dirs[i]![1], dedosDir], [dirs[i]![2], r.z]));
    const fim = add(o, mul(d, fl * comp));
    const rr = raio * (i === 2 ? 0.55 : 1.05 - 0.08 * i);
    an.push({ c: fim, x: norm(cross(d, r.z)), z: norm(cross(norm(cross(d, r.z)), d)), a: rr, f: rr, b: rr });
    o = fim;
  });
  vol.push({ aneis: an, junta0: true });
  return vol;
}

function pe(e: Esq, k: Lado): Volume[] {
  const c = e.corpo,
    L = e.lado[k];
  const dBola = c.m('pe.calcanharABola'),
    dTorn = c.m('pe.calcanharAoTornozelo'),
    larg = c.m('pe.largura') / 2,
    calc = c.m('pe.larguraCalcanhar') / 2,
    hM = c.m('altura.maleolo'),
    comp = c.m('pe.comp');
  // anéis em pé: largura ao longo de pe.x, altura ao longo de pe.y (o "z" do anel é a vertical do pé); a sola fica em y = 0
  const A = (r: Ref, z: number, a: number, h: number): Anel => ({ c: noRef(r, [0, h / 2, z]), x: r.x, z: r.y, a, f: h / 2, b: h / 2 });
  const tras: Volume = {
    aneis: [A(L.pe, -dBola + 0.2, calc * 0.55, 2.6), A(L.pe, -dBola + 1.6, calc * 0.95, 5.2), A(L.pe, -(dBola - dTorn) - 1.5, calc * 1.02, hM + 0.6), A(L.pe, -(dBola - dTorn) + 2.2, calc * 1.08, hM + 0.2), A(L.pe, -dBola * 0.36, larg * 0.9, hM * 0.72), A(L.pe, 0, larg, hM * 0.46)],
    junta1: true,
  };
  const dd = comp - dBola;
  const frente: Volume = { aneis: [A(L.dedos, 0, larg, hM * 0.46), A(L.dedos, dd * 0.55, larg * 0.95, hM * 0.36), A(L.dedos, dd * 0.92, larg * 0.7, hM * 0.28), A(L.dedos, dd, larg * 0.35, hM * 0.16)], junta0: true };
  return [tras, frente];
}

export function corpo3d(e: Esq): Corpo3d {
  const c = e.corpo,
    m = (id: string) => c.m(id);
  const partes: Parte[] = [];
  const juntas: Junta[] = [];
  partes.push({ id: 'tronco', volumes: [{ aneis: reamostrar(aneisDoTronco(e), 3) }, pescoco(e)] });
  const cab = cabeca(e);
  partes.push({ id: 'cabeca', volumes: cab.cranio });
  partes.push({ id: 'rosto', volumes: cab.rosto });
  const rOmbro = m('largura.bideltoide') / 2 - m('ombro.meiaDistancia');
  for (const k of ['R', 'L'] as const) {
    const L = e.lado[k],
      s = sinal(k);
    // braço
    partes.push({ id: `braco${k}`, lado: k, volumes: [{ aneis: membro(L.braco, m('braco.comp'), densas(c.secoes.braco!, 3)), junta0: true, junta1: true }] });
    // antebraço: a seção gira com a pronação, do cotovelo (presa ao braço) ao punho (presa à mão)
    const fa = m('antebraco.comp'),
      uFa = mul(L.antebraco.y, -1);
    partes.push({
      id: `antebraco${k}`,
      lado: k,
      volumes: [
        {
          aneis: densas(c.secoes.antebraco!, 3).map((sec) => {
            const g = s * L.ang.pronacao * sec.t;
            return { c: add(L.antebraco.o, mul(uFa, sec.t * fa)), x: girar(L.antebraco.x, uFa, g), z: girar(L.antebraco.z, uFa, g), a: sec.a, f: sec.f, b: sec.b };
          }),
          junta0: true,
          junta1: true,
        },
      ],
    });
    partes.push({ id: `mao${k}`, lado: k, volumes: mao(e, k) });
    partes.push({ id: `coxa${k}`, lado: k, volumes: [{ aneis: membro(L.coxa, m('coxa.comp'), densas(c.secoes.coxa!, 3)), junta0: true, junta1: true }] });
    partes.push({ id: `perna${k}`, lado: k, volumes: [{ aneis: membro(L.canela, m('perna.comp'), densas(c.secoes.perna!, 3)), junta0: true, junta1: true }] });
    partes.push({ id: `pe${k}`, lado: k, volumes: pe(e, k) });
    const sB = c.secoes.braco!,
      sC = c.secoes.coxa!,
      sP = c.secoes.perna!;
    juntas.push({ id: `ombro${k}`, c: L.ombro, r: rOmbro, a: 'tronco', b: `braco${k}` });
    juntas.push({ id: `cotovelo${k}`, c: L.cotovelo, r: (sB[sB.length - 1]!.a + sB[sB.length - 1]!.b) / 2, a: `braco${k}`, b: `antebraco${k}` });
    juntas.push({ id: `punho${k}`, c: L.punho, r: m('raio.punho') * 0.86, a: `antebraco${k}`, b: `mao${k}` });
    juntas.push({ id: `quadril${k}`, c: L.quadril, r: sC[0]!.b, a: 'tronco', b: `coxa${k}` });
    juntas.push({ id: `joelho${k}`, c: L.joelho, r: (sP[0]!.a + sP[0]!.b) / 2, a: `coxa${k}`, b: `perna${k}` });
    juntas.push({ id: `tornozelo${k}`, c: add(L.tornozelo, mul(L.pe.y, -0.6)), r: m('raio.tornozelo') * 1.02, a: `perna${k}`, b: `pe${k}` });
    juntas.push({ id: `bola${k}`, c: noRef(L.dedos, [0, m('altura.maleolo') * 0.23, 0]), r: m('altura.maleolo') * 0.23, a: `pe${k}`, b: `pe${k}` });
  }
  return { partes, juntas };
}

/** Mais anéis entre os dados (Catmull-Rom nos centros e nos raios), para o tronco dobrar liso. */
function reamostrar(aneis: Anel[], n: number): Anel[] {
  const out: Anel[] = [];
  const S = (i: number) => aneis[Math.max(0, Math.min(aneis.length - 1, i))]!;
  const h = (p0: number, p1: number, p2: number, p3: number, u: number) => 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);
  for (let i = 0; i < aneis.length - 1; i++) {
    for (let j = 0; j < n; j++) {
      const u = j / n;
      const [a, b, cc, d] = [S(i - 1), S(i), S(i + 1), S(i + 2)];
      const v3 = (q: 'c') => [0, 1, 2].map((ax) => h(a[q][ax]!, b[q][ax]!, cc[q][ax]!, d[q][ax]!, u)) as V3;
      const x = norm(lerp(b.x, cc.x, u)),
        z = norm(lerp(b.z, cc.z, u));
      out.push({ c: v3('c'), x, z, a: Math.max(0.5, h(a.a, b.a, cc.a, d.a, u)), f: Math.max(0.5, h(a.f, b.f, cc.f, d.f, u)), b: Math.max(0.5, h(a.b, b.b, cc.b, d.b, u)) });
    }
  }
  out.push(S(aneis.length - 1));
  return out;
}

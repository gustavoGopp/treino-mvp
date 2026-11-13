// Motor novo: o corpo como malha. A forma vem da malha do MakeHuman (domínio público, CC0; ver
// scripts/animacao-nova/malha/preparar.mjs), e o movimento e as medidas vêm do nosso esqueleto e da tabela do corpo:
// cada segmento da malha é preso ao osso correspondente e esticado ao comprimento da tabela.
import dados from './dados/malha.json';
import { dobraDaPegada } from './corpo3d';
import { LADOS, naColuna, resolverTronco, sinal } from './esqueleto';
import type { Esq, Lado, Tronco } from './esqueleto';
import type { Corpo } from './tabelas';
import { REF0, add, angulo, cross, dirRef, dist, dot, girar, len, mul, noRef, norm, paraRef, perp, sub } from './vec';
import type { Ref, V3 } from './vec';

const bytes = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
export interface Malha {
  pontos: number;
  pos: Float32Array;
  tri: Uint16Array;
  segIdx: Uint8Array;
  segPeso: Uint8Array;
  segs: string[];
  inf: number;
  alturaCm: number;
  juntas: Record<string, { de: number[]; ate: number[] }>;
  /** Larguras, profundidades e raios medidos na malha em repouso (cm), para o ajuste à tabela do corpo. */
  medidas: typeof dados.medidas;
}
let MALHA: Malha | null = null;
export function malhaBase(): Malha {
  if (MALHA) return MALHA;
  const p = bytes(dados.pos),
    t = bytes(dados.tri);
  MALHA = { pontos: dados.pontos, pos: new Float32Array(p.buffer, 0, p.length / 4), tri: new Uint16Array(t.buffer, 0, t.length / 2), segIdx: bytes(dados.segIdx), segPeso: bytes(dados.segPeso), segs: dados.segs, inf: dados.influencias, alturaCm: dados.alturaCm, juntas: dados.juntas, medidas: dados.medidas };
  return MALHA;
}

/** Como um segmento da malha em repouso vai para o esqueleto posado: referencial de repouso, escala e de onde vem o referencial posado. */
interface Liga {
  rep: Ref;
  /** Escala ao longo de x, y e z do referencial de repouso (y = ao longo do osso). */
  k: V3;
  posado(e: Esq): Ref;
}
interface Preparada {
  malha: Malha;
  ligas: Liga[];
  /** A malha em repouso já com as larguras e os raios da tabela do corpo. */
  rep: Float32Array;
  /** Dedos: para cada mão, os ossos na ordem [dedo 1..5][falange 1..3], com a base e o vetor de cada falange no referencial da mão. */
  dedos: Record<Lado, { base: V3; vec: V3 }[][]>;
  maoRep: Record<Lado, Ref>;
  kMao: Record<Lado, number>;
}
const PREP = new WeakMap<Corpo, Preparada>();

const J = (m: Malha, nome: string, ponta: 'de' | 'ate' = 'de'): V3 => {
  const j = m.juntas[nome];
  if (!j) throw new Error(`a malha não tem a junta ${nome}`);
  return j[ponta] as V3;
};
/** Referencial de um osso: y aponta para a junta de cima; z é a frente, tirada da dica. */
function refOsso(o: V3, paraBaixo: V3, zDica: V3): Ref {
  const y = mul(norm(paraBaixo), -1);
  const z = norm(perp(zDica, y));
  return { o, x: cross(y, z), y, z };
}
/** Os mesmos referenciais de braço que ./esqueleto.ts calcula, a partir de ombro, cotovelo, punho e mão da malha em repouso. */
function bracoDeRepouso(m: Malha, k: Lado) {
  const s = sinal(k),
    L = `.${k}`;
  const S = J(m, 'upperarm01' + L),
    E = J(m, 'lowerarm01' + L),
    W = J(m, 'wrist' + L);
  const uUa = norm(sub(E, S)),
    uFa = norm(sub(W, E));
  const zb = norm(add(perp(uFa, uUa), mul(norm(perp([0, 0, 1], uUa)), 0.03)));
  const braco: Ref = { o: S, y: mul(uUa, -1), z: zb, x: cross(mul(uUa, -1), zb) };
  const flex = angulo(uUa, uFa);
  const eixo = len(cross(uUa, zb)) > 1e-6 ? norm(cross(uUa, zb)) : braco.x;
  const zf = norm(perp(girar(zb, eixo, flex), uFa));
  const ante: Ref = { o: E, y: mul(uFa, -1), z: zf, x: cross(mul(uFa, -1), zf) };
  const dedos = norm(sub(J(m, 'finger3-1' + L), W));
  const tp = norm(perp(sub(J(m, 'finger2-1' + L), J(m, 'finger5-1' + L)), dedos));
  const xm = mul(tp, s),
    ym = mul(dedos, -1);
  const mao: Ref = { o: W, x: xm, y: ym, z: cross(xm, ym) };
  let pron = Math.atan2(dot(tp, ante.z), dot(tp, mul(ante.x, s))) / (Math.PI / 180);
  if (pron < -90) pron += 360;
  return { S, E, W, braco, ante, mao, pron, uFa };
}
const torcido = (r: Ref, eixo: V3, graus: number): Ref => ({ o: r.o, x: girar(r.x, eixo, graus), y: r.y, z: girar(r.z, eixo, graus) });

function preparar(c: Corpo): Preparada {
  const ja = PREP.get(c);
  if (ja) return ja;
  const m = malhaBase();
  const med = (id: string) => c.m(id);
  const kG = med('estatura') / m.alturaCm;
  const ligas: Liga[] = [];
  const maoRep = {} as Record<Lado, Ref>,
    kMaoDe = {} as Record<Lado, number>,
    dedos = {} as Preparada['dedos'];
  const pr: Preparada = { malha: m, ligas, rep: m.pos, dedos, maoRep, kMao: kMaoDe };
  const liga = (seg: string, l: Liga) => {
    ligas[m.segs.indexOf(seg)] = l;
  };
  // ---------- pelve, coluna e cabeça: presas ao nosso tronco em pé ----------
  const quadrilE = J(m, 'upperleg01.L'),
    quadrilD = J(m, 'upperleg01.R');
  const meio = mul(add(quadrilE, quadrilD), 0.5);
  const c7 = J(m, 'neck01'),
    cranio = J(m, 'head');
  const emPe: Tronco = resolverTronco(c, { pelve: [0, med('altura.trocanter'), 0] });
  const kTronco = (med('altura.cervical') - med('altura.trocanter')) / (c7[1] - meio[1]);
  const kPesc = (med('altura.baseDoCranio') - med('altura.cervical')) / (cranio[1] - c7[1]);
  liga('pelve', { rep: { ...REF0, o: meio }, k: [1, kG, 1], posado: (e) => e.pelve });
  const sDaAltura = (y: number): number => {
    const n = emPe.nos;
    if (y <= n[0]!.ref.o[1]) return y - n[0]!.ref.o[1];
    for (let i = 0; i < n.length - 1; i++) {
      const a = n[i]!,
        b = n[i + 1]!;
      if (y <= b.ref.o[1]) return a.s + ((y - a.ref.o[1]) / (b.ref.o[1] - a.ref.o[1])) * (b.s - a.s);
    }
    return n[n.length - 1]!.s + (y - n[n.length - 1]!.ref.o[1]);
  };
  const naEspinha = (seg: string, osso: string, pescoco: boolean) => {
    const p = J(m, osso);
    const y = pescoco ? med('altura.cervical') + (p[1] - c7[1]) * kPesc : med('altura.trocanter') + (p[1] - meio[1]) * kTronco;
    const s = sDaAltura(y);
    const rs = naColuna(emPe, s);
    // onde a junta da malha fica em relação à nossa coluna, com o corpo em pé (a malha tem a espinha no meio do tronco)
    const local = paraRef(rs, [0, y, (p[2] - meio[2]) * kG]);
    liga(seg, {
      rep: { ...REF0, o: p },
      k: pescoco ? [kG, kPesc, kG] : [1, kTronco, 1],
      posado: (e) => {
        const rp = naColuna(e, s);
        // a rotação é a diferença entre a coluna posada e a coluna em pé
        const eixo = (v: V3) => dirRef(rp, paraRef({ ...rs, o: [0, 0, 0] }, v));
        return { o: noRef(rp, local), x: eixo([1, 0, 0]), y: eixo([0, 1, 0]), z: eixo([0, 0, 1]) };
      },
    });
  };
  naEspinha('esp5', 'spine05', false);
  naEspinha('esp4', 'spine04', false);
  naEspinha('esp3', 'spine03', false);
  naEspinha('esp2', 'spine02', false);
  naEspinha('esp1', 'spine01', false);
  naEspinha('pesc1', 'neck01', true);
  naEspinha('pesc2', 'neck02', true);
  naEspinha('pesc3', 'neck03', true);
  // cabeça: o topo da malha vai para a estatura; a junta da malha fica à frente da nossa base do crânio
  const dzCabeca = (cranio[2] - meio[2]) * kG - emPe.cabeca.o[2];
  const localCabeca: V3 = [0, med('cabeca.tragionAoTopo') - (m.alturaCm - cranio[1]) * kG, dzCabeca];
  liga('cabeca', { rep: { ...REF0, o: cranio }, k: [kG, kG, kG], posado: (e) => ({ ...e.cabeca, o: noRef(e.cabeca, localCabeca) }) });
  // ---------- membros ----------
  for (const k of LADOS) {
    const L = `.${k}`;
    const b = bracoDeRepouso(m, k);
    const kBraco = med('braco.comp') / dist(b.S, b.E),
      kAnte = med('antebraco.comp') / dist(b.E, b.W);
    const sc = J(m, 'clavicle' + L),
      ac = J(m, 'clavicle' + L, 'ate');
    liga('clav' + k, { rep: refOsso(sc, sub(ac, sc), [0, 0, 1]), k: [kG, med('clavicula.comp') / dist(sc, ac), kG], posado: (e) => refOsso(e.lado[k].esternoclavicular, sub(e.lado[k].acromioclavicular, e.lado[k].esternoclavicular), e.torax.z) });
    liga('escap' + k, { rep: refOsso(ac, sub(b.S, ac), [0, 0, 1]), k: [kG, 1, kG], posado: (e) => refOsso(e.lado[k].acromioclavicular, sub(e.lado[k].ombro, e.lado[k].acromioclavicular), e.torax.z) });
    liga('braco' + k, { rep: b.braco, k: [1, kBraco, 1], posado: (e) => e.lado[k].braco });
    const s = sinal(k);
    for (const [seg, t] of [['ante1', 0.25], ['ante2', 0.8]] as [string, number][])
      liga(seg + k, { rep: torcido(b.ante, b.uFa, s * b.pron * t), k: [1, kAnte, 1], posado: (e) => torcido(e.lado[k].antebraco, mul(e.lado[k].antebraco.y, -1), s * e.lado[k].ang.pronacao * t) });
    const kMao = med('mao.comp') / dist(b.W, J(m, 'finger3-3' + L, 'ate'));
    liga('mao' + k, { rep: b.mao, k: [kMao, kMao, kMao], posado: (e) => e.lado[k].mao });
    maoRep[k] = b.mao;
    kMaoDe[k] = kMao;
    // dedos: cada falange gira em torno do eixo da palma; a base e o vetor de cada uma ficam no referencial da mão
    dedos[k] = [1, 2, 3, 4, 5].map((i) =>
      [1, 2, 3].map((j) => {
        const de = J(m, `finger${i}-${j}${L}`),
          ate = J(m, `finger${i}-${j}${L}`, 'ate');
        const base = paraRef(b.mao, de),
          vec = paraRef({ ...b.mao, o: [0, 0, 0] }, sub(ate, de));
        liga(`f${i}${j}${k}`, { rep: { ...b.mao, o: de }, k: [kMao, kMao, kMao], posado: (e) => falange(pr, e, k, i - 1, j - 1) });
        return { base, vec };
      }),
    );
    // perna
    const Hq = J(m, 'upperleg01' + L),
      Kn = J(m, 'lowerleg01' + L),
      An = J(m, 'foot' + L);
    const uTh = norm(sub(Kn, Hq)),
      uSk = norm(sub(An, Kn));
    const zc = norm(add(mul(perp(uSk, uTh), -1), mul(norm(perp([0, 0, 1], uTh)), 0.03)));
    const coxa: Ref = { o: Hq, y: mul(uTh, -1), z: zc, x: cross(mul(uTh, -1), zc) };
    const flex = angulo(uTh, uSk);
    const eixo = len(cross(uTh, mul(zc, -1))) > 1e-6 ? norm(cross(uTh, mul(zc, -1))) : coxa.x;
    const zk = norm(perp(girar(zc, eixo, flex), uSk));
    const canela: Ref = { o: Kn, y: mul(uSk, -1), z: zk, x: cross(mul(uSk, -1), zk) };
    liga('coxa' + k, { rep: coxa, k: [1, med('coxa.comp') / dist(Hq, Kn), 1], posado: (e) => e.lado[k].coxa });
    liga('perna' + k, { rep: canela, k: [1, med('perna.comp') / dist(Kn, An), 1], posado: (e) => e.lado[k].canela });
    // pé: a origem é o ponto do chão sob a bola do pé (como no nosso esqueleto)
    const t1 = J(m, 'toe1-1' + L),
      t5 = J(m, 'toe5-1' + L);
    const bola: V3 = [(t1[0] + t5[0]) / 2, 0, (t1[2] + t5[2]) / 2];
    const zp = norm(perp(sub(bola, An), [0, 1, 0]));
    const pe: Ref = { o: bola, x: cross([0, 1, 0], zp), y: [0, 1, 0], z: zp };
    const kPe = (med('pe.calcanharABola') - med('pe.calcanharAoTornozelo')) / dist([An[0], 0, An[2]], bola);
    liga('pe' + k, { rep: pe, k: [kG, med('altura.maleolo') / An[1], kPe], posado: (e) => e.lado[k].pe });
    liga('dedos' + k, { rep: pe, k: [kG, kG, kPe], posado: (e) => e.lado[k].dedos });
  }
  pr.rep = ajustarATabela(m, c, ligas);
  PREP.set(c, pr);
  return pr;
}

/** Referencial posado de uma falange: a mão posada, com o dedo dobrado em torno do eixo da palma. */
function falange(pr: Preparada, e: Esq, k: Lado, i: number, j: number): Ref {
  const L = e.lado[k],
    H = L.mao,
    s = sinal(k),
    kM = pr.kMao[k]!;
  const ossos = pr.dedos[k]![i]!;
  const comp = ossos.map((o) => len(o.vec) * kM);
  // dobra de cada junta (graus): a pegada fecha em volta do cabo; a mão aberta estica; relaxada fica como a malha
  let dobras: number[];
  if (L.formaMao === 'pegada') dobras = i === 0 ? [34, 18, 22] : dobraDaPegada(comp, 0.9, L.diamMao).map((d, q) => d * (q === 0 ? 1.15 : 1.25));
  else if (L.formaMao === 'aberta') dobras = i === 0 ? [-8, 0, 0] : [-14, -8, -6];
  else dobras = [0, 0, 0];
  // eixo de dobra no referencial da mão: os dedos fecham para a palma (+z); o polegar fecha por cima da palma
  const eixo: V3 = i === 0 ? norm([0.25 * s, -s, 0.2]) : [-1, 0, 0];
  let acum = 0;
  let o = mul(ossos[0]!.base, kM);
  let x: V3 = [1, 0, 0],
    y: V3 = [0, 1, 0],
    z: V3 = [0, 0, 1];
  for (let q = 0; q <= j; q++) {
    acum += dobras[q]!;
    x = girar([1, 0, 0], eixo, acum);
    y = girar([0, 1, 0], eixo, acum);
    z = girar([0, 0, 1], eixo, acum);
    if (q < j) o = add(o, mul(girar(ossos[q]!.vec, eixo, acum), kM));
  }
  return { o: noRef(H, o), x: dirRef(H, x), y: dirRef(H, y), z: dirRef(H, z) };
}

/**
 * Ajusta a malha em repouso às medidas da tabela do corpo: larguras e profundidades do tronco (nádega, cintura e
 * peito) e raios dos membros (coxa, panturrilha, tornozelo, braço e antebraço). Os comprimentos são acertados depois,
 * osso a osso, no quadro. Assim a forma é a da malha, e as medidas são as da tabela.
 */
function ajustarATabela(m: Malha, c: Corpo, ligas: Liga[]): Float32Array {
  const med = (id: string) => c.m(id);
  const M = m.medidas;
  const out = new Float32Array(m.pos);
  const yQ = J(m, 'upperleg01.L')[1],
    yC7 = J(m, 'neck01')[1],
    H = yC7 - yQ;
  // tronco: fatores de largura (x) e profundidade (z) por altura, entre os três níveis medidos
  const niveis: [number, number, number][] = [
    [yQ - 1.5, med('largura.quadril') / M.nadega.larg, med('prof.nadega') / M.nadega.prof],
    [yQ + H * 0.26, med('largura.cintura') / M.cintura.larg, med('prof.cintura') / M.cintura.prof],
    [yQ + H * 0.64, med('largura.peito') / M.peito.larg, med('prof.peito') / M.peito.prof],
  ];
  const kG = med('estatura') / m.alturaCm;
  const fator = (y: number): [number, number] => {
    if (y <= niveis[0]![0]) return [niveis[0]![1], niveis[0]![2]];
    for (let i = 0; i < 2; i++) {
      const a = niveis[i]!,
        b = niveis[i + 1]!;
      if (y <= b[0]) {
        const u = (y - a[0]) / (b[0] - a[0]),
          w = u * u * (3 - 2 * u);
        return [a[1] + (b[1] - a[1]) * w, a[2] + (b[2] - a[2]) * w];
      }
    }
    // acima do peito, volta aos poucos à escala geral (os ombros são acertados pela clavícula)
    const u = Math.min(1, (y - niveis[2]![0]) / (yC7 - niveis[2]![0]));
    return [niveis[2]![1] + (kG - niveis[2]![1]) * u, niveis[2]![2] + (kG - niveis[2]![2]) * u];
  };
  const zEixo = J(m, 'spine03')[2];
  const tronco = new Set(['pelve', 'esp5', 'esp4', 'esp3', 'esp2', 'esp1'].map((n) => m.segs.indexOf(n)));
  // membros: raio da tabela / raio da malha, variando ao longo do osso
  const raios: Record<string, [number, number, number][]> = {
    coxa: [[0.2, med('raio.coxa') / M.raioCoxa, 0], [0.86, med('raio.coxaBaixa') / M.raioCoxaBaixa, 0]],
    perna: [[0.3, med('raio.panturrilha') / M.raioPanturrilha, 0], [0.9, med('raio.tornozelo') / M.raioTornozelo, 0]],
    braco: [[0.5, (med('raio.bracoFletido') * med('raio.bracoRelaxadoSobreFletido')) / M.raioBraco, 0]],
    ante1: [[0.25, med('raio.antebraco') / M.raioAntebraco, 0], [1, (med('raio.punho') / M.raioAntebraco) * 1.25, 0]],
    ante2: [[0.25, med('raio.antebraco') / M.raioAntebraco, 0], [1, (med('raio.punho') / M.raioAntebraco) * 1.25, 0]],
  };
  const kRaio = (nome: string, t: number): number => {
    const r = raios[nome.replace(/[RL]$/, '')];
    if (!r) return 0;
    if (r.length === 1 || t <= r[0]![0]) return r[0]![1];
    if (t >= r[1]![0]) return r[1]![1];
    return r[0]![1] + ((r[1]![1] - r[0]![1]) * (t - r[0]![0])) / (r[1]![0] - r[0]![0]);
  };
  const compDe = new Map<number, number>();
  m.segs.forEach((nome, g) => {
    const b = nome.replace(/[RL]$/, ''),
      L = '.' + nome.slice(-1);
    const par: Record<string, [string, string]> = { coxa: ['upperleg01', 'lowerleg01'], perna: ['lowerleg01', 'foot'], braco: ['upperarm01', 'lowerarm01'], ante1: ['lowerarm01', 'wrist'], ante2: ['lowerarm01', 'wrist'] };
    if (par[b]) compDe.set(g, dist(J(m, par[b]![0] + L), J(m, par[b]![1] + L)));
  });
  for (let i = 0; i < m.pontos; i++) {
    const p: V3 = [m.pos[i * 3]!, m.pos[i * 3 + 1]!, m.pos[i * 3 + 2]!];
    let dx = 0,
      dy = 0,
      dz = 0;
    for (let j = 0; j < m.inf; j++) {
      const w = m.segPeso[i * m.inf + j]! / 255,
        g = m.segIdx[i * m.inf + j]!;
      if (!w) continue;
      if (tronco.has(g)) {
        const [kx, kz] = fator(p[1]);
        dx += w * (kx - 1) * p[0];
        dz += w * (kz - 1) * (p[2] - zEixo);
      } else if (compDe.has(g)) {
        const r = ligas[g]!.rep,
          q = paraRef(r, p);
        const k = kRaio(m.segs[g]!, -q[1] / compDe.get(g)!);
        const d = dirRef(r, [q[0] * (k - 1), 0, q[2] * (k - 1)]);
        dx += w * d[0];
        dy += w * d[1];
        dz += w * d[2];
      }
    }
    out[i * 3] = p[0] + dx;
    out[i * 3 + 1] = p[1] + dy;
    out[i * 3 + 2] = p[2] + dz;
  }
  return out;
}

/* ============================== músculos ============================== */
export type IdMusculoMalha = 'quadriceps' | 'gluteos' | 'adutores' | 'posteriores' | 'panturrilha' | 'peitoral' | 'deltoideAnterior' | 'deltoidePosterior' | 'triceps' | 'biceps' | 'dorsal' | 'abdomen';
const MASCARAS = new Map<string, Float32Array>();
/**
 * Região de um músculo na malha: um valor de 0 a 1 por ponto (o pintor desenha a borda em 0,5). As regiões são
 * definidas no corpo em repouso, no referencial do osso (frente, trás, de dentro, de fora, e a faixa ao longo do osso).
 * PROVISÓRIO: é uma demarcação geométrica para os protótipos; o mapa anatômico (origem e inserção de cada músculo,
 * docs/revisoes/animacao-nova/pesquisa/03-musculos-e-ossos.md) entra na etapa 2.
 */
export function mascaraDoMusculo(c: Corpo, id: IdMusculoMalha, lados: 'RL' | Lado = 'RL'): Float32Array {
  const chave = `${id}:${lados}`;
  const ja = MASCARAS.get(chave);
  if (ja) return ja;
  const { malha: m, ligas } = preparar(c);
  const out = new Float32Array(m.pontos);
  const rampa = (x: number, a: number, b: number, borda = 1.2) => Math.max(0, Math.min(1, (x - a) / borda + 0.5)) * Math.max(0, Math.min(1, (b - x) / borda + 0.5));
  const acima = (x: number, a: number, borda = 1.2) => Math.max(0, Math.min(1, (x - a) / borda + 0.5));
  const yQ = J(m, 'upperleg01.L')[1],
    H = J(m, 'neck01')[1] - yQ,
    zE = J(m, 'spine03')[2];
  const seg = (n: string) => m.segs.indexOf(n);
  const tronco = new Set(['pelve', 'esp5', 'esp4', 'esp3', 'esp2', 'esp1', 'clavR', 'clavL', 'escapR', 'escapL'].map(seg));
  for (let i = 0; i < m.pontos; i++) {
    const p: V3 = [m.pos[i * 3]!, m.pos[i * 3 + 1]!, m.pos[i * 3 + 2]!];
    let v = 0;
    for (let j = 0; j < m.inf; j++) {
      const w = m.segPeso[i * m.inf + j]! / 255,
        g = m.segIdx[i * m.inf + j]!;
      if (!w) continue;
      const nome = m.segs[g]!,
        k = nome.slice(-1) as Lado,
        b = nome.replace(/[RL]$/, '');
      const doLado = lados === 'RL' || lados === k;
      let r = 0;
      if (tronco.has(g)) {
        const h = (p[1] - yQ) / H,
          x = Math.abs(p[0]),
          z = p[2] - zE;
        const ladoOk = lados === 'RL' || (lados === 'L' ? p[0] > 0 : p[0] < 0) ? 1 : 0;
        if (id === 'peitoral') r = rampa(h, 0.6, 0.88, 0.04) * acima(z, 3.5) * rampa(x, 0.6, 15.5) * ladoOk;
        else if (id === 'abdomen') r = rampa(h, 0.03, 0.56, 0.04) * acima(z, 4) * (1 - acima(x, 7.2));
        else if (id === 'dorsal') r = rampa(h, 0.2, 0.74, 0.05) * (1 - acima(z, -1)) * acima(x, 2.5) * ladoOk;
        else if (id === 'gluteos') r = rampa(p[1] - yQ, -10, 9, 2) * (1 - acima(z, -2.5, 2)) * rampa(x, 1, 18) * ladoOk;
        else if (id === 'deltoideAnterior' && b === 'escap') r = acima(z, 0.5) * (doLado ? 1 : 0);
        else if (id === 'deltoidePosterior' && b === 'escap') r = (1 - acima(z, -0.5)) * (doLado ? 1 : 0);
      } else if (doLado && (b === 'coxa' || b === 'perna' || b === 'braco')) {
        const rf = ligas[g]!.rep,
          q = paraRef(rf, p),
          s = sinal(k);
        const comp = b === 'coxa' ? dist(J(m, 'upperleg01.' + k), J(m, 'lowerleg01.' + k)) : b === 'perna' ? dist(J(m, 'lowerleg01.' + k), J(m, 'foot.' + k)) : dist(J(m, 'upperarm01.' + k), J(m, 'lowerarm01.' + k));
        const t = -q[1] / comp,
          fora = s * q[0],
          frente = q[2];
        if (b === 'coxa') {
          if (id === 'quadriceps') r = rampa(t, 0.1, 0.95, 0.05) * acima(frente * 0.9 + fora * 0.4, 0.8);
          else if (id === 'posteriores') r = rampa(t, 0.16, 0.93, 0.05) * (1 - acima(frente * 0.9 - fora * 0.2, -1.5));
          else if (id === 'adutores') r = rampa(t, 0.04, 0.62, 0.05) * (1 - acima(fora, -2.2)) * rampa(frente, -5, 4.5);
          else if (id === 'gluteos') r = (1 - acima(t, 0.2, 0.06)) * (1 - acima(frente, -2.5, 2));
        } else if (b === 'perna') {
          if (id === 'panturrilha') r = rampa(t, 0.04, 0.62, 0.05) * (1 - acima(frente, 0.3));
        } else {
          if (id === 'triceps') r = rampa(t, 0.22, 0.96, 0.05) * (1 - acima(frente, -0.4));
          else if (id === 'biceps') r = rampa(t, 0.3, 0.95, 0.05) * acima(frente, 0.6);
          else if (id === 'deltoideAnterior') r = (1 - acima(t, 0.34, 0.05)) * acima(frente, 0.3);
          else if (id === 'deltoidePosterior') r = (1 - acima(t, 0.34, 0.05)) * (1 - acima(frente, -0.3));
        }
      }
      v += w * r;
    }
    out[i] = v;
  }
  MASCARAS.set(chave, out);
  return out;
}

/** As posições da malha para um esqueleto resolvido (cm). `out` pode ser reaproveitado entre quadros. */
export function pele(e: Esq, out?: Float32Array): Float32Array {
  const { malha: m, ligas, rep } = preparar(e.corpo);
  const n = m.pontos,
    P = out ?? new Float32Array(n * 3);
  // matriz de cada segmento: ponto em repouso → local do osso (com a escala) → osso posado
  const M = ligas.map((l) => {
    const r = l.rep,
      q = l.posado(e);
    const col = (ex: number, ey: number, ez: number) => {
      // componente do vetor do mundo em cada eixo de repouso, escalada, levada ao eixo posado
      const a = (r.x[0] * ex + r.x[1] * ey + r.x[2] * ez) * l.k[0],
        b = (r.y[0] * ex + r.y[1] * ey + r.y[2] * ez) * l.k[1],
        cc = (r.z[0] * ex + r.z[1] * ey + r.z[2] * ez) * l.k[2];
      return [a * q.x[0] + b * q.y[0] + cc * q.z[0], a * q.x[1] + b * q.y[1] + cc * q.z[1], a * q.x[2] + b * q.y[2] + cc * q.z[2]];
    };
    const cx = col(1, 0, 0),
      cy = col(0, 1, 0),
      cz = col(0, 0, 1);
    const t = [q.o[0] - (cx[0]! * r.o[0] + cy[0]! * r.o[1] + cz[0]! * r.o[2]), q.o[1] - (cx[1]! * r.o[0] + cy[1]! * r.o[1] + cz[1]! * r.o[2]), q.o[2] - (cx[2]! * r.o[0] + cy[2]! * r.o[1] + cz[2]! * r.o[2])];
    return [cx[0]!, cy[0]!, cz[0]!, t[0]!, cx[1]!, cy[1]!, cz[1]!, t[1]!, cx[2]!, cy[2]!, cz[2]!, t[2]!];
  });
  const inf = m.inf;
  for (let i = 0; i < n; i++) {
    const x = rep[i * 3]!,
      y = rep[i * 3 + 1]!,
      z = rep[i * 3 + 2]!;
    let X = 0,
      Y = 0,
      Z = 0;
    for (let j = 0; j < inf; j++) {
      const w = m.segPeso[i * inf + j]! / 255;
      if (!w) continue;
      const a = M[m.segIdx[i * inf + j]!]!;
      X += w * (a[0]! * x + a[1]! * y + a[2]! * z + a[3]!);
      Y += w * (a[4]! * x + a[5]! * y + a[6]! * z + a[7]!);
      Z += w * (a[8]! * x + a[9]! * y + a[10]! * z + a[11]!);
    }
    P[i * 3] = X;
    P[i * 3 + 1] = Y;
    P[i * 3 + 2] = Z;
  }
  return P;
}
/** Normais suaves (uma por ponto), pela soma das normais dos triângulos vizinhos. */
export function normais(pos: Float32Array, tri: Uint16Array, out?: Float32Array): Float32Array {
  const N = out ?? new Float32Array(pos.length);
  N.fill(0);
  for (let t = 0; t < tri.length; t += 3) {
    const a = tri[t]! * 3,
      b = tri[t + 1]! * 3,
      c = tri[t + 2]! * 3;
    const ux = pos[b]! - pos[a]!,
      uy = pos[b + 1]! - pos[a + 1]!,
      uz = pos[b + 2]! - pos[a + 2]!;
    const vx = pos[c]! - pos[a]!,
      vy = pos[c + 1]! - pos[a + 1]!,
      vz = pos[c + 2]! - pos[a + 2]!;
    const nx = uy * vz - uz * vy,
      ny = uz * vx - ux * vz,
      nz = ux * vy - uy * vx;
    for (const i of [a, b, c]) {
      N[i] = N[i]! + nx;
      N[i + 1] = N[i + 1]! + ny;
      N[i + 2] = N[i + 2]! + nz;
    }
  }
  for (let i = 0; i < N.length; i += 3) {
    const l = Math.hypot(N[i]!, N[i + 1]!, N[i + 2]!) || 1;
    N[i] = N[i]! / l;
    N[i + 1] = N[i + 1]! / l;
    N[i + 2] = N[i + 2]! / l;
  }
  return N;
}

// O que as regras de pintura usam (acréscimo de 19/11, auditoria das fases A e B): a ordem em que o app pinta cada
// parte do Boneco e cada item de uma peça, numa vista, e o que de fato fica na frente, medido por um raio até quem olha.
// Não é um arquivo de regras (não entra no ./registro.ts).
// O app pinta cada item na sua profundidade (maior = mais perto de quem olha, pintado depois): o Boneco, por grupo
// (o tronco, a bacia, a cabeça e as pernas de perto num item só; cada braço e cada membro de longe à parte), com o
// ajuste de profundidade do quadro naquela vista; cada peça, no desenho realista, item por item. Uma peça que fica
// atrás de uma parte do corpo tem de ser pintada antes dela, e uma que fica na frente, depois.
import { desenharBoneco, formaDoBoneco } from '../boneco';
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Anel } from '../corpo3d';
import { VISTAS, naTela } from '../desenho';
import type { IdVista } from '../desenho';
import { equipamentoRealista } from '../equipamento';
import type { Exercicio, Quadro } from '../movimento';
import type { Peca } from '../pecas';
import { obj } from '../tabelas';
import { add, comb, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

export const GRUPOS = ['corpo', 'pernaR', 'pernaL', 'bracoR', 'bracoL'] as const;
export type Grupo = (typeof GRUPOS)[number];
/** O nome de cada grupo nos relatórios (as pernas de perto são pintadas com o corpo, no item dele). */
export const NOME_DO_GRUPO: Record<Grupo, string> = { corpo: 'o tronco', pernaR: 'a perna direita', pernaL: 'a perna esquerda', bracoR: 'o braço direito', bracoL: 'o braço esquerdo' };

/** As vistas em que o guia mostra o exercício: as dele e as dos erros (como `vistasDoGuia`, em ../ponte.ts). */
export const vistasDoGuia = (ex: Exercicio): IdVista[] => [...new Set([...ex.vistas, ...ex.ficha.erros.map((e) => e.vista)])] as IdVista[];

/** O ajuste de profundidade do quadro numa vista (como `viesDoQuadro`, em ../cena.ts). */
const viesNaVista = (q: Quadro, vista: IdVista) => (q.viesNaVista?.[vista] ? { ...q.vies, ...q.viesNaVista[vista] } : q.vies);

/**
 * A profundidade em que cada grupo do Boneco é pintado num quadro, numa vista. Para achar o item de um grupo, ele é
 * pintado como "a parte que erra" (a classe muda só nele). As pernas de perto saem no item do corpo; o braço de longe
 * que fica todo escondido atrás do corpo não é pintado (fica de fora).
 */
export function pinturaDoBoneco(q: Quadro, vista: IdVista): Partial<Record<Grupo, number>> {
  const cam = VISTAS[vista];
  const vies = viesNaVista(q, vista);
  const out: Partial<Record<Grupo, number>> = {};
  for (const g of GRUPOS) {
    const item = desenharBoneco(q.esq, cam, { estilo: 'cinza', suf: '-f', erroEm: [g], vies }).find((it) => it.s.includes('b-c-e'));
    if (item) out[g] = item.d;
  }
  return out;
}

/**
 * A profundidade em que cada item de uma peça é pintado, numa vista, na ordem em que a peça os desenha (no desenho
 * realista do app; sem a sombra no chão, que é o último). O item de cenário (pintado numa camada atrás do corpo inteiro)
 * conta como infinitamente longe.
 */
export function pinturaDaPeca(p: Peca, vista: IdVista): number[] {
  return equipamentoRealista([p], VISTAS[vista], 'claro', 'conferir')
    .itens.filter((it) => it.camada > 0)
    .map((it) => (it.camada >= 1 ? it.d : -1e6));
}

/* ============================== o que fica na frente, pelo raio ============================== */
/**
 * Uma parte de uma peça, para o raio: o eixo (uma linha de pontos, ou um ponto só para uma bola), o raio dela e, para a
 * pintura, quais itens da peça (pela ordem em que ela os desenha, como em `pinturaDaPeca`) a pintam (todos, se não disser).
 */
export interface ParteDaPeca {
  eixo: V3[];
  raio: number;
  itens?: number[];
  /**
   * Para uma parte em forma de caixa (um estofado, uma coluna de seção quadrada): o centro, os três eixos (unitários) e
   * as meias medidas ao longo deles. Com ela, `eixo` e `raio` não contam.
   */
  caixa?: { o: V3; e: [V3, V3, V3]; meias: V3 };
}
/** O raio que sai de `p` na direção `d` (unitária) atravessa a caixa (encolhida `k` vezes), adiante de `t0`? */
function raioNaCaixa(c: NonNullable<ParteDaPeca['caixa']>, p: V3, d: V3, k: number, t0: number): boolean {
  let lo = t0,
    hi = 1e9;
  for (let i = 0; i < 3; i++) {
    const o = dot(sub(p, c.o), c.e[i]!),
      v = dot(d, c.e[i]!),
      m = c.meias[i]! * k;
    if (Math.abs(v) < 1e-9) {
      if (Math.abs(o) >= m) return false;
      continue;
    }
    const t1 = (-m - o) / v,
      t2 = (m - o) / v;
    lo = Math.max(lo, Math.min(t1, t2));
    hi = Math.min(hi, Math.max(t1, t2));
  }
  return lo < hi;
}
/** Pontos da superfície da caixa virada para quem olha (uma grade de uns 3 cm em cada face visível), um pouco para dentro. */
function faceDaCaixa(c: NonNullable<ParteDaPeca['caixa']>, para: V3): V3[] {
  const out: V3[] = [];
  for (let i = 0; i < 3; i++) {
    const s = Math.sign(dot(c.e[i]!, para));
    if (!s) continue;
    const [j, k] = [(i + 1) % 3, (i + 2) % 3];
    const nj = Math.max(1, Math.ceil(c.meias[j]! / 3)),
      nk = Math.max(1, Math.ceil(c.meias[k]! / 3));
    for (let a = -nj; a <= nj; a++)
      for (let b = -nk; b <= nk; b++) out.push(comb([1, c.o], [s * c.meias[i]! * 0.98, c.e[i]!], [(a / nj) * c.meias[j]! * 0.9, c.e[j]!], [(b / nk) * c.meias[k]! * 0.9, c.e[k]!]));
  }
  return out;
}
/**
 * As partes de um halter, na ordem em que o desenho realista as pinta (../equipamento.ts): o cabo e as duas cabeças
 * (a do lado de −eixo e a do lado de +eixo).
 */
export function partesDoHalter(p: Extract<Peca, { t: 'halter' }>): ParteDaPeca[] {
  const o = p.objeto ?? 'halter',
    u = norm(p.eixo),
    comp = obj(o, 'comp'),
    cabo = obj(o, 'caboComp');
  const P = (d: number) => add(p.centro, mul(u, d));
  return [
    { eixo: [P(-cabo / 2), P(cabo / 2)], raio: obj(o, 'caboDiam') / 2, itens: [0] },
    { eixo: [P(-cabo / 2), P(-comp / 2)], raio: obj(o, 'cabecaLargura') / 2, itens: [1] },
    { eixo: [P(cabo / 2), P(comp / 2)], raio: obj(o, 'cabecaLargura') / 2, itens: [2] },
  ];
}
/** Um trecho de um volume do corpo (entre dois anéis), com a esfera que o contém (para descartar raios longe dele). */
interface Trecho {
  A: Anel;
  B: Anel;
  c: V3;
  R: number;
}
const trechos = (aneis: Anel[]): Trecho[] =>
  aneis.slice(1).map((B, i) => {
    const A = aneis[i]!;
    return { A, B, c: mul(add(A.c, B.c), 0.5), R: Math.hypot(...sub(B.c, A.c)) / 2 + Math.max(A.a, A.f, A.b, B.a, B.f, B.b) };
  });
/** O ponto está dentro do trecho (encolhido `k` vezes)? */
function noTrecho(T: Trecho, p: V3, k: number): boolean {
  const { A, B } = T;
  const d = sub(B.c, A.c),
    L2 = dot(d, d);
  if (L2 < 1e-6) return false;
  const t = dot(sub(p, A.c), d) / L2;
  if (t < 0 || t > 1) return false;
  const c = add(A.c, mul(d, t));
  const a = (A.a + (B.a - A.a) * t) * k,
    f = (A.f + (B.f - A.f) * t) * k,
    b = (A.b + (B.b - A.b) * t) * k;
  const r = sub(p, c),
    u = dot(r, A.x),
    v = dot(r, A.z);
  return (u / a) ** 2 + (v / (v >= 0 ? f : b)) ** 2 < 1;
}
/** O raio que sai de `p` na direção `d` (unitária), adiante de `t0`, atravessa algum dos trechos (encolhidos `k` vezes)? Anda de meio em meio centímetro só onde passa pela esfera de cada trecho. */
function raioNoCorpo(ts: Trecho[], p: V3, d: V3, k: number, t0: number): boolean {
  for (const T of ts) {
    const w = sub(T.c, p),
      tc = dot(w, d),
      d2 = dot(w, w) - tc * tc;
    if (d2 > T.R * T.R || tc + T.R < t0) continue;
    const meia = Math.sqrt(T.R * T.R - d2);
    for (let t = Math.max(t0, tc - meia); t <= tc + meia; t += 0.5) if (noTrecho(T, add(p, mul(d, t)), k)) return true;
  }
  return false;
}
/** A distância (na tela) de um ponto à linha do eixo, e a profundidade do eixo ali. */
function noEixo(cam: (typeof VISTAS)[IdVista], eixo: V3[], s: [number, number]): { dist: number; prof: number } {
  if (eixo.length === 1) return { dist: Math.hypot(naTela(cam, eixo[0]!)[0] - s[0], naTela(cam, eixo[0]!)[1] - s[1]), prof: dot(eixo[0]!, cam.para) };
  let m = { dist: 1e9, prof: 0 };
  for (let i = 1; i < eixo.length; i++) {
    const a = eixo[i - 1]!,
      b = eixo[i]!;
    const A = naTela(cam, a),
      B = naTela(cam, b);
    const dx = B[0] - A[0],
      dy = B[1] - A[1],
      L2 = dx * dx + dy * dy;
    const t = L2 < 1e-9 ? 0 : Math.max(0, Math.min(1, ((s[0] - A[0]) * dx + (s[1] - A[1]) * dy) / L2));
    const dd = Math.hypot(A[0] + dx * t - s[0], A[1] + dy * t - s[1]);
    if (dd < m.dist) m = { dist: dd, prof: dot(add(a, mul(sub(b, a), t)), cam.para) };
  }
  return m;
}
/**
 * O que fica na frente: os pontos contados de cada lado (até `CONTA`) e o que conta (a partir de `MINIMO` pontos; se
 * os dois lados passam do mínimo, o que tem mais pontos).
 */
export interface Verdade {
  cobre: boolean;
  coberto: boolean;
  nCobre: number;
  nCoberto: number;
}
/**
 * Quantos pontos (raios) contam como "se cruzam": menos que isso é a borda de uma parte que encosta na outra (o ombro
 * que passa um centímetro sob a beira do banco), que não aparece no desenho.
 */
const MINIMO = 4;
const CONTA = 150;
/**
 * Para cada grupo do Boneco (os dois lados), o que fica na frente de verdade, medido por raios até quem olha:
 *  - `cobre`: o grupo esconde a peça (o raio de um ponto do eixo da peça até quem olha atravessa o grupo, encolhido a
 *    85% para não contar a borda);
 *  - `coberto`: a peça esconde o grupo (um ponto da pele do grupo virado para quem olha, a 85% do raio, fica atrás do
 *    eixo da peça, na mesma posição da tela, a menos de 85% do raio da peça).
 * Conta só a partir de `MINIMO` pontos. Só a geometria: não olha a ordem de pintura. `fora`: as partes do corpo que não contam (a mão que segura a peça
 * fecha em volta dela: fica na frente e atrás ao mesmo tempo).
 */
export function quemFicaNaFrente(q: Quadro, vista: IdVista, partes: ParteDaPeca[], fora: string[] = []): Partial<Record<Grupo, Verdade>> {
  const cam = VISTAS[vista];
  const out: Partial<Record<Grupo, Verdade>> = {};
  const grupos = formaDoBoneco(q.esq).grupos;
  for (const g0 of grupos) {
    const id = g0.id as Grupo;
    if (!GRUPOS.includes(id)) continue;
    const g = { ...g0, volumes: g0.volumes.filter((v) => !fora.includes(v.nome ?? '')) };
    const ts = g.volumes.flatMap((v) => trechos(v.vol.aneis));
    // a pele que fica dentro de outra parte do corpo (a raiz do braço dentro do ombro) não aparece: não conta
    const outros = grupos.filter((x) => x !== g0).flatMap((x) => x.volumes.flatMap((v) => trechos(v.vol.aneis)));
    const dentroDeOutra = (p: V3) => outros.some((T) => dot(sub(p, T.c), sub(p, T.c)) < T.R * T.R && noTrecho(T, p, 1));
    const r = (out[id] ??= { cobre: false, coberto: false, nCobre: 0, nCoberto: 0 });
    // a peça atrás do grupo: um raio de cada ponto do eixo da peça (de 1 em 1 cm) até quem olha
    for (const pa of partes) {
      const pts: V3[] = pa.caixa ? faceDaCaixa(pa.caixa, cam.para) : [];
      if (!pa.caixa)
        for (let i = 0; i < pa.eixo.length; i++) {
          if (i === 0) pts.push(pa.eixo[0]!);
          else {
            const a = pa.eixo[i - 1]!,
              b = pa.eixo[i]!;
            const n = Math.max(1, Math.ceil(Math.hypot(...sub(b, a))));
            for (let k = 1; k <= n; k++) pts.push(add(a, mul(sub(b, a), k / n)));
          }
        }
      for (const p of pts) {
        if (r.nCobre >= CONTA) break;
        if (raioNoCorpo(ts, p, cam.para, 0.85, pa.caixa ? 0.5 : pa.raio)) r.nCobre++;
      }
    }
    // o grupo atrás da peça: cada ponto da pele virado para quem olha
    for (const v of g.volumes) {
      if (r.nCoberto >= CONTA) break;
      for (const an of v.vol.aneis) {
        if (r.nCoberto >= CONTA) break;
        for (let i = 0; i < 24; i++) {
          const th = (i * Math.PI) / 12,
            sn = Math.sin(th),
            rr = sn >= 0 ? an.f : an.b;
          const n = comb([Math.cos(th) / an.a, an.x], [sn / rr, an.z]);
          if (dot(n, cam.para) <= 0) continue;
          const p = comb([1, an.c], [an.a * 0.85 * Math.cos(th), an.x], [rr * 0.85 * sn, an.z]);
          if (dentroDeOutra(p)) continue;
          const s = naTela(cam, p);
          const atras = partes.some((pa) => {
            // o raio da pele até quem olha atravessa a caixa (encolhida a 95%, para não contar o encosto); a pele que
            // já está dentro dela (o corpo que afunda no estofado) não aparece em ordem nenhuma e não conta
            if (pa.caixa) return !pa.caixa.e.every((e, i) => Math.abs(dot(sub(p, pa.caixa!.o), e)) < pa.caixa!.meias[i]!) && raioNaCaixa(pa.caixa, p, cam.para, 0.95, 0.3);
            const e = noEixo(cam, pa.eixo, s);
            return e.dist < pa.raio * 0.85 && e.prof > dot(p, cam.para);
          });
          if (atras) r.nCoberto++;
        }
      }
    }
    // quando o grupo esconde a peça num lugar e é escondido por ela em outro (o braço que passa pela beira do banco), o
    // pintor só acerta um dos dois: vale o que tem mais pontos
    r.cobre = r.nCobre >= MINIMO && r.nCobre >= r.nCoberto;
    r.coberto = r.nCoberto >= MINIMO && r.nCoberto > r.nCobre;
  }
  return out;
}

/**
 * A conferência de pintura de uma peça contra o Boneco, numa vista: para cada grupo (os dois lados) que esconde uma
 * parte da peça, quanto ele é pintado depois do último item que pinta essa parte (`naFrente`, cm, positivo = certo);
 * para cada grupo que uma parte esconde, quanto ele é pintado antes do primeiro (`atras`, cm, positivo = certo); o pior
 * das partes. `fora`: as partes do corpo que não contam.
 */
export function pinturaContraAPeca(q: Quadro, vista: IdVista, peca: Peca, partes: ParteDaPeca[], fora: string[] = []): Partial<Record<Grupo, { naFrente?: number; atras?: number }>> {
  const pintura = pinturaDoBoneco(q, vista);
  const todos = pinturaDaPeca(peca, vista);
  const out: Partial<Record<Grupo, { naFrente?: number; atras?: number }>> = {};
  for (const pa of partes) {
    const itens = pa.itens ? pa.itens.map((i) => todos[i]!) : todos;
    const verdade = quemFicaNaFrente(q, vista, [pa], fora);
    for (const g of GRUPOS) {
      const v = verdade[g],
        d = pintura[g];
      if (!v || d === undefined) continue;
      const y = (out[g] ??= {});
      if (v.cobre) y.naFrente = Math.min(y.naFrente ?? 1e9, d - Math.max(...itens));
      if (v.coberto) y.atras = Math.min(y.atras ?? 1e9, Math.min(...itens) - d);
    }
  }
  return out;
}

/**
 * Uma regra de pintura de uma peça contra o Boneco: em cada vista do guia, a cada 3 quadros do movimento certo e em
 * cada erro (no começo, no meio e no fim, na vista dele), cada grupo do Boneco (os dois lados) que esconde as partes
 * medidas da peça tem de ser pintado depois dos itens que as desenham, e cada grupo que elas escondem, antes. O
 * relatório dá, por vista e por grupo, a menor folga de pintura (cm de profundidade; negativo = pintado na ordem
 * errada): "na frente" para o grupo que esconde a peça, "atrás" para o que ela esconde; os grupos que nunca se cruzam
 * com a peça na tela ficam de fora.
 */
export function regraDePintura(o: {
  exercicio: () => Exercicio;
  /** As peças num quadro e as partes medidas de cada uma (cada parte com os itens da peça que a pintam). */
  peca: (q: Quadro) => { peca: Peca; partes: ParteDaPeca[] }[];
  /** O nome da peça no relatório ("a barra", "o kettlebell"). */
  nome: string;
  /** As partes do corpo que não contam (a mão que segura a peça). */
  fora?: string[];
}): Regra {
  return (q, corpo) => {
    const ex = o.exercicio();
    const amostra: { x: Quadro; vista?: IdVista }[] = q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map((x) => ({ x }));
    for (const e of ex.ficha.erros) for (const u of [0, 0.5, 1]) amostra.push({ x: ex.quadro(corpo, u, e.id), vista: e.vista as IdVista });
    let ok = true;
    const porVista: string[] = [];
    for (const vista of vistasDoGuia(ex)) {
      const pior: Partial<Record<Grupo, { naFrente?: number; atras?: number }>> = {};
      for (const { x, vista: v } of amostra) {
        if (v && v !== vista) continue;
        for (const p of o.peca(x)) {
          const r = pinturaContraAPeca(x, vista, p.peca, p.partes, o.fora);
          for (const g of GRUPOS) {
            const m = r[g];
            if (!m) continue;
            const y = (pior[g] ??= {});
            if (m.naFrente !== undefined) y.naFrente = Math.min(y.naFrente ?? 1e9, m.naFrente);
            if (m.atras !== undefined) y.atras = Math.min(y.atras ?? 1e9, m.atras);
          }
        }
      }
      const txt: string[] = [];
      for (const g of GRUPOS) {
        const y = pior[g];
        if (!y) continue;
        // o item de cenário fica atrás do corpo inteiro: a folga é infinita (para o bem ou para o mal)
        const folga = (n: number) => (n > 1e5 ? 'sem limite (a peça é cenário)' : n < -1e5 ? 'nenhuma (a peça é cenário, pintada atrás do corpo inteiro)' : f1(n));
        if (y.naFrente !== undefined) txt.push(`${NOME_DO_GRUPO[g]} na frente ${folga(y.naFrente)}`);
        if (y.atras !== undefined) txt.push(`${NOME_DO_GRUPO[g]} atrás ${folga(y.atras)}`);
        ok &&= (y.naFrente ?? 1) > 0 && (y.atras ?? 1) > 0;
      }
      porVista.push(`${vista}: ${txt.length ? txt.join(', ') : 'nada se cruza com a peça na tela'}`);
    }
    return {
      medido: `a folga de pintura de cada parte do corpo que se cruza com ${o.nome} na tela, no pior quadro (cm de profundidade; negativo = pintada na ordem errada; "na frente" = a parte esconde ${o.nome}, "atrás" = ${o.nome} esconde a parte): ${porVista.join('; ')}`,
      ok,
    };
  };
}

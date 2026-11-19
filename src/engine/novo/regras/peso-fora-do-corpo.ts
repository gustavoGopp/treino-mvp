// Regra comum `peso-fora-do-corpo` (19/11/2026): o peso livre (as cabeças do halter, a bola do kettlebell, as anilhas e
// a barra) não entra no corpo, em nenhum quadro do ciclo nem dos erros. Nasceu do aviso do Gustavo na remada unilateral
// sem banco ("o halter tá ficando errado pensando realisticamente, ele tá puxando pra dentro do próprio corpo"). Medido
// assim, nas remadas sem banco o halter e o kettlebell não entravam no corpo (no fim da puxada, a cabeça do halter ficava
// a 4,9 cm da pele): o defeito era o lugar em que a puxada terminava, embaixo da barriga, e a ordem de pintura de três
// quartos (./remadas.ts, `remada-sem-banco-carga-ao-lado-do-quadril` e `remada-carga-pintada-no-lugar`). A regra pegou,
// na remada curvada com halteres, a cabeça do halter 2,2 cm dentro do antebraço no erro "puxar só com os braços", que a
// regra de antes (`carga-livre-do-corpo-e-do-banco`) não via: ela media só o ciclo, e os 12 pontos de cada anel da pele
// contra a carga tomada como um cilindro.
//
// Aqui a conta é ao contrário e na superfície de verdade: muitos pontos da superfície do peso (as faces e as arestas do
// prisma, a casca da esfera, a casca dos volumes) contra o volume do corpo, anel por anel, com o anel interpolado entre os
// dois vizinhos no ponto em que o peso está. Um ponto do peso entra no corpo quando fica dentro da elipse do anel; quanto
// entra é a distância dele até a borda dessa elipse. Conta todo o corpo (tronco, bacia, coxas, canelas, braços, mãos e
// cabeça), menos as mãos que seguram o peso (o centro da mão a até 10 cm dele).
//
// Tolerância: 0,5 cm (o amassado da pele e da borracha; a mesma folga mínima que o núcleo das remadas guarda,
// `folgaDaCarga`). Selo: desenho; a ficha da técnica pede o peso ao lado do corpo, nunca dentro dele.
import { formaDoBoneco } from '../boneco';
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Anel } from '../corpo3d';
import type { Prim } from '../desenho';
import { LADOS } from '../esqueleto';
import type { Lado } from '../esqueleto';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { add, comb, cross, dist, dot, lerp, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

/** Quanto o peso pode entrar na pele (cm). */
export const TOLERANCIA_DO_PESO = 0.5;

type PrimPeso = Extract<Prim, { t: 'prisma' }> | Extract<Prim, { t: 'esfera' }> | Extract<Prim, { t: 'volume' }>;

/**
 * Os volumes de peso livre de um quadro: as cabeças do halter (prismas de ferro), a bola do kettlebell (esfera de
 * ferro), as anilhas (volumes de ferro) e, quando o quadro tem uma barra com carga (marca `barra`), a barra (volumes de
 * aço). As caixas de ferro são a pilha da coluna de polia, e não contam.
 */
export function pesosDoQuadro(q: Quadro): { prim: PrimPeso; nome: string }[] {
  const out: { prim: PrimPeso; nome: string }[] = [];
  const comBarra = !!q.marcas.barra && q.cargas.length > 0;
  for (const p of q.prims) {
    if (p.t === 'prisma' && p.cls === 'ferro') out.push({ prim: p, nome: 'cabeça do halter' });
    else if (p.t === 'esfera' && p.cls === 'ferro') out.push({ prim: p, nome: 'bola do kettlebell' });
    else if (p.t === 'volume' && p.cls === 'ferro') out.push({ prim: p, nome: 'anilha' });
    else if (p.t === 'volume' && p.cls === 'aco' && comBarra) out.push({ prim: p, nome: 'barra' });
  }
  return out;
}

/** Pontos da superfície de um peso (faces, arestas e casca), a cada ~1 cm. */
export function pontosDoPeso(p: PrimPeso): V3[] {
  const out: V3[] = [];
  if (p.t === 'prisma') {
    // o mesmo prisma que o desenho faz (../desenho.ts): os cantos na elipse de meias-medidas ra e rb
    const n = p.lados;
    const canto = (c: V3, i: number): V3 => {
      const th = (2 * Math.PI * i) / n;
      return comb([1, c], [p.ra * Math.cos(th), p.x], [(p.rb / Math.sin(Math.PI / 2 - Math.PI / n)) * Math.sin(th) * Math.cos(Math.PI / n), p.z]);
    };
    const comp = dist(p.a, p.b);
    const nAx = Math.max(2, Math.ceil(comp));
    const lado = dist(canto(p.a, 0), canto(p.a, 1));
    const nLado = Math.max(2, Math.ceil(lado));
    for (let i = 0; i < n; i++)
      for (let j = 0; j < nLado; j++) {
        const s = j / nLado;
        for (let k = 0; k <= nAx; k++) {
          const c = lerp(p.a, p.b, k / nAx);
          out.push(lerp(canto(c, i), canto(c, (i + 1) % n), s));
        }
      }
    // as duas tampas: anéis concêntricos
    const nR = Math.max(2, Math.ceil(Math.max(p.ra, p.rb)));
    for (const c of [p.a, p.b]) {
      out.push(c);
      for (let r = 1; r < nR; r++)
        for (let i = 0; i < n; i++) for (let j = 0; j < nLado; j++) out.push(lerp(c, lerp(canto(c, i), canto(c, (i + 1) % n), j / nLado), r / nR));
    }
    return out;
  }
  if (p.t === 'esfera') {
    // pontos espalhados por igual na esfera (espiral de Fibonacci), um a cada ~1 cm²
    const N = Math.max(60, Math.ceil(4 * Math.PI * p.r * p.r));
    const ouro = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (2 * (i + 0.5)) / N,
        r = Math.sqrt(1 - y * y),
        th = ouro * i;
      out.push(add(p.c, mul([r * Math.cos(th), y, r * Math.sin(th)], p.r)));
    }
    return out;
  }
  // volume: a casca entre os anéis (interpolada a cada ~1 cm) e as duas tampas
  const A = p.vol.aneis;
  const naElipse = (a: Anel, th: number): V3 => comb([1, a.c], [a.a * Math.cos(th), a.x], [(Math.sin(th) >= 0 ? a.f : a.b) * Math.sin(th), a.z]);
  const anelEm = (a0: Anel, a1: Anel, w: number): Anel => ({ c: lerp(a0.c, a1.c, w), x: norm(lerp(a0.x, a1.x, w)), z: norm(lerp(a0.z, a1.z, w)), a: a0.a + (a1.a - a0.a) * w, f: a0.f + (a1.f - a0.f) * w, b: a0.b + (a1.b - a0.b) * w });
  const nTh = (a: Anel) => Math.max(12, Math.ceil(2 * Math.PI * Math.max(a.a, a.f, a.b)));
  for (let i = 0; i + 1 < A.length; i++) {
    const a0 = A[i]!,
      a1 = A[i + 1]!;
    const nAx = Math.max(1, Math.ceil(dist(a0.c, a1.c)));
    for (let k = 0; k <= nAx; k++) {
      const a = anelEm(a0, a1, k / nAx);
      const m = nTh(a);
      for (let j = 0; j < m; j++) out.push(naElipse(a, (2 * Math.PI * j) / m));
    }
  }
  for (const a of [A[0]!, A[A.length - 1]!]) {
    const nR = Math.max(2, Math.ceil(Math.max(a.a, a.f, a.b)));
    const m = nTh(a);
    out.push(a.c);
    for (let r = 1; r < nR; r++) for (let j = 0; j < m; j++) out.push(lerp(a.c, naElipse(a, (2 * Math.PI * j) / m), r / nR));
  }
  return out;
}

/** Um trecho do corpo entre dois anéis vizinhos de um volume, pronto para medir. */
interface Trecho {
  a0: Anel;
  a1: Anel;
  d: V3;
  d2: number;
  /** Centro e raio de uma esfera que contém o trecho (para descartar de saída os pontos longe). */
  c: V3;
  raio: number;
  parte: string;
}
/** Os trechos da superfície do corpo, menos as mãos que seguram (`semMao`). */
function trechosDoCorpo(q: Quadro, semMao: Set<Lado>): Trecho[] {
  const out: Trecho[] = [];
  for (const g of formaDoBoneco(q.esq).grupos)
    for (const v of g.volumes) {
      const nome = v.nome ?? g.id;
      if ((nome === 'mao' || nome === 'polegar') && g.lado && semMao.has(g.lado)) continue;
      const A = v.vol.aneis;
      for (let i = 0; i + 1 < A.length; i++) {
        const a0 = A[i]!,
          a1 = A[i + 1]!;
        const d = sub(a1.c, a0.c);
        const r = Math.max(a0.a, a0.f, a0.b, a1.a, a1.f, a1.b);
        out.push({ a0, a1, d, d2: dot(d, d), c: lerp(a0.c, a1.c, 0.5), raio: r + Math.sqrt(dot(d, d)) / 2, parte: `${nome}${g.lado ? `:${g.lado}` : ''}` });
      }
    }
  return out;
}
// a borda da elipse, em 72 pontos (o erro da corda fica abaixo de 0,02 cm)
const ANG = Array.from({ length: 72 }, (_, i) => (2 * Math.PI * i) / 72);
/** Quanto o ponto `p` entra no trecho (cm; 0 = fora). */
function entraNoTrecho(p: V3, t: Trecho): number {
  if (dist(p, t.c) > t.raio) return 0;
  const w = t.d2 > 1e-9 ? dot(sub(p, t.a0.c), t.d) / t.d2 : 0;
  if (w < 0 || w > 1) return 0;
  const { a0, a1 } = t;
  const c = lerp(a0.c, a1.c, w);
  let x = norm(lerp(a0.x, a1.x, w));
  // o eixo da largura e o de frente-trás atravessados ao trecho (os anéis vizinhos podem girar um pouco)
  const z0 = norm(lerp(a0.z, a1.z, w));
  const ax = norm(cross(x, z0));
  x = norm(sub(x, mul(ax, dot(x, ax))));
  const z = norm(cross(ax, x));
  const sz = dot(z, z0) >= 0 ? 1 : -1;
  const a = a0.a + (a1.a - a0.a) * w,
    f = a0.f + (a1.f - a0.f) * w,
    b = a0.b + (a1.b - a0.b) * w;
  const r = sub(p, c);
  const lx = dot(r, x),
    lz = dot(r, z) * sz;
  const rz = lz >= 0 ? f : b;
  if ((lx / a) ** 2 + (lz / rz) ** 2 >= 1) return 0;
  let m = 1e9;
  for (const th of ANG) {
    const s = Math.sin(th);
    m = Math.min(m, Math.hypot(lx - a * Math.cos(th), lz - (s >= 0 ? f : b) * s));
  }
  return m;
}

/**
 * As mãos que seguram algum peso: o centro da mão a até 10 cm da superfície dele (no halter, a mão fecha no cabo, a
 * 6,5 cm de cada cabeça; no tríceps francês e na panturrilha sentada, as palmas abertas seguram a cabeça).
 */
function maosQueSeguram(q: Quadro, pontos: V3[][]): Set<Lado> {
  const out = new Set<Lado>();
  for (const k of LADOS) {
    const L = q.esq.lado[k];
    if (pontos.some((P) => P.some((p) => dist(p, L.pegada) <= 10))) out.add(k);
  }
  return out;
}

export interface PesoNoCorpo {
  /** Quanto o peso entra no corpo (cm; 0 = não entra). */
  cm: number;
  /** Em que parte do corpo (`tronco`, `coxa:L`, `ante:R`...). */
  parte: string;
  /** Que peso (`cabeça do halter`, `bola do kettlebell`, `anilha`, `barra`). */
  peso: string;
  /** O ponto do peso que mais entra. */
  ponto?: V3;
}
/** Quanto os pesos de um quadro entram no corpo (o pior ponto). */
export function pesoNoCorpo(q: Quadro): PesoNoCorpo {
  const pesos = pesosDoQuadro(q);
  if (!pesos.length) return { cm: 0, parte: '', peso: '' };
  const pontos = pesos.map((x) => pontosDoPeso(x.prim));
  const trechos = trechosDoCorpo(q, maosQueSeguram(q, pontos));
  const pior: PesoNoCorpo = { cm: 0, parte: '', peso: '' };
  pesos.forEach((x, i) => {
    for (const p of pontos[i]!)
      for (const t of trechos) {
        const e = entraNoTrecho(p, t);
        if (e > pior.cm) Object.assign(pior, { cm: e, parte: t.parte, peso: x.nome, ponto: p });
      }
  });
  return pior;
}

/** Os casos que a regra mede: os quadros do ciclo que a conferência passa e cada erro em 9 instantes (0 a 1). */
export function casosDoPeso(q: Quadro[], corpo: Corpo, ex?: Exercicio): { onde: string; u: number; q: Quadro }[] {
  const casos: { onde: string; u: number; q: Quadro }[] = q.map((x, i) => ({ onde: 'ciclo', u: q.length > 1 ? i / (q.length - 1) : 0, q: x }));
  if (ex) for (const er of ex.ficha.erros) for (let i = 0; i <= 8; i++) casos.push({ onde: er.titulo, u: i / 8, q: ex.quadro(corpo, i / 8, er.id) });
  return casos;
}

export const REGRAS_PESO_FORA_DO_CORPO: Record<string, Regra> = {
  'peso-fora-do-corpo': (q, corpo, ex) => {
    let pior: PesoNoCorpo & { onde: string } = { cm: 0, parte: '', peso: '', onde: '' };
    let n = 0;
    for (const c of casosDoPeso(q, corpo, ex)) {
      const m = pesoNoCorpo(c.q);
      n++;
      if (m.cm > pior.cm) pior = { ...m, onde: c.onde === 'ciclo' ? 'no ciclo' : `no erro "${c.onde}"` };
    }
    return {
      medido: pior.cm > 0 ? `em ${n} quadros (ciclo e erros), a ${pior.peso} entra no máximo ${f1(pior.cm)} cm no corpo (${pior.parte}, ${pior.onde}); tolerância ${f1(TOLERANCIA_DO_PESO)} cm` : `em ${n} quadros (ciclo e erros), o peso não entra no corpo`,
      ok: pior.cm <= TOLERANCIA_DO_PESO,
    };
  },
};

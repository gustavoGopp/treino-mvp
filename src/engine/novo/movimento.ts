// Motor novo: o tempo e o equilíbrio. Fases do ciclo, o perfil de velocidade de cada fase e o centro de massa.
import { z } from 'zod';
import type { Prim } from './desenho';
import type { Esq, Lado } from './esqueleto';
import type { Corpo } from './tabelas';
import { SEGMENTOS } from './tabelas';
import { add, lerp, mul, noRef } from './vec';
import type { V3 } from './vec';

/* ============================== ficha do movimento ============================== */
const SELO = z.enum(['robusta', 'moderada', 'um estudo', 'consenso', 'desenho']);
const linha = z.object({ v: z.number(), un: z.string().min(1), selo: SELO, fonte: z.string().min(1), o: z.string().min(1) });
const fase = z.object({ nome: z.string(), tipo: z.enum(['pausa', 'exc', 'conc']), dur: z.number().positive(), de: z.number(), ate: z.number(), respira: z.string(), tempo: z.string(), selo: SELO, fonte: z.string().min(1) });
export const fichaSchema = z.object({
  id: z.string(),
  nome: z.string(),
  /** A ficha da técnica de onde as linhas saem. */
  fichaDaTecnica: z.string(),
  fontes: z.record(z.string()),
  /** Ângulos, distâncias e cargas da posição inicial e da final, cada um com selo e fonte. */
  param: z.record(linha),
  fases: z.array(fase).min(2),
  /** Pontos de contato que não podem sair do lugar no ciclo (ex.: "pe.R", "mao.L", "joelho.R"). */
  contatos: z.array(z.string()),
  /** O que a ficha da técnica pede e a conferência mede: [regra, valor medido esperado]. */
  regras: z.array(z.object({ id: z.string(), pede: z.string(), selo: SELO, fonte: z.string() })),
  erros: z.array(z.object({ id: z.string(), titulo: z.string(), vista: z.string(), oQueMuda: z.string() })),
  simetrico: z.boolean(),
});
export type Ficha = z.infer<typeof fichaSchema>;
export type Fase = Ficha['fases'][number];

/** Valor de uma linha da ficha (erro se não existir: nenhum ângulo solto no código da animação). */
export const daFicha = (f: Ficha) => (id: string) => {
  const x = f.param[id];
  if (!x) throw new Error(`a ficha ${f.id} não tem a linha "${id}"`);
  return x.v;
};

/* ============================== tempo ============================== */
/**
 * Perfil de "mínimo solavanco" (Flash & Hogan 1985): parte e chega com velocidade e aceleração zero, e a velocidade
 * faz um sino. É o que evita o movimento de robô (velocidade constante) e o tranco nas pontas.
 */
export const suave = (x: number) => x * x * x * (10 - 15 * x + 6 * x * x);
export const duracao = (fases: Fase[]) => fases.reduce((s, f) => s + f.dur, 0);
/** Em que fase o instante t (s) cai e quanto vale o parâmetro do movimento (0 = posição inicial, 1 = final). */
export function instante(fases: Fase[], t: number): { u: number; fase: Fase; i: number; tau: number } {
  const T = duracao(fases);
  let x = ((t % T) + T) % T;
  for (let i = 0; i < fases.length; i++) {
    const f = fases[i]!;
    if (x < f.dur || i === fases.length - 1) {
      const tau = Math.min(1, x / f.dur);
      return { u: f.tipo === 'pausa' ? f.de : f.de + (f.ate - f.de) * suave(tau), fase: f, i, tau };
    }
    x -= f.dur;
  }
  throw new Error('fases vazias');
}

/* ============================== um quadro ============================== */
export interface Quadro {
  esq: Esq;
  /** Objetos da cena neste instante. */
  prims: Prim[];
  /** Cabos, elásticos e fitas: comprimento neste instante (cm) e se podem mudar. */
  fios: { id: string; comp: number; estica: boolean }[];
  /** Cargas presas ao corpo (kg e posição), para o equilíbrio. */
  cargas: { massa: number; pos: V3 }[];
  /** Pontos do objeto que a conferência acompanha (ex.: centro do halter), para a trajetória. */
  marcas: Record<string, V3>;
  /** Partes que precisam ir para a frente ou para trás na pintura (ex.: a mão por cima do halter). */
  vies?: Record<string, number>;
}
export interface Exercicio {
  ficha: Ficha;
  vistas: string[];
  /** O quadro do movimento certo (erro ausente) ou de um erro, com o parâmetro u entre 0 e 1. */
  quadro(corpo: Corpo, u: number, erro?: string): Quadro;
  /**
   * Quem trabalha, nos grupos musculares do desenho: 'p' principal, 's' secundário, 'a' só ajuda. `dorsal:R` = só o
   * lado direito. É a mesma lista que o guia de hoje desenha (src/engine/estilo/musculos.ts); este motor não decide músculo.
   */
  papeis: Record<string, 'p' | 's' | 'a'>;
  /** Trajetórias do modo Trajetória: nome do ponto → função que o lê no quadro. */
  trajetorias: Record<string, (q: Quadro) => V3>;
}

/* ============================== centro de massa ============================== */
export function centroDeMassa(e: Esq, sexo: 'homem' | 'mulher', cargas: Quadro['cargas'] = [], massaDoCorpo = 70.9): V3 {
  const S = SEGMENTOS[sexo];
  let soma: V3 = [0, 0, 0],
    total = 0;
  const junta = (id: string, a: V3, b: V3) => {
    const s = S[id]!;
    soma = add(soma, mul(lerp(a, b, s.cm), s.massa));
    total += s.massa;
  };
  const c = e.corpo;
  const topo = noRef(e.cabeca, [0, c.m('cabeca.tragionAoTopo'), 0.6]),
    mand = noRef(e.cabeca, [0, c.m('cabeca.tragionAoTopo') - c.m('cabeca.altura') + 3, 2]);
  junta('cabeca', topo, mand);
  const supra = noRef(e.torax, [0, c.m('altura.supraesternal') - c.m('altura.cervical'), c.m('prof.peito') * 0.5]);
  junta('tronco', supra, e.pelve.o);
  for (const k of ['R', 'L'] as Lado[]) {
    const L = e.lado[k];
    junta('braco', L.ombro, L.cotovelo);
    junta('antebraco', L.cotovelo, L.punho);
    junta('mao', L.punho, L.pegada);
    junta('coxa', L.quadril, L.joelho);
    junta('perna', L.joelho, L.tornozelo);
    junta('pe', L.calcanhar, L.ponta);
  }
  for (const g of cargas) {
    soma = add(soma, mul(g.pos, g.massa / massaDoCorpo));
    total += g.massa / massaDoCorpo;
  }
  return mul(soma, 1 / total);
}

/** Resolve duas incógnitas por Newton com derivada numérica (determinístico: mesmo chute, mesmas iterações). */
export function resolver2(f: (a: number, b: number) => [number, number], a0: number, b0: number, passos = 12): [number, number] {
  let a = a0,
    b = b0;
  const h = 0.05;
  for (let i = 0; i < passos; i++) {
    const [f0, g0] = f(a, b);
    if (Math.abs(f0) + Math.abs(g0) < 1e-4) break;
    const [fa, ga] = f(a + h, b),
      [fb, gb] = f(a, b + h);
    const j11 = (fa - f0) / h,
      j12 = (fb - f0) / h,
      j21 = (ga - g0) / h,
      j22 = (gb - g0) / h;
    const det = j11 * j22 - j12 * j21;
    if (Math.abs(det) < 1e-9) break;
    const da = (-f0 * j22 + g0 * j12) / det,
      db = (-g0 * j11 + f0 * j21) / det;
    const k = Math.min(1, 12 / (Math.abs(da) + Math.abs(db) + 1e-9));
    a += da * k;
    b += db * k;
  }
  return [a, b];
}
/** Resolve uma incógnita por bisseção (f crescente ou decrescente entre a e b). */
export function resolver1(f: (x: number) => number, a: number, b: number, passos = 40): number {
  let fa = f(a);
  for (let i = 0; i < passos; i++) {
    const m = (a + b) / 2,
      fm = f(m);
    if ((fa < 0) === (fm < 0)) {
      a = m;
      fa = fm;
    } else b = m;
  }
  return (a + b) / 2;
}

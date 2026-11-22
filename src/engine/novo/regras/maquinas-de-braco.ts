// Regras medidas das máquinas de braço (a rosca na máquina e o tríceps na máquina, ../exercicios/maquina-de-braco.ts).
// As marcas que o quadro dá: `eixo` (um ponto do eixo da alavanca, que corre ao longo de x), `pegadorR` e `pegadorL` (o
// centro de cada mão no pegador), `apoioBase`, `apoioSobe`, `apoioNormal` e `apoioMedidas` (a borda de baixo da face do
// apoio dos braços, no meio; a direção que sobe ao longo dela; a normal; [comprimento, meia largura, espessura]),
// `apoioVao` ([meio vão entre as duas metades do apoio, por onde o peito passa, 0, 0]), `tronco` ([inclinação do
// tronco, quanto o ombro sai da face, 0]),
// `assento` ([folga da pele no assento, 0, 0]), `costas` ([folga das costas no apoio da lombar, 0, 0], no tríceps) e
// `regulagem` ([altura do assento, distância do eixo à mão, ângulo inicial]). A pilha que sobe com a alavanca é a
// regra das cadeiras (./cadeiras.ts), com as mesmas marcas `alavanca` e `pilha`; as mãos no pegador, a das máquinas de
// empurrar (./maquinas-de-empurrar.ts). O limite vem do que a ficha pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS } from '../esqueleto';
import type { Lado } from '../esqueleto';
import type { Quadro } from '../movimento';
import { add, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const amostra = (q: Quadro[], cada = 4) => q.filter((_, i) => i % cada === 0 || i === q.length - 1);

/** A distância (cm) do centro do cotovelo à linha do eixo (que corre ao longo de x). */
const doEixo = (x: Quadro, k: Lado) => Math.hypot(x.esq.lado[k].cotovelo[1] - x.marcas.eixo![1], x.esq.lado[k].cotovelo[2] - x.marcas.eixo![2]);

/** Quanto um ponto entra no estofado do apoio dos braços (cm; negativo = fora), com os cantos redondos (duas caixas em cruz). */
function noApoio(x: Quadro, p: V3): number {
  const [comp, meia, esp] = x.marcas.apoioMedidas!;
  const r = sub(p, x.marcas.apoioBase!);
  const ao = dot(r, x.marcas.apoioSobe!),
    h = -dot(r, x.marcas.apoioNormal!),
    lado = Math.min(meia! - Math.abs(p[0]), Math.abs(p[0]) - x.marcas.apoioVao![0]!);
  const rC = Math.min(esp! * 0.45, 4);
  const a = Math.min(ao - rC, comp! - rC - ao, lado, h, esp! - h);
  const b = Math.min(ao, comp! - ao, lado, h - rC, esp! - rC - h);
  return Math.max(a, b);
}
/** Quanto um ponto entra pela face do apoio (cm; positivo = amassa), ou −∞ se ele não fica sobre a face. */
function pelaFace(x: Quadro, p: V3): number {
  const [comp, meia] = x.marcas.apoioMedidas!;
  const r = sub(p, x.marcas.apoioBase!);
  const ao = dot(r, x.marcas.apoioSobe!);
  if (ao < 0 || ao > comp! || Math.abs(p[0]) > meia! || Math.abs(p[0]) < x.marcas.apoioVao![0]!) return -Infinity;
  return -dot(r, x.marcas.apoioNormal!);
}
/** Os pontos da pele do braço de um lado (do ombro ao cotovelo), separados pela distância ao eixo dele. */
function peleDoBraco(x: Quadro, k: Lado, pts = pontosDoBoneco(x.esq)): V3[] {
  const L = x.esq.lado[k];
  const eixo = sub(L.cotovelo, L.ombro),
    comp = Math.hypot(...eixo);
  return pts
    .filter(({ p, parte }) => {
      if (parte !== 'braco') return false;
      const t = dot(sub(p, L.ombro), eixo) / (comp * comp);
      const perto = add(L.ombro, mul(eixo, Math.max(0, Math.min(1, t))));
      return Math.hypot(...sub(p, perto)) < 9;
    })
    .map((y) => y.p);
}
/** O ponto do tríceps de cada lado que mais entra pela face (cm) e o quanto o peito entra no apoio (cm). */
function contatos(x: Quadro) {
  const pts = pontosDoBoneco(x.esq);
  const braco = LADOS.map((k) => Math.max(...peleDoBraco(x, k, pts).map((p) => pelaFace(x, p))));
  let peito = -1e9;
  for (const { p, parte } of pts) if (parte === 'tronco' || parte === 'cintura') peito = Math.max(peito, noApoio(x, p));
  return { braco, peito };
}
/** A distância (cm) de um ponto ao segmento de a até b. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const d = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), d) / dot(d, d)));
  return Math.hypot(...sub(p, add(a, mul(d, t))));
}

export const REGRAS_MAQUINAS_DE_BRACO: Record<string, Regra> = {
  'maquina-de-braco-cotovelo-no-eixo': (q) => {
    const d = Math.max(...q.flatMap((x) => LADOS.map((k) => doEixo(x, k))));
    const x = q[0]!;
    return { medido: `o centro dos dois cotovelos fica a no máximo ${f1(d)} cm do eixo da máquina no ciclo (o assento a ${f1(x.marcas.regulagem![0]!)} cm do chão)`, ok: d <= 0.5 };
  },
  'maquina-de-braco-braco-no-apoio': (q) => {
    // a cada 4 quadros: o tríceps dos dois lados encosta (não descola mais de meio centímetro) e não atravessa o
    // estofado (amassa até 2,5 cm, a tolerância da conferência para o corpo no estofado); o peito encosta no alto do
    // apoio, sem atravessá-lo
    const C = amostra(q).map(contatos);
    const [a, b] = faixa(C.flatMap((c) => c.braco));
    const [p0, p1] = faixa(C.map((c) => c.peito));
    return {
      medido: `o ponto mais fundo do tríceps no estofado fica de ${f1(a)} a ${f1(b)} cm (positivo = amassa), nos dois braços; o peito ${p1 >= 0 ? `amassa de ${f1(Math.max(0, p0))} a ${f1(p1)} cm` : `fica a ${f1(-p1)} cm`} do alto do apoio`,
      ok: a >= -0.5 && b <= 2.5 && p0 >= -1 && p1 <= 2.5,
    };
  },
  'maquina-de-braco-sentado': (q) => {
    const a = faixa(q.map((x) => x.marcas.assento![0]!));
    const anda = Math.max(...q.map((x) => Math.hypot(...sub(x.esq.pelve.o, q[0]!.esq.pelve.o))));
    // a bacia sobre o assento (do fundo à borda da frente)
    const z = q[0]!.esq.pelve.o[2];
    return {
      medido: `o glúteo e a coxa ficam de ${f1(-a[1])} a ${f1(-a[0])} cm dentro do assento (o centro da bacia ${f1(-z)} cm atrás da borda da frente); a bacia anda ${f1(anda)} cm`,
      ok: a[0] >= -2 && a[1] <= 0.3 && anda <= 0.5 && z < -8,
    };
  },
  'maquina-de-braco-pegador-no-arco': (q) => {
    // o pegador (e a mão com ele) fica sempre à mesma distância do eixo: anda num arco em volta dele
    const r = faixa(q.map((x) => Math.hypot(x.marcas.pegadorR![1] - x.marcas.eixo![1], x.marcas.pegadorR![2] - x.marcas.eixo![2])));
    const g = faixa(q.map((x) => x.marcas.alavanca![0]!));
    return { medido: `a mão direita anda num arco de raio ${f1(r[0])} a ${f1(r[1])} cm em volta do eixo, de ${f1(g[0])}° a ${f1(g[1])}° (0° = para baixo, 90° = para a frente)`, ok: r[1] - r[0] <= 0.1 && g[1] - g[0] >= 60 };
  },
  'maquina-de-braco-barra-livre-do-corpo': (q) => {
    // a barra (ou a que junta os pegadores) e o caminho das mãos: a menor distância da pele do rosto, do pescoço e do
    // tronco à linha entre os dois pegadores
    let pior = 1e9,
      onde = '';
    for (const x of amostra(q)) {
      const a = x.marcas.pegadorR!,
        b = x.marcas.pegadorL!;
      const d = norm(sub(b, a));
      const A = sub(a, mul(d, 12)),
        B = add(b, mul(d, 12));
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (!['cabeca', 'pescoco', 'tronco', 'cintura'].includes(parte)) continue;
        const s = aoSegmento(p, A, B);
        if (s < pior) {
          pior = s;
          onde = parte;
        }
      }
    }
    return { medido: `a linha entre os dois pegadores passa a no mínimo ${f1(pior)} cm da pele (${onde})`, ok: pior >= 5 };
  },
  'rosca-maquina-sobe-ate-o-fim': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const ante = norm(sub(L.punho, L.cotovelo));
    const daVertical = Math.acos(Math.max(-1, Math.min(1, ante[1]))) / (Math.PI / 180);
    return { medido: `em cima, o cotovelo dobra ${f1(L.ang.cotovelo)}°, com o antebraço ${f1(daVertical)}° da vertical`, ok: L.ang.cotovelo >= 110 && daVertical >= 5 };
  },
  'triceps-maquina-estende-ate-quase-travar': (q) => {
    const c = Math.min(...LADOS.map((k) => q[q.length - 1]!.esq.lado[k].ang.cotovelo));
    return { medido: `no fim, o cotovelo ainda dobra ${f1(c)}°`, ok: c >= 4 && c <= 15 };
  },
  'triceps-maquina-volta-ate-90': (q) => {
    const c = q[0]!.esq.lado.R.ang.cotovelo;
    return { medido: `no começo, o cotovelo dobra ${f1(c)}°`, ok: c >= 90 };
  },
  'triceps-maquina-quadril-no-apoio-da-lombar': (q) => {
    const c = faixa(q.map((x) => x.marcas.costas![0]!));
    return { medido: `a bacia e a lombar ficam de ${f1(c[0])} a ${f1(c[1])} cm do apoio da lombar (negativo: afundam)`, ok: c[0] >= -1.5 && c[1] <= 0.5 };
  },
};

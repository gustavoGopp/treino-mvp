// Regras medidas dos crucifixos invertidos sentado na ponta da cadeira, com o peito nas coxas (com halteres e com
// caneleira; ../exercicios/crucifixo-invertido-sentado-base.ts). As duas primeiras (sentado na ponta; o pescoço na linha
// das costas) servem a qualquer exercício sentado na ponta com o tronco inclinado (a rosca concentrada usa a primeira).
// O braço que abre (cotovelos fixos, para os lados, até a linha dos ombros, escápulas, palmas) usa as regras do
// crucifixo inverso (./crucifixo-inverso.ts). O limite vem do que a ficha pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { poseEmPe, resolver } from '../esqueleto';
import type { Esq, Lado } from '../esqueleto';
import { barrigaNasCoxas, peitoNasCoxas } from '../exercicios/crucifixo-invertido-sentado-base';
import { apoioNoAssento, assento } from '../exercicios/quadril-sentado-na-cadeira';
import { distanciaEntre, entraNasPartes } from '../exercicios/sentado-na-ponta';
import type { Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { angulo, dist, dot, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

const LADOS: Lado[] = ['R', 'L'];
const aCada = (q: Quadro[], n: number) => q.filter((_, i) => i % n === 0 || i === q.length - 1);

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** Quanto um ponto fica fora de uma caixa da cena (cm; negativo = dentro). */
function foraDaCaixa(p: V3, cx: Extract<Quadro['prims'][number], { t: 'caixa' }>): number {
  const l = paraRef(cx.ref, p);
  const d = l.map((v, j) => Math.abs(v) - cx.meias[j]!);
  return Math.hypot(...d.map((v) => Math.max(v, 0))) + Math.min(Math.max(...d), 0);
}

/** As cargas do quadro como segmentos com raio: as cabeças do halter, ou cada caneleira em volta do antebraço. */
function cargasDo(x: Quadro): { a: V3; b: V3; r: number; lado?: Lado }[] {
  const out: { a: V3; b: V3; r: number; lado?: Lado }[] = [];
  for (const h of x.prims) if (h.t === 'prisma') out.push({ a: h.a, b: h.b, r: h.ra });
  for (const k of LADOS) {
    const c = x.marcas[`caneleira${k}`],
      e = x.marcas[`caneleiraEixo${k}`],
      r = x.marcas[`caneleiraRaio${k}`];
    if (c && e && r) out.push({ a: sub(c, e), b: [c[0] + e[0], c[1] + e[1], c[2] + e[2]], r: r[0], lado: k });
  }
  return out;
}

/** O ângulo entre a cabeça e o alto das costas (graus) de pé, parado: a referência do pescoço neutro. */
const NEUTRO = new WeakMap<Corpo, number>();
function cabecaNoTronco(e: Esq): number {
  return angulo(e.cabeca.y, e.torax.y);
}
function neutro(corpo: Corpo): number {
  let a = NEUTRO.get(corpo);
  if (a === undefined) NEUTRO.set(corpo, (a = cabecaNoTronco(resolver(corpo, poseEmPe(corpo)))));
  return a;
}

export const REGRAS_SENTADO_NA_PONTA: Record<string, Regra> = {
  'sentado-na-ponta-da-cadeira': (q) => {
    const A = assento();
    const [a0, a1] = faixa([q[0]!, q[q.length - 1]!].map((x) => apoioNoAssento(x.esq)));
    const borda = A.zBorda - q[0]!.esq.pelve.o[2];
    const pes = Math.max(...q.flatMap((x) => LADOS.map((k) => Math.max(x.esq.lado[k].bola[1], x.esq.lado[k].calcanhar[1] - x.esq.corpo.m('altura.maleolo')))));
    return {
      medido: `o glúteo e a coxa ficam de ${f1(a0)} a ${f1(a1)} cm do tampo do assento; o centro do quadril a ${f1(borda)} cm da borda da frente (o assento tem ${f1(A.altura)} cm de altura); a bola e o calcanhar de cada pé ficam no máximo ${f1(Math.max(0, pes))} cm acima do chão`,
      ok: a0 >= -1.5 && a1 <= 0.5 && borda <= 15 && pes <= 0.5,
    };
  },
  'peito-nas-coxas-parado': (q) => {
    // a cada 3 quadros: o peito encosta (não descola mais de meio centímetro) e não atravessa as coxas (amassa até 2,5
    // cm, a tolerância da conferência para o corpo no estofado); a base do pescoço não sai do lugar
    const Q = aCada(q, 3);
    const [a, b] = faixa(Q.map((x) => peitoNasCoxas(x.esq)));
    const barriga = Math.max(...Q.map((x) => barrigaNasCoxas(x.esq)));
    const anda = Math.max(...q.map((x) => dist(x.esq.torax.o, q[0]!.esq.torax.o)));
    return {
      medido: `a pele do peito fica de ${f1(a)} a ${f1(b)} cm das coxas (positivo = amassa); a base do pescoço anda ${f1(anda)} cm; a barriga, junto da dobra do quadril, entra até ${f1(barriga)} cm nas coxas (sentado reto, na extensão de joelho aprovada, são 1,8 cm)`,
      ok: a >= -0.5 && b <= 2.5 && anda <= 1,
    };
  },
  'pescoco-na-linha-das-costas': (q, corpo) => {
    // o pescoço neutro: a cabeça faz com o alto das costas o mesmo ângulo de quem está de pé, parado, a até 15°; e não
    // encosta nas pernas
    const n = neutro(corpo);
    const d = Math.max(...q.map((x) => Math.abs(cabecaNoTronco(x.esq) - n)));
    const folga = Math.min(...aCada(q, 6).map((x) => distanciaEntre(x.esq, (p) => p === 'cabeca', (p) => p === 'coxa' || p === 'canela')));
    return { medido: `a cabeça fica no máximo ${f1(d)}° fora do ângulo que faz com o alto das costas de pé; a cabeça fica a ${f1(folga)} cm das pernas`, ok: d <= 15 && folga >= 0.5 };
  },
  'crucifixo-sentado-bracos-pendurados': (q) => {
    // "pendurados": no começo a carga (ou a ponta dos dedos) fica o mais baixo que o chão deixa, a até 5 cm dele, sem
    // tocá-lo. O ângulo do braço não tem limite: é o chão que o dá (com o peito nas coxas, o ombro fica a uns 68 cm do
    // chão, e o braço pendurado na vertical, até a ponta dos dedos, tem uns 76 cm); ele vai no relatório
    const x = q[0]!;
    const baixo = Math.min(...cargasDo(x).map((c) => Math.min(c.a[1], c.b[1]) - c.r), ...pontosDoBoneco(x.esq).filter((p) => p.parte === 'mao' || p.parte === 'polegar').map((p) => p.p[1]));
    const a = Math.max(...LADOS.map((k) => angulo(sub(x.esq.lado[k].pegada, x.esq.lado[k].ombro), [0, -1, 0])));
    return { medido: `no começo, a carga (ou a ponta dos dedos) fica a ${f1(baixo)} cm do chão e a linha do ombro à mão a ${f1(a)}° da vertical`, ok: baixo >= 0 && baixo <= 5 };
  },
  'crucifixo-sentado-halteres-atras-das-panturrilhas': (q) => {
    // embaixo: o centro de cada halter fica atrás da pele de trás da panturrilha do mesmo lado, na altura dele
    const x = q[0]!;
    const P = pontosDoBoneco(x.esq);
    const pior = Math.max(
      ...LADOS.map((k) => {
        const h = k === 'R' ? x.esq.lado.R.pegada : x.esq.lado.L.pegada;
        const s = k === 'R' ? -1 : 1;
        const tras = Math.min(...P.filter((p) => p.parte === 'canela' && p.p[0] * s > 0 && Math.abs(p.p[1] - h[1]) < 6).map((p) => p.p[2]));
        return h[2] - tras;
      }),
    );
    return { medido: `embaixo, o centro do halter fica ${f1(Math.abs(pior))} cm ${pior <= 0 ? 'atrás' : 'à frente'} da pele de trás da panturrilha, na altura dele`, ok: pior <= 0 };
  },
  'crucifixo-sentado-caneleira-presa-no-punho': (q) => {
    // a borda de baixo da faixa fica logo acima do centro do punho (até 3 cm) e não anda no antebraço durante o ciclo
    const borda = q.map((x) => LADOS.map((k) => dist(sub(x.marcas[`caneleira${k}`]!, x.marcas[`caneleiraEixo${k}`]!), x.esq.lado[k].punho)));
    const [a, b] = faixa(borda.flat());
    return { medido: `a borda de baixo da caneleira fica de ${f1(a)} a ${f1(b)} cm do centro do punho, nos dois braços, o ciclo todo`, ok: a >= 0.5 && b <= 3 && b - a <= 0.1 };
  },
  'crucifixo-sentado-carga-livre': (q) => {
    // a carga contra a pele (fora a mão que segura e o antebraço em que a caneleira está presa), contra a cadeira e o chão
    let corpo = 1e9,
      cena = 1e9,
      chao = 1e9;
    for (const x of aCada(q, 2)) {
      const P = pontosDoBoneco(x.esq);
      for (const c of cargasDo(x)) {
        for (const { p, parte } of P) {
          if (parte === 'mao' || parte === 'polegar') continue;
          if (parte === 'ante' && c.lado && Math.sign(p[0]) === (c.lado === 'R' ? -1 : 1)) continue;
          corpo = Math.min(corpo, aoSegmento(p, c.a, c.b) - c.r);
        }
        for (const cx of x.prims) if (cx.t === 'caixa' && cx.cls !== 'tapete' && cx.cls !== 'chao') for (const p of [c.a, c.b]) cena = Math.min(cena, foraDaCaixa(p, cx) - c.r);
        chao = Math.min(chao, c.a[1] - c.r, c.b[1] - c.r);
      }
    }
    return { medido: `a carga fica a no mínimo ${f1(corpo)} cm da pele, ${f1(cena)} cm da cadeira e ${f1(chao)} cm do chão`, ok: corpo >= 0 && cena >= 0.3 && chao >= 0 };
  },
  'crucifixo-sentado-bracos-livres-das-pernas': (q) => {
    // os braços passam ao lado das coxas e dos joelhos sem entrar neles
    const m = Math.max(...aCada(q, 3).map((x) => entraNasPartes(x.esq, (p) => p === 'coxa' || p === 'canela', (p) => p === 'braco' || p === 'ante' || p === 'mao')));
    return { medido: m > 0 ? `o braço entra até ${f1(m)} cm na perna` : 'o braço não entra na perna', ok: m <= 0.5 };
  },
};

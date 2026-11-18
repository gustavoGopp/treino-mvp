// Regras medidas do voador e do voador invertido (../exercicios/no-voador.ts). Marcas que os quadros dão: `eixoR` e
// `eixoL` (o cubo do eixo de cada braço da máquina), `pegadorR` e `pegadorL` (o centro do pegador que a mão segura:
// o vertical no voador, o horizontal no invertido), `regulagem` ([ângulo dos braços da máquina, posição inicial, quanto
// as placas do pino estão acima das de baixo]). O limite de cada regra vem do que a ficha da técnica (ou o manual da
// Life Fitness) pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq, Lado } from '../esqueleto';
import type { Quadro } from '../movimento';
import type { PecaPropria } from '../pecas';
import { assentoDoVoador, encostoDoVoador, noMundo } from '../pecas-de-cena/voador';
import type { ModoDoVoador } from '../pecas-de-cena/voador';
import { obj } from '../tabelas';
import { angulo, dist, dot, sub } from '../vec';
import type { V3 } from '../vec';

const LADOS: Lado[] = ['R', 'L'];
const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
const graus = Math.PI / 180;

/** O modo da máquina no quadro (voador ou invertido). */
const modoDo = (q: Quadro): ModoDoVoador => (q.pecas?.find((p): p is PecaPropria => p.t === 'propria' && p.nome === 'voador')?.fixa as ModoDoVoador) ?? 'voador';

/** A menor folga entre o tronco e a face do encosto (cm; negativo = o estofado amassa), só sobre o estofado. */
function folgaDoEncosto(e: Esq, modo: ModoDoVoador): number {
  const E = encostoDoVoador(modo);
  const base = noMundo(modo, E.base),
    fr = noMundo(modo, E.frente),
    sb = noMundo(modo, E.sobe);
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!['tronco', 'cintura', 'emendaDaCintura', 'pelve'].includes(parte) || Math.abs(p[0]) > E.larg / 2) continue;
    const r = sub(p, base);
    const ao = dot(r, sb);
    if (ao < 0 || ao > E.comp) continue;
    min = Math.min(min, dot(r, fr));
  }
  return min;
}
/** O ponto mais baixo do glúteo e da coxa sobre o assento, acima do tampo (cm; negativo = afunda). */
function folgaDoAssento(e: Esq, modo: ModoDoVoador): number {
  const z0 = obj('voador', 'assentoTras'),
    z1 = z0 + obj('voador', 'assentoComp'),
    meia = obj('voador', 'assentoLarg') / 2;
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (parte !== 'pelve' && parte !== 'coxa') continue;
    const m = noMundo(modo, p);
    if (m[2] < z0 || m[2] > z1 || Math.abs(m[0]) > meia) continue;
    min = Math.min(min, p[1]);
  }
  return min - assentoDoVoador(modo);
}
/** O ângulo do braço (do ombro à mão, visto de cima) a partir da frente de quem senta, para fora (graus). */
function aberturaDoBraco(x: Quadro, k: Lado): number {
  const L = x.esq.lado[k];
  const r = sub(L.pegada, L.ombro);
  return Math.atan2((k === 'R' ? -1 : 1) * r[0], r[2]) / graus;
}
/** O sentado na máquina: o glúteo no assento, o tronco no encosto e parado (as duas máquinas). */
function sentado(q: Quadro[], onde: string): { medido: string; ok: boolean } {
  const modo = modoDo(primeiro(q));
  const ext = [primeiro(q), ultimo(q)];
  const [a0, a1] = faixa(ext.map((x) => folgaDoAssento(x.esq, modo)));
  const [c0, c1] = faixa(ext.map((x) => folgaDoEncosto(x.esq, modo)));
  const anda = Math.max(...q.map((x) => dist(x.esq.torax.o, primeiro(q).esq.torax.o)));
  return {
    medido: `o glúteo e a coxa ficam de ${f1(a0)} a ${f1(a1)} cm do tampo do assento; ${onde} de ${f1(c0)} a ${f1(c1)} cm da face do encosto (negativo = o estofado amassa); a base do pescoço anda ${f1(anda)} cm no ciclo`,
    ok: a0 >= -1.5 && a1 <= 0.5 && c0 >= -1.5 && c1 <= 0.5 && anda <= 0.5,
  };
}

export const REGRAS_VOADOR: Record<string, Regra> = {
  'voador-eixo-no-ombro': (q) => {
    const d = Math.max(...q.flatMap((x) => LADOS.map((k) => {
      const a = x.esq.lado[k].ombro,
        e = x.marcas[`eixo${k}`]!;
      return Math.hypot(a[0] - e[0], a[2] - e[2]);
    })));
    return { medido: `o centro do ombro fica a no máximo ${f1(d)} cm (na horizontal) do eixo do braço da máquina do mesmo lado`, ok: d <= 0.5 };
  },
  'voador-maos-nos-pegadores': (q) => {
    const d = Math.max(...q.flatMap((x) => LADOS.map((k) => dist(x.esq.lado[k].pegada, x.marcas[`pegador${k}`]!))));
    return { medido: `o centro da mão fica a no máximo ${f1(d)} cm do centro do pegador`, ok: d <= 0.3 };
  },
  'voador-cotovelo-fixo': (q) => {
    const [a, b] = faixa(q.flatMap((x) => LADOS.map((k) => x.esq.lado[k].ang.cotovelo)));
    return { medido: `o cotovelo fica dobrado de ${f1(a)}° a ${f1(b)}° do fechado ao aberto`, ok: a >= 10 && b <= 30 && b - a <= 2.5 };
  },
  'voador-cotovelo-abaixo-do-ombro': (q) => {
    const [a, b] = faixa(q.flatMap((x) => LADOS.map((k) => x.esq.lado[k].ombro[1] - x.esq.lado[k].cotovelo[1])));
    const [m0, m1] = faixa(q.map((x) => x.esq.lado.R.ombro[1] - x.esq.lado.R.pegada[1]));
    return { medido: `o centro do cotovelo fica de ${f1(a)} a ${f1(b)} cm abaixo do centro do ombro; a mão, de ${f1(m0)} a ${f1(m1)} cm`, ok: a >= 1 && b <= 8 };
  },
  'voador-costas-no-encosto': (q) => sentado(q, 'as costas ficam'),
  'voador-abre-ate-a-linha-do-ombro': (q) => {
    const a = Math.max(...LADOS.map((k) => aberturaDoBraco(ultimo(q), k)));
    return { medido: `aberto, a linha do ombro à mão fica ${f1(a)}° a partir da frente (90° = na linha dos ombros), ${f1(90 - a)}° antes dela`, ok: a >= 75 && a <= 90 };
  },
  'voador-fecha-a-frente-do-peito': (q) => {
    const x = primeiro(q);
    // a menor distância entre as duas mãos (a pele)
    const pts = pontosDoBoneco(x.esq).filter((p) => p.parte === 'mao' || p.parte === 'polegar');
    const R = pts.filter((p) => p.p[0] < 0),
      L = pts.filter((p) => p.p[0] > 0);
    let folga = 1e9;
    for (const a of R) for (const b of L) folga = Math.min(folga, dist(a.p, b.p));
    // à frente do peito: as mãos entre os ombros e à frente do tronco
    const frente = Math.min(...LADOS.map((k) => x.esq.lado[k].pegada[2] - x.esq.lado[k].ombro[2]));
    return { medido: `fechado, as mãos ficam a ${f1(folga)} cm uma da outra, ${f1(frente)} cm à frente dos ombros`, ok: folga >= 1 && folga <= 6 && frente >= 45 };
  },
  'voador-placas-sem-descansar': (q) => {
    const [a, b] = faixa(q.map((x) => x.marcas.regulagem![2]));
    const erro = Math.max(...q.map((x) => {
      const [al, ini, s] = x.marcas.regulagem!;
      return Math.abs(s - Math.max(0, ini - al) * graus * obj('voador', 'cameRaio'));
    }));
    return { medido: `as placas do pino ficam de ${f1(a)} a ${f1(b)} cm acima das de baixo (o arco do came, com erro de ${f1(erro)} cm)`, ok: a >= 1 && erro <= 0.1 };
  },
  'voador-invertido-cotovelos-levemente-dobrados': (q) => {
    const [a, b] = faixa(q.flatMap((x) => LADOS.map((k) => x.esq.lado[k].ang.cotovelo)));
    return { medido: `o cotovelo fica dobrado de ${f1(a)}° a ${f1(b)}° do começo ao fim`, ok: a >= 10 && b <= 30 && b - a <= 2.5 };
  },
  'voador-invertido-bracos-paralelos-ao-chao': (q) => {
    const [a, b] = faixa(q.flatMap((x) => LADOS.map((k) => {
      const r = sub(x.esq.lado[k].pegada, x.esq.lado[k].ombro);
      return Math.atan2(r[1], Math.hypot(r[0], r[2])) / graus;
    })));
    return { medido: `a linha do ombro à mão fica de ${f1(a)}° a ${f1(b)}° da horizontal (positivo = a mão acima do ombro)`, ok: a >= -6 && b <= 6 };
  },
  'voador-invertido-peito-no-encosto': (q) => sentado(q, 'o peito fica'),
  'voador-invertido-abre-ate-a-linha-do-corpo': (q) => {
    const a0 = Math.max(...LADOS.map((k) => aberturaDoBraco(primeiro(q), k)));
    const x = ultimo(q);
    // no fim, a linha do ombro à mão contra a linha dos ombros, vista de cima
    const ombros = sub(x.esq.lado.R.ombro, x.esq.lado.L.ombro);
    const r = sub(x.esq.lado.R.pegada, x.esq.lado.R.ombro);
    const daLinha = angulo([r[0], 0, r[2]] as V3, [ombros[0], 0, ombros[2]] as V3);
    return { medido: `no começo, os braços ficam ${f1(a0)}° abertos a partir da frente; no fim, a linha do ombro à mão fica ${f1(daLinha)}° fora da linha dos ombros, vista de cima`, ok: a0 <= 20 && daLinha <= 8 };
  },
};

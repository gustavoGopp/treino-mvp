// Regras medidas dos exercícios com as duas mãos na fita de suspensão (remada, rosca, tríceps e T: núcleo
// ../exercicios/na-fita.ts). Cada uma recebe os quadros do começo até o fim da primeira fase com movimento. O limite vem
// do que a ficha da técnica pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS } from '../esqueleto';
import type { Esq } from '../esqueleto';
import { anguloDoCorpo, naRef } from '../exercicios/na-fita';
import { angulo, dist, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** O braço no referencial do tronco (unitário). */
const bracoNoTronco = (e: Esq, k: 'R' | 'L') => naRef(e.torax, norm(sub(e.lado[k].cotovelo, e.lado[k].ombro)));
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, (sub(p, a)[0] * ab[0] + sub(p, a)[1] * ab[1] + sub(p, a)[2] * ab[2]) / (ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** A menor distância da pegada à superfície da cabeça. */
function maoACabeca(e: Esq): number {
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'cabeca') for (const k of LADOS) min = Math.min(min, dist(p, e.lado[k].pegada));
  return min;
}

export const regrasDaSuspensao: Record<string, Regra> = {
  'maos-nos-pegadores': (q) => {
    const d = q.flatMap((x) => LADOS.map((k) => dist(x.esq.lado[k].pegada, x.marcas[`pegador.${k}`]!)));
    const fecha = q.every((x) => LADOS.every((k) => x.esq.lado[k].formaMao === 'pegada'));
    const [, pior] = faixa(d);
    return { medido: `o centro da pegada fica a no máximo ${f1(pior)} cm do centro do pegador, ${fecha ? 'com a mão fechada nele' : 'SEM a mão fechada'}`, ok: pior <= 0.5 && fecha };
  },
  'calcanhares-no-chao': (q) => {
    // o ponto mais baixo do pé (a superfície do calcanhar) e a ponta do pé, que fica para cima
    const baixo = q.map((x) => {
      let m = 1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'pe') m = Math.min(m, p[1]);
      return m;
    });
    const [a, b] = faixa(baixo);
    const ponta = Math.min(...q.map((x) => Math.min(x.esq.lado.R.ponta[1], x.esq.lado.L.ponta[1])));
    return { medido: `o ponto mais baixo do pé fica de ${f1(a)} a ${f1(b)} cm do chão; a ponta do pé, a ${f1(ponta)} cm ou mais`, ok: a >= -1 && b <= 1 && ponta >= 3 };
  },
  'na-ponta-dos-pes': (q) => {
    const bola = Math.max(...q.map((x) => Math.max(x.esq.lado.R.bola[1], x.esq.lado.L.bola[1])));
    const calc = Math.min(...q.map((x) => Math.min(x.esq.lado.R.calcanhar[1], x.esq.lado.L.calcanhar[1])));
    return { medido: `a bola do pé fica a no máximo ${f1(bola)} cm do chão; o calcanhar, a ${f1(calc)} cm ou mais`, ok: bola <= 0.3 && calc >= 2 };
  },
  'corpo-sobe-com-a-fita': (q) => {
    const a = anguloDoCorpo(primeiro(q).esq),
      b = anguloDoCorpo(ultimo(q).esq);
    return { medido: `o corpo vai de ${f1(a)}° a ${f1(b)}° da vertical (do tornozelo ao ombro)`, ok: a - b >= 5 };
  },
  'corpo-vai-a-frente': (q) => {
    const a = anguloDoCorpo(primeiro(q).esq),
      b = anguloDoCorpo(ultimo(q).esq);
    return { medido: `o corpo vai de ${f1(a)}° a ${f1(b)}° da vertical, inclinado à frente`, ok: b - a >= 5 };
  },
  'maos-ao-lado-do-peito': (q) => {
    // no tronco: entre a base do pescoço e 8 cm abaixo da linha do mamilo, à frente das costas, sem passar muito da
    // frente do peito
    const e = ultimo(q).esq;
    const l = paraRef(e.torax, e.lado.R.pegada);
    const peito = e.corpo.m('prof.peito'),
      mamilo = e.corpo.m('altura.cervical') - e.corpo.m('altura.peito');
    return { medido: `no fim, a pegada fica ${f1(-l[1])} cm abaixo da base do pescoço (o mamilo fica a ${f1(mamilo)} cm), ${f1(l[2])} cm à frente da linha da coluna (o peito tem ${f1(peito)} cm de fundo) e ${f1(Math.abs(l[0]))} cm do meio do corpo`, ok: -l[1] >= 4 && -l[1] <= mamilo + 8 && l[2] >= 0 && l[2] <= peito + 8 };
  },
  'cotovelos-rentes': (q) => {
    const e = ultimo(q).esq;
    const b = bracoNoTronco(e, 'R');
    const a = Math.asin(Math.abs(b[0])) / (Math.PI / 180);
    return { medido: `no fim, o braço se afasta ${f1(a)}° do lado do tronco`, ok: a <= 30 };
  },
  'antebraco-na-linha-da-fita': (q) => {
    const pior = Math.max(...q.filter((_, i) => i > q.length * 0.4).map((x) => angulo(sub(x.esq.lado.R.punho, x.esq.lado.R.cotovelo), sub(x.marcas.divide!, x.esq.lado.R.pegada))));
    return { medido: `da metade da puxada em diante, o antebraço desvia no máximo ${f1(pior)}° da linha da fita`, ok: pior <= 12 };
  },
  'escapulas-se-juntam': (q) => {
    const a = primeiro(q).esq.lado.R.ang.claviculaRetr,
      b = ultimo(q).esq.lado.R.ang.claviculaRetr;
    return { medido: `a clavícula vai para trás ${f1(b - a)}° do começo ao fim (a escápula se junta à coluna)`, ok: b - a >= 8 };
  },
  'palmas-uma-para-a-outra': (q) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.pronacao));
    return { medido: `o antebraço fica de ${f1(a)}° a ${f1(b)}° (90° = polegar para cima, palmas uma para a outra)`, ok: a >= 65 && b <= 115 };
  },
  'palmas-para-cima': (q) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.pronacao));
    return { medido: `o antebraço fica de ${f1(a)}° a ${f1(b)}° (0° = palma para cima, supinado)`, ok: a >= -25 && b <= 25 };
  },
  'palmas-para-baixo': (q) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.pronacao));
    return { medido: `o antebraço fica de ${f1(a)}° a ${f1(b)}° (180° = palma para baixo, pronado)`, ok: a >= 140 };
  },
  'cotovelos-altos-e-parados': (q) => {
    // o braço não se move no tronco; no fim, o cotovelo fica na altura do ombro ou acima
    const b0 = bracoNoTronco(primeiro(q).esq, 'R');
    const anda = Math.max(...q.map((x) => angulo(bracoNoTronco(x.esq, 'R'), b0)));
    const L = ultimo(q).esq.lado.R;
    const alt = L.cotovelo[1] - L.ombro[1];
    return { medido: `o braço gira no máximo ${f1(anda)}° no tronco; no fim, o cotovelo fica ${f1(Math.abs(alt))} cm ${alt >= 0 ? 'acima' : 'abaixo'} do ombro`, ok: anda <= 3 && alt >= -5 };
  },
  'cotovelos-parados-para-a-frente': (q) => {
    const b0 = bracoNoTronco(primeiro(q).esq, 'R');
    const anda = Math.max(...q.map((x) => angulo(bracoNoTronco(x.esq, 'R'), b0)));
    const abre = Math.max(...q.map((x) => Math.asin(Math.abs(bracoNoTronco(x.esq, 'R')[0])) / (Math.PI / 180)));
    return { medido: `o braço gira no máximo ${f1(anda)}° no tronco e se abre no máximo ${f1(abre)}° para o lado`, ok: anda <= 3 && abre <= 15 };
  },
  'maos-perto-da-testa': (q) => {
    const e = ultimo(q).esq;
    const d = maoACabeca(e);
    const l = paraRef(e.cabeca, e.lado.R.pegada);
    return { medido: `no fim, a pegada fica a ${f1(d)} cm da cabeça, ${f1(Math.abs(l[2]))} cm ${l[2] >= 0 ? 'à frente' : 'atrás'} do centro dela e ${f1(Math.abs(l[1]))} cm ${l[1] >= 0 ? 'acima' : 'abaixo'}`, ok: d >= 2 && d <= 16 && l[2] > 0 };
  },
  'fita-por-cima-da-cabeca': (q) => {
    // a fita (da âncora à divisão e daí a cada pegador) não encosta na cabeça nem no pescoço
    let min = 1e9;
    for (const x of q.filter((_, i) => i % 4 === 0)) {
      const segs: [V3, V3][] = [[x.marcas.ancora!, x.marcas.divide!], [x.marcas.divide!, x.marcas['pegador.R']!], [x.marcas.divide!, x.marcas['pegador.L']!]];
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'cabeca' || parte === 'pescoco') for (const [a, b] of segs) min = Math.min(min, aoSegmento(p, a, b));
    }
    return { medido: `a fita passa a no mínimo ${f1(min)} cm da cabeça e do pescoço`, ok: min >= 1 };
  },
  'bracos-quase-retos': (q) => {
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `o cotovelo dobra de ${f1(a)}° a ${f1(b)}°`, ok: b <= 20 };
  },
  'maos-na-linha-dos-ombros': (q) => {
    const e = ultimo(q).esq;
    const o = paraRef(e.torax, e.lado.R.ombro),
      m = paraRef(e.torax, e.lado.R.pegada);
    return { medido: `no fim, a pegada fica ${f1(Math.abs(m[2] - o[2]))} cm ${m[2] >= o[2] ? 'à frente' : 'atrás'} da linha dos ombros e ${f1(Math.abs(m[1] - o[1]))} cm ${m[1] >= o[1] ? 'acima' : 'abaixo'} do ombro, a ${f1(Math.abs(m[0]))} cm do meio do corpo`, ok: Math.abs(m[2] - o[2]) <= 10 && Math.abs(m[1] - o[1]) <= 12 };
  },
};

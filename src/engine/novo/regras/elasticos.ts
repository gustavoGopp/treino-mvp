// Regras medidas dos exercícios com elástico (tríceps acima da cabeça, rosca, remada, puxada e face pull): onde o
// elástico prende, que ele não entra no corpo e que a mão o segura de verdade. O caminho do elástico é o `fio` de classe
// `fita` do quadro (a largura dele é a espessura da faixa ou o diâmetro do tubo); onde ele prende, as marcas do quadro.
import { pontosDoBoneco } from '../boneco';
import { LADOS } from '../esqueleto';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { dist, dot, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** Os trechos de elástico do quadro (os fios de classe `fita`), com o raio de cada um. */
function trechos(q: Quadro): { pts: V3[]; r: number }[] {
  return q.prims.flatMap((p) => (p.t === 'fio' && p.cls === 'fita' ? [{ pts: p.pts, r: p.larg / 2 }] : []));
}
function aoFio(p: V3, pts: V3[]): number {
  let d = 1e9;
  for (let i = 1; i < pts.length; i++) d = Math.min(d, aoSegmento(p, pts[i - 1]!, pts[i]!));
  return d;
}
/** Uma amostra dos quadros (a cada 3 e o último), para as regras que varrem a pele. */
const amostra = (q: Quadro[]) => q.filter((_, i) => i % 3 === 0 || i === q.length - 1);

export const regrasDosElasticos: Record<string, Regra> = {
  'elastico-pisado-no-meio-da-sola': (q) => {
    // cada marca `sola*` é uma borda da sola por onde o elástico passa: onde ela fica entre o calcanhar e a bola do pé
    // mais perto (0 = calcanhar, 1 = bola), a altura dela e quanto o calcanhar desse pé sobe
    const ts: number[] = [],
      ys: number[] = [],
      calc: number[] = [];
    for (const x of q) {
      for (const [k, m] of Object.entries(x.marcas)) {
        if (!k.startsWith('sola')) continue;
        const k2 = LADOS.reduce((a, b) => (Math.abs(x.esq.lado[b].bola[0] - m[0]) < Math.abs(x.esq.lado[a].bola[0] - m[0]) ? b : a));
        const L = x.esq.lado[k2];
        const eixo = sub(L.bola, L.calcanhar);
        ts.push(dot(sub(m, L.calcanhar), eixo) / dot(eixo, eixo));
        ys.push(m[1]);
        calc.push(L.calcanhar[1] - L.bola[1]);
      }
    }
    const [a, b] = faixa(ts),
      [c, d] = faixa(ys),
      [e0, e1] = faixa(calc);
    return { medido: `o elástico passa sob a sola de ${f1(a * 100)}% a ${f1(b * 100)}% do caminho do calcanhar à bola do pé, a ${f1(c)}–${f1(d)} cm do chão; o calcanhar fica ${f1(e0)}–${f1(e1)} cm acima da bola do pé`, ok: a >= 0.3 && b <= 0.75 && d <= 1 && e1 <= 1 };
  },
  'elastico-livre-do-corpo': (q) => {
    // a pele contra cada trecho de elástico, fora as mãos e o que fica a até 6 cm do centro de uma mão que segura o
    // elástico (a faixa sai do punho fechado) e os pés (a faixa passa por baixo da sola)
    let min = 1e9,
      qual = '';
    for (const x of amostra(q)) {
      const maos = LADOS.map((k) => x.esq.lado[k].pegada);
      for (const t of trechos(x)) {
        for (const { p, parte } of pontosDoBoneco(x.esq)) {
          if (parte === 'mao' || parte === 'polegar' || parte === 'pe') continue;
          if (maos.some((m) => dist(m, p) < 6)) continue;
          const d = aoFio(p, t.pts) - t.r;
          if (d < min) {
            min = d;
            qual = parte;
          }
        }
      }
    }
    return { medido: `o elástico passa a no mínimo ${f1(min)} cm da pele (${qual})`, ok: min >= -0.3 };
  },
  'elastico-na-sola-dos-pes': (q) => {
    // com o pé fora do chão (sentado), as marcas `sola*` ficam na sola, no meio dela: a fração do calcanhar à bola e a
    // distância ao plano da sola (negativa = do lado de fora da sola)
    const ts: number[] = [],
      ds: number[] = [];
    for (const x of q)
      for (const [k, m] of Object.entries(x.marcas)) {
        if (!k.startsWith('sola')) continue;
        const L = x.esq.lado[k.startsWith('solaR') ? 'R' : 'L'];
        const eixo = sub(L.bola, L.calcanhar);
        ts.push(dot(sub(m, L.calcanhar), eixo) / dot(eixo, eixo));
        ds.push(dot(sub(m, L.bola), norm(L.pe.y)));
      }
    const [a, b] = faixa(ts),
      [c, d] = faixa(ds);
    return { medido: `o elástico passa pela sola de ${f1(a * 100)}% a ${f1(b * 100)}% do caminho do calcanhar à bola do pé, a ${f1(-d)}–${f1(-c)} cm da sola, do lado de fora`, ok: a >= 0.3 && b <= 0.75 && d <= 0 && c >= -1.5 };
  },
  'elastico-remada-tronco-volta-a-vertical': (q) => {
    const peito = (x: Quadro) => Math.atan2(x.esq.torax.y[2], x.esq.torax.y[1]) / (Math.PI / 180);
    const a = peito(q[0]!),
      b = peito(q[q.length - 1]!);
    const curva = Math.max(...q.map((x) => Math.abs(x.esq.pose.lombar ?? 0) + Math.abs(x.esq.pose.toracica ?? 0)));
    return { medido: `o peito vai de ${f1(a)}° à frente da vertical, no alongado, a ${f1(b)}° no fim; a lombar e a torácica mudam ${f1(curva)}° da curva de repouso`, ok: a >= 9.5 && a <= 15.5 && Math.abs(b) <= 3 && curva <= 1 };
  },
  'elastico-remada-maos-ao-lado-do-abdomen': (q) => {
    // no fim: a pegada entre a crista do osso do quadril e a costela de baixo (ao lado do abdômen, no tronco) e o
    // cotovelo atrás da linha do tronco (atrás do eixo do tórax, visto de lado)
    const e = q[q.length - 1]!.esq,
      m = (id: string) => e.corpo.m(id);
    const P = e.pelve;
    const y = paraRef(P, e.lado.R.pegada)[1] + m('altura.trocanter');
    const cot = paraRef(e.torax, e.lado.R.cotovelo)[2];
    return { medido: `no fim, o centro da mão fica na altura de ${f1(y)} cm do corpo em pé (crista do quadril: ${f1(m('altura.cristaIliaca'))} cm; costela de baixo: ${f1(m('altura.costela10'))} cm) e o cotovelo, ${f1(-cot)} cm atrás da linha do tronco`, ok: y >= m('altura.cristaIliaca') - 2 && y <= m('altura.costela10') + 4 && cot < 0 };
  },
  'elastico-bracos-juntos': (q) => {
    // os dois cotovelos dobram juntos: a maior diferença entre o ângulo do direito e o do esquerdo no ciclo
    const d = Math.max(...q.map((x) => Math.abs(angulosDoLado(x.esq, 'R').cotovelo - angulosDoLado(x.esq, 'L').cotovelo)));
    return { medido: `a maior diferença entre os dois cotovelos é ${f1(d)}°`, ok: d <= 2 };
  },
  'elastico-nas-maos': (q) => {
    // o centro de cada mão fica sobre o elástico (a faixa ou o pegador passa por dentro da mão fechada) e, no laço
    // seguro com as duas mãos juntas, a distância entre elas
    const naMao = q.flatMap((x) => LADOS.map((k) => Math.min(...trechos(x).map((t) => aoFio(x.esq.lado[k].pegada, t.pts)), ...Object.entries(x.marcas).filter(([n]) => n.startsWith('pegador')).map(([, m]) => dist(m, x.esq.lado[k].pegada)))));
    const entre = q.map((x) => dist(x.esq.lado.R.pegada, x.esq.lado.L.pegada));
    const [a, b] = faixa(naMao),
      [c, d] = faixa(entre);
    return { medido: `o centro de cada mão fica a ${f1(a)}–${f1(b)} cm do elástico; as mãos ficam a ${f1(c)}–${f1(d)} cm uma da outra`, ok: b <= 0.5 };
  },
};

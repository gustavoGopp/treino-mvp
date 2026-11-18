// Regras medidas da mesa flexora (../exercicios/mesa-flexora.ts, a máquina em ../pecas-de-cena/mesa-flexora.ts). Cada
// uma mede a superfície do Boneco contra os estofados e o rolo da máquina. Marcas que os quadros dão: `eixo` (o centro
// do eixo da alavanca), `rolo` (o centro do rolo), `pilha` (quanto as placas subiram, em y) e `alavanca` (o ângulo da
// alavanca agora, o do começo e a distância do eixo ao rolo).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import type { Quadro } from '../movimento';
import { geometriaDaMesaFlexora } from '../pecas-de-cena/mesa-flexora';
import type { PlanoDoEstofado } from '../pecas-de-cena/mesa-flexora';
import { obj } from '../tabelas';
import { dist, dot, sub } from '../vec';
import type { V3 } from '../vec';

const rad = Math.PI / 180;

/** O ponto mais baixo de umas partes do corpo contra o topo de um estofado, só sobre ele (positivo = acima). */
function folga(e: Esq, partes: string[], est: PlanoDoEstofado): number {
  const meia = obj('mesaFlexora', 'estofadoLarg') / 2;
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!partes.includes(parte) || Math.abs(p[0]) > meia) continue;
    const s = dot(sub(p, est.ponta), est.ao);
    if (s < 0 || s > est.comp) continue;
    m = Math.min(m, dot(sub(p, est.ponta), est.normal));
  }
  return m;
}

/** A pele das pernas mais perto do eixo do rolo (que corre ao longo de x): a folga e o ponto. */
function noRolo(q: Quadro): { folga: number; ponto: V3 } {
  const c = q.marcas.rolo!;
  const r = obj('mesaFlexora', 'roloDiam') / 2,
    meio = obj('mesaFlexora', 'roloComp') / 2;
  let melhor = { folga: 1e9, ponto: c };
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if ((parte !== 'canela' && parte !== 'pe') || p[0] < c[0] - meio || p[0] > c[0] + meio - 6) continue;
    const d = Math.hypot(p[1] - c[1], p[2] - c[2]) - r;
    if (d < melhor.folga) melhor = { folga: d, ponto: p };
  }
  return melhor;
}

export const REGRAS_MESA_FLEXORA: Record<string, Regra> = {
  'mesa-flexora-deitado-no-estofado': (q) => {
    const G = geometriaDaMesaFlexora();
    const coxa = faixa(q.map((x) => folga(x.esq, ['coxa', 'pelve'], G.coxa)));
    const peito = faixa(q.map((x) => folga(x.esq, ['tronco', 'emendaDaCintura', 'pelve'], G.peito)));
    const anda = Math.max(...q.map((x) => dist(x.esq.pelve.o, q[0]!.esq.pelve.o)));
    const maos = Math.max(...q.map((x) => Math.max(dist(x.esq.lado.R.pegada, G.pegadores[0]!.centro), dist(x.esq.lado.L.pegada, G.pegadores[1]!.centro))));
    const quadril = faixa(q.map((x) => angulosDoLado(x.esq, 'R').quadril));
    return {
      medido: `a coxa e a frente da bacia ficam de ${f1(coxa[0])} a ${f1(coxa[1])} cm do topo do estofado das coxas; a barriga e o peito, de ${f1(peito[0])} a ${f1(peito[1])} cm do topo do estofado do peito (negativo = o corpo afunda no estofado); a bacia anda ${f1(anda)} cm; o quadril fica dobrado de ${f1(quadril[0])}° a ${f1(quadril[1])}° (a dobra do estofado); o centro de cada mão fica a no máximo ${f1(maos)} cm do meio do pegador`,
      ok: coxa[0] >= -2.5 && coxa[1] <= 1 && peito[0] >= -2.5 && peito[1] <= 1 && anda <= 0.1 && maos <= 1,
    };
  },
  'mesa-flexora-joelho-no-eixo': (q) => {
    const fora = Math.max(...q.map((x) => Math.max(...(['R', 'L'] as const).map((k) => Math.hypot(x.esq.lado[k].joelho[1] - x.marcas.eixo![1], x.esq.lado[k].joelho[2] - x.marcas.eixo![2])))));
    return { medido: `o centro de cada joelho fica a no máximo ${f1(fora)} cm da linha do eixo, no ciclo todo`, ok: fora <= 0.5 };
  },
  'mesa-flexora-rolo-acima-do-calcanhar': (q) => {
    const r = q.map(noRolo);
    const [a, b] = faixa(r.map((x) => x.folga));
    // onde o rolo encosta: a distância ao centro do tornozelo, ao longo da canela (positivo = acima dele, para o joelho)
    const acima = q.map((x, i) => {
      const R = x.esq.lado.R;
      const d = sub(R.joelho, R.tornozelo);
      return dot(sub(r[i]!.ponto, R.tornozelo), d) / Math.hypot(...d);
    });
    const [c, d] = faixa(acima);
    return {
      medido: `o rolo fica de ${f1(a)} a ${f1(b)} cm da pele (negativo = o rolo afunda na perna) e encosta de ${f1(c)} a ${f1(d)} cm acima do centro do tornozelo, atrás da perna`,
      ok: a >= -1 && b <= 0.5 && c >= -2 && d <= 8,
    };
  },
  'mesa-flexora-amplitude': (q) => {
    const [j0, j1] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    const fim = q[q.length - 1]!;
    // o rolo perto do glúteo: a distância da pele do rolo à pele da bacia, no fim
    let gluteo = 1e9;
    const rr = obj('mesaFlexora', 'roloDiam') / 2;
    for (const { p, parte } of pontosDoBoneco(fim.esq)) if (parte === 'pelve') gluteo = Math.min(gluteo, dist(p, [p[0], fim.marcas.rolo![1], fim.marcas.rolo![2]]) - rr);
    return { medido: `o joelho vai de ${f1(j0)}° (começo) a ${f1(j1)}° (fim); no fim, o rolo fica a ${f1(gluteo)} cm do glúteo`, ok: j0 <= 20 && j1 >= 110 };
  },
  'mesa-flexora-pilha-sobe-com-a-alavanca': (q) => {
    const rC = obj('mesaFlexora', 'cameDiam') / 2;
    const k0 = angulosDoLado(q[0]!.esq, 'R').joelho;
    let gira = 0,
      pilha = 0,
      sobe = 0;
    for (const x of q) {
      const [a, a0] = x.marcas.alavanca!;
      gira = Math.max(gira, Math.abs(a - a0 - (angulosDoLado(x.esq, 'R').joelho - k0)));
      pilha = Math.max(pilha, Math.abs(x.marcas.pilha![1] - Math.max(0, a - a0) * rad * rC));
      sobe = Math.max(sobe, x.marcas.pilha![1]);
    }
    return {
      medido: `a alavanca gira com a canela (diferença máxima de ${f1(gira)}°); as placas sobem até ${f1(sobe)} cm, a no máximo ${f1(pilha)} cm do arco do came (raio de ${f1(rC)} cm × ângulo)`,
      ok: gira <= 0.5 && pilha <= 0.1 && sobe > 5,
    };
  },
};

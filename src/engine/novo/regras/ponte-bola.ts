// Regras medidas da ponte de glúteo com os pés na bola (../exercicios/ponte-pes-bola.ts). As que já existem e servem
// estão em ../conferir.ts (lombar neutra), ./flexao-joelho.ts (em linha no fim), ./pontes.ts (quadril quase no chão)
// e ./flexoes.ts (pé na bola, pernas fora da bola, costas e cabeça no chão). As daqui medem a bola parada e o
// calcanhar que fica no alto dela.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { formaDaBola } from '../pecas-de-cena/bola-suica';
import { dist } from '../vec';

export const REGRAS_PONTE_BOLA: Record<string, Regra> = {
  'ponte-bola-bola-parada': (q) => {
    const anda = Math.max(...q.map((x) => dist(x.marcas.bola!, q[0]!.marcas.bola!)));
    return { medido: `o centro da bola anda ${f1(anda)} cm no ciclo`, ok: anda <= 0.1 };
  },
  'ponte-bola-joelhos-pouco-dobrados': (q) => {
    const j = q.map((x) => x.esq.lado.R.ang.joelho);
    const [a, b] = faixa(j);
    const topo = j[j.length - 1]!;
    // a ficha não dá número: "pernas quase estendidas" (embaixo, até 15°) e "joelhos um pouco dobrados" (nunca além de
    // 50°, para não virar a ponte do chão, com o joelho perto de 90°)
    return { medido: `o joelho dobra de ${f1(a)}° (embaixo) a ${f1(b)}° (no topo, ${f1(topo)}°)`, ok: a >= 0 && j[0]! <= 15 && b <= 50 };
  },
  'ponte-bola-calcanhar-no-alto-da-bola': (q) => {
    // o ponto do pé direito mais perto da bola: a que distância (na horizontal, ao longo do corpo) do alto dela ele fica,
    // e quanto ele anda no ciclo
    const B = formaDaBola();
    const apoios = q.map((x) => {
      const c = x.marcas.bola!;
      let melhor = x.esq.lado.R.calcanhar,
        d = 1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (parte !== 'pe' || p[0] > 0) continue;
        const dd = dist(p, c) - B.R;
        if (dd < d) {
          d = dd;
          melhor = p;
        }
      }
      // o ângulo do ponto de apoio a partir do alto da bola, visto de lado (0 = no alto; positivo = do lado do corpo)
      return { p: melhor, doAlto: Math.atan2(c[2] - melhor[2], melhor[1] - c[1]) * (180 / Math.PI) };
    });
    const [a, b] = faixa(apoios.map((x) => x.doAlto));
    const anda = Math.max(...apoios.map((x) => dist(x.p, apoios[0]!.p)));
    return { medido: `o ponto do pé que apoia fica de ${f1(a)}° a ${f1(b)}° do alto da bola, do lado do corpo (visto de lado), e anda ${f1(anda)} cm no ciclo`, ok: a >= -10 && b <= 40 && anda <= 3 };
  },
};

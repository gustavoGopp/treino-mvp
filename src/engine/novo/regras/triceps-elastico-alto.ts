// Regra medida do tríceps com elástico preso no alto: a âncora (o ponto alto) fica acima da cabeça e à frente de quem
// treina. O cotovelo parado e colado, as mãos no peito, a extensão embaixo e o tronco parado usam as regras do tríceps
// na polia com corda (./triceps-corda.ts), que medem o corpo e servem igual.
import { pontosDoBoneco } from '../boneco';
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';

export const REGRAS_TRICEPS_ELASTICO_ALTO: Record<string, Regra> = {
  'triceps-elastico-ancora-no-alto-a-frente': (q, corpo) => {
    // a alça da âncora (a marca `ancora`) contra o alto da cabeça (o trágio mais a distância dele ao topo) e contra o
    // ponto do corpo mais à frente no ciclo
    const a = q[0]!.marcas.ancora!;
    const acima = Math.min(...q.map((x) => a[1] - (x.esq.cabeca.o[1] + corpo.m('cabeca.tragionAoTopo'))));
    const frente = Math.min(...q.map((x) => a[2] - Math.max(...pontosDoBoneco(x.esq).map((p) => p.p[2]))));
    return { medido: `a alça da âncora fica ${f1(a[1])} cm do chão, ${f1(acima)} cm acima do alto da cabeça e ${f1(frente)} cm à frente do ponto do corpo mais à frente`, ok: acima >= 10 && frente >= 10 };
  },
};

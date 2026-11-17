// Regras medidas do agachamento com 2 halteres ao lado do corpo. As do agachamento (quadril na altura do joelho, joelho
// na direção do pé, peso no meio do pé, lombar neutra) estão em ../conferir.ts.
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS } from '../esqueleto';
import { folgaDaCarga } from './stiffs';

export const regrasDoAgachamentoComHalteres: Record<string, Regra> = {
  'halteres-ao-lado-do-corpo': (q) => {
    // a folga da cabeça do halter até a pele da coxa ou da canela, em um quadro a cada três
    const fol = faixa(q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map(folgaDaCarga));
    // o centro do halter, de lado a lado, contra o joelho e o tornozelo do mesmo lado: por fora da perna
    const fora = Math.min(...q.flatMap((x) => LADOS.map((k) => Math.abs(x.esq.lado[k].pegada[0]) - Math.max(Math.abs(x.esq.lado[k].joelho[0]), Math.abs(x.esq.lado[k].tornozelo[0])))));
    const cot = faixa(q.map((x) => angulosDoLado(x.esq, 'R').cotovelo));
    return {
      medido: `da cabeça do halter à pele da coxa ou da canela, de ${f1(fol[0])} a ${f1(fol[1])} cm; o centro do halter fica no mínimo ${f1(fora)} cm por fora do joelho e do tornozelo; o cotovelo dobra de ${f1(cot[0])}° a ${f1(cot[1])}°`,
      ok: fol[0] >= -0.5 && fora > 0 && cot[1] <= 10,
    };
  },
};

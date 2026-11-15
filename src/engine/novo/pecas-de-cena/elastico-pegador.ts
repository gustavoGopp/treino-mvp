// O pegador do elástico em tubo seguro na mão fechada, com o mesmo desenho do pegador de ../equipamento.ts (a pegada
// de borracha e a fita em triângulo até a ponta do tubo; medidas do objeto `elastico` da tabela), pintado um pouco
// mais para trás: com a palma virada para quem olha ou para longe, a pegada fica dentro da mão fechada e só as pontas
// dela aparecem dos dois lados do punho.
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, mul, norm } from '../vec';
import type { V3 } from '../vec';

/** `pegada`: o centro da pegada (o centro da mão); `eixo`: a direção da pegada; `ponta`: a ponta do tubo. */
export function pegadorNaMao(pegada: V3, eixo: V3, ponta: V3, nome = 'pegador'): PecaPropria {
  const u = norm(eixo),
    L = obj('elastico', 'pegadorComp') / 2;
  const a = add(pegada, mul(u, -L)),
    b = add(pegada, mul(u, L));
  return {
    t: 'propria',
    nome,
    desenhar(C, M) {
      C.cilindro(a, b, obj('elastico', 'pegadorDiam') / 2, M.borracha, { lados: 12, dz: 14 });
      C.polilinha([a, ponta, b], M.borracha[1]!, 1.1, { dz: 4 });
    },
  };
}

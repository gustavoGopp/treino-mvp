// O pegador do elástico em tubo com o pé enfiado nele: a pegada fica atravessada na frente do tornozelo, logo acima do
// peito do pé, e a fita do pegador dá a volta pelos dois lados do tornozelo até a ponta do tubo, atrás. É assim que a
// ficha da técnica prende o elástico ("as pontas, ou os pegadores, em volta dos dois tornozelos, por trás, logo acima
// do calcanhar"). As medidas do pegador são as do elástico em tubo (../dados/objetos.json).
import type { Ref } from '../vec';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

/**
 * `canela`: o referencial da canela (y sobe para o joelho, z é a frente da canela); `tornozelo`: o centro do tornozelo;
 * `acima`: quanto a pegada fica acima do centro do tornozelo, ao longo da canela; `raio`: o raio do tornozelo;
 * `ponta`: a ponta do tubo, atrás do tornozelo.
 */
export function pegadorNoTornozelo(canela: Ref, tornozelo: V3, acima: number, raio: number, ponta: V3): PecaPropria {
  const L = obj('elastico', 'pegadorComp') / 2,
    r = obj('elastico', 'pegadorDiam') / 2;
  const centro = add(add(tornozelo, mul(canela.y, acima)), mul(canela.z, raio + r));
  const a = add(centro, mul(canela.x, -L)),
    b = add(centro, mul(canela.x, L));
  // a fita sai das pontas da pegada, passa rente aos lados do tornozelo e se junta atrás, na ponta do tubo
  const lado = (s: number) => add(add(tornozelo, mul(canela.y, acima)), mul(canela.x, s * (raio + 0.6)));
  return {
    t: 'propria',
    nome: 'pegador',
    desenhar(C, M) {
      C.polilinha([a, lado(-1), ponta], M.borracha[1]!, 1.2);
      C.polilinha([b, lado(1), ponta], M.borracha[1]!, 1.2);
      C.cilindro(a, b, r, M.borracha, { lados: 12 });
    },
  };
}

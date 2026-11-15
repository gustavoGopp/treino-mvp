// A toalha de mão dobrada ao meio, sob os dois calcanhares, que desliza com eles no chão liso (flexão de joelho
// deslizante). As medidas vêm de ../dados/objetos/toalha.json. Ela anda com os calcanhares: fica centrada debaixo deles.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { retArred } from '../realista/base.mjs';
import { obj } from '../tabelas';
import type { V3 } from '../vec';

/** A cor da toalha (felpa clara, em quatro tons, do traço ao mais claro). */
const FELPA = ['#55636B', '#8E9DA6', '#C9D3D9', '#36414A'];

/** Altura do tampo da toalha dobrada (duas camadas), em cm. */
export const alturaDaToalha = () => 2 * obj('toalha', 'esp');

/** A toalha com o centro em (x, z) no chão: os volumes da conferência e a peça desenhada. */
export function toalha(x: number, z: number): { prims: Prim[]; peca: PecaPropria } {
  const larg = obj('toalha', 'larg'),
    comp = obj('toalha', 'comp') / 2,
    h = alturaDaToalha();
  const o: V3 = [x, h / 2, z];
  return {
    // `tapete`: o corpo encosta nela de propósito (a conferência não a conta como peça atravessada)
    prims: [{ t: 'caixa', ref: { o, x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }, meias: [larg / 2, h / 2, comp / 2], cls: 'tapete', vies: -50 }],
    peca: {
      t: 'propria',
      nome: 'toalha',
      fixa: [x, z],
      desenhar(C) {
        // a dobra fica do lado da cabeça; um friso marca a barra da toalha do lado dos pés
        C.prisma(retArred(larg, comp, 2.5, 3), [x, 0, z], [1, 0, 0], [0, 0, 1], [0, h, 0], FELPA);
        C.linha([x - larg / 2 + 1.5, h + 0.05, z + comp / 2 - 3], [x + larg / 2 - 1.5, h + 0.05, z + comp / 2 - 3], FELPA[0], 0.5);
      },
    },
  };
}

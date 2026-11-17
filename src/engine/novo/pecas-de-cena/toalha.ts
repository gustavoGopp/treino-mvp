// A toalha de mão dobrada em quatro no comprimento, sob os dois calcanhares, que desliza com eles no chão liso
// (flexão de joelho deslizante). As medidas vêm de ../dados/objetos/toalha.json. Ela anda com os calcanhares: fica
// centrada debaixo deles. Dobrada em quatro, fica com a largura inteira (40,6 cm, os dois calcanhares cabem) e um
// quarto do comprimento na direção em que desliza, com quatro camadas de felpa: de lado, ela tem espessura visível.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { retArred } from '../realista/base.mjs';
import { obj } from '../tabelas';
import type { V3 } from '../vec';

/** A cor da toalha: felpa azul-petróleo, em quatro tons (do traço ao mais claro), que se separa do chão cinza. */
const FELPA = ['#1F5B6B', '#3C8BA0', '#7CC0D2', '#123C47'];
/** Quantas camadas a toalha dobrada tem. */
const CAMADAS = 4;

/** Altura do tampo da toalha dobrada, em cm. */
export const alturaDaToalha = () => CAMADAS * obj('toalha', 'esp');

/** A toalha com o centro em (x, z) no chão: os volumes da conferência e a peça desenhada. */
export function toalha(x: number, z: number): { prims: Prim[]; peca: PecaPropria } {
  const larg = obj('toalha', 'larg'),
    comp = obj('toalha', 'comp') / CAMADAS,
    e = obj('toalha', 'esp'),
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
        // as dobras: a metade de baixo (duas camadas) um pouco mais longa que a de cima, com a borda arredondada do
        // tecido; um friso marca a barra na camada de cima
        C.prisma(retArred(larg, comp, 2.5, 4), [x, 0, z], [1, 0, 0], [0, 0, 1], [0, 2 * e, 0], FELPA);
        C.prisma(retArred(larg - 1, comp - 1.2, 2.5, 4), [x, 2 * e, z + 0.3], [1, 0, 0], [0, 0, 1], [0, 2 * e, 0], FELPA);
        C.linha([x - larg / 2 + 2, h + 0.05, z + comp / 2 - 3], [x + larg / 2 - 2, h + 0.05, z + comp / 2 - 3], FELPA[0], 0.6);
      },
    },
  };
}

// A bancada de cozinha (o apoio fixo na altura da cintura): o gabinete de base, o tampo que passa um pouco da frente
// e o rodapé recuado. Medidas na tabela de objetos (../dados/objetos/bancada.json). A frente da bancada fica virada
// para −z (para a pessoa); `zBeirada` é onde fica a beirada do tampo, do lado da pessoa.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { retArred } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { REF0 } from '../vec';
import type { V3 } from '../vec';

const b = (id: string) => obj('bancada', id);
const caixa = (o: V3, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { ...REF0, o }, meias, cls, vies });

/** A bancada com a beirada do tampo em z = zBeirada, centrada em x = 0. */
export function bancada(zBeirada: number): { prims: Prim[]; peca: PecaPropria } {
  const alt = b('altura'),
    esp = b('tampoEsp'),
    rod = b('rodape'),
    prof = b('prof'),
    bal = b('balanco'),
    recuo = b('rodapeRecuo'),
    larg = b('larg');
  const zFrente = zBeirada + bal;
  const prims: Prim[] = [
    caixa([0, alt - esp / 2, zBeirada + (prof + bal) / 2], [larg / 2, esp / 2, (prof + bal) / 2], 'esc', -40),
    caixa([0, rod + (alt - esp - rod) / 2, zFrente + prof / 2], [larg / 2, (alt - esp - rod) / 2, prof / 2], 'esc', -41),
    caixa([0, rod / 2, zFrente + recuo + (prof - recuo) / 2], [larg / 2, rod / 2, (prof - recuo) / 2], 'esc', -42),
  ];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'bancada',
    fixa: zBeirada,
    desenhar(C, M, o) {
      // um prisma de base retangular deitada (largura em x, profundidade em z), do pé até a altura h
      const bloco = (y0: number, h: number, z0: number, d: number, mat: string[], r = 0.4) => C.prisma(retArred(larg, d, r, 2), [0, y0, z0 + d / 2], [1, 0, 0], [0, 0, 1], [0, h, 0], mat);
      bloco(0, rod, zFrente + recuo, prof - recuo, M.borracha);
      bloco(rod, alt - esp - rod, zFrente, prof, M.metalClaro);
      bloco(alt - esp, esp, zBeirada, prof + bal, M.plataforma, 0.8);
      // a junta entre as duas portas do gabinete, na frente
      C.linha([0, rod + 2, zFrente - 0.05], [0, alt - esp - 2, zFrente - 0.05], M.metalClaro[3], 0.4);
      if (o.comSombra) C.sombra(0, zFrente + prof / 2, larg / 2, prof / 2 + 4, 0.16);
    },
  };
  return { prims, peca };
}

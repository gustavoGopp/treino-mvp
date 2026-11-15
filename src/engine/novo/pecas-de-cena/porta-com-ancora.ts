// A porta fechada com a âncora de porta embaixo: o ponto firme e baixo onde o elástico prende (flexão de joelho com
// elástico e, depois, os exercícios com elástico preso na porta). As medidas vêm de ../dados/objetos/porta.json.
// A espuma da âncora fica do lado de lá da porta; a fita passa pelo vão de baixo e faz uma alça do lado de cá, onde o
// tubo do elástico dá a volta. A porta é cenário (atrás do corpo e fora do enquadramento); a âncora não.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { MAT, retArred } from '../realista/base.mjs';
import { obj } from '../tabelas';
import type { V3 } from '../vec';

/** A porta pintada de branco, em quatro tons (do traço ao mais claro). */
const PORTA = ['#8C929A', '#C9CED4', '#EDEFF1', '#5E646C'];
/** A espuma da âncora (preta) e a fita (cinza). */
const ESPUMA = MAT.borracha;
const FITA = '#4A4F57';

const p = (id: string) => obj('porta', id);

/**
 * A porta com a face do lado de quem treina no plano z = `zFace` (a pessoa fica do lado de +z) e a âncora no meio da
 * largura. Devolve os volumes, as duas peças desenhadas e o ponto onde o tubo dá a volta (a ponta da alça).
 */
export function portaComAncora(zFace: number, alturaDaAlca: number): { prims: Prim[]; pecas: PecaPropria[]; alca: V3 } {
  const esp = p('esp'),
    alt = p('altura'),
    larg = p('larg'),
    vao = p('vao');
  const alca: V3 = [0, alturaDaAlca, zFace + p('alcaComp')];
  const espuma: V3 = [0, p('ancoraAlt') / 2, zFace - esp - p('ancoraLarg') / 2 - 0.5];
  const fita: V3[] = [[0, vao / 2, espuma[2] + p('ancoraLarg') / 2], [0, vao / 2, zFace], alca];
  const caixa = (o: V3, meias: V3, cls: string): Prim => ({ t: 'caixa', ref: { o, x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }, meias, cls, vies: -40 });
  return {
    alca,
    prims: [
      caixa([0, vao + alt / 2, zFace - esp / 2], [larg / 2, alt / 2, esp / 2], 'obj'),
      caixa(espuma, [p('ancoraComp') / 2, p('ancoraAlt') / 2, p('ancoraLarg') / 2], 'obj'),
      { t: 'fio', pts: fita, larg: 0.6, cls: 'cabo', vies: -1 },
    ],
    pecas: [
      {
        t: 'propria',
        nome: 'porta',
        cenario: true,
        fixa: [zFace],
        desenhar(C) {
          C.prisma(retArred(larg, alt, 1, 2), [0, vao + alt / 2, zFace - esp], [1, 0, 0], [0, 1, 0], [0, 0, esp], PORTA);
        },
      },
      {
        t: 'propria',
        nome: 'ancora',
        fixa: [zFace, alturaDaAlca],
        desenhar(C) {
          C.prisma(retArred(p('ancoraComp'), p('ancoraLarg'), 1.2, 3), [espuma[0], 0, espuma[2]], [1, 0, 0], [0, 0, 1], [0, p('ancoraAlt'), 0], ESPUMA);
          C.polilinha(fita, FITA, 0.9);
        },
      },
    ],
  };
}

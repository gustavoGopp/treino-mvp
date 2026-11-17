// A bancada de cozinha (o apoio fixo na altura da cintura): o gabinete de base, o tampo que passa um pouco da frente
// e o rodapé recuado. Medidas na tabela de objetos (../dados/objetos/bancada.json). A frente da bancada fica virada
// para −z (para a pessoa); `zBeirada` é onde fica a beirada do tampo, do lado da pessoa.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { mix } from '../realista/base.mjs';
import type { Material } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { REF0 } from '../vec';
import type { V3 } from '../vec';

const b = (id: string) => obj('bancada', id);
/** O laminado claro das portas e o tampo de pedra escura (quatro tons: sombra, meio, luz, traço). */
const LAMINADO: Material = ['#B4BAC1', '#CDD2D7', '#E6E9EC', '#7F8790'];
const PEDRA: Material = ['#2E3238', '#4A4F57', '#737A83', '#1B1D21'];
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
      const claro = o.tema === 'claro';
      const tom = (m: Material): Material => (claro ? m : m.map((t) => mix(t, '#aeb8c2', 0.3)));
      const PORTA = tom(LAMINADO),
        TAMPO = tom(PEDRA),
        Y: V3 = [0, 1, 0];
      // caixa em pé, de y0 a y1, centrada em (x, z), com largura `w` em x e profundidade `d` em z: as quatro faces de
      // pé são as laterais do prisma (as que o gerador sombreia pela luz)
      const caixaY = (x: number, z: number, y0: number, y1: number, w: number, d: number, mat: Material) => C.tubo([x, y0, z], [x, y1, z], w, d, mat, { up: [0, 0, 1] });
      // o rodapé recuado, escuro, e o corpo do gabinete
      caixaY(0, zFrente + recuo + (prof - recuo) / 2, 0, rod, larg - 1, prof - recuo, M.borracha);
      caixaY(0, zFrente + prof / 2, rod, alt - esp, larg, prof, PORTA);
      // a frente: uma gaveta em cima e duas portas, marcadas pelas juntas e por puxadores finos. Só aparecem quando a
      // frente da bancada está virada para quem olha (desenhadas como peças à parte, elas vazariam pelo lado)
      const frenteAVista = C.P([0, alt / 2, zFrente])[2] < C.P([0, alt / 2, zFrente + prof])[2] - 1;
      if (frenteAVista) {
        const yJunta = alt - esp - 15,
          zf = zFrente - 0.1,
          junta = PORTA[3]!;
        C.linha([-larg / 2 + 0.5, yJunta, zf], [larg / 2 - 0.5, yJunta, zf], junta, 0.5);
        C.linha([0, rod + 0.5, zf], [0, yJunta, zf], junta, 0.5);
        const puxa = (a2: V3, b2: V3) => C.cilindro(a2, b2, 0.6, M.cromo, { lados: 8 });
        puxa([-12, yJunta + 7.5, zFrente - 0.8], [12, yJunta + 7.5, zFrente - 0.8]);
        for (const s2 of [-1, 1]) puxa([s2 * 4, yJunta - 14, zFrente - 0.8], [s2 * 4, yJunta - 4, zFrente - 0.8]);
      }
      C.tubo([0, alt - esp / 2, zBeirada], [0, alt - esp / 2, zFrente + prof], larg + 2 * bal, esp, TAMPO, { up: Y });
      if (o.comSombra) C.sombra(0, zFrente + prof / 2, larg / 2, prof / 2 + 4, 0.16);
    },
  };
  return { prims, peca };
}

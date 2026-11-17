// A porta fechada com a âncora de porta presa no alto (no topo da porta) ou na altura da testa (no vão do lado da
// dobradiça): o ponto firme onde o elástico prende na puxada e no face pull com elástico. A porta (folha, batente e
// maçaneta) tem o desenho de ./porta-com-ancora.ts, que serve à porta atrás de quem está deitado; aqui a porta fica à
// frente de quem treina, de frente para ela. A espuma da âncora fica do lado de lá, e a fita passa pelo vão e faz uma
// alça do lado de cá, onde o tubo dá a volta. As medidas vêm de ../dados/objetos/porta.json. A porta e a âncora são
// cenário: ficam atrás do corpo e fora do enquadramento.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { MAT, retArred } from '../realista/base.mjs';
import { obj } from '../tabelas';
import type { V3 } from '../vec';

/** A folha pintada de branco e o batente em madeira clara (os tons de ./porta-com-ancora.ts). */
const FOLHA = ['#8C929A', '#C9CED4', '#EDEFF1', '#5E646C'];
const BATENTE = ['#7A6650', '#A88F72', '#D2BDA2', '#4F4232'];
const FITA = '#4A4F57';
const p = (id: string) => obj('porta', id);

/**
 * A porta com a face do lado de quem treina em z = `zFace`, e quem treina do lado de −z (olhando para +z, de frente
 * para a porta). `alturaDaAlca`: a altura da ponta da alça. Com `noTopo`, a fita passa por cima da folha e a espuma
 * fica do lado de lá, logo abaixo do topo, no meio da largura; sem, a fita passa pelo vão do lado da dobradiça, na
 * altura da alça, e `xFita` diz onde fica esse vão (a porta se desloca em x para isso). Com `atras`, a porta fica
 * atrás de quem treina (de costas para ela, como no crucifixo com elástico): quem treina fica do lado de +z, e a folha,
 * a espuma e a maçaneta se espelham em z em volta de `zFace` (sem `atras`, tudo fica como era).
 */
export function portaComAncoraNoAlto(zFace: number, alturaDaAlca: number, noTopo: boolean, xFita = 0, atras = false): { prims: Prim[]; pecas: PecaPropria[]; alca: V3 } {
  /** O lado de lá da porta em z: +1 (quem treina olha para +z) ou −1 (a porta atrás de quem treina). */
  const sz = atras ? -1 : 1;
  const esp = p('esp'),
    alt = p('altura'),
    larg = p('larg'),
    vao = p('vao'),
    bl = p('batenteLarg'),
    bp = p('batenteProf');
  const topo = vao + alt;
  // o meio da folha em x: no topo, a âncora fica no meio; no vão da dobradiça, a borda da folha fica em xFita
  const x0 = noTopo ? xFita : xFita + larg / 2;
  const alca: V3 = [xFita, alturaDaAlca, zFace - sz * 1.2];
  const zLa = zFace + sz * esp;
  const espuma: V3 = noTopo ? [xFita, topo - p('ancoraLarg') / 2 - 0.5, zLa + (sz * p('ancoraAlt')) / 2] : [xFita - p('ancoraAlt') / 2, alturaDaAlca, zLa + (sz * p('ancoraLarg')) / 2];
  const fita: V3[] = noTopo
    ? [[xFita, espuma[1], zLa + sz * 0.3], [xFita, topo + 0.3, zLa], [xFita, topo + 0.3, zFace], [xFita, topo - 1, zFace - sz * 0.5], alca]
    : [[xFita, alturaDaAlca, zLa + sz * 0.3], [xFita, alturaDaAlca, zFace - sz * 0.5], alca];
  return {
    alca,
    prims: [{ t: 'caixa', ref: { o: [x0, vao + alt / 2, zFace + (sz * esp) / 2], x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] }, meias: [larg / 2, alt / 2, esp / 2], cls: 'obj', vies: -40 }, { t: 'fio', pts: fita, larg: 0.6, cls: 'cabo', vies: -1 }],
    pecas: [
      {
        t: 'propria',
        nome: 'porta',
        cenario: true,
        fixa: [zFace, x0, sz],
        desenhar(C) {
          // o batente (dois montantes e a travessa), um pouco mais fundo que a folha, e a folha
          for (const s of [-1, 1]) C.prisma(retArred(bl, topo + bl, 0.4, 1), [x0 + s * (larg / 2 + bl / 2), (topo + bl) / 2, zFace - sz * 0.5], [1, 0, 0], [0, 1, 0], [0, 0, sz * (bp / 2 + esp / 2 + 0.5)], BATENTE);
          C.prisma(retArred(larg + 2 * bl, bl, 0.4, 1), [x0, topo + bl / 2, zFace - sz * 0.5], [1, 0, 0], [0, 1, 0], [0, 0, sz * (bp / 2 + esp / 2 + 0.5)], BATENTE);
          C.prisma(retArred(larg, alt, 1, 2), [x0, vao + alt / 2, zFace], [1, 0, 0], [0, 1, 0], [0, 0, sz * esp], FOLHA);
          // a maçaneta, do lado de cá, do lado oposto às dobradiças
          const xm = x0 + larg / 2 - p('macanetaDaBorda'),
            ym = p('macanetaAltura');
          C.cilindro([xm, ym, zFace], [xm, ym, zFace - sz * 1], 2.6, MAT.cromo, { lados: 14 });
          C.cilindro([xm, ym, zFace - sz * 1], [xm, ym, zFace - sz * 5.5], 0.9, MAT.cromo, { lados: 10 });
          C.cilindro([xm, ym, zFace - sz * 5.5], [xm - 11, ym, zFace - sz * 5.5], 0.9, MAT.cromo, { lados: 10 });
        },
      },
      {
        t: 'propria',
        nome: 'ancora',
        cenario: true,
        fixa: [zFace, alturaDaAlca, noTopo, xFita, sz],
        desenhar(C) {
          if (noTopo) C.prisma(retArred(p('ancoraComp'), p('ancoraLarg'), 1.2, 3), [espuma[0], espuma[1], zLa], [1, 0, 0], [0, 1, 0], [0, 0, sz * p('ancoraAlt')], MAT.borracha);
          else C.prisma(retArred(p('ancoraComp'), p('ancoraLarg'), 1.2, 3), [espuma[0] - p('ancoraAlt') / 2, espuma[1], espuma[2]], [0, 1, 0], [0, 0, sz], [p('ancoraAlt'), 0, 0], MAT.borracha);
          C.polilinha(fita, FITA, 0.9);
        },
      },
    ],
  };
}

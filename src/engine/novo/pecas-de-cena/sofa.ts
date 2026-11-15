// Peça de cena: o sofá que prende os calcanhares no nórdico (docs/pesquisa/animacoes/nordico.md: "calcanhares presos
// sob o assento de um sofá"). As medidas são as da tabela (../dados/objetos/sofa.json, um sofá de três lugares com pés,
// com a altura livre debaixo dele na ficha do fabricante). Não há cartão do sofá no app (ele não é equipamento da
// lista); o desenho segue o dos bancos e da cadeira: o mesmo gerador realista, a estrutura e as almofadas com costura,
// os pés retos, num cinza de tecido que não disputa com o corpo. O sofá fica de frente para a pessoa (a frente em +z).
// Só o braço do lado de lá é desenhado: o de cá, de perfil, cobriria os calcanhares e o assento inteiros.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import type { PecaPropria } from '../pecas';
import { mix } from '../realista/base.mjs';
import type { CenaRealista, Material } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { REF0 } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('sofa', id);
/** O tecido (quatro tons: sombra, meio, luz, traço), clareado no tema escuro como o grafite. */
const TECIDO: Material = ['#4A505C', '#737B89', '#A0A7B4', '#2B2F37'];
const PES: Material = ['#2A2420', '#4A3F37', '#6E6056', '#16120F'];
const tom = (m: Material, tema: 'claro' | 'escuro'): Material => (tema === 'claro' ? m : m.map((t) => mix(t, '#aeb8c2', 0.3)));

/** Onde o sofá fica: o meio da frente (x0) e o z da frente da estrutura (o lado virado para a pessoa). */
export interface Sofa {
  x0: number;
  zFrente: number;
}
function partes(s: Sofa) {
  const debaixo = g('alturaDebaixo'),
    assento = g('assentoAltura'),
    almofada = g('almofadaEsp'),
    base = assento - almofada,
    zFundo = s.zFrente - g('prof'),
    zEncosto = s.zFrente - g('assentoProf'),
    larg = g('larg') / 2;
  return { debaixo, assento, almofada, base, zFundo, zEncosto, larg, pe: g('peLado') };
}
/** A parte de baixo da estrutura (onde os calcanhares encostam): a altura e a borda da frente. */
export const debaixoDoSofa = (s: Sofa) => ({ y: g('alturaDebaixo'), zFrente: s.zFrente });

export function sofa(s: Sofa): { prims: Prim[]; peca: PecaPropria } {
  const P = partes(s);
  const caixa = (o: V3, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { ...REF0, o }, meias, cls, vies });
  const zMeio = (s.zFrente + P.zFundo) / 2,
    meiaProf = (s.zFrente - P.zFundo) / 2;
  // para a conferência: a estrutura (de baixo dela até o assento), a almofada do assento e o encosto
  const prims: Prim[] = [
    caixa([s.x0, (P.debaixo + P.base) / 2, zMeio], [P.larg, (P.base - P.debaixo) / 2, meiaProf], 'obj', -40),
    caixa([s.x0, P.base + P.almofada / 2, (s.zFrente + P.zEncosto) / 2], [P.larg, P.almofada / 2, (s.zFrente - P.zEncosto) / 2], 'estofado', -40),
    caixa([s.x0, (P.base + g('encostoAltura')) / 2, (P.zEncosto + P.zFundo) / 2], [P.larg, (g('encostoAltura') - P.base) / 2, (P.zEncosto - P.zFundo) / 2], 'obj', -40),
  ];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'sofa',
    fixa: s,
    desenhar(C: CenaRealista, _M: Materiais, o) {
      const T = tom(TECIDO, o.tema),
        W = tom(PES, o.tema);
      const Y: V3 = [0, 1, 0],
        X: V3 = [1, 0, 0],
        Z: V3 = [0, 0, 1];
      const xL = s.x0 + P.larg;
      // os pés, nos quatro cantos; pintados atrás do corpo (como o assento do banco regulável): de lado, o pé do sofá
      // do lado de cá cairia em cima dos pés da pessoa, que ficam no meio do sofá, debaixo dele
      for (const sx of [-1, 1])
        for (const z of [s.zFrente - P.pe / 2 - 3, P.zFundo + P.pe / 2 + 3]) C.tubo([s.x0 + sx * (P.larg - P.pe / 2 - 3), 0, z], [s.x0 + sx * (P.larg - P.pe / 2 - 3), P.debaixo, z], P.pe, P.pe, W, { up: Z, dz: 400 });
      // a estrutura: a base inteira, do debaixo até o assento, e o encosto atrás
      C.tubo([s.x0, (P.debaixo + P.base) / 2, s.zFrente], [s.x0, (P.debaixo + P.base) / 2, P.zFundo], 2 * P.larg, P.base - P.debaixo, T, { up: Y });
      const alto = g('encostoAltura'),
        meioEnc = (P.zEncosto + P.zFundo) / 2;
      C.tubo([s.x0, P.base, meioEnc], [s.x0, alto, meioEnc], 2 * P.larg, P.zEncosto - P.zFundo, T, { up: Z });
      // as almofadas: a do assento e a do encosto (inclinada, encostada na estrutura)
      C.estofado([s.x0, P.base, (s.zFrente + P.zEncosto) / 2], Z, Y, X, s.zFrente - P.zEncosto, P.almofada, 2 * P.larg - 2 * g('bracoLarg'), T);
      const topo = g('alturaComAlmofadas'),
        esp = 16;
      const pe0: V3 = [s.x0, P.assento - 2, P.zEncosto + esp * 0.6],
        pe1: V3 = [s.x0, topo, P.zEncosto - 4];
      const ao: V3 = [0, pe1[1] - pe0[1], pe1[2] - pe0[2]];
      const n = Math.hypot(ao[1], ao[2]);
      const dir: V3 = [0, ao[1] / n, ao[2] / n];
      C.estofado([s.x0, (pe0[1] + pe1[1]) / 2, (pe0[2] + pe1[2]) / 2], dir, [0, -dir[2], dir[1]], X, n, esp, 2 * P.larg - 2 * g('bracoLarg'), T);
      // o braço do lado de lá
      C.tubo([xL - g('bracoLarg') / 2, P.debaixo, (s.zFrente + P.zFundo) / 2], [xL - g('bracoLarg') / 2, g('bracoAltura'), (s.zFrente + P.zFundo) / 2], g('bracoLarg'), s.zFrente - P.zFundo, T, { up: Z });
      if (o.comSombra) C.sombra(s.x0, zMeio, P.larg + 4, meiaProf + 6, 0.16);
    },
  };
  return { prims, peca };
}

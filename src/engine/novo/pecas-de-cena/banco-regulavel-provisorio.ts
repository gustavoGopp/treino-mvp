// Peça de cena PROVISÓRIA: o banco regulável com o encosto erguido, para o desenvolvimento sentado. Nesta rodada outro
// colega desenha a peça definitiva do banco regulável num ramo que este lote não vê; quem integra troca esta pela dele
// (as medidas são as mesmas: a tabela de objetos, `bancoRegulavel`, e os volumes da conferência são os de
// ../pecas.ts, `bancoRegulavel`). O desenho segue o do banco reto (./equipamento.ts): estofado com costura no gerador
// realista, estrutura em tubo de aço, pés de borracha.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import { bancoRegulavel } from '../pecas';
import type { PecaPropria } from '../pecas';
import type { CenaRealista } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, mul } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('bancoRegulavel', id);
const rad = Math.PI / 180;
/** Quanto o assento e o que fica debaixo dele vão para trás na pintura (cm): a pessoa senta por cima. */
const ATRAS = 30;

/** Onde fica o banco: o meio (x0, z0) e o ângulo do encosto (graus da horizontal). O assento fica na ponta de +z. */
export interface BancoRegulavel {
  x0: number;
  z0: number;
  encosto: number;
}
/** A dobradiça (o meio do vão entre assento e encosto, na face de baixo do estofado), como em ../pecas.ts. */
export function dobradica(b: BancoRegulavel): V3 {
  return [b.x0, g('altura') - g('estofado'), b.z0 + g('estofadoComp') / 2 - g('assentoComp') - g('vao') / 2];
}
/**
 * A face do encosto em que as costas apoiam: um ponto dela e a normal (para a frente e para cima). Um ponto p está
 * `dot(p − ponto, normal)` cm à frente da face.
 */
export function faceDoEncosto(b: BancoRegulavel): { ponto: V3; normal: V3; dir: V3; comp: number } {
  const a = b.encosto * rad;
  const normal: V3 = [0, Math.cos(a), Math.sin(a)];
  const base = add(dobradica(b), [0, 0, -g('vao') / 2]);
  return { ponto: add(base, mul(normal, g('estofado'))), normal, dir: [0, Math.sin(a), -Math.cos(a)], comp: g('estofadoComp') - g('assentoComp') };
}

export function bancoRegulavelProvisorio(b: BancoRegulavel): { prims: Prim[]; peca: PecaPropria } {
  const prims = bancoRegulavel(b.x0, b.z0, b.encosto);
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'banco-regulavel',
    fixa: b,
    desenhar(C: CenaRealista, M: Materiais, o) {
      const Y: V3 = [0, 1, 0],
        X: V3 = [1, 0, 0];
      const est = g('estofado'),
        larg = g('larg'),
        tubo = g('tubo'),
        vao = g('vao');
      const D = dobradica(b);
      const a = b.encosto * rad;
      const F = faceDoEncosto(b);
      // as duas almofadas, cada uma a partir da dobradiça: o assento deitado (+z) e o encosto erguido (−z)
      // o assento fica debaixo das coxas: vai para trás na pintura, para as coxas (de frente) ficarem por cima dele
      C.estofado(add(D, [0, 0, vao / 2 + g('assentoComp') / 2]), [0, 0, 1], Y, X, g('assentoComp'), est, larg, M.estofado, { dz: ATRAS });
      const dE: V3 = [0, Math.sin(a), -Math.cos(a)];
      C.estofado(add(add(D, [0, 0, -vao / 2]), mul(dE, F.comp / 2)), dE, F.normal, X, F.comp, est, larg);
      // estrutura: a viga do chão, o pé de trás (largo), o pé da frente, a coluna sob a dobradiça e a haste do encosto
      const base = g('baseComp'),
        baseL = g('baseLarg') / 2;
      const zF = b.z0 + base / 2 - tubo / 2,
        zT = b.z0 - base / 2 + tubo / 2;
      C.tubo([b.x0, tubo / 2, zT], [b.x0, tubo / 2, zF], tubo, tubo, M.metal);
      C.tubo([b.x0 - baseL, tubo / 2, zT], [b.x0 + baseL, tubo / 2, zT], tubo, tubo, M.metal);
      C.tubo([b.x0 - baseL * 0.55, tubo / 2, zF], [b.x0 + baseL * 0.55, tubo / 2, zF], tubo, tubo, M.metal);
      for (const [sx, z, l] of [[-1, zT, baseL], [1, zT, baseL], [-1, zF, baseL * 0.55], [1, zF, baseL * 0.55]] as [number, number, number][])
        C.cilindro([b.x0 + sx * (l - 2), 0, z], [b.x0 + sx * (l - 2), 1.2, z], 3.2, M.borracha, { lados: 10 });
      C.tubo([b.x0, tubo, D[2] + 6], [b.x0, D[1] - 1, D[2] + 6], tubo, tubo, M.metal, { dz: ATRAS });
      C.tubo([b.x0, D[1] - tubo / 2, D[2] - 8], [b.x0, D[1] - tubo / 2, D[2] + g('assentoComp') - 4], tubo, tubo * 0.8, M.metal, { dz: ATRAS });
      const apoio: V3 = [b.x0, D[1] + Math.sin(a) * F.comp * 0.55 - 2, D[2] - Math.cos(a) * F.comp * 0.55 - 2];
      const pe: V3 = [b.x0, tubo, Math.max(zT + tubo, apoio[2] - 4)];
      C.tubo(pe, apoio, tubo * 0.8, tubo * 0.8, M.metal);
      if (o.comSombra) C.sombra(b.x0, b.z0, baseL, base / 2 + 6, 0.18);
    },
  };
  return { prims, peca };
}

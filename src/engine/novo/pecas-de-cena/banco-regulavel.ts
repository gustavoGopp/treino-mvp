// Peça de cena: o banco regulável com o encosto erguido (desenvolvimento sentado, rosca inclinada). As medidas são as
// da tabela de objetos (`bancoRegulavel` em ../dados/objetos.json) e os volumes simples da conferência são os de
// ../pecas.ts (`bancoRegulavel`). O desenho segue o do banco reto (../equipamento.ts): estofado com costura no gerador
// realista, estrutura em tubo de aço, pés de borracha. Junta os dois desenhos provisórios do lote 5 (o do
// desenvolvimento e o da rosca inclinada): fica o do desenvolvimento, em que o assento é pintado atrás das coxas (de
// frente, as coxas ficam por cima dele), com o trilho debaixo do encosto do outro.
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
const ATRAS = 50;

/** Onde fica o banco: o meio (x0, z0) e o ângulo do encosto (graus da horizontal). O assento fica na ponta de +z. */
export interface BancoRegulavel {
  x0: number;
  z0: number;
  encosto: number;
  /**
   * Opcional (supino inclinado): desenha, de lado, o ângulo do encosto (a linha do chão tracejada a partir da dobradiça,
   * o arco até o encosto e o número em graus). Sem o campo, o desenho é o de antes.
   */
  marcaDoAngulo?: boolean;
  /**
   * Opcional (remada apoiada): para onde o encosto sobe. −1 (o padrão, sem o campo): para −z, com o assento na ponta de
   * +z, como sempre foi. +1: o banco inteiro girado meia volta em torno da vertical que passa por (x0, z0): o encosto
   * sobe para +z e o assento fica na ponta de −z (a pessoa de bruços no encosto olha para +z).
   */
  sobe?: 1 | -1;
}
/** Meia volta em torno da vertical por (x0, z0), quando o encosto sobe para +z; senão, nada. */
const girado = (b: BancoRegulavel) => b.sobe === 1;
export function noBanco(b: BancoRegulavel, p: V3): V3 {
  return girado(b) ? [2 * b.x0 - p[0], p[1], 2 * b.z0 - p[2]] : p;
}
export function direcaoNoBanco(b: BancoRegulavel, v: V3): V3 {
  return girado(b) ? [-v[0], v[1], -v[2]] : v;
}
/** A dobradiça (o meio do vão entre assento e encosto, na face de baixo do estofado), como em ../pecas.ts. */
export function dobradica(b: BancoRegulavel): V3 {
  return noBanco(b, [b.x0, g('altura') - g('estofado'), b.z0 + g('estofadoComp') / 2 - g('assentoComp') - g('vao') / 2]);
}
/** A dobradiça antes da meia volta (as contas do desenho e dos volumes são feitas assim e giradas no fim). */
const dobradicaSemGiro = (b: BancoRegulavel): V3 => [b.x0, g('altura') - g('estofado'), b.z0 + g('estofadoComp') / 2 - g('assentoComp') - g('vao') / 2];
/**
 * A face do encosto em que as costas apoiam: um ponto dela e a normal (para a frente e para cima). Um ponto p está
 * `dot(p − ponto, normal)` cm à frente da face.
 */
export function faceDoEncosto(b: BancoRegulavel): { ponto: V3; normal: V3; dir: V3; comp: number } {
  const a = b.encosto * rad;
  const normal: V3 = [0, Math.cos(a), Math.sin(a)];
  const base = add(dobradicaSemGiro(b), [0, 0, -g('vao') / 2]);
  return { ponto: noBanco(b, add(base, mul(normal, g('estofado')))), normal: direcaoNoBanco(b, normal), dir: direcaoNoBanco(b, [0, Math.sin(a), -Math.cos(a)]), comp: g('estofadoComp') - g('assentoComp') };
}

/**
 * A geometria do banco: a dobradiça, a direção do encosto (subindo, para −z), a normal da face de cima dele e o pé de
 * cada almofada (o centro da face de baixo, junto ao vão).
 */
export function geometriaDoBanco(b: BancoRegulavel) {
  const est = g('estofado'),
    alt = g('altura'),
    compAssento = g('assentoComp'),
    compEncosto = g('estofadoComp') - compAssento;
  const D = dobradicaSemGiro(b);
  const a = b.encosto * rad;
  const d: V3 = direcaoNoBanco(b, [0, Math.sin(a), -Math.cos(a)]),
    n: V3 = direcaoNoBanco(b, [0, Math.cos(a), Math.sin(a)]);
  const baseEncosto: V3 = noBanco(b, [b.x0, D[1], D[2] - g('vao') / 2]);
  const baseAssento: V3 = noBanco(b, [b.x0, D[1], D[2] + g('vao') / 2]);
  const Dg = noBanco(b, D);
  return { est, alt, compAssento, compEncosto, zDobra: Dg[2], yDobra: Dg[1], d, n, baseEncosto, baseAssento, topoDoAssento: alt };
}

/** Um volume simples da conferência depois da meia volta do banco. */
function girarPrim(b: BancoRegulavel, p: Prim): Prim {
  if (p.t === 'caixa') return { ...p, ref: { o: noBanco(b, p.ref.o), x: direcaoNoBanco(b, p.ref.x), y: direcaoNoBanco(b, p.ref.y), z: direcaoNoBanco(b, p.ref.z) } };
  if (p.t === 'volume') return { ...p, vol: { ...p.vol, aneis: p.vol.aneis.map((an) => ({ ...an, c: noBanco(b, an.c), x: direcaoNoBanco(b, an.x), z: direcaoNoBanco(b, an.z) })) } };
  throw new Error(`banco regulável girado: volume "${p.t}" sem giro`);
}
/**
 * A cena realista vista pelo banco girado: os pontos e as direções que o desenho passa são girados meia volta antes
 * de chegar à cena de verdade (só o que o desenho do banco usa).
 */
function cenaGirada(C: CenaRealista, b: BancoRegulavel): CenaRealista {
  if (!girado(b)) return C;
  const P = (p: V3) => noBanco(b, p),
    V = (v: V3) => direcaoNoBanco(b, v);
  const op = <T extends { up?: V3 } | undefined>(o: T): T => (o && o.up ? { ...o, up: V(o.up) } : o);
  return {
    ...C,
    P: (p) => C.P(P(p)),
    tubo: (a, c, w, h, mat, o) => C.tubo(P(a), P(c), w, h, mat, op(o)),
    cilindro: (a, c, r, mat, o) => C.cilindro(P(a), P(c), r, mat, op(o)),
    estofado: (base, ao, normal, lado, comp, esp, larg, mat, o) => C.estofado(P(base), V(ao), V(normal), V(lado), comp, esp, larg, mat, op(o)),
    sombra: (cx, cz, rx, rz, op2) => {
      const q = P([cx, 0, cz]);
      C.sombra(q[0], q[2], rx, rz, op2);
    },
  };
}

export function bancoRegulavelNaCena(b: BancoRegulavel): { prims: Prim[]; peca: PecaPropria } {
  const prims = bancoRegulavel(b.x0, b.z0, b.encosto).map((p) => (girado(b) ? girarPrim(b, p) : p));
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'banco-regulavel',
    fixa: b,
    desenhar(C0: CenaRealista, M: Materiais, o) {
      const C = cenaGirada(C0, b);
      const Y: V3 = [0, 1, 0],
        X: V3 = [1, 0, 0];
      const est = g('estofado'),
        larg = g('larg'),
        tubo = g('tubo'),
        vao = g('vao');
      const D = dobradicaSemGiro(b);
      const a = b.encosto * rad;
      const F = faceDoEncosto({ ...b, sobe: undefined });
      // as duas almofadas, cada uma a partir da dobradiça: o assento deitado (+z) e o encosto erguido (−z)
      // o assento fica debaixo das coxas: vai para trás na pintura, para as coxas (de frente) ficarem por cima dele
      C.estofado(add(D, [0, 0, vao / 2 + g('assentoComp') / 2]), [0, 0, 1], Y, X, g('assentoComp'), est, larg, M.estofado, { dz: ATRAS });
      const dE: V3 = [0, Math.sin(a), -Math.cos(a)];
      // girado (a pessoa de bruços em cima do encosto), quando a câmera olha de trás da pessoa, o encosto e o que fica
      // debaixo dele vão para trás na pintura: o corpo está por cima dele (sem isso, de trás, o estofado cobria as costas)
      const deTras = girado(b) && C0.P([0, 0, 1])[2] > C0.P([0, 0, 0])[2] + 0.1;
      const sob = deTras ? { dz: 400 } : {};
      C.estofado(add(add(D, [0, 0, -vao / 2]), mul(dE, F.comp / 2)), dE, F.normal, X, F.comp, est, larg, undefined, sob);
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
      // o trilho debaixo do encosto, onde a haste apoia
      const debaixo = (t: number): V3 => add(add(add(D, [0, 0, -vao / 2]), mul(dE, t)), mul(F.normal, -tubo / 2));
      C.tubo(debaixo(4), debaixo(F.comp * 0.8), tubo * 0.8, tubo * 0.8, M.metal, { up: X, ...sob });
      C.tubo(pe, apoio, tubo * 0.8, tubo * 0.8, M.metal, sob);
      if (o.comSombra) C.sombra(b.x0, b.z0, baseL, base / 2 + 6, 0.18);
      if (b.marcaDoAngulo) marcarOAngulo(C, b);
    },
  };
  return { prims, peca };
}

/**
 * O ângulo do encosto, de lado: da dobradiça, uma linha tracejada na horizontal (para o lado do encosto), o arco até a
 * face de baixo do encosto e o número em graus. Só nas vistas em que o banco aparece de perfil (nas outras o arco vira
 * um traço). O texto usa a classe dos rótulos de técnica (cor e contorno do tema).
 */
function marcarOAngulo(C: CenaRealista, b: BancoRegulavel): void {
  const D = dobradicaSemGiro(b);
  const a = b.encosto * rad;
  const tela = (p: V3) => C.P(p);
  const z0 = tela(D),
    z1 = tela(add(D, [0, 0, -1]));
  if (Math.hypot(z1[0] - z0[0], z1[1] - z0[1]) < 0.7) return;
  const r = Math.min(24, (g('estofadoComp') - g('assentoComp')) * 0.25);
  const pts = (P: V3[]) => P.map((p) => { const q = tela(p); return `${Math.round(q[0] * 10) / 10},${Math.round(q[1] * 10) / 10}`; }).join(' ');
  const arco: V3[] = [];
  for (let i = 0; i <= 12; i++) {
    const t = (a * i) / 12;
    arco.push(add(D, [0, Math.sin(t) * r, -Math.cos(t) * r]));
  }
  // o número fica logo acima da ponta da linha tracejada, do lado de fora do arco
  const txt = tela(add(D, [0, 1.5, -(r + 4)]));
  const svg = `<polyline class="n-guia-l" points="${pts([D, add(D, [0, 0, -(r + 8)])])}"/><polyline class="n-guia-l n-guia-cheia" points="${pts(arco)}"/>` +
    `<text class="n-rot-t" font-size="7" text-anchor="middle" x="${Math.round(txt[0] * 10) / 10}" y="${Math.round(txt[1] * 10) / 10}">${b.encosto}°</text>`;
  C.bruto(z0[2] - 20, svg);
}

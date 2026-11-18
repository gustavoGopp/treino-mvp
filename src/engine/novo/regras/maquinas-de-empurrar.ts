// Regras medidas das máquinas de empurrar sentado (o supino na máquina e o desenvolvimento na máquina,
// ../exercicios/maquina-de-empurrar.ts). As marcas que o quadro dá: `pegadorR` e `pegadorL` (o centro da borracha de
// cada pegador), `eixoR` e `eixoDirR` (um ponto do eixo do braço direito e a direção dele), `regulagem` ([altura do
// assento, ângulo inicial, ângulo final]) e, no supino, `peito` ([altura da linha do meio do peito, 0, 0]). A pilha que
// sobe com o braço, o glúteo no assento e as costas no encosto são as regras das cadeiras (./cadeiras.ts), com as
// mesmas marcas.
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { angulo, dist, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

/** A distância (cm) de um ponto à linha do eixo. */
const aoEixo = (p: V3, o: V3, d: V3) => {
  const v = sub(p, o);
  return Math.hypot(...sub(v, mul(d, dot(v, d))));
};

export const REGRAS_MAQUINAS_DE_EMPURRAR: Record<string, Regra> = {
  'maquina-maos-nos-pegadores': (q) => {
    const d = Math.max(...q.flatMap((x) => [dist(x.esq.lado.R.pegada, x.marcas.pegadorR!), dist(x.esq.lado.L.pegada, x.marcas.pegadorL!)]));
    const falta = Math.max(...q.map((x) => Math.max(x.esq.lado.R.falta.braco, x.esq.lado.L.falta.braco)));
    return { medido: `as mãos ficam a no máximo ${f1(d)} cm do meio dos pegadores (falta de alcance: ${f1(falta)} cm)`, ok: d <= 0.5 && falta <= 0.05 };
  },
  'maquina-pegador-no-arco': (q) => {
    // o pegador (e a mão com ele) fica sempre à mesma distância do eixo do braço: anda num arco, e não numa reta
    const r = faixa(q.map((x) => aoEixo(x.marcas.pegadorR!, x.marcas.eixoR!, norm(x.marcas.eixoDirR!))));
    const a = q[0]!.marcas.pegadorR!,
      b = q[q.length - 1]!.marcas.pegadorR!;
    // quanto o caminho se afasta da reta entre o começo e o fim (a flecha do arco)
    const reta = norm(sub(b, a));
    const flecha = Math.max(...q.map((x) => aoEixo(x.marcas.pegadorR!, a, reta)));
    return {
      medido: `a mão direita anda ${f1(b[2] - a[2])} cm para a frente, ${f1(b[1] - a[1])} cm para cima e ${f1(Math.abs(b[0]) - Math.abs(a[0]))} cm para fora, num arco de raio ${f1(r[0])} a ${f1(r[1])} cm em volta do eixo do braço (flecha de ${f1(flecha)} cm)`,
      ok: r[1] - r[0] <= 0.1 && flecha >= 0.5,
    };
  },
  'maquina-pegadores-convergem': (q) => {
    const a = q[0]!.marcas.pegadorR!,
      b = q[q.length - 1]!.marcas.pegadorR!;
    return { medido: `as mãos ficam a ${f1(2 * Math.abs(a[0]))} cm uma da outra embaixo e a ${f1(2 * Math.abs(b[0]))} cm em cima`, ok: Math.abs(b[0]) < Math.abs(a[0]) };
  },
  'maquina-quase-estende-os-cotovelos': (q) => {
    const L = q[q.length - 1]!.esq.lado;
    const c = Math.min(L.R.ang.cotovelo, L.L.ang.cotovelo);
    return { medido: `em cima, o cotovelo ainda dobra ${f1(c)}°`, ok: c >= 5 && c <= 20 };
  },
  'supino-maquina-pegador-na-linha-do-peito': (q) => {
    const x = q[0]!;
    const d = x.marcas.pegadorR![1] - x.marcas.peito![0]!;
    return { medido: `embaixo, o centro da mão fica ${f1(Math.abs(d))} cm ${d >= 0 ? 'acima' : 'abaixo'} da linha do meio do peito (com o assento a ${f1(x.marcas.regulagem![0]!)} cm do chão)`, ok: Math.abs(d) <= 2 };
  },
  'supino-maquina-cotovelos-30-60': (q) => {
    // o braço visto de frente para o peito: o ângulo entre o úmero (projetado no plano do peito) e o tronco, para baixo
    const x = q[0]!.esq;
    const L = x.lado.R;
    const u = norm(sub(L.cotovelo, L.ombro));
    const noPlano = sub(u, mul(x.torax.z, dot(u, x.torax.z)));
    const a = angulo(noPlano, mul(x.torax.y, -1));
    const atras = -dot(u, x.torax.z);
    return { medido: `embaixo, o braço faz ${f1(a)}° com o tronco, visto de frente para o peito (o cotovelo ${f1(Math.asin(Math.min(1, Math.abs(atras))) / (Math.PI / 180))}° ${atras >= 0 ? 'atrás' : 'à frente'} do plano do peito)`, ok: a >= 30 && a <= 60 };
  },
  'desenvolvimento-maquina-em-cima-sobre-os-ombros': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const d = Math.hypot(L.pegada[0] - L.ombro[0], L.pegada[2] - L.ombro[2]);
    return { medido: `em cima, o centro da mão fica a ${f1(d)} cm da vertical do ombro`, ok: d <= 8 };
  },
};

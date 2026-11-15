// As regras medidas das flexões de joelho deitado (deslizante, com elástico e, depois, na suspensão). Cada uma mede a
// superfície do Boneco (e não a aproximação que o núcleo usa para pôr o corpo no chão).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { angulo, dist, sub } from '../vec';
import type { V3 } from '../vec';

/** O ponto mais baixo (y) de cada parte do Boneco. */
function maisBaixos(e: Esq): Record<string, number> {
  const out: Record<string, number> = {};
  for (const { p, parte } of pontosDoBoneco(e)) out[parte] = Math.min(out[parte] ?? 1e9, p[1]);
  return out;
}
const lado = (v: V3): V3 => [0, v[1], v[2]];
/** De lado, o ângulo no quadril entre o ombro e o joelho (180 = em linha). */
const linhaOmbroJoelho = (e: Esq) => angulo(lado(sub(e.lado.R.ombro, e.lado.R.quadril)), lado(sub(e.lado.R.joelho, e.lado.R.quadril)));
/** O ponto mais baixo do pé direito, em cm. */
function peMaisBaixo(e: Esq): number {
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'pe' && p[0] < 0) m = Math.min(m, p[1]);
  return m;
}

export const REGRAS_FLEXAO_JOELHO: Record<string, Regra> = {
  'quadril-fora-do-chao': (q) => {
    const [a, b] = faixa(q.map((x) => maisBaixos(x.esq).pelve!));
    return { medido: `a pele do glúteo fica de ${f1(a)} a ${f1(b)} cm do chão`, ok: a >= 1 };
  },
  'ombros-e-cabeca-no-chao': (q) => {
    const m = q.map((x) => maisBaixos(x.esq));
    const [ta, tb] = faixa(m.map((x) => x.tronco!)),
      [ca, cb] = faixa(m.map((x) => x.cabeca!));
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.ombro, q[0]!.esq.lado.R.ombro)));
    return {
      medido: `o ponto mais baixo das costas fica de ${f1(ta)} a ${f1(tb)} cm do chão e o da cabeça de ${f1(ca)} a ${f1(cb)} cm; o centro do ombro anda ${f1(anda)} cm`,
      ok: ta >= -1.5 && tb <= 1 && ca >= -1.5 && cb <= 1 && anda <= 2,
    };
  },
  'em-linha-no-fim': (q) => {
    const fim = q[q.length - 1]!.esq;
    return { medido: `no fim, de lado, ombro, quadril e joelho fazem ${f1(linhaOmbroJoelho(fim))}° (180° = em linha); o joelho dobra ${f1(angulosDoLado(fim, 'R').joelho)}°`, ok: linhaOmbroJoelho(fim) >= 170 };
  },
  'calcanhar-desliza-no-apoio': (q) => {
    // o pé fica apoiado no tampo da toalha (que anda com ele), e o calcanhar só anda na direção do corpo
    const folgas = q.map((x) => peMaisBaixo(x.esq) - x.marcas.apoio![1]);
    const [a, b] = faixa(folgas);
    const c = q.map((x) => x.marcas.calcanhar!);
    const [z0, z1] = faixa(c.map((p) => p[2])),
      [x0, x1] = faixa(c.map((p) => p[0]));
    const fim = q[q.length - 1]!.esq;
    const aoQuadril = c[c.length - 1]![2] - fim.lado.R.quadril[2];
    return {
      medido: `o pé fica de ${f1(a)} a ${f1(b)} cm do tampo da toalha; o calcanhar desliza ${f1(z1 - z0)} cm na direção do corpo (${f1(x1 - x0)} cm para o lado) e termina ${f1(aoQuadril)} cm à frente do centro do quadril`,
      ok: a >= -1 && b <= 1 && x1 - x0 <= 0.5 && z1 - z0 >= 20,
    };
  },
};

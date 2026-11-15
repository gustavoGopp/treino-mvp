// Regras medidas do tríceps francês unilateral (na polia, com estribo): o cotovelo do braço que trabalha perto da
// cabeça, o tronco parado, o cabo por trás do corpo sem encostar nele e a outra mão na cintura.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { dist, dot, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
const peito = (q: Quadro) => Math.atan2(q.esq.torax.y[2], q.esq.torax.y[1]) / (Math.PI / 180);

export const REGRAS_TRICEPS_FRANCES_UNILATERAL: Record<string, Regra> = {
  'triceps-frances-unilateral-cotovelo-perto-da-cabeca': (q) => {
    // a abertura do braço direito para o lado (no tronco), a elevação e a distância do cotovelo à pele da cabeça
    const abre = q.map((x) => {
      const L = x.esq.lado.R;
      const b = paraRef({ ...x.esq.torax, o: [0, 0, 0] }, sub(L.cotovelo, L.ombro));
      return (Math.atan2(-b[0], b[1]) / Math.PI) * 180;
    });
    const elev = q.map((x) => angulosDoLado(x.esq, 'R').ombro);
    const cab = q.map((x) => Math.min(...pontosDoBoneco(x.esq).filter((p) => p.parte === 'cabeca').map((p) => dist(p.p, x.esq.lado.R.cotovelo))));
    const [e0, e1] = faixa(elev),
      [c0, c1] = faixa(cab);
    const a = Math.max(...abre);
    return { medido: `o braço ${a <= 0 ? `vai ${f1(-a)}° para o meio` : `abre ${f1(a)}° para fora`}, fica a ${f1(e0)}–${f1(e1)}° do braço pendurado e o cotovelo fica de ${f1(c0)} a ${f1(c1)} cm da pele da cabeça`, ok: a <= 0 && e0 >= 150 && c1 <= 20 };
  },
  'triceps-frances-unilateral-tronco-parado': (q) => {
    const [a, b] = faixa(q.map(peito));
    const lomb = Math.max(...q.map((x) => Math.abs(x.esq.pose.lombar ?? 0) + Math.abs(x.esq.pose.toracica ?? 0)));
    return { medido: `o peito fica de ${f1(a)}° a ${f1(b)}° à frente da vertical; a lombar e a torácica mudam ${f1(lomb)}° da curva de repouso`, ok: b - a <= 1 && a >= 0 && b <= 30 && lomb <= 1 };
  },
  'triceps-frances-unilateral-cabo-livre': (q) => {
    // o cabo (do elo à roldana) contra a pele do corpo, fora a mão e o antebraço que seguram o estribo
    const r = obj('torre', 'caboDiam') / 2;
    let min = 1e9,
      qual = '';
    for (const x of q.filter((_, i) => i % 3 === 0 || i === q.length - 1)) {
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (parte === 'mao' || parte === 'polegar' || parte === 'ante') continue;
        const d = aoSegmento(p, x.marcas.elo!, x.marcas.saida!) - r;
        if (d < min) {
          min = d;
          qual = parte;
        }
      }
    }
    return { medido: `o cabo passa a no mínimo ${f1(min)} cm da pele (${qual})`, ok: min >= 1 };
  },
  'triceps-frances-unilateral-mao-na-cintura': (q) => {
    // a palma esquerda encosta na cintura (a menor distância entre a pele da mão e a do tronco, da cintura e da pelve) e
    // fica parada em relação à pelve
    const P0 = q[0]!.esq.pelve;
    const p0 = paraRef(P0, q[0]!.esq.lado.L.pegada);
    let anda = 0;
    const folgas: number[] = [];
    for (const [i, x] of q.entries()) {
      anda = Math.max(anda, dist(paraRef(x.esq.pelve, x.esq.lado.L.pegada), p0));
      if (i % 4 && i !== q.length - 1) continue;
      const pts = pontosDoBoneco(x.esq);
      const mao = pts.filter((p) => p.parte === 'mao' && p.p[0] > 0).map((p) => p.p);
      const corpo = pts.filter((p) => ['tronco', 'cintura', 'emendaDaCintura', 'pelve'].includes(p.parte)).map((p) => p.p);
      let m = 1e9;
      for (const a of mao) for (const b of corpo) m = Math.min(m, dist(a, b));
      folgas.push(m);
    }
    const [a, b] = faixa(folgas);
    return { medido: `a pele da mão esquerda fica de ${f1(a)} a ${f1(b)} cm da pele da cintura e anda ${f1(anda)} cm em relação à pelve`, ok: b <= 1.5 && anda <= 1 };
  },
};

// Regras medidas da elevação lateral com caneleira presa no punho (../exercicios/elevacao-lateral-caneleira.ts). O resto
// (o plano do braço, a altura dos ombros, o ombro sem encolher) é medido pelas regras das elevações (./ombros.ts).
// Marcas que os quadros dão: `caneleiraR` e `caneleiraL` (o centro de cada faixa) e `caneleiraRaioR`/`L` (o raio por fora).
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS } from '../esqueleto';
import { obj } from '../tabelas';
import { dist, dot, norm, sub } from '../vec';

export const REGRAS_ELEVACAO_LATERAL_CANELEIRA: Record<string, Regra> = {
  'elevacao-caneleira-presa-no-antebraco': (q) => {
    // o centro da faixa ao centro do punho, ao longo do antebraço: não muda (não escorrega) e fica logo acima do punho
    const d = q.flatMap((x) => LADOS.map((k) => dist(x.marcas[`caneleira${k}`]!, x.esq.lado[k].punho)));
    const [a, b] = faixa(d);
    // e fica no eixo do antebraço (do punho para o cotovelo)
    const fora = Math.max(
      ...q.flatMap((x) =>
        LADOS.map((k) => {
          const L = x.esq.lado[k];
          const v = sub(x.marcas[`caneleira${k}`]!, L.punho);
          return Math.hypot(...sub(v, norm(L.antebraco.y).map((c) => c * dot(v, norm(L.antebraco.y))) as [number, number, number]));
        }),
      ),
    );
    const relaxada = q.every((x) => LADOS.every((k) => x.esq.lado[k].formaMao === 'relaxada'));
    const borda = a - obj('caneleira', 'larg') / 2;
    return {
      medido: `o centro da caneleira fica de ${f1(a)} a ${f1(b)} cm do centro do punho, no eixo do antebraço (a ${f1(fora)} cm dele): a borda de baixo a ${f1(borda)} cm do punho; a mão ${relaxada ? 'fica relaxada' : 'NÃO fica relaxada'} o ciclo todo`,
      ok: b - a <= 0.1 && borda >= 0 && borda <= 4 && fora <= 0.1 && relaxada,
    };
  },
};

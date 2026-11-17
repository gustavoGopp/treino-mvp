// Regras medidas dos exercícios com a mini band nos tornozelos (extensão de joelho sentado e abdução deitado de lado).
// Marcas que os quadros dão: `faixaR` e `faixaL`, o centro da seção de cada canela por onde a faixa passa.
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { dist } from '../vec';

const estica = (x: Quadro) => x.fios.find((y) => y.id === 'elastico')!.comp / obj('miniBand', 'comp');

export const REGRAS_MINI_BAND: Record<string, Regra> = {
  'mini-band-nos-tornozelos': (q) => {
    // a faixa não escorrega: o meio dela fica sempre à mesma distância do centro de cada tornozelo
    const d = (k: 'R' | 'L') => faixa(q.map((x) => dist(x.marcas[`faixa${k}`]!, x.esq.lado[k].tornozelo)));
    const [r0, r1] = d('R'),
      [l0, l1] = d('L');
    const ini = estica(q[0]!),
      fim = estica(q[q.length - 1]!);
    const borda = Math.min(r0, l0) - obj('miniBand', 'larg') / 2;
    return {
      medido: `o meio da faixa fica a ${f1(r0)}–${f1(r1)} cm do tornozelo direito e ${f1(l0)}–${f1(l1)} cm do esquerdo (a borda de baixo a ${f1(borda)} cm); ela vai de ${f1(ini)} vezes (começo) a ${f1(fim)} vezes (fim)`,
      ok: r1 - r0 <= 0.2 && l1 - l0 <= 0.2 && r1 <= 10 && l1 <= 10 && borda >= 2 && ini >= 1 && fim > ini + 0.3,
    };
  },
};

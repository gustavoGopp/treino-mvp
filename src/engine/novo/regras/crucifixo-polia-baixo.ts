// Regras medidas do crucifixo na polia de baixo para cima (../exercicios/crucifixo-polia-baixo.ts): as polias embaixo, as
// mãos no começo (abertas, baixas e um pouco atrás) e no fim (juntas, na altura do peito ou do queixo). O cotovelo fixo, os
// cabos longe do corpo e a pilha de cada coluna são as regras do núcleo da polia (./polia-bracos.ts); o tronco parado, a
// regra comum "tronco-quase-parado" (../conferir.ts).
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { VISTAS, naTela } from '../desenho';
import type { IdVista } from '../desenho';
import { torreNaVista } from '../equipamento';
import type { Quadro } from '../movimento';
import { centroDaRoldana } from '../pecas';
import { obj } from '../tabelas';
import { dist, dot, sub } from '../vec';

/** O quadro do fim: o ciclo começa parado embaixo (o primeiro quadro); o fim é o quadro em que a mão fica mais longe dali. */
function fim(q: Quadro[]): Quadro {
  const p0 = q[0]!.esq.lado.R.pegada;
  let m = q[0]!;
  for (const x of q) if (dist(x.esq.lado.R.pegada, p0) > dist(m.esq.lado.R.pegada, p0)) m = x;
  return m;
}

export const REGRAS_CRUCIFIXO_POLIA_BAIXO: Record<string, Regra> = {
  'crucifixo-baixo-cabos-terminam-na-roldana': (_q, corpo, ex) => {
    // Em cada vista do guia (as do exercício e as dos erros), no ciclo (5 instantes) e em cada erro na vista dele (no
    // começo, no meio e no fim): cada cabo termina, na tela, na roldana de uma coluna que aparece naquela vista (a
    // distância da saída do cabo ao centro da roldana mais perto, até o raio dela: o cabo sai na borda, com
    // meio centímetro de folga). De lado, as colunas de cenário não
    // apareciam e os cabos terminavam no ar, perto do chão (auditoria de 18/11, G7).
    if (!ex) return { medido: 'a regra precisa do exercício (a conferência o passa)', ok: false };
    const raio = obj('torre', 'roldanaDiam') / 2;
    const vistas = [...new Set<IdVista>([...(ex.vistas as IdVista[]), ...ex.ficha.erros.map((er) => er.vista as IdVista)])];
    const casos: { vista: IdVista; q: Quadro }[] = [];
    for (const u of [0, 0.25, 0.5, 0.75, 1]) {
      const q = ex.quadro(corpo, u);
      for (const vista of vistas) casos.push({ vista, q });
    }
    for (const er of ex.ficha.erros) for (const u of [0, 0.5, 1]) casos.push({ vista: er.vista as IdVista, q: ex.quadro(corpo, u, er.id) });
    const pior = new Map<IdVista, { d: number; colunas: number; alto: number }>();
    for (const { vista, q } of casos) {
      const cam = VISTAS[vista];
      const roldanas = (q.pecas ?? []).flatMap((p) => (p.t === 'torre' && torreNaVista(p, cam) ? [naTela(cam, centroDaRoldana(p.torre))] : []));
      const v = pior.get(vista) ?? { d: -1, colunas: 1e9, alto: 0 };
      v.colunas = Math.min(v.colunas, roldanas.length);
      for (const id of ['cabo', 'cabo2']) {
        const s = q.marcas[`${id}.saida`]!;
        const t = naTela(cam, s);
        const d = roldanas.length ? Math.min(...roldanas.map((r) => Math.hypot(r[0] - t[0], r[1] - t[1]))) : 1e9;
        v.d = Math.max(v.d, d);
        v.alto = Math.max(v.alto, s[1]);
      }
      pior.set(vista, v);
    }
    const partes = [...pior].map(([vista, v]) => `${vista}: ${v.colunas ? `${v.colunas === 1 ? '1 coluna aparece' : `${v.colunas} colunas aparecem`}, e a saída de cada cabo fica no máximo ${f1(v.d)} cm do centro da roldana mais perto, na tela` : `nenhuma coluna aparece, e os cabos terminam no ar, a até ${f1(v.alto)} cm do chão`}`);
    return { medido: `${partes.join('; ')} (raio da roldana: ${f1(raio)} cm)`, ok: [...pior.values()].every((v) => v.colunas > 0 && v.d <= raio + 0.5) };
  },
  'crucifixo-baixo-polias-embaixo': (q) => {
    const x = q[0]!;
    const ys = x.fios.map((y) => y.id).filter((id) => x.marcas[`${id}.roldana`]).map((id) => x.marcas[`${id}.roldana`]![1]);
    return { medido: `o centro de cada roldana fica a ${ys.map(f1).join(' e ')} cm do chão`, ok: ys.length === 2 && ys.every((y) => y <= 30) };
  },
  'crucifixo-baixo-maos-ao-lado-e-atras': (q) => {
    // no começo: a mão (o centro da pegada) um pouco atrás da linha do ombro, no tórax; abaixo da cintura e afastada do
    // quadril, para o lado
    const e = q[0]!.esq;
    const lados = (['R', 'L'] as const).map((k) => {
      const L = e.lado[k];
      return { atras: -dot(sub(L.pegada, L.ombro), e.torax.z), abaixo: e.corpo.m('altura.cintura') - L.pegada[1], fora: Math.abs(L.pegada[0]) - Math.abs(L.quadril[0]) };
    });
    return {
      medido: lados.map((l, i) => `${i === 0 ? 'direita' : 'esquerda'}: ${f1(l.atras)} cm atrás da linha do ombro, ${f1(l.abaixo)} cm abaixo da altura da cintura, ${f1(l.fora)} cm para fora do quadril`).join('; '),
      ok: lados.every((l) => l.atras >= 0 && l.atras <= 15 && l.abaixo >= 0 && l.fora >= 8),
    };
  },
  'crucifixo-baixo-maos-se-encontram-no-alto': (q) => {
    // no fim: as mãos juntas, à frente, entre a linha do mamilo (a altura do peito) e a de C7 (a do queixo), no tórax
    const e = fim(q).esq;
    const gap = dist(e.lado.R.pegada, e.lado.L.pegada);
    const m = (id: string) => e.corpo.m(id);
    const abaixoDeC7 = dot(sub(e.torax.o, e.lado.R.pegada), e.torax.y);
    const ate = m('altura.cervical') - m('altura.peito');
    const frente = dot(sub(e.lado.R.pegada, e.torax.o), e.torax.z);
    return { medido: `no fim, os centros das mãos ficam a ${f1(gap)} cm um do outro, ${f1(abaixoDeC7)} cm abaixo de C7 no tórax (do queixo ao peito: de 0 a ${f1(ate)} cm) e ${f1(frente)} cm à frente`, ok: gap <= 12 && abaixoDeC7 >= 0 && abaixoDeC7 <= ate && frente >= 20 };
  },
};

// Regras medidas dos supinos na polia com o banco no meio das duas torres (../exercicios/polia-banco.ts): o banco no
// meio, os cabos por fora do banco, as mãos embaixo e no topo e o apoio no banco plano. Os cabos longe do corpo e a pilha
// de cada coluna são as regras do núcleo da polia (./polia-bracos.ts); o encosto e o apoio no banco inclinado, as do
// supino inclinado aprovado (./supino-inclinado.ts).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import type { PecaPropria } from '../pecas';
import { faceDoEncosto } from '../pecas-de-cena/banco-regulavel';
import type { BancoRegulavel } from '../pecas-de-cena/banco-regulavel';
import { obj } from '../tabelas';
import { add, angulo, dist, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

/** Os ids dos cabos de um quadro. */
const idsDosCabos = (x: Quadro) => x.fios.map((y) => y.id).filter((id) => x.marcas[`${id}.ponta`]);
/**
 * O quadro de baixo e o do topo: o ciclo começa parado embaixo (o primeiro quadro); o topo é o quadro em que a mão fica
 * mais longe de onde estava embaixo.
 */
function extremos(q: Quadro[]): { baixo: Quadro; topo: Quadro } {
  const baixo = q[0]!;
  let topo = baixo;
  for (const x of q) if (dist(x.esq.lado.R.pegada, baixo.esq.lado.R.pegada) > dist(topo.esq.lado.R.pegada, baixo.esq.lado.R.pegada)) topo = x;
  return { baixo, topo };
}
/** A largura e a altura do banco do quadro, para ver por onde passam os cabos: o meio (x), a meia largura e o ponto mais alto. */
function bancoDo(x: Quadro): { x0: number; meia: number; alto: number } | undefined {
  for (const p of x.pecas ?? []) {
    if (p.t === 'bancoReto') return { x0: p.x0, meia: Math.max(obj('bancoReto', 'larg'), obj('bancoReto', 'baseLarg')) / 2, alto: obj('bancoReto', 'altura') };
    if (p.t === 'propria' && (p as PecaPropria).nome === 'banco-regulavel') {
      const b = (p as PecaPropria).fixa as BancoRegulavel;
      const E = faceDoEncosto(b);
      return { x0: b.x0, meia: Math.max(obj('bancoRegulavel', 'larg'), obj('bancoRegulavel', 'baseLarg')) / 2, alto: add(E.ponto, mul(E.dir, E.comp))[1] };
    }
  }
  return undefined;
}

export const REGRAS_POLIA_BANCO: Record<string, Regra> = {
  'polia-banco-no-meio-das-torres': (q) => {
    const x = q[0]!;
    const [a, b] = idsDosCabos(x);
    const b0 = bancoDo(x);
    if (!a || !b || !b0) return { medido: 'faltam os dois cabos ou o banco', ok: false };
    const meio = (x.marcas[`${a}.roldana`]![0] + x.marcas[`${b}.roldana`]![0]) / 2;
    const dif = Math.max(...q.map((y) => Math.abs(y.fios.find((z) => z.id === a)!.comp - y.fios.find((z) => z.id === b)!.comp)));
    return { medido: `o meio do banco fica a ${f1(Math.abs(b0.x0 - meio))} cm do meio das duas roldanas; os dois cabos diferem no máximo ${f1(dif)} cm no ciclo`, ok: Math.abs(b0.x0 - meio) <= 1 && dif <= 1 };
  },
  'polia-banco-cabos-por-fora-do-banco': (q) => {
    // abaixo do ponto mais alto do banco, o cabo fica por fora da largura dele (do estofado ou da base, a maior)
    let min = 1e9;
    for (const x of q.filter((_, i) => i % 3 === 0 || i === q.length - 1)) {
      const B = bancoDo(x);
      if (!B) return { medido: 'sem banco no quadro', ok: false };
      for (const id of idsDosCabos(x)) {
        const a = x.marcas[`${id}.ponta`]!,
          b = x.marcas[`${id}.saida`]!;
        for (let i = 0; i <= 60; i++) {
          const p: V3 = add(a, mul(sub(b, a), i / 60));
          if (p[1] <= B.alto) min = Math.min(min, Math.abs(p[0] - B.x0) - B.meia);
        }
      }
    }
    return { medido: `abaixo do alto do banco, os cabos passam a no mínimo ${f1(min)} cm por fora da largura dele`, ok: min >= 2 };
  },
  'polia-banco-maos-ao-lado-do-peito': (q) => {
    const e = extremos(q).baixo.esq,
      L = e.lado.R;
    const b = norm(sub(L.cotovelo, L.ombro));
    const noPlano = sub(b, mul(e.torax.z, dot(b, e.torax.z)));
    const a = angulo(noPlano, mul(e.torax.y, -1));
    const ante = angulo(sub(L.punho, L.cotovelo), [0, 1, 0]);
    // ao lado do peito: ao longo do tronco, entre a linha dos ombros e 22 cm abaixo dela; acima do plano das costas
    const aoLongo = dot(sub(L.pegada, L.ombro), mul(e.torax.y, -1));
    const acima = dot(sub(L.pegada, L.ombro), e.torax.z);
    return { medido: `embaixo, o braço faz ${f1(a)}° com o tronco (no plano das costas), o antebraço desvia ${f1(ante)}° da vertical e a mão fica ${f1(aoLongo)} cm abaixo da linha dos ombros, ao longo do tronco, e ${f1(acima)} cm à frente do centro do ombro`, ok: a >= 30 && a <= 60 && ante <= 2 && aoLongo >= 0 && aoLongo <= 22 && acima >= 0 };
  },
  'polia-banco-topo-para-dentro': (q) => {
    const e = extremos(q).topo.esq;
    const cot = Math.max(angulosDoLado(e, 'R').cotovelo, angulosDoLado(e, 'L').cotovelo);
    const meio = (e.lado.R.ombro[0] + e.lado.L.ombro[0]) / 2;
    const dentro = (['R', 'L'] as const).map((k) => Math.abs(e.lado[k].ombro[0] - meio) - Math.abs(e.lado[k].pegada[0] - meio));
    // acima do peito, sobre o ombro: visto de lado, a mão na vertical do ombro
    const deLado = e.lado.R.pegada[2] - e.lado.R.ombro[2];
    return { medido: `no topo, o cotovelo dobra ${f1(cot)}°, as mãos ficam ${dentro.map(f1).join(' e ')} cm para dentro dos ombros e, de lado, ${f1(deLado)} cm da vertical do ombro`, ok: cot >= 5 && cot <= 25 && dentro.every((d) => d >= 2 && d <= 12) && Math.abs(deLado) <= 8 };
  },
  'polia-banco-apoiado': (q) => {
    // deitado no banco reto: as costas, a cabeça e o glúteo no tampo (o ponto mais baixo de cada parte, sobre o banco)
    const partes = { costas: ['tronco'], cabeça: ['cabeca'], glúteo: ['pelve'] } as Record<string, string[]>;
    const medidas: Record<string, number[]> = { costas: [], cabeça: [], glúteo: [] };
    for (const x of q.filter((_, i) => i % 6 === 0 || i === q.length - 1)) {
      const B = x.pecas?.find((p) => p.t === 'bancoReto');
      if (!B || B.t !== 'bancoReto') return { medido: 'sem banco reto no quadro', ok: false };
      const topo = obj('bancoReto', 'altura'),
        meia = obj('bancoReto', 'larg') / 2,
        c = obj('bancoReto', 'comp') / 2;
      const P = pontosDoBoneco(x.esq);
      for (const [nome, ps] of Object.entries(partes)) {
        let m = Infinity;
        for (const { p, parte } of P) if (ps.includes(parte) && Math.abs(p[0] - B.x0) <= meia && Math.abs(p[2] - B.z0) <= c) m = Math.min(m, p[1] - topo);
        medidas[nome]!.push(m);
      }
    }
    const txt = Object.entries(medidas).map(([n, v]) => {
      const [a, b] = faixa(v);
      return `${n} de ${f1(a)} a ${f1(b)} cm`;
    });
    const ok = Object.values(medidas).every((v) => {
      const [a, b] = faixa(v);
      return a >= -2 && b <= 1.5;
    });
    return { medido: `o ponto mais baixo de cada parte acima do tampo do banco (negativo = amassa o estofado): ${txt.join(', ')}`, ok };
  },
};

// Regras medidas dos exercícios em quatro apoios (núcleo ../exercicios/quatro-apoios.ts) e do coice com elástico. A
// perna que trabalha é a direita; a de apoio, a esquerda. Marcas que os quadros dão: `piso` (o tampo do colchonete) e,
// no coice com elástico, `sola` (o ponto do laço na sola do pé).
import { formaDoBoneco, pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq, Lado } from '../esqueleto';
import { coiceElastico } from '../exercicios/coice-elastico';
import type { Exercicio, Quadro } from '../movimento';
import { obj } from '../tabelas';
import { add, angulo, comb, dist, mul, sub } from '../vec';
import type { V3 } from '../vec';
import { GRUPOS, NOME_DO_GRUPO, pinturaDaPeca, pinturaDoBoneco, vistasDoGuia } from './ordem-de-pintura';
import type { Grupo } from './ordem-de-pintura';

const piso = (q: Quadro) => q.marcas.piso?.[1] ?? 0;
const deLado = (v: V3): V3 => [0, v[1], v[2]];
/** A linha do tronco, dos ombros ao quadril, vista de lado. */
const linhaDoTronco = (e: Esq): V3 => deLado(sub(e.pelve.o, e.torax.o));

const LADOS: Lado[] = ['R', 'L'];

/**
 * A pele de um lado que apoia no colchonete (a até 1,5 cm do tampo): a mão e o joelho (os 8 cm da perna em volta da
 * junta). Para cada uma, a menor folga até a borda do colchonete (cm, positivo = dentro), ou nada se não apoia.
 */
function apoiosNoColchonete(q: Quadro): Record<string, number> {
  const col = q.pecas?.find((p) => p.t === 'colchonete');
  if (!col || col.t !== 'colchonete') return {};
  const esp = obj('colchonete', 'esp'),
    meiaLarg = obj('colchonete', 'larg') / 2,
    meioComp = obj('colchonete', 'comp') / 2;
  const out: Record<string, number> = {};
  for (const g of formaDoBoneco(q.esq).grupos) {
    const k = g.lado;
    if (!k) continue;
    for (const v of g.volumes) {
      const parte = g.id.startsWith('braco') && v.nome === 'mao' ? `mão ${k}` : g.id.startsWith('perna') && (v.nome === 'coxa' || v.nome === 'canela') ? `joelho ${k}` : null;
      if (!parte) continue;
      for (const an of v.vol.aneis)
        for (let i = 0; i < 12; i++) {
          const th = (i * Math.PI) / 6,
            sn = Math.sin(th);
          const p: V3 = comb([1, an.c], [an.a * Math.cos(th), an.x], [(sn >= 0 ? an.f : an.b) * sn, an.z]);
          if (p[1] > esp + 1.5 || (parte.startsWith('joelho') && dist(p, q.esq.lado[k].joelho) > 8)) continue;
          const folga = Math.min(meiaLarg - Math.abs(p[0] - col.x0), meioComp - Math.abs(p[2] - col.z0));
          out[parte] = Math.min(out[parte] ?? 1e9, folga);
        }
    }
  }
  return out;
}

/**
 * O colchonete fica no chão, embaixo de tudo o que apoia nele (acréscimo de 19/11, auditoria das fases A e B: de três
 * quartos, ele era pintado por cima dos joelhos, das canelas, dos pés e das mãos): em cada vista do guia, cada parte do
 * Boneco (os dois lados; as pernas de perto vão no item do tronco) é pintada depois dele. Mede, por vista, quanto cada grupo é pintado à frente do colchonete no pior quadro
 * (a cada 3 quadros do movimento certo e cada erro no começo, no meio e no fim, na vista dele; negativo = o colchonete
 * cobre a parte), e a folga da mão e do joelho que apoiam até a borda do colchonete (os dois lados).
 */
function colchoneteEmbaixo(exercicio: () => Exercicio): Regra {
  return (q, corpo) => {
    const ex = exercicio();
    const amostra = q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map((x) => ({ x, erro: undefined as string | undefined }));
    for (const e of ex.ficha.erros) for (const u of [0, 0.5, 1]) amostra.push({ x: ex.quadro(corpo, u, e.id), erro: e.id });
    const porVista: string[] = [];
    let ok = true;
    for (const vista of vistasDoGuia(ex)) {
      const pior: Partial<Record<Grupo, number>> = {};
      for (const { x, erro } of amostra) {
        if (erro && ex.ficha.erros.find((e) => e.id === erro)!.vista !== vista) continue;
        const col = x.pecas?.find((p) => p.t === 'colchonete');
        if (!col) continue;
        const fundo = Math.max(...pinturaDaPeca(col, vista));
        const b = pinturaDoBoneco(x, vista);
        for (const g of GRUPOS) if (b[g] !== undefined) pior[g] = Math.min(pior[g] ?? 1e9, b[g]! - fundo);
      }
      ok &&= GRUPOS.every((g) => (pior[g] ?? 1) > 0);
      porVista.push(`${vista}: ${GRUPOS.filter((g) => pior[g] !== undefined).map((g) => `${NOME_DO_GRUPO[g]} ${f1(pior[g]!)}`).join(', ')}`);
    }
    const apoio: Record<string, number> = {};
    for (const { x } of amostra) for (const [parte, folga] of Object.entries(apoiosNoColchonete(x))) apoio[parte] = Math.min(apoio[parte] ?? 1e9, folga);
    const partes = LADOS.flatMap((k) => [`mão ${k}`, `joelho ${k}`]).filter((p) => apoio[p] !== undefined);
    const nomeDe = (p: string) => p.replace(' R', ' direito').replace(' L', ' esquerdo').replace('mão direito', 'mão direita').replace('mão esquerdo', 'mão esquerda');
    return {
      medido:
        `quanto cada parte é pintada à frente do colchonete, no pior quadro (cm; negativo = o colchonete cobre a parte): ${porVista.join('; ')}; ` +
        `a menor folga da pele que apoia até a borda do colchonete (cm, positivo = dentro): ${partes.map((p) => `${nomeDe(p)} ${f1(apoio[p]!)}`).join(', ')}`,
      ok: ok && LADOS.every((k) => apoio[`mão ${k}`] !== undefined && apoio[`mão ${k}`]! >= 0) && apoio['joelho L'] !== undefined && apoio['joelho L']! >= 0 && (apoio['joelho R'] ?? 0) >= 0,
    };
  };
}

export const REGRAS_QUATRO_APOIOS: Record<string, Regra> = {
  'coice-elastico-colchonete-embaixo': colchoneteEmbaixo(() => coiceElastico),
  'quatro-apoios-maos-e-joelhos': (q) => {
    const x = q[0]!,
      e = x.esq;
    const maos = Math.max(...(['R', 'L'] as const).map((k) => Math.hypot(e.lado[k].pegada[0] - e.lado[k].ombro[0], e.lado[k].pegada[2] - e.lado[k].ombro[2])));
    const joelho = Math.hypot(e.lado.L.joelho[0] - e.lado.L.quadril[0], e.lado.L.joelho[2] - e.lado.L.quadril[2]);
    const costas = Math.asin((e.torax.o[1] - e.pelve.o[1]) / dist(e.torax.o, e.pelve.o)) / (Math.PI / 180);
    // o joelho de apoio no colchonete: o ponto mais baixo da perna esquerda perto do joelho
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'canela' || parte === 'coxa') && dist(p, e.lado.L.joelho) < 8) min = Math.min(min, p[1]);
    const noTampo = min - piso(x);
    const cot = Math.max(...q.map((y) => Math.max(y.esq.lado.R.ang.cotovelo, y.esq.lado.L.ang.cotovelo)));
    return {
      medido: `o centro da palma fica a no máximo ${f1(maos)} cm da vertical do ombro, com o cotovelo dobrado ${f1(cot)}°; o joelho de apoio a ${f1(joelho)} cm da vertical do quadril, a ${f1(noTampo)} cm do tampo do colchonete; a linha dos ombros ao quadril sobe ${f1(costas)}° à frente`,
      ok: maos <= 4 && joelho <= 2 && Math.abs(noTampo) <= 1 && Math.abs(costas) <= 20 && cot <= 15,
    };
  },
  'coice-coxa-na-linha-do-tronco': (q) => {
    const fim = q[q.length - 1]!.esq;
    const coxa = deLado(sub(fim.lado.R.joelho, fim.lado.R.quadril));
    const desvio = angulo(coxa, linhaDoTronco(fim));
    // acima (+) ou abaixo (−) da linha: o joelho contra a linha que continua o tronco, à mesma distância do quadril
    const L = linhaDoTronco(fim);
    const acima = fim.lado.R.joelho[1] - add(fim.lado.R.quadril, mul(L, dist(fim.lado.R.joelho, fim.lado.R.quadril) / Math.hypot(...L)))[1];
    const bacia = Math.max(...q.map((x) => angulo(x.esq.pelve.z, q[0]!.esq.pelve.z)));
    const [j0, j1] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    return {
      medido: `no alto, a coxa faz ${f1(desvio)}° com a linha do tronco (o joelho ${f1(acima)} cm em relação a ela); a bacia gira no máximo ${f1(bacia)}° no ciclo (a lombar não arqueia); o joelho fica dobrado de ${f1(j0)}° a ${f1(j1)}°`,
      ok: desvio <= 8 && acima <= 2 && bacia <= 1 && j0 >= 75 && j1 <= 105,
    };
  },
  'coice-quadril-nao-gira': (q) => {
    const rola = Math.max(...q.map((x) => Math.abs(Math.asin(x.esq.pelve.x[1]) / (Math.PI / 180))));
    const anda = Math.max(...q.map((x) => dist(x.esq.pelve.o, q[0]!.esq.pelve.o)));
    const abre = Math.max(...q.map((x) => Math.abs(angulosDoLado(x.esq, 'R').abducaoDoQuadril)));
    return { medido: `a linha dos quadris fica a no máximo ${f1(rola)}° da horizontal; a bacia anda ${f1(anda)} cm; a coxa abre no máximo ${f1(abre)}° para o lado`, ok: rola <= 2 && anda <= 0.5 && abre <= 5 };
  },
  'coice-laco-na-sola-e-sob-as-maos': (q) => {
    const x0 = q[0]!,
      x1 = q[q.length - 1]!;
    const sola = Math.max(...q.map((x) => dist(x.marcas.sola!, mul(add(x.esq.lado.R.bola, x.esq.lado.R.calcanhar), 0.5))));
    const fio = (x: Quadro) => x.prims.find((p) => p.t === 'fio' && p.cls === 'fita');
    const maos = Math.max(
      ...q.map((x) => {
        const f = fio(x);
        if (!f || f.t !== 'fio') return 99;
        const a = f.pts[0]!,
          b = f.pts[f.pts.length - 1]!;
        return Math.max(Math.hypot(a[0] - x.esq.lado.R.pegada[0], a[2] - x.esq.lado.R.pegada[2]), Math.hypot(b[0] - x.esq.lado.R.pegada[0], b[2] - x.esq.lado.R.pegada[2]));
      }),
    );
    const estica = (x: Quadro) => x.fios.find((y) => y.id === 'elastico')!.comp / obj('elasticoLongo', 'comp');
    return {
      medido: `o laço passa a ${f1(sola)} cm do meio da sola; as pontas ficam a ${f1(maos)} cm do centro da palma direita, sob a mão; ele vai de ${f1(estica(x0))} vezes (embaixo) a ${f1(estica(x1))} vezes (no alto)`,
      ok: sola <= 2 && maos <= 3 && estica(x0) >= 1 && estica(x1) > estica(x0) + 0.2,
    };
  },
};

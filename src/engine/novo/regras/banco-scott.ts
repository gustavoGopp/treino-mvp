// Regras medidas da rosca Scott no banco Scott (../exercicios/rosca-scott.ts). As da Scott no banco inclinado
// (./rosca-scott.ts) medem o braço direito num encosto de banco regulável; estas medem os dois braços na almofada do
// banco Scott, o assento e a regulagem. As outras (braço quase estendido embaixo, palmas para cima, a barra W nas duas
// mãos, tronco parado) já existem (./roscas.ts, ./barras-especiais.ts e ../conferir.ts). O limite vem do que a ficha
// pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { apoioNoAssentoDaScott, bancoDaScott, folgaDaBarraNaAlmofada, fundoDoBraco, naAlmofada, peleDoBraco } from '../exercicios/rosca-scott';
import { centroDoAssento, faceDaAlmofada, ganchosDoSuporte } from '../pecas-de-cena/banco-scott';
import { obj } from '../tabelas';
import { dist, dot, norm, sub } from '../vec';
import type { V3 } from '../vec';

const LADOS = ['R', 'L'] as const;

export const REGRAS_BANCO_SCOTT: Record<string, Regra> = {
  'banco-scott-bracos-na-almofada': (q, corpo) => {
    // a cada 3 quadros, nos dois braços: o tríceps encosta (não descola mais de meio centímetro) e não atravessa a
    // almofada (amassa até 2,5 cm, a tolerância da conferência para o corpo no estofado); o cotovelo não sai do lugar
    const b = bancoDaScott(corpo);
    const fundos = q.filter((_, i) => i % 3 === 0 || i === q.length - 1).flatMap((x) => LADOS.map((k) => fundoDoBraco(x.esq, b, k)));
    const [a, c] = faixa(fundos);
    const anda = Math.max(...q.flatMap((x) => LADOS.map((k) => dist(x.esq.lado[k].cotovelo, q[0]!.esq.lado[k].cotovelo))));
    const [c0, c1] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `nos dois braços, o ponto mais fundo do tríceps na almofada fica de ${f1(a)} a ${f1(c)} cm (positivo = amassa); o cotovelo anda ${f1(anda)} cm enquanto dobra de ${f1(c0)}° a ${f1(c1)}°`, ok: a >= -0.5 && c <= 2.5 && anda <= 1 && c1 - c0 >= 90 };
  },
  'banco-scott-axilas-na-borda': (q, corpo) => {
    // o braço deita na almofada desde a borda de cima: a pele do braço encosta na face nos 6 cm de cima; o centro do
    // ombro fica logo além da borda (até 12 cm); o peito encosta na almofada sem atravessá-la
    const x = q[0]!;
    const b = bancoDaScott(corpo);
    const F = faceDaAlmofada(b);
    const ao = (p: V3) => dot(sub(p, F.topo), F.d);
    let noAlto = -1e9;
    for (const k of LADOS)
      for (const p of peleDoBraco(x.esq, k)) if (ao(p) >= 0 && ao(p) < 6) noAlto = Math.max(noAlto, -dot(sub(p, F.topo), F.n));
    const ombro = Math.min(...LADOS.map((k) => -ao(x.esq.lado[k].ombro)));
    let peito = -1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'tronco' || parte === 'cintura') peito = Math.max(peito, naAlmofada(b, p));
    return {
      medido: `nos 6 cm de cima da almofada, a pele do braço fica a ${f1(noAlto)} cm da face (positivo = amassa); o centro do ombro fica ${f1(ombro)} cm além da borda; o peito ${peito >= 0 ? `amassa ${f1(peito)} cm` : `fica a ${f1(-peito)} cm`} da almofada`,
      ok: noAlto >= -1 && ombro >= 0 && ombro <= 12 && peito >= -1.5 && peito <= 2.5,
    };
  },
  'banco-scott-sentado-de-tronco-reto': (q, corpo) => {
    // o glúteo apoia no assento (amassa até 2,5 cm, sem flutuar); o tronco perto da vertical; o assento e a almofada
    // dentro da faixa de regulagem do banco (a tabela de objetos)
    const b = bancoDaScott(corpo);
    const apoio = faixa(q.map((x) => apoioNoAssentoDaScott(x.esq, b)));
    const e = q[0]!.esq;
    const t = norm(sub(e.torax.o, e.pelve.o));
    const tronco = (Math.acos(Math.max(-1, Math.min(1, t[1]))) * 180) / Math.PI;
    const g = (id: string) => obj('bancoScott', id);
    const almofada = b.topo[1];
    const meio = centroDoAssento(b);
    const quadril = e.pelve.o[2] - meio[2];
    return {
      medido: `o glúteo fica de ${f1(apoio[0])} a ${f1(apoio[1])} cm do tampo do assento (negativo = amassa); a linha da bacia à base do pescoço fica ${f1(tronco)}° da vertical; o assento a ${f1(b.assento)} cm (o banco vai de ${g('assentoAlturaMin')} a ${g('assentoAlturaMax')}) e a almofada a ${f1(almofada)} cm (de ${g('almofadaAlturaMin')} a ${g('almofadaAlturaMax')}); o meio da bacia fica ${f1(quadril)} cm à frente do meio do assento`,
      ok: apoio[0] >= -2.5 && apoio[1] <= 0.5 && tronco <= 20 && b.assento >= g('assentoAlturaMin') && b.assento <= g('assentoAlturaMax') && almofada >= g('almofadaAlturaMin') && almofada <= g('almofadaAlturaMax') && Math.abs(quadril) <= g('assentoComp') / 2,
    };
  },
  'banco-scott-sem-travar-embaixo': (q) => {
    const c = Math.min(...q.flatMap((x) => LADOS.map((k) => x.esq.lado[k].ang.cotovelo)));
    return { medido: `o cotovelo dobra no mínimo ${f1(c)}° (0° = travado)`, ok: c >= 5 };
  },
  'banco-scott-antebraco-quase-vertical': (q) => {
    // em cima, o antebraço perto da vertical, mas antes dela (senão o peso sai do bíceps)
    const L = q[q.length - 1]!.esq.lado.R;
    const ante = norm(sub(L.pegada, L.cotovelo));
    const daVertical = (Math.acos(Math.max(-1, Math.min(1, ante[1]))) * 180) / Math.PI;
    const passou = ante[2] < 0;
    return { medido: `em cima, o antebraço fica ${f1(daVertical)}° da vertical (${passou ? 'passou dela, para o lado do corpo' : 'ainda à frente dela'}); o centro da pegada a ${f1(dist(L.pegada, L.ombro))} cm do centro do ombro`, ok: !passou && daVertical >= 3 && daVertical <= 20 };
  },
  'banco-scott-barra-fora-do-banco': (q, corpo) => {
    // a barra (a linha em W, as mangas e as anilhas) não entra na almofada; no começo e no fim, também não passa pelos
    // ganchos do suporte (que ficam parados na frente, abaixo do caminho dela)
    const b = bancoDaScott(corpo);
    const almofada = Math.min(...q.map((x) => folgaDaBarraNaAlmofada(x.prims, b)));
    const G = ganchosDoSuporte(b);
    let gancho = 1e9;
    const r = obj('barraW', 'pegadaDiam') / 2;
    for (const x of q)
      for (let i = 0; i < 7; i++) {
        const a = x.marcas[`barraW.${i}`]!,
          c = x.marcas[`barraW.${i + 1}`]!;
        for (const h of G)
          for (let j = 0; j <= 10; j++) {
            const p: V3 = [a[0] + ((c[0] - a[0]) * j) / 10, a[1] + ((c[1] - a[1]) * j) / 10, a[2] + ((c[2] - a[2]) * j) / 10];
            if (Math.abs(p[0] - h[0]) < 3) gancho = Math.min(gancho, p[1] - r - h[1]);
          }
      }
    return { medido: `a menor folga da barra e das anilhas até a almofada é ${f1(almofada)} cm; a barra passa ${gancho > 1e8 ? 'longe dos' : `${f1(gancho)} cm acima do alto dos`} ganchos do suporte`, ok: almofada >= -0.5 && gancho >= 1 };
  },
};

// Regras medidas dos exercícios numa torre de polia do lote A5 (a puxada ajoelhado com a barra reta, o tríceps com a
// barra reta, a rosca de costas para a torre e o pull-through). As que já existem e servem (o cotovelo parado e colado
// do tríceps na corda, a barra na largura dos ombros, o cabo livre do corpo, a pilha de cada coluna, a lombar neutra, o
// quadril que dobra) são usadas como estão. O limite vem do que a ficha da técnica pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { LADOS } from '../esqueleto';
import { pullThrough } from '../exercicios/pull-through';
import { obj } from '../tabelas';
import { add, dist, dot, mul, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { regraDePintura } from './ordem-de-pintura';
import type { ParteDaPeca } from './ordem-de-pintura';

const rad = Math.PI / 180;
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}

export const REGRAS_UMA_TORRE: Record<string, Regra> = {
  // ----- puxada ajoelhado com a barra reta -----
  'puxada-barra-pegada-mais-aberta': (q, corpo) => {
    // os centros das mãos mais afastados que os centros dos ombros e que os acrômios, sempre na mesma distância (a barra
    // tem largura fixa), no eixo da barra e sem passar da ponta dela
    const [a, b] = faixa(q.map((x) => dist(x.esq.lado.R.pegada, x.esq.lado.L.pegada)));
    const ombros = dist(q[0]!.esq.lado.R.ombro, q[0]!.esq.lado.L.ombro);
    const naBarra = Math.max(...q.map((x) => Math.max(aoSegmento(x.esq.lado.R.pegada, x.marcas['barra.a']!, x.marcas['barra.b']!), aoSegmento(x.esq.lado.L.pegada, x.marcas['barra.a']!, x.marcas['barra.b']!))));
    const sobra = (obj('barraRetaPolia', 'comp') - b - corpo.m('mao.largura')) / 2;
    return { medido: `os centros das mãos ficam de ${f1(a)} a ${f1(b)} cm um do outro (os centros dos ombros, a ${f1(ombros)} cm; os acrômios, a ${f1(corpo.m('largura.biacromial'))} cm); cada mão a no máximo ${f1(naBarra)} cm do eixo da barra, e a beirada de fora a ${f1(sobra)} cm da ponta`, ok: a > corpo.m('largura.biacromial') && b - a <= 0.3 && naBarra <= 0.1 && sobra >= 0 };
  },
  'puxada-barra-no-alto-do-peito': (q, corpo) => {
    // no fim, o centro da barra abaixo da fúrcula do esterno (no alto do peito, acima da linha das axilas) e a barra
    // junto da pele do peito
    const x = q[q.length - 1]!;
    const e = x.esq;
    const r = obj('barraRetaPolia', 'diam') / 2;
    const B = x.marcas.barra!;
    const ombro = mul(add(e.lado.R.acromioclavicular, e.lado.L.acromioclavicular), 0.5);
    // a fúrcula fica praticamente na altura dos acrômios (tabela do corpo: 143,5 e 143,6 cm)
    const abaixo = dot(sub(ombro, B), e.torax.y) - (corpo.m('altura.acromio') - corpo.m('altura.supraesternal'));
    const axila = corpo.m('altura.supraesternal') - corpo.m('altura.axila');
    let pele = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'tronco') pele = Math.min(pele, aoSegmento(p, x.marcas['barra.a']!, x.marcas['barra.b']!) - r);
    return { medido: `no fim, o centro da barra fica ${f1(abaixo)} cm abaixo da fúrcula do esterno, ao longo do tronco (a linha das axilas fica a ${f1(axila)} cm), e a barra a ${f1(pele)} cm da pele do peito`, ok: abaixo >= 4 && abaixo <= axila + 6 && pele >= 0 && pele <= 2 };
  },
  'puxada-barra-cotovelos-para-baixo-e-para-tras': (q) => {
    // no fim, cada cotovelo abaixo do ombro e atrás do centro do ombro, no tórax
    const e = q[q.length - 1]!.esq;
    const ds = LADOS.map((k) => paraRef(e.torax, e.lado[k].cotovelo)[1] - paraRef(e.torax, e.lado[k].ombro)[1]);
    const zs = LADOS.map((k) => paraRef(e.torax, e.lado[k].cotovelo)[2] - paraRef(e.torax, e.lado[k].ombro)[2]);
    return { medido: `no fim, o centro do cotovelo fica ${f1(-Math.max(...ds))} cm abaixo do centro do ombro e ${f1(-Math.max(...zs))} cm atrás dele`, ok: Math.max(...ds) <= -15 && Math.max(...zs) < 0 };
  },
  // ----- rosca de costas para a torre -----
  'rosca-costas-cotovelo-parado-atras': (q) => {
    // o cotovelo não anda; o braço fica atrás da linha do tronco ("um pouco": de 10° a 40°) a série toda, e o cotovelo
    // dobra pelo menos 90° do começo ao fim
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.cotovelo, q[0]!.esq.lado.R.cotovelo)));
    const atras = q.map((x) => {
      const T = x.esq.torax,
        b = sub(x.esq.lado.R.cotovelo, x.esq.lado.R.ombro);
      return -Math.atan2(dot(b, T.z), -dot(b, T.y)) / rad;
    });
    const [a, b] = faixa(atras);
    const [c0, c1] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `o cotovelo anda ${f1(anda)} cm enquanto dobra de ${f1(c0)}° a ${f1(c1)}°; o braço fica de ${f1(a)}° a ${f1(b)}° atrás da linha do tronco`, ok: anda <= 1 && a >= 10 && b <= 40 && c1 - c0 >= 90 };
  },
  'rosca-costas-mao-perto-do-ombro': (q) => {
    // em cima, o centro da pegada mais perto do ombro que o antebraço com a mão (~33 cm): até 30 cm do centro dele
    const L = q[q.length - 1]!.esq.lado.R;
    const d = dist(L.pegada, L.ombro);
    return { medido: `em cima, o centro da pegada fica a ${f1(d)} cm do centro do ombro (${f1(L.ombro[1] - L.pegada[1])} cm abaixo dele)`, ok: d <= 30 };
  },
  'rosca-costas-polia-embaixo-atras': (q) => {
    // a roldana no ponto mais baixo da coluna, atrás da pessoa (de costas para a torre), a cerca de um passo
    const x = q[0]!;
    const r = x.marcas['cabo.roldana']!;
    const atras = x.esq.pelve.o[2] - r[2];
    const calc = Math.min(x.esq.lado.R.calcanhar[2], x.esq.lado.L.calcanhar[2]) - r[2];
    return { medido: `a roldana a ${f1(r[1])} cm do chão (o ponto mais baixo da coluna: ${f1(obj('torre', 'poliaMin'))} cm), ${f1(atras)} cm atrás do meio da pelve e ${f1(calc)} cm atrás dos calcanhares`, ok: Math.abs(r[1] - obj('torre', 'poliaMin')) <= 0.5 && atras >= 50 && atras <= 90 && calc >= 30 };
  },
  // ----- pull-through -----
  // A corda (os dois ramos, as pontas de borracha e a bucha, na ordem em que a peça os desenha) e o cabo, contra o corpo,
  // nos dois lados, em cada vista do guia (acréscimo de 19/11, auditoria das fases A e B): de lado, no começo e no meio,
  // a corda, que passa entre as pernas, era pintada por cima da coxa de perto. As mãos fecham nos ramos e não contam.
  'pull-through-corda-pintada-no-lugar': regraDePintura({
    exercicio: () => pullThrough,
    nome: 'a corda',
    fora: ['mao', 'polegar'],
    peca: (q) => {
      const corda = q.pecas?.find((p) => p.t === 'propria' && p.nome === 'corda-triceps'),
        cabo = q.pecas?.find((p) => p.t === 'cabo');
      const bucha = q.marcas.bucha;
      if (!corda || !bucha) return [];
      const r = obj('cordaTriceps', 'diam') / 2,
        rp = obj('cordaTriceps', 'pontaDiam') / 2,
        meiaMao = q.esq.corpo.m('mao.largura') / 2;
      // cada ramo, como em montarCorda (../pecas-de-cena/corda-triceps.ts): reto da pegada à bucha
      const partes: ParteDaPeca[] = LADOS.flatMap((k, i) => {
        const p = q.esq.lado[k].pegada,
          u = norm(sub(bucha, p));
        const entra = add(p, mul(u, -meiaMao)),
          sai = add(p, mul(u, meiaMao));
        return [
          { eixo: [entra, sai], raio: r, itens: [3 * i] },
          { eixo: [sai, bucha], raio: r, itens: [3 * i + 1] },
          { eixo: [entra, add(entra, mul(u, -obj('cordaTriceps', 'pontaComp')))], raio: rp, itens: [3 * i + 2] },
        ];
      });
      partes.push({ eixo: [bucha], raio: obj('cordaTriceps', 'anelDiam') / 2, itens: [6] });
      return [{ peca: corda, partes }, ...(cabo && cabo.t === 'cabo' ? [{ peca: cabo, partes: [{ eixo: [cabo.a, cabo.b], raio: Math.max(obj('torre', 'caboDiam'), 0.9) / 2 }] }] : [])];
    },
  }),
  'pull-through-bracos-so-seguram': (q) => {
    const [a, b] = faixa(q.flatMap((x) => LADOS.map((k) => x.esq.lado[k].ang.cotovelo)));
    return { medido: `o cotovelo fica de ${f1(a)}° a ${f1(b)}° o ciclo todo`, ok: b <= 10 };
  },
  'pull-through-maos-entre-as-pernas': (q) => {
    // no fim, o centro de cada mão entre os joelhos (de lado) e atrás do centro deles; no ciclo todo, a pele das mãos
    // não encosta na das coxas e das pernas (a cada 2 quadros)
    const e = q[q.length - 1]!.esq;
    const entre = LADOS.every((k) => Math.abs(e.lado[k].pegada[0]) < Math.abs(e.lado[k].joelho[0]));
    const atras = Math.min(...LADOS.map((k) => e.lado[k].joelho[2] - e.lado[k].pegada[2]));
    let pele = 1e9;
    for (const x of q.filter((_, i) => i % 2 === 0 || i === q.length - 1)) {
      const P = pontosDoBoneco(x.esq);
      const maos = P.filter((y) => y.parte === 'mao' || y.parte === 'polegar').map((y) => y.p);
      const pernas = P.filter((y) => y.parte === 'coxa' || y.parte === 'canela').map((y) => y.p);
      for (const a of maos) for (const b of pernas) pele = Math.min(pele, dist(a, b));
    }
    return { medido: `no fim, o centro das mãos fica ${entre ? 'entre os' : 'FORA dos'} joelhos e ${f1(atras)} cm atrás do centro deles; no ciclo, a pele das mãos fica a no mínimo ${f1(pele)} cm da pele das pernas`, ok: entre && atras > 0 && pele >= 0.3 };
  },
  'pull-through-polia-atras': (q) => {
    // a roldana no ponto mais baixo da coluna, atrás da pessoa (de costas para a torre), a cerca de dois passos
    const x = q[0]!;
    const r = x.marcas['cabo.roldana']!;
    const atras = x.esq.pelve.o[2] - r[2];
    return { medido: `a roldana a ${f1(r[1])} cm do chão (o ponto mais baixo da coluna: ${f1(obj('torre', 'poliaMin'))} cm) e ${f1(atras)} cm atrás do meio da pelve, em pé`, ok: Math.abs(r[1] - obj('torre', 'poliaMin')) <= 0.5 && atras >= 120 && atras <= 160 };
  },
  // ----- tríceps com a barra reta -----
  'triceps-barra-antebraco-acima-da-horizontal': (q) => {
    // em cima, o antebraço (do cotovelo ao punho) acima da horizontal, mas só "um pouco" (até 30°)
    const L = q[0]!.esq.lado.R;
    const d = sub(L.punho, L.cotovelo);
    const a = Math.atan2(d[1], Math.hypot(d[0], d[2])) / rad;
    return { medido: `em cima, o antebraço fica ${f1(Math.abs(a))}° ${a >= 0 ? 'acima' : 'abaixo'} da horizontal`, ok: a > 0 && a <= 30 };
  },
};

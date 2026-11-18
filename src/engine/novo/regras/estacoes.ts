// Regras medidas das estações de polia com assento (lote C2): a puxada pela frente na estação de puxada
// (../exercicios/puxada-frente.ts) e a remada baixa na estação (../exercicios/remada-baixa-estacao.ts). Cada uma recebe
// os quadros do começo até o fim da primeira fase com movimento. O limite vem do que a ficha da técnica pede, não do que
// a pose deu. As que já existem e servem (o braço estendido no começo, a pegada por cima ou neutra, o ombro que desce,
// o tronco quase parado, os cotovelos para baixo e para trás, os da remada) são usadas como estão; a pilha que sobe o
// que o cabo anda é medida pela conferência geral, com a relação da estação.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Prim } from '../desenho';
import { LADOS } from '../esqueleto';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { add, dist, dot, mul, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** O quanto um ponto entra numa caixa (positivo = dentro, em cm; negativo = fora). */
function dentroDaCaixa(p: V3, c: Extract<Prim, { t: 'caixa' }>): number {
  const l = paraRef(c.ref, p);
  return Math.min(c.meias[0] - Math.abs(l[0]), c.meias[1] - Math.abs(l[1]), c.meias[2] - Math.abs(l[2]));
}
/** Os volumes de estofado (os rolos) de um quadro: o eixo e o raio. */
function rolosDo(q: Quadro): [V3, V3, number][] {
  const out: [V3, V3, number][] = [];
  for (const p of q.prims) {
    if (p.t !== 'volume' || p.cls !== 'estofado') continue;
    const a = p.vol.aneis[0]!,
      b = p.vol.aneis[p.vol.aneis.length - 1]!;
    out.push([a.c, b.c, a.a]);
  }
  return out;
}
/** A pele do glúteo e das coxas contra o topo do assento (a primeira caixa de estofado): a menor altura acima dele. */
function noAssento(q: Quadro): number {
  const s = q.prims.find((p) => p.t === 'caixa' && p.cls === 'estofado');
  if (!s || s.t !== 'caixa') return 1e9;
  const topo = s.ref.o[1] + s.meias[1];
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (parte !== 'pelve' && parte !== 'coxa' && parte !== 'cintura') continue;
    const l = paraRef(s.ref, p);
    if (Math.abs(l[0]) <= s.meias[0] && Math.abs(l[2]) <= s.meias[2]) min = Math.min(min, p[1] - topo);
  }
  return min;
}

export const REGRAS_ESTACOES: Record<string, Regra> = {
  // ----- comuns às duas estações -----
  'estacao-cabo-da-roldana-a-pegada': (q) => {
    // o cabo sai da roldana (a saída fica na borda dela) até o mosquetão ou a ponta do puxador, que fica preso à pegada:
    // a distância das mãos ao ponto em que o cabo prende não muda
    const r = (x: Quadro) => dist(x.marcas['cabo.saida']!, x.marcas['cabo.roldana']!);
    const [r0, r1] = faixa(q.map(r));
    const maos = (x: Quadro) => dist(mul(add(x.esq.lado.R.pegada, x.esq.lado.L.pegada), 0.5), x.marcas['cabo.ponta']!);
    const [m0, m1] = faixa(q.map(maos));
    return { medido: `a saída do cabo fica de ${f1(r0)} a ${f1(r1)} cm do centro da roldana (a borda dela); o ponto em que o cabo prende fica de ${f1(m0)} a ${f1(m1)} cm do meio das mãos`, ok: r1 - r0 <= 0.05 && m1 - m0 <= 0.3 };
  },
  // ----- puxada pela frente -----
  'estacao-puxada-sentado-com-as-coxas-presas': (q) => {
    // o glúteo no assento; cada rolo encosta na coxa embaixo dele (afunda até 1 cm, sem folga); as solas no chão
    const x = primeiro(q);
    const assento = Math.min(...q.map(noAssento));
    let pior = -1e9,
      melhor = 1e9;
    for (const y of [x, ultimo(q)])
      for (const [a, b, rr] of rolosDo(y)) {
        let d = 1e9;
        for (const { p, parte } of pontosDoBoneco(y.esq)) if (parte === 'coxa') d = Math.min(d, aoSegmento(p, a, b) - rr);
        pior = Math.max(pior, d);
        melhor = Math.min(melhor, d);
      }
    const pes = Math.max(...q.flatMap((y) => LADOS.flatMap((k) => [y.esq.lado[k].calcanhar[1], y.esq.lado[k].bola[1]])));
    const joelho = angulosDoLado(x.esq, 'R').joelho;
    return { medido: `o glúteo fica ${f1(assento)} cm do topo do assento; cada rolo fica de ${f1(melhor)} a ${f1(pior)} cm da pele da coxa (negativo = afunda); o calcanhar e a bola do pé a no máximo ${f1(pes)} cm do chão; o joelho dobra ${f1(joelho)}°`, ok: assento >= -1.5 && assento <= 0.5 && melhor >= -1 && pior <= 0.3 && pes <= 0.3 && joelho >= 70 && joelho <= 100 };
  },
  'estacao-puxada-pegada': (q, corpo) => {
    // os centros das mãos a 1 a 1,5 vez a largura entre os acrômios, sempre na mesma distância (a barra tem largura
    // fixa), no eixo do trecho reto e sem passar da ponta dele
    const [a, b] = faixa(q.map((x) => dist(x.esq.lado.R.pegada, x.esq.lado.L.pegada)));
    const bi = corpo.m('largura.biacromial');
    const naBarra = Math.max(...q.map((x) => Math.max(...LADOS.map((k) => aoSegmento(x.esq.lado[k].pegada, x.marcas['barra.a']!, x.marcas['barra.b']!)))));
    const sobra = (obj('barraPuxada', 'retaComp') - b - corpo.m('mao.largura')) / 2;
    return { medido: `os centros das mãos ficam de ${f1(a)} a ${f1(b)} cm um do outro (${f1(a / bi)} vez a largura entre os acrômios, ${f1(bi)} cm); cada mão a no máximo ${f1(naBarra)} cm do eixo da barra, e a beirada de fora a ${f1(sobra)} cm do fim do trecho reto`, ok: a >= bi && b <= 1.5 * bi && b - a <= 0.3 && naBarra <= 0.1 && sobra >= 0 };
  },
  'estacao-puxada-barra-a-frente-do-rosto': (q) => {
    // em cada quadro em que a barra está na altura do rosto (entre o queixo e o alto da cabeça), o centro dela fica à
    // frente da pele do rosto (no tórax: z maior que o ponto mais à frente da cabeça naquela altura); no fim, abaixo do
    // queixo
    const r = obj('barraPuxada', 'diam') / 2;
    let pior = 1e9,
      nAltura = 0;
    for (const x of q) {
      const B = paraRef(x.esq.torax, x.marcas.barra!);
      let frente = -1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (parte !== 'cabeca' && parte !== 'pescoco' && parte !== 'calota') continue;
        const l = paraRef(x.esq.torax, p);
        if (Math.abs(l[1] - B[1]) <= r + 1 && Math.abs(l[0]) <= 10) frente = Math.max(frente, l[2]);
      }
      if (frente < -1e8) continue;
      nAltura++;
      pior = Math.min(pior, B[2] - r - frente);
    }
    return { medido: `nos ${nAltura} quadros em que a barra passa na altura do rosto e do pescoço, ela fica no mínimo ${f1(pior)} cm à frente da pele`, ok: nAltura > 0 && pior >= 1 };
  },
  'estacao-puxada-barra-no-alto-do-peito': (q, corpo) => {
    // no fim, o centro da barra abaixo da fúrcula do esterno (no alto do peito, acima da linha das axilas) e a barra junto
    // da pele do peito
    const x = ultimo(q);
    const e = x.esq;
    const r = obj('barraPuxada', 'diam') / 2;
    const B = x.marcas.barra!;
    const ombro = mul(add(e.lado.R.acromioclavicular, e.lado.L.acromioclavicular), 0.5);
    const abaixo = dot(sub(ombro, B), e.torax.y) - (corpo.m('altura.acromio') - corpo.m('altura.supraesternal'));
    const axila = corpo.m('altura.supraesternal') - corpo.m('altura.axila');
    let pele = 1e9;
    for (const { p, parte } of pontosDoBoneco(e)) if (parte === 'tronco') pele = Math.min(pele, aoSegmento(p, x.marcas['barra.a']!, x.marcas['barra.b']!) - r);
    return { medido: `no fim, o centro da barra fica ${f1(abaixo)} cm abaixo da fúrcula do esterno, ao longo do tronco (a linha das axilas fica a ${f1(axila)} cm), e a barra a ${f1(pele)} cm da pele do peito`, ok: abaixo >= 4 && abaixo <= axila + 6 && pele >= 0 && pele <= 2 };
  },
  'estacao-puxada-barra-livre-do-corpo': (q) => {
    // a barra (o trecho reto e as pontas caídas, menos o raio) e o cabo contra a pele, fora as mãos que seguram e o
    // pedaço do antebraço junto do punho
    const r = obj('barraPuxada', 'diam') / 2;
    let barra = 1e9,
      fio = 1e9,
      onde = '';
    for (const x of q.filter((_, i) => i % 2 === 0 || i === q.length - 1)) {
      const M = x.marcas;
      const segs: [V3, V3][] = [
        [M['barra.pa']!, M['barra.a']!],
        [M['barra.a']!, M['barra.b']!],
        [M['barra.b']!, M['barra.pb']!],
      ];
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (parte === 'mao' || parte === 'polegar' || (parte === 'ante' && Math.min(dist(p, x.esq.lado.R.punho), dist(p, x.esq.lado.L.punho)) < 8)) continue;
        for (const [a, b] of segs) {
          const d = aoSegmento(p, a, b) - r;
          if (d < barra) {
            barra = d;
            onde = parte;
          }
        }
        fio = Math.min(fio, aoSegmento(p, M['cabo.ponta']!, M['cabo.saida']!));
      }
    }
    return { medido: `a barra passa a no mínimo ${f1(barra)} cm da pele (${onde}); o cabo, a ${f1(fio)} cm`, ok: barra >= 0.5 && fio >= 0.5 };
  },
  // ----- remada baixa na estação -----
  'estacao-remada-sentado-pes-na-plataforma': (q) => {
    // o glúteo no assento; a sola de cada pé na chapa da plataforma (a bola e o calcanhar, contra o plano da chapa); os
    // joelhos levemente dobrados
    const x = primeiro(q);
    const assento = Math.min(...q.map(noAssento));
    const n = x.marcas['chapa.normal']!,
      o = x.marcas['chapa']!;
    const sola = q.flatMap((y) => LADOS.flatMap((k) => [dot(sub(y.esq.lado[k].bola, o), n), dot(sub(y.esq.lado[k].calcanhar, o), n)]));
    const [s0, s1] = faixa(sola);
    const [j0, j1] = faixa(q.map((y) => angulosDoLado(y.esq, 'R').joelho));
    return { medido: `o glúteo fica ${f1(assento)} cm do topo do assento; a bola e o calcanhar ficam de ${f1(s0)} a ${f1(s1)} cm da chapa da plataforma; o joelho dobra de ${f1(j0)}° a ${f1(j1)}°`, ok: assento >= -1.5 && assento <= 0.5 && s0 >= -0.3 && s1 <= 0.3 && j0 >= 10 && j1 <= 45 };
  },
  'estacao-remada-tronco-quase-vertical': (q) => {
    // o peito perto da vertical o ciclo todo (a ficha: tronco quase vertical; o cartão: tronco parado)
    const peito = (x: Quadro) => (Math.atan2(x.esq.torax.y[2], x.esq.torax.y[1]) * 180) / Math.PI;
    const [a, b] = faixa(q.map(peito));
    return { medido: `o peito fica de ${f1(a)}° a ${f1(b)}° da vertical (positivo = à frente)`, ok: a >= -3 && b <= 8 && b - a <= 6 };
  },
  'estacao-remada-maos-no-abdomen': (q) => {
    // no fim, as mãos no triângulo chegam ao abdômen: entre o umbigo (a altura da cintura) e a linha de baixo do peito,
    // a até 3 cm da pele
    const x = ultimo(q);
    const e = x.esq;
    const M = mul(add(e.lado.R.pegada, e.lado.L.pegada), 0.5);
    const l = paraRef(e.torax, M);
    const c = e.corpo;
    const cintura = c.m('altura.cintura') - c.m('altura.cervical'),
      peito = c.m('altura.peito') - c.m('altura.cervical');
    let frente = -1e9;
    for (const { p, parte } of pontosDoBoneco(e)) {
      if (parte !== 'tronco' && parte !== 'cintura' && parte !== 'emendaDaCintura') continue;
      const k = paraRef(e.torax, p);
      if (Math.abs(k[1] - l[1]) <= 3 && Math.abs(k[0]) <= 8) frente = Math.max(frente, k[2]);
    }
    const maos = Math.min(...pontosDoBoneco(e).filter((y) => y.parte === 'mao' || y.parte === 'polegar').map((y) => paraRef(e.torax, y.p)[2]));
    return { medido: `no fim, o meio das mãos fica ${f1(-l[1])} cm abaixo da base do pescoço, ao longo do tronco (a cintura fica a ${f1(-cintura)}; a linha do peito, a ${f1(-peito)}), e a pele das mãos a ${f1(maos - frente)} cm da barriga`, ok: l[1] <= peito && l[1] >= cintura - 4 && maos - frente >= 0 && maos - frente <= 3 };
  },
  'estacao-remada-triangulo-livre': (q) => {
    // o triângulo e o cabo contra a pele (fora as mãos e o antebraço junto do punho) e contra a plataforma e o assento
    let corpo = 1e9,
      onde = '',
      maquina = 1e9;
    for (const x of q.filter((_, i) => i % 2 === 0 || i === q.length - 1)) {
      const segs: [V3, V3, number][] = [];
      for (const p of x.prims as Prim[]) {
        if (p.t === 'fio' && (p.cls === 'cabo' || p.cls === 'aco')) for (let i = 1; i < p.pts.length; i++) segs.push([p.pts[i - 1]!, p.pts[i]!, p.larg / 2]);
        if (p.t === 'volume' && p.cls === 'aco') {
          const a = p.vol.aneis[0]!,
            b = p.vol.aneis[p.vol.aneis.length - 1]!;
          segs.push([a.c, b.c, a.a]);
        }
      }
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (parte === 'mao' || parte === 'polegar' || (parte === 'ante' && Math.min(dist(p, x.esq.lado.R.punho), dist(p, x.esq.lado.L.punho)) < 8)) continue;
        for (const [a, b, r] of segs) {
          const d = aoSegmento(p, a, b) - r;
          if (d < corpo) {
            corpo = d;
            onde = parte;
          }
        }
      }
      for (const c of x.prims) {
        if (c.t !== 'caixa') continue;
        for (const [a, b, r] of segs)
          for (let i = 0; i <= 8; i++) maquina = Math.min(maquina, -dentroDaCaixa(add(a, mul(sub(b, a), i / 8)), c) - r);
      }
    }
    return { medido: `o triângulo e o cabo passam a no mínimo ${f1(corpo)} cm da pele (${onde}) e a ${f1(maquina)} cm da máquina`, ok: corpo >= 0.5 && maquina >= 0.3 };
  },
};

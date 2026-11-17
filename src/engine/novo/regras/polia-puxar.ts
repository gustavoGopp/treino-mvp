// Regras medidas dos exercícios de puxar na polia (núcleo ../exercicios/polia-puxar.ts): a remada baixa sentada com
// o triângulo, a remada unilateral em pé com o estribo e o abdominal ajoelhado com a corda. Cada uma recebe os quadros
// do começo até o fim da primeira fase com movimento. O limite vem do que a ficha da técnica pede, não do que a pose deu.
// As regras que já existem e servem (a lombar neutra, o braço estendido no começo, o cotovelo rente, as escápulas que
// se juntam, a pegada neutra) são usadas como estão.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Prim } from '../desenho';
import type { Esq } from '../esqueleto';
import { LADOS } from '../esqueleto';
import { entraNoTronco, folgaDaBarriga } from '../exercicios/polia-puxar';
import type { Quadro } from '../movimento';
import { angulo, dist, dot, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
const rad = Math.PI / 180;
/** Inclinação do peito à frente da vertical (graus). */
const peito = (e: Esq) => Math.atan2(e.torax.y[2], e.torax.y[1]) / rad;
/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** Os segmentos (com o raio) do cabo e do puxador de um quadro: os fios e os volumes de aço e de corda. */
function segmentosDoPuxador(q: Quadro): [V3, V3, number][] {
  const out: [V3, V3, number][] = [];
  for (const p of q.prims as Prim[]) {
    if (p.t === 'fio' && (p.cls === 'cabo' || p.cls === 'aco')) for (let i = 1; i < p.pts.length; i++) out.push([p.pts[i - 1]!, p.pts[i]!, p.larg / 2]);
    if (p.t === 'volume' && (p.cls === 'aco' || p.cls === 'esc')) {
      const a = p.vol.aneis[0]!,
        b = p.vol.aneis[p.vol.aneis.length - 1]!;
      out.push([a.c, b.c, Math.max(a.a, a.f)]);
    }
  }
  return out;
}

export const REGRAS_POLIA_PUXAR: Record<string, Regra> = {
  'polia-puxar-sentado-na-ponta-do-banco': (q) => {
    // o ponto mais baixo do glúteo e das coxas contra o tampo do banco, e a sola dos pés no chão
    const x = primeiro(q);
    const topo = x.marcas.topoDoBanco!;
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq)) if ((parte === 'pelve' || parte === 'coxa' || parte === 'cintura') && Math.abs(p[0]) < 15 && p[2] < topo[2]) min = Math.min(min, p[1]);
    const pes = Math.max(...q.flatMap((y) => LADOS.flatMap((k) => [y.esq.lado[k].calcanhar[1], y.esq.lado[k].bola[1]])));
    const joelho = angulosDoLado(x.esq, 'R').joelho;
    const atras = topo[2] - x.esq.pelve.o[2];
    return { medido: `o glúteo fica ${f1(min - topo[1])} cm do tampo do banco, o quadril ${f1(atras)} cm atrás da ponta; o calcanhar e a bola do pé a no máximo ${f1(pes)} cm do chão; o joelho dobra ${f1(joelho)}°`, ok: Math.abs(min - topo[1]) <= 1.5 && atras > 0 && atras <= 20 && pes <= 0.3 && joelho >= 60 && joelho <= 110 };
  },
  'polia-puxar-tronco-volta-a-vertical': (q) => {
    const a = peito(primeiro(q).esq),
      b = peito(ultimo(q).esq);
    const menor = Math.min(...q.map((x) => peito(x.esq)));
    return { medido: `o peito sai de ${f1(a)}° à frente da vertical e termina a ${f1(b)}°; no máximo ${f1(Math.max(0, -menor))}° para trás`, ok: a >= 8 && a <= 15.5 && Math.abs(b) <= 2 && menor >= -2 };
  },
  'polia-puxar-triangulo-no-abdomen': (q) => {
    const d = folgaDaBarriga(ultimo(q).esq);
    return { medido: `no fim, as mãos no triângulo ficam a ${f1(d)} cm da pele da barriga`, ok: d >= 0 && d <= 3 };
  },
  'polia-puxar-cotovelos-atras-do-tronco': (q) => {
    // no fim, de lado: o centro de cada cotovelo atrás da pele das costas na altura dele (o ponto mais de trás da pele
    // do tronco numa faixa de 4 cm em volta da altura do cotovelo, medido ao longo da frente do tórax)
    const e = ultimo(q).esq;
    const P = pontosDoBoneco(e).filter((x) => x.parte === 'tronco' || x.parte === 'cintura' || x.parte === 'emendaDaCintura');
    const frente = e.torax.z;
    const pior = Math.max(...LADOS.map((k) => {
      const c = e.lado[k].cotovelo;
      const alto = (p: V3) => dot(sub(p, c), e.torax.y);
      const costas = Math.min(...P.filter((x) => Math.abs(alto(x.p)) <= 2).map((x) => dot(sub(x.p, c), frente)));
      // positivo = o cotovelo à frente da pele das costas
      return -costas;
    }));
    return { medido: `no fim, o centro dos cotovelos fica ${f1(Math.abs(pior))} cm ${pior <= 0 ? 'atrás' : 'à frente'} da pele das costas na altura deles`, ok: pior <= 0 };
  },
  'polia-puxar-cabo-quase-horizontal': (q) => {
    const a = q.map((x) => {
      const d = sub(x.marcas.saida!, x.marcas.ponta!);
      return Math.abs(Math.atan2(d[1], Math.hypot(d[0], d[2]))) / rad;
    });
    const [, b] = faixa(a);
    return { medido: `o cabo fica no máximo ${f1(b)}° da horizontal`, ok: b <= 10 };
  },
  'polia-puxar-puxador-e-cabo-livres': (q, corpo) => {
    // o cabo e o puxador (o triângulo, o estribo ou a corda) contra a pele do corpo, fora as mãos e os antebraços que
    // seguram, e contra as caixas da cena (o banco); a cada 2 quadros
    void corpo;
    let min = 1e9,
      qual = '',
      banco = 1e9;
    for (const x of q.filter((_, i) => i % 2 === 0 || i === q.length - 1)) {
      const segs = segmentosDoPuxador(x);
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (parte === 'mao' || parte === 'polegar' || parte === 'ante') continue;
        for (const [a, b, r] of segs) {
          const d = aoSegmento(p, a, b) - r;
          if (d < min) {
            min = d;
            qual = parte;
          }
        }
      }
      for (const c of x.prims) {
        if (c.t !== 'caixa' || c.cls !== 'estofado') continue;
        for (const [a, b, r] of segs)
          for (let i = 0; i <= 8; i++) {
            const p: V3 = [a[0] + ((b[0] - a[0]) * i) / 8, a[1] + ((b[1] - a[1]) * i) / 8, a[2] + ((b[2] - a[2]) * i) / 8];
            const l = paraRef(c.ref, p);
            banco = Math.min(banco, -Math.min(c.meias[0] - Math.abs(l[0]), c.meias[1] - Math.abs(l[1]), c.meias[2] - Math.abs(l[2])) - r);
          }
      }
    }
    return { medido: `o cabo e o puxador passam a no mínimo ${f1(min)} cm da pele (${qual})${banco < 1e8 ? ` e ${f1(banco)} cm do banco` : ''}`, ok: min >= 0.5 && banco >= 0.5 };
  },
  'polia-puxar-antebraco-fora-do-tronco': (q) => {
    // a pele do antebraço e da mão contra a do tronco: o quanto ela entra nos anéis da pele do tronco
    const pior = Math.max(...q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map((x) => entraNoTronco(x.esq, (p) => p === 'ante')));
    return { medido: `o antebraço entra no máximo ${f1(pior)} cm na pele do tronco`, ok: pior <= 1 };
  },
  'polia-puxar-cabo-na-direcao-da-polia': (q) => {
    // o antebraço do braço que puxa na linha do cabo, do meio da puxada em diante (no começo o braço e o antebraço
    // estão quase em linha)
    const pior = Math.max(...q.filter((_, i) => i > q.length * 0.4).map((x) => angulo(sub(x.esq.lado.R.punho, x.esq.lado.R.cotovelo), sub(x.marcas.saida!, x.marcas.ponta!))));
    return { medido: `da metade da puxada em diante, o antebraço desvia no máximo ${f1(pior)}° da linha do cabo`, ok: pior <= 12 };
  },
  // ----- abdominal na polia, ajoelhado -----
  'polia-puxar-quadril-parado': (q) => {
    // a bacia não anda nem gira (o quadril não dobra mais nem menos), e fica atrás dos joelhos
    const a = primeiro(q).esq;
    const anda = Math.max(...q.map((x) => dist(x.esq.pelve.o, a.pelve.o)));
    const gira = Math.max(...q.map((x) => Math.max(angulo(x.esq.pelve.y, a.pelve.y), angulo(x.esq.pelve.z, a.pelve.z))));
    const atras = (a.lado.R.joelho[2] + a.lado.L.joelho[2]) / 2 - a.pelve.o[2];
    return { medido: `a bacia anda no máximo ${f1(anda)} cm e gira no máximo ${f1(gira)}°; o centro do quadril fica ${f1(atras)} cm atrás dos joelhos`, ok: anda <= 0.1 && gira <= 0.5 && atras > 0 && atras <= 20 };
  },
  'polia-puxar-coluna-enrola': (q) => {
    // no começo a coluna neutra (sem flexão além da curva de repouso); no fim, a lombar e a torácica dobram, e o tórax
    // gira para a frente em relação à bacia (as costelas vão ao quadril)
    const a = primeiro(q).esq,
      b = ultimo(q).esq;
    const ini = Math.abs(a.pose.lombar ?? 0) + Math.abs(a.pose.toracica ?? 0);
    const lo = (b.pose.lombar ?? 0) - (a.pose.lombar ?? 0),
      to = (b.pose.toracica ?? 0) - (a.pose.toracica ?? 0);
    const giro = angulo(b.torax.y, a.torax.y);
    const cost = dist(a.torax.o, a.pelve.o) - dist(b.torax.o, b.pelve.o);
    return { medido: `no começo a coluna dobra ${f1(ini)}° além da curva de repouso; no fim a lombar dobra ${f1(lo)}° e a torácica ${f1(to)}°, o tórax gira ${f1(giro)}° à frente e a base do pescoço chega ${f1(cost)} cm mais perto do quadril`, ok: ini <= 0.5 && lo >= 15 && to >= 25 && giro >= 45 && cost >= 5 };
  },
  'polia-puxar-maos-paradas-na-cabeca': (q) => {
    // o centro de cada mão no referencial da cabeça não anda, e a pele da mão fica junto da pele da cabeça
    const a = primeiro(q).esq;
    const p0 = LADOS.map((k) => paraRef(a.cabeca, a.lado[k].pegada));
    const anda = Math.max(...q.map((x) => Math.max(...LADOS.map((k, i) => dist(paraRef(x.esq.cabeca, x.esq.lado[k].pegada), p0[i]!)))));
    const P = pontosDoBoneco(a);
    const cab = P.filter((x) => x.parte === 'cabeca').map((x) => x.p),
      maos = P.filter((x) => x.parte === 'mao' || x.parte === 'polegar').map((x) => x.p);
    let d = 1e9;
    for (const m of maos) for (const c of cab) d = Math.min(d, dist(m, c));
    return { medido: `as mãos andam no máximo ${f1(anda)} cm em relação à cabeça; a pele delas fica a ${f1(d)} cm da pele da cabeça`, ok: anda <= 0.1 && d <= 1.5 };
  },
  'polia-puxar-cotovelos-vao-as-coxas': (q) => {
    // a distância do cotovelo direito à pele da coxa direita, do começo ao fim
    const d = (e: Esq) => Math.min(...pontosDoBoneco(e).filter((x) => x.parte === 'coxa' && x.p[0] < 0).map((x) => dist(x.p, e.lado.R.cotovelo)));
    const a = d(primeiro(q).esq),
      b = d(ultimo(q).esq);
    return { medido: `o cotovelo fica a ${f1(a)} cm da coxa no começo e a ${f1(b)} cm no fim`, ok: b <= a * 0.6 && b >= 0 };
  },
  'polia-puxar-ajoelhado-no-colchonete': (q) => {
    // a pele dos joelhos no tampo do colchonete (o ponto mais baixo da coxa e da canela perto do joelho) e a largura
    const x = primeiro(q);
    const topo = x.prims.find((p) => p.t === 'caixa' && p.cls === 'tapete');
    const yTopo = topo && topo.t === 'caixa' ? topo.ref.o[1] + topo.meias[1] : 0;
    let min = 1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq)) if ((parte === 'coxa' || parte === 'canela') && LADOS.some((k) => dist(p, x.esq.lado[k].joelho) < 12)) min = Math.min(min, p[1]);
    const larg = dist(x.esq.lado.R.joelho, x.esq.lado.L.joelho),
      quadril = dist(x.esq.lado.R.quadril, x.esq.lado.L.quadril);
    return { medido: `a pele dos joelhos fica a ${f1(min - yTopo)} cm do colchonete; os joelhos a ${f1(larg)} cm um do outro (os quadris a ${f1(quadril)} cm)`, ok: Math.abs(min - yTopo) <= 1 && Math.abs(larg - quadril) <= 3 };
  },
};

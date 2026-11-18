// Regras medidas da abdução e da adução na cadeira abdutora e adutora (../exercicios/quadril-na-maquina.ts). Marcas
// que os quadros dão: `eixoR` e `eixoL` (os eixos dos braços), `almofadaR` e `almofadaL` (o centro de cada almofada),
// `apoioR` e `apoioL` (o centro do topo de cada apoio do pé), `regulagem` ([abertura dos braços, posição inicial,
// quanto as placas do pino estão acima das de baixo]).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq, Lado } from '../esqueleto';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { angulo, dist, dot, sub } from '../vec';
import type { V3 } from '../vec';
import { apoioNoAssentoDaMaquina } from '../exercicios/quadril-na-maquina';
import { eixosDoBraco, geometriaDaAbdutora } from '../pecas-de-cena/cadeira-abdutora';

const g = (id: string) => obj('cadeiraAbdutora', id);
const LADOS: Lado[] = ['R', 'L'];
const s = (k: Lado) => (k === 'R' ? -1 : 1) as -1 | 1;
const graus = (q: Quadro) => q.marcas.regulagem![0];

/** A menor folga entre as costas (tronco, cintura e bacia, perto do meio) e a face do encosto (cm; negativo = entra). */
function folgaDoEncosto(e: Esq): { costas: number; gluteo: number } {
  const G = geometriaDaAbdutora();
  let costas = 1e9,
    gluteo = 1e9;
  const fim = G.topo + g('encostoComp') * G.sobe[1];
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!['tronco', 'cintura', 'pelve', 'emendaDaCintura'].includes(parte) || Math.abs(p[0]) > 14 || p[1] > fim || p[1] < G.topo) continue;
    const d = dot(sub(p, G.baseEncosto), G.frente);
    if (parte === 'pelve' || p[1] < G.topo + 15) gluteo = Math.min(gluteo, d);
    else costas = Math.min(costas, d);
  }
  return { costas, gluteo };
}

/** A pele da perna perto da almofada, medida contra a face dela (cm; positivo = folga, negativo = entra). */
function folgaDaAlmofada(q: Quadro, k: Lado): number {
  const c = q.marcas[`almofada${k}`]!;
  const { fora, ao } = eixosDoBraco(s(k), graus(q));
  // a face que encosta no joelho: para dentro na abdução (a almofada por fora), para fora na adução
  const lado = dot(sub(c, q.esq.lado[k].joelho), fora) > 0 ? 1 : -1;
  const n: V3 = [-fora[0] * lado, 0, -fora[2] * lado];
  const face = c.map((v, i) => v + (n[i]! * g('estofadoEsp')) / 2) as V3;
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (parte !== 'coxa' && parte !== 'canela') continue;
    const r = sub(p, c);
    if (Math.abs(dot(r, ao)) > g('almofadaComp') / 2 || Math.abs(r[1]) > g('almofadaAlt') / 2) continue;
    // só a perna desse lado
    if (dist(p, q.esq.lado[k].joelho) > dist(p, q.esq.lado[k === 'R' ? 'L' : 'R'].joelho)) continue;
    min = Math.min(min, dot(sub(p, face), n));
  }
  return min;
}

/** Onde o joelho fica no referencial do braço (para fora, altura, ao longo). */
function noReferencialDoBraco(q: Quadro, k: Lado, p: V3): V3 {
  const { fora, ao } = eixosDoBraco(s(k), graus(q));
  const r = sub(p, q.marcas[`eixo${k}`]!);
  return [dot(r, fora), p[1], dot(r, ao)];
}

export const REGRAS_CADEIRA_ABDUTORA: Record<string, Regra> = {
  'abdutora-sentado-encostado': (q) => {
    const ext = [q[0]!, q[q.length - 1]!];
    const [a0, a1] = faixa(ext.map((x) => apoioNoAssentoDaMaquina(x.esq) + 0));
    const enc = ext.map((x) => folgaDoEncosto(x.esq));
    const [c0, c1] = faixa(enc.map((x) => x.costas)),
      [g0, g1] = faixa(enc.map((x) => x.gluteo));
    const anda = Math.max(...q.map((x) => dist(x.esq.torax.o, q[0]!.esq.torax.o)));
    const maos = Math.max(...q.flatMap((x) => LADOS.map((k) => dist(x.esq.lado[k].pegada, [s(k) * g('pegadorFora'), g('pegadorAltura'), geometriaDaAbdutora().zEixo - 1.5]))));
    return {
      medido: `o glúteo e a coxa ficam de ${f1(a0)} a ${f1(a1)} cm do tampo do assento; as costas, de ${f1(c0)} a ${f1(c1)} cm do encosto, e o glúteo, de ${f1(g0)} a ${f1(g1)} cm; a base do pescoço anda ${f1(anda)} cm no ciclo; as mãos ficam a no máximo ${f1(maos)} cm do meio dos pegadores`,
      ok: a0 >= -1.5 && a1 <= 0.5 && c0 >= -1.5 && c1 <= 1 && g0 >= -2 && g1 <= 2.5 && anda <= 1 && maos <= 0.5,
    };
  },
  'abdutora-eixo-no-quadril': (q) => {
    const d = Math.max(...q.flatMap((x) => LADOS.map((k) => {
      const a = x.esq.lado[k].quadril,
        e = x.marcas[`eixo${k}`]!;
      return Math.hypot(a[0] - e[0], a[2] - e[2]);
    })));
    return { medido: `o centro do quadril fica a no máximo ${f1(d)} cm (na horizontal) do eixo do braço do mesmo lado`, ok: d <= 0.5 };
  },
  'abdutora-pes-nos-apoios': (q) => {
    const [j0, j1] = faixa(q.flatMap((x) => LADOS.map((k) => angulosDoLado(x.esq, k).joelho)));
    // a sola (a bola e o calcanhar) no topo do apoio e o meio do pé parado no referencial do braço
    let sola = 0,
      anda = 0,
      fora = 0;
    for (const k of LADOS) {
      const ref = noReferencialDoBraco(q[0]!, k, q[0]!.esq.lado[k].bola);
      for (const x of q) {
        const L = x.esq.lado[k];
        sola = Math.max(sola, Math.abs(L.bola[1] - g('apoioPeAltura')), Math.abs(L.calcanhar[1] - g('apoioPeAltura')));
        anda = Math.max(anda, dist(noReferencialDoBraco(x, k, L.bola), ref));
        const meio = noReferencialDoBraco(x, k, [(L.bola[0] + L.calcanhar[0]) / 2, 0, (L.bola[2] + L.calcanhar[2]) / 2]);
        fora = Math.max(fora, Math.abs(meio[0]) - g('apoioPeLarg') / 2, Math.abs(meio[2] - g('apoioPeFrente')) - g('apoioPeComp') / 2);
      }
    }
    return {
      medido: `o joelho fica de ${f1(j0)}° a ${f1(j1)}°; a sola fica a no máximo ${f1(sola)} cm do topo do apoio e a bola do pé anda ${f1(anda)} cm em cima dele; o meio do pé fica ${fora > 0 ? `${f1(fora)} cm fora` : 'dentro'} do apoio`,
      ok: j0 >= 85 && j1 <= 95 && sola <= 0.5 && anda <= 0.3 && fora <= 0,
    };
  },
  'abdutora-almofada-no-joelho': (q) => {
    const [a, b] = faixa(q.flatMap((x) => LADOS.map((k) => folgaDaAlmofada(x, k))));
    let anda = 0;
    for (const k of LADOS) {
      const ref = noReferencialDoBraco(q[0]!, k, q[0]!.esq.lado[k].joelho);
      for (const x of q) anda = Math.max(anda, dist(noReferencialDoBraco(x, k, x.esq.lado[k].joelho), ref));
    }
    const lado = q[0]!.marcas.almofadaR![0] < q[0]!.esq.lado.R.joelho[0] ? 'por fora' : 'por dentro';
    return { medido: `as almofadas ficam ${lado} dos joelhos, de ${f1(a)} a ${f1(b)} cm da pele (negativo = o estofado amassa); o joelho anda ${f1(anda)} cm em relação à almofada`, ok: a >= -2 && b <= 0.5 && anda <= 0.3 };
  },
  'abdutora-placas-sem-bater': (q) => {
    const [a, b] = faixa(q.map((x) => x.marcas.regulagem![2]));
    // a subida é o arco do came: o raio vezes o ângulo girado desde a posição inicial
    const erro = Math.max(...q.map((x) => {
      const [gr, ini, sub] = x.marcas.regulagem!;
      return Math.abs(sub - (Math.abs(gr - ini) * Math.PI * g('cameRaio')) / 180);
    }));
    return { medido: `as placas do pino ficam de ${f1(a)} a ${f1(b)} cm acima das de baixo (o arco do came, com erro de ${f1(erro)} cm)`, ok: a >= 1 && erro <= 0.1 };
  },
  'abdutora-pernas-abrem': (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').abducaoDoQuadril));
    const largura = (e: Esq) => dist(e.lado.R.joelho, e.lado.L.joelho);
    const giro = Math.max(...q.map((x) => Math.abs(angulo(x.esq.lado.R.canela.y, [0, 1, 0]) - angulo(q[0]!.esq.lado.R.canela.y, [0, 1, 0]))));
    return { medido: `cada coxa abre de ${f1(a)}° a ${f1(b)}°; os joelhos vão de ${f1(largura(q[0]!.esq))} a ${f1(largura(q[q.length - 1]!.esq))} cm um do outro; a perna não muda de inclinação (${f1(giro)}°)`, ok: a <= 10 && b >= 30 && b <= 40 && giro <= 0.5 };
  },
  'adutora-pernas-fecham': (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').abducaoDoQuadril));
    // as almofadas quase se tocam: a menor distância entre as faces de dentro, nos cantos de trás (os mais próximos)
    const fim = q[q.length - 1]!;
    const canto = (k: Lado) => {
      const c = fim.marcas[`almofada${k}`]!;
      const { fora, ao } = eixosDoBraco(s(k), graus(fim));
      return [0, 1, 2].map((i) => c[i]! - (fora[i]! * g('estofadoEsp')) / 2 - (ao[i]! * g('almofadaComp')) / 2) as V3;
    };
    const entre = canto('L')[0] - canto('R')[0];
    return { medido: `cada coxa vai de ${f1(b)}° aberta a ${f1(a)}°; no fim, as almofadas ficam a ${f1(entre)} cm uma da outra (nos cantos de trás)`, ok: b >= 30 && b <= 40 && entre >= 0.5 && entre <= 3 };
  },
};

// Regras medidas dos tríceps franceses (na polia com a corda, com um halter e com um kettlebell): o braço parado acima
// da cabeça, os cotovelos perto da cabeça, o alongado atrás da cabeça e a carga que não encosta no corpo nem no banco.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { angulo, dist, dot, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** Inclinação do peito à frente da vertical (graus). */
const peito = (q: Quadro) => Math.atan2(q.esq.torax.y[2], q.esq.torax.y[1]) / (Math.PI / 180);
/** As partes do corpo em que a carga não pode encostar (as mãos seguram a carga de propósito). */
const LIVRES = new Set(['cabeca', 'pescoco', 'tronco', 'braco', 'ante', 'cintura', 'emendaDaCintura', 'pelve', 'coxa']);

/**
 * A menor folga (cm) entre a carga do quadro e a pele do corpo (fora as mãos), e a parte mais perto. A carga é o que o
 * quadro tem: as cabeças do halter (prismas, medidas até o canto, com a mais perto das palmas de fora: ela fica nas
 * mãos) ou a bola do kettlebell (esfera).
 */
export function folgaDaCargaAoCorpo(q: Quadro): { folga: number; parte: string } {
  const P = pontosDoBoneco(q.esq).filter((x) => LIVRES.has(x.parte));
  let folga = 1e9,
    parte = '';
  for (const c of q.prims) {
    if (c.t !== 'prisma' && c.t !== 'esfera') continue;
    for (const x of P) {
      const d = c.t === 'prisma' ? aoSegmento(x.p, c.a, c.b) - c.ra : dist(x.p, c.c) - c.r;
      if (d < folga) {
        folga = d;
        parte = x.parte;
      }
    }
  }
  return { folga, parte };
}
/** A menor folga (cm) entre a carga e o estofado do banco (a caixa de cima). */
function folgaDaCargaAoBanco(q: Quadro): number {
  const banco = q.prims.find((p) => p.t === 'caixa' && p.cls === 'estofado');
  if (!banco || banco.t !== 'caixa') return 1e9;
  let min = 1e9;
  for (const c of q.prims) {
    if (c.t !== 'prisma' && c.t !== 'esfera') continue;
    const amostras: [V3, number][] = c.t === 'esfera' ? [[c.c, c.r]] : [0, 0.25, 0.5, 0.75, 1].map((t): [V3, number] => [[c.a[0] + (c.b[0] - c.a[0]) * t, c.a[1] + (c.b[1] - c.a[1]) * t, c.a[2] + (c.b[2] - c.a[2]) * t], c.ra]);
    for (const [p, r] of amostras) {
      const l = paraRef(banco.ref, p);
      const fora = [0, 1, 2].map((i) => Math.max(0, Math.abs(l[i]!) - banco.meias[i]!));
      min = Math.min(min, Math.hypot(...fora) - r);
    }
  }
  return min;
}

export const REGRAS_TRICEPS_FRANCES: Record<string, Regra> = {
  'triceps-frances-braco-parado': (q) => {
    // o cotovelo no referencial do tronco (e no mundo) e a direção do braço no tronco, contra o primeiro quadro
    const T0 = q[0]!.esq.torax;
    const c0 = paraRef(T0, q[0]!.esq.lado.R.cotovelo);
    const b0 = norm(paraRef({ ...T0, o: [0, 0, 0] }, sub(q[0]!.esq.lado.R.cotovelo, q[0]!.esq.lado.R.ombro)));
    let noTronco = 0,
      noMundo = 0,
      gira = 0;
    for (const x of q) {
      const T = x.esq.torax,
        L = x.esq.lado.R;
      noTronco = Math.max(noTronco, dist(paraRef(T, L.cotovelo), c0));
      noMundo = Math.max(noMundo, dist(L.cotovelo, q[0]!.esq.lado.R.cotovelo));
      gira = Math.max(gira, angulo(paraRef({ ...T, o: [0, 0, 0] }, sub(L.cotovelo, L.ombro)), b0));
    }
    return { medido: `do alongado ao estendido, o cotovelo anda ${f1(noMundo)} cm (${f1(noTronco)} cm em relação ao tronco) e o braço gira ${f1(gira)}° no ombro`, ok: noMundo <= 1 && noTronco <= 1 && gira <= 1 };
  },
  'triceps-frances-cotovelos-perto-da-cabeca': (q, corpo) => {
    // a distância entre os cotovelos e a abertura do braço para o lado (de frente, no tronco), em todos os quadros
    const entre = q.map((x) => dist(x.esq.lado.R.cotovelo, x.esq.lado.L.cotovelo));
    const abre = q.map((x) => {
      const L = x.esq.lado.R;
      const b = paraRef({ ...x.esq.torax, o: [0, 0, 0] }, sub(L.cotovelo, L.ombro));
      // positivo = o braço vai para fora do ombro (lado direito: x negativo)
      return (Math.atan2(-b[0], b[1]) / Math.PI) * 180;
    });
    const elev = q.map((x) => angulosDoLado(x.esq, 'R').ombro);
    const [a, b] = faixa(entre),
      [e0, e1] = faixa(elev);
    const ombros = corpo.m('largura.biacromial');
    return { medido: `os cotovelos ficam de ${f1(a)} a ${f1(b)} cm um do outro (ombros: ${f1(ombros)} cm), o braço ${Math.max(...abre) <= 0 ? `vai ${f1(-Math.max(...abre))}° para o meio` : `abre ${f1(Math.max(...abre))}° para fora`} e fica a ${f1(e0)}–${f1(e1)}° do braço pendurado`, ok: b <= ombros && Math.max(...abre) <= 0 && e0 >= 150 };
  },
  'triceps-frances-alonga-atras-da-cabeca': (q) => {
    // embaixo: o cotovelo dobrado e a pegada atrás da nuca (atrás do ponto mais de trás da cabeça, no tronco)
    const x = q[0]!;
    const T = x.esq.torax;
    let nuca = 1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'cabeca') nuca = Math.min(nuca, paraRef(T, p)[2]);
    const mao = paraRef(T, x.esq.lado.R.pegada)[2];
    const cot = angulosDoLado(x.esq, 'R').cotovelo;
    return { medido: `embaixo, o cotovelo dobra ${f1(cot)}° e o centro da mão fica ${f1(nuca - mao)} cm atrás da parte de trás da cabeça`, ok: cot >= 120 && mao < nuca };
  },
  'triceps-frances-estende-em-cima': (q) => {
    const c = angulosDoLado(q[q.length - 1]!.esq, 'R').cotovelo;
    return { medido: `em cima, o cotovelo dobra ${f1(c)}°`, ok: c <= 15 };
  },
  'triceps-frances-tronco-inclinado': (q) => {
    const [a, b] = faixa(q.map(peito));
    return { medido: `o peito inclina de ${f1(a)}° a ${f1(b)}° à frente da vertical`, ok: a >= 24.5 && b <= 30.5 };
  },
  'triceps-frances-costas-retas': (q) => {
    const [a, b] = faixa(q.map(peito));
    const lomb = Math.max(...q.map((x) => Math.abs(x.esq.pose.lombar ?? 0) + Math.abs(x.esq.pose.toracica ?? 0)));
    return { medido: `o peito fica de ${f1(a)}° a ${f1(b)}° da vertical; a lombar e a torácica mudam ${f1(lomb)}° da curva de repouso`, ok: Math.abs(a) <= 10 && Math.abs(b) <= 10 && lomb <= 1 };
  },
  'triceps-frances-corda-livre-da-cabeca': (q) => {
    // a corda (os dois ramos, da mão à bucha) e o cabo (da bucha à roldana) contra a pele do corpo, fora as mãos e os
    // antebraços (a corda sai do punho fechado)
    const r = obj('cordaTriceps', 'diam') / 2;
    let min = 1e9,
      qual = '';
    for (const x of q.filter((_, i) => i % 4 === 0 || i === q.length - 1)) {
      const M = x.marcas;
      const segs: [V3, V3, number][] = [
        [M.saiR!, M.bucha!, r],
        [M.saiL!, M.bucha!, r],
        [M.bucha!, M.saida!, obj('torre', 'caboDiam') / 2],
      ];
      for (const { p, parte } of pontosDoBoneco(x.esq)) {
        if (parte === 'mao' || parte === 'polegar' || parte === 'ante') continue;
        for (const [a, b, rr] of segs) {
          const d = aoSegmento(p, a, b) - rr;
          if (d < min) {
            min = d;
            qual = parte;
          }
        }
      }
    }
    return { medido: `a corda e o cabo passam a no mínimo ${f1(min)} cm da pele (${qual})`, ok: min >= 0.5 };
  },
  'triceps-frances-corda-na-mao': (q) => {
    const livre = obj('cordaTriceps', 'ramo') - obj('cordaTriceps', 'pontaComp');
    const d = q.flatMap((x) => [dist(x.marcas.saiR!, x.marcas.bucha!), dist(x.marcas.saiL!, x.marcas.bucha!)]);
    const [a, b] = faixa(d);
    const mao = q[0]!.esq.corpo.m('mao.largura');
    return { medido: `cada ramo vai esticado da mão à bucha, de ${f1(a + mao)} a ${f1(b + mao)} cm (o ramo tem ${f1(livre)} cm fora da ponta de borracha)`, ok: b - a <= 0.1 && Math.abs(a + mao - livre) <= 0.1 };
  },
  'triceps-frances-halter-nas-palmas': (q) => {
    // a distância entre os centros das mãos e, ao longo do halter, de cada mão à face de baixo da cabeça de cima
    const entre = q.map((x) => dist(x.esq.lado.R.pegada, x.esq.lado.L.pegada));
    const ate = q.flatMap((x) => {
      const n = norm(sub(x.marcas.halterTopo!, x.marcas.halter!));
      return [x.esq.lado.R.pegada, x.esq.lado.L.pegada].map((p) => dot(sub(x.marcas.halterTopo!, p), n));
    });
    const [a, b] = faixa(entre),
      [c, d] = faixa(ate);
    return { medido: `os centros das mãos ficam de ${f1(a)} a ${f1(b)} cm um do outro; a face de baixo da cabeça de cima fica de ${f1(c)} a ${f1(d)} cm do centro de cada mão, ao longo do halter (a palma)`, ok: a >= 11.5 && b <= 12.5 && d - c <= 0.2 && c >= 1 && d <= 3 };
  },
  'triceps-frances-carga-livre-do-corpo': (q) => {
    const f = q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map(folgaDaCargaAoCorpo);
    const pior = f.reduce((a, b) => (b.folga < a.folga ? b : a));
    const banco = Math.min(...q.map(folgaDaCargaAoBanco));
    return { medido: `a carga passa a no mínimo ${f1(pior.folga)} cm da pele (${pior.parte}) e a ${f1(banco)} cm do banco`, ok: pior.folga >= 1 && banco >= 1 };
  },
};

// Regras medidas do supino inclinado com halteres (../exercicios/supino-inclinado.ts). O antebraço na vertical e o
// halter sobre o ombro no topo estão em ../conferir.ts; a carga longe da pele e do banco, em ./remadas.ts. As regras
// daqui medem o que o banco inclinado muda: o ângulo do encosto, o apoio no banco, o cotovelo medido no plano das
// costas (e não visto de cima, como no supino reto) e os dois halteres que não se batem.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import type { Quadro } from '../movimento';
import type { PecaPropria } from '../pecas';
import { geometriaDoBanco } from '../pecas-de-cena/banco-regulavel';
import type { BancoRegulavel } from '../pecas-de-cena/banco-regulavel';
import { obj } from '../tabelas';
import { angulo, dist, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const rad = Math.PI / 180;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;

/** O banco regulável do quadro (a peça desenhada guarda as medidas em `fixa`). */
function bancoDo(q: Quadro): BancoRegulavel | undefined {
  const p = q.pecas?.find((x): x is PecaPropria => x.t === 'propria' && x.nome === 'banco-regulavel');
  return p?.fixa as BancoRegulavel | undefined;
}
/** Quanto as partes do corpo entram no encosto e no assento (cm; positivo = dentro; −∞ = não ficam sobre ele). */
function apoio(e: Esq, b: BancoRegulavel, partes: Set<string>, onde: 'encosto' | 'assento'): number {
  const G = geometriaDoBanco(b),
    meia = obj('bancoRegulavel', 'larg') / 2;
  let m = -Infinity;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!partes.has(parte) || Math.abs(p[0] - b.x0) > meia) continue;
    if (onde === 'encosto') {
      const r = sub(p, G.baseEncosto),
        ao = dot(r, G.d);
      if (ao >= 0 && ao <= G.compEncosto) m = Math.max(m, G.est - dot(r, G.n));
    } else if (p[2] >= G.baseAssento[2] && p[2] <= G.baseAssento[2] + G.compAssento) m = Math.max(m, G.topoDoAssento - p[1]);
  }
  return m;
}
/** Distância entre dois segmentos (amostrada: 41 pontos em cada). */
function entreSegmentos(a0: V3, a1: V3, b0: V3, b1: V3): number {
  let m = 1e9;
  for (let i = 0; i <= 40; i++)
    for (let j = 0; j <= 40; j++) {
      const p: V3 = [a0[0] + ((a1[0] - a0[0]) * i) / 40, a0[1] + ((a1[1] - a0[1]) * i) / 40, a0[2] + ((a1[2] - a0[2]) * i) / 40];
      const r: V3 = [b0[0] + ((b1[0] - b0[0]) * j) / 40, b0[1] + ((b1[1] - b0[1]) * j) / 40, b0[2] + ((b1[2] - b0[2]) * j) / 40];
      m = Math.min(m, dist(p, r));
    }
  return m;
}

export const regrasDoSupinoInclinado: Record<string, Regra> = {
  'supino-inclinado-encosto-30': (q) => {
    const b = bancoDo(q[0]!);
    const e = q[0]!.esq;
    // a linha das costas: do quadril ao ombro, de lado
    const d = sub(e.lado.R.ombro, e.lado.R.quadril);
    const tronco = Math.atan2(d[1], Math.abs(d[2])) / rad;
    const a = b?.encosto ?? NaN;
    return { medido: `o encosto fica a ${f1(a)}° do chão; a linha do quadril ao ombro, a ${f1(tronco)}°`, ok: a >= 15 && a <= 45 && Math.abs(a - 30) <= 2.5 };
  },
  'supino-inclinado-apoiado-no-banco': (q) => {
    const b = bancoDo(q[0]!);
    if (!b) return { medido: 'sem banco regulável no quadro', ok: false };
    const costas: number[] = [],
      cabeca: number[] = [],
      gluteo: number[] = [];
    for (const x of q.filter((_, i) => i % 6 === 0 || i === q.length - 1)) {
      costas.push(apoio(x.esq, b, new Set(['tronco']), 'encosto'));
      cabeca.push(apoio(x.esq, b, new Set(['cabeca']), 'encosto'));
      gluteo.push(apoio(x.esq, b, new Set(['pelve']), 'assento'));
    }
    const [c0, c1] = faixa(costas),
      [h0, h1] = faixa(cabeca),
      [g0, g1] = faixa(gluteo);
    const encosta = (a: number, z: number) => a >= -0.5 && z <= 2.5;
    return { medido: `o ponto mais fundo de cada parte no estofado (positivo = amassa): costas de ${f1(c0)} a ${f1(c1)} cm, cabeça de ${f1(h0)} a ${f1(h1)} cm, glúteo de ${f1(g0)} a ${f1(g1)} cm`, ok: encosta(c0, c1) && encosta(h0, h1) && encosta(g0, g1) };
  },
  'supino-inclinado-cotovelos-30-60': (q) => {
    // no plano das costas: o braço (sem a parte que sai do plano) contra o eixo do tronco, na direção dos pés
    const e = ultimo(q).esq,
      L = e.lado.R;
    const b = norm(sub(L.cotovelo, L.ombro));
    const noPlano = sub(b, mul(e.torax.z, dot(b, e.torax.z)));
    const a = angulo(noPlano, mul(e.torax.y, -1));
    return { medido: `embaixo, o braço faz ${f1(a)}° com o tronco, medido no plano das costas`, ok: a >= 30 && a <= 60 };
  },
  'supino-inclinado-cotovelo-abaixo-do-tronco': (q) => {
    const e = ultimo(q).esq,
      L = e.lado.R;
    const b = norm(sub(L.cotovelo, L.ombro));
    const abaixo = Math.asin(-dot(b, e.torax.z)) / rad;
    // o halter ao lado do peito: entre a linha dos ombros e 22 cm abaixo dela, ao longo do tronco
    const aoLongo = dot(sub(L.pegada, L.ombro), mul(e.torax.y, -1));
    return { medido: `embaixo, o braço fica ${f1(abaixo)}° abaixo do plano das costas e o halter ${f1(aoLongo)} cm abaixo da linha dos ombros, ao longo do tronco`, ok: abaixo >= 3 && abaixo <= 30 && aoLongo >= 0 && aoLongo <= 22 };
  },
  'supino-inclinado-halteres-nao-batem': (q) => {
    let m = 1e9;
    for (const x of q.filter((_, i) => i % 3 === 0 || i === q.length - 1)) {
      const H = (x.pecas ?? []).filter((p): p is Extract<typeof p, { t: 'halter' }> => p.t === 'halter');
      if (H.length < 2) continue;
      const seg = (h: (typeof H)[number]) => {
        const c = obj(h.objeto ?? 'halter', 'comp') / 2,
          u = norm(h.eixo);
        return [sub(h.centro, mul(u, c)), sub(h.centro, mul(u, -c))] as [V3, V3];
      };
      const [a0, a1] = seg(H[0]!),
        [b0, b1] = seg(H[1]!);
      const r = obj(H[0]!.objeto ?? 'halter', 'cabecaLargura') / 2;
      m = Math.min(m, entreSegmentos(a0, a1, b0, b1) - 2 * r);
    }
    return { medido: `os dois halteres ficam a no mínimo ${f1(m)} cm um do outro`, ok: m >= 2 };
  },
};

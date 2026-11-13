// Motor novo: o modelo "manequim articulado". Peças lisas e arredondadas (cabeça sem rosto, caixa do tórax, cintura,
// bacia, membros) com as articulações à mostra, como um manequim de desenho. As medidas são as da tabela do corpo; os
// membros, as mãos e os pés são os mesmos volumes de ./corpo3d.ts.
import { corpo3d } from './corpo3d';
import type { Anel, Volume } from './corpo3d';
import type { Prim } from './desenho';
import { naColuna } from './esqueleto';
import type { Esq } from './esqueleto';
import { add, mul, noRef } from './vec';
import type { Ref, V3 } from './vec';

/** Volume arredondado ao longo do eixo y de um referencial: lista de [y, meia-largura, frente, trás]. */
function bloco(r: Ref, niveis: [number, number, number, number][], dz = 0): Volume {
  return { aneis: niveis.map(([y, a, f, b]): Anel => ({ c: noRef(r, [0, y, dz]), x: r.x, z: r.z, a, f, b })) };
}
/** Elipsoide: centro, e meios-eixos ao longo de x, y e z do referencial. */
function elipsoide(r: Ref, c: V3, rx: number, ry: number, rz: number, n = 9, afina = 0): Volume {
  const aneis: Anel[] = [];
  for (let i = 0; i <= n; i++) {
    const t = -Math.PI / 2 + (Math.PI * i) / n;
    const k = Math.max(0.06, Math.cos(t)) * (1 - afina * Math.max(0, -Math.sin(t)));
    aneis.push({ c: add(c, mul(r.y, ry * Math.sin(t))), x: r.x, z: r.z, a: rx * k, f: rz * k, b: rz * k });
  }
  return { aneis };
}

/** `realce` pinta peças inteiras: no manequim, o que se destaca é a parte do corpo que trabalha, não o músculo desenhado. */
export function manequim(e: Esq, realce: Partial<Record<'coxa' | 'perna' | 'braco' | 'antebraco' | 'torax' | 'pelve' | 'cintura', string>> = {}): Prim[] {
  const c = e.corpo,
    m = (id: string) => c.m(id);
  const out: Prim[] = [];
  const vol = (v: Volume, cls = 'pele') => out.push({ t: 'volume', vol: v, cls });
  const c3 = corpo3d(e);
  // membros, mãos e pés: os volumes da tabela
  for (const p of c3.partes) if (/^(braco|antebraco|mao|coxa|perna|pe)[RL]$/.test(p.id)) for (const v of p.volumes) vol(v, realce[p.id.slice(0, -1) as 'coxa'] ?? 'pele');
  // articulações à mostra
  for (const j of c3.juntas) if (!j.id.startsWith('bola')) out.push({ t: 'esfera', c: j.c, r: j.r * (j.id.startsWith('ombro') ? 1.12 : j.id.startsWith('quadril') ? 0.9 : 1.04), cls: 'junta' });
  // cabeça: um ovo liso, mais estreito no queixo
  const topo = m('cabeca.tragionAoTopo'),
    alt = m('cabeca.altura');
  vol(elipsoide(e.cabeca, noRef(e.cabeca, [0, topo - alt / 2, 1]), m('cabeca.largura') / 2, alt / 2, m('cabeca.comp') / 2, 10, 0.28));
  // pescoço
  const rp = m('raio.pescoco');
  const p0 = naColuna(e, e.nos[e.iC7]!.s - 1),
    p1 = naColuna(e, e.nos[e.iCranio]!.s + 2);
  vol({ aneis: [{ c: add(p0.o, mul(p0.z, 1.5)), x: p0.x, z: p0.z, a: rp * 1.05, f: rp, b: rp }, { c: add(p1.o, mul(p1.z, 1.5)), x: p1.x, z: p1.z, a: rp * 0.95, f: rp * 0.95, b: rp * 0.95 }] }, 'junta');
  // caixa do tórax: larga nos ombros, estreita nas costelas de baixo; presa ao referencial do tórax
  const T = e.torax;
  const pP = m('prof.peito'),
    lP = m('largura.peito') / 2,
    lO = m('largura.biacromial') / 2 - 2.2,
    lC = m('largura.cintura') / 2;
  const hT = m('altura.cervical') - m('altura.costela10');
  const fr = 0.68,
    tr = 0.32;
  vol(
    bloco(T, [
      [-1.5, lO * 0.5, pP * 0.3, pP * 0.24],
      [-3.5, lO * 0.93, pP * 0.5 * fr * 1.5, pP * tr * 0.95],
      [-8, lO, pP * fr * 0.9, pP * tr],
      [-hT * 0.5, lP + 2.6, pP * fr, pP * tr],
      [-hT * 0.82, (lP + lC) / 2 + 0.6, pP * fr * 0.93, pP * tr * 0.95],
      [-hT, lC * 0.9, pP * fr * 0.72, pP * tr * 0.8],
      [-hT - 2.2, lC * 0.6, pP * fr * 0.45, pP * tr * 0.5],
    ]),
    realce.torax ?? 'pele',
  );
  // bacia: presa ao referencial da pelve
  const lQ = m('largura.quadril') / 2,
    pN = m('prof.nadega'),
    yCr = m('altura.cristaIliaca') - m('altura.trocanter'),
    yVi = m('altura.virilha') - m('altura.trocanter');
  const dz = -m('l5s1.atras') * 0.45;
  vol(
    bloco(
      e.pelve,
      [
        [yCr + 1.5, lC * 0.62, pN * 0.26, pN * 0.26],
        [yCr - 1, lC * 0.95, pN * 0.42, pN * 0.4],
        [yCr * 0.45, lQ * 0.98, pN * 0.47, pN * 0.48],
        [-1.5, lQ, pN * 0.46, pN * 0.54],
        [yVi + 1, lQ * 0.72, pN * 0.36, pN * 0.42],
        [yVi - 2.5, lQ * 0.36, pN * 0.2, pN * 0.22],
      ],
      dz,
    ),
    realce.pelve ?? 'pele',
  );
  // cintura: uma peça arredondada entre o tórax e a bacia, no meio da lombar
  const meioLombar = naColuna(e, e.nos[e.iT12]!.s * 0.55);
  vol(elipsoide(meioLombar, add(meioLombar.o, mul(meioLombar.z, m('prof.cintura') * 0.14)), lC * 0.86, (m('altura.costela10') - m('altura.cristaIliaca')) * 0.5 + 6.5, m('prof.cintura') * 0.44), 'junta');
  return out;
}

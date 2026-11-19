// Regras medidas da mesa flexora (../exercicios/mesa-flexora.ts, a máquina em ../pecas-de-cena/mesa-flexora.ts). Cada
// uma mede a superfície do Boneco contra os estofados e o rolo da máquina. Marcas que os quadros dão: `eixo` (o centro
// do eixo da alavanca), `rolo` (o centro do rolo), `pilha` (quanto as placas subiram, em y) e `alavanca` (o ângulo da
// alavanca agora, o do começo e a distância do eixo ao rolo).
import { desenharBoneco, formaDoBoneco, pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { VISTAS, casco, contorno, naTela } from '../desenho';
import type { IdVista, Item, P2 } from '../desenho';
import { equipamentoRealista } from '../equipamento';
import type { Esq } from '../esqueleto';
import { mesaFlexora } from '../exercicios/mesa-flexora';
import type { Quadro } from '../movimento';
import { MAT } from '../realista/base.mjs';
import { geometriaDaMesaFlexora } from '../pecas-de-cena/mesa-flexora';
import type { PlanoDoEstofado } from '../pecas-de-cena/mesa-flexora';
import { obj } from '../tabelas';
import { add, dist, dot, mul, sub } from '../vec';
import type { V3 } from '../vec';

const rad = Math.PI / 180;

/** O ponto mais baixo de umas partes do corpo contra o topo de um estofado, só sobre ele (positivo = acima). */
function folga(e: Esq, partes: string[], est: PlanoDoEstofado): number {
  const meia = obj('mesaFlexora', 'estofadoLarg') / 2;
  let m = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!partes.includes(parte) || Math.abs(p[0]) > meia) continue;
    const s = dot(sub(p, est.ponta), est.ao);
    if (s < 0 || s > est.comp) continue;
    m = Math.min(m, dot(sub(p, est.ponta), est.normal));
  }
  return m;
}

/** A pele das pernas mais perto do eixo do rolo (que corre ao longo de x): a folga e o ponto. */
function noRolo(q: Quadro): { folga: number; ponto: V3 } {
  const c = q.marcas.rolo!;
  const r = obj('mesaFlexora', 'roloDiam') / 2,
    meio = obj('mesaFlexora', 'roloComp') / 2;
  let melhor = { folga: 1e9, ponto: c };
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if ((parte !== 'canela' && parte !== 'pe') || p[0] < c[0] - meio || p[0] > c[0] + meio - 6) continue;
    const d = Math.hypot(p[1] - c[1], p[2] - c[2]) - r;
    if (d < melhor.folga) melhor = { folga: d, ponto: p };
  }
  return melhor;
}

/* ============ os pés por cima do rolo, onde ficam na frente dele (correção de 19/11/2026, a auditoria da fase C) ============ */

/** O ponto está dentro do polígono convexo (na tela)? */
function dentroDe(t: P2, H: P2[]): boolean {
  let s0 = 0;
  for (let i = 0; i < H.length; i++) {
    const a = H[i]!,
      b = H[(i + 1) % H.length]!;
    const c = (b[0] - a[0]) * (t[1] - a[1]) - (b[1] - a[1]) * (t[0] - a[0]);
    if (Math.abs(c) < 1e-9) continue;
    if (s0 && Math.sign(c) !== s0) return false;
    s0 = Math.sign(c);
  }
  return H.length >= 3;
}
/** A distância de um ponto à borda de um casco convexo na tela (positiva = dentro). */
function dentroDoCasco(t: P2, H: P2[]): number {
  let menor = 1e9,
    giro = 0;
  for (let i = 0; i < H.length; i++) {
    const a = H[i]!,
      b = H[(i + 1) % H.length]!;
    const ex = b[0] - a[0],
      ey = b[1] - a[1],
      l = Math.hypot(ex, ey);
    if (l < 1e-9) continue;
    const c = (ex * (t[1] - a[1]) - ey * (t[0] - a[0])) / l;
    if (!giro) giro = Math.sign(c) || 1;
    menor = Math.min(menor, c * giro);
  }
  return menor;
}
/** A ordem de pintura de um item (camada, depois profundidade; no empate, o equipamento vem antes do Boneco). */
const chave = (it: { camada: number; d: number }) => it.camada * 1e6 + it.d;
const caixaNaTela = (P: P2[]) => [Math.min(...P.map((p) => p[0])), Math.min(...P.map((p) => p[1])), Math.max(...P.map((p) => p[0])), Math.max(...P.map((p) => p[1]))];

/**
 * Num quadro e numa vista, como o app pinta (o mesmo Boneco e o mesmo desenho da máquina, com o recorte do rolo): de
 * cada anel das canelas e dos pés, nos dois lados, o ponto mais perto de quem olha (um pouco para dentro); se o raio
 * até quem olha não atravessa o rolo e o ponto cai dentro do rolo na tela (a mais de 0,5 cm da borda dele, para não
 * contar a linha de contato), o anel está na frente do rolo; se o rolo é pintado depois dele e sem recorte ali, o
 * cobre. Devolve, por parte, quantos anéis ficam na frente e quantos o rolo cobre.
 */
function pesContraORolo(x: Quadro, vista: IdVista): Record<string, { naFrente: number; porBaixo: number }> {
  const cam = VISTAS[vista];
  const r = obj('mesaFlexora', 'roloDiam') / 2,
    c = x.marcas.rolo!;
  // o rolo desenhado (../pecas-de-cena/mesa-flexora.ts): ao longo de x, de meio comprimento para a direita até 6 cm
  // antes da ponta da esquerda
  const a = add(c, [-obj('mesaFlexora', 'roloComp') / 2, 0, 0]),
    b = add(c, [obj('mesaFlexora', 'roloComp') / 2 - 6, 0, 0]);
  const noRolo = (p: V3) => p[0] >= a[0] && p[0] <= b[0] && Math.hypot(p[1] - c[1], p[2] - c[2]) <= r;
  const circulo = (o: V3) => Array.from({ length: 24 }, (_, i): P2 => naTela(cam, add(o, [0, r * Math.cos((i * Math.PI) / 12), r * Math.sin((i * Math.PI) / 12)])));
  const H = casco([...circulo(a), ...circulo(b)]);
  // o item do rolo: o de estofado cuja caixa na tela é a do rolo; o recorte dele, se houver
  const eq = equipamentoRealista(x.pecas ?? [], cam, 'claro', 'conferencia');
  const cx = caixaNaTela(H);
  let rolo: Item | null = null,
    melhor = 1e9;
  for (const it of eq.itens) {
    if (!it.s.includes(`stroke="${MAT.estofado[3]}"`)) continue;
    const P: P2[] = [];
    for (const m of it.s.matchAll(/points="([^"]+)"/g)) {
      const n = m[1]!.split(/[\s,]+/).filter(Boolean).map(Number);
      for (let i = 0; i + 1 < n.length; i += 2) P.push([n[i]!, n[i + 1]!]);
    }
    if (!P.length) continue;
    const dif = caixaNaTela(P).reduce((s, v, i) => s + Math.abs(v - cx[i]!), 0);
    if (dif < melhor) [rolo, melhor] = [it, dif];
  }
  if (!rolo || melhor > 0.25 * (cx[2]! - cx[0]! + cx[3]! - cx[1]!)) throw new Error(`mesa flexora: o rolo não foi achado no desenho da vista ${vista}`);
  const doRolo: Item = rolo;
  const furos: P2[][] = [];
  const mascara = /mask="url\(#([^)]+)\)"/.exec(doRolo.s)?.[1];
  if (mascara) {
    const def = eq.defs.slice(eq.defs.indexOf(`<mask id="${mascara}"`));
    for (const m of def.slice(0, def.indexOf('</mask>')).matchAll(/<polygon points="([^"]+)"/g)) furos.push(m[1]!.split(' ').map((xy) => xy.split(',').map(Number) as P2));
  }
  const boneco = desenharBoneco(x.esq, cam, { estilo: 'cinza', vies: { ...x.vies, ...x.viesNaVista?.[vista] } });
  const out: Record<string, { naFrente: number; porBaixo: number }> = {};
  for (const g of formaDoBoneco(x.esq).grupos) {
    if (!g.id.startsWith('perna')) continue;
    for (const v of g.volumes) {
      if (v.nome !== 'canela' && v.nome !== 'pe') continue;
      const fill = `d="${contorno(cam, v.vol, null, true).fill}"`;
      const dela = boneco.filter((it) => it.s.includes(fill));
      if (!dela.length) continue;
      const ordem = Math.max(...dela.map(chave));
      const n = { naFrente: 0, porBaixo: 0 };
      for (const an of v.vol.aneis) {
        let p: V3 = an.c,
          pd = -1e9;
        for (let i = 0; i < 72; i++) {
          const th = (i * Math.PI) / 36,
            sn = Math.sin(th);
          const y = add(an.c, add(mul(an.x, an.a * 0.85 * Math.cos(th)), mul(an.z, (sn >= 0 ? an.f : an.b) * 0.85 * sn)));
          if (dot(y, cam.para) > pd) [p, pd] = [y, dot(y, cam.para)];
        }
        const t = naTela(cam, p);
        if (dentroDoCasco(t, H) < 0.5) continue;
        let atras = false;
        for (let s = 0.3; s < 150 && !atras; s += 0.5) atras = noRolo(add(p, mul(cam.para, s)));
        if (atras) continue;
        n.naFrente++;
        if (ordem < chave(doRolo) && !furos.some((F) => dentroDe(t, F))) n.porBaixo++;
      }
      out[`${v.nome}${g.id.slice(-1)}`] = n;
    }
  }
  return out;
}

export const REGRAS_MESA_FLEXORA: Record<string, Regra> = {
  'mesa-flexora-pes-por-cima-do-rolo': (q, corpo) => {
    // em cada vista do exercício e na de cada erro, na técnica e nos erros, nas duas pernas: os anéis das canelas e dos
    // pés que ficam na frente do rolo e por cima dele na tela não podem ficar por baixo dele na pintura (de cima, no
    // fim da subida, o rolo era pintado por cima dos calcanhares, que ficam acima dele)
    const ex = mesaFlexora;
    const quadros: { x: Quadro; onde: string; vistas: IdVista[] }[] = [];
    q.forEach((x, i) => {
      if (i % 3 === 0 || i === q.length - 1) quadros.push({ x, onde: `técnica, quadro ${i + 1} de ${q.length}`, vistas: ex.vistas as IdVista[] });
    });
    for (const e of ex.ficha.erros) for (const u of [0, 0.25, 0.5, 0.75, 1]) quadros.push({ x: ex.quadro(corpo, u, e.id), onde: `erro "${e.titulo}", u = ${f1(u)}`, vistas: [...new Set([...(ex.vistas as IdVista[]), e.vista as IdVista])] });
    const pior: Record<string, { naFrente: number; porBaixo: number; onde: string }> = {};
    for (const { x, onde, vistas } of quadros)
      for (const vista of vistas)
        for (const [k, n] of Object.entries(pesContraORolo(x, vista))) {
          const kk = `${vista}|${k}`;
          const a = pior[kk];
          if (!a || n.porBaixo > a.porBaixo || (n.porBaixo === a.porBaixo && n.naFrente > a.naFrente)) pior[kk] = { ...n, onde };
        }
    const NOME: Record<string, string> = { canelaR: 'canela direita', canelaL: 'canela esquerda', peR: 'pé direito', peL: 'pé esquerdo' };
    const txt = Object.entries(pior)
      .map(([k, n]) => {
        const [vista, parte] = k.split('|');
        return `${VISTAS[vista as IdVista].nome.toLowerCase()}, ${NOME[parte!] ?? parte} ${n.porBaixo} de ${n.naFrente}${n.porBaixo ? ` (${n.onde})` : ''}`;
      })
      .join('; ');
    return { medido: `anéis pintados por baixo do rolo, de quantos ficam na frente dele e por cima dele na tela (o pior quadro): ${txt}`, ok: Object.values(pior).every((n) => n.porBaixo === 0) };
  },

  'mesa-flexora-deitado-no-estofado': (q) => {
    const G = geometriaDaMesaFlexora();
    const coxa = faixa(q.map((x) => folga(x.esq, ['coxa', 'pelve'], G.coxa)));
    const peito = faixa(q.map((x) => folga(x.esq, ['tronco', 'emendaDaCintura', 'pelve'], G.peito)));
    const anda = Math.max(...q.map((x) => dist(x.esq.pelve.o, q[0]!.esq.pelve.o)));
    const maos = Math.max(...q.map((x) => Math.max(dist(x.esq.lado.R.pegada, G.pegadores[0]!.centro), dist(x.esq.lado.L.pegada, G.pegadores[1]!.centro))));
    const quadril = faixa(q.map((x) => angulosDoLado(x.esq, 'R').quadril));
    return {
      medido: `a coxa e a frente da bacia ficam de ${f1(coxa[0])} a ${f1(coxa[1])} cm do topo do estofado das coxas; a barriga e o peito, de ${f1(peito[0])} a ${f1(peito[1])} cm do topo do estofado do peito (negativo = o corpo afunda no estofado); a bacia anda ${f1(anda)} cm; o quadril fica dobrado de ${f1(quadril[0])}° a ${f1(quadril[1])}° (a dobra do estofado); o centro de cada mão fica a no máximo ${f1(maos)} cm do meio do pegador`,
      ok: coxa[0] >= -2.5 && coxa[1] <= 1 && peito[0] >= -2.5 && peito[1] <= 1 && anda <= 0.1 && maos <= 1,
    };
  },
  'mesa-flexora-joelho-no-eixo': (q) => {
    const fora = Math.max(...q.map((x) => Math.max(...(['R', 'L'] as const).map((k) => Math.hypot(x.esq.lado[k].joelho[1] - x.marcas.eixo![1], x.esq.lado[k].joelho[2] - x.marcas.eixo![2])))));
    return { medido: `o centro de cada joelho fica a no máximo ${f1(fora)} cm da linha do eixo, no ciclo todo`, ok: fora <= 0.5 };
  },
  'mesa-flexora-rolo-acima-do-calcanhar': (q) => {
    const r = q.map(noRolo);
    const [a, b] = faixa(r.map((x) => x.folga));
    // onde o rolo encosta: a distância ao centro do tornozelo, ao longo da canela (positivo = acima dele, para o joelho)
    const acima = q.map((x, i) => {
      const R = x.esq.lado.R;
      const d = sub(R.joelho, R.tornozelo);
      return dot(sub(r[i]!.ponto, R.tornozelo), d) / Math.hypot(...d);
    });
    const [c, d] = faixa(acima);
    return {
      medido: `o rolo fica de ${f1(a)} a ${f1(b)} cm da pele (negativo = o rolo afunda na perna) e encosta de ${f1(c)} a ${f1(d)} cm acima do centro do tornozelo, atrás da perna`,
      ok: a >= -1 && b <= 0.5 && c >= -2 && d <= 8,
    };
  },
  'mesa-flexora-amplitude': (q) => {
    const [j0, j1] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    const fim = q[q.length - 1]!;
    // o rolo perto do glúteo: a distância da pele do rolo à pele da bacia, no fim
    let gluteo = 1e9;
    const rr = obj('mesaFlexora', 'roloDiam') / 2;
    for (const { p, parte } of pontosDoBoneco(fim.esq)) if (parte === 'pelve') gluteo = Math.min(gluteo, dist(p, [p[0], fim.marcas.rolo![1], fim.marcas.rolo![2]]) - rr);
    return { medido: `o joelho vai de ${f1(j0)}° (começo) a ${f1(j1)}° (fim); no fim, o rolo fica a ${f1(gluteo)} cm do glúteo`, ok: j0 <= 20 && j1 >= 110 };
  },
  'mesa-flexora-pilha-sobe-com-a-alavanca': (q) => {
    const rC = obj('mesaFlexora', 'cameDiam') / 2;
    const k0 = angulosDoLado(q[0]!.esq, 'R').joelho;
    let gira = 0,
      pilha = 0,
      sobe = 0;
    for (const x of q) {
      const [a, a0] = x.marcas.alavanca!;
      gira = Math.max(gira, Math.abs(a - a0 - (angulosDoLado(x.esq, 'R').joelho - k0)));
      pilha = Math.max(pilha, Math.abs(x.marcas.pilha![1] - Math.max(0, a - a0) * rad * rC));
      sobe = Math.max(sobe, x.marcas.pilha![1]);
    }
    return {
      medido: `a alavanca gira com a canela (diferença máxima de ${f1(gira)}°); as placas sobem até ${f1(sobe)} cm, a no máximo ${f1(pilha)} cm do arco do came (raio de ${f1(rC)} cm × ângulo)`,
      ok: gira <= 0.5 && pilha <= 0.1 && sobe > 5,
    };
  },
};

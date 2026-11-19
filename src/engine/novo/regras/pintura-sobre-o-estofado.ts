// O que as regras de pintura de alguns exercícios medem (acréscimo de 18/11/2026, a auditoria da fase C: a canela de
// longe do mergulho no graviton, a cabeça do voador invertido, o banco do abdominal declinado). Não é uma regra: cada
// família diz qual estofado e quais partes do corpo medir, e em quais vistas.
//
// A pergunta: onde uma parte do corpo está na frente de um estofado (o raio dela até quem olha não atravessa o
// estofado) e por cima dele na tela, o pintor a põe por cima? O gerador realista pinta cada estofado como um item só,
// na profundidade do centro dele (mais o ajuste da peça); o Boneco pinta o lado de longe, o corpo com as pernas de perto
// e cada braço de perto em itens separados. Para cada anel da parte, o ponto do anel mais perto de quem olha (um pouco
// para dentro, para fugir do traço), como na auditoria. O item da parte é o que traz o contorno dela; o do estofado, o
// item de estofado (o tom do contorno) cuja caixa na tela é a do estofado medido.
import { desenharBoneco, formaDoBoneco } from '../boneco';
import { VISTAS, casco, contorno, naTela } from '../desenho';
import type { IdVista, Item, P2 } from '../desenho';
import { equipamentoRealista } from '../equipamento';
import type { Exercicio, Quadro } from '../movimento';
import { MAT } from '../realista/base.mjs';
import type { Corpo } from '../tabelas';
import { add, dot, mul, paraRef } from '../vec';
import type { Ref, V3 } from '../vec';

/** Um estofado medido: pontos da superfície dele (para a caixa e o casco na tela) e se um ponto está dentro dele. */
export interface EstofadoMedido {
  cantos: V3[];
  dentro: (p: V3) => boolean;
}
/** Um estofado em caixa (a caixa da conferência). */
export function estofadoEmCaixa(c: { ref: Ref; meias: V3 }): EstofadoMedido {
  const cantos: V3[] = [];
  for (const sx of [-1, 1])
    for (const sy of [-1, 1])
      for (const sz of [-1, 1]) cantos.push(add(add(add(c.ref.o, mul(c.ref.x, sx * c.meias[0])), mul(c.ref.y, sy * c.meias[1])), mul(c.ref.z, sz * c.meias[2])));
  return {
    cantos,
    dentro: (p) => {
      const l = paraRef(c.ref, p);
      return Math.abs(l[0]) < c.meias[0] && Math.abs(l[1]) < c.meias[1] && Math.abs(l[2]) < c.meias[2];
    },
  };
}

/** Um estofado em volume (um rolo: a fileira de anéis da conferência). */
export function estofadoEmVolume(aneis: { c: V3; x: V3; z: V3; a: number; f: number; b: number }[]): EstofadoMedido {
  const cantos: V3[] = [];
  for (const an of aneis)
    for (let i = 0; i < 16; i++) {
      const th = (i * Math.PI) / 8,
        sn = Math.sin(th);
      cantos.push(add(an.c, add(mul(an.x, an.a * Math.cos(th)), mul(an.z, (sn >= 0 ? an.f : an.b) * sn))));
    }
  return {
    cantos,
    dentro: (p) => {
      for (let i = 0; i + 1 < aneis.length; i++) {
        const A = aneis[i]!,
          B = aneis[i + 1]!;
        const d = add(B.c, mul(A.c, -1)),
          L2 = dot(d, d);
        if (L2 < 1e-9) continue;
        const t = dot(add(p, mul(A.c, -1)), d) / L2;
        if (t < 0 || t > 1) continue;
        const r = add(p, mul(add(A.c, mul(d, t)), -1));
        const u = dot(r, A.x),
          v = dot(r, A.z);
        const a = A.a + (B.a - A.a) * t,
          rv = v >= 0 ? A.f + (B.f - A.f) * t : A.b + (B.b - A.b) * t;
        if ((u / a) ** 2 + (v / rv) ** 2 < 1) return true;
      }
      return false;
    },
  };
}

/** Uma parte do corpo: o grupo do Boneco (`corpo`, `pernaR`, `bracoL`...) e o volume (`canela`, `pe`, `cabeca`...). */
export interface ParteMedida {
  grupo: string;
  volume: string;
}
export interface Contagem {
  /** Anéis da parte na frente do estofado e por cima dele na tela. */
  naFrente: number;
  /** Desses, quantos o pintor põe por baixo do estofado. */
  porBaixo: number;
}

const COR_DO_ESTOFADO = `stroke="${MAT.estofado[3]}"`;
const caixaNaTela = (P: P2[]): [number, number, number, number] => [Math.min(...P.map((p) => p[0])), Math.min(...P.map((p) => p[1])), Math.max(...P.map((p) => p[0])), Math.max(...P.map((p) => p[1]))];
/** A caixa na tela dos polígonos de um item do gerador realista. */
function caixaDoItem(it: Item): [number, number, number, number] | null {
  const P: P2[] = [];
  for (const m of it.s.matchAll(/points="([^"]+)"/g)) {
    const n = m[1]!.split(/[\s,]+/).filter(Boolean).map(Number);
    for (let i = 0; i + 1 < n.length; i += 2) P.push([n[i]!, n[i + 1]!]);
  }
  return P.length ? caixaNaTela(P) : null;
}
/** A ordem de pintura de um item (camada, depois profundidade; no empate, o equipamento vem antes do Boneco). */
const chave = (it: Item) => it.camada * 1e6 + it.d;
/** A distância de um ponto à borda de um casco convexo na tela (positiva = dentro). */
function dentroDoCasco(p: P2, H: P2[]): number {
  let menor = 1e9;
  let giro = 0;
  for (let i = 0; i < H.length; i++) {
    const a = H[i]!,
      b = H[(i + 1) % H.length]!;
    const ex = b[0] - a[0],
      ey = b[1] - a[1],
      l = Math.hypot(ex, ey);
    if (l < 1e-9) continue;
    const c = (ex * (p[1] - a[1]) - ey * (p[0] - a[0])) / l;
    if (!giro) giro = Math.sign(c) || 1;
    menor = Math.min(menor, c * giro);
  }
  return menor;
}

/**
 * Numa vista, para cada parte: os anéis na frente do estofado e por cima dele na tela (a pelo menos `margem` cm da
 * borda dele na tela, para não contar a linha de contato), e quantos desses o pintor põe por baixo dele.
 */
export function aneisPorBaixoDoEstofado(q: Quadro, vista: IdVista, estofado: EstofadoMedido, partes: ParteMedida[], margem = 0.5): Record<string, Contagem> {
  const cam = VISTAS[vista];
  const vies = { ...q.vies, ...q.viesNaVista?.[vista] };
  const boneco = desenharBoneco(q.esq, cam, { estilo: 'cinza', vies });
  // o item do estofado: o de contorno no tom do estofado cuja caixa na tela mais se parece com a dele
  const cx = caixaNaTela(estofado.cantos.map((p) => naTela(cam, p)));
  // (dois estofados com a mesma caixa na tela, como os dois rolos de um par vistos de lado: o de profundidade mais
  // perto da do centro dele)
  const tol = 0.25 * (cx[2] - cx[0] + cx[3] - cx[1]);
  const dCentro = estofado.cantos.reduce((s, p) => s + dot(p, cam.para), 0) / estofado.cantos.length;
  let item: Item | null = null,
    melhor = 1e9;
  for (const it of equipamentoRealista(q.pecas ?? [], cam, 'claro', 'pintura-').itens) {
    if (!it.s.includes(COR_DO_ESTOFADO)) continue;
    const c = caixaDoItem(it);
    if (!c) continue;
    const dif = Math.abs(c[0] - cx[0]) + Math.abs(c[1] - cx[1]) + Math.abs(c[2] - cx[2]) + Math.abs(c[3] - cx[3]);
    if (dif > tol) continue;
    const nota = dif + Math.abs(it.d - dCentro);
    if (nota < melhor) [item, melhor] = [it, nota];
  }
  if (!item) throw new Error(`pintura: o estofado medido não foi achado no desenho da vista ${vista}`);
  const H = casco(estofado.cantos.map((p) => naTela(cam, p)));
  const forma = formaDoBoneco(q.esq);
  const out: Record<string, Contagem> = {};
  for (const pt of partes) {
    const vol = forma.grupos.find((g) => g.id === pt.grupo)?.volumes.find((v) => v.nome === pt.volume)?.vol;
    if (!vol) throw new Error(`pintura: o Boneco não tem ${pt.grupo}/${pt.volume}`);
    // o item que pinta a parte: o último (na ordem de pintura) dos que trazem o contorno dela
    const fill = `d="${contorno(cam, vol, null, true).fill}"`;
    const dela = boneco.filter((it) => it.s.includes(fill));
    if (!dela.length) continue;
    const ordem = Math.max(...dela.map(chave));
    const c: Contagem = { naFrente: 0, porBaixo: 0 };
    for (const an of vol.aneis) {
      let p: V3 = an.c,
        pd = -1e9;
      for (let i = 0; i < 72; i++) {
        const th = (i * Math.PI) / 36,
          sn = Math.sin(th);
        const x = add(an.c, add(mul(an.x, an.a * 0.85 * Math.cos(th)), mul(an.z, (sn >= 0 ? an.f : an.b) * 0.85 * sn)));
        if (dot(x, cam.para) > pd) [p, pd] = [x, dot(x, cam.para)];
      }
      if (dentroDoCasco(naTela(cam, p), H) < margem) continue;
      let atras = false;
      for (let t = 0.3; t < 400 && !atras; t += 0.5) atras = estofado.dentro(add(p, mul(cam.para, t)));
      if (atras) continue;
      c.naFrente++;
      if (ordem < chave(item)) c.porBaixo++;
    }
    out[`${pt.volume}${pt.grupo.endsWith('R') ? 'R' : pt.grupo.endsWith('L') ? 'L' : ''}`] = c;
  }
  return out;
}

/** O pior de cada parte numa vista (o quadro em que mais anéis ficam por baixo) e onde foi. */
export interface PiorNaVista {
  vista: IdVista;
  partes: Record<string, Contagem & { onde: string }>;
}
/**
 * Nas vistas do exercício (as que o app mostra) e na de cada erro: os quadros da técnica que a conferência dá (um a cada
 * três, e o último) e os de cada erro (u = 0,25, 0,5, 0,75 e 1), cada erro nas vistas do exercício e na dele.
 * `estofado` acha, no quadro, o estofado medido.
 */
export function pinturaNasVistas(ex: Exercicio, q: Quadro[], corpo: Corpo, estofado: (x: Quadro) => EstofadoMedido, partes: ParteMedida[]): PiorNaVista[] {
  const doExercicio = ex.vistas as IdVista[];
  const quadros: { x: Quadro; onde: string; vistas: IdVista[] }[] = [];
  q.forEach((x, i) => {
    if (i % 3 === 0 || i === q.length - 1) quadros.push({ x, onde: `técnica, quadro ${i + 1} de ${q.length}`, vistas: doExercicio });
  });
  for (const e of ex.ficha.erros)
    for (const u of [0.25, 0.5, 0.75, 1]) quadros.push({ x: ex.quadro(corpo, u, e.id), onde: `erro "${e.titulo}", u = ${String(u).replace(".", ",")}`, vistas: [...new Set<IdVista>([...doExercicio, e.vista as IdVista])] });
  const vistas = [...new Set(quadros.flatMap((x) => x.vistas))];
  return vistas.map((vista) => {
    const v: PiorNaVista = { vista, partes: {} };
    for (const { x, onde, vistas: vs } of quadros) {
      if (!vs.includes(vista)) continue;
      for (const [k, c] of Object.entries(aneisPorBaixoDoEstofado(x, vista, estofado(x), partes))) {
        const a = v.partes[k];
        if (!a || c.porBaixo > a.porBaixo || (c.porBaixo === a.porBaixo && c.naFrente > a.naFrente)) v.partes[k] = { ...c, onde };
      }
    }
    return v;
  });
}
const NOMES: Record<string, [string, string, string]> = {
  coxa: ['coxa', 'direita', 'esquerda'],
  canela: ['canela', 'direita', 'esquerda'],
  pe: ['pé', 'direito', 'esquerdo'],
  cabeca: ['cabeça', '', ''],
  tronco: ['tronco', '', ''],
  pelve: ['bacia', '', ''],
  braco: ['braço', 'direito', 'esquerdo'],
  ante: ['antebraço', 'direito', 'esquerdo'],
};
/** O nome de uma parte medida (`canelaL` → "canela esquerda"). */
const nomeDaParte = (k: string) => {
  const n = NOMES[k.replace(/[RL]$/, '')];
  if (!n) return k;
  return k.endsWith('R') ? `${n[0]} ${n[1]}` : k.endsWith('L') ? `${n[0]} ${n[2]}` : n[0];
};
/** O que foi medido, em texto: por vista, cada parte com os anéis pintados por baixo de quantos ficam na frente. */
export function textoDaPintura(r: PiorNaVista[]): string {
  return r
    .map((v) => `${VISTAS[v.vista].nome.toLowerCase()}: ${Object.entries(v.partes).map(([k, c]) => `${nomeDaParte(k)} ${c.porBaixo} de ${c.naFrente}${c.porBaixo ? ` (${c.onde})` : ''}`).join(', ')}`)
    .join('; ');
}
/** Nenhum anel por baixo, em nenhuma vista. */
export const nadaPorBaixo = (r: PiorNaVista[]) => r.every((v) => Object.values(v.partes).every((c) => c.porBaixo === 0));

// Regras medidas das cadeiras de joelho (a cadeira flexora e a cadeira extensora). As marcas que o quadro dá:
// `eixo` (um ponto do eixo da alavanca), `rolo` (o centro do rolo) e `roloMeio` ([meio comprimento, raio, 0]),
// `alavanca` ([ângulo, ângulo inicial, raio do came]), `pilha` ([quanto as placas subiram, 0, 0]), `alcaR` e `alcaL`
// (o centro de cada alça), `assento` ([folga da pele no assento, 0, 0]), `costas` ([folga das costas no encosto, 0, 0])
// e, na flexora, `trava` ([altura da face de baixo da trava, 0, 0]); `roloPontaR` e `roloPontaL`, as pontas do rolo desenhado.
import { desenharBoneco, formaDoBoneco, pontosDoBoneco } from "../boneco";
import { angulosDoLado, f1, faixa } from "../conferir-util";
import type { Regra } from "../conferir-util";
import type { Anel } from "../corpo3d";
import { VISTAS, casco, naTela } from "../desenho";
import type { IdVista, P2 } from "../desenho";
import { equipamentoRealista } from "../equipamento";
import { cadeiraExtensora } from "../exercicios/cadeira-extensora";
import { cadeiraFlexora } from "../exercicios/cadeira-flexora";
import type { Exercicio, Quadro } from "../movimento";
import { LADOS } from "../esqueleto";
import type { Lado } from "../esqueleto";
import { add, dist, dot, mul, norm, sub } from "../vec";
import type { V3 } from "../vec";

const amostra = (q: Quadro[], cada = 6) =>
  q.filter((_, i) => i % cada === 0 || i === q.length - 1);

/** A distância (cm) do centro do joelho à linha do eixo (que corre ao longo de x), no plano de lado. */
const doEixo = (x: Quadro, k: "R" | "L") =>
  Math.hypot(
    x.esq.lado[k].joelho[1] - x.marcas.eixo![1],
    x.esq.lado[k].joelho[2] - x.marcas.eixo![2],
  );

/** A folga (cm) entre a superfície do rolo e a pele das canelas e dos pés (negativo: afunda) e onde ele toca, ao longo da canela. */
function roloNaPele(x: Quadro) {
  const c = x.marcas.rolo!,
    [meio, r] = x.marcas.roloMeio!;
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(x.esq)) {
    if (!["canela", "pe"].includes(parte) || Math.abs(p[0] - c[0]) > meio!)
      continue;
    min = Math.min(min, Math.hypot(p[1] - c[1], p[2] - c[2]) - r!);
  }
  const R = x.esq.lado.R;
  const canela = norm(sub(R.tornozelo, R.joelho));
  return {
    folga: min,
    aoLongo: dot(sub([R.joelho[0], c[1], c[2]], R.joelho), canela),
  };
}

/** A folga (cm) entre a pele de cima das coxas e a face de baixo da trava, sob a trava. */
function coxaNaTrava(x: Quadro) {
  const [y0, z0, meio] = x.marcas.trava!;
  let max = -1e9;
  for (const { p, parte } of pontosDoBoneco(x.esq))
    if (parte === "coxa" && Math.abs(p[2] - z0!) < meio! && Math.abs(p[0]) < 18)
      max = Math.max(max, p[1]);
  return y0! - max;
}

export const regrasDasCadeiras: Record<string, Regra> = {
  "cadeira-joelho-no-eixo": (q) => {
    const d = Math.max(...q.flatMap((x) => LADOS.map((k) => doEixo(x, k))));
    return {
      medido: `o centro dos dois joelhos fica a no máximo ${f1(d)} cm do eixo da máquina no ciclo`,
      ok: d <= 0.5,
    };
  },
  "cadeira-rolo-acompanha-a-canela": (q) => {
    const m = amostra(q).map(roloNaPele);
    const fol = faixa(m.map((x) => x.folga)),
      ao = faixa(m.map((x) => x.aoLongo));
    return {
      medido: `o rolo fica de ${f1(fol[0])} a ${f1(fol[1])} cm da pele (negativo: afunda) e toca a canela de ${f1(ao[0])} a ${f1(ao[1])} cm do joelho, sem escorregar`,
      ok: fol[0] >= -1.5 && fol[1] <= 0.5 && ao[1] - ao[0] <= 1,
    };
  },
  "cadeira-pilha-sobe-com-a-alavanca": (q) => {
    // as placas sobem o arco do came (raio × ângulo girado desde a posição inicial)
    const erro = Math.max(
      ...q.map((x) =>
        Math.abs(
          x.marcas.pilha![0] -
            Math.abs(x.marcas.alavanca![0] - x.marcas.alavanca![1]) *
              (Math.PI / 180) *
              x.marcas.alavanca![2]!,
        ),
      ),
    );
    const s = faixa(q.map((x) => x.marcas.pilha![0]));
    const giro = faixa(q.map((x) => x.marcas.alavanca![0]));
    return {
      medido: `a alavanca gira de ${f1(giro[0])}° a ${f1(giro[1])}°; as placas sobem de ${f1(s[0])} a ${f1(s[1])} cm, a no máximo ${f1(erro)} cm do arco do came; no começo, elas apoiam (${f1(q[0]!.marcas.pilha![0])} cm)`,
      ok: erro <= 0.05 && q[0]!.marcas.pilha![0] <= 0.05 && s[1] >= 5,
    };
  },
  "cadeira-sentado-e-encostado": (q) => {
    const a = faixa(q.map((x) => x.marcas.assento![0])),
      c = faixa(q.map((x) => x.marcas.costas![0]));
    return {
      medido: `o glúteo e a coxa ficam de ${f1(-a[1])} a ${f1(-a[0])} cm dentro do assento; as costas, de ${f1(c[0])} a ${f1(c[1])} cm do encosto (negativo: afundam)`,
      ok: a[0] >= -2 && a[1] <= 0.3 && c[0] >= -1.5 && c[1] <= 0.5,
    };
  },
  "cadeira-maos-nas-alcas": (q) => {
    const d = Math.max(
      ...q.flatMap((x) => [
        dist(x.esq.lado.R.pegada, x.marcas.alcaR!),
        dist(x.esq.lado.L.pegada, x.marcas.alcaL!),
      ]),
    );
    const falta = Math.max(
      ...q.map((x) =>
        Math.max(x.esq.lado.R.falta.braco, x.esq.lado.L.falta.braco),
      ),
    );
    return {
      medido: `as mãos ficam a no máximo ${f1(d)} cm do meio das alças (falta de alcance: ${f1(falta)} cm)`,
      ok: d <= 0.5 && falta <= 0.05,
    };
  },
  "cadeira-flexora-trava-nas-coxas": (q) => {
    const t = faixa(amostra(q).map(coxaNaTrava));
    return {
      medido: `a trava fica de ${f1(t[0])} a ${f1(t[1])} cm da pele de cima das coxas (negativo: afunda), logo acima do joelho`,
      ok: t[0] >= -1.5 && t[1] <= 0.5,
    };
  },
  "cadeira-flexora-amplitude": (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, "R").joelho));
    return {
      medido: `o joelho vai de ${f1(a)}° (quase esticado) a ${f1(b)}° (bem dobrado)`,
      ok: a <= 15 && b >= 100,
    };
  },
  "cadeira-extensora-amplitude": (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, "R").joelho));
    let pe = 1e9;
    for (const { p, parte } of pontosDoBoneco(q[0]!.esq))
      if (parte === "pe" || parte === "canela") pe = Math.min(pe, p[1]);
    return {
      medido: `o joelho vai de ${f1(b)}° (bem dobrado) a ${f1(a)}° (quase esticado); embaixo, o pé fica a ${f1(pe)} cm do chão`,
      ok: a >= 5 && a <= 20 && b >= 85 && pe >= 3,
    };
  },
};

/* ============ a pintura e as mãos, nos dois lados do corpo, nas vistas e nos erros (a auditoria de 18/11/2026) ============ */

/** Um item pintado: a camada e a profundidade (maior = mais perto de quem olha). */
type Pintado = { camada: number; d: number };
/** `a` (do aparelho) é pintado antes de `b` (do corpo): o aparelho entra antes do corpo na lista, e o empate fica com ele. */
const antes = (a: Pintado, b: Pintado) => a.camada < b.camada || (a.camada === b.camada && a.d <= b.d);
/** O item é de estofado (roxo, a cor de ação do app)? */
function roxo(s: string): boolean {
  const m = /fill="#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})"/i.exec(s);
  if (!m) return false;
  const [r, g, b] = [m[1]!, m[2]!, m[3]!].map((h) => parseInt(h, 16)) as [number, number, number];
  return b - r > 40 && b - g > 40;
}
/** O ponto está dentro do polígono convexo (na tela)? */
function dentroDe(q: P2, H: P2[]): boolean {
  let s0 = 0;
  for (let i = 0; i < H.length; i++) {
    const a = H[i]!,
      b = H[(i + 1) % H.length]!;
    const c = (b[0] - a[0]) * (q[1] - a[1]) - (b[1] - a[1]) * (q[0] - a[0]);
    if (Math.abs(c) < 1e-9) continue;
    if (s0 && Math.sign(c) !== s0) return false;
    s0 = Math.sign(c);
  }
  return H.length >= 3;
}
const pontoDoAnel = (an: Anel, th: number, folga = 0): V3 => {
  const sn = Math.sin(th);
  return add(add(an.c, mul(an.x, (an.a + folga) * Math.cos(th))), mul(an.z, ((sn >= 0 ? an.f : an.b) + folga) * sn));
};
/** O ponto está dentro do corpo (entre dois anéis vizinhos de algum volume)? */
function noCorpo(p: V3, pares: [Anel, Anel][]): boolean {
  for (const [A, B] of pares) {
    const ab = sub(B.c, A.c),
      L2 = dot(ab, ab);
    if (L2 < 1e-6) continue;
    const t = dot(sub(p, A.c), ab) / L2;
    if (t < 0 || t > 1) continue;
    const c = add(A.c, mul(ab, t)),
      x = norm(add(A.x, mul(sub(B.x, A.x), t))),
      z = norm(add(A.z, mul(sub(B.z, A.z), t)));
    const d = sub(p, c),
      u = dot(d, x),
      w = dot(d, z);
    const a = A.a + (B.a - A.a) * t,
      fb = w >= 0 ? A.f + (B.f - A.f) * t : A.b + (B.b - A.b) * t;
    if ((u / a) ** 2 + (w / fb) ** 2 <= 1) return true;
  }
  return false;
}

/** Até quantos anéis de uma canela ou de um pé o rolo pode cobrir estando atrás (a linha de contato, onde a pele afunda nele). */
const ANEIS_NA_BORDA = 1;
/** A faixa (cm) da borda da perna, na tela, em que o rolo pode sair por baixo dela (onde os dois se encostam). */
const BORDA = 1.5;
/**
 * Quantos pontos da face do rolo (um a cada 2 cm ao longo dele e a cada 15° em volta: cerca de 3 cm² cada) podem sair
 * por baixo de uma perna estando na frente dela. Na flexora, com os joelhos quase esticados, o calcanhar deita em cima
 * do rolo, e de três quartos (de um pouco acima) a frente do rolo tapa uma tira da sola junto do calcanhar; o rolo vai
 * inteiro para trás das pernas (o que se lê é ele atrás das canelas), e essa tira fica por baixo do pé.
 */
const PONTOS_DO_ROLO_NA_BORDA = 5;

interface Pior {
  n: number;
  de: number;
  onde: string;
}
interface Contagem {
  /** Anéis de cada canela e de cada pé na frente do rolo e pintados por baixo dele, no pior quadro (vista|lado|parte). */
  pernas: Map<string, Pior>;
  /** Pontos da face do rolo na frente de cada perna e pintados por baixo dela, no pior quadro (vista|lado). */
  rolo: Map<string, Pior>;
  /** O pior quadro dos estofados parados (o encosto e o assento) contra o tronco, por vista: quanto antes dele são pintados. */
  encosto: Map<string, { folga: number; onde: string }>;
  maos: { d: number; onde: string };
}
const piorDe = (m: Map<string, Pior>, k: string, v: Pior) => {
  if (!m.has(k) || v.n > m.get(k)!.n) m.set(k, v);
};

/**
 * Mede um quadro numa vista, como o app o pinta (o mesmo Boneco e o mesmo desenho da máquina, com os ajustes de
 * profundidade do quadro e o recorte do rolo):
 *  - as pernas contra o rolo: de cada anel das canelas e dos pés, nos dois lados, o ponto mais perto de quem olha (um
 *    pouco para dentro); se o raio até quem olha não atravessa o rolo, o anel está na frente dele, e, se o ponto cai
 *    dentro do rolo na tela, o rolo pintado depois da perna (e sem recorte ali) o cobre: o erro que a auditoria achou;
 *  - o rolo contra as pernas, ao contrário: os pontos da face do rolo virada para quem olha, na frente do corpo e
 *    dentro da perna na tela, não podem ficar por baixo dela;
 *  - o tronco contra o encosto e o assento: os estofados parados são pintados antes do tronco;
 *  - as mãos: o centro de cada mão até o meio da alça do lado dela.
 */
function medirOQuadro(x: Quadro, vista: IdVista, onde: string, c: Contagem): void {
  const cam = VISTAS[vista];
  const vies = { ...x.vies, ...x.viesNaVista?.[vista] };
  // o item do Boneco em que vai um grupo (a perna de perto vai junto com o tronco): o que ganha a classe do erro
  const itemDe = (grupo: string): Pintado => desenharBoneco(x.esq, cam, { estilo: "cinza", suf: "-f", erroEm: [grupo], vies }).find((i) => i.s.includes("b-c-e")) ?? { camada: 1, d: -1e9 };
  const tronco = itemDe("corpo");
  const perna: Record<Lado, Pintado> = { R: itemDe("pernaR"), L: itemDe("pernaL") };
  const fixa = x.pecas?.find((p) => p.t === "propria" && p.cenario);
  if (fixa)
    for (const it of equipamentoRealista([fixa], cam, "claro", "conferencia").itens.filter((i) => roxo(i.s))) {
      const folga = it.camada < tronco.camada ? 1e9 : tronco.d - it.d;
      if (!c.encosto.has(vista) || folga < c.encosto.get(vista)!.folga) c.encosto.set(vista, { folga, onde });
    }
  for (const k of LADOS) {
    const d = dist(x.esq.lado[k].pegada, x.marcas[`alca${k}`]!);
    if (d > c.maos.d) c.maos = { d, onde: `${onde}, mão ${k === "R" ? "direita" : "esquerda"}` };
  }
  // o rolo, como o app o pinta: o item roxo da parte que se mexe, com o recorte, se houver
  const movel = x.pecas?.find((p) => p.t === "propria" && p.nome.startsWith("alavanca"));
  const a = x.marcas.roloPontaR,
    b = x.marcas.roloPontaL,
    r = x.marcas.roloMeio?.[1];
  if (!movel || !a || !b || !r) return;
  const eq = equipamentoRealista([movel], cam, "claro", "conferencia");
  const rolo = eq.itens.find((i) => roxo(i.s));
  if (!rolo) return;
  // os furos do recorte (cada um convexo: uma faceta da malha do pé, na tela), que a peça guarda no item
  const furos: P2[][] = rolo.fora ?? [];
  const recortado = (t: P2) => furos.some((H) => dentroDe(t, H));
  const u = norm(sub(b, a)),
    comp = dist(a, b);
  const noRolo = (p: V3) => {
    const d = sub(p, a),
      t = dot(d, u);
    return t >= 0 && t <= comp && Math.hypot(...sub(d, mul(u, t))) <= r;
  };
  const circulo = (o: V3) => Array.from({ length: 24 }, (_, i): P2 => naTela(cam, add(o, [0, r * Math.cos((i * Math.PI) / 12), r * Math.sin((i * Math.PI) / 12)])));
  const silhueta = casco([...circulo(a), ...circulo(b)]);
  const grupos = formaDoBoneco(x.esq).grupos;
  const pares: [Anel, Anel][] = [];
  for (const g of grupos) for (const v of g.volumes) for (let i = 0; i + 1 < v.vol.aneis.length; i++) pares.push([v.vol.aneis[i]!, v.vol.aneis[i + 1]!]);
  for (const k of LADOS) {
    const g = grupos.find((y) => y.id === `perna${k}`);
    if (!g) continue;
    // as pernas contra o rolo
    for (const v of g.volumes.filter((y) => y.nome === "canela" || y.nome === "pe")) {
      let n = 0;
      for (const an of v.vol.aneis) {
        let p = an.c,
          melhor = -1e9;
        for (let i = 0; i < 36; i++) {
          const q = pontoDoAnel(an, (i * Math.PI) / 18);
          if (dot(q, cam.para) > melhor) [melhor, p] = [dot(q, cam.para), q];
        }
        const dentro = sub(an.c, p);
        const q0 = add(p, mul(dentro, 0.4 / (Math.hypot(...dentro) || 1)));
        let frente = true;
        for (let s = 0; s <= 150 && frente; s += 0.5) if (noRolo(add(q0, mul(cam.para, s)))) frente = false;
        const t = naTela(cam, q0);
        if (frente && dentroDe(t, silhueta) && antes(perna[k], rolo) && !recortado(t)) n++;
      }
      piorDe(c.pernas, `${vista}|${k}|${v.nome}`, { n, de: v.vol.aneis.length, onde });
    }
    // o rolo contra a perna: os pontos da face do rolo na frente do corpo, dentro da perna na tela (a mais de
    // `BORDA` cm da borda dela: na linha de contato, onde o calcanhar afunda no rolo, os dois se encostam)
    const cascos: P2[][] = [];
    for (const v of g.volumes)
      for (let i = 0; i + 1 < v.vol.aneis.length; i++)
        cascos.push(casco([v.vol.aneis[i]!, v.vol.aneis[i + 1]!].flatMap((an) => Array.from({ length: 12 }, (_, j) => naTela(cam, pontoDoAnel(an, (j * Math.PI) / 6, -BORDA))))));
    let n = 0,
      de = 0;
    for (let s = 0; s <= comp; s += 2)
      for (let j = 0; j < 24; j++) {
        const nr: V3 = [0, Math.cos((j * Math.PI) / 12), Math.sin((j * Math.PI) / 12)];
        if (dot(nr, cam.para) < 0.15) continue;
        const p = add(add(a, mul(u, s)), mul(nr, r - 0.3));
        if (noCorpo(p, pares)) continue;
        const t = naTela(cam, p);
        if (!cascos.some((H) => dentroDe(t, H))) continue;
        let frente = true;
        for (let w = 0.5; w <= 150 && frente; w += 0.5) if (noCorpo(add(p, mul(cam.para, w)), pares)) frente = false;
        if (!frente) continue;
        de++;
        if (!antes(perna[k], rolo) || recortado(t)) n++;
      }
    piorDe(c.rolo, `${vista}|${k}`, { n, de, onde });
  }
}


/**
 * A regra (uma por cadeira, com o exercício dela): a técnica (os quadros que a conferência passa, um a cada seis) e cada
 * erro (no começo, no meio e no fim), em cada vista declarada, nos dois lados do corpo.
 */
const pinturaEMaos =
  (ex: () => Exercicio): Regra =>
  (q, corpo) => {
    const E = ex();
    const c: Contagem = { pernas: new Map(), rolo: new Map(), encosto: new Map(), maos: { d: 0, onde: "" } };
    const quadros: [Quadro, string][] = [
      ...amostra(q).map((x, i): [Quadro, string] => [x, `técnica, quadro ${Math.min(i * 6, q.length - 1)}`]),
      ...E.ficha.erros.flatMap((er) => [0, 0.5, 1].map((u): [Quadro, string] => [E.quadro(corpo, u, er.id), `erro "${er.titulo}", u = ${f1(u)}`])),
    ];
    for (const [x, onde] of quadros) for (const vista of E.vistas as IdVista[]) medirOQuadro(x, vista, `${vista}, ${onde}`, c);
    const lado = (k?: string) => (k === "R" ? "direita" : "esquerda");
    const pernas = [...c.pernas.entries()].map(([k, v]) => {
      const [vista, kk, parte] = k.split("|");
      return { txt: `${vista} ${parte} ${lado(kk)} ${v.n}/${v.de}${v.n ? ` (${v.onde})` : ""}`, ok: v.n <= ANEIS_NA_BORDA };
    });
    const rolo = [...c.rolo.entries()].map(([k, v]) => {
      const [vista, kk] = k.split("|");
      return { txt: `${vista} perna ${lado(kk)} ${v.n}/${v.de}${v.n ? ` (${v.onde})` : ""}`, ok: v.n <= PONTOS_DO_ROLO_NA_BORDA };
    });
    const encosto = [...c.encosto.entries()].map(([vista, v]) => ({ txt: `${vista}: ${v.folga >= 1e8 ? "numa camada abaixo do corpo" : `${f1(v.folga)} antes do tronco (${v.onde})`}`, ok: v.folga >= 0 }));
    return {
      medido:
        `anéis das canelas e dos pés na frente do rolo e pintados por baixo dele, no pior quadro: ${pernas.map((p) => p.txt).join("; ")}; ` +
        `pontos do rolo na frente das pernas e pintados por baixo delas: ${rolo.map((p) => p.txt).join("; ")}; ` +
        `o encosto e o assento são pintados antes do tronco (${encosto.map((p) => p.txt).join("; ")}); ` +
        `as duas mãos ficam a no máximo ${f1(c.maos.d)} cm do meio da alça, também nos erros${c.maos.d > 0.05 ? ` (${c.maos.onde})` : ""}`,
      ok: pernas.every((p) => p.ok) && rolo.every((p) => p.ok) && encosto.every((p) => p.ok) && c.maos.d <= 0.5,
    };
  };

Object.assign(regrasDasCadeiras, {
  "cadeira-flexora-pintura-e-maos": pinturaEMaos(() => cadeiraFlexora),
  "cadeira-extensora-pintura-e-maos": pinturaEMaos(() => cadeiraExtensora),
});

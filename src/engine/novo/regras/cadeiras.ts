// Regras medidas das cadeiras de joelho (a cadeira flexora e a cadeira extensora). As marcas que o quadro dá:
// `eixo` (um ponto do eixo da alavanca), `rolo` (o centro do rolo) e `roloMeio` ([meio comprimento, raio, 0]),
// `alavanca` ([ângulo, ângulo inicial, raio do came]), `pilha` ([quanto as placas subiram, 0, 0]), `alcaR` e `alcaL`
// (o centro de cada alça), `assento` ([folga da pele no assento, 0, 0]), `costas` ([folga das costas no encosto, 0, 0])
// e, na flexora, `trava` ([altura da face de baixo da trava, 0, 0]).
import { pontosDoBoneco } from "../boneco";
import { angulosDoLado, f1, faixa } from "../conferir-util";
import type { Regra } from "../conferir-util";
import type { Quadro } from "../movimento";
import { LADOS } from "../esqueleto";
import { dist, dot, norm, sub } from "../vec";

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

// Cadeira extensora, no motor novo. Os números vêm da ficha (../dados/movimentos/cadeira-extensora.json); a máquina,
// de ../pecas-de-cena/cadeira-extensora.ts (a irmã da cadeira flexora aprovada); o corpo sentado nela, do núcleo
// ./cadeira-de-joelho.ts (o mesmo da cadeira flexora).
//
// Sentado e encostado no encosto reclinado, as mãos nas alças ao lado do quadril; o encosto regulado para os joelhos
// caírem no eixo; o rolo na frente da canela, logo acima do pé. As duas canelas sobem juntas, de bem dobradas (o pé
// fora do chão) até quase esticadas; a alavanca gira com elas para a frente e para cima, e as placas sobem.
import ficha from "../dados/movimentos/cadeira-extensora.json";
import { daFicha, fichaSchema } from "../movimento";
import type { Exercicio, Quadro } from "../movimento";
import { EXTENSORA } from "../pecas-de-cena/cadeira-extensora";
import type { Corpo } from "../tabelas";
import { mix } from "../vec";
import {
  deitaEncostado,
  naCadeira,
  quadroNaCadeira,
  sentarNaCadeira,
} from "./cadeira-de-joelho";
import type { Desvio, OpcoesDaCadeira } from "./cadeira-de-joelho";

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesDaCadeira = {
  modelo: EXTENSORA,
  amassa: f("assento.amassa"),
  lombar: f("lombar.sentado"),
  pescoco: f("pescoco.compensa"),
  roloAoLongo: f("rolo.aoLongo"),
  roloAmassa: f("rolo.amassa"),
  pe: f("pe.flexaoPlantar"),
  maoNaAlca: f("maos.naAlca"),
  travaAmassa: 0,
  prot: f("maos.prot"),
  aFrente: f("tronco.aFrente"),
};

const sentado = (corpo: Corpo) =>
  sentarNaCadeira(corpo, O, F.id, f("joelho.embaixo"));
/** A posição inicial da alavanca (a regulagem "start position"): onde ela fica com os joelhos bem dobrados. */
const inicio = (corpo: Corpo) =>
  naCadeira(corpo, O, sentado(corpo), f("joelho.embaixo")).alavanca;

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const S = sentado(corpo);
  const n = f("erro.ritmo.expoente");
  // no tranco, a perna já está quase em cima no meio da subida; na descida rápida, quase embaixo no meio da descida
  const v = erro === "tranco" ? 1 - (1 - u) ** n : erro === "cai" ? u ** n : u;
  const joelho = mix(f("joelho.embaixo"), f("joelho.emCima"), v);
  // no erro do quadril, a bacia sobe e o tronco deita até as costas continuarem no encosto (empurrando-o)
  const deita =
    erro === "quadril"
      ? deitaEncostado(
          corpo,
          O,
          S,
          F.id,
          f("joelho.emCima"),
          f("erro.quadril.sobe"),
        )
      : 0;
  const dv: Desvio =
    erro === "quadril"
      ? { sobe: f("erro.quadril.sobe") * u, deita: deita * u }
      : erro === "eixo"
        ? { recua: f("erro.eixo.recua") }
        : {};
  return quadroNaCadeira(corpo, O, S, joelho, inicio(corpo), f("placas"), dv);
}

export const cadeiraExtensora: Exercicio = {
  ficha: F,
  vistas: ["lateral", "quina"],
  quadro,
  // quadríceps (a ficha da técnica: primário, sobretudo o reto femoral; sem secundário)
  papeis: { quadriceps: "p" },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};

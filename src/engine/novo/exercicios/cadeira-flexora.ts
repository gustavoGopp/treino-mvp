// Flexão de joelho na cadeira flexora (sentado), no motor novo. Os números vêm da ficha
// (../dados/movimentos/cadeira-flexora.json); a máquina, de ../pecas-de-cena/cadeira-flexora.ts (a aprovada); o corpo
// sentado nela, do núcleo ./cadeira-de-joelho.ts (o mesmo da cadeira extensora).
//
// Sentado e encostado, o tronco um pouco à frente do encosto, as mãos nas alças; o encosto regulado para os joelhos
// caírem no eixo; a trava presa nas coxas logo acima do joelho; o rolo atrás do tornozelo. As duas canelas dobram
// juntas, para baixo e para trás, de quase esticadas até bem dobradas; a alavanca gira com elas e as placas sobem.
import ficha from "../dados/movimentos/cadeira-flexora.json";
import { daFicha, fichaSchema } from "../movimento";
import { mix } from "../vec";
import type { Exercicio, Quadro } from "../movimento";
import { FLEXORA } from "../pecas-de-cena/cadeira-flexora";
import type { Corpo } from "../tabelas";
import {
  naCadeira,
  quadroNaCadeira,
  sentarNaCadeira,
} from "./cadeira-de-joelho";
import type { Desvio, OpcoesDaCadeira } from "./cadeira-de-joelho";

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const O: OpcoesDaCadeira = {
  modelo: FLEXORA,
  amassa: f("assento.amassa"),
  lombar: f("lombar.sentado"),
  pescoco: f("pescoco.compensa"),
  roloAoLongo: f("rolo.aoLongo"),
  roloAmassa: f("rolo.amassa"),
  pe: f("pe.flexaoPlantar"),
  maoNaAlca: f("maos.naAlca"),
  travaAmassa: f("trava.amassa"),
  prot: f("maos.prot"),
  aFrente: f("tronco.aFrente"),
};

const sentado = (corpo: Corpo) =>
  sentarNaCadeira(corpo, O, F.id, f("joelho.inicio"));
/** A posição inicial da alavanca (a regulagem "start position"): onde ela fica com os joelhos quase esticados. */
const inicio = (corpo: Corpo) =>
  naCadeira(corpo, O, sentado(corpo), f("joelho.inicio")).alavanca;

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const S = sentado(corpo);
  const n = f("erro.ritmo.expoente");
  // no tranco, a perna já está quase no fim no meio da flexão
  const v = erro === "tranco" ? 1 - (1 - u) ** n : u;
  const de = erro === "curta" ? f("erro.curta.joelho") : f("joelho.inicio");
  const joelho = mix(de, f("joelho.fim"), v);
  const dv: Desvio =
    erro === "solto"
      ? { sobe: f("erro.solto.sobe") * u }
      : erro === "eixo"
        ? { recua: f("erro.eixo.recua") }
        : {};
  return quadroNaCadeira(
    corpo,
    O,
    S,
    joelho,
    inicio(corpo),
    f("placas"),
    dv,
    erro === "solto" ? f("erro.solto.folga") : 0,
  );
}

export const cadeiraFlexora: Exercicio = {
  ficha: F,
  vistas: ["lateral", "quina"],
  quadro,
  // posteriores da coxa (a ficha da técnica: primário, sem secundário)
  papeis: { posteriores: "p" },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};

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
  erroComAsMaosNasAlcas,
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

/** Os erros com as mãos nas alças (a auditoria de 18/11/2026). */
const erroQuadril = (corpo: Corpo) =>
  erroComAsMaosNasAlcas(corpo, O, sentado(corpo), `${F.id}:quadril`, f("joelho.emCima"), { sobe: f("erro.quadril.sobe"), encosta: true }, f("erro.ombros.desceMax"));
const erroEixo = (corpo: Corpo) =>
  erroComAsMaosNasAlcas(corpo, O, sentado(corpo), `${F.id}:eixo`, f("joelho.emCima"), { recua: f("erro.eixo.recua") }, f("erro.ombros.desceMax"));
/**
 * A ordem de pintura (a auditoria de 18/11/2026): a alavanca, o came e as placas ficam do lado de fora da perna de
 * longe e vão para trás das pernas; o rolo fica na frente das canelas e é pintado por cima delas, menos onde os pés
 * ficam na frente dele (no alto da subida, de três quartos, o pé fica em pé na frente do rolo).
 */
const PINTURA = { dz: { movel: f("pintura.movelAtras") }, pesNaFrente: true };

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const S = sentado(corpo);
  const n = f("erro.ritmo.expoente");
  // no tranco, a perna já está quase em cima no meio da subida; na descida rápida, quase embaixo no meio da descida
  const v = erro === "tranco" ? 1 - (1 - u) ** n : erro === "cai" ? u ** n : u;
  const joelho = mix(f("joelho.embaixo"), f("joelho.emCima"), v);
  // no erro do quadril, a bacia sobe e o tronco deita até as costas continuarem no encosto (empurrando-o); as mãos
  // continuam nas alças, nesse erro e no do joelho fora do eixo: os ombros descem, e a bacia sobe só o que os braços
  // deixam (./cadeira-de-joelho.ts)
  const q = erro === "quadril" ? erroQuadril(corpo) : undefined;
  const dv: Desvio = q
    ? { sobe: q.sobe * u, deita: q.deita * u, ombrosDescem: q.ombrosDescem * u }
    : erro === "eixo"
      ? { recua: f("erro.eixo.recua"), ombrosDescem: erroEixo(corpo).ombrosDescem }
      : {};
  return quadroNaCadeira(corpo, O, S, joelho, inicio(corpo), f("placas"), dv, 0, PINTURA);
}

export const cadeiraExtensora: Exercicio = {
  ficha: F,
  vistas: ["lateral", "quina"],
  quadro,
  // quadríceps (a ficha da técnica: primário, sobretudo o reto femoral; sem secundário)
  papeis: { quadriceps: "p" },
  trajetorias: { tornozelo: (q) => q.esq.lado.R.tornozelo },
};

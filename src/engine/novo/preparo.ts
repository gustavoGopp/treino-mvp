// O que o motor precisaria calcular ao abrir um exercício e não muda de uma vez para a outra: o quadro de cada vista,
// a vista da miniatura, a caixa do corpo no ciclo e as calibrações demoradas do corpo no aparelho. Calcular na hora
// atrasava o primeiro desenho em segundos. Cada exercício tem o seu arquivo (./dados/preparo/<id>.json, feito e
// conferido por scripts/animacao-nova/preparo.mjs), carregado junto com ele; o que não estiver guardado (outro corpo,
// uma calibração nova) é calculado na hora, com o mesmo resultado. Este arquivo só guarda e entrega: não calcula nada.

export interface Enquadramento {
  vistaMiniatura: string;
  /** O quadro (viewBox) de cada vista no palco e o da miniatura. */
  quadros: Record<string, number[]>;
  mini: number[];
  /** A caixa do corpo e do equipamento no ciclo, por vista (a chave é a de `caixaDoCiclo`, em ./cena.ts). */
  caixas: Record<string, number[]>;
}
export interface Preparo {
  enquadramento: Enquadramento;
  /** As calibrações que o exercício usa (a chave é a de `calibragem`, em ./calibragens.ts, com o corpo na frente). */
  calibragens: Record<string, unknown>;
}

const enquadramentos = new Map<string, Enquadramento>();
const calibragens = new Map<string, unknown>();
let usar = true;

/** Entrega ao motor o que foi calculado de antemão para um exercício (quem carrega o exercício chama, antes de usá-lo). */
export function registrarPreparo(id: string, p: Preparo): void {
  enquadramentos.set(id, p.enquadramento);
  for (const [k, v] of Object.entries(p.calibragens)) calibragens.set(k, v);
}
export const enquadramentoGuardado = (id: string): Enquadramento | undefined => (usar ? enquadramentos.get(id) : undefined);
/** A calibração guardada, numa caixa (o valor guardado pode ser qualquer coisa, até zero). */
export const calibragemGuardada = (chave: string): { v: unknown } | undefined => (usar && calibragens.has(chave) ? { v: calibragens.get(chave) } : undefined);
/** Só para o script que grava e confere os arquivos e para os testes: desliga o uso do que está guardado. */
export function usarPreparoGuardado(sim: boolean): void {
  usar = sim;
}

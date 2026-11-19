// Onde o pintor por pares (./pintor-por-pares.ts) está ligado: a lista das animações, pelo id. Etapa 1 (19/11/2026):
// vazia, o pintor está pronto e desligado em todas. Etapa 2: cada animação entra aqui depois que o Gustavo aprova a
// folha de antes e depois dela (scripts/animacao-nova/folha-do-pintor.mjs, que grava
// docs/revisoes/animacao-nova/pintor-por-pares/<id>.png). Fora desta lista, o desenho é o de hoje (`pintar`).
export const PINTOR_POR_PARES_LIGADO: ReadonlySet<string> = new Set<string>([]);

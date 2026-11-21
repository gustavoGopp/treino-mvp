// Onde o pintor por pares (./pintor-por-pares.ts) está ligado: a lista das animações, pelo id. Etapa 1 (19/11/2026):
// vazia, o pintor pronto e desligado em todas. Etapa 2: cada animação entra aqui depois que o Gustavo aprova a folha de
// antes e depois dela (scripts/animacao-nova/folha-do-pintor.mjs, que grava
// docs/revisoes/animacao-nova/pintor-por-pares/<id>.png). Fora desta lista, o desenho é o de hoje (`pintar`).
// Os lotes e a ordem dos próximos: docs/revisoes/animacao-nova/estudo-do-pintor.md, "Etapa 2".
export const PINTOR_POR_PARES_LIGADO: ReadonlySet<string> = new Set<string>([
  // lote 1 (19/11/2026): 5 das 6 com mais área pintada do jeito errado (folhas em pintor-por-pares/ e
  // lote-1-resumo.png), ligadas à espera do ok do Gustavo pela folha-resumo; a linha de base do motor (tests/visual) é
  // regravada depois dele. O `voador`, a sexta, fica de fora: por pares, ganha 2 achados novos (o estofado por cima da
  // bacia, de três quartos de trás, no erro "Tirar as costas"), e uma animação só entra sem achado novo.
  'remada-unilateral',
  'triceps-testa-halteres',
  'puxada-barra-reta',
  'puxada-unilateral',
  'abdominal-declinado',
  // lote 2 (19/11/2026): as 12 seguintes na ordem do estudo, todas só com achados que somem (folhas em pintor-por-pares/
  // e lote-2-resumo-a.png e -b.png), ligadas à espera do ok do Gustavo; a linha de base do motor é regravada depois
  // dele. O `voador` continua de fora: só passa com o ajuste do pintor (`pecaComPeca` e `contatoNoRemendo`, desligados),
  // que muda o desenho de três do lote 1.
  'nordico',
  'flexao-pes-elevados',
  'rosca-inclinada',
  'aducao-maquina',
  'flexao-joelho-deslizante',
  'voador-invertido',
  'flexao-joelho-elastico',
  'abdominal-polia',
  'mesa-flexora',
  'hack',
  'rosca-scott',
  'coice-maquina',
]);

/**
 * As animações em que o pintor por pares usa o ajuste do ciclo (`pecaComPeca: 'contorno'` e `contatoNoRemendo`, em
 * ./pintor-por-pares.ts: `opcoesDe`). Decisão do Gustavo em 21/11/2026 ("pode seguir assim"): o ajuste vale só onde ele
 * conserta um achado (o `voador` e a `hiperextensao`), e não nas três aprovadas do lote 1 em que ele muda o desenho
 * sem ganho que se veja (a remada unilateral perderia a mão atrás do halter; folha em
 * docs/revisoes/animacao-nova/pintor-por-pares/ajuste-antes-e-depois.png). Só vale numa animação que também está em
 * PINTOR_POR_PARES_LIGADO.
 */
export const AJUSTE_DO_PINTOR: ReadonlySet<string> = new Set<string>(['voador', 'hiperextensao']);

# Lote A5 · Resumo: os três exercícios entre as duas torres

De 18/11/2026. Três animações novas no motor novo, todas entre as duas torres da polia dupla, com as polias embaixo e um estribo em cada mão. Os três eram cartão de texto. **Nenhum está aprovado nem ligado às telas**: quem integra registra em `aprovados.ts` e no catálogo do guia e põe "Soltar a volta" (dos dois supinos) na lista `SEM_DESENHO` do teste da ponte.

| Exercício | Vista que abre (e a segunda) | Conferência automática | Erros desenhados | Erros não desenhados | Risco de o Gustavo não gostar |
|---|---|---|---|---|---|
| `supino-polia` | três quartos, pela cabeça (de cima) | 0 falha, 2 avisos (escolhas de desenho; o modo Músculos abre de cima) | Banco fora do meio; Cotovelos abertos a 90° | Soltar a volta (ritmo) | médio |
| `supino-inclinado-polia` | três quartos, pela frente (de cima) | 0 falha, 2 avisos (idem) | Banco fora do meio; Tirar as costas do encosto | Soltar a volta (ritmo) | médio |
| `crucifixo-polia-baixo` | de frente (de cima) | 0 falha, 2 avisos (escolhas de desenho; o modo Músculos abre de frente) | os três do cartão | nenhum | baixo a médio |

Conferências escritas: `supino-polia.md`, `supino-inclinado-polia.md`, `crucifixo-polia-baixo.md`. Quadros grandes: `../quadros/<id>.png`.

## O que é novo e o que é reaproveitado

- **Núcleo novo `exercicios/polia-banco.ts`** (dos dois supinos): o corpo no banco (deitado, como no supino reto aprovado; sentado, pela calibração do supino inclinado aprovado), o braço do supino (embaixo a 45–50° do tronco com o antebraço na vertical; no topo o braço na vertical e o antebraço 14° para dentro), as colunas e os cabos pelo núcleo da polia aprovado (`polia-bracos.ts`, sem mudança), e o erro do banco fora do meio (o banco e a pessoa 22 cm para um lado).
- **Regras novas:** `regras/polia-banco.ts` (banco no meio das torres, cabos por fora do banco, mãos embaixo e no topo, apoio no banco plano) e `regras/crucifixo-polia-baixo.ts` (polias embaixo, mãos no começo e no fim). Reaproveitadas: as do núcleo da polia (cabos longe do corpo, pilha de cada coluna, cotovelo fixo), as do supino inclinado aprovado (encosto, apoio) e a do tronco parado.
- **Mudança em arquivo comum: nenhuma.** O supino inclinado na polia chama `sentar` e usa `BANCO_DO_SUPINO`, que `supino-inclinado.ts` já exportava; o preparo das animações aprovadas não mudou (`preparo.mjs conferir` passa; `npm run conferir:animacao` sem falha em nenhuma das 125).
- **Uma diferença deliberada do supino reto aprovado:** lá, medido na superfície, as costas ficam 2,6 cm e a nuca 7,7 cm acima do tampo; aqui elas apoiam (amassam 1 cm), como o cartão pede ("escápulas juntas e apoiadas"). O supino reto aprovado não foi tocado.

## O ponto que decide: a vista

Os supinos aprovados abrem de lado. Aqui, de lado, as roldanas ficam ao lado do peito e o cabo de perto aparece como uma linha vertical que atravessa o banco no desenho (de fato ele passa 45 cm por fora, no plano, e 9 cm no inclinado). Testei todas as vistas: de frente e de trás (pela ponta do banco), as coxas ou a cabeça tapam o tronco; no inclinado, de frente, o encosto ainda é pintado por cima do tronco no estilo com cor de pele (defeito do pintor comum, que aparece também no supino inclinado aprovado visto de frente). Ficou **de três quartos**: pela cabeça no plano, pela frente no inclinado (a vista do crucifixo inclinado aprovado). É a escolha com mais chance de o Gustavo querer rever.

No crucifixo de baixo para cima, o pedido lembrava que os crucifixos na polia abrem de cima (decisão de 05/11). Abri de frente, como o crucifixo na polia aprovado do motor novo já abre: o arco aqui é de baixo para cima, e de cima a subida não aparece. Basta inverter a ordem das vistas se ele preferir.

## O que não ficou bom (nos três)

- No erro "Banco fora do meio", o cabo do lado de perto da torre fica mais curto que o repouso embaixo: na vida real ele afrouxaria; o motor desenha o cabo sempre reto (a pilha fica parada no repouso).
- No supino inclinado na polia, de três quartos, o rótulo "sobe e fecha um pouco" encosta numa das colunas (cenário) em cima: entre elas sobra pouco espaço.
- Nos supinos, o cabo passa perto do antebraço embaixo (2 cm no plano, 0,8 cm no inclinado), sem encostar.
- No crucifixo de baixo para cima, a pilha sobe 48 cm (o cabo anda 96 cm), bem mais que nos outros exercícios na polia; é a conta certa da relação 2:1.
- "Peito (parte de cima)": o desenho não separa a parte clavicular do peitoral; o inclinado e o crucifixo de baixo para cima pintam o peitoral inteiro.

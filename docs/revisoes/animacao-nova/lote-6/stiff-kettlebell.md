# Lote 6 · Stiff com kettlebell (`stiff-kettlebell`)

De 15/11/2026. Segunda animação da família dos stiffs. O kettlebell fica seguro pela alça com as duas mãos e pende na vertical na frente das pernas. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/stiff-kettlebell.md` (a técnica é a do `stiff` aprovado).
- Ficha de movimento: `src/engine/novo/dados/movimentos/stiff-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/stiff-kettlebell.ts`, sobre o núcleo `exercicios/dobrar-o-quadril.ts` (o mesmo do `stiff`, ver `stiff.md`).
- Folha ao lado da de hoje: `../prototipos/folha-stiff-kettlebell.png`. Quadros grandes: `../quadros/stiff-kettlebell.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Pés na largura do quadril, apontando para a frente | consenso | pés a 9 cm do meio, dedos para a frente; não saem do lugar (0 cm) | sim |
| Kettlebell pela alça com as duas mãos, na frente das coxas, braços estendidos | consenso | cada mão numa haste da alça (as mãos a 6,15 cm do meio, a meia distância entre as hastes), cotovelos a 4°; a bola embaixo do meio das mãos, pendendo na vertical | sim |
| Joelhos levemente dobrados e fixos | consenso | de 8° (em pé) a 15° (embaixo) | sim |
| Descida: o quadril vai para trás e o tronco desce com as costas retas | consenso | o quadril dobra 99° e vai 22 cm para trás; a lombar não flexiona (0°) | sim |
| O kettlebell desce perto das pernas, sem bater nas canelas | consenso | da bola à pele da coxa ou da canela: de 1,6 a 3,7 cm na descida; embaixo, a bola fica a 5,2 cm da pele do pé | sim |
| Embaixo: até onde as costas continuam retas (depende da flexibilidade) | consenso | as mãos param a 34,5 cm do chão (65% da canela); a base do kettlebell, 12 cm acima do chão; o peito a 9° da horizontal | sim (ver abaixo) |
| Subida: quadril à frente até ficar em pé, sem jogar o tronco para trás | consenso | em pé, o quadril dobra 6° e o peito fica 1° à frente da vertical | sim |
| Cadência ~2–3 s descendo, pausa curta, ~1–1,5 s subindo | consenso | 2,5 s; 0,45 s; 1,3 s | sim |
| Equilíbrio | consenso | o centro de massa (corpo + 12 kg) fica sobre o meio do pé em todos os quadros (0 cm) | sim |

**Até onde desce:** a ficha não dá número ("só até onde as costas continuam retas"). No stiff com halteres as mãos param no meio da canela; aqui isso deixaria a bola, que pende 22 cm abaixo das mãos, encostada no peito do pé (as pontas dos pés ficam dos dois lados da bola). As mãos param mais alto, a 65% da canela, e a bola fica 5,2 cm acima do pé. É escolha de desenho (`maos.embaixo`, selo desenho), a conferir com o Gustavo.

**O início no chão** ("kettlebell no chão entre os pés; pega e sobe com as costas retas") é a montagem, antes da série: o ciclo animado começa em pé, como no `stiff`.

Conferência automática: 0 falha. Avisos: as linhas da ficha de movimento que são escolha de desenho (os ângulos do joelho, a altura das mãos embaixo, os cotovelos, a folga de 1 cm) e a vista de lado, que não serve ao modo Músculos (a vista padrão é a de três quartos, de trás). O ritmo fica suave (salto de 6,2%).

## As vistas

A de lado (padrão) e a de três quartos, de trás (como no `stiff`; de frente, embaixo, o tronco tapa tudo). Na de três quartos o kettlebell fica em boa parte atrás das pernas; ele se lê na vista de lado.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Coluna arredondada (de lado) | a bacia inclina 12° menos, a lombar flexiona 24° e a torácica 6° a mais; as mãos descem 3 cm a mais; a cabeça fica no mínimo a 71 cm do chão (no certo, 81), bem acima do joelho |
| Agachar em vez de levar o quadril para trás (de lado) | os joelhos dobram 62°, o quadril desce para 74 cm e o peito inclina 43°; o kettlebell passa na frente dos joelhos |
| Kettlebell longe das pernas (de lado) | embaixo, as mãos ficam 27,5 cm à frente do tornozelo (no certo, 11); o quadril vai 4,5 cm mais para trás para equilibrar |

## O equipamento

- **Kettlebell:** o da tabela de objetos (28,2 cm de altura, bola de 20,8 cm, hastes a 12,3 cm), desenhado pelo gerador realista, 12 kg (o peso desenhado, selo desenho na tabela). A alça passa pelas duas mãos e a bola fica embaixo do meio, como pedido em 04/11.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- "O kettlebell nunca fica solto entre as mãos" (04/11): a alça passa pelas duas mãos. Respeitada.
- Glúteo em laranja e posteriores da coxa em vermelho, como o `stiff` (02/11). Respeitada.

## O que não ficou bom

- **De três quartos, de trás, o kettlebell quase não aparece** (fica atrás das pernas). Testei a de frente, que é pior embaixo (o tronco tapa o corpo); fiquei com a de três quartos por causa do modo Músculos. O kettlebell se lê na vista de lado, que é a padrão.

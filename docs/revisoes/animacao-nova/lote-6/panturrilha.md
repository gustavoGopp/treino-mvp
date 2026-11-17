# Lote 6 · Panturrilha unilateral no step (`panturrilha`)

De 15/11/2026. A bola do pé direito na borda do step, o calcanhar para fora; a perna esquerda dobrada atrás, sem apoiar; o halter na mão direita, pendurado ao lado do corpo; a mão esquerda na coluna da estação, só para equilibrar. Pausa de 2 s alongado, sobe em 1 s, segura no topo, desce em 2 s. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/panturrilha.md` (guia original, consenso).
- Ficha de movimento: `src/engine/novo/dados/movimentos/panturrilha.json`.
- Animação: `src/engine/novo/exercicios/panturrilha.ts`, sobre `exercicios/panturrilha-no-step.ts` (comum com a `panturrilha-b`), que usa o núcleo `exercicios/elevar-o-calcanhar.ts`.
- **Peça nova: o step** (`pecas-de-cena/degrau.ts`, `step`; medidas em `dados/objetos/step.json`: Reebok Step, 102 × 38,5 cm, na altura mais baixa, 15 cm, da ficha pública da Lifespan Fitness). O desenho segue o cartão do step do app: dois apoios claros, a plataforma escura de cantos arredondados e o tapete na cor de ação com frisos, no gerador realista.
- A coluna da estação é a do búlgaro (cenário: atrás do corpo, fora do enquadramento, não desenhada de perfil).
- Folha: `../prototipos/folha-panturrilha.png`. Quadros: `../quadros/panturrilha.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Ponta do pé (a bola) na borda do step, calcanhar para fora | consenso | a bola do pé 2 cm para dentro da borda do step de 15 cm; o pé não sai do lugar (0 cm) | sim |
| A outra perna dobrada atrás, sem apoiar | consenso | a coxa esquerda 5° à frente da vertical e o joelho dobrado 50° (na animação de hoje, a canela 38° abaixo da horizontal); o pé solto fica atrás, 33 a 46 cm do chão, longe do step | sim |
| Joelho da perna de apoio quase estendido e parado | consenso | 4° o ciclo todo | sim |
| Halter na mão do mesmo lado da perna que trabalha; a outra mão na torre | consenso | halter de 25 lb na mão direita, pendendo na vertical, 7° afastado do corpo; a mão esquerda no trilho da coluna, a 110 cm do chão, parada (0 cm); o cotovelo vai de 80° (embaixo) a 44° (em cima) | sim |
| Alongado: calcanhar abaixo da borda do step, 2 s | consenso | 6,4 cm abaixo (como hoje), 2 s parado | sim (ver a dorsiflexão) |
| Subida ~1 s, o máximo na ponta do pé | consenso | 1 s; o calcanhar sobe até 13,9 cm acima do step (como hoje); flexão plantar de 40° | sim |
| Topo ~1 s, descida ~2 s | consenso | 0,8 s e 2 s | sim |
| Equilíbrio numa perna só, com o halter | consenso (mecânica) | o centro de massa (corpo + 11,3 kg) fica a 0 cm da bola do pé, para a frente e de lado; a bacia vai 6,5 cm para a direita; a cabeça anda 0,7 cm para a frente e para trás | sim |

**A dorsiflexão embaixo:** 30,5° (aviso; média 14,8°, máximo observado 48°, CDC). Mesma conta do degrau: o calcanhar 6,4 cm abaixo da borda (18,8°) mais a inclinação da perna que põe o centro de massa sobre a bola do pé. A animação aprovada de hoje chegava a 32°. Ficou como hoje; a decisão de descer menos é do Gustavo.

Conferência automática: **0 falha, 2 avisos** (a dorsiflexão; as linhas de desenho). Ritmo: salto máximo de 5,8%.

## As vistas

- **De lado** (a primeira): o calcanhar abaixo da borda e na ponta do pé, a perna livre atrás, o halter.
- **Três quartos, de trás** (`quinaTras`): a panturrilha direita (vista padrão do modo Músculos), a perna livre, a mão na coluna e o step. De frente e de trás, a perna livre fica atrás da outra e o calcanhar não se lê.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Não descer o calcanhar (de lado) | embaixo o calcanhar para 1,5 cm acima da borda do step (como hoje) |
| Dobrar e esticar o joelho (de lado) | embaixo o joelho dobra 25° e estica na subida, dando impulso |

## Correções já feitas que esta animação respeita

- Panturrilha em vermelho, só do lado que trabalha, sem secundário (a biblioteca; revisão de anatomia de 02/11).
- O halter pende na vertical e fica na mão (a conferência mede: a distância da mão ao halter não muda).

## Medidas provisórias

Todas as distâncias da ficha de movimento (a ficha da técnica não dá número): `pes.meiaDistancia` (9 cm), `bola.daBeirada` (2 cm), `calcanhar.embaixo` e `calcanhar.topo` (6,4 e 13,9 cm, da animação de hoje), a perna livre (5°, 50°, 25°), a mão na coluna (40 cm ao lado, 110 cm de altura, 5 cm à frente da bola do pé), `bracos.paraFora` (7°), `step.x` (−32 cm). No step: as espessuras do tapete e da plataforma e a largura dos apoios saem do cartão do app (desenho).

## O que não ficou bom

- **O cotovelo da mão na coluna:** como a mão fica parada e o corpo sobe 14 cm, o cotovelo vai de 80° (embaixo) a 44° (em cima), apontando para fora e para trás. De três quartos, embaixo, o braço parece um pouco "de asa". Testei a mão mais alta (fica fora do alcance em cima) e o cotovelo para trás (aparecia atrás das costas na vista de lado); esta foi a melhor das três.
- **A mão de apoio fica 5 cm à frente da bola do pé** (e não 12, como no búlgaro): mais à frente, na vista de lado ela aparecia na frente do tronco segurando o nada, porque a coluna não é desenhada de perfil.
- **A pegada na coluna fica inclinada** (o polegar para cima e um pouco para a frente), a mesma da `panturrilha-b`: com o polegar na vertical, lá o antebraço passava da supinação média.
- A dorsiflexão embaixo (ver acima).

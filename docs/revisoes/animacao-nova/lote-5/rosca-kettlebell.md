# Lote 5 · Rosca com kettlebell (`rosca-kettlebell`)

De 15/11/2026. Terceira animação da família das roscas no motor novo. Em pé, um kettlebell na mão direita, palma para a frente, a bola pendurada embaixo da mão; a mão esquerda solta ao lado do corpo (um braço por série, como diz o texto do app). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-kettlebell.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/rosca-kettlebell.ts`, sobre o núcleo `exercicios/dobrar-o-cotovelo.ts` (`kettlebellNaMao`).
- Regras medidas: `src/engine/novo/regras/roscas.ts` (a nova aqui é `bola-pendurada-na-rosca`).
- Folha ao lado da de hoje: `../prototipos/folha-rosca-kettlebell.png`. Quadros grandes: `../quadros/rosca-kettlebell.png`.

## Como o kettlebell fica na mão

A barra de cima da alça atravessa a palma (na direção do polegar) e o kettlebell só pode girar em volta dela. Em cada quadro ele fica no ponto mais baixo que esse giro deixa (pendurado); se a bola chegasse a menos de 1 cm da pele do antebraço, ela encostaria e passaria a girar com ele (um máximo suave entre as duas posições, para não dar tranco). Com o cotovelo a 130° no topo, a bola ainda fica pendurada e chega a 2,1 cm do antebraço: ela quase encosta, como numa rosca de verdade. As medidas são as do kettlebell da tabela de objetos (`formaDoKettlebell`: 28,2 cm de altura, bola de 20,8 cm), desenhado pelo gerador realista como no stiff e no afundo com kettlebell.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril, joelhos destravados | consenso | pés a 9 cm do meio, joelhos a 5°; os pés não saem do lugar | sim |
| Uma mão na alça, palma para a frente | consenso | antebraço supinado 85° (90° = palma toda para a frente; média 87,5°) | sim |
| A bola fica pendurada embaixo da mão | consenso | com o antebraço abaixo de 60° de flexão, a bola fica no máximo 1,7° fora do ponto mais baixo que o giro em volta da alça deixa; a alça inclina até 10° (a pegada segue o antebraço, aberto 6°) | sim |
| Cotovelo junto ao corpo, parado | consenso | o cotovelo anda 0 cm enquanto dobra de 8° a 130°; o braço fica 0° à frente da linha do tronco e 6° aberto | sim |
| Sobe até a mão chegar perto do ombro, sem balançar o tronco | consenso | a pegada chega a 27,3 cm do centro do ombro, 9 cm abaixo e à frente dele; a base do pescoço anda 0 cm | sim |
| Desce até estender o braço | consenso | embaixo, o cotovelo dobra 8° | sim |
| A outra mão solta ao lado do corpo | consenso (app) | a mão esquerda pende relaxada, o cotovelo a 8° | sim |
| ~1 s subindo, ~2 s descendo | consenso | 1,1 s e 2,2 s, com pausa de 0,4 s em cima; salto de velocidade de 6% | sim |
| A bola não atravessa o corpo (desenho) | — | menor folga de 2,1 cm (antebraço, no topo) no certo; 2,4 cm da coxa embaixo; 1,8 cm nos erros | sim |
| Equilíbrio | — | o centro de massa (corpo + 12 kg na mão direita) fica sempre dentro do apoio dos pés | sim |

Conferência automática: **0 falha, 2 avisos**: as linhas de desenho (abertura do braço, a folga da bola no antebraço, o cotovelo da mão livre) e o antebraço em "só ajuda" (correção de 04/11), fora da lista do conteúdo.

## As vistas

- **De lado** (padrão da técnica): o cotovelo parado e a bola pendurada subindo com a mão.
- **De frente**: mostra a bola ao lado da coxa embaixo e a alça atravessada na mão. É a vista padrão do modo Músculos, medida: de frente 96 cm² do bíceps (no topo a bola cobre parte do braço); de lado 54 cm²; de três quartos (`quina`) 59 cm².

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Balançar o tronco (de lado) | o peito vai 12° para trás e a lombar arqueia 6° enquanto o kettlebell sobe; os pés não saem do lugar |
| Cotovelo vai para a frente (de lado) | o braço sobe 35° à frente do tronco e o antebraço dobra 110°: o cotovelo anda cerca de 17 cm para a frente |
| Não estender o braço (de lado) | embaixo, o cotovelo para dobrado 55° |

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Antebraço "só ajuda" (listrado) nas roscas (04/11, `SO_AJUDA`). Respeitada.
- "Só entra com animação própria, com o kettlebell desenhado" (04/11): o kettlebell é o do gerador realista.

## Músculos

Bíceps do braço direito (principal) e antebraço do braço direito (só ajuda, listrado). O esquerdo não trabalha (a mão está solta). A biblioteca conta só o bíceps.

## O que não ficou bom

- **De frente, no topo, a bola cobre parte do braço e do bíceps** (é onde ela fica: na frente do braço, pendurada da mão). O bíceps aparece no modo Músculos, mas menos que nas roscas com halter (96 cm² contra 192).
- **A mão no topo parece "sair" por cima da alça de lado:** a mão fecha em volta da barra e os dedos seguem o antebraço, que aponta para cima; é a pose certa, mas no desenho o punho fica acima da alça.

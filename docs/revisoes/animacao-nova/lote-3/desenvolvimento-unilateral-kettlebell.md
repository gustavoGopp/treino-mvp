# Lote 3 · Desenvolvimento unilateral em pé com kettlebell (`desenvolvimento-unilateral-kettlebell`)

De 15/11/2026. Quarta animação da família dos ombros no motor novo. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/desenvolvimento-unilateral-kettlebell.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/desenvolvimento-unilateral-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/desenvolvimento-unilateral-kettlebell.ts`, sobre o núcleo dos desenvolvimentos (`exercicios/empurrar-para-cima.ts`, descrito em `desenvolvimento.md`).
- Regras novas medidas: `src/engine/novo/regras/ombros.ts` (`kettlebell-na-altura-do-ombro`, `kettlebell-no-antebraco`, `cotovelo-junto-ao-corpo`, `punho-reto`, `braco-estendido-acima-da-cabeca`, `carga-longe-da-cabeca`, `peso-perto-do-meio-do-pe`).
- Folha ao lado da de hoje: `../prototipos/folha-desenvolvimento-unilateral-kettlebell.png`. Quadros grandes: `../quadros/desenvolvimento-unilateral-kettlebell.png`.

## Como o núcleo resolve cada quadro (em pé)

- **O corpo:** o núcleo dos stiffs, com os joelhos a 8° e a bacia sem inclinar. O quadril fica parado num ângulo só, a média dos ângulos de equilíbrio (corpo + kettlebell) em cinco pontos da subida: o tronco não se mexe e o centro de massa anda pouco no pé. A mão esquerda fica na cintura (a pose dos afundos com o peso do corpo).
- **O braço direito:** úmero de 60° abaixo da horizontal (o cotovelo à frente das costelas, junto ao corpo) a 82° acima (8° da vertical), quase no plano da frente do corpo; antebraço sempre na vertical. A mão gira de palma para dentro (embaixo) a 30° para a frente (no topo).
- **O kettlebell (rack):** a mão segura a alça; a bola fica do lado do dorso da mão e do antebraço, puxada um pouco para fora. O ângulo da bola em relação ao antebraço não é escolhido: é o que deixa a bola a 0,3 cm da pele do antebraço (calculado embaixo, uma vez).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril, joelhos destravados | consenso | pés a 9 cm do meio, parados (0 cm); joelhos a 8° | sim |
| Kettlebell na altura do ombro, apoiado no antebraço | consenso | o centro da mão fica 3,2 cm acima da ponta do ombro; a bola fica a 0,3 cm da pele do antebraço o ciclo todo | sim |
| Bola do lado de fora do antebraço | consenso | a bola fica no dorso da mão e do antebraço, puxada para fora (de frente, do lado de fora do braço) | sim |
| Cotovelo junto ao corpo | consenso | o braço perto do cotovelo fica a 3,7 cm da pele do tronco | sim |
| Punho reto | consenso | o punho dobra 0° no certo | sim |
| Empurra para cima até o braço estender acima da cabeça | consenso | antebraço sempre na vertical (0°); no topo o cotovelo dobra 8°, a mão fica 32 cm acima do alto da cabeça e a 4,2 cm da vertical do ombro | sim |
| Sem arquear a lombar; tronco parado, abdômen firme | consenso | lombar 0° além da curva de repouso; a base do pescoço não se move (0 cm) | sim |
| A outra mão na cintura | consenso | parada (0 cm), cotovelo a 98° | sim |
| ~1–1,5 s subindo, ~2–3 s descendo | consenso | 1,3 s e 2,4 s | sim |
| O peso passa sem bater na cabeça | consenso | a bola passa a no mínimo 18,1 cm da cabeça | sim |
| Equilíbrio | mecânica | o centro de massa anda de −3,6 a +1,7 cm do meio do pé (para a frente e para trás) | sim |

Conferência automática: **0 falha**. Avisos: a flexão do cotovelo embaixo (150°, acima da média de 148°: é a posição de rack, com o antebraço colado ao braço), a elevação do braço no topo (173°, acima da média de 170°, abaixo do máximo de 192°), as linhas que são escolha de desenho (joelho, pescoço, o plano do braço, o giro da mão, a folga da bola) e a vista de frente, que não serve ao modo Músculos (a frente do ombro some atrás do braço no alto). Ritmo: salto de 7,5%.

**Medida que não está no conferido:** de lado a lado, o centro de massa fica 4 cm à direita do meio dos pés (o kettlebell numa mão só); a conferência só mede para a frente e para trás. Fica dentro da base (os pés vão de −14 a +14 cm).

## As vistas

A primeira é a **de lado**: mostra o rack, a subida sem arquear e os três erros, e é a vista padrão do modo Músculos (45 cm² da frente do ombro no pior instante). A segunda é a **de frente**: mostra a bola do lado de fora do antebraço, o braço subindo sobre o ombro e a mão na cintura. Testei as de três quartos e a de trás: de trás a frente do ombro não aparece embaixo, e de três quartos o braço some no topo.

**O plano do braço:** primeiro pus o braço subindo num plano mais para o lado (20° à frente do corpo no topo). Assim, no topo, a frente do ombro some atrás do braço em todas as vistas (0 cm²), e a conferência falhava. Com a pegada neutra (palma para dentro) o braço sobe quase no plano da frente do corpo, com o cotovelo à frente, o que é comum no desenvolvimento com kettlebell; é escolha de desenho, e está na ficha de movimento.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Arquear a lombar (de lado) | no topo, a lombar arqueia 20° e a torácica 8°, a bacia inclina 6° à frente e vai 7,6 cm para a frente; o peito fica 17° atrás da vertical (no certo, 1°) |
| Jogar o peso com as pernas (de lado) | embaixo, os joelhos dobram 30° e o tronco inclina 6°: o quadril desce 3 cm e vai para trás; na subida eles estendem |
| Punho dobrado para trás (de lado) | embaixo, o punho dobra 35° para trás e a mão (e a bola) cai para fora |

## O equipamento

- **Kettlebell:** a peça do motor (`formaDoKettlebell`, 12 kg na tabela, massa de desenho), com o eixo da base à alça e a alça na direção da palma.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Kettlebell apoiado no antebraço, bola do lado de fora; erro "punho dobrado" (a bola cai mais para trás). Respeitada. Esse erro continua "pequeno" (o corpo quase não muda).

## Músculos

Frente do ombro direito (principal); lateral do ombro e tríceps do lado direito (secundários), como a ficha da técnica e o desenho de hoje.

## O que não ficou bom

- **Tema escuro:** a bola do kettlebell quase some no fundo escuro (quadro `frontal:tec:f1::cinza:escuro`). É o desenho do kettlebell de `equipamento.ts`, o mesmo das outras animações com kettlebell; não mexi nele (arquivo comum).
- **O erro do punho se lê mal:** o punho dobrado fica quase todo atrás da bola, de lado (quadro `lateral:err:f0:punho`); o que se vê é o braço em vermelho e a bola mais para fora. É o "erro pequeno" já registrado.
- **No meio da subida, de lado, a bola passa na frente do rosto** (quadro `lateral:tec:f0.5`): é profundidade (ela fica 18 cm longe da cabeça), mas tapa o rosto um instante.

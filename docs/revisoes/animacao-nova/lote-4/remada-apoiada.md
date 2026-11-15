# Lote 4 · Remada com halteres, peito apoiado no banco inclinado (`remada-apoiada`)

De 15/11/2026. A quinta remada do lote 4, que o colega não entregou (`relatorio-remadas.md`, item 5: o encosto virado para o lado errado, comprido demais e as coxas atravessando o estofado). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/remada-apoiada.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/remada-apoiada.json`.
- Animação: `src/engine/novo/exercicios/remada-apoiada.ts`, sobre o núcleo das remadas (`exercicios/remada.ts`: os braços que puxam, os halteres, os erros "subir", "encolher" e "curta").
- Banco: `src/engine/novo/pecas-de-cena/banco-regulavel.ts`, com o campo opcional novo `sobe` (ver "O equipamento").
- Regras novas (`src/engine/novo/regras/remada-apoiada.ts`): `remada-apoiada-peito-no-encosto`, `remada-apoiada-queixo-alem-da-ponta`, `remada-apoiada-pernas-fora-do-banco`, `remada-apoiada-halter-longe-do-chao`. Usadas como estão: as das remadas (`regras/remadas.ts`), `escapulas-se-juntam` e `palmas-uma-para-a-outra` (`regras/suspensao.ts`), `lombar-neutra`.
- Folha ao lado da de hoje: `../prototipos/folha-remada-apoiada.png`. Quadros grandes: `../quadros/remada-apoiada.png`.

## O que resolveu o problema do colega

1. **O banco virado:** o banco regulável ganhou o campo opcional `sobe: 1`, que gira o banco inteiro meia volta em torno da vertical (os volumes da conferência e o desenho): o encosto sobe para +z, para onde a pessoa olha, e o assento fica atrás. Sem o campo, nada muda (os quadros do `desenvolvimento`, da `rosca-inclinada` e do `supino-inclinado` saíram iguais byte a byte).
2. **O encosto comprido e as coxas:** o encosto continua com os 98 cm da tabela. A saída foi a posição da animação de hoje: o banco passa entre as pernas, com os pés no chão dos dois lados (hoje, a 24 cm do meio; aqui, 34 cm) e o tronco 8° mais deitado que o encosto. Assim o peito apoia no alto do encosto e a bacia fica um pouco acima do estofado, e as coxas passam dos lados dele (o estofado tem 28,6 cm de largura). Com o tronco paralelo ao encosto, a barriga e a bacia afundavam nele e as coxas entravam 1 a 3,5 cm nas laterais; com o tronco mais em pé, era a barriga que encostava, e não o peito.
3. **O desenho de trás:** quando a câmera olha de trás da pessoa, o encosto (e o que fica debaixo dele) vai para trás na pintura; antes, de trás, o estofado cobria as costas.

## Como cada quadro é resolvido

- **O tronco** inclinado 53° (o encosto a 45° mais 8°), com a coluna neutra e parado (núcleo). Ao longo do encosto, o alto do esterno fica 4 cm antes da ponta; para dentro dele, o ponto mais fundo do peito afunda 1 cm.
- **Os pés:** no chão, dos lados do banco, na ponta dos pés (calcanhar 40° levantado), à distância que deixa o joelho dobrado 15°. Num corpo de pernas curtas, os pés se afastam e o peito desce no encosto, de centímetro em centímetro, até a perna alcançar o chão e passar fora do banco.
- **Os braços:** os do núcleo (do pendurado embaixo do ombro, cotovelo a 3°, até 26° além da linha das costas), com o cotovelo 28° para fora no fim (16° nas outras remadas: o halter entrava na lateral do encosto). O núcleo ganhou o campo opcional `folgaExtra`: os braços se afastam também do banco, se o halter chegaria a menos de 0,5 cm dele.

## O que a fonte pede × o que o boneco faz (medido) × confere?

Medidas no homem (o corpo dos quadros e da conferência).

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De bruços com o peito no encosto (30–45°) | consenso | encosto a 45°; o peito afunda 1 cm no estofado o ciclo todo; o tronco não se mexe (0 cm, 0°) | sim |
| O queixo um pouco além da ponta | consenso | o queixo 10,2 cm além da ponta; o alto do esterno 4 cm antes dela | sim |
| Pés firmes no chão atrás, joelhos levemente dobrados | consenso | os pés no chão, dos lados do banco, 14,8 cm para fora da lateral do estofado (não atrás dele: ver "O que não ficou bom"); joelho a 15°; as pernas ficam a 0,6 cm das peças do banco | em parte |
| Pegada neutra, braços estendidos para baixo | consenso | antebraço a 90° (palmas uma para a outra); cotovelo a 3° no começo | sim |
| Puxa os cotovelos para trás, em direção ao quadril, juntando as escápulas | consenso | o cotovelo fica 4,5 cm além da linha das costas; o braço se afasta no máximo 28° do tronco; a clavícula vai 13,2° para trás | sim |
| ~1 s puxando, segura 1 s, ~2 s voltando | consenso | 1,1 s, 1 s, 2,1 s; maior salto de velocidade 5% | sim |
| O halter não encosta no chão | consenso | 47,6 cm do chão com o braço estendido; 2,6 cm do banco; 0,2 cm da pele (a cabeça do halter ao lado do punho) | sim |

Conferência automática: **0 falha, 2 avisos**: as linhas de desenho da ficha de movimento e a vista de lado, que não serve ao modo Músculos (176 cm² das costas, contra 611 cm² de três quartos, de trás): o modo Músculos fica de três quartos, de trás.

## As vistas

- **De lado** (padrão da técnica): o peito no encosto, o braço e o halter. O rótulo "peito colado no banco".
- **De três quartos, de trás (`quinaTras`)**: as costas (padrão do modo Músculos), as pernas dos lados do banco e os dois braços. O rótulo "cotovelos para o quadril". De trás (`posterior`) fica o erro "encolher os ombros".

## Erros

| Erro (texto do app) | O que o boneco faz |
|---|---|
| Peito sai do banco (de lado) | o tronco levanta 18° em volta do quadril na puxada (o núcleo, "subir") |
| Encolher os ombros (de trás) | os ombros sobem 8° no fim |
| Não estender os braços (de lado, quadro no começo) | a volta para em 45% do caminho |

## O equipamento

- **Banco regulável** (`pecas-de-cena/banco-regulavel.ts`): campo opcional `sobe` (−1, o padrão, ou +1: meia volta), com `noBanco` e `direcaoNoBanco` (o giro de pontos e direções) e as funções `dobradica`, `faceDoEncosto` e `geometriaDoBanco` já devolvendo o banco girado; com `sobe: 1` e a câmera atrás da pessoa, o encosto é pintado atrás do corpo.
- **Halter:** o de 25 lb da tabela.

## Músculos

Costas (dorsal e meio das costas, principal); ombro de trás e bíceps (secundários), como a curvada (correção de 10/11) e a biblioteca.

## O que não ficou bom

- **Os pés ficam dos lados do banco, e não atrás dele.** A ficha diz "pés firmes no chão atrás". Com o encosto de 98 cm e o peito na ponta, o quadril fica a 88 cm do chão, em cima do estofado: para os pés irem atrás do assento, as pernas teriam de atravessar o estofado. A animação de hoje faz o mesmo (pés a 24 cm do meio).
- **No corpo da mulher, duas regras falham** (a conferência oficial roda no homem; conferi também a mulher): (1) com as pernas mais curtas, o pé não alcança o chão com o queixo além da ponta; o peito desce no encosto até alcançar, e o queixo fica 2,1 cm antes da ponta; (2) a cabeça do halter fica 0,1 cm dentro do antebraço, junto ao punho (é o encosto natural da cabeça do halter na mão). Tentei o encosto a 40°, 35° e 30° (a faixa do app): a mulher não melhora, e a 30° o cotovelo passa de 30° para fora.
- **O tronco 8° mais deitado que o encosto** é escolha de desenho: com ele, só o peito apoia, e a barriga fica um pouco acima do estofado (2,2 cm); a ficha diz "peito no encosto".

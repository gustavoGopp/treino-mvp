# Lote 7 · Abdução de quadril deitado de lado, sem carga (`abducao-deitado`)

De 15/11/2026. Deitado sobre o lado esquerdo, de costas para quem vê (o glúteo fica à vista), a cabeça apoiada no braço de baixo (estendido acima da cabeça, deitado no chão), a mão de cima espalmada no chão à frente do ombro, a perna de baixo dobrada à frente para dar base. A perna de cima (a direita) sobe estendida, 10° atrás da linha do corpo, com os dedos para a frente, em 1,1 s; segura 1 s; desce em 2 s. A bacia não sai do lugar. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/abducao-deitado.md` (a mesma técnica da `abducao-caneleira`).
- Ficha de movimento: `src/engine/novo/dados/movimentos/abducao-deitado.json`.
- Animação: `src/engine/novo/exercicios/abducao-deitado.ts`, sobre dois núcleos novos da família:
  - `exercicios/quadril-deitado-de-lado.ts`: o primeiro corpo deitado de lado do motor novo. A bacia gira 180° em volta da vertical (`giro`) e tomba 90° (`lado`): o corpo fica ao longo de x, a frente para −z, e rolar para trás é a inclinação `frente` da bacia (com o corpo tombado, ela gira em volta do eixo do corpo). O núcleo resolve, medindo na superfície do Boneco: a inclinação da coluna para o lado que põe o peito no chão junto com a bacia (−5,6°, a cintura fica no ar), a altura da bacia (o trocânter de baixo no chão), o braço de baixo deitado no chão, a cabeça apoiada nele (`cervicalLado`, 14,4°) e a perna de baixo encostada no chão.
  - `exercicios/quadril-abrir-deitado.ts`: a abdução (serve também à `abducao-caneleira`).
- Mudança no motor comum: **um campo opcional novo em `esqueleto.ts`**, `cervicalLado` (a inclinação do pescoço para o lado), somado na região cervical como já se faz com `lombarLado` e `toracicaLado`. Sem ele, a cabeça deitada de lado não tinha como apoiar no braço. Nada do que já existia mudou: `npm run conferir:animacao` segue sem falha nas outras.
- Regras novas (`regras/quadril-abrir-e-fechar.ts`): `quadril-deitado-de-lado-no-chao`, `quadril-empilhado`, `quadril-perna-um-pouco-atras`, `quadril-dedos-para-a-frente`, `quadril-abducao-sem-passar-de-45`, `quadril-pernas-sem-se-atravessar`.
- Folha: `../prototipos/folha-abducao-deitado.png`. Quadros: `../quadros/abducao-deitado.png`.

## Vistas

A padrão é `frontal`: com o corpo ao longo de x e de costas para quem vê, é a vista que mostra o corpo inteiro e a perna subindo no plano da tela. A segunda é `cima` (a do guia de hoje, pela correção de 04/11): mostra a perna de cima um pouco atrás da linha do corpo e o erro de levá-la à frente. Testei `lateral` e `posterior` (o corpo visto pela cabeça ou pelos pés: um borrão), `quina` e `quinaTras` (leem a pose, mas o corpo fica torto no quadro). A `quina` ficou só para o erro de rolar o quadril, que de frente e de cima não se lê (de frente, os dois quadris continuam um sobre o outro na tela; de cima, a perna de baixo dobrada tapa a bacia).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Deitado de lado, cabeça no braço de baixo | consenso | o eixo dos quadris na vertical (0°); a bacia no chão (0 cm), o lado do peito a 1,5 cm; a cabeça a 0,5 cm do braço de baixo; o ponto mais baixo do corpo a −0,3 cm (a pele amassa) | sim |
| Perna de baixo dobrada, para dar base | consenso | coxa de baixo 45° à frente, joelho a 90°, deitada no chão (o joelho não sai do lugar) | sim |
| Perna de cima estendida, um pouco atrás da linha do corpo | consenso | joelho reto (0°), 10° atrás da linha do corpo o ciclo inteiro | sim |
| Quadril empilhado, sem rolar para trás | consenso | o eixo dos quadris fica a 0° da vertical; a bacia anda 0 cm e o peito gira 0° | sim |
| Dedos para a frente, não para o teto | consenso | os dedos ficam a 20° da frente do corpo (10° de flexão plantar e a perna aberta) | sim |
| Embaixo: a perna quase encosta na de baixo | consenso (app) | 8° para dentro da linha do quadril | sim |
| Sobe até onde o quadril não rola nem a cintura dobra; não precisa subir muito (o app: acima de uns 45° a cintura dobra) | consenso | 35° de abertura (AAOS: média 40°) | sim |
| ~1 s subindo, 1 s parado, ~2 s descendo | consenso | 1,1 s, 1 s, 2 s; maior salto de velocidade 4,7% do pico | sim |
| As pernas não se atravessam | desenho | a menor folga entre as pernas é 3,8 cm | sim |

Conferência automática: **0 falha, 1 aviso** (as linhas de desenho da ficha de movimento: o braço de baixo, a mão de cima, a perna de baixo, a flexão plantar e o piso sem colchonete).

## Erros

- **Rolar o quadril para trás** (vista `quina`): a bacia e o tronco rolam 30° para trás, a perna sobe pela frente (25° de flexão) e gira 35° para fora (os dedos para o teto). A bacia volta a encostar no chão (ponto mais baixo −0,4 cm). A linha vermelha é a dos ombros.
- **Levar a perna para a frente** (vista `cima`): a perna sobe 25° à frente da linha do corpo.
- **Subir alto demais com tranco** (vista `frontal`): a perna vai a 58° e a cintura dobra (a bacia sobe para as costelas 10°, o peito fica no chão). O tranco em si (a velocidade) não aparece num quadro parado.

## Músculos

Principal: `gluteo:R`. O desenho tem um glúteo só (`dados/musculos.json`: "Glúteo máximo", que traz o médio em `naoSepara`): **o glúteo médio, que é o principal da abdução, não existe à parte no desenho**. O que acende é a mancha do glúteo do lado de cima, que de costas aparece como um bloco quase quadrado. Sem secundário, como a ficha.

## Correções já feitas, respeitadas

- 04/11 (`correcoes-ja-feitas.md`): "o motor mantém a pelve nivelada e os dois quadris caem no mesmo ponto na vista de lado; por isso ganharam a vista de cima". No motor novo a bacia deita de verdade (o eixo dos quadris na vertical), a vista padrão mostra os dois quadris um sobre o outro, e a vista de cima continua sendo a segunda.

## O que não ficou bom

- **O ombro de baixo sobe além do ritmo do braço** (`bracoDeBaixo.elev`, 30° de clavícula; a elevação total da clavícula fica em 47°, perto do limite do encolher de ombros). Tentei antes com o ombro no ritmo normal: a cabeça só chegava ao braço com o pescoço dobrado 45° para o lado (pescoço quebrado); com o ombro para a frente (protração), o tronco subia e piorava. Com 30°, o pescoço inclina 14°, que se lê como cabeça deitada no braço. É escolha de desenho, sem fonte.
- **Na emenda da cabeça com o pescoço** (quadro `frontal`, vista de costas) aparece um degrauzinho de 1 a 2 px no contorno, por baixo da orelha. Vem do desenho do corpo (o pescoço inclinado para o lado), que eu não mexo.
- **A mão de cima aparece pelo vão debaixo da cabeça**, como uma lâmina escura no chão (quadro `frontal`): é a palma espalmada atrás do corpo, vista pelo vão entre a cabeça e o chão. Está certa na geometria, mas pode parecer um objeto. Movi a mão para a altura do ombro (antes aparecia debaixo do peito).
- **O glúteo no modo Músculos** é um bloco (o desenho do corpo não separa o médio).
- **Sem colchonete**: a ficha diz que ele só ajuda, e o colchonete da tabela (100 × 50 cm, provisório) é curto para o corpo deitado.

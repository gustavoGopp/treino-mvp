# Lote A2 · Extensão de joelho sentado com mini-band (`extensao-joelho-mini-band`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no fundo do assento da cadeira firme, as costas apoiadas no encosto, as mãos nas bordas do assento; o pé esquerdo chapado no chão, segurando a faixa; a mini-band em volta dos dois tornozelos. Só a canela direita gira em volta do joelho, do pé perto do outro até a perna reta. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/extensao-joelho-mini-band.md`. Cartão do app: `src/conteudo/exercicios/extensao-joelho-mini-band.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/extensao-joelho-mini-band.json`.
- Animação: `src/engine/novo/exercicios/extensao-joelho-mini-band.ts`, com as peças do núcleo sentado na cadeira (`quadril-sentado-na-cadeira.ts`: o assento, as mãos, o pé no chão; sem mudança) e a faixa nos tornozelos (`lacoNasCanelas`, ver a conferência da abdução deitado com mini-band). Regras medidas: `regras/extensao-joelho-mini-band.ts` (três, com o nome do exercício), a `mini-band-nos-tornozelos` e a `extensao-joelho-caneleira-coxa-parada` da caneleira aprovada (serve como está).
- Quadros grandes: `../quadros/extensao-joelho-mini-band.png`. Sem folha.

## Onde os números saem

A ficha da técnica não dá números; o cartão diz "sentado, costas apoiadas", "um pé fica no chão, segurando a mini-band", "do pé perto do outro até a perna reta". A cadeira, as mãos e o pé parado são os da extensão com caneleira aprovada (fonte `aprovada`). O que é novo:

- **As costas apoiadas não são um ângulo escolhido:** o tronco deita para trás até a pele das costas, na altura da tábua do encosto da cadeira (medidas da IKEA da tabela), encostar nela (0 cm). Com o quadril a 29 cm da borda (o glúteo no fundo do assento) e a lombar 10° menos curva que em pé (sentado e encostado, a bacia enrola), o peito fica deitado 12,9° para trás, perto da inclinação do próprio encosto (10,5°). Com a lombar de quem está em pé, o tronco precisava deitar 23° para a lombar chegar à tábua, e a cabeça ia parar na parede.
- **O pescoço compensa 70% da inclinação** (escolha de desenho): a cabeça fica quase de pé e o olhar quase na horizontal.
- **Sem a parede atrás da cadeira:** o cartão não a pede (a caneleira pedia "encostada na parede"), e com as costas deitadas a cabeça chegava nela.
- **A perna reta em cima: 2°** (a ficha: "até a perna ficar reta"; na caneleira aprovada, "quase esticado", 10°).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado, costas e quadril apoiados | consenso | o glúteo e a coxa a −1 cm do tampo (amassam 1 cm); as costas a 0 cm da tábua do encosto; o peito deitado 12,9°; a base do pescoço anda 0 cm | sim |
| Cadeira firme | consenso | a cadeira da tabela (IKEA STEFAN: assento a 45,1 cm); o corpo entra no máximo 1 cm no tampo (o estofado do glúteo; tolerância 2,5) | sim |
| Mini-band em volta dos tornozelos | consenso | o meio da faixa a 7,0 cm do centro de cada tornozelo, o ciclo todo; a borda de baixo a 4,5 cm | sim |
| Um pé fica no chão, segurando a mini-band | consenso | o pé esquerdo chapado (bola e calcanhar a 0 cm do chão), parado (0 cm) | sim |
| A coxa que trabalha fica parada | consenso | a coxa gira 0° e o joelho anda 0 cm | sim |
| Início: joelho dobrado, pé perto do outro | consenso | o joelho a 85°; os tornozelos a 23,2 cm um do outro; o pé que sobe a 4,6 cm do chão | sim |
| Fim: perna estendida, até ficar reta | consenso | o joelho a 2° | sim |
| A faixa estica | consenso | de 1,1 vez (começo) a 2,3 vezes (perna reta); o máximo do fabricante é 2,5 | sim |
| ~1 s subindo, pausa curta, ~2 s descendo | consenso | 1 s, 0,6 s, 2 s | sim |

**Conferência automática: 0 falha, 2 avisos.** (1) O elástico no primeiro quadro (o pé perto do outro) está 1,1 vez esticado, e a regra geral espera o mais esticado ali; aqui o primeiro quadro é o menos esticado. (2) As linhas de desenho (o lugar do quadril no assento, a largura dos pés, o joelho do pé parado, o quanto o glúteo amassa, as mãos, a lombar sentada, o pescoço, o pé).

O ritmo aparece como "sem movimento" na conferência: ela acompanha o quadril, a cabeça, as mãos, o cotovelo e o joelho, e só a canela se move (igual à caneleira aprovada).

## As vistas

**De três quartos** (a primeira, a que o app abre): a perna que estende, a faixa entre os tornozelos e o encosto atrás das costas. **De lado** (a segunda, e a dos erros): o ângulo do joelho. De lado, o tronco esconde o encosto inteiro e as costas pareciam deitadas no ar; por isso a primeira vista é a de três quartos. Músculos: de lado 357 cm² (a padrão do modo Músculos, por medida), de três quartos 323 cm².

## Erros

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Levantar o quadril da cadeira | de lado | o quadril sobe 6 cm do assento e vai 4 cm para a frente; o tronco deita mais 8°, com as costas escorregando no encosto (o cartão: "o corpo ajuda"); a faixa chega a 2,50 vezes |
| Não estender até o fim | de lado | a perna para com o joelho dobrado 40° (a faixa: 1,7 vez) |

**Não desenhado:** "Parar longe da falha" ("com o elástico, a série só conta perto da falha"): é esforço, sem consequência visível na pose. Fica fora da ficha (quem integra põe a exceção em `SEM_DESENHO`).

## O equipamento

- **Cadeira firme:** a peça aprovada (`pecas-de-cena/cadeira.ts`), como cenário atrás do corpo, sem a parede.
- **Mini-band:** a da tabela, nos tornozelos (`lacoNasCanelas`): as canelas ficam longe de paralelas (uma vertical, a outra subindo até a horizontal), e cada uma é cortada na perpendicular dela.

## Correções já feitas que esta animação respeita

Não há correção registrada para este id. Da extensão com caneleira: a coxa parada no assento; a perna livre com o pé fora do chão embaixo. Da abdução com mini-band: a faixa afina ao esticar.

## O que não ficou bom

- **No começo, os dois rótulos ("a perna parada segura" e "estique até o fim") apontam para os dois pés, que estão juntos**: os fios quase se sobrepõem no quadro do começo. Separam-se quando a perna sobe.
- **O erro de levantar o quadril** chega a 2,50 vezes de faixa (o máximo do fabricante, sem passar).
- **De lado, o encosto não aparece** (o tronco o cobre): é o motivo de a primeira vista ser a de três quartos.

## Correção de 19/11 (auditoria)

A auditoria das fases A e B (M5) achou que as linhas dos dois rótulos ("a perna parada segura" e "estique até o fim") se cruzam, de três quartos e de lado: cada texto ficava ao lado do ponto do outro, e "a perna parada segura" parecia apontar para o pé que sobe. Os pontos estavam certos (`ponta:L` e `ponta:R`). A animação saiu da aprovação até a correção.

**A causa.** O motor põe os rótulos na ordem da ficha, cada um o mais perto possível da altura média do seu ponto. O primeiro era "estique até o fim", cujo ponto (o pé que sobe) fica, em média, no meio da altura: ele ficava com o lugar do meio. O segundo, "a perna parada segura", tem o ponto embaixo (o pé no chão), mas o lugar de baixo já cruzava o primeiro, e ele ia para cima.

**A mudança.** Só a ordem dos rótulos na ficha, nas duas vistas: "a perna parada segura" vem primeiro e fica com o lugar de baixo, ao lado do pé parado; "estique até o fim" vai para cima, ao lado do pé que sobe. Os textos, os pontos, o selo e a fonte são os mesmos. O enquadramento não mudou (o preparo é o mesmo).

**A regra nova** (comum, `rotulos-sem-linhas-cruzadas`, em `regras/vistas-do-guia.ts`, ligada só nesta ficha): em cada vista do exercício com dois rótulos ou mais, em 24 instantes do ciclo, desenha o quadro como o guia (o enquadramento do guia, o desenho cinza) e confere, segmento a segmento, que as linhas dos rótulos não se cruzam.

| | antes (`1828c0e`) | depois |
|---|---|---|
| de três quartos: instantes com as linhas cruzadas | **16 de 24** | 0 de 24 |
| de lado: instantes com as linhas cruzadas | **8 de 24** | 0 de 24 |

Rodada no estado de antes (a ficha de `1828c0e`, com a regra nova), a conferência dá **1 falha** (esta regra). No estado novo: **0 falhas**, os mesmos avisos de antes.

**Olhado nos quadros** (`quadros/extensao-joelho-mini-band.png`): de três quartos e de lado, no começo, no meio e no fim, "a perna parada segura" fica embaixo, com a linha até o pé no chão, e "estique até o fim" em cima, com a linha até o pé que sobe.

**O que ainda não ficou bom.** No começo do ciclo, com os dois pés juntos embaixo, as duas linhas chegam quase paralelas a pontos a poucos centímetros um do outro: não se cruzam, mas ficam muito perto.

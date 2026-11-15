# Lote 1 · Búlgaro com o pé de trás na suspensão (`bulgaro-suspensao`)

De 15/11/2026. Feito sobre o núcleo dos búlgaros (`bulgaro-base.ts`), com o corpo do búlgaro aprovado e as mãos na cintura. O que muda: o peito do pé de trás fica no berço da alça de uma fita de suspensão, de costas para a âncora, e **o pé não fica parado**: ele pende da âncora e anda para trás num arco enquanto o quadril desce, com a fita sempre do mesmo comprimento. Ainda não está ligado às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/bulgaro-suspensao.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/bulgaro-suspensao.json`.
- Animação: `src/engine/novo/exercicios/bulgaro-suspensao.ts` (`criarBulgaro(ficha, 'cintura', 'fita')`).
- Regras medidas novas: `src/engine/novo/regras/bulgaros.ts` (`peito-do-pe-na-alca`, `alca-no-meio-da-canela`, `pe-de-tras-vai-com-a-fita`).
- Peça de cena nova, reutilizável (remada, rosca, tríceps, flexão de joelho...): `src/engine/novo/pecas-de-cena/suspensao.ts`, com as medidas em `src/engine/novo/dados/objetos/suspensao.json`.
- Folha ao lado da de hoje: `../prototipos/folha-bulgaro-suspensao.png`. Quadros grandes: `../quadros/bulgaro-suspensao.png`.

## Como a fita foi montada

1. **A âncora** fica a 182,9 cm do chão: é a altura que o fabricante chama de ideal para todos os exercícios ("about six feet", página da TRX). A animação de hoje usa 205 cm, escolha de desenho; com 183, a âncora cabe no quadro sem encolher o corpo.
2. **O comprimento da fita** sai da montagem que a ficha pede, "alça na altura do meio da canela": pendurada, o fundo do berço fica no meio da canela do corpo (28,3 cm; o fabricante dá 8 a 12 pol, 20,3 a 30,5 cm). Da âncora ao fundo do berço: 182,9 − 28,3 = 154,7 cm.
3. **No exercício**, o fundo do berço fica sempre a 154,7 cm da âncora. Em cima, ele está 4 cm à frente da vertical da âncora; na descida anda 8 cm para trás (como na animação de hoje) e termina 4 cm atrás dela. Como o arco é simétrico, a altura quase não muda (28,3 cm). O tornozelo vai junto: o peito do pé apoia no berço como apoiaria no banco (a mesma inclinação, que sai da forma do pé do Boneco).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| De costas para a âncora, peito do pé de trás na alça, cadarço para baixo | consenso | a âncora fica atrás da pessoa; o peito do pé fica a no máximo 0,1 cm do fundo do berço, de sola para cima, o ciclo inteiro | sim |
| Alça na altura do meio da canela | consenso | o fundo do berço fica a 28,3 cm do chão (o meio da canela do corpo: 28,3; o fabricante: 20,3 a 30,5) | sim |
| A fita não estica | (física) | da âncora ao fundo do berço: 154,6 a 154,7 cm no ciclo (limite: 0,3 cm de variação) | sim |
| Descida: o pé de trás vai para trás com a fita | consenso | o pé de trás anda 8 cm para trás e 0 cm para cima, no arco | sim |
| Pé da frente longe o bastante para o calcanhar ficar no chão embaixo | consenso | calcanhar e bola do pé da frente a 0 cm do chão; embaixo, o joelho da frente fica 1,3 cm atrás do tornozelo | sim |
| Tronco levemente à frente, peso na perna da frente, mãos na cintura | consenso | peito 16° para a frente; centro de massa a 60 a 64% do caminho do tornozelo de trás ao da frente; mãos na cintura | sim |
| Em cima: joelho da frente quase estendido | consenso | 14° | sim |
| Descida em ~2 a 3 s, reta | consenso | 2,3 s; o quadril desce de 78 para 47 cm sem ir para a frente nem para trás (0 cm) | sim |
| Amplitude: coxa da frente perto da horizontal | consenso | 3,1° abaixo da horizontal | sim |
| Joelho de trás em direção ao chão | consenso | a pele do joelho de trás fica a 4 cm do chão (o centro a 9 cm), como no aprovado | sim |
| Subida em ~1 a 1,5 s, empurrando com o pé da frente; o pé de trás só acompanha | consenso | 1,3 s, pelo mesmo caminho; o pé de trás volta pelo mesmo arco | sim |

Com o pé de trás mais baixo que no banco (o tornozelo a 31,7 cm, contra 46,9 no banco), o joelho de trás chega aos 4 cm do chão com o quadril mais alto: 47 cm, contra 42 no aprovado. Por isso a coxa da frente para mais perto da horizontal (3°) e o joelho da frente dobra menos (91°, contra 98°).

Conferência automática: **0 falha, 3 avisos**: a **flexão plantar do tornozelo de trás chega a 73° em cima** (média 57°, máximo observado 90°); as linhas da ficha de movimento que são escolha de desenho (as distâncias dos pés, iguais às do aprovado; onde o berço fica em relação à âncora; quanto o pé anda; o raio de onde se procura o ponto de apoio do peito do pé; a altura das mãos); e a vista de frente, que não serve ao modo Músculos (a vista padrão é a de lado). Ritmo suave (salto de 9,3%). O corpo não atravessa nenhuma peça (a fita não é medida contra o corpo: ver abaixo).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Joelho da frente para dentro (de frente) | o joelho da frente cai 7,2 cm para dentro, sem cruzar o meio do corpo (fica a 1,1 cm dele) |
| Empurrar com o pé de trás (de lado) | a perna de trás empurra a alça 14 cm mais para trás (o berço sobe 1 cm, no arco; a fita continua com 154,6 cm); o quadril recua 9 cm e para a 53 cm, 6 acima do certo (como na animação de hoje); o centro de massa recua 9 cm (sai de 8,4 cm à frente do quadril certo para 0,7 cm atrás), o peso indo para o pé de trás |
| Descer pouco (de lado) | o quadril para a 64 cm (o certo: 47) e o pé de trás anda só 3,8 cm |

## O equipamento

- **Fita de suspensão** (peça nova, num arquivo só, para os outros exercícios de suspensão): um trecho da viga (o "ponto firme" da montagem segura; tamanho de desenho), a ponta da fita de ancoragem (5,1 cm de largura, da ficha da TRX), o mosquetão, a fita, a fivela de ajuste (na cor de ação, como no cartão de hoje), o pegador de mão e o berço do pé logo abaixo dele. A peça aceita um ou dois pegadores, de mão ou de pé, e devolve o comprimento de cada fita para `fios` (`estica: false`); `alturaNaFita` acha a altura de um pegador pendurado.
- **Medidas provisórias** (a página do fabricante não traz): largura da fita (3,8 cm), mosquetão (10 cm), pegador (14 × 3,5 cm), berço do pé (9 cm de largura, 6 cm abaixo do pegador).

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- A fita não estica (04/11): aqui ela varia 0,1 cm (hoje: 2,4 cm, a falha listada no diagnóstico).
- Os adutores da perna da frente entram no desenho (04/11, "pela lista `LISTA`"): respeitada.
- "O corpo fica pequeno por causa da âncora" (proposta 4 da Fable): a âncora desceu de 205 para 183 cm (a altura do fabricante), e o corpo ocupa mais do quadro.

## O que não ficou bom

- **A flexão plantar do tornozelo de trás vai a 73° em cima** (aviso): o pé fica deitado no berço com a mesma inclinação do banco, mas, como o berço é bem mais baixo que o banco, a canela de trás fica quase horizontal em cima. Na fita real o pé gira no berço; aqui ele não gira. Seria a próxima correção (deixar o pé girar em volta do ponto de apoio).
- **O pé de trás fica baixo** (o tornozelo a 32 cm): é o que a ficha pede (alça no meio da canela) e o que a animação de hoje mostra, mas lê menos como "búlgaro" que o banco ou a cadeira.
- **A fita sobe do peito do pé passando pelo tornozelo:** de verdade, os dois lados do berço sobem um de cada lado do pé; o desenho tem uma fita só, no meio, e o motor não mede a fita contra o corpo. De lado, ela cruza o tornozelo por cima do desenho.
- **O pegador e o berço do pé quase não aparecem de lado** (o pegador fica de ponta); de frente, a fita é uma faixa preta larga atrás da cabeça.
- **No tema escuro, a fita quase some** (o preto da borracha clareado ainda fica perto do fundo).
- **O erro "empurrar com o pé de trás"** é a mesma ideia da animação de hoje (14 cm, 9 cm, 6 cm), não uma medida.
- A viga do alto é desenho, sem medida.

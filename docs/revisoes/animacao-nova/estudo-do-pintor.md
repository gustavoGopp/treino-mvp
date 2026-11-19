# Estudo do pintor: ordem por pares (19/11/2026)

**Atualização da etapa 2 (19/11): o pintor está ligado em 5 animações**, à espera do ok do Gustavo ([Etapa 2 (19/11)](#etapa-2-1911), no fim). **Estudo de viabilidade.** Atualização de 19/11, depois da decisão do Gustavo ("pode seguir com o pintor novo em etapas"): a etapa 1 (baixar o custo e medir no celular) está em [Etapa 1 (19/11)](#etapa-1-1911), no fim; o protótipo virou o pintor pronto para ligar, com o mesmo resultado, e continua desligado em todas as animações. O resto do texto é o estudo como foi feito, com o protótipo (os números de tempo e de pacote dele são os de antes da etapa 1).

O protótipo (`src/engine/novo/pintor-por-pares.ts`) está desligado e o app não o importa (conferido pelo grafo do pacote de `app.ts` e `ponte.ts`); a conferência da pintura (`conferir-pintura.ts`) ganhou um parâmetro opcional para medir com ele, e sem esse parâmetro dá o mesmo resultado de antes, achado por achado. `node scripts/animacao-nova/preparo.mjs conferir` passa e `npm run check` passa. As medidas saem de `node scripts/animacao-nova/estudo-do-pintor.mjs` (os passos estão no topo do script).

## Resumo

- **A proposta:** em vez de uma profundidade só por item, o pintor olha cada par (parte do Boneco, peça) que se cruza na tela e mede, numa grade de 1 cm, qual dos dois está mesmo na frente. A ordem final respeita essas relações e, onde nada obriga, é a de hoje. Quando um item do Boneco está na frente de uma peça num pedaço e atrás em outro, o que devia ficar por cima é pintado de novo só naquele pedaço (um recorte). O desenho de cada item não muda: o mesmo SVG, o mesmo contorno único, as mesmas cores.
- **O que resolve:** a área pintada do jeito errado cai de 41.458 cm² para 1.266 cm² (−97%). Dos 2.213 achados de pintura de hoje, 1.949 somem e 134 aparecem (pequenos: 361 cm² somados, o maior com 25 cm²). As animações com achado de pintura caem de 97 para 54; em 47 delas, todo achado que sobra tem menos de 10 cm².
- **O que muda no que foi aprovado:** 105 das 171 animações mudam de desenho em algum quadro medido; em 63 a mudança passa de 1% da figura num quadro. Das 105, 94 são animações com achado (a mudança é o conserto); 11 não tinham achado (só uma passa de 1%: o `supino-reto` de lado, a perna que passa a ficar na frente da ponta do banco).
- **O custo:** 2,3× o tempo de montar um quadro na mediana (de 2,3 para 5,1 ms no computador), e até 11× nas máquinas grandes (até 26 ms); o SVG cresce 2% em média (até 2,9× num caso). No pacote, +6,0 kB comprimidos, com 10,1 kB de folga hoje no orçamento de 285 kB.
- **As correções por exercício** (`vies`, `viesNaVista`, `dz`) passariam quase todas a sobrar: sem nenhuma delas, o pintor por pares deixa 1.642 cm² (hoje, sem elas, seriam 77.034 cm²). Ainda ajudam em 10 animações e atrapalham pouco em 3.
- **Recomendação:** seguir com o pintor por pares, mas não ligar de uma vez. Antes, baixar o custo nas máquinas e medir no celular; depois, ligar por animação, com a folha de antes e depois para o Gustavo, começando pelas 97 que têm achado. Detalhes no fim.

## O problema

`pintar` (em `desenho.ts`) ordena itens inteiros pela camada e por uma profundidade só: cada sólido do gerador realista pela profundidade do meio dele (mais o `dz`); cada grupo do Boneco (o corpo com as pernas de perto, cada braço, cada membro de longe) pela média das partes (mais o `vies`). Um colchonete de 1,8 m tem o meio perto de quem olha, de três quartos, e vai por cima do tronco deitado nele (`triceps-testa-halteres`); os braços do voador têm o meio atrás do tronco e vão para baixo dele, mas passam na frente dos antebraços (`voador`, de frente). Cada caso era corrigido no exercício com `vies` e `dz`, um por um.

## A proposta (o protótipo)

O pintor por pares recebe os mesmos itens que o app pinta hoje (o Boneco de `desenharBoneco` e o equipamento de `equipamentoRealista`) e muda só a ordem da camada 1 (o corpo e as peças). As outras camadas (o chão, o cenário, o fantasma do erro, os rótulos) ficam como estão.

1. **Cada item em 3D.** O item do Boneco sabe que partes pinta (no protótipo, achadas pelo caminho do preenchimento de cada parte, como na conferência; o lado de longe pela classe `lg`). O item da peça tem a forma 3D que o gerador já guarda (`g3`, desde 19/11).
2. **Pares.** Numa grade de 1 cm na tela, só onde há corpo e peça, para cada par (item do Boneco, item de peça): onde os dois cobrem o mesmo ponto, qual está mais perto de quem olha, com 1 cm de tolerância. O contato não decide nada (como na conferência): o ponto que fica escondido encostado no outro, ou dentro dele (a pele que afunda no assento, o corpo deitado no banco), não conta; nem a mão contra a peça que segura. Um lado decide com pelo menos 1 cm² e o outro com menos que isso; com os dois acima, vale o maior, e o menor vira remendo.
3. **A ordem.** Uma ordenação topológica dessas regras. Entre os itens que podem sair, sai primeiro o que sai primeiro hoje: dois itens que não se cruzam na tela trocam de lugar sem mudar nada no desenho, e onde nada obriga a ordem é a de hoje. Ficam fixos na ordem de hoje: o Boneco entre si (o braço de perto por cima do tronco é desenho aprovado), as peças entre si quando se cruzam na tela, os detalhes sem forma 3D (furos, presos à peça deles) e as peças empurradas para trás de propósito (50 cm ou mais, como as pontas da barra longa, `pontasAtras`; a de cenário já está noutra camada). Um ciclo (raro de verdade; quase todos são regras sem peso) é desfeito largando a regra de menor área, que vira remendo.
4. **Remendos.** Quando a ordem única serve a um pedaço e não ao outro, o item que devia ficar por cima é pintado de novo logo depois do outro, recortado (`clipPath`, ou `mask` quando há o que tirar) à região dos trechos do corpo em que ele está na frente. O trecho é o casco de dois anéis vizinhos de uma parte, com 1,5 cm de folga para o traço do contorno caber inteiro. Saem do recorte os trechos do mesmo corpo em que vale a ordem de antes (de cima, a cabeça cobre os pés: o halter, por cima dos pés, não pode ir por cima da cabeça) e o que foi pintado entre os dois e devia ficar por cima. Como o item é pintado de novo inteiro, recortado, o contorno único do corpo continua um só.

**Ideias consideradas e deixadas de lado.** Quebrar a peça comprida em pedaços com profundidade própria: cada pedaço teria o seu contorno, e a peça ganharia emendas (o estilo da peça muda). Quebrar o corpo em itens por parte: perde o contorno único aprovado (a coxa sai do quadril sem emenda); o remendo recortado faz o mesmo trabalho sem emenda. Uma profundidade só por item, tirada do ponto mais perto ou mais longe: continua sendo um número por item, e não resolve o corpo que fica na frente de uma ponta da peça e atrás da outra (não medi). Uma grade de 2 cm: mais rápida, mas deixa o dobro da área errada (2.497 cm², numa versão anterior do protótipo em que a de 1 cm deixava 1.254).

**Variante rejeitada: o contato também decide.** Deixa um pouco menos área errada (1.227 cm²), mas muda mais desenho e erra feio onde o corpo afunda na peça: no `supino-inclinado` de lado, o encosto passava a ser pintado por cima da cabeça e do tronco (a cabeça, mais estreita que o encosto, afunda nele no modelo 3D). Os números dela estão abaixo, para comparar.

## Como medi

- **A conferência** é a de `conferir-pintura.ts` (grade de 0,5 cm, as mesmas tolerâncias, os mesmos quadros: 6 do ciclo e 3 de cada erro, em cada vista, 5.148 quadros e vistas). Com o pintor de estudo, "o que o pintor põe por cima" sai da lista dele: a posição de cada item e, nos remendos, só dentro do recorte. "O que está mesmo na frente" não muda. Os achados contam como na conferência (uma parte do corpo contra uma peça, num quadro e numa vista, com pelo menos 1 cm²; fora as peças de cenário ou empurradas de propósito).
- **O desenho:** os mesmos quadros, montados pelo `svgDaCena` dos dois pintores (o do estudo entra só no pacote do script, que troca o pintor da cena). SVG igual = nada muda; SVG diferente = os dois desenhados no Chromium a 480 × 360 e comparados pixel a pixel (muda o pixel com algum canal mais de 8 em 255 diferente), sobre os pixels da figura (o que não é fundo). Cinza, tema claro.
- **O tempo:** `svgDaCena` em 24 quadros do ciclo, na vista que o app abre, três voltas depois de uma de aquecimento, em cada uma das 171, nos dois pintores, nesta máquina (4 núcleos, com outros processos). O celular é mais lento; a proporção é o que conta.
- **O tamanho:** o motor das cenas (`cena.ts` e o que ele puxa) empacotado e comprimido, com e sem o pintor por pares.
- **Contagem:** as listas de 19/11 (`aprovados.ts` de hoje): 90 aprovadas antes de 17/11, 77 desde 17/11 e 4 em revisão. O relatório da conferência fala em 91 animações com achado porque soma fios e pesos (que o pintor não toca) e usava as listas de antes; aqui só a pintura: 97 animações.

## Os números

### A conferência e o desenho

As colunas "com achado" contam animações; "somem" e "aparecem" contam achados; "desenho muda" conta animações com algum pixel diferente em algum quadro medido. Tabelas geradas por `node scripts/animacao-nova/estudo-do-pintor.mjs resumo`.

#### A proposta: ordem por pares e remendos

| grupo | animações | com achado hoje | com achado, só pares | com achado, pares e remendos | achados hoje | somem | aparecem | área hoje (cm²) | área depois (cm²) | desenho muda | muda 1% ou mais da figura |
|---|---|---|---|---|---|---|---|---|---|---|---|
| aprovadas antes de 17/11 | 90 | 43 | 24 | 20 | 864 | 789 | 56 | 20.408 | 272 | 51 | 33 |
| aprovadas desde 17/11 | 77 | 51 | 38 | 31 | 1277 | 1095 | 72 | 20.149 | 902 | 51 | 27 |
| em revisão | 4 | 3 | 3 | 3 | 72 | 65 | 6 | 902 | 92 | 3 | 3 |
| total | 171 | 97 | 65 | 54 | 2213 | 1949 | 134 | 41.458 | 1.266 | 105 | 63 |

Nas 74 animações sem achado hoje, o desenho muda em 11 (em 1, 1% ou mais da figura num quadro).

<details><summary>Por animação (ordem por pares e remendos)</summary>

| animação | grupo | achados hoje | só pares | pares e remendos | somem | aparecem | cm² hoje | cm² depois | quadros que mudam | pior quadro (fração da figura) | vistas que mudam (pior) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `abdominal-declinado` | aprovadas desde 17/11 | 105 | 90 | 1 | 105 | 1 | 1.833 | 1 | 16 de 30 | 2,8% | quina 2,8%, lateral 0,09% |
| `abdominal-maquina` | aprovadas desde 17/11 | 31 | 10 | 2 | 30 | 1 | 205 | 2 | 12 de 24 | 1,1% | quina 1,1% |
| `abdominal-polia` | aprovadas antes de 17/11 | 48 | 10 | 10 | 38 | 0 | 517 | 22 | 12 de 24 | 0,7% | quina 0,7% |
| `abducao-caneleira` | aprovadas antes de 17/11 | 42 | 17 | 3 | 41 | 2 | 357 | 38 | 31 de 33 | 3,7% | quina 3,7%, cima 2,5%, frontal 1,9% |
| `abducao-deitado-mini-band` | aprovadas desde 17/11 | 15 | 2 | 2 | 13 | 0 | 48 | 4 | 19 de 33 | 1,1% | quina 1,1%, frontal 0,5%, cima 0,5% |
| `abducao-elastico` | aprovadas desde 17/11 | 34 | 4 | 4 | 30 | 0 | 140 | 8 | 24 de 24 | 0,4% | posterior 0,4%, frontal 0,2% |
| `abducao-maquina` | aprovadas desde 17/11 | 17 | 0 | 0 | 17 | 0 | 143 | 0 | 8 de 45 | 1,0% | frontal 1,0% |
| `abducao-mini-band` | aprovadas antes de 17/11 | 1 | 0 | 0 | 1 | 0 | 1 | 0 | 8 de 45 | 0,1% | lateral 0,1%, quina 0,06% |
| `abducao-polia` | aprovadas desde 17/11 | 15 | 1 | 1 | 14 | 0 | 107 | 1 | 9 de 24 | 1,2% | posterior 1,2% |
| `abertura-elastico` | aprovadas desde 17/11 | 3 | 3 | 3 | 0 | 0 | 36 | 36 | 0 de 33 | 0,00% |  |
| `aducao-caneleira` | aprovadas antes de 17/11 | 14 | 11 | 5 | 10 | 1 | 77 | 10 | 11 de 30 | 2,4% | cima 2,4% |
| `aducao-maquina` | aprovadas desde 17/11 | 28 | 0 | 0 | 28 | 0 | 841 | 0 | 14 de 24 | 1,4% | cima 1,4%, frontal 0,5% |
| `afundo-kettlebell` | aprovadas antes de 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 de 30 | 0,8% | lateral 0,8% |
| `agachamento-elastico` | aprovadas antes de 17/11 | 43 | 2 | 2 | 41 | 0 | 267 | 2 | 12 de 30 | 2,7% | frontal 2,7% |
| `barra-fixa-graviton` | aprovadas desde 17/11 | 8 | 0 | 0 | 8 | 0 | 265 | 0 | 4 de 24 | 0,7% | quinaTras 0,7% |
| `barra-fixa-negativa` | aprovadas desde 17/11 | 2 | 0 | 0 | 2 | 0 | 140 | 0 | 1 de 30 | 1,4% | quina 1,4% |
| `bulgaro-suspensao` | aprovadas antes de 17/11 | 5 | 0 | 0 | 5 | 0 | 50 | 0 | 5 de 30 | 0,4% | frontal 0,4% |
| `cadeira-extensora` | aprovadas desde 17/11 | 15 | 15 | 10 | 5 | 0 | 277 | 31 | 8 de 36 | 0,2% | quina 0,2% |
| `caminhada-lateral-mini-band` | aprovadas desde 17/11 | 48 | 42 | 42 | 6 | 0 | 85 | 65 | 8 de 45 | 0,3% | frontal 0,3%, quinaTras 0,2%, quina 0,1% |
| `coice-caneleira` | em revisão | 21 | 9 | 7 | 19 | 5 | 191 | 82 | 14 de 27 | 3,0% | posterior 3,0%, quina 2,4%, lateral 2,3% |
| `coice-elastico` | em revisão | 28 | 6 | 5 | 24 | 1 | 312 | 8 | 14 de 27 | 3,6% | posterior 3,6%, quinaTras 1,1%, lateral 0,7% |
| `coice-maquina` | em revisão | 23 | 1 | 1 | 22 | 0 | 399 | 2 | 13 de 27 | 1,3% | quina 1,3%, posterior 0,2% |
| `coice-polia` | aprovadas desde 17/11 | 27 | 4 | 2 | 25 | 0 | 62 | 3 | 23 de 30 | 1,1% | lateral 1,1%, quinaTras 1,1% |
| `crucifixo-elastico` | aprovadas antes de 17/11 | 11 | 17 | 16 | 3 | 8 | 22 | 22 | 3 de 42 | 0,2% | cima 0,2%, frontal 0,08% |
| `crucifixo-halteres` | aprovadas desde 17/11 | 0 | 18 | 0 | 0 | 0 | 0 | 0 | 18 de 45 | 0,4% | quina 0,4% |
| `crucifixo-inclinado-halteres` | aprovadas desde 17/11 | 45 | 6 | 6 | 42 | 3 | 776 | 15 | 18 de 33 | 2,4% | quina 2,4%, lateral 0,02% |
| `crucifixo-inverso` | aprovadas desde 17/11 | 16 | 16 | 0 | 16 | 0 | 129 | 0 | 4 de 30 | 1,3% | posterior 1,3% |
| `crucifixo-invertido-caneleira` | aprovadas desde 17/11 | 15 | 15 | 15 | 0 | 0 | 61 | 39 | 1 de 24 | 0,3% | quinaTras 0,3% |
| `crucifixo-polia` | aprovadas antes de 17/11 | 19 | 1 | 1 | 18 | 0 | 47 | 2 | 11 de 33 | 1,2% | cima 1,2%, lateral 0,2%, frontal 0,09% |
| `crucifixo-polia-baixo` | aprovadas desde 17/11 | 14 | 0 | 0 | 14 | 0 | 52 | 0 | 8 de 30 | 0,3% | frontal 0,3%, lateral 0,2% |
| `desenvolvimento` | aprovadas antes de 17/11 | 14 | 14 | 14 | 0 | 0 | 15 | 15 | 1 de 33 | 1,9% | frontal 1,9% |
| `desenvolvimento-barra` | aprovadas desde 17/11 | 8 | 0 | 0 | 8 | 0 | 88 | 0 | 4 de 30 | 1,3% | frontal 1,3% |
| `desenvolvimento-elastico` | aprovadas antes de 17/11 | 11 | 0 | 0 | 11 | 0 | 36 | 0 | 16 de 33 | 2,7% | cima 2,7%, frontal 0,8%, lateral 0,7% |
| `desenvolvimento-unilateral-kettlebell` | aprovadas antes de 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 4 de 30 | 0,4% | frontal 0,4% |
| `elevacao-halteres` | aprovadas antes de 17/11 | 16 | 16 | 1 | 16 | 1 | 116 | 1 | 5 de 33 | 7,5% | cima 7,5%, frontal 3,7% |
| `elevacao-lateral` | aprovadas antes de 17/11 | 20 | 16 | 10 | 17 | 7 | 84 | 29 | 12 de 33 | 2,3% | cima 2,3%, lateral 1,2%, frontal 0,7% |
| `elevacao-lateral-caneleira` | aprovadas desde 17/11 | 31 | 25 | 25 | 6 | 0 | 75 | 58 | 8 de 27 | 1,8% | frontal 1,8%, lateral 1,2% |
| `elevacao-lateral-elastico` | aprovadas antes de 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 de 33 | 0,6% | frontal 0,6% |
| `elevacao-lateral-unilateral-elastico` | aprovadas desde 17/11 | 15 | 1 | 1 | 14 | 0 | 73 | 2 | 9 de 33 | 0,8% | frontal 0,8%, cima 0,3% |
| `extensao-joelho-caneleira` | aprovadas antes de 17/11 | 18 | 14 | 2 | 16 | 0 | 187 | 3 | 17 de 30 | 1,7% | lateral 1,7%, quina 1,4% |
| `extensao-joelho-elastico` | aprovadas antes de 17/11 | 14 | 8 | 3 | 11 | 0 | 59 | 5 | 21 de 30 | 0,2% | quina 0,2%, lateral 0,2% |
| `extensao-joelho-mini-band` | aprovadas desde 17/11 | 9 | 1 | 1 | 8 | 0 | 19 | 1 | 11 de 24 | 0,3% | lateral 0,3%, quina 0,05% |
| `extensao-triceps-peso-corpo` | aprovadas antes de 17/11 | 3 | 0 | 0 | 3 | 0 | 47 | 0 | 3 de 30 | 0,5% | cima 0,5% |
| `face-pull-elastico` | aprovadas antes de 17/11 | 2 | 0 | 0 | 2 | 0 | 7 | 0 | 1 de 33 | 2,8% | cima 2,8% |
| `face-pull-suspensao` | aprovadas desde 17/11 | 2 | 1 | 1 | 1 | 0 | 7 | 1 | 1 de 30 | 0,2% | quinaTras 0,2% |
| `flexao-bola` | aprovadas antes de 17/11 | 15 | 1 | 0 | 15 | 0 | 258 | 0 | 15 de 30 | 1,8% | quina 1,8% |
| `flexao-elastico` | aprovadas antes de 17/11 | 37 | 12 | 9 | 30 | 2 | 343 | 12 | 22 de 36 | 2,5% | cima 2,5%, lateral 0,9% |
| `flexao-joelho-deslizante` | aprovadas antes de 17/11 | 38 | 0 | 0 | 38 | 0 | 599 | 0 | 15 de 30 | 4,4% | quina 4,4% |
| `flexao-joelho-elastico` | aprovadas antes de 17/11 | 38 | 4 | 3 | 35 | 0 | 557 | 4 | 26 de 30 | 2,0% | cima 2,0%, lateral 0,2% |
| `flexao-pes-elevados` | aprovadas antes de 17/11 | 32 | 0 | 0 | 32 | 0 | 1.088 | 0 | 8 de 30 | 3,9% | cima 3,9% |
| `goblet` | aprovadas antes de 17/11 | 5 | 7 | 7 | 4 | 6 | 36 | 11 | 3 de 30 | 3,8% | frontal 3,8%, lateral 2,3% |
| `hack` | aprovadas desde 17/11 | 90 | 36 | 0 | 90 | 0 | 437 | 0 | 36 de 36 | 1,8% | frontal 1,8%, lateral 0,09% |
| `hip-thrust` | aprovadas desde 17/11 | 38 | 24 | 18 | 38 | 18 | 616 | 73 | 18 de 36 | 1,7% | quina 1,7% |
| `hiperextensao` | aprovadas desde 17/11 | 48 | 14 | 13 | 47 | 12 | 1.149 | 13 | 24 de 24 | 3,7% | quina 3,7%, lateral 0,1% |
| `mesa-flexora` | aprovadas desde 17/11 | 12 | 2 | 2 | 10 | 0 | 442 | 84 | 4 de 24 | 2,4% | cima 2,4% |
| `nordico` | aprovadas antes de 17/11 | 39 | 26 | 0 | 39 | 0 | 1.783 | 0 | 12 de 24 | 1,5% | quina 1,5% |
| `panturrilha-em-pe-maquina` | aprovadas desde 17/11 | 23 | 24 | 24 | 1 | 2 | 197 | 217 | 1 de 24 | 0,6% | quinaTras 0,6% |
| `panturrilha-sentada` | aprovadas desde 17/11 | 5 | 3 | 3 | 2 | 0 | 99 | 5 | 1 de 24 | 1,0% | quina 1,0% |
| `panturrilha-sentada-halter` | aprovadas antes de 17/11 | 31 | 8 | 4 | 27 | 0 | 92 | 4 | 15 de 30 | 1,8% | quina 1,8% |
| `ponte-kettlebell` | aprovadas antes de 17/11 | 7 | 20 | 9 | 2 | 4 | 249 | 25 | 7 de 30 | 1,6% | quina 1,6%, lateral 0,3% |
| `ponte-pes-bola` | aprovadas antes de 17/11 | 14 | 1 | 1 | 13 | 0 | 49 | 3 | 13 de 30 | 0,3% | quina 0,3% |
| `pull-through` | aprovadas desde 17/11 | 1 | 1 | 1 | 0 | 0 | 3 | 3 | 0 de 30 | 0,00% |  |
| `puxada-barra-reta` | aprovadas desde 17/11 | 45 | 0 | 0 | 45 | 0 | 2.183 | 0 | 15 de 30 | 1,1% | quinaTras 1,1% |
| `puxada-frente` | aprovadas desde 17/11 | 19 | 14 | 10 | 19 | 10 | 48 | 13 | 29 de 30 | 1,7% | lateral 1,7%, quinaTras 0,5% |
| `puxada-unilateral` | aprovadas antes de 17/11 | 43 | 0 | 0 | 43 | 0 | 2.101 | 0 | 15 de 30 | 1,0% | quinaTras 1,0% |
| `remada-apoiada` | aprovadas antes de 17/11 | 8 | 8 | 0 | 8 | 0 | 103 | 0 | 3 de 33 | 1,6% | posterior 1,6% |
| `remada-curvada-elastico` | aprovadas desde 17/11 | 25 | 13 | 13 | 17 | 5 | 212 | 22 | 10 de 30 | 2,7% | quinaTras 2,7% |
| `remada-curvada-halteres` | aprovadas antes de 17/11 | 5 | 0 | 0 | 5 | 0 | 36 | 0 | 5 de 39 | 1,1% | posterior 1,1%, quinaTras 0,5% |
| `remada-unilateral` | aprovadas antes de 17/11 | 76 | 15 | 0 | 76 | 0 | 6.892 | 0 | 15 de 30 | 9,9% | quinaTras 9,9% |
| `remada-unilateral-elastico` | aprovadas desde 17/11 | 36 | 23 | 22 | 30 | 16 | 203 | 26 | 8 de 30 | 0,9% | quina 0,9%, lateral 0,03% |
| `remada-unilateral-kettlebell` | aprovadas antes de 17/11 | 16 | 0 | 0 | 16 | 0 | 1.236 | 0 | 8 de 33 | 7,0% | quina 7,0% |
| `remada-unilateral-sem-banco` | aprovadas antes de 17/11 | 21 | 0 | 0 | 21 | 0 | 1.035 | 0 | 10 de 33 | 3,9% | quina 3,9% |
| `roda-abdominal` | aprovadas antes de 17/11 | 37 | 0 | 0 | 37 | 0 | 397 | 0 | 15 de 30 | 1,0% | quina 1,0% |
| `rosca-barra-w` | aprovadas desde 17/11 | 3 | 1 | 1 | 2 | 0 | 6 | 2 | 2 de 30 | 0,07% | quina 0,07% |
| `rosca-concentrada` | aprovadas desde 17/11 | 2 | 2 | 2 | 0 | 0 | 3 | 3 | 0 de 30 | 0,00% |  |
| `rosca-elastico` | aprovadas antes de 17/11 | 23 | 0 | 0 | 23 | 0 | 153 | 0 | 6 de 30 | 2,5% | frontal 2,5% |
| `rosca-inclinada` | aprovadas antes de 17/11 | 60 | 0 | 0 | 60 | 0 | 906 | 0 | 15 de 30 | 2,3% | frontal 2,3% |
| `rosca-maquina` | aprovadas desde 17/11 | 34 | 20 | 0 | 34 | 0 | 296 | 0 | 12 de 24 | 0,9% | quina 0,9% |
| `rosca-martelo-elastico` | aprovadas desde 17/11 | 23 | 0 | 0 | 23 | 0 | 179 | 0 | 10 de 30 | 2,2% | frontal 2,2%, lateral 0,4% |
| `rosca-polia` | aprovadas antes de 17/11 | 5 | 0 | 0 | 5 | 0 | 22 | 0 | 5 de 24 | 0,1% | quina 0,1% |
| `rosca-polia-costas` | aprovadas desde 17/11 | 13 | 2 | 2 | 12 | 1 | 48 | 3 | 11 de 30 | 0,4% | lateral 0,4%, quina 0,2% |
| `rosca-scott` | aprovadas desde 17/11 | 67 | 48 | 12 | 55 | 0 | 430 | 130 | 30 de 30 | 1,3% | quina 1,3%, lateral 0,2% |
| `rosca-scott-banco-inclinado` | aprovadas desde 17/11 | 2 | 0 | 0 | 2 | 0 | 60 | 0 | 1 de 30 | 1,7% | quina 1,7% |
| `rosca-suspensao` | aprovadas antes de 17/11 | 2 | 0 | 0 | 2 | 0 | 24 | 0 | 1 de 30 | 2,3% | cima 2,3% |
| `stiff-elastico` | aprovadas antes de 17/11 | 15 | 15 | 15 | 10 | 10 | 102 | 26 | 15 de 30 | 1,8% | quinaTras 1,8% |
| `stiff-kettlebell` | aprovadas antes de 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 6 de 30 | 0,7% | lateral 0,7% |
| `stiff-unilateral` | aprovadas antes de 17/11 | 4 | 0 | 0 | 4 | 0 | 71 | 0 | 3 de 30 | 0,9% | quinaTras 0,9% |
| `supino-barra` | aprovadas desde 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 12 de 24 | 1,0% | lateral 1,0% |
| `supino-chao-halteres` | aprovadas desde 17/11 | 6 | 0 | 0 | 6 | 0 | 81 | 0 | 3 de 39 | 1,3% | frontal 1,3% |
| `supino-inclinado` | aprovadas antes de 17/11 | 0 | 15 | 15 | 0 | 15 | 0 | 40 | 15 de 30 | 0,01% | lateral 0,01% |
| `supino-inclinado-polia` | aprovadas desde 17/11 | 62 | 11 | 11 | 52 | 1 | 686 | 32 | 20 de 24 | 1,5% | quina 1,5%, cima 0,2% |
| `supino-polia` | aprovadas desde 17/11 | 36 | 14 | 0 | 36 | 0 | 182 | 0 | 20 de 24 | 0,4% | quinaTras 0,4%, cima 0,2% |
| `supino-reto` | aprovadas antes de 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 15 de 30 | 1,3% | lateral 1,3% |
| `supino-smith` | aprovadas desde 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 12 de 24 | 0,5% | lateral 0,5% |
| `terra-hexagonal` | aprovadas desde 17/11 | 2 | 0 | 0 | 2 | 0 | 68 | 0 | 2 de 30 | 0,6% | quina 0,6% |
| `terra-romeno-barra` | aprovadas desde 17/11 | 5 | 0 | 0 | 5 | 0 | 173 | 0 | 10 de 30 | 0,8% | quinaTras 0,8% |
| `triceps-barra-reta` | aprovadas desde 17/11 | 3 | 2 | 2 | 1 | 0 | 4 | 3 | 1 de 30 | 0,2% | posterior 0,2% |
| `triceps-elastico-acima` | aprovadas antes de 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 de 36 | 0,2% | frontal 0,2% |
| `triceps-elastico-alto` | aprovadas desde 17/11 | 3 | 0 | 0 | 3 | 0 | 42 | 0 | 1 de 24 | 0,3% | posterior 0,3% |
| `triceps-frances-halter` | aprovadas antes de 17/11 | 4 | 0 | 0 | 4 | 0 | 187 | 0 | 2 de 30 | 2,1% | frontal 2,1% |
| `triceps-frances-kettlebell` | aprovadas antes de 17/11 | 4 | 0 | 0 | 4 | 0 | 188 | 0 | 2 de 30 | 2,2% | frontal 2,2% |
| `triceps-frances-polia-unilateral` | aprovadas antes de 17/11 | 3 | 1 | 1 | 2 | 0 | 11 | 2 | 2 de 30 | 0,3% | frontal 0,3% |
| `triceps-maquina` | aprovadas desde 17/11 | 30 | 21 | 0 | 30 | 0 | 289 | 0 | 10 de 24 | 1,7% | quina 1,7% |
| `triceps-suspensao` | aprovadas antes de 17/11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 de 30 | 0,1% | quinaTras 0,1% |
| `triceps-testa-halteres` | aprovadas desde 17/11 | 90 | 2 | 0 | 90 | 0 | 4.133 | 0 | 15 de 36 | 9,2% | quina 9,2% |
| `voador` | aprovadas desde 17/11 | 34 | 6 | 2 | 34 | 2 | 1.864 | 8 | 13 de 33 | 3,8% | frontal 3,8%, quinaTras 0,9%, cima 0,07% |
| `voador-invertido` | aprovadas desde 17/11 | 17 | 0 | 0 | 17 | 0 | 560 | 0 | 18 de 33 | 2,3% | lateral 2,3%, cima 2,2% |
| `yt-suspensao` | aprovadas antes de 17/11 | 1 | 0 | 0 | 1 | 0 | 6 | 0 | 4 de 30 | 0,3% | lateral 0,3% |

</details>

#### A variante em que o contato também decide (rejeitada)

| grupo | animações | com achado hoje | com achado, só pares | com achado, pares e remendos | achados hoje | somem | aparecem | área hoje (cm²) | área depois (cm²) | desenho muda | muda 1% ou mais da figura |
|---|---|---|---|---|---|---|---|---|---|---|---|
| aprovadas antes de 17/11 | 90 | 43 | 23 | 16 | 864 | 773 | 22 | 20.408 | 505 | 57 | 36 |
| aprovadas desde 17/11 | 77 | 51 | 34 | 22 | 1277 | 1153 | 74 | 20.149 | 659 | 54 | 32 |
| em revisão | 4 | 3 | 2 | 3 | 72 | 62 | 9 | 902 | 63 | 3 | 3 |
| total | 171 | 97 | 59 | 41 | 2213 | 1988 | 105 | 41.458 | 1.227 | 114 | 71 |

Nas 74 animações sem achado hoje, o desenho muda em 18 (em 3, 1% ou mais da figura num quadro).

### As correções por exercício

O pintor por pares decide os pares (parte do Boneco, peça) pela geometria, então o `vies` e o `dz` deixam de pesar neles; continuam pesando na ordem do Boneco entre si e das peças entre si. Medi tirando o `vies` numérico de todos os quadros (ficam `cabeca` e `cabecaAParte`, que mudam o desenho, e não a ordem) e o `dz` de todas as peças (ficam os empurrões de 50 cm ou mais, que são escolha):

| | achados | área (cm²) |
|---|---|---|
| hoje, com as correções | 2.213 | 41.458 |
| hoje, sem as correções | 2.904 | 77.034 |
| por pares, com as correções | 398 | 1.266 |
| por pares, sem o `vies` | 445 | 1.515 |
| por pares, sem o `dz` pequeno | 421 | 1.394 |
| por pares, sem os dois | 467 | 1.642 |

Hoje, as correções tiram 35.576 cm² de erro; com o pintor por pares, só 376. Elas passam a sobrar quase sempre (há `vies` em 84 arquivos de exercício e `dz` em 48 arquivos de exercício e de peça). Ainda ajudam em 10: o `vies` em `abducao-maquina` (+176 cm² sem ele), `rosca-scott` (+29), `pull-through` (+39), `voador` e `goblet-kettlebell`; o `dz` em `abdominal-polia`, `elevacao-halteres`, `goblet-kettlebell`, `hack` (+32) e `voador` (+123). Atrapalham, pouco, em 3: sem o `dz`, somem achados em `crucifixo-elastico` (22 → 8 cm²), `hip-thrust` (73 → 48) e `hiperextensao`. Nenhuma correção precisa ser tirada para ligar o pintor; dá para limpá-las depois, uma a uma.

### O tempo, o tamanho e o SVG

| | hoje | por pares |
|---|---|---|
| montar um quadro (`svgDaCena`), média das 171 | 2,32 ms | 6,62 ms |
| mediana das 171 | 2,26 ms | 5,14 ms |
| 90% das animações abaixo de | 2,91 ms | 10,94 ms |
| a pior (`aducao-maquina`) | 2,4 ms | 26,1 ms |
| motor das cenas, comprimido | 104,7 kB | 110,7 kB (+6,0 kB) |
| tamanho médio do SVG de um quadro | 46,9 kB | 47,9 kB (+2%; o pior, `elevacao-lateral` de cima, 2,9×) |

Do acréscimo de tempo, 3,3 ms por quadro são a ordem em si e 1,4 ms são as marcas do protótipo (achar as partes de cada item comparando o texto dos caminhos e desenhar cada peça sozinha para saber de que peça é cada item), que numa ligação de verdade quase somem: o Boneco e o equipamento diriam isso ao montar os itens. As máquinas (muitas peças na frente do corpo) são as caras: `aducao-maquina` 26 ms, `abducao-maquina` 25, `supino-inclinado-polia` 22, `voador-invertido` 22, `crucifixo-inclinado-halteres` 20, `mesa-flexora` 19.

No app, o Worker do Boneco monta a volta inteira da animação a 30 quadros por segundo de animação, um quadro depois do outro (`boneco.worker.ts`), e o SVG pronto fica guardado da segunda volta em diante. Numa volta de 6 s (180 quadros), hoje são cerca de 0,4 s de conta nesta máquina; por pares, cerca de 0,9 s na mediana e 4,7 s na pior. Num celular médio, várias vezes mais lento, a primeira volta das máquinas não fica pronta a tempo. É o maior custo da proposta, e dá para baixar (ver "Quanto falta").

O orçamento de quem volta (`tests/e2e/orcamento.spec.ts`, rodado agora): 274,9 kB de 285. Os 6 kB do protótipo cabem; numa ligação de verdade devem ser uns 5 kB (sem o código de depuração e as marcas por texto).

## As imagens

Em [`estudo-do-pintor/`](estudo-do-pintor/): em cima, o pintor de hoje e o por pares; embaixo, os mesmos quadros com o que a conferência acha em magenta. Desenho cinza, tema claro, 600 × 450.

Os seis casos pedidos (o pior quadro de cada um na conferência de hoje):

- [`remada-unilateral-sem-banco`, três quartos, "Girar o tronco"](estudo-do-pintor/remada-unilateral-sem-banco-quina.png) (antiga; o caso do Gustavo): a coxa e o tronco deixam de ser pintados por cima do halter. 5 achados (168,8 cm²) → 0.
- [`remada-unilateral`, três quartos de trás](estudo-do-pintor/remada-unilateral-quinaTras.png) (antiga): o estofado deixa de cobrir a canela e o pé apoiados nele. 5 achados (460 cm²) → 0.
- [`puxada-unilateral`, três quartos de trás](estudo-do-pintor/puxada-unilateral-quinaTras.png) (antiga): o colchonete deixa de cobrir o pé de longe. 3 achados (140 cm²) → 0.
- [`voador`, de frente](estudo-do-pintor/voador-frontal.png) (sessão): os braços do voador, na frente dos antebraços, passam a aparecer por cima deles. 6 achados (356 cm²) → 0. É o caso em que a geometria certa pesa no desenho: as barras verticais cruzam os antebraços e o alto do peito; o Gustavo precisa dizer se prefere assim.
- [`triceps-testa-halteres`, três quartos](estudo-do-pintor/triceps-testa-halteres-quina.png) (sessão): o colchonete deixa de cobrir o tronco, a bacia e a coxa. 7 achados (288 cm²) → 0.
- [`panturrilha-sentada`, três quartos, "Impulso com o quadril"](estudo-do-pintor/panturrilha-sentada-quina.png) (sessão): a alavanca deixa de cobrir a coxa de longe. 2 achados (94 cm²) → 0.

Mais três, para os riscos:

- [`supino-reto`, de lado, "Cotovelos abertos a ~90°"](estudo-do-pintor/supino-reto-lateral.png): sem achado hoje, e o desenho muda (1,3% da figura): a perna de perto, que passa da ponta do banco, fica na frente dela. É o certo pela geometria, mas é mudança num desenho aprovado. O mesmo acontece no `supino-barra` e no `supino-smith`.
- [`rosca-scott`, três quartos, "Tirar o braço da almofada"](estudo-do-pintor/rosca-scott-quina.png): melhora (5 achados, 28,5 cm² → 0 neste quadro), mas no resto do ciclo sobram 130 cm², na linha em que o peito afunda na almofada.
- [`mesa-flexora`, de cima, "Rolo no lugar errado"](estudo-do-pintor/mesa-flexora-cima.png): o que não resolve: o rolo, encostado nos tornozelos, continua por cima dos pés (84 cm²). No contato o pintor não decide, e o rolo fica na ordem de hoje.

## Os riscos

1. **Muda desenho aprovado.** 105 animações mudam, 63 delas em mais de 1% da figura num quadro. Quase tudo é o conserto do que a conferência acha, mas cada uma precisa ser olhada: a mudança vale para todos os quadros do ciclo, nas duas vistas, nos erros e no modo Músculos. Onze animações sem achado também mudam, todas abaixo de 1% da figura menos o `supino-reto` (1,3%): a perna na ponta do banco nos supinos (`supino-reto`, `supino-barra`, `supino-smith`), e mudanças pequenas no `afundo-kettlebell`, `stiff-kettlebell`, `elevacao-lateral-elastico`, `crucifixo-halteres`, `desenvolvimento-unilateral-kettlebell`, `triceps-elastico-acima`, `triceps-suspensao` e `supino-inclinado`.
2. **A geometria certa nem sempre é a mais legível.** O `voador` de frente é o exemplo: com as barras na frente dos antebraços, o desenho fica mais carregado e o peito aparece menos no modo Músculos. Hoje o desenho escolhe esconder a máquina; o pintor por pares não escolhe, mede.
3. **Achados novos e o que sobra.** 134 achados novos, pequenos (361 cm² somados; 3 acima de 10 cm²: o maior, 25 cm², a almofada da `panturrilha-em-pe-maquina` sobre o pescoço, de três quartos de trás, e a caneleira sobre a canela na `abducao-caneleira`, 19 cm²). Sobram 398 achados em 54 animações, quase todos pequenos (348 abaixo de 5 cm²), na linha em que o corpo encosta ou afunda na peça: as caneleiras em volta da canela, o rolo da `mesa-flexora`, a almofada da `rosca-scott`, o `hip-thrust`. O remendo pelo casco do trecho é grosso para essas linhas; um recorte pela própria grade seria mais fino, com o custo de um recorte em degraus de 1 cm.
4. **Tempo no celular.** 2,3× na mediana e até 11× nas máquinas. Sem baixar isso, a primeira volta da animação das máquinas pode engasgar no celular.
5. **SVG maior e recortes.** O remendo repete o SVG inteiro do item recortado (o do corpo tem uns 20 kB): +2% em média, até 2,9×. Cada remendo é um `clipPath` ou uma `mask`, que custam mais para o navegador desenhar que um caminho simples.
6. **A conferência passa a depender do pintor.** Para medir o que o app pinta, ela precisa da mesma ordem (o parâmetro opcional já faz isso). Se o pintor e a conferência usarem a mesma geometria e a mesma tolerância, um erro comum aos dois (a forma 3D de uma peça errada, por exemplo) some dos dois ao mesmo tempo. A conferência continua medindo em grade mais fina (0,5 cm contra 1 cm) e com o contato pelo corpo inteiro, o que pega diferenças, mas não é uma medida independente.
7. **Peça sem forma 3D.** Item sem `g3` (furos, costuras, desenhos à mão sem `C.geo`) fica na ordem de hoje, preso à peça. Uma peça nova desenhada à mão sem `C.geo` não seria ordenada pela geometria.

O protótipo não usa `Math.random` nem o relógio, e a mesma entrada dá o mesmo SVG (os nomes dos recortes saem do conteúdo, como os do Boneco).

## Quanto falta para ligar de verdade

| o quê | quanto |
|---|---|
| O Boneco e o equipamento dizem, ao montar os itens, que partes cada um pinta e de que peça é (acréscimo opcional em `Item`), no lugar das marcas por texto do protótipo | meio dia |
| A geometria e a grade num módulo só, usado pelo pintor e pela conferência (hoje o protótipo copia o código da conferência) | meio dia |
| Velocidade: descartar logo os pares cuja faixa de profundidade não se sobrepõe, guardar a grade das peças paradas por vista (como o desenho delas já é guardado), conferir o contato só perto da peça; medir no Worker num celular médio | 1 a 2 dias |
| Testes do pintor (pares, ciclo, remendo, determinismo) e a regressão visual do motor (`tests/motor`) refeita | 1 dia |
| Ligar por animação (uma opção no `Exercicio`), com a folha de antes e depois de cada uma para o Gustavo (o script já faz as imagens) | meio dia, mais a revisão dele |
| O que sobra (54 animações): recorte mais fino na linha de contato, ou correção no exercício, como hoje | 1 a 2 dias |
| `como-fazer-uma-animacao.md` (seção 10) e a limpeza das correções que sobram, uma a uma, com a conferência | meio dia |

No total, uns 5 a 7 dias de trabalho, mais a revisão do Gustavo das animações que mudam.

## Recomendação

O pintor por pares resolve o problema na raiz: tira 97% da área pintada errada, zera 43 das 97 animações com achado e torna quase todas as correções por exercício desnecessárias, sem mudar o estilo do Boneco. Por isso eu recomendo seguir com ele, e não com mais correções caso a caso.

Mas não recomendo ligar agora, para todas, de uma vez, por três motivos: muda o desenho de 105 animações aprovadas (e o Gustavo precisa ver cada uma, porque a geometria certa às vezes é menos legível, como no `voador` de frente); custa até 11× o tempo do quadro nas máquinas, o que no celular pode fazer a primeira volta engasgar; e deixa 54 animações ainda com achado pequeno na linha de contato, que vão precisar de correção de qualquer jeito.

O caminho que eu proponho: primeiro baixar o custo e medir no celular (é a dúvida que mais pode derrubar a proposta); depois ligar por animação, com a folha de antes e depois, começando pelas 97 com achado, em que a mudança é o conserto. Nas 11 sem achado que mudam, o Gustavo decide se aceita (a perna na ponta do banco dos supinos está certa pela geometria). As correções por exercício ficam até cada animação ser ligada e revista.

Se a decisão for não mexer em nada aprovado, o protótipo ainda serve: como ferramenta da conferência, ele diz, para cada achado, qual ordem resolveria, o que deixa a correção por exercício mais rápida.


## Etapa 1 (19/11)

O Gustavo decidiu em 19/11: "pode seguir com o pintor novo em etapas". A etapa 1 é baixar o custo e medir no celular, sem mudar o desenho de nada que vai para o app; a etapa 2 é ligar o pintor animação por animação, com uma folha de antes e depois para ele aprovar. **O pintor continua desligado em todas as animações.**

### O que mudou no código

- **O pintor ficou pronto para ligar.** `src/engine/novo/pintor-por-pares.ts` deixou de ser o protótipo: o mesmo algoritmo, com menos conta. O que cada item é vem do próprio item (`Item.pp`, em `desenho.ts`): o Boneco diz, ao montar cada item, que partes ele pinta (`desenharBoneco`), e o equipamento realista diz de que peça é cada item (`equipamentoRealista`). Saíram as marcas de estudo (achar as partes comparando o texto dos caminhos e desenhar cada peça sozinha) e o código de depuração. O SVG do Boneco e do equipamento não muda: os campos novos não entram no desenho.
- **Ligar por animação: uma lista.** `src/engine/novo/pintor-ligado.ts` (`PINTOR_POR_PARES_LIGADO`, vazia). A cena (`cena.ts`) pinta por pares as animações da lista; fora dela, `pintar`, como hoje. A opção `pintor: 'hoje' | 'pares'` da cena passa por cima da lista, só para os scripts que comparam os dois.
- **O pintor fica fora do pacote até ser pedido.** O Worker do Boneco (`trabalhoBoneco.ts`) baixa o pintor junto com a primeira animação ligada e o entrega ao motor (`registrarPintorPorPares`, pela ponte); os scripts o recebem por `index.ts`. Uma animação ligada sem o pintor carregado dá erro, e não o desenho de hoje no lugar do aprovado.
- **A folha de antes e depois:** `node scripts/animacao-nova/folha-do-pintor.mjs <ids...>` (ou `--piores <n>`) grava `docs/revisoes/animacao-nova/pintor-por-pares/<id>.png`.
- A conferência da pintura (`conferir-pintura.ts`) recebe o pintor do mesmo jeito (`ordenar` e `remendoDe`); sem ele, nada muda. O script do estudo usa a opção da cena, no lugar do plugin que trocava o pintor no pacote.

### O mesmo resultado do protótipo

Conferido com o protótipo do estudo (o arquivo de antes da etapa 1, tirado do git) lado a lado com o pintor novo, nas 171 animações:

- **O desenho:** 17.329 quadros (em cada vista declarada, 24 quadros do ciclo no modo Técnica em cinza, 6 no modo Músculos em cor de pele e 2 no modo Trajetória no tema escuro; em cada erro, 6 quadros em cada vista, cinza e cor de pele alternados; e a miniatura). O SVG do pintor novo é igual ao do protótipo, caractere por caractere, nos 17.329. E o app de hoje (o pintor desligado) é igual ao de antes da etapa 1 nos 17.329.
- **A conferência:** nos quadros de sempre (`quadrosMedidos`), os achados com o pintor novo são os mesmos do protótipo, achado por achado (os mesmos que somem e aparecem, com a mesma área), e com o mesmo número de remendos; sem o pintor, os mesmos de antes.
- `node scripts/animacao-nova/preparo.mjs conferir` passa (171 exercícios, 155 calibrações; o preparo não mudou) e `npm run check` passa (915 testes).

Com o código de hoje (que mudou desde o estudo), a conferência de sempre dá: hoje, 2.166 achados de pintura em 94 animações, 38.902 cm²; por pares, só a ordem, 807 achados em 64 animações, 6.503 cm²; por pares, com os remendos, 391 achados em 53 animações, **1.248 cm² (−97%)**.

**Um defeito do protótipo, mantido de propósito.** No remendo, o recorte de cada trecho do corpo devia ter 1,5 cm de folga (`FOLGA_DO_RECORTE`), mas o protótipo fazia `.map(cascoT)`, e o `map` passa a posição na lista como folga: o primeiro trecho fica com 0 cm, o segundo com 1 cm, o terceiro com 2 cm. A etapa 1 não podia mudar o resultado, então o pintor novo faz o mesmo, com um aviso no código. Corrigir muda o desenho dos remendos com mais de um trecho (o traço do contorno na borda do recorte) e fica para a etapa 2, antes de ligar a primeira animação.

### O tempo no computador

`svgDaCena`, 24 quadros do ciclo na vista que o app abre, três voltas depois de uma de aquecimento, nas 171, os três pintores em seguida em cada animação (do mesmo jeito do passo `tempo` do script do estudo; o tema troca de um quadro para o outro, para medir a conta de cada quadro e não o que a cena guarda). Nesta máquina (4 núcleos, dividida com outras sessões: os números variam uns 10% de uma medida para outra).

| | hoje | protótipo | etapa 1 |
|---|---|---|---|
| média das 171 | 2,62 ms | 7,23 ms | 4,11 ms |
| mediana | 2,46 ms | 5,68 ms | 3,85 ms |
| 90% abaixo de | 3,28 ms | 12,92 ms | 5,76 ms |
| `abducao-maquina` | 2,4 ms | 28,6 ms | 7,0 ms |
| `aducao-maquina` | 2,7 ms | 26,3 ms | 6,8 ms |
| `supino-polia` | 3,1 ms | 20,6 ms | 7,1 ms |
| quanto custa a mais que hoje (mediana; pior animação) | | 2,3×; 13,5× | 1,6×; 3,8× |

O pintor somava de 2 a 26 ms por quadro; agora soma de 1 a 5 ms. De onde veio, sem mudar o resultado:

1. **As marcas** (1,4 ms por quadro no protótipo): o Boneco e o equipamento dizem o que cada item é ao montá-lo.
2. **O contato**, que era metade da conta nas máquinas: cada ponto escondido era conferido contra todos os trechos do corpo. Agora cada trecho entra só nos blocos de 4 × 4 células que a caixa dele alcança na tela; cada segmento entre dois anéis é conferido uma vez por ponto (os trechos vizinhos dividem segmentos), e a conta para no primeiro que encosta; a folga é calculada com `Math.sqrt` (5× mais rápido que `Math.hypot`) e, quando ela fica a menos de 0,000001 cm da tolerância, ou nos casos de borda, de novo com a conta exata do protótipo, então a resposta é sempre a dele; e o contato de uma célula de uma peça vale para todos os itens do corpo.
3. **As caixas antes da grade:** a peça cuja caixa não cruza a de nenhum item do corpo não é desenhada na grade; cada par só percorre as células em que as duas caixas se cruzam (na mesma ordem); os triângulos do corpo fora da grade, ou fora da caixa de todas as peças, não são desenhados.
4. A ordenação topológica conta as regras que faltam, em vez de refazer a lista a cada passo, e as grades usam uma memória reaproveitada de um quadro para o outro.
5. **A cena guarda o que pintou por pares** em cada ponto do movimento (o u arredondado a 1/400, como o quadro do movimento já é guardado), só para a animação que está na tela. Na volta que o Worker monta, um terço dos quadros ou mais repete um ponto já pintado (as pausas, e o começo e o fim do ciclo): `aducao-maquina`, 73 pontos diferentes em 126 quadros. Não entra na tabela acima, mas entra na medida do celular.

Ideias deixadas de lado: a grade mais grossa onde a decisão é clara e calcular os pares só quando a ordem pode mudar não dão, garantido, o mesmo resultado; a ordem calculada de antemão está abaixo.

### O tempo no celular

**Como medi.** O Worker do Boneco monta a volta inteira da animação, um quadro a cada 1/30 s do ciclo, e devolve a vez com `setTimeout(0)` entre um e outro (`boneco.worker.ts`); o guia mostra o quadro do instante, ou o último pronto antes dele (`Guia.tsx`). Medi esse mesmo laço (`ponte.quadroDoMotorNovo`, com o preparo do exercício carregado), no Chromium do Playwright (1.63.0), com a CPU limitada pelo CDP (`Emulation.setCPUThrottlingRate`). O Chromium não limita a CPU de um Worker ("Operation is only supported for pages, not workers"), então o laço roda na linha principal da página, que é limitada, cada medida numa página nova (o motor sem nada guardado, como na primeira vez que a pessoa abre a animação). **4×** é a taxa que o Lighthouse usa para o celular médio; **6×**, um celular de entrada. Modo Técnica, cinza, a primeira vista.

A animação anda a 30 quadros por segundo (33 ms por quadro). A primeira volta engasga quando um quadro fica pronto depois do instante em que devia aparecer (a animação começa quando o primeiro quadro chega): enquanto isso, a tela fica parada no último quadro pronto. Da segunda volta em diante, os quadros já estão prontos (o guia os guarda).

Com a CPU 4× mais lenta (celular médio):

| animação (ciclo) | hoje: 1º quadro, volta, quadros atrasados | protótipo | etapa 1 |
|---|---|---|---|
| `aducao-maquina` (4,2 s) | 138 ms, 2,1 s, nenhum | 456 ms, 11,8 s, 125 de 126 (até 7,1 s) | 265 ms, 3,3 s, nenhum |
| `abducao-maquina` (4,7 s) | 120 ms, 2,2 s, nenhum | 336 ms, 12,2 s, 140 de 141 (até 7,2 s) | 262 ms, 3,1 s, nenhum |
| `supino-polia` (4,4 s) | 177 ms, 2,6 s, nenhum | 293 ms, 8,2 s, 131 de 132 (até 3,6 s) | 289 ms, 4,1 s, 7 (até 23 ms) |
| `mesa-flexora` (4,4 s) | 166 ms, 3,0 s, 1 (1 ms) | 278 ms, 8,1 s, 131 de 132 (até 3,4 s) | 244 ms, 3,7 s, nenhum |
| `supino-inclinado-polia` (4,4 s) | 203 ms, 2,6 s, nenhum | | 336 ms, 3,6 s, nenhum |
| `voador-invertido` (5,0 s) | 161 ms, 2,4 s, nenhum | | 244 ms, 3,5 s, nenhum |
| `crucifixo-inclinado-halteres` (5,1 s) | 151 ms, 1,9 s, nenhum | | 237 ms, 3,3 s, nenhum |
| `goblet` (4,7 s) | 278 ms, 2,8 s, nenhum | 287 ms, 4,2 s, 6 (até 23 ms) | 255 ms, 3,0 s, nenhum |
| `supino-reto` (4,9 s) | 124 ms, 2,2 s, nenhum | 181 ms, 4,4 s, 32 (até 53 ms) | 207 ms, 2,7 s, nenhum |
| `rosca-elastico` (4,2 s) | 217 ms, 2,3 s, nenhum | | 273 ms, 2,3 s, nenhum |
| `agachamento-elastico` (4,7 s) | 229 ms, 2,9 s, nenhum | | 342 ms, 3,6 s, nenhum |
| `remada-unilateral` (4,7 s) | 839 ms, 3,1 s, nenhum | | 758 ms, 3,1 s, nenhum |
| `flexao-bola` (4,1 s) | 274 ms, 2,5 s, nenhum | | 293 ms, 2,3 s, nenhum |

Num quadro que não repete um ponto já pintado, a conta passa de uns 10–16 ms para uns 22–28 ms nas máquinas (os 5% mais lentos: de 15–27 para 33–55 ms), contra os 33 ms de um quadro da animação; os quadros que repetem saem quase de graça, e a volta inteira fica pronta antes do fim do ciclo em todas as medidas. **No celular médio, a primeira volta não engasga** (o pior caso, `supino-polia`, tem 7 quadros até 23 ms atrasados, menos de um quadro). O protótipo engasgava feio nas máquinas: a primeira volta levava de 8 a 12 s num ciclo de 4,2 a 4,7 s. O primeiro quadro chega até 150 ms mais tarde que hoje (de 120–280 ms para 210–340 ms); o da `remada-unilateral`, o mais demorado hoje, não muda.

Com a CPU 6× mais lenta (celular de entrada):

| animação (ciclo) | hoje: volta, quadros atrasados | etapa 1 |
|---|---|---|
| `aducao-maquina` (4,2 s) | 2,8 s, nenhum | 4,4 s, 34 de 126 (até 372 ms) |
| `abducao-maquina` (4,7 s) | 3,0 s, 4 (até 7 ms) | 4,5 s, 39 de 141 (até 435 ms) |
| `supino-inclinado-polia` (4,4 s) | 3,4 s, 4 (até 7 ms) | 4,9 s, 65 de 132 (até 310 ms) |
| `voador-invertido` (5,0 s) | 3,1 s, nenhum | 5,0 s, 36 de 150 (até 430 ms) |
| `crucifixo-inclinado-halteres` (5,1 s) | 2,6 s, 3 (até 5 ms) | 4,9 s, 34 de 152 (até 298 ms) |
| `mesa-flexora` (4,4 s) | 4,1 s, 5 (até 16 ms) | 5,1 s, 97 de 132 (até 587 ms) |
| `supino-polia` (4,4 s) | 3,5 s, 9 (até 30 ms) | 5,0 s, 77 de 132 (até 402 ms) |
| `goblet` (4,7 s) | 3,7 s, nenhum | 4,0 s, nenhum |
| `supino-reto` (4,9 s) | 3,1 s, 3 (até 13 ms) | 3,9 s, nenhum |
| `agachamento-elastico` (4,7 s) | 3,7 s, 1 (1 ms) | 4,1 s, 17 (até 38 ms) |

**No celular de entrada, a primeira volta das máquinas engasga:** a animação fica parada por até meio segundo em alguns trechos, só na primeira volta (o primeiro quadro chega em 300 a 400 ms, contra 180 a 350 hoje). Nas leves, não. Se isso pesar, o passo seguinte é a ordem calculada de antemão (abaixo), só para as máquinas.

### A ordem calculada de antemão (avaliada, não feita)

As animações têm ciclo e erros fixos, então a ordem de pintura de cada quadro que o Worker monta poderia vir pronta no preparo (`dados/preparo/<id>.json`), e o celular só a leria. Medi o tamanho numa amostra de 19 animações (uma a cada nove, em ordem alfabética), para todas as combinações que o guia pode pedir (cada vista do guia, a técnica e cada erro nas vistas dele, cinza e cor de pele, que tem outra forma: o short e o tênis) e cada ponto diferente do movimento na volta de 30 quadros por segundo: a ordem (só quando muda) e cada remendo (de quem, depois de quem, os trechos do recorte). Por animação, em média, 39 kB (1,3 kB comprimidos), de 9 a 251 kB (até 8,4 kB comprimidos, na `abducao-elastico`); hoje o preparo de cada animação tem 0,5 kB comprimidos. Nas 171, cerca de 6,6 MB no repositório (hoje a pasta toda tem 752 kB) e 0,23 MB comprimidos, baixados um exercício por vez. No pacote do app, nada a mais (o pintor continuaria sendo baixado para o que não estiver guardado).

Cabe, mas não recomendo agora: o celular médio já não engasga; o preparo passaria a depender do arredondamento exato do tempo (o mesmo u, quadro a quadro), e qualquer mudança num exercício, no Boneco ou numa peça pede o preparo refeito e conferido; e o motor ainda precisaria do pintor para o que não estiver guardado (o quadro pausado num instante qualquer, o corpo da mulher). Fica como o plano B para o celular de entrada, só nas máquinas, se o Gustavo achar que o engasgo da primeira volta pesa.

### O pacote

O pintor tem 18,6 kB no build (8,1 kB comprimidos). Ligado direto na cena, ele entraria no pacote das miniaturas e passaria do orçamento de quem volta: medi 286,1 kB, com o limite em 285. Por isso ele é baixado à parte, só com uma animação ligada (`trabalhoBoneco.ts`).

| orçamento de quem volta (`tests/e2e/orcamento.spec.ts`, rodado agora) | kB comprimidos | arquivos |
|---|---|---|
| antes da etapa 1 | 277,8 | 38 |
| etapa 1 (pintor pronto e desligado) | 279,4 (+1,6) | 40 |
| limite | 285 | |

O acréscimo de 1,6 kB é o que o Boneco e o equipamento dizem de cada item, a lista, a carga do pintor e o que a cena guarda, mais dois arquivos pequenos que o build separou (o desenho, que o pintor também usa, e a lista). Quando a primeira animação for ligada, quem abrir o programa num dia com ela baixa mais 8 kB: hoje isso passaria do limite em uns 2,5 kB. A boas-vindas não muda (154,4 kB).

### As folhas de antes e depois

Em [`pintor-por-pares/`](pintor-por-pares/), as 6 animações com mais área pintada errada hoje, para o Gustavo ver como vai ser a etapa 2. Em cima de cada folha, a área pintada errada pela conferência inteira, hoje e por pares; depois, cada vista declarada no começo, no meio e no fim do movimento; e cada erro em que o desenho muda, no quadro em que mais muda. Em cada quadro: o de hoje, o por pares, o que muda (em magenta) e os achados da conferência naquele quadro.

| animação | hoje | por pares |
|---|---|---|
| [`remada-unilateral`](pintor-por-pares/remada-unilateral.png) | 6.892 cm², 76 achados | 0 |
| [`triceps-testa-halteres`](pintor-por-pares/triceps-testa-halteres.png) | 4.134 cm², 91 achados | 0 |
| [`puxada-barra-reta`](pintor-por-pares/puxada-barra-reta.png) | 2.183 cm², 45 achados | 0 |
| [`puxada-unilateral`](pintor-por-pares/puxada-unilateral.png) | 2.101 cm², 43 achados | 0 |
| [`voador`](pintor-por-pares/voador.png) | 1.864 cm², 34 achados | 8 cm², 2 achados |
| [`abdominal-declinado`](pintor-por-pares/abdominal-declinado.png) | 1.833 cm², 105 achados | 1 cm², 1 achado |

### O que falta para a etapa 2

| o quê | quanto |
|---|---|
| Corrigir a folga do recorte (o defeito do protótipo, acima) e conferir o que muda | meio dia |
| Testes do pintor (pares, ciclo, remendo, determinismo, o mesmo SVG com e sem o que a cena guarda) e a regressão visual do motor (`tests/motor`) para cada animação ligada | 1 dia |
| O orçamento: com a primeira animação ligada, o pacote de quem volta passa do limite em uns 2,5 kB (subir o limite, como em 16/11, ou baixar o motor, que está no backlog) | decisão do Gustavo |
| Ligar uma a uma: a folha de cada uma, a revisão do Gustavo, a lista, e tirar as correções por exercício que sobram (`vies`, `dz`), com a conferência | meio dia por lote, mais a revisão dele |
| As 53 animações em que ainda sobra achado pequeno, na linha de contato | 1 a 2 dias |
| Se o engasgo da primeira volta no celular de entrada pesar: a ordem de antemão, só nas máquinas | 1 a 2 dias |
| `como-fazer-uma-animacao.md` (seção 10) | uma hora |


## Etapa 2 (19/11)

O Gustavo decidiu em 19/11: "pode seguir com o pintor novo em etapas" e "pode subir o limite para 290 kB ou até mais se precisar". A etapa 2 liga o pintor de verdade, por animação. **O primeiro lote tem 5 animações ligadas, e não 6: o `voador` ficou de fora** (abaixo). As 5 esperam o ok do Gustavo pela [folha-resumo](pintor-por-pares/lote-1-resumo.png); a linha de base do motor (`tests/visual/linha-de-base/motor-novo.json`) **não foi regravada**, e o teste do motor (`tests/motor/motor-novo.spec.ts`) acusa as 5, como devia. Quem integra regrava depois do ok.

### O que mudou

- **A folga do recorte.** Cada trecho do recorte de um remendo tem agora os 1,5 cm de `FOLGA_DO_RECORTE` (o defeito do protótipo, mantido de propósito na etapa 1). Com o pintor ligado nas 171, a conferência da pintura **desce** de 1.250 para 1.219 cm² (−31 cm², −2,5%): de 392 para 377 achados, 19 somem e 4 aparecem (3 na `elevacao-lateral` e 1 no `coice-polia`, de 1 a 1,5 cm² cada), e as animações com achado caem de 53 para 52. O que mais melhora: a `hiperextensao` (13 → 1 cm²), o `voador` (7,5 → 4,3), o `abdominal-declinado` (1,3 → 0) e a `panturrilha-sentada-halter` (6,8 → 3,8). Nenhuma animação estava ligada, então o desenho do app não mudou com isso.
- **Os testes do pintor** (`tests/unit/pintor-por-pares.test.ts`, 7 casos pequenos, um tubo e caixas vistos de frente): dois itens que se cruzam na ordem certa e na errada (a tábua com o meio na frente e atrás do corpo onde os dois se cruzam), um remendo, a folga do recorte (o teste falha com o defeito de antes), o contato que não decide (e que decidiria se contasse), o cenário e a peça empurrada que não entram, e a ordem de hoje onde nada obriga.
- **A lista.** `src/engine/novo/pintor-ligado.ts` tem as 5 do lote 1.
- **A conferência mede o que o app pinta.** Nas animações ligadas, `medirPinturaEFios` (`conferir-pintura.ts`) mede a pintura com o pintor por pares; nas outras, com o de hoje. É o que `node scripts/animacao-nova/conferir.mjs` e a conferência de pintura passam a mostrar.
- **O teste do motor** entrega o pintor ao motor, como o Worker do app (sem isso, uma animação ligada dava erro no teste, e não a diferença).
- **A folha-resumo:** `folha-do-pintor.mjs <ids...> --resumo <arquivo.png>` grava, além da folha de cada uma, uma página com o pior quadro de cada animação (o quadro da folha com mais área pintada errada hoje), hoje × por pares. O script do estudo (`estudo-do-pintor.mjs`) passou a pedir o pintor de hoje de propósito nas comparações, porque o padrão de uma animação ligada é o por pares.
- **O orçamento** de quem volta (`tests/e2e/orcamento.spec.ts`) passou de 285 para 290 kB, com a decisão do Gustavo no comentário.

### O lote 1

As 6 com mais área pintada do jeito errado hoje, menos o `voador`. "Quadros que mudam" são os quadros que a conferência mede (6 do ciclo e 3 de cada erro, em cada vista), desenhados no Chromium a 480 × 360 e comparados pixel a pixel; "SVG que muda" conta, em 134 quadros de cada uma (12 tempos em cada vista e modo, cada erro, a cor de pele e a miniatura), os que deixam de ser iguais aos de hoje.

| animação | grupo | hoje | por pares | quadros que mudam | pior quadro (fração da figura) | SVG que muda |
|---|---|---|---|---|---|---|
| [`remada-unilateral`](pintor-por-pares/remada-unilateral.png) | aprovada antes de 17/11 | 6.892 cm², 76 achados | 0 | 15 de 30 | 9,8% (três quartos de trás: o estofado deixa de cobrir a canela e o pé) | 50 de 134 |
| [`triceps-testa-halteres`](pintor-por-pares/triceps-testa-halteres.png) | aprovada desde 17/11 | 4.134 cm², 91 achados | 0 | 15 de 36 | 9,2% (três quartos: o colchonete deixa de cobrir o tronco, a bacia e a coxa) | 62 de 134 |
| [`puxada-barra-reta`](pintor-por-pares/puxada-barra-reta.png) | aprovada desde 17/11 | 2.183 cm², 45 achados | 0 | 15 de 30 | 1,1% (três quartos de trás: o colchonete deixa de cobrir o pé) | 50 de 134 |
| [`puxada-unilateral`](pintor-por-pares/puxada-unilateral.png) | aprovada antes de 17/11 | 2.101 cm², 43 achados | 0 | 15 de 30 | 1,0% (idem) | 75 de 134 |
| [`abdominal-declinado`](pintor-por-pares/abdominal-declinado.png) | aprovada desde 17/11 | 1.833 cm², 105 achados | 0 | 16 de 30 | 3,1% (três quartos: o rolo dos pés) | 86 de 134 |
| **as 5** | | **17.143 cm², 360 achados** | **0** | | | |

- `node scripts/animacao-nova/conferir.mjs <id>`, em cada uma: 0 falha, e a pintura passa a ok (antes, aviso nas 2 aprovadas antes de 17/11 e falha nas 3 da sessão); os avisos que sobram são de amplitude, provisórios e músculos, os de antes. Achado por achado (a mesma parte, a mesma peça, a mesma vista, o mesmo quadro), nenhum aparece: todos os 360 somem.
- **As outras 166 não mudam de desenho:** o SVG de todas as 171, em 22.722 quadros (os 134 de cada uma, mais ou menos conforme as vistas e os erros), antes e depois da etapa 2, pela ponte, como o app pede: igual, caractere por caractere, nas 166 fora do lote (o `voador` incluído); muda só nas 5.
- **O `voador` ficou de fora.** Por pares, a área cai de 1.864 cm² (34 achados) para 4,3 cm², mas os 2 achados que sobram são novos: o estofado por cima da bacia, de três quartos de trás, no erro "Tirar as costas" (u = 0 e 0,5; 1,25 e 3 cm²). A causa: um ciclo na ordem. O corpo tem de ir antes de um braço de metal da máquina (que está na frente dele, 40 cm²), esse braço vai antes do estofado por uma corrente de três peças na ordem de hoje (peça com peça que se cruzam na tela, pela caixa, ficam na ordem de hoje), e o estofado tem de ir antes do corpo (o corpo está na frente dele, 14 cm²). O ciclo larga a regra mais fraca (14 cm²) e o estofado vai por cima do corpo; o remendo do corpo existe, mas o recorte dele tira o trecho do tronco que fica atrás do estofado, e o casco desse trecho cobre a bacia na tela. Conserto possível no pintor (fica para depois do lote 1): a ordem de peça com peça só onde as duas se cruzam de verdade (o contorno, e não a caixa) e o recorte pela grade de 1 cm, em vez do casco do trecho. A regra deste lote é a do pedido: nenhuma animação entra com achado novo.
- **O orçamento** de quem volta, rodado agora: **287,6 kB em 41 arquivos**, de 290 (na etapa 1, 279,4 kB em 40). A persona do teste abre um dia com uma animação ligada, e o pintor (8,1 kB comprimidos) vem junto. A boas-vindas não muda (154,4 kB).

### As correções por exercício que passam a sobrar nas 5

Medido com o pintor ligado, tirando uma correção de cada vez: a conferência inteira e o SVG por pares em 42 quadros de cada uma (12 do ciclo em cada vista, 3 de cada erro). **Nenhuma foi tirada**; é só a lista.

| animação | correção | sem ela, por pares | o desenho | sobra? |
|---|---|---|---|---|
| `triceps-testa-halteres` | `vies: { maoR: 1, maoL: 1 }` (`exercicios/triceps-testa-halteres.ts`) | 0 cm² | igual nos 42 | sim (já não mudava nada hoje) |
| `puxada-barra-reta` | `vies: { maoR: 1, maoL: 1 }` (`exercicios/puxada-barra-reta.ts`) | 0 cm² | igual nos 42 | sim (idem) |
| `puxada-unilateral` | `vies: { maoR: 1 }` (`exercicios/puxada-unilateral.ts`) | 0 cm² | igual nos 42 | sim (idem) |
| `abdominal-declinado` | `ATRAS = 40` (o `dz` da estrutura e do encosto, `pecas-de-cena/banco-declinado.ts`) | 0 cm² (hoje, sem ele, 1.851) | muda em 27 de 42 | não por inteiro: contra o corpo, sobra (o pintor decide pela geometria); mas ainda ordena a estrutura contra o encosto e o rolo (peça com peça, na ordem de hoje). Tirar só com a folha |
| `puxada-barra-reta` | `dz: 6` da barra (`pecas-de-cena/polia-braco-barra-reta.ts`) | 0 cm² | muda em 42 de 42 | não: ordena a barra contra a fita e o cabo (peça com peça) |
| todas | `dz: 6` dos pegadores e cabos (`equipamento.ts`: halter, estribo) | 0 cm² | muda | não: é a ordem das partes da própria peça, comum a todas as animações |

`remada-unilateral` e `abdominal-declinado` não têm `vies` nem `viesNaVista`; nenhuma das 5 tem `viesNaVista`. Nos 3 `vies` da mão, nem a conferência de hoje muda sem eles. No `voador` (fora do lote), o `vies` e o `viesNaVista` ainda pesam (sem eles, 8,3 cm² por pares, e o desenho muda em 21 de 42 quadros), e o `dz` também (127 cm²).

### Os próximos lotes

Pela área pintada do jeito errado hoje (a conferência de hoje, com a folga corrigida), só as animações em que, por pares, os achados de hoje só somem. Em cada lote, a área hoje → por pares.

| lote | animações | área |
|---|---|---|
| 2 (12) | `nordico`, `flexao-pes-elevados`, `rosca-inclinada`, `aducao-maquina`, `flexao-joelho-deslizante`, `voador-invertido`, `flexao-joelho-elastico`, `abdominal-polia`, `mesa-flexora`, `hack`, `rosca-scott`, `coice-maquina` | 8.557 → 241 cm² |
| 3 (12) | `roda-abdominal`, `rosca-maquina`, `triceps-maquina`, `cadeira-extensora`, `agachamento-elastico`, `barra-fixa-graviton`, `flexao-bola`, `triceps-frances-kettlebell`, `extensao-joelho-caneleira`, `triceps-frances-halter`, `supino-polia`, `rosca-martelo-elastico` | 2.971 → 32 cm² |
| 4 (13) | `terra-romeno-barra`, `rosca-elastico`, `abducao-maquina`, `abducao-elastico`, `barra-fixa-negativa`, `crucifixo-inverso`, `abducao-polia`, `remada-apoiada`, `coice-elastico`, `panturrilha-sentada`, `caminhada-lateral-mini-band`, `desenvolvimento-barra`, `supino-chao-halteres` | 1.537 → 85 cm² |
| 5 (13) | `panturrilha-sentada-halter`, `elevacao-lateral-caneleira`, `elevacao-lateral-unilateral-elastico`, `stiff-unilateral`, `terra-hexagonal`, `coice-polia`, `crucifixo-invertido-caneleira`, `rosca-scott-banco-inclinado`, `extensao-joelho-elastico`, `crucifixo-polia-baixo`, `bulgaro-suspensao`, `ponte-pes-bola`, `abducao-deitado-mini-band` | 806 → 116 cm² |
| 6 (15) | `extensao-triceps-peso-corpo`, `crucifixo-polia`, `triceps-elastico-alto`, `remada-curvada-halteres`, `desenvolvimento-elastico`, `rosca-suspensao`, `rosca-polia`, `extensao-joelho-mini-band`, `triceps-frances-polia-unilateral`, `face-pull-elastico`, `face-pull-suspensao`, `yt-suspensao`, `rosca-barra-w`, `triceps-barra-reta`, `abducao-mini-band` | 312 → 8 cm² |

- **Esperam o conserto do pintor (achado novo por pares), 20:** `voador` (1.864 cm² hoje; 2 novos), `hiperextensao` (1.149; 1), `crucifixo-inclinado-halteres` (776; 3), `supino-inclinado-polia` (686; 1), `hip-thrust` (616; 18), `abducao-caneleira` (357; 2), `flexao-elastico` (343; 2), `ponte-kettlebell` (249; 4), `remada-curvada-elastico` (212; 5), `abdominal-maquina` (205; 1), `remada-unilateral-elastico` (203; 16), `panturrilha-em-pe-maquina` (197; 2, e a área sobe para 217), `coice-caneleira` (171; 4), `elevacao-halteres` (116; 1), `stiff-elastico` (102; 10), `elevacao-lateral` (84; 7), `aducao-caneleira` (77; 1), `puxada-frente` (48; 10), `rosca-polia-costas` (48; 1), `crucifixo-elastico` (22; 8). Em 9 delas o novo tem 1,5 cm² ou menos; vale olhar se o conserto do ciclo e do recorte (o do `voador`) resolve a maioria antes de mexer uma a uma.
- **Não ganham nada (não ligar):** `abertura-elastico`, `desenvolvimento`, `pull-through` e `rosca-concentrada` (a mesma área por pares).
- **As 77 sem achado hoje** ficam desligadas; ligar só mudaria desenho aprovado (e daria achado novo no `supino-inclinado`, 40 cm², e no `afundo-kettlebell`, 7 cm²).
- **O celular de entrada:** o lote 2 tem 3 das máquinas em que a primeira volta engasga com a CPU 6× mais lenta (`aducao-maquina`, `voador-invertido`, `mesa-flexora`; ver "O tempo no celular"); o lote 3 tem o `supino-polia`, e o 4, a `abducao-maquina`. Se o Gustavo achar que o engasgo pesa, essas esperam a ordem de antemão.

### O que falta

| o quê | quanto |
|---|---|
| O ok do Gustavo no lote 1 (a folha-resumo) e a linha de base do motor regravada por quem integra | revisão dele |
| O conserto do ciclo e do recorte (o `voador` e as 20 que esperam) | 1 a 2 dias |
| Os lotes 2 a 6: a folha e a folha-resumo de cada um, a conferência de cada animação e a revisão do Gustavo | meio dia por lote, mais a revisão |
| Tirar as correções que sobram (os 3 `vies` da mão, acima), uma a uma, com a conferência | uma hora |

# Lote A5 · Rosca na polia baixa, de costas para a torre (`rosca-polia-costas`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, de costas para a torre, um passo à frente dela; polia embaixo, o estribo na mão direita. O braço fica parado 22° atrás da linha do tronco e só o antebraço dobra, da posição alongada (o braço quase estendido atrás do corpo) até a mão chegar perto do ombro. A mão esquerda pende solta. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-polia-costas.md`. Cartão do app: `src/conteudo/exercicios/rosca-polia-costas.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-polia-costas.json`.
- Animação: `src/engine/novo/exercicios/rosca-polia-costas.ts` (o corpo em pé, a coluna, o cabo e o estribo de `polia-bracos.ts`; o braço da rosca de `dobrar-o-cotovelo.ts`, com o antebraço em dobradiça como na rosca na polia). Regras novas: `src/engine/novo/regras/uma-torre.ts` (`rosca-costas-cotovelo-parado-atras`, `rosca-costas-mao-perto-do-ombro`, `rosca-costas-polia-embaixo-atras`).
- Quadros grandes: `../quadros/rosca-polia-costas.png`. Sem folha: o exercício não tinha animação.

## Onde os números saem

A ficha da técnica não dá número; ela segue, por analogia, a rosca na polia. Da ficha de movimento dela (aprovada) saem os pés, os joelhos destravados, o tronco reto, o pescoço, o ângulo de carregamento, a supinação, os tempos e o erro do cotovelo (fonte `rosca`). "Um passo à frente" é o passo da puxada unilateral (70 a 75 cm): a roldana 72 cm atrás do meio da pelve. O braço "um pouco atrás do corpo" ficou em 22°; ele abre 8° para o lado para o cabo, que sai da mão para trás e para baixo, passar por fora do quadril. A roldana fica atrás, na linha da mão (o cabo no plano do braço).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Polia embaixo, com o estribo | consenso | a roldana a 17,8 cm (o ponto mais baixo da coluna); o estribo da tabela na mão direita, o elo na linha do cabo | sim |
| De costas para a torre, um passo à frente | consenso | a roldana 72 cm atrás do meio da pelve e 64 cm atrás dos calcanhares | sim |
| O braço um pouco atrás do corpo, palma para a frente | consenso | o braço 22° atrás da linha do tronco (8,6° aberto para o lado), o ciclo todo; a palma para a frente (supinação de 90° a 91°) | sim |
| Dobra o cotovelo com o cotovelo parado atrás do corpo | consenso | o cotovelo anda 0 cm enquanto dobra de 12° a 142° | sim |
| Até a mão chegar perto do ombro | consenso | em cima, o centro da pegada a 21,3 cm do centro do ombro (11,2 cm abaixo dele, à frente) | sim |
| Desce (~2 s) até o braço quase estender, atrás do corpo | consenso | 2 s; embaixo, o cotovelo dobra 12°, a mão atrás do quadril | sim |
| Tronco parado | consenso | a base do pescoço anda 0 cm; o peito na vertical | sim |
| O cabo sai de trás do corpo, sem atravessá-lo; a pilha sobe | desenho | o cabo passa a no mínimo 4,3 cm da pele (do antebraço); anda 60,4 cm e a pilha sobe 30,2 cm (a relação 2:1); o cabo fica de 41° a 52° da vertical | sim |

**Conferência automática: 0 falha, 3 avisos.** (1) A supinação em 91° (a palma toda para a frente, como nas outras roscas; acima da média de 87,5°). (2) As linhas de desenho da ficha (`cervical`, `cabeca`, `braco.paraFora`, `antebraco.paraFora`, `pilha.folga`, `outro.braco`). (3) O antebraço aparece como "só ajuda", fora da lista do conteúdo (a mesma decisão das outras roscas, de 04/11).

## As vistas

**De lado** (padrão: o braço que trabalha fica do lado de quem olha; o cotovelo parado atrás do corpo, o antebraço que dobra, o cabo que sai de trás e a pilha) e **de três quartos de frente** (o braço atrás do tronco e a mão que chega ao ombro, com a coluna atrás; é a vista do erro de girar o tronco). De trás, o tronco esconde a mão no alto; de cima, o braço se perde atrás do ombro.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Trazer o cotovelo para a frente | de lado, em cima | enquanto a mão sobe, o braço sai de 22° atrás para 30° à frente da linha do tronco (o cotovelo anda 26 cm): perde a posição alongada |
| Girar o tronco | de três quartos, em cima | o tronco gira 26° (metade na lombar, metade na torácica) com a bacia e os pés parados; o ombro direito vai 5,6 cm à frente e a mão 9,6 cm |
| Carga demais | de lado, embaixo | a descrição do cartão diz a consequência ("se o ombro for para a frente, a carga está alta"): a clavícula vai 30° à frente e 8° para cima, e a torácica arredonda 8°; o ombro anda 5 cm à frente e 1,3 cm para cima, a série toda |

Nenhum erro ficou sem desenho.

## O equipamento

- **Coluna de polia:** a da tabela de objetos, cortada em cima a 150 cm (como na rosca na polia aprovada).
- **Estribo:** o da tabela (`estribo`), o mesmo da puxada e da remada unilateral.

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício. Das roscas: o antebraço "só ajuda" (04/11) e o braço que não se mexe.

## O que não ficou bom

- **O erro "Carga demais" é sutil:** o ombro anda 5 cm à frente. É o que a clavícula do Boneco deixa com 30° além do ritmo normal; de lado, a linha vermelha (base do pescoço, ombro, cotovelo) sai da tracejada, mas é preciso olhar. Tentei 22° (3 cm: quase não se via).
- **De lado, o fio do rótulo "cotovelo atrás do corpo"** atravessa o tronco: o cotovelo está atrás, e o lado de trás do quadro é da coluna, então o texto vai para a frente do corpo.
- **De lado, no fim, o cabo passa por cima do tronco na imagem** (ele está do lado de fora do corpo, a 4,3 cm do antebraço, mas o braço que trabalha é o de perto de quem olha).
- **Pés lado a lado:** o cartão não pede um pé à frente do outro; muita gente faz este exercício com um pé à frente para se equilibrar contra o cabo. A força do cabo não entra no equilíbrio (como em todas as animações na polia).

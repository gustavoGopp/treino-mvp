# Panturrilha sentada, com halter no joelho (`panturrilha-sentada-halter`)

Exercício acrescentado na auditoria independente de 04/11/2026 (`docs/revisoes/auditoria-fable.md`, Parte C). É a versão **sem máquina** da `panturrilha-sentada`. Ainda sem animação: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/panturrilha-sentada-halter.json`). A animação, quando entrar, parte da `extensao-joelho-caneleira` (mesmo corpo sentado) com o halter 3D sobre o joelho (custo P).

- **Equipamento:** halteres (`halteres`) e uma cadeira firme ou banco. Para a parte alongada, a ponta dos pés num apoio baixo (uma anilha, um livro grosso, um degrau); sem apoio, no chão, com a amplitude que o chão permite.
- **Função:** panturrilha sentada (complemento para o sóleo), **nível 2**, depois da máquina. Só entra quando pernas são prioridade e sobra tempo (modelos de dia em `src/domain/gerador/divisoes.ts`).
- **Efeito medido** (cópia): a vaga deixa de ficar vazia em 12 classes de cenário com halteres (casa, condomínio, só halteres, a Ana, o Bruno, anilhas e manoplas…). Nas personas, nada muda (o complemento só entra com pernas como prioridade e tempo sobrando).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado, joelhos a ~90°, pés na largura do quadril; o halter deitado sobre a coxa, perto do joelho, com uma toalha dobrada por baixo; as duas mãos segurando o halter | consenso | mesma lógica da `panturrilha-sentada`; `nsca2021` (não verificado) |
| Descida | Calcanhares descem até o alongamento máximo (mais se a ponta dos pés estiver num apoio); pausa ~1 s embaixo | um estudo (a pausa no alongado) | `kassiano2023b` |
| Subida | Sobe o calcanhar o máximo, sem o tronco levantar | consenso | `nsca2021` (não verificado) |
| Cadência | ~1 s subindo, 1 s embaixo, ~2 s descendo | consenso | `tempo.serie` |

## Por que assim
- Com o joelho dobrado, o gastrocnêmio quase não cresce (+1% a +2%) e o sóleo é o músculo mais treinado (`kinoshita2023`; **um estudo**). Por isso é **complemento**, nunca a única panturrilha da semana (`selecao.panturrilha-alongada`).
- A parte alongada rende mais (`kassiano2023b`; **um estudo**, na panturrilha em pé): daí a ponta dos pés num apoio, quando houver.
- Halter sobre o joelho ≈ máquina: o equipamento não decide (`haugen2023`; **robusta** para máquina = peso livre em geral; **consenso** para esta versão, sem ensaio).

## Erros comuns
1. **Amplitude curta** (`curta`).
2. **Levantar o tronco** para ajudar (`tronco`).
3. **Halter escorregando** da coxa (`halter`).

## Segurança
- **Montagem:** halter deitado sobre uma toalha dobrada, preso com as duas mãos a série inteira; cadeira firme, sem rodinhas; apoio dos pés que não escorrega (`seguranca.montagem`; consenso).
- **Articulação:** tornozelo. Dor de hoje acima de 5 no tornozelo tira o exercício.

## Músculos
Primário: panturrilha (sóleo). Selo: **um estudo** (`kinoshita2023`) para a posição sentada; **consenso** para a versão com halter.

## Como a carga sobe
Pela lista dos halteres (`progressao.incremento.halteres`): o próximo quando todas as séries chegarem ao topo da faixa; dois halteres (um em cada joelho) quando um só ficar leve. **Consenso.**

## Fontes
- `kinoshita2023`, `kassiano2023b`, `haugen2023`: já em `../fontes.md` (resumo-PubMed).
- `nsca2021`: **não verificado** (livro pago); consenso de treinadores.

## Leitura do texto completo (05/11/2026)
O sóleo cresceu **igual** em pé e sentado (+2,1% × +2,9%, p = 0,41; `kinoshita2023`). A versão sentada é variação; a em pé é a que faz a panturrilha crescer. O cartão passou a dizer isso.

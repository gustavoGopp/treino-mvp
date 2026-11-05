# Abdução de quadril deitado de lado, sem carga (`abducao-deitado`)

Exercício acrescentado na auditoria independente de 04/11/2026 (`docs/revisoes/auditoria-fable.md`, Parte C). É a versão **sem caneleira** da `abducao-caneleira` (aprovada em 04/11/2026): a mesma posição e o mesmo movimento, com o peso da própria perna. Ainda sem animação: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/abducao-deitado.json`). A animação, quando entrar, parte da `abducao-caneleira` sem a peça da caneleira (custo P, variação de pose).

- **Equipamento:** nenhum (só o chão; um colchonete ajuda).
- **Função:** abdução de quadril (complemento do glúteo), **nível 3**, depois da máquina e da polia (nível 1) e da caneleira e da mini-band (nível 2). Entra só quando nada disso existe, e só com glúteos como prioridade (`selecao.gluteo`; modelos de dia em `src/domain/gerador/divisoes.ts`).
- **Efeito medido** (`npm run auditoria:catalogo`, numa cópia): a vaga de abdução deixa de ficar vazia em 48 das 55 classes de cenário (casa, condomínio, só halteres, a Ana, o Bruno, o Diego, "nada marcado"). Nas personas, muda só a Ana (ver a auditoria).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Deitado de lado, cabeça no braço de baixo; perna de baixo dobrada para dar base; perna de cima estendida, um pouco atrás da linha do corpo | consenso | igual à `abducao-caneleira`; `nsca2021` (não verificado) |
| Quadril | Empilhado, sem rolar para trás; dedos apontando para a frente, não para o teto | consenso | `nsca2021` (não verificado) |
| Subida | Até onde a perna sobe sem o quadril rolar nem a cintura dobrar | consenso | **[opinião]** |
| Cadência | ~1 s subindo, 1 s parado, ~2 s descendo | consenso | `tempo.serie` |
| Repetições | 15 a 30 por série, perto da falha | robusta (carga baixa perto da falha cresce como carga alta, até ~30 repetições) | `schoenfeld2017b`, `lasevicius2018` |

## Por que assim
- A abdução de quadril cresceu o glúteo médio e o mínimo (+4%) num ensaio de 10 semanas na **polia** (`attarieh2026`; **um estudo**). É complemento da extensão de quadril, que cresceu mais o glúteo máximo (`selecao.gluteo`).
- Sem carga, a perna pesa pouco: a série precisa chegar perto da falha dentro de ~30 repetições para render (`reps.equivalencia-cargas`, **robusta**). Quem já treina deve chegar rápido ao fim da escada; o aviso sutil de fim de escada vale aqui (`equipamento.fim-da-escada`).
- Abdução na máquina ≈ polia ≈ elástico ≈ deitado é **consenso** (pesquisa-v2/11, B.2.1): nenhum ensaio comparou as versões, e nenhum mediu a versão sem carga.

## Erros comuns
1. **Rolar o quadril para trás** (`rola`).
2. **Levar a perna para a frente** (`frente`).
3. **Subir alto demais com tranco** (`alto`).

## Segurança
- Risco baixo: deitado, sem carga. Colchonete num chão que não escorrega (**consenso**).
- **Articulação:** quadril (como a `abducao-caneleira`). Dor de hoje acima de 5 no quadril tira o exercício.
- Dor articular aguda, formigamento ou perda de força incomum: parar e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: glúteos (médio, mínimo e a parte de cima do máximo). Sem secundário, como a `abducao-maquina` e a `abducao-caneleira`. Selo: **um estudo** para a abdução em geral (`attarieh2026`); **consenso** para a versão sem carga.

## Como a carga sobe
Peso do corpo, pela escada própria (`progressao.escada-por-exercicio`; `src/domain/progressao/escadas.json`): mais repetições até ~30 → pausa de 2 s no alto → descida de 3 s → pausa com descida lenta → 1,5 repetição. O app não sugere comprar caneleira (decisão do Gustavo, 03/11/2026); quem marcar caneleiras ou mini-band ganha a versão com carga pela própria vaga. **Consenso.**

## Referência visual
> Termo sugerido: "side lying hip abduction bodyweight".

## Fontes
- `attarieh2026`, `schoenfeld2017b`, `lasevicius2018`: já em `../fontes.md` (resumo-PubMed).
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago); referência de consenso de treinadores.

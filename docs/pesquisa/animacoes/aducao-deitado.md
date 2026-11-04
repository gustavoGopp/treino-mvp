# Adução de quadril deitado de lado, sem carga (`aducao-deitado`)

Exercício acrescentado na auditoria independente de 04/11/2026 (`docs/revisoes/auditoria-fable.md`, Parte C). É a versão **sem caneleira** da `aducao-caneleira` (aprovada em 04/11/2026). Ainda sem animação: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/aducao-deitado.json`). A animação, quando entrar, parte da `aducao-caneleira` sem a peça da caneleira (custo P).

- **Equipamento:** nenhum (só o chão; um colchonete ajuda).
- **Função:** adução de quadril (complemento, adutores sem meta própria), **nível 3**, depois da máquina (nível 1) e da caneleira (nível 2). Só entra quando pernas ou glúteos são prioridade e sobra tempo; sai primeiro nos cortes e nunca gera aviso (`selecao.aducao-complemento`).
- **Efeito medido** (cópia): a vaga de adução deixa de ficar vazia em 49 das 55 classes de cenário. Nas personas, nada muda (a Ana, única com pernas e glúteos como prioridade sem máquina, não tem tempo para o complemento).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Deitado de lado, cabeça no braço de baixo; perna de cima dobrada, com o pé no chão à frente da perna de baixo; perna de baixo estendida em linha com o corpo | consenso | igual à `aducao-caneleira`; `nsca2021` (não verificado) |
| Subida | A perna de baixo sobe num curso curto, só até onde o quadril fica parado | consenso | **[opinião]** |
| Descida | ~2 s, sem descansar a perna no chão entre as repetições | consenso | `tempo.serie` |
| Repetições | 15 a 30 por série, perto da falha | robusta (carga baixa perto da falha) | `schoenfeld2017b`, `lasevicius2018` |

## Por que assim
- Os adutores crescem com o agachamento profundo e o leg press (`kubo2019`, `kinoshita2026`; **um estudo** cada). A adução isolada é complemento, sem ensaio de hipertrofia (**consenso**; pesquisa-v2/11, B.2.1). A versão sem carga segue a mesma lógica da `aducao-caneleira`: tapa uma vaga que, sem máquina nem caneleira, ficava vazia em quase todo cenário.
- Curso curto e quadril parado: o movimento é pequeno por anatomia (a perna de baixo encontra o chão e a outra perna); forçar além faz o tronco girar (consenso de treinadores).

## Erros comuns
1. **Girar o tronco** para a perna subir mais (`gira`).
2. **Subir com tranco** (`tranco`).
3. **Descansar a perna no chão** entre as repetições (`descansa`).

## Segurança
- Risco baixo: deitado, sem carga. Colchonete num chão que não escorrega (**consenso**).
- **Articulação:** quadril. Dor de hoje acima de 5 no quadril tira o exercício. Dor na parte de dentro da coxa durante a série: parar (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: adutores (parte de dentro da coxa). Sem secundário, como a `aducao-maquina`. Selo: **consenso** (nenhum ensaio de adução isolada).

## Como a carga sobe
Peso do corpo, pela escada própria (`src/domain/progressao/escadas.json`): mais repetições até ~30 → pausa de 2 s no alto → descida de 3 s → pausa com descida lenta → 1,5 repetição. **Consenso.**

## Fontes
- `kubo2019`, `kinoshita2026`, `schoenfeld2017b`, `lasevicius2018`: já em `../fontes.md` (resumo-PubMed).
- `nsca2021`: **não verificado** (livro pago); consenso de treinadores.

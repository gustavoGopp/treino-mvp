# Extensão de joelho sentado, com elástico (`extensao-joelho-elastico`)

Exercício acrescentado na auditoria independente de 04/11/2026 (`docs/revisoes/auditoria-fable.md`, Parte C). É a versão **com elástico** da `extensao-joelho-caneleira` (aprovada em 04/11/2026): a mesma posição e o mesmo aviso honesto. Ainda sem animação: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/extensao-joelho-elastico.json`). A animação, quando entrar, parte da `extensao-joelho-caneleira` com a peça `band` presa atrás (as animações do elástico esperam o R4 do boneco).

- **Equipamento:** elásticos longos (`elasticos`) e uma cadeira firme ou banco; um ponto para prender o elástico atrás (o pé de trás da cadeira ou da mesa, uma porta com a trava). Sem onde prender: a alternativa no cartão é segurar a ponta do elástico sob o pé da perna que fica no chão.
- **Função:** extensora, o isolador obrigatório do quadríceps (`selecao.isolador-obrigatorio`), **nível 2**, ao lado da caneleira e depois da cadeira extensora.
- **Efeito medido** (cópia): a vaga da extensora deixa de ficar vazia em 6 classes de cenário com elástico (casa com halteres e elásticos, só elásticos, o Diego, step + elásticos, suspensão + elásticos, o Bruno). Nas personas, **o Bruno e o Diego ganham a extensão com elástico** nos dias de perna e perdem o aviso da extensora (antes × depois na auditoria).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Montagem | Elástico preso num ponto baixo atrás (pé de trás da cadeira ou da mesa, trava de porta), com a outra ponta no tornozelo (laço ou alça); cadeira firme, sem rodinhas | consenso | `seguranca.montagem`; `equipamento.caneleira` (mesma posição) |
| Posição | Sentado na beira do assento, costas retas, mãos na lateral; coxa apoiada; uma perna de cada vez | consenso | igual à `extensao-joelho-caneleira`; `nsca2021` (não verificado) |
| Subida | Estende o joelho até quase esticar, sem tranco; a coxa não sai do assento | consenso | mesma regra da `cadeira-extensora` |
| Pausa | ~1 s em cima, onde o elástico puxa mais | consenso | `consenso-projeto` (o elástico estica mais no fim) |
| Descida | ~2 s, controlada, sem deixar o elástico puxar a perna de volta | consenso | `tempo.serie` |

## Por que assim (e o aviso honesto)
- **A extensora cresce o reto femoral**, que o agachamento e o leg press quase não crescem (`kinoshita2026`, `kassiano2026`, `zabaletakorta2021`; **moderada**). Por isso a vaga é obrigatória quando dá.
- **O elástico, como a caneleira, carrega o lado curto do músculo:** puxa mais com o joelho esticado e quase nada com o joelho dobrado. É o contrário do que `selecao.alongado` prefere (`pedrosa2022`, **um estudo**). Se isso cresce o reto femoral, **ninguém testou** (`equipamento.caneleira`; **consenso**).
- O elástico tem uma vantagem sobre a caneleira: a carga sobe pelas intensidades (`progressao.escada-elastico`), então fica leve com menos frequência para quem já treina **[opinião]**.
- O gerador segue a mesma decisão do Gustavo de 04/11/2026 para a caneleira: a vaga vazia é pior que a extensora imperfeita com o aviso (`equipamento.caneleira`).

## Erros comuns
1. **Chutar a perna** com tranco (`tranco`).
2. **Tirar a coxa do assento** ou jogar o tronco para trás (`quadril`).
3. **Deixar o elástico puxar a perna de volta** (`cai`).

## Segurança
- **Montagem:** ponto de ancoragem firme e baixo, atrás da cadeira; elástico sem rasgo; cadeira firme, sem rodinhas (`seguranca.montagem`; consenso). Nunca prender em algo que possa tombar.
- **Articulação:** joelho. Dor de hoje acima de 5 no joelho tira o exercício. Dor na frente do joelho durante a série: parar antes do ponto que dói, ou parar (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: quadríceps (sobretudo o reto femoral). Sem secundário, como a `cadeira-extensora`. Selo: **moderada** para a extensora em geral; **consenso** para a versão com elástico.

## Como a carga sobe
Pelas intensidades do elástico (`progressao.escada-elastico`): em cada intensidade, normal → mais esticado → mais esticado com descida de 3 s; depois, a intensidade seguinte. Unilateral desde o começo. **Consenso.**

## Fontes
- `kinoshita2026`, `kassiano2026`, `zabaletakorta2021`, `pedrosa2022`: já em `../fontes.md` (resumo-PubMed).
- `nsca2021`: **não verificado** (livro pago); consenso de treinadores.

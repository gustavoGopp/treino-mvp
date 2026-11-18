# Tríceps com elástico preso no alto, como na polia (`triceps-elastico-alto`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G3, lote 2; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/triceps-elastico-alto.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** um elástico e um ponto alto (âncora de porta do fabricante ou barra fixa).
- **Função:** tríceps complemento (no nível da flexão fechada).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | De frente para o ponto alto, cotovelos colados ao corpo | consenso | `17`, G3 |
| Movimento | Estender os cotovelos até os braços ficarem retos | consenso | idem |

## Por que assim
Nenhum estudo de tríceps com elástico; no esforço máximo, elástico ≈ halter em exercícios de ombro (`andersen2010`, um estudo, não é de tríceps); na força, elástico = convencional (`lopes2019`, moderada). É o único exercício novo ancorado; perde o desempate para a flexão fechada, que tem animação, e entra sobretudo como alternativa.

## Segurança
- Cotovelo (dor de hoje acima de 5 tira o exercício). O elástico fica acima da cabeça e, se soltar, pode atingir o rosto (`ng2022`): só a âncora do fabricante ou a barra fixa, testada antes (`seguranca.montagem`). Não é a porta com toalha (recusada).
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: tríceps. Sem secundário. **Consenso**.

## Como a carga sobe
Elástico: pelas intensidades que a pessoa tem.

## Referência visual
> Nenhum vídeo levantado em `17`; termo de busca: "band tricep pushdown". A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `andersen2010` (`docs/pesquisa/fontes.md`).
- `lopes2019` (`docs/pesquisa/fontes.md`).
- `ng2022` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/triceps-elastico-alto.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (tríceps, sem secundário) e a biblioteca; a nota, do erro "Cotovelos soltos" do cartão | consenso | `17`, G3 |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | montagem do cartão e a linha Posição da tabela de técnica | consenso | `17`, G3; `seguranca.montagem` |
| Variações (`vary`) | o equipamento do cartão e a seção Segurança (porta com toalha recusada) | consenso | `seguranca.montagem`; `ng2022` |
| Nota (`note`) | a montagem do cartão, num texto só; sai "pise com o pé inteiro sobre ele", que não vale aqui (o elástico fica preso no alto; ver `pedidos.md`) | um estudo | `ng2022`; `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/triceps-elastico-alto.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz o que varia de pessoa para pessoa além do ponto de ancoragem. A montagem do cartão traz "pise com o pé inteiro sobre ele", que não serve a um elástico preso no alto: ficou fora da nota e foi para `pedidos.md`.

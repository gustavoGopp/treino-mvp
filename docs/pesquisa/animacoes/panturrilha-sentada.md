# Panturrilha sentada na máquina (`panturrilha-sentada`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** máquina de panturrilha sentada (`panturrilha_sentada_maquina`, novo)
- **Função do T3:** flexão plantar sentada (panturrilha, complemento para o sóleo; só quando a panturrilha é prioridade).
- **Frequência estimada:** 0,25 vaga por semana na academia completa (só no modelo de 5 dias). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado, joelhos a ~90° sob a almofada; ponta dos pés na borda da plataforma | consenso | `nsca2021` (não verificado) |
| Movimento | Solta a trava, desce o calcanhar até o alongamento máximo, pausa ~1 s e sobe ao máximo | consenso | `nsca2021` (não verificado) |
| Trava | Trava de novo ao terminar a série | consenso | `seguranca-t5` |

## Por que assim
Com o joelho dobrado, o gastrocnêmio quase não cresceu (+1% a +2%), e o sóleo foi o músculo mais treinado (Kinoshita 2023; um estudo). Por isso ela é **complemento**, nunca a única panturrilha da semana.

## Erros a animar
1. **Amplitude curta**.
2. **Impulso com o quadril** (levantar o tronco para ajudar).

## Músculos
Primário: panturrilha (sóleo). Na biblioteca: `panturrilha`, com a tag `sentada`.

## Como a carga sobe (para a progressão e a calibração do T6)
Em geral **anilhas** na alavanca: kg de anilhas por lado, por passos. Em algumas, placa da torre.

## Fontes
- `kinoshita2023`: Kinoshita M, Maeo S, Kobayashi Y et al. Triceps surae muscle hypertrophy is greater after standing versus seated calf-raise training. Front Physiol 2023;14:1272106. PMID 38156065. Resumo lido no PubMed em 01/11/2026.
- `seguranca-t5`: Cartão de "montagem segura" aprovado no T5 (`docs/pesquisa-v2/06-populacoes-e-seguranca.md`); consenso do projeto.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Leitura do texto completo (05/11/2026)
O sóleo cresceu **igual** em pé e sentado (+2,1% × +2,9%, p = 0,41; `kinoshita2023`, 14 não treinados, 12 semanas). A ideia de que a sentada "cobre o sóleo" não tem apoio nesse ensaio: a sentada é variação, não complemento necessário. O cartão passou a dizer isso.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/panturrilha-sentada.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (panturrilha, sóleo) e a leitura do texto completo (05/11): com o joelho dobrado, o gastrocnêmio quase não cresceu, e o sóleo cresceu igual em pé e sentado; a nota, também do erro "Impulso com o quadril" | um estudo (o gastrocnêmio e o sóleo); consenso (a nota do tronco) | `kinoshita2023`; `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linhas Posição, Movimento ("solta a trava") e Trava da tabela de técnica e a dica "Tronco parado" | consenso | `nsca2021` (não verificado); `seguranca-t5` |
| Variações (`vary`) | a leitura do texto completo ("a sentada é variação, não complemento necessário") e o alvo do cartão ("cresce menos que em pé"), mais a linha Movimento | um estudo; consenso | `kinoshita2023`; `nsca2021` (não verificado) |
| Nota (`note`) | a montagem do cartão (as linhas Movimento e Trava) | consenso | `seguranca-t5` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/panturrilha-sentada.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** "Por que assim" ainda diz que o sóleo "foi o músculo mais treinado" e que a sentada é complemento; a leitura de 05/11, logo abaixo, corrige (o sóleo cresceu igual em pé e sentado), e o texto seguiu a correção. A ficha não diz onde fica o eixo da máquina (a animação o pôs na linha do quadril, de desenho) nem como regular a almofada dos joelhos. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.

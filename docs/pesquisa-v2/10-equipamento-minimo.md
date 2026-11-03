# 10. Equipamento mínimo: nada, ou um aparelho só (sessão de equipamento mínimo)

> Pesquisa de 03/11/2026, no método de `PLANO-DOS-TEMAS.md`: perguntas fechadas → buscas registradas → hierarquia das fontes → nível de leitura → selo por número → entregável. Os selos seguem `docs/pesquisa/00-metodo.md`.
>
> **Leitura das fontes.** Estudo marcado **resumo-PubMed** teve o resumo oficial lido no PubMed nesta sessão, com `python3 -I scripts/pesquisa/pubmed.py a <PMID>`; o texto completo não foi lido. O que foi visto só pelo título (na lista do PubMed ou na busca web) fica **NÃO VERIFICADO** e não sustenta nenhum selo nem número. Durante parte da sessão, o PubMed respondeu com uma página de limite de pedidos (HTTP 429 e 203); as buscas que voltaram vazias por isso estão marcadas, e **uma busca vazia não prova que o estudo não existe**.
>
> **Como foi feito.** Três pesquisadores trabalharam em paralelo (perguntas 1 e 5; 2 e 4; 3, 6 e 7), com as mesmas regras de selo. Eu conferi no PubMed, de novo, as fontes que mais pesam nas propostas (Maeo 2024, Wei 2023, Hammert 2026, Calatayud 2015, Soligon 2020, Marcolin 2015, Cholp 2025, Morin 2025b) e juntei os três textos. Onde eles divergiram, a seção "Divergências" diz o que ficou e por quê.
>
> **[opinião]** marca o que é julgamento de quem pesquisou, não evidência. **Nada aqui muda `regras.md`, os dados ou o código**: tudo espera a decisão do Gustavo (`docs/revisoes/equipamento-minimo.md`). A v2 prevalece sobre a v1 onde houver conflito; as correções à v1 estão na seção "O que muda em relação ao que o projeto dizia".

## Em uma frase
Só com o peso do corpo dá para crescer peito, tríceps, pernas, glúteo e panturrilha enquanto alguma variação levar a série perto da falha em até ~30 repetições (**moderada a robusta**). Mas **costas, bíceps, ombro lateral e ombro posterior não têm como ser treinados sem algo para puxar ou levantar**, e nenhum exercício de chão resolve isso: a saída honesta é dizer que falta e o que resolve (um elástico primeiro **[opinião]**), e não fingir que o treino está completo.

## Resumo por pergunta

| # | Pergunta | O que a evidência diz | Selo |
|---|---|---|---|
| 1 | Hipertrofia só com o peso do corpo | Carga baixa até perto da falha cresce como carga alta, também em treinados (3 ensaios, só homens). O piso depende do esforço: a 30% de 1RM, ir à falha cresceu e parar longe dela não. Até ~30–35 repetições perto da falha funciona. Calistenia e suspensão têm ensaios de hipertrofia pequenos, em não treinados ou idosos (flexão ≈ supino; agachamento progressivo ≈ barra em 13 mulheres; suspensão ≈ tradicional em idosos). **Teto da calistenia em treinados: nenhum estudo, nem a favor nem contra.** | robusta (carga baixa ≈ alta); moderada (em treinados; até ~30–35 rep.); um estudo (cada ensaio de calistenia) |
| 2 | Puxar sem equipamento | Mesa, porta com toalha, mochila e galão: **nenhum estudo**, nem de EMG nem de segurança. A remada invertida numa barra ativa muito o latíssimo, com pouca carga lombar (EMG). O "superman" ativa menos o latíssimo que a remada invertida e não é exercício de costas. Sem ancoragem nem objeto, não existe puxar. | um estudo (EMG); consenso (o resto) |
| 3 | Posteriores e glúteo sem carga | O **nórdico cresce os posteriores** (dois grupos de pesquisa e uma meta-análise em atletas), mas menos que a flexão de joelho com o quadril dobrado, e a 1ª sessão dá dor forte por 2–4 dias. Flexão deslizante, ponte unilateral, ponte com os pés elevados e stiff sem peso: nenhum ensaio. Reto femoral sem máquina: nenhum ensaio. | moderada (nórdico cresce); um estudo (< flexora; dor); consenso (o resto) |
| 4 | Ombro e braços sem carga | Flexão com as mãos juntas ativa mais o tríceps (2 EMGs); a flexão cresce o tríceps (1 ensaio). Mergulho na cadeira pede mais extensão do ombro (1 estudo). Pike e extensão de tríceps com o peso do corpo: nenhum estudo. Objeto doméstico = halter de peso desconhecido. | moderada (EMG do tríceps); um estudo; consenso |
| 5 | Um aparelho só | O aparelho não decide o crescimento. O **elástico** destrava 8 das 9 funções de tronco vazias; a barra de porta e a suspensão, 1 cada; o kettlebell, a bola, o step e as paralelas, quase nada na biblioteca de hoje. Nenhuma escada de dificuldade foi testada; a largura da faixa de repetições não tem estudo. Elástico: força ≈ pesos; hipertrofia contra controle em idosas (1 ensaio). | robusta (equipamento); moderada (força com elástico); um estudo (hipertrofia com elástico); consenso (escadas e faixas) |
| 6 | Segurança | Nenhum dado de lesão desses exercícios feitos em casa. O mergulho na cadeira pede mais extensão do ombro; os acidentes (queda, pancada) são a maior causa de pronto-socorro na musculação; móveis que tombam só têm dados de crianças. O elástico que solta ou arrebenta já causou fratura e trauma no olho (relatos de caso). | um estudo; consenso |
| 7 | Vídeos | 29 vídeos de referência visual, registrados com canal e título; **não assistidos** (a rede bloqueou youtube.com) e nunca fonte de regra. | — |

## O que muda em relação ao que o projeto dizia
- **"Não há estudo de hipertrofia com treino em suspensão"** (v1, `05-equipamento-limitado.md`, lacunas): agora há dois, os dois fora de adultos jovens treinados (Soligon 2020 em idosos; Kohiruimaki 2019, 8 homens sem controle).
- **"A equivalência do elástico em hipertrofia é inferência"** (v1): passa a ser **um estudo (idosas, contra controle)** mais a inferência pela equivalência de cargas (Harper 2025). Contra pesos, em adultos jovens, continua sem ensaio.
- **`calatayud2015`**: o PMID é **24983847** (o resumo foi lido: flexão com elástico a 6RM ≈ supino a 6RM na força, 30 universitários treinados, 5 semanas). O 25028993 sugerido em `fontes.md` não é ele.
- **`schoenfeld2015` (cadência)**: o PMID 25601394 foi confirmado.
- **`kotarsky2018`**: o DOI que faltava é 10.1519/JSC.0000000000002345; em 4 semanas, **nem o grupo do supino** mudou a espessura: o estudo é curto demais para dizer algo sobre a flexão.
- **`fenwick2009`**: o mesmo resumo saiu duas vezes (PMIDs 19197209 e 19620925), o que explica a divergência anotada em `fontes.md`.
- **Nórdico e volume**: Cuthbert 2020 (13 estudos) diz que volume baixo e alto dão força excêntrica e comprimento de fascículo parecidos; Cholp 2025 (11 estudos, jogadores de futebol) diz que só o volume alto aumentou a espessura muscular. As duas não medem a mesma coisa: **para força, volume baixo basta; para crescer, o volume alto tem o apoio** (moderada, atletas).
- **`morin2025`**: o artigo de 2025 do mesmo grupo (Morin et al., *J Appl Physiol*, PMID 40586278, resumo lido) traz os números: 36 não treinados, 9 semanas, o nórdico cresceu o semitendíneo em ~24% e o stiff, o semimembranoso em ~11%. É a mesma linha de pesquisa: **não conta como 3º grupo independente**.

## Divergências entre os pesquisadores e como ficou
| Ponto | Posições | Como ficou neste arquivo |
|---|---|---|
| Remada invertida na mesa | P3/P6 escreveu um texto de montagem segura ("mesa pesada de madeira maciça, teste com metade do peso"); P2 recomendou **não entrar**, porque o app não vê a mesa e a falha cai no rosto | As duas posições ficam registradas; **é a pergunta 3 do Gustavo** (`docs/revisoes/equipamento-minimo.md`). Nenhuma fonte, para nenhum lado |
| "Volume baixo de nórdico basta" | P3 (Cuthbert 2020) × P1 (Cholp 2025) | As duas valem, para desfechos diferentes (ver acima) |
| Mulheres começam a flexão um degrau abaixo | P5 propôs, a partir de Alizadeh 2020 (um estudo) | **Não se aplica**: o app não pergunta o sexo (decisão do Gustavo, `backlog.md`, 01/11). A 1ª série de cada exercício acerta o ponto de partida (`progressao.calibracao`) |
| Superman e Y-T-W | P2: não entram no volume de costas; P3/P6: texto de montagem para os dois | Não contam como costas (um estudo, Park 2015). O Y-T-W só como alternativa de ombro posterior, e só com garrafas |
| Kettlebell | P5: o kettlebell deveria valer como halter nos exercícios de um peso só | Fica como proposta (consenso, pela equivalência robusta de equipamento); muda dados, então é decisão do Gustavo |


## Pergunta 1. Hipertrofia só com o peso do corpo

### 1.1 Tabela

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **Carga baixa até a falha ≈ carga alta (hipertrofia)** | 21 estudos: hipertrofia igual entre ≤ 60% e > 60% de 1RM, com todas as séries até a falha; a força máxima ganha mais com carga alta. Uma meta-análise em rede (28 estudos, 747 adultos) achou o mesmo. Com o volume igualado, a carga também não mudou a hipertrofia. A meta-análise de 2016 (8 estudos, não treinados) só viu uma tendência a favor da carga alta (p = 0,076), atribuída ao pequeno número de estudos. | robusta | Schoenfeld et al. 2017 (28834797); Lopez et al. 2021 (33433148); Carvalho et al. 2022 (35015560); Schoenfeld et al. 2016 (25530577) |
| **Vale também em treinados** | Homens treinados: 25–35 repetições ≈ 8–12 no bíceps, no tríceps e no quadríceps, em 8 semanas (n = 18). 49 homens treinados: 20–25 repetições a 30–50% de 1RM ≈ 8–12 em 12 semanas (massa magra e fibras tipo I e II). 17 homens com treino recreativo: 30% de 1RM ≈ 85% em 9 semanas (diferença só no tríceps). Em todos, a força máxima ganhou mais com carga alta. | moderada (3 ensaios coerentes, só homens) | Schoenfeld et al. 2015 (25853914); Morton et al. 2016 (27174923); Bello et al. 2025 (41562735) |
| **20–30 repetições até a falha podem crescer até mais** | 201 não treinados, 6 semanas, rosca unilateral: 20–30RM cresceu mais que 8–12RM (~0,30 × ~0,20 cm). Em 20 homens jovens, com um membro em cada carga (20–25 × 8–12 repetições), a carga não mudou o crescimento, e a resposta de cada pessoa foi parecida nos braços e nas pernas. | um estudo (para "mais"); moderada (para "igual") | Hammert et al. 2026 (42319300); Lees et al. 2025 (41474371) |
| **Piso de carga: 20% de 1RM ficou pior** | 30 homens, 12 semanas, volume igualado: 20% de 1RM cresceu ~9–11%, contra ~20–25% com 40, 60 e 80%. A meta-análise com volume igualado não achou diferença entre < 30% (ou > 35RM) e as outras cargas, com poucos estudos nessa faixa. | um estudo (o piso); as duas fontes discordam | Lasevicius et al. 2018 (29564973); Carvalho et al. 2022 (35015560) |
| **Com carga baixa, a proximidade da falha decide** | 25 homens não treinados, 8 semanas, extensora: 30% de 1RM até a falha (~34 repetições) cresceu como 80%; 30% sem ir à falha (~20 repetições) não cresceu de forma significativa (+2,8%). Com 80%, ir ou não à falha deu o mesmo. Com 40% de 1RM no supino, parar com 20% de perda de velocidade deu o mesmo crescimento que ir à falha, com o volume igualado. | um estudo cada (coerentes com `rir.carga-baixa`) | Lasevicius et al. 2022 (31895290); Terada et al. 2022 (35622108) |
| **Até quantas repetições** | Os ensaios que funcionaram usaram até ~35 repetições por série (25–35; ~34; 20–30). Acima disso, nenhum ensaio que eu tenha lido. A revisão de Schoenfeld 2021 propõe que a hipertrofia vem num "espectro largo de cargas"; o resumo não dá número de desconforto. | moderada (até ~30–35 funciona); consenso (o teto de 30 do app) | Schoenfeld 2015 (25853914); Lasevicius 2022 (31895290); Hammert 2026 (42319300); Schoenfeld et al. 2021 (33671664) |
| **Flexão ≈ supino com carga equivalente** | 18 homens, 8 semanas: flexão ajustada (de joelhos, por exemplo) à carga de 40% de 1RM ≈ supino a 40% para o peitoral e o tríceps. | um estudo | Kikuchi & Nakazato 2017 (29541130) |
| **Flexão em treinados: força, sem medida de crescimento** | 30 universitários com treino avançado: flexão com elástico a 6RM ≈ supino a 6RM na força, em 5 semanas (não mediu músculo). 23 homens moderadamente treinados: flexões progressivas em 4 semanas aumentaram o 1RM do supino; nenhum grupo, nem o do supino, mudou a espessura (curto demais). | um estudo cada (força); sem dado de hipertrofia em treinados | Calatayud et al. 2015 (24983847); Kotarsky et al. 2018 (29466268) |
| **Flexão na suspensão** | 8 homens, flexão na suspensão até a falha, 3 × 3 por semana, 8 semanas: tríceps +16%, reto abdominal +27%; o 1RM do supino não mudou. Sem grupo controle. | um estudo (pequeno, sem controle) | Kohiruimaki et al. 2019 (31466083) |
| **Agachamento com o peso do corpo, progressivo** | 13 mulheres sedentárias, 6 semanas: uma escada de 10 níveis do bilateral ao unilateral ≈ agachamento com barra a 60–80% para a espessura do glúteo, do reto femoral e do gastrocnêmio. | um estudo (muito pequeno; mulheres) | Wei et al. 2023 (37598268) |
| **Peso do corpo lento em idosos** | 88 pessoas com 70 anos ou mais: agachamento, flexão apoiada na mesa e abdominal com 4 s de descida e 4 s de subida, de 2 × 10 até +2 repetições a cada 4 semanas, por 12 semanas: a espessura da coxa subiu mais que no controle. | um estudo (idosos; não serve para dizer que lento é melhor) | Tsuzuku et al. 2018 (29247985) |
| **Suspensão ≈ treino tradicional** | 42 idosos não treinados, 12 semanas, 3 séries até a falha: bíceps +22% × +23% e vasto lateral +14% × +13%. | um estudo (idosos) | Soligon et al. 2020 (32700098) |
| **Unilateral = bilateral** | Mesmo crescimento; a força segue o tipo treinado. Sustenta o unilateral como degrau: o mesmo estímulo com mais carga relativa. | moderada | Kassiano et al. 2025 (39794667, já em `fontes.md`) |
| **Progredir por repetições** | Em treinados, subir repetições ou subir carga deu hipertrofia parecida. | um estudo | Plotkin et al. 2022 (36199287, já em `fontes.md`) |
| **Cadência** | 8 estudos, todos até a falha: de 0,5 a 8 s por repetição dá hipertrofia parecida; muito lento (> 10 s) parece pior, com poucos estudos. | moderada | Schoenfeld et al. 2015 (25601394; o PMID, que estava "não confirmado", foi conferido agora) |
| **Descida lenta (4 s × 1 s)** | 18 não treinados (10 homens e 8 mulheres), 7 semanas de agachamento a 60–70%: a descida de 4 s cresceu mais o vasto lateral e deu mais força que a de 1 s. | um estudo | Kojic et al. 2025 (39850448) |
| **Pausa embaixo e 1,5 repetição** | Nenhum ensaio de hipertrofia achado (busca "one and a half repetitions" sem nada útil). | consenso | `consenso-projeto` |
| **Rest-pause** | 23 treinados, 8 semanas: rest-pause ≈ drop set na massa magra (DXA) e no 1RM. É uma técnica de série (pausas curtas entre minisséries), não a pausa dentro da repetição. | um estudo (DXA, não músculo a músculo) | Vargas-Molina et al. 2026 (42340141) |
| **Mulheres e a flexão** | 20 pessoas treinadas: no supino com a carga que a flexão impõe, as mulheres fizeram 3,5 repetições contra 15,5 na flexão, e os homens 12 contra 25,6. A flexão é relativamente mais difícil para as mulheres; os homens fizeram mais repetições nas duas. | um estudo (repetições; a parte de EMG não mede crescimento) | Alizadeh et al. 2020 (32390722) |
| **Nórdico (posteriores só com o peso do corpo)** | 11 estudos com jogadores de futebol: volume alto de nórdico (~2–3 × 8–12, 2–3 vezes por semana) aumentou a espessura muscular (g = 0,48) e o comprimento dos fascículos; volume baixo (1–2 × 3–5) deu força, mas não mudou a arquitetura. | moderada (meta-análise; atletas; a espessura não é o desfecho principal) | Cholp & Zemková 2025 (41178985); Morin 2025 (40644669, já em `fontes.md`) |
| **Elástico (hipertrofia)** | 34 mulheres idosas não treinadas, 6 semanas de elástico no corpo todo: a área de secção do quadríceps e dos flexores do cotovelo cresceu mais que no controle. Contra pesos, em adultos jovens: **nenhum ensaio achado**. | um estudo (idosas, contra controle) | Harper et al. 2025 (41346374) |
| **Elástico (força)** | Elástico ≈ pesos na força (8 estudos); em idosos, efeito grande na força (11 estudos, 834 pessoas); resistência variável (elástico ou corrente somados à barra) ≈ tradicional na força e na potência (17 estudos, 491 adultos). | moderada (força) | Lopes et al. 2019 (30815258, já em `fontes.md`); Martins et al. 2013 (23562413); Andersen et al. 2022 (36130847) |
| **"Elastic bench press device" não é elástico** | 22 homens treinados: um acessório elástico de supino (que ajuda na parte de baixo e permite 10% mais carga) ≈ supino sem ele, inclusive na espessura do peitoral. É um acessório de apoio para a barra, **não** treino com faixa elástica. Não serve para o elástico do app. | não se aplica | Gavanda et al. 2026 (42220583) |

### 1.2 Até onde o peso do corpo chega (a decisão do dono)

**O que a evidência sustenta:**
- o músculo cresce com qualquer carga que leve a série perto da falha em até ~30–35 repetições, em treinados e em não treinados (moderada a robusta);
- abaixo disso, um estudo mostra perda (20% de 1RM). Ir longe da falha com carga baixa não cresce (um estudo);
- portanto, o peso do corpo funciona enquanto alguma variação disponível levar a série perto da falha dentro de ~30 repetições.

**O que ela não sustenta:** que a calistenia tem um teto em treinados, ou que não tem. **Não achei nenhum estudo** de hipertrofia com calistenia em treinados que tenha durado o bastante para medir crescimento: o de Kotarsky 2018 teve 4 semanas e nem o supino cresceu. Nenhum ensaio com mulheres treinadas.

**Onde o teto aparece, por raciocínio** **[opinião, a partir da tabela]**:
- **Pernas:** o agachamento bilateral é uma fração pequena da força das pernas de quem treina. O búlgaro, o afundo com descida lenta e o agachamento unilateral sobem muito a carga relativa, e a escada de Wei 2023 usou exatamente essa ideia (do bilateral ao unilateral). O quadríceps de um avançado provavelmente chega ao fim da escada; o posterior da coxa tem o nórdico, que é muito pesado.
- **Empurrar:** a flexão com pés elevados, com déficit ou na suspensão chega perto de 70% do peso do corpo **[NÃO VERIFICADO: a fração do peso do corpo por variação não foi lida nesta sessão]**. Para um homem forte, mesmo assim pode passar de 30 repetições.
- **Puxar:** a barra fixa é pesada para quase todo mundo, então raramente bate o teto; o problema é o contrário (não conseguir fazer).
- **Braços e ombros isolados:** sem carga externa, quase não há exercício de bíceps, de ombro lateral ou de ombro posterior. Aí falta o exercício, e não só a carga.

**Proposta [opinião]:** avisar, mas **pelo comportamento e não pelo nível**. O aviso aparece quando um exercício está no último degrau da escada e a 1ª série passa de 30 repetições em 2 sessões seguidas. O texto seria: "Você chegou ao fim do que o peso do corpo oferece para este músculo. O músculo cresce com séries de até ~30 repetições perto da falha (evidência moderada); passando disso, ninguém testou bem. Um elástico, um halter ou uma mochila com peso retomam a progressão." Não avisar de antemão o avançado: não há estudo que mostre que ele vai parar de crescer, e muitos avançados nunca chegam ao último degrau da barra fixa ou do nórdico. Selo do aviso: **consenso** (gatilho do projeto), apoiado em `lasevicius2018` e `lasevicius2022`.

### 1.3 O que fica sem resposta
- **Calistenia em treinados, por 8 semanas ou mais, com medida de músculo:** não achei. Nem em mulheres treinadas.
- **Teto exato de repetições:** os ensaios vão até ~35. Acima disso, um estudo diz pior (20% de 1RM), e uma meta-análise diz igual. Ninguém mediu desconforto e adesão com 40 ou mais repetições.
- **Pausa embaixo, 1,5 repetição e isometria no alongamento** com o peso do corpo: nenhum ensaio de hipertrofia.
- **Elástico × pesos, em adultos jovens, com medida de músculo:** não achei. Há só o ensaio contra controle em idosas.
- **Treino em suspensão em adultos jovens treinados:** não achei; os dois ensaios são de idosos e de 8 homens sem controle.
- **A fração do peso do corpo em cada variação** (flexão inclinada, no chão, com pés elevados; agachamento unilateral): não li nesta sessão; os números que circulam ficam NÃO VERIFICADOS.
- **Resumos que não abriram (NÃO VERIFICADO, só título):**
  - meta-análise da duração da descida, 2025 (40692176);
  - meta-análise "How Slow Should You Go?" sobre cadência, 2025 (42709703);
  - nórdico × stiff com descida lenta, arquitetura dos posteriores, 2025 (40085810);
  - rest-pause × séries tradicionais em treinados, 2019 (28617715);
  - peso do corpo + elástico com ou sem proteína em idosos, 2019 (30529477);
  - "Minute Calisthenics", protocolo de ensaio, 2020 (32799849), que é só protocolo.

### 1.4 Buscas registradas (PubMed, 03/11/2026)
| Termos | Resultados úteis |
|---|---|
| `push-up training muscle thickness` | 3 (Kotarsky 2018, Kohiruimaki 2019, Kikuchi 2017) e Tsuzuku 2018 |
| `bodyweight squat hypertrophy` | 1 (Wei 2023) |
| `calisthenics training randomized` | 1 (Kotarsky); 1 protocolo (32799849) |
| `suspension training hypertrophy` | 1 (Soligon 2020); 1 de EMG (Snarr 2017) |
| `low load resistance training trained` | 5 (Schoenfeld 2017, Schoenfeld 2015, Lopez 2021, Lasevicius 2018, Morton 2016) e Carvalho 2022 |
| `elastic band hypertrophy` | 0 sem restrição de fluxo; todos com BFR ou em idosos |
| `repetitions to failure load threshold hypertrophy` | 1 revisão narrativa (23955603, não lida) |
| `push-up hypertrophy` | 1 (Kikuchi) |
| `calisthenics muscle thickness` | 1 (Kotarsky); o resto é ginástica infantil |
| `bodyweight training muscle mass randomized` | 2 em idosos (30529477, 30864254, não lidos) |
| `elastic resistance training muscle thickness` | 1 (Gavanda 2026, que não é elástico) |
| `elastic band resistance training young adults hypertrophy` | 0 |
| `very low load hypertrophy 20% 1RM` | 4 (Lasevicius 2018, Morton 2016, Hammert 2026, Terada 2022) e Bello 2025 |
| `low load 30 repetitions hypertrophy` | 3 (Carvalho 2022, Lasevicius 2022, Schoenfeld 2016) |
| `no load resistance training muscle size` | 1 (Lees 2025); nada sobre "no load" |
| `Bulgarian split squat hypertrophy` | 1 (`bulgaro2026`, já em `fontes.md`) |
| `split squat training muscle thickness` | 0 |
| `eccentric tempo hypertrophy trained` | 3 (Schoenfeld 2015, Kojic 2025; duas meta-análises de 2025 cujos resumos não abriram) |
| `pause repetitions isometric hypertrophy` | 1 (rest-pause 2019, resumo não abriu); Vargas-Molina 2026 veio pela mesma lista |
| `one and a half repetitions` | 0 |
| `eccentric overload bodyweight squat` | 0 (1 de EMG do nórdico invertido) |
| `elastic resistance training meta-analysis muscle` | 3 de força (Martins 2013, Andersen 2022, uma meta-análise de EMG, 27681867, não lida) |
| `home-based resistance training hypertrophy` | 1 (Harper 2025) |
| `suspension training muscle thickness` | 1 (Soligon) |
| `low load muscle discomfort perceived exertion` | 0 sem BFR |
| `push-up elastic band strength` | 1 (Calatayud 2015: o PMID 24983847 confirma o que faltava em `fontes.md`) |
| `calisthenics strength young adults` | 0 novos |
| `single-leg squat training` | 0 |
| `Schoenfeld repetition continuum loading recommendations` | 1 (Schoenfeld 2021, PMID 33671664) |
| `push-up training trained men muscle` | 1 (Alizadeh 2020); o resto é EMG |
| `Nordic hamstring muscle thickness` | 2 (Cholp 2025; 40085810, que não abriu) |
| `elastic tubing training muscle cross-sectional area` | busca não respondeu (página anti-robô) |
| `variable resistance training hypertrophy muscle thickness` | 0 |
| `Colado elastic resistance training` | 0 em adultos jovens com medida de músculo |

---


---

## Pergunta 2. Puxar sem equipamento

### Resumo

Sem um ponto de ancoragem (algo firme para segurar e puxar o corpo, ou uma carga para levantar), **não há como fazer um exercício de puxar que leve as costas perto da falha**, e o volume de costas fica em zero. Não achei **nenhum** estudo sobre remada invertida em mesa, remada na porta com toalha ou remada com objeto doméstico. Também não achei ensaio de hipertrofia do latíssimo com nenhum exercício de peso do corpo. O que existe é EMG: a remada invertida (numa barra) ativa muito o latíssimo, o deltoide posterior e o bíceps, com a menor carga lombar entre três remadas (Fenwick 2009, n = 7; Youdas 2016, n = 26). O "superman" e o Y-T-W deitado trabalham sobretudo os eretores da coluna e o trapézio, e não substituem uma remada. O único ensaio de hipertrofia com aparelho barato que encontrei é com **suspensão em idosos**: em 12 semanas, a espessura do bíceps e do vasto lateral cresceu igual à do treino tradicional (Soligon 2020, n = 42). **[opinião]** O primeiro item a comprar é um **jogo de elásticos**: é o mais barato, a remada sentada com elástico não precisa de porta (o elástico passa pelos pés) e ele destrava também bíceps, ombro posterior, ombro lateral e tríceps acima da cabeça. A barra fixa de porta vem depois, para quem tem um batente que a aguente.

### Tabela de princípios

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **Remada invertida (numa barra) ativa o latíssimo** | 7 homens saudáveis, EMG: entre a remada invertida, a remada curvada em pé e a remada unilateral na polia, a invertida teve a **maior** ativação do latíssimo, das costas altas e dos extensores do quadril, e a **menor** carga lombar. A remada curvada teve a maior carga lombar. | um estudo (EMG; não mede crescimento) | Fenwick et al. 2009 (19197209; o mesmo resumo saiu de novo em 19620925) |
| **Remada invertida num aparelho portátil de barra de porta** | 26 adultos (13 homens e 13 mulheres), EMG: com um aparelho portátil de barra fixa colocado baixo, a remada invertida passou de 61% da contração máxima no latíssimo, no deltoide posterior, no bíceps e no trapézio inferior, nas 4 variações (pegada pronada ou supinada, 2 pés ou 1 pé). A supinada mudou a ativação do latíssimo; tirar 1 pé do chão não mudou nada. | um estudo (EMG) | Youdas et al. 2016 (26422610) |
| **Isometria contra o peso do corpo** | 16 homens, EMG em exercícios isométricos: a remada invertida ativou mais a parte medial do latíssimo do que "levantar o corpo" (depressão de ombro) e a extensão de tronco. A parte lateral ativou mais na inclinação lateral do tronco. | um estudo (EMG) | Park et al. 2015 (25282576) |
| **Extensão de tronco deitado ("superman") não é um exercício de costas no sentido do app** | A extensão de tronco ativou menos o latíssimo medial que a remada invertida (Park 2015). Os estudos de "superman" que achei são de reabilitação lombar (multífido e eretores), não de hipertrofia de dorsais. | um estudo (EMG) para "ativa menos o latíssimo"; consenso para "não conta como costas" | Park et al. 2015 (25282576); os estudos de multífido (ex.: PMIDs 34055178, 30276184) só foram vistos pelo título: NÃO VERIFICADOS |
| **Y-T-W deitado (de bruços)** | 30 pessoas saudáveis, EMG em 10 exercícios: o "T" de bruços (abdução horizontal com rotação externa) e o "Y" de bruços (braço acima da cabeça, na linha do trapézio inferior) deram as maiores ativações do trapézio médio; o "Y" deu a maior do trapézio inferior. O resumo não diz que carga foi usada. Não achei ensaio de hipertrofia, nem do trapézio nem do deltoide posterior. Sem carga, a resistência é só o peso do braço. | um estudo (EMG: "ativa o trapézio médio e inferior"); consenso (hipertrofia) | Ekstrom et al. 2003 (12774999); `rabello2024` (no projeto) para o deltoide posterior |
| **Remada com objeto doméstico (mochila, galão)** | Não achei estudo. O que sustenta a ideia é o princípio geral: **carga baixa até perto da falha cresce como carga alta** (robusta), com piso prático de ~20% de 1RM e teto de ~30 repetições (um estudo e consenso). A mochila é um halter de peso desconhecido. | consenso (a equivalência "mochila = halter"); robusta só para o princípio de carga baixa | `schoenfeld2017b`, `lopez2021`, `lasevicius2018` (no projeto) |
| **Remada invertida numa mesa** | **Não achei estudo**, nem de EMG nem de segurança. Ninguém testou "que mesa aguenta". A mecânica é a da remada invertida (Fenwick 2009, Youdas 2016), mas o risco é outro: a mesa pode **virar ou quebrar em cima da pessoa**, que está deitada embaixo dela. | consenso (segurança); o app não consegue ver a mesa | nenhuma fonte; `seguranca.montagem` (`kerr2010`, `coffey2026`) para o princípio |
| **Remada na porta com toalha ou lençol** | **Não achei estudo** (buscas `towel row`, `door row exercise`, `door anchored row bodyweight`: nada útil). A única pesquisa com toalha que apareceu é a barra fixa com a pegada na toalha (EMG; não tem a ver com a porta). O risco é a maçaneta, a fechadura ou a porta cederem e a pessoa cair de costas. | consenso (segurança) | nenhuma fonte |
| **Suspensão cresce músculo (o único ensaio de hipertrofia)** | 42 idosos não treinados, 12 semanas, 3 séries até a falha, corpo inteiro: a suspensão aumentou a espessura do bíceps (+22%) e do vasto lateral (+14%) tanto quanto o treino tradicional (+23% e +13%), e a força também. **Não mediu as costas**, e a população é de idosos. | um estudo (hipertrofia, idosos) | Soligon et al. 2020 (32700098) |
| **Suspensão ativa como as remadas tradicionais** | Revisão de 18 estudos de EMG: a remada na suspensão ativou de moderado a muito alto, mas não mais que a remada tradicional. | moderada (revisão sistemática, só EMG) | `aguileracastells2020` (no projeto) |
| **Elástico dá força como pesos** | 8 estudos, populações variadas: ganho de força comparável. Não há ensaio de hipertrofia com elástico × peso livre em adultos jovens. | moderada (força); inferência para hipertrofia | `lopes2019` (no projeto) |
| **Elástico que solta ou arrebenta machuca** | 2 casos no confinamento da covid: uma fratura de crânio aberta por um elástico que voltou, e um trauma ocular complexo por um elástico que arrebentou durante a **barra fixa assistida com elástico**. Outros relatos de caso de olho (hifema bilateral, lesão de retina) apareceram só nos títulos da busca. Relato de caso não dá taxa nem risco: só mostra que acontece. | consenso (relatos de caso; sem taxa) | Heyn et al. 2023 (37216937); os outros relatos: NÃO VERIFICADOS (só título) |
| **Remada substitui a puxada para o latíssimo?** | Continua sem ensaio de hipertrofia (já registrado no projeto). A EMG de remada invertida é alta para o latíssimo, mas EMG não é crescimento. | consenso | `fenwick2009`, `equipamento.sem-puxada-vertical` |
| **Barra fixa (de porta ou fixa) para o latíssimo** | EMG da barra pronada e supinada no projeto (`youdas2010`). Não achei ensaio de hipertrofia com barra fixa. Iniciantes muitas vezes não fazem nenhuma repetição, e a barra sozinha não dá progressão até a primeira repetição (precisa de elástico, negativa ou remada invertida baixa). | consenso (hipertrofia); um estudo (EMG) | `youdas2010` (no projeto) |
| **Contagem de volume** | Série direta = 1, indireta = 0,5; músculo não prioritário: 4–6 por semana (o código usa 6); prioritário: alvo 8/12/14; 10 ou mais rendem mais que menos de 10. | moderada (0,5 e o mínimo eficaz); robusta (≥ 10 > < 10); consenso (8/12/14) | `volume.serie-indireta.peso`, `volume.semanal.minimo-eficaz`, `volume.semanal.alvo`, `volume.semanal.dose-resposta` |

### O que não se resolve sem ancoragem (nem carga)

Com o inventário vazio e sem nenhum objeto, **puxar** é impossível no sentido do app (uma série perto da falha para costas). Ficam de fora:

1. **Puxar vertical** (latíssimo em adução do ombro, braço acima da cabeça). Precisa de algo acima da cabeça que aguente o corpo (barra) ou de uma resistência ancorada no alto (elástico ou polia). Não há substituto de peso do corpo no chão.
2. **Puxar horizontal com carga.** Sem algo para segurar (barra baixa, mesa, fita) ou um objeto para levantar, não existe remada.
3. **Bíceps.** A flexão de cotovelo contra o corpo inteiro (como na barra supinada) depende de ancoragem. Sem ela, só sobram a rosca com um objeto e a isometria com toalha (P4).
4. **Ombro posterior com carga suficiente.** O Y-T-W de bruços e a abdução horizontal sem carga existem, mas quem é treinado provavelmente passa das 30 repetições sem chegar perto da falha **[opinião]**. Com garrafas de água, passa a ser um crucifixo invertido com carga leve.

**O que o chão oferece, e o que não oferece:** o "superman" trabalha os extensores da coluna, que no app não são o músculo "costas", e o Y-T-W sem carga trabalha o trapézio e o deltoide posterior com carga muito baixa. Nenhum deles cobre o latíssimo. **[opinião]** O app não deve contar o "superman" como série de costas, e deve mostrar a lacuna em vez de fingir que fechou.

### "Custo" da ausência, em séries semanais (cálculo pelas regras do projeto)

> **Cálculo pelas regras do projeto, e não resultado de estudo.** Regras: `volume.serie-indireta.peso` (direta = 1; indireta = 0,5), `volume.semanal.minimo-eficaz` (não prioritário: 4–6; o código usa 6 como alvo e 4 como piso), `volume.semanal.minimo` (6/10/12) e `volume.semanal.alvo` (8/12/14) para músculos prioritários, `volume.series-por-exercicio` (2–4 por exercício por sessão), `volume.sessao.teto` (≤ 10 por músculo por sessão). Na biblioteca, toda remada tem `costas` como primário e `biceps` e `ombro_posterior` como secundários; o unilateral conta 1 série para os dois lados (como o gerador já faz, com o tempo dobrado).

| Cenário (por semana) | Costas | Bíceps (indireta) | Ombro posterior (indireta) |
|---|---|---|---|
| A. Nada para puxar | 0 | 0 | 0 |
| B. 1 remada, 3 séries, 2 dias | 3 × 2 = **6** | 6 × 0,5 = **3** | 6 × 0,5 = **3** |
| C. 1 remada, 4 séries, 2 dias | **8** | **4** | **4** |
| D. 1 remada, 4 séries, 3 dias | **12** | **6** | **6** |
| E. 2 remadas, 3 + 4 séries, 2 dias (7 por sessão) | **14** | **7** | **7** |

**Distância até a meta (meta − séries; negativo = falta):**

| Cenário | Costas não prioritária (meta 6; piso 4) | Costas prioritária: iniciante (mín. 6 / alvo 8) | intermediário (10 / 12) | avançado (12 / 14) | Bíceps não prioritário (6; piso 4) | Ombro posterior não prioritário (6; piso 4) |
|---|---|---|---|---|---|---|
| A | −6 (abaixo do piso) | −6 / −8 | −10 / −12 | −12 / −14 | −6 | −6 |
| B | 0 (meta) | 0 / −2 | −4 / −6 | −6 / −8 | −3 (abaixo do piso: falta 1 direta para o piso, 3 para a meta) | −3 (idem) |
| C | +2 | +2 / 0 | −2 / −4 | −4 / −6 | −2 (no piso) | −2 (no piso) |
| D | +6 | +6 / +4 | +2 / 0 | 0 / −2 | 0 | 0 |
| E | +8 | +8 / +6 | +4 / +2 | +2 / 0 | +1 | +1 |

**Leitura (cálculo):**
- Sem nada para puxar (A), os três músculos ficam em zero, abaixo até do piso de 4. Pela regra robusta (`volume.semanal.dose-resposta`), qualquer cenário abaixo de 10 séries rende menos que 10 ou mais; o cenário A é o extremo: nenhum estímulo de costas.
- Uma remada de 3 séries em 2 dias (B) já fecha a meta de costas **não prioritária**, mas deixa bíceps e ombro posterior abaixo do piso; cada um precisa de pelo menos 1 série direta por semana (3 para chegar a 6).
- Com 4 séries em 3 dias (D), as indiretas sozinhas fecham a meta não prioritária de bíceps e ombro posterior (6), sem isolador.
- Para costas prioritária no intermediário e no avançado, uma remada só não basta dentro de 2–4 séries por exercício por sessão: precisa de 3 dias (D) ou de 2 exercícios por sessão (E). Nos dois casos, as costas por sessão ficam em 4–7, abaixo do teto de 10.
- **[opinião]** Isso mostra que o problema não é "quantas séries" e sim "ter **uma** remada": basta um exercício de puxar com carga suficiente para sair do zero e cobrir 3 músculos de uma vez.

### Qual item comprar primeiro

| Item | O que destrava no app hoje (`funcoes.json`) | Depende de porta ou batente? | Evidência | Risco |
|---|---|---|---|---|
| **Elásticos** (jogo com várias tensões) | puxar horizontal (`remada-elastico`, sentada, com o elástico nos pés: **sem ancoragem externa**); bíceps (`rosca-elastico`, nos pés); elevação lateral (`elevacao-lateral-elastico`, nos pés); tríceps acima da cabeça (`triceps-elastico-acima`); desenvolvimento; crucifixo; face pull e puxada (estes dois **pedem ancoragem**, na porta ou num poste) | só para a puxada e o face pull | força: moderada (`lopes2019`); hipertrofia: inferência; nenhum ensaio com puxada no elástico | elástico que solta ou arrebenta e bate no olho (relatos de caso); a ancoragem na porta herda o risco da porta |
| **Barra fixa de porta** | puxar vertical nível 1 (`barra-fixa`, `barra-fixa-supinada`); alguns modelos de encaixe também ficam baixos, para a remada invertida (o aparelho de Youdas 2016) | **sim** (batente ou parafusos) | EMG (`youdas2010`, Youdas 2016); nenhum ensaio de hipertrofia | queda se o batente ou o encaixe cederem (não achei estudo nem relato de caso no PubMed); muitos iniciantes não fazem 1 repetição |
| **Fita de suspensão** | puxar horizontal (`remada-suspensao`), e pode virar face pull, rosca, tríceps e flexão | **sim** (trava de porta, viga ou barra) | **único ensaio de hipertrofia** do trio (Soligon 2020, idosos, sem medir as costas); EMG (revisão `aguileracastells2020`) | queda se a ancoragem ceder (`seguranca.montagem`); a porta precisa fechar para o lado oposto ao da pessoa **[opinião]** |

**Recomendação [opinião, com base na tabela]: elástico primeiro.**
1. É o único dos três que dá uma remada **sem porta** (o elástico passa pelos pés), então fecha o cenário A → B/C/D sem depender de nada que o app não vê.
2. Com o inventário vazio, **9 funções de tronco** de `funcoes.json` ficam sem exercício (crucifixo, puxar vertical, puxar horizontal, empurrar vertical, elevação lateral, ombro posterior, bíceps, tríceps acima da cabeça e tríceps complemento; a flexão cobre só os dois empurrares de peito). Com o elástico, a biblioteca de hoje preenche **8 das 9** (todas menos o tríceps complemento). **[opinião]** Pelo menos 5 dispensam qualquer ancoragem externa, com o elástico preso nos pés: remada sentada, desenvolvimento, elevação lateral, rosca e tríceps acima da cabeça (a função obrigatória do T3). A puxada, o face pull e o crucifixo pedem ancoragem. A barra fixa preenche **1** (puxar vertical) e, por indireta, ajuda bíceps e ombro posterior; a fita de suspensão, **1** na biblioteca de hoje (puxar horizontal, e o puxar vertical pelo nível 2).
3. É o mais barato e o mais fácil de levar **[opinião; não achei fonte de preço]**.
4. Contra: a evidência de hipertrofia com elástico é inferência (força: moderada), e o risco no olho existe (relatos de caso). O app deve dizer "moderada para força; inferência para hipertrofia", como já faz.

**Segundo item [opinião]:** a barra fixa de porta, **se** o batente aceitar (largura e moldura firmes). É o único jeito barato de ter o puxar vertical. Para quem não faz 1 barra, o elástico já comprado vira assistência. A fita de suspensão é uma alternativa à barra para quem prefere remada a barra fixa, e tem o único ensaio de hipertrofia (em idosos), mas depende da porta do mesmo jeito.

**Dois achados no código, para quem for implementar [opinião]:**
- Em `src/domain/taxonomia/equipamentos.ts`, a capacidade `apoio` tem o comentário "parede, porta, cadeira: sempre existe". Para o empurrar isso basta (a flexão inclinada usa parede ou cadeira), mas **a porta não deve virar ancoragem de puxar** por essa via. Se um exercício de puxar novo pedir porta ou mesa, ele precisa de outra capacidade, declarada pela pessoa.
- Na biblioteca, `puxada-elastico`, `face-pull-elastico` e `crucifixo-elastico` pedem só `elastico`, mas na prática precisam de um ponto de ancoragem (alto, na altura do rosto ou do peito). Hoje o app supõe que esse ponto existe. Proposta: ou um atributo `ancoragem` no item `elasticos` ("tem trava de porta ou poste?"), ou o cartão diz onde prender e aplica `seguranca.ancoragem-improvisada`.

### O que fica sem resposta (P2)
- **Nenhum estudo** sobre remada invertida em mesa, remada na porta com toalha ou lençol, remada com mochila ou galão. Tudo isso é consenso ou opinião.
- **Nenhum dado de segurança** sobre barra de porta, ancoragem de porta para fita ou elástico, ou mesa usada como barra. As buscas por lesão com barra de porta não acharam nada no PubMed; isso **não** quer dizer que ela seja segura.
- **Nenhum ensaio de hipertrofia do latíssimo** com exercício de peso do corpo, elástico ou suspensão. O de suspensão (Soligon 2020) mediu bíceps e coxa, em idosos.
- **Nenhum estudo** com o "superman" ou o Y-T-W para hipertrofia; os estudos são de reabilitação lombar ou escapular.
- Não achei fonte de preço nem de disponibilidade no Brasil para elástico, barra de porta e fita.
- Quanto um objeto doméstico pesa de verdade (a mochila varia), e como registrar o "kg" dele no app.
- **Resumos que o PubMed não deixou ler** (página de limite de pedidos; ficam NÃO VERIFICADOS e não sustentam nada neste arquivo): revisão narrativa de EMG do latíssimo de 2026 (42647355); cargas e ativação em variações de suspensão (37738266); padrões de EMG na suspensão (28217415); barra fixa com toalha × suspensão × tradicional (28828073); remada invertida e equilíbrio escapular (29944029); lesões com equipamento de exercício doméstico no pronto-socorro (24061163); lesões oculares com elástico (33165305); lesão de retina com elástico de barra fixa (41505507).

### Buscas registradas (P2)

Ver "Buscas registradas" no fim do arquivo, parte P2 e P4.

---


## Pergunta 3. Posteriores da coxa, glúteo e reto femoral sem carga

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **O nórdico cresce os posteriores** | Num ensaio com 42 homens jovens saudáveis (14 por grupo), em 12 semanas e 34 sessões, o nórdico aumentou o volume dos posteriores (+11%, ressonância). A flexão excêntrica com o quadril dobrado, numa máquina, aumentou mais (+18%), sobretudo na cabeça longa do bíceps femoral (+19% × +5%). O controle não mudou. O nórdico cresceu mais os flexores do joelho que **não** estendem o quadril; a versão com o quadril dobrado cresceu mais os que estendem. Em outro grupo de pesquisa, nórdico e stiff cresceram partes diferentes dos posteriores. | **moderada** (crescimento, dois grupos independentes); **um estudo** (inferior à flexão com o quadril dobrado) | Maeo et al. 2024, *Med Sci Sports Exerc* (PMID 38857522); Morin et al. 2025 (40644669, já em `fontes.md`) |
| **Volume baixo de nórdico basta para força e arquitetura** | Meta-análise de 13 estudos (≥ 4 semanas de nórdico, com arquitetura do bíceps femoral medida): a partir de 6 semanas, volume baixo e alto deram efeitos muito grandes e parecidos na força excêntrica e no comprimento do fascículo. Os autores concluem que **reduzir o volume não piora as adaptações**. Comprimento de fascículo não é hipertrofia: é arquitetura do músculo. **Para a espessura muscular, outra meta-análise (11 estudos, jogadores de futebol) só viu aumento com volume alto (~2–3 × 8–12, 2–3 vezes por semana); o volume baixo (1–2 × 3–5) deu força, mas não mudou a espessura.** | **moderada** (força e arquitetura: volume baixo basta); **moderada, em atletas** (espessura: só o volume alto) | Cuthbert et al. 2020, *Sports Med* (31502142); Cholp & Zemková 2025, *Front Physiol* (41178985) |
| **Dor tardia: a 1ª sessão de nórdico pesa** | Em 13 homens treinados, 24 repetições de nórdico baixaram a força excêntrica até o 3º dia e a amplitude passiva até o 4º. A dor apareceu no 2º e no 3º dia. A mesma sessão, repetida 4 semanas depois, causou menos dano e recuperação mais rápida (efeito da sessão repetida). | um estudo | Coratella et al. 2025, *Int J Sports Med* (40280182) |
| **Subir o volume do nórdico rápido dói mais** | 40 homens, 6 semanas, 4 doses de nórdico. O grupo que foi do volume baixo ao alto teve mais dor tardia e mais dor que não era dor tardia. Os protocolos de volume menor doeram menos. | um estudo | Behan et al. 2023, *Scand J Med Sci Sports* (36651719) |
| **Nórdico assistido: mesmo ganho de força, menos dor** | 31 jogadores de elite de 13 a 15 anos, 8 semanas supervisionadas. O nórdico com elástico no peito (ajuda que diminui ao longo das semanas) deu ganho de força no teste de nórdico parecido com o do nórdico livre (~20%), com menos dor e menos esforço percebido. População jovem e atleta: a transferência para adultos em casa é inferência. | um estudo | Ishøi et al. 2025, *Phys Ther Sport* (40056728) |
| **Nórdico e prevenção de lesão** | Uma meta-análise de 2019 diz no título que o nórdico **reduz pela metade** as lesões de posteriores (8.459 atletas). Uma reanálise de 2021 diz no título que o efeito preventivo é **inconclusivo**. Não li nenhum dos resumos. É assunto de esporte, fora do objetivo do app. | — (não usar no app) | NÃO VERIFICADOS: PMID 30808663; 34520846 |
| **Onde ancorar os pés em casa** | Não achei estudo. Os guias de treinadores citam o sofá ou a cama pesados, uma pessoa segurando os tornozelos, uma barra de porta baixa ou uma alça presa na porta. Também alertam que uma âncora leve levanta no meio da descida. | consenso | resultados de busca na web (seção "Buscas"); nenhum lido na íntegra |
| **Flexão de joelho deslizante** (toalha ou meias no chão liso) | Não achei ensaio de hipertrofia nem EMG publicado. Há um estudo registrado (ClinicalTrials NCT07171385) que vai comparar a EMG dela com a do nórdico, sem resultado publicado. **[opinião]** É uma flexão de joelho com o quadril estendido, como a mesa flexora. Pelo Maeo 2021 (`selecao.flexora-sentada`), essa posição cresce menos que a sentada, mas cresce. É o mesmo movimento da flexão na bola, que já está na biblioteca. | consenso | `maeo2021` (por analogia); `selecao.equivalencia` |
| **Ponte unilateral** | Não achei ensaio de hipertrofia. A ponte é da mesma função do hip thrust, que cresceu o glúteo como o agachamento (Plotkin 2023). Unilateral e bilateral se equivalem em hipertrofia, e o unilateral dobra a carga relativa sem peso. Há EMG de pontes unilaterais modificadas (NÃO VERIFICADO). | um estudo (a função, `plotkin2023`); consenso (unilateral sem carga como substituto) | `plotkin2023`; `kassiano2025`; NÃO VERIFICADO: 28900560 |
| **Ponte com os pés elevados** ("hamstring bridge") | Não achei ensaio de hipertrofia. No teste de ponte unilateral com o calcanhar sobre uma plataforma, a atividade dos posteriores foi maior com a plataforma mais alta (NÃO VERIFICADO; é um teste de resistência, não um treino). **[opinião]** Os posteriores trabalham quase parados (isometria) com o joelho quase estendido. Serve de variação de glúteo com mais posteriores, não como flexão de joelho. | consenso | NÃO VERIFICADOS: 39933727; 38876665 |
| **Stiff unilateral sem peso** | Não achei ensaio de hipertrofia. O stiff com carga cresce os posteriores (Morin 2025). Sem peso, a carga é muito baixa. A carga baixa até perto da falha cresce como a alta, mas o piso de ~20% de 1RM e o desconforto acima de 25 a 30 repetições limitam o teto prático. **[opinião]** Sem peso, o stiff é mais equilíbrio e aprendizado do que estímulo: raramente chega a 0–3 RIR em até 30 repetições. | consenso | `morin2025`; `schoenfeld2017b`; `lasevicius2018`; `schoenfeld2021` |
| **Peso do corpo progressivo cresce a perna** | 13 mulheres jovens sedentárias, 6 semanas, 2 vezes por semana: 10 níveis de exercício do bilateral ao unilateral × agachamento com barra a 60–80% de 1RM. Os dois grupos aumentaram a força e a espessura do glúteo máximo, do reto femoral e do gastrocnêmio, sem diferença entre eles. Amostra minúscula (6 × 7). | um estudo | Wei et al. 2023, *Sci Rep* (37598268) |
| **Reto femoral sem máquina** (sissy squat, nórdico invertido) | Não achei ensaio de hipertrofia de nenhum dos dois. Um estudo de EMG (NÃO VERIFICADO) diz no título que o nórdico invertido **não** gerou ativação excêntrica do quadríceps maior que a dos agachamentos com o peso do corpo. Com máquina, a extensora é o que cresce o reto femoral (Kinoshita 2026; Kassiano 2026). Wei 2023 achou ganho de reto femoral com peso do corpo, mas Kubo 2019 não achou com o agachamento: os dados conflitam. **[opinião]** O nórdico invertido deixa o quadril estendido e o joelho dobrado, que é a posição em que o reto femoral fica mais alongado. O raciocínio é bom, mas não há estudo que o teste. | consenso | NÃO VERIFICADO: 39214520; `kinoshita2026`; `kassiano2026`; `kubo2019`; Wei 2023 (37598268) |

### O que isso significa para o app [opinião, a partir da tabela]
- **Flexão de joelho sem máquina** (nível 3 da tabela 2.1 do `08`): a flexão na bola ≈ a flexão deslizante, as duas para todos os níveis. O nórdico entra **só para intermediário e avançado** (complexidade 3), começando assistido. Se nada for possível, dobrar o quadril cobre os posteriores, como já está.
- **Volume do nórdico:** começa com 1 a 2 séries curtas e sobe aos poucos. É o que os 3 estudos de dor apontam (volume baixo basta para força; subir rápido dói mais; a 1ª sessão protege as seguintes). O número exato é **consenso**, porque nenhum estudo testou uma escada para hipertrofia.
- **Glúteo sem carga:** a ponte (bilateral → unilateral → pés elevados) já cobre a extensão de quadril. A ponte unilateral entra como degrau da escada (`equipamento.escada-carga-leve`, passo 2), e não como exercício novo à parte.
- **Reto femoral:** a lacuna continua a mesma. O nórdico invertido pode aparecer como alternativa para avançado, com o selo "consenso, sem estudo de crescimento". Ele **não preenche** a vaga da extensora.

### O que fica sem resposta (P3)
- Não há ensaio de hipertrofia com a flexão deslizante, a ponte unilateral, a ponte com os pés elevados, o stiff sem peso, o sissy squat ou o nórdico invertido.
- Os ensaios de nórdico usam homens (jovens, atletas ou treinados). Não achei dados de mulheres, de pessoas de meia-idade nem de quem treina em casa sem supervisão.
- Os dados de volume do nórdico medem força e arquitetura, não hipertrofia. Maeo 2024 usou 34 sessões em 12 semanas: o volume por sessão não está no resumo.
- Nenhum estudo testou onde ancorar os pés em casa, nem o risco de a âncora soltar.
- As meta-análises de comprimento de fascículo (41178985, 34752499, 33049705) e o Bourne 2017 (27660368) não foram lidas.

---


---

## Pergunta 4. Ombro e braços sem carga

### Resumo

Para o tríceps, a **flexão com as mãos juntas** ativa mais o tríceps (e o peitoral) que a flexão com as mãos afastadas (Cogley 2005, n = 40; Marcolin 2015, n = 8; EMG), e a flexão com carga equivalente cresceu peito e tríceps como o supino (Kikuchi 2017, um estudo). O mergulho no banco ativa sobretudo o tríceps, mas pede **mais extensão do ombro** que o mergulho nas paralelas (McKenzie 2022, n = 13, EMG e cinemática); não achei dado de lesão. Para o **pike push-up** (flexão com o quadril alto) e as versões com os pés na cadeira, **não achei nenhum estudo**, nem de EMG: é consenso. A extensão de tríceps com o peso do corpo ("tiger bend", "skull crusher" no chão ou na mesa) também não tem estudo; por analogia com Maeo 2023, ela deixa o ombro flexionado a uns 90°, a meio caminho entre o tríceps na polia e o acima da cabeça **[opinião, sem medida]**. Elevação lateral e rosca com garrafa, galão ou mochila são halteres de peso desconhecido: valem pelo princípio de carga baixa até perto da falha (robusta), mas a equivalência é consenso. A isometria cresce o músculo (revisão de 26 estudos, Oranchuk 2019), mas a rosca isométrica com toalha não tem estudo e não tem como medir carga nem progressão.

### Tabela de princípios

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **Flexão com carga equivalente cresce peito e tríceps como o supino** | A 40% de 1RM, 8 semanas: hipertrofia de peitoral e tríceps comparável entre flexão e supino. | um estudo | `kikuchi2017` (no projeto) |
| **Flexão com as mãos juntas ativa mais o tríceps** | 40 pessoas (11 homens, 29 mulheres), 1 repetição: mãos juntas deu mais EMG no peitoral e no tríceps que mãos afastadas. Em 8 jovens, 10 repetições: a variação com as mãos juntas teve a maior ativação de tríceps e peitoral. | moderada para "ativa mais" (2 estudos de EMG, mesma direção); consenso para "cresce mais" | Cogley et al. 2005 (16095413); Marcolin et al. 2015 (26488636) |
| **Flexão "diamante" (polegares e indicadores juntos)** | Não achei estudo com a posição em diamante em si; os estudos acima usam "mãos juntas" (narrow base). A carga no punho e no cotovelo não foi medida. | consenso | nenhuma fonte |
| **Pike push-up e pike com os pés elevados** | **Não achei estudo** (buscas `pike push-up`, `pike push up shoulder`, `handstand push-up electromyography`; nada útil). O raciocínio é biomecânico: quanto mais o tronco fica vertical, mais a carga vai para a flexão do ombro (deltoide anterior) e mais parecido fica com o desenvolvimento **[opinião]**. A cabeça fica abaixo do quadril. | consenso | nenhuma fonte |
| **Ombro anterior normalmente dispensa isolador** | Já coberto pelos empurrares (indireta 0,5), regra do projeto. Com flexão no programa, o pike só é necessário se o ombro for prioridade. | moderada (a contagem); consenso (dispensar) | `pelland2026` (no projeto); `docs/pesquisa-v2/04` |
| **Mergulho no banco ou na cadeira** | 13 homens experientes, EMG e cinemática: o mergulho no banco trabalha sobretudo o tríceps, mas pede **mais amplitude de extensão do ombro**; o pico de EMG do tríceps foi menor no banco (0,83 mV) que nas paralelas (1,04) e nas argolas (1,05). Os autores dizem que isso importa para quem tem história de dor ou lesão no ombro. **Não mediu lesão**. | um estudo (EMG e cinemática; não mede lesão nem crescimento) | `mckenzie2022` (no projeto; resumo relido nesta sessão) |
| **Risco de lesão do mergulho no banco** | Não achei estudo de lesão nem de dor (buscas `dip exercise shoulder pain`, `triceps dip shoulder injury`, `shoulder extension dip anterior capsule`: nada). O argumento contra é só a amplitude de extensão do ombro (McKenzie 2022) mais o raciocínio clínico de que extensão com rotação interna estressa a parte da frente do ombro **[opinião; não verificado]**. | consenso | `mckenzie2022` |
| **Extensão de tríceps com o peso do corpo** ("tiger bend", "skull crusher no chão ou na mesa") | Não achei estudo. Por analogia: o tríceps com o braço acima da cabeça cresceu muito mais que com o braço ao lado do corpo (Maeo 2023); a extensão com o peso do corpo deixa o ombro em flexão intermediária, e ninguém mediu o efeito nessa posição. | consenso (a posição intermediária); um estudo (o efeito do braço acima da cabeça) | `maeo2023` (no projeto) |
| **Elevação lateral com garrafa, galão ou mochila** | Halter e polia cresceram o deltoide lateral igual em treinados (Larsen 2025). Carga baixa até perto da falha cresce como carga alta (robusta). A garrafa é um halter leve de peso conhecido (1 L de água ≈ 1 kg); a mochila não. Não achei estudo com objeto doméstico. | consenso (objeto = halter); robusta (princípio); um estudo (halter ≈ polia) | `larsen2025`, `schoenfeld2017b`, `lasevicius2018` (no projeto) |
| **Rosca com galão ou mochila** | Mesmo raciocínio. Não achei estudo com objeto doméstico. | consenso (objeto = halter); robusta (princípio) | `schoenfeld2017b`, `lopez2021` (no projeto) |
| **Isometria cresce o músculo** | Revisão sistemática de 26 trabalhos (≥ 3 semanas): a isometria em comprimento muscular **maior** cresceu mais que em comprimento menor com o mesmo volume; houve hipertrofia "substancial" com qualquer intensidade. | moderada (revisão sistemática; poucos estudos) | Oranchuk et al. 2019 (30580468) |
| **Rosca isométrica com toalha (pisando na toalha, ou uma mão contra a outra)** | Não achei estudo. A força feita não é medida, a progressão não tem número e a série não tem repetições para o app contar. A isometria prende a respiração com facilidade **[opinião]**. | consenso | Oranchuk 2019 só para o princípio |
| **Dor e lesão em musculação** | No fisiculturismo, a taxa é baixa (0,24–1 por 1.000 h), com mais lesões em ombro, lombar, joelho, cotovelo e punho. | moderada | `keogh2017` (no projeto, via `docs/pesquisa-v2/06`) |

### Risco e para quem (P4) **[opinião, a partir da tabela]**
- **Flexão com as mãos juntas:** carrega punho (extensão) e cotovelo. Para quem marcar punho na triagem, a versão com as mãos fechadas (punho reto) ou com apoio em halteres é a alternativa de consenso. Iniciante: começa inclinada (mãos na mesa ou na parede), como a escada `equipamento.flexao-por-supino`.
- **Pike:** carrega ombro e punho; cabeça abaixo do quadril. Para quem marcar ombro, fica fora. Para quem tem pressão alta (se a triagem revista do `06` for aplicada), a posição de cabeça para baixo e a força perto da falha somam pressão **[opinião; sem estudo]**: pedir respiração contínua ou deixar de fora.
- **Mergulho no banco:** carrega ombro (extensão no fim da amplitude) e cotovelo. Fica fora para quem marcar ombro, como o mergulho nas paralelas. A cadeira precisa estar travada contra a parede, sem rodinhas (`seguranca.montagem`, consenso).
- **Extensão de tríceps no chão ou na mesa:** carrega cotovelo, ombro e punho. Começa com as mãos no alto (mesa, encosto), quase em pé, e baixa o apoio para ficar mais difícil. O risco é bater a testa se o cotovelo ceder perto da falha **[opinião]**: o cartão pede para parar a 1–2 repetições da falha.
- **Elevação lateral e rosca com objeto:** carga baixa, risco baixo. O cuidado é a alça: galão com alça firme, mochila presa pelas duas alças, nada de vidro.
- **Tríceps acima da cabeça com galão:** o objeto passa por cima da cabeça. Galão de plástico, tampa bem fechada, segurado com as duas mãos pela alça **[opinião]**.

### O que fica sem resposta (P4)
- **Pike push-up:** nenhum estudo, nem de EMG, nem de hipertrofia.
- **Diamante × mãos juntas:** nenhum estudo separa as duas; também não há dado de dor no punho ou no cotovelo.
- **Mergulho no banco:** nenhum dado de lesão; só amplitude e EMG (McKenzie 2022, 13 homens experientes).
- **Extensão de tríceps com o peso do corpo:** nenhum estudo; não se sabe se a posição intermediária do ombro dá parte do ganho do tríceps acima da cabeça.
- **Objetos domésticos:** nenhum estudo; o peso da mochila é desconhecido.
- **Isometria com toalha:** nenhum estudo; não dá para medir a força nem prescrever a progressão.
- A revisão de isometria (Oranchuk 2019) tem poucos estudos e não separa músculos do braço; o estudo de isometria de flexores do cotovelo que apareceu na busca (PMID 36900849) **não teve o resumo lido** (o PubMed bloqueou) e fica NÃO VERIFICADO.

### Buscas registradas (P4)

Ver "Buscas registradas" no fim do arquivo, parte P2 e P4.

---

## Pergunta 5. Com um aparelho só, aparelho por aparelho

### 5.1 Tabela de princípios

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **O aparelho não decide o crescimento** | Máquina = peso livre; unilateral = bilateral. O que importa é o músculo, a amplitude e a proximidade da falha. | robusta (equipamento); moderada (unilateral) | Haugen 2023 (37582807); Kassiano 2025 (39794667) |
| **Qualquer carga de ~6 a ~30+ repetições serve, perto da falha** | Ver a pergunta 1. É o que permite escadas sem kg. | robusta (a faixa larga); um estudo (o piso de 20%) | Schoenfeld 2017 (28834797); Lopez 2021 (33433148); Lasevicius 2018 (29564973) |
| **Subir repetições é progressão válida** | Em treinados, progredir por repetições ≈ por carga. | um estudo | Plotkin 2022 (36199287) |
| **Variação mais difícil e unilateral como degrau** | Unilateral = bilateral em crescimento, com mais carga relativa; a escada de 10 níveis do bilateral ao unilateral funcionou em mulheres sedentárias. | moderada (a equivalência); um estudo (a escada) | Kassiano 2025; Wei 2023 (37598268) |
| **Descida lenta como degrau** | 0,5–8 s por repetição se equivalem; descida de 4 s > 1 s num ensaio. Não passar de ~8–10 s por repetição. | moderada (o intervalo); um estudo (4 s > 1 s) | Schoenfeld 2015 (25601394); Kojic 2025 (39850448) |
| **Pausa embaixo e 1,5 repetição como degrau** | Sem ensaio. | consenso | `consenso-projeto` |
| **A ordem dos degraus** | Ninguém testou a ordem de uma escada de dificuldade. | consenso | `consenso-projeto` |
| **Barra fixa: variações** | Barra tradicional, na suspensão e com toalha deram EMG igual no latíssimo, no bíceps e no deltoide posterior (15 treinados). Nenhum ensaio de hipertrofia com barra fixa. | um estudo (EMG; não mede crescimento) | Snarr et al. 2017 (28828073) |
| **Suspensão** | Programa de corpo todo na suspensão ≈ tradicional em idosos; flexão na suspensão cresceu o tríceps em 8 homens. | um estudo cada | Soligon 2020 (32700098); Kohiruimaki 2019 (31466083) |
| **Elástico** | Força ≈ pesos (moderada); hipertrofia contra controle em idosas (um estudo). **Nenhum estudo sobre como progredir o elástico** (cores, comprimento, dobrar). | um estudo (hipertrofia); consenso (a escada) | Lopes 2019; Harper 2025 (41346374) |
| **Kettlebell** | Nenhum ensaio de hipertrofia lido. Os títulos achados são de força e potência com o swing, ou de idosas com sarcopenia (NÃO VERIFICADOS). Pela equivalência de equipamento, o kettlebell funciona como um halter de kg conhecido. | consenso (por equivalência robusta) | Haugen 2023; títulos 22580981, 21107513, 30243898 (NÃO VERIFICADOS) |
| **Paralelas, bola suíça, step e banco** | Nenhum ensaio de hipertrofia achado com esses aparelhos como intervenção. | consenso | `consenso-projeto`; `mckenzie2022` (EMG do mergulho, já em `fontes.md`) |
| **Nórdico (cenário "nada", só pés presos)** | Volume alto aumenta a espessura dos posteriores. | moderada (atletas) | Cholp 2025 (41178985) |

### 5.2 Aparelho por aparelho: o que destrava e o que falta

Base: o mapa de cobertura (`docs/revisoes/equipamento-minimo/cobertura.md`) e a biblioteca de hoje (`src/domain/biblioteca/exercicios.json`). "Hoje" quer dizer exercícios que já existem; "proposta" quer dizer exercício novo, que vai para `docs/backlog.md` com ficha e cartão de texto (sem animação até ser aprovada).

| Aparelho | O que destrava hoje (padrão → músculos) | O que ainda falta | Proposta de exercício novo **[opinião]** |
|---|---|---|---|
| **Nada** (chão, parede, cadeira) | empurrar horizontal (flexão → peito, tríceps); agachar e afundo (agachamento, afundo, búlgaro → quadríceps, glúteo); extensão de quadril (ponte); panturrilha no chão; abdominal no chão | **costas, posteriores, bíceps, ombro lateral e posterior: 0 exercício** | nórdico com os pés presos sob um móvel pesado (posteriores; moderada); flexão de joelho deslizando com toalha no chão liso (posteriores; consenso); flexão fechada (tríceps; consenso); flexão com o quadril alto, tipo "pike" (ombro anterior; consenso). Remada sob mesa: só com aviso forte de montagem (`seguranca.montagem`), porque a mesa pode virar (consenso) |
| **Barra fixa de porta** | puxar vertical (barra pronada e supinada → costas, bíceps); abdômen (elevação de joelhos) | puxar horizontal; ombros; posteriores; nada de bíceps ou tríceps isolado | barra australiana com a barra de porta no batente de baixo, **se o modelo permitir** (consenso; muitas barras de porta não aguentam essa posição: NÃO VERIFICADO) |
| **Elásticos** (N intensidades) | quase tudo: 19 exercícios (empurrar, puxar vertical e horizontal, ombros, bíceps, tríceps acima da cabeça, agachar, dobrar o quadril, flexão de joelho) | panturrilha com carga; peito alongado de verdade (o crucifixo com elástico perde tensão no alongamento, por biomecânica: consenso) | nenhum novo; o que falta é a escada (seção 5.3) |
| **Halteres sem banco** | supino no chão, remadas curvadas, crucifixo invertido curvado, ponte com halter, goblet, agachamento, afundos, stiff, roscas, francês, elevação lateral, desenvolvimento unilateral | puxar vertical; flexão de joelho; peito na posição alongada (o supino no chão corta a descida) | crucifixo no chão (consenso; mesma limitação de amplitude) |
| **Kettlebell** (1 peso ou poucos) | só o goblet com kettlebell | quase tudo que o halter faria com um peso só | **tratar o kettlebell como halter para os exercícios unilaterais e com um peso só** (goblet, remada unilateral curvada, stiff unilateral, afundo segurando no peito, desenvolvimento unilateral, ponte com peso). Consenso, pela equivalência robusta de equipamento. Hoje o kettlebell abre 1 exercício: é a maior perda barata do cenário |
| **Suspensão** | só a remada na suspensão | empurrar, bíceps, tríceps, posteriores, ombro posterior | flexão na suspensão (um estudo, Kohiruimaki 2019); rosca na suspensão; tríceps na suspensão; "Y" ou "T" na suspensão para o ombro posterior; flexão de joelho na suspensão; búlgaro com o pé de trás na alça. Todos consenso, salvo a flexão |
| **Paralelas** | mergulho (peito e tríceps) | costas, pernas além do peso do corpo, braços isolados | elevação de joelhos nas paralelas (abdômen, consenso); remada invertida embaixo das paralelas, se forem baixas e fixas (consenso) |
| **Bola suíça** | flexão de joelho na bola (posteriores) | costas, braços | ponte com os pés na bola (consenso); abdominal na bola (consenso) |
| **Step** | panturrilha unilateral e bilateral no step (alongado; um estudo em `kassiano2023b`) | costas, braços, posteriores | subida no step (quadríceps e glúteo; consenso); flexão inclinada e declinada no step (já é degrau da flexão); búlgaro com o pé de trás no step |
| **Banco só** | o banco sozinho não abre exercício novo de carga: dá apoio para o búlgaro, a flexão inclinada e declinada e o abdominal declinado (se declinável) | costas, braços | hip thrust com o peso do corpo (ombros no banco; consenso); mergulho no banco **só com aviso de ombro** (`selecao.mergulho` pede intermediário; o mergulho no banco força a extensão do ombro: consenso, sem estudo lido) |

### 5.3 A escada própria de cada exercício

**Como ler:** cada degrau é uma variação ou técnica. Em cada degrau vale a faixa indicada: a pessoa sobe de degrau quando todas as séries chegam ao topo da faixa (a dupla progressão de hoje). Ao subir, as repetições caem para perto do começo da faixa. O selo de cada degrau é **consenso**, salvo onde está escrito: ninguém testou nenhuma dessas ordens. O que tem evidência é o princípio de que cada degrau mantém a série perto da falha dentro de ~6–30 repetições (moderada a robusta).

**Fim de escada (todas):** no último degrau, quando a 1ª série passa de 30 repetições em 2 sessões, aparece o aviso da seção 1.2 (consenso) e a sugestão de carga externa.

| Exercício (id) | Escada | Faixa por degrau (proposta) | Selo |
|---|---|---|---|
| **Flexão** (`flexao`) | 1) inclinada alta (mãos na parede ou na bancada) → 2) inclinada baixa (mãos na cadeira ou no step) → 3) de joelhos → 4) no chão → 5) descida de 3 s → 6) pés elevados (declinada) → 7) déficit (mãos em apoios) ou pausa de 2 s embaixo → 8) com elástico nas costas (se houver) → 9) com mochila | 8–15 | um estudo para "flexão ≈ supino" (`kikuchi2017`); consenso para a ordem. A ordem aprovada em `equipamento.flexao-por-supino` (inclinada → chão → declinada → com elástico → déficit ou pausa) fica, com mais degraus entre eles. A flexão é relativamente mais pesada para as mulheres (um estudo, `alizadeh2020`); **o app não pergunta o sexo** (decisão do Gustavo), então o ponto de partida fica com a 1ª série de cada exercício (ver "Divergências") |
| **Agachamento** (`agachamento-peso-corpo`) | 1) agachamento até uma cadeira → 2) livre, profundo → 3) descida de 3 s → 4) pausa de 2 s embaixo → 5) afundo para trás → 6) búlgaro → 7) búlgaro com descida de 3 s → 8) agachamento unilateral até a cadeira → 9) com mochila | 12–20 (degraus 1–4); depois os do afundo e do búlgaro | consenso; o bilateral → unilateral tem um estudo (`wei2023`) |
| **Afundo** (`afundo-peso-corpo`) | 1) afundo estático com apoio de mão → 2) sem apoio → 3) para trás → 4) descida de 3 s → 5) búlgaro → 6) pé da frente elevado no step (déficit) → 7) búlgaro com pausa embaixo → 8) com mochila | 10–16 por perna | consenso |
| **Búlgaro** (`bulgaro-peso-corpo`) | 1) búlgaro → 2) descida de 3 s → 3) pausa de 2 s embaixo → 4) pé da frente num apoio baixo (mais amplitude) → 5) 1,5 repetição → 6) com mochila ou halter | 8–15 por perna | consenso (o búlgaro com carga tem um estudo de hipertrofia, `bulgaro2026`, NÃO VERIFICADO na autoria) |
| **Ponte de glúteo** (`ponte-gluteo`) | 1) ponte bilateral → 2) pausa de 2 s no alto → 3) hip thrust com os ombros num apoio (sofá, banco) → 4) ponte unilateral → 5) hip thrust unilateral → 6) com mochila sobre o quadril | 12–20 | consenso |
| **Nórdico** (proposta) | 1) só a descida, com as mãos amortecendo → 2) descida de 3–5 s até onde controla → 3) descida completa → 4) descida e subida empurrando com as mãos → 5) completo | 4–8 (muito pesado); 2–3 séries | moderada para "o nórdico cresce os posteriores" (`cholp2025`); consenso para a escada e a faixa. Com volume alto (~2–3 séries de 8–12, 2–3 vezes por semana), os estudos em atletas viram crescimento; a faixa de 4–8 por série, com mais séries, é escolha do projeto. Começar baixo é consenso de segurança |
| **Panturrilha** (`panturrilha-chao`, `panturrilha`, `panturrilha-bilateral-step`) | 1) bilateral no chão → 2) bilateral no step (calcanhar abaixo) → 3) pausa de 2 s embaixo, alongada → 4) unilateral no step → 5) unilateral com pausa → 6) com mochila ou halter | 12–20 | um estudo para a ênfase no alongamento (`kassiano2023b`); consenso para a ordem |
| **Abdominal** (`abdominal-chao`) | 1) crunch → 2) descida de 3 s → 3) braços acima da cabeça → 4) pausa de 2 s em cima → 5) com peso no peito | 12–20 | consenso |
| **Barra fixa** (`barra-fixa`, `barra-fixa-supinada`) | 1) pendurar com as escápulas ativas (tempo, 20–30 s) → 2) negativa de 3–5 s (pulando para o alto) → 3) assistida com elástico (do mais forte ao mais fraco; se houver) ou com um pé na cadeira → 4) completa → 5) descida de 3 s → 6) pausa de 1 s em cima → 7) com mochila | negativas 3–6; assistida e completa 5–10 | consenso; não achei ensaio de hipertrofia com barra fixa nem com negativas (`snarr2017` é só EMG) |
| **Remada na suspensão** (`remada-suspensao`) e **remada invertida** (`remada-invertida`) | 1) corpo quase em pé (pés atrás do ponto de apoio) → 2) pés embaixo do ponto de apoio → 3) pés à frente (corpo mais horizontal) → 4) pausa de 2 s com as mãos no peito → 5) descida de 3 s → 6) pés elevados → 7) unilateral (só suspensão) | 8–15 | consenso; a suspensão tem um estudo em idosos (`soligon2020`) |
| **Mergulho** (`mergulho`) | 1) com os pés apoiados no chão ou num banco à frente → 2) negativa de 3 s → 3) assistido com elástico (se houver) → 4) completo → 5) pausa embaixo → 6) com mochila | 6–12 | consenso; o mergulho só para intermediário e avançado (`selecao.mergulho`) |
| **Flexão de joelho na bola** (`flexao-bola`) | 1) ponte isométrica com os pés na bola → 2) só a volta lenta (excêntrica, rolando a bola para longe) → 3) bilateral completa → 4) pausa de 2 s dobrada → 5) unilateral | 8–15 | consenso; não achei estudo de hipertrofia com a flexão na bola |
| **Elevação de joelhos** (`elevacao-joelhos`) | 1) joelhos até o quadril → 2) joelhos ao peito → 3) descida de 3 s → 4) pernas estendidas | 8–15 | consenso |
| **Elásticos** (todos os `*-elastico`) | para cada intensidade k, de 1 a N: a) comprimento normal → b) encurtado (um passo mais longe da âncora ou a mão mais perto do elástico) → c) intensidade k + 1. No fim: d) a mais forte encurtada → e) descida de 3 s → f) pausa de 2 s na posição de mais tensão → g) dois elásticos juntos (se N ≥ 2) → h) sugerir um elástico mais forte | compostos 10–16; isoladores 12–20 | um estudo para "o elástico cresce o músculo" (`harper2025`, idosas); consenso para toda a escada. Não achei estudo sobre quanto cada cor ou comprimento aumenta a tensão |
| **Kettlebell com um peso só** (`goblet-kettlebell` e os propostos) | os mesmos degraus da `equipamento.escada-carga-leve` de hoje: repetições → unilateral (goblet → afundo com o kettlebell no peito → búlgaro com o kettlebell) → descida de 3 s → pausa → sugerir outro peso | a do exercício | consenso |

### 5.4 As faixas largas: por que a escada não anda e o que a evidência permite

**O problema [medido em `docs/revisoes/equipamento-minimo/progressao.md`, gerado por script do repositório]:** a dupla progressão só sobe de degrau com todas as séries no topo, no RIR alvo, em 2 sessões seguidas. Com 3 séries, a 1ª precisa passar do topo (8 → 22 na flexão de 8–20). Numa faixa de 12 a 15 repetições de largura, isso dá 16 semanas sem subir na maioria dos exercícios.

**O que a evidência permite:**
- **Qualquer faixa entre ~6 e ~30 repetições, perto da falha, rende a mesma hipertrofia** (robusta para a equivalência de cargas; moderada em treinados).
- **O piso de esforço importa mais que o número:** com carga baixa, a série que para longe da falha não cresce (um estudo, `lasevicius2022`). Por isso as faixas com meio ≥ 15 pedem RIR 0–2 (`rir.carga-baixa`, que já existe).
- **A largura da faixa não tem estudo.** Nenhum ensaio comparou uma faixa de 8–12 com uma de 8–20 na mesma progressão. É escolha do projeto (consenso).

**Proposta [opinião, consenso]:**
1. **Faixas de 5 a 8 repetições de largura** em cada degrau (tabela da seção 5.3), em vez de 12 a 15. A largura deve ser aproximadamente o que um degrau tira de repetições: se o degrau seguinte é ~15–20% mais difícil, ele tira ~4–6 repetições na região de 10–15RM **[estimativa pela fórmula de Brzycki, válida só até ~10 repetições: `mayhew1995`; acima disso, as fórmulas divergem, `docs/pesquisa-v2/07`]**. Com isso, um degrau nunca joga a pessoa abaixo do piso da faixa nova.
2. **Topo da faixa nunca acima de 20** nos degraus intermediários; o 30 fica só como gatilho do fim de escada (`reps.teto.carga-limitada`).
3. **Critério de subida para o tipo "degrau"** **[opinião]**: a 1ª série no topo e as outras a no máximo 2 repetições do topo, em 2 sessões seguidas. Para o peso do corpo, a fadiga entre as séries derruba mais as repetições do que no kg, e o RIR erra mais acima de 12 repetições (`halperin2022`). Isso é consenso; ninguém testou um critério de subida contra outro.
4. **O degrau substitui a faixa larga:** em vez de "flexão 8–20", "flexão: degrau d, 8–15". O registro guarda o degrau e as repetições, e a sugestão diz o degrau seguinte pelo nome ("agora: pés no step").

| Exercício | Faixa de hoje | Faixa proposta por degrau | Selo |
|---|---|---|---|
| Flexão, flexão com elástico | 8–20 | 8–15 | consenso |
| Agachamento com o peso do corpo | 15–30 | 12–20 | consenso |
| Afundo com o peso do corpo | 12–25 | 10–16 por perna | consenso |
| Búlgaro com o peso do corpo | 10–20 | 8–15 por perna | consenso |
| Ponte de glúteo | 12–25 | 12–20 | consenso |
| Abdominal no chão | 12–25 | 12–20 | consenso |
| Agachamento com elástico | 12–25 | 10–16 | consenso |
| Elásticos compostos (remada, puxada, desenvolvimento, stiff) | 10–20 ou 12–20 | 10–16 | consenso |
| Elásticos isoladores (rosca, tríceps, elevação lateral, crucifixo, flexão de joelho) | 12–20 | 12–20 (mantém; o degrau "encurtar" é pequeno) | consenso |
| Face pull com elástico | 15–25 | 12–20 | consenso |
| Barra fixa | 6–12 | 5–10 (completa); 3–6 (negativa) | consenso |
| Remada invertida, remada na suspensão | 8–15 | 8–15 (mantém) | consenso |
| Mergulho | 6–12 | 6–12 (mantém) | consenso |
| Flexão de joelho na bola | 8–15 | 8–15 (mantém) | consenso |

### 5.5 Quanto o elástico tem de evidência de hipertrofia
- **Contra pesos, em adultos jovens:** nenhum ensaio achado (nem na v1, nem agora). `lopes2019` é força.
- **Contra controle:** um ensaio em 34 mulheres idosas não treinadas, 6 semanas: a área de secção do quadríceps e dos flexores do cotovelo cresceu (Harper 2025). Os outros ensaios com elástico e medida de músculo que apareceram são com restrição de fluxo (fora do app) ou em idosos com suplemento (não lidos).
- **Força:** elástico ≈ pesos (8 estudos, `lopes2019`); efeito grande em idosos (`martins2013`); resistência variável ≈ tradicional (`andersen2022`).
- **Inferência:** a hipertrofia não depende da carga quando a série chega perto da falha (robusta), e o elástico é uma carga como outra.
- **Selo proposto para o texto do app:** "um estudo (em idosas) e inferência pela equivalência de cargas". O texto de hoje, "moderada para força; inferência para hipertrofia", pode passar a "moderada para força; um estudo para hipertrofia, em idosas".

### 5.6 O que fica sem resposta
- **Nenhuma escada de dificuldade foi testada** como ordem: nem a da flexão, nem a da barra, nem a do elástico. Todas são consenso.
- **Quanto cada degrau aumenta a carga** (fração do peso do corpo por variação; tensão por cor e comprimento do elástico): não li nenhum estudo que meça isso nesta sessão. Sem isso, a largura das faixas é estimativa.
- **Barra fixa, mergulho, kettlebell, bola, step e banco:** nenhum ensaio de hipertrofia.
- **Barra fixa de porta como barra baixa:** depende do modelo; nenhum dado.
- **Nórdico em não atletas e em mulheres:** a meta-análise é de jogadores de futebol.
- **Resumos que não abriram (NÃO VERIFICADO):** kettlebell em idosas com sarcopenia (30243898); kettlebell no trabalho (21107513); swing e força (22580981, só título); perda de velocidade na barra fixa (32213783, só título).

### 5.7 Buscas registradas (PubMed, 03/11/2026)
| Termos | Resultados úteis |
|---|---|
| `pull-up training hypertrophy` | 0 de hipertrofia; 1 de EMG (Snarr 2017) |
| `chin-up pull-up training program` | busca não respondeu (página anti-robô) |
| `pull-up training intervention strength` | 1 título (32213783, perda de velocidade; não lido) |
| `lat pulldown pull-up training comparison` | busca não respondeu |
| `inverted row training strength` | 0 de treino; só EMG já conhecida (`fenwick2009`, `aguileracastells2020`, `rabello2024`) |
| `kettlebell training muscle hypertrophy` | 0 |
| `kettlebell training randomized strength` | 4 títulos de força, potência e idosas (não lidos) |
| `gymnastic rings training` | 0 (ginástica de elite) |
| `step-up exercise training` | 0 de hipertrofia; EMG de glúteo (`krauseneto2020`, já em `fontes.md`) |
| `stability ball leg curl` | 0 |
| `pike push-up OR handstand push-up` | 0 |
| `single leg squat pistol electromyography` | busca não respondeu |
| `Nordic hamstring muscle thickness` | 1 meta-análise (Cholp 2025) |

---


---

## Pergunta 6. Segurança e triagem nesses exercícios

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **Lesão em casa com estes exercícios** | Não achei dado de lesão com nórdico, flexão deslizante, ponte, búlgaro sem peso, pike, mergulho na cadeira ou superman. Na musculação em geral, a maior parte dos atendimentos em pronto-socorro é acidente (peso que cai, queda, pancada), não sobrecarga. | consenso, com apoio descritivo | `kerr2010`; `coffey2026`; `keogh2017` |
| **Móveis que tombam ou escorregam** | Só achei dados de crianças nos EUA: lesões por móvel e TV que tombam (1990–2019) e lesões com cadeiras e cadeirões, a maioria por queda (2003–2010). Não li os resumos e não achei dados de adultos usando móvel para treinar. | consenso | NÃO VERIFICADOS: 34446115; 24322954 |
| **Joelho no búlgaro** | Não achei estudo que meça a carga na patela no búlgaro. Num estudo de carga patelofemoral em 35 exercícios (NÃO VERIFICADO), o búlgaro aparece entre os de flexão profunda do joelho. **[opinião]** Com o peso do corpo, a carga é baixa. A dor no joelho segue a regra de dor do app (reduzir a amplitude, trocar). Não há ângulo "proibido" (`06`, seção 7). | consenso | NÃO VERIFICADO: 37272685; `seguranca.dor.escala` |
| **Joelho e posteriores no nórdico** | Os joelhos ficam apoiados no chão, sob o peso do corpo. A 1ª sessão causa dor tardia e perda de força por alguns dias (Coratella 2025), e subir o volume rápido aumenta a dor (Behan 2023). A versão assistida dói menos (Ishøi 2025). Não achei dado de distensão causada pelo próprio nórdico. | um estudo (dor e dano); consenso (o resto) | Coratella 2025; Behan 2023; Ishøi 2025 |
| **Punho na flexão** | Num estudo em punhos de cadáver (NÃO VERIFICADO), a flexão com o punho estendido aumentou a pressão em uma parte do punho. Um estudo antigo de plataforma de força (NÃO VERIFICADO) descreve a flexão com os punhos fechados. Não achei ensaio que compare as pegadas em pessoas com dor. A pegada da mão muda a EMG de peito e tríceps (NÃO VERIFICADO), o que não mede crescimento. | consenso | NÃO VERIFICADOS: 29157783; 7676844; 16095413 |
| **Ombro no pike** | Não achei estudo de EMG nem de lesão com o pike. **[opinião]** É um empurrar vertical com as mãos no chão: carrega ombro, cotovelo e punho (punho estendido, como na flexão). | consenso | — |
| **Ombro no mergulho na cadeira** | Em 13 homens experientes, o mergulho no banco trabalhou sobretudo o tríceps, mas **pediu mais extensão do ombro** que o nas paralelas e nas argolas. Os autores apontam implicações para quem tem histórico de dor ou lesão no ombro. | um estudo (cinemática e EMG) | McKenzie et al. 2022 (`mckenzie2022`, resumo relido nesta sessão) |
| **Lombar no superman e na extensão de tronco deitado** | Callaghan, Gunning e McGill 1998 (*Phys Ther*; NÃO VERIFICADO, PMID não anotado) teriam achado carga na lombar mais alta na extensão de tronco completa, maior com o braço oposto levantado junto, e baixa na extensão de uma perna só. Só vi isso num resultado de busca. Há EMG de exercícios de reabilitação lombar (NÃO VERIFICADO). | consenso (até a leitura) | NÃO VERIFICADOS: Callaghan 1998; 19195137; 39767514 |
| **Triagem** | Nada muda na triagem. A região marcada com dor acima de 5 tira os exercícios que a carregam (`seguranca.dor.programa`). Isso só funciona se o campo `articulacoes` estiver certo (tabela abaixo). | consenso | `seguranca.dor.programa`; `tests/unit/articulacoes.test.ts` |

### O que fica sem resposta (P6)
- Não há dados de lesão para nenhum dos exercícios candidatos, nem de adultos com móveis usados para treinar.
- Para o punho, só há estudo em cadáver e de plataforma de força (os dois NÃO VERIFICADOS). Não há ensaio em pessoas com dor.
- A carga lombar do superman depende da leitura do Callaghan 1998 (PMID a conferir).
- A carga no joelho no búlgaro e no nórdico não foi medida em casa nem com o peso do corpo.

---


### 6.1 Articulações e montagem segura de cada exercício candidato

**Como o teste decide:** `tests/unit/articulacoes.test.ts` exige que cada exercício marque **pelo menos** as articulações do seu padrão (`ESPERADAS`). Mais articulações são permitidas. A coluna "a mais" é o que eu acrescentaria **[opinião]**, seguindo a lógica do arquivo: uma articulação carrega quando o movimento a dobra ou estende sob carga, ou quando o músculo que trabalha a cruza. A biblioteca já marca o `punho` na flexão.

| Exercício (id proposto) | Padrão → mínimo do teste | A mais [opinião] | Articulações a marcar | Montagem segura no cartão (sugestão) |
|---|---|---|---|---|
| `nordico` | `flexao-joelho` → joelho | — | joelho | "Prenda os calcanhares sob um sofá ou cama pesados, ou peça para alguém segurar seus tornozelos. Antes da 1ª repetição, puxe com força e confira que nada se mexe. Ponha uma almofada sob os joelhos. Deixe espaço livre à frente e use as mãos para aparar a descida, como numa flexão." |
| `flexao-joelho-deslizante` | `flexao-joelho` → joelho | — (igual à `flexao-bola`) | joelho | "Use piso liso, longe de tapetes e de quinas. Toalha sob os calcanhares, ou meias. Se escorregar demais, faça com uma perna de cada vez e mais devagar." |
| `ponte-unilateral` | `extensao-quadril` → quadril | — | quadril | "Faça num colchonete ou num tapete que não escorrega." |
| `ponte-pes-elevados` | `extensao-quadril` → quadril | joelho (posteriores no joelho) | quadril, joelho | "Calcanhares num sofá ou cadeira firme, encostada na parede e sem rodinhas. Cadeira dobrável não serve." |
| `stiff-unilateral-peso-corpo` | `dobrar-quadril` → quadril, lombar | — | quadril, lombar | "Fique perto de uma parede ou cadeira para apoiar a mão se perder o equilíbrio." |
| `afundo-tras-peso-corpo` | `afundo` → joelho, quadril | — | joelho, quadril | "Abra espaço atrás de você e tire tapetes soltos do caminho." |
| `bulgaro-peso-corpo` (já existe) | `afundo` → joelho, quadril | — | joelho, quadril (já marca) | "Pé de trás num sofá ou cadeira firme, encostada na parede e sem rodinhas. Se o joelho da frente doer, desça menos." |
| `step-up-cadeira` | `afundo` → joelho, quadril | — | joelho, quadril | "Use uma cadeira firme e sem rodinhas, encostada na parede, ou um degrau de escada. Pise com o pé inteiro no assento. Cadeira dobrável ou com rodinhas não serve." |
| `panturrilha-unilateral-degrau` | `panturrilha` → tornozelo | — | tornozelo | "Ponta do pé na borda de um degrau firme, com a mão no corrimão ou na parede." |
| `remada-invertida-mesa` | `puxar-h` → ombro, cotovelo | — | ombro, cotovelo | "Só numa mesa pesada e firme, de madeira maciça, com tampo preso e sem vidro. Deite embaixo, segure a borda e teste primeiro com metade do peso: se a mesa levantar ou balançar, não use. Mesa dobrável ou de vidro, nunca." |
| `remada-porta-toalha` | `puxar-h` → ombro, cotovelo | punho (a pegada na toalha) | ombro, cotovelo, punho | "Passe a toalha por cima da porta e tranque a porta. Fique do lado para o qual a porta não abre, para puxar contra o batente. Use uma toalha grossa, sem rasgos, e teste puxando de leve antes da série." |
| `extensao-tronco-chao` (superman) | sem padrão próprio; proponho `dobrar-quadril` → quadril, lombar | — | quadril, lombar | "Faça num colchonete. Comece levantando só uma perna, ou um braço e a perna oposta; os dois braços e as duas pernas juntos ficam para depois." |
| `y-t-w-chao` | `isolador-ombro-posterior` → ombro | lombar (tronco estendido parado) | ombro, lombar | "Deite de bruços num colchonete, com a testa numa toalha dobrada." |
| `pike` | `empurrar-v` → ombro, cotovelo | punho (como a flexão) | ombro, cotovelo, punho | "Mãos num piso que não escorrega. Se os pés estiverem num degrau ou sofá, comece baixo. Com dor no punho, apoie as mãos fechadas numa toalha dobrada." |
| `flexao-fechada` | `empurrar-h` → ombro, cotovelo | punho (como a `flexao`) | ombro, cotovelo, punho | "Com dor no punho, faça com as mãos fechadas numa toalha dobrada, segurando dois halteres como pegadores, ou com as mãos numa mesa firme (mais fácil)." |
| `mergulho-cadeira` | `empurrar-h` (como o `mergulho`) → ombro, cotovelo | punho (o punho estendido na borda) | ombro, cotovelo, punho | "Cadeira pesada, sem rodinhas, encostada na parede. Desça só até onde o ombro fica confortável, sem dor na frente do ombro." |
| `nordico-invertido` | `isolador-quadriceps` → joelho | — | joelho | "Almofada sob os joelhos. Comece com uma descida curta e só aumente a amplitude se o joelho não doer." |

**Cartão `seguranca.montagem` para casa [opinião; consenso com `kerr2010` e `coffey2026`]:** um texto comum para todo exercício que usa móvel: "Móvel de casa não foi feito para treino. Antes da 1ª série, empurre e puxe para ver se ele escorrega, balança ou levanta. Cadeira dobrável, com rodinhas ou de plástico fino, e mesa dobrável ou de vidro, não servem."

---

## Pergunta 7. Vídeos como referência visual

> **Todos:** referência visual de movimento, **não fonte de regra; não assistido nesta sessão**. A rede bloqueou youtube.com e e3rehab.com para leitura direta (WebFetch e curl recusados). A coluna "Canal" diz como ele foi identificado: "no título" quando o título nomeia a pessoa; "pela busca" quando o resultado da busca o atribuía; "não confirmado" quando nenhum dos dois. Sugestão: o Gustavo confere o canal ao abrir. Nenhum vídeo apoia regra nem número.

| Exercício | Canal | Título | URL |
|---|---|---|---|
| Nórdico | E3 Rehab (pela busca; o artigo do site tem o mesmo título) | How to Set Up, Perform, & Program Nordic Hamstring Curls (Progressions…) | https://www.youtube.com/watch?v=_e9vFU9-tkc |
| Nórdico (montagem sem parceiro) | não confirmado | 3 Simple Ways to Setup Nordic Hamstring Curls (Without a Partner) | https://www.youtube.com/watch?v=9XOaewLMMrs |
| Flexão de joelho deslizante | The Prehab Guys (biblioteca de vídeos, no Vimeo) | Single Leg Hamstring Curl – Slider | https://library.theprehabguys.com/vimeo-video/single-leg-hamstring-curl-slider/ |
| Flexão de joelho deslizante | não confirmado | Towel Hamstring Curls | https://www.youtube.com/watch?v=cWSsWpuxmYM |
| Ponte unilateral | Bret Contreras (no título) | Glute Bridges with Bret Contreras | https://www.youtube.com/watch?v=yN-SNtUzHYM |
| Ponte com os pés elevados | não confirmado (apareceu na busca por Bret Contreras) | 1-legged foot elevated glute bridge | https://www.youtube.com/watch?v=t5D6ktqa_mY |
| Ponte com os pés elevados | não confirmado | Feet elevated glute bridge | https://www.youtube.com/watch?v=V-GsfUFOsNg |
| Stiff unilateral sem peso | Mark Wildman (no título) | Bodyweight Single Leg RDL by Mark Wildman | https://www.youtube.com/watch?v=PcflnHs334Q |
| Stiff unilateral sem peso | não confirmado | Bodyweight Single Leg RDL (Exercise Library) | https://www.youtube.com/watch?v=DPFnfAUCvTA |
| Remada invertida na mesa | não confirmado | Stronger Back at Home! How to Do Inverted Rows with a Table | https://www.youtube.com/watch?v=6NTruShwwKk |
| Remada invertida (progressões) | não confirmado | Inverted Rows (Beginner to Advanced Progressions) | https://www.youtube.com/watch?v=Fl0UMfdEzsE |
| Remada na porta com toalha | não confirmado | Towel Rows (ring rows) - Quarantine Workout Tip | https://www.youtube.com/watch?v=w1bhwu3jNso |
| Remada na porta com toalha | não confirmado | How To Do a Row at Home (no equipment required) | https://www.youtube.com/watch?v=hfGD-K11vPk |
| Extensão de tronco deitado (superman) | não confirmado | Superman Exercise- Physical Therapy Back Strengthening Exercises | https://www.youtube.com/watch?v=STvo35VczKI |
| Y-T-W no chão | não confirmado | Y-Raise A.K.A. Prone V-Raise - Lower Trapezius Strengthening Exercise | https://www.youtube.com/watch?v=juoKsTqy77E |
| Pike push-up | FitnessFAQs (Daniel Vadnal), pela busca | Are You Doing Pike Push-Ups Correctly? | https://www.youtube.com/watch?v=eN6uwRVdNyY |
| Pike push-up | FitnessFAQs, pela busca | The Forgotten Exercise For Bigger Shoulders | https://m.youtube.com/watch?v=Tq1nYz7U5os |
| Flexão fechada | não confirmado | Triceps FOCUSED Push Up Variation (Close Grip Push Up) | https://www.youtube.com/watch?v=aWixj7ey758 |
| Flexão fechada | não confirmado | Close-Grip Push Ups | https://www.youtube.com/watch?v=r8swN_LqR14 |
| Mergulho na cadeira | não confirmado | How to do a chair dip safely and correctly triceps and shoulders | https://www.youtube.com/watch?v=o3W5yCJnqxg |
| Mergulho na cadeira | não confirmado | How to Do Chair Dips Correctly (Fix These Mistakes for Bigger Triceps) | https://www.youtube.com/watch?v=Ix8SLOzmC38 |
| Afundo para trás sem peso | Runna, pela busca | Reverse Bodyweight Lunge Exercise Tutorial - Proper Form | https://m.youtube.com/watch?v=HXs8u1251ss |
| Afundo para trás sem peso | não confirmado | Reverse Lunge Form for Beginners (Step-by-Step) | https://www.youtube.com/watch?v=ALl174GTuoY |
| Step-up na cadeira | não confirmado | Step-Ups onto a Chair, Box or Bench | https://www.youtube.com/watch?v=N57dZbDs1EY |
| Step-up na cadeira | não confirmado | Exercise Tutorial - Step Up to Chair | https://www.youtube.com/watch?v=aajhW7DD1EA |
| Panturrilha unilateral no degrau | Renaissance Periodization, por um catálogo de terceiros (vídeo geral de panturrilha) | 8 Calf Raise Mistakes and How to Fix Them | https://www.youtube.com/watch?v=Xa18jxyeSnM |
| Panturrilha unilateral no degrau | não confirmado | How To Do A Single Leg Calf Raise | https://www.youtube.com/watch?v=IphGZ8OlfYg |
| Nórdico invertido (extra) | provável E3 Rehab (mesmo formato de título; não confirmado) | How to Safely Set Up, Perform, & Program Reverse Nordics (Progressions…) | https://www.youtube.com/watch?v=PvJDjcfZe1c |
| Búlgaro com dor no joelho (extra) | não confirmado | How To Eliminate Knee Pain In The Split Squat: Try These Adjustments | https://www.youtube.com/watch?v=yHvF3BVUII8 |

**Sem vídeo de canal reconhecido confirmado:** flexão deslizante no YouTube, remadas na mesa e na porta, superman e Y-T-W, flexão fechada, mergulho na cadeira, step-up e panturrilha unilateral. As buscas por Jeff Nippard, Squat University, Athlean-X, Jeremy Ethier, Hybrid Calisthenics e RP com esses exercícios não devolveram vídeo atribuível. Para fechar a lista, é preciso liberar youtube.com na rede da sessão ou o Gustavo procurar no próprio canal.

---


## Exercícios candidatos

Juntos, das três frentes. A decisão de quais entram é do Gustavo; a lista priorizada, com o efeito estimado nos números da Parte A, está no relatório.

### Tronco e braços (P2 e P4)

`requer`: `apoio` é o peso do corpo (sempre presente). Quando o exercício pede algo que o app **não vê** na foto nem no inventário (mesa, porta, toalha, objeto), isso vai na coluna como **"não visto"**. Proposta **[opinião]**: uma capacidade declarada, como `carga_improvisada` (garrafa, galão, mochila), marcada pela pessoa num checklist, sem foto. Articulações no vocabulário da biblioteca.

| id sugerido | Nome (pt-BR) | Primários / secundários | `requer` | Articulações | Faixa | Compl. | Selo | Recomendação | Por quê |
|---|---|---|---|---|---|---|---|---|---|
| `remada-unilateral-objeto` | Remada unilateral com mochila ou galão | costas / biceps, ombro_posterior | `apoio` + **não visto**: objeto com peso (`carga_improvisada`); mão livre numa cadeira ou sofá | ombro, cotovelo, lombar | 10–30 | 1 | consenso (objeto = halter); robusta (carga baixa até a falha) | **entra** (nível 3 do puxar horizontal e do puxar vertical sem puxada) | É a única remada sem ancoragem; tira as costas do zero. Apoio da mão livre reduz a carga lombar **[opinião; Fenwick 2009 mediu a remada curvada sem apoio, que teve a maior carga lombar]** |
| `remada-invertida-mesa` | Remada invertida embaixo da mesa | costas / biceps, ombro_posterior | `apoio` + **não visto**: mesa | ombro, cotovelo | 8–20 | 2 | consenso (EMG da remada invertida na barra: um estudo; mesa: sem estudo) | **não entra** como prescrição; no máximo um texto "se você tiver uma barra baixa firme" | O app não consegue verificar a mesa, e a falha (mesa que vira ou quebra) cai em cima do rosto. Sem estudo de segurança |
| `remada-porta-toalha` | Remada na porta com toalha | costas / biceps, ombro_posterior | `apoio` + **não visto**: porta, toalha | ombro, cotovelo, punho | 10–20 | 2 | consenso | **não entra** | Sem estudo; a carga depende de maçaneta e fechadura; queda para trás. A dificuldade não é graduável de forma confiável **[opinião]** |
| `superman` | Extensão de tronco deitado ("superman") | (eretores da coluna; não é `costas`) / gluteos | `apoio` | lombar | 10–20 | 1 | um estudo (EMG: ativa menos o latíssimo que a remada invertida) | **não entra** no volume de costas | Não cobre o latíssimo nem o trapézio; contar como costas esconderia a lacuna |
| `ytw-deitado` | Y-T-W deitado de bruços (com garrafas, se houver) | ombro_posterior / costas (trapézio) | `apoio` (+ `carga_improvisada` opcional) | ombro | 12–30 | 1 | consenso | **só alternativa** para ombro posterior, e só com garrafas; não conta para costas | Sem carga, quem é treinado não chega perto da falha em 30 repetições **[opinião]**; com garrafas vira um crucifixo invertido leve |
| `crucifixo-invertido-objeto` | Crucifixo invertido inclinado com garrafas | ombro_posterior / — | `apoio` + `carga_improvisada` | ombro, lombar | 12–30 | 1 | consenso | **entra** (nível 3 do ombro posterior) | Mesmo movimento do `crucifixo-invertido-curvado`, com carga conhecida (1 L ≈ 1 kg) |
| `pike` | Flexão em V invertido (pike push-up) | ombro_anterior / triceps, peito | `apoio` | ombro, cotovelo, punho | 6–15 | 2 | consenso | **só alternativa** (empurrar vertical, que já é opcional) | Sem estudo; ombro anterior já vem dos empurrares; útil quando o ombro é prioridade |
| `pike-pes-elevados` | Pike com os pés na cadeira | ombro_anterior / triceps | `apoio` + **não visto**: cadeira | ombro, cotovelo, punho | 5–12 | 3 | consenso | **só alternativa** (intermediário e avançado; degrau seguinte ao `pike`) | Sem estudo; mais carga no ombro e cabeça mais baixa; cadeira encostada na parede |
| `flexao-fechada` | Flexão com as mãos juntas | triceps, peito / ombro_anterior | `apoio` | ombro, cotovelo, punho | 6–20 | 1 | moderada (EMG: ativa mais o tríceps); um estudo (flexão cresce o tríceps) | **entra** (tríceps complemento, nível 2, e empurrar horizontal) | Cobre o tríceps sem equipamento e sem a extensão de ombro do mergulho |
| `mergulho-banco` | Mergulho no banco ou na cadeira | triceps / peito, ombro_anterior | `apoio` + **não visto**: cadeira firme (ou `banco_reto`) | ombro, cotovelo, punho | 8–20 | 2 | um estudo (EMG e amplitude); consenso (risco) | **só alternativa** (tríceps complemento, atrás da `flexao-fechada`; fora para quem marcar ombro) | Mais extensão do ombro que as paralelas (McKenzie 2022); sem dado de lesão |
| `extensao-triceps-peso-corpo` | Extensão de tríceps com o peso do corpo (mãos na mesa ou no encosto) | triceps / — | `apoio` + **não visto**: apoio alto firme (mesa, bancada, encosto) | cotovelo, ombro, punho | 8–20 | 2 | consenso | **só alternativa** (tríceps acima da cabeça, sem obrigação de cumprir a vaga) | Ombro em flexão intermediária; não cumpre de verdade a `selecao.triceps-acima-cabeca` |
| `triceps-frances-objeto` | Tríceps francês com galão | triceps / — | `apoio` + `carga_improvisada` | ombro, cotovelo | 10–30 | 1 | um estudo (posição acima da cabeça: Maeo 2023); consenso (galão = halter) | **entra** (cumpre a vaga obrigatória `triceps-acima-cabeca` quando não há halter nem elástico) | É a mesma posição do estudo, com carga leve. Galão de plástico, duas mãos na alça |
| `elevacao-lateral-objeto` | Elevação lateral com garrafas | ombro_lateral / — | `apoio` + `carga_improvisada` | ombro | 12–30 | 1 | consenso (garrafa = halter); um estudo (halter ≈ polia) | **entra** (nível 3 da elevação lateral) | Garrafas têm peso conhecido; a elevação lateral já usa cargas leves |
| `rosca-objeto` | Rosca com galão ou mochila | biceps / — | `apoio` + `carga_improvisada` | cotovelo | 10–30 | 1 | consenso (objeto = halter); robusta (princípio) | **entra** (nível 3 do bíceps) | Sem ancoragem, é a única rosca com carga real |
| `rosca-isometrica-toalha` | Rosca isométrica com toalha | biceps / — | `apoio` + **não visto**: toalha | cotovelo, ombro | 3–5 × 20–30 s | 1 | moderada (isometria cresce: Oranchuk 2019); consenso (versão com toalha) | **não entra** no MVP (vai para o backlog) | Sem repetições nem carga medida: o app não sabe contar a série, calibrar o RIR nem progredir |

---

### Posteriores, glúteo e quadríceps (P3)

`requer`: no app, o peso do corpo é a capacidade `apoio`, que é sempre verdadeira. A coluna "O que o app não vê" lista o que a pessoa precisa ter e que hoje ninguém pergunta. Os ids novos não colidem com os da biblioteca (conferido em `exercicios.json`, 106 ids).

| Id | Nome (pt-BR) | Padrão | Primários / secundários | `requer` | O que o app não vê | Articulações | Reps | Compl. | Selo | Entra? | Por quê |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `nordico` | Flexão nórdica (assistida → livre) | `flexao-joelho` | posteriores / — | `[["apoio"]]` | âncora firme para os calcanhares (sofá ou cama pesados, alguém segurando, alça de porta), almofada para os joelhos, espaço à frente para aparar a queda | joelho | 3–6 descidas de 3 a 5 s (excêntrico) | 3 | moderada (cresce); um estudo (< flexora sentada) | **entra**, só intermediário e avançado | a única flexão de joelho sem equipamento com ensaio de hipertrofia; precisa de escada de volume por causa da dor tardia |
| `flexao-joelho-deslizante` | Flexão de joelho deslizante (toalha ou meias) | `flexao-joelho` | posteriores / glúteos | `[["apoio"]]` | chão liso (piso frio, madeira), toalha ou meias | joelho | 8–15 (bilateral); 6–12 (uma perna) | 2 | consenso | **entra** (≈ `flexao-bola`) | mesmo movimento da flexão na bola, sem a bola; cobre a flexão de joelho para iniciante em casa |
| `ponte-unilateral` | Ponte de glúteo com uma perna | `extensao-quadril` | glúteos / — | `[["apoio"]]` | — | quadril | 10–20 | 1 | um estudo (função); consenso (unilateral sem carga) | **só como degrau** da `ponte-gluteo` (escada de carga leve, passo 2) | não é função nova; dobra a carga relativa sem peso |
| `ponte-pes-elevados` | Ponte com os pés num sofá ou cadeira | `extensao-quadril` | glúteos / posteriores | `[["apoio"]]` | sofá, cama ou cadeira firme e sem rodinhas, encostada na parede | quadril, joelho **[opinião]** | 10–20 | 2 | consenso | **só alternativa** | não há estudo; os posteriores trabalham parados; útil para variar a ponte |
| `stiff-unilateral-peso-corpo` | Stiff com uma perna, sem peso | `dobrar-quadril` | posteriores / glúteos | `[["apoio"]]` | parede ou cadeira para apoiar a mão, se faltar equilíbrio | quadril, lombar | 12–20 | 2 | consenso | **só alternativa** (aprendizado do stiff unilateral com halter) | sem peso, raramente chega perto da falha; serve para aprender o movimento antes do halter |
| `afundo-tras-peso-corpo` | Afundo para trás, sem peso | `afundo` | quadríceps / glúteos, adutores | `[["apoio"]]` | espaço livre atrás | joelho, quadril | 12–25 | 1 | um estudo (unilateral cresce a perna: `bulgaro2026`, Wei 2023) | **entra** | o afundo para trás costuma ser mais fácil de equilibrar que o para a frente **[opinião]**; hoje só existe o afundo estático sem peso |
| `step-up-cadeira` | Subida na cadeira (step-up) | `afundo` | quadríceps / glúteos | `[["apoio"]]` | cadeira firme, sem rodinhas e sem braço dobrável, encostada na parede; ou um degrau de escada | joelho, quadril | 10–20 | 2 | consenso | **só alternativa** | risco de queda maior que no afundo; o degrau de escada, mais baixo e fixo, é mais seguro |
| `panturrilha-unilateral-degrau` | Panturrilha com uma perna no degrau | `panturrilha` | panturrilha / — | `[["apoio"]]` | um degrau de escada ou soleira firme; corrimão ou parede para a mão | tornozelo | 10–20, calcanhar bem abaixo do degrau | 1 | um estudo (em pé + parte alongada: `kinoshita2023`, `kassiano2023b`) | **entra** | é a panturrilha em pé com a parte alongada, sem equipamento; hoje o unilateral pede `step` |
| `nordico-invertido` | Nórdico invertido (reverse nordic) | `isolador-quadriceps` | quadríceps / — | `[["apoio"]]` | almofada para os joelhos; âncora para os pés ajuda | joelho | 6–12, amplitude parcial no início | 3 | consenso | **só alternativa**, avançado | sem estudo de hipertrofia; EMG (não verificada) não mostra vantagem; não preenche a vaga da extensora |
| `sissy-squat` | Sissy squat | `isolador-quadriceps` | quadríceps / — | `[["apoio"]]` | apoio para a mão | joelho, tornozelo **[opinião]** | 8–15 | 3 | consenso | **não entra** no MVP | sem estudo; joelho muito dobrado sob carga e técnica difícil de mostrar só com cartão de texto **[opinião]** |

---

## Propostas para `regras.md` (só propostas; nenhuma aplicada)

### Progressão, faixas e aparelhos (P1 e P5)

| id sugerido | Texto | Iniciante | Intermediário | Avançado | Selo | Fontes |
|---|---|---|---|---|---|---|
| `progressao.escada-por-exercicio` (nova; substitui a escada genérica de `progressao.incremento.peso-corporal` para os exercícios listados) | Cada exercício de peso do corpo, suspensão, paralelas, bola e elástico tem a sua escada de degraus (tabela 5.3). A carga registrada é o degrau. Sobe de degrau pela dupla progressão; a sugestão nomeia o degrau seguinte | começa no degrau 1 (flexão: inclinada alta; agachamento: até a cadeira) | começa pela calibração na 1ª série (`progressao.calibracao`, por passos) | idem | consenso (a ordem); moderada (o princípio de manter a série perto da falha em ≤ ~30 repetições) | `kikuchi2017`, `wei2023`, `kassiano2025`, `plotkin2022`, `alizadeh2020`, `consenso-projeto` |
| `progressao.escada-elastico` (nova) | Para cada intensidade k de 1 a N: normal → encurtado → k + 1; depois da mais forte: descida de 3 s → pausa de 2 s → dois elásticos juntos (se N ≥ 2) → sugerir um mais forte | igual | igual | igual | consenso | `lopes2019`, `harper2025`, `consenso-projeto` |
| `reps.faixa.degrau` (nova; revê as faixas de `reps.faixa.por-tipo` para os exercícios em degrau) | Faixa de 5 a 8 repetições de largura por degrau, com topo ≤ 20 nos degraus intermediários (tabela 5.4) | tabela 5.4 | tabela 5.4 | tabela 5.4 | consenso (a largura); robusta (qualquer faixa de ~6–30 cresce perto da falha) | `schoenfeld2017b`, `lopez2021`, `hammert2026`, `morton2016`, `schoenfeld2015carga` |
| `progressao.criterio-degrau` (nova) **[opinião]** | No tipo degrau, sobe quando a 1ª série chega ao topo e as outras ficam a no máximo 2 repetições dele, em 2 sessões seguidas | igual | igual | igual | consenso | `halperin2022`, `consenso-projeto` |
| `equipamento.fim-da-escada` (nova) | No último degrau, se a 1ª série passa de 30 repetições em 2 sessões seguidas: aviso "o peso do corpo chegou ao limite para este músculo" com o selo, e sugestão de carga externa. Nunca avisar de antemão pelo nível | igual | igual | igual | consenso (o gatilho); um estudo (o piso de carga); moderada (até ~30–35 repetições funciona) | `lasevicius2018`, `lasevicius2022`, `schoenfeld2015carga`, `carvalho2022` |
| `reps.teto.carga-limitada` (revista) | Mantém "até 30", e muda o selo das fontes: até ~30–35 repetições perto da falha cresce como carga alta, também em treinados | até 30 | até 30 | até 30 | consenso (o número 30); moderada (a base) | acrescentar `schoenfeld2015carga`, `morton2016`, `lasevicius2022`, `hammert2026`, `carvalho2022` |
| `equipamento.flexao-por-supino` (revista) | A escada ganha os degraus intermediários da tabela 5.3 (de joelhos, descida de 3 s, mochila) | ver 5.3 | ver 5.3 | ver 5.3 | um estudo (flexão ≈ supino); consenso (a ordem) | `kikuchi2017`, `calatayud2015`, `alizadeh2020` |
| `selecao.nordico` (nova) | No cenário sem flexora e sem halter, o nórdico (com os pés presos sob um móvel pesado e firme) entra como flexão de joelho, com a escada da tabela 5.3; complexidade alta, só a partir do intermediário, ou do iniciante só nos degraus 1–2 | degraus 1–2, 2 séries | escada completa, 2–3 séries | escada completa, 2–3 séries | moderada (cresce os posteriores, em atletas); consenso (escada, nível e montagem) | `cholp2025`, `morin2025`, `seguranca.montagem` |
| `equipamento.kettlebell-como-halter` (nova) | Um kettlebell de kg conhecido vale como halter nos exercícios unilaterais ou com um peso só (goblet, remada unilateral curvada, stiff unilateral, afundo com o peso no peito, desenvolvimento unilateral, ponte com peso) | igual | igual | igual | consenso (por equivalência robusta de equipamento) | `haugen2023`, `consenso-projeto` |
| `equipamento.elastico.texto` (revista do texto do app) | "Elástico: moderada para força; um estudo para hipertrofia (em idosas, contra controle)" | — | — | — | um estudo | `lopes2019`, `harper2025` |

**Exercícios novos para `docs/backlog.md`** (ficha e cartão; sem animação até aprovação):
- nórdico;
- flexão de joelho deslizando;
- flexão fechada;
- flexão com o quadril alto (pike);
- flexão na suspensão, rosca na suspensão, tríceps na suspensão, "Y/T" na suspensão, flexão de joelho na suspensão;
- subida no step;
- hip thrust com o peso do corpo;
- elevação de joelhos nas paralelas;
- ponte com os pés na bola.

---

### Puxar, ombro e braços (P2 e P4)

| id | regra | iniciante | intermediário | avançado | selo | fontes |
|---|---|---|---|---|---|---|
| `equipamento.sem-ancoragem` | Sem nada para puxar (sem barra, polia, fita, elástico nem objeto), o app **não inventa** um exercício de costas: mostra a lacuna de costas, bíceps e ombro posterior com as séries que faltam (cálculo de `volume.serie-indireta.peso` e `volume.semanal.minimo-eficaz`) e sugere a compra pela ordem de `equipamento.primeira-compra`. "Superman" e Y-T-W sem carga não contam como séries de costas | igual | igual | igual | consenso | `consenso-projeto`, `park2015`, `fenwick2009` |
| `equipamento.primeira-compra` | Ordem da sugestão de compra quando faltam as funções de puxar: 1) jogo de elásticos (remada sem ancoragem; bíceps, ombro lateral, tríceps acima da cabeça); 2) barra fixa de porta, se o batente aceitar; 3) fita de suspensão, como alternativa à barra | igual | igual | igual | consenso (a ordem); moderada (elástico para força) | `lopes2019`, `youdas2016`, `soligon2020`, `consenso-projeto` |
| `equipamento.carga-improvisada` | Capacidade declarada pela pessoa (garrafa, galão, mochila), sem foto. Vale como halter de peso desconhecido; registra-se "peso aproximado" (1 L de água ≈ 1 kg) ou só repetições. Segue `reps.teto.carga-limitada` (até 30) e `equipamento.escada-carga-leve`; nunca em exercício que passe o objeto pela frente do rosto sem as duas mãos | igual | igual | igual | consenso (a equivalência); robusta (carga baixa até a falha) | `schoenfeld2017b`, `lopez2021`, `lasevicius2018` |
| `seguranca.ancoragem-improvisada` | Mesa, porta, maçaneta e lençol não são ancoragem que o app prescreve. Se a pessoa tiver uma ancoragem de porta própria (trava de fita ou de elástico), o cartão diz: a porta fecha para o lado **oposto** ao da pessoa, trancada, e o primeiro puxão é de teste | igual | igual | igual | consenso | `kerr2010`, `coffey2026`, `consenso-projeto` |
| `seguranca.elastico` | Cartão do elástico: conferir rasgos antes de usar, prender a ancoragem fora da linha do rosto, trocar o elástico gasto; na barra assistida, o elástico preso com nó firme na barra e o rosto fora da linha dele. O elástico que solta ou arrebenta pode atingir o olho e a cabeça | igual | igual | igual | consenso (relatos de caso; sem taxa) | `heyn2023` |
| `selecao.mergulho-banco` | Mergulho no banco ou na cadeira: articulação `ombro` (a triagem exclui), complexidade 2; nível 2 do tríceps complemento, atrás da flexão com as mãos juntas | atrás da flexão fechada | atrás da flexão fechada | atrás da flexão fechada | um estudo (amplitude e EMG); consenso (a ordem) | `mckenzie2022` |
| `selecao.flexao-fechada` | Sem polia, o tríceps complemento usa a flexão com as mãos juntas; mesma escada de dificuldade de `equipamento.flexao-por-supino` | inclinada → chão → pés elevados | igual | igual | moderada (EMG); um estudo (hipertrofia com flexão) | `cogley2005`, `marcolin2015`, `kikuchi2017` |
| `selecao.pike` | Pike e pike com os pés elevados entram só no empurrar vertical (opcional, ombro prioritário), nunca como substituto obrigatório; fora com ombro marcado | fora (só o pike simples, se o ombro for prioridade) | pike → pés elevados | pike → pés elevados | consenso | `consenso-projeto` |

---

### Posteriores, segurança e casa (P3 e P6)

| id | regra | iniciante | intermediário | avançado | selo | fontes |
|---|---|---|---|---|---|---|
| `selecao.flexao-joelho-sem-maquina` (nova; revisa o nível 3 da flexão de joelho na tabela 2.1 do `08`) | Sem cadeira nem mesa flexora, a flexão de joelho sai do peso do corpo; se nada for possível, dobrar o quadril cobre os posteriores (como hoje) | flexão na bola ≈ flexão deslizante | flexão na bola ≈ flexão deslizante ≈ nórdico (assistido no início) | idem, nórdico livre quando a pessoa já controla a descida | consenso (a escolha); moderada para "o nórdico cresce os posteriores" | `maeo2024`, `morin2025`, `maeo2021` |
| `selecao.nordico` (nova) | Entrada e volume do nórdico, para limitar a dor tardia | não entra | 1ª semana: 1–2 séries de 3–5 descidas assistidas (mãos num apoio ou amplitude parcial); +1 série a cada 1–2 semanas, até 3; nunca sobe volume e dificuldade na mesma semana | começa como o intermediário se nunca fez; depois 2–3 séries de 4–8 | consenso (os números); um estudo para "subir rápido dói mais" e "assistido dói menos" | `behan2023`, `coratella2025`, `ishoi2025`, `cuthbert2020`, `chen2012` |
| `selecao.stiff-sem-peso` (nova) | O stiff unilateral sem peso não ocupa a vaga de dobrar o quadril; só entra como alternativa ou aprendizado, a não ser que a série chegue a RIR 0–3 em até 30 repetições | alternativa | alternativa | alternativa | consenso | `schoenfeld2017b`, `lasevicius2018`, `schoenfeld2021` |
| `equipamento.reto-femoral-sem-maquina` (nova) | Sem extensora, a lacuna do reto femoral continua explicada; o nórdico invertido aparece só como alternativa, sem selo de crescimento | lacuna explicada | lacuna explicada | lacuna explicada; nórdico invertido como alternativa | consenso | `kinoshita2026`, `kassiano2026`, `kubo2019`, `wei2023` |
| `equipamento.casa-apoios` (nova) [opinião] | `apoio` deixa de cobrir móvel. A pessoa confirma numa lista curta o que tem em casa; cada item libera os exercícios que dependem dele | idem | idem | idem | consenso (decisão de produto) | `consenso-projeto`, `kerr2010` |
| `seguranca.montagem` (revista) | Acrescentar a casa: móvel testado antes da 1ª série; cadeira sem rodinhas, encostada na parede; mesa pesada, sem vidro; porta trancada e puxada contra o batente; âncora do nórdico conferida; textos da tabela da P6 | idem | idem | idem | consenso | `kerr2010`, `coffey2026` |
| `tecnica.flexao.punho` (nova) | Com dor no punho (nota 3–5 ou região marcada), oferecer antes da troca: mãos fechadas numa toalha, halteres como pegadores ou flexão inclinada numa mesa firme | idem | idem | idem | consenso | `seguranca.dor.programa`; NÃO VERIFICADO: 29157783 |
| `selecao.mergulho-cadeira` (nova) | Mergulho na cadeira só como alternativa de tríceps; não entra com o ombro marcado com dor; prefere a flexão fechada | não entra | alternativa | alternativa | um estudo (mais extensão de ombro) | `mckenzie2022` |

Proposta de lista de "o que tem em casa" para `equipamento.casa-apoios` **[opinião]**: cadeira firme sem rodinhas → step-up, mergulho na cadeira, búlgaro, ponte com os pés elevados; mesa pesada → remada invertida na mesa; porta que tranca + toalha grossa → remada na porta; sofá ou cama pesados, ou alguém para segurar → nórdico; chão liso + toalha → flexão deslizante; degrau de escada → panturrilha unilateral e step-up baixo. Isso pede capacidades novas em `CAPACIDADES` (por exemplo `cadeira_firme`, `mesa_robusta`, `porta`, `ancoragem_pes`, `chao_liso`, `degrau`), declaradas pela pessoa, nunca pela foto. Elas não entram no reconhecimento por foto.

---

## Fontes novas (formato de `docs/pesquisa/fontes.md`)

Chaves conferidas contra `fontes.md`: nenhuma colide. Duplicatas entre as três frentes foram fundidas (`wei2023`, `soligon2020`; `flexao-maos2005` = `cogley2005`; `nordico-volume2025` = `cholp2025`). Só entram em `fontes.md` com a aprovação do Gustavo e quando forem citadas por uma regra ou ficha.

### Resumo oficial lido

- `alizadeh2020` — Alizadeh S, Rayner M, Mahmoud MMI, et al. (2020). Push-Ups vs. Bench Press Differences in Repetitions and Muscle Activation between Sexes. J Sports Sci Med 19(2):289–297. PMID: 32390722 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/32390722/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `andersen2022` — Andersen V, Prieske O, Stien N, et al. (2022). Comparing the effects of variable and traditional resistance training on maximal strength and muscle power in healthy adults: A systematic review and meta-analysis. J Sci Med Sport 25(12):1023–1032. PMID: 36130847 | DOI: 10.1016/j.jsams.2022.08.009 | https://pubmed.ncbi.nlm.nih.gov/36130847/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `behan2023` — Behan FP, Opar DA, Vermeulen R, et al. (2023). The dose-response of pain throughout a Nordic hamstring exercise intervention. Scand J Med Sci Sports 33(4):542–546. PMID: 36651719 | DOI: 10.1111/sms.14317 | https://pubmed.ncbi.nlm.nih.gov/36651719/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `bello2025` — Bello ML, Arent SM, Gillen ZM, et al. (2025). Muscle Hypertrophy, Strength, and Salivary Hormone Changes Following 9 Weeks of High- or Low-Load Resistance Training. J Funct Morphol Kinesiol 11(1):17. PMID: 41562735 | DOI: 10.3390/jfmk11010017 | https://pubmed.ncbi.nlm.nih.gov/41562735/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `carvalho2022` — Carvalho L, Moriggi Junior R, Barreira J, et al. (2022). Muscle hypertrophy and strength gains after resistance training with different volume-matched loads: a systematic review and meta-analysis. Appl Physiol Nutr Metab 47(4):357–368. PMID: 35015560 | DOI: 10.1139/apnm-2021-0515 | https://pubmed.ncbi.nlm.nih.gov/35015560/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `cholp2025` — Cholp J, Zemková E (2025). Effect of high vs. low volume of the nordic hamstring curl on hamstring muscle architecture and eccentric strength in soccer players: a systematic review and meta-analysis. Front Physiol 16:1631205. PMID: 41178985 | DOI: 10.3389/fphys.2025.1631205 | https://pubmed.ncbi.nlm.nih.gov/41178985/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `cogley2005` — Cogley RM, Archambault TA, Fibeger JF, et al. (2005). Comparison of muscle activation using various hand positions during the push-up exercise. J Strength Cond Res 19(3):628–633. PMID: 16095413 | DOI: 10.1519/15094.1 | https://pubmed.ncbi.nlm.nih.gov/16095413/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `coratella2025` — Coratella G, Cè E, D'Orlando A, et al. (2025). Muscle Damage and the Repeated-bout Effect After a Typical Nordic Hamstring Exercise Session. Int J Sports Med 46(10):759–767. PMID: 40280182 | DOI: 10.1055/a-2595-3622 | https://pubmed.ncbi.nlm.nih.gov/40280182/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `cuthbert2020` — Cuthbert M, Ripley N, McMahon JJ, et al. (2020). The Effect of Nordic Hamstring Exercise Intervention Volume on Eccentric Strength and Muscle Architecture Adaptations: A Systematic Review and Meta-analyses. Sports Med 50(1):83–99. PMID: 31502142 | DOI: 10.1007/s40279-019-01178-7 | https://pubmed.ncbi.nlm.nih.gov/31502142/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `ekstrom2003` — Ekstrom RA, Donatelli RA, Soderberg GL, et al. (2003). Surface electromyographic analysis of exercises for the trapezius and serratus anterior muscles. J Orthop Sports Phys Ther 33(5):247–258. PMID: 12774999 | DOI: 10.2519/jospt.2003.33.5.247 | https://pubmed.ncbi.nlm.nih.gov/12774999/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `gavanda2026` — Gavanda S, Wischtukat D, Ruckdeschel M, et al. (2026). Training with an elastic bench press device provides comparable adaptations to conventional resistance training in trained men. Biol Sport 43:839–846. PMID: 42220583 | DOI: 10.5114/biolsport.2026.157993 | https://pubmed.ncbi.nlm.nih.gov/42220583/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido; é um acessório de supino, não treino com elástico) — conferido em 2026-11-03
- `hammert2026` — Hammert WB, Yamada Y, Sallberg RW, et al. (2026). High- and Low-Load Resistance Training Produce Distinct Skeletal Muscle Growth but Similar Changes in Tendon Morphology. Med Sci Sports Exerc (online antes da impressão, 22/06/2026; volume não atribuído). PMID: 42319300 | DOI: 10.1249/MSS.0000000000004052 | https://pubmed.ncbi.nlm.nih.gov/42319300/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `harper2025` — Harper L, Anderson K, Reed W, et al. (2025). Effect of maximal mental effort during elastic band training on neuromuscular adaptations in older women. Front Aging 6:1662126. PMID: 41346374 | DOI: 10.3389/fragi.2025.1662126 | https://pubmed.ncbi.nlm.nih.gov/41346374/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `heyn2023` — Heyn J, Strohm P, Schöffl V, et al. (2023). Exercise Resistance Band induced injuries during Covid 19 Pandemic Lockdown Training. Sportverletz Sportschaden 37(2):96–99. PMID: 37216937 | DOI: 10.1055/a-1993-6712 | https://pubmed.ncbi.nlm.nih.gov/37216937/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `ishoi2025` — Ishøi L, Meincke S, Lund AP, et al. (2025). Less pain, same gain? A randomized controlled trial comparing assisted- versus non-assisted Nordic Hamstring exercise training in elite youth football players. Phys Ther Sport 73:39–47. PMID: 40056728 | DOI: 10.1016/j.ptsp.2025.02.007 | https://pubmed.ncbi.nlm.nih.gov/40056728/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `kohiruimaki2019` — Kohiruimaki R, Maeo S, Kanehisa H, et al. (2019). Suspended Push-up Training Augments Size of not only Upper Limb but also Abdominal Muscles. Int J Sports Med 40(12):789–795. PMID: 31466083 | DOI: 10.1055/a-0989-2482 | https://pubmed.ncbi.nlm.nih.gov/31466083/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `kojic2025` — Kojic F, Mandic D, Duric S, et al. (2025). The effects of eccentric phase tempo in squats on hypertrophy, strength, and contractile properties of the quadriceps femoris muscle. Front Physiol 15:1531926. PMID: 39850448 | DOI: 10.3389/fphys.2024.1531926 | https://pubmed.ncbi.nlm.nih.gov/39850448/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `lees2025` — Lees MJ, Mcleod JC, Morton RW, et al. (2025). Resistance training load does not determine resistance training-induced hypertrophy across upper and lower limbs in healthy young males. J Physiol (online antes da impressão, 31/12/2025; volume não atribuído). PMID: 41474371 | DOI: 10.1113/JP289684 | https://pubmed.ncbi.nlm.nih.gov/41474371/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `maeo2024` — Maeo S, Balshaw TG, Nin DZ, et al. (2024). Hamstrings Hypertrophy Is Specific to the Training Exercise: Nordic Hamstring versus Lengthened State Eccentric Training. Med Sci Sports Exerc 56(10):1893–1905. PMID: 38857522 | DOI: 10.1249/mss.0000000000003490 | https://pubmed.ncbi.nlm.nih.gov/38857522/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `marcolin2015` — Marcolin G, Petrone N, Moro T, et al. (2015). Selective Activation of Shoulder, Trunk, and Arm Muscles: A Comparative Analysis of Different Push-Up Variants. J Athl Train 50(11):1126–1132. PMID: 26488636 | DOI: 10.4085/1062-6050-50.9.09 | https://pubmed.ncbi.nlm.nih.gov/26488636/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `martins2013` — Martins WR, de Oliveira RJ, Carvalho RS, et al. (2013). Elastic resistance training to increase muscle strength in elderly: a systematic review with meta-analysis. Arch Gerontol Geriatr 57(1):8–15. PMID: 23562413 | DOI: 10.1016/j.archger.2013.03.002 | https://pubmed.ncbi.nlm.nih.gov/23562413/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `morin2025b` — Morin T, Caillet AH, Nordez A, et al. (2025). Robustness of hamstring muscle activation strategies following selective hypertrophy induced by Nordic hamstring curl and stiff-leg deadlift exercises. J Appl Physiol 139(1):296–307. PMID: 40586278 | DOI: 10.1152/japplphysiol.00237.2025 | https://pubmed.ncbi.nlm.nih.gov/40586278/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido; mesmo grupo e, provavelmente, a mesma amostra de `morin2025`) — conferido em 2026-11-03
- `morton2016` — Morton RW, Oikawa SY, Wavell CG, et al. (2016). Neither load nor systemic hormones determine resistance training-mediated hypertrophy or strength gains in resistance-trained young men. J Appl Physiol 121(1):129–138. PMID: 27174923 | DOI: 10.1152/japplphysiol.00154.2016 | https://pubmed.ncbi.nlm.nih.gov/27174923/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `oranchuk2019` — Oranchuk DJ, Storey AG, Nelson AR, et al. (2019). Isometric training and long-term adaptations: Effects of muscle length, intensity, and intent: A systematic review. Scand J Med Sci Sports 29(4):484–503. PMID: 30580468 | DOI: 10.1111/sms.13375 | https://pubmed.ncbi.nlm.nih.gov/30580468/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `park2015` — Park SY, Yoo WG, An DH, et al. (2015). Comparison of isometric exercises for activating latissimus dorsi against the upper body weight. J Electromyogr Kinesiol 25(1):47–52. PMID: 25282576 | DOI: 10.1016/j.jelekin.2014.09.001 | https://pubmed.ncbi.nlm.nih.gov/25282576/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `schoenfeld2015` (cadência): o PMID **25601394** está confirmado (Schoenfeld BJ, Ogborn DI, Krieger JW; Sports Med 45(4):577–585). Sobe para resumo-PubMed.
- `schoenfeld2015carga` — Schoenfeld BJ, Peterson MD, Ogborn D, et al. (2015). Effects of Low- vs. High-Load Resistance Training on Muscle Strength and Hypertrophy in Well-Trained Men. J Strength Cond Res 29(10):2954–2963. PMID: 25853914 | DOI: 10.1519/JSC.0000000000000958 | https://pubmed.ncbi.nlm.nih.gov/25853914/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `schoenfeld2016c` — Schoenfeld BJ, Wilson JM, Lowery RP, et al. (2016). Muscular adaptations in low- versus high-load resistance training: A meta-analysis. Eur J Sport Sci 16(1):1–10. PMID: 25530577 | DOI: 10.1080/17461391.2014.989922 | https://pubmed.ncbi.nlm.nih.gov/25530577/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `schoenfeld2017b` e `lopez2021`: resumo lido; sobem para resumo-PubMed (`lopez2021`: coautores Radaelli R, Taaffe DR).
- `snarr2017` — Snarr RL, Hallmark AV, Casey JC, et al. (2017). Electromyographical Comparison of a Traditional, Suspension Device, and Towel Pull-Up. J Hum Kinet 58:5–13. PMID: 28828073 | DOI: 10.1515/hukin-2017-0068 | https://pubmed.ncbi.nlm.nih.gov/28828073/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `soligon2020` — Soligon SD, da Silva DG, Bergamasco JGA, et al. (2020). Suspension training vs. traditional resistance training: effects on muscle mass, strength and functional performance in older adults. Eur J Appl Physiol 120(10):2223–2232. PMID: 32700098 | DOI: 10.1007/s00421-020-04446-x | https://pubmed.ncbi.nlm.nih.gov/32700098/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `terada2022` — Terada K, Kikuchi N, Burt D, et al. (2022). Low-Load Resistance Training to Volitional Failure Induces Muscle Hypertrophy Similar to Volume-Matched, Velocity Fatigue. J Strength Cond Res 36(6):1576–1581. PMID: 35622108 | DOI: 10.1519/JSC.0000000000003690 | https://pubmed.ncbi.nlm.nih.gov/35622108/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `tsuzuku2018` — Tsuzuku S, Kajioka T, Sakakibara H, et al. (2018). Slow movement resistance training using body weight improves muscle mass in the elderly: A randomized controlled trial. Scand J Med Sci Sports 28(4):1339–1344. PMID: 29247985 | DOI: 10.1111/sms.13039 | https://pubmed.ncbi.nlm.nih.gov/29247985/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `vargasmolina2026` — Vargas-Molina S, García-Palumbo A, Petro JL, et al. (2026). Comparison of Repetition-Based Progressive-Overload Strategies in Resistance Training: Rest-Pause Versus Drop Sets. Scand J Med Sci Sports 36(7):e70327. PMID: 42340141 | DOI: 10.1111/sms.70327 | https://pubmed.ncbi.nlm.nih.gov/42340141/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `wei2023` — Wei W, Zhu J, Ren S, et al. (2023). Effects of progressive body-weight versus barbell back squat training on strength, hypertrophy and body fat among sedentary young women. Sci Rep 13(1):13505. PMID: 37598268 | DOI: 10.1038/s41598-023-40319-x | https://pubmed.ncbi.nlm.nih.gov/37598268/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03
- `youdas2016` — Youdas JW, Keith JM, Nonn DE, Squires AC, Hollman JH (2016). Activation of Spinal Stabilizers and Shoulder Complex Muscles During an Inverted Row Using a Portable Pull-up Device and Body Weight Resistance. J Strength Cond Res 30(7):1933–1941. PMID: 26422610 | DOI: 10.1519/JSC.0000000000001210 | https://pubmed.ncbi.nlm.nih.gov/26422610/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na sessão de equipamento mínimo; texto completo não lido) — conferido em 2026-11-03

### NÃO VERIFICADAS (só título e PMID; nenhum número delas é usado)

- `bourne2017` — Bourne MN, et al. (2017; autores a conferir). Impact of the Nordic hamstring and hip extension exercises on hamstring architecture and morphology: implications for injury prevention. Br J Sports Med 51(5):469–477. PMID: 27660368 | DOI: 10.1136/bjsports-2016-096130 | https://pubmed.ncbi.nlm.nih.gov/27660368/ — **status:** NÃO VERIFICADO (falta: resumo e autores; título e PMID vistos na lista do PubMed) — conferido em 2026-11-03
- `cadeiras-criancas2014` — Autores não conferidos (s.d.). Pediatric injuries associated with high chairs and chairs in the United States, 2003-2010. Periódico não anotado. PMID: 24322954 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/24322954/ — **status:** NÃO VERIFICADO (falta: resumo, autores, ano e periódico; população pediátrica) — conferido em 2026-11-03
- `callaghan1998` — Callaghan JP, Gunning JL, McGill SM (1998). The relationship between lumbar spine load and muscle activity during extensor exercises. Phys Ther 78(1):8–18. PMID: — | DOI: — | — — **status:** NÃO VERIFICADO (falta: PMID e resumo; citação vista só em resultados de busca na web) — conferido em 2026-11-03
- `flexao-forca1995` — Autores não conferidos (s.d.). Kinesiological study of push-up motion using a three-dimensional floor reaction on a force plate. Periódico não anotado. PMID: 7676844 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/7676844/ — **status:** NÃO VERIFICADO (falta: resumo, autores, ano e periódico) — conferido em 2026-11-03
- `flexao-punho2018` — Autores não conferidos (2017/2018). Effect of Push-Up Position on Wrist Joint Pressures in the Intact Wrist and Following Scapholunate Interosseous Ligament Sectioning. Periódico não anotado. PMID: 29157783 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/29157783/ — **status:** NÃO VERIFICADO (falta: resumo, autores, ano e periódico) — conferido em 2026-11-03
- `lombar-reabilitacao2008` — Autores não conferidos (2008). Surface electromyographic analysis of the low back muscles during rehabilitation exercises. J Orthop Sports Phys Ther 38(12):736–745. PMID: 19195137 | DOI: 10.2519/jospt.2008.2865 | https://pubmed.ncbi.nlm.nih.gov/19195137/ — **status:** NÃO VERIFICADO (falta: resumo e autores) — conferido em 2026-11-03
- `moveis-criancas2021` — Autores não conferidos (2021). Furniture and television tip-over injuries to children treated in United States emergency departments. Periódico não anotado. PMID: 34446115 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/34446115/ — **status:** NÃO VERIFICADO (falta: resumo, autores e periódico; população pediátrica) — conferido em 2026-11-03
- `nordico-fasciculo2021` — Autores não conferidos (2021). Heterogeneous effects of eccentric training and nordic hamstring exercise on the biceps femoris fascicle length based on ultrasound assessment and extrapolation methods… PLoS One 16(11):e0259821. PMID: 34752499 | DOI: 10.1371/journal.pone.0259821 | https://pubmed.ncbi.nlm.nih.gov/34752499/ — **status:** NÃO VERIFICADO (falta: resumo e autores) — conferido em 2026-11-03
- `nordico-invertido2024` — Autores não conferidos (2024). Reverse Nordic Curl Does Not Generate Superior Eccentric Activation of the Quadriceps Muscle Than Bodyweight Squat-Based Exercises. Periódico não anotado. PMID: 39214520 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/39214520/ — **status:** NÃO VERIFICADO (falta: resumo, autores e periódico; título e PMID vistos num resultado de busca na web) — conferido em 2026-11-03
- `nordico-prevencao2019` — Autores não conferidos (2019). Including the Nordic hamstring exercise in injury prevention programmes halves the rate of hamstring injuries: a systematic review and meta-analysis of 8459 athletes. Br J Sports Med 53(21):1362–1370. PMID: 30808663 | DOI: 10.1136/bjsports-2018-100045 | https://pubmed.ncbi.nlm.nih.gov/30808663/ — **status:** NÃO VERIFICADO (falta: resumo e autores) — conferido em 2026-11-03
- `nordico-reanalise2021` — Autores não conferidos (2021). Why methods matter in a meta-analysis: a reappraisal showed inconclusive injury preventive effect of Nordic hamstring exercise. J Clin Epidemiol 140:111–124. PMID: 34520846 | DOI: 10.1016/j.jclinepi.2021.09.007 | https://pubmed.ncbi.nlm.nih.gov/34520846/ — **status:** NÃO VERIFICADO (falta: resumo e autores) — conferido em 2026-11-03
- `patelofemoral2023` — Autores não conferidos (2023). Patellofemoral Joint Loading Progression Across 35 Weightbearing Rehabilitation Exercises and Activities of Daily Living. Periódico não anotado. PMID: 37272685 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/37272685/ — **status:** NÃO VERIFICADO (falta: resumo, autores e periódico) — conferido em 2026-11-03
- `ponte-plataforma2025` — Autores não conferidos (2025). Evaluating the optimal height for hamstring activity in the maximum-speed single-leg bridge test. Periódico não anotado. PMID: 39933727 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/39933727/ — **status:** NÃO VERIFICADO (falta: resumo, autores e periódico) — conferido em 2026-11-03
- `ponte-unilateral2017` — Autores não conferidos (2017). Building a better gluteal bridge: electromyographic analysis of hip muscle activity during modified single-leg bridges. Periódico não anotado. PMID: 28900560 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/28900560/ — **status:** NÃO VERIFICADO (falta: resumo, autores e periódico) — conferido em 2026-11-03

### Chaves que já existem e podem subir de status ou ser corrigidas

- `calatayud2015`: o PMID é **24983847** (não o 25028993 sugerido). Autores do registro: Calatayud J, Borreani S, Colado JC, et al. J Strength Cond Res 29(1):246–253. DOI 10.1519/JSC.0000000000000589. Sobe de NÃO VERIFICADO para resumo-PubMed.
- `schoenfeld2021`: Schoenfeld BJ, Grgic J, Van Every DW, et al. (2021). Sports (Basel) 9(2):32. PMID **33671664** | DOI 10.3390/sports9020032. Sobe para resumo-PubMed. O resumo **não dá número** de desconforto; ele não sustenta "desconforto acima de 25–30 repetições".
- `lasevicius2018`: coautores Ugrinowitsch C, Schoenfeld BJ conferidos; sobe para resumo-PubMed.
- `lasevicius2022`: J Strength Cond Res 36(2):346–351 (fev. 2022); DOI 10.1519/JSC.0000000000003454. Sobe para resumo-PubMed.
- `kotarsky2018`: DOI 10.1519/JSC.0000000000002345. Sobe para resumo-PubMed.
- `kikuchi2017`: já era resumo-PubMed; o resumo confirma 18 homens, 8 semanas, 2 vezes por semana.
- `fenwick2009`: resumo oficial lido em 03/11/2026 (PMID 19197209, J Strength Cond Res 23(2):350–358, DOI 10.1519/JSC.0b013e3181942019; 7 homens). O mesmo resumo saiu de novo como PMID 19620925 (23(5):1408–1417, DOI 10.1519/JSC.0b013e3181b07334), o que explica a divergência que `fontes.md` anota. O resumo diz que a invertida teve a **maior** ativação do latíssimo, e não "comparável ou maior". Status proposto: resumo-PubMed.
- `kotarsky2018`: o DOI que faltava é **10.1519/JSC.0000000000002345** (resumo lido em 03/11/2026: 23 homens moderadamente treinados, 4 semanas; o 1RM subiu nos dois grupos e a espessura muscular não mudou em nenhum). Status proposto: resumo-PubMed.
- `mckenzie2022`: resumo relido em 03/11/2026; sem mudança (13 homens experientes; pico de EMG do tríceps 0,83 mV no banco, 1,04 nas paralelas, 1,05 nas argolas).

## Pendências de leitura

27660368, 41178985, 34752499, 33049705, 30808663, 34520846, 40586278, 40991853 (meta-regressão de dose do nórdico para força, J Strength Cond Res 2025), 39214520, 29157783, 7676844, 16095413, 28900560, 39933727, 38876665, 37272685, 19195137, 39767514, 34446115, 24322954 e o PMID do Callaghan 1998. Se 27660368 e 40586278 confirmarem hipertrofia com o nórdico, o selo "cresce os posteriores" continua moderada (é o mesmo tipo de achado). Se 39214520 for lido, a frase sobre o nórdico invertido ganha a população e o n.

---
- Das perguntas 1 e 5: 40692176, 42709703, 40085810, 28617715, 30529477, 30243898, 21107513, 22580981, 32213783.
- Das perguntas 2 e 4: 42647355, 37738266, 28217415, 28828073 (lido pela frente P1/P5 como `snarr2017`), 29944029, 24061163, 33165305, 41505507, 36900849.
- Relidas por mim nesta sessão: 41178985 (`cholp2025`) e 40586278 (`morin2025b`). Ainda vazias: 27660368, 39214520, 29157783.

## Buscas registradas (03/11/2026)

As buscas das perguntas 1 e 5 estão nas seções 1.4 e 5.7.

### Perguntas 2 e 4


Formato: termos → o que achou. "Nada" = nenhum resultado útil. **(429)** = o PubMed estava limitando pedidos; a busca vazia pode ser falha da rede, e não ausência de estudo.

**P2 (puxar):**
- `inverted row table bodyweight` → nada sobre mesa (só estudos de carga baixa; Kikuchi 2017 já no projeto).
- `towel row door`; `door anchored row bodyweight`; `door row exercise` (3 vezes); `towel row` (repetida) → nada útil **(429 provável nas vazias)**.
- `prone Y T W exercise electromyography`; `prone Y T W` (repetida); `prone Y raise lower trapezius` (2 vezes) → nada útil.
- `prone horizontal abduction electromyography` → Ekstrom 2003 (12774999, **resumo lido**); revisão de Escamilla 2009 (19769415, só título).
- `superman exercise back extension prone electromyography`; `superman exercise` (repetida); `prone trunk extension lumbar multifidus electromyography` → estudos de reabilitação lombar e multífido (34055178, 30276184, 25995550; só títulos); um estudo de 2022 retratado (35371286 / 37416279).
- `back extensor training muscle cross-sectional area`; `lumbar extensor hypertrophy training` → só reabilitação lombar e idosos; nada de dorsais.
- `latissimus dorsi hypertrophy training` → nenhum ensaio de hipertrofia do latíssimo com peso do corpo; Andersen 2014 (já no projeto).
- `pull-up training hypertrophy`; `lat pulldown pull-up hypertrophy comparison` → nada útil.
- `pull-up chin-up electromyography` → `youdas2010` (no projeto); 28011412 (só título).
- `inverted row training intervention`; `inverted row` (repetida) → Youdas 2016 (26422610, **resumo lido**); `aguileracastells2020` e `rabello2024` (no projeto); 37738266 e 29944029 (resumo bloqueado: NÃO VERIFICADOS).
- `inverted row electromyography latissimus` (busca de teste) → Fenwick 2009 (19197209 e 19620925, **resumos lidos**); Park 2015 (25282576, **resumo lido**); 42647355 (resumo bloqueado).
- `suspension training hypertrophy`; `suspension training randomized strength` → Soligon 2020 (32700098, **resumo lido**); o resto é de idosos, crianças ou reabilitação.
- `portable pull-up device` → Youdas 2016.
- `towel pull-up` → nada útil (o termo pega cirurgia); 28828073 apareceu em outra busca (resumo bloqueado).
- `elastic band row latissimus`; `bodyweight row electromyography latissimus`; `elastic band versus dumbbell hypertrophy` → 0 resultados **(429 provável)**.
- `elastic resistance muscle thickness randomized young` → nada de hipertrofia em jovens com elástico × peso.
- `doorway pull-up bar injury` (2 vezes); `pull-up bar door injury` → 0 resultados.
- `exercise equipment injuries home emergency department` → 24061163 (resumo bloqueado), 21296844 (crianças; só título).
- `resistance band eye injury`; `elastic band ocular trauma exercise` → Heyn 2023 (37216937, **resumo lido**); 33165305, 34955319, 35790368, 41505507, 42327570 (relatos de caso; só títulos).
- `calisthenics training hypertrophy randomized` → 0 **(429 provável)**.

**P4 (ombro e braços):**
- `pike push-up` (3 vezes); `pike push up`; `pike push-up electromyography deltoid`; `pike push up shoulder`; `handstand push-up electromyography`; `handstand push-up` → nada (só um estudo de BFR em ginastas e um de abdominais, sem relação).
- `push-up hand position triceps electromyography`; `narrow base push-up electromyography` → Cogley 2005 (16095413) e Marcolin 2015 (26488636), **resumos lidos**.
- `diamond push-up` (3 vezes) → nada.
- `push-up variations deltoid electromyography` → estudos de flexão na bola e na suspensão (só títulos).
- `decline push-up feet elevated` → 0.
- `push-up training triceps hypertrophy` → Kikuchi 2017 (no projeto); Kotarsky 2018 (29466268, **resumo lido**, DOI achado).
- `bench dip shoulder`; `bench dip` (repetida); `dip exercise shoulder pain` → só McKenzie 2022 (36293792, **resumo relido**).
- `bench dip electromyography` (2 vezes); `triceps dip shoulder injury`; `shoulder extension dip anterior capsule` → 0.
- `bodyweight triceps extension`; `skull crusher triceps`; `triceps extension overhead hypertrophy` (2 vezes) → 0 **(429 provável: esta última deveria achar Maeo 2023)**; `overhead triceps extension` → Maeo 2023 (no projeto).
- `isometric elbow flexion training hypertrophy` → 36900849 (isometria de flexores do cotovelo; resumo bloqueado: NÃO VERIFICADO).
- `isometric training hypertrophy meta-analysis`; `isometric training hypertrophy` (repetida); `isometric training muscle size systematic review` → só metanálises gerais (já no projeto).
- `isometric training long-term adaptations review` → Oranchuk 2019 (30580468, **resumo lido**).
- `manual resistance training`; `self-resistance training` → nada útil (o termo pega microbiologia).
- `water bottle exercise strength`; `household objects resistance training` → nada útil.
- `lateral raise electromyography deltoid` → 32824894 (fisiculturistas; só título); `rabello2024` (no projeto).
- `rear deltoid exercise hypertrophy` → 0.
- `elbow flexor hypertrophy low load` → estudos de carga baixa (Schoenfeld 2015, Lasevicius 2018, já no projeto).

### Perguntas 3, 6 e 7


**PubMed** (`pubmed.py s`, a partir de /home/user/treino-mvp):
- `nordic hamstring hypertrophy meta-analysis` — nada.
- `nordic hamstring fascicle length meta-analysis` — 31502142 (lido), 33049705, 40230340, 32216654, 34752499, 41178985.
- `nordic hamstring exercise muscle soreness` — 40280182 (lido), 36651719 (lido), 40056728 (lido), 31356512, e trabalhos de bandagem (fora do tema).
- `nordic hamstring volume low dose` — 31502142, 40991853, 36651719, 42491631, 35176727, 31034261.
- `Morin nordic Romanian deadlift hypertrophy` — nada (o `morin2025` já está em `fontes.md`).
- `nordic hamstring muscle hypertrophy MRI` — 38857522 (lido), 27660368, 40578759, 39297348, 35941515.
- `nordic hamstring exercise hypertrophy` — 38857522, 27660368, 40586278, 28280975, 42735209 (modelagem, 2026).
- `nordic hamstring injury prevention meta-analysis` — 30808663, 27752982, 34520846, 31680644 (prevenção: fora do objetivo).
- `nordic hamstring curl home partner` — nada.
- `sliding leg curl hamstring electromyography` — bloqueado (página anti-robô).
- Do cache compartilhado do script (buscas feitas hoje pela frente das perguntas 2 e 4, relidas aqui): `bench dip shoulder` → 36293792; `dip exercise shoulder pain` → 36293792; `pike push up shoulder` → nada; `superman exercise back extension prone electromyography` → 39767514, 19195137; `prone trunk extension lumbar multifidus electromyography` → 25995550 e outros (EMG); `narrow base push up electromyography` → 30452393, 16095413, 20664364, 26488636; `pull up bar door injury` → nada.
- Resumos lidos (`a`): 31502142, 38857522, 40280182, 36651719, 40056728, 36293792, 37598268. Tentativas vazias por causa da página anti-robô: 33049705, 34752499, 41178985, 27660368, 40644669, 39214520, 29157783. Parei de tentar depois do bloqueio.

**Web, restrita a pubmed.ncbi.nlm.nih.gov** (só títulos e PMIDs; tudo NÃO VERIFICADO):
- `sliding leg curl hamstring EMG nordic comparison study` — nenhum estudo da flexão deslizante; 33120362 (flywheel × nórdico), 38100489 (razor curl), NCT07171385 (registrado, sem resultado).
- `reverse nordic OR sissy squat rectus femoris hypertrophy training study` — 39214520; nenhum ensaio de hipertrofia; sissy squat: nada.
- `push-up wrist pain hand position fist parallettes wrist extension load` — 29157783, 18294538, 7676844; nenhum ensaio em pessoas.
- `furniture tip-over injuries emergency department chairs tables national estimates` — 34446115, 24322954, 3842162 (1985); só crianças.
- `single leg bridge hamstring bridge feet elevated EMG gluteus hamstrings` — 28900560, 39933727, 41350914, 38876665.
- `bench dip shoulder extension anterior shoulder kinematics EMG` — 36293792 (`mckenzie2022`).
- `pike push-up OR handstand push-up electromyography deltoid` — nada de pike; só flexões (16095413, 20664364, 25882770).
- `prone back extension superman lumbar spine compression load McGill` — nada direto; 1758295 (levantamento pesado).
- `Callaghan Gunning McGill 1998 …` (web aberta) — citação confirmada só em catálogos; sem PMID.
- `Bulgarian split squat knee joint load patellofemoral rear foot elevated biomechanics` — 37272685, 11949662, 41512088; nenhuma medida direta no búlgaro.
- `eccentric knee flexor sliding leg curl training RCT fascicle strength` — nenhum ensaio da flexão deslizante; 40739858 (flywheel).

**Web (vídeos, YouTube e outros)**, 26 buscas: nórdico em casa e montagem (geral, Squat University, E3 Rehab, Jeff Nippard, Hybrid Calisthenics); flexão deslizante (E3 Rehab, toalha, RP, Jeff Nippard); ponte (Bret Contreras); stiff unilateral sem peso (E3 Rehab); remada na mesa (Hybrid Calisthenics); remada na porta com toalha; pike (FitnessFAQs); flexão (Jeremy Ethier; fechada e diamante; Hybrid Calisthenics); mergulho na cadeira (Athlean-X); búlgaro com dor no joelho (Squat University); afundo para trás; step-up na cadeira (geral, Squat University); superman; Y-T-W; panturrilha unilateral (Jeff Nippard; RP); sissy squat e nórdico invertido (Squat University). Leitura direta de youtube.com e e3rehab.com: **bloqueada pela rede da sessão**.

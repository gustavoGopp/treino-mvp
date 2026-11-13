# Pacote 1: o treino usa o tempo que sobra

> Sessão "treino para todos", etapa 2 (13/11/2026). **Está no ramo `claude/nifty-albattani-mltt95`, não na `main`.** Parado aqui para a revisão do Gustavo. Todas as pessoas são fictícias. As notas das revisões cegas são de revisores simulados no papel de treinadores: opinião, não evidência.

## 1. O que mudou, em uma frase

Quando o treino montado ainda não usa o tempo que a pessoa pediu, o tempo que sobra vira série, em todos os dias. Antes, isso só acontecia nos dias em que faltava exercício por causa do equipamento; quem tinha academia completa e não escolhia foco ficava com 2 séries de tudo, qualquer que fosse o nível e o tempo.

A regra é `tempo.sobra-series` (2º passo), em `docs/pesquisa/regras.md`, com o selo **consenso**: a direção (mais séries, mais músculo, com retorno decrescente) é robusta; os alvos por nível, a ordem e as travas são escolha do projeto.

Como funciona:

1. O programa é montado como hoje, com os cortes de tempo e os complementos de hoje. **Os exercícios não mudam.**
2. Depois, enquanto o dia couber nos minutos, entra uma série por vez: primeiro o foco, depois o músculo mais longe do alvo, no exercício com menos séries e no dia mais vazio.
3. Sem foco, cada músculo sobe até o alvo do nível (12 séries por semana para o intermediário, 14 para o avançado). Com 1 ou 2 grupos de foco, o foco sobe primeiro, até o máximo do nível, e os outros ficam pelo menos 6 séries abaixo dele. Com 3 grupos de foco ou mais, o foco fica na meta.
4. **Para o iniciante, só os exercícios grandes (os que mexem mais de uma articulação) ganham série, e até 3 por exercício.** Veja a seção 4.
5. Travas: nunca mais de 4 séries por exercício nem de 10 por músculo no mesmo treino; nenhum músculo passa do máximo do nível; o dia que precisou de bi-set ou drop set para caber fica como está; nenhuma série de empurrar entra se desequilibrar empurrar e puxar; com 30 min, o abdômen e a panturrilha que entraram "para não ficar a zero" continuam com 2 séries.
6. Se, com tudo isso, o dia típico ainda usa menos de 70% do tempo, o app avisa: "O seu treino completo dura cerca de X min… Dá para escolher uma duração menor sem perder nada" (e, para quem não tem foco, "para usar mais tempo, escolha um grupo de foco").

## 2. O antes e o depois, em pessoas

Das doze pessoas dos exemplos, **quatro mudam e oito ficam exatamente iguais** (Ana, Diego, Elisa, Fábio, Gilberto, Íris, Jonas e Kátia já usavam o tempo delas, ou não têm equipamento para mais).

### A Marina: intermediária, academia completa, 4 dias de 60 min, quer ficar mais forte, sem foco

**Superior A**: cerca de 46 min → 59 min

| Antes (main) | Agora (ramo) |
| --- | --- |
| 2 × 5 a 8 · Supino reto com halteres | **3 × 5 a 8 · Supino reto com halteres** |
| 2 × 5 a 8 · Puxada unilateral ajoelhado na polia alta (cada lado) | 2 × 5 a 8 · Puxada unilateral ajoelhado na polia alta (cada lado) |
| 2 × 8 a 12 · Remada com halteres, peito apoiado no banco inclinado | 2 × 8 a 12 · Remada com halteres, peito apoiado no banco inclinado |
| 2 × 10 a 15 · Tríceps francês na polia com corda | **3 × 10 a 15 · Tríceps francês na polia com corda** |
| 3 × 12 a 20 · Elevação lateral com halteres | **4 × 12 a 20 · Elevação lateral com halteres** |
| 2 × 8 a 12 · Rosca inclinada com halteres | 2 × 8 a 12 · Rosca inclinada com halteres |
| 2 × 10 a 15 · Crucifixo na polia (crossover) | **3 × 10 a 15 · Crucifixo na polia (crossover)** |
| 2 × 12 a 20 · Crucifixo invertido na polia, com os cabos cruzados | **3 × 12 a 20 · Crucifixo invertido na polia, com os cabos cruzados** |

**Inferior A**: cerca de 37 min → 58 min

| Antes (main) | Agora (ramo) |
| --- | --- |
| 2 × 5 a 8 · Agachamento livre com barra (profundo) | **4 × 5 a 8 · Agachamento livre com barra (profundo)** |
| 2 × 5 a 8 · Stiff com halteres | **4 × 5 a 8 · Stiff com halteres** |
| 2 × 8 a 15 · Flexão de joelho na cadeira flexora (sentado) | **3 × 8 a 15 · Flexão de joelho na cadeira flexora (sentado)** |
| 2 × 10 a 15 · Cadeira extensora | **3 × 10 a 15 · Cadeira extensora** |
| 3 × 10 a 15 · Panturrilha unilateral no step (cada lado) | **4 × 10 a 15 · Panturrilha unilateral no step (cada lado)** |
| 2 × 10 a 15 · Abdominal na polia com corda, ajoelhado | 2 × 10 a 15 · Abdominal na polia com corda, ajoelhado |

**Superior B**: cerca de 43 min → 59 min

| Antes (main) | Agora (ramo) |
| --- | --- |
| 2 × 5 a 8 · Supino inclinado com halteres | **4 × 5 a 8 · Supino inclinado com halteres** |
| 2 × 5 a 8 · Remada baixa com triângulo | 2 × 5 a 8 · Remada baixa com triângulo |
| 2 × 8 a 12 · Puxada ajoelhado na polia alta com barra reta | 2 × 8 a 12 · Puxada ajoelhado na polia alta com barra reta |
| 3 × 10 a 15 · Elevação lateral unilateral na polia (cada lado) | **4 × 10 a 15 · Elevação lateral unilateral na polia (cada lado)** |
| 2 × 8 a 12 · Rosca na máquina | **3 × 8 a 12 · Rosca na máquina** |
| 2 × 10 a 15 · Tríceps na polia com corda | **3 × 10 a 15 · Tríceps na polia com corda** |
| 2 × 12 a 20 · Face pull com corda | **3 × 12 a 20 · Face pull com corda** |

**Inferior B**: cerca de 44 min → 60 min

| Antes (main) | Agora (ramo) |
| --- | --- |
| 2 × 5 a 8 · Afundo estático com halteres (cada lado) | **3 × 5 a 8 · Afundo estático com halteres (cada lado)** |
| 2 × 5 a 8 · Stiff unilateral com halter (cada lado) | **3 × 5 a 8 · Stiff unilateral com halter (cada lado)** |
| 2 × 10 a 15 · Coice na máquina de glúteo (cada lado) | **4 × 10 a 15 · Coice na máquina de glúteo (cada lado)** |
| 2 × 8 a 15 · Flexão de joelho na cadeira flexora (sentado) | 2 × 8 a 15 · Flexão de joelho na cadeira flexora (sentado) |
| 2 × 10 a 15 · Cadeira extensora | 2 × 10 a 15 · Cadeira extensora |
| 3 × 12 a 20 · Panturrilha em pé no step | **4 × 12 a 20 · Panturrilha em pé no step** |
| 2 × 10 a 15 · Abdominal na máquina | 2 × 10 a 15 · Abdominal na máquina |

| Séries por semana | peito | costas | ombro lateral | ombro de trás | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Antes | 6 | 9 | 6 | 8 | 8 | 6 | 8 | 8 | 6 | 6 | 4 |
| Agora | **10** | **9,5** | **8** | **10** | **9** | **9,5** | **12** | **12** | **11** | **8** | 4 |

Na semana: 60 séries e cerca de 170 min → **83 séries e cerca de 236 min**. Os exercícios são os mesmos (26).

### O Leandro: iniciante, academia completa, 3 dias de 60 min, dor 7 no joelho, sem foco

**Corpo todo A**: cerca de 51 min → 57 min

| Antes (main) | Agora (ramo) |
| --- | --- |
| 2 × 6 a 10 · Supino reto com halteres | 2 × 6 a 10 · Supino reto com halteres |
| 2 × 10 a 15 · Puxada unilateral ajoelhado na polia alta (cada lado) | **3 × 10 a 15 · Puxada unilateral ajoelhado na polia alta (cada lado)** |
| 2 × 8 a 12 · Stiff com halteres | **3 × 8 a 12 · Stiff com halteres** |
| 2 × 10 a 15 · Tríceps francês na polia com corda | 2 × 10 a 15 · Tríceps francês na polia com corda |
| 3 × 10 a 15 · Elevação lateral unilateral na polia (cada lado) | 3 × 10 a 15 · Elevação lateral unilateral na polia (cada lado) |
| 2 × 10 a 15 · Crucifixo com halteres no banco plano | 2 × 10 a 15 · Crucifixo com halteres no banco plano |
| 2 × 8 a 12 · Rosca direta na polia com barra reta | 2 × 8 a 12 · Rosca direta na polia com barra reta |
| 2 × 10 a 15 · Abdominal na máquina | 2 × 10 a 15 · Abdominal na máquina |

**Corpo todo B**: cerca de 51 min → 54 min

| Antes (main) | Agora (ramo) |
| --- | --- |
| 2 × 8 a 12 · Stiff unilateral com halter (cada lado) | **3 × 8 a 12 · Stiff unilateral com halter (cada lado)** |
| 2 × 6 a 10 · Supino inclinado com halteres | 2 × 6 a 10 · Supino inclinado com halteres |
| 2 × 8 a 12 · Remada com halteres, peito apoiado no banco inclinado | 2 × 8 a 12 · Remada com halteres, peito apoiado no banco inclinado |
| 2 × 8 a 12 · Rosca inclinada com halteres | 2 × 8 a 12 · Rosca inclinada com halteres |
| 3 × 10 a 15 · Panturrilha em pé na máquina | 3 × 10 a 15 · Panturrilha em pé na máquina |
| 3 × 12 a 20 · Crucifixo inverso com halteres, peito apoiado no banco inclinado | 3 × 12 a 20 · Crucifixo inverso com halteres, peito apoiado no banco inclinado |
| 2 × 12 a 20 · Abdução na cadeira abdutora | 2 × 12 a 20 · Abdução na cadeira abdutora |
| 2 × 10 a 15 · Abdominal na máquina | 2 × 10 a 15 · Abdominal na máquina |

**Corpo todo C**: cerca de 53 min → 56 min

| Antes (main) | Agora (ramo) |
| --- | --- |
| 2 × 8 a 12 · Supino sentado na máquina | 2 × 8 a 12 · Supino sentado na máquina |
| 2 × 8 a 12 · Puxada ajoelhado na polia alta com barra reta | **3 × 8 a 12 · Puxada ajoelhado na polia alta com barra reta** |
| 2 × 8 a 12 · Stiff com halteres | 2 × 8 a 12 · Stiff com halteres |
| 2 × 10 a 15 · Coice na máquina de glúteo (cada lado) | 2 × 10 a 15 · Coice na máquina de glúteo (cada lado) |
| 3 × 10 a 15 · Elevação lateral unilateral na polia (cada lado) | 3 × 10 a 15 · Elevação lateral unilateral na polia (cada lado) |
| 2 × 10 a 15 · Tríceps na polia com corda | 2 × 10 a 15 · Tríceps na polia com corda |
| 3 × 10 a 15 · Panturrilha no leg press | 3 × 10 a 15 · Panturrilha no leg press |
| 2 × 10 a 15 · Abdominal na polia com corda, ajoelhado | 2 × 10 a 15 · Abdominal na polia com corda, ajoelhado |

| Séries por semana | peito | costas | ombro lateral | ombro de trás | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Antes | 8 | 6 | 6 | 6 | 7 | 7 | 0 | 6 | 7 | 6 | 6 |
| Agora | 8 | **8** | 6 | **7** | **8** | 7 | 0 | **8** | **8** | 6 | 6 |

Na semana: 53 séries e cerca de 155 min → **57 séries e cerca de 167 min**. Os exercícios são os mesmos (21).

O Leandro ganha uma série em quatro exercícios grandes e fica com 3 a 6 minutos de folga por dia. (As puxadas "ajoelhado" com dor no joelho continuam: são do pacote 0, que ainda não foi decidido.)

### O Bruno e a Carla (4 grupos de foco cada)

- Bruno: a elevação lateral do Inferior B vai de 3 para 4 séries (o dia vai de 55 para 57 min). Nada mais muda.
- Carla: a remada baixa do dia Puxar vai de 3 para 4 séries (de 41 para 43 min). Nada mais muda.

Com 3 grupos de foco ou mais, o foco fica na meta e os outros músculos ficam abaixo dele de propósito; por isso alguns dias dos dois continuam curtos (o Inferior A do Bruno, 40 min em 70; o Puxar da Carla, 43 em 75). É a regra do "foco com manutenção" e do limite de 2 grupos de foco, que este pacote não mexe.

## 3. O antes e o depois, medido

Em 680.625 programas fictícios (55 equipamentos × 3 níveis × 2 a 6 dias × 5 durações × 11 focos × 15 situações de dor), em duas contas: a grade (cada combinação vale igual) e a ponderada (as combinações mais prováveis valem mais; os pesos são estimativa).

| | Antes (main) | Agora (ramo) |
|---|---:|---:|
| Programas sem nenhum defeito na régua oficial, conta ponderada | 79,0% | **94,4%** |
| Idem, na grade | 80,3% | **83,6%** |
| Dia típico abaixo de 70% do tempo pedido, sem aviso (ponderada) | 15,2% | 0,0% |
| Dia típico abaixo de 70% do tempo, com ou sem aviso (ponderada) | 24,7% | 17,9% |
| Dia de 5 exercícios ou mais com 2 séries em todos (ponderada) | 21,8% | 15,1% |
| Intermediários e avançados com a média abaixo da faixa do nível (ponderada) | 51,6% | 42,9% |
| Séries por músculo por semana (média ponderada) | 7,3 | 7,8 |
| Programas de 60 min sem defeito (ponderada) | 82,0% | 97,9% |
| Programas de 90 min sem defeito (ponderada) | 43,8% | 97,7% |
| Programas que mudam (amostra de 11.158) | — | 16 em cada 100 |

**Nenhum dos 9 defeitos da régua sobe em nenhum dos 44 grupos** (equipamento, nível, minutos, dias, foco, dor), nem em nenhum recorte mais fino: a contagem de cada defeito é igual ou menor em todos. A tabela por grupo está em [`qa.md`](qa.md).

**O que este pacote não melhora:**

- O pior grupo continua sendo a dor forte no cotovelo, com 50,0% sem defeito: é assunto do pacote 3.
- Quem tem 30 minutos continua com 67,6% (grade): a regra não mexe em dia que já está no limite.
- Para o iniciante, quase todo o ganho na régua (de 79,8% para 95,8%, ponderada) vem do **aviso**, e não do tempo usado: o app agora diz que o treino dura menos do que o pedido. As séries do iniciante sobem pouco (de 56,5 para 57,1 por semana, em média), de propósito (seção 4).

**O que piora um pouco (são "notas", não defeitos):**

- "O mesmo músculo com 3 séries ou mais em dias seguidos" vai de 4,8% para 5,3% dos programas (ponderada). O app não sabe quais dias de treino são seguidos na semana da pessoa; não há regra sobre isso em `regras.md`. Fica registrado no backlog.
- Na amostra, "músculo com 8 séries diretas num dia só" aparece em 9 programas a mais em 11.158, e "o foco não passa da mediana dos outros" em 1 a mais.

## 4. O que mudou em relação à proposta da etapa 1, e por quê

Três coisas, todas para cumprir "nenhum defeito pior em nenhum grupo" e "nenhuma pessoa pior na revisão cega":

1. **As séries entram no fim, e não no meio da montagem.** No protótipo da etapa 1, as séries a mais entravam antes de o gerador terminar o dia e tomavam o lugar de exercícios (em treinos de 30 min, um dia chegava a ficar sem exercício grande). Agora o treino de hoje fica pronto primeiro e as séries entram por cima. Por construção, nenhum exercício some.
2. **Travas novas:** nem o foco passa do máximo do nível; dia com bi-set ou drop set não ganha série; o empurrar não passa do puxar.
3. **O iniciante.** A primeira versão dava séries ao iniciante em todos os exercícios até encher a hora. Na revisão cega, o Leandro piorou nas duas rodadas (seção 5). Testei então duas versões em cinco iniciantes com tempo sobrando. "Tudo até encher" baixou a nota de 2 dos 5, sempre pelo mesmo motivo dito pelos três revisores: 8 exercícios com 3 a 4 séries e o dia no limite, sem folga, é demais para quem está aprendendo. "Só os exercícios grandes, até 3 séries" não baixou a de nenhum e subiu a de 4. Entrou a segunda; a primeira fica registrada como medida e recusada.

O que é ciência, costume e aposta: que mais séries rendem mais músculo é ciência (robusta). Que o iniciante deve gastar o tempo extra nos exercícios grandes é costume de treinador, confirmado só pelos revisores simulados. Os números (12 e 14 séries, até 3 para o iniciante) são escolha do projeto.

## 5. A revisão cega

Três revisores (subagentes no papel de treinadores, cada um com um olhar: eficiência; adequação e segurança; "parece treinador ou máquina") deram 3 notas de 1 a 10 por página, sem saber qual versão era qual. As páginas, as chaves e as notas estão em [`revisao-cega/pacote-1/`](revisao-cega/pacote-1/).

**1ª rodada: as 18 pessoas de sempre, a `main` e a versão nova embaralhadas (36 páginas).** Médias: eficiente 5,5 → 5,8 · adequada 5,6 → 5,8 · agradável 5,2 → 5,4. Para 11 das 18 pessoas as duas páginas eram idênticas, e os revisores deram notas idênticas. **2ª rodada: só as 7 pessoas que mudavam (14 páginas), em outra ordem**, para separar ruído de piora de verdade.

As três notas são eficiente · adequada · agradável; a diferença é na soma das três.

| Pessoa | 1ª rodada: antes | agora | diferença | 2ª rodada: antes | agora | diferença |
| --- | --- | --- | ---: | --- | --- | ---: |
| Marina (intermediária, academia, 4 × 60 min, sem foco) | 4,7 · 5,7 · 5,7 | 7,3 · 7,3 · 6,7 | +5,3 | 5,0 · 5,7 · 6,0 | 7,0 · 7,0 · 6,0 | +3,3 |
| Perfil X2 (avançado, academia, 5 × 90 min, sem foco) | 4,3 · 4,3 · 3,7 | 7,0 · 6,3 · 6,0 | +7,0 | 4,0 · 4,3 · 4,7 | 7,7 · 7,7 · 7,0 | +9,3 |
| Perfil X3 (dor 7 no ombro, academia, 4 × 60 min) | 2,7 · 4,0 · 2,3 | 3,7 · 4,0 · 3,0 | +1,7 | 3,0 · 4,0 · 3,0 | 4,7 · 4,7 · 4,0 | +3,3 |
| Perfil X6 (avançada, halteres até 12 kg, 4 × 75 min, foco em pernas) | 6,3 · 6,0 · 5,3 | 6,0 · 6,0 · 5,0 | -0,7 | 6,0 · 6,3 · 5,0 | 7,0 · 7,0 · 6,0 | +2,7 |
| Carla (avançada, academia completa, 5 × 75 min, 4 focos) | 7,0 · 7,3 · 6,0 | 7,0 · 7,3 · 6,0 | 0 | 7,0 · 7,7 · 6,7 | 7,0 · 7,7 · 6,7 | 0 |
| Bruno (intermediário, academia de prédio, 4 focos) | 5,0 · 5,7 · 4,7 | 5,0 · 5,7 · 4,7 | 0 | 5,3 · 6,0 · 5,0 | 5,0 · 6,0 · 5,0 | -0,3 |
| Leandro (iniciante, academia, 3 × 60 min, dor 7 no joelho) ¹ | 6,0 · 5,7 · 6,3 | 5,7 · 5,3 · 5,7 | -1,3 | 6,0 · 6,3 · 6,0 | 6,0 · 5,3 · 5,0 | -2,0 |

¹ O Leandro foi avaliado nessas duas rodadas com a primeira versão do iniciante (séries em tudo), que piorou nas duas e foi recusada. A versão adotada está na 3ª rodada.

Leitura: a Marina e o Perfil X2 sobem muito nas duas rodadas (é para eles que a regra existe); o Perfil X3 sobe; a Carla fica igual; o Perfil X6 caiu 0,7 na 1ª e subiu 2,7 na 2ª (ruído); o Bruno ficou igual na 1ª e caiu 0,3 na 2ª (um ponto de um revisor, pela elevação lateral no dia de pernas).

**3ª rodada: cinco iniciantes com tempo sobrando, três versões de cada (15 páginas).**

| Pessoa | Antes (main) | Só os exercícios grandes, até 3 séries (**adotada**) | Tudo até o alvo de 8 (recusada) |
| --- | --- | --- | --- |
| Iniciante, academia completa, 4 × 60 min, sem foco | 5,3 · 6,7 · 6,0 (soma 18,0) | 6,0 · 7,0 · 6,3 (soma 19,3) | 7,3 · 7,7 · 6,7 (soma 21,7) |
| Iniciante, academia do condomínio, 3 × 60 min, sem foco | 6,0 · 6,7 · 6,3 (soma 19,0) | 6,7 · 6,0 · 6,3 (soma 19,0) | 7,0 · 6,0 · 5,7 (soma 18,7) |
| Iniciante, em casa (halteres e elásticos), 3 × 60 min, sem foco | 6,0 · 7,0 · 6,3 (soma 19,3) | 7,0 · 7,0 · 6,0 (soma 20,0) | 7,0 · 6,3 · 6,0 (soma 19,3) |
| Iniciante, academia completa, 3 × 75 min, sem foco | 5,7 · 6,7 · 6,0 (soma 18,3) | 7,0 · 7,7 · 7,0 (soma 21,7) | 7,7 · 7,7 · 6,7 (soma 22,0) |
| Leandro (iniciante, academia, 3 × 60 min, dor 7 no joelho) | 5,7 · 6,7 · 6,3 (soma 18,7) | 6,7 · 6,3 · 6,3 (soma 19,3) | 6,7 · 5,7 · 5,7 (soma 18,0) |
| **Média da soma** | 18,7 | **19,9** | 19,9 |

Na versão adotada, nenhuma soma fica abaixo da de antes. Em duas pessoas a nota "adequada" cai um pouco e a "eficiente" sobe (a academia do condomínio fica com a soma igual; o Leandro, 0,7 acima).

**As críticas que continuam, nas duas versões** (não são deste pacote): dias quase vazios com dor forte; costas a zero sem nada para puxar; 8 exercícios por dia para o iniciante; puxada "ajoelhado" com dor no joelho e no lugar da puxada comum; elevação lateral em dia de pernas; quem tem 3 focos ou mais com dias de pernas curtos.

## 6. Os registros de teste que mudam (preciso do seu ok para regravar)

Os testes guardam "fotografias" de alguns programas. Cinco delas mudam com este pacote, todas pelo mesmo motivo (uma série a mais no Bruno e na Carla). **Não regravei nenhuma**; por isso `npm run check` acusa essas 5 diferenças, e só elas.

| Registro | O que muda |
|---|---|
| `gerador.test.ts`, cenário do Bruno | Inferior B: elevação lateral 3 → 4 séries (55 → 57 min); ombro lateral 12 → 13 séries por semana |
| `gerador.test.ts`, cenário da Carla | Puxar: remada baixa 3 → 4 séries (41 → 43 min); costas 14 → 15, bíceps 10,5 → 11, ombro de trás 10,5 → 11 |
| `locais.test.ts`, o Bruno na academia do bairro | Inferior B: elevação lateral 3 → 4 séries |
| `personas-r2.test.ts`, a Carla na volta de 30 dias | a semana de antes da pausa passa de 16 para 17 séries no dia |
| `personas-r2.test.ts`, o Bruno de volta | a semana de antes da pausa passa de 18 para 19 séries no dia |

Dois testes foram reescritos, porque descreviam a regra de antes:

- `gerador.test.ts`: "com o equipamento completo, nada muda… as séries não sobem por sobra" virou "…nenhum exercício entra por vaga vazia, e o texto das séries não fala de vaga sem exercício". Era exatamente a regra que este pacote muda.
- `prototipo-treino-para-todos.test.ts`: o protótipo era comparado ao app com tudo desligado; agora é comparado com as regras já adotadas ligadas.

Testes novos: `tests/unit/tempo-que-sobra.test.ts` (15 testes, em 156 combinações das 12 personas): os exercícios e as técnicas não mudam e nenhuma série desce; o dia cabe nos minutos; dia com bi-set ou drop set fica igual; ninguém passa do máximo do nível; com 3 focos o foco não passa da meta; empurrar não passa de 1,5 vez o puxar; o iniciante só ganha série nos exercícios grandes, até 3; os textos dizem o que foi feito; a mesma entrada dá o mesmo programa.

## 7. Conferências

| Conferência | Resultado |
|---|---|
| `npm run check` (lint, tipos, testes) | lint e tipos limpos; 932 testes passam; **5 falham: são os 5 registros da seção 6**, que esperam o seu ok |
| `npm run test:e2e` (o app no navegador, de ponta a ponta) | 157 de 157 passam |
| O gerador continua determinístico | a mesma entrada dá o mesmo programa (teste novo e as 2.106 combinações do teste antigo) |
| O protótipo com a regra ligada dá o mesmo programa que o app | sim, nas 12 personas (`prototipo-treino-para-todos.test.ts`) |
| A régua antes e depois, por grupo | [`qa.md`](qa.md): nenhum defeito sobe em nenhum grupo |
| A simulação de meses (o aviso de "sem melhora") | refeita: idêntica à da etapa 1 (ela segue um exercício com séries fixas; este pacote não mexe na progressão) |
| `npm run auditoria:verificar` (a auditoria oficial, duas rodadas com arquivos idênticos, e a linha de base da régua) | em andamento quando este relatório foi escrito; o resultado entra aqui |
| `src/engine/`, telas, `api/`, `src/storage/` | sem mudança. Fora de `src/domain/`, mudou só `src/conteudo/fontes.json`, que é gerado a partir de `docs/pesquisa/fontes.md` (entrou a fonte `schoenfeld2021b`, citada pela regra) |

## 8. Para quem já usa

Quem treina com 60 min ou mais, sem foco ou com 1 ou 2 focos, e tinha tempo sobrando, vê "Há uma versão nova do seu programa", com mais séries nos mesmos exercícios. As cargas registradas continuam valendo. Nada muda no que fica guardado no aparelho. Lembrete para a hora de levar à `main`: exportar os dados antes (Meus dados → Exportar).

## 9. Decisões

Uma por vez, com a minha recomendação; nada vem marcado.

1. **Posso regravar os 5 registros de teste da seção 6?** *Recomendo sim:* as cinco mudanças são uma série a mais no Bruno e na Carla, dentro da regra.
2. **O iniciante com série a mais só nos exercícios grandes, até 3 (seção 4)?** *Recomendo sim.* É a versão que não piorou ninguém. A outra (encher a hora) fica guardada para o pacote 4, quando o treino do iniciante tiver menos exercícios por dia.
3. **O próximo pacote.** *Recomendo o pacote 0 (os exercícios feitos de joelhos saem com dor forte no joelho):* é de segurança, é pequeno, e os revisores voltaram a apontar o problema no Leandro nas três rodadas. É a decisão 3 da proposta, que ainda não foi tomada.

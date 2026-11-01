# 7. Progressão e acompanhamento (tema T6)

> Pesquisa de 01/11/2026. Estudos com o **resumo oficial lido no PubMed** (resumo-PubMed, com PMID), salvo quando marcado **não verificado**. As fontes de pausa (Hwang, Ogasawara, Chen, Bosquet) e Moesgaard 2022 foram lidas no T5 (`06`) e no `02`. O texto completo não foi lido (PMC e editoras bloqueados na rede da sessão). As medições usaram o código real do app, com scripts temporários fora do repositório **[medido]**. Onde o texto é opinião do projeto, aparece **[opinião]**.
>
> Base do marco **R2** (critério 6 do `PLANO-MVP.md`). Nada aqui muda `regras.md` nem o código sem a aprovação do Gustavo.

## Resumo
1. **Hoje o app não percebe quando a pessoa para de treinar** **[medido]**. A "semana do programa" anda com o calendário. Quem treinou 1 semana e sumiu 30 dias volta como se tivesse treinado o tempo todo: a iniciante Ana volta com **16 séries no treino em vez de 14 e RIR mais baixo**, e o Bruno volta com **20 séries, RIR 1–2 e a mesma carga**, quando a regra aprovada manda **12 séries (~55%), RIR 3–4 e carga 10% menor**. A correção proposta é contar os dias desde o último treino e aplicar sozinho a regra de volta aprovada no T5.
2. **"Treinou menos do que devia" passa a ser "treinou menos do que você planejou"**, sem culpa. Para a saúde, 1 treino de força por semana já conta. Nas coortes, o maior benefício veio com ~30–60 min de força por semana. E só ~1 em cada 4 adultos treina força 2 vezes por semana. Para o músculo, 1 treino por semana com séries pesadas mantém o que foi ganho, e a meta de séries é o que faz crescer.
3. **A reserva (RIR) que as pessoas relatam erra cerca de 1 repetição, para o lado de achar que falta menos do que falta.** O erro é maior nas séries com mais de ~12 repetições e não depende da experiência. Por isso, a calibração da carga na 1ª série usa fórmula só até ~12 repetições. Acima disso, sobe em passos pequenos, sempre arredondando para baixo.
4. **Semana leve: só quando há sinal** (cansaço relatado, dor que se repete ou 2 exercícios parados), e não mais "a cada 6–8 semanas". Dois ensaios não acharam diferença de crescimento com ou sem semana leve.
5. **Acompanhar o próprio progresso ajuda a manter o hábito**, sobretudo quando junto com meta e retorno (meta-análises com dezenas de milhares de pessoas). "A sua semana" é exatamente isso: registro + meta + retorno.

## 0. Como o app faz hoje **[medido em 01/11/2026]**
Simulação com o código real e as personas fictícias de `tests/personas/`: uma semana de treino (uma sessão de cada dia do programa, em dias alternados), depois uma pausa, depois a volta. Bruno foi rodado como "treinando" no cadastro, para isolar o efeito da pausa durante o uso.

| Pausa | Ana (iniciante, 3 dias): semana do app na volta | Ana: séries do treino A e RIR | Bruno (intermediário, 4 dias): semana na volta | Bruno: séries do torso A, RIR e carga | O que a regra aprovada manda |
|---|---|---|---|---|---|
| 10 dias | 3 | 16 (eram 14), RIR 2–3 e 1–2 | 3 | 20, RIR 1–2 e 0–1, mesma carga | Retomar normal, mesma carga (Ana: ainda na fase de aprendizado) |
| 16 dias | 3 | 16, RIR 2–3 e 1–2 | 4 | 20, mesma carga | 1ª sessão de cada treino com RIR +1 |
| 22 dias | 4 | 16, RIR 2–3 e 1–2 | 5 | 20, mesma carga | Volta gradual: ~55% das séries, RIR 3–4, carga −10% |
| 30 dias | 5 | 16, RIR 2–3 e 1–2 | 6 | 20, mesma carga | Igual a 22 dias |
| 70 dias | 11 | 16, RIR 2–3 e 1–2 | 11 | 20, mesma carga | Volta gradual, carga −10 a −20% |

**Por que acontece** (lido no código):
- `semanaDoPrograma` (`src/domain/sessao`) conta semanas do calendário desde a 1ª sessão.
- A readaptação (`fases` em `src/domain/gerador`) só existe se a pausa foi marcada **no cadastro** (`perfil.semanasParado`).
- `sugerirProgressao` (`src/domain/progressao`) não olha datas: depois de qualquer pausa ele diz "mantenha a carga e busque +1 repetição".
- A redução de carga de `readaptacao.semana1` existe só no texto: nenhuma função a aplica.
- Para a Ana há um segundo efeito: a fase de aprendizado (semanas 1–2) acaba pelo calendário, mesmo que ela tenha treinado só 1 semana.

**Outros achados:**
- `sugerirSemanaLeve` só é chamada nos testes, nunca por uma tela. Com 6 semanas seguidas, sem nada parado e sem cansaço, ela **sugere** a semana leve ("6 semanas sem pausa").
- Não há tela de semana nem de evolução. O fim do treino (`Resumo.tsx`) mostra o resumo da sessão e a sugestão de cada exercício para a próxima vez.
- Na 1ª vez de um exercício, o app diz "registre a primeira sessão para receber sugestões": não há calibração da carga.

## 1. A dupla progressão é a melhor forma? (pergunta 1)

| Pergunta | Achado | Selo | Fonte |
|---|---|---|---|
| Subir repetições ou subir carga? | 43 pessoas treinadas, 8 semanas, pernas: subir repetições com a carga fixa e subir a carga com repetições fixas deram crescimento e força parecidos (diferenças pequenas, de importância prática duvidosa). | um estudo | Plotkin 2022 (36199287) |
| Periodizar ajuda a crescer? | Com volume igual, não muda a hipertrofia (já em `regras.md`). | moderada | Moesgaard 2022 (35044672) |
| Ajustar a carga pelo desempenho do dia (autorregulação)? | Em atletas, ajustar a carga pelo número de repetições feitas (APRE), pelo esforço percebido (RPE) ou pela velocidade deu **mais força** que a carga fixa em % da carga máxima (8 estudos, 166 pessoas; e uma metanálise em rede de 2025). **Não mediram hipertrofia.** | moderada (para força) | Zhang 2021 (33776802); Huang 2025 (40791980) |
| Prescrever por % da carga máxima funciona? | Com 70% da carga máxima, as repetições variaram muito entre pessoas e entre séries (12,5 → 6 → 4 em 3 séries), o que torna a prescrição por % difícil de reproduzir. | um estudo | Heredia-Elvar 2022 (35741372) |

**Resposta:** a dupla progressão **não foi provada melhor** que outras formas, mas também não perde: subir repetições e subir carga funcionam parecido para crescer. Ela continua sendo a escolha do app por três motivos práticos **[opinião]**:
1. Funciona com halteres fixos de 1 em 1 kg ou de 2 em 2 kg, em que o próximo peso costuma ser um salto grande.
2. Ela já é uma forma de autorregulação: a carga sobe quando a pessoa mostra que aguenta.
3. Ela não exige saber a carga máxima.

O selo das regras `progressao.*` continua **consenso** (os números "2 sessões" e "topo da faixa" são de treinadores).

## 2. Calibração da carga na 1ª série (pergunta 2, peça 5)

### 2.1 Quão confiável é o RIR que as pessoas relatam?

| Pergunta | Achado | Selo | Fonte |
|---|---|---|---|
| Erro médio | As pessoas **subestimam** quantas repetições ainda conseguiriam, em ~**0,95 repetição** em média (12 estudos, 414 pessoas). A variação entre estudos é muito grande, e a variação entre pessoas foi de ~1,5 repetição (desvio padrão). | moderada | Halperin 2022 (34542869) |
| Quando erra mais | Quanto **mais longe da falha** e quanto **mais repetições** na série, maior o erro. Acima de 12 repetições, o erro cresce bem mais rápido (inclinação 0,47 contra 0,06 até 12). Erra menos nas últimas séries. | moderada | Halperin 2022; Zourdos 2021 (30747900); Remmert 2023 (37036795) |
| Exemplo medido | Agachamento com 70% da carga máxima (~16 repetições): quem disse "faltam 5" errou por ~5 repetições; quem disse "falta 1" errou por ~2. | um estudo (25 homens treinados) | Zourdos 2021 (30747900) |
| A experiência ajuda? | **Não** de forma clara: a experiência de treino e a de usar a escala não mudaram a precisão. | moderada (quatro estudos na mesma direção) | Halperin 2022; Zourdos 2021; Remmert 2023; Bermúdez Droguett 2025 (42211811) |
| Sexo muda? | Não, em máquinas de um só movimento. | um estudo | Remmert 2023 (37036795) |

**O que isso quer dizer para o app** **[opinião, apoiada nos achados]**:
- Usar o RIR relatado **sem corrigir** já erra para o lado seguro. A pessoa costuma ter mais reserva do que diz, então a carga calculada sai um pouco mais leve que a ideal.
- Uma diferença de 1–2 repetições entre o que se queria e o que saiu **está dentro do erro**: não vale mudar a carga por isso.
- Em séries longas (mais de ~12 repetições), o número relatado é pouco confiável, e a conta tem que ser conservadora.

### 2.2 As fórmulas de carga máxima e o erro delas

As fórmulas transformam "carga × repetições até a falha" numa estimativa da carga máxima (1 repetição). As mais usadas (Epley, Brzycki, Lombardi, Mayhew, O'Conner) **não têm o artigo original no PubMed**: as expressões abaixo são as de uso corrente, **não verificadas** no original. O que foi lido no PubMed foram os **estudos que testaram** as fórmulas.

| Pergunta | Achado | Selo | Fonte |
|---|---|---|---|
| Elas acertam? | Correlação alta com a carga máxima real (r = 0,82–0,98, 220 homens). Até 10 repetições, a de **Brzycki foi a mais precisa**; acima de 10, todas erraram para cima ou para baixo. A **média de duas fórmulas** pode reduzir o erro. | um estudo (grande) | Mayhew 1995 (7500624) |
| Até quantas repetições? | "Não mais que **10 repetições** em equações lineares" (supino e leg press, 70 pessoas de 18 a 69 anos). A carga cai de forma **não linear** com o número de repetições. | um estudo | Reynolds 2006 (16937972) |
| E em mulheres? | As fórmulas acertaram mais com **menos de 10 repetições**, antes e depois de 12 semanas de treino (103 mulheres). | um estudo | Mayhew 2008 (18714230) |
| A estimativa se repete? | A de Brzycki se repetiu bem de uma semana para a outra (ICC 0,98–0,99) em 5 exercícios, inclusive máquinas. | um estudo | Abdul-Hameed 2012 (23342225) |
| A relação vale para todos? | Na maior base já reunida (269 estudos, 7.289 pessoas), sexo, idade e experiência **quase não mudaram** a relação "repetições × % da carga máxima". A variação **entre pessoas** é maior com cargas leves (muitas repetições), e o leg press permite mais repetições que o supino com o mesmo %. | moderada | Nuzzo 2024 (37792272) |

**Quanto as fórmulas divergem** **[medido: conta feita com as 5 expressões]**:

| Repetições até a falha | % da carga máxima (Epley / Brzycki / Lombardi / Mayhew / O'Conner) | Diferença entre a maior e a menor |
|---|---|---|
| 5 | 86 / 89 / 85 / 84 / 89 | 5 pontos |
| 10 | 75 / 75 / 79 / 76 / 80 | 5 pontos |
| 12 | 71 / 69 / 78 / 74 / 77 | 9 pontos |
| 15 | 67 / 61 / 76 / 71 / 73 | 15 pontos |
| 20 | 60 / 47 / 74 / 66 / 67 | 27 pontos |
| 30 | 50 / 19 / 71 / 60 / 57 | 52 pontos |

Até ~10–12 repetições, as fórmulas concordam (≤ 9 pontos). Acima disso, discordam muito. Isso bate com os estudos lidos e com o erro maior do RIR acima de 12 repetições (Halperin 2022). A tabela de Nuzzo 2024 seria a melhor referência, mas os números dela **não estão no resumo** (texto completo bloqueado): fica para quando abrir.

### 2.3 Regra proposta: `progressao.calibracao` (nova)

**Quando vale:**
- na 1ª vez de um exercício, sem nenhum registro;
- depois de trocar de exercício;
- na volta de uma pausa de mais de 26 semanas.

**Como funciona** (série a série, enquanto houver séries no exercício):
1. **Começo:** o app sugere "a carga mais leve que pareça fácil" para a 1ª série. É o que o diagnóstico de 01/11 já propunha: 30 iniciantes escolheram sozinhos cargas de 42–57% da carga máxima, todas abaixo de 60% (Glass & Stanton 2004, 15142014, um estudo). Começar leve e subir pela calibração corrige isso.
2. **Conta:** R = repetições feitas + reserva relatada. A = meio da faixa + meio do RIR alvo. Exemplo: faixa 8–12 e RIR 2–3 → A = 12,5.
3. **Perto do alvo** (R entre A − 2 e A + 2) → **mantém** a carga. A diferença está dentro do erro do RIR.
4. **Pesada demais** (R < A − 2) → nova carga = carga × (37 − A) / (37 − R), pela fórmula de Brzycki (a mais precisa até 10 repetições, Mayhew 1995), **arredondada para baixo** no inventário.
5. **Leve demais, com R até 12** → a mesma conta, para cima, arredondada para baixo.
6. **Leve demais, com R acima de 12** (onde as fórmulas e o RIR falham):
   - sobe **1 incremento** do inventário, ou **2** se R ≥ A + 6;
   - nunca mais que **+25%** e sempre pelo menos 1 incremento.
7. **Polia (placas), elástico e peso do corpo** não têm kg: só os passos do item 6 (±1 ou ±2 placas ou degraus).
8. **Próxima sessão:** a última carga que caiu "perto do alvo" vira a referência, e a dupla progressão segue normal. Se nenhuma série caiu perto do alvo, a próxima sessão começa pela carga calculada e calibra de novo na 1ª série.
9. **Proteções:**
   - na semana 1 de uma volta de pausa, a calibração **só desce, nunca sobe**, porque a volta existe para evitar dano;
   - dor de 3 ou mais (`seguranca.dor.escala`) manda sempre.

**Selo:** **consenso**. Ninguém testou uma regra de calibração assim. As peças têm apoio: o RIR relatado erra para o lado seguro (moderada); as fórmulas valem até ~10 repetições (um estudo cada, três na mesma direção); ajustar a carga pelo desempenho dá mais força (moderada, em atletas). Os números "±2", "+25%" e "12" são do projeto.

**Casos de teste** **[medido com o inventário das personas]**:

| # | Situação | Conta | Resultado esperado |
|---|---|---|---|
| C1 | Ana, agachamento goblet, faixa 8–12, RIR 2–3 (A = 12,5); 1ª série com 6 kg: 20 repetições, reserva 3 | R = 23 > 12 e ≥ A + 6 → 2 incrementos (8 kg = +33%) → limite de +25% (7,5) → para baixo | **7 kg** |
| C2 | Bruno, supino com halteres, faixa 8–12, RIR 1–2 (A = 11,5); 10 kg: 6 repetições, reserva 1 | R = 7 → 10 × 25,5 / 30 = 8,5 → para baixo | **8 kg** |
| C3 | Bruno, rosca, faixa 10–20, RIR 0–1 (A = 15,5); 8 kg: 14 repetições, reserva 1 | R = 15, dentro de A ± 2 | **mantém 8 kg** |
| C4 | Ana, elevação lateral, faixa 10–20, RIR 1–2 (A = 16,5); 2 kg: 30 repetições, reserva 4 | R = 34 ≥ A + 6 → 2 incrementos (4 kg = +100%) → limite de +25% (2,5 kg) dá 2 kg → mínimo de 1 incremento | **3 kg** |
| C5 | Puxada na polia, placa 5, faixa 8–12, RIR 1–2 (A = 11,5): 15 repetições, reserva 3 | R = 18 ≥ A + 6 → 2 placas | **placa 7** |
| C6 | Bruno, semana 1 da volta de 30 dias, remada com 9 kg, RIR alvo 3–4, faixa 8–12 (A = 13,5): 12 repetições, reserva 5 | R = 17 está acima de A + 2, mas na semana 1 da volta a calibração não sobe | **mantém 9 kg** |
| C7 | Qualquer série com dor 4/10 | a dor manda | reduzir 10–20% e o aviso de dor (`seguranca.dor.escala`) |

## 3. Pausas detectadas sozinhas (pergunta 3, peça 1)

**Base (aprovada no T5, `06`, seção 2):**
- menos de 2 semanas sem treinar não tirou força nem músculo (Hwang 2017, 28328712; Ogasawara 2011, 21771261);
- a proteção contra dano dura ~2 semanas (Chen 2012, 21611825);
- 3 semanas não tiraram músculo (Ogasawara 2011 e 2013);
- a força cai em proporção à pausa (Bosquet 2013, 23347054).

A volta gradual existe para **evitar dor e dano**, não para recuperar músculo perdido. Novo neste tema: com **1 sessão por semana e 1 série por exercício**, força e músculo se mantiveram por até 32 semanas em jovens (Spiering 2021, 33629972, revisão narrativa; Bickel 2011, 21131862, ensaio com 70 pessoas, em que um terço e um nono da dose mantiveram o crescimento nos jovens, mas não nos de 60–75 anos). **Um treino na semana não é pausa.**

### Regra proposta: `readaptacao.durante-uso` (nova)
**Pausa** = dias entre o fim da última sessão terminada e o início da sessão de hoje. Vale para o programa inteiro, e não por exercício **[opinião]**: num programa de 4 dias, cada exercício aparece só uma vez por semana, e uma regra por exercício confundiria um treino normal com uma pausa.

| Dias sem treinar | O que o app faz | Selo |
|---|---|---|
| até 13 | Segue normal, com a mesma carga | moderada (Hwang 2017; Ogasawara 2011) |
| 14 a 20 | Na 1ª sessão de cada dia do programa: RIR +1. Mesma carga | consenso (Chen 2012) |
| 21 a 56 | Volta gradual a partir de hoje: semana 1 com ~55% das séries, RIR 3–4 e carga **−10%**; semana 2 com ~75% e RIR 2–3; semana 3 normal | consenso (aprovado no T5) |
| 57 a 182 | Igual, com carga **−15%** (o meio dos 10–20% aprovados) | consenso **[opinião: escolher um número dentro da faixa aprovada]** |
| mais de 182 (~26 semanas) | Propõe **refazer o nível** (`nivel.classificacao`: mais de ~6 meses parado conta como iniciante); com o aceite, volta gradual e calibração na 1ª série a partir da última carga −20% | consenso |

**A carga da volta** = última carga registrada do exercício × (1 − redução), **arredondada para baixo** no inventário. Na polia: placas × (1 − redução), para baixo. No peso do corpo e no elástico: um degrau abaixo. Sem registro do exercício → calibração na 1ª série (seção 2.3).

**A semana do programa** passa a contar **semanas com treino desde o início do bloco**, e não semanas do calendário **[opinião]**. O bloco começa na 1ª sessão ou na sessão da volta de uma pausa de 21 dias ou mais. Uma semana (segunda a domingo) sem nenhum treino não avança a semana do programa. Isso resolve também a fase de aprendizado da Ana, que hoje acaba pelo calendário.

**A mensagem na volta [opinião]:** "Bem-vindo de volta! Faz 22 dias do último treino. Estas 2 semanas vão mais leves para o corpo se readaptar sem dor. O músculo não some em 3 semanas." Sem "você parou", sem contagem de faltas.

**Casos de teste** (Bruno: última carga do supino 10 kg; o torso A tem 20 séries normalmente. Ana: halteres de 1 em 1 kg):

| # | Situação | Resultado esperado |
|---|---|---|
| P1 | Bruno, 10 dias sem treinar | Normal: 20 séries, RIR do programa, **10 kg** |
| P2 | Bruno, 16 dias | 1ª sessão de cada dia com RIR +1 (1–2 vira 2–3); **10 kg**; a partir da 2ª, normal |
| P3 | Bruno, **22 dias** | **Volta gradual, carga −10%**: semana 1 com 12 séries (~55%, arredondado por exercício), RIR 3–4 e **9 kg**; semana 2 com 15 séries, RIR 2–3; semana 3 com 20 séries **[séries medidas com `prescricaoDaSemana`]** |
| P4 | Bruno, 70 dias | Volta gradual, carga −15%: 8,5 kg → **8 kg** |
| P5 | Bruno, 200 dias | Propõe refazer o nível; com o aceite, calibração começando em **8 kg** (−20%) |
| P6 | Ana, treinou a semana 1 (fase de aprendizado) e ficou 10 dias sem treinar | Volta na **semana 2** do programa: ainda fase de aprendizado, 14 séries, RIR 3–4 (hoje: semana 3, 16 séries) |
| P7 | Bruno, na semana 2 de uma volta, fica mais 15 dias sem treinar | Só a regra de 14–20 dias (RIR +1); a volta gradual não recomeça |
| P8 | Bruno treina 1 vez por semana durante 5 semanas (pausas de 7 dias) | Nunca é pausa; "a sua semana" mostra 1 de 4 (seção 4) |
| P9 | Polia na placa 8, 30 dias | placa 8 × 0,9 = 7,2 → **placa 7** |

## 4. "A sua semana" (perguntas 5 e 6, peça 2)

### 4.1 Quanto as pessoas cumprem as recomendações de força?

| Pergunta | Achado | Selo | Fonte |
|---|---|---|---|
| Quantos adultos treinam força 2 vezes por semana ou mais? | **22,8%** (21 estudos, 2,6 milhões de pessoas). Mulheres, pessoas mais velhas e com menos estudo cumprem menos. | moderada | Ren 2024 (39040428) |
| E força + aeróbio juntos? | **17%** dos adultos (21 estudos, 3,3 milhões de pessoas, 32 países). | moderada | Garcia-Hermoso 2023 (36418149) |
| E num app de treino? | Em 389.481 usuários de um app de treino, só **10,1% dos iniciantes** ainda treinavam pelo menos 1 vez por semana depois de 12 meses (com até 6 semanas de folga); a mediana de abandono foi de **19 semanas**. A **regularidade nos primeiros 28 dias** foi o que mais previu continuar. | um estudo (observacional) | Conti 2026 (42638731) |
| Quanto já faz bem à saúde? | Nas coortes, treino de força se associou a **10–17% menos risco** de morte e de doenças crônicas. O maior benefício (~10–20%) apareceu em ~**30–60 min por semana**, em curva em "J": acima disso, o benefício extra fica incerto. É associação, não prova de causa. | moderada (meta-análise de coortes) | Momma 2022 (35228201) |
| Quanto mantém o músculo? | 1 sessão por semana, 1 série por exercício, com a carga mantida: manutenção por até 32 semanas em jovens; acima de 60 anos pode precisar de 2 sessões. | um estudo + revisão narrativa | Bickel 2011 (21131862); Spiering 2021 (33629972) |

**Resposta à pergunta 6:** cumprir 2 treinos por semana já é mais do que três de cada quatro adultos fazem. Por isso, a meta do acompanhamento é **a meta da própria pessoa** (os dias que ela escolheu), e não um "deveria" externo. Para a saúde, 1 treino por semana já conta **[opinião, apoiada em Momma 2022]**.

### 4.2 O que ajuda a manter o hábito? (pergunta 5)

| Pergunta | Achado | Selo | Fonte |
|---|---|---|---|
| Registrar ajuda? | Em 122 avaliações (44.747 pessoas), o **autorregistro** foi a técnica que mais explicou a diferença entre programas de atividade física e alimentação. Registro + pelo menos mais uma técnica de "controle" (meta, retorno, revisão da meta) teve efeito maior (0,42 contra 0,26). | moderada | Michie 2009 (19916637) |
| Acompanhar o progresso ajuda a chegar na meta? | Sim: 138 ensaios (19.951 pessoas), efeito d = 0,40, **maior quando o progresso fica registrado** (anotado, e não só lembrado). | moderada (meta-análise grande) | Harkin 2016 (26479070) |
| Mostrar o retorno ajuda? | Programas de atividade física com retorno sobre o registro foram mais eficazes que sem retorno (d = 0,73, com intervalo largo e estudos com risco de viés). | moderada (fraca) | Krukowski 2024 (38178230) |
| App resolve sozinho? | Somar uma meta ao autorregistro ajudou; conversa com uma pessoa (telefone, vídeo) ajudou mais que sites, apps ou prêmios. | moderada | Vetrovsky 2022 (36396151) |
| Quanto tempo para virar hábito? | Mediana de **59–66 dias**, com variação enorme (4 a 335 dias); a frequência e a escolha da própria pessoa fortalecem o hábito. | moderada (20 estudos, muitos com risco de viés) | Singh 2024 (39685110); Keller 2021 (33405284) |
| Na academia? | Novos alunos de academia: ~**4 vezes por semana por 6 semanas** foi o mínimo para formar o hábito de exercício (todo tipo). Regularidade, simplicidade, o ambiente e gostar do treino previram o hábito. Um ensaio com "gatilhos" e regularidade aumentou a atividade em 8 semanas. | um estudo cada | Kaushal 2015 (25851609); Kaushal 2017 (28188586) |

**Resposta à pergunta 5:** sim. O que funciona é o **registro com meta e retorno**, que é o que "a sua semana" faz. O app já tem o registro (séries com carga, repetições e RIR) e a meta (o programa). **Falta o retorno.** Não há evidência de que um app sozinho substitua uma pessoa acompanhando, então a expectativa deve ser modesta **[opinião]**.

### 4.3 Regra proposta: `acompanhamento.semana` (nova)

**O que a tela mostra** **[opinião sobre o desenho; números das regras existentes]**:
1. **Treinos:** feitos / planejados na semana (segunda a domingo; os dias planejados vêm do perfil). Conta a sessão terminada com pelo menos 1 série.
2. **Séries por músculo contra a meta:**
   - séries **efetivas** (RIR 4 ou menos, amplitude completa: `rir.serie-efetiva`);
   - **fracionadas** (série indireta vale 0,5: `volume.serie-indireta.peso`);
   - comparadas com a meta do programa. Na volta de pausa e na fase de aprendizado, a meta da semana é **o que foi prescrito naquela semana**, para a pessoa não ver "abaixo" enquanto segue o plano.
3. **Estado de cada músculo**, em 4 cores neutras (sem vermelho):

| Estado | Condição | Texto | Selo do limite |
|---|---|---|---|
| Na meta | ≥ meta da semana | "na meta" | consenso (`volume.semanal.alvo`) |
| Crescendo | ≥ 4 séries e abaixo da meta | "crescendo, abaixo da meta" | moderada (`volume.semanal.minimo-eficaz`: 4–6) |
| Mantendo | ≥ 1 série efetiva e menos de 4 | "mantendo" | moderada (`volume.manutencao.piso`; Bickel 2011) |
| Sem treino | 0 | "ainda não treinou nesta semana" | — |

4. **Semanas com treino:** "6 das últimas 8 semanas com treino", e **não** uma sequência que zera quando falha uma semana **[opinião]**. O hábito leva ~2 meses e varia muito (Singh 2024). Uma sequência que zera transforma uma falta em "perdi tudo".

**"Treinou menos do que devia" no app = "fez menos treinos do que planejou na semana".** Não existe "dívida": a semana seguinte não acumula treinos **[opinião]**. Com o mesmo volume na semana, a frequência quase não muda o crescimento (`frequencia.efeito-hipertrofia`, robusta). Por isso, fazer o treino que faltou até domingo é uma opção, nunca uma cobrança.

### 4.4 Regra proposta: `acompanhamento.mensagens` (nova; consenso)
Princípios **[opinião]**:
- fato + próximo passo;
- nunca "você falhou", "perdeu" ou "deveria";
- nunca risco de morte na tela (o dado de Momma 2022 é associação e assusta);
- a tela não compara a pessoa com outras.

| Situação | Mensagem (exemplo) |
|---|---|
| Fez o planejado | "Semana completa: 4 de 4. Peito e costas na meta." |
| Fez menos, ainda há dias | "2 de 4 treinos. Se der, o treino C cabe até domingo." |
| Fez 1 | "1 treino nesta semana. Já conta: um treino por semana mantém o que você ganhou." |
| Fez 0 e a semana acabou | Nenhum aviso. Na próxima abertura: "Nova semana. O próximo treino é o B." |
| 3 de 4 semanas abaixo do planejado | **Revisão da meta** (Michie 2009): "Nas últimas 4 semanas você treinou ~2 vezes por semana. Quer um programa de 2 ou 3 dias? Ele cabe melhor e rende o mesmo por treino." Nada muda sem a escolha da pessoa. |
| Pausa de 14 dias ou mais | A mensagem de volta da seção 3 |

**Casos de teste:**

| # | Situação | Resultado esperado |
|---|---|---|
| W1 | Bruno planeja 4 e faz 4; peito com 12,5 séries efetivas e meta 12 | "4 de 4"; peito "na meta" |
| W2 | Bruno faz 2 de 4 na quinta; peito 6 de 12; bíceps 3 de 10 | "2 de 4", com a sugestão do próximo treino; peito "crescendo"; bíceps "mantendo"; nenhuma cor de alerta |
| W3 | Uma série com RIR 5 e uma remada (bíceps indireto) | A série com RIR 5 não conta; a remada soma 0,5 ao bíceps |
| W4 | Semana 1 da volta (12 séries prescritas no torso A) | Meta da semana = séries prescritas; feito tudo → "na meta" |
| W5 | Semana termina com 0 treinos | Nenhum aviso; "6 das últimas 8 semanas" vira "5 das últimas 8" |
| W6 | 3 das últimas 4 semanas com 2 de 4 treinos | Oferece a revisão da meta (2 ou 3 dias); sem aceite, nada muda |
| W7 | 1 treino na semana | Mensagem "já conta"; nenhum músculo "sem treino" vira alerta |

## 5. Evolução por exercício (peça 3)

**O que mostrar** **[opinião, apoiada nos achados da seção 2]**:
- **Melhor série de cada sessão:** carga × repetições (e o RIR). É o que a pessoa fez de verdade e o que a dupla progressão usa.
- **Marcas:** "subiu a carga" e "recorde" (mais repetições com a mesma carga, ou mais carga com repetições dentro da faixa).
- **Polia:** número da placa. **Peso do corpo e elástico:** o degrau da escada ("descida de 3 s", "elástico mais forte").
- **Carga máxima estimada: não no R2.** Os motivos:
  - as fórmulas divergem 15 a 52 pontos de % acima de 12 repetições **[medido]**;
  - os isoladores do app usam 10–20 repetições;
  - o RIR erra mais nessas séries (Halperin 2022).

  Um número "de força" que sobe e desce por erro de conta confunde mais do que ajuda. Se um dia entrar: só para multiarticulares com R ≤ 10, com o rótulo "estimativa".

**Regra proposta:** `acompanhamento.evolucao` (nova; consenso).

**Casos de teste:**

| # | Situação | Resultado esperado |
|---|---|---|
| E1 | Supino: 8 kg × 10, depois 8 kg × 12, depois 9 kg × 8 | Três pontos; "recorde" na 2ª; "subiu a carga" na 3ª |
| E2 | Flexão no degrau "descida de 3 s" × 12 | Mostra o degrau e as repetições, sem kg |
| E3 | Série com amplitude encurtada | Não conta como recorde (`progressao.criterios-invalidos`) |
| E4 | Exercício trocado pela alternativa numa sessão | A alternativa tem a sua própria evolução; não mistura com o original |

## 6. Semana leve sugerida (pergunta 4, peça 4)

| Pergunta | Achado | Selo | Fonte |
|---|---|---|---|
| Uma semana sem treino no meio ajuda a crescer? | 39 pessoas treinadas, 9 semanas: crescimento igual com e sem a semana parada; **a força ficou um pouco menor** com a semana parada. | um estudo | Coleman 2024 (38274324) |
| E semanas mais leves (menos séries e dias)? | 19 homens iniciantes, um braço e uma perna em cada condição: semanas leves na 4ª e na 8ª semana **não mudaram** o crescimento nem a resistência. | um estudo | Pancar 2026 (41730991) |
| Juntos | Semana leve **não ajuda nem atrapalha** o crescimento. | moderada (dois ensaios pequenos, coerentes) | Coleman 2024; Pancar 2026 |
| Por que atletas fazem? | Para **cansaço e energia**, quando o desempenho trava, ou com dor muscular ou nas articulações (246 atletas, a cada ~5,6 semanas, ~6 dias, menos volume e mais reserva, mesma frequência e mesmos exercícios). | consenso (pesquisa de opinião) | Rogerson 2024 (38499934) |

### Regra proposta: `deload.semana-leve` (muda os gatilhos)
- **Conteúdo, sem mudança:** mesma frequência, ~50% das séries, RIR 3–4, carga mantida ou −10%.
- **Gatilhos novos:**
  1. ≥ 2 exercícios estagnados (`progressao.estagnacao`), como hoje;
  2. **cansaço relatado:** um toque opcional no fim do treino ("hoje foi: leve / normal / pesado demais"), com "pesado demais" em 2 dos últimos 3 treinos **[opinião: o app não tem hoje nenhuma forma de saber do cansaço]**;
  3. **dor que se repete:** dor de 3 a 5 no mesmo exercício em 2 sessões seguidas. A semana leve **soma** à regra de segurança e não a substitui (`seguranca.dor.escala`: piora ou dor por mais de 1–2 semanas → recomendar avaliação).
- **Sai o gatilho "6–8 semanas sem pausa"** (decisão do Gustavo; coerente com o ajuste 2 aprovado no T2).
- **Não sugere** nas 3 semanas depois de uma volta de pausa (já houve descanso).
- Sempre **opcional e manual**. O texto diz para que serve: "Para descansar, não para crescer. Pode deixar a força um pouco mais baixa por alguns dias; o músculo não perde."
- **Selo:** consenso (os gatilhos e os números são de treinadores); "não muda a hipertrofia" é moderada.

**Casos de teste:**

| # | Situação | Resultado esperado |
|---|---|---|
| S1 | 6 semanas seguidas, nada parado, sem cansaço | **Não sugere** (hoje sugere) |
| S2 | 2 exercícios estagnados | Sugere, com o motivo |
| S3 | "Pesado demais" em 2 dos últimos 3 treinos | Sugere |
| S4 | Dor 4/10 no supino em 2 sessões seguidas | Sugere a semana leve **e** mostra o aviso de dor e de avaliação |
| S5 | 2 exercícios estagnados na semana 2 depois de uma volta de pausa | Não sugere |

## 7. Mudanças propostas para `regras.md` (só com aprovação)
- **`progressao.calibracao` (nova):** regra da seção 2.3. Consenso. Fontes: `halperin2022`, `zourdos2021`, `mayhew1995`, `reynolds2006`, `nuzzo2024`, `zhang2021`.
- **`rir.leitura`:** acrescentar "o erro é maior acima de ~12 repetições e longe da falha; a experiência não melhora" (+ `zourdos2021`, `remmert2023`, `bermudez2025`). Continua moderada.
- **`readaptacao.durante-uso` (nova):** a regra da seção 3, com a carga da volta, a semana do programa por "semanas com treino" e o caso de mais de 26 semanas. Consenso (a faixa de até 13 dias é moderada).
- **`readaptacao.semana1`:** "carga −10% (3 a 8 semanas) e −15% (8 a 26 semanas), arredondada para baixo no inventário" (o T5 aprovou −10 a −20%; o −15% é a proposta deste tema).
- **`acompanhamento.semana` (nova):** treinos feitos × planejados, séries efetivas fracionadas × meta da semana, 4 estados e semanas com treino. Consenso, com `michie2009`, `harkin2016`, `krukowski2024`.
- **`acompanhamento.mensagens` (nova):** mensagens sem culpa e revisão da meta depois de 3 de 4 semanas abaixo. Consenso, com `michie2009`, `momma2022`, `ren2024`, `garciahermoso2023`.
- **`acompanhamento.evolucao` (nova):** melhor série por sessão, marcas, sem carga máxima estimada. Consenso.
- **`deload.semana-leve`:** gatilhos novos (sai o "6–8 semanas"; entram cansaço relatado e dor que se repete; não sugere depois de uma volta). Consenso; + `pancar2026`, `rogerson2024` relido.
- **`volume.manutencao.piso`:** sem mudança de número; `bickel2011` passa a ter PMID (21131862) e `spiering2021` resumo-PubMed.
- **`tempo.calibracao`:** já aprovada no T4; entra no R2 junto.
- **Fontes novas (resumo-PubMed):** Plotkin 2022 (36199287), Coleman 2024 (38274324), Halperin 2022 (34542869), Zourdos 2021 (30747900), Remmert 2023 (37036795), Bermúdez Droguett 2025 (42211811), Mayhew 1995 (7500624), Reynolds 2006 (16937972), Mayhew 2008 (18714230), Abdul-Hameed 2012 (23342225), Nuzzo 2024 (37792272), Zhang 2021 (33776802), Huang 2025 (40791980), Heredia-Elvar 2022 (35741372), Michie 2009 (19916637), Harkin 2016 (26479070), Krukowski 2024 (38178230), Vetrovsky 2022 (36396151), Singh 2024 (39685110), Keller 2021 (33405284), Kaushal 2015 (25851609), Kaushal 2017 (28188586), Conti 2026 (42638731), Ren 2024 (39040428), Garcia-Hermoso 2023 (36418149), Momma 2022 (35228201), Bickel 2011 (21131862), Spiering 2021 (33629972), Pancar 2026 (41730991), Rogerson 2024 (38499934), Glass & Stanton 2004 (15142014).
- **Não verificadas:** as expressões originais de Epley, Brzycki, Lombardi, Mayhew e O'Conner (fora do PubMed).

## 8. O que muda no app (marco R2)
1. **Pausa detectada sozinha:** dias desde o último treino → a regra da seção 3, com a mensagem de boas-vindas. A semana do programa passa a contar semanas com treino, e a carga da volta aparece pré-preenchida (−10% ou −15%).
2. **Tela "a sua semana":** treinos feitos × planejados, barras de séries por músculo, semanas com treino e a revisão da meta. Ver o esboço na página do diagnóstico.
3. **Evolução por exercício:** lista ou gráfico simples da melhor série, com as marcas.
4. **Semana leve sugerida:** liga `sugerirSemanaLeve` a uma tela, com os gatilhos novos e o toque opcional "hoje foi: leve / normal / pesado demais".
5. **Calibração na 1ª série:** depois de cada série sem histórico, "próxima série: 7 kg", com o porquê.
6. **Calibração do tempo** (T4) depois de 3 sessões.
7. **Testes automáticos:** os casos C1–C7, P1–P9, W1–W7, E1–E4 e S1–S5 viram testes do Vitest. O critério 6 do plano (pausa ≥ 3 semanas → volta gradual; < 2 semanas → mesma carga; a tela da semana) fica coberto por P1, P3 e W1–W2.

## 9. O que fica sem resposta
- **A tabela de Nuzzo 2024** (repetições × % da carga máxima, com a variação entre pessoas) não está no resumo. Com o texto completo, a calibração poderia usar a tabela em vez da fórmula de Brzycki.
- **Nenhum estudo testou uma regra de calibração** nem uma regra de volta de pausa durante o uso: tudo é consenso, e o uso real (R3) é o primeiro teste.
- **Acima de 65 anos** a pausa pesa mais (Bosquet 2013) e a manutenção pede mais (Bickel 2011), mas o app não pergunta a idade.
- **Cansaço:** não há medida validada simples para um app. O toque "pesado demais" é uma proposta, não um instrumento testado.
- **O efeito de "a sua semana" no próprio Gustavo** só aparece no R3. As meta-análises de hábito são de atividade física em geral, quase nunca de musculação.
- **Lally 2010** (o estudo clássico de hábito que mostra que uma falta isolada não atrapalha) **não foi achado no PubMed** nesta sessão. Não é citado.

## Buscas registradas (PubMed, 01/11/2026)
`accuracy 1RM prediction equations repetitions`; `Epley Brzycki validity repetitions to failure`; `prediction one repetition maximum high repetitions error`; `repetitions in reserve accuracy rating sets`; `muscle-strengthening guidelines prevalence adults meta-analysis`; `LeSuer accuracy prediction equations 1RM`; `Reynolds prediction one repetition maximum multiple RM`; `repetitions to failure equations estimate 1RM accuracy review`; `autoregulation resistance training meta-analysis RPE`; `self-monitoring physical activity meta-analysis`; `Harkin progress monitoring goal attainment meta-analysis`; `habit formation exercise adults systematic review`; `exercise adherence missed sessions lapse relapse`; `habit exercise behaviour Kaushal Rhodes`; `muscle-strengthening exercise habit automaticity`; `resistance training dropout adherence predictors`; `Lally how are habits formed modelling`; `Bennie muscle-strengthening exercise prevalence`; `deload resistance training`; `training cessation week hypertrophy trained resensitization`; `estimated 1RM tracking progress repetitions load monitoring`; `velocity loss repetitions 1RM percentage individual variability`; `habits formed modelling habit formation real world`; `time to form a habit systematic review automaticity`; `self-compassion exercise lapse guilt`; `Lally van Jaarsveld Potts Wardle habits`; `seven prediction equations 1RM bench squat deadlift`; `Brzycki equation`; `Epley equation one repetition maximum`; `Bickel exercise dosing retain resistance training adaptations`.

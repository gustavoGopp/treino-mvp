# 12. Outros objetivos: cutting, força e saúde (04/11/2026)

> Pesquisa de 03 e 04/11/2026, no método de `PLANO-DOS-TEMAS.md`: perguntas fechadas → buscas registradas → hierarquia das fontes → nível de leitura → selo por número → entregável. Os selos seguem `docs/pesquisa/00-metodo.md`.
>
> **Leitura das fontes.** Estudo marcado **resumo-PubMed (nesta sessão)** teve o resumo oficial lido no PubMed com `python3 -I scripts/pesquisa/pubmed.py a <PMID>`. Estudo marcado **resumo-PubMed (sessão anterior)** teve o resumo lido em outra sessão da v2 (arquivo citado) e não foi relido aqui; os números dele vêm daquele arquivo. O texto completo de nenhum estudo foi lido. O que foi visto só pelo título fica **NÃO VERIFICADO** e não sustenta número nem selo. Durante boa parte da sessão, o PubMed limitou os pedidos (páginas de resumo vazias, de 1 a 11 tentativas por resumo) e o container reiniciou uma vez; as buscas que voltaram vazias estão marcadas, e **busca vazia não prova que o estudo não existe**.
>
> **Diretrizes.** OMS, Ministério da Saúde e ACSM são o topo da hierarquia para recomendações de saúde, mas o selo de cada número segue a evidência por trás dele. Quando essa evidência não foi lida, o número leva **consenso (diretriz)**.
>
> **Conferência.** Quem conduziu a sessão releu no PubMed, em 04/11/2026, o resumo da fonte que mais pesa no cutting (Murphy & Koehler 2022, 34623696): os números da tabela conferem. As outras fontes que mais pesam (Deller 2026, Binmahfoz 2025, ACSM 2026 e Grgic 2018a) foram lidas pela pesquisadora e não relidas.
>
> **[opinião]** marca o que é julgamento de quem pesquisou, não evidência. **Nada aqui muda `regras.md`, os dados, o código, o `CLAUDE.md` nem o `PLANO-MVP.md`.** Hoje, "outros objetivos (emagrecimento, força, corrida)", nutrição e cardio prescrito estão **fora do MVP** (`PLANO-MVP.md`, seção c). Mudar isso é decisão do Gustavo.

## Em uma frase
O treino de hipertrofia de hoje **já serve** para quem quer perder gordura sem perder músculo (o treino de força segura boa parte da massa magra durante a dieta: **robusta** em pessoas com sobrepeso) e para quem quer **saúde** (cumpre a parte de fortalecimento das diretrizes: **consenso de diretriz**). Ele também **deixa a pessoa mais forte**, mas não ao máximo: para **força máxima**, cargas mais altas (**robusta**) e descanso mais longo em quem já treina (**moderada**) rendem mais. O que o app **não** faz, e que esses objetivos pedem, é a **dieta** (o que de fato faz perder gordura) e o **aeróbio** (150–300 min por semana para a saúde), os dois fora do MVP.

## Resumo por pergunta

| # | Pergunta | O que a evidência diz | Selo |
|---|---|---|---|
| 1 | Cutting (perder gordura mantendo o músculo) | Somar treino de força à dieta protege a massa magra (3 meta-análises; numa delas, o exercício evitou ~46% da perda) e aumenta a perda de gordura. Em quem já treina, 3 séries por exercício seguraram o músculo tanto quanto 5 num déficit moderado. No déficit, o **músculo cresce menos**, e um déficit de ~500 kcal/dia impediu o ganho de massa magra; a **força continua subindo** parecido. Mudar reps, carga, frequência ou falha no déficit: **nenhum ensaio achado**. | robusta (protege a massa magra, em sobrepeso); moderada (no déficit o músculo cresce menos, a força não); um estudo (volume moderado = alto em treinados); consenso (todo o resto) |
| 2 | Força máxima | Cargas altas (≥ 80% de 1RM) dão mais força; cargas baixas dão o mesmo músculo. Em treinados, descanso > 2 min maximiza a força; em iniciantes, 60–120 s bastam. Frequência maior ajuda a força **pelo volume** que ela soma. A força é em parte **específica** do exercício e do teste. Mesmo 1 série de 6–12 repetições perto da falha, 2–3 vezes por semana, aumentou o 1RM de homens treinados, só que menos que o possível. | robusta (carga alta → mais força); moderada (descanso; frequência via volume; dose mínima); um estudo (especificidade do teste) |
| 3 | Saúde e condicionamento | OMS 2020: 150–300 min de aeróbio moderado (ou 75–150 vigoroso) por semana **e** fortalecimento muscular regular, em todas as idades. ACSM 2011: força em 2–3 dias por semana para cada grande grupo muscular, mais equilíbrio e flexibilidade. O app (2 a 6 dias, corpo inteiro coberto) **cumpre a parte de força**; falta o **aeróbio**. Nas coortes, ~30–60 min de força por semana já se associam ao maior benefício. | consenso (diretriz) para os números; moderada (coortes) |
| 4 | O que o app pode fazer sem sair do MVP | Cutting e saúde: **o mesmo treino, com um texto honesto** (o que o app faz e o que fica com a dieta e o aeróbio). Força: **um ajuste pequeno** nos compostos principais (faixa mais baixa e descanso de 2–3 min, que já existe como opção). Dieta, cardio prescrito, periodização para força e outros esportes exigem sair do MVP. | ver a tabela da pergunta 4 |
| 5 | Opções para o Gustavo | (a) só hipertrofia, com texto claro; (b) pergunta de objetivo com ajustes pequenos; (c) marco novo fora do MVP. | [opinião] |

## O que muda em relação ao que o projeto dizia
- **"Outros objetivos" estavam fora do MVP como se pedissem outro programa.** A evidência lida diz que **dois dos três** (cutting e saúde) pedem o **mesmo treino de força**: o que muda é o que acontece fora dele (dieta, aeróbio). Só a força máxima pede números diferentes, e pequenos.
- **`descanso.por-tipo`** (compostos 90–120 s; 2–3 min como opção) continua certo para hipertrofia (`singer2024`). Para força em quem já treina, a revisão de Grgic 2018 aponta > 2 min. A opção de 2–3 min que já existe é a que serviria a esse objetivo.
- **Periodização.** `pesquisa-v2/02` registrou que a periodização "ajuda a força em treinados" (Moesgaard 2022). O ACSM 2026 diz que ela **não mudou os resultados de forma consistente**. As duas leituras são de resumos; para força, a periodização fica como **ponto em aberto**, e não como regra.

## Pergunta 1. Cutting (perder gordura mantendo o músculo)

### 1.1 Tabela

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **Treino de força na dieta protege a massa magra** | 25 ECRs (adultos de 18–65 anos com sobrepeso ou obesidade): dieta + treino de força contra só dieta. O peso total caiu igual (−0,32 kg de diferença, sem significância), mas o treino **protegeu a massa magra** (SMD 0,40; certeza moderada), **aumentou a perda de gordura** (SMD −0,36; certeza alta) e a força (SMD 2,36; certeza baixa). | robusta (3 meta-análises na mesma direção) | Binmahfoz et al. 2025 (40909191) |
| **Quanto ele protege** | 34 ECRs, 1.455 pessoas com sobrepeso ou obesidade: o exercício somado à restrição calórica manteve **+0,87 kg** de massa magra (IC 95%: 0,59 a 1,16) e evitou **~46% da perda** de massa magra. Na análise em rede: treino misto (força + aeróbio) +1,20 kg; só força +0,83 kg; só aeróbio +0,51 kg (não significativo). | moderada (o número; uma meta-análise) | Deller et al. 2026 (42144246) |
| **Com a dieta, a massa magra fica estável** | 114 ensaios, 4.184 pessoas com sobrepeso ou obesidade, de várias idades: treino de força + restrição calórica foi o que mais reduziu a gordura (−3,8% de gordura corporal; −5,3 kg de gordura) e **manteve** a massa magra (~−0,3 kg, sem significância). Só treino de força, sem dieta: +0,8 kg de massa magra e −1,6% de gordura. Os resultados valeram nas faixas de idade e nos dois sexos. | robusta (junto com as duas acima) | Lopez et al. 2022 (35191588) |
| **Treino de força sozinho já tira um pouco de gordura** | 58 estudos com adultos saudáveis, treino de corpo inteiro contra nenhum exercício: −1,46% de gordura corporal, −0,55 kg de gordura e menos gordura visceral (SMD −0,49). O volume de treino **não** mudou o efeito. | moderada (uma meta-análise grande) | Wewege et al. 2022 (34536199) |
| **No déficit, o músculo cresce menos; a força, não** | Ensaios de ≥ 3 semanas de treino de força em déficit: o ganho de massa magra foi menor que sem déficit (ES −0,57; p = 0,02), mas o ganho de força foi parecido (ES −0,31; p = 0,28). Na meta-regressão, um déficit de **~500 kcal por dia impediu o ganho** de massa magra. | moderada (uma meta-análise com meta-regressão) | Murphy & Koehler 2022 (34623696) |
| **Volume no déficit, em quem já treina** | 38 homens treinados, 6 semanas comendo 30 kcal/kg (antes, 45), proteína fixa: **3 séries por exercício ≈ 5 séries** na espessura do reto femoral, na massa magra e no humor e sono. Os dois grupos perderam um pouco de massa magra (−0,51 e −0,92 kg, sem diferença entre eles). | um estudo | Roth et al. 2023 (36114738) |
| **Volume alto ajuda a poupar músculo no déficit?** | Revisão de 15 estudos com atletas treinados: programas com ≥ 10 séries semanais por músculo tiveram perda de massa magra baixa ou nula (a maioria em mulheres), e **aumentar** o volume ao longo da dieta pareceu melhor que reduzir. Mas os dados de treino estavam incompletos na maioria dos estudos: **a evidência é insuficiente** para dizer que volume maior é melhor. | consenso (revisão sem conclusão firme) | Roth et al. 2022 (35146569) |
| **Carga, frequência, falha e descanso no déficit** | **Não achei ensaio** que compare carga alta e baixa, frequência, proximidade da falha ou descanso **durante** o déficit (3 buscas, vazias, ver "Buscas"). A recomendação de especialistas para fisiculturistas naturais em preparação: cada músculo 2 vezes por semana ou mais, a maior parte das repetições em 6–12 (70–80% de 1RM), descanso de 1–3 min, falha limitada nos multiarticulares pesados e mais usada nos isoladores e nas séries longas. É, em essência, **o que o app já faz**. | consenso | Helms et al. 2015 (24998610) |
| **Aeróbio no cutting** | O mesmo grupo de especialistas: aeróbio ajuda a perder gordura, mas a interferência com o treino de força cresce com a frequência e a duração; usar o mínimo que dê a perda de gordura desejada. A meta-análise de treino concorrente (abaixo, pergunta 3) não achou prejuízo à hipertrofia. | consenso (para "o mínimo"); moderada (para "não atrapalha a hipertrofia") | Helms et al. 2015 (24998610); Schumann et al. 2022 (34757594) |

### 1.2 O treino de hoje serve para manter o músculo no déficit?

**Sim, com selo robusto para a direção e mais fraco para os detalhes:**
- **Treino de força durante a dieta protege a massa magra e aumenta a perda de gordura:** robusta (três meta-análises, em pessoas com sobrepeso ou obesidade).
- **Em quem já treina e é magro, num déficit moderado:** um estudo (Roth 2023: 3 séries por exercício bastaram) e uma revisão sem conclusão firme (Roth 2022).
- **O programa de hoje** tem ≥ 10 séries semanais por músculo prioritário a partir do intermediário, cargas de ~6 a ~30 repetições perto da falha, compostos com RIR 1–3 e 2 a 6 dias por semana. **Nada disso conflita** com o que foi lido. A recomendação de especialistas (Helms 2015) coincide com ele quase ponto por ponto (consenso).
- **O que esperar diferente** (moderada, Murphy & Koehler 2022): o músculo cresce pouco ou nada, enquanto a força pode continuar subindo. Para o app, isso quer dizer que **a dupla progressão continua funcionando** no déficit, mas a pessoa não deve esperar crescer **[opinião, a partir da meta-análise]**.

**[opinião]** Não há base para o app mudar volume, carga, frequência ou RIR quando a pessoa diz que está "secando". Há base para **um texto** que explique isso, e para não reduzir o volume por conta própria.

### 1.3 O que é da nutrição (fora do MVP, sem prescrição)
Esta seção só registra **o que a dieta decide**, para o texto do app poder dizer "isso não é com a gente". **Nada aqui é recomendação para o app.**
- **Perder gordura depende do déficit calórico**, e não do treino: nas meta-análises, o peso cai com a dieta, e o treino muda **do que** é feito esse peso (Binmahfoz 2025; Lopez 2022).
- **O tamanho do déficit importa para o músculo:** ~500 kcal por dia já impediram o ganho de massa magra (Murphy & Koehler 2022, moderada).
- **Proteína:** o ensaio de Roth 2023 fixou a proteína dos participantes (é parte do desenho do estudo, não uma recomendação). As revisões sobre proteína no déficit (Helms 2014, 24092765) e o posicionamento da ISSN de 2026 sobre dietas para perder peso (42867412) apareceram na busca, mas **não foram lidos: NÃO VERIFICADO**. Nenhum número de proteína ou de calorias entra no app.
- **Por que fica fora** **[opinião]**: prescrever dieta pede outra base de evidência, outro profissional (nutricionista), dados mais sensíveis (peso, hábitos alimentares, histórico de transtorno alimentar) e outra triagem de segurança. Tudo isso é um marco próprio.

### 1.4 O que fica sem resposta
- Se vale **subir ou baixar a carga, a frequência ou a proximidade da falha** durante o déficit: nenhum ensaio achado.
- O efeito em **pessoas magras e treinadas** num déficit grande, e em **mulheres treinadas**: um estudo só com homens (Roth 2023) e uma revisão inconclusiva.
- Quanto do "músculo" perdido na dieta é água e glicogênio, e não proteína muscular: não pesquisado aqui.
- **Idosos em dieta:** a meta-análise de Lopez 2022 diz que o efeito vale nas faixas de idade, mas a busca específica (Weinheimer 2010, 20591106) não teve o resumo lido: **NÃO VERIFICADO**.

### 1.5 Buscas registradas (pergunta 1)
Ver a seção final, buscas 1 a 12, 22 e 24 a 27.

## Pergunta 2. Força máxima

### 2.1 Tabela

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **Carga alta dá mais força** | ACSM 2026 (137 revisões, > 30.000 adultos saudáveis): a força voluntária melhora mais com **cargas ≥ 80% de 1RM**, amplitude completa, **2–3 séries**, o exercício **no começo da sessão** e **≥ 2 sessões por semana**. As meta-análises de carga baixa × alta e a meta-análise em rede de Currier 2023 chegam ao mesmo: **hipertrofia parecida, força maior com carga alta**. | robusta | ACSM 2026 (41843416, resumo-PubMed nesta sessão); Schoenfeld et al. 2017 (28834797) e Lopez et al. 2021 (33433148), resumo-PubMed (sessão anterior, `pesquisa-v2/10`); Currier et al. 2023 (37414459), resumo-PubMed (sessão anterior, `pesquisa-v2/02`) |
| **O que não mudou a força de forma consistente** | ACSM 2026: treinar até a falha, o tipo de equipamento, a complexidade do exercício, a estrutura da série, o tempo sob tensão e a periodização **não mudaram os resultados de forma consistente**. | moderada (posicionamento baseado em revisões; resumo) | ACSM 2026 (41843416) |
| **Descanso** | 23 estudos, 491 pessoas: dá para ganhar muita força mesmo com descanso curto (< 60 s); **em treinados, descanso > 2 min** parece necessário para **maximizar** a força; em **não treinados, 60–120 s** bastam. | moderada (revisão sistemática sem meta-análise) | Grgic et al. 2018a (28933024) |
| **Frequência** | 22 estudos: mais sessões por semana, mais força (ES 0,74 com 1 vez; 0,82 com 2; 0,93 com 3; 1,08 com 4 ou mais), **mas com o volume igualado a frequência não fez diferença**: ela ajuda porque soma volume. O efeito apareceu nos testes de multiarticulares e de membros superiores. A maioria dos estudos foi com não treinados. A meta-regressão de Pelland 2026 também viu efeito positivo da frequência na força. | moderada | Grgic et al. 2018b (29470825); Pelland et al. 2026 (41343037, resumo-PubMed, sessão anterior, `pesquisa-v2/02`) |
| **Dose mínima em quem já treina** | 6 estudos com homens treinados: **1 série de 6–12 repetições** (~70–85% de 1RM), **2–3 vezes por semana**, perto da falha, por 8–12 semanas, aumentou o 1RM (média +12 kg; agachamento +17,5 kg; supino +8,3 kg). É um ganho "abaixo do ótimo, mas significativo". Sem dados para terra, mulheres treinadas ou atletas de força. | moderada (meta-análise pequena) | Androulakis-Korakakis et al. 2020 (31797219) |
| **Especificidade do teste** | 5 pessoas treinadas, 21 dias seguidos: o braço que **só fazia o teste de 1RM** ganhou tanta força no 1RM quanto o braço que também treinava 3 séries; só o braço treinado cresceu. Ganho de 1RM depende muito de **praticar o próprio movimento pesado**, e não só do músculo. | um estudo (muito pequeno) | Dankel et al. 2017 (27875635) |
| **A ordem importa para a força** | A força cresce mais no exercício que vem primeiro; para hipertrofia, a ordem não muda. | moderada | Nunes et al. 2021 (32077380, resumo-PubMed, sessão anterior, `pesquisa-v2/02`); ACSM 2026 |
| **Periodização** | `pesquisa-v2/02`: ajuda a força em treinados (Moesgaard 2022). ACSM 2026: não mudou os resultados de forma consistente. | ponto em aberto (as duas fontes, só resumos) | Moesgaard et al. 2022 (35044672, sessão anterior); ACSM 2026 |

### 2.2 Quanto o programa de hoje já entrega de força
- **Entrega força, com certeza.** Qualquer treino de força progressivo aumenta a força em relação a não treinar (ACSM 2026, robusta). E os compostos do app ficam em **6–10 ou 8–12 repetições** perto da falha, 2 a 6 dias por semana: é **mais** que a dose mínima que já aumentou o 1RM de homens treinados (1 série de 6–12, 2–3 vezes por semana; moderada).
- **Não entrega o máximo de força**, por três motivos:
  1. **Carga:** a faixa de 6–12 repetições corresponde a ~70–85% de 1RM (pela própria meta-análise de Androulakis-Korakakis), ou seja, quase sempre **abaixo** dos ≥ 80% que o ACSM 2026 associa ao maior ganho. A faixa de 6–10 encosta nesse limite; as faixas de 10–20 e 12–20 dos isoladores e do peso do corpo ficam longe (robusta para a direção; a correspondência exata entre repetições e %1RM varia por pessoa e exercício e **não foi lida nesta sessão**).
  2. **Descanso:** o padrão de 90–120 s nos compostos basta para iniciante, mas fica abaixo dos > 2 min que maximizam a força em treinados (moderada). A opção de 2–3 min já existe em `descanso.por-tipo`.
  3. **Especificidade:** o app trata máquina e peso livre como iguais (certo para hipertrofia), e não pratica o movimento pesado de um teste (agachamento, supino e terra com barra). Para "levantar mais no supino", praticar o supino pesado conta muito (um estudo).
- **O que já está certo para força:** o composto vem antes dos isoladores (`ordem.sessao`), a frequência é ≥ 2 vezes por semana na maioria das divisões, e a dupla progressão sobe a carga.

### 2.3 O que fica sem resposta
- Qual faixa de repetições exata é a melhor para força **sem supervisão** (o risco de uma série de 3 a 5 repetições perto da falha num agachamento livre sem ajudante não foi pesquisado aqui).
- Força em **mulheres treinadas** e em **idosos**: as fontes lidas são quase todas de homens jovens.
- Se a **periodização** ajuda a força em treinados: as duas fontes divergem.

### 2.4 Buscas registradas (pergunta 2)
Ver a seção final, buscas 13 a 18.

## Pergunta 3. Saúde e condicionamento geral

### 3.1 Tabela

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| **Aeróbio (OMS 2020)** | Todo adulto: **150–300 min** por semana de atividade aeróbia **moderada**, ou **75–150 min** de **vigorosa**, ou uma combinação equivalente. "Alguma atividade é melhor que nenhuma" e "mais é melhor". | consenso (diretriz; a evidência por trás não foi lida nesta sessão) | Bull et al. 2020, OMS (33239350) |
| **Fortalecimento (OMS 2020)** | Atividade de fortalecimento muscular **regular para todas as idades**. O detalhe "≥ 2 dias por semana, grandes grupos musculares" **não está no resumo**: fica **NÃO VERIFICADO** na OMS (o documento completo não foi lido). | consenso (diretriz) | Bull et al. 2020 (33239350) |
| **Fortalecimento (ACSM 2011)** | Em **2–3 dias por semana**, exercícios de força para **cada um dos grandes grupos musculares**; aeróbio moderado ≥ 30 min em ≥ 5 dias (≥ 150 min) ou vigoroso ≥ 20 min em ≥ 3 dias (≥ 75 min); exercício **neuromotor** (equilíbrio, agilidade, coordenação) e **flexibilidade** (60 s por exercício) em ≥ 2 dias por semana. Quem não chega às metas ainda se beneficia de fazer menos. | consenso (diretriz) | Garber et al. 2011, ACSM (21694556) |
| **Força (ACSM 2026)** | Treino de força progressivo melhora força, músculo, potência, resistência, velocidade de marcha, equilíbrio e função física; o treino de **potência** (subida rápida) melhorou a função. | robusta (137 revisões) | ACSM 2026 (41843416) |
| **Guia do Ministério da Saúde (2021)** | O resumo do relatório diz que o guia traz tipo, dose (frequência, intensidade, duração) e benefícios por grupo (adultos, idosos, gestantes, pessoas com deficiência), mas **não traz os números**. O PDF oficial não foi aberto (bloqueado em `pesquisa-v2/06`). Os números do guia ficam **NÃO VERIFICADO**. | — | Umpierre et al. 2022 (35418515) |
| **Quanto de força já faz bem** | Coortes: treino de força associado a **10–17% menos risco** de morte e de doenças crônicas; o maior benefício em **~30–60 min por semana**. É associação, não prova de causa. | moderada (meta-análise de coortes) | Momma et al. 2022 (35228201, resumo-PubMed, sessão anterior, `pesquisa-v2/07`) |
| **Quantos cumprem** | 22,8% dos adultos treinam força 2 vezes por semana ou mais; 17% cumprem força **e** aeróbio. | moderada | Ren et al. 2024 (39040428); Garcia-Hermoso et al. 2023 (36418149), ambos resumo-PubMed (sessão anterior, `pesquisa-v2/07`) |
| **Aeróbio atrapalha o músculo?** | 43 estudos: somar aeróbio ao mesmo treino de força **não reduziu a hipertrofia** (SMD −0,01) nem a força máxima (−0,06); reduziu a **força explosiva** (−0,28), mais quando os dois eram feitos na mesma sessão. Valeu para corrida e bicicleta, várias frequências, idades e níveis. | moderada (uma meta-análise) | Schumann et al. 2022 (34757594) |

### 3.2 Quanto o programa de hoje já cumpre
- **A parte de força, sim** (consenso de diretriz): o app monta de **2 a 6 dias** por semana (`divisao.seis-dias`), e as divisões cobrem os grandes grupos musculares. Isso cumpre o "2–3 dias por semana, cada grande grupo" do ACSM 2011 e o "fortalecimento regular" da OMS 2020. **Ressalva:** na divisão clássica (`divisao.classica`), cada músculo é treinado 1 vez por semana. Se a diretriz pede cada grupo 2 vezes, essa divisão não cumpriria; o resumo do ACSM 2011 é ambíguo nesse ponto, e o da OMS não dá o detalhe.
- **O tempo também:** uma sessão de 45 min por 2 dias já passa dos ~30–60 min por semana associados ao maior benefício nas coortes (moderada, Momma 2022).
- **O que falta:**
  1. **Aeróbio** (150–300 min moderado ou 75–150 vigoroso): é cardio prescrito, fora do MVP. Hoje, o app reconhece a esteira na foto e diz que o cardio não entra no treino.
  2. **Equilíbrio e flexibilidade** (ACSM 2011): o app não prescreve. Para idosos, o treino de potência melhora a função (ACSM 2026), e o app também não o tem.
  3. **Menos tempo sentado** (OMS 2020): fora do escopo de um app de treino de força **[opinião]**.

### 3.3 O que fica sem resposta
- Os números do **Guia de Atividade Física para a População Brasileira**: não lidos (NÃO VERIFICADO). Para o texto do app em pt-BR, o guia é a fonte mais natural **[opinião]**; antes de citar, é preciso abrir o PDF.
- Se a OMS pede cada grupo muscular **2 vezes** por semana, ou só 2 dias de fortalecimento: o resumo não diz.
- Quanto a musculação conta como "atividade aeróbia": não pesquisado; o app não deve dizer que conta **[opinião]**.

### 3.4 Buscas registradas (pergunta 3)
Ver a seção final, buscas 15 (treino concorrente), 19 a 21 e 23.

## Pergunta 4. O que o app poderia fazer sem sair do MVP

### 4.1 Por objetivo

| Objetivo | Proposta dentro do MVP | Selo | Esforço **[opinião]** |
|---|---|---|---|
| **Cutting** | **Mesmo programa.** Texto na escolha do objetivo: "No período de dieta, o treino de força ajuda a manter o músculo e a perder mais gordura. Quem decide a perda de peso é a alimentação, que o app não cobre: procure um nutricionista. É normal o músculo parar de crescer; a carga pode continuar subindo." | robusta (manter o músculo); moderada (cresce menos, força segue); consenso (o texto) | Baixo: 1 texto e 1 opção no perfil |
| Cutting | **Não** reduzir volume nem mudar reps, carga ou RIR por estar em déficit. Se a pessoa relatar cansaço, as regras que já existem (estagnação, semana leve sugerida) cuidam disso. | um estudo (3 ≈ 5 séries); consenso (o resto) | Nenhum |
| Cutting | **Não** perguntar peso, meta de peso ou calorias. | [opinião]: dado sensível (LGPD) sem regra que o use; risco de transtorno alimentar sem triagem própria | Nenhum |
| **Força máxima** | Nos **1 ou 2 primeiros compostos do dia**, uma faixa mais baixa (ex.: 4–6 ou 5–8 repetições) com descanso de **2–3 min** para intermediário e avançado; iniciante segue em 90–120 s. Isoladores e o resto como hoje (o músculo também conta para a força). | robusta (a direção: carga alta → mais força); moderada (descanso > 2 min em treinados); consenso (a faixa exata e quais exercícios) | Médio: 1 campo no perfil, 2–3 regras novas, um ramo no gerador e testes por persona |
| Força máxima | Segurança: nos multiarticulares livres pesados sem ajudante (agachamento, supino e terra com barra), manter RIR ≥ 2 nessa faixa baixa; nunca calibrar até a falha neles (como já diz `rir.calibracao`). | consenso | Baixo (regra já parecida existe) |
| Força máxima | Texto: "O app deixa você mais forte, mas não é um programa de powerlifting: não testa 1RM nem treina para competição." | consenso | Baixo |
| **Saúde** | **Mesmo programa.** Texto: "Este treino cumpre a parte de força das recomendações da OMS e do ACSM. Para a saúde, elas pedem também 150–300 min por semana de atividade aeróbia moderada (ou 75–150 vigorosa), que o app não prescreve." | consenso (diretriz) | Baixo |
| Saúde | Opcional: deixar claro que **2 dias por semana já cumprem** a parte de força, para quem tem pouco tempo. | consenso (diretriz); moderada (coortes, ~30–60 min/semana) | Baixo |
| **Corrida e outros esportes** | **Nada** dentro do MVP: o app não tem como prescrever a parte do esporte. No máximo, o texto "o app não é feito para isso". | — | Nenhum |

### 4.2 O que exigiria sair do MVP
- **Nutrição** (déficit, proteína, acompanhamento de peso): outra pesquisa, outro profissional, dados mais sensíveis, triagem de transtorno alimentar.
- **Cardio prescrito** (o aeróbio das diretrizes; no cutting, "o mínimo necessário"): progressão de duração e intensidade, zonas de esforço, triagem cardiovascular própria, novos equipamentos no gerador (esteira, bicicleta) e outro tipo de sessão.
- **Força máxima de verdade** (powerlifting): teste ou estimativa de 1RM, periodização (ponto em aberto na evidência), exercícios com barra obrigatórios, prática do movimento de competição.
- **Potência e função para idosos** (ACSM 2026): treino de subida rápida, que pede guia e animação próprios.
- **Equilíbrio e flexibilidade** (ACSM 2011).
- **Outros esportes e corrida.**

## As opções para o Gustavo

### (a) Continuar só com hipertrofia, com um texto claro
- **O que muda:** um texto nas boas-vindas ou no perfil dizendo para que o app serve. Exemplo: "Este app monta treino de força para ganhar e manter músculo. Ele também serve para quem está de dieta (ajuda a manter o músculo) e cumpre a parte de força das recomendações de saúde. Ele não cuida de alimentação, cardio, força máxima de competição nem esportes."
- **Efeito:** a pessoa que quer cutting ou saúde **já é bem atendida** (o treino é o certo para ela, pela evidência lida), e sabe o que buscar fora. Quem quer força máxima recebe um programa que deixa mais forte, mas não ao máximo.
- **Esforço:** horas (um texto, revisão do Gustavo). Nenhuma regra nova, nenhum teste novo.
- **Risco:** quem quer força sai sem o ajuste que a evidência apoia; quem quer cutting pode achar que o app "não é para ele" se o texto não for bem escrito.

### (b) Uma pergunta de objetivo, com ajustes pequenos dentro do treino de força
- **O que muda:** uma pergunta no perfil ("O que você quer agora?": ganhar músculo; manter o músculo enquanto perde peso; ficar mais forte; saúde e disposição). **Só "ficar mais forte" muda números** (faixa mais baixa e descanso de 2–3 min nos compostos principais, para intermediário e avançado). As outras três respostas geram **o mesmo programa** com um texto próprio.
- **Efeito:** a pessoa se sente atendida no objetivo dela, e o app não promete o que não faz. O ganho real de treino é só para quem quer força (robusta na direção; números de consenso).
- **Esforço:** médio, por **[opinião]** 1 a 2 dias de trabalho: um campo novo no perfil (com validação zod e versão na exportação JSON), 3 a 5 regras novas em `regras.md` com selo, um ramo no gerador para a faixa e o descanso, textos, testes com as personas e a revisão do Gustavo. A regressão visual não é afetada (não muda animação).
- **Risco:** uma pergunta a mais no cadastro; a tentação de "personalizar" o cutting sem evidência (as regras devem deixar explícito que o programa é o mesmo).

### (c) Levar ao plano um marco novo, fora do MVP de hoje
- **O que muda:** um marco com pelo menos um destes: cardio prescrito (para saúde e cutting), orientação de nutrição com um parceiro nutricionista, programa de força máxima com periodização e estimativa de 1RM.
- **Efeito:** atende de verdade quem quer emagrecer ou condicionamento (a dieta e o aeróbio são o que mais pesa nesses objetivos).
- **Esforço:** semanas. Cada parte pede um tema de pesquisa próprio (com selos), triagem de segurança nova, guias novos e mudanças no `PLANO-MVP.md` e no `CLAUDE.md`. A nutrição traz dados ainda mais sensíveis (LGPD) e, provavelmente, um profissional responsável.
- **Risco:** atrasa o MVP e dilui o foco num produto que ainda não foi validado com usuários.

### Recomendação **[opinião]**
**(b) na versão mínima**, ou (a) agora e (b) depois da revisão do MVP. A evidência lida diz que o programa de hoje **já é o certo** para cutting e para a parte de força da saúde, então o custo de atender esses objetivos é só texto. A força máxima é o único objetivo em que a evidência sustenta um ajuste de números, e o ajuste é pequeno e usa uma opção que o app já tem (descanso de 2–3 min). O (c) deve ir para `docs/backlog.md` com esta pesquisa como ponto de partida, e não entrar no MVP.

## Propostas para `regras.md` (só propostas)

| id proposto | regra | iniciante | intermediário | avançado | selo | fontes |
|---|---|---|---|---|---|---|
| `objetivo.cutting.mesmo-programa` | No objetivo "manter o músculo enquanto perde peso", o programa é o mesmo da hipertrofia; nenhum número muda por causa do déficit | igual | igual | igual | robusta (o treino de força protege a massa magra no déficit) | `binmahfoz2025`, `deller2026`, `lopez2022`, `murphy2022` |
| `objetivo.cutting.volume` | No déficit, não reduzir o volume por conta própria; volume moderado e alto seguraram o músculo igual em treinados | volume do nível | volume do nível | volume do nível | um estudo | `roth2023`, `roth2022` |
| `objetivo.cutting.texto` | Texto do objetivo: a dieta decide a perda de peso (fora do app); o músculo tende a crescer pouco; a força pode continuar subindo | texto | texto | texto | moderada (o que esperar); consenso (o texto) | `murphy2022`, `binmahfoz2025` |
| `objetivo.forca.faixa-compostos` | No objetivo "ficar mais forte", os 1 ou 2 primeiros compostos do dia usam uma faixa mais baixa | como hoje (6–10) | 4–6 ou 5–8 | 4–6 ou 5–8 | consenso (a faixa); robusta (a direção) | `acsm2026`, `schoenfeld2017b`, `lopez2021`, `currier2023` |
| `objetivo.forca.descanso` | Descanso dos compostos no objetivo de força | 90–120 s | 2–3 min | 2–3 min | moderada | `grgic2018a`, `acsm2026` |
| `objetivo.forca.seguranca` | Faixa baixa em multiarticular livre pesado sem ajudante: RIR ≥ 2; nunca calibrar até a falha nele | RIR ≥ 2 | RIR ≥ 2 | RIR ≥ 2 | consenso | `consenso-projeto` |
| `objetivo.saude.texto` | Texto do objetivo de saúde: o programa cumpre a parte de força; as diretrizes pedem também 150–300 min de aeróbio moderado (ou 75–150 vigoroso) por semana, que o app não prescreve | texto | texto | texto | consenso (diretriz) | `bull2020`, `garber2011`, `momma2022` |

Antes de virar constante, a política de pendências de `00-metodo.md` vale: abrir o texto completo de ACSM 2026, Grgic 2018a e Bull 2020 (OMS), e o PDF do guia do Ministério da Saúde.

## Fontes novas (formato de `docs/pesquisa/fontes.md`)

- `androulakiskorakakis2020` — Androulakis-Korakakis P, Fisher JP, Steele J, et al. (2020). The Minimum Effective Training Dose Required to Increase 1RM Strength in Resistance-Trained Men: A Systematic Review and Meta-Analysis. Sports Med 50(4):751–765. PMID: 31797219 | DOI: 10.1007/s40279-019-01236-0 | https://pubmed.ncbi.nlm.nih.gov/31797219/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `binmahfoz2025` — Binmahfoz A, Dighriri A, Gray C, et al. (2025). Effect of resistance exercise on body composition, muscle strength and cardiometabolic health during dietary weight loss in people living with overweight or obesity: a systematic review and meta-analysis. BMJ Open Sport Exerc Med 11(3):e002363. PMID: 40909191 | DOI: 10.1136/bmjsem-2024-002363 | https://pubmed.ncbi.nlm.nih.gov/40909191/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `bull2020` — Bull FC, Al-Ansari SS, Biddle S, et al. (2020). World Health Organization 2020 guidelines on physical activity and sedentary behaviour. Br J Sports Med 54(24):1451–1462. PMID: 33239350 | DOI: 10.1136/bjsports-2020-102955 | https://pubmed.ncbi.nlm.nih.gov/33239350/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; o detalhe "≥ 2 dias, grandes grupos musculares" não está no resumo; texto completo não lido; citada como "OMS 2020" em `pesquisa-v2/06`, sem chave em `fontes.md`) — conferido em 2026-11-04
- `dankel2017` — Dankel SJ, Counts BR, Barnett BE, et al. (2017). Muscle adaptations following 21 consecutive days of strength test familiarization compared with traditional training. Muscle Nerve 56(2):307–314. PMID: 27875635 | DOI: 10.1002/mus.25488 | https://pubmed.ncbi.nlm.nih.gov/27875635/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `deller2026` — Deller M, Weiershaus J, Held S, et al. (2026). Effects of Calorie Restriction With and Without Strength, Endurance or Mixed Training on Fat-Free and Skeletal Muscle Mass in Overweight or Obese Individuals: A Systematic Review With Pairwise Meta-Analysis and Network Meta-Analysis of Randomized Controlled Studies. Diabetes Obes Metab 28(8):6810–6823. PMID: 42144246 | DOI: 10.1111/dom.70873 | https://pubmed.ncbi.nlm.nih.gov/42144246/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `garber2011` — Garber CE, Blissmer B, Deschenes MR, et al. (2011). American College of Sports Medicine position stand. Quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults: guidance for prescribing exercise. Med Sci Sports Exerc 43(7):1334–1359. PMID: 21694556 | DOI: 10.1249/mss.0b013e318213fefb | https://pubmed.ncbi.nlm.nih.gov/21694556/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `grgic2018a` — Grgic J, Schoenfeld BJ, Skrepnik M, et al. (2018). Effects of Rest Interval Duration in Resistance Training on Measures of Muscular Strength: A Systematic Review. Sports Med 48(1):137–151. PMID: 28933024 | DOI: 10.1007/s40279-017-0788-x | https://pubmed.ncbi.nlm.nih.gov/28933024/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `grgic2018b` — Grgic J, Schoenfeld BJ, Davies TB, et al. (2018). Effect of Resistance Training Frequency on Gains in Muscular Strength: A Systematic Review and Meta-Analysis. Sports Med 48(5):1207–1220. PMID: 29470825 | DOI: 10.1007/s40279-018-0872-x | https://pubmed.ncbi.nlm.nih.gov/29470825/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `helms2015` — Helms ER, Fitschen PJ, Aragon AA, et al. (2015). Recommendations for natural bodybuilding contest preparation: resistance and cardiovascular training. J Sports Med Phys Fitness 55(3):164–178. PMID: 24998610 | DOI: — | https://pubmed.ncbi.nlm.nih.gov/24998610/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; revisão com recomendações, conta como consenso; texto completo não lido) — conferido em 2026-11-04
- `lopez2022` — Lopez P, Taaffe DR, Galvão DA, et al. (2022). Resistance training effectiveness on body composition and body weight outcomes in individuals with overweight and obesity across the lifespan: A systematic review and meta-analysis. Obes Rev 23(5):e13428. PMID: 35191588 | DOI: 10.1111/obr.13428 | https://pubmed.ncbi.nlm.nih.gov/35191588/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `murphy2022` — Murphy C, Koehler K (2022). Energy deficiency impairs resistance training gains in lean mass but not strength: A meta-analysis and meta-regression. Scand J Med Sci Sports 32(1):125–137. PMID: 34623696 | DOI: 10.1111/sms.14075 | https://pubmed.ncbi.nlm.nih.gov/34623696/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-03
- `roth2022` — Roth C, Schoenfeld BJ, Behringer M, et al. (2022). Lean mass sparing in resistance-trained athletes during caloric restriction: the role of resistance training volume. Eur J Appl Physiol 122(5):1129–1151. PMID: 35146569 | DOI: 10.1007/s00421-022-04896-5 | https://pubmed.ncbi.nlm.nih.gov/35146569/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-03
- `roth2023` — Roth C, Schwiete C, Happ K, et al. (2023). Resistance training volume does not influence lean mass preservation during energy restriction in trained males. Scand J Med Sci Sports 33(1):20–35. PMID: 36114738 | DOI: 10.1111/sms.14237 | https://pubmed.ncbi.nlm.nih.gov/36114738/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `schumann2022` — Schumann M, Feuerbacher JF, Sünkeler M, et al. (2022). Compatibility of Concurrent Aerobic and Strength Training for Skeletal Muscle Size and Function: An Updated Systematic Review and Meta-Analysis. Sports Med 52(3):601–612. PMID: 34757594 | DOI: 10.1007/s40279-021-01587-7 | https://pubmed.ncbi.nlm.nih.gov/34757594/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04
- `umpierre2022` — Umpierre D, Coelho-Ravagnani C, Tenório MC, et al. (2022). Physical Activity Guidelines for the Brazilian Population: Recommendations Report. J Phys Act Health 19(5):374–381. PMID: 35418515 | DOI: 10.1123/jpah.2021-0757 | https://pubmed.ncbi.nlm.nih.gov/35418515/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; o resumo não traz números de dose; o guia do Ministério da Saúde não foi aberto) — conferido em 2026-11-04
- `wewege2022` — Wewege MA, Desai I, Honey C, et al. (2022). The Effect of Resistance Training in Healthy Adults on Body Fat Percentage, Fat Mass and Visceral Fat: A Systematic Review and Meta-Analysis. Sports Med 52(2):287–300. PMID: 34536199 | DOI: 10.1007/s40279-021-01562-2 | https://pubmed.ncbi.nlm.nih.gov/34536199/ — **status:** resumo-PubMed (resumo oficial lido no PubMed na pesquisa de outros objetivos; texto completo não lido) — conferido em 2026-11-04

**Chaves que já existem ou já foram propostas e são reutilizadas:** `acsm2026` (resumo relido nesta sessão), `schoenfeld2017b`, `lopez2021`, `pelland2026`, `singer2024`, `momma2022`, `ren2024`, `garciahermoso2023`, `nunes2021`, `moesgaard2022`. `currier2023` foi proposta em `pesquisa-v2/02` e ainda não está em `fontes.md`.

**Vistos só pelo título (NÃO VERIFICADO, nenhum número usado):** Helms et al. 2014, proteína no déficit (24092765); ISSN 2026, dietas para perder peso (42867412); Weinheimer et al. 2010, restrição calórica e exercício em meia-idade e idosos (20591106); ensaio de proteína no déficit (26817506); meta-análise de 2025 sobre dieta de muito baixa caloria e exercício (41093698); "Dose-response modelling of resistance exercise across outcome domains" (38652410); ISSN 2017, dietas e composição corporal (28630601).

## Buscas registradas (todas)
Todas no PubMed, com `python3 -I scripts/pesquisa/pubmed.py s`. Os PMIDs úteis estão em negrito; o resto da lista não foi aproveitado.

| # | Data | Termos | Resultado útil |
|---|---|---|---|
| 1 | 2026-11-03 | energy deficit lean mass resistance training meta-analysis | vazia (provável limite de pedidos) |
| 2 | 2026-11-03 | energy deficit resistance training hypertrophy | nada direto (41940947 recomposição; 34578961 cetogênica) |
| 3 | 2026-11-03 | Murphy Koehler energy deficits impair | vazia |
| 4 | 2026-11-03 | energy deficits impair resistance training gains | **34623696** (Murphy & Koehler 2022) |
| 5 | 2026-11-03 | Roth resistance training energy deficit muscle meta-analysis | vazia |
| 6 | 2026-11-03 | caloric restriction resistance training lean mass | **34623696**, **35146569** (Roth 2022), **36114738** (Roth 2023), **35191588** (Lopez 2022); 24092765, 42867412, 28630601, 26817506 (nutrição, não lidos) |
| 7 | 2026-11-03 | bodybuilding contest preparation muscle mass | revisões de nutrição e estudos de caso (24864135, 28530498, 37218855), não usadas |
| 8 | 2026-11-03 | weight loss resistance training lean mass older adults meta-analysis | nada direto (proteína, jejum) |
| 9 | 2026-11-03 | caloric restriction exercise fat-free mass systematic review | **40909191** (Binmahfoz 2025), **42144246** (Deller 2026); 41093698, 20591106, 17075583 (não lidos) |
| 10 | 2026-11-03 | diet plus resistance exercise preserves lean mass obesity | 42144246 de novo; 28871849, 40760444 (ensaios, não lidos) |
| 11 | 2026-11-03 | 34623696[pmid] | vazia (limite de pedidos) |
| 12 | 2026-11-03 | strength maintenance energy restriction resistance-trained | nada direto (33630880, 33743284) |
| 13 | 2026-11-03 | low load high load strength meta-analysis | 28834797, 33433148, 35015560 (já lidos em `pesquisa-v2/10`); **31797219** (Androulakis-Korakakis 2020); 38652410 (não lido) |
| 14 | 2026-11-03 | inter-set rest interval muscular strength systematic review | vazia |
| 15 | 2026-11-03 | resistance training frequency strength gains meta-analysis | **29470825** (Grgic 2018b); 41343037, 37414459 (já lidos em `pesquisa-v2/02`); **34757594** (Schumann 2022) |
| 16 | 2026-11-03 | rest interval strength hypertrophy meta-analysis | nada direto (25601394 cadência; 41951916 métodos avançados, não lido) |
| 17 | 2026-11-03 | specificity strength testing 1RM hypertrophy | **27875635** (Dankel 2017) |
| 18 | 2026-11-03 | rest interval duration muscular strength Grgic | **28933024** (Grgic 2018a) |
| 19 | 2026-11-03 | WHO 2020 guidelines physical activity sedentary behaviour | **33239350** (Bull 2020); 33369898 (documento da OMS, não lido) |
| 20 | 2026-11-04 | Garber quantity quality exercise position stand | vazia |
| 21 | 2026-11-04 | American College of Sports Medicine position stand quantity and quality of exercise | **21694556** (Garber 2011) |
| 22 | 2026-11-04 | natural bodybuilding contest preparation resistance cardiovascular training | **24998610** (Helms 2015) |
| 23 | 2026-11-04 | resistance training body fat percentage meta-analysis healthy adults | **34536199** (Wewege 2022); 40405489 (não lido) |
| 24 | 2026-11-04 | training to failure energy restriction lean mass | interrompida (o container reiniciou); não repetida |
| 25 | 2026-11-04 | training intensity caloric restriction muscle retention randomized | vazia |
| 26 | 2026-11-04 | heavy versus light load weight loss lean mass | vazia |
| 27 | 2026-11-04 | resistance training load intensity hypocaloric diet | vazia |

As buscas 25 a 27 voltaram vazias depois de 4 tentativas cada, num período de limite de pedidos: **não provam** que não existe ensaio sobre carga ou falha no déficit. O Guia de Atividade Física para a População Brasileira não foi buscado na web nesta sessão; o PDF já tinha sido bloqueado em `pesquisa-v2/06`.

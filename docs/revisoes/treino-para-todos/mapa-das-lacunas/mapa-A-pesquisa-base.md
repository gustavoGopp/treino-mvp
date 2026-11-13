# Mapa A: o que a pesquisa-base já sabe e o que falta

Escopo lido (inteiro): `docs/pesquisa/00-metodo.md`, `01` a `07`, e `docs/pesquisa/regras.md` (163 regras, linhas 7 a 169). Para o status de leitura das fontes consultei também `docs/pesquisa/fontes.md` (só as linhas das fontes citadas). Nada no repositório foi alterado. Onde algo não está nesses documentos, escrevo "não tratado".

## 0. Notas gerais e avisos de leitura

- **Os 4 selos** (`00-metodo.md`): robusta (várias meta-análises na mesma direção), moderada (uma meta-análise, ou alguns ECRs coerentes, ou um grupo só com resultados consistentes), um estudo (um ensaio ou preprint), consenso (prática de treinadores, posicionamentos, Delphi e inferência do projeto). O selo vai para o número, não para o tema; se a regra mistura evidência forte com número escolhido pelo projeto, vale o selo mais fraco.
- **Placar de selos em `regras.md`** (163 regras): consenso 113 (69%), moderada 28, um estudo 15, robusta 7. Só 7 regras são "robusta": `volume.semanal.dose-resposta`, `frequencia.efeito-hipertrofia`, `divisao.equivalencia`, `reps.equivalencia-cargas`, `rir.falha.nao-necessaria`, `objetivo.cutting.mesmo-programa`, `tempo.drop-set`.
- **Status de leitura das fontes (`00-metodo.md`)**: verificado-busca (existe e bate com o registro; número não conferido no artigo), resumo-PubMed (resumo oficial lido), texto-completo (artigo inteiro lido), NÃO VERIFICADO (falta algo essencial da citação). Em `fontes.md` o placar atual é ~382 resumo-PubMed, ~100 verificado-busca, ~39 texto-completo, e 19 menções a NÃO VERIFICADO (contagem de linhas que contêm o termo).
- **ATENÇÃO, documentos temáticos desatualizados em relação a `fontes.md`.** `00-metodo.md` e os arquivos 01 a 07 dizem que "nenhum artigo foi lido na íntegra" (rede bloqueada em 29/10/2026). Mas `fontes.md` registra que, depois da liberação da rede (05 e 06/11/2026), 39 fontes passaram a texto-completo, entre elas `acsm2026`, `bull2020`, `iversen2021`, `zhang2025`, `haugen2023`, `bazvalle2022`, `schoenfeld2019b`, `chaves2020`, `maeo2021`, `maeo2024`, `kikuchi2017`, `plotkin2023`, `aafp2015`, `hevy-recursos`. O `01-volume-frequencia.md` ainda diz que do ACSM 2026 "só foi lido o material de imprensa"; `fontes.md` diz que o PMC (PMC12965823) foi lido inteiro (apêndices não). Sempre que as duas fontes divergem, uso `fontes.md` e aviso.
- **Conflito interno a resolver (volume, `schoenfeld2017a`).** `01-volume-frequencia.md`, conclusão 1, cita 5,4%, 6,6% e 9,8% por faixa (<5, 5–9, 10+) e dá selo robusta ao conjunto; e o item de lacunas diz que "+0,37% por série" não foi confirmado e não deve ser usado. Já `fontes.md` (resumo-PubMed lido em 06/11/2026) registra "+0,37% por série adicional" no resumo e que a comparação em 3 faixas deu "só tendência, p = 0,074". Ou seja, o número "+0,37%" apareceu no resumo, e a comparação de faixas que sustenta "10 ou mais > menos de 10" não foi significativa nessa meta-análise. O selo robusta da regra `volume.semanal.dose-resposta` repousa no conjunto (Pelland, Baz-Valle, Schoenfeld 2019), não só nessa fonte.
- **Pelland 2026** (`pelland2026`): o que foi lido foi o **preprint** (SportRxiv, setembro de 2024, 67 estudos, 2.058 pessoas) e o resumo-PubMed da versão publicada (Sports Med 56(2)); a versão publicada não foi lida (Springer bloqueia robôs). `fontes.md`: +0,24% por série na média (IC 0,15–0,33), modelo de raiz quadrada, frequência→hipertrofia 91,3% com intervalo incluindo zero.
- **Política do projeto (`00-metodo.md`)**: nenhum selo sobe sem fonte nova; regra só com fonte NÃO VERIFICADA pode ser provisória e o texto do app não cita o estudo; diretrizes de texto bloqueado não servem de fonte de números; preprints são revalidados quando saírem revisados.
- **Limitações gerais da literatura (`00-metodo.md`)**: amostras de 10 a 40 pessoas, homens jovens, não treinados, 6 a 12 semanas, medidas indiretas, EMG não mede hipertrofia.
- Muitas linhas de `regras.md` citam documentos que não faziam parte da leitura (`pesquisa-v2/*`, `docs/revisoes/*`, `docs/PLANO-MVP.md`). Tratei essas referências como informação de segunda mão.

---

## 1. Quanto fazer: séries, dose mínima, retorno decrescente, frequência, quanto cabe na sessão

**(a) O que os documentos concluem** (`01-volume-frequencia.md`; `regras.md`)
- Dose-resposta côncava: sobe rápido até ~10 séries/semana, devagar até ~20, quase plana depois. `volume.semanal.dose-resposta`: "≥10 > <10", selo **robusta**.
- Faixas por nível (séries fracionadas por músculo): mínimo 6/10/12 (`volume.semanal.minimo`, **consenso**); alvo padrão do músculo prioritário 10/12/14 (`volume.semanal.alvo`, **consenso**; o iniciante subiu de 8 para 10 em 08/11/2026 por decisão do projeto); máximo 10/16/20 (`volume.semanal.maximo`, **consenso**). `01` item 8: "Nenhuma fonte valida volumes por nível" (consenso).
- Teto absoluto 20 séries/semana (`volume.semanal.teto-padrao`, **moderada**); avançado só passa de 20 por opção explícita. `01` item 2: acima de ~20 o ganho extra é "pequeno e incerto" (Baz-Valle, Aubé, Rantila); contraponto: 5 séries/exercício cresceram mais que 1 e 3 (`schoenfeld2019b`).
- Piso para músculo não prioritário: 4–6 séries (`volume.semanal.minimo-eficaz`, **moderada**). Abdômen não prioritário: 4 (`volume.semanal.abdomen`, **consenso**).
- Dose mínima/manutenção: 1–3 séries pesadas por músculo/semana, carga mantida (`volume.manutencao.piso`, **moderada**; `bickel2011`, `spiering2021`). Menos de 5 séries/semana ainda dão ganho (`01` item 3, moderada).
- Contagem fracionada: série indireta = 0,5 (`volume.serie-indireta.peso`, **um estudo**; a direção, entre 0 e 1, é moderada). A razão 0,47 na rosca × remada vem de `mannarino2021`.
- Séries por exercício: 2–4 (`volume.series-por-exercicio`, **moderada**; `krieger2010`, `remmert2025`); série única não é padrão.
- Teto por sessão: ≤10 séries fracionadas por músculo, contando indiretas (`volume.sessao.teto`, **um estudo**, preprint `remmert2025`). Frequência mínima = ceil(volume semanal/10) (`divisao.frequencia-minima`, **um estudo**; `frequencia.musculo`, **consenso**; 1x só se volume ≤10).
- Frequência com volume igual quase não muda a hipertrofia (`frequencia.efeito-hipertrofia`, **robusta**); divisões equivalentes (`divisao.equivalencia`, **robusta**). Opções de divisão por número de dias (2 a 6) e divisão clássica só com meta ≤10 (`divisao.recomendacao`, `divisao.seis-dias`, `divisao.classica`, todas **consenso**).
- Quanto cabe numa sessão: 30 min = 4 exercícios, 45 = 6, 60 = 8, 75 = 10, 90 = 12 (`tempo.exercicios-por-sessao`, **consenso**; `regras.md` diz que os ensaios usam 2 a 8 exercícios por sessão e que "5 a 7 exercícios por treino" é prática de treinadores, citando `pesquisa-v2/14`).
- Foco/prioridade: `volume.prioridade.competicao`, `.foco-primeiro`, `.segundo-exercicio`, `.ate-dois` (todas **consenso**; até 2 grupos de foco, "pernas" contam como 3, "braços" como 2; o tempo que sobra vai primeiro ao foco; "outros" sobem até 6 séries abaixo do foco).
- Equilíbrio da coxa: quadríceps ÷ posteriores entre 0,5 e 2 (`volume.equilibrio-coxa`, **consenso**; `green2018`, `kubo2019`, `maeo2021`).

**(b) Fontes principais e status de leitura**
- `schoenfeld2017a` (resumo-PubMed; PMID registrado). `pelland2026` (resumo-PubMed + preprint lido; versão final não lida). `remmert2025` (verificado-busca; preprint lido inteiro em 05/11/2026, sem revisão por pares). `bazvalle2022`: texto-completo (fontes.md). `schoenfeld2019b`: texto-completo. `schoenfeld2019a` e `schoenfeld2016a` (frequência): `01` diz que o DOI/PMID de 2019 estão NÃO VERIFICADOS. `aube2022`, `rantila2026`, `krieger2010`, `bickel2011`, `spiering2021`, `grgic2019`: status não anotado nos arquivos temáticos (`01` e `06` dizem que o PMID de `bickel2011` está NÃO VERIFICADO e que os protocolos literais de Bickel e o trecho "1 sessão, 1 série" de Spiering não foram conferidos). `ramoscampo2024` (divisão): status não visto. `acsm2026`: texto-completo no PMC (10 ou mais séries/semana, platô perto de 18–20, ≥2 séries por exercício; apêndices não lidos).

**(c) Pontos fracos**
- Metade das regras de volume é **consenso**: mínimo, alvo e máximo por nível; frequência mínima; divisões; exercícios por minuto. O número 10 do alvo do iniciante foi mudado por decisão de projeto (08/11/2026), não por estudo.
- O **teto de 10 séries fracionadas por sessão** (e daí a frequência mínima) apoia-se em **um preprint** não revisado, com "poucos dados com volumes altos por sessão"; o app usa 10 por ser conservador sobre o ~11 do preprint.
- O peso 0,5 da série indireta é uma aproximação estatística média de um grupo de pesquisa (Pelland/Remmert/Zourdos); não mede o estímulo real do sinergista. A atribuição primário/secundário por exercício é anatomia e consenso.
- Tamanhos de efeito, intervalos e forma exata da curva de Pelland não foram conferidos na versão publicada. Há quase nenhum dado acima de ~30 séries/semana; os estudos de teto são com homens jovens treinados.
- Nenhuma fonte define iniciante/intermediário/avançado em termos operacionais (`01`; ver tema 8) nem testa as faixas por nível; `pelland2026` tem status de treino como moderador mas o resultado não foi lido.
- Os pesos e regras de **prioridade/foco** (até 2 grupos, sobra de tempo, 6 séries de distância, 70%) são do projeto, medidos só em simulação interna (`regras.md`), sem estudo; `regras.md` diz que "quantos grupos priorizar ao mesmo tempo não tem estudo".
- Não tratado: volume por idade, sexo, nível real medido; recuperação entre sessões do mesmo músculo (intervalo mínimo em horas/dias); como volume interage com sono/estresse; número de exercícios por sessão validado por estudo; volume do abdômen e antebraço; volume de manutenção para quem é muito treinado (só adultos jovens, `bickel2011`; idosos precisaram de mais).

---

## 2. Quão pesado e quão perto da falha; faixas de repetições; descanso

**(a) O que concluem** (`02-intensidade-rir-descanso.md`; `regras.md`)
- Perto da falha, carga leve e pesada dão hipertrofia parecida; 6 a 30 repetições (`reps.equivalencia-cargas`, **robusta**; `schoenfeld2017b`, `lopez2021`, `lasevicius2018`). A carga alta dá mais força máxima.
- Piso de carga: 20% de 1RM foi subótimo (`lasevicius2018`, **um estudo**); os limites práticos ~6 e ~30 repetições são consenso (`reps.teto.carga-limitada`, até 30, **consenso**).
- Faixas por tipo: compostos 6–10 ou 8–12, isoladores 10–20 (`reps.faixa.por-tipo`, **consenso**). Faixas de peso do corpo/elástico (5 a 8 reps de largura, topo até 20; `reps.faixa.degrau`, **consenso**).
- Falha não é necessária (`rir.falha.nao-necessaria`, **robusta**; `refalo2023` ES 0,19 IC 0,00–0,37; `grgic2022`; `refalo2024`). RIR alvo: iniciante composto 2–3 e isolador 1–2; intermediário/avançado composto 1–2 e isolador 0–1 (`rir.alvo`, **consenso**; `robinson2024`, que os autores chamam de exploratória).
- Série efetiva = RIR ≤ 4 (`rir.serie-efetiva`, **consenso**; limiar do projeto, o relatório dá "3–4"; precisa de aprovação do usuário segundo `02`).
- Carga baixa (≥15 reps) pede RIR 0–2 (`rir.carga-baixa`, **um estudo**; `lasevicius2022`; iniciante RIR 1–2 a partir da 3ª semana).
- Leitura do RIR: as pessoas subestimam ~1 repetição; erro maior acima de ~12 reps e longe da falha; experiência não reduz (`rir.leitura`, **moderada**; `halperin2022`, heterogeneidade I² ≈ 98%). Calibração semanal em isolador seguro até a falha técnica (`rir.calibracao`, **consenso**).
- Descanso: acima de 60 s vantagem pequena; acima de ~90 s sem diferença (`descanso.piso` e `descanso.por-tipo`, **moderada**; `singer2024`, Bayesiana, 9 estudos, todos os intervalos cruzando zero). Padrão: composto 90–120 s (105 s; 2–3 min como opção) e isolador 60–90 s (75 s). Descansar mais nos compostos é consenso (nenhum estudo separa composto de isolador).
- Cadência: 0,5–8 s equivalentes, >10 s parece pior (`cadencia.repeticao`, **moderada**; `schoenfeld2015`, `lacerda2021` com ressalva de confusão entre carga e duração).

**(b) Fontes e leitura**
- `schoenfeld2017b`: verificado-busca. `lopez2021`: status não anotado. `lasevicius2018`, `lasevicius2022`: não anotado. `refalo2023`, `grgic2022`, `robinson2024`, `zourdos2016`: PMIDs NÃO VERIFICADOS (`02`); `refalo2024`: título, DOI e RIR alvo NÃO VERIFICADOS. `halperin2022`: verificado-busca (coautores não conferidos). `singer2024`: resumo-PubMed. `schoenfeld2015`, `schoenfeld2016b`, `grgic2017a`: não anotado. `acsm2026`: texto-completo (esforço "perto da falha ou 2–3 RIR" sem evidência de RIR exato; 30% a 100% de 1RM equivalente), mas `02` ainda diz que as fontes secundárias divergem no RIR (1–2 contra 2–3) porque o texto original não fora lido; `fontes.md` resolve em favor de "2–3 RIR, sem evidência para um RIR exato".

**(c) Pontos fracos**
- Todos os **RIR alvo por nível**, a divisão composto 6–12 × isolador 10–20, os 105 s/75 s, o limiar RIR ≤ 4 e o teto de 30 repetições são **consenso**; nenhum estudo testa "30 repetições" como teto nem compara 20–30% com 30–40% de 1RM em treinados.
- A forma da curva de RIR (quanto se perde por repetição em reserva) não é quantificável; coeficientes de Robinson não lidos.
- O erro de estimar RIR (±1, grande acima de 12 reps) coexiste com um app que pede RIR 0–1 em isoladores para intermediários e avançados e com calibração só uma vez por semana.
- Não tratado: separar descanso por tipo de exercício em meta-análise; descanso com carga leve e ~30 reps; relação entre descanso e adesão; ajuste de RIR por idade/mulheres/idosos/condições de saúde (`02`: "Faltam dados com mulheres, idosos e pessoas com condições de saúde"); a comparação 2 × 5 min de descanso de um blog não teve fonte primária e não é usada.

---

## 3. Escolha de exercício: alongamento, estabilidade, facilidade de carga, amplitude; multi × isolador; variedade

**(a) O que concluem** (`04-selecao-ordem-exercicios.md`; `regras.md`)
- Máquina = peso livre, unilateral = bilateral para hipertrofia (`selecao.equivalencia-equipamento`, **moderada**; `haugen2023` 13 estudos, só 5 com hipertrofia; `kassiano2025`, 9 estudos, IC largo). A regra central "só com o equipamento que a pessoa tem" depende disso. `acsm2026` (em `fontes.md`): máquina × peso livre é "dados insuficientes" para hipertrofia.
- Amplitude completa e controlada (`selecao.amplitude`, **moderada**). Repetição parcial na posição encurtada nunca como padrão; parcial alongada cresce como a completa e vira alternativa em texto para o avançado (`tecnica.parcial-alongada`, **moderada**).
- Alongamento: efeito pequeno, poucos estudos, quase só não treinados, some em treinados (`04` item 4; `wolf2025`). Por isso vira só desempate (`selecao.comprimento-longo`, **moderada**), mas `selecao.alongado` (**moderada**) coloca primeiro tríceps acima da cabeça, flexora sentada, panturrilha em pé, extensora para o reto femoral. `selecao.funcao-da-vaga` (**consenso**) pede função e não equipamento.
- Preferências de **um estudo cada** (todas **um estudo**): flexora sentada (`selecao.flexora-sentada`, `maeo2021`, +14% × +9%, não treinados), tríceps acima da cabeça (`selecao.triceps-acima-cabeca`, `maeo2023`, +28,5% × +19,6%), panturrilha alongada (`selecao.panturrilha-alongada`), supino inclinado (`selecao.peitoral-inclinado`, `chaves2020`, não treinados, 1x/semana), crucifixo como complemento (`selecao.crucifixo-complemento`), glúteo/coice na polia (`selecao.gluteo`, `attarieh2026`), nórdico (`selecao.nordico`).
- Estabilidade: só desempate do iniciante (`selecao.estabilidade`, **consenso**). Facilidade de carga: entra no desempate do gerador (`selecao.funcao-da-vaga`), sem estudo próprio.
- Multi × isolador: multi como base; isoladores para braços, cabeças biarticulares, panturrilha, deltoide lateral (`selecao.multi-mono`, **moderada**; `gentil2015` um estudo, `rosa2022`, `mannarino2021`, `brandao2020`). `selecao.isolador-obrigatorio` (**moderada**).
- Variedade: variação sistemática ajuda hipertrofia regional, a aleatória pode atrapalhar (`selecao.variacao`, **moderada**; `kassiano2022`, 8 estudos só homens jovens; `fonseca2014`). Exercícios fixos por 4–8 semanas (`selecao.manter-no-bloco`, **moderada**). 2 exercícios complementares por músculo grande (`selecao.complementos`, **moderada**; `selecao.exercicios-por-musculo`, **consenso**: "O número 2 é consenso"; nenhum ensaio compara 1 exercício com mais séries a 2 exercícios com o mesmo volume).
- Complexidade por nível (`selecao.complexidade-nivel`, **consenso**; iniciante até 2).

**(b) Fontes e leitura**
- `haugen2023`: texto-completo (SMD −0,055, IC −0,397 a 0,287). `chaves2020`, `maeo2021`, `maeo2024`, `kinoshita2023`, `kinoshita2026`: texto-completo. `kassiano2025`: autores/título/DOI NÃO VERIFICADOS (`04`). `pallares2021`, `schoenfeld2020`: PMIDs NÃO VERIFICADOS. `wolf2023`: nº de estudos e dados por estudo não lidos. `gentil2015`: periódico NÃO VERIFICADO. `kassiano2022`, `fonseca2014`, `maeo2023`, `wolf2025`: não anotado.

**(c) Pontos fracos**
- Quase tudo vem de 20–45 pessoas **não treinadas**, 8–12 semanas, desenho intra-sujeito. Peitoral, dorsais, deltoides e glúteos têm pouca evidência regional direta (`04`).
- Cinco regras de seleção têm selo "um estudo" e entram no "porquê" como "apoiado por um estudo".
- A **frequência ótima de troca de exercícios** entre blocos é desconhecida; o "4–8 semanas" não vem de estudo.
- EMG e "razão estímulo/fadiga" não preveem hipertrofia (consenso; `consenso-projeto`).
- A hierarquia de níveis de função (qual exercício é "nível 1, 2, 3" na tabela `FUNCAO`) é do projeto (`selecao.funcao-da-vaga`, consenso).
- Não tratado: seleção por mobilidade/antropometria (comprimento de fêmur, etc.); peso de "facilidade de carga" e de "estabilidade" para progressão; evidência de glúteos, dorsais e deltoides além de EMG e de ensaios isolados; adesão à variedade (só uma frase em `selecao.variacoes-equivalentes` que cita `bazvalle2019`, `sylvester2016` sem status visto).

---

## 4. Ordem na sessão e interferência entre exercícios (lombar, pegada, mesmo músculo em dias seguidos)

**(a) O que concluem** (`04`; `regras.md`)
- A ordem não altera a hipertrofia (ES = 0,03, 11 estudos), só a força do exercício feito primeiro (`ordem.sessao`, **moderada**; `nunes2021`, `simao2012`, `acsm2026`, `tomeleri2020`, `avelar2019`, `nunes2019`). `nunes2019` (um estudo): começar pela perna reduz o esforço percebido no corpo todo. "Prioritário primeiro" tem apoio para força, não para hipertrofia (só `avelar2019`, fraco).
- Regra do gerador: multiarticular → prioridade do usuário → ordem do modelo de divisão (exigência técnica) → core por último.
- Pré-exaustão não traz ganho (`tempo.outras-tecnicas`, **um estudo**, `trindade2019`).
- Superséries: nunca dois multiarticulares pesados de pernas nem o mesmo músculo (`tempo.superserie`, **moderada**).
- Equilíbrio empurrar ÷ puxar ≤ 1,5 (`avaliador.empurrar-puxar`, **consenso**, apoio de caso-controle `kolber2010`, `kolber2014`, `kolber2017`).

**(b) Fontes e leitura**: `nunes2021` e `simao2012`: não anotados nos documentos lidos; `tomeleri2020`: resumo-PubMed (ensaio em mulheres idosas); `acsm2026`: texto-completo ("ordem irrelevante para hipertrofia"); `avelar2019`, `nunes2019`: não anotado.

**(c) Pontos fracos**
- **Não tratado**: fadiga da lombar (por exemplo terra/stiff antes de remada ou agachamento), fadiga da pegada (barra fixa/remada antes de terra ou rosca), e **intervalo mínimo entre dois dias que treinam o mesmo músculo**. Nenhuma regra impõe um espaçamento em horas ou dias; a divisão só calcula frequência (`divisao.frequencia-minima`) e a estrutura A/B segue a rotação. Também não há regra sobre sessões consecutivas de pernas pesadas ou dores musculares (DOMS só aparece como "nunca é gatilho" de progressão, `progressao.criterios-invalidos`, **consenso**).
- A ordem "exigência técnica" do modelo de divisão é do projeto. O apoio de `ordem.sessao` é para o efeito nulo na hipertrofia, não para a interferência.
- Só dado de ordem em idosas (`tomeleri2020`) e meta-análise de 11 estudos; lacuna sobre ordem com treinados de longo prazo não declarada.
- `consenso-projeto` aparece em `selecao.funcao-da-vaga`, `selecao.preferencia` etc. como sustentação de desempates.

---

## 5. Eficiência do tempo: superséries, drop sets, descanso curto, o que cortar

**(a) O que concluem** (`06-economia-de-tempo.md`; `regras.md`)
- Superséries reduzem duração e mantêm volume e adaptações crônicas (`tempo.superserie`, **moderada**; `zhang2025`, 19 estudos, 313 pessoas, texto-completo; `robbins2010`; `iversen2024`). Agonista-antagonista até aumenta repetições; mesmo padrão reduz carga-volume. ~15 s entre A e B; só a partir da 3ª semana para o iniciante.
- Drop set equivalente ao tradicional em hipertrofia, com mais esforço percebido (`tempo.drop-set`, **robusta** para não inferioridade: `sodal2023`, `coleman2022`, `dropset2026`, `bradshaw2026`); 1 série + 2 quedas ≈ 2 séries; ≤1 por exercício; nunca em multi livre pesado.
- Rest-pause: igual ou melhor em ensaios pequenos (`prestes2019`); cluster não economiza tempo (`davies2021`, 29 estudos, moderada); pré-exaustão sem ganho (`trindade2019`). Todos em `tempo.outras-tecnicas` (**um estudo**).
- Modelo de duração: série = reps × 3 s + 5–10 s (`tempo.serie`); transição 60–120 s (`tempo.transicao`); aquecimento específico 1–2 séries leves, 2–4 min (`tempo.aquecimento`); margem +10% (`tempo.colchao`); calibração pelo tempo real (`tempo.calibracao`: mediana real÷estimado após 3 sessões); todas **consenso**.
- Escada de corte (`tempo.corte`, **consenso**): 1) só aquecimento específico; 2) superséries; 3) drop set; 4) menos exercícios (mantendo multis e isoladores obrigatórios); 5) menos séries (não prioritários até o piso de 4, depois os prioritários). `06` descreve uma ordem diferente (menos exercícios antes das técnicas) e `regras.md` já usa a ordem acima; o `06` também marca como "ponto para revisão" a diferença com o pseudocódigo do `docs/PLANO-MVP.md`, dependente de aprovação do usuário.
- Descanso curto: modo curto usa 90 s nos compostos e 60 s nos isoladores, nunca abaixo de 60 s (`descanso.piso`, `descanso.por-tipo`, **moderada**).
- Manutenção para pouco tempo: 1–3 séries pesadas/músculo/semana (`volume.manutencao.piso`, **moderada**). Músculos protegidos: abdômen e panturrilha nunca ficam a zero (`tempo.musculo-protegido`, **consenso**). Tempo que sobra: `tempo.sobra` (aviso se <70% dos minutos), `tempo.sobra-series`, **consenso**.

**(b) Fontes e leitura**: `zhang2025` texto-completo (PMID NÃO VERIFICADO segundo `06`, mas `fontes.md` registra PMID 39903375 e leitura integral em 06/11/2026, outra divergência por data); `iversen2021` texto-completo (revisão narrativa; os detalhes de aquecimento e descanso no `06` vieram da memória do pesquisador e estavam NÃO VERIFICADOS; `fontes.md` já registra leitura integral); `sodal2023` e a meta-análise de 2026 de drop set (autores/PMID NÃO VERIFICADOS em `06`); `bickel2011` (PMID NÃO VERIFICADO); `iversen2024` resumo-PubMed; `plosone-preferencia` é na verdade um resumo de congresso de 2023 em idosos (chave a renomear, `fontes.md`).

**(c) Pontos fracos**
- **Nenhum estudo valida a fórmula de duração** nem mede o tempo de transição em academias reais; o exemplo "~39 min" é ilustração.
- Os "~37%" da supersérie e "1/2 a 1/3" do drop set só apareceram em blogs e não são usados.
- Drop set robusto só para não inferioridade; rest-pause, cluster e pré-exaustão são 1 estudo ou moderada com ressalva.
- Sem ensaio que compare adesão a sessões de 30 e de 60 min (`06`, conclusão 9 e lacunas); só uma preferência declarada em idosos (resumo de congresso).
- Supersérie na academia ocupa dois equipamentos ao mesmo tempo (nota do `06`); não há regra para fila.
- Efeito do descanso curto sobre o RIR e sobre a carga nas séries seguintes: não tratado.

---

## 6. Progressão ao longo de meses: carga por equipamento, deload, platô, volta depois de parar

**(a) O que concluem** (`03-progressao-readaptacao-deload.md`; `regras.md`)
- Dupla progressão: sobe a carga quando todas as séries chegam ao topo da faixa com o RIR alvo em 2 sessões seguidas, e volta ao fundo da faixa (`progressao.subir`, **consenso**; `plotkin2022`, `nsca2008`); manter se dentro da faixa (`progressao.manter`); reduzir 5–10% abaixo do mínimo em 2 sessões ou com dor (`progressao.reduzir`, **consenso**). Apoio: um ensaio de 8 semanas, treinados, só membros inferiores (`plotkin2022`: progredir por reps = por carga). "2 sessões" e os incrementos vêm do manual NSCA visto só em fontes secundárias; a faixa "2–10%" do ACSM 2009 não foi confirmada.
- Incrementos por equipamento: halteres (`progressao.incremento.halteres`, consenso), polia (+1 placa, `.polia`), máquinas de anilha (2 kg por lado como padrão "opinião", `.maquina-anilha`), assistido (`.assistido`), peso do corpo e elástico por escada (`.peso-corporal`, `progressao.escada-por-exercicio`, `.escada-elastico`, `.degrau-inicial`, `.criterio-degrau`, `.negativa-para-barra`, `equipamento.fim-da-escada`): todas **consenso**.
- Salto > ~10% exige 1–2 repetições a mais antes (`progressao.salto-grande`, **consenso**); carga leve demais: subir 2 incrementos (`progressao.carga-leve`, **consenso**); calibração por Brzycki (`progressao.calibracao`, **consenso**; `halperin2022`, `mayhew1995`, `nuzzo2024b`, `glass2004`); troca entre equivalentes (`progressao.troca-equivalente`, **moderada**).
- Periodização não aumenta hipertrofia com volume equalizado (ES 0,13, IC cruza zero; `moesgaard2022`; moderada); o gerador mantém faixas fixas.
- Deload: só sugestão manual e opcional (`deload.semana-leve`, **consenso**; `bell2023` Delphi, `rogerson2024` survey de 246 atletas: a cada ~5,6 semanas, ~6,4 dias; `coleman2024` um ensaio: semana sem treino não mudou hipertrofia e piorou um pouco a força). Gatilhos revistos no R2: ≥2 exercícios estagnados, "pesado demais" em 2 dos últimos 3 treinos, ou dor 3–5 no mesmo exercício em 2 sessões; sem o gatilho de "6–8 semanas" (o `03` ainda o lista; `regras.md` o removeu).
- Platô: estagnação = 3 sessões sem melhora; escada: faixa mais larga, −10%, semana leve se ≥2 exercícios, trocar variação (`progressao.estagnacao`, **consenso**; apoio indireto; "Não existem estudos sobre como sair de platô").
- Volta depois de parar: <2 semanas normal; 2 a <3: RIR +1 na 1ª sessão; ≥3: semana 1 ~50–60% das séries, RIR 3–4, carga −10% (3–8 sem) ou −15% (8–26 sem); semana 2 ~75% e RIR 2–3; semana 3 normal (`readaptacao.gatilho`, `.durante-uso`, `.semana1`, `.semana2`, `.semana3`, todas **consenso**). Pausas >182 dias: refaz o nível e começa com −20% e calibração. Apoio: pausa de ~3 semanas não prejudica o ganho final (`ogasawara2013`, `ogasawara2011`, um estudo replicado); `psilander2019`, `blocquiaux2020`; `bosquet2013` (robusta para força, não para hipertrofia); "memória muscular" tem evidência mista; `chen2012` (proteção de sessões leves dura ~2 semanas), `damas2016` (n = 10).
- Fase de aprendizado do iniciante: 2–3 semanas, RIR 3–4, 3/4 das séries (`iniciante.fase-aprendizado`, **consenso**).
- Acompanhamento: `acompanhamento.semana`, `.mensagens`, `.evolucao` (todas **consenso**), tema 10.

**(b) Fontes e leitura**: `plotkin2022`: resumo-PubMed (protocolo não lido); `nsca2008`: verificado-busca (livro não acessado); `acsm2009`: verificado-busca (faixas e "2–10%" não conferidos); `moesgaard2022`, `grgic2017b`: não anotado; `bell2023`, `rogerson2024`: verificado-busca; `coleman2024`: não anotado; `ogasawara2013`, `psilander2019`, `blocquiaux2020`, `grgic2017`, `hyldahl2017`, estudos de Chen e Nosaka: PMIDs/autores NÃO VERIFICADOS (`03`); `bosquet2013`: não anotado; `damas2016`: não anotado.

**(c) Pontos fracos**
- Praticamente **toda a progressão, a readaptação, o deload e o platô são consenso**: 2 sessões, 10%, 3 sessões, 50–60%, 75%, 10–20%, −10% (`03`, "heurísticas e devem aparecer no app como consenso"). Nenhum protocolo de readaptação foi testado.
- Não há dados de destreino de ~3 meses em quem treina há anos; não há comparação de dupla progressão com linear além de Plotkin (treinados, 8 semanas, membros inferiores).
- Sem ensaio de deload por redução de volume vs. treino contínuo, nem agendado × por gatilho.
- Todo o sistema de calibração de carga (Brzycki, A ± 2, +25%) usa fórmulas que divergem 15 a 52 pontos de % acima de 12 repetições (`acompanhamento.evolucao`).
- Incrementos de máquinas de anilha: padrão de 2 kg é "opinião do projeto, a confirmar no T8" (`equipamento.menor-anilha`).
- Não tratado: progressão em semanas de baixa aderência (parcialmente em `acompanhamento.mensagens`); mudança de objetivo ao longo dos meses; periodização de longo prazo (blocos >8 semanas), progressão para treinados avançados ("progresso lento") além de "trocar variação"; progressão de carga por sexo/idade.

---

## 7. Pouco equipamento e peso do corpo; manter estímulo para quem é forte

**(a) O que concluem** (`05-equipamento-limitado.md`; `regras.md`)
- Carga baixa perto da falha ≈ carga alta (**robusta**, `reps.equivalencia-cargas`); piso ~20% de 1RM e desconforto acima de 25–30 reps (um estudo + consenso).
- Escada para halter leve (`equipamento.escada-carga-leve`, **consenso**): reps até ~30 → unilateral/variação mais difícil → excêntrica 3–4 s (≤8 s) → pausa no alongamento ou 1,5 repetição → aviso de fim de escada (`equipamento.fim-da-escada`, consenso; o app não sugere compra).
- Elástico: força comparável à de pesos (**moderada para força**, `lopes2019`), mas "nenhum ensaio comparou a hipertrofia"; equivalência é inferência. Sem estudo sobre progressão do elástico (`progressao.escada-elastico`).
- Flexão no lugar de supino (`equipamento.flexao-por-supino`, **um estudo**; `kikuchi2017` texto-completo; `calatayud2015`; `kotarsky2018` não detectou ganho de espessura em 4 semanas). Escada de dificuldade (pés elevados, descida 3 s, déficit, pausa).
- Pernas sem máquina: unilateral/búlgaro (`bulgaro2026` um estudo, +9% vasto lateral em treinados); o gerador conta tempo dobrado (`tempo.serie`).
- Sem puxada vertical: remadas > remada unilateral com halter > puxada com elástico; pullover só acessório; aviso de lacuna (`equipamento.sem-puxada-vertical`, **consenso**; `fenwick2009` EMG n = 7). "Não existe estudo de hipertrofia que mostre que remadas substituem puxadas para o latíssimo."
- Sem ancoragem: nada para puxar → aviso, sem inventar exercício (`equipamento.sem-ancoragem`, **consenso**); divisão passa para corpo todo (`divisao.sem-puxar`, **consenso**).
- Biblioteca ampliada com peso do corpo, halteres, elástico, caneleira, kettlebell, suspensão: `selecao.corpo-livre-ampliado`, `selecao.halteres-ampliado`, `selecao.elastico-ampliado`, `selecao.item-sozinho-ampliado`, `selecao.barra-negativa` (**moderada**), `selecao.barra-negativa-iniciante` (consenso), `equipamento.caneleira`, `equipamento.mini-band` (**um estudo**), `equipamento.roda-abdominal`; todas **consenso**, salvo onde indicado, e cada uma lista estudos de EMG ou de um ensaio.
- Degrau inicial por nível (`progressao.degrau-inicial`, **consenso**): iniciante 0, intermediário 1, avançado 2.
- BFR: nunca prescrito (`equipamento.bfr`, **consenso**; `lixandrao2018` robusta para eficácia; `minniti2020`, `patterson2019` para riscos).
- Segurança de montagem e de elásticos (`seguranca.montagem`, **consenso**; `selecao.elastico-ampliado`: série de 11 casos de lesão de olho, `ng2022`).
- Atalhos de cenário e catálogo de 49 itens (`equipamento.atalhos`, `equipamento.capacidades`, `equipamento.menor-anilha`, **consenso**).

**(b) Fontes e leitura**: `schoenfeld2017b` verificado-busca; `lasevicius2018` não anotado; `lopes2019` não anotado; `kikuchi2017` texto-completo; `calatayud2015` PMID NÃO VERIFICADO; `kotarsky2018` DOI NÃO VERIFICADO; `bulgaro2026` autores NÃO VERIFICADOS; `fenwick2009` não anotado; `patterson2019` (números de segurança de BFR não lidos); `kinoshita2023`, `kinoshita2026`, `svensen2025`, `larsen2025`, `ng2022`, `maeo2024`: texto-completo; as demais fontes da biblioteca ampliada vêm de `pesquisa-v2/16` e `17`, não lidos aqui.

**(c) Pontos fracos**
- A **equivalência elástico = peso para hipertrofia é inferência**; calistenia de longo prazo em treinados e em mulheres: sem ensaio; hip thrust sem barra, búlgaro × agachamento com barra, remada × puxada para latíssimo, pullover e puxada com elástico: sem dados (`05`, lacunas).
- Faixas de peso do corpo (5–8 reps de largura, topo 20) e os degraus iniciais por nível são consenso; `schoenfeld2015carga`, `kojic2025` e `wei2023` sustentam parcialmente.
- **Até onde o peso do corpo vai para quem é forte**: o app avisa de forma sutil no fim da escada que "acima de ~30 repetições o peso do corpo rende menos", sem solução. Pausa e 1,5 repetição não têm ensaio de hipertrofia; drop set mecânico com halter leve não tem ensaio.
- Não tratado: qual é o limite prático em termos de nível (quando o corpo todo sem equipamento deixa de manter hipertrofia em quem já levanta muito); sobrecarga por carga improvisada (a pesquisa-v2 "recusou" porta, toalha, mesa, mochila, galão como carga, segundo `regras.md`); efeito do déficit de equipamento sobre a adesão.

---

## 8. Pessoas diferentes: iniciantes, mulheres, 60+, sobrepeso/obesidade, volta de pausa, dor por articulação, pressão alta, gestação

**(a) O que concluem** (`07-seguranca-triagem-niveis.md`; `regras.md`; `00-metodo.md`)
- **Iniciantes**: `nivel.classificacao` (**consenso**): <~6 meses de treino contínuo, ou >~6 meses parado, ou sem confiança na técnica; "na dúvida, classificar para baixo". Fase de aprendizado 2–3 semanas (consenso). Complexidade até 2 (`selecao.complexidade-nivel`). Estabilidade como desempate (`selecao.estabilidade`, consenso). RIR alvo 2–3/1–2; volume 6–10 (alvo 10) mas 3/4 das séries nas semanas 1–2. A razão do começo leve é passar pela fase de dano muscular, não que o iniciante cresça menos (`regras.md`, citando `pesquisa-v2/06`, não lido). `damas2016` (n = 10), `chen2012`.
- **Volta de pausa longa**: `readaptacao.*` (consenso), tema 6.
- **Dor por articulação / segurança**: triagem estilo PAR-Q+ com perguntas próprias (`seguranca.triagem`, **consenso**; `seguranca.triagem.texto`, consenso; `warburton2011`, `riebe2015`, `schwartz2021`); qualquer "sim" suspende a geração automática até a confirmação de liberação profissional; exceção: "sim" isolado na pergunta de osso/articulação/tecido mole marca a região (`seguranca.triagem.osteoarticular`, consenso) e pergunta a dor de hoje de 0 a 10 (`seguranca.dor.programa`, **consenso**: >5 tira os exercícios que carregam a região; 3–5 prefere os que poupam; se nada sobra, não monta o programa e recomenda avaliação). Sinais cardiovasculares (encerra a sessão, SAMU 192, `seguranca.alerta.cardiovascular`, consenso) e musculoesqueléticos (`seguranca.alerta.musculoesqueletico`, consenso; cauda equina). Escala de dor por série (`seguranca.dor.escala`, consenso; `smith2017` moderada em contexto supervisionado, `silbernagel2007` um estudo). Estalo sem dor não restringe (`seguranca.estalo-sem-dor`, consenso; `ijspt2023`). Sem diagnóstico (`seguranca.sem-diagnostico`, consenso; `doctify`, `confef488`).
- Regras regionais específicas: punho nas flexões (`tecnica.flexao.punho`, consenso: toalha dobrada ou pegadores, "o único estudo achado (em cadáver) não foi verificado"); mergulho exige ombro sem restrição (`selecao.mergulho`, consenso); roda abdominal sai com dor lombar (`equipamento.roda-abdominal`); nórdico só do intermediário em diante e 1ª semana com 2 séries (`selecao.nordico`, **um estudo**); ombro: equilíbrio empurrar ÷ puxar (`avaliador.empurrar-puxar`, consenso). Taxa de lesão em musculação de 0,24–1 por 1.000 h, concentradas em ombro, lombar e joelho (`keogh2017`, moderada, majoritariamente retrospectivos).
- **Gestação e doença aguda**: perguntas à parte na triagem; "sim" suspende a geração (`seguranca.triagem`). `acog2020` (verificado-busca) existe em `fontes.md` mas não é citada em `regras.md`. A OMS 2020 (`bull2020`, texto-completo) cobre gestação e pós-parto, mas o documento temático não extrai regra.
- **Mulheres, 60+, sobrepeso/obesidade, pressão alta**: **não tratados** como regras. Menções: `00-metodo.md` e `02` ("Faltam dados com mulheres, idosos e pessoas com condições de saúde"); `05` (sem estudos de calistenia em mulheres); `bosquet2013` (perda de força maior acima de 65 anos); `bickel2011`/`spiering2021` (idosos precisaram de mais séries para manter); `tomeleri2020` (ordem de exercícios em idosas); `pedrosa2023` (rosca em mulheres não treinadas); `alizadeh2020` (flexão × supino por sexo, resumo). O "sim" da triagem para doença conhecida ou pressão dispara a suspensão, não uma adaptação.
- Aspectos legais: Resolução CONFEF 488/2023 (prescrição é atribuição do profissional de Educação Física; `confef488`); 542/2024 (atendimento remoto); 436/2022 e 617/2026 não lidas; LGPD (`lgpd2018`, texto-completo em `fontes.md` como `lgpd`).

**(b) Fontes e leitura**: `warburton2011` verificado-busca (texto não lido); `riebe2015` verificado-busca (texto tentado e bloqueado, ramos do algoritmo não conferidos); `schwartz2021` não anotado; `parq2025`: `07` diz que texto literal e licença NÃO foram lidos; `regras.md` (`seguranca.triagem.texto`) diz que a licença foi lida em 05/11/2026 e exige autorização escrita para usar o texto oficial em app (pedido não feito); `aha-infarto` verificado-busca (não lida na íntegra); `aafp2015` texto-completo; `verhagen2016` não anotado; `doctify` material de educação ao paciente; `smith2017`, `silbernagel2007`, `keogh2017`, `ijspt2023`: não anotado; `santosjunior2021` verificado-busca (Crossref; resumo: 5 parâmetros e 4 níveis; pontos de corte NÃO VERIFICADOS); `acsm2009` verificado-busca; `acog2020` verificado-busca.

**(c) Pontos fracos**
- **Quase tudo em segurança é consenso/diretriz**; não há critério validado de nível, de DOMS × lesão nem lista única de sinais de alerta (as listas lombares variam muito, `verhagen2016`).
- Os limiares de dor (0–2, 3–5, >5) são mais baixos que o de reabilitação supervisionada (~5/10, `silbernagel2007`, um estudo em tendão de Aquiles) e escolhidos pelo projeto; não há diretriz para quem faz musculação sozinho com dor; NICE NG59, Lancet 2018 de lombar e Naunton 2020 de ombro não apareceram na busca.
- Os cortes de nível (6 meses, 24 meses) e de pausa (14/21/57/182 dias) são do projeto.
- Dados sobre lesão em praticantes recreativos brasileiros: não existem (`07`).
- **Sem regras para**: mulheres (ciclo, gestação em treino, pós-parto), idosos (volume, descanso, carga, risco de queda), obesidade/sobrepeso (articulações, tolerância ao decúbito, exercícios de peso do corpo), hipertensão e outras doenças crônicas (manobra de Valsalva, picos de pressão); dor por articulação com orientação específica além de ombro/punho/lombar; **ter doença crônica = parar e pedir liberação**, sem alternativa gradual.
- Triagem: texto literal do PAR-Q+ e versão atual (2023–2025) não lidos; algoritmo ACSM 2015 sem os ramos conferidos; a licença do PAR-Q+ é um ponto de dependência legal.
- Pesquisa jurídica: recomendada uma consulta jurídica antes do lançamento público; a revisão por advogado "foi dispensada pelo Gustavo em 08/11/2026" para a família e amigos (`privacidade.foto`).

---

## 9. Outros objetivos dentro da força: manter músculo em dieta, força máxima, saúde

**(a) O que concluem** (`regras.md`; `pesquisa-v2/12` não lido)
- `objetivo.pergunta` (**consenso**): "O que você quer agora?" com 4 opções; só "ficar mais forte" muda números; sem resposta vale "ganhar músculo"; nutrição e cardio prescrito ficam fora.
- **Manter músculo na dieta** (`objetivo.cutting.mesmo-programa`, **robusta**; `binmahfoz2025`, `deller2026`, `lopez2022`, `roth2023`): o programa é o mesmo; nenhum número muda por causa do déficit; "3 séries por exercício seguraram o músculo como 5 em treinados no déficit (um estudo)". `objetivo.cutting.texto` (**moderada**; `murphy2022`): no déficit o músculo cresce pouco e a força pode continuar subindo.
- **Força máxima** (`objetivo.forca.faixa-compostos`, **consenso**): os 2 primeiros compostos com carga de cada treino em 5–8 repetições (intermediário e avançado; iniciante como na hipertrofia); `acsm2026`, `schoenfeld2017b`, `lopez2021`; "a faixa e o número de exercícios são escolha do projeto". Descanso 90–120 s (iniciante), 2 min 30 s (intermediário e avançado) (`objetivo.forca.descanso`, **moderada**; `grgic2018a`, `acsm2026`). RIR 2–3 nos compostos livres, nunca até a falha sem ajudante (`objetivo.forca.seguranca`, **consenso**).
- **Saúde** (`objetivo.saude.texto`, **consenso**; `bull2020` texto-completo, `garber2011` resumo-PubMed, `momma2022` resumo-PubMed): o programa cumpre a parte de força das diretrizes; elas pedem também 150–300 min/semana de aeróbio moderado, que o app não prescreve; "Os números são das diretrizes, sem a evidência por trás lida aqui". `momma2022`: maior benefício com ~30–60 min/semana.

**(b) Fontes e leitura**: `binmahfoz2025`, `deller2026`, `lopez2022`, `roth2023`, `murphy2022`, `grgic2018a`: status não visto nos documentos lidos; `bull2020`: texto-completo (OMS 2020, inclui adultos, idosos, gestação e doenças crônicas); `garber2011`: só resumo; `momma2022`: só resumo (título e periódico não conferidos); `acsm2026`: texto-completo.

**(c) Pontos fracos**
- Força: faixa 5–8, descanso e RIR por nível são do projeto (consenso, uma exceção moderada para descanso); nenhum estudo sobre periodização de força para iniciantes ou para quem treina em casa; "força" é definida como aumento de carga nos 2 primeiros compostos, sem especificar ciclos ou testes de 1RM.
- Dieta: a regra "robusta" mistura uma meta-análise de proteção da massa magra com "um estudo" para a dose por exercício; o app não fala de proteína, déficit ou velocidade de perda (fora do escopo).
- Saúde: o app **não** cobre a parte aeróbia; a evidência por trás dos números das diretrizes não foi lida; não há regra de dose mínima de força para saúde (ex.: 2 dias/semana) com selo, apesar de `ren2024` e `garciahermoso2023` (prevalência, resumo-PubMed).
- Não tratado: objetivo de potência, resistência muscular, estética por região/simetria, recomposição, reabilitação, treino para esportes (fora do MVP segundo `CLAUDE.md`); mudar de objetivo no meio de um bloco.

---

## 10. Adesão: duração, variedade, sensação de progresso, gostar do treino

**(a) O que concluem**
- Os arquivos temáticos 01 a 07 **tratam pouco** de adesão. `06`, conclusão 9: não há ensaio mostrando que sessões curtas aumentam a adesão medida; só há preferência declarada em idosos por sessões curtas e frequentes (`plosone-preferencia`, um resumo de congresso de 2023, chave a renomear). `06`: "Perguntar o tempo real disponível e montar o programa para caber nele é inferência sensata, não resultado testado." Não há ensaio comparando adesão a 30 × 60 min.
- Regras que se dizem ancoradas em adesão (todas **consenso**): `acompanhamento.semana` (treinos feitos × planejados, séries efetivas por músculo contra meta, 4 estados em cores neutras, "X das últimas 8 semanas com treino", nunca uma sequência que zera; `michie2009`, `harkin2016`, `krukowski2024`: meta-análises/revisões em que o autorregistro com meta e retorno explica mais a diferença; todas resumo-PubMed); `acompanhamento.mensagens` (sem culpa: fato + próximo passo; 3 de 4 semanas abaixo do planejado oferece programa com menos dias; `michie2009`, `momma2022`, `ren2024`, `garciahermoso2023`); `acompanhamento.evolucao` (melhor série de cada sessão, marcas "subiu a carga" e "recorde"; `halperin2022`, `mayhew1995`); `registro.treino-feito` (desfazer erro); `treino.leitura` ("Como ler o seu treino", 5 linhas; "não há estudo achado sobre o efeito de explicar os termos na adesão"); `selecao.variacoes-equivalentes` (variar "melhora um pouco o prazer e a motivação"; `bazvalle2019`, `sylvester2016`); `selecao.preferencia` ("Prefiro este", consenso); `tempo.calibracao` (**consenso**; ajuste pela medição da própria pessoa).
- Fonte de mercado/observacional em `fontes.md`: `conti2026` (coorte de 389.481 usuários de um app: permanência em 12 meses e peso da regularidade nos primeiros 28 dias; resumo-PubMed). Não aparece citada em `regras.md`.

**(b) Fontes e leitura**: `michie2009`, `harkin2016`, `krukowski2024`, `momma2022`, `ren2024`, `garciahermoso2023`, `conti2026`: resumo-PubMed, títulos/periódicos às vezes não conferidos; `plosone-preferencia`: resumo de congresso, verificado-busca, chave a renomear; `bazvalle2019`, `sylvester2016`: status não visto.

**(c) Pontos fracos**
- **Não há estudo de adesão para musculação recreativa** que apoie sessões curtas, variação, número de dias, escolha de divisão, mensagens sem culpa ou a sensação de progresso; a ligação é por analogia com programas de atividade física em geral.
- Não tratado nos documentos lidos: gostar do treino/prazer como determinante, nível de dificuldade percebida, retenção em 12 meses (só `conti2026`, sem regra), pausa de motivação, formato de lembretes, social/comunidade (fora de escopo), custo de equipamento, e como a duração de sessão afeta o abandono.
- O apoio estatístico para "X das últimas 8 semanas" e para as mensagens é de **meta-análises de resumo**, não de estudos de musculação.
- `registro.treino-feito` e `treino.leitura` admitem explicitamente que o efeito sobre adesão não tem estudo.

---

## 11. Diretrizes e posicionamentos (ACSM, NSCA, OMS, etc.)

- `acsm2026` (Currier et al., Med Sci Sports Exerc 58(4); ACSM Position Stand sobre prescrição de treino de força para hipertrofia, "overview of reviews"): **texto-completo** (PMC12965823, lido 05/11/2026, tabelas 1 a 6; apêndices não). Usado em `frequencia.musculo`, `ordem.sessao`, `objetivo.forca.*`, `tempo.exercicios-por-sessao`. Confirma 10 ou mais séries/semana, falha não necessária, 30–100% de 1RM equivalente, ordem irrelevante, periodização neutra; "perto da falha ou 2–3 RIR" sem evidência de RIR exato; platô por volta de 18–20 séries/semana; ≥2 séries por exercício; máquina × livre "dados insuficientes" para hipertrofia. `01` e `02` ainda descrevem esse documento como não lido (desatualizado).
- `acsm2009` (Ratamess et al., progression models): **verificado-busca**; faixas de séries, repetições e descanso por nível e o incremento "2–10%" não conferidos. Usado em `nivel.classificacao` (frequência 2–3, 3–4, 4–5 dias) e `treino.leitura`.
- `garber2011` (ACSM, quantidade e qualidade do exercício): **resumo-PubMed** (usado em `objetivo.saude.texto`).
- `nsca2008` (Baechle, cap. 15, 3ª ed.): **verificado-busca**, livro não acessado; fonte secundária para "2 sessões seguidas" e incrementos 1–2,5 kg (superiores) e 2,5–5 kg (inferiores). Posicionamentos NSCA formais: `00-metodo.md` os cita na hierarquia, mas `regras.md` e os arquivos 01 a 07 só citam o manual.
- `bull2020` (OMS 2020): **texto-completo** (artigo no PMC e PDF da OMS pela API do IRIS; adultos, idosos, gestação, doenças crônicas). Usado em `objetivo.saude.texto`.
- `riebe2015` (ACSM 2015, triagem): **verificado-busca** (texto bloqueado). `warburton2011` (PAR-Q+): **verificado-busca**; `bredin2013` e `ms2021` (triagem): texto-completo em `fontes.md` (conteúdo não lido por mim); `parq2025`: ver tema 8 (conflito entre `07` e `regras.md` sobre leitura da licença).
- `acog2020` (gestação): **verificado-busca**, não usado em regra. `aha-infarto` (página da AHA): verificado-busca, página não lida na íntegra.
- ISSN, NSCA position stands e outras diretrizes: **não tratados** nos documentos lidos (`00-metodo.md` apenas cita a hierarquia).
- Política (`00-metodo.md`): posicionamentos são "úteis como referência, mas misturam evidência e opinião e às vezes relatam a literatura de forma seletiva"; "Diretrizes com texto bloqueado não servem como fonte de números até a leitura do original".
- **Pontos fracos**: nenhuma diretriz foi lida inteiramente além de ACSM 2026 e OMS 2020; ACSM 2009 e NSCA 2008, que sustentam incrementos, frequências por nível e "2 por 2", só em fontes secundárias; `acsm2026` é uma "overview of reviews" de adultos saudáveis, que o próprio texto não dá evidência para RIR exato; PAR-Q+ com licença restritiva; Resoluções CONFEF 436/2022 e 617/2026 não lidas; guias da ANPD sobre dados de saúde em apps não consultados.

---

## 12. Como bons treinadores montam programas (consenso de treinadores)

- **Usado**: `iversen2021` (revisão narrativa, Sports Med, **texto-completo**; recomenda ≥1 agachar ou leg press, 1 puxar e 1 empurrar, ≥4 séries por músculo/semana, 6–15 RM ou 15–40 repetições até a falha segundo `fontes.md`), citada em `tempo.aquecimento`, `tempo.corte`, `tempo.sobra`, `tempo.sobra-series`, `selecao.multi-mono`, `volume.prioridade.foco-primeiro`. Sustenta "superséries, drop sets e rest-pause cortam o tempo pela metade com volume semelhante" (`06`, conclusão 6; selo consenso).
- `bell2023` (consenso Delphi internacional sobre deload, **verificado-busca**) e `rogerson2024` (survey transversal com 246 atletas: deloads a cada ~5,6 semanas, ~6,4 dias; verificado-busca): base do `deload.semana-leve`.
- `nsca2008` (manual de certificação; ver tema 11): "2 por 2" e incrementos.
- `consenso-projeto`: usada em dezenas de linhas (por exemplo, margem de 10%, transição de 60–120 s, redução de 5–10%); `fontes.md` marca como **NÃO VERIFICADO por definição** (não há fonte primária).
- `tempo.exercicios-por-sessao`: "5 a 7 exercícios por treino é prática de treinadores (pesquisa-v2/14, 06/11/2026)", mas essa pesquisa não foi lida aqui; a regra é **consenso** e cita também `iversen2024`, `bazvalle2019`, `tomeleri2020`, `acsm2026`.
- **Pontos fracos**: nenhuma fonte documenta como treinadores individualizam por nível, lesões, preferências, tempo; "consenso" em `00-metodo.md` = prática corrente sem ensaio (pesquisas de opinião, Delphi, manuais, raciocínio biomecânico do projeto), e 113 de 163 regras são exatamente isso, sem fonte de treinadores citada: são inferências do projeto. Não tratado: entrevistas ou Delphi sobre divisão de treino, escolha de exercícios para iniciantes, progressão de carga em academias reais, ajuste de sessão por dia ruim.

---

## 13. Críticas a treinos gerados por aplicativo

- **Não tratado** em `00-metodo.md`, `01` a `07` e `regras.md`. Nenhum desses documentos reúne evidência ou crítica sobre treinos gerados por aplicativos, nem tem fonte com esse tema. (O `09-decisoes-m3.md` menciona "aplicativo" na minha busca textual; não o li integralmente por estar fora do escopo.)
- O que há de relacionado: a decisão de arquitetura (gerador determinístico, não texto livre de um modelo; `CLAUDE.md`), a política de selos e o texto "Consenso de treinadores (sem estudo que teste isso)" (`00-metodo.md`) respondem indiretamente à crítica de que apps não explicam a evidência; `avaliador.gravidade` e `seguranca.sem-diagnostico` tratam de limites do app. `conti2026` (adesão em usuários de app) é a única fonte observacional sobre usuários de app em `fontes.md`.

---

## 14. O que aplicativos de referência fazem

- **Não tratado** nos documentos lidos, exceto por uma fonte: `hevy-recursos` (`fontes.md`): página de recursos do app Hevy, **texto-completo** lida em 06/11/2026 pela "frente C", marcada como `[mercado]`: "descreve o que um app faz, não é evidência". Não aparece citada em nenhuma regra de `regras.md`.
- Outros apps (Fitbod, JEFIT, Strong, entre outros) não são citados nos documentos lidos (busca textual em `fontes.md` só encontrou Hevy). Nenhum documento compara geradores de programa comerciais.
- Pontos fracos: o projeto não registra de que modo apps de referência calibram carga, tratam dor, progridem elástico ou peso do corpo, nem a retenção real (apenas `conti2026`).

---

## Fontes de maior risco (resumo por status de leitura)

- **Só resumo, mas sustentam regra de selo alto**: `schoenfeld2017a`, `pelland2026` (preprint lido, versão final não), `plotkin2022` (única base da dupla progressão), `singer2024` (descanso), `halperin2022` (verificado-busca, base de `rir.leitura`, calibração e `progressao.criterio-degrau`).
- **Preprint não revisado**: `remmert2025` (teto de 10 séries por sessão e frequência mínima).
- **Livro/manual não acessado**: `nsca2008`.
- **NÃO VERIFICADOS segundo os arquivos temáticos**: PMID de `schoenfeld2017a` (hoje há PMID 27433992 em `fontes.md`), DOI/PMID de `schoenfeld2019a`, PMIDs de `refalo2023`, `grgic2022`, `robinson2024`, `zourdos2016`, `ogasawara2013`, `psilander2019`, `blocquiaux2020`, `hyldahl2017`, `pallares2021`, `schoenfeld2020`, `calatayud2015`, `zhang2025`, `sodal2023`, `bickel2011`; autores/título/DOI de `kassiano2025`, `refalo2024`, `bulgaro2026`; pontos de corte de `santosjunior2021`; periódico de `gentil2015`; leitura do texto literal do PAR-Q+; Resoluções CONFEF 436/2022 e 617/2026; fonte de `bradshaw2026`, `chien2026`, `pancar2026` etc. (não visto).


---

## Lista de regras por selo

Todas as 163 regras de `docs/pesquisa/regras.md`, na ordem do arquivo. A coluna "resumo" e a coluna "valor" estão truncadas por limite de tamanho (o texto completo está em `regras.md`). Contagem: consenso 113, moderada 28, um estudo 15, robusta 7.

| # | id | resumo (truncado) | valor (iniciante / intermediário / avançado, truncado) | selo | fontes |
|---|---|---|---|---|---|
| 1 | `volume.semanal.dose-resposta` | Séries semanais por músculo: | ≥ 10 > < 10 | robusta | schoenfeld2017a, pelland2026, bazvalle2022, schoenfeld2019b |
| 2 | `volume.semanal.minimo` | Mínimo semanal da faixa do nível (músculos prioritários) | 6 / 10 / 12 | consenso | schoenfeld2017a, bazvalle2022, krieger2010 |
| 3 | `volume.semanal.alvo` | Alvo semanal padrão dos músculos prioritários. | 10 / 12 / 14 | consenso | schoenfeld2017a, pelland2026, bazvalle2022, bickel2011, spiering2021 |
| 4 | `volume.prioridade.competicao` | Quando há 2 grupos de foco ou mais e algum músculo prioritário fica abaixo da meta, um aviso por programa diz quais, quanto… | aviso | consenso | consenso-projeto, remmert2025, pelland2026 |
| 5 | `volume.prioridade.foco-primeiro` | O foco usa o tempo primeiro (R5d, 08/11/2026; | sobra: o foco até 10; os outros até 6 abaixo… / sobra: o foco até 16; os outros até 6 abaixo… / sobra: o foco até 20; os outros até 6 abaixo… | consenso | consenso-projeto, schoenfeld2017a, pelland2026, iversen2021, kolber2010, green2018 |
| 6 | `volume.prioridade.segundo-exercicio` | O 2º exercício do foco (R5d, 08/11/2026; | 1 exercício a mais por músculo do foco abaixo da meta | consenso | fonseca2014, costa2021, zabaletakorta2021, kassiano2025var, kassiano2022, remmert2025 |
| 7 | `volume.prioridade.ate-dois` | Escolha até 2 grupos de foco (R5d, 08/11/2026; | até 2 (pernas = 3, braços = 2), sem bloquear | consenso | consenso-projeto, remmert2025, pelland2026 |
| 8 | `volume.semanal.maximo` | Máximo semanal padrão do nível | 10 / 16 / 20 | consenso | bazvalle2022, aube2022, rantila2026 |
| 9 | `volume.semanal.teto-padrao` | Teto absoluto; | 20; nunca acima / 20; nunca acima / 20; acima só por opção explícita do usuário | moderada | bazvalle2022, aube2022, rantila2026, schoenfeld2019b |
| 10 | `volume.semanal.minimo-eficaz` | Piso para músculos não prioritários (ganho menor, mas relevante) | 4–6 | moderada | schoenfeld2017a |
| 11 | `volume.semanal.abdomen` | Meta semanal do abdômen não prioritário: | 4 | consenso | consenso-projeto, schoenfeld2017a |
| 12 | `volume.manutencao.piso` | Piso do modo manutenção, com carga mantida; | 1–3 séries pesadas por músculo por semana | moderada | bickel2011, spiering2021 |
| 13 | `volume.sessao.teto` | Teto de séries fracionadas por músculo numa sessão. | ≤ 10, contando as indiretas | um estudo | remmert2025 |
| 14 | `volume.equilibrio-coxa` | Equilíbrio da coxa (R5-CL, 07/11/2026; | 0,5–2; ≥ 1 exercício direto de posteriores | consenso | green2018, kubo2019, maeo2021 |
| 15 | `volume.serie-indireta.peso` | Peso da série indireta (sinergista, ex.: | 0,5 | um estudo | pelland2026, remmert2025, mannarino2021 |
| 16 | `volume.series-por-exercicio` | Séries de trabalho por exercício numa sessão; | 2–4 | moderada | krieger2010, remmert2025 |
| 17 | `frequencia.efeito-hipertrofia` | Com volume semanal igual, a frequência quase não muda a hipertrofia; | neutra | robusta | schoenfeld2019a, pelland2026, schoenfeld2016a |
| 18 | `frequencia.musculo` | Frequência por músculo: | mínimo ceil(volume/10); 1x só com volume ≤ 10 | consenso | remmert2025, acsm2026 |
| 19 | `divisao.equivalencia` | Com o mesmo volume semanal, a divisão (corpo todo, superior/inferior, empurrar/puxar/pernas, clássica) não muda a hipertrofia; | equivalentes | robusta | ramoscampo2024, schoenfeld2019a, pelland2026 |
| 20 | `divisao.frequencia-minima` | Frequência mínima de cada músculo na divisão, pelo teto de ~10 séries por sessão | ceil(meta semanal ÷ 10) | um estudo | remmert2025 |
| 21 | `divisao.recomendacao` | Opções oferecidas por número de dias; | 2: corpo todo A/B; 3: corpo todo A/B/C ou superior/inferior + corpo todo; 4:… | consenso | ramoscampo2024, consenso-projeto |
| 22 | `divisao.seis-dias` | Dias de treino por semana aceitos pelo app | 2 a 6 | consenso | consenso-projeto |
| 23 | `divisao.classica` | Divisão clássica (ABC, ABCD, ABCDE: | 3 a 5 dias; só com meta ≤ 10 | consenso | remmert2025, consenso-projeto |
| 24 | `reps.equivalencia-cargas` | Com a série perto da falha, cargas de ~6 a ~30 repetições dão hipertrofia parecida; | 6–30 reps | robusta | schoenfeld2017b, lopez2021, lasevicius2018 |
| 25 | `reps.faixa.por-tipo` | Faixa de repetições padrão por tipo de exercício | composto 6–10 ou 8–12; isolador 10–20 | consenso | schoenfeld2017b, lopez2021 |
| 26 | `reps.faixa.degrau` | Faixas dos exercícios de peso do corpo e de elástico: | flexão 8–15; agachamento 12–20; afundo 10–16; búlgaro 8–15; ponte e abdominal 12–20;… | consenso | schoenfeld2017b, lopez2021, lasevicius2022, consenso-projeto |
| 27 | `reps.teto.carga-limitada` | Teto de repetições quando a carga disponível é limitada; | até 30 | consenso | lasevicius2018, schoenfeld2021 |
| 28 | `rir.falha.nao-necessaria` | Ir à falha não é exigido; | não exigir falha | robusta | refalo2023, grgic2022 |
| 29 | `rir.alvo` | RIR alvo fora da readaptação e da fase de aprendizado | composto 2–3; isolador 1–2 / composto 1–2; isolador 0–1 / composto 1–2; isolador 0–1 | consenso | robinson2024, refalo2023, grgic2022 |
| 30 | `rir.serie-efetiva` | Série que conta como efetiva no volume | RIR ≤ 4; RIR ≥ 5 e aquecimento não contam | consenso | robinson2024 |
| 31 | `rir.carga-baixa` | Séries com 15 repetições ou mais pedem RIR mais baixo, porque com carga baixa a proximidade da falha pesa mais. | RIR 1–2 a partir da 3ª semana (nas semanas… / RIR 0–2 / RIR 0–2 | um estudo | lasevicius2022, robinson2024 |
| 32 | `rir.leitura` | Leitura do RIR relatado: | RIR relatado ±1 (2 ≈ 2–3); acima de ~12 repetições, menos confiável (a calibração usa… | moderada | halperin2022, zourdos2021, remmert2023, bermudez2025 |
| 33 | `rir.calibracao` | Calibração do RIR: | 1x por semana a partir da semana 3 | consenso | halperin2022, zourdos2016 |
| 34 | `descanso.piso` | Descanso mínimo entre séries: | > 60 s | moderada | singer2024, grgic2017a |
| 35 | `descanso.por-tipo` | Descanso padrão por tipo de exercício; | composto 90–120 s (padrão 105 s; 2–3 min como opção); isolador 60–90 s (padrão 75 s) | moderada | singer2024, schoenfeld2016b |
| 36 | `cadencia.repeticao` | Duração da repetição: | descida controlada ~2–3 s, sem embalo; nunca > 10 s por repetição | moderada | schoenfeld2015, lacerda2021 |
| 37 | `progressao.subir` | Dupla progressão: | todas as séries no topo da faixa com o RIR alvo e com a carga da 1ª série ou mais (série… | consenso | plotkin2022, nsca2008 |
| 38 | `progressao.manter` | Dupla progressão: | repetições dentro da faixa → manter a carga e buscar +1 repetição | consenso | plotkin2022 |
| 39 | `progressao.reduzir` | Dupla progressão: | abaixo do mínimo da faixa em 2 sessões seguidas, ou dor → −5 a −10% | consenso | plotkin2022, consenso-projeto |
| 40 | `progressao.incremento.halteres` | Incremento com halteres e kettlebell | fixos: próximo par do inventário; montáveis: menor combinação de anilhas disponível;… | consenso | nsca2008 |
| 41 | `progressao.incremento.polia` | Incremento na polia e nas máquinas com torre de placas (registrar o número da placa, não kg) | +1 placa | consenso | consenso-projeto |
| 42 | `progressao.incremento.maquina-anilha` | Máquinas de anilha (leg press, hack, smith, panturrilha sentada): | kg por lado; subir o menor par de anilhas (padrão 2 kg [opinião] até a pessoa informar);… | consenso | consenso-projeto |
| 43 | `progressao.incremento.assistido` | Graviton (barra e mergulho assistidos): | registrar a placa de contrapeso; progredir = tirar 1 placa; sem placa, passar para a… | consenso | consenso-projeto |
| 44 | `progressao.incremento.peso-corporal` | Progressão sem kg confiável (peso do corpo e elástico). | genérica: repetições → descida de 3 s ou pausa embaixo → variação mais difícil → variação… | consenso | lopes2019, schoenfeld2015, consenso-projeto |
| 45 | `progressao.escada-por-exercicio` | Escada própria de cada exercício de peso do corpo (dados em `src/domain/progressao/escadas.json`); | ver `escadas.json` e `pesquisa-v2/10`, tabela 5.3 | consenso | schoenfeld2015, kojic2025, wei2023, kassiano2025, consenso-projeto |
| 46 | `progressao.negativa-para-barra` | Da barra só na descida para a barra (R5d, 08/11/2026): | sugestão de passar para a barra fixa | consenso | vigouroux2024, johnson2009, consenso-projeto |
| 47 | `progressao.escada-elastico` | Elástico: | intensidade 1 a N, 3 degraus cada | consenso | lopes2019, harper2025, consenso-projeto |
| 48 | `progressao.degrau-inicial` | O 1º degrau da escada pelo nível (R5d, 08/11/2026; | degrau 0 (o exercício como no guia) / degrau 1 (no elástico: mais esticado) / degrau 2 (no elástico: a intensidade do meio… | consenso | schoenfeld2015, kojic2025, lopes2019, consenso-projeto |
| 49 | `progressao.criterio-degrau` | No peso do corpo e no elástico, o degrau sobe quando a 1ª série chega ao topo da faixa e as outras ficam a no máximo 2 repetições… | 1ª série no topo, as outras ≥ topo − 2, 2 sessões | consenso | halperin2022, consenso-projeto |
| 50 | `equipamento.fim-da-escada` | Fim da escada: | texto na sugestão do exercício | consenso | lasevicius2018, lasevicius2022, schoenfeld2015carga, consenso-projeto |
| 51 | `progressao.salto-grande` | Salto relativo de carga acima de ~10% (revista na auditoria do treino, 02/11/2026: | exigir 1–2 repetições acima do topo antes de subir; se depois de subir a 1ª série ficar… | consenso | plotkin2022, nsca2008 |
| 52 | `progressao.carga-leve` | Carga leve demais (revista na auditoria do treino, 02/11/2026) | 1ª série passa do topo por ≥ 2 repetições no RIR alvo → subir 2 incrementos se o salto… | consenso | nsca2008, consenso-projeto |
| 53 | `progressao.calibracao` | Calibração da carga, série a série (R1b; | R = repetições + reserva; A = meio da faixa + meio do RIR; perto (A ± 2) mantém; pesada… | consenso | halperin2022, mayhew1995, nuzzo2024b, glass2004, consenso-projeto |
| 54 | `progressao.troca-equivalente` | Troca entre equivalentes da mesma função (outro local, alternativa ou preferência): | leva a semana, a fase (aprendizado ou volta), as séries, o RIR e o descanso da vaga, o… | moderada | haugen2023, heidel2022, saeterbakken2025, rutherford1986, saeterbakken2011, langford2007, cotterman2005, rossi2018, zourdos2015, nascimento2013 |
| 55 | `progressao.criterios-invalidos` | O que nunca conta para progredir | repetições com amplitude encurtada ou embalo não contam; dor muscular tardia (DOMS) nunca… | consenso | damas2016, consenso-projeto |
| 56 | `progressao.estagnacao` | Estagnação = 3 sessões seguidas sem melhora de repetições nem de carga num exercício. | escada: 1) faixa mais larga; 2) −10% e reconstruir; 3) semana leve se ≥ 2 exercícios… | consenso | rogerson2024, moesgaard2022 |
| 57 | `readaptacao.gatilho` | Quando aplicar a readaptação após pausa sem treinar dita no cadastro (durante o uso, vale `readaptacao.durante-uso`); | < 2 semanas: retomar normal, com a mesma carga; 2 a < 3 semanas: 1ª sessão de cada dia… | consenso | ogasawara2011, ogasawara2013, hwang2017, chen2012 |
| 58 | `readaptacao.durante-uso` | Pausa detectada durante o uso (R2; | até 13 dias: normal, com a mesma carga; 14–20: na 1ª sessão de cada dia do programa, RIR… | consenso | hwang2017, ogasawara2011, ogasawara2013, chen2012, bosquet2013, consenso-projeto |
| 59 | `readaptacao.semana1` | Semana 1 após pausa ≥ 3 semanas (revista no R2: | ~50–60% das séries; RIR 3–4; carga −10% (pausa de 3 a 8 semanas) ou −15% (8 a 26 semanas)… | consenso | chen2012, damas2016, bosquet2013 |
| 60 | `readaptacao.semana2` | Semana 2 após pausa ≥ 3 semanas | ~75% das séries; RIR 2–3 | consenso | chen2012, consenso-projeto |
| 61 | `readaptacao.semana3` | Semana 3 após pausa ≥ 3 semanas | volume e RIR normais; dupla progressão normal | consenso | ogasawara2013, consenso-projeto |
| 62 | `iniciante.fase-aprendizado` | Fase de aprendizado do iniciante | 2–3 semanas com RIR 3–4, volume no mínimo da… / não se aplica (usa `readaptacao.*` se houver… / não se aplica (usa `readaptacao.*` se houver… | consenso | damas2016, chen2012 |
| 63 | `deload.semana-leve` | Semana leve sugerida, manual e opcional (nunca automática); | mesma frequência, ~50% das séries, RIR 3–4, carga mantida, por 7 dias a partir do aceite;… | consenso | bell2023, rogerson2024, coleman2024, pancar2026 |
| 64 | `acompanhamento.semana` | "A sua semana" (R2; | treinos feitos × planejados (segunda a domingo, em qualquer local); séries efetivas por… | consenso | michie2009, harkin2016, krukowski2024, bickel2011 |
| 65 | `acompanhamento.mensagens` | Mensagens do acompanhamento sem culpa (R2; | semana completa: "4 de 4"; menos, com dias pela frente: "2 de 4 treinos. Se der, o treino… | consenso | michie2009, momma2022, ren2024, garciahermoso2023 |
| 66 | `acompanhamento.evolucao` | Evolução por exercício (R2; | carga × repetições (e o RIR) da melhor série de cada sessão; marcas "subiu a carga" e… | consenso | halperin2022, mayhew1995, consenso-projeto |
| 67 | `selecao.equivalencia-equipamento` | Máquina, peso livre, polia e halter, e unilateral ou bilateral, são substitutos equivalentes para hipertrofia se trabalham o… | equivalentes | moderada | haugen2023, kassiano2025 |
| 68 | `selecao.amplitude` | Amplitude completa e controlada, dentro da faixa sem dor; | amplitude completa | moderada | pallares2021, kassiano2023a, wolf2023 |
| 69 | `selecao.comprimento-longo` | Carga com o músculo alongado: | pela função da vaga | moderada | wolf2023, kassiano2023a, wolf2025 |
| 70 | `selecao.estabilidade` | Exercícios estáveis e apoiados (máquina, banco, polia): | desempate dentro do nível da função / não se aplica / não se aplica | consenso | haugen2023 |
| 71 | `selecao.variacao` | Manter os exercícios no bloco (4–8 semanas); | manter no bloco; variar dentro da função | moderada | kassiano2022, fonseca2014 |
| 72 | `selecao.variacoes-equivalentes` | Variações equivalentes entram na biblioteca mesmo sem abrir vaga nova (R5-CL, 07/11/2026; | variações no mesmo nível da função | moderada | bazvalle2019, kassiano2022, sylvester2016 |
| 73 | `selecao.corpo-livre-ampliado` | Biblioteca ampliada, lote de corpo livre (R5-CL; | 5 de 6 (a flexão com os pés elevados pela… / os 6 / os 6 | consenso | ebben2011, kikuchi2017, maeo2023, brandao2020, rabello2024, kinoshita2023, kassiano2023b, nakamura2025, escamilla2006b |
| 74 | `selecao.halteres-ampliado` | Biblioteca ampliada, lote de halteres e banco (R5-CL; | os 9 | consenso | saeterbakken2013, larsen2025, maeo2023, brandao2020, zhu2025, kobayashi2026, chaves2020, kassiano2025 |
| 75 | `selecao.elastico-ampliado` | Biblioteca ampliada, lote de elástico (R5-CL; | os 9 | consenso | lopes2019, iversen2017, fukunaga2022, macadam2015, selkowitz2013, andersen2010, ng2022 |
| 76 | `selecao.barra-negativa` | Barra fixa só na descida (R5-CL; | último nível do puxar vertical | moderada | schoenfeld2017, dasilva2025, vigouroux2024, johnson2009, shabbir2026 |
| 77 | `selecao.barra-negativa-iniciante` | A barra só na descida antes da barra para o iniciante (R5d, 08/11/2026; | barra só na descida no lugar da barra fixa / não se aplica (a barra fixa, como antes) / não se aplica (a barra fixa, como antes) | consenso | johnson2009, schoenfeld2017, dasilva2025, vigouroux2024, shabbir2026 |
| 78 | `selecao.item-sozinho-ampliado` | Biblioteca ampliada, lote de um equipamento só (R5-CL; | os 8 | consenso | schoenfeld2017b, svensen2025, selkowitz2013, kinoshita2026, yasuda2016, macadam2015, youdas2013, kassiano2025, youdas2021 |
| 79 | `selecao.complementos` | 2 exercícios complementares por semana para quadríceps, isquiotibiais, tríceps e peitoral, quando o equipamento permitir… | 2 por músculo listado | moderada | fonseca2014, maeo2021, maeo2023, chaves2020 |
| 80 | `selecao.peitoral-inclinado` | Incluir uma variação inclinada para a porção superior do peitoral (razoável, não obrigatória): | se houver banco regulável; senão, 2º empurrar | um estudo | chaves2020, rodriguezridao2020, barbalho2021, kikuchi2017 |
| 81 | `selecao.triceps-acima-cabeca` | Pelo menos 1 exercício de tríceps com o ombro flexionado (braço acima da cabeça) por semana. | ≥ 1 | um estudo | maeo2023, brandao2020 |
| 82 | `selecao.flexora-sentada` | Flexão de joelho sentada preferida à deitada, quando houver as duas | preferir sentada | um estudo | maeo2021 |
| 83 | `selecao.panturrilha-alongada` | Panturrilha com ênfase no alongamento (calcanhar abaixo do apoio, pausa embaixo), de preferência em pé. | ênfase no alongamento | um estudo | kassiano2023b, nakamura2025 |
| 84 | `selecao.multi-mono` | Base em multiarticulares; | multi como base | moderada | gentil2015, iversen2021, rosa2022, mannarino2021, brandao2020, gentil2013 |
| 85 | `selecao.funcao-da-vaga` | A vaga do modelo de dia pede uma função (padrão de movimento e, quando há evidência, a posição alongada), nunca um equipamento; | por função; um afundo por dia, havendo outra opção | consenso | haugen2023, hernandezbelmonte2023, consenso-projeto |
| 86 | `selecao.dia-sem-principal` | Dia que perdeu vagas por causa da dor, ou que ficaria só com core (abdominal) (R1) | vagas que a dor esvaziou recebem exercícios possíveis (fora o core) dos outros músculos… | consenso | consenso-projeto |
| 87 | `selecao.vaga-sem-equipamento` | Vaga sem exercício possível com o equipamento (sessão de qualidade dos treinos, decisão do Gustavo em 06/11/2026): | 1 por vaga vazia, dentro dos exercícios que cabem nos minutos | consenso | kassiano2022, fonseca2014, costa2021, zabaletakorta2021, maeo2024, kataoka2026, kolber2017 |
| 88 | `selecao.preferencia` | "Prefiro este" entre equivalentes da mesma função (R1b; | entra no desempate depois da dor de 3 a 5, da estabilidade (só iniciante), da carga… | consenso | consenso-projeto |
| 89 | `local.treino-do-dia` | Treino do dia num local que não é o do programa (R1b; | cada vaga cujo exercício não é possível ali troca pelo equivalente possível da mesma… | consenso | consenso-projeto |
| 90 | `selecao.alongado` | Quando há opção com o músculo mais alongado e evidência para aquele músculo, ela vem primeiro na função | tríceps acima da cabeça; flexora sentada; panturrilha em pé; extensora para o reto femoral | moderada | maeo2023, maeo2021, kinoshita2023, kinoshita2026, pedrosa2022 |
| 91 | `selecao.exercicios-por-musculo` | Exercícios diferentes por músculo na semana. | grandes (peito, costas, quadríceps, posteriores, glúteos): 2, de funções complementares;… | consenso | kassiano2022, morin2025, kassiano2025var, fonseca2014, costa2021, zabaletakorta2021, maeo2024 |
| 92 | `selecao.isolador-obrigatorio` | Quando o equipamento permite, entra o isolador que cobre o que os multiarticulares não cobrem; | extensora (reto femoral; sem a máquina, com caneleira ou com elástico, no lado curto do… | moderada | kinoshita2026, maeo2023, kinoshita2023, kubo2019, kassiano2026, zabaletakorta2021 |
| 93 | `selecao.equivalencia` | Exercícios da mesma função e do mesmo músculo são alternativas entre si (aparelho ocupado, dor, preferência, outro local); | alternativas da mesma função, de outro equipamento primeiro; se faltarem, do mesmo músculo | moderada | haugen2023, hernandezbelmonte2023, kassiano2025 |
| 94 | `selecao.manter-no-bloco` | Mantém os exercícios por 4–8 semanas (o programa só muda quando a pessoa pede); | 4–8 semanas | moderada | kassiano2022 |
| 95 | `selecao.gluteo` | Ordem das funções para glúteos; | agachar profundo ou afundo → extensão de quadril (hip thrust, glúteo na máquina, ponte,… | um estudo | plotkin2023, kubo2019, attarieh2026 |
| 96 | `selecao.crucifixo-complemento` | Crucifixo ou voador (peito alongado) como complemento do empurrar, não como substituto. | complemento | um estudo | pinto2025, varovic2025, barbalho2021 |
| 97 | `selecao.mergulho` | Mergulho nas paralelas: | fora (complexidade acima do nível) / nível 2; só com o ombro sem restrição / nível 2; só com o ombro sem restrição | consenso | mckenzie2022 |
| 98 | `selecao.aducao-complemento` | Adução na máquina ou, sem ela, com caneleira deitado de lado (`equipamento.caneleira`, desde 04/11/2026) ou, sem nada, deitado de… | só quando pernas ou glúteos são prioridade e há tempo; sai primeiro nos cortes; nunca… | consenso | consenso-projeto, kubo2019 |
| 99 | `selecao.abdomen-prioridade` | Com o abdômen como prioridade, os dias que não têm vaga de abdômen (superior, empurrar, pernas B) ganham uma, como complemento; | complemento | consenso | consenso-projeto |
| 100 | `selecao.complexidade-nivel` | Complexidade do exercício até o nível (R5b, 09/11/2026: | até 2 / até 3 / até 3 | consenso | haugen2023, mckenzie2022, coratella2025, behan2023 |
| 101 | `avaliador.gravidade` | O avaliador de programas (R5b, 09/11/2026; | idem | consenso | consenso-projeto |
| 102 | `avaliador.empurrar-puxar` | Equilíbrio do ombro (R5b, 09/11/2026; | ≤ 1,5 | consenso | kolber2010, kolber2014, kolber2017 |
| 103 | `ordem.sessao` | Ordenação determinística dos exercícios da sessão (a ordem não muda a hipertrofia). | multiarticular → prioridade do usuário → ordem do modelo de divisão (que segue a… | moderada | nunes2021, simao2012, acsm2026, tomeleri2020, avelar2019, nunes2019 |
| 104 | `equipamento.escada-carga-leve` | Ordem fixa quando o halter ficou leve. | 1) repetições até ~30; 2) unilateral ou variação mais difícil; 3) excêntrica de 3–4 s (≤… | consenso | schoenfeld2017b, schoenfeld2015, kassiano2025 |
| 105 | `equipamento.bfr` | Restrição de fluxo sanguíneo (BFR): | nunca prescrever | consenso | lixandrao2018, minniti2020, patterson2019 |
| 106 | `equipamento.capacidades` | O gerador trata o equipamento por capacidade: | 49 itens (pesquisa-v2/08, seção 1; caneleiras, mini-band e roda abdominal desde o… | consenso | haugen2023, hernandezbelmonte2023, consenso-projeto |
| 107 | `equipamento.caneleira` | Caneleiras de peso (item novo, com o kg de cada uma; | extensão de joelho sentado, abdução e adução deitado de lado; na vaga da extensora,… | consenso | chien2022, schoenfeld2017b, consenso-projeto |
| 108 | `equipamento.mini-band` | Mini-band (elástico curto em laço; | abdução sentado com a mini-band; a escada pelas intensidades da mini-band | um estudo | attarieh2026 |
| 109 | `equipamento.roda-abdominal` | Roda abdominal (item novo, catálogo completo, 04/11/2026): | não entra / alternativa na vaga de abdômen; sai com dor… / alternativa na vaga de abdômen; sai com dor… | consenso | consenso-projeto |
| 110 | `equipamento.atalhos` | Atalhos de cenário na tela de equipamento (pesquisa-v2/08, seção 3): | nenhum vem selecionado; o toque marca o conjunto típico, sem desmarcar o que a pessoa já… | consenso | consenso-projeto |
| 111 | `equipamento.menor-anilha` | Menor anilha das máquinas de anilha e das barras (leg press, hack, smith, panturrilha sentada, barra longa, barra hexagonal) | pergunta única, gravada em cada item de anilha; sem resposta, vale o padrão de 2 kg… | consenso | consenso-projeto |
| 112 | `equipamento.sem-puxada-vertical` | Sem barra fixa nem polia alta. | manter o volume de costas com remadas (invertida > unilateral com halter > puxada com… | consenso | fenwick2009 |
| 113 | `equipamento.sem-ancoragem` | Sem nada para puxar (nenhum exercício possível de puxar vertical nem horizontal): | aviso da vaga, sem sugestão de compra | consenso | park2015, schoenfeld2017a |
| 114 | `divisao.sem-puxar` | Sem nenhum exercício de puxar possível, a divisão recomendada passa a ser a de corpo todo do mesmo número de dias, quando existe; | corpo todo primeiro; 6 dias: Corpo todo 6x; no Corpo todo 6x, empurrar vertical nos dias… | consenso | consenso-projeto, ramoscampo2024, pelland2026 |
| 115 | `selecao.dobrar-quadril` | Ordem da função "dobrar o quadril" (posteriores): | ordem dos níveis | moderada | morin2025, crawford2025, bourne2017, maeo2024 |
| 116 | `selecao.flexao-joelho-sem-maquina` | Sem cadeira nem mesa flexora, a flexão de joelho sai da bola ou do elástico (nível 3) e, sem eles, do peso do corpo (nível 4): | bola ≈ elástico; depois, a deslizante / bola ≈ elástico; depois, deslizante ≈ nórdico / bola ≈ elástico; depois, deslizante ≈ nórdico | consenso | maeo2024, morin2025, maeo2021 |
| 117 | `selecao.nordico` | Nórdico: | não entra / faixa de 6 a 10 descidas (era 4 a 8 até… / igual ao intermediário | um estudo | coratella2025, behan2023, ishoi2025, maeo2024, cholp2025 |
| 118 | `objetivo.pergunta` | Pergunta "O que você quer agora?" (decisão do Gustavo em 04/11/2026, opção (b) de `pesquisa-v2/12`): | opcional | consenso | consenso-projeto |
| 119 | `objetivo.cutting.mesmo-programa` | "Manter o músculo enquanto perde peso": | igual | robusta | binmahfoz2025, deller2026, lopez2022, roth2023 |
| 120 | `objetivo.cutting.texto` | Texto do objetivo: | texto | moderada | murphy2022, binmahfoz2025 |
| 121 | `objetivo.forca.faixa-compostos` | "Ficar mais forte": | como na hipertrofia / 5–8 nos 2 primeiros compostos com carga / 5–8 nos 2 primeiros compostos com carga | consenso | acsm2026, schoenfeld2017b, lopez2021 |
| 122 | `objetivo.forca.descanso` | Descanso nesses exercícios, no objetivo de força | 90–120 s (como hoje) / 2 min 30 s / 2 min 30 s | moderada | grgic2018a, acsm2026 |
| 123 | `objetivo.forca.seguranca` | Na faixa baixa, multiarticular com peso livre (barra, halter, kettlebell) fica com 2 a 3 repetições de reserva; | — / RIR 2–3 / RIR 2–3 | consenso | consenso-projeto |
| 124 | `objetivo.saude.texto` | Texto do objetivo de saúde: | texto | consenso | bull2020, garber2011, momma2022 |
| 125 | `equipamento.flexao-por-supino` | Sem banco ou supino: | chão → descida de 3 s → pés elevados → pés elevados com descida de 3 s → mãos em dois… | um estudo | kikuchi2017, calatayud2015 |
| 126 | `tempo.serie` | Tempo estimado de uma série | repetições × 3 s + 5–10 s de preparo | consenso | schoenfeld2015 |
| 127 | `tempo.transicao` | Transição entre exercícios (substitui o descanso; | 60–120 s | consenso | consenso-projeto |
| 128 | `tempo.aquecimento` | Aquecimento específico antes do 1º multiarticular de cada região (o geral não é exigido); | 1–2 séries leves, ~2–4 min; a última perto da carga do treino | consenso | iversen2021, viveiros2024, ribeiro2014 |
| 129 | `tempo.colchao` | Margem para fila de equipamento | +10% | consenso | consenso-projeto |
| 130 | `tempo.calibracao` | Ajuste pessoal do tempo estimado com o tempo real registrado (pesquisa-v2/05, seção 5; | depois de 3 sessões terminadas com ≥ 80% das séries feitas, a mediana de real ÷ estimado… | consenso | consenso-projeto |
| 131 | `tempo.exercicios-por-sessao` | Exercícios por treino conforme os minutos, pelo modelo de tempo do app (~3 séries cada); | 30 min: 4; 45: 6; 60: 8; 75: 10; 90: 12 | consenso | consenso-projeto, iversen2024, bazvalle2019, tomeleri2020, acsm2026 |
| 132 | `tempo.corte` | Escada fixa quando a sessão não cabe no tempo: | 1) só aquecimento específico; 2) superséries entre músculos que não competem (isoladores,… | consenso | iversen2021, zhang2025, sodal2023, bradshaw2026, chien2026 |
| 133 | `tempo.sobra` | Tempo que sobra por falta de exercício (decisão do Gustavo em 04/11/2026; | < 70% dos minutos no dia típico | consenso | consenso-projeto, iversen2021 |
| 134 | `tempo.sobra-series` | Séries no tempo que sobra (sessão de qualidade dos treinos, decisão do Gustavo em 06/11/2026): | sem foco, até 8 por músculo; com foco, o… / sem foco, até 12 por músculo; com foco, o… / sem foco, até 14 por músculo; com foco, o… | consenso | schoenfeld2017a, pelland2026, remmert2025, iversen2021 |
| 135 | `tempo.musculo-protegido` | Abdômen e panturrilha não ficam com zero série na semana por falta de minutos: | 1 vaga por semana; com 30 min, 2 séries e a troca por um isolador do dia | consenso | consenso-projeto, schoenfeld2017a |
| 136 | `tempo.superserie` | Supersérie: | só a partir da 3ª semana; nunca 2… / nunca 2 multiarticulares pesados de pernas… / nunca 2 multiarticulares pesados de pernas… | moderada | zhang2025, robbins2010, iversen2024 |
| 137 | `tempo.drop-set` | Drop set: | ≤ 1 por exercício; nunca em multiarticular livre pesado | robusta | sodal2023, coleman2022, dropset2026, bradshaw2026 |
| 138 | `tempo.outras-tecnicas` | Rest-pause (ou myo-reps) permitido na última série de exercício estável; | rest-pause sim; cluster e pré-exaustão não | um estudo | prestes2019, davies2021, trindade2019, tsartsapakis2026, bradshaw2026 |
| 139 | `seguranca.triagem` | Triagem no estilo PAR-Q+, com gravidez e doença aguda como perguntas à parte | qualquer "sim" suspende a geração automática; recomenda médico ou profissional de… | consenso | warburton2011, bredin2013, riebe2015, schwartz2021, ms2021 |
| 140 | `seguranca.triagem.osteoarticular` | "Sim" isolado na pergunta sobre osso, articulação ou tecido mole (revista no R1, aprovada pelo Gustavo em 01/11/2026) | marca a região e pergunta "e hoje, dói? de 0 a 10"; a nota segue… | consenso | warburton2011, smith2017, consenso-projeto |
| 141 | `seguranca.triagem.nenhuma` | Atalho da triagem para quem não tem nenhuma condição (R1; | a triagem abre com uma pergunta, "Alguma destas vale para você?", e as 9 condições em… | consenso | consenso-projeto |
| 142 | `seguranca.triagem.texto` | Texto das perguntas da triagem (licença do PAR-Q+ conferida em 05/11/2026) | perguntas próprias, inspiradas no PAR-Q+ e apresentadas como "não é o questionário… | consenso | parq2025 |
| 143 | `seguranca.alerta.cardiovascular` | Dor, pressão ou aperto no peito (ou irradiado), falta de ar desproporcional, tontura ou quase desmaio, batimento muito irregular | encerra a sessão; orienta ligar para o SAMU 192 se o sintoma não passar ou for intenso;… | consenso | aha-infarto, riebe2015 |
| 144 | `seguranca.alerta.musculoesqueletico` | Dor articular aguda ou pontual, estalo com dor, formigamento, dormência ou dor irradiada, perda de força incomum; | encerra o exercício; oferece alternativa; recomenda avaliação se persistir | consenso | aafp2015, verhagen2016, consenso-projeto |
| 145 | `seguranca.dor.escala` | Dor por série numa escala de 0 a 10 (pergunta opcional). | 0–2: segue; 3–5: reduzir carga 10–20% (se houver uma menor: na placa 1, no halter mais… | consenso | smith2017, silbernagel2007 |
| 146 | `seguranca.dor.programa` | Dor de hoje por região, perguntada uma vez só (na triagem), usada para montar o programa (R1) | > 5, ou sem nota (dado antigo): tira os exercícios que carregam a região, e o aviso de… | consenso | smith2017, consenso-projeto |
| 147 | `registro.treino-feito` | O que conta como treino feito, e como desfazer um registro errado (R5a; | só sessões com pelo menos 1 série contam como treino feito: a rotação dos dias, a semana,… | consenso | consenso-projeto |
| 148 | `tecnica.flexao.punho` | Dor leve no punho (3 a 5) nas flexões com as mãos no chão (flexão, flexão com as mãos juntas, flexão com os pés elevados, pike,… | punho 3 a 5 | consenso | consenso-projeto |
| 149 | `tecnica.parcial-alongada` | Repetição parcial na metade em que o músculo está esticado: | — / — / alternativa em texto, quando o fim da… | moderada | wolf2025, gschneidner2025, pedrosa2022 |
| 150 | `seguranca.sem-diagnostico` | O app não diagnostica e se posiciona como ferramenta de autogestão | nunca nomeia lesão, promete cura ou diz "pode treinar com dor 5/10"; DOMS × lesão aparece… | consenso | doctify, confef488 |
| 151 | `seguranca.estalo-sem-dor` | Estalo no ombro sem dor | não gera restrição; com dor, instabilidade ou perda de força aplica… | consenso | ijspt2023 |
| 152 | `seguranca.montagem` | Montagem segura no cartão e no guia dos exercícios com travas, apoios ou ancoragem; | smith e hack: travas logo abaixo do ponto mais baixo; panturrilha sentada: soltar e… | consenso | kerr2010, coffey2026 |
| 153 | `visao.desambiguacao` | Dicas para não confundir aparelhos parecidos no pedido da foto (hack × leg press, voador × polia dupla, multifuncional × estação… | 16 dicas no pedido (pesquisa-v2/08, seção 4; caneleira × tornozeleira da polia e… | consenso | consenso-projeto |
| 154 | `privacidade.foto` | Texto da foto do equipamento e consentimento antes do 1º envio (R5c, 07/11/2026). | as 3 telas (boas-vindas, foto e Meus dados) dizem para onde a foto vai, por quanto tempo… | consenso | lgpd, anthropic-retencao, anthropic-termos, anthropic-servidores |
| 155 | `dados.copia` | Lembrete de cópia dos dados (R5c, 07/11/2026). | Meus dados mostra a data da última cópia exportada ("há N dias") ou "nenhuma cópia"; o… | consenso | webkit2020, webkit2023, mdn-storage, consenso-projeto |
| 156 | `dados.instalar-iphone` | Aviso de instalar no iPhone e no iPad (R5c, 07/11/2026): | aberto no navegador (fora da tela de início), um aviso com os passos (Compartilhar →… | consenso | webkit2020 |
| 157 | `dados.persistente` | Armazenamento persistente (R5c, 07/11/2026): | Meus dados diz quando o navegador aceitou e também quando negou ("pode apagar se faltar… | consenso | webkit2023, mdn-storage |
| 158 | `treino.leitura` | "Como ler o seu treino" (R5c, B2, 07/11/2026): | aberto no programa até o 1º treino terminado, depois recolhido; no iniciante, uma 6ª… | consenso | acsm2009, consenso-projeto |
| 159 | `nivel.classificacao` | Classificação de nível no onboarding; | < ~6 meses de treino contínuo, ou > ~6 meses… / ~6–24 meses de treino contínuo com técnica… / > ~2 anos de treino contínuo com progresso… | consenso | santosjunior2021, acsm2009 |
| 160 | `tecnica.remada-baixa.polia` | Remada baixa sentada no banco reto, com triângulo e polia ajustável | polia na altura do umbigo da pessoa sentada ou 1–2 furos abaixo; cabo horizontal ou… | consenso | fenwick2009, lehman2004 |
| 161 | `tecnica.barra-fixa.pegada` | Pegada da barra fixa: | pronada a ~1–1,5× a largura dos ombros;… / pronada a ~1–1,5× a largura dos ombros;… / pronada a ~1–1,5× a largura dos ombros;… | moderada | youdas2010, dickie2017, lusk2010, andersen2014 |
| 162 | `tecnica.supino-inclinado.angulo` | Ângulo do banco no supino inclinado | ~30° (aceitável 15–45°; encaixe mais próximo de 30°); evitar > 45° | um estudo | rodriguezridao2020, chaves2020 |
| 163 | `tecnica.supino-halteres.cotovelos` | Cotovelos no supino com halteres; | ~30–60° do tronco ("seta", não "T"); antebraços perto da vertical; escápulas retraídas e… | consenso | noteboom2024 |

---

## As 25 perguntas mais importantes sem resposta ou com resposta fraca

Ordem de importância para a qualidade de um programa gerado para qualquer pessoa. "Hoje" descreve o estado dos documentos lidos.

1. **Qual volume semanal é ideal para cada nível de experiência e para cada pessoa?** Hoje: a curva geral é robusta (10 ou mais > menos de 10), mas as faixas por nível (6–10, 10–16, 12–20) e os alvos (10/12/14) são consenso (`volume.semanal.minimo`, `.alvo`, `.maximo`; `01` item 8); ninguém define operacionalmente os níveis.
2. **O teto de ~10 séries fracionadas por músculo por sessão é real, e a frequência mínima que sai dele é necessária?** Hoje: um preprint (`remmert2025`), poucos dados com volume alto por sessão; define toda a divisão (`volume.sessao.teto`, `divisao.frequencia-minima`).
3. **Como classificar o nível de treino de uma pessoa com segurança (e o que fazer quando erra)?** Hoje: critério pragmático de tempo de treino (6 e 24 meses) sem validação; Santos Junior et al. 2021 propõem 4 níveis, pontos de corte não verificados (`nivel.classificacao`, consenso).
4. **O que fazer com mulheres, pessoas de 60+, com sobrepeso/obesidade, hipertensas, gestantes, pós-parto?** Hoje: não tratado em regras; a triagem só suspende a geração; amostras da literatura são de homens jovens (`00-metodo.md`, `02`); evidências de volume para idosos exigiram mais para manutenção (`bickel2011`).
5. **Qual é o limiar de dor realmente seguro para um app sem supervisão (0–2, 3–5, >5) e quais exercícios substituir por articulação?** Hoje: limiares do projeto, mais baixos que os 5/10 de um estudo de tendão de Aquiles supervisionado; sem diretriz para musculação sozinho com dor (`seguranca.dor.escala`, consenso).
6. **A triagem PAR-Q+ própria (sem o texto oficial) é suficiente e legal, e qualquer "sim" realmente deve bloquear?** Hoje: perguntas próprias inspiradas no PAR-Q+, licença exige autorização escrita não pedida; o algoritmo ACSM 2015 não foi conferido; a jornada do plano diz "pode seguir só com aviso" e a pesquisa recomenda bloquear (`07`, "ponto para revisão").
7. **A dupla progressão (2 sessões no topo, menor incremento, volta ao fundo da faixa) é o melhor método para cada equipamento?** Hoje: um estudo de 8 semanas em membros inferiores de treinados (`plotkin2022`, protocolo não lido) mais manual NSCA em fonte secundária; incrementos sem estudo.
8. **Como progredir peso do corpo, elástico e halter leve em quem fica forte (até onde vai o peso do corpo)?** Hoje: escadas fixas e fim da escada com aviso, sem ensaio de pausa, 1,5 repetição ou drop set mecânico; nenhum ensaio compara hipertrofia de elástico e de pesos; calistenia de longo prazo em treinados sem dados (`05`).
9. **Qual é o RIR certo, e como lidar com o erro de estimar RIR (±1, maior acima de 12 reps)?** Hoje: RIR alvo por nível é consenso; erros de estimativa grandes (I² ≈ 98%); a série "efetiva" (RIR ≤ 4) é limiar do projeto; coeficientes de `robinson2024` não lidos.
10. **Como retornar depois de uma pausa: quanto tempo, quanta carga e quantas séries?** Hoje: nenhum protocolo testado; números 50–60%, 75%, −10/−15/−20% e janelas de 14/21/57/182 dias são heurísticas (`readaptacao.*`); sem dados de destreino de ~3 meses em quem treina há anos.
11. **Quando e como fazer deload, e vale a pena (e para quem)?** Hoje: o único ensaio (uma semana sem treino) não mostrou ganho; prática de treinadores (`rogerson2024`, `bell2023`); gatilhos do app são do projeto (`deload.semana-leve`, consenso).
12. **Como sair de um platô?** Hoje: não existem estudos; a escada de estagnação (faixa mais larga, −10%, semana leve, trocar variação) é consenso apoiado indiretamente (`progressao.estagnacao`).
13. **O que a pessoa precisa para continuar treinando (adesão)? Sessões curtas, variedade, sensação de progresso, gostar do treino aumentam a adesão?** Hoje: não há ensaio em musculação recreativa; apoio indireto de meta-análises de autorregistro (`michie2009`, `harkin2016`, só resumo), uma coorte de app (`conti2026`, resumo) e uma preferência declarada em idosos (resumo de congresso). As regras de acompanhamento são consenso.
14. **Quantos exercícios por sessão e que duração é razoável para cada tempo disponível?** Hoje: 4/6/8/10/12 exercícios para 30/45/60/75/90 min é consenso; o modelo de duração (reps × 3 s + 5–10 s, descanso, transição 60–120 s, +10%) não é validado; a ordem da escada de corte do `06` difere da do plano original.
15. **Como contar séries indiretas (0,5) e como atribuir músculos primários/secundários?** Hoje: o 0,5 é de um único grupo de pesquisa (`pelland2026`, `remmert2025`), e a atribuição por exercício é anatomia e consenso; rosca × remada deu 0,47 (`mannarino2021`).
16. **Treinos com carga leve (~30 repetições) e peso do corpo funcionam tão bem quanto os de carga moderada para quem treina há anos?** Hoje: `reps.teto.carga-limitada` (até 30) é consenso; a base é carga baixa perto da falha ≈ carga alta (meta-análises), mas em muitos estudos de não treinados; não há teste de 30 reps nem 20–30% × 30–40% de 1RM em treinados; muito do desconforto e da adesão não foi medido.
17. **Qual é a regra de espaçamento entre sessões do mesmo músculo e de fadiga cruzada (lombar, pegada, pernas em dias seguidos)?** Hoje: não tratado; a ordem na sessão não muda hipertrofia, mas isso não responde a interferência entre exercícios nem recuperação entre dias.
18. **A equivalência máquina = peso livre = elástico = unilateral para hipertrofia vale para todos os músculos e níveis, e a mesma pessoa troca de equipamento sem perder a progressão?** Hoje: moderada, mas só 5 estudos de hipertrofia em `haugen2023`; `acsm2026` diz "dados insuficientes"; elástico = peso é só inferência; troca de máquinas recomeça pela calibração (`progressao.troca-equivalente`).
19. **Quanto de variedade de exercícios é ideal, e com que frequência trocar?** Hoje: variação sistemática ajuda hipertrofia regional e a aleatória atrapalha (8 estudos, homens jovens); a troca a cada 4–8 semanas e o "2 exercícios por músculo grande" são consenso.
20. **Qual a evidência de hipertrofia dos músculos com pouco estudo (peitoral, dorsais, deltoides, glúteos) e das substituições sem puxada vertical?** Hoje: pouca evidência regional; remadas no lugar de puxadas para o latíssimo, pullover e puxada de elástico sem dados; `equipamento.sem-puxada-vertical` mostra aviso de lacuna.
21. **Qual a faixa de repetições e o descanso ideais por tipo de exercício (composto × isolador) e em objetivos de força?** Hoje: todas as faixas funcionam perto da falha; a divisão composto 6–12 × isolador 10–20 e o descanso mais longo em compostos são consenso; 5–8 reps e 2 min 30 s para força são escolhas do projeto.
22. **Como interpretar o treinamento para manter músculo em déficit calórico, e como o app deve falar com quem está em dieta?** Hoje: a proteção da massa magra é robusta, mas o número de séries que mantém (3 × 5 por exercício) é de um estudo; o app não trata nutrição.
23. **Quais são os riscos e os limites das técnicas de economia de tempo (superséries, drop sets, rest-pause) para iniciantes, idosos ou treinos em casa?** Hoje: drop set robusto só para não inferioridade; rest-pause e cluster, um estudo/ressalvas; sem dados em iniciantes; supersérie ocupa 2 aparelhos; e `tempo.superserie` exclui o iniciante nas 2 primeiras semanas.
24. **O que dizem diretrizes e textos que o projeto só leu em parte (NSCA, ACSM 2009, PAR-Q+, Resoluções CONFEF)?** Hoje: ACSM 2009 e NSCA em fonte secundária; PAR-Q+ com texto e licença restritos; CONFEF 436/2022 e 617/2026 não lidas; ANPD sobre dados de saúde não consultada.
25. **O que apps de referência fazem e quais são as críticas a treinos gerados por aplicativo?** Hoje: não tratado (só `hevy-recursos`, de mercado, e `conti2026`); `consenso-projeto` mantém dezenas de números sem fonte primária.

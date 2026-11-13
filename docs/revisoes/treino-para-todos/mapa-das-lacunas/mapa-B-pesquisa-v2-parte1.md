# Mapa B: o que já se sabe e o que falta (pesquisa-v2, parte 1)

Escopo lido por inteiro: `docs/pesquisa/00-metodo.md` e, em `docs/pesquisa-v2/`, os arquivos 01, 02, 04, 05, 06, 07, 09, 12, 14 e 15. Só leitura. Abreviações de arquivo: **01** divisão/frequência; **02** panorama; **04** exercícios por músculo; **05** montagem da sessão; **06** populações e segurança; **07** progressão/acompanhamento; **09** trocas e locais; **12** outros objetivos; **14** combinações por dia; **15** prioridade e manutenção.

## Notas de método (valem para tudo abaixo)
- Selos (00-metodo): robusta / moderada / um estudo / consenso. O selo vai para o número; quando a regra mistura evidência forte com número do projeto, vale o selo mais fraco. Status de leitura: verificado-busca < resumo-PubMed < texto-completo; NÃO VERIFICADO fica fora de constantes.
- **Quase tudo nestes documentos é resumo-PubMed.** Os cabeçalhos de 01, 02, 04, 05, 06, 07, 09 e 12 dizem que o texto completo não foi lido. Exceções registradas: 04 (Kinoshita 2023, sóleo, texto lido em 05/11); 06 (PAR-Q+ 2025, OMS 2020, guia MS 2021, ACSM 2026, Bredin 2013 lidos em 05/11); 14 (`acsm2026`, `iversen2021`, `bazvalle2022`, `zhang2025` em texto-completo via Europe PMC) e 15 (`iversen2021` texto-completo, `pelland2026` só preprint lido).
- **Inconsistência de status do ACSM 2026 (`acsm2026`, PMID 41843416):** 02, 05, 06 (seções 1–7) e 12 tratam como resumo-PubMed; 06 (leituras de 05/11) e 14 dizem texto-completo. Documentos anteriores à auditoria não foram atualizados.
- Limitações gerais (00-metodo): amostras pequenas (10–40), quase só homens jovens, não treinados, 6–12 semanas, EMG e modelagem como apoio indireto (EMG não mede hipertrofia).
- Os 3 documentos mais recentes (12, 14, 15) dizem expressamente que "nada aqui muda `regras.md`, dados ou código": são propostas pendentes da decisão do Gustavo. 06 seção 9 (triagem revisada) está "registrada, não aplicada".

---

## Tema 1. Quanto fazer (volume por nível, dose mínima, retorno decrescente, frequência, quanto cabe na sessão)

**(a) Conclusões**
- Mais volume rende mais, com retorno decrescente: **robusta** (02, linha "Volume semanal"; 14 §1b: três meta-análises usam séries semanais por músculo; o número de exercícios é consequência).
- ≥ 10 séries/semana melhora hipertrofia: **robusta** (01 tabela; ACSM 2026 "visão geral de revisões").
- Série indireta = 0,5 (método "fracionado"): evidência relativa mais forte entre os três testados; 02 diz que "pode subir de moderada para robusta" (ainda não subiu).
- Frequência com volume igual: ~zero para hipertrofia, positiva para força: **robusta** (01; 02; 12 Pergunta 2 via Grgic 2018b: "pelo volume que soma").
- Divisão (corpo todo × dividido) empata com volume igual: **robusta** (01; 14 4a).
- 1×/semana vs 2×: **moderada** (01; some com volume igual).
- Teto por sessão ≈ 10 séries (15 §3a diz ~11 fracionadas): **um estudo** (preprint Remmert 2025); frequência mínima = ceil(meta semanal ÷ 10): **um estudo** (01, regra `divisao.frequencia-minima`).
- Teto semanal ≈ 20 séries (ganho extra pequeno e incerto acima): **moderada** (15 3b, `volume.semanal.teto-padrao`).
- Mínimo eficaz ≈ 4–6 séries/semana: **moderada** (15 1c; 07 §4.3 `volume.semanal.minimo-eficaz`). "4 a 6 crescem devagar": direção moderada, tamanho consenso (a comparação por faixa deu só tendência p = 0,074).
- Dose de manutenção (1–3 séries pesadas/semana, 1 sessão): **moderada** em jovens não treinados (Bickel 2011 + revisão narrativa Spiering 2021); para treinados não há número (15 1b): "manter o volume habitual basta" é **um estudo** (2 ECRs pequenos).
- Iniciante: nenhuma fonte mostra que precise de menos volume; ACSM 2026 ≥ 10 séries sem separar por experiência: **moderada** (06 §1).
- Ganho do foco: 12–14 séries vs 6 ≈ +2 a +3 pontos percentuais em 8–12 semanas (15 2b): coeficientes **moderada**, conta **[opinião]**.
- Quanto cabe na sessão: conta do app (05 §1): ~5 min por exercício com 2 séries, ~7 min com 3; 30 min ≈ 4 exercícios; 60 min ≈ 8. **consenso** (nenhum estudo valida fórmula de duração; 05 §7; 14 2a). Ensaios usam 2 a 8 exercícios/sessão (14 1c); "5 a 7" é prática, **consenso** (14 1a). ACSM 2009 dizia 8–10 exercícios/sessão, sem ensaio.
- 2–4 séries por exercício: **consenso** (04 §3; 14 6c: Krieger 2010 compara 1×várias, não 4×6).
- Treino de 3 multiarticulares × 2 séries já rende se a soma semanal fechar: **moderada** (piso ~4/semana) + **consenso** (mínimo de 3 padrões) (14 2b).
- Acima de 60 anos: volume baixo já é o melhor para função e massa; moderado/alto ajuda mais a força: **moderada** (06 §4, Radaelli 2025).

**(b) Fontes**
Pelland 2026 (41343037, resumo-PubMed; preprint lido segundo 15), Schoenfeld 2017a (27433992, resumo-PubMed), Baz-Valle 2022 (35291645, texto-completo), ACSM 2026 (41843416), Ramos-Campo 2024 (38595233), Schoenfeld 2019a (30558493), Schoenfeld 2016 (27102172), Currier 2023 (37414459), Remmert 2025 (preprint, sem revisão por pares), Bickel 2011 (21131862), Spiering 2021 (33629972), Barsuhn 2025 (39665246), Moreno 2025 (39557664), Iversen 2021 (34125411, texto-completo), Androulakis-Korakakis 2020 (31797219), Fyfe 2022 (34822137, "metade lida"/texto não lido), Hammarström 2020 (31813190), Kataoka 2026 (42647752), Radaelli 2025 (39405023), Evangelista 2021 (34468591). Todas resumo-PubMed salvo indicação.

**(c) Pontos fracos / em aberto**
- O **teto de ~10 séries por sessão vem de um único preprint** e muda a conclusão para volumes altos (01 "O que fica sem resposta"; 15 3a "poucos dados no alto"). 01 e 15 divergem levemente (10 vs ~11 fracionadas).
- Os **alvos de volume por nível** (`volume.semanal.alvo`: iniciante/intermediário/avançado, prioritário 8/12/14) são **consenso**; os documentos lidos não trazem a tabela de alvos nem uma fonte que os valide por nível. Não tratado: quanto de volume é ideal para avançado, e se "avançado" justifica a meta 14.
- Não há **ensaio de especialização** em treinados nem de treinados reduzindo a 4–6 séries medindo hipertrofia (15 §6).
- **Não existe estudo** de 1 exercício × mais séries vs 2 exercícios com volume igual (14 3a).
- Teto de 4 séries por exercício e 2–4 séries por exercício: consenso.
- Duração da sessão como variável: nenhum estudo (14 §6).
- Coeficientes de Pelland e Schoenfeld usados em contas de 15 são de preprint/resumo; a versão revisada não foi lida.
- Não tratado: diferença de volume ótimo entre músculos (ex.: panturrilha, abdômen), exceto o piso de 4 no abdômen (15 §2).

---

## Tema 2. Quão pesado, quão perto da falha, faixas de repetições, descanso

**(a) Conclusões**
- Falha não é superior a parar antes (Refalo 2023 meta-análise); na meta-regressão exploratória, hipertrofia melhora quanto mais perto da falha (Robinson 2024); ACSM 2026: falha não muda resultado de forma consistente. 02 diz "Confirma" RIR 0–3 nos isoladores e 1–3 nos compostos (`rir.falha.nao-necessaria`, `rir.alvo`). Selo individual não dado no 02; as duas fontes apontam direções ligeiramente diferentes.
- Faixas: todas as prescrições (6–30 repetições, `reps.equivalencia-cargas`) promoveram hipertrofia de forma parecida; carga alta melhor para força (Currier 2023, rede com 119 estudos; ACSM 2026): 02; 12: **robusta** para "carga alta → mais força", hipertrofia parecida.
- Força máxima: cargas ≥ 80% 1RM, amplitude completa, 2–3 séries, exercício no começo da sessão, ≥ 2 sessões/semana: **robusta** (12 P2, ACSM 2026). Faixa 6–12 reps ≈ 70–85% 1RM, "quase sempre abaixo" dos 80% (12 §2.2; correspondência exata "não foi lida").
- Dose mínima de força em treinados: 1 série de 6–12 reps, 2–3×/semana, perto da falha: **moderada** (meta-análise pequena, 6 estudos de homens).
- Especificidade do teste de 1RM: **um estudo** (Dankel 2017, n = 5). Força é parcialmente específica do aparelho e do exercício: **moderada** (09 §1: Haugen 2023, Heidel 2022, Saeterbakken 2025).
- Descanso: pequena vantagem acima de 60 s, sem diferença apreciável acima de ~90 s (Singer 2024, meta-análise bayesiana): **moderada** (05 §1). Padrão aprovado em 01/11: compostos 90–120 s (105 s), isoladores 75 s, 2–3 min como opção. Para força em treinados, > 2 min maximiza (Grgic 2018a, **moderada**, revisão sem meta-análise); iniciante 60–120 s bastam.
- Aquecimento: só específico; geral não melhorou desempenho (Ribeiro 2014 um estudo; Wilson 2025 moderada: melhora potência/taxa de força, não força máxima; Viveiros 2024 um estudo: aquecimento curto e pesado rende mais volume; Iversen 2021 consenso) (05 §3).
- Prescrição por % de 1RM é difícil de reproduzir (Heredia-Elvar 2022, um estudo); autorregulação (APRE, RPE, velocidade) dá mais força que % fixa em atletas (Zhang 2021, Huang 2025: **moderada para força**, sem hipertrofia) (07 §1).
- Reps × %1RM quase não varia por sexo, idade, experiência (Nuzzo 2024, 269 estudos, **moderada**); variação entre pessoas é maior com cargas leves; leg press permite mais repetições que supino no mesmo %.
- RIR autorrelatado subestima em ~0,95 repetição (Halperin 2022, **moderada**); erro maior > 12 repetições e longe da falha; experiência não ajuda (4 estudos, moderada) (07 §2.1).

**(b) Fontes**
Refalo 2023 (36334240), Robinson 2024 (38970765), Currier 2023, ACSM 2026, Singer 2024 (39205815), Grgic 2018a (28933024), Grgic 2018b (29470825), Androulakis-Korakakis 2020, Dankel 2017 (27875635), Schoenfeld 2017b (28834797), Lopez 2021 (33433148), Halperin 2022 (34542869), Zourdos 2021 (30747900), Remmert 2023 (37036795), Bermúdez Droguett 2025 (42211811), Mayhew 1995 (7500624), Reynolds 2006 (16937972), Mayhew 2008 (18714230), Abdul-Hameed 2012 (23342225), Nuzzo 2024 (37792272), Zhang 2021 (33776802), Huang 2025 (40791980), Heredia-Elvar 2022 (35741372), Ribeiro 2014 (25153744), Wilson 2025 (39864808), Viveiros 2024 (39593476). Todas resumo-PubMed. As expressões originais de Epley, Brzycki, Lombardi, Mayhew e O'Conner: **NÃO VERIFICADAS** (07 §2.2).

**(c) Pontos fracos**
- A **faixa de repetições por tipo de exercício** (6–10, 8–12, 10–20, 12–20 etc.) aparece citada em 12 e 07, mas **nenhum dos arquivos lidos traz a tabela de faixas por tipo/equipamento nem a justificativa de cada faixa**; só `reps.equivalencia-cargas` (6–30) em 02. Não tratado nestes arquivos: por que isoladores/peso do corpo usam 10–20 e não 6–10; faixa para elástico; faixa para exercícios de peso do corpo difíceis demais/fáceis demais.
- Conflito aberto na proximidade da falha: Robinson 2024 (meta-regressão exploratória) vs Refalo 2023.
- A periodização é **ponto em aberto** para força em treinados: Moesgaard 2022 diz que ajuda; ACSM 2026 diz que não mudou consistentemente (12 §2.1; ambos só resumos).
- O número de descanso de isoladores (75 s) é **consenso**; Singer 2024 é sobre descanso geral.
- Risco de séries pesadas (3–5 reps) perto da falha em barra livre sem ajudante: "não pesquisado aqui" (12 §2.3).
- Força em mulheres treinadas e idosos: não tratado de modo direto (12 §2.3).
- A tabela de Nuzzo 2024 (reps × %1RM com variação) não está no resumo; texto completo bloqueado (07 §9).
- Fórmulas de 1RM divergem 15–52 pontos acima de 12 reps (conta do projeto, medida): não há evidência de qual vale para isoladores.

---

## Tema 3. Escolha de exercício (alongada, estabilidade, carga, amplitude; multi × isolador; variedade)

**(a) Conclusões**
- Máquina = peso livre para hipertrofia (Haugen 2023, 13 estudos, SMD −0,055; Heidel 2022; Hernández-Belmonte 2023: ≤ 2% de diferença; ACSM 2026): **robusta** em 04 §1 e 02; **moderada** em 09 §1 (inconsistência de selo entre arquivos).
- Unilateral = bilateral para crescimento; força segue a especificidade: **moderada** (Kassiano 2025 meta-análise, poucos estudos) (04).
- Músculo alongado: em vários músculos, treinar na posição mais alongada cresceu mais (tríceps acima da cabeça, flexora sentada, panturrilha em pé, extensora para reto femoral): **moderada** (mesmo grupo de pesquisa, amostras pequenas) (04 §1 e `selecao.alongado`).
- Parcial alongada ≈ completa (Wolf 2025 e Gschneidner 2025, 297 pessoas): **moderada** (04, atualização 04/11); não derruba `selecao.alongado`, que é sobre escolha de exercício; virou regra `tecnica.parcial-alongada`.
- Multiarticular basta? Acrescentar rosca e tríceps a multi não aumentou braços em treinados (de França 2015): **um estudo**; alguns músculos só crescem com o isolador (reto femoral, cabeça longa do tríceps, gastrocnêmio): **moderada** (`selecao.isolador-obrigatorio`).
- Por músculo (04 §2): peito: inclinado (Chaves 2020) um estudo, flexão ≈ supino a ~40% de 1RM (Kikuchi 2017) um estudo, crucifixo **consenso**; costas **consenso** (nenhum ensaio compara puxada e remada; só EMG); ombro anterior moderada (contagem) + consenso (dispensar isolador); lateral: halter ≈ polia (Larsen 2025) um estudo; posterior: **consenso**; bíceps: inclinada ≈ Scott (Kobayashi 2026, total igual; a Scott cresce braquial/braquiorradial, a inclinada o bíceps) um estudo cada; tríceps acima da cabeça (Maeo 2023) um estudo de efeito grande; quadríceps: extensora essencial para reto femoral **moderada** (Kinoshita 2026, Kassiano 2026, Zabaleta-Korta 2021, Kubo 2019); agachamento completo cresce mais glúteo e adutor, não o quadríceps (Kubo 2019) um estudo; flexora sentada > deitada (Maeo 2021, +14% × +9%) um estudo; stiff e nórdico crescem partes diferentes (Morin 2025); glúteo: hip thrust ≈ agachamento (Plotkin 2023), abdução **consenso**; panturrilha em pé > sentada para gastrocnêmio (Kinoshita 2023, +9–12% × +1–2%) um estudo; sóleo "para sentada" = consenso (número lido em 05/11: +2,1% × +2,9%, igual); abdômen **consenso**.
- Variedade: variação sistemática ajuda hipertrofia regional, variação excessiva/aleatória pode atrapalhar (Kassiano 2022, 8 estudos): **moderada** (04, 02, 14). Fixo × variado com mesmo número de exercícios: mesma hipertrofia total (Kassiano 2025, Fonseca 2014, Costa 2021, Baz-Valle 2019: **moderada** para "1 exercício com volume certo faz o músculo inteiro crescer parecido" e para "2 exercícios de função diferente cobrem mais regiões") (14 3a, 3b).
- Regras de seleção (04 §3): função da vaga (`selecao.funcao-da-vaga`) **consenso**; 2 exercícios/semana para músculos grandes, 1 para pequenos: **consenso** (14 P8 propõe subir para moderada); 2–4 séries/exercício consenso; manter exercícios 4–8 semanas, variar dentro da função **moderada**.
- Segurança de escolha: estabilidade para iniciante é critério de desempate (04 §1; 09 `selecao.preferencia`).
- Exercício sem animação aprovada: cartão textual (CLAUDE.md; não é pesquisa).

**(b) Fontes (principais)**
Haugen 2023 (37582807), Hernández-Belmonte 2023 (37535335), Heidel 2022 (34609100), Kassiano 2025 (39794667), de França 2015 (26244600), Wolf 2025 (39959841), Gschneidner 2025 (nome sem PMID), Chaves 2020 (32922646), Kikuchi & Nakazato 2017 (29541130), Larsen 2025 (40692697; 40113586 "resumo a reler"), Kobayashi 2026 (42829982), Zabaleta-Korta 2023 (37559762) e 2021 (34743671), Maeo 2023 (35819335), Maeo 2021 (33009197), Kinoshita 2026 (41630124) e 2023 (38156065, texto lido), Kubo 2019 (31230110), Kassiano 2026, Morin 2025 (40644669), Plotkin 2023 (37877099), Kassiano 2023 (37015016), Pedrosa 2022 (33977835), Kassiano 2022 (35438660), Kassiano 2025var (39388663), Fonseca 2014 (24832974), Costa 2021 (33440446), Baz-Valle 2019 (31881066), Rauch 2020 (29016481), Mannarino 2021 (31268995), Gentil 2013 (23537028), revisão narrativa do alongado (37556026). Todas resumo-PubMed (salvo Kinoshita 2023 sóleo).

**(c) Pontos fracos**
- **Costas, ombro posterior, crucifixo de peito, abdômen e abdução de quadril: consenso, sem ensaio de hipertrofia** (04 §5).
- Quase tudo de estudos de 10–30 pessoas, 8–12 semanas, muito de um grupo (Maeo e colegas): faltam réplicas independentes (04 §5). Estudos de alongado em não/pouco treinados; efeito em treinados pode ser menor.
- Vários selos "um estudo" sustentam regras do gerador (bíceps, tríceps, glúteo, panturrilha, posteriores).
- Larsen 2025 (leg press) "resumo a reler"; Kassiano 2026 e Gschneidner 2025 citados sem PMID nos arquivos lidos.
- 04 e 09 divergem no selo de "máquina = peso livre" (robusta vs moderada).
- Não tratado: seleção para peso do corpo/elástico (quais exercícios equivalem a quais); critério de estabilidade para iniciante (só dito como desempate, sem estudo); quanta variedade ideal em meses de treino além de "4–8 semanas".
- Falta ensaio de séries × exercícios com volume igual (14 §6).
- "Preencher a vaga" com outro músculo: sem estudo (14 6e, [opinião]).

---

## Tema 4. Ordem na sessão e interferência (lombar, pegada, mesmo músculo em dias seguidos)

**(a) Conclusões**
- Ordem não muda hipertrofia (Nunes 2021, 11 estudos, ES 0,03); força cresce mais no que vem primeiro: **moderada** (05 §2; 14 5a, que propõe subir `ordem.sessao` de consenso para moderada). ACSM 2026 concorda (4 revisões, 941 pessoas).
- "Multiarticulares primeiro, prioritário antes, abdômen por último": a parte "prioritário antes" e "abdômen por último" é **consenso** (05 §2); para hipertrofia o prioritário primeiro é só um estudo fraco (Avelar 2019, 36 homens, 6 semanas): **consenso** (14 5b).
- Fadiga é aguda: repetições caem no exercício seguinte "independentemente da massa muscular" (Simão 2012): **moderada** (14 4c). Hipertrofia não muda com a ordem nem com a divisão → pernas e tronco no mesmo dia não rendem menos com volume igual.
- Começar pela perna reduz o esforço percebido da sessão inteira (Nunes 2019, 15 idosas): **um estudo** (14 4c, 5a).
- Superséries de antagonistas mantêm volume; mesmo padrão derruba (Zhang 2025): **moderada** (05 §4; 14 4b).
- Sobrecarga na descida (ACSM 2026): "Ajuste 4 (em estudo)" em 02; não entra sem estudo próprio. Nada nos documentos lidos fecha esse tema.
- Razão puxar/empurrar e ombro: **consenso** com apoio de caso-controle (Kolber 2010/2014/2017) (14 6f); não empilhar empurrar sem puxar.

**(b) Fontes**
Nunes 2021 (32077380), Nunes 2019 (31839851), Simão 2012 (22292516), Avelar 2019 (30248269), Tomeleri 2020 (33105360), ACSM 2026, Zhang 2025 (39903375, texto-completo), Kolber 2010 (20508476), 2014 (24077379), 2017 (27390859), Merrigan 2020 (33414875), Weakley 2017 (28698987).

**(c) Pontos fracos**
- **Não tratado em nenhum dos arquivos lidos:** fadiga da lombar entre exercícios (ex.: stiff/terra antes de remada/agachamento), fadiga de pegada (ex.: remadas antes de puxadas, ou carregar halteres pesados), ordem entre exercícios que dividem o mesmo estabilizador. Só se diz que a fadiga é aguda e que não prejudica hipertrofia (14 4c).
- **Mesmo músculo em dias consecutivos / tempo de recuperação entre sessões do mesmo músculo:** não há análise específica (a frequência é tratada pelo volume). Não tratado.
- Ordem "prioritário primeiro" para hipertrofia: um estudo fraco; estudos de idosas empatam (14 §6).
- Ordem de superséries para iniciantes: "a partir da 3ª semana" é **[opinião]** (05 §4, §7).
- Não achado: ensaio "pernas+tronco no mesmo dia vs separados" com volume igual além dos de divisão (14 §6).

---

## Tema 5. Eficiência do tempo (superséries, drop sets, descanso curto, o que cortar)

**(a) Conclusões**
- Escada de cortes proposta (05 §4, regra `tempo.corte`): aquecimento só específico → superséries entre músculos que não competem → drop set/myo-reps/rest-pause na última série dos isoladores → menos exercícios (mantendo multi + isoladores obrigatórios: extensora, tríceps acima da cabeça, panturrilha em pé) → menos séries (não prioritários primeiro, piso 4). Selos: ver abaixo.
- Supersérie de músculos que não competem mantém o volume (Zhang 2025, 19 estudos, 313 pessoas): **moderada**; sessão mais curta; mais esforço percebido, lactato, dano.
- Supersérie corpo todo (Iversen 2024): composição corporal igual, força de puxada 5,2 kg menor: **um estudo**.
- Drop set: mesma hipertrofia em metade a um terço do tempo (Sødal 2023 meta-análise): **moderada** (05); 02 diz "ajuste 3".
- Myo-reps/rest-pause: mesmo tamanho e força com ~30% menos volume de carga (Bradshaw 2026; Tsartsapakis 2026): **um estudo**; sistemas avançados sem superioridade em hipertrofia, rest-pause vantagem modesta.
- Séries pareadas: duração −40–50% (Chien 2026, estudos agudos).
- Descanso 90–120 s nos compostos economiza até 7–8 min/treino para intermediário/avançado [medido] (05 §1).
- Treino de 4 exercícios por 10 semanas funcionou (Iversen 2024) (14 7 P7); treino "eficiente em tempo": ≥ 1 agachar/leg press, 1 puxar, 1 empurrar, ≥ 4 séries/músculo/semana (Iversen 2021, narrativa): moderada (piso) + consenso.
- Calibração do tempo pelo uso real após 3 sessões (`tempo.calibracao`): **consenso** (05 §5).
- Falta de tempo é a barreira mais citada (Iversen/Fyfe): **consenso** (revisão narrativa) (14 6d).
- Vaga vazia: avisar + subir séries dos músculos possíveis até tetos + dizer duração real; variação só se mudar função/região: (14 §4 resposta direta).

**(b) Fontes**
Zhang 2025 (39903375), Iversen 2024 (39072654), Iversen 2021 (34125411), Sødal 2023 (37523092), Bradshaw 2026 (42112925), Tsartsapakis 2026 (41718208), Chien 2026 (42783664), Singer 2024, Robbins 2010 (20733520, verificado-busca), Weakley 2017, Fyfe 2022.

**(c) Pontos fracos**
- **Nenhum estudo valida a fórmula de duração** (05 §7; 14 2a). Tempo por série (3 s/rep + 7,5 s), transição 90 s, aquecimento 3 + 1,5 min, margem 10%: **consenso** (`tempo.*`).
- Técnicas avançadas: estudos de 8–12 semanas; não se sabe se manter drop sets e superséries por meses acumula fadiga (05 §7).
- A **ordem da escada** (superséries antes de cortar exercício) é proposta/consenso; a escada anterior cortava exercício primeiro.
- Supersérie para iniciante "só a partir da 3ª semana": **[opinião]**.
- Drop set vira prescrição: exige registro de queda de carga (R0b); nunca em multiarticular livre pesado: consenso.
- Uma sessão "curta demais" não tem estudo que mostre prejuízo (14 6a): inferência.
- Mediana de 6 exercícios/dia na grade, 50–60% dos minutos usados em 75–90 min (14 §2): limite por lista de vagas e teto de 4 séries, não por tempo (problema de produto, não de evidência).
- Rest-pause/drop em iniciantes e 60+: não tratado.

---

## Tema 6. Progressão ao longo de meses (carga por equipamento, deload, platô, volta de pausa)

**(a) Conclusões**
- Dupla progressão: **não provada melhor** nem pior; subir repetições ou carga dão resultado parecido (Plotkin 2022, 43 treinados, 8 semanas, pernas: **um estudo**). Regras `progressao.*`: **consenso** (números "2 sessões" e "topo da faixa" são de treinadores) (07 §1).
- Periodização com volume igual não muda hipertrofia (Moesgaard 2022; Grgic 2017): **moderada** (02, 07).
- Calibração de carga na 1ª série (`progressao.calibracao`, 07 §2.3 e 09 §3): **consenso**; peças: RIR subestima (moderada); fórmulas vão até ~10 reps (um estudo cada, 3 na mesma direção); autorregulação dá mais força (moderada, atletas). Números "±2", "+25%", "12": do projeto. Vale na 1ª vez de exercício, 1ª vez de máquina em local novo, volta > 26 semanas. Casos C1–C7.
- Iniciantes escolhem sozinhos 42–57% do 1RM (Glass & Stanton 2004, 30 iniciantes, um estudo) → começar leve.
- Como subir carga por equipamento (07 §2.3, 09): kg conhecido (halteres, kettlebell, barra) segue progressão normal; placa, anilhas, contrapeso e degrau (peso do corpo, elástico): só passos (±1, ±2 com folga de 6); sem conversão entre aparelhos (variações de −17% a +8%: um estudo cada, três na mesma direção); "se o local não tem o peso, vale o maior disponível abaixo" (`equipamento.escada-carga-leve`). Rotulado consenso (`progressao.troca-equivalente`: moderada para hipertrofia igual/força específica; o "não converter" é consenso).
- Deload/semana leve: gatilho "a cada 6–8 semanas" **removido** (decisão do Gustavo); sugerida só com sinal (≥ 2 exercícios estagnados; "pesado demais" em 2 dos últimos 3 treinos; dor 3–5 repetida em 2 sessões); não sugere nas 3 semanas depois de volta de pausa. Hipertrofia não muda com ou sem semana leve: **moderada** (Coleman 2024 + Pancar 2026, dois ensaios pequenos); a força fica um pouco menor com semana parada (Coleman, um estudo). Gatilhos e números: **consenso** (Rogerson 2024, pesquisa com 246 atletas: ~5,6 semanas, ~6 dias, menos volume e mais reserva).
- Platô: só "estagnação" (≥ 2 exercícios estagnados, `progressao.estagnacao`) como gatilho de semana leve; **tratamento de platô em si (o que mudar) não é tratado**.
- Volta de pausa (`readaptacao.durante-uso`, 07 §3; 06 §2): até 13 dias → normal (**moderada**: Hwang 2017 um estudo 2 semanas; Ogasawara 2011); 14–20 → RIR +1 (**consenso**, Chen 2012: proteção contra dano ~2 semanas); 21–56 → volta gradual 3 semanas (~55% das séries, RIR 3–4, carga −10%) (consenso); 57–182 → −15% (consenso; escolha do projeto dentro da faixa aprovada −10 a −20%); > 182 dias (26 sem) → refazer nível e calibrar a partir de −20% (consenso). Força cai em proporção à pausa (Bosquet 2013, 103 estudos, **robusta** para força); idosos: 12–24 semanas sem queda significativa, 31–52 com queda (Grgic 2022, moderada). 3 semanas sem treino não tiraram músculo (Ogasawara 2011/2013, moderada, mesmo grupo). Razão da volta gradual: **evitar dor e dano**, não recuperar músculo.
- Semana do programa conta semanas com treino, não calendário (decisão, [opinião]).
- Manter com 1 sessão/semana, 1 série por exercício (32 semanas em jovens) → "um treino na semana não é pausa" (Bickel 2011 um estudo; Spiering 2021 narrativa).
- Evolução: melhor série por sessão, recordes, sem 1RM estimado (fórmulas divergem 15–52 pontos acima de 12 reps) (07 §5, consenso).

**(b) Fontes**
Plotkin 2022 (36199287), Moesgaard 2022 (35044672), Grgic 2017b (28848690), Zhang 2021, Huang 2025, Heredia-Elvar 2022, Halperin 2022, Zourdos 2021, Remmert 2023, Bermúdez Droguett 2025, Mayhew 1995/2008, Reynolds 2006, Abdul-Hameed 2012, Nuzzo 2024, Glass & Stanton 2004 (15142014), Coleman 2024 (38274324), Pancar 2026 (41730991), Rogerson 2024 (38499934), Hwang 2017 (28328712), Ogasawara 2011 (21771261) e 2013 (23053130), Chen 2012 (21611825), Bosquet 2013 (23347054), Grgic 2022 (36360927), Bickel 2011 (21131862), Spiering 2021 (33629972), Heidel 2022, Haugen 2023, Saeterbakken 2011/2025, Langford 2007, Cotterman 2005, Rossi 2018, Zourdos 2015, Nascimento 2013, Rutherford & Jones 1986, Grgic 2020 (32681399). Todas resumo-PubMed; as fórmulas originais de 1RM NÃO VERIFICADAS.

**(c) Pontos fracos**
- Aplicação medida pelos autores: o app hoje **não detecta pausa** (volta com 16–20 séries após 30 dias) (07 §0 [medido]); as regras propostas ainda não estão no código (marco R2).
- **Nenhum estudo testou** regra de calibração, regra de volta de pausa durante o uso, nem "−10% / −15% / −20%": consenso do projeto (07 §9). O −15% foi escolhido pelo projeto (06 propôs −10% p/ 3–8 sem e −10 a −20% p/ > 8; 07 fixa −15% para 8–26 semanas e −20% acima).
- Pausas só testadas em jovens; > 65 anos perdem mais força e precisam de mais para manter, mas **o app não pergunta idade → sem regra** (06 §2, §12; 07 §9).
- Cansaço: não há medida validada; o toque "leve/normal/pesado demais" é proposta (07 §9).
- Tabela de Nuzzo 2024 não lida; fórmulas originais não verificadas.
- Lally 2010 (hábito) não achado: não citado.
- Platô: o que fazer quando a progressão trava (além de "semana leve sugerida") **não tratado**. Progressão de longo prazo (anos), de mini-ciclos/blocos e de mudança de faixa de repetições: não tratado. Progressão para exercício de elástico e peso do corpo é só "degrau" (escada), sem estudo.
- Conversão entre aparelhos: estudos de supino e agachamento, jovens; sem fórmula leg press ↔ hack ↔ agachamento (09 §5). Quanto a experiência no A encurta a calibração no B: sem estudo.
- Efeito de "a sua semana" sobre o hábito só aparece no uso real (R3).

---

## Tema 7. Pouco equipamento e peso do corpo; manter estímulo para quem é forte

**(a) Conclusões**
- Máquina = peso livre: base para o gerador tratar equipamentos como equivalentes (02, 04, 09).
- Flexão de braço ≈ supino com carga equivalente a ~40% de 1RM (Kikuchi 2017, um estudo) (04, peito).
- Hip thrust/ponte como opção de glúteo com pouca carga no joelho (04).
- Isoladores obrigatórios só "quando o equipamento permite" (extensora, tríceps acima da cabeça, panturrilha em pé) (04 §3).
- Sem equipamento, vaga vazia: aviso (`equipamento.sem-ancoragem` em 46,1% dos programas da grade), `tempo.sobra` (33,5%); subir séries até 10/sessão e 20/semana é a via com evidência; **nada preenche costas/bíceps/ombro posterior sem algo para puxar** (14 §4, P3(iv): moderada; (ii)/(iii) consenso) (14).
- Modelo `ct-6x` proposto para 6 dias sem puxar (14 P4, consenso).
- 1 série a 70–85% 1RM 2–3×/semana ainda ganha força em treinados (12 P2); programas "lanche de exercício" sem equipamento melhoram força e função (Fyfe 2022, narrativa; 14 2b).
- Escada de carga leve: `equipamento.escada-carga-leve`, degraus (peso do corpo: "descida de 3 s", elástico mais forte) (07, 09), sem fonte lida neste conjunto.

**(b) Fontes**
Kikuchi & Nakazato 2017 (29541130), Plotkin 2023, Fyfe 2022 (34822137), Iversen 2021, Pelland 2026, Remmert 2025, Zaroni 2019 (31260419, 5×/semana).

**(c) Pontos fracos**
- **Não tratado:** até onde o peso do corpo vai (quando deixa de ser estímulo suficiente), como manter estímulo para quem é forte só com peso do corpo (unilaterais, excêntricos lentos, pausas, parciais alongadas, rest-pause, mais séries/RIR 0), progressões de flexão/barra/pistol. Existe só a escada de degraus mencionada e o relato de que no "vazio" 14,1 de 32 vagas ficam vazias (14 §2).
- A conta de 14 P3(iv) (mais de 4 séries no mesmo exercício) vai contra `volume.series-por-exercicio` (2–4, consenso); exige decisão do Gustavo.
- A evidência de baixa carga (≈ mesma hipertrofia com 6–30 reps) é a base implícita, mas 04/14 não discutem o risco de falha/segurança de cargas leves a muitas repetições em peso do corpo, nem o erro maior do RIR acima de 12 reps (07 §2.1) aplicado a flexões longas.
- Tamanho do problema para iniciantes sem equipamento: não avaliado nos 10 arquivos; só os números da grade.
- 09 §2: carga em kg não é possível com elástico/peso do corpo; calibração por passos (consenso).

---

## Tema 8. Pessoas diferentes (o que muda no treino × o que é só da triagem)

Regra geral em 06: **para quase todos os grupos a prescrição de hipertrofia não muda; muda o ponto de partida e o texto** (06 Resumo 1). O app **não pergunta sexo nem idade** (decisão do Gustavo, LGPD).

| Grupo | O que muda NO TREINO | O que é só da triagem/texto | Selo e fonte |
|---|---|---|---|
| Iniciante | Fase de aprendizado 2–3 semanas, RIR 3–4, volume no mínimo da faixa; o começo leve serve para **passar a fase de dano sem dor forte** (não porque "cresça com menos"). Calibração começando leve; estabilidade como desempate; superséries só da 3ª semana. | — | `iniciante.fase-aprendizado`: **consenso** (Damas 2016, 10 homens, um estudo; Chen 2012 um estudo); ACSM 2026 ≥ 10 séries sem separar por experiência (moderada) (06 §1) |
| Mulheres | **Nada** (mesmas regras, app não pergunta sexo). | Texto de segurança de montagem (peso que cai: Coffey 2026) | Ganho relativo igual: **robusta** (Refalo 2025, Roberts 2020); ganho relativo de força maior em cima: moderada; reps × %1RM quase igual por sexo: moderada (Nuzzo 2024) (06 §3). Bíceps na Scott em mulheres treinadas (Zabaleta-Korta 2023) e panturrilha parcial em mulheres jovens: um estudo cada |
| 60+ | **Hoje: nada** (o app não pede idade). Se a idade entrar [opinião]: readaptação desde 2 semanas, frase "subir rápido, descer controlado" (potência), preferência por máquinas | — | Força recomendada: **robusta** (diretrizes NSCA, ICFSR, OMS); volume baixo já bom: **moderada** (Radaelli 2025, 151 ensaios); potência: moderada (ACSM 2026); pausa pesa mais: robusta para força (Bosquet 2013); manutenção pede 2 sessões e 2–3 séries (Spiering, narrativa); idosos que param 12–24 semanas não perdem significativamente: moderada (06 §4, 07 §3, 15 1a) |
| Sobrepeso/obesidade | **Nada** no treino: "mesmo programa" no cutting; ao perder peso, músculo cresce menos, a força sobe (12) | Texto: dieta decide a perda de peso (fora do app); não perguntar peso/calorias (LGPD, risco de transtorno alimentar) | Treino de força protege massa magra na dieta e aumenta perda de gordura: **robusta** (Binmahfoz 2025, Deller 2026, Lopez 2022; população com sobrepeso/obesidade); detalhes consenso. Sobrepeso fora disso (articulações, escolha de exercício, intensidade cardiovascular): **não tratado** |
| Volta de pausa longa | Sim: volta gradual (ver Tema 6) | Mensagem de boas-vindas sem culpa | Ver tema 6 |
| Dor articular (genérico) | Excluir exercícios que carregam a região marcada (`seguranca.triagem.osteoarticular`, consenso); escala 0–10; alerta "dor aguda, formigamento, perda de força → encerra o exercício, oferece alternativa, recomenda avaliação"; dor 3–5 em 2 sessões → semana leve + aviso; dor ≥ 3 manda sobre a calibração; "reduzir 10–20%" com dor 4/10 | Triagem pergunta 6 (osso/articulação): marca região, não bloqueia | **consenso** (prática clínica, sem ensaio); exercitar com dor tolerável não piora dor crônica em contexto supervisionado (Smith 2017, moderada indireta) (06 §7) |
| Ombro | Desequilíbrio empurrar/puxar (Kolber: associação com impacto subacromial; elevação lateral/remada alta > 90°; rotadores externos fracos protetores) → nunca empilhar empurrar sem puxar; "até 36% das lesões de musculação são no ombro" (retrospectivo) | — | **consenso** com apoio de caso-controle (14 6f) |
| Joelho, lombar, cotovelo, punho, quadril, tornozelo, pescoço | **Não tratados individualmente.** Só: "lesões mais frequentes: ombro, lombar, joelho, cotovelo, punho" (Keogh 2017, moderada); hip thrust "com pouca carga no joelho" (04); "ângulos proibidos: o app não usa" (06 §7) | — | Não tratado |
| Pressão alta | Texto: respiração contínua e RIR ≥ 2 nos multi pesados **[opinião, consenso]** (**proposta, não aplicada**) | Triagem atual junta "coração ou pressão alta" e bloqueia: mais rígida que ACSM 2015 / AHA 2023; proposta de separar e perguntar "controlada e sem restrição médica?" **registrada, não aplicada** (decisão do Gustavo, sem profissional de EF) | Musculação baixa a pressão −4,6/−3,0 mmHg: **robusta** (Edwards 2023, 270 ensaios); igual ao aeróbio em hipertensos: moderada (Morita 2025); segura: robusta (AHA 2023 via Paluch 2024, Pescatello 2019); pico durante a série (320/250 mmHg, n = 5, MacDougall 1985): um estudo; ACSM 2015 tirou a pressão alta da triagem: consenso (diretriz, `riebe2015` não abriu na auditoria de 05/11) |
| Gestação | **Hoje: bloqueio até liberação** (mais rígido que as diretrizes). Se aplicada a proposta: adaptações [consenso]: evitar risco de queda/pancada na barriga, preferir máquina/apoio, trocar exercício deitado de costas se tontura | Pergunta 8 e acompanhamento "pré-natal sabe e não restringiu?" (proposta não aplicada). O "6 meses" de pós-parto **não tem fonte lida** | Exercício seguro e desejável sem contraindicação: **robusta** (ACOG 2020, diretriz canadense 2019, OMS 2020); musculação: moderada (Mottola 2019, Petrov Fieril 2015, O'Connor 2011); carga pesada: um estudo cada (Moolyk 2025, 10 gestantes; Prevett 2023); deitada de costas: evidência insuficiente (Mottola 2019 BJSM, "um estudo"/muito baixa); contraindicações: **consenso**. OMS: dispensa liberação só p/ atividade leve/moderada; hipertrofia perto da falha é vigorosa (06, leituras de 05/11) |
| Doença crônica / remédio | Nada | Triagem atual mais ampla que ACSM 2015 (cardiovascular, metabólica, renal) | Proposta registrada (diabetes/rim com acompanhamento) |

**(b) Fontes principais:** Refalo 2025 (40028215), Roberts 2020 (32218059), Nuzzo 2024, Radaelli 2025, Fragala 2019 (31343601), Izquierdo 2021 (34409961), Dent 2018 (30498820), OMS 2020/Bull (33239350, texto completo 05/11), ACOG 2020 (32217980), diretriz canadense (30337460, 30297272), Mottola 2019 (30337348), Meah 2020 (32513676), Petrov Fieril 2015, O'Connor 2011, Moolyk 2025, Prevett 2023, Edwards 2023, Morita 2025, Paluch 2024, Pescatello 2019, MacDougall 1985, Riebe 2015 (26473759, não aberto), Warburton 2011 (21800945, sem leitura; a frase atribuída está em Bredin 2013, lida), Keogh 2017, Kerr 2010, Coffey 2026, Lauersen 2014, Damas 2016, Chen 2012, PAR-Q+ 2025 (texto lido, licença não permite incorporar o texto), guia MS 2021 (PDF lido em 05/11), Barroso 2021 (33909761, sem resumo, **não lido**), CONFEF 436/2022 e 617/2026 (**não lidas**).

**(c) Pontos fracos**
- **Triagem:** 06 §9 está "registrada, não aplicada" e **espera profissional de Educação Física**; a triagem atual é mais rígida que as diretrizes para pressão controlada, gestação sem complicação e doença crônica estável (06 §8). Nenhum número de pressão do PAR-Q+/Barroso 2021 foi lido; nenhuma lista de contraindicações da gestação foi lida.
- **Não tratado:** lombar, joelho, cotovelo, punho, quadril, tornozelo, pescoço (nenhum exercício a evitar/trocar por articulação, nenhuma gradação de volta ao treino com dor); sobrepeso/obesidade em termos de carga articular; diabetes; pós-parto (além do "6 meses" sem fonte); osteoporose; deficiências (o guia MS tem capítulo, não lido).
- Idade: acima de 65 anos pausa pesa mais, manutenção pede mais, mas o app não pergunta idade → sem regra (06 §12). Os números de NSCA/ICFSR para idosos **não estão nos resumos: NÃO VERIFICADO**.
- "Mulheres": prescrição igual é decisão do projeto com base em ganho relativo; efeitos por fase do ciclo, menopausa e gestação no treino: não tratados. Absoluto: homens ganham um pouco mais em cima do corpo.
- Respiração contínua/RIR ≥ 2 para hipertensos: consenso, "sem ensaio que teste a regra".
- Dados de lesão de recreativos no Brasil: inexistentes (06 §12). Estudo de pronto-socorro (Kerr 2010) é descritivo, EUA, 1990–2007.
- Estudos de pausa: curtos, quase todos homens jovens; sem protocolo de volta testado.
- Treino pesado em mulheres treinadas, idosos e gestantes: poucas fontes.

---

## Tema 9. Outros objetivos dentro da força (manter músculo na dieta, força máxima, saúde)

**(a) Conclusões (12)** — Pergunta de objetivo entrou no MVP desde 04/11/2026 (CLAUDE.md); 12 é proposta/recomendação (b na versão mínima), "nada aqui muda regras.md".
- **Cutting:** mesmo programa; treino de força na dieta protege massa magra e aumenta perda de gordura: **robusta** (3 meta-análises: Binmahfoz 2025 25 ECRs; Deller 2026 34 ECRs, +0,87 kg massa magra, evitou ~46% da perda; Lopez 2022 114 ensaios) — todas em pessoas com **sobrepeso/obesidade**. No déficit, músculo cresce menos, força segue (Murphy & Koehler 2022, ES −0,57 hipertrofia, −0,31 força; ~500 kcal/dia impediu ganho de massa magra): **moderada**. Treino de força sozinho tira um pouco de gordura (Wewege 2022): moderada. Em treinados magros: 3 séries ≈ 5 séries por exercício (Roth 2023, 38 homens, 6 semanas): **um estudo**; revisão de 15 estudos (Roth 2022): evidência insuficiente para volume maior: **consenso**. Carga, frequência, falha e descanso **durante** o déficit: **nenhum ensaio achado** (buscas 25–27 vazias após limite de pedidos); recomendação de especialistas (Helms 2015): cada músculo ≥ 2×/semana, 6–12 reps, 1–3 min, falha limitada nos multi: **consenso** ("é, em essência, o que o app já faz"). Aeróbio concorrente não reduz hipertrofia (Schumann 2022, 43 estudos): moderada; reduz força explosiva.
- **Força máxima:** cargas ≥ 80% 1RM, amplitude completa, 2–3 séries, exercício no começo da sessão, ≥ 2 sessões/semana (ACSM 2026): **robusta**; descanso > 2 min em treinados (Grgic 2018a): **moderada**; frequência ajuda força via volume (Grgic 2018b, 22 estudos, ES 0,74→1,08; moderada); dose mínima 1 série × 6–12 reps, 2–3×/semana (Androulakis-Korakakis 2020): moderada; especificidade do teste: um estudo; periodização: **ponto em aberto**. Proposta: nos 1–2 primeiros compostos do dia, faixa 4–6 ou 5–8 reps com 2–3 min de descanso para intermediário/avançado (faixa exata e quais exercícios = **consenso**); RIR ≥ 2 em barra livre pesada sem ajudante (consenso).
- **Saúde:** o app cumpre a parte de força (OMS 2020: fortalecimento regular todas as idades; ACSM 2011 Garber: 2–3 dias/semana cada grande grupo): **consenso (diretriz)**; falta aeróbio 150–300 min (moderado) ou 75–150 (vigoroso), equilíbrio, flexibilidade e treino de potência para idosos (ACSM 2026, robusta p/ benefícios). ~30–60 min/semana de força associados ao maior benefício: **moderada** (Momma 2022, coortes, associação). Só 22,8% dos adultos treinam força 2×/semana (Ren 2024); 17% cumprem força + aeróbio (Garcia-Hermoso 2023).
- **Fora do MVP** (CLAUDE.md): nutrição, cardio prescrito, corrida/esportes, powerlifting.

**(b) Fontes**
Binmahfoz 2025 (40909191), Deller 2026 (42144246), Lopez 2022 (35191588), Wewege 2022 (34536199), Murphy & Koehler 2022 (34623696, **releitura do resumo em 04/11 conferiu os números**), Roth 2023 (36114738), Roth 2022 (35146569), Helms 2015 (24998610), Schumann 2022 (34757594), ACSM 2026, Schoenfeld 2017b, Lopez 2021, Currier 2023, Grgic 2018a (28933024), 2018b (29470825), Androulakis-Korakakis 2020, Dankel 2017, Nunes 2021, Moesgaard 2022, Bull 2020 (33239350), Garber 2011 (21694556), Umpierre 2022 (35418515), Momma 2022, Ren 2024, Garcia-Hermoso 2023. Todas resumo-PubMed; "ACSM 2026, Grgic 2018a e Bull 2020: lidos pela pesquisadora, não relidos" (12 cabeçalho). **NÃO VERIFICADO (só título, nada usado):** Helms 2014 proteína (24092765), ISSN 2026 (42867412), Weinheimer 2010 (20591106), 26817506, 41093698, 38652410, ISSN 2017 (28630601).

**(c) Pontos fracos**
- Os resultados de cutting vêm de **população com sobrepeso/obesidade**; em treinados magros há um estudo só com homens (Roth 2023, 6 semanas) e uma revisão inconclusiva.
- "O treino do app serve para cutting" é inferência: sem ensaio sobre volume/carga/frequência/falha no déficit; buscas vazias por limite de pedidos "não provam" inexistência.
- Números de proteína e calorias: **NÃO VERIFICADOS**; excluídos; nutrição fora do MVP. Quanto do músculo perdido é água/glicogênio: não pesquisado. Idosos em dieta: não verificado.
- Força máxima: faixa exata (4–6 vs 5–8), quais exercícios e a conversão repetições↔%1RM **consenso/não lida**; força em mulheres treinadas e idosos: poucas fontes; risco de 3–5 reps perto da falha sem ajudante: não pesquisado; periodização: dois resumos divergentes.
- OMS 2020: o detalhe "≥ 2 dias, grandes grupos" não estava no resumo (depois confirmado em 06 após texto completo em 05/11 — "2 ou mais dias por semana"); guia MS 2021: números não abertos em 12, abertos em 06 (a ordem dos arquivos importa).
- Se a divisão clássica (1×/semana por músculo) cumpre "cada grupo 2×" das diretrizes: ambíguo (12 §3.2).
- "Quanto a musculação conta como aeróbio": não pesquisado.
- Seleção de objetivos "manter o músculo": as quatro respostas (ganhar, manter na dieta, mais forte, saúde) estão no CLAUDE.md, mas 12 é anterior à decisão e as regras `objetivo.*` são "só propostas".

---

## Tema 10. Adesão (duração, variedade, sensação de progresso, gostar do treino)

**(a) Conclusões**
- Autorregistro é a técnica que mais explica a diferença entre programas; registro + meta/retorno/revisão da meta: efeito maior (0,42 vs 0,26) — Michie 2009, 122 avaliações, 44.747 pessoas: **moderada** (07 §4.2).
- Acompanhar o progresso ajuda a atingir a meta, maior quando registrado: d = 0,40 (Harkin 2016, 138 ensaios): **moderada**.
- Retorno sobre o registro: d = 0,73, intervalo largo, risco de viés: **moderada (fraca)** (Krukowski 2024).
- App sozinho não substitui conversa com pessoa (Vetrovsky 2022): moderada.
- Hábito: mediana 59–66 dias, 4–335; frequência e escolha própria fortalecem (Singh 2024; Keller 2021): moderada (20 estudos com risco de viés).
- Academia: ~4×/semana por 6 semanas é o mínimo para formar hábito (Kaushal 2015); regularidade, simplicidade, ambiente e **gostar do treino** previram o hábito; ensaio de "gatilhos" aumentou atividade em 8 semanas (Kaushal 2017): **um estudo cada**.
- Num app de treino (389.481 usuários): só **10,1% dos iniciantes** ainda treinavam ≥ 1×/semana em 12 meses; mediana de abandono 19 semanas; **regularidade nos primeiros 28 dias** prediz continuar (Conti 2026): **um estudo** (observacional).
- Duração/variedade: variar de forma sistemática melhora hipertrofia regional; variação **aleatória** mais motivação (Baz-Valle 2019: um estudo, 21 treinados). Não há estudo de adesão por tipo de divisão (01 "o que fica sem resposta"; 01 diz "evidência sobre adesão é fraca", `docs/pesquisa/09-decisões-m3.md`). Dar escolha aumenta autonomia (01).
- Critério "faltas": ABC/ABCD 1×/semana → faltar a perna é uma semana inteira sem perna **[opinião]** (01).
- Desenho do app para adesão (07 §4): "a sua semana" (treinos feitos × planejados, séries por músculo × meta, semanas com treino "6 das últimas 8", sem sequência que zera, sem comparação, mensagens sem culpa, revisão da meta após 3 de 4 semanas abaixo): **consenso** (`acompanhamento.*`, desenho do projeto). 1 treino/semana já conta; 2 treinos/semana é mais do que 3 em 4 adultos fazem (Ren 2024, moderada).
- Sessões mais curtas, falta de tempo como barreira mais citada (14 6d, consenso).

**(b) Fontes**
Michie 2009 (19916637), Harkin 2016 (26479070), Krukowski 2024 (38178230), Vetrovsky 2022 (36396151), Singh 2024 (39685110), Keller 2021 (33405284), Kaushal 2015 (25851609) e 2017 (28188586), Conti 2026 (42638731), Ren 2024 (39040428), Garcia-Hermoso 2023 (36418149), Momma 2022, Baz-Valle 2019, Iversen 2021, Fyfe 2022.

**(c) Pontos fracos**
- As meta-análises de hábito são de atividade física geral, **quase nunca de musculação** (07 §9). Mais fraco: Krukowski 2024 (risco de viés), Singh/Keller (risco de viés), Conti 2026 (observacional).
- Efeito de "a sua semana" no uso real só no R3.
- Lally 2010 não achado → não citado.
- **Não tratado:** duração ideal de sessão para adesão, efeito da variedade de exercícios sobre adesão (só um estudo de motivação em treinados), efeito de animação/guia na adesão, efeito de dar escolha da divisão (afirma-se "evidência fraca"), gamificação, social (fora de escopo).
- A quantificação "~4×/semana por 6 semanas" é de academia geral e conflita com os 2–3 dias do app: não discutido.
- Quem abandona antes de 28 dias: nenhum desenho do app testado.

---

## Tema 11. Diretrizes e posicionamentos (quais foram usados e nível de leitura)

| Diretriz | Uso | Nível de leitura e observação |
|---|---|---|
| **ACSM 2026** (Currier et al., 41843416) | ≥ 10 séries/semana; carga alta → força; ordem; falha, equipamento e periodização não mudam consistentemente; potência; "2 sessões/semana"; exercícios no começo da sessão | **resumo-PubMed** em 01, 02, 05, 06 (§1–7), 12; **texto-completo** (PMC12965823, via Europe PMC) em 14 e na leitura de 05/11 em 06. Posicionamento abrange 137 revisões, >30.000 pessoas |
| **ACSM 2009/2011** (`acsm2009` 19204579; Garber 2011 21694556) | "8–10 exercícios por sessão, 1–4 séries" (14 1a); "2–3 dias/semana cada grande grupo", aeróbio, neuromotor, flexibilidade (12) | resumo-PubMed (14 diz que o trecho foi lido via ACSM 2026) |
| **ACSM 2015** (Riebe 2015, 26473759) | Triagem pré-participação sem fatores de risco | **resumo lido; texto não abriu** (06 leituras 05/11) |
| **OMS 2020** (Bull, 33239350) | Fortalecimento ≥ 2 dias, gestação, doenças crônicas, 150–300 min aeróbio | resumo-PubMed; **texto completo lido em 05/11** (06) |
| **Guia MS 2021** (`ms2021`; Umpierre 2022 35418515) | Triagem mais rígida que a diretriz; musculação na gestação com acompanhamento; contraindicações (p. 43) | PDF oficial **lido em 05/11** (06); 12 (04/11) ainda diz "não aberto" |
| **PAR-Q+ 2025** (`parq2025`) e versão pt-BR (`schwartz2021`) | Estilo da triagem; adiar na gravidez e doença aguda | texto lido em 05/11 com os termos; licença não permite incorporar texto oficial |
| **NSCA** (Fragala 2019, 31343601) | Idosos | resumo-PubMed; números **NÃO VERIFICADOS** |
| **ICFSR** (Izquierdo 2021 34409961; Dent 2018 30498820) | Sarcopenia | resumo-PubMed; números **NÃO VERIFICADOS** |
| **ACOG 2020** (32217980), **diretriz canadense 2019** (30337460, 30297272, 30337348), Meah 2020 | Gestação | resumo-PubMed; listas completas de contraindicações/sinais **não lidas** |
| **AHA 2023** (via Paluch 2024 38059362), **Pescatello 2019** (31095088) | Segurança da musculação, pressão alta | resumo-PubMed |
| **Barroso 2021** (diretriz brasileira de hipertensão, 33909761) | — | sem resumo; **não lida**; nenhum número de pressão no app |
| **CONFEF 436/2022 e 617/2026** | — | site não abre; **não lidas** |
| **IUSCA** (Schoenfeld 2021, DOI 10.47206/ijsc.v1i1.81) | "Quantos grupos priorizar" (15) | **só o registro conferido; conteúdo não lido** |
| **ISSN 2026** (42867412), **ISSN 2017** (28630601) | Nutrição no déficit | **NÃO VERIFICADO**, só título |
| **Helms 2015** (recomendações p/ fisiculturistas naturais) | Cutting | resumo; conta como consenso |
| **NSCA (manuais de certificação)** | Citado na hierarquia de 00-metodo (nível 3) | nenhum manual lido nestes arquivos |

**(c) Pontos fracos:** 00-metodo avisa que posicionamentos "misturam evidência e opinião e às vezes relatam a literatura de forma seletiva" e que ACSM 2026, NSCA e PAR-Q+ "não servem como fonte de números até a leitura do original" (política de pendências 5). Mesmo assim vários selos de 12 e 02 dependem do ACSM 2026 lido em resumo. Pendências de 12: abrir texto completo de ACSM 2026, Grgic 2018a, Bull 2020 e PDF do guia MS antes de virar constante. Há divergência de status entre arquivos (ACSM 2026; guia MS; OMS) por datas diferentes. Não tratados: ACSM 2009 em detalhe, NSCA 2016 (Essentials), Diretrizes brasileiras de atividade física para idosos além do guia MS, SBC/SBEM.

---

## Tema 12. Como bons treinadores montam programas (consenso de treinadores)

**(a) O que foi usado como "consenso de treinadores"** (selo consenso por definição de 00-metodo: prática, Delphi, manuais, raciocínio do projeto)
- 01: critérios de escolha da divisão (frequência mínima, dias, faltas **[opinião]**, preferência); `divisao.recomendacao` e `divisao.seis-dias` (decisão do projeto).
- 04: função da vaga, 2 exercícios por músculo grande, 2–4 séries por exercício; escolha para costas, ombro posterior, crucifixo, abdômen e abdução (consenso; "não achei ensaio").
- 05: modelo de tempo, escada de cortes (parcialmente moderada), calibração pelo tempo real.
- 06: parar com dor aguda, escala de dor, excluir exercícios por região, montagem segura: consenso.
- 07: dupla progressão e números "2 sessões/topo da faixa" (de treinadores); semana leve: gatilhos de **pesquisa com 246 atletas** (Rogerson 2024: consenso por pesquisa de opinião); calibração; mensagens.
- 09: regras de troca e preferência: consenso do projeto.
- 12: faixa de força, descanso, textos de objetivo: consenso; Helms 2015 como consenso de especialistas de fisiculturismo natural para o cutting.
- 14: 5–7 exercícios/sessão (prática de treinadores e ACSM 2009), razão puxar/empurrar (consenso + caso-controle), vagas de modelo; 14 6c: teto de 4 séries/exercício.
- 15: "1 a 2 grupos por bloco" e "3 prioridades" = prática comum de fisiculturismo **sem fonte verificada** (consenso); redação "foco + manutenção".
- Iversen 2021 e Fyfe 2022 (revisões narrativas com Schoenfeld) para treinos eficientes.

**(b) Fontes:** `consenso-projeto` (chave interna descrita em `fontes.md`, que não foi lida aqui), Helms 2015, Iversen 2021, Fyfe 2022, Rogerson 2024, posicionamento IUSCA (não lido), ACSM 2009.

**(c) Pontos fracos**
- **Não há consulta sistemática a treinadores nem painel Delphi** em nenhum dos 10 arquivos: o "consenso" é majoritariamente inferência do projeto (`consenso-projeto`). Não tratado: se treinadores brasileiros/certificadores (CONFEF, NSCA-CPT) montam programas assim; também não há comparação com programas reais (o `referencia/programa-fase-1.md` é histórico, o critério "≥ 80% do programa de referência" foi substituído por "só usa regras com selo e fonte" — 01 §6).
- 06 e 01 declaram explicitamente que **sem profissional de Educação Física no projeto** as regras de triagem ficam como estão: a revisão por profissional é a pendência estrutural.
- Rogerson 2024 é pesquisa de opinião com atletas (não prescrição para o público do app).
- Muitos números críticos (alvos por nível, tetos, pisos, `volume.semanal.alvo` prioritário 8/12/14) são consenso e não aparecem justificados nestes arquivos.

---

## Tema 13. Críticas a treinos gerados por aplicativo

**Não tratado** nos 10 documentos lidos + 00-metodo. Nenhum arquivo avalia literatura sobre limitações de apps/IA de treino (qualidade, segurança, personalização, viés). O mais próximo:
- 01 §6: troca do critério "gerador repete ≥ 80% do programa de referência" por "só usa regras com selo e fonte e revisão independente confere a montagem contra esta pesquisa".
- 07 §4.2: **não há evidência de que um app sozinho substitua uma pessoa acompanhando**; conversa com pessoa ajudou mais que sites, apps ou prêmios (Vetrovsky 2022, moderada); "a expectativa deve ser modesta [opinião]".
- 07 §4.2 / Conti 2026: 10,1% dos iniciantes de um app seguem em 12 meses (um estudo, observacional).
- 14/15: auditoria interna da grade de 911.625 programas (`docs/revisoes/qualidade-treinos.md`, `docs/revisoes/qualidade/grade.md`, não lidos aqui) mostrou defeitos do próprio gerador (6 dias sem puxar, vagas vazias, prioridades que competem, `tempo.uso-baixo` em 37,3%), mas isso é autocrítica, não literatura.
- 06 §7: acidentes de pronto-socorro (Kerr 2010, Coffey 2026): orientar montagem/execução. Não relacionado a apps.

---

## Tema 14. O que aplicativos de referência fazem

**Não tratado** nos documentos lidos. Nenhum dos 10 arquivos nem 00-metodo descreve apps como Fitbod, JEFIT, Strong, Hevy, Freeletics, Nike Training Club etc. Só aparece: o "programa de referência" interno (`referencia/programa-fase-1.md`, histórico, "serve de comparação, não de premissa") e o "guia original" (`referencia/qa/check-motor.cjs`), que são do próprio projeto e não são apps de mercado. (Não busquei fora dos arquivos pedidos; pode haver análise de concorrentes em `docs/pesquisa/` ou `docs/pesquisa-v2/03/08/10/11/13`, que não estavam no escopo.)

---

## As 25 perguntas mais importantes sem resposta ou com resposta fraca
(em ordem de importância para a qualidade de um programa gerado para qualquer pessoa, do iniciante de 65 anos ao avançado sem equipamento)

1. **Qual o volume semanal certo por nível (iniciante, intermediário, avançado) e por músculo?** Os alvos por nível e o prioritário 8/12/14 são consenso; Schoenfeld/Pelland dão a direção, não o número por nível, e o teto de ~10 por sessão é um único preprint (01, 15, 14).
2. **O que mudar no treino (e na triagem) para quem tem dor em joelho, lombar, cotovelo, punho, quadril, tornozelo ou pescoço?** Só há "excluir exercícios que carregam a região" (consenso) e ombro com apoio de caso-controle; as outras articulações: não tratadas (06 §7).
3. **A triagem atual (que bloqueia pressão alta, gestação, qualquer doença crônica/remédio) é a certa para o app?** Está mais rígida que as diretrizes (06 §8) e a proposta de revisão está **não aplicada** até um profissional de EF revisar; faltam limites de pressão (Barroso 2021) e listas de contraindicações da gestação.
4. **Como o app deve tratar quem tem 60+ sem perguntar a idade?** Pausa pesa mais, manutenção pede mais, volume baixo basta, mais máquinas, potência; nenhuma regra (06 §4, §12; 07 §9).
5. **Como manter estímulo suficiente para um avançado só com peso do corpo/elástico?** Não tratado: progressões, excêntrico, unilateral, parcial alongada, séries até RIR 0 e erro do RIR > 12 reps.
6. **Até onde vai o peso do corpo para um iniciante sem equipamento (flexão, barra, agachamento)?** Só Kikuchi 2017 (flexão ≈ supino a 40% 1RM); nada sobre quando deixa de bastar.
7. **O que fazer quando não há como "puxar" (costas, bíceps, ombro posterior sem equipamento)?** Não existe preenchimento apoiado; só aviso e risco de desequilíbrio ombro (consenso + caso-controle) (14).
8. **Qual a faixa de repetições e o RIR certos por tipo de exercício e equipamento (compostos, isoladores, peso do corpo, elástico), e o erro do RIR > 12 reps invalida os isoladores de 10–20?** Faixas por tipo não justificadas nos arquivos; RIR erra ~1 rep e mais acima de 12 (07 §2.1).
9. **A calibração da carga na 1ª série e as regras de volta de pausa (−10/−15/−20%) funcionam?** Nenhuma testada; tudo consenso (07 §9).
10. **O teto de ~10 séries por sessão e a frequência mínima (ceil(meta/10)) valem?** Um único preprint, sem revisão por pares (01, 15, 14).
11. **Como lidar com quem tem sobrepeso/obesidade no treino em si (carga articular, escolha de exercícios, intensidade)?** 12 só trata cutting em sobrepeso (composição corporal), não a prescrição; sem triagem de transtorno alimentar.
12. **Como tratar platô além de sugerir semana leve?** Não tratado; só estagnação como gatilho.
13. **Quando e como aliviar (deload) em quem treina vários meses?** Sem estudo que mostre benefício; gatilhos (cansaço, dor repetida, 2 exercícios estagnados) são consenso; sem medida validada de cansaço (07 §6, §9).
14. **A gestante pode treinar de verdade no app?** Hoje bloqueada; as adaptações propostas são consenso e as listas de sinais/contraindicações não foram lidas (06 §5, §9); "6 meses pós-parto" sem fonte.
15. **O que a pessoa precisa fazer para continuar treinando (duração da sessão, variedade, gostar)?** Só registro+meta+retorno (moderada) e estudos observacionais; nada específico de musculação, nada de app de treino com intervenção testada (07 §4.2, §9).
16. **Qual a ordem e a interferência entre exercícios por fadiga de lombar, pegada e mesmo músculo em dias seguidos?** Não tratado (só ordem × hipertrofia = igual).
17. **Quanta variedade de exercícios é ideal ao longo de meses?** "Sistemática, 4–8 semanas, variação dentro da função": moderada para direção; sem número (04, 14).
18. **Para "ficar mais forte": faixa 4–6 vs 5–8, descanso e periodização para força em treinados e iniciantes?** Direção robusta, números consenso; periodização em conflito; risco sem ajudante não pesquisado (12 §2.3).
19. **Para quem está em dieta, treinado e magro, o volume/carga/falha mudam?** Um estudo (Roth 2023) + revisão inconclusiva; buscas vazias por limite de pedidos (12 §1.4).
20. **O treino de hipertrofia perto da falha é seguro para pressão alta controlada, e como ajustar?** Respiração contínua + RIR ≥ 2 é consenso sem ensaio; picos de pressão só em n = 5 (06 §6).
21. **Como o app deve tratar a superset/drop set/rest-pause em iniciantes e 60+?** "Iniciante só da 3ª semana" é [opinião]; técnicas avançadas testadas em jovens/treinados por 8–12 semanas (05 §7).
22. **A seleção para costas, ombro posterior, abdômen, abdução e crucifixo tem base?** Consenso, sem ensaio (04 §5).
23. **A prioridade de um grupo traz quanto de ganho e quantos grupos priorizar?** +2 a +3 pontos em 8–12 semanas (conta do projeto, coeficientes moderados); "1 a 2 por bloco" sem fonte; sem ensaio de especialização em treinados (15).
24. **Quanto dura de fato uma sessão (modelo de tempo) e o que cabe em 30/45/60 min?** Nenhum estudo valida; calibração só depois de 3 sessões (05, 14).
25. **Quais são as dores/lesões reais de recreativos no Brasil e o que um app deveria exigir de montagem/segurança?** Sem dados brasileiros; base é pronto-socorro dos EUA (Kerr 2010, Coffey 2026); lacuna adicional: diretrizes/pareceres de profissionais brasileiros (CONFEF, guia MS) só em parte lidos.

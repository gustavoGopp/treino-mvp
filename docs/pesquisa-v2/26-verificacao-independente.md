# Verificação independente das afirmações centrais

> **Tema 26 da pesquisa v2** (sessão "treino para todos", 13/11/2026). Dois verificadores (subagentes) receberam 23 afirmações atribuídas a fontes, sem saber para que seriam usadas nem qual era a conclusão da sessão, e foram às fontes originais. Este arquivo é o relatório deles, sem edição de conteúdo. Vereditos: 16 confirmadas, 7 confirmadas em parte, nenhuma não confirmada.

## O que a verificação mudou no texto da sessão
| Afirmação original | Correção do verificador | Onde foi aplicada |
|---|---|---|
| "Sem platô até ~25 séries por semana" (`pelland2026`) | O artigo diz "sem platô claro"; poucos estudos acima de ~25 séries; o modelo é compatível com platô | `18`, síntese; `proposta.md`, pacote 1: o alvo sem foco fica em 8, 12 e 14, sem ir a 20 |
| "Cargas de 30% a 85% de 1RM" (`acsm2026`) | A faixa do posicionamento é 30% a 100% | `19`, síntese |
| "Máquina = peso livre" (`haugen2023`) e "um lado = dois lados" (`kassiano2025`) | Intervalos largos: falta de evidência de diferença, não prova de igualdade | `20`, síntese; a regra da escolha se apoia no tempo e na simplicidade (consenso), não na igualdade |
| "Variar não rende mais hipertrofia" (`kassiano2022`) | É a leitura dos autores numa revisão sem meta-análise (8 estudos, 241 homens jovens) | `20`: selo moderada mantido, com a ressalva |
| "Semana leve não muda a hipertrofia e prejudica levemente a força" (`coleman2024`) | Era uma semana de pausa total; a força foi pior no grupo da pausa, não "levemente" | `21`, síntese |
| "Bi-set, drop set e rest-pause para economizar tempo; evitar com iniciantes" (`iversen2021`) | Revisão narrativa; não fala de iniciantes; desaconselha esses métodos em exercícios livres pesados | `21`; a regra das técnicas do protótipo passou a barrar o bi-set com exercício livre de barra |
| "Treino de força na dieta preserva a massa magra" (`lopez2022`) | Comparado a quem não fez nada, não à dieta sozinha; outro artigo do grupo achou queda | `24`, síntese |
| "Treino de força é recomendado para hipertensos controlados" (`paluch2024`) | Hipertensão controlada é contraindicação relativa (consultar médico); acima de 180/110, absoluta | `23`: o bloqueio do app fica como está |

## Releituras: fontes que já estavam na bibliografia e foram lidas de novo nesta sessão
Os temas 18 a 25 releram 116 fontes que já tinham chave em `docs/pesquisa/fontes.md`; em 27 delas a leitura passou de resumo para texto completo (por trechos). As linhas dessas fontes em `fontes.md` não foram alteradas nesta etapa, para o arquivo que o app carrega (`src/conteudo/fontes.json`) não mudar antes da decisão do Gustavo; o status novo de cada uma está na seção "Fontes" do tema que a releu, e sobe para `fontes.md` na etapa 2, junto com as regras.

---

## Relatório do verificador A

Método: resumos no PubMed (efetch) para todos; texto completo para Pelland (preprint SportRxiv v1/2024, PDF), ACSM (Europe PMC PMC12965823), IUSCA (PDF do periódico). Pelland versão final (Sports Med): só resumo (paywall; a página mostrou só o resumo). Arquivos brutos em ./raw/.

### 1. Pelland et al.
(a) Pelland JC, Remmert JF, Robinson ZP, Hinson SR, Zourdos MC. Sports Med 2026;56(2):481-505 (epub 4/12/2025). doi 10.1007/s40279-025-02344-w, PMID 41343037. Preprint: SportRxiv, doi 10.51224/SRXIV.460. Existe, sem retratação visível. 67 estudos, 2058 participantes (79,1% homens), idade média 25,2.
(b) Resumo do artigo publicado + texto completo do PREPRINT 2024 (PDF, 8 págs de corpo + suplemento no OSF). Não li o corpo da versão publicada: os números abaixo vêm do preprint e podem ter mudado na versão final.
(c) Por item:
- (i) CONFIRMADA EM PARTE. Retorno decrescente: sim (modelo de raiz quadrada; resumo publicado confirma "diminishing returns"). Mas NÃO diz "sem platô até ~25". O preprint diz: as faixas de eficiência "indicam nenhum platô claro", e "cautela, pois poucos estudos exploraram ~25+ séries fracionadas semanais". As faixas vão até 42 séries; acima de 43 "insuficiente". Ou seja: sem platô claro, mas dados escassos acima de ~25, e o intervalo de credibilidade é compatível com platô ou U invertido (o preprint diz isso explicitamente).
- (ii) CONFIRMADA (preprint). Tabela 2A: dose mínima efetiva = 4 séries fracionadas semanais, "suficiente para hipertrofia detectável". Definição: volume em que a média marginal estimada supera o menor efeito detectável (SDES = 2,05% para hipertrofia). Faixas seguintes: 5-10 (~6 séries extras por incremento detectável), 11-18 (~8,5), 19-29 (~10,75), 30-42 (~12,5).
- (iii) CONFIRMADA. Resumo: a evidência relativa foi mais forte para o método "fracionado" (indireta = 0,5), usado nos modelos primários. Cuidado: "melhor ajuste" por Bayes factor aproximado por BIC, entre três esquemas (1, 0,5, 0); não é prova de que 0,5 é o valor verdadeiro.
- (iv) CONFIRMADA. Resumo: para hipertrofia a probabilidade posterior de inclinação > 0 foi < 100%, "compatível com efeitos desprezíveis"; para força foi 100%, com retorno decrescente. (Nota: o texto diz "compatível com desprezível", não "provado nulo".)
- (v) CONFIRMADA EM PARTE. Preprint: dose mínima efetiva de força = 1 série fracionada; incrementos acima do SDES (3,96%) só até ~4 séries; modelo recíproco com "platô funcional". Mas o próprio texto ressalva que acima disso pode haver ganho menor que o SDES. "Quase não aumenta" é leitura razoável, porém o SDES de 3,96% é um limiar estatístico, não prático.
(e) Ressalvas: meta-regressão observacional entre estudos (volume não foi randomizado dentro do modelo); R² marginal ~22-26%; amostra jovem, 79% homens; muitas das medidas de hipertrofia são indiretas; autores são treinadores/escritores da indústria fitness (declarado); preprint não revisado por pares (a versão publicada pode diferir).

### 2. ACSM Position Stand 2026
(a) Currier BS, D'Souza AC, Singh MAF, Lowisz CV, Rawson ES, Schoenfeld BJ, Smith-Ryan AE, Steen JP, Thomas GA, Triplett NT, Washington TA, Werner TJ, Phillips SM. "ACSM Position Stand. Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews". Med Sci Sports Exerc 2026;58(4):851-872. doi 10.1249/MSS.0000000000003897, PMID 41843416, PMC12965823 (acesso aberto). Existe.
(b) Texto completo (Europe PMC XML).
(c)
- (i) CONFIRMADA EM PARTE. "≥10 séries/semana (por grupo muscular)" aparece no resumo e na Tabela 6 como volume que melhora a hipertrofia (comparação entre prescrições). É uma comparação (≥10 vs. menos), não "mínimo recomendado" explícito; o texto também cita meta-regressão com retorno decrescente além de ~18-20 séries semanais para hipertrofia.
- (ii) CONFIRMADA EM PARTE. O texto: "adultos saudáveis são aconselhados a completar pelo menos duas séries por exercício" (duas > uma; para força 2-3 séries/sessão na Tabela 6). Mas o texto diz que o número exato para otimizar não pode ser determinado.
- (iii) CONFIRMADA. "Periodização (linear, ondulatória e não periodizada) não influenciou a hipertrofia"; resumo: periodização não impactou os resultados de forma consistente.
- (iv) CONFIRMADA EM PARTE. Texto: hipertrofia sem diferença entre cargas baixas (30% 1RM) e altas (100% 1RM) e sem diferença com treino até a falha/fadiga; "completar séries até a falha não aumenta ganhos... não é necessário". O intervalo é 30%-100%, não 30%-85% (85% não aparece como limite). "Perto da falha" não é termo do artigo; diz que não é obrigatório treinar até a falha mas não há evidência para quantificar RIR alvo.
- (v) CONFIRMADA. Resumo/Tabela 6: força melhor com cargas ≥80% 1RM (dose-resposta), amplitude completa, 2-3 séries, ≥2 sessões/sem, exercício no início da sessão.
(e) É "overview of reviews" (revisões sistemáticas, não estudos primários); só adultos saudáveis ≥18 anos; muitos desfechos com "evidência insuficiente" (ex.: máquina vs. peso livre, variação de exercícios, descanso: "dados insuficientes" para hipertrofia). Schoenfeld é coautor.

### 3. IUSCA (Schoenfeld, Fisher, Grgic, Haun, Helms, Phillips, Steele, Vigotsky)
(a) "Resistance Training Recommendations to Maximize Muscle Hypertrophy in an Athletic Population: Position Stand of the IUSCA". Int J Strength Cond 2021;1(1). doi 10.47206/ijsc.v1i1.81. Existe (PDF aberto do periódico). Não é PubMed. (Não é "Schoenfeld et al. 2021" apenas: 8 autores.)
(b) Texto completo (PDF).
(c)
- (i) CONFIRMADA. "Cerca de 10 séries por músculo por semana pareceria ser uma prescrição mínima geral para otimizar a hipertrofia, embora alguns indivíduos possam ter resposta substancial com volumes um pouco menores."
- (ii) CONFIRMADA. "Como regra geral, descansos de pelo menos 2 minutos em exercícios multiarticulares. Descansos mais curtos (60-90 s) podem ser usados em monoarticulares e certos exercícios em máquina." Acrescenta que o ideal depende do ponto final da série (mais descanso se até a falha).
- (iii) CONFIRMADA (com a cautela do original). "Pode ser apropriado limitar o volume a ~10 séries por músculo por sessão; quando o volume semanal excede isso, dividir em mais sessões pode ajudar"; recomendação geral "limitar a ~10 séries por músculo por sessão". O texto diz que "nenhuma tentativa quantificou um limiar" e "mais pesquisa é necessária".
(e) Posicionamento de consenso de especialistas (revisão narrativa), população "atlética"; não é meta-análise; nível de evidência baixo-moderado para estes números específicos. Observação: Pelland (preprint de volume por sessão, SportRxiv 537) aponta ~11 séries fracionadas por sessão como ponto de superioridade indetectável, e não prova penalidade por mais séries.

### 4. Haugen et al. 2023
(a) Haugen ME, Vårvik FT, Larsen S, Haugen AS, van den Tillaar R, Bjørnsen T. BMC Sports Sci Med Rehabil 2023;15:103. doi 10.1186/s13102-023-00713-4, PMID 37582807, PMC10426227. Existe.
(b) Resumo.
(c) CONFIRMADA. 13 estudos, 1016 participantes; só 5 estudos com hipertrofia. Hipertrofia: SMD -0,055 (IC95% -0,397 a 0,287; p=0,751). Força: específica ao modo (força em teste livre aumentou mais com peso livre: SMD -0,210, IC -0,391 a -0,029, p=0,023; força em teste de máquina tendeu a favorecer máquina: SMD 0,291, IC -0,017 a 0,600, p=0,064, não significativo). Conclusão do artigo: mudanças de força são específicas ao modo.
(e) Hipertrofia baseada em apenas 5 estudos e IC largo (de -0,40 a +0,29): "ausência de evidência de diferença", não equivalência demonstrada. Adultos 18-60 anos, ≥6 semanas. O ACSM 2026 classifica máquina vs. peso livre como "dados insuficientes" para hipertrofia.

### 5. Refalo et al. 2025
(a) Refalo MC, Nuckols G, Galpin AJ, Gallagher IJ, Hamilton DL, Fyfe JJ. PeerJ 2025;13:e19042. doi 10.7717/peerj.19042, PMID 40028215, PMC11869894. Existe.
(b) Resumo.
(c) CONFIRMADA. Relativo: Exp. % Change of lnRR = 0,69% (HDI95% -1,50% a 2,88%), cruza zero. Absoluto: SMD = 0,19 (HDI 0,11 a 0,28; pd=100%), "levemente a favor dos homens". Número de estudos: 29. Extra: ganho de membros superiores absoluto favoreceu homens, inferiores não; fibra tipo II similar; experiência de treino não influenciou.
(e) Intervalo de credibilidade largo (de -1,5 a +2,9%): compatível com diferença relativa pequena em qualquer direção. Faltam estudos em muito treinados. Conflito: três autores são treinadores/escritores fitness; Nuckols fundador da Stronger by Science.

### 6. Halperin et al.
(a) Halperin I, Malleron T, Har-Nir I, Androulakis-Korakakis P, Wolf M, Fisher J, Steele J. "Accuracy in Predicting Repetitions to Task Failure in Resistance Exercise: A Scoping Review and Exploratory Meta-analysis". Sports Med 2022;52(2):377-390 (epub set/2021). doi 10.1007/s40279-021-01559-x, PMID 34542869. Existe.
(b) Resumo.
(c) CONFIRMADA. Participantes subestimaram as repetições até a falha em 0,95 rep (IC95% 0,17-1,73), heterogeneidade enorme (I²=97,9%). Séries ≤12 reps: β=0,06 (IC 0,04-0,09); >12 reps: β=0,47 (IC 0,44-0,49), erro maior em séries longas. Status de treino não influenciou (β=-0,006; IC -0,02 a 0,007). Melhora com previsões mais perto da falha (β=-0,025; IC -0,05 a 0,0014), em cargas pesadas e séries posteriores.
(e) Tipo é "scoping review e meta-análise EXPLORATÓRIA": 12 estudos (13 publicações), 414 participantes; IC da média 0,17-1,73 é largo; os estudos prevêem a falha em protocolos de laboratório, não RIR em treino real; "subestimar" significa que a pessoa chega com mais reservas do que acha. A frase "a maioria subestima" é verdadeira em média, não para cada pessoa (SD entre participantes 1,45 rep). O nome "Halperin 2022" é correto pela edição; publicação online foi em 2021.

### 7. Singer et al. 2024
(a) Singer A, Wolf M, Generoso L, Arias E, Delcastillo K, Echevarria E, Martinez A, Androulakis Korakakis P, Refalo MC, Swinton PA, Schoenfeld BJ. Front Sports Act Living 2024;6:1429789. doi 10.3389/fspor.2024.1429789, PMID 39205815, PMC11349676. Existe.
(b) Resumo.
(c) CONFIRMADA. 9 estudos, 19 medidas. SMD curto 0,48 (CrI 0,19-0,81) vs. longo 0,56 (0,24-0,86); pareado: braço 0,13 (-0,27 a 0,51), coxa 0,17 (-0,13 a 0,43), corpo todo -0,08 (-0,45 a 0,29). Conclusão: "pequeno benefício hipertrófico com descansos >60 s, talvez mediado por redução do volume-carga", e "não detectou diferenças apreciáveis ao descansar >90 s".
(e) Só 9 estudos, heterogeneidade grande, intervalos de credibilidade cruzam zero. "Acima de ~90 s é incerto" é uma leitura fiel, mas a evidência de >60 s também é fraca (CrI cruza zero). Schoenfeld ex-conselheiro científico de empresa de equipamentos (Tonal), declarado.

### 8. Nunes et al. 2021
(a) Nunes JP, Grgic J, Cunha PM, Ribeiro AS, Schoenfeld BJ, de Salles BF, Cyrino ES. "What influence does resistance exercise order have on muscular strength gains and muscle hypertrophy? A systematic review and meta-analysis". Eur J Sport Sci 2021;21(2):149-157 (epub 2020). doi 10.1080/17461391.2020.1733672, PMID 32077380. Existe.
(b) Resumo.
(c) CONFIRMADA. 11 estudos. Hipertrofia (medidas específicas + indiretas): ES=0,03, p=0,862. Força: ganho maior no exercício feito primeiro: multiarticular no começo, ES=0,32 (p=0,034); monoarticular no começo, ES=-0,58 (p=0,032, direção invertida por convenção de sinal). Considerando todos os testes de força, sem diferença (ES=-0,11, p=0,306).
(e) Poucos estudos (11); a ordem importa para a força só do exercício colocado primeiro (não é um ganho líquido geral). Ano: resumo marca 2021 (epub 2020).

### 9. Kassiano et al. 2022
(a) Kassiano W, Nunes JP, Costa B, Ribeiro AS, Schoenfeld BJ, Cyrino ES. J Strength Cond Res 2022;36(6):1753-1762. doi 10.1519/JSC.0000000000004258, PMID 35438660. Existe.
(b) Resumo.
(c) CONFIRMADA EM PARTE. Resumo: 8 estudos, N=241, todos homens jovens. "Alguma variação sistemática parece aumentar a hipertrofia REGIONAL e maximizar a força dinâmica, enquanto variação excessiva e aleatória pode comprometer ganhos." Conclui que a variação deve ser sistemática (base anatômica/biomecânica); exercícios redundantes e rotação excessiva "podem prejudicar". Diferença: o resumo diz que a variação "pode influenciar" hipertrofia e força e não afirma textualmente "não há ganho geral de hipertrofia por variar"; essa última frase é interpretação do avaliador (o texto fala de efeito regional, sem benefício claro de variar por variar). Também há benefício potencial para força dinâmica.
(e) Revisão sistemática SEM meta-análise; 8 estudos, só homens jovens; qualidade PEDro "boa/excelente", mas ainda poucos estudos. ACSM 2026: dados insuficientes sobre exercício variado.

### 10. Meta-análise unilateral vs. bilateral
(a) EXISTE. Kassiano W, Nunes JP, Costa B, Ribeiro AS, Loenneke JP, Cyrino ES. "Comparison of Muscle Growth and Dynamic Strength Adaptations Induced by Unilateral and Bilateral Resistance Training: A Systematic Review and Meta-analysis". Sports Med 2025;55(4):923-936 (epub 10/1/2025). doi 10.1007/s40279-024-02169-z, PMID 39794667. Dados no OSF (osf.io/rkgfm).
(b) Resumo (PubMed).
(c) CONFIRMADA. 703 estudos recuperados, 9 incluídos. Hipertrofia: ES -0,21 (IC95% -3,56 a 3,13; p=0,57), "sem diferenças significativas". Força: bilateral melhor no teste bilateral (ES 0,56; IC 0,16-0,96; p=0,01); unilateral melhor no teste unilateral (ES -0,65; IC -0,93 a -0,37; p=0,001). Risco de viés moderado. Conclusão: "com base na literatura limitada, não há evidência de hipertrofia diferencial; força segue o princípio da especificidade".
(e) IC ENORME (-3,56 a 3,13; estimativa por variância robusta com poucos estudos): isso é falta de poder, não prova de equivalência. Poucos estudos (9).

### 11. Barbalho et al. 2019, retratação
(a) Barbalho M, Coswig VS, Steele J, Fisher JP, Paoli A, Gentil P. Med Sci Sports Exerc 2019;51(3):515-522. doi 10.1249/MSS.0000000000001818, PMID 30779716. No PubMed aparece como "RETRACTED ARTICLE" / "Retracted Publication". Existe, e FOI RETRATADO.
(b) Registro PubMed e Crossref (metadados). Não li o texto do aviso de retratação nem o motivo.
(c) CONFIRMADA. Trilha: Expressão de preocupação em MSSE 2020 Nov;52(11):2490 (doi 10.1249/MSS.0000000000002496); Retração: aviso "Upper Threshold for Resistance Training Volume in Trained Women—RETRACTION", DOI 10.1249/MSS.0000000000002672, data de publicação online 30/03/2021 (Crossref; registro criado em 31/03/2021), edição impressa MSSE 2021 Jun 1;53(6):1318. O Retraction Watch (via Crossref) registra 06/04/2021. Há também uma "correção" ao aviso datada de 01/06/2021 (Crossref). Portanto: retratação em março/abril de 2021 (aviso online 30/03/2021), impressa em 1/6/2021.
Abstract original (para não ser citado): 40 mulheres treinadas, 24 semanas, 5/10/15/20 séries por grupo muscular POR SESSÃO; conclusão "5 a 10 séries" seriam suficientes, sem benefício acima.
(e) Não confirmei o motivo (outra fonte, uma busca web, só sugere preocupação com similaridade de dados em trabalhos de Barbalho; isso não é confirmado por mim). Qualquer uso do número "limite superior de volume" desse estudo deve ser descartado. Atenção: o abstract original fala em séries por sessão, não por semana.

### Tabela-resumo
| nº | veredito | uma linha |
|---|---|---|
| 1 | EM PARTE | (ii) 4 séries e (iii) 0,5 e (iv) frequência ok; (i) é "sem platô claro" com dados escassos acima de ~25 (não "até 25"); (v) força: ~4 séries acima do SDES, "platô funcional"; só li o preprint (final só resumo) |
| 2 | EM PARTE | ≥10 séries/sem, ≥2 séries/exercício, sem efeito de periodização e ≥80% 1RM para força confirmados; faixa de carga é 30%-100% (não 85%) e o texto diz que a falha não é necessária |
| 3 | CONFIRMADA | ~10 séries/semana mínimo; ≥2 min multi e 60-90 s mono; limitar ~10 séries/sessão (com ressalva de que não há limiar quantificado) |
| 4 | CONFIRMADA | hipertrofia SMD -0,055 (IC -0,40 a 0,29), só 5 estudos; força específica ao modo |
| 5 | CONFIRMADA | relativo 0,69% (IC -1,50 a 2,88%); absoluto SMD 0,19 a favor de homens; 29 estudos |
| 6 | CONFIRMADA | subestimação 0,95 rep (IC 0,17-1,73), maior se >12 reps (β 0,47 vs 0,06), status de treino sem efeito; meta-análise exploratória, 12 estudos |
| 7 | CONFIRMADA | SMD braço 0,13, coxa 0,17 (CrI cruzam 0); pequeno benefício >60 s, sem diferença apreciável >90 s; 9 estudos |
| 8 | CONFIRMADA | hipertrofia ES 0,03; força maior no exercício feito primeiro (ES 0,32 / -0,58); 11 estudos |
| 9 | EM PARTE | variação sistemática ajuda hipertrofia regional e força; aleatória/excessiva atrapalha; "sem ganho geral" é interpretação; 8 estudos, só homens, sem meta-análise |
| 10 | CONFIRMADA | existe: Kassiano et al., Sports Med 2025, PMID 39794667, 9 estudos, hipertrofia ES -0,21 (IC -3,56 a 3,13), IC enorme; força segue a especificidade |
| 11 | CONFIRMADA | retratado: aviso online 30/03/2021 (impresso 1/6/2021), após expressão de preocupação de nov/2020; motivo não verificado |

---

## Relatório do verificador B

Método: resumo no PubMed (E-utilities) e texto completo no PMC/Europe PMC (quando indicado). Nenhum artigo encontrado consta como retratado (nenhum aviso de retratação nos registros do PubMed/PMC). PAR-Q+: PDF oficial 2025 e páginas de termos/FAQ em eparmedx.com.

### 1. Zhang et al. 2025, superséries
(a) Zhang X, Weakley J, Li H, Li Z, García-Ramos A. Sports Med 2025;55(4):953-975. doi 10.1007/s40279-025-02176-8. PMID 39903375, PMC12011898. Existe, sem retratação.
(b) Resumo + texto completo (PMC).
(c) CONFIRMADA (com ressalvas).
(d) 19 estudos, 313 participantes. Adaptações crônicas semelhantes: força máxima SMD 0,10 (p=0,36; IC95% -0,40 a 0,60), resistência de força SMD 0,07, hipertrofia SMD -0,05 (p=0,87; IC95% -0,63 a 0,54). Mesmo total de repetições (SMD -0,03) e volume-carga (SMD 0,05) com sessão mais curta e maior "eficiência de treino" (SMD 1,74; p=0,01). Esforço percebido maior (RPE SMD 0,77; p=0,02). Também: lactato maior, custo energético maior; os autores dizem que superséries geram maior carga interna e mais dano muscular, podendo exigir mais recuperação. Subgrupo: supersérie de "biomecânica similar" (mesmo músculo) reduziu o volume-carga (SMD -1,08; p<0,01); agonista-antagonista manteve/aumentou repetições (SMD 0,68).
(e) Os 19 estudos entram sobretudo nas variáveis agudas; os desfechos crônicos vêm de poucos estudos e os ICs são largos (a "equivalência" é ausência de diferença detectada, não equivalência provada). A afirmação "semelhantes" vale para superséries de tipos variados, mas a manutenção do volume depende de ser agonista-antagonista. Sem conflito declarado.

### 2. Sødal et al. 2023, drop sets
(a) Sødal LK, Kristiansen E, Larsen S, van den Tillaar R. Sports Med Open 2023;9(1):66. doi 10.1186/s40798-023-00620-5. PMID 37523092, PMC10390395. Existe, sem retratação.
(b) Resumo.
(c) CONFIRMADA.
(d) 6 estudos incluídos (5 na síntese quantitativa), 142 participantes (28 mulheres, 114 homens), 19,2-27 anos. Hipertrofia: drop set SMD 0,555 (IC 0,357-0,921); tradicional 0,437 (0,266-0,608). Diferença entre grupos não significativa: SMD 0,155 (p=0,392). Alguns protocolos de drop set levaram metade a um terço do tempo.
(e) Amostras pequenas (média 23,6; faixa 9-41), só adultos jovens, maioria homens; poucos estudos, em geral de exercícios monoarticulares. O IC do resumo está impresso de forma estranha (0,357-0,921 em torno de 0,555; e "-0,199 a -0,509" para a diferença), provável erro tipográfico do artigo; a conclusão (sem diferença) não muda. Sem conflitos.

### 3. Iversen et al. 2021, "No Time to Lift?"
(a) Iversen VM, Norum M, Schoenfeld BJ, Fimland MS. Sports Med 2021;51(10):2079-2095. doi 10.1007/s40279-021-01490-1. PMID 34125411, PMC8449772. Revisão NARRATIVA. Existe, sem retratação (há dois comentários publicados, não retratação).
(b) Resumo + texto completo (PMC).
(c) i) CONFIRMADA. ii) CONFIRMADA EM PARTE. iii) NÃO CONFIRMADA como recomendação para iniciantes (o artigo não trata disso; há restrição para exercícios livres compostos). iv) CONFIRMADA.
(d)
 i) "recomendamos um mínimo de 4 séries semanais por grupo muscular, na faixa de 6-15 RM (15-40 repetições se até a falha)". Tabela prática: sobe até 10+ séries/semana conforme o tempo.
 ii) Resumo: "superséries, drop sets e rest-pause reduzem o tempo de treino à metade, mantendo o volume". Porém: "provavelmente melhores para induzir hipertrofia do que força"; "mais pesquisa é necessária sobre efeitos longitudinais". No texto: superséries têm "evidência científica limitada" (só 1 estudo longitudinal, 15 homens treinados, supino/remada pesada); drop sets e rest-pause têm 2-3 e 1 estudo longitudinais, respectivamente, e os autores chamam a evidência de "limitada e um tanto conflitante". Ou seja, é opção "para quem tem pouco tempo", não recomendação geral.
 iii) Os autores NÃO dão orientação específica sobre iniciantes quanto a essas técnicas. O que dizem: "Devido a preocupações de segurança, não aconselhamos esses métodos em exercícios compostos livres pesados, como agachamento e supino" (tabela 1) e, no texto, drop sets "talvez não sejam aconselháveis em certos exercícios compostos livres, como agachamento"; drop sets são mais adequados a exercícios monoarticulares. Sobre iniciantes, só comentam que pesos livres podem ser mais intimidantes e que máquinas são vistas como mais seguras. Os estudos citados incluíam sobretudo pessoas destreinadas/recreativas.
 iv) "Restringir o aquecimento a aquecimentos específicos do exercício"; "aquecimento geral não deve ser priorizado quando o tempo é essencial"; aquecimento específico "pode ser útil" com cargas pesadas (>80% de 1RM). Alongamento: "priorizar somente se o objetivo for aumentar flexibilidade/mobilidade"; a evidência não sustenta alongamento para desempenho, lesões ou dor tardia, e o alongamento estático pode reduzir força agudamente.
(e) Revisão narrativa, com recomendação de especialistas sobre estudos pequenos; o contexto é "tempo limitado", não "ótimo". "Não necessário" para alongamento é leitura forte demais se o objetivo é amplitude de movimento. Sem conflitos.

### 4. Coleman et al. 2024, deload de 1 semana
(a) Coleman M, Burke R, Augustin F, Piñero A, Maldonado J, Fisher JP, Israetel M, Androulakis Korakakis P, Swinton P, Oberlin D, Schoenfeld BJ. PeerJ 2024;12:e16777. doi 10.7717/peerj.16777. PMID 38274324, PMC10809978. Existe, sem retratação.
(b) Resumo.
(c) CONFIRMADA (a parte "pode ter prejudicado" é, no artigo, mais forte: a força foi pior).
(d) 39 jovens treinados (29 homens, 10 mulheres), 9 semanas, grupo DELOAD parou 1 semana no meio. Sem diferenças relevantes em tamanho muscular, resistência local e potência. O grupo contínuo (TRAD) teve ganhos MAIORES de força isométrica e dinâmica de membros inferiores. TRAD também teve leves benefícios psicológicos (questionário de prontidão). Conclusão: deload "parece influenciar negativamente a força" sem efeito na hipertrofia.
(e) O deload foi PAUSA TOTAL (não redução de volume/carga, que é o deload usual). Treinamento de alto volume, treinados, 9 semanas, parte do treino de membros superiores sem supervisão. Um estudo; não avalia o deload para prevenir lesão/overreaching em programas longos. Conflitos: Schoenfeld (Tonal), Israetel (Renaissance Periodization).

### 5. Plotkin et al. 2022, carga x repetições
(a) Plotkin D, Coleman M, Van Every D, Maldonado J, Oberlin D, Israetel M, Feather J, Alto A, Vigotsky AD, Schoenfeld BJ. PeerJ 2022;10:e14142. doi 10.7717/peerj.14142. PMID 36199287, PMC9528903. Existe, sem retratação.
(b) Resumo.
(c) CONFIRMADA EM PARTE (os dados mostram "praticamente semelhantes", com pequenas diferenças em direções opostas).
(d) 43 participantes com ≥1 ano de treino de pernas (LOAD n=22; REPS n=21), 8 semanas, 4 séries de 4 exercícios de membros inferiores, 2x/semana. Crescimento do reto femoral favoreceu REPS (soma dos locais: 2,8 mm; IC90% -0,5 a 5,8); força dinâmica favoreceu levemente LOAD (2,0 kg; IC90% -2,4 a 7,8), diferenças de "significância prática questionável". Demais desfechos: espessuras <1 mm, resistência <1%, salto 0,1 cm. Conclusão: ambas as progressões são estratégias viáveis.
(e) Só membros inferiores, 8 semanas, 1 ano de treino mínimo (treinados de forma modesta). Efeitos pequenos e ICs que cruzam zero. Conflitos: Schoenfeld (Tonal); Israetel e Feather (Renaissance Periodization).

### 6. Smith et al. 2017, "Should exercises be painful…?"
(a) Smith BE, Hendrick P, Smith TO, Bateman M, Moffatt F, Rathleff MS, Selfe J, Logan P. Br J Sports Med 2017;51(23):1679-1687. doi 10.1136/bjsports-2016-097383. PMID 28596288, PMC5739826. Existe, sem retratação.
(b) Resumo + trechos do texto completo (PMC).
(c) CONFIRMADA.
(d) 9 artigos de 7 ensaios, 385 participantes. A curto prazo, diferença significativa na DOR, com efeito pequeno de -0,27 (IC -0,54 a -0,05), a favor dos exercícios dolorosos, evidência de qualidade moderada. Dor a médio e longo prazo e função/incapacidade em todos os prazos: sem diferença. Conclusão: dor durante o exercício terapêutico "não precisa ser uma barreira"; protocolos dolorosos têm "pequeno benefício" no curto prazo.
(e) O desfecho é DOR (e função), não ganho muscular. Os ensaios incluídos são de reabilitação com fisioterapeuta, para dor crônica (ex.: dor no ombro, com consultas de fisioterapia), com dor "permitida" em faixa controlada (ex.: até 5/10), não "treine através de dor aguda". Extrapolar para um app sem profissional é um salto. Sem conflitos declarados. Importante: o artigo trata de dor musculoesquelética CRÔNICA, não de dor aguda, formigamento ou tontura.

### 7. PAR-Q+ 2025 (eparmedx.com)
(a) PAR-Q+ 2025 (PARQPlus2025Fillable.pdf, versão 01-11-2024, "Copyright © 2025 PAR-Q+ Collaboration"); termos em eparmedx.com/about/terms-and-conditions/. Documento vigente.
(b) Li o PDF completo (4 páginas) e a página de Termos e a de FAQ.
(c) CONFIRMADA (com nuances de redação).
(d)
 - Pressão alta: pergunta geral 1 ("seu médico já disse que você tem condição cardíaca OU pressão alta?"). Seguimento 4: "Você tem atualmente pressão alta?" 4a: "dificuldade de controlar com medicamentos ou outras terapias?" 4b: "pressão de repouso ≥ 160/90 mmHg, com ou sem medicação? (Responda SIM se não souber)". Quem responde NÃO a todas as perguntas de seguimento "está pronto para ficar mais ativo" (página 4), com a recomendação de consultar um profissional qualificado de exercício. SIM a qualquer seguimento: buscar mais informação (ePARmed-X+ e/ou profissional).
 - Gravidez: "Adie ficar mais ativa se estiver grávida. Nesse caso, converse com seu profissional de saúde, médico, profissional de exercício qualificado e/ou complete o ePARmed-X+ antes de se tornar mais ativa." É uma recomendação de "adiar e conversar", não liberação.
 - Autorização: nas Condições de Uso: "autorização prévia por escrito da PAR-Q+ Collaboration" é exigida para reproduzir fora dos usos permitidos, modificar, adaptar, traduzir ou incorporar os materiais em instrumentos, produtos ou serviços; inclui mudanças em redação, ordem, "caminhos de triagem" e recomendações; e para incorporar em "aplicativos móveis, sites, software comercial, sistemas automatizados de triagem ou outras plataformas digitais". Uso sem custo só para fins individuais, clínicos, educacionais e pesquisa não comercial, com versão oficial e sem modificação. O próprio formulário diz: "Você deve usar o questionário inteiro e NENHUMA mudança é permitida". A Coalizão reserva-se o direito de cobrar taxas.
(e) A pergunta geral 1 já pega "pressão alta" em qualquer caso: quem responde SIM entra no seguimento 4. A liberação sem seguimento só vale se NÃO a todas as 7 perguntas. Para um produto, reimplementar o questionário ou seu fluxo ("estilo PAR-Q+") em app é uso que exige autorização. O ePARmed-X+ é o próximo passo, e o PAR-Q+ distingue "profissional de exercício qualificado" de personal trainer comum.

### 8. Paluch et al. AHA 2023/2024
(a) Paluch AE, Boyer WR, Franklin BA, Laddu D, Lobelo F, Lee DC, McDermott MM, Swift DL, Webel AR, Lane A. "Resistance Exercise Training in Individuals With and Without Cardiovascular Disease: 2023 Update: A Scientific Statement From the American Heart Association." Circulation 2024;149(3):e217-e231 (online 7/12/2023). doi 10.1161/CIR.0000000000001189. PMID 38059362, PMC11209834. Existe, sem retratação.
(b) Resumo + texto completo (PMC) + Figura 1 (imagem, painel B, lida visualmente).
(c) CONFIRMADA EM PARTE.
(d) Seguro e eficaz: "desde 2007, evidências sugerem que o treino de força é uma abordagem segura e eficaz" para saúde cardiovascular em adultos com e sem doença cardiovascular. Hipertensão: "pacientes com hipertensão CONTROLADA podem participar com segurança de treino de força de baixa a moderada intensidade, com técnica respiratória adequada"; hipertensos que tomam anti-hipertensivos devem fazer volta à calma prolongada. Redução de PA com treino: hipertensos -6/-5 mmHg.
 Figura 1B, contraindicações ABSOLUTAS: coronariopatia instável; insuficiência cardíaca descompensada; arritmias atriais e/ou ventriculares não controladas; hipertensão pulmonar grave (pressão arterial pulmonar média >55 mmHg); estenose aórtica grave e sintomática; miocardite, endocardite ou pericardite agudas; HIPERTENSÃO NÃO CONTROLADA (>180/110 mmHg); dissecção aórtica; síndrome de Marfan; treino de alta intensidade em retinopatia diabética proliferativa ativa ou não proliferativa moderada/grave.
 Contraindicações RELATIVAS ("consultar um médico antes"): portadores de desfibrilador ou marca-passo; diabetes; hipertensão controlada; condições ou limitações musculoesqueléticas; histórico de AVC; baixa capacidade funcional (<4 METs).
(e) O valor de corte é >180/110 mmHg (não 160/90, que é o do PAR-Q+ para "consultar"), então os dois critérios não coincidem. A "hipertensão controlada" é contraindicação RELATIVA (consulta médica antes), com cautela quanto à intensidade (baixa a moderada). Marfan e hipertensão pulmonar grave também são absolutas, e não costumam aparecer em triagens de app. A declaração é consenso de especialistas (AHA), não ensaio.

### 9. Sperandei et al. 2016
(a) Sperandei S, Vieira MC, Reis AC. "Adherence to physical activity in an unsupervised setting: Explanatory variables for high attrition rates among fitness center members." J Sci Med Sport 2016;19(11):916-920. doi 10.1016/j.jsams.2015.12.522. PMID 26874647. Existe, sem retratação.
(b) Resumo.
(c) CONFIRMADA.
(d) 5240 registros de membros de uma academia no Rio de Janeiro (jan/2005 a jun/2014), seguidos por 12 meses ou até cancelamento. "63% dos novos membros abandonarão antes do terceiro mês e menos de 4% permanecerão por mais de 12 meses de atividade contínua." Regressão de Cox: idade, nível prévio de atividade, IMC inicial e motivações (emagrecimento, hipertrofia, saúde, estética) associados ao risco.
(e) UMA academia (um centro de fitness), estudo observacional retrospectivo; "abandono" = cancelamento de matrícula, não necessariamente parar de treinar. Atividade "sem supervisão". Generalizar para outras academias/app é limitado. O título menciona o Rio; o resumo diz "a city of Rio de Janeiro".

### 10. Radaelli et al. 2025
(a) Radaelli R, Rech A, Molinari T, Markarian AM, Petropoulou M, Granacher U, Hortobágyi T, Lopez P. Sports Med 2025;55(1):167-192. doi 10.1007/s40279-024-02123-z. PMID 39405023. Meta-análise EM REDE (network) de 151 ensaios (n=6306). Existe, sem retratação.
(b) Resumo.
(c) CONFIRMADA.
(d) Volume baixo (LVRT) foi o mais eficaz para timed up and go (SMD -1,20), caminhada de 6 min (1,03), massa magra (0,25; IC 0,10-0,40) e hipertrofia muscular (0,40; IC 0,25-0,54). Volumes moderado e alto (MVRT e HVRT) foram os mais eficazes para FORÇA de membros inferiores; só o volume alto foi eficaz para velocidade de marcha rápida (0,40 SMD, mas o IC impresso é -0,57 a 0,14, aparente erro tipográfico). Conclusão: "volume baixo melhora substancialmente a função de idosos saudáveis e beneficia massa magra e tamanho muscular, independentemente da duração; volume mais alto parece necessário para maiores ganhos de força". Resultados independentes da duração e vistos principalmente em idosos saudáveis; evidência limitada nos fisicamente comprometidos.
(e) Volumes definidos por tercis do volume semanal prescrito (frequência x exercícios x séries), só treino supervisionado em ≥60 anos. A categorização "baixo" é relativa à amostra, não um número absoluto de séries. Sem conflito.

### 11. Lopez et al. 2022 (restrição calórica)
(a) A referência certa é Lopez P, Taaffe DR, Galvão DA, Newton RU, Nonemacher ER, Wendt VM, Bassanesi RN, Turella DJP, Rech A. "Resistance training effectiveness on body composition and body weight outcomes in individuals with overweight and obesity across the lifespan: A systematic review and meta-analysis." Obes Rev 2022;23(5):e13428. doi 10.1111/obr.13428. PMID 35191588, PMC9285060. 116 artigos, 114 ensaios, n=4184. (Atenção: existe um outro Lopez 2022 na MSSE, PMID 35977113, com 65 ensaios e n=2537; não é o da afirmação.) Existe, sem retratação.
(b) Resumo + trecho do texto completo (PMC).
(c) CONFIRMADA EM PARTE.
(d) "Intervenções com treino de força + restrição calórica foram as mais eficazes para reduzir % de gordura (-3,8%; IC -4,7 a -2,9) e massa gorda (-5,3 kg; IC -7,2 a -3,5), comparadas a grupos SEM intervenção." Massa magra: treino de força sozinho aumentou (+0,8 kg; IC 0,6-1,0) vs. controles sem treino, enquanto com treino + restrição calórica a massa magra foi MANTIDA (~-0,3 kg, p=0,550-0,727, não significativo). Resultados consistentes por idade e sexo.
 No texto completo os autores dizem explicitamente que os resultados "não foram comparados com programas só de restrição calórica".
(e) "Preserva a massa magra" é leitura razoável do resultado (não houve perda significativa), mas o desenho NÃO mostra que o treino de força preserva mais que a dieta sozinha, nem que "aumenta a perda de gordura" além da dieta: a comparação é com controles sem intervenção. A meta-análise irmã (MSSE, PMID 35977113) relata que programas com treino de força + restrição calórica tiveram reduções significativas de massa magra (p=0,035), o que complica a tese. População: sobrepeso/obesidade (muitos mais velhos); não vale diretamente para pessoas magras em déficit moderado.

### 12. Balachandran et al. 2022
(a) Balachandran AT, Steele J, Angielczyk D, Belio M, Schoenfeld BJ, Quiles N, Askin N, Abou-Setta AM. "Comparison of Power Training vs Traditional Strength Training on Physical Function in Older Adults: A Systematic Review and Meta-analysis." JAMA Netw Open 2022;5(5):e2211623. doi 10.1001/jamanetworkopen.2022.11623. PMID 35544136, PMC9096601. Existe, sem retratação.
(b) Resumo + texto completo (PMC).
(c) CONFIRMADA EM PARTE ("benefício pequeno" sim; "eventos adversos raros" é leitura generosa).
(d) 20 ECRs, 566 idosos comunitários (idade média 70,1 anos; 65% mulheres). Função física: SMD 0,30 (IC 0,05-0,54), 13 ECRs (n=383), evidência de CERTEZA BAIXA (rebaixada por alto risco de viés e imprecisão). Função autorrelatada: SMD 0,38, IC -0,62 a 1,37 (inconclusivo). Eventos adversos: relatados de forma insuficiente (apenas 14 de 20 ECRs, 70%); 3,27 por 1000 pessoas-sessão (IC 1,76-6,09) com potência vs. 2,08 (IC 0,99-4,36) no treino tradicional, "relativamente baixo e diferença mínima"; principalmente exacerbação de artrite e dor no joelho/muscular; nenhum evento adverso grave em nenhum grupo; mais eventos nos estudos com participantes de baixo funcionamento. Conclusão: "melhora modesta"; "são necessários ECRs maiores e de melhor qualidade".
(e) Idosos saudáveis da comunidade. IC inferior do efeito principal próximo de zero (0,05). Conflito: Schoenfeld recebeu honorários da Tonal (fora do trabalho). Observação: ressalva do autor de "baixa certeza" deve acompanhar o SMD.

### Tabela-resumo

| nº | veredito | uma linha |
|----|----------|-----------|
| 1 | CONFIRMADA | Zhang 2025: 19 estudos/313 pessoas; hipertrofia SMD -0,05 e força 0,10 sem diferença, sessão mais curta, RPE maior (0,77); IC larga e poucos estudos crônicos |
| 2 | CONFIRMADA | Sødal 2023: 6 estudos, 142 jovens; diferença de hipertrofia SMD 0,155 (p=0,39); alguns drop sets em 1/2 a 1/3 do tempo |
| 3 | CONFIRMADA EM PARTE | Iversen 2021 (revisão narrativa): (i) ≥4 séries/sem ok; (ii) técnicas "metade do tempo", mas mais para hipertrofia que força e com evidência limitada; (iii) nada sobre iniciantes, mas "não aconselhado" em compostos livres pesados (agachamento/supino) por segurança; (iv) aquecimento geral não prioritário, alongamento só se o objetivo for mobilidade |
| 4 | CONFIRMADA | Coleman 2024: 39 treinados, pausa total de 1 semana; hipertrofia igual, força MENOR no deload (não só "levemente") |
| 5 | CONFIRMADA EM PARTE | Plotkin 2022: 43 treinados, 8 sem, só pernas; diferenças pequenas e opostas (reto femoral +2,8 mm REPS; 1RM +2,0 kg LOAD), ICs cruzam zero |
| 6 | CONFIRMADA | Smith 2017: SMD -0,27 (IC -0,54 a -0,05) curto prazo em DOR; 7 ensaios/385 pessoas; sem diferença depois; dor crônica em contexto de fisioterapia |
| 7 | CONFIRMADA | PAR-Q+ 2025: 4a/4b NÃO (e demais) = liberado; gravidez = adiar e conversar; uso em app/modificação exige autorização escrita |
| 8 | CONFIRMADA EM PARTE | AHA: seguro/recomendado; hipertensão NÃO controlada >180/110 mmHg é absoluta; hipertensão controlada é RELATIVA (consultar médico; intensidade baixa-moderada); lista completa acima |
| 9 | CONFIRMADA | Sperandei 2016: n=5240, uma academia do Rio; 63% abandonam antes do 3º mês, <4% passam de 12 meses |
| 10 | CONFIRMADA | Radaelli 2025: volume baixo já melhora função/massa magra/hipertrofia; volume maior parece necessário para força |
| 11 | CONFIRMADA EM PARTE | Lopez 2022 (Obes Rev, 114 ensaios/4184): massa magra mantida e perda de gordura vs. controles SEM intervenção; não comparou com dieta sozinha |
| 12 | CONFIRMADA EM PARTE | Balachandran 2022: SMD 0,30 (IC 0,05-0,54), certeza BAIXA; eventos adversos baixos mas mal relatados, sem graves |

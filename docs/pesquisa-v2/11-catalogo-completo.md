# 11. Catálogo completo: todo músculo, todo nível, todo equipamento (sessão de catálogo)

> Pesquisa de 03 e 04/11/2026, no método de `PLANO-DOS-TEMAS.md`: perguntas fechadas → buscas registradas → hierarquia das fontes → nível de leitura → selo por número → entregável. Os selos seguem `docs/pesquisa/00-metodo.md`. As perguntas são as da Parte B de `docs/prompts/sessao-catalogo-e-fechamento.md`.
>
> **Leitura das fontes.** Estudo marcado **resumo-PubMed (lido nesta sessão)** teve o resumo oficial lido no PubMed com `python3 -I scripts/pesquisa/pubmed.py a <PMID>`. Estudo marcado **resumo-PubMed (no projeto)** teve o resumo lido numa sessão anterior da v2 (`fontes.md`, `04`, `08` ou `10`) e **não foi relido agora**: os números vêm desses registros. O texto completo de nenhum estudo foi lido. O que foi visto só pelo título (na lista do PubMed ou na busca web) fica **NÃO VERIFICADO** e não sustenta nenhum selo nem número. Durante quase toda a sessão, o PubMed respondeu com a página de limite de pedidos: as **listas de busca** passaram, mas só cerca de 1 em cada 3 resumos abriu, mesmo com várias tentativas. **Uma busca vazia não prova que o estudo não existe.**
>
> **Como foi feito.** Quatro pesquisadores trabalharam em paralelo, com as mesmas regras de selo: tronco superior e braços (H1); pernas e abdômen (H2); equipamentos novos (W1, pergunta B.2.3); exercícios que faltam, escadas, segurança e vídeos (W2, perguntas B.2.4 a B.2.7). O mapa do que existe (B.1) foi medido por script (`npm run auditoria:catalogo`, `scripts/auditoria/catalogo.ts`), e o ganho de cada exercício novo (B.3) foi medido numa cópia do app, fora do repositório. Eu juntei os quatro textos; onde eles divergiram, a seção "Divergências" diz o que ficou e por quê.
>
> **Conferência.** Quem conduziu a sessão releu no PubMed, em 04/11/2026, os resumos de Gschneidner 2025 (41055237), Lanza 2024 (39593465), Barbalho 2020 (31975359) e Murphy & Koehler 2022 (34623696, a fonte do cutting no `12`): os números citados aqui conferem. Na montagem deste arquivo, conferi também, na cópia local que o script guarda, os resumos de Kubo 2019 (31230110) e Kinoshita 2026 (41630124). As outras fontes foram lidas pelos pesquisadores e não relidas.
>
> **[opinião]** marca o que é julgamento de quem pesquisou, não evidência. **Nada aqui muda `regras.md`, os dados ou o código: tudo espera a decisão do Gustavo.** A v2 prevalece sobre a v1 onde houver conflito; as correções estão em "O que muda em relação ao que o projeto dizia".

## Em uma frase
A biblioteca de 110 exercícios cobre bem a academia (nenhuma vaga vazia), mas deixa **buracos medidos** em casa, no condomínio e com um aparelho só: extensora, abdução, adução e panturrilha sentada ficam vazias em todo cenário de casa; só o kettlebell deixa as costas sem nenhuma opção; só a polia dupla deixa a remada, o ombro posterior e o tríceps acima da cabeça vazios. A evidência nova **não muda as regras de escolha** (a extensora para o reto femoral é **moderada**; tríceps acima da cabeça, flexora sentada e panturrilha em pé são **um estudo** cada), mas **corrige justificativas** (o agachamento profundo vale pelo glúteo e pelo adutor, não pelo quadríceps). O que mais rende por custo são duas variações baratas de halteres (remada unilateral sem banco e rosca martelo); entre os equipamentos novos, as caneleiras e a mini-band são os que mais tapariam buracos (**estimado, não medido**). **Nenhum exercício nem equipamento novo tem ensaio de hipertrofia próprio**: todos entram pela equivalência de equipamento (robusta) e por consenso na técnica.

### Palavras deste arquivo
- **Vaga** (ou função): um lugar do treino com um propósito, por exemplo "puxar horizontal" ou "tríceps acima da cabeça". São 22, em `src/domain/gerador/funcoes.json`. Cada vaga lista exercícios em **níveis de preferência** (n1, n2, n3…); o gerador usa só o 1º nível que o equipamento da pessoa permite.
- **Opção**: exercício que cabe na vaga, no nível usado. **0 opção** = vaga vazia; **1 opção** = o app repete sempre o mesmo exercício.
- **Cenário**: um conjunto de equipamento (por exemplo, "casa com halteres e elásticos" ou "só kettlebell").
- **Complexidade** (1 a 3): quão difícil é aprender o exercício; decide o que o iniciante vê.
- **Posição alongada**: o músculo trabalhando esticado (o tríceps com o braço acima da cabeça, os posteriores com o quadril dobrado). **Parcial alongada**: repetição feita só na metade em que o músculo está esticado.
- **Isolador**: exercício de uma articulação só (rosca, extensora). **Multiarticular**: várias (supino, agachamento).
- **EMG**: medida da atividade elétrica do músculo. Mostra quanto ele "liga", **não quanto cresce**. **Ressonância** e **ultrassom** medem o tamanho do músculo: é isso que conta como hipertrofia.
- **Custo de animação** (`08-equipamentos-v2.md`, seção 6): **P** = 1 (variação de uma animação que já existe); **M** = 2 (animação nova com peças simples); **peça nova** = +6 na 1ª animação de uma família que o motor ainda não desenha.

## Resumo por pergunta

| # | Pergunta | O que a evidência diz | Selo |
|---|---|---|---|
| B.1 | Onde estão os buracos | Medido: a academia completa tem 0 vaga vazia e 4 com uma opção só; casa e condomínio, pelo atalho, têm 4 vazias (extensora, abdução, adução, panturrilha sentada) e 6 a 13 com uma só; com um aparelho só, de 4 (só elásticos) a 11 (só kettlebell) vazias. O ombro lateral tem só 3 exercícios na biblioteca inteira; os adutores, 1. A repetição do mesmo exercício vem quase toda da falta de opção, e o resto vem da ordem de desempate do gerador. | — (medida) |
| B.2.1 | Por músculo | Extensora para o reto femoral: três ensaios de três grupos. Tríceps acima da cabeça, flexora sentada, panturrilha em pé, rosca inclinada para o bíceps: um ensaio cada. O agachamento profundo cresce mais o glúteo e o adutor, e não o quadríceps. Parcial alongada ≈ amplitude completa nos braços (dois ensaios). Costas, ombro posterior, adutores (adução isolada) e abdômen: **nenhum ensaio** que compare exercícios. | moderada (reto femoral; parcial ≈ completa); um estudo (cada escolha); consenso (costas, ombro posterior, abdômen, adução) |
| B.2.2 | Por nível e complexidade | O iniciante começa por máquinas e apoiados (crescem igual, robusta). Nenhum estudo diz que parciais, descida lenta ou excêntrica acentuada são "só do avançado". No código, o filtro de nível é só a complexidade máxima, então **intermediário e avançado veem as mesmas opções**, e só 7 dos 110 exercícios ficam fora do iniciante. | robusta (equipamento); consenso (o corte por nível) |
| B.2.3 | Equipamentos novos (17, com o sandbag) | Nenhum tem ensaio de hipertrofia próprio em adultos saudáveis. Caneleiras e mini-band tapariam vagas vazias de casa; o colete sobe o teto do peso do corpo; argolas, GHD, pendular e abdução em pé cabem num item que já existe; os outros não valem **[opinião]**. O sandbag fica como pergunta ao Gustavo. | um estudo (pontos isolados, populações diferentes); consenso (o resto) |
| B.2.4 | Exercícios que faltam nos equipamentos que já existem | Os que abrem vaga: remada unilateral sem banco e rosca martelo (halteres); remada, stiff, rosca e francês com kettlebell; remada unilateral, crucifixo invertido e francês unilateral na polia. Swing, pullover, Arnold, coice de tríceps, crucifixo no chão, pegada neutra, elevação em Y e pegadas de máquina **só duplicam**. | robusta (equivalência); um estudo (tríceps acima da cabeça); consenso (técnica) |
| B.2.5 | Escadas | Degrau de descida lenta, unilateral, pausa e ângulo do corpo. Ninguém testou a ordem de uma escada. Step e banco viram degraus, como decidido. | moderada (descida lenta; unilateral = bilateral); um estudo (escada do bilateral ao unilateral); consenso (cada degrau como passo) |
| B.2.6 | Segurança | Nenhum dado de lesão com kettlebell em casa, fita de suspensão, bola ou step. A remada curvada sem apoio carrega mais a lombar (biomecânica). O risco da suspensão é a âncora. | um estudo (carga lombar); consenso (o resto) |
| B.2.7 | Vídeos | 29 vídeos de referência visual, com canal e título; **não assistidos** e nunca fonte de regra. | — |
| B.3 | Lista de entrada | Medida numa cópia do app: a remada unilateral sem banco (razão 36) e a rosca martelo (26) lideram; os de kettlebell e polia valem 3 a 6 cada; quatro dos decididos em 04/11 aparecem como 0 porque mudam o nível da vaga, e não o número de opções. | — (medida) |

## Já decidido pelo Gustavo em 04/11 (não volta como pergunta)
- **Kettlebell** entra **só com animação própria**, com o kettlebell desenhado, e não como halter (`docs/revisoes/equipamento-minimo.md`, sessão de fechamento, item 3).
- **Suspensão:** entram a rosca, o Y/T, o tríceps, a flexão de joelho e o búlgaro na suspensão. A **flexão de braço na suspensão ficou de fora** (item 4).
- **Paralelas e bola:** a elevação de joelhos nas paralelas, o abdominal na bola e a ponte com os pés na bola entram, como variedade (item 4).
- **Step e banco** viram **degraus de escada**, e não exercícios novos: subida no step, búlgaro no step e hip thrust com o peso do corpo (item 4).
- **O R4 do boneco vem antes das animações do elástico** (seção "Animações do elástico: o R4 vem antes").
- **Pergunta de objetivo:** opção (b), já registrada no `12-outros-objetivos.md`.

## O que muda em relação ao que o projeto dizia
1. **O agachamento profundo justificado pelo quadríceps** (`04`, linha do quadríceps: "agachamento livre **profundo**"). Em Kubo 2019 (17 homens, 10 semanas, ressonância), o quadríceps cresceu **igual** no agachamento completo e no meio agachamento (+4,9% × +4,6%). A profundidade fez diferença no **glúteo** (+6,7% × +2,2%) e nos **adutores** (+6,2% × +2,7%), e o reto femoral não cresceu em nenhum dos dois. No leg press, a amplitude também não mudou o quadríceps (Larsen 2025, registro do `04`). **Fica:** "profundo" se justifica pelo glúteo e pelo adutor (um estudo), não pelo quadríceps.
2. **Reto femoral:** a extensora o cresce e o agachamento não. Kinoshita 2026 (17 não treinados, uma perna em cada, 12 semanas): reto femoral +13,2% com a extensora × +1,1% com o leg press; Kassiano 2026 (63 mulheres) e Zabaleta-Korta 2021 no mesmo sentido; Kubo 2019: nenhum agachamento cresceu o reto femoral. O `04` deu "um estudo cada"; com três grupos independentes, o selo é **moderada**, como o `08` já tinha posto.
3. **Gschneidner 2025 e Wolf 2025 não derrubam `selecao.alongado`.** Os dois mostram que a **parcial alongada ≈ amplitude completa** (Gschneidner: 297 pessoas, 15 locais, 12 semanas; Wolf: 30 treinados, 8 semanas). A regra `selecao.alongado` é sobre **qual exercício escolher** (tríceps acima da cabeça, flexora sentada, panturrilha em pé, extensora), e se apoia em Maeo 2021, Maeo 2023 e Kinoshita 2023 e 2026, não em amplitude parcial. Só a citação de `wolf2025` nessa regra fica estranha: ele mostra equivalência, não vantagem (proposta em "Divergências"). "Parcial alongada ≈ completa nos braços" sobe para **moderada** (dois ensaios coerentes); "parcial alongada é melhor" não tem apoio.
4. **Costas e ombro posterior continuam consenso** na escolha do exercício. Nenhuma das buscas desta sessão (puxada × remada, pegada, pullover, deltoide posterior, latíssimo por espessura) achou ensaio de hipertrofia.
5. **O ombro lateral tem só 3 exercícios na biblioteca** (`elevacao-lateral`, `elevacao-halteres`, `elevacao-lateral-elastico`; `grade.md`). Lanza 2024 dá agora **um estudo** à vaga própria de elevação lateral: só com supino, o deltoide médio cresceu menos que todos os outros músculos medidos.
6. **A monotonia** (o mesmo exercício em todos os dias da vaga) vem de duas coisas. Na maior parte, da **falta de opção** (`monotonia.md`: bíceps repete sem opção em 85,9% dos programas em que repete; abdômen 86,2%; elevação lateral 84,2%; tríceps complemento 94,5%). No resto, da **ordem de desempate do gerador**: dor leve → estabilidade (só para o iniciante) → carga possível → quantas vezes já foi usado na semana → "prefiro este" → tem animação → id. Como a variedade ("quantas vezes já foi usado") vem depois da estabilidade e da carga, o iniciante na academia recebe sempre a mesma elevação lateral, mesmo havendo outra (`src/domain/gerador/index.ts`, desempate).
7. **"Só halteres fica sem costas" não é verdade.** Com halteres e sem banco existe a `remada-curvada-halteres` (1 opção, sem apoio). Entre os aparelhos com carga livre, **só o "só kettlebell" tem as costas em 0** (e, claro, o "nada marcado") (`grade.md` e `cenarios.md`).
8. **Barbalho 2020** (31975359): a página do PubMed **não mostra aviso de retratação nem de expressão de preocupação** (conferido em 04/11/2026). A lembrança de um pesquisador de que outros artigos do mesmo autor foram retratados é **NÃO VERIFICADA** e não entra no texto. O estudo (22 mulheres bem treinadas) achou o agachamento **melhor** que o hip thrust para o glúteo, e Plotkin 2023 achou **igual**: os dois divergem, e Barbalho **não sobe o selo sozinho**. Fica "agachamento profundo ≥ hip thrust para o glúteo" (um estudo cada).
9. **`attarieh2026`:** título, periódico e DOI agora conferidos na lista do PubMed ("Regional Hypertrophy of the Gluteal Muscles Is Task-Specific…", *J Strength Cond Res*, DOI 10.1519/JSC.0000000000005701). O resumo não foi relido.
10. **Bíceps contado pela metade** (`04` e a ficha `rosca-scott`): Kobayashi 2026 diz também que o **bíceps braquial cresceu mais na inclinada** (+22,1% × +18,9%), enquanto o braquial e o braquiorradial cresceram mais na Scott. Para a vaga de "bíceps", a inclinada (ou a polia por trás do corpo) vem primeiro **[opinião]**.
11. **Crucifixo:** `pinto2025` mostra que o **voador cresce o peitoral**, e que as duas porções cresceram parecido (sem crescimento regional). Não mostra que o crucifixo acrescenta algo ao supino: essa parte continua **consenso**.
12. **Inclinado (`chaves2020`)** foi feito em **não treinados**; em treinados não há ensaio.
13. **Ombro anterior:** Lanza 2024 dá **um estudo** a "o supino cresce o deltoide anterior", o que apoia dispensar o isolador de ombro anterior. Continua sem ensaio "desenvolvimento × nada" para quem já faz supino.
14. **"Multiarticular basta para os braços"** se apoia em `gentil2015` (o mesmo PMID 26244600 que o `04` chama de "de França 2015"), que em `fontes.md` está NÃO VERIFICADO. O estudo irmão em não treinados (`gentil2013`, resumo lido) diz o mesmo para os flexores do cotovelo. Vale só para o bíceps: o tríceps acima da cabeça tem `maeo2023` no sentido contrário.
15. **Extensora na parte alongada:** Pedrosa 2022 (45 mulheres não treinadas) achou mais crescimento relativo na parcial com o joelho bem dobrado do que na amplitude completa, em algumas regiões da coxa. Nem o `04` nem `selecao.alongado` citam isso.
16. **Larsen 2025 do leg press (40113586)** é citado no `04` como lido, mas **não tem chave em `fontes.md`** (a chave `larsen2025` é a da elevação lateral). Proposta: reler e criar `larsen2025b`.
17. **`kassiano2026`**: o título visto diz "Back Squat", e `fontes.md` e o `08` dizem "agachamento no smith". Conferir no resumo.
18. **Adutores:** o projeto já tinha três ensaios que mediram o adutor (Kubo 2019, Plotkin 2023, Kinoshita 2026), com o mesmo recado: **agachar profundo e leg press crescem o adutor** (um estudo cada). O que continua consenso é a máquina adutora e o Copenhagen.
19. **Sóleo** (`04`: "a sentada só como complemento para o sóleo"): o número do sóleo de Kinoshita 2023 não foi registrado no projeto. Até reler, o "complemento para o sóleo" é **consenso**.
20. **Hack:** o `08` deu "um estudo" ao hack, mas o único ensaio que o inclui é um programa **variado** (`kassiano2025var`), que não compara o hack com o agachamento livre. "Hack ≈ agachamento livre" é **robusta pela equivalência geral** e **consenso** para o hack em si.
21. **Biblioteca:** são **110** exercícios (H2 contou 106, numa versão anterior do dia). O app tem 13 músculos: 11 com meta de séries, mais o ombro anterior e os adutores, sem meta própria (`MUSCULOS_COM_META`).

## Divergências entre os pesquisadores e como ficou
| Ponto | Posições | Como ficou neste arquivo |
|---|---|---|
| Barbalho 2020 e a regra do glúteo | H2: o estudo "deixa mais forte" a `selecao.gluteo` e pediu conferir uma retratação lembrada de memória | A página do PubMed não mostra aviso; a lembrança fica NÃO VERIFICADA. Como diverge de Plotkin 2023, **não sobe o selo** (correção 8) |
| `wolf2025` nas fontes de `selecao.alongado` | H1: tirar `wolf2025` da regra ou citá-lo como "a parcial alongada é alternativa válida" | A regra não cai (correção 3). A troca da citação fica como **proposta**, para a decisão do Gustavo |
| Crucifixo invertido na polia | H1: "quase inútil", porque o face pull cobre quem tem polia; W2: vaga nova, porque o face pull pede corda e a polia dupla sozinha não tem | Ficou a de W2, que a medida confirma: com só a polia dupla, ombro posterior 0 → 1 (B.3) |
| Elevação de pernas estendidas na barra | H2: exercício novo (`elevacao-pernas-barra`, complexidade 3); W2: já é o último degrau da escada da `elevacao-joelhos` | Ficou **degrau**, sem id novo: não cria opção |
| Caneleiras e colete | H2: entram como **carga**, sem exercício próprio; W1: caneleiras são **item novo** com exercícios próprios (extensão de joelho sentado, abdução e adução deitado) | As duas concordam no colete (carga). Nas caneleiras, ficou a de W1, porque as vagas que elas tapam pedem exercícios que não existem; **é pergunta ao Gustavo** |
| Abdução em casa | H2: `abducao-elastico` com o elástico (mini-band incluída); W1: a mini-band é item próprio, porque não abre os exercícios do elástico longo, e vice-versa | Ficou a separação de W1, como pergunta. W1 lembra que parte do buraco também fecha com o elástico longo preso no tornozelo |
| Sandbag | H2: carga equivalente ao goblet e ao stiff **[opinião]**; W1: não decide | **Pergunta ao Gustavo**, com prós e contras (B.2.3) |
| Kettlebell "vale como halter" | `10` (P5) e W2: equivalência de carga (consenso pela equivalência robusta) | Decidido em 04/11: entra **só com animação própria**. A equivalência continua valendo como base de evidência |
| Tríceps na suspensão | Decidido que entra; W2: o ombro fica flexionado só a ~90–120°, então não cumpre "acima da cabeça" | Entra como **complemento de tríceps**, não na vaga obrigatória do tríceps acima da cabeça (proposta de W2) |
| Flexão de joelho na suspensão | Decidido que entra; W2: no nível 3, tiraria a deslizante e o nórdico (nível 4) do intermediário e do avançado | Proposta: **nível 4**, junto da deslizante e do nórdico (B.2.4) |
| "Só halteres fica sem costas" | Uma afirmação do orquestrador numa conversa; W2: falso | Falso (correção 7) |

---

## B.1 O mapa medido, em resumo

Fonte: `docs/revisoes/catalogo/grade.md`, `cenarios.md` e `monotonia.md` (110 exercícios, 22 vagas, 64 cenários em 52 classes, 5.616 programas). O que segue são números do script, não estimativas.

**Vagas vazias (0) e com uma opção só (1), por cenário** (iniciante / avançado):

| Cenário | Vagas com 0 | Vagas com 1 | Quais estão vazias |
|---|---:|---:|---|
| Academia completa (atalho) | 0 / 0 | 4 / 4 | nenhuma; com 1 só: extensora, flexão de joelho, adução, panturrilha sentada |
| Casa com halteres e elásticos (atalho) | 4 / 4 | 13 / 13 | extensora, abdução, adução, panturrilha sentada |
| Condomínio com multifuncional (atalho) | 4 / 4 | 11 / 11 | as mesmas 4 |
| Academia do bairro sem polia | 3 / 3 | 11 / 11 | abdução, adução, panturrilha sentada |
| Só elásticos | 4 / 4 | 16 / 16 | as mesmas 4 da casa |
| Elásticos e barra fixa de porta (o Diego) | 4 / 4 | 14 / 14 | as mesmas 4 |
| Só halteres (2 a 20 kg), sem banco | 5 / 5 | 13 / 12 | as 4 e o crucifixo |
| Só polia dupla | 7 / 7 | 11 / 10 | entre elas: puxar horizontal, ombro posterior, tríceps acima da cabeça |
| Só suspensão | 9 / 9 | 11 / 10 | — |
| Só barra fixa | 10 / 10 | 8 / 7 | — |
| Só kettlebell | 11 / 11 | 9 / 8 | puxar vertical e horizontal, crucifixo, elevação lateral, ombro posterior, bíceps, tríceps acima da cabeça, extensora, abdução, adução, panturrilha sentada; o "dobrar o quadril" cai para a flexão de joelho |
| Nada marcado | 11 / 11 | 9 / 8 | crucifixo, puxar vertical e horizontal, elevação lateral, ombro posterior, bíceps, tríceps acima da cabeça, extensora, abdução, adução, panturrilha sentada |

**Na biblioteca inteira** (`grade.md`): o isolador de quadríceps é 1 só (`cadeira-extensora`); a adução, 1 (`aducao-maquina`); a abdução, 2, ambos de academia; o ombro lateral, 3; o tríceps no empurrar, 3.

**Monotonia** (`monotonia.md`): onde a vaga aparece em 2 dias ou mais, ela **repete sem ter opção** em mais de 80% dos casos em 8 vagas (empurrar horizontal e inclinado, elevação lateral, bíceps, tríceps complemento, extensora, panturrilha em pé e abdômen; a extensora chega a 100%), e **repete havendo opção** em 0% a 21,2% (o máximo é a extensão de quadril; depois, o tríceps acima da cabeça com 16,7%). A causa da 2ª parte é a ordem do desempate (correção 6).

---

## B.2.1 Por músculo

> Para cada músculo: o que tem evidência de crescer mais e por quê; o que serve como variação no mesmo nível; a escada do iniciante ao avançado; o que fica sem resposta. Fontes do tronco: H1; das pernas e do abdômen: H2.

### Peito
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| O equipamento não decide | Máquina e peso livre crescem igual (meta-análise; um ensaio com 8 exercícios e medida por músculo). | robusta | `haugen2023`, `hernandezbelmonte2023` (no projeto) |
| Inclinado × reto | Em homens jovens **não treinados**, o supino inclinado cresceu mais a parte de cima do peitoral. Em treinados, nenhum ensaio. | um estudo | `chaves2020` (no projeto; a releitura falhou) |
| Flexão × supino | 18 homens, 8 semanas: flexão ajustada a ~40% de 1RM ≈ supino a 40% de 1RM, no peitoral e no tríceps. | um estudo | `kikuchi2017` (no projeto) |
| O que o supino sozinho cresce | 24 homens (13 treinaram, 11 controles), 10 semanas só de supino, 3–4 × 12 a 50–55% de 1RM, 3 vezes por semana, ressonância: peitoral maior, peitoral menor, **deltoide anterior** e tríceps cresceram mais que no controle; o **deltoide médio** cresceu menos que todos os outros. | um estudo | `lanza2024` (lido nesta sessão; reconferido) |
| Voador | 15 homens não treinados, 12 semanas, um lado com 1 série e o outro com 3: porção de cima +17% × +18%, porção do meio +21% × +21%. Os autores dizem que **não** houve crescimento regional. | um estudo | `pinto2025` (relido nesta sessão) |
| Só descer × só subir | 23 mulheres jovens, 10 semanas: espessura do peitoral +17,7% só com a descida (excêntrico) e +14,0% só com a subida (concêntrico); tríceps e peitoral somados, +12,4% × +7,1%. Compara descida pura com subida pura, não com o treino normal. | um estudo | `hakkinen2022` (lido nesta sessão) |
| Crucifixo como 2º exercício | Nenhum ensaio compara crucifixo e supino, nem testa o crucifixo somado ao supino (busca "chest fly hypertrophy pectoralis": 0). | consenso | `consenso-projeto` |
| Mergulho | Pico de EMG do tríceps maior nas paralelas que no banco; o banco pede mais extensão do ombro. Nenhum ensaio de hipertrofia. | consenso (EMG como apoio) | `mckenzie2022` |
| Posição alongada no peito | Não testada: os ensaios de comprimento muscular são de tríceps, posteriores, panturrilha e quadríceps. | consenso | `wolf2025`, `gschneidner2025` (não mediram o peito) |

- **Variações no mesmo nível:** supino com halteres ≈ barra ≈ máquina ≈ smith ≈ polia ≈ flexão com carga que leve perto da falha (robusta; um estudo para a flexão). Inclinado com halteres ≈ polia ≈ smith ≈ máquina (consenso). Voador ≈ crucifixo com halteres ≈ na polia ≈ com elástico (um estudo para o voador; consenso para a equivalência).
- **Do iniciante ao avançado** (consenso na ordem): 1) supino na máquina ou flexão inclinada; 2) supino com halteres, flexão no chão; 3) supino com barra (com travas), flexão com pés elevados ou descida lenta; 4) flexão nas argolas ou na suspensão, flexão com colete, mergulho; 5) mergulho com lastro.
- **Sem resposta:** inclinado × reto em treinados; crucifixo somado ao supino; mergulho, argolas e colete com medida de músculo; largura da pegada.

### Costas (latíssimo e dorsais)
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Puxada × remada | Nenhum ensaio de hipertrofia comparando (buscas com 0 resultado). | consenso | `consenso-projeto` |
| Pegada (pronada, supinada, neutra; aberta, fechada) | A ativação do latíssimo muda pouco (vários EMGs). Nenhum ensaio de hipertrofia. | consenso (EMG como apoio) | `andersen2014`, `lusk2010`, `youdas2010`, `dickie2017` |
| Puxada atrás da nuca | Uma revisão narrativa de EMG desaconselha; não é dado de crescimento. | consenso (EMG) | `difonza2026` |
| Remada invertida | Maior ativação do latíssimo e menor carga lombar que a remada curvada e a unilateral na polia (7 homens, EMG). | consenso (EMG como apoio) | `fenwick2009` |
| Barra na suspensão, com toalha, tradicional | EMG igual no latíssimo (15 treinados). | consenso (EMG) | Snarr 2017 (28828073; resumo lido no `10`, chave proposta lá) |
| Pullover e amplitude no latíssimo | Nenhum ensaio (busca "pullover hypertrophy": 0). | consenso | `consenso-projeto` |
| Equipamento | Máquina = peso livre = polia, inclusive nas remadas e puxadas. | robusta | `haugen2023`, `hernandezbelmonte2023` |

- **Variações:** barra fixa (qualquer pegada) ≈ puxada na máquina ou na polia ≈ graviton; remada apoiada ≈ baixa na polia ≈ articulada ≈ unilateral ≈ curvada ≈ invertida ≈ na suspensão (consenso).
- **Do iniciante ao avançado** (consenso): vertical: puxada ou graviton → barra com elástico ou só a descida → barra fixa → barra com lastro. Horizontal: articulada, apoiada ou polia → unilateral com halter, invertida mais em pé → invertida mais deitada, suspensão → curvada com barra, invertida com pés elevados.
- **Sem resposta:** puxada × remada, pegada, amplitude e pullover para o crescimento do latíssimo. É a lacuna mais importante do tronco, porque costas é músculo grande e o gerador lhe dá 2 vagas por semana. Se duas funções (vertical + horizontal) rendem mais que dois exercícios da mesma função: nenhum ensaio (`selecao.exercicios-por-musculo` é consenso).

### Ombro anterior (sem meta própria)
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Série indireta | Os empurrares contam 0,5 série para o ombro anterior. | moderada (a contagem fracionada) | `pelland2026` |
| O supino cresce o deltoide anterior | Ver Peito: cresceu mais que no controle, por ressonância. | um estudo | `lanza2024` |
| Sentado × em pé | Sentado e mais estável: carga maior e ativação dos deltoides menor que em pé com halteres (15 homens, EMG). | consenso (EMG) | `saeterbakken2013` |
| Precisa de isolador? | Nenhum ensaio testou acrescentar desenvolvimento ou elevação frontal a quem já faz supino. | consenso | `consenso-projeto` |
| Pike | Nenhum estudo de EMG nem de crescimento. | consenso | ficha `pike` |

- **Variações:** desenvolvimento com halteres ≈ máquina ≈ barra ≈ unilateral ≈ elástico (consenso). Landmine para quem tem dor acima da cabeça **[opinião]**; sem estudo.
- **Do iniciante ao avançado** (consenso): máquina ou halteres sentado → unilateral em pé, elástico → barra em pé, pike com pés elevados. Parada de mão na parede: fora **[opinião]** (risco de queda).
- **Sem resposta:** se o ombro anterior precisa de exercício próprio em quem faz 2 empurrares por semana.

### Ombro lateral
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Halter × polia | Em treinados, a elevação lateral com halter e na polia cresceu o deltoide lateral igual. | um estudo | `larsen2025` (no projeto; a releitura falhou) |
| O supino não basta | Só com supino, o deltoide médio cresceu menos que os outros músculos medidos. Apoia uma vaga própria de elevação lateral. | um estudo | `lanza2024` |
| O desenvolvimento conta? | O desenvolvimento ativa o deltoide lateral (revisão de EMG); contar 0,5 série é decisão do projeto. | consenso (EMG como apoio) | `rabello2024`, `pelland2026` |
| Parcial alongada | Nenhum ensaio no deltoide (busca "lateral raise lengthened partial": 0). | consenso | `wolf2025`, `gschneidner2025` (só braços e coxa) |
| Elástico | Nenhum ensaio no deltoide; o elástico cresce em idosas contra controle. | consenso | `harper2025` |

- **Variações:** halteres ≈ polia ≈ elástico ≈ máquina de elevação lateral (um estudo para halter ≈ polia; consenso para o resto). **Na biblioteca, só 3 exercícios.**
- **Do iniciante ao avançado:** sentada ou na polia → em pé com halteres ou elástico (um estudo) → polia com o cabo por trás (consenso) → parciais na parte de baixo depois da falha (consenso no deltoide). **Sem equipamento, não há elevação lateral** (`10`).
- **Sem resposta:** parciais, posição do cabo, elevação deitada; quanto volume precisa quem já faz desenvolvimento.

### Ombro posterior
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Qual cresce mais | Nenhum ensaio de hipertrofia (busca "rear deltoid hypertrophy training": 0). | consenso | `consenso-projeto` |
| Voador invertido × remada × puxada | O voador invertido ativou mais o deltoide posterior (12 treinados, EMG). | consenso (EMG) | `franke2015` |
| Posição da mão no crucifixo invertido | Muda a ativação do deltoide posterior (EMG). | consenso (EMG) | `schoenfeld2013` |
| Recebe das remadas | Remadas e puxadas contam como série indireta (decisão do projeto). | consenso | `pelland2026`, `consenso-projeto` |

- **Variações:** voador invertido ≈ crucifixo invertido apoiado ≈ curvado ≈ na polia (cabos cruzados) ≈ face pull (consenso).
- **Do iniciante ao avançado** (consenso): voador invertido ou crucifixo apoiado → face pull → crucifixo invertido curvado.
- **Sem resposta:** tudo o que importa (qual exercício, se o isolador acrescenta algo às remadas, quanto volume).

### Bíceps
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Inclinada (ombro estendido) × Scott (ombro flexionado) | 21 não treinados, um braço em cada, 12 semanas, ressonância: **bíceps** +22,1% na inclinada × +18,9% na Scott; **braquial** +17,1% × +21,1% e **braquiorradial** +13,5% × +17,6%, os dois maiores na Scott; **total dos flexores** +17,6% × +19,2%, sem diferença. | um estudo | `kobayashi2026` (lido nesta sessão) |
| Scott × rosca na polia por trás do corpo | Parecidas (15 homens). | um estudo | `attarieh2025` (no projeto) |
| Scott com barra × na polia | 35 adultos, 10 semanas: bíceps +8% × +7%, sem diferença. | um estudo | `nunes2020` (relido nesta sessão) |
| Scott e região de baixo do braço | Cresceu a região distal em mulheres com treino recreativo. | um estudo | `zabaletakorta2023` (no projeto) |
| Parte inicial da amplitude | Rosca só na parte inicial cresceu mais que só na final (registro da v1; população e número não conferidos). | um estudo | `pedrosa2023` (verificado-busca) |
| Parcial alongada × completa | 30 treinados, 8 semanas: espessura dos flexores e dos extensores do cotovelo parecida. Ensaio pré-registrado em 15 locais (163 × 134 pessoas, 12 semanas): área do braço e da coxa "praticamente equivalente" (efeito estimado −0,032 no braço; o teste formal de equivalência não passou do limite rígido que os autores fixaram, e eles concluem que a diferença é pequena). | moderada (≈, não "melhor") | `wolf2025`, `gschneidner2025` (lidos nesta sessão; Gschneidner reconferido) |
| Precisa de rosca se já faz puxadas? | 29 homens **não treinados**, 10 semanas: puxada + supino × o mesmo + rosca + tríceps: flexores do cotovelo +6,5% × +7,04%, sem diferença. | um estudo (não treinados) | `gentil2013` (lido nesta sessão); `gentil2015` (NÃO VERIFICADO) |

- **Variações:** inclinada ≈ polia por trás do corpo; Scott com barra W ≈ halter ≈ polia ≈ máquina; rosca com barra W ≈ alternada ≈ polia ≈ elástico (consenso; um estudo para cada par testado).
- **Do iniciante ao avançado:** máquina, Scott ou polia (consenso) → inclinada, alternada, elástico (um estudo) → polia por trás, unilateral (um estudo) → parciais alongadas depois da falha (moderada para ≈); barra supinada com lastro (consenso).
- **Sem resposta:** rosca martelo (nenhum ensaio lido); quase tudo em não treinados e com um braço contra o outro.

### Tríceps
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Acima da cabeça × ao lado do corpo | 21 adultos, um braço em cada, 12 semanas, ressonância: cabeça longa +28,5% × +19,6%; tríceps inteiro +19,9% × +13,9%, mesmo com cargas 34–39% menores acima da cabeça. | um estudo (efeito moderado a grande) | `maeo2023` (relido nesta sessão) |
| Flexão e supino crescem o tríceps | Flexão ≈ supino a 40%; flexão na suspensão +16% (8 homens, sem controle). | um estudo cada | `kikuchi2017`, `kohiruimaki2019` |
| Mãos juntas na flexão | Ativa mais o tríceps (2 EMGs). | moderada ("ativa mais", não "cresce mais") | `cogley2005`, `marcolin2015` |
| Mergulho | Pico de tríceps maior nas paralelas (EMG); nenhum ensaio de crescimento. | consenso | `mckenzie2022` |
| Tríceps testa (deitado) | Nenhum ensaio; o ombro fica entre "ao lado" e "acima da cabeça" **[opinião]**. | consenso | `consenso-projeto` |
| Parcial alongada | Parcial alongada ≈ completa nos extensores do cotovelo. | moderada (≈) | `wolf2025`, `gschneidner2025` |
| Só descer × só subir | Mulheres jovens: cabeça longa +8,7% × +3,4%; cabeça lateral +15,7% × +9,7%. | um estudo | `hakkinen2022` |

- **Variações:** francês na polia ≈ halter ≈ elástico ≈ máquina acima da cabeça (consenso; um estudo para a posição). Corda ≈ barra reta ≈ máquina ≈ mergulho ≈ flexão fechada (consenso).
- **Do iniciante ao avançado:** polia e francês na polia → francês com halter, flexão fechada → mergulho → mergulho com lastro (consenso na ordem).
- **Sem resposta:** réplica independente de Maeo 2023; testa, mergulho e extensões no peso do corpo sem ensaio.

### Quadríceps (com o reto femoral)
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| A profundidade do agachamento não muda o quadríceps | 17 homens, 10 semanas, ressonância: extensores do joelho +4,9% (completo) × +4,6% (meio), sem diferença; o reto femoral não mudou em nenhum dos dois. O completo deu mais força no agachamento completo (+31,8% × +11,3%). | um estudo | `kubo2019` (lido nesta sessão; conferido) |
| No leg press, a amplitude também não muda | Em treinados, a amplitude do joelho no leg press não mudou o crescimento do quadríceps. | um estudo (registro do `04`; reler) | Larsen 2025, leg press (40113586; sem chave em `fontes.md`) |
| A extensora cresce o reto femoral; agachar, não | Extensora × leg press (17 não treinados, uma perna em cada, 12 semanas, ressonância de 17 músculos): reto femoral **+13,2% × +1,1%**; vastos e quadríceps inteiro parecidos (+7,1% × +4,9%); só o leg press cresceu o glúteo máximo (+15,4%) e o adutor magno (+6,2%). Extensora × agachamento em 63 mulheres: a extensora cresceu mais o reto femoral, e o agachamento, o vasto lateral. Mesmo sentido em Zabaleta-Korta 2021. Nenhum agachamento cresceu o reto femoral em Kubo 2019. | **moderada** (3 ensaios, 3 grupos, mesmo sentido) | `kinoshita2026` (lido nesta sessão; conferido), `kubo2019`, `kassiano2026`, `zabaletakorta2021` (no projeto) |
| Por quê | O reto femoral cruza o quadril e o joelho; no agachamento, ele encurta num e alonga no outro, e o comprimento quase não muda. | consenso (anatomia) | `consenso-projeto` |
| Extensora no joelho bem dobrado | 45 mulheres não treinadas, 4 amplitudes: a parcial com o quadríceps mais alongado (100° a 65°) cresceu mais, em termos relativos, que a completa e que a parcial final, em algumas regiões da coxa. | um estudo (não treinadas) | `pedrosa2022` (lido nesta sessão) |
| Encosto reclinado na extensora | Com o quadril a 40° (encosto reclinado), o reto femoral cresceu mais que a 90°, em 22 homens não treinados, 10 semanas; o vasto lateral, igual (lido em 05/11/2026). | um estudo (não treinados) | `larsen2025c` (39699974) |
| Máquina = peso livre | Mesmo ganho de tamanho e de força. | robusta | `haugen2023`, `hernandezbelmonte2023` |
| Variar a máquina de agachar | 70 mulheres: alternar leg press, hack e smith ≈ repetir o leg press. | um estudo | `kassiano2025var` |
| Unilateral = bilateral | Mesmo crescimento. | moderada | `kassiano2025` |
| Descida lenta | 18 não treinados, 7 semanas: descida de 4 s cresceu mais o vasto lateral que a de 1 s. | um estudo | `kojic2025` |
| Pendular, belt squat, sissy squat, nórdico invertido | Nenhum ensaio de hipertrofia; só EMG ou arquitetura, NÃO VERIFICADOS. | consenso | NÃO VERIFICADOS: 28595237 (belt squat; ver `evans2019`), 39214520, 30293403 |

- **Variações:** agachamento livre profundo ≈ hack ≈ smith ≈ leg press ≈ goblet ≈ halteres ≈ búlgaro ≈ afundo (robusta para máquina = livre; moderada para unilateral; consenso para pendular e belt squat). Para o reto femoral, **só a extensora tem ensaio**.
- **Do iniciante ao avançado:** academia: leg press, hack, extensora, goblet → smith, afundo, búlgaro com apoio → agachamento livre profundo, búlgaro com halteres pesados → extensora com ênfase no joelho bem dobrado (um estudo, não treinadas). Casa: agachamento com o peso do corpo → afundo parado → afundo para trás → búlgaro → búlgaro com descida de 3–4 s → agachamento unilateral até um banco (um estudo para a escada do bilateral ao unilateral, `wei2023`; consenso na ordem).
- **Sem resposta:** o ângulo do quadril na extensora (39699974, não lido); reto femoral sem máquina (Wei 2023 achou ganho de espessura em mulheres sedentárias; Kubo 2019 não achou volume em homens: medidas e populações diferentes).

### Posteriores da coxa
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Flexora sentada > deitada | Sentada (quadril dobrado): +14% × +9% no volume dos posteriores. | um estudo | `maeo2021` (no projeto) |
| O nórdico cresce os posteriores | 42 homens, 12 semanas: nórdico +11%; a flexão excêntrica com o quadril dobrado, +18%. Em outro grupo, o nórdico cresceu o semitendíneo e o stiff, o semimembranoso. | moderada (cresce); um estudo (menos que a flexão com o quadril dobrado) | `maeo2024`, `morin2025`, `morin2025b` (no projeto) |
| Nórdico × flexora sentada comum | Sem comparação direta: a máquina de Maeo 2024 era só excêntrica. A flexora à frente do nórdico é inferência **[opinião]**. | um estudo; consenso (estender à flexora comum) | `maeo2024`, `maeo2021` |
| Agachar não cresce os posteriores | Nem o completo nem o meio agachamento mudaram o volume dos posteriores. | um estudo | `kubo2019` |
| Dobrar o quadril (stiff, terra romeno) | Cresce o semimembranoso; os autores recomendam flexão de joelho e extensão de quadril. | um estudo (mesmo grupo) | `morin2025`, `morin2025b` |
| GHD e hiperextensão reversa | Só EMG e biomecânica; nenhum ensaio de hipertrofia. | consenso | `lawrence2019`; NÃO VERIFICADOS: 24149748, 28658084, 34027916, 36096478 |
| Volume e dor do nórdico | Volume baixo basta para força e arquitetura; para espessura, só o alto (atletas). A 1ª sessão dói 2–4 dias; o assistido dói menos. | moderada (atletas); um estudo (dor) | `cuthbert2020`, `cholp2025`, `coratella2025`, `behan2023`, `ishoi2025` |

- **Variações:** flexora sentada > mesa (um estudo). Sem máquina: bola ≈ deslizante ≈ elástico (consenso). Stiff com barra ≈ halteres ≈ unilateral ≈ pull-through ≈ elástico ≈ hiperextensão (robusta para máquina = livre; consenso para cada par).
- **Do iniciante ao avançado:** flexora, elástico ou deslizante com as duas pernas; pull-through, stiff com elástico, hiperextensão → bola, deslizante com uma perna; stiff com halteres → nórdico assistido → nórdico livre, GHD; terra romeno com barra (moderada para o nórdico; consenso na ordem).
- **Sem resposta:** flexora sentada × nórdico, cabeça a cabeça; GHD e reversa; Bourne 2017 e as buscas de stiff ficaram bloqueadas.

### Glúteos
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Profundo > meio agachamento | Glúteo máximo +6,7% × +2,2%. | um estudo | `kubo2019` |
| Hip thrust × agachamento | Plotkin 2023: crescimento igual do glúteo. Barbalho 2020 (22 mulheres bem treinadas, 12 semanas, espessura): o agachamento cresceu **mais** o glúteo (+9,4% × +3,7%) e o quadríceps (+12,2% × +2%). Nenhum dos dois achou o hip thrust melhor. | um estudo cada, em direções diferentes → **agachar profundo ≥ hip thrust** (um estudo); "o hip thrust é o melhor para o glúteo": sem apoio | `plotkin2023` (no projeto); `barbalho2020` (lido nesta sessão; reconferido) |
| EMG não previu o resultado | O hip thrust ativou mais o glúteo na EMG, mas os dois cresceram igual no ensaio. | consenso (EMG); um estudo (o ensaio) | `contreras2015`, `kennedy2024`, `plotkin2023` |
| Leg press cresce o glúteo | Só o leg press cresceu o glúteo máximo (+15,4%). | um estudo | `kinoshita2026` |
| Extensão de quadril > abdução para o glúteo máximo | 17 pessoas, 10 semanas, polia: extensão +9% no glúteo máximo × abdução +5%; glúteo médio e mínimo +4% com a abdução (números do registro do projeto). | um estudo | `attarieh2026` (no projeto) |
| Stiff, hiperextensão, reversa, mini-band, caneleira, abdução em pé | Nenhum ensaio de hipertrofia do glúteo. | consenso | — |

- **Variações:** agachar profundo ou afundo ≈ leg press (um estudo); hip thrust ≈ smith ≈ ponte com halter ≈ coice na máquina ou na polia (um estudo para hip thrust e coice na polia; consenso para o resto); abdução na máquina ≈ polia ≈ elástico ≈ deitado (um estudo para a polia; consenso).
- **Do iniciante ao avançado** (consenso na ordem): ponte, leg press, goblet profundo, abdução na máquina → ponte unilateral, ponte com carga, búlgaro, coice na polia → hip thrust com barra, agachamento livre profundo, búlgaro com déficit.
- **[opinião, H2]** No agachamento profundo, no búlgaro e no leg press, o glúteo conta 0,5 série (secundário). Pelos ensaios acima, isso pode subestimar o glúteo quando o agachar é profundo (um estudo cada; consenso para a contagem).
- **Sem resposta:** um 3º ensaio de hip thrust × agachamento; stiff, hiperextensão, mini-band e caneleiras para o glúteo.

### Adutores (sem meta própria)
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Agachamento profundo cresce os adutores | Completo × meio: +6,2% × +2,7%. | um estudo | `kubo2019` |
| Agachamento > hip thrust | O agachamento cresceu mais o adutor (número não registrado no projeto). | um estudo | `plotkin2023` |
| Leg press > extensora | Só o leg press cresceu o adutor magno (+6,2%). | um estudo | `kinoshita2026` |
| Agachamento e terra pedem muito do adutor magno | Modelo com EMG em 15 pessoas; modelagem não mede crescimento. | consenso (apoio indireto) | `collings2026` |
| Máquina adutora | Três buscas, nenhum ensaio de hipertrofia. | consenso | — |
| Copenhagen | Há ensaios em jogadores de futebol (arquitetura, força); nenhum resumo abriu; não se sabe se algum mediu o tamanho do músculo. | consenso (crescer); sem selo (arquitetura e força) | NÃO VERIFICADOS: 34948565, 35682148, 40827942 |

- **Variações:** as funções que crescem o adutor com ensaio são agachar profundo e leg press. A adução isolada (máquina ≈ polia ≈ elástico ≈ Copenhagen) é complemento, sem ensaio (consenso).
- **Do iniciante ao avançado** (consenso): agachar profundo, adução na máquina → adução na polia ou com elástico, Copenhagen curto → Copenhagen longo, agachamento livre profundo.
- **Sem resposta:** qualquer ensaio de adução isolada; agachamento sumô (a crença vem de EMG **[opinião]**).

### Panturrilha
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Em pé >> sentada para o gastrocnêmio | Em pé +9% a +12%; sentada +1% a +2%. | um estudo (efeito grande) | `kinoshita2023` (no projeto) |
| Sóleo | Se a sentada cresce mais o sóleo que a em pé **não foi conferido** (resumo bloqueado). | consenso (até reler) | `kinoshita2023` |
| Parcial na parte alongada > completa | Mulheres jovens: com o calcanhar abaixo do apoio, cresceu mais. | um estudo | `kassiano2023b` (no projeto) |
| Parciais depois da falha, posição dos pés, volume | Ensaios existem; nenhum resumo abriu. | sem selo | NÃO VERIFICADOS: 40850937, 39995432, 42006449, 32735428, 38684187 |
| Peso do corpo | Escada do bilateral ao unilateral ≈ barra para o gastrocnêmio. | um estudo (muito pequeno) | `wei2023` |

- **Variações:** em pé na máquina ≈ leg press ≈ step com halter ≈ unilateral no degrau ≈ smith (consenso). **No chão, sem degrau, perde a parte alongada** (um estudo, por `kassiano2023b`). Sentada: complemento do sóleo (consenso).
- **Do iniciante ao avançado:** máquina, leg press, bilateral no degrau (um estudo) → unilateral no degrau, colete ou halter (consenso; moderada para unilateral) → pausa embaixo, parciais alongadas no fim da série (um estudo, em não treinadas).
- **Sem resposta:** sóleo com números conferidos; os três temas acima.

### Abdômen
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Crunch × prancha × roda × elevação de pernas | Cinco buscas, **nenhum ensaio** que compare exercícios de abdômen com medida de hipertrofia. | consenso | buscas registradas |
| Hipertrofia do reto abdominal | 8 homens, flexão na suspensão até a falha, 8 semanas: +27% (ressonância), sem controle. | um estudo (fraco) | `kohiruimaki2019` |
| Crunch com carga, efeito de uma sessão | 15 treinados: duas cargas aumentaram a espessura **logo depois** da sessão. É inchaço, não hipertrofia. | não serve para hipertrofia | `sullivan2023` (lido nesta sessão) |
| Aparelhos de abdômen | Ativação muito variável; alguns ativaram mais o flexor do quadril que o abdômen (EMG). | consenso | `escamilla2006` |
| Por que crunch com carga **[opinião]** | O crunch na polia, na máquina ou com anilha sobe a carga aos poucos; a prancha é isométrica e chega rápido a minutos, contra a faixa de 6–30 repetições do app. | consenso | `escamilla2006` (apoio) |

- **Variações:** polia ≈ máquina ≈ declinado ≈ crunch com anilha ou elástico; elevação de joelhos na barra ≈ elevação de pernas; roda ajoelhada e prancha (consenso, sem ensaio).
- **Do iniciante ao avançado** (consenso): crunch no chão, máquina ou polia → com carga, elevação de joelhos na barra, roda ajoelhada curta → pernas estendidas na barra, roda completa.
- **Sem resposta:** tudo o que importa para a escolha; é o músculo com menos evidência.

### O que fica sem resposta (B.2.1, em resumo)
- Costas, ombro posterior, adução isolada e abdômen: nenhum ensaio que compare exercícios.
- A leitura mais importante que ficou pendente: o ângulo do quadril na extensora (39699974).
- Quase tudo vem de estudos de 10 a 40 pessoas, de 8 a 12 semanas, muitos em não treinados e de um mesmo grupo (Maeo e colegas).

### Buscas registradas (B.2.1)
Ver "Buscas registradas", partes H1 e H2.

---

## B.2.2 Por nível e complexidade

| Nível | O que fazer | Selo | Fontes |
|---|---|---|---|
| Iniciante, primeiro | Máquinas, polias e apoiados (supino na máquina, puxada, remada apoiada, voador, leg press, hack, extensora, flexora sentada, panturrilha na máquina, abdominal na máquina). Cresce igual e é mais fácil de aprender. | robusta (cresce igual); consenso (mais fácil) | `haugen2023`, `hernandezbelmonte2023`, `selecao.estabilidade` |
| Iniciante | As posições alongadas já valem: tríceps acima da cabeça, rosca inclinada ou Scott, extensora, flexora sentada, panturrilha em pé. Os estudos foram feitos em não treinados. | um estudo cada | `maeo2023`, `kobayashi2026`, `kinoshita2026`, `maeo2021`, `kinoshita2023` |
| Iniciante | Volume baixo já cresce: 1 série de voador ≈ 3. | um estudo | `pinto2025` |
| Iniciante | Rosca e tríceps somados a puxada e supino não cresceram mais os flexores do cotovelo. Quando falta tempo, o isolador de bíceps pode sair antes; o de tríceps acima da cabeça, não. | um estudo cada | `gentil2013`, `maeo2023` |
| Iniciante | O nórdico fica de fora (complexidade 3; dor forte na 1ª sessão). | um estudo (dor); consenso (corte) | `coratella2025`, `behan2023` |
| Intermediário | Peso livre e unilateral: barra fixa, mergulho, remada curvada com barra, desenvolvimento em pé, agachamento livre profundo, búlgaro, stiff, hip thrust com barra, nórdico assistido. | consenso | `selecao.mergulho`, `kassiano2025` |
| Qualquer nível | **Parciais alongadas** ≈ amplitude completa nos braços (não são melhores). Servem como alternativa (dor no fim da amplitude) ou para estender a série depois da falha **[opinião]**. Na extensora e na panturrilha, um estudo cada achou vantagem, em não treinadas. | moderada (≈ nos braços); um estudo (extensora, panturrilha); consenso (deltoide, peito, costas) | `wolf2025`, `gschneidner2025`, `pedrosa2022`, `kassiano2023b` |
| Avançado (se entrar) | **Excêntrica acentuada:** o único ensaio lido compara descida pura com subida pura, em mulheres; não compara com o treino normal. Não sustenta regra. | um estudo (descida pura); consenso (no app) | `hakkinen2022` |
| Avançado | **Lastro** (colete, cinto) quando passa de ~30 repetições. | consenso; moderada (até ~30–35 repetições perto da falha crescem) | `10`, pergunta 1 |
| Avançado | **Unilateral com mais amplitude**; **descida de 3–4 s**. | moderada (unilateral = bilateral); um estudo (descida lenta, não treinados) | `kassiano2025`, `kojic2025` |

**Nenhum estudo diz que essas técnicas devem ficar só para o avançado.** Isso é uma decisão de complexidade e de desconforto (consenso).

### O que o código faz com o nível (achado medido)
- O nível só decide a **complexidade máxima**: iniciante até 2; intermediário e avançado até 3 (`NIVEL_COMPLEXIDADE_MAX`, `src/domain/regras/index.ts`).
- Por isso, **intermediário e avançado veem exatamente as mesmas opções**: a biblioteca não tem nada só do avançado.
- **Só 7 dos 110 exercícios ficam fora do iniciante:** `supino-barra`, `remada-barra`, `desenvolvimento-barra`, `agachamento-barra`, `terra-romeno-barra`, `mergulho`, `nordico` (conferido em `grade.md` e na biblioteca).
- Complexidade 1 e 2 dão **o mesmo resultado** no gerador; o desempate de estabilidade usa as marcas `estavel`, `apoiado` e `maquina`, não o número.
- **[opinião, H1]** Se o projeto quiser separar o avançado, isso é uma **técnica por nível** (como `equipamento.escada-carga-leve`), não mais um número de complexidade.

### Complexidade que parece errada
Todos os pontos são **consenso**: nenhum estudo mede a dificuldade técnica de um exercício.

| id | hoje | proposta | por quê |
|---|---|---|---|
| `supino-barra` | 3 | manter (ou 2 só com travas no rack) | O risco é ficar preso sob a barra sem ajudante; o iniciante tem halteres, máquina, smith e flexão no mesmo nível |
| `remada-barra` | 3 | manter | A remada curvada tem a maior carga lombar entre as comparadas (`fenwick2009`) |
| `remada-curvada-halteres` | 2 | manter, mas é incoerente com `remada-barra` = 3 | Mesma postura sem apoio **[opinião]**; o desempate já põe a apoiada à frente para o iniciante |
| `desenvolvimento-barra`, `mergulho`, `terra-romeno-barra`, `agachamento-barra`, `nordico` | 3 | manter | Lombar segurando o tronco; extensão do ombro sob carga; o iniciante tem equivalentes; dor do nórdico |
| `barra-fixa`, `barra-fixa-supinada` | 2 | manter | A dificuldade é a força, não a técnica; subir para 3 tiraria do iniciante a única puxada vertical de quem só tem barra |
| `remada-invertida` | 2 | 1 (sem efeito no gerador) | Graduável pela inclinação do corpo |
| `crucifixo-halteres` | 1 | 2 (sem efeito no gerador) | O ombro fica no fim da amplitude com a carga longe **[opinião]** |
| `agachamento-smith` | 2 | 1 (sem efeito no gerador) | Tão guiado quanto o `hack` (1); a montagem já tem cartão próprio **[opinião]** |
| `afundo-tras` | 2 | manter, e fixar uma regra só | **[opinião]** O afundo parado vem antes do para trás, que vem antes do para a frente |
| `elevacao-joelhos` | 2 | manter; acrescentar `lombar` em `articulacoes` | Pendurar pede pegada e controle do balanço |
| `bulgaro-suspensao` (novo) | — | 3 | O pé de trás balança **[opinião, W2]** |

**Conclusão [opinião]:** nenhuma complexidade parece errada a ponto de mudar o que o iniciante vê. Os pontos são de coerência e a falta de um nível "só avançado".

### O que fica sem resposta (B.2.2)
- Qualquer estudo que teste a ordem "estável primeiro" contra outra ordem em iniciantes (33114782, máquina × peso livre em novatos, ficou NÃO VERIFICADO).
- Parciais, descida lenta e excêntrica acentuada em treinados, com medida de músculo, fora dos braços.

### Buscas registradas (B.2.2)
As mesmas de B.2.1 (partes H1 e H2).

---

## B.2.3 Equipamentos que ainda não estão na taxonomia

> Base: W1. O "o que destrava" foi contado contra o mapa medido, **mas não medido** com o equipamento novo. A coluna "item, capacidade ou não vale" é toda **[opinião]**; quem decide é o Gustavo. Lembrete: em 03/11/2026, mochila, galão e móveis improvisados foram recusados como carga.

### Tabela de princípios
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Carga baixa perto da falha cresce como carga alta | É o que sustenta colete, caneleira e sandbag como carga: até ~30–35 repetições perto da falha. | robusta (carga); moderada (até ~30–35) | `schoenfeld2017b`, `lasevicius2022`, `10` (pergunta 1) |
| O equipamento não decide o crescimento | Máquina e peso livre crescem igual. | robusta | `haugen2023` |
| Usar o colete no dia a dia não é treino | 150 adultos de ~66 anos, 12 meses de perda de peso: só o grupo com **treino resistido** aumentou a área da coxa (+0,5%); o grupo que **vestiu o colete** no dia a dia não diferiu do só dieta. Não testa o colete como carga de exercício. | um estudo (idosos; colete passivo) | `lynch2026` (lido nesta sessão) |
| Saquinhos de 0,5–1 kg em casa | 40 pessoas com mais de 50 anos, diabetes tipo 2 e possível sarcopenia, 12 semanas: massa muscular e circunferência da panturrilha melhoraram contra um controle parado. São pesinhos de mão ou de tornozelo, **não** o sandbag grande. | um estudo (doentes; controle parado) | `chien2022` (lido nesta sessão) |
| Flexão num sistema suspenso instável | 19 pessoas com treino recreativo, 8 semanas: mais força isométrica e mais resistência na flexão que no chão. **Não mediu músculo.** | um estudo (força) | `lima2018` (lido nesta sessão) |
| Belt squat × agachamento com barra | 31 pessoas, EMG: só o glúteo máximo diferiu, menor no belt squat. **EMG, não crescimento.** | um estudo (EMG) | `evans2019` (lido nesta sessão) |
| Mergulho nas argolas × paralelas × banco | Pico de EMG do tríceps parecido nas argolas e nas paralelas, menor no banco. | um estudo (EMG) | `mckenzie2022` (no projeto; a releitura falhou) |
| A abdução tem efeito próprio no glúteo | O título diz que a hipertrofia regional do glúteo foi "específica da tarefa"; feito com máquina ou polia, não com faixa. | um estudo | `attarieh2026` |
| Hiperextensão × reversa | A hiperextensão comum ativou mais o glúteo e os posteriores (EMG e cinemática). | um estudo | `lawrence2019` |

### Os 17 candidatos
| Equipamento | O que destravaria (vagas vazias em negrito) | Evidência (selo) | Segurança | Foto | Item, capacidade ou não vale **[opinião]** | Custo de animação |
|---|---|---|---|---|---|---|
| Caneleiras de peso | **Extensora**, **Abdução** e **Adução** em casa e no condomínio; flexão de joelho e coice | nenhum ensaio em adultos saudáveis; `chien2022` (um estudo, doentes) | baixo; com dor na frente do joelho, a extensão pode incomodar | **confunde com a tornozeleira da polia** | **item novo** (com kg); o que mais tapa buraco em casa | M por exercício |
| Mini-band (elástico curto) | **Abdução** (sentado, em pé, deitado); ponte com a faixa | `attarieh2026` para a função (um estudo); EMG da faixa NÃO VERIFICADO | estalo da faixa; longe do rosto | parecida com o elástico longo (abriria 12 exercícios errados) | **item novo**, separado do elástico | M por exercício, **depois do R4** (peça `band`) |
| Colete de peso | nenhuma vaga; **kg** nos exercícios com o peso do corpo (flexão, barra, mergulho, agachamento, afundo, búlgaro, panturrilha) | `lynch2026` (colete passivo, idosos); a lógica vem de "carga baixa perto da falha" (robusta) | ombros e lombar com colete pesado; nada de saltos | pode lembrar mochila | **item novo** (com kg), se o dono aceitar carga somada ao corpo; pede o tipo de carga "peso do corpo + kg" | M uma vez; depois P por exercício |
| Roda abdominal | Abdômen 1 → 2 em casa e no condomínio (intermediário e avançado) | EMG de aparelhos (consenso para crescer) | a lombar arqueia quando o abdômen cede; não para iniciante nem lombar marcada | distinta | **item novo**, prioridade baixa | M |
| Argolas | o mesmo que a suspensão; mergulho nas argolas | `mckenzie2022` (EMG); `lima2018` (força); hipertrofia só com fita, em idosos (`soligon2020`) | ancoragem; mergulho instável pesa no ombro | parecida com a suspensão | **capacidade** de `suspensao` ("fitas tipo TRX ou argolas"); o mergulho nas argolas não entra | P ou M sobre a suspensão |
| GHD | glute-ham raise; hiperextensão; nórdico com apoio | EMG NÃO VERIFICADO; o nórdico cresce (moderada) | dor das 1as sessões do nórdico; o abdominal no GHD pesa na lombar | perto do banco romano e da mesa flexora | **capacidade** de `banco_romano` ("banco romano ou GHD") | M |
| Landmine | com barra longa **sem rack** (hoje 11 vagas vazias no iniciante): agachar com carga, desenvolvimento inclinado, remada | só cinemática (NÃO VERIFICADO) | a barra escorrega no canto improvisado | o suporte é pequeno | **atributo da barra longa**, só com o suporte vendido; o canto da parede é decisão do dono | **peça nova** (+6) e o pivô |
| Abdução em pé ("multi-hip") | abdução, adução, coice (a academia já tem) | `attarieh2026` (função); em pé × sentado: nada | baixo | parecida com a cadeira | **capacidade** de `abdutora` e `adutora` | M |
| Agachamento pendular | agachar guiado (igual ao hack) | nenhum estudo | como o hack | parecido com o hack | **capacidade** de `hack` | família "trenó/alavanca" |
| Belt squat | agachar sem carga nas costas | `evans2019` (EMG) | o cinto aperta o quadril | rara | **não vale** agora (se aparecer, como `hack`) | peça nova |
| Paralelas baixas | nada novo | nenhum estudo | modelos leves tombam | **confunde com as paralelas** (abriria o mergulho, complexidade 3) | **não vale**; citar no cartão da flexão para o punho | — |
| Hiperextensão reversa | extensão de quadril (a academia já tem 5) | `lawrence2019`: a comum ativou mais | a lombar dobra embaixo | parecida com o banco romano | **não vale** | — |
| Pullover na máquina | costas sem bíceps (igual à puxada com braço estendido na polia) | EMG NÃO VERIFICADO | ombro no fim da flexão | rara | **não vale** agora | família nova (+6) |
| Acessórios de polia (corda dupla, barra V, barra W, puxador largo, pegador neutro) | nada novo | pegada: EMG (`andersen2014`) | desprezível | pequenos | **não vale** item; o texto pode dizer "barra reta, V ou W" | P |
| Prancha de equilíbrio | nada para hipertrofia | nenhum dado; títulos NÃO VERIFICADOS | queda e entorse | distinta | **não vale** | — |
| Discos deslizantes | flexão de joelho deslizante (já existe com toalha); crucifixo e afundo deslizantes | nenhum ensaio | crucifixo deslizante: queda de rosto | pequenos | **não vale** item (a toalha faz; decisão 6 de 04/11) | — |
| Sandbag e saco de areia | agachar, levantar do chão, remada, carregar | ver abaixo | carga que se move; lombar ao tirar do chão | parecida com mochila e bolsa | **o Gustavo decide** | peça nova |

### Notas de cada candidato que tapa buraco
- **Caneleiras.** É o que mais tapa buraco em casa: a extensora é vaga **obrigatória** (`selecao.isolador-obrigatorio`) e hoje fica vazia em todo cenário de casa e de condomínio. Dois limites honestos: a caneleira comum é leve (0,5 a 5 kg **[opinião, sem fonte]**) e pode não levar o quadríceps de um treinado perto da falha em 30 repetições; e, com o peso no tornozelo e a pessoa sentada, a resistência é máxima com o **joelho esticado** (músculo curto), o contrário do que `selecao.alongado` prefere (consenso, por física). O nome também confunde: no Brasil, "tornozeleira" às vezes quer dizer a caneleira de peso. Parte do buraco também fecha **sem item novo**, com o elástico longo preso no tornozelo (a biblioteca não tem esses exercícios hoje).
- **Mini-band.** É o equipamento mais barato que fecha a vaga de abdução em casa. Fica separada dos elásticos porque ter uma não dá os exercícios da outra.
- **Colete.** Responde ao teto do peso do corpo descrito no `10` (1.2): progredir por kg em vez de passar de 30 repetições. É diferente da mochila: tem kg conhecido e foi feito para isso.
- **Landmine.** O canto da parede é um apoio improvisado, como a mesa da remada que foi recusada; o suporte vendido resolve. Custo de animação alto para pouco uso.

### Sandbag e saco de areia (não decidido)
O sandbag é diferente da mochila num ponto (é vendido para treino, muitas vezes com o kg escrito ou com sacos internos de kg conhecido) e parecido em outro (a carga se mexe, e o enchimento muda).

| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| "Sandbag" em diabéticos | Saquinhos de 0,5 kg, depois 1 kg, 12 semanas em casa: melhoraram a hemoglobina glicada, o sentar e levantar e a massa muscular, contra um controle parado. Não é o sandbag grande. | um estudo (doentes; controle parado) | `chien2022` |
| Sandbag grande de treino | Só um estudo agudo cardiorrespiratório e estudos militares e de luta; nenhum ensaio de hipertrofia em adultos saudáveis. | NÃO VERIFICADO | 29351160 |
| Carga até perto da falha | Qualquer carga que leve a série perto da falha em até ~30–35 repetições cresce. | robusta | `schoenfeld2017b` |

**A favor:**
- tem kg declarável, ao contrário da mochila, e é vendido como equipamento de treino;
- em casa, sem halteres pesados, daria agachar com carga, levantar do chão, remada curvada e carregar.

**Contra:**
- a carga se mexe dentro do saco: a mesma série muda a cada repetição, e o app não consegue progredir por kg com precisão (consenso);
- levantar do chão uma carga sem pegador, com as costas arredondando, carrega a lombar; a costura e o enchimento falham (consenso);
- nenhum estudo de hipertrofia com o sandbag grande; o único ensaio lido usou saquinhos de 0,5–1 kg em doentes;
- a foto confunde com mochila e bolsa, e não lê o kg;
- animação: carga nova sem forma fixa (peça nova, +6).

**É a pergunta 2 do Gustavo** (fim deste arquivo).

### O que fica sem resposta (B.2.3)
- Ensaio de hipertrofia com argolas, colete, caneleira, mini-band, roda, landmine, GHD, belt squat, pendular ou sandbag em adultos saudáveis: nenhum achado.
- Os pesos de caneleira vendidos no Brasil; a força da mini-band por cor; o kg máximo útil do colete.
- Dados de lesão com qualquer um deles.

### Buscas registradas (B.2.3)
Ver "Buscas registradas", parte W1.

---

## B.2.4 Exercícios que faltam em cada equipamento que já existe

> Base: W2, com a medida de B.3. **Vaga nova** = a vaga de um cenário passa de 0 para 1 opção, de 1 para 2, ou sobe de nível de preferência (ex.: de "pike no lugar do desenvolvimento" para um desenvolvimento de verdade). **Degrau** = passo de uma escada, sem opção nova. **Só duplica** = nenhum cenário ganha opção útil.

### Tabela de princípios
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| O equipamento não decide | Máquina, peso livre, polia e kettlebell: importam o músculo, a amplitude e a proximidade da falha. | robusta (equipamento); consenso (kettlebell = halter) | `haugen2023` |
| Unilateral = bilateral | Crescimento parecido; o unilateral dobra a carga relativa sem comprar peso. | moderada | `kassiano2025` |
| Remada sem apoio carrega a lombar | A curvada sem apoio teve a maior carga lombar entre as remadas comparadas. A mão livre na coxa diminui essa carga **[opinião, por geometria; não medido]**. | um estudo (a medida); consenso (a mão na coxa) | `fenwick2009` |
| Tríceps acima da cabeça | Cresceu mais que ao lado do corpo; o coice é a posição contrária. | um estudo | `maeo2023` |
| Bíceps e posição do ombro | A posição do ombro muda a parte que cresce; a rosca martelo (pegada) não foi testada. | um estudo | `kobayashi2026` |
| Suspensão | Programa na suspensão ≈ tradicional em idosos; a remada na suspensão ativa como a tradicional. | um estudo (idosos); moderada (só EMG) | `soligon2020`, `aguileracastells2020` |
| Swing | 12 semanas de swing (28 homens e 25 mulheres): mais força no terra, salto e resistência; **não mediu músculo**. | um estudo (força, não hipertrofia) | `santosjunior2024` (lido nesta sessão) |
| Variação só vale quando muda a vaga | `selecao.variacao` pede variar dentro da função; variação nova só ajuda onde a vaga tem 0 ou 1 opção. | moderada (a regra); consenso (o critério) | `selecao.variacao`, `kassiano2025var` |

### Equipamento por equipamento
| Equipamento | Candidato | Vaga (nível) | Efeito medido (B.3) | Classificação |
|---|---|---|---|---|
| Kettlebell | `remada-unilateral-kettlebell` (mão livre na coxa) | puxar horizontal (n1); puxar vertical (n2) | só kettlebell: costas 0 → 1 | **vaga nova** (a mais importante do kettlebell) |
| Kettlebell | `stiff-kettlebell` (duas mãos na alça) | dobrar o quadril (n1) | só kettlebell: 0 → 1 | **vaga nova** |
| Kettlebell | `rosca-kettlebell` | bíceps (n2) | só kettlebell: 0 → 1 | **vaga nova** |
| Kettlebell | `triceps-frances-kettlebell` | tríceps acima da cabeça (obrigatória) | só kettlebell: 0 → 1 | **vaga nova** |
| Kettlebell | `afundo-kettlebell`, `desenvolvimento-unilateral-kettlebell`, `ponte-kettlebell` | afundo (n1); empurrar vertical (n1); extensão de quadril (n2) | sobem o nível da vaga (n2 → n1; pike n3 → n1); a ponte, 1 → 2 | **vaga nova** (decididos em 04/11) |
| Kettlebell | Swing | dobrar o quadril | ocuparia a vaga do stiff | **só duplica, e pior**: é balístico, complexidade 3, carrega a lombar em velocidade **[opinião]** |
| Kettlebell | Elevação lateral e crucifixo invertido | elevação lateral; ombro posterior | 0 → 1, **só com um kettlebell leve** | não proposto: `funcoes.json` não tem condição de peso (ex.: menor kettlebell ≤ 6 kg **[opinião]**) |
| Halteres | `remada-unilateral-sem-banco` (mão livre na coxa) | puxar horizontal (n1); vertical (n2) | sem banco: 1 → 2 | **vaga nova**, e opção com menos carga lombar que a curvada **[opinião]** |
| Halteres | `rosca-martelo` | bíceps (n2) | casa e halteres: 1 → 2 | **vaga nova, como variação**; pegada neutra para quem sente o punho ou o cotovelo **[opinião]**; crescimento diferente: não testado |
| Halteres | Pullover; Arnold; coice de tríceps; crucifixo no chão | — | — | **só duplicam** (o coice trabalha o tríceps encurtado; o crucifixo no chão corta a parte alongada, que é o motivo da vaga) |
| Polia | `remada-unilateral-polia` (em pé, com estribo) | puxar horizontal (n1) | só polia dupla: 0 → 1 | **vaga nova** |
| Polia | `crucifixo-invertido-polia` (cabos cruzados) | ombro posterior (n1) | só polia dupla: 0 → 1 | **vaga nova** |
| Polia | `triceps-frances-polia-unilateral` (estribo) | tríceps acima da cabeça (obrigatória) | só polia dupla: 0 → 1 | **vaga nova** |
| Polia | Pull-through; coice de glúteo | — | **já existem** | só duplicam |
| Polia | Coice de tríceps; elevação em Y | — | — | **só duplicam** (o Y puxa mais o trapézio, que o app não conta **[opinião]**) |
| Barra fixa | Pernas estendidas | — | — | **degrau** (já é o último da `elevacao-joelhos`) |
| Barra fixa | Pegada neutra | — | — | **só duplica**; cabe como frase no cartão |
| Máquinas | Pegadas da puxada; remada aberta; extensora, flexora e panturrilha unilaterais; leg press com pés altos ou baixos | — | — | **só duplicam** (variação de bloco, sem id) |
| Máquinas | Parcial alongada | — | — | **técnica**, não exercício (moderada para ≈) |

**Por que a polia dupla sozinha tem 3 vagas vazias (achado medido):** a `remada-baixa` pede banco e triângulo, e o `face-pull` e o `triceps-frances` pedem corda. A polia dupla já conta como estribo; três exercícios com o estribo fecham os três buracos.

**Já decididos em 04/11** (classificação só para registro): rosca na suspensão e Y/T na suspensão, vaga nova (0 → 1 no "só suspensão"); tríceps, flexão de joelho e búlgaro na suspensão, variação; elevação de joelhos nas paralelas, abdominal na bola e ponte com os pés na bola, variação (1 → 2).

**Nota sobre o tríceps na suspensão [opinião, W2].** Na versão comum (de costas para a âncora, mãos indo à testa), o ombro fica flexionado só a ~90–120°, menos que no francês. O `10` concluiu o mesmo de um exercício parecido. Proposta: **complemento de tríceps, nível 2**, e não a vaga obrigatória. Para cumprir o "acima da cabeça", o guia teria de ensinar a versão com os braços passando ao lado da cabeça, com folha de animação conferida.

**Nota sobre a flexão de joelho na suspensão [opinião, pela regra do gerador].** O gerador usa só o 1º nível possível da vaga. No nível 3 (com a `flexao-bola`), quem tem suspensão perderia a deslizante e o nórdico (nível 4): intermediário e avançado cairiam de 2 opções para 1. Proposta: **nível 4**, junto da deslizante e do nórdico (é o mesmo movimento da deslizante). Nenhum estudo separa esses exercícios.

### O que fica sem resposta (B.2.4)
- Nenhum exercício novo tem ensaio de hipertrofia próprio.
- Kettlebell e swing: nenhum ensaio de hipertrofia achado.
- Rosca martelo × supinada: nenhum ensaio.
- O peso mínimo de kettlebell para isoladores de ombro (os ~6 kg são estimativa **[opinião]**).
- A carga lombar da remada unilateral com a mão na coxa: não medida.

### Buscas registradas (B.2.4)
Ver "Buscas registradas", parte W2.

---

## B.2.5 Escadas de progressão

### Tabela de princípios
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Qualquer carga de ~6 a ~30 repetições serve, perto da falha | É o que permite escadas sem kg: cada degrau só mantém a série perto da falha dentro da faixa. | robusta (faixa larga); moderada (em treinados) | `schoenfeld2017b`, `lasevicius2018`, `10` |
| Unilateral como degrau | Unilateral = bilateral, com mais carga relativa; uma escada do bilateral ao unilateral funcionou (mulheres sedentárias, agachamento). | moderada (equivalência); um estudo (a escada) | `kassiano2025`, `wei2023` |
| Descida lenta como degrau | 0,5 a ~8 s por repetição se equivalem; descida de 4 s > 1 s num ensaio. Não passar de ~8–10 s. | moderada (intervalo); um estudo (4 s > 1 s) | `schoenfeld2015`, `kojic2025` |
| Pausa, 1,5 repetição e ângulo do corpo | Sem ensaio. Na suspensão, deitar mais o corpo aumenta o peso que o braço levanta **[opinião, por geometria]**. | consenso | `consenso-projeto` |
| A ordem dos degraus | Ninguém testou. | consenso | `consenso-projeto` |
| Nenhum degrau pede o que a pessoa não marcou | Todo degrau que pede um móvel ou item traz "(sem X: Y)". | consenso (decisão do dono) | `docs/revisoes/equipamento-minimo.md`, item 6 |

**Selo de cada degrau:** pela regra do selo mais fraco, todo degrau, como passo de escada, é **consenso**. Entre parênteses vai o princípio que o apoia: (D) descida lenta, moderada; (U) unilateral, moderada para a equivalência e um estudo para a escada; (P) pausa, 1,5 repetição, ângulo e amplitude, consenso.

### Escadas novas (formato de `src/domain/progressao/escadas.json`; o degrau 0 é o exercício como no guia)
```json
{
  "rosca-suspensao": ["pés mais à frente (corpo mais deitado)", "pausa de 2 s com as mãos perto da testa", "descida de 3 s", "uma mão só, com a fita no modo de uma alça (se a sua fita não tiver: descida de 5 s)"],
  "yt-suspensao": ["pés mais à frente (corpo mais deitado)", "pausa de 2 s com os braços abertos", "descida de 3 s", "alternar o T e o Y (braços acima da cabeça) na mesma série"],
  "triceps-suspensao": ["pés mais para trás (corpo mais inclinado)", "pausa de 2 s com as mãos perto da testa", "descida de 3 s", "pés mais para trás, com descida de 3 s"],
  "flexao-joelho-suspensao": ["pausa de 2 s com os joelhos dobrados", "descida de 3 s", "uma perna só"],
  "bulgaro-suspensao": ["descida de 3 s", "pausa de 2 s embaixo", "1,5 repetição (desce, sobe até a metade, desce de novo e sobe)"],
  "elevacao-joelhos-paralelas": ["joelhos até o peito", "descida de 3 s", "pernas estendidas"],
  "abdominal-bola": ["descida de 3 s", "braços acima da cabeça", "braços acima da cabeça, com pausa de 2 s em cima"],
  "ponte-pes-bola": ["pausa de 2 s no alto", "braços cruzados no peito (sem as mãos no chão)", "uma perna só", "uma perna só, com pausa de 2 s no alto"]
}
```

| Exercício | Degraus e selo | Observação |
|---|---|---|
| `rosca-suspensao` | 1 (P), 2 (P), 3 (D), 4 (U) | o 1º degrau é o mesmo da `remada-suspensao`; a versão de uma mão aparece em tutoriais (B.2.7), e nem toda fita tem o modo de uma alça, daí a saída entre parênteses |
| `yt-suspensao` | 1–3 (P, D), 4 (P) | **[opinião]** o Y rende menos repetições que o T e puxa mais o trapézio de baixo; fica no fim, alternado |
| `triceps-suspensao` | 1 (P), 2–4 (P, D) | quanto mais inclinado à frente, mais peso nos braços |
| `flexao-joelho-suspensao` | 1–3 (P, D, U) | idêntica à da `flexao-bola`; quem não faz a bilateral começa por "só a volta lenta" |
| `bulgaro-suspensao` | 1–3 (D, P) | sem degrau de amplitude com móvel |
| `elevacao-joelhos-paralelas` | 1–3 (P, D) | idêntica à da `elevacao-joelhos` na barra |
| `abdominal-bola` | 1–3 (D, P) | idêntica à do `abdominal-chao` |
| `ponte-pes-bola` | 1 (P), 2 (P), 3–4 (U) | tirar as mãos do chão aumenta a exigência do quadril **[opinião]** |

### Step e banco como degraus (decisão de 04/11): mudanças nas escadas que já existem
```json
{
  "agachamento-peso-corpo": ["descida de 3 s", "pausa de 2 s embaixo", "1,5 repetição (desce, sobe até a metade, desce de novo e sobe)", "subida no step, uma perna de cada vez, com descida de 3 s (sem step: 1,5 repetição com descida de 3 s)"],
  "afundo-peso-corpo": ["descida de 3 s", "pausa de 2 s embaixo", "pé de trás no step, como um búlgaro baixo (sem step: pausa de 2 s embaixo com descida de 3 s)", "pé da frente no step ou num degrau, mais amplitude (sem eles: descida de 5 s)"],
  "bulgaro-peso-corpo": ["descida de 3 s", "pausa de 2 s embaixo", "pé da frente no step ou num apoio baixo, mais amplitude (sem eles: descida de 5 s)"],
  "ponte-gluteo": ["pausa de 2 s no alto", "ombros no banco, como no hip thrust (sem banco: num sofá firme encostado na parede; sem eles: pausa de 3 s no alto)", "uma perna só", "uma perna só, com os ombros apoiados (sem apoio: uma perna só, com pausa de 2 s no alto)"]
}
```

| Exercício | Degrau novo | Selo | Por quê **[opinião]** |
|---|---|---|---|
| `agachamento-peso-corpo` | 4: subida no step, uma perna, descida de 3 s | um estudo (U, `wei2023`); consenso (ordem) | 1º passo unilateral para quem tem step; vem depois da 1,5 repetição porque quase dobra a carga relativa |
| `afundo-peso-corpo` | 3: pé de trás no step (búlgaro baixo) | consenso (P) | o step é mais baixo que o sofá do búlgaro: fica como passo entre os dois |
| `afundo-peso-corpo`, `bulgaro-peso-corpo` | "no step **ou** num degrau / apoio baixo" | consenso (P) | troca o móvel pelo step só para quem o marcou |
| `ponte-gluteo` | 2: ombros no banco (hip thrust com o peso do corpo) | consenso (P) | o banco é o apoio certo do hip thrust (`seguranca.montagem`) |

**Observação de formato [opinião].** Hoje "(sem X: Y)" é só texto, igual para todo mundo. Para que quem marcou o step veja só "subida no step", o degrau precisaria de estrutura (por exemplo, `{"texto", "requer", "senao"}`, validado com zod). É mudança de código, fora desta pesquisa.

### Exercícios novos com carga: sem escada própria
Progridem por kg (dupla progressão). Com **um peso só**, vale a `equipamento.escada-carga-leve` (consenso). Passo 2 ("unilateral ou variação mais difícil") sugerido, sem pedir nada novo:

| Exercício | Passo 2 da `escada-carga-leve` | Selo |
|---|---|---|
| `stiff-kettlebell` | stiff com uma perna, kettlebell na mão do lado contrário | consenso (U) |
| `remada-unilateral-kettlebell`, `remada-unilateral-sem-banco` | pausa de 2 s com o cotovelo atrás do tronco | consenso (P) |
| `afundo-kettlebell` | afundo para trás com o kettlebell no peito | consenso (P) |
| `ponte-kettlebell` | ponte com uma perna | consenso (U) |
| `rosca-kettlebell` | segurar pelo "chifre", com a bola mais longe do cotovelo **[opinião]** | consenso (P) |
| `triceps-frances-kettlebell` | descida de 3 s, depois pausa de 2 s embaixo | consenso (D, P) |

### O que fica sem resposta (B.2.5)
- A ordem de qualquer escada de dificuldade: nunca testada.
- Quanto do peso do corpo cada variação levanta: não lido nesta sessão.

### Buscas registradas (B.2.5)
Nenhuma busca própria; os princípios vêm do `10` (pergunta 1) e de H2.

---

## B.2.6 Segurança de cada exercício novo

### Tabela de princípios
| Princípio | O que a evidência diz | Selo | Fontes |
|---|---|---|---|
| Acidente é a maior causa de pronto-socorro na musculação | Peso que cai, queda e pancada: daí o cartão de montagem segura. | consenso, com apoio descritivo | `kerr2010`, `coffey2026` |
| A dor por região só funciona com `articulacoes` certo | Dor de hoje acima de 5 tira todo exercício que carrega a região; o teste exige as articulações mínimas do padrão. | consenso | `seguranca.dor.programa`; `tests/unit/articulacoes.test.ts` |
| Remada curvada sem apoio | Maior carga lombar entre as remadas comparadas. | um estudo (medida); consenso (a mão na coxa reduz) | `fenwick2009` |
| Swing e lombar | Um estudo de 2012 trata de ativação e carga lombar no swing; o resumo não abriu. | NÃO VERIFICADO | 21997449 |
| Suspensão: o risco é a âncora | Nenhum dado de lesão achado; a falha que machuca é a âncora ceder. | consenso | `seguranca.montagem` |
| Bola suíça | Nenhum dado de lesão lido; a bola pode rolar ou estourar **[opinião]**. | consenso | — |
| Triagem | Nada muda: "sim" no PAR-Q+ suspende; "sim" só na pergunta osteoarticular marca a região. | consenso | `seguranca.triagem`, `seguranca.triagem.osteoarticular` |

### Tabela por exercício
"Para quem não serve" lista o que a dor por região já faz, mais o que o dado não pega. As articulações "a mais", além do mínimo do teste, são **[opinião]**.

| Exercício | `articulacoes` | Montagem segura (texto do cartão, sugestão) | Para quem não serve |
|---|---|---|---|
| `remada-unilateral-kettlebell`, `remada-unilateral-sem-banco` | ombro, cotovelo, lombar | "Pés afastados, um à frente. Apoie a mão livre firme na coxa da frente (ou num banco). Costas retas; puxe o peso para o quadril sem girar o tronco. Chão que não escorrega." | dor > 5 na lombar, no ombro ou no cotovelo; com lombar 3–5, o desempate prefere a remada apoiada, quando existe |
| `stiff-kettlebell` | quadril, lombar | "Kettlebell no chão entre os pés. Joelhos levemente dobrados, quadril para trás; desça só até onde as costas continuam retas." | lombar ou quadril > 5 |
| `afundo-kettlebell` | joelho, quadril | "Kettlebell junto ao peito, cotovelos perto do corpo. Espaço livre à frente e atrás; sem tapetes soltos." | joelho ou quadril > 5 |
| `desenvolvimento-unilateral-kettlebell` | ombro, cotovelo, lombar | "Comece com o kettlebell apoiado no antebraço, punho reto. Suba sem jogar o peso e sem arquear a lombar." | ombro > 5; quem não levanta o braço acima da cabeça sem dor |
| `ponte-kettlebell` | quadril | "Kettlebell deitado sobre o quadril, com uma toalha dobrada embaixo; segure com as duas mãos." | quadril > 5 |
| `rosca-kettlebell` | cotovelo | "Cotovelo junto ao corpo; sem balançar o tronco." | cotovelo > 5 |
| `triceps-frances-kettlebell` | ombro, cotovelo | "As duas mãos pelos lados da alça. Desça atrás da cabeça devagar; comece com um peso que você controla com folga." | ombro ou cotovelo > 5 |
| `rosca-martelo` | cotovelo | "Palmas viradas uma para a outra; cotovelos junto ao corpo." | cotovelo > 5. **[opinião]** Com punho 3 a 5, a pegada neutra costuma incomodar menos (sem estudo) |
| `remada-unilateral-polia` | ombro, cotovelo, lombar | "Pino da torre bem encaixado, estribo preso no mosquetão. Base escalonada, mão livre na coxa ou no apoio." | ombro, cotovelo ou lombar > 5 |
| `crucifixo-invertido-polia` | ombro | "Polias na altura dos ombros. Cruze os cabos, dê um passo para trás e abra os braços quase retos." | ombro > 5 |
| `triceps-frances-polia-unilateral` | ombro, cotovelo | "Polia embaixo, de costas para ela. Cotovelo apontando para cima; só o antebraço se mexe." | ombro ou cotovelo > 5 |
| Suspensão (comum a todos) | — | "Prenda a fita num ponto feito para isso: barra fixa firme, viga, ou a trava de porta do fabricante, com a porta fechada e trancada, do lado em que ela fecha contra o batente. Antes da 1ª série, deixe o peso cair na fita devagar. Confira se a fita não está gasta." | — |
| `rosca-suspensao` | ombro, cotovelo | suspensão | cotovelo ou ombro > 5 |
| `yt-suspensao` | ombro | suspensão; "No Y, só até onde o ombro não belisca." | ombro > 5 |
| `triceps-suspensao` | ombro, cotovelo | suspensão; "Corpo reto como numa prancha; comece quase em pé." | ombro ou cotovelo > 5 |
| `flexao-joelho-suspensao` | joelho | suspensão; "Alças a um palmo e meio do chão; colchonete sob os ombros." | joelho > 5 |
| `bulgaro-suspensao` | joelho, quadril | suspensão; "Alça no meio da canela. Fique perto de uma parede para apoiar a mão." | joelho ou quadril > 5; fora do iniciante (complexidade 3 **[opinião]**) |
| `elevacao-joelhos-paralelas` | ombro, lombar | "Braços retos, ombros longe das orelhas. Se não aguentar sustentar o corpo, desça e use o abdominal no chão." | ombro ou lombar > 5 |
| `abdominal-bola` | lombar | "Bola bem cheia, sem rachaduras, sobre tapete que não escorrega, longe de quinas." | lombar > 5; quem sente tontura (a triagem já suspende) |
| `ponte-pes-bola` | quadril, joelho | "Bola encostada na parede nas primeiras séries; braços abertos no chão." | quadril ou joelho > 5 |
| Degraus de step e banco | (os do exercício) | "Step firme, com pés de borracha. Step encostado na parede, atrás de você. Banco travado ou encostado na parede." | os do exercício |
| Swing (**não recomendado**) | quadril, lombar, ombro | (se entrar) "Espaço livre à frente e atrás; ninguém por perto; nunca solte o kettlebell." | lombar > 5; iniciante (complexidade 3) |

### O que fica sem resposta (B.2.6)
- Nenhum dado de lesão com kettlebell em casa, fita de suspensão, bola suíça ou step.
- A carga lombar do swing (21997449, não lido).
- A altura das alças e a distância dos pés na suspensão: consenso de treinadores, sem número.

### Buscas registradas (B.2.6)
Ver "Buscas registradas", parte W2.

---

## B.2.7 Vídeos de referência visual

> **Todos:** referência visual de movimento, **não fonte de regra; não assistido**. Achados por busca na web (só título e URL; o YouTube não foi aberto). "Canal": "no título" quando o título nomeia a pessoa; "pela busca" quando o resumo da busca o atribuía, sem conferir a página; "não confirmado" nos outros casos. Nenhum vídeo apoia regra nem número, e nenhum entra no app. Sugestão: o Gustavo confere o canal ao abrir.

| Exercício | Canal | Título | URL |
|---|---|---|---|
| Remada unilateral sem banco (mão na coxa) | não confirmado | How to do a Dumbbell Single Arm Row // Staggered Stance | https://www.youtube.com/watch?v=rz8dldEHc5c |
| Remada unilateral sem banco | não confirmado | No Bench - Try This One Arm Dumbbell Row Technique! | https://www.youtube.com/shorts/Pw3glZCQMGM |
| Remada unilateral com kettlebell | não confirmado | Single Arm Kettlebell Row | https://www.youtube.com/watch?v=l5qelXL5nfs |
| Stiff com kettlebell | não confirmado | How to: Kettlebell Romanian Deadlift (RDL) | https://www.youtube.com/watch?v=Uc5rP5xs7qQ |
| Stiff com kettlebell (unilateral) | não confirmado | HOW TO: Kettlebell Single Leg Romanian Deadlift (RDL) | https://www.youtube.com/watch?v=rU90WKZ-few |
| Tríceps francês com kettlebell | não confirmado | How To Do: Kettlebell Triceps Extension - Standing | https://www.youtube.com/watch?v=DBiDUQJTo6A |
| Rosca martelo | não confirmado | Dumbbell Hammer Curl - Proper Form & Technique [4K] | https://www.youtube.com/watch?v=3nqezx8BEv0 |
| Remada unilateral na polia, em pé | não confirmado | How to do Standing Single Arm Cable Rows | https://www.youtube.com/watch?v=raO8Q08Wems |
| Remada unilateral na polia, em pé | não confirmado | Single Arm Standing Cable Row | https://www.youtube.com/watch?v=DaPtTW0OOr8 |
| Crucifixo invertido na polia | não confirmado | How To: Reverse Cable Crossover | https://www.youtube.com/watch?v=FcCNakXguzc |
| Crucifixo invertido na polia | Hunter Labrada (no título) | How To - Standing Cable Rear Delt Fly - Hunter Labrada | https://www.youtube.com/watch?v=JENKmsEZQO8 |
| Tríceps francês unilateral na polia | não confirmado | Exercise Tutorial: Single Arm Cable Overhead Tricep Extension | https://www.youtube.com/watch?v=w3iAESGWK6M |
| Tríceps francês unilateral na polia | não confirmado | How To: Single Arm Overhead Cable Tricep Extension | https://www.youtube.com/watch?v=zYTJpaPK7vE |
| Rosca na suspensão | não confirmado | How To Do A TRX BICEP CURL | https://www.youtube.com/watch?v=Pa8Mls8saXc |
| Rosca na suspensão, uma mão | não confirmado | Exercise Tutorial: TRX One Arm Bicep Curl | https://www.youtube.com/watch?v=bApLiemofYQ |
| T na suspensão | David Adamo, pela busca | How To Do a TRX Rear Delt Fly | https://www.youtube.com/watch?v=eYD_k-4rBis |
| Y na suspensão | Jen Sinkler (revista Experience Life), pela busca | TRX "Y" Deltoid Fly | https://www.youtube.com/watch?v=YUIH_TntR0c |
| Tríceps na suspensão | Seriously Strong Training, pela busca | How to do TRX Tricep Extensions Using Your Body Weight | https://www.youtube.com/watch?v=HPe0b7Te1Bk |
| Tríceps na suspensão | Fit Father, pela busca | TRX Tricep Extension — Best Bodyweight Triceps Exercise | https://www.youtube.com/watch?v=xODm0GuXPMY |
| Flexão de joelho na suspensão | não confirmado | TRX Hamstring Curl Progressions | https://www.youtube.com/watch?v=KbdehYrIqgY |
| Flexão de joelho na suspensão (uma perna) | não confirmado | TRX suspended single leg hamstring curl | https://www.youtube.com/watch?v=ZXJRy4lwx6s |
| Búlgaro com o pé na alça | Third Space (treinador Luke), pela busca | TRX Rear Foot Elevated Split Squat | https://www.youtube.com/embed/MCimf-OrtBQ |
| Búlgaro com o pé na alça | Filak Hockey Training, pela busca | TRX Rear foot elevated split squat/Bulgarian Split squat | https://www.youtube.com/watch?v=H2sb4bTFq2o |
| Elevação de joelhos nas paralelas | não confirmado | Knee Raises on Parallel Bars | https://www.youtube.com/watch?v=S7wAEgrUn6s |
| Elevação de joelhos e de pernas nas paralelas | não confirmado | How To Do Parallel Bar Bent Knee Raises and Leg Raises | https://www.youtube.com/watch?v=FP0XM5Lnjog |
| Abdominal na bola | Nick Tumminello, pela busca (transmissão ao vivo) | How to perform stability ball crunches correctly | https://m.youtube.com/live/8NGXHJ2bEzE |
| Abdominal na bola (progressões) | não confirmado | Episode 145 - Stability Ball Crunch Basics and Progression | https://www.youtube.com/watch?v=KrTtX8K_AJk |
| Ponte com os pés na bola | não confirmado | Stability Ball Straight Leg Glute Bridge | https://www.youtube.com/watch?v=rlRP8QMaSeg |
| Ponte com os pés na bola, uma perna | não confirmado | Stability Ball Single Leg Glute Bridge | https://www.youtube.com/watch?v=KxvqRpgkn6c |

**Sem busca feita** (termo sugerido): afundo com kettlebell no peito ("kettlebell goblet reverse lunge"), desenvolvimento unilateral com kettlebell ("single arm kettlebell overhead press"), ponte com kettlebell ("kettlebell glute bridge"), rosca com kettlebell ("kettlebell biceps curl"), subida no step ("step-up aerobic step bodyweight"), hip thrust com o peso do corpo ("bodyweight hip thrust bench"). Os vídeos de step-up e de búlgaro do `10` (seção 7) servem para os degraus.

---

## B.3 Lista de entrada (ganho ÷ custo de animação)

### Como foi medido
- Cada candidato entrou **sozinho** numa cópia do app (fora do repositório), na vaga e no nível propostos, e o mapa do catálogo (`catalogo.ts`) rodou de novo.
- **Ganho** = 3 × (vagas que passaram de 0 para 1 opção) + 1 × (vagas que passaram de 1 para 2). Cada vaga conta duas vezes, uma no iniciante e outra no avançado, e os **cenários comuns pesam 3** (casa e condomínio, pelo atalho e com os "às vezes tem"; academia, pelo atalho e com os extras da Carla; só halteres sem banco; halteres e banco, a Ana). As colunas "0 → 1" e "1 → 2" já trazem esse peso.
- **Custo** = custo da animação: P = 1, M = 2.
- **Razão** = ganho ÷ custo.
- **Monotonia** = quantos programas a menos repetem o mesmo exercício sem ter opção. Um número negativo **não é piora de qualidade**: quando uma vaga vazia ganha 1 opção, ela passa a aparecer e a repetir o único exercício que tem.
- **Ressalva obrigatória:** a métrica conta opções **no nível que o gerador usa**. Um exercício que **sobe o nível** da vaga (por exemplo, o desenvolvimento com kettlebell no lugar do pike) aparece como **0**, embora melhore o treino. É o caso de quatro dos decididos em 04/11.

### B.3.1 Exercícios, ordenados pela razão
| # | Exercício | Família (custo) | 0 → 1 | 1 → 2 | Ganho | Razão | Monotonia | Onde (cenário: vaga) | Situação |
|---:|---|---|---:|---:|---:|---:|---:|---|---|
| 1 | `remada-unilateral-sem-banco` | P (1) | 0 | 36 | 36 | **36** | +306 | Casa (halteres e elásticos)*, Só halteres sem banco*, Halteres leves + bola, Só anilhas e manoplas, Só halteres fixos: puxar horizontal e puxar vertical | proposta |
| 2 | `rosca-martelo` | P (1) | 0 | 26 | 26 | **26** | +420 | Casa*, Halteres e banco (a Ana)*, Só halteres sem banco*, Banco + halteres leves, Halteres leves + bola, Só anilhas e manoplas, Só halteres fixos: bíceps | proposta |
| 3 | `remada-unilateral-kettlebell` | M (2) | 4 | 0 | 12 | **6** | −15 | Só kettlebell: puxar horizontal e puxar vertical | proposta (kettlebell só com animação própria) |
| 4 | `triceps-frances-polia-unilateral` | P (1) | 2 | 0 | 6 | **6** | −34 | Só polia dupla: tríceps acima da cabeça | proposta |
| 5 | `triceps-suspensao` | M (2) | 0 | 10 | 10 | **5** | +21 | Casa com os "às vezes tem"*, Só suspensão, Suspensão + elásticos: tríceps complemento | decidido em 04/11 |
| 6 | `abdominal-bola` | M (2) | 0 | 10 | 10 | **5** | +246 | Condomínio (atalho)*, Halteres leves + bola, Só bola: abdômen | decidido em 04/11 |
| 7 | `rosca-suspensao` | M (2) | 2 | 2 | 8 | **4** | 0 | Só suspensão (0 → 1) e Suspensão + elásticos (1 → 2): bíceps | decidido em 04/11 |
| 8 | `yt-suspensao` | M (2) | 2 | 2 | 8 | **4** | −15 | Só suspensão (0 → 1) e Suspensão + elásticos (1 → 2): ombro posterior | decidido em 04/11 |
| 9 | `stiff-kettlebell` | M (2) | 2 | 0 | 6 | **3** | −41 | Só kettlebell: dobrar o quadril | proposta (com animação própria) |
| 10 | `rosca-kettlebell` | M (2) | 2 | 0 | 6 | **3** | −24 | Só kettlebell: bíceps | proposta (com animação própria) |
| 11 | `triceps-frances-kettlebell` | M (2) | 2 | 0 | 6 | **3** | −36 | Só kettlebell: tríceps acima da cabeça | proposta (com animação própria) |
| 12 | `remada-unilateral-polia` | M (2) | 2 | 0 | 6 | **3** | −54 | Só polia dupla: puxar horizontal | proposta |
| 13 | `crucifixo-invertido-polia` | M (2) | 2 | 0 | 6 | **3** | −72 | Só polia dupla: ombro posterior | proposta |
| 14 | `elevacao-joelhos-paralelas` | P (1) | 0 | 2 | 2 | **2** | +90 | Só paralelas: abdômen | decidido em 04/11 |
| 15 | `ponte-pes-bola` | P (1) | 0 | 2 | 2 | **2** | +9 | Só bola: extensão de quadril | decidido em 04/11 |
| 16 | `ponte-kettlebell` | M (2) | 0 | 2 | 2 | **1** | +9 | Só kettlebell: extensão de quadril | decidido em 04/11 |
| 17 | `flexao-joelho-suspensao` (medida no nível 4) | M (2) | 0 | 1 | 1 | **0,5** | +27 | Só suspensão: flexão de joelho (num nível só) | decidido em 04/11 |
| 18 | `afundo-kettlebell` | M (2) | 0 | 0 | 0 | **0** | −27 | — (sobe o afundo do "só kettlebell" do peso do corpo, n2, para o kettlebell, n1: melhora a carga, mas a vaga passa de 2 opções para 1) | decidido em 04/11 |
| 19 | `desenvolvimento-unilateral-kettlebell` | M (2) | 0 | 0 | 0 | **0** | 0 | — (troca o pike, n3, por um desenvolvimento de verdade, n1) | decidido em 04/11 |
| 20 | `bulgaro-suspensao` | M (2) | 0 | 0 | 0 | **0** | 0 | — (o afundo do "só suspensão" já tinha 2 opções) | decidido em 04/11 |

\* cenário comum (peso 3).

**Leitura [opinião].** As duas primeiras linhas são baratas (variação de animação que já existe) e mexem em cenários comuns: são as que mais melhoram o treino de quem tem halteres. Os quatro de kettlebell e os três de polia tiram vagas do zero, mas só no cenário de um aparelho só. Os decididos em 04/11 com ganho 0 não "pioram": a métrica não vê a troca de nível.

### B.3.2 Linhas de dados propostas (W2)
Ids conferidos contra os 110 da biblioteca (nenhum colide); `requer` usa só capacidades que já existem; complexidade, faixa e marcas seguem os vizinhos **[opinião]**. Todos começam como **cartão de texto** (`CLAUDE.md`, qualidade do guia), menos os de kettlebell, que só entram com animação própria (decisão de 04/11).

| id | vaga (nível) | primários / secundários | `requer` | compl. | faixa | `articulacoes` | escada | selo | fontes |
|---|---|---|---|---:|---|---|---|---|---|
| `remada-unilateral-sem-banco` | puxar horizontal (n1); vertical (n2) | costas / bíceps, ombro posterior | `[["halteres"]]` | 2 | 8–12 | ombro, cotovelo, lombar | carga leve (P) | consenso (técnica); moderada (unilateral) | `kassiano2025`, `fenwick2009` |
| `rosca-martelo` | bíceps (n2) | bíceps / — | `[["halteres"]]` | 1 | 8–12 | cotovelo | — | consenso | `kobayashi2026` (contexto) |
| `remada-unilateral-kettlebell` | puxar horizontal (n1); vertical (n2) | costas / bíceps, ombro posterior | `[["kettlebell"]]` | 2 | 8–12 | ombro, cotovelo, lombar | carga leve (P) | consenso; robusta (equivalência) | `haugen2023`, `kassiano2025`, `fenwick2009` |
| `stiff-kettlebell` | dobrar o quadril (n1) | posteriores / glúteos | `[["kettlebell"]]` | 2 | 8–12 | quadril, lombar | carga leve (U) | consenso; robusta (equivalência) | `haugen2023`, `kassiano2025` |
| `rosca-kettlebell` | bíceps (n2) | bíceps / — | `[["kettlebell"]]` | 1 | 8–12 | cotovelo | carga leve (P) | consenso; robusta (equivalência) | `haugen2023` |
| `triceps-frances-kettlebell` | tríceps acima da cabeça | tríceps / — | `[["kettlebell"]]` | 2 | 10–15 | ombro, cotovelo | carga leve (D, P) | um estudo (posição) | `maeo2023`, `haugen2023` |
| `remada-unilateral-polia` | puxar horizontal (n1) | costas / bíceps, ombro posterior | `[["polia_baixa", "estribo"]]` | 1 | 8–12 | ombro, cotovelo, lombar | — | consenso; robusta (equivalência) | `haugen2023`, `kassiano2025` |
| `crucifixo-invertido-polia` | ombro posterior (n1) | ombro posterior / — | `[["polia_dupla"]]` | 2 | 12–20 | ombro | — | consenso (EMG como apoio) | `franke2015`, `rabello2024` |
| `triceps-frances-polia-unilateral` | tríceps acima da cabeça | tríceps / — | `[["polia_baixa", "estribo"]]` | 1 | 10–15 | ombro, cotovelo | — | um estudo (posição) | `maeo2023` |
| `afundo-kettlebell` | afundo (n1) | quadríceps / glúteos, adutores | `[["kettlebell"]]` | 1 | 8–12 | joelho, quadril | carga leve (P) | robusta (equivalência); consenso | `haugen2023` |
| `desenvolvimento-unilateral-kettlebell` | empurrar vertical (n1) | ombro anterior / ombro lateral, tríceps | `[["kettlebell"]]` | 2 | 8–12 | ombro, cotovelo, lombar | carga leve | robusta (equivalência); consenso | `haugen2023`, `kassiano2025` |
| `ponte-kettlebell` | extensão de quadril (n2) | glúteos / — | `[["kettlebell"]]` | 1 | 10–20 | quadril | carga leve (U) | consenso | `haugen2023` |
| `rosca-suspensao` | bíceps (n2) | bíceps / — | `[["suspensao"]]` | 2 | 10–15 | ombro, cotovelo | B.2.5 | um estudo (suspensão ≈ tradicional, idosos); consenso (técnica) | `soligon2020`, `aguileracastells2020` |
| `yt-suspensao` | ombro posterior (n2) | ombro posterior / costas | `[["suspensao"]]` | 2 | 12–20 | ombro | B.2.5 | consenso | `franke2015`, `soligon2020` (contexto) |
| `triceps-suspensao` | tríceps complemento (n2) | tríceps / — | `[["suspensao"]]` | 2 | 10–15 | ombro, cotovelo | B.2.5 | consenso | `soligon2020` (contexto) |
| `flexao-joelho-suspensao` | flexão de joelho (n4; ou n3) | posteriores / glúteos | `[["suspensao"]]` | 2 | 8–15 | joelho | B.2.5 | consenso | `consenso-projeto` |
| `bulgaro-suspensao` | afundo (n2) | quadríceps / glúteos, adutores | `[["suspensao"]]` | 3 | 8–15 | joelho, quadril | B.2.5 | consenso; moderada (unilateral) | `kassiano2025` |
| `elevacao-joelhos-paralelas` | abdômen (n2) | abdômen / — | `[["paralelas"]]` | 2 | 10–15 | ombro, lombar | B.2.5 | consenso | `escamilla2006` |
| `abdominal-bola` | abdômen (n2) | abdômen / — | `[["bola_suica"]]` | 2 | 12–20 | lombar | B.2.5 | consenso | `consenso-projeto` |
| `ponte-pes-bola` | extensão de quadril (n2) | glúteos / posteriores | `[["bola_suica"]]` | 2 | 12–20 | quadril, joelho | B.2.5 | consenso | `consenso-projeto` |

### B.3.3 Equipamentos novos (estimado, não medido)
Os equipamentos do W1 **não foram medidos** pela cópia do app, porque pedem item ou capacidade nova na taxonomia. A coluna "o que abriria" vem das vagas vazias do `cenarios.md` e é **estimativa**.

| Equipamento | O que abriria (estimado, não medido) | Cenários | Custo de animação | Item ou capacidade **[opinião]** |
|---|---|---|---|---|
| Caneleiras | extensora 0 → 1; abdução 0 → 1; adução 0 → 1 (com exercícios novos) | casa, condomínio, só elásticos, Diego, só halteres | M por exercício | item novo |
| Mini-band | abdução 0 → 1 | os mesmos, mais a academia do bairro sem polia | M por exercício, depois do R4 | item novo |
| Colete | nenhuma vaga; kg nos exercícios com o peso do corpo | casa, condomínio, nada marcado | M uma vez, P por exercício | item novo |
| Roda abdominal | abdômen 1 → 2 (intermediário e avançado) | casa, condomínio | M | item novo, prioridade baixa |
| Landmine | agachar com carga, desenvolvimento, remada para quem tem barra longa sem rack | só barra longa (11 vagas vazias no iniciante) | peça nova (+6) | atributo da barra longa |
| Argolas, GHD, abdução em pé, pendular | o mesmo que suspensão, banco romano, cadeira abdutora e adutora e hack | — | P ou M sobre o que existir | capacidade de um item que já existe |
| Sandbag | agachar, dobrar o quadril, remada (se contar como carga real) | casa sem halteres pesados | peça nova | **decisão do Gustavo** |
| Belt squat, paralelas baixas, reversa, pullover na máquina, acessórios de polia, prancha de equilíbrio, discos deslizantes | nada que falte | — | — | não vale |

---

## Perguntas para o Gustavo

1. **Quais equipamentos novos entram na taxonomia, e como** (item novo, capacidade de um item que já existe, ou não entra)? Candidatos: caneleiras, mini-band, colete, roda abdominal, argolas, GHD, landmine, abdução em pé, agachamento pendular, belt squat, paralelas baixas, hiperextensão reversa, pullover na máquina, acessórios de polia, prancha de equilíbrio, discos deslizantes.
2. **O sandbag e o saco de areia contam como carga real (com kg) ou como carga improvisada, como a mochila?**
3. **Quais exercícios novos entram?** As propostas que ainda não foram decididas: `remada-unilateral-sem-banco`, `rosca-martelo`, `remada-unilateral-kettlebell`, `stiff-kettlebell`, `rosca-kettlebell`, `triceps-frances-kettlebell`, `remada-unilateral-polia`, `crucifixo-invertido-polia`, `triceps-frances-polia-unilateral`. E, nos já decididos:
   - o tríceps na suspensão vai para a vaga de complemento ou para a do tríceps acima da cabeça?
   - a flexão de joelho na suspensão fica no nível 3 ou no 4?
4. **Em que ordem saem as animações dos exercícios que entrarem?** Lembrete: você já decidiu que o R4 do boneco vem antes das animações do elástico. **[opinião, a confirmar com você]** Por coerência, os exercícios novos também ficariam como cartão de texto até lá; os de kettlebell, que só entram com animação própria, esperariam a animação.
5. **As correções e propostas deste arquivo vão para o `04` e para `regras.md`?** Entre elas: trocar a citação de `wolf2025` em `selecao.alongado`; citar `pedrosa2022` na extensora; o glúteo como secundário (0,5) no agachamento profundo e no leg press; as complexidades de B.2.2; um nível "só avançado" como técnica, e não como complexidade.

---

## Fontes novas (formato de `docs/pesquisa/fontes.md`)

Chaves conferidas contra `fontes.md`: nenhuma colide (`gentil2013` ≠ `gentil2015`; `pedrosa2022` ≠ `pedrosa2023`; `santosjunior2024` ≠ `santosjunior2021`). As de resumo lido entram em `fontes.md` nesta sessão; as NÃO VERIFICADAS ficam só aqui.

### Resumo oficial lido
- `barbalho2020` — Barbalho M, Coswig V, Souza D, et al. (2020). Back Squat vs. Hip Thrust Resistance-training Programs in Well-trained Women. Int J Sports Med 41(5):306–310. PMID: 31975359 | DOI: 10.1055/a-1082-1126 — resumo-PubMed (reconferido em 04/11/2026; sem aviso de retratação na página).
- `chien2022` — Chien YH, Tsai CJ, Wang DC, et al. (2022). Effects of 12-Week Progressive Sandbag Exercise Training on Glycemic Control and Muscle Strength in Patients with Type 2 Diabetes Mellitus Combined with Possible Sarcopenia. Int J Environ Res Public Health 19(22):15009. PMID: 36429728 | DOI: 10.3390/ijerph192215009 — resumo-PubMed (os "sandbags" são saquinhos de 0,5–1 kg).
- `evans2019` — Evans TW, McLester CN, Howard JS, et al. (2019). Comparison of Muscle Activation Between Back Squats and Belt Squats. J Strength Cond Res 33(7S):S52–S59. PMID: 28595237 | DOI: 10.1519/jsc.0000000000002052 — resumo-PubMed.
- `gentil2013` — Gentil P, Soares SRS, Pereira MC, et al. (2013). Effect of adding single-joint exercises to a multi-joint exercise resistance-training program on strength and hypertrophy in untrained subjects. Appl Physiol Nutr Metab 38(3):341–344. PMID: 23537028 | DOI: 10.1139/apnm-2012-0176 — resumo-PubMed.
- `gschneidner2025` — Gschneidner D, Carlson L, Steele J, et al. (2025). The effects of lengthened-partial range of motion resistance training of the limbs on arm and thigh muscle area: A multi-site randomised trial. J Sports Sci 43(23):2963–2976. PMID: 41055237 | DOI: 10.1080/02640414.2025.2567805 — resumo-PubMed (reconferido; o resumo não diz se as pessoas eram treinadas).
- `hakkinen2022` — Häkkinen K, Newton RU, Walker S, et al. (2022). Effects of Upper Body Eccentric versus Concentric Strength Training and Detraining on Maximal Force, Muscle Activation, Hypertrophy and Serum Hormones in Women. J Sports Sci Med 21(2):200–213. PMID: 35719226 | DOI: 10.52082/jssm.2022.200 — resumo-PubMed.
- `lanza2024` — Lanza MB, Prado GC, Lacerda LT, et al. (2024). Muscle hypertrophy response across four muscles involved in the bench press exercise: Randomized 10 weeks training intervention. J Bodyw Mov Ther 40:1417–1422. PMID: 39593465 | DOI: 10.1016/j.jbmt.2024.07.054 — resumo-PubMed (reconferido).
- `lima2018` — Lima C, Li Y, Low JL, Herat N, Behm DG (2018). Superior Training-Specific Adaptations With an 8-Week Yoak Push-up Training Program. J Strength Cond Res 32(9):2409–2418. PMID: 29979278 | DOI: 10.1519/jsc.0000000000002735 — resumo-PubMed (não mede músculo).
- `lynch2026` — Lynch SD, Howard M, Beavers DP, et al. (2026). Weighted vest use or resistance exercise to offset muscle loss in older adults: secondary findings from the INVEST in bone health RCT. J Gerontol A Biol Sci Med Sci 81(4):glag062. PMID: 41761582 | DOI: 10.1093/gerona/glag062 — resumo-PubMed (colete vestido no dia a dia, não como carga).
- `pedrosa2022` — Pedrosa GF, Lima FV, Schoenfeld BJ, et al. (2022). Partial range of motion training elicits favorable improvements in muscular adaptations when carried out at long muscle lengths. Eur J Sport Sci 22(8):1250–1260. PMID: 33977835 | DOI: 10.1080/17461391.2021.1927199 — resumo-PubMed.
- `santosjunior2024` — Santos Junior ERT, De Salles BF, Dias I, et al. (2024). Sex Differences in Neuromuscular Adaptations Following 12 Weeks of Kettlebell Swing Training. Cureus 16(9):e70551. PMID: 39479133 | DOI: 10.7759/cureus.70551 — resumo-PubMed (força, salto e resistência; não hipertrofia).
- `sullivan2023` — Sullivan K, Ferreira PR, Martinez VGF, et al. (2023). Muscle Thickness, Echo-Intensity, Peak Force, Time Under Tension, Total Load Lifted, and Perception of Effort Comparisons Between Two Abdominal Crunch Resistance Training Protocols in Recreationally-Trained Participants. Int J Exerc Sci 16(6):538–549. PMID: 37621710 | DOI: 10.70252/bcsy3591 — resumo-PubMed (efeito de uma sessão, não hipertrofia).

### Chaves que já existem e foram completadas
- `kubo2019`: Kubo K, Ikebukuro T, Yata H, et al. Eur J Appl Physiol 119(9):1933–1942; DOI 10.1007/s00421-019-04181-y.
- `kinoshita2026`: Kinoshita M, Maeo S, Kobayashi Y, et al. "Hypertrophic Effects of Single- versus Multi-Joint Exercise: A Direct Comparison between Knee Extension and Leg Press". Med Sci Sports Exerc 58(7):1566–1580; DOI 10.1249/mss.0000000000003957.
- `attarieh2026`: título, *J Strength Cond Res* e DOI 10.1519/JSC.0000000000005701 (correção 9).
- `kobayashi2026`: DOI 10.1080/02640414.2026.2741751.
- `wolf2025`: DOI 10.7717/peerj.18904.
- Relidos sem mudança de status: `pinto2025`, `nunes2020`, `maeo2023`. Não relidos (limite de pedidos): `larsen2025`, `chaves2020`, `attarieh2025`, `mckenzie2022`, `escamilla2006`.

### NÃO VERIFICADAS (só título e PMID; nenhum número delas é usado)
| PMID | Título (como na lista do PubMed) | Ano, periódico | Onde aparece |
|---|---|---|---|
| 39699974 | The effects of hip flexion angle on quadriceps femoris muscle hypertrophy in the leg extension exercise | 2025, J Sports Sci | quadríceps |
| 40113586 | Leg press com amplitudes diferentes do joelho em treinados (título não anotado) | 2025 | quadríceps (Larsen, proposta `larsen2025b`) |
| 26244600 | `gentil2015` (já em `fontes.md`, NÃO VERIFICADO) | 2015 | bíceps |
| 41988507 | The effects of shoulder extension angle on elbow flexor hypertrophy in the cable curl exercise | 2026, Front Physiol | bíceps |
| 41247250 | Partial Range, Full Gains? … Elbow Flexor Hypertrophy and Strength in Trained Individuals | 2025, Eur J Sport Sci | bíceps |
| 42392615 | Moderate Intensity Resistance Training With Partial Range-of-Motion at Long Muscle Lengths … | 2026, J Strength Cond Res | parciais |
| 41646176 | Does longer-muscle length resistance training cause greater longitudinal growth in humans? A systematic review | 2025, Sports Med Health Sci | parciais |
| 36334406 | Non-uniform excitation of pectoralis major induced by changes in bench press inclination … | 2022, J Electromyogr Kinesiol | peito |
| 27660368 | Impact of the Nordic hamstring and hip extension exercises on hamstring architecture and morphology … (`bourne2017` no `10`) | 2017, Br J Sports Med | posteriores |
| 39297348, 35941515 | geometria e arquitetura dos posteriores | — | posteriores |
| 24149748 | Muscle activation during various hamstring exercises | 2014, J Strength Cond Res | GHD |
| 28658084 | Addition of Glute-Ham-Gastroc Raise to a Resistance Training Program: Effect on Jump Propulsion and Landing | 2017, J Strength Cond Res | GHD |
| 34027916 | Electromyographical Differences Between the Hyperextension and Reverse-Hyperextension | 2021, J Strength Cond Res | reversa |
| 36096478 | Effect of Load on Muscle Activity, Kinematics, and Force Production During the Reverse Hyperextension Exercise | 2022, J Appl Biomech | reversa |
| 34948565, 35682148 | Effects of Copenhagen Adduction Exercise on … Adductors (sub-17; arquitetura e flexibilidade) | 2021; 2022, Int J Environ Res Public Health | adutores |
| 40827942 | The Copenhagen Adduction Exercise Effect on Sport Performance and Injury Prevention: A Systematic Review With Meta-Analysis | 2025, Scand J Med Sci Sports | adutores |
| 39444266, 40113574 | força com Copenhagen e adução | — | adutores |
| 32735428 | Different Foot Positioning During Calf Training to Induce Portion-Specific Gastrocnemius Muscle Hypertrophy | 2020, J Strength Cond Res | panturrilha |
| 40850937, 39995432, 42006449 | parciais depois da falha na panturrilha | 2025–2026 | panturrilha |
| 38684187 | Bigger Calves from Doing Higher Resistance Training Volume? | 2024, Int J Sports Med | panturrilha |
| 22357302 | Marked effects of Pilates on the abdominal muscles: a longitudinal magnetic resonance imaging study | 2012, Med Sci Sports Exerc | abdômen |
| 30293403 | Changes in rectus femoris architecture induced by the reverse nordic hamstring exercises | 2019, J Sports Med Phys Fitness | quadríceps |
| 39214520 | Reverse Nordic Curl Does Not Generate Superior Eccentric Activation of the Quadriceps … (já no `10`) | 2024 | quadríceps |
| 33114782 | Using Machines or Free Weights for Resistance Training in Novice Males? A Randomized Parallel Trial | 2020, Int J Environ Res Public Health | nível |
| 21997449 | Kettlebell swing, snatch, and bottoms-up carry: back and hip muscle activation, motion, and low back loads | 2012, J Strength Cond Res | segurança (swing) |
| 22580981 | Kettlebell swing training improves maximal and explosive strength (já no `10`) | 2012, J Strength Cond Res | swing |
| 35518365 | Effects of Six-week Periodized Versus Non-Periodized Kettlebell Swing Training … | 2022, Int J Exerc Sci | swing |
| 28930870 | Hamstring Myoelectrical Activity During Three Different Kettlebell Swing Exercises | 2020, J Strength Cond Res | swing |
| 20436242 | Core muscle activation during Swiss ball and traditional abdominal exercises | 2010, J Orthop Sports Phys Ther | bola |
| 22893857 | Swiss ball abdominal crunch with added elastic resistance is an effective alternative to training machines | 2012, Int J Sports Phys Ther | bola |
| 27302152 | Muscle Activation Among Supine, Prone, and Side Position Exercises With and Without a Swiss Ball | 2016, Sports Health | bola |
| 25177174 | Muscle Activation during Push-Ups with Different Suspension Training Systems | 2014, J Sports Sci Med | argolas |
| 36976936 | A Systematic Review of Dynamic, Kinematic, and Muscle Activity during Gymnastic Still Rings Elements | 2023, Sports (Basel) | argolas |
| 15085210 | Abdominal Muscle Activity While Performing Trunk-Flexion Exercises Using the Ab Roller, ABslide, FitBall … | 2004, J Athl Train | roda |
| 28005680 | Resistance Training With Ankle Weight Cuffs Is Feasible in Patients With Acute Exacerbation of COPD | 2017, J Cardiopulm Rehabil Prev | caneleiras |
| 42742276 | Performances and Fatigue Responses to Weighted Vest Training in Parkour Novices | 2026, Eur J Sport Sci | colete |
| 24377067 | Perceived loading and muscle activity during hip strengthening exercises: comparison of elastic resistance and machine exercises | 2013, Int J Sports Phys Ther | mini-band |
| 26491608 | An examination of the gluteal muscle activity associated with dynamic hip abduction and hip external rotation exercise: a systematic review | 2015, Int J Sports Phys Ther | mini-band |
| 41755100 | Landmine Press Kinematics Measured with an Enhanced YOLOv8 Model and Mathematical Modeling | 2026, Sensors (Basel) | landmine |
| 18051626 | Electromyographic validation of the deltoideus (anterior portion) and pectoralis major (clavicular portion) muscles in pull-over exercises | 2007, Electromyogr Clin Neurophysiol | pullover |
| 36309690 | abdução e outros exercícios de glúteo contra placebo em artrose do quadril | 2022, BMC Musculoskelet Disord | abdução em pé |
| 42468010 | Comparative Effectiveness of Unstable Versus Stable Resistance Training … in Older Adults: A Systematic Review and Meta-analysis | 2026, Am J Phys Med Rehabil | prancha de equilíbrio |
| 25254898 | Muscle activation and strength in squat and Bulgarian squat on stable and unstable surface | 2014, Int J Sports Med | prancha de equilíbrio |
| 18296960 | No difference in 1RM strength and muscle activation during the barbell chest press on a stable and unstable surface | 2008, J Strength Cond Res | prancha de equilíbrio |
| 41318473 | EMG do nórdico, do swing e da flexão de joelho deslizante depois de lesão dos posteriores | 2025, BMC Sports Sci Med Rehabil | discos deslizantes |
| 29351160 | Acute Cardiorespiratory and Metabolic Effects of a Sandbag Resistance Exercise Protocol | 2018, J Strength Cond Res | sandbag |
| Só EMG, vistos na busca | 28713459, 28677940, 32824894, 40269203 | — | tronco superior |

## Pendências de leitura
Em ordem de peso para o app:
1. **39699974** (ângulo do quadril na extensora): pode mudar a técnica da extensora.
2. **38156065** (Kinoshita 2023: o número do sóleo) e **37877099** (Plotkin 2023: o número do adutor).
3. **40113586** (Larsen 2025, leg press): reler e criar `larsen2025b`.
4. **41379528** (`kassiano2026`): agachamento livre ou no smith?
5. **26244600** (`gentil2015`): se confirmar, "rosca não acrescenta aos multiarticulares" pode subir para moderada (só bíceps).
6. **41247250**, **42392615**, **41988507** (parciais e ângulo do ombro na rosca).
7. Copenhagen (34948565, 35682148, 40827942) e panturrilha (32735428, 40850937, 39995432, 42006449, 38684187).
8. **21997449** (carga lombar do swing), **24377067** (elástico × máquina na abdução), **24149748** (GHD), **27660368** (nórdico e extensão de quadril), **22357302** (Pilates), **33114782** (máquina × peso livre em novatos).
9. Releituras que falharam: 36293792 (`mckenzie2022`), 16494072 (`escamilla2006`: a roda estava no estudo?), 40692697 (`larsen2025`), 32922646 (`chaves2020`), 40082069 (`attarieh2025`), 37559762 (`zabaletakorta2023`).

## Buscas registradas (03 e 04/11/2026)

Formato: termos → o que achou. "0" = a página do PubMed abriu e não listou nada; "falhou" ou "bloqueada" = limite de pedidos (a busca vazia pode ser falha da rede, e não ausência de estudo).

### Parte H1 (tronco superior e braços; `pubmed.py s`)
- `incline bench press pectoralis hypertrophy` → Chaves 2020; 1 EMG (28713459, não lido).
- `bench press muscle thickness pectoralis major training` → Kikuchi 2017, Kotarsky 2018 (já no projeto); 36334406 (não lido).
- `lat pulldown row hypertrophy latissimus` → 0.
- `latissimus dorsi hypertrophy resistance training` → nada sobre escolha de exercício (Andersen 2014 e Snarr 2017 são EMG; 27258300 é de proteína).
- `pull-up training muscle thickness` → falhou (2 vezes).
- `pullover hypertrophy` → 0.
- `lateral raise deltoid hypertrophy` → Larsen 2025.
- `preacher curl incline curl hypertrophy` → Kobayashi 2026, Zabaleta-Korta 2023.
- `chest fly hypertrophy pectoralis` → 0.
- `rear deltoid hypertrophy training` → 0.
- `triceps overhead extension hypertrophy` → falhou (2 vezes); Maeo 2023 já no projeto.
- `lengthened partials upper body hypertrophy` → falhou.
- `pull-up lat pulldown muscle hypertrophy` → 0.
- `incline flat bench press trained hypertrophy` → nada sobre a pergunta (42112925; 28713459).
- `deltoid muscle thickness training` → Larsen 2025; 35719226 (Häkkinen 2022, lido).
- `lengthened partials hypertrophy` → Wolf 2025; Gschneidner 2025 (lido); 41247250 e 42392615 (não lidos); 41646176 (revisão, não lida).
- `lat pulldown training hypertrophy` → Gentil 2013 (lido).
- `rowing exercise muscle thickness` → 0.
- `elbow extension shoulder position hypertrophy` → Attarieh 2025; 41988507 (não lido).
- `biceps long head hypertrophy` → 0 (cirurgia e posteriores).
- `partial range of motion elbow flexors hypertrophy` → Wolf 2025; 41247250.
- `shoulder press hypertrophy` → nada sobre desenvolvimento.
- `dumbbell fly training` → só EMG (Rabello 2024; 33312291).
- `dip training hypertrophy` → 0.
- `eccentric overload elbow flexors hypertrophy` → 0.
- `lateral raise lengthened partial` → 0.
- `range of motion bench press hypertrophy` → só EMG agudo (40269203).
- `latissimus dorsi regional hypertrophy` → 0 (estudos com aves).
- `posterior deltoid training` → só EMG (32824894).
- `gymnastic rings training` → só ginastas de elite.
- `weighted vest training muscle` → só idosos e osteopenia.
- `anterior deltoid hypertrophy bench press` → Lanza 2024 e Häkkinen 2022 (lidos).
- `pectoralis major clavicular hypertrophy`; `pec deck training` → Pinto 2025.
- `hammer curl brachialis` → 0.
- `lying triceps extension` → só EMG (28677940).
- `biceps brachii regional hypertrophy` → nada novo.
- `triceps brachii regional hypertrophy` → nada sobre escolha (21858666, 23657165, não lidos).
- `latissimus dorsi muscle thickness` → 0 (cirurgia plástica).
- `trapezius hypertrophy training` → nada sobre escolha.
- Resumos lidos: 42829982, 41055237, 23537028, 40266636, 39959841, 35719226, 32823490, 39593465, 35819335. Falharam: 40692697, 32922646, 40082069, 37559762, 36334406, 41988507, 41247250, 42392615, 41646176.

### Parte H2 (pernas e abdômen; `pubmed.py s`)
- `adductor hypertrophy training MRI` → Plotkin 2023 e o preprint, Kinoshita 2026; nada de adução isolada.
- `hip adduction exercise muscle volume` → 0 de hipertrofia; 39444266, 40113574 (força).
- `Copenhagen adduction exercise hypertrophy` → 0.
- `Copenhagen adduction muscle thickness` → 35682148, 34948565, 40827942 (bloqueados).
- `adductor magnus squat hypertrophy` → bloqueada (2 vezes).
- `rectus abdominis hypertrophy training` → nenhum ensaio comparando; 22357302, 30811444, 29060921 (não lidos).
- `abdominal muscle thickness resistance training randomized` → 37621710 (Sullivan 2023, lido: agudo).
- `crunch training rectus abdominis thickness` → 0.
- `plank training abdominal muscle thickness` → 0.
- `squat deadlift abdominal muscle hypertrophy` → 0.
- `ab wheel rollout electromyography`; `hanging leg raise electromyography rectus abdominis` → bloqueadas (2 vezes cada).
- `trunk muscle hypertrophy resistance training MRI` → 0 (21771252 lido: fora do tema).
- `soleus hypertrophy seated calf raise` → Kinoshita 2023; 32735428.
- `triceps surae hypertrophy knee angle training` → 0.
- `calf raise range of motion hypertrophy` → Kassiano 2023b; 40850937, 42006449.
- `gastrocnemius hypertrophy trained calf` → 38684187, 39995432, 32735428.
- `knee extension hip angle rectus femoris hypertrophy` → 39699974 (bloqueado 3 vezes); 41796242.
- `rectus femoris hypertrophy supine knee extension`; `seated reclined knee extension hypertrophy`; `lengthened partial knee extension hypertrophy` → 0.
- `partial range motion long muscle lengths knee extension` → Pedrosa 2022 (lido).
- `hip thrust squat hypertrophy women` → 31975359 (lido depois); Contreras 2015.
- `Romanian deadlift hamstring hypertrophy` → bloqueada.
- `nordic hamstring hip extension MRI hypertrophy` → 27660368, 39297348, 35941515.
- `seated prone leg curl hypertrophy` → Maeo 2021; Kassiano 2025 var.
- `sissy squat` → 0.
- `reverse nordic quadriceps` → 39214520; 30293403.
- `hack squat hypertrophy` → Kassiano 2025 var.
- `pendulum squat` → 0.
- `belt squat` → 28595237 (lido por W1).
- `leg press squat hypertrophy quadriceps` → nada novo (37133323, 42709978).
- `squat depth hypertrophy gluteus` → 0.
- `split squat lunge hypertrophy` → só revisão de EMG (`krauseneto2020`).
- `Bulgarian split squat hypertrophy` → 41983008 (`bulgaro2026`).
- `hip abduction training gluteus medius hypertrophy` → Attarieh 2026; 36309690.
- `gluteus maximus hypertrophy exercise randomized` → 32252103 (não lido).
- `eccentric overload flywheel squat hypertrophy` → nada útil.
- `glute ham raise` → 24149748, 28658084.
- `reverse hyperextension` → 34027916, 36096478, `lawrence2019`.
- `quadriceps regional hypertrophy knee extension squat` → nada novo.
- `hamstring regional hypertrophy leg curl` → bloqueada.
- `free weight machine novice strength training` → 33114782.
- `lengthened partial range of motion lower body hypertrophy` → bloqueada.
- Resumos lidos: 31230110, 37621710, 21771252, 33977835, 31975359, 41630124. Bloqueados: 39699974, 38156065, 37877099, 35682148, 34948565, 40827942, 32735428, 40850937, 42006449, 39995432, 38684187, 41796242, 22357302, 30811444. Não chegaram a ser pedidos: 27660368, 33114782, 30293403, 39214520, 41983008, 37133323, 28595237, 32252103.

### Parte W1 (equipamentos; `pubmed.py s`)
- `gymnastic rings push-up`; `suspended push-up rings electromyography` → vazias (bloqueio provável).
- `ring dips` → McKenzie 2022.
- `push-up suspension devices muscle activation` → 9 títulos de EMG e cinemática (25177174, 29541105, 25882770, 31910394, 37738266, 24511343, 36360619, 24088865) e 29979278 (Lima 2018, lido).
- `gymnastic rings training` → 36976936.
- `weighted vest training muscle` → 41761582 (Lynch 2026, lido); 36443661, 41752870, 39934626, 39525516, 42742276.
- `ankle weights resistance training` → 28005680; nada de hipertrofia. `ankle weights older adults strength` → nada útil.
- `mini band hip abduction gluteus`; `loop band gluteus medius electromyography`; `elastic band hip abduction squat gluteus` → vazias (bloqueio provável).
- `hip abduction elastic resistance gluteus medius` → 24377067, 26491608.
- `hip abduction training gluteus hypertrophy` → 42842490 (`attarieh2026`: título e periódico); 36309690.
- `landmine press` → 41755100. `landmine` → só minas terrestres. `landmine press shoulder exercise` → vazia.
- `glute ham raise` → 24149748, 28658084.
- `abdominal wheel rollout` → vazia.
- `ab roller electromyography` → `escamilla2006`; 15085210, 15705027, 12930170, 10573670 (o "Ab Roller" é uma armação, não a roda).
- `belt squat` → 28595237 (Evans 2019, lido).
- `pendulum squat` → nada sobre a máquina.
- `reverse hyperextension` → 34027916, 36096478; `lawrence2019`.
- `pullover exercise electromyography` → 18051626; `difonza2026`.
- `instability resistance training meta-analysis` → nada no foco.
- `unstable surface resistance training muscle` → 42468010, 28417093, 25254898, 18296960, 38827426.
- `sandbag training` → 36429728 (Chien 2022, lido); 29351160.
- `sliding leg curl hamstring` → 41318473, 41597426.
- `push-up handles wrist` → nada útil (7676844; 3896603).
- `kettlebell training muscle hypertrophy` → vazia (bloqueio provável).
- Resumos lidos: 41761582, 36429728, 28595237, 29979278. Falharam: 36293792, 25177174, 28005680, 16494072, 15085210, 24377067, 24149748, 42468010, 34027916, 36976936.
- Não buscado: acessórios de tríceps e de rosca na polia, máquina de pullover, abdução em pé × sentado, colete com flexão ou barra fixa em jovens.

### Parte W2 (exercícios, escadas, segurança e vídeos)
- `kettlebell training muscle thickness` → falhou (2 vezes).
- `kettlebell swing training` → 10 títulos de força, potência, gasto metabólico e EMG; nenhum de hipertrofia. Lido: 39479133 (Santos Junior 2024). 21997449 não abriu (2 vezes).
- `unilateral dumbbell row electromyography` → falhou (2 vezes).
- `Swiss ball crunch abdominal electromyography` → 22893857, 20436242, 27302152; 20436242 não abriu.
- Não repetidas (já registradas por H1, H2 e no `10`): `pullover hypertrophy`, `hammer curl brachialis`, `suspension training hypertrophy`, `step-up exercise training`, `stability ball leg curl`, `kettlebell training randomized strength`.
- **Web (só títulos e URLs, com o filtro youtube.com; nenhum vídeo aberto):** `TRX bicep curl how to`; `TRX Training official channel hamstring curl suspension`; `single arm dumbbell row no bench hand on knee staggered stance`; `kettlebell single arm row and kettlebell overhead triceps extension tutorial`; `cable reverse fly crossover rear delt and single arm standing cable row tutorial`; `single arm standing cable row tutorial`; `TRX Y fly T fly rear delt and TRX overhead triceps extension tutorial`; `stability ball crunch and stability ball glute bridge tutorial`; `stability ball crunch how to proper form`; `parallel bars knee raise dip station leg raise tutorial`; `TRX suspended lunge rear foot elevated split squat tutorial`; `kettlebell romanian deadlift tutorial and dumbbell hammer curl tutorial`; `dumbbell hammer curl proper form`.

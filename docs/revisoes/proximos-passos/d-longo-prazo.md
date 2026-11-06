# Frente D: progressão e longo prazo (depois da 4ª semana)

> Sessão de próximos passos, 06/11/2026. Mede o que o app faz com quem treina 3, 6 ou 12 meses e propõe o que mudar. Nada aqui altera código, regras ou dados. Os números saem de um praticante simulado que usa o **código real** do app (gerador, sessão, progressão, calibração, semana leve, "a sua semana", volta de pausa). Só "o corpo" é modelo **[modelo]**: serve para achar travas e excessos, não para prever o ganho de ninguém. Selos como em `docs/pesquisa/00-metodo.md`. Nada do uso real (R3) foi lido além do que está em `docs/devlog.md` e `docs/backlog.md`.

## Em uma olhada

O app foi feito para as primeiras semanas, e nelas funciona. Ele não tem a ideia de "bloco de treino" (o único "bloco" do código é o período entre duas pausas), não reavalia o nível e não guarda nenhum registro de quando o programa muda. Na simulação de 24 semanas, três coisas já aparecem **antes** do 3º mês, para as 4 personas medidas. **(1)** A semana leve é sugerida 2 a 6 vezes em 24 semanas, sempre logo que a carência acaba. Quem aceita passa de 1 a 6 das 24 semanas com metade das séries. Quem recusa ("Agora não") vê a oferta de novo em quase todo treino: 46 a 107 vezes. **(2)** A calibração da 1ª série pode não terminar. Quando o próximo peso é um salto grande (halter de 4 para 5 kg), nenhuma carga cai na janela do alvo, e a pessoa fica até 31 sessões só com "séries de acerto". **(3)** "Estagnado" vai de 2% a 45% das sugestões, conforme o ritmo de progresso. Ele não traz nenhuma ação concreta: a carga fica igual e a frase lista 4 saídas. Mudar o gatilho para 4 sessões corta o "estagnado", mas não muda quantas semanas leves aparecem. O que segura a semana leve é o próprio gatilho dela. As questões de longo prazo de verdade (a reavaliação do nível aos ~6 meses, a mudança de objetivo e a troca de exercícios ao fim de um bloco) só aparecem depois do 2º mês e para quem continua treinando. Num app de treino, só 10% dos iniciantes ainda treinavam aos 12 meses (`conti2026`, um estudo). **Recomendação:** antes do fim do R3, corrigir os 4 defeitos medidos e preparar a leitura do export (opção 1). Depois do R3, com o dado real, recalibrar os gatilhos e tratar a mudança de nível e de objetivo (opção 2). Blocos com variação de exercícios (opção 3) só depois, junto com a frente A, e só se o R3 mostrar platô ou tédio.

---

## 1. O que existe hoje

| peça | onde | regra (`regraId`) | o que faz | medido |
|---|---|---|---|---|
| Dupla progressão | `src/domain/progressao/index.ts`, `sugerirProgressao` | `progressao.subir`, `.manter`, `.reduzir`, `.salto-grande`, `.carga-leve`, `.estagnacao` (consenso) | Segurança primeiro (dor). Depois vêm o salto grande, "abaixo do mínimo", "carga leve" e "topo em 2 sessões". Por último, "estagnado": 3 sessões com a mesma carga e o total de repetições sem passar o da 1ª delas. | O "estagnado" não traz `proxima`: a carga sugerida é a mesma e o texto lista 4 saídas ("alargue a faixa; reduza 10%; semana leve; troque"). Nenhuma das 4 é aplicada pelo app. |
| Escadas sem kg | `progressao/escadas.ts` e `escadas.json` | `progressao.escada-por-exercicio`, `.escada-elastico`, `.criterio-degrau`, `equipamento.fim-da-escada` | Degraus por exercício; no topo, aviso sutil de "até ~30 repetições" | Elisa (corpo livre), 52 semanas: 4 (ritmo normal) a 7 (ritmo rápido) exercícios chegam ao último degrau; 151 avisos de fim de escada no ritmo rápido |
| Calibração da 1ª série | `progressao/calibracao.ts`, `sessao/index.ts` (`calibracaoNaSessao`) | `progressao.calibracao` (consenso) | Mantém a carga quando R = repetições + reserva cai em A ± 2, sendo A o alvo; fora disso, desce ou sobe. A série fora da janela vira "acerto" e não entra na dupla progressão. | **Não tem saída**: se nenhuma carga possível cai em A ± 2, o exercício continua calibrando. Ver a seção 2. |
| "Bloco" | `src/domain/sessao/bloco.ts`, `blocoAtual` | `readaptacao.durante-uso` (consenso) | É o período entre pausas de 21 dias ou mais. A semana do programa conta as semanas com treino desde o início desse período. | Não é mesociclo: não há fim de bloco, troca de exercício nem progressão de volume |
| Fases | `gerador/index.ts`, `fases()` | `iniciante.fase-aprendizado`, `readaptacao.semana1–3` | Iniciante: semanas 1–2 com RIR 3–4 e volume mínimo; volta de pausa: 3 semanas | Depois da semana 3, o programa é o mesmo para sempre |
| Semana leve | `acompanhamento/semana-leve.ts`, `features/acompanhamento/acoes.ts` | `deload.semana-leve` (consenso; "não muda a hipertrofia", moderada) | Sugere com ≥ 2 exercícios estagnados, "pesado demais" em 2 dos últimos 3 treinos ou dor que se repete. Carência: as 3 semanas depois de uma volta de pausa ou de uma semana leve. "Agora não" esconde a oferta só até o próximo treino. | Ver a seção 2: 3 a 6 vezes em 24 semanas. O deload automático continua fora do MVP (`CLAUDE.md`) e o app só sugere. |
| Nível | `src/domain/nivel/index.ts`; `estado.nivel.escolhido` em `src/storage/esquema.ts` | `nivel.classificacao` (consenso) | Classificado no cadastro. A regra diz que iniciante é quem tem "< ~6 meses de treino contínuo". | **Nunca é reavaliado durante o uso.** A única porta é uma pausa de mais de 182 dias (`mensagemDeVolta`, `refazerNivel`). Pela própria regra, quem completa 6 a 24 meses de treino seria intermediário (`classificarNivel`: `6-24m` → `intermediario`). |
| Objetivo | `gerador/index.ts`, `textoDoObjetivo`; `rotina.objetivo` | `objetivo.*` | Só "ficar mais forte" muda números, e só para o intermediário e o avançado (`forca && nivel !== 'iniciante'`) | Ana (iniciante) com "ficar mais forte": **0 de 19** prescrições mudam. Bruno: 8 de 32; Carla: 10 de 37 (faixa 5–8 e 150 s) |
| Histórico | `historicoDoExercicio`, `evolucaoDoExercicio` | `progressao.troca-equivalente`, `acompanhamento.evolucao` | O histórico é por exercício feito (e por local, nas máquinas). Um exercício novo recomeça pela calibração, e a evolução da alternativa é separada. | O estado guarda **só o programa atual** (`programa.geradoEm`). Não há registro de programas anteriores, nem de quando e por que o programa mudou. As sessões não guardam a faixa prescrita. |

## 2. O que falta (medido)

**O simulador** (`sim.ts`, no scratchpad; ver "Como reproduzir") usa 4 personas fictícias de `tests/personas/index.ts`:
- Ana: iniciante, halteres de 1 a 12 kg, 3 dias.
- Bruno: intermediário, polia e halteres de 1 a 10 kg, 4 dias.
- Elisa: iniciante, corpo livre, 3 dias.
- Carla: avançada, academia completa, 5 dias.

A rotina é fixa: segunda, quarta e sexta, ou os dias da rotina. Cada exercício da prescrição do dia é feito com a sugestão do app, e a calibração segue a mesma regra da tela (`Treino.tsx`, linha 90).

O corpo é modelo **[modelo]**:
- repetições até a falha pela fórmula de Epley invertida;
- a pessoa para no menor RIR do alvo e perde 1 repetição por série;
- ruído opcional de −1 a +1 repetição;
- a força cresce 1,5%, 0,75% ou 0,3% por semana com treino (ritmos rápido, normal e lento) e cai 2% por semana parada.

Os cenários são:
- os 3 ritmos;
- "faltas": 1 treino em cada 3 não acontece;
- "pausa": 4 semanas paradas, da 9ª à 12ª;
- os mesmos, com ruído;
- duas variantes em que a pessoa sempre recusa a semana leve.

São 48 simulações de 24 semanas e 8 de 52. A tabela completa está em `tabela-sim.md`.

### 2.1 O que a pessoa ouve, em 24 semanas

Parcela das sugestões por tipo (sem ruído | com ruído):

| persona | ritmo | subir carga | +1 repetição | estagnado | "semana leve: mesma carga" | calibrar | semana leve sugerida (semanas) | semanas em semana leve |
|---|---|---:|---:|---:|---:|---:|---|---:|
| Ana | rápido | 7% \| 7% | 44% \| 46% | 11% \| 6% | 16% | 8% | 5, 10, 16, 20 | 4,0 |
| Ana | lento | 3% \| 4% | 16% \| 30% | 23% \| 12% | 18% | 20% | 5, 9, 13, 17, 21 | 5,0 |
| Bruno | normal | 6% \| 6% | 45% \| 49% | 9% \| 6% | 21% | 11% | 6, 10, 14, 18, 22 | 5,0 |
| Bruno | lento | 3% \| 4% | 23% \| 38% | 28% \| 12% | 19% | 15% | 5, 9, 13, 17, 21 | 5,0 |
| Elisa | normal | 4% \| 3% | 43% \| 55% | 25% \| 15% | 25% | 4% | 2, 6, 10, 15, 19, 23 | 6,0 |
| Elisa | lento | 2% \| 2% | 24% \| 44% | 45% \| 25% | 25% | 4% | 2, 6, 10, 14, 18, 22 | 6,0 |
| Carla | normal | 5% \| 6% | 51% \| 56% | 8% \| 6% | 24% | 8% | 3, 7, 11, 15, 19, 23 | 6,0 |
| Carla | lento | 3% \| 3% | 28% \| 46% | 33% \| 16% | 24% | 9% | 3, 7, 11, 15, 19, 23 | 6,0 |

O que isso mostra:
- **A semana leve é o que mais aparece no longo prazo.** Nos 40 cenários em que a pessoa aceita a sugestão, ela vem 2 a 6 vezes em 24 semanas. A 1ª vem entre a semana 2 e a 12, e as seguintes vêm a cada ~4 a 5 semanas, que é exatamente o fim da carência (7 dias de semana leve + 3 semanas). Em 52 semanas, são 8 a 13 sugestões e 7,7 a 12,4 semanas com metade das séries (`exp2.ts`, E4). Isso passa da prática dos atletas, de uma semana leve a cada ~5,6 semanas (`rogerson2024`, consenso), embora o app sirva a quem não é atleta e a semana leve não mude a hipertrofia (moderada).
- **Por que ela volta tanto.** O gatilho é "≥ 2 exercícios estagnados" contados no programa inteiro, que tem 7 a 37 exercícios. Com tantos exercícios, quase sempre há 2 parados. Além disso, a semana leve não desfaz a estagnação: as sessões dela ficam fora da conta, e as 3 sessões paradas de antes continuam lá.
- **"Agora não" não segura a oferta.** Nos 8 cenários em que a pessoa recusa, a oferta volta em quase todo treino depois da 1ª vez: Ana 46 e 57 vezes, Bruno 66 e 76, Elisa 51 e 64, Carla 107 e 107 (`acoes.ts`: "esconde a sugestão até o próximo treino").
- **"Estagnado" depende quase todo do ritmo de progresso e do ruído.** "Metade das sugestões" (achado 11; F.2) só se repete no corpo livre com progresso lento e sem ruído: Elisa, 45%. Com ruído de ±1 repetição, fica entre 2% e 25%. As maiores sequências seguidas de "estagnado" num mesmo exercício são de 6 sugestões (Bruno, lento), 7 (Ana, normal) e 9 (Elisa, lento).
- **Iniciante: "estagnado" e semana leve dentro da fase de aprendizado.** O 1º "estagnado" da Ana e da Elisa aparece na semana 2 ou 3. A semana leve da Elisa é sugerida já na **semana 2** em 5 dos 10 cenários em que ela aceita a sugestão. Nessa fase, o app pede RIR 3–4 e foco na técnica (`iniciante.fase-aprendizado`), e a carência não a cobre.

### 2.2 As variantes do "estagnado" (F.2) e do gatilho da semana leve

Fonte: `sim.ts` com `variante`, `frac.ts` e `recon.ts`. A 1ª linha de cada célula é a parcela de "estagnado"; a 2ª, quantas semanas leves foram sugeridas em 24 semanas.

| persona, ritmo | hoje | 4 sessões | "nenhuma das 3 subiu" | gatilho proporcional (≥ 40% dos exercícios com histórico, mín. 2) | "estagnado" com −10% concreto |
|---|---|---|---|---|---|
| Bruno, normal | 9% · 5 | 3% · 4 | 8% · 5 | 9% · 3 | 6% · 5 |
| Bruno, lento + ruído | 12% · 5 | 8% · 5 | 8% · 5 | 12% · 3 | 7% · 5 |
| Elisa, lento + ruído | 25% · 6 | 14% · 5 | 14% · 5 | 25% · 5 | 15% · 5 |
| Carla, normal | 8% · 6 | 3% · 5 | 6% · 6 | 8% · 4 | 6% · 6 |
| Ana, rápido | 11% · 4 | — | — | 11% · **0** | — |
| Bruno e Carla, rápido | 3% · 3 e 4 | — | — | 3% · **0** | — |

- As duas variantes do F.2 **cortam o "estagnado" pela metade**, mas mudam a semana leve em no máximo 1 sugestão. Quem decide a frequência da semana leve é o gatilho dela, e não o do "estagnado".
- O gatilho proporcional zera a semana leve para quem progride rápido e mantém 3 a 6 para quem estagna de verdade. É o comportamento que a regra descreve ("só com sinal").
- Fazer a 2ª saída da escada de verdade (sugerir −10% e reconstruir) corta o "estagnado" pela metade: Elisa, no ritmo lento, vai de 45% para 15%; Bruno, de 28% para 9%. A parcela de "subir" vai de 2–3% para 10–15%. A carga final fica 1% a 5% menor que hoje, porque a reconstrução tem um custo, e a semana leve não muda.

### 2.3 A calibração que não termina

Fonte: `trace-cal.ts`, `trace-cal2.ts` e `cal-resumo.ts`. Exemplo real do simulador (Ana, elevação lateral, alvo de 12–20 repetições com RIR 1–2, A = 17,5, janela de 15,5 a 19,5):

```
3 kg × 30 @5 (acerto) → 4 kg × 21 @3 (acerto, R = 24) → 5 kg × 9 @3 (acerto, R = 12) → próxima sessão: 3 kg…
```

- A 4 kg, R = 24; a 5 kg, R = 12. Nenhum peso cai na janela, que tem 5 repetições de largura, e o 1 kg a mais é um salto de 25%. Toda série vira "acerto", o exercício nunca entra na dupla progressão e a sugestão continua "Ainda calibrando". Só sai quando a força, que cresce sozinha no modelo, põe o 4 kg dentro da janela.
- **Nas 24 combinações de persona, ritmo e ruído, 62 dos 492 exercícios ficaram 4 sessões ou mais só em séries de acerto, e 26 deles ficaram 8 ou mais.** Exemplos: a elevação lateral do Bruno, 20 sessões; o supino com halteres de até 10 kg do Bruno, 15; a adução na máquina da Carla, 21; o crucifixo invertido da Ana, 15. A panturrilha e a ponte com halter da Ana (31 e 16 sessões) são em parte artefato do modelo, que não soma o peso do corpo.
- Não importa o tamanho exato da mudança de repetições, que vem do modelo. O defeito lógico existe sem ele: quando o passo entre duas cargas possíveis muda R em mais de ~5 repetições, a regra não tem saída.

### 2.4 Nível, objetivo e troca de exercícios

**Reavaliação do nível** (`nivel.ts`, `exp2.ts`, E1). Ninguém pergunta. Aos ~6 meses, a regra do próprio app reclassificaria a pessoa. O que mudaria se a Ana, a Elisa e o Diego fossem gerados como intermediários:

| persona | RIR (compostos / isoladores) | metas dos focos | séries feitas por semana | exercícios |
|---|---|---|---|---|
| Ana | 2–3 / 1–2 → 1–2 / 0–1 | 8 → 12 | 46 → 47 (os 45 min limitam: quadríceps 6 → 8, posteriores 6 → 4, e 3 avisos novos de meta) | 2 entram, 1 sai |
| Diego | o mesmo | 8 → 12 | peito e costas 8 → 10 | 1 sai |
| Elisa | o mesmo | sem focos | quase igual | o nórdico entra |

O efeito principal é o RIR mais perto da falha, além de algumas séries a mais nos focos. Para o iniciante que escolheu "ficar mais forte", a mudança de nível é o que **liga** o objetivo: hoje ele nunca liga.

**Mudança de objetivo no meio do caminho** (`exp2.ts`, E2). O programa muda na semana 13 e o histórico continua. Contei a 1ª sugestão de cada vaga:
- **Hipertrofia → força.** Bruno: 7 "subir um degrau"; Carla: 9. Sobe 1 passo quando a faixa nova (5–8) pede ~15–20% a mais; leva algumas sessões, mas está na direção certa.
- **Força → hipertrofia.** Bruno: 6 "Duas sessões abaixo do mínimo da faixa: reduza um pouco a carga e reconstrua"; Carla: 3. **A mensagem engana.** A pessoa não falhou: foi a faixa que mudou. E −7,5% não basta para ir de 6 para 10–15 repetições, então vêm mais sessões abaixo da faixa.
- O histórico não sabe que a faixa mudou, porque as sessões não guardam a prescrição.

**Troca de exercício ao fim de um bloco** (`exp2.ts`, E3, e `exp3.ts`). Na semana 9, cada vaga passa a ser feita com a 1ª alternativa:

| persona | vagas com alternativa | séries de acerto nas semanas 9–16 | "estagnado" em 16 semanas |
|---|---|---|---|
| Ana | 14 de 19 | 2 de 332 → 33 de 332 | 39 → 29 |
| Bruno | 32 de 32 | 0 → 81 de 594 (14%) | 31 → 22 |
| Carla | 37 de 37 | 0 → 87 de 771 (11%) | 33 → 29 |
| Elisa | 1 de 11 | 0 → 8 | quase igual |

A semana leve **continua** sugerida nas mesmas semanas. Bruno, semana 10: "3 exercícios sem progresso em 3 treinos", contados nas vagas antigas, que ninguém faz mais. É que `semanaLeveDeHoje` lê a estagnação pelo exercício da vaga do programa, e não pelo exercício feito no lugar dele. O mesmo acontece hoje com quem troca pela alternativa no dia a dia.

**Cargas absurdas** (E4, 52 semanas). Nenhuma carga fora do inventário: as listas de halter, kettlebell e caneleira cortam no maior peso. A placa da torre, sem o número de placas informado, chega à 17 em 52 semanas (Carla, ritmo rápido). Como o app não sabe o tamanho da torre, não pode avisar. Não é absurdo, mas não tem limite.

### 2.5 O que a D precisa que o desenho da frente A respeite (`selecao.variacao`)

1. **A troca entra no programa, e não como alternativa do dia.** Com a alternativa do dia, a semana leve continua contando as vagas antigas (medido acima). Se a troca for gerada de novo no programa, a vaga passa a ter o exercício novo.
2. **Contar o custo da calibração.** Trocar todas as vagas põe 11% a 14% das séries das 8 semanas seguintes em "acerto" (Bruno e Carla). Esse número é do modelo; o fenômeno não é. Sugestão **[opinião]**: trocar só o que parou (estagnado, fim da escada, "sem carga maior"), ou no máximo metade das vagas por bloco. A variação não rendeu mais músculo que manter os exercícios (`kassiano2022`, moderada).
3. **O bloco conta semanas com treino**, como `semanaNoBloco`, e nunca começa durante a volta de uma pausa, a fase de aprendizado ou a semana leve.
4. **Sem conversão de carga** entre o exercício velho e o novo (`progressao.troca-equivalente`). O texto da 1ª vez já diz "Você já faz X; aqui é a 1ª vez".
5. **A troca é determinística**, pelo número do bloco e pela ordem da função, sem sorteio.
6. **O último degrau da escada é o gatilho natural da troca** para quem treina sem carga: no corpo livre, 4 a 7 exercícios chegam ao topo em 52 semanas.
7. **Uma regeneração só** quando a troca coincidir com a revisão do nível ou do objetivo.

## 3. O que a evidência diz

| pergunta | resposta | selo | fontes (PMID ou DOI, status) |
|---|---|---|---|
| Quanto se ganha de força depois do 1º ano? | Com dose mínima (1 vez por semana, 6 exercícios, 1 série até a falha), 14.690 pessoas ganharam ~30–50% de força no 1º ano e chegaram a ~50–60% em 6 anos. O ganho praticamente "estabiliza" em 1 a 2 anos. Em 1.896 atletas de powerlifting, os ganhos foram de ~20–25 kg por ano no agachamento, ~18–21 no terra e ~10–13 no supino, menores nos mais fortes. Ou seja: o progresso desacelera, e "estagnar" fica mais comum e mais normal com o tempo. | um estudo cada (observacionais e retrospectivos, sem grupo controle) | Steele 2023, 35591809 (resumo-PubMed, lido hoje); Latella 2020, 32865942 (resumo-PubMed, lido hoje); Latella 2022, 35019902 (resumo-PubMed, lido hoje) |
| Quanto se ganha de músculo depois do 1º ano? | **Não achei** estudo de longo prazo com hipertrofia em treinados. As fontes acima medem força. | — | buscas na seção "Como reproduzir" |
| Dupla progressão contra as outras formas | Subir repetições ou subir carga deu crescimento e força parecidos em 8 semanas. A carga ajustada pelo desempenho (autorregulada) e a carga fixa deram força parecida em treinados (6 estudos de carga); o efeito sobre a hipertrofia ficou sem resposta para a carga autorregulada. | um estudo (Plotkin); moderada (Hickmott, para força) | `plotkin2022` 36199287; Hickmott 2022, 35038063 (resumo-PubMed, lido hoje); `zhang2021` 33776802 |
| Periodizar ajuda a crescer? | Com o volume igualado, a periodização deu um pouco mais de força (ES 0,31) e **a mesma hipertrofia** (ES 0,13, IC −0,10 a 0,36; 35 estudos). Linear contra ondulatória: hipertrofia igual. O ACSM 2026 diz que a periodização não mudou os resultados de forma consistente. | moderada | `moesgaard2022` 35044672 (resumo-PubMed, relido hoje); `grgic2017b` 28848690; `acsm2026` 41843416 |
| Semana leve | Uma semana parada não mudou a hipertrofia em treinados e baixou um pouco a força. Semanas leves na 4ª e na 8ª semana não mudaram nem a espessura muscular nem as 10 repetições máximas em 19 iniciantes. Atletas fazem semana leve por cansaço, a cada ~5,6 semanas. | moderada ("não muda a hipertrofia"); consenso (quando fazer) | `coleman2024` 38274324; `pancar2026` 41730991 (**resumo-PubMed, lido hoje**: título e autores conferidos); `rogerson2024` 38499934; `bell2023` 37730925 |
| Variar os exercícios entre blocos | Variar não rendeu mais hipertrofia nem mais força que manter, desde que se variasse dentro do mesmo grupo muscular. Trocar o exercício também tem custo: a carga recomeça. | moderada | `kassiano2022` 35438660; `fonseca2014` 24832974 (frente A) |
| Mais perto da falha para quem já treina | A hipertrofia cresce conforme a série chega mais perto da falha, mas não é preciso ir até ela. Isso apoia o RIR menor do intermediário, que o app não liga para quem começou como iniciante. | moderada | `robinson2024`, `refalo2023`, `refalo2024` |
| Quando passar de iniciante a intermediário? | A classificação por tempo (~6 meses a 2 anos de treino contínuo) é prática de treinadores. Não há estudo que teste quando reclassificar. | consenso | `santosjunior2021`, `acsm2009` |
| O que mantém as pessoas treinando por meses? | Num app com 389.481 usuários, **10,1% dos iniciantes** ainda treinavam aos 12 meses (18,3% dos intermediários, 25,8% dos avançados). A mediana de abandono foi de 19 semanas. O maior previsor foi a regularidade nos primeiros 28 dias. Usar mais tipos de equipamento também se associou a menos abandono. | um estudo (observacional) | `conti2026` 42638731 (**resumo-PubMed, lido hoje**: título, autores e periódico conferidos) |
| Escolher o próprio treino ajuda? | Na extensora, escolher a carga, as repetições e o descanso deu mais prazer na sessão que a mesma sessão prescrita (27 pessoas, efeito agudo). Os autores supõem efeito na aderência, mas não o mediram. | um estudo | Barton 2025, 40505704 (resumo-PubMed, lido hoje) |
| Registro, meta e retorno | Ajudam a manter o hábito (já é o que "a sua semana" faz). | moderada | `michie2009`, `harkin2016`, `krukowski2024` |
| O que apps de mercado fazem | Apps de musculação costumam oferecer "programas" de 4 a 12 semanas com fim e troca, e semana leve fixa a cada N semanas. É prática descrita, não evidência. | [mercado] | — |

**Resposta curta.** O longo prazo pede menos "mais ciência" e mais "não atrapalhar":
- o progresso desacelera de qualquer jeito (um estudo);
- periodizar e variar não fazem crescer mais (moderada);
- a semana leve não faz crescer (moderada).

O que a evidência sustenta para meses é ter **gatilhos que só aparecem quando há sinal** e **continuidade**: reconhecer quando a pessoa mudou de nível e não perder o histórico quando o programa muda. Para manter as pessoas treinando, só há um estudo observacional, e ele aponta para os primeiros 28 dias, não para o 6º mês.

## 4. Valor para quem usa

| mudança | quem sente | quando |
|---|---|---|
| Calibração com saída | Quem tem halteres de 1 em 1 kg nos pesos baixos (Ana, Bruno), polia ou máquina em isolador (Carla) | **Semanas 1 a 8**: no 1º mês, já dentro do R3 |
| Semana leve com gatilho proporcional e "Agora não" que dura | Todas as personas; mais quem progride rápido (hoje recebe 3 a 4 sugestões sem precisar) e quem recusa (46 a 107 ofertas) | 1ª oferta entre as **semanas 2 e 12**, depois a cada ~4 a 5 semanas. Pode aparecer no R3 do Gustavo; **depende do export dele** |
| Sem "estagnado" nem semana leve na fase de aprendizado | Iniciantes (Elisa, Ana, Diego) | **Semanas 1 a 3** |
| "Estagnado" com uma saída concreta por vez | Quem progride devagar: corpo livre, elástico, halteres esparsos | Do 2º mês em diante |
| Estagnação pela vaga feita | Quem usa a alternativa no lugar do exercício do programa | A qualquer momento; hoje é raro |
| Recalibrar ao mudar a faixa (objetivo ou nível) | Intermediários e avançados que trocam de objetivo | Só quando a pessoa muda; não há dado de quantos mudam |
| Revisão do nível aos ~6 meses | Iniciantes que continuam: 10% deles aos 12 meses, pelo `conti2026` | **Mês 6** em diante; não aparece no R3 |
| Blocos com troca de exercícios | Quem treina há 2 meses ou mais e enjoou ou parou | **Mês 2 a 3** em diante; não aparece no R3 |

Honestamente, para 4 a 8 semanas, as questões de longo prazo de verdade (nível, objetivo, blocos) **não aparecem**. O que aparece nesse período são os 4 defeitos de calibre medidos (a calibração sem saída, a semana leve que volta, "Agora não" e a fase de aprendizado), e eles valem para todo mundo.

## 5. Opções

### Opção 1: quatro correções de calibre e a leitura do export (antes do fim do R3)

O que é:
- **(a) Calibração com saída** (`progressao.calibracao`, mudança de regra; consenso, `consenso-projeto`). Depois de 3 séries de acerto sem cair em A ± 2, a carga com R mais perto de A, ou a de baixo em caso de empate, vira a de trabalho. A dupla progressão começa dali.
- **(b) "Agora não" vale até um sinal novo**: mais exercícios estagnados que na recusa, ou 7 dias, em vez de "até o próximo treino".
- **(c) Carência na fase de aprendizado**: nem "estagnado" nem semana leve nas semanas da fase `iniciante.fase-aprendizado`.
- **(d) A semana leve conta a estagnação do exercício feito na vaga** (`noLugarDe`), e não a da vaga parada.
- **(e) Um script que lê um export** e imprime o que este relatório mediu: tipos de sugestão, "estagnado", semanas leves, calibrações longas. O Gustavo roda no aparelho dele, e nada do `privado/` entra no repositório. É a "medida no export" que o backlog pede para o achado 11 e o F.2.

| | |
|---|---|
| Esforço | ~1,5 dia: (a) 0,5, com teste novo em `calibracao.test.ts`; (b) a (d) 0,5, com os casos S1–S5 de `semana-leve.test.ts` revistos e casos novos; (e) 0,5 |
| Risco | Baixo. (a) muda a carga sugerida na tela de quem hoje fica preso; não toca no gerador nem nos snapshots dos programas. (b) pode precisar guardar o número de estagnados na hora da recusa. |
| Regra | `progressao.calibracao` (a saída) e `deload.semana-leve` (a carência na fase de aprendizado; a estagnação pela vaga feita; "Agora não") |
| Dado | Nenhum |
| Armazenamento | (b) com um número guardado: campo opcional `respostas.semanaLeveEstagnados`, versão 8 e migração trivial com teste. Sem ele, só a data (7 dias) e nenhuma migração. |
| Depende de | Nada; o (e) depende do Gustavo exportar |
| Choque | R3: (a), (c) e (d) corrigem defeitos e podem entrar durante o R3, avisando o Gustavo. (b) muda o que ele vê, então vale combinar antes. Redesign: nenhum; a "uma oferta por abertura" fica mais fácil de cumprir. |

### Opção 2: gatilhos pelo dado real, e mudança de nível e de objetivo sem tropeço (depois do R3)

O que é:
- **(a) Gatilho da semana leve proporcional**, por exemplo ≥ 40% dos exercícios com histórico estagnados, com mínimo de 2. É o número a fixar com o export. Medido: zera a sugestão para quem progride rápido e mantém 3 a 6 para quem estagna.
- **(b) "Estagnado"**: o limiar (3 ou 4 sessões) fixado com o export, e uma saída por vez, começando por "+1 repetição" e depois "−10% e reconstruir" com `proxima` concreta. Medido: o "estagnado" cai pela metade.
- **(c) Recalibrar a 1ª série quando a faixa da vaga muda** (objetivo, nível ou preferência), no lugar de "duas sessões abaixo do mínimo". A calibração por Brzycki já existe e serve na mesma máquina.
- **(d) Revisão do nível oferecida, nunca aplicada**: depois de ~26 semanas com treino desde o cadastro, com a própria `nivel.classificacao` ("Você treina há 6 meses. Quer passar para intermediário? Muda: RIR mais perto da falha e mais séries nos focos"). Uma regeneração só, que também liga o objetivo "ficar mais forte" do iniciante.

| | |
|---|---|
| Esforço | ~2,5 dias: (a) e (b) 1; (c) 0,5; (d) 1 |
| Risco | Médio. (b) e (c) mudam a carga sugerida. (d) muda o programa, mas só com o aceite, como a revisão da meta (`acompanhamento.mensagens`). |
| Regra | `deload.semana-leve`, `progressao.estagnacao`, `progressao.troca-equivalente` (o caso "faixa mudou"); regra nova `nivel.revisao` (consenso, `santosjunior2021`, `acsm2009`) |
| Dado | Nenhum |
| Armazenamento | (c) pede guardar a faixa prescrita na sessão (campo opcional `reps` em `ExercicioFeito`) ou um registro das mudanças de programa (`trocasDePrograma: [{ em, motivo }]`). (d) pede `respostas.revisaoNivelEm`. **Versão 8, migração com teste**: os campos nascem vazios, e as sessões antigas não ganham faixa inventada. |
| Depende de | Export do R3 para (a) e (b); opção 1 (e) |
| Choque | Redesign: a oferta de nível entra na fila "uma oferta por abertura"; a sugestão com uma saída por vez é tela. R3: depois dele. |

### Opção 3: blocos de treino com troca de exercícios (depois do R3, junto com a frente A)

O que é:
- A noção de **bloco** de 6 a 8 semanas com treino (`selecao.variacao`: "manter no bloco, 4–8 semanas").
- Ao fim do bloco, a oferta de "bloco novo": troca sistemática dentro da função, só nas vagas paradas.
- O histórico ligado por função na evolução ("bloco 1: rosca Scott → bloco 2: rosca inclinada").
- A carência e a contagem de estagnação recomeçam no bloco.

| | |
|---|---|
| Esforço | ~3 a 4 dias, com o desenho da A pronto |
| Risco | Médio a alto. Mexe na progressão, na evolução e no programa salvo. Põe 11% a 14% das séries em calibração depois de cada troca. **Não há evidência de mais músculo** (variação e periodização: moderada, sem diferença). O ganho esperado é de aderência e de não enjoar [opinião], o que só o uso real pode mostrar. |
| Regra | `selecao.variacao` (hoje sem código), uma regra nova `bloco.*` e `progressao.estagnacao` (zera no bloco) |
| Dado | Ordem de troca por função (`funcoes.json`) |
| Armazenamento | `blocos: [{ inicio, programaHash, motivo }]`. Versão 8 ou 9, com migração que deriva o 1º bloco do histórico, mais teste. |
| Depende de | Frente A (o desenho da troca) e a opção 2 (c) (recalibrar ao mudar) |
| Choque | Redesign: telas novas (oferta de bloco, evolução por função). R3: só depois. |

### Opção 4: não mexer agora; só medir

Só a opção 1 (e), em ~0,5 dia: o script de leitura do export. Os 4 defeitos medidos ficam para depois do R3.

| | |
|---|---|
| Risco | O Gustavo pode passar o R3 com a oferta da semana leve repetida e calibrações que não acabam, e anotar isso como "incômodo" sem que se saiba a causa. |

## 6. Recomendação

**Opção 1 agora, a opção 2 depois do R3 e a opção 3 só se o R3 pedir.**

O porquê:
1. Os 4 defeitos da opção 1 **não dependem do modelo**. Uma calibração sem saída, uma oferta que volta a cada treino, uma semana leve na 2ª semana de um iniciante e a estagnação contada numa vaga que ninguém faz são falhas de lógica, que o simulador só tornou visíveis. Elas aparecem no 1º e no 2º mês, dentro do R3.
2. Os **números dos gatilhos** (3 ou 4 sessões; 2 exercícios ou uma proporção) dependem do ritmo real de progresso, e é aí que o modelo é fraco: o "estagnado" vai de 2% a 45% conforme o ruído e o ritmo. O backlog já decidiu medir no export. A opção 1 (e) entrega a ferramenta para isso.
3. Nível e objetivo (opção 2) só aparecem no mês 6 ou quando a pessoa muda de objetivo, e o export do R3 terá no máximo 4 semanas. Não há pressa. Mas a recalibração ao mudar a faixa (2c) é barata e evita uma mensagem que engana; se o Gustavo pensa em trocar de objetivo durante o R3, vale adiantá-la.
4. Blocos (opção 3) **não têm evidência de mais músculo** e têm um custo medido (calibração). Só vale se o uso real mostrar platô ou tédio, e o desenho da troca é da frente A.

---

## Pedidos à sessão de design

Só tela. O motivo vem medido.

1. **Semana leve recusada.** Como mostrar que a sugestão continua de pé sem repetir o cartão a cada treino. Hoje volta 46 a 107 vezes em 24 semanas para quem recusa (seção 2.1). Ideia: depois de "Agora não", ela vira uma linha discreta em "A sua semana", e não um cartão no início.
2. **"Estagnado" com uma saída por vez** (F.2). Hoje é 1 frase com 4 saídas. Uma ação principal, por exemplo "Mais 1 repetição na próxima" e depois "Tirar 10% e reconstruir", com "Outras opções" recolhidas. Aparece em 2% a 45% das sugestões.
3. **Fim da calibração** (se a opção 1 (a) entrar). Uma frase curta quando o app decide "fica com esta carga". Hoje a tela diz "Ainda calibrando" por até 31 sessões (seção 2.3).
4. **Oferta de revisão do nível** (opção 2 (d)). Um cartão com o que muda em 2 linhas (RIR e séries dos focos), dentro da regra "uma oferta por abertura" do redesign.
5. **Mudança de objetivo** (opção 2 (c)). Um aviso de "estas N vagas mudam de faixa; a 1ª série acerta a carga". Bruno: 8 de 32 vagas; Carla: 10 de 37.
6. **Evolução entre blocos** (opção 3): a linha da função ligando o exercício velho e o novo, sem converter carga.

## Pedidos ao domínio

- **D1** (`progressao/calibracao.ts` e `sessao/index.ts`): uma saída da calibração depois de N séries de acerto sem cair em A ± 2, com teste do caso "4 kg dá R = 24, 5 kg dá R = 12".
- **D2** (`acompanhamento/semana-leve.ts`): contar a estagnação pelo exercício feito na vaga (`noLugarDe`), com teste.
- **D3** (`semanaLeveDeHoje` e `sugestaoDoExercicio`): carência na fase de aprendizado do iniciante.
- **D4** (`features/acompanhamento/acoes.ts`): "Agora não" até um sinal novo.
- **D5** (depois do R3): gatilho proporcional da semana leve e limiar do "estagnado", com o número do export; o "estagnado" com `proxima` concreta na 2ª saída.
- **D6** (depois do R3): função pura de revisão do nível, que só oferece, e a recalibração quando a faixa da vaga muda.

## Fontes novas (para conferência)

| fonte | título | periódico | PMID / DOI | status |
|---|---|---|---|---|
| Steele J, Fisher JP, Giessing J, Androulakis-Korakakis P, Wolf M, Kroeske B, Reuters R (2023) | Long-Term Time-Course of Strength Adaptation to Minimal Dose Resistance Training Through Retrospective Longitudinal Growth Modeling | Res Q Exerc Sport 94(4):913–930 | 35591809 / 10.1080/02701367.2022.2070592 | resumo lido no PubMed |
| Latella C, Teo WP, Spathis J, van den Hoek D (2020) | Long-Term Strength Adaptation: A 15-Year Analysis of Powerlifting Athletes | J Strength Cond Res 34(9):2412–2418 | 32865942 / 10.1519/JSC.0000000000003657 (PMC7448836, não lido) | resumo lido no PubMed |
| Latella C, Owen PJ, Davies T, Spathis J, Mallard A, van den Hoek D (2022) | Long-Term Adaptations in the Squat, Bench Press, and Deadlift: Assessing Strength Gain in Powerlifting Athletes | Med Sci Sports Exerc 54(5):841–850 | 35019902 / 10.1249/MSS.0000000000002858 | resumo lido no PubMed |
| Hickmott LM, Chilibeck PD, Shaw KA, Butcher SJ (2022) | The Effect of Load and Volume Autoregulation on Muscular Strength and Hypertrophy: A Systematic Review and Meta-Analysis | Sports Med Open 8(1):9 | 35038063 / 10.1186/s40798-021-00404-9 (PMC8762534, não lido) | resumo lido no PubMed |
| Barton NV, Gordy LP, Francois IJ, Russell BL, Benns MA, Dankel SJ (2025) | Affective responses to identical resistance exercises that are prescribed and self-selected | Psychol Sport Exerc 80:102912 | 40505704 / 10.1016/j.psychsport.2025.102912 | resumo lido no PubMed |

**Status a atualizar em `fontes.md`** (hoje marcadas "título e autores não conferidos"):
- `conti2026`: Conti F, Marzagão T, Galpin AJ, Schoenfeld BJ (2026). *Predictors of long-term resistance exercise adherence: evidence from a large cohort of mobile app users of various experience levels.* Front Sports Act Living 8:1855668. PMID 42638731, DOI 10.3389/fspor.2026.1855668. Resumo lido no PubMed.
- `pancar2026`: Pancar Z, Ilhan MT, Darendeli MK, Karaca B, et al. (2026). *Effects of deload periods in resistance training on muscle hypertrophy and strength endurance in untrained young men using a randomized within subject design.* Sci Rep 16(1):10299. PMID 41730991, DOI 10.1038/s41598-026-40612-5. Resumo lido no PubMed.

**Não achei** (PubMed): estudo de longo prazo (mais de 1 ano) com **hipertrofia** em treinados; estudo que teste quando reclassificar o nível; estudo que compare gatilhos de semana leve; estudo de aderência a longo prazo especificamente sobre blocos ou variação.

## Como reproduzir

Os scripts ficam em `/tmp/claude-0/-home-user-treino-mvp/4613f7ac-a8aa-59f1-871a-0fe029cac2fa/scratchpad/frente-d/` e serão descartados. Todos rodam com `cd /home/user/treino-mvp && npx vite-node --root / <caminho-absoluto>`; os que importam o `sim.ts` precisam de `SEM_MAIN=1`. O `--root /` é necessário porque o Vite não serve arquivos fora do projeto sem ele.

- `sim.ts`: o praticante simulado (descrito na seção 2) sobre o código real. Roda 4 personas × 14 cenários, mais 6 variantes do "estagnado", por 24 semanas. Grava `sim.json` e imprime uma linha por simulação. `-- --rastro=persona:cenario` imprime cada sugestão.
- `tabela-sim.md`: a tabela completa da seção 2.1, gerada a partir do `sim.json`.
- `trace-cal.ts`: as séries de um exercício (elevação lateral da Ana), para ver a calibração ir e voltar.
- `trace-cal2.ts` e `cal-resumo.ts`: quantas sessões seguidas cada exercício passa só em séries de acerto (62 de 492; 26 com 8 ou mais).
- `exp2.ts`: E1, o programa como iniciante e como intermediário; E2, a 1ª sugestão depois de mudar o objetivo na semana 13; E3, a troca pela alternativa na semana 9; E4, 52 semanas (topo da escada, placa máxima, semanas leves).
- `exp3.ts`: os motivos da semana leve depois da troca (a estagnação contada nas vagas antigas).
- `frac.ts`: o gatilho proporcional da semana leve (25% e 40%) contra o de hoje.
- `recon.ts`: o "estagnado" com −10% concreto contra o de hoje.
- `nivel.ts`: o volume por músculo do mesmo perfil como iniciante e como intermediário, e `classificarNivel` com 6 a 24 meses.
- `pm.sh`: busca no PubMed (esearch + esummary). Os resumos foram lidos com `efetch ... rettype=abstract`.
- Buscas feitas (PubMed, 06/11/2026): `long-term strength development resistance trained meta-analysis time course`; `Steele minimal dose strength time-course longitudinal growth modeling`; `powerlifting strength progression long-term years athletes analysis`; `Latella long-term strength adaptation powerlifting`; `strength gains resistance-trained individuals magnitude meta-analysis training status`; `autoregulation repetitions in reserve hypertrophy randomized trained`; `autoregulated resistance training hypertrophy systematic review meta-analysis`; `periodized versus non-periodized resistance training hypertrophy meta-analysis`; `periodization hypertrophy systematic review`; `deload resistance training trained randomized strength hypertrophy`; `resistance training adherence dropout long-term predictors systematic review`; `adherence resistance training intervention systematic review`; `enjoyment affective response resistance training adherence`; `training status muscle hypertrophy trained untrained comparison meta-analysis`; `rate of muscle hypertrophy trained individuals weeks percent per week`; `plateau resistance training progression strategies trained`.
- Lidos, não rodados: `docs/revisoes/auditoria/progressao.md`, `docs/revisoes/equipamento-minimo/progressao.md`, `docs/revisoes/auditoria-treino.md` (achado 11), `docs/revisoes/auditoria-fable.md` (F.2). Este relatório não rodou `npm run auditoria`.

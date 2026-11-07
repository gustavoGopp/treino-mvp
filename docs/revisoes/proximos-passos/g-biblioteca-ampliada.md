# Frente G: biblioteca ampliada e treinos que agradam (rodada 2, 06/11/2026)

**Em uma olhada.** O Gustavo pediu uma pesquisa ampla (internet, YouTube, fontes confiáveis) para criar mais opções de exercício, de modo que toda combinação de equipamento, nível, dias, minutos e foco tenha volume suficiente e saia agradável, eficiente e dentro do esperado para cada pessoa. Cinco frentes pesquisaram em paralelo (`docs/pesquisa-v2/17-biblioteca-ampliada.md`); uma delas (G5) montou a **régua** dos testes, em dois níveis: **defeitos** (o programa não deveria sair assim; nenhum pode piorar) e **notas** (consenso e gosto; uma mudança é melhor se melhora alguma sem piorar defeito). Num protótipo descartável com **32 exercícios novos** (de 139 para 171) e duas proteções na geração, a grade de 108.900 programas passa de **73,4% para 83,8% dos programas sem dor sem nenhum defeito**, **nenhum defeito piora**, e todas as notas melhoram, **menos os cartões de texto** (exercício sem animação), que sobem de 8,4% para 74,9% dos programas com um dia de 3 ou mais cartões: a saída é animar primeiro 5 exercícios novos de corpo livre. **Duas revisões cegas** por treinadores independentes (que não sabiam qual semana era de qual versão) acharam a versão final melhor em 12 das 18 personas; na 2ª revisão, depois do ajuste que a 1ª pediu, **nenhuma piorou**. As costas continuam sem saída honesta sem algo para puxar, e o que os treinadores mais criticaram nas duas versões (o foco que muda pouco a distribuição) é regra do gerador, não biblioteca.

## 1. Como foi feito

- **A régua** (frente G5, `17`, parte G5, tabela 4.7), medida por script em cada programa. **Defeitos:** A2 dia com menos de 3 exercícios ou sem multiarticular; A3 dia mais longo acima de 110% dos minutos; A4 dia típico abaixo de 70% dos minutos sem o aviso; B1 o mesmo exercício em todos os dias (3 ou mais) havendo outro equivalente do mesmo nível; C1 prioritário abaixo da meta com tempo sobrando (sem dor); D1 empurrar ÷ puxar acima de 1,5 quando há remada ou puxada possível; D3 quadríceps ÷ posteriores fora de 0,5–2, ou sem exercício direto de posteriores, quando os dois são possíveis; E1 músculo não prioritário com 1 a 3 séries havendo exercício e tempo; e os achados de segurança do avaliador (protótipo da frente B). **Notas:** A1 exercícios por dia fora da faixa (30 min: 3–5; 45: 4–7; 60: 5–8; 75 e 90: 5–10; consenso); A5 dia mais curto abaixo de 60% do mais longo; B2 o mesmo exercício em todos os dias sem opção do mesmo nível; B3 dois exercícios ou mais em todos os dias; C2 o foco não passa da mediana dos outros músculos; G1 dia com 3 ou mais cartões de texto. Selo e fonte de cada limite em `17`, G5, 4.7.
- **A grade:** os 55 cenários de equipamento de `scripts/auditoria/cenarios-55.ts` × 3 níveis × 2 a 6 dias (a divisão recomendada) × 30, 45, 60 e 90 min × 11 focos (nenhum, cada grupo, superiores, inferiores, peito+costas) × 3 situações de dor (nenhuma, ombro 7, joelho 7) = **108.900 programas**, 36.300 sem dor. Roda em ~2 min.
- **As personas:** as 6 de `tests/personas/` e 12 novas, fictícias, de perfis típicos (iniciante sem nada; intermediário sem nada com foco nos superiores, o caso do Gustavo; intermediária com elásticos e foco em glúteo; avançado com barra de porta; halteres leves com 30 min; kettlebell; fita de suspensão; mini-band e step; e outros).
- **As versões medidas,** cada uma numa cópia de `src/domain/` no rascunho (a cópia sem mudança dá o mesmo resultado que o repositório; a cópia do gerador da frente A sem nenhuma chave ligada, idem, nos 108.900 programas):

| Versão | O que muda | Sem defeito (sem dor) | Algum defeito pior que hoje? |
|---|---|---:|---|
| hoje (`main`) | — | 73,4% | — |
| biblioteca toda | 7 de corpo livre (`16`) + 20 da rodada 2 + 7 de equipamento de um item só | 78,3% | sim: tempo, sem multiarticular, coxa |
| + "animado primeiro" | o desempate prefere o exercício animado à variedade | 52,6% | **sim: repete havendo opção, 0,3% → 29,5%** (descartada) |
| + o pacote A do R5a | o ajuste de 30 min e "descer um nível antes de repetir" (frente A) | 81,1% | sim: coxa |
| + proteções da coxa, − crucifixo no chão | as decisões 7 e 9 abaixo | 82,9% | não |
| − rosca sem carga e abertura em T | o pedido da 1ª revisão cega | 78,3% | sim: empurra demais, 0,9% → 1,6% |
| **final: − só a rosca sem carga** | a decisão 11 abaixo | **83,8%** | **não** |

## 2. As decisões técnicas tomadas pela sessão (o Gustavo pediu para não decidir as questões técnicas)

Cada uma com o motivo; todas medidas na grade.

1. **Variações equivalentes passam a entrar, mesmo sem abrir vaga nova** (antes, `11-catalogo-completo.md` recusava o que "só duplica"). Motivo novo: o pedido de variedade do Gustavo, e a evidência de que variar melhora o prazer e a motivação sem mudar a hipertrofia (moderada, `bazvalle2019`, `kassiano2022`).
2. **Flexão com os pés elevados com complexidade 3:** o iniciante chega a ela pela escada da flexão, não no 1º programa (carga maior que a da flexão comum; `16`, pesquisador 1).
3. **Panturrilha no degrau vale como "apoio"** (um degrau ou soleira, ou o chão, como diz o cartão), sem item novo no cadastro nem migração.
4. **Barra fixa só na descida** no fim de `puxar-vertical`: entra como 2ª puxada de quem tem só a barra e como alternativa de quem ainda não faz a barra (para o iniciante, falta a regressão; seção 5).
5. **Elevação lateral deitado de lado num nível próprio,** depois da elevação com halteres: alternativa, sem pôr mais um cartão nos dias da academia (87% dos programas da academia já têm um dia com 3 ou mais).
6. **Lote 3 (um equipamento só: caneleiras, mini-band, kettlebell, suspensão)** entra junto: custa pouco e fecha vagas dos itens sozinhos.
7. **Ficam de fora:** a elevação lateral apoiada na parede sem carga (nenhum dado no deltoide; a recusa de `16` continua); o crucifixo no chão com halteres (recusa antiga reaberta pela frente G3; medido: tirava os multiarticulares do dia de empurrar do iniciante com 30 min); a panturrilha com halter numa perna para quem só tem halteres (a mudança de `requer` da G3 alongava o dia, e o corte tirava séries de quadríceps).
8. **"Animado primeiro" descartado:** resolveria os cartões trocando um defeito com evidência (repetir havendo opção) por uma nota de opinião.
9. **Duas proteções do equilíbrio da coxa** (0,5–2 de quadríceps ÷ posteriores, consenso, `green2018`): no ajuste de 30 min da frente A, que trocava o único exercício direto de posteriores por outro isolador; e no corte de tempo (`cortarTempo`, `cabe`), que cortava séries de posteriores quando os exercícios novos de superiores ocupavam o dia. O defeito da coxa sai de 1,6% (hoje) para 0%.
10. **A abertura em T deitado fica**, apesar da crítica da 1ª revisão cega ("série cheia com pouco estímulo"): sem ela, nos cenários com pouco para puxar, os exercícios novos de empurrar passam do limite de empurrar ÷ puxar (D1 vai de 0,9% para 1,6%, pior que hoje). É fraca, mas é a única coisa que equilibra o ombro nesses cenários (consenso, `kolber2010`).
11. **A rosca sem carga sai da seleção automática.** Ela já dependia da leitura do texto completo de `counts2016` (um estudo, 13 pessoas); a 1ª revisão cega a apontou como o defeito mais frequente (ocupa o tempo do foco com pouco estímulo para quem não é iniciante, consenso de treinadores), e sem ela a grade melhora (82,9% → 83,8% sem defeito). Fica registrada em `16` e `17` como candidata, se o texto completo sustentar.

## 3. O resultado, medido

**Grade de 108.900 programas, os 36.300 sem dor:**

| Medida | Tipo | Hoje | Final |
|---|---|---:|---:|
| Programas sem nenhum defeito | — | 73,4% | **83,8%** |
| A2 dia com menos de 3 exercícios ou sem multiarticular | defeito | 7,5% | 1,5% |
| A2 (só "sem multiarticular") | defeito | 1,5% | 1,5% |
| A3 dia acima de 110% dos minutos | defeito | 9,8% | 7,3% |
| A4 dia típico abaixo de 70% sem aviso | defeito | 5,3% | 5,1% |
| B1 repete havendo outro do mesmo nível | defeito | 0,3% | 0,3% |
| C1 foco abaixo da meta com tempo | defeito | 4,1% | 2,1% |
| D1 empurra demais | defeito | 0,9% | 0,9% |
| D3 coxa desequilibrada | defeito | 1,6% | **0%** |
| A1 exercícios por dia fora da faixa | nota | 24,1% | 10,2% |
| A5 dias muito desiguais | nota | 22,5% | 12,9% |
| B2 repete sem alternativa | nota | 44,1% | 15,6% |
| B3 dois exercícios em todos os dias | nota | 14,4% | 8,3% |
| C2 foco que não aparece | nota | 33,0% | 29,0% |
| G1 dia com 3 ou mais cartões de texto | nota | **8,4%** | **74,9%** |
| Exercícios por dia (média) | — | 5,18 | 5,51 |
| Exercícios diferentes por semana | — | 12,9 | 15,8 |
| Prescrições sem nenhuma alternativa | — | 54,3% | 28,4% |
| Funções com 0 opção, somando os 55 cenários / com 1 | — | 348 / 509 | 277 / 356 |

**Por grupo de cenário** (sem dor):

| Grupo | Cenários | Sem defeito | Exercícios por dia | Diferentes por semana | 3+ cartões |
|---|---:|---|---|---|---|
| atalhos (casa, condomínio, academia, com e sem +) | 6 | 57,6% → 64,1% | 6,06 → 6,06 | 20,2 → 21,6 | 46,5% → 71,4% |
| personas (Ana, Bruno, Carla, Diego, ...) | 6 | 59,2% → 64,7% | 5,93 → 5,96 | 17,9 → 20,4 | 19,3% → 64,1% |
| sem nada | 1 | 89,8% → 94,1% | 4,91 → **5,38** | 9,5 → **12,9** | 0% → 82,0% |
| um item só | 38 | 79,0% → 91,6% | 4,86 → **5,32** | 10,7 → **13,9** | 1,1% → 78,8% |
| pares de casa | 4 | 60,8% → 65,8% | 5,85 → 5,87 | 16,5 → 19,4 | 6,6% → 57,7% |

Casa, elásticos e só halteres: o mesmo exercício em todos os dias sem alternativa vai de 20% a **0%**; sem nada, de 80% a 26,7%. Academia: quase nada muda (já tinha tudo).

**O caso do Gustavo** (intermediário, sem nada, 60 min, foco nos superiores):
- 3 dias, hoje: 5, 6 e 6 exercícios, 46 a 56 min; ombro de trás 0. **Final:** 6, 7 e 6 exercícios, 52 a 59 min. Corpo todo A: flexão, flexão com os pés elevados, agachamento, extensão de tríceps, flexão de joelho deslizante, abdominal. Corpo todo B: flexão com os pés elevados, pike, búlgaro, nórdico, panturrilha no degrau, abertura em T, abdominal invertido. Ombro de trás 4; peito 12; tríceps 12,5.
- 4 dias, hoje: 5 a 6 exercícios, 36 a 52 min. **Final:** 6 exercícios em todos os dias, 47 a 50 min; ombro de trás 8.
- **Costas e bíceps: 0 nas duas versões, com o aviso.** E as pernas, que não são foco, continuam com 11 a 12 séries cada: o tempo que sobra vai para elas (`tempo.sobra-series`). Isso é regra, não biblioteca (seção 5).

**As 18 personas** (exercícios por dia; minutos; exercícios diferentes na semana):
- Fábio (só barra fixa): 4, 6, 4, 6 (33 a 45 min) → 5, 6, 5, 6 (44 a 45 min); diferentes 13 → 17.
- Avançado sem nada, 5 dias: 4, 4, 6, 5, 4 (26 a 55 min) → 5, 5, 6, 6, 5 (38 a 50 min); 10 → 14.
- Elisa (sem nada, 30 min): 4, 4, 3 → 4, 4, 4; 7 → 9.
- Barra de porta 19 → 24; elásticos com foco nos superiores 15 → 18; mini-band e step 12 → 16; kettlebell 12 → 15.
- Bruno, Carla, Diego, Ana: quase iguais (1 a 2 exercícios diferentes a mais).
- **Ganham um defeito**, apesar da melhora no agregado: a intermediária com elásticos e foco em glúteo (um dia de 50 min em 45, A3) e a intermediária com halteres e banco e foco em peito e ombros (empurra 1,5 vez o que puxa, D1). **Perdem um defeito:** halteres leves com 30 min e fita de suspensão com 30 min (deixam de passar do tempo). A Ana continua com o B1 que já tinha.

## 4. A fila de animação (o custo dos cartões)

Programas sem dor em que cada exercício novo aparece (de 36.300):

| Exercício | Programas | % |
|---|---:|---:|
| Panturrilha no degrau | 29.700 | 81,8% |
| Abdominal invertido | 22.410 | 61,7% |
| Extensão de tríceps com o peso do corpo | 21.571 | 59,4% |
| Abertura em T deitado | 20.366 | 56,1% |
| Flexão com os pés elevados | 19.533 | 53,8% |
| Elevação lateral unilateral com halter | 5.935 | 16,3% |
| Afundo para trás sem peso | 3.701 | 10,2% |
| Crucifixo invertido sentado | 3.021 | 8,3% |
| Tríceps testa com halteres | 2.983 | 8,2% |
| Os outros 23 | menos de 7% cada | |

Os 5 primeiros são de corpo livre e valem em todo cenário (pedem só apoio): eles respondem pela maior parte dos cartões. **Animá-los primeiro** (as animações da panturrilha, da flexão e do abdominal já existem e servem de base, `16`) devolve o guia animado à maioria dos programas sem tirar a variedade. **Medido** (07/11, na cópia final com os 5 marcados como animados): os programas sem dor com um dia de 3 ou mais cartões caem de 74,9% para **19,5%** (hoje são 8,4%), e no corpo livre para 0%; nenhum defeito muda.

## 5. O que fica, e o que não se resolve com exercício

- **Costas sem algo para puxar:** nenhum programa de treinador, nenhum vídeo com credencial e nenhum estudo dá uma saída honesta (G1, G2, G4; `16`). Continua o aviso.
- **As vagas que dependem de equipamento** (puxar sem ancoragem, extensora sem carga, ombro lateral sem peso, panturrilha sentada): 52 nos 10 equipamentos mínimos (G3).
- **O que as duas revisões cegas mais criticaram, nas duas versões, é regra do gerador:**
  1. **O foco muda pouco a distribuição:** o prioritário recebe quase o mesmo volume que o resto, e o app diz que "não cabe" enquanto gasta séries em abdominal, elevação lateral ou braço. É a frente A (o 2º exercício do prioritário; a "prioridade puxa frequência") e a pergunta da G5 sobre a meta do iniciante. Na régua: C2, 29,0%.
  2. **O nível pesa pouco no corpo livre:** o avançado sem nada recebe os mesmos exercícios do iniciante (a progressão está nas escadas, que andam com o uso, e não no 1º programa). Ideia: o 1º degrau da escada pelo nível.
  3. **O iniciante com barra fixa recebe a barra sem a versão assistida:** a negativa existe agora, mas entra depois da barra; falta a regressão pelo nível (G1 e G4: quem não faz 1 repetição).
  4. **Avisos que se contradizem:** "sem algo para puxar: ... ombro de trás fica sem exercício" aparece com a abertura em T no programa; "costas só com remadas" aparece com puxada de elástico.
  5. **O tempo mal distribuído:** dias que sobram 10 a 25 min e dias que passam do tempo (A5, 12,9%; A3, 7,3%).
  6. **O equipamento às vezes subaproveitado** (academia sem hip thrust nem leg press; step sem subida; fita só para remada): é a ordem dos níveis em `funcoes.json` (frente A, B.9 e afins).

## 6. As revisões cegas por treinadores independentes

**Como:** um subagente no papel de treinador de força e hipertrofia recebeu 36 semanas (as 18 personas, hoje e com a versão nova, embaralhadas com rótulos S01 a S36) e um briefing com 3 notas de 1 a 10 (eficiente, agradável, adequada à pessoa), o principal problema e o que mudaria. Ele só podia abrir as duas páginas; não sabia como o app é feito nem o que mudou. A chave ficou com o orquestrador. Duas rodadas, com revisores diferentes. É [opinião] de treinador simulado, não evidência: serve para achar o que a régua não mede.

| | Revisão 1 (hoje × biblioteca com a rosca sem carga) | Revisão 2 (hoje × final) |
|---|---|---|
| Eficiente (média) | 5,28 → 5,11 | 5,78 → 5,83 |
| Agradável | 5,11 → **5,89** | 5,28 → **6,17** |
| Adequada à pessoa | 5,50 → 5,56 | 5,72 → 6,00 |
| Personas melhores / piores / iguais | 12 / **4** / 2 | 12 / **0** / 6 |

- **Revisão 1:** as 4 que pioraram (a iniciante sem nada, a de mini-band, a de foco em glúteo sem nada e a Elisa) tinham a mesma causa: a rosca sem carga e a abertura em T ocupando o tempo do foco e, em 2 casos, um dia sem quadríceps nem glúteo. Daí as decisões 10 e 11.
- **Revisão 2:** nenhuma piorou; as que mais subiram foram as de pouco equipamento (Fábio, o caso do Gustavo, a fita de suspensão, o avançado sem nada). As críticas que sobraram são as da seção 5.
- As duas revisões dão notas diferentes para as mesmas semanas de hoje: cada revisor tem a sua régua; o que vale é a comparação dentro de cada revisão.

## 7. Opções

| Opção | O que entra | Esforço | Risco | Estado guardado | Choque |
|---|---|---|---|---|---|
| **1. Biblioteca ampliada (a versão final) + as proteções** | os 32 exercícios com cartão textual, nos níveis da seção 2; as 2 proteções da coxa; com o pacote A do R5a | ~5 a 6 dias (dado, cartões, regras, testes, a régua na auditoria) | médio: muda os snapshots de todas as personas que treinam fora da academia | nada | as telas dos cartões são do design |
| 2. Só corpo livre (o R5-CL anterior, `f-corpo-livre.md`) | os 7 de `16` | ~4 dias | médio | a rosca sem carga pedia a carga `sem-carga` | idem |
| 3. Biblioteca sem o lote 3 | 25 exercícios | ~4,5 dias | médio | nada | idem |
| + **Animação dos 5 de corpo livre** (em qualquer opção) | as 5 animações mais prescritas, a partir das que existem | sessão de animação, com regressão visual | o de toda animação nova | nada | é da fila do R5 de animação |
| + **As regras da seção 5** (foco, nível no 1º degrau, regressão da barra, avisos) | regras do gerador | um marco próprio (frente A, pacote B, e o que a seção 5 lista) | médio | nada | — |

## 8. Recomendação

**Opção 1, com a animação dos 5 exercícios de corpo livre logo em seguida, e as regras da seção 5 no marco seguinte.** É a que cobre o pedido do Gustavo ("todas as combinações"): o corpo livre e os itens sozinhos são os que mais ganham (exercícios por dia de 4,9 para 5,3 a 5,4; exercícios diferentes por semana de 10 a 11 para 13 a 14; 91,6% dos programas de item sozinho sem defeito, eram 79%), sem piorar nenhum defeito, e a academia fica como está. Os dois treinadores independentes acharam a versão final melhor ou igual em todas as 18 personas. O custo dos cartões é conhecido e se paga com 5 animações. O que os treinadores ainda criticam (o foco) não se resolve com mais exercício: é a próxima regra a mexer.

## Pedidos à sessão de design

1. **Os 32 cartões textuais**, com a montagem segura de cada um (corpo livre em `16`; equipamento em `17`, G3 e G4). Motivo: 74,9% dos programas terão um dia com 3 ou mais cartões até as animações chegarem.
2. **A fila de animação** da seção 4, começando pelos 5 de corpo livre.
3. **O aviso das costas** com o texto novo (o mesmo pedido de `f-corpo-livre.md`), e os avisos que se contradizem (seção 5, item 4).
4. **Referências visuais** para os cartões: os vídeos de canais com credencial listados em `17`, G2, seção 6 (para o autor do cartão; o app não usa vídeo).

## Pedidos ao domínio

1. Os 32 exercícios em `exercicios.json` e `funcoes.json`, nos níveis da seção 2 e de `17` (G3, "Onde cada um entra"), com as regras em `regras.md`.
2. **A proteção da coxa no corte de tempo** (`cortarTempo`, `cabe`) e no ajuste de 30 min do R5a: nenhum corte tira quadríceps ÷ posteriores de 0,5–2, salvo se já estava fora. Teste: 0 programa com D3 na grade.
3. **A régua da G5 em `scripts/auditoria/qualidade.ts`** (os defeitos e as notas da seção 1), com "nenhum defeito piora" como teste da auditoria.
4. Os casos de persona da seção 3 (A3 da intermediária com elásticos, D1 da intermediária com peito e ombros, B1 da Ana) como testes do marco.
5. **Os avisos de lacuna pelo que o programa tem de fato** (`equipamento.sem-ancoragem` e afins): não dizer que o ombro de trás fica sem exercício quando a abertura em T está no programa.
6. A ancoragem do elástico (G3: não existe capacidade; hoje o cartão diz onde prender) e o aviso de segurança do elástico com a fonte nova (`ng2022`, série de casos de lesão de olho; G4).
7. Para o marco seguinte: o foco que muda a distribuição, o 1º degrau da escada pelo nível e a regressão da barra fixa (seção 5).

## Como reproduzir

Os scripts ficaram no rascunho da sessão e foram descartados depois dos números. O que cada um mediu:
- `banco.ts` + `regua.ts`: a grade de 108.900 programas, a régua da G5 (defeitos e notas), as opções por função em cada cenário, as 18 personas e a contagem de cada exercício novo; lê o domínio por um caminho (a `main` ou uma cópia).
- `montar2.cjs`: copia `src/domain/` e acrescenta os exercícios da rodada 1, da rodada 2 e do lote 3; `tirar.cjs` tira exercícios.
- `diff-def.ts`: acha os perfis em que um defeito aparece numa versão e não na outra, com os exercícios que entraram.
- As proteções da coxa foram escritas na cópia do gerador da frente A, com as chaves `f9`, `f9-30` e `m1` ligadas.
- `cega/preparar.cjs`: embaralha as 36 semanas de forma determinística e guarda a chave à parte.

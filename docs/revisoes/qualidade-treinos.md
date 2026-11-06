# Qualidade dos treinos gerados: estresse ampliado, pesquisa e decisões (sessão de 05 e 06/11/2026)

> Branch `claude/treino-generator-quality-isnutx`, a partir da `main` 849ea45. Dados fictícios: a grade usa os 55 cenários de equipamento de `docs/revisoes/catalogo/cenarios.md` e as 6 personas de `tests/personas/`. Nada de `privado/`.
>
> **Como ler.** A Parte A mede (a grade de 911.625 programas e o caso que motivou a sessão). As Partes B, C e D trazem o que a evidência diz (por músculo, por dia de treino e sobre a prioridade) e o que muda em relação ao app. A Parte E junta tudo em opções para o Gustavo decidir, uma de cada vez, com a recomendação marcada e o efeito medido. Nenhuma regra do gerador muda antes do "aprovar". Termo técnico, quando aparece, vem explicado na mesma frase.

## O que motivou

Em 05/11/2026 o Gustavo marcou opções aleatórias no cadastro, escolheu 60 minutos e nenhum equipamento, e recebeu um treino de 3 exercícios. Pelo que ele conhece, um treino tem em média 5 a 7 exercícios. A pergunta vale para o app inteiro: o gerador está certo? Quando está errado? O que mudar?

## Em uma olhada

(preenchido no fim da sessão, depois das decisões)

---

## Parte A. O estresse ampliado

### A.1 A grade

O estresse de hoje (`npm run auditoria:estresse`, 149.760 programas) usa 13 cenários de equipamento e 5 combinações de prioridade. A sessão acrescentou um segundo estresse, `npm run auditoria:qualidade` (`scripts/auditoria/qualidade.ts`), que estende o primeiro em vez de duplicá-lo: os 55 cenários saíram do script do catálogo para um módulo próprio (`scripts/auditoria/cenarios-55.ts`), e a grade de `scripts/auditoria/cenarios.ts` passou a aceitar cada dimensão como opção (os três estresses antigos continuam com a mesma saída).

| Dimensão | Valores |
|---|---|
| Equipamento | os 55 cenários (academia completa, condomínio, casa, "sem nada", só elásticos, só halteres, halteres e banco, prédio do Bruno, cada um dos 49 itens sozinho, 5 pares de casa) |
| Nível | iniciante, intermediário, avançado |
| Dias por semana | 2 a 6, com a divisão recomendada de cada um (corpo todo A/B; corpo todo A/B/C; superior/inferior 2x; superior/inferior + empurrar/puxar/pernas; empurrar/puxar/pernas 2x). As outras divisões ficam cobertas pelo estresse antigo. A divisão fica livre no perfil, para a regra `divisao.sem-puxar` (quem não tem como puxar vai para corpo todo) valer. |
| Minutos | 30, 45, 60, 75, 90 |
| Prioridades | nenhuma; cada um dos 7 grupos sozinho; peito+costas; pernas+glúteos; peito+braços; costas+ombros; pernas+glúteos+abdômen (13) |
| Dor | sem dor; dor leve (nota 4) e dor forte (nota 7) em cada uma das 7 regiões (15) |
| Exercício evitado | nenhum; o 1º exercício que a vaga "agachar" escolheria naquele cenário; idem a vaga "empurrar horizontal" (só nos casos sem dor, para a rodada caber em minutos) |

São **911.625 programas** (3.646.500 dias de treino), gerados em 3,5 minutos com 4 processos. A junção dos processos soma contagens e escolhe exemplos pelo índice fixo de cada caso: o arquivo sai idêntico com 1, 3 ou 4 processos (conferido). `npm run auditoria:verificar` roda a auditoria inteira duas vezes e compara os hashes de tudo que ela gera.

Para cada programa, a grade mede, por dia e por semana: exercícios por dia; minutos estimados ÷ minutos escolhidos; séries por músculo contra a meta (prioritário) e contra o piso de 4 (os demais); músculos com zero séries na semana e se algum aviso os cita; exercícios distintos na semana e o mesmo exercício em todos os dias (com e sem outra opção possível); a fatia das séries que vai aos músculos prioritários; vaga a vaga, as que ficam vazias e por quê (equipamento, dor, minutos); a lista de avisos. Os "suspeitos" (o que vale olhar, não necessariamente erro):

| Suspeito | O que é | Ocorrências |
|---|---|---|
| `dia.poucos-exercicios` | dia com menos de 5 exercícios tendo 45 min ou mais | 30% dos dias |
| `tempo.uso-baixo` | o dia mais longo usa menos de 70% dos minutos escolhidos (o limite de `tempo.sobra`) | 37,3% dos programas |
| `monotonia.todos-os-dias` | o mesmo exercício (fora o abdominal) em todos os dias | 29,8% dos programas |
| `prioridade.abaixo-com-tempo` | músculo prioritário abaixo da meta com o dia mais longo abaixo de 85% dos minutos, sem dor | 7,1% dos programas |
| `tempo.uso-baixo-sem-aviso` | uso abaixo de 70% e nenhum aviso de sobra | 3,9% dos programas |
| `monotonia.todos-os-dias-com-opcao` | o mesmo exercício em todos os dias havendo outro equivalente possível | 0,6% dos programas |
| `volume.zero-sem-aviso`, `dia.vazio`, `dia.so-core`, `tempo.acima-sem-aviso`, `volume.acima-do-teto` | as garantias que os testes já cobrem | **0** |

As tabelas completas estão em `docs/revisoes/qualidade/grade.md` (gerado; não editar à mão) e os números em `grade.json`.

### A.2 Exercícios por dia

Faixas de exercícios por dia de treino (% dos dias), por duração. "Cabem" é o alvo de `tempo.exercicios-por-sessao` (consenso: a conta de tempo do app, `pesquisa-v2/05`, seção 1).

| Minutos | Cabem | ≤ 3 | 4 | 5 a 7 | ≥ 8 | Mediana |
|---:|---:|---:|---:|---:|---:|---:|
| 30 | 4 | 27,9% | 72,1% | 0% | 0% | 4 |
| 45 | 6 | 19,3% | 18,9% | 61,9% | 0% | 5 |
| 60 | 8 | 19,2% | 18,1% | 51,7% | 11% | 5 |
| 75 | 10 | 19,2% | 18,1% | 49,7% | 13% | 5 |
| 90 | 12 | 19,2% | 18,1% | 49,5% | 13,2% | 5 |

Nos programas sem dor e sem exercício evitado ("limpos"), com 45 min ou mais, os dias com até 3 exercícios são 16,5%, e vêm quase todos de dois lugares:

| Dias por semana | 30 min | 45 min | 60 min | 75 min | 90 min |
|---:|---:|---:|---:|---:|---:|
| 2 | 8,4% | 0% | 0% | 0% | 0% |
| 3 | 13% | 0% | 0% | 0% | 0% |
| 4 | 18,6% | 6,8% | 6,8% | 6,8% | 6,8% |
| 5 | 18,2% | 10,4% | 10,4% | 10,4% | 10,4% |
| 6 | 48,1% | 41,8% | 41,8% | 41,8% | 41,8% |

- **6 dias (Empurrar/Puxar/Pernas 2x)**: 41,8% dos dias têm até 3 exercícios a partir de 45 min. Quem não tem como puxar (sem nada, só barra longa, só leg press, só cadeira extensora...) ganha dois dias de "Puxar" com 2 exercícios (abdominal e um exercício de outro músculo, 8 a 13 min). A regra `divisao.sem-puxar` manda para corpo todo quem não tem como puxar, mas não existe corpo todo de 6 dias.
- **4 e 5 dias**: o dia de "Superior" (ou de "Puxar") de quem só tem barra fixa, rack, smith, puxador ou remada fica com 2 a 3 exercícios.
- **2 e 3 dias**: com 45 min ou mais, nenhum dia "limpo" fica com 3 exercícios. O caso dos 3 exercícios em 3 dias só aparece com um exercício evitado (A.10).

Por cenário de equipamento (45 min ou mais, "limpos"): na academia completa, no condomínio, na casa com halteres e elásticos, no prédio do Bruno, com elásticos e barra de porta, e com halteres e banco, **nenhum dia tem 3 exercícios ou menos** e a mediana é 6. Sem nada: 20% dos dias com até 3, 30% com 4, mediana 4. Só barra fixa: 44% com até 3. Só kettlebell: 23,5%. Só suspensão: 15%.

### A.3 Uso dos minutos

Minutos estimados do dia mais longo ÷ minutos escolhidos (todos os programas):

| Minutos | Mediana do uso | < 50% | < 70% | ≥ 100% |
|---:|---:|---:|---:|---:|
| 30 | 100% | 0% | 0,4% | 60,2% |
| 45 | 95% | 0,5% | 6,6% | 39,8% |
| 60 | 75% | 2,9% | 31,3% | 18,1% |
| 75 | 60% | 15,6% | 59% | 6,3% |
| 90 | 50% | 38,2% | 77,6% | 2% |

Isso não é só o equipamento mínimo. **Na academia completa, 25,5% dos programas de 45 min ou mais usam menos de 70% dos minutos**, todos de 75 e 90 min. O motivo é estrutural: cada dia da divisão tem de 7 a 12 vagas, cada exercício vai até 4 séries (`volume.series-por-exercicio`) e cada músculo até a meta da semana; com tudo preenchido, o dia de superior da academia leva uns 55 a 65 minutos. O "cabem ~12 exercícios" que o app diz com 90 min é a conta do tempo, não a lista do dia. Para quem não tem como puxar, o uso cai mais: sem nada, 57,7% dos programas de 45 min ou mais ficam abaixo de 70%.

O aviso `tempo.sobra` ("o treino dura cerca de N min; dá para escolher menos tempo") só sai quando alguma vaga ficou sem exercício **por equipamento** e o **dia mais longo** usa menos de 70%. Por isso ele não aparece em 3,9% dos programas com uso baixo: os que perderam exercícios **pela dor** (ex.: casa, 2 dias, 90 min, ombro 7: o dia mais longo tem 53 min e nenhum aviso) e os que têm um dia longo e outros curtos (o caso do Gustavo, A.10).

### A.4 Séries por músculo e músculos a zero

Por nível, somando os 55 cenários (média de séries semanais; prioritário abaixo da meta, em % dos programas em que o músculo é prioridade; não prioritário abaixo do piso de 4, em % dos outros; 0 série na semana, em % dos programas):

| Músculo | Média (inic. / inter. / avanç.) | Prioritário abaixo da meta | Demais abaixo de 4 | Zero |
|---|---|---|---|---|
| peito | 7,2 / 7,6 / 7,8 | 20% / 38% / 52% | 15% | 15% |
| costas | 3,2 / 3,6 / 3,7 | 57% / 76% / 83% | 53% | 52% |
| ombro lateral | 2,0 / 2,1 / 2,2 | 75% / 84% / 87% | 70% | 51% |
| ombro posterior | 2,4 / 2,6 / 2,6 | — | 67% | 51% |
| bíceps | 3,1 / 3,3 / 3,4 | 68% / 77% / 87% | 58% | 47% |
| tríceps | 5,6 / 5,9 / 6,0 | 52% / 77% / 81% | 25% | 15% |
| quadríceps | 6,1 / 6,5 / 6,6 | 26% / 65% / 88% | 11% | 11% |
| posteriores | 6,8 / 7,5 / 7,8 | 21% / 41% / 58% | 4% | 4% |
| glúteos | 8,8 / 8,4 / 8,6 | 11% / 31% / 40% | 7% | 1% |
| panturrilha | 5,1 / 5,3 / 5,3 | 33% / 72% / 95% | 10% | 10% |
| abdômen | 5,2 / 5,4 / 5,4 | 24% / 59% / 85% | 11% | 12% |

Leitura: a grade é pesada em cenários pobres (38 dos 55 são um item sozinho), por isso costas, ombros e bíceps ficam a zero em metade dos programas. **Nenhum músculo grande fica a zero sem um aviso que o cite** (a garantia do teste de propriedade vale nos 911.625). O que muda de nível para nível é só a meta do prioritário (8, 12, 14): a mesma lista de vagas que entrega 8 séries ao iniciante não chega a 14 no avançado, e o prioritário fica abaixo da meta em 52% a 95% dos programas do avançado, mesmo na academia completa (ver A.5).

Nos cenários que importam para as personas: sem nada, costas, ombro posterior e bíceps a zero em 100% e ombro lateral em 69% (o restante vem do desenvolvimento na flexão pike, meia série); só halteres sem banco, costas a zero em 18% (os programas de 2 dias, em que a remada não cabe). Na academia completa, panturrilha a zero em 22% e abdômen em 21%: são os programas de 30 min, em que os complementos saem.

### A.5 A prioridade, em números

Fatia das séries da semana (séries diretas mais meia série indireta, como o app conta o volume) que vai aos músculos prioritários, média dos programas com prioridade:

| | 1 prioridade | 2 prioridades | 3 prioridades |
|---|---:|---:|---:|
| iniciante | 14,4% | 26,1% | 58,1% |
| intermediário | 16,1% | 28,5% | 60,4% |
| avançado | 16,7% | 29,5% | 61,4% |

A fatia quase não muda com os dias (15,4% a 16,4% com 1 prioridade) nem com os minutos (15,3% a 15,9%) nem com o equipamento (15,6% sem nada, 16,3% na academia). Ou seja: **a prioridade de hoje é "foco pequeno, mantendo o resto"**: com um grupo priorizado, 5 em cada 6 séries da semana continuam indo para os outros. Por grupo, no avançado: pernas 37,7% (três músculos), peito 15,4%, glúteos 20,1%, braços 16,8%, costas 6,9%, ombros 5,2%, abdômen 15%. Costas e ombros priorizados recebem menos porque metade dos cenários não tem como puxar.

Quando o prioritário fica abaixo da meta (% dos programas com aquela prioridade): no iniciante (meta 8), de 13% (glúteos) a 78% (braços); no avançado (meta 14), de 39% (glúteos) a 96% (pernas). Com 2 ou 3 prioridades, elas **competem**: num programa de cada dois com peito+bíceps ou pernas+glúteos, um prioritário chega à meta e o outro não. O que a prioridade faz hoje no código, o que a evidência diz e as opções estão na Parte D.

### A.6 Monotonia

Mediana de exercícios distintos na semana e % dos programas de 3 dias ou mais com um exercício (fora o abdominal) em todos os dias, e % em que havia outro equivalente do mesmo nível possível e sem uso:

| Cenário | Distintos | Em todos os dias | Com opção |
|---|---:|---:|---:|
| academia | 22 | 2% | 0% |
| bruno (prédio) | 20 | 2,1% | 1,3% |
| condomínio | 18 | 5,6% | 1,5% |
| casa | 17 | 21,2% | 2,1% |
| halteres e banco (Ana) | 16 | 9,5% | 9,1% |
| só halteres | 16 | 21,1% | 2,4% |
| só elásticos | 15 | 21,6% | 0% |
| só barra fixa | 11 | 24,8% | 0% |
| sem nada | 9 | 62,7% | 0% |

A repetição vem da falta de opção (sem nada: 9 exercícios distintos para 3 a 6 dias), não do desempate: com opção parada, só 0,6% dos programas. A Ana (halteres de 1 a 12 kg e banco reto) é a exceção a olhar: 9,1% com opção.

### A.7 Vagas vazias

Por programa (média), nos cenários que importam:

| Cenário | Vagas ativas | Com exercício | Vazias por equipamento | Vazias pela dor | Fora por minutos ou corte | As funções vazias por equipamento |
|---|---:|---:|---:|---:|---:|---|
| academia | 28,9 | 26,9 | 0 | 2 | 3,3 a 3,5 | — |
| casa | 28,9 | 26,6 | 0,1 | 2,3 | 3,4 a 3,6 | empurrar inclinado (sem banco inclinável) |
| só elásticos; Diego | 28,9 | 26,3 | 0,3 | 2,4 | 3,4 a 3,7 | panturrilha sentada, empurrar inclinado |
| só halteres | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar inclinado |
| halteres e banco (Ana) | 28,9 | 25 | 1,6 | 2,3 | 3,5 | extensora (1,6) |
| só barra fixa | 28,9 | 15,4 | 11,8 | 1,7 | 1,3 a 2,2 | elevação lateral (1,9), bíceps (1,8), extensora, ombro posterior, puxar horizontal (1,6 cada), crucifixo, tríceps acima da cabeça (1,4) |
| sem nada | 32 | 16 | 14,1 | 1,8 | 1 a 1,2 | elevação lateral (2,1), puxar vertical (2), bíceps (1,9), extensora, ombro posterior, puxar horizontal (1,6), crucifixo, tríceps acima da cabeça (1,4) |

Sem nada, **metade das vagas da semana não tem exercício possível**: 14 em 32. Não é o tempo: só 1 vaga por programa fica de fora pelos minutos. É isso que o treino de 60 min sem equipamento mostra.

### A.8 Avisos

% dos programas com cada aviso: `equipamento.escada-carga-leve` 83,6% (quase toda a grade tem pouca carga para as pernas); `selecao.isolador-obrigatorio` 76,4% (sem extensora); `volume.semanal.alvo` 73,3% (algum músculo abaixo da meta); `equipamento.sem-ancoragem` 46,1% (sem algo para puxar); `seguranca.dor.programa` 41,2%; `selecao.dia-sem-principal` 37,2%; `tempo.sobra` 33,5%; `tempo.corte` 29,5%; `equipamento.sem-puxada-vertical` 26,6%; `selecao.alongado` 16,8%; `divisao.sem-puxar` 9,2%. Todo aviso aponta para uma regra de `regras.md` (o teste de propriedade garante).

### A.9 Os piores casos

Sem dor e sem exercício evitado, com 45 min ou mais, os dias mais curtos têm **2 exercícios**: sem nada com 6 dias (dia de "Puxar": panturrilha e abdominal, 8 min); só barra fixa, só rack, só smith com 4 dias (o dia de "Superior" com barra fixa e abdominal); só barra longa, só barra W, só leg press, só extensora, só flexora com 6 dias. O menor uso dos minutos: só barra hexagonal, 6 dias, 90 min, com o dia mais longo em 26 min. Cada um tem a linha que o reproduz em `grade.md`, seção "Piores casos" (`gerarPrograma(<perfil>, CEN_55['<cenário>'].inventario)`, com `CEN_55` de `scripts/auditoria/cenarios-55.ts`).

### A.10 O caso do Gustavo, regra a regra

A combinação exata não ficou registrada ("opções aleatórias"). A grade encontrou as duas formas de chegar a 3 exercícios com 60 min e nenhum equipamento, e explica cada vaga. Os traços completos estão em `docs/revisoes/qualidade/caso-gustavo.md`.

**Sem marcar nada mais (intermediário, 3 dias, 60 min, sem dor):** `gerarPrograma({ nivel: 'intermediario', semanasParado: 0, diasSemana: 3, minutosSessao: 60, prioridades: [], evitarExercicios: [], evitarEquipamentos: [], triagem: { respostas: respostasNenhuma() } }, {})` → Corpo todo A/B/C com **4, 4 e 6 exercícios** (28, 26 e 45 min). O app diz "cabem cerca de 8 exercícios" (`tempo.exercicios-por-sessao`). O dia A tem 10 vagas no modelo: agachar (agachamento com o peso do corpo), empurrar horizontal (flexão), **puxar vertical: vazia, nenhum exercício possível** (dos 13 da função, 0 sem equipamento: todos pedem barra, polia, halter ou elástico), flexão de joelho (deslizante), extensão de quadril (inativa, só com prioridade glúteos), **tríceps acima da cabeça: vazia** (os 6 da função pedem carga), **elevação lateral: vazia** (os 3 pedem halter, polia ou elástico), abdominal (complemento), **crucifixo: vazia** (complemento), bíceps (inativa, só com prioridade braços). Sobram 4. O dia B perde puxar horizontal, extensora e bíceps (base) e ombro posterior (complemento): sobram 4. O dia C perde puxar vertical e elevação lateral: sobram 6, com a flexão fechada como complemento de tríceps.

Os avisos que saem: "Sem algo para puxar ou levantar: costas, ombro lateral, ombro de trás e bíceps ficam sem exercício. O resto do corpo segue no programa." (`equipamento.sem-ancoragem`); "Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo." (`selecao.isolador-obrigatorio`); "Pouca carga para as pernas..." (`equipamento.escada-carga-leve`). **O aviso de sobra de tempo não sai**: o dia C tem 45 min, acima dos 42 (70% de 60) que `tempo.sobra` exige do dia mais longo, embora A e B tenham 28 e 26. Nenhum aviso diz "abaixo da meta" para costas, bíceps e ombros porque o de "sem algo para puxar" os agrupa (decisão do Gustavo em 04/11/2026).

**Marcando a flexão como exercício a evitar** (a tela "Algo a evitar?" do cadastro lista os exercícios possíveis; sem equipamento são 13, e a flexão é o 1º do peito): `evitarExercicios: ['flexao']` → **3, 3 e 5 exercícios** (20, 17 e 43 min). A flexão era o único empurrar horizontal e o único empurrar inclinado possíveis (a flexão fechada fica só no complemento de tríceps); sem ela, o peito perde a vaga nos três dias. O dia A fica com agachamento, flexão de joelho deslizante e abdominal; o dia B com nórdico, panturrilha no chão (4 séries) e abdominal. E o aviso de sobra continua sem sair, pelo mesmo motivo (o dia C tem 43 min). Marcando o agachamento em vez da flexão: 3, 4 e 6.

**Com 6 dias** (sem marcar nada): Empurrar/Puxar/Pernas 2x com **3, 2, 5, 2, 2 e 5 exercícios** (18, 8, 26, 12, 13 e 29 min). Aqui o aviso de sobra sai ("o treino dura cerca de 30 min") e também "sem exercício de puxar, os dias de puxar ficam com outros músculos; corpo todo encaixa melhor", mas não há corpo todo de 6 dias para ir.

**O que a semana entrega**, no caso sem marcar nada: peito 9 séries, tríceps 6, posteriores 6, quadríceps 6, glúteos 7, panturrilha 4, abdômen 6, costas 0, bíceps 0, ombro lateral 0, ombro posterior 0 (metas: 6 em cada, 4 no abdômen). Os músculos que têm exercício chegam à meta (o mínimo eficaz, `volume.semanal.minimo-eficaz`, 4 a 6 séries, moderada) com 2 a 3 séries por exercício; a distribuição de séries para na meta, por isso o dia não cresce mesmo com 30 minutos sobrando. É uma escolha de regra, não um defeito: a evidência de hipertrofia conta séries por músculo por semana (`volume.semanal.dose-resposta`, robusta), e o número de exercícios é consequência. A pergunta de produto, que fica para a Parte E, é se, com tempo sobrando, o app deveria subir as séries dos músculos possíveis até o alvo do nível (8, 12, 14), preencher as vagas vazias com outra variação dos padrões possíveis, só avisar melhor, ou as três coisas.

### A.11 Achados da Parte A (o que a pesquisa precisa responder)

1. **O "3 exercícios em 60 min" tem duas origens**: (a) um exercício evitado num cenário sem opção (a flexão sem equipamento tira o peito dos três dias); (b) 6 dias sem como puxar (dias de "Puxar" com 2 exercícios). Sem as duas coisas, com 2 ou 3 dias e 45 min ou mais, o mínimo é 4.
2. **O aviso de sobra olha só o dia mais longo**: um programa com dias de 20, 17 e 43 min em 60 não avisa. E não sai quando a sobra vem da dor.
3. **Com 75 e 90 min, o treino não cresce** nem na academia completa: a lista de vagas do dia e o teto de 4 séries por exercício param o dia em 55 a 65 min. O "cabem cerca de 12 exercícios" é uma promessa que o modelo de dia não cumpre.
4. **A distribuição de séries para na meta**: músculos não prioritários ficam em 4 a 6 séries mesmo com tempo sobrando. Sem equipamento, isso é o que deixa o dia com 2 séries por exercício.
5. **A prioridade entrega ~16% das séries** com 1 grupo e ~60% com 3; com 2 ou 3 prioridades, metade dos programas tem uma na meta e outra não; no avançado, o prioritário fica abaixo da meta na maioria dos programas.
6. **6 dias sem como puxar não tem divisão adequada** (`divisao.sem-puxar` não tem corpo todo de 6 dias para recomendar).
7. **Sem nada, metade das vagas da semana não tem exercício**, e 62,7% dos programas repetem um exercício em todos os dias por falta de opção. A biblioteca tem 13 exercícios sem equipamento, nenhum de puxar, bíceps, ombro lateral, ombro posterior, extensora ou tríceps acima da cabeça.
8. A Ana (halteres de 1 a 12 kg e banco reto) repete exercício com opção parada em 9,1% dos programas: olhar o desempate.

---

## Parte B. O que a evidência diz, por músculo

(em andamento)

## Parte C. As combinações por dia

(em andamento)

## Parte D. O que "prioridade" faz hoje, e o que deveria fazer

### D.1 O que o código faz com a prioridade (medido em 06/11/2026)

A pessoa marca de 0 a 7 grupos no cadastro (peito, costas, ombros, braços, pernas, glúteos, abdômen). Cada grupo vira um ou mais músculos (`GRUPOS` em `src/domain/gerador/index.ts`: "pernas" = quadríceps, posteriores e panturrilha; "braços" = bíceps e tríceps; "ombros" = só o ombro lateral). A prioridade entra em cinco lugares:

| Onde | O que muda | Regra |
|---|---|---|
| A meta semanal (`metasDoPerfil`) | o músculo prioritário sai do piso de 6 séries (4 no abdômen) e vai para o alvo do nível: 8 no iniciante, 12 no intermediário, 14 no avançado | `volume.semanal.alvo` (consenso), `volume.semanal.minimo-eficaz` (moderada) |
| As vagas do dia (`ativa` e `rank`) | vagas marcadas com `prioridade` em `divisoes.ts` só entram se o grupo for prioridade (ex.: a extensão de quadril no dia A de corpo todo só com glúteos; o 2º bíceps no dia de puxar só com braços; a adução só com pernas ou glúteos); e, quando não cabem todas as vagas nos minutos, os complementos dos grupos prioritários entram antes dos outros | `tempo.exercicios-por-sessao`, `selecao.aducao-complemento` |
| A distribuição das séries | as séries sobem primeiro no músculo mais longe da meta em proporção; como a meta do prioritário é maior, ele recebe mais séries (até 4 por exercício e 10 por sessão) | `volume.series-por-exercicio`, `volume.sessao.teto` |
| A ordem da sessão | entre exercícios do mesmo tipo (multiarticular ou isolador), o do músculo prioritário vem antes | `ordem.sessao` (consenso) |
| Os cortes de tempo (`cortarTempo`) | um prioritário nunca perde séries antes de um não prioritário; o piso do prioritário nos cortes é o mínimo do nível (6, 10, 12), o dos outros é 4 | `tempo.corte` (consenso) |

O que a prioridade **não** faz: não acrescenta uma 2ª vaga do músculo nos dias (só as vagas marcadas em `divisoes.ts`, que existem para glúteos, pernas, ombros, braços, peito e costas em alguns dias, não em todos), não aumenta a frequência (os dias em que o músculo treina vêm da divisão) e não tira os outros músculos do programa: eles continuam com o piso de 4 a 6 séries.

**O resultado medido (Parte A.5)**: com 1 grupo priorizado, 14% a 17% das séries da semana vão para ele; com 2, 26% a 30%; com 3, 58% a 61%. A fatia quase não muda com o equipamento, os dias ou os minutos. No avançado, o prioritário chega à meta de 14 em menos da metade dos programas (de 4% dos de pernas a 61% dos de glúteos); no iniciante (meta 8), em 22% a 87%. Com 2 ou 3 prioridades, em metade dos programas uma chega à meta e outra não (peito+braços 54% no intermediário, pernas+glúteos 60%, pernas+glúteos+abdômen 67%): elas competem pelas mesmas vagas, pelos mesmos minutos e pelo teto de 10 séries por músculo por sessão.

**O que o app diz hoje** no "porquê" do programa: "Grupos prioritários com ~N séries semanais; os demais no mínimo eficaz (6)." (`volume.semanal.alvo`) e, nos avisos de meta, "Abaixo da meta: costas 8 de 12 séries por semana. A divisão X treina este músculo 2x por semana e, com até 4 séries por exercício e 10 por sessão, não cabe mais." Ou seja: o texto diz os números, mas não diz que "prioridade" significa foco maior mantendo os outros, nem avisa quando duas prioridades competem.

### D.2 O que a evidência diz

(em andamento: pesquisa em curso)

### D.3 Opções para o Gustavo

(em andamento)

## Parte E. As opções para a vaga sem exercício possível

(em andamento)

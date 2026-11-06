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

A pesquisa completa está em `docs/pesquisa-v2/13-exercicios-por-grupamento.md` (um pesquisador por grupamento, o mesmo brief, partindo da Parte B da auditoria independente). Aqui fica só o que muda em relação ao app, com o selo, e a quem decide (G = opção para o Gustavo na Parte E; eu = decidido por mim, com o porquê).

**O que vale para todos os músculos.** A unidade da evidência é séries por músculo por semana (robusta). Com o mesmo volume, um exercício só cresce o músculo inteiro igual a vários; o 2º exercício serve à região (a parte de cima do peito, o reto femoral, a cabeça longa do tríceps) ou à motivação (moderada: `kassiano2025var`, `bazvalle2019`, `fonseca2014`, `costa2021`, `chaves2020`). Nenhum ensaio compara "1 exercício com mais séries × 2 exercícios com o mesmo volume": cinco buscas independentes não acharam. Músculos não competem por crescimento (`kataoka2026`, um estudo). Logo, "2 exercícios de funções complementares por músculo grande" (`selecao.exercicios-por-musculo`) continua certa como consenso, e pode subir para moderada na parte "cobrem mais regiões; um só com o volume certo cresce o total".

| Músculo | O que a evidência diz | O que muda no app | Quem decide |
|---|---|---|---|
| Peito | A flexão até perto da falha cresceu o peito como o supino com a carga igualada (`kikuchi2017`, texto completo, um estudo). O inclinado dá região, não total (`chaves2020`, texto completo). O isolador sozinho cresceu menos o peitoral que o multiarticular (`barbalho2021`, um estudo). O motivo "peito alongado" do crucifixo é consenso (`varovic2025`: efeito trivial do comprimento noutros músculos). | **B.1** Sem banco inclinável, a vaga "empurrar inclinado" (base do dia B) cai no crucifixo, um isolador, como exercício principal de peito do dia: propor um nível de "2º empurrar" (supino reto, máquina, smith, chão, flexão) antes dos crucifixos em `funcoes.json`. Afeta a Ana (dia B: crucifixo → supino com halteres). **B.2** Sem nada, o peito não fica vazio: flexão e flexão fechada fecham a meta; a vaga vazia é só o crucifixo, e tudo bem (C.3 da auditoria confirma). Vaga vazia: mais séries na flexão, 2ª flexão só se a meta não fecha. Textos: `selecao.peitoral-inclinado` ganha a frase do `chaves2020`; `selecao.crucifixo-complemento` troca "alongado" por "complemento isolador (consenso)". | B.1: G. B.2 e textos: eu (são texto e selo, sem mudar o treino). |
| Costas | Nenhum ensaio compara puxada × remada nem 1 × 2 exercícios de costas; "2 funções" segue consenso. Pegadas equivalentes para o latíssimo (EMG; consenso). Remada invertida e suspensão como substitutas: consenso + EMG (`fenwick2009`, `youdas2016`, `vural2023`); hipertrofia só em idosos (`soligon2020`). Sem algo para puxar, o custo é 0 séries (confirmado). | **B.3** Só com a barra fixa, a vaga de puxar horizontal fica vazia e o Fábio (costas prioridade) para em 8 séries: propor que a vaga vazia receba outra pegada da barra (pronada + supinada no mesmo dia), até 2 exercícios de costas por sessão (Fábio: 8 → 10 a 12). **B.4** Achado de código: a barra fixa de porta não abre a remada invertida porque `barra_baixa` exige rack ou smith (`equipamentos.ts:170`); propor um atributo "a barra encaixa baixo?" no cadastro do item (não reabre mesa, porta e toalha, decididos em 03/11). **B.5** `barra-fixa-supinada` e `puxada-elastico` sem o ombro posterior como secundário (incoerência B.5 da auditoria): propor corrigir, com o efeito no Diego (barra de 2 para 3 séries no dia A) e no Fábio (posterior sai do zero). | B.3, B.4 e B.5: G (mudam o treino ou a biblioteca). |
| Ombro lateral e posterior | O único ensaio de hipertrofia do deltoide lateral usou só a elevação lateral, 10 séries por semana: +3,3 a 4,6% em 8 semanas (`larsen2025`, texto completo, um estudo); halter = polia; a curva do elástico não muda a hipertrofia (moderada). O supino não cresce o deltoide médio (`lanza2024`). Ombro posterior: nenhum ensaio de hipertrofia com exercício nenhum; a meia série das remadas é consenso. Não existe elevação lateral com o peso do corpo (confirmado). | **B.6** Os níveis das 3 funções conferem; o elástico fica no nível 2 pela progressão de carga grossa, não por "crescer menos" (texto do porquê). **B.7** Quando a vaga de ombro posterior fica vazia por equipamento e o dia tem um puxar, propor que o puxar suba para 4 séries (meia série por série para o posterior; Fábio). **B.8** No programa de 2 dias a elevação lateral só existe no dia A e fica em 2 séries: propor `c('elevacao-lateral')` no dia B. **B.9** Opcional, [opinião] do pesquisador: incluir o ombro posterior no grupo "ombros" (hoje só o lateral); efeito no Bruno e na Carla. Texto do aviso da vaga de elevação lateral: "a flexão com o quadril alto conta meia série para o ombro lateral". | B.6 e texto: eu. B.7, B.8, B.9: G. |
| Bíceps e tríceps | Uma rosca basta para o total do bíceps (5 ensaios, moderada); duas cobrem regiões diferentes (3 ensaios, diferença pequena). O supino sozinho não cresceu a cabeça longa do tríceps; a extensão acima da cabeça é complementar (`maeo2023` + `brandao2020`, um estudo). "Multiarticular basta" vale para o total do bíceps (moderada), não por série (`mannarino2021`: a rosca cresceu o bíceps 2× a remada) nem para a cabeça longa do tríceps. Meia série indireta: `pelland2026` comparou 1, 0,5 e 0 e o 0,5 venceu, sem estimar o ótimo: manter, com selo "um estudo" para o número. Carga leve até a falha = alta (`lopez2021`, robusta): a escada de carga basta para o bíceps. | **B.10** Níveis conferem; o nível 1 do bíceps é um par de variação (Scott ⇄ inclinada), não "melhor": corrigir o porquê de quem cai no nível 2 (texto). **B.11** Com suspensão, `triceps-suspensao` como nível 2 da vaga obrigatória do tríceps (a vaga vazia 1,4 → 0 no cenário só suspensão; nenhuma persona muda). **B.12** Quando a vaga obrigatória do tríceps fica vazia e sobra tempo, o complemento (flexão fechada) não é cortado e sobe para 3 a 4 séries antes de sugerir menos minutos (Elisa e Fábio: tríceps +3 a +4 por semana). Bíceps sem nada: continua avisar e encurtar (não há exercício sem ancoragem). `selecao.multi-mono` sobe para moderada com as fontes novas; `volume.serie-indireta.peso` ganha a nota do `pelland2026`. Dois ensaios de Barbalho (PMID 29781936 e 31072272) constam como retratados: nunca citar. | B.10 e selos: eu. B.11 e B.12: G (B.12 é a opção (c) da Parte E). |
| Quadríceps | Os vastos crescem igual com um exercício só, com o volume certo (moderada). O reto femoral só cresce de verdade com a extensão de joelho: +13,2% contra +1,1% no agachamento (`kinoshita2026`, moderada). Até o paralelo basta; o quarto de agachamento rende menos (`bloomquist2013`). Sem nada, agachamento e afundo com o peso do corpo crescem o quadríceps quando vão até perto da falha (`ogawa2023`, `wei2023`); repetições folgadas não mudaram a espessura (`yoshiko2021`, `hirono2023`). | **B.13** Vaga `extensora` vazia (halteres, halteres e banco, sem nada, só barra fixa): preencher o volume com o outro padrão do quadríceps no dia (afundo no dia de agachar e vice-versa) ou séries extras, e manter o aviso do reto femoral. Ana e Fábio ganham um 2º exercício de quadríceps por dia de perna. É um caso da opção (b) da Parte E. **B.14** Nível 3 opcional na extensora com o nórdico invertido: só um estudo sem grupo controle (`alonso2019`); não recomendo numa vaga obrigatória. Texto do doc 11: "agachamento até pelo menos o paralelo". | B.13: G (Parte E). B.14: G (não recomendado). Texto: eu. |
| Posteriores da coxa | Um exercício só cresce o músculo inteiro (flexora sentada +14%, nórdico +11% em dois ensaios, stiff +7%: moderada). Exercícios diferentes crescem cabeças diferentes (moderada, 3 grupos de pesquisa): o nórdico cresce o semitendíneo; o quadril dobrado cresce a cabeça longa e o semimembranoso (`maeo2024`, texto completo; `morin2025`). Flexão deslizante e stiff com o peso do corpo: nenhum ensaio. | **B.15** Linha nova `selecao.dobrar-quadril` com as fontes (`bourne2017`, `crawford2025`, `morin2025`), sem mudar a ordem dos níveis. `selecao.exercicios-por-musculo` pode subir para moderada na parte das funções complementares (reforça C.8). **B.16** `selecao.nordico`: faixa de 4–8 para 6–10 descidas e 3 a 4 séries a partir da 3ª semana (`maeo2024`, `cholp2025`: volume baixo não cresce). Vaga vazia: mais séries no exercício que existe, depois a deslizante unilateral; nunca sugerir menos minutos por causa dos posteriores (Elisa: ~6 → 8 séries). | B.15: eu (fonte e selo). B.16: G (muda a prescrição do nórdico). |
| Glúteos | Um exercício de extensão de quadril basta (programas de um e de vários exercícios com efeito parecido: `krauseneto2025`, meta-análise, texto completo, moderada). Hip thrust ≈ agachamento profundo (moderada). A abdução cresce mais a parte de cima e o glúteo médio (`attarieh2026`, um estudo). As séries indiretas do agachar, do afundo e do stiff são reais e não inflam o volume. | **B.17** O que infla o glúteo na grade é a abdução contada como série inteira de "glúteos" e o glúteo como secundário das flexões de joelho (deslizante, bola, suspensão), sem ensaio: propor abdução com peso 0,5 [opinião] e tirar o glúteo dos secundários das flexões. Muda músculos da biblioteca: listar o efeito antes (regra da sessão). **B.18** `coice-polia` sobe para o nível 1 de `extensao-quadril` (o único com ensaio de ressonância). `selecao.gluteo` sobe para moderada. Vaga vazia: o glúteo nunca fica vazio por equipamento. | B.17 e B.18: G (mudam a biblioteca e os níveis). Selo: eu. |
| Panturrilha | Todos os ensaios usaram um exercício só e a panturrilha cresceu (moderada); 12 séries por semana renderam mais que 6, inclusive no sóleo (`kassiano2024b`). O sóleo cresce com a em pé (3 ensaios, moderada); a sentada não acrescenta tamanho (um estudo). No chão, sem degrau, só se treina a metade de cima, que cresce bem menos (`kassiano2023b`); com uma perna e descida lenta de 3 s cresceu +9,1% (`nakamura2025`, um estudo). | **B.19** A vaga `panturrilha-sentada` vazia é "tudo bem", sem aviso (confirma a auditoria C.3). **B.20** Sem carga, a panturrilha no chão começa com uma perna e a descida em 3 s (texto e prescrição); criar `panturrilha-unilateral-degrau` (degrau da escada). **B.21** A panturrilha fica a zero em ~22% dos programas de academia e casa (os de 30 min, em que os complementos saem): proteger dos cortes de tempo, como os isoladores obrigatórios. | B.19: eu. B.20 e B.21: G. |
| Abdômen | (pendente: o pesquisador foi relançado) | | |

## Parte C. As combinações por dia

A pesquisa completa está em `docs/pesquisa-v2/14-combinacoes-por-dia.md`. O que ela responde, em ordem:

1. **"Um treino tem 5 a 7 exercícios" é prática de treinadores, não estudo (consenso).** O posicionamento do ACSM de 2009 dizia "8 a 10 exercícios por sessão"; o de 2026 (texto completo lido) abandona a conta por exercício e fala em 10 ou mais séries por músculo por semana e em cobrir as direções (empurrar e puxar, horizontal e vertical) "por sessão ou por semana". As três meta-análises de dose-resposta (`schoenfeld2017a`, `pelland2026`, `bazvalle2022`) contam séries semanais por músculo, nunca exercícios (robusta). Os ensaios usam de 2 a 8 exercícios por sessão: 2 (`kassiano2025var`), 4 (`iversen2024`: massa muscular subiu), 6 (`bazvalle2019`), 8 (`tomeleri2020`). A mediana de 5 a 6 da grade está dentro da faixa.
2. **A tabela de tempo do app (doc 05, seção 1) não tem apoio empírico: nenhum estudo mede a duração como variável.** Continua consenso; a calibração com o tempo real (R2) é o caminho. O mínimo que rende: 1 agachar, 1 empurrar e 1 puxar com 4 séries ou mais por músculo por semana (`iversen2021`, texto completo).
3. **"1 exercício com mais séries × 2 exercícios, volume igual": não achei.** O mais perto: com volume igual, fixo = variado no total (`kassiano2025var`, `bazvalle2019`); variado cobre mais regiões (`fonseca2014`, `costa2021`); a variação só vale se for sistemática e mudar a função (`kassiano2022`, `zabaletakorta2021`). Moderada nos dois sentidos.
4. **Divisões empatam com volume igual** (`ramoscampo2024`, robusta); a supersérie agonista-antagonista mantém o volume e encurta a sessão (`zhang2025`, texto completo, moderada); a fadiga entre grupos no mesmo dia é aguda e não muda a hipertrofia (`simao2012`, `nunes2021`); começar pela perna reduz o esforço percebido (`nunes2019`, um estudo).
5. **`ordem.sessao` confirmada e pode subir para moderada** (`nunes2021` + `acsm2026` + `tomeleri2020`). "Prioritário primeiro" tem evidência para força, não para hipertrofia (só `avelar2019`, fraco): continua consenso.
6. **Vaga sem exercício possível: a evidência sustenta (a) avisar, (c) subir as séries dos músculos possíveis até os tetos e (d) dizer a duração real.** (b) só quando a variação muda a função de um músculo abaixo da meta; nunca um 3º empurrar sem puxar: "manter puxar ≈ empurrar" é consenso com apoio de caso-controle de impacto no ombro (`kolber2014`, `kolber2017`). "Volume redistribuído": não achei.
7. **Os 12 modelos de `divisoes.ts`**: a estrutura bate com a evidência (2 funções complementares por músculo grande, multiarticular primeiro, isolador obrigatório, abdômen por último). Os pontos fracos: **6 dias sem puxar** cai no Empurrar/Puxar/Pernas com dias de "Puxar" de 2 exercícios (41,8% dos dias de 6 dias com até 3 exercícios na grade); não há regra para a vaga vazia **por equipamento** (só a dor aciona `selecao.dia-sem-principal`); o ombro posterior é complemento e só entra por desvio (o `rank` do "único exercício direto").

**As propostas da Parte C, com quem decide:**

| # | Proposta | Selo | Efeito | Quem decide |
|---|---|---|---|---|
| C.1 | `ordem.sessao`: selo consenso → moderada; fontes + `acsm2026`, `avelar2019`, `tomeleri2020`, `nunes2019`; texto "a ordem não muda a hipertrofia; o que abre a sessão ganha mais força". | moderada | só texto e selo | eu |
| C.2 | `tempo.exercicios-por-sessao`: manter os números; acrescentar "os ensaios usam 2 a 8 exercícios por sessão; a evidência conta séries por músculo por semana". O suspeito `dia.poucos-exercicios` da grade passa de "< 5 com 45 min ou mais" para "< 4, ou vaga-base vazia sem compensação" (script, não regra). | consenso | só texto; a contagem do suspeito cai | eu |
| C.3 | Nova regra para a vaga vazia por equipamento: é a Parte E (opções a–d medidas). | — | ver Parte E | G |
| C.4 | Novo modelo `ct-6x` ("Corpo todo 6x": A, B, C, A', B', C') em `divisoes.ts`, oferecido só como recuo de `divisao.sem-puxar` para 6 dias (ou como 3ª opção de 6 dias, se o Gustavo preferir). Frequência não muda a hipertrofia com volume igual (`ramoscampo2024`, `pelland2026`). | consenso | Grade: os cenários sem puxar com 6 dias deixam de ter dias de 2 exercícios; nenhuma persona treina 6 dias. Risco [opinião]: agachar ou afundo todo dia com 2 séries; mitigar alternando os dias que começam por pernas. | G |
| C.5 | Ombro posterior como vaga-base em 1 dia por semana (Superior A e Corpo B) em vez de complemento. | consenso | Explicita o que o `rank` já faz; em 45 min pode empurrar o bíceps para fora: medir antes de aprovar. | G |
| C.6 | Pequenos ajustes de ordem dos complementos (abdômen como complemento nos dois dias de Puxar; a elevação lateral do Inferior B para o fim da lista). | consenso | Bruno pode ganhar ou perder 1 exercício no Inferior B: medir. | G |
| C.7 | `tempo.sobra` (texto): "um treino de 4 exercícios com as séries certas rende" (`iversen2024`). | consenso | texto | eu |
| C.8 | `selecao.exercicios-por-musculo`: selo consenso → moderada na parte "2 funções cobrem mais regiões; 1 com o volume certo cresce o total", com `fonseca2014`, `costa2021`, `zabaletakorta2021`, `kassiano2025var`. | moderada | só selo | eu |

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

A pesquisa completa está em `docs/pesquisa-v2/15-prioridade-e-manutencao.md`.

| Pergunta | O que a evidência diz | Selo |
|---|---|---|
| "Foco + manutenção" se sustenta? | Sim. Manter custa pouco: em jovens, um terço e até um nono da dose seguraram o tamanho por 32 semanas (`bickel2011`); 1 sessão por semana com 1 série por exercício e a carga mantida segura força e tamanho (`spiering2021`). Crescer pede mais séries, com retorno decrescente (`pelland2026`, `schoenfeld2017a`). | moderada |
| Os músculos não priorizados, com 4 a 6 séries, mantêm ou crescem? | Crescem devagar: 4 a 6 ficam acima do que mantém (1 a 3) e no mínimo que a revisão de treino eficiente usa (`iversen2021`, texto completo). Em treinados, manter o volume que já faziam cresceu tanto quanto subir 30% ou 60% (`barsuhn2025`, `moreno2025`). | direção: moderada; "manter o habitual basta": um estudo |
| Quanto a prioridade rende a mais? | Não há ensaio de "especialização" em treinados. Pelas meta-regressões, passar de 6 para 14 séries dá **cerca de +2 a +3 pontos percentuais** de crescimento em 8 a 12 semanas (por exemplo, crescer ~6% em vez de ~4%). As primeiras séries valem mais que as últimas: o foco troca crescimento total por crescimento localizado. | coeficientes: moderada; a conta: [opinião] |
| Os músculos competem por crescimento? | Não: treinar mais músculos não tirou crescimento do músculo-alvo (`kataoka2026`, `hammarstrom2020`). O custo do foco é **tempo e cansaço**. | um estudo |
| Há teto? | ~10 a 11 séries por músculo por sessão (`remmert2025`, preprint): a meta de 14 exige 2 dias do músculo na semana. ~20 por semana (`volume.semanal.teto-padrao`). Quantos grupos priorizar ao mesmo tempo ("1 a 2 por bloco"): **não achei** estudo, é prática de treinadores. Pela conta de tempo, 3 prioridades (sobretudo "pernas", que são 3 músculos) não cabem em 4 × 60 min. | sessão: um estudo; semana: moderada; "1 a 2 grupos": consenso |
| "Só este grupo" (zerar os outros)? | A força cai mais que a massa: −0,46 desvio-padrão parando de treinar (`bosquet2013`), −14,5% em ~7 semanas em atletas (`mcmaster2013`). A massa cai devagar (`grgic2022b`); 1 semana parado não muda nada (`coleman2024`). Sem puxar, o desequilíbrio do ombro é consenso com apoio de caso-controle (`kolber2017`). Recomendação dos pesquisadores: nunca zerar; usar o piso de manutenção. | moderada |
| Como treinadores priorizam? | 1º, mais séries no mesmo exercício (até 4); 2º, um 2º exercício de outra função; 3º, um 2º dia. A frequência não muda a hipertrofia com volume igual, mas permite caber o volume sob o teto por sessão. | consenso (o "2º exercício cobre outra região": moderada) |

**Diferença em relação ao app.** O app faz "foco + manutenção", o que a evidência apoia, mas o texto não diz isso (diz "os demais no mínimo eficaz (6)"), não avisa quando duas prioridades competem, e a prioridade não puxa frequência: um músculo que a divisão treina 1 vez por semana não chega a 12 ou 14 séries com o teto de 10 por sessão (no avançado, pernas prioritárias ficam abaixo da meta em 96% dos programas).

### D.3 Opções para o Gustavo

Medido na grade (Parte A.5) e nas personas. Nenhuma muda o gerador antes do "aprovar".

| # | Opção | Selo | Efeito medido ou esperado | Risco |
|---|---|---|---|---|
| **D-1 (recomendada)** | **Texto do "porquê" que explica "foco + manutenção"** (`volume.semanal.alvo`). Redação proposta: "Foco em {grupos}: ~{N} séries por semana, para crescer mais rápido. Os outros músculos ficam com {piso} séries: continuam crescendo, mais devagar. (Mais séries, mais crescimento, com retorno decrescente: evidência moderada. O número exato é prática de treinadores.)" | moderada | Só texto; vale para todas as personas com prioridade (Bruno, Ana, Diego, Carla, Fábio). | nenhum |
| **D-2 (recomendada)** | **Aviso quando as prioridades competem** (regra nova `volume.prioridade.competicao`): com 2 ou mais prioridades e algum prioritário abaixo da meta, um aviso por programa: "Seus focos competem pelo mesmo tempo: {A} chegou a {x} de {meta} séries e {B} a {y} de {meta}. Com {dias} × {min} min não cabe tudo. Para o foco render, escolha 1 ou 2 grupos, ou aumente os minutos ou os dias." E uma nota para "pernas": "são 3 músculos (frente da coxa, posterior e panturrilha): como foco, pede o triplo de séries de 'peito'." | consenso | Na grade, aparece em ~metade dos programas com 2 ou 3 prioridades (54% a 67%, A.5). Nas personas: Bruno (4 prioridades) e Carla (4) receberiam o aviso se algum prioritário ficar abaixo da meta; Ana e Diego (2) idem. | aviso demais: um por programa, nunca por dia |
| D-3 | **Recomendar até 2 grupos no cadastro**, sem bloquear: "Escolha até 2 para foco; com mais, o foco se divide." | consenso | Menos programas com 3 ou 4 prioridades; a fatia por prioridade sobe. Não muda os programas das personas (o cadastro delas é fixo). | se virar bloqueio, tira liberdade: não bloquear |
| D-4 | **A prioridade puxa frequência**: quando a meta do prioritário passa do teto por sessão e a divisão o treina 1 vez por semana, ativar a vaga do prioritário noutro dia (ou preferir a divisão em que ele treina 2 vezes). Cobre também a "2ª vaga do prioritário quando há tempo" que está no backlog desde a auditoria de 02/11 (achado 5). | moderada (`pelland2026`, `remmert2025`) | Esperado: queda do "prioritário abaixo da meta" no avançado, sobretudo pernas (96%) e braços (93%). Precisa de medição própria antes de aprovar (muda as vagas e a divisão). | muda os programas de quem tem prioridade; teste novo para a escolha da divisão |
| D-5 | **Modo "só este grupo"** (não existe hoje): se vier a existir, nunca zerar os outros; usar o piso de manutenção (1 a 3 séries pesadas por músculo por semana) e avisar que a força geral cai mais que a massa. | moderada | Cada dia ganharia ~1 exercício de manutenção. | acima de 60 anos, 1 a 3 pode não bastar (`bickel2011`); o app não pergunta a idade |

**Minha recomendação**: aprovar D-1 e D-2 agora (texto e aviso, sem mudar o treino); D-4 como próximo passo, medido na grade antes de entrar (é a mudança grande: muda o que "prioridade" faz nas vagas); D-3 só se o Gustavo quiser orientar o cadastro; D-5 fica no backlog, porque o modo não existe.

## Parte E. As opções para a vaga sem exercício possível

(em andamento)

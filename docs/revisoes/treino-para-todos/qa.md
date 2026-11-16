# QA da etapa 2: a régua e os 20 cuidados, por pacote e por grupo

> Sessão "treino para todos". Cada pacote da etapa 2 acrescenta uma seção aqui. O "antes" é sempre a `main` de antes da etapa 2 (`medidas/hoje/`); o "depois" é o gerador do app no ramo, com os pacotes já feitos. As medidas saem de `scripts/auditoria/retrato.ts` (680.625 programas fictícios) e a comparação, de `scripts/auditoria/comparar-retratos.ts`. A conta ponderada usa pesos que são estimativa (`diagnostico.md`, seção 1.2).

## O critério de pronto, e onde ele está

| Critério | Depois do pacote 1 |
|---|---|
| Nenhum defeito da régua pior que na `main`, em nenhum grupo | **cumprido**: nos 44 grupos e em todos os recortes mais finos, a contagem de cada um dos 9 defeitos é igual ou menor |
| O pior grupo melhor do que era | **ainda não**: dor forte no cotovelo, 50,0% antes e depois (pacote 3) |
| Revisão cega com nenhuma pessoa pior e as notas médias maiores | notas médias maiores (5,5 · 5,6 · 5,2 → 5,8 · 5,8 · 5,4); nenhuma soma abaixo da de antes na versão adotada, fora o Bruno em uma das duas rodadas (0 e −0,3); detalhes em [`pacote-1.md`](pacote-1.md), seção 5 |
| Toda regra com selo, fonte e teste | `tempo.sobra-series`, `tempo.sobra` e `volume.semanal.alvo` reescritas em `regras.md` (consenso; fontes na linha); `tests/unit/tempo-que-sobra.test.ts` |
| `npm run check`, `npm run test:e2e`, `npm run auditoria:verificar` | `check` limpo (937 testes), `test:e2e` limpo (157) e `auditoria:verificar` limpo (39 arquivos idênticos nas duas rodadas; nenhum defeito acima da linha de base da régua) |
| `src/engine/` e as telas sem mudança | sem mudança: o pacote mexe em `src/domain/gerador`, `src/domain/regras` e nos dados gerados a partir de `docs/pesquisa/` |

## Pacote 1 (o tempo que sobra vira série em todos os dias)

Arquivos: [`medidas/hoje/retrato.md`](medidas/hoje/retrato.md) (antes) e [`medidas/pacote-1/retrato.md`](medidas/pacote-1/retrato.md) (depois).

### A régua oficial e os 20 cuidados, na população inteira

"defeito" e "nota" são os dois tipos de medida: o defeito é o que não pode piorar; a nota é um sinal para olhar.

| medida | grade: antes | depois | ponderada: antes | depois |
| --- | ---: | ---: | ---: | ---: |
| **régua oficial: programas sem nenhum defeito** | 80,3% | 83,6% | 79,0% | 94,4% |
| régua, defeito A2 | 10,6% | 10,6% | 2,0% | 2,0% |
| régua, defeito A3 | 4,0% | 4,0% | 3,0% | 3,0% |
| régua, defeito A4 | 3,2% | 0,0% | 15,2% | 0,0% |
| régua, defeito B1 | 0,4% | 0,4% | 0,2% | 0,2% |
| régua, defeito C1 | 1,7% | 1,7% | 0,1% | 0,1% |
| régua, defeito D1 | 0,5% | 0,5% | 0,4% | 0,4% |
| régua, defeito D3 | 0,1% | 0,1% | 0,0% | 0,0% |
| régua, defeito E1 | 0,1% | 0,0% | 0,2% | 0,0% |
| régua, defeito seguranca | 0,0% | 0,0% | 0,0% | 0,0% |
| régua, nota A1 | 20,2% | 20,2% | 4,6% | 4,6% |
| régua, nota A5 | 22,5% | 21,1% | 13,5% | 10,9% |
| régua, nota B2 | 16,6% | 16,6% | 5,5% | 5,5% |
| régua, nota B3 | 7,0% | 7,0% | 3,9% | 3,9% |
| régua, nota C2 | 9,7% | 9,7% | 7,2% | 7,2% |
| régua, nota G1 | 14,4% | 14,4% | 59,8% | 59,8% |
| **os 20 cuidados: programas sem nenhum defeito** | 36,3% | 42,4% | 35,9% | 56,6% |
| `c01a` dia que começa por um isolador havendo multiarticular (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01b` multiarticular depois de isolador (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01c` o multiarticular mais técnico (complexidade 3) não é o 1º da sua região (nota) | 12,5% | 12,5% | 9,9% | 9,9% |
| `c01d` abdominal antes de outro exercício (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c02a` exercícios por dia fora da faixa dos minutos (A1) (nota) | 20,2% | 20,2% | 4,6% | 4,6% |
| `c02b` séries demais para os minutos (acima de 0,45 por minuto) (nota) | 1,7% | 1,7% | 1,2% | 1,2% |
| `c02c` dia de 5 exercícios ou mais com 2 séries em todos (nota) | 24,0% | 20,5% | 21,8% | 15,1% |
| `c03a` dia mais longo acima de 110% dos minutos (A3) (defeito) | 4,0% | 4,0% | 3,0% | 3,0% |
| `c03b` dia típico abaixo de 70% dos minutos, sem o aviso (A4) (defeito) | 3,2% | 0,0% | 15,2% | 0,0% |
| `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso) (nota) | 38,3% | 36,1% | 24,7% | 17,9% |
| `c03d` dia típico abaixo de 85% dos minutos (nota) | 53,9% | 51,3% | 45,8% | 36,3% |
| `c04a` músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível (defeito) | 7,4% | 7,4% | 10,4% | 10,4% |
| `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível (defeito) | 12,5% | 12,0% | 21,3% | 20,5% |
| `c04f` músculo sem exercício direto (só séries indiretas) havendo exercício possível (nota) | 14,7% | 14,7% | 24,5% | 24,5% |
| `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%) (defeito) | 37,9% | 35,2% | 28,1% | 18,6% |
| `c04d` algum músculo abaixo da faixa do nível (havendo exercício) (nota) | 81,2% | 81,1% | 78,1% | 78,0% |
| `c04e` algum músculo acima da faixa do nível (nota) | 21,4% | 21,4% | 12,4% | 12,4% |
| `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1) (defeito) | 0,5% | 0,5% | 0,4% | 0,4% |
| `c05b` quadríceps ÷ posteriores fora de 0,5 a 2 (D3) (defeito) | 0,1% | 0,1% | 0,0% | 0,0% |
| `c05c` ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás (nota) | 4,2% | 4,2% | 0,5% | 0,5% |
| `c06a` foco abaixo da meta com tempo e exercício (C1) (defeito) | 1,7% | 1,7% | 0,1% | 0,1% |
| `c06b` o foco não passa da mediana dos outros (C2) (nota) | 9,7% | 9,7% | 7,2% | 7,2% |
| `c06c` o foco fica a menos de 1,3 vez a mediana dos outros (nota) | 15,8% | 15,7% | 13,3% | 13,1% |
| `c06d` com foco, outro músculo com menos de 4 séries havendo exercício (defeito) | 12,3% | 12,0% | 13,8% | 13,4% |
| `c07a` músculo com 8 séries diretas ou mais treinado num dia só (nota) | 2,0% | 2,0% | 0,7% | 0,7% |
| `c07b` mais de 10 séries de um músculo num dia (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c07c` o mesmo músculo com 3 séries diretas ou mais em dias seguidos (nota) | 13,8% | 14,5% | 4,8% | 5,3% |
| `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa (nota) | 32,9% | 32,9% | 82,1% | 82,1% |
| `c08b` exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa (nota) | 73,9% | 73,9% | 93,3% | 93,3% |
| `c09a` o mesmo exercício em todos os dias havendo outro do mesmo nível (B1) (defeito) | 0,4% | 0,4% | 0,2% | 0,2% |
| `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2) (nota) | 16,6% | 16,6% | 5,5% | 5,5% |
| `c10a` dois exercícios da mesma função no mesmo dia (nota) | 31,9% | 31,9% | 14,2% | 14,2% |
| `c10b` três exercícios ou mais do mesmo músculo no mesmo dia (nota) | 6,3% | 6,3% | 17,3% | 17,3% |
| `c11a` peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado (nota) | 0,8% | 0,8% | 1,0% | 1,0% |
| `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau) (defeito) | 5,0% | 5,0% | 2,5% | 2,5% |
| `c13a` dois exercícios seguidos que carregam a lombar sem apoio (nota) | 10,5% | 10,5% | 30,2% | 30,2% |
| `c13b` três exercícios ou mais no dia que carregam a lombar sem apoio (nota) | 4,1% | 4,1% | 4,7% | 4,7% |
| `c13c` três exercícios seguidos que dependem da pegada (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c14a` exercício impossível, acima da complexidade ou numa região com dor acima de 5 (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2) (defeito) | 10,6% | 10,6% | 2,0% | 2,0% |
| `c14c` o programa perdeu um dia inteiro (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c15a` iniciante com bi-set ou drop set (nota) | 9,5% | 9,5% | 16,6% | 16,6% |
| `c15b` bi-set entre dois multiarticulares (nota) | 21,5% | 21,5% | 28,5% | 28,5% |
| `c15c` bi-set em que os dois carregam a lombar ou dependem da pegada (nota) | 1,9% | 1,9% | 5,2% | 5,2% |
| `c15d` bi-set com os dois exercícios separados na lista do dia (nota) | 6,3% | 6,3% | 5,4% | 5,4% |
| `c16a` iniciante com mais de 12 exercícios diferentes na semana (nota) | 18,9% | 18,9% | 38,7% | 38,7% |
| `c16b` intermediário ou avançado com a média dos músculos abaixo da faixa do nível (nota) | 47,9% | 44,2% | 51,6% | 42,9% |
| `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c20a` o texto "cabem cerca de N exercícios" com um dia acima de N (defeito) | 5,0% | 5,0% | 5,7% | 5,7% |
| `c20b` o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4 (defeito) | 7,6% | 0,0% | 23,2% | 0,0% |
| uso do tempo (dia típico ÷ minutos pedidos) | 76,5% | 77,8% | 81,9% | 85,9% |
| séries por semana (média) | 56,39 | 57,90 | 58,37 | 62,51 |
| séries por músculo por semana (média, fora o abdômen) | 8,67 | 8,87 | 7,28 | 7,81 |
| exercícios diferentes por semana (média) | 15,07 | 15,07 | 20,07 | 20,07 |

### A régua oficial por grupo

Nenhum defeito sobe mais de 0,05 ponto em nenhum grupo (a última coluna fica vazia em todos); na contagem bruta, sem tolerância, também não sobe em nenhum recorte.

| grupo | régua sem defeito: antes | depois | defeitos que pioram no grupo (antes → depois) |
| --- | ---: | ---: | --- |
| dias:2 | 85,4% | 85,8% | — |
| dias:3 | 87,3% | 88,6% | — |
| dias:4 | 79,8% | 83,1% | — |
| dias:5 | 74,8% | 80,2% | — |
| dias:6 | 74,3% | 80,5% | — |
| dor:cotovelo 4 | 86,4% | 92,5% | — |
| dor:cotovelo 7 | 50,0% | 50,0% | — |
| dor:joelho 4 | 86,4% | 92,5% | — |
| dor:joelho 7 | 84,6% | 84,7% | — |
| dor:lombar 4 | 86,4% | 92,5% | — |
| dor:lombar 7 | 83,1% | 83,1% | — |
| dor:ombro 4 | 86,4% | 92,5% | — |
| dor:ombro 7 | 65,4% | 65,4% | — |
| dor:punho 4 | 86,4% | 92,5% | — |
| dor:punho 7 | 74,5% | 74,6% | — |
| dor:quadril 4 | 86,4% | 92,5% | — |
| dor:quadril 7 | 62,6% | 62,6% | — |
| dor:sem dor | 86,4% | 92,5% | — |
| dor:tornozelo 4 | 86,4% | 92,5% | — |
| dor:tornozelo 7 | 93,7% | 93,9% | — |
| foco:abdomen | 84,0% | 87,8% | — |
| foco:bracos | 84,1% | 87,6% | — |
| foco:costas | 79,3% | 83,2% | — |
| foco:gluteos | 80,6% | 83,9% | — |
| foco:inferiores | 72,8% | 74,4% | — |
| foco:nenhum | 83,2% | 87,8% | — |
| foco:ombros | 85,4% | 88,9% | — |
| foco:peito | 78,2% | 82,2% | — |
| foco:peito+costas | 77,6% | 81,3% | — |
| foco:pernas | 79,2% | 81,0% | — |
| foco:superiores | 79,3% | 81,8% | — |
| grupo:atalho | 65,5% | 80,0% | — |
| grupo:item | 85,8% | 85,8% | — |
| grupo:par | 68,2% | 75,5% | — |
| grupo:persona | 66,8% | 77,4% | — |
| grupo:vazio | 93,3% | 93,3% | — |
| min:30 | 67,6% | 67,6% | — |
| min:45 | 85,7% | 86,1% | — |
| min:60 | 86,4% | 89,7% | — |
| min:75 | 82,9% | 88,3% | — |
| min:90 | 79,0% | 86,5% | — |
| nivel:avancado | 78,6% | 81,6% | — |
| nivel:iniciante | 81,3% | 84,8% | — |
| nivel:intermediario | 81,1% | 84,4% | — |

Pior grupo antes: dor:cotovelo 7 (50,0%). Pior grupo depois: dor:cotovelo 7 (50,0%).

## Pacote 0 (os exercícios com o joelho apoiado saem com dor forte no joelho; a vaga que a dor esvazia recebe o mesmo músculo)

Arquivos: [`medidas/main-com-a-regua-de-14-11/retrato.md`](medidas/main-com-a-regua-de-14-11/retrato.md) (antes) e [`medidas/pacote-0/retrato.md`](medidas/pacote-0/retrato.md) (depois, com os pacotes 1 e 0).

**O "antes" foi medido de novo.** O pacote 0 muda um dado da biblioteca (8 exercícios passam a carregar o joelho), e a régua usa esse dado para o defeito de segurança ("exercício numa região com dor acima de 5"). Por isso os programas da `main` foram gerados pelo gerador da `main` e medidos com a régua de agora: é assim que aparece o que a `main` prescrevia e a régua antiga não via.

| Critério | Depois do pacote 0 |
|---|---|
| Nenhum defeito da régua pior que na `main`, em nenhum grupo | **cumprido com uma ressalva**: nenhum defeito sobe mais de 0,05 ponto em nenhum dos 44 grupos, e nos totais nenhum sobe; na contagem bruta, 28 pares grupo × defeito sobem de 1 a 8 programas (o maior: com dor 7 no joelho, o dia acima do tempo vai de 2.000 para 2.008 de 45.375 programas). São programas que cruzam um limite da régua porque a lista de exercícios possíveis encolheu |
| O defeito de segurança | na `main`, 7.773 de 45.375 programas com dor 7 no joelho (17,1% na grade; 47,5% na ponderada) tinham um exercício com o joelho apoiado; agora, 0 |
| O pior grupo melhor do que era | **ainda não**: dor forte no cotovelo, 50,0% antes e depois (pacote 3) |
| Revisão cega com nenhuma pessoa pior e as notas médias maiores | notas médias maiores (5,2 · 5,9 · 5,2 → 6,0 · 6,2 · 5,5, em 12 pessoas com dor); **2 pessoas abaixo**: as duas em que a puxada ajoelhada era o único puxar vertical possível (−1,0 e −0,7 na soma); detalhes em [`pacote-0.md`](pacote-0.md), seção 5 |
| Toda regra com selo, fonte e teste | `seguranca.dor.programa` e `selecao.dia-sem-principal` em `regras.md` (consenso); `tests/unit/dor-no-joelho.test.ts` e `tests/unit/articulacoes.test.ts` |
| `npm run check`, `npm run test:e2e`, `npm run auditoria:verificar` | `check` limpo (945 testes), `test:e2e` limpo (157) e `auditoria:verificar` limpo (39 arquivos idênticos nas duas rodadas; nenhum defeito acima da linha de base da régua) |

### A régua oficial e os 20 cuidados, na população inteira (main, com a régua de agora → ramo, com os pacotes 1 e 0)

| medida | grade: antes | depois | ponderada: antes | depois |
| --- | ---: | ---: | ---: | ---: |
| **régua oficial: programas sem nenhum defeito** | 79,4% | 83,6% | 78,1% | 94,4% |
| régua, defeito A2 | 10,6% | 10,6% | 2,0% | 2,0% |
| régua, defeito A3 | 4,0% | 4,0% | 3,0% | 3,0% |
| régua, defeito A4 | 3,2% | 0,0% | 15,2% | 0,0% |
| régua, defeito B1 | 0,4% | 0,4% | 0,2% | 0,2% |
| régua, defeito C1 | 1,7% | 1,7% | 0,1% | 0,1% |
| régua, defeito D1 | 0,5% | 0,5% | 0,4% | 0,4% |
| régua, defeito D3 | 0,1% | 0,1% | 0,0% | 0,0% |
| régua, defeito E1 | 0,1% | 0,0% | 0,2% | 0,0% |
| régua, defeito seguranca | 1,1% | 0,0% | 1,0% | 0,0% |
| régua, nota A1 | 20,2% | 20,2% | 4,6% | 4,6% |
| régua, nota A5 | 22,5% | 21,2% | 13,5% | 10,9% |
| régua, nota B2 | 16,6% | 16,6% | 5,5% | 5,5% |
| régua, nota B3 | 7,0% | 7,0% | 3,9% | 3,9% |
| régua, nota C2 | 9,7% | 9,7% | 7,2% | 7,2% |
| régua, nota G1 | 14,4% | 14,3% | 59,8% | 59,8% |
| **os 20 cuidados: programas sem nenhum defeito** | 35,8% | 42,4% | 35,4% | 56,6% |
| `c01a` dia que começa por um isolador havendo multiarticular (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01b` multiarticular depois de isolador (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01c` o multiarticular mais técnico (complexidade 3) não é o 1º da sua região (nota) | 12,5% | 12,5% | 9,9% | 9,9% |
| `c01d` abdominal antes de outro exercício (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c02a` exercícios por dia fora da faixa dos minutos (A1) (nota) | 20,2% | 20,2% | 4,6% | 4,6% |
| `c02b` séries demais para os minutos (acima de 0,45 por minuto) (nota) | 1,7% | 1,7% | 1,2% | 1,2% |
| `c02c` dia de 5 exercícios ou mais com 2 séries em todos (nota) | 24,0% | 20,5% | 21,8% | 15,1% |
| `c03a` dia mais longo acima de 110% dos minutos (A3) (defeito) | 4,0% | 4,0% | 3,0% | 3,0% |
| `c03b` dia típico abaixo de 70% dos minutos, sem o aviso (A4) (defeito) | 3,2% | 0,0% | 15,2% | 0,0% |
| `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso) (nota) | 38,3% | 36,1% | 24,7% | 17,9% |
| `c03d` dia típico abaixo de 85% dos minutos (nota) | 53,9% | 51,3% | 45,8% | 36,3% |
| `c04a` músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível (defeito) | 7,4% | 7,4% | 10,4% | 10,4% |
| `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível (defeito) | 12,5% | 12,0% | 21,3% | 20,5% |
| `c04f` músculo sem exercício direto (só séries indiretas) havendo exercício possível (nota) | 14,7% | 14,7% | 24,5% | 24,5% |
| `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%) (defeito) | 37,9% | 35,2% | 28,1% | 18,6% |
| `c04d` algum músculo abaixo da faixa do nível (havendo exercício) (nota) | 81,2% | 81,1% | 78,1% | 78,0% |
| `c04e` algum músculo acima da faixa do nível (nota) | 21,4% | 21,4% | 12,4% | 12,4% |
| `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1) (defeito) | 0,5% | 0,5% | 0,4% | 0,4% |
| `c05b` quadríceps ÷ posteriores fora de 0,5 a 2 (D3) (defeito) | 0,1% | 0,1% | 0,0% | 0,0% |
| `c05c` ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás (nota) | 4,2% | 4,2% | 0,5% | 0,5% |
| `c06a` foco abaixo da meta com tempo e exercício (C1) (defeito) | 1,7% | 1,7% | 0,1% | 0,1% |
| `c06b` o foco não passa da mediana dos outros (C2) (nota) | 9,7% | 9,7% | 7,2% | 7,2% |
| `c06c` o foco fica a menos de 1,3 vez a mediana dos outros (nota) | 15,8% | 15,7% | 13,3% | 13,1% |
| `c06d` com foco, outro músculo com menos de 4 séries havendo exercício (defeito) | 12,3% | 12,0% | 13,8% | 13,4% |
| `c07a` músculo com 8 séries diretas ou mais treinado num dia só (nota) | 2,0% | 2,0% | 0,7% | 0,7% |
| `c07b` mais de 10 séries de um músculo num dia (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c07c` o mesmo músculo com 3 séries diretas ou mais em dias seguidos (nota) | 13,8% | 14,5% | 4,8% | 5,3% |
| `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa (nota) | 32,9% | 32,8% | 82,1% | 82,1% |
| `c08b` exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa (nota) | 73,9% | 73,8% | 93,3% | 93,2% |
| `c09a` o mesmo exercício em todos os dias havendo outro do mesmo nível (B1) (defeito) | 0,4% | 0,4% | 0,2% | 0,2% |
| `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2) (nota) | 16,6% | 16,6% | 5,5% | 5,5% |
| `c10a` dois exercícios da mesma função no mesmo dia (nota) | 31,9% | 32,0% | 14,2% | 14,2% |
| `c10b` três exercícios ou mais do mesmo músculo no mesmo dia (nota) | 6,3% | 6,3% | 17,3% | 17,3% |
| `c11a` peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado (nota) | 0,8% | 0,8% | 1,0% | 1,0% |
| `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau) (defeito) | 5,0% | 5,0% | 2,5% | 2,5% |
| `c13a` dois exercícios seguidos que carregam a lombar sem apoio (nota) | 10,5% | 10,5% | 30,2% | 30,2% |
| `c13b` três exercícios ou mais no dia que carregam a lombar sem apoio (nota) | 4,1% | 4,1% | 4,7% | 4,7% |
| `c13c` três exercícios seguidos que dependem da pegada (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c14a` exercício impossível, acima da complexidade ou numa região com dor acima de 5 (defeito) | 1,1% | 0,0% | 1,0% | 0,0% |
| `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2) (defeito) | 10,6% | 10,6% | 2,0% | 2,0% |
| `c14c` o programa perdeu um dia inteiro (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c15a` iniciante com bi-set ou drop set (nota) | 9,5% | 9,5% | 16,6% | 16,6% |
| `c15b` bi-set entre dois multiarticulares (nota) | 21,5% | 21,5% | 28,5% | 28,4% |
| `c15c` bi-set em que os dois carregam a lombar ou dependem da pegada (nota) | 1,9% | 1,9% | 5,2% | 5,2% |
| `c15d` bi-set com os dois exercícios separados na lista do dia (nota) | 6,3% | 6,3% | 5,4% | 5,4% |
| `c16a` iniciante com mais de 12 exercícios diferentes na semana (nota) | 18,9% | 18,9% | 38,7% | 38,7% |
| `c16b` intermediário ou avançado com a média dos músculos abaixo da faixa do nível (nota) | 47,9% | 44,2% | 51,6% | 42,9% |
| `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c20a` o texto "cabem cerca de N exercícios" com um dia acima de N (defeito) | 5,0% | 5,0% | 5,7% | 5,7% |
| `c20b` o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4 (defeito) | 7,6% | 0,0% | 23,2% | 0,0% |
| uso do tempo (dia típico ÷ minutos pedidos) | 76,5% | 77,8% | 81,9% | 85,9% |
| séries por semana (média) | 56,39 | 57,90 | 58,37 | 62,52 |
| séries por músculo por semana (média, fora o abdômen) | 8,67 | 8,87 | 7,28 | 7,81 |
| exercícios diferentes por semana (média) | 15,07 | 15,06 | 20,07 | 20,04 |

### A régua oficial por grupo

| grupo | régua sem defeito: antes | depois | defeitos que pioram no grupo (antes → depois) |
| --- | ---: | ---: | --- |
| dias:2 | 84,7% | 85,8% | — |
| dias:3 | 86,2% | 88,6% | — |
| dias:4 | 78,8% | 83,1% | — |
| dias:5 | 73,8% | 80,2% | — |
| dias:6 | 73,3% | 80,5% | — |
| dor:cotovelo 4 | 86,4% | 92,5% | — |
| dor:cotovelo 7 | 50,0% | 50,0% | — |
| dor:joelho 4 | 86,4% | 92,6% | — |
| dor:joelho 7 | 69,8% | 84,6% | — |
| dor:lombar 4 | 86,4% | 92,5% | — |
| dor:lombar 7 | 83,1% | 83,1% | — |
| dor:ombro 4 | 86,4% | 92,5% | — |
| dor:ombro 7 | 65,4% | 65,4% | — |
| dor:punho 4 | 86,4% | 92,5% | — |
| dor:punho 7 | 74,5% | 74,9% | — |
| dor:quadril 4 | 86,4% | 92,5% | — |
| dor:quadril 7 | 62,6% | 62,6% | — |
| dor:sem dor | 86,4% | 92,5% | — |
| dor:tornozelo 4 | 86,4% | 92,5% | — |
| dor:tornozelo 7 | 93,7% | 93,9% | — |
| foco:abdomen | 83,0% | 87,8% | — |
| foco:bracos | 83,1% | 87,6% | — |
| foco:costas | 78,3% | 83,2% | — |
| foco:gluteos | 79,5% | 84,0% | — |
| foco:inferiores | 71,8% | 74,4% | — |
| foco:nenhum | 82,2% | 87,8% | — |
| foco:ombros | 84,4% | 88,9% | — |
| foco:peito | 77,3% | 82,2% | — |
| foco:peito+costas | 76,7% | 81,3% | — |
| foco:pernas | 78,3% | 81,0% | — |
| foco:superiores | 78,4% | 81,8% | — |
| grupo:atalho | 63,4% | 80,1% | — |
| grupo:item | 85,3% | 85,8% | — |
| grupo:par | 65,6% | 75,5% | — |
| grupo:persona | 64,6% | 77,4% | — |
| grupo:vazio | 93,3% | 93,3% | — |
| min:30 | 66,9% | 67,7% | — |
| min:45 | 84,7% | 86,1% | — |
| min:60 | 85,3% | 89,7% | — |
| min:75 | 81,9% | 88,3% | — |
| min:90 | 78,0% | 86,5% | — |
| nivel:avancado | 77,6% | 81,6% | — |
| nivel:iniciante | 80,4% | 84,8% | — |
| nivel:intermediario | 80,1% | 84,5% | — |

Pior grupo antes: dor:cotovelo 7 (50,0%). Pior grupo depois: dor:cotovelo 7 (50,0%).

## Pacote 3 (a semana remontada quando a dor esvazia um dia, com o Corpo todo 6x; o mesmo exercício nunca em todos os dias; 30 minutos; duplas juntas)

Arquivos: [`medidas/main-com-a-regua-de-14-11/retrato.md`](medidas/main-com-a-regua-de-14-11/retrato.md) (antes) e [`medidas/pacote-3/retrato.md`](medidas/pacote-3/retrato.md) (depois, com os pacotes 1, 0 e 3).

| Critério | Depois do pacote 3 |
|---|---|
| Nenhum defeito da régua pior que na `main`, em nenhum grupo | **cumprido, com a mesma ressalva do pacote 0**: nenhum defeito sobe mais de 0,05 ponto em nenhum grupo. Na contagem bruta, em relação ao pacote 0 sobe 1 par grupo × defeito, em 1 programa (dor 7 no ombro, C1: 487 → 488); em relação à `main`, ficam 4 pares com 1 a 5 programas a mais, herdados do pacote 0 |
| O pior grupo melhor do que era | **cumprido pela primeira vez**: dor forte no cotovelo, de 50,0% para 75,0% na grade e de 42,7% para 85,1% na ponderada. O pior grupo passa a ser o dos treinos de 30 min (72,9%; era 66,9%) |
| Revisão cega com nenhuma pessoa pior e as notas médias maiores | notas médias maiores (5,1 · 5,3 · 4,9 → 5,9 · 5,7 · 5,4, em 14 pessoas); nove sobem, quatro iguais, **uma cai (−3,3)**: é uma pessoa que o pacote 3 não muda (as mesmas duas páginas tiveram +0,3 na revisão do pacote 0); o que mudou nela foi o pacote 1. A revisão foi feita antes da regra do Corpo todo 6x. Detalhes em [`pacote-3.md`](pacote-3.md), seção 6 |
| Toda regra com selo, fonte e teste | `selecao.dia-sem-principal`, `selecao.variacoes-equivalentes`, `tempo.musculo-protegido` e `tempo.superserie` em `regras.md`; `tests/unit/semana-com-dor.test.ts` |
| `npm run check`, `npm run test:e2e`, `npm run auditoria:verificar` | `check` limpo (955 testes), `test:e2e` limpo (157) e `auditoria:verificar` limpo (39 arquivos idênticos nas duas rodadas; nenhum defeito acima da linha de base da régua) |

### A régua oficial e os 20 cuidados, na população inteira (main, com a régua de agora → ramo, com os pacotes 1, 0 e 3)

| medida | grade: antes | depois | ponderada: antes | depois |
| --- | ---: | ---: | ---: | ---: |
| **régua oficial: programas sem nenhum defeito** | 79,4% | 90,6% | 78,1% | 96,4% |
| régua, defeito A2 | 10,6% | 4,3% | 2,0% | 0,6% |
| régua, defeito A3 | 4,0% | 3,6% | 3,0% | 2,6% |
| régua, defeito A4 | 3,2% | 0,0% | 15,2% | 0,0% |
| régua, defeito B1 | 0,4% | 0,0% | 0,2% | 0,0% |
| régua, defeito C1 | 1,7% | 1,5% | 0,1% | 0,1% |
| régua, defeito D1 | 0,5% | 0,5% | 0,4% | 0,4% |
| régua, defeito D3 | 0,1% | 0,1% | 0,0% | 0,0% |
| régua, defeito E1 | 0,1% | 0,0% | 0,2% | 0,0% |
| régua, defeito seguranca | 1,1% | 0,0% | 1,0% | 0,0% |
| régua, nota A1 | 20,2% | 14,2% | 4,6% | 2,3% |
| régua, nota A5 | 22,5% | 17,3% | 13,5% | 9,7% |
| régua, nota B2 | 16,6% | 18,7% | 5,5% | 5,5% |
| régua, nota B3 | 7,0% | 7,5% | 3,9% | 3,8% |
| régua, nota C2 | 9,7% | 10,0% | 7,2% | 7,2% |
| régua, nota G1 | 14,4% | 14,5% | 59,8% | 59,7% |
| **os 20 cuidados: programas sem nenhum defeito** | 35,8% | 47,0% | 35,4% | 57,9% |
| `c01a` dia que começa por um isolador havendo multiarticular (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01b` multiarticular depois de isolador (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01c` o multiarticular mais técnico (complexidade 3) não é o 1º da sua região (nota) | 12,5% | 12,4% | 9,9% | 9,9% |
| `c01d` abdominal antes de outro exercício (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c02a` exercícios por dia fora da faixa dos minutos (A1) (nota) | 20,2% | 14,2% | 4,6% | 2,3% |
| `c02b` séries demais para os minutos (acima de 0,45 por minuto) (nota) | 1,7% | 1,5% | 1,2% | 1,0% |
| `c02c` dia de 5 exercícios ou mais com 2 séries em todos (nota) | 24,0% | 22,3% | 21,8% | 15,4% |
| `c03a` dia mais longo acima de 110% dos minutos (A3) (defeito) | 4,0% | 3,6% | 3,0% | 2,6% |
| `c03b` dia típico abaixo de 70% dos minutos, sem o aviso (A4) (defeito) | 3,2% | 0,0% | 15,2% | 0,0% |
| `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso) (nota) | 38,3% | 34,1% | 24,7% | 17,2% |
| `c03d` dia típico abaixo de 85% dos minutos (nota) | 53,9% | 49,9% | 45,8% | 35,9% |
| `c04a` músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível (defeito) | 7,4% | 7,4% | 10,4% | 10,4% |
| `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível (defeito) | 12,5% | 12,0% | 21,3% | 20,5% |
| `c04f` músculo sem exercício direto (só séries indiretas) havendo exercício possível (nota) | 14,7% | 14,8% | 24,5% | 24,5% |
| `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%) (defeito) | 37,9% | 33,2% | 28,1% | 18,2% |
| `c04d` algum músculo abaixo da faixa do nível (havendo exercício) (nota) | 81,2% | 80,1% | 78,1% | 77,8% |
| `c04e` algum músculo acima da faixa do nível (nota) | 21,4% | 23,0% | 12,4% | 12,9% |
| `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1) (defeito) | 0,5% | 0,5% | 0,4% | 0,4% |
| `c05b` quadríceps ÷ posteriores fora de 0,5 a 2 (D3) (defeito) | 0,1% | 0,1% | 0,0% | 0,0% |
| `c05c` ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás (nota) | 4,2% | 4,2% | 0,5% | 0,5% |
| `c06a` foco abaixo da meta com tempo e exercício (C1) (defeito) | 1,7% | 1,5% | 0,1% | 0,1% |
| `c06b` o foco não passa da mediana dos outros (C2) (nota) | 9,7% | 10,0% | 7,2% | 7,2% |
| `c06c` o foco fica a menos de 1,3 vez a mediana dos outros (nota) | 15,8% | 16,3% | 13,3% | 13,2% |
| `c06d` com foco, outro músculo com menos de 4 séries havendo exercício (defeito) | 12,3% | 11,9% | 13,8% | 13,4% |
| `c07a` músculo com 8 séries diretas ou mais treinado num dia só (nota) | 2,0% | 2,0% | 0,7% | 0,7% |
| `c07b` mais de 10 séries de um músculo num dia (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c07c` o mesmo músculo com 3 séries diretas ou mais em dias seguidos (nota) | 13,8% | 16,4% | 4,8% | 5,9% |
| `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa (nota) | 32,9% | 31,6% | 82,1% | 82,0% |
| `c08b` exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa (nota) | 73,9% | 73,4% | 93,3% | 93,2% |
| `c09a` o mesmo exercício em todos os dias havendo outro do mesmo nível (B1) (defeito) | 0,4% | 0,0% | 0,2% | 0,0% |
| `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2) (nota) | 16,6% | 18,7% | 5,5% | 5,5% |
| `c10a` dois exercícios da mesma função no mesmo dia (nota) | 31,9% | 29,4% | 14,2% | 13,8% |
| `c10b` três exercícios ou mais do mesmo músculo no mesmo dia (nota) | 6,3% | 5,8% | 17,3% | 17,2% |
| `c11a` peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado (nota) | 0,8% | 0,8% | 1,0% | 1,0% |
| `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau) (defeito) | 5,0% | 5,0% | 2,5% | 2,5% |
| `c13a` dois exercícios seguidos que carregam a lombar sem apoio (nota) | 10,5% | 10,6% | 30,2% | 29,5% |
| `c13b` três exercícios ou mais no dia que carregam a lombar sem apoio (nota) | 4,1% | 4,0% | 4,7% | 4,6% |
| `c13c` três exercícios seguidos que dependem da pegada (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c14a` exercício impossível, acima da complexidade ou numa região com dor acima de 5 (defeito) | 1,1% | 0,0% | 1,0% | 0,0% |
| `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2) (defeito) | 10,6% | 4,3% | 2,0% | 0,6% |
| `c14c` o programa perdeu um dia inteiro (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c15a` iniciante com bi-set ou drop set (nota) | 9,5% | 9,4% | 16,6% | 16,5% |
| `c15b` bi-set entre dois multiarticulares (nota) | 21,5% | 21,6% | 28,5% | 28,4% |
| `c15c` bi-set em que os dois carregam a lombar ou dependem da pegada (nota) | 1,9% | 1,9% | 5,2% | 5,2% |
| `c15d` bi-set com os dois exercícios separados na lista do dia (nota) | 6,3% | 0,0% | 5,4% | 0,0% |
| `c16a` iniciante com mais de 12 exercícios diferentes na semana (nota) | 18,9% | 19,3% | 38,7% | 38,8% |
| `c16b` intermediário ou avançado com a média dos músculos abaixo da faixa do nível (nota) | 47,9% | 42,6% | 51,6% | 42,5% |
| `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c20a` o texto "cabem cerca de N exercícios" com um dia acima de N (defeito) | 5,0% | 4,8% | 5,7% | 5,7% |
| `c20b` o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4 (defeito) | 7,6% | 0,0% | 23,2% | 0,0% |
| uso do tempo (dia típico ÷ minutos pedidos) | 76,5% | 79,0% | 81,9% | 86,2% |
| séries por semana (média) | 56,39 | 58,89 | 58,37 | 62,74 |
| séries por músculo por semana (média, fora o abdômen) | 8,67 | 9,00 | 7,28 | 7,84 |
| exercícios diferentes por semana (média) | 15,07 | 15,18 | 20,07 | 20,10 |

### A régua oficial por grupo

| grupo | régua sem defeito: antes | depois | defeitos que pioram no grupo (antes → depois) |
| --- | ---: | ---: | --- |
| dias:2 | 84,7% | 87,4% | — |
| dias:3 | 86,2% | 90,7% | — |
| dias:4 | 78,8% | 92,4% | — |
| dias:5 | 73,8% | 91,1% | — |
| dias:6 | 73,3% | 91,3% | — |
| dor:cotovelo 4 | 86,4% | 93,0% | — |
| dor:cotovelo 7 | 50,0% | 75,0% | — |
| dor:joelho 4 | 86,4% | 93,1% | — |
| dor:joelho 7 | 69,8% | 93,4% | — |
| dor:lombar 4 | 86,4% | 93,0% | — |
| dor:lombar 7 | 83,1% | 91,9% | — |
| dor:ombro 4 | 86,4% | 93,0% | — |
| dor:ombro 7 | 65,4% | 89,8% | — |
| dor:punho 4 | 86,4% | 93,0% | — |
| dor:punho 7 | 74,5% | 81,3% | — |
| dor:quadril 4 | 86,4% | 93,0% | — |
| dor:quadril 7 | 62,6% | 89,5% | — |
| dor:sem dor | 86,4% | 93,0% | — |
| dor:tornozelo 4 | 86,4% | 93,0% | — |
| dor:tornozelo 7 | 93,7% | 93,9% | — |
| foco:abdomen | 83,0% | 95,2% | — |
| foco:bracos | 83,1% | 95,0% | — |
| foco:costas | 78,3% | 90,7% | — |
| foco:gluteos | 79,5% | 89,8% | — |
| foco:inferiores | 71,8% | 79,3% | — |
| foco:nenhum | 82,2% | 95,9% | — |
| foco:ombros | 84,4% | 96,6% | — |
| foco:peito | 77,3% | 89,4% | — |
| foco:peito+costas | 76,7% | 88,4% | — |
| foco:pernas | 78,3% | 87,9% | — |
| foco:superiores | 78,4% | 88,5% | — |
| grupo:atalho | 63,4% | 91,0% | — |
| grupo:item | 85,3% | 91,0% | — |
| grupo:par | 65,6% | 87,6% | — |
| grupo:persona | 64,6% | 89,1% | — |
| grupo:vazio | 93,3% | 93,4% | — |
| min:30 | 66,9% | 72,9% | — |
| min:45 | 84,7% | 93,1% | — |
| min:60 | 85,3% | 97,2% | — |
| min:75 | 81,9% | 95,8% | — |
| min:90 | 78,0% | 94,0% | — |
| nivel:avancado | 77,6% | 88,1% | — |
| nivel:iniciante | 80,4% | 92,1% | — |
| nivel:intermediario | 80,1% | 91,6% | — |

Pior grupo antes: dor:cotovelo 7 (50,0%). Pior grupo depois: min:30 (72,9%).

## Pacote 2 (a escolha entre exercícios equivalentes: ordem de referência, dois lados antes de um lado só, a lombar dentro do dia; e a trava do empurrar do foco)

Arquivos: [`medidas/main-com-a-regua-de-14-11/retrato.md`](medidas/main-com-a-regua-de-14-11/retrato.md) (antes) e [`medidas/pacote-2/retrato.md`](medidas/pacote-2/retrato.md) (depois, com os pacotes 1, 0, 3 e 2).

| Critério | Depois do pacote 2 |
|---|---|
| Nenhum defeito da régua pior que na `main`, em nenhum grupo | **cumprido só com ressalva, e a ressalva é maior que a dos pacotes anteriores**: nenhum defeito sobe mais de 0,1 ponto em nenhum grupo, e no total todos caem; na contagem bruta, 19 pares grupo × defeito ficam acima da `main` (242 ficam abaixo). Os maiores: foco abaixo da meta com tempo (C1) no avançado de 2 dias, 2.000 → 2.028 de 45.375; empurrar ÷ puxar (D1) nos cenários de dois aparelhos, 366 → 385 de 49.500, e nos das personas, 525 → 541 de 74.250. Os outros são de +1 a +9 programas. O que são e por que ficaram: [`pacote-2.md`](pacote-2.md), seção 3. **O Gustavo aceitou a ressalva em 16/11/2026, com as duas correções no backlog** |
| O pior grupo melhor do que era | cumprido: os treinos de 30 min, de 72,9% para 73,4% (na `main` o pior era a dor forte no cotovelo, 50,0%; hoje 75,1%) |
| Revisão cega com nenhuma pessoa pior e as notas médias maiores | notas médias maiores (5,94 · 6,31 · 5,75 → 6,06 · 6,61 · 5,97, em 12 pessoas, contra o pacote 3); seis sobem, quatro iguais, **duas caem 0,3** (uma nota de um revisor). A 1ª rodada achou duas pessoas piores com a regra dos dois lados na versão larga; a regra foi estreitada e a revisão refeita. Detalhes em [`pacote-2.md`](pacote-2.md), seção 5 |
| Toda regra com selo, fonte e teste | `selecao.funcao-da-vaga` (duas partes), `selecao.lombar-no-dia` (nova) e `volume.prioridade.foco-primeiro` em `regras.md`; `tests/unit/escolha-do-exercicio.test.ts` (23 testes) |
| `npm run check`, `npm run test:e2e`, `npm run auditoria:verificar` | `check` limpo (979 testes), `test:e2e` limpo (158; dez ajustados com autorização do Gustavo e um novo) e a auditoria em duas rodadas limpa (39 arquivos idênticos; nenhum defeito acima da linha de base da régua). Uma regra de `src/styles.css` mudou, com autorização (o número da tela da semana no zoom de 200%); detalhes em [`pacote-2.md`](pacote-2.md), seções 7 e 8 |

### A régua oficial e os 20 cuidados, na população inteira (main, com a régua de agora → ramo, com os pacotes 1, 0, 3 e 2)

| medida | grade: antes | depois | ponderada: antes | depois |
| --- | ---: | ---: | ---: | ---: |
| **régua oficial: programas sem nenhum defeito** | 79,4% | 90,7% | 78,1% | 96,8% |
| régua, defeito A2 | 10,6% | 4,3% | 2,0% | 0,5% |
| régua, defeito A3 | 4,0% | 3,4% | 3,0% | 2,4% |
| régua, defeito A4 | 3,2% | 0,0% | 15,2% | 0,0% |
| régua, defeito B1 | 0,4% | 0,0% | 0,2% | 0,0% |
| régua, defeito C1 | 1,7% | 1,5% | 0,1% | 0,1% |
| régua, defeito D1 | 0,5% | 0,5% | 0,4% | 0,3% |
| régua, defeito D3 | 0,1% | 0,1% | 0,0% | 0,0% |
| régua, defeito E1 | 0,1% | 0,0% | 0,2% | 0,0% |
| régua, defeito seguranca | 1,1% | 0,0% | 1,0% | 0,0% |
| régua, nota A1 | 20,2% | 14,2% | 4,6% | 2,4% |
| régua, nota A5 | 22,5% | 17,3% | 13,5% | 9,2% |
| régua, nota B2 | 16,6% | 18,7% | 5,5% | 5,5% |
| régua, nota B3 | 7,0% | 7,5% | 3,9% | 3,8% |
| régua, nota C2 | 9,7% | 10,0% | 7,2% | 7,3% |
| régua, nota G1 | 14,4% | 14,7% | 59,8% | 60,5% |
| **os 20 cuidados: programas sem nenhum defeito** | 35,8% | 47,0% | 35,4% | 57,5% |
| `c01a` dia que começa por um isolador havendo multiarticular (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01b` multiarticular depois de isolador (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01c` o multiarticular mais técnico (complexidade 3) não é o 1º da sua região (nota) | 12,5% | 12,5% | 9,9% | 11,0% |
| `c01d` abdominal antes de outro exercício (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c02a` exercícios por dia fora da faixa dos minutos (A1) (nota) | 20,2% | 14,2% | 4,6% | 2,4% |
| `c02b` séries demais para os minutos (acima de 0,45 por minuto) (nota) | 1,7% | 1,5% | 1,2% | 1,2% |
| `c02c` dia de 5 exercícios ou mais com 2 séries em todos (nota) | 24,0% | 22,3% | 21,8% | 15,4% |
| `c03a` dia mais longo acima de 110% dos minutos (A3) (defeito) | 4,0% | 3,4% | 3,0% | 2,4% |
| `c03b` dia típico abaixo de 70% dos minutos, sem o aviso (A4) (defeito) | 3,2% | 0,0% | 15,2% | 0,0% |
| `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso) (nota) | 38,3% | 34,1% | 24,7% | 17,4% |
| `c03d` dia típico abaixo de 85% dos minutos (nota) | 53,9% | 50,0% | 45,8% | 36,5% |
| `c04a` músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível (defeito) | 7,4% | 7,4% | 10,4% | 10,4% |
| `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível (defeito) | 12,5% | 11,9% | 21,3% | 20,2% |
| `c04f` músculo sem exercício direto (só séries indiretas) havendo exercício possível (nota) | 14,7% | 14,8% | 24,5% | 24,4% |
| `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%) (defeito) | 37,9% | 33,3% | 28,1% | 18,9% |
| `c04d` algum músculo abaixo da faixa do nível (havendo exercício) (nota) | 81,2% | 80,1% | 78,1% | 77,8% |
| `c04e` algum músculo acima da faixa do nível (nota) | 21,4% | 23,1% | 12,4% | 13,1% |
| `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1) (defeito) | 0,5% | 0,5% | 0,4% | 0,3% |
| `c05b` quadríceps ÷ posteriores fora de 0,5 a 2 (D3) (defeito) | 0,1% | 0,1% | 0,0% | 0,0% |
| `c05c` ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás (nota) | 4,2% | 4,1% | 0,5% | 0,5% |
| `c06a` foco abaixo da meta com tempo e exercício (C1) (defeito) | 1,7% | 1,5% | 0,1% | 0,1% |
| `c06b` o foco não passa da mediana dos outros (C2) (nota) | 9,7% | 10,0% | 7,2% | 7,3% |
| `c06c` o foco fica a menos de 1,3 vez a mediana dos outros (nota) | 15,8% | 16,4% | 13,3% | 13,0% |
| `c06d` com foco, outro músculo com menos de 4 séries havendo exercício (defeito) | 12,3% | 11,9% | 13,8% | 13,3% |
| `c07a` músculo com 8 séries diretas ou mais treinado num dia só (nota) | 2,0% | 2,0% | 0,7% | 0,8% |
| `c07b` mais de 10 séries de um músculo num dia (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c07c` o mesmo músculo com 3 séries diretas ou mais em dias seguidos (nota) | 13,8% | 16,4% | 4,8% | 5,9% |
| `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa (nota) | 32,9% | 30,4% | 82,1% | 80,0% |
| `c08b` exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa (nota) | 73,9% | 0,0% | 93,3% | 0,0% |
| `c09a` o mesmo exercício em todos os dias havendo outro do mesmo nível (B1) (defeito) | 0,4% | 0,0% | 0,2% | 0,0% |
| `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2) (nota) | 16,6% | 18,7% | 5,5% | 5,5% |
| `c10a` dois exercícios da mesma função no mesmo dia (nota) | 31,9% | 28,0% | 14,2% | 10,7% |
| `c10b` três exercícios ou mais do mesmo músculo no mesmo dia (nota) | 6,3% | 5,8% | 17,3% | 17,2% |
| `c11a` peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado (nota) | 0,8% | 0,8% | 1,0% | 1,0% |
| `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau) (defeito) | 5,0% | 5,0% | 2,5% | 2,5% |
| `c13a` dois exercícios seguidos que carregam a lombar sem apoio (nota) | 10,5% | 8,8% | 30,2% | 19,3% |
| `c13b` três exercícios ou mais no dia que carregam a lombar sem apoio (nota) | 4,1% | 0,7% | 4,7% | 0,6% |
| `c13c` três exercícios seguidos que dependem da pegada (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c14a` exercício impossível, acima da complexidade ou numa região com dor acima de 5 (defeito) | 1,1% | 0,0% | 1,0% | 0,0% |
| `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2) (defeito) | 10,6% | 4,3% | 2,0% | 0,5% |
| `c14c` o programa perdeu um dia inteiro (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c15a` iniciante com bi-set ou drop set (nota) | 9,5% | 9,3% | 16,6% | 15,9% |
| `c15b` bi-set entre dois multiarticulares (nota) | 21,5% | 21,5% | 28,5% | 27,6% |
| `c15c` bi-set em que os dois carregam a lombar ou dependem da pegada (nota) | 1,9% | 1,9% | 5,2% | 5,2% |
| `c15d` bi-set com os dois exercícios separados na lista do dia (nota) | 6,3% | 0,0% | 5,4% | 0,0% |
| `c16a` iniciante com mais de 12 exercícios diferentes na semana (nota) | 18,9% | 19,3% | 38,7% | 38,9% |
| `c16b` intermediário ou avançado com a média dos músculos abaixo da faixa do nível (nota) | 47,9% | 42,6% | 51,6% | 42,0% |
| `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c20a` o texto "cabem cerca de N exercícios" com um dia acima de N (defeito) | 5,0% | 4,9% | 5,7% | 5,7% |
| `c20b` o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4 (defeito) | 7,6% | 0,0% | 23,2% | 0,0% |
| uso do tempo (dia típico ÷ minutos pedidos) | 76,5% | 78,9% | 81,9% | 86,1% |
| séries por semana (média) | 56,39 | 58,92 | 58,37 | 63,01 |
| séries por músculo por semana (média, fora o abdômen) | 8,67 | 9,00 | 7,28 | 7,88 |
| exercícios diferentes por semana (média) | 15,07 | 15,11 | 20,07 | 19,81 |

### A régua oficial por grupo

| grupo | régua sem defeito: antes | depois | defeitos que pioram no grupo (antes → depois) |
| --- | ---: | ---: | --- |
| dias:2 | 84,7% | 87,7% | — |
| dias:3 | 86,2% | 91,0% | — |
| dias:4 | 78,8% | 92,5% | — |
| dias:5 | 73,8% | 91,2% | — |
| dias:6 | 73,3% | 91,3% | — |
| dor:cotovelo 4 | 86,4% | 93,1% | — |
| dor:cotovelo 7 | 50,0% | 75,1% | — |
| dor:joelho 4 | 86,4% | 93,2% | — |
| dor:joelho 7 | 69,8% | 93,6% | — |
| dor:lombar 4 | 86,4% | 93,2% | — |
| dor:lombar 7 | 83,1% | 92,1% | — |
| dor:ombro 4 | 86,4% | 93,1% | — |
| dor:ombro 7 | 65,4% | 89,8% | — |
| dor:punho 4 | 86,4% | 93,2% | — |
| dor:punho 7 | 74,5% | 81,5% | — |
| dor:quadril 4 | 86,4% | 93,2% | — |
| dor:quadril 7 | 62,6% | 89,6% | — |
| dor:sem dor | 86,4% | 93,2% | — |
| dor:tornozelo 4 | 86,4% | 93,2% | — |
| dor:tornozelo 7 | 93,7% | 94,0% | — |
| foco:abdomen | 83,0% | 95,3% | — |
| foco:bracos | 83,1% | 95,1% | — |
| foco:costas | 78,3% | 90,9% | — |
| foco:gluteos | 79,5% | 90,0% | — |
| foco:inferiores | 71,8% | 79,4% | — |
| foco:nenhum | 82,2% | 96,0% | — |
| foco:ombros | 84,4% | 96,7% | — |
| foco:peito | 77,3% | 89,6% | — |
| foco:peito+costas | 76,7% | 88,5% | — |
| foco:pernas | 78,3% | 88,1% | — |
| foco:superiores | 78,4% | 88,5% | — |
| grupo:atalho | 63,4% | 91,5% | — |
| grupo:item | 85,3% | 91,1% | — |
| grupo:par | 65,6% | 87,8% | — |
| grupo:persona | 64,6% | 89,4% | — |
| grupo:vazio | 93,3% | 93,4% | — |
| min:30 | 66,9% | 73,4% | — |
| min:45 | 84,7% | 93,2% | — |
| min:60 | 85,3% | 97,3% | — |
| min:75 | 81,9% | 95,8% | — |
| min:90 | 78,0% | 94,0% | — |
| nivel:avancado | 77,6% | 88,3% | — |
| nivel:iniciante | 80,4% | 92,2% | — |
| nivel:intermediario | 80,1% | 91,7% | — |

Pior grupo antes: dor:cotovelo 7 (50,0%). Pior grupo depois: min:30 (73,4%).

## Pacote 4 (o corte de tempo revisto: dois lados no lugar de um lado só; a dupla de lombar como último recurso; a prática do iniciante)

Arquivos: [`medidas/main-com-a-regua-de-14-11/retrato.md`](medidas/main-com-a-regua-de-14-11/retrato.md) (antes) e [`medidas/pacote-4/retrato.md`](medidas/pacote-4/retrato.md) (depois, com os pacotes 1, 0, 3, 2 e 4).

| Critério | Depois do pacote 4 |
|---|---|
| Nenhum defeito da régua pior que na `main`, em nenhum grupo | **cumprido com a mesma ressalva do pacote 2, um pouco menor**: no total todos os defeitos caem; na contagem bruta, 27 pares grupo × defeito ficam acima da `main` e 269 ficam abaixo; o maior é o do pacote 2 (foco abaixo da meta no avançado de 2 dias, 2.000 → 2.028 de 45.375) (detalhe em [`pacote-4.md`](pacote-4.md), seção 3). Frente ao pacote 2, 31 pares sobem (o maior: empurrar ÷ puxar com dor forte no quadril, 165 → 180 de 45.375) e 187 descem |
| O pior grupo melhor do que era | cumprido: os treinos de 30 min, de 73,4% para 73,8% |
| Revisão cega com nenhuma pessoa pior e as notas médias maiores | notas médias maiores (5,89 · 6,31 · 5,64 → 5,97 · 6,42 · 5,75, em 12 pessoas, contra o pacote 2); uma sobe 5,0, oito iguais, **três caem (−0,7, −0,3 e −0,3)**: são as pessoas em que agiram a prática do iniciante e a dupla de lombar como último recurso. Decisões 1 e 2 de [`pacote-4.md`](pacote-4.md) |
| Toda regra com selo, fonte e teste | `tempo.corte` (degrau 1b), `tempo.superserie` (último recurso) e `selecao.pratica-do-iniciante` (nova) em `regras.md`; `tests/unit/iniciante-e-corte.test.ts` (18 testes) |
| `npm run check`, `npm run test:e2e`, `npm run auditoria:verificar` | ver [`pacote-4.md`](pacote-4.md), seção 7 |

### A régua oficial e os 20 cuidados, na população inteira (main, com a régua de agora → ramo, com os pacotes 1, 0, 3, 2 e 4)

| medida | grade: antes | depois | ponderada: antes | depois |
| --- | ---: | ---: | ---: | ---: |
| **régua oficial: programas sem nenhum defeito** | 79,4% | 91,0% | 78,1% | 97,1% |
| régua, defeito A2 | 10,6% | 4,2% | 2,0% | 0,5% |
| régua, defeito A3 | 4,0% | 3,3% | 3,0% | 2,1% |
| régua, defeito A4 | 3,2% | 0,0% | 15,2% | 0,0% |
| régua, defeito B1 | 0,4% | 0,0% | 0,2% | 0,0% |
| régua, defeito C1 | 1,7% | 1,5% | 0,1% | 0,1% |
| régua, defeito D1 | 0,5% | 0,5% | 0,4% | 0,3% |
| régua, defeito D3 | 0,1% | 0,1% | 0,0% | 0,0% |
| régua, defeito E1 | 0,1% | 0,0% | 0,2% | 0,0% |
| régua, defeito seguranca | 1,1% | 0,0% | 1,0% | 0,0% |
| régua, nota A1 | 20,2% | 14,3% | 4,6% | 2,4% |
| régua, nota A5 | 22,5% | 17,4% | 13,5% | 9,9% |
| régua, nota B2 | 16,6% | 18,7% | 5,5% | 5,5% |
| régua, nota B3 | 7,0% | 7,5% | 3,9% | 3,8% |
| régua, nota C2 | 9,7% | 9,9% | 7,2% | 7,0% |
| régua, nota G1 | 14,4% | 12,5% | 59,8% | 57,9% |
| **os 20 cuidados: programas sem nenhum defeito** | 35,8% | 47,1% | 35,4% | 57,5% |
| `c01a` dia que começa por um isolador havendo multiarticular (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01b` multiarticular depois de isolador (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c01c` o multiarticular mais técnico (complexidade 3) não é o 1º da sua região (nota) | 12,5% | 12,7% | 9,9% | 11,7% |
| `c01d` abdominal antes de outro exercício (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c02a` exercícios por dia fora da faixa dos minutos (A1) (nota) | 20,2% | 14,3% | 4,6% | 2,4% |
| `c02b` séries demais para os minutos (acima de 0,45 por minuto) (nota) | 1,7% | 1,5% | 1,2% | 1,3% |
| `c02c` dia de 5 exercícios ou mais com 2 séries em todos (nota) | 24,0% | 22,3% | 21,8% | 15,4% |
| `c03a` dia mais longo acima de 110% dos minutos (A3) (defeito) | 4,0% | 3,3% | 3,0% | 2,1% |
| `c03b` dia típico abaixo de 70% dos minutos, sem o aviso (A4) (defeito) | 3,2% | 0,0% | 15,2% | 0,0% |
| `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso) (nota) | 38,3% | 34,2% | 24,7% | 17,6% |
| `c03d` dia típico abaixo de 85% dos minutos (nota) | 53,9% | 50,0% | 45,8% | 37,0% |
| `c04a` músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível (defeito) | 7,4% | 7,4% | 10,4% | 10,4% |
| `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível (defeito) | 12,5% | 11,9% | 21,3% | 20,1% |
| `c04f` músculo sem exercício direto (só séries indiretas) havendo exercício possível (nota) | 14,7% | 14,7% | 24,5% | 24,3% |
| `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%) (defeito) | 37,9% | 33,3% | 28,1% | 18,9% |
| `c04d` algum músculo abaixo da faixa do nível (havendo exercício) (nota) | 81,2% | 80,1% | 78,1% | 77,8% |
| `c04e` algum músculo acima da faixa do nível (nota) | 21,4% | 23,1% | 12,4% | 13,3% |
| `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1) (defeito) | 0,5% | 0,5% | 0,4% | 0,3% |
| `c05b` quadríceps ÷ posteriores fora de 0,5 a 2 (D3) (defeito) | 0,1% | 0,1% | 0,0% | 0,0% |
| `c05c` ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás (nota) | 4,2% | 4,1% | 0,5% | 0,5% |
| `c06a` foco abaixo da meta com tempo e exercício (C1) (defeito) | 1,7% | 1,5% | 0,1% | 0,1% |
| `c06b` o foco não passa da mediana dos outros (C2) (nota) | 9,7% | 9,9% | 7,2% | 7,0% |
| `c06c` o foco fica a menos de 1,3 vez a mediana dos outros (nota) | 15,8% | 16,3% | 13,3% | 12,9% |
| `c06d` com foco, outro músculo com menos de 4 séries havendo exercício (defeito) | 12,3% | 11,9% | 13,8% | 13,2% |
| `c07a` músculo com 8 séries diretas ou mais treinado num dia só (nota) | 2,0% | 2,1% | 0,7% | 0,9% |
| `c07b` mais de 10 séries de um músculo num dia (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c07c` o mesmo músculo com 3 séries diretas ou mais em dias seguidos (nota) | 13,8% | 16,4% | 4,8% | 5,9% |
| `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa (nota) | 32,9% | 32,0% | 82,1% | 81,8% |
| `c08b` exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa (nota) | 73,9% | 0,0% | 93,3% | 0,0% |
| `c09a` o mesmo exercício em todos os dias havendo outro do mesmo nível (B1) (defeito) | 0,4% | 0,0% | 0,2% | 0,0% |
| `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2) (nota) | 16,6% | 18,7% | 5,5% | 5,5% |
| `c10a` dois exercícios da mesma função no mesmo dia (nota) | 31,9% | 28,0% | 14,2% | 10,7% |
| `c10b` três exercícios ou mais do mesmo músculo no mesmo dia (nota) | 6,3% | 5,8% | 17,3% | 17,2% |
| `c11a` peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado (nota) | 0,8% | 0,8% | 1,0% | 1,0% |
| `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau) (defeito) | 5,0% | 5,0% | 2,5% | 2,5% |
| `c13a` dois exercícios seguidos que carregam a lombar sem apoio (nota) | 10,5% | 8,9% | 30,2% | 19,4% |
| `c13b` três exercícios ou mais no dia que carregam a lombar sem apoio (nota) | 4,1% | 0,7% | 4,7% | 0,6% |
| `c13c` três exercícios seguidos que dependem da pegada (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c14a` exercício impossível, acima da complexidade ou numa região com dor acima de 5 (defeito) | 1,1% | 0,0% | 1,0% | 0,0% |
| `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2) (defeito) | 10,6% | 4,2% | 2,0% | 0,5% |
| `c14c` o programa perdeu um dia inteiro (nota) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c15a` iniciante com bi-set ou drop set (nota) | 9,5% | 9,1% | 16,6% | 15,5% |
| `c15b` bi-set entre dois multiarticulares (nota) | 21,5% | 21,1% | 28,5% | 26,8% |
| `c15c` bi-set em que os dois carregam a lombar ou dependem da pegada (nota) | 1,9% | 1,0% | 5,2% | 4,0% |
| `c15d` bi-set com os dois exercícios separados na lista do dia (nota) | 6,3% | 0,0% | 5,4% | 0,0% |
| `c16a` iniciante com mais de 12 exercícios diferentes na semana (nota) | 18,9% | 12,7% | 38,7% | 36,7% |
| `c16b` intermediário ou avançado com a média dos músculos abaixo da faixa do nível (nota) | 47,9% | 42,6% | 51,6% | 42,0% |
| `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite (defeito) | 0,0% | 0,0% | 0,0% | 0,0% |
| `c20a` o texto "cabem cerca de N exercícios" com um dia acima de N (defeito) | 5,0% | 4,9% | 5,7% | 5,8% |
| `c20b` o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4 (defeito) | 7,6% | 0,0% | 23,2% | 0,0% |
| uso do tempo (dia típico ÷ minutos pedidos) | 76,5% | 78,9% | 81,9% | 85,9% |
| séries por semana (média) | 56,39 | 58,96 | 58,37 | 63,07 |
| séries por músculo por semana (média, fora o abdômen) | 8,67 | 9,01 | 7,28 | 7,89 |
| exercícios diferentes por semana (média) | 15,07 | 14,43 | 20,07 | 18,26 |

### A régua oficial por grupo

| grupo | régua sem defeito: antes | depois | defeitos que pioram no grupo (antes → depois) |
| --- | ---: | ---: | --- |
| dias:2 | 84,7% | 88,1% | — |
| dias:3 | 86,2% | 91,2% | — |
| dias:4 | 78,8% | 92,8% | — |
| dias:5 | 73,8% | 91,4% | — |
| dias:6 | 73,3% | 91,6% | — |
| dor:cotovelo 4 | 86,4% | 93,4% | — |
| dor:cotovelo 7 | 50,0% | 75,6% | — |
| dor:joelho 4 | 86,4% | 93,4% | — |
| dor:joelho 7 | 69,8% | 93,9% | — |
| dor:lombar 4 | 86,4% | 93,4% | — |
| dor:lombar 7 | 83,1% | 92,1% | — |
| dor:ombro 4 | 86,4% | 93,4% | — |
| dor:ombro 7 | 65,4% | 90,5% | — |
| dor:punho 4 | 86,4% | 93,4% | — |
| dor:punho 7 | 74,5% | 82,1% | — |
| dor:quadril 4 | 86,4% | 93,4% | — |
| dor:quadril 7 | 62,6% | 89,6% | — |
| dor:sem dor | 86,4% | 93,4% | — |
| dor:tornozelo 4 | 86,4% | 93,4% | — |
| dor:tornozelo 7 | 93,7% | 94,1% | — |
| foco:abdomen | 83,0% | 95,4% | — |
| foco:bracos | 83,1% | 95,3% | — |
| foco:costas | 78,3% | 91,2% | — |
| foco:gluteos | 79,5% | 90,1% | — |
| foco:inferiores | 71,8% | 79,8% | — |
| foco:nenhum | 82,2% | 96,2% | — |
| foco:ombros | 84,4% | 96,9% | — |
| foco:peito | 77,3% | 90,1% | — |
| foco:peito+costas | 76,7% | 88,7% | — |
| foco:pernas | 78,3% | 88,5% | — |
| foco:superiores | 78,4% | 89,0% | — |
| grupo:atalho | 63,4% | 92,0% | — |
| grupo:item | 85,3% | 91,2% | — |
| grupo:par | 65,6% | 88,5% | — |
| grupo:persona | 64,6% | 89,9% | — |
| grupo:vazio | 93,3% | 93,5% | — |
| min:30 | 66,9% | 73,8% | — |
| min:45 | 84,7% | 93,7% | — |
| min:60 | 85,3% | 97,5% | — |
| min:75 | 81,9% | 96,0% | — |
| min:90 | 78,0% | 94,1% | — |
| nivel:avancado | 77,6% | 88,6% | — |
| nivel:iniciante | 80,4% | 92,6% | — |
| nivel:intermediario | 80,1% | 91,9% | — |

Pior grupo antes: dor:cotovelo 7 (50,0%). Pior grupo depois: min:30 (73,8%).

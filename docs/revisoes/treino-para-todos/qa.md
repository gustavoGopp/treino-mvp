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

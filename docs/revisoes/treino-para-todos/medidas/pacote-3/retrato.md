# O retrato medido: os 20 cuidados em 680.625 programas

> Gerado por `scripts/auditoria/retrato.ts` (motor: `src/domain/gerador/index.ts`). Dados fictícios. Não editar à mão.

**680.625 combinações**, 680.625 programas (0 sem exercício possível, 0 bloqueadas). "Grade" = cada combinação vale igual. "Ponderada" = as combinações mais prováveis valem mais (pesos de `scripts/auditoria/populacao.ts`, **estimativa**).

| | grade | ponderada |
| --- | ---: | ---: |
| programas sem nenhum defeito | 45,6% | 57,7% |
| idem, sem dor | 44,9% | 56,9% |
| idem, com dor | 45,7% | 60,6% |
| programas sem defeito nem nota | 0,0% | 0,0% |
| uso do tempo (dia típico ÷ minutos pedidos) | 78,7% | 86,2% |
| séries por semana (média) | 58,6 | 62,7 |
| séries por músculo por semana (média, fora o abdômen) | 9,0 | 7,8 |
| músculos abaixo da faixa do nível (média por programa) | 3,5 | 4,3 |
| exercícios por dia (média) | 5,58 | 6,33 |
| escolhas decididas pela animação (% das prescrições) | 4,2% | 14,8% |
| escolhas decididas pela ordem alfabética (% das prescrições) | 9,6% | 26,7% |

## A régua oficial (G5) na mesma população

| defeito ou nota | grade | ponderada | sem dor | com dor |
| --- | ---: | ---: | ---: | ---: |
| **sem nenhum defeito da régua** | 88,8% | 96,2% | 93,0% | 88,5% |
| A2 | 6,1% | 0,7% | 0,8% | 6,5% |
| A3 | 3,6% | 2,6% | 4,6% | 3,5% |
| A4 | 0,0% | 0,0% | 0,0% | 0,0% |
| B1 | 0,0% | 0,0% | 0,0% | 0,0% |
| C1 | 1,5% | 0,1% | 1,4% | 1,5% |
| D1 | 0,5% | 0,4% | 0,7% | 0,5% |
| D3 | 0,1% | 0,0% | 0,0% | 0,1% |
| E1 | 0,0% | 0,0% | 0,0% | 0,0% |
| seguranca | 0,0% | 0,0% | 0,0% | 0,0% |
| A1 | 15,7% | 2,5% | 8,6% | 16,2% |
| A5 | 18,3% | 9,9% | 13,8% | 18,6% |
| B2 | 18,1% | 5,5% | 15,8% | 18,3% |
| B3 | 7,3% | 3,8% | 8,5% | 7,3% |
| C2 | 9,8% | 7,2% | 11,4% | 9,6% |
| G1 | 14,5% | 59,7% | 15,1% | 14,5% |
| cartões de texto por dia (média) | 0,73 | 1,85 | | |

## Cada cuidado

% dos programas que falham. "Pior grupo": o recorte (equipamento, nível, minutos, dias, foco ou dor) com a maior fatia na grade.

| cuidado | medida | tipo | grade | ponderada | sem dor | com dor | pior grupo |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | `c01a` dia que começa por um isolador havendo multiarticular | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 1 | `c01b` multiarticular depois de isolador | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 1 | `c01c` o multiarticular mais técnico (complexidade 3) não é o 1º da sua região | nota | 12,4% | 9,9% | 15,0% | 12,3% | dias:2 (22,5%) |
| 1 | `c01d` abdominal antes de outro exercício | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 2 | `c02a` exercícios por dia fora da faixa dos minutos (A1) | nota | 15,7% | 2,5% | 8,6% | 16,2% | dor:cotovelo 7 (44,0%) |
| 2 | `c02b` séries demais para os minutos (acima de 0,45 por minuto) | nota | 1,5% | 1,0% | 1,6% | 1,4% | min:30 (6,5%) |
| 2 | `c02c` dia de 5 exercícios ou mais com 2 séries em todos | nota | 21,7% | 15,4% | 20,2% | 21,8% | dias:6 (52,5%) |
| 3 | `c03a` dia mais longo acima de 110% dos minutos (A3) | defeito | 3,6% | 2,6% | 4,6% | 3,5% | min:30 (14,2%) |
| 3 | `c03b` dia típico abaixo de 70% dos minutos, sem o aviso (A4) | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 3 | `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso) | nota | 34,6% | 17,3% | 31,2% | 34,8% | min:90 (76,4%) |
| 3 | `c03d` dia típico abaixo de 85% dos minutos | nota | 50,2% | 36,0% | 46,2% | 50,5% | min:90 (88,6%) |
| 4 | `c04a` músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível | defeito | 7,4% | 10,4% | 9,4% | 7,2% | min:30 (29,8%) |
| 4 | `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível | defeito | 12,0% | 20,5% | 15,9% | 11,7% | min:30 (47,6%) |
| 4 | `c04f` músculo sem exercício direto (só séries indiretas) havendo exercício possível | nota | 14,7% | 24,5% | 18,6% | 14,5% | min:30 (45,2%) |
| 4 | `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%) | defeito | 33,6% | 18,2% | 33,8% | 33,6% | min:90 (64,5%) |
| 4 | `c04d` algum músculo abaixo da faixa do nível (havendo exercício) | nota | 80,3% | 77,8% | 85,4% | 80,0% | dias:2 (98,5%) |
| 4 | `c04e` algum músculo acima da faixa do nível | nota | 22,6% | 12,9% | 20,6% | 22,7% | nivel:iniciante (52,3%) |
| 5 | `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1) | defeito | 0,5% | 0,4% | 0,7% | 0,5% | foco:peito (3,5%) |
| 5 | `c05b` quadríceps ÷ posteriores fora de 0,5 a 2 (D3) | defeito | 0,1% | 0,0% | 0,0% | 0,1% | dor:quadril 7 (1,8%) |
| 5 | `c05c` ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás | nota | 4,2% | 0,5% | 5,2% | 4,1% | min:30 (11,5%) |
| 6 | `c06a` foco abaixo da meta com tempo e exercício (C1) | defeito | 1,5% | 0,1% | 1,4% | 1,5% | min:90 (4,4%) |
| 6 | `c06b` o foco não passa da mediana dos outros (C2) | nota | 9,8% | 7,2% | 11,4% | 9,6% | foco:pernas (33,2%) |
| 6 | `c06c` o foco fica a menos de 1,3 vez a mediana dos outros | nota | 16,1% | 13,2% | 17,7% | 16,0% | foco:pernas (48,1%) |
| 6 | `c06d` com foco, outro músculo com menos de 4 séries havendo exercício | defeito | 12,0% | 13,4% | 15,3% | 11,7% | min:30 (46,9%) |
| 7 | `c07a` músculo com 8 séries diretas ou mais treinado num dia só | nota | 2,0% | 0,7% | 2,1% | 2,0% | dias:2 (9,7%) |
| 7 | `c07b` mais de 10 séries de um músculo num dia | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 7 | `c07c` o mesmo músculo com 3 séries diretas ou mais em dias seguidos | nota | 16,1% | 5,8% | 12,9% | 16,3% | dias:4 (38,8%) |
| 8 | `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa | nota | 31,9% | 82,0% | 34,4% | 31,7% | grupo:atalho (91,5%) |
| 8 | `c08b` exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa | nota | 73,7% | 93,2% | 86,2% | 72,8% | grupo:atalho (91,4%) |
| 9 | `c09a` o mesmo exercício em todos os dias havendo outro do mesmo nível (B1) | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 9 | `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2) | nota | 18,1% | 5,5% | 15,8% | 18,3% | nivel:iniciante (43,0%) |
| 10 | `c10a` dois exercícios da mesma função no mesmo dia | nota | 30,2% | 13,8% | 31,1% | 30,1% | foco:pernas (54,0%) |
| 10 | `c10b` três exercícios ou mais do mesmo músculo no mesmo dia | nota | 6,0% | 17,2% | 7,7% | 5,9% | grupo:atalho (23,4%) |
| 11 | `c11a` peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado | nota | 0,8% | 1,0% | 0,9% | 0,8% | grupo:persona (2,7%) |
| 12 | `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau) | defeito | 5,0% | 2,5% | 5,1% | 5,0% | nivel:avancado (7,7%) |
| 13 | `c13a` dois exercícios seguidos que carregam a lombar sem apoio | nota | 10,6% | 29,5% | 12,6% | 10,5% | grupo:atalho (30,4%) |
| 13 | `c13b` três exercícios ou mais no dia que carregam a lombar sem apoio | nota | 4,0% | 4,7% | 5,4% | 3,9% | grupo:par (12,2%) |
| 13 | `c13c` três exercícios seguidos que dependem da pegada | nota | 0,0% | 0,0% | 0,0% | 0,0% | dor:joelho 7 (0,2%) |
| 14 | `c14a` exercício impossível, acima da complexidade ou numa região com dor acima de 5 | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 14 | `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2) | defeito | 6,1% | 0,7% | 0,8% | 6,5% | dor:cotovelo 7 (30,9%) |
| 14 | `c14c` o programa perdeu um dia inteiro | nota | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 15 | `c15a` iniciante com bi-set ou drop set | nota | 9,4% | 16,5% | 11,2% | 9,3% | nivel:iniciante (28,2%) |
| 15 | `c15b` bi-set entre dois multiarticulares | nota | 21,6% | 28,4% | 28,3% | 21,1% | min:30 (52,3%) |
| 15 | `c15c` bi-set em que os dois carregam a lombar ou dependem da pegada | nota | 1,9% | 5,2% | 2,8% | 1,9% | dias:2 (8,5%) |
| 15 | `c15d` bi-set com os dois exercícios separados na lista do dia | nota | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 16 | `c16a` iniciante com mais de 12 exercícios diferentes na semana | nota | 19,2% | 38,8% | 22,2% | 19,0% | nivel:iniciante (57,6%) |
| 16 | `c16b` intermediário ou avançado com a média dos músculos abaixo da faixa do nível | nota | 42,9% | 42,5% | 47,6% | 42,5% | nivel:avancado (71,1%) |
| 17 | `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 20 | `c20a` o texto "cabem cerca de N exercícios" com um dia acima de N | defeito | 4,8% | 5,7% | 7,2% | 4,7% | min:30 (20,6%) |
| 20 | `c20b` o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4 | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |

### Por cuidado (falha em alguma medida do cuidado)

| cuidado | com defeito: grade | ponderada | com defeito ou nota: grade | ponderada |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 0,0% | 0,0% | 12,4% | 9,9% |
| 2 | 0,0% | 0,0% | 34,5% | 18,3% |
| 3 | 3,6% | 2,6% | 53,6% | 38,6% |
| 4 | 47,2% | 39,5% | 94,2% | 87,0% |
| 5 | 0,6% | 0,4% | 4,7% | 0,9% |
| 6 | 13,5% | 13,5% | 24,7% | 21,4% |
| 7 | 0,0% | 0,0% | 18,2% | 6,6% |
| 8 | 0,0% | 0,0% | 79,1% | 98,0% |
| 9 | 0,0% | 0,0% | 18,1% | 5,5% |
| 10 | 0,0% | 0,0% | 33,2% | 26,8% |
| 11 | 0,0% | 0,0% | 0,8% | 1,0% |
| 12 | 5,0% | 2,5% | 5,0% | 2,5% |
| 13 | 0,0% | 0,0% | 11,1% | 30,6% |
| 14 | 6,1% | 0,7% | 6,1% | 0,7% |
| 15 | 0,0% | 0,0% | 24,4% | 33,0% |
| 16 | 0,0% | 0,0% | 62,1% | 81,3% |
| 17 | 0,0% | 0,0% | 0,0% | 0,0% |
| 20 | 4,8% | 5,7% | 4,8% | 5,7% |

Nas tabelas por recorte: `c03a` dia mais longo acima de 110% dos minutos (A3); `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso); `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível; `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%); `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1); `c06b` o foco não passa da mediana dos outros (C2); `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa; `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2); `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau); `c13a` dois exercícios seguidos que carregam a lombar sem apoio; `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2); `c15a` iniciante com bi-set ou drop set; `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite.

## Por grupo de equipamento

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| atalho | 74.250 | 62,0% | 45,9% | 58,7% | 82,4% | 8,1 | 5,0% | 26,4% | 23,6% | 26,4% | 0,7% | 11,2% | 91,5% | 1,3% | 0,0% | 30,4% | 6,6% | 11,2% | 0,0% |
| persona | 74.250 | 18,0% | 46,6% | 56,7% | 83,0% | 8,1 | 5,7% | 26,2% | 21,5% | 25,0% | 0,7% | 12,6% | 87,0% | 3,3% | 2,7% | 19,8% | 8,0% | 11,9% | 0,0% |
| vazio | 12.375 | 8,0% | 49,1% | 57,9% | 76,8% | 9,7 | 2,2% | 39,3% | 6,1% | 40,3% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| item | 470.250 | 8,0% | 45,0% | 49,6% | 77,0% | 9,3 | 2,8% | 37,9% | 7,9% | 36,9% | 0,4% | 8,8% | 8,7% | 24,4% | 6,8% | 4,6% | 5,5% | 8,5% | 0,0% |
| par | 49.500 | 4,0% | 48,5% | 63,6% | 83,2% | 8,0 | 6,3% | 26,2% | 20,4% | 24,4% | 0,7% | 13,2% | 87,8% | 3,7% | 0,0% | 27,5% | 9,2% | 12,1% | 0,0% |

## Por nível

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| iniciante | 226.875 | 45,0% | 61,5% | 67,0% | 73,3% | 8,0 | 2,1% | 43,8% | 11,8% | 16,9% | 0,3% | 11,5% | 31,0% | 43,0% | 3,6% | 9,1% | 5,9% | 28,2% | 0,0% |
| intermediario | 226.875 | 35,0% | 36,3% | 49,0% | 79,7% | 9,1 | 3,7% | 33,0% | 12,0% | 44,6% | 0,5% | 8,9% | 32,3% | 5,7% | 3,6% | 11,3% | 6,0% | 0,0% | 0,0% |
| avancado | 226.875 | 20,0% | 39,1% | 52,1% | 83,1% | 9,7 | 4,9% | 26,9% | 12,1% | 39,3% | 0,7% | 8,8% | 32,3% | 5,7% | 7,7% | 11,4% | 6,4% | 0,0% | 0,0% |

## Por minutos

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 136.125 | 12,0% | 31,0% | 10,5% | 97,4% | 6,6 | 14,2% | 0,4% | 47,6% | 3,2% | 1,7% | 23,2% | 30,8% | 14,4% | 4,6% | 10,0% | 13,7% | 22,5% | 0,0% |
| 45 | 136.125 | 28,0% | 69,9% | 60,9% | 91,2% | 8,6 | 3,3% | 5,8% | 8,8% | 9,9% | 0,5% | 12,3% | 32,1% | 17,5% | 4,9% | 10,1% | 4,9% | 13,8% | 0,0% |
| 60 | 136.125 | 38,0% | 56,7% | 75,1% | 79,4% | 9,6 | 0,4% | 30,9% | 2,5% | 35,2% | 0,2% | 6,3% | 32,1% | 19,3% | 5,2% | 10,8% | 4,0% | 7,7% | 0,0% |
| 75 | 136.125 | 12,0% | 39,5% | 54,6% | 67,7% | 9,9 | 0,0% | 59,3% | 0,9% | 55,1% | 0,1% | 3,7% | 32,1% | 19,7% | 5,2% | 11,1% | 4,0% | 2,6% | 0,0% |
| 90 | 136.125 | 10,0% | 31,1% | 43,5% | 58,0% | 10,1 | 0,0% | 76,4% | 0,3% | 64,5% | 0,0% | 3,3% | 32,2% | 19,8% | 5,2% | 11,2% | 3,9% | 0,5% | 0,0% |

## Por dias

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | 136.125 | 10,0% | 45,0% | 34,2% | 92,7% | 6,1 | 8,0% | 8,8% | 26,5% | 20,8% | 1,4% | 15,4% | 33,1% | 0,0% | 4,5% | 9,2% | 0,0% | 19,0% | 0,0% |
| 3 | 136.125 | 35,0% | 47,0% | 57,6% | 85,8% | 7,9 | 4,9% | 22,0% | 12,5% | 32,1% | 1,0% | 7,3% | 34,9% | 33,3% | 5,1% | 4,8% | 2,7% | 13,2% | 0,0% |
| 4 | 136.125 | 28,0% | 46,2% | 66,3% | 77,9% | 9,2 | 2,3% | 35,7% | 8,0% | 37,2% | 0,1% | 5,6% | 31,8% | 20,3% | 5,1% | 12,9% | 4,4% | 7,3% | 0,0% |
| 5 | 136.125 | 20,0% | 49,7% | 60,3% | 71,3% | 10,3 | 1,6% | 48,6% | 6,4% | 36,5% | 0,0% | 9,7% | 29,2% | 21,0% | 5,2% | 13,1% | 6,9% | 4,5% | 0,0% |
| 6 | 136.125 | 7,0% | 40,2% | 50,6% | 65,8% | 11,3 | 1,1% | 57,8% | 6,5% | 41,4% | 0,1% | 10,8% | 30,2% | 16,0% | 5,2% | 13,2% | 16,5% | 3,1% | 0,0% |

## Por foco

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| nenhum | 61.875 | 35,0% | 49,0% | 60,0% | 78,4% | 9,0 | 0,4% | 35,6% | 10,6% | 32,6% | 0,0% | 0,0% | 31,7% | 18,2% | 5,0% | 10,2% | 5,6% | 5,8% | 0,0% |
| peito | 61.875 | 5,0% | 44,4% | 55,8% | 77,0% | 8,9 | 3,1% | 38,2% | 9,9% | 37,0% | 3,5% | 0,7% | 31,8% | 18,2% | 5,0% | 11,8% | 5,0% | 7,3% | 0,0% |
| costas | 61.875 | 4,0% | 45,4% | 60,8% | 76,5% | 8,8 | 2,8% | 39,8% | 7,9% | 37,8% | 0,3% | 0,9% | 32,0% | 18,3% | 5,0% | 10,1% | 5,7% | 6,7% | 0,0% |
| ombros | 61.875 | 4,0% | 49,5% | 56,0% | 78,6% | 8,8 | 0,3% | 35,3% | 10,4% | 32,7% | 0,0% | 4,5% | 31,6% | 18,2% | 5,0% | 12,0% | 4,7% | 6,8% | 0,0% |
| bracos | 61.875 | 7,0% | 41,9% | 45,5% | 76,9% | 8,9 | 0,6% | 37,7% | 13,6% | 36,2% | 0,1% | 6,7% | 30,9% | 19,4% | 5,1% | 10,2% | 5,7% | 7,1% | 0,0% |
| pernas | 61.875 | 6,0% | 47,5% | 57,9% | 80,4% | 9,4 | 6,6% | 30,4% | 15,2% | 28,6% | 0,0% | 33,2% | 32,0% | 17,9% | 5,0% | 9,8% | 6,6% | 14,8% | 0,0% |
| gluteos | 61.875 | 9,0% | 45,0% | 56,0% | 80,7% | 8,9 | 3,5% | 29,2% | 12,6% | 32,4% | 0,0% | 0,9% | 33,0% | 17,0% | 5,0% | 10,5% | 8,4% | 11,2% | 0,0% |
| abdomen | 61.875 | 5,0% | 46,3% | 55,9% | 77,9% | 8,1 | 0,3% | 35,8% | 10,8% | 34,7% | 0,0% | 15,0% | 31,9% | 17,7% | 5,0% | 10,1% | 5,5% | 8,1% | 0,0% |
| superiores | 61.875 | 8,0% | 45,2% | 64,4% | 80,7% | 9,3 | 4,9% | 31,5% | 14,0% | 32,2% | 1,1% | 10,7% | 30,6% | 19,6% | 5,0% | 11,7% | 6,0% | 9,8% | 0,0% |
| inferiores | 61.875 | 9,0% | 43,0% | 52,1% | 81,8% | 9,5 | 12,3% | 28,2% | 18,4% | 28,1% | 0,0% | 32,9% | 33,0% | 16,6% | 5,0% | 9,8% | 8,8% | 17,3% | 0,0% |
| peito+costas | 61.875 | 8,0% | 44,8% | 61,7% | 77,1% | 9,0 | 4,4% | 38,4% | 8,6% | 37,2% | 0,6% | 1,8% | 31,7% | 18,3% | 5,0% | 10,9% | 5,0% | 8,6% | 0,0% |

## Por dor

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| sem dor | 45.375 | 78,0% | 44,9% | 56,9% | 80,9% | 8,5 | 4,6% | 31,2% | 15,9% | 33,8% | 0,7% | 11,4% | 34,4% | 15,8% | 5,1% | 12,6% | 0,8% | 11,2% | 0,0% |
| cotovelo 4 | 45.375 | 0,9% | 44,9% | 56,9% | 80,9% | 8,5 | 4,6% | 31,2% | 15,9% | 33,8% | 0,7% | 11,4% | 33,7% | 15,8% | 5,1% | 12,6% | 0,8% | 11,2% | 0,0% |
| punho 7 | 45.375 | 0,6% | 39,3% | 55,2% | 77,4% | 9,0 | 3,5% | 36,8% | 10,2% | 34,8% | 0,2% | 8,8% | 34,6% | 23,0% | 5,2% | 14,2% | 14,2% | 8,1% | 0,0% |
| quadril 4 | 45.375 | 0,9% | 44,9% | 56,9% | 80,9% | 8,5 | 4,6% | 31,2% | 15,9% | 33,8% | 0,7% | 11,4% | 34,4% | 15,8% | 5,1% | 12,6% | 0,8% | 11,2% | 0,0% |
| joelho 7 | 45.375 | 2,0% | 50,5% | 69,4% | 78,0% | 8,9 | 4,0% | 35,5% | 6,7% | 34,0% | 0,4% | 7,2% | 29,7% | 22,6% | 5,0% | 22,0% | 3,9% | 9,3% | 0,0% |
| ombro 4 | 45.375 | 3,0% | 45,0% | 56,9% | 80,9% | 8,5 | 4,6% | 31,2% | 16,0% | 33,7% | 0,7% | 11,4% | 33,9% | 15,8% | 5,1% | 12,6% | 0,8% | 11,3% | 0,0% |
| cotovelo 7 | 45.375 | 0,6% | 29,0% | 53,2% | 73,1% | 9,4 | 1,6% | 43,9% | 4,1% | 41,8% | 0,0% | 5,5% | 24,4% | 17,4% | 4,2% | 2,3% | 30,9% | 5,4% | 0,0% |
| lombar 4 | 45.375 | 3,6% | 44,9% | 56,9% | 80,9% | 8,5 | 4,6% | 31,2% | 15,9% | 33,7% | 0,7% | 11,4% | 33,7% | 15,8% | 5,1% | 10,2% | 0,8% | 11,2% | 0,0% |
| quadril 7 | 45.375 | 0,6% | 43,9% | 60,9% | 73,7% | 9,5 | 0,3% | 41,7% | 6,8% | 38,6% | 0,4% | 7,6% | 29,3% | 31,0% | 5,2% | 8,4% | 14,5% | 5,6% | 0,0% |
| tornozelo 4 | 45.375 | 0,9% | 44,9% | 56,9% | 80,9% | 8,5 | 4,6% | 31,2% | 15,9% | 33,8% | 0,7% | 11,4% | 34,4% | 15,8% | 5,1% | 12,6% | 0,8% | 11,2% | 0,0% |
| ombro 7 | 45.375 | 2,0% | 59,7% | 72,7% | 71,5% | 10,8 | 1,2% | 48,1% | 2,7% | 23,6% | 0,0% | 7,7% | 21,3% | 17,1% | 4,2% | 2,1% | 15,4% | 3,8% | 0,0% |
| punho 4 | 45.375 | 0,9% | 44,9% | 56,9% | 80,9% | 8,5 | 4,6% | 31,2% | 15,9% | 33,7% | 0,7% | 11,4% | 33,6% | 15,8% | 5,2% | 12,6% | 0,8% | 11,2% | 0,0% |
| lombar 7 | 45.375 | 2,4% | 52,3% | 64,7% | 81,1% | 9,1 | 2,8% | 29,3% | 10,2% | 29,1% | 0,5% | 10,5% | 32,0% | 18,5% | 5,2% | 0,0% | 5,4% | 10,2% | 0,0% |
| joelho 4 | 45.375 | 3,0% | 44,9% | 56,9% | 80,8% | 8,5 | 4,5% | 31,3% | 15,9% | 33,9% | 0,7% | 11,4% | 34,0% | 15,8% | 5,1% | 12,6% | 0,8% | 11,2% | 0,0% |
| tornozelo 7 | 45.375 | 0,6% | 50,2% | 67,8% | 79,0% | 9,2 | 3,5% | 33,4% | 11,8% | 31,9% | 0,6% | 7,9% | 34,6% | 15,8% | 5,1% | 12,6% | 0,7% | 9,0% | 0,0% |

## Por nível e minutos

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| avancado 30 | 45.375 | 2,4% | 29,2% | 9,7% | 98,9% | 6,8 | 18,7% | 0,2% | 47,8% | 2,4% | 2,2% | 24,3% | 31,3% | 2,2% | 6,4% | 10,7% | 13,9% | 0,0% | 0,0% |
| avancado 45 | 45.375 | 5,6% | 66,6% | 56,6% | 94,6% | 9,1 | 5,1% | 3,1% | 8,8% | 10,9% | 0,7% | 12,4% | 32,6% | 4,7% | 7,5% | 10,9% | 5,1% | 0,0% | 0,0% |
| avancado 60 | 45.375 | 7,6% | 50,1% | 67,9% | 84,4% | 10,4 | 0,8% | 17,2% | 2,6% | 40,6% | 0,5% | 5,1% | 32,5% | 6,8% | 8,2% | 11,6% | 4,3% | 0,0% | 0,0% |
| avancado 75 | 45.375 | 2,4% | 30,0% | 50,4% | 73,5% | 11,1 | 0,0% | 47,6% | 0,9% | 65,4% | 0,1% | 1,4% | 32,6% | 7,2% | 8,3% | 12,0% | 4,4% | 0,0% | 0,0% |
| avancado 90 | 45.375 | 2,0% | 19,6% | 32,9% | 64,1% | 11,4 | 0,0% | 66,2% | 0,4% | 77,2% | 0,0% | 1,0% | 32,6% | 7,4% | 8,3% | 12,1% | 4,3% | 0,0% | 0,0% |
| iniciante 30 | 45.375 | 5,4% | 32,5% | 11,1% | 95,3% | 6,3 | 9,1% | 0,7% | 47,3% | 3,9% | 1,1% | 21,5% | 29,7% | 39,0% | 3,6% | 8,5% | 13,8% | 67,4% | 0,0% |
| iniciante 45 | 45.375 | 12,6% | 76,5% | 65,2% | 86,6% | 8,0 | 1,6% | 9,7% | 8,6% | 4,0% | 0,3% | 12,6% | 31,1% | 42,9% | 3,6% | 8,7% | 4,7% | 41,4% | 0,0% |
| iniciante 60 | 45.375 | 17,1% | 75,2% | 86,8% | 72,9% | 8,5 | 0,0% | 48,3% | 2,2% | 15,8% | 0,0% | 8,7% | 31,2% | 44,1% | 3,6% | 9,3% | 3,7% | 23,0% | 0,0% |
| iniciante 75 | 45.375 | 5,4% | 63,8% | 68,1% | 60,7% | 8,7 | 0,0% | 73,1% | 0,9% | 28,0% | 0,0% | 7,6% | 31,3% | 44,4% | 3,6% | 9,7% | 3,7% | 7,8% | 0,0% |
| iniciante 90 | 45.375 | 4,5% | 59,3% | 63,1% | 51,1% | 8,7 | 0,0% | 87,3% | 0,1% | 32,9% | 0,0% | 7,4% | 31,4% | 44,4% | 3,6% | 9,6% | 3,7% | 1,4% | 0,0% |
| intermediario 30 | 45.375 | 4,2% | 31,2% | 10,3% | 97,9% | 6,6 | 14,7% | 0,3% | 47,6% | 3,2% | 1,8% | 24,0% | 31,3% | 2,2% | 3,6% | 10,7% | 13,5% | 0,0% | 0,0% |
| intermediario 45 | 45.375 | 9,8% | 66,8% | 57,8% | 92,4% | 8,7 | 3,4% | 4,6% | 8,9% | 14,9% | 0,6% | 11,8% | 32,6% | 4,7% | 3,6% | 10,8% | 4,8% | 0,0% | 0,0% |
| intermediario 60 | 45.375 | 13,3% | 44,7% | 64,1% | 80,8% | 9,7 | 0,3% | 27,3% | 2,5% | 49,3% | 0,3% | 5,2% | 32,4% | 6,9% | 3,6% | 11,5% | 3,9% | 0,0% | 0,0% |
| intermediario 75 | 45.375 | 4,2% | 24,7% | 39,6% | 68,8% | 10,1 | 0,0% | 57,2% | 0,8% | 71,9% | 0,1% | 2,0% | 32,5% | 7,4% | 3,6% | 11,8% | 3,8% | 0,0% | 0,0% |
| intermediario 90 | 45.375 | 3,5% | 14,3% | 24,5% | 58,7% | 10,3 | 0,0% | 75,8% | 0,3% | 83,5% | 0,0% | 1,5% | 32,6% | 7,4% | 3,6% | 11,8% | 3,8% | 0,0% | 0,0% |

## Por nível e dias

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| avancado 2 | 45.375 | 2,0% | 48,9% | 35,2% | 94,5% | 6,2 | 7,4% | 5,4% | 26,7% | 15,2% | 1,6% | 16,8% | 33,6% | 0,0% | 6,2% | 10,0% | 0,0% | 0,0% | 0,0% |
| avancado 3 | 45.375 | 7,0% | 52,1% | 62,3% | 91,7% | 8,7 | 7,3% | 11,3% | 12,6% | 23,8% | 1,7% | 8,2% | 34,9% | 16,6% | 8,0% | 5,3% | 2,7% | 0,0% | 0,0% |
| avancado 4 | 45.375 | 5,6% | 37,4% | 59,6% | 82,9% | 10,1 | 4,3% | 26,2% | 8,1% | 44,9% | 0,1% | 6,0% | 32,3% | 4,9% | 8,0% | 13,8% | 5,2% | 0,0% | 0,0% |
| avancado 5 | 45.375 | 4,0% | 33,1% | 42,7% | 76,1% | 11,4 | 3,2% | 39,8% | 6,5% | 52,7% | 0,0% | 5,5% | 29,6% | 5,1% | 8,3% | 14,0% | 7,7% | 0,0% | 0,0% |
| avancado 6 | 45.375 | 1,4% | 23,9% | 22,7% | 70,4% | 12,3 | 2,4% | 51,6% | 6,6% | 59,8% | 0,1% | 7,5% | 31,2% | 1,8% | 8,3% | 14,1% | 16,5% | 0,0% | 0,0% |
| iniciante 2 | 45.375 | 4,5% | 39,5% | 32,7% | 90,3% | 5,8 | 8,6% | 13,9% | 26,0% | 27,8% | 1,1% | 12,7% | 32,3% | 0,0% | 3,6% | 7,7% | 0,0% | 56,9% | 0,0% |
| iniciante 3 | 45.375 | 15,8% | 43,3% | 51,9% | 78,8% | 7,0 | 1,9% | 35,3% | 12,4% | 38,1% | 0,3% | 5,9% | 34,8% | 67,0% | 3,6% | 4,2% | 2,8% | 39,7% | 0,0% |
| iniciante 4 | 45.375 | 12,6% | 67,0% | 78,0% | 71,6% | 8,1 | 0,1% | 47,1% | 7,9% | 15,5% | 0,0% | 5,3% | 30,8% | 51,0% | 3,6% | 11,2% | 4,0% | 21,9% | 0,0% |
| iniciante 5 | 45.375 | 9,0% | 83,2% | 88,7% | 65,2% | 9,1 | 0,1% | 58,2% | 6,3% | 1,5% | 0,0% | 18,0% | 28,6% | 52,5% | 3,6% | 11,3% | 6,3% | 13,4% | 0,0% |
| iniciante 6 | 45.375 | 3,2% | 74,3% | 86,3% | 60,6% | 10,2 | 0,0% | 64,5% | 6,4% | 1,7% | 0,0% | 15,9% | 28,3% | 44,4% | 3,6% | 11,3% | 16,5% | 9,2% | 0,0% |
| intermediario 2 | 45.375 | 3,5% | 46,8% | 35,5% | 93,3% | 6,1 | 8,0% | 7,0% | 26,6% | 19,4% | 1,6% | 16,7% | 33,6% | 0,0% | 3,6% | 10,0% | 0,0% | 0,0% | 0,0% |
| intermediario 3 | 45.375 | 12,3% | 45,8% | 62,2% | 86,9% | 8,1 | 5,6% | 19,4% | 12,6% | 34,3% | 1,0% | 7,7% | 35,1% | 16,3% | 3,6% | 4,9% | 2,6% | 0,0% | 0,0% |
| intermediario 4 | 45.375 | 9,8% | 34,1% | 55,1% | 79,3% | 9,4 | 2,5% | 33,7% | 8,1% | 51,2% | 0,0% | 5,6% | 32,3% | 5,1% | 3,6% | 13,7% | 4,2% | 0,0% | 0,0% |
| intermediario 5 | 45.375 | 7,0% | 32,7% | 33,9% | 72,5% | 10,5 | 1,4% | 47,7% | 6,5% | 55,3% | 0,0% | 5,5% | 29,4% | 5,5% | 3,6% | 14,0% | 6,7% | 0,0% | 0,0% |
| intermediario 6 | 45.375 | 2,5% | 22,3% | 20,6% | 66,5% | 11,3 | 0,9% | 57,4% | 6,4% | 62,7% | 0,1% | 9,0% | 31,1% | 1,8% | 3,6% | 14,0% | 16,4% | 0,0% | 0,0% |

## Por cenário de equipamento

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| so:halteres_fixos | 12.375 | 1,0% | 0,0% | 0,0% | 82,2% | 8,3 | 4,4% | 27,7% | 13,3% | 26,1% | 0,4% | 11,3% | 90,2% | 3,0% | 100,0% | 66,0% | 5,4% | 11,1% | 0,0% |
| so:kettlebell | 12.375 | 0,5% | 0,0% | 0,0% | 79,3% | 8,5 | 5,4% | 34,0% | 13,6% | 30,6% | 1,4% | 8,7% | 38,1% | 23,1% | 100,0% | 31,6% | 7,2% | 10,0% | 0,0% |
| so:mini_band | 12.375 | 0,1% | 25,6% | 39,3% | 78,4% | 9,7 | 2,3% | 35,7% | 6,4% | 37,8% | 0,0% | 6,5% | 25,7% | 29,0% | 31,6% | 0,0% | 14,1% | 6,9% | 0,0% |
| so:cadeira_extensora | 12.375 | 0,1% | 33,8% | 48,2% | 77,4% | 9,7 | 1,6% | 37,7% | 6,0% | 39,6% | 0,0% | 6,2% | 0,0% | 29,0% | 0,0% | 0,0% | 16,0% | 6,1% | 0,0% |
| so:paralelas | 12.375 | 0,1% | 36,7% | 45,7% | 76,6% | 9,7 | 2,4% | 39,7% | 6,1% | 41,1% | 0,0% | 8,2% | 3,2% | 29,9% | 27,3% | 0,0% | 2,2% | 7,4% | 0,0% |
| bairro | 12.375 | 8,0% | 36,9% | 48,0% | 81,3% | 8,2 | 3,8% | 27,4% | 24,7% | 27,9% | 0,6% | 10,5% | 63,6% | 1,9% | 16,4% | 4,4% | 6,1% | 10,3% | 0,0% |
| so:caneleiras | 12.375 | 0,1% | 38,7% | 55,8% | 82,3% | 9,2 | 2,2% | 27,4% | 11,4% | 32,4% | 0,0% | 8,4% | 0,0% | 29,2% | 0,0% | 0,0% | 16,0% | 9,7% | 0,0% |
| so:barra_w | 12.375 | 0,1% | 42,0% | 52,4% | 79,9% | 9,2 | 2,2% | 32,6% | 6,7% | 35,7% | 0,0% | 9,2% | 0,0% | 40,3% | 0,0% | 0,0% | 4,2% | 9,2% | 0,0% |
| so:rosca_maquina | 12.375 | 0,1% | 42,4% | 52,4% | 80,2% | 9,2 | 2,1% | 32,0% | 6,5% | 35,5% | 0,0% | 9,4% | 0,0% | 43,2% | 0,0% | 0,0% | 4,3% | 9,3% | 0,0% |
| academia | 12.375 | 20,0% | 43,7% | 57,2% | 82,2% | 8,1 | 4,7% | 27,0% | 26,4% | 26,6% | 0,7% | 10,6% | 98,5% | 2,0% | 0,0% | 51,7% | 5,9% | 11,2% | 0,0% |
| academia+ | 12.375 | 20,0% | 43,8% | 57,1% | 82,1% | 8,1 | 4,6% | 27,0% | 26,4% | 26,4% | 0,7% | 10,2% | 97,0% | 0,0% | 0,0% | 51,6% | 5,9% | 11,2% | 0,0% |
| condominio+ | 12.375 | 6,0% | 44,1% | 57,9% | 82,6% | 8,0 | 4,9% | 26,1% | 26,0% | 26,4% | 0,7% | 11,0% | 94,4% | 0,2% | 0,0% | 4,4% | 6,2% | 11,4% | 0,0% |
| diego | 12.375 | 1,0% | 44,7% | 58,9% | 83,7% | 7,8 | 7,1% | 25,3% | 27,5% | 23,2% | 0,8% | 15,5% | 91,8% | 4,9% | 0,0% | 0,1% | 10,1% | 12,3% | 0,0% |
| suspensao+elasticos | 12.375 | 1,0% | 44,7% | 58,8% | 84,0% | 7,8 | 7,2% | 24,9% | 27,8% | 22,8% | 0,8% | 14,6% | 79,7% | 5,3% | 0,0% | 0,0% | 10,4% | 12,5% | 0,0% |
| elasticos | 12.375 | 2,0% | 45,1% | 59,3% | 84,1% | 7,8 | 7,5% | 25,1% | 27,5% | 22,6% | 1,0% | 15,7% | 90,4% | 5,0% | 0,0% | 1,5% | 10,1% | 12,6% | 0,0% |
| step+elasticos | 12.375 | 1,0% | 45,1% | 60,0% | 84,7% | 7,8 | 8,9% | 24,7% | 27,7% | 22,4% | 1,0% | 15,8% | 90,4% | 4,9% | 0,0% | 1,5% | 10,2% | 13,2% | 0,0% |
| casa | 12.375 | 5,0% | 45,5% | 59,7% | 83,5% | 7,8 | 6,6% | 25,5% | 26,5% | 23,4% | 0,8% | 12,9% | 95,5% | 5,2% | 0,0% | 65,8% | 10,1% | 11,3% | 0,0% |
| so:barra_hexagonal | 12.375 | 0,1% | 45,9% | 53,6% | 74,8% | 10,1 | 1,7% | 42,7% | 6,0% | 43,7% | 0,0% | 8,6% | 0,0% | 26,3% | 0,0% | 0,0% | 3,1% | 6,7% | 0,0% |
| casa+ | 12.375 | 5,0% | 46,4% | 60,0% | 82,4% | 8,1 | 5,0% | 25,9% | 22,4% | 27,8% | 0,7% | 11,4% | 69,9% | 0,2% | 0,0% | 4,5% | 5,8% | 11,7% | 0,0% |
| so:leg_press | 12.375 | 0,1% | 47,5% | 56,5% | 75,5% | 9,7 | 2,0% | 41,7% | 6,0% | 42,2% | 0,0% | 7,3% | 0,0% | 26,4% | 0,0% | 0,0% | 3,1% | 6,7% | 0,0% |
| so:panturrilha_sentada_maquina | 12.375 | 0,1% | 47,9% | 57,4% | 76,2% | 9,7 | 2,2% | 40,2% | 6,1% | 41,5% | 0,0% | 7,2% | 0,0% | 26,3% | 0,0% | 0,0% | 3,4% | 7,2% | 0,0% |
| so:bola_suica | 12.375 | 0,1% | 48,0% | 57,0% | 76,4% | 9,7 | 2,5% | 40,2% | 6,3% | 41,1% | 0,0% | 9,0% | 0,0% | 21,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| so:voador | 12.375 | 0,1% | 48,0% | 58,0% | 77,8% | 9,7 | 2,3% | 36,5% | 6,4% | 39,1% | 0,0% | 8,3% | 0,0% | 27,5% | 0,0% | 0,0% | 7,5% | 7,6% | 0,0% |
| so:panturrilha_em_pe_maquina | 12.375 | 0,1% | 48,1% | 57,4% | 76,0% | 9,7 | 2,1% | 40,9% | 6,0% | 41,4% | 0,0% | 7,3% | 0,0% | 26,4% | 0,0% | 0,0% | 3,1% | 7,2% | 0,0% |
| so:cadeira_abdutora_adutora | 12.375 | 0,1% | 48,2% | 57,1% | 75,8% | 9,7 | 1,8% | 40,7% | 6,1% | 41,6% | 0,0% | 7,9% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 6,6% | 0,0% |
| so:hack | 12.375 | 0,1% | 48,5% | 57,0% | 76,3% | 9,7 | 2,0% | 40,4% | 6,1% | 41,0% | 0,0% | 7,7% | 0,0% | 26,4% | 0,0% | 0,0% | 3,2% | 7,1% | 0,0% |
| so:barra_longa | 12.375 | 0,1% | 48,5% | 52,4% | 74,9% | 9,2 | 3,2% | 41,7% | 8,0% | 40,3% | 1,3% | 10,5% | 0,0% | 35,9% | 0,0% | 10,5% | 4,1% | 7,4% | 0,0% |
| bruno | 12.375 | 3,0% | 48,7% | 62,4% | 84,2% | 8,1 | 6,8% | 24,3% | 22,8% | 24,1% | 0,7% | 11,7% | 95,3% | 2,0% | 0,0% | 4,5% | 5,9% | 13,6% | 0,0% |
| so:gluteo_maquina | 12.375 | 0,1% | 48,7% | 57,4% | 76,1% | 9,7 | 1,2% | 39,7% | 5,8% | 41,3% | 0,0% | 7,5% | 0,0% | 26,4% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| so:step | 12.375 | 0,1% | 48,7% | 57,5% | 77,2% | 9,6 | 2,2% | 38,3% | 6,5% | 40,4% | 0,0% | 8,0% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 8,0% | 0,0% |
| so:triceps_maquina | 12.375 | 0,1% | 48,8% | 57,9% | 77,6% | 9,4 | 2,3% | 37,5% | 6,1% | 40,2% | 0,0% | 9,9% | 0,0% | 26,1% | 0,0% | 0,0% | 3,4% | 7,6% | 0,0% |
| so:roda_abdominal | 12.375 | 0,1% | 48,8% | 57,8% | 76,8% | 9,7 | 2,2% | 39,4% | 6,1% | 40,5% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| vazio | 12.375 | 8,0% | 49,1% | 57,9% | 76,8% | 9,7 | 2,2% | 39,3% | 6,1% | 40,3% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| so:suspensao | 12.375 | 0,5% | 49,3% | 65,3% | 76,9% | 8,8 | 4,5% | 36,5% | 12,9% | 32,3% | 1,1% | 7,0% | 29,6% | 23,4% | 0,0% | 0,0% | 6,2% | 9,6% | 0,0% |
| so:abdominal_maquina | 12.375 | 0,1% | 49,5% | 58,2% | 76,5% | 9,7 | 1,8% | 39,7% | 5,8% | 40,3% | 0,0% | 7,6% | 0,0% | 26,4% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| so:desenvolvimento_maquina | 12.375 | 0,1% | 49,6% | 58,0% | 76,9% | 9,7 | 2,2% | 39,1% | 6,2% | 40,0% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 2,8% | 7,5% | 0,0% |
| so:estacao_remada | 12.375 | 0,1% | 49,8% | 61,2% | 73,9% | 8,9 | 2,7% | 42,4% | 9,5% | 34,6% | 2,4% | 10,0% | 0,0% | 21,6% | 0,0% | 0,0% | 6,8% | 9,5% | 0,0% |
| banco+halteres-leves | 12.375 | 1,0% | 49,8% | 66,1% | 82,3% | 8,2 | 5,1% | 27,4% | 13,6% | 26,1% | 0,5% | 11,4% | 91,0% | 3,3% | 0,0% | 42,3% | 10,6% | 11,7% | 0,0% |
| halteres-banco | 12.375 | 2,0% | 49,8% | 66,1% | 82,3% | 8,2 | 5,1% | 27,4% | 13,6% | 26,1% | 0,5% | 11,4% | 91,0% | 3,3% | 0,0% | 42,3% | 10,6% | 11,7% | 0,0% |
| so:remada_articulada | 12.375 | 0,1% | 50,0% | 61,6% | 74,0% | 8,9 | 2,7% | 42,3% | 9,8% | 34,1% | 2,7% | 10,2% | 0,0% | 22,9% | 0,0% | 0,0% | 7,0% | 9,5% | 0,0% |
| so:smith | 12.375 | 0,1% | 50,2% | 62,3% | 74,1% | 8,9 | 3,8% | 42,3% | 9,2% | 34,4% | 0,6% | 9,2% | 0,0% | 28,4% | 0,0% | 0,0% | 6,7% | 9,3% | 0,0% |
| so:rack_de_agachamento | 12.375 | 0,1% | 50,5% | 62,7% | 74,4% | 8,9 | 3,8% | 41,8% | 9,2% | 34,1% | 0,8% | 9,4% | 0,0% | 28,4% | 0,0% | 0,0% | 6,7% | 9,5% | 0,0% |
| so:graviton | 12.375 | 0,1% | 50,7% | 62,7% | 73,6% | 8,9 | 3,2% | 43,0% | 8,2% | 34,8% | 1,4% | 10,0% | 25,6% | 20,3% | 0,0% | 0,0% | 7,1% | 9,3% | 0,0% |
| so:cadeira_flexora | 12.375 | 0,1% | 50,7% | 58,7% | 77,4% | 9,4 | 1,9% | 37,4% | 6,3% | 38,8% | 0,0% | 6,9% | 0,0% | 21,3% | 0,0% | 0,0% | 2,7% | 7,9% | 0,0% |
| so:mesa_flexora | 12.375 | 0,1% | 50,7% | 58,7% | 77,4% | 9,4 | 1,9% | 37,4% | 6,3% | 38,8% | 0,0% | 6,9% | 0,0% | 21,3% | 0,0% | 0,0% | 2,7% | 7,9% | 0,0% |
| so:supino_maquina | 12.375 | 0,1% | 50,7% | 58,1% | 77,2% | 9,6 | 2,3% | 38,7% | 6,4% | 39,9% | 0,0% | 8,0% | 0,0% | 24,0% | 0,0% | 0,0% | 1,8% | 8,2% | 0,0% |
| so:banco_romano | 12.375 | 0,1% | 50,8% | 57,1% | 76,8% | 9,9 | 2,5% | 38,6% | 6,6% | 41,4% | 0,0% | 9,8% | 0,0% | 24,1% | 0,0% | 0,0% | 0,5% | 8,8% | 0,0% |
| so:estacao_puxada | 12.375 | 0,1% | 50,9% | 63,2% | 74,0% | 8,9 | 3,3% | 42,4% | 8,0% | 34,2% | 1,3% | 9,7% | 0,0% | 22,7% | 0,0% | 0,0% | 7,7% | 9,6% | 0,0% |
| condominio | 12.375 | 6,0% | 51,7% | 67,8% | 81,8% | 8,3 | 4,1% | 27,1% | 14,0% | 27,4% | 0,6% | 11,2% | 94,0% | 0,0% | 0,0% | 4,4% | 5,5% | 10,7% | 0,0% |
| so:estacao_polia_dupla | 12.375 | 0,1% | 52,1% | 67,9% | 84,3% | 8,2 | 7,9% | 24,3% | 14,9% | 21,4% | 0,8% | 15,7% | 26,8% | 15,8% | 0,0% | 0,0% | 10,7% | 14,8% | 0,0% |
| so:multifuncional | 12.375 | 0,1% | 53,1% | 66,2% | 74,8% | 9,1 | 3,6% | 40,5% | 9,3% | 31,8% | 0,8% | 9,4% | 0,0% | 12,3% | 0,0% | 0,0% | 6,6% | 9,5% | 0,0% |
| so:barra_fixa | 12.375 | 1,0% | 53,4% | 65,7% | 74,7% | 9,1 | 2,8% | 40,1% | 8,1% | 31,8% | 1,2% | 9,5% | 0,0% | 11,1% | 0,0% | 0,0% | 7,0% | 9,2% | 0,0% |
| halteres+bola | 12.375 | 1,0% | 54,5% | 69,7% | 82,0% | 8,3 | 4,0% | 28,0% | 12,7% | 26,2% | 0,6% | 11,1% | 90,2% | 1,4% | 0,0% | 65,9% | 5,5% | 11,1% | 0,0% |
| halteres | 12.375 | 2,0% | 54,5% | 69,6% | 82,1% | 8,3 | 4,1% | 27,7% | 12,7% | 26,1% | 0,6% | 11,0% | 90,2% | 3,0% | 0,0% | 66,0% | 5,4% | 11,1% | 0,0% |
| so:anilhas_e_manoplas | 12.375 | 1,0% | 54,5% | 69,6% | 82,1% | 8,3 | 4,1% | 27,7% | 12,7% | 26,1% | 0,6% | 11,0% | 90,2% | 3,0% | 0,0% | 66,0% | 5,4% | 11,1% | 0,0% |

## Os piores perfis

Os programas com mais cuidados em falta (10 pontos por cuidado com defeito, 1 por cuidado só com nota), um por cenário, dias e minutos, para não repetir o mesmo caso.

1. **so:halteres_fixos · intermediario · 2 dias · 30 min · foco peito · joelho 7** (66 pontos)
   - Corpo todo A (41 min): flexao 4+bi, remada-curvada-halteres 2+bi, stiff 2, elevacao-halteres 4+bi, panturrilha-degrau 2+bi | Corpo todo B (35 min): flexao-pes-elevados 4+bi, remada-unilateral-sem-banco 2+bi, stiff-unilateral 2, abdominal-chao 2
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 41 min em 30
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (2 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_posterior com 2 séries, com foco em peito
   - c08b: Corpo todo B: abdominal-chao, e não abdominal-invertido
   - c12a: remada-curvada-halteres: uma carga só
   - c13a: Corpo todo A: remada-curvada-halteres → stiff
   - c15b: Corpo todo A: flexao + remada-curvada-halteres
   - c16b: média de 3,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
2. **so:halteres_fixos · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (66 pontos)
   - Superior A (5 min): rosca-alternada 3 | Inferior A (35 min): goblet 2, stiff 3, ponte-gluteo-halter 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (35 min): afundo 4, ponte-gluteo-halter 2, nordico 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 35 min em 30
   - c03c: dia típico de 20 min em 30
   - c03d: dia típico de 20 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 10 e o dia típico em 20 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Superior A: rosca-alternada, e não rosca-concentrada
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c12a: rosca-alternada: uma carga só
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
3. **so:halteres_fixos · avancado · 6 dias · 30 min · foco inferiores · cotovelo 7** (66 pontos)
   - Superior A (8 min): elevacao-halteres 2, crucifixo-invertido-curvado 2 | Inferior A (40 min): goblet 4, stiff 3, ponte-gluteo-halter 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (8 min): elevacao-halteres 2, crucifixo-invertido-sentado 2 | Inferior B (32 min): afundo 4, ponte-gluteo-halter 2, nordico 3+bi, panturrilha-degrau 2+bi | Superior C (8 min): elevacao-halteres 2, crucifixo-invertido-curvado 2 | Inferior C (32 min): afundo-tras 4, ponte-gluteo-halter 2, flexao-joelho-deslizante 3+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior A com 14 séries em 30 min
   - c03a: dia de 40 min em 30
   - c03c: dia típico de 20 min em 30
   - c03d: dia típico de 20 min em 30
   - c04b: abdomen com 2 séries
   - c04c: ombro_lateral com 6 de 12 e o dia típico em 20 de 30 min
   - c04d: ombro_lateral com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 4, mediana dos outros 6
   - c06c: panturrilha com 4, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: goblet, e não agachamento-halteres
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c12a: elevacao-halteres: uma carga só
   - c14b: Superior A com 2 exercícios
   - c16b: média de 9,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
4. **so:kettlebell · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (66 pontos)
   - Superior A (7 min): rosca-kettlebell 3 | Inferior A (35 min): goblet-kettlebell 2, stiff-kettlebell 3, ponte-kettlebell 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (7 min): rosca-kettlebell 3 | Inferior B (35 min): afundo-kettlebell 4, ponte-kettlebell 2, nordico 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 35 min em 30
   - c03d: dia típico de 21 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 10 e o dia típico em 21 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c12a: rosca-kettlebell: uma carga só
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
5. **so:kettlebell · intermediario · 2 dias · 30 min · foco peito · sem dor** (65 pontos)
   - Corpo todo A (41 min): flexao 4+bi, goblet-kettlebell 2+bi, remada-unilateral-kettlebell 2+bi, stiff-kettlebell 3+bi, panturrilha-degrau 2 | Corpo todo B (35 min): flexao-pes-elevados 4+bi, afundo-kettlebell 3+bi, remada-unilateral-kettlebell 2, abdominal-chao 2
   - c03a: dia de 41 min em 30
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (2 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_posterior com 2 séries, com foco em peito
   - c08a: Corpo todo A: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c08b: Corpo todo B: abdominal-chao, e não abdominal-invertido
   - c12a: goblet-kettlebell: uma carga só
   - c13a: Corpo todo A: remada-unilateral-kettlebell → stiff-kettlebell
   - c15b: Corpo todo A: flexao + goblet-kettlebell
   - c15c: Corpo todo A: remada-unilateral-kettlebell + stiff-kettlebell
   - c16b: média de 3,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
6. **so:paralelas · avancado · 4 dias · 30 min · foco inferiores · punho 7** (59 pontos)
   - Corpo todo A (41 min): agachamento-peso-corpo 4+bi, mergulho 2+bi, ponte-gluteo 2, flexao-joelho-deslizante 4, abdominal-chao 2 | Corpo todo B (30 min): mergulho 2, nordico 4+bi, panturrilha-degrau 4+bi, abertura-t-deitado 4 | Corpo todo C (35 min): afundo-peso-corpo 4+bi, mergulho 2+bi, ponte-gluteo 2, panturrilha-degrau 2 | Corpo todo D (39 min): afundo-tras-peso-corpo 4+bi, mergulho 2+bi, ponte-gluteo 2, flexao-joelho-deslizante 4
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 41 min em 30
   - c04b: abdomen com 2 séries
   - c04d: peito com 8 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 6, mediana dos outros 6
   - c06c: panturrilha com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c07c: quadriceps em Corpo todo C e Corpo todo D
   - c08b: Corpo todo A: abdominal-chao, e não elevacao-joelhos-paralelas
   - c09b: mergulho em todos os dias, sem outro do mesmo nível
   - c11a: mergulho 6 a 12
   - c12a: mergulho: começa no último degrau
   - c15b: Corpo todo A: agachamento-peso-corpo + mergulho
   - c16b: média de 9,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
7. **so:halteres_fixos · intermediario · 3 dias · 30 min · foco superiores · punho 7** (58 pontos)
   - Corpo todo A (31 min): supino-chao-halteres 2+bi, remada-curvada-halteres 4+bi, goblet 2, abdominal-chao 2 | Corpo todo B (45 min): supino-chao-halteres 4+bi, remada-unilateral-sem-banco 4+bi, stiff 3, rosca-alternada 4+bi, panturrilha-degrau 2+bi | Corpo todo C (34 min): supino-chao-halteres 4+bi, remada-curvada-halteres 4+bi, afundo 2, ponte-gluteo-halter 2
   - c02b: Corpo todo B com 17 séries em 30 min
   - c03a: dia de 45 min em 30
   - c04a: ombro_lateral sem nenhuma série
   - c04b: posteriores com 3 séries
   - c04d: ombro_lateral com 0 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c06b: ombro_lateral com 0, mediana dos outros 3,5
   - c06c: ombro_lateral com 0, mediana dos outros 3,5
   - c06d: posteriores com 3 séries, com foco em peito, costas, ombros, bracos
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c08b: Corpo todo A: abdominal-chao, e não abdominal-invertido
   - c09b: supino-chao-halteres em todos os dias, sem outro do mesmo nível
   - c12a: supino-chao-halteres: uma carga só
   - c13a: Corpo todo B: remada-unilateral-sem-banco → stiff
   - c15b: Corpo todo A: supino-chao-halteres + remada-curvada-halteres
   - c16b: média de 5,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
8. **so:paralelas · avancado · 5 dias · 30 min · foco inferiores · sem dor** (58 pontos)
   - Corpo todo A (30 min): agachamento-peso-corpo 2+bi, flexao 2+bi, ponte-gluteo 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (30 min): flexao-pes-elevados 2, nordico 4+bi, panturrilha-degrau 4+bi, abertura-t-deitado 4 | Corpo todo C (35 min): afundo-peso-corpo 4+bi, mergulho 2+bi, ponte-gluteo 2, panturrilha-degrau 2 | Corpo todo D (30 min): agachamento-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3, extensao-triceps-peso-corpo 2 | Corpo todo E (32 min): afundo-tras-peso-corpo 3+bi, flexao-pes-elevados 2+bi, ponte-gluteo 2, nordico 3
   - c02b: Corpo todo B com 14 séries em 30 min
   - c02c: Corpo todo A: 5 exercícios, todos com 2 séries
   - c03a: dia de 35 min em 30
   - c04b: abdomen com 2 séries
   - c04d: peito com 10 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 6, mediana dos outros 6
   - c06c: panturrilha com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c07c: quadriceps em Corpo todo D e Corpo todo E
   - c08b: Corpo todo A: abdominal-chao, e não elevacao-joelhos-paralelas
   - c11a: mergulho 6 a 12
   - c12a: mergulho: começa no último degrau
   - c15b: Corpo todo A: agachamento-peso-corpo + flexao
   - c16b: média de 9,5 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
9. **academia · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (57 pontos)
   - Superior A (12 min): rosca-maquina 3, triceps-barra-reta 3 | Inferior A (31 min): agachamento-barra 2, stiff 3, cadeira-flexora 2+drop+bi, coice-maquina 2+drop+bi, abdominal-polia 2 | Superior B (12 min): rosca-scott 3, triceps-corda 3 | Inferior B (45 min): afundo 4, coice-polia 2+drop+bi, cadeira-flexora 3+drop+bi, cadeira-extensora 3+drop+bi, panturrilha 2+drop+bi
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior B com 14 séries em 30 min
   - c03a: dia de 45 min em 30
   - c03d: dia típico de 21.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 10 e o dia típico em 21.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 3, mediana dos outros 6
   - c06c: panturrilha com 3, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: abdominal-polia, e não abdominal-maquina
   - c08b: Superior A: rosca-maquina, e não rosca-scott-banco-inclinado
   - c13a: Inferior A: agachamento-barra → stiff
   - c14b: Superior A com 2 exercícios
   - c16b: média de 7,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
10. **academia+ · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (57 pontos)
   - Superior A (12 min): rosca-maquina 3, triceps-barra-reta 3 | Inferior A (31 min): agachamento-barra 2, stiff 3, cadeira-flexora 2+drop+bi, coice-maquina 2+drop+bi, abdominal-polia 2 | Superior B (12 min): rosca-scott 3, triceps-corda 3 | Inferior B (45 min): afundo 4, coice-polia 2+drop+bi, cadeira-flexora 3+drop+bi, cadeira-extensora 3+drop+bi, panturrilha 2+drop+bi
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior B com 14 séries em 30 min
   - c03a: dia de 45 min em 30
   - c03d: dia típico de 21.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 10 e o dia típico em 21.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 3, mediana dos outros 6
   - c06c: panturrilha com 3, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: abdominal-polia, e não abdominal-maquina
   - c08b: Superior A: rosca-maquina, e não rosca-scott-banco-inclinado
   - c13a: Inferior A: agachamento-barra → stiff
   - c14b: Superior A com 2 exercícios
   - c16b: média de 7,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
11. **so:estacao_polia_dupla · avancado · 5 dias · 30 min · foco inferiores · sem dor** (57 pontos)
   - Superior (28 min): flexao 2+bi, puxada-unilateral 2+bi, remada-unilateral-polia 2, triceps-frances-polia-unilateral 3 | Inferior (37 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, nordico 4, abdominal-chao 2 | Empurrar (26 min): crucifixo-polia 2, elevacao-lateral 4, triceps-frances-polia-unilateral 2, crucifixo-polia-baixo 2 | Puxar (26 min): remada-unilateral-polia 2, puxada-unilateral 2, crucifixo-invertido-polia 2, rosca-polia-costas 2 | Pernas (40 min): afundo-peso-corpo 4, ponte-gluteo 3, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02b: Inferior com 14 séries em 30 min
   - c03a: dia de 40 min em 30
   - c04b: panturrilha com 2 séries
   - c04d: peito com 6 (faixa do avancado: 12 a 20)
   - c06b: quadriceps com 6, mediana dos outros 6
   - c06c: quadriceps com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Superior: flexao, e não flexao-pes-elevados
   - c10a: Inferior: duas vezes flexão de joelho
   - c14b: Empurrar sem multiarticular
   - c15b: Superior: flexao + puxada-unilateral
   - c16b: média de 6,8 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
12. **so:estacao_polia_dupla · avancado · 6 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (14 min): elevacao-lateral 2, crucifixo-polia 2, crucifixo-invertido-polia 2 | Inferior A (38 min): agachamento-peso-corpo 4, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (14 min): crucifixo-polia-baixo 2, elevacao-lateral 2, crucifixo-invertido-polia 2 | Inferior B (34 min): afundo-peso-corpo 4, ponte-gluteo 2, flexao-joelho-deslizante 3+bi, panturrilha-degrau 2+bi | Superior C (14 min): elevacao-lateral 2, crucifixo-polia 2, crucifixo-invertido-polia 2 | Inferior C (33 min): afundo-tras-peso-corpo 4, ponte-gluteo 2, nordico 3+bi, panturrilha-degrau 2+bi
   - c02b: Inferior A com 14 séries em 30 min
   - c03a: dia de 38 min em 30
   - c03d: dia típico de 23.5 min em 30
   - c04b: abdomen com 2 séries
   - c04c: peito com 6 de 12 e o dia típico em 23.5 de 30 min
   - c04d: peito com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 4, mediana dos outros 6
   - c06c: panturrilha com 4, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A sem multiarticular
   - c16b: média de 8,7 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
13. **so:halteres_fixos · intermediario · 5 dias · 30 min · foco inferiores · tornozelo 7** (57 pontos)
   - Superior (24 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, triceps-frances-halter 2 | Inferior (30 min): goblet 2, stiff 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Empurrar (28 min): flexao-pes-elevados 2, supino-chao-halteres 2, elevacao-halteres 4, triceps-frances-unilateral-halter 2 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-curvado 2, rosca-alternada 2 | Pernas (36 min): afundo 3, stiff-unilateral 3, ponte-gluteo-halter 2, nordico 3
   - c02c: Inferior: 5 exercícios, todos com 2 séries
   - c03a: dia de 36 min em 30
   - c04b: abdomen com 2 séries
   - c04d: peito com 6 (faixa do intermediario: 10 a 16)
   - c06b: quadriceps com 5, mediana dos outros 6
   - c06c: quadriceps com 5, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior: goblet, e não agachamento-halteres
   - c08b: Inferior: abdominal-chao, e não abdominal-invertido
   - c10a: Empurrar: duas vezes empurrar horizontal
   - c12a: remada-curvada-halteres: uma carga só
   - c13a: Superior: remada-curvada-halteres → remada-unilateral-sem-banco
   - c13b: Puxar: remada-curvada-halteres, remada-unilateral-sem-banco, crucifixo-invertido-curvado
   - c16b: média de 6,9 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
14. **so:kettlebell · intermediario · 3 dias · 30 min · foco superiores · sem dor** (57 pontos)
   - Corpo todo A (34 min): flexao 2+bi, remada-unilateral-kettlebell 4+bi, goblet-kettlebell 2, abdominal-chao 2 | Corpo todo B (48 min): flexao-pes-elevados 4+bi, remada-unilateral-kettlebell 4+bi, stiff-kettlebell 3, rosca-kettlebell 4+bi, panturrilha-degrau 2+bi | Corpo todo C (37 min): flexao 4+bi, remada-unilateral-kettlebell 4+bi, afundo-kettlebell 2, ponte-kettlebell 2
   - c02b: Corpo todo B com 17 séries em 30 min
   - c03a: dia de 48 min em 30
   - c04b: posteriores com 3 séries
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (6 séries indiretas)
   - c06d: posteriores com 3 séries, com foco em peito, costas, ombros, bracos
   - c08a: Corpo todo B: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c08b: Corpo todo A: abdominal-chao, e não abdominal-invertido
   - c09b: remada-unilateral-kettlebell em todos os dias, sem outro do mesmo nível
   - c12a: remada-unilateral-kettlebell: uma carga só
   - c13a: Corpo todo B: remada-unilateral-kettlebell → stiff-kettlebell
   - c15b: Corpo todo A: flexao + remada-unilateral-kettlebell
   - c16b: média de 6,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
15. **so:kettlebell · intermediario · 6 dias · 30 min · foco bracos · sem dor** (57 pontos)
   - Empurrar A (29 min): flexao-fechada 3, flexao 2, desenvolvimento-unilateral-kettlebell 2, triceps-frances-kettlebell 3 | Puxar A (29 min): remada-unilateral-kettlebell 2, rosca-kettlebell 4, abdominal-chao 4 | Pernas A (30 min): goblet-kettlebell 3, stiff-kettlebell 2, flexao-joelho-deslizante 3, panturrilha-degrau 3 | Empurrar B (30 min): flexao-fechada 4, flexao-pes-elevados 2, triceps-frances-kettlebell 2, rosca-kettlebell 3 | Puxar B (26 min): remada-unilateral-kettlebell 4, rosca-kettlebell 4 | Pernas B (28 min): afundo-kettlebell 2, stiff-unilateral-kettlebell 2, ponte-kettlebell 2, panturrilha-degrau 2
   - c01c: Empurrar B: flexao-pes-elevados depois de flexao-fechada
   - c02a: Puxar B com 2 exercícios em 30 min (faixa 3 a 5)
   - c04b: ombro_posterior com 3 séries
   - c04d: costas com 6 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (3 séries indiretas)
   - c05a: empurrar 13 ÷ puxar 6 séries
   - c05c: ombro da frente 7,5 ÷ de trás 3
   - c06d: ombro_posterior com 3 séries, com foco em bracos
   - c07c: biceps em Empurrar B e Puxar B
   - c08b: Puxar A: abdominal-chao, e não abdominal-invertido
   - c12a: desenvolvimento-unilateral-kettlebell: uma carga só
   - c14b: Puxar B com 2 exercícios
   - c16b: média de 8,2 séries por músculo (faixa do intermediario: a partir de 10)
16. **so:kettlebell · avancado · 5 dias · 30 min · foco superiores · joelho 7** (57 pontos)
   - Corpo todo A (30 min): flexao 2+bi, remada-unilateral-kettlebell 2+bi, stiff-kettlebell 2, triceps-frances-kettlebell 2, abdominal-chao 2 | Corpo todo B (34 min): flexao-pes-elevados 2+bi, remada-unilateral-kettlebell 2+bi, stiff-unilateral-kettlebell 2, rosca-kettlebell 3+bi, panturrilha-degrau 2+bi | Corpo todo C (27 min): flexao 2+bi, remada-unilateral-kettlebell 3+bi, flexao-fechada 2+bi, ponte-kettlebell 2+bi | Corpo todo D (31 min): flexao-pes-elevados 2+bi, remada-unilateral-kettlebell 3+bi, stiff-kettlebell 2, triceps-frances-kettlebell 3 | Corpo todo E (29 min): flexao 2+bi, remada-unilateral-kettlebell 2+bi, rosca-kettlebell 3, abducao-deitado 2
   - c02c: Corpo todo A: 5 exercícios, todos com 2 séries
   - c03a: dia de 34 min em 30
   - c04b: panturrilha com 2 séries
   - c04d: ombro_posterior com 6 (faixa do avancado: 12 a 20)
   - c04f: ombro_posterior sem exercício direto (6 séries indiretas)
   - c06d: panturrilha com 2 séries, com foco em peito, costas, ombros, bracos
   - c08b: Corpo todo A: abdominal-chao, e não abdominal-invertido
   - c09b: remada-unilateral-kettlebell em todos os dias, sem outro do mesmo nível
   - c12a: remada-unilateral-kettlebell: uma carga só
   - c13a: Corpo todo A: remada-unilateral-kettlebell → stiff-kettlebell
   - c15b: Corpo todo A: flexao + remada-unilateral-kettlebell
   - c16b: média de 8,6 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
17. **casa · iniciante · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior A (28 min): goblet 2, stiff 3, ponte-gluteo-halter 2, abdominal-chao 2 | Superior B (12 min): rosca-martelo 3, triceps-elastico-alto 3 | Inferior B (35 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, panturrilha-degrau 2
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 35 min em 30
   - c03c: dia típico de 20 min em 30
   - c03d: dia típico de 20 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: panturrilha com 2 de 6 e o dia típico em 20 de 30 min
   - c04d: panturrilha com 2 (faixa do iniciante: 6 a 10)
   - c06b: quadriceps com 6, mediana dos outros 6
   - c06c: quadriceps com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Superior A: rosca-alternada, e não rosca-concentrada
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c14b: Superior A com 2 exercícios
   - c15a: Inferior B: flexao-joelho-elastico em bi-set
   - c20a: o texto diz 4 e há dia com 5
18. **casa · iniciante · 5 dias · 30 min · foco inferiores · sem dor** (56 pontos)
   - Superior (29 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, triceps-frances-halter 3 | Inferior (28 min): goblet 2, stiff 3, ponte-gluteo-halter 2, abdominal-chao 2 | Empurrar (22 min): elevacao-halteres 4, triceps-frances-unilateral-halter 2, crucifixo-elastico 3 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (36 min): afundo 2, stiff-unilateral 3, ponte-gluteo-halter 2, extensao-joelho-elastico 2+bi, panturrilha-degrau 2+bi
   - c03a: dia de 36 min em 30
   - c04b: panturrilha com 2 séries
   - c04d: ombro_lateral com 4 (faixa do iniciante: 6 a 10)
   - c06b: quadriceps com 6, mediana dos outros 6
   - c06c: quadriceps com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior: goblet, e não agachamento-halteres
   - c08b: Inferior: abdominal-chao, e não abdominal-invertido
   - c13a: Superior: remada-curvada-halteres → remada-unilateral-sem-banco
   - c14b: Empurrar sem multiarticular
   - c15a: Pernas: extensao-joelho-elastico em bi-set
   - c16a: 17 exercícios diferentes na semana
   - c20a: o texto diz 4 e há dia com 5
19. **casa · avancado · 6 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (8 min): rosca-alternada 2, triceps-elastico-alto 2 | Inferior A (36 min): goblet 2, stiff 3, ponte-gluteo-halter 2, flexao-joelho-elastico 3, abdominal-chao 2 | Superior B (8 min): rosca-martelo 2, triceps-elastico-alto 2 | Inferior B (41 min): afundo 3, ponte-gluteo-halter 3, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, panturrilha-degrau 2 | Superior C (9 min): rosca-concentrada 2, triceps-elastico-alto 2 | Inferior C (33 min): afundo-tras 3, ponte-gluteo-halter 2, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 41 min em 30
   - c03d: dia típico de 21 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 12 e o dia típico em 21 de 30 min
   - c04d: biceps com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 2, mediana dos outros 6
   - c06c: panturrilha com 2, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: goblet, e não agachamento-halteres
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c14b: Superior A com 2 exercícios
   - c16b: média de 8,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
20. **casa+ · iniciante · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior A (29 min): bulgaro 2, stiff 3, ponte-gluteo-halter 2, abdominal-bola 2 | Superior B (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior B (35 min): afundo 2, ponte-kettlebell 2, flexao-joelho-elastico 3+bi, extensao-joelho-caneleira 2+drop+bi, panturrilha 2+drop
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 35 min em 30
   - c03d: dia típico de 21.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: panturrilha com 3 de 6 e o dia típico em 21.5 de 30 min
   - c04d: panturrilha com 3 (faixa do iniciante: 6 a 10)
   - c06b: posteriores com 6, mediana dos outros 6
   - c06c: quadriceps com 7, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: ponte-gluteo-halter, e não coice-caneleira
   - c08b: Inferior A: bulgaro, e não goblet
   - c14b: Superior A com 2 exercícios
   - c15a: Inferior B: flexao-joelho-elastico em bi-set
   - c20a: o texto diz 4 e há dia com 5
21. **condominio · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (7 min): rosca-scott-banco-inclinado 3 | Inferior A (36 min): bulgaro 2, stiff 3, ponte-gluteo-halter 2, flexao-bola 3, abdominal-bola 2 | Superior B (7 min): rosca-scott-banco-inclinado 3 | Inferior B (32 min): afundo 3, ponte-gluteo-halter 2, flexao-bola 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 36 min em 30
   - c03c: dia típico de 19.5 min em 30
   - c03d: dia típico de 19.5 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 10 e o dia típico em 19.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior B: afundo, e não afundo-tras
   - c08b: Inferior A: bulgaro, e não goblet
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,9 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
22. **condominio · avancado · 6 dias · 30 min · foco inferiores · cotovelo 7** (56 pontos)
   - Superior A (13 min): elevacao-halteres 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior A (43 min): bulgaro 4, stiff 3, ponte-gluteo-halter 2, flexao-bola 3, abdominal-bola 2 | Superior B (13 min): crucifixo-inclinado-halteres 2, elevacao-halteres 2, crucifixo-invertido-curvado 2 | Inferior B (32 min): afundo 4, ponte-gluteo-halter 2, flexao-bola 3+bi, panturrilha-degrau 2+bi | Superior C (13 min): elevacao-halteres 2, crucifixo-halteres 2, crucifixo-invertido-sentado 2 | Inferior C (32 min): afundo-tras 4, ponte-gluteo-halter 2, flexao-bola 3+bi, panturrilha-degrau 2+bi
   - c02b: Inferior A com 14 séries em 30 min
   - c03a: dia de 43 min em 30
   - c03d: dia típico de 22.5 min em 30
   - c04b: abdomen com 2 séries
   - c04c: peito com 6 de 12 e o dia típico em 22.5 de 30 min
   - c04d: peito com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 4, mediana dos outros 6
   - c06c: panturrilha com 4, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: bulgaro, e não goblet
   - c14b: Superior A sem multiarticular
   - c16b: média de 9,1 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
23. **condominio+ · avancado · 6 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (9 min): rosca-scott-banco-inclinado 2, triceps-elastico-alto 2 | Inferior A (34 min): bulgaro 2, stiff 3, hip-thrust 2, cadeira-flexora 2+drop, abdominal-bola 2 | Superior B (9 min): rosca-scott-banco-inclinado 2, triceps-elastico-alto 2 | Inferior B (33 min): afundo 2, hip-thrust 3, cadeira-flexora 2+drop+bi, cadeira-extensora 2+drop+bi, panturrilha 2+drop | Superior C (9 min): rosca-scott-banco-inclinado 2, triceps-elastico-alto 2 | Inferior C (29 min): afundo-tras 3, hip-thrust 2, cadeira-flexora 3, cadeira-extensora 2
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 12 e o dia típico em 19 de 30 min
   - c04d: biceps com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 3, mediana dos outros 6
   - c06c: panturrilha com 3, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: bulgaro, e não goblet
   - c14b: Superior A com 2 exercícios
   - c16b: média de 8,5 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
24. **elasticos · intermediario · 2 dias · 30 min · foco peito · joelho 7** (56 pontos)
   - Corpo todo A (42 min): flexao 4+bi, remada-elastico 2+bi, stiff-elastico 2, elevacao-lateral-elastico 4+bi, panturrilha-degrau 2+bi | Corpo todo B (32 min): flexao-pes-elevados 4+bi, remada-curvada-elastico 2+bi, stiff-elastico 2, abdominal-chao 2
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 42 min em 30
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (2 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_posterior com 2 séries, com foco em peito
   - c08a: Corpo todo A: remada-elastico, e não remada-unilateral-elastico
   - c08b: Corpo todo B: remada-curvada-elastico, e não remada-unilateral-elastico
   - c13a: Corpo todo B: remada-curvada-elastico → stiff-elastico
   - c15b: Corpo todo A: flexao + remada-elastico
   - c16b: média de 3,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
25. **elasticos · avancado · 6 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (8 min): rosca-elastico 2, triceps-elastico-alto 2 | Inferior A (36 min): agachamento-elastico 2, stiff-elastico 3, ponte-gluteo 2, flexao-joelho-elastico 3, abdominal-chao 2 | Superior B (8 min): rosca-martelo-elastico 2, triceps-elastico-alto 2 | Inferior B (36 min): afundo-peso-corpo 3, coice-elastico 3+bi, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, panturrilha-degrau 2+bi | Superior C (8 min): rosca-elastico 2, triceps-elastico-alto 2 | Inferior C (34 min): afundo-tras-peso-corpo 3, ponte-gluteo 2, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 36 min em 30
   - c03d: dia típico de 21 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 12 e o dia típico em 21 de 30 min
   - c04d: biceps com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 2, mediana dos outros 6
   - c06c: panturrilha com 2, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: agachamento-elastico, e não agachamento-peso-corpo
   - c14b: Superior A com 2 exercícios
   - c16b: média de 8,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
26. **halteres · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (5 min): rosca-alternada 3 | Inferior A (35 min): goblet 2, stiff 3, ponte-gluteo-halter 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (35 min): afundo 4, ponte-gluteo-halter 2, nordico 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 35 min em 30
   - c03c: dia típico de 20 min em 30
   - c03d: dia típico de 20 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 10 e o dia típico em 20 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Superior A: rosca-alternada, e não rosca-concentrada
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
27. **halteres · avancado · 6 dias · 30 min · foco inferiores · cotovelo 7** (56 pontos)
   - Superior A (8 min): elevacao-halteres 2, crucifixo-invertido-curvado 2 | Inferior A (40 min): goblet 4, stiff 3, ponte-gluteo-halter 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (8 min): elevacao-halteres 2, crucifixo-invertido-sentado 2 | Inferior B (32 min): afundo 4, ponte-gluteo-halter 2, nordico 3+bi, panturrilha-degrau 2+bi | Superior C (8 min): elevacao-halteres 2, crucifixo-invertido-curvado 2 | Inferior C (32 min): afundo-tras 4, ponte-gluteo-halter 2, flexao-joelho-deslizante 3+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior A com 14 séries em 30 min
   - c03a: dia de 40 min em 30
   - c03c: dia típico de 20 min em 30
   - c03d: dia típico de 20 min em 30
   - c04b: abdomen com 2 séries
   - c04c: ombro_lateral com 6 de 12 e o dia típico em 20 de 30 min
   - c04d: ombro_lateral com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 4, mediana dos outros 6
   - c06c: panturrilha com 4, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: goblet, e não agachamento-halteres
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c14b: Superior A com 2 exercícios
   - c16b: média de 9,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
28. **halteres-banco · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (5 min): rosca-alternada 3 | Inferior A (36 min): bulgaro 2, stiff 3, ponte-gluteo-halter 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (35 min): afundo 4, ponte-gluteo-halter 2, nordico 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 36 min em 30
   - c03c: dia típico de 20 min em 30
   - c03d: dia típico de 20 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 10 e o dia típico em 20 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Superior A: rosca-alternada, e não rosca-concentrada
   - c08b: Inferior A: bulgaro, e não goblet
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
29. **halteres-banco · intermediario · 5 dias · 30 min · foco inferiores · tornozelo 7** (56 pontos)
   - Superior (29 min): supino-reto 3, remada-curvada-halteres 2, remada-unilateral-halter 2, triceps-frances-halter 3 | Inferior (31 min): bulgaro 2, stiff 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Empurrar (21 min): crucifixo-halteres 3, elevacao-halteres 4, triceps-frances-unilateral-halter 2 | Puxar (22 min): remada-unilateral-sem-banco 2, remada-curvada-halteres 2, crucifixo-invertido-curvado 2, rosca-alternada 2 | Pernas (36 min): afundo 3, stiff-unilateral 3, ponte-gluteo-halter 2, nordico 3
   - c02c: Inferior: 5 exercícios, todos com 2 séries
   - c03a: dia de 36 min em 30
   - c04b: abdomen com 2 séries
   - c04d: peito com 6 (faixa do intermediario: 10 a 16)
   - c06b: quadriceps com 5, mediana dos outros 6
   - c06c: quadriceps com 5, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Pernas: afundo, e não afundo-tras
   - c08b: Inferior: bulgaro, e não goblet
   - c13a: Puxar: remada-unilateral-sem-banco → remada-curvada-halteres → crucifixo-invertido-curvado
   - c13b: Puxar: remada-unilateral-sem-banco, remada-curvada-halteres, crucifixo-invertido-curvado
   - c14b: Empurrar sem multiarticular
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
30. **halteres-banco · avancado · 6 dias · 30 min · foco inferiores · cotovelo 7** (56 pontos)
   - Superior A (13 min): elevacao-halteres 2, crucifixo-halteres 2, crucifixo-invertido-curvado 2 | Inferior A (43 min): bulgaro 4, stiff 3, ponte-gluteo-halter 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (13 min): crucifixo-halteres 2, elevacao-halteres 2, crucifixo-invertido-sentado 2 | Inferior B (32 min): afundo 4, ponte-gluteo-halter 2, nordico 3+bi, panturrilha-degrau 2+bi | Superior C (13 min): elevacao-halteres 2, crucifixo-halteres 2, crucifixo-invertido-curvado 2 | Inferior C (32 min): afundo-tras 4, ponte-gluteo-halter 2, flexao-joelho-deslizante 3+bi, panturrilha-degrau 2+bi
   - c02b: Inferior A com 14 séries em 30 min
   - c03a: dia de 43 min em 30
   - c03d: dia típico de 22.5 min em 30
   - c04b: abdomen com 2 séries
   - c04c: peito com 6 de 12 e o dia típico em 22.5 de 30 min
   - c04d: peito com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 4, mediana dos outros 6
   - c06c: panturrilha com 4, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: bulgaro, e não goblet
   - c14b: Superior A sem multiarticular
   - c16b: média de 8,9 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
31. **diego · avancado · 6 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (8 min): rosca-elastico 2, triceps-elastico-alto 2 | Inferior A (36 min): agachamento-elastico 2, stiff-elastico 3, ponte-gluteo 2, flexao-joelho-elastico 3, abdominal-chao 2 | Superior B (8 min): rosca-martelo-elastico 2, triceps-elastico-alto 2 | Inferior B (36 min): afundo-peso-corpo 3, coice-elastico 3+bi, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, panturrilha-degrau 2+bi | Superior C (8 min): rosca-elastico 2, triceps-elastico-alto 2 | Inferior C (34 min): afundo-tras-peso-corpo 3, ponte-gluteo 2, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 36 min em 30
   - c03d: dia típico de 21 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 12 e o dia típico em 21 de 30 min
   - c04d: biceps com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 2, mediana dos outros 6
   - c06c: panturrilha com 2, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: agachamento-elastico, e não agachamento-peso-corpo
   - c14b: Superior A com 2 exercícios
   - c16b: média de 8,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
32. **bruno · iniciante · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (14 min): rosca-scott-banco-inclinado 3, triceps-barra-reta 3 | Inferior A (28 min): bulgaro 2, stiff 3, hip-thrust 2, abdominal-polia 2 | Superior B (14 min): rosca-scott-banco-inclinado 3, triceps-corda 3 | Inferior B (37 min): afundo 2, hip-thrust 2, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, panturrilha 2+drop
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 37 min em 30
   - c03d: dia típico de 21 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: panturrilha com 3 de 6 e o dia típico em 21 de 30 min
   - c04d: panturrilha com 3 (faixa do iniciante: 6 a 10)
   - c06b: quadriceps com 6, mediana dos outros 6
   - c06c: quadriceps com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior B: afundo, e não afundo-tras
   - c08b: Inferior A: bulgaro, e não goblet
   - c14b: Superior A com 2 exercícios
   - c15a: Inferior B: flexao-joelho-elastico em bi-set
   - c20a: o texto diz 4 e há dia com 5
33. **bruno · intermediario · 6 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (9 min): rosca-scott-banco-inclinado 2, triceps-barra-reta 2 | Inferior A (30 min): bulgaro 2, stiff 2, hip-thrust 2, flexao-bola 2, abdominal-polia 2 | Superior B (9 min): rosca-scott-banco-inclinado 2, triceps-corda 2 | Inferior B (37 min): afundo 2, hip-thrust 2, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, panturrilha 2+drop | Superior C (9 min): rosca-scott-banco-inclinado 2, triceps-corda 2 | Inferior C (28 min): afundo-tras 2, hip-thrust 2, flexao-bola 3, extensao-joelho-elastico 2
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02c: Inferior A: 5 exercícios, todos com 2 séries
   - c03a: dia de 37 min em 30
   - c03c: dia típico de 18.5 min em 30
   - c03d: dia típico de 18.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 10 e o dia típico em 18.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 3, mediana dos outros 6
   - c06c: panturrilha com 3, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: bulgaro, e não goblet
   - c14b: Superior A com 2 exercícios
   - c16b: média de 7,9 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
34. **bairro · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (7 min): rosca-scott-banco-inclinado 3 | Inferior A (36 min): leg-press 3, stiff 3, ponte-gluteo-halter 2, cadeira-flexora 2+drop, abdominal-chao 2 | Superior B (7 min): rosca-scott-banco-inclinado 3 | Inferior B (41 min): afundo 4, ponte-gluteo-halter 3, cadeira-flexora 3+drop+bi, cadeira-extensora 2+drop+bi, panturrilha-leg-press 2+drop
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior B com 14 séries em 30 min
   - c03a: dia de 41 min em 30
   - c03d: dia típico de 21.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 10 e o dia típico em 21.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 3, mediana dos outros 4
   - c06c: panturrilha com 3, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c14b: Superior A com 1 exercício
   - c16b: média de 7,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
35. **so:barra_fixa · intermediario · 2 dias · 30 min · foco peito+costas · sem dor** (56 pontos)
   - Corpo todo A (31 min): flexao 4+bi, barra-fixa 2+bi, agachamento-peso-corpo 2, panturrilha-degrau 2 | Corpo todo B (40 min): flexao-pes-elevados 4+bi, afundo-peso-corpo 2+bi, ponte-gluteo 2, nordico 2, abdominal-chao 2
   - c03a: dia de 40 min em 30
   - c04b: costas com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (1 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 2 séries
   - c05c: ombro da frente 4 ÷ de trás 1
   - c06b: costas com 2, mediana dos outros 2
   - c06c: costas com 2, mediana dos outros 2
   - c06d: ombro_posterior com 1 séries, com foco em peito, costas
   - c08b: Corpo todo A: barra-fixa, e não barra-fixa-supinada
   - c15b: Corpo todo A: flexao + barra-fixa
   - c16b: média de 3,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
36. **so:barra_fixa · intermediario · 4 dias · 30 min · foco inferiores · punho 7** (56 pontos)
   - Superior A (21 min): barra-fixa 4, barra-fixa-negativa 2, abertura-t-deitado 2 | Inferior A (32 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (11 min): barra-fixa-supinada 2, abertura-t-deitado 2 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior B com 2 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c04b: panturrilha com 2 séries
   - c04d: costas com 8 (faixa do intermediario: 10 a 16)
   - c06b: quadriceps com 5, mediana dos outros 8
   - c06c: quadriceps com 5, mediana dos outros 8
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não elevacao-joelhos
   - c10a: Superior A: duas vezes puxar vertical
   - c14b: Superior B com 2 exercícios
   - c16b: média de 7,2 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
37. **so:halteres_fixos · intermediario · 2 dias · 45 min · foco inferiores · sem dor** (56 pontos)
   - Corpo todo A (43 min): goblet 3+bi, flexao 2+bi, stiff 2+bi, remada-curvada-halteres 2+bi, panturrilha-degrau 2+bi, triceps-frances-halter 2+bi, abdominal-chao 4 | Corpo todo B (53 min): afundo 4+bi, flexao-pes-elevados 2+bi, ponte-gluteo-halter 4+bi, remada-unilateral-sem-banco 2+bi, flexao-joelho-deslizante 3+bi, rosca-alternada 2+bi
   - c03a: dia de 53 min em 45
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 4 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: posteriores com 5, mediana dos outros 4
   - c06d: ombro_lateral com 0 séries, com foco em pernas, gluteos
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c08b: Corpo todo A: stiff, e não stiff-unilateral
   - c12a: goblet: uma carga só
   - c13a: Corpo todo A: stiff → remada-curvada-halteres
   - c15b: Corpo todo A: goblet + flexao
   - c15c: Corpo todo A: stiff + remada-curvada-halteres
   - c16b: média de 4,2 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 6 e há dia com 7
38. **so:anilhas_e_manoplas · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (5 min): rosca-alternada 3 | Inferior A (35 min): goblet 2, stiff 3, ponte-gluteo-halter 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (35 min): afundo 4, ponte-gluteo-halter 2, nordico 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 35 min em 30
   - c03c: dia típico de 20 min em 30
   - c03d: dia típico de 20 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: biceps com 6 de 10 e o dia típico em 20 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Superior A: rosca-alternada, e não rosca-concentrada
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
39. **so:anilhas_e_manoplas · avancado · 6 dias · 30 min · foco inferiores · cotovelo 7** (56 pontos)
   - Superior A (8 min): elevacao-halteres 2, crucifixo-invertido-curvado 2 | Inferior A (40 min): goblet 4, stiff 3, ponte-gluteo-halter 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (8 min): elevacao-halteres 2, crucifixo-invertido-sentado 2 | Inferior B (32 min): afundo 4, ponte-gluteo-halter 2, nordico 3+bi, panturrilha-degrau 2+bi | Superior C (8 min): elevacao-halteres 2, crucifixo-invertido-curvado 2 | Inferior C (32 min): afundo-tras 4, ponte-gluteo-halter 2, flexao-joelho-deslizante 3+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior A com 14 séries em 30 min
   - c03a: dia de 40 min em 30
   - c03c: dia típico de 20 min em 30
   - c03d: dia típico de 20 min em 30
   - c04b: abdomen com 2 séries
   - c04c: ombro_lateral com 6 de 12 e o dia típico em 20 de 30 min
   - c04d: ombro_lateral com 6 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 4, mediana dos outros 6
   - c06c: panturrilha com 4, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: goblet, e não agachamento-halteres
   - c08b: Inferior A: stiff, e não stiff-unilateral
   - c14b: Superior A com 2 exercícios
   - c16b: média de 9,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
40. **so:kettlebell · intermediario · 2 dias · 45 min · foco inferiores · sem dor** (56 pontos)
   - Corpo todo A (45 min): goblet-kettlebell 3+bi, flexao 2+bi, stiff-kettlebell 2+bi, remada-unilateral-kettlebell 2+bi, panturrilha-degrau 2+bi, triceps-frances-kettlebell 2+bi, abdominal-chao 4 | Corpo todo B (55 min): afundo-kettlebell 4+bi, flexao-pes-elevados 2+bi, ponte-kettlebell 4+bi, remada-unilateral-kettlebell 2+bi, flexao-joelho-deslizante 3+bi, rosca-kettlebell 2+bi
   - c03a: dia de 55 min em 45
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 4 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (2 séries indiretas)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: posteriores com 5, mediana dos outros 4
   - c06d: ombro_posterior com 2 séries, com foco em pernas, gluteos
   - c08a: Corpo todo A: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c08b: Corpo todo A: abdominal-chao, e não abdominal-invertido
   - c12a: goblet-kettlebell: uma carga só
   - c13a: Corpo todo A: stiff-kettlebell → remada-unilateral-kettlebell
   - c15b: Corpo todo A: goblet-kettlebell + flexao
   - c15c: Corpo todo A: stiff-kettlebell + remada-unilateral-kettlebell
   - c16b: média de 4,7 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 6 e há dia com 7

## Exemplos

O 1º programa da população com cada medida em falta (sem dor; quando só aparece com dor, com dor).

- `c01c` **o multiarticular mais técnico (complexidade 3) não é o 1º da sua região**: casa · intermediario · 2 dias · 30 min · foco costas · sem dor: Corpo todo B: flexao-pes-elevados depois de remada-unilateral-sem-banco
  - Corpo todo A (38 min): remada-curvada-halteres 4+bi, goblet 2+bi, flexao 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (36 min): remada-unilateral-sem-banco 4+bi, afundo 3+bi, flexao-pes-elevados 2, abdominal-chao 2
- `c02a` **exercícios por dia fora da faixa dos minutos (A1)**: casa · iniciante · 2 dias · 90 min · foco bracos · sem dor: Corpo todo A com 11 exercícios em 90 min (faixa 5 a 10)
  - Corpo todo A (88 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, rosca-alternada 4, triceps-testa-halteres 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (72 min): afundo 3, flexao 2, remada-unilateral-sem-banco 3, rosca-martelo 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2
- `c02b` **séries demais para os minutos (acima de 0,45 por minuto)**: casa · iniciante · 2 dias · 30 min · foco pernas · sem dor: Corpo todo B com 14 séries em 30 min
  - Corpo todo A (27 min): goblet 2+bi, flexao 2+bi, stiff 2+bi, remada-curvada-halteres 2+bi, panturrilha-degrau 2 | Corpo todo B (45 min): afundo 4+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 4, abdominal-chao 2
- `c02c` **dia de 5 exercícios ou mais com 2 séries em todos**: casa · iniciante · 2 dias · 30 min · foco pernas · sem dor: Corpo todo A: 5 exercícios, todos com 2 séries
  - Corpo todo A (27 min): goblet 2+bi, flexao 2+bi, stiff 2+bi, remada-curvada-halteres 2+bi, panturrilha-degrau 2 | Corpo todo B (45 min): afundo 4+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 4, abdominal-chao 2
- `c03a` **dia mais longo acima de 110% dos minutos (A3)**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: dia de 38 min em 30
  - Corpo todo A (38 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (35 min): flexao 4+bi, afundo 3+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c03c` **dia típico abaixo de 70% dos minutos (com ou sem aviso)**: casa · iniciante · 3 dias · 90 min · foco nenhum · sem dor: dia típico de 61 min em 90
  - Corpo todo A (54 min): goblet 3, flexao 2, remada-curvada-halteres 3, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (62 min): stiff 3, flexao 2, remada-unilateral-sem-banco 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-invertido 2 | Corpo todo C (61 min): afundo 3, supino-chao-halteres 2, remada-curvada-halteres 3, ponte-gluteo-halter 3, elevacao-halteres 3, triceps-testa-halteres 2, flexao-joelho-elastico 2, abdominal-chao 2
- `c03d` **dia típico abaixo de 85% dos minutos**: casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: dia típico de 75 min em 90
  - Corpo todo A (75 min): goblet 3, flexao 3, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): afundo 3, flexao 3, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2
- `c04a` **músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_lateral sem nenhuma série
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c04b` **músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_posterior com 2 séries
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c04f` **músculo sem exercício direto (só séries indiretas) havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_lateral sem exercício direto (0 séries indiretas)
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c04c` **músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%)**: casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: gluteos com 4,5 de 6 e o dia típico em 75 de 90 min
  - Corpo todo A (75 min): goblet 3, flexao 3, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): afundo 3, flexao 3, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2
- `c04d` **algum músculo abaixo da faixa do nível (havendo exercício)**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: peito com 4 (faixa do iniciante: 6 a 10)
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c04e` **algum músculo acima da faixa do nível**: casa · iniciante · 2 dias · 75 min · foco gluteos · sem dor: gluteos com 10,5 (faixa do iniciante: 6 a 10)
  - Corpo todo A (72 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 4, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (73 min): ponte-gluteo-halter 4+bi, flexao 2+bi, afundo 2+bi, remada-unilateral-sem-banco 3+bi, abducao-elastico 3+bi, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, rosca-alternada 2+drop+bi, crucifixo-invertido-sentado 2+drop, abdominal-invertido 2
- `c05a` **empurrar ÷ puxar acima de 1,5 havendo como puxar (D1)**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: empurrar 8 ÷ puxar 4 séries
  - Corpo todo A (38 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (35 min): flexao 4+bi, afundo 3+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c05b` **quadríceps ÷ posteriores fora de 0,5 a 2 (D3)**: casa · iniciante · 2 dias · 30 min · foco nenhum · quadril 7: quadríceps 0 ÷ posteriores 3
  - Corpo todo A (29 min): flexao 3+bi, remada-curvada-halteres 3+bi, elevacao-halteres 4+bi, panturrilha-degrau 2+bi | Corpo todo B (29 min): flexao 3+bi, remada-unilateral-sem-banco 3+bi, flexao-joelho-elastico 3, abdominal-chao 2
- `c05c` **ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás**: academia · avancado · 3 dias · 45 min · foco peito · sem dor: ombro da frente 7 ÷ de trás 3
  - Corpo todo A (45 min): supino-reto 4+bi, agachamento-barra 2+bi, puxada-unilateral 2, crucifixo-polia 4+bi, cadeira-flexora 3+bi, triceps-frances 2 | Corpo todo B (44 min): supino-inclinado 3+bi, stiff 3+bi, remada-apoiada 2, cadeira-extensora 2+bi, rosca-inclinada 3+bi, panturrilha 4 | Corpo todo C (45 min): supino-barra 3+bi, afundo 2+bi, puxada-barra-reta 2, coice-maquina 3+bi, elevacao-halteres 3+drop+bi, abdominal-polia 3+drop
- `c06a` **foco abaixo da meta com tempo e exercício (C1)**: condominio · avancado · 2 dias · 90 min · foco peito · sem dor: peito com 12 de 14 e o dia mais longo em 76 de 90 min
  - Corpo todo A (76 min): supino-reto 4, bulgaro 2, puxada-frente 3, stiff 3, crucifixo-halteres 4, triceps-frances-halter 2, elevacao-halteres 3, panturrilha-degrau 4, abdominal-bola 2 | Corpo todo B (68 min): supino-inclinado 4, afundo 2, remada-apoiada 3, goblet 2, flexao-bola 3, rosca-inclinada 3, crucifixo-inverso 3, elevacao-halteres 3, abdominal-chao 2
- `c06b` **o foco não passa da mediana dos outros (C2)**: casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 2,5
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c06c` **o foco fica a menos de 1,3 vez a mediana dos outros**: casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 2,5
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c06d` **com foco, outro músculo com menos de 4 séries havendo exercício**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: ombro_lateral com 0 séries, com foco em peito
  - Corpo todo A (38 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (35 min): flexao 4+bi, afundo 3+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c07a` **músculo com 8 séries diretas ou mais treinado num dia só**: casa · iniciante · 2 dias · 75 min · foco pernas · sem dor: panturrilha com 8 séries diretas num dia só
  - Corpo todo A (75 min): goblet 4+bi, flexao 2+bi, stiff 4+bi, remada-curvada-halteres 3+bi, panturrilha-degrau 4+bi, triceps-frances-halter 3+drop+bi, panturrilha-sentada-halter 3+drop+bi, elevacao-halteres 2+drop+bi, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 3, flexao-joelho-elastico 4+bi, extensao-joelho-elastico 3+bi, rosca-alternada 3+bi, crucifixo-invertido-sentado 3+bi, elevacao-halteres 2+drop+bi, aducao-deitado 2+bi, abdominal-invertido 2
- `c07c` **o mesmo músculo com 3 séries diretas ou mais em dias seguidos**: casa · iniciante · 4 dias · 45 min · foco ombros · sem dor: ombro_lateral em Superior B e Inferior B
  - Superior A (40 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 3, triceps-frances-halter 2, crucifixo-invertido-sentado 2 | Inferior A (43 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 4 | Superior B (43 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, desenvolvimento-unilateral 2, elevacao-halteres 3, crucifixo-invertido-sentado 2 | Inferior B (45 min): afundo 2, ponte-gluteo-halter 3, elevacao-halteres 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3
- `c08a` **exercício escolhido por ter animação, com um equivalente sem uso no programa**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet, e não agachamento-halteres
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c08b` **exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: stiff, e não stiff-unilateral
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c09b` **o mesmo exercício em todos os dias sem opção do mesmo nível (B2)**: elasticos · avancado · 3 dias · 75 min · foco superiores · sem dor: puxada-elastico em todos os dias, sem outro do mesmo nível
  - Corpo todo A (75 min): flexao 3, puxada-elastico 4, agachamento-elastico 2, triceps-elastico-acima 4, elevacao-lateral-elastico 4, crucifixo-elastico 3, rosca-elastico 3, flexao-joelho-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): flexao-pes-elevados 2, remada-elastico 4, puxada-elastico 2, stiff-elastico 2, desenvolvimento-elastico 2, rosca-martelo-elastico 3, extensao-joelho-elastico 2, panturrilha-degrau 4, face-pull-elastico 2, abdominal-invertido 2 | Corpo todo C (74 min): flexao 2+bi, puxada-elastico 4+bi, flexao-fechada 4+bi, afundo-peso-corpo 2+bi, ponte-gluteo 3, elevacao-lateral-unilateral-elastico 4+bi, rosca-elastico 2+bi, flexao-joelho-elastico 2
- `c10a` **dois exercícios da mesma função no mesmo dia**: casa · iniciante · 2 dias · 90 min · foco ombros · sem dor: Corpo todo A: duas vezes elevação lateral
  - Corpo todo A (80 min): goblet 3, flexao 2, remada-curvada-halteres 3, stiff 3, elevacao-halteres 4, elevacao-lateral-unilateral 2, triceps-frances-halter 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (79 min): afundo 2, flexao 2, remada-unilateral-sem-banco 3, desenvolvimento-unilateral 2, elevacao-halteres 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, abdominal-invertido 2
- `c10b` **três exercícios ou mais do mesmo músculo no mesmo dia**: casa+ · iniciante · 5 dias · 30 min · foco peito · sem dor: Empurrar: 3 exercícios de peito
  - Superior (25 min): supino-reto 3, barra-fixa-negativa 2, remada-apoiada 2, triceps-frances-halter 2 | Inferior (31 min): bulgaro 2, stiff 2, panturrilha 2, abdominal-bola 4 | Empurrar (23 min): supino-inclinado 3, supino-reto 2, crucifixo-halteres 2, triceps-frances-kettlebell 2 | Puxar (22 min): remada-unilateral-halter 2, barra-fixa-negativa 2, crucifixo-inverso 2, rosca-inclinada 2 | Pernas (25 min): afundo 2, ponte-gluteo-halter 2, extensao-joelho-caneleira 2, flexao-bola 2
- `c11a` **peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado**: bairro · avancado · 2 dias · 90 min · foco bracos · sem dor: mergulho 6 a 12
  - Corpo todo A (89 min): mergulho 4, leg-press 3, supino-reto 2, barra-fixa 3, stiff 3, triceps-frances-halter 4, rosca-inclinada 4, elevacao-halteres 3, panturrilha-leg-press 4, crucifixo-halteres 2, abdominal-chao 2 | Corpo todo B (89 min): afundo 2, supino-inclinado 2, remada-apoiada 3, rosca-scott-banco-inclinado 4, rosca-inclinada 4, triceps-frances-unilateral-halter 4, cadeira-flexora 3, cadeira-extensora 2, crucifixo-inverso 3, elevacao-halteres 3, abdominal-invertido 2
- `c12a` **exercício sem próximo passo de carga (uma carga só, ou já no último degrau)**: bairro · avancado · 2 dias · 90 min · foco bracos · sem dor: mergulho: começa no último degrau
  - Corpo todo A (89 min): mergulho 4, leg-press 3, supino-reto 2, barra-fixa 3, stiff 3, triceps-frances-halter 4, rosca-inclinada 4, elevacao-halteres 3, panturrilha-leg-press 4, crucifixo-halteres 2, abdominal-chao 2 | Corpo todo B (89 min): afundo 2, supino-inclinado 2, remada-apoiada 3, rosca-scott-banco-inclinado 4, rosca-inclinada 4, triceps-frances-unilateral-halter 4, cadeira-flexora 3, cadeira-extensora 2, crucifixo-inverso 3, elevacao-halteres 3, abdominal-invertido 2
- `c13a` **dois exercícios seguidos que carregam a lombar sem apoio**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: remada-curvada-halteres → stiff
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c13b` **três exercícios ou mais no dia que carregam a lombar sem apoio**: casa · iniciante · 2 dias · 90 min · foco costas · sem dor: Corpo todo A: remada-curvada-halteres, remada-unilateral-sem-banco, stiff
  - Corpo todo A (79 min): remada-curvada-halteres 4, remada-unilateral-sem-banco 2, goblet 2, flexao 2, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (71 min): remada-unilateral-sem-banco 4, afundo 3, flexao 2, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 2, crucifixo-invertido-sentado 2, elevacao-halteres 3, abdominal-invertido 2
- `c13c` **três exercícios seguidos que dependem da pegada**: academia · avancado · 3 dias · 75 min · foco superiores · sem dor: Corpo todo B: remada-apoiada → puxada-frente → stiff
  - Corpo todo A (74 min): supino-reto 4, puxada-unilateral 4, agachamento-barra 2, triceps-frances 4+bi, elevacao-halteres 4+bi, crucifixo-polia 4, rosca-inclinada 3, cadeira-flexora 2, abdominal-polia 2 | Corpo todo B (74 min): supino-inclinado 3, remada-apoiada 4, puxada-frente 2, stiff 2, desenvolvimento 2, rosca-maquina 3, cadeira-extensora 2, panturrilha 4, crucifixo-invertido-polia 2, abdominal-maquina 2 | Corpo todo C (72 min): supino-barra 3, puxada-barra-reta 4, afundo 2, elevacao-lateral 4+bi, triceps-corda 4+bi, rosca-polia-costas 2, coice-maquina 3, cadeira-flexora 2, abdominal-polia 2
- `c14b` **dia com menos de 3 exercícios ou sem multiarticular (A2)**: casa · iniciante · 5 dias · 30 min · foco nenhum · sem dor: Empurrar sem multiarticular
  - Superior (30 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 3 | Inferior (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Empurrar (22 min): elevacao-halteres 3, triceps-frances-halter 4, crucifixo-elastico 3 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (30 min): afundo 2, ponte-gluteo-halter 3, extensao-joelho-elastico 2, flexao-joelho-elastico 2
- `c15a` **iniciante com bi-set ou drop set**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet em bi-set
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c15b` **bi-set entre dois multiarticulares**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet + flexao
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c15c` **bi-set em que os dois carregam a lombar ou dependem da pegada**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: remada-curvada-halteres + stiff
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c16a` **iniciante com mais de 12 exercícios diferentes na semana**: casa · iniciante · 2 dias · 60 min · foco nenhum · sem dor: 15 exercícios diferentes na semana
  - Corpo todo A (59 min): goblet 2+bi, flexao 3+bi, remada-curvada-halteres 3+bi, stiff 3+bi, triceps-frances-halter 3+bi, elevacao-halteres 4+bi, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (60 min): afundo 2, flexao 3, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, rosca-alternada 3+bi, crucifixo-invertido-sentado 3+bi, abdominal-invertido 2
- `c16b` **intermediário ou avançado com a média dos músculos abaixo da faixa do nível**: casa · intermediario · 2 dias · 30 min · foco nenhum · sem dor: média de 2,8 séries por músculo (faixa do intermediario: a partir de 10)
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao-pes-elevados 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2
- `c20a` **o texto "cabem cerca de N exercícios" com um dia acima de N**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: o texto diz 4 e há dia com 5
  - Corpo todo A (31 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, abdominal-chao 2

## Uso de cada exercício

Em quantos programas o exercício aparece (grade e ponderada); os sem animação aprovada aparecem como cartão de texto.

| exercício | animação | grade | ponderada |
| --- | --- | ---: | ---: |
| afundo | sim | 22,1% | 78,9% |
| stiff | sim | 22,1% | 78,6% |
| supino-reto | sim | 14,2% | 69,2% |
| remada-apoiada | sim | 11,0% | 66,2% |
| supino-inclinado | sim | 11,0% | 66,2% |
| rosca-inclinada | sim | 8,7% | 57,2% |
| elevacao-halteres | sim | 19,1% | 53,0% |
| cadeira-flexora | **cartão** | 8,1% | 50,4% |
| abdominal-chao | sim | 85,4% | 50,3% |
| cadeira-extensora | **cartão** | 7,9% | 50,2% |
| triceps-frances-halter | sim | 17,6% | 45,4% |
| puxada-unilateral | sim | 5,5% | 39,8% |
| triceps-frances | sim | 4,3% | 38,9% |
| panturrilha | sim | 10,7% | 36,9% |
| panturrilha-degrau | sim | 76,4% | 36,4% |
| crucifixo-halteres | **cartão** | 10,0% | 35,9% |
| puxada-barra-reta | **cartão** | 3,2% | 35,8% |
| crucifixo-inverso | **cartão** | 7,1% | 35,2% |
| elevacao-lateral | sim | 5,5% | 34,9% |
| coice-maquina | **cartão** | 3,8% | 33,7% |
| abdominal-maquina | **cartão** | 4,5% | 32,7% |
| abdominal-invertido | sim | 60,2% | 32,7% |
| ponte-gluteo-halter | sim | 15,3% | 30,4% |
| flexao | sim | 67,5% | 29,1% |
| abdominal-polia | sim | 3,6% | 26,6% |
| triceps-corda | sim | 3,0% | 26,4% |
| stiff-unilateral | sim | 10,2% | 24,5% |
| bulgaro | sim | 9,7% | 22,8% |
| remada-baixa | sim | 2,4% | 21,7% |
| flexao-joelho-deslizante | sim | 68,8% | 20,4% |
| rosca-maquina | **cartão** | 3,5% | 20,4% |
| panturrilha-bilateral-step | sim | 6,1% | 20,1% |
| agachamento-barra | **cartão** | 1,8% | 20,1% |
| crucifixo-invertido-sentado | **cartão** | 9,5% | 19,6% |
| remada-curvada-halteres | sim | 12,2% | 19,2% |
| crucifixo-invertido-polia | sim | 4,2% | 18,6% |
| panturrilha-em-pe-maquina | **cartão** | 2,9% | 18,1% |
| afundo-peso-corpo | sim | 63,0% | 18,0% |
| panturrilha-leg-press | **cartão** | 4,0% | 17,9% |
| abdominal-bola | sim | 8,5% | 17,7% |
| ponte-gluteo | sim | 62,3% | 17,7% |
| triceps-testa-halteres | **cartão** | 8,4% | 16,8% |
| agachamento-smith | **cartão** | 2,4% | 16,7% |
| crucifixo-polia | sim | 3,8% | 15,3% |
| flexao-pes-elevados | sim | 43,2% | 15,2% |
| goblet | sim | 11,0% | 15,1% |
| flexao-joelho-elastico | sim | 10,5% | 14,9% |
| supino-maquina | **cartão** | 3,2% | 14,2% |
| rosca-scott-banco-inclinado | **cartão** | 4,7% | 14,2% |
| puxada-frente | **cartão** | 6,8% | 14,0% |
| flexao-bola | sim | 8,2% | 13,9% |
| agachamento-peso-corpo | sim | 50,9% | 12,7% |
| abertura-t-deitado | sim | 54,2% | 12,7% |
| flexao-fechada | sim | 38,2% | 12,6% |
| supino-barra | **cartão** | 1,0% | 12,5% |
| rosca-alternada | sim | 11,0% | 12,4% |
| extensao-triceps-peso-corpo | sim | 48,3% | 12,2% |
| hip-thrust | **cartão** | 3,3% | 12,2% |
| extensao-joelho-elastico | sim | 9,5% | 12,1% |
| remada-unilateral-sem-banco | sim | 9,4% | 11,6% |
| stiff-kettlebell | sim | 3,2% | 10,9% |
| crucifixo-inclinado-halteres | **cartão** | 3,2% | 10,4% |
| crucifixo-invertido-curvado | **cartão** | 7,5% | 10,3% |
| afundo-tras-peso-corpo | sim | 39,7% | 10,3% |
| nordico | sim | 41,2% | 9,9% |
| face-pull | sim | 1,5% | 8,9% |
| desenvolvimento | sim | 3,5% | 8,8% |
| triceps-frances-unilateral-halter | **cartão** | 6,2% | 8,5% |
| remada-unilateral-halter | sim | 4,0% | 8,5% |
| barra-fixa | sim | 4,4% | 8,1% |
| leg-press | **cartão** | 3,2% | 7,9% |
| barra-fixa-supinada | sim | 3,6% | 7,3% |
| barra-fixa-negativa | **cartão** | 2,9% | 7,1% |
| rosca-martelo | sim | 7,4% | 6,9% |
| aducao-deitado | sim | 23,6% | 6,5% |
| crucifixo-elastico | sim | 6,2% | 6,4% |
| abducao-deitado | sim | 26,0% | 6,0% |
| abducao-maquina | **cartão** | 1,5% | 6,0% |
| agachamento-elastico | sim | 6,3% | 4,9% |
| stiff-elastico | sim | 6,3% | 4,9% |
| extensao-joelho-caneleira | sim | 3,3% | 4,8% |
| remada-elastico | sim | 5,8% | 4,6% |
| triceps-elastico-acima | sim | 5,7% | 4,5% |
| aducao-maquina | **cartão** | 1,4% | 4,5% |
| elevacao-lateral-elastico | sim | 5,8% | 4,3% |
| triceps-suspensao | sim | 3,3% | 4,0% |
| face-pull-elastico | sim | 5,5% | 3,8% |
| puxada-elastico | sim | 4,2% | 3,8% |
| elevacao-lateral-unilateral-elastico | **cartão** | 5,1% | 3,8% |
| supino-chao-halteres | **cartão** | 4,4% | 3,7% |
| coice-polia | **cartão** | 0,5% | 3,7% |
| rosca-elastico | sim | 4,6% | 3,6% |
| panturrilha-sentada-halter | sim | 2,5% | 3,4% |
| panturrilha-sentada | **cartão** | 1,0% | 3,2% |
| afundo-tras | **cartão** | 4,4% | 3,2% |
| panturrilha-chao | sim | 21,4% | 2,8% |
| elevacao-joelhos | sim | 2,2% | 2,7% |
| triceps-barra-reta | **cartão** | 0,9% | 2,7% |
| mergulho | **cartão** | 1,6% | 2,7% |
| hack | **cartão** | 2,1% | 2,6% |
| rosca-scott | **cartão** | 0,4% | 2,5% |
| rosca-polia-costas | **cartão** | 2,0% | 2,4% |
| pike | sim | 17,9% | 2,2% |
| desenvolvimento-unilateral | **cartão** | 3,3% | 2,1% |
| remada-curvada-elastico | **cartão** | 2,5% | 2,0% |
| rosca-martelo-elastico | **cartão** | 3,1% | 2,0% |
| triceps-frances-kettlebell | sim | 2,1% | 1,7% |
| abducao-elastico | **cartão** | 1,8% | 1,6% |
| abducao-caneleira | sim | 1,4% | 1,6% |
| bulgaro-peso-corpo | sim | 14,4% | 1,5% |
| supino-inclinado-polia | **cartão** | 0,6% | 1,5% |
| abertura-elastico | **cartão** | 2,3% | 1,5% |
| ponte-kettlebell | sim | 1,9% | 1,5% |
| remada-suspensao | sim | 3,2% | 1,5% |
| remada-articulada | **cartão** | 1,9% | 1,4% |
| abducao-polia | **cartão** | 0,2% | 1,4% |
| rosca-suspensao | sim | 2,7% | 1,3% |
| rosca-concentrada | **cartão** | 2,2% | 1,2% |
| aducao-caneleira | sim | 1,3% | 1,2% |
| mesa-flexora | **cartão** | 2,0% | 1,0% |
| triceps-elastico-alto | **cartão** | 2,1% | 0,9% |
| abdominal-declinado | **cartão** | 0,6% | 0,9% |
| afundo-kettlebell | sim | 1,8% | 0,9% |
| yt-suspensao | sim | 2,2% | 0,8% |
| flexao-elastico | sim | 0,4% | 0,8% |
| elevacao-lateral-deitado | **cartão** | 0,9% | 0,7% |
| coice-elastico | **cartão** | 1,1% | 0,7% |
| desenvolvimento-maquina | **cartão** | 0,7% | 0,7% |
| desenvolvimento-elastico | sim | 2,1% | 0,7% |
| agachamento-halteres | **cartão** | 1,8% | 0,6% |
| rosca-kettlebell | sim | 1,6% | 0,6% |
| desenvolvimento-unilateral-kettlebell | sim | 0,7% | 0,5% |
| stiff-unilateral-kettlebell | **cartão** | 1,0% | 0,5% |
| flexao-joelho-suspensao | sim | 1,8% | 0,5% |
| goblet-kettlebell | **cartão** | 1,6% | 0,5% |
| remada-unilateral-kettlebell | sim | 1,5% | 0,5% |
| elevacao-lateral-unilateral | **cartão** | 0,6% | 0,5% |
| rosca-polia | sim | 0,1% | 0,4% |
| triceps-maquina | **cartão** | 1,3% | 0,4% |
| desenvolvimento-barra | **cartão** | 0,1% | 0,3% |
| elevacao-joelhos-paralelas | sim | 1,2% | 0,3% |
| terra-romeno-barra | **cartão** | 1,3% | 0,3% |
| remada-invertida | **cartão** | 3,2% | 0,2% |
| face-pull-suspensao | **cartão** | 0,7% | 0,2% |
| remada-baixa-estacao | **cartão** | 2,9% | 0,2% |
| voador | **cartão** | 1,6% | 0,2% |
| elevacao-lateral-caneleira | **cartão** | 1,7% | 0,2% |
| coice-caneleira | **cartão** | 1,4% | 0,2% |
| roda-abdominal | sim | 0,7% | 0,1% |
| rosca-barra-w | **cartão** | 1,4% | 0,1% |
| barra-fixa-graviton | **cartão** | 1,6% | 0,1% |
| hiperextensao | **cartão** | 1,6% | 0,1% |
| extensao-joelho-mini-band | **cartão** | 1,6% | 0,1% |
| remada-unilateral-polia | sim | 1,5% | 0,1% |
| terra-hexagonal | **cartão** | 1,5% | 0,1% |
| triceps-frances-polia-unilateral | sim | 1,4% | 0,1% |
| crucifixo-invertido-caneleira | **cartão** | 1,4% | 0,1% |
| mergulho-graviton | **cartão** | 1,1% | 0,1% |
| crucifixo-polia-baixo | **cartão** | 0,9% | 0,1% |
| remada-barra | **cartão** | 1,0% | 0,1% |
| remada-unilateral-elastico | **cartão** | 0,2% | 0,1% |
| ponte-pes-bola | sim | 0,6% | 0,0% |
| desenvolvimento-em-pe-halteres | **cartão** | 0,3% | 0,0% |
| abducao-mini-band | sim | 0,5% | 0,0% |
| supino-smith | **cartão** | 0,0% | 0,0% |
| abducao-deitado-mini-band | **cartão** | 0,3% | 0,0% |
| voador-invertido | **cartão** | 0,0% | 0,0% |
| bulgaro-suspensao | sim | 0,1% | 0,0% |
| pull-through | **cartão** | 0,0% | 0,0% |

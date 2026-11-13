# O retrato medido: os 20 cuidados em 680.625 programas

> Gerado por `scripts/auditoria/retrato.ts` (motor: `src/domain/gerador/index.ts`). Dados fictícios. Não editar à mão.

**680.625 combinações**, 680.625 programas (0 sem exercício possível, 0 bloqueadas). "Grade" = cada combinação vale igual. "Ponderada" = as combinações mais prováveis valem mais (pesos de `scripts/auditoria/populacao.ts`, **estimativa**).

| | grade | ponderada |
| --- | ---: | ---: |
| programas sem nenhum defeito | 36,3% | 35,9% |
| idem, sem dor | 37,5% | 35,8% |
| idem, com dor | 36,2% | 36,4% |
| programas sem defeito nem nota | 0,0% | 0,0% |
| uso do tempo (dia típico ÷ minutos pedidos) | 76,5% | 81,9% |
| séries por semana (média) | 56,4 | 58,4 |
| séries por músculo por semana (média, fora o abdômen) | 8,7 | 7,3 |
| músculos abaixo da faixa do nível (média por programa) | 3,8 | 4,9 |
| exercícios por dia (média) | 5,48 | 6,30 |
| escolhas decididas pela animação (% das prescrições) | 4,5% | 15,0% |
| escolhas decididas pela ordem alfabética (% das prescrições) | 9,8% | 26,9% |

## A régua oficial (G5) na mesma população

| defeito ou nota | grade | ponderada | sem dor | com dor |
| --- | ---: | ---: | ---: | ---: |
| **sem nenhum defeito da régua** | 80,3% | 79,0% | 86,4% | 79,9% |
| A2 | 10,6% | 2,0% | 0,8% | 11,3% |
| A3 | 4,0% | 3,0% | 5,1% | 3,9% |
| A4 | 3,2% | 15,2% | 6,0% | 3,0% |
| B1 | 0,4% | 0,2% | 0,0% | 0,4% |
| C1 | 1,7% | 0,1% | 1,4% | 1,8% |
| D1 | 0,5% | 0,4% | 0,7% | 0,5% |
| D3 | 0,1% | 0,0% | 0,0% | 0,1% |
| E1 | 0,1% | 0,2% | 0,1% | 0,1% |
| seguranca | 0,0% | 0,0% | 0,0% | 0,0% |
| A1 | 20,2% | 4,6% | 10,1% | 20,9% |
| A5 | 22,5% | 13,5% | 15,2% | 23,0% |
| B2 | 16,6% | 5,5% | 15,8% | 16,6% |
| B3 | 7,0% | 3,9% | 8,5% | 6,9% |
| C2 | 9,7% | 7,2% | 11,4% | 9,6% |
| G1 | 14,4% | 59,8% | 15,1% | 14,3% |
| cartões de texto por dia (média) | 0,71 | 1,83 | | |

## Cada cuidado

% dos programas que falham. "Pior grupo": o recorte (equipamento, nível, minutos, dias, foco ou dor) com a maior fatia na grade.

| cuidado | medida | tipo | grade | ponderada | sem dor | com dor | pior grupo |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | `c01a` dia que começa por um isolador havendo multiarticular | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 1 | `c01b` multiarticular depois de isolador | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 1 | `c01c` o multiarticular mais técnico (complexidade 3) não é o 1º da sua região | nota | 12,5% | 9,9% | 15,0% | 12,3% | dias:2 (22,5%) |
| 1 | `c01d` abdominal antes de outro exercício | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 2 | `c02a` exercícios por dia fora da faixa dos minutos (A1) | nota | 20,2% | 4,6% | 10,1% | 20,9% | dor:cotovelo 7 (56,8%) |
| 2 | `c02b` séries demais para os minutos (acima de 0,45 por minuto) | nota | 1,7% | 1,2% | 1,9% | 1,7% | min:30 (7,7%) |
| 2 | `c02c` dia de 5 exercícios ou mais com 2 séries em todos | nota | 24,0% | 21,8% | 24,0% | 24,0% | dias:6 (61,3%) |
| 3 | `c03a` dia mais longo acima de 110% dos minutos (A3) | defeito | 4,0% | 3,0% | 5,1% | 3,9% | min:30 (16,0%) |
| 3 | `c03b` dia típico abaixo de 70% dos minutos, sem o aviso (A4) | defeito | 3,2% | 15,2% | 6,0% | 3,0% | grupo:atalho (14,3%) |
| 3 | `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso) | nota | 38,3% | 24,7% | 33,5% | 38,7% | min:90 (79,9%) |
| 3 | `c03d` dia típico abaixo de 85% dos minutos | nota | 53,9% | 45,8% | 48,7% | 54,2% | min:90 (90,8%) |
| 4 | `c04a` músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível | defeito | 7,4% | 10,4% | 9,4% | 7,3% | min:30 (29,9%) |
| 4 | `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível | defeito | 12,5% | 21,3% | 16,5% | 12,2% | min:30 (47,7%) |
| 4 | `c04f` músculo sem exercício direto (só séries indiretas) havendo exercício possível | nota | 14,7% | 24,5% | 18,6% | 14,4% | min:30 (44,9%) |
| 4 | `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%) | defeito | 37,9% | 28,1% | 36,3% | 38,0% | min:90 (68,2%) |
| 4 | `c04d` algum músculo abaixo da faixa do nível (havendo exercício) | nota | 81,2% | 78,1% | 85,4% | 80,9% | dias:2 (98,5%) |
| 4 | `c04e` algum músculo acima da faixa do nível | nota | 21,4% | 12,4% | 20,6% | 21,4% | nivel:iniciante (49,5%) |
| 5 | `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1) | defeito | 0,5% | 0,4% | 0,7% | 0,5% | foco:peito (3,6%) |
| 5 | `c05b` quadríceps ÷ posteriores fora de 0,5 a 2 (D3) | defeito | 0,1% | 0,0% | 0,0% | 0,1% | dor:quadril 7 (1,8%) |
| 5 | `c05c` ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás | nota | 4,2% | 0,5% | 5,2% | 4,1% | min:30 (11,6%) |
| 6 | `c06a` foco abaixo da meta com tempo e exercício (C1) | defeito | 1,7% | 0,1% | 1,4% | 1,8% | min:90 (4,8%) |
| 6 | `c06b` o foco não passa da mediana dos outros (C2) | nota | 9,7% | 7,2% | 11,4% | 9,6% | foco:pernas (33,6%) |
| 6 | `c06c` o foco fica a menos de 1,3 vez a mediana dos outros | nota | 15,8% | 13,3% | 17,7% | 15,6% | foco:pernas (47,9%) |
| 6 | `c06d` com foco, outro músculo com menos de 4 séries havendo exercício | defeito | 12,3% | 13,8% | 15,8% | 12,1% | min:30 (47,0%) |
| 7 | `c07a` músculo com 8 séries diretas ou mais treinado num dia só | nota | 2,0% | 0,7% | 2,1% | 2,0% | dias:2 (9,3%) |
| 7 | `c07b` mais de 10 séries de um músculo num dia | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 7 | `c07c` o mesmo músculo com 3 séries diretas ou mais em dias seguidos | nota | 13,8% | 4,8% | 12,7% | 13,9% | dias:4 (31,9%) |
| 8 | `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa | nota | 32,9% | 82,1% | 34,4% | 32,8% | grupo:par (93,3%) |
| 8 | `c08b` exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa | nota | 73,9% | 93,3% | 86,2% | 73,0% | grupo:atalho (91,2%) |
| 9 | `c09a` o mesmo exercício em todos os dias havendo outro do mesmo nível (B1) | defeito | 0,4% | 0,2% | 0,0% | 0,4% | dor:ombro 7 (2,3%) |
| 9 | `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2) | nota | 16,6% | 5,5% | 15,8% | 16,6% | nivel:iniciante (40,7%) |
| 10 | `c10a` dois exercícios da mesma função no mesmo dia | nota | 31,9% | 14,2% | 31,1% | 31,9% | foco:pernas (54,9%) |
| 10 | `c10b` três exercícios ou mais do mesmo músculo no mesmo dia | nota | 6,3% | 17,3% | 7,7% | 6,2% | grupo:atalho (24,3%) |
| 11 | `c11a` peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado | nota | 0,8% | 1,0% | 0,9% | 0,8% | grupo:persona (2,7%) |
| 12 | `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau) | defeito | 5,0% | 2,5% | 5,1% | 5,0% | nivel:avancado (7,7%) |
| 13 | `c13a` dois exercícios seguidos que carregam a lombar sem apoio | nota | 10,5% | 30,2% | 12,3% | 10,4% | grupo:atalho (31,4%) |
| 13 | `c13b` três exercícios ou mais no dia que carregam a lombar sem apoio | nota | 4,1% | 4,7% | 5,4% | 4,0% | grupo:par (12,6%) |
| 13 | `c13c` três exercícios seguidos que dependem da pegada | nota | 0,0% | 0,0% | 0,0% | 0,0% | dor:joelho 7 (0,2%) |
| 14 | `c14a` exercício impossível, acima da complexidade ou numa região com dor acima de 5 | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 14 | `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2) | defeito | 10,6% | 2,0% | 0,8% | 11,3% | dor:cotovelo 7 (46,4%) |
| 14 | `c14c` o programa perdeu um dia inteiro | nota | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 15 | `c15a` iniciante com bi-set ou drop set | nota | 9,5% | 16,6% | 11,2% | 9,3% | nivel:iniciante (28,4%) |
| 15 | `c15b` bi-set entre dois multiarticulares | nota | 21,5% | 28,5% | 28,3% | 21,0% | min:30 (51,8%) |
| 15 | `c15c` bi-set em que os dois carregam a lombar ou dependem da pegada | nota | 1,9% | 5,2% | 2,8% | 1,9% | dias:2 (8,5%) |
| 15 | `c15d` bi-set com os dois exercícios separados na lista do dia | nota | 6,3% | 5,4% | 8,2% | 6,2% | foco:inferiores (29,1%) |
| 16 | `c16a` iniciante com mais de 12 exercícios diferentes na semana | nota | 18,9% | 38,7% | 22,2% | 18,6% | nivel:iniciante (56,6%) |
| 16 | `c16b` intermediário ou avançado com a média dos músculos abaixo da faixa do nível | nota | 47,9% | 51,6% | 51,5% | 47,7% | nivel:avancado (77,4%) |
| 17 | `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 20 | `c20a` o texto "cabem cerca de N exercícios" com um dia acima de N | defeito | 5,0% | 5,7% | 7,4% | 4,8% | min:30 (21,2%) |
| 20 | `c20b` o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4 | defeito | 7,6% | 23,2% | 7,7% | 7,6% | foco:nenhum (83,3%) |

### Por cuidado (falha em alguma medida do cuidado)

| cuidado | com defeito: grade | ponderada | com defeito ou nota: grade | ponderada |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 0,0% | 0,0% | 12,5% | 9,9% |
| 2 | 0,0% | 0,0% | 40,1% | 26,1% |
| 3 | 7,2% | 18,2% | 57,7% | 48,7% |
| 4 | 51,7% | 49,7% | 94,1% | 86,8% |
| 5 | 0,6% | 0,5% | 4,7% | 0,9% |
| 6 | 14,1% | 13,9% | 24,8% | 21,8% |
| 7 | 0,0% | 0,0% | 15,8% | 5,5% |
| 8 | 0,0% | 0,0% | 79,9% | 98,1% |
| 9 | 0,4% | 0,2% | 16,8% | 5,7% |
| 10 | 0,0% | 0,0% | 35,0% | 27,2% |
| 11 | 0,0% | 0,0% | 0,8% | 1,0% |
| 12 | 5,0% | 2,5% | 5,0% | 2,5% |
| 13 | 0,0% | 0,0% | 10,9% | 31,3% |
| 14 | 10,6% | 2,0% | 10,6% | 2,0% |
| 15 | 0,0% | 0,0% | 25,2% | 33,6% |
| 16 | 0,0% | 0,0% | 66,8% | 90,3% |
| 17 | 0,0% | 0,0% | 0,0% | 0,0% |
| 20 | 12,2% | 27,6% | 12,2% | 27,6% |

Nas tabelas por recorte: `c03a` dia mais longo acima de 110% dos minutos (A3); `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso); `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível; `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%); `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1); `c06b` o foco não passa da mediana dos outros (C2); `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa; `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2); `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau); `c13a` dois exercícios seguidos que carregam a lombar sem apoio; `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2); `c15a` iniciante com bi-set ou drop set; `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite.

## Por grupo de equipamento

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| atalho | 74.250 | 62,0% | 26,3% | 35,3% | 76,1% | 7,2 | 6,0% | 37,2% | 25,8% | 38,6% | 0,7% | 11,1% | 92,0% | 1,1% | 0,0% | 31,4% | 12,7% | 11,4% | 0,0% |
| persona | 74.250 | 18,0% | 29,2% | 34,6% | 77,4% | 7,3 | 6,5% | 35,8% | 23,0% | 36,1% | 0,7% | 12,6% | 90,4% | 1,9% | 2,7% | 19,2% | 14,9% | 12,0% | 0,0% |
| vazio | 12.375 | 8,0% | 45,3% | 42,7% | 76,7% | 9,7 | 2,2% | 39,3% | 6,1% | 40,4% | 0,0% | 7,8% | 0,0% | 26,3% | 0,0% | 0,0% | 3,3% | 7,5% | 0,0% |
| item | 470.250 | 8,0% | 39,3% | 35,1% | 76,2% | 9,2 | 3,0% | 39,2% | 7,9% | 38,3% | 0,5% | 8,7% | 9,0% | 22,6% | 6,8% | 4,4% | 9,1% | 8,5% | 0,0% |
| par | 49.500 | 4,0% | 31,5% | 38,6% | 78,0% | 7,3 | 7,1% | 35,4% | 21,6% | 34,7% | 0,7% | 13,2% | 93,3% | 2,1% | 0,0% | 26,7% | 16,4% | 12,2% | 0,0% |

## Por nível

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| iniciante | 226.875 | 45,0% | 49,7% | 43,9% | 72,3% | 7,9 | 2,4% | 45,3% | 12,3% | 17,5% | 0,3% | 11,1% | 32,0% | 40,7% | 3,6% | 9,1% | 10,7% | 28,4% | 0,0% |
| intermediario | 226.875 | 35,0% | 28,4% | 28,7% | 77,0% | 8,7 | 4,1% | 37,6% | 12,5% | 50,4% | 0,6% | 9,0% | 33,4% | 4,5% | 3,6% | 11,1% | 10,5% | 0,0% | 0,0% |
| avancado | 226.875 | 20,0% | 30,8% | 30,5% | 80,0% | 9,3 | 5,4% | 32,2% | 12,6% | 45,8% | 0,7% | 9,0% | 33,3% | 4,5% | 7,7% | 11,2% | 10,6% | 0,0% | 0,0% |

## Por minutos

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 136.125 | 12,0% | 26,9% | 8,6% | 96,3% | 6,5 | 16,0% | 1,6% | 47,7% | 5,5% | 1,8% | 23,7% | 31,6% | 13,6% | 4,6% | 9,9% | 16,7% | 22,5% | 0,0% |
| 45 | 136.125 | 28,0% | 58,0% | 43,2% | 89,0% | 8,4 | 3,4% | 9,0% | 8,9% | 15,7% | 0,5% | 12,4% | 33,0% | 16,1% | 4,9% | 10,1% | 9,6% | 13,9% | 0,0% |
| 60 | 136.125 | 38,0% | 45,9% | 50,6% | 76,7% | 9,3 | 0,4% | 37,5% | 2,5% | 40,5% | 0,3% | 6,1% | 33,2% | 17,6% | 5,2% | 10,5% | 8,9% | 7,8% | 0,0% |
| 75 | 136.125 | 12,0% | 29,0% | 19,5% | 64,9% | 9,6 | 0,0% | 63,7% | 1,6% | 59,5% | 0,1% | 3,4% | 33,2% | 17,7% | 5,2% | 10,8% | 8,9% | 2,6% | 0,0% |
| 90 | 136.125 | 10,0% | 21,8% | 12,0% | 55,3% | 9,7 | 0,0% | 79,9% | 1,6% | 68,2% | 0,0% | 3,0% | 33,3% | 17,8% | 5,2% | 11,1% | 8,9% | 0,5% | 0,0% |

## Por dias

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | 136.125 | 10,0% | 41,2% | 25,9% | 92,4% | 6,0 | 9,6% | 9,0% | 28,5% | 21,7% | 1,5% | 15,7% | 33,3% | 0,0% | 4,5% | 8,1% | 0,0% | 19,0% | 0,0% |
| 3 | 136.125 | 35,0% | 40,4% | 47,2% | 84,6% | 7,8 | 4,9% | 24,0% | 12,6% | 35,7% | 1,0% | 7,3% | 35,1% | 33,6% | 5,1% | 4,7% | 2,9% | 13,2% | 0,0% |
| 4 | 136.125 | 28,0% | 34,6% | 40,4% | 74,7% | 8,9 | 2,4% | 42,5% | 8,2% | 42,5% | 0,1% | 5,9% | 32,9% | 16,7% | 5,1% | 13,2% | 13,8% | 7,4% | 0,0% |
| 5 | 136.125 | 20,0% | 33,7% | 21,7% | 67,4% | 9,8 | 1,7% | 54,9% | 6,5% | 43,2% | 0,0% | 8,9% | 31,3% | 16,6% | 5,2% | 13,3% | 17,9% | 4,6% | 0,0% |
| 6 | 136.125 | 7,0% | 31,5% | 16,2% | 63,1% | 10,8 | 1,2% | 61,2% | 6,4% | 46,2% | 0,1% | 10,8% | 31,7% | 15,8% | 5,2% | 13,1% | 18,2% | 3,1% | 0,0% |

## Por foco

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| nenhum | 61.875 | 35,0% | 10,4% | 21,9% | 74,6% | 8,5 | 1,1% | 41,6% | 11,4% | 40,3% | 0,0% | 0,0% | 33,0% | 16,5% | 5,0% | 10,3% | 10,6% | 5,9% | 0,0% |
| peito | 61.875 | 5,0% | 36,5% | 37,5% | 74,3% | 8,5 | 3,2% | 42,6% | 10,7% | 42,2% | 3,6% | 0,6% | 32,9% | 16,5% | 5,0% | 11,8% | 9,7% | 7,3% | 0,0% |
| costas | 61.875 | 4,0% | 37,4% | 42,5% | 73,7% | 8,4 | 3,0% | 44,1% | 8,7% | 43,0% | 0,4% | 0,8% | 33,2% | 16,5% | 5,0% | 10,4% | 10,5% | 6,8% | 0,0% |
| ombros | 61.875 | 4,0% | 42,1% | 42,1% | 76,4% | 8,6 | 0,8% | 39,0% | 11,2% | 36,9% | 0,0% | 4,4% | 32,8% | 16,6% | 5,0% | 11,9% | 9,5% | 6,8% | 0,0% |
| bracos | 61.875 | 7,0% | 35,5% | 33,3% | 74,6% | 8,6 | 1,2% | 41,3% | 14,0% | 40,0% | 0,1% | 6,5% | 31,8% | 17,7% | 5,1% | 10,3% | 10,2% | 7,1% | 0,0% |
| pernas | 61.875 | 6,0% | 43,4% | 52,6% | 79,0% | 9,3 | 7,0% | 32,7% | 15,4% | 30,6% | 0,0% | 33,6% | 33,0% | 16,4% | 5,0% | 8,7% | 11,1% | 14,9% | 0,0% |
| gluteos | 61.875 | 9,0% | 38,5% | 40,0% | 78,2% | 8,5 | 4,1% | 33,4% | 12,6% | 37,3% | 0,0% | 0,9% | 33,9% | 15,7% | 5,0% | 10,4% | 12,4% | 11,3% | 0,0% |
| abdomen | 61.875 | 5,0% | 38,2% | 37,1% | 75,2% | 7,7 | 1,0% | 40,6% | 11,5% | 40,1% | 0,0% | 14,9% | 33,1% | 16,4% | 5,0% | 10,3% | 9,9% | 8,1% | 0,0% |
| superiores | 61.875 | 8,0% | 39,8% | 52,9% | 79,2% | 9,2 | 5,0% | 34,1% | 14,0% | 34,7% | 1,1% | 10,3% | 31,5% | 17,9% | 5,0% | 11,6% | 10,5% | 9,9% | 0,0% |
| inferiores | 61.875 | 9,0% | 40,0% | 47,2% | 80,8% | 9,4 | 12,8% | 29,9% | 18,3% | 29,8% | 0,0% | 33,5% | 33,6% | 15,5% | 5,0% | 8,7% | 12,3% | 17,5% | 0,0% |
| peito+costas | 61.875 | 8,0% | 37,5% | 44,6% | 74,8% | 8,7 | 4,5% | 42,4% | 9,2% | 41,7% | 0,6% | 1,4% | 32,8% | 16,5% | 5,0% | 10,9% | 9,6% | 8,7% | 0,0% |

## Por dor

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| sem dor | 45.375 | 78,0% | 37,5% | 35,8% | 79,6% | 8,4 | 5,1% | 33,5% | 16,5% | 36,3% | 0,7% | 11,4% | 34,4% | 15,8% | 5,1% | 12,3% | 0,8% | 11,2% | 0,0% |
| cotovelo 7 | 45.375 | 0,6% | 17,5% | 17,4% | 66,9% | 8,9 | 2,0% | 53,4% | 4,6% | 49,6% | 0,0% | 5,3% | 29,2% | 13,6% | 4,2% | 2,9% | 46,4% | 5,7% | 0,0% |
| lombar 7 | 45.375 | 2,4% | 42,0% | 44,0% | 78,8% | 8,8 | 2,9% | 33,2% | 10,2% | 34,4% | 0,6% | 10,3% | 33,9% | 16,6% | 5,2% | 0,0% | 11,7% | 10,3% | 0,0% |
| joelho 7 | 45.375 | 2,0% | 40,4% | 50,7% | 75,9% | 8,6 | 4,4% | 39,2% | 6,4% | 39,0% | 0,4% | 7,3% | 31,1% | 18,3% | 5,0% | 21,1% | 9,7% | 9,3% | 0,0% |
| ombro 4 | 45.375 | 3,0% | 37,6% | 36,0% | 79,6% | 8,3 | 5,1% | 33,5% | 16,5% | 36,2% | 0,7% | 11,4% | 33,9% | 15,8% | 5,1% | 12,3% | 0,8% | 11,3% | 0,0% |
| punho 4 | 45.375 | 0,9% | 37,5% | 35,9% | 79,6% | 8,4 | 5,1% | 33,5% | 16,5% | 36,3% | 0,7% | 11,4% | 33,6% | 15,8% | 5,2% | 12,3% | 0,8% | 11,2% | 0,0% |
| quadril 4 | 45.375 | 0,9% | 37,6% | 35,8% | 79,6% | 8,4 | 5,1% | 33,5% | 16,5% | 36,3% | 0,7% | 11,4% | 34,4% | 15,8% | 5,1% | 12,3% | 0,8% | 11,2% | 0,0% |
| tornozelo 4 | 45.375 | 0,9% | 37,5% | 35,8% | 79,6% | 8,4 | 5,1% | 33,5% | 16,5% | 36,3% | 0,7% | 11,4% | 34,4% | 15,8% | 5,1% | 12,3% | 0,8% | 11,2% | 0,0% |
| ombro 7 | 45.375 | 2,0% | 42,7% | 23,3% | 66,3% | 10,2 | 1,4% | 55,4% | 3,3% | 32,6% | 0,0% | 7,2% | 26,9% | 17,0% | 4,2% | 2,9% | 30,8% | 4,1% | 0,0% |
| punho 7 | 45.375 | 0,6% | 30,2% | 38,9% | 75,2% | 8,7 | 3,9% | 40,5% | 10,8% | 39,2% | 0,2% | 8,8% | 34,6% | 18,6% | 5,2% | 13,3% | 20,6% | 8,3% | 0,0% |
| quadril 7 | 45.375 | 0,6% | 28,5% | 22,0% | 69,4% | 9,0 | 0,7% | 49,5% | 6,7% | 47,4% | 0,4% | 7,6% | 30,5% | 22,0% | 5,2% | 8,9% | 32,4% | 5,6% | 0,0% |
| tornozelo 7 | 45.375 | 0,6% | 42,9% | 46,8% | 77,6% | 9,0 | 3,5% | 35,8% | 12,7% | 35,4% | 0,6% | 7,9% | 34,6% | 15,8% | 5,1% | 12,4% | 0,8% | 9,0% | 0,0% |
| cotovelo 4 | 45.375 | 0,9% | 37,5% | 35,8% | 79,6% | 8,4 | 5,1% | 33,5% | 16,5% | 36,3% | 0,7% | 11,4% | 33,7% | 15,8% | 5,1% | 12,3% | 0,8% | 11,2% | 0,0% |
| lombar 4 | 45.375 | 3,6% | 37,6% | 35,7% | 79,6% | 8,3 | 5,1% | 33,5% | 16,5% | 36,3% | 0,7% | 11,4% | 33,7% | 15,8% | 5,1% | 9,8% | 0,8% | 11,2% | 0,0% |
| joelho 4 | 45.375 | 3,0% | 37,5% | 35,8% | 79,6% | 8,4 | 5,1% | 33,5% | 16,5% | 36,3% | 0,7% | 11,4% | 34,3% | 15,8% | 5,1% | 12,3% | 0,8% | 11,2% | 0,0% |

## Por nível e minutos

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| avancado 30 | 45.375 | 2,4% | 25,3% | 7,8% | 97,7% | 6,6 | 20,8% | 1,4% | 48,0% | 4,6% | 2,3% | 24,7% | 32,1% | 1,5% | 6,4% | 10,6% | 16,7% | 0,0% | 0,0% |
| avancado 45 | 45.375 | 5,6% | 54,2% | 37,4% | 92,0% | 8,8 | 5,3% | 6,1% | 9,0% | 19,1% | 0,7% | 12,8% | 33,5% | 3,7% | 7,5% | 10,8% | 9,5% | 0,0% | 0,0% |
| avancado 60 | 45.375 | 7,6% | 40,1% | 42,2% | 80,9% | 10,0 | 0,9% | 26,2% | 2,7% | 49,1% | 0,5% | 5,2% | 33,6% | 5,6% | 8,2% | 11,2% | 8,9% | 0,0% | 0,0% |
| avancado 75 | 45.375 | 2,4% | 21,2% | 16,8% | 69,5% | 10,4 | 0,0% | 54,7% | 1,6% | 72,8% | 0,1% | 1,5% | 33,6% | 5,8% | 8,3% | 11,5% | 8,9% | 0,0% | 0,0% |
| avancado 90 | 45.375 | 2,0% | 13,0% | 10,4% | 60,0% | 10,7 | 0,0% | 72,4% | 1,6% | 83,1% | 0,0% | 1,0% | 33,6% | 5,9% | 8,3% | 11,9% | 8,9% | 0,0% | 0,0% |
| iniciante 30 | 45.375 | 5,4% | 28,5% | 9,3% | 94,7% | 6,3 | 10,7% | 1,8% | 47,4% | 6,0% | 1,2% | 22,1% | 30,5% | 37,7% | 3,6% | 8,5% | 16,9% | 67,6% | 0,0% |
| iniciante 45 | 45.375 | 12,6% | 66,4% | 51,3% | 85,3% | 7,9 | 1,6% | 13,1% | 8,7% | 4,0% | 0,3% | 12,4% | 31,9% | 40,8% | 3,6% | 8,8% | 9,7% | 41,8% | 0,0% |
| iniciante 60 | 45.375 | 17,1% | 61,8% | 61,9% | 71,7% | 8,4 | 0,0% | 50,7% | 2,3% | 15,9% | 0,0% | 7,8% | 32,4% | 41,6% | 3,6% | 9,1% | 8,9% | 23,3% | 0,0% |
| iniciante 75 | 45.375 | 5,4% | 48,4% | 25,0% | 59,6% | 8,6 | 0,0% | 73,5% | 1,6% | 28,2% | 0,0% | 6,7% | 32,4% | 41,7% | 3,6% | 9,5% | 8,9% | 7,9% | 0,0% |
| iniciante 90 | 45.375 | 4,5% | 43,4% | 19,0% | 50,3% | 8,6 | 0,0% | 87,3% | 1,6% | 33,5% | 0,0% | 6,5% | 32,5% | 41,7% | 3,6% | 9,7% | 8,9% | 1,4% | 0,0% |
| intermediario 30 | 45.375 | 4,2% | 27,0% | 8,3% | 96,6% | 6,5 | 16,6% | 1,6% | 47,7% | 5,8% | 1,9% | 24,4% | 32,2% | 1,6% | 3,6% | 10,6% | 16,5% | 0,0% | 0,0% |
| intermediario 45 | 45.375 | 9,8% | 53,4% | 36,3% | 89,8% | 8,5 | 3,4% | 7,9% | 9,0% | 24,1% | 0,6% | 12,1% | 33,5% | 3,7% | 3,6% | 10,8% | 9,5% | 0,0% | 0,0% |
| intermediario 60 | 45.375 | 13,3% | 35,7% | 40,7% | 77,6% | 9,4 | 0,3% | 35,6% | 2,6% | 56,5% | 0,3% | 5,2% | 33,6% | 5,5% | 3,6% | 11,2% | 8,9% | 0,0% | 0,0% |
| intermediario 75 | 45.375 | 4,2% | 17,2% | 14,1% | 65,5% | 9,7 | 0,0% | 62,9% | 1,6% | 77,5% | 0,1% | 2,0% | 33,7% | 5,7% | 3,6% | 11,3% | 8,9% | 0,0% | 0,0% |
| intermediario 90 | 45.375 | 3,5% | 8,9% | 3,9% | 55,7% | 9,8 | 0,0% | 79,8% | 1,6% | 87,9% | 0,0% | 1,5% | 33,8% | 5,8% | 3,6% | 11,7% | 8,9% | 0,0% | 0,0% |

## Por nível e dias

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| avancado 2 | 45.375 | 2,0% | 44,5% | 26,3% | 94,0% | 6,2 | 9,1% | 5,7% | 28,6% | 16,4% | 1,7% | 17,1% | 33,7% | 0,0% | 6,2% | 8,7% | 0,0% | 0,0% | 0,0% |
| avancado 3 | 45.375 | 7,0% | 43,0% | 46,6% | 89,6% | 8,4 | 7,3% | 14,7% | 12,7% | 30,2% | 1,7% | 8,2% | 35,1% | 16,7% | 8,0% | 5,3% | 2,9% | 0,0% | 0,0% |
| avancado 4 | 45.375 | 5,6% | 28,0% | 32,4% | 78,9% | 9,6 | 4,5% | 35,0% | 8,3% | 52,8% | 0,1% | 6,3% | 33,3% | 2,2% | 8,0% | 14,0% | 13,9% | 0,0% | 0,0% |
| avancado 5 | 45.375 | 4,0% | 20,4% | 10,3% | 71,3% | 10,7 | 3,5% | 48,4% | 6,5% | 62,6% | 0,0% | 5,8% | 31,7% | 1,9% | 8,3% | 14,1% | 17,8% | 0,0% | 0,0% |
| avancado 6 | 45.375 | 1,4% | 17,9% | 5,9% | 66,4% | 11,6 | 2,5% | 57,0% | 6,6% | 66,8% | 0,1% | 7,6% | 32,7% | 1,7% | 8,3% | 14,0% | 18,1% | 0,0% | 0,0% |
| iniciante 2 | 45.375 | 4,5% | 36,6% | 25,4% | 90,3% | 5,8 | 10,1% | 14,0% | 28,3% | 28,3% | 1,2% | 13,0% | 32,4% | 0,0% | 3,6% | 6,9% | 0,0% | 57,0% | 0,0% |
| iniciante 3 | 45.375 | 15,8% | 39,9% | 48,2% | 78,7% | 7,0 | 1,9% | 35,4% | 12,4% | 38,5% | 0,3% | 6,0% | 35,0% | 67,6% | 3,6% | 4,1% | 3,0% | 39,7% | 0,0% |
| iniciante 4 | 45.375 | 12,6% | 51,0% | 53,4% | 69,7% | 7,9 | 0,1% | 50,4% | 8,1% | 16,2% | 0,0% | 5,6% | 32,0% | 45,8% | 3,6% | 11,7% | 13,7% | 22,3% | 0,0% |
| iniciante 5 | 45.375 | 9,0% | 61,0% | 37,1% | 62,9% | 8,9 | 0,1% | 61,5% | 6,4% | 2,0% | 0,0% | 15,0% | 30,6% | 46,1% | 3,6% | 11,8% | 18,0% | 13,8% | 0,0% |
| iniciante 6 | 45.375 | 3,2% | 60,0% | 30,2% | 59,8% | 10,1 | 0,0% | 65,2% | 6,3% | 2,4% | 0,0% | 15,8% | 29,8% | 44,0% | 3,6% | 11,3% | 18,6% | 9,3% | 0,0% |
| intermediario 2 | 45.375 | 3,5% | 42,5% | 26,3% | 92,9% | 6,1 | 9,6% | 7,3% | 28,7% | 20,5% | 1,7% | 17,0% | 33,7% | 0,0% | 3,6% | 8,7% | 0,0% | 0,0% | 0,0% |
| intermediario 3 | 45.375 | 12,3% | 38,4% | 46,3% | 85,6% | 7,9 | 5,6% | 22,0% | 12,6% | 38,5% | 1,0% | 7,6% | 35,3% | 16,5% | 3,6% | 4,8% | 2,9% | 0,0% | 0,0% |
| intermediario 4 | 45.375 | 9,8% | 24,9% | 28,4% | 75,5% | 9,0 | 2,6% | 42,1% | 8,2% | 58,5% | 0,1% | 5,8% | 33,4% | 2,2% | 3,6% | 14,0% | 13,9% | 0,0% | 0,0% |
| intermediario 5 | 45.375 | 7,0% | 19,8% | 8,3% | 68,1% | 9,9 | 1,5% | 54,8% | 6,5% | 64,9% | 0,0% | 5,7% | 31,7% | 1,9% | 3,6% | 14,1% | 17,8% | 0,0% | 0,0% |
| intermediario 6 | 45.375 | 2,5% | 16,6% | 4,0% | 63,2% | 10,8 | 1,0% | 61,4% | 6,4% | 69,5% | 0,1% | 9,0% | 32,7% | 1,7% | 3,6% | 14,0% | 18,1% | 0,0% | 0,0% |

## Por cenário de equipamento

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| so:halteres_fixos | 12.375 | 1,0% | 0,0% | 0,0% | 79,2% | 7,9 | 4,7% | 32,6% | 13,4% | 31,5% | 0,4% | 11,2% | 95,1% | 2,1% | 100,0% | 65,0% | 14,7% | 11,3% | 0,0% |
| so:kettlebell | 12.375 | 0,5% | 0,0% | 0,0% | 77,3% | 8,3 | 6,8% | 37,5% | 13,7% | 34,0% | 1,4% | 8,3% | 35,9% | 18,0% | 100,0% | 27,9% | 17,1% | 10,1% | 0,0% |
| bairro | 12.375 | 8,0% | 19,5% | 28,4% | 75,3% | 7,3 | 4,8% | 37,2% | 28,7% | 41,1% | 0,6% | 10,4% | 59,0% | 1,0% | 16,4% | 4,1% | 12,0% | 10,4% | 0,0% |
| academia+ | 12.375 | 20,0% | 22,5% | 32,2% | 75,4% | 7,2 | 5,4% | 37,9% | 29,4% | 39,2% | 0,7% | 10,0% | 97,1% | 0,8% | 0,0% | 55,7% | 12,1% | 11,5% | 0,0% |
| so:mini_band | 12.375 | 0,1% | 22,7% | 27,6% | 78,4% | 9,7 | 2,3% | 35,7% | 6,4% | 38,3% | 0,0% | 6,7% | 26,5% | 29,0% | 31,6% | 0,0% | 16,0% | 6,9% | 0,0% |
| casa | 12.375 | 5,0% | 22,9% | 36,0% | 76,9% | 7,0 | 7,7% | 37,3% | 29,6% | 36,8% | 0,8% | 12,7% | 97,5% | 3,0% | 0,0% | 64,7% | 16,1% | 11,2% | 0,0% |
| academia | 12.375 | 20,0% | 23,1% | 34,1% | 75,5% | 7,2 | 5,4% | 37,8% | 29,4% | 38,9% | 0,8% | 10,6% | 97,2% | 0,8% | 0,0% | 55,7% | 12,1% | 11,5% | 0,0% |
| condominio+ | 12.375 | 6,0% | 23,4% | 34,5% | 76,1% | 7,2 | 6,3% | 37,1% | 29,5% | 39,2% | 0,7% | 10,7% | 98,4% | 1,4% | 0,0% | 4,1% | 12,0% | 11,4% | 0,0% |
| diego | 12.375 | 1,0% | 24,0% | 27,8% | 77,2% | 7,0 | 8,1% | 36,5% | 29,9% | 35,6% | 0,8% | 15,5% | 96,6% | 2,7% | 0,0% | 0,1% | 16,0% | 12,2% | 0,0% |
| step+elasticos | 12.375 | 1,0% | 24,5% | 28,5% | 78,3% | 7,0 | 10,2% | 35,6% | 30,0% | 34,5% | 1,0% | 15,8% | 96,6% | 2,7% | 0,0% | 0,0% | 16,0% | 13,0% | 0,0% |
| suspensao+elasticos | 12.375 | 1,0% | 24,5% | 32,5% | 77,4% | 7,0 | 8,2% | 36,2% | 30,0% | 35,4% | 0,8% | 14,8% | 85,1% | 2,7% | 0,0% | 0,0% | 16,2% | 12,5% | 0,0% |
| elasticos | 12.375 | 2,0% | 24,5% | 28,5% | 77,7% | 7,0 | 8,4% | 36,1% | 30,0% | 34,8% | 1,0% | 15,6% | 96,6% | 2,8% | 0,0% | 0,0% | 16,0% | 12,5% | 0,0% |
| casa+ | 12.375 | 5,0% | 28,2% | 38,6% | 75,7% | 7,2 | 6,7% | 37,4% | 22,7% | 39,8% | 0,7% | 11,3% | 64,5% | 0,3% | 0,0% | 4,1% | 12,0% | 11,7% | 0,0% |
| bruno | 12.375 | 3,0% | 30,1% | 39,7% | 77,8% | 7,2 | 7,5% | 35,4% | 23,0% | 36,2% | 0,7% | 11,8% | 98,8% | 1,3% | 0,0% | 4,0% | 12,0% | 13,7% | 0,0% |
| so:cadeira_extensora | 12.375 | 0,1% | 31,3% | 33,8% | 77,3% | 9,7 | 1,6% | 37,7% | 6,0% | 39,6% | 0,0% | 6,3% | 0,0% | 29,0% | 0,0% | 0,0% | 16,0% | 6,1% | 0,0% |
| so:paralelas | 12.375 | 0,1% | 33,4% | 33,1% | 76,5% | 9,7 | 2,4% | 39,7% | 5,9% | 41,1% | 0,0% | 8,2% | 3,2% | 28,9% | 27,3% | 0,0% | 3,2% | 7,4% | 0,0% |
| banco+halteres-leves | 12.375 | 1,0% | 34,4% | 46,0% | 77,1% | 7,5 | 5,4% | 37,0% | 13,6% | 37,4% | 0,5% | 11,2% | 96,4% | 1,5% | 0,0% | 41,8% | 18,9% | 11,9% | 0,0% |
| halteres-banco | 12.375 | 2,0% | 34,4% | 46,0% | 77,1% | 7,5 | 5,4% | 37,0% | 13,6% | 37,4% | 0,5% | 11,2% | 96,4% | 1,5% | 0,0% | 41,8% | 18,9% | 11,9% | 0,0% |
| so:caneleiras | 12.375 | 0,1% | 36,0% | 42,7% | 82,3% | 9,2 | 3,2% | 27,4% | 11,4% | 32,5% | 0,0% | 8,6% | 0,0% | 29,2% | 0,0% | 0,0% | 16,0% | 9,7% | 0,0% |
| so:estacao_remada | 12.375 | 0,1% | 37,8% | 39,1% | 72,0% | 8,7 | 2,9% | 45,4% | 9,6% | 37,7% | 2,4% | 9,6% | 0,0% | 14,4% | 0,0% | 0,0% | 17,9% | 9,7% | 0,0% |
| condominio | 12.375 | 6,0% | 37,9% | 47,6% | 76,8% | 7,7 | 4,5% | 35,6% | 14,0% | 37,8% | 0,6% | 11,0% | 97,2% | 0,3% | 0,0% | 3,9% | 12,0% | 10,8% | 0,0% |
| so:estacao_polia_dupla | 12.375 | 0,1% | 37,9% | 43,1% | 79,8% | 7,6 | 8,2% | 32,3% | 14,4% | 30,7% | 0,9% | 16,0% | 26,1% | 10,5% | 0,0% | 0,0% | 18,6% | 15,0% | 0,0% |
| so:remada_articulada | 12.375 | 0,1% | 38,1% | 39,3% | 72,1% | 8,7 | 2,9% | 45,2% | 9,9% | 37,1% | 2,7% | 9,7% | 0,0% | 15,0% | 0,0% | 0,0% | 17,9% | 9,7% | 0,0% |
| so:barra_w | 12.375 | 0,1% | 38,5% | 36,2% | 79,8% | 9,2 | 2,2% | 32,8% | 6,7% | 35,8% | 0,0% | 9,0% | 0,0% | 40,3% | 0,0% | 0,0% | 4,2% | 9,2% | 0,0% |
| so:smith | 12.375 | 0,1% | 38,8% | 42,5% | 72,2% | 8,7 | 3,9% | 45,2% | 9,3% | 37,5% | 0,6% | 8,9% | 0,0% | 19,7% | 0,0% | 0,0% | 17,1% | 9,4% | 0,0% |
| so:graviton | 12.375 | 0,1% | 38,9% | 42,4% | 71,9% | 8,7 | 4,6% | 45,8% | 7,9% | 38,1% | 1,4% | 10,2% | 28,5% | 14,4% | 0,0% | 0,0% | 18,4% | 9,5% | 0,0% |
| so:rosca_maquina | 12.375 | 0,1% | 38,9% | 36,2% | 80,1% | 9,2 | 2,1% | 32,1% | 6,5% | 35,5% | 0,0% | 9,2% | 0,0% | 43,2% | 0,0% | 0,0% | 4,3% | 9,3% | 0,0% |
| so:rack_de_agachamento | 12.375 | 0,1% | 39,1% | 43,0% | 72,5% | 8,7 | 3,9% | 44,7% | 9,3% | 37,3% | 0,8% | 9,1% | 0,0% | 19,6% | 0,0% | 0,0% | 17,1% | 9,6% | 0,0% |
| so:suspensao | 12.375 | 0,5% | 39,4% | 44,8% | 75,0% | 8,5 | 4,6% | 39,6% | 13,0% | 35,4% | 1,2% | 6,6% | 30,2% | 17,9% | 0,0% | 0,0% | 15,2% | 9,6% | 0,0% |
| so:estacao_puxada | 12.375 | 0,1% | 39,7% | 44,0% | 72,3% | 8,7 | 4,5% | 45,2% | 8,0% | 37,1% | 1,5% | 10,0% | 0,0% | 15,8% | 0,0% | 0,0% | 18,2% | 9,8% | 0,0% |
| so:barra_longa | 12.375 | 0,1% | 41,2% | 38,0% | 73,9% | 9,1 | 3,3% | 43,5% | 8,0% | 42,6% | 1,3% | 10,6% | 0,0% | 34,0% | 0,0% | 8,5% | 10,1% | 7,5% | 0,0% |
| so:barra_hexagonal | 12.375 | 0,1% | 41,9% | 37,0% | 74,7% | 10,1 | 1,7% | 42,7% | 5,9% | 43,7% | 0,0% | 8,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,3% | 6,7% | 0,0% |
| halteres | 12.375 | 2,0% | 42,3% | 49,8% | 79,2% | 7,9 | 4,5% | 32,6% | 12,8% | 31,6% | 0,6% | 10,9% | 95,0% | 2,1% | 0,0% | 65,0% | 14,7% | 11,3% | 0,0% |
| so:anilhas_e_manoplas | 12.375 | 1,0% | 42,3% | 49,8% | 79,2% | 7,9 | 4,5% | 32,6% | 12,8% | 31,6% | 0,6% | 10,9% | 95,0% | 2,1% | 0,0% | 65,0% | 14,7% | 11,3% | 0,0% |
| halteres+bola | 12.375 | 1,0% | 42,4% | 47,6% | 79,2% | 8,0 | 4,4% | 32,6% | 12,8% | 31,5% | 0,6% | 10,8% | 95,0% | 1,4% | 0,0% | 65,0% | 14,7% | 11,3% | 0,0% |
| so:barra_fixa | 12.375 | 1,0% | 42,8% | 45,4% | 73,4% | 9,0 | 3,8% | 42,4% | 8,0% | 34,0% | 1,5% | 9,8% | 0,0% | 7,4% | 0,0% | 0,0% | 16,6% | 9,4% | 0,0% |
| so:multifuncional | 12.375 | 0,1% | 43,3% | 45,0% | 73,5% | 9,0 | 3,6% | 42,5% | 9,4% | 33,9% | 0,8% | 9,2% | 0,0% | 8,5% | 0,0% | 0,0% | 14,6% | 9,6% | 0,0% |
| so:leg_press | 12.375 | 0,1% | 43,7% | 40,4% | 75,4% | 9,7 | 2,1% | 41,7% | 5,9% | 42,2% | 0,0% | 7,3% | 0,0% | 26,4% | 0,0% | 0,0% | 3,3% | 6,7% | 0,0% |
| so:bola_suica | 12.375 | 0,1% | 44,2% | 41,2% | 76,3% | 9,7 | 2,5% | 40,2% | 6,2% | 41,1% | 0,0% | 9,1% | 0,0% | 21,3% | 0,0% | 0,0% | 3,3% | 7,4% | 0,0% |
| so:panturrilha_sentada_maquina | 12.375 | 0,1% | 44,3% | 42,4% | 76,1% | 9,7 | 2,2% | 40,2% | 6,0% | 41,5% | 0,0% | 7,3% | 0,0% | 26,3% | 0,0% | 0,0% | 3,6% | 7,2% | 0,0% |
| so:panturrilha_em_pe_maquina | 12.375 | 0,1% | 44,5% | 42,0% | 75,9% | 9,7 | 2,1% | 40,9% | 5,9% | 41,4% | 0,0% | 7,3% | 0,0% | 26,4% | 0,0% | 0,0% | 3,3% | 7,2% | 0,0% |
| so:cadeira_abdutora_adutora | 12.375 | 0,1% | 44,6% | 42,2% | 75,7% | 9,7 | 1,8% | 40,7% | 6,1% | 41,6% | 0,0% | 7,9% | 0,0% | 26,3% | 0,0% | 0,0% | 3,3% | 6,6% | 0,0% |
| so:voador | 12.375 | 0,1% | 44,6% | 43,2% | 77,7% | 9,7 | 2,3% | 36,5% | 6,4% | 39,1% | 0,0% | 8,3% | 0,0% | 27,5% | 0,0% | 0,0% | 7,6% | 7,6% | 0,0% |
| so:hack | 12.375 | 0,1% | 44,7% | 41,8% | 76,2% | 9,7 | 2,1% | 40,4% | 6,1% | 41,0% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,3% | 7,1% | 0,0% |
| so:gluteo_maquina | 12.375 | 0,1% | 45,0% | 42,3% | 75,8% | 9,7 | 1,0% | 40,2% | 5,7% | 41,6% | 0,0% | 7,4% | 0,0% | 29,5% | 0,0% | 0,0% | 3,3% | 7,2% | 0,0% |
| so:roda_abdominal | 12.375 | 0,1% | 45,1% | 42,7% | 76,6% | 9,7 | 2,2% | 39,4% | 6,1% | 40,6% | 0,0% | 7,8% | 0,0% | 26,3% | 0,0% | 0,0% | 3,3% | 7,5% | 0,0% |
| so:step | 12.375 | 0,1% | 45,1% | 42,6% | 77,0% | 9,6 | 2,3% | 38,4% | 6,5% | 40,4% | 0,0% | 8,0% | 0,0% | 26,3% | 0,0% | 0,0% | 3,3% | 8,0% | 0,0% |
| so:triceps_maquina | 12.375 | 0,1% | 45,1% | 42,9% | 77,5% | 9,4 | 2,3% | 37,5% | 6,1% | 40,3% | 0,0% | 9,9% | 0,0% | 26,1% | 0,0% | 0,0% | 3,4% | 7,6% | 0,0% |
| vazio | 12.375 | 8,0% | 45,3% | 42,7% | 76,7% | 9,7 | 2,2% | 39,3% | 6,1% | 40,4% | 0,0% | 7,8% | 0,0% | 26,3% | 0,0% | 0,0% | 3,3% | 7,5% | 0,0% |
| so:abdominal_maquina | 12.375 | 0,1% | 45,8% | 43,0% | 76,4% | 9,7 | 1,8% | 39,7% | 5,8% | 40,4% | 0,0% | 7,6% | 0,0% | 26,3% | 0,0% | 0,0% | 3,3% | 7,4% | 0,0% |
| so:desenvolvimento_maquina | 12.375 | 0,1% | 45,8% | 42,8% | 76,8% | 9,7 | 2,2% | 39,1% | 6,1% | 40,1% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,0% | 7,5% | 0,0% |
| so:banco_romano | 12.375 | 0,1% | 46,8% | 40,8% | 76,8% | 9,9 | 2,5% | 38,6% | 6,6% | 41,4% | 0,0% | 9,9% | 0,0% | 24,1% | 0,0% | 0,0% | 0,5% | 8,8% | 0,0% |
| so:supino_maquina | 12.375 | 0,1% | 46,9% | 42,4% | 77,1% | 9,6 | 2,3% | 38,7% | 6,3% | 39,9% | 0,0% | 8,0% | 0,0% | 24,0% | 0,0% | 0,0% | 1,9% | 8,2% | 0,0% |
| so:cadeira_flexora | 12.375 | 0,1% | 47,1% | 45,4% | 77,2% | 9,4 | 1,9% | 37,5% | 6,3% | 38,9% | 0,0% | 6,9% | 0,0% | 21,3% | 0,0% | 0,0% | 2,8% | 7,9% | 0,0% |
| so:mesa_flexora | 12.375 | 0,1% | 47,1% | 45,4% | 77,2% | 9,4 | 1,9% | 37,5% | 6,3% | 38,9% | 0,0% | 6,9% | 0,0% | 21,3% | 0,0% | 0,0% | 2,8% | 7,9% | 0,0% |

## Os piores perfis

Os programas com mais cuidados em falta (10 pontos por cuidado com defeito, 1 por cuidado só com nota), um por cenário, dias e minutos, para não repetir o mesmo caso.

1. **so:paralelas · avancado · 4 dias · 30 min · foco inferiores · punho 7** (67 pontos)
   - Corpo todo A (41 min): agachamento-peso-corpo 4+bi, ponte-gluteo 2, mergulho 2+bi, flexao-joelho-deslizante 4, abdominal-chao 2 | Corpo todo B (28 min): nordico 4+bi, panturrilha-degrau 4+bi, abducao-deitado 2, abertura-t-deitado 3 | Corpo todo C (35 min): afundo-peso-corpo 4+bi, ponte-gluteo 2, mergulho 2+bi, panturrilha-degrau 2 | Corpo todo D (37 min): afundo-tras-peso-corpo 4, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, abertura-t-deitado 2+bi
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 41 min em 30
   - c04b: abdomen com 2 séries
   - c04d: peito com 4 (faixa do avancado: 12 a 20)
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c07c: quadriceps em Corpo todo C e Corpo todo D
   - c08b: Corpo todo A: abdominal-chao, e não elevacao-joelhos-paralelas
   - c11a: mergulho 6 a 12
   - c12a: mergulho: começa no último degrau
   - c14b: Corpo todo B sem multiarticular
   - c15b: Corpo todo A: agachamento-peso-corpo + mergulho
   - c15d: Corpo todo A: agachamento-peso-corpo e mergulho
   - c16b: média de 8,7 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
2. **so:halteres_fixos · intermediario · 2 dias · 30 min · foco peito · sem dor** (66 pontos)
   - Corpo todo A (40 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao-pes-elevados 4+bi, afundo 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-deslizante 2
   - c02a: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 40 min em 30
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_lateral com 0 séries, com foco em peito
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c08b: Corpo todo A: stiff, e não stiff-unilateral
   - c12a: goblet: uma carga só
   - c13a: Corpo todo A: remada-curvada-halteres → stiff
   - c15b: Corpo todo A: flexao + goblet
   - c15c: Corpo todo A: remada-curvada-halteres + stiff
   - c16b: média de 3,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 6
3. **so:halteres_fixos · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (66 pontos)
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
4. **so:kettlebell · intermediario · 2 dias · 30 min · foco peito · sem dor** (66 pontos)
   - Corpo todo A (41 min): flexao 4+bi, goblet-kettlebell 2+bi, remada-unilateral-kettlebell 2+bi, stiff-kettlebell 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao-pes-elevados 4+bi, afundo-kettlebell 2+bi, remada-unilateral-kettlebell 2, flexao-joelho-deslizante 2
   - c02a: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 41 min em 30
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (2 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_posterior com 2 séries, com foco em peito
   - c08a: Corpo todo A: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c08b: Corpo todo A: abdominal-chao, e não abdominal-invertido
   - c12a: goblet-kettlebell: uma carga só
   - c13a: Corpo todo A: remada-unilateral-kettlebell → stiff-kettlebell
   - c15b: Corpo todo A: flexao + goblet-kettlebell
   - c15c: Corpo todo A: remada-unilateral-kettlebell + stiff-kettlebell
   - c16b: média de 3,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 6
5. **so:kettlebell · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (66 pontos)
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
6. **so:halteres_fixos · intermediario · 3 dias · 30 min · foco superiores · punho 7** (58 pontos)
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
7. **so:paralelas · avancado · 5 dias · 30 min · foco inferiores · sem dor** (58 pontos)
   - Corpo todo A (30 min): agachamento-peso-corpo 2+bi, ponte-gluteo 2, flexao 2+bi, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (30 min): flexao-pes-elevados 2, nordico 4+bi, panturrilha-degrau 4+bi, abertura-t-deitado 4 | Corpo todo C (35 min): afundo-peso-corpo 4+bi, ponte-gluteo 2, mergulho 2+bi, panturrilha-degrau 2 | Corpo todo D (30 min): agachamento-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3, extensao-triceps-peso-corpo 2 | Corpo todo E (32 min): afundo-tras-peso-corpo 3+bi, ponte-gluteo 2, flexao-pes-elevados 2+bi, nordico 3
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
   - c15d: Corpo todo A: agachamento-peso-corpo e flexao
   - c16b: média de 9,5 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
8. **academia · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (57 pontos)
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
9. **academia+ · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (57 pontos)
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
10. **so:estacao_polia_dupla · avancado · 5 dias · 30 min · foco inferiores · sem dor** (57 pontos)
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
11. **so:barra_fixa · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (32 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não elevacao-joelhos
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
12. **so:halteres_fixos · intermediario · 5 dias · 30 min · foco inferiores · tornozelo 7** (57 pontos)
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
13. **so:barra_longa · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (35 min): agachamento-peso-corpo 2, terra-romeno-barra 3, ponte-gluteo 2, flexao-joelho-deslizante 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (36 min): afundo-peso-corpo 4, ponte-gluteo 2, nordico 4+bi, panturrilha-degrau 2+bi
   - c01c: Inferior A: terra-romeno-barra depois de agachamento-peso-corpo
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 36 min em 30
   - c03c: dia típico de 20.5 min em 30
   - c03d: dia típico de 20.5 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 20.5 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
14. **so:rack_de_agachamento · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (32 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
15. **so:smith · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (32 min): agachamento-smith 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
16. **so:paralelas · avancado · 6 dias · 30 min · foco inferiores · punho 7** (57 pontos)
   - Corpo todo A (29 min): agachamento-peso-corpo 2+bi, ponte-gluteo 2, mergulho 2+bi, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (28 min): nordico 4+bi, panturrilha-degrau 4+bi, abducao-deitado 2, abertura-t-deitado 3 | Corpo todo C (31 min): afundo-peso-corpo 3+bi, ponte-gluteo 2, mergulho 2+bi, panturrilha-degrau 2 | Corpo todo D (30 min): agachamento-peso-corpo 3, mergulho 2, flexao-joelho-deslizante 2, panturrilha-degrau 3 | Corpo todo E (29 min): afundo-tras-peso-corpo 2, ponte-gluteo 2, nordico 3, abertura-t-deitado 3 | Corpo todo F (30 min): bulgaro-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2, panturrilha-degrau 4
   - c02c: Corpo todo A: 5 exercícios, todos com 2 séries
   - c04b: abdomen com 2 séries
   - c04d: peito com 6 (faixa do avancado: 12 a 20)
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c07c: quadriceps em Corpo todo C e Corpo todo D
   - c08b: Corpo todo A: abdominal-chao, e não elevacao-joelhos-paralelas
   - c11a: mergulho 6 a 12
   - c12a: mergulho: começa no último degrau
   - c14b: Corpo todo B sem multiarticular
   - c15b: Corpo todo A: agachamento-peso-corpo + mergulho
   - c15d: Corpo todo A: agachamento-peso-corpo e mergulho
   - c16b: média de 10,7 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
17. **so:kettlebell · intermediario · 3 dias · 30 min · foco superiores · sem dor** (57 pontos)
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
18. **so:kettlebell · intermediario · 6 dias · 30 min · foco bracos · sem dor** (57 pontos)
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
19. **so:estacao_puxada · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (32 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
20. **so:estacao_remada · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (32 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
21. **so:multifuncional · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (32 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
22. **so:remada_articulada · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (32 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
23. **so:graviton · intermediario · 2 dias · 30 min · foco peito+costas · punho 4** (57 pontos)
   - Corpo todo A (29 min): mergulho-graviton 2+bi, barra-fixa-graviton 2+bi, agachamento-peso-corpo 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao 4+bi, afundo-peso-corpo 2+bi, ponte-gluteo 2, nordico 2
   - c02c: Corpo todo A: 5 exercícios, todos com 2 séries
   - c03a: dia de 35 min em 30
   - c04b: costas com 2 séries
   - c04d: peito com 6 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (1 séries indiretas)
   - c05a: empurrar 6 ÷ puxar 2 séries
   - c05c: ombro da frente 3 ÷ de trás 1
   - c06b: costas com 2, mediana dos outros 2
   - c06c: costas com 2, mediana dos outros 2
   - c06d: ombro_posterior com 1 séries, com foco em peito, costas
   - c08b: Corpo todo A: abdominal-chao, e não abdominal-invertido
   - c15b: Corpo todo A: mergulho-graviton + barra-fixa-graviton
   - c16b: média de 3,1 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
24. **so:graviton · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): abertura-t-deitado 3 | Inferior A (32 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, nordico 3, abdominal-chao 2 | Superior B (6 min): abertura-t-deitado 3 | Inferior B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 34 min em 30
   - c03c: dia típico de 19 min em 30
   - c03d: dia típico de 19 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: quadriceps com 5, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
25. **so:suspensao · intermediario · 4 dias · 30 min · foco inferiores · cotovelo 7** (57 pontos)
   - Superior A (6 min): yt-suspensao 3 | Inferior A (33 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, flexao-joelho-suspensao 3, abdominal-chao 2 | Superior B (6 min): yt-suspensao 3 | Inferior B (36 min): afundo-peso-corpo 4, ponte-gluteo 2, nordico 4+bi, panturrilha-degrau 2+bi
   - c02a: Superior A com 1 exercícios em 30 min (faixa 3 a 5)
   - c03a: dia de 36 min em 30
   - c03c: dia típico de 19.5 min em 30
   - c03d: dia típico de 19.5 min em 30
   - c04b: panturrilha com 2 séries
   - c04c: ombro_posterior com 6 de 10 e o dia típico em 19.5 de 30 min
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
26. **casa · iniciante · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
27. **casa · iniciante · 5 dias · 30 min · foco inferiores · sem dor** (56 pontos)
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
28. **casa · intermediario · 2 dias · 30 min · foco peito · sem dor** (56 pontos)
   - Corpo todo A (40 min): flexao 4+bi, goblet 3+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao-pes-elevados 4+bi, afundo 3+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
   - c02a: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
   - c02b: Corpo todo A com 15 séries em 30 min
   - c03a: dia de 40 min em 30
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_lateral com 0 séries, com foco em peito
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c08b: Corpo todo A: stiff, e não stiff-unilateral
   - c13a: Corpo todo A: remada-curvada-halteres → stiff
   - c15b: Corpo todo A: flexao + goblet
   - c15c: Corpo todo A: remada-curvada-halteres + stiff
   - c16b: média de 3,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 6
29. **casa+ · iniciante · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
30. **condominio · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
31. **elasticos · intermediario · 2 dias · 30 min · foco costas · quadril 7** (56 pontos)
   - Corpo todo A (38 min): puxada-elastico 4+bi, flexao 2+bi, elevacao-lateral-elastico 4+bi, panturrilha-degrau 2+bi, abdominal-chao 2 | Corpo todo B (30 min): remada-elastico 4+bi, flexao-pes-elevados 3+bi, flexao-joelho-elastico 3+bi, rosca-elastico 2+bi
   - c01c: Corpo todo B: flexao-pes-elevados depois de remada-elastico
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 38 min em 30
   - c04a: quadriceps sem nenhuma série
   - c04b: triceps com 2,5 séries
   - c04d: peito com 5 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (4 séries indiretas)
   - c05b: quadríceps 0 ÷ posteriores 3
   - c06d: triceps com 2,5 séries, com foco em costas
   - c08a: Corpo todo A: elevacao-lateral-elastico, e não elevacao-lateral-unilateral-elastico
   - c15b: Corpo todo A: puxada-elastico + flexao
   - c16b: média de 3,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
32. **halteres · intermediario · 2 dias · 30 min · foco peito · sem dor** (56 pontos)
   - Corpo todo A (40 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao-pes-elevados 4+bi, afundo 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-deslizante 2
   - c02a: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 40 min em 30
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_lateral com 0 séries, com foco em peito
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c08b: Corpo todo A: stiff, e não stiff-unilateral
   - c13a: Corpo todo A: remada-curvada-halteres → stiff
   - c15b: Corpo todo A: flexao + goblet
   - c15c: Corpo todo A: remada-curvada-halteres + stiff
   - c16b: média de 3,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 6
33. **halteres · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
34. **halteres-banco · intermediario · 2 dias · 30 min · foco peito · sem dor** (56 pontos)
   - Corpo todo A (42 min): supino-reto 4+bi, bulgaro 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (34 min): supino-reto 4+bi, afundo 2+bi, remada-unilateral-halter 2, flexao-joelho-deslizante 2
   - c02a: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 42 min em 30
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_lateral com 0 séries, com foco em peito
   - c08a: Corpo todo B: afundo, e não afundo-tras
   - c08b: Corpo todo A: bulgaro, e não goblet
   - c13a: Corpo todo A: remada-curvada-halteres → stiff
   - c15b: Corpo todo A: supino-reto + bulgaro
   - c15c: Corpo todo A: remada-curvada-halteres + stiff
   - c16b: média de 3,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 6
35. **halteres-banco · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
36. **halteres-banco · intermediario · 5 dias · 30 min · foco inferiores · tornozelo 7** (56 pontos)
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
37. **diego · intermediario · 2 dias · 30 min · foco costas · quadril 7** (56 pontos)
   - Corpo todo A (37 min): barra-fixa 4+bi, flexao 2+bi, elevacao-lateral-elastico 4+bi, panturrilha-degrau 2+bi, abdominal-chao 2 | Corpo todo B (30 min): remada-elastico 4+bi, flexao-pes-elevados 3+bi, flexao-joelho-elastico 3+bi, rosca-elastico 2+bi
   - c01c: Corpo todo B: flexao-pes-elevados depois de remada-elastico
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 37 min em 30
   - c04a: quadriceps sem nenhuma série
   - c04b: triceps com 2,5 séries
   - c04d: peito com 5 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (4 séries indiretas)
   - c05b: quadríceps 0 ÷ posteriores 3
   - c06d: triceps com 2,5 séries, com foco em costas
   - c08a: Corpo todo A: elevacao-lateral-elastico, e não elevacao-lateral-unilateral-elastico
   - c08b: Corpo todo A: barra-fixa, e não barra-fixa-supinada
   - c15b: Corpo todo A: barra-fixa + flexao
   - c16b: média de 3,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
38. **bruno · iniciante · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
39. **bairro · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
40. **so:estacao_polia_dupla · avancado · 4 dias · 30 min · foco inferiores · cotovelo 7** (56 pontos)
   - Superior A (22 min): elevacao-lateral 3, crucifixo-polia 3, crucifixo-invertido-polia 3 | Inferior A (37 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, nordico 4, abdominal-chao 2 | Superior B (22 min): crucifixo-polia-baixo 3, elevacao-lateral 3, crucifixo-invertido-polia 3 | Inferior B (40 min): afundo-peso-corpo 4, ponte-gluteo 3, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02b: Inferior A com 14 séries em 30 min
   - c03a: dia de 40 min em 30
   - c04b: panturrilha com 2 séries
   - c04d: peito com 6 (faixa do avancado: 12 a 20)
   - c06b: quadriceps com 6, mediana dos outros 6
   - c06c: quadriceps com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08b: Inferior A: abdominal-chao, e não abdominal-invertido
   - c10a: Inferior A: duas vezes flexão de joelho
   - c14b: Superior A sem multiarticular
   - c16b: média de 7,1 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5

## Exemplos

O 1º programa da população com cada medida em falta (sem dor; quando só aparece com dor, com dor).

- `c01c` **o multiarticular mais técnico (complexidade 3) não é o 1º da sua região**: casa · intermediario · 2 dias · 30 min · foco costas · sem dor: Corpo todo B: flexao-pes-elevados depois de remada-unilateral-sem-banco
  - Corpo todo A (40 min): remada-curvada-halteres 4+bi, goblet 3+bi, flexao 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (36 min): remada-unilateral-sem-banco 4+bi, afundo 3+bi, flexao-pes-elevados 2, flexao-joelho-elastico 2
- `c02a` **exercícios por dia fora da faixa dos minutos (A1)**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c02b` **séries demais para os minutos (acima de 0,45 por minuto)**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: Corpo todo A com 15 séries em 30 min
  - Corpo todo A (40 min): flexao 4+bi, goblet 3+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao 4+bi, afundo 3+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c02c` **dia de 5 exercícios ou mais com 2 séries em todos**: casa · iniciante · 2 dias · 30 min · foco pernas · sem dor: Corpo todo A: 6 exercícios, todos com 2 séries
  - Corpo todo A (32 min): goblet 2+bi, stiff 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (40 min): afundo 4+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 4
- `c03a` **dia mais longo acima de 110% dos minutos (A3)**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: dia de 36 min em 30
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c03b` **dia típico abaixo de 70% dos minutos, sem o aviso (A4)**: casa · iniciante · 3 dias · 90 min · foco nenhum · sem dor: dia típico de 55 min em 90, sem o aviso
  - Corpo todo A (49 min): goblet 2, flexao 2, remada-curvada-halteres 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (59 min): stiff 2, flexao 2, remada-unilateral-sem-banco 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-invertido 2 | Corpo todo C (55 min): afundo 2, supino-chao-halteres 2, remada-curvada-halteres 2, ponte-gluteo-halter 3, elevacao-halteres 3, triceps-testa-halteres 2, flexao-joelho-elastico 2, abdominal-chao 2
- `c03c` **dia típico abaixo de 70% dos minutos (com ou sem aviso)**: casa · iniciante · 3 dias · 90 min · foco nenhum · sem dor: dia típico de 55 min em 90
  - Corpo todo A (49 min): goblet 2, flexao 2, remada-curvada-halteres 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (59 min): stiff 2, flexao 2, remada-unilateral-sem-banco 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-invertido 2 | Corpo todo C (55 min): afundo 2, supino-chao-halteres 2, remada-curvada-halteres 2, ponte-gluteo-halter 3, elevacao-halteres 3, triceps-testa-halteres 2, flexao-joelho-elastico 2, abdominal-chao 2
- `c03d` **dia típico abaixo de 85% dos minutos**: casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: dia típico de 69.5 min em 90
  - Corpo todo A (70 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (69 min): afundo 2, flexao 2, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2
- `c04a` **músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_lateral sem nenhuma série
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c04b` **músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_posterior com 2 séries
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c04f` **músculo sem exercício direto (só séries indiretas) havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_lateral sem exercício direto (0 séries indiretas)
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c04c` **músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%)**: casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: gluteos com 3,5 de 6 e o dia típico em 69.5 de 90 min
  - Corpo todo A (70 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (69 min): afundo 2, flexao 2, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2
- `c04d` **algum músculo abaixo da faixa do nível (havendo exercício)**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: peito com 4 (faixa do iniciante: 6 a 10)
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c04e` **algum músculo acima da faixa do nível**: casa · iniciante · 2 dias · 75 min · foco gluteos · sem dor: gluteos com 10,5 (faixa do iniciante: 6 a 10)
  - Corpo todo A (72 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 4, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (73 min): ponte-gluteo-halter 4+bi, afundo 2+bi, flexao 2+bi, remada-unilateral-sem-banco 3+bi, abducao-elastico 3+bi, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, rosca-alternada 2+drop+bi, crucifixo-invertido-sentado 2+drop, abdominal-invertido 2
- `c05a` **empurrar ÷ puxar acima de 1,5 havendo como puxar (D1)**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: empurrar 8 ÷ puxar 4 séries
  - Corpo todo A (40 min): flexao 4+bi, goblet 3+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao 4+bi, afundo 3+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c05b` **quadríceps ÷ posteriores fora de 0,5 a 2 (D3)**: casa · iniciante · 2 dias · 30 min · foco nenhum · quadril 7: quadríceps 0 ÷ posteriores 3
  - Corpo todo A (27 min): flexao 2+bi, remada-curvada-halteres 2+bi, elevacao-halteres 3+drop+bi, panturrilha-degrau 2+bi, abdominal-chao 2 | Corpo todo B (26 min): flexao 3+bi, remada-unilateral-sem-banco 3+bi, flexao-joelho-elastico 3+bi, rosca-alternada 3+bi
- `c05c` **ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás**: academia · avancado · 3 dias · 45 min · foco peito · sem dor: ombro da frente 7 ÷ de trás 3
  - Corpo todo A (45 min): supino-reto 4+bi, agachamento-barra 2+bi, puxada-unilateral 2, crucifixo-polia 4+bi, cadeira-flexora 3+bi, triceps-frances 2 | Corpo todo B (44 min): supino-inclinado 3+bi, stiff 3+bi, remada-apoiada 2, cadeira-extensora 2+bi, rosca-inclinada 3+bi, panturrilha 4 | Corpo todo C (45 min): supino-barra 3+bi, afundo 2+bi, puxada-barra-reta 2, coice-maquina 3+bi, elevacao-halteres 3+drop+bi, abdominal-polia 3+drop
- `c06a` **foco abaixo da meta com tempo e exercício (C1)**: casa · avancado · 2 dias · 90 min · foco peito · sem dor: peito com 12 de 14 e o dia mais longo em 76 de 90 min
  - Corpo todo A (76 min): flexao 4, goblet 2, remada-curvada-halteres 3, stiff 3, crucifixo-elastico 4, triceps-frances-halter 2, elevacao-halteres 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (74 min): flexao-pes-elevados 4, afundo 2, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-curvado 3, elevacao-halteres 3, abdominal-invertido 2
- `c06b` **o foco não passa da mediana dos outros (C2)**: casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 3
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c06c` **o foco fica a menos de 1,3 vez a mediana dos outros**: casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 3
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c06d` **com foco, outro músculo com menos de 4 séries havendo exercício**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: ombro_lateral com 0 séries, com foco em peito
  - Corpo todo A (40 min): flexao 4+bi, goblet 3+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao 4+bi, afundo 3+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c07a` **músculo com 8 séries diretas ou mais treinado num dia só**: casa · iniciante · 2 dias · 75 min · foco pernas · sem dor: panturrilha com 8 séries diretas num dia só
  - Corpo todo A (75 min): goblet 4+bi, stiff 4+bi, flexao 2+bi, remada-curvada-halteres 3+bi, panturrilha-degrau 4+bi, panturrilha-sentada-halter 3+drop+bi, triceps-frances-halter 3+drop+bi, elevacao-halteres 2+drop+bi, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 3, flexao-joelho-elastico 4+bi, extensao-joelho-elastico 3+bi, rosca-alternada 3+bi, crucifixo-invertido-sentado 3+bi, elevacao-halteres 2+drop+bi, aducao-deitado 2+bi, abdominal-invertido 2
- `c07c` **o mesmo músculo com 3 séries diretas ou mais em dias seguidos**: casa · iniciante · 4 dias · 45 min · foco ombros · sem dor: ombro_lateral em Superior B e Inferior B
  - Superior A (40 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 3, triceps-frances-halter 2, crucifixo-invertido-sentado 2 | Inferior A (43 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 4 | Superior B (43 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, desenvolvimento-unilateral 2, elevacao-halteres 3, crucifixo-invertido-sentado 2 | Inferior B (45 min): afundo 2, ponte-gluteo-halter 3, elevacao-halteres 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3
- `c08a` **exercício escolhido por ter animação, com um equivalente sem uso no programa**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet, e não agachamento-halteres
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c08b` **exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: stiff, e não stiff-unilateral
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c09a` **o mesmo exercício em todos os dias havendo outro do mesmo nível (B1)**: casa · iniciante · 3 dias · 45 min · foco nenhum · ombro 7: ponte-gluteo-halter em todos os dias, com outro do mesmo nível possível e sem uso
  - Corpo todo A (38 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-martelo 3, triceps-elastico-alto 3, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 3, abdominal-invertido 2 | Corpo todo C (43 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
- `c09b` **o mesmo exercício em todos os dias sem opção do mesmo nível (B2)**: elasticos · avancado · 3 dias · 75 min · foco superiores · sem dor: puxada-elastico em todos os dias, sem outro do mesmo nível
  - Corpo todo A (75 min): flexao 3, puxada-elastico 4, agachamento-elastico 2, triceps-elastico-acima 4, elevacao-lateral-elastico 4, crucifixo-elastico 3, rosca-elastico 3, flexao-joelho-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): flexao-pes-elevados 2, remada-elastico 4, puxada-elastico 2, stiff-elastico 2, desenvolvimento-elastico 2, rosca-martelo-elastico 3, extensao-joelho-elastico 2, panturrilha-degrau 4, face-pull-elastico 2, abdominal-invertido 2 | Corpo todo C (74 min): flexao 2+bi, puxada-elastico 4+bi, flexao-fechada 4+bi, afundo-peso-corpo 2+bi, ponte-gluteo 3, elevacao-lateral-unilateral-elastico 4+bi, rosca-elastico 2+bi, flexao-joelho-elastico 2
- `c10a` **dois exercícios da mesma função no mesmo dia**: casa · iniciante · 2 dias · 90 min · foco ombros · sem dor: Corpo todo A: duas vezes elevação lateral
  - Corpo todo A (77 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, elevacao-halteres 4, elevacao-lateral-unilateral 2, triceps-frances-halter 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (79 min): afundo 2, flexao 2, remada-unilateral-sem-banco 3, desenvolvimento-unilateral 2, elevacao-halteres 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, abdominal-invertido 2
- `c10b` **três exercícios ou mais do mesmo músculo no mesmo dia**: casa+ · iniciante · 5 dias · 30 min · foco peito · sem dor: Empurrar: 3 exercícios de peito
  - Superior (25 min): supino-reto 3, barra-fixa-negativa 2, remada-apoiada 2, triceps-frances-halter 2 | Inferior (31 min): bulgaro 2, stiff 2, panturrilha 2, abdominal-bola 4 | Empurrar (23 min): supino-inclinado 3, supino-reto 2, crucifixo-halteres 2, triceps-frances-kettlebell 2 | Puxar (22 min): remada-unilateral-halter 2, barra-fixa-negativa 2, crucifixo-inverso 2, rosca-inclinada 2 | Pernas (25 min): afundo 2, ponte-gluteo-halter 2, extensao-joelho-caneleira 2, flexao-bola 2
- `c11a` **peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado**: bairro · avancado · 2 dias · 90 min · foco bracos · sem dor: mergulho 6 a 12
  - Corpo todo A (87 min): mergulho 4, leg-press 2, supino-reto 2, barra-fixa 3, stiff 3, triceps-frances-halter 4, rosca-inclinada 4, elevacao-halteres 3, panturrilha-leg-press 4, crucifixo-halteres 2, abdominal-chao 2 | Corpo todo B (87 min): afundo 2, supino-inclinado 2, remada-apoiada 3, rosca-scott-banco-inclinado 4, rosca-inclinada 3, triceps-frances-unilateral-halter 4, cadeira-flexora 3, cadeira-extensora 2, crucifixo-inverso 3, elevacao-halteres 3, abdominal-invertido 2
- `c12a` **exercício sem próximo passo de carga (uma carga só, ou já no último degrau)**: bairro · avancado · 2 dias · 90 min · foco bracos · sem dor: mergulho: começa no último degrau
  - Corpo todo A (87 min): mergulho 4, leg-press 2, supino-reto 2, barra-fixa 3, stiff 3, triceps-frances-halter 4, rosca-inclinada 4, elevacao-halteres 3, panturrilha-leg-press 4, crucifixo-halteres 2, abdominal-chao 2 | Corpo todo B (87 min): afundo 2, supino-inclinado 2, remada-apoiada 3, rosca-scott-banco-inclinado 4, rosca-inclinada 3, triceps-frances-unilateral-halter 4, cadeira-flexora 3, cadeira-extensora 2, crucifixo-inverso 3, elevacao-halteres 3, abdominal-invertido 2
- `c13a` **dois exercícios seguidos que carregam a lombar sem apoio**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: remada-curvada-halteres → stiff
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c13b` **três exercícios ou mais no dia que carregam a lombar sem apoio**: casa · iniciante · 2 dias · 90 min · foco costas · sem dor: Corpo todo A: remada-curvada-halteres, remada-unilateral-sem-banco, stiff
  - Corpo todo A (79 min): remada-curvada-halteres 4, remada-unilateral-sem-banco 2, goblet 2, flexao 2, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (67 min): remada-unilateral-sem-banco 4, afundo 2, flexao 2, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 2, crucifixo-invertido-sentado 2, elevacao-halteres 3, abdominal-invertido 2
- `c13c` **três exercícios seguidos que dependem da pegada**: academia · avancado · 3 dias · 75 min · foco superiores · sem dor: Corpo todo B: remada-apoiada → puxada-frente → stiff
  - Corpo todo A (74 min): supino-reto 4, puxada-unilateral 4, agachamento-barra 2, triceps-frances 4+bi, elevacao-halteres 4+bi, crucifixo-polia 4, rosca-inclinada 3, cadeira-flexora 2, abdominal-polia 2 | Corpo todo B (74 min): supino-inclinado 3, remada-apoiada 4, puxada-frente 2, stiff 2, desenvolvimento 2, rosca-maquina 3, cadeira-extensora 2, panturrilha 4, crucifixo-invertido-polia 2, abdominal-maquina 2 | Corpo todo C (72 min): supino-barra 3, puxada-barra-reta 4, afundo 2, elevacao-lateral 4+bi, triceps-corda 4+bi, rosca-polia-costas 2, coice-maquina 3, cadeira-flexora 2, abdominal-polia 2
- `c14b` **dia com menos de 3 exercícios ou sem multiarticular (A2)**: casa · iniciante · 5 dias · 30 min · foco nenhum · sem dor: Empurrar sem multiarticular
  - Superior (30 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 3 | Inferior (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Empurrar (22 min): elevacao-halteres 3, triceps-frances-halter 4, crucifixo-elastico 3 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (27 min): afundo 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, flexao-joelho-elastico 2
- `c15a` **iniciante com bi-set ou drop set**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet em bi-set
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c15b` **bi-set entre dois multiarticulares**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet + flexao
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c15c` **bi-set em que os dois carregam a lombar ou dependem da pegada**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: remada-curvada-halteres + stiff
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c15d` **bi-set com os dois exercícios separados na lista do dia**: casa · iniciante · 2 dias · 30 min · foco pernas · sem dor: Corpo todo A: goblet e flexao
  - Corpo todo A (32 min): goblet 2+bi, stiff 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (40 min): afundo 4+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 4
- `c16a` **iniciante com mais de 12 exercícios diferentes na semana**: casa · iniciante · 2 dias · 60 min · foco nenhum · sem dor: 15 exercícios diferentes na semana
  - Corpo todo A (59 min): goblet 2+bi, flexao 3+bi, remada-curvada-halteres 3+bi, stiff 3+bi, triceps-frances-halter 3+bi, elevacao-halteres 4+bi, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (60 min): afundo 2, flexao 3, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, rosca-alternada 3+bi, crucifixo-invertido-sentado 3+bi, abdominal-invertido 2
- `c16b` **intermediário ou avançado com a média dos músculos abaixo da faixa do nível**: casa · intermediario · 2 dias · 30 min · foco nenhum · sem dor: média de 3 séries por músculo (faixa do intermediario: a partir de 10)
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao-pes-elevados 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c20a` **o texto "cabem cerca de N exercícios" com um dia acima de N**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: o texto diz 4 e há dia com 6
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- `c20b` **o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: o texto diz ~6 e ombro_lateral tem 0
  - Corpo todo A (36 min): goblet 3+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3+bi, flexao 2+bi, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2

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
| cadeira-flexora | **cartão** | 8,3% | 50,9% |
| cadeira-extensora | **cartão** | 7,9% | 50,2% |
| abdominal-chao | sim | 85,4% | 50,2% |
| triceps-frances-halter | sim | 17,6% | 45,4% |
| puxada-unilateral | sim | 6,3% | 42,0% |
| triceps-frances | sim | 4,3% | 38,9% |
| puxada-barra-reta | **cartão** | 3,8% | 37,8% |
| panturrilha | sim | 10,7% | 36,9% |
| panturrilha-degrau | sim | 76,4% | 36,4% |
| crucifixo-halteres | **cartão** | 10,0% | 35,9% |
| crucifixo-inverso | **cartão** | 7,1% | 35,2% |
| coice-maquina | **cartão** | 4,2% | 35,1% |
| elevacao-lateral | sim | 5,5% | 34,9% |
| abdominal-invertido | sim | 60,0% | 32,5% |
| abdominal-maquina | **cartão** | 4,5% | 32,4% |
| ponte-gluteo-halter | sim | 15,1% | 30,1% |
| flexao | sim | 67,4% | 29,1% |
| abdominal-polia | sim | 4,1% | 27,7% |
| triceps-corda | sim | 3,0% | 26,4% |
| stiff-unilateral | sim | 10,6% | 24,8% |
| bulgaro | sim | 9,5% | 22,5% |
| remada-baixa | sim | 2,4% | 21,7% |
| flexao-joelho-deslizante | sim | 69,0% | 20,5% |
| rosca-maquina | **cartão** | 3,5% | 20,4% |
| panturrilha-bilateral-step | sim | 6,1% | 20,1% |
| agachamento-barra | **cartão** | 1,8% | 20,1% |
| crucifixo-invertido-sentado | **cartão** | 9,4% | 19,6% |
| remada-curvada-halteres | sim | 12,2% | 19,2% |
| crucifixo-invertido-polia | sim | 4,2% | 18,6% |
| afundo-peso-corpo | sim | 63,0% | 18,0% |
| panturrilha-em-pe-maquina | **cartão** | 2,8% | 18,0% |
| panturrilha-leg-press | **cartão** | 4,0% | 17,9% |
| abdominal-bola | sim | 8,5% | 17,7% |
| ponte-gluteo | sim | 62,0% | 17,6% |
| triceps-testa-halteres | **cartão** | 8,3% | 16,8% |
| agachamento-smith | **cartão** | 2,3% | 16,6% |
| crucifixo-polia | sim | 3,8% | 15,3% |
| flexao-pes-elevados | sim | 43,2% | 15,2% |
| goblet | sim | 10,9% | 15,1% |
| flexao-joelho-elastico | sim | 10,6% | 15,0% |
| supino-maquina | **cartão** | 3,2% | 14,1% |
| flexao-bola | sim | 8,3% | 14,0% |
| rosca-scott-banco-inclinado | **cartão** | 4,7% | 14,0% |
| agachamento-peso-corpo | sim | 50,7% | 12,7% |
| abertura-t-deitado | sim | 54,2% | 12,7% |
| flexao-fechada | sim | 38,3% | 12,6% |
| supino-barra | **cartão** | 1,0% | 12,5% |
| extensao-triceps-peso-corpo | sim | 48,3% | 12,2% |
| extensao-joelho-elastico | sim | 9,5% | 12,1% |
| rosca-alternada | sim | 10,8% | 12,1% |
| puxada-frente | **cartão** | 6,3% | 12,0% |
| remada-unilateral-sem-banco | sim | 9,4% | 11,6% |
| hip-thrust | **cartão** | 3,0% | 11,1% |
| stiff-kettlebell | sim | 3,2% | 11,0% |
| crucifixo-inclinado-halteres | **cartão** | 3,2% | 10,4% |
| crucifixo-invertido-curvado | **cartão** | 7,5% | 10,3% |
| afundo-tras-peso-corpo | sim | 39,0% | 10,2% |
| nordico | sim | 41,3% | 9,9% |
| face-pull | sim | 1,5% | 8,9% |
| desenvolvimento | sim | 3,3% | 8,7% |
| triceps-frances-unilateral-halter | **cartão** | 6,2% | 8,5% |
| remada-unilateral-halter | sim | 4,0% | 8,5% |
| barra-fixa | sim | 4,2% | 8,0% |
| leg-press | **cartão** | 3,2% | 7,9% |
| barra-fixa-supinada | sim | 3,5% | 7,3% |
| barra-fixa-negativa | **cartão** | 2,8% | 7,0% |
| rosca-martelo | sim | 7,3% | 6,8% |
| crucifixo-elastico | sim | 6,2% | 6,4% |
| aducao-deitado | sim | 22,7% | 6,3% |
| abducao-maquina | **cartão** | 1,4% | 5,6% |
| abducao-deitado | sim | 24,6% | 5,6% |
| agachamento-elastico | sim | 6,3% | 4,9% |
| stiff-elastico | sim | 6,3% | 4,9% |
| extensao-joelho-caneleira | sim | 3,2% | 4,8% |
| remada-elastico | sim | 5,8% | 4,6% |
| triceps-elastico-acima | sim | 5,7% | 4,5% |
| elevacao-lateral-elastico | sim | 5,8% | 4,3% |
| aducao-maquina | **cartão** | 1,3% | 4,3% |
| triceps-suspensao | sim | 3,2% | 4,0% |
| puxada-elastico | sim | 4,5% | 3,9% |
| face-pull-elastico | sim | 5,6% | 3,9% |
| elevacao-lateral-unilateral-elastico | **cartão** | 5,1% | 3,8% |
| supino-chao-halteres | **cartão** | 4,5% | 3,7% |
| rosca-elastico | sim | 4,6% | 3,6% |
| panturrilha-sentada-halter | sim | 2,5% | 3,4% |
| coice-polia | **cartão** | 0,3% | 3,1% |
| panturrilha-sentada | **cartão** | 1,0% | 3,1% |
| afundo-tras | **cartão** | 3,7% | 2,9% |
| triceps-barra-reta | **cartão** | 0,9% | 2,7% |
| mergulho | **cartão** | 1,6% | 2,7% |
| elevacao-joelhos | sim | 2,0% | 2,7% |
| hack | **cartão** | 2,1% | 2,5% |
| rosca-scott | **cartão** | 0,4% | 2,5% |
| rosca-polia-costas | **cartão** | 2,0% | 2,4% |
| panturrilha-chao | sim | 19,4% | 2,4% |
| pike | sim | 17,7% | 2,2% |
| desenvolvimento-unilateral | **cartão** | 3,2% | 2,1% |
| remada-curvada-elastico | **cartão** | 2,5% | 2,0% |
| rosca-martelo-elastico | **cartão** | 3,1% | 2,0% |
| triceps-frances-kettlebell | sim | 2,1% | 1,7% |
| abducao-elastico | **cartão** | 1,6% | 1,6% |
| abducao-caneleira | sim | 1,4% | 1,5% |
| bulgaro-peso-corpo | sim | 14,0% | 1,5% |
| abertura-elastico | **cartão** | 2,2% | 1,5% |
| remada-suspensao | sim | 3,2% | 1,5% |
| remada-articulada | **cartão** | 1,9% | 1,4% |
| supino-inclinado-polia | **cartão** | 0,5% | 1,4% |
| ponte-kettlebell | sim | 1,8% | 1,4% |
| rosca-suspensao | sim | 2,8% | 1,3% |
| abducao-polia | **cartão** | 0,2% | 1,3% |
| aducao-caneleira | sim | 1,2% | 1,1% |
| rosca-concentrada | **cartão** | 1,7% | 1,1% |
| mesa-flexora | **cartão** | 2,1% | 1,1% |
| triceps-elastico-alto | **cartão** | 2,1% | 0,9% |
| elevacao-lateral-deitado | **cartão** | 1,6% | 0,9% |
| yt-suspensao | sim | 2,2% | 0,8% |
| flexao-elastico | sim | 0,4% | 0,8% |
| coice-elastico | **cartão** | 0,9% | 0,7% |
| desenvolvimento-maquina | **cartão** | 0,7% | 0,7% |
| desenvolvimento-elastico | sim | 2,1% | 0,7% |
| abdominal-declinado | **cartão** | 0,3% | 0,5% |
| afundo-kettlebell | sim | 1,6% | 0,5% |
| agachamento-halteres | **cartão** | 1,4% | 0,5% |
| rosca-kettlebell | sim | 1,6% | 0,5% |
| stiff-unilateral-kettlebell | **cartão** | 1,1% | 0,5% |
| desenvolvimento-unilateral-kettlebell | sim | 0,6% | 0,5% |
| flexao-joelho-suspensao | sim | 1,8% | 0,5% |
| goblet-kettlebell | **cartão** | 1,6% | 0,5% |
| elevacao-lateral-unilateral | **cartão** | 0,9% | 0,5% |
| remada-unilateral-kettlebell | sim | 1,5% | 0,5% |
| desenvolvimento-barra | **cartão** | 0,1% | 0,3% |
| elevacao-joelhos-paralelas | sim | 1,2% | 0,3% |
| terra-romeno-barra | **cartão** | 1,2% | 0,3% |
| rosca-polia | sim | 0,1% | 0,2% |
| remada-invertida | **cartão** | 3,2% | 0,2% |
| face-pull-suspensao | **cartão** | 0,7% | 0,2% |
| remada-baixa-estacao | **cartão** | 2,9% | 0,2% |
| triceps-maquina | **cartão** | 1,3% | 0,2% |
| elevacao-lateral-caneleira | **cartão** | 1,7% | 0,2% |
| voador | **cartão** | 1,5% | 0,2% |
| barra-fixa-graviton | **cartão** | 1,6% | 0,1% |
| extensao-joelho-mini-band | **cartão** | 1,6% | 0,1% |
| hiperextensao | **cartão** | 1,6% | 0,1% |
| remada-unilateral-polia | sim | 1,5% | 0,1% |
| terra-hexagonal | **cartão** | 1,5% | 0,1% |
| coice-caneleira | **cartão** | 1,6% | 0,1% |
| roda-abdominal | sim | 0,8% | 0,1% |
| rosca-barra-w | **cartão** | 1,4% | 0,1% |
| triceps-frances-polia-unilateral | sim | 1,4% | 0,1% |
| crucifixo-invertido-caneleira | **cartão** | 1,4% | 0,1% |
| mergulho-graviton | **cartão** | 1,1% | 0,1% |
| remada-barra | **cartão** | 1,0% | 0,1% |
| crucifixo-polia-baixo | **cartão** | 0,9% | 0,0% |
| ponte-pes-bola | sim | 0,6% | 0,0% |
| abducao-mini-band | sim | 0,6% | 0,0% |
| abducao-deitado-mini-band | **cartão** | 0,3% | 0,0% |
| desenvolvimento-em-pe-halteres | **cartão** | 0,1% | 0,0% |
| bulgaro-suspensao | sim | 0,1% | 0,0% |

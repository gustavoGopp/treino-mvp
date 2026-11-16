# O retrato medido: os 20 cuidados em 680.625 programas

> Gerado por `scripts/auditoria/retrato.ts` (motor: `src/domain/gerador/index.ts`). Dados fictícios. Não editar à mão.

**680.625 combinações**, 680.625 programas (0 sem exercício possível, 0 bloqueadas). "Grade" = cada combinação vale igual. "Ponderada" = as combinações mais prováveis valem mais (pesos de `scripts/auditoria/populacao.ts`, **estimativa**).

| | grade | ponderada |
| --- | ---: | ---: |
| programas sem nenhum defeito | 47,1% | 57,5% |
| idem, sem dor | 45,0% | 56,5% |
| idem, com dor | 47,3% | 61,2% |
| programas sem defeito nem nota | 0,0% | 0,0% |
| uso do tempo (dia típico ÷ minutos pedidos) | 78,9% | 85,9% |
| séries por semana (média) | 59,0 | 63,1 |
| séries por músculo por semana (média, fora o abdômen) | 9,0 | 7,9 |
| músculos abaixo da faixa do nível (média por programa) | 3,5 | 4,2 |
| exercícios por dia (média) | 5,64 | 6,35 |
| escolhas decididas pela animação (% das prescrições) | 4,6% | 13,9% |
| escolhas decididas pela ordem alfabética (% das prescrições) | 0,0% | 0,0% |

## A régua oficial (G5) na mesma população

| defeito ou nota | grade | ponderada | sem dor | com dor |
| --- | ---: | ---: | ---: | ---: |
| **sem nenhum defeito da régua** | 91,0% | 97,1% | 93,4% | 90,8% |
| A2 | 4,2% | 0,5% | 0,8% | 4,4% |
| A3 | 3,3% | 2,1% | 4,2% | 3,2% |
| A4 | 0,0% | 0,0% | 0,0% | 0,0% |
| B1 | 0,0% | 0,0% | 0,0% | 0,0% |
| C1 | 1,5% | 0,1% | 1,4% | 1,5% |
| D1 | 0,5% | 0,3% | 0,6% | 0,4% |
| D3 | 0,1% | 0,0% | 0,0% | 0,1% |
| E1 | 0,0% | 0,0% | 0,0% | 0,0% |
| seguranca | 0,0% | 0,0% | 0,0% | 0,0% |
| A1 | 14,3% | 2,4% | 8,7% | 14,7% |
| A5 | 17,4% | 9,9% | 13,8% | 17,6% |
| B2 | 18,7% | 5,5% | 15,8% | 18,9% |
| B3 | 7,5% | 3,8% | 8,5% | 7,4% |
| C2 | 9,9% | 7,0% | 11,3% | 9,8% |
| G1 | 12,5% | 57,9% | 13,0% | 12,5% |
| cartões de texto por dia (média) | 0,72 | 1,86 | | |

## Cada cuidado

% dos programas que falham. "Pior grupo": o recorte (equipamento, nível, minutos, dias, foco ou dor) com a maior fatia na grade.

| cuidado | medida | tipo | grade | ponderada | sem dor | com dor | pior grupo |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | `c01a` dia que começa por um isolador havendo multiarticular | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 1 | `c01b` multiarticular depois de isolador | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 1 | `c01c` o multiarticular mais técnico (complexidade 3) não é o 1º da sua região | nota | 12,7% | 11,7% | 15,3% | 12,5% | dias:2 (22,6%) |
| 1 | `c01d` abdominal antes de outro exercício | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 2 | `c02a` exercícios por dia fora da faixa dos minutos (A1) | nota | 14,3% | 2,4% | 8,7% | 14,7% | dor:cotovelo 7 (37,9%) |
| 2 | `c02b` séries demais para os minutos (acima de 0,45 por minuto) | nota | 1,5% | 1,3% | 1,7% | 1,5% | min:30 (6,7%) |
| 2 | `c02c` dia de 5 exercícios ou mais com 2 séries em todos | nota | 22,3% | 15,4% | 20,2% | 22,5% | dias:6 (55,9%) |
| 3 | `c03a` dia mais longo acima de 110% dos minutos (A3) | defeito | 3,3% | 2,1% | 4,2% | 3,2% | min:30 (13,2%) |
| 3 | `c03b` dia típico abaixo de 70% dos minutos, sem o aviso (A4) | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 3 | `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso) | nota | 34,2% | 17,6% | 31,3% | 34,4% | min:90 (76,5%) |
| 3 | `c03d` dia típico abaixo de 85% dos minutos | nota | 50,0% | 37,0% | 46,3% | 50,3% | min:90 (88,9%) |
| 4 | `c04a` músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível | defeito | 7,4% | 10,4% | 9,4% | 7,2% | min:30 (29,8%) |
| 4 | `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível | defeito | 11,9% | 20,1% | 15,8% | 11,6% | min:30 (47,5%) |
| 4 | `c04f` músculo sem exercício direto (só séries indiretas) havendo exercício possível | nota | 14,7% | 24,3% | 18,6% | 14,4% | min:30 (45,2%) |
| 4 | `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%) | defeito | 33,3% | 18,9% | 33,9% | 33,3% | min:90 (64,5%) |
| 4 | `c04d` algum músculo abaixo da faixa do nível (havendo exercício) | nota | 80,1% | 77,8% | 85,4% | 79,8% | dias:2 (98,5%) |
| 4 | `c04e` algum músculo acima da faixa do nível | nota | 23,1% | 13,3% | 20,7% | 23,3% | nivel:iniciante (52,6%) |
| 5 | `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1) | defeito | 0,5% | 0,3% | 0,6% | 0,4% | foco:peito (3,0%) |
| 5 | `c05b` quadríceps ÷ posteriores fora de 0,5 a 2 (D3) | defeito | 0,1% | 0,0% | 0,0% | 0,1% | dor:quadril 7 (1,8%) |
| 5 | `c05c` ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás | nota | 4,1% | 0,5% | 5,2% | 4,1% | min:30 (11,5%) |
| 6 | `c06a` foco abaixo da meta com tempo e exercício (C1) | defeito | 1,5% | 0,1% | 1,4% | 1,5% | min:90 (4,4%) |
| 6 | `c06b` o foco não passa da mediana dos outros (C2) | nota | 9,9% | 7,0% | 11,3% | 9,8% | foco:pernas (33,4%) |
| 6 | `c06c` o foco fica a menos de 1,3 vez a mediana dos outros | nota | 16,3% | 12,9% | 17,7% | 16,2% | foco:pernas (48,2%) |
| 6 | `c06d` com foco, outro músculo com menos de 4 séries havendo exercício | defeito | 11,9% | 13,2% | 15,2% | 11,7% | min:30 (46,9%) |
| 7 | `c07a` músculo com 8 séries diretas ou mais treinado num dia só | nota | 2,1% | 0,9% | 2,2% | 2,1% | dias:2 (9,8%) |
| 7 | `c07b` mais de 10 séries de um músculo num dia | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 7 | `c07c` o mesmo músculo com 3 séries diretas ou mais em dias seguidos | nota | 16,4% | 5,9% | 12,9% | 16,6% | dias:4 (38,7%) |
| 8 | `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa | nota | 32,0% | 81,8% | 34,4% | 31,8% | grupo:par (87,6%) |
| 8 | `c08b` exercício escolhido pela ordem alfabética, com um equivalente sem uso no programa | nota | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 9 | `c09a` o mesmo exercício em todos os dias havendo outro do mesmo nível (B1) | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 9 | `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2) | nota | 18,7% | 5,5% | 15,8% | 18,9% | nivel:iniciante (43,8%) |
| 10 | `c10a` dois exercícios da mesma função no mesmo dia | nota | 28,0% | 10,7% | 29,2% | 27,9% | foco:pernas (52,2%) |
| 10 | `c10b` três exercícios ou mais do mesmo músculo no mesmo dia | nota | 5,8% | 17,2% | 7,7% | 5,6% | grupo:atalho (22,6%) |
| 11 | `c11a` peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado | nota | 0,8% | 1,0% | 0,9% | 0,8% | grupo:persona (2,7%) |
| 12 | `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau) | defeito | 5,0% | 2,5% | 5,1% | 5,0% | nivel:avancado (7,8%) |
| 13 | `c13a` dois exercícios seguidos que carregam a lombar sem apoio | nota | 8,9% | 19,4% | 10,2% | 8,8% | grupo:atalho (24,3%) |
| 13 | `c13b` três exercícios ou mais no dia que carregam a lombar sem apoio | nota | 0,7% | 0,6% | 0,8% | 0,6% | foco:ombros (3,2%) |
| 13 | `c13c` três exercícios seguidos que dependem da pegada | nota | 0,0% | 0,0% | 0,0% | 0,0% | dor:joelho 7 (0,3%) |
| 14 | `c14a` exercício impossível, acima da complexidade ou numa região com dor acima de 5 | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 14 | `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2) | defeito | 4,2% | 0,5% | 0,8% | 4,4% | dor:cotovelo 7 (22,8%) |
| 14 | `c14c` o programa perdeu um dia inteiro | nota | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 15 | `c15a` iniciante com bi-set ou drop set | nota | 9,1% | 15,5% | 10,9% | 9,0% | nivel:iniciante (27,4%) |
| 15 | `c15b` bi-set entre dois multiarticulares | nota | 21,1% | 26,8% | 27,8% | 20,6% | min:30 (51,7%) |
| 15 | `c15c` bi-set em que os dois carregam a lombar ou dependem da pegada | nota | 1,0% | 4,0% | 1,4% | 0,9% | grupo:atalho (5,5%) |
| 15 | `c15d` bi-set com os dois exercícios separados na lista do dia | nota | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 16 | `c16a` iniciante com mais de 12 exercícios diferentes na semana | nota | 12,7% | 36,7% | 15,6% | 12,5% | nivel:iniciante (38,1%) |
| 16 | `c16b` intermediário ou avançado com a média dos músculos abaixo da faixa do nível | nota | 42,6% | 42,0% | 47,6% | 42,2% | nivel:avancado (70,6%) |
| 17 | `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |
| 20 | `c20a` o texto "cabem cerca de N exercícios" com um dia acima de N | defeito | 4,9% | 5,8% | 7,3% | 4,7% | min:30 (21,0%) |
| 20 | `c20b` o texto "todos ficam com ~6 séries" com um músculo a 9 ou mais, ou abaixo de 4 | defeito | 0,0% | 0,0% | 0,0% | 0,0% | dias:2 (0,0%) |

### Por cuidado (falha em alguma medida do cuidado)

| cuidado | com defeito: grade | ponderada | com defeito ou nota: grade | ponderada |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 0,0% | 0,0% | 12,7% | 11,7% |
| 2 | 0,0% | 0,0% | 34,1% | 18,5% |
| 3 | 3,3% | 2,1% | 53,2% | 39,0% |
| 4 | 46,9% | 39,9% | 94,3% | 87,1% |
| 5 | 0,6% | 0,3% | 4,6% | 0,8% |
| 6 | 13,4% | 13,3% | 25,0% | 21,3% |
| 7 | 0,0% | 0,0% | 18,4% | 6,7% |
| 8 | 0,0% | 0,0% | 32,0% | 81,8% |
| 9 | 0,0% | 0,0% | 18,7% | 5,5% |
| 10 | 0,0% | 0,0% | 31,3% | 24,6% |
| 11 | 0,0% | 0,0% | 0,8% | 1,0% |
| 12 | 5,0% | 2,5% | 5,0% | 2,5% |
| 13 | 0,0% | 0,0% | 8,9% | 19,4% |
| 14 | 4,2% | 0,5% | 4,2% | 0,5% |
| 15 | 0,0% | 0,0% | 23,8% | 30,9% |
| 16 | 0,0% | 0,0% | 55,3% | 78,7% |
| 17 | 0,0% | 0,0% | 0,0% | 0,0% |
| 20 | 4,9% | 5,8% | 4,9% | 5,8% |

Nas tabelas por recorte: `c03a` dia mais longo acima de 110% dos minutos (A3); `c03c` dia típico abaixo de 70% dos minutos (com ou sem aviso); `c04b` músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível; `c04c` músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%); `c05a` empurrar ÷ puxar acima de 1,5 havendo como puxar (D1); `c06b` o foco não passa da mediana dos outros (C2); `c08a` exercício escolhido por ter animação, com um equivalente sem uso no programa; `c09b` o mesmo exercício em todos os dias sem opção do mesmo nível (B2); `c12a` exercício sem próximo passo de carga (uma carga só, ou já no último degrau); `c13a` dois exercícios seguidos que carregam a lombar sem apoio; `c14b` dia com menos de 3 exercícios ou sem multiarticular (A2); `c15a` iniciante com bi-set ou drop set; `c17a` músculo com menos de 4 séries (ou a zero) sem aviso que o cite.

## Por grupo de equipamento

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| atalho | 74.250 | 62,0% | 48,5% | 58,2% | 82,5% | 8,2 | 3,9% | 25,9% | 23,1% | 26,2% | 0,6% | 11,4% | 85,9% | 1,5% | 0,0% | 24,3% | 3,3% | 10,4% | 0,0% |
| persona | 74.250 | 18,0% | 49,3% | 56,9% | 83,1% | 8,2 | 4,9% | 25,6% | 21,2% | 24,8% | 0,6% | 12,7% | 86,6% | 3,9% | 2,7% | 15,2% | 4,8% | 11,2% | 0,0% |
| vazio | 12.375 | 8,0% | 49,1% | 57,9% | 76,8% | 9,7 | 2,2% | 39,3% | 6,1% | 40,3% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| item | 470.250 | 8,0% | 46,0% | 49,7% | 77,2% | 9,3 | 2,7% | 37,6% | 7,9% | 36,6% | 0,4% | 8,9% | 9,9% | 25,1% | 6,8% | 4,5% | 4,1% | 8,4% | 0,0% |
| par | 49.500 | 4,0% | 51,4% | 63,9% | 83,4% | 8,1 | 5,5% | 25,4% | 20,2% | 23,8% | 0,6% | 13,3% | 87,6% | 4,4% | 0,0% | 20,5% | 5,9% | 11,5% | 0,0% |

## Por nível

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| iniciante | 226.875 | 45,0% | 63,4% | 67,1% | 73,5% | 8,1 | 2,0% | 43,4% | 11,7% | 17,0% | 0,3% | 12,1% | 33,5% | 43,8% | 3,6% | 7,4% | 3,7% | 27,4% | 0,0% |
| intermediario | 226.875 | 35,0% | 37,5% | 48,4% | 79,9% | 9,1 | 3,4% | 32,6% | 11,9% | 44,2% | 0,5% | 8,9% | 31,2% | 6,2% | 3,6% | 9,5% | 4,1% | 0,0% | 0,0% |
| avancado | 226.875 | 20,0% | 40,4% | 52,0% | 83,3% | 9,8 | 4,5% | 26,5% | 12,0% | 38,7% | 0,6% | 8,7% | 31,3% | 6,1% | 7,8% | 9,7% | 4,7% | 0,0% | 0,0% |

## Por minutos

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 136.125 | 12,0% | 31,6% | 10,6% | 97,3% | 6,6 | 13,2% | 0,3% | 47,5% | 3,1% | 1,7% | 23,1% | 28,9% | 14,5% | 4,6% | 8,1% | 12,9% | 22,1% | 0,0% |
| 45 | 136.125 | 28,0% | 72,0% | 61,4% | 91,4% | 8,7 | 2,9% | 4,9% | 8,6% | 9,4% | 0,4% | 12,1% | 32,7% | 17,9% | 4,9% | 8,3% | 2,7% | 13,6% | 0,0% |
| 60 | 136.125 | 38,0% | 58,4% | 75,3% | 79,7% | 9,6 | 0,3% | 30,0% | 2,4% | 34,8% | 0,1% | 6,5% | 32,8% | 19,9% | 5,2% | 9,2% | 1,8% | 7,3% | 0,0% |
| 75 | 136.125 | 12,0% | 41,1% | 53,4% | 67,9% | 10,0 | 0,0% | 59,1% | 0,8% | 54,9% | 0,0% | 4,0% | 32,9% | 20,5% | 5,2% | 9,4% | 1,8% | 2,3% | 0,0% |
| 90 | 136.125 | 10,0% | 32,4% | 40,2% | 58,1% | 10,2 | 0,0% | 76,5% | 0,2% | 64,5% | 0,0% | 3,6% | 32,8% | 20,6% | 5,2% | 9,4% | 1,7% | 0,4% | 0,0% |

## Por dias

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | 136.125 | 10,0% | 45,1% | 34,9% | 92,5% | 6,1 | 7,3% | 8,8% | 26,2% | 21,0% | 1,3% | 15,2% | 32,1% | 0,0% | 4,5% | 8,7% | 0,0% | 18,6% | 0,0% |
| 3 | 136.125 | 35,0% | 47,2% | 57,4% | 85,7% | 7,9 | 4,6% | 22,1% | 12,4% | 32,2% | 0,8% | 7,1% | 33,8% | 33,2% | 5,1% | 4,4% | 2,6% | 12,9% | 0,0% |
| 4 | 136.125 | 28,0% | 46,3% | 65,7% | 77,9% | 9,2 | 2,2% | 35,9% | 8,0% | 37,3% | 0,0% | 5,6% | 33,1% | 20,3% | 5,1% | 10,4% | 4,3% | 6,9% | 0,0% |
| 5 | 136.125 | 20,0% | 49,9% | 59,6% | 71,2% | 10,3 | 1,5% | 48,6% | 6,4% | 36,5% | 0,0% | 9,5% | 30,0% | 21,0% | 5,2% | 10,7% | 6,7% | 4,3% | 0,0% |
| 6 | 136.125 | 7,0% | 47,0% | 51,6% | 67,1% | 11,5 | 1,0% | 55,5% | 6,4% | 39,7% | 0,1% | 11,9% | 31,1% | 19,0% | 5,2% | 10,2% | 7,2% | 2,9% | 0,0% |

## Por foco

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| nenhum | 61.875 | 35,0% | 50,5% | 58,9% | 78,6% | 9,1 | 0,3% | 35,1% | 10,5% | 32,5% | 0,0% | 0,0% | 31,9% | 18,9% | 5,0% | 8,4% | 3,5% | 5,6% | 0,0% |
| peito | 61.875 | 5,0% | 46,3% | 57,3% | 77,2% | 8,9 | 2,9% | 37,8% | 9,7% | 36,7% | 3,0% | 0,9% | 32,0% | 18,8% | 5,0% | 10,2% | 2,9% | 7,1% | 0,0% |
| costas | 61.875 | 4,0% | 47,3% | 63,0% | 76,7% | 8,8 | 2,5% | 39,3% | 7,7% | 37,4% | 0,3% | 1,1% | 32,2% | 19,0% | 5,0% | 7,4% | 3,5% | 6,4% | 0,0% |
| ombros | 61.875 | 4,0% | 51,0% | 56,5% | 78,7% | 8,9 | 0,1% | 34,9% | 10,2% | 32,4% | 0,0% | 4,5% | 31,5% | 18,8% | 5,0% | 10,8% | 2,7% | 6,5% | 0,0% |
| bracos | 61.875 | 7,0% | 43,4% | 45,5% | 77,0% | 8,9 | 0,4% | 37,3% | 13,6% | 35,9% | 0,1% | 6,7% | 30,7% | 20,1% | 5,1% | 8,6% | 3,7% | 6,9% | 0,0% |
| pernas | 61.875 | 6,0% | 49,3% | 58,7% | 80,7% | 9,5 | 6,0% | 29,9% | 15,1% | 28,0% | 0,0% | 33,4% | 32,5% | 18,6% | 5,0% | 7,8% | 4,5% | 14,4% | 0,0% |
| gluteos | 61.875 | 9,0% | 46,0% | 54,6% | 80,8% | 8,9 | 3,2% | 29,0% | 12,6% | 32,2% | 0,0% | 1,0% | 33,1% | 17,3% | 5,0% | 8,8% | 6,9% | 10,9% | 0,0% |
| abdomen | 61.875 | 5,0% | 47,7% | 55,7% | 78,0% | 8,1 | 0,2% | 35,6% | 10,8% | 34,6% | 0,0% | 15,3% | 32,3% | 18,2% | 5,0% | 8,5% | 3,5% | 7,9% | 0,0% |
| superiores | 61.875 | 8,0% | 46,3% | 65,7% | 80,7% | 9,4 | 4,7% | 31,2% | 13,8% | 32,2% | 1,0% | 11,0% | 30,7% | 20,2% | 5,0% | 10,2% | 4,1% | 9,6% | 0,0% |
| inferiores | 61.875 | 9,0% | 44,1% | 52,2% | 81,9% | 9,6 | 11,7% | 27,8% | 18,4% | 27,7% | 0,0% | 32,7% | 33,4% | 17,0% | 5,0% | 7,9% | 7,5% | 17,0% | 0,0% |
| peito+costas | 61.875 | 8,0% | 46,3% | 61,0% | 77,3% | 9,1 | 4,2% | 37,9% | 8,5% | 36,9% | 0,6% | 2,0% | 31,9% | 18,9% | 5,0% | 9,1% | 2,9% | 8,3% | 0,0% |

## Por dor

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| sem dor | 45.375 | 78,0% | 45,0% | 56,5% | 80,7% | 8,6 | 4,2% | 31,3% | 15,8% | 33,9% | 0,6% | 11,3% | 34,4% | 15,8% | 5,1% | 10,2% | 0,8% | 10,9% | 0,0% |
| cotovelo 7 | 45.375 | 0,6% | 33,0% | 55,7% | 73,9% | 9,5 | 1,4% | 42,3% | 3,9% | 44,3% | 0,0% | 6,5% | 21,4% | 19,2% | 4,2% | 1,1% | 22,8% | 5,2% | 0,0% |
| lombar 7 | 45.375 | 2,4% | 53,6% | 65,6% | 81,4% | 9,2 | 2,6% | 29,0% | 10,1% | 28,5% | 0,5% | 10,6% | 32,0% | 19,6% | 5,2% | 0,0% | 4,1% | 9,9% | 0,0% |
| joelho 7 | 45.375 | 2,0% | 53,1% | 69,0% | 78,5% | 9,0 | 3,7% | 34,7% | 6,7% | 32,7% | 0,3% | 7,2% | 32,8% | 24,1% | 5,2% | 21,9% | 1,2% | 8,9% | 0,0% |
| ombro 4 | 45.375 | 3,0% | 45,1% | 57,4% | 80,8% | 8,5 | 4,2% | 31,2% | 15,9% | 33,6% | 0,6% | 11,2% | 33,4% | 15,8% | 5,1% | 10,2% | 0,8% | 11,0% | 0,0% |
| punho 4 | 45.375 | 0,9% | 45,0% | 56,5% | 80,7% | 8,6 | 4,3% | 31,3% | 15,8% | 33,9% | 0,6% | 11,2% | 33,6% | 15,8% | 5,2% | 10,2% | 0,8% | 11,0% | 0,0% |
| quadril 4 | 45.375 | 0,9% | 45,0% | 56,5% | 80,7% | 8,6 | 4,2% | 31,3% | 15,8% | 33,9% | 0,6% | 11,3% | 34,4% | 15,8% | 5,1% | 10,2% | 0,8% | 10,9% | 0,0% |
| tornozelo 4 | 45.375 | 0,9% | 45,0% | 56,5% | 80,7% | 8,6 | 4,2% | 31,3% | 15,8% | 33,9% | 0,6% | 11,3% | 34,4% | 15,8% | 5,1% | 10,2% | 0,8% | 10,9% | 0,0% |
| ombro 7 | 45.375 | 2,0% | 66,0% | 78,5% | 72,0% | 10,9 | 1,0% | 47,1% | 2,3% | 22,3% | 0,0% | 8,8% | 22,7% | 17,4% | 4,2% | 0,6% | 8,0% | 3,5% | 0,0% |
| punho 7 | 45.375 | 0,6% | 39,9% | 54,8% | 77,3% | 9,0 | 3,2% | 36,8% | 10,1% | 34,9% | 0,2% | 8,7% | 34,9% | 23,1% | 5,2% | 11,9% | 13,6% | 7,7% | 0,0% |
| quadril 7 | 45.375 | 0,6% | 51,0% | 64,6% | 75,2% | 9,8 | 0,2% | 38,7% | 6,9% | 34,3% | 0,4% | 8,3% | 29,5% | 35,1% | 5,2% | 7,5% | 5,8% | 5,4% | 0,0% |
| tornozelo 7 | 45.375 | 0,6% | 50,1% | 67,4% | 78,9% | 9,2 | 3,4% | 33,6% | 11,8% | 32,1% | 0,5% | 7,8% | 35,3% | 15,8% | 5,1% | 10,3% | 0,7% | 8,9% | 0,0% |
| cotovelo 4 | 45.375 | 0,9% | 45,0% | 56,9% | 80,8% | 8,6 | 4,2% | 31,3% | 15,8% | 33,8% | 0,6% | 11,3% | 33,5% | 15,8% | 5,1% | 10,2% | 0,8% | 10,9% | 0,0% |
| lombar 4 | 45.375 | 3,6% | 45,0% | 56,3% | 80,7% | 8,6 | 4,2% | 31,3% | 15,8% | 33,9% | 0,6% | 11,3% | 33,6% | 15,8% | 5,1% | 8,6% | 0,8% | 11,0% | 0,0% |
| joelho 4 | 45.375 | 3,0% | 45,0% | 56,5% | 80,7% | 8,6 | 4,2% | 31,3% | 15,8% | 33,9% | 0,6% | 11,3% | 34,2% | 15,8% | 5,1% | 10,2% | 0,8% | 10,9% | 0,0% |

## Por nível e minutos

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| avancado 30 | 45.375 | 2,4% | 29,8% | 9,8% | 98,8% | 6,8 | 17,6% | 0,2% | 47,6% | 2,3% | 2,2% | 24,2% | 29,3% | 2,2% | 6,5% | 8,8% | 13,0% | 0,0% | 0,0% |
| avancado 45 | 45.375 | 5,6% | 68,8% | 58,1% | 94,8% | 9,2 | 4,2% | 2,6% | 8,7% | 9,8% | 0,6% | 11,9% | 32,1% | 5,0% | 7,5% | 9,0% | 3,1% | 0,0% | 0,0% |
| avancado 60 | 45.375 | 7,6% | 51,7% | 68,0% | 84,7% | 10,5 | 0,7% | 16,3% | 2,5% | 39,9% | 0,2% | 4,8% | 31,7% | 7,3% | 8,3% | 10,1% | 2,4% | 0,0% | 0,0% |
| avancado 75 | 45.375 | 2,4% | 31,0% | 45,9% | 73,7% | 11,1 | 0,0% | 47,2% | 0,9% | 64,9% | 0,1% | 1,4% | 31,8% | 7,9% | 8,3% | 10,3% | 2,4% | 0,0% | 0,0% |
| avancado 90 | 45.375 | 2,0% | 20,7% | 32,0% | 64,2% | 11,4 | 0,0% | 66,2% | 0,4% | 76,7% | 0,0% | 1,0% | 31,6% | 8,0% | 8,3% | 10,3% | 2,4% | 0,0% | 0,0% |
| iniciante 30 | 45.375 | 5,4% | 33,1% | 11,1% | 95,2% | 6,4 | 8,4% | 0,5% | 47,3% | 3,8% | 1,1% | 21,4% | 28,0% | 39,2% | 3,6% | 6,5% | 12,9% | 66,4% | 0,0% |
| iniciante 45 | 45.375 | 12,6% | 78,6% | 65,0% | 86,8% | 8,1 | 1,3% | 8,3% | 8,5% | 4,2% | 0,2% | 13,0% | 33,9% | 43,7% | 3,6% | 6,9% | 2,4% | 40,9% | 0,0% |
| iniciante 60 | 45.375 | 17,1% | 77,6% | 87,1% | 73,2% | 8,6 | 0,0% | 47,5% | 2,2% | 15,8% | 0,0% | 9,4% | 35,0% | 45,0% | 3,6% | 7,7% | 1,2% | 22,0% | 0,0% |
| iniciante 75 | 45.375 | 5,4% | 66,3% | 68,2% | 60,9% | 8,7 | 0,0% | 73,1% | 0,6% | 28,1% | 0,0% | 8,4% | 35,3% | 45,6% | 3,6% | 7,9% | 1,2% | 6,8% | 0,0% |
| iniciante 90 | 45.375 | 4,5% | 61,4% | 62,6% | 51,3% | 8,8 | 0,0% | 87,4% | 0,0% | 33,3% | 0,0% | 8,2% | 35,3% | 45,6% | 3,6% | 7,9% | 1,2% | 1,1% | 0,0% |
| intermediario 30 | 45.375 | 4,2% | 31,9% | 10,4% | 97,8% | 6,6 | 13,7% | 0,2% | 47,4% | 3,1% | 1,7% | 23,8% | 29,3% | 2,2% | 3,6% | 8,8% | 12,7% | 0,0% | 0,0% |
| intermediario 45 | 45.375 | 9,8% | 68,5% | 58,7% | 92,6% | 8,8 | 3,1% | 3,7% | 8,6% | 14,2% | 0,4% | 11,5% | 32,0% | 5,1% | 3,6% | 8,9% | 2,7% | 0,0% | 0,0% |
| intermediario 60 | 45.375 | 13,3% | 46,0% | 64,3% | 81,1% | 9,8 | 0,3% | 26,2% | 2,5% | 48,7% | 0,2% | 5,1% | 31,7% | 7,5% | 3,6% | 9,9% | 1,8% | 0,0% | 0,0% |
| intermediario 75 | 45.375 | 4,2% | 25,9% | 38,7% | 69,0% | 10,2 | 0,0% | 57,1% | 0,8% | 71,5% | 0,1% | 2,1% | 31,8% | 8,1% | 3,6% | 10,0% | 1,7% | 0,0% | 0,0% |
| intermediario 90 | 45.375 | 3,5% | 15,2% | 16,0% | 58,9% | 10,3 | 0,0% | 75,9% | 0,3% | 83,5% | 0,0% | 1,7% | 31,6% | 8,2% | 3,6% | 10,0% | 1,7% | 0,0% | 0,0% |

## Por nível e dias

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| avancado 2 | 45.375 | 2,0% | 49,0% | 36,3% | 94,3% | 6,3 | 6,6% | 5,4% | 26,5% | 15,3% | 1,4% | 16,6% | 32,5% | 0,0% | 6,3% | 9,8% | 0,0% | 0,0% | 0,0% |
| avancado 3 | 45.375 | 7,0% | 52,6% | 63,2% | 91,6% | 8,7 | 6,7% | 11,3% | 12,5% | 23,8% | 1,4% | 8,0% | 33,9% | 16,6% | 8,0% | 5,0% | 2,7% | 0,0% | 0,0% |
| avancado 4 | 45.375 | 5,6% | 37,5% | 57,7% | 82,9% | 10,1 | 4,0% | 26,4% | 8,1% | 45,1% | 0,1% | 6,0% | 32,4% | 4,9% | 8,0% | 11,1% | 5,1% | 0,0% | 0,0% |
| avancado 5 | 45.375 | 4,0% | 33,2% | 42,0% | 76,0% | 11,4 | 3,0% | 39,8% | 6,5% | 52,7% | 0,0% | 5,3% | 28,1% | 5,1% | 8,3% | 11,6% | 7,6% | 0,0% | 0,0% |
| avancado 6 | 45.375 | 1,4% | 29,8% | 24,4% | 71,6% | 12,5 | 2,2% | 49,6% | 6,5% | 56,9% | 0,1% | 7,5% | 29,6% | 3,9% | 8,3% | 11,1% | 7,8% | 0,0% | 0,0% |
| iniciante 2 | 45.375 | 4,5% | 39,6% | 33,2% | 90,1% | 5,9 | 7,9% | 13,9% | 25,6% | 28,2% | 1,1% | 12,7% | 31,3% | 0,0% | 3,6% | 6,6% | 0,0% | 55,9% | 0,0% |
| iniciante 3 | 45.375 | 15,8% | 43,3% | 51,8% | 78,8% | 7,0 | 1,8% | 35,4% | 12,4% | 38,2% | 0,3% | 5,8% | 33,4% | 66,8% | 3,6% | 3,8% | 2,7% | 38,8% | 0,0% |
| iniciante 4 | 45.375 | 12,6% | 67,3% | 77,5% | 71,5% | 8,1 | 0,1% | 47,4% | 8,0% | 15,7% | 0,0% | 5,3% | 34,3% | 50,7% | 3,6% | 8,9% | 3,5% | 20,8% | 0,0% |
| iniciante 5 | 45.375 | 9,0% | 83,7% | 88,7% | 65,0% | 9,1 | 0,0% | 58,4% | 6,3% | 1,5% | 0,0% | 18,0% | 34,2% | 52,5% | 3,6% | 9,0% | 5,9% | 13,0% | 0,0% |
| iniciante 6 | 45.375 | 3,2% | 83,1% | 88,5% | 62,0% | 10,5 | 0,0% | 61,8% | 6,4% | 1,6% | 0,0% | 18,7% | 34,2% | 49,0% | 3,6% | 8,5% | 6,7% | 8,8% | 0,0% |
| intermediario 2 | 45.375 | 3,5% | 46,9% | 36,3% | 93,1% | 6,1 | 7,3% | 7,0% | 26,5% | 19,4% | 1,5% | 16,5% | 32,4% | 0,0% | 3,6% | 9,8% | 0,0% | 0,0% | 0,0% |
| intermediario 3 | 45.375 | 12,3% | 45,7% | 61,2% | 86,8% | 8,1 | 5,4% | 19,5% | 12,4% | 34,6% | 0,8% | 7,4% | 34,1% | 16,3% | 3,6% | 4,5% | 2,6% | 0,0% | 0,0% |
| intermediario 4 | 45.375 | 9,8% | 34,2% | 55,3% | 79,3% | 9,4 | 2,4% | 33,8% | 8,0% | 51,1% | 0,0% | 5,6% | 32,5% | 5,1% | 3,6% | 11,0% | 4,2% | 0,0% | 0,0% |
| intermediario 5 | 45.375 | 7,0% | 32,7% | 32,3% | 72,5% | 10,5 | 1,3% | 47,8% | 6,4% | 55,2% | 0,0% | 5,3% | 27,8% | 5,5% | 3,6% | 11,4% | 6,6% | 0,0% | 0,0% |
| intermediario 6 | 45.375 | 2,5% | 28,2% | 19,8% | 67,7% | 11,5 | 0,7% | 55,2% | 6,3% | 60,5% | 0,1% | 9,5% | 29,4% | 4,1% | 3,6% | 11,0% | 7,2% | 0,0% | 0,0% |

## Por cenário de equipamento

| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | c03a | c03c | c04b | c04c | c05a | c06b | c08a | c09b | c12a | c13a | c14b | c15a | c17a |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| so:halteres_fixos | 12.375 | 1,0% | 0,0% | 0,0% | 82,3% | 8,4 | 4,0% | 27,1% | 13,3% | 25,9% | 0,6% | 11,6% | 91,7% | 3,3% | 100,0% | 64,4% | 1,5% | 10,8% | 0,0% |
| so:kettlebell | 12.375 | 0,5% | 0,0% | 0,0% | 79,6% | 8,6 | 5,1% | 33,6% | 13,6% | 30,4% | 1,1% | 8,6% | 60,0% | 25,3% | 100,0% | 31,0% | 3,5% | 9,9% | 0,0% |
| so:mini_band | 12.375 | 0,1% | 28,0% | 39,9% | 78,3% | 9,7 | 2,1% | 36,0% | 6,4% | 37,7% | 0,0% | 6,5% | 30,7% | 29,0% | 32,1% | 0,0% | 11,4% | 6,9% | 0,0% |
| so:cadeira_extensora | 12.375 | 0,1% | 36,5% | 48,8% | 77,4% | 9,7 | 1,6% | 37,7% | 6,0% | 39,6% | 0,0% | 6,2% | 0,0% | 29,0% | 0,0% | 0,0% | 13,3% | 6,1% | 0,0% |
| so:paralelas | 12.375 | 0,1% | 36,7% | 45,7% | 76,7% | 9,7 | 2,4% | 39,7% | 6,1% | 41,1% | 0,0% | 8,2% | 3,2% | 29,9% | 27,3% | 0,0% | 2,2% | 7,4% | 0,0% |
| so:caneleiras | 12.375 | 0,1% | 38,7% | 55,8% | 82,3% | 9,2 | 2,2% | 27,4% | 11,4% | 32,4% | 0,0% | 8,4% | 0,0% | 29,2% | 0,0% | 0,0% | 16,0% | 9,7% | 0,0% |
| bairro | 12.375 | 8,0% | 39,3% | 48,6% | 81,5% | 8,3 | 3,5% | 27,2% | 24,6% | 27,4% | 0,6% | 10,8% | 70,6% | 2,3% | 16,4% | 4,1% | 3,0% | 10,2% | 0,0% |
| so:barra_w | 12.375 | 0,1% | 42,0% | 52,4% | 79,9% | 9,2 | 2,2% | 32,5% | 6,7% | 35,7% | 0,0% | 9,2% | 0,0% | 40,3% | 0,0% | 0,0% | 4,2% | 9,2% | 0,0% |
| so:rosca_maquina | 12.375 | 0,1% | 42,4% | 52,4% | 80,2% | 9,2 | 2,1% | 31,9% | 6,5% | 35,5% | 0,0% | 9,4% | 0,0% | 43,2% | 0,0% | 0,0% | 4,3% | 9,3% | 0,0% |
| academia | 12.375 | 20,0% | 45,7% | 56,3% | 81,8% | 8,2 | 3,0% | 26,8% | 25,7% | 27,5% | 0,6% | 10,5% | 97,5% | 2,6% | 0,0% | 34,5% | 2,4% | 10,3% | 0,0% |
| academia+ | 12.375 | 20,0% | 45,7% | 56,3% | 81,9% | 8,2 | 3,1% | 26,7% | 25,7% | 27,4% | 0,6% | 10,4% | 97,5% | 0,0% | 0,0% | 34,5% | 2,5% | 10,2% | 0,0% |
| so:barra_hexagonal | 12.375 | 0,1% | 45,9% | 53,6% | 74,8% | 10,1 | 1,7% | 42,7% | 6,0% | 43,7% | 0,0% | 8,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,1% | 6,6% | 0,0% |
| condominio+ | 12.375 | 6,0% | 46,9% | 57,8% | 82,7% | 8,1 | 3,8% | 25,3% | 25,3% | 25,9% | 0,5% | 11,1% | 86,4% | 0,2% | 0,0% | 4,0% | 3,2% | 10,3% | 0,0% |
| suspensao+elasticos | 12.375 | 1,0% | 47,4% | 59,3% | 84,4% | 7,8 | 7,1% | 23,8% | 27,4% | 22,0% | 0,8% | 14,7% | 87,8% | 6,4% | 0,0% | 0,0% | 7,4% | 11,9% | 0,0% |
| so:leg_press | 12.375 | 0,1% | 47,5% | 56,5% | 75,6% | 9,7 | 2,0% | 41,7% | 6,0% | 42,2% | 0,0% | 7,3% | 0,0% | 26,3% | 0,0% | 0,0% | 3,1% | 6,6% | 0,0% |
| diego | 12.375 | 1,0% | 47,5% | 59,5% | 84,1% | 7,9 | 6,9% | 24,2% | 27,0% | 22,4% | 0,7% | 15,6% | 94,5% | 5,7% | 0,0% | 0,1% | 7,2% | 11,8% | 0,0% |
| elasticos | 12.375 | 2,0% | 47,6% | 59,7% | 84,5% | 7,9 | 7,3% | 24,0% | 27,2% | 22,0% | 0,9% | 15,7% | 93,9% | 5,7% | 0,0% | 0,7% | 7,2% | 12,0% | 0,0% |
| step+elasticos | 12.375 | 1,0% | 47,8% | 59,8% | 84,8% | 7,9 | 7,3% | 23,6% | 27,3% | 21,7% | 0,9% | 15,7% | 93,9% | 5,7% | 0,0% | 0,7% | 7,2% | 11,8% | 0,0% |
| so:panturrilha_sentada_maquina | 12.375 | 0,1% | 47,9% | 57,4% | 76,2% | 9,7 | 2,2% | 40,2% | 6,1% | 41,5% | 0,0% | 7,3% | 0,0% | 26,3% | 0,0% | 0,0% | 3,4% | 7,2% | 0,0% |
| so:bola_suica | 12.375 | 0,1% | 48,0% | 57,0% | 76,5% | 9,7 | 2,5% | 40,2% | 6,3% | 41,1% | 0,0% | 9,0% | 0,0% | 21,3% | 0,0% | 0,0% | 3,2% | 7,5% | 0,0% |
| so:voador | 12.375 | 0,1% | 48,1% | 58,0% | 77,8% | 9,7 | 2,3% | 36,5% | 6,4% | 39,1% | 0,0% | 8,3% | 0,0% | 27,5% | 0,0% | 0,0% | 7,4% | 7,6% | 0,0% |
| so:panturrilha_em_pe_maquina | 12.375 | 0,1% | 48,1% | 57,4% | 76,0% | 9,7 | 2,1% | 40,9% | 6,0% | 41,4% | 0,0% | 7,3% | 0,0% | 26,3% | 0,0% | 0,0% | 3,1% | 7,2% | 0,0% |
| so:cadeira_abdutora_adutora | 12.375 | 0,1% | 48,2% | 57,1% | 75,9% | 9,7 | 1,8% | 40,6% | 6,1% | 41,6% | 0,0% | 7,9% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 6,6% | 0,0% |
| casa | 12.375 | 5,0% | 48,2% | 59,9% | 84,0% | 7,9 | 6,0% | 24,3% | 26,4% | 22,6% | 0,6% | 13,3% | 95,0% | 6,2% | 0,0% | 64,8% | 7,2% | 11,1% | 0,0% |
| so:hack | 12.375 | 0,1% | 48,5% | 57,0% | 76,3% | 9,7 | 2,0% | 40,4% | 6,2% | 41,0% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,1% | 7,1% | 0,0% |
| so:gluteo_maquina | 12.375 | 0,1% | 48,7% | 57,4% | 76,1% | 9,7 | 1,2% | 39,7% | 5,8% | 41,3% | 0,0% | 7,5% | 0,0% | 26,4% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| so:triceps_maquina | 12.375 | 0,1% | 48,7% | 57,9% | 77,7% | 9,4 | 2,3% | 37,5% | 6,1% | 40,2% | 0,0% | 9,9% | 0,0% | 26,1% | 0,0% | 0,0% | 3,4% | 7,6% | 0,0% |
| so:roda_abdominal | 12.375 | 0,1% | 48,8% | 57,8% | 76,8% | 9,7 | 2,2% | 39,3% | 6,1% | 40,5% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| vazio | 12.375 | 8,0% | 49,1% | 57,9% | 76,8% | 9,7 | 2,2% | 39,3% | 6,1% | 40,3% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| so:step | 12.375 | 0,1% | 49,1% | 57,9% | 77,2% | 9,7 | 2,2% | 37,9% | 6,2% | 40,3% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| casa+ | 12.375 | 5,0% | 49,4% | 60,5% | 82,6% | 8,2 | 4,1% | 25,2% | 22,1% | 26,7% | 0,6% | 11,2% | 68,8% | 0,2% | 0,0% | 3,9% | 2,5% | 10,1% | 0,0% |
| so:abdominal_maquina | 12.375 | 0,1% | 49,5% | 58,2% | 76,5% | 9,7 | 1,8% | 39,7% | 5,9% | 40,3% | 0,0% | 7,6% | 0,0% | 26,3% | 0,0% | 0,0% | 3,2% | 7,4% | 0,0% |
| so:desenvolvimento_maquina | 12.375 | 0,1% | 49,6% | 58,0% | 77,0% | 9,7 | 2,2% | 39,1% | 6,2% | 40,0% | 0,0% | 7,7% | 0,0% | 26,3% | 0,0% | 0,0% | 2,7% | 7,5% | 0,0% |
| so:barra_longa | 12.375 | 0,1% | 49,7% | 52,6% | 75,1% | 9,2 | 3,2% | 41,5% | 8,0% | 40,0% | 1,3% | 10,6% | 0,0% | 36,4% | 0,0% | 9,6% | 2,3% | 7,4% | 0,0% |
| bruno | 12.375 | 3,0% | 50,4% | 61,4% | 83,5% | 8,3 | 3,9% | 24,0% | 22,2% | 25,5% | 0,8% | 11,4% | 91,8% | 2,5% | 0,0% | 5,1% | 2,5% | 11,4% | 0,0% |
| so:cadeira_flexora | 12.375 | 0,1% | 50,7% | 58,7% | 77,4% | 9,4 | 1,9% | 37,4% | 6,3% | 38,8% | 0,0% | 6,9% | 0,0% | 21,3% | 0,0% | 0,0% | 2,7% | 7,9% | 0,0% |
| so:mesa_flexora | 12.375 | 0,1% | 50,7% | 58,7% | 77,4% | 9,4 | 1,9% | 37,4% | 6,3% | 38,8% | 0,0% | 6,9% | 0,0% | 21,3% | 0,0% | 0,0% | 2,7% | 7,9% | 0,0% |
| so:supino_maquina | 12.375 | 0,1% | 50,7% | 58,1% | 77,2% | 9,6 | 2,3% | 38,7% | 6,4% | 39,9% | 0,0% | 8,0% | 0,0% | 24,0% | 0,0% | 0,0% | 1,7% | 8,2% | 0,0% |
| so:banco_romano | 12.375 | 0,1% | 50,9% | 57,1% | 76,9% | 9,9 | 2,5% | 38,6% | 6,6% | 41,4% | 0,0% | 9,8% | 0,0% | 24,1% | 0,0% | 0,0% | 0,5% | 8,9% | 0,0% |
| so:suspensao | 12.375 | 0,5% | 52,0% | 65,8% | 77,3% | 8,8 | 4,3% | 36,1% | 13,0% | 31,5% | 0,8% | 7,9% | 42,7% | 25,1% | 0,0% | 0,0% | 3,1% | 9,5% | 0,0% |
| so:estacao_remada | 12.375 | 0,1% | 52,2% | 61,5% | 74,4% | 9,0 | 2,7% | 41,6% | 9,5% | 33,9% | 2,3% | 10,3% | 0,0% | 23,6% | 0,0% | 0,0% | 3,9% | 9,4% | 0,0% |
| so:smith | 12.375 | 0,1% | 53,1% | 62,7% | 74,8% | 9,0 | 3,8% | 41,2% | 9,2% | 33,3% | 0,5% | 9,5% | 0,0% | 31,3% | 0,0% | 0,0% | 3,2% | 9,2% | 0,0% |
| so:remada_articulada | 12.375 | 0,1% | 53,1% | 62,0% | 74,7% | 9,0 | 2,7% | 41,2% | 9,8% | 33,0% | 2,6% | 10,6% | 0,0% | 25,3% | 0,0% | 0,0% | 3,3% | 9,4% | 0,0% |
| banco+halteres-leves | 12.375 | 1,0% | 53,4% | 67,4% | 82,3% | 8,3 | 3,7% | 27,0% | 13,2% | 25,4% | 0,4% | 11,5% | 77,0% | 4,1% | 0,0% | 16,8% | 7,2% | 11,3% | 0,0% |
| halteres-banco | 12.375 | 2,0% | 53,4% | 67,4% | 82,3% | 8,3 | 3,7% | 27,0% | 13,2% | 25,4% | 0,4% | 11,5% | 77,0% | 4,1% | 0,0% | 16,8% | 7,2% | 11,3% | 0,0% |
| so:rack_de_agachamento | 12.375 | 0,1% | 53,4% | 63,1% | 75,1% | 9,0 | 3,8% | 40,7% | 9,2% | 33,1% | 0,7% | 9,8% | 0,0% | 31,3% | 0,0% | 0,0% | 3,2% | 9,4% | 0,0% |
| so:graviton | 12.375 | 0,1% | 54,0% | 63,1% | 74,2% | 9,0 | 3,2% | 42,0% | 8,2% | 33,7% | 1,2% | 10,4% | 23,7% | 22,3% | 0,0% | 0,0% | 3,2% | 9,2% | 0,0% |
| so:estacao_puxada | 12.375 | 0,1% | 54,1% | 63,6% | 74,7% | 9,0 | 3,3% | 41,4% | 8,0% | 33,1% | 1,2% | 10,1% | 0,0% | 24,9% | 0,0% | 0,0% | 3,9% | 9,5% | 0,0% |
| so:estacao_polia_dupla | 12.375 | 0,1% | 54,5% | 68,0% | 84,9% | 8,3 | 7,9% | 23,3% | 14,9% | 20,7% | 0,8% | 16,1% | 31,7% | 17,8% | 0,0% | 0,0% | 7,7% | 14,8% | 0,0% |
| condominio | 12.375 | 6,0% | 55,0% | 68,0% | 81,7% | 8,4 | 3,6% | 26,9% | 13,6% | 27,1% | 0,6% | 11,6% | 70,4% | 0,0% | 0,0% | 3,9% | 1,9% | 10,2% | 0,0% |
| so:multifuncional | 12.375 | 0,1% | 56,0% | 66,6% | 75,4% | 9,2 | 3,6% | 39,5% | 9,3% | 30,8% | 0,6% | 9,7% | 0,0% | 14,0% | 0,0% | 0,0% | 3,1% | 9,4% | 0,0% |
| so:barra_fixa | 12.375 | 1,0% | 56,5% | 66,1% | 75,3% | 9,2 | 2,8% | 39,3% | 8,1% | 30,9% | 1,1% | 9,9% | 0,0% | 12,3% | 0,0% | 0,0% | 3,5% | 9,1% | 0,0% |
| halteres+bola | 12.375 | 1,0% | 57,1% | 69,1% | 82,2% | 8,4 | 3,9% | 27,4% | 13,1% | 26,1% | 0,4% | 11,4% | 91,8% | 1,4% | 0,0% | 64,3% | 1,7% | 10,8% | 0,0% |
| halteres | 12.375 | 2,0% | 57,3% | 69,1% | 82,4% | 8,4 | 3,8% | 27,1% | 13,0% | 25,9% | 0,4% | 11,2% | 91,7% | 3,3% | 0,0% | 64,3% | 1,5% | 10,8% | 0,0% |
| so:anilhas_e_manoplas | 12.375 | 1,0% | 57,3% | 69,1% | 82,4% | 8,4 | 3,8% | 27,1% | 13,0% | 25,9% | 0,4% | 11,2% | 91,7% | 3,3% | 0,0% | 64,3% | 1,5% | 10,8% | 0,0% |

## Os piores perfis

Os programas com mais cuidados em falta (10 pontos por cuidado com defeito, 1 por cuidado só com nota), um por cenário, dias e minutos, para não repetir o mesmo caso.

1. **so:halteres_fixos · intermediario · 2 dias · 30 min · foco peito · sem dor** (66 pontos)
   - Corpo todo A (43 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (33 min): flexao-pes-elevados 4+bi, afundo 2+bi, remada-curvada-halteres 2, flexao-joelho-deslizante 2
   - c02a: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 43 min em 30
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_lateral com 0 séries, com foco em peito
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c12a: goblet: uma carga só
   - c13a: Corpo todo A: remada-curvada-halteres → stiff
   - c15b: Corpo todo A: flexao + goblet
   - c16b: média de 3,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 6
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
   - c12a: rosca-alternada: uma carga só
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
3. **so:kettlebell · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (66 pontos)
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
   - c12a: rosca-kettlebell: uma carga só
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
4. **so:kettlebell · intermediario · 2 dias · 30 min · foco peito · sem dor** (65 pontos)
   - Corpo todo A (42 min): flexao 4+bi, goblet-kettlebell 2+bi, remada-unilateral-kettlebell 2, stiff-kettlebell 3, panturrilha-degrau 2 | Corpo todo B (35 min): flexao-pes-elevados 4+bi, afundo-kettlebell 3+bi, remada-unilateral-kettlebell 2, abdominal-chao 2
   - c03a: dia de 42 min em 30
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (2 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_posterior com 2 séries, com foco em peito
   - c08a: Corpo todo A: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c12a: goblet-kettlebell: uma carga só
   - c13a: Corpo todo A: remada-unilateral-kettlebell → stiff-kettlebell
   - c15b: Corpo todo A: flexao + goblet-kettlebell
   - c16b: média de 3,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
5. **so:halteres_fixos · intermediario · 3 dias · 30 min · foco superiores · punho 7** (58 pontos)
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
   - c09b: supino-chao-halteres em todos os dias, sem outro do mesmo nível
   - c12a: supino-chao-halteres: uma carga só
   - c13a: Corpo todo B: remada-unilateral-sem-banco → stiff
   - c15b: Corpo todo A: supino-chao-halteres + remada-curvada-halteres
   - c16b: média de 5,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
6. **so:paralelas · avancado · 4 dias · 30 min · foco inferiores · punho 7** (58 pontos)
   - Corpo todo A (41 min): agachamento-peso-corpo 4+bi, mergulho 2+bi, ponte-gluteo 2, flexao-joelho-deslizante 4, abdominal-chao 2 | Corpo todo B (30 min): mergulho 2, nordico 4+bi, panturrilha-degrau 4+bi, abertura-t-deitado 4 | Corpo todo C (35 min): afundo-peso-corpo 4+bi, mergulho 2+bi, ponte-gluteo 2, panturrilha-degrau 2 | Corpo todo D (39 min): afundo-tras-peso-corpo 4+bi, mergulho 2+bi, ponte-gluteo 2, flexao-joelho-deslizante 4
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 41 min em 30
   - c04b: abdomen com 2 séries
   - c04d: peito com 8 (faixa do avancado: 12 a 20)
   - c06b: panturrilha com 6, mediana dos outros 6
   - c06c: panturrilha com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c07c: quadriceps em Corpo todo C e Corpo todo D
   - c09b: mergulho em todos os dias, sem outro do mesmo nível
   - c11a: mergulho 6 a 12
   - c12a: mergulho: começa no último degrau
   - c15b: Corpo todo A: agachamento-peso-corpo + mergulho
   - c16b: média de 9,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
7. **academia · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (57 pontos)
   - Superior A (12 min): rosca-scott 3, triceps-barra-reta 3 | Inferior A (35 min): agachamento-barra 3, stiff 3, hip-thrust 2, cadeira-flexora 2+drop, abdominal-polia 2 | Superior B (12 min): rosca-maquina 3, triceps-corda 3 | Inferior B (41 min): afundo 4, hip-thrust 3, cadeira-flexora 3+drop+bi, cadeira-extensora 2+drop+bi, panturrilha-bilateral-step 2+drop
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior B com 14 séries em 30 min
   - c03a: dia de 41 min em 30
   - c03d: dia típico de 23.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 10 e o dia típico em 23.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 3, mediana dos outros 6
   - c06c: panturrilha com 3, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: abdominal-polia, e não abdominal-maquina
   - c13a: Inferior A: agachamento-barra → stiff
   - c14b: Superior A com 2 exercícios
   - c16b: média de 7,5 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
8. **academia+ · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (57 pontos)
   - Superior A (12 min): rosca-scott 3, triceps-barra-reta 3 | Inferior A (35 min): agachamento-barra 3, stiff 3, hip-thrust 2, cadeira-flexora 2+drop, abdominal-polia 2 | Superior B (12 min): rosca-maquina 3, triceps-corda 3 | Inferior B (41 min): afundo 4, hip-thrust 3, cadeira-flexora 3+drop+bi, cadeira-extensora 2+drop+bi, panturrilha-bilateral-step 2+drop
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior B com 14 séries em 30 min
   - c03a: dia de 41 min em 30
   - c03d: dia típico de 23.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 10 e o dia típico em 23.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 3, mediana dos outros 6
   - c06c: panturrilha com 3, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: abdominal-polia, e não abdominal-maquina
   - c13a: Inferior A: agachamento-barra → stiff
   - c14b: Superior A com 2 exercícios
   - c16b: média de 7,5 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
9. **so:halteres_fixos · intermediario · 5 dias · 30 min · foco inferiores · tornozelo 7** (57 pontos)
   - Superior (24 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, triceps-frances-halter 2 | Inferior (30 min): goblet 2, stiff 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Empurrar (28 min): flexao-pes-elevados 2, supino-chao-halteres 2, elevacao-halteres 4, triceps-frances-unilateral-halter 2 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (34 min): afundo 3, stiff 3, ponte-gluteo-halter 2, nordico 3
   - c02c: Inferior: 5 exercícios, todos com 2 séries
   - c03a: dia de 34 min em 30
   - c04b: abdomen com 2 séries
   - c04d: peito com 6 (faixa do intermediario: 10 a 16)
   - c06b: quadriceps com 5, mediana dos outros 6
   - c06c: quadriceps com 5, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior: goblet, e não agachamento-halteres
   - c10a: Empurrar: duas vezes empurrar horizontal
   - c12a: remada-curvada-halteres: uma carga só
   - c13a: Superior: remada-curvada-halteres → remada-unilateral-sem-banco
   - c16b: média de 6,9 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
10. **so:paralelas · avancado · 5 dias · 30 min · foco inferiores · sem dor** (57 pontos)
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
   - c11a: mergulho 6 a 12
   - c12a: mergulho: começa no último degrau
   - c15b: Corpo todo A: agachamento-peso-corpo + flexao
   - c16b: média de 9,5 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
11. **so:kettlebell · intermediario · 3 dias · 30 min · foco superiores · sem dor** (57 pontos)
   - Corpo todo A (34 min): flexao 2+bi, remada-unilateral-kettlebell 4+bi, goblet-kettlebell 2, abdominal-chao 2 | Corpo todo B (48 min): flexao-pes-elevados 4+bi, remada-unilateral-kettlebell 4+bi, stiff-kettlebell 3, rosca-kettlebell 4+bi, panturrilha-degrau 2+bi | Corpo todo C (37 min): flexao 4+bi, remada-unilateral-kettlebell 4+bi, afundo-kettlebell 2, ponte-kettlebell 2
   - c02b: Corpo todo B com 17 séries em 30 min
   - c03a: dia de 48 min em 30
   - c04b: posteriores com 3 séries
   - c04d: ombro_posterior com 6 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (6 séries indiretas)
   - c06d: posteriores com 3 séries, com foco em peito, costas, ombros, bracos
   - c08a: Corpo todo B: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c09b: remada-unilateral-kettlebell em todos os dias, sem outro do mesmo nível
   - c12a: remada-unilateral-kettlebell: uma carga só
   - c13a: Corpo todo B: remada-unilateral-kettlebell → stiff-kettlebell
   - c15b: Corpo todo A: flexao + remada-unilateral-kettlebell
   - c16b: média de 6,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
12. **so:kettlebell · avancado · 6 dias · 30 min · foco bracos · sem dor** (57 pontos)
   - Empurrar A (29 min): flexao-fechada 3, flexao 2, desenvolvimento-unilateral-kettlebell 2, triceps-frances-kettlebell 3 | Puxar A (29 min): remada-unilateral-kettlebell 2, rosca-kettlebell 4, abdominal-chao 4 | Pernas A (30 min): goblet-kettlebell 3, stiff-kettlebell 2, flexao-joelho-deslizante 3, panturrilha-degrau 3 | Empurrar B (30 min): flexao-fechada 2, flexao-pes-elevados 2, triceps-frances-kettlebell 3, rosca-kettlebell 4 | Puxar B (26 min): remada-unilateral-kettlebell 4, rosca-kettlebell 4 | Pernas B (30 min): afundo-kettlebell 3, stiff-kettlebell 2, ponte-kettlebell 2, panturrilha-degrau 2
   - c01c: Empurrar B: flexao-pes-elevados depois de flexao-fechada
   - c02a: Puxar B com 2 exercícios em 30 min (faixa 3 a 5)
   - c04b: ombro_posterior com 3 séries
   - c04d: peito com 9 (faixa do avancado: 12 a 20)
   - c04f: ombro_posterior sem exercício direto (3 séries indiretas)
   - c05a: empurrar 11 ÷ puxar 6 séries
   - c05c: ombro da frente 6,5 ÷ de trás 3
   - c06d: ombro_posterior com 3 séries, com foco em bracos
   - c07c: biceps em Empurrar B e Puxar B
   - c08a: Pernas A: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c12a: desenvolvimento-unilateral-kettlebell: uma carga só
   - c14b: Puxar B com 2 exercícios
   - c16b: média de 8,2 séries por músculo (faixa do avancado: a partir de 12)
13. **casa · iniciante · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior A (28 min): goblet 2, stiff 3, ponte-gluteo-halter 2, abdominal-chao 2 | Superior B (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior B (35 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, panturrilha-degrau 2
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
   - c08a: Inferior A: goblet, e não agachamento-halteres
   - c14b: Superior A com 2 exercícios
   - c15a: Inferior B: flexao-joelho-elastico em bi-set
   - c20a: o texto diz 4 e há dia com 5
14. **casa · iniciante · 5 dias · 30 min · foco inferiores · sem dor** (56 pontos)
   - Superior (29 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, triceps-frances-halter 3 | Inferior (28 min): goblet 2, stiff 3, ponte-gluteo-halter 2, abdominal-chao 2 | Empurrar (20 min): elevacao-halteres 4, triceps-frances-halter 2, crucifixo-elastico 3 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (34 min): afundo 2, stiff 3, ponte-gluteo-halter 2, extensao-joelho-elastico 2+bi, panturrilha-degrau 2+bi
   - c03a: dia de 34 min em 30
   - c04b: panturrilha com 2 séries
   - c04d: ombro_lateral com 4 (faixa do iniciante: 6 a 10)
   - c06b: quadriceps com 6, mediana dos outros 6
   - c06c: quadriceps com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Superior: triceps-frances-halter, e não triceps-frances-unilateral-halter
   - c13a: Superior: remada-curvada-halteres → remada-unilateral-sem-banco
   - c14b: Empurrar sem multiarticular
   - c15a: Pernas: extensao-joelho-elastico em bi-set
   - c16a: 15 exercícios diferentes na semana
   - c20a: o texto diz 4 e há dia com 5
15. **casa · avancado · 6 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
   - c14b: Superior A com 2 exercícios
   - c16b: média de 8,4 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
16. **casa+ · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior A (35 min): goblet 2, stiff 3, ponte-gluteo-halter 2, flexao-bola 3, abdominal-chao 2 | Superior B (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior B (44 min): afundo 4, ponte-kettlebell 2, flexao-joelho-elastico 4+bi, extensao-joelho-caneleira 3+drop+bi, panturrilha-bilateral-step 2+drop
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02b: Inferior B com 15 séries em 30 min
   - c03a: dia de 44 min em 30
   - c03d: dia típico de 24.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 10 e o dia típico em 24.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 3, mediana dos outros 6
   - c06c: panturrilha com 3, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: ponte-gluteo-halter, e não coice-caneleira
   - c14b: Superior A com 2 exercícios
   - c16b: média de 7,5 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
17. **elasticos · intermediario · 2 dias · 30 min · foco peito · joelho 7** (56 pontos)
   - Corpo todo A (42 min): flexao 4+bi, remada-elastico 2+bi, stiff-elastico 2, elevacao-lateral-elastico 4+bi, panturrilha-degrau 2+bi | Corpo todo B (32 min): flexao-pes-elevados 4+bi, remada-curvada-elastico 2+bi, stiff-elastico 2, abdominal-chao 2
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 42 min em 30
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (2 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_posterior com 2 séries, com foco em peito
   - c08a: Corpo todo A: remada-elastico, e não remada-unilateral-elastico
   - c13a: Corpo todo B: remada-curvada-elastico → stiff-elastico
   - c15b: Corpo todo A: flexao + remada-elastico
   - c16b: média de 3,6 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
18. **halteres · intermediario · 2 dias · 30 min · foco peito · sem dor** (56 pontos)
   - Corpo todo A (43 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (33 min): flexao-pes-elevados 4+bi, afundo 2+bi, remada-curvada-halteres 2, flexao-joelho-deslizante 2
   - c02a: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 43 min em 30
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_lateral com 0 séries, com foco em peito
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c13a: Corpo todo A: remada-curvada-halteres → stiff
   - c15b: Corpo todo A: flexao + goblet
   - c16b: média de 3,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 6
19. **halteres · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
20. **halteres-banco · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
21. **bruno · intermediario · 6 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
   - Superior A (9 min): rosca-scott-banco-inclinado 2, triceps-barra-reta 2 | Inferior A (29 min): goblet 2, stiff 2, hip-thrust 2, flexao-bola 2, abdominal-polia 2 | Superior B (9 min): rosca-scott-banco-inclinado 2, triceps-corda 2 | Inferior B (35 min): afundo 2, hip-thrust 2, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, panturrilha-bilateral-step 2+drop | Superior C (9 min): rosca-scott-banco-inclinado 2, triceps-corda 2 | Inferior C (28 min): bulgaro 2, hip-thrust 2, flexao-bola 3, extensao-joelho-elastico 2
   - c02a: Superior A com 2 exercícios em 30 min (faixa 3 a 5)
   - c02c: Inferior A: 5 exercícios, todos com 2 séries
   - c03a: dia de 35 min em 30
   - c03c: dia típico de 18.5 min em 30
   - c03d: dia típico de 18.5 min em 30
   - c04b: panturrilha com 3 séries
   - c04c: biceps com 6 de 10 e o dia típico em 18.5 de 30 min
   - c04d: biceps com 6 (faixa do intermediario: 10 a 16)
   - c06b: panturrilha com 3, mediana dos outros 6
   - c06c: panturrilha com 3, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c08a: Inferior A: goblet, e não agachamento-halteres
   - c14b: Superior A com 2 exercícios
   - c16b: média de 7,9 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
22. **so:estacao_polia_dupla · avancado · 5 dias · 30 min · foco inferiores · sem dor** (56 pontos)
   - Superior (28 min): flexao 2+bi, puxada-unilateral 2+bi, remada-unilateral-polia 2, triceps-frances-polia-unilateral 3 | Inferior (37 min): agachamento-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, nordico 4, abdominal-chao 2 | Empurrar (26 min): crucifixo-polia 2, elevacao-lateral 4, triceps-frances-polia-unilateral 2, crucifixo-polia-baixo 2 | Puxar (26 min): remada-unilateral-polia 2, puxada-unilateral 2, crucifixo-invertido-polia 2, rosca-polia-costas 2 | Pernas (40 min): afundo-peso-corpo 4, ponte-gluteo 3, flexao-joelho-deslizante 4+bi, panturrilha-degrau 2+bi
   - c02b: Inferior com 14 séries em 30 min
   - c03a: dia de 40 min em 30
   - c04b: panturrilha com 2 séries
   - c04d: peito com 6 (faixa do avancado: 12 a 20)
   - c06b: quadriceps com 6, mediana dos outros 6
   - c06c: quadriceps com 6, mediana dos outros 6
   - c06d: abdomen com 2 séries, com foco em pernas, gluteos
   - c10a: Inferior: duas vezes flexão de joelho
   - c14b: Empurrar sem multiarticular
   - c15b: Superior: flexao + puxada-unilateral
   - c16b: média de 6,8 séries por músculo (faixa do avancado: a partir de 12)
   - c20a: o texto diz 4 e há dia com 5
23. **so:halteres_fixos · intermediario · 2 dias · 45 min · foco inferiores · sem dor** (56 pontos)
   - Corpo todo A (42 min): goblet 2+bi, flexao 2+bi, stiff 2, remada-curvada-halteres 2, panturrilha-degrau 2+bi, triceps-frances-halter 2+bi, abdominal-chao 4 | Corpo todo B (53 min): afundo 4+bi, flexao-pes-elevados 2+bi, ponte-gluteo-halter 4+bi, remada-curvada-halteres 2+bi, flexao-joelho-deslizante 4+bi, rosca-alternada 2+bi
   - c03a: dia de 53 min em 45
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 4 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: ombro_lateral com 0 séries, com foco em pernas, gluteos
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c12a: goblet: uma carga só
   - c13a: Corpo todo A: stiff → remada-curvada-halteres
   - c15b: Corpo todo A: goblet + flexao
   - c16b: média de 4,2 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 6 e há dia com 7
24. **so:anilhas_e_manoplas · intermediario · 2 dias · 30 min · foco peito · sem dor** (56 pontos)
   - Corpo todo A (43 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (33 min): flexao-pes-elevados 4+bi, afundo 2+bi, remada-curvada-halteres 2, flexao-joelho-deslizante 2
   - c02a: Corpo todo A com 6 exercícios em 30 min (faixa 3 a 5)
   - c02b: Corpo todo A com 14 séries em 30 min
   - c03a: dia de 43 min em 30
   - c04a: ombro_lateral sem nenhuma série
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 8 (faixa do intermediario: 10 a 16)
   - c04f: ombro_lateral sem exercício direto (0 séries indiretas)
   - c05a: empurrar 8 ÷ puxar 4 séries
   - c06d: ombro_lateral com 0 séries, com foco em peito
   - c08a: Corpo todo A: goblet, e não agachamento-halteres
   - c13a: Corpo todo A: remada-curvada-halteres → stiff
   - c15b: Corpo todo A: flexao + goblet
   - c16b: média de 3,4 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 6
25. **so:anilhas_e_manoplas · intermediario · 4 dias · 30 min · foco inferiores · ombro 7** (56 pontos)
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
   - c14b: Superior A com 1 exercício
   - c16b: média de 6,8 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 4 e há dia com 5
26. **so:kettlebell · intermediario · 2 dias · 45 min · foco inferiores · sem dor** (56 pontos)
   - Corpo todo A (44 min): goblet-kettlebell 2+bi, flexao 2+bi, stiff-kettlebell 2, remada-unilateral-kettlebell 2, panturrilha-degrau 2+bi, triceps-frances-kettlebell 2+bi, abdominal-chao 4 | Corpo todo B (59 min): afundo-kettlebell 4+bi, flexao-pes-elevados 2+bi, ponte-kettlebell 4+bi, remada-unilateral-kettlebell 2+bi, flexao-joelho-deslizante 4+bi, rosca-kettlebell 2+bi
   - c03a: dia de 59 min em 45
   - c04b: ombro_posterior com 2 séries
   - c04d: peito com 4 (faixa do intermediario: 10 a 16)
   - c04f: ombro_posterior sem exercício direto (2 séries indiretas)
   - c06b: panturrilha com 2, mediana dos outros 4
   - c06c: panturrilha com 2, mediana dos outros 4
   - c06d: ombro_posterior com 2 séries, com foco em pernas, gluteos
   - c08a: Corpo todo A: stiff-kettlebell, e não stiff-unilateral-kettlebell
   - c12a: goblet-kettlebell: uma carga só
   - c13a: Corpo todo A: stiff-kettlebell → remada-unilateral-kettlebell
   - c15b: Corpo todo A: goblet-kettlebell + flexao
   - c16b: média de 4,7 séries por músculo (faixa do intermediario: a partir de 10)
   - c20a: o texto diz 6 e há dia com 7

## Exemplos

O 1º programa da população com cada medida em falta (sem dor; quando só aparece com dor, com dor).

- `c01c` **o multiarticular mais técnico (complexidade 3) não é o 1º da sua região**: casa · intermediario · 2 dias · 30 min · foco costas · sem dor: Corpo todo B: flexao-pes-elevados depois de remada-curvada-halteres
  - Corpo todo A (38 min): remada-curvada-halteres 4+bi, goblet 2+bi, flexao 2+bi, stiff 3+bi, panturrilha-degrau 2 | Corpo todo B (34 min): remada-curvada-halteres 4+bi, afundo 3+bi, flexao-pes-elevados 2, abdominal-chao 2
- `c02a` **exercícios por dia fora da faixa dos minutos (A1)**: casa · iniciante · 2 dias · 90 min · foco bracos · sem dor: Corpo todo A com 11 exercícios em 90 min (faixa 5 a 10)
  - Corpo todo A (88 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, rosca-alternada 4, triceps-testa-halteres 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (70 min): afundo 3, flexao 2, remada-curvada-halteres 3, rosca-alternada 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-chao 2
- `c02b` **séries demais para os minutos (acima de 0,45 por minuto)**: casa · iniciante · 2 dias · 30 min · foco pernas · sem dor: Corpo todo B com 14 séries em 30 min
  - Corpo todo A (30 min): goblet 2+bi, flexao 2+bi, stiff 2, remada-curvada-halteres 2, panturrilha-degrau 2 | Corpo todo B (44 min): afundo 4+bi, flexao 2+bi, remada-curvada-halteres 2, flexao-joelho-elastico 4, abdominal-chao 2
- `c02c` **dia de 5 exercícios ou mais com 2 séries em todos**: casa · iniciante · 2 dias · 30 min · foco pernas · sem dor: Corpo todo A: 5 exercícios, todos com 2 séries
  - Corpo todo A (30 min): goblet 2+bi, flexao 2+bi, stiff 2, remada-curvada-halteres 2, panturrilha-degrau 2 | Corpo todo B (44 min): afundo 4+bi, flexao 2+bi, remada-curvada-halteres 2, flexao-joelho-elastico 4, abdominal-chao 2
- `c03a` **dia mais longo acima de 110% dos minutos (A3)**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: dia de 41 min em 30
  - Corpo todo A (41 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (34 min): flexao 4+bi, afundo 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c03c` **dia típico abaixo de 70% dos minutos (com ou sem aviso)**: casa · iniciante · 3 dias · 90 min · foco nenhum · sem dor: dia típico de 60 min em 90
  - Corpo todo A (54 min): goblet 3, flexao 2, remada-curvada-halteres 3, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (60 min): stiff 3, flexao 2, remada-curvada-halteres 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-chao 2 | Corpo todo C (63 min): afundo 3, supino-chao-halteres 2, remada-unilateral-sem-banco 3, ponte-gluteo-halter 3, elevacao-halteres 3, triceps-testa-halteres 2, flexao-joelho-elastico 2, abdominal-invertido 2
- `c03d` **dia típico abaixo de 85% dos minutos**: casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: dia típico de 74 min em 90
  - Corpo todo A (75 min): goblet 3, flexao 3, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (73 min): afundo 3, flexao 3, remada-curvada-halteres 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-chao 2
- `c04a` **músculo esquecido: nenhuma série na semana, nem indireta, havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_lateral sem nenhuma série
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c04b` **músculo com séries soltas: mais de 0 e menos de 4 na semana, havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_posterior com 2 séries
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c04f` **músculo sem exercício direto (só séries indiretas) havendo exercício possível**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: ombro_lateral sem exercício direto (0 séries indiretas)
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c04c` **músculo abaixo da faixa do nível com tempo sobrando (dia típico abaixo de 85%)**: casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: gluteos com 4,5 de 6 e o dia típico em 74 de 90 min
  - Corpo todo A (75 min): goblet 3, flexao 3, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (73 min): afundo 3, flexao 3, remada-curvada-halteres 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-chao 2
- `c04d` **algum músculo abaixo da faixa do nível (havendo exercício)**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: peito com 5 (faixa do iniciante: 6 a 10)
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c04e` **algum músculo acima da faixa do nível**: casa · iniciante · 2 dias · 75 min · foco gluteos · sem dor: gluteos com 10,5 (faixa do iniciante: 6 a 10)
  - Corpo todo A (72 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 4, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): ponte-gluteo-halter 4+bi, flexao 2+bi, afundo 2+bi, remada-curvada-halteres 3+bi, abducao-elastico 3+bi, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, rosca-alternada 3+bi, crucifixo-invertido-sentado 2+drop, abdominal-chao 2
- `c05a` **empurrar ÷ puxar acima de 1,5 havendo como puxar (D1)**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: empurrar 8 ÷ puxar 4 séries
  - Corpo todo A (41 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (34 min): flexao 4+bi, afundo 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c05b` **quadríceps ÷ posteriores fora de 0,5 a 2 (D3)**: casa · iniciante · 2 dias · 30 min · foco nenhum · quadril 7: quadríceps 0 ÷ posteriores 3
  - Corpo todo A (29 min): flexao 3+bi, remada-curvada-halteres 3+bi, elevacao-halteres 4+bi, panturrilha-degrau 2+bi | Corpo todo B (27 min): flexao 3+bi, remada-curvada-halteres 3+bi, flexao-joelho-elastico 3, abdominal-chao 2
- `c05c` **ombro da frente ÷ ombro de trás acima de 2 havendo exercício de ombro de trás**: bruno · avancado · 3 dias · 45 min · foco peito · sem dor: ombro da frente 7 ÷ de trás 3
  - Corpo todo A (44 min): supino-reto 4, goblet 2, puxada-barra-reta 2, crucifixo-polia 4+bi, flexao-bola 3+bi, triceps-frances 2 | Corpo todo B (45 min): supino-inclinado 3+bi, stiff 3+bi, remada-apoiada 2, extensao-joelho-elastico 2+bi, rosca-inclinada 3+bi, panturrilha-bilateral-step 4 | Corpo todo C (45 min): supino-reto 3+bi, afundo 2+bi, puxada-barra-reta 2+bi, hip-thrust 2+bi, elevacao-halteres 4, abdominal-polia 3+drop
- `c06a` **foco abaixo da meta com tempo e exercício (C1)**: casa+ · avancado · 2 dias · 90 min · foco peito · sem dor: peito com 12 de 14 e o dia mais longo em 76 de 90 min
  - Corpo todo A (76 min): supino-reto 4, goblet 2, barra-fixa 3, stiff 3, crucifixo-halteres 4, triceps-frances-halter 2, elevacao-halteres 3, panturrilha 4, abdominal-chao 2 | Corpo todo B (69 min): supino-inclinado 4, afundo 2, remada-apoiada 3, flexao-bola 3, extensao-joelho-caneleira 2, rosca-inclinada 3, crucifixo-inverso 3, elevacao-halteres 3, abdominal-bola 2
- `c06b` **o foco não passa da mediana dos outros (C2)**: casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 2,75
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c06c` **o foco fica a menos de 1,3 vez a mediana dos outros**: casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 2,8
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c06d` **com foco, outro músculo com menos de 4 séries havendo exercício**: casa · iniciante · 2 dias · 30 min · foco peito · sem dor: ombro_lateral com 0 séries, com foco em peito
  - Corpo todo A (41 min): flexao 4+bi, goblet 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (34 min): flexao 4+bi, afundo 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c07a` **músculo com 8 séries diretas ou mais treinado num dia só**: casa · iniciante · 2 dias · 75 min · foco pernas · sem dor: panturrilha com 8 séries diretas num dia só
  - Corpo todo A (73 min): goblet 4+bi, flexao 2+bi, stiff 4, remada-curvada-halteres 3, panturrilha-degrau 4+bi, triceps-frances-halter 3+drop+bi, panturrilha-sentada-halter 3+drop+bi, elevacao-halteres 2+drop+bi, abdominal-chao 2 | Corpo todo B (73 min): afundo 3+bi, flexao 2+bi, remada-curvada-halteres 3, flexao-joelho-elastico 4+bi, extensao-joelho-elastico 3+bi, rosca-alternada 3+bi, crucifixo-invertido-sentado 3+bi, elevacao-halteres 2+drop+bi, aducao-deitado 2+bi, abdominal-chao 2
- `c07c` **o mesmo músculo com 3 séries diretas ou mais em dias seguidos**: casa · iniciante · 4 dias · 45 min · foco ombros · sem dor: ombro_lateral em Superior B e Inferior B
  - Superior A (40 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 3, triceps-frances-halter 2, crucifixo-invertido-sentado 2 | Inferior A (43 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 4 | Superior B (43 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, desenvolvimento-unilateral 2, elevacao-halteres 3, crucifixo-invertido-sentado 2 | Inferior B (45 min): afundo 2, ponte-gluteo-halter 3, elevacao-halteres 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3
- `c08a` **exercício escolhido por ter animação, com um equivalente sem uso no programa**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet, e não agachamento-halteres
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c09b` **o mesmo exercício em todos os dias sem opção do mesmo nível (B2)**: elasticos · avancado · 3 dias · 75 min · foco superiores · sem dor: puxada-elastico em todos os dias, sem outro do mesmo nível
  - Corpo todo A (75 min): flexao 3, puxada-elastico 4, agachamento-elastico 2, triceps-elastico-acima 4, elevacao-lateral-elastico 4, crucifixo-elastico 3, rosca-elastico 3, flexao-joelho-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): flexao-pes-elevados 2, remada-elastico 4, puxada-elastico 2, stiff-elastico 2, desenvolvimento-elastico 2, rosca-martelo-elastico 3, extensao-joelho-elastico 2, panturrilha-degrau 4, face-pull-elastico 2, abdominal-invertido 2 | Corpo todo C (75 min): flexao 2, puxada-elastico 4, flexao-fechada 4, afundo-peso-corpo 2, ponte-gluteo 3, elevacao-lateral-elastico 4, rosca-elastico 2, flexao-joelho-elastico 2, abdominal-chao 2
- `c10a` **dois exercícios da mesma função no mesmo dia**: casa · iniciante · 2 dias · 90 min · foco ombros · sem dor: Corpo todo A: duas vezes elevação lateral
  - Corpo todo A (80 min): goblet 3, flexao 2, remada-curvada-halteres 3, stiff 3, elevacao-halteres 4, elevacao-lateral-unilateral 2, triceps-frances-halter 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (77 min): afundo 2, flexao 2, remada-curvada-halteres 3, desenvolvimento-unilateral 2, elevacao-halteres 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, abdominal-chao 2
- `c10b` **três exercícios ou mais do mesmo músculo no mesmo dia**: casa+ · iniciante · 5 dias · 30 min · foco peito · sem dor: Empurrar: 3 exercícios de peito
  - Superior (25 min): supino-reto 3, barra-fixa-negativa 2, remada-apoiada 2, triceps-frances-halter 2 | Inferior (30 min): goblet 2, stiff 2, panturrilha 2, abdominal-chao 4 | Empurrar (23 min): supino-inclinado 3, supino-reto 2, crucifixo-halteres 2, triceps-frances-halter 2 | Puxar (20 min): remada-apoiada 2, barra-fixa-negativa 2, crucifixo-inverso 2, rosca-inclinada 2 | Pernas (25 min): afundo 2, ponte-gluteo-halter 2, extensao-joelho-caneleira 2, flexao-bola 2
- `c11a` **peso do corpo com faixa que termina em 15 ou menos, para intermediário ou avançado**: bairro · avancado · 2 dias · 90 min · foco bracos · sem dor: mergulho 6 a 12
  - Corpo todo A (89 min): mergulho 4, leg-press 3, supino-reto 2, barra-fixa 3, stiff 3, triceps-frances-halter 4, rosca-inclinada 4, elevacao-halteres 3, panturrilha-leg-press 4, crucifixo-halteres 2, abdominal-chao 2 | Corpo todo B (89 min): afundo 2, supino-inclinado 2, remada-apoiada 3, rosca-scott-banco-inclinado 4, rosca-inclinada 4, triceps-frances-unilateral-halter 4, cadeira-flexora 3, cadeira-extensora 2, crucifixo-inverso 3, elevacao-halteres 3, abdominal-invertido 2
- `c12a` **exercício sem próximo passo de carga (uma carga só, ou já no último degrau)**: bairro · avancado · 2 dias · 90 min · foco bracos · sem dor: mergulho: começa no último degrau
  - Corpo todo A (89 min): mergulho 4, leg-press 3, supino-reto 2, barra-fixa 3, stiff 3, triceps-frances-halter 4, rosca-inclinada 4, elevacao-halteres 3, panturrilha-leg-press 4, crucifixo-halteres 2, abdominal-chao 2 | Corpo todo B (89 min): afundo 2, supino-inclinado 2, remada-apoiada 3, rosca-scott-banco-inclinado 4, rosca-inclinada 4, triceps-frances-unilateral-halter 4, cadeira-flexora 3, cadeira-extensora 2, crucifixo-inverso 3, elevacao-halteres 3, abdominal-invertido 2
- `c13a` **dois exercícios seguidos que carregam a lombar sem apoio**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: remada-curvada-halteres → stiff
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c13b` **três exercícios ou mais no dia que carregam a lombar sem apoio**: casa · iniciante · 2 dias · 90 min · foco costas · sem dor: Corpo todo A: remada-curvada-halteres, remada-unilateral-sem-banco, stiff
  - Corpo todo A (79 min): remada-curvada-halteres 4, remada-unilateral-sem-banco 2, goblet 2, flexao 2, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (68 min): remada-curvada-halteres 4, afundo 3, flexao 2, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 2, crucifixo-invertido-sentado 2, elevacao-halteres 3, abdominal-chao 2
- `c13c` **três exercícios seguidos que dependem da pegada**: academia · avancado · 3 dias · 75 min · foco superiores · sem dor: Corpo todo B: remada-apoiada → puxada-frente → stiff
  - Corpo todo A (75 min): supino-reto 4, puxada-frente 4, agachamento-barra 2, triceps-frances 4, elevacao-halteres 4, crucifixo-polia 4, rosca-inclinada 3, cadeira-flexora 2, abdominal-polia 2 | Corpo todo B (74 min): supino-inclinado 3, remada-apoiada 4, puxada-frente 2, stiff 2, desenvolvimento 2, rosca-scott 3, cadeira-extensora 2, panturrilha 4, face-pull 2, abdominal-maquina 2 | Corpo todo C (74 min): supino-barra 3, puxada-barra-reta 4, afundo 2, hip-thrust 3, elevacao-halteres 4, triceps-corda 4, rosca-maquina 3, cadeira-flexora 2, abdominal-polia 2
- `c14b` **dia com menos de 3 exercícios ou sem multiarticular (A2)**: casa · iniciante · 5 dias · 30 min · foco nenhum · sem dor: Empurrar sem multiarticular
  - Superior (30 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 3 | Inferior (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Empurrar (22 min): elevacao-halteres 3, triceps-frances-halter 4, crucifixo-elastico 3 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (30 min): afundo 2, ponte-gluteo-halter 3, extensao-joelho-elastico 2, flexao-joelho-elastico 2
- `c15a` **iniciante com bi-set ou drop set**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet em bi-set
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c15b` **bi-set entre dois multiarticulares**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A: goblet + flexao
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c15c` **bi-set em que os dois carregam a lombar ou dependem da pegada**: casa · iniciante · 2 dias · 45 min · foco nenhum · sem dor: Corpo todo A: remada-curvada-halteres + stiff
  - Corpo todo A (47 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2+bi, stiff 2+bi, triceps-frances-halter 2+drop+bi, panturrilha-degrau 4+bi, abdominal-chao 4 | Corpo todo B (42 min): afundo 2+bi, flexao 3+bi, remada-curvada-halteres 3, flexao-joelho-elastico 2+bi, extensao-joelho-elastico 2+bi, rosca-alternada 2+drop
- `c16a` **iniciante com mais de 12 exercícios diferentes na semana**: casa · iniciante · 2 dias · 60 min · foco nenhum · sem dor: 13 exercícios diferentes na semana
  - Corpo todo A (59 min): goblet 2+bi, flexao 3+bi, remada-curvada-halteres 3, stiff 2, triceps-frances-halter 2+drop+bi, elevacao-halteres 3+drop+bi, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (58 min): afundo 2, flexao 3, remada-curvada-halteres 3, flexao-joelho-elastico 3+bi, extensao-joelho-elastico 2+bi, rosca-alternada 3+bi, crucifixo-invertido-sentado 3+bi, abdominal-chao 2
- `c16b` **intermediário ou avançado com a média dos músculos abaixo da faixa do nível**: casa · intermediario · 2 dias · 30 min · foco nenhum · sem dor: média de 3 séries por músculo (faixa do intermediario: a partir de 10)
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao-pes-elevados 3+bi, remada-curvada-halteres 2, abdominal-chao 2
- `c20a` **o texto "cabem cerca de N exercícios" com um dia acima de N**: casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: o texto diz 4 e há dia com 5
  - Corpo todo A (33 min): goblet 2+bi, flexao 2+bi, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3+bi, flexao 3+bi, remada-curvada-halteres 2, abdominal-chao 2

## Uso de cada exercício

Em quantos programas o exercício aparece (grade e ponderada); os sem animação aprovada aparecem como cartão de texto.

| exercício | animação | grade | ponderada |
| --- | --- | ---: | ---: |
| afundo | sim | 22,1% | 78,9% |
| stiff | sim | 22,1% | 78,6% |
| supino-reto | sim | 14,2% | 69,2% |
| supino-inclinado | sim | 11,0% | 66,2% |
| rosca-inclinada | sim | 8,7% | 57,4% |
| abdominal-chao | sim | 87,5% | 55,7% |
| elevacao-halteres | sim | 19,2% | 53,3% |
| remada-apoiada | sim | 9,4% | 52,5% |
| puxada-frente | **cartão** | 9,3% | 50,4% |
| cadeira-flexora | **cartão** | 8,1% | 50,4% |
| cadeira-extensora | **cartão** | 7,9% | 50,2% |
| hip-thrust | **cartão** | 5,7% | 44,6% |
| triceps-frances-halter | sim | 17,0% | 40,6% |
| triceps-frances | sim | 4,3% | 38,9% |
| panturrilha-degrau | sim | 76,4% | 36,4% |
| abdominal-maquina | **cartão** | 4,5% | 32,7% |
| goblet | sim | 17,3% | 32,1% |
| ponte-gluteo-halter | sim | 15,4% | 30,4% |
| flexao | sim | 67,5% | 29,1% |
| crucifixo-inverso | **cartão** | 6,6% | 28,2% |
| leg-press | **cartão** | 4,6% | 26,9% |
| abdominal-polia | sim | 3,7% | 26,6% |
| triceps-corda | sim | 3,0% | 26,4% |
| remada-baixa | sim | 3,3% | 25,7% |
| panturrilha-bilateral-step | sim | 7,2% | 25,6% |
| panturrilha | sim | 7,7% | 25,4% |
| abdominal-invertido | sim | 51,1% | 24,0% |
| voador | **cartão** | 4,2% | 20,6% |
| flexao-joelho-deslizante | sim | 68,9% | 20,5% |
| puxada-barra-reta | **cartão** | 2,5% | 20,5% |
| agachamento-barra | **cartão** | 1,8% | 20,1% |
| panturrilha-em-pe-maquina | **cartão** | 3,0% | 20,0% |
| face-pull | sim | 2,8% | 18,5% |
| afundo-peso-corpo | sim | 63,0% | 18,0% |
| ponte-gluteo | sim | 62,3% | 17,7% |
| elevacao-lateral | sim | 3,2% | 17,4% |
| triceps-testa-halteres | **cartão** | 8,4% | 16,8% |
| crucifixo-halteres | **cartão** | 7,7% | 16,4% |
| stiff-unilateral | sim | 6,7% | 16,3% |
| crucifixo-polia | sim | 3,8% | 15,3% |
| flexao-pes-elevados | sim | 43,2% | 15,2% |
| flexao-bola | sim | 8,3% | 14,2% |
| rosca-scott | **cartão** | 1,5% | 13,2% |
| agachamento-peso-corpo | sim | 50,9% | 12,7% |
| remada-curvada-halteres | sim | 10,1% | 12,7% |
| abertura-t-deitado | sim | 54,1% | 12,7% |
| flexao-fechada | sim | 38,2% | 12,6% |
| supino-barra | **cartão** | 1,0% | 12,5% |
| flexao-joelho-elastico | sim | 9,8% | 12,5% |
| rosca-alternada | sim | 11,0% | 12,3% |
| extensao-triceps-peso-corpo | sim | 48,3% | 12,2% |
| extensao-joelho-elastico | sim | 9,5% | 12,1% |
| crucifixo-invertido-sentado | **cartão** | 10,4% | 11,1% |
| nordico | sim | 41,5% | 9,9% |
| remada-unilateral-sem-banco | sim | 7,3% | 9,4% |
| remada-unilateral-halter | sim | 4,7% | 9,2% |
| rosca-scott-banco-inclinado | **cartão** | 3,8% | 9,1% |
| crucifixo-invertido-polia | sim | 2,9% | 9,0% |
| desenvolvimento | sim | 3,4% | 8,8% |
| abdominal-bola | sim | 5,2% | 8,4% |
| barra-fixa | sim | 4,4% | 8,1% |
| panturrilha-leg-press | **cartão** | 3,4% | 8,1% |
| barra-fixa-supinada | sim | 3,6% | 7,3% |
| barra-fixa-negativa | **cartão** | 2,9% | 7,1% |
| voador-invertido | **cartão** | 0,5% | 7,0% |
| aducao-deitado | sim | 24,0% | 6,6% |
| crucifixo-elastico | sim | 6,2% | 6,4% |
| abducao-maquina | **cartão** | 1,4% | 5,9% |
| abducao-deitado | sim | 23,0% | 5,8% |
| afundo-tras-peso-corpo | sim | 26,0% | 5,6% |
| crucifixo-invertido-curvado | **cartão** | 2,2% | 4,9% |
| agachamento-elastico | sim | 6,3% | 4,9% |
| stiff-elastico | sim | 6,3% | 4,9% |
| extensao-joelho-caneleira | sim | 3,3% | 4,8% |
| triceps-frances-unilateral-halter | **cartão** | 4,0% | 4,7% |
| remada-elastico | sim | 5,8% | 4,6% |
| aducao-maquina | **cartão** | 1,4% | 4,5% |
| triceps-elastico-acima | sim | 5,7% | 4,5% |
| rosca-martelo | sim | 5,7% | 4,4% |
| elevacao-lateral-elastico | sim | 5,9% | 4,3% |
| triceps-suspensao | sim | 3,3% | 4,0% |
| face-pull-elastico | sim | 5,6% | 3,9% |
| puxada-elastico | sim | 4,2% | 3,8% |
| supino-chao-halteres | **cartão** | 4,4% | 3,7% |
| afundo-tras | **cartão** | 4,0% | 3,7% |
| rosca-elastico | sim | 4,6% | 3,6% |
| panturrilha-sentada-halter | sim | 2,8% | 3,5% |
| panturrilha-sentada | **cartão** | 1,0% | 3,2% |
| panturrilha-chao | sim | 21,9% | 2,8% |
| mergulho | **cartão** | 1,6% | 2,7% |
| crucifixo-inclinado-halteres | **cartão** | 1,4% | 2,5% |
| rosca-maquina | **cartão** | 2,0% | 2,3% |
| supino-maquina | **cartão** | 2,4% | 2,3% |
| pike | sim | 17,9% | 2,2% |
| desenvolvimento-unilateral | **cartão** | 3,5% | 2,0% |
| elevacao-lateral-unilateral-elastico | **cartão** | 2,8% | 1,6% |
| abducao-elastico | **cartão** | 1,8% | 1,6% |
| triceps-barra-reta | **cartão** | 0,6% | 1,6% |
| stiff-kettlebell | sim | 1,8% | 1,6% |
| abducao-caneleira | sim | 1,3% | 1,6% |
| elevacao-joelhos | sim | 1,5% | 1,5% |
| supino-inclinado-polia | **cartão** | 0,6% | 1,5% |
| remada-suspensao | sim | 3,2% | 1,5% |
| terra-romeno-barra | **cartão** | 1,5% | 1,4% |
| puxada-unilateral | sim | 2,0% | 1,3% |
| rosca-suspensao | sim | 2,7% | 1,3% |
| rosca-martelo-elastico | **cartão** | 2,3% | 1,2% |
| bulgaro | sim | 1,1% | 1,2% |
| aducao-caneleira | sim | 1,4% | 1,2% |
| triceps-frances-kettlebell | sim | 1,9% | 1,2% |
| remada-curvada-elastico | **cartão** | 1,8% | 1,2% |
| ponte-kettlebell | sim | 1,8% | 1,1% |
| mesa-flexora | **cartão** | 2,0% | 1,0% |
| elevacao-lateral-unilateral | **cartão** | 1,1% | 0,9% |
| abdominal-declinado | **cartão** | 0,6% | 0,9% |
| bulgaro-peso-corpo | sim | 9,8% | 0,9% |
| remada-articulada | **cartão** | 1,8% | 0,9% |
| abertura-elastico | **cartão** | 1,5% | 0,8% |
| triceps-elastico-alto | **cartão** | 1,9% | 0,8% |
| flexao-elastico | sim | 0,5% | 0,8% |
| agachamento-halteres | **cartão** | 1,7% | 0,7% |
| desenvolvimento-elastico | sim | 2,1% | 0,7% |
| yt-suspensao | sim | 2,0% | 0,6% |
| rosca-polia | sim | 0,3% | 0,6% |
| rosca-concentrada | **cartão** | 1,5% | 0,6% |
| afundo-kettlebell | sim | 1,7% | 0,5% |
| goblet-kettlebell | **cartão** | 1,6% | 0,5% |
| desenvolvimento-unilateral-kettlebell | sim | 0,7% | 0,5% |
| remada-unilateral-kettlebell | sim | 1,5% | 0,5% |
| rosca-kettlebell | sim | 1,5% | 0,5% |
| desenvolvimento-maquina | **cartão** | 0,7% | 0,4% |
| coice-elastico | **cartão** | 0,8% | 0,4% |
| flexao-joelho-suspensao | sim | 1,2% | 0,4% |
| remada-invertida | **cartão** | 3,2% | 0,2% |
| triceps-maquina | **cartão** | 1,3% | 0,2% |
| remada-baixa-estacao | **cartão** | 2,9% | 0,2% |
| elevacao-joelhos-paralelas | sim | 0,9% | 0,2% |
| coice-maquina | **cartão** | 1,5% | 0,1% |
| coice-caneleira | **cartão** | 1,4% | 0,1% |
| stiff-unilateral-kettlebell | **cartão** | 0,5% | 0,1% |
| face-pull-suspensao | **cartão** | 0,5% | 0,1% |
| rosca-polia-costas | **cartão** | 1,4% | 0,1% |
| roda-abdominal | sim | 0,7% | 0,1% |
| rosca-barra-w | **cartão** | 1,4% | 0,1% |
| hack | **cartão** | 1,6% | 0,1% |
| barra-fixa-graviton | **cartão** | 1,6% | 0,1% |
| hiperextensao | **cartão** | 1,6% | 0,1% |
| extensao-joelho-mini-band | **cartão** | 1,6% | 0,1% |
| crucifixo-polia-baixo | **cartão** | 0,8% | 0,1% |
| agachamento-smith | **cartão** | 1,5% | 0,1% |
| remada-unilateral-polia | sim | 1,5% | 0,1% |
| terra-hexagonal | **cartão** | 1,5% | 0,1% |
| elevacao-lateral-caneleira | **cartão** | 1,6% | 0,1% |
| triceps-frances-polia-unilateral | sim | 1,4% | 0,1% |
| crucifixo-invertido-caneleira | **cartão** | 1,4% | 0,1% |
| mergulho-graviton | **cartão** | 1,1% | 0,1% |
| remada-barra | **cartão** | 1,0% | 0,1% |
| elevacao-lateral-deitado | **cartão** | 0,2% | 0,1% |
| abducao-mini-band | sim | 0,6% | 0,0% |
| remada-unilateral-elastico | **cartão** | 0,1% | 0,0% |
| ponte-pes-bola | sim | 0,4% | 0,0% |
| abducao-polia | **cartão** | 0,0% | 0,0% |
| caminhada-lateral-mini-band | **cartão** | 0,2% | 0,0% |
| bulgaro-suspensao | sim | 0,1% | 0,0% |
| desenvolvimento-em-pe-halteres | **cartão** | 0,0% | 0,0% |
| desenvolvimento-barra | **cartão** | 0,0% | 0,0% |
| abducao-deitado-mini-band | **cartão** | 0,0% | 0,0% |
| pull-through | **cartão** | 0,0% | 0,0% |

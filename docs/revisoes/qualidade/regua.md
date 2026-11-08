# A régua da G5 na grade de 108.900 programas

> Gerado por `npm run auditoria:regua` (`scripts/auditoria/grade-regua.ts`, com as medidas de `scripts/auditoria/regua.ts`). Dados fictícios. Não editar à mão.

**108.900 programas** (36.300 sem dor): 55 cenários de equipamento × 3 níveis × 2 a 6 dias (a divisão recomendada) × 30, 45, 60, 90 min × 11 focos (nenhum, peito, costas, ombros, bracos, pernas, gluteos, abdomen, superiores, inferiores, peito+costas) × 3 situações de dor (sem dor, ombro 7, joelho 7). 0 bloqueados. A régua e as fontes de cada limite: `docs/pesquisa-v2/17-biblioteca-ampliada.md`, parte G5, tabela 4.7.

## Nenhum defeito pode piorar

Nenhum defeito acima da linha de base (`docs/revisoes/qualidade/regua-linha-de-base.json`, a `main` antes da biblioteca ampliada).

| defeito | o que é | sem dor | % | linha de base | com dor | % | linha de base |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A2 | dia com menos de 3 exercícios ou sem multiarticular | 532 | 1,5% | 7,5% | 15.133 | 20,8% | 23,5% |
| A3 | dia mais longo acima de 110% dos minutos | 2.553 | 7,0% | 9,8% | 2.680 | 3,7% | 4,5% |
| A4 | dia típico abaixo de 70% dos minutos, sem o aviso | 1.877 | 5,2% | 5,3% | 0 | 0,0% | 0,0% |
| B1 | o mesmo exercício em todos os dias havendo outro do mesmo nível | 0 | 0,0% | 0,3% | 780 | 1,1% | 1,3% |
| C1 | prioritário abaixo da meta com tempo e exercício | 779 | 2,1% | 4,1% | 2.651 | 3,7% | 5,8% |
| D1 | empurrar ÷ puxar acima de 1,5 havendo como puxar | 445 | 1,2% | 6,1% | 349 | 0,5% | 3,2% |
| D3 | quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto) | 0 | 0,0% | 1,6% | 0 | 0,0% | 0,3% |
| E1 | não prioritário com 1 a 3 séries havendo exercício e tempo | 75 | 0,2% | 0,2% | 0 | 0,0% | 0,0% |
| seguranca | exercício impossível, acima da complexidade ou numa região com dor > 5 | 0 | 0,0% | 0,0% | 0 | 0,0% | 0,0% |
| **sem nenhum defeito** |  | 30.449 | **83,9%** |  | 52.370 | 72,1% |  |
| sem defeito, fora o D1 |  | 30.709 | 84,6% |  | 52.525 | 72,3% |  |

Como cada limite é medido (as definições do protótipo de `g-biblioteca-ampliada.md` foram descartadas com o rascunho; estas reproduzem a linha de base dele em todos os números publicados, menos o D1): o dia típico (A4) é a mediana dos dias; "tem tempo" (C1, E1) é o dia mais longo abaixo de 85% dos minutos; o foco (C1, C2) só conta músculos com exercício possível, e C2 compara com a mediana dos não prioritários que têm exercício possível; D1 e D3 só valem quando o equipamento permite puxar, e treinar quadríceps e posteriores. **O D1 usa o limite escrito na tabela 4.7 (empurrar ÷ puxar acima de 1,5)**: dá 6,1% na `main`, e não os 0,9% do protótipo, cuja leitura exata se perdeu. Por isso a linha "fora o D1" é a comparável com os 73,4% (hoje) e os 83,8% (final) do protótipo.

## Notas (devem melhorar)

% dos programas sem dor. B2 e B3 só existem com 3 dias ou mais (a coluna ao lado dá a fatia desses).

| nota | o que é | programas | % (sem dor) | % (3 dias ou mais) |
| --- | --- | ---: | ---: | ---: |
| A1 | exercícios por dia fora da faixa dos minutos | 3.478 | 9,6% |  |
| A5 | dia mais curto abaixo de 60% do mais longo | 4.675 | 12,9% |  |
| B2 | o mesmo exercício em todos os dias sem opção do mesmo nível | 5.656 | 15,6% | 19,5% |
| B3 | dois exercícios ou mais em todos os dias | 2.895 | 8,0% | 10,0% |
| C2 | o foco não passa da mediana dos outros músculos | 10.439 | 28,8% |  |
| G1 | dia com 3 ou mais cartões de texto | 26.527 | 73,1% |  |

## Medidas (sem dor)

| medida | valor |
| --- | ---: |
| exercícios por dia (média) | 5,5 |
| exercícios diferentes por semana (média) | 15,6 |
| prescrições sem nenhuma alternativa | 26,9% |
| cartões de texto por dia (média) | 1,93 |
| funções com 0 opção / com 1, somando os 55 cenários (intermediário) | 277 / 356 |

## Por grupo de cenário

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| atalhos (6) | 3.960 | 63,7% | 1,7% | 10,0% | 23,0% | 0,0% | 2,2% | 1,4% | 0,0% | 0,8% | 0,0% | 6,04 | 21 | 0,0% | 66,4% |
| personas (6) | 3.960 | 65,5% | 5,0% | 11,8% | 16,7% | 0,0% | 1,8% | 1,5% | 0,0% | 0,9% | 0,0% | 5,94 | 19,9 | 0,0% | 60,6% |
| sem nada (1) | 660 | 93,9% | 0,0% | 3,8% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,38 | 12,9 | 26,7% | 82,0% |
| um item só (38) | 25.080 | 91,5% | 0,3% | 5,2% | 0,0% | 0,0% | 2,3% | 1,2% | 0,0% | 0,0% | 0,0% | 5,31 | 13,8 | 21,9% | 78,1% |
| pares de casa (4) | 2.640 | 67,2% | 7,5% | 13,4% | 11,6% | 0,0% | 1,2% | 1,4% | 0,0% | 0,4% | 0,0% | 5,86 | 18,9 | 0,0% | 51,5% |

## Por nível

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| iniciante | 12.100 | 87,9% | 1,5% | 4,6% | 5,6% | 0,0% | 0,0% | 0,5% | 0,0% | 0,3% | 0,0% | 5,47 | 14,7 | 41,0% | 61,7% |
| intermediario | 12.100 | 83,7% | 1,5% | 7,4% | 5,2% | 0,0% | 2,0% | 1,2% | 0,0% | 0,2% | 0,0% | 5,52 | 16,1 | 2,9% | 78,9% |
| avancado | 12.100 | 80,0% | 1,5% | 9,2% | 4,7% | 0,0% | 4,4% | 1,9% | 0,0% | 0,2% | 0,0% | 5,52 | 16,1 | 2,9% | 78,7% |

## Por minutos

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 min | 9.075 | 71,2% | 5,9% | 23,1% | 0,0% | 0,0% | 0,0% | 2,6% | 0,0% | 0,0% | 0,0% | 3,95 | 12,3 | 13,9% | 45,2% |
| 45 min | 9.075 | 93,7% | 0,0% | 4,8% | 0,7% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 5,56 | 15,6 | 15,5% | 75,4% |
| 60 min | 9.075 | 92,7% | 0,0% | 0,2% | 6,2% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 6,16 | 17 | 16,5% | 84,4% |
| 90 min | 9.075 | 78,0% | 0,0% | 0,0% | 13,8% | 0,0% | 8,6% | 0,4% | 0,0% | 0,8% | 0,0% | 6,34 | 17,6 | 16,5% | 87,2% |

## Por dias

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 dias | 7.260 | 78,7% | 0,0% | 16,8% | 0,0% | 0,0% | 2,9% | 2,4% | 0,0% | 1,0% | 0,0% | 6,45 | 11,6 | 0,0% | 54,7% |
| 3 dias | 7.260 | 84,4% | 0,0% | 9,4% | 3,4% | 0,0% | 2,3% | 2,2% | 0,0% | 0,0% | 0,0% | 5,97 | 14,5 | 30,7% | 77,1% |
| 4 dias | 7.260 | 89,5% | 0,0% | 4,0% | 4,5% | 0,0% | 2,1% | 0,2% | 0,0% | 0,0% | 0,0% | 5,56 | 16,2 | 15,8% | 80,1% |
| 5 dias | 7.260 | 84,9% | 3,7% | 2,9% | 7,9% | 0,0% | 1,4% | 0,1% | 0,0% | 0,0% | 0,0% | 5,25 | 17,2 | 15,8% | 76,8% |
| 6 dias | 7.260 | 81,9% | 3,7% | 2,1% | 10,0% | 0,0% | 2,0% | 1,3% | 0,0% | 0,0% | 0,0% | 5,12 | 18,7 | 15,7% | 76,7% |

## Por foco

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| nenhum | 3.300 | 89,0% | 1,5% | 1,8% | 6,5% | 0,0% | 0,0% | 0,3% | 0,0% | 0,8% | 0,0% | 5,28 | 15,3 | 15,4% | 72,7% |
| peito | 3.300 | 82,0% | 1,5% | 5,8% | 6,1% | 0,0% | 0,9% | 7,8% | 0,0% | 0,2% | 0,0% | 5,33 | 15,3 | 15,4% | 72,9% |
| costas | 3.300 | 84,5% | 1,5% | 4,9% | 6,2% | 0,0% | 2,6% | 0,5% | 0,0% | 0,6% | 0,0% | 5,27 | 15,2 | 15,4% | 72,5% |
| ombros | 3.300 | 90,1% | 1,5% | 1,8% | 5,6% | 0,0% | 1,0% | 0,5% | 0,0% | 0,4% | 0,0% | 5,53 | 15,8 | 15,2% | 73,0% |
| bracos | 3.300 | 85,7% | 1,5% | 2,6% | 5,7% | 0,0% | 5,3% | 0,5% | 0,0% | 0,1% | 0,0% | 5,34 | 15,4 | 17,0% | 73,4% |
| pernas | 3.300 | 80,9% | 1,5% | 13,7% | 2,9% | 0,0% | 2,4% | 0,3% | 0,0% | 0,0% | 0,0% | 5,7 | 16,1 | 15,2% | 72,4% |
| gluteos | 3.300 | 86,3% | 1,5% | 7,4% | 5,3% | 0,0% | 0,0% | 0,3% | 0,0% | 0,0% | 0,0% | 5,81 | 16,3 | 15,1% | 73,5% |
| abdomen | 3.300 | 88,5% | 1,5% | 1,6% | 5,9% | 0,0% | 2,3% | 0,3% | 0,0% | 0,1% | 0,0% | 5,39 | 15,2 | 15,4% | 75,0% |
| superiores | 3.300 | 80,1% | 1,6% | 9,3% | 4,0% | 0,0% | 3,8% | 1,8% | 0,0% | 0,0% | 0,0% | 5,59 | 15,8 | 16,8% | 72,5% |
| inferiores | 3.300 | 74,9% | 1,5% | 19,7% | 2,7% | 0,0% | 2,2% | 0,3% | 0,0% | 0,0% | 0,0% | 5,96 | 16,4 | 15,1% | 73,1% |
| peito+costas | 3.300 | 80,6% | 1,5% | 8,6% | 5,9% | 0,0% | 3,1% | 0,9% | 0,0% | 0,1% | 0,0% | 5,32 | 15,2 | 15,4% | 72,8% |

## Por cenário

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | 660 | 61,2% | 0,0% | 9,2% | 27,4% | 0,0% | 2,6% | 1,4% | 0,0% | 1,1% | 0,0% | 6,09 | 22,4 | 0,0% | 86,4% |
| academia+ | 660 | 60,9% | 0,0% | 9,2% | 27,7% | 0,0% | 2,6% | 1,4% | 0,0% | 1,1% | 0,0% | 6,09 | 22,4 | 0,0% | 86,4% |
| bairro | 660 | 60,6% | 0,0% | 8,0% | 27,4% | 0,0% | 3,8% | 2,3% | 0,0% | 2,9% | 0,0% | 6,1 | 20,9 | 0,0% | 78,2% |
| banco+halteres-leves | 660 | 79,1% | 10,0% | 12,3% | 0,0% | 0,0% | 0,6% | 0,9% | 0,0% | 0,0% | 0,0% | 5,81 | 18,8 | 0,0% | 56,5% |
| bruno | 660 | 60,6% | 0,0% | 12,6% | 25,8% | 0,0% | 1,8% | 1,4% | 0,0% | 0,0% | 0,0% | 6,08 | 21,9 | 0,0% | 36,4% |
| casa | 660 | 47,6% | 10,0% | 13,6% | 28,8% | 0,0% | 2,1% | 1,4% | 0,0% | 1,1% | 0,0% | 5,94 | 18,4 | 0,0% | 68,6% |
| casa+ | 660 | 60,5% | 0,0% | 10,8% | 27,1% | 0,0% | 2,7% | 1,4% | 0,0% | 0,0% | 0,0% | 6,08 | 22 | 0,0% | 3,9% |
| condominio | 660 | 91,4% | 0,0% | 7,1% | 0,0% | 0,0% | 0,6% | 1,4% | 0,0% | 0,0% | 0,0% | 5,95 | 19,8 | 0,0% | 67,3% |
| condominio+ | 660 | 60,6% | 0,0% | 10,2% | 27,0% | 0,0% | 2,6% | 1,4% | 0,0% | 1,4% | 0,0% | 6,1 | 21,1 | 0,0% | 85,9% |
| diego | 660 | 53,2% | 10,0% | 12,4% | 23,5% | 0,0% | 2,0% | 1,7% | 0,0% | 1,2% | 0,0% | 5,93 | 20,2 | 0,0% | 52,6% |
| elasticos | 660 | 53,0% | 10,0% | 12,9% | 23,3% | 0,0% | 1,7% | 1,7% | 0,0% | 1,1% | 0,0% | 5,92 | 19,2 | 0,0% | 63,6% |
| halteres | 660 | 86,2% | 0,0% | 12,4% | 0,0% | 0,0% | 0,8% | 1,4% | 0,0% | 0,0% | 0,0% | 5,78 | 18,7 | 0,0% | 76,1% |
| halteres-banco | 660 | 79,1% | 10,0% | 12,3% | 0,0% | 0,0% | 0,6% | 0,9% | 0,0% | 0,0% | 0,0% | 5,81 | 18,8 | 0,0% | 56,5% |
| halteres+bola | 660 | 86,4% | 0,0% | 12,3% | 0,0% | 0,0% | 0,8% | 1,4% | 0,0% | 0,0% | 0,0% | 5,78 | 18,5 | 0,0% | 73,9% |
| so:abdominal_maquina | 660 | 94,7% | 0,0% | 3,0% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,39 | 12,6 | 26,7% | 88,5% |
| so:anilhas_e_manoplas | 660 | 86,2% | 0,0% | 12,4% | 0,0% | 0,0% | 0,8% | 1,4% | 0,0% | 0,0% | 0,0% | 5,78 | 18,7 | 0,0% | 76,1% |
| so:banco_romano | 660 | 92,9% | 0,0% | 4,8% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,39 | 13,5 | 26,7% | 100,0% |
| so:barra_fixa | 660 | 91,8% | 0,0% | 6,1% | 0,0% | 0,0% | 1,1% | 2,4% | 0,0% | 0,0% | 0,0% | 4,9 | 15,5 | 6,7% | 54,7% |
| so:barra_hexagonal | 660 | 94,2% | 0,0% | 2,9% | 0,0% | 0,0% | 2,9% | 0,0% | 0,0% | 0,0% | 0,0% | 5,37 | 12,8 | 26,7% | 92,7% |
| so:barra_longa | 660 | 89,2% | 0,0% | 5,8% | 0,0% | 0,0% | 3,5% | 2,4% | 0,0% | 0,0% | 0,0% | 4,99 | 13,8 | 33,3% | 84,2% |
| so:barra_w | 660 | 94,8% | 0,0% | 3,9% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 0,0% | 5,72 | 13,5 | 33,9% | 87,7% |
| so:bola_suica | 660 | 92,6% | 0,0% | 4,7% | 0,0% | 0,0% | 2,7% | 0,0% | 0,0% | 0,0% | 0,0% | 5,36 | 13,8 | 26,7% | 61,8% |
| so:cadeira_abdutora_adutora | 660 | 93,8% | 0,0% | 3,8% | 0,0% | 0,0% | 2,4% | 0,0% | 0,0% | 0,0% | 0,0% | 5,39 | 13 | 26,7% | 84,2% |
| so:cadeira_extensora | 660 | 94,8% | 0,0% | 3,0% | 0,0% | 0,0% | 2,1% | 0,0% | 0,0% | 0,0% | 0,0% | 5,59 | 13,5 | 26,7% | 88,0% |
| so:cadeira_flexora | 660 | 94,8% | 0,0% | 3,3% | 0,0% | 0,0% | 1,8% | 0,0% | 0,0% | 0,0% | 0,0% | 5,37 | 12,9 | 26,7% | 90,6% |
| so:caneleiras | 660 | 93,6% | 0,2% | 5,5% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 5,98 | 14 | 26,7% | 78,3% |
| so:desenvolvimento_maquina | 660 | 93,9% | 0,0% | 3,8% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,38 | 12,9 | 26,7% | 82,9% |
| so:estacao_polia_dupla | 660 | 75,5% | 10,0% | 12,7% | 0,0% | 0,0% | 0,9% | 3,5% | 0,0% | 0,0% | 0,0% | 5,83 | 16,5 | 7,6% | 21,8% |
| so:estacao_puxada | 660 | 88,8% | 0,0% | 6,5% | 0,0% | 0,0% | 3,6% | 2,4% | 0,0% | 0,0% | 0,0% | 4,73 | 13,6 | 15,2% | 80,0% |
| so:estacao_remada | 660 | 89,1% | 0,0% | 4,7% | 0,0% | 0,0% | 3,6% | 3,8% | 0,0% | 0,0% | 0,0% | 4,75 | 13,7 | 13,3% | 80,0% |
| so:gluteo_maquina | 660 | 95,5% | 0,0% | 2,3% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,37 | 12,9 | 26,7% | 83,3% |
| so:graviton | 660 | 89,1% | 0,0% | 6,5% | 0,0% | 0,0% | 3,5% | 2,3% | 0,0% | 0,0% | 0,0% | 4,75 | 14 | 12,7% | 82,0% |
| so:hack | 660 | 94,2% | 0,0% | 3,5% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,39 | 12,8 | 26,7% | 92,7% |
| so:halteres_fixos | 660 | 86,4% | 0,0% | 12,3% | 0,0% | 0,0% | 0,8% | 1,4% | 0,0% | 0,0% | 0,0% | 5,77 | 18,6 | 0,0% | 76,1% |
| so:kettlebell | 660 | 78,6% | 0,5% | 12,3% | 0,0% | 0,0% | 3,8% | 6,4% | 0,0% | 0,0% | 0,0% | 5,07 | 14,7 | 20,0% | 51,8% |
| so:leg_press | 660 | 94,1% | 0,0% | 3,5% | 0,0% | 0,0% | 2,4% | 0,0% | 0,0% | 0,0% | 0,0% | 5,4 | 12,8 | 26,7% | 92,7% |
| so:mesa_flexora | 660 | 94,8% | 0,0% | 3,3% | 0,0% | 0,0% | 1,8% | 0,0% | 0,0% | 0,0% | 0,0% | 5,37 | 12,9 | 26,7% | 90,6% |
| so:mini_band | 660 | 94,2% | 0,0% | 3,8% | 0,0% | 0,0% | 2,0% | 0,0% | 0,0% | 0,0% | 0,0% | 5,58 | 13,5 | 26,7% | 88,0% |
| so:multifuncional | 660 | 92,4% | 0,0% | 6,2% | 0,0% | 0,0% | 0,9% | 1,2% | 0,0% | 0,0% | 0,0% | 5,01 | 14,4 | 6,7% | 93,3% |
| so:panturrilha_em_pe_maquina | 660 | 94,1% | 0,0% | 3,6% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,4 | 12,9 | 26,7% | 82,0% |
| so:panturrilha_sentada_maquina | 660 | 93,8% | 0,0% | 3,9% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,39 | 12,9 | 26,7% | 83,0% |
| so:paralelas | 660 | 94,2% | 0,0% | 4,1% | 0,0% | 0,0% | 1,7% | 0,0% | 0,0% | 0,0% | 0,0% | 5,38 | 14,1 | 26,7% | 61,8% |
| so:rack_de_agachamento | 660 | 89,4% | 0,0% | 6,2% | 0,0% | 0,0% | 3,5% | 1,7% | 0,0% | 0,0% | 0,0% | 4,73 | 13,4 | 20,0% | 77,9% |
| so:remada_articulada | 660 | 89,1% | 0,0% | 4,7% | 0,0% | 0,0% | 3,6% | 3,8% | 0,0% | 0,0% | 0,0% | 4,75 | 13,7 | 13,3% | 80,0% |
| so:roda_abdominal | 660 | 93,9% | 0,0% | 3,8% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,38 | 13,3 | 26,7% | 78,6% |
| so:rosca_maquina | 660 | 95,0% | 0,0% | 3,8% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 0,0% | 5,72 | 13,5 | 33,9% | 87,9% |
| so:smith | 660 | 89,5% | 0,0% | 5,9% | 0,0% | 0,0% | 3,6% | 1,7% | 0,0% | 0,0% | 0,0% | 4,73 | 13,4 | 20,0% | 94,8% |
| so:step | 660 | 93,9% | 0,0% | 4,1% | 0,0% | 0,0% | 2,0% | 0,0% | 0,0% | 0,0% | 0,0% | 5,36 | 13,2 | 26,7% | 46,8% |
| so:supino_maquina | 660 | 94,1% | 0,0% | 3,6% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,4 | 13,2 | 19,2% | 100,0% |
| so:suspensao | 660 | 81,4% | 0,0% | 6,2% | 0,0% | 0,0% | 3,9% | 10,2% | 0,0% | 0,0% | 0,0% | 5,08 | 14,9 | 20,0% | 6,4% |
| so:triceps_maquina | 660 | 94,5% | 0,0% | 3,8% | 0,0% | 0,0% | 1,7% | 0,0% | 0,0% | 0,0% | 0,0% | 5,39 | 12,9 | 26,7% | 81,8% |
| so:voador | 660 | 92,7% | 0,0% | 4,2% | 0,0% | 0,0% | 3,0% | 0,0% | 0,0% | 0,0% | 0,0% | 5,57 | 13,7 | 21,1% | 86,2% |
| step+elasticos | 660 | 50,3% | 10,0% | 16,5% | 22,9% | 0,0% | 1,4% | 1,7% | 0,0% | 0,5% | 0,0% | 5,92 | 19,7 | 0,0% | 57,6% |
| suspensao+elasticos | 660 | 52,9% | 10,0% | 12,6% | 23,5% | 0,0% | 2,0% | 1,7% | 0,0% | 1,2% | 0,0% | 5,93 | 18,5 | 0,0% | 17,9% |
| vazio | 660 | 93,9% | 0,0% | 3,8% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 0,0% | 5,38 | 12,9 | 26,7% | 82,0% |

## Uso de cada exercício

Programas sem dor em que o exercício aparece (os sem animação aprovada, que aparecem como cartão de texto, vêm marcados).

| exercício | animação | programas | % |
| --- | --- | ---: | ---: |
| abdominal-chao | sim | 32.706 | 90,1% |
| flexao | sim | 30.481 | 84,0% |
| panturrilha-degrau | **cartão** | 29.700 | 81,8% |
| afundo-peso-corpo | sim | 26.400 | 72,7% |
| flexao-joelho-deslizante | sim | 25.558 | 70,4% |
| abdominal-invertido | **cartão** | 22.446 | 61,8% |
| extensao-triceps-peso-corpo | **cartão** | 21.571 | 59,4% |
| agachamento-peso-corpo | sim | 21.124 | 58,2% |
| ponte-gluteo | sim | 20.748 | 57,2% |
| abertura-t-deitado | **cartão** | 20.378 | 56,1% |
| flexao-pes-elevados | **cartão** | 19.533 | 53,8% |
| bulgaro-peso-corpo | sim | 15.287 | 42,1% |
| nordico | sim | 15.220 | 41,9% |
| flexao-fechada | sim | 15.121 | 41,7% |
| afundo | sim | 9.240 | 25,5% |
| stiff | sim | 9.240 | 25,5% |
| elevacao-halteres | sim | 7.267 | 20,0% |
| triceps-frances-halter | sim | 6.864 | 18,9% |
| supino-reto | sim | 5.940 | 16,4% |
| ponte-gluteo-halter | **cartão** | 4.914 | 13,5% |
| remada-apoiada | sim | 4.620 | 12,7% |
| supino-inclinado | sim | 4.620 | 12,7% |
| remada-unilateral-sem-banco | sim | 4.532 | 12,5% |
| pike | sim | 4.320 | 11,9% |
| aducao-deitado | sim | 4.290 | 11,8% |
| remada-curvada-halteres | **cartão** | 4.268 | 11,8% |
| panturrilha | sim | 4.180 | 11,5% |
| stiff-unilateral | sim | 4.143 | 11,4% |
| bulgaro | sim | 3.960 | 10,9% |
| rosca-inclinada | sim | 3.875 | 10,7% |
| rosca-alternada | sim | 3.860 | 10,6% |
| afundo-tras-peso-corpo | **cartão** | 3.701 | 10,2% |
| goblet | sim | 3.642 | 10,0% |
| flexao-joelho-elastico | sim | 3.628 | 10,0% |
| extensao-joelho-elastico | sim | 3.564 | 9,8% |
| crucifixo-halteres | **cartão** | 3.315 | 9,1% |
| abdominal-bola | sim | 3.294 | 9,1% |
| abducao-deitado | sim | 3.188 | 8,8% |
| cadeira-flexora | **cartão** | 3.062 | 8,4% |
| crucifixo-invertido-sentado | **cartão** | 3.023 | 8,3% |
| crucifixo-invertido-curvado | **cartão** | 3.004 | 8,3% |
| cadeira-extensora | **cartão** | 3.003 | 8,3% |
| triceps-testa-halteres | **cartão** | 2.984 | 8,2% |
| flexao-bola | sim | 2.969 | 8,2% |
| remada-unilateral-halter | sim | 2.904 | 8,0% |
| agachamento-elastico | sim | 2.640 | 7,3% |
| barra-fixa | sim | 2.640 | 7,3% |
| puxada-frente | **cartão** | 2.640 | 7,3% |
| puxada-unilateral | sim | 2.640 | 7,3% |
| stiff-elastico | sim | 2.640 | 7,3% |
| rosca-martelo | sim | 2.469 | 6,8% |
| crucifixo-inverso | **cartão** | 2.453 | 6,8% |
| remada-elastico | sim | 2.376 | 6,5% |
| triceps-frances-unilateral-halter | **cartão** | 2.310 | 6,4% |
| triceps-elastico-acima | sim | 2.244 | 6,2% |
| elevacao-lateral-elastico | sim | 2.211 | 6,1% |
| barra-fixa-supinada | sim | 2.190 | 6,0% |
| elevacao-lateral | sim | 2.159 | 5,9% |
| crucifixo-elastico | sim | 2.115 | 5,8% |
| elevacao-lateral-unilateral-elastico | **cartão** | 2.073 | 5,7% |
| afundo-tras | **cartão** | 1.968 | 5,4% |
| panturrilha-bilateral-step | sim | 1.932 | 5,3% |
| face-pull-elastico | sim | 1.897 | 5,2% |
| puxada-elastico | sim | 1.848 | 5,1% |
| panturrilha-chao | sim | 1.793 | 4,9% |
| triceps-frances | sim | 1.683 | 4,6% |
| rosca-elastico | sim | 1.664 | 4,6% |
| abdominal-maquina | **cartão** | 1.604 | 4,4% |
| abdominal-polia | sim | 1.588 | 4,4% |
| puxada-barra-reta | **cartão** | 1.584 | 4,4% |
| rosca-scott-banco-inclinado | **cartão** | 1.562 | 4,3% |
| elevacao-joelhos | sim | 1.560 | 4,3% |
| supino-chao-halteres | **cartão** | 1.556 | 4,3% |
| coice-maquina | **cartão** | 1.554 | 4,3% |
| panturrilha-leg-press | **cartão** | 1.530 | 4,2% |
| crucifixo-invertido-polia | sim | 1.463 | 4,0% |
| rosca-maquina | **cartão** | 1.356 | 3,7% |
| desenvolvimento-unilateral | **cartão** | 1.350 | 3,7% |
| stiff-kettlebell | sim | 1.326 | 3,7% |
| leg-press | **cartão** | 1.320 | 3,6% |
| remada-baixa-estacao | **cartão** | 1.320 | 3,6% |
| remada-invertida | **cartão** | 1.320 | 3,6% |
| remada-suspensao | sim | 1.320 | 3,6% |
| crucifixo-polia | sim | 1.269 | 3,5% |
| extensao-joelho-caneleira | sim | 1.221 | 3,4% |
| desenvolvimento | sim | 1.218 | 3,4% |
| supino-maquina | **cartão** | 1.210 | 3,3% |
| remada-baixa | sim | 1.188 | 3,3% |
| remada-curvada-elastico | **cartão** | 1.188 | 3,3% |
| triceps-suspensao | sim | 1.185 | 3,3% |
| hip-thrust | **cartão** | 1.152 | 3,2% |
| rosca-suspensao | sim | 1.134 | 3,1% |
| agachamento-smith | **cartão** | 1.100 | 3,0% |
| panturrilha-em-pe-maquina | **cartão** | 1.100 | 3,0% |
| ponte-kettlebell | sim | 1.092 | 3,0% |
| rosca-martelo-elastico | **cartão** | 1.068 | 2,9% |
| triceps-corda | sim | 936 | 2,6% |
| crucifixo-inclinado-halteres | **cartão** | 885 | 2,4% |
| agachamento-barra | **cartão** | 880 | 2,4% |
| rosca-polia-costas | **cartão** | 841 | 2,3% |
| triceps-frances-kettlebell | sim | 792 | 2,2% |
| yt-suspensao | sim | 778 | 2,1% |
| abertura-elastico | **cartão** | 762 | 2,1% |
| panturrilha-sentada-halter | sim | 724 | 2,0% |
| elevacao-joelhos-paralelas | sim | 712 | 2,0% |
| desenvolvimento-elastico | sim | 696 | 1,9% |
| afundo-kettlebell | sim | 660 | 1,8% |
| barra-fixa-graviton | **cartão** | 660 | 1,8% |
| goblet-kettlebell | **cartão** | 660 | 1,8% |
| hack | **cartão** | 660 | 1,8% |
| hiperextensao | **cartão** | 660 | 1,8% |
| mesa-flexora | **cartão** | 660 | 1,8% |
| remada-articulada | **cartão** | 660 | 1,8% |
| remada-unilateral-kettlebell | sim | 660 | 1,8% |
| remada-unilateral-polia | sim | 660 | 1,8% |
| terra-hexagonal | **cartão** | 660 | 1,8% |
| elevacao-lateral-caneleira | **cartão** | 658 | 1,8% |
| rosca-barra-w | **cartão** | 654 | 1,8% |
| flexao-joelho-suspensao | sim | 652 | 1,8% |
| extensao-joelho-mini-band | **cartão** | 627 | 1,7% |
| mergulho | **cartão** | 604 | 1,7% |
| coice-caneleira | **cartão** | 597 | 1,6% |
| rosca-kettlebell | sim | 583 | 1,6% |
| triceps-frances-polia-unilateral | sim | 561 | 1,5% |
| face-pull | sim | 509 | 1,4% |
| crucifixo-invertido-caneleira | **cartão** | 489 | 1,3% |
| voador | **cartão** | 486 | 1,3% |
| barra-fixa-negativa | **cartão** | 447 | 1,2% |
| remada-barra | **cartão** | 440 | 1,2% |
| supino-barra | **cartão** | 440 | 1,2% |
| terra-romeno-barra | **cartão** | 440 | 1,2% |
| roda-abdominal | sim | 406 | 1,1% |
| mergulho-graviton | **cartão** | 392 | 1,1% |
| triceps-maquina | **cartão** | 378 | 1,0% |
| stiff-unilateral-kettlebell | **cartão** | 360 | 1,0% |
| abducao-elastico | **cartão** | 358 | 1,0% |
| rosca-concentrada | **cartão** | 334 | 0,9% |
| coice-elastico | **cartão** | 331 | 0,9% |
| face-pull-suspensao | **cartão** | 321 | 0,9% |
| crucifixo-polia-baixo | **cartão** | 282 | 0,8% |
| aducao-maquina | **cartão** | 257 | 0,7% |
| agachamento-halteres | **cartão** | 252 | 0,7% |
| desenvolvimento-unilateral-kettlebell | sim | 240 | 0,7% |
| aducao-caneleira | sim | 216 | 0,6% |
| triceps-barra-reta | **cartão** | 207 | 0,6% |
| triceps-elastico-alto | **cartão** | 207 | 0,6% |
| abducao-maquina | **cartão** | 206 | 0,6% |
| ponte-pes-bola | sim | 204 | 0,6% |
| abducao-caneleira | sim | 199 | 0,5% |
| supino-inclinado-polia | **cartão** | 198 | 0,5% |
| panturrilha-sentada | **cartão** | 192 | 0,5% |
| flexao-elastico | sim | 176 | 0,5% |
| coice-polia | **cartão** | 114 | 0,3% |
| desenvolvimento-maquina | **cartão** | 114 | 0,3% |
| abducao-mini-band | sim | 80 | 0,2% |
| abdominal-declinado | **cartão** | 72 | 0,2% |
| rosca-scott | **cartão** | 52 | 0,1% |
| abducao-polia | **cartão** | 48 | 0,1% |
| abducao-deitado-mini-band | **cartão** | 36 | 0,1% |
| desenvolvimento-barra | **cartão** | 24 | 0,1% |
| bulgaro-suspensao | sim | 0 | 0,0% |
| caminhada-lateral-mini-band | **cartão** | 0 | 0,0% |
| desenvolvimento-em-pe-halteres | **cartão** | 0 | 0,0% |
| elevacao-lateral-deitado | **cartão** | 0 | 0,0% |
| elevacao-lateral-unilateral | **cartão** | 0 | 0,0% |
| pull-through | **cartão** | 0 | 0,0% |
| remada-unilateral-elastico | **cartão** | 0 | 0,0% |
| rosca-polia | sim | 0 | 0,0% |
| supino-polia | **cartão** | 0 | 0,0% |
| supino-smith | **cartão** | 0 | 0,0% |
| voador-invertido | **cartão** | 0 | 0,0% |

## Exemplos

O 1º programa da grade com cada defeito e nota.

- **A2** (sem dor), casa · iniciante · 5 dias · 30 min · foco nenhum · sem dor: Empurrar sem multiarticular.
  - Superior (30 min): flexao 3, remada-unilateral-sem-banco 2, remada-curvada-halteres 2, elevacao-halteres 3 | Inferior (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Empurrar (22 min): elevacao-halteres 3, triceps-frances-halter 4, crucifixo-elastico 3 | Puxar (22 min): remada-unilateral-sem-banco 2, remada-curvada-halteres 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (30 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2
- **A3** (sem dor), casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: dia de 38 min em 30.
  - Corpo todo A (38 min): goblet 3, flexao 2, remada-unilateral-sem-banco 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (29 min): afundo 3, flexao 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
- **A4** (sem dor), casa · iniciante · 3 dias · 90 min · foco nenhum · sem dor: dia típico de 56 min em 90, sem o aviso.
  - Corpo todo A (50 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (58 min): stiff 2, flexao 2, remada-curvada-halteres 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-invertido 2 | Corpo todo C (56 min): afundo 2, supino-chao-halteres 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 3, elevacao-halteres 3, triceps-testa-halteres 2, flexao-joelho-elastico 2, abdominal-chao 2
- **C1** (sem dor), casa · intermediario · 2 dias · 90 min · foco costas · sem dor: costas com 8 de 12 e o dia mais longo em 75 de 90 min.
  - Corpo todo A (75 min): remada-unilateral-sem-banco 4, goblet 2, flexao 2, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (65 min): remada-curvada-halteres 4, afundo 2, flexao-pes-elevados 2, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 2, crucifixo-invertido-curvado 2, elevacao-halteres 3, abdominal-invertido 2
- **D1** (sem dor), casa · iniciante · 2 dias · 30 min · foco peito · sem dor: empurrar 8 ÷ puxar 4 séries.
  - Corpo todo A (41 min): flexao 4, goblet 3, remada-unilateral-sem-banco 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (34 min): flexao 4, afundo 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
- **E1** (sem dor), casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: gluteos com 3,5 séries e o dia mais longo em 72 de 90 min.
  - Corpo todo A (72 min): goblet 2, flexao 2, remada-unilateral-sem-banco 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (67 min): afundo 2, flexao 2, remada-curvada-halteres 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2
- **A1** (sem dor), casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A com 6 exercícios em 30 min (faixa 3–5).
  - Corpo todo A (38 min): goblet 3, flexao 2, remada-unilateral-sem-banco 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (29 min): afundo 3, flexao 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
- **A5** (sem dor), casa · iniciante · 5 dias · 60 min · foco nenhum · sem dor: dias de 27 a 46 min.
  - Superior (46 min): flexao 2, remada-unilateral-sem-banco 2, remada-curvada-halteres 2, triceps-frances-halter 2, elevacao-halteres 3, rosca-alternada 2, crucifixo-elastico 2, crucifixo-invertido-sentado 2 | Inferior (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (30 min): flexao 2, elevacao-halteres 3, triceps-frances-unilateral-halter 2, crucifixo-elastico 2, triceps-testa-halteres 2 | Puxar (27 min): remada-unilateral-sem-banco 2, remada-curvada-halteres 2, crucifixo-invertido-sentado 2, rosca-martelo 2, abdominal-invertido 2 | Pernas (43 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, panturrilha-degrau 3, flexao-joelho-elastico 2
- **B2** (sem dor), vazio · iniciante · 3 dias · 30 min · foco nenhum · sem dor: flexao em todos os dias, sem outro do mesmo nível.
  - Corpo todo A (29 min): agachamento-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3, extensao-triceps-peso-corpo 3 | Corpo todo B (31 min): flexao 2, flexao-joelho-deslizante 2, panturrilha-degrau 4, abertura-t-deitado 4 | Corpo todo C (31 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, abdominal-chao 4
- **B3** (sem dor), vazio · iniciante · 3 dias · 45 min · foco nenhum · sem dor: flexao, flexao-joelho-deslizante em todos os dias.
  - Corpo todo A (42 min): agachamento-peso-corpo 4, flexao 2, flexao-joelho-deslizante 4, extensao-triceps-peso-corpo 3, abdominal-chao 2 | Corpo todo B (43 min): flexao 2, bulgaro-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-degrau 4, abertura-t-deitado 4, abdominal-invertido 2 | Corpo todo C (39 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, flexao-fechada 2, flexao-joelho-deslizante 2, abdominal-chao 2
- **C2** (sem dor), casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 3,25.
  - Corpo todo A (38 min): goblet 3, flexao 2, remada-unilateral-sem-banco 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (29 min): afundo 3, flexao 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
- **G1** (sem dor), casa · iniciante · 2 dias · 60 min · foco nenhum · sem dor: Corpo todo B com 3 cartões de texto.
  - Corpo todo A (58 min): goblet 2, flexao 3, remada-unilateral-sem-banco 3, stiff 3, triceps-frances-halter 3, elevacao-halteres 3+drop, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (58 min): afundo 2, flexao 3, remada-curvada-halteres 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, abdominal-invertido 2
- **A2** (com dor), casa · iniciante · 4 dias · 30 min · foco nenhum · ombro 7: Superior A com 2 exercícios.
  - Superior A (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior A (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Superior B (12 min): rosca-martelo 3, triceps-elastico-alto 3 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2
- **A3** (com dor), casa · iniciante · 2 dias · 30 min · foco nenhum · joelho 7: dia de 37 min em 30.
  - Corpo todo A (37 min): flexao 2, remada-unilateral-sem-banco 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (29 min): flexao 3, remada-curvada-halteres 3, stiff-unilateral 2, rosca-alternada 2+drop
- **B1** (com dor), casa · iniciante · 3 dias · 45 min · foco nenhum · ombro 7: ponte-gluteo-halter em todos os dias, com outro do mesmo nível possível e sem uso.
  - Corpo todo A (38 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-martelo 3, triceps-elastico-alto 3, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 3, abdominal-invertido 2 | Corpo todo C (40 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
- **C1** (com dor), casa · iniciante · 2 dias · 90 min · foco bracos · ombro 7: triceps com 4 de 8 e o dia mais longo em 55 de 90 min.
  - Corpo todo A (49 min): goblet 2, stiff 3, rosca-alternada 4, triceps-elastico-alto 4, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (55 min): afundo 2, ponte-gluteo-halter 3, rosca-martelo 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, aducao-deitado 2, abdominal-invertido 2
- **D1** (com dor), casa · iniciante · 2 dias · 30 min · foco peito · joelho 7: empurrar 8 ÷ puxar 4 séries.
  - Corpo todo A (46 min): flexao 4, remada-unilateral-sem-banco 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (32 min): flexao 4, remada-curvada-halteres 2, stiff-unilateral 2, rosca-alternada 2+drop
- **A1** (com dor), casa · iniciante · 2 dias · 30 min · foco nenhum · joelho 7: Corpo todo A com 6 exercícios em 30 min (faixa 3–5).
  - Corpo todo A (37 min): flexao 2, remada-unilateral-sem-banco 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (29 min): flexao 3, remada-curvada-halteres 3, stiff-unilateral 2, rosca-alternada 2+drop
- **A5** (com dor), casa · iniciante · 2 dias · 30 min · foco costas · joelho 7: dias de 27 a 46 min.
  - Corpo todo A (46 min): remada-unilateral-sem-banco 4, flexao 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (27 min): remada-curvada-halteres 4, flexao 3, stiff-unilateral 2
- **B2** (com dor), casa+ · iniciante · 3 dias · 60 min · foco nenhum · ombro 7: rosca-scott-banco-inclinado em todos os dias, sem outro do mesmo nível.
  - Corpo todo A (39 min): bulgaro 2, flexao-bola 2, rosca-scott-banco-inclinado 2, triceps-elastico-alto 3, abducao-caneleira 2, abdominal-bola 2 | Corpo todo B (48 min): stiff 2, extensao-joelho-caneleira 2, rosca-scott-banco-inclinado 2, panturrilha 3, coice-caneleira 2, aducao-caneleira 2, abdominal-chao 2 | Corpo todo C (46 min): afundo 2, ponte-kettlebell 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-bilateral-step 3, rosca-scott-banco-inclinado 2, abdominal-invertido 2
- **B3** (com dor), condominio · iniciante · 3 dias · 45 min · foco nenhum · ombro 7: ponte-gluteo-halter, rosca-scott-banco-inclinado em todos os dias.
  - Corpo todo A (31 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-scott-banco-inclinado 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo C (38 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-chao 3, rosca-scott-banco-inclinado 2, abdominal-invertido 2
- **C2** (com dor), casa · iniciante · 2 dias · 30 min · foco bracos · ombro 7: triceps com 0, mediana dos outros 4.
  - Corpo todo A (30 min): goblet 3, stiff 2, rosca-alternada 3+drop, panturrilha-degrau 4 | Corpo todo B (29 min): afundo 3, rosca-martelo 2+drop, flexao-joelho-elastico 2, abdominal-chao 4
- **G1** (com dor), casa · iniciante · 2 dias · 60 min · foco nenhum · joelho 7: Corpo todo B com 4 cartões de texto.
  - Corpo todo A (58 min): flexao 2, remada-unilateral-sem-banco 3, stiff 3, triceps-frances-halter 3+drop, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (60 min): flexao 2, remada-curvada-halteres 3, stiff-unilateral 3, ponte-gluteo-halter 3, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2

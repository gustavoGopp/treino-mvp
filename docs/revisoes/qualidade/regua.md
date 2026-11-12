# A régua da G5 na grade de 108.900 programas

> Gerado por `npm run auditoria:regua` (`scripts/auditoria/grade-regua.ts`, com as medidas de `scripts/auditoria/regua.ts`). Dados fictícios. Não editar à mão.

**108.900 programas** (36.300 sem dor): 55 cenários de equipamento × 3 níveis × 2 a 6 dias (a divisão recomendada) × 30, 45, 60, 90 min × 11 focos (nenhum, peito, costas, ombros, bracos, pernas, gluteos, abdomen, superiores, inferiores, peito+costas) × 3 situações de dor (sem dor, ombro 7, joelho 7). 0 bloqueados. A régua e as fontes de cada limite: `docs/pesquisa-v2/17-biblioteca-ampliada.md`, parte G5, tabela 4.7.

## Nenhum defeito pode piorar

Nenhum defeito acima da linha de base (`docs/revisoes/qualidade/regua-linha-de-base.json`, a `main` antes da biblioteca ampliada).

| defeito | o que é | sem dor | % | linha de base | com dor | % | linha de base |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A2 | dia com menos de 3 exercícios ou sem multiarticular | 357 | 1,0% | 7,5% | 14.974 | 20,6% | 23,5% |
| A3 | dia mais longo acima de 110% dos minutos | 2.309 | 6,4% | 9,8% | 2.622 | 3,6% | 4,5% |
| A4 | dia típico abaixo de 70% dos minutos, sem o aviso | 1.831 | 5,0% | 5,3% | 0 | 0,0% | 0,0% |
| B1 | o mesmo exercício em todos os dias havendo outro do mesmo nível | 0 | 0,0% | 0,3% | 780 | 1,1% | 1,3% |
| C1 | prioritário abaixo da meta com tempo e exercício | 437 | 1,2% | 4,1% | 858 | 1,2% | 5,8% |
| D1 | empurrar ÷ puxar acima de 1,5 havendo como puxar | 314 | 0,9% | 6,1% | 190 | 0,3% | 3,2% |
| D3 | quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto) | 0 | 0,0% | 1,6% | 0 | 0,0% | 0,3% |
| E1 | não prioritário com 1 a 3 séries havendo exercício e tempo | 38 | 0,1% | 0,2% | 0 | 0,0% | 0,0% |
| seguranca | exercício impossível, acima da complexidade ou numa região com dor > 5 | 0 | 0,0% | 0,0% | 0 | 0,0% | 0,0% |
| **sem nenhum defeito** |  | 31.255 | **86,1%** |  | 53.923 | 74,3% |  |
| sem defeito, fora o D1 |  | 31.419 | 86,6% |  | 54.007 | 74,4% |  |

Como cada limite é medido (as definições do protótipo de `g-biblioteca-ampliada.md` foram descartadas com o rascunho; estas reproduzem a linha de base dele em todos os números publicados, menos o D1): o dia típico (A4) é a mediana dos dias; "tem tempo" (C1, E1) é o dia mais longo abaixo de 85% dos minutos; o foco (C1, C2) só conta músculos com exercício possível, e C2 compara com a mediana dos não prioritários que têm exercício possível; D1 e D3 só valem quando o equipamento permite puxar, e treinar quadríceps e posteriores. **O D1 usa o limite escrito na tabela 4.7 (empurrar ÷ puxar acima de 1,5)**: dá 6,1% na `main`, e não os 0,9% do protótipo, cuja leitura exata se perdeu. Por isso a linha "fora o D1" é a comparável com os 73,4% (hoje) e os 83,8% (final) do protótipo.

## Notas (devem melhorar)

% dos programas sem dor. B2 e B3 só existem com 3 dias ou mais (a coluna ao lado dá a fatia desses).

| nota | o que é | programas | % (sem dor) | % (3 dias ou mais) |
| --- | --- | ---: | ---: | ---: |
| A1 | exercícios por dia fora da faixa dos minutos | 3.644 | 10,0% |  |
| A5 | dia mais curto abaixo de 60% do mais longo | 4.829 | 13,3% |  |
| B2 | o mesmo exercício em todos os dias sem opção do mesmo nível | 5.665 | 15,6% | 19,5% |
| B3 | dois exercícios ou mais em todos os dias | 2.870 | 7,9% | 9,9% |
| C2 | o foco não passa da mediana dos outros músculos | 4.877 | 13,4% |  |
| G1 | dia com 3 ou mais cartões de texto | 5.122 | 14,1% |  |

## Medidas (sem dor)

| medida | valor |
| --- | ---: |
| exercícios por dia (média) | 5,58 |
| exercícios diferentes por semana (média) | 15,8 |
| prescrições sem nenhuma alternativa | 27,8% |
| cartões de texto por dia (média) | 0,68 |
| funções com 0 opção / com 1, somando os 55 cenários (intermediário) | 277 / 356 |

## Por grupo de cenário

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| atalhos (6) | 3.960 | 66,5% | 1,1% | 9,5% | 22,2% | 0,0% | 0,1% | 1,1% | 0,0% | 0,4% | 0,0% | 16,9% | 6,05 | 21 | 0,0% | 56,2% |
| personas (6) | 3.960 | 70,3% | 3,2% | 9,9% | 16,4% | 0,0% | 0,1% | 1,0% | 0,0% | 0,4% | 0,0% | 19,0% | 5,94 | 19,8 | 0,1% | 43,2% |
| sem nada (1) | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 13,2 | 26,7% | 0,0% |
| um item só (38) | 25.080 | 92,8% | 0,2% | 4,9% | 0,0% | 0,0% | 1,7% | 0,8% | 0,0% | 0,0% | 0,0% | 13,3% | 5,43 | 14 | 21,9% | 2,0% |
| pares de casa (4) | 2.640 | 73,3% | 4,9% | 10,8% | 11,4% | 0,0% | 0,1% | 1,2% | 0,0% | 0,3% | 0,0% | 20,0% | 5,87 | 18,9 | 0,1% | 26,3% |

## Por nível

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| iniciante | 12.100 | 87,9% | 1,0% | 4,1% | 5,4% | 0,0% | 1,3% | 0,5% | 0,0% | 0,1% | 0,0% | 15,5% | 5,54 | 14,7 | 40,9% | 15,6% |
| intermediario | 12.100 | 86,6% | 1,0% | 6,7% | 5,1% | 0,0% | 0,4% | 0,9% | 0,0% | 0,1% | 0,0% | 14,4% | 5,59 | 16,3 | 2,9% | 13,4% |
| avancado | 12.100 | 83,8% | 1,0% | 8,4% | 4,6% | 0,0% | 1,9% | 1,1% | 0,0% | 0,1% | 0,0% | 14,5% | 5,62 | 16,3 | 3,0% | 13,3% |

## Por minutos

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 min | 9.075 | 75,8% | 3,9% | 20,5% | 0,0% | 0,0% | 0,0% | 2,4% | 0,0% | 0,0% | 0,0% | 32,0% | 3,98 | 12,3 | 13,9% | 5,6% |
| 45 min | 9.075 | 94,0% | 0,0% | 4,4% | 0,6% | 0,0% | 0,3% | 0,7% | 0,0% | 0,0% | 0,0% | 15,7% | 5,59 | 15,7 | 15,4% | 13,8% |
| 60 min | 9.075 | 92,7% | 0,0% | 0,6% | 6,2% | 0,0% | 0,2% | 0,3% | 0,0% | 0,0% | 0,0% | 8,1% | 6,26 | 17,2 | 16,5% | 17,5% |
| 90 min | 9.075 | 81,9% | 0,0% | 0,0% | 13,4% | 0,0% | 4,3% | 0,0% | 0,0% | 0,4% | 0,0% | 3,3% | 6,51 | 17,8 | 16,6% | 19,6% |

## Por dias

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 dias | 7.260 | 80,3% | 0,0% | 15,2% | 0,0% | 0,0% | 2,9% | 2,5% | 0,0% | 0,5% | 0,0% | 24,5% | 6,72 | 12,1 | 0,0% | 5,9% |
| 3 dias | 7.260 | 87,1% | 0,0% | 8,5% | 2,9% | 0,0% | 0,4% | 1,6% | 0,0% | 0,0% | 0,0% | 12,5% | 6,01 | 14,5 | 30,8% | 7,9% |
| 4 dias | 7.260 | 90,9% | 0,0% | 3,7% | 4,5% | 0,0% | 0,9% | 0,1% | 0,0% | 0,0% | 0,0% | 9,5% | 5,59 | 16,2 | 15,8% | 15,5% |
| 5 dias | 7.260 | 86,8% | 2,4% | 2,5% | 7,8% | 0,0% | 1,0% | 0,0% | 0,0% | 0,0% | 0,0% | 12,6% | 5,27 | 17,2 | 15,8% | 17,7% |
| 6 dias | 7.260 | 85,4% | 2,5% | 1,9% | 10,0% | 0,0% | 0,8% | 0,1% | 0,0% | 0,0% | 0,0% | 14,9% | 5,25 | 18,8 | 15,6% | 23,6% |

## Por foco

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| nenhum | 3.300 | 89,5% | 1,5% | 1,7% | 6,5% | 0,0% | 0,0% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 5,34 | 15,4 | 15,4% | 13,4% |
| peito | 3.300 | 83,5% | 0,0% | 5,2% | 6,1% | 0,0% | 2,4% | 6,0% | 0,0% | 0,3% | 0,0% | 0,4% | 5,39 | 15,4 | 15,4% | 14,7% |
| costas | 3.300 | 84,4% | 1,5% | 4,7% | 6,2% | 0,0% | 2,6% | 0,7% | 0,0% | 0,0% | 0,0% | 1,3% | 5,36 | 15,4 | 15,4% | 12,9% |
| ombros | 3.300 | 92,7% | 0,0% | 1,6% | 5,5% | 0,0% | 0,1% | 0,0% | 0,0% | 0,0% | 0,0% | 6,9% | 5,59 | 15,8 | 15,4% | 16,8% |
| bracos | 3.300 | 91,7% | 0,9% | 2,0% | 5,3% | 0,0% | 0,1% | 0,2% | 0,0% | 0,0% | 0,0% | 8,2% | 5,48 | 15,7 | 17,0% | 15,6% |
| pernas | 3.300 | 84,8% | 1,5% | 11,0% | 2,6% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 45,4% | 5,81 | 16,2 | 15,2% | 12,4% |
| gluteos | 3.300 | 87,5% | 1,5% | 6,3% | 5,3% | 0,0% | 0,1% | 0,0% | 0,0% | 0,0% | 0,0% | 0,4% | 5,84 | 16,3 | 15,1% | 13,0% |
| abdomen | 3.300 | 91,6% | 1,0% | 1,5% | 5,9% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 22,8% | 5,48 | 15,4 | 15,4% | 12,1% |
| superiores | 3.300 | 83,6% | 1,7% | 8,7% | 3,8% | 0,0% | 1,3% | 1,6% | 0,0% | 0,0% | 0,0% | 14,1% | 5,7 | 15,9 | 17,0% | 16,7% |
| inferiores | 3.300 | 75,4% | 1,5% | 19,5% | 2,5% | 0,0% | 2,2% | 0,0% | 0,0% | 0,0% | 0,0% | 46,7% | 6,02 | 16,5 | 15,0% | 13,1% |
| peito+costas | 3.300 | 82,5% | 0,0% | 7,8% | 5,8% | 0,0% | 3,4% | 1,1% | 0,0% | 0,0% | 0,0% | 1,7% | 5,41 | 15,3 | 15,4% | 14,6% |

## Por cenário

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | 660 | 63,8% | 0,0% | 8,8% | 26,4% | 0,0% | 0,0% | 1,1% | 0,0% | 0,5% | 0,0% | 15,7% | 6,1 | 22,4 | 0,0% | 88,5% |
| academia+ | 660 | 63,3% | 0,0% | 8,8% | 26,8% | 0,0% | 0,0% | 1,1% | 0,0% | 0,5% | 0,0% | 15,3% | 6,1 | 22,4 | 0,0% | 88,5% |
| bairro | 660 | 63,6% | 0,0% | 8,0% | 26,7% | 0,0% | 0,2% | 0,9% | 0,0% | 1,2% | 0,0% | 15,5% | 6,11 | 20,7 | 0,0% | 76,8% |
| banco+halteres-leves | 660 | 85,8% | 7,3% | 8,3% | 0,0% | 0,0% | 0,2% | 0,8% | 0,0% | 0,0% | 0,0% | 18,5% | 5,82 | 18,9 | 0,0% | 35,8% |
| bruno | 660 | 62,3% | 0,0% | 12,0% | 25,3% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 17,7% | 6,08 | 21,8 | 0,0% | 34,5% |
| casa | 660 | 53,9% | 6,5% | 12,0% | 27,9% | 0,0% | 0,2% | 1,2% | 0,0% | 0,9% | 0,0% | 18,8% | 5,94 | 18,4 | 0,0% | 7,3% |
| casa+ | 660 | 62,1% | 0,0% | 10,8% | 26,4% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 17,3% | 6,09 | 21,8 | 0,0% | 17,3% |
| condominio | 660 | 93,2% | 0,0% | 6,4% | 0,0% | 0,0% | 0,2% | 0,8% | 0,0% | 0,0% | 0,0% | 18,0% | 5,95 | 19,9 | 0,0% | 47,7% |
| condominio+ | 660 | 62,7% | 0,0% | 10,2% | 26,1% | 0,0% | 0,0% | 1,1% | 0,0% | 0,5% | 0,0% | 16,2% | 6,1 | 21,1 | 0,0% | 87,9% |
| diego | 660 | 58,9% | 6,1% | 12,1% | 23,5% | 0,0% | 0,0% | 1,1% | 0,0% | 0,6% | 0,0% | 22,0% | 5,93 | 19,9 | 0,2% | 42,6% |
| elasticos | 660 | 58,6% | 6,1% | 12,7% | 23,0% | 0,0% | 0,0% | 1,4% | 0,0% | 0,6% | 0,0% | 22,0% | 5,93 | 19,1 | 0,2% | 37,7% |
| halteres | 660 | 92,7% | 0,0% | 6,5% | 0,0% | 0,0% | 0,2% | 1,1% | 0,0% | 0,0% | 0,0% | 18,3% | 5,79 | 18,7 | 0,0% | 31,8% |
| halteres-banco | 660 | 85,8% | 7,3% | 8,3% | 0,0% | 0,0% | 0,2% | 0,8% | 0,0% | 0,0% | 0,0% | 18,5% | 5,82 | 18,9 | 0,0% | 35,8% |
| halteres+bola | 660 | 92,9% | 0,0% | 6,4% | 0,0% | 0,0% | 0,2% | 1,1% | 0,0% | 0,0% | 0,0% | 18,3% | 5,79 | 18,6 | 0,0% | 31,8% |
| so:abdominal_maquina | 660 | 95,8% | 0,0% | 3,2% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 11,0% | 5,55 | 13 | 26,7% | 0,0% |
| so:anilhas_e_manoplas | 660 | 92,7% | 0,0% | 6,5% | 0,0% | 0,0% | 0,2% | 1,1% | 0,0% | 0,0% | 0,0% | 18,3% | 5,79 | 18,7 | 0,0% | 31,8% |
| so:banco_romano | 660 | 94,2% | 0,0% | 4,5% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 0,0% | 14,3% | 5,51 | 13,6 | 26,7% | 0,0% |
| so:barra_fixa | 660 | 90,3% | 0,0% | 6,5% | 0,0% | 0,0% | 1,7% | 2,9% | 0,0% | 0,0% | 0,0% | 16,8% | 4,91 | 15,1 | 6,7% | 0,0% |
| so:barra_hexagonal | 660 | 96,1% | 0,0% | 2,9% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 12,7% | 5,53 | 13,1 | 26,7% | 0,0% |
| so:barra_longa | 660 | 90,5% | 0,0% | 5,3% | 0,0% | 0,0% | 3,2% | 2,0% | 0,0% | 0,0% | 0,0% | 17,2% | 5,09 | 13,9 | 33,3% | 0,0% |
| so:barra_w | 660 | 94,7% | 0,0% | 3,8% | 0,0% | 0,0% | 1,5% | 0,0% | 0,0% | 0,0% | 0,0% | 13,0% | 5,84 | 13,8 | 33,9% | 0,0% |
| so:bola_suica | 660 | 95,0% | 0,0% | 4,1% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 13,0% | 5,53 | 14,1 | 26,7% | 0,0% |
| so:cadeira_abdutora_adutora | 660 | 95,5% | 0,0% | 3,3% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 0,0% | 11,7% | 5,55 | 13,2 | 26,7% | 0,0% |
| so:cadeira_extensora | 660 | 96,7% | 0,0% | 2,6% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 9,0% | 5,73 | 13,7 | 26,7% | 0,0% |
| so:cadeira_flexora | 660 | 96,2% | 0,0% | 3,0% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 10,2% | 5,53 | 13,2 | 26,7% | 0,0% |
| so:caneleiras | 660 | 92,9% | 0,0% | 5,6% | 0,0% | 0,0% | 1,5% | 0,0% | 0,0% | 0,0% | 0,0% | 12,5% | 6,09 | 14,2 | 27,7% | 10,9% |
| so:desenvolvimento_maquina | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 13,2 | 26,7% | 0,0% |
| so:estacao_polia_dupla | 660 | 81,2% | 6,5% | 12,7% | 0,0% | 0,0% | 0,9% | 1,1% | 0,0% | 0,0% | 0,0% | 24,0% | 5,85 | 16,6 | 7,9% | 0,0% |
| so:estacao_puxada | 660 | 86,4% | 0,0% | 7,7% | 0,0% | 0,0% | 4,4% | 2,9% | 0,0% | 0,0% | 0,0% | 17,0% | 4,81 | 13,7 | 15,2% | 0,0% |
| so:estacao_remada | 660 | 87,7% | 0,0% | 4,7% | 0,0% | 0,0% | 4,4% | 4,4% | 0,0% | 0,0% | 0,0% | 16,2% | 4,81 | 13,8 | 13,3% | 0,0% |
| so:gluteo_maquina | 660 | 97,1% | 0,0% | 1,8% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 10,7% | 5,5 | 13,1 | 26,7% | 0,0% |
| so:graviton | 660 | 86,5% | 0,0% | 7,7% | 0,0% | 0,0% | 4,4% | 2,6% | 0,0% | 0,0% | 0,0% | 16,8% | 4,83 | 14,3 | 12,7% | 0,0% |
| so:hack | 660 | 95,5% | 0,0% | 3,5% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,55 | 13 | 26,7% | 0,0% |
| so:halteres_fixos | 660 | 92,9% | 0,0% | 6,8% | 0,0% | 0,0% | 0,2% | 0,6% | 0,0% | 0,0% | 0,0% | 18,3% | 5,78 | 18,6 | 0,0% | 31,7% |
| so:kettlebell | 660 | 83,8% | 1,1% | 11,5% | 0,0% | 0,0% | 2,7% | 2,6% | 0,0% | 0,0% | 0,0% | 13,8% | 5,11 | 14,7 | 20,0% | 0,0% |
| so:leg_press | 660 | 95,5% | 0,0% | 3,5% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 10,5% | 5,56 | 13,1 | 26,7% | 0,0% |
| so:mesa_flexora | 660 | 96,2% | 0,0% | 3,0% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 10,2% | 5,53 | 13,2 | 26,7% | 0,0% |
| so:mini_band | 660 | 96,1% | 0,0% | 3,3% | 0,0% | 0,0% | 0,6% | 0,0% | 0,0% | 0,0% | 0,0% | 9,7% | 5,73 | 13,8 | 26,7% | 0,0% |
| so:multifuncional | 660 | 91,7% | 0,0% | 6,2% | 0,0% | 0,0% | 1,4% | 1,4% | 0,0% | 0,0% | 0,0% | 15,3% | 5,05 | 14,5 | 6,7% | 0,0% |
| so:panturrilha_em_pe_maquina | 660 | 95,3% | 0,0% | 3,6% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 10,5% | 5,56 | 13,2 | 26,7% | 0,0% |
| so:panturrilha_sentada_maquina | 660 | 95,5% | 0,0% | 3,5% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 10,7% | 5,55 | 13,2 | 26,7% | 0,0% |
| so:paralelas | 660 | 95,3% | 0,0% | 3,8% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,7% | 5,54 | 14,3 | 26,7% | 0,0% |
| so:rack_de_agachamento | 660 | 87,9% | 0,0% | 6,8% | 0,0% | 0,0% | 4,4% | 1,5% | 0,0% | 0,0% | 0,0% | 15,3% | 4,79 | 13,5 | 20,0% | 0,0% |
| so:remada_articulada | 660 | 87,7% | 0,0% | 4,7% | 0,0% | 0,0% | 4,4% | 4,4% | 0,0% | 0,0% | 0,0% | 16,2% | 4,81 | 13,8 | 13,3% | 0,0% |
| so:roda_abdominal | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 13,6 | 26,7% | 0,0% |
| so:rosca_maquina | 660 | 95,0% | 0,0% | 3,5% | 0,0% | 0,0% | 1,5% | 0,0% | 0,0% | 0,0% | 0,0% | 12,8% | 5,84 | 13,8 | 33,9% | 0,0% |
| so:smith | 660 | 88,3% | 0,0% | 6,8% | 0,0% | 0,0% | 4,4% | 1,1% | 0,0% | 0,0% | 0,0% | 15,0% | 4,8 | 13,5 | 20,0% | 0,0% |
| so:step | 660 | 95,3% | 0,0% | 3,8% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,8% | 5,52 | 13,5 | 26,7% | 0,0% |
| so:supino_maquina | 660 | 95,8% | 0,0% | 3,5% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,56 | 13,5 | 18,9% | 0,0% |
| so:suspensao | 660 | 87,3% | 0,9% | 7,7% | 0,0% | 0,0% | 3,5% | 2,0% | 0,0% | 0,0% | 0,0% | 10,3% | 5,15 | 15 | 20,0% | 0,0% |
| so:triceps_maquina | 660 | 95,2% | 0,0% | 3,6% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 0,0% | 13,8% | 5,55 | 13,2 | 26,7% | 0,0% |
| so:voador | 660 | 95,8% | 0,0% | 3,8% | 0,0% | 0,0% | 0,5% | 0,0% | 0,0% | 0,0% | 0,0% | 11,5% | 5,71 | 13,9 | 20,8% | 0,0% |
| step+elasticos | 660 | 55,6% | 6,1% | 16,2% | 22,6% | 0,0% | 0,0% | 1,5% | 0,0% | 0,5% | 0,0% | 22,0% | 5,92 | 19,6 | 0,2% | 37,7% |
| suspensao+elasticos | 660 | 58,8% | 6,4% | 12,4% | 22,9% | 0,0% | 0,0% | 1,4% | 0,0% | 0,6% | 0,0% | 21,0% | 5,93 | 18,5 | 0,2% | 0,0% |
| vazio | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 13,2 | 26,7% | 0,0% |

## Uso de cada exercício

Programas sem dor em que o exercício aparece (os sem animação aprovada, que aparecem como cartão de texto, vêm marcados).

| exercício | animação | programas | % |
| --- | --- | ---: | ---: |
| abdominal-chao | sim | 32.680 | 90,0% |
| flexao | sim | 30.558 | 84,2% |
| panturrilha-degrau | sim | 29.720 | 81,9% |
| afundo-peso-corpo | sim | 26.402 | 72,7% |
| flexao-joelho-deslizante | sim | 25.633 | 70,6% |
| ponte-gluteo | sim | 24.051 | 66,3% |
| abdominal-invertido | sim | 23.063 | 63,5% |
| extensao-triceps-peso-corpo | sim | 21.673 | 59,7% |
| agachamento-peso-corpo | sim | 21.127 | 58,2% |
| abertura-t-deitado | sim | 20.290 | 55,9% |
| flexao-pes-elevados | sim | 19.581 | 53,9% |
| flexao-fechada | sim | 15.840 | 43,6% |
| afundo-tras-peso-corpo | sim | 15.355 | 42,3% |
| nordico | sim | 15.317 | 42,2% |
| afundo | sim | 9.240 | 25,5% |
| stiff | sim | 9.240 | 25,5% |
| triceps-frances-halter | sim | 7.171 | 19,8% |
| elevacao-halteres | sim | 6.751 | 18,6% |
| pike | sim | 5.981 | 16,5% |
| supino-reto | sim | 5.940 | 16,4% |
| remada-curvada-halteres | sim | 5.621 | 15,5% |
| ponte-gluteo-halter | sim | 5.460 | 15,0% |
| remada-apoiada | sim | 4.620 | 12,7% |
| supino-inclinado | sim | 4.620 | 12,7% |
| goblet | sim | 4.327 | 11,9% |
| remada-unilateral-sem-banco | sim | 4.276 | 11,8% |
| aducao-deitado | sim | 4.214 | 11,6% |
| panturrilha | sim | 4.180 | 11,5% |
| bulgaro | sim | 3.964 | 10,9% |
| bulgaro-peso-corpo | sim | 3.876 | 10,7% |
| flexao-joelho-elastico | sim | 3.863 | 10,6% |
| stiff-unilateral | sim | 3.851 | 10,6% |
| rosca-alternada | sim | 3.725 | 10,3% |
| rosca-inclinada | sim | 3.715 | 10,2% |
| extensao-joelho-elastico | sim | 3.564 | 9,8% |
| crucifixo-halteres | **cartão** | 3.323 | 9,2% |
| abdominal-bola | sim | 3.292 | 9,1% |
| abducao-deitado | sim | 3.184 | 8,8% |
| cadeira-flexora | **cartão** | 3.146 | 8,7% |
| triceps-testa-halteres | **cartão** | 3.108 | 8,6% |
| flexao-bola | sim | 3.101 | 8,5% |
| crucifixo-invertido-curvado | **cartão** | 3.085 | 8,5% |
| crucifixo-invertido-sentado | **cartão** | 3.009 | 8,3% |
| cadeira-extensora | **cartão** | 3.003 | 8,3% |
| agachamento-elastico | sim | 2.640 | 7,3% |
| puxada-frente | **cartão** | 2.640 | 7,3% |
| puxada-unilateral | sim | 2.640 | 7,3% |
| stiff-elastico | sim | 2.640 | 7,3% |
| triceps-frances-unilateral-halter | **cartão** | 2.571 | 7,1% |
| crucifixo-inverso | **cartão** | 2.549 | 7,0% |
| remada-elastico | sim | 2.385 | 6,6% |
| triceps-elastico-acima | sim | 2.329 | 6,4% |
| rosca-martelo | sim | 2.262 | 6,2% |
| crucifixo-elastico | sim | 2.099 | 5,8% |
| elevacao-lateral-elastico | sim | 2.035 | 5,6% |
| face-pull-elastico | sim | 1.980 | 5,5% |
| panturrilha-chao | sim | 1.963 | 5,4% |
| panturrilha-bilateral-step | sim | 1.951 | 5,4% |
| elevacao-lateral | sim | 1.901 | 5,2% |
| remada-unilateral-halter | sim | 1.856 | 5,1% |
| puxada-elastico | sim | 1.851 | 5,1% |
| barra-fixa | sim | 1.760 | 4,8% |
| triceps-frances | sim | 1.746 | 4,8% |
| elevacao-lateral-unilateral-elastico | **cartão** | 1.726 | 4,8% |
| coice-maquina | **cartão** | 1.617 | 4,5% |
| abdominal-maquina | **cartão** | 1.616 | 4,5% |
| rosca-elastico | sim | 1.607 | 4,4% |
| puxada-barra-reta | **cartão** | 1.597 | 4,4% |
| abdominal-polia | sim | 1.594 | 4,4% |
| supino-chao-halteres | **cartão** | 1.556 | 4,3% |
| panturrilha-leg-press | **cartão** | 1.532 | 4,2% |
| crucifixo-invertido-polia | sim | 1.531 | 4,2% |
| barra-fixa-supinada | sim | 1.454 | 4,0% |
| rosca-scott-banco-inclinado | **cartão** | 1.427 | 3,9% |
| desenvolvimento-unilateral | **cartão** | 1.396 | 3,8% |
| leg-press | **cartão** | 1.320 | 3,6% |
| remada-baixa-estacao | **cartão** | 1.320 | 3,6% |
| remada-invertida | **cartão** | 1.320 | 3,6% |
| remada-suspensao | sim | 1.320 | 3,6% |
| crucifixo-polia | sim | 1.262 | 3,5% |
| desenvolvimento | sim | 1.260 | 3,5% |
| stiff-kettlebell | sim | 1.248 | 3,4% |
| triceps-suspensao | sim | 1.238 | 3,4% |
| supino-maquina | **cartão** | 1.231 | 3,4% |
| extensao-joelho-caneleira | sim | 1.221 | 3,4% |
| afundo-tras | **cartão** | 1.214 | 3,3% |
| remada-curvada-elastico | **cartão** | 1.212 | 3,3% |
| remada-baixa | sim | 1.211 | 3,3% |
| rosca-maquina | **cartão** | 1.194 | 3,3% |
| barra-fixa-negativa | **cartão** | 1.178 | 3,2% |
| hip-thrust | **cartão** | 1.152 | 3,2% |
| agachamento-smith | **cartão** | 1.102 | 3,0% |
| panturrilha-em-pe-maquina | **cartão** | 1.100 | 3,0% |
| rosca-suspensao | sim | 1.094 | 3,0% |
| triceps-corda | sim | 981 | 2,7% |
| rosca-martelo-elastico | **cartão** | 968 | 2,7% |
| crucifixo-inclinado-halteres | **cartão** | 945 | 2,6% |
| agachamento-barra | **cartão** | 880 | 2,4% |
| triceps-frances-kettlebell | sim | 840 | 2,3% |
| rosca-polia-costas | **cartão** | 816 | 2,2% |
| yt-suspensao | sim | 786 | 2,2% |
| abertura-elastico | **cartão** | 747 | 2,1% |
| desenvolvimento-elastico | sim | 720 | 2,0% |
| panturrilha-sentada-halter | sim | 702 | 1,9% |
| afundo-kettlebell | sim | 662 | 1,8% |
| barra-fixa-graviton | **cartão** | 660 | 1,8% |
| goblet-kettlebell | **cartão** | 660 | 1,8% |
| hack | **cartão** | 660 | 1,8% |
| hiperextensao | **cartão** | 660 | 1,8% |
| mesa-flexora | **cartão** | 660 | 1,8% |
| remada-articulada | **cartão** | 660 | 1,8% |
| remada-unilateral-kettlebell | sim | 660 | 1,8% |
| remada-unilateral-polia | sim | 660 | 1,8% |
| terra-hexagonal | **cartão** | 660 | 1,8% |
| flexao-joelho-suspensao | sim | 646 | 1,8% |
| ponte-kettlebell | sim | 637 | 1,8% |
| extensao-joelho-mini-band | **cartão** | 627 | 1,7% |
| mergulho | **cartão** | 614 | 1,7% |
| coice-caneleira | **cartão** | 609 | 1,7% |
| elevacao-lateral-caneleira | **cartão** | 603 | 1,7% |
| elevacao-joelhos | sim | 591 | 1,6% |
| triceps-frances-polia-unilateral | sim | 582 | 1,6% |
| rosca-barra-w | **cartão** | 558 | 1,5% |
| rosca-kettlebell | sim | 555 | 1,5% |
| face-pull | sim | 498 | 1,4% |
| voador | **cartão** | 479 | 1,3% |
| crucifixo-invertido-caneleira | **cartão** | 462 | 1,3% |
| supino-barra | **cartão** | 458 | 1,3% |
| remada-barra | **cartão** | 440 | 1,2% |
| terra-romeno-barra | **cartão** | 440 | 1,2% |
| elevacao-joelhos-paralelas | sim | 413 | 1,1% |
| triceps-maquina | **cartão** | 405 | 1,1% |
| mergulho-graviton | **cartão** | 392 | 1,1% |
| rosca-concentrada | **cartão** | 389 | 1,1% |
| abducao-elastico | **cartão** | 357 | 1,0% |
| stiff-unilateral-kettlebell | **cartão** | 354 | 1,0% |
| agachamento-halteres | **cartão** | 330 | 0,9% |
| coice-elastico | **cartão** | 327 | 0,9% |
| face-pull-suspensao | **cartão** | 294 | 0,8% |
| roda-abdominal | sim | 277 | 0,8% |
| crucifixo-polia-baixo | **cartão** | 272 | 0,7% |
| aducao-maquina | **cartão** | 253 | 0,7% |
| desenvolvimento-unilateral-kettlebell | sim | 248 | 0,7% |
| triceps-barra-reta | **cartão** | 225 | 0,6% |
| triceps-elastico-alto | **cartão** | 223 | 0,6% |
| aducao-caneleira | sim | 211 | 0,6% |
| supino-inclinado-polia | **cartão** | 210 | 0,6% |
| abducao-maquina | **cartão** | 206 | 0,6% |
| ponte-pes-bola | sim | 206 | 0,6% |
| abducao-caneleira | sim | 201 | 0,6% |
| panturrilha-sentada | **cartão** | 192 | 0,5% |
| desenvolvimento-maquina | **cartão** | 187 | 0,5% |
| flexao-elastico | sim | 176 | 0,5% |
| coice-polia | **cartão** | 118 | 0,3% |
| elevacao-lateral-unilateral | **cartão** | 117 | 0,3% |
| abdominal-declinado | **cartão** | 81 | 0,2% |
| abducao-mini-band | sim | 80 | 0,2% |
| rosca-scott | **cartão** | 58 | 0,2% |
| abducao-polia | **cartão** | 48 | 0,1% |
| abducao-deitado-mini-band | **cartão** | 36 | 0,1% |
| desenvolvimento-barra | **cartão** | 28 | 0,1% |
| bulgaro-suspensao | sim | 0 | 0,0% |
| caminhada-lateral-mini-band | **cartão** | 0 | 0,0% |
| desenvolvimento-em-pe-halteres | **cartão** | 0 | 0,0% |
| elevacao-lateral-deitado | **cartão** | 0 | 0,0% |
| pull-through | **cartão** | 0 | 0,0% |
| remada-unilateral-elastico | **cartão** | 0 | 0,0% |
| rosca-polia | sim | 0 | 0,0% |
| supino-polia | **cartão** | 0 | 0,0% |
| supino-smith | **cartão** | 0 | 0,0% |
| voador-invertido | **cartão** | 0 | 0,0% |

## Exemplos

O 1º programa da grade com cada defeito e nota.

- **A2** (sem dor), casa · iniciante · 5 dias · 30 min · foco nenhum · sem dor: Empurrar sem multiarticular.
  - Superior (30 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 3 | Inferior (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Empurrar (22 min): elevacao-halteres 3, triceps-frances-halter 4, crucifixo-elastico 3 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (27 min): afundo 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, flexao-joelho-elastico 2
- **A3** (sem dor), casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: dia de 36 min em 30.
  - Corpo todo A (36 min): goblet 3, flexao 2, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- **A4** (sem dor), casa · iniciante · 3 dias · 90 min · foco nenhum · sem dor: dia típico de 55 min em 90, sem o aviso.
  - Corpo todo A (49 min): goblet 2, flexao 2, remada-curvada-halteres 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (59 min): stiff 2, flexao 2, remada-unilateral-sem-banco 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-invertido 2 | Corpo todo C (55 min): afundo 2, supino-chao-halteres 2, remada-curvada-halteres 2, ponte-gluteo-halter 3, elevacao-halteres 3, triceps-testa-halteres 2, flexao-joelho-elastico 2, abdominal-chao 2
- **C1** (sem dor), casa · avancado · 2 dias · 90 min · foco peito · sem dor: peito com 12 de 14 e o dia mais longo em 76 de 90 min.
  - Corpo todo A (76 min): flexao 4, goblet 2, remada-curvada-halteres 3, stiff 3, crucifixo-elastico 4, triceps-frances-halter 2, elevacao-halteres 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (74 min): flexao-pes-elevados 4, afundo 2, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-curvado 3, elevacao-halteres 3, abdominal-invertido 2
- **D1** (sem dor), casa · iniciante · 2 dias · 30 min · foco peito · sem dor: empurrar 8 ÷ puxar 4 séries.
  - Corpo todo A (40 min): flexao 4, goblet 3, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao 4, afundo 3, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- **E1** (sem dor), casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: gluteos com 3,5 séries e o dia mais longo em 70 de 90 min.
  - Corpo todo A (70 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (69 min): afundo 2, flexao 2, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2
- **A1** (sem dor), casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A com 6 exercícios em 30 min (faixa 3–5).
  - Corpo todo A (36 min): goblet 3, flexao 2, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- **A5** (sem dor), casa · iniciante · 4 dias · 90 min · foco superiores · sem dor: dias de 38 a 70 min.
  - Superior A (70 min): flexao 3, remada-curvada-halteres 3, remada-unilateral-sem-banco 3, desenvolvimento-unilateral 2, triceps-frances-halter 3, elevacao-halteres 3, rosca-alternada 3, crucifixo-elastico 3, crucifixo-invertido-sentado 2 | Inferior A (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 2 | Superior B (57 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, desenvolvimento-unilateral 2, elevacao-halteres 3, rosca-martelo 2, triceps-testa-halteres 3, crucifixo-elastico 2, crucifixo-invertido-sentado 2 | Inferior B (53 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, elevacao-halteres 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-invertido 2
- **B2** (sem dor), elasticos · avancado · 3 dias · 90 min · foco superiores · sem dor: elevacao-lateral-elastico em todos os dias, sem outro do mesmo nível.
  - Corpo todo A (81 min): flexao 3, puxada-elastico 4, remada-curvada-elastico 2, agachamento-elastico 2, triceps-elastico-acima 4, elevacao-lateral-elastico 4, crucifixo-elastico 3, rosca-elastico 3, flexao-joelho-elastico 2, abdominal-chao 2 | Corpo todo B (79 min): flexao-pes-elevados 2, remada-elastico 4, stiff-elastico 2, desenvolvimento-elastico 2, rosca-martelo-elastico 3, elevacao-lateral-elastico 4, extensao-joelho-elastico 2, panturrilha-degrau 4, face-pull-elastico 2, abdominal-invertido 2 | Corpo todo C (89 min): flexao 2, puxada-elastico 4, flexao-fechada 4, afundo-peso-corpo 2, ponte-gluteo 3, elevacao-lateral-unilateral-elastico 4, rosca-elastico 2, elevacao-lateral-elastico 2, triceps-elastico-acima 2, flexao-joelho-elastico 2, abdominal-chao 2
- **B3** (sem dor), vazio · iniciante · 3 dias · 45 min · foco nenhum · sem dor: flexao, flexao-joelho-deslizante em todos os dias.
  - Corpo todo A (42 min): agachamento-peso-corpo 4, flexao 2, flexao-joelho-deslizante 4, extensao-triceps-peso-corpo 3, abdominal-chao 2 | Corpo todo B (43 min): flexao 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-degrau 4, abertura-t-deitado 4, abdominal-invertido 2 | Corpo todo C (39 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, flexao-fechada 2, flexao-joelho-deslizante 2, abdominal-chao 2
- **C2** (sem dor), casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 3.
  - Corpo todo A (36 min): goblet 3, flexao 2, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
- **G1** (sem dor), casa · iniciante · 3 dias · 60 min · foco bracos · sem dor: Corpo todo C com 3 cartões de texto.
  - Corpo todo A (57 min): goblet 2, flexao 2, remada-curvada-halteres 2, triceps-frances-halter 4, rosca-alternada 3, flexao-joelho-elastico 3, elevacao-halteres 3, abdominal-chao 2 | Corpo todo B (59 min): stiff 3, flexao 2, remada-unilateral-sem-banco 2, rosca-martelo 2, extensao-joelho-elastico 2, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-invertido 2 | Corpo todo C (58 min): afundo 2, supino-chao-halteres 2, remada-curvada-halteres 2, ponte-gluteo-halter 3, triceps-testa-halteres 3, rosca-concentrada 2, elevacao-halteres 3, abdominal-chao 2
- **A2** (com dor), casa · iniciante · 4 dias · 30 min · foco nenhum · ombro 7: Superior A com 2 exercícios.
  - Superior A (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior A (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Superior B (12 min): rosca-martelo 3, triceps-elastico-alto 3 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2
- **A3** (com dor), casa · iniciante · 2 dias · 30 min · foco nenhum · joelho 7: dia de 36 min em 30.
  - Corpo todo A (36 min): flexao 2, remada-curvada-halteres 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (26 min): flexao 2, remada-unilateral-sem-banco 2, stiff-unilateral 2, rosca-alternada 2+drop
- **B1** (com dor), casa · iniciante · 3 dias · 45 min · foco nenhum · ombro 7: ponte-gluteo-halter em todos os dias, com outro do mesmo nível possível e sem uso.
  - Corpo todo A (38 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-martelo 3, triceps-elastico-alto 3, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 3, abdominal-invertido 2 | Corpo todo C (43 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
- **C1** (com dor), casa · iniciante · 2 dias · 90 min · foco bracos · ombro 7: triceps com 8 de 10 e o dia mais longo em 65 de 90 min.
  - Corpo todo A (55 min): goblet 2, stiff 3, rosca-alternada 4, rosca-concentrada 2, triceps-elastico-alto 4, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (65 min): afundo 2, ponte-gluteo-halter 3, rosca-martelo 4, triceps-elastico-alto 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, aducao-deitado 2, abdominal-invertido 2
- **D1** (com dor), casa · iniciante · 2 dias · 30 min · foco peito · joelho 7: empurrar 8 ÷ puxar 4 séries.
  - Corpo todo A (43 min): flexao 4, remada-curvada-halteres 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao 4, remada-unilateral-sem-banco 2, stiff-unilateral 2, rosca-alternada 2+drop
- **A1** (com dor), casa · iniciante · 2 dias · 30 min · foco nenhum · joelho 7: Corpo todo A com 6 exercícios em 30 min (faixa 3–5).
  - Corpo todo A (36 min): flexao 2, remada-curvada-halteres 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (26 min): flexao 2, remada-unilateral-sem-banco 2, stiff-unilateral 2, rosca-alternada 2+drop
- **A5** (com dor), casa · iniciante · 4 dias · 30 min · foco nenhum · ombro 7: dias de 12 a 30 min.
  - Superior A (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior A (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Superior B (12 min): rosca-martelo 3, triceps-elastico-alto 3 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2
- **B2** (com dor), casa · iniciante · 3 dias · 60 min · foco bracos · ombro 7: triceps-elastico-alto em todos os dias, sem outro do mesmo nível.
  - Corpo todo A (42 min): goblet 2, ponte-gluteo-halter 2, rosca-alternada 4, triceps-elastico-alto 4, flexao-joelho-elastico 2, abdominal-chao 2 | Corpo todo B (53 min): stiff 2, ponte-gluteo-halter 2, rosca-martelo 3, triceps-elastico-alto 2, extensao-joelho-elastico 2, panturrilha-degrau 3, aducao-deitado 2, abdominal-invertido 2 | Corpo todo C (54 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 4, rosca-concentrada 3, flexao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
- **B3** (com dor), casa · iniciante · 3 dias · 60 min · foco bracos · ombro 7: ponte-gluteo-halter, triceps-elastico-alto em todos os dias.
  - Corpo todo A (42 min): goblet 2, ponte-gluteo-halter 2, rosca-alternada 4, triceps-elastico-alto 4, flexao-joelho-elastico 2, abdominal-chao 2 | Corpo todo B (53 min): stiff 2, ponte-gluteo-halter 2, rosca-martelo 3, triceps-elastico-alto 2, extensao-joelho-elastico 2, panturrilha-degrau 3, aducao-deitado 2, abdominal-invertido 2 | Corpo todo C (54 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 4, rosca-concentrada 3, flexao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
- **C2** (com dor), casa · iniciante · 2 dias · 30 min · foco bracos · ombro 7: triceps com 0, mediana dos outros 4.
  - Corpo todo A (30 min): goblet 3, stiff 2, rosca-alternada 3+drop, panturrilha-degrau 4 | Corpo todo B (29 min): afundo 3, rosca-martelo 2+drop, flexao-joelho-elastico 2, abdominal-chao 4
- **G1** (com dor), casa · iniciante · 2 dias · 90 min · foco ombros · joelho 7: Corpo todo B com 3 cartões de texto.
  - Corpo todo A (75 min): flexao 2, remada-curvada-halteres 3, stiff 3, elevacao-halteres 4, elevacao-lateral-unilateral 2, triceps-frances-halter 3, panturrilha-degrau 4, crucifixo-elastico 2, rosca-martelo 2, abdominal-chao 2 | Corpo todo B (85 min): flexao 2, remada-unilateral-sem-banco 3, stiff-unilateral 3, desenvolvimento-unilateral 2, elevacao-halteres 4, rosca-alternada 2, crucifixo-invertido-sentado 3, aducao-deitado 2, abducao-elastico 3, abdominal-invertido 2

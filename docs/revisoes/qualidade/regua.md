# A régua da G5 na grade de 108.900 programas

> Gerado por `npm run auditoria:regua` (`scripts/auditoria/grade-regua.ts`, com as medidas de `scripts/auditoria/regua.ts`). Dados fictícios. Não editar à mão.

**108.900 programas** (36.300 sem dor): 55 cenários de equipamento × 3 níveis × 2 a 6 dias (a divisão recomendada) × 30, 45, 60, 90 min × 11 focos (nenhum, peito, costas, ombros, bracos, pernas, gluteos, abdomen, superiores, inferiores, peito+costas) × 3 situações de dor (sem dor, ombro 7, joelho 7). 0 bloqueados. A régua e as fontes de cada limite: `docs/pesquisa-v2/17-biblioteca-ampliada.md`, parte G5, tabela 4.7.

## Nenhum defeito pode piorar

Nenhum defeito acima da linha de base (`docs/revisoes/qualidade/regua-linha-de-base.json`, a `main` antes da biblioteca ampliada).

| defeito | o que é | sem dor | % | linha de base | com dor | % | linha de base |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A2 | dia com menos de 3 exercícios ou sem multiarticular | 2.732 | 7,5% | 7,5% | 17.086 | 23,5% | 23,5% |
| A3 | dia mais longo acima de 110% dos minutos | 3.553 | 9,8% | 9,8% | 3.262 | 4,5% | 4,5% |
| A4 | dia típico abaixo de 70% dos minutos, sem o aviso | 1.920 | 5,3% | 5,3% | 0 | 0,0% | 0,0% |
| B1 | o mesmo exercício em todos os dias havendo outro do mesmo nível | 116 | 0,3% | 0,3% | 920 | 1,3% | 1,3% |
| C1 | prioritário abaixo da meta com tempo e exercício | 1.505 | 4,1% | 4,1% | 4.235 | 5,8% | 5,8% |
| D1 | empurrar ÷ puxar acima de 1,5 havendo como puxar | 2.224 | 6,1% | 6,1% | 2.341 | 3,2% | 3,2% |
| D3 | quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto) | 597 | 1,6% | 1,6% | 192 | 0,3% | 0,3% |
| E1 | não prioritário com 1 a 3 séries havendo exercício e tempo | 90 | 0,2% | 0,2% | 0 | 0,0% | 0,0% |
| seguranca | exercício impossível, acima da complexidade ou numa região com dor > 5 | 0 | 0,0% | 0,0% | 0 | 0,0% | 0,0% |
| **sem nenhum defeito** |  | 25.914 | **71,4%** |  | 47.910 | 66,0% |  |
| sem defeito, fora o D1 |  | 26.703 | 73,6% |  | 48.462 | 66,8% |  |

Como cada limite é medido (as definições do protótipo de `g-biblioteca-ampliada.md` foram descartadas com o rascunho; estas reproduzem a linha de base dele em todos os números publicados, menos o D1): o dia típico (A4) é a mediana dos dias; "tem tempo" (C1, E1) é o dia mais longo abaixo de 85% dos minutos; o foco (C1, C2) só conta músculos com exercício possível, e C2 compara com a mediana dos não prioritários que têm exercício possível; D1 e D3 só valem quando o equipamento permite puxar, e treinar quadríceps e posteriores. **O D1 usa o limite escrito na tabela 4.7 (empurrar ÷ puxar acima de 1,5)**: dá 6,1% na `main`, e não os 0,9% do protótipo, cuja leitura exata se perdeu. Por isso a linha "fora o D1" é a comparável com os 73,4% (hoje) e os 83,8% (final) do protótipo.

## Notas (devem melhorar)

% dos programas sem dor. B2 e B3 só existem com 3 dias ou mais (a coluna ao lado dá a fatia desses).

| nota | o que é | programas | % (sem dor) | % (3 dias ou mais) |
| --- | --- | ---: | ---: | ---: |
| A1 | exercícios por dia fora da faixa dos minutos | 8.735 | 24,1% |  |
| A5 | dia mais curto abaixo de 60% do mais longo | 8.168 | 22,5% |  |
| B2 | o mesmo exercício em todos os dias sem opção do mesmo nível | 16.020 | 44,1% | 55,2% |
| B3 | dois exercícios ou mais em todos os dias | 5.217 | 14,4% | 18,0% |
| C2 | o foco não passa da mediana dos outros músculos | 11.983 | 33,0% |  |
| G1 | dia com 3 ou mais cartões de texto | 3.064 | 8,4% |  |

## Medidas (sem dor)

| medida | valor |
| --- | ---: |
| exercícios por dia (média) | 5,18 |
| exercícios diferentes por semana (média) | 12,9 |
| prescrições sem nenhuma alternativa | 49,1% |
| cartões de texto por dia (média) | 0,63 |
| funções com 0 opção / com 1, somando os 55 cenários (intermediário) | 348 / 509 |

## Por grupo de cenário

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| atalhos (6) | 3.960 | 56,7% | 1,7% | 15,8% | 23,1% | 0,0% | 2,3% | 2,0% | 2,3% | 0,8% | 0,0% | 6,06 | 20,2 | 4,2% | 46,5% |
| personas (6) | 3.960 | 58,5% | 5,0% | 16,6% | 17,2% | 1,2% | 2,4% | 1,7% | 2,6% | 1,1% | 0,0% | 5,93 | 17,9 | 13,6% | 19,3% |
| sem nada (1) | 660 | 89,8% | 0,0% | 4,8% | 0,0% | 0,0% | 4,7% | 0,0% | 1,1% | 0,0% | 0,0% | 4,91 | 9,5 | 80,0% | 0,0% |
| um item só (38) | 25.080 | 76,4% | 9,1% | 7,0% | 0,0% | 0,1% | 5,0% | 8,1% | 1,3% | 0,0% | 0,0% | 4,86 | 10,7 | 56,9% | 1,1% |
| pares de casa (4) | 2.640 | 60,3% | 7,5% | 18,7% | 12,2% | 1,7% | 1,6% | 1,5% | 2,8% | 0,6% | 0,0% | 5,85 | 16,5 | 20,0% | 6,6% |

## Por nível

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| iniciante | 12.100 | 76,9% | 7,0% | 7,8% | 5,7% | 1,0% | 1,0% | 1,4% | 0,0% | 0,3% | 0,0% | 5,17 | 12,4 | 45,8% | 8,9% |
| intermediario | 12.100 | 71,5% | 7,8% | 9,3% | 5,3% | 0,0% | 4,6% | 6,9% | 2,1% | 0,2% | 0,0% | 5,19 | 13,2 | 43,3% | 8,2% |
| avancado | 12.100 | 65,7% | 7,8% | 12,3% | 4,9% | 0,0% | 6,8% | 10,1% | 2,9% | 0,2% | 0,0% | 5,19 | 13,2 | 43,3% | 8,2% |

## Por minutos

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 min | 9.075 | 54,2% | 12,0% | 34,3% | 0,0% | 0,3% | 0,0% | 6,5% | 4,2% | 0,0% | 0,0% | 3,94 | 10,7 | 43,8% | 4,0% |
| 45 min | 9.075 | 83,5% | 6,0% | 4,7% | 0,7% | 0,3% | 0,0% | 6,4% | 1,7% | 0,0% | 0,0% | 5,24 | 12,9 | 44,1% | 5,8% |
| 60 min | 9.075 | 83,3% | 6,0% | 0,1% | 6,4% | 0,3% | 0,2% | 6,2% | 0,6% | 0,0% | 0,0% | 5,71 | 13,8 | 44,3% | 10,7% |
| 90 min | 9.075 | 64,4% | 6,0% | 0,0% | 14,0% | 0,3% | 16,4% | 5,4% | 0,1% | 1,0% | 0,0% | 5,85 | 14,2 | 44,4% | 13,2% |

## Por dias

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 dias | 7.260 | 64,6% | 0,0% | 23,0% | 0,0% | 0,0% | 7,1% | 4,3% | 4,8% | 1,2% | 0,0% | 6,13 | 10 | 0,0% | 6,4% |
| 3 dias | 7.260 | 75,4% | 0,0% | 13,2% | 3,7% | 1,4% | 4,5% | 3,3% | 1,6% | 0,0% | 0,0% | 5,83 | 12,2 | 86,1% | 9,7% |
| 4 dias | 7.260 | 80,9% | 0,0% | 5,9% | 4,5% | 0,1% | 3,8% | 5,5% | 0,7% | 0,0% | 0,0% | 5,22 | 13,3 | 44,8% | 10,4% |
| 5 dias | 7.260 | 68,9% | 18,8% | 4,7% | 8,0% | 0,1% | 2,7% | 7,1% | 0,6% | 0,0% | 0,0% | 4,87 | 14,1 | 44,8% | 8,3% |
| 6 dias | 7.260 | 67,2% | 18,8% | 2,1% | 10,2% | 0,0% | 2,7% | 10,4% | 0,6% | 0,0% | 0,0% | 4,78 | 14,9 | 44,8% | 7,4% |

## Por foco

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| nenhum | 3.300 | 78,0% | 7,8% | 5,9% | 6,5% | 0,2% | 0,0% | 3,8% | 0,0% | 0,8% | 0,0% | 4,95 | 12,5 | 44,0% | 7,7% |
| peito | 3.300 | 68,1% | 7,8% | 10,3% | 6,2% | 0,2% | 1,3% | 14,6% | 0,0% | 0,4% | 0,0% | 4,97 | 12,5 | 44,0% | 9,5% |
| costas | 3.300 | 75,4% | 7,8% | 7,7% | 6,2% | 0,2% | 3,2% | 4,1% | 0,0% | 0,6% | 0,0% | 4,94 | 12,4 | 44,0% | 7,7% |
| ombros | 3.300 | 76,2% | 7,0% | 6,0% | 5,9% | 0,2% | 1,0% | 9,4% | 0,0% | 0,4% | 0,0% | 5,21 | 13,1 | 44,0% | 10,3% |
| bracos | 3.300 | 71,4% | 7,9% | 5,9% | 5,9% | 0,3% | 9,9% | 4,6% | 0,0% | 0,1% | 0,0% | 5,07 | 12,5 | 44,8% | 7,8% |
| pernas | 3.300 | 65,1% | 7,8% | 10,9% | 2,9% | 0,2% | 10,0% | 3,7% | 10,4% | 0,0% | 0,0% | 5,32 | 13,2 | 44,0% | 6,9% |
| gluteos | 3.300 | 72,7% | 7,8% | 14,0% | 5,3% | 0,6% | 0,0% | 4,1% | 0,0% | 0,0% | 0,0% | 5,56 | 13,8 | 43,9% | 8,2% |
| abdomen | 3.300 | 79,4% | 7,0% | 3,1% | 6,2% | 0,2% | 2,8% | 4,2% | 0,0% | 0,4% | 0,0% | 5,09 | 12,4 | 44,0% | 7,3% |
| superiores | 3.300 | 69,8% | 6,5% | 11,1% | 4,4% | 0,3% | 6,6% | 8,3% | 0,0% | 0,0% | 0,0% | 5,3 | 13,2 | 44,6% | 10,2% |
| inferiores | 3.300 | 59,0% | 7,8% | 20,5% | 2,7% | 0,6% | 7,3% | 4,3% | 7,7% | 0,0% | 0,0% | 5,64 | 13,7 | 43,9% | 7,7% |
| peito+costas | 3.300 | 70,1% | 7,8% | 12,2% | 6,0% | 0,2% | 3,5% | 6,1% | 0,0% | 0,1% | 0,0% | 4,95 | 12,5 | 44,0% | 9,5% |

## Por cenário

Sem dor. "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | 660 | 58,5% | 0,0% | 11,1% | 27,4% | 0,0% | 2,6% | 1,4% | 2,0% | 1,1% | 0,0% | 6,11 | 22,3 | 0,0% | 87,3% |
| academia+ | 660 | 58,2% | 0,0% | 11,1% | 27,7% | 0,0% | 2,6% | 1,4% | 2,0% | 1,1% | 0,0% | 6,11 | 22,4 | 0,0% | 87,3% |
| bairro | 660 | 56,4% | 0,0% | 11,5% | 27,6% | 0,0% | 3,8% | 3,2% | 1,8% | 2,9% | 0,0% | 6,11 | 19,7 | 1,5% | 77,3% |
| banco+halteres-leves | 660 | 71,7% | 10,0% | 13,5% | 0,0% | 6,7% | 0,6% | 1,4% | 2,9% | 0,0% | 0,0% | 5,82 | 17,4 | 20,0% | 4,5% |
| bruno | 660 | 55,8% | 0,0% | 15,9% | 25,8% | 0,6% | 1,8% | 1,4% | 2,1% | 0,0% | 0,0% | 6,09 | 21,4 | 0,0% | 12,1% |
| casa | 660 | 43,3% | 10,0% | 16,5% | 29,1% | 0,0% | 2,3% | 1,4% | 3,0% | 1,1% | 0,0% | 5,95 | 16,6 | 20,0% | 5,9% |
| casa+ | 660 | 48,3% | 0,0% | 22,0% | 27,1% | 0,0% | 2,7% | 1,4% | 2,1% | 0,0% | 0,0% | 6,1 | 21,1 | 1,7% | 0,0% |
| condominio | 660 | 83,3% | 0,0% | 13,2% | 0,0% | 0,0% | 0,8% | 3,2% | 2,7% | 0,0% | 0,0% | 5,97 | 18,5 | 1,8% | 18,9% |
| condominio+ | 660 | 48,5% | 0,0% | 20,8% | 27,4% | 0,0% | 2,7% | 3,2% | 2,3% | 1,4% | 0,0% | 6,1 | 20,1 | 1,5% | 79,4% |
| diego | 660 | 41,5% | 10,0% | 22,3% | 25,0% | 0,0% | 4,2% | 1,7% | 3,0% | 2,0% | 0,0% | 5,91 | 16,8 | 20,0% | 0,0% |
| elasticos | 660 | 42,0% | 10,0% | 22,6% | 24,8% | 0,0% | 3,6% | 1,7% | 3,0% | 1,8% | 0,0% | 5,9 | 15,5 | 20,0% | 0,0% |
| halteres | 660 | 83,9% | 0,0% | 14,1% | 0,0% | 0,0% | 0,6% | 1,2% | 2,7% | 0,0% | 0,0% | 5,73 | 16,5 | 20,0% | 21,8% |
| halteres-banco | 660 | 71,7% | 10,0% | 13,5% | 0,0% | 6,7% | 0,6% | 1,4% | 2,9% | 0,0% | 0,0% | 5,82 | 17,4 | 20,0% | 4,5% |
| halteres+bola | 660 | 84,2% | 0,0% | 13,9% | 0,0% | 0,0% | 0,6% | 1,2% | 2,9% | 0,0% | 0,0% | 5,73 | 16,7 | 20,0% | 21,8% |
| so:abdominal_maquina | 660 | 90,5% | 0,0% | 4,1% | 0,0% | 0,0% | 4,8% | 0,0% | 1,1% | 0,0% | 0,0% | 4,91 | 9,5 | 80,0% | 0,0% |
| so:anilhas_e_manoplas | 660 | 83,9% | 0,0% | 14,1% | 0,0% | 0,0% | 0,6% | 1,2% | 2,7% | 0,0% | 0,0% | 5,73 | 16,5 | 20,0% | 21,8% |
| so:banco_romano | 660 | 86,5% | 0,0% | 4,4% | 0,0% | 3,6% | 4,8% | 0,0% | 0,6% | 0,0% | 0,0% | 4,87 | 10 | 80,0% | 0,0% |
| so:barra_fixa | 660 | 45,8% | 36,4% | 8,9% | 0,0% | 0,0% | 5,8% | 8,9% | 1,7% | 0,0% | 0,0% | 4,4 | 12,3 | 20,0% | 0,0% |
| so:barra_hexagonal | 660 | 91,5% | 0,0% | 3,3% | 0,0% | 0,0% | 5,0% | 0,0% | 0,2% | 0,0% | 0,0% | 4,89 | 9,4 | 80,0% | 0,0% |
| so:barra_longa | 660 | 50,9% | 26,7% | 7,7% | 0,0% | 0,0% | 8,2% | 36,1% | 2,4% | 0,0% | 0,0% | 4,46 | 10,5 | 40,0% | 0,0% |
| so:barra_w | 660 | 87,6% | 0,0% | 7,6% | 0,0% | 0,0% | 4,7% | 0,0% | 0,5% | 0,0% | 0,0% | 5,27 | 10,4 | 80,0% | 0,0% |
| so:bola_suica | 660 | 90,2% | 0,0% | 4,4% | 0,0% | 0,0% | 4,8% | 0,0% | 0,6% | 0,0% | 0,0% | 4,89 | 10,1 | 80,0% | 0,0% |
| so:cadeira_abdutora_adutora | 660 | 89,8% | 0,0% | 4,5% | 0,0% | 0,0% | 5,0% | 0,0% | 0,9% | 0,0% | 0,0% | 4,91 | 9,5 | 80,0% | 0,0% |
| so:cadeira_extensora | 660 | 90,6% | 0,0% | 4,1% | 0,0% | 0,0% | 4,4% | 0,0% | 1,7% | 0,0% | 0,0% | 5,11 | 10,2 | 80,0% | 0,0% |
| so:cadeira_flexora | 660 | 90,0% | 0,0% | 5,0% | 0,0% | 0,0% | 4,4% | 0,0% | 0,9% | 0,0% | 0,0% | 4,9 | 8,9 | 80,0% | 0,0% |
| so:caneleiras | 660 | 90,6% | 0,0% | 4,1% | 0,0% | 0,0% | 4,4% | 0,0% | 1,7% | 0,0% | 0,0% | 5,11 | 10,2 | 80,0% | 0,0% |
| so:desenvolvimento_maquina | 660 | 89,8% | 0,0% | 4,8% | 0,0% | 0,0% | 4,7% | 0,0% | 1,1% | 0,0% | 0,0% | 4,91 | 9,5 | 80,0% | 0,0% |
| so:estacao_polia_dupla | 660 | 68,8% | 10,0% | 18,0% | 0,0% | 0,0% | 2,0% | 3,5% | 1,8% | 0,0% | 0,0% | 5,83 | 15,3 | 20,0% | 0,0% |
| so:estacao_puxada | 660 | 34,7% | 40,0% | 10,3% | 0,0% | 0,0% | 8,0% | 37,9% | 1,7% | 0,0% | 0,0% | 4,21 | 10,5 | 20,0% | 0,0% |
| so:estacao_remada | 660 | 35,6% | 40,0% | 7,4% | 0,0% | 0,0% | 8,0% | 39,1% | 1,4% | 0,0% | 0,0% | 4,2 | 10,5 | 20,0% | 0,0% |
| so:gluteo_maquina | 660 | 91,7% | 0,0% | 3,0% | 0,0% | 0,0% | 4,8% | 0,0% | 0,9% | 0,0% | 0,0% | 4,9 | 9,5 | 80,0% | 0,0% |
| so:graviton | 660 | 36,7% | 40,0% | 10,0% | 0,0% | 0,0% | 6,1% | 40,8% | 1,7% | 0,0% | 0,0% | 4,21 | 11,2 | 14,1% | 0,0% |
| so:hack | 660 | 90,6% | 0,0% | 4,1% | 0,0% | 0,0% | 4,7% | 0,0% | 1,1% | 0,0% | 0,0% | 4,91 | 9,4 | 80,0% | 0,0% |
| so:halteres_fixos | 660 | 83,3% | 0,0% | 15,0% | 0,0% | 0,0% | 0,6% | 1,2% | 2,4% | 0,0% | 0,0% | 5,7 | 16,4 | 20,0% | 21,5% |
| so:kettlebell | 660 | 63,9% | 1,8% | 13,3% | 0,0% | 0,0% | 4,8% | 19,1% | 2,6% | 0,0% | 0,0% | 4,75 | 12,1 | 20,0% | 0,0% |
| so:leg_press | 660 | 92,1% | 0,0% | 3,6% | 0,0% | 0,0% | 3,6% | 0,0% | 1,1% | 0,0% | 0,0% | 4,94 | 9,5 | 80,0% | 0,0% |
| so:mesa_flexora | 660 | 90,0% | 0,0% | 5,0% | 0,0% | 0,0% | 4,4% | 0,0% | 0,9% | 0,0% | 0,0% | 4,9 | 8,9 | 80,0% | 0,0% |
| so:mini_band | 660 | 89,8% | 0,0% | 4,5% | 0,0% | 0,0% | 5,0% | 0,0% | 0,9% | 0,0% | 0,0% | 4,91 | 9,5 | 80,0% | 0,0% |
| so:multifuncional | 660 | 51,7% | 29,1% | 10,8% | 0,0% | 0,0% | 5,8% | 5,6% | 1,4% | 0,0% | 0,0% | 4,52 | 11,5 | 20,0% | 0,0% |
| so:panturrilha_em_pe_maquina | 660 | 92,0% | 0,0% | 3,8% | 0,0% | 0,0% | 3,6% | 0,0% | 1,1% | 0,0% | 0,0% | 4,94 | 9,6 | 80,0% | 0,0% |
| so:panturrilha_sentada_maquina | 660 | 91,1% | 0,0% | 4,7% | 0,0% | 0,0% | 3,6% | 0,0% | 1,1% | 0,0% | 0,0% | 4,94 | 9,6 | 80,0% | 0,0% |
| so:paralelas | 660 | 90,8% | 0,0% | 4,7% | 0,0% | 0,0% | 3,9% | 0,0% | 1,1% | 0,0% | 0,0% | 4,89 | 10,9 | 26,7% | 0,0% |
| so:rack_de_agachamento | 660 | 34,7% | 40,0% | 10,9% | 0,0% | 0,0% | 7,7% | 35,8% | 1,4% | 0,0% | 0,0% | 4,23 | 10,5 | 20,0% | 0,0% |
| so:remada_articulada | 660 | 35,6% | 40,0% | 7,4% | 0,0% | 0,0% | 8,0% | 39,1% | 1,4% | 0,0% | 0,0% | 4,2 | 10,5 | 20,0% | 0,0% |
| so:roda_abdominal | 660 | 89,8% | 0,0% | 4,8% | 0,0% | 0,0% | 4,7% | 0,0% | 1,1% | 0,0% | 0,0% | 4,91 | 10,1 | 80,0% | 0,0% |
| so:rosca_maquina | 660 | 88,2% | 0,0% | 7,0% | 0,0% | 0,0% | 4,7% | 0,0% | 0,5% | 0,0% | 0,0% | 5,28 | 10,4 | 80,0% | 0,0% |
| so:smith | 660 | 36,4% | 40,0% | 8,9% | 0,0% | 0,0% | 7,9% | 35,9% | 1,2% | 0,0% | 0,0% | 4,23 | 10,3 | 20,0% | 0,0% |
| so:step | 660 | 90,6% | 0,0% | 5,2% | 0,0% | 0,0% | 3,6% | 0,0% | 1,5% | 0,0% | 0,0% | 4,92 | 10 | 80,0% | 0,0% |
| so:supino_maquina | 660 | 90,0% | 0,0% | 4,5% | 0,0% | 0,0% | 4,8% | 0,0% | 1,1% | 0,0% | 0,0% | 4,91 | 9,5 | 80,0% | 0,0% |
| so:suspensao | 660 | 78,5% | 0,0% | 11,8% | 0,0% | 0,0% | 5,3% | 4,7% | 1,4% | 0,0% | 0,0% | 5,02 | 13,1 | 20,0% | 0,0% |
| so:triceps_maquina | 660 | 90,5% | 0,0% | 4,4% | 0,0% | 0,0% | 4,5% | 0,0% | 1,1% | 0,0% | 0,0% | 4,9 | 9,5 | 80,0% | 0,0% |
| so:voador | 660 | 89,1% | 0,0% | 3,9% | 0,0% | 0,0% | 6,4% | 0,0% | 1,1% | 0,0% | 0,0% | 5,15 | 10,3 | 80,0% | 0,0% |
| step+elasticos | 660 | 41,7% | 10,0% | 25,5% | 24,5% | 0,0% | 2,3% | 1,7% | 3,0% | 0,5% | 0,0% | 5,92 | 16 | 20,0% | 0,0% |
| suspensao+elasticos | 660 | 43,8% | 10,0% | 21,8% | 24,4% | 0,0% | 3,0% | 1,7% | 2,6% | 2,0% | 0,0% | 5,93 | 16,1 | 20,0% | 0,0% |
| vazio | 660 | 89,8% | 0,0% | 4,8% | 0,0% | 0,0% | 4,7% | 0,0% | 1,1% | 0,0% | 0,0% | 4,91 | 9,5 | 80,0% | 0,0% |

## Uso de cada exercício

Programas sem dor em que o exercício aparece (os sem animação aprovada, que aparecem como cartão de texto, vêm marcados).

| exercício | animação | programas | % |
| --- | --- | ---: | ---: |
| abdominal-chao | sim | 32.498 | 89,5% |
| panturrilha-chao | sim | 29.916 | 82,4% |
| flexao | sim | 29.642 | 81,7% |
| afundo-peso-corpo | sim | 26.400 | 72,7% |
| flexao-joelho-deslizante | sim | 25.208 | 69,4% |
| flexao-fechada | sim | 21.729 | 59,9% |
| ponte-gluteo | sim | 21.274 | 58,6% |
| agachamento-peso-corpo | sim | 21.124 | 58,2% |
| bulgaro-peso-corpo | sim | 15.768 | 43,4% |
| nordico | sim | 15.362 | 42,3% |
| afundo | sim | 9.240 | 25,5% |
| stiff | sim | 9.240 | 25,5% |
| elevacao-halteres | sim | 7.267 | 20,0% |
| triceps-frances-halter | sim | 6.864 | 18,9% |
| supino-reto | sim | 5.940 | 16,4% |
| ponte-gluteo-halter | **cartão** | 5.004 | 13,8% |
| pike | sim | 4.934 | 13,6% |
| aducao-deitado | sim | 4.909 | 13,5% |
| remada-apoiada | sim | 4.620 | 12,7% |
| supino-inclinado | sim | 4.620 | 12,7% |
| remada-unilateral-sem-banco | sim | 4.444 | 12,2% |
| crucifixo-invertido-curvado | **cartão** | 4.302 | 11,9% |
| remada-curvada-halteres | **cartão** | 4.268 | 11,8% |
| panturrilha | sim | 4.180 | 11,5% |
| rosca-alternada | sim | 4.149 | 11,4% |
| abducao-deitado | sim | 4.144 | 11,4% |
| stiff-unilateral | sim | 4.143 | 11,4% |
| rosca-inclinada | sim | 4.028 | 11,1% |
| bulgaro | sim | 3.960 | 10,9% |
| flexao-joelho-elastico | sim | 3.677 | 10,1% |
| goblet | sim | 3.642 | 10,0% |
| extensao-joelho-elastico | sim | 3.564 | 9,8% |
| crucifixo-halteres | **cartão** | 3.315 | 9,1% |
| abdominal-bola | sim | 3.300 | 9,1% |
| cadeira-flexora | **cartão** | 3.100 | 8,5% |
| flexao-bola | sim | 3.041 | 8,4% |
| cadeira-extensora | **cartão** | 3.003 | 8,3% |
| remada-unilateral-halter | sim | 2.904 | 8,0% |
| agachamento-elastico | sim | 2.640 | 7,3% |
| barra-fixa | sim | 2.640 | 7,3% |
| puxada-frente | **cartão** | 2.640 | 7,3% |
| puxada-unilateral | sim | 2.640 | 7,3% |
| stiff-elastico | sim | 2.640 | 7,3% |
| rosca-martelo | sim | 2.514 | 6,9% |
| crucifixo-inverso | **cartão** | 2.449 | 6,7% |
| remada-elastico | sim | 2.376 | 6,5% |
| elevacao-lateral-elastico | sim | 2.244 | 6,2% |
| triceps-elastico-acima | sim | 2.244 | 6,2% |
| barra-fixa-supinada | sim | 2.205 | 6,1% |
| elevacao-lateral | sim | 2.159 | 5,9% |
| crucifixo-elastico | sim | 2.115 | 5,8% |
| panturrilha-bilateral-step | sim | 1.998 | 5,5% |
| afundo-tras | **cartão** | 1.968 | 5,4% |
| face-pull-elastico | sim | 1.927 | 5,3% |
| rosca-elastico | sim | 1.721 | 4,7% |
| puxada-elastico | sim | 1.716 | 4,7% |
| triceps-frances | sim | 1.683 | 4,6% |
| abdominal-maquina | **cartão** | 1.604 | 4,4% |
| elevacao-joelhos | sim | 1.598 | 4,4% |
| puxada-barra-reta | **cartão** | 1.584 | 4,4% |
| coice-maquina | **cartão** | 1.583 | 4,4% |
| abdominal-polia | sim | 1.540 | 4,2% |
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
| triceps-suspensao | sim | 1.185 | 3,3% |
| rosca-suspensao | sim | 1.174 | 3,2% |
| hip-thrust | **cartão** | 1.152 | 3,2% |
| agachamento-smith | **cartão** | 1.100 | 3,0% |
| panturrilha-em-pe-maquina | **cartão** | 1.100 | 3,0% |
| ponte-kettlebell | sim | 1.092 | 3,0% |
| triceps-corda | sim | 936 | 2,6% |
| agachamento-barra | **cartão** | 880 | 2,4% |
| rosca-polia-costas | **cartão** | 872 | 2,4% |
| voador | **cartão** | 826 | 2,3% |
| triceps-frances-kettlebell | sim | 792 | 2,2% |
| yt-suspensao | sim | 781 | 2,2% |
| elevacao-joelhos-paralelas | sim | 741 | 2,0% |
| panturrilha-sentada-halter | sim | 724 | 2,0% |
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
| rosca-barra-w | **cartão** | 654 | 1,8% |
| flexao-joelho-suspensao | sim | 652 | 1,8% |
| rosca-kettlebell | sim | 621 | 1,7% |
| triceps-frances-polia-unilateral | sim | 561 | 1,5% |
| mergulho | **cartão** | 560 | 1,5% |
| supino-chao-halteres | **cartão** | 556 | 1,5% |
| mergulho-graviton | **cartão** | 518 | 1,4% |
| face-pull | sim | 510 | 1,4% |
| triceps-maquina | **cartão** | 493 | 1,4% |
| remada-barra | **cartão** | 440 | 1,2% |
| supino-barra | **cartão** | 440 | 1,2% |
| terra-romeno-barra | **cartão** | 440 | 1,2% |
| roda-abdominal | sim | 426 | 1,2% |
| crucifixo-polia-baixo | **cartão** | 282 | 0,8% |
| aducao-maquina | **cartão** | 273 | 0,8% |
| agachamento-halteres | **cartão** | 252 | 0,7% |
| desenvolvimento-unilateral-kettlebell | sim | 249 | 0,7% |
| aducao-caneleira | sim | 247 | 0,7% |
| abducao-maquina | **cartão** | 235 | 0,6% |
| triceps-barra-reta | **cartão** | 207 | 0,6% |
| abducao-caneleira | sim | 205 | 0,6% |
| panturrilha-sentada | **cartão** | 204 | 0,6% |
| ponte-pes-bola | sim | 204 | 0,6% |
| supino-inclinado-polia | **cartão** | 198 | 0,5% |
| desenvolvimento-maquina | **cartão** | 138 | 0,4% |
| coice-polia | **cartão** | 114 | 0,3% |
| abducao-mini-band | sim | 113 | 0,3% |
| voador-invertido | **cartão** | 85 | 0,2% |
| rosca-scott | **cartão** | 52 | 0,1% |
| abducao-polia | **cartão** | 48 | 0,1% |
| desenvolvimento-barra | **cartão** | 24 | 0,1% |
| abdominal-declinado | **cartão** | 0 | 0,0% |
| bulgaro-suspensao | sim | 0 | 0,0% |
| flexao-elastico | sim | 0 | 0,0% |
| pull-through | **cartão** | 0 | 0,0% |
| rosca-polia | sim | 0 | 0,0% |
| supino-polia | **cartão** | 0 | 0,0% |
| supino-smith | **cartão** | 0 | 0,0% |

## Exemplos

O 1º programa da grade com cada defeito e nota.

- **A2** (sem dor), casa · iniciante · 5 dias · 30 min · foco nenhum · sem dor: Empurrar sem multiarticular.
  - Superior (30 min): flexao 3, remada-unilateral-sem-banco 2, remada-curvada-halteres 2, elevacao-halteres 3 | Inferior (31 min): goblet 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Empurrar (22 min): elevacao-halteres 3, triceps-frances-halter 4, crucifixo-elastico 3 | Puxar (22 min): remada-unilateral-sem-banco 2, remada-curvada-halteres 2, crucifixo-invertido-curvado 2, rosca-alternada 2 | Pernas (30 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2
- **A3** (sem dor), casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: dia de 45 min em 30.
  - Corpo todo A (45 min): goblet 3, flexao 2, remada-unilateral-sem-banco 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (29 min): afundo 3, flexao 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
- **A4** (sem dor), casa · iniciante · 3 dias · 90 min · foco nenhum · sem dor: dia típico de 57 min em 90, sem o aviso.
  - Corpo todo A (50 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (58 min): stiff 2, flexao 2, remada-curvada-halteres 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-chao 4, crucifixo-invertido-curvado 3, abdominal-chao 2 | Corpo todo C (57 min): afundo 2, flexao 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 3, flexao-fechada 2, elevacao-halteres 3, flexao-joelho-elastico 2, abdominal-chao 2
- **B1** (sem dor), halteres-banco · iniciante · 3 dias · 30 min · foco nenhum · sem dor: remada-unilateral-halter em todos os dias, com outro do mesmo nível possível e sem uso.
  - Corpo todo A (35 min): bulgaro 2, supino-reto 2, remada-unilateral-halter 2, flexao-joelho-deslizante 2, abdominal-chao 4 | Corpo todo B (31 min): stiff 2, supino-reto 2, remada-unilateral-halter 2, rosca-alternada 2+drop, panturrilha-chao 3+drop | Corpo todo C (29 min): afundo 3, supino-reto 2, remada-unilateral-halter 2, ponte-gluteo-halter 2
- **C1** (sem dor), casa · intermediario · 2 dias · 90 min · foco costas · sem dor: costas com 8 de 12 e o dia mais longo em 75 de 90 min.
  - Corpo todo A (75 min): remada-unilateral-sem-banco 4, goblet 2, flexao 2, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-chao 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (65 min): remada-curvada-halteres 4, afundo 2, flexao 2, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 2, crucifixo-invertido-curvado 2, elevacao-halteres 3, abdominal-chao 2
- **D1** (sem dor), casa · iniciante · 2 dias · 30 min · foco peito · sem dor: empurrar 8 ÷ puxar 4 séries.
  - Corpo todo A (49 min): flexao 4, goblet 3, remada-unilateral-sem-banco 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (34 min): flexao 4, afundo 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
- **D3** (sem dor), casa · intermediario · 2 dias · 30 min · foco pernas · sem dor: quadríceps 6 ÷ posteriores 2.
  - Corpo todo A (39 min): goblet 2, stiff 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-chao 2+drop, abdominal-chao 4 | Corpo todo B (29 min): afundo 4, flexao 2, remada-curvada-halteres 2
- **E1** (sem dor), casa · iniciante · 2 dias · 90 min · foco nenhum · sem dor: gluteos com 3,5 séries e o dia mais longo em 72 de 90 min.
  - Corpo todo A (72 min): goblet 2, flexao 2, remada-unilateral-sem-banco 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-chao 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (67 min): afundo 2, flexao 2, remada-curvada-halteres 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-curvado 3, elevacao-halteres 3, abdominal-chao 2
- **A1** (sem dor), casa · iniciante · 2 dias · 30 min · foco nenhum · sem dor: Corpo todo A com 6 exercícios em 30 min (faixa 3–5).
  - Corpo todo A (45 min): goblet 3, flexao 2, remada-unilateral-sem-banco 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (29 min): afundo 3, flexao 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
- **A5** (sem dor), casa · iniciante · 5 dias · 30 min · foco gluteos · sem dor: dias de 22 a 38 min.
  - Superior (30 min): flexao 3, remada-unilateral-sem-banco 2, remada-curvada-halteres 2, elevacao-halteres 3 | Inferior (30 min): ponte-gluteo-halter 2, goblet 2, stiff 2, abdominal-chao 4 | Empurrar (22 min): elevacao-halteres 3, triceps-frances-halter 4, crucifixo-elastico 3 | Puxar (22 min): remada-unilateral-sem-banco 2, remada-curvada-halteres 2, crucifixo-invertido-curvado 2, rosca-alternada 2 | Pernas (38 min): ponte-gluteo-halter 2, afundo 2, stiff-unilateral 2, extensao-joelho-elastico 2, panturrilha-chao 3+drop
- **B2** (sem dor), casa · iniciante · 3 dias · 30 min · foco nenhum · sem dor: flexao em todos os dias, sem outro do mesmo nível.
  - Corpo todo A (35 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, abdominal-chao 4 | Corpo todo B (30 min): stiff 2, flexao 2, remada-curvada-halteres 2, rosca-alternada 2+drop, panturrilha-chao 3+drop | Corpo todo C (30 min): afundo 3, flexao 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 2
- **B3** (sem dor), elasticos · iniciante · 3 dias · 60 min · foco bracos · sem dor: flexao, rosca-elastico em todos os dias.
  - Corpo todo A (55 min): agachamento-elastico 2, flexao 2, puxada-elastico 2, triceps-elastico-acima 3, rosca-elastico 2, flexao-joelho-elastico 3, elevacao-lateral-elastico 3, abdominal-chao 2 | Corpo todo B (60 min): stiff-elastico 3, flexao 2, remada-elastico 2, rosca-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 4, face-pull-elastico 3, abdominal-chao 2 | Corpo todo C (57 min): flexao-fechada 2, afundo-peso-corpo 2, flexao 2, puxada-elastico 2, ponte-gluteo 3, rosca-elastico 2, elevacao-lateral-elastico 3, abdominal-chao 2
- **C2** (sem dor), casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 4.
  - Corpo todo A (45 min): goblet 3, flexao 2, remada-unilateral-sem-banco 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (29 min): afundo 3, flexao 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
- **G1** (sem dor), casa · iniciante · 2 dias · 90 min · foco ombros · sem dor: Corpo todo B com 3 cartões de texto.
  - Corpo todo A (72 min): goblet 2, flexao 2, remada-unilateral-sem-banco 3, stiff 3, elevacao-halteres 4, triceps-frances-halter 3, panturrilha-chao 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (75 min): afundo 2, flexao 2, remada-curvada-halteres 3, desenvolvimento-unilateral 2, elevacao-halteres 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-curvado 3, abdominal-chao 2
- **A2** (com dor), casa · iniciante · 4 dias · 30 min · foco nenhum · ombro 7: Superior A com 1 exercício.
  - Superior A (5 min): rosca-alternada 3 | Inferior A (31 min): goblet 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Superior B (5 min): rosca-martelo 3 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2
- **A3** (com dor), casa · iniciante · 2 dias · 30 min · foco nenhum · joelho 7: dia de 42 min em 30.
  - Corpo todo A (42 min): flexao 2, remada-unilateral-sem-banco 2, stiff 2, elevacao-halteres 3+drop, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (29 min): flexao 3, remada-curvada-halteres 3, stiff-unilateral 2, rosca-alternada 2+drop
- **B1** (com dor), casa · iniciante · 3 dias · 45 min · foco nenhum · ombro 7: ponte-gluteo-halter em todos os dias, com outro do mesmo nível possível e sem uso.
  - Corpo todo A (28 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-martelo 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-chao 2
- **C1** (com dor), casa · iniciante · 2 dias · 90 min · foco bracos · joelho 7: triceps com 6 de 8 e o dia mais longo em 72 de 90 min.
  - Corpo todo A (72 min): flexao 2, remada-unilateral-sem-banco 3, stiff 3, triceps-frances-halter 4, rosca-alternada 3, elevacao-halteres 3, panturrilha-chao 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (72 min): flexao 2, remada-curvada-halteres 3, stiff-unilateral 3, ponte-gluteo-halter 3, rosca-martelo 2, crucifixo-invertido-curvado 3, elevacao-halteres 3, aducao-deitado 2, abdominal-chao 2
- **D1** (com dor), casa · iniciante · 2 dias · 30 min · foco peito · joelho 7: empurrar 8 ÷ puxar 4 séries.
  - Corpo todo A (51 min): flexao 4, remada-unilateral-sem-banco 2, stiff 2, elevacao-halteres 3+drop, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (32 min): flexao 4, remada-curvada-halteres 2, stiff-unilateral 2, rosca-alternada 2+drop
- **D3** (com dor), casa · intermediario · 2 dias · 30 min · foco pernas · ombro 7: quadríceps 7 ÷ posteriores 3.
  - Corpo todo A (29 min): goblet 4, stiff 3, panturrilha-chao 3+drop | Corpo todo B (28 min): afundo 3, rosca-alternada 3+drop, abdominal-chao 4
- **A1** (com dor), casa · iniciante · 2 dias · 30 min · foco nenhum · joelho 7: Corpo todo A com 6 exercícios em 30 min (faixa 3–5).
  - Corpo todo A (42 min): flexao 2, remada-unilateral-sem-banco 2, stiff 2, elevacao-halteres 3+drop, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (29 min): flexao 3, remada-curvada-halteres 3, stiff-unilateral 2, rosca-alternada 2+drop
- **A5** (com dor), casa · iniciante · 2 dias · 30 min · foco costas · joelho 7: dias de 27 a 51 min.
  - Corpo todo A (51 min): remada-unilateral-sem-banco 4, flexao 2, stiff 2, elevacao-halteres 3+drop, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (27 min): remada-curvada-halteres 4, flexao 3, stiff-unilateral 2
- **B2** (com dor), casa · iniciante · 3 dias · 30 min · foco nenhum · joelho 7: flexao em todos os dias, sem outro do mesmo nível.
  - Corpo todo A (36 min): flexao 2, remada-unilateral-sem-banco 2, stiff 2, elevacao-halteres 2+drop, abdominal-chao 4 | Corpo todo B (32 min): stiff-unilateral 2, flexao 2, remada-curvada-halteres 2, rosca-alternada 2+drop, panturrilha-chao 3+drop | Corpo todo C (29 min): flexao 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 3, elevacao-halteres 2+drop
- **B3** (com dor), elasticos · iniciante · 3 dias · 60 min · foco nenhum · joelho 7: flexao, stiff-elastico em todos os dias.
  - Corpo todo A (53 min): flexao 2, puxada-elastico 2, stiff-elastico 2, triceps-elastico-acima 2, elevacao-lateral-elastico 3, crucifixo-elastico 2, abducao-deitado 2, abdominal-chao 2 | Corpo todo B (58 min): stiff-elastico 2, flexao 2, remada-elastico 2, rosca-elastico 3, panturrilha-chao 3, face-pull-elastico 3, aducao-deitado 2, abdominal-chao 2 | Corpo todo C (55 min): flexao 2, puxada-elastico 2, ponte-gluteo 2, flexao-fechada 2, stiff-elastico 2, elevacao-lateral-elastico 3, panturrilha-chao 3, abdominal-chao 2
- **C2** (com dor), casa · iniciante · 2 dias · 30 min · foco ombros · joelho 7: ombro_lateral com 3, mediana dos outros 4.
  - Corpo todo A (42 min): flexao 2, remada-unilateral-sem-banco 2, stiff 2, elevacao-halteres 2+drop, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (29 min): flexao 3, remada-curvada-halteres 3, stiff-unilateral 2, rosca-alternada 2+drop
- **G1** (com dor), casa · iniciante · 2 dias · 60 min · foco nenhum · joelho 7: Corpo todo B com 3 cartões de texto.
  - Corpo todo A (58 min): flexao 2, remada-unilateral-sem-banco 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-chao 3+drop, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (60 min): flexao 2, remada-curvada-halteres 3, stiff-unilateral 3, ponte-gluteo-halter 3, rosca-alternada 3, crucifixo-invertido-curvado 3, elevacao-halteres 3, abdominal-chao 2

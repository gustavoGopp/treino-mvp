# A régua da G5 na grade de 108.900 programas

> Gerado por `npm run auditoria:regua` (`scripts/auditoria/grade-regua.ts`, com as medidas de `scripts/auditoria/regua.ts`). Dados fictícios. Não editar à mão.

**108.900 programas** (36.300 sem dor): 55 cenários de equipamento × 3 níveis × 2 a 6 dias (a divisão recomendada) × 30, 45, 60, 90 min × 11 focos (nenhum, peito, costas, ombros, bracos, pernas, gluteos, abdomen, superiores, inferiores, peito+costas) × 3 situações de dor (sem dor, ombro 7, joelho 7). 0 bloqueados. A régua e as fontes de cada limite: `docs/pesquisa-v2/17-biblioteca-ampliada.md`, parte G5, tabela 4.7.

## Nenhum defeito pode piorar

Nenhum defeito acima da linha de base (`docs/revisoes/qualidade/regua-linha-de-base.json`, a `main` antes da biblioteca ampliada).

| defeito | o que é | sem dor | % | linha de base | com dor | % | linha de base |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A2 | dia com menos de 3 exercícios ou sem multiarticular | 355 | 1,0% | 7,5% | 3.698 | 5,1% | 23,5% |
| A3 | dia mais longo acima de 110% dos minutos | 1.926 | 5,3% | 9,8% | 2.106 | 2,9% | 4,5% |
| A4 | dia típico abaixo de 70% dos minutos, sem o aviso | 0 | 0,0% | 5,3% | 0 | 0,0% | 0,0% |
| B1 | o mesmo exercício em todos os dias havendo outro do mesmo nível | 0 | 0,0% | 0,3% | 0 | 0,0% | 1,3% |
| C1 | prioritário abaixo da meta com tempo e exercício | 440 | 1,2% | 4,1% | 697 | 1,0% | 5,8% |
| D1 | empurrar ÷ puxar acima de 1,5 havendo como puxar | 277 | 0,8% | 6,1% | 125 | 0,2% | 3,2% |
| D3 | quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto) | 0 | 0,0% | 1,6% | 0 | 0,0% | 0,3% |
| E1 | não prioritário com 1 a 3 séries havendo exercício e tempo | 0 | 0,0% | 0,2% | 0 | 0,0% | 0,0% |
| seguranca | exercício impossível, acima da complexidade ou numa região com dor > 5 | 0 | 0,0% | 0,0% | 0 | 0,0% | 0,0% |
| **sem nenhum defeito** |  | 33.528 | **92,4%** |  | 66.335 | 91,4% |  |
| sem defeito, fora o D1 |  | 33.665 | 92,7% |  | 66.384 | 91,4% |  |

Como cada limite é medido (as definições do protótipo de `g-biblioteca-ampliada.md` foram descartadas com o rascunho; estas reproduzem a linha de base dele em todos os números publicados, menos o D1): o dia típico (A4) é a mediana dos dias; "tem tempo" (C1, E1) é o dia mais longo abaixo de 85% dos minutos; o foco (C1, C2) só conta músculos com exercício possível, e C2 compara com a mediana dos não prioritários que têm exercício possível; D1 e D3 só valem quando o equipamento permite puxar, e treinar quadríceps e posteriores. **O D1 usa o limite escrito na tabela 4.7 (empurrar ÷ puxar acima de 1,5)**: dá 6,1% na `main`, e não os 0,9% do protótipo, cuja leitura exata se perdeu. Por isso a linha "fora o D1" é a comparável com os 73,4% (hoje) e os 83,8% (final) do protótipo.

## Notas (devem melhorar)

% dos programas sem dor. B2 e B3 só existem com 3 dias ou mais (a coluna ao lado dá a fatia desses).

| nota | o que é | programas | % (sem dor) | % (3 dias ou mais) |
| --- | --- | ---: | ---: | ---: |
| A1 | exercícios por dia fora da faixa dos minutos | 3.000 | 8,3% |  |
| A5 | dia mais curto abaixo de 60% do mais longo | 4.386 | 12,1% |  |
| B2 | o mesmo exercício em todos os dias sem opção do mesmo nível | 5.662 | 15,6% | 19,5% |
| B3 | dois exercícios ou mais em todos os dias | 2.833 | 7,8% | 9,8% |
| C2 | o foco não passa da mediana dos outros músculos | 4.790 | 13,2% |  |
| G1 | dia com 3 ou mais cartões de texto | 0 | 0,0% |  |

## Medidas (sem dor)

| medida | valor |
| --- | ---: |
| exercícios por dia (média) | 5,58 |
| exercícios diferentes por semana (média) | 15 |
| prescrições sem nenhuma alternativa | 27,8% |
| cartões de texto por dia (média) | 0 |
| funções com 0 opção / com 1, somando os 55 cenários (intermediário) | 277 / 356 |

## Por grupo de cenário

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| atalhos (6) | 3.960 | 92,3% | 1,1% | 6,3% | 0,0% | 0,0% | 0,1% | 1,0% | 0,0% | 0,0% | 0,0% | 16,2% | 6,03 | 19,1 | 0,0% | 0,0% |
| personas (6) | 3.960 | 89,5% | 3,2% | 7,6% | 0,0% | 0,0% | 0,1% | 1,0% | 0,0% | 0,0% | 0,0% | 18,4% | 5,92 | 18,3 | 0,1% | 0,0% |
| sem nada (1) | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 12,8 | 26,7% | 0,0% |
| um item só (38) | 25.080 | 93,3% | 0,2% | 4,5% | 0,0% | 0,0% | 1,7% | 0,7% | 0,0% | 0,0% | 0,0% | 13,2% | 5,42 | 13,5 | 21,9% | 0,0% |
| pares de casa (4) | 2.640 | 87,5% | 4,9% | 8,4% | 0,0% | 0,0% | 0,1% | 1,0% | 0,0% | 0,0% | 0,0% | 19,5% | 5,85 | 17,6 | 0,1% | 0,0% |

## Por nível

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| iniciante | 12.100 | 94,4% | 1,0% | 3,2% | 0,0% | 0,0% | 1,3% | 0,5% | 0,0% | 0,0% | 0,0% | 15,3% | 5,51 | 12,8 | 40,9% | 0,0% |
| intermediario | 12.100 | 92,8% | 1,0% | 5,6% | 0,0% | 0,0% | 0,4% | 0,8% | 0,0% | 0,0% | 0,0% | 14,1% | 5,59 | 16 | 2,9% | 0,0% |
| avancado | 12.100 | 89,9% | 1,0% | 7,1% | 0,0% | 0,0% | 1,9% | 1,0% | 0,0% | 0,0% | 0,0% | 14,2% | 5,62 | 16 | 3,0% | 0,0% |

## Por minutos

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 min | 9.075 | 79,3% | 3,9% | 17,0% | 0,0% | 0,0% | 0,0% | 2,3% | 0,0% | 0,0% | 0,0% | 31,7% | 3,97 | 11,8 | 13,9% | 0,0% |
| 45 min | 9.075 | 95,4% | 0,0% | 3,7% | 0,0% | 0,0% | 0,3% | 0,6% | 0,0% | 0,0% | 0,0% | 15,2% | 5,6 | 14,9 | 15,4% | 0,0% |
| 60 min | 9.075 | 99,1% | 0,0% | 0,5% | 0,0% | 0,0% | 0,2% | 0,2% | 0,0% | 0,0% | 0,0% | 7,9% | 6,23 | 16,2 | 16,5% | 0,0% |
| 90 min | 9.075 | 95,6% | 0,0% | 0,0% | 0,0% | 0,0% | 4,4% | 0,0% | 0,0% | 0,0% | 0,0% | 3,3% | 6,51 | 16,9 | 16,6% | 0,0% |

## Por dias

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2 dias | 7.260 | 85,1% | 0,0% | 11,0% | 0,0% | 0,0% | 2,9% | 2,2% | 0,0% | 0,0% | 0,0% | 24,0% | 6,69 | 11,7 | 0,0% | 0,0% |
| 3 dias | 7.260 | 90,6% | 0,0% | 8,1% | 0,0% | 0,0% | 0,4% | 1,4% | 0,0% | 0,0% | 0,0% | 12,1% | 5,96 | 14,1 | 30,8% | 0,0% |
| 4 dias | 7.260 | 95,6% | 0,0% | 3,4% | 0,0% | 0,0% | 0,9% | 0,1% | 0,0% | 0,0% | 0,0% | 9,4% | 5,59 | 15,3 | 15,8% | 0,0% |
| 5 dias | 7.260 | 94,8% | 2,4% | 2,4% | 0,0% | 0,0% | 1,0% | 0,0% | 0,0% | 0,0% | 0,0% | 12,2% | 5,27 | 16,2 | 15,8% | 0,0% |
| 6 dias | 7.260 | 95,6% | 2,5% | 1,6% | 0,0% | 0,0% | 0,8% | 0,1% | 0,0% | 0,0% | 0,0% | 14,9% | 5,26 | 17,5 | 15,6% | 0,0% |

## Por foco

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| nenhum | 3.300 | 98,5% | 1,5% | 0,1% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 5,33 | 14,6 | 15,4% | 0,0% |
| peito | 3.300 | 90,6% | 0,0% | 4,9% | 0,0% | 0,0% | 2,5% | 5,2% | 0,0% | 0,0% | 0,0% | 0,4% | 5,38 | 14,6 | 15,4% | 0,0% |
| costas | 3.300 | 91,4% | 1,5% | 4,1% | 0,0% | 0,0% | 2,6% | 0,5% | 0,0% | 0,0% | 0,0% | 1,0% | 5,35 | 14,6 | 15,4% | 0,0% |
| ombros | 3.300 | 99,8% | 0,0% | 0,1% | 0,0% | 0,0% | 0,1% | 0,0% | 0,0% | 0,0% | 0,0% | 6,6% | 5,57 | 15 | 15,4% | 0,0% |
| bracos | 3.300 | 98,6% | 0,9% | 0,4% | 0,0% | 0,0% | 0,1% | 0,1% | 0,0% | 0,0% | 0,0% | 8,2% | 5,48 | 14,9 | 17,0% | 0,0% |
| pernas | 3.300 | 88,7% | 1,5% | 9,7% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 44,5% | 5,81 | 15,4 | 15,2% | 0,0% |
| gluteos | 3.300 | 94,2% | 1,5% | 4,9% | 0,0% | 0,0% | 0,1% | 0,0% | 0,0% | 0,0% | 0,0% | 0,5% | 5,82 | 15,5 | 15,0% | 0,0% |
| abdomen | 3.300 | 99,0% | 1,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 0,0% | 22,5% | 5,47 | 14,6 | 15,4% | 0,0% |
| superiores | 3.300 | 87,7% | 1,6% | 8,4% | 0,0% | 0,0% | 1,3% | 1,6% | 0,0% | 0,0% | 0,0% | 14,1% | 5,69 | 15,1 | 17,0% | 0,0% |
| inferiores | 3.300 | 79,1% | 1,5% | 18,3% | 0,0% | 0,0% | 2,2% | 0,0% | 0,0% | 0,0% | 0,0% | 45,5% | 6,03 | 15,6 | 15,0% | 0,0% |
| peito+costas | 3.300 | 88,6% | 0,0% | 7,5% | 0,0% | 0,0% | 3,4% | 1,1% | 0,0% | 0,0% | 0,0% | 1,8% | 5,4 | 14,6 | 15,4% | 0,0% |

## Por cenário

Sem dor. "C2 (com foco)": a nota C2 entre os programas com algum grupo de foco (R5d). "3+ cartões": programas com um dia de 3 ou mais cartões de texto (G1).

| recorte | programas | sem defeito | A2 | A3 | A4 | B1 | C1 | D1 | D3 | E1 | seguranca | C2 (com foco) | exercícios por dia | diferentes por semana | B2 | 3+ cartões |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | 660 | 94,2% | 0,0% | 5,0% | 0,0% | 0,0% | 0,2% | 1,1% | 0,0% | 0,0% | 0,0% | 14,2% | 6,09 | 20,3 | 0,0% | 0,0% |
| academia+ | 660 | 94,2% | 0,0% | 5,0% | 0,0% | 0,0% | 0,2% | 1,1% | 0,0% | 0,0% | 0,0% | 14,2% | 6,09 | 20,3 | 0,0% | 0,0% |
| bairro | 660 | 93,6% | 0,0% | 5,8% | 0,0% | 0,0% | 0,2% | 0,9% | 0,0% | 0,0% | 0,0% | 15,3% | 6,08 | 19,4 | 0,0% | 0,0% |
| banco+halteres-leves | 660 | 88,0% | 7,1% | 5,9% | 0,0% | 0,0% | 0,2% | 0,6% | 0,0% | 0,0% | 0,0% | 17,8% | 5,81 | 17,2 | 0,0% | 0,0% |
| bruno | 660 | 92,4% | 0,0% | 6,7% | 0,0% | 0,0% | 0,2% | 1,2% | 0,0% | 0,0% | 0,0% | 15,8% | 6,07 | 19,2 | 0,0% | 0,0% |
| casa | 660 | 85,5% | 6,5% | 9,4% | 0,0% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 19,0% | 5,92 | 17,3 | 0,0% | 0,0% |
| casa+ | 660 | 92,7% | 0,0% | 6,5% | 0,0% | 0,0% | 0,2% | 1,1% | 0,0% | 0,0% | 0,0% | 16,0% | 6,08 | 20,2 | 0,0% | 0,0% |
| condominio | 660 | 93,8% | 0,0% | 5,5% | 0,0% | 0,0% | 0,2% | 1,1% | 0,0% | 0,0% | 0,0% | 17,8% | 5,94 | 18 | 0,0% | 0,0% |
| condominio+ | 660 | 93,5% | 0,0% | 6,2% | 0,0% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 15,8% | 6,08 | 18,3 | 0,0% | 0,0% |
| diego | 660 | 85,0% | 6,1% | 10,2% | 0,0% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 21,7% | 5,9 | 18,8 | 0,2% | 0,0% |
| elasticos | 660 | 84,1% | 6,1% | 10,9% | 0,0% | 0,0% | 0,0% | 1,4% | 0,0% | 0,0% | 0,0% | 21,7% | 5,9 | 18,1 | 0,2% | 0,0% |
| halteres | 660 | 93,6% | 0,0% | 6,1% | 0,0% | 0,0% | 0,2% | 0,6% | 0,0% | 0,0% | 0,0% | 17,8% | 5,77 | 17,3 | 0,0% | 0,0% |
| halteres-banco | 660 | 88,0% | 7,1% | 5,9% | 0,0% | 0,0% | 0,2% | 0,6% | 0,0% | 0,0% | 0,0% | 17,8% | 5,81 | 17,2 | 0,0% | 0,0% |
| halteres+bola | 660 | 93,6% | 0,0% | 6,1% | 0,0% | 0,0% | 0,2% | 0,6% | 0,0% | 0,0% | 0,0% | 17,8% | 5,77 | 17,1 | 0,0% | 0,0% |
| so:abdominal_maquina | 660 | 95,8% | 0,0% | 3,2% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 11,0% | 5,54 | 12,6 | 26,7% | 0,0% |
| so:anilhas_e_manoplas | 660 | 93,6% | 0,0% | 6,1% | 0,0% | 0,0% | 0,2% | 0,6% | 0,0% | 0,0% | 0,0% | 17,8% | 5,77 | 17,3 | 0,0% | 0,0% |
| so:banco_romano | 660 | 94,2% | 0,0% | 4,5% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 0,0% | 14,3% | 5,5 | 13,2 | 26,7% | 0,0% |
| so:barra_fixa | 660 | 93,0% | 0,0% | 4,4% | 0,0% | 0,0% | 1,7% | 2,1% | 0,0% | 0,0% | 0,0% | 15,7% | 4,9 | 14,6 | 6,7% | 0,0% |
| so:barra_hexagonal | 660 | 96,2% | 0,0% | 2,7% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 12,7% | 5,53 | 12,7 | 26,7% | 0,0% |
| so:barra_longa | 660 | 90,6% | 0,0% | 5,3% | 0,0% | 0,0% | 3,2% | 1,8% | 0,0% | 0,0% | 0,0% | 17,2% | 5,08 | 13,5 | 33,3% | 0,0% |
| so:barra_w | 660 | 94,7% | 0,0% | 3,8% | 0,0% | 0,0% | 1,5% | 0,0% | 0,0% | 0,0% | 0,0% | 13,3% | 5,83 | 13,3 | 33,9% | 0,0% |
| so:bola_suica | 660 | 95,0% | 0,0% | 4,1% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 13,0% | 5,53 | 13,4 | 26,7% | 0,0% |
| so:cadeira_abdutora_adutora | 660 | 95,5% | 0,0% | 3,3% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 0,0% | 11,7% | 5,55 | 12,8 | 26,7% | 0,0% |
| so:cadeira_extensora | 660 | 96,7% | 0,0% | 2,6% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 8,8% | 5,73 | 13,3 | 26,7% | 0,0% |
| so:cadeira_flexora | 660 | 96,2% | 0,0% | 3,0% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 10,2% | 5,53 | 12,8 | 26,7% | 0,0% |
| so:caneleiras | 660 | 95,0% | 0,0% | 3,5% | 0,0% | 0,0% | 1,5% | 0,0% | 0,0% | 0,0% | 0,0% | 12,0% | 6,07 | 13,8 | 27,7% | 0,0% |
| so:desenvolvimento_maquina | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 12,8 | 26,7% | 0,0% |
| so:estacao_polia_dupla | 660 | 81,2% | 6,5% | 12,7% | 0,0% | 0,0% | 0,9% | 1,1% | 0,0% | 0,0% | 0,0% | 23,7% | 5,83 | 16,2 | 7,9% | 0,0% |
| so:estacao_puxada | 660 | 89,5% | 0,0% | 5,2% | 0,0% | 0,0% | 4,4% | 2,3% | 0,0% | 0,0% | 0,0% | 16,0% | 4,8 | 13,3 | 15,2% | 0,0% |
| so:estacao_remada | 660 | 87,9% | 0,0% | 4,5% | 0,0% | 0,0% | 4,4% | 4,2% | 0,0% | 0,0% | 0,0% | 16,8% | 4,81 | 13,3 | 13,3% | 0,0% |
| so:gluteo_maquina | 660 | 97,1% | 0,0% | 1,8% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 10,7% | 5,5 | 12,6 | 26,7% | 0,0% |
| so:graviton | 660 | 89,5% | 0,0% | 5,2% | 0,0% | 0,0% | 4,4% | 2,1% | 0,0% | 0,0% | 0,0% | 16,0% | 4,82 | 13,9 | 12,3% | 0,0% |
| so:hack | 660 | 95,6% | 0,0% | 3,3% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,55 | 12,7 | 26,7% | 0,0% |
| so:halteres_fixos | 660 | 93,2% | 0,0% | 6,1% | 0,0% | 0,0% | 0,2% | 1,1% | 0,0% | 0,0% | 0,0% | 18,2% | 5,76 | 17,2 | 0,0% | 0,0% |
| so:kettlebell | 660 | 87,6% | 1,1% | 8,3% | 0,0% | 0,0% | 2,7% | 2,0% | 0,0% | 0,0% | 0,0% | 12,3% | 5,09 | 14,2 | 20,0% | 0,0% |
| so:leg_press | 660 | 95,6% | 0,0% | 3,3% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 10,5% | 5,56 | 12,7 | 26,7% | 0,0% |
| so:mesa_flexora | 660 | 96,2% | 0,0% | 3,0% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 10,2% | 5,53 | 12,8 | 26,7% | 0,0% |
| so:mini_band | 660 | 96,1% | 0,0% | 3,3% | 0,0% | 0,0% | 0,6% | 0,0% | 0,0% | 0,0% | 0,0% | 9,7% | 5,72 | 13,4 | 26,7% | 0,0% |
| so:multifuncional | 660 | 91,8% | 0,0% | 6,2% | 0,0% | 0,0% | 1,4% | 1,2% | 0,0% | 0,0% | 0,0% | 15,3% | 5,04 | 14,1 | 6,7% | 0,0% |
| so:panturrilha_em_pe_maquina | 660 | 95,3% | 0,0% | 3,6% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 10,5% | 5,55 | 12,8 | 26,7% | 0,0% |
| so:panturrilha_sentada_maquina | 660 | 95,5% | 0,0% | 3,5% | 0,0% | 0,0% | 1,1% | 0,0% | 0,0% | 0,0% | 0,0% | 10,7% | 5,55 | 12,8 | 26,7% | 0,0% |
| so:paralelas | 660 | 95,3% | 0,0% | 3,8% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,7% | 5,54 | 13,8 | 26,7% | 0,0% |
| so:rack_de_agachamento | 660 | 88,0% | 0,0% | 6,8% | 0,0% | 0,0% | 4,4% | 1,4% | 0,0% | 0,0% | 0,0% | 15,3% | 4,78 | 13,1 | 20,0% | 0,0% |
| so:remada_articulada | 660 | 87,9% | 0,0% | 4,5% | 0,0% | 0,0% | 4,4% | 4,2% | 0,0% | 0,0% | 0,0% | 16,8% | 4,81 | 13,3 | 13,3% | 0,0% |
| so:roda_abdominal | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 13,2 | 26,7% | 0,0% |
| so:rosca_maquina | 660 | 95,0% | 0,0% | 3,5% | 0,0% | 0,0% | 1,5% | 0,0% | 0,0% | 0,0% | 0,0% | 13,2% | 5,84 | 13,3 | 33,9% | 0,0% |
| so:smith | 660 | 88,5% | 0,0% | 6,8% | 0,0% | 0,0% | 4,4% | 0,9% | 0,0% | 0,0% | 0,0% | 14,8% | 4,79 | 13 | 20,0% | 0,0% |
| so:step | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 13 | 26,7% | 0,0% |
| so:supino_maquina | 660 | 95,8% | 0,0% | 3,5% | 0,0% | 0,0% | 0,8% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,56 | 13,1 | 18,9% | 0,0% |
| so:suspensao | 660 | 87,6% | 0,9% | 7,7% | 0,0% | 0,0% | 3,5% | 1,4% | 0,0% | 0,0% | 0,0% | 10,7% | 5,13 | 14,4 | 20,0% | 0,0% |
| so:triceps_maquina | 660 | 95,2% | 0,0% | 3,6% | 0,0% | 0,0% | 1,2% | 0,0% | 0,0% | 0,0% | 0,0% | 13,8% | 5,55 | 12,8 | 26,7% | 0,0% |
| so:voador | 660 | 95,8% | 0,0% | 3,8% | 0,0% | 0,0% | 0,5% | 0,0% | 0,0% | 0,0% | 0,0% | 11,5% | 5,71 | 13,5 | 20,8% | 0,0% |
| step+elasticos | 660 | 84,1% | 6,1% | 10,9% | 0,0% | 0,0% | 0,0% | 1,4% | 0,0% | 0,0% | 0,0% | 21,8% | 5,9 | 18,3 | 0,2% | 0,0% |
| suspensao+elasticos | 660 | 84,1% | 6,4% | 10,6% | 0,0% | 0,0% | 0,0% | 1,4% | 0,0% | 0,0% | 0,0% | 20,7% | 5,9 | 17,8 | 0,2% | 0,0% |
| vazio | 660 | 95,5% | 0,0% | 3,6% | 0,0% | 0,0% | 0,9% | 0,0% | 0,0% | 0,0% | 0,0% | 11,2% | 5,54 | 12,8 | 26,7% | 0,0% |

## Uso de cada exercício

Programas sem dor em que o exercício aparece (os sem animação aprovada, que aparecem como cartão de texto, vêm marcados).

| exercício | animação | programas | % |
| --- | --- | ---: | ---: |
| abdominal-chao | sim | 33.887 | 93,4% |
| flexao | sim | 30.558 | 84,2% |
| panturrilha-degrau | sim | 29.722 | 81,9% |
| afundo-peso-corpo | sim | 26.402 | 72,7% |
| flexao-joelho-deslizante | sim | 25.560 | 70,4% |
| ponte-gluteo | sim | 24.051 | 66,3% |
| extensao-triceps-peso-corpo | sim | 21.668 | 59,7% |
| agachamento-peso-corpo | sim | 21.126 | 58,2% |
| abertura-t-deitado | sim | 20.290 | 55,9% |
| flexao-pes-elevados | sim | 19.431 | 53,5% |
| abdominal-invertido | sim | 18.761 | 51,7% |
| flexao-fechada | sim | 15.746 | 43,4% |
| nordico | sim | 15.446 | 42,6% |
| afundo-tras-peso-corpo | sim | 9.942 | 27,4% |
| afundo | sim | 9.240 | 25,5% |
| stiff | sim | 8.084 | 22,3% |
| goblet | sim | 7.260 | 20,0% |
| triceps-frances-halter | sim | 6.929 | 19,1% |
| elevacao-halteres | sim | 6.777 | 18,7% |
| pike | sim | 5.979 | 16,5% |
| ponte-gluteo-halter | sim | 5.460 | 15,0% |
| supino-reto | sim | 5.280 | 14,5% |
| supino-inclinado | sim | 4.620 | 12,7% |
| remada-curvada-halteres | sim | 4.580 | 12,6% |
| aducao-deitado | sim | 4.233 | 11,7% |
| crucifixo-invertido-sentado | sim | 4.014 | 11,1% |
| puxada-frente | sim | 3.960 | 10,9% |
| rosca-alternada | sim | 3.750 | 10,3% |
| extensao-joelho-elastico | sim | 3.564 | 9,8% |
| flexao-joelho-elastico | sim | 3.478 | 9,6% |
| remada-unilateral-sem-banco | sim | 3.217 | 8,9% |
| abducao-deitado | sim | 3.176 | 8,7% |
| crucifixo-inverso | sim | 3.176 | 8,7% |
| rosca-inclinada | sim | 3.129 | 8,6% |
| flexao-bola | sim | 3.059 | 8,4% |
| cadeira-flexora | sim | 3.036 | 8,4% |
| triceps-testa-halteres | sim | 3.030 | 8,3% |
| cadeira-extensora | sim | 3.003 | 8,3% |
| remada-baixa-estacao | sim | 2.918 | 8,0% |
| agachamento-elastico | sim | 2.640 | 7,3% |
| stiff-elastico | sim | 2.640 | 7,3% |
| bulgaro-peso-corpo | sim | 2.578 | 7,1% |
| remada-elastico | sim | 2.385 | 6,6% |
| crucifixo-halteres | sim | 2.347 | 6,5% |
| triceps-elastico-acima | sim | 2.329 | 6,4% |
| terra-romeno-barra | sim | 2.200 | 6,1% |
| hip-thrust | sim | 2.184 | 6,0% |
| panturrilha | sim | 2.111 | 5,8% |
| panturrilha-bilateral-step | sim | 2.111 | 5,8% |
| crucifixo-elastico | sim | 2.072 | 5,7% |
| elevacao-lateral-elastico | sim | 2.064 | 5,7% |
| remada-apoiada | sim | 1.984 | 5,5% |
| panturrilha-em-pe-maquina | sim | 1.980 | 5,5% |
| face-pull-elastico | sim | 1.949 | 5,4% |
| panturrilha-chao | sim | 1.947 | 5,4% |
| puxada-elastico | sim | 1.851 | 5,1% |
| barra-fixa | sim | 1.760 | 4,8% |
| leg-press | sim | 1.760 | 4,8% |
| triceps-frances | sim | 1.748 | 4,8% |
| panturrilha-leg-press | sim | 1.746 | 4,8% |
| voador | sim | 1.709 | 4,7% |
| remada-unilateral-halter | sim | 1.683 | 4,6% |
| stiff-unilateral | sim | 1.633 | 4,5% |
| rosca-martelo | sim | 1.623 | 4,5% |
| abdominal-maquina | sim | 1.616 | 4,5% |
| rosca-elastico | sim | 1.613 | 4,4% |
| abdominal-bola | sim | 1.609 | 4,4% |
| remada-baixa | sim | 1.593 | 4,4% |
| abdominal-polia | sim | 1.586 | 4,4% |
| supino-chao-halteres | sim | 1.556 | 4,3% |
| triceps-frances-unilateral-halter | sim | 1.481 | 4,1% |
| barra-fixa-supinada | sim | 1.455 | 4,0% |
| afundo-tras | sim | 1.435 | 4,0% |
| desenvolvimento-unilateral | sim | 1.384 | 3,8% |
| puxada-barra-reta | sim | 1.376 | 3,8% |
| supino-maquina | sim | 1.324 | 3,6% |
| remada-invertida | sim | 1.320 | 3,6% |
| remada-suspensao | sim | 1.320 | 3,6% |
| desenvolvimento | sim | 1.246 | 3,4% |
| triceps-suspensao | sim | 1.224 | 3,4% |
| extensao-joelho-caneleira | sim | 1.221 | 3,4% |
| barra-fixa-negativa | sim | 1.178 | 3,2% |
| rosca-scott-banco-inclinado | sim | 1.097 | 3,0% |
| rosca-suspensao | sim | 1.094 | 3,0% |
| rosca-scott | sim | 1.076 | 3,0% |
| elevacao-lateral | sim | 1.050 | 2,9% |
| elevacao-lateral-unilateral-elastico | sim | 973 | 2,7% |
| triceps-corda | sim | 957 | 2,6% |
| crucifixo-polia | sim | 952 | 2,6% |
| triceps-frances-kettlebell | sim | 931 | 2,6% |
| remada-articulada | sim | 924 | 2,5% |
| agachamento-barra | sim | 880 | 2,4% |
| remada-curvada-elastico | sim | 816 | 2,2% |
| panturrilha-sentada-halter | sim | 721 | 2,0% |
| desenvolvimento-elastico | sim | 712 | 2,0% |
| yt-suspensao | sim | 704 | 1,9% |
| stiff-kettlebell | sim | 694 | 1,9% |
| rosca-martelo-elastico | sim | 693 | 1,9% |
| afundo-kettlebell | sim | 660 | 1,8% |
| agachamento-smith | sim | 660 | 1,8% |
| barra-fixa-graviton | sim | 660 | 1,8% |
| goblet-kettlebell | sim | 660 | 1,8% |
| hack | sim | 660 | 1,8% |
| hiperextensao | sim | 660 | 1,8% |
| mesa-flexora | sim | 660 | 1,8% |
| puxada-unilateral | sim | 660 | 1,8% |
| remada-unilateral-kettlebell | sim | 660 | 1,8% |
| remada-unilateral-polia | sim | 660 | 1,8% |
| terra-hexagonal | sim | 660 | 1,8% |
| rosca-maquina | sim | 636 | 1,8% |
| extensao-joelho-mini-band | sim | 627 | 1,7% |
| mergulho | sim | 614 | 1,7% |
| ponte-kettlebell | sim | 608 | 1,7% |
| elevacao-lateral-caneleira | sim | 603 | 1,7% |
| coice-caneleira | sim | 591 | 1,6% |
| triceps-frances-polia-unilateral | sim | 582 | 1,6% |
| coice-maquina | sim | 570 | 1,6% |
| rosca-barra-w | sim | 558 | 1,5% |
| rosca-kettlebell | sim | 553 | 1,5% |
| mergulho-graviton | sim | 546 | 1,5% |
| rosca-polia-costas | sim | 528 | 1,5% |
| crucifixo-invertido-polia | sim | 525 | 1,4% |
| abertura-elastico | sim | 498 | 1,4% |
| voador-invertido | sim | 495 | 1,4% |
| crucifixo-invertido-caneleira | sim | 462 | 1,3% |
| supino-barra | sim | 458 | 1,3% |
| remada-barra | sim | 440 | 1,2% |
| flexao-joelho-suspensao | sim | 418 | 1,2% |
| triceps-maquina | sim | 403 | 1,1% |
| elevacao-joelhos | sim | 399 | 1,1% |
| crucifixo-inclinado-halteres | sim | 378 | 1,0% |
| abducao-elastico | sim | 354 | 1,0% |
| crucifixo-invertido-curvado | sim | 333 | 0,9% |
| face-pull | sim | 332 | 0,9% |
| agachamento-halteres | sim | 295 | 0,8% |
| roda-abdominal | sim | 277 | 0,8% |
| elevacao-joelhos-paralelas | sim | 274 | 0,8% |
| crucifixo-polia-baixo | sim | 264 | 0,7% |
| rosca-concentrada | sim | 263 | 0,7% |
| aducao-maquina | sim | 255 | 0,7% |
| coice-elastico | sim | 243 | 0,7% |
| desenvolvimento-maquina | sim | 215 | 0,6% |
| aducao-caneleira | sim | 214 | 0,6% |
| supino-inclinado-polia | sim | 210 | 0,6% |
| abducao-maquina | sim | 208 | 0,6% |
| abducao-caneleira | sim | 200 | 0,6% |
| panturrilha-sentada | sim | 200 | 0,6% |
| face-pull-suspensao | sim | 196 | 0,5% |
| desenvolvimento-unilateral-kettlebell | sim | 192 | 0,5% |
| flexao-elastico | sim | 176 | 0,5% |
| stiff-unilateral-kettlebell | sim | 167 | 0,5% |
| triceps-elastico-alto | sim | 151 | 0,4% |
| triceps-barra-reta | sim | 150 | 0,4% |
| ponte-pes-bola | sim | 138 | 0,4% |
| elevacao-lateral-unilateral | sim | 127 | 0,3% |
| abducao-mini-band | sim | 80 | 0,2% |
| abdominal-declinado | sim | 77 | 0,2% |
| caminhada-lateral-mini-band | sim | 24 | 0,1% |
| bulgaro | sim | 6 | 0,0% |
| abducao-deitado-mini-band | sim | 0 | 0,0% |
| abducao-polia | sim | 0 | 0,0% |
| bulgaro-suspensao | sim | 0 | 0,0% |
| coice-polia | sim | 0 | 0,0% |
| desenvolvimento-barra | sim | 0 | 0,0% |
| desenvolvimento-em-pe-halteres | sim | 0 | 0,0% |
| elevacao-lateral-deitado | sim | 0 | 0,0% |
| pull-through | sim | 0 | 0,0% |
| remada-unilateral-elastico | sim | 0 | 0,0% |
| rosca-polia | sim | 0 | 0,0% |
| supino-polia | sim | 0 | 0,0% |
| supino-smith | sim | 0 | 0,0% |

## Exemplos

O 1º programa da grade com cada defeito e nota.

- **A2** (sem dor), casa · iniciante · 5 dias · 30 min · foco nenhum · sem dor: Empurrar sem multiarticular.
  - Superior (30 min): flexao 3, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 3 | Inferior (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Empurrar (22 min): elevacao-halteres 3, triceps-frances-halter 4, crucifixo-elastico 3 | Puxar (22 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-alternada 2 | Pernas (30 min): afundo 2, ponte-gluteo-halter 3, extensao-joelho-elastico 2, flexao-joelho-elastico 2
- **A3** (sem dor), casa · iniciante · 2 dias · 30 min · foco peito · sem dor: dia de 41 min em 30.
  - Corpo todo A (41 min): flexao 4, goblet 2, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (34 min): flexao 4, afundo 3, remada-curvada-halteres 2, abdominal-chao 2
- **C1** (sem dor), casa+ · avancado · 2 dias · 90 min · foco peito · sem dor: peito com 12 de 14 e o dia mais longo em 76 de 90 min.
  - Corpo todo A (76 min): supino-reto 4, goblet 2, barra-fixa 3, stiff 3, crucifixo-halteres 4, triceps-frances-halter 2, elevacao-halteres 3, panturrilha 4, abdominal-chao 2 | Corpo todo B (69 min): supino-inclinado 4, afundo 2, remada-apoiada 3, flexao-bola 3, extensao-joelho-caneleira 2, rosca-inclinada 3, crucifixo-inverso 3, elevacao-halteres 3, abdominal-bola 2
- **D1** (sem dor), casa · iniciante · 2 dias · 30 min · foco peito · sem dor: empurrar 8 ÷ puxar 4 séries.
  - Corpo todo A (41 min): flexao 4, goblet 2, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (34 min): flexao 4, afundo 3, remada-curvada-halteres 2, abdominal-chao 2
- **A1** (sem dor), casa · iniciante · 2 dias · 90 min · foco bracos · sem dor: Corpo todo A com 11 exercícios em 90 min (faixa 5–10).
  - Corpo todo A (88 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, rosca-alternada 4, triceps-testa-halteres 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (70 min): afundo 3, flexao 2, remada-curvada-halteres 3, rosca-alternada 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-chao 2
- **A5** (sem dor), casa · iniciante · 4 dias · 90 min · foco superiores · sem dor: dias de 38 a 70 min.
  - Superior A (70 min): flexao 3, remada-curvada-halteres 3, remada-unilateral-sem-banco 3, desenvolvimento-unilateral 2, triceps-frances-halter 3, elevacao-halteres 3, rosca-alternada 3, crucifixo-elastico 3, crucifixo-invertido-sentado 2 | Inferior A (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 2 | Superior B (57 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, desenvolvimento-unilateral 2, elevacao-halteres 3, rosca-alternada 2, triceps-testa-halteres 3, crucifixo-elastico 2, crucifixo-invertido-sentado 2 | Inferior B (51 min): afundo 2, ponte-gluteo-halter 2, stiff 2, elevacao-halteres 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 2
- **B2** (sem dor), elasticos · avancado · 3 dias · 90 min · foco superiores · sem dor: elevacao-lateral-elastico em todos os dias, sem outro do mesmo nível.
  - Corpo todo A (88 min): flexao 3, puxada-elastico 4, remada-curvada-elastico 2, agachamento-elastico 3, triceps-elastico-acima 4, elevacao-lateral-elastico 4, crucifixo-elastico 3, rosca-elastico 4, flexao-joelho-elastico 3, abdominal-chao 2 | Corpo todo B (88 min): flexao-pes-elevados 2, remada-elastico 4, stiff-elastico 3, desenvolvimento-elastico 2, rosca-martelo-elastico 4, elevacao-lateral-elastico 4, extensao-joelho-elastico 3, panturrilha-degrau 4, face-pull-elastico 2, abdominal-invertido 2 | Corpo todo C (89 min): flexao 2, puxada-elastico 4, flexao-fechada 4, afundo-peso-corpo 2, ponte-gluteo 3, elevacao-lateral-unilateral-elastico 4, rosca-elastico 2, elevacao-lateral-elastico 2, triceps-elastico-acima 2, flexao-joelho-elastico 2, abdominal-chao 2
- **B3** (sem dor), vazio · iniciante · 3 dias · 45 min · foco nenhum · sem dor: flexao, flexao-joelho-deslizante em todos os dias.
  - Corpo todo A (42 min): agachamento-peso-corpo 4, flexao 2, flexao-joelho-deslizante 4, extensao-triceps-peso-corpo 3, abdominal-chao 2 | Corpo todo B (43 min): flexao 2, afundo-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-degrau 4, abertura-t-deitado 4, abdominal-chao 2 | Corpo todo C (39 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, flexao-fechada 2, flexao-joelho-deslizante 2, abdominal-invertido 2
- **C2** (sem dor), casa · iniciante · 2 dias · 30 min · foco ombros · sem dor: ombro_lateral com 0, mediana dos outros 2,75.
  - Corpo todo A (33 min): goblet 2, flexao 2, remada-curvada-halteres 2, stiff 3, panturrilha-degrau 2 | Corpo todo B (29 min): afundo 3, flexao 3, remada-curvada-halteres 2, abdominal-chao 2
- **A2** (com dor), casa · iniciante · 4 dias · 30 min · foco bracos · ombro 7: Superior A sem multiarticular.
  - Superior A (21 min): rosca-alternada 4, rosca-martelo 2, triceps-elastico-alto 4 | Inferior A (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Superior B (17 min): rosca-alternada 4, triceps-elastico-alto 4 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2
- **A3** (com dor), casa · iniciante · 2 dias · 30 min · foco peito · joelho 7: dia de 38 min em 30.
  - Corpo todo A (38 min): flexao 4, remada-curvada-halteres 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2 | Corpo todo B (31 min): flexao 4, remada-curvada-halteres 2, stiff 2, abdominal-chao 2
- **C1** (com dor), casa · iniciante · 2 dias · 90 min · foco bracos · ombro 7: triceps com 8 de 10 e o dia mais longo em 65 de 90 min.
  - Corpo todo A (54 min): goblet 2, stiff 3, rosca-alternada 4, rosca-martelo 2, triceps-elastico-alto 4, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (65 min): afundo 2, ponte-gluteo-halter 3, rosca-alternada 4, triceps-elastico-alto 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, aducao-deitado 2, abdominal-chao 2
- **D1** (com dor), casa · iniciante · 2 dias · 30 min · foco peito · joelho 7: empurrar 8 ÷ puxar 4 séries.
  - Corpo todo A (38 min): flexao 4, remada-curvada-halteres 2, stiff 2, elevacao-halteres 3+drop, panturrilha-degrau 2 | Corpo todo B (31 min): flexao 4, remada-curvada-halteres 2, stiff 2, abdominal-chao 2
- **A1** (com dor), casa · iniciante · 2 dias · 30 min · foco superiores · joelho 7: Corpo todo A com 6 exercícios em 30 min (faixa 3–5).
  - Corpo todo A (39 min): flexao 2, remada-curvada-halteres 4, stiff 2, elevacao-halteres 2+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): flexao 4, remada-curvada-halteres 4, stiff 2, rosca-alternada 2+drop
- **A5** (com dor), casa · iniciante · 4 dias · 30 min · foco bracos · ombro 7: dias de 17 a 30 min.
  - Superior A (21 min): rosca-alternada 4, rosca-martelo 2, triceps-elastico-alto 4 | Inferior A (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Superior B (17 min): rosca-alternada 4, triceps-elastico-alto 4 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2
- **B2** (com dor), casa · iniciante · 3 dias · 60 min · foco bracos · ombro 7: triceps-elastico-alto em todos os dias, sem outro do mesmo nível.
  - Corpo todo A (42 min): goblet 2, ponte-gluteo-halter 2, rosca-alternada 4, triceps-elastico-alto 4, flexao-joelho-elastico 2, abdominal-chao 2 | Corpo todo B (47 min): stiff 2, rosca-alternada 3, triceps-elastico-alto 2, extensao-joelho-elastico 2, panturrilha-degrau 4, abducao-elastico 2, abdominal-chao 2 | Corpo todo C (42 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 4, rosca-martelo 3, flexao-joelho-elastico 2, abdominal-invertido 2
- **B3** (com dor), elasticos · avancado · 3 dias · 90 min · foco superiores · joelho 7: stiff-elastico, elevacao-lateral-elastico em todos os dias.
  - Corpo todo A (89 min): flexao 3, remada-elastico 4, remada-unilateral-elastico 2, stiff-elastico 3, triceps-elastico-acima 4, elevacao-lateral-elastico 4, crucifixo-elastico 3, rosca-elastico 4, abducao-elastico 2, abdominal-chao 2 | Corpo todo B (86 min): flexao-pes-elevados 2, remada-elastico 4, stiff-elastico 3, desenvolvimento-elastico 2, rosca-martelo-elastico 4, elevacao-lateral-elastico 4, panturrilha-degrau 4, face-pull-elastico 2, aducao-deitado 2, abdominal-invertido 2 | Corpo todo C (90 min): flexao 2, remada-curvada-elastico 4, flexao-fechada 4, ponte-gluteo 2, stiff-elastico 2, elevacao-lateral-unilateral-elastico 4, rosca-elastico 2, elevacao-lateral-elastico 2, triceps-elastico-acima 2, panturrilha-chao 3, abdominal-chao 2
- **C2** (com dor), casa · iniciante · 2 dias · 30 min · foco bracos · ombro 7: triceps com 0, mediana dos outros 4.
  - Corpo todo A (30 min): goblet 3, stiff 2, rosca-alternada 3+drop, panturrilha-degrau 4 | Corpo todo B (29 min): afundo 3, rosca-alternada 2+drop, flexao-joelho-elastico 2, abdominal-chao 4

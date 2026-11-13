# A biblioteca por músculo e por cenário de equipamento

> Gerado por `scripts/auditoria/biblioteca-cobertura.ts`. Dados fictícios. Em cada célula: exercícios diretos possíveis para o músculo / quantos deles são 1ª escolha de alguma função. Nível intermediário, sem dor.

| cenário | peito | costas | ombro lateral | ombro de trás | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | 18 / 11 | 17 / 14 | 4 / 2 | 6 / 5 | 10 / 5 | 12 / 7 | 15 / 8 | 9 / 4 | 10 / 5 | 8 / 5 | 6 / 2 |
| academia+ | 20 / 11 | 23 / 15 | 7 / 2 | 12 / 6 | 14 / 5 | 16 / 9 | 22 / 9 | 15 / 6 | 19 / 5 | 8 / 5 | 9 / 3 |
| bairro | 9 / 4 | 7 / 6 | 3 / 1 | 4 / 3 | 5 / 2 | 6 / 2 | 11 / 5 | 5 / 3 | 3 / 0 | 4 / 1 | 4 / 0 |
| bruno | 14 / 7 | 16 / 10 | 6 / 2 | 8 / 5 | 9 / 3 | 11 / 7 | 11 / 3 | 9 / 3 | 7 / 1 | 5 / 2 | 6 / 2 |
| condominio | 8 / 4 | 6 / 6 | 3 / 1 | 4 / 3 | 5 / 2 | 5 / 2 | 9 / 3 | 5 / 2 | 4 / 0 | 3 / 0 | 3 / 0 |
| condominio+ | 12 / 6 | 15 / 9 | 6 / 1 | 7 / 3 | 9 / 2 | 8 / 4 | 16 / 5 | 11 / 6 | 13 / 1 | 5 / 2 | 5 / 0 |
| casa | 6 / 0 | 6 / 2 | 5 / 1 | 5 / 2 | 5 / 0 | 7 / 3 | 10 / 2 | 6 / 2 | 5 / 0 | 3 / 0 | 2 / 0 |
| casa+ | 10 / 4 | 13 / 7 | 6 / 1 | 9 / 3 | 9 / 2 | 9 / 4 | 16 / 4 | 10 / 4 | 12 / 0 | 5 / 2 | 5 / 0 |
| halteres | 4 / 0 | 2 / 2 | 3 / 1 | 3 / 2 | 3 / 0 | 5 / 2 | 8 / 2 | 4 / 2 | 3 / 0 | 3 / 0 | 2 / 0 |
| halteres-banco | 6 / 2 | 3 / 3 | 3 / 1 | 3 / 2 | 3 / 0 | 5 / 2 | 9 / 3 | 4 / 2 | 3 / 0 | 3 / 0 | 2 / 0 |
| elasticos | 5 / 0 | 4 / 0 | 2 / 0 | 3 / 0 | 2 / 0 | 4 / 1 | 6 / 0 | 4 / 0 | 4 / 0 | 2 / 0 | 2 / 0 |
| diego | 5 / 0 | 7 / 2 | 2 / 0 | 3 / 0 | 2 / 0 | 4 / 1 | 6 / 0 | 4 / 0 | 4 / 0 | 2 / 0 | 3 / 0 |
| so:barra_fixa | 3 / 0 | 3 / 2 | **0** | 1 / 0 | **0** | 2 / 0 | 4 / 0 | 2 / 0 | 2 / 0 | 2 / 0 | 3 / 0 |
| so:kettlebell | 3 / 0 | 1 / 1 | **0** | 1 / 0 | 1 / 0 | 3 / 1 | 6 / 1 | 4 / 2 | 3 / 0 | 2 / 0 | 2 / 0 |
| so:suspensao | 3 / 0 | 1 / 0 | **0** | 3 / 0 | 1 / 0 | 3 / 0 | 5 / 0 | 3 / 0 | 2 / 0 | 2 / 0 | 2 / 0 |
| vazio | 3 / 0 | **0** | **0** | 1 / 0 | **0** | 2 / 0 | 4 / 0 | 2 / 0 | 2 / 0 | 2 / 0 | 2 / 0 |

## Onde falta exercício (os 55 cenários)

Em quantos dos 55 cenários o músculo fica sem nenhum exercício direto, com 1 só, e sem nenhuma 1ª escolha; "peso": a fatia estimada das pessoas nesses cenários (`populacao.ts`).

| músculo | sem exercício: cenários | peso | 1 exercício só: cenários | peso | sem 1ª escolha: cenários | peso |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| peito | 0 | 0,0% | 0 | 0,0% | 43 | 28,6% |
| costas | 25 | 10,9% | 9 | 1,8% | 32 | 15,8% |
| ombro lateral | 35 | 13,8% | 2 | 0,2% | 40 | 18,9% |
| ombro de trás | 0 | 0,0% | 34 | 13,3% | 40 | 18,9% |
| bíceps | 32 | 12,6% | 5 | 1,4% | 46 | 31,8% |
| tríceps | 0 | 0,0% | 0 | 0,0% | 34 | 13,3% |
| quadríceps | 0 | 0,0% | 0 | 0,0% | 36 | 18,0% |
| posteriores da coxa | 0 | 0,0% | 0 | 0,0% | 38 | 18,3% |
| glúteos | 0 | 0,0% | 0 | 0,0% | 49 | 50,8% |
| panturrilha | 0 | 0,0% | 0 | 0,0% | 44 | 36,5% |
| abdômen | 0 | 0,0% | 0 | 0,0% | 51 | 56,9% |

## O iniciante perde opções pela complexidade?

| cenário | músculos sem exercício: iniciante | intermediário |
| --- | --- | --- |
| academia | — | — |
| academia+ | — | — |
| bairro | — | — |
| bruno | — | — |
| condominio | — | — |
| condominio+ | — | — |
| casa | — | — |
| casa+ | — | — |
| halteres | — | — |
| halteres-banco | — | — |
| elasticos | — | — |
| diego | — | — |
| so:barra_fixa | ombro lateral, bíceps | ombro lateral, bíceps |
| so:kettlebell | ombro lateral | ombro lateral |
| so:suspensao | ombro lateral | ombro lateral |
| vazio | costas, ombro lateral, bíceps | costas, ombro lateral, bíceps |

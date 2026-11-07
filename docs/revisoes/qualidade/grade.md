# Estresse de qualidade dos treinos gerados

> Gerado por `npm run auditoria:qualidade` (`scripts/auditoria/qualidade.ts`). Dados fictícios. Não editar à mão.

**911.625 programas** (3.646.500 dias de treino): 55 cenários de equipamento × 3 níveis × 5 números de dias (a divisão recomendada de cada um) × 5 durações (30, 45, 60, 75, 90 min) × 13 prioridades × 15 situações de dor; nos casos sem dor, mais 2 variantes com um exercício evitado (o 1º da vaga de agachar e o 1º da de empurrar horizontal). 0 bloqueados.

## Suspeitos (contagem de ocorrências)

`dia.poucos-exercicios`: dia com menos de 5 exercícios tendo 45 min ou mais. `tempo.uso-baixo`: o dia mais longo usa menos de 70% dos minutos (`tempo.sobra`). `volume.zero-sem-aviso`: músculo grande com 0 série e nenhum aviso o cita. `prioridade.abaixo-com-tempo`: prioritário abaixo da meta com o dia mais longo abaixo de 85% dos minutos, sem dor. `monotonia.todos-os-dias-com-opcao`: o mesmo exercício em todos os dias havendo outro equivalente possível. `regua.*`: os defeitos da régua da G5 (`scripts/auditoria/regua.ts`; a grade própria dela está em `regua.md`).

| suspeito | ocorrências | % (dos dias ou dos programas) |
| --- | ---: | ---: |
| `dia.poucos-exercicios` | 778.564 | 21,4% dos dias |
| `monotonia.todos-os-dias` | 363.952 | 39,9% dos programas |
| `tempo.uso-baixo` | 229.377 | 25,2% dos programas |
| `regua.A2` | 133.696 | 14,7% dos programas |
| `regua.C1` | 58.012 | 6,4% dos programas |
| `regua.A3` | 56.242 | 6,2% dos programas |
| `regua.D1` | 44.498 | 4,9% dos programas |
| `prioridade.abaixo-com-tempo` | 36.327 | 4% dos programas |
| `regua.A4` | 32.829 | 3,6% dos programas |
| `tempo.uso-baixo-sem-aviso` | 18.364 | 2% dos programas |
| `regua.D3` | 13.077 | 1,4% dos programas |
| `monotonia.todos-os-dias-com-opcao` | 5.912 | 0,6% dos programas |
| `regua.B1` | 5.912 | 0,6% dos programas |
| `regua.E1` | 1.426 | 0,2% dos programas |

## Exercícios por dia

Faixas de exercícios por dia de treino (% dos dias), por duração escolhida. "Cabem" é o alvo de `tempo.exercicios-por-sessao`.

| minutos | cabem | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 4 | 16,3% | 76,8% | 6,8% | 0% | 4 |
| 45 | 6 | 9% | 18% | 73% | 0% | 5 |
| 60 | 8 | 9% | 17,6% | 59,8% | 13,6% | 5 |
| 75 | 10 | 9% | 17,6% | 57,5% | 15,9% | 5 |
| 90 | 12 | 9% | 17,6% | 57,2% | 16,2% | 5 |

O mesmo, só nos programas sem dor e sem exercício evitado:

| minutos | cabem | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 4 | 14% | 76,9% | 9% | 0% | 4 |
| 45 | 6 | 6,6% | 13,4% | 80% | 0% | 6 |
| 60 | 8 | 6,6% | 13,4% | 64,3% | 15,8% | 6 |
| 75 | 10 | 6,6% | 13,4% | 61,5% | 18,6% | 6 |
| 90 | 12 | 6,6% | 13,4% | 61,1% | 18,9% | 6 |

Por dias por semana (sem dor e sem exercício evitado; % dos dias com ≤ 3 exercícios, por duração):

| dias | 30 min | 45 min | 60 min | 75 min | 90 min |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | 5,5% | 0% | 0% | 0% | 0% |
| 3 | 9,2% | 0% | 0% | 0% | 0% |
| 4 | 14,4% | 4,8% | 4,8% | 4,8% | 4,8% |
| 5 | 17,3% | 9,2% | 9,2% | 9,2% | 9,2% |
| 6 | 16,4% | 11,1% | 11,1% | 11,1% | 11,1% |

### Por cenário de equipamento, com 45 min ou mais

% dos dias em cada faixa, nos programas sem dor e sem exercício evitado ("limpos"); a coluna "≤ 3 (todos)" conta também os com dor ou exercício evitado. "Uso < 70%" é a fatia dos programas (45 min ou mais, todos) cujo dia mais longo usa menos de 70% dos minutos.

| cenário | grupo | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana | ≤ 3 (todos) | uso < 70% |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | atalho | 0% | 0% | 65,1% | 34,9% | 6 | 5% | 24,7% |
| academia+ | atalho | 0% | 0% | 65,1% | 34,9% | 6 | 5% | 24,6% |
| bairro | persona | 0% | 0% | 65% | 35% | 6 | 4,3% | 26,1% |
| banco+halteres-leves | par | 0% | 0% | 67,4% | 32,5% | 6 | 5,9% | 9,9% |
| bruno | persona | 0% | 0% | 65,9% | 34,1% | 6 | 5% | 19,2% |
| casa | atalho | 0% | 0% | 66,5% | 33,5% | 6 | 4,3% | 19,7% |
| casa+ | atalho | 0% | 0% | 65,6% | 34,4% | 6 | 4,1% | 23,6% |
| condominio | atalho | 0% | 0% | 66,8% | 33,2% | 6 | 4,7% | 10,5% |
| condominio+ | atalho | 0% | 0% | 65,3% | 34,7% | 6 | 4,1% | 25,2% |
| diego | persona | 0% | 0% | 67,4% | 32,6% | 6 | 4,3% | 19,9% |
| elasticos | persona | 0% | 0% | 67,4% | 32,6% | 6 | 4,3% | 19,7% |
| halteres | persona | 0% | 7% | 66% | 27% | 6 | 6% | 9,1% |
| halteres-banco | persona | 0% | 0% | 67,4% | 32,5% | 6 | 5,9% | 9,9% |
| halteres+bola | par | 0% | 7% | 66,1% | 27% | 6 | 5,7% | 9,1% |
| so:abdominal_maquina | item | 0% | 26,5% | 72,2% | 1,3% | 5 | 1,3% | 39,6% |
| so:anilhas_e_manoplas | item | 0% | 7% | 66% | 27% | 6 | 6% | 9,1% |
| so:banco_romano | item | 0% | 27,3% | 71,7% | 1% | 5 | 1,4% | 40,1% |
| so:barra_fixa | item | 31,9% | 13,4% | 48,8% | 5,9% | 5 | 34,6% | 24% |
| so:barra_hexagonal | item | 0% | 26,4% | 72,6% | 1% | 5 | 1,1% | 43,4% |
| so:barra_longa | item | 27,4% | 11,8% | 56,7% | 4,1% | 5 | 27,9% | 24,1% |
| so:barra_w | item | 0% | 9,8% | 85,2% | 5% | 6 | 0,3% | 28,8% |
| so:bola_suica | item | 0% | 26,9% | 72,2% | 1% | 5 | 1,3% | 39,7% |
| so:cadeira_abdutora_adutora | item | 0% | 26,5% | 72,1% | 1,5% | 5 | 1,2% | 41,6% |
| so:cadeira_extensora | item | 0% | 10,2% | 86,7% | 3,1% | 5 | 0,6% | 39,6% |
| so:cadeira_flexora | item | 0% | 26,4% | 72,1% | 1,5% | 5 | 1,2% | 32,9% |
| so:caneleiras | item | 0% | 10,2% | 86,7% | 3,1% | 5 | 0,6% | 39,3% |
| so:desenvolvimento_maquina | item | 0% | 26,5% | 72,2% | 1,3% | 5 | 1,3% | 37,2% |
| so:estacao_polia_dupla | item | 0% | 2,1% | 66,3% | 31,5% | 6 | 3,6% | 11,6% |
| so:estacao_puxada | item | 41,2% | 6,1% | 47% | 5,8% | 5 | 41,8% | 24,2% |
| so:estacao_remada | item | 41,2% | 6% | 47,1% | 5,8% | 5 | 42% | 23,9% |
| so:gluteo_maquina | item | 0% | 26,6% | 72,1% | 1,3% | 5 | 1,3% | 39,8% |
| so:graviton | item | 39,1% | 8,1% | 46,1% | 6,7% | 5 | 40,6% | 23,9% |
| so:hack | item | 0% | 26,5% | 72,2% | 1,3% | 5 | 1,1% | 39,6% |
| so:halteres_fixos | item | 0% | 7% | 66,4% | 26,7% | 6 | 6% | 9,1% |
| so:kettlebell | item | 21,9% | 17,7% | 51,7% | 8,6% | 5 | 23,7% | 15,5% |
| so:leg_press | item | 0% | 26,5% | 70,7% | 2,9% | 5 | 1,1% | 39,3% |
| so:mesa_flexora | item | 0% | 26,4% | 72,1% | 1,5% | 5 | 1,2% | 32,9% |
| so:mini_band | item | 0% | 26,5% | 72,1% | 1,4% | 5 | 1,2% | 40% |
| so:multifuncional | item | 29,2% | 14,8% | 50,1% | 5,8% | 5 | 31,7% | 23,7% |
| so:panturrilha_em_pe_maquina | item | 0% | 26,5% | 70,7% | 2,8% | 5 | 1,2% | 38,1% |
| so:panturrilha_sentada_maquina | item | 0% | 26,5% | 70,3% | 3,2% | 5 | 1,2% | 36,1% |
| so:paralelas | item | 0% | 27% | 71,7% | 1,3% | 5 | 1% | 36,4% |
| so:rack_de_agachamento | item | 41,2% | 6% | 47,1% | 5,8% | 5 | 41,1% | 23,9% |
| so:remada_articulada | item | 41,2% | 6% | 47,1% | 5,8% | 5 | 41,8% | 23,7% |
| so:roda_abdominal | item | 0% | 26,5% | 72,2% | 1,3% | 5 | 1,3% | 37,8% |
| so:rosca_maquina | item | 0% | 9,8% | 84,8% | 5,4% | 6 | 0,2% | 28,5% |
| so:smith | item | 41,2% | 6% | 46,8% | 6% | 5 | 41,1% | 24,8% |
| so:step | item | 0% | 26,5% | 70,8% | 2,7% | 5 | 1,2% | 35,1% |
| so:supino_maquina | item | 0% | 25,7% | 73% | 1,3% | 5 | 0,2% | 36,6% |
| so:suspensao | item | 6,9% | 22,3% | 57,4% | 13,4% | 6 | 10,7% | 18,1% |
| so:triceps_maquina | item | 0% | 26,5% | 72,3% | 1,3% | 5 | 1,2% | 37,2% |
| so:voador | item | 0% | 16,5% | 82,2% | 1,3% | 6 | 0% | 36,6% |
| step+elasticos | par | 0% | 0% | 67,1% | 32,9% | 6 | 4,3% | 18% |
| suspensao+elasticos | par | 0% | 0% | 67,4% | 32,6% | 6 | 4,3% | 19,2% |
| vazio | vazio | 0% | 26,5% | 72,2% | 1,3% | 5 | 1,3% | 37,6% |

## Uso dos minutos

Minutos estimados do dia mais longo ÷ minutos escolhidos (% dos programas).

| minutos | mediana do uso | < 50% | < 70% | ≥ 100% |
| ---: | ---: | ---: | ---: | ---: |
| 30 | 100% | 0% | 0% | 83,5% |
| 45 | 100% | 0% | 0,9% | 68,6% |
| 60 | 95% | 0,4% | 13,6% | 38,1% |
| 75 | 75% | 4,4% | 34,7% | 14,1% |
| 90 | 60% | 17,3% | 60,1% | 6,2% |

## Séries por músculo

Por nível, somando os cenários: média de séries semanais; prioritário abaixo da meta (% dos programas em que o músculo é prioridade); não prioritário abaixo do piso de 4 (% dos outros); 0 série na semana (% dos programas); 0 sem aviso que o cite.

### iniciante

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 8,1 | 18,5% | 14,2% | 14,1% | 0 |
| costas | 3,5 | 54,9% | 54,3% | 53,9% | 0 |
| ombro (lateral) | 2,1 | 71,8% | 70,4% | 56,1% | 0 |
| ombro (posterior) | 2,7 | 0% | 57,8% | 52,3% | 0 |
| bíceps | 3,3 | 67,9% | 51% | 48,3% | 0 |
| tríceps | 6,3 | 40,7% | 20,7% | 14,9% | 0 |
| quadríceps | 7 | 24,7% | 10,5% | 10,5% | 0 |
| posteriores da coxa | 7,6 | 21,2% | 3,7% | 3,7% | 0 |
| glúteos | 9,9 | 12% | 4% | 0,7% | 0 |
| panturrilha | 5,8 | 32,1% | 5,9% | 5,9% | 0 |
| abdômen | 6 | 22,7% | 5,9% | 5,9% | 0 |

### intermediario

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 9,3 | 32,7% | 14% | 14% | 0 |
| costas | 4 | 74,5% | 52,8% | 52,2% | 0 |
| ombro (lateral) | 2,2 | 84,1% | 70,4% | 55,9% | 0 |
| ombro (posterior) | 2,9 | 0% | 56,9% | 50,8% | 0 |
| bíceps | 3,7 | 75,6% | 50,1% | 46,8% | 0 |
| tríceps | 7,4 | 66,8% | 20,7% | 14,8% | 0 |
| quadríceps | 8,7 | 45,8% | 10,5% | 10,5% | 0 |
| posteriores da coxa | 9,1 | 41% | 3,6% | 3,6% | 0 |
| glúteos | 10,4 | 30,2% | 6,9% | 0,8% | 0 |
| panturrilha | 6,2 | 69,6% | 5,9% | 5,9% | 0 |
| abdômen | 6,1 | 40,1% | 5,9% | 5,9% | 0 |

### avancado

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 9,9 | 46,2% | 14% | 14% | 0 |
| costas | 4,1 | 83,4% | 52,8% | 52,2% | 0 |
| ombro (lateral) | 2,3 | 87,3% | 70,4% | 55,9% | 0 |
| ombro (posterior) | 3 | 0% | 57% | 50,8% | 0 |
| bíceps | 3,8 | 85,5% | 50,2% | 46,8% | 0 |
| tríceps | 7,8 | 75,8% | 20,7% | 14,8% | 0 |
| quadríceps | 9,1 | 76,9% | 10,5% | 10,5% | 0 |
| posteriores da coxa | 9,8 | 58,8% | 3,6% | 3,6% | 0 |
| glúteos | 11 | 37,6% | 5,3% | 0,8% | 0 |
| panturrilha | 6,3 | 89,8% | 5,9% | 5,9% | 0 |
| abdômen | 6,2 | 55,1% | 5,9% | 5,9% | 0 |

### Músculos a zero por cenário (todos os níveis; % dos programas)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | 5,9% | 9,4% | 14,8% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 5,9% | 5,9% | 5,9% |
| academia+ | 5,9% | 9,4% | 14,8% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 5,9% | 5,9% | 5,9% |
| bairro | 5,9% | 11,8% | 14,8% | 6,4% | 5,9% | 11,8% | 6,4% | 0% | 2,4% | 5,9% | 5,9% |
| banco+halteres-leves | 5,9% | 17,6% | 14,1% | 12% | 5,9% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| bruno | 5,9% | 9,4% | 14,8% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 0% | 5,9% | 5,9% |
| casa | 6,4% | 11,8% | 14,8% | 6,1% | 5,9% | 11,8% | 6,4% | 0% | 2,4% | 5,9% | 5,9% |
| casa+ | 5,9% | 11,8% | 14,8% | 6,4% | 5,9% | 11,8% | 6,4% | 0% | 0% | 5,9% | 5,9% |
| condominio | 5,9% | 11,8% | 14,8% | 6,1% | 5,9% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| condominio+ | 5,9% | 11,8% | 14,8% | 6,4% | 5,9% | 11,8% | 6,4% | 0% | 2,4% | 5,9% | 5,9% |
| diego | 7,5% | 6,1% | 14,1% | 6,1% | 5,9% | 12,5% | 6,4% | 0% | 2,4% | 5,9% | 5,9% |
| elasticos | 7,5% | 6,1% | 14,1% | 6,1% | 5,9% | 12,5% | 6,4% | 0% | 2,4% | 5,9% | 5,9% |
| halteres | 11,8% | 17,6% | 14,1% | 11,8% | 5,9% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| halteres-banco | 5,9% | 17,6% | 14,1% | 12% | 5,9% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| halteres+bola | 11,8% | 17,6% | 14,1% | 11,8% | 5,9% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| so:abdominal_maquina | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:anilhas_e_manoplas | 11,8% | 17,6% | 14,1% | 11,8% | 5,9% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| so:banco_romano | 18% | 100% | 81,3% | 100% | 100% | 18% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| so:barra_fixa | 18,1% | 11,8% | 71,5% | 11,8% | 11,8% | 18% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:barra_hexagonal | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:barra_longa | 18% | 45,1% | 73,8% | 45,1% | 45,1% | 18% | 11,8% | 2% | 0% | 5,9% | 5,9% |
| so:barra_w | 18% | 100% | 83,5% | 100% | 12,4% | 18% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:bola_suica | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:cadeira_abdutora_adutora | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:cadeira_extensora | 18% | 100% | 81% | 100% | 100% | 18% | 5,9% | 5,9% | 0% | 5,9% | 5,9% |
| so:cadeira_flexora | 18% | 100% | 80,8% | 100% | 100% | 18% | 11,8% | 5,9% | 5,9% | 5,9% | 5,9% |
| so:caneleiras | 18% | 100% | 81% | 100% | 100% | 18% | 5,9% | 5,9% | 0% | 5,9% | 5,9% |
| so:desenvolvimento_maquina | 18% | 100% | 76,1% | 100% | 100% | 13,5% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:estacao_polia_dupla | 5,9% | 11,8% | 12,6% | 6,1% | 11,8% | 13,2% | 11,8% | 5,9% | 0,4% | 5,9% | 5,9% |
| so:estacao_puxada | 18,1% | 11,8% | 71,5% | 11,8% | 11,8% | 18% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:estacao_remada | 17,9% | 17,6% | 70,1% | 17,6% | 17,6% | 17,9% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:gluteo_maquina | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:graviton | 11,8% | 11,8% | 71,5% | 11,8% | 11,8% | 11,8% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:hack | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:halteres_fixos | 11,8% | 17,6% | 14,1% | 11,8% | 5,9% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| so:kettlebell | 19,2% | 17,6% | 66,8% | 17,6% | 5,9% | 11,9% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| so:leg_press | 18% | 100% | 80,7% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:mesa_flexora | 18% | 100% | 80,8% | 100% | 100% | 18% | 11,8% | 5,9% | 5,9% | 5,9% | 5,9% |
| so:mini_band | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:multifuncional | 18,1% | 11,8% | 70,3% | 11,8% | 11,8% | 18,1% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:panturrilha_em_pe_maquina | 18% | 100% | 80,7% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:panturrilha_sentada_maquina | 18% | 100% | 80,5% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:paralelas | 13,9% | 100% | 80,6% | 100% | 100% | 13,8% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:rack_de_agachamento | 18,1% | 11,8% | 72% | 11,8% | 11,8% | 18,1% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:remada_articulada | 17,9% | 11,8% | 72% | 11,8% | 11,8% | 17,9% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:roda_abdominal | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:rosca_maquina | 18% | 100% | 83,5% | 100% | 6,5% | 18% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:smith | 18,1% | 11,8% | 72% | 11,8% | 11,8% | 18,1% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:step | 18% | 100% | 80,7% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:supino_maquina | 11,8% | 100% | 80,7% | 100% | 100% | 11,8% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:suspensao | 21,2% | 11,8% | 74,1% | 5,9% | 11,8% | 11,9% | 11,8% | 5,9% | 0,2% | 5,9% | 5,9% |
| so:triceps_maquina | 23,5% | 100% | 80,6% | 100% | 100% | 7% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| so:voador | 5,9% | 100% | 80,7% | 100% | 100% | 18,1% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |
| step+elasticos | 7,5% | 6,1% | 14,1% | 6,1% | 5,9% | 12,5% | 6,4% | 0% | 2,4% | 5,9% | 5,9% |
| suspensao+elasticos | 7,6% | 6,1% | 14,1% | 6,1% | 5,9% | 12,5% | 6,4% | 0% | 2,4% | 5,9% | 5,9% |
| vazio | 18% | 100% | 80,6% | 100% | 100% | 18% | 11,8% | 5,9% | 0% | 5,9% | 5,9% |

## Fatia das séries da semana que vai aos músculos prioritários

Séries diretas mais meia série indireta, como o app conta o volume. Média (%) dos programas com prioridade.

| nível | 1 prioridade | 2 prioridades | 3 prioridades |
| --- | ---: | ---: | ---: |
| iniciante | 13,9% | 25,1% | 57,1% |
| intermediario | 14,8% | 26,6% | 58,1% |
| avancado | 15,3% | 27,2% | 58,9% |

| dias por semana | 1 prioridade | 2 prioridades | 3 prioridades |
| ---: | ---: | ---: | ---: |
| 2 | 14,7% | 26,5% | 58,9% |
| 3 | 15,1% | 27,4% | 59,3% |
| 4 | 14,9% | 26,5% | 58,8% |
| 5 | 14,6% | 26% | 57,6% |
| 6 | 14,1% | 25,1% | 55,7% |

| minutos | 1 prioridade | 2 prioridades | 3 prioridades |
| ---: | ---: | ---: | ---: |
| 30 | 14,7% | 26,9% | 59,1% |
| 45 | 15% | 26,9% | 59,1% |
| 60 | 14,7% | 26,2% | 57,9% |
| 75 | 14,5% | 25,9% | 57,4% |
| 90 | 14,4% | 25,7% | 56,7% |

### Por prioridade e nível (média %), e quando as prioridades competem

"Abaixo": programas com algum prioritário abaixo da meta. "Competem": um prioritário abaixo da meta e outro na meta (só com 2 ou 3 prioridades).

| prioridade | iniciante: fatia | abaixo | competem | intermediario: fatia | abaixo | competem | avancado: fatia | abaixo | competem |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| peito | 12,4% | 16,7% | — | 13,5% | 32,8% | — | 14% | 46,3% | — |
| costas | 5,1% | 55% | — | 5,9% | 74,3% | — | 6,2% | 83,7% | — |
| ombros | 4,1% | 71,7% | — | 4,5% | 84% | — | 4,6% | 87,3% | — |
| bracos | 14,2% | 76,1% | — | 15,5% | 87,4% | — | 15,8% | 91,6% | — |
| pernas | 31,6% | 40,8% | — | 34,2% | 73,4% | — | 35% | 90,8% | — |
| gluteos | 17,9% | 13,9% | — | 17,7% | 26,8% | — | 18,3% | 33% | — |
| abdomen | 11,9% | 16,7% | — | 12,6% | 34,3% | — | 13,3% | 49,7% | — |
| peito+costas | 17,3% | 57,7% | 43,7% | 18,7% | 78,8% | 49,2% | 19,3% | 86,4% | 42,6% |
| pernas+gluteos | 48% | 43,7% | 40,2% | 49,5% | 81,9% | 59,4% | 50,2% | 98,1% | 65,2% |
| peito+bracos | 26,3% | 75,3% | 56,4% | 28,5% | 85,3% | 57,3% | 29,2% | 92,1% | 49% |
| costas+ombros | 9% | 74,4% | 22% | 9,8% | 85,7% | 13,5% | 10,1% | 88,1% | 6,1% |
| pernas+gluteos+abdomen | 57,1% | 51,5% | 48,3% | 58,1% | 84,8% | 64,3% | 58,9% | 98,4% | 67,3% |

### Por cenário, com 1 prioridade (média %)

| cenário | fatia |
| --- | ---: |
| academia | 16,4% |
| academia+ | 16,4% |
| bairro | 16,2% |
| banco+halteres-leves | 15,3% |
| bruno | 16,3% |
| casa | 16,2% |
| casa+ | 16,3% |
| condominio | 15,1% |
| condominio+ | 16,1% |
| diego | 15,8% |
| elasticos | 15,8% |
| halteres | 14,7% |
| halteres-banco | 15,3% |
| halteres+bola | 14,7% |
| so:abdominal_maquina | 14,2% |
| so:anilhas_e_manoplas | 14,7% |
| so:banco_romano | 14,1% |
| so:barra_fixa | 14,1% |
| so:barra_hexagonal | 14,1% |
| so:barra_longa | 14% |
| so:barra_w | 14,6% |
| so:bola_suica | 14,1% |
| so:cadeira_abdutora_adutora | 14,1% |
| so:cadeira_extensora | 14,3% |
| so:cadeira_flexora | 14,2% |
| so:caneleiras | 14,3% |
| so:desenvolvimento_maquina | 14,2% |
| so:estacao_polia_dupla | 14,7% |
| so:estacao_puxada | 14,1% |
| so:estacao_remada | 14% |
| so:gluteo_maquina | 14,2% |
| so:graviton | 14,1% |
| so:hack | 14,1% |
| so:halteres_fixos | 14,7% |
| so:kettlebell | 14,4% |
| so:leg_press | 14,3% |
| so:mesa_flexora | 14,2% |
| so:mini_band | 14,1% |
| so:multifuncional | 13,9% |
| so:panturrilha_em_pe_maquina | 14,3% |
| so:panturrilha_sentada_maquina | 14,5% |
| so:paralelas | 14,2% |
| so:rack_de_agachamento | 14% |
| so:remada_articulada | 14% |
| so:roda_abdominal | 14,2% |
| so:rosca_maquina | 14,6% |
| so:smith | 14% |
| so:step | 14,4% |
| so:supino_maquina | 14,2% |
| so:suspensao | 13,9% |
| so:triceps_maquina | 14,4% |
| so:voador | 14% |
| step+elasticos | 16% |
| suspensao+elasticos | 16,1% |
| vazio | 14,2% |

## Exercícios distintos na semana e repetição

Mediana de exercícios distintos por programa; com 3 dias ou mais, % dos programas com um exercício (fora o abdominal) em todos os dias, e % em que havia outro equivalente do mesmo nível possível e sem uso.

| cenário | distintos (mediana) | em todos os dias | com opção |
| --- | ---: | ---: | ---: |
| academia | 22 | 2% | 0% |
| academia+ | 22 | 2% | 0% |
| bairro | 19 | 5,6% | 2,1% |
| banco+halteres-leves | 16 | 23,8% | 9,1% |
| bruno | 21 | 2,1% | 1,3% |
| casa | 17 | 23,8% | 3,6% |
| casa+ | 21 | 3,8% | 0,8% |
| condominio | 18 | 5,6% | 1,6% |
| condominio+ | 20 | 4,4% | 0% |
| diego | 17 | 22,9% | 0% |
| elasticos | 16 | 22,9% | 0% |
| halteres | 16 | 23,8% | 2,4% |
| halteres-banco | 16 | 23,8% | 9,1% |
| halteres+bola | 17 | 23,8% | 2,4% |
| so:abdominal_maquina | 9 | 83,3% | 0% |
| so:anilhas_e_manoplas | 16 | 23,8% | 2,4% |
| so:banco_romano | 10 | 77,8% | 4,4% |
| so:barra_fixa | 12 | 27,2% | 0% |
| so:barra_hexagonal | 9 | 83,3% | 0% |
| so:barra_longa | 10 | 51,1% | 0% |
| so:barra_w | 10 | 87,1% | 0% |
| so:bola_suica | 10 | 96,9% | 0% |
| so:cadeira_abdutora_adutora | 9 | 83,3% | 0% |
| so:cadeira_extensora | 10 | 83,3% | 0% |
| so:cadeira_flexora | 9 | 97,9% | 0% |
| so:caneleiras | 10 | 83,3% | 0% |
| so:desenvolvimento_maquina | 9 | 83,3% | 0% |
| so:estacao_polia_dupla | 15 | 24,7% | 0% |
| so:estacao_puxada | 10 | 29,1% | 0% |
| so:estacao_remada | 10 | 28,7% | 0% |
| so:gluteo_maquina | 9 | 85,6% | 0% |
| so:graviton | 11 | 25,2% | 0% |
| so:hack | 9 | 83,3% | 0% |
| so:halteres_fixos | 16 | 23,8% | 2,4% |
| so:kettlebell | 11 | 28,2% | 2,8% |
| so:leg_press | 9 | 83,3% | 0% |
| so:mesa_flexora | 9 | 97,9% | 0% |
| so:mini_band | 9 | 83,3% | 0% |
| so:multifuncional | 11 | 28,7% | 0% |
| so:panturrilha_em_pe_maquina | 9 | 83,3% | 0% |
| so:panturrilha_sentada_maquina | 9 | 83,3% | 0% |
| so:paralelas | 10 | 36,3% | 0% |
| so:rack_de_agachamento | 10 | 30,9% | 0% |
| so:remada_articulada | 10 | 28,7% | 0% |
| so:roda_abdominal | 10 | 83,3% | 0% |
| so:rosca_maquina | 10 | 90,4% | 0% |
| so:smith | 10 | 30,8% | 0% |
| so:step | 10 | 83,3% | 0% |
| so:supino_maquina | 9 | 91,8% | 0% |
| so:suspensao | 13 | 25,8% | 0% |
| so:triceps_maquina | 9 | 82,7% | 0% |
| so:voador | 10 | 90,1% | 0% |
| step+elasticos | 16 | 22,8% | 0% |
| suspensao+elasticos | 16 | 24,1% | 0% |
| vazio | 9 | 83,3% | 0% |

## Vagas vazias

Por cenário e nível: vagas ativas por programa (média), quantas têm exercício possível, quantas ficam vazias por equipamento ou por dor, e quantas com exercício ficam de fora por minutos (ou pelos cortes de tempo). A função mais vazia por equipamento vem ao lado.

| cenário | nível | vagas | com exercício | vazias: equipamento | vazias: dor | fora por minutos | vazias por equipamento (funções) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| academia | iniciante | 29,4 | 27,3 | 0 | 2 | 3,3 | — |
| academia | intermediario | 29,4 | 27,3 | 0 | 2 | 3,4 | — |
| academia | avancado | 29,4 | 27,3 | 0 | 2 | 3,4 | — |
| academia+ | iniciante | 29,4 | 27,3 | 0 | 2 | 3,3 | — |
| academia+ | intermediario | 29,4 | 27,3 | 0 | 2 | 3,4 | — |
| academia+ | avancado | 29,4 | 27,3 | 0 | 2 | 3,4 | — |
| bairro | iniciante | 29,4 | 27,2 | 0 | 2,2 | 3,3 | — |
| bairro | intermediario | 29,4 | 27,3 | 0 | 2,1 | 3,4 | — |
| bairro | avancado | 29,4 | 27,3 | 0 | 2,1 | 3,5 | — |
| banco+halteres-leves | iniciante | 29,4 | 25,4 | 1,6 | 2,4 | 3,5 | extensora (1,6) |
| banco+halteres-leves | intermediario | 29,4 | 25,4 | 1,6 | 2,4 | 3,5 | extensora (1,6) |
| banco+halteres-leves | avancado | 29,4 | 25,4 | 1,6 | 2,4 | 3,5 | extensora (1,6) |
| bruno | iniciante | 29,4 | 27,3 | 0 | 2 | 3,3 | — |
| bruno | intermediario | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| bruno | avancado | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| casa | iniciante | 29,4 | 27,1 | 0 | 2,2 | 3,8 | — |
| casa | intermediario | 29,4 | 27,1 | 0 | 2,2 | 4 | — |
| casa | avancado | 29,4 | 27,1 | 0 | 2,2 | 4 | — |
| casa+ | iniciante | 29,4 | 27,3 | 0 | 2,1 | 3,3 | — |
| casa+ | intermediario | 29,4 | 27,3 | 0 | 2,1 | 3,5 | — |
| casa+ | avancado | 29,4 | 27,3 | 0 | 2,1 | 3,5 | — |
| condominio | iniciante | 29,4 | 25,7 | 1,6 | 2,1 | 2,9 | extensora (1,6) |
| condominio | intermediario | 29,4 | 25,7 | 1,6 | 2,1 | 3,1 | extensora (1,6) |
| condominio | avancado | 29,4 | 25,7 | 1,6 | 2,1 | 3,1 | extensora (1,6) |
| condominio+ | iniciante | 29,4 | 27,2 | 0 | 2,2 | 3,3 | — |
| condominio+ | intermediario | 29,4 | 27,2 | 0 | 2,2 | 3,4 | — |
| condominio+ | avancado | 29,4 | 27,2 | 0 | 2,2 | 3,4 | — |
| diego | iniciante | 29,4 | 26,8 | 0,2 | 2,4 | 3,8 | panturrilha-sentada (0,2) |
| diego | intermediario | 29,4 | 26,8 | 0,2 | 2,4 | 4 | panturrilha-sentada (0,2) |
| diego | avancado | 29,4 | 26,8 | 0,2 | 2,4 | 4 | panturrilha-sentada (0,2) |
| elasticos | iniciante | 29,4 | 26,8 | 0,2 | 2,4 | 3,8 | panturrilha-sentada (0,2) |
| elasticos | intermediario | 29,4 | 26,8 | 0,2 | 2,4 | 4 | panturrilha-sentada (0,2) |
| elasticos | avancado | 29,4 | 26,8 | 0,2 | 2,4 | 4 | panturrilha-sentada (0,2) |
| halteres | iniciante | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| halteres | intermediario | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| halteres | avancado | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| halteres-banco | iniciante | 29,4 | 25,4 | 1,6 | 2,4 | 3,5 | extensora (1,6) |
| halteres-banco | intermediario | 29,4 | 25,4 | 1,6 | 2,4 | 3,5 | extensora (1,6) |
| halteres-banco | avancado | 29,4 | 25,4 | 1,6 | 2,4 | 3,5 | extensora (1,6) |
| halteres+bola | iniciante | 29,4 | 24 | 3 | 2,4 | 2,7 | extensora (1,6), crucifixo (1,4) |
| halteres+bola | intermediario | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| halteres+bola | avancado | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:abdominal_maquina | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:abdominal_maquina | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:abdominal_maquina | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:anilhas_e_manoplas | iniciante | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:anilhas_e_manoplas | intermediario | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:anilhas_e_manoplas | avancado | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:banco_romano | iniciante | 36 | 18,2 | 16 | 1,8 | 0,9 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:banco_romano | intermediario | 36 | 18,2 | 16 | 1,8 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:banco_romano | avancado | 36 | 18,2 | 16 | 1,8 | 0,9 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_fixa | iniciante | 29,4 | 15,6 | 12 | 1,8 | 1,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_fixa | intermediario | 29,4 | 15,6 | 12 | 1,8 | 1,3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_fixa | avancado | 29,4 | 15,6 | 12 | 1,8 | 1,3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_hexagonal | iniciante | 36 | 18,1 | 15,9 | 2 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:barra_hexagonal | intermediario | 36 | 18,1 | 15,9 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:barra_hexagonal | avancado | 36 | 18,1 | 15,9 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:barra_longa | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_longa | intermediario | 29,4 | 15,6 | 12,2 | 1,6 | 1,3 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_longa | avancado | 29,4 | 15,6 | 12,2 | 1,6 | 1,3 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_w | iniciante | 36 | 19,9 | 13,9 | 2,3 | 1,1 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_w | intermediario | 36 | 19,9 | 13,9 | 2,3 | 1,1 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_w | avancado | 36 | 19,9 | 13,9 | 2,3 | 1,1 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:bola_suica | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:bola_suica | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:bola_suica | avancado | 36 | 18 | 16 | 2 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_abdutora_adutora | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_abdutora_adutora | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_abdutora_adutora | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_extensora | iniciante | 36 | 19,5 | 14,4 | 2,1 | 1 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_extensora | intermediario | 36 | 19,5 | 14,4 | 2,1 | 1 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_extensora | avancado | 36 | 19,5 | 14,4 | 2,1 | 1 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_flexora | iniciante | 36 | 18 | 16 | 2 | 0,6 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_flexora | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_flexora | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:caneleiras | iniciante | 36 | 19,5 | 14,4 | 2,1 | 1 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:caneleiras | intermediario | 36 | 19,5 | 14,4 | 2,1 | 1 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:caneleiras | avancado | 36 | 19,5 | 14,4 | 2,1 | 1 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:desenvolvimento_maquina | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:desenvolvimento_maquina | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:desenvolvimento_maquina | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_polia_dupla | iniciante | 29,4 | 24,8 | 2 | 2,6 | 3,1 | extensora (1,6), panturrilha-sentada (0,2), empurrar-horizontal (0,1), agachar (0,1) |
| so:estacao_polia_dupla | intermediario | 29,4 | 24,8 | 2 | 2,6 | 2,9 | extensora (1,6), panturrilha-sentada (0,2), empurrar-horizontal (0,1), agachar (0,1) |
| so:estacao_polia_dupla | avancado | 29,4 | 24,8 | 2 | 2,6 | 3 | extensora (1,6), panturrilha-sentada (0,2), empurrar-horizontal (0,1), agachar (0,1) |
| so:estacao_puxada | iniciante | 29,4 | 15,6 | 12 | 1,8 | 1,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_puxada | intermediario | 29,4 | 15,6 | 12 | 1,8 | 1,3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_puxada | avancado | 29,4 | 15,6 | 12 | 1,8 | 1,3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_remada | iniciante | 29,4 | 15,4 | 12,2 | 1,8 | 1,5 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_remada | intermediario | 29,4 | 15,4 | 12,2 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_remada | avancado | 29,4 | 15,4 | 12,2 | 1,8 | 1,3 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:gluteo_maquina | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:gluteo_maquina | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:gluteo_maquina | avancado | 36 | 18 | 16 | 2 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:graviton | iniciante | 29,4 | 15,9 | 11,8 | 1,7 | 1,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:graviton | intermediario | 29,4 | 15,8 | 11,9 | 1,7 | 1,3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-inclinado (0,1), agachar (0,1) |
| so:graviton | avancado | 29,4 | 15,8 | 11,9 | 1,7 | 1,3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-inclinado (0,1), agachar (0,1) |
| so:hack | iniciante | 36 | 18,1 | 15,9 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:hack | intermediario | 36 | 18,1 | 15,9 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:hack | avancado | 36 | 18,1 | 15,9 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:halteres_fixos | iniciante | 29,4 | 24 | 3 | 2,4 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:halteres_fixos | intermediario | 29,4 | 24 | 3 | 2,4 | 2,9 | extensora (1,6), crucifixo (1,4) |
| so:halteres_fixos | avancado | 29,4 | 24 | 3 | 2,4 | 2,9 | extensora (1,6), crucifixo (1,4) |
| so:kettlebell | iniciante | 29,4 | 20 | 7,2 | 2,2 | 2,9 | elevacao-lateral (2,1), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:kettlebell | intermediario | 29,4 | 20 | 7,2 | 2,2 | 2,9 | elevacao-lateral (2,1), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:kettlebell | avancado | 29,4 | 20 | 7,2 | 2,2 | 2,9 | elevacao-lateral (2,1), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:leg_press | iniciante | 36 | 18,1 | 15,9 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:leg_press | intermediario | 36 | 18,1 | 15,9 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:leg_press | avancado | 36 | 18,1 | 15,9 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:mesa_flexora | iniciante | 36 | 18 | 16 | 2 | 0,6 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mesa_flexora | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mesa_flexora | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mini_band | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mini_band | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mini_band | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:multifuncional | iniciante | 29,4 | 16,9 | 10,4 | 2 | 1,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:multifuncional | intermediario | 29,4 | 16,9 | 10,4 | 2 | 1,3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:multifuncional | avancado | 29,4 | 16,9 | 10,4 | 2 | 1,3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_em_pe_maquina | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_em_pe_maquina | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_em_pe_maquina | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_sentada_maquina | iniciante | 36 | 18,3 | 15,7 | 2 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_sentada_maquina | intermediario | 36 | 18,3 | 15,7 | 2 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_sentada_maquina | avancado | 36 | 18,3 | 15,7 | 2 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:paralelas | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:paralelas | intermediario | 36 | 18,3 | 15,9 | 1,8 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-inclinado (0,1), agachar (0,1) |
| so:paralelas | avancado | 36 | 18,3 | 15,9 | 1,8 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-inclinado (0,1), agachar (0,1) |
| so:rack_de_agachamento | iniciante | 29,4 | 17 | 10,4 | 1,9 | 2,4 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rack_de_agachamento | intermediario | 29,4 | 17 | 10,4 | 1,9 | 2,1 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rack_de_agachamento | avancado | 29,4 | 17 | 10,4 | 1,9 | 2,1 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:remada_articulada | iniciante | 29,4 | 15,4 | 12,2 | 1,7 | 1,5 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:remada_articulada | intermediario | 29,4 | 15,4 | 12,2 | 1,7 | 1,3 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:remada_articulada | avancado | 29,4 | 15,4 | 12,2 | 1,7 | 1,3 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:roda_abdominal | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:roda_abdominal | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:roda_abdominal | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rosca_maquina | iniciante | 36 | 20 | 13,9 | 2,1 | 1,1 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rosca_maquina | intermediario | 36 | 20 | 13,9 | 2,1 | 1,1 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rosca_maquina | avancado | 36 | 20 | 13,9 | 2,1 | 1,1 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:smith | iniciante | 29,4 | 17,1 | 10,3 | 1,9 | 2,4 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:smith | intermediario | 29,4 | 17,1 | 10,3 | 1,9 | 2,1 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:smith | avancado | 29,4 | 17,1 | 10,3 | 1,9 | 2,1 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:step | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:step | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:step | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:supino_maquina | iniciante | 36 | 18,5 | 15,8 | 1,8 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:supino_maquina | intermediario | 36 | 18,5 | 15,8 | 1,8 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:supino_maquina | avancado | 36 | 18,5 | 15,8 | 1,8 | 0,8 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:suspensao | iniciante | 29,4 | 21,4 | 5,6 | 2,4 | 3,2 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:suspensao | intermediario | 29,4 | 21,4 | 5,6 | 2,4 | 3,2 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:suspensao | avancado | 29,4 | 21,4 | 5,6 | 2,4 | 3,2 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:triceps_maquina | iniciante | 36 | 18,1 | 16 | 1,9 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:triceps_maquina | intermediario | 36 | 18,1 | 16 | 1,9 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:triceps_maquina | avancado | 36 | 18,1 | 16 | 1,9 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:voador | iniciante | 36 | 19,6 | 14,5 | 1,9 | 0,9 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), agachar (0,1) |
| so:voador | intermediario | 36 | 19,6 | 14,5 | 1,9 | 0,9 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), agachar (0,1) |
| so:voador | avancado | 36 | 19,6 | 14,5 | 1,9 | 0,9 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), agachar (0,1) |
| step+elasticos | iniciante | 29,4 | 26,8 | 0,2 | 2,4 | 3,8 | panturrilha-sentada (0,2) |
| step+elasticos | intermediario | 29,4 | 26,8 | 0,2 | 2,4 | 4 | panturrilha-sentada (0,2) |
| step+elasticos | avancado | 29,4 | 26,8 | 0,2 | 2,4 | 4 | panturrilha-sentada (0,2) |
| suspensao+elasticos | iniciante | 29,4 | 26,8 | 0,2 | 2,3 | 3,7 | panturrilha-sentada (0,2) |
| suspensao+elasticos | intermediario | 29,4 | 26,8 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| suspensao+elasticos | avancado | 29,4 | 26,8 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| vazio | iniciante | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| vazio | intermediario | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| vazio | avancado | 36 | 18 | 16 | 2 | 0,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |

## Avisos

% dos programas com cada aviso (uma vez por programa, mesmo que repetido).

| regra | programas | % |
| --- | ---: | ---: |
| `equipamento.escada-carga-leve` | 762.450 | 83,6% |
| `selecao.isolador-obrigatorio` | 696.150 | 76,4% |
| `volume.semanal.alvo` | 627.841 | 68,9% |
| `equipamento.sem-ancoragem` | 419.900 | 46,1% |
| `tempo.sobra` | 401.627 | 44,1% |
| `seguranca.dor.programa` | 375.375 | 41,2% |
| `tempo.corte` | 272.268 | 29,9% |
| `selecao.dia-sem-principal` | 268.922 | 29,5% |
| `equipamento.sem-puxada-vertical` | 242.125 | 26,6% |
| `volume.prioridade.competicao` | 165.598 | 18,2% |
| `selecao.alongado` | 153.000 | 16,8% |

## Piores casos

Os 10 piores cenários de cada medida, um caso por cenário (menor valor primeiro; empate pela ordem da grade). A linha de reprodução usa `CEN_55` de `scripts/auditoria/cenarios-55.ts`.

### menor-uso-dos-minutos

- **so:barra_fixa · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 22 de 90 min.
  - Programa: Empurrar A (21 min): flexao 2, pike 2, flexao-fechada 3 | Puxar A (21 min): barra-fixa 4, barra-fixa-supinada 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, elevacao-joelhos 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (11 min): barra-fixa-supinada 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:barra_fixa'].inventario)`
- **so:rack_de_agachamento · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 22 de 90 min.
  - Programa: Empurrar A (21 min): flexao 2, pike 2, flexao-fechada 3 | Puxar A (17 min): remada-invertida 4, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (17 min): remada-invertida 4, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:rack_de_agachamento'].inventario)`
- **so:smith · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 22 de 90 min.
  - Programa: Empurrar A (21 min): flexao 2, pike 2, flexao-fechada 3 | Puxar A (17 min): remada-invertida 4, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (17 min): remada-invertida 4, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:smith'].inventario)`
- **so:estacao_puxada · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 22 de 90 min.
  - Programa: Empurrar A (21 min): flexao 2, pike 2, flexao-fechada 3 | Puxar A (17 min): puxada-frente 4, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (17 min): puxada-frente 4, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:estacao_puxada'].inventario)`
- **so:estacao_remada · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 22 de 90 min.
  - Programa: Empurrar A (21 min): flexao 2, pike 2, flexao-fechada 3 | Puxar A (17 min): remada-baixa-estacao 4, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (17 min): remada-baixa-estacao 4, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:estacao_remada'].inventario)`
- **so:multifuncional · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 22 de 90 min.
  - Programa: Empurrar A (21 min): flexao 2, pike 2, flexao-fechada 3 | Puxar A (17 min): puxada-frente 2, remada-baixa-estacao 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (17 min): remada-baixa-estacao 2, puxada-frente 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:multifuncional'].inventario)`
- **so:remada_articulada · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 22 de 90 min.
  - Programa: Empurrar A (21 min): flexao 2, pike 2, flexao-fechada 3 | Puxar A (17 min): remada-articulada 4, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (17 min): remada-articulada 4, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:remada_articulada'].inventario)`
- **so:graviton · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 22 de 90 min.
  - Programa: Empurrar A (18 min): mergulho-graviton 2, pike 2, flexao-fechada 2 | Puxar A (17 min): barra-fixa-graviton 4, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (12 min): mergulho-graviton 2, flexao-fechada 2 | Puxar B (17 min): barra-fixa-graviton 4, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:graviton'].inventario)`
- **so:suspensao · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 24 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, triceps-suspensao 2 | Puxar A (24 min): remada-suspensao 3, rosca-suspensao 2, yt-suspensao 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 2, flexao-joelho-suspensao 2, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, triceps-suspensao 2 | Puxar B (24 min): remada-suspensao 3, yt-suspensao 2, rosca-suspensao 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 2, panturrilha-chao 4, flexao-joelho-suspensao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:suspensao'].inventario)`
- **so:kettlebell · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 25 de 90 min.
  - Programa: Empurrar A (25 min): flexao 2, desenvolvimento-unilateral-kettlebell 2, flexao-fechada 2, triceps-frances-kettlebell 2 | Puxar A (25 min): remada-unilateral-kettlebell 4, rosca-kettlebell 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, triceps-frances-kettlebell 2 | Puxar B (25 min): remada-unilateral-kettlebell 4, rosca-kettlebell 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:kettlebell'].inventario)`

### menor-uso-dos-minutos-sem-dor-nem-evitado

- **academia · iniciante · 6 dias · 90 min · prioridade ombros · sem dor**: 38 de 90 min.
  - Programa: Empurrar A (38 min): supino-reto 2, desenvolvimento 2, supino-inclinado 2, elevacao-lateral 2, triceps-frances 2, crucifixo-halteres 2, triceps-corda 2 | Puxar A (34 min): puxada-unilateral 2, remada-apoiada 2, elevacao-lateral 2, rosca-inclinada 2, crucifixo-inverso 2, abdominal-maquina 2 | Pernas A (34 min): agachamento-smith 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha-em-pe-maquina 3, abdominal-maquina 2 | Empurrar B (38 min): supino-inclinado 2, supino-maquina 2, desenvolvimento-maquina 2, elevacao-lateral 2, triceps-frances-halter 2, voador 2, triceps-barra-reta 2 | Puxar B (32 min): remada-baixa 2, puxada-barra-reta 2, elevacao-lateral 2, crucifixo-inverso 2, rosca-maquina 2, abdominal-maquina 2 | Pernas B (38 min): afundo 2, stiff-unilateral 2, coice-maquina 2, cadeira-extensora 2, panturrilha-leg-press 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":["ombros"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['academia'].inventario)`
- **academia+ · iniciante · 6 dias · 90 min · prioridade ombros · sem dor**: 38 de 90 min.
  - Programa: Empurrar A (38 min): supino-reto 2, desenvolvimento 2, supino-inclinado 2, elevacao-lateral 2, triceps-frances 2, crucifixo-halteres 2, triceps-corda 2 | Puxar A (34 min): puxada-unilateral 2, remada-apoiada 2, elevacao-lateral 2, rosca-inclinada 2, crucifixo-inverso 2, abdominal-maquina 2 | Pernas A (34 min): agachamento-smith 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha-em-pe-maquina 3, abdominal-maquina 2 | Empurrar B (38 min): supino-inclinado 2, supino-maquina 2, desenvolvimento-maquina 2, elevacao-lateral 2, triceps-frances-halter 2, voador 2, triceps-barra-reta 2 | Puxar B (32 min): remada-baixa 2, puxada-barra-reta 2, elevacao-lateral 2, voador-invertido 2, rosca-maquina 2, abdominal-maquina 2 | Pernas B (37 min): afundo 2, stiff-kettlebell 2, coice-maquina 2, cadeira-extensora 2, panturrilha-leg-press 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":["ombros"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['academia+'].inventario)`
- **so:gluteo_maquina · iniciante · 4 dias · 90 min · prioridade nenhuma · sem dor**: 38 de 90 min.
  - Programa: Corpo todo A (31 min): agachamento-peso-corpo 4, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (26 min): flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (38 min): afundo-peso-corpo 2, flexao 2, flexao-fechada 2, coice-maquina 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo D (26 min): bulgaro-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:gluteo_maquina'].inventario)`
- **condominio+ · iniciante · 6 dias · 90 min · prioridade ombros · sem dor**: 39 de 90 min.
  - Programa: Empurrar A (37 min): supino-reto 2, desenvolvimento 2, supino-inclinado 2, flexao-fechada 2, elevacao-halteres 2, triceps-frances-halter 2, crucifixo-halteres 2 | Puxar A (31 min): puxada-frente 2, remada-apoiada 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-inverso 2, abdominal-bola 2 | Pernas A (38 min): bulgaro 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha 3, abdominal-chao 2 | Empurrar B (37 min): supino-inclinado 2, supino-maquina 2, flexao-fechada 2, desenvolvimento 2, elevacao-halteres 2, triceps-frances-halter 2, voador 2 | Puxar B (32 min): remada-unilateral-halter 2, puxada-frente 2, elevacao-halteres 2, crucifixo-inverso 2, rosca-inclinada 2, elevacao-joelhos 2 | Pernas B (39 min): afundo 2, stiff-unilateral 2, hip-thrust 2, cadeira-extensora 2, panturrilha-bilateral-step 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":["ombros"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio+'].inventario)`
- **bairro · iniciante · 6 dias · 90 min · prioridade ombros · sem dor**: 39 de 90 min.
  - Programa: Empurrar A (37 min): supino-reto 2, desenvolvimento 2, supino-inclinado 2, flexao-fechada 2, elevacao-halteres 2, triceps-frances-halter 2, crucifixo-halteres 2 | Puxar A (31 min): barra-fixa 2, remada-apoiada 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-inverso 2, abdominal-chao 2 | Pernas A (34 min): leg-press 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha-leg-press 3, elevacao-joelhos 2 | Empurrar B (37 min): supino-inclinado 2, supino-reto 2, flexao-fechada 2, desenvolvimento 2, elevacao-halteres 2, triceps-frances-halter 2, crucifixo-halteres 2 | Puxar B (32 min): remada-unilateral-halter 2, barra-fixa-supinada 2, elevacao-halteres 2, crucifixo-inverso 2, rosca-inclinada 2, elevacao-joelhos-paralelas 2 | Pernas B (39 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, cadeira-extensora 2, panturrilha-leg-press 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":["ombros"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['bairro'].inventario)`
- **vazio · iniciante · 4 dias · 90 min · prioridade nenhuma · sem dor**: 39 de 90 min.
  - Programa: Corpo todo A (31 min): agachamento-peso-corpo 4, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (26 min): flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (39 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, flexao-fechada 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo D (26 min): bulgaro-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['vazio'].inventario)`
- **so:barra_longa · iniciante · 4 dias · 90 min · prioridade nenhuma · sem dor**: 39 de 90 min.
  - Programa: Corpo todo A (31 min): agachamento-peso-corpo 4, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (26 min): flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (39 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, flexao-fechada 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo D (26 min): bulgaro-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_longa'].inventario)`
- **so:barra_w · iniciante · 4 dias · 90 min · prioridade nenhuma · sem dor**: 39 de 90 min.
  - Programa: Corpo todo A (31 min): agachamento-peso-corpo 4, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (35 min): flexao 2, flexao-joelho-deslizante 2, rosca-barra-w 4, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (39 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, flexao-fechada 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo D (35 min): bulgaro-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, rosca-barra-w 4, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_w'].inventario)`
- **so:leg_press · iniciante · 4 dias · 90 min · prioridade nenhuma · sem dor**: 39 de 90 min.
  - Programa: Corpo todo A (30 min): leg-press 4, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (25 min): flexao 2, flexao-joelho-deslizante 2, panturrilha-leg-press 4, abdominal-chao 2 | Corpo todo C (39 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, flexao-fechada 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo D (26 min): bulgaro-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:leg_press'].inventario)`
- **so:cadeira_extensora · iniciante · 4 dias · 90 min · prioridade nenhuma · sem dor**: 39 de 90 min.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo B (31 min): flexao 2, flexao-joelho-deslizante 2, cadeira-extensora 2, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (39 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2, flexao-fechada 2, flexao-joelho-deslizante 2, abdominal-chao 2 | Corpo todo D (31 min): bulgaro-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, cadeira-extensora 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:cadeira_extensora'].inventario)`

### menos-exercicios-com-45min-ou-mais

- **casa · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (39 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 3, abdominal-bola 2 | Superior B (7 min): rosca-kettlebell 3 | Inferior B (38 min): afundo 2, ponte-kettlebell 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (44 min): bulgaro 3, stiff 2, afundo-tras 2, flexao-bola 2, panturrilha-chao 4, abdominal-bola 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 3, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`
- **condominio+ · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (38 min): bulgaro 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha 3, abdominal-bola 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (39 min): afundo 2, hip-thrust 3, cadeira-flexora 2, cadeira-extensora 2, panturrilha-bilateral-step 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio+'].inventario)`
- **academia · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (12 min): rosca-maquina 3, triceps-barra-reta 3 | Inferior (34 min): agachamento-smith 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha-em-pe-maquina 3, abdominal-maquina 2 | Empurrar (5 min): triceps-corda 3 | Puxar (9 min): rosca-scott 3, abdominal-maquina 2 | Pernas (38 min): afundo 2, stiff-unilateral 2, coice-maquina 2, cadeira-extensora 2, panturrilha-leg-press 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['academia'].inventario)`
- **academia+ · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (12 min): rosca-maquina 3, triceps-barra-reta 3 | Inferior (34 min): agachamento-smith 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha-em-pe-maquina 3, abdominal-maquina 2 | Empurrar (5 min): triceps-corda 3 | Puxar (9 min): rosca-scott 3, abdominal-maquina 2 | Pernas (37 min): afundo 2, stiff-kettlebell 2, coice-maquina 2, cadeira-extensora 2, panturrilha-leg-press 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['academia+'].inventario)`
- **elasticos · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (6 min): rosca-elastico 3 | Inferior A (39 min): agachamento-elastico 2, stiff-elastico 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (6 min): rosca-elastico 3 | Inferior B (44 min): afundo-peso-corpo 2, ponte-gluteo 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['elasticos'].inventario)`
- **halteres · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (7 min): rosca-alternada 4 | Inferior A (45 min): goblet 4, stiff 2, afundo-tras 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['halteres'].inventario)`
- **halteres-banco · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (44 min): bulgaro 3, stiff 2, afundo-tras 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 3, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-deslizante 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['halteres-banco'].inventario)`
- **diego · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (6 min): rosca-elastico 3 | Inferior A (39 min): agachamento-elastico 2, stiff-elastico 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (6 min): rosca-elastico 3 | Inferior B (44 min): afundo-peso-corpo 2, ponte-gluteo 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['diego'].inventario)`

### menos-exercicios-com-45min-ou-mais-sem-dor-nem-evitado

- **so:barra_fixa · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (33 min): flexao 2, barra-fixa 4, barra-fixa-supinada 2, flexao-fechada 4 | Inferior (44 min): agachamento-peso-corpo 4, bulgaro-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar (12 min): flexao 2, flexao-fechada 2 | Puxar (11 min): barra-fixa-supinada 2, elevacao-joelhos 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_fixa'].inventario)`
- **so:barra_longa · intermediario · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (29 min): flexao 2, remada-barra 4, flexao-fechada 4 | Inferior (45 min): agachamento-peso-corpo 3, terra-romeno-barra 3, bulgaro-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 4 | Puxar (16 min): remada-barra 4, abdominal-chao 2 | Pernas (44 min): afundo-peso-corpo 4, terra-romeno-barra 2, ponte-gluteo 2, panturrilha-chao 4, nordico 2
  - Reproduzir: `gerarPrograma({"nivel":"intermediario","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_longa'].inventario)`
- **so:rack_de_agachamento · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (29 min): flexao 2, remada-invertida 4, flexao-fechada 4 | Inferior (44 min): agachamento-peso-corpo 4, bulgaro-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar (12 min): flexao 2, flexao-fechada 2 | Puxar (17 min): remada-invertida 4, abdominal-chao 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:rack_de_agachamento'].inventario)`
- **so:smith · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (29 min): flexao 2, remada-invertida 4, flexao-fechada 4 | Inferior (42 min): agachamento-smith 4, bulgaro-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar (12 min): flexao 2, flexao-fechada 2 | Puxar (17 min): remada-invertida 4, abdominal-chao 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:smith'].inventario)`
- **so:estacao_puxada · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (29 min): flexao 2, puxada-frente 4, flexao-fechada 4 | Inferior (44 min): agachamento-peso-corpo 4, bulgaro-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar (12 min): flexao 2, flexao-fechada 2 | Puxar (17 min): puxada-frente 4, abdominal-chao 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:estacao_puxada'].inventario)`
- **so:estacao_remada · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (29 min): flexao 2, remada-baixa-estacao 4, flexao-fechada 4 | Inferior (44 min): agachamento-peso-corpo 4, bulgaro-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar (12 min): flexao 2, flexao-fechada 2 | Puxar (17 min): remada-baixa-estacao 4, abdominal-chao 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:estacao_remada'].inventario)`
- **so:multifuncional · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (29 min): flexao 2, puxada-frente 2, remada-baixa-estacao 2, flexao-fechada 4 | Inferior (44 min): agachamento-peso-corpo 4, bulgaro-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar (12 min): flexao 2, flexao-fechada 2 | Puxar (17 min): remada-baixa-estacao 2, puxada-frente 2, abdominal-chao 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:multifuncional'].inventario)`
- **so:remada_articulada · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (29 min): flexao 2, remada-articulada 4, flexao-fechada 4 | Inferior (44 min): agachamento-peso-corpo 4, bulgaro-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar (12 min): flexao 2, flexao-fechada 2 | Puxar (17 min): remada-articulada 4, abdominal-chao 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:remada_articulada'].inventario)`
- **so:graviton · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior (24 min): mergulho-graviton 4, barra-fixa-graviton 4 | Inferior (44 min): agachamento-peso-corpo 4, bulgaro-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-chao 4, abdominal-chao 2 | Empurrar (12 min): mergulho-graviton 2, flexao-fechada 2 | Puxar (17 min): barra-fixa-graviton 4, abdominal-chao 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-chao 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:graviton'].inventario)`
- **so:kettlebell · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (37 min): flexao 4, remada-unilateral-kettlebell 4, triceps-frances-kettlebell 2, rosca-kettlebell 2 | Inferior (45 min): goblet-kettlebell 4, stiff-kettlebell 2, afundo-kettlebell 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, triceps-frances-kettlebell 2 | Puxar (25 min): remada-unilateral-kettlebell 4, rosca-kettlebell 2, abdominal-chao 2 | Pernas (36 min): afundo-kettlebell 2, stiff-kettlebell 2, ponte-kettlebell 2, panturrilha-chao 4, flexao-joelho-deslizante 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:kettlebell'].inventario)`

## Exemplos (até 3 por suspeito, de cenários diferentes, os primeiros da grade)

### `dia.poucos-exercicios`

- **casa · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: Superior A com 1 exercícios em 45 min (cabem ~6).
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: Superior A com 1 exercícios em 45 min (cabem ~6).
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (39 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 3, abdominal-bola 2 | Superior B (7 min): rosca-kettlebell 3 | Inferior B (38 min): afundo 2, ponte-kettlebell 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: Superior A com 1 exercícios em 45 min (cabem ~6).
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (44 min): bulgaro 3, stiff 2, afundo-tras 2, flexao-bola 2, panturrilha-chao 4, abdominal-bola 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 3, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `monotonia.todos-os-dias`

- **casa · iniciante · 3 dias · 30 min · prioridade nenhuma · sem dor**: flexao em todos os 3 dias.
  - Programa: Corpo todo A (35 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, abdominal-chao 4 | Corpo todo B (30 min): stiff 2, flexao 2, remada-curvada-halteres 2, rosca-alternada 2+drop, panturrilha-chao 3+drop | Corpo todo C (30 min): afundo 3, flexao 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 45 min · prioridade bracos · quadril 7**: rosca-inclinada em todos os 3 dias.
  - Programa: Corpo todo A (38 min): supino-reto 2, barra-fixa 2, triceps-frances-halter 3, rosca-inclinada 2, flexao-bola 3, elevacao-halteres 3 | Corpo todo B (42 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, flexao-joelho-elastico 3, extensao-joelho-caneleira 4, panturrilha 4 | Corpo todo C (39 min): supino-reto 2, barra-fixa-supinada 2, triceps-suspensao 2, rosca-inclinada 2, elevacao-halteres 3, abdominal-bola 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":["bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os 3 dias.
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-martelo 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 4, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `monotonia.todos-os-dias-com-opcao`

- **casa · iniciante · 3 dias · 30 min · prioridade nenhuma · sem dor · evita flexao**: supino-chao-halteres em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (35 min): goblet 2, supino-chao-halteres 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, abdominal-chao 4 | Corpo todo B (30 min): stiff 2, supino-chao-halteres 2, remada-curvada-halteres 2, rosca-alternada 2+drop, panturrilha-chao 3+drop | Corpo todo C (30 min): afundo 3, supino-chao-halteres 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":30,"prioridades":[],"evitarExercicios":["flexao"],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 60 min · prioridade nenhuma · quadril 7**: extensao-joelho-caneleira em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (45 min): supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, extensao-joelho-caneleira 2, abdominal-bola 2 | Corpo todo B (52 min): supino-inclinado 2, remada-apoiada 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 3, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (47 min): supino-reto 2, barra-fixa-supinada 2, elevacao-halteres 3, triceps-suspensao 2, flexao-bola 2, panturrilha-bilateral-step 3, extensao-joelho-caneleira 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":60,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-martelo 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 4, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `prioridade.abaixo-com-tempo`

- **casa · intermediario · 2 dias · 90 min · prioridade costas · sem dor**: costas (prioridade) com 8 de 12 séries e o dia mais longo em 75 de 90 min.
  - Programa: Corpo todo A (75 min): remada-unilateral-sem-banco 4, goblet 2, flexao 2, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-chao 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (65 min): remada-curvada-halteres 4, afundo 2, flexao 2, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 2, crucifixo-invertido-curvado 2, elevacao-halteres 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"intermediario","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["costas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · intermediario · 2 dias · 90 min · prioridade costas · sem dor**: costas (prioridade) com 8 de 12 séries e o dia mais longo em 75 de 90 min.
  - Programa: Corpo todo A (75 min): barra-fixa 4, bulgaro 2, supino-reto 2, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha 4, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (62 min): remada-apoiada 4, afundo 2, supino-inclinado 2, flexao-bola 3, extensao-joelho-caneleira 2, rosca-inclinada 2, crucifixo-inverso 2, elevacao-halteres 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"intermediario","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["costas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio · intermediario · 3 dias · 90 min · prioridade bracos · sem dor**: tríceps (prioridade) com 11 de 12 séries e o dia mais longo em 75 de 90 min.
  - Programa: Corpo todo A (60 min): bulgaro 2, supino-reto 2, puxada-frente 2, triceps-frances-halter 4, rosca-inclinada 3, flexao-bola 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (75 min): stiff 4, supino-inclinado 2, remada-apoiada 4, goblet 4, rosca-inclinada 3, panturrilha-chao 4, crucifixo-inverso 4, abdominal-chao 2 | Corpo todo C (64 min): flexao-fechada 4, afundo 2, supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, rosca-inclinada 3, elevacao-halteres 3, flexao-bola 2, abdominal-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"intermediario","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":["bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio'].inventario)`

### `regua.A2`

- **casa · iniciante · 4 dias · 30 min · prioridade nenhuma · ombro 7**: dia com menos de 3 exercícios ou sem multiarticular: Superior A com 1 exercício.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (31 min): goblet 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Superior B (5 min): rosca-martelo 3 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 4 dias · 30 min · prioridade nenhuma · ombro 7**: dia com menos de 3 exercícios ou sem multiarticular: Superior A com 1 exercício.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (35 min): bulgaro 2, stiff 2, panturrilha 3+drop, abdominal-bola 4 | Superior B (7 min): rosca-kettlebell 3 | Inferior B (26 min): afundo 2, ponte-kettlebell 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 4 dias · 30 min · prioridade nenhuma · ombro 7**: dia com menos de 3 exercícios ou sem multiarticular: Superior A com 1 exercício.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (28 min): bulgaro 3, stiff 2, abdominal-bola 4 | Superior B (5 min): rosca-martelo 3 | Inferior B (30 min): afundo 3, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-chao 3+drop
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `regua.A3`

- **casa · iniciante · 2 dias · 30 min · prioridade nenhuma · sem dor**: dia mais longo acima de 110% dos minutos: dia de 45 min em 30.
  - Programa: Corpo todo A (45 min): goblet 3, flexao 2, remada-unilateral-sem-banco 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (29 min): afundo 3, flexao 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 30 min · prioridade nenhuma · sem dor**: dia mais longo acima de 110% dos minutos: dia de 43 min em 30.
  - Programa: Corpo todo A (43 min): bulgaro 2, supino-reto 2, barra-fixa 2, stiff 2, panturrilha 3+drop, abdominal-bola 4 | Corpo todo B (28 min): afundo 3, supino-inclinado 3, remada-apoiada 2, flexao-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 30 min · prioridade nenhuma · sem dor**: dia mais longo acima de 110% dos minutos: dia de 41 min em 30.
  - Programa: Corpo todo A (41 min): bulgaro 2, supino-reto 2, puxada-frente 2, stiff 2, panturrilha-chao 3+drop, abdominal-bola 4 | Corpo todo B (28 min): afundo 3, supino-inclinado 3, remada-apoiada 2, flexao-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio'].inventario)`

### `regua.A4`

- **casa · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: dia típico abaixo de 70% dos minutos, sem o aviso: dia típico de 57 min em 90, sem o aviso.
  - Programa: Corpo todo A (50 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (58 min): stiff 2, flexao 2, remada-curvada-halteres 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-chao 4, crucifixo-invertido-curvado 3, abdominal-chao 2 | Corpo todo C (57 min): afundo 2, flexao 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 3, flexao-fechada 2, elevacao-halteres 3, flexao-joelho-elastico 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 75 min · prioridade nenhuma · sem dor**: dia típico abaixo de 70% dos minutos, sem o aviso: dia típico de 51 min em 75, sem o aviso.
  - Programa: Corpo todo A (49 min): bulgaro 2, supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (58 min): stiff 2, supino-inclinado 2, remada-apoiada 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (51 min): afundo 2, supino-reto 2, barra-fixa-supinada 2, ponte-kettlebell 2, elevacao-halteres 3, triceps-suspensao 2, flexao-joelho-elastico 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":75,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio+ · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: dia típico abaixo de 70% dos minutos, sem o aviso: dia típico de 54 min em 90, sem o aviso.
  - Programa: Corpo todo A (49 min): bulgaro 2, supino-reto 2, puxada-frente 2, cadeira-flexora 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (57 min): stiff 2, supino-inclinado 2, remada-apoiada 2, cadeira-extensora 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (54 min): afundo 2, supino-maquina 2, puxada-frente 2, hip-thrust 3, flexao-fechada 2, elevacao-halteres 3, cadeira-flexora 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio+'].inventario)`

### `regua.B1`

- **casa · iniciante · 3 dias · 30 min · prioridade nenhuma · sem dor · evita flexao**: o mesmo exercício em todos os dias havendo outro do mesmo nível: supino-chao-halteres em todos os dias, com outro do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (35 min): goblet 2, supino-chao-halteres 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, abdominal-chao 4 | Corpo todo B (30 min): stiff 2, supino-chao-halteres 2, remada-curvada-halteres 2, rosca-alternada 2+drop, panturrilha-chao 3+drop | Corpo todo C (30 min): afundo 3, supino-chao-halteres 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":30,"prioridades":[],"evitarExercicios":["flexao"],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 60 min · prioridade nenhuma · quadril 7**: o mesmo exercício em todos os dias havendo outro do mesmo nível: extensao-joelho-caneleira em todos os dias, com outro do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (45 min): supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, extensao-joelho-caneleira 2, abdominal-bola 2 | Corpo todo B (52 min): supino-inclinado 2, remada-apoiada 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 3, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (47 min): supino-reto 2, barra-fixa-supinada 2, elevacao-halteres 3, triceps-suspensao 2, flexao-bola 2, panturrilha-bilateral-step 3, extensao-joelho-caneleira 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":60,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: o mesmo exercício em todos os dias havendo outro do mesmo nível: ponte-gluteo-halter em todos os dias, com outro do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-martelo 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 4, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `regua.C1`

- **casa · iniciante · 2 dias · 90 min · prioridade bracos · lombar 7**: prioritário abaixo da meta com tempo e exercício: triceps com 6 de 8 e o dia mais longo em 75 de 90 min.
  - Programa: Corpo todo A (67 min): goblet 2, flexao 2, puxada-elastico 2, triceps-frances-halter 4, rosca-alternada 3, flexao-joelho-elastico 3, elevacao-halteres 3, panturrilha-chao 4, crucifixo-elastico 2 | Corpo todo B (75 min): afundo 2, flexao 2, remada-elastico 2, ponte-gluteo-halter 4, rosca-martelo 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, face-pull-elastico 4, elevacao-halteres 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"lombar","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 90 min · prioridade bracos · lombar 7**: prioritário abaixo da meta com tempo e exercício: triceps com 6 de 8 e o dia mais longo em 72 de 90 min.
  - Programa: Corpo todo A (72 min): bulgaro 2, supino-reto 2, barra-fixa 3, triceps-frances-halter 4, rosca-inclinada 3, flexao-bola 3, elevacao-halteres 3, panturrilha 4, crucifixo-halteres 2 | Corpo todo B (69 min): afundo 2, supino-inclinado 2, remada-apoiada 3, rosca-inclinada 2, flexao-joelho-elastico 3, extensao-joelho-caneleira 2, crucifixo-inverso 3, elevacao-halteres 3, abducao-caneleira 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"lombar","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 90 min · prioridade peito+bracos · quadril 7**: prioritário abaixo da meta com tempo e exercício: triceps com 7,5 de 8 e o dia mais longo em 70 de 90 min.
  - Programa: Corpo todo A (70 min): supino-reto 3, puxada-frente 3, triceps-frances-halter 4, crucifixo-halteres 3, rosca-inclinada 3, flexao-bola 3, elevacao-halteres 3, panturrilha-chao 4, abdominal-bola 2 | Corpo todo B (63 min): supino-inclinado 2, remada-apoiada 4, desenvolvimento 2, rosca-inclinada 2, flexao-bola 4, crucifixo-inverso 4, elevacao-halteres 4, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["peito","bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['condominio'].inventario)`

### `regua.D1`

- **casa · iniciante · 2 dias · 30 min · prioridade peito · sem dor**: empurrar ÷ puxar acima de 1,5 havendo como puxar: empurrar 8 ÷ puxar 4 séries.
  - Programa: Corpo todo A (49 min): flexao 4, goblet 3, remada-unilateral-sem-banco 2, stiff 2, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (34 min): flexao 4, afundo 3, remada-curvada-halteres 2, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 30 min · prioridade peito · sem dor**: empurrar ÷ puxar acima de 1,5 havendo como puxar: empurrar 8 ÷ puxar 4 séries.
  - Programa: Corpo todo A (52 min): supino-reto 4, bulgaro 2, barra-fixa 2, stiff 2, panturrilha 3+drop, abdominal-bola 4 | Corpo todo B (32 min): supino-inclinado 4, afundo 2, remada-apoiada 2, flexao-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 30 min · prioridade peito · sem dor**: empurrar ÷ puxar acima de 1,5 havendo como puxar: empurrar 8 ÷ puxar 4 séries.
  - Programa: Corpo todo A (49 min): supino-reto 4, bulgaro 2, puxada-frente 2, stiff 2, panturrilha-chao 3+drop, abdominal-bola 4 | Corpo todo B (32 min): supino-inclinado 4, afundo 2, remada-apoiada 2, flexao-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio'].inventario)`

### `regua.D3`

- **casa · iniciante · 2 dias · 30 min · prioridade nenhuma · quadril 7**: quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto): quadríceps 0 ÷ posteriores 5.
  - Programa: Corpo todo A (42 min): flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, elevacao-halteres 3+drop, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (29 min): flexao 3, remada-curvada-halteres 3, flexao-joelho-elastico 3, rosca-alternada 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 30 min · prioridade nenhuma · quadril 7**: quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto): quadríceps 0 ÷ posteriores 5.
  - Programa: Corpo todo A (41 min): supino-reto 2, barra-fixa 2, flexao-bola 2, elevacao-halteres 3+drop, panturrilha 3+drop, abdominal-bola 4 | Corpo todo B (28 min): supino-inclinado 3, remada-apoiada 3, flexao-joelho-elastico 3, rosca-inclinada 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · intermediario · 2 dias · 30 min · prioridade pernas · sem dor**: quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto): quadríceps 6 ÷ posteriores 2.
  - Programa: Corpo todo A (39 min): bulgaro 2, stiff 2, supino-reto 2, puxada-frente 2, panturrilha-chao 2+drop, abdominal-bola 4 | Corpo todo B (28 min): afundo 4, supino-inclinado 2, remada-apoiada 2
  - Reproduzir: `gerarPrograma({"nivel":"intermediario","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":["pernas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio'].inventario)`

### `regua.E1`

- **casa · iniciante · 2 dias · 90 min · prioridade nenhuma · sem dor**: não prioritário com 1 a 3 séries havendo exercício e tempo: gluteos com 3,5 séries e o dia mais longo em 72 de 90 min.
  - Programa: Corpo todo A (72 min): goblet 2, flexao 2, remada-unilateral-sem-banco 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-chao 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (67 min): afundo 2, flexao 2, remada-curvada-halteres 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-curvado 3, elevacao-halteres 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **condominio+ · iniciante · 2 dias · 90 min · prioridade nenhuma · sem dor**: não prioritário com 1 a 3 séries havendo exercício e tempo: gluteos com 3,5 séries e o dia mais longo em 73 de 90 min.
  - Programa: Corpo todo A (73 min): bulgaro 2, supino-reto 2, puxada-frente 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha 4, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (63 min): afundo 2, supino-inclinado 2, remada-apoiada 3, cadeira-flexora 3, cadeira-extensora 2, rosca-inclinada 3, crucifixo-inverso 3, elevacao-halteres 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio+'].inventario)`
- **academia · iniciante · 2 dias · 90 min · prioridade nenhuma · sem dor**: não prioritário com 1 a 3 séries havendo exercício e tempo: gluteos com 3,5 séries e o dia mais longo em 73 de 90 min.
  - Programa: Corpo todo A (73 min): agachamento-smith 2, supino-reto 2, puxada-unilateral 3, stiff 3, triceps-frances 4, elevacao-lateral 3, panturrilha-em-pe-maquina 4, crucifixo-halteres 2, abdominal-maquina 2 | Corpo todo B (65 min): afundo 2, supino-inclinado 2, remada-apoiada 3, cadeira-flexora 3, cadeira-extensora 2, rosca-inclinada 3, crucifixo-inverso 3, elevacao-lateral 3, abdominal-maquina 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['academia'].inventario)`

### `tempo.uso-baixo`

- **casa · iniciante · 2 dias · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 53 de 90 min (59%), com o aviso de sobra.
  - Programa: Corpo todo A (37 min): goblet 2, stiff 3, panturrilha-chao 4, rosca-martelo 3, abdominal-chao 2 | Corpo todo B (53 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, aducao-deitado 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 48 de 75 min (64%), com o aviso de sobra.
  - Programa: Corpo todo A (43 min): bulgaro 2, stiff 3, panturrilha 4, rosca-kettlebell 3, abdominal-bola 2 | Corpo todo B (48 min): afundo 2, flexao-bola 3, extensao-joelho-caneleira 2, rosca-alternada 3, abducao-caneleira 2, aducao-caneleira 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":75,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 58 de 90 min (64%), com o aviso de sobra.
  - Programa: Corpo todo A (39 min): bulgaro 2, stiff 3, panturrilha-chao 4, rosca-martelo 3, abdominal-bola 2 | Corpo todo B (58 min): afundo 4, goblet 2, ponte-gluteo-halter 2, flexao-bola 4, rosca-alternada 4, aducao-deitado 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `tempo.uso-baixo-sem-aviso`

- **casa · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: o dia mais longo usa 58 de 90 min e não há aviso de sobra.
  - Programa: Corpo todo A (50 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (58 min): stiff 2, flexao 2, remada-curvada-halteres 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-chao 4, crucifixo-invertido-curvado 3, abdominal-chao 2 | Corpo todo C (57 min): afundo 2, flexao 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 3, flexao-fechada 2, elevacao-halteres 3, flexao-joelho-elastico 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: o dia mais longo usa 58 de 90 min e não há aviso de sobra.
  - Programa: Corpo todo A (49 min): bulgaro 2, supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (58 min): stiff 2, supino-inclinado 2, remada-apoiada 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (51 min): afundo 2, supino-reto 2, barra-fixa-supinada 2, ponte-kettlebell 2, elevacao-halteres 3, triceps-suspensao 2, flexao-joelho-elastico 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio+ · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: o dia mais longo usa 57 de 90 min e não há aviso de sobra.
  - Programa: Corpo todo A (49 min): bulgaro 2, supino-reto 2, puxada-frente 2, cadeira-flexora 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (57 min): stiff 2, supino-inclinado 2, remada-apoiada 2, cadeira-extensora 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (54 min): afundo 2, supino-maquina 2, puxada-frente 2, hip-thrust 3, flexao-fechada 2, elevacao-halteres 3, cadeira-flexora 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio+'].inventario)`

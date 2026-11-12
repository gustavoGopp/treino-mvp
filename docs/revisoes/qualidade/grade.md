# Estresse de qualidade dos treinos gerados

> Gerado por `npm run auditoria:qualidade` (`scripts/auditoria/qualidade.ts`). Dados fictícios. Não editar à mão.

**911.625 programas** (3.646.500 dias de treino): 55 cenários de equipamento × 3 níveis × 5 números de dias (a divisão recomendada de cada um) × 5 durações (30, 45, 60, 75, 90 min) × 13 prioridades × 15 situações de dor; nos casos sem dor, mais 2 variantes com um exercício evitado (o 1º da vaga de agachar e o 1º da de empurrar horizontal). 0 bloqueados.

## Suspeitos (contagem de ocorrências)

`dia.poucos-exercicios`: dia com menos de 5 exercícios tendo 45 min ou mais. `tempo.uso-baixo`: o dia mais longo usa menos de 70% dos minutos (`tempo.sobra`). `volume.zero-sem-aviso`: músculo grande com 0 série e nenhum aviso o cita. `prioridade.abaixo-com-tempo`: prioritário abaixo da meta com o dia mais longo abaixo de 85% dos minutos, sem dor. `monotonia.todos-os-dias-com-opcao`: o mesmo exercício em todos os dias havendo outro equivalente possível. `regua.*`: os defeitos da régua da G5 (`scripts/auditoria/regua.ts`; a grade própria dela está em `regua.md`).

| suspeito | ocorrências | % (dos dias ou dos programas) |
| --- | ---: | ---: |
| `dia.poucos-exercicios` | 380.070 | 10,4% dos dias |
| `tempo.uso-baixo` | 174.630 | 19,2% dos programas |
| `monotonia.todos-os-dias` | 161.667 | 17,7% dos programas |
| `regua.A2` | 90.709 | 10% dos programas |
| `regua.A3` | 41.928 | 4,6% dos programas |
| `regua.A4` | 31.275 | 3,4% dos programas |
| `prioridade.abaixo-com-tempo` | 23.844 | 2,6% dos programas |
| `regua.C1` | 17.605 | 1,9% dos programas |
| `tempo.uso-baixo-sem-aviso` | 16.540 | 1,8% dos programas |
| `regua.D1` | 5.519 | 0,6% dos programas |
| `monotonia.todos-os-dias-com-opcao` | 2.946 | 0,3% dos programas |
| `regua.B1` | 2.946 | 0,3% dos programas |
| `regua.D3` | 1.359 | 0,1% dos programas |
| `regua.E1` | 516 | 0,1% dos programas |
| `avaliador.ajustar-sem-aviso` | 210 | 0% dos programas |

## Exercícios por dia

Faixas de exercícios por dia de treino (% dos dias), por duração escolhida. "Cabem" é o alvo de `tempo.exercicios-por-sessao`.

| minutos | cabem | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 4 | 13,7% | 80,8% | 5,4% | 0% | 4 |
| 45 | 6 | 5,4% | 7,8% | 86,9% | 0% | 6 |
| 60 | 8 | 5,4% | 7,6% | 68,9% | 18,1% | 6 |
| 75 | 10 | 5,4% | 7,6% | 64,3% | 22,7% | 6 |
| 90 | 12 | 5,4% | 7,6% | 63,6% | 23,4% | 6 |

O mesmo, só nos programas sem dor e sem exercício evitado:

| minutos | cabem | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 4 | 12% | 80,1% | 7,9% | 0% | 4 |
| 45 | 6 | 3,1% | 4% | 93% | 0% | 6 |
| 60 | 8 | 3,1% | 4% | 71,2% | 21,8% | 6 |
| 75 | 10 | 3,1% | 4% | 65,9% | 27% | 6 |
| 90 | 12 | 3,1% | 4% | 65,1% | 27,9% | 6 |

Por dias por semana (sem dor e sem exercício evitado; % dos dias com ≤ 3 exercícios, por duração):

| dias | 30 min | 45 min | 60 min | 75 min | 90 min |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | 1,7% | 0% | 0% | 0% | 0% |
| 3 | 3,7% | 0% | 0% | 0% | 0% |
| 4 | 12,7% | 0% | 0% | 0% | 0% |
| 5 | 14,8% | 4,8% | 4,8% | 4,8% | 4,8% |
| 6 | 16,7% | 6,2% | 6,2% | 6,2% | 6,2% |

### Por cenário de equipamento, com 45 min ou mais

% dos dias em cada faixa, nos programas sem dor e sem exercício evitado ("limpos"); a coluna "≤ 3 (todos)" conta também os com dor ou exercício evitado. "Uso < 70%" é a fatia dos programas (45 min ou mais, todos) cujo dia mais longo usa menos de 70% dos minutos.

| cenário | grupo | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana | ≤ 3 (todos) | uso < 70% |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | atalho | 0% | 0% | 64,5% | 35,5% | 6 | 4,8% | 21,6% |
| academia+ | atalho | 0% | 0% | 64,5% | 35,5% | 6 | 4,8% | 21,3% |
| bairro | persona | 0% | 0% | 64,3% | 35,7% | 6 | 4% | 23,6% |
| banco+halteres-leves | par | 0% | 0,1% | 67,5% | 32,3% | 6 | 5,8% | 15,4% |
| bruno | persona | 0% | 0% | 65,6% | 34,4% | 6 | 4,8% | 16,7% |
| casa | atalho | 0% | 0% | 66,2% | 33,8% | 6 | 5% | 17% |
| casa+ | atalho | 0% | 0% | 65,2% | 34,8% | 6 | 4,8% | 21,8% |
| condominio | atalho | 0% | 0,1% | 66,8% | 33% | 6 | 4,5% | 17,6% |
| condominio+ | atalho | 0% | 0% | 64,7% | 35,3% | 6 | 4,8% | 21,9% |
| diego | persona | 0% | 0% | 66,9% | 33,1% | 6 | 5% | 17,4% |
| elasticos | persona | 0% | 0% | 66,9% | 33,1% | 6 | 5% | 17,2% |
| halteres | persona | 0% | 1,8% | 67,1% | 31,2% | 6 | 5,9% | 12% |
| halteres-banco | persona | 0% | 0,1% | 67,5% | 32,3% | 6 | 5,8% | 15,4% |
| halteres+bola | par | 0% | 1,8% | 67% | 31,3% | 6 | 5,6% | 12% |
| so:abdominal_maquina | item | 0% | 0,1% | 90,6% | 9,3% | 6 | 0,1% | 25,8% |
| so:anilhas_e_manoplas | item | 0% | 1,8% | 67,1% | 31,2% | 6 | 5,9% | 12% |
| so:banco_romano | item | 0% | 0,5% | 91,8% | 7,8% | 6 | 0,2% | 25% |
| so:barra_fixa | item | 16,5% | 19,1% | 51% | 13,4% | 5 | 19,5% | 22,4% |
| so:barra_hexagonal | item | 0% | 0,1% | 91% | 8,8% | 6 | 0,1% | 28,9% |
| so:barra_longa | item | 13,6% | 9,5% | 66,2% | 10,7% | 6 | 14,6% | 22,2% |
| so:barra_w | item | 0% | 0% | 84,9% | 15% | 6 | 0% | 17,3% |
| so:bola_suica | item | 0% | 0,4% | 90% | 9,6% | 6 | 0,1% | 25,9% |
| so:cadeira_abdutora_adutora | item | 0% | 0,1% | 89,9% | 10% | 6 | 0,1% | 28,7% |
| so:cadeira_extensora | item | 0% | 0,1% | 88,5% | 11,4% | 6 | 0,1% | 24,4% |
| so:cadeira_flexora | item | 0% | 0% | 90,5% | 9,5% | 6 | 0% | 22,9% |
| so:caneleiras | item | 0% | 0,1% | 71,8% | 28,1% | 7 | 0% | 14,4% |
| so:desenvolvimento_maquina | item | 0% | 0,1% | 90,6% | 9,3% | 6 | 0,1% | 25,2% |
| so:estacao_polia_dupla | item | 0% | 2,2% | 65,4% | 32,4% | 6 | 3,5% | 12,3% |
| so:estacao_puxada | item | 20,4% | 17,7% | 48,7% | 13,2% | 5 | 22,7% | 24,2% |
| so:estacao_remada | item | 20,4% | 17,7% | 48,6% | 13,4% | 5 | 22,8% | 23,7% |
| so:gluteo_maquina | item | 0% | 0,2% | 90,5% | 9,3% | 6 | 0,1% | 26,6% |
| so:graviton | item | 20,3% | 16,6% | 49,2% | 13,9% | 5 | 22,9% | 24,6% |
| so:hack | item | 0% | 0,1% | 90,4% | 9,4% | 6 | 0,1% | 26,2% |
| so:halteres_fixos | item | 0% | 1,8% | 67,1% | 31,1% | 6 | 5,9% | 12% |
| so:kettlebell | item | 4,4% | 23,8% | 55,8% | 16% | 6 | 9,9% | 16,5% |
| so:leg_press | item | 0% | 0,1% | 90,3% | 9,6% | 6 | 0,1% | 27,3% |
| so:mesa_flexora | item | 0% | 0% | 90,5% | 9,5% | 6 | 0% | 22,9% |
| so:mini_band | item | 0% | 0,1% | 88,6% | 11,3% | 6 | 0,1% | 22,9% |
| so:multifuncional | item | 6,9% | 24,5% | 54,9% | 13,7% | 5 | 10,4% | 21,9% |
| so:panturrilha_em_pe_maquina | item | 0% | 0,1% | 90,4% | 9,5% | 6 | 0,1% | 26,2% |
| so:panturrilha_sentada_maquina | item | 0% | 0,2% | 89,5% | 10,4% | 6 | 0% | 26,1% |
| so:paralelas | item | 0% | 0,1% | 90,7% | 9,2% | 6 | 0,1% | 25,5% |
| so:rack_de_agachamento | item | 20,4% | 17,7% | 48,6% | 13,4% | 5 | 21,9% | 23,7% |
| so:remada_articulada | item | 20,4% | 17,7% | 48,6% | 13,4% | 5 | 22,7% | 24% |
| so:roda_abdominal | item | 0% | 0,1% | 90,6% | 9,3% | 6 | 0,1% | 25,7% |
| so:rosca_maquina | item | 0% | 0% | 84,9% | 15,1% | 6 | 0% | 17,3% |
| so:smith | item | 20,4% | 17,7% | 48,4% | 13,5% | 5 | 21,9% | 24,3% |
| so:step | item | 0% | 0,2% | 90,7% | 9,2% | 6 | 0,1% | 24% |
| so:supino_maquina | item | 0% | 0,1% | 90% | 9,8% | 6 | 0% | 24,6% |
| so:suspensao | item | 4,4% | 23,8% | 55% | 16,9% | 6 | 8,2% | 19,7% |
| so:triceps_maquina | item | 0% | 0,1% | 90,4% | 9,5% | 6 | 0% | 24,3% |
| so:voador | item | 0% | 0,1% | 87,6% | 12,3% | 6 | 0% | 23,4% |
| step+elasticos | par | 0% | 0% | 67% | 33% | 6 | 5% | 16,7% |
| suspensao+elasticos | par | 0% | 0% | 67% | 33% | 6 | 5% | 16,5% |
| vazio | vazio | 0% | 0,1% | 90,6% | 9,3% | 6 | 0,1% | 25,5% |

## Uso dos minutos

Minutos estimados do dia mais longo ÷ minutos escolhidos (% dos programas).

| minutos | mediana do uso | < 50% | < 70% | ≥ 100% |
| ---: | ---: | ---: | ---: | ---: |
| 30 | 100% | 0% | 0% | 77,6% |
| 45 | 100% | 0% | 0,1% | 72,9% |
| 60 | 95% | 0,1% | 7,6% | 44,2% |
| 75 | 80% | 1,6% | 27,7% | 21,9% |
| 90 | 65% | 10,4% | 50% | 11,6% |

## Séries por músculo

Por nível, somando os cenários: média de séries semanais; prioritário abaixo da meta (% dos programas em que o músculo é prioridade); não prioritário abaixo do piso de 4 (% dos outros); 0 série na semana (% dos programas); 0 sem aviso que o cite.

### iniciante

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 7,4 | 34,3% | 14,7% | 14,6% | 0 |
| costas | 3,5 | 64,7% | 54,3% | 53,9% | 0 |
| ombro (lateral) | 2,3 | 76,8% | 70,8% | 53,6% | 0 |
| ombro (posterior) | 5,8 | 0% | 13% | 8,6% | 0 |
| bíceps | 3,2 | 68% | 53,1% | 48,6% | 0 |
| tríceps | 7,6 | 28,9% | 17,1% | 13,9% | 0 |
| quadríceps | 6,9 | 37,8% | 10,4% | 10,4% | 0 |
| posteriores da coxa | 7,4 | 46,3% | 7,1% | 3,7% | 0 |
| glúteos | 9,9 | 21,9% | 3,9% | 0,5% | 0 |
| panturrilha | 5,7 | 45,9% | 11,7% | 5,9% | 0 |
| abdômen | 5,8 | 34,1% | 11,8% | 5,9% | 0 |

### intermediario

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 8,6 | 28,4% | 13,6% | 13,6% | 0 |
| costas | 3,9 | 66% | 52,8% | 52,2% | 0 |
| ombro (lateral) | 2,4 | 77,3% | 70,5% | 53,9% | 0 |
| ombro (posterior) | 6 | 0% | 13,2% | 8,7% | 0 |
| bíceps | 3,5 | 70,9% | 52,2% | 47,1% | 0 |
| tríceps | 8,4 | 36,4% | 17,1% | 13,8% | 0 |
| quadríceps | 7,9 | 48,2% | 10,4% | 10,4% | 0 |
| posteriores da coxa | 8,6 | 37,8% | 6,9% | 3,6% | 0 |
| glúteos | 10 | 32,7% | 5,4% | 0,6% | 0 |
| panturrilha | 6,3 | 51,7% | 11,8% | 5,9% | 0 |
| abdômen | 6,1 | 36,8% | 12% | 5,9% | 0 |

### avancado

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 9,2 | 41,2% | 13,6% | 13,6% | 0 |
| costas | 4,1 | 77% | 52,8% | 52,2% | 0 |
| ombro (lateral) | 2,5 | 80,9% | 68,3% | 53,9% | 0 |
| ombro (posterior) | 6,2 | 0% | 13,2% | 8,7% | 0 |
| bíceps | 3,7 | 75,7% | 52,4% | 47,1% | 0 |
| tríceps | 8,9 | 41,2% | 17,1% | 13,8% | 0 |
| quadríceps | 8,5 | 65,4% | 10,4% | 10,4% | 0 |
| posteriores da coxa | 9,3 | 49,3% | 6,9% | 3,6% | 0 |
| glúteos | 10,7 | 39,5% | 5% | 0,6% | 0 |
| panturrilha | 6,6 | 65,2% | 11,8% | 5,9% | 0 |
| abdômen | 6,3 | 44,1% | 12,1% | 5,9% | 0 |

### Músculos a zero por cenário (todos os níveis; % dos programas)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | 5,9% | 9,4% | 20% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 5,9% | 5,9% | 5,9% |
| academia+ | 5,9% | 9,4% | 20% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 5,8% | 5,9% | 5,9% |
| bairro | 5,9% | 11,8% | 20% | 6,4% | 5,9% | 11,8% | 6,4% | 0% | 1,4% | 5,9% | 5,9% |
| banco+halteres-leves | 5,9% | 17,6% | 19% | 6,6% | 6,2% | 11,8% | 11,8% | 0% | 0,2% | 5,9% | 5,9% |
| bruno | 5,9% | 9,4% | 20% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 0,2% | 5,9% | 5,9% |
| casa | 6,4% | 11,8% | 20% | 6,1% | 5,9% | 6,2% | 6,4% | 0% | 1,4% | 5,9% | 5,9% |
| casa+ | 5,9% | 11,8% | 20% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 0,2% | 5,9% | 5,9% |
| condominio | 5,9% | 11,8% | 19,9% | 6,1% | 5,9% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| condominio+ | 5,9% | 11,8% | 20% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 1,4% | 5,9% | 5,9% |
| diego | 7,6% | 6,1% | 19,3% | 6,1% | 5,9% | 6,5% | 6,4% | 0% | 1,4% | 5,9% | 5,9% |
| elasticos | 7,6% | 6,1% | 19,3% | 6,1% | 5,9% | 6,5% | 6,4% | 0% | 1,4% | 5,9% | 5,9% |
| halteres | 11,8% | 17,6% | 18,4% | 6,4% | 6,2% | 11,8% | 11,8% | 0% | 0,2% | 5,9% | 5,9% |
| halteres-banco | 5,9% | 17,6% | 19% | 6,6% | 6,2% | 11,8% | 11,8% | 0% | 0,2% | 5,9% | 5,9% |
| halteres+bola | 11,8% | 17,6% | 18,5% | 6,4% | 6,2% | 11,8% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| so:abdominal_maquina | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:anilhas_e_manoplas | 11,8% | 17,6% | 18,4% | 6,4% | 6,2% | 11,8% | 11,8% | 0% | 0,2% | 5,9% | 5,9% |
| so:banco_romano | 18,1% | 100% | 74,8% | 8,8% | 100% | 17,6% | 11,8% | 0% | 0% | 5,9% | 5,9% |
| so:barra_fixa | 18,1% | 11,8% | 72,5% | 6,1% | 11,8% | 17,7% | 11,8% | 5,9% | 0,3% | 5,9% | 5,9% |
| so:barra_hexagonal | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:barra_longa | 18,1% | 45,1% | 72% | 7,2% | 45,1% | 17,6% | 11,8% | 2% | 0% | 5,9% | 5,9% |
| so:barra_w | 18,1% | 100% | 75,6% | 18,6% | 20,7% | 17,6% | 11,8% | 5,9% | 0,2% | 5,9% | 5,9% |
| so:bola_suica | 18,1% | 100% | 74,5% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:cadeira_abdutora_adutora | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:cadeira_extensora | 18,1% | 100% | 73,3% | 22,6% | 100% | 17,6% | 5,9% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:cadeira_flexora | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 1,1% | 5,9% | 5,9% |
| so:caneleiras | 18,3% | 100% | 12,1% | 22,5% | 100% | 17,7% | 5,9% | 5,9% | 0,3% | 5,9% | 5,9% |
| so:desenvolvimento_maquina | 18,1% | 100% | 69,9% | 9,2% | 100% | 13,2% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:estacao_polia_dupla | 5,9% | 11,8% | 18,2% | 6,1% | 11,8% | 12,3% | 11,8% | 5,9% | 0,5% | 5,9% | 5,9% |
| so:estacao_puxada | 18,1% | 11,8% | 72,5% | 6,1% | 11,8% | 17,7% | 11,8% | 5,9% | 0,3% | 5,9% | 5,9% |
| so:estacao_remada | 18% | 17,6% | 70,7% | 6,4% | 17,6% | 17,6% | 11,8% | 5,9% | 0,2% | 5,9% | 5,9% |
| so:gluteo_maquina | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:graviton | 11,8% | 11,8% | 72,7% | 6,1% | 11,8% | 11,8% | 11,8% | 5,9% | 0,3% | 5,9% | 5,9% |
| so:hack | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:halteres_fixos | 11,8% | 17,6% | 18,4% | 6,4% | 6,2% | 11,8% | 11,8% | 0% | 0,2% | 5,9% | 5,9% |
| so:kettlebell | 18,2% | 17,6% | 68,5% | 6,4% | 6,1% | 11,8% | 11,8% | 0% | 0,2% | 5,9% | 5,9% |
| so:leg_press | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:mesa_flexora | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 1,1% | 5,9% | 5,9% |
| so:mini_band | 18,1% | 100% | 73,3% | 22,6% | 100% | 17,6% | 5,9% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:multifuncional | 18,1% | 11,8% | 71,8% | 6,1% | 11,8% | 17,7% | 11,8% | 5,9% | 0,3% | 5,9% | 5,9% |
| so:panturrilha_em_pe_maquina | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:panturrilha_sentada_maquina | 18,1% | 100% | 74,4% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:paralelas | 14,2% | 100% | 74,6% | 9,2% | 100% | 13,7% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:rack_de_agachamento | 18,1% | 11,8% | 73,2% | 6,1% | 11,8% | 17,7% | 11,8% | 5,9% | 0,3% | 5,9% | 5,9% |
| so:remada_articulada | 18% | 11,8% | 72,7% | 6,1% | 11,8% | 17,6% | 11,8% | 5,9% | 0,2% | 5,9% | 5,9% |
| so:roda_abdominal | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:rosca_maquina | 18,1% | 100% | 75,6% | 18,5% | 14,9% | 17,6% | 11,8% | 5,9% | 0,2% | 5,9% | 5,9% |
| so:smith | 18,1% | 11,8% | 73,2% | 6,1% | 11,8% | 17,7% | 11,8% | 5,9% | 0,3% | 5,9% | 5,9% |
| so:step | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:supino_maquina | 11,8% | 100% | 74,8% | 9,2% | 100% | 11,8% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:suspensao | 18,7% | 11,8% | 74,5% | 6,1% | 11,8% | 11,8% | 11,8% | 5,9% | 0,2% | 5,9% | 5,9% |
| so:triceps_maquina | 19,6% | 100% | 74,6% | 9,2% | 100% | 6,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| so:voador | 5,9% | 100% | 75% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |
| step+elasticos | 7,6% | 6,1% | 19,3% | 6,1% | 5,9% | 6,5% | 6,3% | 0% | 1,4% | 5,9% | 5,9% |
| suspensao+elasticos | 7,6% | 6,1% | 19,3% | 6,1% | 5,9% | 6,5% | 6,3% | 0% | 1,4% | 5,9% | 5,9% |
| vazio | 18,1% | 100% | 74,6% | 9,2% | 100% | 17,6% | 11,8% | 5,9% | 0,1% | 5,9% | 5,9% |

## Fatia das séries da semana que vai aos músculos prioritários

Séries diretas mais meia série indireta, como o app conta o volume. Média (%) dos programas com prioridade.

| nível | 1 prioridade | 2 prioridades | 3 prioridades |
| --- | ---: | ---: | ---: |
| iniciante | 15,1% | 26,8% | 57,5% |
| intermediario | 16,5% | 28,8% | 59,4% |
| avancado | 17,1% | 29,6% | 60,6% |

| dias por semana | 1 prioridade | 2 prioridades | 3 prioridades |
| ---: | ---: | ---: | ---: |
| 2 | 16,3% | 28,6% | 59,9% |
| 3 | 17% | 30,1% | 61,6% |
| 4 | 16,6% | 28,8% | 60,2% |
| 5 | 16,2% | 28,1% | 58,8% |
| 6 | 15,1% | 26,3% | 55,4% |

| minutos | 1 prioridade | 2 prioridades | 3 prioridades |
| ---: | ---: | ---: | ---: |
| 30 | 15,7% | 28,8% | 57,2% |
| 45 | 16,1% | 28% | 59,8% |
| 60 | 16,3% | 28,2% | 59,3% |
| 75 | 16,5% | 28,4% | 59,8% |
| 90 | 16,6% | 28,5% | 59,8% |

### Por prioridade e nível (média %), e quando as prioridades competem

"Abaixo": programas com algum prioritário abaixo da meta. "Competem": um prioritário abaixo da meta e outro na meta (só com 2 ou 3 prioridades).

| prioridade | iniciante: fatia | abaixo | competem | intermediario: fatia | abaixo | competem | avancado: fatia | abaixo | competem |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| peito | 12% | 35,6% | — | 14,2% | 28,3% | — | 14,8% | 42% | — |
| costas | 6% | 64% | — | 6,9% | 64,7% | — | 7,2% | 76,2% | — |
| ombros | 4,9% | 75,8% | — | 5,1% | 76,6% | — | 5,4% | 79,8% | — |
| bracos | 18,4% | 71,5% | — | 19,6% | 77,3% | — | 20,1% | 79,6% | — |
| pernas | 33% | 57,6% | — | 36,4% | 56,7% | — | 37,8% | 66,3% | — |
| gluteos | 18,1% | 22,3% | — | 17,9% | 27,3% | — | 18,7% | 32,9% | — |
| abdomen | 13,2% | 25,2% | — | 15,2% | 27,8% | — | 15,8% | 32,3% | — |
| peito+costas | 17,4% | 68,5% | 36% | 19,9% | 69,5% | 43,5% | 20,6% | 79,8% | 41,1% |
| pernas+gluteos | 49,3% | 63,8% | 49% | 51,4% | 69,1% | 44,3% | 52,6% | 88,3% | 55,4% |
| peito+bracos | 30,4% | 75,3% | 51,5% | 32,6% | 77,4% | 54,1% | 33,5% | 82,5% | 49,1% |
| costas+ombros | 10,3% | 81,3% | 19,3% | 11,2% | 81,9% | 18,9% | 11,6% | 85,7% | 12,3% |
| pernas+gluteos+abdomen | 57,5% | 69,5% | 55,4% | 59,4% | 74% | 52,3% | 60,6% | 91,1% | 60,2% |

### Por cenário, com 1 prioridade (média %)

| cenário | fatia |
| --- | ---: |
| academia | 17,9% |
| academia+ | 17,9% |
| bairro | 17,6% |
| banco+halteres-leves | 17,6% |
| bruno | 17,6% |
| casa | 17,9% |
| casa+ | 17,7% |
| condominio | 17,4% |
| condominio+ | 17,8% |
| diego | 17,5% |
| elasticos | 17,5% |
| halteres | 17,6% |
| halteres-banco | 17,6% |
| halteres+bola | 17,6% |
| so:abdominal_maquina | 15,2% |
| so:anilhas_e_manoplas | 17,6% |
| so:banco_romano | 14,9% |
| so:barra_fixa | 15,9% |
| so:barra_hexagonal | 14,9% |
| so:barra_longa | 15,5% |
| so:barra_w | 15,9% |
| so:bola_suica | 15% |
| so:cadeira_abdutora_adutora | 15,1% |
| so:cadeira_extensora | 15,6% |
| so:cadeira_flexora | 15,2% |
| so:caneleiras | 16,3% |
| so:desenvolvimento_maquina | 15,1% |
| so:estacao_polia_dupla | 16,8% |
| so:estacao_puxada | 15,9% |
| so:estacao_remada | 15,8% |
| so:gluteo_maquina | 15,3% |
| so:graviton | 15,9% |
| so:hack | 15,1% |
| so:halteres_fixos | 17,6% |
| so:kettlebell | 16,7% |
| so:leg_press | 15,1% |
| so:mesa_flexora | 15,2% |
| so:mini_band | 15,5% |
| so:multifuncional | 15,9% |
| so:panturrilha_em_pe_maquina | 15,2% |
| so:panturrilha_sentada_maquina | 15,2% |
| so:paralelas | 15,2% |
| so:rack_de_agachamento | 15,9% |
| so:remada_articulada | 15,9% |
| so:roda_abdominal | 15,2% |
| so:rosca_maquina | 16% |
| so:smith | 15,9% |
| so:step | 15,2% |
| so:supino_maquina | 15,2% |
| so:suspensao | 16,9% |
| so:triceps_maquina | 15,5% |
| so:voador | 15% |
| step+elasticos | 17,5% |
| suspensao+elasticos | 17,7% |
| vazio | 15,1% |

## Exercícios distintos na semana e repetição

Mediana de exercícios distintos por programa; com 3 dias ou mais, % dos programas com um exercício (fora o abdominal) em todos os dias, e % em que havia outro equivalente do mesmo nível possível e sem uso.

| cenário | distintos (mediana) | em todos os dias | com opção |
| --- | ---: | ---: | ---: |
| academia | 22 | 0,8% | 0% |
| academia+ | 22 | 0,8% | 0% |
| bairro | 20 | 2,6% | 1,6% |
| banco+halteres-leves | 19 | 2,9% | 2,2% |
| bruno | 21 | 1,4% | 0% |
| casa | 18 | 4,1% | 1,6% |
| casa+ | 21 | 1,2% | 0,8% |
| condominio | 20 | 1,7% | 1,6% |
| condominio+ | 21 | 1,5% | 0% |
| diego | 20 | 3,5% | 0% |
| elasticos | 19 | 3,5% | 0% |
| halteres | 18 | 4,9% | 2,4% |
| halteres-banco | 19 | 2,9% | 2,2% |
| halteres+bola | 18 | 4,4% | 2,4% |
| so:abdominal_maquina | 12 | 36,3% | 0% |
| so:anilhas_e_manoplas | 18 | 4,9% | 2,4% |
| so:banco_romano | 13 | 32,5% | 0% |
| so:barra_fixa | 14 | 10% | 0% |
| so:barra_hexagonal | 12 | 36,3% | 0% |
| so:barra_longa | 13 | 42,4% | 0% |
| so:barra_w | 13 | 51,2% | 0% |
| so:bola_suica | 14 | 29,4% | 0% |
| so:cadeira_abdutora_adutora | 13 | 36,3% | 0% |
| so:cadeira_extensora | 13 | 39,3% | 0% |
| so:cadeira_flexora | 13 | 29,4% | 0% |
| so:caneleiras | 14 | 39,4% | 0% |
| so:desenvolvimento_maquina | 13 | 36,3% | 0% |
| so:estacao_polia_dupla | 16 | 13,7% | 0% |
| so:estacao_puxada | 13 | 19,9% | 0% |
| so:estacao_remada | 13 | 18,2% | 0% |
| so:gluteo_maquina | 12 | 39,5% | 0% |
| so:graviton | 14 | 18% | 0% |
| so:hack | 12 | 36,3% | 0% |
| so:halteres_fixos | 18 | 4,9% | 2,4% |
| so:kettlebell | 14 | 23,6% | 2,4% |
| so:leg_press | 12 | 36,3% | 0% |
| so:mesa_flexora | 13 | 29,4% | 0% |
| so:mini_band | 14 | 39,3% | 0% |
| so:multifuncional | 14 | 11,2% | 0% |
| so:panturrilha_em_pe_maquina | 12 | 36,3% | 0% |
| so:panturrilha_sentada_maquina | 13 | 36,3% | 0% |
| so:paralelas | 13 | 35,2% | 0% |
| so:rack_de_agachamento | 13 | 24,5% | 0% |
| so:remada_articulada | 13 | 19% | 0% |
| so:roda_abdominal | 13 | 36,3% | 0% |
| so:rosca_maquina | 13 | 54,3% | 0% |
| so:smith | 13 | 24,7% | 0% |
| so:step | 13 | 36,3% | 0% |
| so:supino_maquina | 13 | 29,7% | 0% |
| so:suspensao | 15 | 22,7% | 0% |
| so:triceps_maquina | 13 | 36% | 0% |
| so:voador | 13 | 34,1% | 0% |
| step+elasticos | 20 | 3,5% | 0% |
| suspensao+elasticos | 19 | 3,5% | 0% |
| vazio | 13 | 36,3% | 0% |

## Vagas vazias

Por cenário e nível: vagas ativas por programa (média), quantas têm exercício possível, quantas ficam vazias por equipamento ou por dor, e quantas com exercício ficam de fora por minutos (ou pelos cortes de tempo). A função mais vazia por equipamento vem ao lado.

| cenário | nível | vagas | com exercício | vazias: equipamento | vazias: dor | fora por minutos | vazias por equipamento (funções) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| academia | iniciante | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| academia | intermediario | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| academia | avancado | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| academia+ | iniciante | 29,4 | 27,3 | 0 | 2 | 3,4 | — |
| academia+ | intermediario | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| academia+ | avancado | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| bairro | iniciante | 29,4 | 27,3 | 0 | 2,1 | 3,4 | — |
| bairro | intermediario | 29,4 | 27,3 | 0 | 2,1 | 3,4 | — |
| bairro | avancado | 29,4 | 27,3 | 0 | 2,1 | 3,5 | — |
| banco+halteres-leves | iniciante | 29,4 | 25,6 | 1,6 | 2,2 | 3,6 | extensora (1,6) |
| banco+halteres-leves | intermediario | 29,4 | 25,6 | 1,6 | 2,2 | 3,6 | extensora (1,6) |
| banco+halteres-leves | avancado | 29,4 | 25,6 | 1,6 | 2,2 | 3,6 | extensora (1,6) |
| bruno | iniciante | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| bruno | intermediario | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| bruno | avancado | 29,4 | 27,3 | 0 | 2 | 3,6 | — |
| casa | iniciante | 29,4 | 27,3 | 0 | 2,1 | 4 | — |
| casa | intermediario | 29,4 | 27,3 | 0 | 2,1 | 4 | — |
| casa | avancado | 29,4 | 27,3 | 0 | 2,1 | 4,1 | — |
| casa+ | iniciante | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| casa+ | intermediario | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| casa+ | avancado | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| condominio | iniciante | 29,4 | 25,8 | 1,6 | 2 | 3,1 | extensora (1,6) |
| condominio | intermediario | 29,4 | 25,8 | 1,6 | 2 | 3,1 | extensora (1,6) |
| condominio | avancado | 29,4 | 25,8 | 1,6 | 2 | 3,1 | extensora (1,6) |
| condominio+ | iniciante | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| condominio+ | intermediario | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| condominio+ | avancado | 29,4 | 27,3 | 0 | 2 | 3,5 | — |
| diego | iniciante | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| diego | intermediario | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| diego | avancado | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| elasticos | iniciante | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| elasticos | intermediario | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| elasticos | avancado | 29,4 | 26,9 | 0,2 | 2,3 | 4 | panturrilha-sentada (0,2) |
| halteres | iniciante | 29,4 | 24,1 | 3 | 2,2 | 2,9 | extensora (1,6), crucifixo (1,4) |
| halteres | intermediario | 29,4 | 24,1 | 3 | 2,2 | 2,8 | extensora (1,6), crucifixo (1,4) |
| halteres | avancado | 29,4 | 24,1 | 3 | 2,2 | 2,8 | extensora (1,6), crucifixo (1,4) |
| halteres-banco | iniciante | 29,4 | 25,6 | 1,6 | 2,2 | 3,6 | extensora (1,6) |
| halteres-banco | intermediario | 29,4 | 25,6 | 1,6 | 2,2 | 3,6 | extensora (1,6) |
| halteres-banco | avancado | 29,4 | 25,6 | 1,6 | 2,2 | 3,6 | extensora (1,6) |
| halteres+bola | iniciante | 29,4 | 24,1 | 3 | 2,2 | 2,8 | extensora (1,6), crucifixo (1,4) |
| halteres+bola | intermediario | 29,4 | 24,1 | 3 | 2,2 | 2,8 | extensora (1,6), crucifixo (1,4) |
| halteres+bola | avancado | 29,4 | 24,1 | 3 | 2,2 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:abdominal_maquina | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:abdominal_maquina | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:abdominal_maquina | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:anilhas_e_manoplas | iniciante | 29,4 | 24,1 | 3 | 2,2 | 2,9 | extensora (1,6), crucifixo (1,4) |
| so:anilhas_e_manoplas | intermediario | 29,4 | 24,1 | 3 | 2,2 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:anilhas_e_manoplas | avancado | 29,4 | 24,1 | 3 | 2,2 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:banco_romano | iniciante | 36,6 | 21,4 | 13 | 2,2 | 1,5 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:banco_romano | intermediario | 36,6 | 21,6 | 12,8 | 2,2 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:banco_romano | avancado | 36,6 | 21,6 | 12,8 | 2,2 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:barra_fixa | iniciante | 29,4 | 18,3 | 9 | 2,1 | 1,7 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_fixa | intermediario | 29,4 | 18,4 | 8,8 | 2,1 | 1,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:barra_fixa | avancado | 29,4 | 18,4 | 8,8 | 2,1 | 1,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:barra_hexagonal | iniciante | 36,6 | 21,2 | 12,9 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:barra_hexagonal | intermediario | 36,6 | 21,4 | 12,7 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4) |
| so:barra_hexagonal | avancado | 36,6 | 21,4 | 12,7 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4) |
| so:barra_longa | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_longa | intermediario | 29,4 | 18,4 | 9 | 2 | 1,5 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:barra_longa | avancado | 29,4 | 18,4 | 9 | 2 | 1,5 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:barra_w | iniciante | 36,6 | 23 | 10,9 | 2,7 | 1,8 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_w | intermediario | 36,6 | 23,2 | 10,7 | 2,7 | 1,9 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:barra_w | avancado | 36,6 | 23,2 | 10,7 | 2,7 | 1,9 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:bola_suica | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:bola_suica | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:bola_suica | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:cadeira_abdutora_adutora | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_abdutora_adutora | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:cadeira_abdutora_adutora | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:cadeira_extensora | iniciante | 36,6 | 22,6 | 11,4 | 2,5 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_extensora | intermediario | 36,6 | 22,9 | 11,2 | 2,5 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:cadeira_extensora | avancado | 36,6 | 22,9 | 11,2 | 2,5 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:cadeira_flexora | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_flexora | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:cadeira_flexora | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:caneleiras | iniciante | 36,6 | 25,6 | 8,2 | 2,7 | 2,8 | puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:caneleiras | intermediario | 36,6 | 25,9 | 8 | 2,7 | 2,8 | puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:caneleiras | avancado | 36,6 | 25,9 | 8 | 2,7 | 2,9 | puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:desenvolvimento_maquina | iniciante | 36,6 | 21,2 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:desenvolvimento_maquina | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:desenvolvimento_maquina | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:estacao_polia_dupla | iniciante | 29,4 | 24,8 | 2 | 2,6 | 3,2 | extensora (1,6), panturrilha-sentada (0,2), empurrar-horizontal (0,1), agachar (0,1) |
| so:estacao_polia_dupla | intermediario | 29,4 | 24,9 | 1,9 | 2,6 | 3 | extensora (1,6), panturrilha-sentada (0,2), agachar (0,1) |
| so:estacao_polia_dupla | avancado | 29,4 | 24,9 | 1,9 | 2,6 | 3,1 | extensora (1,6), panturrilha-sentada (0,2), agachar (0,1) |
| so:estacao_puxada | iniciante | 29,4 | 18,3 | 9 | 2,1 | 1,7 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_puxada | intermediario | 29,4 | 18,4 | 8,8 | 2,1 | 1,5 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:estacao_puxada | avancado | 29,4 | 18,4 | 8,8 | 2,1 | 1,5 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:estacao_remada | iniciante | 29,4 | 18 | 9,2 | 2,2 | 1,7 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_remada | intermediario | 29,4 | 18,2 | 9 | 2,2 | 1,5 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:estacao_remada | avancado | 29,4 | 18,2 | 9 | 2,2 | 1,5 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:gluteo_maquina | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:gluteo_maquina | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:gluteo_maquina | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:graviton | iniciante | 29,4 | 18,5 | 8,8 | 2 | 1,8 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:graviton | intermediario | 29,4 | 18,5 | 8,8 | 2 | 1,5 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:graviton | avancado | 29,4 | 18,5 | 8,8 | 2 | 1,5 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:hack | iniciante | 36,6 | 21,2 | 12,9 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:hack | intermediario | 36,6 | 21,4 | 12,7 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4) |
| so:hack | avancado | 36,6 | 21,4 | 12,7 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4) |
| so:halteres_fixos | iniciante | 29,4 | 24,1 | 3 | 2,2 | 2,9 | extensora (1,6), crucifixo (1,4) |
| so:halteres_fixos | intermediario | 29,4 | 24,1 | 3 | 2,2 | 2,8 | extensora (1,6), crucifixo (1,4) |
| so:halteres_fixos | avancado | 29,4 | 24,1 | 3 | 2,2 | 2,9 | extensora (1,6), crucifixo (1,4) |
| so:kettlebell | iniciante | 29,4 | 21,5 | 5,6 | 2,3 | 3,2 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:kettlebell | intermediario | 29,4 | 21,7 | 5,4 | 2,3 | 3 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2) |
| so:kettlebell | avancado | 29,4 | 21,7 | 5,4 | 2,3 | 3 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2) |
| so:leg_press | iniciante | 36,6 | 21,2 | 12,9 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:leg_press | intermediario | 36,6 | 21,4 | 12,7 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4) |
| so:leg_press | avancado | 36,6 | 21,4 | 12,7 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4) |
| so:mesa_flexora | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mesa_flexora | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:mesa_flexora | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:mini_band | iniciante | 36,6 | 22,6 | 11,4 | 2,5 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mini_band | intermediario | 36,6 | 22,9 | 11,2 | 2,5 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:mini_band | avancado | 36,6 | 22,9 | 11,2 | 2,5 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:multifuncional | iniciante | 29,4 | 19,6 | 7,4 | 2,4 | 2 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:multifuncional | intermediario | 29,4 | 19,8 | 7,2 | 2,4 | 1,8 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:multifuncional | avancado | 29,4 | 19,8 | 7,2 | 2,4 | 1,8 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:panturrilha_em_pe_maquina | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_em_pe_maquina | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:panturrilha_em_pe_maquina | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:panturrilha_sentada_maquina | iniciante | 36,6 | 21,5 | 12,7 | 2,5 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_sentada_maquina | intermediario | 36,6 | 21,7 | 12,4 | 2,5 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), agachar (0,1) |
| so:panturrilha_sentada_maquina | avancado | 36,6 | 21,7 | 12,4 | 2,5 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), agachar (0,1) |
| so:paralelas | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:paralelas | intermediario | 36,6 | 21,5 | 12,8 | 2,3 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:paralelas | avancado | 36,6 | 21,5 | 12,8 | 2,3 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:rack_de_agachamento | iniciante | 29,4 | 19,7 | 7,4 | 2,3 | 2,9 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rack_de_agachamento | intermediario | 29,4 | 19,9 | 7,2 | 2,3 | 2,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:rack_de_agachamento | avancado | 29,4 | 19,9 | 7,2 | 2,3 | 2,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:remada_articulada | iniciante | 29,4 | 18,1 | 9,2 | 2,1 | 1,7 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:remada_articulada | intermediario | 29,4 | 18,3 | 9 | 2,1 | 1,5 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:remada_articulada | avancado | 29,4 | 18,3 | 9 | 2,1 | 1,4 | elevacao-lateral (2,1), puxar-vertical (1,8), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:roda_abdominal | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:roda_abdominal | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:roda_abdominal | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:rosca_maquina | iniciante | 36,6 | 23,1 | 10,9 | 2,6 | 1,9 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rosca_maquina | intermediario | 36,6 | 23,4 | 10,7 | 2,6 | 1,9 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:rosca_maquina | avancado | 36,6 | 23,4 | 10,7 | 2,6 | 1,9 | elevacao-lateral (3,2), puxar-vertical (2,4), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:smith | iniciante | 29,4 | 19,8 | 7,3 | 2,3 | 3 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:smith | intermediario | 29,4 | 19,9 | 7,2 | 2,3 | 2,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2) |
| so:smith | avancado | 29,4 | 19,9 | 7,2 | 2,3 | 2,6 | elevacao-lateral (2,1), biceps (1,8), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2) |
| so:step | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:step | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:step | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:supino_maquina | iniciante | 36,6 | 21,6 | 12,8 | 2,2 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:supino_maquina | intermediario | 36,6 | 21,6 | 12,8 | 2,2 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:supino_maquina | avancado | 36,6 | 21,6 | 12,8 | 2,2 | 1,4 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:suspensao | iniciante | 29,4 | 21,4 | 5,6 | 2,4 | 3,2 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:suspensao | intermediario | 29,4 | 21,6 | 5,5 | 2,4 | 3 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:suspensao | avancado | 29,4 | 21,6 | 5,5 | 2,4 | 3 | elevacao-lateral (2,1), extensora (1,6), crucifixo (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:triceps_maquina | iniciante | 36,6 | 21,2 | 13 | 2,3 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:triceps_maquina | intermediario | 36,6 | 21,5 | 12,8 | 2,3 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:triceps_maquina | avancado | 36,6 | 21,5 | 12,8 | 2,3 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| so:voador | iniciante | 36,6 | 22,8 | 11,5 | 2,3 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), panturrilha-sentada (0,4), empurrar-horizontal (0,1), agachar (0,1) |
| so:voador | intermediario | 36,6 | 22,9 | 11,4 | 2,3 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), panturrilha-sentada (0,4), agachar (0,1) |
| so:voador | avancado | 36,6 | 22,9 | 11,4 | 2,3 | 1,7 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), panturrilha-sentada (0,4), agachar (0,1) |
| step+elasticos | iniciante | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| step+elasticos | intermediario | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| step+elasticos | avancado | 29,4 | 26,9 | 0,2 | 2,3 | 4 | panturrilha-sentada (0,2) |
| suspensao+elasticos | iniciante | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| suspensao+elasticos | intermediario | 29,4 | 26,9 | 0,2 | 2,3 | 3,9 | panturrilha-sentada (0,2) |
| suspensao+elasticos | avancado | 29,4 | 26,9 | 0,2 | 2,3 | 4 | panturrilha-sentada (0,2) |
| vazio | iniciante | 36,6 | 21,1 | 13 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| vazio | intermediario | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |
| vazio | avancado | 36,6 | 21,4 | 12,8 | 2,4 | 1,3 | elevacao-lateral (3,2), puxar-vertical (2,4), biceps (2,1), extensora (1,6), puxar-horizontal (1,6), crucifixo (1,4), panturrilha-sentada (0,4), agachar (0,1) |

## O avaliador

O veredito do avaliador de programas (R5b, `src/domain/avaliador`; regra `avaliador.gravidade`) em cada programa: "bom" (nada a ajustar), "limite" (só o que o equipamento, a dor ou o tempo impedem), "ajustar" ou "bloqueado" (segurança). Os "ajustar" que o gerador não avisa aparecem nos suspeitos como `avaliador.*-sem-aviso` (devem ser 0 na grade reduzida, `npm run auditoria:avaliador`).

| cenário | bom | limite | ajustar | bloqueado | bom ou só limite |
| --- | ---: | ---: | ---: | ---: | ---: |
| **todos** | 11,1% | 79,9% | 9,1% | 0% | 90,9% |
| academia | 34,2% | 57,7% | 8,1% | 0% | 91,9% |
| academia+ | 34,2% | 57,6% | 8,2% | 0% | 91,8% |
| bairro | 33,9% | 56,7% | 9,4% | 0% | 90,6% |
| banco+halteres-leves | 37,2% | 51,8% | 10,9% | 0% | 89,1% |
| bruno | 35% | 57,8% | 7,2% | 0% | 92,8% |
| casa | 32,3% | 55,7% | 12% | 0% | 88% |
| casa+ | 35,7% | 56,1% | 8,2% | 0% | 91,8% |
| condominio | 37,3% | 53,1% | 9,5% | 0% | 90,5% |
| condominio+ | 33,7% | 57,3% | 9% | 0% | 91% |
| diego | 28,6% | 58,1% | 13,3% | 0% | 86,7% |
| elasticos | 28,4% | 57,7% | 13,9% | 0% | 86,1% |
| halteres | 36,4% | 53,9% | 9,7% | 0% | 90,3% |
| halteres-banco | 37,2% | 51,8% | 10,9% | 0% | 89,1% |
| halteres+bola | 36% | 54% | 10% | 0% | 90% |
| so:abdominal_maquina | 0% | 92,6% | 7,4% | 0% | 92,6% |
| so:anilhas_e_manoplas | 36,4% | 53,9% | 9,7% | 0% | 90,3% |
| so:banco_romano | 0% | 90,9% | 9,1% | 0% | 90,9% |
| so:barra_fixa | 0% | 91,6% | 8,4% | 0% | 91,6% |
| so:barra_hexagonal | 0% | 92,7% | 7,3% | 0% | 92,7% |
| so:barra_longa | 0% | 91,7% | 8,3% | 0% | 91,7% |
| so:barra_w | 0% | 90,7% | 9,3% | 0% | 90,7% |
| so:bola_suica | 0% | 92,1% | 7,9% | 0% | 92,1% |
| so:cadeira_abdutora_adutora | 0% | 92,8% | 7,2% | 0% | 92,8% |
| so:cadeira_extensora | 0% | 92,7% | 7,3% | 0% | 92,7% |
| so:cadeira_flexora | 0% | 91,8% | 8,2% | 0% | 91,8% |
| so:caneleiras | 0% | 89,9% | 10,1% | 0% | 89,9% |
| so:desenvolvimento_maquina | 0% | 91,9% | 8,1% | 0% | 91,9% |
| so:estacao_polia_dupla | 0% | 86,7% | 13,3% | 0% | 86,7% |
| so:estacao_puxada | 0% | 91,2% | 8,8% | 0% | 91,2% |
| so:estacao_remada | 0% | 91,3% | 8,7% | 0% | 91,3% |
| so:gluteo_maquina | 0% | 92,6% | 7,4% | 0% | 92,6% |
| so:graviton | 0% | 91% | 9% | 0% | 91% |
| so:hack | 0% | 91,9% | 8,1% | 0% | 91,9% |
| so:halteres_fixos | 36,2% | 54,1% | 9,7% | 0% | 90,3% |
| so:kettlebell | 0% | 90% | 10% | 0% | 90% |
| so:leg_press | 0% | 92,6% | 7,4% | 0% | 92,6% |
| so:mesa_flexora | 0% | 91,8% | 8,2% | 0% | 91,8% |
| so:mini_band | 0% | 92,5% | 7,5% | 0% | 92,5% |
| so:multifuncional | 0% | 91,8% | 8,2% | 0% | 91,8% |
| so:panturrilha_em_pe_maquina | 0% | 92,6% | 7,4% | 0% | 92,6% |
| so:panturrilha_sentada_maquina | 0% | 91,9% | 8,1% | 0% | 91,9% |
| so:paralelas | 0% | 91,9% | 8,1% | 0% | 91,9% |
| so:rack_de_agachamento | 0% | 91,3% | 8,7% | 0% | 91,3% |
| so:remada_articulada | 0% | 91,5% | 8,5% | 0% | 91,5% |
| so:roda_abdominal | 0% | 91,9% | 8,1% | 0% | 91,9% |
| so:rosca_maquina | 0% | 91,2% | 8,8% | 0% | 91,2% |
| so:smith | 0% | 91,2% | 8,8% | 0% | 91,2% |
| so:step | 0% | 92,2% | 7,8% | 0% | 92,2% |
| so:supino_maquina | 0% | 91,8% | 8,2% | 0% | 91,8% |
| so:suspensao | 0% | 90,9% | 9,1% | 0% | 90,9% |
| so:triceps_maquina | 0% | 91,9% | 8,1% | 0% | 91,9% |
| so:voador | 0% | 92,8% | 7,2% | 0% | 92,8% |
| step+elasticos | 28,4% | 57,5% | 14,1% | 0% | 85,9% |
| suspensao+elasticos | 28,4% | 57,8% | 13,9% | 0% | 86,1% |
| vazio | 0% | 91,9% | 8,1% | 0% | 91,9% |

## Avisos

% dos programas com cada aviso (uma vez por programa, mesmo que repetido).

| regra | programas | % |
| --- | ---: | ---: |
| `equipamento.escada-carga-leve` | 762.450 | 83,6% |
| `selecao.isolador-obrigatorio` | 679.575 | 74,5% |
| `volume.semanal.alvo` | 616.615 | 67,6% |
| `equipamento.sem-ancoragem` | 419.900 | 46,1% |
| `seguranca.dor.programa` | 375.375 | 41,2% |
| `tempo.sobra` | 336.335 | 36,9% |
| `tempo.corte` | 335.804 | 36,8% |
| `selecao.dia-sem-principal` | 243.638 | 26,7% |
| `equipamento.sem-puxada-vertical` | 242.125 | 26,6% |
| `selecao.alongado` | 153.000 | 16,8% |
| `volume.prioridade.competicao` | 147.647 | 16,2% |

## Piores casos

Os 10 piores cenários de cada medida, um caso por cenário (menor valor primeiro; empate pela ordem da grade). A linha de reprodução usa `CEN_55` de `scripts/auditoria/cenarios-55.ts`.

### menor-uso-dos-minutos

- **so:barra_fixa · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 23 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar A (21 min): barra-fixa-negativa 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, elevacao-joelhos 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar B (21 min): barra-fixa-negativa 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:barra_fixa'].inventario)`
- **so:rack_de_agachamento · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 23 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar A (22 min): remada-invertida 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar B (22 min): remada-invertida 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:rack_de_agachamento'].inventario)`
- **so:smith · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 23 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar A (22 min): remada-invertida 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar B (22 min): remada-invertida 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:smith'].inventario)`
- **so:estacao_puxada · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 23 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar A (22 min): puxada-frente 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar B (22 min): puxada-frente 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:estacao_puxada'].inventario)`
- **so:estacao_remada · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 23 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar A (22 min): remada-baixa-estacao 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar B (22 min): remada-baixa-estacao 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:estacao_remada'].inventario)`
- **so:multifuncional · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 23 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar A (22 min): puxada-frente 2, remada-baixa-estacao 2, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar B (22 min): remada-baixa-estacao 2, puxada-frente 2, abertura-t-deitado 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:multifuncional'].inventario)`
- **so:remada_articulada · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 23 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar A (22 min): remada-articulada 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar B (22 min): remada-articulada 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:remada_articulada'].inventario)`
- **so:graviton · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 23 de 90 min.
  - Programa: Empurrar A (23 min): mergulho-graviton 2, pike 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar A (22 min): barra-fixa-graviton 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao-fechada 2, flexao 2, extensao-triceps-peso-corpo 2 | Puxar B (22 min): barra-fixa-graviton 4, abertura-t-deitado 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:graviton'].inventario)`
- **so:suspensao · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 24 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, triceps-suspensao 2 | Puxar A (24 min): remada-suspensao 3, rosca-suspensao 2, yt-suspensao 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 2, flexao-joelho-suspensao 2, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, triceps-suspensao 2 | Puxar B (21 min): remada-suspensao 2, face-pull-suspensao 2, rosca-suspensao 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 2, panturrilha-degrau 4, flexao-joelho-suspensao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:suspensao'].inventario)`
- **so:kettlebell · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 27 de 90 min.
  - Programa: Empurrar A (25 min): flexao 2, desenvolvimento-unilateral-kettlebell 2, flexao-fechada 2, triceps-frances-kettlebell 2 | Puxar A (27 min): remada-unilateral-kettlebell 3, rosca-kettlebell 2, abertura-t-deitado 2, abdominal-chao 2 | Pernas A (22 min): flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, triceps-frances-kettlebell 2 | Puxar B (27 min): remada-unilateral-kettlebell 3, abertura-t-deitado 2, rosca-kettlebell 2, abdominal-chao 2 | Pernas B (17 min): flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:kettlebell'].inventario)`

### menor-uso-dos-minutos-sem-dor-nem-evitado

- **so:barra_fixa · iniciante · 5 dias · 90 min · prioridade peito · sem dor**: 33 de 90 min.
  - Programa: Superior (33 min): flexao 4, barra-fixa-negativa 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (33 min): agachamento-peso-corpo 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (22 min): flexao 3, flexao-fechada 3, extensao-triceps-peso-corpo 2 | Puxar (21 min): barra-fixa-negativa 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_fixa'].inventario)`
- **so:rack_de_agachamento · iniciante · 5 dias · 90 min · prioridade costas · sem dor**: 33 de 90 min.
  - Programa: Superior (29 min): remada-invertida 4, flexao 2, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (33 min): agachamento-peso-corpo 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (23 min): remada-invertida 2, flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-invertida 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["costas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:rack_de_agachamento'].inventario)`
- **so:smith · iniciante · 5 dias · 90 min · prioridade costas · sem dor**: 33 de 90 min.
  - Programa: Superior (29 min): remada-invertida 4, flexao 2, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (33 min): agachamento-smith 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (23 min): remada-invertida 2, flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-invertida 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["costas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:smith'].inventario)`
- **so:estacao_puxada · iniciante · 5 dias · 90 min · prioridade costas · sem dor**: 33 de 90 min.
  - Programa: Superior (28 min): puxada-frente 4, flexao 2, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (33 min): agachamento-peso-corpo 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (23 min): puxada-frente 2, flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): puxada-frente 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["costas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:estacao_puxada'].inventario)`
- **so:estacao_remada · iniciante · 5 dias · 90 min · prioridade costas · sem dor**: 33 de 90 min.
  - Programa: Superior (28 min): remada-baixa-estacao 4, flexao 2, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (33 min): agachamento-peso-corpo 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (23 min): remada-baixa-estacao 2, flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-baixa-estacao 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["costas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:estacao_remada'].inventario)`
- **so:multifuncional · iniciante · 5 dias · 90 min · prioridade peito · sem dor**: 33 de 90 min.
  - Programa: Superior (33 min): flexao 4, puxada-frente 2, remada-baixa-estacao 2, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (33 min): agachamento-peso-corpo 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (22 min): flexao 3, flexao-fechada 3, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-baixa-estacao 2, puxada-frente 2, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:multifuncional'].inventario)`
- **so:remada_articulada · iniciante · 5 dias · 90 min · prioridade costas · sem dor**: 33 de 90 min.
  - Programa: Superior (28 min): remada-articulada 4, flexao 2, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (33 min): agachamento-peso-corpo 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (23 min): remada-articulada 2, flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-articulada 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["costas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:remada_articulada'].inventario)`
- **so:graviton · iniciante · 5 dias · 90 min · prioridade costas · sem dor**: 33 de 90 min.
  - Programa: Superior (28 min): barra-fixa-graviton 4, mergulho-graviton 2, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (33 min): agachamento-peso-corpo 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (23 min): barra-fixa-graviton 2, flexao-fechada 2, flexao 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): barra-fixa-graviton 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-degrau 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["costas"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:graviton'].inventario)`
- **so:suspensao · iniciante · 5 dias · 90 min · prioridade peito · sem dor**: 36 de 90 min.
  - Programa: Superior (36 min): flexao 4, remada-suspensao 3, triceps-suspensao 2, rosca-suspensao 2, yt-suspensao 2 | Inferior (36 min): agachamento-peso-corpo 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 2, flexao-joelho-suspensao 2, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (22 min): flexao 3, flexao-fechada 3, triceps-suspensao 2 | Puxar (21 min): remada-suspensao 2, face-pull-suspensao 2, rosca-suspensao 2, abdominal-invertido 2 | Pernas (32 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2, panturrilha-degrau 3, flexao-joelho-suspensao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:suspensao'].inventario)`
- **halteres · iniciante · 6 dias · 90 min · prioridade peito · sem dor**: 37 de 90 min.
  - Programa: Empurrar A (37 min): flexao 4, desenvolvimento-unilateral 2, triceps-frances-halter 2, elevacao-halteres 3, triceps-testa-halteres 2 | Puxar A (27 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, rosca-alternada 2, crucifixo-invertido-sentado 2, abdominal-chao 2 | Pernas A (37 min): goblet 2, stiff 2, afundo-tras 2, flexao-joelho-deslizante 2, panturrilha-degrau 3, abdominal-invertido 2 | Empurrar B (33 min): flexao 3, supino-chao-halteres 3, elevacao-halteres 2, triceps-frances-unilateral-halter 2, triceps-testa-halteres 2 | Puxar B (27 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, crucifixo-invertido-sentado 2, rosca-martelo 2, abdominal-chao 2 | Pernas B (35 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, panturrilha-degrau 3, flexao-joelho-deslizante 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['halteres'].inventario)`

### menos-exercicios-com-45min-ou-mais

- **casa · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (6 min): triceps-elastico-alto 3 | Puxar (10 min): rosca-martelo 3, abdominal-invertido 2 | Pernas (43 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, panturrilha-degrau 3, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior (39 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 3, abdominal-bola 2 | Empurrar (6 min): triceps-elastico-alto 3 | Puxar (12 min): rosca-scott-banco-inclinado 3, abdominal-chao 2 | Pernas (40 min): afundo 2, stiff-kettlebell 2, ponte-gluteo-halter 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 3, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (7 min): rosca-scott-banco-inclinado 3 | Inferior A (45 min): bulgaro 3, stiff 2, goblet 3, flexao-bola 2, panturrilha-degrau 4, abdominal-bola 2 | Superior B (7 min): rosca-scott-banco-inclinado 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, panturrilha-degrau 4, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`
- **condominio+ · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior (38 min): bulgaro 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha 3, abdominal-bola 2 | Empurrar (6 min): triceps-elastico-alto 3 | Puxar (12 min): rosca-scott-banco-inclinado 3, abdominal-chao 2 | Pernas (39 min): afundo 2, stiff-unilateral 2, hip-thrust 2, cadeira-extensora 2, panturrilha-bilateral-step 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio+'].inventario)`
- **academia · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (12 min): rosca-maquina 3, triceps-barra-reta 3 | Inferior (34 min): agachamento-smith 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha-em-pe-maquina 3, abdominal-maquina 2 | Empurrar (5 min): triceps-corda 3 | Puxar (9 min): rosca-scott 3, abdominal-maquina 2 | Pernas (38 min): afundo 2, stiff-unilateral 2, coice-maquina 2, cadeira-extensora 2, panturrilha-leg-press 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['academia'].inventario)`
- **academia+ · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (12 min): rosca-maquina 3, triceps-barra-reta 3 | Inferior (34 min): agachamento-smith 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha-em-pe-maquina 3, abdominal-maquina 2 | Empurrar (5 min): triceps-corda 3 | Puxar (9 min): rosca-scott 3, abdominal-maquina 2 | Pernas (37 min): afundo 2, stiff-kettlebell 2, coice-maquina 2, cadeira-extensora 2, panturrilha-leg-press 3, cadeira-flexora 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['academia+'].inventario)`
- **elasticos · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (13 min): rosca-elastico 3, triceps-elastico-alto 3 | Inferior (39 min): agachamento-elastico 2, stiff-elastico 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (6 min): triceps-elastico-alto 3 | Puxar (11 min): rosca-martelo-elastico 3, abdominal-invertido 2 | Pernas (42 min): afundo-peso-corpo 2, stiff-elastico 2, ponte-gluteo 2, extensao-joelho-elastico 2, panturrilha-degrau 3, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['elasticos'].inventario)`
- **halteres · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (7 min): rosca-alternada 4 | Inferior A (45 min): goblet 4, stiff 2, afundo-tras 2, flexao-joelho-deslizante 2, panturrilha-degrau 4, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-deslizante 2, panturrilha-degrau 4, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['halteres'].inventario)`
- **halteres-banco · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (45 min): bulgaro 3, stiff 2, goblet 3, flexao-joelho-deslizante 2, panturrilha-degrau 4, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-deslizante 2, panturrilha-degrau 4, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['halteres-banco'].inventario)`
- **diego · iniciante · 5 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior (13 min): rosca-elastico 3, triceps-elastico-alto 3 | Inferior (39 min): agachamento-elastico 2, stiff-elastico 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 2 | Empurrar (6 min): triceps-elastico-alto 3 | Puxar (11 min): rosca-martelo-elastico 3, abdominal-invertido 2 | Pernas (42 min): afundo-peso-corpo 2, stiff-elastico 2, ponte-gluteo 2, extensao-joelho-elastico 2, panturrilha-degrau 3, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['diego'].inventario)`

### menos-exercicios-com-45min-ou-mais-sem-dor-nem-evitado

- **so:barra_fixa · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (33 min): flexao 4, barra-fixa-negativa 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (44 min): agachamento-peso-corpo 4, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (21 min): barra-fixa-negativa 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_fixa'].inventario)`
- **so:barra_longa · intermediario · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (38 min): flexao 4, remada-barra 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 4 | Inferior (45 min): agachamento-peso-corpo 3, terra-romeno-barra 2, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (27 min): flexao-pes-elevados 4, flexao-fechada 4, extensao-triceps-peso-corpo 2 | Puxar (26 min): remada-barra 4, abertura-t-deitado 4, abdominal-invertido 2 | Pernas (44 min): afundo-peso-corpo 4, terra-romeno-barra 2, ponte-gluteo 2, panturrilha-degrau 4, nordico 2
  - Reproduzir: `gerarPrograma({"nivel":"intermediario","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_longa'].inventario)`
- **so:rack_de_agachamento · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (34 min): flexao 4, remada-invertida 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (44 min): agachamento-peso-corpo 4, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-invertida 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:rack_de_agachamento'].inventario)`
- **so:smith · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (34 min): flexao 4, remada-invertida 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (43 min): agachamento-smith 4, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-invertida 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:smith'].inventario)`
- **so:kettlebell · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (45 min): flexao 4, remada-unilateral-kettlebell 4, triceps-frances-kettlebell 2, rosca-kettlebell 2, abertura-t-deitado 3 | Inferior (45 min): goblet-kettlebell 4, stiff-kettlebell 2, afundo-kettlebell 2, flexao-joelho-deslizante 2, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, triceps-frances-kettlebell 2 | Puxar (27 min): remada-unilateral-kettlebell 3, abertura-t-deitado 2, rosca-kettlebell 2, abdominal-invertido 2 | Pernas (38 min): afundo-kettlebell 2, stiff-unilateral-kettlebell 2, ponte-kettlebell 2, panturrilha-degrau 4, flexao-joelho-deslizante 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:kettlebell'].inventario)`
- **so:estacao_puxada · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (34 min): flexao 4, puxada-frente 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (44 min): agachamento-peso-corpo 4, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): puxada-frente 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:estacao_puxada'].inventario)`
- **so:estacao_remada · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (34 min): flexao 4, remada-baixa-estacao 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (44 min): agachamento-peso-corpo 4, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-baixa-estacao 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:estacao_remada'].inventario)`
- **so:multifuncional · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (33 min): flexao 4, puxada-frente 2, remada-baixa-estacao 2, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (44 min): agachamento-peso-corpo 4, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-baixa-estacao 2, puxada-frente 2, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:multifuncional'].inventario)`
- **so:remada_articulada · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (34 min): flexao 4, remada-articulada 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (44 min): agachamento-peso-corpo 4, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): remada-articulada 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:remada_articulada'].inventario)`
- **so:graviton · iniciante · 5 dias · 45 min · prioridade nenhuma · sem dor**: dia com 3 exercícios em 45 min.
  - Programa: Superior (28 min): mergulho-graviton 2, barra-fixa-graviton 4, extensao-triceps-peso-corpo 2, abertura-t-deitado 2 | Inferior (44 min): agachamento-peso-corpo 4, afundo-tras-peso-corpo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4, abdominal-chao 2 | Empurrar (17 min): flexao-fechada 2, flexao 2, extensao-triceps-peso-corpo 2 | Puxar (22 min): barra-fixa-graviton 4, abertura-t-deitado 2, abdominal-invertido 2 | Pernas (35 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 4, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:graviton'].inventario)`

## Exemplos (até 3 por suspeito, de cenários diferentes, os primeiros da grade)

### `avaliador.ajustar-sem-aviso`

- **elasticos · avancado · 3 dias · 45 min · prioridade peito+bracos · lombar 7**: empurrar-puxar: O ombro está desequilibrado: empurrar 14 × puxar 8 séries por semana (até 1,5 de empurrar para 1 de puxar). → Acrescente remada sentada com elástico (2 séries) no treino Corpo todo C..
  - Programa: Corpo todo A (43 min): flexao 3, agachamento-elastico 2, puxada-elastico 2, triceps-elastico-acima 4, crucifixo-elastico 3, flexao-joelho-elastico 2 | Corpo todo B (45 min): flexao-pes-elevados 2, remada-elastico 2, rosca-elastico 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, panturrilha-degrau 4 | Corpo todo C (38 min): flexao 2, flexao-fechada 4, afundo-peso-corpo 2, puxada-elastico 4, ponte-gluteo 2
  - Reproduzir: `gerarPrograma({"nivel":"avancado","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":["peito","bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"lombar","nota":7}]}}, CEN_55['elasticos'].inventario)`
- **diego · avancado · 3 dias · 45 min · prioridade peito+bracos · lombar 7**: empurrar-puxar: O ombro está desequilibrado: empurrar 14 × puxar 8 séries por semana (até 1,5 de empurrar para 1 de puxar). → Acrescente barra fixa (2 séries) no treino Corpo todo C..
  - Programa: Corpo todo A (45 min): flexao 3, agachamento-elastico 2, barra-fixa 2, triceps-elastico-acima 4, crucifixo-elastico 3, flexao-joelho-elastico 3 | Corpo todo B (45 min): flexao-pes-elevados 2, remada-elastico 2, rosca-elastico 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, panturrilha-degrau 4 | Corpo todo C (37 min): flexao 2, flexao-fechada 4, afundo-peso-corpo 2, barra-fixa-supinada 4, ponte-gluteo 2
  - Reproduzir: `gerarPrograma({"nivel":"avancado","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":["peito","bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"lombar","nota":7}]}}, CEN_55['diego'].inventario)`
- **bairro · avancado · 4 dias · 45 min · prioridade abdomen · joelho 7**: funcoes: Um movimento só para o músculo: glúteos só com extensão de quadril. → Troque stiff unilateral com halter por abdução de quadril deitado de lado, sem carga no treino Inferior B. Movimentos diferentes crescem partes diferentes do músculo..
  - Programa: Superior A (42 min): supino-reto 3, barra-fixa 2, remada-apoiada 2, triceps-frances-halter 3, crucifixo-inverso 2, abdominal-chao 4 | Inferior A (45 min): stiff 2, stiff-unilateral 2, ponte-gluteo-halter 2, panturrilha-leg-press 3, aducao-deitado 2, abdominal-invertido 4 | Superior B (40 min): supino-inclinado 3, remada-curvada-halteres 2, barra-fixa-supinada 2, elevacao-halteres 3, crucifixo-invertido-curvado 2, elevacao-joelhos 3 | Inferior B (44 min): ponte-gluteo-halter 2, stiff 2, stiff-unilateral 2, panturrilha-leg-press 3, elevacao-lateral-deitado 3, elevacao-joelhos-paralelas 3
  - Reproduzir: `gerarPrograma({"nivel":"avancado","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":["abdomen"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"joelho","nota":7}]}}, CEN_55['bairro'].inventario)`

### `dia.poucos-exercicios`

- **casa · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: Superior A com 2 exercícios em 45 min (cabem ~6).
  - Programa: Superior A (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior A (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 2 | Superior B (12 min): rosca-martelo 3, triceps-elastico-alto 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: Superior A com 2 exercícios em 45 min (cabem ~6).
  - Programa: Superior A (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior A (39 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 3, abdominal-bola 2 | Superior B (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior B (38 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade pernas+gluteos+abdomen · ombro 7**: Corpo todo A com 4 exercícios em 45 min (cabem ~6).
  - Programa: Corpo todo A (40 min): bulgaro 4, ponte-gluteo-halter 2, flexao-bola 4, abdominal-bola 4 | Corpo todo B (40 min): stiff 3, panturrilha-degrau 4, abducao-deitado 2, panturrilha-sentada-halter 2+drop, rosca-scott-banco-inclinado 2 | Corpo todo C (42 min): afundo 4, ponte-gluteo-halter 2, panturrilha-degrau 3, rosca-scott-banco-inclinado 2, abdominal-invertido 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":["pernas","gluteos","abdomen"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `monotonia.todos-os-dias`

- **casa · iniciante · 3 dias · 30 min · prioridade nenhuma · punho 7**: supino-chao-halteres em todos os 3 dias.
  - Programa: Corpo todo A (29 min): goblet 3, supino-chao-halteres 2, remada-curvada-halteres 2, abdominal-chao 2 | Corpo todo B (30 min): stiff 3, supino-chao-halteres 2, remada-unilateral-sem-banco 2, panturrilha-degrau 2 | Corpo todo C (28 min): afundo 3, supino-chao-halteres 2, remada-curvada-halteres 2, ponte-gluteo-halter 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"punho","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 60 min · prioridade nenhuma · ombro 7**: rosca-scott-banco-inclinado em todos os 3 dias.
  - Programa: Corpo todo A (39 min): bulgaro 2, flexao-bola 2, rosca-scott-banco-inclinado 2, triceps-elastico-alto 3, abducao-caneleira 2, abdominal-bola 2 | Corpo todo B (47 min): stiff 2, ponte-kettlebell 2, extensao-joelho-caneleira 2, rosca-scott-banco-inclinado 2, panturrilha 3, aducao-caneleira 2, abdominal-chao 2 | Corpo todo C (46 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-bilateral-step 3, rosca-scott-banco-inclinado 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":60,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter, rosca-scott-banco-inclinado em todos os 3 dias.
  - Programa: Corpo todo A (31 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-scott-banco-inclinado 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo C (41 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-chao 3, rosca-scott-banco-inclinado 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `monotonia.todos-os-dias-com-opcao`

- **casa · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (38 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-martelo 3, triceps-elastico-alto 3, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 3, abdominal-invertido 2 | Corpo todo C (43 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 60 min · prioridade nenhuma · quadril 7**: extensao-joelho-caneleira em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (44 min): supino-reto 2, barra-fixa-negativa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, extensao-joelho-caneleira 2, abdominal-bola 2 | Corpo todo B (52 min): supino-inclinado 2, remada-apoiada 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 3, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (47 min): supino-reto 2, barra-fixa-negativa 2, elevacao-halteres 3, triceps-suspensao 2, flexao-bola 2, panturrilha-bilateral-step 3, extensao-joelho-caneleira 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":60,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (31 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-scott-banco-inclinado 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo C (41 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-chao 3, rosca-scott-banco-inclinado 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `prioridade.abaixo-com-tempo`

- **casa · avancado · 2 dias · 90 min · prioridade peito · sem dor**: peito (prioridade) com 12 de 14 séries e o dia mais longo em 76 de 90 min.
  - Programa: Corpo todo A (76 min): flexao 4, goblet 2, remada-curvada-halteres 3, stiff 3, crucifixo-elastico 4, triceps-frances-halter 2, elevacao-halteres 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (74 min): flexao-pes-elevados 4, afundo 2, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-curvado 3, elevacao-halteres 3, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"avancado","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · avancado · 2 dias · 90 min · prioridade peito · sem dor · evita bulgaro**: peito (prioridade) com 12 de 14 séries e o dia mais longo em 76 de 90 min.
  - Programa: Corpo todo A (76 min): supino-reto 4, goblet 2, barra-fixa 3, stiff 3, crucifixo-halteres 4, triceps-frances-halter 2, elevacao-halteres 3, panturrilha 4, abdominal-bola 2 | Corpo todo B (69 min): supino-inclinado 4, afundo 2, remada-apoiada 3, flexao-bola 3, extensao-joelho-caneleira 2, rosca-inclinada 3, crucifixo-inverso 3, elevacao-halteres 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"avancado","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":["bulgaro"],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio · avancado · 2 dias · 90 min · prioridade peito · sem dor**: peito (prioridade) com 12 de 14 séries e o dia mais longo em 76 de 90 min.
  - Programa: Corpo todo A (76 min): supino-reto 4, bulgaro 2, puxada-frente 3, stiff 3, crucifixo-halteres 4, triceps-frances-halter 2, elevacao-halteres 3, panturrilha-degrau 4, abdominal-bola 2 | Corpo todo B (68 min): supino-inclinado 4, afundo 2, remada-apoiada 3, goblet 2, flexao-bola 3, rosca-inclinada 3, crucifixo-inverso 3, elevacao-halteres 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"avancado","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio'].inventario)`

### `regua.A2`

- **casa · iniciante · 4 dias · 30 min · prioridade nenhuma · ombro 7**: dia com menos de 3 exercícios ou sem multiarticular: Superior A com 2 exercícios.
  - Programa: Superior A (12 min): rosca-alternada 3, triceps-elastico-alto 3 | Inferior A (28 min): goblet 2, stiff 2, panturrilha-degrau 2, abdominal-chao 4 | Superior B (12 min): rosca-martelo 3, triceps-elastico-alto 3 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 4 dias · 30 min · prioridade nenhuma · ombro 7**: dia com menos de 3 exercícios ou sem multiarticular: Superior A com 2 exercícios.
  - Programa: Superior A (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior A (31 min): bulgaro 2, stiff 2, panturrilha 2, abdominal-bola 4 | Superior B (14 min): rosca-scott-banco-inclinado 3, triceps-elastico-alto 3 | Inferior B (26 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 4 dias · 30 min · prioridade nenhuma · ombro 7**: dia com menos de 3 exercícios ou sem multiarticular: Superior A com 1 exercício.
  - Programa: Superior A (7 min): rosca-scott-banco-inclinado 3 | Inferior A (28 min): bulgaro 3, stiff 2, abdominal-bola 4 | Superior B (7 min): rosca-scott-banco-inclinado 3 | Inferior B (29 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-degrau 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `regua.A3`

- **casa · iniciante · 2 dias · 30 min · prioridade nenhuma · sem dor**: dia mais longo acima de 110% dos minutos: dia de 36 min em 30.
  - Programa: Corpo todo A (36 min): goblet 3, flexao 2, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (31 min): afundo 3, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 30 min · prioridade nenhuma · sem dor**: dia mais longo acima de 110% dos minutos: dia de 34 min em 30.
  - Programa: Corpo todo A (34 min): bulgaro 2, supino-reto 2, barra-fixa-negativa 2, stiff 2, panturrilha 2, abdominal-bola 2 | Corpo todo B (28 min): afundo 3, supino-inclinado 3, remada-apoiada 2, flexao-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 30 min · prioridade nenhuma · sem dor · evita supino-reto**: dia mais longo acima de 110% dos minutos: dia de 34 min em 30.
  - Programa: Corpo todo A (34 min): bulgaro 2, flexao 2, puxada-frente 2, stiff 2, panturrilha-degrau 2, abdominal-bola 2 | Corpo todo B (28 min): afundo 3, supino-inclinado 3, remada-apoiada 2, flexao-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":["supino-reto"],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio'].inventario)`

### `regua.A4`

- **casa · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: dia típico abaixo de 70% dos minutos, sem o aviso: dia típico de 55 min em 90, sem o aviso.
  - Programa: Corpo todo A (49 min): goblet 2, flexao 2, remada-curvada-halteres 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (59 min): stiff 2, flexao 2, remada-unilateral-sem-banco 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-invertido 2 | Corpo todo C (55 min): afundo 2, supino-chao-halteres 2, remada-curvada-halteres 2, ponte-gluteo-halter 3, elevacao-halteres 3, triceps-testa-halteres 2, flexao-joelho-elastico 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 75 min · prioridade nenhuma · sem dor**: dia típico abaixo de 70% dos minutos, sem o aviso: dia típico de 51 min em 75, sem o aviso.
  - Programa: Corpo todo A (48 min): bulgaro 2, supino-reto 2, barra-fixa-negativa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (58 min): stiff 2, supino-inclinado 2, remada-apoiada 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (51 min): afundo 2, supino-reto 2, barra-fixa-negativa 2, ponte-gluteo-halter 2, elevacao-halteres 3, triceps-suspensao 2, flexao-joelho-elastico 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":75,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio+ · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: dia típico abaixo de 70% dos minutos, sem o aviso: dia típico de 54 min em 90, sem o aviso.
  - Programa: Corpo todo A (49 min): bulgaro 2, supino-reto 2, puxada-frente 2, cadeira-flexora 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (57 min): stiff 2, supino-inclinado 2, remada-apoiada 2, cadeira-extensora 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (54 min): afundo 2, supino-maquina 2, puxada-frente 2, hip-thrust 3, elevacao-halteres 3, triceps-testa-halteres 2, cadeira-flexora 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio+'].inventario)`

### `regua.B1`

- **casa · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: o mesmo exercício em todos os dias havendo outro do mesmo nível: ponte-gluteo-halter em todos os dias, com outro do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (38 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-martelo 3, triceps-elastico-alto 3, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 3, abdominal-invertido 2 | Corpo todo C (43 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 60 min · prioridade nenhuma · quadril 7**: o mesmo exercício em todos os dias havendo outro do mesmo nível: extensao-joelho-caneleira em todos os dias, com outro do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (44 min): supino-reto 2, barra-fixa-negativa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, extensao-joelho-caneleira 2, abdominal-bola 2 | Corpo todo B (52 min): supino-inclinado 2, remada-apoiada 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 3, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (47 min): supino-reto 2, barra-fixa-negativa 2, elevacao-halteres 3, triceps-suspensao 2, flexao-bola 2, panturrilha-bilateral-step 3, extensao-joelho-caneleira 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":60,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: o mesmo exercício em todos os dias havendo outro do mesmo nível: ponte-gluteo-halter em todos os dias, com outro do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (31 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-scott-banco-inclinado 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo C (41 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-chao 3, rosca-scott-banco-inclinado 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `regua.C1`

- **casa · iniciante · 2 dias · 90 min · prioridade peito · cotovelo 7**: prioritário abaixo da meta com tempo e exercício: peito com 8 de 10 e o dia mais longo em 73 de 90 min.
  - Programa: Corpo todo A (48 min): goblet 2, stiff 3, crucifixo-elastico 4, elevacao-halteres 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (73 min): afundo 2, ponte-gluteo-halter 3, crucifixo-elastico 4, flexao-joelho-elastico 3, extensao-joelho-elastico 2, crucifixo-invertido-sentado 4, elevacao-halteres 3, aducao-deitado 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"cotovelo","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 75 min · prioridade bracos · ombro 7**: prioritário abaixo da meta com tempo e exercício: triceps com 8 de 10 e o dia mais longo em 62 de 75 min.
  - Programa: Corpo todo A (60 min): bulgaro 2, stiff 3, rosca-scott-banco-inclinado 4, rosca-alternada 2, triceps-elastico-alto 4, panturrilha 4, abdominal-bola 2 | Corpo todo B (62 min): afundo 2, rosca-scott-banco-inclinado 4, triceps-elastico-alto 4, flexao-bola 3, extensao-joelho-caneleira 2, abducao-caneleira 2, aducao-caneleira 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":75,"prioridades":["bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 90 min · prioridade peito · cotovelo 7**: prioritário abaixo da meta com tempo e exercício: peito com 8 de 10 e o dia mais longo em 67 de 90 min.
  - Programa: Corpo todo A (49 min): bulgaro 2, stiff 3, crucifixo-halteres 4, elevacao-halteres 3, panturrilha-degrau 4, abdominal-bola 2 | Corpo todo B (67 min): afundo 2, goblet 2, ponte-gluteo-halter 2, crucifixo-inclinado-halteres 4, flexao-bola 3, crucifixo-inverso 4, elevacao-halteres 3, aducao-deitado 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"cotovelo","nota":7}]}}, CEN_55['condominio'].inventario)`

### `regua.D1`

- **casa · iniciante · 2 dias · 30 min · prioridade peito · sem dor**: empurrar ÷ puxar acima de 1,5 havendo como puxar: empurrar 8 ÷ puxar 4 séries.
  - Programa: Corpo todo A (40 min): flexao 4, goblet 3, remada-curvada-halteres 2, stiff 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (35 min): flexao 4, afundo 3, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 30 min · prioridade peito · sem dor**: empurrar ÷ puxar acima de 1,5 havendo como puxar: empurrar 8 ÷ puxar 4 séries.
  - Programa: Corpo todo A (42 min): supino-reto 4, bulgaro 2, barra-fixa-negativa 2, stiff 2, panturrilha 2, abdominal-bola 2 | Corpo todo B (32 min): supino-inclinado 4, afundo 2, remada-apoiada 2, flexao-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 30 min · prioridade peito · sem dor**: empurrar ÷ puxar acima de 1,5 havendo como puxar: empurrar 8 ÷ puxar 4 séries.
  - Programa: Corpo todo A (42 min): supino-reto 4, bulgaro 2, puxada-frente 2, stiff 2, panturrilha-degrau 2, abdominal-bola 2 | Corpo todo B (32 min): supino-inclinado 4, afundo 2, remada-apoiada 2, flexao-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio'].inventario)`

### `regua.D3`

- **casa · iniciante · 2 dias · 30 min · prioridade nenhuma · quadril 7**: quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto): quadríceps 0 ÷ posteriores 3.
  - Programa: Corpo todo A (27 min): flexao 2, remada-curvada-halteres 2, elevacao-halteres 3+drop, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (26 min): flexao 3, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, rosca-alternada 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 30 min · prioridade nenhuma · quadril 7**: quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto): quadríceps 0 ÷ posteriores 3.
  - Programa: Corpo todo A (28 min): supino-reto 2, barra-fixa-negativa 2, elevacao-halteres 3+drop, panturrilha 2, abdominal-bola 2 | Corpo todo B (28 min): supino-inclinado 3, remada-apoiada 3, flexao-joelho-elastico 3, rosca-inclinada 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio+ · iniciante · 2 dias · 30 min · prioridade nenhuma · quadril 7**: quadríceps ÷ posteriores fora de 0,5–2 (ou sem posteriores direto): quadríceps 0 ÷ posteriores 3.
  - Programa: Corpo todo A (29 min): supino-reto 2, puxada-frente 2, elevacao-halteres 3+drop, panturrilha 2, abdominal-bola 2 | Corpo todo B (28 min): supino-inclinado 3, remada-apoiada 3, cadeira-flexora 3, rosca-inclinada 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['condominio+'].inventario)`

### `regua.E1`

- **casa · iniciante · 2 dias · 90 min · prioridade nenhuma · sem dor**: não prioritário com 1 a 3 séries havendo exercício e tempo: gluteos com 3,5 séries e o dia mais longo em 70 de 90 min.
  - Programa: Corpo todo A (70 min): goblet 2, flexao 2, remada-curvada-halteres 3, stiff 3, triceps-frances-halter 4, elevacao-halteres 3, panturrilha-degrau 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (69 min): afundo 2, flexao 2, remada-unilateral-sem-banco 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-sentado 3, elevacao-halteres 3, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 6 dias · 30 min · prioridade nenhuma · quadril 7**: não prioritário com 1 a 3 séries havendo exercício e tempo: abdomen com 2 séries e o dia mais longo em 25 de 30 min.
  - Programa: Empurrar A (25 min): supino-reto 2, desenvolvimento 2, triceps-frances-halter 2, elevacao-halteres 3 | Puxar A (25 min): barra-fixa-negativa 2, remada-apoiada 2, rosca-inclinada 2, crucifixo-inverso 2, abdominal-bola 2 | Pernas A (25 min): flexao-bola 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 3, panturrilha 3 | Empurrar B (21 min): supino-inclinado 2, elevacao-halteres 2, triceps-frances-kettlebell 2, crucifixo-halteres 2 | Puxar B (23 min): remada-unilateral-halter 2, barra-fixa-negativa 2, crucifixo-invertido-sentado 2, rosca-scott-banco-inclinado 2 | Pernas B (24 min): flexao-bola 2, extensao-joelho-caneleira 3, panturrilha-bilateral-step 3, flexao-joelho-elastico 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 6 dias · 30 min · prioridade peito · quadril 7**: não prioritário com 1 a 3 séries havendo exercício e tempo: ombro_lateral com 1 séries e o dia mais longo em 24 de 30 min.
  - Programa: Empurrar A (22 min): supino-reto 2, supino-inclinado 2, desenvolvimento 2, triceps-frances-halter 2 | Puxar A (21 min): puxada-frente 2, remada-apoiada 2, rosca-inclinada 2, abdominal-bola 2 | Pernas A (20 min): flexao-bola 2, flexao-joelho-deslizante 2, panturrilha-degrau 3, abdominal-chao 2 | Empurrar B (22 min): supino-inclinado 2, supino-reto 2, crucifixo-halteres 2, triceps-frances-unilateral-halter 2 | Puxar B (24 min): remada-unilateral-halter 2, puxada-frente 2, crucifixo-inverso 2, rosca-scott-banco-inclinado 2 | Pernas B (15 min): flexao-bola 2, panturrilha-degrau 3, flexao-joelho-deslizante 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":30,"prioridades":["peito"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['condominio'].inventario)`

### `tempo.uso-baixo`

- **casa · iniciante · 2 dias · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 53 de 90 min (59%), com o aviso de sobra.
  - Programa: Corpo todo A (47 min): goblet 2, stiff 3, panturrilha-degrau 4, triceps-elastico-alto 4, rosca-martelo 3, abdominal-chao 2 | Corpo todo B (53 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, aducao-deitado 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 53 de 90 min (59%), com o aviso de sobra.
  - Programa: Corpo todo A (53 min): bulgaro 2, stiff 3, panturrilha 4, triceps-elastico-alto 4, rosca-scott-banco-inclinado 3, abdominal-bola 2 | Corpo todo B (50 min): afundo 2, flexao-bola 3, extensao-joelho-caneleira 2, rosca-scott-banco-inclinado 3, abducao-caneleira 2, aducao-caneleira 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 75 min · prioridade bracos · ombro 7**: o dia mais longo usa 52 de 75 min (69%), com o aviso de sobra.
  - Programa: Corpo todo A (48 min): bulgaro 2, stiff 3, rosca-scott-banco-inclinado 4, rosca-alternada 2, panturrilha-degrau 4, abdominal-bola 2 | Corpo todo B (52 min): afundo 2, goblet 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 4, flexao-bola 3, aducao-deitado 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":75,"prioridades":["bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `tempo.uso-baixo-sem-aviso`

- **casa · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: o dia mais longo usa 59 de 90 min e não há aviso de sobra.
  - Programa: Corpo todo A (49 min): goblet 2, flexao 2, remada-curvada-halteres 2, flexao-joelho-elastico 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (59 min): stiff 2, flexao 2, remada-unilateral-sem-banco 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 4, crucifixo-invertido-sentado 3, abdominal-invertido 2 | Corpo todo C (55 min): afundo 2, supino-chao-halteres 2, remada-curvada-halteres 2, ponte-gluteo-halter 3, elevacao-halteres 3, triceps-testa-halteres 2, flexao-joelho-elastico 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: o dia mais longo usa 58 de 90 min e não há aviso de sobra.
  - Programa: Corpo todo A (48 min): bulgaro 2, supino-reto 2, barra-fixa-negativa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (58 min): stiff 2, supino-inclinado 2, remada-apoiada 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (51 min): afundo 2, supino-reto 2, barra-fixa-negativa 2, ponte-gluteo-halter 2, elevacao-halteres 3, triceps-suspensao 2, flexao-joelho-elastico 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio+ · iniciante · 3 dias · 90 min · prioridade nenhuma · sem dor**: o dia mais longo usa 57 de 90 min e não há aviso de sobra.
  - Programa: Corpo todo A (49 min): bulgaro 2, supino-reto 2, puxada-frente 2, cadeira-flexora 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (57 min): stiff 2, supino-inclinado 2, remada-apoiada 2, cadeira-extensora 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (54 min): afundo 2, supino-maquina 2, puxada-frente 2, hip-thrust 3, elevacao-halteres 3, triceps-testa-halteres 2, cadeira-flexora 2, abdominal-invertido 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio+'].inventario)`

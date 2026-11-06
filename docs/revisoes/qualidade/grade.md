# Estresse de qualidade dos treinos gerados

> Gerado por `npm run auditoria:qualidade` (`scripts/auditoria/qualidade.ts`). Dados fictícios. Não editar à mão.

**911.625 programas** (3.646.500 dias de treino): 55 cenários de equipamento × 3 níveis × 5 números de dias (a divisão recomendada de cada um) × 5 durações (30, 45, 60, 75, 90 min) × 13 prioridades × 15 situações de dor; nos casos sem dor, mais 2 variantes com um exercício evitado (o 1º da vaga de agachar e o 1º da de empurrar horizontal). 0 bloqueados.

## Suspeitos (contagem de ocorrências)

`dia.poucos-exercicios`: dia com menos de 5 exercícios tendo 45 min ou mais. `tempo.uso-baixo`: o dia mais longo usa menos de 70% dos minutos (`tempo.sobra`). `volume.zero-sem-aviso`: músculo grande com 0 série e nenhum aviso o cita. `prioridade.abaixo-com-tempo`: prioritário abaixo da meta com o dia mais longo abaixo de 85% dos minutos, sem dor. `monotonia.todos-os-dias-com-opcao`: o mesmo exercício em todos os dias havendo outro equivalente possível.

| suspeito | ocorrências | % (dos dias ou dos programas) |
| --- | ---: | ---: |
| `dia.poucos-exercicios` | 1.094.032 | 30% dos dias |
| `tempo.uso-baixo` | 340.285 | 37,3% dos programas |
| `monotonia.todos-os-dias` | 271.501 | 29,8% dos programas |
| `prioridade.abaixo-com-tempo` | 64.664 | 7,1% dos programas |
| `tempo.uso-baixo-sem-aviso` | 35.278 | 3,9% dos programas |
| `monotonia.todos-os-dias-com-opcao` | 5.707 | 0,6% dos programas |

## Exercícios por dia

Faixas de exercícios por dia de treino (% dos dias), por duração escolhida. "Cabem" é o alvo de `tempo.exercicios-por-sessao`.

| minutos | cabem | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 4 | 27,9% | 72,1% | 0% | 0% | 4 |
| 45 | 6 | 19,3% | 18,9% | 61,9% | 0% | 5 |
| 60 | 8 | 19,2% | 18,1% | 51,7% | 11% | 5 |
| 75 | 10 | 19,2% | 18,1% | 49,7% | 13% | 5 |
| 90 | 12 | 19,2% | 18,1% | 49,5% | 13,2% | 5 |

O mesmo, só nos programas sem dor e sem exercício evitado:

| minutos | cabem | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 30 | 4 | 25,5% | 74,5% | 0% | 0% | 4 |
| 45 | 6 | 16,5% | 15,5% | 68% | 0% | 5 |
| 60 | 8 | 16,5% | 14,8% | 56% | 12,7% | 5 |
| 75 | 10 | 16,5% | 14,8% | 53,5% | 15,2% | 5 |
| 90 | 12 | 16,5% | 14,8% | 53,3% | 15,4% | 5 |

Por dias por semana (sem dor e sem exercício evitado; % dos dias com ≤ 3 exercícios, por duração):

| dias | 30 min | 45 min | 60 min | 75 min | 90 min |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | 8,4% | 0% | 0% | 0% | 0% |
| 3 | 13% | 0% | 0% | 0% | 0% |
| 4 | 18,6% | 6,8% | 6,8% | 6,8% | 6,8% |
| 5 | 18,2% | 10,4% | 10,4% | 10,4% | 10,4% |
| 6 | 48,1% | 41,8% | 41,8% | 41,8% | 41,8% |

### Por cenário de equipamento, com 45 min ou mais

% dos dias em cada faixa, nos programas sem dor e sem exercício evitado ("limpos"); a coluna "≤ 3 (todos)" conta também os com dor ou exercício evitado. "Uso < 70%" é a fatia dos programas (45 min ou mais, todos) cujo dia mais longo usa menos de 70% dos minutos.

| cenário | grupo | ≤ 3 | 4 | 5 a 7 | ≥ 8 | mediana | ≤ 3 (todos) | uso < 70% |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | atalho | 0% | 0% | 66,2% | 33,8% | 6 | 5,2% | 25,5% |
| academia+ | atalho | 0% | 0% | 66,2% | 33,8% | 6 | 5,2% | 25,5% |
| bairro | persona | 0% | 0% | 66,2% | 33,8% | 6 | 4,4% | 26,6% |
| banco+halteres-leves | par | 0% | 0% | 73,6% | 26,4% | 6 | 6,1% | 25,4% |
| bruno | persona | 0% | 0% | 67,1% | 32,9% | 6 | 5,2% | 19,7% |
| casa | atalho | 0% | 0% | 67,1% | 32,9% | 6 | 4,4% | 20,2% |
| casa+ | atalho | 0% | 0% | 66,9% | 33,1% | 6 | 4,3% | 24% |
| condominio | atalho | 0% | 0% | 72,7% | 27,3% | 6 | 4,9% | 27,4% |
| condominio+ | atalho | 0% | 0% | 66,5% | 33,5% | 6 | 4,3% | 25,8% |
| diego | persona | 0% | 0% | 68% | 32% | 6 | 4,4% | 20,1% |
| elasticos | persona | 0% | 0% | 68,2% | 31,8% | 6 | 4,4% | 19,8% |
| halteres | persona | 0% | 0% | 82,1% | 17,9% | 6 | 6,1% | 28,2% |
| halteres-banco | persona | 0% | 0% | 73,6% | 26,4% | 6 | 6,1% | 25,4% |
| halteres+bola | par | 0% | 0% | 82,1% | 17,9% | 6 | 5,7% | 28% |
| so:abdominal_maquina | item | 20% | 30,2% | 49,4% | 0,4% | 4 | 22% | 59% |
| so:anilhas_e_manoplas | item | 0% | 0% | 82,1% | 17,9% | 6 | 6,1% | 28,2% |
| so:banco_romano | item | 20% | 28,1% | 51,2% | 0,7% | 5 | 21,7% | 56,5% |
| so:barra_fixa | item | 44,2% | 12,5% | 40,8% | 2,5% | 4 | 45,1% | 48,9% |
| so:barra_hexagonal | item | 20% | 30,1% | 49,3% | 0,5% | 4 | 21,2% | 60,5% |
| so:barra_longa | item | 36,2% | 14,9% | 46,9% | 2,1% | 4 | 37% | 51,8% |
| so:barra_w | item | 20% | 11,7% | 65,9% | 2,4% | 5 | 20,8% | 50,7% |
| so:bola_suica | item | 20% | 27,9% | 51,4% | 0,7% | 5 | 21,8% | 57,4% |
| so:cadeira_abdutora_adutora | item | 20% | 30,1% | 49,4% | 0,5% | 4 | 22% | 60,5% |
| so:cadeira_extensora | item | 20% | 11,6% | 64,8% | 3,6% | 5 | 20,7% | 56,5% |
| so:cadeira_flexora | item | 20% | 27,9% | 51,4% | 0,7% | 5 | 21,8% | 54,5% |
| so:caneleiras | item | 20% | 11,6% | 64,8% | 3,6% | 5 | 20,7% | 55,6% |
| so:desenvolvimento_maquina | item | 20% | 30,2% | 49,4% | 0,4% | 4 | 22,3% | 57,6% |
| so:estacao_polia_dupla | item | 0% | 6,2% | 69,5% | 24,4% | 6 | 4,2% | 19,5% |
| so:estacao_puxada | item | 44,2% | 12,5% | 40,8% | 2,5% | 4 | 45,1% | 47,5% |
| so:estacao_remada | item | 44,2% | 10,9% | 42,6% | 2,2% | 4 | 45,3% | 51,4% |
| so:gluteo_maquina | item | 20% | 30,4% | 49,1% | 0,5% | 4 | 22% | 59,3% |
| so:graviton | item | 41% | 15,7% | 40,8% | 2,5% | 4 | 42,7% | 46,1% |
| so:hack | item | 20% | 30,2% | 49,4% | 0,4% | 4 | 21,2% | 58,7% |
| so:halteres_fixos | item | 0% | 0% | 82,6% | 17,4% | 6 | 6,1% | 28,2% |
| so:kettlebell | item | 23,5% | 19,3% | 51,3% | 6% | 5 | 25,1% | 39,2% |
| so:leg_press | item | 20% | 30,2% | 49,3% | 0,5% | 4 | 21,2% | 59,5% |
| so:mesa_flexora | item | 20% | 27,9% | 51,4% | 0,7% | 5 | 21,8% | 54,5% |
| so:mini_band | item | 20% | 30,2% | 49,3% | 0,5% | 4 | 22% | 59,1% |
| so:multifuncional | item | 38,5% | 11,9% | 46,7% | 2,9% | 4 | 39,7% | 47,8% |
| so:panturrilha_em_pe_maquina | item | 20% | 30,2% | 49,3% | 0,5% | 4 | 22% | 58,5% |
| so:panturrilha_sentada_maquina | item | 20% | 30,1% | 49% | 0,9% | 4 | 21,9% | 56,8% |
| so:paralelas | item | 19,5% | 30,7% | 49,4% | 0,4% | 4 | 21,2% | 57,8% |
| so:rack_de_agachamento | item | 44,2% | 6,9% | 45,9% | 2,9% | 4 | 44,1% | 47,7% |
| so:remada_articulada | item | 44,2% | 10,9% | 42,6% | 2,2% | 4 | 45,3% | 50,9% |
| so:roda_abdominal | item | 20% | 30,2% | 49,4% | 0,4% | 4 | 22% | 57,9% |
| so:rosca_maquina | item | 20% | 11,7% | 65,8% | 2,5% | 5 | 20,8% | 50,6% |
| so:smith | item | 44,2% | 6,9% | 46% | 2,9% | 4 | 43,9% | 48,2% |
| so:step | item | 20% | 30,2% | 49,3% | 0,4% | 4 | 22% | 56,7% |
| so:supino_maquina | item | 14,2% | 36% | 49,4% | 0,4% | 4 | 16,3% | 56,6% |
| so:suspensao | item | 15% | 23,5% | 54% | 7,5% | 5 | 18,5% | 39,8% |
| so:triceps_maquina | item | 20% | 30,2% | 49,4% | 0,4% | 4 | 22,7% | 56% |
| so:voador | item | 14,2% | 24,4% | 60,9% | 0,4% | 5 | 15,7% | 54% |
| step+elasticos | par | 0% | 0% | 68,5% | 31,5% | 6 | 4,4% | 18,9% |
| suspensao+elasticos | par | 0% | 0% | 68% | 32% | 6 | 4,4% | 20,1% |
| vazio | vazio | 20% | 30,2% | 49,4% | 0,4% | 4 | 22% | 57,7% |

## Uso dos minutos

Minutos estimados do dia mais longo ÷ minutos escolhidos (% dos programas).

| minutos | mediana do uso | < 50% | < 70% | ≥ 100% |
| ---: | ---: | ---: | ---: | ---: |
| 30 | 100% | 0% | 0,4% | 60,2% |
| 45 | 95% | 0,5% | 6,6% | 39,8% |
| 60 | 75% | 2,9% | 31,3% | 18,1% |
| 75 | 60% | 15,6% | 59% | 6,3% |
| 90 | 50% | 38,2% | 77,6% | 2% |

## Séries por músculo

Por nível, somando os cenários: média de séries semanais; prioritário abaixo da meta (% dos programas em que o músculo é prioridade); não prioritário abaixo do piso de 4 (% dos outros); 0 série na semana (% dos programas); 0 sem aviso que o cite.

### iniciante

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 7,2 | 19,9% | 14,7% | 14,7% | 0 |
| costas | 3,2 | 56,5% | 54,3% | 53,9% | 0 |
| ombro (lateral) | 2 | 75,2% | 70,4% | 50,7% | 0 |
| ombro (posterior) | 2,4 | 0% | 67,2% | 52,3% | 0 |
| bíceps | 3,1 | 67,9% | 58,2% | 48,3% | 0 |
| tríceps | 5,6 | 52,3% | 25,3% | 15,4% | 0 |
| quadríceps | 6,1 | 26% | 10,5% | 10,5% | 0 |
| posteriores da coxa | 6,8 | 20,7% | 3,7% | 3,7% | 0 |
| glúteos | 8,8 | 11% | 6,7% | 0,7% | 0 |
| panturrilha | 5,1 | 32,6% | 10,4% | 10,4% | 0 |
| abdômen | 5,2 | 24,3% | 11,3% | 11,6% | 0 |

### intermediario

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 7,6 | 38,3% | 14,6% | 14,6% | 0 |
| costas | 3,6 | 76% | 52,8% | 52,2% | 0 |
| ombro (lateral) | 2,1 | 84,1% | 70,4% | 50,7% | 0 |
| ombro (posterior) | 2,6 | 0% | 66,8% | 50,8% | 0 |
| bíceps | 3,3 | 77% | 57,9% | 46,8% | 0 |
| tríceps | 5,9 | 76,5% | 25,2% | 15,3% | 0 |
| quadríceps | 6,5 | 64,7% | 10,5% | 10,5% | 0 |
| posteriores da coxa | 7,5 | 41,1% | 3,6% | 3,6% | 0 |
| glúteos | 8,4 | 30,7% | 9% | 0,7% | 0 |
| panturrilha | 5,3 | 72% | 10,4% | 10,4% | 0 |
| abdômen | 5,4 | 58,7% | 11,4% | 11,6% | 0 |

### avancado

| músculo | média | prioritário abaixo da meta | demais abaixo de 4 | zero | zero sem aviso |
| --- | ---: | ---: | ---: | ---: | ---: |
| peito | 7,8 | 51,9% | 14,6% | 14,6% | 0 |
| costas | 3,7 | 82,8% | 52,8% | 52,2% | 0 |
| ombro (lateral) | 2,2 | 87,3% | 70,4% | 50,7% | 0 |
| ombro (posterior) | 2,6 | 0% | 66,8% | 50,8% | 0 |
| bíceps | 3,4 | 86,6% | 57,9% | 46,8% | 0 |
| tríceps | 6 | 80,8% | 25,2% | 15,3% | 0 |
| quadríceps | 6,6 | 87,5% | 10,5% | 10,5% | 0 |
| posteriores da coxa | 7,8 | 58,2% | 3,6% | 3,6% | 0 |
| glúteos | 8,6 | 40,4% | 8,9% | 0,7% | 0 |
| panturrilha | 5,3 | 95,2% | 10,4% | 10,4% | 0 |
| abdômen | 5,4 | 85,4% | 11,4% | 11,6% | 0 |

### Músculos a zero por cenário (todos os níveis; % dos programas)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| academia | 5,9% | 9,4% | 14,8% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 5,9% | 22,4% | 20,7% |
| academia+ | 5,9% | 9,4% | 14,8% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 5,9% | 22,4% | 20,7% |
| bairro | 5,9% | 11,8% | 14,8% | 6,4% | 5,9% | 11,8% | 6,4% | 0% | 2,4% | 21,9% | 20,7% |
| banco+halteres-leves | 5,9% | 17,6% | 14,1% | 12% | 5,9% | 11,8% | 11,8% | 0% | 0% | 12,2% | 17,7% |
| bruno | 5,9% | 9,4% | 14,8% | 6,4% | 5,9% | 6,2% | 6,4% | 0% | 0% | 22,4% | 20,7% |
| casa | 6,4% | 11,8% | 14,8% | 6,1% | 5,9% | 11,8% | 6,4% | 0% | 2,4% | 21,9% | 20,3% |
| casa+ | 5,9% | 11,8% | 14,8% | 6,4% | 5,9% | 11,8% | 6,4% | 0% | 0% | 21,9% | 20,7% |
| condominio | 5,9% | 11,8% | 14,8% | 6,1% | 5,9% | 11,8% | 11,8% | 0% | 0% | 12,5% | 17,7% |
| condominio+ | 5,9% | 11,8% | 14,8% | 6,4% | 5,9% | 11,8% | 6,4% | 0% | 2,4% | 21,9% | 20,7% |
| diego | 7,5% | 6,1% | 14,1% | 6,1% | 5,9% | 12,5% | 6,4% | 0% | 2,4% | 21,9% | 20,3% |
| elasticos | 7,5% | 6,1% | 14,1% | 6,1% | 5,9% | 12,5% | 6,4% | 0% | 2,4% | 21,9% | 20,3% |
| halteres | 11,8% | 17,6% | 14,1% | 11,8% | 5,9% | 11,8% | 11,8% | 0% | 0% | 11,8% | 17,5% |
| halteres-banco | 5,9% | 17,6% | 14,1% | 12% | 5,9% | 11,8% | 11,8% | 0% | 0% | 12,2% | 17,7% |
| halteres+bola | 11,8% | 17,6% | 14,1% | 11,8% | 5,9% | 11,8% | 11,8% | 0% | 0% | 11,8% | 17,5% |
| so:abdominal_maquina | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:anilhas_e_manoplas | 11,8% | 17,6% | 14,1% | 11,8% | 5,9% | 11,8% | 11,8% | 0% | 0% | 11,8% | 17,5% |
| so:banco_romano | 19% | 100% | 69,4% | 100% | 100% | 18,8% | 11,8% | 0% | 0% | 5,9% | 6,3% |
| so:barra_fixa | 19,1% | 11,8% | 73,1% | 11,8% | 11,8% | 18,9% | 11,8% | 5,9% | 0% | 8% | 8,1% |
| so:barra_hexagonal | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,4% |
| so:barra_longa | 18,9% | 45,1% | 70,7% | 45,1% | 45,1% | 18,8% | 11,8% | 2% | 0% | 5,9% | 7,7% |
| so:barra_w | 19% | 100% | 71% | 100% | 12,4% | 18,8% | 11,8% | 5,9% | 0,1% | 5,9% | 7,8% |
| so:bola_suica | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:cadeira_abdutora_adutora | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:cadeira_extensora | 19% | 100% | 68,6% | 100% | 100% | 18,8% | 5,9% | 5,9% | 0% | 5,9% | 6,3% |
| so:cadeira_flexora | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 4,7% | 5,9% | 6,3% |
| so:caneleiras | 19% | 100% | 68,6% | 100% | 100% | 18,8% | 5,9% | 5,9% | 0% | 5,9% | 6,3% |
| so:desenvolvimento_maquina | 19% | 100% | 65,1% | 100% | 100% | 15% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:estacao_polia_dupla | 5,9% | 11,8% | 12,7% | 6,1% | 11,8% | 13,2% | 11,8% | 5,9% | 0,2% | 12% | 17% |
| so:estacao_puxada | 19,1% | 11,8% | 73,1% | 11,8% | 11,8% | 18,9% | 11,8% | 5,9% | 0% | 8% | 8,1% |
| so:estacao_remada | 18,9% | 17,6% | 71,3% | 17,6% | 17,6% | 18,7% | 11,8% | 5,9% | 0,1% | 5,9% | 8,5% |
| so:gluteo_maquina | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:graviton | 11,8% | 11,8% | 73,1% | 11,8% | 11,8% | 11,8% | 11,8% | 5,9% | 0% | 8,5% | 8,2% |
| so:hack | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,4% |
| so:halteres_fixos | 11,8% | 17,6% | 14,1% | 11,8% | 5,9% | 11,8% | 11,8% | 0% | 0% | 11,8% | 17,5% |
| so:kettlebell | 19,1% | 17,6% | 67,8% | 17,6% | 5,9% | 11,9% | 11,8% | 0% | 0% | 11,7% | 12,8% |
| so:leg_press | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,4% |
| so:mesa_flexora | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 4,7% | 5,9% | 6,3% |
| so:mini_band | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:multifuncional | 19,1% | 11,8% | 71,5% | 11,8% | 11,8% | 18,9% | 11,8% | 5,9% | 0,1% | 8% | 11,1% |
| so:panturrilha_em_pe_maquina | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:panturrilha_sentada_maquina | 19% | 100% | 68,6% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:paralelas | 14,2% | 100% | 68,9% | 100% | 100% | 14,1% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:rack_de_agachamento | 19,1% | 11,8% | 72,6% | 11,8% | 11,8% | 18,9% | 11,8% | 5,9% | 0,1% | 8% | 11,1% |
| so:remada_articulada | 18,9% | 11,8% | 72,6% | 11,8% | 11,8% | 18,7% | 11,8% | 5,9% | 0,1% | 5,9% | 8,5% |
| so:roda_abdominal | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:rosca_maquina | 19% | 100% | 71% | 100% | 6,5% | 18,8% | 11,8% | 5,9% | 0,1% | 5,9% | 7,8% |
| so:smith | 19,1% | 11,8% | 72,6% | 11,8% | 11,8% | 18,9% | 11,8% | 5,9% | 0,1% | 8,2% | 11,3% |
| so:step | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:supino_maquina | 11,8% | 100% | 68,9% | 100% | 100% | 11,8% | 11,8% | 5,9% | 0% | 5,9% | 6,4% |
| so:suspensao | 23,5% | 11,8% | 74,6% | 5,9% | 11,8% | 13,9% | 11,8% | 5,9% | 0,2% | 10,5% | 15% |
| so:triceps_maquina | 23,5% | 100% | 68,9% | 100% | 100% | 7,7% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| so:voador | 5,9% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |
| step+elasticos | 7,5% | 6,1% | 14,1% | 6,1% | 5,9% | 12,5% | 6,4% | 0% | 2,4% | 21,9% | 20,3% |
| suspensao+elasticos | 7,6% | 6,1% | 14,1% | 6,1% | 5,9% | 12,5% | 6,4% | 0% | 2,4% | 21,9% | 20,3% |
| vazio | 19% | 100% | 68,9% | 100% | 100% | 18,8% | 11,8% | 5,9% | 0% | 5,9% | 6,3% |

## Fatia das séries da semana que vai aos músculos prioritários

Séries diretas mais meia série indireta, como o app conta o volume. Média (%) dos programas com prioridade.

| nível | 1 prioridade | 2 prioridades | 3 prioridades |
| --- | ---: | ---: | ---: |
| iniciante | 14,4% | 26,1% | 58,1% |
| intermediario | 16,1% | 28,5% | 60,4% |
| avancado | 16,7% | 29,5% | 61,4% |

| dias por semana | 1 prioridade | 2 prioridades | 3 prioridades |
| ---: | ---: | ---: | ---: |
| 2 | 15,4% | 27,7% | 61,6% |
| 3 | 16,4% | 29,2% | 61,6% |
| 4 | 15,9% | 28,2% | 60,2% |
| 5 | 15,3% | 27,4% | 58,6% |
| 6 | 15,6% | 27,7% | 57,9% |

| minutos | 1 prioridade | 2 prioridades | 3 prioridades |
| ---: | ---: | ---: | ---: |
| 30 | 15,3% | 28,4% | 57,8% |
| 45 | 15,9% | 28,3% | 60,9% |
| 60 | 15,8% | 28% | 60,7% |
| 75 | 15,8% | 27,8% | 60,4% |
| 90 | 15,8% | 27,8% | 60,1% |

### Por prioridade e nível (média %), e quando as prioridades competem

"Abaixo": programas com algum prioritário abaixo da meta. "Competem": um prioritário abaixo da meta e outro na meta (só com 2 ou 3 prioridades).

| prioridade | iniciante: fatia | abaixo | competem | intermediario: fatia | abaixo | competem | avancado: fatia | abaixo | competem |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| peito | 12,6% | 18,4% | — | 14,6% | 38,4% | — | 15,4% | 51,9% | — |
| costas | 5,4% | 56,6% | — | 6,6% | 75,9% | — | 6,9% | 83,1% | — |
| ombros | 4,3% | 75,2% | — | 4,9% | 84% | — | 5,2% | 87,3% | — |
| bracos | 14,5% | 77,6% | — | 16,3% | 89,9% | — | 16,8% | 92,5% | — |
| pernas | 33% | 42,4% | — | 36,8% | 80,5% | — | 37,7% | 96,3% | — |
| gluteos | 18,6% | 12,6% | — | 19,1% | 28% | — | 20,1% | 39,2% | — |
| abdomen | 12,2% | 18,1% | — | 14,5% | 53,3% | — | 15% | 83,5% | — |
| peito+costas | 17,7% | 60% | 44,4% | 20,1% | 80,3% | 45% | 21% | 87,6% | 39,9% |
| pernas+gluteos | 50,2% | 45,1% | 42,5% | 52,7% | 82,9% | 59,8% | 53,9% | 98,6% | 65,8% |
| peito+bracos | 27,2% | 75,9% | 57% | 30,6% | 87,2% | 53,8% | 31,8% | 92,7% | 43,1% |
| costas+ombros | 9,4% | 77,4% | 23,2% | 10,7% | 85,7% | 12% | 11,2% | 88,1% | 6,7% |
| pernas+gluteos+abdomen | 58,1% | 54,5% | 51,7% | 60,4% | 89,4% | 66,7% | 61,4% | 100% | 66,2% |

### Por cenário, com 1 prioridade (média %)

| cenário | fatia |
| --- | ---: |
| academia | 16,3% |
| academia+ | 16,3% |
| bairro | 16,1% |
| banco+halteres-leves | 15,7% |
| bruno | 16,2% |
| casa | 16,1% |
| casa+ | 16,3% |
| condominio | 15,6% |
| condominio+ | 16,1% |
| diego | 15,9% |
| elasticos | 16% |
| halteres | 15,8% |
| halteres-banco | 15,7% |
| halteres+bola | 15,8% |
| so:abdominal_maquina | 15,6% |
| so:anilhas_e_manoplas | 15,8% |
| so:banco_romano | 15,4% |
| so:barra_fixa | 15,7% |
| so:barra_hexagonal | 15,4% |
| so:barra_longa | 15,2% |
| so:barra_w | 16,2% |
| so:bola_suica | 15,5% |
| so:cadeira_abdutora_adutora | 15,6% |
| so:cadeira_extensora | 15,8% |
| so:cadeira_flexora | 15,8% |
| so:caneleiras | 15,8% |
| so:desenvolvimento_maquina | 15,6% |
| so:estacao_polia_dupla | 15,2% |
| so:estacao_puxada | 15,4% |
| so:estacao_remada | 15,3% |
| so:gluteo_maquina | 15,7% |
| so:graviton | 15,5% |
| so:hack | 15,6% |
| so:halteres_fixos | 15,9% |
| so:kettlebell | 16,1% |
| so:leg_press | 15,6% |
| so:mesa_flexora | 15,8% |
| so:mini_band | 15,6% |
| so:multifuncional | 15,4% |
| so:panturrilha_em_pe_maquina | 15,7% |
| so:panturrilha_sentada_maquina | 15,9% |
| so:paralelas | 15,7% |
| so:rack_de_agachamento | 15,4% |
| so:remada_articulada | 15,3% |
| so:roda_abdominal | 15,6% |
| so:rosca_maquina | 16,2% |
| so:smith | 15,4% |
| so:step | 15,6% |
| so:supino_maquina | 15,5% |
| so:suspensao | 15,2% |
| so:triceps_maquina | 16,2% |
| so:voador | 15,4% |
| step+elasticos | 16% |
| suspensao+elasticos | 16,1% |
| vazio | 15,6% |

## Exercícios distintos na semana e repetição

Mediana de exercícios distintos por programa; com 3 dias ou mais, % dos programas com um exercício (fora o abdominal) em todos os dias, e % em que havia outro equivalente do mesmo nível possível e sem uso.

| cenário | distintos (mediana) | em todos os dias | com opção |
| --- | ---: | ---: | ---: |
| academia | 22 | 2% | 0% |
| academia+ | 22 | 2% | 0% |
| bairro | 19 | 5,6% | 2,1% |
| banco+halteres-leves | 16 | 9,5% | 9,1% |
| bruno | 20 | 2,1% | 1,3% |
| casa | 17 | 21,2% | 2,1% |
| casa+ | 21 | 3,8% | 0,8% |
| condominio | 18 | 5,6% | 1,5% |
| condominio+ | 19 | 4,4% | 0% |
| diego | 17 | 21,6% | 0% |
| elasticos | 15 | 21,6% | 0% |
| halteres | 16 | 21,1% | 2,4% |
| halteres-banco | 16 | 9,5% | 9,1% |
| halteres+bola | 16 | 21,1% | 2,4% |
| so:abdominal_maquina | 9 | 62,7% | 0% |
| so:anilhas_e_manoplas | 16 | 21,1% | 2,4% |
| so:banco_romano | 10 | 59,7% | 4,4% |
| so:barra_fixa | 11 | 24,8% | 0% |
| so:barra_hexagonal | 9 | 62,7% | 0% |
| so:barra_longa | 9 | 41,1% | 0% |
| so:barra_w | 10 | 66% | 0% |
| so:bola_suica | 10 | 73,8% | 0% |
| so:cadeira_abdutora_adutora | 9 | 62,7% | 0% |
| so:cadeira_extensora | 10 | 64,9% | 0% |
| so:cadeira_flexora | 9 | 73,4% | 0% |
| so:caneleiras | 10 | 64,9% | 0% |
| so:desenvolvimento_maquina | 9 | 62,7% | 0% |
| so:estacao_polia_dupla | 15 | 12,2% | 0% |
| so:estacao_puxada | 9 | 25,6% | 0% |
| so:estacao_remada | 9 | 25,7% | 0% |
| so:gluteo_maquina | 9 | 63,5% | 0% |
| so:graviton | 10 | 11,7% | 0% |
| so:hack | 9 | 62,7% | 0% |
| so:halteres_fixos | 16 | 21,1% | 2,4% |
| so:kettlebell | 11 | 28,3% | 2,8% |
| so:leg_press | 9 | 62,7% | 0% |
| so:mesa_flexora | 9 | 73,4% | 0% |
| so:mini_band | 9 | 62,7% | 0% |
| so:multifuncional | 10 | 28,5% | 0% |
| so:panturrilha_em_pe_maquina | 9 | 62,7% | 0% |
| so:panturrilha_sentada_maquina | 9 | 62,7% | 0% |
| so:paralelas | 10 | 26,2% | 0% |
| so:rack_de_agachamento | 9 | 30,7% | 0% |
| so:remada_articulada | 9 | 25,7% | 0% |
| so:roda_abdominal | 9 | 62,7% | 0% |
| so:rosca_maquina | 10 | 68,2% | 0% |
| so:smith | 9 | 29,9% | 0% |
| so:step | 10 | 62,7% | 0% |
| so:supino_maquina | 10 | 25,2% | 0% |
| so:suspensao | 12 | 25,8% | 0% |
| so:triceps_maquina | 9 | 62,3% | 0% |
| so:voador | 10 | 24,4% | 0% |
| step+elasticos | 16 | 21,5% | 0% |
| suspensao+elasticos | 16 | 24,1% | 0% |
| vazio | 9 | 62,7% | 0% |

## Vagas vazias

Por cenário e nível: vagas ativas por programa (média), quantas têm exercício possível, quantas ficam vazias por equipamento ou por dor, e quantas com exercício ficam de fora por minutos (ou pelos cortes de tempo). A função mais vazia por equipamento vem ao lado.

| cenário | nível | vagas | com exercício | vazias: equipamento | vazias: dor | fora por minutos | vazias por equipamento (funções) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| academia | iniciante | 28,9 | 26,9 | 0 | 2 | 3,3 | — |
| academia | intermediario | 28,9 | 26,9 | 0 | 2 | 3,4 | — |
| academia | avancado | 28,9 | 26,9 | 0 | 2 | 3,5 | — |
| academia+ | iniciante | 28,9 | 26,9 | 0 | 2 | 3,3 | — |
| academia+ | intermediario | 28,9 | 26,9 | 0 | 2 | 3,4 | — |
| academia+ | avancado | 28,9 | 26,9 | 0 | 2 | 3,5 | — |
| bairro | iniciante | 28,9 | 26,8 | 0 | 2,1 | 3,4 | — |
| bairro | intermediario | 28,9 | 26,9 | 0 | 2,1 | 3,5 | — |
| bairro | avancado | 28,9 | 26,9 | 0 | 2,1 | 3,5 | — |
| banco+halteres-leves | iniciante | 28,9 | 25 | 1,6 | 2,3 | 3,5 | extensora (1,6) |
| banco+halteres-leves | intermediario | 28,9 | 25 | 1,6 | 2,3 | 3,5 | extensora (1,6) |
| banco+halteres-leves | avancado | 28,9 | 25 | 1,6 | 2,3 | 3,5 | extensora (1,6) |
| bruno | iniciante | 28,9 | 26,9 | 0 | 2 | 3,4 | — |
| bruno | intermediario | 28,9 | 26,9 | 0 | 2 | 3,5 | — |
| bruno | avancado | 28,9 | 26,9 | 0 | 2 | 3,6 | — |
| casa | iniciante | 28,9 | 26,6 | 0,1 | 2,3 | 3,4 | empurrar-inclinado (0,1) |
| casa | intermediario | 28,9 | 26,6 | 0,1 | 2,3 | 3,6 | empurrar-inclinado (0,1) |
| casa | avancado | 28,9 | 26,6 | 0,1 | 2,3 | 3,6 | empurrar-inclinado (0,1) |
| casa+ | iniciante | 28,9 | 26,9 | 0 | 2,1 | 3,3 | — |
| casa+ | intermediario | 28,9 | 26,9 | 0 | 2,1 | 3,5 | — |
| casa+ | avancado | 28,9 | 26,9 | 0 | 2,1 | 3,5 | — |
| condominio | iniciante | 28,9 | 25,3 | 1,6 | 2 | 2,9 | extensora (1,6) |
| condominio | intermediario | 28,9 | 25,3 | 1,6 | 2 | 3 | extensora (1,6) |
| condominio | avancado | 28,9 | 25,3 | 1,6 | 2 | 3,1 | extensora (1,6) |
| condominio+ | iniciante | 28,9 | 26,8 | 0 | 2,1 | 3,3 | — |
| condominio+ | intermediario | 28,9 | 26,8 | 0 | 2,1 | 3,4 | — |
| condominio+ | avancado | 28,9 | 26,8 | 0 | 2,1 | 3,5 | — |
| diego | iniciante | 28,9 | 26,3 | 0,3 | 2,4 | 3,4 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| diego | intermediario | 28,9 | 26,3 | 0,3 | 2,4 | 3,6 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| diego | avancado | 28,9 | 26,3 | 0,3 | 2,4 | 3,6 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| elasticos | iniciante | 28,9 | 26,3 | 0,3 | 2,4 | 3,4 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| elasticos | intermediario | 28,9 | 26,3 | 0,3 | 2,4 | 3,6 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| elasticos | avancado | 28,9 | 26,3 | 0,3 | 2,4 | 3,7 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| halteres | iniciante | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| halteres | intermediario | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| halteres | avancado | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| halteres-banco | iniciante | 28,9 | 25 | 1,6 | 2,3 | 3,5 | extensora (1,6) |
| halteres-banco | intermediario | 28,9 | 25 | 1,6 | 2,3 | 3,5 | extensora (1,6) |
| halteres-banco | avancado | 28,9 | 25 | 1,6 | 2,3 | 3,5 | extensora (1,6) |
| halteres+bola | iniciante | 28,9 | 23,4 | 3,1 | 2,4 | 2,4 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| halteres+bola | intermediario | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| halteres+bola | avancado | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| so:abdominal_maquina | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:abdominal_maquina | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:abdominal_maquina | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:anilhas_e_manoplas | iniciante | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| so:anilhas_e_manoplas | intermediario | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| so:anilhas_e_manoplas | avancado | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| so:banco_romano | iniciante | 32 | 16,3 | 14,1 | 1,6 | 1,1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:banco_romano | intermediario | 32 | 16,3 | 14,1 | 1,6 | 1,1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:banco_romano | avancado | 32 | 16,3 | 14,1 | 1,6 | 1,1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_fixa | iniciante | 28,9 | 15,4 | 11,8 | 1,7 | 2,2 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_fixa | intermediario | 28,9 | 15,4 | 11,8 | 1,7 | 1,3 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_fixa | avancado | 28,9 | 15,4 | 11,8 | 1,7 | 1,3 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_hexagonal | iniciante | 32 | 16,1 | 14,1 | 1,8 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:barra_hexagonal | intermediario | 32 | 16,1 | 14,1 | 1,8 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:barra_hexagonal | avancado | 32 | 16,1 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:barra_longa | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_longa | intermediario | 28,9 | 15,3 | 12 | 1,6 | 1,4 | elevacao-lateral (1,9), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_longa | avancado | 28,9 | 15,3 | 12 | 1,6 | 1,4 | elevacao-lateral (1,9), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_w | iniciante | 32 | 17,7 | 12,2 | 2 | 1,5 | elevacao-lateral (2,1), puxar-vertical (2), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_w | intermediario | 32 | 17,7 | 12,2 | 2 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:barra_w | avancado | 32 | 17,7 | 12,2 | 2 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:bola_suica | iniciante | 32 | 16 | 14,1 | 1,8 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:bola_suica | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:bola_suica | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_abdutora_adutora | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_abdutora_adutora | intermediario | 32 | 16 | 14,1 | 1,8 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_abdutora_adutora | avancado | 32 | 16 | 14,1 | 1,8 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_extensora | iniciante | 32 | 17,6 | 12,5 | 1,9 | 1,5 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_extensora | intermediario | 32 | 17,6 | 12,5 | 1,9 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_extensora | avancado | 32 | 17,6 | 12,5 | 1,9 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_flexora | iniciante | 32 | 16 | 14,1 | 1,8 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_flexora | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:cadeira_flexora | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:caneleiras | iniciante | 32 | 17,6 | 12,5 | 1,9 | 1,5 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:caneleiras | intermediario | 32 | 17,6 | 12,5 | 1,9 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:caneleiras | avancado | 32 | 17,6 | 12,5 | 1,9 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:desenvolvimento_maquina | iniciante | 32 | 16,1 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:desenvolvimento_maquina | intermediario | 32 | 16,1 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:desenvolvimento_maquina | avancado | 32 | 16,1 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_polia_dupla | iniciante | 28,9 | 24,4 | 2 | 2,5 | 3,7 | extensora (1,6), panturrilha-sentada (0,2), empurrar-horizontal (0,1), agachar (0,1) |
| so:estacao_polia_dupla | intermediario | 28,9 | 24,4 | 2 | 2,5 | 2,9 | extensora (1,6), panturrilha-sentada (0,2), empurrar-horizontal (0,1), agachar (0,1) |
| so:estacao_polia_dupla | avancado | 28,9 | 24,4 | 2 | 2,5 | 3 | extensora (1,6), panturrilha-sentada (0,2), empurrar-horizontal (0,1), agachar (0,1) |
| so:estacao_puxada | iniciante | 28,9 | 15,4 | 11,8 | 1,7 | 2,2 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_puxada | intermediario | 28,9 | 15,4 | 11,8 | 1,7 | 1,3 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_puxada | avancado | 28,9 | 15,4 | 11,8 | 1,7 | 1,3 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_remada | iniciante | 28,9 | 15,1 | 12 | 1,8 | 2,2 | elevacao-lateral (1,9), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_remada | intermediario | 28,9 | 15,1 | 12 | 1,8 | 1,3 | elevacao-lateral (1,9), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:estacao_remada | avancado | 28,9 | 15,1 | 12 | 1,8 | 1,3 | elevacao-lateral (1,9), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:gluteo_maquina | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:gluteo_maquina | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:gluteo_maquina | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:graviton | iniciante | 28,9 | 15,6 | 11,6 | 1,6 | 1,8 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), agachar (0,1) |
| so:graviton | intermediario | 28,9 | 15,6 | 11,7 | 1,6 | 1 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-inclinado (0,1), agachar (0,1) |
| so:graviton | avancado | 28,9 | 15,6 | 11,7 | 1,6 | 1 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-inclinado (0,1), agachar (0,1) |
| so:hack | iniciante | 32 | 16,1 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:hack | intermediario | 32 | 16,1 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:hack | avancado | 32 | 16,1 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:halteres_fixos | iniciante | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| so:halteres_fixos | intermediario | 28,9 | 23,4 | 3,1 | 2,4 | 2,5 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| so:halteres_fixos | avancado | 28,9 | 23,4 | 3,1 | 2,4 | 2,6 | extensora (1,6), crucifixo (1,4), empurrar-inclinado (0,1) |
| so:kettlebell | iniciante | 28,9 | 19,8 | 7 | 2,2 | 3 | elevacao-lateral (1,9), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:kettlebell | intermediario | 28,9 | 19,8 | 7 | 2,2 | 3 | elevacao-lateral (1,9), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:kettlebell | avancado | 28,9 | 19,8 | 7 | 2,2 | 3 | elevacao-lateral (1,9), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:leg_press | iniciante | 32 | 16,1 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:leg_press | intermediario | 32 | 16,1 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:leg_press | avancado | 32 | 16,1 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:mesa_flexora | iniciante | 32 | 16 | 14,1 | 1,8 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mesa_flexora | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mesa_flexora | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mini_band | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mini_band | intermediario | 32 | 16 | 14,1 | 1,8 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:mini_band | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:multifuncional | iniciante | 28,9 | 16,7 | 10,2 | 2 | 2,3 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:multifuncional | intermediario | 28,9 | 16,7 | 10,2 | 2 | 1,4 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:multifuncional | avancado | 28,9 | 16,7 | 10,2 | 2 | 1,4 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_em_pe_maquina | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_em_pe_maquina | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_em_pe_maquina | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_sentada_maquina | iniciante | 32 | 16,3 | 13,9 | 1,8 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_sentada_maquina | intermediario | 32 | 16,3 | 13,9 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:panturrilha_sentada_maquina | avancado | 32 | 16,3 | 13,9 | 1,8 | 1,1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:paralelas | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:paralelas | intermediario | 32 | 16,3 | 14 | 1,6 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-inclinado (0,1), agachar (0,1) |
| so:paralelas | avancado | 32 | 16,3 | 14 | 1,6 | 0,9 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-inclinado (0,1), agachar (0,1) |
| so:rack_de_agachamento | iniciante | 28,9 | 16,8 | 10,2 | 1,9 | 3,4 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rack_de_agachamento | intermediario | 28,9 | 16,8 | 10,2 | 1,9 | 2,5 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rack_de_agachamento | avancado | 28,9 | 16,8 | 10,2 | 1,9 | 2,5 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:remada_articulada | iniciante | 28,9 | 15,2 | 12 | 1,7 | 2,2 | elevacao-lateral (1,9), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:remada_articulada | intermediario | 28,9 | 15,2 | 12 | 1,7 | 1,3 | elevacao-lateral (1,9), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:remada_articulada | avancado | 28,9 | 15,2 | 12 | 1,7 | 1,3 | elevacao-lateral (1,9), puxar-vertical (1,8), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:roda_abdominal | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:roda_abdominal | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:roda_abdominal | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rosca_maquina | iniciante | 32 | 17,8 | 12,2 | 1,9 | 1,5 | elevacao-lateral (2,1), puxar-vertical (2), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rosca_maquina | intermediario | 32 | 17,8 | 12,2 | 1,9 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:rosca_maquina | avancado | 32 | 17,8 | 12,2 | 1,9 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:smith | iniciante | 28,9 | 16,9 | 10,1 | 1,9 | 3,4 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:smith | intermediario | 28,9 | 16,9 | 10,1 | 1,9 | 2,5 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:smith | avancado | 28,9 | 16,9 | 10,1 | 1,9 | 2,5 | elevacao-lateral (1,9), biceps (1,8), extensora (1,6), ombro-posterior (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1) |
| so:step | iniciante | 32 | 16 | 14,1 | 1,8 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:step | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:step | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:supino_maquina | iniciante | 32 | 16,4 | 13,9 | 1,7 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), agachar (0,1) |
| so:supino_maquina | intermediario | 32 | 16,4 | 13,9 | 1,7 | 0,7 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), agachar (0,1) |
| so:supino_maquina | avancado | 32 | 16,4 | 13,9 | 1,7 | 0,7 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), agachar (0,1) |
| so:suspensao | iniciante | 28,9 | 19,9 | 6,8 | 2,2 | 3 | elevacao-lateral (1,9), extensora (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:suspensao | intermediario | 28,9 | 19,9 | 6,8 | 2,2 | 3 | elevacao-lateral (1,9), extensora (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:suspensao | avancado | 28,9 | 19,9 | 6,8 | 2,2 | 3,1 | elevacao-lateral (1,9), extensora (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,2), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:triceps_maquina | iniciante | 32 | 16,2 | 14,1 | 1,7 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:triceps_maquina | intermediario | 32 | 16,2 | 14,1 | 1,7 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:triceps_maquina | avancado | 32 | 16,2 | 14,1 | 1,7 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| so:voador | iniciante | 32 | 17,6 | 12,6 | 1,7 | 1,5 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), agachar (0,1) |
| so:voador | intermediario | 32 | 17,6 | 12,6 | 1,7 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), agachar (0,1) |
| so:voador | avancado | 32 | 17,6 | 12,6 | 1,7 | 1,3 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), agachar (0,1) |
| step+elasticos | iniciante | 28,9 | 26,3 | 0,3 | 2,4 | 3,4 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| step+elasticos | intermediario | 28,9 | 26,3 | 0,3 | 2,4 | 3,6 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| step+elasticos | avancado | 28,9 | 26,3 | 0,3 | 2,4 | 3,7 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| suspensao+elasticos | iniciante | 28,9 | 26,3 | 0,3 | 2,3 | 3,4 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| suspensao+elasticos | intermediario | 28,9 | 26,3 | 0,3 | 2,3 | 3,6 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| suspensao+elasticos | avancado | 28,9 | 26,3 | 0,3 | 2,3 | 3,6 | panturrilha-sentada (0,2), empurrar-inclinado (0,1) |
| vazio | iniciante | 32 | 16 | 14,1 | 1,8 | 1,2 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| vazio | intermediario | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |
| vazio | avancado | 32 | 16 | 14,1 | 1,8 | 1 | elevacao-lateral (2,1), puxar-vertical (2), biceps (1,9), extensora (1,6), ombro-posterior (1,6), puxar-horizontal (1,6), crucifixo (1,4), triceps-acima-cabeca (1,4), panturrilha-sentada (0,3), empurrar-horizontal (0,1), empurrar-inclinado (0,1), agachar (0,1) |

## Avisos

% dos programas com cada aviso (uma vez por programa, mesmo que repetido).

| regra | programas | % |
| --- | ---: | ---: |
| `equipamento.escada-carga-leve` | 762.450 | 83,6% |
| `selecao.isolador-obrigatorio` | 696.150 | 76,4% |
| `volume.semanal.alvo` | 668.554 | 73,3% |
| `equipamento.sem-ancoragem` | 419.900 | 46,1% |
| `seguranca.dor.programa` | 375.375 | 41,2% |
| `selecao.dia-sem-principal` | 339.455 | 37,2% |
| `tempo.sobra` | 305.007 | 33,5% |
| `tempo.corte` | 269.090 | 29,5% |
| `equipamento.sem-puxada-vertical` | 242.125 | 26,6% |
| `selecao.alongado` | 153.000 | 16,8% |
| `divisao.sem-puxar` | 83.980 | 9,2% |

## Piores casos

Os 10 piores cenários de cada medida, um caso por cenário (menor valor primeiro; empate pela ordem da grade). A linha de reprodução usa `CEN_55` de `scripts/auditoria/cenarios-55.ts`.

### menor-uso-dos-minutos

- **vazio · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (13 min): flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): flexao-joelho-deslizante 2, abdominal-chao 2 | Pernas B (8 min): flexao-joelho-deslizante 2, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['vazio'].inventario)`
- **so:barra_fixa · iniciante · 5 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Superior (16 min): flexao 2, barra-fixa 3 | Inferior (18 min): flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 4 | Puxar (13 min): barra-fixa-supinada 3, elevacao-joelhos 2 | Pernas (13 min): flexao-joelho-deslizante 3, panturrilha-chao 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:barra_fixa'].inventario)`
- **so:barra_longa · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (13 min): flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): flexao-joelho-deslizante 2, abdominal-chao 2 | Pernas B (8 min): flexao-joelho-deslizante 2, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:barra_longa'].inventario)`
- **so:barra_w · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (10 min): rosca-barra-w 3, abdominal-chao 2 | Pernas A (18 min): flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (10 min): rosca-barra-w 3, abdominal-chao 2 | Pernas B (13 min): flexao-joelho-deslizante 3, panturrilha-chao 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:barra_w'].inventario)`
- **so:rack_de_agachamento · iniciante · 5 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Superior (16 min): flexao 2, remada-invertida 3 | Inferior (18 min): flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 4 | Puxar (15 min): remada-invertida 3, abdominal-chao 2 | Pernas (13 min): flexao-joelho-deslizante 3, panturrilha-chao 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:rack_de_agachamento'].inventario)`
- **so:smith · iniciante · 5 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Superior (16 min): flexao 2, remada-invertida 3 | Inferior (18 min): flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2 | Empurrar (17 min): flexao 2, flexao-fechada 4 | Puxar (15 min): remada-invertida 3, abdominal-chao 2 | Pernas (13 min): flexao-joelho-deslizante 3, panturrilha-chao 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":5,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:smith'].inventario)`
- **so:leg_press · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-leg-press 2, abdominal-chao 2 | Pernas A (13 min): flexao-joelho-deslizante 2, panturrilha-leg-press 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): flexao-joelho-deslizante 2, abdominal-chao 2 | Pernas B (8 min): flexao-joelho-deslizante 2, panturrilha-leg-press 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:leg_press'].inventario)`
- **so:mesa_flexora · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (18 min): mesa-flexora 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas B (13 min): mesa-flexora 2, panturrilha-chao 2, flexao-joelho-deslizante 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:mesa_flexora'].inventario)`
- **so:cadeira_flexora · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (18 min): cadeira-flexora 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas B (13 min): cadeira-flexora 2, panturrilha-chao 2, flexao-joelho-deslizante 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:cadeira_flexora'].inventario)`
- **so:paralelas · iniciante · 6 dias · 90 min · prioridade nenhuma · quadril 7**: 18 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (13 min): flexao-joelho-deslizante 2, panturrilha-chao 2, elevacao-joelhos-paralelas 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): flexao-joelho-deslizante 2, abdominal-chao 2 | Pernas B (8 min): flexao-joelho-deslizante 2, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['so:paralelas'].inventario)`

### menor-uso-dos-minutos-sem-dor-nem-evitado

- **so:barra_hexagonal · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 26 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (11 min): terra-hexagonal 2, abdominal-chao 2 | Pernas A (21 min): terra-hexagonal 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas B (26 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_hexagonal'].inventario)`
- **so:leg_press · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 27 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (12 min): leg-press 2, abdominal-chao 2 | Pernas A (23 min): leg-press 2, flexao-joelho-deslizante 3, panturrilha-leg-press 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): panturrilha-leg-press 2, abdominal-chao 2 | Pernas B (27 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-leg-press 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:leg_press'].inventario)`
- **so:gluteo_maquina · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 27 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (27 min): afundo-peso-corpo 2, flexao-joelho-deslizante 3, coice-maquina 2, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:gluteo_maquina'].inventario)`
- **so:panturrilha_em_pe_maquina · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 27 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-em-pe-maquina 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-em-pe-maquina 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (27 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-em-pe-maquina 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:panturrilha_em_pe_maquina'].inventario)`
- **vazio · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 28 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (28 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['vazio'].inventario)`
- **so:barra_longa · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 28 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (28 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_longa'].inventario)`
- **so:paralelas · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 28 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-chao 2, elevacao-joelhos-paralelas 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (28 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:paralelas'].inventario)`
- **so:step · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 28 de 90 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (25 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (28 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-bilateral-step 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:step'].inventario)`
- **so:supino_maquina · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 28 de 90 min.
  - Programa: Empurrar A (23 min): supino-maquina 2, pike 2, flexao 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (17 min): flexao 2, supino-maquina 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (28 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:supino_maquina'].inventario)`
- **so:voador · iniciante · 6 dias · 90 min · prioridade nenhuma · sem dor**: 28 de 90 min.
  - Programa: Empurrar A (23 min): flexao 2, pike 2, flexao-fechada 2, voador 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (17 min): flexao 2, flexao-fechada 2, voador 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (28 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:voador'].inventario)`

### menos-exercicios-com-45min-ou-mais

- **casa · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (39 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 3, abdominal-bola 2 | Superior B (7 min): rosca-kettlebell 3 | Inferior B (38 min): afundo 2, ponte-kettlebell 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (35 min): bulgaro 3, stiff 2, flexao-bola 2, panturrilha-chao 3, abdominal-bola 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 3, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, panturrilha-chao 3, abdominal-chao 2
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
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (33 min): goblet 3, stiff 2, flexao-joelho-deslizante 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 3, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-deslizante 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['halteres'].inventario)`
- **halteres-banco · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (35 min): bulgaro 3, stiff 2, flexao-joelho-deslizante 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 3, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-deslizante 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['halteres-banco'].inventario)`
- **diego · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: dia com 1 exercício em 45 min.
  - Programa: Superior A (6 min): rosca-elastico 3 | Inferior A (39 min): agachamento-elastico 2, stiff-elastico 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (6 min): rosca-elastico 3 | Inferior B (44 min): afundo-peso-corpo 2, ponte-gluteo 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['diego'].inventario)`

### menos-exercicios-com-45min-ou-mais-sem-dor-nem-evitado

- **vazio · iniciante · 6 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (28 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['vazio'].inventario)`
- **so:barra_fixa · iniciante · 4 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior A (16 min): flexao 2, barra-fixa 3 | Inferior A (29 min): agachamento-peso-corpo 3, flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2 | Superior B (26 min): flexao 2, barra-fixa-supinada 3, flexao-fechada 4 | Inferior B (38 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 3, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_fixa'].inventario)`
- **so:barra_longa · iniciante · 6 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (24 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (28 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_longa'].inventario)`
- **so:barra_w · iniciante · 6 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (10 min): rosca-barra-w 3, abdominal-chao 2 | Pernas A (29 min): agachamento-peso-corpo 3, flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (10 min): rosca-barra-w 3, abdominal-chao 2 | Pernas B (34 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 3
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:barra_w'].inventario)`
- **so:rack_de_agachamento · iniciante · 4 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior A (16 min): flexao 2, remada-invertida 3 | Inferior A (29 min): agachamento-peso-corpo 3, flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2 | Superior B (27 min): flexao 2, remada-invertida 3, flexao-fechada 4 | Inferior B (39 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:rack_de_agachamento'].inventario)`
- **so:smith · iniciante · 4 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Superior A (16 min): flexao 2, remada-invertida 3 | Inferior A (28 min): agachamento-smith 3, flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2 | Superior B (27 min): flexao 2, remada-invertida 3, flexao-fechada 4 | Inferior B (39 min): afundo-peso-corpo 3, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:smith'].inventario)`
- **so:leg_press · iniciante · 6 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (12 min): leg-press 2, abdominal-chao 2 | Pernas A (23 min): leg-press 2, flexao-joelho-deslizante 3, panturrilha-leg-press 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): panturrilha-leg-press 2, abdominal-chao 2 | Pernas B (27 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 3, panturrilha-leg-press 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:leg_press'].inventario)`
- **so:cadeira_extensora · iniciante · 6 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (27 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, cadeira-extensora 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (8 min): flexao-joelho-deslizante 2, abdominal-chao 2 | Pernas B (30 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2, cadeira-extensora 2, panturrilha-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:cadeira_extensora'].inventario)`
- **so:mesa_flexora · iniciante · 6 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (27 min): agachamento-peso-corpo 2, mesa-flexora 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (30 min): afundo-peso-corpo 2, ponte-gluteo 2, mesa-flexora 2, panturrilha-chao 2, flexao-joelho-deslizante 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:mesa_flexora'].inventario)`
- **so:cadeira_flexora · iniciante · 6 dias · 45 min · prioridade nenhuma · sem dor**: dia com 2 exercícios em 45 min.
  - Programa: Empurrar A (18 min): flexao 2, pike 2, flexao-fechada 2 | Puxar A (8 min): panturrilha-chao 2, abdominal-chao 2 | Pernas A (27 min): agachamento-peso-corpo 2, cadeira-flexora 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (12 min): flexao 2, flexao-fechada 2 | Puxar B (13 min): bulgaro-peso-corpo 2, abdominal-chao 2 | Pernas B (30 min): afundo-peso-corpo 2, ponte-gluteo 2, cadeira-flexora 2, panturrilha-chao 2, flexao-joelho-deslizante 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":6,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['so:cadeira_flexora'].inventario)`

## Exemplos (até 3 por suspeito, de cenários diferentes, os primeiros da grade)

### `dia.poucos-exercicios`

- **casa · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: Superior A com 1 exercícios em 45 min (cabem ~6).
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (38 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: Superior A com 1 exercícios em 45 min (cabem ~6).
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (39 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 3, abdominal-bola 2 | Superior B (7 min): rosca-kettlebell 3 | Inferior B (38 min): afundo 2, ponte-kettlebell 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 4 dias · 45 min · prioridade nenhuma · ombro 7**: Superior A com 1 exercícios em 45 min (cabem ~6).
  - Programa: Superior A (5 min): rosca-alternada 3 | Inferior A (35 min): bulgaro 3, stiff 2, flexao-bola 2, panturrilha-chao 3, abdominal-bola 2 | Superior B (5 min): rosca-martelo 3 | Inferior B (43 min): afundo 3, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, panturrilha-chao 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":4,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `monotonia.todos-os-dias`

- **casa · iniciante · 3 dias · 30 min · prioridade nenhuma · sem dor**: flexao em todos os 3 dias.
  - Programa: Corpo todo A (29 min): goblet 3, flexao 2, remada-unilateral-sem-banco 2, flexao-joelho-elastico 2 | Corpo todo B (29 min): stiff 3, flexao 2, remada-curvada-halteres 2, rosca-alternada 3 | Corpo todo C (30 min): afundo 3, flexao 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":30,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 45 min · prioridade bracos · quadril 7**: rosca-inclinada em todos os 3 dias.
  - Programa: Corpo todo A (38 min): supino-reto 2, barra-fixa 2, triceps-frances-halter 3, rosca-inclinada 2, flexao-bola 3, elevacao-halteres 3 | Corpo todo B (42 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, flexao-joelho-elastico 3, extensao-joelho-caneleira 4, panturrilha 4 | Corpo todo C (39 min): supino-reto 2, barra-fixa-supinada 2, triceps-suspensao 2, rosca-inclinada 2, elevacao-halteres 3, abdominal-bola 4
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":["bracos"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os 3 dias.
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-martelo 2, abdominal-bola 2 | Corpo todo B (37 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `monotonia.todos-os-dias-com-opcao`

- **casa · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (28 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-martelo 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 3 dias · 60 min · prioridade nenhuma · quadril 7**: extensao-joelho-caneleira em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (45 min): supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, extensao-joelho-caneleira 2, abdominal-bola 2 | Corpo todo B (54 min): supino-inclinado 2, remada-apoiada 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 3, crucifixo-inverso 4, abdominal-chao 2 | Corpo todo C (47 min): supino-reto 2, barra-fixa-supinada 2, elevacao-halteres 3, triceps-suspensao 2, flexao-bola 2, panturrilha-bilateral-step 3, extensao-joelho-caneleira 2, elevacao-joelhos 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":60,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"quadril","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 3 dias · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os dias, com outro equivalente do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-martelo 2, abdominal-bola 2 | Corpo todo B (37 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-bola 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":3,"minutosSessao":45,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `prioridade.abaixo-com-tempo`

- **casa · iniciante · 2 dias · 90 min · prioridade ombros · sem dor**: ombro (lateral) (prioridade) com 5 de 8 séries e o dia mais longo em 72 de 90 min.
  - Programa: Corpo todo A (72 min): goblet 2, flexao 2, remada-unilateral-sem-banco 3, stiff 3, elevacao-halteres 4, triceps-frances-halter 3, panturrilha-chao 4, crucifixo-elastico 2, abdominal-chao 2 | Corpo todo B (67 min): afundo 2, flexao 2, remada-curvada-halteres 3, desenvolvimento-unilateral 2, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, crucifixo-invertido-curvado 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["ombros"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 90 min · prioridade ombros · sem dor**: ombro (lateral) (prioridade) com 5 de 8 séries e o dia mais longo em 73 de 90 min.
  - Programa: Corpo todo A (73 min): bulgaro 2, supino-reto 2, barra-fixa 3, stiff 3, elevacao-halteres 4, triceps-frances-halter 3, panturrilha 4, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (63 min): afundo 2, supino-inclinado 2, remada-apoiada 3, desenvolvimento 2, flexao-bola 3, extensao-joelho-caneleira 2, rosca-inclinada 3, crucifixo-inverso 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["ombros"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 90 min · prioridade ombros · sem dor**: ombro (lateral) (prioridade) com 5 de 8 séries e o dia mais longo em 74 de 90 min.
  - Programa: Corpo todo A (74 min): bulgaro 3, supino-reto 2, puxada-frente 3, stiff 3, elevacao-halteres 4, triceps-frances-halter 3, panturrilha-chao 4, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (61 min): afundo 3, supino-inclinado 2, remada-apoiada 3, desenvolvimento 2, flexao-bola 3, rosca-inclinada 3, crucifixo-inverso 3, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":["ombros"],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":false,"supervisao":false,"gravidez":false,"doenca-aguda":false}}}, CEN_55['condominio'].inventario)`

### `tempo.uso-baixo`

- **casa · iniciante · 2 dias · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 53 de 90 min (59%), sem o aviso de sobra.
  - Programa: Corpo todo A (37 min): goblet 2, stiff 3, panturrilha-chao 4, rosca-martelo 3, abdominal-chao 2 | Corpo todo B (53 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, aducao-deitado 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 48 de 75 min (64%), sem o aviso de sobra.
  - Programa: Corpo todo A (43 min): bulgaro 2, stiff 3, panturrilha 4, rosca-kettlebell 3, abdominal-bola 2 | Corpo todo B (48 min): afundo 2, flexao-bola 3, extensao-joelho-caneleira 2, rosca-alternada 3, abducao-caneleira 2, aducao-caneleira 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":75,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio · iniciante · 2 dias · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 45 de 75 min (60%), com o aviso de sobra.
  - Programa: Corpo todo A (42 min): bulgaro 3, stiff 3, panturrilha-chao 4, rosca-martelo 3, abdominal-bola 2 | Corpo todo B (45 min): afundo 3, ponte-gluteo-halter 2, flexao-bola 3, rosca-alternada 3, aducao-deitado 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":75,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio'].inventario)`

### `tempo.uso-baixo-sem-aviso`

- **casa · iniciante · 2 dias · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 53 de 90 min e não há aviso de sobra.
  - Programa: Corpo todo A (37 min): goblet 2, stiff 3, panturrilha-chao 4, rosca-martelo 3, abdominal-chao 2 | Corpo todo B (53 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, aducao-deitado 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":90,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa'].inventario)`
- **casa+ · iniciante · 2 dias · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 48 de 75 min e não há aviso de sobra.
  - Programa: Corpo todo A (43 min): bulgaro 2, stiff 3, panturrilha 4, rosca-kettlebell 3, abdominal-bola 2 | Corpo todo B (48 min): afundo 2, flexao-bola 3, extensao-joelho-caneleira 2, rosca-alternada 3, abducao-caneleira 2, aducao-caneleira 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":75,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['casa+'].inventario)`
- **condominio+ · iniciante · 2 dias · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo usa 48 de 75 min e não há aviso de sobra.
  - Programa: Corpo todo A (41 min): bulgaro 2, stiff 3, panturrilha 4, rosca-martelo 3, abdominal-bola 2 | Corpo todo B (48 min): afundo 2, hip-thrust 3, cadeira-flexora 3, cadeira-extensora 2, rosca-alternada 3, aducao-caneleira 2, abdominal-chao 2
  - Reproduzir: `gerarPrograma({"nivel":"iniciante","semanasParado":0,"diasSemana":2,"minutosSessao":75,"prioridades":[],"evitarExercicios":[],"evitarEquipamentos":[],"triagem":{"respostas":{"coracao":false,"peito":false,"tontura":false,"doenca-cronica":false,"medicamento":false,"osteoarticular":true,"supervisao":false,"gravidez":false,"doenca-aguda":false},"dores":[{"articulacao":"ombro","nota":7}]}}, CEN_55['condominio+'].inventario)`

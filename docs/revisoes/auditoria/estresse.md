# Teste de estresse do gerador (auditoria do treino)

> Gerado por `npm run auditoria:estresse`. Dados fictícios (`scripts/auditoria/cenarios.ts`). Não editar à mão.

**149.760 programas** (13 cenários × 3 níveis × 12 divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor); 0 bloqueados.

## Problemas encontrados (contagem de ocorrências)

| problema | ocorrências |
| --- | ---: |
| `monotonia.repete-com-opcao` | 62.698 |
| `tempo.sobra-com-meta-abaixo` | 41.560 |
| `monotonia.todos-os-dias` | 23.357 |
| `volume.abaixo-sem-aviso` | 23.040 |
| `volume.excesso.gluteos` | 4.581 |
| `volume.excesso.triceps` | 2.465 |
| `volume.excesso.peito` | 2.203 |
| `volume.excesso.biceps` | 1.672 |
| `volume.excesso.quadriceps` | 1.464 |
| `volume.zero.costas` | 1.440 |
| `equilibrio.sem-puxar` | 1.440 |
| `volume.excesso.ombro_posterior` | 1.400 |
| `volume.excesso.posteriores` | 1.068 |
| `volume.excesso.costas` | 1.029 |
| `volume.zero.posteriores` | 180 |
| `volume.excesso.ombro_lateral` | 48 |
| `volume.excesso.panturrilha` | 18 |

## Volume: % dos programas com o músculo abaixo do limiar

Limiar: a meta, se o músculo é prioridade; senão, 4 séries (o piso do mínimo eficaz).

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 40.9% | 47.3% | 51.4% | 28.2% | 26.6% | 53.4% | 41.7% | 35.2% | 16.7% | 30.8% | 32.3% |
| casa+ | 37.7% | 46.4% | 51.2% | 28.7% | 25.4% | 51.5% | 40.4% | 35.3% | 12.1% | 30.8% | 32.2% |
| condominio | 38.6% | 46.5% | 50.9% | 27.9% | 25.1% | 52.8% | 51% | 39.9% | 9.5% | 29.4% | 32.1% |
| condominio+ | 37% | 46.5% | 51.2% | 28.7% | 25.4% | 52.9% | 39.9% | 33.3% | 15.3% | 30.7% | 32% |
| academia | 38.2% | 47.2% | 51.5% | 28.7% | 26.6% | 34.5% | 39% | 31.9% | 15% | 31.2% | 31.6% |
| academia+ | 38.2% | 47.2% | 51.4% | 28.7% | 26.6% | 34.5% | 38.8% | 31.8% | 15% | 31.1% | 31.6% |
| peso-corpo | 44.8% | 100% | 100% | 100% | 100% | 51.8% | 43% | 41.8% | 8.2% | 34.2% | 30.9% |
| elasticos | 40.9% | 48% | 52.2% | 28.2% | 29.7% | 53.7% | 41.5% | 37.6% | 16.9% | 45.5% | 32.4% |
| halteres | 48.8% | 68.7% | 48.5% | 51.5% | 27.3% | 47.5% | 47.6% | 35.7% | 10.1% | 28.9% | 32.1% |
| halteres-banco | 38.5% | 68.8% | 49.1% | 52% | 27.6% | 52.3% | 47.9% | 36% | 10.5% | 29.2% | 32.2% |
| diego | 40.7% | 47.9% | 52.2% | 28.2% | 29.3% | 53.6% | 41.5% | 37.5% | 16.8% | 45.5% | 32.4% |
| bruno | 38.7% | 47.5% | 51.6% | 28.7% | 26.8% | 34.6% | 42.6% | 36.5% | 13% | 32.4% | 31.8% |
| bairro | 38.6% | 46.4% | 51.2% | 28.7% | 25.3% | 52.8% | 39.1% | 32.4% | 15.1% | 30.2% | 31.9% |

### Sem dor e com 45 min ou mais

Prioritário abaixo da meta (% dos programas em que o músculo é prioridade) / demais abaixo de 4 séries (% dos outros).

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 13.1% / 0% | 17.7% / 0% | 40.9% / 2.3% | 0% / 2.1% | 15.5% / 0.5% | 31.5% / 0% | 25.5% / 0% | 31.8% / 0% | 26.9% / 7.4% | 44.4% / 0% | 42.1% / 0% |
| casa+ | 12.3% / 0% | 15.4% / 0% | 40% / 2.3% | 0% / 2.1% | 12% / 0.5% | 23.8% / 0% | 20.1% / 0% | 33.5% / 0% | 18.5% / 0% | 43.8% / 0% | 39.4% / 0% |
| condominio | 9.4% / 0% | 16% / 0% | 38.7% / 2.3% | 0% / 1.1% | 11.6% / 0% | 29.9% / 0% | 51.1% / 0% | 45.7% / 0% | 6.7% / 0% | 39.7% / 0% | 39.8% / 0% |
| condominio+ | 10.2% / 0% | 16% / 0% | 40% / 2.3% | 0% / 2.1% | 12.5% / 0.5% | 30.6% / 0% | 18.5% / 0% | 25.6% / 0% | 19.4% / 7.4% | 43.5% / 0% | 38.9% / 0% |
| academia | 12.8% / 0% | 16.2% / 0% | 40.1% / 2.3% | 0% / 2.1% | 12.7% / 0.5% | 23.1% / 0% | 16.4% / 0% | 22.5% / 0% | 17.1% / 7.4% | 42.1% / 0% | 37.5% / 0% |
| academia+ | 12.8% / 0% | 16.2% / 0% | 40.1% / 2.3% | 0% / 2.1% | 12.7% / 0.5% | 23.1% / 0% | 16.4% / 0% | 22.5% / 0% | 17.1% / 7.4% | 42.1% / 0% | 37.5% / 0% |
| peso-corpo | 11.1% / 0% | 100% / 100% | 100% / 100% | 0% / 100% | 100% / 100% | 48.1% / 0% | 29% / 0% | 26.9% / 0% | 8.3% / 0% | 55.6% / 0% | 27.3% / 0% |
| elasticos | 12.3% / 0% | 19.3% / 0% | 41.7% / 2.3% | 0% / 2.1% | 28.9% / 0.5% | 32.6% / 0% | 24.7% / 0% | 31.3% / 0% | 29.2% / 7.4% | 74.5% / 0% | 42.6% / 0% |
| halteres | 13.7% / 0% | 17.9% / 0% | 37.8% / 1.4% | 0% / 1.1% | 12.7% / 0% | 14.6% / 0% | 43.2% / 0% | 35.6% / 0% | 10.6% / 0% | 39.4% / 0% | 42.1% / 0% |
| halteres-banco | 11.4% / 0% | 18.2% / 0% | 38.7% / 2.3% | 0% / 1.1% | 14.4% / 0% | 30.6% / 0% | 43.7% / 0% | 36% / 0% | 11.8% / 0% | 40.3% / 0% | 42.1% / 0% |
| diego | 12.3% / 0% | 19% / 0% | 41.5% / 2.3% | 0% / 2.1% | 26.9% / 0.5% | 31.9% / 0% | 24.5% / 0% | 31% / 0% | 28.5% / 7.4% | 74.5% / 0% | 42.6% / 0% |
| bruno | 14.5% / 0% | 17.7% / 0% | 40.1% / 2.3% | 0% / 2.1% | 14.4% / 0.5% | 24.5% / 0% | 25% / 0% | 34.9% / 0% | 20.4% / 0% | 44.8% / 0% | 38.9% / 0% |
| bairro | 9.9% / 0% | 15.4% / 0% | 40% / 2.3% | 0% / 2.1% | 12% / 0.5% | 30.6% / 0% | 16.4% / 0% | 23.8% / 0% | 18.3% / 7.4% | 42.6% / 0% | 38% / 0% |

### Motivo do aviso "abaixo da meta" (sem dor, 45 min ou mais)

| músculo | motivo | avisos |
| --- | --- | ---: |
| panturrilha | outro | 2.752 |
| ombro (lateral) | outro | 2.210 |
| quadríceps | outro | 1.624 |
| posteriores da coxa | outro | 1.415 |
| tríceps | outro | 1.190 |
| panturrilha | minutos (exercícios por treino) | 1.188 |
| costas | nenhum exercício possível | 1.080 |
| ombro (lateral) | nenhum exercício possível | 1.080 |
| ombro (posterior) | nenhum exercício possível | 1.080 |
| bíceps | nenhum exercício possível | 1.080 |
| costas | outro | 1.064 |
| posteriores da coxa | corte de tempo | 919 |
| ombro (lateral) | minutos (exercícios por treino) | 887 |
| glúteos | corte de tempo | 841 |
| quadríceps | corte de tempo | 672 |
| abdômen | outro | 644 |
| peito | minutos (exercícios por treino) | 401 |
| bíceps | minutos (exercícios por treino) | 388 |
| peito | outro | 359 |
| abdômen | minutos (exercícios por treino) | 348 |
| tríceps | minutos (exercícios por treino) | 288 |
| bíceps | corte de tempo | 275 |
| costas | corte de tempo | 266 |
| posteriores da coxa | minutos (exercícios por treino) | 265 |
| glúteos | divisão sem vaga própria | 252 |
| peito | corte de tempo | 251 |
| glúteos | minutos (exercícios por treino) | 249 |
| ombro (posterior) | minutos (exercícios por treino) | 243 |
| bíceps | outro | 169 |
| tríceps | corte de tempo | 142 |
| panturrilha | corte de tempo | 125 |
| abdômen | corte de tempo | 107 |
| ombro (lateral) | divisão sem vaga própria | 70 |
| ombro (lateral) | corte de tempo | 57 |

### Séries semanais, média por cenário

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 7,1 | 6,1 | 5,3 | 5,2 | 7,3 | 5 | 7,1 | 7,7 | 9,1 | 7,2 | 4,2 |
| casa+ | 7 | 6 | 5,3 | 5,2 | 7,4 | 5,2 | 7,1 | 7,7 | 10 | 7,3 | 4,2 |
| condominio | 7,6 | 6 | 5,4 | 5,5 | 7,6 | 5,2 | 6,6 | 8,1 | 12 | 7,8 | 4,2 |
| condominio+ | 7,7 | 6 | 5,3 | 5,2 | 7,4 | 5,2 | 7,1 | 7,8 | 9,1 | 7,3 | 4,2 |
| academia | 7 | 6,1 | 5,3 | 5,2 | 7,3 | 6,8 | 7 | 7,7 | 8,7 | 7,2 | 4,3 |
| academia+ | 7 | 6,1 | 5,3 | 5,2 | 7,3 | 6,8 | 7 | 7,7 | 8,7 | 7,2 | 4,3 |
| peso-corpo | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,5 | 7,3 | 12,1 | 8,2 | 4,7 |
| elasticos | 7,1 | 6,7 | 5,2 | 5,1 | 7,2 | 5 | 7 | 7,4 | 9,1 | 6 | 4,2 |
| halteres | 6,2 | 3,7 | 6 | 3,8 | 7,6 | 6,1 | 6,8 | 8,3 | 11,8 | 8 | 4,2 |
| halteres-banco | 7,3 | 3,6 | 5,7 | 3,5 | 7,1 | 5,2 | 6,7 | 8,2 | 11,7 | 7,9 | 4,2 |
| diego | 7,2 | 6,7 | 5,3 | 5,1 | 7,3 | 5 | 7 | 7,4 | 9,1 | 6 | 4,2 |
| bruno | 7 | 6,1 | 5,3 | 5,1 | 7,3 | 6,7 | 6,9 | 7,6 | 9,7 | 7,1 | 4,2 |
| bairro | 7,5 | 6 | 5,3 | 5,2 | 7,4 | 5,2 | 7,1 | 7,8 | 9,1 | 7,3 | 4,2 |

## Equilíbrio

- Séries de puxar ÷ séries de empurrar: mediana 1 (10% dos programas abaixo de 0.75, 10% acima de 1.56).
- Posteriores ÷ quadríceps (volume semanal): mediana 1 (p10 0.67, p90 1).

## Escolha

### Os 25 exercícios que mais aparecem como vaga

| exercício | vezes | guia |
| --- | ---: | --- |
| elevacao-halteres | 156.323 | animação |
| abdominal-chao | 155.016 | animação |
| panturrilha-chao | 153.881 | animação |
| ponte-gluteo-halter | 108.736 | sem animação |
| stiff | 101.800 | animação |
| flexao | 90.726 | animação |
| afundo | 87.292 | animação |
| supino-reto | 86.540 | animação |
| aducao-deitado | 84.169 | animação |
| crucifixo-halteres | 68.637 | sem animação |
| cadeira-flexora | 65.197 | sem animação |
| rosca-inclinada | 64.279 | animação |
| rosca-alternada | 63.642 | animação |
| flexao-joelho-elastico | 62.445 | animação |
| remada-apoiada | 60.800 | animação |
| triceps-frances-halter | 59.740 | animação |
| supino-inclinado | 58.650 | animação |
| abducao-deitado | 58.277 | animação |
| panturrilha | 53.762 | animação |
| flexao-joelho-deslizante | 50.885 | animação |
| panturrilha-sentada-halter | 49.823 | animação |
| ponte-gluteo | 49.698 | animação |
| crucifixo-inverso | 49.647 | sem animação |
| stiff-unilateral | 48.684 | animação |
| cadeira-extensora | 47.988 | sem animação |

### Possíveis que nunca aparecem como vaga, por cenário

| cenário | possíveis | aparecem | nunca como vaga | nem como alternativa |
| --- | ---: | ---: | --- | --- |
| casa | 43 | 32 | flexao-elastico, elevacao-lateral-elastico, rosca-elastico, triceps-elastico-acima, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, supino-chao-halteres | — |
| casa+ | 79 | 44 | flexao, flexao-elastico, puxada-elastico, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, goblet-kettlebell, remada-suspensao, remada-curvada-halteres, supino-chao-halteres, flexao-fechada, pike, flexao-joelho-deslizante, nordico, remada-unilateral-sem-banco, rosca-suspensao, yt-suspensao, flexao-joelho-suspensao, bulgaro-suspensao, ponte-pes-bola, abducao-mini-band, abducao-deitado, aducao-deitado, extensao-joelho-elastico | — |
| condominio | 44 | 35 | flexao, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, remada-curvada-halteres, supino-chao-halteres, pike, ponte-pes-bola | — |
| condominio+ | 83 | 44 | flexao, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, goblet-kettlebell, remada-curvada-halteres, supino-chao-halteres, pike, flexao-joelho-deslizante, nordico, ponte-pes-bola, extensao-joelho-caneleira, abducao-mini-band, remada-unilateral-kettlebell, stiff-kettlebell, rosca-kettlebell, triceps-frances-kettlebell, afundo-kettlebell, desenvolvimento-unilateral-kettlebell, ponte-kettlebell, abducao-deitado, aducao-deitado, extensao-joelho-elastico | — |
| academia | 102 | 65 | supino-polia, flexao, barra-fixa, barra-fixa-supinada, remada-barra, remada-invertida, desenvolvimento-unilateral, rosca-barra-w, goblet, agachamento-halteres, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, elevacao-joelhos, abdominal-chao, terra-hexagonal, mergulho, mergulho-graviton, barra-fixa-graviton, remada-baixa-estacao, hiperextensao, remada-curvada-halteres, crucifixo-invertido-curvado, ponte-gluteo-halter, supino-chao-halteres, flexao-fechada, pike, flexao-joelho-deslizante, nordico, remada-unilateral-sem-banco, triceps-frances-polia-unilateral, remada-unilateral-polia, elevacao-joelhos-paralelas, abducao-deitado, aducao-deitado | — |
| academia+ | 139 | 70 | supino-polia, flexao, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-invertida, remada-elastico, desenvolvimento-unilateral, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-barra-w, rosca-elastico, triceps-elastico-acima, goblet, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, bulgaro, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, flexao-bola, flexao-joelho-elastico, elevacao-joelhos, abdominal-declinado, abdominal-chao, terra-hexagonal, goblet-kettlebell, mergulho, mergulho-graviton, barra-fixa-graviton, remada-baixa-estacao, remada-suspensao, hiperextensao, remada-curvada-halteres, crucifixo-invertido-curvado, ponte-gluteo-halter, supino-chao-halteres, flexao-fechada, pike, flexao-joelho-deslizante, nordico, remada-unilateral-sem-banco, triceps-frances-polia-unilateral, remada-unilateral-polia, rosca-suspensao, yt-suspensao, triceps-suspensao, flexao-joelho-suspensao, bulgaro-suspensao, elevacao-joelhos-paralelas, abdominal-bola, ponte-pes-bola, extensao-joelho-caneleira, abducao-caneleira, aducao-caneleira, abducao-mini-band, roda-abdominal, remada-unilateral-kettlebell, triceps-frances-kettlebell, abducao-deitado, aducao-deitado, extensao-joelho-elastico | — |
| peso-corpo | 13 | 13 | — | — |
| elasticos | 26 | 25 | flexao-elastico | — |
| halteres | 30 | 26 | agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo | — |
| halteres-banco | 34 | 28 | flexao, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, supino-chao-halteres | — |
| diego | 29 | 27 | flexao-elastico, puxada-elastico | — |
| bruno | 83 | 47 | supino-polia, flexao, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, elevacao-joelhos, abdominal-declinado, abdominal-chao, remada-curvada-halteres, crucifixo-invertido-curvado, supino-chao-halteres, flexao-fechada, pike, flexao-joelho-deslizante, nordico, remada-unilateral-sem-banco, triceps-frances-polia-unilateral, remada-unilateral-polia, abdominal-bola, ponte-pes-bola | — |
| bairro | 48 | 38 | flexao, agachamento-halteres, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, remada-curvada-halteres, supino-chao-halteres, pike | — |

### Funções sem opção ou com uma só (nível intermediário, sem dor)

| cenário | empurrar-horizontal | empurrar-inclinado | crucifixo | puxar-vertical | puxar-horizontal | empurrar-vertical | elevacao-lateral | ombro-posterior | biceps | triceps-acima-cabeca | triceps-complemento | agachar | afundo | extensora | flexao-joelho | dobrar-quadril | extensao-quadril | abducao | aducao | panturrilha-em-pe | panturrilha-sentada | abdomen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| casa | 3 (nível 2) | 3 (nível 3) | 1 (nível 2) | 3 (nível 2) | 3 (nível 1) | 3 (nível 1) | 2 (nível 1) | 2 (nível 1) | 3 (nível 2) | 2 (nível 1) | 1 (nível 3) | 4 (nível 2) | 4 (nível 1) | 1 (nível 2) | 3 (nível 3) | 3 (nível 1) | 2 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | 1 (nível 2) | 1 (nível 2) |
| casa+ | 4 (nível 1) | 6 (nível 1) | 2 (nível 1) | 8 (nível 1) | 7 (nível 1) | 5 (nível 1) | 2 (nível 1) | 4 (nível 1) | 6 (nível 1) | 4 (nível 1) | 2 (nível 2) | 6 (nível 2) | 7 (nível 1) | 2 (nível 2) | 5 (nível 3) | 4 (nível 1) | 4 (nível 2) | 3 (nível 2) | 2 (nível 2) | 3 (nível 1) | 1 (nível 2) | 4 (nível 2) |
| condominio | 3 (nível 1) | 5 (nível 1) | 1 (nível 1) | 4 (nível 1) | 5 (nível 1) | 3 (nível 1) | 1 (nível 1) | 2 (nível 1) | 3 (nível 1) | 1 (nível 1) | 1 (nível 3) | 4 (nível 2) | 5 (nível 1) | nenhuma | 3 (nível 3) | 2 (nível 1) | 3 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | 1 (nível 2) | 2 (nível 2) |
| condominio+ | 5 (nível 1) | 8 (nível 1) | 3 (nível 1) | 8 (nível 1) | 8 (nível 1) | 5 (nível 1) | 2 (nível 1) | 3 (nível 1) | 6 (nível 1) | 3 (nível 1) | 1 (nível 3) | 6 (nível 2) | 6 (nível 1) | 3 (nível 1) | 5 (nível 1) | 5 (nível 1) | 5 (nível 1) | 3 (nível 2) | 2 (nível 2) | 3 (nível 1) | 1 (nível 2) | 4 (nível 2) |
| academia | 9 (nível 1) | 13 (nível 1) | 4 (nível 1) | 10 (nível 1) | 10 (nível 1) | 5 (nível 1) | 2 (nível 1) | 4 (nível 1) | 8 (nível 1) | 3 (nível 1) | 5 (nível 1) | 9 (nível 1) | 5 (nível 1) | 1 (nível 1) | 4 (nível 1) | 5 (nível 1) | 6 (nível 1) | 3 (nível 1) | 2 (nível 1) | 5 (nível 1) | 2 (nível 1) | 5 (nível 1) |
| academia+ | 10 (nível 1) | 14 (nível 1) | 5 (nível 1) | 13 (nível 1) | 13 (nível 1) | 7 (nível 1) | 3 (nível 1) | 7 (nível 1) | 11 (nível 1) | 6 (nível 1) | 6 (nível 1) | 11 (nível 1) | 7 (nível 1) | 3 (nível 1) | 7 (nível 1) | 7 (nível 1) | 8 (nível 1) | 5 (nível 1) | 3 (nível 1) | 5 (nível 1) | 2 (nível 1) | 8 (nível 1) |
| peso-corpo | 1 (nível 2) | 1 (nível 3) | nenhuma | nenhuma | nenhuma | 1 (nível 3) | nenhuma | nenhuma | nenhuma | nenhuma | 1 (nível 3) | 1 (nível 3) | 2 (nível 2) | nenhuma | 2 (nível 4) | 0 (via flexao-joelho) | 1 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | nenhuma | 1 (nível 2) |
| elasticos | 2 (nível 2) | 2 (nível 3) | 1 (nível 2) | 1 (nível 3) | 1 (nível 3) | 2 (nível 2) | 1 (nível 2) | 1 (nível 2) | 1 (nível 3) | 1 (nível 1) | 1 (nível 3) | 2 (nível 3) | 2 (nível 2) | 1 (nível 2) | 3 (nível 3) | 1 (nível 3) | 1 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | nenhuma | 1 (nível 2) |
| halteres | 2 (nível 2) | 2 (nível 3) | nenhuma | 2 (nível 2) | 2 (nível 1) | 2 (nível 1) | 1 (nível 1) | 1 (nível 1) | 2 (nível 2) | 1 (nível 1) | 1 (nível 3) | 3 (nível 2) | 4 (nível 1) | nenhuma | 2 (nível 4) | 2 (nível 1) | 2 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | 1 (nível 2) | 1 (nível 2) |
| halteres-banco | 3 (nível 1) | 4 (nível 2) | 1 (nível 1) | 3 (nível 2) | 3 (nível 1) | 2 (nível 1) | 1 (nível 1) | 1 (nível 1) | 2 (nível 2) | 1 (nível 1) | 1 (nível 3) | 4 (nível 2) | 5 (nível 1) | nenhuma | 2 (nível 4) | 2 (nível 1) | 2 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | 1 (nível 2) | 1 (nível 2) |
| diego | 2 (nível 2) | 2 (nível 3) | 1 (nível 2) | 3 (nível 1) | 1 (nível 3) | 2 (nível 2) | 1 (nível 2) | 1 (nível 2) | 1 (nível 3) | 1 (nível 1) | 1 (nível 3) | 2 (nível 3) | 2 (nível 2) | 1 (nível 2) | 3 (nível 3) | 1 (nível 3) | 1 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | nenhuma | 2 (nível 2) |
| bruno | 5 (nível 1) | 10 (nível 1) | 4 (nível 1) | 8 (nível 1) | 8 (nível 1) | 4 (nível 1) | 3 (nível 1) | 5 (nível 1) | 6 (nível 1) | 4 (nível 1) | 3 (nível 1) | 5 (nível 2) | 5 (nível 1) | 1 (nível 2) | 4 (nível 3) | 5 (nível 1) | 4 (nível 1) | 1 (nível 3) | 1 (nível 3) | 3 (nível 1) | 1 (nível 2) | 5 (nível 1) |
| bairro | 4 (nível 1) | 5 (nível 1) | 1 (nível 1) | 5 (nível 1) | 4 (nível 1) | 3 (nível 1) | 1 (nível 1) | 2 (nível 1) | 3 (nível 1) | 1 (nível 1) | 2 (nível 2) | 5 (nível 1) | 5 (nível 1) | 1 (nível 1) | 3 (nível 1) | 2 (nível 1) | 2 (nível 2) | 1 (nível 3) | 1 (nível 3) | 2 (nível 1) | 1 (nível 2) | 3 (nível 2) |

## Monotonia

- Programas de 3 dias ou mais com um exercício (fora o abdominal) em **todos** os dias: 23.357 de 137.280 (17%).
- Programas que repetem um exercício em 2 dias ou mais com outro do mesmo nível da função possível e sem uso: 62.698 (45.7%).

## Tempo

- Dias acima dos minutos: 61.353 de 624.000 (9.8%); **sem aviso: 0**.
- Programas cujo dia mais longo usa menos de 70% dos minutos: 48.065 (32.1%); destes, 0 ainda dizem que a meta ficou de fora "porque cabem cerca de N exercícios".

| minutos | programas | dia mais longo (mediana, min) | sobra > 30% |
| ---: | ---: | ---: | ---: |
| 20 | 18720 | 29 | 0% |
| 30 | 18720 | 32 | 0% |
| 45 | 18720 | 44 | 0.6% |
| 60 | 18720 | 58 | 5.6% |
| 75 | 18720 | 64 | 24.6% |
| 90 | 18720 | 65 | 46% |
| 120 | 18720 | 65 | 82.6% |
| 150 | 18720 | 65 | 97.4% |

## Segurança

- Programas com uma região acima de 5: 112.320. Exercício que carrega a região marcada no dado: **0**.
- Exercício que, pelo padrão de movimento, carrega a região com dor > 5, mas o dado não marca (fica no programa): 0 ocorrências.
- Dor de 3 a 5 sem lembrete: 0; com um equivalente do mesmo nível que poupava a região e ficou de fora: 0.

| exercício : região que falta | ocorrências |
| --- | ---: |

## Treino do dia num 2º local

- 60 dias testados, 247 trocas por equivalente, 0 vagas que ficaram de fora no dia.

## Exemplos (3 por problema, de cenários diferentes)

### `equilibrio.sem-puxar`

- **peso-corpo · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `monotonia.repete-com-opcao`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · ombro 7**: ponte-gluteo-halter em 2 dias (extensao-quadril), com ponte-gluteo do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (19 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2 | Corpo todo B (29 min): stiff 4, extensao-joelho-elastico 2, panturrilha-chao 2+drop, rosca-alternada 3+drop | Corpo todo C (25 min): afundo 2, ponte-gluteo-halter 2, abdominal-chao 4
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade nenhuma · ombro 4**: abdominal-bola em 2 dias (abdomen), com elevacao-joelhos do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (49 min): bulgaro 2, supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, abdominal-bola 2 | Corpo todo B (58 min): stiff 2, supino-inclinado 2, remada-apoiada 2, extensao-joelho-caneleira 2, rosca-inclinada 3, panturrilha 4, crucifixo-inverso 3, abdominal-chao 2 | Corpo todo C (52 min): afundo 2, supino-reto 2, barra-fixa-supinada 2, ponte-kettlebell 2, elevacao-halteres 3, triceps-suspensao 2, flexao-joelho-elastico 2, abdominal-bola 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · ombro 7**: ponte-gluteo-halter em 2 dias (extensao-quadril), com ponte-gluteo, ponte-pes-bola do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (20 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2 | Corpo todo B (23 min): stiff 4, panturrilha-chao 2+drop, rosca-alternada 3+drop | Corpo todo C (32 min): afundo 4, ponte-gluteo-halter 2, abdominal-bola 4

### `monotonia.todos-os-dias`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade nenhuma · sem dor**: flexao em todos os 3 dias.
  - Programa: Corpo todo A (30 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, abdominal-chao 4 | Corpo todo B (34 min): stiff 4, flexao 2, remada-curvada-halteres 2, panturrilha-chao 3+drop | Corpo todo C (21 min): afundo 2, flexao 2, remada-unilateral-sem-banco 2
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade superior · joelho 7 + lombar 7**: rosca-inclinada em todos os 3 dias.
  - Programa: Corpo todo A (39 min): supino-reto 2, barra-fixa 3, triceps-frances-halter 2, elevacao-halteres 4, crucifixo-halteres 2, rosca-inclinada 2 | Corpo todo B (44 min): supino-inclinado 2, remada-apoiada 3, desenvolvimento 2, rosca-inclinada 2, panturrilha 4, crucifixo-inverso 2 | Corpo todo C (44 min): supino-reto 2, barra-fixa-supinada 2, ponte-kettlebell 4, elevacao-halteres 3, triceps-suspensao 2, rosca-inclinada 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os 3 dias.
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-martelo 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 4, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-bola 2

### `tempo.sobra-com-meta-abaixo`

- **casa · iniciante · Corpo todo A/B (2 dias) · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 53 de 90 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (37 min): goblet 2, stiff 3, panturrilha-chao 4, rosca-martelo 3, abdominal-chao 2 | Corpo todo B (53 min): afundo 2, ponte-gluteo-halter 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, aducao-deitado 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 48 de 75 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (43 min): bulgaro 2, stiff 3, panturrilha 4, rosca-kettlebell 3, abdominal-bola 2 | Corpo todo B (48 min): afundo 2, flexao-bola 3, extensao-joelho-caneleira 2, rosca-alternada 3, abducao-caneleira 2, aducao-caneleira 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B (2 dias) · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 58 de 90 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (39 min): bulgaro 2, stiff 3, panturrilha-chao 4, rosca-martelo 3, abdominal-bola 2 | Corpo todo B (58 min): afundo 4, goblet 2, ponte-gluteo-halter 2, flexao-bola 4, rosca-alternada 4, aducao-deitado 2, abdominal-chao 2

### `volume.abaixo-sem-aviso`

- **peso-corpo · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.excesso.biceps`

- **casa · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade nenhuma · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (42 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-elastico 2, rosca-alternada 2 | Corpo todo B (55 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, desenvolvimento-elastico 2, rosca-alternada 2, panturrilha-chao 3, face-pull-elastico 2, aducao-deitado 2 | Corpo todo C (45 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, flexao-fechada 2, elevacao-halteres 2, panturrilha-sentada-halter 3, rosca-martelo 2 | Corpo todo D (52 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, pike 2, rosca-martelo 2, face-pull-elastico 2, elevacao-halteres 2, aducao-deitado 2
- **casa+ · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade nenhuma · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (39 min): supino-reto 2, barra-fixa 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2, abducao-caneleira 2, rosca-inclinada 2 | Corpo todo B (55 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, desenvolvimento 2, rosca-inclinada 2, panturrilha 3, crucifixo-inverso 2, aducao-caneleira 2 | Corpo todo C (43 min): supino-reto 2, barra-fixa-supinada 2, ponte-kettlebell 2, elevacao-halteres 2, triceps-suspensao 2, panturrilha-bilateral-step 3, rosca-inclinada 2 | Corpo todo D (50 min): supino-inclinado 2, remada-apoiada 2, desenvolvimento 2, rosca-inclinada 2, crucifixo-inverso 2, elevacao-halteres 2, abducao-caneleira 2, aducao-caneleira 2
- **condominio · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade nenhuma · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (41 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2, rosca-inclinada 2 | Corpo todo B (50 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, rosca-inclinada 2, panturrilha-chao 4, crucifixo-inverso 2, aducao-deitado 2 | Corpo todo C (44 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, flexao-fechada 2, elevacao-halteres 2, panturrilha-sentada-halter 3, rosca-inclinada 2 | Corpo todo D (54 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, desenvolvimento 2, rosca-inclinada 2, crucifixo-inverso 2, elevacao-halteres 3, aducao-deitado 2

### `volume.excesso.costas`

- **casa · iniciante · Corpo todo 5x (5 dias) · 30 min · prioridade nenhuma · joelho 7 + lombar 7**: costas sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (23 min): flexao 2, puxada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2 | Corpo todo B (28 min): flexao 2, remada-elastico 2, rosca-alternada 2, panturrilha-chao 4 | Corpo todo C (30 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 4, elevacao-halteres 2 | Corpo todo D (23 min): flexao 2, puxada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2 | Corpo todo E (23 min): flexao 2, remada-elastico 2, rosca-martelo 2, face-pull-elastico 2
- **casa+ · iniciante · Superior/Inferior (3x) (6 dias) · 20 min · prioridade nenhuma · sem dor**: costas sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (18 min): supino-reto 2, barra-fixa 2, remada-apoiada 2 | Inferior A (24 min): bulgaro 2, stiff 2, abdominal-bola 4 | Superior B (19 min): supino-inclinado 2, remada-unilateral-halter 2, barra-fixa-supinada 2 | Inferior B (26 min): afundo 2, ponte-kettlebell 2, panturrilha 3+drop | Superior C (18 min): supino-reto 2, barra-fixa 2, remada-apoiada 2 | Inferior C (20 min): afundo-kettlebell 2, ponte-gluteo-halter 2, flexao-bola 2
- **condominio · iniciante · Superior/Inferior (3x) (6 dias) · 20 min · prioridade nenhuma · sem dor**: costas sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (18 min): supino-reto 2, puxada-frente 2, remada-apoiada 2 | Inferior A (24 min): bulgaro 2, stiff 2, abdominal-bola 4 | Superior B (19 min): supino-inclinado 2, remada-unilateral-halter 2, puxada-frente 2 | Inferior B (23 min): afundo 2, ponte-gluteo-halter 2, panturrilha-chao 3+drop | Superior C (18 min): supino-reto 2, puxada-frente 2, remada-baixa-estacao 2 | Inferior C (20 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-bola 2

### `volume.excesso.gluteos`

- **casa · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · ombro 7**: glúteos sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (28 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, panturrilha-sentada-halter 3, rosca-martelo 2, abdominal-chao 2 | Corpo todo D (37 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, rosca-martelo 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade misto · ombro 7**: glúteos sem prioridade com 11.5 séries (máximo do nível 10).
  - Programa: Corpo todo A (37 min): bulgaro 3, flexao-bola 3, rosca-kettlebell 2, abducao-caneleira 2, abdominal-bola 2 | Corpo todo B (59 min): stiff 3, ponte-gluteo-halter 2, extensao-joelho-caneleira 3, panturrilha 3, panturrilha-sentada-halter 3, rosca-alternada 2, aducao-caneleira 2, abdominal-chao 2 | Corpo todo C (35 min): afundo 2, ponte-kettlebell 2, panturrilha-bilateral-step 2, flexao-joelho-elastico 2, rosca-martelo 2, abdominal-bola 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade nenhuma · ombro 7**: glúteos sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-martelo 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 4, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-sentada-halter 3, rosca-alternada 2, abdominal-bola 2

### `volume.excesso.ombro_lateral`

- **halteres · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · lombar 7**: ombro (lateral) sem prioridade com 13 séries (máximo do nível 10).
  - Programa: Superior A (32 min): flexao 2, pike 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 4 | Inferior A (28 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-chao 4 | Superior B (28 min): flexao 2, flexao-fechada 2, pike 2, elevacao-halteres 2, rosca-martelo 2 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-chao 2, elevacao-halteres 2 | Superior C (27 min): flexao 2, pike 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2 | Inferior C (30 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-chao 2, elevacao-halteres 2
- **halteres-banco · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · lombar 7**: ombro (lateral) sem prioridade com 13 séries (máximo do nível 10).
  - Programa: Superior A (32 min): supino-reto 2, pike 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-halteres 2 | Inferior A (30 min): bulgaro 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-chao 4 | Superior B (27 min): supino-reto 2, flexao-fechada 2, pike 2, elevacao-halteres 2, rosca-martelo 2 | Inferior B (30 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-chao 2, elevacao-halteres 2 | Superior C (32 min): supino-reto 2, pike 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-halteres 2 | Inferior C (30 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-chao 2, elevacao-halteres 2

### `volume.excesso.ombro_posterior`

- **casa · iniciante · Superior/Inferior (3x) (6 dias) · 60 min · prioridade nenhuma · sem dor**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (44 min): flexao 2, remada-unilateral-sem-banco 2, remada-curvada-halteres 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-elastico 2, crucifixo-invertido-curvado 2 | Inferior A (36 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 2, abdominal-chao 2 | Superior B (39 min): flexao 2, remada-unilateral-sem-banco 2, remada-curvada-halteres 2, flexao-fechada 2, elevacao-halteres 2, rosca-martelo 2, crucifixo-invertido-curvado 2 | Inferior B (45 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 2, abdominal-chao 2 | Superior C (44 min): flexao 2, remada-unilateral-sem-banco 2, remada-curvada-halteres 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-elastico 2, crucifixo-invertido-curvado 2 | Inferior C (44 min): afundo-tras 2, ponte-gluteo-halter 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 2, abdominal-chao 2
- **casa+ · iniciante · Superior/Inferior (3x) (6 dias) · 60 min · prioridade nenhuma · sem dor**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (42 min): supino-reto 2, barra-fixa 2, remada-apoiada 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior A (36 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 2, abdominal-bola 2 | Superior B (38 min): supino-inclinado 2, remada-unilateral-halter 2, barra-fixa-supinada 2, elevacao-halteres 2, rosca-inclinada 2, triceps-suspensao 2, crucifixo-inverso 2 | Inferior B (42 min): afundo 2, ponte-kettlebell 2, stiff-kettlebell 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 2, abdominal-chao 2 | Superior C (42 min): supino-reto 2, barra-fixa 2, remada-apoiada 2, triceps-frances-kettlebell 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior C (44 min): afundo-kettlebell 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 2, elevacao-joelhos 2
- **condominio · iniciante · Superior/Inferior (3x) (6 dias) · 60 min · prioridade nenhuma · sem dor**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (42 min): supino-reto 2, puxada-frente 2, remada-apoiada 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior A (34 min): bulgaro 2, stiff 2, flexao-bola 2, panturrilha-chao 4, abdominal-bola 2 | Superior B (39 min): supino-inclinado 2, remada-unilateral-halter 2, puxada-frente 2, flexao-fechada 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-inverso 2 | Inferior B (38 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, panturrilha-chao 2, abdominal-chao 2 | Superior C (42 min): supino-reto 2, puxada-frente 2, remada-baixa-estacao 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior C (36 min): afundo-tras 2, ponte-gluteo-halter 2, stiff 2, flexao-bola 2, panturrilha-chao 2, abdominal-bola 2

### `volume.excesso.panturrilha`

- **peso-corpo · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade superior · ombro 7**: panturrilha sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (14 min): afundo-peso-corpo 2, panturrilha-chao 2 | Inferior A (22 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Superior B (17 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 2 | Inferior B (31 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2 | Superior C (8 min): flexao-joelho-deslizante 2, panturrilha-chao 2 | Inferior C (30 min): bulgaro-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 2

### `volume.excesso.peito`

- **casa · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (37 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-elastico 2 | Corpo todo B (39 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha-chao 3, face-pull-elastico 2 | Corpo todo C (40 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, flexao-fechada 2, elevacao-halteres 2, panturrilha-sentada-halter 3 | Corpo todo D (37 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, rosca-martelo 2, face-pull-elastico 2, elevacao-halteres 2
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 14 séries (máximo do nível 10).
  - Programa: Corpo todo A (35 min): supino-reto 2, barra-fixa 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2, abducao-caneleira 2 | Corpo todo B (38 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, rosca-inclinada 2, panturrilha 2, crucifixo-inverso 2 | Corpo todo C (36 min): supino-reto 2, barra-fixa-supinada 2, ponte-kettlebell 2, elevacao-halteres 2, triceps-suspensao 2, panturrilha-chao 2 | Corpo todo D (32 min): supino-reto 2, barra-fixa 2, triceps-frances-kettlebell 2, elevacao-halteres 2, panturrilha-bilateral-step 2, crucifixo-halteres 2 | Corpo todo E (35 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, crucifixo-inverso 2, elevacao-halteres 2, aducao-caneleira 2
- **condominio · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (36 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2 | Corpo todo B (41 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, rosca-inclinada 2, panturrilha-chao 4, crucifixo-inverso 2 | Corpo todo C (39 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, flexao-fechada 2, elevacao-halteres 2, panturrilha-sentada-halter 3 | Corpo todo D (41 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, rosca-inclinada 2, crucifixo-inverso 2, elevacao-halteres 4

### `volume.excesso.posteriores`

- **casa · iniciante · Empurrar/Puxar/Pernas (2x) (6 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Empurrar A (40 min): ponte-gluteo-halter 2, afundo-tras 2, stiff 2, panturrilha-sentada-halter 2, rosca-alternada 2, aducao-deitado 2 | Puxar A (8 min): rosca-alternada 2, abdominal-chao 2 | Pernas A (36 min): goblet 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (40 min): agachamento-halteres 2, stiff-unilateral 2, ponte-gluteo-halter 2, panturrilha-sentada-halter 2, rosca-martelo 2, aducao-deitado 2 | Puxar B (8 min): rosca-martelo 2, abdominal-chao 2 | Pernas B (40 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, panturrilha-chao 2, flexao-joelho-elastico 2
- **casa+ · iniciante · Empurrar/Puxar/Pernas (2x) (6 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Empurrar A (41 min): afundo-kettlebell 2, stiff-unilateral 2, panturrilha-chao 2, rosca-martelo 2, abducao-caneleira 2, aducao-caneleira 2 | Puxar A (8 min): rosca-alternada 2, abdominal-bola 2 | Pernas A (36 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 2, abdominal-chao 2 | Empurrar B (38 min): goblet 2, stiff 2, ponte-gluteo-halter 2, panturrilha-sentada-halter 2, rosca-alternada 2, aducao-caneleira 2 | Puxar B (9 min): rosca-kettlebell 2, abdominal-bola 2 | Pernas B (37 min): afundo 2, stiff-kettlebell 2, ponte-kettlebell 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 2, flexao-joelho-elastico 2
- **condominio · iniciante · Empurrar/Puxar/Pernas (2x) (6 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Empurrar A (40 min): afundo-tras 2, stiff 2, ponte-gluteo-halter 2, panturrilha-sentada-halter 2, rosca-alternada 2, aducao-deitado 2 | Puxar A (8 min): rosca-alternada 2, abdominal-bola 2 | Pernas A (34 min): bulgaro 2, stiff 2, goblet 2, flexao-bola 2, panturrilha-chao 2, abdominal-chao 2 | Empurrar B (40 min): agachamento-halteres 2, stiff-unilateral 2, ponte-gluteo-halter 2, panturrilha-sentada-halter 2, rosca-martelo 2, aducao-deitado 2 | Puxar B (8 min): rosca-martelo 2, abdominal-bola 2 | Pernas B (33 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, panturrilha-chao 2, flexao-bola 2

### `volume.excesso.quadriceps`

- **casa · iniciante · Corpo todo 5x (5 dias) · 30 min · prioridade nenhuma · cotovelo 7**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (22 min): goblet 2, flexao-joelho-elastico 2, elevacao-halteres 2, abdominal-chao 2 | Corpo todo B (29 min): stiff 2, extensao-joelho-elastico 2, panturrilha-chao 3, crucifixo-invertido-curvado 3+drop | Corpo todo C (25 min): afundo 2, ponte-gluteo-halter 2, elevacao-halteres 2, abdominal-chao 2 | Corpo todo D (27 min): agachamento-halteres 2, stiff-unilateral 2, elevacao-halteres 2, panturrilha-chao 3 | Corpo todo E (25 min): afundo-tras 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · sem dor**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (39 min): bulgaro 2, supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3 | Corpo todo B (40 min): stiff 2, supino-inclinado 2, remada-apoiada 2, extensao-joelho-caneleira 2, rosca-inclinada 2, panturrilha 3 | Corpo todo C (44 min): afundo 2, supino-reto 2, barra-fixa-supinada 2, ponte-kettlebell 2, elevacao-halteres 3, abdominal-bola 4 | Corpo todo D (40 min): goblet 2, supino-reto 2, barra-fixa 2, stiff-kettlebell 2, triceps-frances-kettlebell 2, panturrilha-bilateral-step 3 | Corpo todo E (39 min): afundo-kettlebell 2, supino-inclinado 2, remada-unilateral-halter 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, rosca-inclinada 2
- **condominio+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · sem dor**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (39 min): bulgaro 2, supino-reto 2, puxada-frente 2, cadeira-flexora 2, triceps-frances-halter 2, elevacao-halteres 3 | Corpo todo B (40 min): stiff 2, supino-inclinado 2, remada-apoiada 2, cadeira-extensora 2, rosca-inclinada 2, panturrilha 3 | Corpo todo C (44 min): afundo 2, supino-maquina 2, puxada-frente 2, hip-thrust 2, elevacao-halteres 3, abdominal-bola 4 | Corpo todo D (41 min): goblet 2, supino-reto 2, puxada-frente 2, stiff-unilateral 2, triceps-frances-halter 2, panturrilha-bilateral-step 3 | Corpo todo E (38 min): afundo-tras 2, supino-inclinado 2, remada-unilateral-halter 2, cadeira-flexora 2, cadeira-extensora 2, rosca-inclinada 2

### `volume.excesso.triceps`

- **casa · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (38 min): flexao 2, remada-unilateral-sem-banco 2, stiff 2, triceps-frances-halter 2, elevacao-halteres 2, abdominal-chao 2 | Corpo todo B (40 min): stiff-unilateral 2, flexao 2, remada-curvada-halteres 2, rosca-alternada 2, panturrilha-chao 3, crucifixo-invertido-curvado 2 | Corpo todo C (39 min): flexao 2, remada-unilateral-sem-banco 2, ponte-gluteo-halter 2, flexao-fechada 2, elevacao-halteres 2, abdominal-chao 2 | Corpo todo D (39 min): flexao 2, remada-curvada-halteres 2, stiff 2, triceps-frances-halter 2, elevacao-halteres 2, panturrilha-chao 3 | Corpo todo E (39 min): flexao 2, remada-unilateral-sem-banco 2, stiff-unilateral 2, rosca-martelo 2, crucifixo-invertido-curvado 2, abdominal-chao 2
- **casa+ · iniciante · Superior/Inferior + Empurrar/Puxar/Pernas (5 dias) · 60 min · prioridade misto · sem dor**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Superior (43 min): supino-reto 2, barra-fixa 2, remada-apoiada 2, desenvolvimento 2, elevacao-halteres 2, crucifixo-halteres 2, triceps-frances-halter 2, rosca-inclinada 2 | Inferior (47 min): bulgaro 2, stiff 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 3, aducao-caneleira 2, abdominal-bola 2 | Empurrar (37 min): supino-inclinado 2, supino-reto 2, desenvolvimento 2, elevacao-halteres 2, crucifixo-halteres 2, triceps-frances-kettlebell 2, triceps-suspensao 2 | Puxar (32 min): remada-unilateral-halter 2, barra-fixa-supinada 2, elevacao-halteres 2, crucifixo-inverso 2, rosca-inclinada 2, abdominal-chao 2 | Pernas (53 min): afundo 2, stiff-kettlebell 2, ponte-kettlebell 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 3, flexao-joelho-elastico 2, panturrilha-sentada-halter 2, aducao-caneleira 2
- **condominio · iniciante · Superior/Inferior + Empurrar/Puxar/Pernas (5 dias) · 60 min · prioridade misto · sem dor**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Superior (43 min): supino-reto 2, puxada-frente 2, remada-apoiada 2, desenvolvimento 2, elevacao-halteres 2, crucifixo-halteres 2, triceps-frances-halter 2, rosca-inclinada 2 | Inferior (45 min): bulgaro 2, stiff 2, goblet 2, flexao-bola 2, panturrilha-chao 3, aducao-deitado 2, abdominal-bola 2 | Empurrar (37 min): supino-inclinado 2, supino-reto 2, flexao-fechada 2, desenvolvimento 2, elevacao-halteres 2, crucifixo-halteres 2, triceps-frances-halter 2 | Puxar (33 min): remada-unilateral-halter 2, puxada-frente 2, elevacao-halteres 2, crucifixo-inverso 2, rosca-inclinada 2, abdominal-chao 2 | Pernas (54 min): afundo 2, stiff-unilateral 2, agachamento-halteres 2, ponte-gluteo-halter 2, panturrilha-chao 3, flexao-bola 2, panturrilha-sentada-halter 2, aducao-deitado 2

### `volume.zero.costas`

- **peso-corpo · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.posteriores`

- **casa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (38 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-chao 3+drop, abdominal-chao 4 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (40 min): bulgaro 2, supino-reto 2, barra-fixa 2, panturrilha 3+drop, abdominal-bola 4 | Corpo todo B (20 min): afundo 2, supino-inclinado 2, remada-apoiada 2
- **condominio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (38 min): bulgaro 2, supino-reto 2, puxada-frente 2, panturrilha-chao 3+drop, abdominal-bola 4 | Corpo todo B (20 min): afundo 2, supino-inclinado 2, remada-apoiada 2

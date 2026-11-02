# Teste de estresse do gerador (auditoria do treino)

> Gerado por `npm run auditoria:estresse`. Dados fictícios (`scripts/auditoria/cenarios.ts`). Não editar à mão.

**149.760 programas** (13 cenários × 3 níveis × 12 divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor); 0 bloqueados.

## Problemas encontrados (contagem de ocorrências)

| problema | ocorrências |
| --- | ---: |
| `monotonia.repete-com-opcao` | 63.773 |
| `tempo.sobra-com-meta-abaixo` | 53.095 |
| `monotonia.todos-os-dias` | 23.077 |
| `volume.excesso.gluteos` | 4.115 |
| `volume.excesso.posteriores` | 2.511 |
| `volume.excesso.costas` | 1.493 |
| `volume.excesso.biceps` | 1.470 |
| `volume.zero.costas` | 1.440 |
| `equilibrio.sem-puxar` | 1.440 |
| `volume.excesso.ombro_posterior` | 1.012 |
| `volume.excesso.triceps` | 1.004 |
| `volume.excesso.peito` | 964 |
| `volume.excesso.quadriceps` | 628 |
| `volume.zero.posteriores` | 324 |

## Volume: % dos programas com o músculo abaixo do limiar

Limiar: a meta, se o músculo é prioridade; senão, 4 séries (o piso do mínimo eficaz).

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 39.9% | 46.3% | 52.4% | 32.3% | 26.4% | 56.8% | 50.8% | 31.2% | 16.6% | 49.5% | 42.3% |
| casa+ | 36.1% | 46.6% | 52.5% | 30.8% | 26.5% | 55% | 50.8% | 32.5% | 14.1% | 50% | 23.2% |
| condominio | 37.7% | 46.4% | 52.3% | 27.9% | 26.6% | 54.8% | 50.7% | 31.1% | 13.1% | 49.6% | 42.5% |
| condominio+ | 35.9% | 46.4% | 52.4% | 28.6% | 26.6% | 55.1% | 38.7% | 30.3% | 19.5% | 51.5% | 24.1% |
| academia | 36.6% | 46.9% | 52.8% | 29.5% | 27.6% | 34.3% | 38.5% | 30.9% | 12.8% | 38.6% | 24.1% |
| academia+ | 36.6% | 46.9% | 52.8% | 29.5% | 27.6% | 34.3% | 38.5% | 30.9% | 12.8% | 38.6% | 24.1% |
| peso-corpo | 55.9% | 100% | 100% | 100% | 100% | 83.7% | 46.7% | 98.8% | 17.6% | 34% | 34.4% |
| elasticos | 40.6% | 47.3% | 53.5% | 39.2% | 29.6% | 57.2% | 52.1% | 35.1% | 17.3% | 50.3% | 42.6% |
| halteres | 57.9% | 75.5% | 51.5% | 52.3% | 32.2% | 52.5% | 51.9% | 37% | 13.5% | 48.2% | 42.4% |
| halteres-banco | 39.3% | 68.1% | 51.7% | 52.1% | 29.3% | 62.5% | 52.3% | 37.7% | 13.5% | 48.6% | 42.7% |
| diego | 40.3% | 47.8% | 53.6% | 30.3% | 29.3% | 57.3% | 52.1% | 35.7% | 17.6% | 50.6% | 23.3% |
| bruno | 36.9% | 47.2% | 53% | 28% | 27.6% | 34.4% | 52.3% | 32.9% | 14.7% | 52% | 22.9% |
| bairro | 37% | 46.4% | 52.6% | 31.9% | 27.1% | 52.8% | 38.3% | 29.3% | 18.9% | 51.4% | 24% |

### Sem dor e com 45 min ou mais

Prioritário abaixo da meta (% dos programas em que o músculo é prioridade) / demais abaixo de 4 séries (% dos outros).

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 11.6% / 0% | 16% / 0% | 43.5% / 1.4% | 0% / 1.4% | 17.6% / 0% | 53.7% / 0% | 59.6% / 0% | 17.9% / 0% | 20.6% / 0% | 72.2% / 0% | 58.8% / 2.2% |
| casa+ | 10.5% / 0% | 15.4% / 0% | 43.7% / 1.4% | 0% / 2.5% | 17.4% / 0% | 44.7% / 0% | 59.7% / 0% | 19.1% / 0% | 12% / 0% | 72.5% / 0% | 59.7% / 2.2% |
| condominio | 10.2% / 0% | 15.6% / 0% | 43.5% / 1.4% | 0% / 1.1% | 17.4% / 0% | 44.7% / 0% | 59.4% / 0% | 16.7% / 0% | 10% / 0% | 72.4% / 0% | 59.3% / 2.2% |
| condominio+ | 10.3% / 0% | 15.4% / 0% | 43.5% / 1.4% | 0% / 2.1% | 17.8% / 0.5% | 44.9% / 0% | 15.6% / 0% | 17.1% / 0% | 23.8% / 7.4% | 72.4% / 0% | 59.3% / 5.2% |
| academia | 11.3% / 0% | 15.3% / 0% | 44.3% / 2.3% | 0% / 2.9% | 19.7% / 0.5% | 20.1% / 0% | 15.1% / 0% | 16.5% / 0% | 9.7% / 7.4% | 40.3% / 0% | 58.8% / 5.2% |
| academia+ | 11.3% / 0% | 15.3% / 0% | 44.3% / 2.3% | 0% / 2.9% | 19.7% / 0.5% | 20.1% / 0% | 15.1% / 0% | 16.5% / 0% | 9.7% / 7.4% | 40.3% / 0% | 58.8% / 5.2% |
| peso-corpo | 45.8% / 0% | 100% / 100% | 100% / 100% | 0% / 100% | 100% / 100% | 100% / 56.5% | 54.9% / 0% | 100% / 100% | 29.6% / 5.6% | 56.9% / 0% | 54.2% / 0% |
| elasticos | 13.7% / 0% | 15.3% / 0% | 46.1% / 1.4% | 0% / 9.2% | 28.5% / 0% | 55.6% / 0% | 61.9% / 0% | 25% / 0% | 22.2% / 0% | 75.2% / 0% | 62% / 2.2% |
| halteres | 49.4% / 0% | 54.5% / 0% | 43.5% / 1.4% | 0% / 1.1% | 34.3% / 0% | 46.1% / 0% | 62% / 0% | 16.5% / 0% | 12% / 0% | 73.1% / 0% | 59.3% / 2.2% |
| halteres-banco | 18.8% / 0% | 16.2% / 0% | 43.7% / 1.4% | 0% / 1.1% | 19.7% / 0% | 71.3% / 0% | 63% / 0% | 19.6% / 0% | 13% / 0% | 72.8% / 0% | 61.1% / 2.2% |
| diego | 13.1% / 0% | 17.4% / 0% | 46% / 1.4% | 0% / 2.5% | 26.9% / 0% | 54.6% / 0% | 61.4% / 0% | 24.8% / 0% | 21.1% / 0% | 75% / 0% | 62% / 2.2% |
| bruno | 11.3% / 0% | 16.8% / 0% | 44% / 2.3% | 0% / 1.1% | 19.2% / 0% | 21.1% / 0% | 59.7% / 0% | 19.1% / 0% | 12.5% / 0% | 72.4% / 0% | 56.9% / 2.2% |
| bairro | 7.1% / 0% | 15.1% / 0% | 43.5% / 1.9% | 0% / 4.8% | 19.2% / 0.5% | 29.4% / 0% | 15.4% / 0% | 15.4% / 0% | 18.8% / 7.4% | 72.2% / 0% | 58.8% / 5.2% |

### Motivo do aviso "abaixo da meta" (sem dor, 45 min ou mais)

| músculo | motivo | avisos |
| --- | --- | ---: |
| panturrilha | divisão: séries por exercício e por sessão no teto | 5.344 |
| quadríceps | divisão: séries por exercício e por sessão no teto | 3.510 |
| ombro (lateral) | divisão: séries por exercício e por sessão no teto | 2.635 |
| tríceps | divisão: séries por exercício e por sessão no teto | 2.054 |
| costas | divisão: séries por exercício e por sessão no teto | 1.293 |
| abdômen | divisão: séries por exercício e por sessão no teto | 1.183 |
| costas | nenhum exercício possível | 1.080 |
| ombro (lateral) | nenhum exercício possível | 1.080 |
| ombro (posterior) | nenhum exercício possível | 1.080 |
| bíceps | nenhum exercício possível | 1.080 |
| posteriores da coxa | nenhum exercício possível | 1.080 |
| peito | divisão: séries por exercício e por sessão no teto | 934 |
| tríceps | nenhum exercício possível | 798 |
| posteriores da coxa | corte de tempo | 658 |
| abdômen | minutos (exercícios por treino) | 638 |
| posteriores da coxa | divisão: séries por exercício e por sessão no teto | 624 |
| bíceps | divisão: séries por exercício e por sessão no teto | 595 |
| ombro (lateral) | minutos (exercícios por treino) | 543 |
| glúteos | divisão: séries por exercício e por sessão no teto | 450 |
| glúteos | corte de tempo | 431 |
| quadríceps | corte de tempo | 397 |
| ombro (posterior) | minutos (exercícios por treino) | 353 |
| bíceps | minutos (exercícios por treino) | 345 |
| peito | minutos (exercícios por treino) | 339 |
| ombro (lateral) | divisão sem vaga própria | 268 |
| panturrilha | minutos (exercícios por treino) | 218 |
| costas | corte de tempo | 187 |
| bíceps | corte de tempo | 183 |
| peito | corte de tempo | 181 |
| glúteos | divisão sem vaga própria | 180 |
| posteriores da coxa | minutos (exercícios por treino) | 172 |
| glúteos | minutos (exercícios por treino) | 96 |
| abdômen | corte de tempo | 91 |
| abdômen | divisão sem vaga própria | 81 |
| ombro (lateral) | corte de tempo | 72 |
| tríceps | corte de tempo | 69 |
| tríceps | minutos (exercícios por treino) | 64 |
| panturrilha | corte de tempo | 61 |

### Séries semanais, média por cenário

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 6,8 | 6,8 | 5,1 | 4,5 | 7,3 | 4,7 | 5,8 | 8,9 | 9 | 5,8 | 3,7 |
| casa+ | 7,1 | 6,7 | 5,1 | 4,6 | 7,3 | 4,7 | 5,8 | 8,8 | 9,7 | 5,7 | 4,9 |
| condominio | 7 | 6,7 | 5,2 | 5,1 | 7,4 | 4,7 | 5,8 | 8,9 | 10,4 | 5,8 | 3,7 |
| condominio+ | 7,1 | 6,7 | 5,1 | 5 | 7,3 | 4,7 | 7,1 | 9 | 8,5 | 5,6 | 4,9 |
| academia | 7,1 | 6,6 | 5 | 4,9 | 7,2 | 6,8 | 6,9 | 8,5 | 8,8 | 6,4 | 4,8 |
| academia+ | 7,1 | 6,6 | 5 | 4,9 | 7,2 | 6,8 | 6,9 | 8,5 | 8,8 | 6,4 | 4,8 |
| peso-corpo | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 6,2 | 2,5 | 8,1 | 7,5 | 4,3 |
| elasticos | 6,8 | 6,7 | 5 | 3,8 | 7,1 | 4,6 | 5,8 | 8,6 | 8,8 | 5,7 | 3,7 |
| halteres | 5,1 | 3,6 | 5,3 | 3,1 | 6,5 | 5 | 5,7 | 8,3 | 10,2 | 5,9 | 3,7 |
| halteres-banco | 6,7 | 4,1 | 5,3 | 3,3 | 6,8 | 4,1 | 5,7 | 8,4 | 10,2 | 5,9 | 3,7 |
| diego | 6,8 | 6,7 | 4,9 | 4,5 | 7,1 | 4,6 | 5,7 | 8,6 | 8,7 | 5,6 | 4,9 |
| bruno | 7,1 | 6,7 | 5 | 5 | 7,2 | 6,8 | 5,6 | 8,7 | 9,5 | 5,5 | 4,9 |
| bairro | 7,4 | 6,7 | 5,1 | 4,5 | 7,3 | 5 | 7,1 | 9 | 8,5 | 5,6 | 4,9 |

## Equilíbrio

- Séries de puxar ÷ séries de empurrar: mediana 1 (10% dos programas abaixo de 0.67, 10% acima de 1.71).
- Posteriores ÷ quadríceps (volume semanal): mediana 1.08 (p10 0.4, p90 1.71).

## Escolha

### Os 25 exercícios que mais aparecem como vaga

| exercício | vezes | guia |
| --- | ---: | --- |
| abdominal-chao | 166.383 | animação |
| panturrilha-chao | 150.968 | animação |
| elevacao-halteres | 145.843 | animação |
| ponte-gluteo-halter | 129.224 | sem animação |
| stiff | 115.852 | animação |
| rosca-alternada | 100.977 | animação |
| flexao | 91.448 | animação |
| afundo | 87.111 | animação |
| supino-reto | 81.100 | animação |
| crucifixo-halteres | 74.460 | sem animação |
| stiff-unilateral | 71.982 | animação |
| triceps-frances-halter | 66.083 | animação |
| rosca-inclinada | 65.326 | animação |
| cadeira-flexora | 63.918 | sem animação |
| ponte-gluteo | 63.588 | sem animação |
| remada-apoiada | 60.800 | animação |
| flexao-joelho-elastico | 59.881 | sem animação |
| supino-inclinado | 58.875 | animação |
| crucifixo-inverso | 55.117 | sem animação |
| elevacao-joelhos | 53.126 | animação |
| bulgaro | 50.240 | animação |
| cadeira-extensora | 46.126 | sem animação |
| panturrilha | 45.080 | animação |
| hip-thrust | 43.934 | sem animação |
| rosca-elastico | 40.997 | sem animação |

### Possíveis que nunca aparecem como vaga, por cenário

| cenário | possíveis | aparecem | nunca como vaga | nem como alternativa |
| --- | ---: | ---: | --- | --- |
| casa | 33 | 24 | flexao-elastico, elevacao-lateral-elastico, triceps-elastico-acima, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo | — |
| casa+ | 50 | 33 | flexao, flexao-elastico, puxada-elastico, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, triceps-elastico-acima, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, goblet-kettlebell, remada-suspensao, supino-chao-halteres | — |
| condominio | 33 | 26 | flexao, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, remada-curvada-halteres, supino-chao-halteres | — |
| condominio+ | 59 | 34 | flexao, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, flexao-bola, flexao-joelho-elastico, goblet-kettlebell, remada-curvada-halteres, supino-chao-halteres | — |
| academia | 89 | 65 | supino-polia, flexao, barra-fixa, barra-fixa-supinada, remada-barra, remada-invertida, desenvolvimento-unilateral, goblet, agachamento-halteres, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, abdominal-chao, terra-hexagonal, mergulho, mergulho-graviton, barra-fixa-graviton, remada-baixa-estacao, hiperextensao, remada-curvada-halteres, ponte-gluteo-halter, supino-chao-halteres | — |
| academia+ | 106 | 66 | supino-polia, flexao, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-invertida, remada-elastico, desenvolvimento-unilateral, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, goblet, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, flexao-bola, flexao-joelho-elastico, abdominal-declinado, abdominal-chao, terra-hexagonal, goblet-kettlebell, mergulho, mergulho-graviton, barra-fixa-graviton, remada-baixa-estacao, remada-suspensao, hiperextensao, remada-curvada-halteres, ponte-gluteo-halter, supino-chao-halteres | — |
| peso-corpo | 7 | 7 | — | — |
| elasticos | 19 | 19 | — | — |
| halteres | 21 | 17 | agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo | — |
| halteres-banco | 25 | 19 | flexao, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, supino-chao-halteres | — |
| diego | 22 | 21 | puxada-elastico | — |
| bruno | 68 | 44 | supino-polia, flexao, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, abdominal-declinado, abdominal-chao, remada-curvada-halteres, supino-chao-halteres | — |
| bairro | 38 | 30 | flexao, agachamento-halteres, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, supino-chao-halteres | — |

### Funções sem opção ou com uma só (nível intermediário, sem dor)

| cenário | empurrar-horizontal | empurrar-inclinado | crucifixo | puxar-vertical | puxar-horizontal | empurrar-vertical | elevacao-lateral | ombro-posterior | biceps | triceps-acima-cabeca | triceps-complemento | agachar | afundo | extensora | flexao-joelho | dobrar-quadril | extensao-quadril | abducao | aducao | panturrilha-em-pe | panturrilha-sentada | abdomen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| casa | 3 (nível 2) | 1 (nível 3) | 1 (nível 2) | 2 (nível 2) | 2 (nível 1) | 2 (nível 1) | 2 (nível 1) | 2 (nível 1) | 2 (nível 2) | 2 (nível 1) | nenhuma | 4 (nível 2) | 4 (nível 1) | nenhuma | 1 (nível 3) | 3 (nível 1) | 2 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| casa+ | 4 (nível 1) | 3 (nível 1) | 2 (nível 1) | 6 (nível 1) | 5 (nível 1) | 3 (nível 1) | 2 (nível 1) | 3 (nível 1) | 3 (nível 1) | 2 (nível 1) | nenhuma | 6 (nível 2) | 5 (nível 1) | nenhuma | 2 (nível 3) | 3 (nível 1) | 2 (nível 2) | nenhuma | nenhuma | 3 (nível 1) | nenhuma | 2 (nível 2) |
| condominio | 3 (nível 1) | 3 (nível 1) | 1 (nível 1) | 3 (nível 1) | 4 (nível 1) | 2 (nível 1) | 1 (nível 1) | 2 (nível 1) | 2 (nível 1) | 1 (nível 1) | nenhuma | 4 (nível 2) | 5 (nível 1) | nenhuma | 1 (nível 3) | 2 (nível 1) | 2 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| condominio+ | 5 (nível 1) | 4 (nível 1) | 3 (nível 1) | 6 (nível 1) | 6 (nível 1) | 3 (nível 1) | 2 (nível 1) | 3 (nível 1) | 4 (nível 1) | 2 (nível 1) | nenhuma | 6 (nível 2) | 5 (nível 1) | 1 (nível 1) | 3 (nível 1) | 4 (nível 1) | 3 (nível 1) | nenhuma | nenhuma | 3 (nível 1) | nenhuma | 2 (nível 2) |
| academia | 9 (nível 1) | 7 (nível 1) | 4 (nível 1) | 9 (nível 1) | 8 (nível 1) | 4 (nível 1) | 2 (nível 1) | 3 (nível 1) | 7 (nível 1) | 2 (nível 1) | 4 (nível 1) | 9 (nível 1) | 5 (nível 1) | 1 (nível 1) | 2 (nível 1) | 5 (nível 1) | 6 (nível 1) | 2 (nível 1) | 1 (nível 1) | 5 (nível 1) | 1 (nível 1) | 4 (nível 1) |
| academia+ | 10 (nível 1) | 7 (nível 1) | 5 (nível 1) | 11 (nível 1) | 10 (nível 1) | 5 (nível 1) | 3 (nível 1) | 5 (nível 1) | 8 (nível 1) | 3 (nível 1) | 4 (nível 1) | 11 (nível 1) | 5 (nível 1) | 1 (nível 1) | 4 (nível 1) | 6 (nível 1) | 6 (nível 1) | 2 (nível 1) | 1 (nível 1) | 5 (nível 1) | 1 (nível 1) | 5 (nível 1) |
| peso-corpo | 1 (nível 2) | 1 (nível 3) | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | 1 (nível 3) | 2 (nível 2) | nenhuma | nenhuma (vira dobrar-quadril) | nenhuma | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| elasticos | 2 (nível 2) | 1 (nível 3) | 1 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | 1 (nível 2) | 1 (nível 2) | 1 (nível 3) | 1 (nível 1) | nenhuma | 2 (nível 3) | 2 (nível 2) | nenhuma | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| halteres | 2 (nível 2) | 1 (nível 3) | nenhuma | 1 (nível 2) | 1 (nível 1) | 1 (nível 1) | 1 (nível 1) | 1 (nível 1) | 1 (nível 2) | 1 (nível 1) | nenhuma | 3 (nível 2) | 4 (nível 1) | nenhuma | 0 (via dobrar-quadril) | 2 (nível 1) | 2 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| halteres-banco | 3 (nível 1) | 2 (nível 2) | 1 (nível 1) | 2 (nível 2) | 2 (nível 1) | 1 (nível 1) | 1 (nível 1) | 1 (nível 1) | 1 (nível 2) | 1 (nível 1) | nenhuma | 4 (nível 2) | 5 (nível 1) | nenhuma | 0 (via dobrar-quadril) | 2 (nível 1) | 2 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| diego | 2 (nível 2) | 1 (nível 3) | 1 (nível 2) | 3 (nível 1) | 1 (nível 3) | 1 (nível 2) | 1 (nível 2) | 1 (nível 2) | 1 (nível 3) | 1 (nível 1) | nenhuma | 2 (nível 3) | 2 (nível 2) | nenhuma | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 2 (nível 2) |
| bruno | 5 (nível 1) | 6 (nível 1) | 4 (nível 1) | 7 (nível 1) | 6 (nível 1) | 3 (nível 1) | 3 (nível 1) | 4 (nível 1) | 5 (nível 1) | 3 (nível 1) | 2 (nível 1) | 5 (nível 2) | 5 (nível 1) | nenhuma | 2 (nível 3) | 5 (nível 1) | 3 (nível 1) | nenhuma | nenhuma | 3 (nível 1) | nenhuma | 4 (nível 1) |
| bairro | 4 (nível 1) | 3 (nível 1) | 1 (nível 1) | 4 (nível 1) | 3 (nível 1) | 2 (nível 1) | 1 (nível 1) | 2 (nível 1) | 2 (nível 1) | 1 (nível 1) | 1 (nível 2) | 5 (nível 1) | 5 (nível 1) | 1 (nível 1) | 1 (nível 1) | 2 (nível 1) | 2 (nível 2) | nenhuma | nenhuma | 2 (nível 1) | nenhuma | 2 (nível 2) |

## Monotonia

- Programas de 3 dias ou mais com um exercício (fora o abdominal) em **todos** os dias: 23.077 de 137.280 (16.8%).
- Programas que repetem um exercício em 2 dias ou mais com outro do mesmo nível da função possível e sem uso: 63.773 (46.5%).

## Tempo

- Dias acima dos minutos: 41.012 de 624.000 (6.6%); **sem aviso: 0**.
- Programas cujo dia mais longo usa menos de 70% dos minutos: 62.343 (41.6%); destes, 0 ainda dizem que a meta ficou de fora "porque cabem cerca de N exercícios".

| minutos | programas | dia mais longo (mediana, min) | sobra > 30% |
| ---: | ---: | ---: | ---: |
| 20 | 18720 | 24 | 0% |
| 30 | 18720 | 30 | 0.4% |
| 45 | 18720 | 44 | 4.4% |
| 60 | 18720 | 52 | 18.5% |
| 75 | 18720 | 53 | 47.4% |
| 90 | 18720 | 53 | 68.6% |
| 120 | 18720 | 53 | 94.4% |
| 150 | 18720 | 53 | 99.3% |

## Segurança

- Programas com uma região acima de 5: 112.320. Exercício que carrega a região marcada no dado: **0**.
- Exercício que, pelo padrão de movimento, carrega a região com dor > 5, mas o dado não marca (fica no programa): 0 ocorrências.
- Dor de 3 a 5 sem lembrete: 0; com um equivalente do mesmo nível que poupava a região e ficou de fora: 0.

| exercício : região que falta | ocorrências |
| --- | ---: |

## Treino do dia num 2º local

- 60 dias testados, 234 trocas por equivalente, 0 vagas que ficaram de fora no dia.

## Exemplos (3 por problema, de cenários diferentes)

### `equilibrio.sem-puxar`

- **peso-corpo · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `monotonia.repete-com-opcao`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · ombro 7**: ponte-gluteo-halter em 2 dias (extensao-quadril), com ponte-gluteo do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (19 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2 | Corpo todo B (18 min): stiff 2, panturrilha-chao 2+drop, rosca-alternada 3+drop | Corpo todo C (32 min): afundo 4, ponte-gluteo-halter 2, abdominal-chao 4
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · ombro 7**: ponte-gluteo-halter em 2 dias (extensao-quadril), com ponte-gluteo do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (20 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2 | Corpo todo B (21 min): stiff 2, panturrilha 2+drop, rosca-alternada 3+drop | Corpo todo C (32 min): afundo 4, ponte-gluteo-halter 2, abdominal-chao 4
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · ombro 7**: ponte-gluteo-halter em 2 dias (extensao-quadril), com ponte-gluteo do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (20 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2 | Corpo todo B (18 min): stiff 2, panturrilha-chao 2+drop, rosca-alternada 3+drop | Corpo todo C (32 min): afundo 4, ponte-gluteo-halter 2, abdominal-chao 4

### `monotonia.todos-os-dias`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade nenhuma · sem dor**: flexao, remada-curvada-halteres em todos os 3 dias.
  - Programa: Corpo todo A (19 min): goblet 2, flexao 2, remada-curvada-halteres 2 | Corpo todo B (26 min): stiff 4, flexao 2, remada-curvada-halteres 2 | Corpo todo C (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 30 min · prioridade superior · ombro 7**: rosca-alternada em todos os 3 dias.
  - Programa: Corpo todo A (30 min): bulgaro 3, rosca-alternada 3, flexao-bola 3, abdominal-chao 2 | Corpo todo B (28 min): stiff 2, rosca-alternada 3, panturrilha 4, abdominal-chao 2 | Corpo todo C (28 min): afundo 3, ponte-gluteo-halter 2, rosca-alternada 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 30 min · prioridade superior · ombro 7**: rosca-alternada em todos os 3 dias.
  - Programa: Corpo todo A (30 min): bulgaro 3, rosca-alternada 3, flexao-bola 3, abdominal-chao 2 | Corpo todo B (28 min): stiff 2, rosca-alternada 3, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (28 min): afundo 3, ponte-gluteo-halter 2, rosca-alternada 2, abdominal-chao 2

### `tempo.sobra-com-meta-abaixo`

- **casa · iniciante · Corpo todo A/B (2 dias) · 60 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 40 de 60 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (40 min): goblet 3, stiff 3, panturrilha-chao 4, rosca-alternada 3, abdominal-chao 2 | Corpo todo B (35 min): afundo 3, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-alternada 3, abdominal-chao 2
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 45 de 75 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (45 min): bulgaro 3, stiff 3, panturrilha 4, rosca-alternada 3, abdominal-chao 2 | Corpo todo B (35 min): afundo 3, ponte-gluteo-halter 2, flexao-bola 2, rosca-alternada 3, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B (2 dias) · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 42 de 75 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (42 min): bulgaro 3, stiff 3, panturrilha-chao 4, rosca-alternada 3, abdominal-chao 2 | Corpo todo B (35 min): afundo 3, ponte-gluteo-halter 2, flexao-bola 2, rosca-alternada 3, abdominal-chao 2

### `volume.excesso.biceps`

- **casa · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade nenhuma · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (42 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-elastico 2, rosca-alternada 2 | Corpo todo B (47 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, desenvolvimento-elastico 2, rosca-alternada 2, panturrilha-chao 3, face-pull-elastico 2 | Corpo todo C (45 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, elevacao-halteres 2, panturrilha-chao 3, triceps-frances-halter 2, rosca-alternada 2 | Corpo todo D (40 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, desenvolvimento-elastico 2, rosca-alternada 2, face-pull-elastico 2
- **casa+ · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade inferior · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (48 min): ponte-gluteo-halter 2, supino-reto 2, barra-fixa 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, rosca-inclinada 2, elevacao-joelhos 2 | Corpo todo B (48 min): ponte-gluteo-halter 2, supino-inclinado 2, remada-apoiada 2, panturrilha 4, rosca-inclinada 2, crucifixo-inverso 2, elevacao-joelhos 2 | Corpo todo C (50 min): ponte-gluteo-halter 2, supino-reto 2, barra-fixa-supinada 2, panturrilha-bilateral-step 4, elevacao-halteres 2, triceps-frances-halter 2, rosca-inclinada 2, elevacao-joelhos 2 | Corpo todo D (43 min): ponte-gluteo-halter 2, supino-inclinado 2, remada-apoiada 2, desenvolvimento 2, rosca-inclinada 2, crucifixo-inverso 2, elevacao-joelhos 2
- **condominio · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade nenhuma · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (41 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2, rosca-inclinada 2 | Corpo todo B (45 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, desenvolvimento 2, rosca-inclinada 2, panturrilha-chao 3, crucifixo-inverso 2 | Corpo todo C (43 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, elevacao-halteres 2, panturrilha-chao 3, triceps-frances-halter 2, rosca-inclinada 2 | Corpo todo D (38 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, desenvolvimento 2, rosca-inclinada 2, crucifixo-inverso 2

### `volume.excesso.costas`

- **casa · iniciante · Corpo todo 5x (5 dias) · 30 min · prioridade nenhuma · joelho 7 + lombar 7**: costas sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (24 min): flexao 2, puxada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2 | Corpo todo B (28 min): flexao 2, remada-elastico 2, rosca-alternada 2, panturrilha-chao 4 | Corpo todo C (26 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 4 | Corpo todo D (24 min): flexao 2, puxada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2 | Corpo todo E (29 min): flexao 2, remada-elastico 2, rosca-alternada 2, face-pull-elastico 4
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · sem dor**: costas sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (39 min): bulgaro 2, supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3 | Corpo todo B (40 min): stiff 2, supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, panturrilha 3, crucifixo-inverso 2 | Corpo todo C (42 min): afundo 2, supino-reto 2, barra-fixa-supinada 2, ponte-gluteo-halter 2, elevacao-halteres 3, abdominal-chao 2 | Corpo todo D (41 min): goblet 2, supino-reto 2, barra-fixa 2, stiff-unilateral 2, triceps-frances-halter 2, panturrilha-bilateral-step 3 | Corpo todo E (38 min): afundo-tras 2, supino-inclinado 2, remada-unilateral-halter 2, flexao-joelho-elastico 2, rosca-inclinada 2, elevacao-joelhos 2
- **condominio · iniciante · Corpo todo 5x (5 dias) · 30 min · prioridade nenhuma · joelho 7 + lombar 7**: costas sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (23 min): supino-reto 2, puxada-frente 2, triceps-frances-halter 2, elevacao-halteres 2 | Corpo todo B (27 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, panturrilha-chao 4 | Corpo todo C (30 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 4, elevacao-halteres 2 | Corpo todo D (23 min): supino-reto 2, puxada-frente 2, triceps-frances-halter 2, elevacao-halteres 2 | Corpo todo E (22 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, crucifixo-inverso 2

### `volume.excesso.gluteos`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade misto · ombro 7**: glúteos sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (31 min): goblet 3, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (45 min): stiff 2, afundo-tras 3, ponte-gluteo-halter 2, panturrilha-chao 4, rosca-alternada 2, abdominal-chao 2 | Corpo todo C (40 min): afundo 2, ponte-gluteo-halter 2, panturrilha-chao 4, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade nenhuma · ombro 7**: glúteos sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, panturrilha-bilateral-step 3, rosca-alternada 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade nenhuma · ombro 7**: glúteos sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-chao 3, rosca-alternada 2, abdominal-chao 2

### `volume.excesso.ombro_posterior`

- **casa · iniciante · Superior/Inferior (3x) (6 dias) · 60 min · prioridade nenhuma · sem dor**: ombro (posterior) sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Superior A (43 min): flexao 2, remada-curvada-halteres 2, remada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-elastico 2, crucifixo-invertido-curvado 2 | Inferior A (29 min): goblet 2, stiff 2, flexao-joelho-elastico 2, panturrilha-chao 2, abdominal-chao 2 | Superior B (34 min): flexao 2, remada-curvada-halteres 2, puxada-elastico 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-invertido-curvado 2 | Inferior B (39 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-elastico 2, panturrilha-chao 2, abdominal-chao 2 | Superior C (43 min): flexao 2, remada-curvada-halteres 2, remada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-elastico 2, crucifixo-invertido-curvado 2 | Inferior C (37 min): afundo-tras 2, ponte-gluteo-halter 2, stiff 2, flexao-joelho-elastico 2, panturrilha-chao 2, abdominal-chao 2
- **casa+ · iniciante · Superior/Inferior (3x) (6 dias) · 60 min · prioridade nenhuma · sem dor**: ombro (posterior) sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Superior A (42 min): supino-reto 2, barra-fixa 2, remada-apoiada 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior A (31 min): bulgaro 2, stiff 2, flexao-bola 2, panturrilha 2, abdominal-chao 2 | Superior B (34 min): supino-inclinado 2, remada-unilateral-halter 2, barra-fixa-supinada 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-inverso 2 | Inferior B (38 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-elastico 2, panturrilha-bilateral-step 2, elevacao-joelhos 2 | Superior C (42 min): supino-reto 2, barra-fixa 2, remada-apoiada 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior C (38 min): afundo-tras 2, ponte-gluteo-halter 2, stiff 2, flexao-bola 2, panturrilha 2, abdominal-chao 2
- **condominio · iniciante · Superior/Inferior (3x) (6 dias) · 60 min · prioridade nenhuma · sem dor**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (42 min): supino-reto 2, puxada-frente 2, remada-apoiada 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior A (30 min): bulgaro 2, stiff 2, flexao-bola 2, panturrilha-chao 2, abdominal-chao 2 | Superior B (34 min): supino-inclinado 2, remada-unilateral-halter 2, puxada-frente 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-inverso 2 | Inferior B (38 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, panturrilha-chao 2, abdominal-chao 2 | Superior C (42 min): supino-reto 2, puxada-frente 2, remada-baixa-estacao 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior C (37 min): afundo-tras 2, ponte-gluteo-halter 2, stiff 2, flexao-bola 2, panturrilha-chao 2, abdominal-chao 2

### `volume.excesso.peito`

- **casa · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 14 séries (máximo do nível 10).
  - Programa: Corpo todo A (38 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-elastico 2 | Corpo todo B (38 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha-chao 2, face-pull-elastico 2 | Corpo todo C (38 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, elevacao-halteres 2, panturrilha-chao 2, rosca-alternada 2 | Corpo todo D (34 min): flexao 2, puxada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2, panturrilha-chao 2, crucifixo-elastico 2 | Corpo todo E (40 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, desenvolvimento-elastico 2, rosca-alternada 2, face-pull-elastico 2
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (32 min): supino-reto 2, barra-fixa 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2, elevacao-joelhos 2 | Corpo todo B (33 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, panturrilha 2, crucifixo-inverso 2, elevacao-joelhos 2 | Corpo todo C (39 min): supino-reto 2, barra-fixa-supinada 2, ponte-gluteo-halter 3, elevacao-halteres 2, panturrilha-chao 2, elevacao-joelhos 2 | Corpo todo D (32 min): supino-reto 2, barra-fixa 2, triceps-frances-halter 2, elevacao-halteres 2, panturrilha-bilateral-step 2, elevacao-joelhos 2 | Corpo todo E (39 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 3, rosca-inclinada 2, crucifixo-inverso 2, elevacao-joelhos 2
- **condominio · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 14 séries (máximo do nível 10).
  - Programa: Corpo todo A (36 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2 | Corpo todo B (36 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, rosca-inclinada 2, panturrilha-chao 2, crucifixo-inverso 2 | Corpo todo C (36 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, elevacao-halteres 2, panturrilha-chao 2, rosca-inclinada 2 | Corpo todo D (32 min): supino-reto 2, puxada-frente 2, triceps-frances-halter 2, elevacao-halteres 2, panturrilha-chao 2, crucifixo-halteres 2 | Corpo todo E (38 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, desenvolvimento 2, rosca-inclinada 2, crucifixo-inverso 2

### `volume.excesso.posteriores`

- **casa · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (29 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, agachamento-halteres 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, panturrilha-chao 3, rosca-alternada 2, abdominal-chao 2 | Corpo todo D (30 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, panturrilha-bilateral-step 3, rosca-alternada 2, abdominal-chao 2 | Corpo todo D (29 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-chao 3, rosca-alternada 2, abdominal-chao 2 | Corpo todo D (29 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2

### `volume.excesso.quadriceps`

- **condominio+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · sem dor**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (39 min): bulgaro 2, supino-reto 2, puxada-frente 2, cadeira-flexora 2, triceps-frances-halter 2, elevacao-halteres 3 | Corpo todo B (40 min): stiff 2, supino-inclinado 2, remada-apoiada 2, cadeira-extensora 2, rosca-inclinada 2, panturrilha 3 | Corpo todo C (44 min): afundo 2, supino-maquina 2, puxada-frente 2, hip-thrust 2, elevacao-halteres 3, abdominal-chao 4 | Corpo todo D (41 min): goblet 2, supino-reto 2, puxada-frente 2, stiff-unilateral 2, triceps-frances-halter 2, panturrilha-bilateral-step 3 | Corpo todo E (38 min): afundo-tras 2, supino-inclinado 2, remada-unilateral-halter 2, cadeira-flexora 2, cadeira-extensora 2, rosca-inclinada 2
- **academia · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · sem dor**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (42 min): agachamento-smith 2, supino-reto 2, puxada-unilateral 2, cadeira-flexora 2, triceps-frances 2, elevacao-lateral 3 | Corpo todo B (37 min): stiff 2, supino-inclinado 2, remada-apoiada 2, cadeira-extensora 2, rosca-inclinada 2, panturrilha-em-pe-maquina 3 | Corpo todo C (44 min): afundo 2, supino-maquina 2, puxada-barra-reta 2, coice-maquina 2, elevacao-lateral 3, abdominal-maquina 4 | Corpo todo D (41 min): hack 2, supino-smith 2, puxada-frente 2, stiff-unilateral 2, triceps-frances-halter 2, panturrilha-leg-press 3 | Corpo todo E (36 min): bulgaro 2, supino-inclinado 2, remada-baixa 2, cadeira-flexora 2, cadeira-extensora 2, rosca-maquina 2
- **academia+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · sem dor**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (42 min): agachamento-smith 2, supino-reto 2, puxada-unilateral 2, cadeira-flexora 2, triceps-frances 2, elevacao-lateral 3 | Corpo todo B (37 min): stiff 2, supino-inclinado 2, remada-apoiada 2, cadeira-extensora 2, rosca-inclinada 2, panturrilha-em-pe-maquina 3 | Corpo todo C (44 min): afundo 2, supino-maquina 2, puxada-barra-reta 2, coice-maquina 2, elevacao-lateral 3, abdominal-maquina 4 | Corpo todo D (41 min): hack 2, supino-smith 2, puxada-frente 2, stiff-unilateral 2, triceps-frances-halter 2, panturrilha-leg-press 3 | Corpo todo E (36 min): bulgaro 2, supino-inclinado 2, remada-baixa 2, cadeira-flexora 2, cadeira-extensora 2, rosca-maquina 2

### `volume.excesso.triceps`

- **casa · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade misto · joelho 7**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (37 min): flexao 2, remada-curvada-halteres 2, stiff 2, elevacao-halteres 2, crucifixo-elastico 2, triceps-frances-halter 2 | Corpo todo B (43 min): stiff-unilateral 2, flexao 2, remada-curvada-halteres 2, desenvolvimento-unilateral 2, panturrilha-chao 3, rosca-alternada 2 | Corpo todo C (40 min): flexao 2, remada-curvada-halteres 2, ponte-gluteo-halter 2, panturrilha-chao 3, elevacao-halteres 2, abdominal-chao 2 | Corpo todo D (37 min): flexao 2, remada-curvada-halteres 2, stiff 2, elevacao-halteres 2, panturrilha-chao 2, triceps-frances-halter 2 | Corpo todo E (41 min): flexao 2, remada-curvada-halteres 2, stiff-unilateral 2, desenvolvimento-unilateral 2, rosca-alternada 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade misto · joelho 7**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (36 min): supino-reto 2, barra-fixa 2, stiff 2, elevacao-halteres 2, crucifixo-halteres 2, triceps-frances-halter 2 | Corpo todo B (43 min): stiff-unilateral 2, supino-inclinado 2, remada-apoiada 2, desenvolvimento 2, panturrilha 3, rosca-inclinada 2 | Corpo todo C (40 min): supino-reto 2, barra-fixa-supinada 2, ponte-gluteo-halter 2, panturrilha-bilateral-step 3, elevacao-halteres 2, abdominal-chao 2 | Corpo todo D (37 min): supino-reto 2, barra-fixa 2, stiff 2, elevacao-halteres 2, panturrilha 2, triceps-frances-halter 2 | Corpo todo E (40 min): supino-inclinado 2, remada-unilateral-halter 2, stiff-unilateral 2, desenvolvimento 2, rosca-inclinada 2, elevacao-joelhos 2
- **condominio · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade misto · joelho 7**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (36 min): supino-reto 2, puxada-frente 2, stiff 2, elevacao-halteres 2, crucifixo-halteres 2, triceps-frances-halter 2 | Corpo todo B (41 min): stiff-unilateral 2, supino-inclinado 2, remada-apoiada 2, desenvolvimento 2, panturrilha-chao 3, rosca-inclinada 2 | Corpo todo C (40 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, panturrilha-chao 3, elevacao-halteres 2, abdominal-chao 2 | Corpo todo D (36 min): supino-reto 2, puxada-frente 2, stiff 2, elevacao-halteres 2, panturrilha-chao 2, triceps-frances-halter 2 | Corpo todo E (40 min): supino-inclinado 2, remada-unilateral-halter 2, stiff-unilateral 2, desenvolvimento 2, rosca-inclinada 2, abdominal-chao 2

### `volume.zero.costas`

- **peso-corpo · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `volume.zero.posteriores`

- **casa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (19 min): goblet 2, flexao 2, remada-curvada-halteres 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (19 min): bulgaro 2, supino-reto 2, barra-fixa 2 | Corpo todo B (20 min): afundo 2, supino-inclinado 2, remada-apoiada 2
- **condominio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (20 min): bulgaro 2, supino-reto 2, puxada-frente 2 | Corpo todo B (20 min): afundo 2, supino-inclinado 2, remada-apoiada 2

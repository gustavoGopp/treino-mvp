# Teste de estresse do gerador (auditoria do treino)

> Gerado por `npm run auditoria:estresse`. Dados fictícios (`scripts/auditoria/cenarios.ts`). Não editar à mão.

**149.760 programas** (13 cenários × 3 níveis × 12 divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor); 0 bloqueados.

## Problemas encontrados (contagem de ocorrências)

| problema | ocorrências |
| --- | ---: |
| `seguranca.articulacao-incompleta.cotovelo` | 112.890 |
| `tempo.sobra-com-meta-abaixo` | 51.577 |
| `monotonia.repete-com-opcao` | 29.769 |
| `monotonia.todos-os-dias` | 25.403 |
| `seguranca.articulacao-incompleta.lombar` | 15.641 |
| `volume.excesso.gluteos` | 3.762 |
| `volume.zero.costas` | 3.177 |
| `equilibrio.sem-puxar` | 3.177 |
| `volume.excesso.posteriores` | 2.564 |
| `volume.excesso.costas` | 1.545 |
| `volume.excesso.biceps` | 1.355 |
| `volume.excesso.peito` | 1.130 |
| `volume.excesso.ombro_posterior` | 1.069 |
| `volume.zero.posteriores` | 1.007 |
| `volume.excesso.triceps` | 999 |
| `volume.excesso.quadriceps` | 816 |
| `volume.zero.peito` | 9 |

## Volume: % dos programas com o músculo abaixo do limiar

Limiar: a meta, se o músculo é prioridade; senão, 4 séries (o piso do mínimo eficaz).

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 37.7% | 37% | 54% | 41.3% | 24.1% | 47.3% | 51.5% | 31.6% | 18.9% | 43.4% | 45.9% |
| casa+ | 36.5% | 37.7% | 54.3% | 33% | 24% | 47.5% | 51% | 33.6% | 15.7% | 43.8% | 27.1% |
| condominio | 36.4% | 37.2% | 53.9% | 29.9% | 24.3% | 47% | 51% | 31.7% | 14.7% | 43.3% | 45.9% |
| condominio+ | 36.3% | 37.8% | 54.2% | 30.8% | 25.3% | 47.6% | 36.9% | 33.4% | 24.9% | 43.2% | 28.6% |
| academia | 37.3% | 38.6% | 54.9% | 31.7% | 26.9% | 27.3% | 34.5% | 24.7% | 19% | 29% | 30.1% |
| academia+ | 37.3% | 38.6% | 54.9% | 31.7% | 26.9% | 27.3% | 34.5% | 24.7% | 19% | 29% | 30.1% |
| peso-corpo | 47.2% | 100% | 100% | 100% | 100% | 80.4% | 48.8% | 98.8% | 19.1% | 35.8% | 35% |
| elasticos | 37.8% | 38.2% | 55% | 41.3% | 26.8% | 47.8% | 52.2% | 35.3% | 19.1% | 45.4% | 46.2% |
| halteres | 52.7% | 100% | 50.4% | 100% | 34.3% | 43.8% | 52.1% | 38% | 14.4% | 42.6% | 42.7% |
| halteres-banco | 38.9% | 68.7% | 53.2% | 70.6% | 30.2% | 52.8% | 52.4% | 39.3% | 15.1% | 43.3% | 44.7% |
| diego | 37.5% | 38.6% | 55.1% | 34.9% | 26.5% | 47.9% | 52.2% | 35.8% | 19.5% | 45.5% | 27.4% |
| bruno | 37.4% | 38.7% | 54.8% | 30.2% | 25.7% | 27.4% | 53.1% | 22.9% | 15.1% | 45.7% | 28.8% |
| bairro | 36% | 38% | 54.2% | 34.3% | 26.1% | 45.1% | 34.5% | 33% | 24.2% | 42.3% | 28.7% |

### Sem dor e com 45 min ou mais

Prioritário abaixo da meta (% dos programas em que o músculo é prioridade) / demais abaixo de 4 séries (% dos outros).

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 14% / 0% | 12.2% / 0% | 43.7% / 1.4% | 0% / 9.2% | 19.4% / 0% | 53.7% / 0% | 59.9% / 0% | 18.7% / 0% | 20.6% / 0% | 72.2% / 0% | 58.8% / 2.2% |
| casa+ | 10.5% / 0% | 15.4% / 0% | 43.7% / 1.4% | 0% / 2.5% | 17.4% / 0% | 44.7% / 0% | 59.7% / 0% | 20.7% / 0% | 12.5% / 0% | 72.5% / 0% | 59.7% / 2.2% |
| condominio | 10.2% / 0% | 15.6% / 0% | 43.5% / 1.4% | 0% / 1.1% | 18.1% / 0% | 44.7% / 0% | 59.4% / 0% | 17.1% / 0% | 10.6% / 0% | 72.4% / 0% | 59.3% / 2.2% |
| condominio+ | 10.3% / 0% | 15.4% / 0% | 43.5% / 1.4% | 0% / 2.1% | 17.8% / 0.5% | 44.9% / 0% | 15.6% / 0% | 17.1% / 0% | 23.8% / 7.4% | 72.4% / 0% | 59.3% / 5.2% |
| academia | 11.3% / 0% | 15.3% / 0% | 44.3% / 2.3% | 0% / 2.9% | 19.7% / 0.5% | 20.1% / 0% | 15.1% / 0% | 16.5% / 0% | 9.7% / 7.4% | 40.3% / 0% | 58.8% / 5.2% |
| academia+ | 11.3% / 0% | 15.3% / 0% | 44.3% / 2.3% | 0% / 2.9% | 19.7% / 0.5% | 20.1% / 0% | 15.1% / 0% | 16.5% / 0% | 9.7% / 7.4% | 40.3% / 0% | 58.8% / 5.2% |
| peso-corpo | 45.8% / 0% | 100% / 100% | 100% / 100% | 0% / 100% | 100% / 100% | 100% / 56.5% | 54.9% / 0% | 100% / 100% | 29.6% / 5.6% | 56.9% / 0% | 54.2% / 0% |
| elasticos | 13.7% / 0% | 15.3% / 0% | 46.1% / 1.4% | 0% / 9.2% | 28.5% / 0% | 55.6% / 0% | 61.9% / 0% | 25% / 0% | 22.2% / 0% | 75.2% / 0% | 62% / 2.2% |
| halteres | 58.2% / 0% | 100% / 100% | 40.4% / 0% | 0% / 100% | 56.5% / 0% | 46.1% / 0% | 62% / 0% | 16% / 0% | 11.3% / 0% | 70.4% / 0% | 58.8% / 0% |
| halteres-banco | 19.3% / 0% | 57.3% / 0% | 43.8% / 1.4% | 0% / 38.3% | 35.6% / 0% | 70.4% / 0% | 62.8% / 0% | 20.4% / 0% | 13.7% / 0% | 73.1% / 0% | 60.6% / 0.9% |
| diego | 13.1% / 0% | 17.4% / 0% | 46% / 1.4% | 0% / 2.5% | 26.9% / 0% | 54.6% / 0% | 61.4% / 0% | 24.8% / 0% | 21.1% / 0% | 75% / 0% | 62% / 2.2% |
| bruno | 11.3% / 0% | 16.8% / 0% | 44% / 2.3% | 0% / 1.1% | 19.2% / 0% | 21.1% / 0% | 59.7% / 0% | 19.1% / 0% | 12.5% / 0% | 72.4% / 0% | 56.9% / 2.2% |
| bairro | 7.3% / 0% | 15.1% / 0% | 43.5% / 1.9% | 0% / 4.8% | 19.7% / 0.5% | 29.4% / 0% | 15.4% / 0% | 15.6% / 0% | 18.8% / 7.4% | 72.2% / 0% | 58.8% / 5.2% |

### Motivo do aviso "abaixo da meta" (sem dor, 45 min ou mais)

| músculo | motivo | avisos |
| --- | --- | ---: |
| panturrilha | divisão: séries por exercício e por sessão no teto | 5.326 |
| quadríceps | divisão: séries por exercício e por sessão no teto | 3.510 |
| ombro (lateral) | divisão: séries por exercício e por sessão no teto | 2.635 |
| ombro (posterior) | nenhum exercício possível | 2.574 |
| costas | nenhum exercício possível | 2.160 |
| tríceps | divisão: séries por exercício e por sessão no teto | 2.053 |
| abdômen | divisão: séries por exercício e por sessão no teto | 1.180 |
| costas | divisão: séries por exercício e por sessão no teto | 1.176 |
| ombro (lateral) | nenhum exercício possível | 1.080 |
| bíceps | nenhum exercício possível | 1.080 |
| posteriores da coxa | nenhum exercício possível | 1.080 |
| peito | divisão: séries por exercício e por sessão no teto | 988 |
| tríceps | nenhum exercício possível | 798 |
| bíceps | divisão: séries por exercício e por sessão no teto | 780 |
| posteriores da coxa | corte de tempo | 679 |
| posteriores da coxa | divisão: séries por exercício e por sessão no teto | 624 |
| abdômen | minutos (exercícios por treino) | 600 |
| ombro (lateral) | minutos (exercícios por treino) | 506 |
| glúteos | divisão: séries por exercício e por sessão no teto | 450 |
| glúteos | corte de tempo | 436 |
| ombro (posterior) | minutos (exercícios por treino) | 413 |
| quadríceps | corte de tempo | 398 |
| peito | minutos (exercícios por treino) | 339 |
| bíceps | minutos (exercícios por treino) | 334 |
| ombro (lateral) | divisão sem vaga própria | 278 |
| panturrilha | minutos (exercícios por treino) | 218 |
| peito | corte de tempo | 204 |
| costas | corte de tempo | 192 |
| bíceps | corte de tempo | 187 |
| glúteos | divisão sem vaga própria | 180 |
| posteriores da coxa | minutos (exercícios por treino) | 172 |
| glúteos | minutos (exercícios por treino) | 96 |
| abdômen | corte de tempo | 95 |
| abdômen | divisão sem vaga própria | 86 |
| ombro (lateral) | corte de tempo | 75 |
| tríceps | corte de tempo | 66 |
| tríceps | minutos (exercícios por treino) | 64 |
| panturrilha | corte de tempo | 63 |

### Séries semanais, média por cenário

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 7,1 | 7,5 | 4,8 | 3,8 | 7,7 | 5,7 | 5,8 | 8,5 | 8,6 | 6,8 | 3,5 |
| casa+ | 7,2 | 7,5 | 4,8 | 4,8 | 7,7 | 5,6 | 5,8 | 8,4 | 9,4 | 6,7 | 4,7 |
| condominio | 7,1 | 7,5 | 4,9 | 5,3 | 7,8 | 5,6 | 5,8 | 8,5 | 10 | 6,8 | 3,5 |
| condominio+ | 7,1 | 7,4 | 4,9 | 5,2 | 7,6 | 5,6 | 7,5 | 8,2 | 7,9 | 6,8 | 4,6 |
| academia | 7,1 | 7,3 | 4,7 | 5,1 | 7,5 | 7,6 | 7,4 | 8,7 | 8,4 | 7,7 | 4,5 |
| academia+ | 7,1 | 7,3 | 4,7 | 5,1 | 7,5 | 7,6 | 7,4 | 8,7 | 8,4 | 7,7 | 4,5 |
| peso-corpo | 6,1 | 0 | 0 | 0 | 0 | 3,1 | 6 | 2,4 | 7,9 | 7,5 | 4,2 |
| elasticos | 7,1 | 7,5 | 4,7 | 3,8 | 7,5 | 5,6 | 5,7 | 8,3 | 8,5 | 6,5 | 3,5 |
| halteres | 5,7 | 0 | 5,4 | 0 | 5,7 | 5,9 | 5,7 | 8,1 | 10 | 6,8 | 3,8 |
| halteres-banco | 6,9 | 3,7 | 5,1 | 1,9 | 6,9 | 5 | 5,7 | 8 | 9,9 | 6,8 | 3,6 |
| diego | 7,1 | 7,4 | 4,7 | 4,4 | 7,5 | 5,6 | 5,7 | 8,2 | 8,4 | 6,5 | 4,7 |
| bruno | 7,1 | 7,4 | 4,7 | 5,2 | 7,5 | 7,6 | 5,6 | 9,2 | 9,4 | 6,6 | 4,6 |
| bairro | 7,5 | 7,4 | 4,9 | 4,7 | 7,6 | 5,9 | 7,5 | 8,3 | 8 | 6,8 | 4,6 |

## Equilíbrio

- Séries de puxar ÷ séries de empurrar: mediana 1 (10% dos programas abaixo de 0.71, 10% acima de 1.71).
- Posteriores ÷ quadríceps (volume semanal): mediana 1.04 (p10 0.33, p90 1.5).

## Escolha

### Os 25 exercícios que mais aparecem como vaga

| exercício | vezes | guia |
| --- | ---: | --- |
| ponte-gluteo | 177.484 | sem animação |
| panturrilha-chao | 171.538 | animação |
| abdominal-chao | 160.988 | animação |
| elevacao-halteres | 136.432 | animação |
| flexao | 128.402 | animação |
| stiff | 109.082 | animação |
| rosca-alternada | 100.166 | animação |
| afundo | 85.660 | animação |
| triceps-frances-halter | 82.720 | animação |
| supino-reto | 79.870 | animação |
| remada-apoiada | 69.781 | animação |
| crucifixo-halteres | 69.099 | sem animação |
| stiff-unilateral | 66.487 | animação |
| rosca-inclinada | 63.501 | animação |
| crucifixo-inverso | 59.692 | sem animação |
| cadeira-extensora | 58.429 | sem animação |
| supino-inclinado | 58.240 | animação |
| cadeira-flexora | 56.693 | sem animação |
| flexao-joelho-elastico | 56.435 | sem animação |
| panturrilha | 55.196 | animação |
| elevacao-joelhos | 50.629 | animação |
| bulgaro | 50.129 | animação |
| hip-thrust | 44.168 | sem animação |
| remada-elastico | 41.343 | sem animação |
| rosca-elastico | 40.504 | sem animação |

### Possíveis que nunca aparecem como vaga, por cenário

| cenário | possíveis | aparecem | nunca como vaga | nem como alternativa |
| --- | ---: | ---: | --- | --- |
| casa | 29 | 22 | elevacao-lateral-elastico, triceps-elastico-acima, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico | — |
| casa+ | 46 | 32 | flexao-elastico, puxada-elastico, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, triceps-elastico-acima, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, goblet-kettlebell, remada-suspensao | — |
| condominio | 29 | 26 | agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo | — |
| condominio+ | 55 | 33 | flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, flexao-bola, flexao-joelho-elastico, goblet-kettlebell | — |
| academia | 85 | 66 | supino-polia, barra-fixa, barra-fixa-supinada, remada-barra, remada-invertida, goblet, agachamento-halteres, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, abdominal-chao, terra-hexagonal, mergulho, mergulho-graviton, barra-fixa-graviton, remada-baixa-estacao, hiperextensao | — |
| academia+ | 102 | 67 | supino-polia, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-invertida, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, goblet, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, flexao-bola, flexao-joelho-elastico, abdominal-declinado, abdominal-chao, terra-hexagonal, goblet-kettlebell, mergulho, mergulho-graviton, barra-fixa-graviton, remada-baixa-estacao, remada-suspensao, hiperextensao | — |
| peso-corpo | 7 | 7 | — | — |
| elasticos | 19 | 19 | — | — |
| halteres | 17 | 14 | agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo | — |
| halteres-banco | 21 | 18 | agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo | — |
| diego | 22 | 22 | — | — |
| bruno | 64 | 43 | supino-polia, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, abdominal-declinado, abdominal-chao | — |
| bairro | 34 | 29 | agachamento-halteres, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo | — |

### Funções sem opção ou com uma só (nível intermediário, sem dor)

| cenário | empurrar-horizontal | empurrar-inclinado | crucifixo | puxar-vertical | puxar-horizontal | empurrar-vertical | elevacao-lateral | ombro-posterior | biceps | triceps-acima-cabeca | triceps-complemento | agachar | afundo | extensora | flexao-joelho | dobrar-quadril | extensao-quadril | abducao | aducao | panturrilha-em-pe | panturrilha-sentada | abdomen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| casa | 2 (nível 2) | 1 (nível 3) | 1 (nível 2) | 1 (nível 3) | 1 (nível 3) | 2 (nível 1) | 2 (nível 1) | 1 (nível 2) | 2 (nível 2) | 2 (nível 1) | nenhuma | 4 (nível 2) | 4 (nível 1) | nenhuma | 1 (nível 3) | 3 (nível 1) | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| casa+ | 3 (nível 1) | 3 (nível 1) | 2 (nível 1) | 5 (nível 1) | 4 (nível 1) | 3 (nível 1) | 2 (nível 1) | 2 (nível 1) | 3 (nível 1) | 2 (nível 1) | nenhuma | 6 (nível 2) | 5 (nível 1) | nenhuma | 2 (nível 3) | 3 (nível 1) | 1 (nível 2) | nenhuma | nenhuma | 3 (nível 1) | nenhuma | 2 (nível 2) |
| condominio | 2 (nível 1) | 3 (nível 1) | 1 (nível 1) | 2 (nível 1) | 3 (nível 1) | 2 (nível 1) | 1 (nível 1) | 1 (nível 1) | 2 (nível 1) | 1 (nível 1) | nenhuma | 4 (nível 2) | 5 (nível 1) | nenhuma | 1 (nível 3) | 2 (nível 1) | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| condominio+ | 4 (nível 1) | 4 (nível 1) | 3 (nível 1) | 5 (nível 1) | 5 (nível 1) | 3 (nível 1) | 2 (nível 1) | 2 (nível 1) | 4 (nível 1) | 2 (nível 1) | nenhuma | 6 (nível 2) | 5 (nível 1) | 1 (nível 1) | 3 (nível 1) | 4 (nível 1) | 2 (nível 1) | nenhuma | nenhuma | 3 (nível 1) | nenhuma | 2 (nível 2) |
| academia | 8 (nível 1) | 7 (nível 1) | 4 (nível 1) | 8 (nível 1) | 7 (nível 1) | 4 (nível 1) | 2 (nível 1) | 2 (nível 1) | 7 (nível 1) | 2 (nível 1) | 4 (nível 1) | 9 (nível 1) | 5 (nível 1) | 1 (nível 1) | 2 (nível 1) | 5 (nível 1) | 5 (nível 1) | 2 (nível 1) | 1 (nível 1) | 5 (nível 1) | 1 (nível 1) | 4 (nível 1) |
| academia+ | 9 (nível 1) | 7 (nível 1) | 5 (nível 1) | 10 (nível 1) | 9 (nível 1) | 5 (nível 1) | 3 (nível 1) | 4 (nível 1) | 8 (nível 1) | 3 (nível 1) | 4 (nível 1) | 11 (nível 1) | 5 (nível 1) | 1 (nível 1) | 4 (nível 1) | 6 (nível 1) | 5 (nível 1) | 2 (nível 1) | 1 (nível 1) | 5 (nível 1) | 1 (nível 1) | 5 (nível 1) |
| peso-corpo | 1 (nível 2) | 1 (nível 3) | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | nenhuma | 1 (nível 3) | 2 (nível 2) | nenhuma | nenhuma (vira dobrar-quadril) | nenhuma | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| elasticos | 2 (nível 2) | 1 (nível 3) | 1 (nível 2) | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | 1 (nível 2) | 1 (nível 2) | 1 (nível 3) | 1 (nível 1) | nenhuma | 2 (nível 3) | 2 (nível 2) | nenhuma | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| halteres | 1 (nível 2) | 1 (nível 3) | nenhuma | nenhuma | nenhuma | 1 (nível 1) | 1 (nível 1) | nenhuma | 1 (nível 2) | 1 (nível 1) | nenhuma | 3 (nível 2) | 4 (nível 1) | nenhuma | 0 (via dobrar-quadril) | 2 (nível 1) | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| halteres-banco | 2 (nível 1) | 2 (nível 2) | 1 (nível 1) | 1 (nível 2) | 1 (nível 1) | 1 (nível 1) | 1 (nível 1) | nenhuma | 1 (nível 2) | 1 (nível 1) | nenhuma | 4 (nível 2) | 5 (nível 1) | nenhuma | 0 (via dobrar-quadril) | 2 (nível 1) | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 1 (nível 2) |
| diego | 2 (nível 2) | 1 (nível 3) | 1 (nível 2) | 3 (nível 1) | 1 (nível 3) | 1 (nível 2) | 1 (nível 2) | 1 (nível 2) | 1 (nível 3) | 1 (nível 1) | nenhuma | 2 (nível 3) | 2 (nível 2) | nenhuma | 1 (nível 3) | 1 (nível 3) | 1 (nível 2) | nenhuma | nenhuma | 1 (nível 2) | nenhuma | 2 (nível 2) |
| bruno | 4 (nível 1) | 6 (nível 1) | 4 (nível 1) | 6 (nível 1) | 5 (nível 1) | 3 (nível 1) | 3 (nível 1) | 3 (nível 1) | 5 (nível 1) | 3 (nível 1) | 2 (nível 1) | 5 (nível 2) | 5 (nível 1) | nenhuma | 2 (nível 3) | 5 (nível 1) | 2 (nível 1) | nenhuma | nenhuma | 3 (nível 1) | nenhuma | 4 (nível 1) |
| bairro | 3 (nível 1) | 3 (nível 1) | 1 (nível 1) | 3 (nível 1) | 2 (nível 1) | 2 (nível 1) | 1 (nível 1) | 1 (nível 1) | 2 (nível 1) | 1 (nível 1) | 1 (nível 2) | 5 (nível 1) | 5 (nível 1) | 1 (nível 1) | 1 (nível 1) | 2 (nível 1) | 1 (nível 2) | nenhuma | nenhuma | 2 (nível 1) | nenhuma | 2 (nível 2) |

## Monotonia

- Programas de 3 dias ou mais com um exercício (fora o abdominal) em **todos** os dias: 25.403 de 137.280 (18.5%).
- Programas que repetem um exercício em 2 dias ou mais com outro do mesmo nível da função possível e sem uso: 29.769 (21.7%).

## Tempo

- Dias acima dos minutos: 43.529 de 624.000 (7%); **sem aviso: 0**.
- Programas cujo dia mais longo usa menos de 70% dos minutos: 61.006 (40.7%); destes, 0 ainda dizem que a meta ficou de fora "porque cabem cerca de N exercícios".

| minutos | programas | dia mais longo (mediana, min) | sobra > 30% |
| ---: | ---: | ---: | ---: |
| 20 | 18720 | 24 | 0% |
| 30 | 18720 | 30 | 0.4% |
| 45 | 18720 | 44 | 4% |
| 60 | 18720 | 53 | 17.5% |
| 75 | 18720 | 54 | 44.9% |
| 90 | 18720 | 54 | 66.6% |
| 120 | 18720 | 54 | 93.3% |
| 150 | 18720 | 54 | 99.3% |

## Segurança

- Programas com uma região acima de 5: 112.320. Exercício que carrega a região marcada no dado: **0**.
- Exercício que, pelo padrão de movimento, carrega a região com dor > 5, mas o dado não marca (fica no programa): 128.531 ocorrências.
- Dor de 3 a 5 sem lembrete: 0; com um equivalente do mesmo nível que poupava a região e ficou de fora: 0.

| exercício : região que falta | ocorrências |
| --- | ---: |
| flexao:cotovelo | 37.308 |
| desenvolvimento-unilateral:cotovelo | 15.765 |
| pull-through:lombar | 15.641 |
| remada-apoiada:cotovelo | 11.493 |
| remada-unilateral-halter:cotovelo | 11.027 |
| puxada-elastico:cotovelo | 8.280 |
| remada-elastico:cotovelo | 7.065 |
| puxada-frente:cotovelo | 5.970 |
| puxada-unilateral:cotovelo | 4.500 |
| puxada-barra-reta:cotovelo | 3.330 |
| desenvolvimento-elastico:cotovelo | 3.290 |
| remada-baixa:cotovelo | 2.404 |
| desenvolvimento-barra:cotovelo | 1.420 |
| flexao-elastico:cotovelo | 798 |
| remada-baixa-estacao:cotovelo | 240 |

## Treino do dia num 2º local

- 60 dias testados, 224 trocas por equivalente, 12 vagas que ficaram de fora no dia.
  - academia → halteres-banco · iniciante · Superior A: fora hoje rosca-inclinada (aqui não tem banco que inclina, e nenhum exercício possível substitui rosca inclinada com halteres: a vaga fica de fora hoje); crucifixo-inverso (aqui não tem banco que inclina, e nenhum exercício possível substitui crucifixo inverso com halteres, peito apoiado no banco inclinado: a vaga fica de fora hoje)
  - academia → halteres-banco · iniciante · Superior B: fora hoje triceps-corda (aqui não tem polia alta, e nenhum exercício possível substitui tríceps na polia com corda: a vaga fica de fora hoje); crucifixo-inverso (aqui não tem banco que inclina, e nenhum exercício possível substitui crucifixo inverso com halteres, peito apoiado no banco inclinado: a vaga fica de fora hoje)
  - academia → halteres-banco · intermediario · Superior A: fora hoje rosca-inclinada (aqui não tem banco que inclina, e nenhum exercício possível substitui rosca inclinada com halteres: a vaga fica de fora hoje); face-pull (aqui não tem polia alta, e nenhum exercício possível substitui face pull com corda: a vaga fica de fora hoje)
  - academia → halteres-banco · intermediario · Superior B: fora hoje triceps-corda (aqui não tem polia alta, e nenhum exercício possível substitui tríceps na polia com corda: a vaga fica de fora hoje); crucifixo-inverso (aqui não tem banco que inclina, e nenhum exercício possível substitui crucifixo inverso com halteres, peito apoiado no banco inclinado: a vaga fica de fora hoje)
  - academia → halteres-banco · avancado · Superior A: fora hoje rosca-inclinada (aqui não tem banco que inclina, e nenhum exercício possível substitui rosca inclinada com halteres: a vaga fica de fora hoje); face-pull (aqui não tem polia alta, e nenhum exercício possível substitui face pull com corda: a vaga fica de fora hoje)
  - academia → halteres-banco · avancado · Superior B: fora hoje triceps-corda (aqui não tem polia alta, e nenhum exercício possível substitui tríceps na polia com corda: a vaga fica de fora hoje); crucifixo-inverso (aqui não tem banco que inclina, e nenhum exercício possível substitui crucifixo inverso com halteres, peito apoiado no banco inclinado: a vaga fica de fora hoje)

## Exemplos (3 por problema, de cenários diferentes)

### `equilibrio.sem-puxar`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · sem dor**: 6 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (26 min): goblet 4, flexao 2, triceps-frances-halter 2+drop | Corpo todo B (26 min): stiff 4, flexao 2, panturrilha-chao 2+drop | Corpo todo C (28 min): afundo 4, flexao 2, panturrilha-chao 2+drop
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · sem dor**: 6 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (27 min): bulgaro 4, supino-reto 2, triceps-frances-halter 2+drop | Corpo todo B (26 min): stiff 4, supino-inclinado 2, panturrilha 2+drop | Corpo todo C (27 min): afundo 4, supino-reto 2, panturrilha-bilateral-step 2+drop
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · sem dor**: 6 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (27 min): bulgaro 4, supino-reto 2, triceps-frances-halter 2+drop | Corpo todo B (24 min): stiff 4, supino-inclinado 2, panturrilha-chao 2+drop | Corpo todo C (27 min): afundo 4, supino-reto 2, panturrilha-chao 2+drop

### `monotonia.repete-com-opcao`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade nenhuma · joelho 7 + lombar 7**: triceps-frances-halter em 2 dias (triceps-acima-cabeca), com triceps-elastico-acima do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (45 min): flexao 2, puxada-elastico 2, ponte-gluteo 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-elastico 2, rosca-alternada 2 | Corpo todo B (53 min): flexao 2, remada-elastico 2, ponte-gluteo 2, desenvolvimento-elastico 2, rosca-alternada 2, panturrilha-chao 3, face-pull-elastico 4 | Corpo todo C (45 min): flexao 2, puxada-elastico 2, ponte-gluteo 2, elevacao-halteres 2, panturrilha-chao 3, triceps-frances-halter 2, rosca-alternada 2
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade nenhuma · cotovelo 7**: remada-unilateral-halter em 2 dias (puxar-vertical), com remada-suspensao do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (22 min): bulgaro 2, flexao 2, remada-unilateral-halter 2 | Corpo todo B (22 min): stiff 4, panturrilha 3+drop | Corpo todo C (22 min): afundo 2, flexao 2, remada-unilateral-halter 2
- **condominio · iniciante · Superior/Inferior (2x) (4 dias) · 60 min · prioridade superior · sem dor**: desenvolvimento em 2 dias (empurrar-vertical), com desenvolvimento-unilateral do mesmo nível possível e sem uso.
  - Programa: Superior A (48 min): supino-reto 2, puxada-frente 2, remada-apoiada 2, desenvolvimento 2, triceps-frances-halter 4, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2 | Inferior A (35 min): bulgaro 3, stiff 2, flexao-bola 2, panturrilha-chao 3, abdominal-chao 2 | Superior B (45 min): supino-inclinado 2, remada-unilateral-halter 2, puxada-frente 2, desenvolvimento 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior B (49 min): afundo 3, ponte-gluteo 2, stiff-unilateral 2, elevacao-halteres 2, flexao-bola 2, panturrilha-chao 3, abdominal-chao 2

### `monotonia.todos-os-dias`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade nenhuma · sem dor**: flexao em todos os 3 dias.
  - Programa: Corpo todo A (18 min): goblet 2, flexao 2, triceps-frances-halter 2+drop | Corpo todo B (28 min): stiff 4, flexao 2, panturrilha-chao 3+drop | Corpo todo C (27 min): afundo 2, flexao 2, puxada-elastico 4
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 30 min · prioridade superior · ombro 7**: rosca-alternada em todos os 3 dias.
  - Programa: Corpo todo A (30 min): bulgaro 3, rosca-alternada 3, flexao-bola 3, abdominal-chao 2 | Corpo todo B (28 min): stiff 2, rosca-alternada 3, panturrilha 4, abdominal-chao 2 | Corpo todo C (29 min): afundo 3, ponte-gluteo 2, rosca-alternada 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 30 min · prioridade superior · ombro 7**: rosca-alternada em todos os 3 dias.
  - Programa: Corpo todo A (30 min): bulgaro 3, rosca-alternada 3, flexao-bola 3, abdominal-chao 2 | Corpo todo B (28 min): stiff 2, rosca-alternada 3, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (29 min): afundo 3, ponte-gluteo 2, rosca-alternada 2, abdominal-chao 2

### `seguranca.articulacao-incompleta.cotovelo`

- **casa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · cotovelo 7**: flexao fica no programa com dor cotovelo > 5: o dado não marca essa região.
  - Programa: Corpo todo A (21 min): goblet 2, flexao 2, panturrilha-chao 3+drop | Corpo todo B (27 min): afundo 2, flexao 2, remada-elastico 4
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · cotovelo 7**: flexao fica no programa com dor cotovelo > 5: o dado não marca essa região.
  - Programa: Corpo todo A (24 min): bulgaro 2, flexao 2, panturrilha 3+drop | Corpo todo B (27 min): afundo 2, remada-apoiada 4, crucifixo-halteres 2+drop
- **condominio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · cotovelo 7**: flexao fica no programa com dor cotovelo > 5: o dado não marca essa região.
  - Programa: Corpo todo A (22 min): bulgaro 2, flexao 2, panturrilha-chao 3+drop | Corpo todo B (27 min): afundo 2, remada-apoiada 4, crucifixo-halteres 2+drop

### `seguranca.articulacao-incompleta.lombar`

- **academia · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · joelho 7 + lombar 7**: pull-through fica no programa com dor lombar > 5: o dado não marca essa região.
  - Programa: Corpo todo A (20 min): supino-reto 3, triceps-frances 3, panturrilha-em-pe-maquina 3+drop | Corpo todo B (31 min): supino-inclinado 2, remada-apoiada 4, pull-through 4
- **academia+ · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · joelho 7 + lombar 7**: pull-through fica no programa com dor lombar > 5: o dado não marca essa região.
  - Programa: Corpo todo A (20 min): supino-reto 3, triceps-frances 3, panturrilha-em-pe-maquina 3+drop | Corpo todo B (31 min): supino-inclinado 2, remada-apoiada 4, pull-through 4
- **bruno · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · joelho 7 + lombar 7**: pull-through fica no programa com dor lombar > 5: o dado não marca essa região.
  - Programa: Corpo todo A (21 min): supino-reto 2, triceps-frances 2+drop, panturrilha 3+drop | Corpo todo B (31 min): supino-inclinado 2, remada-apoiada 4, pull-through 4

### `tempo.sobra-com-meta-abaixo`

- **casa · iniciante · Corpo todo A/B (2 dias) · 60 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 40 de 60 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (40 min): goblet 3, stiff 3, panturrilha-chao 4, rosca-alternada 3, abdominal-chao 2 | Corpo todo B (36 min): afundo 3, ponte-gluteo 2, flexao-joelho-elastico 2, rosca-alternada 3, abdominal-chao 2
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 45 de 75 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (45 min): bulgaro 3, stiff 3, panturrilha 4, rosca-alternada 3, abdominal-chao 2 | Corpo todo B (35 min): afundo 3, ponte-gluteo 2, flexao-bola 2, rosca-alternada 3, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B (2 dias) · 75 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 42 de 75 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (42 min): bulgaro 3, stiff 3, panturrilha-chao 4, rosca-alternada 3, abdominal-chao 2 | Corpo todo B (35 min): afundo 3, ponte-gluteo 2, flexao-bola 2, rosca-alternada 3, abdominal-chao 2

### `volume.excesso.biceps`

- **casa · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade nenhuma · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (43 min): flexao 2, puxada-elastico 2, ponte-gluteo 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-elastico 2, rosca-alternada 2 | Corpo todo B (48 min): flexao 2, remada-elastico 2, ponte-gluteo 2, desenvolvimento-elastico 2, rosca-alternada 2, panturrilha-chao 3, face-pull-elastico 2 | Corpo todo C (45 min): flexao 2, puxada-elastico 2, ponte-gluteo 2, elevacao-halteres 2, panturrilha-chao 3, triceps-frances-halter 2, rosca-alternada 2 | Corpo todo D (40 min): flexao 2, remada-elastico 2, ponte-gluteo 2, desenvolvimento-elastico 2, rosca-alternada 2, face-pull-elastico 2
- **casa+ · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade inferior · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (48 min): ponte-gluteo 2, supino-reto 2, barra-fixa 2, triceps-frances-halter 2, elevacao-halteres 3, crucifixo-halteres 2, rosca-inclinada 2, elevacao-joelhos 2 | Corpo todo B (49 min): ponte-gluteo 2, supino-inclinado 2, remada-apoiada 2, panturrilha 4, rosca-inclinada 2, crucifixo-inverso 2, elevacao-joelhos 2 | Corpo todo C (51 min): ponte-gluteo 2, supino-reto 2, barra-fixa-supinada 2, panturrilha-bilateral-step 4, elevacao-halteres 2, triceps-frances-halter 2, rosca-inclinada 2, elevacao-joelhos 2 | Corpo todo D (43 min): ponte-gluteo 2, supino-inclinado 2, remada-apoiada 2, desenvolvimento 2, rosca-inclinada 2, crucifixo-inverso 2, elevacao-joelhos 2
- **condominio · iniciante · Corpo todo 4x (4 dias) · 60 min · prioridade nenhuma · joelho 7 + lombar 7**: bíceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (41 min): supino-reto 2, puxada-frente 2, ponte-gluteo 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2, rosca-inclinada 2 | Corpo todo B (46 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo 2, desenvolvimento 2, rosca-inclinada 2, panturrilha-chao 3, crucifixo-inverso 2 | Corpo todo C (44 min): supino-reto 2, puxada-frente 2, ponte-gluteo 2, elevacao-halteres 2, panturrilha-chao 3, triceps-frances-halter 2, rosca-inclinada 2 | Corpo todo D (38 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo 2, desenvolvimento 2, rosca-inclinada 2, crucifixo-inverso 2

### `volume.excesso.costas`

- **casa · iniciante · Corpo todo 5x (5 dias) · 30 min · prioridade nenhuma · joelho 7 + lombar 7**: costas sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (26 min): flexao 2, puxada-elastico 2, triceps-frances-halter 2, elevacao-halteres 3 | Corpo todo B (26 min): flexao 2, remada-elastico 2, rosca-alternada 2, panturrilha-chao 3 | Corpo todo C (32 min): flexao 2, puxada-elastico 2, ponte-gluteo 4, elevacao-halteres 2+drop | Corpo todo D (26 min): flexao 2, puxada-elastico 2, triceps-frances-halter 2, panturrilha-chao 3 | Corpo todo E (29 min): flexao 2, remada-elastico 2, rosca-alternada 2, face-pull-elastico 4
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · sem dor**: costas sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (39 min): bulgaro 2, supino-reto 2, barra-fixa 2, flexao-bola 2, triceps-frances-halter 2, elevacao-halteres 3 | Corpo todo B (40 min): stiff 2, supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, panturrilha 3, crucifixo-inverso 2 | Corpo todo C (43 min): afundo 2, supino-reto 2, barra-fixa-supinada 2, ponte-gluteo 2, elevacao-halteres 3, abdominal-chao 2 | Corpo todo D (41 min): goblet 2, supino-reto 2, barra-fixa 2, stiff-unilateral 2, triceps-frances-halter 2, panturrilha-bilateral-step 3 | Corpo todo E (38 min): afundo-tras 2, supino-inclinado 2, remada-unilateral-halter 2, flexao-joelho-elastico 2, rosca-inclinada 2, elevacao-joelhos 2
- **condominio · iniciante · Corpo todo 5x (5 dias) · 30 min · prioridade nenhuma · joelho 7 + lombar 7**: costas sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (25 min): supino-reto 2, puxada-frente 2, triceps-frances-halter 2, elevacao-halteres 3 | Corpo todo B (25 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, panturrilha-chao 3 | Corpo todo C (31 min): supino-reto 2, puxada-frente 2, ponte-gluteo 4, elevacao-halteres 2+drop | Corpo todo D (25 min): supino-reto 2, puxada-frente 2, triceps-frances-halter 2, panturrilha-chao 3 | Corpo todo E (22 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, crucifixo-inverso 2

### `volume.excesso.gluteos`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade misto · ombro 7**: glúteos sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (32 min): goblet 3, ponte-gluteo 2, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (45 min): stiff 2, afundo-tras 3, ponte-gluteo 2, panturrilha-chao 4, rosca-alternada 2, abdominal-chao 2 | Corpo todo C (40 min): afundo 2, ponte-gluteo 2, panturrilha-chao 4, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade nenhuma · ombro 7**: glúteos sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (30 min): bulgaro 2, ponte-gluteo 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, goblet 2, ponte-gluteo 2, rosca-alternada 2, panturrilha 3, abdominal-chao 2 | Corpo todo C (38 min): afundo 2, ponte-gluteo 2, flexao-joelho-elastico 2, panturrilha-bilateral-step 3, rosca-alternada 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade nenhuma · ombro 7**: glúteos sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (30 min): bulgaro 2, ponte-gluteo 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, goblet 2, ponte-gluteo 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo 2, flexao-bola 2, panturrilha-chao 3, rosca-alternada 2, abdominal-chao 2

### `volume.excesso.ombro_posterior`

- **casa+ · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · cotovelo 7**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (35 min): flexao 2, remada-unilateral-halter 2, remada-apoiada 2, elevacao-halteres 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior A (31 min): bulgaro 2, stiff 2, flexao-bola 2, panturrilha 2, abdominal-chao 2 | Superior B (36 min): remada-apoiada 2, remada-unilateral-halter 2, desenvolvimento-unilateral 2, crucifixo-halteres 2, elevacao-halteres 2, crucifixo-inverso 2 | Inferior B (38 min): afundo 2, ponte-gluteo 2, stiff-unilateral 2, flexao-joelho-elastico 2, panturrilha-bilateral-step 2, elevacao-joelhos 2 | Superior C (35 min): flexao 2, remada-unilateral-halter 2, remada-apoiada 2, elevacao-halteres 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior C (38 min): afundo-tras 2, ponte-gluteo 2, stiff 2, flexao-bola 2, panturrilha 2, abdominal-chao 2
- **condominio · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · cotovelo 7**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (33 min): flexao 2, puxada-frente 2, remada-apoiada 2, elevacao-halteres 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior A (30 min): bulgaro 2, stiff 2, flexao-bola 2, panturrilha-chao 2, abdominal-chao 2 | Superior B (36 min): remada-unilateral-halter 2, puxada-frente 2, desenvolvimento-unilateral 2, crucifixo-halteres 2, elevacao-halteres 2, crucifixo-inverso 2 | Inferior B (38 min): afundo 2, ponte-gluteo 2, stiff-unilateral 2, flexao-bola 2, panturrilha-chao 2, abdominal-chao 2 | Superior C (33 min): flexao 2, puxada-frente 2, remada-baixa-estacao 2, elevacao-halteres 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior C (37 min): afundo-tras 2, ponte-gluteo 2, stiff 2, flexao-bola 2, panturrilha-chao 2, abdominal-chao 2
- **condominio+ · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · cotovelo 7**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (33 min): flexao 2, puxada-frente 2, remada-apoiada 2, elevacao-halteres 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior A (35 min): bulgaro 2, stiff 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha 2, abdominal-chao 2 | Superior B (36 min): remada-unilateral-halter 2, puxada-frente 2, desenvolvimento-unilateral 2, voador 2, elevacao-halteres 2, crucifixo-inverso 2 | Inferior B (34 min): afundo 2, hip-thrust 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha-bilateral-step 2, elevacao-joelhos 2 | Superior C (33 min): flexao 2, puxada-frente 2, remada-baixa-estacao 2, elevacao-halteres 2, crucifixo-halteres 2, crucifixo-inverso 2 | Inferior C (35 min): afundo-tras 2, hip-thrust 2, cadeira-flexora 2, cadeira-extensora 2, panturrilha 2, abdominal-chao 2

### `volume.excesso.peito`

- **casa · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 14 séries (máximo do nível 10).
  - Programa: Corpo todo A (38 min): flexao 2, puxada-elastico 2, ponte-gluteo 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-elastico 2 | Corpo todo B (38 min): flexao 2, remada-elastico 2, ponte-gluteo 2, rosca-alternada 2, panturrilha-chao 2, face-pull-elastico 2 | Corpo todo C (38 min): flexao 2, puxada-elastico 2, ponte-gluteo 2, elevacao-halteres 2, panturrilha-chao 2, rosca-alternada 2 | Corpo todo D (34 min): flexao 2, puxada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2, panturrilha-chao 2, crucifixo-elastico 2 | Corpo todo E (40 min): flexao 2, remada-elastico 2, ponte-gluteo 2, desenvolvimento-elastico 2, rosca-alternada 2, face-pull-elastico 2
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (32 min): supino-reto 2, barra-fixa 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2, elevacao-joelhos 2 | Corpo todo B (33 min): supino-inclinado 2, remada-apoiada 2, rosca-inclinada 2, panturrilha 2, crucifixo-inverso 2, elevacao-joelhos 2 | Corpo todo C (40 min): supino-reto 2, barra-fixa-supinada 2, ponte-gluteo 3, elevacao-halteres 2, panturrilha-chao 2, elevacao-joelhos 2 | Corpo todo D (32 min): supino-reto 2, barra-fixa 2, triceps-frances-halter 2, elevacao-halteres 2, panturrilha-bilateral-step 2, elevacao-joelhos 2 | Corpo todo E (39 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo 3, rosca-inclinada 2, crucifixo-inverso 2, elevacao-joelhos 2
- **condominio · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 14 séries (máximo do nível 10).
  - Programa: Corpo todo A (37 min): supino-reto 2, puxada-frente 2, ponte-gluteo 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2 | Corpo todo B (37 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo 2, rosca-inclinada 2, panturrilha-chao 2, crucifixo-inverso 2 | Corpo todo C (37 min): supino-reto 2, puxada-frente 2, ponte-gluteo 2, elevacao-halteres 2, panturrilha-chao 2, rosca-inclinada 2 | Corpo todo D (32 min): supino-reto 2, puxada-frente 2, triceps-frances-halter 2, elevacao-halteres 2, panturrilha-chao 2, crucifixo-halteres 2 | Corpo todo E (38 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo 2, desenvolvimento 2, rosca-inclinada 2, crucifixo-inverso 2

### `volume.excesso.posteriores`

- **casa · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (29 min): goblet 2, ponte-gluteo 2, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, agachamento-halteres 2, ponte-gluteo 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (38 min): afundo 2, ponte-gluteo 2, flexao-joelho-elastico 2, panturrilha-chao 3, rosca-alternada 2, abdominal-chao 2 | Corpo todo D (30 min): afundo-tras 2, ponte-gluteo 2, flexao-joelho-elastico 2, rosca-alternada 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (30 min): bulgaro 2, ponte-gluteo 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (40 min): stiff 2, goblet 2, ponte-gluteo 2, rosca-alternada 2, panturrilha 3, abdominal-chao 2 | Corpo todo C (38 min): afundo 2, ponte-gluteo 2, flexao-joelho-elastico 2, panturrilha-bilateral-step 3, rosca-alternada 2, abdominal-chao 2 | Corpo todo D (30 min): afundo-tras 2, ponte-gluteo 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo 4x (4 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (30 min): bulgaro 2, ponte-gluteo 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2 | Corpo todo B (38 min): stiff 2, goblet 2, ponte-gluteo 2, rosca-alternada 2, panturrilha-chao 3, abdominal-chao 2 | Corpo todo C (37 min): afundo 2, ponte-gluteo 2, flexao-bola 2, panturrilha-chao 3, rosca-alternada 2, abdominal-chao 2 | Corpo todo D (30 min): afundo-tras 2, ponte-gluteo 2, flexao-bola 2, rosca-alternada 2, abdominal-chao 2

### `volume.excesso.quadriceps`

- **condominio+ · iniciante · Corpo todo 5x (5 dias) · 20 min · prioridade nenhuma · sem dor**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (18 min): bulgaro 2, supino-reto 2, triceps-frances-halter 2 | Corpo todo B (22 min): stiff 4, cadeira-extensora 2, panturrilha 2+drop | Corpo todo C (25 min): afundo 2, supino-maquina 2, puxada-frente 4 | Corpo todo D (19 min): goblet 2, triceps-frances-halter 2, panturrilha-bilateral-step 3 | Corpo todo E (18 min): afundo-tras 2, supino-inclinado 2, cadeira-extensora 2
- **academia · iniciante · Corpo todo 5x (5 dias) · 20 min · prioridade nenhuma · sem dor**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (19 min): agachamento-smith 2, supino-reto 2, triceps-frances 2 | Corpo todo B (19 min): stiff 4, cadeira-extensora 2, panturrilha-em-pe-maquina 2+drop | Corpo todo C (29 min): afundo 2, supino-maquina 2, puxada-unilateral 4 | Corpo todo D (18 min): hack 2, triceps-frances-halter 2, panturrilha-leg-press 3 | Corpo todo E (18 min): bulgaro 2, supino-inclinado 2, cadeira-extensora 2
- **academia+ · iniciante · Corpo todo 5x (5 dias) · 20 min · prioridade nenhuma · sem dor**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (19 min): agachamento-smith 2, supino-reto 2, triceps-frances 2 | Corpo todo B (19 min): stiff 4, cadeira-extensora 2, panturrilha-em-pe-maquina 2+drop | Corpo todo C (29 min): afundo 2, supino-maquina 2, puxada-unilateral 4 | Corpo todo D (18 min): hack 2, triceps-frances-halter 2, panturrilha-leg-press 3 | Corpo todo E (18 min): bulgaro 2, supino-inclinado 2, cadeira-extensora 2

### `volume.excesso.triceps`

- **casa · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade misto · joelho 7**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (37 min): flexao 2, puxada-elastico 2, stiff 2, elevacao-halteres 2, crucifixo-elastico 2, triceps-frances-halter 2 | Corpo todo B (44 min): stiff-unilateral 2, flexao 2, remada-elastico 2, desenvolvimento-unilateral 2, panturrilha-chao 3, rosca-alternada 2 | Corpo todo C (41 min): flexao 2, puxada-elastico 2, ponte-gluteo 2, panturrilha-chao 3, elevacao-halteres 2, abdominal-chao 2 | Corpo todo D (37 min): flexao 2, puxada-elastico 2, stiff 2, elevacao-halteres 2, panturrilha-chao 2, triceps-frances-halter 2 | Corpo todo E (42 min): flexao 2, remada-elastico 2, stiff-unilateral 2, desenvolvimento-unilateral 2, rosca-alternada 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade misto · joelho 7**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (36 min): supino-reto 2, barra-fixa 2, stiff 2, elevacao-halteres 2, crucifixo-halteres 2, triceps-frances-halter 2 | Corpo todo B (43 min): stiff-unilateral 2, supino-inclinado 2, remada-apoiada 2, desenvolvimento 2, panturrilha 3, rosca-inclinada 2 | Corpo todo C (40 min): supino-reto 2, barra-fixa-supinada 2, ponte-gluteo 2, panturrilha-bilateral-step 3, elevacao-halteres 2, abdominal-chao 2 | Corpo todo D (37 min): supino-reto 2, barra-fixa 2, stiff 2, elevacao-halteres 2, panturrilha 2, triceps-frances-halter 2 | Corpo todo E (40 min): supino-inclinado 2, remada-unilateral-halter 2, stiff-unilateral 2, desenvolvimento 2, rosca-inclinada 2, elevacao-joelhos 2
- **condominio · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade misto · joelho 7**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (36 min): supino-reto 2, puxada-frente 2, stiff 2, elevacao-halteres 2, crucifixo-halteres 2, triceps-frances-halter 2 | Corpo todo B (41 min): stiff-unilateral 2, supino-inclinado 2, remada-apoiada 2, desenvolvimento 2, panturrilha-chao 3, rosca-inclinada 2 | Corpo todo C (40 min): supino-reto 2, puxada-frente 2, ponte-gluteo 2, panturrilha-chao 3, elevacao-halteres 2, abdominal-chao 2 | Corpo todo D (36 min): supino-reto 2, puxada-frente 2, stiff 2, elevacao-halteres 2, panturrilha-chao 2, triceps-frances-halter 2 | Corpo todo E (40 min): supino-inclinado 2, remada-unilateral-halter 2, stiff-unilateral 2, desenvolvimento 2, rosca-inclinada 2, abdominal-chao 2

### `volume.zero.costas`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (26 min): goblet 4, flexao 2, triceps-frances-halter 2+drop | Corpo todo B (26 min): stiff 4, flexao 2, panturrilha-chao 2+drop | Corpo todo C (28 min): afundo 4, flexao 2, panturrilha-chao 2+drop
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (27 min): bulgaro 4, supino-reto 2, triceps-frances-halter 2+drop | Corpo todo B (26 min): stiff 4, supino-inclinado 2, panturrilha 2+drop | Corpo todo C (27 min): afundo 4, supino-reto 2, panturrilha-bilateral-step 2+drop
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (27 min): bulgaro 4, supino-reto 2, triceps-frances-halter 2+drop | Corpo todo B (24 min): stiff 4, supino-inclinado 2, panturrilha-chao 2+drop | Corpo todo C (27 min): afundo 4, supino-reto 2, panturrilha-chao 2+drop

### `volume.zero.peito`

- **halteres-banco · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade superior · sem dor**: peito com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (20 min): bulgaro 2, triceps-frances-halter 3+drop, panturrilha-chao 3+drop | Corpo todo B (20 min): remada-unilateral-halter 3, afundo 2

### `volume.zero.posteriores`

- **casa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (19 min): goblet 2, triceps-frances-halter 2+drop, panturrilha-chao 3+drop | Corpo todo B (36 min): afundo 2, flexao 4, remada-elastico 4
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): bulgaro 2, triceps-frances-halter 2+drop, panturrilha 3+drop | Corpo todo B (33 min): afundo 2, supino-inclinado 4, remada-apoiada 4
- **condominio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (20 min): bulgaro 2, triceps-frances-halter 2+drop, panturrilha-chao 3+drop | Corpo todo B (33 min): afundo 2, supino-inclinado 4, remada-apoiada 4

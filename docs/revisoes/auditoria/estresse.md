# Teste de estresse do gerador (auditoria do treino)

> Gerado por `npm run auditoria:estresse`. Dados fictícios (`scripts/auditoria/cenarios.ts`). Não editar à mão.

**149.760 programas** (13 cenários × 3 níveis × 12 divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor); 0 bloqueados.

## Problemas encontrados (contagem de ocorrências)

| problema | ocorrências |
| --- | ---: |
| `monotonia.repete-com-opcao` | 58.808 |
| `tempo.sobra-com-meta-abaixo` | 31.492 |
| `volume.abaixo-sem-aviso` | 11.452 |
| `monotonia.todos-os-dias` | 5.645 |
| `volume.excesso.gluteos` | 5.266 |
| `volume.excesso.triceps` | 2.838 |
| `volume.excesso.biceps` | 1.701 |
| `volume.excesso.ombro_posterior` | 1.596 |
| `volume.zero.costas` | 1.440 |
| `equilibrio.sem-puxar` | 1.440 |
| `volume.excesso.quadriceps` | 1.403 |
| `volume.excesso.peito` | 1.201 |
| `volume.excesso.costas` | 1.014 |
| `volume.excesso.posteriores` | 904 |
| `seguranca.dor-leve-nao-poupou` | 464 |
| `volume.zero.posteriores` | 180 |
| `volume.excesso.ombro_lateral` | 47 |
| `volume.excesso.panturrilha` | 24 |
| `dia.so-core` | 8 |

## Volume: % dos programas com o músculo abaixo do limiar

Limiar: a meta, se o músculo é prioridade; senão, 4 séries (o piso do mínimo eficaz).

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 43.8% | 48.6% | 47.5% | 28.2% | 25.4% | 31.7% | 41.6% | 38.1% | 19.7% | 37.1% | 38.6% |
| casa+ | 39.7% | 47% | 46.8% | 28.7% | 25.1% | 31.3% | 41.3% | 37.3% | 15.2% | 36.4% | 38.7% |
| condominio | 39.6% | 47.2% | 46.6% | 27.9% | 24.6% | 49.2% | 51.9% | 39% | 11.1% | 31.8% | 38.4% |
| condominio+ | 39.6% | 47.3% | 46.7% | 28.7% | 25.1% | 31.2% | 39.7% | 35.7% | 18.2% | 36.1% | 38.6% |
| academia | 39.8% | 48.3% | 46.7% | 28.7% | 24.9% | 27.9% | 38.1% | 34% | 16.4% | 35.1% | 38% |
| academia+ | 39.8% | 48.3% | 46.7% | 28.7% | 25% | 27.9% | 38.1% | 33.9% | 16.4% | 35.2% | 38% |
| peso-corpo | 44.4% | 100% | 99.4% | 28% | 100% | 43.2% | 43.6% | 45.5% | 10.1% | 25% | 34.7% |
| elasticos | 43.4% | 49.2% | 48% | 28.1% | 26.8% | 32.9% | 42.1% | 41.6% | 21.1% | 39.4% | 38.7% |
| halteres | 53.9% | 69.4% | 44.5% | 28.9% | 25.1% | 47.4% | 48.1% | 36% | 11.7% | 30.6% | 38.6% |
| halteres-banco | 43.2% | 69.4% | 45.2% | 29.5% | 25.4% | 48.4% | 48.7% | 37.1% | 12% | 31.3% | 38.5% |
| diego | 43.1% | 48.4% | 47.9% | 28.1% | 26.5% | 32.7% | 42% | 41.6% | 21% | 39.4% | 38.6% |
| bruno | 40.3% | 48.8% | 47.3% | 28.7% | 25.5% | 28.5% | 42.8% | 37.6% | 15.2% | 37% | 38.4% |
| bairro | 38.9% | 46.8% | 46.4% | 28.7% | 24.5% | 49.8% | 38.2% | 34% | 16.2% | 33.6% | 38.2% |

### Sem dor e com 45 min ou mais

Prioritário abaixo da meta (% dos programas em que o músculo é prioridade) / demais abaixo de 4 séries (% dos outros).

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 15.1% / 0% | 16.7% / 0% | 29% / 5.3% | 0% / 1.9% | 16.4% / 0.5% | 20.1% / 0% | 23.1% / 0% | 37.3% / 0% | 35.2% / 4.6% | 44.4% / 0% | 39.8% / 0% |
| casa+ | 11.7% / 0% | 13.1% / 0% | 27.3% / 5.3% | 0% / 1.9% | 13.9% / 0.5% | 19.2% / 0% | 22.8% / 0% | 34.4% / 0% | 22% / 0% | 42.4% / 0% | 38.4% / 0% |
| condominio | 12.2% / 0% | 13.9% / 0% | 26.2% / 5.3% | 0% / 0.8% | 13.4% / 0% | 18.3% / 0% | 54.9% / 0% | 42.3% / 0% | 10% / 0% | 38.4% / 0% | 37% / 0% |
| condominio+ | 11.6% / 0% | 14.4% / 0% | 27.6% / 5.3% | 0% / 1.9% | 14.1% / 0.5% | 17.4% / 0% | 16.4% / 0% | 31.2% / 0% | 26.2% / 4.6% | 40.4% / 0% | 35.2% / 0% |
| academia | 12.3% / 0% | 14.2% / 0% | 27% / 5.3% | 0% / 1.9% | 14.4% / 0.5% | 18.1% / 0% | 14.2% / 0% | 27.6% / 0% | 24.3% / 3.5% | 39% / 0% | 34.3% / 0% |
| academia+ | 12.3% / 0% | 14.2% / 0% | 27% / 5.3% | 0% / 1.9% | 14.4% / 0.5% | 18.1% / 0% | 14.4% / 0% | 27.3% / 0% | 24.3% / 3.5% | 39.4% / 0% | 34.3% / 0% |
| peso-corpo | 5.7% / 0% | 100% / 100% | 100% / 100% | 0% / 0% | 100% / 100% | 6.9% / 0% | 32.6% / 0% | 35.8% / 0% | 10.9% / 0% | 35.8% / 0% | 22.7% / 0% |
| elasticos | 13.9% / 0% | 21.5% / 0% | 29.2% / 5.3% | 0% / 1.9% | 21.8% / 0.5% | 24.5% / 0% | 24.4% / 0% | 39% / 0% | 39.4% / 5.1% | 50.8% / 0% | 39.4% / 0% |
| halteres | 25.8% / 0% | 15.6% / 0% | 26.7% / 4.2% | 0% / 0.8% | 13.2% / 0% | 15.7% / 0% | 46.1% / 0% | 32.1% / 0% | 14.6% / 0% | 39.2% / 0% | 36.6% / 0% |
| halteres-banco | 14.2% / 0% | 16% / 0% | 27.5% / 5.3% | 0% / 0.8% | 13.9% / 0% | 17.8% / 0% | 47.1% / 0% | 34.1% / 0% | 15% / 0% | 39% / 0% | 38% / 0% |
| diego | 13.3% / 0% | 19.1% / 0% | 28.9% / 5.3% | 0% / 1.9% | 20.6% / 0.5% | 23.8% / 0% | 23.9% / 0% | 38.7% / 0% | 38.4% / 5.1% | 50.8% / 0% | 38.9% / 0% |
| bruno | 14.4% / 0% | 16% / 0% | 28.5% / 5.3% | 0% / 1.9% | 16.4% / 0.5% | 20.1% / 0% | 26.9% / 0% | 36.3% / 0% | 24.3% / 0% | 43.1% / 0% | 36.6% / 0% |
| bairro | 10% / 0% | 12.7% / 0% | 26.7% / 5.3% | 0% / 1.9% | 14.1% / 0.5% | 22% / 0% | 14.7% / 0% | 28.5% / 0% | 25.2% / 2.5% | 39.5% / 0% | 33.3% / 0% |

### Motivo do aviso "abaixo da meta" (sem dor, 45 min ou mais)

| músculo | motivo | avisos |
| --- | --- | ---: |
| panturrilha | divisão: séries por exercício e por sessão no teto | 2.002 |
| posteriores da coxa | divisão: séries por exercício e por sessão no teto | 1.812 |
| quadríceps | divisão: séries por exercício e por sessão no teto | 1.582 |
| panturrilha | minutos (exercícios por treino) | 1.403 |
| ombro (lateral) | divisão: séries por exercício e por sessão no teto | 1.240 |
| costas | nenhum exercício possível | 1.080 |
| ombro (lateral) | nenhum exercício possível | 1.080 |
| bíceps | nenhum exercício possível | 1.080 |
| ombro (lateral) | minutos (exercícios por treino) | 1.066 |
| glúteos | corte de tempo | 926 |
| costas | divisão: séries por exercício e por sessão no teto | 866 |
| posteriores da coxa | corte de tempo | 768 |
| quadríceps | corte de tempo | 760 |
| tríceps | divisão: séries por exercício e por sessão no teto | 574 |
| bíceps | minutos (exercícios por treino) | 510 |
| abdômen | divisão: séries por exercício e por sessão no teto | 507 |
| peito | minutos (exercícios por treino) | 475 |
| peito | divisão: séries por exercício e por sessão no teto | 394 |
| abdômen | minutos (exercícios por treino) | 376 |
| tríceps | minutos (exercícios por treino) | 350 |
| costas | corte de tempo | 348 |
| posteriores da coxa | minutos (exercícios por treino) | 302 |
| glúteos | minutos (exercícios por treino) | 262 |
| peito | corte de tempo | 249 |
| bíceps | corte de tempo | 239 |
| glúteos | divisão: séries por exercício e por sessão no teto | 210 |
| ombro (posterior) | minutos (exercícios por treino) | 207 |
| glúteos | divisão sem vaga própria | 128 |
| tríceps | corte de tempo | 122 |
| abdômen | corte de tempo | 120 |
| panturrilha | corte de tempo | 109 |
| bíceps | divisão: séries por exercício e por sessão no teto | 84 |
| ombro (lateral) | divisão sem vaga própria | 64 |
| ombro (lateral) | corte de tempo | 50 |

### Séries semanais, média por cenário

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| casa | 7,1 | 6,4 | 6,1 | 5,6 | 8,1 | 7,5 | 7,5 | 8,1 | 9,6 | 7,4 | 4,1 |
| casa+ | 7,6 | 6,4 | 6,1 | 5,7 | 8,1 | 7,7 | 7,5 | 8,2 | 10,4 | 7,6 | 4,1 |
| condominio | 7,6 | 6,4 | 6,2 | 5,8 | 8,3 | 5,9 | 6,6 | 8,3 | 12,2 | 8,1 | 4,2 |
| condominio+ | 7,6 | 6,4 | 6,2 | 5,7 | 8,1 | 7,7 | 7,6 | 8,3 | 9,7 | 7,7 | 4,1 |
| academia | 7,5 | 6,6 | 6,1 | 5,7 | 8,1 | 7,8 | 7,7 | 8,4 | 9,6 | 7,7 | 4,2 |
| academia+ | 7,5 | 6,6 | 6,1 | 5,7 | 8,1 | 7,8 | 7,7 | 8,4 | 9,6 | 7,8 | 4,2 |
| peso-corpo | 7,3 | 0 | 0,7 | 4,6 | 0 | 7,4 | 7,8 | 7,8 | 12,6 | 9,2 | 4,8 |
| elasticos | 7,4 | 7 | 6 | 5,6 | 8 | 7,4 | 7,6 | 8 | 9,6 | 7,3 | 4,1 |
| halteres | 6 | 3,9 | 6,6 | 5,2 | 7,9 | 6,7 | 6,9 | 8,5 | 12 | 8,3 | 4,3 |
| halteres-banco | 7,3 | 3,8 | 6,5 | 5,1 | 7,7 | 5,9 | 6,8 | 8,4 | 11,9 | 8,1 | 4,2 |
| diego | 7,4 | 7 | 6 | 5,6 | 8 | 7,5 | 7,6 | 8 | 9,6 | 7,4 | 4,1 |
| bruno | 7,5 | 6,6 | 6,1 | 5,7 | 8 | 7,7 | 7,5 | 8,1 | 10,5 | 7,6 | 4,1 |
| bairro | 8 | 6,4 | 6,2 | 5,7 | 8,3 | 5,9 | 7,7 | 8,5 | 10 | 7,9 | 4,1 |

## Equilíbrio

- Séries de puxar ÷ séries de empurrar: mediana 1.09 (10% dos programas abaixo de 0.82, 10% acima de 1.63).
- Posteriores ÷ quadríceps (volume semanal): mediana 1 (p10 0.67, p90 1.11).

## Escolha

### Os 25 exercícios que mais aparecem como vaga

| exercício | vezes | guia |
| --- | ---: | --- |
| elevacao-halteres | 153.698 | animação |
| panturrilha-degrau | 136.806 | animação |
| ponte-gluteo-halter | 110.594 | animação |
| abdominal-chao | 104.559 | animação |
| stiff | 99.126 | animação |
| afundo | 87.421 | animação |
| supino-reto | 84.489 | animação |
| aducao-deitado | 81.209 | animação |
| flexao | 66.163 | animação |
| cadeira-flexora | 64.450 | sem animação |
| flexao-joelho-elastico | 62.257 | animação |
| abdominal-invertido | 62.156 | animação |
| remada-apoiada | 61.301 | animação |
| rosca-scott-banco-inclinado | 60.029 | sem animação |
| supino-inclinado | 58.710 | animação |
| crucifixo-halteres | 57.157 | sem animação |
| panturrilha | 53.626 | animação |
| flexao-joelho-deslizante | 51.011 | animação |
| panturrilha-sentada-halter | 49.053 | animação |
| triceps-frances-halter | 48.501 | animação |
| cadeira-extensora | 48.207 | sem animação |
| extensao-joelho-elastico | 47.845 | animação |
| stiff-unilateral | 46.333 | animação |
| bulgaro | 44.058 | animação |
| abducao-deitado | 42.119 | animação |

### Possíveis que nunca aparecem como vaga, por cenário

| cenário | possíveis | aparecem | nunca como vaga | nem como alternativa |
| --- | ---: | ---: | --- | --- |
| casa | 64 | 43 | flexao-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, flexao-fechada, abducao-deitado, extensao-triceps-peso-corpo, abertura-t-deitado, afundo-tras-peso-corpo, remada-curvada-elastico, remada-unilateral-elastico, abertura-elastico, coice-elastico, elevacao-lateral-unilateral-elastico, rosca-martelo-elastico | — |
| casa+ | 111 | 56 | flexao, flexao-elastico, crucifixo-elastico, puxada-elastico, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, goblet-kettlebell, remada-suspensao, supino-chao-halteres, flexao-fechada, pike, nordico, remada-unilateral-sem-banco, rosca-suspensao, yt-suspensao, flexao-joelho-suspensao, bulgaro-suspensao, ponte-pes-bola, abducao-mini-band, remada-unilateral-kettlebell, abducao-deitado, aducao-deitado, extensao-joelho-elastico, flexao-pes-elevados, extensao-triceps-peso-corpo, abertura-t-deitado, panturrilha-degrau, afundo-tras-peso-corpo, desenvolvimento-em-pe-halteres, triceps-frances-unilateral-halter, triceps-testa-halteres, rosca-concentrada, remada-curvada-elastico, remada-unilateral-elastico, abertura-elastico, abducao-elastico, coice-elastico, elevacao-lateral-unilateral-elastico, rosca-martelo-elastico, caminhada-lateral-mini-band, extensao-joelho-mini-band, abducao-deitado-mini-band, face-pull-suspensao | — |
| condominio | 59 | 44 | flexao, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, supino-chao-halteres, flexao-fechada, pike, remada-unilateral-sem-banco, ponte-pes-bola, flexao-pes-elevados, extensao-triceps-peso-corpo, abertura-t-deitado, afundo-tras-peso-corpo, desenvolvimento-em-pe-halteres | — |
| condominio+ | 114 | 55 | flexao, flexao-elastico, crucifixo-elastico, barra-fixa-supinada, puxada-elastico, remada-barra, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, goblet-kettlebell, supino-chao-halteres, flexao-fechada, pike, flexao-joelho-deslizante, nordico, remada-unilateral-sem-banco, ponte-pes-bola, extensao-joelho-caneleira, abducao-mini-band, remada-unilateral-kettlebell, rosca-kettlebell, triceps-frances-kettlebell, afundo-kettlebell, desenvolvimento-unilateral-kettlebell, ponte-kettlebell, abducao-deitado, aducao-deitado, extensao-joelho-elastico, flexao-pes-elevados, extensao-triceps-peso-corpo, abertura-t-deitado, panturrilha-degrau, afundo-tras-peso-corpo, rosca-concentrada, remada-curvada-elastico, remada-unilateral-elastico, abertura-elastico, abducao-elastico, coice-elastico, elevacao-lateral-unilateral-elastico, rosca-martelo-elastico, barra-fixa-negativa, caminhada-lateral-mini-band, elevacao-lateral-caneleira, crucifixo-invertido-caneleira, coice-caneleira, extensao-joelho-mini-band, abducao-deitado-mini-band, stiff-unilateral-kettlebell | — |
| academia | 118 | 74 | supino-polia, flexao, barra-fixa, barra-fixa-supinada, remada-barra, remada-invertida, desenvolvimento-unilateral, rosca-barra-w, goblet, agachamento-halteres, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, elevacao-joelhos, terra-hexagonal, mergulho, mergulho-graviton, barra-fixa-graviton, remada-baixa-estacao, hiperextensao, crucifixo-invertido-curvado, supino-chao-halteres, flexao-fechada, pike, nordico, remada-unilateral-sem-banco, triceps-frances-polia-unilateral, remada-unilateral-polia, elevacao-joelhos-paralelas, abducao-deitado, aducao-deitado, flexao-pes-elevados, extensao-triceps-peso-corpo, abertura-t-deitado, panturrilha-degrau, afundo-tras-peso-corpo, abdominal-invertido, desenvolvimento-em-pe-halteres, triceps-frances-unilateral-halter, triceps-testa-halteres, rosca-concentrada, barra-fixa-negativa | — |
| academia+ | 171 | 80 | supino-polia, flexao, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-invertida, remada-elastico, desenvolvimento-unilateral, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-barra-w, rosca-elastico, triceps-elastico-acima, goblet, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, bulgaro, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, flexao-joelho-elastico, elevacao-joelhos, abdominal-chao, terra-hexagonal, goblet-kettlebell, mergulho, mergulho-graviton, barra-fixa-graviton, remada-baixa-estacao, remada-suspensao, hiperextensao, crucifixo-invertido-curvado, supino-chao-halteres, flexao-fechada, pike, flexao-joelho-deslizante, nordico, remada-unilateral-sem-banco, triceps-frances-polia-unilateral, remada-unilateral-polia, rosca-suspensao, yt-suspensao, triceps-suspensao, flexao-joelho-suspensao, bulgaro-suspensao, elevacao-joelhos-paralelas, abdominal-bola, ponte-pes-bola, extensao-joelho-caneleira, abducao-caneleira, aducao-caneleira, abducao-mini-band, roda-abdominal, remada-unilateral-kettlebell, triceps-frances-kettlebell, abducao-deitado, aducao-deitado, extensao-joelho-elastico, flexao-pes-elevados, extensao-triceps-peso-corpo, abertura-t-deitado, panturrilha-degrau, afundo-tras-peso-corpo, abdominal-invertido, desenvolvimento-em-pe-halteres, triceps-frances-unilateral-halter, triceps-testa-halteres, rosca-concentrada, remada-curvada-elastico, remada-unilateral-elastico, abertura-elastico, abducao-elastico, coice-elastico, elevacao-lateral-unilateral-elastico, rosca-martelo-elastico, triceps-elastico-alto, barra-fixa-negativa, caminhada-lateral-mini-band, elevacao-lateral-caneleira, crucifixo-invertido-caneleira, coice-caneleira, extensao-joelho-mini-band, abducao-deitado-mini-band, face-pull-suspensao | — |
| peso-corpo | 19 | 19 | — | — |
| elasticos | 40 | 38 | bulgaro-peso-corpo, abertura-t-deitado | — |
| halteres | 43 | 35 | agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, flexao-fechada, extensao-triceps-peso-corpo, abertura-t-deitado, afundo-tras-peso-corpo | — |
| halteres-banco | 47 | 37 | agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, supino-chao-halteres, flexao-fechada, flexao-pes-elevados, extensao-triceps-peso-corpo, abertura-t-deitado, afundo-tras-peso-corpo | — |
| diego | 44 | 41 | puxada-elastico, bulgaro-peso-corpo, abertura-t-deitado | — |
| bruno | 107 | 57 | supino-polia, flexao, flexao-elastico, crucifixo-elastico, barra-fixa, barra-fixa-supinada, puxada-elastico, remada-barra, remada-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, rosca-elastico, triceps-elastico-acima, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, afundo-peso-corpo, bulgaro-peso-corpo, stiff-elastico, ponte-gluteo, elevacao-joelhos, abdominal-chao, crucifixo-invertido-curvado, supino-chao-halteres, flexao-fechada, pike, nordico, remada-unilateral-sem-banco, triceps-frances-polia-unilateral, remada-unilateral-polia, abdominal-bola, ponte-pes-bola, abducao-deitado, flexao-pes-elevados, extensao-triceps-peso-corpo, abertura-t-deitado, panturrilha-degrau, afundo-tras-peso-corpo, abdominal-invertido, triceps-frances-unilateral-halter, triceps-testa-halteres, rosca-concentrada, remada-curvada-elastico, remada-unilateral-elastico, abertura-elastico, coice-elastico, elevacao-lateral-unilateral-elastico, rosca-martelo-elastico, barra-fixa-negativa | — |
| bairro | 64 | 49 | flexao, agachamento-halteres, agachamento-peso-corpo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, ponte-gluteo, supino-chao-halteres, flexao-fechada, pike, remada-unilateral-sem-banco, flexao-pes-elevados, extensao-triceps-peso-corpo, abertura-t-deitado, afundo-tras-peso-corpo | — |

### Funções sem opção ou com uma só (nível intermediário, sem dor)

| cenário | empurrar-horizontal | empurrar-inclinado | crucifixo | puxar-vertical | puxar-horizontal | empurrar-vertical | elevacao-lateral | ombro-posterior | biceps | triceps-acima-cabeca | triceps-complemento | agachar | afundo | extensora | flexao-joelho | dobrar-quadril | extensao-quadril | abducao | aducao | panturrilha-em-pe | panturrilha-sentada | abdomen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| casa | 4 (nível 2) | 4 (nível 3) | 1 (nível 2) | 3 (nível 2) | 5 (nível 1) | 4 (nível 1) | 5 (nível 1) | 5 (nível 1) | 5 (nível 2) | 4 (nível 1) | 3 (nível 3) | 4 (nível 2) | 5 (nível 1) | 1 (nível 2) | 3 (nível 3) | 3 (nível 1) | 3 (nível 2) | 2 (nível 2) | 1 (nível 3) | 2 (nível 2) | 1 (nível 2) | 2 (nível 2) |
| casa+ | 5 (nível 1) | 8 (nível 1) | 3 (nível 1) | 9 (nível 1) | 9 (nível 1) | 6 (nível 1) | 6 (nível 1) | 9 (nível 1) | 9 (nível 1) | 6 (nível 1) | 4 (nível 2) | 6 (nível 2) | 8 (nível 1) | 3 (nível 2) | 5 (nível 3) | 5 (nível 1) | 6 (nível 2) | 6 (nível 2) | 2 (nível 2) | 4 (nível 1) | 1 (nível 2) | 5 (nível 2) |
| condominio | 4 (nível 1) | 7 (nível 1) | 2 (nível 1) | 4 (nível 1) | 5 (nível 1) | 4 (nível 1) | 3 (nível 1) | 4 (nível 1) | 5 (nível 1) | 3 (nível 1) | 2 (nível 3) | 4 (nível 2) | 6 (nível 1) | nenhuma | 3 (nível 3) | 2 (nível 1) | 3 (nível 2) | 1 (nível 3) | 1 (nível 3) | 2 (nível 2) | 1 (nível 2) | 3 (nível 2) |
| condominio+ | 6 (nível 1) | 10 (nível 1) | 4 (nível 1) | 9 (nível 1) | 10 (nível 1) | 6 (nível 1) | 6 (nível 1) | 7 (nível 1) | 9 (nível 1) | 5 (nível 1) | 3 (nível 3) | 6 (nível 2) | 7 (nível 1) | 4 (nível 1) | 5 (nível 1) | 6 (nível 1) | 7 (nível 1) | 6 (nível 2) | 2 (nível 2) | 4 (nível 1) | 1 (nível 2) | 5 (nível 2) |
| academia | 10 (nível 1) | 15 (nível 1) | 5 (nível 1) | 11 (nível 1) | 10 (nível 1) | 6 (nível 1) | 4 (nível 1) | 6 (nível 1) | 10 (nível 1) | 5 (nível 1) | 6 (nível 1) | 9 (nível 1) | 6 (nível 1) | 1 (nível 1) | 4 (nível 1) | 5 (nível 1) | 6 (nível 1) | 3 (nível 1) | 2 (nível 1) | 6 (nível 1) | 2 (nível 1) | 6 (nível 1) |
| academia+ | 11 (nível 1) | 16 (nível 1) | 6 (nível 1) | 14 (nível 1) | 15 (nível 1) | 8 (nível 1) | 7 (nível 1) | 12 (nível 1) | 14 (nível 1) | 8 (nível 1) | 8 (nível 1) | 11 (nível 1) | 8 (nível 1) | 4 (nível 1) | 7 (nível 1) | 8 (nível 1) | 10 (nível 1) | 8 (nível 1) | 3 (nível 1) | 6 (nível 1) | 2 (nível 1) | 9 (nível 1) |
| peso-corpo | 2 (nível 2) | 2 (nível 3) | nenhuma | nenhuma | nenhuma | 1 (nível 4) | nenhuma | 1 (nível 3) | nenhuma | 1 (nível 3) | 1 (nível 3) | 1 (nível 3) | 3 (nível 2) | nenhuma | 2 (nível 4) | 0 (via flexao-joelho) | 1 (nível 2) | 1 (nível 3) | 1 (nível 3) | 2 (nível 2) | nenhuma | 2 (nível 2) |
| elasticos | 3 (nível 2) | 3 (nível 3) | 1 (nível 2) | 1 (nível 3) | 3 (nível 3) | 2 (nível 3) | 2 (nível 4) | 3 (nível 2) | 2 (nível 3) | 2 (nível 1) | 2 (nível 3) | 2 (nível 3) | 3 (nível 2) | 1 (nível 2) | 3 (nível 3) | 1 (nível 3) | 2 (nível 2) | 2 (nível 2) | 1 (nível 3) | 2 (nível 2) | nenhuma | 2 (nível 2) |
| halteres | 3 (nível 2) | 3 (nível 3) | nenhuma | 2 (nível 2) | 2 (nível 1) | 3 (nível 1) | 3 (nível 1) | 3 (nível 1) | 3 (nível 2) | 3 (nível 1) | 2 (nível 3) | 3 (nível 2) | 5 (nível 1) | nenhuma | 2 (nível 4) | 2 (nível 1) | 2 (nível 2) | 1 (nível 3) | 1 (nível 3) | 2 (nível 2) | 1 (nível 2) | 2 (nível 2) |
| halteres-banco | 4 (nível 1) | 5 (nível 2) | 1 (nível 1) | 3 (nível 2) | 3 (nível 1) | 3 (nível 1) | 3 (nível 1) | 3 (nível 1) | 3 (nível 2) | 3 (nível 1) | 2 (nível 3) | 4 (nível 2) | 6 (nível 1) | nenhuma | 2 (nível 4) | 2 (nível 1) | 2 (nível 2) | 1 (nível 3) | 1 (nível 3) | 2 (nível 2) | 1 (nível 2) | 2 (nível 2) |
| diego | 3 (nível 2) | 3 (nível 3) | 1 (nível 2) | 4 (nível 1) | 3 (nível 3) | 2 (nível 3) | 2 (nível 4) | 3 (nível 2) | 2 (nível 3) | 2 (nível 1) | 2 (nível 3) | 2 (nível 3) | 3 (nível 2) | 1 (nível 2) | 3 (nível 3) | 1 (nível 3) | 2 (nível 2) | 2 (nível 2) | 1 (nível 3) | 2 (nível 2) | nenhuma | 3 (nível 2) |
| bruno | 6 (nível 1) | 12 (nível 1) | 5 (nível 1) | 9 (nível 1) | 10 (nível 1) | 5 (nível 1) | 6 (nível 1) | 8 (nível 1) | 9 (nível 1) | 6 (nível 1) | 5 (nível 1) | 5 (nível 2) | 6 (nível 1) | 1 (nível 2) | 4 (nível 3) | 5 (nível 1) | 5 (nível 1) | 2 (nível 2) | 1 (nível 3) | 4 (nível 1) | 1 (nível 2) | 6 (nível 1) |
| bairro | 5 (nível 1) | 7 (nível 1) | 2 (nível 1) | 6 (nível 1) | 4 (nível 1) | 4 (nível 1) | 3 (nível 1) | 4 (nível 1) | 5 (nível 1) | 3 (nível 1) | 3 (nível 2) | 5 (nível 1) | 6 (nível 1) | 1 (nível 1) | 3 (nível 1) | 2 (nível 1) | 2 (nível 2) | 1 (nível 3) | 1 (nível 3) | 3 (nível 1) | 1 (nível 2) | 4 (nível 2) |

## Monotonia

- Programas de 3 dias ou mais com um exercício (fora o abdominal) em **todos** os dias: 5.645 de 137.280 (4.1%).
- Programas que repetem um exercício em 2 dias ou mais com outro do mesmo nível da função possível e sem uso: 58.808 (42.8%).

## Tempo

- Dias acima dos minutos: 57.377 de 624.000 (9.2%); **sem aviso: 0**.
- Programas cujo dia mais longo usa menos de 70% dos minutos: 37.540 (25.1%); destes, 0 ainda dizem que a meta ficou de fora "porque cabem cerca de N exercícios".

| minutos | programas | dia mais longo (mediana, min) | sobra > 30% |
| ---: | ---: | ---: | ---: |
| 20 | 18720 | 28 | 0% |
| 30 | 18720 | 31 | 0% |
| 45 | 18720 | 45 | 0.1% |
| 60 | 18720 | 59 | 2.5% |
| 75 | 18720 | 72 | 12.9% |
| 90 | 18720 | 74 | 29.2% |
| 120 | 18720 | 74 | 66.5% |
| 150 | 18720 | 74 | 89.3% |

## Segurança

- Programas com uma região acima de 5: 112.320. Exercício que carrega a região marcada no dado: **0**.
- Exercício que, pelo padrão de movimento, carrega a região com dor > 5, mas o dado não marca (fica no programa): 0 ocorrências.
- Dor de 3 a 5 sem lembrete: 0; com um equivalente do mesmo nível que poupava a região e ficou de fora: 464.

| exercício : região que falta | ocorrências |
| --- | ---: |

## Treino do dia num 2º local

- 60 dias testados, 243 trocas por equivalente, 0 vagas que ficaram de fora no dia.

## Exemplos (3 por problema, de cenários diferentes)

### `dia.so-core`

- **elasticos · intermediario · Empurrar/Puxar/Pernas (2x) (6 dias) · 20 min · prioridade todos · sem dor**: Empurrar B só com abdominal.
  - Programa: Empurrar A (18 min): flexao 4, desenvolvimento-elastico 2 | Puxar A (20 min): puxada-elastico 3, remada-elastico 2, rosca-elastico 2 | Pernas A (28 min): agachamento-elastico 2, stiff-elastico 3, flexao-joelho-elastico 3, panturrilha-degrau 2 | Empurrar B (8 min): abdominal-chao 4 | Puxar B (22 min): remada-curvada-elastico 3, puxada-elastico 2, rosca-martelo-elastico 3 | Pernas B (38 min): afundo-peso-corpo 3, stiff-elastico 4, ponte-gluteo 4
- **diego · intermediario · Empurrar/Puxar/Pernas (2x) (6 dias) · 20 min · prioridade todos · sem dor**: Empurrar B só com abdominal.
  - Programa: Empurrar A (18 min): flexao 4, desenvolvimento-elastico 2 | Puxar A (19 min): barra-fixa 3, remada-elastico 2, rosca-elastico 2 | Pernas A (28 min): agachamento-elastico 2, stiff-elastico 3, flexao-joelho-elastico 3, panturrilha-degrau 2 | Empurrar B (8 min): abdominal-chao 4 | Puxar B (22 min): remada-curvada-elastico 3, barra-fixa-supinada 2, rosca-martelo-elastico 3 | Pernas B (38 min): afundo-peso-corpo 3, stiff-elastico 4, ponte-gluteo 4

### `equilibrio.sem-puxar`

- **peso-corpo · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `monotonia.repete-com-opcao`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · ombro 7**: ponte-gluteo-halter em 2 dias (extensao-quadril), com ponte-gluteo, coice-elastico do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (19 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2 | Corpo todo B (29 min): stiff 4, extensao-joelho-elastico 2, panturrilha-degrau 2, rosca-alternada 3+drop | Corpo todo C (25 min): afundo 2, ponte-gluteo-halter 2, abdominal-chao 4
- **casa+ · iniciante · Superior/Inferior + Corpo todo (3 dias) · 30 min · prioridade inferior · lombar 7**: flexao-bola em 2 dias (flexao-joelho), com flexao-joelho-elastico do mesmo nível possível e sem uso.
  - Programa: Superior A (29 min): supino-reto 3, barra-fixa-negativa 3, remada-apoiada 2, rosca-inclinada 3 | Inferior A (29 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 3, panturrilha 2+drop | Corpo todo (34 min): afundo 4, supino-inclinado 2, barra-fixa-negativa 2, flexao-bola 3
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade inferior · ombro 7**: ponte-gluteo-halter em 2 dias (extensao-quadril), com ponte-gluteo, ponte-pes-bola do mesmo nível possível e sem uso.
  - Programa: Corpo todo A (20 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2 | Corpo todo B (26 min): stiff 4, panturrilha-degrau 2, rosca-scott-banco-inclinado 3+drop | Corpo todo C (32 min): afundo 4, ponte-gluteo-halter 2, abdominal-bola 4

### `monotonia.todos-os-dias`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter em todos os 3 dias.
  - Programa: Corpo todo A (41 min): goblet 3, ponte-gluteo-halter 2, flexao-joelho-elastico 2, rosca-martelo 3, triceps-elastico-alto 3, abdominal-chao 2 | Corpo todo B (42 min): stiff 3, ponte-gluteo-halter 2, extensao-joelho-elastico 2, rosca-alternada 3, panturrilha-degrau 3, abdominal-invertido 2 | Corpo todo C (43 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-chao 3, abdominal-chao 2
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade nenhuma · ombro 7**: rosca-scott-banco-inclinado em todos os 3 dias.
  - Programa: Corpo todo A (39 min): bulgaro 2, flexao-bola 2, rosca-scott-banco-inclinado 2, triceps-elastico-alto 3, abducao-caneleira 2, abdominal-bola 2 | Corpo todo B (47 min): stiff 2, ponte-kettlebell 2, extensao-joelho-caneleira 2, rosca-scott-banco-inclinado 2, panturrilha 3, aducao-caneleira 2, abdominal-chao 2 | Corpo todo C (46 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 3, flexao-joelho-elastico 2, panturrilha-bilateral-step 3, rosca-scott-banco-inclinado 2, abdominal-invertido 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 45 min · prioridade nenhuma · ombro 7**: ponte-gluteo-halter, rosca-scott-banco-inclinado em todos os 3 dias.
  - Programa: Corpo todo A (31 min): bulgaro 2, ponte-gluteo-halter 2, flexao-bola 2, rosca-scott-banco-inclinado 2, abdominal-bola 2 | Corpo todo B (44 min): stiff 2, goblet 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 3, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo C (41 min): afundo 2, ponte-gluteo-halter 2, flexao-bola 2, panturrilha-chao 3, rosca-scott-banco-inclinado 2, abdominal-invertido 2

### `seguranca.dor-leve-nao-poupou`

- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade superior · ombro 4**: rosca-inclinada carrega ombro (dor leve), e rosca-scott-banco-inclinado poupava a região.
  - Programa: Corpo todo A (58 min): supino-reto 3, barra-fixa-negativa 4, bulgaro 2, triceps-frances-halter 3, elevacao-halteres 4, crucifixo-halteres 3, rosca-scott-banco-inclinado 2, flexao-bola 3 | Corpo todo B (59 min): supino-inclinado 2, remada-apoiada 3, stiff 3, desenvolvimento 2, rosca-scott-banco-inclinado 2, extensao-joelho-caneleira 2, panturrilha 4, crucifixo-inverso 2 | Corpo todo C (60 min): supino-reto 2, barra-fixa-negativa 3, afundo 2, ponte-gluteo-halter 2, elevacao-halteres 4, triceps-suspensao 3, rosca-inclinada 2, abdominal-bola 4
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade superior · ombro 4**: rosca-inclinada carrega ombro (dor leve), e rosca-scott-banco-inclinado poupava a região.
  - Programa: Corpo todo A (60 min): supino-reto 3, puxada-frente 4, bulgaro 3, triceps-frances-halter 3, elevacao-halteres 3+drop, crucifixo-halteres 3, rosca-scott-banco-inclinado 2, flexao-bola 3 | Corpo todo B (59 min): supino-inclinado 2, remada-apoiada 3, stiff 3, desenvolvimento 2, rosca-scott-banco-inclinado 2, panturrilha-degrau 4, crucifixo-inverso 2, abdominal-bola 2 | Corpo todo C (59 min): supino-reto 2, puxada-frente 3, afundo 3, ponte-gluteo-halter 2, elevacao-halteres 4, triceps-testa-halteres 3, rosca-inclinada 2, abdominal-chao 2
- **condominio+ · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade superior · ombro 4**: rosca-inclinada carrega ombro (dor leve), e rosca-scott-banco-inclinado poupava a região.
  - Programa: Corpo todo A (59 min): supino-reto 3, puxada-frente 4, bulgaro 2, triceps-frances-halter 3, elevacao-halteres 4, crucifixo-halteres 3, rosca-scott-banco-inclinado 2, cadeira-flexora 3 | Corpo todo B (58 min): supino-inclinado 2, remada-apoiada 3, stiff 3, desenvolvimento 2, rosca-scott-banco-inclinado 2, cadeira-extensora 2, panturrilha 4, crucifixo-inverso 2 | Corpo todo C (59 min): supino-maquina 2, puxada-frente 3, afundo 2, hip-thrust 3, elevacao-halteres 3+drop, triceps-elastico-alto 3, rosca-inclinada 2, abdominal-bola 4

### `tempo.sobra-com-meta-abaixo`

- **casa · iniciante · Corpo todo A/B (2 dias) · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 56 de 90 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (50 min): goblet 3, stiff 3, panturrilha-degrau 4, triceps-elastico-alto 4, rosca-martelo 3, abdominal-chao 2 | Corpo todo B (56 min): afundo 3, ponte-gluteo-halter 3, flexao-joelho-elastico 3, extensao-joelho-elastico 2, rosca-alternada 3, aducao-deitado 2, abdominal-invertido 2
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 90 min · prioridade nenhuma · ombro 7**: o dia mais longo tem 56 de 90 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (56 min): bulgaro 3, stiff 3, panturrilha 4, triceps-elastico-alto 4, rosca-scott-banco-inclinado 3, abdominal-bola 2 | Corpo todo B (53 min): afundo 3, flexao-bola 3, extensao-joelho-caneleira 2, rosca-scott-banco-inclinado 3, abducao-caneleira 2, aducao-caneleira 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B (2 dias) · 75 min · prioridade superior · ombro 7**: o dia mais longo tem 52 de 75 min e há músculo abaixo da meta.
  - Programa: Corpo todo A (48 min): bulgaro 2, stiff 3, rosca-scott-banco-inclinado 4, rosca-alternada 2, panturrilha-degrau 4, abdominal-bola 2 | Corpo todo B (52 min): afundo 2, goblet 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 4, flexao-bola 3, aducao-deitado 2, abdominal-chao 2

### `volume.abaixo-sem-aviso`

- **peso-corpo · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `volume.excesso.biceps`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade misto · joelho 7 + lombar 7**: bíceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (60 min): flexao 3, puxada-elastico 4, ponte-gluteo-halter 3, elevacao-halteres 4, crucifixo-elastico 3, triceps-frances-halter 2, rosca-martelo 2 | Corpo todo B (59 min): flexao 2, remada-elastico 3, desenvolvimento-elastico 2, panturrilha-degrau 4, panturrilha-sentada-halter 3, rosca-alternada 2, crucifixo-invertido-sentado 2, aducao-deitado 2 | Corpo todo C (55 min): supino-chao-halteres 2, puxada-elastico 3, panturrilha-degrau 3, elevacao-halteres 4, triceps-testa-halteres 2, rosca-concentrada 2, abducao-elastico 3
- **casa+ · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade misto · joelho 7 + lombar 7**: bíceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (58 min): supino-reto 3, barra-fixa-negativa 4, elevacao-halteres 4, crucifixo-halteres 3, triceps-frances-halter 2, abducao-caneleira 3, rosca-scott-banco-inclinado 2 | Corpo todo B (59 min): supino-inclinado 2, remada-apoiada 3, desenvolvimento 2, panturrilha 4, panturrilha-sentada-halter 3, rosca-inclinada 2, crucifixo-inverso 2, aducao-caneleira 2 | Corpo todo C (60 min): supino-reto 2, barra-fixa-negativa 3, ponte-gluteo-halter 3, panturrilha-bilateral-step 3, elevacao-halteres 4, elevacao-lateral-unilateral 2, triceps-suspensao 2, rosca-inclinada 2
- **condominio · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade misto · joelho 7 + lombar 7**: bíceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (60 min): supino-reto 3, puxada-frente 4, ponte-gluteo-halter 3, elevacao-halteres 4, crucifixo-halteres 3, triceps-frances-halter 2, rosca-scott-banco-inclinado 2 | Corpo todo B (57 min): supino-inclinado 2, remada-apoiada 3, desenvolvimento 2, panturrilha-degrau 4, panturrilha-sentada-halter 3, rosca-inclinada 2, crucifixo-inverso 2, aducao-deitado 2 | Corpo todo C (55 min): supino-reto 2, puxada-frente 3, panturrilha-degrau 3, elevacao-halteres 4, triceps-testa-halteres 2, rosca-inclinada 2, abducao-deitado 3

### `volume.excesso.costas`

- **casa · iniciante · Superior/Inferior (3x) (6 dias) · 20 min · prioridade nenhuma · sem dor**: costas sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (20 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2 | Inferior A (18 min): goblet 2, stiff 2, abdominal-chao 2 | Superior B (20 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2 | Inferior B (20 min): afundo 2, ponte-gluteo-halter 2, panturrilha-degrau 2 | Superior C (20 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2 | Inferior C (20 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2
- **casa+ · iniciante · Superior/Inferior (3x) (6 dias) · 20 min · prioridade nenhuma · sem dor**: costas sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (20 min): supino-reto 3, barra-fixa-negativa 2, remada-apoiada 2 | Inferior A (20 min): bulgaro 2, stiff 2, abdominal-bola 2 | Superior B (19 min): supino-inclinado 2, remada-unilateral-halter 2, barra-fixa-negativa 2 | Inferior B (21 min): afundo 2, ponte-gluteo-halter 2, panturrilha 2 | Superior C (20 min): supino-reto 3, barra-fixa-negativa 2, remada-apoiada 2 | Inferior C (20 min): afundo-kettlebell 2, ponte-kettlebell 2, flexao-bola 2
- **condominio · iniciante · Superior/Inferior (3x) (6 dias) · 20 min · prioridade nenhuma · sem dor**: costas sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (20 min): supino-reto 3, puxada-frente 2, remada-apoiada 2 | Inferior A (20 min): bulgaro 2, stiff 2, abdominal-bola 2 | Superior B (19 min): supino-inclinado 2, remada-unilateral-halter 2, puxada-frente 2 | Inferior B (20 min): afundo 2, ponte-gluteo-halter 2, panturrilha-degrau 2 | Superior C (20 min): supino-reto 3, puxada-frente 2, remada-baixa-estacao 2 | Inferior C (20 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-bola 2

### `volume.excesso.gluteos`

- **casa · iniciante · Corpo todo A/B/C (3 dias) · 60 min · prioridade misto · ombro 7**: glúteos sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (46 min): goblet 4, ponte-gluteo-halter 2, flexao-joelho-elastico 4, rosca-martelo 2, triceps-elastico-alto 3, abdominal-chao 2 | Corpo todo B (59 min): stiff 3, ponte-gluteo-halter 2, extensao-joelho-elastico 3, panturrilha-degrau 4, panturrilha-sentada-halter 3, rosca-alternada 2, aducao-deitado 2, abdominal-invertido 2 | Corpo todo C (52 min): afundo 3, ponte-gluteo-halter 2, panturrilha-degrau 3, flexao-joelho-elastico 3, triceps-elastico-alto 3, rosca-concentrada 2, abdominal-chao 2
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 75 min · prioridade misto · ombro 7**: glúteos sem prioridade com 10.5 séries (máximo do nível 10).
  - Programa: Corpo todo A (72 min): bulgaro 4, stiff 4, panturrilha 4, panturrilha-sentada-halter 4, triceps-elastico-alto 4, rosca-scott-banco-inclinado 3, abdominal-bola 2 | Corpo todo B (69 min): afundo 3, stiff-kettlebell 2, flexao-bola 4, extensao-joelho-caneleira 3, panturrilha-bilateral-step 2, rosca-scott-banco-inclinado 3, aducao-caneleira 2, abducao-caneleira 2, abdominal-chao 2
- **condominio · iniciante · Corpo todo A/B (2 dias) · 60 min · prioridade misto · ombro 7**: glúteos sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Corpo todo A (60 min): bulgaro 4, stiff 4, panturrilha-degrau 4, panturrilha-sentada-halter 4, rosca-scott-banco-inclinado 3, abdominal-bola 2 | Corpo todo B (57 min): afundo 3, goblet 3, ponte-gluteo-halter 2, flexao-bola 4, rosca-scott-banco-inclinado 3, aducao-deitado 2, abdominal-chao 2

### `volume.excesso.ombro_lateral`

- **halteres · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · lombar 7**: ombro (lateral) sem prioridade com 13 séries (máximo do nível 10).
  - Programa: Superior A (41 min): flexao 2, pike 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 4, crucifixo-invertido-sentado 4 | Inferior A (28 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-degrau 4 | Superior B (32 min): flexao 2, pike 2, elevacao-halteres 2, rosca-martelo 2, triceps-testa-halteres 2, crucifixo-invertido-sentado 2 | Inferior B (32 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-degrau 2, elevacao-lateral-deitado 2 | Superior C (35 min): flexao 2, pike 2, triceps-frances-unilateral-halter 2, elevacao-halteres 2, rosca-concentrada 2, crucifixo-invertido-sentado 2 | Inferior C (32 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-degrau 2, elevacao-lateral-unilateral 2
- **halteres-banco · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · lombar 7**: ombro (lateral) sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Superior A (35 min): supino-reto 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-halteres 2, crucifixo-invertido-sentado 4 | Inferior A (30 min): bulgaro 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-degrau 4 | Superior B (32 min): supino-reto 2, pike 2, elevacao-halteres 2, rosca-martelo 2, triceps-testa-halteres 2, crucifixo-invertido-sentado 2 | Inferior B (32 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-degrau 2, elevacao-lateral-deitado 2 | Superior C (33 min): supino-reto 2, triceps-frances-unilateral-halter 2, elevacao-halteres 2, rosca-concentrada 2, crucifixo-halteres 2, crucifixo-invertido-sentado 2 | Inferior C (32 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-joelho-deslizante 2, panturrilha-degrau 2, elevacao-lateral-unilateral 2

### `volume.excesso.ombro_posterior`

- **casa · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade inferior · sem dor**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (34 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-invertido-sentado 2 | Inferior A (45 min): goblet 2, stiff 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, panturrilha-degrau 3, abdominal-chao 4 | Superior B (34 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 2, rosca-alternada 2, crucifixo-invertido-sentado 2 | Inferior B (43 min): afundo 2, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 3 | Superior C (36 min): flexao 2, remada-curvada-halteres 2, remada-unilateral-sem-banco 2, triceps-frances-unilateral-halter 2, elevacao-halteres 2, crucifixo-invertido-sentado 2 | Inferior C (44 min): afundo-tras 2, ponte-gluteo-halter 2, stiff 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 4
- **casa+ · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade inferior · sem dor**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (32 min): supino-reto 2, barra-fixa-negativa 2, remada-apoiada 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-inverso 2 | Inferior A (45 min): bulgaro 2, stiff 2, ponte-gluteo-halter 2, extensao-joelho-caneleira 2, panturrilha 2+drop, abdominal-bola 4 | Superior B (33 min): supino-inclinado 2, remada-unilateral-halter 2, barra-fixa-negativa 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-invertido-sentado 2 | Inferior B (42 min): afundo 2, ponte-kettlebell 2, stiff-kettlebell 2, flexao-joelho-elastico 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 4 | Superior C (32 min): supino-reto 2, barra-fixa-negativa 2, remada-apoiada 2, triceps-frances-kettlebell 2, elevacao-halteres 2, crucifixo-inverso 2 | Inferior C (43 min): afundo-kettlebell 2, stiff-unilateral 2, coice-caneleira 2, flexao-bola 2, extensao-joelho-caneleira 2, panturrilha 3
- **condominio · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade inferior · sem dor**: ombro (posterior) sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (33 min): supino-reto 2, puxada-frente 2, remada-apoiada 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-inverso 2 | Inferior A (45 min): bulgaro 3, stiff 2, ponte-gluteo-halter 2, panturrilha-degrau 4, abdominal-bola 4 | Superior B (34 min): supino-inclinado 2, remada-unilateral-halter 2, puxada-frente 2, elevacao-halteres 2, rosca-inclinada 2, crucifixo-invertido-sentado 2 | Inferior B (37 min): afundo 3, ponte-gluteo-halter 2, stiff-unilateral 2, flexao-bola 2, panturrilha-degrau 3 | Superior C (34 min): supino-reto 2, puxada-frente 2, remada-baixa-estacao 2, triceps-frances-unilateral-halter 2, elevacao-halteres 2, crucifixo-inverso 2 | Inferior C (42 min): afundo-tras 2, ponte-gluteo-halter 2, stiff 2, flexao-bola 2, panturrilha-degrau 3, abducao-deitado 2

### `volume.excesso.panturrilha`

- **peso-corpo · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · ombro 7**: panturrilha sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (20 min): bulgaro-peso-corpo 2, panturrilha-chao 2, flexao-joelho-deslizante 2 | Inferior A (22 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-degrau 2, abdominal-chao 2 | Superior B (20 min): afundo-peso-corpo 2, panturrilha-chao 2, flexao-joelho-deslizante 2 | Inferior B (31 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2, panturrilha-degrau 2, abdominal-invertido 2 | Superior C (20 min): afundo-tras-peso-corpo 2, panturrilha-chao 2, flexao-joelho-deslizante 2 | Inferior C (31 min): afundo-tras-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2, panturrilha-degrau 2, abdominal-chao 2

### `volume.excesso.peito`

- **casa · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 14 séries (máximo do nível 10).
  - Programa: Corpo todo A (37 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-elastico 2 | Corpo todo B (37 min): flexao 2, remada-elastico 2, ponte-gluteo-halter 2, rosca-alternada 2, panturrilha-degrau 2, crucifixo-invertido-sentado 2 | Corpo todo C (39 min): flexao 2, puxada-elastico 2, ponte-gluteo-halter 2, elevacao-halteres 2, triceps-testa-halteres 2, panturrilha-chao 2 | Corpo todo D (35 min): flexao 2, puxada-elastico 2, triceps-frances-unilateral-halter 2, elevacao-halteres 2, panturrilha-degrau 2, crucifixo-elastico 2 | Corpo todo E (35 min): supino-chao-halteres 2, remada-elastico 2, rosca-martelo 2, crucifixo-invertido-sentado 2, elevacao-halteres 2, abducao-elastico 2
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 14 séries (máximo do nível 10).
  - Programa: Corpo todo A (35 min): supino-reto 2, barra-fixa-negativa 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2, abducao-caneleira 2 | Corpo todo B (40 min): supino-inclinado 2, remada-apoiada 2, ponte-kettlebell 3, rosca-inclinada 2, panturrilha 2, crucifixo-inverso 2 | Corpo todo C (41 min): supino-reto 2, barra-fixa-negativa 2, ponte-gluteo-halter 3, elevacao-halteres 2, triceps-suspensao 2, panturrilha-chao 2 | Corpo todo D (32 min): supino-reto 2, barra-fixa-negativa 2, triceps-frances-kettlebell 2, elevacao-halteres 2, panturrilha-bilateral-step 2, crucifixo-inclinado-halteres 2 | Corpo todo E (37 min): supino-inclinado 2, remada-apoiada 2, rosca-scott-banco-inclinado 2, crucifixo-invertido-sentado 2, elevacao-halteres 2, aducao-caneleira 2
- **condominio · iniciante · Corpo todo 5x (5 dias) · 45 min · prioridade nenhuma · joelho 7 + lombar 7**: peito sem prioridade com 14 séries (máximo do nível 10).
  - Programa: Corpo todo A (36 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, triceps-frances-halter 2, elevacao-halteres 2, crucifixo-halteres 2 | Corpo todo B (41 min): supino-inclinado 2, remada-apoiada 2, ponte-gluteo-halter 2, rosca-inclinada 2, panturrilha-degrau 4, crucifixo-inverso 2 | Corpo todo C (39 min): supino-reto 2, puxada-frente 2, ponte-gluteo-halter 2, elevacao-halteres 2, triceps-testa-halteres 2, panturrilha-chao 2 | Corpo todo D (34 min): supino-reto 2, puxada-frente 2, triceps-frances-unilateral-halter 2, elevacao-halteres 2, panturrilha-degrau 2, crucifixo-inclinado-halteres 2 | Corpo todo E (37 min): supino-inclinado 2, remada-apoiada 2, rosca-scott-banco-inclinado 2, crucifixo-invertido-sentado 2, elevacao-halteres 2, abducao-deitado 2

### `volume.excesso.posteriores`

- **casa · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · lombar 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (36 min): flexao 3, puxada-elastico 2, remada-elastico 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-alternada 2 | Inferior A (36 min): goblet 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, flexao-joelho-deslizante 2, extensao-joelho-elastico 2, panturrilha-degrau 2 | Superior B (36 min): flexao 3, remada-elastico 2, puxada-elastico 2, elevacao-halteres 2, rosca-martelo 2, crucifixo-invertido-sentado 2 | Inferior B (37 min): afundo 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 2, flexao-joelho-deslizante 2 | Superior C (36 min): flexao 2, puxada-elastico 2, remada-elastico 2, triceps-frances-unilateral-halter 2, elevacao-halteres 2, rosca-concentrada 2 | Inferior C (37 min): afundo-tras 2, ponte-gluteo-halter 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2, panturrilha-degrau 2, flexao-joelho-deslizante 2
- **casa+ · iniciante · Superior/Inferior (3x) (6 dias) · 45 min · prioridade nenhuma · joelho 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Superior A (34 min): supino-reto 3, barra-fixa-negativa 2, remada-apoiada 2, triceps-frances-halter 2, elevacao-halteres 2, rosca-inclinada 2 | Inferior A (39 min): stiff 2, stiff-kettlebell 2, panturrilha 2, aducao-caneleira 2, abducao-caneleira 2, abdominal-bola 2 | Superior B (35 min): supino-inclinado 2, remada-unilateral-halter 2, barra-fixa-negativa 2, elevacao-halteres 2, rosca-scott-banco-inclinado 2, crucifixo-inverso 2 | Inferior B (37 min): ponte-gluteo-halter 2, stiff-unilateral 2, stiff-unilateral-kettlebell 2, panturrilha-bilateral-step 2, elevacao-lateral-caneleira 2, abdominal-chao 2 | Superior C (34 min): supino-reto 3, barra-fixa-negativa 2, remada-apoiada 2, triceps-frances-kettlebell 2, elevacao-halteres 2, rosca-inclinada 2 | Inferior C (37 min): ponte-kettlebell 2, stiff 2, stiff-kettlebell 2, panturrilha 2, elevacao-lateral-deitado 2, abdominal-invertido 2
- **condominio · iniciante · Empurrar/Puxar/Pernas (2x) (6 dias) · 45 min · prioridade nenhuma · ombro 7**: posteriores da coxa sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Empurrar A (43 min): afundo-tras 2, stiff 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 2, panturrilha-chao 2, aducao-deitado 2 | Puxar A (9 min): rosca-scott-banco-inclinado 2, abdominal-bola 2 | Pernas A (34 min): bulgaro 2, stiff 2, goblet 2, flexao-bola 2, panturrilha-degrau 2, abdominal-chao 2 | Empurrar B (41 min): agachamento-halteres 2, stiff-unilateral 2, ponte-gluteo-halter 2, rosca-scott-banco-inclinado 2, panturrilha-sentada-halter 2, aducao-deitado 2 | Puxar B (9 min): rosca-scott-banco-inclinado 2, abdominal-invertido 2 | Pernas B (33 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, panturrilha-degrau 2, flexao-bola 2

### `volume.excesso.quadriceps`

- **casa · iniciante · Corpo todo 5x (5 dias) · 20 min · prioridade superior · cotovelo 7**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (20 min): goblet 2, elevacao-halteres 3+drop, abdominal-chao 2 | Corpo todo B (26 min): stiff 2, extensao-joelho-elastico 2, panturrilha-degrau 4 | Corpo todo C (15 min): afundo 2, ponte-gluteo-halter 2 | Corpo todo D (20 min): agachamento-halteres 2, stiff-unilateral 2, elevacao-halteres 2+drop | Corpo todo E (20 min): afundo-tras 2, flexao-joelho-elastico 2, extensao-joelho-elastico 2
- **casa+ · iniciante · Corpo todo 5x (5 dias) · 30 min · prioridade superior · ombro 7**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (28 min): bulgaro 2, rosca-scott-banco-inclinado 2, flexao-bola 2, abdominal-bola 4 | Corpo todo B (30 min): stiff 2, rosca-scott-banco-inclinado 3, extensao-joelho-caneleira 2, panturrilha 3 | Corpo todo C (25 min): afundo 2, ponte-gluteo-halter 2, triceps-elastico-alto 4 | Corpo todo D (27 min): goblet 2, stiff-kettlebell 2, rosca-scott-banco-inclinado 2, panturrilha-bilateral-step 3 | Corpo todo E (25 min): afundo-kettlebell 2, rosca-alternada 3, flexao-joelho-elastico 2, extensao-joelho-caneleira 2
- **condominio+ · iniciante · Corpo todo 5x (5 dias) · 30 min · prioridade superior · ombro 7**: quadríceps sem prioridade com 12 séries (máximo do nível 10).
  - Programa: Corpo todo A (28 min): bulgaro 2, rosca-scott-banco-inclinado 2, cadeira-flexora 2, abdominal-bola 4 | Corpo todo B (26 min): stiff 2, rosca-scott-banco-inclinado 2, cadeira-extensora 2, panturrilha 3 | Corpo todo C (30 min): afundo 2, hip-thrust 2, triceps-elastico-alto 4, rosca-scott-banco-inclinado 2 | Corpo todo D (28 min): goblet 2, stiff-unilateral 2, rosca-scott-banco-inclinado 2, panturrilha-bilateral-step 3 | Corpo todo E (22 min): afundo-tras 2, rosca-alternada 2, cadeira-flexora 2, cadeira-extensora 2

### `volume.excesso.triceps`

- **casa · iniciante · Superior/Inferior + Empurrar/Puxar/Pernas (5 dias) · 60 min · prioridade misto · sem dor**: tríceps sem prioridade com 10.5 séries (máximo do nível 10).
  - Programa: Superior (60 min): flexao 3, remada-curvada-halteres 3, remada-unilateral-sem-banco 3, desenvolvimento-unilateral 2, elevacao-halteres 3, crucifixo-elastico 3, triceps-frances-halter 2, rosca-alternada 2 | Inferior (60 min): goblet 3, stiff 3, flexao-joelho-elastico 3, extensao-joelho-elastico 3, panturrilha-degrau 4, aducao-deitado 2, abdominal-chao 2 | Empurrar (38 min): flexao 2, desenvolvimento-unilateral 2, elevacao-halteres 3, crucifixo-elastico 2, triceps-frances-unilateral-halter 2, triceps-testa-halteres 2 | Puxar (33 min): remada-curvada-halteres 2, remada-unilateral-sem-banco 2, elevacao-halteres 2, crucifixo-invertido-sentado 2, rosca-martelo 2, abdominal-invertido 2 | Pernas (59 min): afundo 2, stiff-unilateral 2, ponte-gluteo-halter 2, extensao-joelho-elastico 2, panturrilha-degrau 3, flexao-joelho-elastico 2, panturrilha-sentada-halter 3, aducao-deitado 2
- **casa+ · iniciante · Superior/Inferior + Empurrar/Puxar/Pernas (5 dias) · 60 min · prioridade misto · sem dor**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Superior (50 min): supino-reto 2, barra-fixa-negativa 3, remada-apoiada 3, desenvolvimento 2, elevacao-halteres 3, crucifixo-halteres 2, triceps-frances-halter 2, rosca-inclinada 2 | Inferior (57 min): bulgaro 3, stiff 3, flexao-bola 3, extensao-joelho-caneleira 3, panturrilha 4, aducao-caneleira 2, abdominal-bola 2 | Empurrar (39 min): supino-inclinado 2, supino-reto 2, desenvolvimento 2, elevacao-halteres 3, crucifixo-inclinado-halteres 2, triceps-frances-kettlebell 2, triceps-suspensao 2 | Puxar (33 min): remada-unilateral-halter 2, barra-fixa-negativa 2, elevacao-halteres 2, crucifixo-inverso 2, rosca-scott-banco-inclinado 2, abdominal-chao 2 | Pernas (55 min): afundo 2, stiff-kettlebell 2, ponte-gluteo-halter 2, extensao-joelho-caneleira 2, panturrilha-bilateral-step 3, flexao-joelho-elastico 2, panturrilha-sentada-halter 3, aducao-caneleira 2
- **condominio · iniciante · Superior/Inferior + Empurrar/Puxar/Pernas (5 dias) · 60 min · prioridade misto · sem dor**: tríceps sem prioridade com 11 séries (máximo do nível 10).
  - Programa: Superior (51 min): supino-reto 2, puxada-frente 3, remada-apoiada 3, desenvolvimento 2, elevacao-halteres 3, crucifixo-halteres 2, triceps-frances-halter 2, rosca-inclinada 2 | Inferior (58 min): bulgaro 3, stiff 3, goblet 3, flexao-bola 3, panturrilha-degrau 4, aducao-deitado 2, abdominal-bola 2 | Empurrar (41 min): supino-inclinado 2, supino-reto 2, desenvolvimento 2, elevacao-halteres 3, crucifixo-inclinado-halteres 2, triceps-frances-unilateral-halter 2, triceps-testa-halteres 2 | Puxar (34 min): remada-unilateral-halter 2, puxada-frente 2, elevacao-halteres 2, crucifixo-inverso 2, rosca-scott-banco-inclinado 2, abdominal-chao 2 | Pernas (56 min): afundo 2, stiff-unilateral 2, agachamento-halteres 2, ponte-gluteo-halter 2, panturrilha-degrau 3, flexao-bola 2, panturrilha-sentada-halter 3, aducao-deitado 2

### `volume.zero.costas`

- **peso-corpo · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `volume.zero.posteriores`

- **casa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (29 min): goblet 2, flexao 2, remada-curvada-halteres 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (21 min): afundo 2, flexao 2, remada-unilateral-sem-banco 2
- **casa+ · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (30 min): bulgaro 2, supino-reto 2, barra-fixa-negativa 2, panturrilha 2, abdominal-bola 2 | Corpo todo B (20 min): afundo 2, supino-inclinado 2, remada-apoiada 2
- **condominio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (30 min): bulgaro 2, supino-reto 2, puxada-frente 2, panturrilha-degrau 2, abdominal-bola 2 | Corpo todo B (20 min): afundo 2, supino-inclinado 2, remada-apoiada 2

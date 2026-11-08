# Mapa do catálogo: músculo × padrão × nível × equipamento

> Gerado por `npm run auditoria:catalogo` (`scripts/auditoria/catalogo.ts`) com a biblioteca de hoje. Dados fictícios; mesmo resultado a cada rodada.
> Cada célula: exercícios possíveis com o músculo como **principal** naquele padrão, no formato `iniciante / intermediário e avançado`. **0** e **1** em negrito: nenhuma opção ou uma só (sem alternativa).
> O nível vem só da complexidade (`NIVEL_COMPLEXIDADE_MAX`: iniciante até 2, intermediário até 3, avançado até 3). **Intermediário e avançado veem as mesmas opções**: a biblioteca não tem nada só do avançado. Só 10 dos 171 exercícios ficam fora do iniciante (supino-barra, remada-barra, desenvolvimento-barra, agachamento-barra, terra-romeno-barra, mergulho, nordico, bulgaro-suspensao, roda-abdominal, flexao-pes-elevados).

| Músculo | Padrão | nada | elásticos | halteres | halteres 2–20 kg | barra fixa | suspensão | kettlebell | caneleiras | mini-band | roda | casa | casa+ | condomínio | academia | academia+ | biblioteca toda |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| peito | empurrar-h | 2 / 3 | 3 / 4 | 3 / 4 | 3 / 4 | 2 / 3 | 2 / 3 | 2 / 3 | 2 / 3 | 2 / 3 | 2 / 3 | 4 / 5 | 6 / 7 | 5 / 6 | 10 / 13 | 11 / 14 | 11 / 14 |
| peito | isolador-peito | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | 3 / 3 | 2 / 2 | 5 / 5 | 6 / 6 | 6 / 6 |
| costas | puxar-h | **0** / **0** | 3 / 3 | 2 / 2 | 2 / 2 | **0** / **0** | **1** / **1** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | 5 / 5 | 9 / 9 | 5 / 5 | 9 / 10 | 14 / 15 | 14 / 15 |
| costas | puxar-v | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | 3 / 3 | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | 4 / 4 | **1** / **1** | 7 / 7 | 8 / 8 | 8 / 8 |
| ombro (frente) | empurrar-v | **1** / **1** | 2 / 2 | 3 / 3 | 3 / 3 | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | 4 / 4 | 6 / 6 | 4 / 4 | 5 / 6 | 7 / 8 | 7 / 8 |
| ombro (lateral) | isolador-ombro-lateral | **0** / **0** | 2 / 2 | 3 / 3 | 3 / 3 | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | 5 / 5 | 6 / 6 | 3 / 3 | 4 / 4 | 7 / 7 | 7 / 7 |
| ombro (posterior) | isolador-ombro-posterior | **1** / **1** | 3 / 3 | 3 / 3 | 3 / 3 | **1** / **1** | 3 / 3 | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | 5 / 5 | 9 / 9 | 4 / 4 | 6 / 6 | 12 / 12 | 12 / 12 |
| bíceps | isolador-biceps | **0** / **0** | 2 / 2 | 3 / 3 | 3 / 3 | **0** / **0** | **1** / **1** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | 5 / 5 | 9 / 9 | 5 / 5 | 10 / 10 | 14 / 14 | 14 / 14 |
| tríceps | empurrar-h | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 3 | 2 / 3 | 2 / 3 |
| tríceps | isolador-triceps | **1** / **1** | 3 / 3 | 4 / 4 | 4 / 4 | **1** / **1** | 2 / 2 | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | 6 / 6 | 8 / 8 | 4 / 4 | 9 / 9 | 13 / 13 | 13 / 13 |
| quadríceps | agachar | **1** / **1** | 2 / 2 | 3 / 3 | 3 / 3 | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | 4 / 4 | 5 / 5 | 3 / 3 | 7 / 8 | 9 / 10 | 9 / 10 |
| quadríceps | afundo | 3 / 3 | 3 / 3 | 5 / 5 | 5 / 5 | 3 / 3 | 3 / 4 | 4 / 4 | 3 / 3 | 3 / 3 | 3 / 3 | 5 / 5 | 7 / 8 | 6 / 6 | 6 / 6 | 7 / 8 | 7 / 8 |
| quadríceps | isolador-quadriceps | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | **1** / **1** | **0** / **0** | **1** / **1** | 3 / 3 | **0** / **0** | **1** / **1** | 4 / 4 | 4 / 4 |
| posteriores da coxa | dobrar-quadril | **0** / **0** | **1** / **1** | 2 / 2 | 2 / 2 | **0** / **0** | **0** / **0** | 2 / 2 | **0** / **0** | **0** / **0** | **0** / **0** | 3 / 3 | 5 / 5 | 2 / 2 | 4 / 5 | 7 / 8 | 7 / 8 |
| posteriores da coxa | flexao-joelho | **1** / 2 | 2 / 3 | **1** / 2 | **1** / 2 | **1** / 2 | 2 / 3 | **1** / 2 | **1** / 2 | **1** / 2 | **1** / 2 | 2 / 3 | 4 / 5 | 2 / 3 | 3 / 4 | 6 / 7 | 6 / 7 |
| glúteos | agachar | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | **1** / **1** | **1** / **1** |
| glúteos | dobrar-quadril | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | **1** / **1** | **1** / **1** |
| glúteos | extensao-quadril | **1** / **1** | 2 / 2 | 2 / 2 | 2 / 2 | **1** / **1** | **1** / **1** | 2 / 2 | 2 / 2 | **1** / **1** | **1** / **1** | 3 / 3 | 6 / 6 | 3 / 3 | 5 / 5 | 9 / 9 | 9 / 9 |
| glúteos | abducao-quadril | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | 4 / 4 | **1** / **1** | 2 / 2 | 6 / 6 | **1** / **1** | 3 / 3 | 8 / 8 | 8 / 8 |
| panturrilha | panturrilha | 2 / 2 | 2 / 2 | 3 / 3 | 3 / 3 | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 2 | 3 / 3 | 5 / 5 | 3 / 3 | 8 / 8 | 8 / 8 | 8 / 8 |
| abdômen | core | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 2 | 3 / 3 | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 3 | 2 / 2 | 4 / 5 | 3 / 3 | 6 / 6 | 8 / 9 | 8 / 9 |
| adutores | aducao-quadril | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | 2 / 2 | 3 / 3 | 3 / 3 |

## Por músculo, somando os padrões (avançado)
| Músculo | nada | elásticos | halteres | halteres 2–20 kg | barra fixa | suspensão | kettlebell | caneleiras | mini-band | roda | casa | casa+ | condomínio | academia | academia+ | biblioteca toda |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| peito | 3 | 5 | 4 | 4 | 3 | 3 | 3 | 3 | 3 | 3 | 6 | 10 | 8 | 18 | 20 | 20 |
| costas | **0** | 4 | 2 | 2 | 3 | **1** | **1** | **0** | **0** | **0** | 6 | 13 | 6 | 17 | 23 | 23 |
| ombro (frente) | **1** | 2 | 3 | 3 | **1** | **1** | 2 | **1** | **1** | **1** | 4 | 6 | 4 | 6 | 8 | 8 |
| ombro (lateral) | **0** | 2 | 3 | 3 | **0** | **0** | **0** | **1** | **0** | **0** | 5 | 6 | 3 | 4 | 7 | 7 |
| ombro (posterior) | **1** | 3 | 3 | 3 | **1** | 3 | **1** | 2 | **1** | **1** | 5 | 9 | 4 | 6 | 12 | 12 |
| bíceps | **0** | 2 | 3 | 3 | **0** | **1** | **1** | **0** | **0** | **0** | 5 | 9 | 5 | 10 | 14 | 14 |
| tríceps | 2 | 4 | 5 | 5 | 2 | 3 | 3 | 2 | 2 | 2 | 7 | 9 | 5 | 12 | 16 | 16 |
| quadríceps | 4 | 6 | 8 | 8 | 4 | 5 | 6 | 5 | 5 | 4 | 10 | 16 | 9 | 15 | 22 | 22 |
| posteriores da coxa | 2 | 4 | 4 | 4 | 2 | 3 | 4 | 2 | 2 | 2 | 6 | 10 | 5 | 9 | 15 | 15 |
| glúteos | 2 | 4 | 3 | 3 | 2 | 2 | 3 | 4 | 5 | 2 | 5 | 12 | 4 | 10 | 19 | 19 |
| panturrilha | 2 | 2 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 5 | 3 | 8 | 8 | 8 |
| abdômen | 2 | 2 | 2 | 2 | 3 | 2 | 2 | 2 | 2 | 3 | 2 | 5 | 3 | 6 | 9 | 9 |
| adutores | **1** | **1** | **1** | **1** | **1** | **1** | **1** | 2 | **1** | **1** | **1** | 2 | **1** | 2 | 3 | 3 |

## Quais exercícios (biblioteca toda, por músculo e padrão)
- **peito · empurrar-h:** supino-inclinado, supino-barra (só intermediário+), supino-reto, supino-inclinado-polia, supino-polia, flexao, flexao-elastico, supino-smith, supino-maquina, mergulho (só intermediário+), mergulho-graviton, supino-chao-halteres, flexao-fechada, flexao-pes-elevados (só intermediário+)
- **peito · isolador-peito:** crucifixo-polia, crucifixo-halteres, crucifixo-polia-baixo, crucifixo-elastico, voador, crucifixo-inclinado-halteres
- **costas · puxar-h:** remada-baixa, remada-apoiada, remada-barra (só intermediário+), remada-unilateral-halter, remada-invertida, remada-elastico, remada-baixa-estacao, remada-articulada, remada-suspensao, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-polia, remada-unilateral-kettlebell, remada-curvada-elastico, remada-unilateral-elastico
- **costas · puxar-v:** barra-fixa, puxada-unilateral, puxada-barra-reta, barra-fixa-supinada, puxada-elastico, puxada-frente, barra-fixa-graviton, barra-fixa-negativa
- **ombro (frente) · empurrar-v:** desenvolvimento, desenvolvimento-barra (só intermediário+), desenvolvimento-unilateral, desenvolvimento-elastico, desenvolvimento-maquina, pike, desenvolvimento-unilateral-kettlebell, desenvolvimento-em-pe-halteres
- **ombro (lateral) · isolador-ombro-lateral:** elevacao-lateral, elevacao-halteres, elevacao-lateral-elastico, elevacao-lateral-unilateral, elevacao-lateral-deitado, elevacao-lateral-unilateral-elastico, elevacao-lateral-caneleira
- **ombro (posterior) · isolador-ombro-posterior:** face-pull, crucifixo-inverso, face-pull-elastico, voador-invertido, crucifixo-invertido-curvado, crucifixo-invertido-polia, yt-suspensao, abertura-t-deitado, crucifixo-invertido-sentado, abertura-elastico, crucifixo-invertido-caneleira, face-pull-suspensao
- **bíceps · isolador-biceps:** rosca-polia, rosca-inclinada, rosca-barra-w, rosca-alternada, rosca-polia-costas, rosca-elastico, rosca-scott, rosca-maquina, rosca-martelo, rosca-suspensao, rosca-kettlebell, rosca-scott-banco-inclinado, rosca-concentrada, rosca-martelo-elastico
- **tríceps · empurrar-h:** mergulho (só intermediário+), mergulho-graviton, flexao-fechada
- **tríceps · isolador-triceps:** triceps-corda, triceps-frances, triceps-barra-reta, triceps-frances-halter, triceps-elastico-acima, triceps-maquina, triceps-frances-polia-unilateral, triceps-suspensao, triceps-frances-kettlebell, extensao-triceps-peso-corpo, triceps-frances-unilateral-halter, triceps-testa-halteres, triceps-elastico-alto
- **quadríceps · agachar:** agachamento-barra (só intermediário+), leg-press, goblet, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, hack, agachamento-smith, terra-hexagonal, goblet-kettlebell
- **quadríceps · afundo:** bulgaro, afundo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao (só intermediário+), afundo-kettlebell, afundo-tras-peso-corpo
- **quadríceps · isolador-quadriceps:** cadeira-extensora, extensao-joelho-caneleira, extensao-joelho-elastico, extensao-joelho-mini-band
- **posteriores da coxa · dobrar-quadril:** terra-romeno-barra (só intermediário+), stiff, pull-through, stiff-unilateral, stiff-elastico, hiperextensao, stiff-kettlebell, stiff-unilateral-kettlebell
- **posteriores da coxa · flexao-joelho:** cadeira-flexora, mesa-flexora, flexao-bola, flexao-joelho-elastico, flexao-joelho-deslizante, nordico (só intermediário+), flexao-joelho-suspensao
- **glúteos · agachar:** terra-hexagonal
- **glúteos · dobrar-quadril:** hiperextensao
- **glúteos · extensao-quadril:** ponte-gluteo, hip-thrust, coice-maquina, coice-polia, ponte-gluteo-halter, ponte-pes-bola, ponte-kettlebell, coice-elastico, coice-caneleira
- **glúteos · abducao-quadril:** abducao-maquina, abducao-polia, abducao-caneleira, abducao-mini-band, abducao-deitado, abducao-elastico, caminhada-lateral-mini-band, abducao-deitado-mini-band
- **panturrilha · panturrilha:** panturrilha, panturrilha-bilateral-step, panturrilha-leg-press, panturrilha-chao, panturrilha-em-pe-maquina, panturrilha-sentada, panturrilha-sentada-halter, panturrilha-degrau
- **abdômen · core:** abdominal-polia, elevacao-joelhos, abdominal-declinado, abdominal-chao, abdominal-maquina, elevacao-joelhos-paralelas, abdominal-bola, roda-abdominal (só intermediário+), abdominal-invertido
- **adutores · aducao-quadril:** aducao-maquina, aducao-caneleira, aducao-deitado

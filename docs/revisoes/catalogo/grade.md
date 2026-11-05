# Mapa do catálogo: músculo × padrão × nível × equipamento

> Gerado por `npm run auditoria:catalogo` (`scripts/auditoria/catalogo.ts`) com a biblioteca de hoje. Dados fictícios; mesmo resultado a cada rodada.
> Cada célula: exercícios possíveis com o músculo como **principal** naquele padrão, no formato `iniciante / intermediário e avançado`. **0** e **1** em negrito: nenhuma opção ou uma só (sem alternativa).
> O nível vem só da complexidade (`NIVEL_COMPLEXIDADE_MAX`: iniciante até 2, intermediário até 3, avançado até 3). **Intermediário e avançado veem as mesmas opções**: a biblioteca não tem nada só do avançado. Só 9 dos 139 exercícios ficam fora do iniciante (supino-barra, remada-barra, desenvolvimento-barra, agachamento-barra, terra-romeno-barra, mergulho, nordico, bulgaro-suspensao, roda-abdominal).

| Músculo | Padrão | nada | elásticos | halteres | halteres 2–20 kg | barra fixa | suspensão | kettlebell | caneleiras | mini-band | roda | casa | casa+ | condomínio | academia | academia+ | biblioteca toda |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| peito | empurrar-h | 2 / 2 | 3 / 3 | 3 / 3 | 3 / 3 | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 2 | 2 / 2 | 4 / 4 | 6 / 6 | 5 / 5 | 10 / 12 | 11 / 13 | 11 / 13 |
| peito | isolador-peito | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | 2 / 2 | **1** / **1** | 4 / 4 | 5 / 5 | 5 / 5 |
| costas | puxar-h | **0** / **0** | **1** / **1** | 2 / 2 | 2 / 2 | **0** / **0** | **1** / **1** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | 3 / 3 | 7 / 7 | 5 / 5 | 9 / 10 | 12 / 13 | 12 / 13 |
| costas | puxar-v | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | 2 / 2 | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | 3 / 3 | **1** / **1** | 6 / 6 | 7 / 7 | 7 / 7 |
| ombro (frente) | empurrar-v | **1** / **1** | 2 / 2 | 2 / 2 | 2 / 2 | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | 3 / 3 | 5 / 5 | 3 / 3 | 4 / 5 | 6 / 7 | 6 / 7 |
| ombro (lateral) | isolador-ombro-lateral | **0** / **0** | **1** / **1** | **1** / **1** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | 2 / 2 | 2 / 2 | **1** / **1** | 2 / 2 | 3 / 3 | 3 / 3 |
| ombro (posterior) | isolador-ombro-posterior | **0** / **0** | **1** / **1** | **1** / **1** | **1** / **1** | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | 2 / 2 | 4 / 4 | 2 / 2 | 4 / 4 | 7 / 7 | 7 / 7 |
| bíceps | isolador-biceps | **0** / **0** | **1** / **1** | 2 / 2 | 2 / 2 | **0** / **0** | **1** / **1** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | 3 / 3 | 6 / 6 | 3 / 3 | 8 / 8 | 11 / 11 | 11 / 11 |
| tríceps | empurrar-h | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 3 | 2 / 3 | 2 / 3 |
| tríceps | isolador-triceps | **0** / **0** | **1** / **1** | **1** / **1** | **1** / **1** | **0** / **0** | **1** / **1** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | 2 / 2 | 4 / 4 | **1** / **1** | 6 / 6 | 9 / 9 | 9 / 9 |
| quadríceps | agachar | **1** / **1** | 2 / 2 | 3 / 3 | 3 / 3 | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | 4 / 4 | 5 / 5 | 3 / 3 | 7 / 8 | 9 / 10 | 9 / 10 |
| quadríceps | afundo | 2 / 2 | 2 / 2 | 4 / 4 | 4 / 4 | 2 / 2 | 2 / 3 | 3 / 3 | 2 / 2 | 2 / 2 | 2 / 2 | 4 / 4 | 6 / 7 | 5 / 5 | 5 / 5 | 6 / 7 | 6 / 7 |
| quadríceps | isolador-quadriceps | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | **1** / **1** | 2 / 2 | **0** / **0** | **1** / **1** | 3 / 3 | 3 / 3 |
| posteriores da coxa | dobrar-quadril | **0** / **0** | **1** / **1** | 2 / 2 | 2 / 2 | **0** / **0** | **0** / **0** | **1** / **1** | **0** / **0** | **0** / **0** | **0** / **0** | 3 / 3 | 4 / 4 | 2 / 2 | 4 / 5 | 6 / 7 | 6 / 7 |
| posteriores da coxa | flexao-joelho | **1** / 2 | 2 / 3 | **1** / 2 | **1** / 2 | **1** / 2 | 2 / 3 | **1** / 2 | **1** / 2 | **1** / 2 | **1** / 2 | 2 / 3 | 4 / 5 | 2 / 3 | 3 / 4 | 6 / 7 | 6 / 7 |
| glúteos | agachar | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | **1** / **1** | **1** / **1** |
| glúteos | dobrar-quadril | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **0** / **0** | **1** / **1** | **1** / **1** | **1** / **1** |
| glúteos | extensao-quadril | **1** / **1** | **1** / **1** | 2 / 2 | 2 / 2 | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | 4 / 4 | 3 / 3 | 5 / 5 | 7 / 7 | 7 / 7 |
| glúteos | abducao-quadril | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | 2 / 2 | **1** / **1** | **1** / **1** | 3 / 3 | **1** / **1** | 3 / 3 | 5 / 5 | 5 / 5 |
| panturrilha | panturrilha | **1** / **1** | **1** / **1** | 2 / 2 | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | 4 / 4 | 2 / 2 | 7 / 7 | 7 / 7 | 7 / 7 |
| abdômen | core | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / 2 | **1** / **1** | 3 / 4 | 2 / 2 | 5 / 5 | 7 / 8 | 7 / 8 |
| adutores | aducao-quadril | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | **1** / **1** | **1** / **1** | 2 / 2 | **1** / **1** | 2 / 2 | 3 / 3 | 3 / 3 |

## Por músculo, somando os padrões (avançado)
| Músculo | nada | elásticos | halteres | halteres 2–20 kg | barra fixa | suspensão | kettlebell | caneleiras | mini-band | roda | casa | casa+ | condomínio | academia | academia+ | biblioteca toda |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| peito | 2 | 4 | 3 | 3 | 2 | 2 | 2 | 2 | 2 | 2 | 5 | 8 | 6 | 16 | 18 | 18 |
| costas | **0** | 2 | 2 | 2 | 2 | **1** | **1** | **0** | **0** | **0** | 4 | 10 | 6 | 16 | 20 | 20 |
| ombro (frente) | **1** | 2 | 2 | 2 | **1** | **1** | 2 | **1** | **1** | **1** | 3 | 5 | 3 | 5 | 7 | 7 |
| ombro (lateral) | **0** | **1** | **1** | **1** | **0** | **0** | **0** | **0** | **0** | **0** | 2 | 2 | **1** | 2 | 3 | 3 |
| ombro (posterior) | **0** | **1** | **1** | **1** | **0** | **1** | **0** | **0** | **0** | **0** | 2 | 4 | 2 | 4 | 7 | 7 |
| bíceps | **0** | **1** | 2 | 2 | **0** | **1** | **1** | **0** | **0** | **0** | 3 | 6 | 3 | 8 | 11 | 11 |
| tríceps | **1** | 2 | 2 | 2 | **1** | 2 | 2 | **1** | **1** | **1** | 3 | 5 | 2 | 9 | 12 | 12 |
| quadríceps | 3 | 5 | 7 | 7 | 3 | 4 | 5 | 4 | 3 | 3 | 9 | 14 | 8 | 14 | 20 | 20 |
| posteriores da coxa | 2 | 4 | 4 | 4 | 2 | 3 | 3 | 2 | 2 | 2 | 6 | 9 | 5 | 9 | 14 | 14 |
| glúteos | 2 | 2 | 3 | 3 | 2 | 2 | 3 | 3 | 3 | 2 | 3 | 7 | 4 | 10 | 14 | 14 |
| panturrilha | **1** | **1** | 2 | 2 | **1** | **1** | **1** | **1** | **1** | **1** | 2 | 4 | 2 | 7 | 7 | 7 |
| abdômen | **1** | **1** | **1** | **1** | 2 | **1** | **1** | **1** | **1** | 2 | **1** | 4 | 2 | 5 | 8 | 8 |
| adutores | **1** | **1** | **1** | **1** | **1** | **1** | **1** | 2 | **1** | **1** | **1** | 2 | **1** | 2 | 3 | 3 |

## Quais exercícios (biblioteca toda, por músculo e padrão)
- **peito · empurrar-h:** supino-inclinado, supino-barra (só intermediário+), supino-reto, supino-inclinado-polia, supino-polia, flexao, flexao-elastico, supino-smith, supino-maquina, mergulho (só intermediário+), mergulho-graviton, supino-chao-halteres, flexao-fechada
- **peito · isolador-peito:** crucifixo-polia, crucifixo-halteres, crucifixo-polia-baixo, crucifixo-elastico, voador
- **costas · puxar-h:** remada-baixa, remada-apoiada, remada-barra (só intermediário+), remada-unilateral-halter, remada-invertida, remada-elastico, remada-baixa-estacao, remada-articulada, remada-suspensao, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-polia, remada-unilateral-kettlebell
- **costas · puxar-v:** barra-fixa, puxada-unilateral, puxada-barra-reta, barra-fixa-supinada, puxada-elastico, puxada-frente, barra-fixa-graviton
- **ombro (frente) · empurrar-v:** desenvolvimento, desenvolvimento-barra (só intermediário+), desenvolvimento-unilateral, desenvolvimento-elastico, desenvolvimento-maquina, pike, desenvolvimento-unilateral-kettlebell
- **ombro (lateral) · isolador-ombro-lateral:** elevacao-lateral, elevacao-halteres, elevacao-lateral-elastico
- **ombro (posterior) · isolador-ombro-posterior:** face-pull, crucifixo-inverso, face-pull-elastico, voador-invertido, crucifixo-invertido-curvado, crucifixo-invertido-polia, yt-suspensao
- **bíceps · isolador-biceps:** rosca-polia, rosca-inclinada, rosca-barra-w, rosca-alternada, rosca-polia-costas, rosca-elastico, rosca-scott, rosca-maquina, rosca-martelo, rosca-suspensao, rosca-kettlebell
- **tríceps · empurrar-h:** mergulho (só intermediário+), mergulho-graviton, flexao-fechada
- **tríceps · isolador-triceps:** triceps-corda, triceps-frances, triceps-barra-reta, triceps-frances-halter, triceps-elastico-acima, triceps-maquina, triceps-frances-polia-unilateral, triceps-suspensao, triceps-frances-kettlebell
- **quadríceps · agachar:** agachamento-barra (só intermediário+), leg-press, goblet, agachamento-halteres, agachamento-elastico, agachamento-peso-corpo, hack, agachamento-smith, terra-hexagonal, goblet-kettlebell
- **quadríceps · afundo:** bulgaro, afundo, afundo-tras, afundo-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao (só intermediário+), afundo-kettlebell
- **quadríceps · isolador-quadriceps:** cadeira-extensora, extensao-joelho-caneleira, extensao-joelho-elastico
- **posteriores da coxa · dobrar-quadril:** terra-romeno-barra (só intermediário+), stiff, pull-through, stiff-unilateral, stiff-elastico, hiperextensao, stiff-kettlebell
- **posteriores da coxa · flexao-joelho:** cadeira-flexora, mesa-flexora, flexao-bola, flexao-joelho-elastico, flexao-joelho-deslizante, nordico (só intermediário+), flexao-joelho-suspensao
- **glúteos · agachar:** terra-hexagonal
- **glúteos · dobrar-quadril:** hiperextensao
- **glúteos · extensao-quadril:** ponte-gluteo, hip-thrust, coice-maquina, coice-polia, ponte-gluteo-halter, ponte-pes-bola, ponte-kettlebell
- **glúteos · abducao-quadril:** abducao-maquina, abducao-polia, abducao-caneleira, abducao-mini-band, abducao-deitado
- **panturrilha · panturrilha:** panturrilha, panturrilha-bilateral-step, panturrilha-leg-press, panturrilha-chao, panturrilha-em-pe-maquina, panturrilha-sentada, panturrilha-sentada-halter
- **abdômen · core:** abdominal-polia, elevacao-joelhos, abdominal-declinado, abdominal-chao, abdominal-maquina, elevacao-joelhos-paralelas, abdominal-bola, roda-abdominal (só intermediário+)
- **adutores · aducao-quadril:** aducao-maquina, aducao-caneleira, aducao-deitado

# Cenários: quantas opções cada vaga tem, por nível

> Gerado por `scripts/auditoria/catalogo.ts`. Vaga = função do gerador (`src/domain/gerador/funcoes.json`). Cada célula: opções equivalentes no nível da função que o gerador usa (`iniciante | intermediário | avançado`); `(n2)` = a função caiu para o 2º nível de preferência (o 1º não é possível); `→ x` = a vaga vazia recorre à função x; **0** = nenhuma opção; **1** = uma só (o gerador repete sempre o mesmo).
> 67 cenários em 55 classes (cenários que abrem os mesmos exercícios geram o mesmo programa).

## Resumo: vagas sem opção e vagas com uma opção só
| Cenário (e os que dão o mesmo) | Vagas com 0 (iniciante / avançado) | Vagas com 1 só (iniciante / avançado) | Vagas que só o intermediário+ abre |
|---|---:|---:|---|
| Academia completa (atalho) | 0 / 0 | 4 / 4 | — |
| Academia completa + kettlebell, elásticos, bola, suspensão, caneleiras, mini-band e roda (a Carla) | 0 / 0 | 4 / 4 | — |
| Casa com halteres e elásticos (atalho) | 0 / 0 | 11 / 9 | — |
| Casa + os "às vezes tem" (banco, barra fixa, kettlebell, suspensão, step, bola, caneleiras, mini-band, roda) | 0 / 0 | 6 / 6 | — |
| Condomínio com multifuncional (atalho: puxador e remada) | 1 / 1 | 9 / 9 | — |
| Condomínio + os "às vezes tem" e o multifuncional com todas as estações | 0 / 0 | 7 / 7 | — |
| Academia do bairro sem polia (2º local do Bruno) | 0 / 0 | 10 / 11 | — |
| Prédio com polia dupla, halteres e banco regulável (o Bruno) | 0 / 0 | 6 / 6 | — |
| Elásticos e barra fixa de porta (o Diego) (+ 1: barra-porta+elasticos) | 1 / 1 | 11 / 9 | — |
| Só elásticos (+ 1: so:elasticos) | 1 / 1 | 12 / 10 | — |
| Só halteres (2 a 20 kg), sem banco | 2 / 2 | 9 / 6 | — |
| Halteres de 1 a 12 kg e banco reto (a Ana) | 1 / 1 | 10 / 9 | — |
| Nada marcado (só o peso do corpo) (+ 10: so:polia_simples, so:banco_regulavel, so:banco_reto, so:acessorio_polia_corda, so:acessorio_polia_triangulo, so:acessorio_polia_barra_reta, so:acessorio_polia_estribo, so:acessorio_polia_tornozeleira, so:esteira, so:banco_scott) | 7 / 7 | 12 / 9 | — |
| Banco reto + halteres leves (2 a 6 kg) | 1 / 1 | 10 / 9 | — |
| Halteres de 2 a 10 kg + bola suíça | 2 / 2 | 9 / 7 | — |
| Step + elásticos (3 intensidades) | 1 / 1 | 11 / 9 | — |
| Suspensão + elásticos (3 intensidades) | 1 / 1 | 15 / 13 | — |
| Só máquina de abdominal | 7 / 7 | 13 / 10 | — |
| Só anilhas e manoplas para montar halteres | 2 / 2 | 9 / 6 | — |
| Só banco romano (hiperextensão) ou ghd | 7 / 7 | 12 / 9 | — |
| Só barra fixa | 6 / 6 | 12 / 9 | — |
| Só barra hexagonal (trap bar) | 7 / 7 | 12 / 9 | — |
| Só barra longa (olímpica ou comum) | 7 / 6 | 12 / 11 | puxar-horizontal, dobrar-quadril |
| Só barra w | 6 / 6 | 13 / 10 | — |
| Só bola suíça | 7 / 7 | 11 / 9 | — |
| Só cadeira abdutora e adutora (ou máquina de abdução em pé) | 7 / 7 | 12 / 9 | — |
| Só cadeira extensora | 6 / 6 | 13 / 10 | — |
| Só cadeira flexora (sentada) | 7 / 7 | 12 / 10 | — |
| Só caneleiras de peso | 5 / 5 | 13 / 10 | — |
| Só desenvolvimento na máquina | 7 / 7 | 12 / 9 | — |
| Só estação de polia dupla (crossover) com altura regulável | 2 / 2 | 16 / 13 | — |
| Só puxador alto (estação de puxada) | 6 / 6 | 13 / 10 | — |
| Só remada baixa (estação) | 6 / 6 | 13 / 10 | — |
| Só glúteo na máquina | 7 / 7 | 12 / 9 | — |
| Só graviton (barra e mergulho assistidos) | 6 / 6 | 12 / 10 | — |
| Só hack ou agachamento pendular | 7 / 7 | 12 / 9 | — |
| Só halteres fixos | 2 / 2 | 9 / 6 | — |
| Só kettlebell | 4 / 4 | 15 / 12 | — |
| Só leg press | 7 / 7 | 12 / 9 | — |
| Só mesa flexora (deitada) | 7 / 7 | 12 / 10 | — |
| Só mini-band (elástico curto em laço) | 6 / 6 | 12 / 9 | — |
| Só multifuncional (várias estações numa torre só) | 5 / 5 | 14 / 11 | — |
| Só panturrilha em pé (máquina) | 7 / 7 | 12 / 9 | — |
| Só panturrilha sentada (máquina) | 6 / 6 | 13 / 10 | — |
| Só paralelas | 7 / 7 | 12 / 9 | — |
| Só rack ou gaiola de agachamento | 5 / 5 | 14 / 11 | — |
| Só remada articulada | 6 / 6 | 13 / 10 | — |
| Só roda abdominal | 7 / 7 | 12 / 9 | — |
| Só máquina de rosca | 6 / 6 | 13 / 10 | — |
| Só smith | 5 / 5 | 14 / 11 | — |
| Só step | 7 / 7 | 11 / 8 | — |
| Só supino na máquina ou articulado | 7 / 7 | 12 / 11 | — |
| Só fitas de suspensão (trx) ou argolas | 4 / 4 | 13 / 11 | — |
| Só máquina de tríceps | 7 / 7 | 12 / 9 | — |
| Só voador (peck deck) | 6 / 6 | 13 / 10 | — |

## Vaga por vaga
### Academia completa (atalho)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | 3 | 4 | 4 | supino-reto, supino-barra, supino-maquina, supino-smith |
| Empurrar inclinado | 2 | 2 | 2 | supino-inclinado, supino-inclinado-polia |
| Crucifixo (peito alongado) | 5 | 5 | 5 | voador, crucifixo-polia, crucifixo-halteres, crucifixo-polia-baixo, crucifixo-inclinado-halteres |
| Puxar vertical | 6 | 6 | 6 | barra-fixa, barra-fixa-supinada, puxada-frente, puxada-barra-reta, puxada-unilateral, barra-fixa-graviton |
| Puxar horizontal | 8 | 8 | 8 | remada-baixa, remada-baixa-estacao, remada-articulada, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-polia |
| Empurrar vertical | 3 | 4 | 4 | desenvolvimento, desenvolvimento-maquina, desenvolvimento-barra, desenvolvimento-unilateral |
| Elevação lateral | 2 | 2 | 2 | elevacao-halteres, elevacao-lateral |
| Ombro posterior | 5 | 5 | 5 | crucifixo-inverso, face-pull, crucifixo-invertido-curvado, crucifixo-invertido-polia, crucifixo-invertido-sentado |
| Bíceps | 5 | 5 | 5 | rosca-scott, rosca-inclinada, rosca-polia-costas, rosca-maquina, rosca-scott-banco-inclinado |
| Tríceps acima da cabeça | 4 | 4 | 4 | triceps-frances, triceps-frances-halter, triceps-frances-polia-unilateral, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 3 | 3 | 3 | triceps-corda, triceps-barra-reta, triceps-maquina |
| Agachar | 3 | 4 | 4 | agachamento-barra, leg-press, hack, agachamento-smith |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | 2 | 3 | 3 | terra-romeno-barra, stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 3 | 3 | 3 | hip-thrust, coice-maquina, coice-polia |
| Abdução de quadril | 2 | 2 | 2 | abducao-maquina, abducao-polia |
| Adução de quadril (complemento) | **1** | **1** | **1** | aducao-maquina |
| Panturrilha em pé | 4 | 4 | 4 | panturrilha-em-pe-maquina, panturrilha-leg-press, panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **1** | **1** | **1** | panturrilha-sentada |
| Abdômen | 2 | 2 | 2 | abdominal-polia, abdominal-maquina |

### Academia completa + kettlebell, elásticos, bola, suspensão, caneleiras, mini-band e roda (a Carla)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | 3 | 4 | 4 | supino-reto, supino-barra, supino-maquina, supino-smith |
| Empurrar inclinado | 2 | 2 | 2 | supino-inclinado, supino-inclinado-polia |
| Crucifixo (peito alongado) | 5 | 5 | 5 | voador, crucifixo-polia, crucifixo-halteres, crucifixo-polia-baixo, crucifixo-inclinado-halteres |
| Puxar vertical | 6 | 6 | 6 | barra-fixa, barra-fixa-supinada, puxada-frente, puxada-barra-reta, puxada-unilateral, barra-fixa-graviton |
| Puxar horizontal | 9 | 9 | 9 | remada-baixa, remada-baixa-estacao, remada-articulada, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-polia, remada-unilateral-kettlebell |
| Empurrar vertical | 4 | 5 | 5 | desenvolvimento, desenvolvimento-maquina, desenvolvimento-barra, desenvolvimento-unilateral, desenvolvimento-unilateral-kettlebell |
| Elevação lateral | 2 | 2 | 2 | elevacao-halteres, elevacao-lateral |
| Ombro posterior | 6 | 6 | 6 | voador-invertido, crucifixo-inverso, face-pull, crucifixo-invertido-curvado, crucifixo-invertido-polia, crucifixo-invertido-sentado |
| Bíceps | 5 | 5 | 5 | rosca-scott, rosca-inclinada, rosca-polia-costas, rosca-maquina, rosca-scott-banco-inclinado |
| Tríceps acima da cabeça | 6 | 6 | 6 | triceps-frances, triceps-frances-halter, triceps-elastico-acima, triceps-frances-polia-unilateral, triceps-frances-kettlebell, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 3 | 3 | 3 | triceps-corda, triceps-barra-reta, triceps-maquina |
| Agachar | 3 | 4 | 4 | agachamento-barra, leg-press, hack, agachamento-smith |
| Afundo | 4 | 4 | 4 | bulgaro, afundo, afundo-tras, afundo-kettlebell |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | 4 | 5 | 5 | terra-romeno-barra, stiff, stiff-unilateral, stiff-kettlebell, stiff-unilateral-kettlebell |
| Extensão de quadril (glúteo) | 3 | 3 | 3 | hip-thrust, coice-maquina, coice-polia |
| Abdução de quadril | 2 | 2 | 2 | abducao-maquina, abducao-polia |
| Adução de quadril (complemento) | **1** | **1** | **1** | aducao-maquina |
| Panturrilha em pé | 4 | 4 | 4 | panturrilha-em-pe-maquina, panturrilha-leg-press, panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **1** | **1** | **1** | panturrilha-sentada |
| Abdômen | 3 | 3 | 3 | abdominal-polia, abdominal-maquina, abdominal-declinado |

### Casa com halteres e elásticos (atalho)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 3 (n2) | 3 (n2) | 3 (n2) | rosca-alternada, rosca-martelo, rosca-concentrada |
| Tríceps acima da cabeça | 3 | 3 | 3 | triceps-frances-halter, triceps-elastico-acima, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 3 (n3) | 3 (n3) | 3 (n3) | flexao-fechada, triceps-testa-halteres, triceps-elastico-alto |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-elastico |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 3 (n2) | 3 (n2) | 3 (n2) | ponte-gluteo, ponte-gluteo-halter, coice-elastico |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-elastico |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Casa + os "às vezes tem" (banco, barra fixa, kettlebell, suspensão, step, bola, caneleiras, mini-band, roda)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** | **1** | **1** | supino-inclinado |
| Crucifixo (peito alongado) | 2 | 2 | 2 | crucifixo-halteres, crucifixo-inclinado-halteres |
| Puxar vertical | 2 | 2 | 2 | barra-fixa, barra-fixa-supinada |
| Puxar horizontal | 5 | 5 | 5 | remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-kettlebell |
| Empurrar vertical | 3 | 3 | 3 | desenvolvimento, desenvolvimento-unilateral, desenvolvimento-unilateral-kettlebell |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 3 | 3 | 3 | crucifixo-inverso, crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 2 | 2 | 2 | rosca-inclinada, rosca-scott-banco-inclinado |
| Tríceps acima da cabeça | 4 | 4 | 4 | triceps-frances-halter, triceps-elastico-acima, triceps-frances-kettlebell, triceps-frances-unilateral-halter |
| Tríceps (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | triceps-suspensao |
| Agachar | 4 (n2) | 4 (n2) | 4 (n2) | goblet, agachamento-halteres, bulgaro, goblet-kettlebell |
| Afundo | 4 | 4 | 4 | bulgaro, afundo, afundo-tras, afundo-kettlebell |
| Extensora | 3 (n2) | 3 (n2) | 3 (n2) | extensao-joelho-caneleira, extensao-joelho-elastico, extensao-joelho-mini-band |
| Flexão de joelho | 2 (n3) | 2 (n3) | 2 (n3) | flexao-bola, flexao-joelho-elastico |
| Dobrar o quadril | 4 | 4 | 4 | stiff, stiff-unilateral, stiff-kettlebell, stiff-unilateral-kettlebell |
| Extensão de quadril (glúteo) | 6 (n2) | 6 (n2) | 6 (n2) | ponte-gluteo, ponte-gluteo-halter, ponte-pes-bola, ponte-kettlebell, coice-elastico, coice-caneleira |
| Abdução de quadril | 5 (n2) | 5 (n2) | 5 (n2) | abducao-caneleira, abducao-mini-band, abducao-elastico, caminhada-lateral-mini-band, abducao-deitado-mini-band |
| Adução de quadril (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | aducao-caneleira |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 4 (n2) | 5 (n2) | 5 (n2) | elevacao-joelhos, abdominal-chao, abdominal-bola, roda-abdominal, abdominal-invertido |

### Condomínio com multifuncional (atalho: puxador e remada)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** | **1** | **1** | supino-inclinado |
| Crucifixo (peito alongado) | 2 | 2 | 2 | crucifixo-halteres, crucifixo-inclinado-halteres |
| Puxar vertical | **1** | **1** | **1** | puxada-frente |
| Puxar horizontal | 5 | 5 | 5 | remada-baixa-estacao, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | 2 | 2 | 2 | desenvolvimento, desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 3 | 3 | 3 | crucifixo-inverso, crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 2 | 2 | 2 | rosca-inclinada, rosca-scott-banco-inclinado |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-testa-halteres |
| Agachar | 3 (n2) | 3 (n2) | 3 (n2) | goblet, agachamento-halteres, bulgaro |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-bola |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 3 (n2) | 3 (n2) | 3 (n2) | ponte-gluteo, ponte-gluteo-halter, ponte-pes-bola |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 3 (n2) | 3 (n2) | 3 (n2) | abdominal-chao, abdominal-bola, abdominal-invertido |

### Condomínio + os "às vezes tem" e o multifuncional com todas as estações


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | 2 | 2 | 2 | supino-reto, supino-maquina |
| Empurrar inclinado | **1** | **1** | **1** | supino-inclinado |
| Crucifixo (peito alongado) | 3 | 3 | 3 | voador, crucifixo-halteres, crucifixo-inclinado-halteres |
| Puxar vertical | 3 | 3 | 3 | barra-fixa, barra-fixa-supinada, puxada-frente |
| Puxar horizontal | 6 | 6 | 6 | remada-baixa-estacao, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-kettlebell |
| Empurrar vertical | 3 | 3 | 3 | desenvolvimento, desenvolvimento-unilateral, desenvolvimento-unilateral-kettlebell |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 3 | 3 | 3 | crucifixo-inverso, crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 2 | 2 | 2 | rosca-inclinada, rosca-scott-banco-inclinado |
| Tríceps acima da cabeça | 4 | 4 | 4 | triceps-frances-halter, triceps-elastico-acima, triceps-frances-kettlebell, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 3 (n3) | 3 (n3) | 3 (n3) | flexao-fechada, triceps-testa-halteres, triceps-elastico-alto |
| Agachar | 4 (n2) | 4 (n2) | 4 (n2) | goblet, agachamento-halteres, bulgaro, goblet-kettlebell |
| Afundo | 4 | 4 | 4 | bulgaro, afundo, afundo-tras, afundo-kettlebell |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | 4 | 5 | 5 | terra-romeno-barra, stiff, stiff-unilateral, stiff-kettlebell, stiff-unilateral-kettlebell |
| Extensão de quadril (glúteo) | **1** | **1** | **1** | hip-thrust |
| Abdução de quadril | 5 (n2) | 5 (n2) | 5 (n2) | abducao-caneleira, abducao-mini-band, abducao-elastico, caminhada-lateral-mini-band, abducao-deitado-mini-band |
| Adução de quadril (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | aducao-caneleira |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 4 (n2) | 5 (n2) | 5 (n2) | elevacao-joelhos, abdominal-chao, abdominal-bola, roda-abdominal, abdominal-invertido |

### Academia do bairro sem polia (2º local do Bruno)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** | **1** | **1** | supino-inclinado |
| Crucifixo (peito alongado) | 2 | 2 | 2 | crucifixo-halteres, crucifixo-inclinado-halteres |
| Puxar vertical | 2 | 2 | 2 | barra-fixa, barra-fixa-supinada |
| Puxar horizontal | 4 | 4 | 4 | remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | 2 | 2 | 2 | desenvolvimento, desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 3 | 3 | 3 | crucifixo-inverso, crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 2 | 2 | 2 | rosca-inclinada, rosca-scott-banco-inclinado |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 (n3) | **1** (n2) | **1** (n2) | mergulho |
| Agachar | **1** | **1** | **1** | leg-press |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** | **1** | **1** | panturrilha-leg-press |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 4 (n2) | 4 (n2) | 4 (n2) | elevacao-joelhos, abdominal-chao, elevacao-joelhos-paralelas, abdominal-invertido |

### Prédio com polia dupla, halteres e banco regulável (o Bruno)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | 2 | 2 | 2 | supino-inclinado, supino-inclinado-polia |
| Crucifixo (peito alongado) | 4 | 4 | 4 | crucifixo-polia, crucifixo-halteres, crucifixo-polia-baixo, crucifixo-inclinado-halteres |
| Puxar vertical | 4 | 4 | 4 | barra-fixa, barra-fixa-supinada, puxada-barra-reta, puxada-unilateral |
| Puxar horizontal | 6 | 6 | 6 | remada-baixa, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-polia |
| Empurrar vertical | 2 | 2 | 2 | desenvolvimento, desenvolvimento-unilateral |
| Elevação lateral | 2 | 2 | 2 | elevacao-halteres, elevacao-lateral |
| Ombro posterior | 5 | 5 | 5 | crucifixo-inverso, face-pull, crucifixo-invertido-curvado, crucifixo-invertido-polia, crucifixo-invertido-sentado |
| Bíceps | 3 | 3 | 3 | rosca-inclinada, rosca-polia-costas, rosca-scott-banco-inclinado |
| Tríceps acima da cabeça | 5 | 5 | 5 | triceps-frances, triceps-frances-halter, triceps-elastico-acima, triceps-frances-polia-unilateral, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 | 2 | 2 | triceps-corda, triceps-barra-reta |
| Agachar | 3 (n2) | 3 (n2) | 3 (n2) | goblet, agachamento-halteres, bulgaro |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-elastico |
| Flexão de joelho | 2 (n3) | 2 (n3) | 2 (n3) | flexao-bola, flexao-joelho-elastico |
| Dobrar o quadril | 2 | 3 | 3 | terra-romeno-barra, stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | **1** | **1** | **1** | hip-thrust |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-elastico |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 2 | 2 | 2 | abdominal-polia, abdominal-declinado |

### Elásticos e barra fixa de porta (o Diego)
Mesmo programa: Barra fixa de porta + elásticos (3 intensidades).

| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | 2 | 2 | 2 | barra-fixa, barra-fixa-supinada |
| Puxar horizontal | 3 (n3) | 3 (n3) | 3 (n3) | remada-elastico, remada-curvada-elastico, remada-unilateral-elastico |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | desenvolvimento-elastico |
| Elevação lateral | 2 (n4) | 2 (n4) | 2 (n4) | elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico |
| Ombro posterior | 2 (n2) | 2 (n2) | 2 (n2) | face-pull-elastico, abertura-elastico |
| Bíceps | 2 (n3) | 2 (n3) | 2 (n3) | rosca-elastico, rosca-martelo-elastico |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-elastico-acima |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-elastico-alto |
| Agachar | 2 (n3) | 2 (n3) | 2 (n3) | agachamento-elastico, agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-elastico |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | **1** (n3) | **1** (n3) | **1** (n3) | stiff-elastico |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, coice-elastico |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-elastico |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 3 (n2) | 3 (n2) | 3 (n2) | elevacao-joelhos, abdominal-chao, abdominal-invertido |

### Só elásticos
Mesmo programa: Só elásticos (faixas ou tubos).

| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | **1** (n3) | **1** (n3) | **1** (n3) | puxada-elastico |
| Puxar horizontal | 3 (n3) | 3 (n3) | 3 (n3) | remada-elastico, remada-curvada-elastico, remada-unilateral-elastico |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | desenvolvimento-elastico |
| Elevação lateral | 2 (n4) | 2 (n4) | 2 (n4) | elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico |
| Ombro posterior | 2 (n2) | 2 (n2) | 2 (n2) | face-pull-elastico, abertura-elastico |
| Bíceps | 2 (n3) | 2 (n3) | 2 (n3) | rosca-elastico, rosca-martelo-elastico |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-elastico-acima |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-elastico-alto |
| Agachar | 2 (n3) | 2 (n3) | 2 (n3) | agachamento-elastico, agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-elastico |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | **1** (n3) | **1** (n3) | **1** (n3) | stiff-elastico |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, coice-elastico |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-elastico |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só halteres (2 a 20 kg), sem banco


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 3 (n2) | 3 (n2) | 3 (n2) | rosca-alternada, rosca-martelo, rosca-concentrada |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-testa-halteres |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Halteres de 1 a 12 kg e banco reto (a Ana)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** (n2) | **1** (n2) | **1** (n2) | supino-reto |
| Crucifixo (peito alongado) | **1** | **1** | **1** | crucifixo-halteres |
| Puxar vertical | 3 (n2) | 3 (n2) | 3 (n2) | remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 3 | 3 | 3 | remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 3 (n2) | 3 (n2) | 3 (n2) | rosca-alternada, rosca-martelo, rosca-concentrada |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-testa-halteres |
| Agachar | 3 (n2) | 3 (n2) | 3 (n2) | goblet, agachamento-halteres, bulgaro |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Nada marcado (só o peso do corpo)
Mesmo programa: Só polia simples; Só banco regulável (inclina); Só banco reto; Só corda para polia; Só triângulo para polia; Só barra reta para polia; Só estribo (pegador de uma mão); Só tornozeleira para polia; Só esteira; Só banco scott.

| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Banco reto + halteres leves (2 a 6 kg)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** (n2) | **1** (n2) | **1** (n2) | supino-reto |
| Crucifixo (peito alongado) | **1** | **1** | **1** | crucifixo-halteres |
| Puxar vertical | 3 (n2) | 3 (n2) | 3 (n2) | remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 3 | 3 | 3 | remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 3 (n2) | 3 (n2) | 3 (n2) | rosca-alternada, rosca-martelo, rosca-concentrada |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-testa-halteres |
| Agachar | 3 (n2) | 3 (n2) | 3 (n2) | goblet, agachamento-halteres, bulgaro |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Halteres de 2 a 10 kg + bola suíça


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 3 (n2) | 3 (n2) | 3 (n2) | rosca-alternada, rosca-martelo, rosca-concentrada |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-testa-halteres |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-bola |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 3 (n2) | 3 (n2) | 3 (n2) | ponte-gluteo, ponte-gluteo-halter, ponte-pes-bola |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 3 (n2) | 3 (n2) | 3 (n2) | abdominal-chao, abdominal-bola, abdominal-invertido |

### Step + elásticos (3 intensidades)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | **1** (n3) | **1** (n3) | **1** (n3) | puxada-elastico |
| Puxar horizontal | 3 (n3) | 3 (n3) | 3 (n3) | remada-elastico, remada-curvada-elastico, remada-unilateral-elastico |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | desenvolvimento-elastico |
| Elevação lateral | 2 (n4) | 2 (n4) | 2 (n4) | elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico |
| Ombro posterior | 2 (n2) | 2 (n2) | 2 (n2) | face-pull-elastico, abertura-elastico |
| Bíceps | 2 (n3) | 2 (n3) | 2 (n3) | rosca-elastico, rosca-martelo-elastico |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-elastico-acima |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-elastico-alto |
| Agachar | 2 (n3) | 2 (n3) | 2 (n3) | agachamento-elastico, agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-elastico |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | **1** (n3) | **1** (n3) | **1** (n3) | stiff-elastico |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, coice-elastico |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-elastico |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Suspensão + elásticos (3 intensidades)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-suspensao |
| Puxar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | remada-suspensao |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | desenvolvimento-elastico |
| Elevação lateral | 2 (n4) | 2 (n4) | 2 (n4) | elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico |
| Ombro posterior | 4 (n2) | 4 (n2) | 4 (n2) | face-pull-elastico, yt-suspensao, abertura-elastico, face-pull-suspensao |
| Bíceps | **1** (n2) | **1** (n2) | **1** (n2) | rosca-suspensao |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-elastico-acima |
| Tríceps (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | triceps-suspensao |
| Agachar | 2 (n3) | 2 (n3) | 2 (n3) | agachamento-elastico, agachamento-peso-corpo |
| Afundo | 3 (n2) | 4 (n2) | 4 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, afundo-tras-peso-corpo |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-elastico |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | **1** (n3) | **1** (n3) | **1** (n3) | stiff-elastico |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, coice-elastico |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-elastico |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só máquina de abdominal


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** | **1** | **1** | abdominal-maquina |

### Só anilhas e manoplas para montar halteres


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 3 (n2) | 3 (n2) | 3 (n2) | rosca-alternada, rosca-martelo, rosca-concentrada |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-testa-halteres |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só banco romano (hiperextensão) ou ghd


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | **1** (n2) | **1** (n2) | **1** (n2) | hiperextensao |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, hiperextensao |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só barra fixa


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 | 2 | 2 | barra-fixa, barra-fixa-supinada |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 3 (n2) | 3 (n2) | 3 (n2) | elevacao-joelhos, abdominal-chao, abdominal-invertido |

### Só barra hexagonal (trap bar)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n2) | **1** (n2) | **1** (n2) | terra-hexagonal |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só barra longa (olímpica ou comum)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **1** (n2) | **1** (n2) | remada-barra |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | **1** | **1** | terra-romeno-barra |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só barra w


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **1** (n2) | **1** (n2) | **1** (n2) | rosca-barra-w |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só bola suíça


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-bola |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-pes-bola |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 3 (n2) | 3 (n2) | 3 (n2) | abdominal-chao, abdominal-bola, abdominal-invertido |

### Só cadeira abdutora e adutora (ou máquina de abdução em pé)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** | **1** | **1** | abducao-maquina |
| Adução de quadril (complemento) | **1** | **1** | **1** | aducao-maquina |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só cadeira extensora


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só cadeira flexora (sentada)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só caneleiras de peso


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **1** (n4) | **1** (n4) | **1** (n4) | elevacao-lateral-caneleira |
| Ombro posterior | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-invertido-caneleira |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-caneleira |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, coice-caneleira |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-caneleira |
| Adução de quadril (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | aducao-caneleira |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só desenvolvimento na máquina


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-maquina |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só estação de polia dupla (crossover) com altura regulável


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | 2 | 2 | 2 | crucifixo-polia, crucifixo-polia-baixo |
| Puxar vertical | **1** | **1** | **1** | puxada-unilateral |
| Puxar horizontal | **1** | **1** | **1** | remada-unilateral-polia |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **1** | **1** | **1** | elevacao-lateral |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-polia |
| Bíceps | **1** | **1** | **1** | rosca-polia-costas |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-polia-unilateral |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só puxador alto (estação de puxada)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** | **1** | **1** | puxada-frente |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só remada baixa (estação)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **1** | **1** | **1** | remada-baixa-estacao |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só glúteo na máquina


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** | **1** | **1** | coice-maquina |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só graviton (barra e mergulho assistidos)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | 2 (n2) | 3 (n2) | 3 (n2) | flexao, mergulho-graviton, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** | **1** | **1** | barra-fixa-graviton |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só hack ou agachamento pendular


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** | **1** | **1** | hack |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só halteres fixos


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-invertido-curvado, crucifixo-invertido-sentado |
| Bíceps | 3 (n2) | 3 (n2) | 3 (n2) | rosca-alternada, rosca-martelo, rosca-concentrada |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-frances-unilateral-halter |
| Tríceps (complemento) | 2 (n3) | 2 (n3) | 2 (n3) | flexao-fechada, triceps-testa-halteres |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-sentada-halter |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só kettlebell


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-unilateral-kettlebell |
| Puxar horizontal | **1** | **1** | **1** | remada-unilateral-kettlebell |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral-kettlebell |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **1** (n2) | **1** (n2) | **1** (n2) | rosca-kettlebell |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-kettlebell |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n2) | **1** (n2) | **1** (n2) | goblet-kettlebell |
| Afundo | **1** | **1** | **1** | afundo-kettlebell |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff-kettlebell, stiff-unilateral-kettlebell |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-kettlebell |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só leg press


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** | **1** | **1** | leg-press |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** | **1** | **1** | panturrilha-leg-press |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só mesa flexora (deitada)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n2) | **1** (n2) | **1** (n2) | mesa-flexora |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só mini-band (elástico curto em laço)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-mini-band |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | 3 (n2) | 3 (n2) | 3 (n2) | abducao-mini-band, caminhada-lateral-mini-band, abducao-deitado-mini-band |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só multifuncional (várias estações numa torre só)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** | **1** | **1** | puxada-frente |
| Puxar horizontal | **1** | **1** | **1** | remada-baixa-estacao |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só panturrilha em pé (máquina)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** | **1** | **1** | panturrilha-em-pe-maquina |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só panturrilha sentada (máquina)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **1** | **1** | **1** | panturrilha-sentada |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só paralelas


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 3 (n2) | 3 (n2) | flexao, mergulho, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n2) | **1** (n2) | mergulho |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 3 (n2) | 3 (n2) | 3 (n2) | abdominal-chao, elevacao-joelhos-paralelas, abdominal-invertido |

### Só rack ou gaiola de agachamento


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-invertida |
| Puxar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | remada-invertida |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só remada articulada


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **1** | **1** | **1** | remada-articulada |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só roda abdominal


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 3 (n2) | 3 (n2) | abdominal-chao, roda-abdominal, abdominal-invertido |

### Só máquina de rosca


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **1** | **1** | **1** | rosca-maquina |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só smith


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-invertida |
| Puxar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | remada-invertida |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** | **1** | **1** | agachamento-smith |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só step


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só supino na máquina ou articulado


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-maquina |
| Empurrar inclinado | **1** (n2) | **1** (n2) | **1** (n2) | supino-maquina |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só fitas de suspensão (trx) ou argolas


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-suspensao |
| Puxar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | remada-suspensao |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | 2 (n2) | 2 (n2) | 2 (n2) | yt-suspensao, face-pull-suspensao |
| Bíceps | **1** (n2) | **1** (n2) | **1** (n2) | rosca-suspensao |
| Tríceps acima da cabeça | **1** (n2) | **1** (n2) | **1** (n2) | triceps-suspensao |
| Tríceps (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | triceps-suspensao |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 4 (n2) | 4 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | 2 (n4) | 3 (n4) | 3 (n4) | flexao-joelho-deslizante, nordico, flexao-joelho-suspensao |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só máquina de tríceps


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** | **1** | **1** | triceps-maquina |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

### Só voador (peck deck)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, flexao-pes-elevados |
| Empurrar inclinado | **1** (n3) | 2 (n3) | 2 (n3) | flexao, flexao-pes-elevados |
| Crucifixo (peito alongado) | **1** | **1** | **1** | voador |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n4) | **1** (n4) | **1** (n4) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n3) | **1** (n3) | **1** (n3) | abertura-t-deitado |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **1** (n3) | **1** (n3) | **1** (n3) | extensao-triceps-peso-corpo |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 3 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, afundo-tras-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n3) | **1** (n3) | **1** (n3) | abducao-deitado |
| Adução de quadril (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | aducao-deitado |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-degrau |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-invertido |

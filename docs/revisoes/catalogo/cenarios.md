# Cenários: quantas opções cada vaga tem, por nível

> Gerado por `scripts/auditoria/catalogo.ts`. Vaga = função do gerador (`src/domain/gerador/funcoes.json`). Cada célula: opções equivalentes no nível da função que o gerador usa (`iniciante | intermediário | avançado`); `(n2)` = a função caiu para o 2º nível de preferência (o 1º não é possível); `→ x` = a vaga vazia recorre à função x; **0** = nenhuma opção; **1** = uma só (o gerador repete sempre o mesmo).
> 67 cenários em 55 classes (cenários que abrem os mesmos exercícios geram o mesmo programa).

## Resumo: vagas sem opção e vagas com uma opção só
| Cenário (e os que dão o mesmo) | Vagas com 0 (iniciante / avançado) | Vagas com 1 só (iniciante / avançado) | Vagas que só o intermediário+ abre |
|---|---:|---:|---|
| Academia completa (atalho) | 0 / 0 | 4 / 4 | — |
| Academia completa + kettlebell, elásticos, bola, suspensão, caneleiras, mini-band e roda (a Carla) | 0 / 0 | 4 / 4 | — |
| Casa com halteres e elásticos (atalho) | 4 / 4 | 10 / 10 | — |
| Casa + os "às vezes tem" (banco, barra fixa, kettlebell, suspensão, step, bola, caneleiras, mini-band, roda) | 1 / 1 | 8 / 8 | — |
| Condomínio com multifuncional (atalho: puxador e remada) | 4 / 4 | 10 / 10 | — |
| Condomínio + os "às vezes tem" e o multifuncional com todas as estações | 1 / 1 | 8 / 8 | — |
| Academia do bairro sem polia (2º local do Bruno) | 3 / 3 | 11 / 11 | — |
| Prédio com polia dupla, halteres e banco regulável (o Bruno) | 4 / 4 | 2 / 2 | — |
| Elásticos e barra fixa de porta (o Diego) (+ 1: barra-porta+elasticos) | 4 / 4 | 14 / 14 | — |
| Só elásticos (+ 1: so:elasticos) | 4 / 4 | 16 / 16 | — |
| Só halteres (2 a 20 kg), sem banco | 5 / 5 | 10 / 9 | — |
| Halteres de 1 a 12 kg e banco reto (a Ana) | 4 / 4 | 11 / 10 | — |
| Nada marcado (só o peso do corpo) (+ 10: so:polia_simples, so:banco_regulavel, so:banco_reto, so:acessorio_polia_corda, so:acessorio_polia_triangulo, so:acessorio_polia_barra_reta, so:acessorio_polia_estribo, so:acessorio_polia_tornozeleira, so:esteira, so:banco_scott) | 11 / 11 | 9 / 8 | — |
| Banco reto + halteres leves (2 a 6 kg) | 4 / 4 | 11 / 10 | — |
| Halteres de 2 a 10 kg + bola suíça | 5 / 5 | 9 / 9 | — |
| Step + elásticos (3 intensidades) | 4 / 4 | 15 / 15 | — |
| Suspensão + elásticos (3 intensidades) | 4 / 4 | 15 / 15 | — |
| Só máquina de abdominal | 11 / 11 | 9 / 8 | — |
| Só anilhas e manoplas para montar halteres | 5 / 5 | 10 / 9 | — |
| Só banco romano (hiperextensão) ou ghd | 11 / 11 | 9 / 8 | — |
| Só barra fixa | 10 / 10 | 8 / 7 | — |
| Só barra hexagonal (trap bar) | 11 / 11 | 9 / 8 | — |
| Só barra longa (olímpica ou comum) | 11 / 10 | 9 / 10 | puxar-horizontal, dobrar-quadril |
| Só barra w | 10 / 10 | 10 / 9 | — |
| Só bola suíça | 11 / 11 | 7 / 7 | — |
| Só cadeira abdutora e adutora (ou máquina de abdução em pé) | 9 / 9 | 11 / 10 | — |
| Só cadeira extensora | 10 / 10 | 10 / 9 | — |
| Só cadeira flexora (sentada) | 11 / 11 | 9 / 9 | — |
| Só caneleiras de peso | 8 / 8 | 12 / 11 | — |
| Só desenvolvimento na máquina | 11 / 11 | 9 / 8 | — |
| Só estação de polia dupla (crossover) com altura regulável | 4 / 4 | 14 / 13 | — |
| Só puxador alto (estação de puxada) | 10 / 10 | 10 / 9 | — |
| Só remada baixa (estação) | 10 / 10 | 10 / 9 | — |
| Só glúteo na máquina | 11 / 11 | 9 / 8 | — |
| Só graviton (barra e mergulho assistidos) | 10 / 10 | 9 / 8 | — |
| Só hack ou agachamento pendular | 11 / 11 | 9 / 8 | — |
| Só halteres fixos | 5 / 5 | 10 / 9 | — |
| Só kettlebell | 7 / 7 | 14 / 13 | — |
| Só leg press | 11 / 11 | 9 / 8 | — |
| Só mesa flexora (deitada) | 11 / 11 | 9 / 9 | — |
| Só mini-band (elástico curto em laço) | 10 / 10 | 10 / 9 | — |
| Só multifuncional (várias estações numa torre só) | 9 / 9 | 11 / 10 | — |
| Só panturrilha em pé (máquina) | 11 / 11 | 9 / 8 | — |
| Só panturrilha sentada (máquina) | 10 / 10 | 10 / 9 | — |
| Só paralelas | 11 / 11 | 8 / 6 | — |
| Só rack ou gaiola de agachamento | 9 / 9 | 11 / 10 | — |
| Só remada articulada | 10 / 10 | 10 / 9 | — |
| Só roda abdominal | 11 / 11 | 9 / 7 | — |
| Só máquina de rosca | 10 / 10 | 10 / 9 | — |
| Só smith | 9 / 9 | 11 / 10 | — |
| Só step | 11 / 11 | 8 / 7 | — |
| Só supino na máquina ou articulado | 11 / 11 | 9 / 8 | — |
| Só fitas de suspensão (trx) ou argolas | 7 / 7 | 12 / 12 | — |
| Só máquina de tríceps | 11 / 11 | 9 / 8 | — |
| Só voador (peck deck) | 10 / 10 | 10 / 9 | — |

## Vaga por vaga
### Academia completa (atalho)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | 3 | 4 | 4 | supino-reto, supino-barra, supino-maquina, supino-smith |
| Empurrar inclinado | 2 | 2 | 2 | supino-inclinado, supino-inclinado-polia |
| Crucifixo (peito alongado) | 4 | 4 | 4 | voador, crucifixo-polia, crucifixo-halteres, crucifixo-polia-baixo |
| Puxar vertical | 6 | 6 | 6 | barra-fixa, barra-fixa-supinada, puxada-frente, puxada-barra-reta, puxada-unilateral, barra-fixa-graviton |
| Puxar horizontal | 8 | 8 | 8 | remada-baixa, remada-baixa-estacao, remada-articulada, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-polia |
| Empurrar vertical | 3 | 4 | 4 | desenvolvimento, desenvolvimento-maquina, desenvolvimento-barra, desenvolvimento-unilateral |
| Elevação lateral | 2 | 2 | 2 | elevacao-halteres, elevacao-lateral |
| Ombro posterior | 4 | 4 | 4 | crucifixo-inverso, face-pull, crucifixo-invertido-curvado, crucifixo-invertido-polia |
| Bíceps | 4 | 4 | 4 | rosca-scott, rosca-inclinada, rosca-polia-costas, rosca-maquina |
| Tríceps acima da cabeça | 3 | 3 | 3 | triceps-frances, triceps-frances-halter, triceps-frances-polia-unilateral |
| Tríceps (complemento) | 3 | 3 | 3 | triceps-corda, triceps-barra-reta, triceps-maquina |
| Agachar | 3 | 4 | 4 | agachamento-barra, leg-press, hack, agachamento-smith |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | 2 | 3 | 3 | terra-romeno-barra, stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 | 2 | 2 | hip-thrust, coice-maquina |
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
| Crucifixo (peito alongado) | 4 | 4 | 4 | voador, crucifixo-polia, crucifixo-halteres, crucifixo-polia-baixo |
| Puxar vertical | 6 | 6 | 6 | barra-fixa, barra-fixa-supinada, puxada-frente, puxada-barra-reta, puxada-unilateral, barra-fixa-graviton |
| Puxar horizontal | 9 | 9 | 9 | remada-baixa, remada-baixa-estacao, remada-articulada, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-polia, remada-unilateral-kettlebell |
| Empurrar vertical | 4 | 5 | 5 | desenvolvimento, desenvolvimento-maquina, desenvolvimento-barra, desenvolvimento-unilateral, desenvolvimento-unilateral-kettlebell |
| Elevação lateral | 2 | 2 | 2 | elevacao-halteres, elevacao-lateral |
| Ombro posterior | 5 | 5 | 5 | voador-invertido, crucifixo-inverso, face-pull, crucifixo-invertido-curvado, crucifixo-invertido-polia |
| Bíceps | 4 | 4 | 4 | rosca-scott, rosca-inclinada, rosca-polia-costas, rosca-maquina |
| Tríceps acima da cabeça | 5 | 5 | 5 | triceps-frances, triceps-frances-halter, triceps-elastico-acima, triceps-frances-polia-unilateral, triceps-frances-kettlebell |
| Tríceps (complemento) | 3 | 3 | 3 | triceps-corda, triceps-barra-reta, triceps-maquina |
| Agachar | 3 | 4 | 4 | agachamento-barra, leg-press, hack, agachamento-smith |
| Afundo | 4 | 4 | 4 | bulgaro, afundo, afundo-tras, afundo-kettlebell |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | 3 | 4 | 4 | terra-romeno-barra, stiff, stiff-unilateral, stiff-kettlebell |
| Extensão de quadril (glúteo) | 2 | 2 | 2 | hip-thrust, coice-maquina |
| Abdução de quadril | 2 | 2 | 2 | abducao-maquina, abducao-polia |
| Adução de quadril (complemento) | **1** | **1** | **1** | aducao-maquina |
| Panturrilha em pé | 4 | 4 | 4 | panturrilha-em-pe-maquina, panturrilha-leg-press, panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **1** | **1** | **1** | panturrilha-sentada |
| Abdômen | 3 | 3 | 3 | abdominal-polia, abdominal-maquina, abdominal-declinado |

### Casa com halteres e elásticos (atalho)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-curvado |
| Bíceps | 2 (n2) | 2 (n2) | 2 (n2) | rosca-alternada, rosca-martelo |
| Tríceps acima da cabeça | 2 | 2 | 2 | triceps-frances-halter, triceps-elastico-acima |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Casa + os "às vezes tem" (banco, barra fixa, kettlebell, suspensão, step, bola, caneleiras, mini-band, roda)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** | **1** | **1** | supino-inclinado |
| Crucifixo (peito alongado) | **1** | **1** | **1** | crucifixo-halteres |
| Puxar vertical | 2 | 2 | 2 | barra-fixa, barra-fixa-supinada |
| Puxar horizontal | 5 | 5 | 5 | remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-kettlebell |
| Empurrar vertical | 3 | 3 | 3 | desenvolvimento, desenvolvimento-unilateral, desenvolvimento-unilateral-kettlebell |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-inverso, crucifixo-invertido-curvado |
| Bíceps | **1** | **1** | **1** | rosca-inclinada |
| Tríceps acima da cabeça | 3 | 3 | 3 | triceps-frances-halter, triceps-elastico-acima, triceps-frances-kettlebell |
| Tríceps (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | triceps-suspensao |
| Agachar | 4 (n2) | 4 (n2) | 4 (n2) | goblet, agachamento-halteres, bulgaro, goblet-kettlebell |
| Afundo | 4 | 4 | 4 | bulgaro, afundo, afundo-tras, afundo-kettlebell |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-caneleira |
| Flexão de joelho | 2 (n3) | 2 (n3) | 2 (n3) | flexao-bola, flexao-joelho-elastico |
| Dobrar o quadril | 3 | 3 | 3 | stiff, stiff-unilateral, stiff-kettlebell |
| Extensão de quadril (glúteo) | 4 (n2) | 4 (n2) | 4 (n2) | ponte-gluteo, ponte-gluteo-halter, ponte-pes-bola, ponte-kettlebell |
| Abdução de quadril | 2 (n2) | 2 (n2) | 2 (n2) | abducao-caneleira, abducao-mini-band |
| Adução de quadril (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | aducao-caneleira |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 3 (n2) | 4 (n2) | 4 (n2) | elevacao-joelhos, abdominal-chao, abdominal-bola, roda-abdominal |

### Condomínio com multifuncional (atalho: puxador e remada)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** | **1** | **1** | supino-inclinado |
| Crucifixo (peito alongado) | **1** | **1** | **1** | crucifixo-halteres |
| Puxar vertical | **1** | **1** | **1** | puxada-frente |
| Puxar horizontal | 5 | 5 | 5 | remada-baixa-estacao, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | 2 | 2 | 2 | desenvolvimento, desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-inverso, crucifixo-invertido-curvado |
| Bíceps | **1** | **1** | **1** | rosca-inclinada |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-halter |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 3 (n2) | 3 (n2) | 3 (n2) | goblet, agachamento-halteres, bulgaro |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-bola |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 3 (n2) | 3 (n2) | 3 (n2) | ponte-gluteo, ponte-gluteo-halter, ponte-pes-bola |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-bola |

### Condomínio + os "às vezes tem" e o multifuncional com todas as estações


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | 2 | 2 | 2 | supino-reto, supino-maquina |
| Empurrar inclinado | **1** | **1** | **1** | supino-inclinado |
| Crucifixo (peito alongado) | 2 | 2 | 2 | voador, crucifixo-halteres |
| Puxar vertical | 3 | 3 | 3 | barra-fixa, barra-fixa-supinada, puxada-frente |
| Puxar horizontal | 6 | 6 | 6 | remada-baixa-estacao, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-kettlebell |
| Empurrar vertical | 3 | 3 | 3 | desenvolvimento, desenvolvimento-unilateral, desenvolvimento-unilateral-kettlebell |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-inverso, crucifixo-invertido-curvado |
| Bíceps | **1** | **1** | **1** | rosca-inclinada |
| Tríceps acima da cabeça | 3 | 3 | 3 | triceps-frances-halter, triceps-elastico-acima, triceps-frances-kettlebell |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 4 (n2) | 4 (n2) | 4 (n2) | goblet, agachamento-halteres, bulgaro, goblet-kettlebell |
| Afundo | 4 | 4 | 4 | bulgaro, afundo, afundo-tras, afundo-kettlebell |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | 3 | 4 | 4 | terra-romeno-barra, stiff, stiff-unilateral, stiff-kettlebell |
| Extensão de quadril (glúteo) | **1** | **1** | **1** | hip-thrust |
| Abdução de quadril | 2 (n2) | 2 (n2) | 2 (n2) | abducao-caneleira, abducao-mini-band |
| Adução de quadril (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | aducao-caneleira |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 3 (n2) | 4 (n2) | 4 (n2) | elevacao-joelhos, abdominal-chao, abdominal-bola, roda-abdominal |

### Academia do bairro sem polia (2º local do Bruno)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** | **1** | **1** | supino-inclinado |
| Crucifixo (peito alongado) | **1** | **1** | **1** | crucifixo-halteres |
| Puxar vertical | 2 | 2 | 2 | barra-fixa, barra-fixa-supinada |
| Puxar horizontal | 4 | 4 | 4 | remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | 2 | 2 | 2 | desenvolvimento, desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | 2 | 2 | 2 | crucifixo-inverso, crucifixo-invertido-curvado |
| Bíceps | **1** | **1** | **1** | rosca-inclinada |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-halter |
| Tríceps (complemento) | **1** (n3) | **1** (n2) | **1** (n2) | mergulho |
| Agachar | **1** | **1** | **1** | leg-press |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** | **1** | **1** | panturrilha-leg-press |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 3 (n2) | 3 (n2) | 3 (n2) | elevacao-joelhos, abdominal-chao, elevacao-joelhos-paralelas |

### Prédio com polia dupla, halteres e banco regulável (o Bruno)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | 2 | 2 | 2 | supino-inclinado, supino-inclinado-polia |
| Crucifixo (peito alongado) | 3 | 3 | 3 | crucifixo-polia, crucifixo-halteres, crucifixo-polia-baixo |
| Puxar vertical | 4 | 4 | 4 | barra-fixa, barra-fixa-supinada, puxada-barra-reta, puxada-unilateral |
| Puxar horizontal | 6 | 6 | 6 | remada-baixa, remada-apoiada, remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco, remada-unilateral-polia |
| Empurrar vertical | 2 | 2 | 2 | desenvolvimento, desenvolvimento-unilateral |
| Elevação lateral | 2 | 2 | 2 | elevacao-halteres, elevacao-lateral |
| Ombro posterior | 4 | 4 | 4 | crucifixo-inverso, face-pull, crucifixo-invertido-curvado, crucifixo-invertido-polia |
| Bíceps | 2 | 2 | 2 | rosca-inclinada, rosca-polia-costas |
| Tríceps acima da cabeça | 4 | 4 | 4 | triceps-frances, triceps-frances-halter, triceps-elastico-acima, triceps-frances-polia-unilateral |
| Tríceps (complemento) | 2 | 2 | 2 | triceps-corda, triceps-barra-reta |
| Agachar | 3 (n2) | 3 (n2) | 3 (n2) | goblet, agachamento-halteres, bulgaro |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | 2 (n3) | 2 (n3) | 2 (n3) | flexao-bola, flexao-joelho-elastico |
| Dobrar o quadril | 2 | 3 | 3 | terra-romeno-barra, stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | **1** | **1** | **1** | hip-thrust |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 | 2 | 2 | abdominal-polia, abdominal-declinado |

### Elásticos e barra fixa de porta (o Diego)
Mesmo programa: Barra fixa de porta + elásticos (3 intensidades).

| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | 2 | 2 | 2 | barra-fixa, barra-fixa-supinada |
| Puxar horizontal | **1** (n3) | **1** (n3) | **1** (n3) | remada-elastico |
| Empurrar vertical | **1** (n2) | **1** (n2) | **1** (n2) | desenvolvimento-elastico |
| Elevação lateral | **1** (n2) | **1** (n2) | **1** (n2) | elevacao-lateral-elastico |
| Ombro posterior | **1** (n2) | **1** (n2) | **1** (n2) | face-pull-elastico |
| Bíceps | **1** (n3) | **1** (n3) | **1** (n3) | rosca-elastico |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-elastico-acima |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 2 (n3) | 2 (n3) | 2 (n3) | agachamento-elastico, agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | **1** (n3) | **1** (n3) | **1** (n3) | stiff-elastico |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | elevacao-joelhos, abdominal-chao |

### Só elásticos
Mesmo programa: Só elásticos (faixas ou tubos).

| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | **1** (n3) | **1** (n3) | **1** (n3) | puxada-elastico |
| Puxar horizontal | **1** (n3) | **1** (n3) | **1** (n3) | remada-elastico |
| Empurrar vertical | **1** (n2) | **1** (n2) | **1** (n2) | desenvolvimento-elastico |
| Elevação lateral | **1** (n2) | **1** (n2) | **1** (n2) | elevacao-lateral-elastico |
| Ombro posterior | **1** (n2) | **1** (n2) | **1** (n2) | face-pull-elastico |
| Bíceps | **1** (n3) | **1** (n3) | **1** (n3) | rosca-elastico |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-elastico-acima |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 2 (n3) | 2 (n3) | 2 (n3) | agachamento-elastico, agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | **1** (n3) | **1** (n3) | **1** (n3) | stiff-elastico |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só halteres (2 a 20 kg), sem banco


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-curvado |
| Bíceps | 2 (n2) | 2 (n2) | 2 (n2) | rosca-alternada, rosca-martelo |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-halter |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Halteres de 1 a 12 kg e banco reto (a Ana)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-halteres |
| Crucifixo (peito alongado) | **1** | **1** | **1** | crucifixo-halteres |
| Puxar vertical | 3 (n2) | 3 (n2) | 3 (n2) | remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 3 | 3 | 3 | remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-curvado |
| Bíceps | 2 (n2) | 2 (n2) | 2 (n2) | rosca-alternada, rosca-martelo |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-halter |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 3 (n2) | 3 (n2) | 3 (n2) | goblet, agachamento-halteres, bulgaro |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Nada marcado (só o peso do corpo)
Mesmo programa: Só polia simples; Só banco regulável (inclina); Só banco reto; Só corda para polia; Só triângulo para polia; Só barra reta para polia; Só estribo (pegador de uma mão); Só tornozeleira para polia; Só esteira; Só banco scott.

| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Banco reto + halteres leves (2 a 6 kg)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-reto |
| Empurrar inclinado | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-halteres |
| Crucifixo (peito alongado) | **1** | **1** | **1** | crucifixo-halteres |
| Puxar vertical | 3 (n2) | 3 (n2) | 3 (n2) | remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 3 | 3 | 3 | remada-unilateral-halter, remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-curvado |
| Bíceps | 2 (n2) | 2 (n2) | 2 (n2) | rosca-alternada, rosca-martelo |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-halter |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 3 (n2) | 3 (n2) | 3 (n2) | goblet, agachamento-halteres, bulgaro |
| Afundo | 3 | 3 | 3 | bulgaro, afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Halteres de 2 a 10 kg + bola suíça


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-curvado |
| Bíceps | 2 (n2) | 2 (n2) | 2 (n2) | rosca-alternada, rosca-martelo |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-halter |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-bola |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 3 (n2) | 3 (n2) | 3 (n2) | ponte-gluteo, ponte-gluteo-halter, ponte-pes-bola |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-bola |

### Step + elásticos (3 intensidades)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | **1** (n3) | **1** (n3) | **1** (n3) | puxada-elastico |
| Puxar horizontal | **1** (n3) | **1** (n3) | **1** (n3) | remada-elastico |
| Empurrar vertical | **1** (n2) | **1** (n2) | **1** (n2) | desenvolvimento-elastico |
| Elevação lateral | **1** (n2) | **1** (n2) | **1** (n2) | elevacao-lateral-elastico |
| Ombro posterior | **1** (n2) | **1** (n2) | **1** (n2) | face-pull-elastico |
| Bíceps | **1** (n3) | **1** (n3) | **1** (n3) | rosca-elastico |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-elastico-acima |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 2 (n3) | 2 (n3) | 2 (n3) | agachamento-elastico, agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | **1** (n3) | **1** (n3) | **1** (n3) | stiff-elastico |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Suspensão + elásticos (3 intensidades)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **1** (n2) | **1** (n2) | **1** (n2) | crucifixo-elastico |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-suspensao |
| Puxar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | remada-suspensao |
| Empurrar vertical | **1** (n2) | **1** (n2) | **1** (n2) | desenvolvimento-elastico |
| Elevação lateral | **1** (n2) | **1** (n2) | **1** (n2) | elevacao-lateral-elastico |
| Ombro posterior | 2 (n2) | 2 (n2) | 2 (n2) | face-pull-elastico, yt-suspensao |
| Bíceps | **1** (n2) | **1** (n2) | **1** (n2) | rosca-suspensao |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-elastico-acima |
| Tríceps (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | triceps-suspensao |
| Agachar | 2 (n3) | 2 (n3) | 2 (n3) | agachamento-elastico, agachamento-peso-corpo |
| Afundo | 2 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-joelho-elastico |
| Dobrar o quadril | **1** (n3) | **1** (n3) | **1** (n3) | stiff-elastico |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só máquina de abdominal


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** | **1** | **1** | abdominal-maquina |

### Só anilhas e manoplas para montar halteres


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-curvado |
| Bíceps | 2 (n2) | 2 (n2) | 2 (n2) | rosca-alternada, rosca-martelo |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-halter |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só banco romano (hiperextensão) ou ghd


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | **1** (n2) | **1** (n2) | **1** (n2) | hiperextensao |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, hiperextensao |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só barra fixa


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 | 2 | 2 | barra-fixa, barra-fixa-supinada |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | elevacao-joelhos, abdominal-chao |

### Só barra hexagonal (trap bar)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n2) | **1** (n2) | **1** (n2) | terra-hexagonal |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só barra longa (olímpica ou comum)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **1** (n2) | **1** (n2) | remada-barra |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | **1** | **1** | terra-romeno-barra |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só barra w


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **1** (n2) | **1** (n2) | **1** (n2) | rosca-barra-w |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só bola suíça


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n3) | **1** (n3) | **1** (n3) | flexao-bola |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-pes-bola |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, abdominal-bola |

### Só cadeira abdutora e adutora (ou máquina de abdução em pé)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** | **1** | **1** | abducao-maquina |
| Adução de quadril (complemento) | **1** | **1** | **1** | aducao-maquina |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só cadeira extensora


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **1** | **1** | **1** | cadeira-extensora |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só cadeira flexora (sentada)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** | **1** | **1** | cadeira-flexora |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só caneleiras de peso


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **1** (n2) | **1** (n2) | **1** (n2) | extensao-joelho-caneleira |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-caneleira |
| Adução de quadril (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | aducao-caneleira |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só desenvolvimento na máquina


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-maquina |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só estação de polia dupla (crossover) com altura regulável


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | 2 (n2) | 2 (n2) | 2 (n2) | crucifixo-polia, crucifixo-polia-baixo |
| Crucifixo (peito alongado) | 2 | 2 | 2 | crucifixo-polia, crucifixo-polia-baixo |
| Puxar vertical | **1** | **1** | **1** | puxada-unilateral |
| Puxar horizontal | **1** | **1** | **1** | remada-unilateral-polia |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **1** | **1** | **1** | elevacao-lateral |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-polia |
| Bíceps | **1** | **1** | **1** | rosca-polia-costas |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-polia-unilateral |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só puxador alto (estação de puxada)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** | **1** | **1** | puxada-frente |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só remada baixa (estação)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **1** | **1** | **1** | remada-baixa-estacao |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só glúteo na máquina


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** | **1** | **1** | coice-maquina |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só graviton (barra e mergulho assistidos)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | 2 (n2) | 2 (n2) | 2 (n2) | flexao, mergulho-graviton |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** | **1** | **1** | barra-fixa-graviton |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só hack ou agachamento pendular


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** | **1** | **1** | hack |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só halteres fixos


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | 2 (n2) | 2 (n2) | 2 (n2) | remada-curvada-halteres, remada-unilateral-sem-banco |
| Puxar horizontal | 2 | 2 | 2 | remada-curvada-halteres, remada-unilateral-sem-banco |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral |
| Elevação lateral | **1** | **1** | **1** | elevacao-halteres |
| Ombro posterior | **1** | **1** | **1** | crucifixo-invertido-curvado |
| Bíceps | 2 (n2) | 2 (n2) | 2 (n2) | rosca-alternada, rosca-martelo |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-halter |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | 2 (n2) | 2 (n2) | 2 (n2) | goblet, agachamento-halteres |
| Afundo | 2 | 2 | 2 | afundo, afundo-tras |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | 2 | 2 | 2 | stiff, stiff-unilateral |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-gluteo-halter |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só kettlebell


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-unilateral-kettlebell |
| Puxar horizontal | **1** | **1** | **1** | remada-unilateral-kettlebell |
| Empurrar vertical | **1** | **1** | **1** | desenvolvimento-unilateral-kettlebell |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **1** (n2) | **1** (n2) | **1** (n2) | rosca-kettlebell |
| Tríceps acima da cabeça | **1** | **1** | **1** | triceps-frances-kettlebell |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n2) | **1** (n2) | **1** (n2) | goblet-kettlebell |
| Afundo | **1** | **1** | **1** | afundo-kettlebell |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | **1** | **1** | **1** | stiff-kettlebell |
| Extensão de quadril (glúteo) | 2 (n2) | 2 (n2) | 2 (n2) | ponte-gluteo, ponte-kettlebell |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só leg press


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** | **1** | **1** | leg-press |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** | **1** | **1** | panturrilha-leg-press |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só mesa flexora (deitada)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n2) | **1** (n2) | **1** (n2) | mesa-flexora |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só mini-band (elástico curto em laço)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **1** (n2) | **1** (n2) | **1** (n2) | abducao-mini-band |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só multifuncional (várias estações numa torre só)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** | **1** | **1** | puxada-frente |
| Puxar horizontal | **1** | **1** | **1** | remada-baixa-estacao |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só panturrilha em pé (máquina)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** | **1** | **1** | panturrilha-em-pe-maquina |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só panturrilha sentada (máquina)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **1** | **1** | **1** | panturrilha-sentada |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só paralelas


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | 2 (n2) | 2 (n2) | flexao, mergulho |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n2) | **1** (n2) | mergulho |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | 2 (n2) | 2 (n2) | 2 (n2) | abdominal-chao, elevacao-joelhos-paralelas |

### Só rack ou gaiola de agachamento


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-invertida |
| Puxar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | remada-invertida |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só remada articulada


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **1** | **1** | **1** | remada-articulada |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só roda abdominal


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | 2 (n2) | 2 (n2) | abdominal-chao, roda-abdominal |

### Só máquina de rosca


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **1** | **1** | **1** | rosca-maquina |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só smith


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-invertida |
| Puxar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | remada-invertida |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** | **1** | **1** | agachamento-smith |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só step


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | 2 | 2 | 2 | panturrilha, panturrilha-bilateral-step |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só supino na máquina ou articulado


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** | **1** | **1** | supino-maquina |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só fitas de suspensão (trx) ou argolas


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **1** (n2) | **1** (n2) | **1** (n2) | remada-suspensao |
| Puxar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | remada-suspensao |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **1** (n2) | **1** (n2) | **1** (n2) | yt-suspensao |
| Bíceps | **1** (n2) | **1** (n2) | **1** (n2) | rosca-suspensao |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n2) | **1** (n2) | **1** (n2) | triceps-suspensao |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 3 (n2) | 3 (n2) | afundo-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | 2 (n4) | 3 (n4) | 3 (n4) | flexao-joelho-deslizante, nordico, flexao-joelho-suspensao |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só máquina de tríceps


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n3) | **1** (n3) | **1** (n3) | flexao |
| Crucifixo (peito alongado) | **0** | **0** | **0** | — |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** | **1** | **1** | triceps-maquina |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

### Só voador (peck deck)


| Vaga | iniciante | intermediário | avançado | opções (avançado) |
|---|---:|---:|---:|---|
| Empurrar horizontal | **1** (n2) | **1** (n2) | **1** (n2) | flexao |
| Empurrar inclinado | **1** (n2) | **1** (n2) | **1** (n2) | voador |
| Crucifixo (peito alongado) | **1** | **1** | **1** | voador |
| Puxar vertical | **0** | **0** | **0** | — |
| Puxar horizontal | **0** | **0** | **0** | — |
| Empurrar vertical | **1** (n3) | **1** (n3) | **1** (n3) | pike |
| Elevação lateral | **0** | **0** | **0** | — |
| Ombro posterior | **0** | **0** | **0** | — |
| Bíceps | **0** | **0** | **0** | — |
| Tríceps acima da cabeça | **0** | **0** | **0** | — |
| Tríceps (complemento) | **1** (n3) | **1** (n3) | **1** (n3) | flexao-fechada |
| Agachar | **1** (n3) | **1** (n3) | **1** (n3) | agachamento-peso-corpo |
| Afundo | 2 (n2) | 2 (n2) | 2 (n2) | afundo-peso-corpo, bulgaro-peso-corpo |
| Extensora | **0** | **0** | **0** | — |
| Flexão de joelho | **1** (n4) | 2 (n4) | 2 (n4) | flexao-joelho-deslizante, nordico |
| Dobrar o quadril | → flexao-joelho | → flexao-joelho | → flexao-joelho | — |
| Extensão de quadril (glúteo) | **1** (n2) | **1** (n2) | **1** (n2) | ponte-gluteo |
| Abdução de quadril | **0** | **0** | **0** | — |
| Adução de quadril (complemento) | **0** | **0** | **0** | — |
| Panturrilha em pé | **1** (n2) | **1** (n2) | **1** (n2) | panturrilha-chao |
| Panturrilha sentada (complemento) | **0** | **0** | **0** | — |
| Abdômen | **1** (n2) | **1** (n2) | **1** (n2) | abdominal-chao |

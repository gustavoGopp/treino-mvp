# Fila dos exercícios sem animação (para a decisão do Gustavo)

> Montada em 04/11/2026 a partir do inventário regravado com os 135 exercícios (`docs/revisoes/auditoria/inventario.md`: "vaga" = vezes prescrito nos 149.760 programas do estresse; "alternativa" = vezes oferecido como troca) e do custo de animação da `docs/pesquisa-v2/08-equipamentos-v2.md`, seção 6 (P = variação de pose = 1; M = acessório simples = 2; peça nova = +6 na primeira animação da família). Meta: "que todos os treinos tenham animação". Ordem proposta dos blocos: pela frequência somada dividida pelo custo. Dentro de cada bloco, do mais prescrito ao menos.

**Resumo**

| Bloco | O que é | Exercícios | Vagas (soma) | Alternativas (soma) | Custo | Vagas por unidade de custo |
|---|---|---:|---:|---:|---|---:|
| A | Só halter e banco: variação de pose, nada novo no motor | 11 | 321.974 | 788.350 | P (1 cada) (≈11) | 29.270 |
| B | Polia: acessórios pequenos (tornozeleira, barra reta, estribo, corda) | 9 | 40.188 | 300.030 | P a M (1–2 cada); nenhuma peça nova grande (≈14) | 2.871 |
| C | Máquinas de perna e smith: peça nova (cadeira com alavanca; carrinho do smith) | 13 | 227.780 | 199.774 | +6 na 1ª, depois 2 cada (≈32) | 7.118 |
| D | Barra longa, anilhas e rack: peça nova | 10 | 74.060 | 266.712 | +6 na 1ª, depois 2 cada (≈26) | 2.848 |
| E | Estações, máquinas de tronco e bancos especiais: peça nova por aparelho | 14 | 89.817 | 388.371 | +6 na 1ª de cada aparelho (≈76) | 1.182 |
| F | Elástico longo: esperam o R4 do boneco (decisão do Gustavo, 04/11) | 12 | 311.366 | 933.169 | peça `band` pronta; 12 folhas (≈24) | 12.974 |
| R | Famílias novas, já em revisão nesta sessão (folhas prontas, esperando o 'aprovar') | 14 | 67.726 | 404.265 | feito (≈0) | — |

**Leitura.** O bloco A é o que mais rende por unidade de custo: 11 exercícios, nenhuma peça nova, e a ponte com halter sozinha é prescrita 113 mil vezes. O bloco C (máquinas de perna) pede a peça nova mais cara, mas cobre a cadeira flexora e a extensora, que juntas passam de 112 mil prescrições. O bloco E é caro por aparelho (cada máquina é uma peça) e rende pouco por unidade, salvo o puxador alto (30,7 mil). Os blocos F e R não entram na conta: o F espera o R4 e o R já está em revisão.

**Pendências que entram no custo:** 21 exercícios não têm ficha nem cartão (marcados em cada linha); cada um pede a ficha (`docs/pesquisa/animacoes/<id>.md`) e o cartão (`src/conteudo/exercicios/<id>.json`) antes da pose. O `agachamento-barra` tem ficha e não tem cartão (exceção conhecida). Ao animar um id dos 29 do R0c, o teste `tests/unit/dados-dominio.test.ts` ("sem animação") muda; ao animar o hack ou a ponte com halter, o e2e `tests/e2e/onboarding.spec.ts` muda (hoje eles aparecem como cartão).

**Decisões pedidas ao Gustavo:** (1) a ordem dos blocos (proposta: A, C, B, D, E); (2) até onde ir nesta sessão; (3) se os 12 do elástico continuam esperando o R4.

## Bloco A: Só halter e banco: variação de pose, nada novo no motor

Custo: P (1 cada).

| # | Exercício | Vaga | Alternativa | Carga | Equipamento | Ponto de partida / peça |
|---:|---|---:|---:|---|---|---|
| 1 | Ponte de glúteo com halter `ponte-gluteo-halter` | 113.244 | 79.505 | halter | halteres | da ponte de glúteo aprovada, com o halter no quadril |
| 2 | Crucifixo com halteres no banco plano `crucifixo-halteres` | 74.526 | 86.254 | halter | halteres + banco | do supino reto aprovado, braços abrindo |
| 3 | Crucifixo inverso com halteres, peito apoiado no banco inclinado `crucifixo-inverso` | 46.436 | 28.163 | halter | halteres + banco que inclina | do crucifixo invertido na polia, peito no banco inclinado |
| 4 | Crucifixo invertido curvado com halteres `crucifixo-invertido-curvado` | 29.789 | 43.587 | halter | halteres | do crucifixo invertido na polia, tronco curvado |
| 5 | Remada curvada com halteres `remada-curvada-halteres` | 17.664 | 139.536 | halter | halteres | da remada unilateral sem banco, dois halteres |
| 6 | Afundo para trás alternado `afundo-tras` | 16.812 | 96.670 | halter | halteres | do afundo aprovado, passo para trás; sem ficha nem cartão |
| 7 | Desenvolvimento unilateral com halter, em pé `desenvolvimento-unilateral` | 13.592 | 21.054 | halter | halteres | do desenvolvimento unilateral com kettlebell, halter; sem ficha nem cartão |
| 8 | Agachamento com 2 halteres ao lado do corpo `agachamento-halteres` | 3.863 | 98.403 | halter | halteres | do goblet aprovado, halteres ao lado; sem ficha nem cartão |
| 9 | Mergulho nas paralelas `mergulho` | 3.338 | 35.908 | peso-corpo | paralelas | da elevação de joelhos nas paralelas em revisão, com a peça paralelas |
| 10 | Supino no chão com halteres `supino-chao-halteres` | 2.710 | 130.400 | halter | halteres | do supino reto, deitado no chão |
| 11 | Agachamento goblet com kettlebell `goblet-kettlebell` | 0 | 28.870 | kettlebell | kettlebell | do goblet aprovado, com a peça kettlebell |

## Bloco B: Polia: acessórios pequenos (tornozeleira, barra reta, estribo, corda)

Custo: P a M (1–2 cada); nenhuma peça nova grande.

| # | Exercício | Vaga | Alternativa | Carga | Equipamento | Ponto de partida / peça |
|---:|---|---:|---:|---|---|---|
| 1 | Puxada ajoelhado na polia alta com barra reta `puxada-barra-reta` | 17.280 | 25.200 | polia | polia alta + barra reta para polia | da puxada unilateral, barra reta nas duas mãos; sem ficha nem cartão |
| 2 | Tríceps na polia com barra reta `triceps-barra-reta` | 7.947 | 23.720 | polia | polia alta + barra reta para polia | do tríceps na corda, com a barra reta; sem ficha nem cartão |
| 3 | Rosca na polia baixa, de costas para a torre `rosca-polia-costas` | 4.946 | 33.312 | polia | polia baixa + estribo para polia | da rosca na polia, de costas; sem ficha nem cartão |
| 4 | Abdução na polia com tornozeleira `abducao-polia` | 3.638 | 12.084 | polia | polia baixa + tornozeleira para polia | pose nova de pé com a tornozeleira |
| 5 | Supino inclinado na polia, com o banco entre as torres `supino-inclinado-polia` | 3.390 | 23.295 | polia | polia dupla + banco que inclina | do supino inclinado, cabos da polia dupla; sem ficha nem cartão |
| 6 | Crucifixo na polia de baixo para cima `crucifixo-polia-baixo` | 2.350 | 59.982 | polia | polia dupla | do crucifixo na polia, polias embaixo; sem ficha nem cartão |
| 7 | Pull-through na polia baixa com corda `pull-through` | 325 | 55.505 | polia | polia baixa + corda para polia | do stiff, corda entre as pernas; sem ficha nem cartão |
| 8 | Coice na polia com tornozeleira `coice-polia` | 312 | 31.592 | polia | polia baixa + tornozeleira para polia | pose nova de pé com a tornozeleira |
| 9 | Supino na polia com o banco plano entre as torres `supino-polia` | 0 | 35.340 | polia | polia dupla + banco | do supino reto, cabos da polia dupla; sem ficha nem cartão |

## Bloco C: Máquinas de perna e smith: peça nova (cadeira com alavanca; carrinho do smith)

Custo: +6 na 1ª, depois 2 cada.

| # | Exercício | Vaga | Alternativa | Carga | Equipamento | Ponto de partida / peça |
|---:|---|---:|---:|---|---|---|
| 1 | Flexão de joelho na cadeira flexora (sentado) `cadeira-flexora` | 66.987 | 17.685 | maquina | cadeira flexora | cadeira com alavanca |
| 2 | Cadeira extensora `cadeira-extensora` | 45.730 | 0 | maquina | cadeira extensora | cadeira com alavanca |
| 3 | Panturrilha no leg press `panturrilha-leg-press` | 21.676 | 31.929 | anilha | leg press | leg press; sem ficha nem cartão |
| 4 | Coice na máquina de glúteo `coice-maquina` | 21.284 | 19.154 | maquina | máquina de glúteo | máquina de glúteo |
| 5 | Adução na cadeira adutora `aducao-maquina` | 18.453 | 0 | maquina | cadeira adutora | cadeira adutora |
| 6 | Abdução na cadeira abdutora `abducao-maquina` | 12.084 | 3.638 | maquina | cadeira abdutora | cadeira abdutora |
| 7 | Panturrilha sentada na máquina `panturrilha-sentada` | 10.950 | 0 | anilha | máquina de panturrilha sentada | máquina sentada |
| 8 | Leg press `leg-press` | 9.726 | 19.230 | anilha | leg press | leg press; sem ficha nem cartão |
| 9 | Panturrilha em pé na máquina `panturrilha-em-pe-maquina` | 8.482 | 26.152 | maquina | máquina de panturrilha em pé | máquina em pé |
| 10 | Agachamento no smith `agachamento-smith` | 5.600 | 10.074 | anilha | smith | smith |
| 11 | Agachamento no hack `hack` | 3.340 | 15.454 | anilha | hack | hack |
| 12 | Mesa flexora (deitado) `mesa-flexora` | 3.068 | 33.298 | maquina | mesa flexora | mesa flexora; sem ficha nem cartão |
| 13 | Supino reto no smith `supino-smith` | 400 | 23.160 | anilha | smith + banco | smith + banco |

## Bloco D: Barra longa, anilhas e rack: peça nova

Custo: +6 na 1ª, depois 2 cada.

| # | Exercício | Vaga | Alternativa | Carga | Equipamento | Ponto de partida / peça |
|---:|---|---:|---:|---|---|---|
| 1 | Hip thrust `hip-thrust` | 43.913 | 32.865 | barra | barra longa + banco ou smith + banco | barra no quadril, costas no banco |
| 2 | Agachamento livre com barra (profundo) `agachamento-barra` | 9.600 | 814 | barra | barra longa + rack de agachamento | barra nas costas, rack; tem ficha, sem cartão |
| 3 | Rosca Scott `rosca-scott` | 7.742 | 32.159 | barra | banco Scott + barra W ou banco Scott + halteres | banco Scott + barra W |
| 4 | Supino reto com barra `supino-barra` | 5.700 | 10.400 | barra | barra longa + banco + rack de agachamento | barra + banco + rack; sem ficha nem cartão |
| 5 | Levantamento terra romeno com barra `terra-romeno-barra` | 4.438 | 39.682 | barra | barra longa | barra; sem ficha nem cartão |
| 6 | Rosca com barra W `rosca-barra-w` | 1.839 | 59.262 | barra | barra W | barra W; sem ficha nem cartão |
| 7 | Desenvolvimento em pé com barra `desenvolvimento-barra` | 828 | 3.680 | barra | barra longa + rack de agachamento | barra + rack; sem ficha nem cartão |
| 8 | Remada curvada com barra `remada-barra` | 0 | 19.776 | barra | barra longa | barra; sem ficha nem cartão |
| 9 | Levantamento terra com barra hexagonal `terra-hexagonal` | 0 | 15.674 | barra | barra hexagonal | barra hexagonal |
| 10 | Remada invertida `remada-invertida` | 0 | 52.400 | peso-corpo | rack ou smith | barra no rack ou smith; sem ficha nem cartão |

## Bloco E: Estações, máquinas de tronco e bancos especiais: peça nova por aparelho

Custo: +6 na 1ª de cada aparelho.

| # | Exercício | Vaga | Alternativa | Carga | Equipamento | Ponto de partida / peça |
|---:|---|---:|---:|---|---|---|
| 1 | Puxada pela frente no puxador `puxada-frente` | 30.720 | 37.840 | maquina | puxador alto | puxador alto |
| 2 | Abdominal na máquina `abdominal-maquina` | 20.181 | 13.849 | maquina | máquina de abdominal | máquina de abdominal |
| 3 | Rosca na máquina `rosca-maquina` | 16.928 | 22.973 | maquina | máquina de rosca | máquina de rosca |
| 4 | Supino sentado na máquina `supino-maquina` | 7.040 | 28.300 | maquina | supino na máquina | supino na máquina |
| 5 | Voador (peck deck) `voador` | 6.715 | 55.638 | maquina | voador | voador |
| 6 | Remada articulada `remada-articulada` | 3.392 | 20.688 | maquina | remada articulada | remada articulada |
| 7 | Desenvolvimento na máquina `desenvolvimento-maquina` | 2.184 | 9.746 | maquina | máquina de desenvolvimento | máquina de desenvolvimento |
| 8 | Voador invertido `voador-invertido` | 1.401 | 8.997 | maquina | voador que inverte | voador que inverte |
| 9 | Tríceps na máquina `triceps-maquina` | 1.016 | 20.074 | maquina | máquina de tríceps | máquina de tríceps |
| 10 | Remada baixa na estação `remada-baixa-estacao` | 240 | 28.656 | maquina | estação de remada baixa | estação de remada baixa |
| 11 | Hiperextensão no banco romano `hiperextensao` | 0 | 54.912 | peso-corpo | banco romano | banco romano |
| 12 | Barra fixa assistida no graviton `barra-fixa-graviton` | 0 | 28.320 | assistida | graviton | graviton |
| 13 | Mergulho assistido no graviton `mergulho-graviton` | 0 | 23.560 | assistida | graviton | graviton |
| 14 | Abdominal no banco declinado `abdominal-declinado` | 0 | 34.818 | peso-corpo | banco que declina | banco que declina; sem ficha nem cartão |

## Bloco F: Elástico longo: esperam o R4 do boneco (decisão do Gustavo, 04/11)

Custo: peça `band` pronta; 12 folhas.

| # | Exercício | Vaga | Alternativa | Carga | Equipamento | Ponto de partida / peça |
|---:|---|---:|---:|---|---|---|
| 1 | Flexão de joelho com elástico `flexao-joelho-elastico` | 63.661 | 63.060 | elastico | elásticos |  |
| 2 | Rosca com elástico `rosca-elastico` | 39.966 | 103.614 | elastico | elásticos |  |
| 3 | Elevação lateral com elástico `elevacao-lateral-elastico` | 35.068 | 88.182 | elastico | elásticos |  |
| 4 | Crucifixo com elástico `crucifixo-elastico` | 33.477 | 79.402 | elastico | elásticos |  |
| 5 | Stiff com elástico `stiff-elastico` | 29.812 | 83.983 | elastico | elásticos |  |
| 6 | Remada sentada com elástico `remada-elastico` | 28.896 | 78.040 | elastico | elásticos | folha em revisão desde 04/11 |
| 7 | Abertura com elástico na altura do rosto `face-pull-elastico` | 25.980 | 49.895 | elastico | elásticos |  |
| 8 | Puxada com elástico ancorado no alto `puxada-elastico` | 19.824 | 86.520 | elastico | elásticos |  |
| 9 | Tríceps acima da cabeça com elástico `triceps-elastico-acima` | 15.220 | 68.688 | elastico | elásticos |  |
| 10 | Desenvolvimento com elástico `desenvolvimento-elastico` | 14.184 | 28.225 | elastico | elásticos |  |
| 11 | Agachamento com elástico `agachamento-elastico` | 2.758 | 92.045 | elastico | elásticos |  |
| 12 | Flexão de braço com elástico `flexao-elastico` | 2.520 | 111.515 | elastico | elásticos |  |

## Bloco R: Famílias novas, já em revisão nesta sessão (folhas prontas, esperando o 'aprovar')

Custo: feito.

| # | Exercício | Vaga | Alternativa | Carga | Equipamento | Ponto de partida / peça |
|---:|---|---:|---:|---|---|---|
| 1 | Adução de quadril deitado de lado com caneleira `aducao-caneleira` | 20.083 | 9.228 | caneleira | caneleiras de peso |  |
| 2 | Abdominal na bola suíça `abdominal-bola` | 16.660 | 70.251 | peso-corpo | bola suíça |  |
| 3 | Abdução de quadril deitado de lado com caneleira `abducao-caneleira` | 12.730 | 7.188 | caneleira | caneleiras de peso |  |
| 4 | Extensão de joelho sentado com caneleira `extensao-joelho-caneleira` | 11.213 | 22.839 | caneleira | caneleiras de peso |  |
| 5 | Tríceps na suspensão `triceps-suspensao` | 5.097 | 5.077 | peso-corpo | suspensão |  |
| 6 | Elevação de joelhos nas paralelas `elevacao-joelhos-paralelas` | 1.343 | 31.016 | peso-corpo | paralelas |  |
| 7 | Roda abdominal, ajoelhado `roda-abdominal` | 600 | 21.125 | peso-corpo | roda abdominal |  |
| 8 | Remada na suspensão `remada-suspensao` | 0 | 52.400 | peso-corpo | suspensão |  |
| 9 | Rosca na suspensão `rosca-suspensao` | 0 | 25.524 | peso-corpo | suspensão |  |
| 10 | Abertura em Y e T na suspensão `yt-suspensao` | 0 | 20.906 | peso-corpo | suspensão |  |
| 11 | Flexão de joelho na suspensão `flexao-joelho-suspensao` | 0 | 36.197 | peso-corpo | suspensão |  |
| 12 | Búlgaro na suspensão `bulgaro-suspensao` | 0 | 14.950 | peso-corpo | suspensão |  |
| 13 | Ponte de glúteo com os pés na bola suíça `ponte-pes-bola` | 0 | 67.646 | peso-corpo | bola suíça |  |
| 14 | Abdução de quadril sentado com mini-band `abducao-mini-band` | 0 | 19.918 | elastico | mini-band |  |

# Teste de estresse do cenário de equipamento mínimo

> Gerado por `npm run auditoria:minimo`. Dados fictícios (`scripts/auditoria/minimo-cenarios.ts`). Não editar à mão.

**518.400 programas**: 55 cenários (o inventário vazio, os 49 itens sozinhos e 5 pares de casa), que dão **45 programas diferentes** (cenários com as mesmas capacidades geram o mesmo programa e rodam uma vez), × 3 níveis × 12 divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor.

## Classes de cenários

Os itens que, sozinhos, não abrem nenhum exercício a mais que o inventário vazio ficam na classe do vazio.

| classe | cenários |
| --- | --- |
| vazio | vazio, polia_simples, banco_regulavel, banco_reto, acessorio_polia_corda, acessorio_polia_triangulo, acessorio_polia_barra_reta, acessorio_polia_estribo, acessorio_polia_tornozeleira, esteira, banco_scott |
| estacao_polia_dupla | estacao_polia_dupla |
| barra_fixa | barra_fixa |
| halteres_fixos | halteres_fixos |
| anilhas_e_manoplas | anilhas_e_manoplas |
| barra_longa | barra_longa |
| barra_w | barra_w |
| rack_de_agachamento | rack_de_agachamento |
| smith | smith |
| leg_press | leg_press |
| cadeira_extensora | cadeira_extensora |
| mesa_flexora | mesa_flexora |
| cadeira_flexora | cadeira_flexora |
| paralelas | paralelas |
| elasticos | elasticos |
| step | step |
| bola_suica | bola_suica |
| barra_hexagonal | barra_hexagonal |
| kettlebell | kettlebell |
| banco_romano | banco_romano |
| estacao_puxada | estacao_puxada |
| estacao_remada | estacao_remada |
| multifuncional | multifuncional |
| supino_maquina | supino_maquina |
| voador | voador |
| desenvolvimento_maquina | desenvolvimento_maquina |
| remada_articulada | remada_articulada |
| graviton | graviton |
| rosca_maquina | rosca_maquina |
| triceps_maquina | triceps_maquina |
| abdominal_maquina | abdominal_maquina |
| hack | hack |
| cadeira_abdutora_adutora | cadeira_abdutora_adutora |
| gluteo_maquina | gluteo_maquina |
| panturrilha_em_pe_maquina | panturrilha_em_pe_maquina |
| panturrilha_sentada_maquina | panturrilha_sentada_maquina |
| suspensao | suspensao |
| caneleiras | caneleiras |
| mini_band | mini_band |
| roda_abdominal | roda_abdominal |
| barra-porta+elasticos | barra-porta+elasticos |
| halteres+bola | halteres+bola |
| suspensao+elasticos | suspensao+elasticos |
| banco+halteres-leves | banco+halteres-leves |
| step+elasticos | step+elasticos |

## Problemas encontrados (contagem de ocorrências)

| problema | ocorrências |
| --- | ---: |
| `volume.abaixo-sem-aviso` | 1.090.726 |
| `vaga.so-aviso-do-musculo.elevacao-lateral` | 414.720 |
| `vaga.so-aviso-do-musculo.ombro-posterior` | 339.311 |
| `vaga.so-aviso-do-musculo.biceps` | 335.239 |
| `vaga.so-aviso-do-musculo.puxar-vertical` | 311.222 |
| `vaga.so-aviso-do-musculo.puxar-horizontal` | 308.071 |
| `vaga.so-aviso-do-musculo.triceps-acima-cabeca` | 197.137 |
| `vaga.so-aviso-do-musculo.crucifixo` | 195.792 |
| `dia.superior-sem-superior` | 183.807 |
| `equilibrio.sem-puxar` | 36.480 |
| `volume.zero.costas` | 36.480 |
| `volume.zero.ombro_posterior` | 36.480 |
| `volume.zero.biceps` | 33.642 |
| `volume.zero.ombro_lateral` | 21.104 |
| `equilibrio.sem-posteriores` | 210 |
| `volume.zero.posteriores` | 210 |

## Volume: séries semanais, média por cenário (todas as situações)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,5 | 7,4 | 12,1 | 8,2 | 4,7 |
| estacao_polia_dupla | 8,7 | 6,6 | 6,3 | 6,1 | 6,5 | 5,7 | 6,9 | 6,8 | 11 | 6,6 | 4,2 |
| barra_fixa | 7 | 7,5 | 0,7 | 3,7 | 3,7 | 5,7 | 7,4 | 7,2 | 11,7 | 7,4 | 4,4 |
| halteres_fixos | 7,1 | 4,9 | 6,8 | 4,8 | 7,5 | 7,2 | 6,7 | 8,2 | 11,5 | 7,6 | 4,2 |
| anilhas_e_manoplas | 7,2 | 4,9 | 6,9 | 4,8 | 7,6 | 7,2 | 6,7 | 8,2 | 11,5 | 7,8 | 4,2 |
| barra_longa | 7,1 | 2,9 | 0,7 | 1,5 | 1,5 | 5,9 | 7,3 | 8 | 12,3 | 7,8 | 4,4 |
| barra_w | 7,1 | 0 | 0,7 | 0 | 6,1 | 5,6 | 7,5 | 7,3 | 11,9 | 7,5 | 4,6 |
| rack_de_agachamento | 7,1 | 6,5 | 0,6 | 3,2 | 3,2 | 5,8 | 7,4 | 7,2 | 11,8 | 7,4 | 4,4 |
| smith | 7,1 | 6,5 | 0,6 | 3,2 | 3,2 | 5,8 | 7,4 | 7,3 | 11,8 | 7,4 | 4,4 |
| leg_press | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,6 | 7,5 | 12,2 | 9,1 | 4,7 |
| cadeira_extensora | 7,3 | 0 | 0,7 | 0 | 0 | 5,8 | 7,9 | 7,2 | 10,8 | 8 | 4,7 |
| mesa_flexora | 7,2 | 0 | 0,7 | 0 | 0 | 5,8 | 7,6 | 7,7 | 10,6 | 8,2 | 4,7 |
| cadeira_flexora | 7,2 | 0 | 0,7 | 0 | 0 | 5,8 | 7,6 | 7,7 | 10,6 | 8,2 | 4,7 |
| paralelas | 8 | 0 | 0,7 | 0 | 0 | 7 | 7,5 | 7,3 | 12 | 8,1 | 4,7 |
| elasticos | 7,8 | 8 | 6,1 | 6 | 7,4 | 5,7 | 7 | 7,3 | 8,9 | 5,9 | 4,1 |
| step | 7,3 | 0 | 0,7 | 0 | 0 | 5,8 | 7,5 | 7,4 | 12,1 | 8,9 | 4,7 |
| bola_suica | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,3 | 7,4 | 12,8 | 8,2 | 4,7 |
| barra_hexagonal | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,4 | 8,1 | 13,3 | 8,3 | 4,7 |
| kettlebell | 6,3 | 4,2 | 0,8 | 2,1 | 7,7 | 7,4 | 7,1 | 8,3 | 12,1 | 7 | 4,3 |
| banco_romano | 7,2 | 0 | 0,7 | 0 | 0 | 5,8 | 7,2 | 8,7 | 13,7 | 8,1 | 4,6 |
| estacao_puxada | 7 | 6,3 | 0,7 | 3,1 | 3,1 | 5,7 | 7,4 | 7,2 | 11,7 | 7,4 | 4,4 |
| estacao_remada | 7,2 | 4,1 | 0,7 | 2,1 | 2,1 | 6 | 7,4 | 7,3 | 11,9 | 7,7 | 4,4 |
| multifuncional | 7 | 7,3 | 0,7 | 3,7 | 3,7 | 5,8 | 7,4 | 7,3 | 11,8 | 7,4 | 4,4 |
| supino_maquina | 8,5 | 0 | 0,7 | 0 | 0 | 6,5 | 7,4 | 7,3 | 11,9 | 8 | 4,7 |
| voador | 10,7 | 0 | 0,7 | 0 | 0 | 5,4 | 7,3 | 7,2 | 11,8 | 7,8 | 4,7 |
| desenvolvimento_maquina | 7,3 | 0 | 0,9 | 0 | 0 | 6 | 7,4 | 7,3 | 12 | 8,1 | 4,7 |
| remada_articulada | 7 | 6,2 | 0,7 | 3,1 | 3,1 | 5,8 | 7,4 | 7,2 | 11,7 | 7,4 | 4,4 |
| graviton | 8 | 6,2 | 0,7 | 3,1 | 3,1 | 7,5 | 7,3 | 7,1 | 11,5 | 7,2 | 4,4 |
| rosca_maquina | 7,1 | 0 | 0,7 | 0 | 7,3 | 5,7 | 7,4 | 7,3 | 11,8 | 7,4 | 4,6 |
| triceps_maquina | 5,9 | 0 | 0,7 | 0 | 0 | 8,3 | 7,3 | 7,2 | 11,8 | 7,8 | 4,7 |
| abdominal_maquina | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,5 | 7,4 | 12,1 | 8,2 | 4,7 |
| hack | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,6 | 7,4 | 12,2 | 8,2 | 4,7 |
| cadeira_abdutora_adutora | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,5 | 7,4 | 12,3 | 8,2 | 4,7 |
| gluteo_maquina | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,6 | 7,4 | 12,1 | 8,2 | 4,7 |
| panturrilha_em_pe_maquina | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,5 | 7,4 | 12,2 | 9,1 | 4,7 |
| panturrilha_sentada_maquina | 7,2 | 0 | 0,7 | 0 | 0 | 5,8 | 7,5 | 7,4 | 12,1 | 9,2 | 4,7 |
| suspensao | 5,8 | 6,3 | 0,5 | 7,1 | 7 | 7,2 | 7,1 | 7,3 | 11,9 | 7 | 4,3 |
| caneleiras | 7,3 | 0 | 0,7 | 0 | 0 | 5,8 | 7,8 | 7,2 | 10,9 | 7,9 | 4,7 |
| mini_band | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,5 | 7,4 | 12,1 | 8,3 | 4,7 |
| roda_abdominal | 7,3 | 0 | 0,7 | 0 | 0 | 5,9 | 7,5 | 7,4 | 12,1 | 8,2 | 4,7 |
| barra-porta+elasticos | 7,8 | 8 | 6,2 | 6 | 7,4 | 5,7 | 7 | 7,3 | 8,9 | 5,9 | 4,1 |
| halteres+bola | 7,2 | 4,9 | 6,9 | 4,8 | 7,6 | 7,2 | 6,6 | 8,2 | 12 | 7,8 | 4,2 |
| suspensao+elasticos | 7,3 | 7,7 | 6,1 | 6,1 | 7,5 | 5,9 | 7 | 7,3 | 8,9 | 5,9 | 4,1 |
| banco+halteres-leves | 8,5 | 4,8 | 6,5 | 4,5 | 7,2 | 6,1 | 6,6 | 8,1 | 11,4 | 7,7 | 4,2 |
| step+elasticos | 7,8 | 8 | 6,1 | 6 | 7,4 | 5,7 | 7 | 7,3 | 8,8 | 6,7 | 4,1 |

### Sem dor: % dos programas com o músculo em 0 série na semana

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| estacao_polia_dupla | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| barra_fixa | 0% | 0% | 34,8% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| halteres_fixos | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| anilhas_e_manoplas | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| barra_longa | 0% | 33,3% | 36% | 33,3% | 33,3% | 0% | 0% | 0% | 0% | 0% | 0% |
| barra_w | 0% | 100% | 38,2% | 100% | 1,5% | 0% | 0% | 0% | 0% | 0% | 0% |
| rack_de_agachamento | 0% | 0% | 39,5% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| smith | 0% | 0% | 39,5% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| leg_press | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| cadeira_extensora | 0% | 100% | 38,2% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| mesa_flexora | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| cadeira_flexora | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| paralelas | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| step | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| bola_suica | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| barra_hexagonal | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| kettlebell | 0% | 0% | 44% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| banco_romano | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| estacao_puxada | 0% | 0% | 34,8% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| estacao_remada | 0% | 0% | 36,5% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| multifuncional | 0% | 0% | 39,5% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| supino_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| voador | 0% | 100% | 36,4% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| desenvolvimento_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| remada_articulada | 0% | 0% | 36,5% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| graviton | 0% | 0% | 34,8% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| rosca_maquina | 0% | 100% | 38,2% | 100% | 1,5% | 0% | 0% | 0% | 0% | 0% | 0% |
| triceps_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| abdominal_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| hack | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| cadeira_abdutora_adutora | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| gluteo_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| panturrilha_em_pe_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| panturrilha_sentada_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| suspensao | 0% | 0% | 47,5% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| caneleiras | 0% | 100% | 38,2% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| mini_band | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| roda_abdominal | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| barra-porta+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| halteres+bola | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| suspensao+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| banco+halteres-leves | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| step+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |

## O que o app diz quando a vaga fica sem opção

Por programa e por função da divisão que ficou sem exercício possível por falta de equipamento (não por dor). "Aviso da vaga" = o texto da `lacuna` da função ("Sem cadeira extensora: …"). "Só aviso do músculo" = a vaga some e só aparece "Abaixo da meta semanal: costas 0 de 6". "Coberto" = outra vaga deu volume ao músculo. "Sem meta: nada" = o ombro anterior e os adutores não têm meta, então nada aparece.

| cenário | função | aviso da vaga | só aviso do músculo | coberto por outra vaga | sem meta: nada | nada |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | biceps | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | crucifixo | 0 | 5160 | 6360 | 0 | 0 |
| vazio (= 10 outros) | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | extensora | 11520 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| estacao_polia_dupla | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_fixa | biceps | 0 | 6938 | 4582 | 0 | 0 |
| barra_fixa | crucifixo | 0 | 5286 | 6234 | 0 | 0 |
| barra_fixa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_fixa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_fixa | ombro-posterior | 0 | 3563 | 7957 | 0 | 0 |
| barra_fixa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_fixa | puxar-horizontal | 0 | 4254 | 7266 | 0 | 0 |
| barra_fixa | triceps-acima-cabeca | 0 | 6092 | 5428 | 0 | 0 |
| halteres_fixos | crucifixo | 0 | 4771 | 6749 | 0 | 0 |
| halteres_fixos | extensora | 11520 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | crucifixo | 0 | 4743 | 6777 | 0 | 0 |
| anilhas_e_manoplas | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_longa | biceps | 0 | 9725 | 1795 | 0 | 0 |
| barra_longa | crucifixo | 0 | 5109 | 6411 | 0 | 0 |
| barra_longa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_longa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_longa | ombro-posterior | 0 | 8319 | 3201 | 0 | 0 |
| barra_longa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_longa | puxar-horizontal | 0 | 3840 | 0 | 0 | 0 |
| barra_longa | puxar-vertical | 0 | 9439 | 2081 | 0 | 0 |
| barra_longa | triceps-acima-cabeca | 0 | 5935 | 5585 | 0 | 0 |
| barra_w | crucifixo | 0 | 5314 | 6206 | 0 | 0 |
| barra_w | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_w | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_w | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| barra_w | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_w | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_w | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_w | triceps-acima-cabeca | 0 | 6088 | 5432 | 0 | 0 |
| rack_de_agachamento | biceps | 0 | 7404 | 4116 | 0 | 0 |
| rack_de_agachamento | crucifixo | 0 | 5244 | 6276 | 0 | 0 |
| rack_de_agachamento | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rack_de_agachamento | extensora | 11520 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | ombro-posterior | 0 | 4188 | 7332 | 0 | 0 |
| rack_de_agachamento | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | triceps-acima-cabeca | 0 | 6038 | 5482 | 0 | 0 |
| smith | biceps | 0 | 7403 | 4117 | 0 | 0 |
| smith | crucifixo | 0 | 5242 | 6278 | 0 | 0 |
| smith | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| smith | extensora | 11520 | 0 | 0 | 0 | 0 |
| smith | ombro-posterior | 0 | 4187 | 7333 | 0 | 0 |
| smith | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| smith | triceps-acima-cabeca | 0 | 6038 | 5482 | 0 | 0 |
| leg_press | biceps | 0 | 11520 | 0 | 0 | 0 |
| leg_press | crucifixo | 0 | 5165 | 6355 | 0 | 0 |
| leg_press | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| leg_press | extensora | 11520 | 0 | 0 | 0 | 0 |
| leg_press | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| leg_press | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| leg_press | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| leg_press | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| leg_press | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| cadeira_extensora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | crucifixo | 0 | 5168 | 6352 | 0 | 0 |
| cadeira_extensora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_extensora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | triceps-acima-cabeca | 0 | 5978 | 5542 | 0 | 0 |
| mesa_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | crucifixo | 0 | 5168 | 6352 | 0 | 0 |
| mesa_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| mesa_flexora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| mesa_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| cadeira_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | crucifixo | 0 | 5168 | 6352 | 0 | 0 |
| cadeira_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_flexora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| paralelas | biceps | 0 | 11520 | 0 | 0 | 0 |
| paralelas | crucifixo | 0 | 4553 | 6967 | 0 | 0 |
| paralelas | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| paralelas | extensora | 11520 | 0 | 0 | 0 | 0 |
| paralelas | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| paralelas | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| paralelas | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| paralelas | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| paralelas | triceps-acima-cabeca | 0 | 4895 | 6625 | 0 | 0 |
| elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | biceps | 0 | 11520 | 0 | 0 | 0 |
| step | crucifixo | 0 | 5179 | 6341 | 0 | 0 |
| step | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| step | extensora | 11520 | 0 | 0 | 0 | 0 |
| step | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| step | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| step | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| step | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| bola_suica | biceps | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | crucifixo | 0 | 5161 | 6359 | 0 | 0 |
| bola_suica | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | extensora | 11520 | 0 | 0 | 0 | 0 |
| bola_suica | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| bola_suica | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | triceps-acima-cabeca | 0 | 5964 | 5556 | 0 | 0 |
| barra_hexagonal | biceps | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | crucifixo | 0 | 5160 | 6360 | 0 | 0 |
| barra_hexagonal | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_hexagonal | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_hexagonal | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| kettlebell | crucifixo | 0 | 5828 | 5692 | 0 | 0 |
| kettlebell | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | extensora | 11520 | 0 | 0 | 0 | 0 |
| kettlebell | ombro-posterior | 0 | 6833 | 4687 | 0 | 0 |
| kettlebell | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco_romano | biceps | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | crucifixo | 0 | 5190 | 6330 | 0 | 0 |
| banco_romano | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | extensora | 11520 | 0 | 0 | 0 | 0 |
| banco_romano | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco_romano | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | triceps-acima-cabeca | 0 | 5976 | 5544 | 0 | 0 |
| estacao_puxada | biceps | 0 | 7562 | 3958 | 0 | 0 |
| estacao_puxada | crucifixo | 0 | 5299 | 6221 | 0 | 0 |
| estacao_puxada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_puxada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_puxada | ombro-posterior | 0 | 4427 | 7093 | 0 | 0 |
| estacao_puxada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_puxada | puxar-horizontal | 0 | 5938 | 5582 | 0 | 0 |
| estacao_puxada | triceps-acima-cabeca | 0 | 6048 | 5472 | 0 | 0 |
| estacao_remada | biceps | 0 | 8910 | 2610 | 0 | 0 |
| estacao_remada | crucifixo | 0 | 5105 | 6415 | 0 | 0 |
| estacao_remada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_remada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_remada | ombro-posterior | 0 | 6912 | 4608 | 0 | 0 |
| estacao_remada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_remada | puxar-vertical | 0 | 7797 | 3723 | 0 | 0 |
| estacao_remada | triceps-acima-cabeca | 0 | 5908 | 5612 | 0 | 0 |
| multifuncional | biceps | 0 | 7053 | 4467 | 0 | 0 |
| multifuncional | crucifixo | 0 | 5263 | 6257 | 0 | 0 |
| multifuncional | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| multifuncional | extensora | 11520 | 0 | 0 | 0 | 0 |
| multifuncional | ombro-posterior | 0 | 3720 | 7800 | 0 | 0 |
| multifuncional | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| multifuncional | triceps-acima-cabeca | 0 | 6118 | 5402 | 0 | 0 |
| supino_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | crucifixo | 0 | 4038 | 7482 | 0 | 0 |
| supino_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| supino_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| supino_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | triceps-acima-cabeca | 0 | 5214 | 6306 | 0 | 0 |
| voador | biceps | 0 | 11520 | 0 | 0 | 0 |
| voador | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| voador | extensora | 11520 | 0 | 0 | 0 | 0 |
| voador | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| voador | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| voador | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| voador | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| voador | triceps-acima-cabeca | 0 | 6191 | 5329 | 0 | 0 |
| desenvolvimento_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | crucifixo | 0 | 5160 | 6360 | 0 | 0 |
| desenvolvimento_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| remada_articulada | biceps | 0 | 7635 | 3885 | 0 | 0 |
| remada_articulada | crucifixo | 0 | 5259 | 6261 | 0 | 0 |
| remada_articulada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| remada_articulada | extensora | 11520 | 0 | 0 | 0 | 0 |
| remada_articulada | ombro-posterior | 0 | 4632 | 6888 | 0 | 0 |
| remada_articulada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| remada_articulada | puxar-vertical | 0 | 5986 | 5534 | 0 | 0 |
| remada_articulada | triceps-acima-cabeca | 0 | 6024 | 5496 | 0 | 0 |
| graviton | biceps | 0 | 7649 | 3871 | 0 | 0 |
| graviton | crucifixo | 0 | 4189 | 7331 | 0 | 0 |
| graviton | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| graviton | extensora | 11520 | 0 | 0 | 0 | 0 |
| graviton | ombro-posterior | 0 | 4530 | 6990 | 0 | 0 |
| graviton | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| graviton | puxar-horizontal | 0 | 6039 | 5481 | 0 | 0 |
| graviton | triceps-acima-cabeca | 0 | 3955 | 7565 | 0 | 0 |
| rosca_maquina | crucifixo | 0 | 5309 | 6211 | 0 | 0 |
| rosca_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| rosca_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rosca_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | triceps-acima-cabeca | 0 | 6090 | 5430 | 0 | 0 |
| triceps_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | crucifixo | 0 | 6101 | 5419 | 0 | 0 |
| triceps_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| triceps_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| triceps_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | triceps-acima-cabeca | 0 | 3097 | 8423 | 0 | 0 |
| abdominal_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | crucifixo | 0 | 5150 | 6370 | 0 | 0 |
| abdominal_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| abdominal_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| abdominal_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| hack | biceps | 0 | 11520 | 0 | 0 | 0 |
| hack | crucifixo | 0 | 5156 | 6364 | 0 | 0 |
| hack | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| hack | extensora | 11520 | 0 | 0 | 0 | 0 |
| hack | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| hack | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| hack | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| hack | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| hack | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| cadeira_abdutora_adutora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | crucifixo | 0 | 5152 | 6368 | 0 | 0 |
| cadeira_abdutora_adutora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| gluteo_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | crucifixo | 0 | 5121 | 6399 | 0 | 0 |
| gluteo_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| gluteo_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| gluteo_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | triceps-acima-cabeca | 0 | 5964 | 5556 | 0 | 0 |
| panturrilha_em_pe_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | crucifixo | 0 | 5171 | 6349 | 0 | 0 |
| panturrilha_em_pe_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| panturrilha_sentada_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | crucifixo | 0 | 5186 | 6334 | 0 | 0 |
| panturrilha_sentada_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | triceps-acima-cabeca | 0 | 5988 | 5532 | 0 | 0 |
| suspensao | crucifixo | 0 | 6296 | 5224 | 0 | 0 |
| suspensao | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| suspensao | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| caneleiras | biceps | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | crucifixo | 0 | 5169 | 6351 | 0 | 0 |
| caneleiras | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| caneleiras | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | triceps-acima-cabeca | 0 | 5978 | 5542 | 0 | 0 |
| mini_band | biceps | 0 | 11520 | 0 | 0 | 0 |
| mini_band | crucifixo | 0 | 5159 | 6361 | 0 | 0 |
| mini_band | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| mini_band | extensora | 11520 | 0 | 0 | 0 | 0 |
| mini_band | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| mini_band | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| mini_band | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| mini_band | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| mini_band | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| roda_abdominal | biceps | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | crucifixo | 0 | 5159 | 6361 | 0 | 0 |
| roda_abdominal | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | extensora | 11520 | 0 | 0 | 0 | 0 |
| roda_abdominal | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| roda_abdominal | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | triceps-acima-cabeca | 0 | 5966 | 5554 | 0 | 0 |
| barra-porta+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| halteres+bola | crucifixo | 0 | 4741 | 6779 | 0 | 0 |
| halteres+bola | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | extensora | 11520 | 0 | 0 | 0 | 0 |
| step+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |

- Avisos que sugerem comprar algo, em todos os cenários: **0**.
- "Nenhum exercício possível" dito para um músculo que tinha exercício possível: **0**.
- Músculo com meta abaixo do limiar (a meta, se prioridade; senão, 4 séries) sem aviso: **1090726**.
- Programas sem nenhuma série de puxar com o aviso `equipamento.sem-puxada-vertical`: **0** (ele só dispara quando a puxada cai para uma remada).

## Equilíbrio (sem dor)

| cenário | empurra e não puxa | joelho sem posteriores da coxa |
| --- | ---: | ---: |
| vazio (= 10 outros) | 100% | 0% |
| estacao_polia_dupla | 0% | 1% |
| barra_fixa | 0% | 0% |
| halteres_fixos | 0% | 1% |
| anilhas_e_manoplas | 0% | 1% |
| barra_longa | 33,3% | 0% |
| barra_w | 100% | 0% |
| rack_de_agachamento | 0% | 1% |
| smith | 0% | 1% |
| leg_press | 100% | 0% |
| cadeira_extensora | 100% | 0% |
| mesa_flexora | 100% | 0% |
| cadeira_flexora | 100% | 0% |
| paralelas | 100% | 0% |
| elasticos | 0% | 1% |
| step | 100% | 0% |
| bola_suica | 100% | 0% |
| barra_hexagonal | 100% | 0% |
| kettlebell | 0% | 1% |
| banco_romano | 100% | 0% |
| estacao_puxada | 0% | 0% |
| estacao_remada | 0% | 0% |
| multifuncional | 0% | 1% |
| supino_maquina | 100% | 0% |
| voador | 100% | 0% |
| desenvolvimento_maquina | 100% | 0% |
| remada_articulada | 0% | 0% |
| graviton | 0% | 0% |
| rosca_maquina | 100% | 0% |
| triceps_maquina | 100% | 0% |
| abdominal_maquina | 100% | 0% |
| hack | 100% | 0% |
| cadeira_abdutora_adutora | 100% | 0% |
| gluteo_maquina | 100% | 0% |
| panturrilha_em_pe_maquina | 100% | 0% |
| panturrilha_sentada_maquina | 100% | 0% |
| suspensao | 0% | 1% |
| caneleiras | 100% | 0% |
| mini_band | 100% | 0% |
| roda_abdominal | 100% | 0% |
| barra-porta+elasticos | 0% | 1% |
| halteres+bola | 0% | 1% |
| suspensao+elasticos | 0% | 1% |
| banco+halteres-leves | 0% | 1% |
| step+elasticos | 0% | 1% |

## Tempo (sem dor)

Exercícios por dia no programa × os que cabem nos minutos (`tempo.exercicios-por-sessao`), séries por exercício e o dia mais longo.

| cenário | minutos | cabem | exercícios por dia | séries por exercício | no teto de 4 séries | dia mais longo (mediana, min) | sobra > 30% |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 20 | 3 | 2,9 | 2,7 | 31,3% | 30 | 0% |
| vazio (= 10 outros) | 30 | 4 | 3,4 | 2,7 | 27,3% | 31 | 0% |
| vazio (= 10 outros) | 45 | 6 | 4,4 | 2,7 | 27,5% | 45 | 1,1% |
| vazio (= 10 outros) | 60 | 8 | 4,8 | 2,8 | 31,4% | 58 | 5% |
| vazio (= 10 outros) | 90 | 12 | 5 | 2,8 | 31,5% | 61 | 61,1% |
| estacao_polia_dupla | 20 | 3 | 3,3 | 2,6 | 24,2% | 34 | 0% |
| estacao_polia_dupla | 30 | 4 | 4 | 2,6 | 22,6% | 37 | 0% |
| estacao_polia_dupla | 45 | 6 | 5,6 | 2,6 | 18,7% | 45 | 0% |
| estacao_polia_dupla | 60 | 8 | 6,8 | 2,6 | 18% | 59 | 0% |
| estacao_polia_dupla | 90 | 12 | 7,8 | 2,6 | 21,4% | 80 | 23,9% |
| barra_fixa | 20 | 3 | 3,1 | 2,8 | 33,1% | 31 | 0% |
| barra_fixa | 30 | 4 | 3,7 | 2,8 | 32,4% | 34 | 0% |
| barra_fixa | 45 | 6 | 4,7 | 2,8 | 29,7% | 45 | 1,1% |
| barra_fixa | 60 | 8 | 5,3 | 2,8 | 33,2% | 59 | 1,1% |
| barra_fixa | 90 | 12 | 5,6 | 2,9 | 35,6% | 67 | 40,6% |
| halteres_fixos | 20 | 3 | 3,3 | 2,6 | 25,1% | 35 | 0% |
| halteres_fixos | 30 | 4 | 4,1 | 2,7 | 24,4% | 35 | 0% |
| halteres_fixos | 45 | 6 | 5,5 | 2,7 | 25,8% | 45 | 0% |
| halteres_fixos | 60 | 8 | 6,7 | 2,7 | 26,3% | 60 | 0% |
| halteres_fixos | 90 | 12 | 7,7 | 2,7 | 27,5% | 82 | 17,2% |
| anilhas_e_manoplas | 20 | 3 | 3,3 | 2,6 | 21,6% | 34 | 0% |
| anilhas_e_manoplas | 30 | 4 | 4,1 | 2,7 | 20,5% | 35 | 0% |
| anilhas_e_manoplas | 45 | 6 | 5,5 | 2,7 | 21,3% | 45 | 0% |
| anilhas_e_manoplas | 60 | 8 | 6,7 | 2,7 | 22,2% | 60 | 0% |
| anilhas_e_manoplas | 90 | 12 | 7,8 | 2,7 | 26,6% | 82 | 17,2% |
| barra_longa | 20 | 3 | 3 | 2,8 | 34% | 31 | 0% |
| barra_longa | 30 | 4 | 3,5 | 2,8 | 30,2% | 33 | 0% |
| barra_longa | 45 | 6 | 4,4 | 2,8 | 28,8% | 45 | 1,1% |
| barra_longa | 60 | 8 | 4,9 | 2,8 | 33,8% | 59 | 5% |
| barra_longa | 90 | 12 | 5,2 | 2,9 | 36,7% | 67 | 47,2% |
| barra_w | 20 | 3 | 3,1 | 2,7 | 32,3% | 30 | 0% |
| barra_w | 30 | 4 | 3,5 | 2,8 | 32,1% | 32 | 0% |
| barra_w | 45 | 6 | 4,6 | 2,8 | 32,1% | 45 | 1,1% |
| barra_w | 60 | 8 | 5,2 | 2,8 | 35% | 59 | 2,2% |
| barra_w | 90 | 12 | 5,4 | 2,8 | 36,3% | 65 | 43,9% |
| rack_de_agachamento | 20 | 3 | 3 | 2,8 | 34,6% | 30 | 0% |
| rack_de_agachamento | 30 | 4 | 3,6 | 2,8 | 34% | 34 | 0% |
| rack_de_agachamento | 45 | 6 | 4,5 | 2,8 | 30,5% | 45 | 1,1% |
| rack_de_agachamento | 60 | 8 | 5,1 | 2,8 | 35,1% | 59 | 1,1% |
| rack_de_agachamento | 90 | 12 | 5,4 | 2,9 | 37,3% | 68 | 41,1% |
| smith | 20 | 3 | 3 | 2,8 | 34,6% | 30 | 0% |
| smith | 30 | 4 | 3,6 | 2,8 | 34,7% | 34 | 0% |
| smith | 45 | 6 | 4,5 | 2,8 | 30,9% | 44 | 1,1% |
| smith | 60 | 8 | 5,1 | 2,8 | 35,3% | 58 | 1,1% |
| smith | 90 | 12 | 5,4 | 2,9 | 37,3% | 67 | 41,7% |
| leg_press | 20 | 3 | 2,9 | 2,7 | 29,6% | 28 | 0% |
| leg_press | 30 | 4 | 3,4 | 2,8 | 27,7% | 30 | 0% |
| leg_press | 45 | 6 | 4,4 | 2,7 | 25,5% | 45 | 1,1% |
| leg_press | 60 | 8 | 4,9 | 2,7 | 28,1% | 57 | 5,6% |
| leg_press | 90 | 12 | 5,1 | 2,7 | 29,2% | 62 | 51,7% |
| cadeira_extensora | 20 | 3 | 2,9 | 2,7 | 29,7% | 30 | 0% |
| cadeira_extensora | 30 | 4 | 3,4 | 2,7 | 26,5% | 31 | 0% |
| cadeira_extensora | 45 | 6 | 4,5 | 2,6 | 22,4% | 44 | 1,1% |
| cadeira_extensora | 60 | 8 | 5 | 2,6 | 24,6% | 57 | 13,3% |
| cadeira_extensora | 90 | 12 | 5,1 | 2,7 | 26,3% | 61 | 63,3% |
| mesa_flexora | 20 | 3 | 2,8 | 2,7 | 26,4% | 30 | 0% |
| mesa_flexora | 30 | 4 | 3,4 | 2,7 | 24,3% | 31 | 0% |
| mesa_flexora | 45 | 6 | 4,4 | 2,7 | 25,4% | 45 | 0% |
| mesa_flexora | 60 | 8 | 4,8 | 2,8 | 30,9% | 59 | 2,2% |
| mesa_flexora | 90 | 12 | 5,1 | 2,8 | 31,5% | 62 | 55,6% |
| cadeira_flexora | 20 | 3 | 2,8 | 2,7 | 26,4% | 30 | 0% |
| cadeira_flexora | 30 | 4 | 3,4 | 2,7 | 24,3% | 31 | 0% |
| cadeira_flexora | 45 | 6 | 4,4 | 2,7 | 25,4% | 45 | 0% |
| cadeira_flexora | 60 | 8 | 4,8 | 2,8 | 30,9% | 59 | 2,2% |
| cadeira_flexora | 90 | 12 | 5,1 | 2,8 | 31,5% | 62 | 55,6% |
| paralelas | 20 | 3 | 2,9 | 2,8 | 32,1% | 30 | 0% |
| paralelas | 30 | 4 | 3,4 | 2,8 | 28,6% | 31 | 0% |
| paralelas | 45 | 6 | 4,4 | 2,7 | 27,9% | 45 | 1,1% |
| paralelas | 60 | 8 | 4,8 | 2,8 | 31,3% | 58 | 5,6% |
| paralelas | 90 | 12 | 5 | 2,8 | 31,2% | 61 | 57,8% |
| elasticos | 20 | 3 | 3,3 | 2,7 | 25,7% | 34 | 0% |
| elasticos | 30 | 4 | 4,1 | 2,7 | 25,9% | 41 | 0% |
| elasticos | 45 | 6 | 5,7 | 2,6 | 17,4% | 45 | 0% |
| elasticos | 60 | 8 | 6,9 | 2,5 | 14,5% | 59 | 0% |
| elasticos | 90 | 12 | 7,9 | 2,5 | 15,5% | 76 | 26,1% |
| step | 20 | 3 | 2,9 | 2,7 | 30,7% | 31 | 0% |
| step | 30 | 4 | 3,3 | 2,7 | 26,4% | 32 | 0% |
| step | 45 | 6 | 4,4 | 2,7 | 25,4% | 45 | 0% |
| step | 60 | 8 | 4,8 | 2,7 | 29,4% | 59 | 5% |
| step | 90 | 12 | 5,1 | 2,7 | 29,2% | 64 | 45,6% |
| bola_suica | 20 | 3 | 2,9 | 2,7 | 31,1% | 30 | 0% |
| bola_suica | 30 | 4 | 3,4 | 2,7 | 26,8% | 30 | 0% |
| bola_suica | 45 | 6 | 4,4 | 2,7 | 26,1% | 45 | 0% |
| bola_suica | 60 | 8 | 4,9 | 2,7 | 30,5% | 58 | 5% |
| bola_suica | 90 | 12 | 5 | 2,7 | 29,8% | 60 | 62,2% |
| barra_hexagonal | 20 | 3 | 2,9 | 2,7 | 27,7% | 30 | 0% |
| barra_hexagonal | 30 | 4 | 3,4 | 2,7 | 26,8% | 30 | 0% |
| barra_hexagonal | 45 | 6 | 4,4 | 2,7 | 26,1% | 45 | 2,2% |
| barra_hexagonal | 60 | 8 | 4,9 | 2,6 | 27,1% | 57 | 10% |
| barra_hexagonal | 90 | 12 | 5 | 2,6 | 26,7% | 57 | 68,3% |
| kettlebell | 20 | 3 | 3 | 2,8 | 36,1% | 34 | 0% |
| kettlebell | 30 | 4 | 3,7 | 2,8 | 32,6% | 35 | 0% |
| kettlebell | 45 | 6 | 4,9 | 2,8 | 30,4% | 45 | 0% |
| kettlebell | 60 | 8 | 5,7 | 2,8 | 33,5% | 59 | 1,1% |
| kettlebell | 90 | 12 | 6,1 | 2,9 | 36,8% | 72 | 30% |
| banco_romano | 20 | 3 | 2,8 | 2,7 | 29,5% | 29 | 0% |
| banco_romano | 30 | 4 | 3,3 | 2,7 | 25,1% | 30 | 0% |
| banco_romano | 45 | 6 | 4,3 | 2,7 | 24,2% | 45 | 0% |
| banco_romano | 60 | 8 | 4,8 | 2,7 | 29,4% | 58 | 7,2% |
| banco_romano | 90 | 12 | 5 | 2,7 | 29% | 63 | 46,7% |
| estacao_puxada | 20 | 3 | 3 | 2,8 | 35,3% | 30 | 0% |
| estacao_puxada | 30 | 4 | 3,5 | 2,9 | 35,4% | 35 | 0% |
| estacao_puxada | 45 | 6 | 4,5 | 2,8 | 32,1% | 45 | 1,1% |
| estacao_puxada | 60 | 8 | 5,1 | 2,8 | 35,5% | 59 | 1,1% |
| estacao_puxada | 90 | 12 | 5,3 | 2,9 | 37,8% | 68 | 40% |
| estacao_remada | 20 | 3 | 3,1 | 2,8 | 34,5% | 31 | 0% |
| estacao_remada | 30 | 4 | 3,5 | 2,8 | 32,6% | 32 | 0% |
| estacao_remada | 45 | 6 | 4,5 | 2,8 | 30,9% | 45 | 1,1% |
| estacao_remada | 60 | 8 | 5,1 | 2,9 | 35,5% | 59 | 1,7% |
| estacao_remada | 90 | 12 | 5,3 | 2,9 | 37,8% | 68 | 41,7% |
| multifuncional | 20 | 3 | 3,2 | 2,7 | 27,6% | 30 | 0% |
| multifuncional | 30 | 4 | 3,8 | 2,8 | 28,8% | 34 | 0% |
| multifuncional | 45 | 6 | 4,8 | 2,8 | 27,1% | 45 | 1,1% |
| multifuncional | 60 | 8 | 5,4 | 2,8 | 31,8% | 59 | 1,1% |
| multifuncional | 90 | 12 | 5,6 | 2,8 | 34,1% | 68 | 41,7% |
| supino_maquina | 20 | 3 | 2,9 | 2,7 | 30,9% | 30 | 0% |
| supino_maquina | 30 | 4 | 3,4 | 2,8 | 28% | 31 | 0% |
| supino_maquina | 45 | 6 | 4,4 | 2,7 | 27,2% | 45 | 1,1% |
| supino_maquina | 60 | 8 | 4,8 | 2,8 | 31,1% | 58 | 5% |
| supino_maquina | 90 | 12 | 5 | 2,7 | 31,1% | 61 | 61,1% |
| voador | 20 | 3 | 3 | 2,7 | 26,9% | 30 | 0% |
| voador | 30 | 4 | 3,5 | 2,7 | 23,5% | 31 | 0% |
| voador | 45 | 6 | 4,6 | 2,6 | 23,4% | 45 | 1,1% |
| voador | 60 | 8 | 5,2 | 2,7 | 27% | 58 | 4,4% |
| voador | 90 | 12 | 5,3 | 2,7 | 27,3% | 61 | 58,9% |
| desenvolvimento_maquina | 20 | 3 | 2,9 | 2,7 | 31,3% | 30 | 0% |
| desenvolvimento_maquina | 30 | 4 | 3,4 | 2,7 | 27,3% | 31 | 0% |
| desenvolvimento_maquina | 45 | 6 | 4,4 | 2,7 | 27,4% | 45 | 1,1% |
| desenvolvimento_maquina | 60 | 8 | 4,8 | 2,8 | 31,5% | 58 | 5% |
| desenvolvimento_maquina | 90 | 12 | 5 | 2,8 | 31,5% | 61 | 61,1% |
| remada_articulada | 20 | 3 | 3,1 | 2,8 | 34,5% | 31 | 0% |
| remada_articulada | 30 | 4 | 3,5 | 2,8 | 32,6% | 32 | 0% |
| remada_articulada | 45 | 6 | 4,5 | 2,8 | 30,9% | 45 | 1,1% |
| remada_articulada | 60 | 8 | 5,1 | 2,9 | 35,5% | 59 | 1,7% |
| remada_articulada | 90 | 12 | 5,3 | 2,9 | 37,8% | 68 | 41,7% |
| graviton | 20 | 3 | 3 | 2,8 | 35,5% | 30 | 0% |
| graviton | 30 | 4 | 3,6 | 2,8 | 34% | 35 | 0% |
| graviton | 45 | 6 | 4,6 | 2,8 | 29,4% | 45 | 1,1% |
| graviton | 60 | 8 | 5,2 | 2,8 | 32,6% | 59 | 1,1% |
| graviton | 90 | 12 | 5,4 | 2,8 | 34,8% | 67 | 40,6% |
| rosca_maquina | 20 | 3 | 3,1 | 2,7 | 29,8% | 30 | 0% |
| rosca_maquina | 30 | 4 | 3,5 | 2,8 | 30,9% | 31 | 0% |
| rosca_maquina | 45 | 6 | 4,6 | 2,8 | 30,9% | 45 | 1,1% |
| rosca_maquina | 60 | 8 | 5,2 | 2,8 | 34% | 59 | 2,2% |
| rosca_maquina | 90 | 12 | 5,4 | 2,8 | 36,3% | 65 | 43,9% |
| triceps_maquina | 20 | 3 | 2,9 | 2,8 | 30,7% | 30 | 0% |
| triceps_maquina | 30 | 4 | 3,4 | 2,8 | 29,2% | 31 | 0% |
| triceps_maquina | 45 | 6 | 4,4 | 2,8 | 30,7% | 45 | 1,1% |
| triceps_maquina | 60 | 8 | 4,9 | 2,8 | 35,3% | 58 | 3,3% |
| triceps_maquina | 90 | 12 | 5 | 2,8 | 35,4% | 62 | 56,1% |
| abdominal_maquina | 20 | 3 | 2,9 | 2,7 | 26,6% | 29 | 0% |
| abdominal_maquina | 30 | 4 | 3,4 | 2,7 | 25,6% | 30 | 0% |
| abdominal_maquina | 45 | 6 | 4,4 | 2,7 | 27,2% | 45 | 1,1% |
| abdominal_maquina | 60 | 8 | 4,8 | 2,8 | 31,1% | 58 | 5,6% |
| abdominal_maquina | 90 | 12 | 5 | 2,8 | 31,5% | 61 | 61,1% |
| hack | 20 | 3 | 2,9 | 2,7 | 31,2% | 30 | 0% |
| hack | 30 | 4 | 3,4 | 2,8 | 28,1% | 31 | 0% |
| hack | 45 | 6 | 4,4 | 2,7 | 28,3% | 45 | 1,1% |
| hack | 60 | 8 | 4,8 | 2,8 | 31,7% | 58 | 6,1% |
| hack | 90 | 12 | 5 | 2,8 | 31,5% | 60 | 62,2% |
| cadeira_abdutora_adutora | 20 | 3 | 2,9 | 2,7 | 31,3% | 30 | 0% |
| cadeira_abdutora_adutora | 30 | 4 | 3,4 | 2,7 | 27,6% | 31 | 0% |
| cadeira_abdutora_adutora | 45 | 6 | 4,4 | 2,7 | 27,6% | 45 | 1,1% |
| cadeira_abdutora_adutora | 60 | 8 | 4,9 | 2,7 | 30,9% | 58 | 6,7% |
| cadeira_abdutora_adutora | 90 | 12 | 5 | 2,8 | 31,5% | 59 | 67,2% |
| gluteo_maquina | 20 | 3 | 2,8 | 2,8 | 31,4% | 28 | 0% |
| gluteo_maquina | 30 | 4 | 3,2 | 2,8 | 31,7% | 30 | 0% |
| gluteo_maquina | 45 | 6 | 4,3 | 2,8 | 29,5% | 44 | 1,1% |
| gluteo_maquina | 60 | 8 | 4,8 | 2,8 | 31,9% | 58 | 5% |
| gluteo_maquina | 90 | 12 | 5 | 2,8 | 31,5% | 61 | 61,1% |
| panturrilha_em_pe_maquina | 20 | 3 | 2,9 | 2,7 | 29,7% | 28 | 0% |
| panturrilha_em_pe_maquina | 30 | 4 | 3,4 | 2,7 | 27,2% | 30 | 0% |
| panturrilha_em_pe_maquina | 45 | 6 | 4,4 | 2,7 | 25,1% | 45 | 1,1% |
| panturrilha_em_pe_maquina | 60 | 8 | 4,9 | 2,7 | 28,2% | 58 | 5% |
| panturrilha_em_pe_maquina | 90 | 12 | 5,1 | 2,7 | 29,2% | 63 | 50% |
| panturrilha_sentada_maquina | 20 | 3 | 2,9 | 2,7 | 31,3% | 30 | 0% |
| panturrilha_sentada_maquina | 30 | 4 | 3,4 | 2,7 | 27,3% | 31 | 0% |
| panturrilha_sentada_maquina | 45 | 6 | 4,4 | 2,7 | 25,3% | 45 | 1,1% |
| panturrilha_sentada_maquina | 60 | 8 | 4,9 | 2,7 | 28,6% | 58 | 5% |
| panturrilha_sentada_maquina | 90 | 12 | 5,1 | 2,7 | 29,2% | 64 | 49,4% |
| suspensao | 20 | 3 | 3 | 2,9 | 35,6% | 30 | 0% |
| suspensao | 30 | 4 | 3,8 | 2,9 | 36,1% | 34 | 0% |
| suspensao | 45 | 6 | 5,1 | 2,9 | 32,2% | 45 | 0% |
| suspensao | 60 | 8 | 6,1 | 2,9 | 36% | 59 | 1,1% |
| suspensao | 90 | 12 | 6,5 | 2,9 | 38% | 71 | 33,3% |
| caneleiras | 20 | 3 | 2,9 | 2,7 | 30,3% | 30 | 0% |
| caneleiras | 30 | 4 | 3,4 | 2,7 | 27% | 31 | 0% |
| caneleiras | 45 | 6 | 4,5 | 2,6 | 22,4% | 45 | 1,1% |
| caneleiras | 60 | 8 | 5 | 2,7 | 25,1% | 58 | 13,3% |
| caneleiras | 90 | 12 | 5,1 | 2,7 | 26,3% | 61 | 63,3% |
| mini_band | 20 | 3 | 2,9 | 2,7 | 31,3% | 30 | 0% |
| mini_band | 30 | 4 | 3,4 | 2,7 | 27,6% | 31 | 0% |
| mini_band | 45 | 6 | 4,4 | 2,7 | 27,5% | 45 | 1,1% |
| mini_band | 60 | 8 | 4,9 | 2,8 | 31,1% | 58 | 5% |
| mini_band | 90 | 12 | 5 | 2,8 | 31,5% | 60 | 63,3% |
| roda_abdominal | 20 | 3 | 2,9 | 2,7 | 31,3% | 30 | 0% |
| roda_abdominal | 30 | 4 | 3,4 | 2,7 | 27,3% | 31 | 0% |
| roda_abdominal | 45 | 6 | 4,4 | 2,7 | 27,6% | 45 | 1,1% |
| roda_abdominal | 60 | 8 | 4,8 | 2,8 | 31,5% | 58 | 5% |
| roda_abdominal | 90 | 12 | 5 | 2,8 | 31,5% | 61 | 61,1% |
| barra-porta+elasticos | 20 | 3 | 3,3 | 2,7 | 25,8% | 34 | 0% |
| barra-porta+elasticos | 30 | 4 | 4,1 | 2,7 | 26% | 40 | 0% |
| barra-porta+elasticos | 45 | 6 | 5,7 | 2,6 | 17,6% | 45 | 0% |
| barra-porta+elasticos | 60 | 8 | 6,9 | 2,5 | 14,9% | 59 | 0% |
| barra-porta+elasticos | 90 | 12 | 7,9 | 2,5 | 15,5% | 75 | 26,1% |
| halteres+bola | 20 | 3 | 3,3 | 2,6 | 21,2% | 34 | 0% |
| halteres+bola | 30 | 4 | 4,1 | 2,6 | 20% | 35 | 0% |
| halteres+bola | 45 | 6 | 5,5 | 2,7 | 21,2% | 45 | 0% |
| halteres+bola | 60 | 8 | 6,7 | 2,7 | 22% | 60 | 0% |
| halteres+bola | 90 | 12 | 7,7 | 2,7 | 25,7% | 81 | 17,2% |
| suspensao+elasticos | 20 | 3 | 3,3 | 2,7 | 26% | 34 | 0% |
| suspensao+elasticos | 30 | 4 | 4,1 | 2,7 | 26,9% | 41 | 0% |
| suspensao+elasticos | 45 | 6 | 5,7 | 2,6 | 18,4% | 45 | 0% |
| suspensao+elasticos | 60 | 8 | 6,9 | 2,5 | 15,9% | 59 | 0% |
| suspensao+elasticos | 90 | 12 | 7,9 | 2,5 | 16,6% | 78 | 27,2% |
| banco+halteres-leves | 20 | 3 | 3,3 | 2,6 | 23,2% | 35 | 0% |
| banco+halteres-leves | 30 | 4 | 4 | 2,7 | 21,3% | 36 | 0% |
| banco+halteres-leves | 45 | 6 | 5,6 | 2,6 | 16,9% | 45 | 0% |
| banco+halteres-leves | 60 | 8 | 6,9 | 2,6 | 17% | 60 | 0% |
| banco+halteres-leves | 90 | 12 | 8 | 2,6 | 20% | 82 | 12,2% |
| step+elasticos | 20 | 3 | 3,3 | 2,7 | 25,7% | 36 | 0% |
| step+elasticos | 30 | 4 | 4,1 | 2,7 | 25,8% | 42 | 0% |
| step+elasticos | 45 | 6 | 5,6 | 2,6 | 17,2% | 45 | 0% |
| step+elasticos | 60 | 8 | 6,9 | 2,5 | 14% | 59 | 0% |
| step+elasticos | 90 | 12 | 8 | 2,5 | 14,5% | 80 | 25,6% |

## Guia: prescrições com animação, só cartão e sem nada

| cenário | com animação | só cartão de texto | sem guia nenhum |
| --- | ---: | ---: | ---: |
| vazio (= 10 outros) | 100% | 0% | 0% |
| estacao_polia_dupla | 91,9% | 0% | 8,1% |
| barra_fixa | 100% | 0% | 0% |
| halteres_fixos | 77,9% | 17% | 5,1% |
| anilhas_e_manoplas | 77,9% | 17% | 5,1% |
| barra_longa | 89,2% | 0% | 10,8% |
| barra_w | 90% | 0% | 10% |
| rack_de_agachamento | 89,2% | 0% | 10,8% |
| smith | 81,8% | 7,3% | 10,8% |
| leg_press | 76,8% | 0% | 23,2% |
| cadeira_extensora | 92,3% | 7,7% | 0% |
| mesa_flexora | 87% | 0% | 13% |
| cadeira_flexora | 87% | 13% | 0% |
| paralelas | 95,3% | 4,7% | 0% |
| elasticos | 100% | 0% | 0% |
| step | 100% | 0% | 0% |
| bola_suica | 100% | 0% | 0% |
| barra_hexagonal | 92,3% | 7,7% | 0% |
| kettlebell | 94,3% | 5,7% | 0% |
| banco_romano | 91% | 9% | 0% |
| estacao_puxada | 89,6% | 10,4% | 0% |
| estacao_remada | 93,1% | 6,9% | 0% |
| multifuncional | 86,7% | 13,3% | 0% |
| supino_maquina | 87,4% | 12,6% | 0% |
| voador | 91,2% | 8,8% | 0% |
| desenvolvimento_maquina | 94,8% | 5,2% | 0% |
| remada_articulada | 89,9% | 10,1% | 0% |
| graviton | 83,8% | 16,2% | 0% |
| rosca_maquina | 88% | 12% | 0% |
| triceps_maquina | 91,1% | 8,9% | 0% |
| abdominal_maquina | 87,8% | 12,2% | 0% |
| hack | 90,8% | 9,2% | 0% |
| cadeira_abdutora_adutora | 87,8% | 12,2% | 0% |
| gluteo_maquina | 88,7% | 11,3% | 0% |
| panturrilha_em_pe_maquina | 85,5% | 14,5% | 0% |
| panturrilha_sentada_maquina | 92,4% | 7,6% | 0% |
| suspensao | 100% | 0% | 0% |
| caneleiras | 100% | 0% | 0% |
| mini_band | 100% | 0% | 0% |
| roda_abdominal | 100% | 0% | 0% |
| barra-porta+elasticos | 100% | 0% | 0% |
| halteres+bola | 78% | 17% | 5% |
| suspensao+elasticos | 100% | 0% | 0% |
| banco+halteres-leves | 79,5% | 17% | 3,6% |
| step+elasticos | 100% | 0% | 0% |

## Segurança: o que sobra com dor, no inventário vazio e com um aparelho só

| cenário | dor | dias só com abdominal | dias de superior sem tronco nem braço | dias vazios | carrega a região | região que o dado não marca | exercícios que sobram |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| vazio (= 10 outros) | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| vazio (= 10 outros) | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| vazio (= 10 outros) | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| estacao_polia_dupla | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, remada-unilateral-polia, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-unilateral, remada-unilateral-polia, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas, triceps-frances-polia-unilateral |
| barra_fixa | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, barra-fixa, barra-fixa-supinada, elevacao-joelhos, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_fixa | punho 7 | 0 | 126 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, elevacao-joelhos, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_fixa | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, barra-fixa, barra-fixa-supinada, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| halteres_fixos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | ombro 7 | 0 | 56 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-martelo, stiff, stiff-unilateral |
| halteres_fixos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres_fixos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | ombro 7 | 0 | 49 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-martelo, stiff, stiff-unilateral |
| anilhas_e_manoplas | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| anilhas_e_manoplas | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| barra_longa | joelho 7 | 0 | 117 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | punho 7 | 0 | 560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-romeno-barra |
| barra_longa | lombar 7 | 0 | 327 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_longa | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-romeno-barra |
| barra_longa | joelho 7 + lombar 7 | 0 | 325 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_w | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| barra_w | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_w | ombro 7 | 0 | 43 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-barra-w |
| barra_w | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| barra_w | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_w | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| rack_de_agachamento | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| rack_de_agachamento | punho 7 | 0 | 73 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-invertida |
| rack_de_agachamento | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rack_de_agachamento | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| rack_de_agachamento | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rack_de_agachamento | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | punho 7 | 0 | 73 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-invertida |
| smith | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| smith | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| smith | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| leg_press | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, panturrilha-leg-press, pike, ponte-gluteo |
| leg_press | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-chao, panturrilha-leg-press, ponte-gluteo |
| leg_press | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-chao, panturrilha-leg-press, ponte-gluteo |
| leg_press | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, leg-press, nordico, panturrilha-chao, panturrilha-leg-press, pike, ponte-gluteo |
| leg_press | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-chao, panturrilha-leg-press, ponte-gluteo |
| leg_press | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, panturrilha-leg-press, pike, ponte-gluteo |
| cadeira_extensora | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_extensora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | lombar 7 | 0 | 326 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_extensora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| paralelas | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, elevacao-joelhos-paralelas, flexao, flexao-fechada, mergulho, panturrilha-chao, pike, ponte-gluteo |
| paralelas | punho 7 | 0 | 686 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos-paralelas, flexao-joelho-deslizante, mergulho, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | lombar 7 | 0 | 330 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, mergulho, nordico, panturrilha-chao, pike, ponte-gluteo |
| paralelas | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos-paralelas, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, mergulho, panturrilha-chao, pike, ponte-gluteo |
| elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| elasticos | ombro 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| step | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| step | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| step | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| bola_suica | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| bola_suica | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, ponte-pes-bola |
| bola_suica | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, ponte-pes-bola |
| bola_suica | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-bola, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, ponte-pes-bola |
| bola_suica | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, ponte-pes-bola |
| bola_suica | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| kettlebell | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, desenvolvimento-unilateral-kettlebell, flexao, flexao-fechada, panturrilha-chao, ponte-kettlebell, remada-unilateral-kettlebell, rosca-kettlebell, stiff-kettlebell, triceps-frances-kettlebell |
| kettlebell | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-kettlebell, afundo-peso-corpo, desenvolvimento-unilateral-kettlebell, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-kettlebell, remada-unilateral-kettlebell, rosca-kettlebell, stiff-kettlebell, triceps-frances-kettlebell |
| kettlebell | ombro 7 | 0 | 54 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-kettlebell, afundo-peso-corpo, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-kettlebell, rosca-kettlebell, stiff-kettlebell |
| kettlebell | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-kettlebell, afundo-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, pike, ponte-kettlebell, rosca-kettlebell, triceps-frances-kettlebell |
| kettlebell | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-kettlebell, afundo-peso-corpo, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-kettlebell, stiff-kettlebell |
| kettlebell | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-kettlebell, rosca-kettlebell, triceps-frances-kettlebell |
| banco_romano | joelho 7 | 0 | 315 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, hiperextensao, panturrilha-chao, pike, ponte-gluteo |
| banco_romano | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| banco_romano | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| estacao_puxada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_puxada | punho 7 | 0 | 43 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-frente |
| estacao_puxada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_puxada | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_puxada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_puxada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_remada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | punho 7 | 0 | 43 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_remada | lombar 7 | 0 | 325 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| estacao_remada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_remada | joelho 7 + lombar 7 | 0 | 307 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| multifuncional | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | punho 7 | 0 | 160 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| multifuncional | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| multifuncional | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| multifuncional | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| supino_maquina | joelho 7 | 0 | 318 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| supino_maquina | punho 7 | 0 | 174 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, supino-maquina |
| supino_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| supino_maquina | lombar 7 | 0 | 319 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| supino_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| supino_maquina | joelho 7 + lombar 7 | 0 | 320 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| voador | joelho 7 | 0 | 324 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, voador |
| voador | punho 7 | 0 | 174 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, voador |
| voador | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| voador | lombar 7 | 0 | 325 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, voador |
| voador | cotovelo 7 | 0 | 174 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, voador |
| voador | joelho 7 + lombar 7 | 0 | 327 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, voador |
| desenvolvimento_maquina | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, desenvolvimento-maquina, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | punho 7 | 0 | 709 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, desenvolvimento-maquina, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo |
| remada_articulada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-articulada |
| remada_articulada | punho 7 | 0 | 43 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-articulada |
| remada_articulada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| remada_articulada | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-articulada |
| remada_articulada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| remada_articulada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-articulada |
| graviton | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, barra-fixa-graviton, flexao, flexao-fechada, mergulho-graviton, panturrilha-chao, pike, ponte-gluteo |
| graviton | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa-graviton, bulgaro-peso-corpo, flexao-joelho-deslizante, mergulho-graviton, nordico, panturrilha-chao, ponte-gluteo |
| graviton | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| graviton | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa-graviton, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, mergulho-graviton, nordico, panturrilha-chao, pike, ponte-gluteo |
| graviton | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| graviton | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, barra-fixa-graviton, flexao, flexao-fechada, mergulho-graviton, panturrilha-chao, pike, ponte-gluteo |
| rosca_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-maquina |
| rosca_maquina | punho 7 | 0 | 43 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | ombro 7 | 0 | 43 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, rosca-maquina |
| rosca_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rosca_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-maquina |
| triceps_maquina | joelho 7 | 0 | 263 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| triceps_maquina | punho 7 | 0 | 216 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | ombro 7 | 0 | 216 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | lombar 7 | 0 | 248 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| triceps_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| triceps_maquina | joelho 7 + lombar 7 | 0 | 262 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| abdominal_maquina | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-maquina, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| abdominal_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| abdominal_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| hack | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| hack | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, pike, ponte-gluteo |
| hack | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 + lombar 7 | 0 | 332 | 0 | 0 | 0 | abducao-maquina, aducao-maquina, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| gluteo_maquina | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, coice-maquina, flexao, flexao-fechada, panturrilha-chao, pike |
| gluteo_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike |
| gluteo_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | joelho 7 + lombar 7 | 0 | 332 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, coice-maquina, flexao, flexao-fechada, panturrilha-chao, pike |
| panturrilha_em_pe_maquina | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_em_pe_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_em_pe_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 | 0 | 326 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| panturrilha_sentada_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| panturrilha_sentada_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 + lombar 7 | 0 | 327 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| suspensao | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, ponte-gluteo |
| suspensao | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | cotovelo 7 | 0 | 65 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, ponte-gluteo, yt-suspensao |
| suspensao | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| caneleiras | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-caneleira, aducao-caneleira, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| caneleiras | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| caneleiras | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| caneleiras | lombar 7 | 0 | 326 | 0 | 0 | 0 | abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-caneleira, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| caneleiras | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| caneleiras | joelho 7 + lombar 7 | 0 | 332 | 0 | 0 | 0 | abducao-caneleira, aducao-caneleira, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mini_band | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, abducao-mini-band, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mini_band | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, abducao-mini-band, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| mini_band | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, abducao-mini-band, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| mini_band | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, abducao-mini-band, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| mini_band | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, abducao-mini-band, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| mini_band | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, abducao-mini-band, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| roda_abdominal | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, roda-abdominal |
| roda_abdominal | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, roda-abdominal |
| roda_abdominal | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| roda_abdominal | lombar 7 | 0 | 323 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| roda_abdominal | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, roda-abdominal |
| roda_abdominal | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra-porta+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, barra-fixa, barra-fixa-supinada, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| barra-porta+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| barra-porta+elasticos | ombro 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| barra-porta+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, pike, ponte-gluteo, remada-elastico, rosca-elastico, triceps-elastico-acima |
| barra-porta+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-joelhos, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| barra-porta+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, barra-fixa, barra-fixa-supinada, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-elastico, rosca-elastico, triceps-elastico-acima |
| halteres+bola | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-bola, goblet, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | ombro 7 | 0 | 49 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-bola, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-martelo, stiff, stiff-unilateral |
| halteres+bola | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-bola, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-bola, goblet, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres+bola | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| suspensao+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-suspensao, stiff-elastico, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-suspensao, stiff-elastico, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | ombro 7 | 0 | 40 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-joelho-suspensao, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| suspensao+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-joelho-suspensao, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-suspensao, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico, yt-suspensao |
| suspensao+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-suspensao, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| banco+halteres-leves | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-reto, triceps-frances-halter |
| banco+halteres-leves | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-reto, triceps-frances-halter |
| banco+halteres-leves | ombro 7 | 0 | 48 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-martelo, stiff, stiff-unilateral |
| banco+halteres-leves | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, elevacao-halteres, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-reto, triceps-frances-halter |
| banco+halteres-leves | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| banco+halteres-leves | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-halteres, elevacao-halteres, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-reto, triceps-frances-halter |
| step+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| step+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| step+elasticos | ombro 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| step+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| step+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, stiff-elastico |
| step+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |

## Exemplos (3 por problema, de cenários diferentes)

### `dia.superior-sem-superior`

- **vazio · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · punho 7**: Superior A sem nenhum exercício de tronco ou braço (panturrilha-chao).
  - Programa: Superior A (8 min): panturrilha-chao 4 | Inferior A (31 min): agachamento-peso-corpo 2, bulgaro-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 2, abdominal-chao 4 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **estacao_polia_dupla · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (afundo-peso-corpo, panturrilha-chao, flexao-joelho-deslizante).
  - Programa: Superior A (19 min): afundo-peso-corpo 2, panturrilha-chao 3, flexao-joelho-deslizante 2 | Inferior A (29 min): agachamento-peso-corpo 2, bulgaro-peso-corpo 2, panturrilha-chao 2, abdominal-chao 4 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (panturrilha-chao, flexao-joelho-deslizante).
  - Programa: Superior A (17 min): panturrilha-chao 4, flexao-joelho-deslizante 4 | Inferior A (29 min): agachamento-peso-corpo 2, bulgaro-peso-corpo 2, panturrilha-chao 2, abdominal-chao 4 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2

### `equilibrio.sem-posteriores`

- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (41 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (22 min): afundo-peso-corpo 2, flexao 2, remada-unilateral-polia 2
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (40 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **anilhas_e_manoplas · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (38 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-chao 3, abdominal-chao 4 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2

### `equilibrio.sem-puxar`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.biceps`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (44 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.crucifixo`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · punho 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao-joelho-deslizante 2, abdominal-chao 4
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · punho 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (34 min): agachamento-peso-corpo 2, barra-fixa 4, flexao-joelho-deslizante 2, panturrilha-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao-joelho-deslizante 2, abdominal-chao 4
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (33 min): goblet 2, stiff 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (21 min): afundo 2, flexao-joelho-deslizante 2, rosca-alternada 4

### `vaga.so-aviso-do-musculo.elevacao-lateral`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (44 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.ombro-posterior`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (44 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.puxar-horizontal`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao-joelho-deslizante 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.puxar-vertical`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.triceps-acima-cabeca`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (44 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.abaixo-sem-aviso`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (44 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.biceps`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.costas`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.ombro_lateral`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (41 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (22 min): afundo-peso-corpo 2, flexao 2, remada-unilateral-polia 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (44 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4

### `volume.zero.ombro_posterior`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (37 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.posteriores`

- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (41 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (22 min): afundo-peso-corpo 2, flexao 2, remada-unilateral-polia 2
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (40 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **anilhas_e_manoplas · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (38 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-chao 3, abdominal-chao 4 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2

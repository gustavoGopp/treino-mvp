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
| `volume.abaixo-sem-aviso` | 726.008 |
| `vaga.so-aviso-do-musculo.elevacao-lateral` | 403.200 |
| `vaga.so-aviso-do-musculo.biceps` | 336.872 |
| `vaga.so-aviso-do-musculo.puxar-vertical` | 311.305 |
| `vaga.so-aviso-do-musculo.puxar-horizontal` | 308.498 |
| `vaga.so-aviso-do-musculo.crucifixo` | 202.976 |
| `dia.superior-sem-superior` | 58.623 |
| `equilibrio.sem-puxar` | 36.480 |
| `volume.zero.costas` | 36.480 |
| `volume.zero.biceps` | 33.660 |
| `volume.zero.ombro_lateral` | 22.973 |
| `volume.zero.ombro_posterior` | 2.965 |
| `equilibrio.sem-posteriores` | 210 |
| `volume.zero.posteriores` | 210 |

## Volume: séries semanais, média por cenário (todas as situações)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,3 | 12 | 8,2 | 4,5 |
| estacao_polia_dupla | 8,6 | 6,6 | 6,3 | 6,1 | 6,5 | 5,6 | 6,9 | 6,8 | 11 | 7,4 | 4 |
| barra_fixa | 6,5 | 7,2 | 0,6 | 7,8 | 3,6 | 6,6 | 7,2 | 7,2 | 11,6 | 8 | 4,3 |
| halteres_fixos | 6,6 | 4,9 | 6,7 | 6,1 | 7,4 | 7,3 | 6,7 | 8,2 | 11,4 | 7,4 | 4 |
| anilhas_e_manoplas | 6,6 | 4,9 | 6,9 | 6,1 | 7,5 | 7,3 | 6,7 | 8,2 | 11,5 | 7,5 | 4 |
| barra_longa | 6,5 | 2,9 | 0,7 | 6,7 | 1,4 | 6,8 | 7,1 | 7,9 | 12,1 | 8 | 4,3 |
| barra_w | 6,5 | 0 | 0,6 | 5,5 | 5,9 | 6,6 | 7,2 | 7,2 | 11,7 | 7,9 | 4,5 |
| rack_de_agachamento | 6,6 | 6,4 | 0,6 | 7,5 | 3,2 | 6,6 | 7,3 | 7,2 | 11,6 | 8 | 4,2 |
| smith | 6,6 | 6,4 | 0,6 | 7,5 | 3,2 | 6,6 | 7,3 | 7,2 | 11,6 | 8 | 4,2 |
| leg_press | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,3 | 12 | 8,3 | 4,6 |
| cadeira_extensora | 6,6 | 0 | 0,6 | 5,6 | 0 | 6,8 | 7,8 | 7,1 | 10,7 | 7,9 | 4,5 |
| mesa_flexora | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,6 | 10,7 | 8,1 | 4,5 |
| cadeira_flexora | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,6 | 10,7 | 8,1 | 4,5 |
| paralelas | 7,3 | 0 | 0,6 | 5,6 | 0 | 7,7 | 7,3 | 7,2 | 11,9 | 8 | 4,5 |
| elasticos | 7,6 | 7,7 | 6,1 | 6,1 | 7,4 | 6,6 | 6,9 | 7,3 | 8,7 | 6,5 | 3,9 |
| step | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,3 | 7,2 | 11,9 | 8,1 | 4,5 |
| bola_suica | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,1 | 7,3 | 12,6 | 8,1 | 4,5 |
| barra_hexagonal | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,1 | 7,9 | 13 | 8,2 | 4,6 |
| kettlebell | 6,5 | 4,1 | 0,8 | 6,3 | 7,4 | 7,4 | 6,9 | 8,4 | 11,8 | 7,5 | 4,1 |
| banco_romano | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 6,9 | 8,5 | 13,5 | 8,1 | 4,5 |
| estacao_puxada | 6,5 | 6,1 | 0,6 | 7,5 | 3,1 | 6,6 | 7,2 | 7,2 | 11,6 | 8 | 4,3 |
| estacao_remada | 6,5 | 4,1 | 0,7 | 6,8 | 2 | 6,8 | 7,3 | 7,2 | 11,7 | 8,1 | 4,3 |
| multifuncional | 6,5 | 7,2 | 0,6 | 7,7 | 3,6 | 6,6 | 7,3 | 7,2 | 11,7 | 8 | 4,2 |
| supino_maquina | 7,7 | 0 | 0,6 | 5,6 | 0 | 7,3 | 7,3 | 7,2 | 11,8 | 8 | 4,5 |
| voador | 9,4 | 0 | 0,6 | 5,5 | 0 | 6,3 | 7,3 | 7,2 | 11,7 | 7,9 | 4,5 |
| desenvolvimento_maquina | 6,6 | 0 | 0,8 | 5,6 | 0 | 7 | 7,3 | 7,3 | 11,9 | 8,1 | 4,5 |
| remada_articulada | 6,5 | 6,1 | 0,6 | 7,4 | 3 | 6,7 | 7,3 | 7,2 | 11,7 | 8 | 4,3 |
| graviton | 7,4 | 6 | 0,6 | 7,4 | 3 | 8,1 | 7,2 | 7,1 | 11,5 | 7,9 | 4,3 |
| rosca_maquina | 6,5 | 0 | 0,6 | 5,4 | 7,1 | 6,7 | 7,2 | 7,1 | 11,7 | 7,9 | 4,5 |
| triceps_maquina | 5,9 | 0 | 0,6 | 5,6 | 0 | 8,6 | 7,2 | 7,1 | 11,7 | 8 | 4,5 |
| abdominal_maquina | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,3 | 12 | 8,2 | 4,6 |
| hack | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,3 | 12 | 8,2 | 4,5 |
| cadeira_abdutora_adutora | 6,6 | 0 | 0,6 | 5,8 | 0 | 6,8 | 7,4 | 7,3 | 12,1 | 8,2 | 4,6 |
| gluteo_maquina | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,3 | 11,8 | 8,2 | 4,6 |
| panturrilha_em_pe_maquina | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,3 | 12 | 8,3 | 4,5 |
| panturrilha_sentada_maquina | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,3 | 7,3 | 12 | 8,4 | 4,5 |
| suspensao | 6,4 | 6,6 | 0,5 | 7,1 | 7 | 7,3 | 7,1 | 7,3 | 11,9 | 7,8 | 4,2 |
| caneleiras | 6,4 | 0 | 7,4 | 5,2 | 0 | 6,5 | 7,6 | 7 | 10,2 | 7,5 | 4,4 |
| mini_band | 6,6 | 0 | 0,6 | 5,6 | 0 | 6,8 | 7,7 | 7,1 | 10,9 | 7,8 | 4,5 |
| roda_abdominal | 6,6 | 0 | 0,6 | 5,7 | 0 | 6,8 | 7,4 | 7,3 | 12 | 8,2 | 4,5 |
| barra-porta+elasticos | 7,6 | 7,7 | 6,1 | 6,1 | 7,5 | 6,6 | 6,9 | 7,3 | 8,7 | 6,5 | 3,9 |
| halteres+bola | 6,6 | 4,9 | 6,8 | 6,1 | 7,5 | 7,3 | 6,6 | 8,1 | 11,9 | 7,5 | 4 |
| suspensao+elasticos | 7,3 | 7,7 | 6,1 | 6,1 | 7,5 | 6,6 | 6,9 | 7,3 | 8,7 | 6,5 | 3,9 |
| banco+halteres-leves | 8 | 4,8 | 6,5 | 5,7 | 7,1 | 6,2 | 6,6 | 8,1 | 11,3 | 7,4 | 4 |
| step+elasticos | 7,6 | 7,7 | 6,1 | 6,1 | 7,4 | 6,6 | 6,9 | 7,3 | 8,7 | 6,5 | 3,9 |

### Sem dor: % dos programas com o músculo em 0 série na semana

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| estacao_polia_dupla | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| barra_fixa | 0% | 0% | 42% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| halteres_fixos | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| anilhas_e_manoplas | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| barra_longa | 0% | 33,3% | 41,7% | 1,7% | 33,3% | 0% | 0% | 0% | 0% | 0% | 0% |
| barra_w | 0% | 100% | 43,6% | 13,8% | 2,1% | 0% | 0% | 0% | 0% | 0% | 0% |
| rack_de_agachamento | 0% | 0% | 44% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| smith | 0% | 0% | 44% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| leg_press | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| cadeira_extensora | 0% | 100% | 41,1% | 12,7% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| mesa_flexora | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| cadeira_flexora | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| paralelas | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| step | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| bola_suica | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| barra_hexagonal | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| kettlebell | 0% | 0% | 47,5% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| banco_romano | 0% | 100% | 39,7% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| estacao_puxada | 0% | 0% | 42% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| estacao_remada | 0% | 0% | 42,8% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| multifuncional | 0% | 0% | 44% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| supino_maquina | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| voador | 0% | 100% | 43,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| desenvolvimento_maquina | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| remada_articulada | 0% | 0% | 42,8% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| graviton | 0% | 0% | 42% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| rosca_maquina | 0% | 100% | 43,6% | 13,8% | 2,1% | 0% | 0% | 0% | 0% | 0% | 0% |
| triceps_maquina | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| abdominal_maquina | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| hack | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| cadeira_abdutora_adutora | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| gluteo_maquina | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| panturrilha_em_pe_maquina | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| panturrilha_sentada_maquina | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| suspensao | 0% | 0% | 47,9% | 0% | 0% | 0% | 0% | 1% | 0% | 0% | 0% |
| caneleiras | 0% | 100% | 6,3% | 13,8% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| mini_band | 0% | 100% | 41,1% | 12,7% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
| roda_abdominal | 0% | 100% | 40,1% | 6,9% | 100% | 0% | 0% | 0% | 0% | 0% | 0% |
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
| vazio (= 10 outros) | crucifixo | 0 | 5405 | 6115 | 0 | 0 |
| vazio (= 10 outros) | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | extensora | 11520 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| estacao_polia_dupla | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_fixa | biceps | 0 | 7183 | 4337 | 0 | 0 |
| barra_fixa | crucifixo | 0 | 5315 | 6205 | 0 | 0 |
| barra_fixa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_fixa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_fixa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_fixa | puxar-horizontal | 0 | 4417 | 7103 | 0 | 0 |
| halteres_fixos | crucifixo | 0 | 5475 | 6045 | 0 | 0 |
| halteres_fixos | extensora | 11520 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | crucifixo | 0 | 5468 | 6052 | 0 | 0 |
| anilhas_e_manoplas | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_longa | biceps | 0 | 9802 | 1718 | 0 | 0 |
| barra_longa | crucifixo | 0 | 5380 | 6140 | 0 | 0 |
| barra_longa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_longa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_longa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_longa | puxar-horizontal | 0 | 3840 | 0 | 0 | 0 |
| barra_longa | puxar-vertical | 0 | 9439 | 2081 | 0 | 0 |
| barra_w | crucifixo | 0 | 5462 | 6058 | 0 | 0 |
| barra_w | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_w | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_w | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_w | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_w | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| rack_de_agachamento | biceps | 0 | 7550 | 3970 | 0 | 0 |
| rack_de_agachamento | crucifixo | 0 | 5150 | 6370 | 0 | 0 |
| rack_de_agachamento | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rack_de_agachamento | extensora | 11520 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| smith | biceps | 0 | 7549 | 3971 | 0 | 0 |
| smith | crucifixo | 0 | 5146 | 6374 | 0 | 0 |
| smith | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| smith | extensora | 11520 | 0 | 0 | 0 | 0 |
| smith | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| leg_press | biceps | 0 | 11520 | 0 | 0 | 0 |
| leg_press | crucifixo | 0 | 5393 | 6127 | 0 | 0 |
| leg_press | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| leg_press | extensora | 11520 | 0 | 0 | 0 | 0 |
| leg_press | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| leg_press | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| leg_press | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | crucifixo | 0 | 5410 | 6110 | 0 | 0 |
| cadeira_extensora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_extensora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | crucifixo | 0 | 5400 | 6120 | 0 | 0 |
| mesa_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| mesa_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| mesa_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | crucifixo | 0 | 5400 | 6120 | 0 | 0 |
| cadeira_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| paralelas | biceps | 0 | 11520 | 0 | 0 | 0 |
| paralelas | crucifixo | 0 | 4861 | 6659 | 0 | 0 |
| paralelas | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| paralelas | extensora | 11520 | 0 | 0 | 0 | 0 |
| paralelas | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| paralelas | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| paralelas | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | biceps | 0 | 11520 | 0 | 0 | 0 |
| step | crucifixo | 0 | 5424 | 6096 | 0 | 0 |
| step | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| step | extensora | 11520 | 0 | 0 | 0 | 0 |
| step | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| step | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | biceps | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | crucifixo | 0 | 5402 | 6118 | 0 | 0 |
| bola_suica | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | extensora | 11520 | 0 | 0 | 0 | 0 |
| bola_suica | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| bola_suica | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | biceps | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | crucifixo | 0 | 5391 | 6129 | 0 | 0 |
| barra_hexagonal | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_hexagonal | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_hexagonal | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | crucifixo | 0 | 5501 | 6019 | 0 | 0 |
| kettlebell | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | extensora | 11520 | 0 | 0 | 0 | 0 |
| kettlebell | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco_romano | biceps | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | crucifixo | 0 | 5421 | 6099 | 0 | 0 |
| banco_romano | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | extensora | 11520 | 0 | 0 | 0 | 0 |
| banco_romano | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco_romano | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| estacao_puxada | biceps | 0 | 7786 | 3734 | 0 | 0 |
| estacao_puxada | crucifixo | 0 | 5263 | 6257 | 0 | 0 |
| estacao_puxada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_puxada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_puxada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_puxada | puxar-horizontal | 0 | 6056 | 5464 | 0 | 0 |
| estacao_remada | biceps | 0 | 9054 | 2466 | 0 | 0 |
| estacao_remada | crucifixo | 0 | 5375 | 6145 | 0 | 0 |
| estacao_remada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_remada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_remada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_remada | puxar-vertical | 0 | 7828 | 3692 | 0 | 0 |
| multifuncional | biceps | 0 | 7263 | 4257 | 0 | 0 |
| multifuncional | crucifixo | 0 | 5292 | 6228 | 0 | 0 |
| multifuncional | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| multifuncional | extensora | 11520 | 0 | 0 | 0 | 0 |
| multifuncional | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| supino_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | crucifixo | 0 | 4335 | 7185 | 0 | 0 |
| supino_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| supino_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| supino_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| voador | biceps | 0 | 11520 | 0 | 0 | 0 |
| voador | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| voador | extensora | 11520 | 0 | 0 | 0 | 0 |
| voador | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| voador | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| voador | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | crucifixo | 0 | 5408 | 6112 | 0 | 0 |
| desenvolvimento_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| remada_articulada | biceps | 0 | 7850 | 3670 | 0 | 0 |
| remada_articulada | crucifixo | 0 | 5209 | 6311 | 0 | 0 |
| remada_articulada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| remada_articulada | extensora | 11520 | 0 | 0 | 0 | 0 |
| remada_articulada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| remada_articulada | puxar-vertical | 0 | 6038 | 5482 | 0 | 0 |
| graviton | biceps | 0 | 7875 | 3645 | 0 | 0 |
| graviton | crucifixo | 0 | 4469 | 7051 | 0 | 0 |
| graviton | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| graviton | extensora | 11520 | 0 | 0 | 0 | 0 |
| graviton | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| graviton | puxar-horizontal | 0 | 6185 | 5335 | 0 | 0 |
| rosca_maquina | crucifixo | 0 | 5464 | 6056 | 0 | 0 |
| rosca_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| rosca_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rosca_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | crucifixo | 0 | 6314 | 5206 | 0 | 0 |
| triceps_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| triceps_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| triceps_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | crucifixo | 0 | 5401 | 6119 | 0 | 0 |
| abdominal_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| abdominal_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| abdominal_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| hack | biceps | 0 | 11520 | 0 | 0 | 0 |
| hack | crucifixo | 0 | 5398 | 6122 | 0 | 0 |
| hack | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| hack | extensora | 11520 | 0 | 0 | 0 | 0 |
| hack | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| hack | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| hack | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | crucifixo | 0 | 5385 | 6135 | 0 | 0 |
| cadeira_abdutora_adutora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | crucifixo | 0 | 5347 | 6173 | 0 | 0 |
| gluteo_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| gluteo_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| gluteo_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | crucifixo | 0 | 5401 | 6119 | 0 | 0 |
| panturrilha_em_pe_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | crucifixo | 0 | 5417 | 6103 | 0 | 0 |
| panturrilha_sentada_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| suspensao | crucifixo | 0 | 5303 | 6217 | 0 | 0 |
| suspensao | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| suspensao | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| caneleiras | biceps | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | crucifixo | 0 | 5509 | 6011 | 0 | 0 |
| caneleiras | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| caneleiras | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| mini_band | biceps | 0 | 11520 | 0 | 0 | 0 |
| mini_band | crucifixo | 0 | 5414 | 6106 | 0 | 0 |
| mini_band | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| mini_band | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| mini_band | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| mini_band | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | biceps | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | crucifixo | 0 | 5402 | 6118 | 0 | 0 |
| roda_abdominal | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | extensora | 11520 | 0 | 0 | 0 | 0 |
| roda_abdominal | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| roda_abdominal | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra-porta+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| halteres+bola | crucifixo | 0 | 5466 | 6054 | 0 | 0 |
| halteres+bola | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | extensora | 11520 | 0 | 0 | 0 | 0 |
| step+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |

- Avisos que sugerem comprar algo, em todos os cenários: **0**.
- "Nenhum exercício possível" dito para um músculo que tinha exercício possível: **0**.
- Músculo com meta abaixo do limiar (a meta, se prioridade; senão, 4 séries) sem aviso: **726008**.
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
| vazio (= 10 outros) | 20 | 3 | 3 | 2,6 | 23,5% | 28 | 0% |
| vazio (= 10 outros) | 30 | 4 | 3,6 | 2,8 | 29,6% | 31 | 0% |
| vazio (= 10 outros) | 45 | 6 | 4,8 | 2,8 | 29,7% | 45 | 1,1% |
| vazio (= 10 outros) | 60 | 8 | 5,4 | 2,8 | 33,6% | 59 | 2,2% |
| vazio (= 10 outros) | 90 | 12 | 5,8 | 2,8 | 34,4% | 70 | 37,8% |
| estacao_polia_dupla | 20 | 3 | 3,3 | 2,5 | 16% | 31 | 0% |
| estacao_polia_dupla | 30 | 4 | 4 | 2,6 | 18,6% | 34 | 0% |
| estacao_polia_dupla | 45 | 6 | 5,6 | 2,6 | 18,8% | 45 | 0% |
| estacao_polia_dupla | 60 | 8 | 6,9 | 2,6 | 17,8% | 59 | 0% |
| estacao_polia_dupla | 90 | 12 | 7,9 | 2,6 | 20,4% | 82 | 18,3% |
| barra_fixa | 20 | 3 | 3,1 | 2,7 | 23,8% | 30 | 0% |
| barra_fixa | 30 | 4 | 3,9 | 2,8 | 29,8% | 31 | 0% |
| barra_fixa | 45 | 6 | 5,1 | 2,8 | 29,7% | 45 | 0,6% |
| barra_fixa | 60 | 8 | 6 | 2,8 | 30,1% | 59 | 1,1% |
| barra_fixa | 90 | 12 | 6,4 | 2,8 | 33,1% | 72 | 31,1% |
| halteres_fixos | 20 | 3 | 3,3 | 2,5 | 16,3% | 31 | 0% |
| halteres_fixos | 30 | 4 | 4 | 2,6 | 20,5% | 35 | 0% |
| halteres_fixos | 45 | 6 | 5,5 | 2,7 | 25,6% | 45 | 0% |
| halteres_fixos | 60 | 8 | 6,7 | 2,7 | 26,6% | 60 | 0% |
| halteres_fixos | 90 | 12 | 7,8 | 2,7 | 27,8% | 82 | 20,6% |
| anilhas_e_manoplas | 20 | 3 | 3,3 | 2,5 | 15,9% | 31 | 0% |
| anilhas_e_manoplas | 30 | 4 | 4,1 | 2,6 | 18,8% | 34 | 0% |
| anilhas_e_manoplas | 45 | 6 | 5,6 | 2,7 | 23,3% | 45 | 0% |
| anilhas_e_manoplas | 60 | 8 | 6,7 | 2,7 | 24,5% | 60 | 0% |
| anilhas_e_manoplas | 90 | 12 | 7,8 | 2,7 | 27,1% | 82 | 20,6% |
| barra_longa | 20 | 3 | 3,1 | 2,6 | 24,1% | 31 | 0% |
| barra_longa | 30 | 4 | 3,7 | 2,8 | 30,9% | 33 | 0% |
| barra_longa | 45 | 6 | 4,9 | 2,8 | 30,7% | 45 | 1,1% |
| barra_longa | 60 | 8 | 5,6 | 2,8 | 33,2% | 59 | 2,2% |
| barra_longa | 90 | 12 | 6 | 2,9 | 36,3% | 71 | 36,1% |
| barra_w | 20 | 3 | 3,2 | 2,6 | 24,7% | 28 | 0% |
| barra_w | 30 | 4 | 3,8 | 2,8 | 31,9% | 31 | 0% |
| barra_w | 45 | 6 | 5 | 2,9 | 34% | 45 | 0,6% |
| barra_w | 60 | 8 | 5,8 | 2,9 | 36% | 59 | 1,1% |
| barra_w | 90 | 12 | 6,3 | 2,9 | 37,5% | 72 | 32,8% |
| rack_de_agachamento | 20 | 3 | 3,1 | 2,7 | 23,8% | 30 | 0% |
| rack_de_agachamento | 30 | 4 | 3,8 | 2,8 | 29,7% | 31 | 0% |
| rack_de_agachamento | 45 | 6 | 5 | 2,8 | 30% | 45 | 0,6% |
| rack_de_agachamento | 60 | 8 | 5,8 | 2,8 | 32,2% | 59 | 1,1% |
| rack_de_agachamento | 90 | 12 | 6,3 | 2,9 | 35,4% | 74 | 33,3% |
| smith | 20 | 3 | 3,1 | 2,7 | 23,8% | 30 | 0% |
| smith | 30 | 4 | 3,8 | 2,8 | 30,2% | 30 | 0% |
| smith | 45 | 6 | 5 | 2,8 | 30,3% | 45 | 0,6% |
| smith | 60 | 8 | 5,8 | 2,8 | 32,6% | 58 | 1,1% |
| smith | 90 | 12 | 6,3 | 2,9 | 35,5% | 72 | 33,3% |
| leg_press | 20 | 3 | 3 | 2,6 | 23,1% | 27 | 0% |
| leg_press | 30 | 4 | 3,7 | 2,8 | 28,7% | 31 | 0% |
| leg_press | 45 | 6 | 4,8 | 2,8 | 28,5% | 45 | 1,1% |
| leg_press | 60 | 8 | 5,4 | 2,8 | 32,1% | 58 | 2,2% |
| leg_press | 90 | 12 | 5,8 | 2,8 | 34,4% | 68 | 40% |
| cadeira_extensora | 20 | 3 | 3,1 | 2,6 | 20,9% | 28 | 0% |
| cadeira_extensora | 30 | 4 | 3,7 | 2,7 | 24,8% | 30 | 0% |
| cadeira_extensora | 45 | 6 | 4,9 | 2,7 | 25,1% | 44 | 0% |
| cadeira_extensora | 60 | 8 | 5,6 | 2,7 | 27,2% | 59 | 10,6% |
| cadeira_extensora | 90 | 12 | 5,9 | 2,7 | 29,8% | 65 | 41,7% |
| mesa_flexora | 20 | 3 | 3 | 2,5 | 18,3% | 28 | 0% |
| mesa_flexora | 30 | 4 | 3,6 | 2,7 | 25,7% | 31 | 0% |
| mesa_flexora | 45 | 6 | 4,8 | 2,8 | 27,5% | 45 | 0% |
| mesa_flexora | 60 | 8 | 5,4 | 2,8 | 32,9% | 59 | 1,1% |
| mesa_flexora | 90 | 12 | 5,8 | 2,8 | 33,9% | 71 | 35,6% |
| cadeira_flexora | 20 | 3 | 3 | 2,5 | 18,3% | 28 | 0% |
| cadeira_flexora | 30 | 4 | 3,6 | 2,7 | 25,7% | 31 | 0% |
| cadeira_flexora | 45 | 6 | 4,8 | 2,8 | 27,5% | 45 | 0% |
| cadeira_flexora | 60 | 8 | 5,4 | 2,8 | 32,9% | 59 | 1,1% |
| cadeira_flexora | 90 | 12 | 5,8 | 2,8 | 33,9% | 71 | 35,6% |
| paralelas | 20 | 3 | 3 | 2,6 | 23,8% | 28 | 0% |
| paralelas | 30 | 4 | 3,6 | 2,8 | 29,5% | 31 | 0% |
| paralelas | 45 | 6 | 4,8 | 2,8 | 29,6% | 45 | 1,1% |
| paralelas | 60 | 8 | 5,4 | 2,8 | 33,5% | 59 | 2,2% |
| paralelas | 90 | 12 | 5,8 | 2,8 | 33,8% | 70 | 37,8% |
| elasticos | 20 | 3 | 3,3 | 2,5 | 17,6% | 32 | 0% |
| elasticos | 30 | 4 | 4 | 2,6 | 20,9% | 37 | 0% |
| elasticos | 45 | 6 | 5,7 | 2,6 | 17,3% | 45 | 0% |
| elasticos | 60 | 8 | 6,9 | 2,5 | 14,3% | 59 | 0% |
| elasticos | 90 | 12 | 8 | 2,5 | 14,6% | 81 | 23,9% |
| step | 20 | 3 | 3 | 2,6 | 22,9% | 31 | 0% |
| step | 30 | 4 | 3,6 | 2,7 | 28,3% | 32 | 0% |
| step | 45 | 6 | 4,8 | 2,8 | 28,2% | 45 | 0% |
| step | 60 | 8 | 5,4 | 2,8 | 33,1% | 59 | 2,2% |
| step | 90 | 12 | 5,8 | 2,8 | 34,4% | 72 | 37,2% |
| bola_suica | 20 | 3 | 3 | 2,6 | 23,1% | 28 | 0% |
| bola_suica | 30 | 4 | 3,6 | 2,8 | 28,2% | 31 | 0% |
| bola_suica | 45 | 6 | 4,8 | 2,8 | 28,8% | 45 | 0% |
| bola_suica | 60 | 8 | 5,4 | 2,8 | 31,9% | 59 | 2,2% |
| bola_suica | 90 | 12 | 5,8 | 2,8 | 32% | 67 | 42,8% |
| barra_hexagonal | 20 | 3 | 3 | 2,6 | 19,6% | 26 | 0% |
| barra_hexagonal | 30 | 4 | 3,6 | 2,8 | 27,9% | 30 | 0% |
| barra_hexagonal | 45 | 6 | 4,8 | 2,8 | 28,6% | 45 | 1,1% |
| barra_hexagonal | 60 | 8 | 5,5 | 2,7 | 29,5% | 57 | 6,1% |
| barra_hexagonal | 90 | 12 | 5,7 | 2,7 | 29,7% | 62 | 50,6% |
| kettlebell | 20 | 3 | 3,1 | 2,6 | 23,4% | 32 | 0% |
| kettlebell | 30 | 4 | 3,8 | 2,7 | 26,5% | 37 | 0% |
| kettlebell | 45 | 6 | 5,1 | 2,7 | 26,3% | 45 | 0% |
| kettlebell | 60 | 8 | 6,1 | 2,8 | 28,6% | 60 | 0,6% |
| kettlebell | 90 | 12 | 6,8 | 2,8 | 32,8% | 77 | 28,3% |
| banco_romano | 20 | 3 | 3 | 2,6 | 22,6% | 30 | 0% |
| banco_romano | 30 | 4 | 3,6 | 2,7 | 27,1% | 31 | 0% |
| banco_romano | 45 | 6 | 4,8 | 2,7 | 26,6% | 45 | 0% |
| banco_romano | 60 | 8 | 5,4 | 2,7 | 30,2% | 59 | 5% |
| banco_romano | 90 | 12 | 5,8 | 2,7 | 30,9% | 67 | 35,6% |
| estacao_puxada | 20 | 3 | 3,1 | 2,7 | 23,9% | 30 | 0% |
| estacao_puxada | 30 | 4 | 3,8 | 2,8 | 31,2% | 32 | 0% |
| estacao_puxada | 45 | 6 | 5 | 2,8 | 31% | 45 | 0,6% |
| estacao_puxada | 60 | 8 | 5,8 | 2,8 | 32,7% | 59 | 1,1% |
| estacao_puxada | 90 | 12 | 6,2 | 2,9 | 36% | 72 | 33,3% |
| estacao_remada | 20 | 3 | 3,2 | 2,6 | 23,3% | 31 | 0% |
| estacao_remada | 30 | 4 | 3,7 | 2,8 | 31,6% | 31 | 0% |
| estacao_remada | 45 | 6 | 5 | 2,8 | 30,6% | 45 | 0,6% |
| estacao_remada | 60 | 8 | 5,8 | 2,8 | 32,8% | 59 | 1,1% |
| estacao_remada | 90 | 12 | 6,2 | 2,9 | 36% | 72 | 33,9% |
| multifuncional | 20 | 3 | 3,3 | 2,6 | 19% | 30 | 0% |
| multifuncional | 30 | 4 | 3,9 | 2,7 | 24,6% | 31 | 0% |
| multifuncional | 45 | 6 | 5,2 | 2,8 | 27% | 45 | 0,6% |
| multifuncional | 60 | 8 | 6,1 | 2,7 | 28% | 59 | 1,1% |
| multifuncional | 90 | 12 | 6,5 | 2,8 | 31,4% | 73 | 31,1% |
| supino_maquina | 20 | 3 | 3 | 2,6 | 22,8% | 28 | 0% |
| supino_maquina | 30 | 4 | 3,7 | 2,8 | 29,1% | 31 | 0% |
| supino_maquina | 45 | 6 | 4,8 | 2,8 | 29,7% | 45 | 1,1% |
| supino_maquina | 60 | 8 | 5,4 | 2,8 | 33,1% | 59 | 2,2% |
| supino_maquina | 90 | 12 | 5,8 | 2,8 | 33,9% | 70 | 37,8% |
| voador | 20 | 3 | 3 | 2,6 | 24,1% | 28 | 0% |
| voador | 30 | 4 | 3,7 | 2,8 | 28,4% | 31 | 0% |
| voador | 45 | 6 | 5 | 2,7 | 26,4% | 45 | 0,6% |
| voador | 60 | 8 | 5,7 | 2,7 | 29,5% | 59 | 1,1% |
| voador | 90 | 12 | 6,1 | 2,7 | 30,6% | 70 | 37,8% |
| desenvolvimento_maquina | 20 | 3 | 3 | 2,6 | 23,5% | 28 | 0% |
| desenvolvimento_maquina | 30 | 4 | 3,6 | 2,8 | 29% | 31 | 0% |
| desenvolvimento_maquina | 45 | 6 | 4,8 | 2,8 | 29,7% | 45 | 1,1% |
| desenvolvimento_maquina | 60 | 8 | 5,4 | 2,8 | 33,6% | 59 | 2,2% |
| desenvolvimento_maquina | 90 | 12 | 5,8 | 2,8 | 34,4% | 70 | 37,8% |
| remada_articulada | 20 | 3 | 3,2 | 2,6 | 23,3% | 31 | 0% |
| remada_articulada | 30 | 4 | 3,7 | 2,8 | 31,6% | 31 | 0% |
| remada_articulada | 45 | 6 | 5 | 2,8 | 30,6% | 45 | 0,6% |
| remada_articulada | 60 | 8 | 5,8 | 2,8 | 32,8% | 59 | 1,1% |
| remada_articulada | 90 | 12 | 6,2 | 2,9 | 36% | 72 | 33,9% |
| graviton | 20 | 3 | 3,2 | 2,7 | 22,9% | 30 | 0% |
| graviton | 30 | 4 | 3,8 | 2,8 | 30,7% | 31 | 0% |
| graviton | 45 | 6 | 5 | 2,8 | 30,2% | 45 | 0,6% |
| graviton | 60 | 8 | 5,8 | 2,8 | 32% | 59 | 1,1% |
| graviton | 90 | 12 | 6,3 | 2,8 | 34,4% | 72 | 33,9% |
| rosca_maquina | 20 | 3 | 3,2 | 2,6 | 21,6% | 28 | 0% |
| rosca_maquina | 30 | 4 | 3,8 | 2,8 | 30,5% | 31 | 0% |
| rosca_maquina | 45 | 6 | 5 | 2,9 | 33,1% | 45 | 0,6% |
| rosca_maquina | 60 | 8 | 5,8 | 2,9 | 35,5% | 59 | 1,1% |
| rosca_maquina | 90 | 12 | 6,3 | 2,9 | 37,3% | 72 | 32,8% |
| triceps_maquina | 20 | 3 | 3 | 2,6 | 23,6% | 28 | 0% |
| triceps_maquina | 30 | 4 | 3,7 | 2,8 | 29,4% | 31 | 0% |
| triceps_maquina | 45 | 6 | 4,8 | 2,8 | 30,8% | 45 | 1,1% |
| triceps_maquina | 60 | 8 | 5,4 | 2,8 | 34,6% | 59 | 2,2% |
| triceps_maquina | 90 | 12 | 5,8 | 2,8 | 35,3% | 70 | 36,7% |
| abdominal_maquina | 20 | 3 | 3 | 2,6 | 23,2% | 28 | 0% |
| abdominal_maquina | 30 | 4 | 3,6 | 2,8 | 28,4% | 31 | 0% |
| abdominal_maquina | 45 | 6 | 4,8 | 2,8 | 29,4% | 45 | 1,1% |
| abdominal_maquina | 60 | 8 | 5,4 | 2,8 | 33,5% | 58 | 2,2% |
| abdominal_maquina | 90 | 12 | 5,8 | 2,8 | 34,3% | 70 | 37,8% |
| hack | 20 | 3 | 3 | 2,6 | 23,5% | 28 | 0% |
| hack | 30 | 4 | 3,6 | 2,8 | 29,6% | 31 | 0% |
| hack | 45 | 6 | 4,8 | 2,8 | 30% | 45 | 1,1% |
| hack | 60 | 8 | 5,4 | 2,8 | 33,9% | 58 | 2,2% |
| hack | 90 | 12 | 5,8 | 2,8 | 34,4% | 69 | 38,9% |
| cadeira_abdutora_adutora | 20 | 3 | 3 | 2,6 | 23,5% | 28 | 0% |
| cadeira_abdutora_adutora | 30 | 4 | 3,6 | 2,8 | 29,6% | 31 | 0% |
| cadeira_abdutora_adutora | 45 | 6 | 4,9 | 2,8 | 30,1% | 45 | 1,1% |
| cadeira_abdutora_adutora | 60 | 8 | 5,5 | 2,8 | 33,5% | 59 | 2,2% |
| cadeira_abdutora_adutora | 90 | 12 | 5,8 | 2,8 | 34,5% | 66 | 44,4% |
| gluteo_maquina | 20 | 3 | 2,9 | 2,6 | 23,3% | 26 | 0% |
| gluteo_maquina | 30 | 4 | 3,5 | 2,9 | 33% | 30 | 0% |
| gluteo_maquina | 45 | 6 | 4,7 | 2,8 | 32,7% | 45 | 1,1% |
| gluteo_maquina | 60 | 8 | 5,4 | 2,8 | 34,4% | 59 | 2,2% |
| gluteo_maquina | 90 | 12 | 5,8 | 2,8 | 34,4% | 70 | 37,8% |
| panturrilha_em_pe_maquina | 20 | 3 | 3 | 2,6 | 23,2% | 28 | 0% |
| panturrilha_em_pe_maquina | 30 | 4 | 3,7 | 2,8 | 28,5% | 31 | 0% |
| panturrilha_em_pe_maquina | 45 | 6 | 4,8 | 2,8 | 28,1% | 45 | 1,1% |
| panturrilha_em_pe_maquina | 60 | 8 | 5,4 | 2,8 | 31,8% | 58 | 2,2% |
| panturrilha_em_pe_maquina | 90 | 12 | 5,8 | 2,8 | 34,4% | 69 | 38,9% |
| panturrilha_sentada_maquina | 20 | 3 | 3 | 2,6 | 23,5% | 28 | 0% |
| panturrilha_sentada_maquina | 30 | 4 | 3,6 | 2,8 | 29,6% | 31 | 0% |
| panturrilha_sentada_maquina | 45 | 6 | 4,8 | 2,8 | 29% | 45 | 1,1% |
| panturrilha_sentada_maquina | 60 | 8 | 5,4 | 2,8 | 32,9% | 59 | 2,2% |
| panturrilha_sentada_maquina | 90 | 12 | 5,8 | 2,8 | 34,3% | 70 | 37,8% |
| suspensao | 20 | 3 | 3,1 | 2,7 | 23,6% | 30 | 0% |
| suspensao | 30 | 4 | 3,8 | 2,8 | 29% | 33 | 0% |
| suspensao | 45 | 6 | 5,2 | 2,8 | 29,5% | 45 | 0% |
| suspensao | 60 | 8 | 6,2 | 2,8 | 31,6% | 59 | 1,1% |
| suspensao | 90 | 12 | 6,8 | 2,8 | 33,2% | 74 | 32,2% |
| caneleiras | 20 | 3 | 3 | 2,6 | 23,3% | 28 | 0% |
| caneleiras | 30 | 4 | 3,7 | 2,8 | 26% | 30 | 0% |
| caneleiras | 45 | 6 | 5,1 | 2,8 | 29% | 45 | 0% |
| caneleiras | 60 | 8 | 6 | 2,7 | 27,5% | 58 | 5% |
| caneleiras | 90 | 12 | 6,5 | 2,8 | 30,8% | 72 | 32,8% |
| mini_band | 20 | 3 | 3,1 | 2,6 | 21,5% | 28 | 0% |
| mini_band | 30 | 4 | 3,7 | 2,7 | 24,6% | 31 | 0% |
| mini_band | 45 | 6 | 4,9 | 2,7 | 24% | 45 | 0% |
| mini_band | 60 | 8 | 5,6 | 2,7 | 27% | 58 | 7,2% |
| mini_band | 90 | 12 | 5,9 | 2,7 | 29,8% | 67 | 37,8% |
| roda_abdominal | 20 | 3 | 3 | 2,6 | 23,5% | 28 | 0% |
| roda_abdominal | 30 | 4 | 3,6 | 2,8 | 29,6% | 31 | 0% |
| roda_abdominal | 45 | 6 | 4,8 | 2,8 | 29,8% | 45 | 1,1% |
| roda_abdominal | 60 | 8 | 5,4 | 2,8 | 33,8% | 59 | 2,2% |
| roda_abdominal | 90 | 12 | 5,8 | 2,8 | 34,4% | 70 | 38,9% |
| barra-porta+elasticos | 20 | 3 | 3,3 | 2,5 | 17,8% | 32 | 0% |
| barra-porta+elasticos | 30 | 4 | 4 | 2,6 | 21,1% | 36 | 0% |
| barra-porta+elasticos | 45 | 6 | 5,7 | 2,6 | 17,5% | 45 | 0% |
| barra-porta+elasticos | 60 | 8 | 6,9 | 2,5 | 14,5% | 59 | 0% |
| barra-porta+elasticos | 90 | 12 | 8 | 2,5 | 14,7% | 81 | 23,9% |
| halteres+bola | 20 | 3 | 3,3 | 2,5 | 15,4% | 31 | 0% |
| halteres+bola | 30 | 4 | 4,1 | 2,6 | 18,5% | 34 | 0% |
| halteres+bola | 45 | 6 | 5,6 | 2,7 | 23,3% | 45 | 0% |
| halteres+bola | 60 | 8 | 6,7 | 2,7 | 24,2% | 59 | 0% |
| halteres+bola | 90 | 12 | 7,8 | 2,7 | 26,4% | 82 | 20,6% |
| suspensao+elasticos | 20 | 3 | 3,3 | 2,5 | 17,9% | 32 | 0% |
| suspensao+elasticos | 30 | 4 | 4 | 2,6 | 21,7% | 36 | 0% |
| suspensao+elasticos | 45 | 6 | 5,7 | 2,6 | 18,3% | 45 | 0% |
| suspensao+elasticos | 60 | 8 | 6,9 | 2,5 | 15,6% | 59 | 0% |
| suspensao+elasticos | 90 | 12 | 8 | 2,5 | 15,7% | 81 | 23,3% |
| banco+halteres-leves | 20 | 3 | 3,3 | 2,5 | 18,2% | 32 | 0% |
| banco+halteres-leves | 30 | 4 | 4 | 2,6 | 19,9% | 35 | 0% |
| banco+halteres-leves | 45 | 6 | 5,5 | 2,7 | 19,6% | 45 | 0% |
| banco+halteres-leves | 60 | 8 | 6,8 | 2,6 | 19,9% | 59 | 0% |
| banco+halteres-leves | 90 | 12 | 8 | 2,6 | 20,6% | 80 | 23,9% |
| step+elasticos | 20 | 3 | 3,3 | 2,5 | 17,6% | 33 | 0% |
| step+elasticos | 30 | 4 | 4 | 2,6 | 20,9% | 37 | 0% |
| step+elasticos | 45 | 6 | 5,7 | 2,6 | 17,2% | 45 | 0% |
| step+elasticos | 60 | 8 | 6,9 | 2,5 | 13,7% | 59 | 0% |
| step+elasticos | 90 | 12 | 8 | 2,5 | 14,6% | 81 | 23,9% |

## Guia: prescrições com animação, só cartão e sem nada

| cenário | com animação | só cartão de texto | sem guia nenhum |
| --- | ---: | ---: | ---: |
| vazio (= 10 outros) | 68,9% | 31,1% | 0% |
| estacao_polia_dupla | 79,7% | 12,2% | 8% |
| barra_fixa | 71,7% | 28,3% | 0% |
| halteres_fixos | 59,2% | 35,9% | 4,9% |
| anilhas_e_manoplas | 59,2% | 35,9% | 4,9% |
| barra_longa | 61,2% | 29,3% | 9,5% |
| barra_w | 62,5% | 28,6% | 8,9% |
| rack_de_agachamento | 62,6% | 27,6% | 9,8% |
| smith | 57,4% | 32,8% | 9,8% |
| leg_press | 60,5% | 20,6% | 18,9% |
| cadeira_extensora | 64,4% | 35,6% | 0% |
| mesa_flexora | 59% | 30,7% | 10,3% |
| cadeira_flexora | 59% | 41% | 0% |
| paralelas | 67,7% | 32,3% | 0% |
| elasticos | 74,8% | 25,2% | 0% |
| step | 78,2% | 21,8% | 0% |
| bola_suica | 71,3% | 28,7% | 0% |
| barra_hexagonal | 63,6% | 36,4% | 0% |
| kettlebell | 71,7% | 28,3% | 0% |
| banco_romano | 61,7% | 38,3% | 0% |
| estacao_puxada | 62,8% | 37,2% | 0% |
| estacao_remada | 65,1% | 34,9% | 0% |
| multifuncional | 61,3% | 38,7% | 0% |
| supino_maquina | 62,7% | 37,3% | 0% |
| voador | 64% | 36% | 0% |
| desenvolvimento_maquina | 64,7% | 35,3% | 0% |
| remada_articulada | 62,9% | 37,1% | 0% |
| graviton | 59,7% | 40,3% | 0% |
| rosca_maquina | 61,3% | 38,7% | 0% |
| triceps_maquina | 63,7% | 36,3% | 0% |
| abdominal_maquina | 63,8% | 36,2% | 0% |
| hack | 62,4% | 37,6% | 0% |
| cadeira_abdutora_adutora | 58,3% | 41,7% | 0% |
| gluteo_maquina | 58,5% | 41,5% | 0% |
| panturrilha_em_pe_maquina | 66,9% | 33,1% | 0% |
| panturrilha_sentada_maquina | 64,1% | 35,9% | 0% |
| suspensao | 82,8% | 17,2% | 0% |
| caneleiras | 56,7% | 43,3% | 0% |
| mini_band | 63,7% | 36,3% | 0% |
| roda_abdominal | 69,9% | 30,1% | 0% |
| barra-porta+elasticos | 75,7% | 24,3% | 0% |
| halteres+bola | 60,7% | 34,4% | 4,9% |
| suspensao+elasticos | 80,2% | 19,8% | 0% |
| banco+halteres-leves | 64% | 32,8% | 3,2% |
| step+elasticos | 81,6% | 18,4% | 0% |

## Segurança: o que sobra com dor, no inventário vazio e com um aparelho só

| cenário | dor | dias só com abdominal | dias de superior sem tronco nem braço | dias vazios | carrega a região | região que o dado não marca | exercícios que sobram |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| vazio (= 10 outros) | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| vazio (= 10 outros) | punho 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| vazio (= 10 outros) | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| vazio (= 10 outros) | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| vazio (= 10 outros) | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| vazio (= 10 outros) | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| estacao_polia_dupla | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-unilateral, remada-unilateral-polia, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, puxada-unilateral, remada-unilateral-polia, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| estacao_polia_dupla | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| estacao_polia_dupla | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas, triceps-frances-polia-unilateral |
| barra_fixa | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, barra-fixa, barra-fixa-negativa, barra-fixa-supinada, elevacao-joelhos, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| barra_fixa | punho 7 | 0 | 46 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-negativa, barra-fixa-supinada, bulgaro-peso-corpo, elevacao-joelhos, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| barra_fixa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| barra_fixa | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-negativa, barra-fixa-supinada, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| barra_fixa | cotovelo 7 | 0 | 67 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| barra_fixa | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, barra-fixa, barra-fixa-negativa, barra-fixa-supinada, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| halteres_fixos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, crucifixo-invertido-sentado, desenvolvimento-em-pe-halteres, desenvolvimento-unilateral, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| halteres_fixos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| halteres_fixos | ombro 7 | 0 | 61 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral |
| halteres_fixos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-joelho-deslizante, flexao-pes-elevados, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| halteres_fixos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres_fixos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| anilhas_e_manoplas | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, crucifixo-invertido-sentado, desenvolvimento-em-pe-halteres, desenvolvimento-unilateral, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| anilhas_e_manoplas | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| anilhas_e_manoplas | ombro 7 | 0 | 53 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral |
| anilhas_e_manoplas | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-joelho-deslizante, flexao-pes-elevados, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| anilhas_e_manoplas | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| anilhas_e_manoplas | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| barra_longa | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | punho 7 | 0 | 20 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, terra-romeno-barra |
| barra_longa | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| barra_longa | cotovelo 7 | 0 | 70 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, terra-romeno-barra |
| barra_longa | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| barra_w | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, rosca-barra-w |
| barra_w | punho 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| barra_w | ombro 7 | 0 | 27 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, rosca-barra-w |
| barra_w | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, rosca-barra-w |
| barra_w | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| barra_w | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, rosca-barra-w |
| rack_de_agachamento | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-invertida |
| rack_de_agachamento | punho 7 | 0 | 32 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, remada-invertida |
| rack_de_agachamento | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| rack_de_agachamento | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-invertida |
| rack_de_agachamento | cotovelo 7 | 0 | 67 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| rack_de_agachamento | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-invertida |
| smith | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-invertida |
| smith | punho 7 | 0 | 32 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, remada-invertida |
| smith | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| smith | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-invertida |
| smith | cotovelo 7 | 0 | 55 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| smith | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-invertida |
| leg_press | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-leg-press, pike, ponte-gluteo |
| leg_press | punho 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-chao, panturrilha-leg-press, ponte-gluteo |
| leg_press | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-chao, panturrilha-leg-press, ponte-gluteo |
| leg_press | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, leg-press, nordico, panturrilha-chao, panturrilha-leg-press, pike, ponte-gluteo |
| leg_press | cotovelo 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-chao, panturrilha-leg-press, ponte-gluteo |
| leg_press | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-leg-press, pike, ponte-gluteo |
| cadeira_extensora | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| cadeira_extensora | punho 7 | 0 | 50 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_extensora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_extensora | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| cadeira_extensora | cotovelo 7 | 0 | 50 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_extensora | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| mesa_flexora | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| mesa_flexora | punho 7 | 0 | 64 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| mesa_flexora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| mesa_flexora | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, mesa-flexora, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| mesa_flexora | cotovelo 7 | 0 | 64 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| mesa_flexora | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| cadeira_flexora | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| cadeira_flexora | punho 7 | 0 | 64 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_flexora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_flexora | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| cadeira_flexora | cotovelo 7 | 0 | 64 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_flexora | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| paralelas | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, elevacao-joelhos-paralelas, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, mergulho, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| paralelas | punho 7 | 0 | 7 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos-paralelas, flexao-joelho-deslizante, mergulho, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| paralelas | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| paralelas | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, mergulho, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| paralelas | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos-paralelas, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| paralelas | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, mergulho, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-elastico, remada-curvada-elastico, remada-elastico, remada-unilateral-elastico, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-acima, triceps-elastico-alto |
| elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, puxada-elastico, remada-curvada-elastico, remada-elastico, remada-unilateral-elastico, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-acima, triceps-elastico-alto |
| elasticos | ombro 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-alto |
| elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, rosca-martelo-elastico, triceps-elastico-acima, triceps-elastico-alto |
| elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, stiff-elastico |
| elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, rosca-martelo-elastico, triceps-elastico-acima, triceps-elastico-alto |
| step | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| step | punho 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| step | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| bola_suica | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| bola_suica | punho 7 | 0 | 56 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, ponte-pes-bola |
| bola_suica | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, ponte-pes-bola |
| bola_suica | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-bola, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, ponte-pes-bola |
| bola_suica | cotovelo 7 | 0 | 56 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, ponte-pes-bola |
| bola_suica | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| barra_hexagonal | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| barra_hexagonal | punho 7 | 0 | 36 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| barra_hexagonal | cotovelo 7 | 0 | 36 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| kettlebell | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, desenvolvimento-unilateral-kettlebell, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, ponte-kettlebell, remada-unilateral-kettlebell, rosca-kettlebell, stiff-kettlebell, stiff-unilateral-kettlebell, triceps-frances-kettlebell |
| kettlebell | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-kettlebell, agachamento-peso-corpo, desenvolvimento-unilateral-kettlebell, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, panturrilha-degrau, ponte-kettlebell, remada-unilateral-kettlebell, rosca-kettlebell, stiff-kettlebell, stiff-unilateral-kettlebell, triceps-frances-kettlebell |
| kettlebell | ombro 7 | 0 | 57 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-kettlebell, agachamento-peso-corpo, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, panturrilha-degrau, ponte-kettlebell, rosca-kettlebell, stiff-kettlebell, stiff-unilateral-kettlebell |
| kettlebell | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-kettlebell, agachamento-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, goblet-kettlebell, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-kettlebell, rosca-kettlebell, triceps-frances-kettlebell |
| kettlebell | cotovelo 7 | 0 | 79 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-kettlebell, agachamento-peso-corpo, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, panturrilha-degrau, ponte-kettlebell, stiff-kettlebell, stiff-unilateral-kettlebell |
| kettlebell | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-kettlebell, rosca-kettlebell, triceps-frances-kettlebell |
| banco_romano | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, hiperextensao, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| banco_romano | punho 7 | 0 | 56 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| banco_romano | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| banco_romano | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| banco_romano | cotovelo 7 | 0 | 56 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| banco_romano | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| estacao_puxada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-frente |
| estacao_puxada | punho 7 | 0 | 16 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, puxada-frente |
| estacao_puxada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| estacao_puxada | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-frente |
| estacao_puxada | cotovelo 7 | 0 | 67 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| estacao_puxada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-frente |
| estacao_remada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | punho 7 | 0 | 16 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| estacao_remada | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| estacao_remada | cotovelo 7 | 0 | 67 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| estacao_remada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| multifuncional | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | punho 7 | 0 | 97 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| multifuncional | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-frente |
| multifuncional | cotovelo 7 | 0 | 67 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| multifuncional | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-frente |
| supino_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, supino-maquina |
| supino_maquina | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, supino-maquina |
| supino_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| supino_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, supino-maquina |
| supino_maquina | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| supino_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, supino-maquina |
| voador | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, voador |
| voador | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, voador |
| voador | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| voador | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, voador |
| voador | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, voador |
| voador | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, voador |
| desenvolvimento_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, desenvolvimento-maquina, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| desenvolvimento_maquina | punho 7 | 0 | 12 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| desenvolvimento_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| desenvolvimento_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| desenvolvimento_maquina | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| desenvolvimento_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, desenvolvimento-maquina, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| remada_articulada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-articulada |
| remada_articulada | punho 7 | 0 | 16 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, remada-articulada |
| remada_articulada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| remada_articulada | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-articulada |
| remada_articulada | cotovelo 7 | 0 | 67 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| remada_articulada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-articulada |
| graviton | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, barra-fixa-graviton, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, mergulho-graviton, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| graviton | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, barra-fixa-graviton, bulgaro-peso-corpo, flexao-joelho-deslizante, mergulho-graviton, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| graviton | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| graviton | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, barra-fixa-graviton, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, mergulho-graviton, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| graviton | cotovelo 7 | 0 | 67 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| graviton | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, barra-fixa-graviton, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, mergulho-graviton, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| rosca_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, rosca-maquina |
| rosca_maquina | punho 7 | 0 | 25 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, rosca-maquina |
| rosca_maquina | ombro 7 | 0 | 27 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, rosca-maquina |
| rosca_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, rosca-maquina |
| rosca_maquina | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| rosca_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, rosca-maquina |
| triceps_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, triceps-maquina |
| triceps_maquina | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, triceps-maquina |
| triceps_maquina | ombro 7 | 0 | 181 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, triceps-maquina |
| triceps_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, triceps-maquina |
| triceps_maquina | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| triceps_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, triceps-maquina |
| abdominal_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-maquina, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| abdominal_maquina | punho 7 | 0 | 50 | 0 | 0 | 0 | abdominal-chao, abdominal-maquina, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| abdominal_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-maquina, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| abdominal_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| abdominal_maquina | cotovelo 7 | 0 | 50 | 0 | 0 | 0 | abdominal-chao, abdominal-maquina, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| abdominal_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| hack | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| hack | punho 7 | 0 | 43 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| hack | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| hack | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, hack, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| hack | cotovelo 7 | 0 | 43 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| hack | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-maquina, abertura-t-deitado, aducao-maquina, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| cadeira_abdutora_adutora | punho 7 | 0 | 48 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-maquina, abertura-t-deitado, aducao-maquina, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_abdutora_adutora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-maquina, aducao-maquina, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_abdutora_adutora | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-maquina, abertura-t-deitado, aducao-maquina, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| cadeira_abdutora_adutora | cotovelo 7 | 0 | 48 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-maquina, abertura-t-deitado, aducao-maquina, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-maquina, abertura-t-deitado, aducao-maquina, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| gluteo_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, coice-maquina, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike |
| gluteo_maquina | punho 7 | 0 | 50 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau |
| gluteo_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau |
| gluteo_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike |
| gluteo_maquina | cotovelo 7 | 0 | 50 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau |
| gluteo_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, coice-maquina, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike |
| panturrilha_em_pe_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_em_pe_maquina | punho 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_em_pe_maquina | cotovelo 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-degrau, panturrilha-sentada, pike, ponte-gluteo |
| panturrilha_sentada_maquina | punho 7 | 0 | 42 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-degrau, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-degrau, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-degrau, panturrilha-sentada, pike, ponte-gluteo |
| panturrilha_sentada_maquina | cotovelo 7 | 0 | 42 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-degrau, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-degrau, panturrilha-sentada, pike, ponte-gluteo |
| suspensao | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, face-pull-suspensao, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, face-pull-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| suspensao | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, face-pull-suspensao, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-suspensao, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | cotovelo 7 | 0 | 73 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, yt-suspensao |
| suspensao | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, face-pull-suspensao, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| caneleiras | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-caneleira, aducao-caneleira, coice-caneleira, crucifixo-invertido-caneleira, elevacao-lateral-caneleira, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike |
| caneleiras | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-caneleira, crucifixo-invertido-caneleira, elevacao-lateral-caneleira, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau |
| caneleiras | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-caneleira, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau |
| caneleiras | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-caneleira, crucifixo-invertido-caneleira, elevacao-lateral-caneleira, extensao-joelho-caneleira, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike |
| caneleiras | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-caneleira, crucifixo-invertido-caneleira, elevacao-lateral-caneleira, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau |
| caneleiras | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-caneleira, aducao-caneleira, coice-caneleira, crucifixo-invertido-caneleira, elevacao-lateral-caneleira, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike |
| mini_band | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-deitado-mini-band, abducao-mini-band, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| mini_band | punho 7 | 0 | 57 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-deitado-mini-band, abducao-mini-band, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, caminhada-lateral-mini-band, extensao-joelho-mini-band, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| mini_band | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-deitado-mini-band, abducao-mini-band, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, caminhada-lateral-mini-band, extensao-joelho-mini-band, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| mini_band | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-deitado-mini-band, abducao-mini-band, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, caminhada-lateral-mini-band, extensao-joelho-mini-band, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| mini_band | cotovelo 7 | 0 | 57 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-deitado-mini-band, abducao-mini-band, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, caminhada-lateral-mini-band, extensao-joelho-mini-band, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| mini_band | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-deitado-mini-band, abducao-mini-band, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| roda_abdominal | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, roda-abdominal |
| roda_abdominal | punho 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, roda-abdominal |
| roda_abdominal | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo |
| roda_abdominal | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| roda_abdominal | cotovelo 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abertura-t-deitado, aducao-deitado, afundo-peso-corpo, afundo-tras-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, roda-abdominal |
| roda_abdominal | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abertura-t-deitado, aducao-deitado, extensao-triceps-peso-corpo, flexao, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo |
| barra-porta+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, barra-fixa, barra-fixa-supinada, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-curvada-elastico, remada-elastico, remada-unilateral-elastico, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-acima, triceps-elastico-alto |
| barra-porta+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, remada-curvada-elastico, remada-elastico, remada-unilateral-elastico, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-acima, triceps-elastico-alto |
| barra-porta+elasticos | ombro 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-alto |
| barra-porta+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-elastico, rosca-elastico, rosca-martelo-elastico, triceps-elastico-acima, triceps-elastico-alto |
| barra-porta+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, elevacao-joelhos, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, stiff-elastico |
| barra-porta+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, barra-fixa, barra-fixa-supinada, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, remada-elastico, rosca-elastico, rosca-martelo-elastico, triceps-elastico-acima, triceps-elastico-alto |
| halteres+bola | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, crucifixo-invertido-sentado, desenvolvimento-em-pe-halteres, desenvolvimento-unilateral, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| halteres+bola | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, desenvolvimento-unilateral, elevacao-halteres, flexao-bola, goblet, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| halteres+bola | ombro 7 | 0 | 53 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-bola, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral |
| halteres+bola | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-bola, flexao-joelho-deslizante, flexao-pes-elevados, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| halteres+bola | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao-bola, goblet, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres+bola | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, supino-chao-halteres, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| suspensao+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-elastico, remada-curvada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-martelo-elastico, rosca-suspensao, stiff-elastico, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, puxada-elastico, remada-curvada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-martelo-elastico, rosca-suspensao, stiff-elastico, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | ombro 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-joelho-suspensao, panturrilha-chao, panturrilha-degrau, ponte-gluteo, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-alto |
| suspensao+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-joelho-suspensao, flexao-pes-elevados, nordico, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-martelo-elastico, rosca-suspensao, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, panturrilha-degrau, ponte-gluteo, stiff-elastico, yt-suspensao |
| suspensao+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-pes-elevados, panturrilha-chao, panturrilha-degrau, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-martelo-elastico, rosca-suspensao, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| banco+halteres-leves | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, crucifixo-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, desenvolvimento-em-pe-halteres, desenvolvimento-unilateral, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, remada-unilateral-sem-banco, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral, supino-reto, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| banco+halteres-leves | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, remada-unilateral-sem-banco, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, supino-reto, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| banco+halteres-leves | ombro 7 | 0 | 48 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, stiff, stiff-unilateral |
| banco+halteres-leves | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, supino-reto, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| banco+halteres-leves | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| banco+halteres-leves | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-halteres, crucifixo-invertido-sentado, elevacao-halteres, elevacao-lateral-deitado, elevacao-lateral-unilateral, flexao, panturrilha-chao, panturrilha-degrau, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-concentrada, rosca-martelo, supino-reto, triceps-frances-halter, triceps-frances-unilateral-halter, triceps-testa-halteres |
| step+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-pes-elevados, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-curvada-elastico, remada-elastico, remada-unilateral-elastico, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-acima, triceps-elastico-alto |
| step+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-curvada-elastico, remada-elastico, remada-unilateral-elastico, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-acima, triceps-elastico-alto |
| step+elasticos | ombro 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, rosca-elastico, rosca-martelo-elastico, stiff-elastico, triceps-elastico-alto |
| step+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-pes-elevados, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, rosca-martelo-elastico, triceps-elastico-acima, triceps-elastico-alto |
| step+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abdominal-invertido, abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, coice-elastico, crucifixo-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, stiff-elastico |
| step+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, abducao-elastico, abertura-elastico, aducao-deitado, coice-elastico, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, elevacao-lateral-unilateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-pes-elevados, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, rosca-martelo-elastico, triceps-elastico-acima, triceps-elastico-alto |

## Exemplos (3 por problema, de cenários diferentes)

### `dia.superior-sem-superior`

- **vazio · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (afundo-tras-peso-corpo, panturrilha-chao, flexao-joelho-deslizante).
  - Programa: Superior A (19 min): afundo-tras-peso-corpo 2, panturrilha-chao 3, flexao-joelho-deslizante 2 | Inferior A (24 min): agachamento-peso-corpo 2, bulgaro-peso-corpo 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **estacao_polia_dupla · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (afundo-tras-peso-corpo, panturrilha-chao, flexao-joelho-deslizante).
  - Programa: Superior A (19 min): afundo-tras-peso-corpo 2, panturrilha-chao 3, flexao-joelho-deslizante 2 | Inferior A (24 min): agachamento-peso-corpo 2, bulgaro-peso-corpo 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (afundo-tras-peso-corpo, panturrilha-chao, flexao-joelho-deslizante).
  - Programa: Superior A (19 min): afundo-tras-peso-corpo 2, panturrilha-chao 3, flexao-joelho-deslizante 2 | Inferior A (24 min): agachamento-peso-corpo 2, bulgaro-peso-corpo 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2

### `equilibrio.sem-posteriores`

- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (31 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (22 min): afundo-peso-corpo 2, flexao 2, remada-unilateral-polia 2
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (30 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **anilhas_e_manoplas · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (30 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2

### `equilibrio.sem-puxar`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `vaga.so-aviso-do-musculo.biceps`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (34 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `vaga.so-aviso-do-musculo.crucifixo`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · punho 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (22 min): agachamento-peso-corpo 2, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · punho 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (30 min): agachamento-peso-corpo 2, barra-fixa 4, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (28 min): goblet 2, stiff 2, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (21 min): afundo 2, flexao-joelho-deslizante 2, rosca-alternada 4

### `vaga.so-aviso-do-musculo.elevacao-lateral`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (34 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `vaga.so-aviso-do-musculo.puxar-horizontal`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (22 min): agachamento-peso-corpo 2, panturrilha-degrau 4, abdominal-chao 2 | Corpo todo B (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `vaga.so-aviso-do-musculo.puxar-vertical`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `volume.abaixo-sem-aviso`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (34 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `volume.zero.biceps`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `volume.zero.costas`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `volume.zero.ombro_lateral`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (31 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (22 min): afundo-peso-corpo 2, flexao 2, remada-unilateral-polia 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (34 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4

### `volume.zero.ombro_posterior`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (25 min): afundo-peso-corpo 3, flexao 2, flexao-joelho-deslizante 3

### `volume.zero.posteriores`

- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (31 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (22 min): afundo-peso-corpo 2, flexao 2, remada-unilateral-polia 2
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (30 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **anilhas_e_manoplas · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (30 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2, panturrilha-degrau 2, abdominal-chao 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2

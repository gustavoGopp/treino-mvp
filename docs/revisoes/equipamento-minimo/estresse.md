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
| `volume.abaixo-sem-aviso` | 1.130.990 |
| `vaga.so-aviso-do-musculo.elevacao-lateral` | 414.720 |
| `vaga.so-aviso-do-musculo.ombro-posterior` | 362.540 |
| `vaga.so-aviso-do-musculo.biceps` | 352.274 |
| `vaga.so-aviso-do-musculo.puxar-vertical` | 311.965 |
| `vaga.so-aviso-do-musculo.puxar-horizontal` | 310.428 |
| `vaga.so-aviso-do-musculo.triceps-acima-cabeca` | 220.941 |
| `vaga.so-aviso-do-musculo.crucifixo` | 202.346 |
| `dia.superior-sem-superior` | 184.898 |
| `equilibrio.sem-puxar` | 36.480 |
| `volume.zero.costas` | 36.480 |
| `volume.zero.ombro_posterior` | 36.480 |
| `volume.zero.biceps` | 33.642 |
| `volume.zero.ombro_lateral` | 21.064 |
| `equilibrio.sem-posteriores` | 210 |
| `volume.zero.posteriores` | 210 |

## Volume: séries semanais, média por cenário (todas as situações)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 6,7 | 10,9 | 7,3 | 4,3 |
| estacao_polia_dupla | 8,5 | 6,5 | 6 | 5,9 | 6,4 | 5,1 | 5,8 | 6,5 | 10,1 | 5,9 | 3,6 |
| barra_fixa | 6,2 | 5,4 | 0,7 | 1,6 | 2,7 | 4,8 | 6,1 | 6,6 | 10,4 | 6,6 | 4 |
| halteres_fixos | 6,5 | 4,8 | 6,1 | 4,3 | 7 | 6,6 | 5,6 | 7,7 | 10,6 | 6,8 | 3,5 |
| anilhas_e_manoplas | 6,5 | 4,8 | 6,2 | 4,4 | 7,1 | 6,7 | 5,6 | 7,7 | 10,6 | 6,9 | 3,5 |
| barra_longa | 6,3 | 2,4 | 0,7 | 1,2 | 1,2 | 5 | 6,1 | 7,4 | 11,1 | 6,9 | 4 |
| barra_w | 6,3 | 0 | 0,7 | 0 | 5,2 | 4,9 | 6,3 | 6,7 | 10,8 | 6,7 | 4,3 |
| rack_de_agachamento | 6,2 | 5,9 | 0,6 | 3 | 3 | 4,8 | 6,2 | 6,7 | 10,6 | 6,6 | 3,9 |
| smith | 6,2 | 5,9 | 0,6 | 3 | 3 | 4,8 | 6,2 | 6,7 | 10,6 | 6,6 | 3,9 |
| leg_press | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,7 | 11 | 7,3 | 4,4 |
| cadeira_extensora | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 7,5 | 6,8 | 10,1 | 7,2 | 4,3 |
| mesa_flexora | 6,4 | 0 | 0,7 | 0 | 0 | 5 | 6,4 | 7 | 9,5 | 7,3 | 4,3 |
| cadeira_flexora | 6,4 | 0 | 0,7 | 0 | 0 | 5 | 6,4 | 7 | 9,5 | 7,3 | 4,3 |
| paralelas | 7,2 | 0 | 0,7 | 0 | 0 | 6,1 | 6,3 | 6,7 | 10,7 | 7,1 | 4,3 |
| elasticos | 8 | 8 | 5,8 | 4,5 | 7,2 | 5,8 | 7 | 7,4 | 8,8 | 5,4 | 3,5 |
| step | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 6,7 | 10,9 | 7,2 | 4,3 |
| bola_suica | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,2 | 6,8 | 11,7 | 7,3 | 4,3 |
| barra_hexagonal | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,3 | 7,5 | 12,1 | 7,3 | 4,4 |
| kettlebell | 5,7 | 3,9 | 0,8 | 1,9 | 6,8 | 6,7 | 5,8 | 7,7 | 11 | 6,1 | 3,7 |
| banco_romano | 6,4 | 0 | 0,7 | 0 | 0 | 5 | 6,1 | 8 | 12,6 | 7,2 | 4,3 |
| estacao_puxada | 6,2 | 5,5 | 0,7 | 2,8 | 2,8 | 4,8 | 6,1 | 6,6 | 10,4 | 6,6 | 4 |
| estacao_remada | 6,4 | 3,4 | 0,7 | 1,7 | 1,7 | 5,1 | 6,2 | 6,7 | 10,7 | 6,8 | 4 |
| multifuncional | 6,3 | 6,7 | 0,7 | 3,3 | 3,3 | 5 | 6,2 | 6,7 | 10,7 | 6,6 | 3,9 |
| supino_maquina | 7,7 | 0 | 0,7 | 0 | 0 | 5,6 | 6,3 | 6,6 | 10,7 | 7,1 | 4,3 |
| voador | 9,7 | 0 | 0,7 | 0 | 0 | 4,1 | 6,1 | 6,6 | 10,5 | 7 | 4,3 |
| desenvolvimento_maquina | 6,5 | 0 | 0,8 | 0 | 0 | 5,2 | 6,3 | 6,6 | 10,7 | 7,2 | 4,3 |
| remada_articulada | 6,1 | 5,3 | 0,7 | 2,6 | 2,6 | 4,8 | 6,1 | 6,7 | 10,5 | 6,6 | 4 |
| graviton | 7,2 | 5,4 | 0,7 | 2,7 | 2,7 | 6,4 | 6 | 6,5 | 10,3 | 6,4 | 4 |
| rosca_maquina | 6,3 | 0 | 0,7 | 0 | 6,2 | 4,9 | 6,2 | 6,6 | 10,6 | 6,5 | 4,3 |
| triceps_maquina | 5,2 | 0 | 0,7 | 0 | 0 | 6,7 | 6,2 | 6,6 | 10,5 | 7,1 | 4,3 |
| abdominal_maquina | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 6,7 | 10,9 | 7,3 | 4,4 |
| hack | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,7 | 11 | 7,2 | 4,3 |
| cadeira_abdutora_adutora | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 6,7 | 11 | 7,3 | 4,4 |
| gluteo_maquina | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,7 | 10,8 | 7,3 | 4,4 |
| panturrilha_em_pe_maquina | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 6,7 | 10,9 | 7,4 | 4,3 |
| panturrilha_sentada_maquina | 6,4 | 0 | 0,7 | 0 | 0 | 5 | 6,4 | 6,7 | 10,9 | 8,2 | 4,3 |
| suspensao | 5 | 5,8 | 0,6 | 5,8 | 6,4 | 5,4 | 5,9 | 6,8 | 10,8 | 6,1 | 3,8 |
| caneleiras | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 7,4 | 6,7 | 10,2 | 7,1 | 4,3 |
| mini_band | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 6,7 | 10,9 | 7,3 | 4,4 |
| roda_abdominal | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 6,7 | 10,9 | 7,3 | 4,3 |
| barra-porta+elasticos | 8 | 8 | 5,9 | 5,3 | 7,3 | 5,8 | 7 | 7,4 | 8,8 | 5,4 | 3,5 |
| halteres+bola | 6,5 | 4,8 | 6,2 | 4,4 | 7,1 | 6,7 | 5,5 | 7,7 | 11,1 | 6,9 | 3,5 |
| suspensao+elasticos | 7,4 | 7,7 | 5,9 | 5,7 | 7,5 | 5,9 | 7 | 7,4 | 8,8 | 5,4 | 3,5 |
| banco+halteres-leves | 8,3 | 4,8 | 6,2 | 4,3 | 7 | 5,6 | 5,6 | 7,7 | 10,5 | 6,9 | 3,5 |
| step+elasticos | 7,9 | 8 | 5,8 | 4,5 | 7,2 | 5,8 | 7 | 7,4 | 8,7 | 5,3 | 3,4 |

### Sem dor: % dos programas com o músculo em 0 série na semana

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| estacao_polia_dupla | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 19,7% | 22,8% |
| barra_fixa | 0% | 0% | 34,8% | 0% | 0% | 0% | 0% | 0% | 0% | 12,4% | 12,6% |
| halteres_fixos | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 19,7% | 22,8% |
| anilhas_e_manoplas | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 19,7% | 22,8% |
| barra_longa | 0% | 33,3% | 36% | 33,3% | 33,3% | 0% | 0% | 0% | 0% | 11,2% | 10,8% |
| barra_w | 0% | 100% | 38,2% | 100% | 1,5% | 0% | 0% | 0% | 0% | 14% | 11,3% |
| rack_de_agachamento | 0% | 0% | 39,5% | 0% | 0% | 0% | 0% | 1% | 0% | 16% | 14,7% |
| smith | 0% | 0% | 39,5% | 0% | 0% | 0% | 0% | 1% | 0% | 16% | 14,7% |
| leg_press | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| cadeira_extensora | 0% | 100% | 38,2% | 100% | 100% | 0% | 0% | 0% | 0% | 12,1% | 11,5% |
| mesa_flexora | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| cadeira_flexora | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| paralelas | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 25% | 24,8% |
| step | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| bola_suica | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| barra_hexagonal | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| kettlebell | 0% | 0% | 44% | 0% | 0% | 0% | 0% | 1% | 0% | 19,7% | 18,2% |
| banco_romano | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| estacao_puxada | 0% | 0% | 34,8% | 0% | 0% | 0% | 0% | 0% | 0% | 12,4% | 12,6% |
| estacao_remada | 0% | 0% | 36,5% | 0% | 0% | 0% | 0% | 0% | 0% | 15% | 11% |
| multifuncional | 0% | 0% | 39,5% | 0% | 0% | 0% | 0% | 1% | 0% | 16% | 14,7% |
| supino_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| voador | 0% | 100% | 36,4% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| desenvolvimento_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| remada_articulada | 0% | 0% | 36,5% | 0% | 0% | 0% | 0% | 0% | 0% | 15% | 11% |
| graviton | 0% | 0% | 34,8% | 0% | 0% | 0% | 0% | 0% | 0% | 12,4% | 12,6% |
| rosca_maquina | 0% | 100% | 38,2% | 100% | 1,5% | 0% | 0% | 0% | 0% | 14% | 11,3% |
| triceps_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| abdominal_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| hack | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| cadeira_abdutora_adutora | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| gluteo_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| panturrilha_em_pe_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| panturrilha_sentada_maquina | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| suspensao | 0% | 0% | 44,7% | 0% | 0% | 0% | 0% | 1% | 0% | 19,7% | 20% |
| caneleiras | 0% | 100% | 38,2% | 100% | 100% | 0% | 0% | 0% | 0% | 12,1% | 11,5% |
| mini_band | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| roda_abdominal | 0% | 100% | 35,9% | 100% | 100% | 0% | 0% | 0% | 0% | 5,2% | 10,6% |
| barra-porta+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 25% | 24,8% |
| halteres+bola | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 19,7% | 22,8% |
| suspensao+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 25% | 24,8% |
| banco+halteres-leves | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 19,7% | 22,8% |
| step+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 25% | 24,8% |

## O que o app diz quando a vaga fica sem opção

Por programa e por função da divisão que ficou sem exercício possível por falta de equipamento (não por dor). "Aviso da vaga" = o texto da `lacuna` da função ("Sem cadeira extensora: …"). "Só aviso do músculo" = a vaga some e só aparece "Abaixo da meta semanal: costas 0 de 6". "Coberto" = outra vaga deu volume ao músculo. "Sem meta: nada" = o ombro anterior e os adutores não têm meta, então nada aparece.

| cenário | função | aviso da vaga | só aviso do músculo | coberto por outra vaga | sem meta: nada | nada |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | biceps | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | crucifixo | 0 | 5266 | 6254 | 0 | 0 |
| vazio (= 10 outros) | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | extensora | 11520 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| estacao_polia_dupla | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_fixa | biceps | 0 | 9699 | 1821 | 0 | 0 |
| barra_fixa | crucifixo | 0 | 5696 | 5824 | 0 | 0 |
| barra_fixa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_fixa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_fixa | ombro-posterior | 0 | 10584 | 936 | 0 | 0 |
| barra_fixa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_fixa | puxar-horizontal | 0 | 6243 | 5277 | 0 | 0 |
| barra_fixa | triceps-acima-cabeca | 0 | 6747 | 4773 | 0 | 0 |
| halteres_fixos | crucifixo | 0 | 4907 | 6613 | 0 | 0 |
| halteres_fixos | extensora | 11520 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | crucifixo | 0 | 4883 | 6637 | 0 | 0 |
| anilhas_e_manoplas | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_longa | biceps | 0 | 10808 | 712 | 0 | 0 |
| barra_longa | crucifixo | 0 | 5355 | 6165 | 0 | 0 |
| barra_longa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_longa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_longa | ombro-posterior | 0 | 9586 | 1934 | 0 | 0 |
| barra_longa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_longa | puxar-horizontal | 0 | 3840 | 0 | 0 | 0 |
| barra_longa | puxar-vertical | 0 | 9620 | 1900 | 0 | 0 |
| barra_longa | triceps-acima-cabeca | 0 | 6489 | 5031 | 0 | 0 |
| barra_w | crucifixo | 0 | 5445 | 6075 | 0 | 0 |
| barra_w | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_w | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_w | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| barra_w | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_w | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_w | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_w | triceps-acima-cabeca | 0 | 6548 | 4972 | 0 | 0 |
| rack_de_agachamento | biceps | 0 | 9324 | 2196 | 0 | 0 |
| rack_de_agachamento | crucifixo | 0 | 5655 | 5865 | 0 | 0 |
| rack_de_agachamento | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rack_de_agachamento | extensora | 11520 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | ombro-posterior | 0 | 6108 | 5412 | 0 | 0 |
| rack_de_agachamento | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | triceps-acima-cabeca | 0 | 6815 | 4705 | 0 | 0 |
| smith | biceps | 0 | 9324 | 2196 | 0 | 0 |
| smith | crucifixo | 0 | 5649 | 5871 | 0 | 0 |
| smith | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| smith | extensora | 11520 | 0 | 0 | 0 | 0 |
| smith | ombro-posterior | 0 | 6108 | 5412 | 0 | 0 |
| smith | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| smith | triceps-acima-cabeca | 0 | 6815 | 4705 | 0 | 0 |
| leg_press | biceps | 0 | 11520 | 0 | 0 | 0 |
| leg_press | crucifixo | 0 | 5249 | 6271 | 0 | 0 |
| leg_press | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| leg_press | extensora | 11520 | 0 | 0 | 0 | 0 |
| leg_press | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| leg_press | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| leg_press | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| leg_press | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| leg_press | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| cadeira_extensora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | crucifixo | 0 | 5273 | 6247 | 0 | 0 |
| cadeira_extensora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_extensora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | triceps-acima-cabeca | 0 | 6415 | 5105 | 0 | 0 |
| mesa_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | crucifixo | 0 | 5274 | 6246 | 0 | 0 |
| mesa_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| mesa_flexora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| mesa_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | triceps-acima-cabeca | 0 | 6409 | 5111 | 0 | 0 |
| cadeira_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | crucifixo | 0 | 5274 | 6246 | 0 | 0 |
| cadeira_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_flexora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | triceps-acima-cabeca | 0 | 6409 | 5111 | 0 | 0 |
| paralelas | biceps | 0 | 11520 | 0 | 0 | 0 |
| paralelas | crucifixo | 0 | 4579 | 6941 | 0 | 0 |
| paralelas | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| paralelas | extensora | 11520 | 0 | 0 | 0 | 0 |
| paralelas | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| paralelas | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| paralelas | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| paralelas | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| paralelas | triceps-acima-cabeca | 0 | 5148 | 6372 | 0 | 0 |
| elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | biceps | 0 | 11520 | 0 | 0 | 0 |
| step | crucifixo | 0 | 5278 | 6242 | 0 | 0 |
| step | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| step | extensora | 11520 | 0 | 0 | 0 | 0 |
| step | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| step | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| step | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| step | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| bola_suica | biceps | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | crucifixo | 0 | 5265 | 6255 | 0 | 0 |
| bola_suica | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | extensora | 11520 | 0 | 0 | 0 | 0 |
| bola_suica | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| bola_suica | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | triceps-acima-cabeca | 0 | 6406 | 5114 | 0 | 0 |
| barra_hexagonal | biceps | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | crucifixo | 0 | 5256 | 6264 | 0 | 0 |
| barra_hexagonal | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_hexagonal | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_hexagonal | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| kettlebell | crucifixo | 0 | 5798 | 5722 | 0 | 0 |
| kettlebell | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | extensora | 11520 | 0 | 0 | 0 | 0 |
| kettlebell | ombro-posterior | 0 | 7946 | 3574 | 0 | 0 |
| kettlebell | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco_romano | biceps | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | crucifixo | 0 | 5295 | 6225 | 0 | 0 |
| banco_romano | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | extensora | 11520 | 0 | 0 | 0 | 0 |
| banco_romano | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco_romano | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | triceps-acima-cabeca | 0 | 6418 | 5102 | 0 | 0 |
| estacao_puxada | biceps | 0 | 9672 | 1848 | 0 | 0 |
| estacao_puxada | crucifixo | 0 | 5700 | 5820 | 0 | 0 |
| estacao_puxada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_puxada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_puxada | ombro-posterior | 0 | 6603 | 4917 | 0 | 0 |
| estacao_puxada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_puxada | puxar-horizontal | 0 | 6106 | 5414 | 0 | 0 |
| estacao_puxada | triceps-acima-cabeca | 0 | 6748 | 4772 | 0 | 0 |
| estacao_remada | biceps | 0 | 10471 | 1049 | 0 | 0 |
| estacao_remada | crucifixo | 0 | 5337 | 6183 | 0 | 0 |
| estacao_remada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_remada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_remada | ombro-posterior | 0 | 8725 | 2795 | 0 | 0 |
| estacao_remada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_remada | puxar-vertical | 0 | 8074 | 3446 | 0 | 0 |
| estacao_remada | triceps-acima-cabeca | 0 | 6405 | 5115 | 0 | 0 |
| multifuncional | biceps | 0 | 8415 | 3105 | 0 | 0 |
| multifuncional | crucifixo | 0 | 5500 | 6020 | 0 | 0 |
| multifuncional | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| multifuncional | extensora | 11520 | 0 | 0 | 0 | 0 |
| multifuncional | ombro-posterior | 0 | 5079 | 6441 | 0 | 0 |
| multifuncional | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| multifuncional | triceps-acima-cabeca | 0 | 6584 | 4936 | 0 | 0 |
| supino_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | crucifixo | 0 | 4128 | 7392 | 0 | 0 |
| supino_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| supino_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| supino_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | triceps-acima-cabeca | 0 | 6008 | 5512 | 0 | 0 |
| voador | biceps | 0 | 11520 | 0 | 0 | 0 |
| voador | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| voador | extensora | 11520 | 0 | 0 | 0 | 0 |
| voador | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| voador | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| voador | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| voador | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| voador | triceps-acima-cabeca | 0 | 7239 | 4281 | 0 | 0 |
| desenvolvimento_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | crucifixo | 0 | 5266 | 6254 | 0 | 0 |
| desenvolvimento_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| remada_articulada | biceps | 0 | 9837 | 1683 | 0 | 0 |
| remada_articulada | crucifixo | 0 | 5669 | 5851 | 0 | 0 |
| remada_articulada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| remada_articulada | extensora | 11520 | 0 | 0 | 0 | 0 |
| remada_articulada | ombro-posterior | 0 | 7086 | 4434 | 0 | 0 |
| remada_articulada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| remada_articulada | puxar-vertical | 0 | 6271 | 5249 | 0 | 0 |
| remada_articulada | triceps-acima-cabeca | 0 | 6810 | 4710 | 0 | 0 |
| graviton | biceps | 0 | 9764 | 1756 | 0 | 0 |
| graviton | crucifixo | 0 | 4580 | 6940 | 0 | 0 |
| graviton | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| graviton | extensora | 11520 | 0 | 0 | 0 | 0 |
| graviton | ombro-posterior | 0 | 6715 | 4805 | 0 | 0 |
| graviton | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| graviton | puxar-horizontal | 0 | 6239 | 5281 | 0 | 0 |
| graviton | triceps-acima-cabeca | 0 | 4693 | 6827 | 0 | 0 |
| rosca_maquina | crucifixo | 0 | 5440 | 6080 | 0 | 0 |
| rosca_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| rosca_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rosca_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | triceps-acima-cabeca | 0 | 6550 | 4970 | 0 | 0 |
| triceps_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | crucifixo | 0 | 6289 | 5231 | 0 | 0 |
| triceps_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| triceps_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| triceps_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | triceps-acima-cabeca | 0 | 3866 | 7654 | 0 | 0 |
| abdominal_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | crucifixo | 0 | 5256 | 6264 | 0 | 0 |
| abdominal_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| abdominal_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| abdominal_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| hack | biceps | 0 | 11520 | 0 | 0 | 0 |
| hack | crucifixo | 0 | 5254 | 6266 | 0 | 0 |
| hack | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| hack | extensora | 11520 | 0 | 0 | 0 | 0 |
| hack | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| hack | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| hack | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| hack | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| hack | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| cadeira_abdutora_adutora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | crucifixo | 0 | 5256 | 6264 | 0 | 0 |
| cadeira_abdutora_adutora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| gluteo_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | crucifixo | 0 | 5209 | 6311 | 0 | 0 |
| gluteo_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| gluteo_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| gluteo_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | triceps-acima-cabeca | 0 | 6403 | 5117 | 0 | 0 |
| panturrilha_em_pe_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | crucifixo | 0 | 5264 | 6256 | 0 | 0 |
| panturrilha_em_pe_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| panturrilha_sentada_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | crucifixo | 0 | 5296 | 6224 | 0 | 0 |
| panturrilha_sentada_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | triceps-acima-cabeca | 0 | 6430 | 5090 | 0 | 0 |
| suspensao | crucifixo | 0 | 6825 | 4695 | 0 | 0 |
| suspensao | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| suspensao | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| suspensao | triceps-acima-cabeca | 0 | 5694 | 5826 | 0 | 0 |
| caneleiras | biceps | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | crucifixo | 0 | 5274 | 6246 | 0 | 0 |
| caneleiras | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| caneleiras | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| caneleiras | triceps-acima-cabeca | 0 | 6415 | 5105 | 0 | 0 |
| mini_band | biceps | 0 | 11520 | 0 | 0 | 0 |
| mini_band | crucifixo | 0 | 5265 | 6255 | 0 | 0 |
| mini_band | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| mini_band | extensora | 11520 | 0 | 0 | 0 | 0 |
| mini_band | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| mini_band | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| mini_band | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| mini_band | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| mini_band | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| roda_abdominal | biceps | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | crucifixo | 0 | 5264 | 6256 | 0 | 0 |
| roda_abdominal | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | extensora | 11520 | 0 | 0 | 0 | 0 |
| roda_abdominal | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| roda_abdominal | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| roda_abdominal | triceps-acima-cabeca | 0 | 6407 | 5113 | 0 | 0 |
| barra-porta+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| halteres+bola | crucifixo | 0 | 4877 | 6643 | 0 | 0 |
| halteres+bola | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | extensora | 11520 | 0 | 0 | 0 | 0 |
| step+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |

- Avisos que sugerem comprar algo, em todos os cenários: **0**.
- "Nenhum exercício possível" dito para um músculo que tinha exercício possível: **0**.
- Músculo com meta abaixo do limiar (a meta, se prioridade; senão, 4 séries) sem aviso: **1130990**.
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
| vazio (= 10 outros) | 20 | 3 | 2,5 | 2,7 | 26,8% | 23 | 0% |
| vazio (= 10 outros) | 30 | 4 | 3,2 | 2,7 | 24,5% | 30 | 0% |
| vazio (= 10 outros) | 45 | 6 | 4,1 | 2,7 | 23,9% | 44 | 5% |
| vazio (= 10 outros) | 60 | 8 | 4,5 | 2,7 | 23,7% | 54 | 18,3% |
| vazio (= 10 outros) | 90 | 12 | 4,5 | 2,7 | 24,2% | 55 | 68,3% |
| estacao_polia_dupla | 20 | 3 | 2,8 | 2,6 | 17,6% | 27 | 0% |
| estacao_polia_dupla | 30 | 4 | 3,7 | 2,6 | 18% | 30 | 0% |
| estacao_polia_dupla | 45 | 6 | 5,4 | 2,6 | 16,6% | 45 | 0% |
| estacao_polia_dupla | 60 | 8 | 6,7 | 2,5 | 15,2% | 59 | 0,6% |
| estacao_polia_dupla | 90 | 12 | 7,4 | 2,5 | 18,3% | 71 | 30,6% |
| barra_fixa | 20 | 3 | 2,6 | 2,8 | 27,6% | 25 | 0% |
| barra_fixa | 30 | 4 | 3,3 | 2,8 | 29,4% | 30 | 0% |
| barra_fixa | 45 | 6 | 4,2 | 2,8 | 28,3% | 44 | 1,1% |
| barra_fixa | 60 | 8 | 4,6 | 2,8 | 29,2% | 57 | 15,6% |
| barra_fixa | 90 | 12 | 4,7 | 2,8 | 30,4% | 61 | 57,2% |
| halteres_fixos | 20 | 3 | 2,8 | 2,6 | 19,3% | 28 | 0% |
| halteres_fixos | 30 | 4 | 3,8 | 2,7 | 20,2% | 33 | 0% |
| halteres_fixos | 45 | 6 | 5,5 | 2,7 | 19,8% | 45 | 0% |
| halteres_fixos | 60 | 8 | 6,6 | 2,6 | 19,5% | 59 | 5,6% |
| halteres_fixos | 90 | 12 | 7,3 | 2,6 | 19,6% | 73 | 29,4% |
| anilhas_e_manoplas | 20 | 3 | 2,9 | 2,5 | 18,7% | 28 | 0% |
| anilhas_e_manoplas | 30 | 4 | 3,8 | 2,6 | 17,7% | 32 | 0% |
| anilhas_e_manoplas | 45 | 6 | 5,5 | 2,6 | 15,2% | 45 | 0% |
| anilhas_e_manoplas | 60 | 8 | 6,7 | 2,6 | 15,5% | 59 | 5,6% |
| anilhas_e_manoplas | 90 | 12 | 7,3 | 2,6 | 19,2% | 73 | 29,4% |
| barra_longa | 20 | 3 | 2,6 | 2,8 | 30,5% | 26 | 0% |
| barra_longa | 30 | 4 | 3,3 | 2,7 | 27,1% | 32 | 0% |
| barra_longa | 45 | 6 | 4,1 | 2,8 | 27,5% | 45 | 3,3% |
| barra_longa | 60 | 8 | 4,5 | 2,7 | 28,5% | 56 | 17,2% |
| barra_longa | 90 | 12 | 4,6 | 2,7 | 28,7% | 57 | 62,8% |
| barra_w | 20 | 3 | 2,6 | 2,7 | 25,5% | 25 | 0% |
| barra_w | 30 | 4 | 3,4 | 2,8 | 26,5% | 30 | 0% |
| barra_w | 45 | 6 | 4,3 | 2,8 | 25,7% | 44 | 1,1% |
| barra_w | 60 | 8 | 4,9 | 2,7 | 25,1% | 57 | 16,7% |
| barra_w | 90 | 12 | 5 | 2,7 | 26,2% | 59 | 61,1% |
| rack_de_agachamento | 20 | 3 | 2,5 | 2,9 | 33,5% | 25 | 0% |
| rack_de_agachamento | 30 | 4 | 3,3 | 2,8 | 29,4% | 30 | 0% |
| rack_de_agachamento | 45 | 6 | 4,2 | 2,8 | 27,3% | 44 | 1,1% |
| rack_de_agachamento | 60 | 8 | 4,7 | 2,7 | 27,6% | 57 | 15,6% |
| rack_de_agachamento | 90 | 12 | 4,9 | 2,8 | 29% | 61 | 55% |
| smith | 20 | 3 | 2,5 | 2,9 | 33,5% | 25 | 0% |
| smith | 30 | 4 | 3,3 | 2,8 | 29,4% | 30 | 0% |
| smith | 45 | 6 | 4,2 | 2,8 | 27,8% | 44 | 1,1% |
| smith | 60 | 8 | 4,7 | 2,7 | 27,6% | 56 | 15,6% |
| smith | 90 | 12 | 4,9 | 2,8 | 29% | 60 | 56,1% |
| leg_press | 20 | 3 | 2,5 | 2,7 | 25,9% | 23 | 0% |
| leg_press | 30 | 4 | 3,2 | 2,7 | 24,4% | 30 | 0% |
| leg_press | 45 | 6 | 4,1 | 2,7 | 21,8% | 44 | 6,1% |
| leg_press | 60 | 8 | 4,5 | 2,6 | 22,6% | 54 | 20% |
| leg_press | 90 | 12 | 4,5 | 2,7 | 24,2% | 54 | 72,2% |
| cadeira_extensora | 20 | 3 | 2,5 | 2,7 | 24% | 23 | 0% |
| cadeira_extensora | 30 | 4 | 3,2 | 2,7 | 22,8% | 30 | 0% |
| cadeira_extensora | 45 | 6 | 4,3 | 2,6 | 17,9% | 44 | 1,1% |
| cadeira_extensora | 60 | 8 | 4,8 | 2,5 | 18,3% | 53 | 17,8% |
| cadeira_extensora | 90 | 12 | 4,9 | 2,5 | 18,9% | 55 | 70% |
| mesa_flexora | 20 | 3 | 2,5 | 2,6 | 19,4% | 23 | 0% |
| mesa_flexora | 30 | 4 | 3,2 | 2,6 | 19,7% | 30 | 0% |
| mesa_flexora | 45 | 6 | 4,1 | 2,6 | 20,3% | 44 | 2,8% |
| mesa_flexora | 60 | 8 | 4,5 | 2,6 | 22,5% | 55 | 16,1% |
| mesa_flexora | 90 | 12 | 4,6 | 2,6 | 23,7% | 56 | 65,6% |
| cadeira_flexora | 20 | 3 | 2,5 | 2,6 | 19,4% | 23 | 0% |
| cadeira_flexora | 30 | 4 | 3,2 | 2,6 | 19,7% | 30 | 0% |
| cadeira_flexora | 45 | 6 | 4,1 | 2,6 | 20,3% | 44 | 2,8% |
| cadeira_flexora | 60 | 8 | 4,5 | 2,6 | 22,5% | 55 | 16,1% |
| cadeira_flexora | 90 | 12 | 4,6 | 2,6 | 23,7% | 56 | 65,6% |
| paralelas | 20 | 3 | 2,5 | 2,7 | 26,9% | 25 | 0% |
| paralelas | 30 | 4 | 3,2 | 2,7 | 24,3% | 30 | 0% |
| paralelas | 45 | 6 | 4,1 | 2,7 | 23,4% | 44 | 5,6% |
| paralelas | 60 | 8 | 4,5 | 2,6 | 23,2% | 54 | 19,4% |
| paralelas | 90 | 12 | 4,6 | 2,6 | 23,6% | 55 | 70,6% |
| elasticos | 20 | 3 | 2,9 | 2,6 | 19,2% | 27 | 0% |
| elasticos | 30 | 4 | 3,8 | 2,6 | 21,2% | 33 | 0% |
| elasticos | 45 | 6 | 5,6 | 2,6 | 15,7% | 45 | 0% |
| elasticos | 60 | 8 | 6,9 | 2,5 | 14,5% | 59 | 0% |
| elasticos | 90 | 12 | 7,8 | 2,5 | 15,8% | 75 | 27,2% |
| step | 20 | 3 | 2,5 | 2,7 | 25,3% | 23 | 0% |
| step | 30 | 4 | 3,2 | 2,7 | 23,6% | 30 | 0% |
| step | 45 | 6 | 4,1 | 2,7 | 22,3% | 44 | 3,9% |
| step | 60 | 8 | 4,4 | 2,7 | 23,7% | 56 | 17,8% |
| step | 90 | 12 | 4,5 | 2,7 | 24,2% | 56 | 66,1% |
| bola_suica | 20 | 3 | 2,5 | 2,7 | 25,6% | 25 | 0% |
| bola_suica | 30 | 4 | 3,2 | 2,7 | 21,9% | 30 | 0% |
| bola_suica | 45 | 6 | 4,2 | 2,6 | 21% | 44 | 2,8% |
| bola_suica | 60 | 8 | 4,5 | 2,6 | 21,8% | 54 | 18,3% |
| bola_suica | 90 | 12 | 4,6 | 2,6 | 22,1% | 54 | 68,3% |
| barra_hexagonal | 20 | 3 | 2,5 | 2,7 | 23% | 22 | 0% |
| barra_hexagonal | 30 | 4 | 3,2 | 2,7 | 23% | 30 | 0% |
| barra_hexagonal | 45 | 6 | 4,1 | 2,6 | 22,2% | 43 | 5% |
| barra_hexagonal | 60 | 8 | 4,5 | 2,6 | 21% | 53 | 22,2% |
| barra_hexagonal | 90 | 12 | 4,5 | 2,6 | 21,4% | 53 | 76,1% |
| kettlebell | 20 | 3 | 2,6 | 2,8 | 30,5% | 27 | 0% |
| kettlebell | 30 | 4 | 3,5 | 2,7 | 25,4% | 32 | 0% |
| kettlebell | 45 | 6 | 4,8 | 2,7 | 22,8% | 45 | 0% |
| kettlebell | 60 | 8 | 5,5 | 2,6 | 23,6% | 58 | 8,3% |
| kettlebell | 90 | 12 | 5,8 | 2,7 | 24,7% | 64 | 46,1% |
| banco_romano | 20 | 3 | 2,5 | 2,7 | 25,5% | 27 | 0% |
| banco_romano | 30 | 4 | 3,2 | 2,6 | 20,9% | 30 | 0% |
| banco_romano | 45 | 6 | 4,1 | 2,6 | 19,8% | 44 | 3,9% |
| banco_romano | 60 | 8 | 4,5 | 2,6 | 22,2% | 55 | 17,8% |
| banco_romano | 90 | 12 | 4,6 | 2,6 | 22,7% | 56 | 70% |
| estacao_puxada | 20 | 3 | 2,6 | 2,8 | 31,6% | 25 | 0% |
| estacao_puxada | 30 | 4 | 3,3 | 2,8 | 31,4% | 30 | 0% |
| estacao_puxada | 45 | 6 | 4,2 | 2,8 | 28,9% | 44 | 1,1% |
| estacao_puxada | 60 | 8 | 4,6 | 2,8 | 29,2% | 57 | 15,6% |
| estacao_puxada | 90 | 12 | 4,7 | 2,8 | 30,4% | 61 | 54,4% |
| estacao_remada | 20 | 3 | 2,6 | 2,8 | 30% | 25 | 0% |
| estacao_remada | 30 | 4 | 3,3 | 2,8 | 30,7% | 30 | 0% |
| estacao_remada | 45 | 6 | 4,1 | 2,8 | 29,4% | 44 | 1,1% |
| estacao_remada | 60 | 8 | 4,6 | 2,8 | 30,1% | 55 | 18,9% |
| estacao_remada | 90 | 12 | 4,7 | 2,8 | 30,6% | 58 | 58,3% |
| multifuncional | 20 | 3 | 2,8 | 2,7 | 23,5% | 25 | 0% |
| multifuncional | 30 | 4 | 3,5 | 2,7 | 24,1% | 30 | 0% |
| multifuncional | 45 | 6 | 4,5 | 2,7 | 23,8% | 44 | 1,1% |
| multifuncional | 60 | 8 | 5 | 2,7 | 24,3% | 57 | 13,3% |
| multifuncional | 90 | 12 | 5,2 | 2,7 | 25,7% | 60 | 55% |
| supino_maquina | 20 | 3 | 2,6 | 2,7 | 24% | 23 | 0% |
| supino_maquina | 30 | 4 | 3,3 | 2,7 | 22,1% | 30 | 0% |
| supino_maquina | 45 | 6 | 4,2 | 2,6 | 21,9% | 44 | 5,6% |
| supino_maquina | 60 | 8 | 4,5 | 2,6 | 22% | 54 | 18,3% |
| supino_maquina | 90 | 12 | 4,6 | 2,6 | 22,5% | 55 | 68,3% |
| voador | 20 | 3 | 2,6 | 2,7 | 24,8% | 23 | 0% |
| voador | 30 | 4 | 3,3 | 2,7 | 21,7% | 30 | 0% |
| voador | 45 | 6 | 4,4 | 2,6 | 20,4% | 44 | 5% |
| voador | 60 | 8 | 4,8 | 2,6 | 21,5% | 55 | 13,9% |
| voador | 90 | 12 | 4,9 | 2,6 | 21,9% | 55 | 67,8% |
| desenvolvimento_maquina | 20 | 3 | 2,5 | 2,7 | 26,8% | 23 | 0% |
| desenvolvimento_maquina | 30 | 4 | 3,2 | 2,7 | 24,5% | 30 | 0% |
| desenvolvimento_maquina | 45 | 6 | 4,1 | 2,7 | 23,9% | 44 | 5% |
| desenvolvimento_maquina | 60 | 8 | 4,5 | 2,7 | 23,7% | 54 | 18,3% |
| desenvolvimento_maquina | 90 | 12 | 4,5 | 2,7 | 24,2% | 55 | 68,3% |
| remada_articulada | 20 | 3 | 2,6 | 2,8 | 30% | 25 | 0% |
| remada_articulada | 30 | 4 | 3,3 | 2,8 | 30,7% | 30 | 0% |
| remada_articulada | 45 | 6 | 4,1 | 2,8 | 29,4% | 44 | 1,1% |
| remada_articulada | 60 | 8 | 4,6 | 2,8 | 30,1% | 55 | 18,9% |
| remada_articulada | 90 | 12 | 4,7 | 2,8 | 30,6% | 58 | 58,3% |
| graviton | 20 | 3 | 2,7 | 2,8 | 29,8% | 27 | 0% |
| graviton | 30 | 4 | 3,4 | 2,8 | 28,3% | 30 | 0% |
| graviton | 45 | 6 | 4,2 | 2,8 | 26,8% | 44 | 1,1% |
| graviton | 60 | 8 | 4,7 | 2,7 | 27,4% | 57 | 15,6% |
| graviton | 90 | 12 | 4,8 | 2,7 | 28,3% | 61 | 53,9% |
| rosca_maquina | 20 | 3 | 2,6 | 2,7 | 23,9% | 24 | 0% |
| rosca_maquina | 30 | 4 | 3,4 | 2,8 | 25,6% | 30 | 0% |
| rosca_maquina | 45 | 6 | 4,3 | 2,8 | 24,6% | 44 | 1,1% |
| rosca_maquina | 60 | 8 | 4,9 | 2,7 | 24,8% | 57 | 16,7% |
| rosca_maquina | 90 | 12 | 5 | 2,7 | 26,2% | 59 | 61,1% |
| triceps_maquina | 20 | 3 | 2,5 | 2,8 | 27,3% | 23 | 0% |
| triceps_maquina | 30 | 4 | 3,2 | 2,7 | 24,9% | 30 | 0% |
| triceps_maquina | 45 | 6 | 4,1 | 2,7 | 25% | 44 | 3,3% |
| triceps_maquina | 60 | 8 | 4,4 | 2,7 | 25,6% | 54 | 18,3% |
| triceps_maquina | 90 | 12 | 4,5 | 2,7 | 25,7% | 55 | 71,7% |
| abdominal_maquina | 20 | 3 | 2,5 | 2,7 | 26,8% | 23 | 0% |
| abdominal_maquina | 30 | 4 | 3,2 | 2,7 | 23,4% | 30 | 0% |
| abdominal_maquina | 45 | 6 | 4,1 | 2,7 | 23,1% | 44 | 5% |
| abdominal_maquina | 60 | 8 | 4,5 | 2,6 | 23,3% | 55 | 18,3% |
| abdominal_maquina | 90 | 12 | 4,5 | 2,7 | 24,2% | 55 | 68,9% |
| hack | 20 | 3 | 2,5 | 2,7 | 26,5% | 23 | 0% |
| hack | 30 | 4 | 3,2 | 2,7 | 25,1% | 30 | 0% |
| hack | 45 | 6 | 4,1 | 2,7 | 23,9% | 44 | 5% |
| hack | 60 | 8 | 4,5 | 2,7 | 23,7% | 54 | 18,3% |
| hack | 90 | 12 | 4,5 | 2,7 | 24,2% | 55 | 69,4% |
| cadeira_abdutora_adutora | 20 | 3 | 2,5 | 2,7 | 26,8% | 23 | 0% |
| cadeira_abdutora_adutora | 30 | 4 | 3,2 | 2,7 | 24,7% | 30 | 0% |
| cadeira_abdutora_adutora | 45 | 6 | 4,1 | 2,7 | 23,8% | 44 | 5% |
| cadeira_abdutora_adutora | 60 | 8 | 4,5 | 2,6 | 23,6% | 53 | 18,3% |
| cadeira_abdutora_adutora | 90 | 12 | 4,5 | 2,7 | 24,2% | 53 | 76,1% |
| gluteo_maquina | 20 | 3 | 2,4 | 2,8 | 26,7% | 23 | 0% |
| gluteo_maquina | 30 | 4 | 3,1 | 2,8 | 30,2% | 30 | 0% |
| gluteo_maquina | 45 | 6 | 4 | 2,7 | 25,9% | 43 | 5% |
| gluteo_maquina | 60 | 8 | 4,4 | 2,7 | 24,2% | 54 | 18,3% |
| gluteo_maquina | 90 | 12 | 4,5 | 2,7 | 24,2% | 54 | 71,7% |
| panturrilha_em_pe_maquina | 20 | 3 | 2,5 | 2,7 | 26,2% | 23 | 0% |
| panturrilha_em_pe_maquina | 30 | 4 | 3,2 | 2,7 | 24% | 30 | 0% |
| panturrilha_em_pe_maquina | 45 | 6 | 4,1 | 2,7 | 21,5% | 44 | 5% |
| panturrilha_em_pe_maquina | 60 | 8 | 4,5 | 2,6 | 22,6% | 54 | 18,3% |
| panturrilha_em_pe_maquina | 90 | 12 | 4,5 | 2,7 | 24,2% | 54 | 71,7% |
| panturrilha_sentada_maquina | 20 | 3 | 2,5 | 2,7 | 26,8% | 23 | 0% |
| panturrilha_sentada_maquina | 30 | 4 | 3,2 | 2,7 | 24,5% | 30 | 0% |
| panturrilha_sentada_maquina | 45 | 6 | 4,1 | 2,7 | 20,8% | 44 | 5% |
| panturrilha_sentada_maquina | 60 | 8 | 4,6 | 2,6 | 20,8% | 54 | 18,3% |
| panturrilha_sentada_maquina | 90 | 12 | 4,7 | 2,6 | 22,2% | 56 | 64,4% |
| suspensao | 20 | 3 | 2,5 | 2,8 | 31,8% | 25 | 0% |
| suspensao | 30 | 4 | 3,5 | 2,8 | 28,8% | 30 | 0% |
| suspensao | 45 | 6 | 4,9 | 2,7 | 25,8% | 45 | 0% |
| suspensao | 60 | 8 | 5,6 | 2,7 | 26,7% | 58 | 9,4% |
| suspensao | 90 | 12 | 5,9 | 2,7 | 26% | 65 | 47,8% |
| caneleiras | 20 | 3 | 2,5 | 2,7 | 24,6% | 23 | 0% |
| caneleiras | 30 | 4 | 3,2 | 2,7 | 23,5% | 30 | 0% |
| caneleiras | 45 | 6 | 4,3 | 2,6 | 18% | 44 | 1,1% |
| caneleiras | 60 | 8 | 4,8 | 2,5 | 18,6% | 53 | 17,8% |
| caneleiras | 90 | 12 | 4,9 | 2,5 | 18,9% | 55 | 67,8% |
| mini_band | 20 | 3 | 2,5 | 2,7 | 26,8% | 23 | 0% |
| mini_band | 30 | 4 | 3,2 | 2,7 | 24,7% | 30 | 0% |
| mini_band | 45 | 6 | 4,1 | 2,7 | 23,9% | 44 | 5% |
| mini_band | 60 | 8 | 4,5 | 2,7 | 23,7% | 54 | 18,3% |
| mini_band | 90 | 12 | 4,5 | 2,7 | 24,2% | 54 | 72,2% |
| roda_abdominal | 20 | 3 | 2,5 | 2,7 | 26,8% | 23 | 0% |
| roda_abdominal | 30 | 4 | 3,2 | 2,7 | 24,5% | 30 | 0% |
| roda_abdominal | 45 | 6 | 4,1 | 2,7 | 23,9% | 44 | 5% |
| roda_abdominal | 60 | 8 | 4,5 | 2,7 | 23,7% | 54 | 18,3% |
| roda_abdominal | 90 | 12 | 4,5 | 2,7 | 24,2% | 55 | 68,3% |
| barra-porta+elasticos | 20 | 3 | 2,8 | 2,6 | 19,8% | 28 | 0% |
| barra-porta+elasticos | 30 | 4 | 3,8 | 2,6 | 21,4% | 32 | 0% |
| barra-porta+elasticos | 45 | 6 | 5,6 | 2,6 | 16,1% | 45 | 0% |
| barra-porta+elasticos | 60 | 8 | 6,9 | 2,5 | 15,2% | 59 | 0% |
| barra-porta+elasticos | 90 | 12 | 7,8 | 2,5 | 15,7% | 75 | 27,2% |
| halteres+bola | 20 | 3 | 2,9 | 2,5 | 18,1% | 28 | 0% |
| halteres+bola | 30 | 4 | 3,8 | 2,6 | 17,2% | 32 | 0% |
| halteres+bola | 45 | 6 | 5,5 | 2,6 | 15,2% | 45 | 0% |
| halteres+bola | 60 | 8 | 6,7 | 2,6 | 15,3% | 59 | 5,6% |
| halteres+bola | 90 | 12 | 7,3 | 2,6 | 18,7% | 75 | 28,9% |
| suspensao+elasticos | 20 | 3 | 2,8 | 2,6 | 20,2% | 27 | 0% |
| suspensao+elasticos | 30 | 4 | 3,8 | 2,7 | 22,5% | 32 | 0% |
| suspensao+elasticos | 45 | 6 | 5,6 | 2,6 | 16,4% | 45 | 0% |
| suspensao+elasticos | 60 | 8 | 7 | 2,5 | 15,5% | 59 | 0% |
| suspensao+elasticos | 90 | 12 | 7,9 | 2,5 | 16,2% | 75 | 26,7% |
| banco+halteres-leves | 20 | 3 | 2,7 | 2,6 | 18,9% | 28 | 0% |
| banco+halteres-leves | 30 | 4 | 3,7 | 2,6 | 19% | 33 | 0% |
| banco+halteres-leves | 45 | 6 | 5,5 | 2,6 | 15,6% | 45 | 0% |
| banco+halteres-leves | 60 | 8 | 6,8 | 2,5 | 14,1% | 60 | 2,2% |
| banco+halteres-leves | 90 | 12 | 7,6 | 2,5 | 17,5% | 75 | 27,8% |
| step+elasticos | 20 | 3 | 2,9 | 2,6 | 19,2% | 27 | 0% |
| step+elasticos | 30 | 4 | 3,8 | 2,6 | 21,2% | 33 | 0% |
| step+elasticos | 45 | 6 | 5,6 | 2,6 | 15,5% | 45 | 0% |
| step+elasticos | 60 | 8 | 6,9 | 2,5 | 14% | 59 | 0% |
| step+elasticos | 90 | 12 | 7,8 | 2,5 | 15,7% | 76 | 25% |

## Guia: prescrições com animação, só cartão e sem nada

| cenário | com animação | só cartão de texto | sem guia nenhum |
| --- | ---: | ---: | ---: |
| vazio (= 10 outros) | 100% | 0% | 0% |
| estacao_polia_dupla | 90,3% | 0% | 9,7% |
| barra_fixa | 100% | 0% | 0% |
| halteres_fixos | 79,2% | 17,2% | 3,6% |
| anilhas_e_manoplas | 79,2% | 17,2% | 3,6% |
| barra_longa | 89,1% | 0% | 10,9% |
| barra_w | 89,4% | 0% | 10,6% |
| rack_de_agachamento | 88,4% | 0% | 11,6% |
| smith | 81,5% | 7% | 11,6% |
| leg_press | 76,2% | 0% | 23,8% |
| cadeira_extensora | 92,2% | 7,8% | 0% |
| mesa_flexora | 86,6% | 0% | 13,4% |
| cadeira_flexora | 86,6% | 13,4% | 0% |
| paralelas | 95,4% | 4,6% | 0% |
| elasticos | 100% | 0% | 0% |
| step | 100% | 0% | 0% |
| bola_suica | 100% | 0% | 0% |
| barra_hexagonal | 92,4% | 7,6% | 0% |
| kettlebell | 95% | 5% | 0% |
| banco_romano | 90,5% | 9,5% | 0% |
| estacao_puxada | 89,4% | 10,6% | 0% |
| estacao_remada | 93,4% | 6,6% | 0% |
| multifuncional | 85,9% | 14,1% | 0% |
| supino_maquina | 90,9% | 9,1% | 0% |
| voador | 87,3% | 12,7% | 0% |
| desenvolvimento_maquina | 94,6% | 5,4% | 0% |
| remada_articulada | 89,9% | 10,1% | 0% |
| graviton | 84,4% | 15,6% | 0% |
| rosca_maquina | 87,3% | 12,7% | 0% |
| triceps_maquina | 92,1% | 7,9% | 0% |
| abdominal_maquina | 88,2% | 11,8% | 0% |
| hack | 91% | 9% | 0% |
| cadeira_abdutora_adutora | 87,1% | 12,9% | 0% |
| gluteo_maquina | 88% | 12% | 0% |
| panturrilha_em_pe_maquina | 84,7% | 15,3% | 0% |
| panturrilha_sentada_maquina | 92,4% | 7,6% | 0% |
| suspensao | 100% | 0% | 0% |
| caneleiras | 100% | 0% | 0% |
| mini_band | 100% | 0% | 0% |
| roda_abdominal | 100% | 0% | 0% |
| barra-porta+elasticos | 100% | 0% | 0% |
| halteres+bola | 79,2% | 17,2% | 3,6% |
| suspensao+elasticos | 100% | 0% | 0% |
| banco+halteres-leves | 77,1% | 20,2% | 2,7% |
| step+elasticos | 100% | 0% | 0% |

## Segurança: o que sobra com dor, no inventário vazio e com um aparelho só

| cenário | dor | dias só com abdominal | dias de superior sem tronco nem braço | dias vazios | carrega a região | região que o dado não marca | exercícios que sobram |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| vazio (= 10 outros) | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| vazio (= 10 outros) | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| vazio (= 10 outros) | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| estacao_polia_dupla | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, remada-unilateral-polia, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-unilateral, remada-unilateral-polia, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas, triceps-frances-polia-unilateral |
| estacao_polia_dupla | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-invertido-polia, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas, triceps-frances-polia-unilateral |
| barra_fixa | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, barra-fixa, barra-fixa-supinada, elevacao-joelhos, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_fixa | punho 7 | 0 | 58 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, elevacao-joelhos, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_fixa | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, barra-fixa, barra-fixa-supinada, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| halteres_fixos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | ombro 7 | 0 | 53 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-martelo, stiff, stiff-unilateral |
| halteres_fixos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres_fixos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | ombro 7 | 0 | 41 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-martelo, stiff, stiff-unilateral |
| anilhas_e_manoplas | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| anilhas_e_manoplas | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| barra_longa | joelho 7 | 0 | 117 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | punho 7 | 0 | 558 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-romeno-barra |
| barra_longa | lombar 7 | 0 | 381 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_longa | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-romeno-barra |
| barra_longa | joelho 7 + lombar 7 | 0 | 318 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_w | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| barra_w | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_w | ombro 7 | 0 | 62 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-barra-w |
| barra_w | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| barra_w | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_w | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| rack_de_agachamento | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| rack_de_agachamento | punho 7 | 0 | 96 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-invertida |
| rack_de_agachamento | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rack_de_agachamento | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| rack_de_agachamento | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rack_de_agachamento | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | punho 7 | 0 | 96 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-invertida |
| smith | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| smith | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| smith | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| leg_press | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-leg-press, pike, ponte-gluteo |
| leg_press | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-leg-press, ponte-gluteo |
| leg_press | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-leg-press, ponte-gluteo |
| leg_press | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, leg-press, nordico, panturrilha-leg-press, pike, ponte-gluteo |
| leg_press | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-leg-press, ponte-gluteo |
| leg_press | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-leg-press, pike, ponte-gluteo |
| cadeira_extensora | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_extensora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | lombar 7 | 0 | 329 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_extensora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | lombar 7 | 0 | 332 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | lombar 7 | 0 | 332 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| paralelas | joelho 7 | 0 | 346 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, elevacao-joelhos-paralelas, flexao, flexao-fechada, mergulho, panturrilha-chao, pike, ponte-gluteo |
| paralelas | punho 7 | 0 | 718 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos-paralelas, flexao-joelho-deslizante, mergulho, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | lombar 7 | 0 | 352 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, mergulho, nordico, panturrilha-chao, pike, ponte-gluteo |
| paralelas | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos-paralelas, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | joelho 7 + lombar 7 | 0 | 346 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, mergulho, panturrilha-chao, pike, ponte-gluteo |
| elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| elasticos | ombro 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| step | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| step | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| step | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| bola_suica | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| bola_suica | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, ponte-pes-bola |
| bola_suica | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, ponte-pes-bola |
| bola_suica | lombar 7 | 0 | 332 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-bola, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, ponte-pes-bola |
| bola_suica | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, ponte-pes-bola |
| bola_suica | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| kettlebell | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, desenvolvimento-unilateral-kettlebell, flexao, flexao-fechada, panturrilha-chao, ponte-kettlebell, remada-unilateral-kettlebell, rosca-kettlebell, stiff-kettlebell, triceps-frances-kettlebell |
| kettlebell | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-kettlebell, desenvolvimento-unilateral-kettlebell, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-kettlebell, remada-unilateral-kettlebell, rosca-kettlebell, stiff-kettlebell, triceps-frances-kettlebell |
| kettlebell | ombro 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-kettlebell, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-kettlebell, rosca-kettlebell, stiff-kettlebell |
| kettlebell | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-kettlebell, flexao, flexao-fechada, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, pike, ponte-kettlebell, rosca-kettlebell, triceps-frances-kettlebell |
| kettlebell | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-kettlebell, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-kettlebell, stiff-kettlebell |
| kettlebell | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-kettlebell, rosca-kettlebell, triceps-frances-kettlebell |
| banco_romano | joelho 7 | 0 | 315 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, hiperextensao, panturrilha-chao, pike, ponte-gluteo |
| banco_romano | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| banco_romano | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| estacao_puxada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_puxada | punho 7 | 0 | 55 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-frente |
| estacao_puxada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_puxada | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_puxada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_puxada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_remada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | punho 7 | 0 | 55 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_remada | lombar 7 | 0 | 380 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| estacao_remada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_remada | joelho 7 + lombar 7 | 0 | 299 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| multifuncional | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | punho 7 | 0 | 164 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| multifuncional | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| multifuncional | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| multifuncional | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| supino_maquina | joelho 7 | 0 | 342 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| supino_maquina | punho 7 | 0 | 210 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, supino-maquina |
| supino_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| supino_maquina | lombar 7 | 0 | 346 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| supino_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| supino_maquina | joelho 7 + lombar 7 | 0 | 342 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| voador | joelho 7 | 0 | 311 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, voador |
| voador | punho 7 | 0 | 186 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, voador |
| voador | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| voador | lombar 7 | 0 | 329 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, voador |
| voador | cotovelo 7 | 0 | 186 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, voador |
| voador | joelho 7 + lombar 7 | 0 | 311 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, voador |
| desenvolvimento_maquina | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, desenvolvimento-maquina, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | punho 7 | 0 | 727 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, desenvolvimento-maquina, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo |
| remada_articulada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-articulada |
| remada_articulada | punho 7 | 0 | 55 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-articulada |
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
| rosca_maquina | punho 7 | 0 | 62 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | ombro 7 | 0 | 62 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, rosca-maquina |
| rosca_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rosca_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-maquina |
| triceps_maquina | joelho 7 | 0 | 233 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| triceps_maquina | punho 7 | 0 | 303 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | ombro 7 | 0 | 303 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | lombar 7 | 0 | 281 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| triceps_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| triceps_maquina | joelho 7 + lombar 7 | 0 | 232 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| abdominal_maquina | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-maquina, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| abdominal_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| abdominal_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| hack | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| hack | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, pike, ponte-gluteo |
| hack | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 + lombar 7 | 0 | 329 | 0 | 0 | 0 | abducao-maquina, aducao-maquina, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| gluteo_maquina | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, coice-maquina, flexao, flexao-fechada, panturrilha-chao, pike |
| gluteo_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike |
| gluteo_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | joelho 7 + lombar 7 | 0 | 329 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, coice-maquina, flexao, flexao-fechada, panturrilha-chao, pike |
| panturrilha_em_pe_maquina | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_em_pe_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_em_pe_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 | 0 | 319 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| panturrilha_sentada_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| panturrilha_sentada_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 + lombar 7 | 0 | 317 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| suspensao | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, ponte-gluteo |
| suspensao | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| suspensao | cotovelo 7 | 0 | 109 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, bulgaro-suspensao, flexao-joelho-deslizante, flexao-joelho-suspensao, nordico, panturrilha-chao, ponte-gluteo, yt-suspensao |
| suspensao | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-suspensao, rosca-suspensao, triceps-suspensao, yt-suspensao |
| caneleiras | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-caneleira, aducao-caneleira, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| caneleiras | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| caneleiras | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| caneleiras | lombar 7 | 0 | 329 | 0 | 0 | 0 | abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-caneleira, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| caneleiras | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-caneleira, aducao-caneleira, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-caneleira, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| caneleiras | joelho 7 + lombar 7 | 0 | 329 | 0 | 0 | 0 | abducao-caneleira, aducao-caneleira, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mini_band | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, abducao-mini-band, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mini_band | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, abducao-mini-band, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| mini_band | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, abducao-mini-band, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| mini_band | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, abducao-mini-band, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| mini_band | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, abducao-mini-band, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| mini_band | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, abducao-mini-band, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| roda_abdominal | joelho 7 | 0 | 329 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, roda-abdominal |
| roda_abdominal | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, roda-abdominal |
| roda_abdominal | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| roda_abdominal | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| roda_abdominal | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, roda-abdominal |
| roda_abdominal | joelho 7 + lombar 7 | 0 | 328 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra-porta+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, barra-fixa, barra-fixa-supinada, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| barra-porta+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| barra-porta+elasticos | ombro 7 | 0 | 39 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| barra-porta+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, pike, ponte-gluteo, remada-elastico, rosca-elastico, triceps-elastico-acima |
| barra-porta+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-joelhos, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| barra-porta+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, barra-fixa, barra-fixa-supinada, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-elastico, rosca-elastico, triceps-elastico-acima |
| halteres+bola | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-bola, goblet, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | ombro 7 | 0 | 41 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, flexao-bola, goblet, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-martelo, stiff, stiff-unilateral |
| halteres+bola | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-bola, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-bola, abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-bola, goblet, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres+bola | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-chao-halteres, triceps-frances-halter |
| suspensao+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-suspensao, stiff-elastico, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-suspensao, stiff-elastico, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | ombro 7 | 0 | 40 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-joelho-suspensao, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| suspensao+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, flexao-joelho-suspensao, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-suspensao, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| suspensao+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico, yt-suspensao |
| suspensao+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, rosca-suspensao, triceps-elastico-acima, triceps-suspensao, yt-suspensao |
| banco+halteres-leves | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-reto, triceps-frances-halter |
| banco+halteres-leves | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, remada-unilateral-sem-banco, rosca-alternada, rosca-martelo, stiff, stiff-unilateral, supino-reto, triceps-frances-halter |
| banco+halteres-leves | ombro 7 | 0 | 38 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, rosca-alternada, rosca-martelo, stiff, stiff-unilateral |
| banco+halteres-leves | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, elevacao-halteres, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-reto, triceps-frances-halter |
| banco+halteres-leves | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, panturrilha-sentada-halter, ponte-gluteo-halter, stiff, stiff-unilateral |
| banco+halteres-leves | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-halteres, elevacao-halteres, flexao-fechada, panturrilha-chao, panturrilha-sentada-halter, pike, ponte-gluteo-halter, rosca-alternada, rosca-martelo, supino-reto, triceps-frances-halter |
| step+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| step+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| step+elasticos | ombro 7 | 0 | 42 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, extensao-joelho-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| step+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| step+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, abducao-deitado, aducao-deitado, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, extensao-joelho-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, stiff-elastico |
| step+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | abducao-deitado, aducao-deitado, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |

## Exemplos (3 por problema, de cenários diferentes)

### `dia.superior-sem-superior`

- **vazio · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · punho 7**: Superior A sem nenhum exercício de tronco ou braço (panturrilha-chao).
  - Programa: Superior A (8 min): panturrilha-chao 4 | Inferior A (17 min): agachamento-peso-corpo 3, flexao-joelho-deslizante 3 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **estacao_polia_dupla · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (bulgaro-peso-corpo, panturrilha-chao).
  - Programa: Superior A (18 min): bulgaro-peso-corpo 2, panturrilha-chao 4 | Inferior A (12 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (bulgaro-peso-corpo, panturrilha-chao).
  - Programa: Superior A (18 min): bulgaro-peso-corpo 2, panturrilha-chao 4 | Inferior A (14 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2

### `equilibrio.sem-posteriores`

- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2 | Corpo todo B (21 min): afundo-peso-corpo 2, remada-unilateral-polia 2, crucifixo-polia 2
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (20 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **anilhas_e_manoplas · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (20 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2

### `equilibrio.sem-puxar`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.biceps`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.crucifixo`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · punho 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao-joelho-deslizante 2, abdominal-chao 4
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · punho 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, barra-fixa 4, flexao-joelho-deslizante 2 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao-joelho-deslizante 2, abdominal-chao 4
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (23 min): goblet 2, stiff 2, panturrilha-chao 4 | Corpo todo B (21 min): afundo 2, flexao-joelho-deslizante 2, rosca-alternada 4

### `vaga.so-aviso-do-musculo.elevacao-lateral`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.ombro-posterior`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.puxar-horizontal`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao-joelho-deslizante 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.puxar-vertical`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `vaga.so-aviso-do-musculo.triceps-acima-cabeca`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.abaixo-sem-aviso`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 de 6 séries, sem aviso.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.biceps`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.costas`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.ombro_lateral`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2 | Corpo todo B (21 min): afundo-peso-corpo 2, remada-unilateral-polia 2, crucifixo-polia 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4

### `volume.zero.ombro_posterior`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2

### `volume.zero.posteriores`

- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2 | Corpo todo B (21 min): afundo-peso-corpo 2, remada-unilateral-polia 2, crucifixo-polia 2
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (20 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **anilhas_e_manoplas · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (20 min): goblet 2, flexao 2, remada-unilateral-sem-banco 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2

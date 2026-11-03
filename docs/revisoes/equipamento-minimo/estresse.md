# Teste de estresse do cenário de equipamento mínimo

> Gerado por `npm run auditoria:minimo`. Dados fictícios (`scripts/auditoria/minimo-cenarios.ts`). Não editar à mão.

**483.840 programas**: 52 cenários (o inventário vazio, os 46 itens sozinhos e 5 pares de casa), que dão **42 programas diferentes** (cenários com as mesmas capacidades geram o mesmo programa e rodam uma vez), × 3 níveis × 12 divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor.

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
| barra-porta+elasticos | barra-porta+elasticos |
| halteres+bola | halteres+bola |
| suspensao+elasticos | suspensao+elasticos |
| banco+halteres-leves | banco+halteres-leves |
| step+elasticos | step+elasticos |

## Problemas encontrados (contagem de ocorrências)

| problema | ocorrências |
| --- | ---: |
| `vaga.so-aviso-do-musculo.elevacao-lateral` | 380.160 |
| `vaga.so-aviso-do-musculo.ombro-posterior` | 344.355 |
| `vaga.so-aviso-do-musculo.biceps` | 338.541 |
| `vaga.so-aviso-do-musculo.puxar-horizontal` | 293.698 |
| `vaga.so-aviso-do-musculo.puxar-vertical` | 288.915 |
| `vaga.so-aviso-do-musculo.triceps-acima-cabeca` | 217.079 |
| `vaga.so-aviso-do-musculo.crucifixo` | 184.043 |
| `dia.superior-sem-superior` | 172.368 |
| `equilibrio.sem-puxar` | 33.600 |
| `volume.zero.costas` | 33.600 |
| `volume.zero.ombro_posterior` | 33.600 |
| `volume.zero.biceps` | 30.762 |
| `volume.zero.ombro_lateral` | 17.456 |
| `equilibrio.sem-posteriores` | 180 |
| `volume.zero.posteriores` | 180 |

## Volume: séries semanais, média por cenário (todas as situações)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,7 | 10,2 | 7,1 | 4,4 |
| estacao_polia_dupla | 9,3 | 5,4 | 6,3 | 2,7 | 6,2 | 3,5 | 5,9 | 6,5 | 9,4 | 5,9 | 3,8 |
| barra_fixa | 6,1 | 5,4 | 0,7 | 1,6 | 2,7 | 4,7 | 6,2 | 6,6 | 9,6 | 6,4 | 5,4 |
| halteres_fixos | 6,7 | 3,9 | 6,2 | 3,9 | 6,6 | 6,7 | 5,7 | 7,7 | 10,1 | 5,6 | 3,6 |
| anilhas_e_manoplas | 6,7 | 3,9 | 6,3 | 4 | 6,7 | 6,7 | 5,7 | 7,8 | 10,1 | 5,7 | 3,6 |
| barra_longa | 6,3 | 2,4 | 0,7 | 1,2 | 1,2 | 5,1 | 6,3 | 7,4 | 10,6 | 6,8 | 4,1 |
| barra_w | 6,3 | 0 | 0,7 | 0 | 5,2 | 4,9 | 6,4 | 6,8 | 10,1 | 6,5 | 4,4 |
| rack_de_agachamento | 6,2 | 5,9 | 0,7 | 3 | 3 | 4,8 | 6,3 | 6,7 | 10 | 6,4 | 4 |
| smith | 6,2 | 5,9 | 0,7 | 3 | 3 | 4,8 | 6,3 | 6,7 | 10 | 6,4 | 4 |
| leg_press | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,6 | 6,8 | 10,2 | 7,1 | 4,4 |
| cadeira_extensora | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 7,4 | 6,8 | 9,5 | 7,1 | 4,4 |
| mesa_flexora | 6,4 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 7 | 8,8 | 7,1 | 4,4 |
| cadeira_flexora | 6,4 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 7 | 8,8 | 7,1 | 4,4 |
| paralelas | 7,2 | 0 | 0,7 | 0 | 0 | 6,2 | 6,4 | 6,7 | 10 | 7 | 4,4 |
| elasticos | 8 | 8 | 5,9 | 4,4 | 7,3 | 5,8 | 5,7 | 7,4 | 8,8 | 5,5 | 3,6 |
| step | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,7 | 10,2 | 7,1 | 4,4 |
| bola_suica | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 7 | 11,1 | 7,2 | 4,4 |
| barra_hexagonal | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,6 | 7,6 | 11,6 | 7,1 | 4,5 |
| kettlebell | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,6 | 6,7 | 10,2 | 7,1 | 4,4 |
| banco_romano | 6,4 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 8,2 | 12,2 | 7,1 | 4,4 |
| estacao_puxada | 6,2 | 5,6 | 0,7 | 2,8 | 2,8 | 4,9 | 6,2 | 6,6 | 9,7 | 6,5 | 4,1 |
| estacao_remada | 6,4 | 3,5 | 0,7 | 1,7 | 1,7 | 5,1 | 6,3 | 6,7 | 10 | 6,7 | 4,1 |
| multifuncional | 6,3 | 6,7 | 0,7 | 3,3 | 3,3 | 5 | 6,3 | 6,7 | 10 | 6,5 | 4 |
| supino_maquina | 7,7 | 0 | 0,7 | 0 | 0 | 5,6 | 6,4 | 6,7 | 9,9 | 7 | 4,4 |
| voador | 9,7 | 0 | 0,7 | 0 | 0 | 4,1 | 6,2 | 6,7 | 9,8 | 6,8 | 4,4 |
| desenvolvimento_maquina | 6,5 | 0 | 0,9 | 0 | 0 | 5,3 | 6,4 | 6,7 | 10 | 7 | 4,4 |
| remada_articulada | 6,1 | 5,3 | 0,7 | 2,7 | 2,7 | 4,8 | 6,2 | 6,7 | 9,8 | 6,5 | 4,1 |
| graviton | 7,2 | 5,5 | 0,7 | 2,7 | 2,7 | 6,4 | 6,1 | 6,6 | 9,5 | 6,4 | 4,1 |
| rosca_maquina | 6,3 | 0 | 0,7 | 0 | 6,3 | 4,9 | 6,3 | 6,7 | 9,9 | 6,3 | 4,4 |
| triceps_maquina | 5,2 | 0 | 0,7 | 0 | 0 | 6,7 | 6,3 | 6,6 | 9,8 | 6,9 | 4,4 |
| abdominal_maquina | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,7 | 10,2 | 7,2 | 4,5 |
| hack | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,6 | 6,7 | 10,2 | 7,1 | 4,4 |
| cadeira_abdutora_adutora | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,4 | 6,7 | 11 | 7 | 4,4 |
| gluteo_maquina | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,8 | 10,2 | 7,1 | 4,5 |
| panturrilha_em_pe_maquina | 6,5 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,7 | 10,2 | 7,2 | 4,4 |
| panturrilha_sentada_maquina | 6,4 | 0 | 0,7 | 0 | 0 | 5,1 | 6,5 | 6,8 | 10,3 | 8,1 | 4,4 |
| suspensao | 6,2 | 5,9 | 0,7 | 3 | 3 | 4,8 | 6,3 | 6,7 | 10 | 6,4 | 4 |
| barra-porta+elasticos | 8 | 8 | 5,8 | 5,3 | 7,3 | 5,8 | 5,6 | 7,4 | 8,6 | 5,4 | 4,8 |
| halteres+bola | 6,7 | 3,9 | 6,3 | 4 | 6,7 | 6,7 | 5,7 | 7,8 | 10,6 | 5,6 | 3,6 |
| suspensao+elasticos | 8 | 8 | 5,9 | 5,6 | 7,4 | 5,8 | 5,7 | 7,4 | 8,8 | 5,5 | 3,6 |
| banco+halteres-leves | 8,4 | 4,8 | 6,2 | 4,2 | 6,9 | 5,5 | 5,7 | 7,7 | 10 | 5,6 | 3,6 |
| step+elasticos | 8 | 8 | 5,9 | 4,4 | 7,3 | 5,8 | 5,7 | 7,4 | 8,7 | 5,4 | 3,6 |

### Sem dor: % dos programas com o músculo em 0 série na semana

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| estacao_polia_dupla | 0% | 0% | 8,1% | 0% | 0% | 0% | 0% | 0% | 0% | 22% | 14,8% |
| barra_fixa | 0% | 0% | 31,7% | 0% | 0% | 0% | 0% | 0% | 0% | 18,5% | 10,5% |
| halteres_fixos | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 22,2% |
| anilhas_e_manoplas | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 22,2% |
| barra_longa | 0% | 33,3% | 33,5% | 33,3% | 33,3% | 0% | 0% | 0% | 0% | 16,4% | 10% |
| barra_w | 0% | 100% | 35,1% | 100% | 1,5% | 0% | 0% | 0% | 0% | 19,5% | 10,6% |
| rack_de_agachamento | 0% | 0% | 37,2% | 0% | 0% | 0% | 0% | 1% | 0% | 21,5% | 14,1% |
| smith | 0% | 0% | 37,2% | 0% | 0% | 0% | 0% | 1% | 0% | 21,5% | 14,1% |
| leg_press | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| cadeira_extensora | 0% | 100% | 31,9% | 100% | 100% | 0% | 0% | 0% | 0% | 14,7% | 10,8% |
| mesa_flexora | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| cadeira_flexora | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| paralelas | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 22,2% |
| step | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| bola_suica | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| barra_hexagonal | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| kettlebell | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| banco_romano | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| estacao_puxada | 0% | 0% | 31,7% | 0% | 0% | 0% | 0% | 0% | 0% | 18,5% | 10,5% |
| estacao_remada | 0% | 0% | 34,2% | 0% | 0% | 0% | 0% | 0% | 0% | 20,2% | 10,2% |
| multifuncional | 0% | 0% | 37,2% | 0% | 0% | 0% | 0% | 1% | 0% | 21,5% | 14,1% |
| supino_maquina | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| voador | 0% | 100% | 32,2% | 100% | 100% | 0% | 0% | 0% | 0% | 11,3% | 10% |
| desenvolvimento_maquina | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| remada_articulada | 0% | 0% | 34,2% | 0% | 0% | 0% | 0% | 0% | 0% | 20,2% | 10,2% |
| graviton | 0% | 0% | 31,7% | 0% | 0% | 0% | 0% | 0% | 0% | 18,5% | 10,5% |
| rosca_maquina | 0% | 100% | 35,1% | 100% | 1,5% | 0% | 0% | 0% | 0% | 19,5% | 10,6% |
| triceps_maquina | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| abdominal_maquina | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| hack | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| cadeira_abdutora_adutora | 0% | 100% | 32,8% | 100% | 100% | 0% | 0% | 0% | 0% | 13,3% | 10% |
| gluteo_maquina | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| panturrilha_em_pe_maquina | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| panturrilha_sentada_maquina | 0% | 100% | 31,7% | 100% | 100% | 0% | 0% | 0% | 0% | 10,8% | 10% |
| suspensao | 0% | 0% | 37,2% | 0% | 0% | 0% | 0% | 1% | 0% | 21,5% | 14,1% |
| barra-porta+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 22,2% |
| halteres+bola | 0% | 0% | 14,7% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 22,2% |
| suspensao+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 22,2% |
| banco+halteres-leves | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 22,2% |
| step+elasticos | 0% | 0% | 15,1% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 22,2% |

## O que o app diz quando a vaga fica sem opção

Por programa e por função da divisão que ficou sem exercício possível por falta de equipamento (não por dor). "Aviso da vaga" = o texto da `lacuna` da função ("Sem cadeira extensora: …"). "Só aviso do músculo" = a vaga some e só aparece "Abaixo da meta semanal: costas 0 de 6". "Coberto" = outra vaga deu volume ao músculo. "Sem meta: nada" = o ombro anterior e os adutores não têm meta, então nada aparece.

| cenário | função | aviso da vaga | só aviso do músculo | coberto por outra vaga | sem meta: nada | nada |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | abducao | 4608 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | aducao | 0 | 0 | 0 | 6912 | 0 |
| vazio (= 10 outros) | biceps | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | crucifixo | 0 | 5256 | 6264 | 0 | 0 |
| vazio (= 10 outros) | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | extensora | 11520 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| estacao_polia_dupla | abducao | 4608 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | aducao | 0 | 0 | 0 | 6912 | 0 |
| estacao_polia_dupla | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | ombro-posterior | 0 | 6791 | 4729 | 0 | 0 |
| estacao_polia_dupla | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | puxar-horizontal | 0 | 6282 | 5238 | 0 | 0 |
| estacao_polia_dupla | triceps-acima-cabeca | 0 | 7932 | 3588 | 0 | 0 |
| barra_fixa | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra_fixa | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra_fixa | biceps | 0 | 9770 | 1750 | 0 | 0 |
| barra_fixa | crucifixo | 0 | 5741 | 5779 | 0 | 0 |
| barra_fixa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_fixa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_fixa | ombro-posterior | 0 | 10604 | 916 | 0 | 0 |
| barra_fixa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_fixa | puxar-horizontal | 0 | 6311 | 5209 | 0 | 0 |
| barra_fixa | triceps-acima-cabeca | 0 | 6880 | 4640 | 0 | 0 |
| halteres_fixos | abducao | 4608 | 0 | 0 | 0 | 0 |
| halteres_fixos | aducao | 0 | 0 | 0 | 6912 | 0 |
| halteres_fixos | crucifixo | 0 | 4770 | 6750 | 0 | 0 |
| halteres_fixos | extensora | 11520 | 0 | 0 | 0 | 0 |
| halteres_fixos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | abducao | 4608 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | aducao | 0 | 0 | 0 | 6912 | 0 |
| anilhas_e_manoplas | crucifixo | 0 | 4762 | 6758 | 0 | 0 |
| anilhas_e_manoplas | extensora | 11520 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_longa | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra_longa | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra_longa | biceps | 0 | 10808 | 712 | 0 | 0 |
| barra_longa | crucifixo | 0 | 5345 | 6175 | 0 | 0 |
| barra_longa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_longa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_longa | ombro-posterior | 0 | 9586 | 1934 | 0 | 0 |
| barra_longa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_longa | puxar-horizontal | 0 | 3840 | 0 | 0 | 0 |
| barra_longa | puxar-vertical | 0 | 9620 | 1900 | 0 | 0 |
| barra_longa | triceps-acima-cabeca | 0 | 6490 | 5030 | 0 | 0 |
| barra_w | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra_w | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra_w | crucifixo | 0 | 5432 | 6088 | 0 | 0 |
| barra_w | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_w | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_w | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| barra_w | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_w | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_w | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_w | triceps-acima-cabeca | 0 | 6536 | 4984 | 0 | 0 |
| rack_de_agachamento | abducao | 4608 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | aducao | 0 | 0 | 0 | 6912 | 0 |
| rack_de_agachamento | biceps | 0 | 9322 | 2198 | 0 | 0 |
| rack_de_agachamento | crucifixo | 0 | 5646 | 5874 | 0 | 0 |
| rack_de_agachamento | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rack_de_agachamento | extensora | 11520 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | ombro-posterior | 0 | 6106 | 5414 | 0 | 0 |
| rack_de_agachamento | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | triceps-acima-cabeca | 0 | 6811 | 4709 | 0 | 0 |
| smith | abducao | 4608 | 0 | 0 | 0 | 0 |
| smith | aducao | 0 | 0 | 0 | 6912 | 0 |
| smith | biceps | 0 | 9322 | 2198 | 0 | 0 |
| smith | crucifixo | 0 | 5634 | 5886 | 0 | 0 |
| smith | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| smith | extensora | 11520 | 0 | 0 | 0 | 0 |
| smith | ombro-posterior | 0 | 6106 | 5414 | 0 | 0 |
| smith | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| smith | triceps-acima-cabeca | 0 | 6811 | 4709 | 0 | 0 |
| leg_press | abducao | 4608 | 0 | 0 | 0 | 0 |
| leg_press | aducao | 0 | 0 | 0 | 6912 | 0 |
| leg_press | biceps | 0 | 11520 | 0 | 0 | 0 |
| leg_press | crucifixo | 0 | 5236 | 6284 | 0 | 0 |
| leg_press | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| leg_press | extensora | 11520 | 0 | 0 | 0 | 0 |
| leg_press | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| leg_press | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| leg_press | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| leg_press | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| leg_press | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| cadeira_extensora | abducao | 4608 | 0 | 0 | 0 | 0 |
| cadeira_extensora | aducao | 0 | 0 | 0 | 6912 | 0 |
| cadeira_extensora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | crucifixo | 0 | 5255 | 6265 | 0 | 0 |
| cadeira_extensora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_extensora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | triceps-acima-cabeca | 0 | 6403 | 5117 | 0 | 0 |
| mesa_flexora | abducao | 4608 | 0 | 0 | 0 | 0 |
| mesa_flexora | aducao | 0 | 0 | 0 | 6912 | 0 |
| mesa_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | crucifixo | 0 | 5260 | 6260 | 0 | 0 |
| mesa_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| mesa_flexora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| mesa_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | triceps-acima-cabeca | 0 | 6404 | 5116 | 0 | 0 |
| cadeira_flexora | abducao | 4608 | 0 | 0 | 0 | 0 |
| cadeira_flexora | aducao | 0 | 0 | 0 | 6912 | 0 |
| cadeira_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | crucifixo | 0 | 5260 | 6260 | 0 | 0 |
| cadeira_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_flexora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | triceps-acima-cabeca | 0 | 6404 | 5116 | 0 | 0 |
| paralelas | abducao | 4608 | 0 | 0 | 0 | 0 |
| paralelas | aducao | 0 | 0 | 0 | 6912 | 0 |
| paralelas | biceps | 0 | 11520 | 0 | 0 | 0 |
| paralelas | crucifixo | 0 | 4545 | 6975 | 0 | 0 |
| paralelas | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| paralelas | extensora | 11520 | 0 | 0 | 0 | 0 |
| paralelas | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| paralelas | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| paralelas | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| paralelas | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| paralelas | triceps-acima-cabeca | 0 | 5139 | 6381 | 0 | 0 |
| elasticos | abducao | 4608 | 0 | 0 | 0 | 0 |
| elasticos | aducao | 0 | 0 | 0 | 6912 | 0 |
| elasticos | extensora | 11520 | 0 | 0 | 0 | 0 |
| elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | abducao | 4608 | 0 | 0 | 0 | 0 |
| step | aducao | 0 | 0 | 0 | 6912 | 0 |
| step | biceps | 0 | 11520 | 0 | 0 | 0 |
| step | crucifixo | 0 | 5259 | 6261 | 0 | 0 |
| step | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| step | extensora | 11520 | 0 | 0 | 0 | 0 |
| step | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| step | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| step | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| step | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| bola_suica | abducao | 4608 | 0 | 0 | 0 | 0 |
| bola_suica | aducao | 0 | 0 | 0 | 6912 | 0 |
| bola_suica | biceps | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | crucifixo | 0 | 5256 | 6264 | 0 | 0 |
| bola_suica | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | extensora | 11520 | 0 | 0 | 0 | 0 |
| bola_suica | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| bola_suica | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | triceps-acima-cabeca | 0 | 6403 | 5117 | 0 | 0 |
| barra_hexagonal | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra_hexagonal | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra_hexagonal | biceps | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | crucifixo | 0 | 5242 | 6278 | 0 | 0 |
| barra_hexagonal | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_hexagonal | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_hexagonal | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| kettlebell | abducao | 4608 | 0 | 0 | 0 | 0 |
| kettlebell | aducao | 0 | 0 | 0 | 6912 | 0 |
| kettlebell | biceps | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | crucifixo | 0 | 5241 | 6279 | 0 | 0 |
| kettlebell | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | extensora | 11520 | 0 | 0 | 0 | 0 |
| kettlebell | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| kettlebell | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| banco_romano | abducao | 4608 | 0 | 0 | 0 | 0 |
| banco_romano | aducao | 0 | 0 | 0 | 6912 | 0 |
| banco_romano | biceps | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | crucifixo | 0 | 5292 | 6228 | 0 | 0 |
| banco_romano | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | extensora | 11520 | 0 | 0 | 0 | 0 |
| banco_romano | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco_romano | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | triceps-acima-cabeca | 0 | 6412 | 5108 | 0 | 0 |
| estacao_puxada | abducao | 4608 | 0 | 0 | 0 | 0 |
| estacao_puxada | aducao | 0 | 0 | 0 | 6912 | 0 |
| estacao_puxada | biceps | 0 | 9656 | 1864 | 0 | 0 |
| estacao_puxada | crucifixo | 0 | 5687 | 5833 | 0 | 0 |
| estacao_puxada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_puxada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_puxada | ombro-posterior | 0 | 6575 | 4945 | 0 | 0 |
| estacao_puxada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_puxada | puxar-horizontal | 0 | 6082 | 5438 | 0 | 0 |
| estacao_puxada | triceps-acima-cabeca | 0 | 6743 | 4777 | 0 | 0 |
| estacao_remada | abducao | 4608 | 0 | 0 | 0 | 0 |
| estacao_remada | aducao | 0 | 0 | 0 | 6912 | 0 |
| estacao_remada | biceps | 0 | 10471 | 1049 | 0 | 0 |
| estacao_remada | crucifixo | 0 | 5322 | 6198 | 0 | 0 |
| estacao_remada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_remada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_remada | ombro-posterior | 0 | 8725 | 2795 | 0 | 0 |
| estacao_remada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_remada | puxar-vertical | 0 | 8069 | 3451 | 0 | 0 |
| estacao_remada | triceps-acima-cabeca | 0 | 6406 | 5114 | 0 | 0 |
| multifuncional | abducao | 4608 | 0 | 0 | 0 | 0 |
| multifuncional | aducao | 0 | 0 | 0 | 6912 | 0 |
| multifuncional | biceps | 0 | 8396 | 3124 | 0 | 0 |
| multifuncional | crucifixo | 0 | 5485 | 6035 | 0 | 0 |
| multifuncional | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| multifuncional | extensora | 11520 | 0 | 0 | 0 | 0 |
| multifuncional | ombro-posterior | 0 | 5054 | 6466 | 0 | 0 |
| multifuncional | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| multifuncional | triceps-acima-cabeca | 0 | 6578 | 4942 | 0 | 0 |
| supino_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| supino_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| supino_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | crucifixo | 0 | 4099 | 7421 | 0 | 0 |
| supino_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| supino_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| supino_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | triceps-acima-cabeca | 0 | 5992 | 5528 | 0 | 0 |
| voador | abducao | 4608 | 0 | 0 | 0 | 0 |
| voador | aducao | 0 | 0 | 0 | 6912 | 0 |
| voador | biceps | 0 | 11520 | 0 | 0 | 0 |
| voador | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| voador | extensora | 11520 | 0 | 0 | 0 | 0 |
| voador | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| voador | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| voador | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| voador | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| voador | triceps-acima-cabeca | 0 | 7208 | 4312 | 0 | 0 |
| desenvolvimento_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| desenvolvimento_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | crucifixo | 0 | 5256 | 6264 | 0 | 0 |
| desenvolvimento_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| remada_articulada | abducao | 4608 | 0 | 0 | 0 | 0 |
| remada_articulada | aducao | 0 | 0 | 0 | 6912 | 0 |
| remada_articulada | biceps | 0 | 9837 | 1683 | 0 | 0 |
| remada_articulada | crucifixo | 0 | 5656 | 5864 | 0 | 0 |
| remada_articulada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| remada_articulada | extensora | 11520 | 0 | 0 | 0 | 0 |
| remada_articulada | ombro-posterior | 0 | 7086 | 4434 | 0 | 0 |
| remada_articulada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| remada_articulada | puxar-vertical | 0 | 6266 | 5254 | 0 | 0 |
| remada_articulada | triceps-acima-cabeca | 0 | 6802 | 4718 | 0 | 0 |
| graviton | abducao | 4608 | 0 | 0 | 0 | 0 |
| graviton | aducao | 0 | 0 | 0 | 6912 | 0 |
| graviton | biceps | 0 | 9717 | 1803 | 0 | 0 |
| graviton | crucifixo | 0 | 4551 | 6969 | 0 | 0 |
| graviton | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| graviton | extensora | 11520 | 0 | 0 | 0 | 0 |
| graviton | ombro-posterior | 0 | 6656 | 4864 | 0 | 0 |
| graviton | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| graviton | puxar-horizontal | 0 | 6223 | 5297 | 0 | 0 |
| graviton | triceps-acima-cabeca | 0 | 4683 | 6837 | 0 | 0 |
| rosca_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| rosca_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| rosca_maquina | crucifixo | 0 | 5426 | 6094 | 0 | 0 |
| rosca_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| rosca_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rosca_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | triceps-acima-cabeca | 0 | 6538 | 4982 | 0 | 0 |
| triceps_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| triceps_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| triceps_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | crucifixo | 0 | 6280 | 5240 | 0 | 0 |
| triceps_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| triceps_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| triceps_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | triceps-acima-cabeca | 0 | 3865 | 7655 | 0 | 0 |
| abdominal_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| abdominal_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| abdominal_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | crucifixo | 0 | 5244 | 6276 | 0 | 0 |
| abdominal_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| abdominal_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| abdominal_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| hack | abducao | 4608 | 0 | 0 | 0 | 0 |
| hack | aducao | 0 | 0 | 0 | 6912 | 0 |
| hack | biceps | 0 | 11520 | 0 | 0 | 0 |
| hack | crucifixo | 0 | 5241 | 6279 | 0 | 0 |
| hack | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| hack | extensora | 11520 | 0 | 0 | 0 | 0 |
| hack | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| hack | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| hack | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| hack | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| hack | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| cadeira_abdutora_adutora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | crucifixo | 0 | 5245 | 6275 | 0 | 0 |
| cadeira_abdutora_adutora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | triceps-acima-cabeca | 0 | 6400 | 5120 | 0 | 0 |
| gluteo_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| gluteo_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| gluteo_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | crucifixo | 0 | 5197 | 6323 | 0 | 0 |
| gluteo_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| gluteo_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| gluteo_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | triceps-acima-cabeca | 0 | 6393 | 5127 | 0 | 0 |
| panturrilha_em_pe_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| panturrilha_em_pe_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | crucifixo | 0 | 5251 | 6269 | 0 | 0 |
| panturrilha_em_pe_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | triceps-acima-cabeca | 0 | 6402 | 5118 | 0 | 0 |
| panturrilha_sentada_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| panturrilha_sentada_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | crucifixo | 0 | 5270 | 6250 | 0 | 0 |
| panturrilha_sentada_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | triceps-acima-cabeca | 0 | 6417 | 5103 | 0 | 0 |
| suspensao | abducao | 4608 | 0 | 0 | 0 | 0 |
| suspensao | aducao | 0 | 0 | 0 | 6912 | 0 |
| suspensao | biceps | 0 | 9322 | 2198 | 0 | 0 |
| suspensao | crucifixo | 0 | 5646 | 5874 | 0 | 0 |
| suspensao | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| suspensao | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao | ombro-posterior | 0 | 6106 | 5414 | 0 | 0 |
| suspensao | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| suspensao | triceps-acima-cabeca | 0 | 6811 | 4709 | 0 | 0 |
| barra-porta+elasticos | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra-porta+elasticos | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra-porta+elasticos | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra-porta+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| halteres+bola | abducao | 4608 | 0 | 0 | 0 | 0 |
| halteres+bola | aducao | 0 | 0 | 0 | 6912 | 0 |
| halteres+bola | crucifixo | 0 | 4755 | 6765 | 0 | 0 |
| halteres+bola | extensora | 11520 | 0 | 0 | 0 | 0 |
| halteres+bola | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | abducao | 4608 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | aducao | 0 | 0 | 0 | 6912 | 0 |
| suspensao+elasticos | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | abducao | 4608 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | aducao | 0 | 0 | 0 | 6912 | 0 |
| banco+halteres-leves | extensora | 11520 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step+elasticos | abducao | 4608 | 0 | 0 | 0 | 0 |
| step+elasticos | aducao | 0 | 0 | 0 | 6912 | 0 |
| step+elasticos | extensora | 11520 | 0 | 0 | 0 | 0 |
| step+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |

- Avisos que sugerem comprar algo, em todos os cenários: **0**.
- "Nenhum exercício possível" dito para um músculo que tinha exercício possível: **0**.
- Músculo com meta abaixo do limiar (a meta, se prioridade; senão, 4 séries) sem aviso: **0**.
- Programas sem nenhuma série de puxar com o aviso `equipamento.sem-puxada-vertical`: **0** (ele só dispara quando a puxada cai para uma remada).

## Equilíbrio (sem dor)

| cenário | empurra e não puxa | joelho sem posteriores da coxa |
| --- | ---: | ---: |
| vazio (= 10 outros) | 100% | 0% |
| estacao_polia_dupla | 0% | 0% |
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
| kettlebell | 100% | 0% |
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
| barra-porta+elasticos | 0% | 1% |
| halteres+bola | 0% | 1% |
| suspensao+elasticos | 0% | 1% |
| banco+halteres-leves | 0% | 1% |
| step+elasticos | 0% | 1% |

## Tempo (sem dor)

Exercícios por dia no programa × os que cabem nos minutos (`tempo.exercicios-por-sessao`), séries por exercício e o dia mais longo.

| cenário | minutos | cabem | exercícios por dia | séries por exercício | no teto de 4 séries | dia mais longo (mediana, min) | sobra > 30% |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 20 | 3 | 2,5 | 2,7 | 25,8% | 23 | 0% |
| vazio (= 10 outros) | 30 | 4 | 3,2 | 2,7 | 23,5% | 30 | 0% |
| vazio (= 10 outros) | 45 | 6 | 4 | 2,7 | 24% | 44 | 5% |
| vazio (= 10 outros) | 60 | 8 | 4,1 | 2,7 | 26,3% | 50 | 21,7% |
| vazio (= 10 outros) | 90 | 12 | 4,1 | 2,7 | 27% | 50 | 82,8% |
| estacao_polia_dupla | 20 | 3 | 2,8 | 2,7 | 25,7% | 29 | 0% |
| estacao_polia_dupla | 30 | 4 | 3,6 | 2,7 | 21,5% | 32 | 0% |
| estacao_polia_dupla | 45 | 6 | 5 | 2,7 | 23% | 45 | 0% |
| estacao_polia_dupla | 60 | 8 | 5,5 | 2,7 | 26,3% | 58 | 6,1% |
| estacao_polia_dupla | 90 | 12 | 5,8 | 2,8 | 28,7% | 63 | 50% |
| barra_fixa | 20 | 3 | 2,6 | 2,7 | 27% | 25 | 0% |
| barra_fixa | 30 | 4 | 3,3 | 2,8 | 28,3% | 30 | 0% |
| barra_fixa | 45 | 6 | 4,1 | 2,8 | 28,1% | 44 | 1,1% |
| barra_fixa | 60 | 8 | 4,3 | 2,9 | 32,3% | 53 | 17,2% |
| barra_fixa | 90 | 12 | 4,3 | 2,9 | 33,8% | 53 | 76,7% |
| halteres_fixos | 20 | 3 | 2,6 | 2,8 | 30,1% | 27 | 0% |
| halteres_fixos | 30 | 4 | 3,5 | 2,8 | 26,8% | 30 | 0% |
| halteres_fixos | 45 | 6 | 5,2 | 2,7 | 24% | 44 | 0% |
| halteres_fixos | 60 | 8 | 6,2 | 2,7 | 24,7% | 58 | 6,1% |
| halteres_fixos | 90 | 12 | 6,4 | 2,7 | 25,3% | 61 | 52,8% |
| anilhas_e_manoplas | 20 | 3 | 2,6 | 2,8 | 28,7% | 27 | 0% |
| anilhas_e_manoplas | 30 | 4 | 3,6 | 2,8 | 25,5% | 30 | 0% |
| anilhas_e_manoplas | 45 | 6 | 5,2 | 2,7 | 22,1% | 45 | 0% |
| anilhas_e_manoplas | 60 | 8 | 6,2 | 2,7 | 23,3% | 58 | 6,1% |
| anilhas_e_manoplas | 90 | 12 | 6,4 | 2,7 | 25,3% | 61 | 52,8% |
| barra_longa | 20 | 3 | 2,6 | 2,8 | 30,2% | 26 | 0% |
| barra_longa | 30 | 4 | 3,2 | 2,7 | 25,5% | 31 | 0% |
| barra_longa | 45 | 6 | 4 | 2,8 | 26,5% | 45 | 3,3% |
| barra_longa | 60 | 8 | 4,2 | 2,8 | 31,4% | 51 | 20,6% |
| barra_longa | 90 | 12 | 4,2 | 2,8 | 32% | 51 | 82,2% |
| barra_w | 20 | 3 | 2,6 | 2,7 | 25,5% | 25 | 0% |
| barra_w | 30 | 4 | 3,3 | 2,8 | 25,6% | 30 | 0% |
| barra_w | 45 | 6 | 4,3 | 2,8 | 25,8% | 44 | 1,1% |
| barra_w | 60 | 8 | 4,6 | 2,8 | 27,6% | 53 | 18,3% |
| barra_w | 90 | 12 | 4,6 | 2,8 | 29% | 53 | 81,7% |
| rack_de_agachamento | 20 | 3 | 2,5 | 2,9 | 33,5% | 25 | 0% |
| rack_de_agachamento | 30 | 4 | 3,2 | 2,8 | 26,9% | 30 | 0% |
| rack_de_agachamento | 45 | 6 | 4,2 | 2,8 | 27% | 44 | 1,1% |
| rack_de_agachamento | 60 | 8 | 4,5 | 2,8 | 30,3% | 53 | 17,2% |
| rack_de_agachamento | 90 | 12 | 4,5 | 2,8 | 32,2% | 53 | 75,6% |
| smith | 20 | 3 | 2,5 | 2,9 | 33,5% | 25 | 0% |
| smith | 30 | 4 | 3,2 | 2,8 | 27% | 30 | 0% |
| smith | 45 | 6 | 4,2 | 2,8 | 27,6% | 44 | 1,1% |
| smith | 60 | 8 | 4,5 | 2,8 | 30,3% | 52 | 17,2% |
| smith | 90 | 12 | 4,5 | 2,8 | 32,2% | 52 | 77,2% |
| leg_press | 20 | 3 | 2,5 | 2,7 | 25,6% | 23 | 0% |
| leg_press | 30 | 4 | 3,2 | 2,7 | 23,4% | 30 | 0% |
| leg_press | 45 | 6 | 4 | 2,7 | 23,1% | 44 | 6,7% |
| leg_press | 60 | 8 | 4,1 | 2,7 | 26,2% | 48 | 23,9% |
| leg_press | 90 | 12 | 4,1 | 2,7 | 27% | 48 | 84,4% |
| cadeira_extensora | 20 | 3 | 2,5 | 2,7 | 24,7% | 23 | 0% |
| cadeira_extensora | 30 | 4 | 3,2 | 2,7 | 23,4% | 30 | 0% |
| cadeira_extensora | 45 | 6 | 4,3 | 2,6 | 18,8% | 44 | 1,7% |
| cadeira_extensora | 60 | 8 | 4,5 | 2,6 | 20,1% | 49 | 21,1% |
| cadeira_extensora | 90 | 12 | 4,5 | 2,6 | 20,8% | 49 | 84,4% |
| mesa_flexora | 20 | 3 | 2,5 | 2,6 | 18,5% | 23 | 0% |
| mesa_flexora | 30 | 4 | 3,2 | 2,6 | 20% | 30 | 0% |
| mesa_flexora | 45 | 6 | 4 | 2,6 | 20,9% | 44 | 2,8% |
| mesa_flexora | 60 | 8 | 4,2 | 2,7 | 26% | 51 | 18,9% |
| mesa_flexora | 90 | 12 | 4,2 | 2,7 | 26,8% | 51 | 82,2% |
| cadeira_flexora | 20 | 3 | 2,5 | 2,6 | 18,5% | 23 | 0% |
| cadeira_flexora | 30 | 4 | 3,2 | 2,6 | 20% | 30 | 0% |
| cadeira_flexora | 45 | 6 | 4 | 2,6 | 20,9% | 44 | 2,8% |
| cadeira_flexora | 60 | 8 | 4,2 | 2,7 | 26% | 51 | 18,9% |
| cadeira_flexora | 90 | 12 | 4,2 | 2,7 | 26,8% | 51 | 82,2% |
| paralelas | 20 | 3 | 2,5 | 2,7 | 25,9% | 24 | 0% |
| paralelas | 30 | 4 | 3,2 | 2,7 | 23,6% | 30 | 0% |
| paralelas | 45 | 6 | 4 | 2,7 | 23,5% | 44 | 5,6% |
| paralelas | 60 | 8 | 4,1 | 2,7 | 25,8% | 51 | 22,8% |
| paralelas | 90 | 12 | 4,2 | 2,7 | 26,3% | 51 | 83,9% |
| elasticos | 20 | 3 | 2,9 | 2,6 | 19,2% | 27 | 0% |
| elasticos | 30 | 4 | 3,8 | 2,6 | 17,9% | 33 | 0% |
| elasticos | 45 | 6 | 5,5 | 2,6 | 16,9% | 45 | 0% |
| elasticos | 60 | 8 | 6,6 | 2,6 | 17,6% | 58 | 2,2% |
| elasticos | 90 | 12 | 7 | 2,6 | 20,3% | 66 | 40,6% |
| step | 20 | 3 | 2,5 | 2,7 | 24,3% | 23 | 0% |
| step | 30 | 4 | 3,2 | 2,7 | 22,8% | 30 | 0% |
| step | 45 | 6 | 4 | 2,7 | 22,9% | 44 | 3,9% |
| step | 60 | 8 | 4,1 | 2,7 | 26,3% | 50 | 21,1% |
| step | 90 | 12 | 4,1 | 2,7 | 27% | 50 | 81,7% |
| bola_suica | 20 | 3 | 2,5 | 2,7 | 24,6% | 25 | 0% |
| bola_suica | 30 | 4 | 3,2 | 2,6 | 20,7% | 30 | 0% |
| bola_suica | 45 | 6 | 4,1 | 2,7 | 21,9% | 44 | 2,8% |
| bola_suica | 60 | 8 | 4,2 | 2,7 | 25% | 49 | 21,1% |
| bola_suica | 90 | 12 | 4,2 | 2,7 | 25,7% | 49 | 83,9% |
| barra_hexagonal | 20 | 3 | 2,5 | 2,7 | 22% | 22 | 0% |
| barra_hexagonal | 30 | 4 | 3,2 | 2,7 | 22,6% | 30 | 0% |
| barra_hexagonal | 45 | 6 | 4 | 2,6 | 23% | 43 | 6,1% |
| barra_hexagonal | 60 | 8 | 4,1 | 2,7 | 23,9% | 47 | 26,1% |
| barra_hexagonal | 90 | 12 | 4,1 | 2,7 | 24,4% | 47 | 84,4% |
| kettlebell | 20 | 3 | 2,5 | 2,7 | 25,5% | 23 | 0% |
| kettlebell | 30 | 4 | 3,2 | 2,7 | 23,8% | 30 | 0% |
| kettlebell | 45 | 6 | 4 | 2,7 | 24,2% | 44 | 5,6% |
| kettlebell | 60 | 8 | 4,1 | 2,7 | 26,2% | 48 | 22,2% |
| kettlebell | 90 | 12 | 4,1 | 2,7 | 27% | 48 | 82,8% |
| banco_romano | 20 | 3 | 2,5 | 2,6 | 24,7% | 27 | 0% |
| banco_romano | 30 | 4 | 3,2 | 2,6 | 17,3% | 30 | 0% |
| banco_romano | 45 | 6 | 4 | 2,6 | 19,8% | 44 | 3,9% |
| banco_romano | 60 | 8 | 4,2 | 2,7 | 24,3% | 51 | 20,6% |
| banco_romano | 90 | 12 | 4,2 | 2,7 | 24,7% | 51 | 81,7% |
| estacao_puxada | 20 | 3 | 2,6 | 2,8 | 30,9% | 25 | 0% |
| estacao_puxada | 30 | 4 | 3,3 | 2,8 | 30% | 30 | 0% |
| estacao_puxada | 45 | 6 | 4,1 | 2,8 | 28,7% | 44 | 1,1% |
| estacao_puxada | 60 | 8 | 4,3 | 2,9 | 32,2% | 53 | 17,2% |
| estacao_puxada | 90 | 12 | 4,3 | 2,9 | 33,8% | 53 | 73,9% |
| estacao_remada | 20 | 3 | 2,6 | 2,8 | 30% | 25 | 0% |
| estacao_remada | 30 | 4 | 3,3 | 2,8 | 27,8% | 30 | 0% |
| estacao_remada | 45 | 6 | 4,1 | 2,8 | 29,3% | 44 | 1,1% |
| estacao_remada | 60 | 8 | 4,3 | 2,9 | 33,3% | 51 | 20,6% |
| estacao_remada | 90 | 12 | 4,3 | 2,9 | 34,1% | 51 | 83,3% |
| multifuncional | 20 | 3 | 2,8 | 2,7 | 23,5% | 25 | 0% |
| multifuncional | 30 | 4 | 3,5 | 2,7 | 21,1% | 30 | 0% |
| multifuncional | 45 | 6 | 4,5 | 2,7 | 23,4% | 44 | 1,1% |
| multifuncional | 60 | 8 | 4,7 | 2,8 | 26,9% | 53 | 15% |
| multifuncional | 90 | 12 | 4,7 | 2,8 | 28,4% | 53 | 75,6% |
| supino_maquina | 20 | 3 | 2,6 | 2,6 | 23,1% | 23 | 0% |
| supino_maquina | 30 | 4 | 3,3 | 2,6 | 20,9% | 30 | 0% |
| supino_maquina | 45 | 6 | 4,1 | 2,7 | 22% | 44 | 5,6% |
| supino_maquina | 60 | 8 | 4,2 | 2,7 | 24,4% | 50 | 21,7% |
| supino_maquina | 90 | 12 | 4,2 | 2,7 | 25,1% | 50 | 82,8% |
| voador | 20 | 3 | 2,6 | 2,6 | 22,4% | 23 | 0% |
| voador | 30 | 4 | 3,3 | 2,6 | 21,1% | 30 | 0% |
| voador | 45 | 6 | 4,3 | 2,6 | 20,7% | 44 | 5% |
| voador | 60 | 8 | 4,5 | 2,6 | 23,7% | 50 | 17,2% |
| voador | 90 | 12 | 4,5 | 2,6 | 24,2% | 50 | 81,7% |
| desenvolvimento_maquina | 20 | 3 | 2,5 | 2,7 | 25,8% | 23 | 0% |
| desenvolvimento_maquina | 30 | 4 | 3,2 | 2,7 | 23,5% | 30 | 0% |
| desenvolvimento_maquina | 45 | 6 | 4 | 2,7 | 24% | 44 | 5% |
| desenvolvimento_maquina | 60 | 8 | 4,1 | 2,7 | 26,3% | 50 | 21,7% |
| desenvolvimento_maquina | 90 | 12 | 4,1 | 2,7 | 27% | 50 | 82,8% |
| remada_articulada | 20 | 3 | 2,6 | 2,8 | 30% | 25 | 0% |
| remada_articulada | 30 | 4 | 3,3 | 2,8 | 27,8% | 30 | 0% |
| remada_articulada | 45 | 6 | 4,1 | 2,8 | 29,3% | 44 | 1,1% |
| remada_articulada | 60 | 8 | 4,3 | 2,9 | 33,3% | 51 | 20,6% |
| remada_articulada | 90 | 12 | 4,3 | 2,9 | 34,1% | 51 | 83,3% |
| graviton | 20 | 3 | 2,7 | 2,8 | 29,2% | 27 | 0% |
| graviton | 30 | 4 | 3,3 | 2,8 | 27,1% | 30 | 0% |
| graviton | 45 | 6 | 4,2 | 2,8 | 26,7% | 44 | 1,1% |
| graviton | 60 | 8 | 4,4 | 2,8 | 30,3% | 53 | 17,2% |
| graviton | 90 | 12 | 4,4 | 2,8 | 31,4% | 53 | 73,3% |
| rosca_maquina | 20 | 3 | 2,6 | 2,7 | 23,9% | 24 | 0% |
| rosca_maquina | 30 | 4 | 3,3 | 2,8 | 25,1% | 30 | 0% |
| rosca_maquina | 45 | 6 | 4,3 | 2,8 | 25,1% | 44 | 1,1% |
| rosca_maquina | 60 | 8 | 4,6 | 2,8 | 27,4% | 53 | 18,3% |
| rosca_maquina | 90 | 12 | 4,6 | 2,8 | 29% | 53 | 81,7% |
| triceps_maquina | 20 | 3 | 2,5 | 2,7 | 26,3% | 23 | 0% |
| triceps_maquina | 30 | 4 | 3,2 | 2,7 | 24% | 30 | 0% |
| triceps_maquina | 45 | 6 | 4 | 2,8 | 25,4% | 44 | 3,3% |
| triceps_maquina | 60 | 8 | 4,1 | 2,8 | 28,2% | 51 | 21,7% |
| triceps_maquina | 90 | 12 | 4,1 | 2,8 | 28,6% | 51 | 85% |
| abdominal_maquina | 20 | 3 | 2,5 | 2,7 | 25,8% | 23 | 0% |
| abdominal_maquina | 30 | 4 | 3,2 | 2,7 | 22,7% | 30 | 0% |
| abdominal_maquina | 45 | 6 | 4 | 2,7 | 23,5% | 44 | 5,6% |
| abdominal_maquina | 60 | 8 | 4,1 | 2,7 | 26,5% | 50 | 22,2% |
| abdominal_maquina | 90 | 12 | 4,1 | 2,7 | 27% | 50 | 82,8% |
| hack | 20 | 3 | 2,5 | 2,7 | 25,5% | 23 | 0% |
| hack | 30 | 4 | 3,2 | 2,7 | 23,8% | 30 | 0% |
| hack | 45 | 6 | 4 | 2,7 | 24,2% | 44 | 5,6% |
| hack | 60 | 8 | 4,1 | 2,7 | 26,2% | 48 | 22,2% |
| hack | 90 | 12 | 4,1 | 2,7 | 27% | 48 | 82,8% |
| cadeira_abdutora_adutora | 20 | 3 | 2,5 | 2,7 | 25,3% | 24 | 0% |
| cadeira_abdutora_adutora | 30 | 4 | 3,2 | 2,7 | 22,3% | 30 | 0% |
| cadeira_abdutora_adutora | 45 | 6 | 4,1 | 2,7 | 23,8% | 44 | 5% |
| cadeira_abdutora_adutora | 60 | 8 | 4,5 | 2,6 | 23,6% | 53 | 18,3% |
| cadeira_abdutora_adutora | 90 | 12 | 4,5 | 2,7 | 24,2% | 53 | 76,1% |
| gluteo_maquina | 20 | 3 | 2,4 | 2,7 | 25,7% | 23 | 0% |
| gluteo_maquina | 30 | 4 | 3,1 | 2,8 | 27% | 30 | 0% |
| gluteo_maquina | 45 | 6 | 3,9 | 2,7 | 26,3% | 44 | 5% |
| gluteo_maquina | 60 | 8 | 4,1 | 2,7 | 26,6% | 49 | 22,2% |
| gluteo_maquina | 90 | 12 | 4,1 | 2,7 | 27% | 49 | 84,4% |
| panturrilha_em_pe_maquina | 20 | 3 | 2,5 | 2,7 | 25,9% | 23 | 0% |
| panturrilha_em_pe_maquina | 30 | 4 | 3,2 | 2,7 | 23,3% | 30 | 0% |
| panturrilha_em_pe_maquina | 45 | 6 | 4 | 2,7 | 23% | 44 | 5,6% |
| panturrilha_em_pe_maquina | 60 | 8 | 4,1 | 2,7 | 26,3% | 50 | 22,2% |
| panturrilha_em_pe_maquina | 90 | 12 | 4,1 | 2,7 | 27% | 50 | 84,4% |
| panturrilha_sentada_maquina | 20 | 3 | 2,5 | 2,7 | 25,8% | 23 | 0% |
| panturrilha_sentada_maquina | 30 | 4 | 3,2 | 2,7 | 24,5% | 30 | 0% |
| panturrilha_sentada_maquina | 45 | 6 | 4,1 | 2,7 | 21,5% | 44 | 5% |
| panturrilha_sentada_maquina | 60 | 8 | 4,3 | 2,7 | 23,5% | 50 | 21,7% |
| panturrilha_sentada_maquina | 90 | 12 | 4,3 | 2,7 | 24,6% | 50 | 75,6% |
| suspensao | 20 | 3 | 2,5 | 2,9 | 33,5% | 25 | 0% |
| suspensao | 30 | 4 | 3,2 | 2,8 | 26,9% | 30 | 0% |
| suspensao | 45 | 6 | 4,2 | 2,8 | 27% | 44 | 1,1% |
| suspensao | 60 | 8 | 4,5 | 2,8 | 30,3% | 53 | 17,2% |
| suspensao | 90 | 12 | 4,5 | 2,8 | 32,2% | 53 | 75,6% |
| barra-porta+elasticos | 20 | 3 | 2,8 | 2,6 | 19,8% | 28 | 0% |
| barra-porta+elasticos | 30 | 4 | 3,8 | 2,6 | 18,1% | 33 | 0% |
| barra-porta+elasticos | 45 | 6 | 5,5 | 2,6 | 17,3% | 45 | 0% |
| barra-porta+elasticos | 60 | 8 | 6,6 | 2,6 | 18,4% | 58 | 2,2% |
| barra-porta+elasticos | 90 | 12 | 7 | 2,6 | 19,9% | 66 | 43,3% |
| halteres+bola | 20 | 3 | 2,6 | 2,7 | 28,1% | 27 | 0% |
| halteres+bola | 30 | 4 | 3,6 | 2,8 | 24,8% | 31 | 0% |
| halteres+bola | 45 | 6 | 5,2 | 2,7 | 22,1% | 45 | 0% |
| halteres+bola | 60 | 8 | 6,2 | 2,7 | 23,3% | 58 | 6,1% |
| halteres+bola | 90 | 12 | 6,4 | 2,7 | 25,3% | 60 | 52,8% |
| suspensao+elasticos | 20 | 3 | 2,8 | 2,6 | 19,8% | 28 | 0% |
| suspensao+elasticos | 30 | 4 | 3,8 | 2,6 | 18% | 33 | 0% |
| suspensao+elasticos | 45 | 6 | 5,5 | 2,6 | 17,2% | 45 | 0% |
| suspensao+elasticos | 60 | 8 | 6,6 | 2,6 | 17,5% | 58 | 2,2% |
| suspensao+elasticos | 90 | 12 | 7 | 2,6 | 19,6% | 66 | 42,2% |
| banco+halteres-leves | 20 | 3 | 2,7 | 2,6 | 19,2% | 26 | 0% |
| banco+halteres-leves | 30 | 4 | 3,8 | 2,6 | 17,2% | 31 | 0% |
| banco+halteres-leves | 45 | 6 | 5,4 | 2,6 | 15,2% | 45 | 0% |
| banco+halteres-leves | 60 | 8 | 6,5 | 2,6 | 16,7% | 59 | 2,2% |
| banco+halteres-leves | 90 | 12 | 7 | 2,6 | 20% | 65 | 42,2% |
| step+elasticos | 20 | 3 | 2,9 | 2,6 | 19,2% | 27 | 0% |
| step+elasticos | 30 | 4 | 3,8 | 2,6 | 17,9% | 33 | 0% |
| step+elasticos | 45 | 6 | 5,5 | 2,6 | 16,4% | 45 | 0% |
| step+elasticos | 60 | 8 | 6,6 | 2,6 | 17,1% | 58 | 2,2% |
| step+elasticos | 90 | 12 | 7 | 2,6 | 20,2% | 67 | 40,6% |

## Guia: prescrições com animação, só cartão e sem nada

| cenário | com animação | só cartão de texto | sem guia nenhum |
| --- | ---: | ---: | ---: |
| vazio (= 10 outros) | 41,3% | 58,7% | 0% |
| estacao_polia_dupla | 48,8% | 39% | 12,2% |
| barra_fixa | 44,7% | 55,3% | 0% |
| halteres_fixos | 62,1% | 33,7% | 4,2% |
| anilhas_e_manoplas | 62,1% | 33,7% | 4,2% |
| barra_longa | 37,6% | 50,5% | 11,9% |
| barra_w | 35,9% | 52,7% | 11,5% |
| rack_de_agachamento | 34,6% | 52,8% | 12,5% |
| smith | 34,5% | 53% | 12,5% |
| leg_press | 25,1% | 49,2% | 25,6% |
| cadeira_extensora | 38,9% | 61,1% | 0% |
| mesa_flexora | 40,6% | 44,8% | 14,6% |
| cadeira_flexora | 40,6% | 59,4% | 0% |
| paralelas | 38,6% | 61,4% | 0% |
| elasticos | 21,8% | 16,1% | 62,1% |
| step | 41,3% | 58,7% | 0% |
| bola_suica | 54,6% | 45,4% | 0% |
| barra_hexagonal | 41,1% | 58,9% | 0% |
| kettlebell | 40,9% | 59,1% | 0% |
| banco_romano | 40,2% | 59,8% | 0% |
| estacao_puxada | 35,7% | 64,3% | 0% |
| estacao_remada | 36,8% | 63,2% | 0% |
| multifuncional | 33,2% | 66,8% | 0% |
| supino_maquina | 34% | 66% | 0% |
| voador | 33,5% | 66,5% | 0% |
| desenvolvimento_maquina | 41,1% | 58,9% | 0% |
| remada_articulada | 35,7% | 64,3% | 0% |
| graviton | 31,9% | 68,1% | 0% |
| rosca_maquina | 35,1% | 64,9% | 0% |
| triceps_maquina | 40,5% | 59,5% | 0% |
| abdominal_maquina | 28,1% | 71,9% | 0% |
| hack | 40,9% | 59,1% | 0% |
| cadeira_abdutora_adutora | 37,3% | 62,7% | 0% |
| gluteo_maquina | 41,4% | 58,6% | 0% |
| panturrilha_em_pe_maquina | 25,1% | 74,9% | 0% |
| panturrilha_sentada_maquina | 34,5% | 65,5% | 0% |
| suspensao | 34,6% | 65,4% | 0% |
| barra-porta+elasticos | 27,7% | 18,2% | 54,1% |
| halteres+bola | 69,4% | 26,4% | 4,2% |
| suspensao+elasticos | 21,8% | 24,9% | 53,4% |
| banco+halteres-leves | 62,1% | 34,8% | 3,1% |
| step+elasticos | 21,7% | 16,1% | 62,1% |

## Segurança: o que sobra com dor, no inventário vazio e com um aparelho só

| cenário | dor | dias só com abdominal | dias de superior sem tronco nem braço | dias vazios | carrega a região | região que o dado não marca | exercícios que sobram |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| vazio (= 10 outros) | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| vazio (= 10 outros) | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| vazio (= 10 outros) | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| estacao_polia_dupla | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas |
| estacao_polia_dupla | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-unilateral, rosca-polia-costas |
| estacao_polia_dupla | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas |
| estacao_polia_dupla | cotovelo 7 | 0 | 95 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-unilateral, rosca-polia-costas |
| barra_fixa | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, barra-fixa, barra-fixa-supinada, elevacao-joelhos, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_fixa | punho 7 | 0 | 55 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, elevacao-joelhos, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, elevacao-joelhos, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_fixa | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_fixa | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | barra-fixa, barra-fixa-supinada, elevacao-joelhos, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| halteres_fixos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | ombro 7 | 0 | 49 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, stiff, stiff-unilateral |
| halteres_fixos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, pike, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres_fixos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | ombro 7 | 0 | 37 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, stiff, stiff-unilateral |
| anilhas_e_manoplas | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, pike, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, stiff, stiff-unilateral |
| anilhas_e_manoplas | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| barra_longa | joelho 7 | 0 | 118 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | punho 7 | 0 | 555 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-romeno-barra |
| barra_longa | lombar 7 | 0 | 381 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_longa | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-romeno-barra |
| barra_longa | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_w | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| barra_w | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_w | ombro 7 | 0 | 60 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-barra-w |
| barra_w | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| barra_w | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| barra_w | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-barra-w |
| rack_de_agachamento | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| rack_de_agachamento | punho 7 | 0 | 92 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-invertida |
| rack_de_agachamento | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rack_de_agachamento | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| rack_de_agachamento | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rack_de_agachamento | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | punho 7 | 0 | 92 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-invertida |
| smith | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| smith | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| smith | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| smith | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-invertida |
| leg_press | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-leg-press, pike, ponte-gluteo |
| leg_press | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-leg-press, ponte-gluteo |
| leg_press | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-leg-press, ponte-gluteo |
| leg_press | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, leg-press, nordico, panturrilha-leg-press, pike, ponte-gluteo |
| leg_press | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, leg-press, nordico, panturrilha-leg-press, ponte-gluteo |
| leg_press | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-leg-press, pike, ponte-gluteo |
| cadeira_extensora | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_extensora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | lombar 7 | 0 | 329 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_extensora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | lombar 7 | 0 | 332 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, pike, ponte-gluteo |
| mesa_flexora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mesa-flexora, nordico, panturrilha-chao, ponte-gluteo |
| mesa_flexora | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | lombar 7 | 0 | 332 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_flexora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| paralelas | joelho 7 | 0 | 347 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, mergulho, panturrilha-chao, pike, ponte-gluteo |
| paralelas | punho 7 | 0 | 718 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, mergulho, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | lombar 7 | 0 | 352 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, mergulho, nordico, panturrilha-chao, pike, ponte-gluteo |
| paralelas | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| paralelas | joelho 7 + lombar 7 | 0 | 347 | 0 | 0 | 0 | flexao, flexao-fechada, mergulho, panturrilha-chao, pike, ponte-gluteo |
| elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| elasticos | ombro 7 | 0 | 42 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| step | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| step | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| step | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo |
| bola_suica | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| bola_suica | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| bola_suica | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| bola_suica | lombar 7 | 0 | 332 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-bola, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| bola_suica | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| bola_suica | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| barra_hexagonal | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| kettlebell | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| kettlebell | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-gluteo |
| kettlebell | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-gluteo |
| kettlebell | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, pike, ponte-gluteo |
| kettlebell | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, goblet-kettlebell, nordico, panturrilha-chao, ponte-gluteo |
| kettlebell | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| banco_romano | joelho 7 | 0 | 317 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, hiperextensao, panturrilha-chao, pike, ponte-gluteo |
| banco_romano | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| banco_romano | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hiperextensao, nordico, panturrilha-chao, ponte-gluteo |
| banco_romano | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| estacao_puxada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_puxada | punho 7 | 0 | 52 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-frente |
| estacao_puxada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_puxada | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_puxada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_puxada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| estacao_remada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | punho 7 | 0 | 52 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_remada | lombar 7 | 0 | 380 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| estacao_remada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| estacao_remada | joelho 7 + lombar 7 | 0 | 295 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| multifuncional | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | punho 7 | 0 | 168 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| multifuncional | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| multifuncional | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| multifuncional | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-frente |
| supino_maquina | joelho 7 | 0 | 342 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| supino_maquina | punho 7 | 0 | 213 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, supino-maquina |
| supino_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| supino_maquina | lombar 7 | 0 | 346 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| supino_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| supino_maquina | joelho 7 + lombar 7 | 0 | 342 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, supino-maquina |
| voador | joelho 7 | 0 | 314 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, voador |
| voador | punho 7 | 0 | 189 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, voador |
| voador | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| voador | lombar 7 | 0 | 329 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, voador |
| voador | cotovelo 7 | 0 | 189 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, voador |
| voador | joelho 7 + lombar 7 | 0 | 314 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, voador |
| desenvolvimento_maquina | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, desenvolvimento-maquina, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | punho 7 | 0 | 727 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | desenvolvimento-maquina, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo |
| remada_articulada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-articulada |
| remada_articulada | punho 7 | 0 | 52 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-articulada |
| remada_articulada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| remada_articulada | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-articulada |
| remada_articulada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| remada_articulada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-articulada |
| graviton | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, barra-fixa-graviton, flexao, flexao-fechada, mergulho-graviton, panturrilha-chao, pike, ponte-gluteo |
| graviton | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa-graviton, bulgaro-peso-corpo, flexao-joelho-deslizante, mergulho-graviton, nordico, panturrilha-chao, ponte-gluteo |
| graviton | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| graviton | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, barra-fixa-graviton, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, mergulho-graviton, nordico, panturrilha-chao, pike, ponte-gluteo |
| graviton | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| graviton | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | barra-fixa-graviton, flexao, flexao-fechada, mergulho-graviton, panturrilha-chao, pike, ponte-gluteo |
| rosca_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-maquina |
| rosca_maquina | punho 7 | 0 | 60 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | ombro 7 | 0 | 60 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, rosca-maquina |
| rosca_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| rosca_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, rosca-maquina |
| triceps_maquina | joelho 7 | 0 | 240 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| triceps_maquina | punho 7 | 0 | 314 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | ombro 7 | 0 | 314 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | lombar 7 | 0 | 281 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| triceps_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| triceps_maquina | joelho 7 + lombar 7 | 0 | 240 | 0 | 0 | 0 | flexao, panturrilha-chao, pike, ponte-gluteo, triceps-maquina |
| abdominal_maquina | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-maquina, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| abdominal_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| abdominal_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| hack | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| hack | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, pike, ponte-gluteo |
| hack | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, hack, nordico, panturrilha-chao, ponte-gluteo |
| hack | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 | 0 | 332 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | lombar 7 | 0 | 331 | 0 | 0 | 0 | abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo |
| cadeira_abdutora_adutora | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 + lombar 7 | 0 | 332 | 0 | 0 | 0 | abducao-maquina, aducao-maquina, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo |
| gluteo_maquina | joelho 7 | 0 | 332 | 0 | 0 | 0 | abdominal-chao, coice-maquina, flexao, flexao-fechada, panturrilha-chao, pike |
| gluteo_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike |
| gluteo_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao-joelho-deslizante, nordico, panturrilha-chao |
| gluteo_maquina | joelho 7 + lombar 7 | 0 | 332 | 0 | 0 | 0 | coice-maquina, flexao, flexao-fechada, panturrilha-chao, pike |
| panturrilha_em_pe_maquina | joelho 7 | 0 | 331 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_em_pe_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_em_pe_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | joelho 7 + lombar 7 | 0 | 331 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-em-pe-maquina, pike, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 | 0 | 324 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| panturrilha_sentada_maquina | punho 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | ombro 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | lombar 7 | 0 | 331 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| panturrilha_sentada_maquina | cotovelo 7 | 0 | 1560 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 + lombar 7 | 0 | 324 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, panturrilha-sentada, pike, ponte-gluteo |
| suspensao | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-suspensao |
| suspensao | punho 7 | 0 | 92 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo, remada-suspensao |
| suspensao | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| suspensao | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-fechada, flexao-joelho-deslizante, nordico, panturrilha-chao, pike, ponte-gluteo, remada-suspensao |
| suspensao | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, nordico, panturrilha-chao, ponte-gluteo |
| suspensao | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, remada-suspensao |
| barra-porta+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, barra-fixa, barra-fixa-supinada, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| barra-porta+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| barra-porta+elasticos | ombro 7 | 0 | 42 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| barra-porta+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, triceps-elastico-acima |
| barra-porta+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| barra-porta+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | barra-fixa, barra-fixa-supinada, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, triceps-elastico-acima |
| halteres+bola | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-bola, goblet, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | ombro 7 | 0 | 38 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, flexao-bola, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, stiff, stiff-unilateral |
| halteres+bola | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-bola, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, pike, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-bola, goblet, panturrilha-chao, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres+bola | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | elevacao-halteres, flexao, flexao-fechada, panturrilha-chao, pike, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| suspensao+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| suspensao+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| suspensao+elasticos | ombro 7 | 0 | 42 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| suspensao+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, triceps-elastico-acima |
| suspensao+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| suspensao+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, triceps-elastico-acima |
| banco+halteres-leves | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-fechada, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, rosca-alternada, stiff, stiff-unilateral, supino-reto, triceps-frances-halter |
| banco+halteres-leves | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, rosca-alternada, stiff, stiff-unilateral, supino-reto, triceps-frances-halter |
| banco+halteres-leves | ombro 7 | 0 | 31 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, bulgaro, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, stiff, stiff-unilateral |
| banco+halteres-leves | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, elevacao-halteres, flexao-fechada, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, pike, ponte-gluteo-halter, rosca-alternada, supino-reto, triceps-frances-halter |
| banco+halteres-leves | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-joelho-deslizante, goblet, nordico, panturrilha-chao, ponte-gluteo-halter, stiff, stiff-unilateral |
| banco+halteres-leves | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-halteres, elevacao-halteres, flexao-fechada, panturrilha-chao, pike, ponte-gluteo-halter, rosca-alternada, supino-reto, triceps-frances-halter |
| step+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| step+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| step+elasticos | ombro 7 | 0 | 44 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| step+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, flexao-joelho-deslizante, flexao-joelho-elastico, nordico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| step+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-deslizante, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, stiff-elastico |
| step+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-fechada, panturrilha, panturrilha-bilateral-step, panturrilha-chao, pike, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |

## Exemplos (3 por problema, de cenários diferentes)

### `dia.superior-sem-superior`

- **vazio · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · punho 7**: Superior A sem nenhum exercício de tronco ou braço (panturrilha-chao).
  - Programa: Superior A (8 min): panturrilha-chao 4 | Inferior A (17 min): agachamento-peso-corpo 3, flexao-joelho-deslizante 3 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **estacao_polia_dupla · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (bulgaro-peso-corpo, panturrilha-chao).
  - Programa: Superior A (18 min): bulgaro-peso-corpo 2, panturrilha-chao 4 | Inferior A (12 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2
- **barra_fixa · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (bulgaro-peso-corpo, panturrilha-chao).
  - Programa: Superior A (18 min): bulgaro-peso-corpo 2, panturrilha-chao 4 | Inferior A (14 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 3 | Corpo todo (20 min): afundo-peso-corpo 2, ponte-gluteo 2, flexao-joelho-deslizante 2

### `equilibrio.sem-posteriores`

- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (19 min): goblet 2, flexao 2, remada-curvada-halteres 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **anilhas_e_manoplas · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (19 min): goblet 2, flexao 2, remada-curvada-halteres 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **rack_de_agachamento · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (19 min): agachamento-peso-corpo 2, flexao 2, remada-invertida 2 | Corpo todo B (21 min): afundo-peso-corpo 2, flexao 2, remada-invertida 2

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
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (28 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (23 min): afundo-peso-corpo 2, crucifixo-polia 2, flexao-joelho-deslizante 4
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4

### `vaga.so-aviso-do-musculo.puxar-horizontal`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (17 min): agachamento-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2 | Corpo todo B (19 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 2
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao-joelho-deslizante 2, abdominal-chao 4
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (21 min): agachamento-peso-corpo 2, flexao-joelho-deslizante 2, panturrilha-chao 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao-joelho-deslizante 2, abdominal-chao 4

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
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (28 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (23 min): afundo-peso-corpo 2, crucifixo-polia 2, flexao-joelho-deslizante 4
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (24 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (23 min): afundo-peso-corpo 2, flexao 2, flexao-joelho-deslizante 4

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
  - Programa: Corpo todo A (28 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (23 min): afundo-peso-corpo 2, crucifixo-polia 2, flexao-joelho-deslizante 4
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

- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (19 min): goblet 2, flexao 2, remada-curvada-halteres 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **anilhas_e_manoplas · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (19 min): goblet 2, flexao 2, remada-curvada-halteres 2 | Corpo todo B (20 min): afundo 2, flexao 2, remada-curvada-halteres 2
- **rack_de_agachamento · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (19 min): agachamento-peso-corpo 2, flexao 2, remada-invertida 2 | Corpo todo B (21 min): afundo-peso-corpo 2, flexao 2, remada-invertida 2

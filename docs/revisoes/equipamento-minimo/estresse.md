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
| `vaga.so-aviso-do-musculo.dobrar-quadril` | 354.745 |
| `vaga.so-aviso-do-musculo.ombro-posterior` | 343.879 |
| `vaga.so-aviso-do-musculo.biceps` | 338.626 |
| `vaga.so-aviso-do-musculo.flexao-joelho` | 337.776 |
| `vaga.so-aviso-do-musculo.triceps-complemento` | 324.709 |
| `vaga.so-aviso-do-musculo.triceps-acima-cabeca` | 319.994 |
| `vaga.so-aviso-do-musculo.puxar-horizontal` | 293.495 |
| `vaga.so-aviso-do-musculo.puxar-vertical` | 288.510 |
| `vaga.sem-aviso.empurrar-vertical` | 266.112 |
| `vaga.so-aviso-do-musculo.crucifixo` | 224.204 |
| `dia.superior-sem-superior` | 192.744 |
| `volume.zero.ombro_lateral` | 48.657 |
| `equilibrio.sem-posteriores` | 41.338 |
| `volume.zero.posteriores` | 41.338 |
| `equilibrio.sem-puxar` | 33.600 |
| `volume.zero.costas` | 33.600 |
| `volume.zero.ombro_posterior` | 33.600 |
| `volume.zero.biceps` | 30.789 |

## Volume: séries semanais, média por cenário (todas as situações)

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 6,2 | 0 | 8,1 | 7,5 | 4,3 |
| estacao_polia_dupla | 8,1 | 5,3 | 6 | 2,6 | 6,2 | 1,2 | 5,9 | 0 | 7,9 | 6,4 | 4 |
| barra_fixa | 4,8 | 5,3 | 0 | 1,5 | 2,7 | 2,4 | 6,1 | 0 | 7,7 | 6,9 | 5,7 |
| halteres_fixos | 5,9 | 3,9 | 6 | 3,9 | 6,5 | 5,9 | 5,6 | 6,7 | 10,2 | 5,6 | 3,6 |
| anilhas_e_manoplas | 5,9 | 3,9 | 6,1 | 4 | 6,6 | 5,9 | 5,6 | 6,7 | 10,2 | 5,7 | 3,6 |
| barra_longa | 5 | 2,4 | 0 | 1,2 | 1,2 | 2,5 | 6 | 4,3 | 9,6 | 6,9 | 4,1 |
| barra_w | 4,9 | 0 | 0 | 0 | 5,2 | 2,4 | 6,2 | 0 | 8,1 | 7 | 4,3 |
| rack_de_agachamento | 4,9 | 5,9 | 0 | 3 | 3 | 2,4 | 6,3 | 0 | 8,3 | 7 | 4,2 |
| smith | 4,9 | 5,9 | 0 | 3 | 3 | 2,4 | 6,3 | 0 | 8,4 | 7 | 4,2 |
| leg_press | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 6,5 | 0 | 8,2 | 7,4 | 4,4 |
| cadeira_extensora | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 7,4 | 0 | 8 | 7,4 | 4,3 |
| mesa_flexora | 5,1 | 0 | 0 | 0 | 0 | 2,5 | 5,7 | 5,9 | 7,8 | 7 | 4,2 |
| cadeira_flexora | 5,1 | 0 | 0 | 0 | 0 | 2,5 | 5,7 | 5,9 | 7,8 | 7 | 4,2 |
| paralelas | 6,4 | 0 | 0 | 0 | 0 | 4,4 | 6,1 | 0 | 8,1 | 7,4 | 4,3 |
| elasticos | 7,4 | 8 | 5,8 | 4,5 | 7,3 | 5,3 | 5,6 | 7,1 | 8,6 | 5,5 | 3,5 |
| step | 5,1 | 0 | 0 | 0 | 0 | 2,5 | 6,2 | 0 | 8,1 | 7,5 | 4,3 |
| bola_suica | 5,1 | 0 | 0 | 0 | 0 | 2,5 | 6,1 | 5,3 | 10 | 7,3 | 4,2 |
| barra_hexagonal | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 6,5 | 1,7 | 9,4 | 7,4 | 4,4 |
| kettlebell | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 6,5 | 0 | 8,2 | 7,3 | 4,3 |
| banco_romano | 5,1 | 0 | 0 | 0 | 0 | 2,5 | 5,9 | 5,7 | 12,3 | 7,1 | 4,1 |
| estacao_puxada | 4,8 | 5,7 | 0 | 2,8 | 2,8 | 2,4 | 6,1 | 0 | 7,8 | 6,9 | 4,3 |
| estacao_remada | 5 | 3,5 | 0 | 1,8 | 1,8 | 2,5 | 6,2 | 0 | 8,2 | 7,2 | 4,3 |
| multifuncional | 4,9 | 6,8 | 0 | 3,4 | 3,4 | 2,4 | 6,3 | 0 | 8,4 | 7 | 4,2 |
| supino_maquina | 6,4 | 0 | 0 | 0 | 0 | 3,2 | 6 | 0 | 8 | 7,3 | 4,3 |
| voador | 8,2 | 0 | 0 | 0 | 0 | 1,3 | 5,9 | 0 | 7,9 | 7,2 | 4,3 |
| desenvolvimento_maquina | 5 | 0 | 0,9 | 0 | 0 | 3,4 | 6,2 | 0 | 8,2 | 7,4 | 4,3 |
| remada_articulada | 4,8 | 5,5 | 0 | 2,7 | 2,7 | 2,4 | 6,1 | 0 | 8 | 7 | 4,3 |
| graviton | 6,3 | 5,5 | 0 | 2,7 | 2,7 | 4,6 | 6,1 | 0 | 7,8 | 6,8 | 4,3 |
| rosca_maquina | 4,9 | 0 | 0 | 0 | 6,2 | 2,4 | 6 | 0 | 7,9 | 6,8 | 4,3 |
| triceps_maquina | 5 | 0 | 0 | 0 | 0 | 6,3 | 6 | 0 | 7,9 | 7,1 | 4,3 |
| abdominal_maquina | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 6,2 | 0 | 8,1 | 7,5 | 4,4 |
| hack | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 6,5 | 0 | 8,2 | 7,3 | 4,3 |
| cadeira_abdutora_adutora | 5,1 | 0 | 0 | 0 | 0 | 2,5 | 6,1 | 0 | 9 | 7,3 | 4,3 |
| gluteo_maquina | 5,1 | 0 | 0 | 0 | 0 | 2,5 | 6,2 | 0 | 8,2 | 7,5 | 4,4 |
| panturrilha_em_pe_maquina | 5,1 | 0 | 0 | 0 | 0 | 2,6 | 6,2 | 0 | 8,1 | 7,7 | 4,4 |
| panturrilha_sentada_maquina | 5,2 | 0 | 0 | 0 | 0 | 2,6 | 6,3 | 0 | 8,2 | 8,4 | 4,3 |
| suspensao | 4,9 | 5,9 | 0 | 3 | 3 | 2,4 | 6,3 | 0 | 8,3 | 7 | 4,2 |
| barra-porta+elasticos | 7,5 | 8 | 5,8 | 5,3 | 7,3 | 5,3 | 5,6 | 7 | 8,6 | 5,4 | 4,8 |
| halteres+bola | 5,9 | 3,9 | 6,1 | 4 | 6,6 | 5,9 | 5,7 | 7,5 | 10,5 | 5,7 | 3,6 |
| suspensao+elasticos | 7,5 | 8 | 5,8 | 5,6 | 7,3 | 5,3 | 5,6 | 7,1 | 8,6 | 5,5 | 3,6 |
| banco+halteres-leves | 7,9 | 4,8 | 6 | 4,3 | 6,9 | 4,9 | 5,6 | 6,7 | 10,1 | 5,7 | 3,5 |
| step+elasticos | 7,4 | 8 | 5,8 | 4,5 | 7,3 | 5,3 | 5,6 | 7,1 | 8,6 | 5,5 | 3,5 |

### Sem dor: % dos programas com o músculo em 0 série na semana

| cenário | peito | costas | ombro (lateral) | ombro (posterior) | bíceps | tríceps | quadríceps | posteriores da coxa | glúteos | panturrilha | abdômen |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,6% |
| estacao_polia_dupla | 0% | 0% | 13,5% | 0% | 0% | 0% | 0% | 100% | 0% | 5,3% | 7,9% |
| barra_fixa | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 2,7% | 3,5% |
| halteres_fixos | 0% | 0% | 15,2% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 23,8% |
| anilhas_e_manoplas | 0% | 0% | 15,2% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 23,6% |
| barra_longa | 0% | 33,3% | 100% | 33,3% | 33,3% | 0% | 0% | 33,3% | 0% | 12,3% | 9,6% |
| barra_w | 0% | 100% | 100% | 100% | 3,3% | 0% | 0% | 100% | 0% | 2,8% | 5% |
| rack_de_agachamento | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 3,5% | 7,7% |
| smith | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 3,5% | 7,7% |
| leg_press | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,2% |
| cadeira_extensora | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 5,4% | 3,4% |
| mesa_flexora | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 10,1% | 0% | 4,9% | 4,7% |
| cadeira_flexora | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 10,1% | 0% | 4,9% | 4,7% |
| paralelas | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,6% |
| elasticos | 0% | 0% | 18,5% | 0% | 0% | 0% | 0% | 1,7% | 0% | 23,4% | 24% |
| step | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,7% |
| bola_suica | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 6,2% | 0% | 4,9% | 4,8% |
| barra_hexagonal | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 0% | 0% | 1,2% | 2,2% |
| kettlebell | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,6% |
| banco_romano | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 0% | 0% | 8,4% | 11,3% |
| estacao_puxada | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 2,7% | 3,6% |
| estacao_remada | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 2,4% | 4,4% |
| multifuncional | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 3,5% | 7,8% |
| supino_maquina | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,6% |
| voador | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,8% | 2,7% |
| desenvolvimento_maquina | 0% | 100% | 30,8% | 100% | 100% | 0% | 0% | 100% | 0% | 1,9% | 2,6% |
| remada_articulada | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 2,4% | 4,4% |
| graviton | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 2,7% | 3,5% |
| rosca_maquina | 0% | 100% | 100% | 100% | 1,5% | 0% | 0% | 100% | 0% | 2,8% | 5% |
| triceps_maquina | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,6% |
| abdominal_maquina | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,6% |
| hack | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,6% |
| cadeira_abdutora_adutora | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 5,7% | 3,4% |
| gluteo_maquina | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,2% |
| panturrilha_em_pe_maquina | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 1,2% | 2,6% |
| panturrilha_sentada_maquina | 0% | 100% | 100% | 100% | 100% | 0% | 0% | 100% | 0% | 2,7% | 3,5% |
| suspensao | 0% | 0% | 100% | 0% | 0% | 0% | 0% | 100% | 0% | 3,5% | 7,7% |
| barra-porta+elasticos | 0% | 0% | 18% | 0% | 0% | 0% | 0% | 1,7% | 0% | 23,4% | 24% |
| halteres+bola | 0% | 0% | 15,2% | 0% | 0% | 0% | 0% | 1,3% | 0% | 23,4% | 23,3% |
| suspensao+elasticos | 0% | 0% | 18% | 0% | 0% | 0% | 0% | 1,7% | 0% | 23,4% | 24% |
| banco+halteres-leves | 0% | 0% | 16% | 0% | 0% | 0% | 0% | 1% | 0% | 23,4% | 23,8% |
| step+elasticos | 0% | 0% | 18,5% | 0% | 0% | 0% | 0% | 1,7% | 0% | 23,4% | 24,2% |

## O que o app diz quando a vaga fica sem opção

Por programa e por função da divisão que ficou sem exercício possível por falta de equipamento (não por dor). "Aviso da vaga" = o texto da `lacuna` da função ("Sem cadeira extensora: …"). "Só aviso do músculo" = a vaga some e só aparece "Abaixo da meta semanal: costas 0 de 6". "Coberto" = outra vaga deu volume ao músculo. "Sem meta: nada" = o ombro anterior e os adutores não têm meta, então nada aparece.

| cenário | função | aviso da vaga | só aviso do músculo | coberto por outra vaga | sem meta: nada | nada |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | abducao | 4608 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | aducao | 0 | 0 | 0 | 6912 | 0 |
| vazio (= 10 outros) | biceps | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | crucifixo | 0 | 6435 | 5085 | 0 | 0 |
| vazio (= 10 outros) | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| vazio (= 10 outros) | extensora | 11520 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| vazio (= 10 outros) | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| vazio (= 10 outros) | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| estacao_polia_dupla | abducao | 4608 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | aducao | 0 | 0 | 0 | 6912 | 0 |
| estacao_polia_dupla | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| estacao_polia_dupla | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| estacao_polia_dupla | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| estacao_polia_dupla | ombro-posterior | 0 | 6910 | 4610 | 0 | 0 |
| estacao_polia_dupla | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_polia_dupla | puxar-horizontal | 0 | 6419 | 5101 | 0 | 0 |
| estacao_polia_dupla | triceps-acima-cabeca | 0 | 11460 | 60 | 0 | 0 |
| estacao_polia_dupla | triceps-complemento | 0 | 10500 | 60 | 0 | 0 |
| barra_fixa | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra_fixa | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra_fixa | biceps | 0 | 9880 | 1640 | 0 | 0 |
| barra_fixa | crucifixo | 0 | 6919 | 4601 | 0 | 0 |
| barra_fixa | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| barra_fixa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_fixa | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| barra_fixa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_fixa | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| barra_fixa | ombro-posterior | 0 | 10832 | 688 | 0 | 0 |
| barra_fixa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_fixa | puxar-horizontal | 0 | 6306 | 5214 | 0 | 0 |
| barra_fixa | triceps-acima-cabeca | 0 | 9720 | 1800 | 0 | 0 |
| barra_fixa | triceps-complemento | 0 | 8880 | 1680 | 0 | 0 |
| halteres_fixos | abducao | 4608 | 0 | 0 | 0 | 0 |
| halteres_fixos | aducao | 0 | 0 | 0 | 6912 | 0 |
| halteres_fixos | crucifixo | 0 | 5844 | 5676 | 0 | 0 |
| halteres_fixos | extensora | 11520 | 0 | 0 | 0 | 0 |
| halteres_fixos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| halteres_fixos | triceps-complemento | 0 | 4527 | 6033 | 0 | 0 |
| anilhas_e_manoplas | abducao | 4608 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | aducao | 0 | 0 | 0 | 6912 | 0 |
| anilhas_e_manoplas | crucifixo | 0 | 5838 | 5682 | 0 | 0 |
| anilhas_e_manoplas | extensora | 11520 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| anilhas_e_manoplas | triceps-complemento | 0 | 4505 | 6055 | 0 | 0 |
| barra_longa | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra_longa | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra_longa | biceps | 0 | 10832 | 688 | 0 | 0 |
| barra_longa | crucifixo | 0 | 6543 | 4977 | 0 | 0 |
| barra_longa | dobrar-quadril | 0 | 3840 | 0 | 0 | 0 |
| barra_longa | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_longa | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| barra_longa | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_longa | flexao-joelho | 0 | 3840 | 0 | 0 | 0 |
| barra_longa | ombro-posterior | 0 | 9608 | 1912 | 0 | 0 |
| barra_longa | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_longa | puxar-horizontal | 0 | 3840 | 0 | 0 | 0 |
| barra_longa | puxar-vertical | 0 | 9621 | 1899 | 0 | 0 |
| barra_longa | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| barra_longa | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| barra_w | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra_w | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra_w | crucifixo | 0 | 6865 | 4655 | 0 | 0 |
| barra_w | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| barra_w | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_w | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| barra_w | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_w | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| barra_w | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| barra_w | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_w | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_w | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_w | triceps-acima-cabeca | 0 | 9683 | 1837 | 0 | 0 |
| barra_w | triceps-complemento | 0 | 8843 | 1717 | 0 | 0 |
| rack_de_agachamento | abducao | 4608 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | aducao | 0 | 0 | 0 | 6912 | 0 |
| rack_de_agachamento | biceps | 0 | 9336 | 2184 | 0 | 0 |
| rack_de_agachamento | crucifixo | 0 | 6808 | 4712 | 0 | 0 |
| rack_de_agachamento | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| rack_de_agachamento | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rack_de_agachamento | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| rack_de_agachamento | extensora | 11520 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| rack_de_agachamento | ombro-posterior | 0 | 6083 | 5437 | 0 | 0 |
| rack_de_agachamento | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rack_de_agachamento | triceps-acima-cabeca | 0 | 9683 | 1837 | 0 | 0 |
| rack_de_agachamento | triceps-complemento | 0 | 8843 | 1717 | 0 | 0 |
| smith | abducao | 4608 | 0 | 0 | 0 | 0 |
| smith | aducao | 0 | 0 | 0 | 6912 | 0 |
| smith | biceps | 0 | 9336 | 2184 | 0 | 0 |
| smith | crucifixo | 0 | 6808 | 4712 | 0 | 0 |
| smith | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| smith | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| smith | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| smith | extensora | 11520 | 0 | 0 | 0 | 0 |
| smith | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| smith | ombro-posterior | 0 | 6083 | 5437 | 0 | 0 |
| smith | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| smith | triceps-acima-cabeca | 0 | 9683 | 1837 | 0 | 0 |
| smith | triceps-complemento | 0 | 8843 | 1717 | 0 | 0 |
| leg_press | abducao | 4608 | 0 | 0 | 0 | 0 |
| leg_press | aducao | 0 | 0 | 0 | 6912 | 0 |
| leg_press | biceps | 0 | 11520 | 0 | 0 | 0 |
| leg_press | crucifixo | 0 | 6437 | 5083 | 0 | 0 |
| leg_press | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| leg_press | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| leg_press | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| leg_press | extensora | 11520 | 0 | 0 | 0 | 0 |
| leg_press | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| leg_press | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| leg_press | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| leg_press | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| leg_press | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| leg_press | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| leg_press | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| cadeira_extensora | abducao | 4608 | 0 | 0 | 0 | 0 |
| cadeira_extensora | aducao | 0 | 0 | 0 | 6912 | 0 |
| cadeira_extensora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | crucifixo | 0 | 6421 | 5099 | 0 | 0 |
| cadeira_extensora | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| cadeira_extensora | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_extensora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_extensora | triceps-acima-cabeca | 0 | 9646 | 1874 | 0 | 0 |
| cadeira_extensora | triceps-complemento | 0 | 8806 | 1754 | 0 | 0 |
| mesa_flexora | abducao | 4608 | 0 | 0 | 0 | 0 |
| mesa_flexora | aducao | 0 | 0 | 0 | 6912 | 0 |
| mesa_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | crucifixo | 0 | 6501 | 5019 | 0 | 0 |
| mesa_flexora | dobrar-quadril | 0 | 5380 | 6140 | 0 | 0 |
| mesa_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| mesa_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| mesa_flexora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| mesa_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| mesa_flexora | triceps-acima-cabeca | 0 | 9670 | 1850 | 0 | 0 |
| mesa_flexora | triceps-complemento | 0 | 8830 | 1730 | 0 | 0 |
| cadeira_flexora | abducao | 4608 | 0 | 0 | 0 | 0 |
| cadeira_flexora | aducao | 0 | 0 | 0 | 6912 | 0 |
| cadeira_flexora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | crucifixo | 0 | 6501 | 5019 | 0 | 0 |
| cadeira_flexora | dobrar-quadril | 0 | 5380 | 6140 | 0 | 0 |
| cadeira_flexora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| cadeira_flexora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_flexora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_flexora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_flexora | triceps-acima-cabeca | 0 | 9670 | 1850 | 0 | 0 |
| cadeira_flexora | triceps-complemento | 0 | 8830 | 1730 | 0 | 0 |
| paralelas | abducao | 4608 | 0 | 0 | 0 | 0 |
| paralelas | aducao | 0 | 0 | 0 | 6912 | 0 |
| paralelas | biceps | 0 | 11520 | 0 | 0 | 0 |
| paralelas | crucifixo | 0 | 5151 | 6369 | 0 | 0 |
| paralelas | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| paralelas | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| paralelas | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| paralelas | extensora | 11520 | 0 | 0 | 0 | 0 |
| paralelas | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| paralelas | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| paralelas | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| paralelas | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| paralelas | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| paralelas | triceps-acima-cabeca | 0 | 7535 | 3985 | 0 | 0 |
| paralelas | triceps-complemento | 0 | 2963 | 557 | 0 | 0 |
| elasticos | abducao | 4608 | 0 | 0 | 0 | 0 |
| elasticos | aducao | 0 | 0 | 0 | 6912 | 0 |
| elasticos | extensora | 11520 | 0 | 0 | 0 | 0 |
| elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| elasticos | triceps-complemento | 0 | 5178 | 5382 | 0 | 0 |
| step | abducao | 4608 | 0 | 0 | 0 | 0 |
| step | aducao | 0 | 0 | 0 | 6912 | 0 |
| step | biceps | 0 | 11520 | 0 | 0 | 0 |
| step | crucifixo | 0 | 6445 | 5075 | 0 | 0 |
| step | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| step | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| step | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| step | extensora | 11520 | 0 | 0 | 0 | 0 |
| step | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| step | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| step | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| step | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| step | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| step | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| bola_suica | abducao | 4608 | 0 | 0 | 0 | 0 |
| bola_suica | aducao | 0 | 0 | 0 | 6912 | 0 |
| bola_suica | biceps | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | crucifixo | 0 | 6469 | 5051 | 0 | 0 |
| bola_suica | dobrar-quadril | 0 | 6209 | 5311 | 0 | 0 |
| bola_suica | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| bola_suica | extensora | 11520 | 0 | 0 | 0 | 0 |
| bola_suica | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| bola_suica | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| bola_suica | triceps-acima-cabeca | 0 | 9654 | 1866 | 0 | 0 |
| bola_suica | triceps-complemento | 0 | 8814 | 1746 | 0 | 0 |
| barra_hexagonal | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra_hexagonal | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra_hexagonal | biceps | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | crucifixo | 0 | 6431 | 5089 | 0 | 0 |
| barra_hexagonal | dobrar-quadril | 0 | 11376 | 144 | 0 | 0 |
| barra_hexagonal | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| barra_hexagonal | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra_hexagonal | flexao-joelho | 0 | 11376 | 144 | 0 | 0 |
| barra_hexagonal | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra_hexagonal | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| barra_hexagonal | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| barra_hexagonal | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| kettlebell | abducao | 4608 | 0 | 0 | 0 | 0 |
| kettlebell | aducao | 0 | 0 | 0 | 6912 | 0 |
| kettlebell | biceps | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | crucifixo | 0 | 6431 | 5089 | 0 | 0 |
| kettlebell | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| kettlebell | extensora | 11520 | 0 | 0 | 0 | 0 |
| kettlebell | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| kettlebell | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| kettlebell | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| kettlebell | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| banco_romano | abducao | 4608 | 0 | 0 | 0 | 0 |
| banco_romano | aducao | 0 | 0 | 0 | 6912 | 0 |
| banco_romano | biceps | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | crucifixo | 0 | 6544 | 4976 | 0 | 0 |
| banco_romano | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| banco_romano | extensora | 11520 | 0 | 0 | 0 | 0 |
| banco_romano | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco_romano | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| banco_romano | triceps-acima-cabeca | 0 | 9669 | 1851 | 0 | 0 |
| banco_romano | triceps-complemento | 0 | 8829 | 1731 | 0 | 0 |
| estacao_puxada | abducao | 4608 | 0 | 0 | 0 | 0 |
| estacao_puxada | aducao | 0 | 0 | 0 | 6912 | 0 |
| estacao_puxada | biceps | 0 | 9667 | 1853 | 0 | 0 |
| estacao_puxada | crucifixo | 0 | 6930 | 4590 | 0 | 0 |
| estacao_puxada | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| estacao_puxada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_puxada | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| estacao_puxada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_puxada | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| estacao_puxada | ombro-posterior | 0 | 6434 | 5086 | 0 | 0 |
| estacao_puxada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_puxada | puxar-horizontal | 0 | 5891 | 5629 | 0 | 0 |
| estacao_puxada | triceps-acima-cabeca | 0 | 9720 | 1800 | 0 | 0 |
| estacao_puxada | triceps-complemento | 0 | 8880 | 1680 | 0 | 0 |
| estacao_remada | abducao | 4608 | 0 | 0 | 0 | 0 |
| estacao_remada | aducao | 0 | 0 | 0 | 6912 | 0 |
| estacao_remada | biceps | 0 | 10476 | 1044 | 0 | 0 |
| estacao_remada | crucifixo | 0 | 6629 | 4891 | 0 | 0 |
| estacao_remada | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| estacao_remada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| estacao_remada | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| estacao_remada | extensora | 11520 | 0 | 0 | 0 | 0 |
| estacao_remada | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| estacao_remada | ombro-posterior | 0 | 8624 | 2896 | 0 | 0 |
| estacao_remada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| estacao_remada | puxar-vertical | 0 | 7927 | 3593 | 0 | 0 |
| estacao_remada | triceps-acima-cabeca | 0 | 9672 | 1848 | 0 | 0 |
| estacao_remada | triceps-complemento | 0 | 8832 | 1728 | 0 | 0 |
| multifuncional | abducao | 4608 | 0 | 0 | 0 | 0 |
| multifuncional | aducao | 0 | 0 | 0 | 6912 | 0 |
| multifuncional | biceps | 0 | 8355 | 3165 | 0 | 0 |
| multifuncional | crucifixo | 0 | 6873 | 4647 | 0 | 0 |
| multifuncional | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| multifuncional | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| multifuncional | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| multifuncional | extensora | 11520 | 0 | 0 | 0 | 0 |
| multifuncional | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| multifuncional | ombro-posterior | 0 | 4936 | 6584 | 0 | 0 |
| multifuncional | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| multifuncional | triceps-acima-cabeca | 0 | 9698 | 1822 | 0 | 0 |
| multifuncional | triceps-complemento | 0 | 8858 | 1702 | 0 | 0 |
| supino_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| supino_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| supino_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | crucifixo | 0 | 4961 | 6559 | 0 | 0 |
| supino_maquina | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| supino_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| supino_maquina | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| supino_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| supino_maquina | triceps-acima-cabeca | 0 | 9026 | 2494 | 0 | 0 |
| supino_maquina | triceps-complemento | 0 | 8210 | 2350 | 0 | 0 |
| voador | abducao | 4608 | 0 | 0 | 0 | 0 |
| voador | aducao | 0 | 0 | 0 | 6912 | 0 |
| voador | biceps | 0 | 11520 | 0 | 0 | 0 |
| voador | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| voador | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| voador | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| voador | extensora | 11520 | 0 | 0 | 0 | 0 |
| voador | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| voador | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| voador | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| voador | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| voador | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| voador | triceps-acima-cabeca | 0 | 11520 | 0 | 0 | 0 |
| voador | triceps-complemento | 0 | 10560 | 0 | 0 | 0 |
| desenvolvimento_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| desenvolvimento_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | crucifixo | 0 | 6569 | 4951 | 0 | 0 |
| desenvolvimento_maquina | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| desenvolvimento_maquina | triceps-acima-cabeca | 0 | 9221 | 2299 | 0 | 0 |
| desenvolvimento_maquina | triceps-complemento | 0 | 8471 | 2089 | 0 | 0 |
| remada_articulada | abducao | 4608 | 0 | 0 | 0 | 0 |
| remada_articulada | aducao | 0 | 0 | 0 | 6912 | 0 |
| remada_articulada | biceps | 0 | 9779 | 1741 | 0 | 0 |
| remada_articulada | crucifixo | 0 | 6911 | 4609 | 0 | 0 |
| remada_articulada | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| remada_articulada | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| remada_articulada | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| remada_articulada | extensora | 11520 | 0 | 0 | 0 | 0 |
| remada_articulada | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| remada_articulada | ombro-posterior | 0 | 6832 | 4688 | 0 | 0 |
| remada_articulada | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| remada_articulada | puxar-vertical | 0 | 6002 | 5518 | 0 | 0 |
| remada_articulada | triceps-acima-cabeca | 0 | 9720 | 1800 | 0 | 0 |
| remada_articulada | triceps-complemento | 0 | 8880 | 1680 | 0 | 0 |
| graviton | abducao | 4608 | 0 | 0 | 0 | 0 |
| graviton | aducao | 0 | 0 | 0 | 6912 | 0 |
| graviton | biceps | 0 | 9709 | 1811 | 0 | 0 |
| graviton | crucifixo | 0 | 5442 | 6078 | 0 | 0 |
| graviton | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| graviton | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| graviton | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| graviton | extensora | 11520 | 0 | 0 | 0 | 0 |
| graviton | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| graviton | ombro-posterior | 0 | 6494 | 5026 | 0 | 0 |
| graviton | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| graviton | puxar-horizontal | 0 | 6079 | 5441 | 0 | 0 |
| graviton | triceps-acima-cabeca | 0 | 6442 | 5078 | 0 | 0 |
| graviton | triceps-complemento | 0 | 5754 | 4806 | 0 | 0 |
| rosca_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| rosca_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| rosca_maquina | crucifixo | 0 | 6858 | 4662 | 0 | 0 |
| rosca_maquina | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| rosca_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| rosca_maquina | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| rosca_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| rosca_maquina | triceps-acima-cabeca | 0 | 9683 | 1837 | 0 | 0 |
| rosca_maquina | triceps-complemento | 0 | 8843 | 1717 | 0 | 0 |
| triceps_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| triceps_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| triceps_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | crucifixo | 0 | 6515 | 5005 | 0 | 0 |
| triceps_maquina | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| triceps_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| triceps_maquina | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| triceps_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| triceps_maquina | triceps-acima-cabeca | 0 | 3851 | 7669 | 0 | 0 |
| abdominal_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| abdominal_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| abdominal_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | crucifixo | 0 | 6432 | 5088 | 0 | 0 |
| abdominal_maquina | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| abdominal_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| abdominal_maquina | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| abdominal_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| abdominal_maquina | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| abdominal_maquina | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| hack | abducao | 4608 | 0 | 0 | 0 | 0 |
| hack | aducao | 0 | 0 | 0 | 6912 | 0 |
| hack | biceps | 0 | 11520 | 0 | 0 | 0 |
| hack | crucifixo | 0 | 6431 | 5089 | 0 | 0 |
| hack | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| hack | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| hack | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| hack | extensora | 11520 | 0 | 0 | 0 | 0 |
| hack | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| hack | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| hack | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| hack | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| hack | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| hack | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| hack | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| cadeira_abdutora_adutora | biceps | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | crucifixo | 0 | 6455 | 5065 | 0 | 0 |
| cadeira_abdutora_adutora | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| cadeira_abdutora_adutora | extensora | 11520 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| cadeira_abdutora_adutora | triceps-acima-cabeca | 0 | 9646 | 1874 | 0 | 0 |
| cadeira_abdutora_adutora | triceps-complemento | 0 | 8806 | 1754 | 0 | 0 |
| gluteo_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| gluteo_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| gluteo_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | crucifixo | 0 | 6446 | 5074 | 0 | 0 |
| gluteo_maquina | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| gluteo_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| gluteo_maquina | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| gluteo_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| gluteo_maquina | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| gluteo_maquina | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| panturrilha_em_pe_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| panturrilha_em_pe_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | crucifixo | 0 | 6441 | 5079 | 0 | 0 |
| panturrilha_em_pe_maquina | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| panturrilha_em_pe_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_em_pe_maquina | triceps-acima-cabeca | 0 | 9643 | 1877 | 0 | 0 |
| panturrilha_em_pe_maquina | triceps-complemento | 0 | 8803 | 1757 | 0 | 0 |
| panturrilha_sentada_maquina | abducao | 4608 | 0 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | aducao | 0 | 0 | 0 | 6912 | 0 |
| panturrilha_sentada_maquina | biceps | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | crucifixo | 0 | 6284 | 5236 | 0 | 0 |
| panturrilha_sentada_maquina | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| panturrilha_sentada_maquina | extensora | 11520 | 0 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | ombro-posterior | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-horizontal | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | puxar-vertical | 0 | 11520 | 0 | 0 | 0 |
| panturrilha_sentada_maquina | triceps-acima-cabeca | 0 | 9609 | 1911 | 0 | 0 |
| panturrilha_sentada_maquina | triceps-complemento | 0 | 8769 | 1791 | 0 | 0 |
| suspensao | abducao | 4608 | 0 | 0 | 0 | 0 |
| suspensao | aducao | 0 | 0 | 0 | 6912 | 0 |
| suspensao | biceps | 0 | 9336 | 2184 | 0 | 0 |
| suspensao | crucifixo | 0 | 6808 | 4712 | 0 | 0 |
| suspensao | dobrar-quadril | 0 | 11520 | 0 | 0 | 0 |
| suspensao | elevacao-lateral | 0 | 11520 | 0 | 0 | 0 |
| suspensao | empurrar-vertical | 0 | 0 | 0 | 8064 | 0 |
| suspensao | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao | flexao-joelho | 0 | 11520 | 0 | 0 | 0 |
| suspensao | ombro-posterior | 0 | 6083 | 5437 | 0 | 0 |
| suspensao | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| suspensao | triceps-acima-cabeca | 0 | 9683 | 1837 | 0 | 0 |
| suspensao | triceps-complemento | 0 | 8843 | 1717 | 0 | 0 |
| barra-porta+elasticos | abducao | 4608 | 0 | 0 | 0 | 0 |
| barra-porta+elasticos | aducao | 0 | 0 | 0 | 6912 | 0 |
| barra-porta+elasticos | extensora | 11520 | 0 | 0 | 0 | 0 |
| barra-porta+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| barra-porta+elasticos | triceps-complemento | 0 | 5187 | 5373 | 0 | 0 |
| halteres+bola | abducao | 4608 | 0 | 0 | 0 | 0 |
| halteres+bola | aducao | 0 | 0 | 0 | 6912 | 0 |
| halteres+bola | crucifixo | 0 | 5828 | 5692 | 0 | 0 |
| halteres+bola | extensora | 11520 | 0 | 0 | 0 | 0 |
| halteres+bola | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| halteres+bola | triceps-complemento | 0 | 4503 | 6057 | 0 | 0 |
| suspensao+elasticos | abducao | 4608 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | aducao | 0 | 0 | 0 | 6912 | 0 |
| suspensao+elasticos | extensora | 11520 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| suspensao+elasticos | triceps-complemento | 0 | 5169 | 5391 | 0 | 0 |
| banco+halteres-leves | abducao | 4608 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | aducao | 0 | 0 | 0 | 6912 | 0 |
| banco+halteres-leves | extensora | 11520 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| banco+halteres-leves | triceps-complemento | 0 | 5743 | 4817 | 0 | 0 |
| step+elasticos | abducao | 4608 | 0 | 0 | 0 | 0 |
| step+elasticos | aducao | 0 | 0 | 0 | 6912 | 0 |
| step+elasticos | extensora | 11520 | 0 | 0 | 0 | 0 |
| step+elasticos | panturrilha-sentada | 6912 | 0 | 0 | 0 | 0 |
| step+elasticos | triceps-complemento | 0 | 5180 | 5380 | 0 | 0 |

- Avisos que sugerem comprar algo, em todos os cenários: **0**.
- "Nenhum exercício possível" dito para um músculo que tinha exercício possível: **0**.
- Programas sem nenhuma série de puxar com o aviso `equipamento.sem-puxada-vertical`: **0** (ele só dispara quando a puxada cai para uma remada).

## Equilíbrio (sem dor)

| cenário | empurra e não puxa | joelho sem posteriores da coxa |
| --- | ---: | ---: |
| vazio (= 10 outros) | 100% | 100% |
| estacao_polia_dupla | 0% | 100% |
| barra_fixa | 0% | 100% |
| halteres_fixos | 0% | 1% |
| anilhas_e_manoplas | 0% | 1% |
| barra_longa | 33,3% | 33,3% |
| barra_w | 100% | 100% |
| rack_de_agachamento | 0% | 100% |
| smith | 0% | 100% |
| leg_press | 100% | 100% |
| cadeira_extensora | 100% | 100% |
| mesa_flexora | 100% | 10,1% |
| cadeira_flexora | 100% | 10,1% |
| paralelas | 100% | 100% |
| elasticos | 0% | 1,7% |
| step | 100% | 100% |
| bola_suica | 100% | 6,2% |
| barra_hexagonal | 100% | 0% |
| kettlebell | 100% | 100% |
| banco_romano | 100% | 0% |
| estacao_puxada | 0% | 100% |
| estacao_remada | 0% | 100% |
| multifuncional | 0% | 100% |
| supino_maquina | 100% | 100% |
| voador | 100% | 100% |
| desenvolvimento_maquina | 100% | 100% |
| remada_articulada | 0% | 100% |
| graviton | 0% | 100% |
| rosca_maquina | 100% | 100% |
| triceps_maquina | 100% | 100% |
| abdominal_maquina | 100% | 100% |
| hack | 100% | 100% |
| cadeira_abdutora_adutora | 100% | 100% |
| gluteo_maquina | 100% | 100% |
| panturrilha_em_pe_maquina | 100% | 100% |
| panturrilha_sentada_maquina | 100% | 100% |
| suspensao | 0% | 100% |
| barra-porta+elasticos | 0% | 1,7% |
| halteres+bola | 0% | 1,3% |
| suspensao+elasticos | 0% | 1,7% |
| banco+halteres-leves | 0% | 1% |
| step+elasticos | 0% | 1,7% |

## Tempo (sem dor)

Exercícios por dia no programa × os que cabem nos minutos (`tempo.exercicios-por-sessao`), séries por exercício e o dia mais longo.

| cenário | minutos | cabem | exercícios por dia | séries por exercício | no teto de 4 séries | dia mais longo (mediana, min) | sobra > 30% |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| vazio (= 10 outros) | 20 | 3 | 2,2 | 2,7 | 29,9% | 28 | 0% |
| vazio (= 10 outros) | 30 | 4 | 2,5 | 2,7 | 26% | 30 | 0% |
| vazio (= 10 outros) | 45 | 6 | 2,7 | 2,9 | 34,2% | 42 | 11,1% |
| vazio (= 10 outros) | 60 | 8 | 2,7 | 3 | 38,2% | 42 | 45% |
| vazio (= 10 outros) | 90 | 12 | 2,7 | 3 | 38,2% | 42 | 96,7% |
| estacao_polia_dupla | 20 | 3 | 2,8 | 2,7 | 25,7% | 32 | 0% |
| estacao_polia_dupla | 30 | 4 | 3,5 | 2,7 | 23,4% | 37 | 0% |
| estacao_polia_dupla | 45 | 6 | 4,2 | 2,8 | 25,3% | 45 | 0% |
| estacao_polia_dupla | 60 | 8 | 4,4 | 2,8 | 29,8% | 57 | 13,3% |
| estacao_polia_dupla | 90 | 12 | 4,6 | 2,9 | 33,7% | 57 | 58,9% |
| barra_fixa | 20 | 3 | 2,4 | 2,8 | 34,2% | 28 | 0% |
| barra_fixa | 30 | 4 | 2,8 | 2,8 | 31,1% | 33 | 0% |
| barra_fixa | 45 | 6 | 3 | 3 | 37,1% | 43 | 3,3% |
| barra_fixa | 60 | 8 | 3,1 | 3,1 | 42,8% | 48 | 30,6% |
| barra_fixa | 90 | 12 | 3,1 | 3,1 | 43,4% | 48 | 85,6% |
| halteres_fixos | 20 | 3 | 2,6 | 2,7 | 29,4% | 27 | 0% |
| halteres_fixos | 30 | 4 | 3,6 | 2,7 | 25,1% | 34 | 0% |
| halteres_fixos | 45 | 6 | 5,1 | 2,7 | 22,8% | 45 | 0% |
| halteres_fixos | 60 | 8 | 6 | 2,7 | 25,8% | 58 | 6,1% |
| halteres_fixos | 90 | 12 | 6,2 | 2,8 | 28,2% | 63 | 48,3% |
| anilhas_e_manoplas | 20 | 3 | 2,7 | 2,7 | 28% | 27 | 0% |
| anilhas_e_manoplas | 30 | 4 | 3,6 | 2,7 | 23,7% | 33 | 0% |
| anilhas_e_manoplas | 45 | 6 | 5,1 | 2,7 | 20,9% | 45 | 0% |
| anilhas_e_manoplas | 60 | 8 | 6 | 2,7 | 23,8% | 59 | 6,1% |
| anilhas_e_manoplas | 90 | 12 | 6,2 | 2,8 | 28,2% | 63 | 48,3% |
| barra_longa | 20 | 3 | 2,3 | 2,8 | 32,5% | 28 | 0% |
| barra_longa | 30 | 4 | 2,8 | 2,8 | 25,6% | 32 | 0% |
| barra_longa | 45 | 6 | 3,3 | 2,9 | 28,9% | 44 | 5% |
| barra_longa | 60 | 8 | 3,3 | 3 | 38,8% | 49 | 27,2% |
| barra_longa | 90 | 12 | 3,3 | 3 | 39,5% | 49 | 88,3% |
| barra_w | 20 | 3 | 2,4 | 2,8 | 31,4% | 28 | 0% |
| barra_w | 30 | 4 | 2,8 | 2,8 | 29,7% | 30 | 0% |
| barra_w | 45 | 6 | 3 | 3 | 35,7% | 43 | 5% |
| barra_w | 60 | 8 | 3,1 | 3,1 | 40,2% | 44 | 38,3% |
| barra_w | 90 | 12 | 3,1 | 3,1 | 40,6% | 44 | 92,8% |
| rack_de_agachamento | 20 | 3 | 2,4 | 2,8 | 32,8% | 28 | 0% |
| rack_de_agachamento | 30 | 4 | 2,9 | 2,8 | 29,4% | 33 | 0% |
| rack_de_agachamento | 45 | 6 | 3,1 | 3 | 34,9% | 42 | 3,3% |
| rack_de_agachamento | 60 | 8 | 3,2 | 3 | 40,1% | 47 | 33,3% |
| rack_de_agachamento | 90 | 12 | 3,2 | 3 | 40,8% | 47 | 85,6% |
| smith | 20 | 3 | 2,4 | 2,8 | 32,7% | 27 | 0% |
| smith | 30 | 4 | 2,9 | 2,8 | 29,5% | 32 | 0% |
| smith | 45 | 6 | 3,1 | 3 | 35,3% | 42 | 3,3% |
| smith | 60 | 8 | 3,2 | 3 | 40,1% | 46 | 37,2% |
| smith | 90 | 12 | 3,2 | 3 | 40,8% | 46 | 85,6% |
| leg_press | 20 | 3 | 2,3 | 2,7 | 27,1% | 26 | 0% |
| leg_press | 30 | 4 | 2,6 | 2,7 | 23,7% | 29 | 0% |
| leg_press | 45 | 6 | 2,7 | 2,9 | 33,9% | 40 | 12,2% |
| leg_press | 60 | 8 | 2,7 | 3 | 37,8% | 40 | 54,4% |
| leg_press | 90 | 12 | 2,7 | 3 | 37,8% | 40 | 96,7% |
| cadeira_extensora | 20 | 3 | 2,3 | 2,7 | 26,9% | 24 | 0% |
| cadeira_extensora | 30 | 4 | 2,8 | 2,6 | 20,8% | 30 | 0% |
| cadeira_extensora | 45 | 6 | 3,1 | 2,8 | 27% | 42 | 4,4% |
| cadeira_extensora | 60 | 8 | 3,1 | 2,8 | 31,4% | 43 | 45,6% |
| cadeira_extensora | 90 | 12 | 3,1 | 2,8 | 31,4% | 43 | 95,6% |
| mesa_flexora | 20 | 3 | 2,1 | 2,8 | 31,3% | 27 | 0% |
| mesa_flexora | 30 | 4 | 2,6 | 2,8 | 27,3% | 30 | 0% |
| mesa_flexora | 45 | 6 | 3,1 | 2,9 | 31,9% | 44 | 0% |
| mesa_flexora | 60 | 8 | 3,2 | 3,1 | 41,6% | 51 | 20,6% |
| mesa_flexora | 90 | 12 | 3,2 | 3,1 | 41,9% | 51 | 82,2% |
| cadeira_flexora | 20 | 3 | 2,1 | 2,8 | 31,3% | 27 | 0% |
| cadeira_flexora | 30 | 4 | 2,6 | 2,8 | 27,3% | 30 | 0% |
| cadeira_flexora | 45 | 6 | 3,1 | 2,9 | 31,9% | 44 | 0% |
| cadeira_flexora | 60 | 8 | 3,2 | 3,1 | 41,6% | 51 | 20,6% |
| cadeira_flexora | 90 | 12 | 3,2 | 3,1 | 41,9% | 51 | 82,2% |
| paralelas | 20 | 3 | 2,3 | 2,7 | 29,5% | 28 | 0% |
| paralelas | 30 | 4 | 2,6 | 2,7 | 26,9% | 30 | 0% |
| paralelas | 45 | 6 | 2,8 | 2,9 | 34,6% | 42 | 11,7% |
| paralelas | 60 | 8 | 2,8 | 3 | 39% | 43 | 45% |
| paralelas | 90 | 12 | 2,8 | 3 | 39,1% | 43 | 94,4% |
| elasticos | 20 | 3 | 2,8 | 2,5 | 19,6% | 28 | 0% |
| elasticos | 30 | 4 | 3,7 | 2,6 | 19% | 35 | 0% |
| elasticos | 45 | 6 | 5,4 | 2,6 | 16,6% | 45 | 0% |
| elasticos | 60 | 8 | 6,4 | 2,6 | 19,2% | 59 | 2,2% |
| elasticos | 90 | 12 | 6,8 | 2,7 | 22,9% | 68 | 38,9% |
| step | 20 | 3 | 2,2 | 2,7 | 29,6% | 31 | 0% |
| step | 30 | 4 | 2,5 | 2,7 | 25,6% | 30 | 0% |
| step | 45 | 6 | 2,7 | 2,9 | 33,4% | 42 | 11,1% |
| step | 60 | 8 | 2,7 | 3 | 38,2% | 44 | 40,6% |
| step | 90 | 12 | 2,7 | 3 | 38,2% | 44 | 96,7% |
| bola_suica | 20 | 3 | 2,2 | 2,9 | 37,2% | 28 | 0% |
| bola_suica | 30 | 4 | 2,6 | 2,8 | 31,1% | 32 | 0% |
| bola_suica | 45 | 6 | 3,1 | 2,9 | 34,4% | 44 | 1,7% |
| bola_suica | 60 | 8 | 3,2 | 3 | 38,8% | 48 | 26,7% |
| bola_suica | 90 | 12 | 3,2 | 3 | 38,9% | 48 | 88,9% |
| barra_hexagonal | 20 | 3 | 2,2 | 2,7 | 27,4% | 27 | 0% |
| barra_hexagonal | 30 | 4 | 2,6 | 2,7 | 23,9% | 29 | 0% |
| barra_hexagonal | 45 | 6 | 2,7 | 2,9 | 33,8% | 38 | 20,6% |
| barra_hexagonal | 60 | 8 | 2,7 | 2,9 | 36,1% | 38 | 65,6% |
| barra_hexagonal | 90 | 12 | 2,7 | 2,9 | 36,1% | 38 | 96,7% |
| kettlebell | 20 | 3 | 2,2 | 2,7 | 30% | 27 | 0% |
| kettlebell | 30 | 4 | 2,6 | 2,7 | 25,4% | 30 | 0% |
| kettlebell | 45 | 6 | 2,7 | 2,9 | 34,3% | 41 | 11,7% |
| kettlebell | 60 | 8 | 2,7 | 3 | 37,8% | 41 | 51,1% |
| kettlebell | 90 | 12 | 2,7 | 3 | 37,8% | 41 | 96,7% |
| banco_romano | 20 | 3 | 2,2 | 2,7 | 26,9% | 30 | 0% |
| banco_romano | 30 | 4 | 2,6 | 2,7 | 22,5% | 30 | 0% |
| banco_romano | 45 | 6 | 3,2 | 2,8 | 25,7% | 44 | 3,3% |
| banco_romano | 60 | 8 | 3,2 | 2,9 | 35,4% | 49 | 25% |
| banco_romano | 90 | 12 | 3,2 | 2,9 | 35,9% | 49 | 90,6% |
| estacao_puxada | 20 | 3 | 2,4 | 2,9 | 36,3% | 30 | 0% |
| estacao_puxada | 30 | 4 | 2,8 | 2,9 | 32,9% | 34 | 0% |
| estacao_puxada | 45 | 6 | 3 | 3 | 37,5% | 43 | 3,3% |
| estacao_puxada | 60 | 8 | 3,1 | 3,1 | 42,5% | 48 | 30,6% |
| estacao_puxada | 90 | 12 | 3,1 | 3,1 | 43,4% | 48 | 85,6% |
| estacao_remada | 20 | 3 | 2,4 | 2,9 | 36,3% | 29 | 0% |
| estacao_remada | 30 | 4 | 2,8 | 2,8 | 31,6% | 33 | 0% |
| estacao_remada | 45 | 6 | 3 | 3 | 39,7% | 42 | 3,3% |
| estacao_remada | 60 | 8 | 3 | 3,1 | 44% | 44 | 38,3% |
| estacao_remada | 90 | 12 | 3 | 3,1 | 44% | 44 | 95% |
| multifuncional | 20 | 3 | 2,7 | 2,6 | 23,3% | 28 | 0% |
| multifuncional | 30 | 4 | 3,2 | 2,7 | 23,6% | 32 | 0% |
| multifuncional | 45 | 6 | 3,4 | 2,8 | 29,2% | 43 | 3,3% |
| multifuncional | 60 | 8 | 3,5 | 2,9 | 34,4% | 47 | 33,3% |
| multifuncional | 90 | 12 | 3,5 | 2,9 | 34,9% | 47 | 88,3% |
| supino_maquina | 20 | 3 | 2,3 | 2,7 | 26,6% | 28 | 0% |
| supino_maquina | 30 | 4 | 2,6 | 2,7 | 23,5% | 30 | 0% |
| supino_maquina | 45 | 6 | 2,8 | 2,9 | 31,6% | 42 | 12,8% |
| supino_maquina | 60 | 8 | 2,8 | 2,9 | 35,4% | 42 | 45,6% |
| supino_maquina | 90 | 12 | 2,8 | 2,9 | 35,4% | 42 | 96,7% |
| voador | 20 | 3 | 2,4 | 2,6 | 22,8% | 26 | 0% |
| voador | 30 | 4 | 2,8 | 2,6 | 20,2% | 30 | 0% |
| voador | 45 | 6 | 3 | 2,8 | 26,5% | 42 | 10% |
| voador | 60 | 8 | 3 | 2,8 | 29,9% | 42 | 47,2% |
| voador | 90 | 12 | 3 | 2,8 | 29,9% | 42 | 97,8% |
| desenvolvimento_maquina | 20 | 3 | 2,4 | 2,7 | 28% | 28 | 0% |
| desenvolvimento_maquina | 30 | 4 | 2,8 | 2,7 | 23,7% | 30 | 0% |
| desenvolvimento_maquina | 45 | 6 | 2,9 | 2,9 | 31,3% | 42 | 11,1% |
| desenvolvimento_maquina | 60 | 8 | 3 | 2,9 | 35,5% | 42 | 43,3% |
| desenvolvimento_maquina | 90 | 12 | 3 | 2,9 | 35,5% | 42 | 95% |
| remada_articulada | 20 | 3 | 2,4 | 2,9 | 36,3% | 29 | 0% |
| remada_articulada | 30 | 4 | 2,8 | 2,8 | 31,6% | 33 | 0% |
| remada_articulada | 45 | 6 | 3 | 3 | 39,7% | 42 | 3,3% |
| remada_articulada | 60 | 8 | 3 | 3,1 | 44% | 44 | 38,3% |
| remada_articulada | 90 | 12 | 3 | 3,1 | 44% | 44 | 95% |
| graviton | 20 | 3 | 2,5 | 2,9 | 36,9% | 29 | 0% |
| graviton | 30 | 4 | 2,9 | 2,9 | 34,1% | 34 | 0% |
| graviton | 45 | 6 | 3,1 | 3 | 38,5% | 43 | 3,3% |
| graviton | 60 | 8 | 3,2 | 3,1 | 44% | 48 | 30,6% |
| graviton | 90 | 12 | 3,2 | 3,1 | 44,8% | 48 | 84,4% |
| rosca_maquina | 20 | 3 | 2,4 | 2,8 | 28,2% | 28 | 0% |
| rosca_maquina | 30 | 4 | 2,8 | 2,8 | 28,5% | 30 | 0% |
| rosca_maquina | 45 | 6 | 3 | 3 | 35,2% | 43 | 5% |
| rosca_maquina | 60 | 8 | 3,1 | 3,1 | 40,1% | 44 | 38,3% |
| rosca_maquina | 90 | 12 | 3,1 | 3,1 | 40,6% | 44 | 92,8% |
| triceps_maquina | 20 | 3 | 2,4 | 2,7 | 29% | 28 | 0% |
| triceps_maquina | 30 | 4 | 2,7 | 2,8 | 27,2% | 30 | 0% |
| triceps_maquina | 45 | 6 | 2,8 | 2,9 | 34,2% | 42 | 6,7% |
| triceps_maquina | 60 | 8 | 2,9 | 3 | 38,3% | 44 | 36,7% |
| triceps_maquina | 90 | 12 | 2,9 | 3 | 38,7% | 44 | 91,1% |
| abdominal_maquina | 20 | 3 | 2,2 | 2,7 | 25,7% | 27 | 0% |
| abdominal_maquina | 30 | 4 | 2,5 | 2,7 | 25,1% | 30 | 0% |
| abdominal_maquina | 45 | 6 | 2,7 | 2,9 | 34,2% | 42 | 11,7% |
| abdominal_maquina | 60 | 8 | 2,7 | 3 | 38,2% | 42 | 46,7% |
| abdominal_maquina | 90 | 12 | 2,7 | 3 | 38,2% | 42 | 96,7% |
| hack | 20 | 3 | 2,2 | 2,7 | 30% | 27 | 0% |
| hack | 30 | 4 | 2,6 | 2,7 | 25,4% | 30 | 0% |
| hack | 45 | 6 | 2,7 | 2,9 | 34,3% | 41 | 11,7% |
| hack | 60 | 8 | 2,7 | 3 | 37,8% | 41 | 51,1% |
| hack | 90 | 12 | 2,7 | 3 | 37,8% | 41 | 96,7% |
| cadeira_abdutora_adutora | 20 | 3 | 2,2 | 2,7 | 27,2% | 26 | 0% |
| cadeira_abdutora_adutora | 30 | 4 | 2,5 | 2,7 | 23,9% | 29 | 0% |
| cadeira_abdutora_adutora | 45 | 6 | 2,9 | 2,8 | 29,1% | 42 | 10,6% |
| cadeira_abdutora_adutora | 60 | 8 | 3,1 | 2,8 | 30,6% | 45 | 36,1% |
| cadeira_abdutora_adutora | 90 | 12 | 3,1 | 2,8 | 30,7% | 45 | 96,1% |
| gluteo_maquina | 20 | 3 | 2,2 | 2,7 | 29,3% | 27 | 0% |
| gluteo_maquina | 30 | 4 | 2,5 | 2,8 | 27,7% | 30 | 0% |
| gluteo_maquina | 45 | 6 | 2,7 | 3 | 36,2% | 41 | 15,6% |
| gluteo_maquina | 60 | 8 | 2,7 | 3 | 38,3% | 41 | 51,1% |
| gluteo_maquina | 90 | 12 | 2,7 | 3 | 38,3% | 41 | 96,7% |
| panturrilha_em_pe_maquina | 20 | 3 | 2,3 | 2,7 | 26,8% | 27 | 0% |
| panturrilha_em_pe_maquina | 30 | 4 | 2,5 | 2,7 | 23,7% | 29 | 0% |
| panturrilha_em_pe_maquina | 45 | 6 | 2,7 | 2,9 | 32,9% | 41 | 11,7% |
| panturrilha_em_pe_maquina | 60 | 8 | 2,7 | 3 | 38,2% | 42 | 49,4% |
| panturrilha_em_pe_maquina | 90 | 12 | 2,7 | 3 | 38,2% | 42 | 96,7% |
| panturrilha_sentada_maquina | 20 | 3 | 2,2 | 2,7 | 29,6% | 28 | 0% |
| panturrilha_sentada_maquina | 30 | 4 | 2,6 | 2,7 | 24,6% | 30 | 0% |
| panturrilha_sentada_maquina | 45 | 6 | 2,8 | 2,9 | 27,8% | 42 | 11,1% |
| panturrilha_sentada_maquina | 60 | 8 | 2,9 | 2,9 | 33,8% | 44 | 39,4% |
| panturrilha_sentada_maquina | 90 | 12 | 2,9 | 2,9 | 34,5% | 44 | 92,8% |
| suspensao | 20 | 3 | 2,4 | 2,8 | 32,8% | 28 | 0% |
| suspensao | 30 | 4 | 2,9 | 2,8 | 29,4% | 33 | 0% |
| suspensao | 45 | 6 | 3,1 | 3 | 34,9% | 42 | 3,3% |
| suspensao | 60 | 8 | 3,2 | 3 | 40,1% | 47 | 33,3% |
| suspensao | 90 | 12 | 3,2 | 3 | 40,8% | 47 | 85,6% |
| barra-porta+elasticos | 20 | 3 | 2,8 | 2,6 | 20,2% | 29 | 0% |
| barra-porta+elasticos | 30 | 4 | 3,7 | 2,6 | 19,4% | 35 | 0% |
| barra-porta+elasticos | 45 | 6 | 5,4 | 2,6 | 16,8% | 45 | 0% |
| barra-porta+elasticos | 60 | 8 | 6,4 | 2,6 | 19,3% | 59 | 2,2% |
| barra-porta+elasticos | 90 | 12 | 6,8 | 2,6 | 22,6% | 67 | 40% |
| halteres+bola | 20 | 3 | 2,6 | 2,8 | 28,8% | 26 | 0% |
| halteres+bola | 30 | 4 | 3,5 | 2,8 | 25,7% | 31 | 0% |
| halteres+bola | 45 | 6 | 5,1 | 2,8 | 24% | 45 | 0% |
| halteres+bola | 60 | 8 | 6 | 2,7 | 25,5% | 58 | 6,1% |
| halteres+bola | 90 | 12 | 6,2 | 2,8 | 28,2% | 61 | 53,9% |
| suspensao+elasticos | 20 | 3 | 2,8 | 2,6 | 20% | 28 | 0% |
| suspensao+elasticos | 30 | 4 | 3,7 | 2,6 | 19,4% | 35 | 0% |
| suspensao+elasticos | 45 | 6 | 5,4 | 2,6 | 16,4% | 45 | 0% |
| suspensao+elasticos | 60 | 8 | 6,4 | 2,6 | 18,7% | 59 | 2,2% |
| suspensao+elasticos | 90 | 12 | 6,8 | 2,6 | 22,2% | 68 | 38,9% |
| banco+halteres-leves | 20 | 3 | 2,8 | 2,6 | 18,6% | 27 | 0% |
| banco+halteres-leves | 30 | 4 | 3,8 | 2,6 | 17,2% | 33 | 0% |
| banco+halteres-leves | 45 | 6 | 5,4 | 2,6 | 15,3% | 45 | 0% |
| banco+halteres-leves | 60 | 8 | 6,4 | 2,6 | 17% | 58 | 2,2% |
| banco+halteres-leves | 90 | 12 | 6,7 | 2,7 | 23,6% | 69 | 42,8% |
| step+elasticos | 20 | 3 | 2,8 | 2,5 | 19,6% | 28 | 0% |
| step+elasticos | 30 | 4 | 3,7 | 2,6 | 19,1% | 35 | 0% |
| step+elasticos | 45 | 6 | 5,4 | 2,6 | 16,2% | 45 | 0% |
| step+elasticos | 60 | 8 | 6,4 | 2,6 | 18,4% | 59 | 2,2% |
| step+elasticos | 90 | 12 | 6,8 | 2,7 | 22,9% | 68 | 37,8% |

## Guia: prescrições com animação, só cartão e sem nada

| cenário | com animação | só cartão de texto | sem guia nenhum |
| --- | ---: | ---: | ---: |
| vazio (= 10 outros) | 59,4% | 19% | 21,6% |
| estacao_polia_dupla | 60,2% | 12% | 27,8% |
| barra_fixa | 61,3% | 14,6% | 24,1% |
| halteres_fixos | 72,5% | 23% | 4,5% |
| anilhas_e_manoplas | 72,5% | 23% | 4,5% |
| barra_longa | 47,7% | 15,9% | 36,4% |
| barra_w | 49,3% | 16,7% | 34% |
| rack_de_agachamento | 47,7% | 17,3% | 35% |
| smith | 47,4% | 27,3% | 25,3% |
| leg_press | 34,8% | 18,8% | 46,4% |
| cadeira_extensora | 53,2% | 31,1% | 15,7% |
| mesa_flexora | 49,6% | 16,1% | 34,3% |
| cadeira_flexora | 49,6% | 33,8% | 16,6% |
| paralelas | 54,3% | 25,2% | 20,5% |
| elasticos | 22,3% | 8,2% | 69,5% |
| step | 59,4% | 19% | 21,6% |
| bola_suica | 66% | 15,8% | 18,2% |
| barra_hexagonal | 58,6% | 30,3% | 11,1% |
| kettlebell | 58% | 32,7% | 9,3% |
| banco_romano | 49,2% | 32,8% | 18,1% |
| estacao_puxada | 49,9% | 31,4% | 18,7% |
| estacao_remada | 52,7% | 27,5% | 19,8% |
| multifuncional | 45,5% | 36,4% | 18,2% |
| supino_maquina | 48,2% | 31,8% | 20% |
| voador | 46,6% | 35,3% | 18% |
| desenvolvimento_maquina | 54,1% | 25,9% | 20% |
| remada_articulada | 49,7% | 31,4% | 18,9% |
| graviton | 44,4% | 37,3% | 18,2% |
| rosca_maquina | 48,1% | 34% | 17,8% |
| triceps_maquina | 52,6% | 28,7% | 18,7% |
| abdominal_maquina | 41,1% | 37,2% | 21,6% |
| hack | 58% | 32,7% | 9,3% |
| cadeira_abdutora_adutora | 51,1% | 30,4% | 18,5% |
| gluteo_maquina | 59,2% | 19,7% | 21,1% |
| panturrilha_em_pe_maquina | 34,8% | 43,6% | 21,6% |
| panturrilha_sentada_maquina | 49,1% | 29,7% | 21,2% |
| suspensao | 47,7% | 33,4% | 18,9% |
| barra-porta+elasticos | 28,4% | 7,9% | 63,7% |
| halteres+bola | 72,9% | 22,7% | 4,4% |
| suspensao+elasticos | 22,3% | 17,2% | 60,5% |
| banco+halteres-leves | 71,6% | 25,2% | 3,2% |
| step+elasticos | 22,3% | 8,2% | 69,5% |

## Segurança: o que sobra com dor, no inventário vazio e com um aparelho só

| cenário | dor | dias só com abdominal | dias de superior sem tronco nem braço | dias vazios | carrega a região | região que o dado não marca | exercícios que sobram |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| vazio (= 10 outros) | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| vazio (= 10 outros) | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, panturrilha-chao, ponte-gluteo, puxada-unilateral, rosca-polia-costas |
| estacao_polia_dupla | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, panturrilha-chao, ponte-gluteo, puxada-unilateral, rosca-polia-costas |
| estacao_polia_dupla | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, panturrilha-chao, ponte-gluteo, puxada-unilateral, rosca-polia-costas |
| estacao_polia_dupla | cotovelo 7 | 0 | 104 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, panturrilha-chao, ponte-gluteo |
| estacao_polia_dupla | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-polia, crucifixo-polia-baixo, elevacao-lateral, flexao, panturrilha-chao, ponte-gluteo, puxada-unilateral, rosca-polia-costas |
| barra_fixa | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, barra-fixa, barra-fixa-supinada, elevacao-joelhos, flexao, panturrilha-chao, ponte-gluteo |
| barra_fixa | punho 7 | 0 | 264 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, elevacao-joelhos, panturrilha-chao, ponte-gluteo |
| barra_fixa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| barra_fixa | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, elevacao-joelhos, flexao, panturrilha-chao, ponte-gluteo |
| barra_fixa | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, elevacao-joelhos, panturrilha-chao, ponte-gluteo |
| barra_fixa | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | barra-fixa, barra-fixa-supinada, elevacao-joelhos, flexao, panturrilha-chao, ponte-gluteo |
| halteres_fixos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | ombro 7 | 0 | 49 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, stiff, stiff-unilateral |
| halteres_fixos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| halteres_fixos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres_fixos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | elevacao-halteres, flexao, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | ombro 7 | 0 | 36 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, stiff, stiff-unilateral |
| anilhas_e_manoplas | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| anilhas_e_manoplas | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, stiff, stiff-unilateral |
| anilhas_e_manoplas | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | elevacao-halteres, flexao, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| barra_longa | joelho 7 | 0 | 96 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | punho 7 | 0 | 632 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, remada-barra, terra-romeno-barra |
| barra_longa | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, terra-romeno-barra |
| barra_longa | lombar 7 | 0 | 296 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo |
| barra_longa | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, terra-romeno-barra |
| barra_longa | joelho 7 + lombar 7 | 0 | 200 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| barra_w | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, rosca-barra-w |
| barra_w | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| barra_w | ombro 7 | 0 | 195 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, rosca-barra-w |
| barra_w | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, rosca-barra-w |
| barra_w | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| barra_w | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, rosca-barra-w |
| rack_de_agachamento | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, remada-invertida |
| rack_de_agachamento | punho 7 | 0 | 264 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, remada-invertida |
| rack_de_agachamento | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| rack_de_agachamento | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, remada-invertida |
| rack_de_agachamento | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| rack_de_agachamento | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, remada-invertida |
| smith | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, remada-invertida |
| smith | punho 7 | 0 | 256 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, remada-invertida |
| smith | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| smith | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, remada-invertida |
| smith | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-smith, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| smith | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, remada-invertida |
| leg_press | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-leg-press, ponte-gluteo |
| leg_press | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, leg-press, panturrilha-leg-press, ponte-gluteo |
| leg_press | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, leg-press, panturrilha-leg-press, ponte-gluteo |
| leg_press | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, bulgaro-peso-corpo, flexao, leg-press, panturrilha-leg-press, ponte-gluteo |
| leg_press | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, leg-press, panturrilha-leg-press, ponte-gluteo |
| leg_press | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-leg-press, ponte-gluteo |
| cadeira_extensora | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | lombar 7 | 0 | 279 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, flexao, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-extensora, panturrilha-chao, ponte-gluteo |
| cadeira_extensora | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| mesa_flexora | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo |
| mesa_flexora | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, mesa-flexora, panturrilha-chao, ponte-gluteo |
| mesa_flexora | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, mesa-flexora, panturrilha-chao, ponte-gluteo |
| mesa_flexora | lombar 7 | 0 | 349 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, mesa-flexora, panturrilha-chao, ponte-gluteo |
| mesa_flexora | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, mesa-flexora, panturrilha-chao, ponte-gluteo |
| mesa_flexora | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | lombar 7 | 0 | 349 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, flexao, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, cadeira-flexora, panturrilha-chao, ponte-gluteo |
| cadeira_flexora | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| paralelas | joelho 7 | 0 | 360 | 0 | 0 | 0 | abdominal-chao, flexao, mergulho, panturrilha-chao, ponte-gluteo |
| paralelas | punho 7 | 0 | 760 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, mergulho, panturrilha-chao, ponte-gluteo |
| paralelas | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| paralelas | lombar 7 | 0 | 368 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, mergulho, panturrilha-chao, ponte-gluteo |
| paralelas | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| paralelas | joelho 7 + lombar 7 | 0 | 360 | 0 | 0 | 0 | flexao, mergulho, panturrilha-chao, ponte-gluteo |
| elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| elasticos | ombro 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| step | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| step | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo |
| bola_suica | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo |
| bola_suica | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, panturrilha-chao, ponte-gluteo |
| bola_suica | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, panturrilha-chao, ponte-gluteo |
| bola_suica | lombar 7 | 0 | 349 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, flexao-bola, panturrilha-chao, ponte-gluteo |
| bola_suica | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-bola, panturrilha-chao, ponte-gluteo |
| bola_suica | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| barra_hexagonal | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo |
| barra_hexagonal | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo |
| barra_hexagonal | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, terra-hexagonal |
| barra_hexagonal | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| kettlebell | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo |
| kettlebell | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, goblet-kettlebell, panturrilha-chao, ponte-gluteo |
| kettlebell | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, goblet-kettlebell, panturrilha-chao, ponte-gluteo |
| kettlebell | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, bulgaro-peso-corpo, flexao, goblet-kettlebell, panturrilha-chao, ponte-gluteo |
| kettlebell | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, goblet-kettlebell, panturrilha-chao, ponte-gluteo |
| kettlebell | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| banco_romano | joelho 7 | 0 | 300 | 0 | 0 | 0 | abdominal-chao, flexao, hiperextensao, panturrilha-chao, ponte-gluteo |
| banco_romano | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, hiperextensao, panturrilha-chao, ponte-gluteo |
| banco_romano | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, hiperextensao, panturrilha-chao, ponte-gluteo |
| banco_romano | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo |
| banco_romano | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, hiperextensao, panturrilha-chao, ponte-gluteo |
| banco_romano | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| estacao_puxada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, puxada-frente |
| estacao_puxada | punho 7 | 0 | 123 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, puxada-frente |
| estacao_puxada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| estacao_puxada | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, puxada-frente |
| estacao_puxada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| estacao_puxada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, puxada-frente |
| estacao_remada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | punho 7 | 0 | 123 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, remada-baixa-estacao |
| estacao_remada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| estacao_remada | lombar 7 | 0 | 256 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo |
| estacao_remada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| estacao_remada | joelho 7 + lombar 7 | 0 | 144 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| multifuncional | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | punho 7 | 0 | 368 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, puxada-frente, remada-baixa-estacao |
| multifuncional | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| multifuncional | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, puxada-frente |
| multifuncional | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| multifuncional | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, puxada-frente |
| supino_maquina | joelho 7 | 0 | 376 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, supino-maquina |
| supino_maquina | punho 7 | 0 | 217 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, supino-maquina |
| supino_maquina | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| supino_maquina | lombar 7 | 0 | 376 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, supino-maquina |
| supino_maquina | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| supino_maquina | joelho 7 + lombar 7 | 0 | 376 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, supino-maquina |
| voador | joelho 7 | 0 | 376 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, voador |
| voador | punho 7 | 0 | 173 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, voador |
| voador | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| voador | lombar 7 | 0 | 376 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, voador |
| voador | cotovelo 7 | 0 | 173 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, voador |
| voador | joelho 7 + lombar 7 | 0 | 376 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, voador |
| desenvolvimento_maquina | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, desenvolvimento-maquina, flexao, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | punho 7 | 0 | 865 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, desenvolvimento-maquina, flexao, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| desenvolvimento_maquina | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | desenvolvimento-maquina, flexao, panturrilha-chao, ponte-gluteo |
| remada_articulada | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, remada-articulada |
| remada_articulada | punho 7 | 0 | 123 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, remada-articulada |
| remada_articulada | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| remada_articulada | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, remada-articulada |
| remada_articulada | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| remada_articulada | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, remada-articulada |
| graviton | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, barra-fixa-graviton, flexao, mergulho-graviton, panturrilha-chao, ponte-gluteo |
| graviton | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, barra-fixa-graviton, bulgaro-peso-corpo, mergulho-graviton, panturrilha-chao, ponte-gluteo |
| graviton | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| graviton | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, barra-fixa-graviton, bulgaro-peso-corpo, flexao, mergulho-graviton, panturrilha-chao, ponte-gluteo |
| graviton | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| graviton | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | barra-fixa-graviton, flexao, mergulho-graviton, panturrilha-chao, ponte-gluteo |
| rosca_maquina | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | punho 7 | 0 | 195 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | ombro 7 | 0 | 195 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, rosca-maquina |
| rosca_maquina | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| rosca_maquina | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, rosca-maquina |
| triceps_maquina | joelho 7 | 0 | 248 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | punho 7 | 0 | 362 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | ombro 7 | 0 | 362 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | lombar 7 | 0 | 280 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, triceps-maquina |
| triceps_maquina | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| triceps_maquina | joelho 7 + lombar 7 | 0 | 248 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, triceps-maquina |
| abdominal_maquina | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-maquina, flexao, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| abdominal_maquina | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| hack | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo |
| hack | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, hack, panturrilha-chao, ponte-gluteo |
| hack | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, hack, panturrilha-chao, ponte-gluteo |
| hack | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, bulgaro-peso-corpo, flexao, hack, panturrilha-chao, ponte-gluteo |
| hack | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, bulgaro-peso-corpo, hack, panturrilha-chao, ponte-gluteo |
| hack | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 | 0 | 319 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, flexao, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | lombar 7 | 0 | 344 | 0 | 0 | 0 | abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, abducao-maquina, aducao-maquina, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| cadeira_abdutora_adutora | joelho 7 + lombar 7 | 0 | 316 | 0 | 0 | 0 | abducao-maquina, aducao-maquina, flexao, panturrilha-chao, ponte-gluteo |
| gluteo_maquina | joelho 7 | 0 | 344 | 0 | 0 | 0 | abdominal-chao, coice-maquina, flexao, panturrilha-chao |
| gluteo_maquina | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, panturrilha-chao |
| gluteo_maquina | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, panturrilha-chao |
| gluteo_maquina | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, flexao, panturrilha-chao |
| gluteo_maquina | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, coice-maquina, panturrilha-chao |
| gluteo_maquina | joelho 7 + lombar 7 | 0 | 344 | 0 | 0 | 0 | coice-maquina, flexao, panturrilha-chao |
| panturrilha_em_pe_maquina | joelho 7 | 0 | 312 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | lombar 7 | 0 | 344 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_em_pe_maquina | joelho 7 + lombar 7 | 0 | 312 | 0 | 0 | 0 | flexao, panturrilha-em-pe-maquina, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 | 0 | 216 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | punho 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | lombar 7 | 0 | 295 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| panturrilha_sentada_maquina | joelho 7 + lombar 7 | 0 | 216 | 0 | 0 | 0 | flexao, panturrilha-chao, panturrilha-sentada, ponte-gluteo |
| suspensao | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, flexao, panturrilha-chao, ponte-gluteo, remada-suspensao |
| suspensao | punho 7 | 0 | 264 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo, remada-suspensao |
| suspensao | ombro 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| suspensao | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, flexao, panturrilha-chao, ponte-gluteo, remada-suspensao |
| suspensao | cotovelo 7 | 0 | 1880 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-peso-corpo, bulgaro-peso-corpo, panturrilha-chao, ponte-gluteo |
| suspensao | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | flexao, panturrilha-chao, ponte-gluteo, remada-suspensao |
| barra-porta+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, barra-fixa, barra-fixa-supinada, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| barra-porta+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| barra-porta+elasticos | ombro 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| barra-porta+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, barra-fixa, barra-fixa-supinada, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, triceps-elastico-acima |
| barra-porta+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| barra-porta+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | barra-fixa, barra-fixa-supinada, crucifixo-elastico, desenvolvimento-elastico, elevacao-joelhos, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha-chao, ponte-gluteo, remada-elastico, rosca-elastico, triceps-elastico-acima |
| halteres+bola | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, flexao-bola, goblet, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, rosca-alternada, stiff, stiff-unilateral, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | ombro 7 | 0 | 38 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, flexao-bola, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, stiff, stiff-unilateral |
| halteres+bola | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo, afundo-tras, agachamento-halteres, elevacao-halteres, flexao, flexao-bola, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| halteres+bola | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, crucifixo-invertido-curvado, elevacao-halteres, flexao-bola, goblet, panturrilha-chao, ponte-gluteo-halter, stiff, stiff-unilateral |
| halteres+bola | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | elevacao-halteres, flexao, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, supino-chao-halteres, triceps-frances-halter |
| suspensao+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| suspensao+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| suspensao+elasticos | ombro 7 | 0 | 51 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| suspensao+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, triceps-elastico-acima |
| suspensao+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha-chao, ponte-gluteo, stiff-elastico |
| suspensao+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, remada-suspensao, rosca-elastico, triceps-elastico-acima |
| banco+halteres-leves | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, rosca-alternada, stiff, stiff-unilateral, supino-reto, triceps-frances-halter |
| banco+halteres-leves | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, desenvolvimento-unilateral, elevacao-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, remada-curvada-halteres, remada-unilateral-halter, rosca-alternada, stiff, stiff-unilateral, supino-reto, triceps-frances-halter |
| banco+halteres-leves | ombro 7 | 0 | 32 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, bulgaro, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, stiff, stiff-unilateral |
| banco+halteres-leves | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, elevacao-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, supino-reto, triceps-frances-halter |
| banco+halteres-leves | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo, afundo-tras, agachamento-halteres, bulgaro, crucifixo-halteres, crucifixo-invertido-curvado, elevacao-halteres, goblet, panturrilha-chao, ponte-gluteo-halter, stiff, stiff-unilateral |
| banco+halteres-leves | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-halteres, elevacao-halteres, panturrilha-chao, ponte-gluteo-halter, rosca-alternada, supino-reto, triceps-frances-halter |
| step+elasticos | joelho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| step+elasticos | punho 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, stiff-elastico, triceps-elastico-acima |
| step+elasticos | ombro 7 | 0 | 54 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, rosca-elastico, stiff-elastico |
| step+elasticos | lombar 7 | 0 | 0 | 0 | 0 | 0 | afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |
| step+elasticos | cotovelo 7 | 0 | 0 | 0 | 0 | 0 | abdominal-chao, afundo-peso-corpo, agachamento-elastico, agachamento-peso-corpo, bulgaro-peso-corpo, crucifixo-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao-joelho-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, stiff-elastico |
| step+elasticos | joelho 7 + lombar 7 | 0 | 0 | 0 | 0 | 0 | crucifixo-elastico, desenvolvimento-elastico, elevacao-lateral-elastico, face-pull-elastico, flexao, flexao-elastico, panturrilha, panturrilha-bilateral-step, panturrilha-chao, ponte-gluteo, puxada-elastico, remada-elastico, rosca-elastico, triceps-elastico-acima |

## Exemplos (3 por problema, de cenários diferentes)

### `dia.superior-sem-superior`

- **vazio · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · punho 7**: Superior A sem nenhum exercício de tronco ou braço (panturrilha-chao).
  - Programa: Superior A (6 min): panturrilha-chao 3 | Inferior A (18 min): agachamento-peso-corpo 2, panturrilha-chao 2, abdominal-chao 2 | Corpo todo (23 min): afundo-peso-corpo 2, ponte-gluteo 2, abdominal-chao 2
- **estacao_polia_dupla · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (bulgaro-peso-corpo, ponte-gluteo, panturrilha-chao).
  - Programa: Superior A (22 min): bulgaro-peso-corpo 2, ponte-gluteo 2, panturrilha-chao 2 | Inferior A (18 min): agachamento-peso-corpo 2, panturrilha-chao 2, abdominal-chao 2 | Corpo todo (23 min): afundo-peso-corpo 2, ponte-gluteo 2, abdominal-chao 2
- **barra_fixa · iniciante · Superior/Inferior + Corpo todo (3 dias) · 20 min · prioridade nenhuma · ombro 7**: Superior A sem nenhum exercício de tronco ou braço (bulgaro-peso-corpo, panturrilha-chao).
  - Programa: Superior A (17 min): bulgaro-peso-corpo 2, panturrilha-chao 3 | Inferior A (18 min): agachamento-peso-corpo 2, panturrilha-chao 2, abdominal-chao 2 | Corpo todo (23 min): afundo-peso-corpo 2, ponte-gluteo 2, abdominal-chao 2

### `equilibrio.sem-posteriores`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (29 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (20 min): afundo-peso-corpo 2, crucifixo-polia 2, rosca-polia-costas 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de joelho (agachar, afundo), 0 de quadril e 0 de posteriores da coxa.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `equilibrio.sem-puxar`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: 4 séries de empurrar e nenhuma de puxar.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (24 min): afundo-peso-corpo 2, flexao 2, rosca-barra-w 4

### `vaga.sem-aviso.empurrar-vertical`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade superior · sem dor**: a vaga "Empurrar vertical" some do dia sem aviso nenhum (ombro (frente) não tem meta própria).
  - Programa: Corpo todo A (23 min): flexao 2, agachamento-peso-corpo 2, panturrilha-chao 4 | Corpo todo B (37 min): flexao 4, afundo-peso-corpo 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade superior · sem dor**: a vaga "Empurrar vertical" some do dia sem aviso nenhum (ombro (frente) não tem meta própria).
  - Programa: Corpo todo A (32 min): flexao 2, puxada-unilateral 4, agachamento-peso-corpo 2 | Corpo todo B (24 min): afundo-peso-corpo 2, crucifixo-polia 3, rosca-polia-costas 3
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade superior · sem dor**: a vaga "Empurrar vertical" some do dia sem aviso nenhum (ombro (frente) não tem meta própria).
  - Programa: Corpo todo A (20 min): flexao 2, barra-fixa 2, agachamento-peso-corpo 2 | Corpo todo B (37 min): flexao 4, afundo-peso-corpo 2, abdominal-chao 4

### `vaga.so-aviso-do-musculo.biceps`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Bíceps" não tem exercício possível e some do dia; só o aviso de bíceps aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `vaga.so-aviso-do-musculo.crucifixo`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · punho 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, panturrilha-chao 4, abdominal-chao 2 | Corpo todo B (23 min): afundo-peso-corpo 2, ponte-gluteo 2, abdominal-chao 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · punho 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, barra-fixa 2, panturrilha-chao 4 | Corpo todo B (25 min): afundo-peso-corpo 2, barra-fixa-supinada 2, abdominal-chao 4
- **halteres_fixos · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Crucifixo (peito alongado)" não tem exercício possível e some do dia; só o aviso de peito aparece.
  - Programa: Corpo todo A (23 min): goblet 2, stiff 2, panturrilha-chao 4 | Corpo todo B (24 min): afundo 2, stiff-unilateral 2, rosca-alternada 4

### `vaga.so-aviso-do-musculo.dobrar-quadril`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Dobrar o quadril" não tem exercício possível e some do dia; só o aviso de posteriores da coxa aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Dobrar o quadril" não tem exercício possível e some do dia; só o aviso de posteriores da coxa aparece.
  - Programa: Corpo todo A (29 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (20 min): afundo-peso-corpo 2, crucifixo-polia 2, rosca-polia-costas 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Dobrar o quadril" não tem exercício possível e some do dia; só o aviso de posteriores da coxa aparece.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `vaga.so-aviso-do-musculo.elevacao-lateral`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Elevação lateral" não tem exercício possível e some do dia; só o aviso de ombro (lateral) aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `vaga.so-aviso-do-musculo.flexao-joelho`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Flexão de joelho" não tem exercício possível e some do dia; só o aviso de posteriores da coxa aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Flexão de joelho" não tem exercício possível e some do dia; só o aviso de posteriores da coxa aparece.
  - Programa: Corpo todo A (29 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (20 min): afundo-peso-corpo 2, crucifixo-polia 2, rosca-polia-costas 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Flexão de joelho" não tem exercício possível e some do dia; só o aviso de posteriores da coxa aparece.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `vaga.so-aviso-do-musculo.ombro-posterior`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (29 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (20 min): afundo-peso-corpo 2, crucifixo-polia 2, rosca-polia-costas 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Ombro posterior" não tem exercício possível e some do dia; só o aviso de ombro (posterior) aparece.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `vaga.so-aviso-do-musculo.puxar-horizontal`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, panturrilha-chao 4, abdominal-chao 2 | Corpo todo B (23 min): afundo-peso-corpo 2, ponte-gluteo 2, abdominal-chao 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · ombro 7**: a vaga "Puxar horizontal" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, panturrilha-chao 4, abdominal-chao 2 | Corpo todo B (23 min): afundo-peso-corpo 2, ponte-gluteo 2, abdominal-chao 2

### `vaga.so-aviso-do-musculo.puxar-vertical`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Puxar vertical" não tem exercício possível e some do dia; só o aviso de costas aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (24 min): afundo-peso-corpo 2, flexao 2, rosca-barra-w 4

### `vaga.so-aviso-do-musculo.triceps-acima-cabeca`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (29 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (20 min): afundo-peso-corpo 2, crucifixo-polia 2, rosca-polia-costas 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps acima da cabeça" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `vaga.so-aviso-do-musculo.triceps-complemento`

- **vazio · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps (complemento)" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (19 min): agachamento-peso-corpo 2, flexao 2, abdominal-chao 2 | Corpo todo B (22 min): flexao 2, panturrilha-chao 4, abdominal-chao 2 | Corpo todo C (23 min): afundo-peso-corpo 2, flexao 2, ponte-gluteo 2
- **estacao_polia_dupla · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps (complemento)" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (22 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 2 | Corpo todo B (18 min): crucifixo-polia 2, rosca-polia-costas 2, panturrilha-chao 4 | Corpo todo C (24 min): afundo-peso-corpo 2, flexao 2, puxada-unilateral 2
- **barra_fixa · iniciante · Corpo todo A/B/C (3 dias) · 20 min · prioridade nenhuma · sem dor**: a vaga "Tríceps (complemento)" não tem exercício possível e some do dia; só o aviso de tríceps aparece.
  - Programa: Corpo todo A (20 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 2 | Corpo todo B (27 min): flexao 2, panturrilha-chao 4, abdominal-chao 4 | Corpo todo C (22 min): afundo-peso-corpo 2, flexao 2, barra-fixa-supinada 2

### `volume.zero.biceps`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade inferior · sem dor**: bíceps com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (19 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 2 | Corpo todo B (37 min): afundo-peso-corpo 4, ponte-gluteo 3, flexao 2

### `volume.zero.costas`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: costas com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (24 min): afundo-peso-corpo 2, flexao 2, rosca-barra-w 4

### `volume.zero.ombro_lateral`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (29 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (20 min): afundo-peso-corpo 2, crucifixo-polia 2, rosca-polia-costas 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (lateral) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

### `volume.zero.ombro_posterior`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_longa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **barra_w · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: ombro (posterior) com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (24 min): afundo-peso-corpo 2, flexao 2, rosca-barra-w 4

### `volume.zero.posteriores`

- **vazio · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (23 min): agachamento-peso-corpo 2, flexao 2, panturrilha-chao 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4
- **estacao_polia_dupla · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (29 min): agachamento-peso-corpo 2, flexao 2, puxada-unilateral 4 | Corpo todo B (20 min): afundo-peso-corpo 2, crucifixo-polia 2, rosca-polia-costas 2
- **barra_fixa · iniciante · Corpo todo A/B (2 dias) · 20 min · prioridade nenhuma · sem dor**: posteriores da coxa com 0 série na semana, sem dor nenhuma.
  - Programa: Corpo todo A (25 min): agachamento-peso-corpo 2, flexao 2, barra-fixa 4 | Corpo todo B (26 min): afundo-peso-corpo 2, flexao 2, abdominal-chao 4

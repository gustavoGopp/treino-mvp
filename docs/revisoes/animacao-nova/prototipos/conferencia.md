# Conferência automática das animações novas

Gerado por `npm run conferir:animacao` (60 quadros por segundo, ciclo inteiro). Corpo: ANSUR II (militares dos EUA, 2012), homens, IMC de 18,5 a 24,9; n = 1061; média de cada medida.

| animação | quadros | itens | falhas | avisos |
|---|---|---|---|---|
| goblet | 279 | 31 | 0 | 3 |
| supino-reto | 291 | 30 | 0 | 1 |
| puxada-unilateral | 240 | 30 | 0 | 3 |
| flexao | 225 | 30 | 0 | 4 |

"ok" = dentro do limite; "AVISO" = possível, mas fora da média ou ainda provisório (precisa do ok do Gustavo); "FALHA" = não pode ir para o app.

## Agachamento goblet com calcanhar elevado (`goblet`)

279 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 8 a 126; cotovelo 152 a 152; quadril 10 a 124; ombro 14 a 14; dorsiflexao -7 a 23; punho -0 a 0; pronacao 32 a 32; clavicula 11 a 11.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 126° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 151,8° | média 148°, máximo observado 166° (cdc) | AVISO |
| Amplitudes | flexão do quadril | 124,5° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 16,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 13,8° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 23,3° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 7,4° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 32,4° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 6,9° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 12,5 a 12,5 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 6% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 104,3 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | embaixo, o quadril fica na altura do joelho ou abaixo (consenso) | embaixo, o centro do quadril fica 5,2 cm abaixo do centro do joelho | como a ficha pede | ok |
| Ficha | o joelho segue a direção da ponta do pé (consenso) | o joelho anda numa direção a 4,4° da direção do pé (visto de cima) | como a ficha pede | ok |
| Ficha | o peso fica no meio do pé, com o calcanhar apoiado (consenso) | o centro de massa (corpo + carga) fica a no máximo 0,4 cm do meio do pé (pé de 19,9 cm do calcanhar à bola) | como a ficha pede | ok |
| Ficha | a lombar não arredonda (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | tronco.baixo, carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |

## Supino reto com halteres (`supino-reto`)

291 quadros conferidos. 0 falha(s), 1 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 87 a 87; cotovelo 10 a 104; quadril -5 a -5; ombro 50 a 83; dorsiflexao 2 a 2; punho 0 a 0; pronacao 15 a 15; clavicula 8 a 10.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 86,8° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 104° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | -5,5° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 5,5° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 24,6° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 82,9° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 1,6° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 15° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pelve | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 0 a 0 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 4,1% da velocidade de pico (mão direita, Subida · concêntrica); pico de 71,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | antebraço na vertical durante todo o movimento (consenso) | o antebraço desvia no máximo 0° da vertical | como a ficha pede | ok |
| Ficha | cotovelos a 30–60° do tronco (consenso) | embaixo, o braço faz 50° com o tronco, visto de cima | como a ficha pede | ok |
| Ficha | no topo, os halteres ficam sobre os ombros (consenso) | no topo, o halter fica a 5,3 cm da vertical do ombro | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |

## Puxada unilateral ajoelhado na polia alta (`puxada-unilateral`)

240 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 90 a 90; cotovelo 12 a 162; quadril -2 a -2; ombro 16 a 139; dorsiflexao -81 a -81; punho -0 a 0; pronacao -20 a 50; clavicula 5 a 26.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 90° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 162,3° | média 148°, máximo observado 166° (cdc) | AVISO |
| Amplitudes | flexão do quadril | -2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 2° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 138,8° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | -80,7° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 80,7° | média 56,7°, máximo observado 90° (cdc) | AVISO |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 50,2° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 20° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: joelho.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: joelho.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 1,1 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | cabo: a pilha sobe o curso do cabo dividido pela relação da máquina (2:1) | o cabo anda 63,4 cm e a pilha sobe 31,7 cm | esperado 31,7 cm; tolerância 0,3 cm | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 7,4% da velocidade de pico (cotovelo direito, Puxada · concêntrica); pico de 157,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | o antebraço segue a linha do cabo (o cabo fica reto, da polia à mão) (desenho) | da metade da puxada em diante, o antebraço desvia no máximo 10,5° da linha do cabo | como a ficha pede | ok |
| Ficha | no fim, o ombro está mais baixo que no início (consenso) | do início ao fim, a ponta do ombro desce 5,3 cm | como a ficha pede | ok |
| Ficha | o tronco quase não se move (consenso) | a base do pescoço se move no máximo 0 cm | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | braco.fim.fora | cada uma precisa de fonte ou do ok do Gustavo | AVISO |

## Flexão de braço (`flexao`)

225 quadros conferidos. 0 falha(s), 4 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 10 a 118; quadril 2 a 2; ombro 39 a 62; dorsiflexao 12 a 12; punho 78 a 94; pronacao 41 a 51; clavicula 12 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 4° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 118,5° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 61,7° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 12° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 51,3° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 94,1° | média 70°, máximo observado 95° (aaos) | AVISO |
| Amplitudes | extensão dos dedos do pé | 76,8° | média 70°, máximo observado 90° (aaos) | AVISO |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 16,4% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 80,7 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo em linha reta da cabeça aos calcanhares (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 177,3° (180° = linha reta) | como a ficha pede | ok |
| Ficha | embaixo, o peito fica a poucos centímetros do chão (consenso) | embaixo, o peito fica a 5 cm do chão | como a ficha pede | ok |
| Ficha | cotovelos a meio caminho entre o tronco e os lados (consenso) | embaixo, o braço faz 41,2° com o tronco, visto de cima | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | tornozelo.dorsiflexao, escapula.retracaoEmbaixo | cada uma precisa de fonte ou do ok do Gustavo | AVISO |

## Medidas ainda provisórias nas tabelas

Estas linhas ainda não têm fonte lida. Não são falha de uma animação, e sim pendência das tabelas: cada uma precisa de fonte (ou do ok do Gustavo como escolha de desenho) antes do critério de pronto.

### Corpo (13)
- pe.calcanharAoTornozelo = 6.7 cm (posição do tornozelo ao longo do pé (25% do comprimento): sem fonte lida)
- raio.bracoRelaxadoSobreFletido = 0.93 razão (o ANSUR II só mede o braço contraído; a razão relaxado/contraído ainda não tem fonte lida)
- quadril.meiaDistancia = 8.7 cm (metade da distância entre os dois centros do quadril: a conferir (Bell 1990, Harrington 2007 ou modelo OpenSim))
- ombro.centroAFrente = 0 cm (centro do ombro sobre a linha do quadril, de lado (linha de prumo da postura: a conferir))
- l5s1.acima = 12 cm (altura de L5–S1 acima do centro do quadril: a conferir (crista ilíaca − 1 vértebra lombar))
- l5s1.atras = 4.5 cm (recuo de L5–S1 atrás do centro do quadril: a conferir)
- coluna.lordoseLombar = 50 graus (curva lombar em pé de L1 a L5 (Vialle 2005 dá 60 de lordose máxima incluindo o sacro): a conferir)
- coluna.cifoseToracica = 40 graus (curva torácica em pé: sem fonte lida)
- coluna.lordoseCervical = 30 graus (curva cervical em pé: sem fonte lida)
- clavicula.comp = 15 cm (comprimento da clavícula: a conferir (pesquisa 03))
- esterno.meiaDistanciaDasClaviculas = 2.5 cm (da linha do meio até a articulação da clavícula com o esterno: sem fonte lida)
- escapula.altura = 15.5 cm (do ângulo superior ao inferior: a conferir (pesquisa 03))
- escapula.largura = 10.5 cm (da borda medial à cavidade do ombro: a conferir (pesquisa 03))

### Objetos (16)
- halter.caboComp = 13 cm (comprimento livre do cabo entre as cabeças: nenhuma ficha lida informa)
- bancoReto.tubo = 5 cm (lado do tubo da estrutura: nenhuma ficha lida informa)
- anilhaCalcanhar.esp = 2.4 cm (espessura da anilha de 10 lb: a Rogue não informa)
- torre.colunaLarg = 30 cm (largura da coluna com a carenagem da pilha: nenhuma ficha lida informa)
- torre.roldanaDiam = 11.5 cm (diâmetro da roldana do carrinho: só há a de 6 pol de uma polia de rack (Rogue), que é outro aparelho)
- torre.pilhaLarg = 22 cm (largura das placas da pilha: nenhuma ficha lida informa)
- torre.placaEsp = 2.5 cm (espessura de cada placa da pilha: nenhuma ficha lida informa)
- torre.placas = 16 un (número de placas desenhadas)
- estribo.pegadaComp = 12.5 cm (comprimento da pegada: sem medida lida)
- estribo.pegadaDiam = 3.2 cm (diâmetro da pegada: sem medida lida)
- estribo.altura = 15 cm (da pegada ao elo do cabo: sem medida lida)
- colchonete.comp = 100 cm (sem medida lida)
- colchonete.larg = 50 cm (sem medida lida)
- colchonete.esp = 1.5 cm (sem medida lida)
- bancoRegulavel.assentoComp = 34 cm (comprimento só do assento: nenhuma ficha lida separa assento e encosto)
- bancoRegulavel.tubo = 6 cm (lado do tubo da estrutura: nenhuma ficha lida informa)

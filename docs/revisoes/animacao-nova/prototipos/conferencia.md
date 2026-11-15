# Conferência automática das animações novas

Gerado por `npm run conferir:animacao` (60 quadros por segundo, ciclo inteiro). Corpo: ANSUR II (militares dos EUA, 2012), homens, IMC de 18,5 a 24,9; n = 1061; média de cada medida.

| animação | quadros | itens | falhas | avisos |
|---|---|---|---|---|
| goblet | 279 | 34 | 0 | 3 |
| supino-reto | 291 | 33 | 0 | 2 |
| puxada-unilateral | 240 | 34 | 0 | 4 |
| flexao | 225 | 34 | 0 | 6 |
| agachamento-peso-corpo | 279 | 33 | 0 | 4 |
| agachamento-elastico | 279 | 34 | 0 | 5 |
| afundo-peso-corpo | 270 | 33 | 0 | 4 |
| afundo | 270 | 36 | 0 | 5 |

"ok" = dentro do limite; "AVISO" = possível, mas fora da média ou ainda provisório (precisa do ok do Gustavo); "FALHA" = não pode ir para o app.

## Agachamento goblet com calcanhar elevado (`goblet`)

279 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 8 a 126; cotovelo 130 a 130; quadril 11 a 127; ombro 15 a 15; dorsiflexao -8 a 22; punho 66 a 66; pronacao 39 a 39; clavicula 11 a 11.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 126° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 129,7° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 126,8° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 16,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 15,1° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 21,5° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 8,4° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 39,3° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 65,7° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 6,9° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelhos para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 10 a 10 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 6,2% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 107,3 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | embaixo, o quadril fica na altura do joelho ou abaixo (consenso) | embaixo, o centro do quadril fica 6,8 cm abaixo do centro do joelho | como a ficha pede | ok |
| Ficha | o joelho segue a direção da ponta do pé (consenso) | o joelho anda numa direção a 5,6° da direção do pé (visto de cima) | como a ficha pede | ok |
| Ficha | o peso fica no meio do pé, com o calcanhar apoiado (consenso) | o centro de massa (corpo + carga) fica a no máximo 0,4 cm do meio do pé (pé de 19,9 cm do calcanhar à bola) | como a ficha pede | ok |
| Ficha | a lombar não arredonda (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | tronco.baixo, maos.aberturaDaConcha, maos.giroParaFrente, maos.meiaEspessuraDaPalma, carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 346 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Supino reto com halteres (`supino-reto`)

291 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 86 a 86; cotovelo 10 a 104; quadril -5 a -5; ombro 50 a 83; dorsiflexao 1 a 1; punho 0 a 0; pronacao 15 a 15; clavicula 8 a 10.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 86,3° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 104° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | -5,5° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 5,5° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 24,8° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 82,9° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 1° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 15° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pelve | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Cotovelos abertos a ~90°) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 0 a 0 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 4,1% da velocidade de pico (mão direita, Subida · concêntrica); pico de 71,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | antebraço na vertical durante todo o movimento (consenso) | o antebraço desvia no máximo 0° da vertical | como a ficha pede | ok |
| Ficha | cotovelos a 30–60° do tronco (consenso) | embaixo, o braço faz 50° com o tronco, visto de cima | como a ficha pede | ok |
| Ficha | no topo, os halteres ficam sobre os ombros (consenso) | no topo, o halter fica a 5,3 cm da vertical do ombro | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | cabeca.folgaNoBanco, carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: peito; secundário: ombro_anterior, triceps) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de cima: 465 cm² (padrão); de lado: 84 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Puxada unilateral ajoelhado na polia alta (`puxada-unilateral`)

240 quadros conferidos. 0 falha(s), 4 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 90 a 90; cotovelo 12 a 152; quadril -6 a -6; ombro 13 a 129; dorsiflexao -81 a -81; punho -0 a 0; pronacao -9 a 61; clavicula 5 a 26.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 90° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 151,6° | média 148°, máximo observado 166° (cdc) | AVISO |
| Amplitudes | flexão do quadril | -6° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 6° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 129,1° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | -80,7° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 80,7° | média 56,7°, máximo observado 90° (cdc) | AVISO |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 61,3° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 9,1° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: joelho.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: joelho.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 1,1 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 1,1 cm (Jogar o tronco para trás) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | cabo: a pilha sobe o curso do cabo dividido pela relação da máquina (2:1) | o cabo anda 59,6 cm e a pilha sobe 29,8 cm | esperado 29,8 cm; tolerância 0,3 cm | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 6,7% da velocidade de pico (cotovelo direito, Puxada · concêntrica); pico de 143,4 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | o antebraço segue a linha do cabo (o cabo fica reto, da polia à mão) (desenho) | da metade da puxada em diante, o antebraço desvia no máximo 8,3° da linha do cabo | como a ficha pede | ok |
| Ficha | no fim, o ombro está mais baixo que no início (consenso) | do início ao fim, a ponta do ombro desce 5 cm | como a ficha pede | ok |
| Ficha | o tronco quase não se move (consenso) | a base do pescoço se move no máximo 0 cm | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | braco.fim.fora | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: costas; secundário: biceps, ombro_posterior) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Trapézio, partes do meio e de baixo aparece como secundário dentro de um grupo que o conteúdo conta como principal (costas) | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de três quartos, de trás: 208 cm² (padrão); de lado: 176 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

## Flexão de braço (`flexao`)

225 quadros conferidos. 0 falha(s), 6 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 10 a 112; quadril 2 a 2; ombro 43 a 62; dorsiflexao 12 a 12; punho 79 a 94; pronacao 40 a 45; clavicula 12 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 4° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 111,5° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,2° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 61,9° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 12° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 44,6° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 94,3° | média 70°, máximo observado 95° (aaos) | AVISO |
| Amplitudes | extensão dos dedos do pé | 76,1° | média 70°, máximo observado 90° (aaos) | AVISO |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Quadril cai) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 16,2% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 75,3 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo em linha reta da cabeça aos calcanhares (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 177,2° (180° = linha reta) | como a ficha pede | ok |
| Ficha | embaixo, o peito fica a poucos centímetros do chão (consenso) | embaixo, o peito fica a 5 cm do chão | como a ficha pede | ok |
| Ficha | cotovelos a meio caminho entre o tronco e os lados (consenso) | embaixo, o braço faz 43,6° com o tronco, visto de cima | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | tornozelo.dorsiflexao, escapula.retracaoEmbaixo | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: peito; secundário: triceps, ombro_anterior) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Reto abdominal aparece como "só ajuda a firmar", fora da lista do conteúdo | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 84 cm² (padrão); de cima: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Agachamento com o peso do corpo (`agachamento-peso-corpo`)

279 quadros conferidos. 0 falha(s), 4 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 8 a 126; cotovelo 6 a 6; quadril 10 a 137; ombro 94 a 124; dorsiflexao -1 a 25; punho -0 a -0; pronacao 14 a 14; clavicula 14 a 16.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 126° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 6° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 137,3° | média 132°, máximo observado 159° (cdc) | AVISO |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 16,1° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 124° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 25,4° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 1,1° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 14,2° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelhos para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 7% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 113,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | embaixo, o quadril fica abaixo da altura do joelho (moderada) | embaixo, o centro do quadril fica 10 cm abaixo do centro do joelho | como a ficha pede | ok |
| Ficha | o joelho segue a direção da ponta do pé (consenso) | o joelho anda numa direção a 5,1° da direção do pé (visto de cima) | como a ficha pede | ok |
| Ficha | o calcanhar fica apoiado: o peso no meio do pé (consenso) | o centro de massa (corpo + carga) fica a no máximo 0,3 cm do meio do pé (pé de 19,9 cm do calcanhar à bola) | como a ficha pede | ok |
| Ficha | a lombar não arredonda (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | tronco.baixo, bracos.paraDentro, cotovelo | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 347 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Agachamento com elástico (`agachamento-elastico`)

279 quadros conferidos. 0 falha(s), 5 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 8 a 126; cotovelo 153 a 153; quadril 8 a 131; ombro 16 a 16; dorsiflexao 1 a 30; punho -0 a 0; pronacao 81 a 81; clavicula 11 a 11.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 126° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 152,6° | média 148°, máximo observado 166° (cdc) | AVISO |
| Amplitudes | flexão do quadril | 130,9° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 16,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 16,5° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 29,9° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 81,2° | média 80°, máximo observado 108° (cdc) | AVISO |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelhos para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | elástico: quanto estica no ciclo (1 = comprimento em repouso) | de 1,4 a 2,5 vezes (176,6 a 302,7 cm); em cima, 2,5 vezes | nunca frouxo (1 ou mais), mais esticado em cima e nunca além de 3 vezes (o máximo do fabricante) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 6,2% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 113,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | embaixo, o quadril fica na altura do joelho ou abaixo (consenso) | embaixo, o centro do quadril fica 5,5 cm abaixo do centro do joelho | como a ficha pede | ok |
| Ficha | o joelho segue a direção da ponta do pé (consenso) | o joelho anda numa direção a 4,1° da direção do pé (visto de cima) | como a ficha pede | ok |
| Ficha | o calcanhar fica apoiado: o peso no meio do pé (consenso) | o centro de massa (corpo + carga) fica a no máximo 0,3 cm do meio do pé (pé de 19,9 cm do calcanhar à bola) | como a ficha pede | ok |
| Ficha | a lombar não arredonda (consenso) | flexão da lombar além da curva de repouso: 0° | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | tronco.baixo, elastico.folgaNoJoelho, maos.aFrenteDoOmbro, maos.acimaDoOmbro | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 352 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Afundo estático com o peso do corpo (`afundo-peso-corpo`)

270 quadros conferidos. 0 falha(s), 4 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 14 a 91; cotovelo 105 a 105; quadril 40 a 93; ombro 53 a 53; dorsiflexao -22 a 2; punho -0 a 0; pronacao 70 a 70; clavicula 13 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 92,3° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 104,8° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 92,8° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 13,5° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 53,2° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 31,8° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 21,6° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 69,6° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 66° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelho da frente para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 9,1% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 43 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso) | o quadril anda no máximo 0 cm para a frente ou para trás na descida | como a ficha pede | ok |
| Ficha | embaixo, o joelho de trás fica a poucos centímetros do chão (consenso) | embaixo, a pele do joelho de trás fica a 4 cm do chão (o centro do joelho a 9 cm) | como a ficha pede | ok |
| Ficha | o tronco fica quase vertical (consenso) | o peito inclina no máximo 5,3° da vertical | como a ficha pede | ok |
| Ficha | o pé da frente fica inteiro no chão (consenso) | o calcanhar e a bola do pé da frente ficam a no máximo 0 cm do chão | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | peDaFrente.aFrenteDoQuadril, peDeTras.atrasDoQuadril, peDeTras.calcanhar, maos.naCintura.acima | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Quadríceps aparece como secundário dentro de um grupo que o conteúdo conta como principal (quadriceps) | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 354 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Afundo estático com halteres (`afundo`)

270 quadros conferidos. 0 falha(s), 5 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 14 a 91; cotovelo 2 a 2; quadril 40 a 93; ombro 9 a 9; dorsiflexao -22 a 2; punho 0 a 0; pronacao 0 a 0; clavicula 11 a 11.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 92,3° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 1,7° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 92,8° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 23,5° | média 18,5°, máximo observado 42° (cdc) | AVISO |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 8,8° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 31,8° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 21,6° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 66° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelho da frente para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 0 a 0 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 9,1% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 43 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | em cima, os dois joelhos ficam quase estendidos (consenso) | em cima, o joelho da frente dobra 14° e o de trás 19,3° | como a ficha pede | ok |
| Ficha | a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso) | o quadril anda no máximo 0 cm para a frente ou para trás na descida | como a ficha pede | ok |
| Ficha | embaixo, o joelho de trás fica a poucos centímetros do chão (consenso) | embaixo, a pele do joelho de trás fica a 4 cm do chão (o centro do joelho a 9 cm) | como a ficha pede | ok |
| Ficha | embaixo, a coxa da frente fica perto da horizontal (consenso) | embaixo, a coxa da frente fica a 1,2° da horizontal | como a ficha pede | ok |
| Ficha | o tronco fica quase vertical (consenso) | o peito inclina no máximo 5,3° da vertical | como a ficha pede | ok |
| Ficha | o pé da frente fica inteiro no chão (consenso) | o calcanhar e a bola do pé da frente ficam a no máximo 0 cm do chão | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | peDaFrente.aFrenteDoQuadril, peDeTras.atrasDoQuadril, peDeTras.calcanhar, peDeTras.calcanhar.cima, bracos.paraFora, carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Quadríceps aparece como secundário dentro de um grupo que o conteúdo conta como principal (quadriceps) | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 354 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## O desenho dos músculos contra a tabela

A tabela (origem, inserção, camada e fonte de cada grupo) está em `src/engine/novo/dados/musculos.json` e em `tabelas.md`.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Músculos | cada forma do desenho tem a sua linha na tabela (origem, inserção, camada, fonte) | 20 formas, todas com linha | nenhuma forma sem linha | ok |
| Músculos | a forma está na parte do corpo em que a massa do músculo fica | todas no lugar | a parte do desenho = a parte da tabela | ok |
| Músculos | a massa do músculo fica entre o osso da origem e o da inserção | todas entre a origem e a inserção | na ordem dos ossos (tronco, braço, antebraço, mão; tronco, bacia, coxa, perna, pé) | ok |
| Músculos | quem cobre quem na pintura segue a camada da tabela | a ordem de pintura segue a tabela | o músculo que cobre é pintado depois | ok |
| Músculos | deltoide: onde a ponta de baixo chega no braço (0 = ombro, 1 = cotovelo) | 0,5 do braço | 0,5 do braço, com folga de 0,1 (Gray: a tuberosidade deltóidea fica no meio do úmero) | ok |
| Músculos | trapézio: altura da ponta de baixo, em pé | 121,6 cm (0 cm em relação a T12) | 121,6 cm, com folga de 3 (Gray: a ponta de baixo corresponde à 12ª vértebra torácica) | ok |
| Músculos | grande dorsal: altura da borda de baixo, em pé | 108 cm | 106,5 cm, com folga de 3 (Gray: origem na crista ilíaca; altura da crista no ANSUR II) | ok |
| Músculos | quadríceps: até onde desce na coxa (1 = joelho) | 1 da coxa | 1 da coxa, com folga de 0,1 (Gray: insere-se na patela) | ok |
| Músculos | reto abdominal: altura da borda de baixo, em pé | 91,4 cm | 90,6 cm, com folga de 3 (Gray: a origem é na crista do púbis; a altura do púbis na tabela é provisória (tomada igual à do trocânter)) | ok |
| Músculos | peitoral: altura da borda de baixo, em pé | 125,6 cm (o mamilo fica a 129,4 cm) | abaixo do mamilo (Gray: até a cartilagem da 6ª ou 7ª costela) | ok |

## Medidas ainda provisórias nas tabelas

Estas linhas ainda não têm fonte lida. Não são falha de uma animação, e sim pendência das tabelas: cada uma precisa de fonte (ou do ok do Gustavo como escolha de desenho) antes do critério de pronto.

### Corpo (6)
- ombro.centroAFrente = 0 cm (centro do ombro sobre a linha do quadril, de lado (linha de prumo da postura: a conferir))
- l5s1.acima = 12 cm (altura de L5–S1 acima do centro do quadril: a conferir. A conta sobre o Gait2392 daria 14,8 cm, e o canto de S1 medido em radiografia (Chanplakorn 2011) fica a 11,6 cm; o revisor no papel de anatomista recomendou manter 12)
- l5s1.atras = 3 cm (recuo de L5–S1 atrás do centro do quadril: cerca de 3 cm por conta feita sobre o modelo Gait2392 (a origem do tronco do modelo, lida como L5–S1, é inferência); antes: 4,5 cm. Continua sem medida direta)
- coluna.lordoseLombar = 50 graus (curva lombar em pé de L1 a L5 (Vialle 2005 dá 60 de lordose máxima incluindo o sacro): a conferir)
- esterno.meiaDistanciaDasClaviculas = 2.5 cm (da linha do meio até a articulação da clavícula com o esterno: sem fonte lida)
- altura.pubis = 90.6 cm (altura da crista do púbis, em pé: tomada igual à do trocânter (90,6 cm), por falta de medida; o ANSUR II não mede o púbis. É onde o reto abdominal termina no desenho)

### Objetos (9)
- anilhaCalcanhar.esp = 2.4 cm (espessura da anilha de 10 lb: a Rogue não informa)
- torre.colunaLarg = 30 cm (largura da coluna com a carenagem da pilha: nenhuma ficha lida informa)
- torre.pilhaLarg = 22 cm (largura das placas da pilha: nenhuma ficha lida informa)
- torre.placaEsp = 2.5 cm (espessura de cada placa da pilha: nenhuma ficha lida informa)
- estribo.altura = 15 cm (da pegada ao elo do cabo: sem medida lida)
- colchonete.comp = 100 cm (sem medida lida)
- colchonete.larg = 50 cm (sem medida lida)
- colchonete.esp = 1.5 cm (sem medida lida)
- bancoRegulavel.assentoComp = 34 cm (comprimento só do assento: nenhuma ficha lida separa assento e encosto)

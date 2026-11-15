# Conferência automática das animações novas

Gerado por `npm run conferir:animacao` (60 quadros por segundo, ciclo inteiro). Corpo: ANSUR II (militares dos EUA, 2012), homens, IMC de 18,5 a 24,9; n = 1061; média de cada medida.

| animação | quadros | itens | falhas | avisos |
|---|---|---|---|---|
| afundo | 270 | 36 | 0 | 5 |
| afundo-kettlebell | 270 | 34 | 0 | 4 |
| afundo-peso-corpo | 270 | 33 | 0 | 4 |
| afundo-tras-peso-corpo | 300 | 33 | 0 | 5 |
| agachamento-elastico | 279 | 34 | 0 | 5 |
| agachamento-peso-corpo | 279 | 33 | 0 | 4 |
| bulgaro | 270 | 37 | 0 | 3 |
| bulgaro-peso-corpo | 270 | 35 | 0 | 3 |
| bulgaro-suspensao | 270 | 38 | 0 | 3 |
| extensao-triceps-peso-corpo | 273 | 34 | 0 | 5 |
| flexao | 225 | 34 | 0 | 6 |
| flexao-bola | 246 | 36 | 0 | 3 |
| flexao-elastico | 225 | 37 | 0 | 6 |
| flexao-fechada | 225 | 34 | 0 | 6 |
| flexao-joelho-deslizante | 288 | 32 | 0 | 2 |
| flexao-joelho-elastico | 270 | 36 | 0 | 3 |
| flexao-pes-elevados | 255 | 36 | 0 | 7 |
| goblet | 279 | 34 | 0 | 3 |
| pike | 225 | 34 | 0 | 1 |
| puxada-unilateral | 240 | 34 | 0 | 4 |
| supino-reto | 291 | 33 | 0 | 2 |

"ok" = dentro do limite; "AVISO" = possível, mas fora da média ou ainda provisório (precisa do ok do Gustavo); "FALHA" = não pode ir para o app.

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

## Afundo com kettlebell no peito (`afundo-kettlebell`)

270 quadros conferidos. 0 falha(s), 4 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 14 a 91; cotovelo 132 a 132; quadril 40 a 93; ombro 19 a 19; dorsiflexao -22 a 2; punho -0 a 0; pronacao -18 a -18; clavicula 11 a 11.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 92,3° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 131,7° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 92,8° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 13,5° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 19,3° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 31,8° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 21,6° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 18,5° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 66° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelho da frente para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: kettlebell | distância da mão ao centro do objeto de 6,1 a 6,2 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 9,1% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 43 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso) | o quadril anda no máximo 0 cm para a frente ou para trás na descida | como a ficha pede | ok |
| Ficha | embaixo, o joelho de trás fica a poucos centímetros do chão (consenso) | embaixo, a pele do joelho de trás fica a 4 cm do chão (o centro do joelho a 9 cm) | como a ficha pede | ok |
| Ficha | o tronco fica quase vertical (consenso) | o peito inclina no máximo 5,3° da vertical | como a ficha pede | ok |
| Ficha | o pé da frente fica inteiro no chão (consenso) | o calcanhar e a bola do pé da frente ficam a no máximo 0 cm do chão | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | peDaFrente.aFrenteDoQuadril, peDeTras.atrasDoQuadril, peDeTras.calcanhar, maos.abaixoDeC7, kettlebell.folgaNoPeito, carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Quadríceps aparece como secundário dentro de um grupo que o conteúdo conta como principal (quadriceps) | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 354 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

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

## Afundo para trás com o peso do corpo (`afundo-tras-peso-corpo`)

300 quadros conferidos. 0 falha(s), 5 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 8 a 91; cotovelo 105 a 105; quadril 8 a 93; ombro 53 a 53; dorsiflexao 2 a 12; punho -0 a 0; pronacao 70 a 70; clavicula 13 a 13.

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
| Amplitudes | extensão do quadril | 12,9° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,4° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 53,2° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 31,8° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 69,6° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 66° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelho da frente para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 15,7% da velocidade de pico (joelho direito, Volta · concêntrica); pico de 147,4 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | o passo para trás é largo (consenso) | do tornozelo da frente ao de trás: 85,2 cm | como a ficha pede | ok |
| Ficha | embaixo, o joelho de trás quase toca o chão (consenso) | embaixo, a pele do joelho de trás fica a 4 cm do chão (o centro do joelho a 9 cm) | como a ficha pede | ok |
| Ficha | o tronco fica quase vertical (consenso) | o peito inclina no máximo 5,3° da vertical | como a ficha pede | ok |
| Ficha | embaixo, o peso fica no pé da frente (consenso) | embaixo, o centro de massa fica a 60,9% do caminho entre a ponta do pé de trás e o tornozelo da frente | como a ficha pede | ok |
| Ficha | o pé da frente não sai do lugar (consenso) | o calcanhar e a bola do pé da frente ficam a no máximo 0 cm do chão | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | peDaFrente.aFrenteDoQuadril, peDeTras.atrasDoQuadril, peDeTras.calcanhar, maos.naCintura.acima, passo.quandoApoia, passo.altura | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Quadríceps aparece como secundário dentro de um grupo que o conteúdo conta como principal (quadriceps) | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 354 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

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

## Agachamento búlgaro com apoio (`bulgaro`)

270 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 14 a 98; cotovelo 2 a 2; quadril 53 a 116; ombro 18 a 18; dorsiflexao -24 a -2; punho 0 a 0; pronacao 0 a 0; clavicula 11 a 11.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 117,1° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 127,4° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 115,6° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 22,7° | média 18,5°, máximo observado 42° (cdc) | AVISO |
| Amplitudes | abertura do quadril para o lado | 0,8° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 42,1° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | -1,5° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 52,2° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 65,6° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelho da frente para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | a carga fica na mão: halter | distância da mão ao centro do objeto de 0 a 0 cm | não pode variar mais de 0,5 cm no ciclo | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | até 2,4 cm para dentro (estofado) | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 9,8% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 52,7 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | em cima, o joelho da frente fica quase estendido (consenso) | em cima, o joelho da frente dobra 14° | como a ficha pede | ok |
| Ficha | a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso) | o quadril anda no máximo 0 cm para a frente ou para trás na descida | como a ficha pede | ok |
| Ficha | embaixo, o joelho de trás fica a poucos centímetros do chão (consenso) | embaixo, a pele do joelho de trás fica a 4 cm do chão (o centro do joelho a 9 cm) | como a ficha pede | ok |
| Ficha | embaixo, a coxa da frente fica perto da horizontal ou um pouco abaixo (consenso) | embaixo, a coxa da frente fica a 10,6° da horizontal | como a ficha pede | ok |
| Ficha | o tronco fica levemente inclinado à frente (consenso) | o peito inclina de 16,3° a 16,3° para a frente | como a ficha pede | ok |
| Ficha | o pé da frente fica inteiro no chão, com o calcanhar apoiado (consenso) | o calcanhar e a bola do pé da frente ficam a no máximo 0 cm do chão | como a ficha pede | ok |
| Ficha | o peito do pé de trás fica apoiado no banco, com o cadarço para baixo (consenso) | o pé de trás fica de 0 a 0 cm do tampo do apoio, com a sola para cima, e o tornozelo anda 0 cm | como a ficha pede | ok |
| Ficha | o peso fica na perna da frente (consenso) | o centro de massa (corpo + carga) fica de 61,4% a 62,5% do caminho entre o tornozelo de trás e o da frente | como a ficha pede | ok |
| Ficha | a mão livre segura a coluna da estação só para equilibrar: fica parada (consenso) | a mão de apoio anda 0 cm no ciclo; o cotovelo desse braço dobra de 106,4° a 127,4° | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | peDaFrente.aFrenteDoQuadril, peDeTras.tornozeloAtrasDoQuadril, peDeTras.tornozeloDaBorda, apoio.maoAoLado, apoio.maoAltura, apoio.maoAFrenteDoQuadril, bracos.paraFora, carga | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 353 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Búlgaro com o peso do corpo (`bulgaro-peso-corpo`)

270 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 14 a 98; cotovelo 105 a 105; quadril 53 a 116; ombro 53 a 53; dorsiflexao -24 a -2; punho -0 a 0; pronacao 70 a 70; clavicula 13 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 117,1° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 104,8° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 115,6° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 25° | média 18,5°, máximo observado 42° (cdc) | AVISO |
| Amplitudes | abertura do quadril para o lado | 0,9° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 53,2° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0,4° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 50° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 69,6° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelho da frente para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | até 1,3 cm para dentro (obj) | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 9,8% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 52,8 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | em cima, o joelho da frente fica quase estendido (consenso) | em cima, o joelho da frente dobra 14° | como a ficha pede | ok |
| Ficha | a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso) | o quadril anda no máximo 0 cm para a frente ou para trás na descida | como a ficha pede | ok |
| Ficha | embaixo, o joelho de trás fica a poucos centímetros do chão (consenso) | embaixo, a pele do joelho de trás fica a 5 cm do chão (o centro do joelho a 10 cm) | como a ficha pede | ok |
| Ficha | embaixo, a coxa da frente fica perto da horizontal ou um pouco abaixo (consenso) | embaixo, a coxa da frente fica a 10,6° da horizontal | como a ficha pede | ok |
| Ficha | o tronco fica levemente inclinado à frente (consenso) | o peito inclina de 16,3° a 16,3° para a frente | como a ficha pede | ok |
| Ficha | o pé da frente fica inteiro no chão, com o calcanhar apoiado (consenso) | o calcanhar e a bola do pé da frente ficam a no máximo 0 cm do chão | como a ficha pede | ok |
| Ficha | o peito do pé de trás fica apoiado no assento da cadeira, com o cadarço para baixo (consenso) | o pé de trás fica de 0 a 0 cm do tampo do apoio, com a sola para cima, e o tornozelo anda 0 cm | como a ficha pede | ok |
| Ficha | o peso fica na perna da frente (consenso) | o centro de massa (corpo + carga) fica de 59,6% a 61% do caminho entre o tornozelo de trás e o da frente | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | peDaFrente.aFrenteDoQuadril, peDeTras.tornozeloAtrasDoQuadril, peDeTras.tornozeloDaBorda, maos.naCintura.acima | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 353 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Búlgaro com o pé de trás na suspensão (`bulgaro-suspensao`)

270 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 14 a 91; cotovelo 105 a 105; quadril 53 a 108; ombro 53 a 53; dorsiflexao -24 a -2; punho -0 a 0; pronacao 70 a 70; clavicula 13 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 99,8° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 104,8° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 108,1° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 7,9° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,5° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 53,2° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | -1,6° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 73° | média 56,7°, máximo observado 90° (cdc) | AVISO |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 69,6° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 0° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Joelho da frente para dentro) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | fita: não estica | comprimento de 154,6 a 154,7 cm | não pode variar mais de 0,3 cm | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 9,3% da velocidade de pico (joelho direito, Subida · concêntrica); pico de 45 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Equilíbrio | centro de massa (corpo + carga) sobre o apoio dos pés | sempre dentro do apoio | do calcanhar à ponta do pé | ok |
| Ficha | em cima, o joelho da frente fica quase estendido (consenso) | em cima, o joelho da frente dobra 14° | como a ficha pede | ok |
| Ficha | a descida é reta: o quadril desce sem ir para a frente nem para trás (consenso) | o quadril anda no máximo 0 cm para a frente ou para trás na descida | como a ficha pede | ok |
| Ficha | embaixo, o joelho de trás fica a poucos centímetros do chão (consenso) | embaixo, a pele do joelho de trás fica a 4 cm do chão (o centro do joelho a 9 cm) | como a ficha pede | ok |
| Ficha | embaixo, a coxa da frente fica perto da horizontal (consenso) | embaixo, a coxa da frente fica a 3,1° da horizontal | como a ficha pede | ok |
| Ficha | o tronco fica levemente inclinado à frente (consenso) | o peito inclina de 16,3° a 16,3° para a frente | como a ficha pede | ok |
| Ficha | o pé da frente fica inteiro no chão, com o calcanhar apoiado (consenso) | o calcanhar e a bola do pé da frente ficam a no máximo 0 cm do chão | como a ficha pede | ok |
| Ficha | o peso fica na perna da frente (consenso) | o centro de massa (corpo + carga) fica de 60,5% a 63,7% do caminho entre o tornozelo de trás e o da frente | como a ficha pede | ok |
| Ficha | o peito do pé de trás fica no berço da alça, com o cadarço para baixo (consenso) | o peito do pé de trás fica a no máximo 0,1 cm do fundo do berço, com a sola para cima | como a ficha pede | ok |
| Ficha | a alça fica na altura do meio da canela (consenso) | o fundo do berço fica de 28,3 a 28,3 cm do chão (o meio da canela do corpo: 28,3 cm; o fabricante: 20,3 a 30,5 cm) | como a ficha pede | ok |
| Ficha | na descida, o pé de trás vai para trás com a fita, que não estica (consenso) | na descida, o pé de trás anda 8 cm para trás e 0 cm para cima; da âncora ao fundo do berço, de 154,6 a 154,7 cm | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | peDaFrente.aFrenteDoQuadril, peDeTras.tornozeloAtrasDoQuadril, fita.alcaAFrenteDaAncora, fita.peVaiParaTras, fita.contatoAteOTornozelo, maos.naCintura.acima | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: quadriceps; secundário: gluteos, adutores) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 354 cm² (padrão); de frente: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Extensão de tríceps com o peso do corpo (`extensao-triceps-peso-corpo`)

273 quadros conferidos. 0 falha(s), 5 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 5 a 5; cotovelo 25 a 106; quadril 3 a 3; ombro 122 a 180; dorsiflexao 15 a 25; punho 37 a 68; pronacao -94 a -93; clavicula 16 a 17.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 5° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 106,1° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2,5° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,2° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 179,9° | média 170°, máximo observado 192° (cdc) | AVISO |
| Amplitudes | dorsiflexão do tornozelo | 25° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 94,1° | média 87,5°, máximo observado 131° (cdc) | AVISO |
| Amplitudes | extensão do punho | 68° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 30° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Dobrar o quadril) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | até 0 cm para dentro (esc) | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 9,3% da velocidade de pico (cotovelo direito, Volta · concêntrica); pico de 47,6 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo reto; só os cotovelos dobram (consenso) | ombro, quadril e tornozelo fazem no mínimo 176,6° (180° = linha reta); o cotovelo dobra de 25° a 106,1° | como a ficha pede | ok |
| Ficha | cotovelos apontando para a frente (consenso) | embaixo, o plano do braço abre 0,6° do plano do meio do corpo (0° = cotovelo reto para a frente) | como a ficha pede | ok |
| Ficha | embaixo, a testa chega perto do apoio, sem bater (consenso) | embaixo, a cabeça fica a 6 cm da bancada; no caminho, nunca a menos de 6 cm | como a ficha pede | ok |
| Ficha | embaixo, braços acima da cabeça (um estudo) | embaixo, o braço fica elevado 178° em relação ao tronco (180° = na linha do tronco, acima da cabeça) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | maos.dentroDaBeirada, pes.atrasDaBeirada, pes.meiaDistancia, calcanhar.sobe, cotovelo.cima, testa.aoApoio, pescoco.flexao | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: triceps; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de cima: 182 cm² (padrão); de lado: 56 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

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

## Flexão de joelho na bola suíça (`flexao-bola`)

246 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 6 a 90; cotovelo 27 a 28; quadril -5 a -5; ombro 49 a 70; dorsiflexao -61 a 0; punho 16 a 17; pronacao -0 a 0; clavicula 12 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 90° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 28,1° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | -4,9° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 4,9° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 70° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 61,4° | média 56,7°, máximo observado 90° (cdc) | AVISO |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 17,4° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | -0,5 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,5 cm (Quadril encosta no chão na volta) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 7% da velocidade de pico (cabeça, Puxada · concêntrica); pico de 95,8 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | começo: ombros, quadril e calcanhares em linha (consenso) | no começo, ombro, quadril e calcanhar fazem 171,8° de lado (180° = linha reta) | como a ficha pede | ok |
| Ficha | fim: ombros, quadril e joelhos em linha (consenso) | no fim, ombro, quadril e joelho fazem 179° de lado (180° = linha reta) | como a ficha pede | ok |
| Ficha | fim: joelhos a ~90° (consenso) | no fim, o joelho dobra 90° | como a ficha pede | ok |
| Ficha | a puxada sobe ainda mais o quadril (consenso) | o centro da pelve sobe de 32,4 para 54 cm do chão | como a ficha pede | ok |
| Ficha | o quadril não encosta no chão (consenso) | o ponto mais baixo da bacia fica a no mínimo 19,8 cm do chão | como a ficha pede | ok |
| Ficha | calcanhares em cima da bola no começo; pés apoiados em cima dela no fim (consenso) | o pé fica de -0,1 a 0,1 cm para dentro da superfície da bola (a bola cede um pouco) | como a ficha pede | ok |
| Ficha | coxas e canelas não atravessam a bola (consenso) | nenhum ponto das pernas entra na bola | como a ficha pede | ok |
| Ficha | deitado de costas: a parte de cima das costas fica no chão (consenso) | o ponto mais baixo das costas fica de 0,4 a 0,6 cm do chão | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | bracos.alcance, cabeca.aoChao, cabeca.fracaoDoPescoco, toracica.flexao, pe.afundaNaBola | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 67 cm² (padrão); de cima: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Flexão de braço com elástico (`flexao-elastico`)

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
| Cabos | elástico: quanto estica no ciclo (1 = comprimento em repouso) | de 1,2 a 1,7 vezes (149,7 a 206,6 cm); em cima, 1,7 vezes | nunca frouxo (1 ou mais), mais esticado em cima e nunca além de 3 vezes (o máximo do fabricante) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 16,2% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 75,3 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo em linha reta da cabeça aos calcanhares (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 177,2° (180° = linha reta) | como a ficha pede | ok |
| Ficha | embaixo, o peito chega perto do chão (consenso) | embaixo, o peito fica a 5 cm do chão | como a ficha pede | ok |
| Ficha | cotovelos para trás, a meio caminho do tronco (consenso) | embaixo, o braço faz 43,6° com o tronco, visto de cima | como a ficha pede | ok |
| Ficha | o meio do elástico passa pelas costas, na altura das escápulas (abaixo do pescoço) (consenso) | o meio do elástico fica de 12 a 12 cm abaixo da base do pescoço (C7), nas costas | como a ficha pede | ok |
| Ficha | cada ponta do elástico fica presa entre a palma e o chão (consenso) | a ponta do elástico sob a mão anda 0 cm no ciclo | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | tornozelo.dorsiflexao, escapula.retracaoEmbaixo, elastico.voltaNaMao, elastico.folgaNasCostas, elastico.atrasDoOmbro | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: peito; secundário: triceps, ombro_anterior) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Reto abdominal aparece como "só ajuda a firmar", fora da lista do conteúdo | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 84 cm² (padrão); de cima: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Flexão de braço com as mãos juntas (`flexao-fechada`)

225 quadros conferidos. 0 falha(s), 6 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 10 a 118; quadril 2 a 2; ombro 8 a 59; dorsiflexao 12 a 12; punho 65 a 95; pronacao 75 a 84; clavicula 11 a 13.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 4° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 117,6° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,2° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 58,6° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 12° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 84,5° | média 80°, máximo observado 108° (cdc) | AVISO |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 94,6° | média 70°, máximo observado 95° (aaos) | AVISO |
| Amplitudes | extensão dos dedos do pé | 76,1° | média 70°, máximo observado 90° (aaos) | AVISO |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Quadril cai) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 17,2% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 77,9 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo em linha reta da cabeça aos calcanhares (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 177,9° (180° = linha reta) | como a ficha pede | ok |
| Ficha | embaixo, o peito chega perto das mãos (a poucos centímetros do chão) (consenso) | embaixo, o peito fica a 5 cm do chão | como a ficha pede | ok |
| Ficha | de cima, as mãos ficam por dentro da linha dos ombros (consenso) | a borda de fora da mão fica a 18,7 cm do meio do corpo; a linha de fora do ombro, a 23,9 cm | como a ficha pede | ok |
| Ficha | cotovelos para trás, rentes ao corpo (consenso) | embaixo, o braço faz 8,9° com o tronco, visto de cima | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | maos.abaixoDoOmbro, tornozelo.dorsiflexao, escapula.retracaoEmbaixo | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: triceps, peito; secundário: ombro_anterior) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 145 cm² (padrão); de cima: 34 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Flexão de joelho deslizando os pés no chão (`flexao-joelho-deslizante`)

288 quadros conferidos. 0 falha(s), 2 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 10 a 120; cotovelo 17 a 19; quadril -8 a 9; ombro 18 a 32; dorsiflexao -0 a 0; punho 9 a 10; pronacao -15 a -14; clavicula 11 a 12.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 120° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 18,8° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 9,1° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 8,2° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 31,8° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 0° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 0° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 14,7° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 9,6° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | -0,2 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,2 cm (Quadril encosta no chão) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 12,5% da velocidade de pico (joelho direito, Puxada · concêntrica); pico de 68 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | o quadril fica fora do chão o tempo todo (consenso) | a pele do glúteo fica de 5 a 19 cm do chão | como a ficha pede | ok |
| Ficha | os ombros ficam no chão, sem sair do lugar, e a cabeça apoiada (consenso) | o ponto mais baixo das costas fica de 0 a 0,3 cm do chão e o da cabeça de 0 a 0 cm; o centro do ombro anda 1,7 cm | como a ficha pede | ok |
| Ficha | com os joelhos dobrados, ombros, quadril e joelhos em linha (consenso) | no fim, de lado, ombro, quadril e joelho fazem 177° (180° = em linha); o joelho dobra 120° | como a ficha pede | ok |
| Ficha | os calcanhares deslizam na toalha: ficam apoiados nela e andam para perto do glúteo (consenso) | o pé fica de 0 a 0 cm do tampo da toalha; o calcanhar desliza 64,7 cm na direção do corpo (0 cm para o lado) e termina 28,1 cm à frente do centro do quadril | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | joelho.fim, quadril.folgaNoInicio, ombro.z, maos.abaixoDoOmbro, maos.paraFora | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: gluteos) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 67 cm² (padrão); de três quartos, de trás: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Flexão de joelho com elástico (`flexao-joelho-elastico`)

270 quadros conferidos. 0 falha(s), 3 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 12 a 115; cotovelo 114 a 114; quadril -2 a -2; ombro 129 a 129; dorsiflexao -55 a -55; punho 22 a 22; pronacao 45 a 45; clavicula 16 a 16.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 115° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 113,6° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | -1,5° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 1,5° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 128,7° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | -55° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 55° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 44,5° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 22,3° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 0° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pelve | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: joelho.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: joelho.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | -0,1 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | -0,1 cm (Quadril sobe do chão) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Cabos | elástico: quanto estica no ciclo (1 = comprimento em repouso) | de 1,2 a 2,2 vezes (146,3 a 262,4 cm); em cima, 1,2 vezes | nunca frouxo (1 ou mais), mais esticado em cima e nunca além de 3 vezes (o máximo do fabricante) | AVISO |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 0% da velocidade de pico (sem movimento); pico de 0 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | deitado de bruços, o quadril encostado no colchonete e a testa apoiada nos braços (consenso) | de bruços; a bacia fica de 0 a 0 cm do tampo do colchonete e o peito de -1,5 a -1,5 cm; a testa fica de 0 a 0 cm do alto das mãos | como a ficha pede | ok |
| Ficha | no fim, joelhos bem dobrados, calcanhares em direção ao glúteo (consenso) | no fim, o joelho dobra 115° e o calcanhar fica 43,8 cm acima do chão | como a ficha pede | ok |
| Ficha | o elástico estica mais com os joelhos dobrados e já está um pouco esticado com as pernas estendidas (consenso) | o elástico estica 1,2 vez com as pernas estendidas e 2,2 vezes no fim (de 1,2 a 2,2 no caminho) | como a ficha pede | ok |
| Ficha | as pontas do elástico ficam em volta dos dois tornozelos, por trás, logo acima do calcanhar (consenso) | o centro do pegador fica de 5,1 a 5,1 cm atrás do centro do tornozelo e de 4 a 4 cm acima dele, ao longo da canela | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | joelho.fim, tornozelo.flexaoPlantar, testa.altura, maos.meiaDistancia, colchonete.z, ancora.altura | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: posteriores; secundário: nenhum) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de cima: 645 cm² (padrão); de lado: 67 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

## Flexão com os pés elevados (`flexao-pes-elevados`)

255 quadros conferidos. 0 falha(s), 7 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 4 a 4; cotovelo 10 a 124; quadril 2 a 2; ombro 52 a 82; dorsiflexao 27 a 27; punho 60 a 93; pronacao 40 a 42; clavicula 12 a 14.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 4° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 124,1° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 2° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,2° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 81,6° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 27° | média 14,8°, máximo observado 48° (cdc) | AVISO |
| Amplitudes | flexão plantar do tornozelo | 0° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 42,3° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 93° | média 70°, máximo observado 95° (aaos) | AVISO |
| Amplitudes | extensão dos dedos do pé | 80,1° | média 70°, máximo observado 90° (aaos) | AVISO |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Quadril caído ou alto demais) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 15,3% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 72,9 cm/s | movimento suave: até 15%; acima de 25% é tranco | AVISO |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | corpo reto da cabeça aos calcanhares (consenso) | de lado, ombro, quadril e tornozelo fazem no mínimo 177° (180° = linha reta) | como a ficha pede | ok |
| Ficha | embaixo, o peito quase toca o chão (consenso) | embaixo, o peito fica a 8,9 cm do chão | como a ficha pede | ok |
| Ficha | cotovelos a ~45° do corpo (consenso) | embaixo, o braço faz 50,5° com o tronco, visto de cima | como a ficha pede | ok |
| Ficha | pés no apoio firme, sem sair do lugar (consenso) | o ponto mais baixo dos pés fica de 0 a 0 cm do tampo do apoio | como a ficha pede | ok |
| Ficha | a cabeça fica abaixo do quadril, sem bater no chão (consenso) | embaixo, o ponto mais baixo da cabeça fica a 1,5 cm do chão | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | maos.abaixoDoOmbro, tornozelo.dorsiflexao, escapula.retracaoEmbaixo, pes.daBordaDoBanco, banco.pontaNoQuadro, pescoco.extensao, cabeca.extensao, cabeca.aoChao | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: peito; secundário: triceps, ombro_anterior) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | diferenças aceitas, a confirmar com o Gustavo | Reto abdominal aparece como "só ajuda a firmar", fora da lista do conteúdo | cada uma precisa do ok dele | AVISO |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de lado: 84 cm² (padrão); de cima: 0 cm² (não serve: o principal quase não aparece) | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | AVISO |

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

## Flexão com o quadril alto (pike) (`pike`)

225 quadros conferidos. 0 falha(s), 1 aviso(s).

Ângulos no ciclo (lado direito, graus): joelho 5 a 5; cotovelo 10 a 95; quadril 99 a 105; ombro 101 a 141; dorsiflexao -1 a 14; punho 55 a 70; pronacao 33 a 38; clavicula 15 a 17.

| grupo | o que foi medido | resultado | limite | |
|---|---|---|---|---|
| Proporções | comprimento do osso: braço | desvio máximo 0 cm | tabela: 30,5 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: antebraço | desvio máximo 0 cm | tabela: 26,8 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: coxa | desvio máximo 0 cm | tabela: 41,3 cm; tolerância 0,1 cm | ok |
| Proporções | comprimento do osso: perna | desvio máximo 0 cm | tabela: 42,1 cm; tolerância 0,1 cm | ok |
| Proporções | membro que não alcança o alvo | falta máxima 0 cm | tolerância 0,1 cm | ok |
| Amplitudes | flexão do joelho (máxima no ciclo) | 5° | média 140°, máximo observado 164° (cdc) | ok |
| Amplitudes | flexão do cotovelo | 95,3° | média 148°, máximo observado 166° (cdc) | ok |
| Amplitudes | flexão do quadril | 105° | média 132°, máximo observado 159° (cdc) | ok |
| Amplitudes | extensão do quadril | 0° | média 18,5°, máximo observado 42° (cdc) | ok |
| Amplitudes | abertura do quadril para o lado | 0,2° | média 40°, máximo observado 60° (aaos) | ok |
| Amplitudes | elevação do braço | 141,3° | média 170°, máximo observado 192° (cdc) | ok |
| Amplitudes | dorsiflexão do tornozelo | 13,7° | média 14,8°, máximo observado 48° (cdc) | ok |
| Amplitudes | flexão plantar do tornozelo | 0,7° | média 56,7°, máximo observado 90° (cdc) | ok |
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 38,2° | média 80°, máximo observado 108° (cdc) | ok |
| Amplitudes | supinação do antebraço | 0° | média 87,5°, máximo observado 131° (cdc) | ok |
| Amplitudes | extensão do punho | 69,7° | média 70°, máximo observado 95° (aaos) | ok |
| Amplitudes | extensão dos dedos do pé | 30° | média 70°, máximo observado 90° (aaos) | ok |
| Contatos | preso no lugar: pe.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: pe.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.R | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Contatos | preso no lugar: mao.L | desloca no máximo 0 cm no ciclo | tolerância 0,1 cm | ok |
| Chão | ponto mais baixo do corpo | 0 cm | não pode passar de −1,5 cm (a sola e o joelho amassam um pouco) | ok |
| Chão | ponto mais baixo do corpo nos erros desenhados | 0 cm (Descer pouco) | não pode passar de −1,5 cm | ok |
| Objetos | o corpo atravessa uma peça (banco, coluna) | não atravessa | tolerância 2,5 cm (o corpo amassa o estofado) | ok |
| Ritmo | maior salto de velocidade entre dois quadros (a 60 quadros por segundo) | 12,2% da velocidade de pico (cotovelo direito, Subida · concêntrica); pico de 41 cm/s | movimento suave: até 15%; acima de 25% é tranco | ok |
| Simetria | esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo) | diferença máxima 0 cm | tolerância 0,1 cm | ok |
| Ciclo | o último quadro emenda no primeiro | distância máxima 0 cm | até 0,5 cm | ok |
| Ficha | o quadril continua alto: fica acima dos ombros e os ombros não passam à frente das mãos (consenso) | o quadril fica no mínimo 31,3 cm acima dos ombros; os ombros ficam no mínimo 8,4 cm atrás do centro das palmas; a flexão do quadril vai de 105° a 98,7° | como a ficha pede | ok |
| Ficha | embaixo, a cabeça fica perto do chão, sem encostar, na linha das mãos e entre elas (consenso) | embaixo, o ponto mais baixo da cabeça fica a 5 cm do chão e 1,7 cm à frente da linha do centro das palmas, entre as mãos; no caminho, nunca abaixo de 5 cm | como a ficha pede | ok |
| Ficha | pernas estendidas o ciclo inteiro (consenso) | os joelhos dobram de 5° a 5° | como a ficha pede | ok |
| Ficha | cotovelos para trás, a meio caminho entre o tronco e os lados (consenso) | embaixo, o plano do braço abre 51,7° do plano do meio do corpo; o cotovelo aponta para trás (para os pés) | como a ficha pede | ok |
| Provisórios | linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho) | maos.aFrenteDosPes, calcanhar.sobe, quadril.cima, cabeca.aoChao, pescoco.flexao | cada uma precisa de fonte ou do ok do Gustavo | AVISO |
| Músculos | o realçado é o do conteúdo (principal: ombro_anterior; secundário: ombro_lateral, triceps) | principal e secundário batem com o conteúdo | nenhuma diferença | ok |
| Músculos | quanto do músculo principal aparece em cada vista (área das formas viradas para quem olha) | de frente: 112 cm² (padrão); de lado: 51 cm² | pelo menos uma vista com 30 cm² ou mais; a que tem menos de um terço da melhor sai do modo Músculos | ok |

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
| Amplitudes | pronação do antebraço (a partir do polegar para cima) | 67,5° | média 80°, máximo observado 108° (cdc) | ok |
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
| Músculos | trapézio: altura da ponta de cima, em pé | 162,5 cm | 162,8 cm, com folga de 1 (Gray: a origem sobe até a protuberância occipital; altura da base do crânio na tabela do corpo) | ok |
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

### Objetos (23)
- anilhaCalcanhar.esp = 2.4 cm (espessura da anilha de 10 lb: a Rogue não informa)
- torre.colunaLarg = 30 cm (largura da coluna com a carenagem da pilha: nenhuma ficha lida informa)
- torre.pilhaLarg = 22 cm (largura das placas da pilha: nenhuma ficha lida informa)
- torre.placaEsp = 2.5 cm (espessura de cada placa da pilha: nenhuma ficha lida informa)
- estribo.altura = 15 cm (da pegada ao elo do cabo: sem medida lida)
- colchonete.comp = 100 cm (sem medida lida)
- colchonete.larg = 50 cm (sem medida lida)
- colchonete.esp = 1.5 cm (sem medida lida)
- bancoRegulavel.assentoComp = 34 cm (comprimento só do assento: nenhuma ficha lida separa assento e encosto)
- bancada.balanco = 2 cm (quanto o tampo passa da frente do gabinete (sem medida lida))
- bancada.rodapeRecuo = 5 cm (quanto o rodapé fica para dentro da frente do gabinete (sem medida lida))
- bolaSuica.amassa = 1.5 cm (quanto a bola cheia e firme achata em cima do chão com o peso das pernas: o centro desce isso, e a parte de baixo fica reta. A ficha não dá número; a medida real depende da pressão)
- cadeira.assentoEsp = 3 cm (espessura do tampo do assento: a ficha não traz)
- cadeira.peLado = 3.5 cm (lado da seção quadrada de cada pé da cadeira: a ficha não traz)
- porta.vao = 1 cm (vão entre a folha e o chão, por onde passa a fita da âncora)
- porta.alcaComp = 6 cm (quanto a alça de fita sai do vão da porta, do lado de quem treina (a ficha não dá o comprimento da fita))
- suspensao.fitaLarg = 3.8 cm (largura de cada fita: a página do fabricante não traz (1,5 pol, a largura comum de fita de náilon))
- suspensao.mosquetaoComp = 10 cm (comprimento do mosquetão que liga a fita à âncora: a página do fabricante não traz)
- suspensao.pegadorComp = 14 cm (comprimento do pegador de mão (espuma): a página do fabricante só diz "padded handles")
- suspensao.pegadorDiam = 3.5 cm (diâmetro do pegador de mão: a página do fabricante não traz)
- suspensao.bercoLarg = 9 cm (largura do berço do pé (a alça onde entra o peito do pé): a página do fabricante não traz)
- suspensao.bercoAlt = 6 cm (quanto o berço do pé desce abaixo do pegador, onde o peito do pé apoia: a página do fabricante não traz)
- toalha.esp = 0.4 cm (espessura de uma camada de felpa: a ficha do fabricante dá o peso (4,5 lb por dúzia), não a espessura; dobrada, são duas camadas)
